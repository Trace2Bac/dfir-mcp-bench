"""Summarize every run of a case: one row per label and model, over all repeats."""

from __future__ import annotations

import json
from collections import Counter
from pathlib import Path
from statistics import mean
from typing import Any


def _load_runs(case_results: Path) -> dict[tuple[str, str], list[dict[str, Any]]]:
    groups: dict[tuple[str, str], list[dict[str, Any]]] = {}
    for run_json in sorted(case_results.glob("*/*/run-*/run.json")):
        run_dir = run_json.parent
        info = json.loads(run_json.read_text())
        info["_score"] = json.loads((run_dir / "score.json").read_text())
        label, model = run_dir.parent.parent.name, run_dir.parent.name
        groups.setdefault((label, model), []).append(info)
    return groups


def _avg(values: list[float]) -> str:
    return f"{mean(values):.1f}" if values else "-"


def summarize(case_results: Path, label_order: list[str] | None = None) -> str:
    groups = _load_runs(case_results)
    if label_order:  # list labels as case.yaml does, e.g. before then after
        rank = {label: i for i, label in enumerate(label_order)}
        groups = dict(sorted(groups.items(), key=lambda kv: (rank.get(kv[0][0], len(rank)), kv[0])))
    if not groups:
        return f"no runs under {case_results}\n"
    lines = [
        f"# {case_results.name}",
        "",
        "Means are per run. A run passes when every question passes.",
        "",
        "| label | model | variant | runs | runs passed | questions | facts | wrong claims |"
        " turns | tool calls | tool errors | seconds | end reasons |",
        "|---|---|---|---|---|---|---|---|---|---|---|---|---|",
    ]
    question_rows = []
    for (label, model), runs in groups.items():
        scores = [r["_score"] for r in runs]
        reasons = Counter(r.get("end_reason", "?") for r in runs)
        lines.append(
            "| "
            + " | ".join(
                [
                    label,
                    model,
                    runs[0].get("variant", "?"),
                    str(len(runs)),
                    f"{sum(s['passed'] == s['total'] for s in scores)}/{len(runs)}",
                    f"{_avg([s['passed'] for s in scores])}/{scores[0]['total']}",
                    f"{_avg([s.get('facts_found', 0) for s in scores])}/{scores[0].get('facts_total', '?')}",
                    str(sum(r.get("wrong_claims", 0) for r in runs)),
                    _avg([r.get("turns", 0) for r in runs]),
                    _avg([r.get("tool_calls", 0) for r in runs]),
                    _avg([r.get("tool_errors", 0) for r in runs]),
                    _avg([r.get("seconds", 0) for r in runs]),
                    ", ".join(f"{k} {v}" for k, v in sorted(reasons.items())),
                ]
            )
            + " |"
        )
        per_q = Counter(q["id"] for s in scores for q in s["questions"] if q["passed"])
        ids = [q["id"] for q in scores[0]["questions"]]
        question_rows.append(f"| {label} | {model} | " + " | ".join(f"{per_q[i]}/{len(runs)}" for i in ids) + " |")
    ids = [q["id"] for q in next(iter(groups.values()))[0]["_score"]["questions"]]
    lines += [
        "",
        "Runs that passed each question:",
        "",
        "| label | model | " + " | ".join(ids) + " |",
        "|---|---|" + "---|" * len(ids),
        *question_rows,
    ]
    return "\n".join(lines) + "\n"
