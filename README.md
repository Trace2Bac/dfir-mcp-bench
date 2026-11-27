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

| | Question | Server change | Runs |
|---|---|---|---|
| EXP-001 | Does mulder's pcap analysis return DNS and SMTP data after the tshark field fix? | calebevans/mulder#274 | scripted |
| EXP-002 | Does telling the agent what a tool did not check stop a wrong answer? | clamav-limit, extract-keep (patches) | Opus and Haiku, 160 |
| EXP-003 | Does a wrong progress report end an investigation early? | calebevans/mulder#270 | Opus, 100 |
| EXP-004 | Does findevil's coverage report hide a shell history its own tools do not list? | coverage-per-location (patch to findevil) | Opus, 20 |
| EXP-005 | Does trudi's lifecycle check hide an exfiltration phase that was never examined? | lifecycle-skip-fingerprints, lifecycle-archive-names (patches to trudi) | in progress |

Each experiment's change, criteria, conclusion and every run are on the
results site and in `experiments/EXP-<nnn>/`.

## Layout

```
experiments/EXP-<nnn>/      one verification: experiment.yaml + results/, see experiments/README.md
pocs/<problem>/<server>/<case-id>/  a PoC: one matrix case run on its server, no model, see pocs/README.md
checks/<problem>/           a test run the same way on every server, see checks/README.md
cases/<id>/                 a test: questions, tools, scripted calls, briefing; names its dataset
datasets/<id>/              where the evidence comes from and how it is fetched or built
servers/<server>/           mulder, findevil, trudi
  variants/<name>.env       a server version: base image by digest, commit SHA, patches
  patches/                  diffs applied on top of the commit
  patches.yaml              what each patch, or change already upstream, does
  Dockerfile                base image + source at the commit + patches + runner
runner/bench/               the bench-runner harness, the Claude Code import and the review tools
docs/                       how runs are reviewed; docs/ko/ the Korean version
web/                        the results site (Docusaurus), built from experiments/
bench.sh                    prepares data, builds variants, runs and imports, all in Docker
```

Cases, datasets and variants are shared, so several experiments can use the
same case on different variants.

## Harnesses

- `bench-runner` (`runner/`): fixed scripted tool calls with no model, or a
  local model behind an OpenAI-compatible server, both talking to the
  experiment's MCP server (mulder, findevil or trudi) over stdio.
- `claude-code`: Claude Code runs the investigation itself, headless, with
  one MCP server (`mulder serve`, findevil or trudi) as its only tools. Its
  built-in tools are off, and an experiment can limit it to a list of the
  server's tools. The Claude Code version is the one bundled in mulder's
  release image, which the findevil and trudi variants also use as their
  base.
- `mulder-investigate`: mulder's own five-phase orchestrator
  (`mulder investigate`). No current experiment uses it.

## Method

- A comparison counts as evidence only if the change under test is the one
  difference between the two sides: same base image, tools, prompt, model and
  settings. `before` is the parent commit (or the release) and `after` the
  fix or the patch.
- A fix to what a tool returns is shown by a scripted run (fixed tool calls,
  no model), checked automatically against the expected facts.
- A model's answers are judged by a reviewer, question by question, as
  mulder's own scorecards do: found, partial (related evidence, a detail
  wrong or missing), missed, or false positive (a claim the answer key or the
  evidence contradicts, stated as fact; hedged claims do not count).
  Contradicted claims outside the questions count too. Results are full
  match, detection (found or partial) and false positives over the
  questions, as the mean of the reviewed runs with the range.
- The judging rules of each experiment are written before its runs.
- When an answer can be checked against the run's own tool calls (which
  evidence a tool actually ran on), a script counts it from the record
  (`runner/bench/scan_claims.py`), and the count is compared with the
  reviews.
- Model runs vary, so a change to what the model reads is run many times on
  each label.
- Answer keys of public cases may be in a model's training data; the review
  shows which of the tools a question needs were called.

## Results site

Built from `web/` and published when a version tag (`v<YYYY-MM-DD>`) is
pushed, so each published version can be cited by its tag. It shows each experiment's
change, criteria and conclusion, the conditions of each label, metrics per
label and model, per-question results with each run's verdict, the scripted
tool output side by side, and every run turn by turn, in English and Korean.
Experiment and case text comes from the YAML files: the plain fields are
English, and a `<field>_ko` next to one is shown on the Korean site. The
questions given to models always use the English text.

## CI

`ci.yml` runs shellcheck, ruff, and a typecheck and build of the site. Runs
are not repeated in CI. The maintainers run them and commit the results, and
the repository is the record.

## Data

Evidence is not redistributed. Each dataset folder links its source and
checks hashes: the published ones where they exist, otherwise SHA-256 values
recorded at the first download (NIST CFTT DFR, NIST Hacking Case, whose image
MD5 is also checked against NIST's answer key, and the Honeynet and Loghub
logs). Answer keys are cited by URL.
Published transcripts contain tool output, which includes excerpts of the
evidence. Account details that Claude Code passes to the model are replaced
with [examiner] in imported runs.

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
