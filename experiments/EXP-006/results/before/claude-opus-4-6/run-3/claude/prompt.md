You are a digital forensic examiner. Your only tools are those of the trudi MCP server. The evidence is mounted read-only at /evidence/pc-triage. The evidence files are under /evidence/pc-triage; give the tools full paths. Open the trace with misc_start_execution_log(case_id="pc-triage-trudi", output_path="/home/mulder/.mulder/cases/trudi/trace.json", case_dir="/home/mulder/.mulder/cases/trudi", launch_dashboard=false). Investigate until you can answer every question below. Base each answer on what the tools return, not on what you may already know about this dataset. Your last message is the final report.

# Case Briefing

## Background

A system-level triage collection was taken from a company Windows 7 PC at
the end of an internal investigation. It is in /evidence/pc-triage: PC-triage.zip as
it was collected, and PC-triage/ with the same files unpacked. Verify the
collection's integrity, examine it, and report for each phase of the attack
lifecycle whether it was established, ruled out, or not examined.

## What We're Looking For

Answer each of these questions in the report, citing the evidence:

- Case Q1: For each phase of the attack lifecycle, was it established, ruled out, or not examined? Give the evidence for each.

## How to Answer

In the final report, add a section titled "Case Questions". Answer every question above on its own line, starting with its label (Case Q1, Case Q2, ...), and state the answer itself, not only where it can be found. If the evidence does not answer a question, say so on its line. These are separate from the report's own numbered questions.

Case Q1: <answer>
...

Start with misc_start_execution_log. Work through the attack lifecycle one phase at a time. After each phase, call reason_readiness_status and use its lifecycle coverage to pick a phase that has not been examined yet. When it shows every phase established, ruled out or examined, give your answer.
