# EXP-009

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| before | claude-haiku-4-5 | mulder-1.5.10 | 2 | 2/2 | 181.0 | 201.0 | - | 780.8 | report 2 |
| after | claude-haiku-4-5 | mulder-1.5.10-pcap-scope | 2 | 2/2 | 219.5 | 227.0 | - | 847.2 | report 2 |

Human review, on the scale mulder uses for its own runs: full match = found, detection = found or partial, false positives = contradicted claims stated as fact (inside or outside the questions), each over the number of questions. Median of the reviewed runs, range in parentheses.

| label | model | reviewed runs | full match | detection | false positives |
|---|---|---|---|---|---|
| before | claude-haiku-4-5 | 2 | 22% (19 to 26) | 30% (26 to 35) | 8% (6 to 10) |
| after | claude-haiku-4-5 | 2 | 23% | 45% | 8% (6 to 10) |

Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):

| label | model | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 | Q11 | Q12 | Q13 | Q14 | Q15 | Q16 | Q17 | Q18 | Q19 | Q20 | Q21 | Q22 | Q23 | Q24 | Q25 | Q26 | Q27 | Q28 | Q29 | Q30 | Q31 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| before | claude-haiku-4-5 | M2 | F2 | F1 M1 | M2 | F1 M1 | F1 M1 | M2 | F1 P1 | M2 | F2 | F2 | M2 | M2 | M2 | M2 | P2 | M2 | M2 | F1 M1 | M2 | P2 | F2 | X2 | M2 | M2 | M2 | M2 | M2 | F1 M1 | M2 | M1 X1 |
| after | claude-haiku-4-5 | M1 X1 | F2 | F1 P1 | P1 M1 | F1 M1 | F2 | M2 | P2 | P1 M1 | F2 | F1 M1 | P1 M1 | P1 M1 | M2 | P1 M1 | P2 | F1 M1 | P1 M1 | P1 M1 | M2 | F1 P1 | F2 | X2 | M2 | M2 | F1 M1 | M2 | M2 | P1 M1 | M2 | M2 |
