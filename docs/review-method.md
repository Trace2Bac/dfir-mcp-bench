---
title: Reviewing test results
---

# How test results are reviewed

A reviewer reads the answer to each question in the report and gives a
verdict.

| Verdict        | When                                                              |
| -------------- | ----------------------------------------------------------------- |
| found          | The answer gives the answer key's fact.                           |
| partial        | Part of it: only some of the facts the question asks for are right. |
| missed         | No answer, "not determined", a guess, or a wrong value.            |
| false positive | A claim stated as fact that the evidence contradicts.              |

A wrong claim stated as fact outside the answers, in the report's findings,
is also counted as a false positive and listed under `extra_false_positives`
in `review.yaml`.

Each run gets three rates, each over the number of questions:

- full match: found
- detection: found or partial
- false positives: false positive verdicts and the false positives outside
  the answers
