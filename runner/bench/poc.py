"""Run one PoC: build its evidence, call the server's tools over MCP without a
model, record every request and response, and decide whether the problem was
reproduced.

A PoC is pocs/<problem>/<server>/<case-id>/poc.yaml. ${EVIDENCE} and ${DB_DIR}
in tool arguments are replaced with the folders the server was started with.
"""

from __future__ import annotations

import asyncio
import base64
import json
import os
import re
import tempfile
import time
from datetime import UTC, datetime
from pathlib import Path
from typing import Any, TextIO

import yaml

from .mcp_server import start_server


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


def _write_fixture(root: Path, item: dict[str, Any]) -> dict[str, Any]:
    path = root / item["path"]
    path.parent.mkdir(parents=True, exist_ok=True)
    if "hex" in item:
        data = bytes.fromhex(item["hex"].replace(" ", ""))
    elif "base64" in item:
        data = base64.b64decode(item["base64"])
    else:
        data = item.get("text", "").encode()
    path.write_bytes(data)
    # Kept in the transcript so the result can be shown next to the source.
    return {
        "path": item["path"],
        "size": len(data),
        "hex": data.hex(),
        "text": data.decode("utf-8", "backslashreplace"),
    }


def _check(rule: dict[str, Any], steps: list[dict[str, Any]]) -> dict[str, Any]:
    step = steps[rule.get("step", 1) - 1]
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
    else:
        raise SystemExit(f"unknown expect rule: {rule}")
    return {**rule, "ok": ok}


async def _run(poc: dict[str, Any], server_cmd: str, evidence: Path, db_dir: Path, errlog: TextIO) -> dict[str, Any]:
    env = {"EVIDENCE": str(evidence), "DB_DIR": str(db_dir)}
    fixtures = [_write_fixture(evidence, f) for f in poc.get("fixture", [])]
    tools = sorted({s["tool"] for s in poc["steps"]})
    steps: list[dict[str, Any]] = []
    async with start_server(_fill(server_cmd, env), tools, errlog) as server:
        for s in poc["steps"]:
            args = _fill(s.get("args", {}), env)
            started = time.monotonic()
            limit = s.get("timeout_s", 120)
            try:
                res = await asyncio.wait_for(server.call(s["tool"], args, allow_hidden=True), limit)
                response = {"text": res.text, "is_error": res.is_error, "timed_out": False}
            except TimeoutError:
                response = {"text": "", "is_error": False, "timed_out": True}
            steps.append(
                {"tool": s["tool"], "args": args, "response": response, "seconds": round(time.monotonic() - started, 3)}
            )
        info = server.info
    return {"server": info, "fixtures": fixtures, "steps": steps}


def run_poc(poc_file: str, out_dir: str) -> dict[str, Any]:
    poc = yaml.safe_load(Path(poc_file).read_text())
    server_cmd = os.environ["BENCH_SERVER_CMD"]
    with tempfile.TemporaryDirectory() as tmp:
        evidence, db_dir = Path(tmp, "evidence"), Path(tmp, "db")
        evidence.mkdir()
        db_dir.mkdir()
        with open(db_dir / "server.log", "w") as errlog:
            record = asyncio.run(_run(poc, server_cmd, evidence, db_dir, errlog))
        server_log = (db_dir / "server.log").read_text(errors="replace")
    checks = [_check(r, record["steps"]) for r in poc.get("expect", [])]
    reproduced = bool(checks) and all(c["ok"] for c in checks)
    result = {
        "case_id": poc["case_id"],
        "problem": poc["problem"],
        "server": poc["server"],
        "commit": poc.get("commit", ""),
        "display": poc.get("display", "response"),
        "result": "reproduced" if reproduced else "not reproduced",
        "checks": checks,
        "image": os.environ.get("BENCH_IMAGE_ID", ""),
        "ran_at": datetime.now(UTC).isoformat(timespec="seconds"),
    }
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)
    (out / "transcript.json").write_text(
        json.dumps({**record, "server_log": server_log[-4000:]}, ensure_ascii=False, indent=2) + "\n"
    )
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
