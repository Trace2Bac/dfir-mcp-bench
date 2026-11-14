"""Run a case with Claude Code as the agent and `mulder serve` as its only tools.

The harness `claude-code`: Claude Code (the CLI bundled with mulder's Claude
Agent SDK, so its version is pinned by the image) runs headless with
`claude -p`, connected to `mulder serve` over MCP stdio. Its built-in tools
(Bash, Read, web access, ...) are turned off, so it can reach the evidence
only through mulder. It is signed in to a Claude subscription by
`./bench.sh login` (kept in data/claude/), or by a CLAUDE_CODE_OAUTH_TOKEN
from `claude setup-token`.

`bench.sh investigate` prepares the working folder with `prepare`, runs
Claude Code in the variant's image with its stream-json output piped through
`progress`, then calls `import` to turn that output into a bench run:

- answer.md         Claude Code's final message, judged by a reviewer (review.yaml)
- transcript.jsonl  one tool_call event per mulder tool call, with its result
- run.json          variant, model, effort, Claude Code version, timing, usage
- claude/           the raw stream-json output and the prompt it was given
- mulder/           mulder's audit log and logs for the case, if written
"""

from __future__ import annotations

import json
import re
import shutil
import sys
from datetime import datetime
from pathlib import Path
from typing import Any

import yaml

from .case import load_case, split_answers
from .investigate import CASE_PREFIX, briefing_text, run_dir

# Claude Code names MCP tools mcp__<server>__<tool>.
SERVER = "mulder"
TOOL_PREFIX = f"mcp__{SERVER}__"
# Inside the image; the entrypoint runs everything as the mulder user.
CLAUDE = "/usr/local/lib/python3.12/dist-packages/claude_agent_sdk/_bundled/claude"
STREAM = "stream.jsonl"
PROMPT = "prompt.md"
MCP_CONFIG = "mcp.json"
# Results are cut here in transcript.jsonl; the full text stays in claude/stream.jsonl.
MAX_RESULT_CHARS = 20_000


def _options(experiment_yaml: Path) -> dict[str, Any]:
    return yaml.safe_load(experiment_yaml.read_text()).get("harness_options") or {}


def prepare(case_yaml: Path, experiment_yaml: Path, work: Path, evidence_in_container: str, case_id: str) -> None:
    """Write the prompt and the MCP config into *work*/claude."""
    out = work / "claude"
    out.mkdir(parents=True, exist_ok=True)
    answer_section = bool(_options(experiment_yaml).get("answer_section", False))
    prompt = (
        "You are a digital forensic examiner. Your only tools are those of the mulder MCP server. "
        f"The evidence is mounted read-only at {evidence_in_container}. Start by creating the case "
        f'with scan_evidence(evidence_path="{evidence_in_container}", case_id="{case_id}"); '
        "get_tool_guide explains which tools fit which evidence. Investigate until you can answer "
        "every question below. Base each answer on what the tools return, not on what you may "
        "already know about this dataset. Your last message is the final report.\n\n"
        + briefing_text(case_yaml, evidence_in_container, answer_section)
    )
    # An experiment can add one instruction, the same for every label.
    instruction = _options(experiment_yaml).get("instruction")
    if instruction:
        prompt += f"\n{str(instruction).strip()}\n"
    (out / PROMPT).write_text(prompt)
    config = {"mcpServers": {SERVER: {"command": "mulder", "args": ["serve"]}}}
    (out / MCP_CONFIG).write_text(json.dumps(config, indent=2) + "\n")


def claude_args(experiment_yaml: Path) -> str:
    """`claude` flags from the experiment's harness_options (model, effort)."""
    options = _options(experiment_yaml)
    flags = []
    if options.get("model"):
        flags.append(f"--model {options['model']}")
    if options.get("effort"):
        flags.append(f"--effort {options['effort']}")
    return " ".join(flags)


def progress() -> None:
    """Read stream-json on stdin and print one line per step, for the terminal."""
    start = datetime.now()
    for line in sys.stdin:
        try:
            event = json.loads(line)
        except json.JSONDecodeError:
            print(line, end="", flush=True)
            continue
        t = int((datetime.now() - start).total_seconds())
        stamp = f"[{t // 60:3d}:{t % 60:02d}]"
        kind = event.get("type")
        if kind == "system" and event.get("subtype") == "init":
            servers = ", ".join(f"{s['name']} {s['status']}" for s in event.get("mcp_servers", []))
            tools = sum(1 for n in event.get("tools", []) if n.startswith(TOOL_PREFIX))
            print(f"{stamp} Claude Code {event.get('claude_code_version', '?')}, model {event.get('model')}")
            print(f"{stamp} MCP: {servers or 'none'}; {tools} mulder tools", flush=True)
        elif kind == "assistant":
            for block in event.get("message", {}).get("content", []):
                if block.get("type") == "tool_use":
                    name = block["name"].removeprefix(TOOL_PREFIX)
                    args = json.dumps(block.get("input", {}), ensure_ascii=False)
                    print(f"{stamp} > {name} {args[:120]}", flush=True)
                elif block.get("type") == "text" and block.get("text", "").strip():
                    first = block["text"].strip().splitlines()[0]
                    print(f"{stamp}   {first[:140]}", flush=True)
        elif kind == "user":
            content = event.get("message", {}).get("content", [])
            for block in content if isinstance(content, list) else []:
                if block.get("type") == "tool_result" and block.get("is_error"):
                    print(f"{stamp}   ! tool error: {_text(block.get('content'))[:140]}", flush=True)
        elif kind == "result":
            cost = event.get("total_cost_usd")
            status = "error" if event.get("is_error") else event.get("subtype")
            print(
                f"{stamp} done: {status}, {event.get('num_turns')} turns"
                + (f", ${cost:.2f} at API prices" if cost is not None else ""),
                flush=True,
            )


def _text(content: Any) -> str:
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        return "\n".join(c.get("text", "") for c in content if isinstance(c, dict))
    return ""


def _slug(text: str) -> str:
    return re.sub(r"[^A-Za-z0-9._-]+", "-", text).strip("-")


def import_run(
    experiment_yaml: Path, label: str, work: Path, case_id: str, image_id: str | None, run_id: int | None = None
) -> Path:
    """Import into experiments/<id>/results/<label>/<model>/run-<n> (effort and harness are in run.json)."""
    exp = yaml.safe_load(experiment_yaml.read_text())
    root = experiment_yaml.parents[2]
    case = load_case(root / "cases" / exp["case"] / "case.yaml")
    options = exp.get("harness_options") or {}
    variant = exp["variants"][label]
    env = (root / "servers" / "mulder" / "variants" / f"{variant}.env").read_text()
    ref = re.search(r"^REF=(\S+)", env, re.MULTILINE)
    folder = options.get("model", "default")
    out = run_dir(experiment_yaml.parent / "results" / label / _slug(folder), run_id)
    if out.exists():
        shutil.rmtree(out)
    (out / "claude").mkdir(parents=True)
    for name in (STREAM, PROMPT, MCP_CONFIG):
        if (work / "claude" / name).exists():
            shutil.copy2(work / "claude" / name, out / "claude" / name)
    cases = work / "cases"
    for name in (f"{case_id}.audit.jsonl", "mulder.log", f"{case_id}.mulder.log"):
        if (cases / name).exists():
            (out / "mulder").mkdir(exist_ok=True)
            shutil.copy2(cases / name, out / "mulder" / name)

    events = []
    for line in (work / "claude" / STREAM).read_text().splitlines():
        try:
            events.append(json.loads(line))
        except json.JSONDecodeError:
            continue
    init = next((e for e in events if e.get("type") == "system" and e.get("subtype") == "init"), {})
    result = next((e for e in reversed(events) if e.get("type") == "result"), {})

    # tool_use and its tool_result arrive in separate events; pair them by id.
    results = {}
    for e in events:
        content = e.get("message", {}).get("content", []) if e.get("type") == "user" else []
        for block in content if isinstance(content, list) else []:
            if block.get("type") == "tool_result":
                results[block["tool_use_id"]] = block
    called: set[str] = set()
    calls = errors = 0
    with (out / "transcript.jsonl").open("w") as f:
        for e in events:
            if e.get("type") != "assistant":
                continue
            for block in e.get("message", {}).get("content", []):
                if block.get("type") != "tool_use":
                    continue
                name = block["name"].removeprefix(TOOL_PREFIX)
                res = results.get(block["id"], {})
                text = _text(res.get("content"))
                if len(text) > MAX_RESULT_CHARS:
                    text = f"{text[:MAX_RESULT_CHARS]}\n[cut: {len(text)} characters in claude/{STREAM}]"
                calls += 1
                errors += bool(res.get("is_error"))
                if not res.get("is_error"):
                    called.add(name)
                event = {"kind": "tool_call", "tool": name, "args": block.get("input", {})}
                event |= {"is_error": bool(res.get("is_error")), "result": text}
                f.write(json.dumps(event, ensure_ascii=False) + "\n")

    report = result.get("result") or ""
    (out / "answer.md").write_text(report)
    lines = split_answers(case, report, prefix=CASE_PREFIX, fallback=False)

    usage = result.get("modelUsage") or {}
    run_info = {
        "case": case.id,
        "label": label,
        "variant": variant,
        "server_ref": ref.group(1) if ref else None,
        "image_id": image_id,
        # The model Claude Code reported is kept under harness; "model" is for bench-runner settings.
        "harness": {
            "name": "claude-code",
            "claude_code_version": init.get("claude_code_version"),
            **options,
            "model": init.get("model") or options.get("model"),
        },
        "model": None,
        "run_id": int(out.name.removeprefix("run-")),
        "end_reason": "error" if result.get("is_error") else result.get("subtype", "no result"),
        "case_answer_lines": len(lines),
        "turns": result.get("num_turns"),
        "seconds": round((result.get("duration_ms") or 0) / 1000, 1),
        "tool_calls": calls,
        "tool_errors": errors,
        # Claude Code counts cache reads and writes too. The cost is what the
        # same tokens would cost on the API; a subscription is not billed per run.
        "token_usage": [
            {
                "model": m,
                "input_tokens": u.get("inputTokens", 0),
                "output_tokens": u.get("outputTokens", 0),
                "cache_read_tokens": u.get("cacheReadInputTokens", 0),
                "cache_write_tokens": u.get("cacheCreationInputTokens", 0),
            }
            for m, u in usage.items()
        ],
        "api_cost_usd": result.get("total_cost_usd"),
        "tools_called": sorted(called),
    }
    (out / "run.json").write_text(json.dumps(run_info, indent=2) + "\n")
    return out
