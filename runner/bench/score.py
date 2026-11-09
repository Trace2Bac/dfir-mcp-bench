"""Score an answer against a case's expectations.

Matching is case-insensitive substring matching. It is deliberately simple:
the expected strings are exact facts (file names, addresses, accounts), and
the transcript is kept so that any score can be checked by hand.
"""

from __future__ import annotations

from typing import Any

from .case import Question


def score_question(q: Question, text: str, tools_called: set[str]) -> dict[str, Any]:
    low = text.lower()
    missing = [e for e in q.expect_all if e.lower() not in low]
    any_hit = [e for e in q.expect_any if e.lower() in low]
    forbidden = [e for e in q.expect_none if e.lower() in low]
    tools_missing = [t for t in q.requires_tools if t not in tools_called]
    if q.requires_any_tool and not tools_called.intersection(q.requires_any_tool):
        tools_missing.append(" or ".join(q.requires_any_tool))
    passed = (
        not missing
        and (not q.expect_any or bool(any_hit))
        and not forbidden
        and not tools_missing
    )
    return {
        "id": q.id,
        "passed": passed,
        "missing": missing,
        "any_matched": any_hit,
        "forbidden_found": forbidden,
        "required_tools_not_called": tools_missing,
        # Fact-level credit: each expect_all string counts once, an expect_any
        # group counts once. No credit without the required tool calls.
        "facts_found": 0 if tools_missing else len(q.expect_all) - len(missing) + (1 if any_hit else 0),
        "facts_total": len(q.expect_all) + (1 if q.expect_any else 0),
    }


def score_case(questions: list[Question], answers: dict[str, str], tools_called: set[str]) -> dict[str, Any]:
    results = [score_question(q, answers.get(q.id, ""), tools_called) for q in questions]
    return {
        "passed": sum(r["passed"] for r in results),
        "total": len(results),
        "facts_found": sum(r["facts_found"] for r in results),
        "facts_total": sum(r["facts_total"] for r in results),
        "questions": results,
    }
