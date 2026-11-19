# EXP-004

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| before | claude-opus-4-6 | findevil-d1a8d25 | 10 | 10/10 | 38.4 | 37.4 | 0.0 | 149.7 | success 10 |
| after | claude-opus-4-6 | findevil-d1a8d25-per-location | 10 | 10/10 | 41.2 | 40.2 | 0.0 | 162.3 | success 10 |

Human review, on the scale mulder uses for its own runs: full match = found, detection = found or partial, false positives = contradicted claims stated as fact (inside or outside the questions), each over the number of questions. Mean of the reviewed runs, range in parentheses.

| label | model | reviewed runs | full match | detection | false positives |
|---|---|---|---|---|---|
| before | claude-opus-4-6 | 10 | 0% | 0% | 50% |
| after | claude-opus-4-6 | 10 | 100% | 100% | 0% |

Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):

| label | model | Q1 | Q2 |
|---|---|---|---|
| before | claude-opus-4-6 | M10 | X10 |
| after | claude-opus-4-6 | F10 | F10 |
