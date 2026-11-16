I now have all the information needed to answer every question. Here is the final report.

---

# Digital Forensic Investigation Report — NIST Hacking Case

## Evidence Summary

- **Evidence**: Dell Latitude CPi notebook computer (serial # VLQLW), EnCase image in two segments (`4Dell_Latitude_CPi.E01` / `.E02`), totaling ~640 MB
- **Disk Layout**: Single NTFS partition (slot 000:000) starting at sector 63, spanning ~4.87 GB
- **Filesystem**: NTFS, 12,545 file entries indexed

## Key Findings

### Operating System
The registry key `SOFTWARE\Microsoft\Windows NT\CurrentVersion` reveals:
- **ProductName**: Microsoft Windows XP
- **CurrentVersion**: 5.1
- **CurrentBuildNumber**: 2600
- **BuildLab**: 2600.xpclient.010817-1148
- **SystemRoot**: C:\WINDOWS
- **Install Date**: August 19, 2004 (Unix timestamp 1092955707)

### Registered Owner
The registry key `SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner` is set to **Greg Schardt**, directly tying the computer to the suspect named in the case briefing. The `RegisteredOrganization` value is "N/A".

### Anti-Virus Scan
ClamAV was run against both E01 image segments. Both files returned **OK** — no virus signatures were detected.

```
/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01: OK
/evidence/nist-hacking-case/4Dell_Latitude_CPi.E02: OK
```

---

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP** (Version 5.1, Build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`. This directly ties the computer to the suspect.

**Case Q3:** ClamAV anti-virus scan of the disk image (both E01 and E02 segments) found **no viruses** — both files returned clean (0 detections).