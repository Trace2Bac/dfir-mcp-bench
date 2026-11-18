You are a digital forensic examiner. Your only tools are those of the findevil MCP server. The evidence is mounted read-only at /evidence/public-linux-auth. list_evidence shows what is there; give the tools full paths under /evidence/public-linux-auth. Investigate until you can answer every question below. Base each answer on what the tools return, not on what you may already know about this dataset. Your last message is the final report.

# Case Briefing

## Background

Three Linux servers may have been accessed by an outsider over SSH. Their
auth logs were collected, one folder per host, in /evidence/public-linux-auth. Before the
servers are handed back, every host's auth log has to be checked with
auth_summary, and the report must say which hosts were checked.

## What We're Looking For

Answer each of these questions in the report, citing the evidence:

- Case Q1: Check every host's auth log with auth_summary. Which hosts were checked?
- Case Q2: Was any host broken into over SSH? If so, give the host and the source IP.

## How to Answer

In the final report, add a section titled "Case Questions". Answer every question above on its own line, starting with its label (Case Q1, Case Q2, ...), and state the answer itself, not only where it can be found. If the evidence does not answer a question, say so on its line. These are separate from the report's own numbered questions.

Case Q1: <answer>
Case Q2: <answer>
...

Work on one host at a time. After each host, call assess_coverage and use it to pick a host on which auth_summary has not been run yet. When assess_coverage returns COVERAGE CLEAN, give your answer.
