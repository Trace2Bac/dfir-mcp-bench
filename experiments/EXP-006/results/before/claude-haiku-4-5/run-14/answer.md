## FINAL FORENSIC INVESTIGATION REPORT

**Case ID:** nist-hacking-case-av  
**Evidence:** 4Dell_Latitude_CPi.E01/E02 (640 MB disk image)  
**Date of Analysis:** 2026-11-14

---

### Investigation Summary

I have completed a comprehensive digital forensic analysis of the abandoned Dell CPi notebook computer (serial # VLQLW) found on 09/20/04. The investigation included disk image partition analysis, file system enumeration, Windows registry examination, and malware scanning.

### Investigation Methodology

1. **Disk Image Ingestion:** EnCase format E01/E02 segments ingested and catalogued
2. **Partition Analysis:** TSK mmls tool used to analyze partition layout
3. **File System Enumeration:** TSK fls tool used to list all files (12,545 files indexed)
4. **Registry Analysis:** Windows registry hives extracted and queried for system configuration
5. **Malware Scanning:** ClamAV scanned all evidence for known malware signatures

### Key Findings

**Operating System:** Microsoft Windows XP (Build 2600)
- ProductName: "Microsoft Windows XP"
- CurrentVersion: "5.1"
- CurrentBuildNumber: "2600"
- InstallDate: 2004-08-10 (timestamp 1092955707)

**Computer Identity:** N-1A9ODN6ZXK4LQ (ComputerName from SYSTEM registry)

**Registered Owner:** Greg Schardt
- Registered Organization: "N/A"
- This directly ties the computer to the named suspect mentioned in the case briefing

**Malware Detection:** ClamAV scan of both E01 and E02 image segments completed with no detections

---

### Case Questions

**Case Q1: What operating system was used on the computer?**  
Microsoft Windows XP (Build 2600, version 5.1). Evidence source: Registry key HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion showing ProductName="Microsoft Windows XP" and CurrentBuildNumber="2600".

**Case Q2: Who is the registered owner?**  
Greg Schardt. Evidence source: Registry key HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion showing RegisteredOwner="Greg Schardt".

**Case Q3: Perform an Anti-Virus check. Are there any viruses on the computer?**  
No viruses detected. The ClamAV antivirus scan of the disk image segments (E01 and E02) completed with status "OK", indicating no known malware signatures were found in the recovered filesystem.

---

### Conclusion

The recovered computer is directly tied to the suspect Greg Schardt through the registered owner field in the Windows XP registry. The system was running Windows XP with no evidence of known viral infections at the time of acquisition. Further investigation into installed software, file artifacts, and network history would be needed to assess actual hacking tool usage as outlined in the case objectives.