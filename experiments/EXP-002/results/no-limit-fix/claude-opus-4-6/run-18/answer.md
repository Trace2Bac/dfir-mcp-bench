ClamAV scan complete — no detections. I now have all the evidence needed to answer the three questions. Here is the final report.

---

# Digital Forensic Investigation Report — NIST Hacking Case

## Case Overview

**Evidence:** Dell Latitude CPi notebook computer (Serial # VLQLW), EnCase image `4Dell_Latitude_CPi.E01` / `.E02`

**Disk Layout:** Single NTFS partition (sector 63–9,510,479), 12,545 files indexed.

---

## Case Questions

**Case Q1:** The operating system used on the computer was **Microsoft Windows XP** (Version 5.1, Build 2600, "Uniprocessor Free"). This was confirmed from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`, which reports `ProductName: Microsoft Windows XP`, `CurrentVersion: 5.1`, `CurrentBuildNumber: 2600`, with `SystemRoot: C:\WINDOWS`.

**Case Q2:** The registered owner is **Greg Schardt**. This was found in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion\RegisteredOwner`. The `RegisteredOrganization` value is "N/A". This directly ties the computer to the suspect named in the case briefing.

**Case Q3:** ClamAV anti-virus scan of the disk image (both E01 and E02 segments) found **no viruses**. Both segments returned "OK" with 0 detections.