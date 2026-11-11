---
title: How much does the model affect the test results?
---

# How much does the model affect the test results?

A local model was not strong enough to run the NIST Hacking Case (31
questions of NIST's answer key), so we looked for a model cheap enough to run
many times that still reasons well and reaches the answers.

## Results

| Experiment | Harness | Models | Result | Time | Tool calls |
|---|---|---|---|---|---|
| [EXP-005](../experiments/EXP-005) | `mulder investigate` | Opus 4.6 (planner, analyst), Haiku 4.5 (executor) | 22/29 questions, 39/47 facts | 36 min | 270 |
| [EXP-006](../experiments/EXP-006) | `mulder investigate` | Sonnet 4.6 (planner, analyst), Haiku 4.5 (executor) | failed in the report phase | 50 min | 881 |
| [EXP-009](../experiments/EXP-009) | `mulder investigate` | Haiku 4.5 in every role | 7/29 questions, 14/47 facts | 14 min | 214 |
| [EXP-008](../experiments/EXP-008) | Claude Code with only mulder MCP | Haiku 4.5 | 7/29 questions, 13/47 facts | 3 min | 58 |

## What affects the score most

With the same case, tools and questions, the model makes a large difference.

- Haiku calls the tools well but does not get the answers out of their
  output. In EXP-009, 15 answers say the evidence did not show it, where
  Opus found the same facts in the registry and the program settings.
- Sonnet investigated well but did not finish. In the report phase it kept
  searching for the answers to the questions through 12 sessions (586 tool
  calls) and never wrote the report.
- The orchestrator (investigate) did not change Haiku's score. It made Haiku
  call almost four times as many tools as Claude Code without the
  orchestrator did (214 against 58), and both scored 7/29.

Some questions could not be answered with the tools mulder provides; four of
the seven questions Opus missed are among them.

- Q1: the media hash stored inside the E01 is not read.
- Q24, Q25: the capture file inside the image has no extension, so
  `analyze_disk_pcaps` does not find it. In the Haiku runs the tool still
  returned "ok", and the report concluded that Ethereal had not been used.
- Q31: `run_clamav` scans the E01 file itself as a single file and does not open
  the file system inside it. ClamAV cannot read the E01 format, so the result
  is "OK", and the model took it as "no viruses".
