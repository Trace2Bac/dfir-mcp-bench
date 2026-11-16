ClamAV scanned both E01 segments and returned OK — no viruses detected. I now have all the answers needed.

---

# Forensic Investigation Report — NIST Hacking Case

## Evidence Summary

- **Evidence**: Dell Latitude CPi notebook computer (serial #VLQLW)
- **Disk Image**: `4Dell_Latitude_CPi.E01` / `.E02` (EnCase format, ~640 MB)
- **Partition Layout**: Single NTFS partition (sectors 63–9,510,479)
- **Filesystem**: 12,545 file entries indexed

## Key Registry Findings

From the `SOFTWARE\Microsoft\Windows NT\CurrentVersion` registry key (last written 2004-08-27):

| Field | Value |
|---|---|
| ProductName | Microsoft Windows XP |
| CurrentVersion | 5.1 |
| CurrentBuildNumber | 2600 |
| BuildLab | 2600.xpclient.010817-1148 |
| RegisteredOwner | Greg Schardt |
| RegisteredOrganization | N/A |
| ProductId | 55274-640-0147306-23684 |
| SystemRoot | C:\WINDOWS |
| InstallDate | 1092955707 (2004-08-19) |

The registered owner "Greg Schardt" matches the suspected hacker who goes by the online nickname "Mr. Evil."

## Anti-Virus Scan Results

ClamAV was run against the full evidence directory (`/evidence/nist-hacking-case`), scanning both E01 segments:

- `4Dell_Latitude_CPi.E01`: **OK**
- `4Dell_Latitude_CPi.E02`: **OK**
- **Total detections: 0**

No viruses or malware signatures were identified by ClamAV.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of `SOFTWARE\Microsoft\Windows NT\CurrentVersion`. This directly ties the computer to the suspect.

**Case Q3:** ClamAV anti-virus scan found **no viruses** on the computer. Both image segments (E01 and E02) scanned clean with zero detections.