# PoCs

A PoC shows that one case recorded in dfir-mcp-matrix happens when the server
runs. It writes small evidence files, calls the server's tools over MCP with no
model, and checks the response against what the static analysis said. One PoC
covers one case (one server, one problem, one place in the code).

```
pocs/<problem>/<server>/<case-id>/
  poc.yaml          the case, the evidence it writes, the calls and the checks
  runs/<commit>/    output of each run, kept as evidence
    result.json     reproduced or not reproduced, the checks, the image digest
    transcript.json every request and response, the evidence as written, and
                    what the model would be given (server instructions, tool list)
```

`<problem>` and `<case-id>` are the IDs in dfir-mcp-matrix: the first digit
of a problem ID is its chapter (`P2049`, `P4192`), and a case ID adds a number
within the problem (`P4192-010`).

## poc.yaml

| Field | Meaning |
|---|---|
| `case_id`, `problem`, `server` | the matrix case |
| `variant`, `commit` | the server image the PoC runs on (`servers/<server>/variants/`) and its source commit |
| `display` | how the result is shown: `response`, `source-vs-result`, `multi-call`, `side-effect`, `time-size`, `network`, `definition`, `secret` |
| `summary` | one sentence: the condition, what the server returns, why it is the problem |
| `realism` | how likely the condition is in real use: common, possible |
| `coverage` | whether the PoC shows the whole case or part of it, and what is left out |
| `fixture` | files written before the server starts (text, bytes, size, mode, modification time, symbolic link, many generated files), in the evidence folder, the server's data folder or a folder next to the evidence that the server is not given |
| `stubs`, `env` | stand-in programs and server environment variables, for an external tool whose output the case depends on; a stub imitates the tool's real output format and says which in a comment |
| `conditions`, `repeat` | the same calls under different settings (for example two time zones) or several times |
| `steps` | MCP calls in order: tools, prompts, resources, the tool list |
| `expect` | checks on the responses; the case is reproduced only if every check holds |

A result is reported in dfir-mcp-matrix as `reproduced` or `not reproduced`
for the case and the commit it ran on.
