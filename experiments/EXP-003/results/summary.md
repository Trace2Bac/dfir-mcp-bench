# EXP-003

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| before | claude-opus-4-6 | mulder-1.5.10-messages-no-limits | 10 | 10/10 | 9.2 | 8.2 | 0.0 | 42.2 | success 10 |
| after | claude-opus-4-6 | mulder-1.5.10-messages-clamav-limit | 10 | 10/10 | 29.6 | 28.6 | 0.3 | 193.0 | success 10 |
| after-extract | claude-opus-4-6 | mulder-1.5.10-messages-clamav-limit-extract | 20 | 20/20 | 41.0 | 40.0 | 0.0 | 175.0 | success 20 |
| before-extract | claude-opus-4-6 | mulder-1.5.10-messages-no-limits-extract | 20 | 20/20 | 25.6 | 24.6 | 0.0 | 116.2 | success 20 |

Human review, on the scale mulder uses for its own runs: full match = found, detection = found or partial, false positives = contradicted claims stated as fact (inside or outside the questions), each over the number of questions. Mean of the reviewed runs, range in parentheses.

| label | model | reviewed runs | full match | detection | false positives |
|---|---|---|---|---|---|
| before | claude-opus-4-6 | 10 | 67% | 67% | 33% |
| after | claude-opus-4-6 | 10 | 67% | 93% (67 to 100) | 0% |
| after-extract | claude-opus-4-6 | 20 | 100% | 100% | 0% |
| before-extract | claude-opus-4-6 | 20 | 88% (67 to 100) | 88% (67 to 100) | 12% (0 to 33) |

Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):

| label | model | Q1 | Q2 | Q3 |
|---|---|---|---|---|
| before | claude-opus-4-6 | F10 | F10 | X10 |
| after | claude-opus-4-6 | F10 | F10 | P8 M2 |
| after-extract | claude-opus-4-6 | F20 | F20 | F20 |
| before-extract | claude-opus-4-6 | F20 | F20 | F13 X7 |
