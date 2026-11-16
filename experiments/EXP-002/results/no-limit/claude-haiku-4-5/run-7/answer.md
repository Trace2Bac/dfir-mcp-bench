---

# DIGITAL FORENSICS INVESTIGATION REPORT
## Case: NIST Hacking Case - Dell CPi Notebook (Serial # VLQLW)

### Investigation Summary
This investigation analyzed the EnCase image of an abandoned Dell CPi notebook found on September 20, 2004. The device was suspected to be used for hacking purposes and potentially tied to suspect Greg Schardt (alias "Mr. Evil"). The investigation examined the system for operating system information, registered ownership, malware presence, and hacking-related artifacts.

### Investigation Methodology
- **Evidence Examined**: /evidence/nist-hacking-case/4Dell_Latitude_CPi.E01 (and E02 segment)
- **Tools Used**: TSK (The Sleuth Kit) for filesystem analysis, Windows Registry parsing, ClamAV antivirus scanning, keyword searching
- **Analysis Period**: Investigation date 2026-11-16

### Key Findings

#### 1. System Configuration
The computer runs **Microsoft Windows XP** with the following specifications:
- **OS**: Microsoft Windows XP
- **Version**: 5.1
- **Build**: 2600 (Build Lab: 2600.xpclient.010817-1148)
- **InstallDate**: August 27, 2004 (Unix timestamp: 1092955707)
- **SystemRoot**: C:\WINDOWS
- **Product ID**: 55274-640-0147306-23684

#### 2. Registered Owner
The Windows registry SOFTWARE hive clearly identifies the **registered owner as: Greg Schardt**

This directly matches the suspect name in the case briefing. The user account on the system is registered as "Greg Schardt" with organization listed as "N/A."

#### 3. User Account Linking to Suspect
Critical evidence ties the computer to the suspect:
- **User Profile**: Documents and Settings/Mr. Evil
  - "Mr. Evil" is the confirmed online alias of Greg Schardt mentioned in the case briefing
  - Desktop folder contains Tools subdirectory with network reconnaissance utilities
  - Start Menu includes Command Prompt shortcuts and network-related programs

#### 4. Evidence of Hacking Software and Use

**A. Network Analysis and Reconnaissance Tools:**
- **Ethereal** (installed in Program Files/Ethereal) - Professional network packet analyzer
  - Ethereal menu shortcuts present in Start Menu
  - Complete installation with plugins and libraries indicating active use
- **Nmap** (My Documents/FOOTPRINTING/NT/Nmapnt) - Network mapping and port scanning tool with full source code
- **SuperScan** (My Documents/FOOTPRINTING/NT/superscan) - Port and network scanner
- **SPADE** (My Documents/FOOTPRINTING/NT/spade114.exe) - Network enumeration tool
- **NSTPro2** (My Documents/FOOTPRINTING/NT/NSTPro2) - Network scanning suite

**B. System Enumeration Tools:**
- **Cerberus Internet Scanner** (My Documents/ENUMERATION/NT) - Network vulnerability scanner with saved scan reports
- **enum** (My Documents/ENUMERATION/NT/enum) - NT system enumeration tool with source code
- **ogre** (My Documents/ENUMERATION/NT/ogre) - Network reconnaissance utility
- **SNITCH.EXE** (My Documents/COMMANDS) - User enumeration tool
- **user2sid.exe** (My Documents/COMMANDS) - SID-to-user conversion tool

**C. Password Cracking and Exploitation Tools:**
- **Brutus** (My Documents/EXPLOITATION/NT/Brutus) - Brute-force password cracking tool with credential files
- **Pwdump** (My Documents/EXPLOITATION/NT/Pwdump) - Windows password hash dumping utility
- **CAIN25B45.EXE** (WINDOWS/Prefetch) - Password cracking tool with evidence of execution

**D. Traffic Interception and Packet Sniffing:**
- **dsniff 2.3** (My Documents/EXPLOITATION/Unix) - Unix packet sniffer for intercepting network traffic and credentials
  - Documentation present: "Switched networks lose security advantage due packet tool"

**E. Anonymity and Privacy Tools:**
- **Anonymizer** (Program Files/Anonymizer) - Web anonymity toolbar with full installation

#### 5. Suspicious User Activity Evidence
- **alt.hacking.dbx** newsgroup file in Outlook Express (Mr. Evil's email client)
  - Indicates subscription to hacking discussion groups
- **Cached wardriving reference** in Internet Explorer temporary files
  - File: "Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/JIRVJY9X/wardriving[1]"
  - Correlates to briefing description of parking vehicles near wireless hotspots
- **Network reconnaissance shortcuts** on Desktop
  - "Shortcut to whois.lnk" in Documents and Settings/Mr. Evil/Desktop/Tools

#### 6. Antivirus Scan Results
**ClamAV Antivirus Scan**: Both disk image segments scanned with result **OK**
- /evidence/nist-hacking-case/4Dell_Latitude_CPi.E01: **OK**
- /evidence/nist-hacking-case/4Dell_Latitude_CPi.E02: **OK**
- **No viruses detected** in the scanned evidence

### Analysis and Conclusions

The forensic examination provides **strong evidence** that this Dell CPi notebook was actively used for hacking activities and can be directly tied to suspect Greg Schardt:

1. **Ownership Confirmation**: The registered owner is definitively Greg Schardt
2. **Alias Confirmation**: The user profile "Mr. Evil" matches the suspect's known online alias
3. **Tool Arsenal**: The computer contains a comprehensive collection of professional hacking tools organized by category (footprinting, enumeration, exploitation)
4. **Intended Purpose**: The structured organization and documentation suggest deliberate use for network reconnaissance, vulnerability assessment, and password cracking
5. **Operational Context**: The cached wardriving references and traffic interception tools align with the briefing description of using wireless hotspots to intercept internet traffic for credential theft
6. **No Malware Infection**: While containing hacking tools, the system itself is not compromised by malware

The computer represents a well-equipped hacking workstation specifically configured with tools for network reconnaissance, enumeration, and credential theft - consistent with the suspect's alleged activities of parking near T-Mobile Hotspots to intercept credit card numbers, usernames, and passwords.

---

## Case Questions

**Case Q1: What operating system was used on the computer?**
Microsoft Windows XP (Version 5.1, Build 2600). The registry value ProductName shows "Microsoft Windows XP" with BuildLab showing "2600.xpclient.010817-1148".

**Case Q2: Who is the registered owner?**
Greg Schardt. The Windows registry SOFTWARE hive at key "Microsoft\Windows NT\CurrentVersion" contains the RegisteredOwner value set to "Greg Schardt".

**Case Q3: Perform an Anti-Virus check. Are there any viruses on the computer?**
No viruses detected. ClamAV antivirus scan of both disk image segments (4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02) returned "OK" with zero detections.