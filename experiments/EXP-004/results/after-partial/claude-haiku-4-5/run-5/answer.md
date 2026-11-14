Based on my forensic analysis of the evidence, I can now provide the final report.

---

# FORENSIC INVESTIGATION REPORT
## NIST Hacking Case - Dell CPi Notebook

**Case ID:** nist-hacking-case-q31  
**Evidence:** 4Dell_Latitude_CPi.E01, E02  
**Investigator:** Digital Forensic Examiner  
**Date:** 2026-11-14

---

## Investigation Summary

The abandoned Dell CPi notebook computer (serial #VLQLW) was analyzed for evidence of hacking activities and malware. The investigation focused on identifying hacking software, evidence of use, and potential connection to the suspect "Mr. Evil" (Greg Schardt).

### Key Findings

**Suspect Identification:**
- The computer contains a user account named "Mr. Evil", directly matching the suspect's known online nickname
- Documents and Settings folder contains extensive evidence of premeditated hacking activities

**Hacking Software Inventory:**
The system contains a highly organized collection of hacking and penetration testing tools:

**Enumeration Tools:**
- Cerberus Internet Scanner
- enum tool  
- ogre network enumeration tool

**Exploitation Tools:**
- Brutus (password brute-force tool)
- pwdump3 (Windows password hash dumper)
- NetBus (remote access tool)
- dsniff 2.3 (packet sniffing and network attack tool) - described as "Switched networks lose security advantage due packet tool"

**Footprinting Tools:**
- Nmapnt (network mapper with source code and compilation files)
- NSTPro2 (network assessment tool)
- spade114.exe (network scanner)
- SuperScan (port scanner and network enumeration)

**Utility Tools:**
- snitch.exe, user2sid.exe, STREAMFIND.EXE, and others

**Network Tools:**
- Ethereal (network packet analyzer/sniffer)
- Look@LAN (network viewer/scanner)
- Anonymizer software

These tools are consistent with the briefing information that the suspect would intercept wireless traffic at public hotspots to obtain credit card numbers, usernames, and passwords.

---

## Case Questions

**Case Q1:** Perform an Anti-Virus check. Are there any viruses on the computer?

**Answer:** The ClamAV antivirus scan of the disk image returned clean status (OK) with no virus signatures detected. However, the computer contains numerous hacking and penetration testing tools (Brutus, dsniff, pwdump, Nmap, etc.) that are consistent with the suspect's suspected activities of intercepting wireless traffic and harvesting credentials. While these tools are not classified as viruses themselves, their presence on a system owned by a suspect in a hacking investigation indicates malicious intent. The organized storage of these tools in categorized folders (ENUMERATION, EXPLOITATION, FOOTPRINTING, COMMANDS) suggests premeditated hacking activities.

---

## Evidence Processed

- Disk image analyzed: 4Dell_Latitude_CPi.E01 (640 MB)
- Files indexed: 12,545 files and directories
- Partitions identified and analyzed
- ClamAV antivirus scan completed
- File system forensics completed using The Sleuth Kit (TSK)

---

**Investigation Status:** Complete