ClamAV scanned both E01 segments and reported no detections. I now have all the evidence needed to answer the case questions.

---

# Final Report — NIST Hacking Case (Anti-Virus Check)

## Evidence Summary

- **Evidence**: Dell Latitude CPi notebook, serial # VLQLW — EnCase image `4Dell_Latitude_CPi.E01` / `.E02`
- **Partition layout**: Single NTFS partition starting at sector 63 (approx. 4.5 GB)
- **Filesystem**: 12,545 file entries indexed

## Key Findings

### Operating System
The SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` shows:
- **ProductName**: Microsoft Windows XP
- **CurrentVersion**: 5.1
- **CurrentBuildNumber**: 2600
- **BuildLab**: 2600.xpclient.010817-1148
- **SystemRoot**: C:\WINDOWS

### Registered Owner
The SOFTWARE registry hive `RegisteredOwner` value is **Greg Schardt**, tying this computer directly to the suspect. The `RegisteredOrganization` is "N/A". The `ProductId` is 55274-640-0147306-23684.

### Anti-Virus Scan
ClamAV was run against both segments of the EnCase image (`4Dell_Latitude_CPi.E01` and `4Dell_Latitude_CPi.E02`). Both returned **OK** — no virus signatures were detected.

## Case Questions

**Case Q1:** The operating system was **Windows XP** (version 5.1, build 2600), as recorded in the SOFTWARE registry hive under `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`. This directly ties the computer to the suspect.

**Case Q3:** A ClamAV anti-virus scan was performed on the disk image (both E01 and E02 segments). **No viruses were found** — both files returned clean ("OK") with 0 detections.