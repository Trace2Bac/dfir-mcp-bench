# EXP-007

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| before | claude-haiku-4-5 | mulder-1.5.10-tool-assists-no-limits | 5 | 5/5 | 147.4 | 166.2 | - | 1946.1 | report 5 |
| after | claude-haiku-4-5 | mulder-1.5.10-tool-assists-limits | 5 | 5/5 | 154.2 | 175.2 | - | 1901.8 | report 5 |

Human review, on the scale mulder uses for its own runs: full match = found, detection = found or partial, false positives = contradicted claims stated as fact (inside or outside the questions), each over the number of questions. Median of the reviewed runs, range in parentheses.

| label | model | reviewed runs | full match | detection | false positives |
|---|---|---|---|---|---|
| before | claude-haiku-4-5 | 5 | 48% (0 to 68) | 61% (0 to 81) | 0% (0 to 3) |
| after | claude-haiku-4-5 | 5 | 55% (48 to 68) | 65% (61 to 77) | 0% |

Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):

| label | model | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 | Q11 | Q12 | Q13 | Q14 | Q15 | Q16 | Q17 | Q18 | Q19 | Q20 | Q21 | Q22 | Q23 | Q24 | Q25 | Q26 | Q27 | Q28 | Q29 | Q30 | Q31 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| before | claude-haiku-4-5 | F4 M1 | F4 M1 | F4 M1 | F4 M1 | F4 M1 | F4 M1 | M5 | P4 M1 | F2 M3 | F4 M1 | F4 M1 | F1 M4 | F4 M1 | F1 P1 M3 | M5 | P4 M1 | F1 M4 | F1 M4 | P3 M2 | M5 | M5 | F2 M3 | F3 M2 | F4 M1 | F4 M1 | F2 M3 | M5 | F4 M1 | F4 M1 | M5 | F2 P2 M1 |
| after | claude-haiku-4-5 | F4 M1 | F5 | F5 | F4 M1 | F5 | F4 P1 | M5 | P5 | F4 M1 | F5 | F5 | F1 P1 M3 | F5 | F2 M3 | M5 | F1 P4 | F3 M2 | F3 M2 | F1 P4 | M5 | F1 M4 | F2 M3 | F5 | F5 | F5 | F1 M4 | M5 | F5 | F5 | M5 | F3 P1 M1 |
