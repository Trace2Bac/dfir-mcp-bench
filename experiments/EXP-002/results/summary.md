# EXP-002

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| no-limit | claude-haiku-4-5 | mulder-1.5.10-messages-no-limits | 20 | 20/20 | 18.2 | 17.2 | 0.2 | 55.6 | success 20 |
| no-limit | claude-opus-4-6 | mulder-1.5.10-messages-no-limits | 10 | 10/10 | 9.2 | 8.2 | 0.0 | 42.2 | success 10 |
| limit | claude-haiku-4-5 | mulder-1.5.10-messages-clamav-limit | 20 | 20/20 | 21.1 | 20.1 | 0.4 | 64.7 | success 20 |
| limit | claude-opus-4-6 | mulder-1.5.10-messages-clamav-limit | 10 | 10/10 | 29.6 | 28.6 | 0.3 | 193.0 | success 10 |
| no-limit-fix | claude-haiku-4-5 | mulder-1.5.10-messages-no-limits-extract | 20 | 0/20 | 17.6 | 16.6 | 0.3 | 54.1 | success 20 |
| no-limit-fix | claude-opus-4-6 | mulder-1.5.10-messages-no-limits-extract | 20 | 20/20 | 25.6 | 24.6 | 0.0 | 116.2 | success 20 |
| limit-fix | claude-haiku-4-5 | mulder-1.5.10-messages-clamav-limit-extract | 20 | 0/20 | 28.9 | 27.9 | 0.3 | 89.0 | success 20 |
| limit-fix | claude-opus-4-6 | mulder-1.5.10-messages-clamav-limit-extract | 20 | 20/20 | 41.0 | 40.0 | 0.0 | 175.0 | success 20 |

Human review, on the scale mulder uses for its own runs: full match = found, detection = found or partial, false positives = contradicted claims stated as fact (inside or outside the questions), each over the number of questions. Mean of the reviewed runs, range in parentheses.

| label | model | reviewed runs | full match | detection | false positives |
|---|---|---|---|---|---|
| no-limit | claude-haiku-4-5 | 20 | 67% | 67% | 33% |
| no-limit | claude-opus-4-6 | 10 | 67% | 67% | 33% |
| limit | claude-haiku-4-5 | 20 | 69% (67 to 100) | 70% (67 to 100) | 25% (0 to 33) |
| limit | claude-opus-4-6 | 10 | 67% | 93% (67 to 100) | 0% |
| no-limit-fix | claude-opus-4-6 | 20 | 88% (67 to 100) | 88% (67 to 100) | 12% (0 to 33) |
| limit-fix | claude-opus-4-6 | 20 | 100% | 100% | 0% |

Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):

| label | model | Q1 | Q2 | Q3 |
|---|---|---|---|---|
| no-limit | claude-haiku-4-5 | F20 | F20 | X20 |
| no-limit | claude-opus-4-6 | F10 | F10 | X10 |
| limit | claude-haiku-4-5 | F20 | F20 | F1 P1 M3 X15 |
| limit | claude-opus-4-6 | F10 | F10 | P8 M2 |
| no-limit-fix | claude-opus-4-6 | F20 | F20 | F13 X7 |
| limit-fix | claude-opus-4-6 | F20 | F20 | F20 |
