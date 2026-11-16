Now I have all the information needed for the final report. Let me compile the findings.

---

# DIGITAL FORENSIC EXAMINATION REPORT
## NIST Hacking Case - Dell Latitude CPi (Serial # VLQLW)

### Case Information
- **Case ID:** nist-hacking-case-av
- **Evidence:** 4Dell_Latitude_CPi.E01 / 4Dell_Latitude_CPi.E02
- **Discovery Date:** 2004-09-20
- **Examination Date:** 2026-11-16

### Executive Summary

This report documents the forensic examination of an abandoned Dell Latitude CPi notebook computer suspected of being used for hacking purposes. The examination has confirmed the presence of hacking software, evidence of their use, and malware infections. The computer has been successfully tied to the suspect Greg Schardt through user account identification and his online alias "Mr. Evil."

### Findings

#### 1. Operating System Identification
The computer was running **Microsoft Windows XP** (Version 5.1, Build 2600). This was confirmed through registry analysis of the SOFTWARE hive, specifically the Windows NT CurrentVersion key, which also provided the system installation date of August 27, 2004.

#### 2. Registered Owner
Registry analysis confirmed the registered owner is **Greg Schardt**. This was extracted from the SOFTWARE hive at the key path `Microsoft\Windows NT\CurrentVersion\RegisteredOwner`. The organization name was listed as "N/A."

#### 3. Account Profile Analysis
A user profile named **"Mr. Evil"** exists on the system in the Documents and Settings folder. This profile directly corresponds to the online nickname mentioned in the case briefing and ties Greg Schardt (the registered owner) to the suspected hacking activities. Within this profile, evidence of hacking-related communications was found, including an Outlook Express mail folder containing "alt.hacking.dbx," indicating participation in hacking discussion forums.

#### 4. Hacking Tools Identified
The following hacking tools were discovered on the system:

**Network Analysis/Sniffing Tools:**
- Ethereal (v0.10.6) - Professional network packet analyzer/sniffer
- dsniff 2.3 - Packet sniffing tool for Unix networks
- Look@LAN - Network discovery tool

**Password/Credential Recovery Tools:**
- Cain & Abel (v2.5) - Password recovery and network sniffing tool
- pwdump3 - Windows password dumping utility
- Brutus - Password cracking/brute force tool

**Network Enumeration/Scanning Tools:**
- nmap (NT version with source code) - Network mapping and service enumeration
- SPADE114 - Network discovery tool
- SuperScan - Network scanning tool
- NSTPro2 - Network scanning utility
- Cerberus Internet Scanner - Service vulnerability scanner
- enum - Windows enumeration tool
- OGRE - Network resource enumeration tool

**Trojan/Backdoor Tools:**
- snitch.exe - Trojan found in My Documents/COMMANDS/

**Supporting Utilities:**
- User2SID, snitch.exe, streamfind.exe - System enumeration tools

#### 5. Anti-Virus Scan Results

**CRITICAL FINDING: Malware Detected**

ClamAV antivirus scanning of extracted files detected malware:
- **File:** snitch.exe
- **Location:** My Documents/COMMANDS/snitch.exe
- **Detection:** Win.Trojan.Snitch-1
- **Type:** Trojan

This trojan tool is classified as malware and represents a significant security threat.

#### 6. Evidence of Activity

Several indicators demonstrate active use of the hacking tools and suspicious activity:

- **Prefetch files** show execution history of hacking tools including CAIN.EXE, indicating the tools were actually executed on this system
- **Temporary Internet Files** contain a file named "wardriving[1]" in the Mr. Evil profile, directly correlating to the suspected activity described in the case briefing (parking near wireless access points to intercept traffic)
- **Well-organized hacking toolkit** organized in My Documents folder structure with separate directories for COMMANDS, ENUMERATION, EXPLOITATION, and FOOTPRINTING activities
- **IRC and forum activity** via Outlook Express alt.hacking newsgroup communications

### Connection to Suspect

The evidence strongly ties this computer to the suspect Greg Schardt (online alias "Mr. Evil"):
1. Greg Schardt is the registered owner of the computer
2. A user profile named "Mr. Evil" exists on the system (matching the suspect's known alias)
3. The "Mr. Evil" profile contains alt.hacking.dbx emails from hacking discussion forums
4. Wardriving activity evidence aligns with the suspect's known modus operandi
5. Comprehensive hacking toolkit organized for targeted attacks on wireless networks and systems
6. Malware/trojan detected on the system

---

## Case Questions

**Case Q1:** What operating system was used on the computer?

Case Q1: The computer was running Microsoft Windows XP (Version 5.1, Build 2600), confirmed through registry analysis of the SOFTWARE hive at key path Microsoft\Windows NT\CurrentVersion.

**Case Q2:** Who is the registered owner?

Case Q2: Greg Schardt is the registered owner, as confirmed by the RegisteredOwner value in the SOFTWARE hive at Microsoft\Windows NT\CurrentVersion. A user profile named "Mr. Evil" on the system directly ties the registered owner to the suspect's known online alias.

**Case Q3:** Perform an Anti-Virus check. Are there any viruses on the computer?

Case Q3: Yes, ClamAV antivirus detected malware on the computer. Specifically, the file snitch.exe located at My Documents/COMMANDS/snitch.exe was detected as Win.Trojan.Snitch-1, which is a Trojan trojan classified as malicious software.