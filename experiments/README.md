# Experiments

One folder per verification of a server change:

```
experiments/EXP-<nnn>/
  experiment.yaml   what changed, links, case, harness, variant per label,
                    expected scripted scores, status and conclusion
  results/
    summary.md      one row per label and model over all runs
    <label>/<model>/run-<n>/
```

`<model>` is `scripted` for runs without a model; `_reasoning-<effort>` is
added when `MODEL_REASONING_EFFORT` is set. A new run with the same label,
model and number replaces its folder.

## experiment.yaml

| Field | Meaning |
|---|---|
| (folder) | `EXP-<nnn>`, the permanent identifier: cite it, never rename or reuse it. Take the next number; a removed experiment leaves a gap |
| `title`, `server` | a title, which may change, and the MCP server it is about |
| `kind` | `bug-fix` (a fix, before and after), `feature` (an added feature), `ablation` (an existing feature removed) or `baseline` (one version, the reference for later comparisons) |
| `status` | `planned`, `in-progress` or `done` |
| `change` | what differs between the labels, or what the baseline is for |
| `links` | issues, pull requests, dataset pages |
| `case` | the test in `cases/`; the case names its dataset |
| `harness` | what ran it: `bench-runner` (`runner/` with a local model or scripted calls, `./bench.sh run`) or `mulder-investigate` (mulder's orchestrator, `./bench.sh investigate`) |
| `harness_options` | for `mulder-investigate`: `models` per role, `effort`, how it authenticated, and `answer_section` (ask the report for a "Case Questions" section with `Case Q<n>:` lines, which `review` reads; scoring still reads the whole report) |
| `variants` | label to server variant (`servers/mulder/variants/<name>.env`) |
| `scripted_expect` | scripted scores per label; `./bench.sh check` fails when they change |
| `conclusion` | what the results show, and their limits |
| `title_ko`, `change_ko`, `conclusion_ko` | optional Korean text for the site's Korean pages; the plain fields are English and the default |

## Files of a run

| File | Contents |
|---|---|
| `run.json` | case, label, variant, run number, end reason (`final_answer`, `max_turns`, `max_tokens`, `model_error`), server commit (`server_ref`), image ID (`image_id`), model URL, name and settings, harness settings, turns, seconds, tool calls and errors, wrong claims, tools called, score and facts |
| `transcript.jsonl` | every prompt, model reply, tool call and tool result, with timings |
| `answer.md` | the model's final answer (or the scripted tool output) |
| `score.json` | per question: passed, missing facts, facts found, required tools not called |
| `review.yaml` | a person's verdict per question (`./bench.sh review`); it counts over the automatic score |
| `server-db/` | mulder's audit log (every tool call with an output hash), its log and console output; the case database is not published |

Results are committed so that a claim can cite them. Link to a file at a
commit or tag, for example
`https://github.com/Trace2Bac/dfir-mcp-bench/blob/<tag>/experiments/EXP-001/results/summary.md`,
not to a branch, since a later run replaces the folder.
