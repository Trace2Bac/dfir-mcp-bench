I now have all the evidence needed. Here is the final report.

---

# Digital Forensic Investigation Report — NIST Hacking Case

## Case Overview

A Dell CPi notebook computer (serial # VLQLW) was found abandoned on 09/20/04 with a wireless PCMCIA card and a homemade 802.11b antenna. The computer is suspected to have been used for wireless hacking, potentially by suspect Greg Schardt (aka "Mr. Evil"). This report documents the findings from forensic analysis of the EnCase image `4Dell_Latitude_CPi.E01`.

## Evidence Analyzed

- **Disk Image**: `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` (640 MB, EnCase format with E02 segment)
- **Partition Layout**: Single NTFS partition starting at sector 63 (~4.5 GB), with a DOS partition table
- **Filesystem**: 12,545 files indexed from the NTFS volume

## Key Findings

### Operating System Identification

The Windows registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`) reveals:
- **ProductName**: Microsoft Windows XP
- **CurrentVersion**: 5.1
- **CurrentBuildNumber**: 2600
- **BuildLab**: 2600.xpclient.010817-1148
- **SystemRoot**: C:\WINDOWS
- **InstallDate**: 1092955707 (August 19, 2004 UTC)

### Registered Owner

The same registry key shows:
- **RegisteredOwner**: Greg Schardt
- **RegisteredOrganization**: N/A
- **ProductId**: 55274-640-0147306-23684

This directly ties the computer to the suspect Greg Schardt.

### Anti-Virus Scan Results

ClamAV was run against the disk image. The result:
```
/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01: OK
```
**0 detections** — ClamAV did not identify any known virus signatures in the disk image.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), installed on August 19, 2004.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion\RegisteredOwner`.

**Case Q3:** A ClamAV anti-virus scan of the disk image returned **no virus detections** (0 infections found). The image file scanned clean ("OK").