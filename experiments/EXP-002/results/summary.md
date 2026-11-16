# EXP-002

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| no-limit | claude-haiku-4-5 | mulder-1.5.10-no-limit | 10 | 10/10 | 16.7 | 15.7 | 0.2 | 48.0 | success 10 |
| no-limit | claude-opus-4-6 | mulder-1.5.10-no-limit | 10 | 10/10 | 9.0 | 8.0 | 0.0 | 41.6 | success 10 |
| limit | claude-haiku-4-5 | mulder-1.5.10-limit | 10 | 0/10 | 20.6 | 19.6 | 0.5 | 69.8 | success 10 |
| no-limit-fix | claude-haiku-4-5 | mulder-1.5.10-no-limit-fix | 10 | 10/10 | 18.4 | 17.4 | 0.3 | 68.8 | success 10 |
| no-limit-fix | claude-opus-4-6 | mulder-1.5.10-no-limit-fix | 10 | 10/10 | 23.5 | 22.5 | 0.0 | 114.8 | success 10 |
| limit-fix | claude-haiku-4-5 | mulder-1.5.10-limit-fix | 10 | 0/10 | 27.9 | 26.9 | 0.3 | 89.1 | success 10 |

Human review, on the scale mulder uses for its own runs: full match = found, detection = found or partial, false positives = contradicted claims stated as fact (inside or outside the questions), each over the number of questions. Mean of the reviewed runs, range in parentheses.

| label | model | reviewed runs | full match | detection | false positives |
|---|---|---|---|---|---|
| no-limit | claude-haiku-4-5 | 10 | 67% | 67% | 30% (0 to 33) |
| no-limit | claude-opus-4-6 | 10 | 67% | 67% | 33% |
| no-limit-fix | claude-haiku-4-5 | 10 | 67% | 67% | 30% (0 to 33) |
| no-limit-fix | claude-opus-4-6 | 10 | 90% (67 to 100) | 90% (67 to 100) | 10% (0 to 33) |

Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):

| label | model | Q1 | Q2 | Q3 |
|---|---|---|---|---|
| no-limit | claude-haiku-4-5 | F10 | F10 | M1 X9 |
| no-limit | claude-opus-4-6 | F10 | F10 | X10 |
| no-limit-fix | claude-haiku-4-5 | F10 | F10 | M1 X9 |
| no-limit-fix | claude-opus-4-6 | F10 | F10 | F7 X3 |
