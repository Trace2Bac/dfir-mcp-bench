"""Summarize every run of a case: one row per label and model, over all repeats.

Scripted runs are checked automatically against the expected facts. Model runs
are not scored; their results come from human reviews (review.yaml).
"""

from __future__ import annotations

import json
from collections import Counter
from pathlib import Path
from statistics import mean, median
from typing import Any

from .review import VERDICTS, load_review, review_counts, verdict

# One letter per verdict in the per-question table.
_LETTER = {"found": "F", "partial": "P", "missed": "M", "false positive": "X"}


def _load_runs(case_results: Path) -> dict[tuple[str, str], list[dict[str, Any]]]:
    groups: dict[tuple[str, str], list[dict[str, Any]]] = {}
    for run_json in sorted(case_results.glob("*/*/run-*/run.json")):
        run_dir = run_json.parent
        info = json.loads(run_json.read_text())
        score = run_dir / "score.json"
        info["_score"] = json.loads(score.read_text()) if score.exists() else None
        info["_review"] = load_review(run_dir)
        label, model = run_dir.parent.parent.name, run_dir.parent.name
        groups.setdefault((label, model), []).append(info)
    return groups


def _rate(values: list[float]) -> str:
    """Median and range of per-run percentages, as mulder publishes them."""
    pct = [round(v * 100) for v in values]
    if min(pct) == max(pct):
        return f"{pct[0]}%"
    return f"{round(median(pct))}% ({min(pct)} to {max(pct)})"


def _avg(values: list[float | None]) -> str:
    known = [v for v in values if v is not None]  # None: not recorded by that harness
    return f"{mean(known):.1f}" if known else "-"


def summarize(case_results: Path, label_order: list[str] | None = None) -> str:
    groups = _load_runs(case_results)
    if label_order:  # list labels as case.yaml does, e.g. before then after
        rank = {label: i for i, label in enumerate(label_order)}
        groups = dict(sorted(groups.items(), key=lambda kv: (rank.get(kv[0][0], len(rank)), kv[0])))
    if not groups:
        return f"no runs under {case_results}\n"
    # experiments/<id>/results, or .check/<id> for `bench.sh check`
    lines = [f"# {case_results.parent.name if case_results.name == 'results' else case_results.name}", ""]

    scripted = {k: v for k, v in groups.items() if k[1] == "scripted"}
    models = {k: v for k, v in groups.items() if k[1] != "scripted"}
    if scripted:
        lines += [
            "Scripted runs (fixed tool calls, no model): the expected facts found in what the tools returned.",
            "",
            "| label | variant | questions | facts | tool calls | tool errors |",
            "|---|---|---|---|---|---|",
        ]
        for (label, _), runs in scripted.items():
            s, r = runs[0]["_score"], runs[0]
            lines.append(
                f"| {label} | {r.get('variant', '?')} | {s['passed']}/{s['total']} | "
                f"{s['facts_found']}/{s['facts_total']} | {r.get('tool_calls', 0)} | {r.get('tool_errors', 0)} |"
            )
        lines.append("")
    if models:
        lines += [
            "Model runs. Means are per run.",
            "",
            "| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |",
            "|---|---|---|---|---|---|---|---|---|---|",
        ]
        review_rows, question_rows = [], []
        for (label, model), runs in models.items():
            reasons = Counter(r.get("end_reason", "?") for r in runs)
            reviews = [r["_review"] for r in runs if r["_review"]]
            lines.append(
                f"| {label} | {model} | {runs[0].get('variant', '?')} | {len(runs)} | {len(reviews)}/{len(runs)} | "
                + " | ".join(_avg([r.get(k) for r in runs]) for k in ("turns", "tool_calls", "tool_errors", "seconds"))
                + f" | {', '.join(f'{k} {v}' for k, v in sorted(reasons.items()))} |"
            )
            if not reviews:
                continue
            n = len(reviews[0]["questions"])
            counts = [review_counts(r) for r in reviews]
            review_rows.append(
                f"| {label} | {model} | {len(reviews)} | {_rate([c['found'] / n for c in counts])} | "
                f"{_rate([(c['found'] + c['partial']) / n for c in counts])} | "
                f"{_rate([c['false positive'] / n for c in counts])} |"
            )
            ids = list(reviews[0]["questions"])
            cells = []
            for i in ids:
                per = Counter(verdict(r["questions"].get(i)) for r in reviews)
                cells.append(" ".join(f"{_LETTER[v]}{per[v]}" for v in VERDICTS.values() if per[v]))
            question_rows.append((ids, f"| {label} | {model} | " + " | ".join(cells) + " |"))
        if review_rows:
            lines += [
                "",
                (
                    "Human review, on the scale mulder uses for its own runs: full match = found, detection ="
                    " found or partial, false positives = contradicted claims stated as fact (inside or outside"
                    " the questions), each over the number of questions. Median of the reviewed runs, range in"
                    " parentheses."
                ),
                "",
                "| label | model | reviewed runs | full match | detection | false positives |",
                "|---|---|---|---|---|---|",
                *review_rows,
                "",
                "Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):",
                "",
                "| label | model | " + " | ".join(question_rows[0][0]) + " |",
                "|---|---|" + "---|" * len(question_rows[0][0]),
                *(row for _, row in question_rows),
            ]
        else:
            lines += ["", "No run has been reviewed yet (`./bench.sh review`)."]
    return "\n".join(lines) + "\n"
