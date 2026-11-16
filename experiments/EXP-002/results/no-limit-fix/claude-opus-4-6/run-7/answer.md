All evidence gathered. Here is the final report.

---

# Forensic Investigation Report — NIST Hacking Case

**Case ID:** nist-hacking-case-av  
**Evidence:** Dell Latitude CPi notebook (S/N VLQLW) — EnCase image `4Dell_Latitude_CPi.E01`/`.E02`  
**Date of Report:** 2026-11-16

## Evidence Summary

The disk image contains a single NTFS partition (sectors 63–9,510,479) with 12,545 filesystem entries indexed. The Windows registry SOFTWARE hive was successfully parsed, and a ClamAV antivirus scan was performed against the disk image.

## Key Findings

### Operating System
The SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` reports:
- **ProductName:** Microsoft Windows XP
- **CurrentVersion:** 5.1
- **CurrentBuildNumber:** 2600
- **BuildLab:** 2600.xpclient.010817-1148
- **SystemRoot:** C:\WINDOWS

### Registered Owner
The same registry key reports:
- **RegisteredOwner:** Greg Schardt
- **RegisteredOrganization:** N/A
- **ProductId:** 55274-640-0147306-23684

This directly ties the computer to the suspect named in the case briefing.

### Antivirus Scan
ClamAV was run against the disk image. Result:
- `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01: OK`
- **Detections: 0** — No viruses were found by ClamAV's signature-based scan.

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP** (Version 5.1, Build 2600), as recorded in the SOFTWARE registry hive under `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** A ClamAV antivirus scan of the disk image found **no viruses** (0 detections). The image scanned clean.