"""Run one case against one server variant, with a local model or scripted calls."""

from __future__ import annotations

import json
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


@dataclass
class RunOptions:
    variant: str
    label: str  # e.g. before / after; names the results folder
    evidence_root: Path
    results_root: Path
    server_cmd: str
    model: Model | None  # None: scripted run
    run_id: int = 1  # repeat number; names the run-<n> folder


class Transcript:
    def __init__(self, path: Path):
        self.file = path.open("w")
        self.start = time.monotonic()

    def write(self, kind: str, **data: Any) -> None:
        event = {"t": round(time.monotonic() - self.start, 3), "kind": kind, **data}
        self.file.write(json.dumps(event, ensure_ascii=False, default=str) + "\n")
        self.file.flush()

    def close(self) -> None:
        self.file.close()


def _slug(text: str) -> str:
    return re.sub(r"[^A-Za-z0-9._-]+", "-", text).strip("-")[:60]


def _questions_prompt(case: Case, env: dict[str, str]) -> str:
    lines = [substitute(case.briefing, env), ""] if case.briefing else []
    lines += [f"{q.id}: {substitute(q.text, env)}" for q in case.questions]
    return "\n".join(lines)


def _split_answers(case: Case, text: str) -> dict[str, str]:
    """Take the 'Q1: ...' lines of the final answer; fall back to the whole text."""
    answers: dict[str, str] = {}
    ids = [q.id for q in case.questions]
    pattern = re.compile(rf"^\W*({'|'.join(map(re.escape, ids))})\W*[:.)-]\s*(.*)$", re.IGNORECASE)
    current = None
    for line in text.splitlines():
        m = pattern.match(line)
        if m:
            current = next(i for i in ids if i.lower() == m.group(1).lower())
            answers[current] = m.group(2)
        elif current:
            answers[current] += "\n" + line
    return answers or {q.id: text for q in case.questions}


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


async def _run_model(
    server: Server, model: Model, case: Case, env: dict[str, str], log: Transcript
) -> tuple[str, set[str], str, int]:
    messages: list[dict[str, Any]] = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": _questions_prompt(case, env)},
    ]
    log.write("prompt", messages=messages)
    tools = server.openai_tools()
    called: set[str] = set()
    for turn in range(1, case.max_turns + 1):
        started = time.monotonic()
        try:
            reply = model.chat(messages, tools)
        except httpx.HTTPError as exc:
            # Keep the run: score what exists and record why it stopped.
            log.write("model_error", turn=turn, seconds=round(time.monotonic() - started, 2), error=repr(exc))
            return "", called, f"model_error: {type(exc).__name__}", turn
        choice = reply["choices"][0]
        message = choice["message"]
        log.write(
            "model",
            turn=turn,
            seconds=round(time.monotonic() - started, 2),
            content=message.get("content"),
            tool_calls=message.get("tool_calls"),
            usage=reply.get("usage"),
            finish_reason=choice.get("finish_reason"),
        )
        messages.append({k: v for k, v in message.items() if k in ("role", "content", "tool_calls")})
        tool_calls = message.get("tool_calls") or []
        if not tool_calls:
            reason = "max_tokens" if choice.get("finish_reason") == "length" else "final_answer"
            return message.get("content") or "", called, reason, turn
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
    return "", called, "max_turns", case.max_turns


async def run_case(case: Case, opts: RunOptions) -> Path:
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    model_label = _slug(opts.model.resolve_name()) if opts.model else "scripted"
    if opts.model and opts.model.cfg.reasoning_effort:
        model_label += f"_reasoning-{_slug(opts.model.cfg.reasoning_effort)}"
    # One folder per case, label, model and repeat; a new run replaces it.
    out = opts.results_root / case.id / opts.label / model_label / f"run-{opts.run_id}"
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
    try:
        async with start_server(command, case.tools) as server:
            log.write("server", command=command, info=server.info, tools=case.tools)
            await _run_setup(server, case, env, log)
            if opts.model is None:
                final, called = await _run_scripted(server, case, env, log)
                answers = {q.id: final for q in case.questions}
            else:
                final, called, reason, turns = await _run_model(server, opts.model, case, env, log)
                answers = _split_answers(case, final)
            server_info = server.info
    finally:
        log.close()

    score = score_case(case.questions, answers, called)
    events = [json.loads(line) for line in (out / "transcript.jsonl").read_text().splitlines()]
    calls = [e for e in events if e["kind"] == "tool_call"]
    (out / "answer.md").write_text(final + "\n")
    (out / "score.json").write_text(json.dumps(score, indent=2) + "\n")
    run_info = {
        "case": case.id,
        "label": opts.label,
        "variant": opts.variant,
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
        "wrong_claims": sum(len(q["forbidden_found"]) for q in score["questions"]),
        "tools_called": sorted(called),
        "score": f"{score['passed']}/{score['total']}",
        "facts": f"{score['facts_found']}/{score['facts_total']}",
    }
    (out / "run.json").write_text(json.dumps(run_info, indent=2) + "\n")
    return out
