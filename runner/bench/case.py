"""Load a case definition (cases/<id>/case.yaml)."""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import yaml


@dataclass
class Call:
    tool: str
    args: dict[str, Any]


@dataclass
class Question:
    id: str
    text: str
    expect_all: list[str] = field(default_factory=list)
    expect_any: list[str] = field(default_factory=list)
    expect_none: list[str] = field(default_factory=list)
    requires_tools: list[str] = field(default_factory=list)
    requires_any_tool: list[str] = field(default_factory=list)
    any_min: int = 1  # how many expect_any strings must appear ("list 5 of these")
    review_only: bool = False  # left to a person: no automatic score (e.g. yes/no answers)


@dataclass
class Case:
    id: str
    evidence: str
    tools: list[str]
    setup: list[Call]
    scripted: list[Call]
    questions: list[Question]
    briefing: str
    max_turns: int
    max_tool_chars: int
    keep_tool_results: int  # newest tool results sent in full; older ones become a one-line stub
    context_budget_tokens: int  # estimated prompt size above which more results become stubs


def _calls(items: list[dict[str, Any]] | None) -> list[Call]:
    return [Call(item["tool"], item.get("args") or {}) for item in items or []]


def load_case(path: Path) -> Case:
    data = yaml.safe_load(path.read_text())
    briefing_file = path.parent / "briefing.md"
    limits = data.get("limits") or {}
    questions = []
    for q in data["questions"]:
        expect = q.get("expect") or {}
        questions.append(
            Question(
                id=q["id"],
                text=q["text"].strip(),
                # str(): YAML reads unquoted dates and numbers as other types.
                expect_all=[str(v) for v in expect.get("all") or []],
                expect_any=[str(v) for v in expect.get("any") or []],
                expect_none=[str(v) for v in expect.get("none") or []],
                requires_tools=q.get("requires_tools") or [],
                requires_any_tool=q.get("requires_any_tool") or [],
                any_min=int(expect.get("min", 1)),
                review_only=bool(q.get("review_only", False)),
            )
        )
    return Case(
        id=data["id"],
        evidence=data["evidence"],
        tools=data["tools"],
        setup=_calls(data.get("setup")),
        scripted=_calls(data.get("scripted")),
        questions=questions,
        briefing=briefing_file.read_text().strip() if briefing_file.exists() else "",
        max_turns=int(limits.get("max_turns", 30)),
        max_tool_chars=int(limits.get("max_tool_chars", 12000)),
        keep_tool_results=int(limits.get("keep_tool_results", 4)),
        context_budget_tokens=int(limits.get("context_budget_tokens", 24000)),
    )


def split_answers(case: Case, text: str, prefix: str = "", fallback: bool = True) -> dict[str, str]:
    """Take the 'Q1: ...' lines of a final answer.

    *prefix* is a label before the id, such as "Case " for the "Case Q1:" lines
    a mulder report gives when asked to (its own report has unrelated Q1-Q8).
    With *fallback*, every question gets the whole text when no line matches.
    """
    answers: dict[str, str] = {}
    ids = [q.id for q in case.questions]
    label = rf"{re.escape(prefix.strip())}\s*" if prefix.strip() else ""
    pattern = re.compile(rf"^\W*{label}({'|'.join(map(re.escape, ids))})\W*[:.)-][\s*_]*(.*)$", re.IGNORECASE)
    current = None
    for line in text.splitlines():
        m = pattern.match(line)
        if m:
            current = next(i for i in ids if i.lower() == m.group(1).lower())
            answers[current] = m.group(2)
        elif current and label and (not line.strip() or line.lstrip().startswith("#")):
            current = None  # in a report, an answer ends at a blank line or a heading
        elif current:
            answers[current] += "\n" + line
    return answers or ({q.id: text for q in case.questions} if fallback else {})


_PLACEHOLDER = re.compile(r"\$\{(\w+)\}")


def substitute(value: Any, env: dict[str, str]) -> Any:
    """Replace ${NAME} placeholders in strings, lists and dicts."""
    if isinstance(value, str):
        return _PLACEHOLDER.sub(lambda m: env[m.group(1)], value)
    if isinstance(value, list):
        return [substitute(v, env) for v in value]
    if isinstance(value, dict):
        return {k: substitute(v, env) for k, v in value.items()}
    return value
