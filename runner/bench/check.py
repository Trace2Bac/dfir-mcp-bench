"""Compare scripted results with the scores an experiment expects (scripted_expect)."""

from __future__ import annotations

import json
from pathlib import Path

import yaml


def check_experiment(experiment_yaml: Path, results: Path) -> list[str]:
    """Return one line per mismatch; an empty list means every label matched."""
    expected = yaml.safe_load(experiment_yaml.read_text()).get("scripted_expect") or {}
    if not expected:
        return [f"{experiment_yaml}: no scripted_expect"]
    problems = []
    for label, want in expected.items():
        score_file = results / label / "scripted" / "run-1" / "score.json"
        if not score_file.exists():
            problems.append(f"{label}: no scripted run ({score_file})")
            continue
        score = json.loads(score_file.read_text())
        got = {
            "questions": f"{score['passed']}/{score['total']}",
            "facts": f"{score['facts_found']}/{score['facts_total']}",
        }
        for key, value in want.items():
            if got.get(key) != str(value):
                problems.append(f"{label}: {key} {got.get(key)}, expected {value}")
    return problems
