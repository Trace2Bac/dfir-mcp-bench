# EXP-004

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| before | claude-haiku-4-5 | mulder-b922c36 | 3 | 3/3 | 10.3 | 9.3 | 0.0 | 27.4 | success 3 |
| before | claude-opus-4-6 | mulder-b922c36 | 3 | 3/3 | 19.0 | 18.0 | 0.0 | 108.1 | success 3 |
| after | claude-haiku-4-5 | mulder-54d76c8 | 3 | 3/3 | 10.3 | 9.3 | 0.0 | 26.7 | success 3 |
| after | claude-opus-4-6 | mulder-54d76c8 | 3 | 3/3 | 16.3 | 15.3 | 0.0 | 92.6 | success 3 |

Human review, on the scale mulder uses for its own runs: full match = found, detection = found or partial, false positives = contradicted claims stated as fact (inside or outside the questions), each over the number of questions. Mean of the reviewed runs, range in parentheses.

| label | model | reviewed runs | full match | detection | false positives |
|---|---|---|---|---|---|
| before | claude-haiku-4-5 | 3 | 0% | 100% | 0% |
| before | claude-opus-4-6 | 3 | 67% (0 to 100) | 100% | 0% |
| after | claude-haiku-4-5 | 3 | 0% | 100% | 0% |
| after | claude-opus-4-6 | 3 | 67% (0 to 100) | 100% | 0% |

Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):

| label | model | Q1 |
|---|---|---|
| before | claude-haiku-4-5 | P3 |
| before | claude-opus-4-6 | F2 P1 |
| after | claude-haiku-4-5 | P3 |
| after | claude-opus-4-6 | F2 P1 |
