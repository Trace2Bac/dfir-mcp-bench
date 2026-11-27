# Tests

A test checks one requirement the same way on every server that has the
feature. It follows the NIST CFTT pattern: a requirement, assertions that
can be checked after a run, and test cases that exercise them. Each server
gets a small adapter that turns the test case into that server's calls, so
the same test can be run on every server and on every new commit.

```
checks/<problem>/
  check.yaml      problem ID (dfir-mcp-matrix), the requirement, assertions,
                  and the servers and commits it applies to
  check.py        the test cases and the pass or fail decision
  adapters/       one file per server
  results/<server>/<commit>.json
```

A result is `pass` or `fail` per server and commit, and feeds the snapshot
records in dfir-mcp-matrix (still present, fixed). A regression test merged
upstream with a fix counts as a test too; it is cited by its pull request
instead of being copied here.
