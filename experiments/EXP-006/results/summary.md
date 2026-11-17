# EXP-006

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| before | claude-opus-4-6 | mulder-b922c36 | 30 | 30/30 | 9.4 | 8.4 | 0.0 | 85.2 | success 30 |
| after | claude-opus-4-6 | mulder-54d76c8 | 30 | 30/30 | 10.0 | 9.0 | 0.0 | 76.2 | success 30 |

Human review, on the scale mulder uses for its own runs: full match = found, detection = found or partial, false positives = contradicted claims stated as fact (inside or outside the questions), each over the number of questions. Mean of the reviewed runs, range in parentheses.

| label | model | reviewed runs | full match | detection | false positives |
|---|---|---|---|---|---|
| before | claude-opus-4-6 | 30 | 87% (0 to 100) | 87% (0 to 100) | 13% (0 to 100) |
| after | claude-opus-4-6 | 30 | 100% | 100% | 0% |

Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):

| label | model | Q1 |
|---|---|---|
| before | claude-opus-4-6 | F26 X4 |
| after | claude-opus-4-6 | F30 |
