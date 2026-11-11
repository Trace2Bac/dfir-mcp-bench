# EXP-010

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| before | claude-opus-4-6 | mulder-1.5.10 | 3 | 1/3 | 238.7 | 333.0 | - | 2194.1 | report 3 |
| after-2 | claude-opus-4-6 | mulder-1.5.10-limits-to-analyst | 3 | 1/3 | 246.3 | 285.7 | - | 1936.4 | report 3 |

Human review, on the scale mulder uses for its own runs: full match = found, detection = found or partial, false positives = contradicted claims stated as fact (inside or outside the questions), each over the number of questions. Median of the reviewed runs, range in parentheses.

| label | model | reviewed runs | full match | detection | false positives |
|---|---|---|---|---|---|
| before | claude-opus-4-6 | 1 | 81% | 84% | 3% |
| after-2 | claude-opus-4-6 | 1 | 77% | 84% | 0% |

Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):

| label | model | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 | Q11 | Q12 | Q13 | Q14 | Q15 | Q16 | Q17 | Q18 | Q19 | Q20 | Q21 | Q22 | Q23 | Q24 | Q25 | Q26 | Q27 | Q28 | Q29 | Q30 | Q31 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| before | claude-opus-4-6 | X1 | F1 | F1 | F1 | F1 | M1 | M1 | P1 | F1 | F1 | F1 | F1 | F1 | F1 | F1 | F1 | F1 | F1 | F1 | F1 | F1 | F1 | F1 | F1 | F1 | F1 | F1 | F1 | F1 | M1 | M1 |
| after-2 | claude-opus-4-6 | M1 | F1 | F1 | F1 | F1 | F1 | M1 | P1 | F1 | F1 | F1 | F1 | F1 | F1 | F1 | P1 | F1 | F1 | F1 | F1 | F1 | F1 | F1 | F1 | F1 | M1 | F1 | F1 | F1 | M1 | M1 |
