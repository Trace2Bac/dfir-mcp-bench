---
title: Which model to use for the NIST Hacking Case
---

# Which model to use for the NIST Hacking Case

*2026-11-10. Experiments EXP-005, EXP-006, EXP-008, EXP-009.*

Repeated before/after runs need a setting that is cheap enough to run
several times and strong enough to reach the tools a change touches. Four
settings were run once each on the same case (31 questions of NIST's
answer key), the same mulder 1.5.10 and the same briefing.

## Results

| Experiment | Harness | Models | Result | Time | Tool calls |
|---|---|---|---|---|---|
| [EXP-005](../experiments/EXP-005) | `mulder investigate` | Opus 4.6 (planner, analyst), Haiku 4.5 (executor) | 22/29 questions, 39/47 facts | 36 min | 270 |
| [EXP-006](../experiments/EXP-006) | `mulder investigate` | Sonnet 4.6 (planner, analyst), Haiku 4.5 (executor) | no report | 50 min | 881 |
| [EXP-009](../experiments/EXP-009) | `mulder investigate` | Haiku 4.5 in every role | 7/29 questions, 14/47 facts | 14 min | 214 |
| [EXP-008](../experiments/EXP-008) | Claude Code with `mulder serve` | Haiku 4.5 | 7/29 questions, 13/47 facts | 3 min | 58 |

## What limits the score

**The model, most of all.** Case, tools and questions were the same; only
the model changed.

- Haiku calls the tools but does not get the answers out of their output.
  In EXP-009, 15 answers say the evidence did not show it, where Opus found
  it in the registry and the application settings.
- Sonnet investigated thoroughly but did not finish. Its report phase
  searched for the case questions through 12 sessions (586 tool calls) and
  never wrote the report.
- The orchestrator did not change Haiku's score: it made Haiku call almost
  four times as many tools as Claude Code did (214 against 58), and both
  scored 7/29.

**The tools, for some questions.** Four of the seven questions Opus missed
need something mulder does not do:

- Q1: the media hash stored in the E01 is never read.
- Q24, Q25: the capture file inside the image has no extension, so
  `analyze_disk_pcaps` does not find it. With Haiku the tool still reported
  "ok", and the report concluded Ethereal had not been used.
- Q31: `run_clamav` scans the E01 container, not the files inside it.

**The orchestrator, when the model is weaker.** If the report phase never
finalizes, the whole investigation ends without a report (EXP-006).

## Decision

- Repeated runs on this case use the EXP-005 setting (Opus 4.6 as planner
  and analyst, Haiku 4.5 as executor). It is the only one of the four that
  answered most questions.
- Changes to the tools above are verified with that setting, before and
  after, at least three runs each.

## Limits

- One run per setting; the spread between runs is not known yet.
- The scripted ceiling of this case (what the tools reach without a model)
  has not been measured, so tool limits and model limits are separated by
  reading the answers, not by a measurement.
