# FORENSIC INVESTIGATION REPORT
## Case ID: nist-hacking-case-av

**Evidence Examined:** Dell Latitude CPi Notebook (Serial # VLQLW)  
**Disk Image:** 4Dell_Latitude_CPi.E01/E02 (640.0 MB)  
**Investigation Date:** 2026-11-16

---

## Findings

### 1. Operating System Analysis
Registry analysis of the SOFTWARE hive revealed comprehensive OS information:
- **Product Name:** Microsoft Windows XP
- **Version:** 5.1
- **Build:** 2600 (Build Lab: 2600.xpclient.010817-1148)
- **Install Date:** August 27, 2004 (timestamp: 1092955707)
- **Product ID:** 55274-640-0147306-23684

### 2. Registered Owner Information
The registry key `Microsoft\Windows NT\CurrentVersion` contained:
- **RegisteredOwner:** Greg Schardt
- **RegisteredOrganization:** N/A

This directly links the computer to the suspect mentioned in the case briefing.

### 3. Anti-Virus Scan Results
ClamAV malware detection was performed on the complete disk image (both segments):
- **4Dell_Latitude_CPi.E01:** OK (no malware detected)
- **4Dell_Latitude_CPi.E02:** OK (no malware detected)
- **Total Detections:** 0

No viruses or malware signatures were found during the antivirus scan.

---

## Case Questions

**Case Q1:** Microsoft Windows XP (version 5.1, build 2600)

**Case Q2:** Greg Schardt

**Case Q3:** No viruses detected. ClamAV antivirus scan of the complete disk image returned no detections (status: OK for both image segments).