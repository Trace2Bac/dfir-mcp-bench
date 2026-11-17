All evidence collected. Here is the final report.

---

# Forensic Report — NIST Hacking Case (Dell Latitude CPi)

## Case Overview

A Dell CPi notebook (serial # VLQLW) was found abandoned with wireless hacking equipment. The EnCase image (`4Dell_Latitude_CPi.E01` / `.E02`, ~640 MB) was analyzed. The disk contains a single NTFS partition (sectors 63–9,510,479).

## Key Findings

### Operating System
The Windows registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`) confirms:
- **Product**: Microsoft Windows XP
- **Version**: 5.1 (Build 2600)
- **System Root**: `C:\WINDOWS`

### Registered Owner
The registry value `RegisteredOwner` is set to **Greg Schardt**, directly tying the computer to the suspect. The `RegisteredOrganization` is "N/A". The Product ID is `55274-640-0147306-23684`. The OS was installed on approximately 2004-08-19 (Unix epoch `1092955707`).

### Anti-Virus Scan
ClamAV was run against both image segments (`4Dell_Latitude_CPi.E01` and `.E02`). **No viruses were detected** — both files returned "OK" with 0 detections.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600).

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion\RegisteredOwner`.

**Case Q3:** ClamAV anti-virus scan of the disk image found **no viruses**. Both image segments (E01 and E02) came back clean with zero detections.