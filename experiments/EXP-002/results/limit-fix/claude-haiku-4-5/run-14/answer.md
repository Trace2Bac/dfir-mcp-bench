Now I have gathered all the necessary evidence. Let me prepare the final report.

---

# NIST Hacking Case - Digital Forensic Examination Report

## Executive Summary

A Dell Latitude CPi notebook computer (Serial #VLQLW) was examined to determine its involvement in hacking activities. The investigation revealed extensive evidence of hacking software, malware, and a suspicious user account linked to the suspect. The computer contained a comprehensive hacking toolkit organized by category and evidence directly linking it to wardriving activities.

## System Information

**Operating System:** Microsoft Windows XP  
**Computer Model:** Dell Latitude CPi  
**Serial Number:** VLQLW  
**Partition Configuration:** NTFS filesystem with dual-boot capability (Windows XP and Windows 98)

## Key Findings

### 1. User Account Evidence

The computer contains a user account named **"Mr. Evil"**, which matches the online nickname of the suspect. This account appears to be heavily used for hacking activities, containing:
- Extensive hacking tool collections in My Documents
- Internet cache files showing wardriving-related websites
- Start menu shortcuts to hacking utilities

### 2. Hacking Software Installed

The following penetration testing and hacking tools were found installed or present on the system:

**Packet Analysis/Sniffing Tools:**
- Ethereal (installed in Program Files) - professional packet sniffer for network traffic analysis
- dsniff 2.3 - packet capture and analysis tool for switched networks
- Look@LAN - network reconnaissance tool

**Password Recovery/Exploitation Tools:**
- Cain & Abel (v2.5 B45 - found in Windows Prefetch logs as CAIN25B45.EXE-056F3A6E.pf)
- Brutus - password cracking tool
- pwdump3 - Windows password dumping utility

**Network Enumeration/Scanning Tools:**
- NmapNT - port scanner with source code present
- SuperScan - network vulnerability scanner
- Cerberus Internet Scanner - network scanning utility
- SPADE (Security Parser And Display Engine)
- enum - NT system enumeration tool
- OGRE - network enumeration utility
- NSTPro2 - network scanner

**System Compromise Tools:**
- NetBus - known Trojan horse/remote access tool (found in Brutus documentation directory)

**Anonymization Tools:**
- Anonymizer Toolbar - software designed to hide internet activity and mask user location

**Command-Line Hacking Tools:**
- snitch.exe - **MALWARE DETECTED** (classified as Win.Trojan.Snitch-1)
- user2sid.exe - Windows SID resolution tool
- streamfind.exe - stream analysis utility

### 3. Malware Detection

**ClamAV antivirus scan results:**
- **File:** My Documents/COMMANDS/snitch.exe (inode 10277)
- **Detection:** Win.Trojan.Snitch-1
- **Classification:** Trojan horse malware
- **Status:** Confirmed virus present on system

### 4. Evidence of Wardriving Activity

The suspect's internet browser cache contains a file named "wardriving[1]" in the Mr. Evil user's Temporary Internet Files, indicating:
- Research or educational material on wardriving techniques
- Direct correlation with the briefing statement that Schardt would "park his vehicle within range of Wireless Access Points (like Starbucks and other T-Mobile Hotspots)"
- This finding strongly supports the allegation that the computer was used for intercepting wireless network traffic

### 5. Organized Hacking Toolkit

The My Documents folder contains an organized directory structure indicating deliberate categorization of hacking tools:
- **ARCHIVE** - Archive utilities
- **COMMANDS** - Command-line hacking tools
- **ENUMERATION** - Network reconnaissance tools
- **EXPLOITATION** - Password cracking and remote access tools
- **FOOTPRINTING** - Reconnaissance and scanning tools
- **NOVELL** - Novell network tools

This organization suggests premeditation and systematic use of hacking tools.

### 6. Additional Suspicious Artifacts

- Desktop shortcuts to whois utility (used for domain/IP lookups)
- IRC client (mIRC) configuration files
- Evidence of Outlook Express usage with "alt.hacking.dbx" mailbox files
- Prefetch files showing execution of hacking tools (CAIN, CMD.EXE)

## Connection to Suspect

**Registry Evidence:**
- Computer registered owner: **Greg Schardt** (from HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner)
- Installation Date: August 20, 2004 (approximately 1 month before device discovery on 09/20/04)

**User Account Evidence:**
- Account name "Mr. Evil" directly matches the suspect's known online nickname
- This account contains all the hacking tools and wardriving evidence

## Forensic Analysis Conclusion

The evidence overwhelmingly demonstrates that this Dell CPi notebook was used as a dedicated hacking platform by Greg Schardt (using the "Mr. Evil" alias) for:

1. **Network reconnaissance and scanning** - using nmap, SuperScan, Cerberus, and other enumeration tools
2. **Wireless traffic interception** - via Ethereal packet sniffer, dsniff, and wardriving activity
3. **Password theft** - using Cain & Abel, Brutus, and pwdump
4. **Remote system access** - NetBus Trojan for potential command and control
5. **Activity obfuscation** - Anonymizer software to hide internet activity
6. **Credential harvesting** - combination of tools designed to capture usernames, passwords, and credit card information from network traffic

The presence of organized, categorized hacking tools, malware, and direct evidence of wardriving activity links this computer directly to the suspect and corroborates the allegation that Schardt was using the device to intercept internet traffic and steal credentials.

---

## Case Questions

**Case Q1:** Microsoft Windows XP (Version 5.1, Build 2600)

**Case Q2:** Greg Schardt

**Case Q3:** Yes, the computer contains malware. ClamAV antivirus scan detected Win.Trojan.Snitch-1 in the file My Documents/COMMANDS/snitch.exe (inode 10277). Additionally, evidence of multiple malicious tools including Cain & Abel, Brutus, pwdump, NetBus, and dsniff was found, indicating use of hacking and exploitation software.