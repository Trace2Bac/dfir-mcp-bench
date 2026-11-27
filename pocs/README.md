# PoCs

A PoC shows one problem on one server: a script written for that server's
own calls, the output it is expected to give at a commit, and the output it
gave. It is used when a problem is easier to show on its own than through a
shared test, for example because each server exposes the behaviour through
different tools.

```
pocs/<problem>/<server>/
  poc.yaml        problem ID (dfir-mcp-matrix), server, commits checked,
                  level (function call or MCP connection), expected result
  poc.py          the script
  runs/<commit>/  output of each run, kept as evidence
```

`<problem>` is the problem ID in dfir-mcp-matrix (for example `P0025`).
A PoC result is reported there as `reproduced` or `not reproduced` for the
server and commit it ran on.
