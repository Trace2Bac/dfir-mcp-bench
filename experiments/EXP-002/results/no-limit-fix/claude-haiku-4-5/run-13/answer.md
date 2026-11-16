## DIGITAL FORENSIC EXAMINATION REPORT

**Case ID:** nist-hacking-case-av  
**Evidence:** Dell Latitude CPi Notebook (VLQLW) - EnCase Image  
**Date of Examination:** 2026-11-16  
**Examiner:** Digital Forensic Analyst

### Executive Summary

An EnCase forensic image of an abandoned Dell Latitude CPi notebook computer was examined to determine the operating system, registered owner, and presence of malware. The examination identified the computer as running Microsoft Windows XP and revealed that the computer was registered to Greg Schardt, the suspected hacker. A comprehensive anti-virus scan found no malware infections.

### Findings

#### Operating System Analysis
The computer runs **Microsoft Windows XP**, Version 5.1, Build 2600. This was confirmed through examination of the Windows Registry SOFTWARE hive at the key `Microsoft\Windows NT\CurrentVersion`.

**Registry Evidence:**
- ProductName: Microsoft Windows XP
- CurrentVersion: 5.1
- CurrentBuildNumber: 2600
- BuildLab: 2600.xpclient.010817-1148

#### Registered Owner
The registered owner of the computer is **Greg Schardt**. This information was extracted directly from the Windows Registry SOFTWARE hive at `Microsoft\Windows NT\CurrentVersion`, RegisteredOwner value.

**Registry Evidence:**
- RegisteredOwner: Greg Schardt
- RegisteredOrganization: N/A
- Installation Date: August 2004 (Unix timestamp: 1092955707)

This directly connects the computer to the suspected hacker mentioned in the case briefing.

#### Anti-Virus Scan
A comprehensive ClamAV scan was performed on the entire disk image (both segments: E01 and E02).

**ClamAV Results:**
- /evidence/nist-hacking-case/4Dell_Latitude_CPi.E01: **OK**
- /evidence/nist-hacking-case/4Dell_Latitude_CPi.E02: **OK**

Total Detections: **0**

### Conclusion

The abandoned Dell Latitude CPi notebook has been definitively linked to Greg Schardt through Windows Registry evidence showing his name as the registered owner. The system runs Windows XP and contains no detected malware according to ClamAV scanning. Further investigation into the specific hacking software and internet traffic interception tools mentioned in the case briefing would require file system analysis, application examination, and network history review.

---

## Case Questions

Case Q1: Microsoft Windows XP (Version 5.1, Build 2600)

Case Q2: Greg Schardt

Case Q3: No, there are no viruses detected. ClamAV scanning of both disk image segments returned "OK" with zero detections.