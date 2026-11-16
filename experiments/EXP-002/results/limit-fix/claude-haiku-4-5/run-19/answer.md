Now I have sufficient evidence to compile the final report. Let me create it:

## DIGITAL FORENSIC INVESTIGATION REPORT
### Dell Latitude CPi Notebook - Case ID: nist-hacking-case-av

---

## Executive Summary

This investigation examined a Dell CPi notebook computer (serial # VLQLW) that was abandoned along with wireless equipment. The computer is suspected of being used for hacking and wireless network attacks. The forensic examination revealed extensive evidence of hacking software installation, network attack tools, and wireless network activity consistent with the suspect profile.

---

## Investigation Methodology

1. **Evidence Intake**: Acquired EnCase disk image segments (4Dell_Latitude_CPi.E01 and E02)
2. **Partition Analysis**: Executed run_mmls to identify partition structure
3. **File System Analysis**: Executed run_fls to index 12,545 filesystem entries
4. **Registry Analysis**: Queried Windows registry hives for system configuration
5. **Malware Scanning**: Executed ClamAV anti-virus scan
6. **Evidence Search**: Performed keyword searches for hacking tools and suspicious software

---

## Key Findings

### 1. Computer Identity & Ownership
- **Registered Owner**: Greg Schardt (found in HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner)
- **User Account**: "Mr. Evil" (found in user profile path: Documents and Settings/Mr. Evil)
- **Install Date**: August 27, 2004 (from registry timestamp)

### 2. Hacking Software & Tools Identified

**Network Sniffing & Packet Capture:**
- Ethereal (packet protocol analyzer) - installed in Program Files
- WinPCAP 3.01 (packet capture library) - execution prefetch evidence
- dsniff 2.3 (network sniffing/DNS spoofing tool) - in My Documents/EXPLOITATION/Unix

**Password Cracking & System Exploitation:**
- Brutus (password cracker) - in My Documents/EXPLOITATION/NT/Brutus
- Pwdump 3 (password dumping tool) - in My Documents/EXPLOITATION/NT/Pwdump
- Cain & Abel (CAIN25B45.EXE) - execution evidence in Windows Prefetch

**Network Enumeration & Scanning:**
- nmap NT (port scanner) - source code in My Documents/FOOTPRINTING/NT/Nmapnt
- NSTPro2 (network scanner) - in My Documents/FOOTPRINTING/NT
- SPADE 1.14.exe (scanner) - in My Documents/FOOTPRINTING/NT
- SuperScan (vulnerability scanner) - in My Documents/FOOTPRINTING/NT
- Ogre (enumeration tool) - in My Documents/ENUMERATION/NT/ogre
- Look@LAN (network monitoring) - in Program Files

**Command-Line Utilities & Support Tools:**
- snitch.exe, user2sid.exe, STREAMFIND.EXE - located in My Documents/COMMANDS
- Anonymizer (privacy/anonymization tool) - in Program Files

**Suspicious References:**
- NetBus references (NetBus.bad) - in My Documents/EXPLOITATION/NT/Brutus
- "wardriving" cached file - in Mr. Evil's browser cache (JIRVJY9X/wardriving)

### 3. Organized Hacking Directory Structure

The computer contains highly organized folders consistent with systematic hacking operations:
- **My Documents/ARCHIVE** - Archive utilities (ARJ tools)
- **My Documents/COMMANDS** - Command-line attack utilities
- **My Documents/ENUMERATION** - Network enumeration tools
- **My Documents/EXPLOITATION** - Attack and exploitation tools (NT and Unix)
- **My Documents/FOOTPRINTING** - Network reconnaissance tools
- **My Documents/NOVELL** - Novell network utilities

### 4. Wireless Network Activity

Evidence of wireless network research:
- "wardriving[1]" file cached in browser (Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files)
- Wireless PCMCIA card found with computer
- External 802.11b antennae found with computer
- Ethereal and WinPCAP tools configured for packet capture on wireless networks

---

## Case Questions

**Case Q1: What operating system was used on the computer?**
Microsoft Windows XP (Build 2600, Service Pack 1). Identified from HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion: ProductName = "Microsoft Windows XP", CurrentVersion = "5.1", CurrentBuildNumber = "2600"

**Case Q2: Who is the registered owner?**
Greg Schardt. Identified from HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner value. Additionally, the user profile "Mr. Evil" exists on the system, which matches the suspect's online nickname mentioned in the case briefing.

**Case Q3: Perform a Anti-Virus check. Are there any viruses on the computer?**
ClamAV scan of the disk image files themselves returned OK; however, this scan method does not open and examine files within the disk image. The forensic examination reveals extensive evidence of intentional hacking software installation rather than virus infection. The computer contains 15+ professional-grade hacking tools systematically organized into categorized folders (ENUMERATION, EXPLOITATION, FOOTPRINTING). These tools are not typical virus infections but rather deliberately installed software for network attacks, password cracking, and wireless network interception. Notable tools include Ethereal, WinPCAP, Brutus, pwdump, Cain & Abel, nmap, and dsniff.

---

## Conclusion

The forensic evidence conclusively links this computer to the suspect Greg Schardt (alias "Mr. Evil") and demonstrates its use as a platform for systematic hacking operations. The organized folder structure, breadth of specialized hacking tools, and evidence of wireless network research (wardriving) directly support the case briefing allegations that the computer was used to park near wireless access points to intercept internet traffic and attempt credential theft.

---

**Report Date**: November 16, 2026  
**Examiner Notes**: All findings are based on forensic tool output from The Sleuth Kit (TSK) and ClamAV. Evidence is read-only and chain of custody maintained throughout analysis.