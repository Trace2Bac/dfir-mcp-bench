"""Score an answer against a case's expectations.

Matching is case-insensitive substring matching. It is deliberately simple:
the expected strings are exact facts (file names, addresses, accounts), and
the transcript is kept so that any score can be checked by hand. A question
marked review_only (a yes/no answer, say) gets no automatic score and is left
to the person reviewing the run.
"""

from __future__ import annotations

from typing import Any

from .case import Question


def score_question(q: Question, text: str, tools_called: set[str]) -> dict[str, Any]:
    if q.review_only:
        return {"id": q.id, "review_only": True, "passed": False, "facts_found": 0, "facts_total": 0}
    low = text.lower()
    missing = [e for e in q.expect_all if e.lower() not in low]
    any_hit = [e for e in q.expect_any if e.lower() in low]
    forbidden = [e for e in q.expect_none if e.lower() in low]
    tools_missing = [t for t in q.requires_tools if t not in tools_called]
    if q.requires_any_tool and not tools_called.intersection(q.requires_any_tool):
        tools_missing.append(" or ".join(q.requires_any_tool))
    any_needed = min(q.any_min, len(q.expect_any))
    passed = not missing and len(any_hit) >= any_needed and not forbidden and not tools_missing
    return {
        "id": q.id,
        "passed": passed,
        "missing": missing,
        "any_matched": any_hit,
        "forbidden_found": forbidden,
        "required_tools_not_called": tools_missing,
        # Fact-level credit: each expect_all string counts once, and an
        # expect_any group counts as many facts as it requires (min, default 1).
        # No credit without the required tool calls.
        "facts_found": 0 if tools_missing else len(q.expect_all) - len(missing) + min(len(any_hit), any_needed),
        "facts_total": len(q.expect_all) + any_needed,
    }


def score_case(questions: list[Question], answers: dict[str, str], tools_called: set[str]) -> dict[str, Any]:
    results = [score_question(q, answers.get(q.id, ""), tools_called) for q in questions]
    scored = [r for r in results if not r.get("review_only")]
    return {
        "passed": sum(r["passed"] for r in scored),
        "total": len(scored),
        "review_only": len(results) - len(scored),
        "facts_found": sum(r["facts_found"] for r in results),
        "facts_total": sum(r["facts_total"] for r in results),
        "questions": results,
    }
