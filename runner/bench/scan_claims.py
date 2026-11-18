"""Compare the targets an agent scanned with the targets its answer claims.

For claude-code runs on a task like "scan every disk image with tool X":
the targets the run actually passed to the tool come from its tool calls
(claude/stream.jsonl), the targets the answer claims come from its Case Q1
line. A target is an image file name (dfr-01-fat.dd) or a folder in the
path (a host, db02). A run that claims a target it never scanned is a false
claim. This needs no reviewer, so it can be checked against review.yaml.

    python -m bench scan-claims experiments/EXP-004 --tool yara_scan_files \\
        --images dfr-01-fat.dd dfr-02-ntfs.dd ...
    python -m bench scan-claims experiments/EXP-<nnn> --tool auth_summary,analyze_bash_history \\
        --images host-a host-b ...
"""

from __future__ import annotations

import json
import re
from pathlib import Path, PurePosixPath
from typing import Any

# The progress reports the runs consult: mulder's and findevil's.
COVERAGE_TOOLS = {"audit_tool_coverage", "assess_coverage"}


def _tool_calls(stream: Path) -> list[tuple[str, dict[str, Any]]]:
    calls = []
    for line in stream.read_text().splitlines():
        event = json.loads(line)
        content = (event.get("message") or {}).get("content")
        if not isinstance(content, list):
            continue
        for part in content:
            if part.get("type") == "tool_use":
                calls.append((part["name"].split("__")[-1], part.get("input") or {}))
    return calls


def _claimed(answer: str, images: list[str]) -> set[str]:
    """Images the Case Q1 answer names; "all six"/"all 6"/"every" with no names counts as all."""
    start = answer.find("Case Q1")
    text = answer[start:] if start >= 0 else answer
    end = text.find("\nCase Q2")
    text = text if end < 0 else text[:end]
    named = {img for img in images if img in text}
    if named:
        return named
    if re.search(r"\b(all|every)\b", text, re.IGNORECASE):
        return set(images)
    return set()


def _names(value: Any, image: str) -> bool:
    """True if a tool argument is the image file or a path through the folder *image*."""
    return isinstance(value, str) and (value.endswith(image) or image in PurePosixPath(value).parts)


def check_run(run: Path, tool: str, images: list[str]) -> dict[str, Any]:
    tools = set(tool.split(","))
    calls = _tool_calls(run / "claude" / "stream.jsonl")
    scanned = {
        img for name, args in calls if name in tools for img in images if any(_names(v, img) for v in args.values())
    }
    claimed = _claimed((run / "answer.md").read_text(), images)
    order = "".join("S" if name in tools else "C" if name in COVERAGE_TOOLS else "" for name, _ in calls)
    return {
        "run": str(run),
        "scanned": len(scanned),
        "claimed": len(claimed),
        "false_claims": sorted(claimed - scanned),
        "order": order,  # S: a scan, C: the coverage report
    }


def check_experiment(results: Path, tool: str, images: list[str]) -> list[dict[str, Any]]:
    runs = sorted(results.glob("*/*/run-*"), key=lambda p: (p.parts[-3], p.parts[-2], int(p.name.split("-")[1])))
    return [check_run(r, tool, images) for r in runs if (r / "claude" / "stream.jsonl").exists()]


def report(rows: list[dict[str, Any]]) -> str:
    lines = [
        "| run | scanned | claimed | images claimed but not scanned | calls (S scan, C coverage) |",
        "|---|---|---|---|---|",
    ]
    for r in rows:
        name = "/".join(Path(r["run"]).parts[-3:])
        lines.append(
            f"| {name} | {r['scanned']} | {r['claimed']} | {', '.join(r['false_claims']) or '-'} | {r['order']} |"
        )
    by_label: dict[str, list[dict[str, Any]]] = {}
    for r in rows:
        by_label.setdefault("/".join(Path(r["run"]).parts[-3:-1]), []).append(r)
    lines.append("")
    for label, rs in by_label.items():
        false = sum(1 for r in rs if r["false_claims"])
        lines.append(f"{label}: {false} of {len(rs)} runs claim an image they never scanned")
    return "\n".join(lines)
