# EXP-005

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| before | claude-haiku-4-5 | mulder-1.5.10 | 5 | 5/5 | 165.8 | 181.8 | - | 601.6 | report 5 |
| after | claude-haiku-4-5 | mulder-1.5.10-haiku-assists | 5 | 5/5 | 165.2 | 178.4 | - | 638.6 | report 5 |

Human review, on the scale mulder uses for its own runs: full match = found, detection = found or partial, false positives = contradicted claims stated as fact (inside or outside the questions), each over the number of questions. Median of the reviewed runs, range in parentheses.

| label | model | reviewed runs | full match | detection | false positives |
|---|---|---|---|---|---|
| before | claude-haiku-4-5 | 5 | 0% | 29% (29 to 43) | 0% (0 to 43) |
| after | claude-haiku-4-5 | 5 | 0% (0 to 14) | 43% (29 to 57) | 0% (0 to 14) |

Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):

| label | model | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 |
|---|---|---|---|---|---|---|---|---|
| before | claude-haiku-4-5 | M5 | P5 | P5 | M5 | M5 | P2 M1 X2 | M4 X1 |
| after | claude-haiku-4-5 | M5 | F1 P4 | P5 | M5 | M5 | P3 M1 X1 | P1 M4 |
