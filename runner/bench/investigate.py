"""Import a `mulder investigate` run as a bench run.

mulder's orchestrator writes a report, an audit log and its own logs into its
cases folder. This turns them into the files every bench run has, so the same
scoring, review, summary and site apply:

- answer.md         the report (Markdown); scored against the case questions
- transcript.jsonl  one tool_call event per audited tool call, in order
- score.json        the case scoring; required tools are checked against the audit log
- run.json          variant, models, effort, timing, tool calls, token usage
- mulder/           report (md, html), audit log, model usage and logs, as written by mulder
"""

from __future__ import annotations

import json
import re
import shutil
from datetime import datetime
from pathlib import Path
from typing import Any

from .case import load_case, split_answers
from .score import score_case

# Copied as is; the case database is left out (it holds indexed evidence).
KEEP = ("report.md", "report.html", "audit.jsonl", "model_usage.json", "mulder.log")
# Written by `bench.sh investigate` next to mulder's files: the briefing it was given.
BRIEFING = "MULDER.md"

_LOG_TIME = re.compile(r"^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}),(\d{3})")
_QUERY = re.compile(r"Query complete \(model=([^)]+)\): turns=(\d+)")


def _log_span(log: Path) -> tuple[datetime | None, datetime | None]:
    stamps = []
    for line in log.read_text(errors="replace").splitlines():
        m = _LOG_TIME.match(line)
        if m:
            stamps.append(datetime.strptime(f"{m.group(1)}.{m.group(2)}", "%Y-%m-%d %H:%M:%S.%f"))
    return (stamps[0], stamps[-1]) if stamps else (None, None)


def import_investigation(
    case_yaml: Path,
    mulder_cases: Path,
    case_id: str,
    out: Path,
    *,
    variant: str,
    label: str,
    settings: dict[str, Any],
    image_id: str | None,
    server_ref: str | None,
) -> dict[str, Any]:
    """Write a bench run folder at *out* from mulder's files for *case_id*."""
    case = load_case(case_yaml)
    if out.exists():
        shutil.rmtree(out)
    (out / "mulder").mkdir(parents=True)
    for suffix in KEEP:
        src = mulder_cases / f"{case_id}.{suffix}"
        if src.exists():
            shutil.copy2(src, out / "mulder" / src.name)
    log = mulder_cases / "orchestrator.log"
    if log.exists():
        shutil.copy2(log, out / "mulder" / "orchestrator.log")
    if (mulder_cases / BRIEFING).exists():
        shutil.copy2(mulder_cases / BRIEFING, out / "mulder" / BRIEFING)

    report = (mulder_cases / f"{case_id}.report.md").read_text()
    (out / "answer.md").write_text(report)

    audit = [json.loads(line) for line in (mulder_cases / f"{case_id}.audit.jsonl").read_text().splitlines()]
    calls = [e for e in audit if e.get("type") == "tool_call"]
    first = datetime.fromisoformat(calls[0]["timestamp"]) if calls else None
    with (out / "transcript.jsonl").open("w") as f:
        for e in calls:
            t = (datetime.fromisoformat(e["timestamp"]) - first).total_seconds() if first else 0
            event = {
                "t": round(t, 3),
                "kind": "tool_call",
                "tool": e["tool_name"],
                "args": e.get("params", {}),
                "is_error": False,  # the audit log records calls, not their outcome
                "result": f"[mulder audit: output {e.get('output_hash', '')}, {e.get('duration_ms', 0):.0f} ms]",
            }
            f.write(json.dumps(event, ensure_ascii=False) + "\n")

    called = {e["tool_name"] for e in calls}
    # A question is scored on its "Case Q<n>:" line when the report has one
    # (answer_section); otherwise on the whole report, as for runs without it.
    lines = split_answers(case, report, prefix=CASE_PREFIX, fallback=False)
    answers = {q.id: lines.get(q.id) or report for q in case.questions}
    score = score_case(case.questions, answers, called)
    (out / "score.json").write_text(json.dumps(score, indent=2) + "\n")

    started, finished = _log_span(log) if log.exists() else (None, None)
    turns = sum(int(m.group(2)) for m in _QUERY.finditer(log.read_text(errors="replace"))) if log.exists() else 0
    usage_file = mulder_cases / f"{case_id}.model_usage.json"
    usage = json.loads(usage_file.read_text()) if usage_file.exists() else []
    run_info = {
        "case": case.id,
        "label": label,
        "variant": variant,
        "server_ref": server_ref,
        "image_id": image_id,
        "harness": {"name": "mulder-investigate", **settings},
        "model": None,
        "started": started.isoformat() if started else None,
        "finished": finished.isoformat() if finished else None,
        "run_id": 1,
        "end_reason": "report",
        "answers_from": f"{len(lines)} '{CASE_PREFIX}Q<n>' lines, whole report for the rest",
        "turns": turns,
        "seconds": round((finished - started).total_seconds(), 1) if started and finished else 0,
        "tool_calls": len(calls),
        "tool_errors": None,
        "wrong_claims": sum(len(q["forbidden_found"]) for q in score["questions"]),
        # As reported by mulder: cache reads and writes are not included.
        "token_usage": usage,
        "findings": sum(1 for e in audit if e.get("type") == "finding"),
        "tools_called": sorted(called),
        "score": f"{score['passed']}/{score['total']}",
        "facts": f"{score['facts_found']}/{score['facts_total']}",
    }
    (out / "run.json").write_text(json.dumps(run_info, indent=2) + "\n")
    return run_info


# Label for the case questions when the report is asked to answer them in their
# own section; it keeps them apart from the Q1-Q8 of mulder's report template.
CASE_PREFIX = "Case "


def write_briefing(case_yaml: Path, evidence_dir: Path, evidence_in_container: str, answer_section: bool) -> Path:
    """Write MULDER.md into *evidence_dir*: the case briefing and questions, no answers.

    mulder prepends MULDER.md in the evidence root to its planner and analyst
    prompts; this is its documented way to give an investigation questions.
    """
    out = evidence_dir / "MULDER.md"
    out.write_text(briefing_text(case_yaml, evidence_in_container, answer_section))
    return out


def briefing_text(case_yaml: Path, evidence_in_container: str, answer_section: bool) -> str:
    """The case briefing and questions, no answers.

    With *answer_section*, the questions are labelled "Case Q<n>" and the
    report is asked to answer each on its own line in a "Case Questions"
    section, so the answers can be read per question.
    """
    case = load_case(case_yaml)
    briefing = case.briefing.replace("${EVIDENCE}", evidence_in_container)
    label = CASE_PREFIX if answer_section else ""
    questions = "\n".join(f"- {label}{q.id}: {q.text}" for q in case.questions)
    text = (
        "# Case Briefing\n\n## Background\n\n"
        f"{briefing}\n\n## What We're Looking For\n\n"
        f"Answer each of these questions in the report, citing the evidence:\n\n{questions}\n"
    )
    if answer_section:
        example = "\n".join(f"{CASE_PREFIX}{q.id}: <answer>" for q in case.questions[:2])
        text += (
            "\n## How to Answer\n\n"
            'In the final report, add a section titled "Case Questions". Answer every question '
            f"above on its own line, starting with its label ({CASE_PREFIX}Q1, {CASE_PREFIX}Q2, ...), "
            "and state the answer itself, not only where it can be found. If the evidence does "
            "not answer a question, say so on its line. These are separate from the report's own "
            f"numbered questions.\n\n{example}\n...\n"
        )
    return text


def answer_section(experiment_yaml: Path) -> bool:
    """Whether the experiment asks mulder's report for a "Case Questions" section."""
    import yaml

    options = yaml.safe_load(experiment_yaml.read_text()).get("harness_options") or {}
    return bool(options.get("answer_section", False))


def investigate_args(experiment_yaml: Path) -> str:
    """`mulder investigate` model flags from the experiment's harness_options."""
    import yaml

    options = yaml.safe_load(experiment_yaml.read_text()).get("harness_options") or {}
    models = options.get("models") or {}
    flags = [f"--{role}-model {models[role]}" for role in ("planner", "executor", "analyst") if role in models]
    if options.get("effort"):
        flags.append(f"--effort {options['effort']}")
    return " ".join(flags)


def _slug(text: str) -> str:
    return re.sub(r"[^A-Za-z0-9._-]+", "-", text).strip("-")


def import_from_experiment(
    experiment_yaml: Path, label: str, mulder_cases: Path, case_id: str, image_id: str | None
) -> Path:
    """Import into experiments/<id>/results/<label>/<models>/run-1, using the experiment's settings."""
    import yaml

    exp = yaml.safe_load(experiment_yaml.read_text())
    variant = exp["variants"][label]
    env = (experiment_yaml.parents[2] / "servers" / "mulder" / "variants" / f"{variant}.env").read_text()
    ref = re.search(r"^REF=(\S+)", env, re.MULTILINE)
    settings = exp.get("harness_options") or {}
    models = settings.get("models") or {}
    folder = "_".join(dict.fromkeys(models.values())) or "mulder-investigate"
    if settings.get("effort"):
        folder += f"_effort-{settings['effort']}"
    out = experiment_yaml.parent / "results" / label / _slug(folder) / "run-1"
    import_investigation(
        experiment_yaml.parents[2] / "cases" / exp["case"] / "case.yaml",
        mulder_cases,
        case_id,
        out,
        variant=variant,
        label=label,
        settings=settings,
        image_id=image_id,
        server_ref=ref.group(1) if ref else None,
    )
    return out
