I have all the evidence needed to answer the case questions. Here is the final report.

---

# Digital Forensic Report — NIST Hacking Case (Anti-Virus Check)

## Case Overview

A Dell CPi notebook computer (serial # VLQLW) was found abandoned on 09/20/04 along with a wireless PCMCIA card and an external homemade 802.11b antenna. The computer is suspected of being used for hacking purposes and is potentially linked to suspect Greg Schardt (a.k.a. "Mr. Evil").

## Evidence Analyzed

- **Image**: `4Dell_Latitude_CPi.E01` / `.E02` (EnCase format, ~640 MB)
- **Partition Layout**: Single NTFS partition (sectors 63–9,510,479), consistent with a standard Windows installation
- **Filesystem**: NTFS, 12,545 files indexed

## Findings

### Operating System

The SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` reveals:

| Field | Value |
|---|---|
| ProductName | Microsoft Windows XP |
| CurrentVersion | 5.1 |
| CurrentBuildNumber | 2600 |
| BuildLab | 2600.xpclient.010817-1148 |
| SystemRoot | C:\WINDOWS |
| InstallDate | 1092955707 (2004-08-19 UTC) |

The computer was running **Microsoft Windows XP** (Build 2600), installed on August 19, 2004.

### Registered Owner

The same registry key contains:

| Field | Value |
|---|---|
| RegisteredOwner | **Greg Schardt** |
| RegisteredOrganization | N/A |
| ProductId | 55274-640-0147306-23684 |

This directly ties the computer to the suspect **Greg Schardt**.

### Anti-Virus Scan (ClamAV)

ClamAV was run against the entire evidence directory (`/evidence/nist-hacking-case`). Results:

```
/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01: OK
/evidence/nist-hacking-case/4Dell_Latitude_CPi.E02: OK
```

**0 detections.** No viruses or malware signatures were found by ClamAV in the disk image files.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), installed on 2004-08-19. This is confirmed by the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` (ProductName = "Microsoft Windows XP", CurrentVersion = "5.1", CurrentBuildNumber = "2600").

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion\RegisteredOwner`. The registered organization is "N/A". This ties the computer directly to the suspect.

**Case Q3:** A ClamAV anti-virus scan of the evidence image files found **no viruses** (0 detections). Both `4Dell_Latitude_CPi.E01` and `4Dell_Latitude_CPi.E02` returned "OK".