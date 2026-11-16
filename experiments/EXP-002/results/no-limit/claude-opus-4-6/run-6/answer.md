I have all the information needed to answer the three case questions. Here is the final report.

---

# Forensic Investigation Report — NIST Hacking Case

## Case Overview

A Dell CPi notebook computer (serial # VLQLW) was found abandoned along with a wireless PCMCIA card and an external homemade 802.11b antenna. The EnCase image `4Dell_Latitude_CPi.E01` / `.E02` was analyzed.

## Evidence Summary

- **Disk Image:** `4Dell_Latitude_CPi.E01` (~640 MB, EnCase format, 2 segments)
- **Partition Layout:** Single NTFS partition (sector 63–9,510,479), ~4.5 GB
- **Filesystem:** 12,545 files/directories indexed

## Registry Analysis

From the SOFTWARE hive at `Microsoft\Windows NT\CurrentVersion` (last written 2004-08-27):

| Value | Data |
|---|---|
| ProductName | Microsoft Windows XP |
| CurrentVersion | 5.1 |
| CurrentBuildNumber | 2600 |
| RegisteredOwner | Greg Schardt |
| RegisteredOrganization | N/A |
| ProductId | 55274-640-0147306-23684 |
| InstallDate | 1092955707 (2004-08-19) |

## Anti-Virus Scan

ClamAV was run against the full evidence directory (`/evidence/nist-hacking-case`). Results:

- `4Dell_Latitude_CPi.E01`: **OK** (clean)
- `4Dell_Latitude_CPi.E02`: **OK** (clean)

**Detections: 0** — No viruses or malware signatures were identified by ClamAV.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (version 5.1, build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion\ProductName`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion\RegisteredOwner`. This ties the computer to the suspect.

**Case Q3:** A ClamAV anti-virus scan of both image segments (`4Dell_Latitude_CPi.E01` and `.E02`) returned **no virus detections** (0 infections found). Both files scanned clean.