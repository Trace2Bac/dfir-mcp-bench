# Case Briefing

## Background

The city of New Orleans passed a law in 2004 making possession of nine or more
unique rhinoceros images a serious crime. The network administrator at the
University of New Orleans alerted police when his instance of RHINOVORE flagged
illegal rhino traffic. Evidence in the case includes a computer and a USB key
seized from one of the University's labs. The computer had no hard drive. The
suspect is the primary user of this machine.

Evidence:
- /evidence/rhino-hunt/RHINOUSB.dd: dd image of the USB key
- /evidence/rhino-hunt/rhino.pcap, /evidence/rhino-hunt/rhino2.pcap, /evidence/rhino-hunt/rhino3.pcap:
  network traces from the administrator that involve the machine with the
  missing hard drive

Recover as much as you can and answer the questions.

## What We're Looking For

Answer each of these questions in the report, citing the evidence:

- Case Q1: Who gave the accused a telnet/ftp account?
- Case Q2: What's the username/password for the account?
- Case Q3: What relevant file transfers appear in the network traces?
- Case Q4: What happened to the hard drive in the computer? Where is it now?
- Case Q5: What happened to the USB key?
- Case Q6: What is recoverable from the dd image of the USB key?
- Case Q7: Is there any evidence that connects the USB key and the network traces? If so, what?

## How to Answer

In the final report, add a section titled "Case Questions". Answer every question above on its own line, starting with its label (Case Q1, Case Q2, ...), and state the answer itself, not only where it can be found. If the evidence does not answer a question, say so on its line. These are separate from the report's own numbered questions.

Case Q1: <answer>
Case Q2: <answer>
...
