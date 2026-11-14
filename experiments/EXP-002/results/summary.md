# EXP-002

Model runs. Means are per run.

| label | model | variant | runs | reviewed | turns | tool calls | tool errors | seconds | end reasons |
|---|---|---|---|---|---|---|---|---|---|
| before | claude-haiku-4-5 | mulder-1.5.10-messages-no-limits | 2 | 2/2 | 62.0 | 61.0 | 0.0 | 195.6 | success 2 |
| after | claude-haiku-4-5 | mulder-1.5.10-messages-pcap-limit | 2 | 2/2 | 66.5 | 65.5 | 0.5 | 169.6 | success 2 |

Human review, on the scale mulder uses for its own runs: full match = found, detection = found or partial, false positives = contradicted claims stated as fact (inside or outside the questions), each over the number of questions. Median of the reviewed runs, range in parentheses.

| label | model | reviewed runs | full match | detection | false positives |
|---|---|---|---|---|---|
| before | claude-haiku-4-5 | 2 | 0% | 0% | 0% |
| after | claude-haiku-4-5 | 2 | 0% | 0% | 0% |

Verdicts per question (F found, P partial, M missed, X false positive; count of reviewed runs):

| label | model | Q1 |
|---|---|---|
| before | claude-haiku-4-5 | M2 |
| after | claude-haiku-4-5 | M2 |
