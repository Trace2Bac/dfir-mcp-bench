---
title: Findings so far
sidebar_position: 0
---

# Findings so far

What the experiments show as of November 2026, and how far each result can
be trusted. Every number links to an experiment with its runs, logs and
answer key.

## Results

| Experiment | Case | Harness | Score | Ceiling (scripted) |
|---|---|---|---|---|
| [EXP-001](../experiments/EXP-001) | synthetic DNS/SMTP capture | bench-runner, qwen3.5-9b | 0/5 runs passed before PR #274, 5/5 after | 0/3 before, 3/3 after |
| [EXP-002](../experiments/EXP-002) | Rhino Hunt (DFRWS 2005) | `mulder investigate`, Opus 4.6 | 4/7 questions, 12/22 facts | 5/7, 15/22 |
| [EXP-003](../experiments/EXP-003) | NIST CFTT `dfr-01-fat` | scripted only so far | - | 5/5, 14/14 (with workarounds) |
| [EXP-004](../experiments/EXP-004) | NIST CFTT `dfr-01-fat` | `mulder investigate`, Opus 4.6 | 3/5 questions, 8/14 facts | 5/5, 14/14 |
| [EXP-005](../experiments/EXP-005) | NIST Hacking Case, 31 questions | `mulder investigate`, Opus 4.6 | 22/29 questions, 39/47 facts (+1 of 2 on review) | - |
| [EXP-006](../experiments/EXP-006) | NIST Hacking Case, 31 questions | `mulder investigate`, Sonnet 4.6 | no report: the report phase kept searching and never finalized | - |
| [EXP-007](../experiments/EXP-007) | NIST Hacking Case, 31 questions | Claude Code with `mulder serve`, Opus 4.6 | planned | - |
| [EXP-008](../experiments/EXP-008) | NIST Hacking Case, 31 questions | Claude Code with `mulder serve`, Haiku 4.5 | 7/29 questions, 13/47 facts (stopped after 3 minutes) | - |
| [EXP-009](../experiments/EXP-009) | NIST Hacking Case, 31 questions | `mulder investigate`, Haiku 4.5 in every role | 7/29 questions, 14/47 facts | - |

The `mulder investigate` runs with Opus cost about $1.5 to $3 each at list
prices, counting the tokens mulder reports (cache reads and writes are not
included), and took 25 to 36 minutes.

## What the runs show

- **Where mulder has the tools, Claude answers.** On the Hacking Case it got
  nearly every registry, account, e-mail, IRC and program question right.
- **With Opus, most misses trace to the tools.** In EXP-002, 9 of the 10
  facts missed need features mulder lacks (carved files are deleted after
  listing). In EXP-004, `run_fls` did not index the small FAT12 and FAT16
  partitions. In EXP-005, the media hash stored in the E01 was never read,
  the capture file inside the image was not found because it has no
  extension, and the antivirus scan ran on the compressed E01 segments.
- **Some gaps are seen but cannot be closed.** In EXP-004 the
  alternative-narrative phase noticed the unread partitions, but its
  executor may not call the extraction tools.
- **Some misses are the model's.** In EXP-005, four answers differ from
  NIST's key where the evidence was available (Q4, Q7, Q16, Q30), and the
  report claimed a hash match it never checked.
- **Sonnet did not finish.** With Sonnet as planner and analyst the report
  phase searched for the case questions through 12 sessions and never
  wrote the report (EXP-006), so 50 minutes of work left no report. Opus is
  the setting for repeated runs on this case.
- **Haiku alone is not enough.** With Haiku in every role, mulder's
  orchestrator made it call four times as many tools as Claude Code did
  (EXP-009 against EXP-008), but both scored 7/29: the model, not the
  harness, limits the answers.
- **A weak model needs a strong harness.** The 9B local model handled a
  narrow fix case well (EXP-001) but not a full investigation.

## Choosing a case

The NIST Hacking Case (EXP-005) is the default for whole-investigation
comparisons: NIST wrote the answer key, it has 31 questions, it covers many
evidence types and a run costs about $2. The other cases are kept for one
purpose each: `dfr-01-fat` for partition handling, Rhino Hunt for carving,
the synthetic capture for PR #274.

The model for repeated runs on it is chosen in
[Notes: which model to use for the NIST Hacking Case](notes/2026-11-10-model-choice):
Opus 4.6 as planner and analyst, Haiku 4.5 as executor.

## Limits

- **Single runs.** Each Claude result is one run. Model runs vary, so a
  difference between labels counts only when it is larger than the spread
  of repeated runs (at least three per label). Scripted runs are
  deterministic and need one.
- **Public answer keys.** The answers to every trusted public case are on
  the web and may be in a model's training data. This weighs less on a
  before/after comparison, since both labels use the same model, and
  scripted runs use no model at all. The scoring also requires the tools a
  question depends on. The runs so far do not look memorised: EXP-005
  missed well-known answers (Q24, Q25) when the tool did not reach the
  evidence. A run with the questions and no evidence would show directly
  which answers a model knows already.
- **Scoring changed after runs, twice.** Whole-number matching and
  per-question scoring were added after EXP-005's run, which lowered its
  score from 26/29 to 22/29. A line answering a range ("Case Q28-Q30") was
  read as covering each question after EXP-009's run, which lowered its
  score from 8/29 to 7/29. Every run was re-scored each time; no score went
  up. The scoring is to be fixed before the next runs.
- **String matching.** The automatic score checks for expected strings. The
  answers have not been reviewed by a person yet (`./bench.sh review`).
- **One model family.** All `mulder investigate` runs use Claude (Opus,
  Sonnet, Haiku). EXP-007 and EXP-008 run Claude Code on mulder's MCP tools
  without the orchestrator; it is a different harness, so their scores
  compare with the `mulder investigate` runs only as the orchestrator's
  effect.
