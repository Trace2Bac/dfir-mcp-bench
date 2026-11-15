# EXP-003

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| before | claude-haiku-4-5 | mulder-1.5.10-messages-carry-no-limits | 5 | 5/5 | 136.6 | 152.6 | - | 1607.6 | report 5 |
| after | claude-haiku-4-5 | mulder-1.5.10-messages-carry-clamav-limit | 5 | 5/5 | 130.4 | 148.8 | - | 781.0 | report 5 |
| after-partial | claude-haiku-4-5 | mulder-1.5.10-messages-carry-clamav-partial | 5 | 5/5 | 121.8 | 137.8 | - | 729.4 | report 5 |

Human review, on the scale mulder uses for its own runs: full match = found, detection = found or partial, false positives = contradicted claims stated as fact (inside or outside the questions), each over the number of questions. Mean of the reviewed runs, range in parentheses.

| label | model | reviewed runs | full match | detection | false positives |
|---|---|---|---|---|---|
| before | claude-haiku-4-5 | 5 | 0% | 0% | 100% |
| after | claude-haiku-4-5 | 5 | 0% | 0% | 60% (0 to 100) |
| after-partial | claude-haiku-4-5 | 5 | 20% (0 to 100) | 20% (0 to 100) | 40% (0 to 100) |

Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):

| label | model | Q1 |
|---|---|---|
| before | claude-haiku-4-5 | X5 |
| after | claude-haiku-4-5 | M2 X3 |
| after-partial | claude-haiku-4-5 | F1 M2 X2 |
