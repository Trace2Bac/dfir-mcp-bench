# EXP-004

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| before | claude-haiku-4-5 | mulder-1.5.10-messages-no-limits | 5 | 5/5 | 7.6 | 6.6 | 0.0 | 29.9 | success 5 |
| after | claude-haiku-4-5 | mulder-1.5.10-messages-clamav-limit | 5 | 5/5 | 18.2 | 17.2 | 0.6 | 68.0 | success 5 |

Human review, on the scale mulder uses for its own runs: full match = found, detection = found or partial, false positives = contradicted claims stated as fact (inside or outside the questions), each over the number of questions. Median of the reviewed runs, range in parentheses.

| label | model | reviewed runs | full match | detection | false positives |
|---|---|---|---|---|---|
| before | claude-haiku-4-5 | 5 | 0% | 0% | 100% |
| after | claude-haiku-4-5 | 5 | 0% | 0% | 0% (0 to 100) |

Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):

| label | model | Q1 |
|---|---|---|
| before | claude-haiku-4-5 | X5 |
| after | claude-haiku-4-5 | M4 X1 |
