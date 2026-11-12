---
title: How model runs are reviewed
---

# How model runs are reviewed

Model runs are not scored automatically. A reviewer reads the answer to each
question in the report and gives one verdict, on the scale mulder uses for
its own runs:

| Verdict | When |
|---|---|
| found | The answer gives the answer key's fact. |
| partial | Part of it: some of the facts a question asks for, or the right date with the wrong time. |
| missed | No answer, "not determined", a guess, or a wrong value. |
| false positive | A claim stated as fact that the evidence contradicts, such as "no capture file exists" when one does. |

A false positive is also counted when the report states such a claim outside
the answers (in its findings or summary); it is then listed under
`extra_false_positives` in the run's `review.yaml`.

Each run then has three rates, each over the number of questions:

- full match: found
- detection: found or partial
- false positives: false positive verdicts and extra false positives

An experiment's page shows the median of the reviewed runs and the range in
parentheses. A change is called an improvement only when the ranges of the
two labels do not overlap.

Questions where the answer is a judgement (for example "Are there any viruses
on the computer?") are marked `review_only` in the case and have no automatic
check. A hedged answer, or one that reports a tool's result with its limit,
is missed, not a false positive; a categorical claim the evidence
contradicts is a false positive.
