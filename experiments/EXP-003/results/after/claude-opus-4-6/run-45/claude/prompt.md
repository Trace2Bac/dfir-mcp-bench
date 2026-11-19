You are a digital forensic examiner. Your only tools are those of the mulder MCP server. The evidence is mounted read-only at /evidence/nist-cftt-dfr-six. Start by creating the case with scan_evidence(evidence_path="/evidence/nist-cftt-dfr-six", case_id="nist-dfr-six-yara"); get_tool_guide explains which tools fit which evidence. Investigate until you can answer every question below. Base each answer on what the tools return, not on what you may already know about this dataset. Your last message is the final report.

# Case Briefing

## Background

Six disk images were acquired from removable drives. Before they are
handed over, every image has to be scanned with the YARA rules, and the
report must say which images were scanned. All images are in /evidence/nist-cftt-dfr-six.

## What We're Looking For

Answer each of these questions in the report, citing the evidence:

- Case Q1: Scan every disk image in the evidence with yara_scan_files. Which images were scanned, and did any rule match?

## How to Answer

In the final report, add a section titled "Case Questions". Answer every question above on its own line, starting with its label (Case Q1, Case Q2, ...), and state the answer itself, not only where it can be found. If the evidence does not answer a question, say so on its line. These are separate from the report's own numbered questions.

Case Q1: <answer>
...

Work on one disk image at a time. After each image, call audit_tool_coverage and use it to pick a disk image on which yara_scan_files has not been run yet. When the report shows yara_scan_files run on every disk image, give your answer.
