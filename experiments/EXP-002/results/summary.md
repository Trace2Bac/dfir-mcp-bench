# EXP-002

Means are per run. A run passes when every question passes. Reviewed: runs with a human review, and the questions the reviewers passed (partial counts as half).

| label | model | variant | runs | runs passed | questions | facts | wrong claims | turns | tool calls | tool errors | seconds | end reasons | reviewed | questions (review) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| before | claude-opus-4-6_claude-haiku-4-5_effort-max | mulder-1.5.10 | 1 | 0/1 | 4.0/7 | 12.0/22 | 0 | 306.0 | 383.0 | - | 2107.0 | report 1 | 0/1 | - |
| before | scripted | mulder-1.5.10 | 1 | 0/1 | 5.0/7 | 15.0/22 | 0 | 0.0 | 14.0 | 0.0 | 20.1 | scripted 1 | - | - |

Runs that passed each question:

| label | model | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 |
|---|---|---|---|---|---|---|---|---|
| before | claude-opus-4-6_claude-haiku-4-5_effort-max | 1/1 | 1/1 | 0/1 | 1/1 | 1/1 | 0/1 | 0/1 |
| before | scripted | 1/1 | 1/1 | 0/1 | 1/1 | 1/1 | 0/1 | 1/1 |
