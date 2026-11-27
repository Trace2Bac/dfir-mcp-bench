"""Run one PoC: build its evidence, call the server's tools over MCP without a
model, record every request and response, and decide whether the problem was
reproduced.

A PoC is pocs/<problem>/<server>/<case-id>/poc.yaml. In fixture paths, tool
arguments and env values, ${EVIDENCE}, ${DB_DIR}, ${OUTSIDE} (a folder next to
the evidence that the server is not given), ${STUBS} (stub programs) and
${PATH} (the runner's PATH) are filled in.

Besides the tool calls, the transcript keeps what the model would be given:
the server's instructions and its tool list (descriptions, schemas,
annotations), so problems in the definitions can be shown next to the
behaviour.
"""

from __future__ import annotations

import asyncio
import base64
import json
import os
import re
import shlex
import tempfile
import time
from datetime import UTC, datetime
from pathlib import Path
from typing import Any, TextIO

import yaml
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

# Fixture content beyond this size is summarised in the transcript, not copied.
_KEEP_BYTES = 4096


def _fill(value: Any, env: dict[str, str]) -> Any:
    if isinstance(value, str):
        for k, v in env.items():
            value = value.replace("${" + k + "}", v)
        return value
    if isinstance(value, list):
        return [_fill(v, env) for v in value]
    if isinstance(value, dict):
        return {k: _fill(v, env) for k, v in value.items()}
    return value


def _mtime(value: Any) -> float:
    if isinstance(value, int | float):
        return float(value)
    return datetime.fromisoformat(str(value).replace("Z", "+00:00")).timestamp()


def _content(item: dict[str, Any], i: int | None) -> bytes:
    if "hex" in item:
        return bytes.fromhex(item["hex"].replace(" ", ""))
    if "base64" in item:
        return base64.b64decode(item["base64"])
    text = item.get("text", "")
    return (text.replace("{i}", str(i)) if i is not None else text).encode()


def _write_one(path: Path, item: dict[str, Any], env: dict[str, str], i: int | None) -> int:
    path.parent.mkdir(parents=True, exist_ok=True)
    if "symlink" in item:
        path.symlink_to(_fill(item["symlink"], env))
        return 0
    if "size" in item:
        # Sparse: the size is set without writing the bytes, so a 1 GiB file is cheap.
        with open(path, "wb") as f:
            head = _content(item, i) if ("text" in item or "hex" in item or "base64" in item) else b""
            f.write(head)
            f.truncate(int(item["size"]))
        size = int(item["size"])
    else:
        data = _content(item, i)
        path.write_bytes(data)
        size = len(data)
    if "mtime" in item:
        t = _mtime(item["mtime"])
        os.utime(path, (t, t))
    if "mode" in item:
        os.chmod(path, int(str(item["mode"]), 8))
    return size


def _write_fixture(item: dict[str, Any], env: dict[str, str], roots: dict[str, Path]) -> dict[str, Any]:
    """Write one fixture item; `repeat: N` writes N files, {i} in path and text."""
    root = roots[item.get("root", "evidence")]
    n = item.get("repeat")
    paths = [item["path"].replace("{i}", str(i)) for i in range(n)] if n else [item["path"]]
    total = 0
    for k, rel in enumerate(paths):
        total += _write_one(root / _fill(rel, env), item, env, k if n else None)
    kept: dict[str, Any] = {"path": item["path"], "root": item.get("root", "evidence"), "size": total}
    for key in ("mode", "mtime", "symlink", "repeat"):
        if key in item:
            kept[key] = item[key]
    if not n and "symlink" not in item and "size" not in item:
        data = _content(item, None)
        if len(data) <= _KEEP_BYTES:
            kept["hex"] = data.hex()
            kept["text"] = data.decode("utf-8", "backslashreplace")
        else:
            kept["text_head"] = data[:_KEEP_BYTES].decode("utf-8", "backslashreplace")
    return kept


def _response(result: Any) -> dict[str, Any]:
    parts = []
    for item in getattr(result, "content", None) or getattr(result, "contents", None) or []:
        text = getattr(item, "text", None)
        parts.append(text if text is not None else json.dumps(item.model_dump(), default=str))
    if hasattr(result, "messages"):  # prompts/get
        for m in result.messages:
            c = m.content
            parts.append(getattr(c, "text", None) or json.dumps(c.model_dump(), default=str))
    is_error = bool(getattr(result, "isError", getattr(result, "is_error", False)))
    return {"text": "\n".join(parts), "is_error": is_error, "timed_out": False}


async def _call(session: ClientSession, step: dict[str, Any], env: dict[str, str]) -> dict[str, Any]:
    args = _fill(step.get("args", {}), env)
    started = time.monotonic()
    try:
        if "prompt" in step:
            coro = session.get_prompt(step["prompt"], {k: str(v) for k, v in args.items()})
        elif "resource" in step:
            coro = session.read_resource(_fill(step["resource"], env))
        elif "list_tools" in step:
            coro = session.list_tools()
        else:
            # Called even if the tool is not listed, so a PoC can show what an
            # advertised but unregistered tool name does.
            coro = session.call_tool(step["tool"], args)
        res = await asyncio.wait_for(coro, step.get("timeout_s", 120))
        response = (
            {"text": json.dumps([t.model_dump(mode="json") for t in res.tools], ensure_ascii=False), "is_error": False}
            if "list_tools" in step
            else _response(res)
        )
        response["timed_out"] = False
    except TimeoutError:
        response = {"text": "", "is_error": False, "timed_out": True}
    except Exception as exc:  # noqa: BLE001 - recorded as the step's result
        response = {"text": f"{type(exc).__name__}: {exc}", "is_error": True, "timed_out": False}
    name = step.get("tool") or step.get("prompt") or step.get("resource") or "tools/list"
    return {"call": name, "args": args, "response": response, "seconds": round(time.monotonic() - started, 3)}


async def _session(command: str, steps: list[dict[str, Any]], env: dict[str, str], errlog: TextIO) -> dict[str, Any]:
    argv = shlex.split(command)
    params = StdioServerParameters(command=argv[0], args=argv[1:])
    async with stdio_client(params, errlog=errlog) as (read, write), ClientSession(read, write) as session:
        init = await session.initialize()
        info = getattr(init, "serverInfo", None)
        tools = (await session.list_tools()).tools
        given = {
            "server": {"name": getattr(info, "name", ""), "version": getattr(info, "version", "")},
            "instructions": getattr(init, "instructions", None) or "",
            "tools": [t.model_dump(mode="json", exclude_none=True) for t in tools],
        }
        calls = [await _call(session, s, env) for s in steps]
    return {"model_given": given, "steps": calls}


def _server_command(base: str, extra_env: dict[str, str]) -> str:
    if not extra_env:
        return base
    return "env " + " ".join(shlex.quote(f"{k}={v}") for k, v in extra_env.items()) + " " + base


def _run_condition(poc: dict[str, Any], cond: dict[str, Any], server_cmd: str) -> dict[str, Any]:
    with tempfile.TemporaryDirectory() as tmp:
        roots = {name: Path(tmp, name) for name in ("evidence", "db", "outside", "stubs")}
        for p in roots.values():
            p.mkdir()
        env = {
            "EVIDENCE": str(roots["evidence"]),
            "DB_DIR": str(roots["db"]),
            "OUTSIDE": str(roots["outside"]),
            "STUBS": str(roots["stubs"]),
            "PATH": os.environ.get("PATH", ""),
        }
        for stub in poc.get("stubs", []):
            path = roots["stubs"] / stub["name"]
            path.write_text(_fill(stub["text"], env))
            path.chmod(0o755)
        fixtures = [_write_fixture(f, env, roots) for f in poc.get("fixture", []) + cond.get("fixture", [])]
        extra = _fill({**poc.get("env", {}), **cond.get("env", {})}, env)
        command = _server_command(_fill(server_cmd, env), extra)
        with open(Path(tmp, "server.log"), "w") as errlog:
            record = asyncio.run(_session(command, poc["steps"], env, errlog))
        files = {}
        for r in poc.get("expect", []):
            key = r.get("file_exists") or r.get("file_missing")
            if key:
                files[key] = Path(_fill(key, env)).exists()
        log = Path(tmp, "server.log").read_text(errors="replace")
    return {
        "condition": cond.get("name", "default"),
        "env": extra,
        "fixtures": fixtures,
        **record,
        "files_after": files,
        "server_log": log[-4000:],
    }


def _step(runs: dict[str, dict[str, Any]], rule: dict[str, Any], cond: str | None = None) -> dict[str, Any]:
    run = runs[cond or rule.get("condition") or next(iter(runs))]
    return run["steps"][rule.get("step", 1) - 1]


def _check(rule: dict[str, Any], runs: dict[str, dict[str, Any]]) -> dict[str, Any]:
    if "differs" in rule or "same" in rule:
        spec = rule.get("differs") or rule.get("same")
        a, b = (_step(runs, spec, c)["response"]["text"] for c in spec["conditions"])
        return {**rule, "ok": (a != b) if "differs" in rule else (a == b)}
    if "file_exists" in rule or "file_missing" in rule:
        run = runs[rule.get("condition") or next(iter(runs))]
        key = rule.get("file_exists") or rule.get("file_missing")
        exists = run["files_after"].get(key, False)
        return {**rule, "ok": exists if "file_exists" in rule else not exists}
    step = _step(runs, rule)
    text = step["response"]["text"]
    if "contains" in rule:
        ok = rule["contains"] in text
    elif "not_contains" in rule:
        ok = rule["not_contains"] not in text
    elif "regex" in rule:
        ok = re.search(rule["regex"], text) is not None
    elif "not_regex" in rule:
        ok = re.search(rule["not_regex"], text) is None
    elif "is_error" in rule:
        ok = step["response"]["is_error"] == rule["is_error"]
    elif "max_seconds" in rule:
        ok = step["seconds"] <= rule["max_seconds"]
    elif "min_seconds" in rule:
        ok = step["seconds"] >= rule["min_seconds"]
    elif "timed_out" in rule:
        ok = step["response"]["timed_out"] == rule["timed_out"]
    elif "min_length" in rule:
        ok = len(text) >= rule["min_length"]
    else:
        raise SystemExit(f"unknown expect rule: {rule}")
    return {**rule, "ok": ok}


def run_poc(poc_file: str, out_dir: str) -> dict[str, Any]:
    poc = yaml.safe_load(Path(poc_file).read_text())
    server_cmd = os.environ["BENCH_SERVER_CMD"]
    conditions = poc.get("conditions") or [{"name": "default"}]
    repeat = int(poc.get("repeat", 1))
    attempts = []
    for n in range(repeat):
        runs = {c.get("name", "default"): _run_condition(poc, c, server_cmd) for c in conditions}
        checks = [_check(r, runs) for r in poc.get("expect", [])]
        attempts.append(
            {
                "attempt": n + 1,
                "runs": list(runs.values()),
                "checks": checks,
                "reproduced": bool(checks) and all(c["ok"] for c in checks),
            }
        )
    hits = sum(a["reproduced"] for a in attempts)
    result = {
        "case_id": poc["case_id"],
        "problem": poc["problem"],
        "server": poc["server"],
        "commit": poc.get("commit", ""),
        "display": poc.get("display", "response"),
        "realism": poc.get("realism", ""),
        "coverage": poc.get("coverage", ""),
        "result": "reproduced" if hits else "not reproduced",
        "reproduced_runs": f"{hits}/{repeat}",
        "checks": attempts[-1]["checks"],
        "image": os.environ.get("BENCH_IMAGE_ID", ""),
        "ran_at": datetime.now(UTC).isoformat(timespec="seconds"),
    }
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)
    (out / "transcript.json").write_text(json.dumps({"attempts": attempts}, ensure_ascii=False, indent=2) + "\n")
    (out / "result.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
    return result


def summarize_pocs(root: str) -> str:
    """One line per server and problem: how many PoCs reproduced the problem."""
    counts: dict[tuple[str, str], dict[str, int]] = {}
    for f in sorted(Path(root).glob("*/*/*/runs/*/result.json")):
        r = json.loads(f.read_text())
        c = counts.setdefault((r["server"], r["problem"]), {"reproduced": 0, "not reproduced": 0})
        c[r["result"]] = c.get(r["result"], 0) + 1
    lines = ["| server | problem | reproduced | not reproduced |", "|---|---|---|---|"]
    for (server, problem), c in sorted(counts.items()):
        lines.append(f"| {server} | {problem} | {c['reproduced']} | {c['not reproduced']} |")
    return "\n".join(lines) + "\n"
