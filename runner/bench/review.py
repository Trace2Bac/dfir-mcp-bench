"""Human review of model runs.

The automatic score only checks that expected strings appear. A reviewer reads
each answer and records a verdict per question (pass, partial or fail) in the
run's review.yaml; where a review exists, it is the result that counts.
"""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import yaml

from .case import Case, load_case, split_answers

VERDICTS = {"p": "pass", "a": "partial", "f": "fail"}


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
    score = json.loads((run_dir / "score.json").read_text())
    auto = {q["id"]: q for q in score["questions"]}
    answers = split_answers(case, (run_dir / "answer.md").read_text())
    label, model = run_dir.parent.parent.name, run_dir.parent.name
    print(f"\n=== {run_dir.parent.parent.parent.parent.name} / {label} / {model} / {run_dir.name}")
    print(f"    transcript: {run_dir / 'transcript.jsonl'}")
    verdicts: dict[str, dict[str, str]] = {}
    for q in case.questions:
        a = auto.get(q.id, {})
        print(f"\n{q.id}: {q.text}")
        print(
            f"  expected : {', '.join(q.expect_all) or '-'}"
            + (f"  any of {', '.join(q.expect_any)}" if q.expect_any else "")
        )
        print(f"  answer   : {answers.get(q.id, '').strip() or '(no answer)'}")
        auto_text = "pass" if a.get("passed") else f"fail (missing {', '.join(a.get('missing', [])) or '-'})"
        if a.get("required_tools_not_called"):
            auto_text += f", tools not called: {', '.join(a['required_tools_not_called'])}"
        print(f"  automatic: {auto_text}")
        key = _ask("  verdict [p]ass [a] partial [f]ail, [q]uit: ", {*VERDICTS, "q"})
        if key == "q":
            return False
        note = input("  note (optional): ").strip()
        verdicts[q.id] = {"verdict": VERDICTS[key], "note": note}
    review = {
        "reviewer": reviewer,
        "reviewed_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "questions": verdicts,
    }
    (run_dir / "review.yaml").write_text(
        "# Human review of this run; it counts over the automatic score.\n"
        + yaml.safe_dump(review, sort_keys=False, allow_unicode=True)
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
    for run_dir in runs:
        if not _review_run(case, run_dir, reviewer):
            break
