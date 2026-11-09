---
title: Running and reviewing
sidebar_position: 2
---

# Running and reviewing

## Before the first run

1. Install Docker. That is all scripted runs and `mulder investigate` need;
   `mulder investigate` with Claude also needs `ANTHROPIC_API_KEY`.
2. Prepare the evidence once:
   ```
   ./bench.sh prepare synthetic-dns-smtp
   ./bench.sh prepare rhino-hunt
   ./bench.sh prepare nist-cftt-dfr
   ```
3. Only for local-model runs: install LM Studio, load the model with a context
   length of 32768 or more, start the server (Developer tab, port 1234), then
   `cp .env.example .env` and set `MODEL_NAME` (for example `qwen/qwen3.5-9b`).

## Run

You run an *experiment* (`experiments/EXP-<nnn>/`); it names the case and the
server variant for each label.

```
./bench.sh run EXP-001 --scripted                               # every label, no model
./bench.sh run EXP-001 after                                    # one model run of one label
MODEL_REASONING_EFFORT=none ./bench.sh run EXP-001 --repeat 5   # thinking off, five runs per label
```

Model runs use LM Studio (step 3 above); `--scripted` needs no model. For
experiments run by `mulder investigate`, see below.

The terminal shows each step as it happens: the model's turn, the tools it
calls, and the start of what each tool returns. mulder's own log goes to
`server-db/console.log` in the run folder. A run stops at its turn limit, then
the model is asked once more, without tools, for its answer.

Each run is saved in `experiments/EXP-<nnn>/results/<label>/<model>/run-<n>/`,
and `experiments/EXP-<nnn>/results/summary.md` is rewritten at the end.

## Review

The automatic score only checks that the expected strings appear in the
answer. Read the answers and record your verdict:

```
./bench.sh review EXP-001
```

For each unreviewed model run it shows every question, the expected facts, the
model's answer and the automatic result, and asks for pass, partial or fail
and an optional note. The verdicts are saved in the run's `review.yaml`; `q`
stops and keeps what is saved. The reviewer name comes from `REVIEWER` or
`git config user.name`. Where a review exists, it is the result that counts in
the summary and on the site.

## Running on Windows

Use WSL 2; `bench.sh` is a bash script and the containers are Linux.

| Run | Needs |
|---|---|
| `./bench.sh check`, `run --scripted` (no model) | Docker |
| `./bench.sh investigate` (`mulder investigate` with Claude) | Docker and `ANTHROPIC_API_KEY`; Claude runs through the Claude Agent SDK inside mulder's image |
| `./bench.sh run` with a local model | Docker and LM Studio |

1. Install Docker Desktop with the WSL 2 backend, and a WSL distribution
   (for example Ubuntu). In Docker Desktop, turn on *Settings → Resources →
   WSL integration* for that distribution.
2. Clone the repository inside the WSL file system (for example
   `~/dfir-mcp-bench`), not under `/mnt/c`: the evidence images are large and
   file access across the boundary is slow. `.gitattributes` keeps LF line
   endings, so the scripts run even if Windows git converts files.
3. From the WSL shell:
   ```
   ./bench.sh prepare nist-cftt-dfr
   ./bench.sh check                # scripted scores, no model
   export ANTHROPIC_API_KEY=...    # for mulder investigate with Claude
   ./bench.sh investigate EXP-004 --dry-run
   ./bench.sh investigate EXP-004
   ```
4. Only for local-model runs: run LM Studio on Windows (it uses the GPU
   there) and start its server; the containers reach it at
   `host.docker.internal:1234`. If they cannot connect, turn on *Serve on Local
   Network*. Then `cp .env.example .env`, set `MODEL_NAME`, and run
   `MODEL_REASONING_EFFORT=none ./bench.sh run EXP-003 --repeat 3`. A larger
   GPU allows a larger model; results are kept per model folder.

## Running `mulder investigate`

Experiments with `harness: mulder-investigate` (for example EXP-002, EXP-004)
run mulder's own five-phase orchestrator instead of the bench-runner. Models
and effort come from the experiment's `harness_options`.

```
export ANTHROPIC_API_KEY=...                 # in this shell only; never written to a file
./bench.sh investigate EXP-004 --dry-run     # prepare and print the command; nothing is started
./bench.sh investigate EXP-004               # run every label and import the results
```

For each label it builds the variant image, copies the case's evidence to
`data/investigate/<experiment>/<label>/`, writes the case briefing and
questions (no answers) into `MULDER.md` there, which is mulder's documented way
to give an investigation its questions, runs `mulder investigate` with the
image's own entrypoint and `--privileged`, and imports the result as
`run-1`. The import keeps the report, audit log, model usage and logs (not the
case database), scores the report against the case questions, and builds the
run list from the audit log. A run made by hand can be imported with
`./bench.sh import <experiment> <label> <mulder cases folder> <case id>`.

Each run costs money: EXP-002 used 134.5K output tokens (about $3 at list
prices for what mulder reports). mulder's counts leave out cache reads and
writes, so check the provider's usage page for the real cost.

## Look at the results and publish

```
cd web && npm start                  # http://localhost:3000, `npm start -- --locale ko` for Korean
```

Before committing new results, run `./bench.sh check` to confirm that the
scripted scores did not change. Update the experiment's `status` and
`conclusion`, then commit `experiments/`; the site is rebuilt from `main`.
