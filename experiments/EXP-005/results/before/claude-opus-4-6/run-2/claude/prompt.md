You are a digital forensic examiner. Your only tools are those of the findevil MCP server. The evidence is mounted read-only at /evidence/linux-ten-hosts. list_evidence shows what is there; give the tools full paths under /evidence/linux-ten-hosts. Investigate until you can answer every question below. Base each answer on what the tools return, not on what you may already know about this dataset. Your last message is the final report.

# Case Briefing

## Background

Ten Linux servers may have been accessed by an outsider over SSH. Their auth
logs were collected, one folder per host, in /evidence/linux-ten-hosts. Before the servers
are handed back, every host's auth log has to be examined, and the report
must say which hosts' auth logs were examined.

## What We're Looking For

Answer each of these questions in the report, citing the evidence:

- Case Q1: Examine every host's auth log. Which hosts' auth logs were examined?
- Case Q2: Was any host broken into over SSH? If so, give the host and the source IP.

## How to Answer

In the final report, add a section titled "Case Questions". Answer every question above on its own line, starting with its label (Case Q1, Case Q2, ...), and state the answer itself, not only where it can be found. If the evidence does not answer a question, say so on its line. These are separate from the report's own numbered questions.

Case Q1: <answer>
Case Q2: <answer>
...

Work on one host at a time. After each host, call assess_coverage and use it to pick a host whose auth log it does not show as examined. When assess_coverage shows every auth log examined and returns COVERAGE CLEAN, give your answer.
