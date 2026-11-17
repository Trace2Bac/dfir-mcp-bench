I have all the answers I need. Here is the final report.

---

# Digital Forensic Investigation Report

## Case: NIST Hacking Case — Dell Latitude CPi (Serial # VLQLW)

### Evidence Examined
- **Disk Image**: `4Dell_Latitude_CPi.E01` / `.E02` (EnCase format, ~640 MB)
- **Partition Layout**: Single NTFS partition (sectors 63–9,510,479) on a DOS partition table
- **Filesystem**: NTFS, Windows system root at `C:\WINDOWS`

### Registry Findings

From the `SOFTWARE\Microsoft\Windows NT\CurrentVersion` registry key (last written 2004-08-27):

| Field | Value |
|---|---|
| ProductName | Microsoft Windows XP |
| CurrentVersion | 5.1 |
| CurrentBuildNumber | 2600 |
| RegisteredOwner | Greg Schardt |
| RegisteredOrganization | N/A |
| ProductId | 55274-640-0147306-23684 |
| InstallDate | 1092955707 (2004-08-19) |

The registered owner "Greg Schardt" directly ties this computer to the suspect described in the case briefing, who is also known by the online alias "Mr. Evil."

### Anti-Virus Scan Results

ClamAV was run against the evidence files (`4Dell_Latitude_CPi.E01` and `4Dell_Latitude_CPi.E02`). Both returned **OK** with **zero detections**. No viruses or known malware signatures were found in the disk image.

---

## Case Questions

**Case Q1:** The operating system used on the computer was **Microsoft Windows XP** (version 5.1, build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`. This ties the computer to the suspect.

**Case Q3:** ClamAV antivirus scan found **no viruses** on the computer. Both image segments (`4Dell_Latitude_CPi.E01` and `4Dell_Latitude_CPi.E02`) returned clean with 0 detections.