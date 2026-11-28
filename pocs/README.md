# PoCs

A PoC shows that one case recorded in dfir-mcp-matrix happens when the server
runs. It writes small evidence files, calls the server's tools over MCP with no
model, and checks the response against what the static analysis said. One PoC
covers one case (one server, one problem, one place in the code).

```
pocs/<problem>/<server>/<case-id>/
  poc.yaml          the case, the evidence it writes, the calls and the checks
  runs/<commit>/    output of each run, kept as evidence
    result.json     reproduced or not reproduced, the checks, the image digest
    transcript.json every request and response, the evidence as written, and
                    what the model would be given (server instructions, tool list)
    model/<model>/  with a model block, one folder per model:
      model.json    each run's class, answer, checks and tool calls
      run-<n>.jsonl each run as Claude Code streamed it, or the local loop's
                    requests, responses and tool calls
```

`<problem>` and `<case-id>` are the IDs in dfir-mcp-matrix: the first digit
of a problem ID is its chapter (`P2049`, `P4192`), and a case ID adds a number
within the problem (`P4192-010`).

## poc.yaml

| Field | Meaning |
|---|---|
| `case_id`, `problem`, `server` | the matrix case |
| `variant`, `commit` | the server image the PoC runs on (`servers/<server>/variants/`) and its source commit |
| `display` | how the result is shown: `response`, `source-vs-result`, `multi-call`, `side-effect`, `time-size`, `network`, `definition`, `secret` |
| `summary` | one sentence: the condition, what the server returns, why it is the problem |
| `summary_ko` | the same sentence in Korean, shown on the Korean site |
| `defect_ko` | in Korean: what is wrong, as normal behaviour against what this server does, and what a model then gets wrong; the page falls back to `summary_ko` |
| `setup_ko` | in Korean: the condition the PoC prepares, in plain words |
| `realism` | how likely the condition is in real use: common, possible, forced; a forced case is a candidate for removal from the matrix |
| `realism_ko` | in Korean: why the condition is that likely |
| `coverage` | whether the PoC shows the whole case or part of it, and what is left out |
| `coverage_ko` | what a partial PoC leaves out (the text after `partial:`), in Korean |
| `fixture` | files written before the server starts (text, bytes, size, mode, modification time, symbolic link, many generated files), in the evidence folder, the server's data folder or a folder next to the evidence that the server is not given |
| `stubs`, `env` | stand-in programs and server environment variables, for an external tool whose output the case depends on; a stub imitates the tool's real output format and says which in a comment |
| `conditions`, `repeat` | the same calls under different settings (for example two time zones) or several times |
| `steps` | MCP calls in order: tools, prompts, resources, the tool list; `note_ko` on a step says in Korean why the call is made |
| `expect` | checks on the responses; the case is reproduced only if every check holds; `note_ko` on a check says in Korean what it confirms (without it, the page writes a sentence from the rule) |
| `level` | `mcp` when the PoC checks the server's responses only, `model` when it also has a `model` block |
| `model` | optional: one question a model is asked about the same evidence (below) |

## Model check

Some cases matter only if a model actually misreads the response: a missing
limit on what was examined, evidence text mixed with the server's own text,
markup passed through, missing provenance, an overstated claim of trust. For
these, a PoC can add a `model` block. The scripted calls still decide
`result`; the model check is reported beside it as `model_result`.

Each model in `model.models` runs in the same server image, with the PoC's
server as its only tools and the PoC's evidence written fresh for each run.
A Claude model runs in Claude Code (headless, harness `claude-code`). It is given the question and what the
server itself gives it (instructions, tool list), and nothing about the
defect. Without `models`, the list is `claude-opus-4-6`, `claude-sonnet-4-6`,
`claude-haiku-4-5` and `local`.

`local` is a model served by Ollama: the tag in `BENCH_LOCAL_MODEL`
(`qwen3.5:9b` by default; `local:<tag>` names another) on the Ollama server at
`BENCH_OLLAMA_URL` (`http://host.docker.internal:11434`, Ollama on the Docker
host, by default). A 9B model does not cope with Claude Code's long system
prompt and prefixed tool names, so it runs in a small loop in the runner
instead (harness `ollama-chat`): the runner connects to the server over MCP
stdio, sends the server's tools under their own names, descriptions and input
schemas to Ollama's `/api/chat`, with the server's instructions and one short
line as the system message and the question as the user message, and makes
each tool call the model asks for until it answers without one or
`max_turns` is reached. A call to a tool the server does not have is returned
to the model as an error. Tool results over 30,000 characters are cut, with a
note, before the model sees them. Ollama runs with `{"temperature": 0,
"num_ctx": 65536}` (Ollama's own 4096-token default would silently cut the
tool list), overridden by `model.options`. Its results are filed as
`local-<tag>`. When the URL cannot be reached or the server has
no such model, that model's runs are recorded as failed with the reason, and
the other models still run.

Each run falls in one class:

| Class | Meaning |
|---|---|
| `misled` | the model used the tools, reached the defect (when `defect_tools` is set) and answered, and the `model.expect` rules hold on its final answer (all of them with `misled_if: all`, the default; one with `misled_if: any`) |
| `correct` | as `misled`, but the rules do not hold |
| `not_reached` | with `defect_tools`: the model answered without a successful call of any of them; not judged |
| `no_answer` | at least one tool call succeeded, but the run ended (max_turns, timeout) without a final answer; not counted as misled |
| `tool_failed` | the model called no tool, none of its calls to the server's tools succeeded (calls to tools it does not have, malformed or rejected calls); not counted as misled |
| `failed` | the run did not start (Claude Code or the model returned an error before any tool call, or the model could not be reached) |

The server images are built on mulder's release image, which is published for
linux/amd64 and linux/arm64, so on Apple Silicon they run natively.

`model_result.by_model` has, per model, the harness, the judged runs (`misled` plus
`correct`), the count of each class, the runs that reached the defect (`reached` of `total`, with `defect_tools`), the reason a model could not run, and
each run's class, `reached_defect`, final answer, tool calls (name and arguments) and time.
`model_result` also keeps the totals and the model misled most often
(`worst`), which the PoC list shows.

| Field | Meaning |
|---|---|
| `question` | the task an analyst would give, in English, with no hint about the defect; `${EVIDENCE}` is filled in; `question_ko` is the Korean shown on the site |
| `models` | the models asked, Claude model IDs or `local`; Haiku (`claude-haiku-4-5`) by default, which is enough to see whether the case holds; Opus and the local model are added for a closer look |
| `repeat` | runs per model, 3 by default |
| `max_turns` | turns per run; 20 by default in Claude Code, 40 for a local model |
| `defect_tools` | optional: the tools whose successful response carries the defect; runs that never got one are `not_reached` |
| `defect_response` | optional, with `defect_tools`: a regex the response must match to count as the defective response (a call with other arguments that returns something else does not count) |
| `options` | Ollama options for a local model, over the defaults above |
| `expect` | `contains`, `not_contains`, `regex` and `not_regex` rules on the final answer, each with an optional `note_ko` |
| `misled_if` | `all` or `any` |

`pocs/_samples/model/` holds a sample (P4118-007 with a model block). Folders
under `pocs/` whose name starts with `_` are not counted or shown on the site.

A result is reported in dfir-mcp-matrix as `reproduced` or `not reproduced`
for the case and the commit it ran on.
