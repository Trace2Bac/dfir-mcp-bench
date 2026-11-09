# dfir-mcp-bench

Repeatable tests of DFIR MCP servers, run with a local model.

Each test (a *case*) gives a model questions about public or generated
evidence and a list of server tools, records every tool call, and scores the
answer against an answer key. A case runs on several *variants* of a server,
for example the commit before a fix and the fix commit, so the effect of a
change is measured rather than described. The results are committed so that
contributions and design guidelines can cite them.

## Results

| Case | Comparison | Without a model (scripted) | qwen3.5-9b, thinking off, 5 runs each |
|---|---|---|---|
| [`pcap-dns-smtp`](results/pcap-dns-smtp/summary.md) | calebevans/mulder#274: `before` = parent commit, `after` = fix commit | 0/3 → 3/3 questions | 0/5 → 5/5 runs passed; 12 → 5 turns; 70 → 35 s |
| [`rhino-hunt`](results/rhino-hunt/summary.md) | mulder 1.5.10, full answer key | 5/7 questions, 15/22 facts (ceiling) | not run yet |

Notes on `pcap-dns-smtp`:

- Before the fix, tshark fails but mulder reports `success` and stores the
  error text as the result, so the model sees no tool error. In all five
  `before` runs the model re-read that output until it ran out of turns.
- With thinking on, one earlier `before` run passed: the model switched to
  `mode=custom` with a `dns` or `smtp` display filter, which avoids the broken
  fields. Thinking-on runs have not been repeated yet.

Notes on `rhino-hunt`: the zip password, the stego images and the names of
the carved images cannot be reached with mulder's tools, because the carving
tools delete their output after listing it. The scripted score is therefore
the ceiling for any model.

## Method

A comparison counts as evidence only if the change under test is the one
difference between the two sides. A fix to what a tool returns is proven by
the scripted run; a fix to what the model reads, or the value of an existing
feature, needs repeated model runs. See [docs/method.md](docs/method.md).

## How it runs

```
 host                                    Docker image dfir-mcp-bench/mulder:<variant>
 ┌──────────────────────┐   HTTP      ┌──────────────────────────────────────────┐
 │ LM Studio            │◄────────────┤ runner (python -m bench)                 │
 │ OpenAI-compatible API│  /v1/chat   │   only the case's tools are shown        │
 │ :1234                │             │        │ stdio (MCP)                     │
 └──────────────────────┘             │        ▼                                 │
                                      │ mulder serve  (upstream release image,   │
 data/evidence  ── read-only mount ──►│   source at REF + patches)               │
 results/       ◄── run output ───────┤                                          │
                                      └──────────────────────────────────────────┘
```

- Everything except the model runs in Docker: evidence preparation, the MCP
  server and the runner. The release image is pinned by digest and each
  variant by commit SHA, and `run.json` records the server commit and image ID.
- The model runs on the host, because Docker on macOS has no GPU access. Any
  OpenAI-compatible server works (LM Studio, llama.cpp, vLLM). `run.json`
  records the model name, temperature, token cap and reasoning setting;
  record the model file and context length yourself when publishing.
- Server code is never copied into this repository. A variant is an upstream
  release image plus a commit and optional patch files.

## Quick start

1. Load a model in LM Studio and start its server (Developer tab, port 1234).
   Set the context length to at least 32K.
2. `cp .env.example .env` and set `MODEL_NAME` if more than one model is loaded.
3. Prepare evidence:
   ```
   ./bench.sh prepare synthetic-dns-smtp
   ./bench.sh prepare rhino-hunt
   ```
4. Run a case. `run` runs every label in `case.yaml` unless some are named,
   and builds each variant first (the first build pulls the mulder release
   image, several GB). Check the plumbing without a model first:
   ```
   ./bench.sh run pcap-dns-smtp --scripted     # before and after, no model
   ./bench.sh run pcap-dns-smtp --repeat 5     # five model runs per label
   ./bench.sh run pcap-dns-smtp after          # one label only
   MODEL_REASONING_EFFORT=none ./bench.sh run pcap-dns-smtp --repeat 5   # thinking off
   ```
   Each run lands in `results/<case>/<label>/<model>/run-<n>/`, and `run`
   ends by writing `results/<case>/summary.md` (`./bench.sh summary <case>`
   rewrites it). Settings on the command line override `.env`.

## Scoring

Expected strings per question, plus a check that the model called the tools
behind the answer. See [docs/method.md](docs/method.md#scoring).

## Layout

```
bench.sh                    prepare / build / run / summary / check, all in Docker
cases/<id>/                 case.yaml (variants, tools, setup, scripted calls, questions) + briefing.md
datasets/<id>/              where the evidence comes from and how to fetch or build it
servers/mulder/
  Dockerfile                release image + source at REF + patches + runner
  variants/<name>.env       BASE_IMAGE (by digest), REF (commit SHA), PATCHES
  patches/                  diffs applied on top of REF, e.g. to remove a feature
runner/bench/               MCP client, model client, scoring, summary
results/                    published runs, see results/README.md
docs/                       method, and how to add a case or a variant
web/                        results site (Docusaurus), built from results/
```

## Results site

`web/` is a Docusaurus site that shows `results/` as before/after
comparisons: conditions, metrics per label, per-question results, the
scripted tool output side by side, and each run turn by turn.

```
cd web && npm install && npm start    # http://localhost:3000
```

## CI

- `ci.yml`: shellcheck and ruff, and a typecheck and build of the site.
- `pages.yml`: builds the site and publishes it on GitHub Pages when `results/`,
  `cases/`, `docs/` or `web/` change on `main`.

Runs are not repeated in CI. The maintainers run them locally and commit the
results; the repository is the record. Before committing, `./bench.sh check`
reruns every case without a model (into `.check/`, not `results/`) and fails
if a score differs from the case's `scripted_expect`.

## Data

Evidence is not redistributed. Each dataset folder links its source and
checks published hashes where they exist. Answer keys are cited by URL.
Published transcripts contain tool output, which includes excerpts of the
evidence.
