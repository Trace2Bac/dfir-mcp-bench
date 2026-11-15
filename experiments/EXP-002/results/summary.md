# EXP-002

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| before | claude-haiku-4-5 | mulder-1.5.10-messages-no-limits | 20 | 20/20 | 18.2 | 17.2 | 0.2 | 55.6 | success 20 |
| after | claude-haiku-4-5 | mulder-1.5.10-messages-clamav-limit | 20 | 20/20 | 21.1 | 20.1 | 0.4 | 64.7 | success 20 |

Human review, on the scale mulder uses for its own runs: full match = found, detection = found or partial, false positives = contradicted claims stated as fact (inside or outside the questions), each over the number of questions. Mean of the reviewed runs, range in parentheses.

| label | model | reviewed runs | full match | detection | false positives |
|---|---|---|---|---|---|
| before | claude-haiku-4-5 | 20 | 67% | 67% | 33% |
| after | claude-haiku-4-5 | 20 | 69% (67 to 100) | 70% (67 to 100) | 25% (0 to 33) |

Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):

| label | model | Q1 | Q2 | Q3 |
|---|---|---|---|---|
| before | claude-haiku-4-5 | F20 | F20 | X20 |
| after | claude-haiku-4-5 | F20 | F20 | F1 P1 M3 X15 |
