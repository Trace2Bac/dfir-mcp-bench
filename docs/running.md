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
   ./bench.sh prepare nist-hacking-case      # about 1 GB
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

A model's answers are not scored automatically. Read them and record your
verdict:

```
./bench.sh review EXP-001
```

For each unreviewed model run it shows every question, the expected facts, the
model's answer and which of the tools the question needs were called, and
asks for a verdict and an
optional note. The verdicts are those of mulder's own scorecards
(`examples/*/ACCURACY-REPORT.md` in the mulder repository):

| Key | Verdict | When |
|---|---|---|
| `f` | found | the answer matches the answer key |
| `p` | partial | related evidence found, but a detail is wrong (a date, a time zone, a device) or it is stated without evidence |
| `m` | missed | no answer, or the answer says the evidence does not show it |
| `x` | false positive | a claim the answer key contradicts, or a cause the evidence does not support, stated as fact |

A claim hedged as such ("consistent with", "possibly") is not a false
positive. After the questions it asks for claims of that kind outside the
questions, quoted from the answer; they count as false positives too. The
summary and the site then show, as mulder does, full match (found),
detection (found or partial) and false positives, each over the number of
questions, as the median of the reviewed runs with the range.

The verdicts are saved in the run's `review.yaml`; `q` stops and keeps what
is saved. The reviewer name comes from `REVIEWER` or
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
   ./bench.sh prepare nist-hacking-case
   ./bench.sh check                # scripted scores, no model
   export ANTHROPIC_API_KEY=...    # for mulder investigate with Claude
   ./bench.sh investigate EXP-004 --dry-run
   ./bench.sh investigate EXP-004
   ./bench.sh investigate EXP-005   # NIST Hacking Case
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
case database) and builds the run list from the audit log; the report is
then judged with `./bench.sh review`. mulder's report has its own fixed questions
(Q1 to Q8); with `answer_section: true` in `harness_options` the briefing
labels the case questions `Case Q<n>` and asks for a "Case Questions" section
with one answer line each, which `review` shows per question. The
briefing used is kept with the run (`mulder/MULDER.md`). A run made by hand can be imported with
`./bench.sh import <experiment> <label> <mulder cases folder> <case id>`.

Each run costs money: EXP-002 used 134.5K output tokens (about $3 at list
prices for what mulder reports). mulder's counts leave out cache reads and
writes, so check the provider's usage page for the real cost.

## Running Claude Code with mulder's tools

Experiments with `harness: claude-code` (EXP-007) run the same command.
Claude Code, as bundled in mulder's image, runs headless (`claude -p`) with
`mulder serve` as its only MCP server and its built-in tools turned off, so
it reaches the evidence only through mulder. It is given one prompt: create
the case with `scan_evidence`, then the same briefing and `Case Q<n>`
questions that `MULDER.md` carries. Model and effort come from
`harness_options` (`model`, `effort`).

```
./bench.sh login                             # once: sign in with a Claude subscription
./bench.sh investigate EXP-007 --dry-run     # writes claude/prompt.md and claude/mcp.json; nothing is started
./bench.sh investigate EXP-007
```

The terminal shows one line per tool call. The raw stream-json output is kept
with the run (`claude/stream.jsonl`) next to the prompt; the import keeps the
final message as the answer and lists every mulder call with its result in
`transcript.jsonl`. Claude Code's token counts include cache reads
and writes, and `api_cost_usd` in `run.json` is what they would cost on the
API; a subscription is not billed per run but counts toward its usage
limits. A run that ends in an error (a sign-in that expired, a usage limit)
is not imported.

`./bench.sh login` runs Claude Code's own sign-in (`claude auth login`) in the
image; it prints a URL to open in a browser and asks for the code shown
there. The sign-in is kept in `data/claude/` (git-ignored, like all of
`data/`) and reused by every run. A token from `claude setup-token` in
`CLAUDE_CODE_OAUTH_TOKEN` works instead.

## Look at the results and publish

```
cd web && npm start                  # http://localhost:3000, English only (the dev server serves one language)
npm run start:ko                     # Korean only; /ko/ gives 404 under npm start
npm run preview                      # builds and serves both languages, as on GitHub Pages
```

Before committing new results, run `./bench.sh check` to confirm that the
scripted scores did not change. Update the experiment's `status` and
`conclusion`, then commit `experiments/`; the site is rebuilt from `main`.
