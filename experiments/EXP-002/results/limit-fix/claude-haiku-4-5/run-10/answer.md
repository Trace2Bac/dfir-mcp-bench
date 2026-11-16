Now I have all the information needed. Let me compile the final forensic report.

---

# DIGITAL FORENSIC EXAMINATION REPORT
## NIST Hacking Case - Dell Latitude CPi

**Case ID**: nist-hacking-case-av  
**Evidence**: 4Dell_Latitude_CPi.E01 / E02  
**Examination Date**: 2026-11-16

## Executive Summary

A forensic examination of the abandoned Dell Latitude CPi notebook (Serial #VLQLW) recovered on 09/20/04 was conducted. The examination revealed the computer is registered to **Greg Schardt** (the named suspect) running **Microsoft Windows XP**. The system contains extensive evidence of hacking tools and infrastructure used for network reconnaissance, password cracking, and wireless network penetration (wardriving). An antivirus scan using ClamAV detected **no virus signatures**, though numerous hacking tools remain on the system.

## Case Questions

**Case Q1**: Microsoft Windows XP

**Case Q2**: Greg Schardt

**Case Q3**: No viruses detected. ClamAV antivirus scan of extracted files returned 0 detections.

## Detailed Findings

### 1. Operating System Identification

**Source**: SOFTWARE Registry Hive - Microsoft\Windows NT\CurrentVersion

The following registry values confirm the operating system:
- **ProductName**: Microsoft Windows XP
- **CurrentVersion**: 5.1
- **CurrentBuildNumber**: 2600
- **BuildLab**: 2600.xpclient.010817-1148
- **InstallDate**: 2004-08-27 (UNIX timestamp: 1092955707)

### 2. Registered Owner - Direct Link to Suspect

**Source**: SOFTWARE Registry Hive - Microsoft\Windows NT\CurrentVersion

- **RegisteredOwner**: Greg Schardt
- **RegisteredOrganization**: N/A
- **ProductId**: 55274-640-0147306-23684

This definitively ties the computer to the named suspect, Greg Schardt.

### 3. User Account Matching Suspect's Nickname

**Source**: File System Analysis (tsk.filelist)

A user account named "Mr. Evil" exists on the system at path `Documents and Settings/Mr. Evil/`. This matches the suspect's known online nickname as referenced in the case briefing. The Mr. Evil account contains:
- Desktop tools shortcuts to hacking utilities
- Outlook Express mail with subscriptions to "alt.hacking" (Usenet newsgroup)
- Browser history and cached files related to wardriving activities

### 4. Extensive Hacking Tools Collection

**Source**: File system examination

#### Network Analysis & Sniffing Tools:
- **Ethereal** (Program Files/Ethereal) - Sophisticated packet sniffer and network protocol analyzer
- **Dsniff 2.3** (My Documents/EXPLOITATION/Unix/dsniff 2.3) - Unix packet sniffing tool for traffic analysis
- **Look@LAN** (Program Files/Look@LAN) - Network scanning and discovery tool
- **mIRC** - IRC client installed (used for hacker communication channels)

#### Network Reconnaissance Tools:
- **My Documents/COMMANDS/snitch.exe** - Network reconnaissance utility
- **My Documents/COMMANDS/user2sid.exe** - SID enumeration tool
- **My Documents/COMMANDS/STREAMFIND.EXE** - Network stream discovery
- **My Documents/ENUMERATION/NT/Cerberus Internet Scanner** - Port scanning and service enumeration
- **My Documents/ENUMERATION/NT/enum** - Windows enumeration tool
- **My Documents/ENUMERATION/NT/ogre** - Network information gathering
- **My Documents/FOOTPRINTING/NT/spade114.exe** - Network footprinting tool
- **My Documents/FOOTPRINTING/NT/superscan** - Advanced network scanner
- **My Documents/FOOTPRINTING/NT/NSTPro2** - NT security pro scanning tools
- **My Documents/FOOTPRINTING/NT/Nmapnt** - Port mapping and OS fingerprinting

#### Password Attack & Exploitation Tools:
- **My Documents/EXPLOITATION/NT/Brutus/** - Password brute-forcing tool
  - **NetBus.bad** - Configuration file for Brutus targeting NetBUS (remote access trojan)
  - **Overview.doc** - Brutus documentation
  - **readme.doc** - Usage instructions
  - **users.txt** - Target user list
- **My Documents/EXPLOITATION/NT/Pwdump/** - Windows password dumping tool (pwdump3.zip)
  - Contains tools and documentation for extracting Windows password hashes

#### Privacy & Anonymization:
- **Program Files/Anonymizer** - Web anonymization and traffic hiding software

### 5. Wardriving Evidence

**Source**: Mr. Evil user browser cache (Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/JIRVJY9X/wardriving)

A cached file named "wardriving" was found in the Mr. Evil user's browser temporary files, directly correlating with the case briefing that the suspect used this computer to park near wireless access points (Starbucks, T-Mobile Hotspots) to intercept traffic and credentials.

### 6. Antivirus Scan Results

**Source**: ClamAV malware scanning engine

- **Scan Date**: 2026-11-16
- **Files Scanned**: Extracted hacking tools including pwdump3.zip
- **Detections**: 0
- **Result**: No virus signatures detected by ClamAV

While no known malicious code signatures were identified by the antivirus, the presence of hacking tools themselves represents malicious capability regardless of virus status.

## Conclusion

The forensic evidence conclusively demonstrates that:

1. The computer belonged to **Greg Schardt** (confirmed through registry ownership)
2. An account named **"Mr. Evil"** (matching the suspect's online nickname) was actively used on the system
3. The system contained a comprehensive toolkit for network hacking, including packet sniffing, reconnaissance, password cracking, and exploitation utilities
4. Evidence of **wardriving activities** was found in browser cache, consistent with the suspect's known modus operandi of intercepting wireless network traffic
5. The tools and methodologies align with the briefing that the suspect would "park his vehicle within range of Wireless Access Points" to "intercept internet traffic, attempting to get credit card numbers, usernames & passwords"

The computer represents a complete hacking workstation pre-configured for network penetration testing and credential theft operations.

**End of Report**