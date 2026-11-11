---
title: Method
sidebar_position: 1
---

# Method

A comparison is evidence only if the change under test is the one
difference: same base image, tools, prompt, model and settings on both
sides. Both sides see the same tools, including any way around the problem;
removing a workaround would inflate the difference.

| Change | Labels | What proves it |
|---|---|---|
| Fix to what a tool returns | `before` = parent commit, `after` = fix commit | The scripted run (same calls, no model). Model runs show how much it matters to an agent. |
| Fix to what the model reads (descriptions, response fields, error text, hints) | as above | Model runs only, repeated (at least five per label; output varies even at temperature 0). |
| Value of an existing feature | `full` and `without-<feature>`, on one commit | Model runs on an investigation case with a full answer key. The feature must be on the path to some answers; alternative paths stay open. |

For model runs compare the reviewed results (full match, detection, false
positives) and the summary columns: turns, tool errors and end reasons. Report runs where the weaker side
still passes; they show the cost in turns and time rather than in the answer.
State the scope: one dataset and one model unless more were run.

Two kinds of case support this. A *fix case* asks only what one fix changes
(`pcap-dns-smtp`, used by EXP-001). An *investigation case*
asks the whole answer key of a public dataset and gives the tools for every
evidence type in it (`rhino-hunt`).

The harness matters as much as the model. A 9B local model through the
bench-runner handled a fix case well (EXP-001) but found none of the Rhino
Hunt answers in an exploratory run that is not kept as an experiment, while
`mulder investigate` with Claude reached 4/7 (EXP-002, scripted ceiling 5/7).
Investigation cases need a stronger model or another harness. Whatever runs, it must be the same on every label.

## Judging the answers

A model's answers are judged by a reviewer, not scored by a script: the
reviewer reads each answer against the answer key and gives one verdict per
question on the four-level scale of mulder's own scorecards (found, partial,
missed, false positive; see [Running and reviewing](running#review)). Claims
outside the questions that the key or the evidence contradicts, stated as
fact, are recorded too. The results are full match, detection and false
positives over the questions, as the median of the reviewed runs with the
range. A right answer with no tool call behind it may be recalled rather than
found, since the answer keys are public; the review shows which of the tools
a question needs were called.

Scripted runs (fixed tool calls, no model) are checked automatically: a
question counts when the tool output holds every expected string of it
(`expect.all`, at least `expect.min` of `expect.any`; a bare number must
appear as a whole number). Each expected string is one fact.
`./bench.sh check` compares these counts with the experiment's
`scripted_expect`.

A `mulder investigate` report is read per question on its `Case Q<n>:` line
when the experiment asks for one (a line for a range, such as
`Case Q28-Q30:`, answers each question in it).

## Fixed conditions

Everything except the model runs in Docker: evidence preparation, the MCP
server and the runner. The release image is pinned by digest and each variant
by commit SHA, and every run records the server commit and image ID. The model
runs on the host; each run records the model name, temperature, token cap and
reasoning setting.
