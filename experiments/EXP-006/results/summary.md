# EXP-006

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| before | claude-opus-4-6 | mulder-b922c36 | 15 | 15/15 | 9.1 | 8.1 | 0.0 | 82.3 | success 15 |
| after | claude-opus-4-6 | mulder-54d76c8 | 30 | 10/30 | 10.0 | 9.0 | 0.0 | 76.2 | success 30 |

Human review, on the scale mulder uses for its own runs: full match = found, detection = found or partial, false positives = contradicted claims stated as fact (inside or outside the questions), each over the number of questions. Mean of the reviewed runs, range in parentheses.

| label | model | reviewed runs | full match | detection | false positives |
|---|---|---|---|---|---|
| before | claude-opus-4-6 | 15 | 80% (0 to 100) | 80% (0 to 100) | 20% (0 to 100) |
| after | claude-opus-4-6 | 10 | 100% | 100% | 0% |

Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):

| label | model | Q1 |
|---|---|---|
| before | claude-opus-4-6 | F12 X3 |
| after | claude-opus-4-6 | F10 |
