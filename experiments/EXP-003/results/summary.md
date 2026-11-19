# EXP-003

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| before | claude-opus-4-6 | mulder-b922c36 | 50 | 50/50 | 9.4 | 8.4 | 0.0 | 87.2 | success 50 |
| after | claude-opus-4-6 | mulder-54d76c8 | 50 | 50/50 | 10.0 | 9.0 | 0.0 | 79.8 | success 50 |

Human review, on the scale mulder uses for its own runs: full match = found, detection = found or partial, false positives = contradicted claims stated as fact (inside or outside the questions), each over the number of questions. Mean of the reviewed runs, range in parentheses.

| label | model | reviewed runs | full match | detection | false positives |
|---|---|---|---|---|---|
| before | claude-opus-4-6 | 50 | 88% (0 to 100) | 88% (0 to 100) | 12% (0 to 100) |
| after | claude-opus-4-6 | 50 | 100% | 100% | 0% |

Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):

| label | model | Q1 |
|---|---|---|
| before | claude-opus-4-6 | F44 X6 |
| after | claude-opus-4-6 | F50 |
