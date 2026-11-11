"""Run one case against one server variant, with a local model or scripted calls."""

from __future__ import annotations

import json
import os
import re
import shutil
import time
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import httpx

from .case import Case, substitute
from .mcp_server import Server, start_server
from .model import Model
from .score import score_case

SYSTEM_PROMPT = """You are a digital forensic examiner. Answer the questions using only what the \
available tools return from the evidence. Call tools to look at the evidence before answering. \
If the tools fail or the evidence does not contain the answer, say so instead of guessing.

When you are done, give your final answer with one line per question, starting with the \
question id, for example:
Q1: <answer>
Q2: <answer>"""


SERVER_REF = Path("/app/.bench-ref")

FINAL_ANSWER_PROMPT = """You have used all your turns. Do not call any more tools. Give your final \
answer now from what the tools returned, one line per question starting with the question id. \
Say so where the evidence you saw does not contain the answer."""


@dataclass
class RunOptions:
    variant: str
    label: str  # e.g. before / after; names the results folder
    evidence_root: Path
    results_root: Path
    server_cmd: str
    model: Model | None  # None: scripted run
    run_id: int = 1  # repeat number; names the run-<n> folder


def _short(value: Any, limit: int = 160) -> str:
    text = value if isinstance(value, str) else json.dumps(value, ensure_ascii=False, default=str)
    text = " ".join(text.split())
    return text if len(text) <= limit else text[: limit - 1] + "…"


def _progress_line(t: float, kind: str, data: dict[str, Any]) -> str | None:
    """One terminal line per step, so a run can be followed while it happens."""
    stamp = f"[{t:7.1f}s]"
    if kind == "setup":
        return f"{stamp} setup  {data['tool']}({_short(data['args'], 80)})"
    if kind == "model":
        calls = data.get("tool_calls") or []
        usage = data.get("usage") or {}
        head = (
            f"{stamp} turn {data['turn']:>2}  model {data['seconds']}s, prompt {usage.get('prompt_tokens', '?')} tokens"
        )
        if data.get("stubbed_results"):
            head += f", {data['stubbed_results']} old results stubbed"
        if data.get("server_truncated"):
            head += ", SERVER TRUNCATED THE CONTEXT"
        lines = [head]
        if data.get("content") and str(data["content"]).strip():
            lines.append(f"           says: {_short(data['content'], 200)}")
        lines += [
            f"           calls {c['function']['name']}({_short(c['function'].get('arguments'), 120)})" for c in calls
        ]
        return "\n".join(lines)
    if kind == "tool_call":
        mark = "ERROR " if data.get("is_error") else ""
        return f"{stamp}          {mark}{data['tool']} -> {_short(data.get('result', ''), 140)}"
    if kind == "model_error":
        return f"{stamp} turn {data['turn']:>2}  MODEL ERROR {data['error']}"
    if kind == "final_answer_request":
        return f"{stamp} out of turns, asking for the final answer"
    return None


class Transcript:
    def __init__(self, path: Path, progress: bool = True):
        self.file = path.open("w")
        self.start = time.monotonic()
        self.progress = progress

    def write(self, kind: str, **data: Any) -> None:
        event = {"t": round(time.monotonic() - self.start, 3), "kind": kind, **data}
        self.file.write(json.dumps(event, ensure_ascii=False, default=str) + "\n")
        self.file.flush()
        line = _progress_line(event["t"], kind, data) if self.progress else None
        if line:
            print(line, flush=True)

    def close(self) -> None:
        self.file.close()


def _slug(text: str) -> str:
    return re.sub(r"[^A-Za-z0-9._-]+", "-", text).strip("-")[:60]


def _questions_prompt(case: Case, env: dict[str, str]) -> str:
    lines = [substitute(case.briefing, env), ""] if case.briefing else []
    lines += [f"{q.id}: {substitute(q.text, env)}" for q in case.questions]
    return "\n".join(lines)


async def _run_setup(server: Server, case: Case, env: dict[str, str], log: Transcript) -> None:
    for call in case.setup:
        args = substitute(call.args, env)
        result = await server.call(call.tool, args, allow_hidden=True)
        log.write("setup", tool=call.tool, args=args, is_error=result.is_error, result=result.text[:4000])
        if result.is_error:
            raise SystemExit(f"setup step {call.tool} failed: {result.text[:500]}")


async def _run_scripted(server: Server, case: Case, env: dict[str, str], log: Transcript) -> tuple[str, set[str]]:
    outputs = []
    for call in case.scripted:
        args = substitute(call.args, env)
        result = await server.call(call.tool, args)
        log.write("tool_call", tool=call.tool, args=args, is_error=result.is_error, result=result.text)
        outputs.append(result.text)
    return "\n".join(outputs), {c.tool for c in case.scripted}


def _estimate_tokens(messages: list[dict[str, Any]]) -> int:
    # About 3 characters per token for tool output and English; only used to
    # decide when to stub more results, not reported as a measurement.
    return sum(len(json.dumps(m, ensure_ascii=False)) for m in messages) // 3


def _stub(message: dict[str, Any]) -> dict[str, Any]:
    tool = message.get("name", "tool")
    return {
        **message,
        "content": f"[Earlier result of {tool} removed to save context ({len(message['content'])} characters). "
        "mulder keeps indexed output; use search or get_raw_output to read it again.]",
    }


def _compact(messages: list[dict[str, Any]], keep: int, budget: int) -> tuple[list[dict[str, Any]], int]:
    """Messages to send: the newest *keep* tool results in full, older ones as stubs.

    If the estimate is still over *budget*, keep fewer, down to the newest one.
    The transcript and the conversation itself are not changed.
    """
    tool_idx = [i for i, m in enumerate(messages) if m["role"] == "tool"]
    for k in range(keep, 0, -1):
        old = set(tool_idx[:-k]) if len(tool_idx) > k else set()
        sent = [_stub(m) if i in old else m for i, m in enumerate(messages)]
        if _estimate_tokens(sent) <= budget or k == 1:
            return sent, len(old)
    return messages, 0


async def _run_model(
    server: Server, model: Model, case: Case, env: dict[str, str], log: Transcript
) -> tuple[str, set[str], str, int, dict[str, int]]:
    messages: list[dict[str, Any]] = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": _questions_prompt(case, env)},
    ]
    log.write("prompt", messages=messages)
    tools = server.openai_tools()
    called: set[str] = set()
    stats = {"stubbed_results_max": 0, "context_truncations": 0}
    last_prompt_tokens = 0

    def ask(turn: int, with_tools: bool) -> dict[str, Any] | None:
        """One model call on the compacted conversation; None on a transport error."""
        nonlocal last_prompt_tokens
        sent, stubbed = _compact(messages, case.keep_tool_results, case.context_budget_tokens)
        stats["stubbed_results_max"] = max(stats["stubbed_results_max"], stubbed)
        started = time.monotonic()
        try:
            reply = model.chat(sent, tools if with_tools else [])
        except httpx.HTTPError as exc:
            log.write("model_error", turn=turn, seconds=round(time.monotonic() - started, 2), error=repr(exc))
            return None
        usage = reply.get("usage") or {}
        prompt_tokens = int(usage.get("prompt_tokens") or 0)
        # The server cuts the conversation itself when it overflows the
        # model's context; the prompt then shrinks although we only added to it.
        truncated = bool(last_prompt_tokens) and prompt_tokens < last_prompt_tokens * 0.8 and not stubbed
        stats["context_truncations"] += truncated
        last_prompt_tokens = prompt_tokens
        choice = reply["choices"][0]
        message = choice["message"]
        log.write(
            "model",
            turn=turn,
            seconds=round(time.monotonic() - started, 2),
            content=message.get("content"),
            tool_calls=message.get("tool_calls"),
            usage=usage,
            finish_reason=choice.get("finish_reason"),
            stubbed_results=stubbed,
            server_truncated=truncated,
        )
        return choice

    for turn in range(1, case.max_turns + 1):
        choice = ask(turn, with_tools=True)
        if choice is None:
            return "", called, "model_error", turn, stats
        message = choice["message"]
        messages.append({k: v for k, v in message.items() if k in ("role", "content", "tool_calls")})
        tool_calls = message.get("tool_calls") or []
        if not tool_calls:
            reason = "max_tokens" if choice.get("finish_reason") == "length" else "final_answer"
            return message.get("content") or "", called, reason, turn, stats
        for tc in tool_calls:
            name = tc["function"]["name"]
            try:
                args = json.loads(tc["function"].get("arguments") or "{}")
                result = await server.call(name, args)
            except json.JSONDecodeError as exc:
                args, result = {}, None
                text, is_error = f"Invalid JSON arguments: {exc}", True
            if result is not None:
                text, is_error = result.text, result.is_error
                called.add(name)
            if len(text) > case.max_tool_chars:
                text = text[: case.max_tool_chars] + f"\n[truncated: {len(text)} characters in total]"
            log.write("tool_call", turn=turn, tool=name, args=args, is_error=is_error, result=text)
            messages.append({"role": "tool", "tool_call_id": tc.get("id", name), "name": name, "content": text})

    # Out of turns: ask once more, without tools, for the answer so far.
    messages.append({"role": "user", "content": FINAL_ANSWER_PROMPT})
    log.write("final_answer_request", content=FINAL_ANSWER_PROMPT)
    choice = ask(case.max_turns + 1, with_tools=False)
    answer = (choice["message"].get("content") or "") if choice else ""
    return answer, called, "max_turns", case.max_turns, stats


async def run_case(case: Case, opts: RunOptions) -> Path:
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    # The model's own name, without its publisher ("qwen/qwen3.5-9b" -> "qwen3.5-9b");
    # settings such as reasoning are in run.json.
    model_label = _slug(opts.model.resolve_name().split("/")[-1]) if opts.model else "scripted"
    # results_root is the experiment's results folder. One folder per label,
    # model and repeat; a new run replaces it.
    out = opts.results_root / opts.label / model_label / f"run-{opts.run_id}"
    if out.exists():
        shutil.rmtree(out)
    out.mkdir(parents=True)
    log = Transcript(out / "transcript.jsonl")
    env = {
        "EVIDENCE": str(opts.evidence_root / case.evidence),
        "CASE_ID": _slug(f"bench-{case.id}-{stamp}").lower(),
    }
    command = substitute(opts.server_cmd, {"DB_DIR": str(out / "server-db")})
    started = datetime.now(timezone.utc)
    reason, turns = "scripted", 0
    (out / "server-db").mkdir()
    errlog = (out / "server-db" / "console.log").open("w")
    try:
        async with start_server(command, case.tools, errlog) as server:
            log.write("server", command=command, info=server.info, tools=case.tools)
            await _run_setup(server, case, env, log)
            if opts.model is None:
                final, called = await _run_scripted(server, case, env, log)
                stats: dict[str, int] = {}
            else:
                final, called, reason, turns, stats = await _run_model(server, opts.model, case, env, log)
            server_info = server.info
    finally:
        log.close()
        errlog.close()

    events = [json.loads(line) for line in (out / "transcript.jsonl").read_text().splitlines()]
    calls = [e for e in events if e["kind"] == "tool_call"]
    (out / "answer.md").write_text(final + "\n")
    # Scripted runs check what the tools returned against the expected facts;
    # a model's answers are judged by a reviewer (review.yaml), not scored here.
    score = score_case(case.questions, {q.id: final for q in case.questions}, called) if opts.model is None else None
    if score:
        (out / "score.json").write_text(json.dumps(score, indent=2) + "\n")
    run_info = {
        "case": case.id,
        "label": opts.label,
        "variant": opts.variant,
        # The exact server commit (written into the variant image) and image,
        # so a run can be repeated.
        "server_ref": SERVER_REF.read_text().strip() if SERVER_REF.exists() else None,
        "image_id": os.environ.get("BENCH_IMAGE_ID"),
        "server": server_info,
        "server_command": command,
        "model": None
        if opts.model is None
        else {
            "base_url": opts.model.cfg.base_url,
            "name": opts.model.cfg.name,
            "temperature": opts.model.cfg.temperature,
            "max_tokens": opts.model.cfg.max_tokens,
            "reasoning_effort": opts.model.cfg.reasoning_effort,
        },
        "started": started.isoformat(),
        "finished": datetime.now(timezone.utc).isoformat(),
        "run_id": opts.run_id,
        "end_reason": reason,
        "turns": turns,
        "seconds": round(events[-1]["t"], 1) if events else 0,
        "tool_calls": len(calls),
        "tool_errors": sum(bool(c["is_error"]) for c in calls),
        # Harness settings and what they did, so a run can be read in context.
        "harness": {
            "max_turns": case.max_turns,
            "max_tool_chars": case.max_tool_chars,
            "keep_tool_results": case.keep_tool_results,
            "context_budget_tokens": case.context_budget_tokens,
            **stats,
        },
        "tools_called": sorted(called),
    }
    if score:
        run_info |= {
            "score": f"{score['passed']}/{score['total']}",
            "facts": f"{score['facts_found']}/{score['facts_total']}",
        }
    (out / "run.json").write_text(json.dumps(run_info, indent=2) + "\n")
    return out
