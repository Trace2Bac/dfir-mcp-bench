Based on my investigation of the disk image, I have gathered comprehensive evidence. Let me compile the final forensic report.

---

# NIST HACKING CASE - DIGITAL FORENSIC EXAMINATION REPORT

## Case Information
- **Case ID**: nist-hacking-case-av
- **Evidence**: Dell Latitude CPi (VLQLW) - Serial # VLQLW
- **Date Found**: 09/20/04
- **Found With**: Wireless PCMCIA card and external 802.11b antenna
- **Suspected Use**: Wireless hacking/wardriving with credential interception

## Executive Summary

This examination of the abandoned Dell Latitude CPi notebook reveals extensive evidence of premeditated hacking activity. The computer contains a sophisticated collection of penetration testing and network hacking tools, organized in a structured directory hierarchy by attack phase (footprinting, enumeration, exploitation). The presence of hacking newsgroup data, wardriving evidence, and the "Mr. Evil" user account directly ties the computer to the suspect. The installed hacking toolkit indicates the system was configured specifically for credential theft and network compromise.

## Key Findings

### 1. System Identification
- **Operating System**: Windows XP (Build 2600)
- **Registered Owner**: Greg Schardt
- **Owner Organization**: N/A
- **Install Date**: August 27, 2004
- **Last Registry Write**: August 27, 2004

### 2. Hacking Tools Inventory

The computer contains a comprehensive collection of hacking tools organized by attack type:

**Network Analysis & Packet Capture:**
- Ethereal (Program Files/Ethereal) - packet capture and protocol analysis
- CAIN & Abel (CAIN25B45.EXE in Prefetch) - password recovery and network analysis tool executed on this system
- dsniff 2.3 (My Documents/EXPLOITATION/Unix) - passive network sniffing and credential capture

**Password Attack Tools:**
- Brutus (My Documents/EXPLOITATION/NT/Brutus/) - brute force password cracker with users.txt containing default usernames: admin, administrator, test, guest, root, backup
- Pwdump3 (My Documents/EXPLOITATION/NT/Pwdump/) - Windows password hash extraction tool
- NetBus.bad (My Documents/EXPLOITATION/NT/Brutus/) - known backdoor trojan

**Network Reconnaissance:**
- SuperScan (My Documents/FOOTPRINTING/NT/superscan) - port scanner
- SPADE 114 (My Documents/FOOTPRINTING/NT/spade114.exe) - network enumeration
- NSTPro2 (My Documents/FOOTPRINTING/NT/NSTPro2/) - network security testing
- OGRE (My Documents/ENUMERATION/NT/ogre/) - system enumeration tool
- Enum (My Documents/ENUMERATION/NT/enum/) - system enumeration with source code
- Nmap NT (My Documents/FOOTPRINTING/NT/Nmapnt/) - network mapping utility
- Cerberus Internet Scanner (My Documents/ENUMERATION/NT/Cerberus) - vulnerability scanner with scan reports

**Utility Tools:**
- snitch.exe (My Documents/COMMANDS/) - privilege/security tool
- user2sid.exe (My Documents/COMMANDS/) - user enumeration
- USERLIST.TXT (My Documents/COMMANDS/) - credential lists

**Support Tools:**
- Anonymizer (Program Files/Anonymizer) - network traffic anonymization
- mIRC (Start Menu) - IRC client for hacking community communication

### 3. Evidence of "Mr. Evil" Association

- **User Account**: "Mr. Evil" profile exists in Documents and Settings
- **Hacking Content**: Entire My Documents directory contains hacking tools and tutorials
- **Wardriving Evidence**: File "wardriving[1]" found in Mr. Evil's Temporary Internet Files
- **Hacking Community Access**: alt.hacking.dbx (Outlook Express) newsgroup database for hacking discussions
- **Desktop Tools**: Shortcut to whois utility for reconnaissance

### 4. Attack Phase Organization

Files are organized by standard hacking methodology:
- **FOOTPRINTING/**: Initial network reconnaissance phase
- **ENUMERATION/**: System and service enumeration
- **EXPLOITATION/**: Tools for system compromise
- **COMMANDS/**: Command-line exploitation utilities
- **ARCHIVE/**: Archive utilities for packaging stolen data

### 5. Wireless Hacking Indicators

- Physical evidence: Wireless PCMCIA card and external 802.11b antenna found with computer
- Software evidence: Wardriving-related cached file indicating 802.11 network discovery activity
- Purpose alignment: Tools and data organization consistent with wardriving and wireless credential interception

## Case Questions

**Case Q1: What operating system was used on the computer?**
Microsoft Windows XP (Product Name: "Microsoft Windows XP", Build 2600, ProductName from SOFTWARE registry hive)

**Case Q2: Who is the registered owner?**
Greg Schardt (RegisteredOwner field from SOFTWARE hive, Microsoft\Windows NT\CurrentVersion registry key)

**Case Q3: Perform an Anti-Virus check. Are there any viruses on the computer?**
While a comprehensive ClamAV scan could not be executed against the raw disk image format, the computer contains multiple known hacking tools and utilities commonly classified as malicious or potentially unwanted programs, including NetBus (a known backdoor trojan), CAIN & Abel (unauthorized password recovery tool), and Brutus (unauthorized brute force tool). Additionally, evidence of wardriving activity and organized collection of penetration tools indicates malicious intent. The collection of tools and their organization by attack phase (footprinting, enumeration, exploitation) is consistent with a system configured for network intrusion and credential theft.

## Conclusion

This computer was definitively configured for hacking purposes. The systematic organization of attack tools, the "Mr. Evil" user account matching the suspect's known online nickname, wardriving evidence, and wireless hardware strongly support the theory that this was Greg Schardt's computer used for unauthorized network access, credential interception, and potential system compromise. The computer represents a complete penetration testing toolkit suitable for opportunistic wireless network compromise and credential theft at public hotspots, consistent with the briefing description of Schardt's suspected activities.