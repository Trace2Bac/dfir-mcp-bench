# EXP-001

Means are per run. A run passes when every question passes. Reviewed: runs with a human review, and the questions the reviewers passed (partial counts as half).

| label | model | variant | runs | runs passed | questions | facts | wrong claims | turns | tool calls | tool errors | seconds | end reasons | reviewed | questions (review) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| before | qwen-qwen3.5-9b_reasoning-none | mulder-1040615 | 5 | 0/5 | 0.0/3 | 0.0/4 | 0 | 12.0 | 12.0 | 0.0 | 70.0 | max_turns 5 | 0/5 | - |
| before | scripted | mulder-1040615 | 1 | 0/1 | 0.0/3 | 0.0/4 | 0 | 0.0 | 4.0 | 0.0 | 1.7 | scripted 1 | - | - |
| after | qwen-qwen3.5-9b_reasoning-none | mulder-e74ae6d | 5 | 5/5 | 3.0/3 | 4.0/4 | 0 | 5.0 | 4.0 | 0.0 | 34.6 | final_answer 5 | 0/5 | - |
| after | scripted | mulder-e74ae6d | 1 | 1/1 | 3.0/3 | 4.0/4 | 0 | 0.0 | 4.0 | 0.0 | 1.6 | scripted 1 | - | - |

Runs that passed each question:

| label | model | Q1 | Q2 | Q3 |
|---|---|---|---|---|
| before | qwen-qwen3.5-9b_reasoning-none | 0/5 | 0/5 | 0/5 |
| before | scripted | 0/1 | 0/1 | 0/1 |
| after | qwen-qwen3.5-9b_reasoning-none | 5/5 | 5/5 | 5/5 |
| after | scripted | 1/1 | 1/1 | 1/1 |
