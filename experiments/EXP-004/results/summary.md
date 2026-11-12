# EXP-004

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| before | claude-haiku-4-5 | mulder-1.5.10 | 5 | 5/5 | 186.2 | 211.4 | - | 822.9 | report 5 |
| after | claude-haiku-4-5 | mulder-1.5.10-haiku-assists | 5 | 5/5 | 160.8 | 180.0 | - | 1898.7 | report 5 |

Human review, on the scale mulder uses for its own runs: full match = found, detection = found or partial, false positives = contradicted claims stated as fact (inside or outside the questions), each over the number of questions. Median of the reviewed runs, range in parentheses.

| label | model | reviewed runs | full match | detection | false positives |
|---|---|---|---|---|---|
| before | claude-haiku-4-5 | 5 | 29% (19 to 32) | 39% (26 to 45) | 6% (0 to 6) |
| after | claude-haiku-4-5 | 5 | 65% (45 to 65) | 71% (55 to 74) | 0% (0 to 6) |

Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):

| label | model | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 | Q11 | Q12 | Q13 | Q14 | Q15 | Q16 | Q17 | Q18 | Q19 | Q20 | Q21 | Q22 | Q23 | Q24 | Q25 | Q26 | Q27 | Q28 | Q29 | Q30 | Q31 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| before | claude-haiku-4-5 | M2 X3 | F5 | F4 P1 | P1 M4 | F3 M2 | F2 M3 | M5 | P2 M3 | F2 M3 | F5 | F5 | F2 M3 | M5 | F2 M3 | M5 | P5 | F1 M4 | F1 M4 | P3 M2 | M5 | F3 P1 M1 | F5 | M4 X1 | M5 | M5 | M5 | M5 | M5 | P5 | M5 | M2 X3 |
| after | claude-haiku-4-5 | F5 | F5 | F5 | F4 M1 | F5 | F5 | M5 | P5 | F4 M1 | F5 | F5 | F2 M3 | F5 | F2 M3 | M5 | P5 | F2 M3 | F2 M3 | F1 P4 | M5 | F3 P1 M1 | F4 M1 | F4 X1 | F4 M1 | F4 M1 | F1 M4 | M5 | F5 | F5 | M5 | F5 |
