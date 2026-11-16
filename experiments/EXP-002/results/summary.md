# EXP-002

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| no-limit | claude-haiku-4-5 | mulder-1.5.10-no-limit | 10 | 0/10 | 16.7 | 15.7 | 0.2 | 48.0 | success 10 |
| limit | claude-haiku-4-5 | mulder-1.5.10-limit | 10 | 0/10 | 24.1 | 23.1 | 0.2 | 71.2 | success 10 |
| no-limit-fix | claude-haiku-4-5 | mulder-1.5.10-no-limit-fix | 10 | 0/10 | 18.4 | 17.4 | 0.3 | 68.8 | success 10 |
| limit-fix | claude-haiku-4-5 | mulder-1.5.10-limit-fix | 10 | 0/10 | 23.4 | 22.4 | 0.4 | 80.0 | success 10 |

No run has been reviewed yet (`./bench.sh review`).
