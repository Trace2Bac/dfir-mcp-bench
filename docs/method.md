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

For model runs compare the summary columns: runs passed, facts found, wrong
claims, turns, tool errors and end reasons. Report runs where the weaker side
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

## Scoring

An answer passes a question when it contains every expected string, none of
the forbidden ones, and the model called the tools the question requires
(`requires_tools`: all of them; `requires_any_tool`: at least one). The tool
check matters for public datasets whose answers may be in a model's training
data: a correct answer with no tool call behind it does not pass. Each
expected string also counts as one fact, which gives partial credit on long
answers. Each forbidden string found (`expect.none`) counts as a wrong claim.
`expect.min` asks for at least that many of the `any` strings ("list five
newsgroups"), and counts that many facts. A question marked `review_only`
(a yes/no answer, say) gets no automatic score and is left to the reviewer.

## Fixed conditions

Everything except the model runs in Docker: evidence preparation, the MCP
server and the runner. The release image is pinned by digest and each variant
by commit SHA, and every run records the server commit and image ID. The model
runs on the host; each run records the model name, temperature, token cap and
reasoning setting.
