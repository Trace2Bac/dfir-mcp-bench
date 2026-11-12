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

Experiments are in `experiments/EXP-<nnn>/`; their results, reviews and
the dated write-ups across them are on the results site.

## Layout

```
experiments/EXP-<nnn>/      one verification (permanent ID): experiment.yaml + results/, see experiments/README.md
cases/<id>/                 a test: questions, tools, scripted calls, briefing; names its dataset
datasets/<id>/              where the evidence comes from and how to fetch or build it
servers/mulder/
  variants/<name>.env       a server version: release image by digest, commit SHA, patches
  patches/                  diffs applied on top of the commit, e.g. to remove a feature
  Dockerfile                release image + source at the commit + patches + runner
runner/bench/               the bench-runner harness: MCP client, local model client, scripted checks, review
docs/                       dated write-ups across experiments, shown on the site; docs/ko/ the Korean versions
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

- A comparison counts as evidence only if the change under test is the one
  difference between the two sides: same base image, tools, prompt, model and
  settings. `before` is the parent commit (or the release) and `after` the
  fix or the patch.
- A fix to what a tool returns is proven by the scripted run (fixed tool
  calls, no model), checked automatically against the expected facts and
  `scripted_expect`.
- A model's answers are not scored by a script. A reviewer judges each
  question as mulder's own scorecards do: found, partial (related evidence,
  a detail wrong or missing), missed, or false positive (a claim the answer
  key or the evidence contradicts, stated as fact; hedged claims do not
  count). Contradicted claims outside the questions count too. Results are
  full match, detection (found or partial) and false positives over the
  questions, as the median of the reviewed runs with the range.
- Model runs vary, so a fix to what the model reads needs repeated runs
  (`--repeat N`) on both labels.
- Answer keys of public cases may be in a model's training data; the review
  shows which of the tools a question needs were called.

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
6. Judge the answers (`./bench.sh review EXP-001`): found, partial, missed or
   false positive per question; model runs are not scored automatically.
   Before committing, run `./bench.sh check` again.

To add one: a dataset in `datasets/<id>/` (source, answer key, hashes and a
fetch script, added to `bench.sh prepare`), a case in `cases/<id>/case.yaml`
(questions with `expect` and the tools they need, scripted calls, briefing),
a variant in `servers/mulder/variants/` (release image, commit, patches) and
an experiment in `experiments/EXP-<next>/experiment.yaml`
(see [experiments/README.md](experiments/README.md)). Run it with
`--scripted` first and record the scripted scores in `scripted_expect`.

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
   ./bench.sh investigate EXP-004 after --repeat 5   # one label, five runs
   ```
   Every run costs money; runs with Opus as planner and analyst cost far
   more than runs with Haiku in every role.

   Claude Code with a Claude subscription instead (an experiment with
   harness `claude-code`):
   ```
   ./bench.sh login                           # once: sign in with a Claude subscription
   ./bench.sh investigate EXP-<nnn>
   ```
   The sign-in is kept in `data/claude/` (never committed). Runs count
   toward the subscription's usage limits; a run stopped by a limit is not
   imported.
5. Only for local-model runs: start LM Studio's server on Windows (port 1234,
   context 32K or more), `cp .env.example .env` and set `MODEL_NAME`, then
   `MODEL_REASONING_EFFORT=none ./bench.sh run EXP-001 --repeat 3`. Containers
   reach LM Studio at `host.docker.internal:1234`; if they cannot, turn on
   *Serve on Local Network* in LM Studio.
6. Review the answers (`./bench.sh review EXP-004`), update the experiment's
   `status` and `conclusion`, and commit `experiments/`.


## Results site

Built from `web/` and published from `main` by `.github/workflows/pages.yml`.
It shows each experiment's change, conclusion, conditions, metrics per label,
per-question results with reviews, the scripted tool output side by side, and
every run turn by turn, in English and Korean (`/ko/`).

```
cd web && npm install && npm start    # http://localhost:3000, English only (the dev server serves one language)
npm run start:ko                      # Korean only; `npm run preview` builds and serves both
```

Interface text is translated in `web/i18n/ko/code.json`. Each document in
`docs/` has its Korean version under the same name in `docs/ko/`, which the
Korean site is built from. Experiment and case text
comes from the YAML files: the plain fields (`title`, `change`, `conclusion`,
`purpose`, question `text`) are English and the default, and a `<field>_ko`
next to one is shown on the Korean site. The questions given to models always
use the English text.

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
