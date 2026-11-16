Now I have all the evidence needed. Let me compile the final forensic report.

---

# DIGITAL FORENSIC EXAMINATION REPORT
## NIST Hacking Case - Dell Latitude CPi

**Case ID:** nist-hacking-case-av  
**Evidence:** 4Dell_Latitude_CPi.E01  
**Date of Examination:** 2026-11-16  
**Examiner:** Digital Forensic Analyst

---

## EXECUTIVE SUMMARY

This investigation examined a Dell Latitude CPi notebook computer (Serial: VLQLW) suspected of being used for hacking purposes. The examination has successfully tied the computer to the suspect Greg Schardt (online nickname "Mr. Evil") and uncovered extensive evidence of malicious software, hacking tools, and evidence of use for network reconnaissance and password capture activities.

---

## FINDINGS

### 1. SYSTEM INFORMATION

The computer is running **Microsoft Windows XP**, as confirmed by registry entries in the SOFTWARE hive:
- **Product Name:** Microsoft Windows XP
- **Version:** 5.1  
- **Build Number:** 2600
- **Installation Date:** August 27, 2004
- **Computer Name:** N-1A9ODN6ZXK4LQ

### 2. SUSPECT IDENTIFICATION

**Registered Owner:** Greg Schardt (found in HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner)

**Supporting Evidence:**
- User account "Mr. Evil" exists on the system (matching suspect's online nickname mentioned in briefing)
- Files cached in Documents and Settings/Mr. Evil/ directory
- References to "wardriving" activities in browser cache, consistent with the suspected activity of intercepting wireless traffic while stationed near hotspots

### 3. HACKING SOFTWARE DISCOVERED

The following network analysis, password recovery, and hacking tools were found installed on the system:

#### Network Sniffing & Packet Capture Tools:
- **Ethereal** - Professional packet sniffer/network analyzer (found in Program Files/Ethereal/)
- **Ethereal.lnk** - Shortcut in Start Menu indicating active use
- **WinPcap 3.01** - Packet capture library (WINPCAP_3_01_A.EXE prefetch evidence)
- **dsniff 2.3** - Network packet sniffing and password capture tool (My Documents/EXPLOITATION/Unix/dsniff 2.3/)
- **Look@LAN** - Network discovery tool (Program Files/Look@LAN/)

#### Password Recovery & Cracking Tools:
- **Cain 2.5 B45** - Password recovery and sniffing tool (CAIN25B45.EXE prefetch evidence, Inode 9968)
- **Brutus** - Password cracking tool (My Documents/EXPLOITATION/NT/Brutus/)
- **Pwdump3** - Windows password dumping utility (My Documents/EXPLOITATION/NT/Pwdump/pwdump3.zip)

#### Enumeration & Exploitation Tools:
- **Cerberus Internet Scanner** - Network enumeration (My Documents/ENUMERATION/NT/)
- **enum** - NT enumeration tool with source code (My Documents/ENUMERATION/NT/enum/)
- **ogre** - System enumeration tool (My Documents/ENUMERATION/NT/ogre/ogre.ex_)

#### Utility/Command Tools:
- **snitch.exe** - Command utility (My Documents/COMMANDS/snitch.exe, Inode 10277)
- **STREAMFIND.EXE** - Stream analysis tool (My Documents/COMMANDS/STREAMFIND.EXE)
- **user2sid.exe** - SID enumeration tool (My Documents/COMMANDS/user2sid.exe)
- **Anonymizer** - Browser anonymization tool (Program Files/Anonymizer/)
- **NetMeeting** - Remote access capability

### 4. ANTI-VIRUS SCAN RESULTS

**ClamAV Antivirus Examination:** A scan of extracted executable files detected the following virus:

**DETECTION FOUND:**
- **File:** My Documents/COMMANDS/snitch.exe (Inode 10277)
- **Virus Name:** Win.Trojan.Snitch-1
- **File Size:** 24,576 bytes
- **SHA-256:** 42ac6b745abd6ab4895ecab7baa93ec7cbdd618cc9419a1e7f8609f403d3110a

The Snitch trojan is a malicious program capable of capturing and transmitting sensitive information.

### 5. ORGANIZED HACKING INFRASTRUCTURE

Evidence indicates the suspect maintained a highly organized system for conducting hacking operations, with structured directories:
- **My Documents/COMMANDS/** - Command-line hacking utilities
- **My Documents/ENUMERATION/** - Network scanning and reconnaissance tools
- **My Documents/EXPLOITATION/** - Password cracking and network interception tools
- **My Documents/ARCHIVE/** - Archive utilities for tool management

### 6. EVIDENCE OF WARDRIVING ACTIVITY

Cached Internet file found in Mr. Evil's profile:
- **File:** Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/JIRVJY9X/wardriving[1]

This is consistent with the briefing description of the suspect parking near wireless access points (Starbucks, T-Mobile Hotspots) to intercept internet traffic and capture credentials.

---

## CASE QUESTIONS

**Case Q1: What operating system was used on the computer?**  
Microsoft Windows XP (Version 5.1, Build 2600), as confirmed by the ProductName value in HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion.

**Case Q2: Who is the registered owner?**  
Greg Schardt, as confirmed by the RegisteredOwner value in HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion.

**Case Q3: Perform a Anti-Virus check. Are there any viruses on the computer?**  
Yes. ClamAV antivirus scan detected Win.Trojan.Snitch-1 in the file My Documents/COMMANDS/snitch.exe. The Snitch trojan is a malicious program used for stealing and transmitting sensitive information, consistent with the suspect's suspected criminal activity of intercepting credit card numbers, usernames, and passwords.

---

## CONCLUSION

The forensic examination has established that the abandoned Dell Latitude CPi computer was definitively owned and used by Greg Schardt (suspect "Mr. Evil"). The computer contains extensive evidence of intentional hacking activities including:

1. Multiple professional-grade network sniffing and password capture tools
2. Password cracking and enumeration utilities
3. A trojan virus (Win.Trojan.Snitch-1) used for credential theft
4. Organized directory structure indicating systematic hacking operations
5. Evidence of wardriving activity consistent with intercepting wireless traffic

This computer was unquestionably used for the hacking and credential interception activities described in the case briefing, and provides strong evidence linking the suspect to the abandoned computer and its malicious use.