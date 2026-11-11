# EXP-001

Scripted runs (fixed tool calls, no model): the expected facts found in what the tools returned.

| label | variant | questions | facts | tool calls | tool errors |
|---|---|---|---|---|---|
| before | mulder-1040615 | 0/3 | 0/4 | 4 | 0 |
| after | mulder-e74ae6d | 3/3 | 4/4 | 4 | 0 |

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| before | qwen3.5-9b | mulder-1040615 | 5 | 5/5 | 12.0 | 12.0 | 0.0 | 70.0 | max_turns 5 |
| after | qwen3.5-9b | mulder-e74ae6d | 5 | 5/5 | 5.0 | 4.0 | 0.0 | 34.6 | final_answer 5 |

Human review, on the scale mulder uses for its own runs: full match = found, detection = found or partial, false positives = contradicted claims stated as fact (inside or outside the questions), each over the number of questions. Median of the reviewed runs, range in parentheses.

| label | model | reviewed runs | full match | detection | false positives |
|---|---|---|---|---|---|
| before | qwen3.5-9b | 5 | 0% | 0% | 0% |
| after | qwen3.5-9b | 5 | 100% | 100% | 0% |

Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):

| label | model | Q1 | Q2 | Q3 |
|---|---|---|---|---|
| before | qwen3.5-9b | M5 | M5 | M5 |
| after | qwen3.5-9b | F5 | F5 | F5 |
