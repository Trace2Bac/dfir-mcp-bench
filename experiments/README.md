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

`<model>` is the model's name (the planner's for `mulder investigate`), or
`scripted` for runs without a model; settings such as reasoning or effort
are in each `run.json`. A new run takes the next free `run-<n>`; `review.yaml`
next to it holds the reviewer's verdicts.

## experiment.yaml

| Field | Meaning |
|---|---|
| (folder) | `EXP-<nnn>`, the identifier to cite. New experiments take the next number. When the list is cleaned up, experiments may be removed and the rest renumbered, so cite a commit or tag (see below), not a branch |
| `title`, `server` | a title, which may change, and the MCP server it is about |
| `status` | `planned`, `in-progress` or `done` |
| `change` | what differs between the labels, or what the baseline is for |
| `links` | issues, pull requests, dataset pages |
| `case` | the test in `cases/`; the case names its dataset |
| `harness` | what ran it: `bench-runner` (`runner/` with a local model or scripted calls), `mulder-investigate` (mulder's orchestrator) or `claude-code` (Claude Code with `mulder serve`) |
| `harness_options` | for `mulder-investigate`: `models` per role, `effort`, how it authenticated, and `answer_section` (ask the report for a "Case Questions" section with `Case Q<n>:` lines, which `review` shows per question); for `claude-code`: `model`, `effort`, `answer_section`, `instruction`, one line added to the end of the prompt for every label, and `tools`, the only mulder tools the agent may use (the others are removed from its tool list) |
| `variants` | label to server variant (`servers/mulder/variants/<name>.env`) |
| `scripted_expect` | scripted scores per label; the check fails when a scripted run reaches a different score |
| `criteria` | how the answers are judged, written before the runs, so that the rules cannot be fitted to the results |
| `label_groups` | optional: groups of labels for the site's tables, each with a `name` and `labels` (label: short name), plus `name_ko` and `labels_ko` |
| `conclusion` | what the results show, and their limits |
| `title_ko`, `change_ko`, `criteria_ko`, `conclusion_ko` | optional Korean text for the site's Korean pages; the plain fields are English and the default |

## Files of a run

| File | Contents |
|---|---|
| `run.json` | case, label, variant, run number, end reason (`success` for Claude Code; `final_answer`, `max_turns`, `max_tokens`, `model_error` for bench-runner), server commit (`server_ref`), image ID (`image_id`), model URL, name and settings, harness settings, turns, seconds, tool calls and errors, tools called; for scripted runs also the questions and facts reached |
| `transcript.jsonl` | every prompt, model reply, tool call and tool result, with timings |
| `answer.md` | the model's final answer (or the scripted tool output) |
| `score.json` | scripted runs only: per question, whether the tool output holds every expected fact |
| `review.yaml` | model runs: the reviewer's verdict per question (found, partial, missed, false positive) and contradicted claims outside the questions |
| `server-db/` | bench-runner runs: mulder's audit log (every tool call with an output hash), its log and console output; the case database is not published |
| `claude/`, `mulder/` | Claude Code runs: the prompt, the MCP configuration and the raw event stream (`stream.jsonl`), and mulder's audit log and log. The signed-in account's email and names are replaced with [examiner] |

Results are committed so that a claim can cite them. Link to a file at a
commit or tag, for example
`https://github.com/Trace2Bac/dfir-mcp-bench/blob/<tag>/experiments/EXP-001/results/summary.md`,
not to a branch, since a later run replaces the folder.
