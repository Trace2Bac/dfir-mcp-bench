"""Run one PoC: build its evidence, call the server's tools over MCP without a
model, record every request and response, and decide whether the problem was
reproduced.

A PoC is pocs/<problem>/<server>/<case-id>/poc.yaml. In fixture paths, tool
arguments and env values, ${EVIDENCE}, ${DB_DIR}, ${OUTSIDE} (a folder next to
the evidence that the server is not given), ${STUBS} (stub programs) and
${PATH} (the runner's PATH) are filled in, and ${ANTHROPIC_STUB_URL} with an
`anthropic_stub`. A PoC's `services` run beside the server and its
`anthropic_stub` answers the server's own model calls (see _prepared).

Besides the tool calls, the transcript keeps what the model would be given:
the server's instructions and its tool list (descriptions, schemas,
annotations), so problems in the definitions can be shown next to the
behaviour.

A PoC with a `model` block (level `model`) also asks one question about the
same evidence of each model in `model.models`, `model.repeat` times per
model, each on freshly written evidence. A Claude model runs in Claude Code
(headless, the PoC's server as its only tools). A local model, served by an
Ollama server (BENCH_OLLAMA_URL), runs in a small loop here instead (harness
`ollama-chat`): the server's tools, under their own names, go to Ollama's chat
API, and each tool call the model asks for is made over MCP (default
max_turns 40 there, 20 in Claude Code). A run that made no successful MCP call
is `tool_failed`; one that did but ended (max_turns, timeout) without a final
answer is `no_answer`. With `model.defect_tools` (the tools whose successful
response carries the defect), a run that answered without a successful call of
one of them is `not_reached`. Otherwise the `model.expect` rules
are checked on its final answer, and it counts as misled when all of them
hold (`misled_if: any`: when one does), else as correct. The scripted calls
still decide `result`; the model runs add `model_result` (per model under
`by_model`) and model/<model>/model.json.
"""

from __future__ import annotations

import asyncio
import base64
import contextlib
import http.server
import json
import os
import re
import shlex
import shutil
import signal
import socket
import subprocess
import sys
import tempfile
import threading
import time
import urllib.request
from collections.abc import Iterator
from datetime import UTC, datetime
from pathlib import Path
from typing import Any, TextIO

import yaml
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

from . import claude_code

# Fixture content beyond this size is summarised in the transcript, not copied.
_KEEP_BYTES = 4096
# The models a model block runs when it lists none (`model.models`). `local`
# is the Ollama model BENCH_LOCAL_MODEL (`local:<tag>` names a tag) of the
# Ollama server at BENCH_OLLAMA_URL (the Docker host's port 11434 by
# default), run by the loop in _local_run, not by Claude Code.
# Haiku by default, to check that a case holds; Opus and the local model are added
# later with --models or model.models.
DEFAULT_MODELS = ["claude-haiku-4-5"]
LOCAL = "local"
_LOCAL_DEFAULT = "qwen3.5:9b"
# Ollama on the Docker host (Docker Desktop resolves the name; bench.sh adds it on Linux).
_OLLAMA_DEFAULT = "http://host.docker.internal:11434"
# Tool results are cut here in model.json; the full text stays in model/<model>/run-<n>.jsonl.
_MODEL_RESULT_CHARS = 4000
# What runs a model: Claude Code for Claude models, the loop in _local_run for local ones.
HARNESS_CLAUDE = "claude-code"
HARNESS_OLLAMA = "ollama-chat"
# The local loop: a tool result longer than this is cut before the model sees it.
_LOCAL_RESULT_CHARS = 30000
# The local loop: seconds per Ollama request and per MCP tool call.
_LOCAL_REQUEST_S = 300
_LOCAL_TOOL_S = 600
# The local loop's Ollama options, under the PoC's `model.options`. Ollama loads a
# model with a 4096-token context unless told otherwise and silently cuts a longer
# prompt, and a server's tool list alone can be over 10k tokens.
_LOCAL_OPTIONS = {"temperature": 0, "num_ctx": 65536}
# The local loop's system message, after the server's own instructions.
_LOCAL_SYSTEM = "You are a forensic analyst. Use the tools to answer. Give a final answer when done."
# The API key the server is given with anthropic_stub; the stub accepts any key.
_STUB_API_KEY = "sk-ant-bench-stub"
# The end of each service's stdout and stderr that the transcript keeps.
_SERVICE_LOG_CHARS = 8000
# A file read by a file_contains / file_not_contains / file_regex rule: what the transcript keeps.
_FILE_KEEP_CHARS = 4000


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


def _write_one(
    path: Path, item: dict[str, Any], env: dict[str, str], i: int | None, later: list[tuple[Path, dict[str, Any]]]
) -> int:
    path.parent.mkdir(parents=True, exist_ok=True)
    if item.get("dir"):
        # A folder's mode and mtime are set after every fixture is written (_finish_dirs),
        # so files can be written into a folder that is then made read-only.
        path.mkdir(exist_ok=True)
        later.append((path, item))
        return 0
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


def _finish_dirs(later: list[tuple[Path, dict[str, Any]]]) -> None:
    """The mtime and mode of the `dir: true` fixtures, deepest folder first."""
    for path, item in sorted(later, key=lambda x: len(x[0].parts), reverse=True):
        if "mtime" in item:
            t = _mtime(item["mtime"])
            os.utime(path, (t, t))
        if "mode" in item:
            os.chmod(path, int(str(item["mode"]), 8))


def _write_fixture(
    item: dict[str, Any], env: dict[str, str], roots: dict[str, Path], later: list[tuple[Path, dict[str, Any]]]
) -> dict[str, Any]:
    """Write one fixture item; `repeat: N` writes N files, {i} in path and text; `dir: true` a folder."""
    root = roots[item.get("root", "evidence")]
    if item.get("fill") and "text" in item:  # opt-in: ${UID} and the like in the text
        item = {**item, "text": _fill(item["text"], env)}
    n = item.get("repeat")
    paths = [item["path"].replace("{i}", str(i)) for i in range(n)] if n else [item["path"]]
    total = 0
    for k, rel in enumerate(paths):
        total += _write_one(root / _fill(rel, env), item, env, k if n else None, later)
    kept: dict[str, Any] = {"path": item["path"], "root": item.get("root", "evidence"), "size": total}
    for key in ("dir", "mode", "mtime", "symlink", "repeat"):
        if key in item:
            kept[key] = item[key]
    if not n and "symlink" not in item and "size" not in item and not item.get("dir"):
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


class _AnthropicStub:
    """A stand-in for the Anthropic Messages API on 127.0.0.1, for a server that calls a model itself.

    POST /v1/messages is answered with the PoC's `anthropic_stub.responses` in order
    (a string is one text block; a mapping gives `content` blocks and `stop_reason`),
    as JSON or, when the request asks for `stream`, as server-sent events. A request
    after the last response gets a 400 error. POST /v1/messages/count_tokens answers
    0 tokens. Every request is recorded with its body.
    """

    def __init__(self, spec: dict[str, Any]) -> None:
        self.responses: list[Any] = list(spec.get("responses") or [])  # filled in by _prepare
        self.requests: list[dict[str, Any]] = []
        self.lock = threading.Lock()
        stub = self

        class Handler(http.server.BaseHTTPRequestHandler):
            def log_message(self, *args: Any) -> None:
                pass

            def _send(self, code: int, body: bytes, kind: str = "application/json") -> None:
                self.send_response(code)
                self.send_header("Content-Type", kind)
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)

            def do_GET(self) -> None:
                stub._record(self, None)
                self._send(404, json.dumps(_api_error("not_found_error", "anthropic_stub: no such path")).encode())

            def do_POST(self) -> None:
                raw = self.rfile.read(int(self.headers.get("Content-Length") or 0))
                try:
                    body = json.loads(raw) if raw else {}
                except ValueError:
                    body = {"_raw": raw.decode("utf-8", "backslashreplace")}
                n = stub._record(self, body)
                path = self.path.split("?", 1)[0].rstrip("/")
                if path.endswith("/v1/messages/count_tokens"):
                    self._send(200, b'{"input_tokens": 0}')
                elif not path.endswith("/v1/messages"):
                    self._send(404, json.dumps(_api_error("not_found_error", "anthropic_stub: no such path")).encode())
                elif n >= len(stub.responses):
                    msg = f"anthropic_stub: no response left ({len(stub.responses)} given)"
                    self._send(400, json.dumps(_api_error("invalid_request_error", msg)).encode())
                else:
                    message = _stub_message(stub.responses[n], n, body if isinstance(body, dict) else {})
                    if isinstance(body, dict) and body.get("stream"):
                        self._send(200, _stub_events(message), "text/event-stream")
                    else:
                        self._send(200, json.dumps(message).encode())

        self.httpd = http.server.ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        self.url = f"http://127.0.0.1:{self.httpd.server_address[1]}"
        self.thread = threading.Thread(target=self.httpd.serve_forever, daemon=True)
        self.thread.start()

    def _record(self, handler: http.server.BaseHTTPRequestHandler, body: Any) -> int:
        """Record a request; returns the number of /v1/messages requests before it."""
        path = handler.path.split("?", 1)[0].rstrip("/")
        with self.lock:
            n = sum(r["path"].split("?", 1)[0].rstrip("/").endswith("/v1/messages") for r in self.requests)
            self.requests.append({"method": handler.command, "path": handler.path, "body": body})
            return n if path.endswith("/v1/messages") else -1

    def stop(self) -> dict[str, Any]:
        self.httpd.shutdown()
        self.httpd.server_close()
        return {"url": self.url, "responses": len(self.responses), "requests": self.requests}


def _api_error(kind: str, message: str) -> dict[str, Any]:
    return {"type": "error", "error": {"type": kind, "message": message}}


def _stub_message(response: Any, n: int, request: dict[str, Any]) -> dict[str, Any]:
    if isinstance(response, dict):
        content = response.get("content") or [{"type": "text", "text": str(response.get("text", ""))}]
        stop = response.get("stop_reason") or (
            "tool_use" if any(b.get("type") == "tool_use" for b in content) else "end_turn"
        )
    else:
        content, stop = [{"type": "text", "text": str(response)}], "end_turn"
    return {
        "id": f"msg_bench_stub_{n + 1}",
        "type": "message",
        "role": "assistant",
        "model": str(request.get("model") or "anthropic-stub"),
        "content": content,
        "stop_reason": stop,
        "stop_sequence": None,
        "usage": {"input_tokens": 0, "output_tokens": 0},
    }


def _stub_events(message: dict[str, Any]) -> bytes:
    """*message* as the Messages API streams it."""

    def event(name: str, data: dict[str, Any]) -> str:
        return f"event: {name}\ndata: {json.dumps({'type': name, **data})}\n\n"

    out = [event("message_start", {"message": {**message, "content": [], "stop_reason": None}})]
    for i, block in enumerate(message["content"]):
        if block.get("type") == "tool_use":
            start = {**block, "input": {}}
            delta = {"type": "input_json_delta", "partial_json": json.dumps(block.get("input", {}))}
        else:
            start, delta = {"type": "text", "text": ""}, {"type": "text_delta", "text": str(block.get("text", ""))}
        out.append(event("content_block_start", {"index": i, "content_block": start}))
        out.append(event("content_block_delta", {"index": i, "delta": delta}))
        out.append(event("content_block_stop", {"index": i}))
    out.append(
        event(
            "message_delta",
            {"delta": {"stop_reason": message["stop_reason"], "stop_sequence": None}, "usage": {"output_tokens": 0}},
        )
    )
    out.append(event("message_stop", {}))
    return "".join(out).encode()


def _wait_port(port: int, proc: subprocess.Popen[bytes], seconds: float) -> bool:
    deadline = time.monotonic() + seconds
    while time.monotonic() < deadline and proc.poll() is None:
        try:
            with socket.create_connection(("127.0.0.1", port), timeout=1):
                return True
        except OSError:
            time.sleep(0.1)
    return False


def _start_services(specs: list[dict[str, Any]], env: dict[str, str], tmp: str) -> list[dict[str, Any]]:
    """Write each service's script under ${STUBS} and start it; wait for its ready_port."""
    started: list[dict[str, Any]] = []
    for spec in specs:
        name = str(spec["name"])
        script = Path(env["STUBS"], name)
        script.write_text(_fill(spec["text"], env))
        script.chmod(0o755)
        args = [str(a) for a in _fill(spec.get("args", []), env)]
        out, err = Path(tmp, f"service-{name}.out"), Path(tmp, f"service-{name}.err")
        with open(out, "wb") as fo, open(err, "wb") as fe:
            proc = subprocess.Popen(
                [str(script), *args],
                cwd=tmp,
                env={**os.environ, **_fill(spec.get("env", {}), env)},
                stdin=subprocess.DEVNULL,
                stdout=fo,
                stderr=fe,
                start_new_session=True,
            )
        svc = {"name": name, "args": args, "proc": proc, "out": out, "err": err}
        started.append(svc)
        port = spec.get("ready_port")
        if port is not None and not _wait_port(
            int(_fill(str(port), env)), proc, float(spec.get("ready_timeout_s", 20))
        ):
            records = _stop_services(started)
            raise SystemExit(f"service {name} did not listen on port {port}: {json.dumps(records[-1])}")
    return started


def _stop_services(started: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Stop the services (SIGTERM, then SIGKILL); return what each one printed."""
    records = []
    for svc in started:
        proc = svc["proc"]
        if proc.poll() is None:
            try:
                os.killpg(proc.pid, signal.SIGTERM)
                proc.wait(5)
            except (OSError, subprocess.TimeoutExpired):
                with contextlib.suppress(OSError):
                    os.killpg(proc.pid, signal.SIGKILL)
                proc.wait()
        records.append(
            {
                "name": svc["name"],
                "args": svc["args"],
                "returncode": proc.returncode,
                "stdout": svc["out"].read_text(errors="replace")[-_SERVICE_LOG_CHARS:],
                "stderr": svc["err"].read_text(errors="replace")[-_SERVICE_LOG_CHARS:],
            }
        )
    return records


@contextlib.contextmanager
def _prepared(tmp: str, poc: dict[str, Any], cond: dict[str, Any], server_cmd: str) -> Iterator[dict[str, Any]]:
    """_prepare, and the PoC's stand-ins running until the block ends.

    The Anthropic stub and the `services` are started before the server; when the
    block ends they are stopped and their records put in prep["backing"]
    (`anthropic_stub`, `services`), which is empty for a PoC with neither.
    """
    stub = _AnthropicStub(poc["anthropic_stub"]) if poc.get("anthropic_stub") else None
    started: list[dict[str, Any]] = []
    backing: dict[str, Any] = {}
    try:
        prep = _prepare(tmp, poc, cond, server_cmd, stub)
        prep["backing"] = backing
        started = _start_services(poc.get("services", []) + cond.get("services", []), prep["env"], tmp)
        yield prep
    finally:
        if started:
            backing["services"] = _stop_services(started)
        if stub:
            backing["anthropic_stub"] = stub.stop()


def _prepare(
    tmp: str, poc: dict[str, Any], cond: dict[str, Any], server_cmd: str, stub: _AnthropicStub | None = None
) -> dict[str, Any]:
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
        # the user the server runs as, for fixtures that record file owners (a baseline)
        "UID": str(os.getuid()),
        "GID": str(os.getgid()),
    }
    base: dict[str, str] = {}
    if stub:
        # The server's own model backend; the PoC's env can still override or rename these.
        env["ANTHROPIC_STUB_URL"] = stub.url
        stub.responses = [_fill(r, env) for r in stub.responses]
        base = {"ANTHROPIC_BASE_URL": stub.url, "ANTHROPIC_API_KEY": _STUB_API_KEY}
    for item in poc.get("stubs", []):
        path = roots["stubs"] / item["name"]
        path.write_text(_fill(item["text"], env))
        path.chmod(0o755)
    later: list[tuple[Path, dict[str, Any]]] = []
    fixtures = [_write_fixture(f, env, roots, later) for f in poc.get("fixture", []) + cond.get("fixture", [])]
    _finish_dirs(later)
    extra = {**base, **_fill({**poc.get("env", {}), **cond.get("env", {})}, env)}
    command = _server_command(_fill(server_cmd, env), extra)
    return {"roots": roots, "env": env, "fixtures": fixtures, "extra": extra, "command": command}


_FILE_TEXT_RULES = ("file_contains", "file_not_contains", "file_regex")


def _read_after(path: Path) -> str | None:
    """A file the server wrote, as text; None when there is no such file."""
    try:
        return path.read_bytes().decode("utf-8", "backslashreplace")
    except OSError:
        return None


def _run_condition(poc: dict[str, Any], cond: dict[str, Any], server_cmd: str) -> dict[str, Any]:
    with tempfile.TemporaryDirectory() as tmp:
        with _prepared(tmp, poc, cond, server_cmd) as prep:
            env = prep["env"]
            with open(Path(tmp, "server.log"), "w") as errlog:
                record = asyncio.run(_session(prep["command"], poc["steps"], env, errlog))
        # Read once the services have stopped, so a recorder has written everything.
        files = {}
        texts: dict[str, str | None] = {}
        for r in poc.get("expect", []):
            key = r.get("file_exists") or r.get("file_missing")
            if key:
                files[key] = Path(_fill(key, env)).exists()
            key = next((r[k] for k in _FILE_TEXT_RULES if k in r), None)
            if key and key not in texts:
                texts[key] = _read_after(Path(_fill(key, env)))
        log = Path(tmp, "server.log").read_text(errors="replace")
    run = {
        "condition": cond.get("name", "default"),
        "env": prep["extra"],
        "fixtures": prep["fixtures"],
        **record,
        "files_after": files,
        "server_log": log[-4000:],
        **prep["backing"],
    }
    if texts:
        # The whole text is checked (_check); the transcript keeps the start of it.
        run["_file_texts"] = texts
        run["file_texts"] = {
            k: None if t is None else _cut(t, _FILE_KEEP_CHARS, f"cut: {len(t)} characters") for k, t in texts.items()
        }
    return run


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
    kind = next((k for k in _FILE_TEXT_RULES if k in rule), None)
    if kind:
        # The file must exist; then `text` is looked for (file_contains, file_not_contains)
        # or `pattern` searched for (file_regex) in it.
        run = runs[rule.get("condition") or next(iter(runs))]
        text = run["_file_texts"].get(rule[kind])
        if text is None:
            return {**rule, "ok": False, "missing": True}
        if kind == "file_regex":
            return {**rule, "ok": re.search(rule["pattern"], text) is not None}
        return {**rule, "ok": (rule["text"] in text) == (kind == "file_contains")}
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


def _backing(prep: dict[str, Any]) -> dict[str, Any]:
    """A model run's service and Anthropic stub records, with ${EVIDENCE} and the like for the temporary folders."""
    if not prep["backing"]:
        return {}
    return dict(json.loads(_untemp(json.dumps(prep["backing"], ensure_ascii=False), prep["roots"])))


def _model_prompt(server: str, question: str) -> str:
    # Only the question: nothing about what the PoC shows.
    return (
        f"You are a digital forensic examiner. Your only tools are those of the {server} MCP server. "
        "The evidence is in ${EVIDENCE}. Base your answer on what the tools return.\n\n" + question.strip() + "\n"
    )


def _local_tag(name: str) -> str | None:
    """The Ollama model tag of a `local` (or `local:<tag>`) entry; None for a Claude model."""
    if name == LOCAL:
        return os.environ.get("BENCH_LOCAL_MODEL") or _LOCAL_DEFAULT
    if name.startswith(LOCAL + ":"):
        return name.split(":", 1)[1]
    return None


def model_key(name: str) -> str:
    """The name a model's results are filed under (by_model key, model/<key>/)."""
    tag = _local_tag(name)
    return f"local-{re.sub(r'[^A-Za-z0-9._-]+', '-', tag).strip('-')}" if tag else name


def poc_models(poc: dict[str, Any], override: list[str] | None = None) -> list[str]:
    """The model block's models: --models, else `model.models`, else DEFAULT_MODELS."""
    spec = poc.get("model") or {}
    names = override or spec.get("models") or ([spec["model"]] if spec.get("model") else DEFAULT_MODELS)
    return list(dict.fromkeys(str(n).strip() for n in names if str(n).strip()))


class _Unavailable(Exception):
    """A model that cannot be run here; its runs are recorded as failed with this message."""


def _get(url: str, timeout: float) -> bytes:
    with urllib.request.urlopen(url, timeout=timeout) as r:
        return bytes(r.read())


def _local_endpoint(tag: str) -> str:
    """The Ollama URL that serves *tag*; raises _Unavailable when it cannot be reached or lacks the model."""
    url = (os.environ.get("BENCH_OLLAMA_URL") or _OLLAMA_DEFAULT).rstrip("/")
    try:
        listed = json.loads(_get(f"{url}/api/tags", 10)).get("models") or []
    except (OSError, ValueError) as exc:
        raise _Unavailable(
            f"local model endpoint not reachable: {url} ({exc}); start Ollama there or set BENCH_OLLAMA_URL"
        ) from exc
    names = {str(m.get("name") or m.get("model") or "") for m in listed}
    if tag not in names and f"{tag}:latest" not in names:
        raise _Unavailable(
            f"local model endpoint {url} has no model {tag!r} (it has: {', '.join(sorted(names)) or 'none'});"
            " set BENCH_LOCAL_MODEL to one of them"
        )
    return url


def _classify(events: list[dict[str, Any]], server: str, answer: str) -> tuple[str | None, str]:
    """(status, reason) of a run before its answer is judged; status None means judge the answer.

    failed: the model never got going (no init, or an error before any tool call).
    tool_failed: no tool call at all; no MCP call of this server that succeeded
    (calls to tools it does not have, malformed or rejected calls).
    no_answer: a successful call, but no final answer (max_turns, timeout).
    """
    init = any(e.get("type") == "system" and e.get("subtype") == "init" for e in events)
    result = next((e for e in reversed(events) if e.get("type") == "result"), {})
    uses: list[dict[str, Any]] = []
    errors: dict[str, bool] = {}
    for e in events:
        content = e.get("message", {}).get("content", [])
        for block in content if isinstance(content, list) else []:
            if e.get("type") == "assistant" and block.get("type") == "tool_use":
                uses.append(block)
            elif e.get("type") == "user" and block.get("type") == "tool_result":
                errors[block.get("tool_use_id", "")] = bool(block.get("is_error"))
    if not init:
        return "failed", "not_started"
    if not uses and (not result or result.get("is_error")):
        return "failed", "error"
    if not uses:
        return "tool_failed", "no_tool_call"
    prefix = f"mcp__{server}__"
    if not any(u.get("name", "").startswith(prefix) and errors.get(u.get("id", "")) is False for u in uses):
        return "tool_failed", "tool_calls_rejected"
    if not result or result.get("is_error") or result.get("subtype") != "success" or not answer.strip():
        return "no_answer", "no_final_answer"
    return None, ""


def _model_condition(poc: dict[str, Any], spec: dict[str, Any]) -> dict[str, Any]:
    conditions = poc.get("conditions") or [{"name": "default"}]
    name = spec.get("condition") or conditions[0].get("name", "default")
    return next(c for c in conditions if c.get("name", "default") == name)


def _max_turns(spec: dict[str, Any], local: bool) -> int:
    return int(spec.get("max_turns", 40 if local else 20))


def _reached(spec: dict[str, Any], calls: list[dict[str, Any]]) -> bool | None:
    """Whether a model.defect_tools tool was called successfully; None without defect_tools.

    With model.defect_response (a regex) the call's result must also match it, so a
    call that returned something other than the defective response does not count.
    """
    tools = spec.get("defect_tools")
    if not tools:
        return None
    pattern = spec.get("defect_response")
    return any(
        c["tool"] in tools and not c["is_error"] and (not pattern or re.search(pattern, str(c.get("result", ""))))
        for c in calls
    )


def _judge(
    spec: dict[str, Any], answer: str, status: str | None, reached: bool | None = None
) -> tuple[list[dict[str, Any]], str, bool | None]:
    """(checks, status, misled): the model.expect rules on *answer*, which decide a run not already classed."""
    if status is None and reached is False:
        status = "not_reached"
    checks = [{**r, "ok": _text_rule(r, answer)} for r in spec.get("expect", [])]
    for c in checks:
        if c["ok"] is None:
            raise SystemExit(f"model.expect allows contains, not_contains, regex, not_regex: {c}")
    misled = None
    if status is None:
        held = [c["ok"] for c in checks]
        misled = bool(held) and (any(held) if spec.get("misled_if") == "any" else all(held))
        status = "misled" if misled else "correct"
    return checks, status, misled


def _cut(text: str, limit: int, note: str) -> str:
    return f"{text[:limit]}\n[{note}]" if len(text) > limit else text


def _kept(text: str, n: int) -> str:
    """A tool result as model.json keeps it."""
    return _cut(text, _MODEL_RESULT_CHARS, f"cut: {len(text)} characters in run-{n}.jsonl")


def _model_run(
    poc: dict[str, Any],
    spec: dict[str, Any],
    server_cmd: str,
    n: int,
    folder: Path,
    model: str,
) -> dict[str, Any]:
    """One Claude Code run on fresh evidence; its stream-json is kept as <folder>/run-<n>.jsonl."""
    cond = _model_condition(poc, spec)
    server = str(poc["server"])
    with tempfile.TemporaryDirectory() as tmp, _prepared(tmp, poc, cond, server_cmd) as prep:
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
            model,
            "--max-turns",
            str(_max_turns(spec, False)),
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
        except OSError as exc:
            stream, stderr = "", f"{type(exc).__name__}: {exc}"
        seconds = round(time.monotonic() - started, 1)
        stream = _untemp(stream, prep["roots"])
        stderr = _untemp(stderr or "", prep["roots"])
        prompt = _untemp(prompt, prep["roots"])
    (folder / f"run-{n}.jsonl").write_text(stream)
    backing = _backing(prep)

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
            calls.append(
                {
                    "tool": claude_code._tool_name(block["name"]),
                    "args": block.get("input", {}),
                    "is_error": bool(res.get("is_error")) if res else True,
                    "result": claude_code._text(res.get("content")),
                }
            )
    answer = str(result.get("result") or "")
    status, reason = _classify(events, server, answer)
    # defect_response is matched on the whole result; model.json keeps it trimmed
    reached = _reached(spec, calls)
    calls = [{**c, "result": _kept(c["result"], n)} for c in calls]
    checks, status, misled = _judge(spec, answer, status, reached)
    reason = "defect_not_reached" if status == "not_reached" else reason
    return {
        "run": n,
        "condition": cond.get("name", "default"),
        "harness": HARNESS_CLAUDE,
        "prompt": prompt,
        "answer": answer,
        "checks": checks,
        "status": status,
        "reason": reason,
        "misled": misled,
        "reached_defect": reached,
        "end_reason": "error" if result.get("is_error") else result.get("subtype", "no result"),
        "tool_calls": calls,
        "turns": result.get("num_turns"),
        "seconds": round((result.get("duration_ms") or 0) / 1000, 1) or seconds,
        "model": init.get("model") or model,
        "claude_code_version": init.get("claude_code_version"),
        "api_cost_usd": result.get("total_cost_usd"),
        "stderr": stderr[-2000:],
        **backing,
    }


def _local_options(spec: dict[str, Any]) -> dict[str, Any]:
    return {**_LOCAL_OPTIONS, **(spec.get("options") or {})}


def _post_json(url: str, body: dict[str, Any], timeout: float) -> dict[str, Any]:
    req = urllib.request.Request(
        url, data=json.dumps(body).encode(), headers={"Content-Type": "application/json"}, method="POST"
    )
    with urllib.request.urlopen(req, timeout=timeout) as r:
        data = json.loads(r.read())
    return data if isinstance(data, dict) else {}


def _schema(tool: Any) -> dict[str, Any]:
    """A tool's input schema; mcp 1.x calls it inputSchema, 2.x input_schema."""
    return getattr(tool, "inputSchema", None) or getattr(tool, "input_schema", None) or {"type": "object"}


async def _local_chat(
    command: str, url: str, tag: str, question: str, spec: dict[str, Any], errlog: TextIO
) -> dict[str, Any]:
    """The local loop: the server's tools to Ollama's /api/chat, each tool call made over MCP.

    The log has one line per event: `tools` (the server's instructions and the
    tools as sent), then per turn a `request` (the messages added since the
    last request; the first request also has the options) and a `response`
    (Ollama's reply), and a `tool` line per call made.
    """
    log: list[dict[str, Any]] = []
    calls: list[dict[str, Any]] = []
    turns, answer, end_reason, error = 0, "", "max_turns", ""
    max_turns = _max_turns(spec, True)
    options = _local_options(spec)
    deadline = time.monotonic() + float(spec.get("timeout_s", 1800))
    argv = shlex.split(command)
    params = StdioServerParameters(command=argv[0], args=argv[1:])
    async with stdio_client(params, errlog=errlog) as (read, write), ClientSession(read, write) as session:
        init = await session.initialize()
        listed = (await session.list_tools()).tools
        names = {t.name for t in listed}
        tools = [
            {
                "type": "function",
                "function": {"name": t.name, "description": t.description or "", "parameters": _schema(t)},
            }
            for t in listed
        ]
        instructions = getattr(init, "instructions", None) or ""
        log.append({"type": "tools", "instructions": instructions, "tools": tools})
        system = "\n\n".join(x for x in (instructions.strip(), _LOCAL_SYSTEM) if x)
        messages: list[dict[str, Any]] = [{"role": "system", "content": system}, {"role": "user", "content": question}]
        sent = 0
        while turns < max_turns:
            if time.monotonic() > deadline:
                end_reason = "timeout"
                break
            body = {"model": tag, "messages": messages, "tools": tools, "stream": False, "options": options}
            log.append(
                {"type": "request", "turn": turns + 1, "messages": messages[sent:]}
                | ({"model": tag, "options": options} if not sent else {})
            )
            sent = len(messages)
            try:
                reply = await asyncio.to_thread(_post_json, f"{url}/api/chat", body, _LOCAL_REQUEST_S)
            except (OSError, ValueError) as exc:
                error = f"{type(exc).__name__}: {exc}"
                log.append({"type": "error", "turn": turns + 1, "error": error})
                end_reason = "error"
                break
            turns += 1
            log.append({"type": "response", "turn": turns, **reply})
            message = reply.get("message") or {}
            messages.append(message)
            wanted = message.get("tool_calls") or []
            if not wanted:
                answer = str(message.get("content") or "")
                end_reason = "success"
                break
            for tc in wanted:
                fn = tc.get("function") or {}
                name = str(fn.get("name") or "")
                args = fn.get("arguments") or {}
                if isinstance(args, str):
                    try:
                        args = json.loads(args)
                    except json.JSONDecodeError:
                        args = {"_raw": args}
                started = time.monotonic()
                if name not in names:
                    # Returned to the model as an error, so it can retry with a real name.
                    text, is_error = f"Unknown tool {name!r}. The tools are: {', '.join(sorted(names))}", True
                else:
                    try:
                        res = _response(await asyncio.wait_for(session.call_tool(name, args), _LOCAL_TOOL_S))
                        text, is_error = res["text"], res["is_error"]
                    except TimeoutError:
                        text, is_error = f"tool call timed out after {_LOCAL_TOOL_S} s", True
                    except Exception as exc:  # noqa: BLE001 - returned to the model as the call's result
                        text, is_error = f"{type(exc).__name__}: {exc}", True
                seconds = round(time.monotonic() - started, 3)
                entry = {"tool": name, "args": args, "is_error": is_error, "result": text}
                log.append({"type": "tool", "turn": turns, **entry, "seconds": seconds})
                calls.append(entry)
                messages.append(
                    {
                        "role": "tool",
                        "tool_name": name,
                        "content": _cut(text, _LOCAL_RESULT_CHARS, f"truncated by harness: {len(text)} characters"),
                    }
                )
    return {"log": log, "calls": calls, "turns": turns, "answer": answer, "end_reason": end_reason, "error": error}


def _classify_local(run: dict[str, Any]) -> tuple[str | None, str]:
    """(status, reason) of a local loop run, as _classify does for Claude Code."""
    calls = run["calls"]
    if run["end_reason"] == "not_started":
        return "failed", "not_started"
    if not calls and run["end_reason"] == "error":
        return "failed", "error"
    if not calls:
        return "tool_failed", "no_tool_call"
    if all(c["is_error"] for c in calls):
        return "tool_failed", "tool_calls_rejected"
    if run["end_reason"] != "success" or not run["answer"].strip():
        return "no_answer", "no_final_answer"
    return None, ""


def _local_run(
    poc: dict[str, Any], spec: dict[str, Any], server_cmd: str, n: int, folder: Path, tag: str, url: str
) -> dict[str, Any]:
    """One local loop run on fresh evidence; its log is kept as <folder>/run-<n>.jsonl."""
    cond = _model_condition(poc, spec)
    with tempfile.TemporaryDirectory() as tmp, _prepared(tmp, poc, cond, server_cmd) as prep:
        question = _fill(str(spec["question"]).strip(), prep["env"])
        started = time.monotonic()
        with open(Path(tmp, "server.log"), "w") as errlog:
            try:
                run = asyncio.run(_local_chat(prep["command"], url, tag, question, spec, errlog))
            except Exception as exc:  # noqa: BLE001 - the server or the loop failed; recorded as the run's result
                run = {"log": [], "calls": [], "turns": 0, "answer": "", "end_reason": "not_started"}
                # anyio wraps the real error in an ExceptionGroup; record the innermost ones
                while len(getattr(exc, "exceptions", ())) == 1:  # ExceptionGroup (3.11+)
                    exc = exc.exceptions[0]
                run["error"] = f"{type(exc).__name__}: {exc}"
        seconds = round(time.monotonic() - started, 1)
        server_log = Path(tmp, "server.log").read_text(errors="replace")
        # The temporary folders become ${EVIDENCE} and the like everywhere in the record.
        run = json.loads(_untemp(json.dumps(run, ensure_ascii=False), prep["roots"]))
        question = _untemp(question, prep["roots"])
        server_log = _untemp(server_log, prep["roots"])
    backing = _backing(prep)
    (folder / f"run-{n}.jsonl").write_text("".join(json.dumps(e, ensure_ascii=False) + "\n" for e in run["log"]))
    status, reason = _classify_local(run)
    reached = _reached(spec, run["calls"])
    checks, status, misled = _judge(spec, run["answer"], status, reached)
    reason = "defect_not_reached" if status == "not_reached" else reason
    calls = [{**c, "result": _kept(c["result"], n)} for c in run["calls"]]
    return {
        "run": n,
        "condition": cond.get("name", "default"),
        "harness": HARNESS_OLLAMA,
        "prompt": question,
        "answer": run["answer"],
        "checks": checks,
        "status": status,
        "reason": reason,
        "misled": misled,
        "reached_defect": reached,
        "end_reason": run["end_reason"],
        "tool_calls": calls,
        "turns": run["turns"],
        "seconds": seconds,
        "model": tag,
        "options": _local_options(spec),
        "stderr": "\n".join(x for x in (run.get("error", ""), server_log[-2000:]) if x),
        **backing,
    }


def _count(runs: list[dict[str, Any]], status: str) -> int:
    return sum(r["status"] == status for r in runs)


def _run_one_model(poc: dict[str, Any], server_cmd: str, out: Path, name: str) -> dict[str, Any]:
    """One model's runs, written to model/<key>/; returns its by_model entry."""
    spec = poc["model"]
    repeat = int(spec.get("repeat", 3))
    key = model_key(name)
    folder = out / "model" / key
    if folder.exists():
        shutil.rmtree(folder)
    folder.mkdir(parents=True)
    tag = _local_tag(name)
    runs: list[dict[str, Any]] = []
    error = None
    model_id = tag or name
    harness = HARNESS_OLLAMA if tag else HARNESS_CLAUDE
    try:
        if tag:
            url = _local_endpoint(tag)
            runs = [_local_run(poc, spec, server_cmd, n + 1, folder, tag, url) for n in range(repeat)]
        else:
            runs = [_model_run(poc, spec, server_cmd, n + 1, folder, name) for n in range(repeat)]
    except _Unavailable as exc:
        error = str(exc)
        print(f"model {key}: {error}", file=sys.stderr)
    record = {
        "question": spec["question"],
        "model": key,
        "model_id": model_id,
        "local": bool(tag),
        "harness": harness,
        "repeat": repeat,
        "max_turns": _max_turns(spec, bool(tag)),
        "defect_tools": spec.get("defect_tools"),
        "misled_if": spec.get("misled_if", "all"),
        "error": error,
        "runs": runs,
    }
    (folder / "model.json").write_text(json.dumps(record, ensure_ascii=False, indent=2) + "\n")
    return {
        "model": key,
        "model_id": model_id,
        "local": bool(tag),
        "harness": harness,
        "runs": _count(runs, "misled") + _count(runs, "correct"),
        "misled": _count(runs, "misled"),
        "correct": _count(runs, "correct"),
        "tool_failed": _count(runs, "tool_failed"),
        "no_answer": _count(runs, "no_answer"),
        "not_reached": _count(runs, "not_reached"),
        "reached": sum(r["reached_defect"] is True for r in runs) if spec.get("defect_tools") else None,
        "total": len(runs),
        "failed": _count(runs, "failed") + (repeat if error else 0),
        "error": error,
        "per_run": [
            {
                "run": r["run"],
                "status": r["status"],
                "reason": r["reason"],
                "misled": r["misled"],
                "reached_defect": r["reached_defect"],
                "end_reason": r["end_reason"],
                "answer": r["answer"],
                "tool_calls": [{"tool": c["tool"], "args": c["args"]} for c in r["tool_calls"]],
                "seconds": r["seconds"],
            }
            for r in runs
        ],
    }


def _worst(by_model: dict[str, dict[str, Any]]) -> dict[str, Any]:
    """The model misled most often (by share of judged runs, then count), for the list badge."""
    judged = [m for m in by_model.values() if m["runs"]] or list(by_model.values())
    if not judged:
        return {"model": "", "misled": 0, "runs": 0}
    w = max(judged, key=lambda m: (m["misled"] / m["runs"] if m["runs"] else 0, m["misled"]))
    return {"model": w["model"], "misled": w["misled"], "runs": w["runs"]}


def _run_model(
    poc: dict[str, Any], server_cmd: str, out: Path, models: list[str] | None, before: dict[str, Any] | None
) -> dict[str, Any]:
    """The model block for each model; returns model_result for result.json.

    Models not run this time keep their entry from *before* (the last result)
    when it asked the same question, so `--models` can rerun one model.
    """
    spec = poc["model"]
    names = poc_models(poc, models)
    # Files of the single-model layout (model.json, model/run-<n>.jsonl) are replaced.
    (out / "model.json").unlink(missing_ok=True)
    for f in (out / "model").glob("run-*.jsonl"):
        f.unlink()
    before = before or {}
    kept = (before.get("by_model") or {}) if before.get("question") == spec["question"] else {}
    by_model = {k: v for k, v in kept.items() if (out / "model" / k).is_dir()}
    for name in names:
        by_model[model_key(name)] = _run_one_model(poc, server_cmd, out, name)
    if os.environ.get("CLAUDE_CONFIG_DIR"):
        claude_code.redact_account(out, out, Path(os.environ["CLAUDE_CONFIG_DIR"]) / ".claude.json")
    classes = ("runs", "misled", "correct", "tool_failed", "no_answer", "not_reached", "failed")
    total = {s: sum(m.get(s, 0) for m in by_model.values()) for s in classes}
    return {
        "question": spec["question"],
        "models": list(by_model),
        **total,
        "worst": _worst(by_model),
        "by_model": by_model,
    }


def run_poc(poc_file: str, out_dir: str, with_model: bool = True, models: list[str] | None = None) -> dict[str, Any]:
    poc = yaml.safe_load(Path(poc_file).read_text())
    server_cmd = os.environ["BENCH_SERVER_CMD"]
    conditions = poc.get("conditions") or [{"name": "default"}]
    repeat = int(poc.get("repeat", 1))
    attempts = []
    for n in range(repeat):
        runs = {c.get("name", "default"): _run_condition(poc, c, server_cmd) for c in conditions}
        checks = [_check(r, runs) for r in poc.get("expect", [])]
        for r in runs.values():
            r.pop("_file_texts", None)
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
    before = (
        json.loads((out / "result.json").read_text()).get("model_result") if (out / "result.json").exists() else None
    )
    if poc.get("model") and with_model:
        result["model_result"] = _run_model(poc, server_cmd, out, models, before)
    elif before and poc.get("model"):
        # --no-model keeps the model result of the run before.
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
