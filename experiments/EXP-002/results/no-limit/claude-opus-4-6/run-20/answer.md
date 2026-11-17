I have all the information needed to answer the case questions. Let me compile the final report.

---

# Digital Forensic Investigation Report — NIST Hacking Case

## Case Overview

**Evidence:** Dell CPi notebook computer (Serial # VLQLW), found abandoned on 09/20/04 with a wireless PCMCIA card and external homemade 802.11b antenna.

**Disk Image:** `4Dell_Latitude_CPi.E01` / `.E02` (640 MB, EnCase format)

**Partition Layout:** Single NTFS partition (sectors 63–9,510,479), ~4.5 GB

## Key Findings

### Operating System
The SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` confirms:
- **ProductName:** Microsoft Windows XP
- **CurrentVersion:** 5.1
- **CurrentBuildNumber:** 2600
- **BuildLab:** 2600.xpclient.010817-1148
- **SystemRoot:** C:\WINDOWS
- **Install Date:** August 19, 2004 (Unix epoch 1092955707)

### Registered Owner
The same registry key identifies:
- **RegisteredOwner:** Greg Schardt
- **RegisteredOrganization:** N/A
- **ProductId:** 55274-640-0147306-23684

This directly ties the computer to the suspect Greg Schardt.

### Anti-Virus / Malware Scan
ClamAV was run against the entire evidence directory (`/evidence/nist-hacking-case`). Results:
- `4Dell_Latitude_CPi.E01`: **OK** (clean)
- `4Dell_Latitude_CPi.E02`: **OK** (clean)
- **Detections: 0**

No viruses or known malware signatures were detected by ClamAV.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as recorded in the SOFTWARE registry hive under `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`. This ties the computer to the suspect.

**Case Q3:** A ClamAV anti-virus scan of the full disk image (both E01 and E02 segments) returned **no virus detections** (0 detections). Both segments scanned clean.