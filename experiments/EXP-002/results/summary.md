# EXP-002

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| no-limit | claude-haiku-4-5 | mulder-1.5.10-no-limit | 20 | 20/20 | 16.3 | 15.3 | 0.2 | 51.6 | success 20 |
| no-limit | claude-opus-4-6 | mulder-1.5.10-no-limit | 20 | 20/20 | 9.0 | 8.0 | 0.0 | 40.2 | success 20 |
| limit | claude-haiku-4-5 | mulder-1.5.10-limit | 20 | 20/20 | 22.4 | 21.4 | 0.4 | 76.8 | success 20 |
| limit | claude-opus-4-6 | mulder-1.5.10-limit | 20 | 20/20 | 30.2 | 29.2 | 0.1 | 194.1 | success 20 |
| no-limit-fix | claude-haiku-4-5 | mulder-1.5.10-no-limit-fix | 20 | 20/20 | 18.7 | 17.7 | 0.4 | 63.1 | success 20 |
| no-limit-fix | claude-opus-4-6 | mulder-1.5.10-no-limit-fix | 20 | 20/20 | 24.1 | 23.1 | 0.0 | 114.0 | success 20 |
| limit-fix | claude-haiku-4-5 | mulder-1.5.10-limit-fix | 20 | 20/20 | 26.7 | 25.7 | 0.5 | 91.1 | success 20 |
| limit-fix | claude-opus-4-6 | mulder-1.5.10-limit-fix | 20 | 20/20 | 39.6 | 38.6 | 0.0 | 168.7 | success 20 |

Human review, on the scale mulder uses for its own runs: full match = found, detection = found or partial, false positives = contradicted claims stated as fact (inside or outside the questions), each over the number of questions. Mean of the reviewed runs, range in parentheses.

| label | model | reviewed runs | full match | detection | false positives |
|---|---|---|---|---|---|
| no-limit | claude-haiku-4-5 | 20 | 67% | 67% | 30% (0 to 33) |
| no-limit | claude-opus-4-6 | 20 | 67% | 67% | 33% |
| limit | claude-haiku-4-5 | 20 | 67% | 69% (67 to 100) | 18% (0 to 33) |
| limit | claude-opus-4-6 | 20 | 74% (67 to 100) | 90% (67 to 100) | 7% (0 to 33) |
| no-limit-fix | claude-haiku-4-5 | 20 | 67% | 67% | 31% (0 to 33) |
| no-limit-fix | claude-opus-4-6 | 20 | 88% (67 to 100) | 88% (67 to 100) | 12% (0 to 33) |
| limit-fix | claude-haiku-4-5 | 20 | 85% (67 to 100) | 85% (67 to 100) | 10% (0 to 33) |
| limit-fix | claude-opus-4-6 | 20 | 100% | 100% | 0% |

Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):

| label | model | Q1 | Q2 | Q3 |
|---|---|---|---|---|
| no-limit | claude-haiku-4-5 | F20 | F20 | M2 X18 |
| no-limit | claude-opus-4-6 | F20 | F20 | X20 |
| limit | claude-haiku-4-5 | F20 | F20 | P1 M8 X11 |
| limit | claude-opus-4-6 | F20 | F20 | F4 P10 M2 X4 |
| no-limit-fix | claude-haiku-4-5 | F20 | F20 | M1 X19 |
| no-limit-fix | claude-opus-4-6 | F20 | F20 | F13 X7 |
| limit-fix | claude-haiku-4-5 | F20 | F20 | F11 M3 X6 |
| limit-fix | claude-opus-4-6 | F20 | F20 | F20 |
