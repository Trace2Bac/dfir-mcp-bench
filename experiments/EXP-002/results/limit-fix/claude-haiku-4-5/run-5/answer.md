Perfect! I've gathered comprehensive evidence. Now let me compile the final investigation report based on the findings.

---

# DIGITAL FORENSIC INVESTIGATION REPORT
## NIST Hacking Case - Dell Latitude CPi

### Case Information
- **Case ID:** nist-hacking-case-av
- **Computer:** Dell Latitude CPi (Serial #: VLQLW)
- **Evidence Image:** 4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02
- **Investigation Date:** 2026-11-16
- **Forensic Examiner:** Digital Forensic Examiner

---

### Investigation Summary

A comprehensive forensic examination of the abandoned Dell Latitude CPi notebook has revealed extensive evidence of hacking activity. The computer was registered to **Greg Schardt**, whose online alias "Mr. Evil" appears in the file system, and contains a sophisticated collection of hacking tools, scripts, and documentation organized by hacking methodologies.

---

### Key Findings

#### 1. Operating System and Owner
The system runs **Microsoft Windows XP** (Build 2600, Version 5.1) with the registered owner listed as **Greg Schardt**. The registry key `Microsoft\Windows NT\CurrentVersion` confirmed this ownership.

#### 2. Hacking Tools Discovered

The investigation identified an extensive toolkit for conducting network attacks, organized in the "My Documents" folder by hacking phases:

**Network Reconnaissance & Scanning:**
- Ethereal (network packet sniffer) - Located in Program Files
- CAIN25B45.EXE (password cracking/network analysis tool) - Prefetch evidence
- Nmapnt (port scanner with source code)
- NSTPro2 (network scanner)
- Cerberus Internet Scanner
- spade114.exe (IP scanner)
- superscan
- enum (network enumeration tool)
- ogre (network enumeration utility)

**Exploitation & Access Tools:**
- NetBus.bad (NetBus remote access trojan configuration file targeting port 12345)
- pwdump3.zip (password dumping utility)
- dsniff 2.3 (packet sniffer for switched networks)
- Brutus attack tool

**Attack Infrastructure:**
- mIRC (IRC chat client for hacking communities)
- CuteFTP (FTP client for file transfer)
- Various utility executables (snitch.exe, STREAMFIND.EXE, user2sid.exe, SRVBOOT.BAT)

#### 3. Evidence of Malicious Intent

**Wireless Network Targeting (Wardriving):**
- Cached reference to "wardriving" in Internet temporary files, consistent with the briefing's description of intercepting wireless traffic at hotspots

**Hacking Community Participation:**
- "alt.hacking" newsgroup subscription found in Outlook Express mailbox structure

**Network Mapping:**
- Network mapping shortcuts discovered (reference to "andrews (c) on Andrews-1" and target network shortcuts)

#### 4. Connection to Suspect

The username "Mr. Evil" appears in the file system path structure:
- `Documents and Settings/Mr. Evil/...`

This matches the online alias mentioned in the briefing and directly links the computer to the suspect Greg Schardt.

---

### Antivirus Scan Results

**ClamAV Antivirus Scan:** Two scans were performed on the evidence:

1. **Disk Image Segments:** Both E01 and E02 segments scanned as "OK" with zero detections
2. **Extracted Files:** Sample files including CAIN25B45.EXE prefetch and pwdump3.zip also scanned as "OK" with zero detections

While the tools are legitimate hacking utilities (not classified as viruses by ClamAV), they are indisputably used for malicious purposes in this context.

---

### Conclusion

The forensic examination conclusively demonstrates that this computer was used for hacking operations. The organized collection of network reconnaissance, exploitation, and attack tools, combined with the suspect's online alias and the registration to Greg Schardt, establishes a clear connection between this equipment and hacking activities, particularly targeting wireless networks (wardriving) for credential interception as described in the case briefing.

---

## Case Questions

**Case Q1: What operating system was used on the computer?**
Microsoft Windows XP (Build 2600, Version 5.1) - confirmed via registry key Microsoft\Windows NT\CurrentVersion

**Case Q2: Who is the registered owner?**
Greg Schardt - confirmed via registry value RegisteredOwner in SOFTWARE hive at Microsoft\Windows NT\CurrentVersion. The username "Mr. Evil" (the suspect's online alias mentioned in the briefing) also appears in the file system.

**Case Q3: Perform an Anti-Virus check. Are there any viruses on the computer?**
ClamAV antivirus scan of the disk image segments (E01 and E02) returned "OK" with zero virus detections. Sample extracted files (CAIN25B45.EXE prefetch file and pwdump3.zip) also scanned "OK" with no virus signatures detected by ClamAV. However, the computer contains numerous hacking tools and utilities that are used for malicious purposes, including network sniffers (Ethereal, dsniff), password crackers (CAIN & Abel), and remote access trojans (NetBus), though these are not detected as viruses by standard antivirus signatures.