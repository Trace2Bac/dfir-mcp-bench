# EXP-010

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| before | claude-opus-4-6 | mulder-1.5.10 | 3 | 3/3 | 238.7 | 333.0 | - | 2194.1 | report 3 |
| after-2 | claude-opus-4-6 | mulder-1.5.10-limits-to-analyst | 3 | 3/3 | 246.3 | 285.7 | - | 1936.4 | report 3 |

Human review, on the scale mulder uses for its own runs: full match = found, detection = found or partial, false positives = contradicted claims stated as fact (inside or outside the questions), each over the number of questions. Median of the reviewed runs, range in parentheses.

| label | model | reviewed runs | full match | detection | false positives |
|---|---|---|---|---|---|
| before | claude-opus-4-6 | 3 | 77% (74 to 81) | 81% (77 to 84) | 3% |
| after-2 | claude-opus-4-6 | 3 | 74% (71 to 77) | 81% (81 to 84) | 0% (0 to 3) |

Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):

| label | model | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 | Q11 | Q12 | Q13 | Q14 | Q15 | Q16 | Q17 | Q18 | Q19 | Q20 | Q21 | Q22 | Q23 | Q24 | Q25 | Q26 | Q27 | Q28 | Q29 | Q30 | Q31 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| before | claude-opus-4-6 | M1 X2 | F3 | F3 | F3 | F3 | F2 M1 | M3 | P3 | F3 | F3 | F3 | F3 | F3 | F3 | F3 | F3 | F3 | F3 | F3 | F3 | F2 M1 | F3 | F3 | F2 M1 | F2 M1 | F1 M2 | F3 | F3 | F3 | M3 | M2 X1 |
| after-2 | claude-opus-4-6 | M2 X1 | F3 | F3 | F3 | F3 | F3 | M3 | P3 | F3 | F3 | F3 | F3 | F2 P1 | F3 | F3 | F1 P2 | F3 | F1 P1 M1 | F3 | F3 | F2 M1 | F3 | F2 M1 | F3 | F3 | F1 M2 | F3 | F3 | F3 | M3 | M3 |
