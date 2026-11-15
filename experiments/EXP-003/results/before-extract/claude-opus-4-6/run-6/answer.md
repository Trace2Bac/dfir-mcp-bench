ClamAV scanned both E01 segments and found no detections. I now have all the evidence needed. Here is the final report.

---

# Forensic Investigation Report — NIST Hacking Case

## Evidence Summary

- **Evidence**: Dell Latitude CPi notebook (serial # VLQLW), EnCase image `4Dell_Latitude_CPi.E01`/`.E02` (640 MB)
- **Disk Layout**: Single NTFS partition (sector 63–9,510,479), 12,545 files indexed
- **Image Status**: Both E01 segments verified OK by ClamAV

## Registry Findings

From the SOFTWARE hive at `Microsoft\Windows NT\CurrentVersion` (last written 2004-08-27):

| Field | Value |
|---|---|
| ProductName | Microsoft Windows XP |
| CurrentVersion | 5.1 |
| CurrentBuildNumber | 2600 |
| RegisteredOwner | Greg Schardt |
| RegisteredOrganization | N/A |
| ProductId | 55274-640-0147306-23684 |
| SystemRoot | C:\WINDOWS |
| InstallDate | 1092955707 (2004-08-19 UTC) |

The registered owner name directly ties this computer to the suspect Greg Schardt, matching the individual known to use the alias "Mr. Evil."

## Anti-Virus Scan

ClamAV was run against the full evidence directory (`/evidence/nist-hacking-case`). Both image segments (`4Dell_Latitude_CPi.E01` and `4Dell_Latitude_CPi.E02`) returned **OK** — no virus signatures were detected.

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (version 5.1, build 2600), installed on 2004-08-19, as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`. This ties the computer to the suspect.

**Case Q3:** ClamAV anti-virus scan of both E01 image segments found **no viruses** on the computer. Both files returned "OK" with 0 detections.