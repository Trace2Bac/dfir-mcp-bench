# EXP-009

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| before | claude-haiku-4-5 | mulder-1.5.10 | 5 | 5/5 | 175.4 | 191.6 | - | 778.0 | report 5 |
| after | claude-haiku-4-5 | mulder-1.5.10-pcap-scope-batch | 5 | 5/5 | 179.8 | 202.8 | - | 901.5 | report 5 |
| after-2 | claude-haiku-4-5 | mulder-1.5.10-limits-to-analyst | 5 | 5/5 | 176.6 | 193.6 | - | 842.6 | report 5 |

Human review, on the scale mulder uses for its own runs: full match = found, detection = found or partial, false positives = contradicted claims stated as fact (inside or outside the questions), each over the number of questions. Median of the reviewed runs, range in parentheses.

| label | model | reviewed runs | full match | detection | false positives |
|---|---|---|---|---|---|
| before | claude-haiku-4-5 | 5 | 19% (16 to 26) | 35% (26 to 39) | 6% (3 to 10) |
| after | claude-haiku-4-5 | 5 | 26% (19 to 35) | 42% (35 to 58) | 3% (0 to 13) |
| after-2 | claude-haiku-4-5 | 5 | 26% (19 to 32) | 39% (29 to 45) | 6% (0 to 10) |

Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):

| label | model | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 | Q11 | Q12 | Q13 | Q14 | Q15 | Q16 | Q17 | Q18 | Q19 | Q20 | Q21 | Q22 | Q23 | Q24 | Q25 | Q26 | Q27 | Q28 | Q29 | Q30 | Q31 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| before | claude-haiku-4-5 | M3 X2 | F5 | F4 M1 | P2 M3 | F3 M2 | F1 M4 | M5 | F1 P2 M2 | F1 M4 | F5 | F4 P1 | M5 | P1 M4 | M5 | M5 | P5 | F1 M4 | M5 | F1 P3 M1 | P2 M3 | P2 M3 | F3 P1 M1 | M3 X2 | M5 | M5 | F1 M4 | M5 | M5 | F3 M1 X1 | M5 | M3 X2 |
| after | claude-haiku-4-5 | M4 X1 | F5 | F5 | F2 P1 M2 | F3 M2 | F2 P1 M2 | M5 | P5 | F3 P1 M1 | F5 | F5 | F1 P1 M3 | F1 M4 | F1 M4 | P1 M4 | P4 M1 | F1 M4 | F1 M4 | F2 P3 | P3 M2 | F1 P2 M2 | F3 P1 M1 | M3 X2 | M5 | M5 | M5 | M5 | M5 | F2 P1 M1 X1 | M5 | M3 X2 |
| after-2 | claude-haiku-4-5 | M1 X4 | F5 | F4 M1 | P3 M2 | F2 M3 | F3 M2 | M5 | P4 M1 | F2 M3 | F5 | F5 | F1 P1 M3 | M5 | F1 M4 | M5 | P5 | F1 M4 | F1 M4 | P4 M1 | M5 | F2 M3 | F4 M1 | M4 X1 | M4 X1 | P1 M4 | M5 | M5 | M5 | F3 P2 | M5 | M3 X2 |
