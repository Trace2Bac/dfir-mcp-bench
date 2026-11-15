# EXP-002

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| before | claude-haiku-4-5 | mulder-1.5.10-messages-no-limits | 10 | 10/10 | 12.6 | 11.6 | 0.0 | 38.1 | success 10 |
| after | claude-haiku-4-5 | mulder-1.5.10-messages-clamav-limit | 10 | 10/10 | 20.3 | 19.3 | 0.5 | 74.6 | success 10 |
| after-partial | claude-haiku-4-5 | mulder-1.5.10-messages-clamav-partial | 10 | 10/10 | 21.0 | 20.0 | 1.5 | 81.8 | success 10 |

Human review, on the scale mulder uses for its own runs: full match = found, detection = found or partial, false positives = contradicted claims stated as fact (inside or outside the questions), each over the number of questions. Mean of the reviewed runs, range in parentheses.

| label | model | reviewed runs | full match | detection | false positives |
|---|---|---|---|---|---|
| before | claude-haiku-4-5 | 10 | 0% | 0% | 100% |
| after | claude-haiku-4-5 | 10 | 0% | 0% | 30% (0 to 100) |
| after-partial | claude-haiku-4-5 | 10 | 0% | 20% (0 to 100) | 40% (0 to 100) |

Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):

| label | model | Q1 |
|---|---|---|
| before | claude-haiku-4-5 | X10 |
| after | claude-haiku-4-5 | M7 X3 |
| after-partial | claude-haiku-4-5 | P2 M4 X4 |
