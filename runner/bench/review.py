"""Human review of model runs.

A model's answers are not scored automatically. A reviewer reads each answer
and records a verdict per question in the run's review.yaml. The verdicts follow the
scorecards mulder publishes for its own runs (examples/*/ACCURACY-REPORT.md):

- found: the answer matches the answer key.
- partial: related evidence found, but a detail is wrong (a date, a time
  zone, a device) or it is stated without evidence.
- missed: no answer, or the answer says the evidence does not show it.
- false positive: a claim the answer key contradicts, or a cause the evidence
  does not support, stated as fact. A claim hedged as such ("consistent
  with", "possibly") is not one.

Claims of that kind outside the questions are recorded as well and count as
false positives.
"""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import yaml

from .case import Case, load_case, split_answers
from .investigate import CASE_PREFIX

VERDICTS = {"f": "found", "p": "partial", "m": "missed", "x": "false positive"}
# Verdicts written before the four-level scale.
_OLD = {"pass": "found", "fail": "missed"}

RULES = (
    "found = matches the key | partial = related, a detail wrong or no evidence | missed = no answer\n"
    "false positive = contradicts the key, or a cause the evidence does not support, stated as fact\n"
    "(hedged claims are not false positives)"
)


def verdict(entry: dict[str, Any] | None) -> str:
    """The verdict of one question in a review, on the four-level scale."""
    value = (entry or {}).get("verdict", "")
    return _OLD.get(value, value)


def review_counts(review: dict[str, Any]) -> dict[str, int]:
    """Found, partial, missed and false positives in a review; extra false positives included."""
    counts = {v: 0 for v in VERDICTS.values()}
    for entry in review["questions"].values():
        counts[verdict(entry)] = counts.get(verdict(entry), 0) + 1
    counts["false positive"] += len(review.get("extra_false_positives") or [])
    return counts


def load_review(run_dir: Path) -> dict[str, Any] | None:
    """The review of a run, or None when it has not been reviewed."""
    path = run_dir / "review.yaml"
    if not path.exists():
        return None
    data = yaml.safe_load(path.read_text()) or {}
    questions = data.get("questions") or {}
    if not questions or any(not (q or {}).get("verdict") for q in questions.values()):
        return None  # partly filled in: not a review yet
    return data


def _unreviewed_runs(case_results: Path, only_model: str | None) -> list[Path]:
    runs = []
    for run_json in sorted(case_results.glob("*/*/run-*/run.json")):
        run_dir = run_json.parent
        model = run_dir.parent.name
        if model == "scripted" or (only_model and model != only_model):
            continue
        if load_review(run_dir) is None:
            runs.append(run_dir)
    return runs


def _ask(prompt: str, allowed: set[str]) -> str:
    while True:
        answer = input(prompt).strip().lower()
        if answer in allowed:
            return answer


def _review_run(case: Case, run_dir: Path, reviewer: str) -> bool:
    """Review one run interactively; False when the reviewer quits."""
    info = json.loads((run_dir / "run.json").read_text())
    called = set(info.get("tools_called") or [])
    investigate = (info.get("harness") or {}).get("name") in ("mulder-investigate", "claude-code")
    if investigate:
        # A whole-investigation report (mulder's has its own Q1-Q8); read only the "Case Q<n>:" lines.
        answers = split_answers(case, (run_dir / "answer.md").read_text(), prefix=CASE_PREFIX, fallback=False)
        missing_note = f"(no '{CASE_PREFIX}{{id}}:' line in the report; read {run_dir / 'answer.md'})"
    else:
        answers = split_answers(case, (run_dir / "answer.md").read_text())
        missing_note = "(no answer)"
    label, model = run_dir.parent.parent.name, run_dir.parent.name
    print(f"\n=== {run_dir.parent.parent.parent.parent.name} / {label} / {model} / {run_dir.name}")
    print(f"    transcript: {run_dir / 'transcript.jsonl'}")
    verdicts: dict[str, dict[str, str]] = {}
    for q in case.questions:
        print(f"\n{q.id}: {q.text}")
        print(
            f"  expected : {', '.join(q.expect_all) or '-'}"
            + (f"  any of {', '.join(q.expect_any)}" if q.expect_any else "")
        )
        print(f"  answer   : {answers.get(q.id, '').strip() or missing_note.format(id=q.id)}")
        # The answer keys are public: a right answer with no tool call behind it may be recalled, not found.
        needed = set(q.requires_tools) | set(q.requires_any_tool)
        if needed:
            used = sorted(needed & called)
            print(f"  tools    : {', '.join(used) or 'none of ' + ', '.join(sorted(needed))} called")
        key = _ask("  verdict [f]ound [p]artial [m]issed [x] false positive, [q]uit: ", {*VERDICTS, "q"})
        if key == "q":
            return False
        note = input("  note (optional): ").strip()
        verdicts[q.id] = {"verdict": VERDICTS[key], "note": note}
    print(
        f"\nClaims outside the questions, stated as fact, that the key or the evidence contradicts ({run_dir / 'answer.md'})."
    )
    extra = []
    while claim := input("  quote one (empty to finish): ").strip():
        extra.append(claim)
    review = {
        "reviewer": reviewer,
        "reviewed_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "questions": verdicts,
        "extra_false_positives": extra,
    }
    (run_dir / "review.yaml").write_text(
        "# Human review of this run.\n" + yaml.safe_dump(review, sort_keys=False, allow_unicode=True)
    )
    print(f"saved {run_dir / 'review.yaml'}")
    return True


def review_case(case_yaml: Path, case_results: Path, reviewer: str, only_model: str | None = None) -> None:
    case = load_case(case_yaml)
    runs = _unreviewed_runs(case_results, only_model)
    if not runs:
        print("Every model run of this case has been reviewed.")
        return
    print(f"{len(runs)} run(s) to review. Answers are shown per question; [q] stops and keeps what is saved.")
    print(RULES)
    for run_dir in runs:
        if not _review_run(case, run_dir, reviewer):
            break
