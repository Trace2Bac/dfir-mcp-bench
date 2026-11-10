# dfir-mcp-bench

A record of verified changes to DFIR MCP servers: what changed, how it was
tested, and what came out.

**Results site:** https://trace2bac.github.io/dfir-mcp-bench/ ([한국어](https://trace2bac.github.io/dfir-mcp-bench/ko/))

Each *experiment* compares server versions on one test: before and after a
fix, or with and without a feature. It names the server images (upstream
commit and patches), the *case* (questions, tools and dataset) and the
*harness* that ran it, and keeps every run and a conclusion. The results are
committed so that contributions, SOLVE-IT entries and design guidelines can
cite them.

## Experiments

| Experiment | Status | Change | Result |
|---|---|---|---|
| [EXP-001](experiments/EXP-001/experiment.yaml) | done | bug fix, our PR calebevans/mulder#274: pcap dns and smtp modes request valid tshark fields | scripted 0/3 → 3/3; qwen3.5-9b 0/5 → 5/5 runs passed, 12 → 5 turns |
| [EXP-002](experiments/EXP-002/experiment.yaml) | done | baseline: `mulder investigate` (Claude Opus 4.6 / Haiku 4.5) on the full Rhino Hunt answer key | 4/7 questions, 12/22 facts (scripted ceiling 5/7); 9 of 10 missed facts need missing tool features |
| [EXP-003](experiments/EXP-003/experiment.yaml) | in progress | baseline: deleted file recovery on a NIST CFTT test image (three FAT partitions) | scripted 5/5, only with workarounds for three disk-tool problems; model runs pending |
| [EXP-004](experiments/EXP-004/experiment.yaml) | done | baseline: `mulder investigate` (Claude) on the same NIST image | 3/5 questions, 8/14 facts (scripted 5/5): run_fls skipped the small FAT12 and FAT16 partitions, and the later phase that noticed could not re-run it |
| [EXP-005](experiments/EXP-005/experiment.yaml) | done | baseline: `mulder investigate` (Claude) on the NIST Hacking Case, all 31 questions of NIST's answer key | 22/29 questions, 39/47 facts; misses include the E01 media hash, an AV scan of the compressed segments and the capture file inside the image |
| [EXP-006](experiments/EXP-006/experiment.yaml) | planned | baseline: EXP-005 with Sonnet 4.6 as planner and analyst | first run stopped before the report (API credit ran out) |
| [EXP-007](experiments/EXP-007/experiment.yaml) | planned | baseline: Claude Code (Opus 4.6) with only `mulder serve` as tools, same case and questions as EXP-005 | not run yet |
| [EXP-008](experiments/EXP-008/experiment.yaml) | planned | baseline: EXP-007 with Haiku 4.5, to see whether the cheapest model is enough for repeated runs | not run yet |

Each experiment's `conclusion` states what the results show and their limits;
`results/summary.md` has the numbers.

## Layout

```
experiments/EXP-<nnn>/      one verification (permanent ID): experiment.yaml + results/, see experiments/README.md
cases/<id>/                 a test: questions, tools, scripted calls, briefing; names its dataset
datasets/<id>/              where the evidence comes from and how to fetch or build it
servers/mulder/
  variants/<name>.env       a server version: release image by digest, commit SHA, patches
  patches/                  diffs applied on top of the commit, e.g. to remove a feature
  Dockerfile                release image + source at the commit + patches + runner
runner/bench/               the bench-runner harness: MCP client, local model client, scoring, review
docs/                       method, running and reviewing, adding a case or an experiment
web/                        the results site (Docusaurus), built from experiments/
bench.sh                    prepare / build / run / investigate / import / review / summary / check, all in Docker
```

Cases, datasets and variants are shared: several experiments can use the same
case on different variants, and each experiment brings the data its question
needs.

## Harnesses

- `bench-runner` (`runner/`): a local model through an OpenAI-compatible
  server (LM Studio) talks to `mulder serve` over MCP, or fixed scripted calls
  run without a model. `./bench.sh run` drives it.
- `mulder-investigate`: mulder's own five-phase orchestrator
  (`mulder investigate`, Claude Agent SDK). `./bench.sh investigate` writes the
  case briefing and questions to `MULDER.md`, runs it and imports the report;
  it needs `ANTHROPIC_API_KEY` for Claude models.
- `claude-code`: Claude Code runs the investigation itself with `mulder serve`
  as its only tools (built-in tools off), headless (`claude -p`). The Claude
  Code version is the one bundled in mulder's image. `./bench.sh investigate`
  runs it too, signed in to a Claude subscription with `./bench.sh login`.

## Method

A comparison counts as evidence only if the change under test is the one
difference between the two sides. A fix to what a tool returns is proven by
the scripted run; a fix to what the model reads, or the value of an existing
feature, needs repeated model runs and a person's review. See
[docs/method.md](docs/method.md).

## Quick start

1. Install Docker. It is all that scripted runs need; `mulder investigate`
   with Claude also needs `ANTHROPIC_API_KEY`, and local-model runs need LM
   Studio (step 5).
2. Prepare the evidence: `./bench.sh prepare synthetic-dns-smtp`,
   `./bench.sh prepare rhino-hunt`, `./bench.sh prepare nist-cftt-dfr` and
   `./bench.sh prepare nist-hacking-case` (about 1 GB).
3. Run without a model (no cost); the terminal shows each step as it happens:
   ```
   ./bench.sh check                      # every experiment's scripted calls against scripted_expect
   ./bench.sh run EXP-001 --scripted     # one experiment, every label
   ```
4. Run `mulder investigate` with Claude (costs money on every run):
   ```
   export ANTHROPIC_API_KEY=...          # this shell only, never in a file
   ./bench.sh investigate EXP-004 --dry-run
   ./bench.sh investigate EXP-004
   ```
5. Run with a local model: load it in LM Studio (context 32K or more), start
   its server (port 1234), `cp .env.example .env` and set `MODEL_NAME`, then
   `MODEL_REASONING_EFFORT=none ./bench.sh run EXP-001 --repeat 5`.
6. Review the answers (`./bench.sh review EXP-001`); a review counts over the
   automatic score. Before committing, run `./bench.sh check` again.

See [docs/running.md](docs/running.md) for the full procedure (including Windows and `mulder investigate`), and
[docs/adding-a-case.md](docs/adding-a-case.md) to add a case, a variant or an
experiment.

## Running on Windows

Run everything inside WSL 2: `bench.sh` is a bash script and the containers
are Linux. What else you need depends on what you run:

| Run | Needs |
|---|---|
| `./bench.sh check`, `run --scripted` (no model) | Docker |
| `./bench.sh investigate` (`mulder investigate` with Claude) | Docker and an Anthropic API key. mulder runs Claude through the Claude Agent SDK inside its image; nothing else is installed on Windows |
| `./bench.sh investigate` (harness `claude-code`) | Docker and a Claude subscription (`./bench.sh login` once) |
| `./bench.sh run` with a local model | Docker and LM Studio |

1. Install Docker Desktop (WSL 2 backend) and a WSL distribution such as
   Ubuntu, and turn on *Settings → Resources → WSL integration* for it.
2. In the WSL shell, clone the repository into the WSL file system (for
   example `~/dfir-mcp-bench`), not under `/mnt/c`, which is slow for the
   evidence images. `.gitattributes` keeps the scripts' LF line endings.
3. Prepare the evidence and check the scripted scores (no model, no cost):
   ```
   ./bench.sh prepare nist-cftt-dfr
   ./bench.sh prepare nist-hacking-case       # about 1 GB
   ./bench.sh check
   ```
4. `mulder investigate` with Claude:
   ```
   export ANTHROPIC_API_KEY=...               # this shell only, never in a file
   ./bench.sh investigate EXP-004 --dry-run   # prepares and prints the command, starts nothing
   ./bench.sh investigate EXP-004             # runs it and imports the result
   ./bench.sh investigate EXP-005             # NIST Hacking Case, 31 questions
   ./bench.sh investigate EXP-006             # same case, Sonnet 4.6 as planner and analyst
   ```
   Every run costs money (EXP-002 reported 134.5K output tokens, about $3 at
   list prices before cache tokens).

   Claude Code with a Claude subscription instead (EXP-007):
   ```
   ./bench.sh login                           # once: sign in with a Claude subscription
   ./bench.sh investigate EXP-008             # Haiku 4.5: try first, uses the least of the limits
   ./bench.sh investigate EXP-007             # Opus 4.6
   ```
   The sign-in is kept in `data/claude/` (never committed). Runs count
   toward the subscription's usage limits; a run stopped by a limit is not
   imported.
5. Only for local-model runs: start LM Studio's server on Windows (port 1234,
   context 32K or more), `cp .env.example .env` and set `MODEL_NAME`, then
   `MODEL_REASONING_EFFORT=none ./bench.sh run EXP-003 --repeat 3`. Containers
   reach LM Studio at `host.docker.internal:1234`; if they cannot, turn on
   *Serve on Local Network* in LM Studio.
6. Review the answers (`./bench.sh review EXP-004`), update the experiment's
   `status` and `conclusion`, and commit `experiments/`.

Details are in [docs/running.md](docs/running.md#running-on-windows).

## Results site

Built from `web/` and published from `main` by `.github/workflows/pages.yml`.
It shows each experiment's change, conclusion, conditions, metrics per label,
per-question results with reviews, the scripted tool output side by side, and
every run turn by turn, in English and Korean (`/ko/`).

```
cd web && npm install && npm start    # http://localhost:3000; `npm start -- --locale ko` for Korean
```

Interface text is translated in `web/i18n/ko/code.json` and the docs in
`web/i18n/ko/docusaurus-plugin-content-docs/current/`. Experiment and case text
comes from the YAML files: the plain fields (`title`, `change`, `conclusion`,
`purpose`, question `text`) are English and the default, and a `<field>_ko`
next to one is shown on the Korean site. Scoring and the questions given to
models always use the English text.

## CI

`ci.yml` runs shellcheck, ruff, and a typecheck and build of the site. Runs
are not repeated in CI: the maintainers run them locally and commit the
results, and the repository is the record.

## Data

Evidence is not redistributed. Each dataset folder links its source and
checks hashes: the published ones where they exist (Rhino Hunt), otherwise
SHA-256 values recorded at the first download (NIST CFTT DFR, NIST Hacking
Case, whose image MD5 is also checked against NIST's answer key). Answer keys are cited by URL.
Published transcripts contain tool output, which includes excerpts of the
evidence.

## License

| Material | License |
|---|---|
| Code (`bench.sh`, `runner/`, dataset scripts, `servers/`, `web/`, `.github/`) | MIT ([LICENSE](LICENSE)) |
| Experiments and results, cases, dataset descriptions, docs | CC BY 4.0 ([LICENSE-CONTENT](LICENSE-CONTENT)) |
| Evidence excerpts in tool output, and mulder's own reports and logs | their own terms |

Details are in [NOTICE.md](NOTICE.md).

## Acknowledgment

본 소스는 한국인터넷진흥원(KISA)이 주관하는 「차세대 보안리더 양성 프로그램(Best of the Best, BoB)」의 지원을 받아 수행된 결과물입니다.
Developed with support from the Best of the Best (BoB) Program administered by the Korea Internet & Security Agency (KISA).
