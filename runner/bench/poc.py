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

A PoC with a `model` block (level `model`) also asks a model one question
about the same evidence: Claude Code runs headless with the PoC's server as
its only tools, `model.repeat` times, each on freshly written evidence. The
`model.expect` rules are checked on its final answer; a run counts as misled
when all of them hold (`misled_if: any`: when one does). The scripted calls
still decide `result`; the model runs add `model_result` and model.json.
"""

from __future__ import annotations

import asyncio
import base64
import json
import os
import re
import shlex
import subprocess
import tempfile
import time
from datetime import UTC, datetime
from pathlib import Path
from typing import Any, TextIO

import yaml
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

from . import claude_code

# Fixture content beyond this size is summarised in the transcript, not copied.
_KEEP_BYTES = 4096
# The model of the bench's claude-code runs (bench runs use Opus only).
MODEL = "claude-opus-4-6"
# Tool results are cut here in model.json; the full text stays in model/run-<n>.jsonl.
_MODEL_RESULT_CHARS = 4000


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


def _prepare(tmp: str, poc: dict[str, Any], cond: dict[str, Any], server_cmd: str) -> dict[str, Any]:
    """Write the stubs and fixtures under *tmp*; return the folders, fixtures, env and server command."""
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
    return {"roots": roots, "env": env, "fixtures": fixtures, "extra": extra, "command": command}


def _run_condition(poc: dict[str, Any], cond: dict[str, Any], server_cmd: str) -> dict[str, Any]:
    with tempfile.TemporaryDirectory() as tmp:
        prep = _prepare(tmp, poc, cond, server_cmd)
        env = prep["env"]
        with open(Path(tmp, "server.log"), "w") as errlog:
            record = asyncio.run(_session(prep["command"], poc["steps"], env, errlog))
        files = {}
        for r in poc.get("expect", []):
            key = r.get("file_exists") or r.get("file_missing")
            if key:
                files[key] = Path(_fill(key, env)).exists()
        log = Path(tmp, "server.log").read_text(errors="replace")
    return {
        "condition": cond.get("name", "default"),
        "env": prep["extra"],
        "fixtures": prep["fixtures"],
        **record,
        "files_after": files,
        "server_log": log[-4000:],
    }


def _step(runs: dict[str, dict[str, Any]], rule: dict[str, Any], cond: str | None = None) -> dict[str, Any]:
    run = runs[cond or rule.get("condition") or next(iter(runs))]
    return run["steps"][rule.get("step", 1) - 1]


def _text_rule(rule: dict[str, Any], text: str) -> bool | None:
    """contains / not_contains / regex / not_regex on *text*; None for other rules."""
    if "contains" in rule:
        return rule["contains"] in text
    if "not_contains" in rule:
        return rule["not_contains"] not in text
    if "regex" in rule:
        return re.search(rule["regex"], text) is not None
    if "not_regex" in rule:
        return re.search(rule["not_regex"], text) is None
    return None


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
    ok = _text_rule(rule, text)
    if ok is not None:
        return {**rule, "ok": ok}
    if "is_error" in rule:
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


def _untemp(text: str, roots: dict[str, Path]) -> str:
    """The run's temporary folders as the ${...} names poc.yaml uses."""
    names = {"evidence": "EVIDENCE", "db": "DB_DIR", "outside": "OUTSIDE", "stubs": "STUBS"}
    for key, path in roots.items():
        text = text.replace(str(path.resolve()), "${" + names[key] + "}").replace(str(path), "${" + names[key] + "}")
    return text


def _model_prompt(server: str, question: str) -> str:
    # Only the question: nothing about what the PoC shows.
    return (
        f"You are a digital forensic examiner. Your only tools are those of the {server} MCP server. "
        "The evidence is in ${EVIDENCE}. Base your answer on what the tools return.\n\n" + question.strip() + "\n"
    )


def _model_run(poc: dict[str, Any], spec: dict[str, Any], server_cmd: str, n: int, out: Path) -> dict[str, Any]:
    """One Claude Code run on fresh evidence; its stream-json is kept as model/run-<n>.jsonl."""
    conditions = poc.get("conditions") or [{"name": "default"}]
    name = spec.get("condition") or conditions[0].get("name", "default")
    cond = next(c for c in conditions if c.get("name", "default") == name)
    server = str(poc["server"])
    with tempfile.TemporaryDirectory() as tmp:
        prep = _prepare(tmp, poc, cond, server_cmd)
        env = prep["env"]
        argv = shlex.split(prep["command"])
        config = {"mcpServers": {server: {"command": argv[0], "args": argv[1:]}}}
        Path(tmp, "mcp.json").write_text(json.dumps(config, indent=2) + "\n")
        prompt = _fill(_model_prompt(server, str(spec["question"])), env)
        cmd = [
            os.environ.get("BENCH_CLAUDE", claude_code.CLAUDE),
            "-p",
            prompt,
            "--model",
            str(spec.get("model") or MODEL),
            "--max-turns",
            str(spec.get("max_turns", 20)),
            "--mcp-config",
            str(Path(tmp, "mcp.json")),
            "--strict-mcp-config",
            "--tools",
            "",
            "--allowedTools",
            f"mcp__{server}",
            "--no-session-persistence",
            "--output-format",
            "stream-json",
            "--verbose",
        ]
        if spec.get("effort"):
            cmd += ["--effort", str(spec["effort"])]
        run_env = {
            **os.environ,
            "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
            "MCP_TIMEOUT": "120000",
            "MCP_TOOL_TIMEOUT": "600000",
        }
        started = time.monotonic()
        try:
            proc = subprocess.run(
                cmd,
                check=False,
                cwd=tmp,
                env=run_env,
                capture_output=True,
                text=True,
                timeout=spec.get("timeout_s", 1800),
            )
            stream, stderr = proc.stdout, proc.stderr
        except subprocess.TimeoutExpired as exc:
            stream = exc.stdout.decode(errors="replace") if isinstance(exc.stdout, bytes) else exc.stdout or ""
            stderr = "timed out"
        seconds = round(time.monotonic() - started, 1)
        stream = _untemp(stream, prep["roots"])
        stderr = _untemp(stderr or "", prep["roots"])
        prompt = _untemp(prompt, prep["roots"])
    (out / "model").mkdir(exist_ok=True)
    (out / "model" / f"run-{n}.jsonl").write_text(stream)

    events = []
    for line in stream.splitlines():
        try:
            events.append(json.loads(line))
        except json.JSONDecodeError:
            continue
    init = next((e for e in events if e.get("type") == "system" and e.get("subtype") == "init"), {})
    result = next((e for e in reversed(events) if e.get("type") == "result"), {})
    results = {}
    for e in events:
        content = e.get("message", {}).get("content", []) if e.get("type") == "user" else []
        for block in content if isinstance(content, list) else []:
            if block.get("type") == "tool_result":
                results[block["tool_use_id"]] = block
    calls = []
    for e in events:
        for block in e.get("message", {}).get("content", []) if e.get("type") == "assistant" else []:
            if block.get("type") != "tool_use":
                continue
            res = results.get(block["id"], {})
            text = claude_code._text(res.get("content"))
            if len(text) > _MODEL_RESULT_CHARS:
                text = f"{text[:_MODEL_RESULT_CHARS]}\n[cut: {len(text)} characters in model/run-{n}.jsonl]"
            calls.append(
                {
                    "tool": claude_code._tool_name(block["name"]),
                    "args": block.get("input", {}),
                    "is_error": bool(res.get("is_error")),
                    "result": text,
                }
            )
    answer = str(result.get("result") or "")
    finished = bool(result) and not result.get("is_error")
    checks = [{**r, "ok": _text_rule(r, answer)} for r in spec.get("expect", [])]
    for c in checks:
        if c["ok"] is None:
            raise SystemExit(f"model.expect allows contains, not_contains, regex, not_regex: {c}")
    held = [c["ok"] for c in checks]
    misled = (any(held) if spec.get("misled_if") == "any" else all(held)) if finished and held else None
    return {
        "run": n,
        "condition": name,
        "prompt": prompt,
        "answer": answer,
        "checks": checks,
        "misled": misled,
        "end_reason": "error" if result.get("is_error") else result.get("subtype", "no result"),
        "tool_calls": calls,
        "turns": result.get("num_turns"),
        "seconds": round((result.get("duration_ms") or 0) / 1000, 1) or seconds,
        "model": init.get("model"),
        "claude_code_version": init.get("claude_code_version"),
        "api_cost_usd": result.get("total_cost_usd"),
        "stderr": stderr[-2000:],
    }


def _run_model(poc: dict[str, Any], server_cmd: str, out: Path) -> dict[str, Any]:
    """The model block: repeat runs, written to model.json; returns the summary for result.json."""
    spec = poc["model"]
    repeat = int(spec.get("repeat", 3))
    runs = [_model_run(poc, spec, server_cmd, n + 1, out) for n in range(repeat)]
    done = [r for r in runs if r["misled"] is not None]
    record = {
        "question": spec["question"],
        "model": spec.get("model") or MODEL,
        "repeat": repeat,
        "max_turns": spec.get("max_turns", 20),
        "misled_if": spec.get("misled_if", "all"),
        "runs": runs,
    }
    (out / "model.json").write_text(json.dumps(record, ensure_ascii=False, indent=2) + "\n")
    if os.environ.get("CLAUDE_CONFIG_DIR"):
        claude_code.redact_account(out, out, Path(os.environ["CLAUDE_CONFIG_DIR"]) / ".claude.json")
    return {
        "question": spec["question"],
        "model": record["model"],
        "runs": len(done),
        "misled": sum(bool(r["misled"]) for r in done),
        "failed": len(runs) - len(done),
        "per_run": [
            {
                "run": r["run"],
                "misled": r["misled"],
                "end_reason": r["end_reason"],
                "answer": r["answer"],
                "tool_calls": [{"tool": c["tool"], "args": c["args"]} for c in r["tool_calls"]],
                "seconds": r["seconds"],
            }
            for r in runs
        ],
    }


def run_poc(poc_file: str, out_dir: str, with_model: bool = True) -> dict[str, Any]:
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
        "level": "model" if poc.get("model") else poc.get("level", "mcp"),
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
    if poc.get("model") and with_model:
        result["model_result"] = _run_model(poc, server_cmd, out)
    elif (out / "result.json").exists():
        # --no-model keeps the model result of the run before.
        before = json.loads((out / "result.json").read_text()).get("model_result")
        if before and poc.get("model"):
            result["model_result"] = before
    (out / "transcript.json").write_text(json.dumps({"attempts": attempts}, ensure_ascii=False, indent=2) + "\n")
    (out / "result.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
    return result


def summarize_pocs(root: str) -> str:
    """One line per server and problem: how many PoCs reproduced the problem."""
    counts: dict[tuple[str, str], dict[str, int]] = {}
    for f in sorted(Path(root).glob("*/*/*/runs/*/result.json")):
        if f.relative_to(root).parts[0].startswith("_"):  # pocs/_samples
            continue
        r = json.loads(f.read_text())
        c = counts.setdefault((r["server"], r["problem"]), {"reproduced": 0, "not reproduced": 0})
        c[r["result"]] = c.get(r["result"], 0) + 1
    lines = ["| server | problem | reproduced | not reproduced |", "|---|---|---|---|"]
    for (server, problem), c in sorted(counts.items()):
        lines.append(f"| {server} | {problem} | {c['reproduced']} | {c['not reproduced']} |")
    return "\n".join(lines) + "\n"
