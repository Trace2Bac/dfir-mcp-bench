"""python -m bench <command>: run, summary, review, check, ... (see bench.sh)."""

from __future__ import annotations

import argparse
import asyncio
import json
import os
from pathlib import Path

from . import claude_code
from .case import load_case
from .check import check_experiment
from .investigate import answer_section, import_from_experiment, investigate_args, write_briefing
from .model import Model, ModelConfig
from .review import review_case
from .run import RunOptions, run_case
from .summary import summarize


def _env(name: str, default: str) -> str:
    return os.environ.get(name) or default


def _parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="bench")
    sub = parser.add_subparsers(dest="command", required=True)

    run = sub.add_parser("run", help="run one case on one server variant")
    run.add_argument("case", type=Path, help="path to cases/<id>/case.yaml")
    run.add_argument("--variant", required=True, help="server variant name, recorded in the results")
    run.add_argument("--label", help="label of the variant in the experiment, e.g. before (default: the variant)")
    run.add_argument("--run-id", type=int, default=1, help="repeat number, names the run-<n> folder")
    run.add_argument("--scripted", action="store_true", help="make the case's scripted calls instead of using a model")
    run.add_argument("--evidence-root", type=Path, default=Path(_env("BENCH_EVIDENCE", "/evidence")))
    run.add_argument(
        "--results-root",
        type=Path,
        default=Path(_env("BENCH_RESULTS", "/results")),
        help="the experiment's results folder",
    )
    run.add_argument(
        "--server-cmd",
        default=_env("BENCH_SERVER_CMD", "mulder serve --db-dir ${DB_DIR}"),
        help="command that starts the MCP server on stdio; ${DB_DIR} is a fresh folder per run",
    )
    run.add_argument("--model-base-url", default=_env("MODEL_BASE_URL", "http://host.docker.internal:1234/v1"))
    run.add_argument("--model", default=_env("MODEL_NAME", ""))
    run.add_argument("--api-key", default=_env("MODEL_API_KEY", "lm-studio"))
    run.add_argument("--temperature", type=float, default=float(_env("TEMPERATURE", "0")))
    run.add_argument("--timeout", type=float, default=float(_env("MODEL_TIMEOUT_S", "900")))
    run.add_argument("--max-tokens", type=int, default=int(_env("MODEL_MAX_TOKENS", "0")))
    run.add_argument("--reasoning-effort", default=_env("MODEL_REASONING_EFFORT", ""))

    summary = sub.add_parser("summary", help="write summary.md: labels and models over all runs")
    summary.add_argument("results", type=Path, help="path to experiments/<id>/results")
    summary.add_argument("--labels", nargs="*", help="label order for the table, e.g. before after")

    review = sub.add_parser("review", help="review model runs question by question")
    review.add_argument("case", type=Path, help="path to cases/<id>/case.yaml")
    review.add_argument("results", type=Path, help="path to experiments/<id>/results")
    review.add_argument("--reviewer", default=_env("REVIEWER", ""), help="name recorded in review.yaml")
    review.add_argument("--model", help="only runs of this model folder")

    check = sub.add_parser("check", help="compare scripted results with the experiment's scripted_expect")
    check.add_argument("experiment", type=Path, help="path to experiments/<id>/experiment.yaml")
    check.add_argument("results", type=Path, help="folder holding that experiment's scripted runs")
    imp = sub.add_parser("import-investigate", help="import a mulder investigate run into an experiment")
    imp.add_argument("experiment", type=Path, help="path to experiments/<id>/experiment.yaml")
    imp.add_argument("label", help="label of the variant the run used")
    imp.add_argument("mulder_cases", type=Path, help="mulder's cases folder (--db-dir) of that run")
    imp.add_argument("case_id", help="the CASE_ID given to mulder investigate")
    imp.add_argument("--image-id", help="ID of the image the run used")
    brief = sub.add_parser("briefing", help="write MULDER.md (case briefing and questions) into an evidence folder")
    brief.add_argument("case", type=Path, help="path to cases/<id>/case.yaml")
    brief.add_argument("evidence_dir", type=Path, help="the evidence folder mulder will read")
    brief.add_argument("container_path", help="that folder's path inside the container")
    brief.add_argument("--experiment", type=Path, help="experiment.yaml; its harness_options.answer_section applies")
    args_ = sub.add_parser("investigate-args", help="print mulder investigate flags from an experiment")
    args_.add_argument("experiment", type=Path, help="path to experiments/<id>/experiment.yaml")
    cprep = sub.add_parser("claude-prepare", help="write the claude-code prompt and MCP config into a work folder")
    cprep.add_argument("case", type=Path, help="path to cases/<id>/case.yaml")
    cprep.add_argument("experiment", type=Path, help="path to experiments/<id>/experiment.yaml")
    cprep.add_argument("work", type=Path, help="the run's working folder")
    cprep.add_argument("container_path", help="the evidence folder's path inside the container")
    cprep.add_argument("case_id", help="case ID for scan_evidence")
    cargs = sub.add_parser("claude-args", help="print claude flags from an experiment")
    cargs.add_argument("experiment", type=Path, help="path to experiments/<id>/experiment.yaml")
    sub.add_parser("claude-progress", help="print a progress line per stream-json event on stdin")
    cimp = sub.add_parser("import-claude", help="import a claude-code run into an experiment")
    cimp.add_argument("experiment", type=Path, help="path to experiments/<id>/experiment.yaml")
    cimp.add_argument("label", help="label of the variant the run used")
    cimp.add_argument("work", type=Path, help="the run's working folder")
    cimp.add_argument("case_id", help="the case ID given to scan_evidence")
    cimp.add_argument("--image-id", help="ID of the image the run used")
    return parser


def _run(args: argparse.Namespace) -> None:
    case = load_case(args.case)
    model = None
    if not args.scripted:
        model = Model(
            ModelConfig(
                args.model_base_url,
                args.model,
                args.api_key,
                args.temperature,
                args.timeout,
                args.max_tokens,
                args.reasoning_effort,
            )
        )
    opts = RunOptions(
        args.variant,
        args.label or args.variant,
        args.evidence_root,
        args.results_root,
        args.server_cmd,
        model,
        args.run_id,
    )
    out = asyncio.run(run_case(case, opts))
    if not (out / "score.json").exists():  # a model run: judged with ./bench.sh review
        print(f"{case.id} {opts.label} [{args.variant}] -> {out}")
        return
    score = json.loads((out / "score.json").read_text())
    print(
        f"{case.id} {opts.label} [{args.variant}] scripted: {score['passed']}/{score['total']} questions, "
        f"{score['facts_found']}/{score['facts_total']} facts -> {out}"
    )
    for q in score["questions"]:
        print(f"  {q['id']}: {'PASS' if q['passed'] else 'FAIL'}" + ("" if q["passed"] else f"  {q}"))


def _check(args: argparse.Namespace) -> None:
    name = args.experiment.parent.name
    problems = check_experiment(args.experiment, args.results)
    for line in problems:
        print(f"FAIL {name} {line}")
    if problems:
        raise SystemExit(1)
    print(f"ok   {name}")


def main() -> None:
    args = _parser().parse_args()
    if args.command == "run":
        _run(args)
    elif args.command == "summary":
        text = summarize(args.results, args.labels)
        (args.results / "summary.md").write_text(text)
        print(text, end="")
    elif args.command == "review":
        review_case(args.case, args.results, args.reviewer, args.model)
    elif args.command == "check":
        _check(args)
    elif args.command == "investigate-args":
        print(investigate_args(args.experiment))
    elif args.command == "briefing":
        section = answer_section(args.experiment) if args.experiment else False
        print(write_briefing(args.case, args.evidence_dir, args.container_path, section))
    elif args.command == "claude-prepare":
        claude_code.prepare(args.case, args.experiment, args.work, args.container_path, args.case_id)
    elif args.command == "claude-args":
        print(claude_code.claude_args(args.experiment))
    elif args.command == "claude-progress":
        claude_code.progress()
    elif args.command == "import-claude":
        out = claude_code.import_run(args.experiment, args.label, args.work, args.case_id, args.image_id)
        print(f"{args.label}: imported -> {out}; judge it with ./bench.sh review")
    elif args.command == "import-investigate":
        out = import_from_experiment(args.experiment, args.label, args.mulder_cases, args.case_id, args.image_id)
        print(f"{args.label}: imported -> {out}; judge it with ./bench.sh review")


if __name__ == "__main__":
    main()
