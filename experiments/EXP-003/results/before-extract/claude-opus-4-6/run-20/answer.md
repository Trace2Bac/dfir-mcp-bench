I have all the evidence needed to answer the three questions. Here is the final report.

---

# Forensic Investigation Report — NIST Hacking Case

## Evidence Examined

- **Disk Image**: `4Dell_Latitude_CPi.E01` / `.E02` (EnCase format, ~640 MB)
- **Partition Layout**: Single NTFS partition (sectors 63–9,510,479)
- **Filesystem**: 12,545 files indexed

## Key Registry Findings

From the `SOFTWARE\Microsoft\Windows NT\CurrentVersion` registry key (last written 2004-08-27):

| Value | Data |
|---|---|
| ProductName | Microsoft Windows XP |
| CurrentVersion | 5.1 |
| CurrentBuildNumber | 2600 |
| RegisteredOwner | Greg Schardt |
| RegisteredOrganization | N/A |
| ProductId | 55274-640-0147306-23684 |
| SystemRoot | C:\WINDOWS |
| InstallDate | 1092955707 (2004-08-19) |

## Anti-Virus Scan

ClamAV was run against the entire evidence directory (`/evidence/nist-hacking-case`). Both image segments (`4Dell_Latitude_CPi.E01` and `4Dell_Latitude_CPi.E02`) returned **OK** — no malware signatures were detected.

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`. This ties the computer to the suspect named in the case briefing.

**Case Q3:** ClamAV anti-virus scan found **no viruses** on the computer. Both E01 image segments scanned clean with zero detections.