"""python -m bench run <case.yaml> [options]"""

from __future__ import annotations

import argparse
import asyncio
import json
import os
from pathlib import Path

from .case import load_case
from .model import Model, ModelConfig
from .run import RunOptions, run_case
from .summary import summarize


def main() -> None:
    parser = argparse.ArgumentParser(prog="bench")
    sub = parser.add_subparsers(dest="command", required=True)
    run = sub.add_parser("run", help="run one case")
    run.add_argument("case", type=Path, help="path to cases/<id>/case.yaml")
    run.add_argument("--variant", required=True, help="server variant name, recorded in the results")
    run.add_argument("--label", help="label of the variant in the case, e.g. before or after (default: the variant)")
    run.add_argument("--evidence-root", type=Path, default=Path(os.environ.get("BENCH_EVIDENCE", "/evidence")))
    run.add_argument("--results-root", type=Path, default=Path(os.environ.get("BENCH_RESULTS", "/results")))
    run.add_argument(
        "--server-cmd",
        default=os.environ.get("BENCH_SERVER_CMD", "mulder serve --db-dir ${DB_DIR}"),
        help="command that starts the MCP server on stdio; ${DB_DIR} is a fresh directory per run",
    )
    run.add_argument("--run-id", type=int, default=1, help="repeat number, names the run-<n> folder")
    run.add_argument("--scripted", action="store_true", help="run the case's scripted calls instead of a model")
    run.add_argument("--model-base-url", default=os.environ.get("MODEL_BASE_URL", "http://host.docker.internal:1234/v1"))
    run.add_argument("--model", default=os.environ.get("MODEL_NAME", ""))
    run.add_argument("--api-key", default=os.environ.get("MODEL_API_KEY", "lm-studio"))
    run.add_argument("--temperature", type=float, default=float(os.environ.get("TEMPERATURE", "0")))
    run.add_argument("--timeout", type=float, default=float(os.environ.get("MODEL_TIMEOUT_S", "900")))
    run.add_argument("--reasoning-effort", default=os.environ.get("MODEL_REASONING_EFFORT", ""))
    run.add_argument("--max-tokens", type=int, default=int(os.environ.get("MODEL_MAX_TOKENS", "0") or 0))
    summ = sub.add_parser("summary", help="compare labels and models over all runs of a case")
    summ.add_argument("case_results", type=Path, help="path to results/<case>")
    summ.add_argument("--labels", nargs="*", help="label order for the table, e.g. before after")
    args = parser.parse_args()

    if args.command == "summary":
        text = summarize(args.case_results, args.labels)
        (args.case_results / "summary.md").write_text(text)
        print(text, end="")
        return

    case = load_case(args.case)
    model = None
    if not args.scripted:
        model = Model(ModelConfig(args.model_base_url, args.model, args.api_key, args.temperature, args.timeout, args.max_tokens, args.reasoning_effort))
    opts = RunOptions(
        args.variant, args.label or args.variant, args.evidence_root, args.results_root, args.server_cmd, model, args.run_id
    )
    out = asyncio.run(run_case(case, opts))

    # Record the exact server commit and image so a run can be repeated.
    info = json.loads((out / "run.json").read_text())
    ref = Path("/app/.bench-ref")
    if ref.exists():
        info["server_ref"] = ref.read_text().strip()
    if os.environ.get("BENCH_IMAGE_ID"):
        info["image_id"] = os.environ["BENCH_IMAGE_ID"]
    (out / "run.json").write_text(json.dumps(info, indent=2) + "\n")

    score = json.loads((out / "score.json").read_text())
    print(f"{case.id} {opts.label} [{args.variant}] {score['passed']}/{score['total']} questions, "
          f"{score['facts_found']}/{score['facts_total']} facts -> {out}")
    for q in score["questions"]:
        print(f"  {q['id']}: {'PASS' if q['passed'] else 'FAIL'}" + ("" if q["passed"] else f"  {q}"))


if __name__ == "__main__":
    main()
