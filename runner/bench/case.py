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


@dataclass
class Case:
    id: str
    title: str
    path: Path
    evidence: str
    tools: list[str]
    setup: list[Call]
    scripted: list[Call]
    questions: list[Question]
    briefing: str
    max_turns: int
    max_tool_chars: int


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
                expect_all=expect.get("all") or [],
                expect_any=expect.get("any") or [],
                expect_none=expect.get("none") or [],
                requires_tools=q.get("requires_tools") or [],
                requires_any_tool=q.get("requires_any_tool") or [],
            )
        )
    return Case(
        id=data["id"],
        title=data.get("title", data["id"]),
        path=path,
        evidence=data["evidence"],
        tools=data["tools"],
        setup=_calls(data.get("setup")),
        scripted=_calls(data.get("scripted")),
        questions=questions,
        briefing=briefing_file.read_text().strip() if briefing_file.exists() else "",
        max_turns=int(limits.get("max_turns", 30)),
        max_tool_chars=int(limits.get("max_tool_chars", 12000)),
    )


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
