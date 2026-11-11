# EXP-002

Scripted runs (fixed tool calls, no model): the expected facts found in what the tools returned.

| label | variant | questions | facts | tool calls | tool errors |
|---|---|---|---|---|---|
| before | mulder-1.5.10 | 5/7 | 15/22 | 14 | 0 |

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| before | claude-opus-4-6 | mulder-1.5.10 | 1 | 1/1 | 306.0 | 383.0 | - | 2107.0 | report 1 |

Human review, on the scale mulder uses for its own runs: full match = found, detection = found or partial, false positives = contradicted claims stated as fact (inside or outside the questions), each over the number of questions. Median of the reviewed runs, range in parentheses.

| label | model | reviewed runs | full match | detection | false positives |
|---|---|---|---|---|---|
| before | claude-opus-4-6 | 1 | 57% | 100% | 0% |

Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):

| label | model | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 |
|---|---|---|---|---|---|---|---|---|
| before | claude-opus-4-6 | F1 | F1 | P1 | F1 | F1 | P1 | P1 |
