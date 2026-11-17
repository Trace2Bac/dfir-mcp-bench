# EXP-007

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| before | claude-opus-4-6 | mulder-b922c36 | 5 | 5/5 | 10.8 | 9.8 | 0.0 | 84.0 | success 5 |
| after | claude-opus-4-6 | mulder-54d76c8 | 5 | 5/5 | 12.8 | 11.8 | 0.0 | 80.1 | success 5 |

Human review, on the scale mulder uses for its own runs: full match = found, detection = found or partial, false positives = contradicted claims stated as fact (inside or outside the questions), each over the number of questions. Mean of the reviewed runs, range in parentheses.

| label | model | reviewed runs | full match | detection | false positives |
|---|---|---|---|---|---|
| before | claude-opus-4-6 | 5 | 100% | 100% | 0% |
| after | claude-opus-4-6 | 5 | 100% | 100% | 0% |

Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):

| label | model | Q1 |
|---|---|---|
| before | claude-opus-4-6 | F5 |
| after | claude-opus-4-6 | F5 |
