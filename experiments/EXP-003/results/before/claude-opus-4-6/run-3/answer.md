I now have all the evidence needed. Let me compile the final report.

---

# Digital Forensic Investigation Report

## Case: nist-hacking-case-av
**Date:** 2026-11-15  
**Evidence:** Dell Latitude CPi notebook computer (Serial # VLQLW), EnCase image `4Dell_Latitude_CPi.E01`/`.E02`

---

## Summary of Findings

The disk image contains a single NTFS partition (sectors 63–9,510,479) with 12,545 files indexed. Registry analysis of the SOFTWARE hive at `Microsoft\Windows NT\CurrentVersion` provided operating system and ownership details. A ClamAV anti-virus scan was performed against the evidence image.

### Operating System
The registry key `Microsoft\Windows NT\CurrentVersion` shows:
- **ProductName:** Microsoft Windows XP
- **CurrentVersion:** 5.1
- **CurrentBuildNumber:** 2600
- **BuildLab:** 2600.xpclient.010817-1148
- **SystemRoot:** C:\WINDOWS

### Registered Owner
The registry value `RegisteredOwner` under `Microsoft\Windows NT\CurrentVersion` is set to **Greg Schardt**. The `RegisteredOrganization` value is "N/A". This directly ties the computer to the suspect named in the case briefing.

### Anti-Virus Scan
ClamAV was run against the evidence image (`/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01`). Result: **OK — 0 detections**. No viruses or malware signatures were identified by ClamAV in the disk image.

---

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP** (Version 5.1, Build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** ClamAV anti-virus scan of the evidence image returned **no viruses detected** (0 detections). The scan result was "OK" for the entire disk image.