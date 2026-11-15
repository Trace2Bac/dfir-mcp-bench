ClamAV scanned both E01 segments with no detections. I now have all the answers needed.

---

# Final Report — NIST Hacking Case (Dell Latitude CPi)

## Summary

A forensic examination was conducted on an EnCase image (`4Dell_Latitude_CPi.E01`/`.E02`) of a Dell CPi notebook computer (serial # VLQLW) found abandoned with wireless hacking equipment. The disk contains a single NTFS partition (sectors 63–9,510,479).

## Key Findings

### Operating System
The SOFTWARE registry hive (`Microsoft\Windows NT\CurrentVersion`) identifies:
- **Product**: Microsoft Windows XP
- **Version**: 5.1, Build 2600
- **Build Lab**: 2600.xpclient.010817-1148
- **System Root**: C:\WINDOWS
- **Product ID**: 55274-640-0147306-23684
- **Install Date**: Epoch 1092955707 (August 19, 2004)

### Registered Owner
The `RegisteredOwner` value in the SOFTWARE hive is **Greg Schardt**, directly tying the suspect to this computer. The `RegisteredOrganization` is listed as "N/A".

### Anti-Virus Scan
ClamAV was run against the full evidence directory (`/evidence/nist-hacking-case`). Both image segments (`4Dell_Latitude_CPi.E01` and `4Dell_Latitude_CPi.E02`) returned **OK** — no viruses or malware signatures were detected.

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP** (Version 5.1, Build 2600), as identified in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion\ProductName`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion\RegisteredOwner`. This directly ties the suspect to the abandoned computer.

**Case Q3:** A ClamAV anti-virus scan of both EnCase image segments found **no viruses**. Both files returned clean (0 detections).