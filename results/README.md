# Results

Results are grouped by case, then by the variant label from `case.yaml`,
then by model (`scripted` for runs without a model; `_reasoning-<effort>`
is added when `MODEL_REASONING_EFFORT` is set), then by repeat:

```
results/pcap-dns-smtp/summary.md
results/pcap-dns-smtp/before/qwen-qwen3.5-9b_reasoning-none/run-1/ ... run-5/
results/pcap-dns-smtp/after/qwen-qwen3.5-9b_reasoning-none/run-1/ ... run-5/
results/rhino-hunt/release/scripted/run-1/
```

A new run with the same case, label, model and number replaces its folder.
`summary.md` has one row per label and model over all its runs, and the
number of runs that passed each question.

| File | Contents |
|---|---|
| `run.json` | case, label, variant, run number, end reason (`final_answer`, `max_turns`, `max_tokens`, `model_error: ...`), server commit (`server_ref`), image ID (`image_id`), model URL, name and temperature, turns, seconds, tool calls and tool errors, wrong claims, tools called, score (questions) and facts |
| `transcript.jsonl` | every prompt, model reply, tool call and tool result, with timings |
| `answer.md` | the model's final answer (or the scripted tool output) |
| `score.json` | per question: passed, missing facts, facts found, required tools not called |
| `server-db/` | mulder's audit log (every tool call with an output hash) and server log; the case database is not published |

Results are committed so that a claim can cite them: link to a file at a
commit or tag, for example
`https://github.com/<owner>/dfir-mcp-bench/blob/<tag>/results/pcap-dns-smtp/summary.md`,
not to a branch, since a later run replaces the folder.
