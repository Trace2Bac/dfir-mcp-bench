I have all the information needed to answer the three case questions. Here is the final report.

---

# Forensic Investigation Report — NIST Hacking Case

## Case Overview

A Dell CPi notebook computer (serial # VLQLW) was found abandoned with a wireless PCMCIA card and an external homemade 802.11b antenna. The computer is suspected of being used for wireless hacking and interception of internet traffic. The disk image (`4Dell_Latitude_CPi.E01` / `.E02`) was analyzed.

## Evidence Analyzed

- **Disk Image:** `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` (640 MB, EnCase format, two segments)
- **Partition Layout:** Single NTFS partition (sectors 63–9,510,479), plus small unallocated regions
- **Filesystem:** 12,545 files indexed from the NTFS volume

## Registry Findings

From the `SOFTWARE\Microsoft\Windows NT\CurrentVersion` registry key (last written 2004-08-27):

| Value | Data |
|---|---|
| **ProductName** | Microsoft Windows XP |
| **CurrentVersion** | 5.1 |
| **CurrentBuildNumber** | 2600 |
| **RegisteredOwner** | Greg Schardt |
| **RegisteredOrganization** | N/A |
| **ProductId** | 55274-640-0147306-23684 |
| **SystemRoot** | C:\WINDOWS |
| **InstallDate** | 1092955707 (2004-08-19 UTC) |

The registered owner, **Greg Schardt**, directly matches the hacking suspect named in the case briefing.

## Anti-Virus Scan Results

ClamAV was run against the entire evidence directory (both E01 and E02 segments). Results:

```
/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01: OK
/evidence/nist-hacking-case/4Dell_Latitude_CPi.E02: OK
```

**0 detections** — no viruses or malware signatures were identified by ClamAV.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (version 5.1, build 2600), as identified in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`. This ties the computer to the suspect named in the case briefing.

**Case Q3:** ClamAV anti-virus scan of the disk image found **no viruses** (0 detections). Both image segments (E01 and E02) returned clean.