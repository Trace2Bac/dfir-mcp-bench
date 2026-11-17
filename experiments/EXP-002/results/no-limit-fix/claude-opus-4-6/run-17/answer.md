ClamAV scanned both E01 segments with no detections. All three questions are now answered.

---

# Final Report — NIST Hacking Case (Anti-Virus Focus)

## Evidence Summary

- **Evidence**: Dell Latitude CPi notebook disk image (`4Dell_Latitude_CPi.E01` / `.E02`), ~640 MB
- **Serial #**: VLQLW
- **Partition Layout**: Single NTFS partition (sector 63–9,510,479), ~4.6 GB
- **Filesystem**: 12,545 files indexed

## Key Findings

### Operating System
The SOFTWARE registry hive (`Microsoft\Windows NT\CurrentVersion`) shows:
- **ProductName**: Microsoft Windows XP
- **CurrentVersion**: 5.1
- **CurrentBuildNumber**: 2600
- **BuildLab**: 2600.xpclient.010817-1148
- **SystemRoot**: C:\WINDOWS

### Registered Owner
The registry value `RegisteredOwner` under `Microsoft\Windows NT\CurrentVersion` is set to **Greg Schardt**, directly tying this computer to the suspect. The `RegisteredOrganization` is "N/A". The Windows install date decodes to **2004-08-19** (Unix epoch 1092955707).

### Anti-Virus Scan
ClamAV was run against both E01 image segments. **No viruses or malware signatures were detected.** Both files returned "OK" with 0 detections.

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP** (Version 5.1, Build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`. This directly ties the computer to the suspect.

**Case Q3:** ClamAV anti-virus scan of the disk image (both E01 and E02 segments) found **no viruses**. Zero detections were reported; both segments returned clean ("OK").