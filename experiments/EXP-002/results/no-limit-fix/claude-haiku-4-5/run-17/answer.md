## Digital Forensic Investigation Report

**Case ID:** nist-hacking-case-av  
**Evidence:** Dell Latitude CPi Notebook (Serial # VLQLW)  
**Investigation Date:** 2026-11-16

---

## Executive Summary

The Dell Latitude CPi notebook abandoned on 09/20/04 contained extensive evidence of hacking activities. The computer is registered to Greg Schardt, the primary suspect. A comprehensive collection of hacking tools and exploitation software was discovered, organized in systematic directories labeled "FOOTPRINTING," "ENUMERATION," and "EXPLOITATION." The suspect uses the online nickname "Mr. Evil," which is confirmed by a user directory name and email artifacts on the system.

---

## Findings

### 1. Operating System and System Information

Windows XP Professional is installed on the system. The system registry indicates:
- **ProductName:** Microsoft Windows XP
- **CurrentVersion:** 5.1
- **CurrentBuild:** 2600
- **Install Date:** August 27, 2004

### 2. User Account and Ownership

The primary user account is named **"Mr. Evil"** with full name **Greg Schardt** registered as the owner, confirming the direct link between the abandoned computer and the suspect.

### 3. Hacking Tools and Software

The computer contains an extensive collection of hacking and network analysis tools organized in the following structure:

#### Network Reconnaissance/Footprinting Tools:
- **Ethereal** (network packet analyzer/sniffer) - installed in Program Files with plugins and libraries
- **Nmap/Nmapnt** - port scanner with full source code in `My Documents/FOOTPRINTING/NT/Nmapnt/`
- **SuperScan** - port scanning tool in `My Documents/FOOTPRINTING/NT/superscan/`
- **SPADE 1.14** - network scanner (`My Documents/FOOTPRINTING/NT/spade114.exe`)
- **NSTPro2** - network tools (`My Documents/FOOTPRINTING/NT/NSTPro2/`)
- **Look@LAN** - network scanner in Program Files
- **Whois utility** - shortcut in user's Tools folder

#### Exploitation Tools:
- **Dsniff 2.3** - packet sniffer/traffic analyzer in `My Documents/EXPLOITATION/Unix/dsniff 2.3/`
- **Pwdump3** - password hash extraction tool in `My Documents/EXPLOITATION/NT/Pwdump/`
- **Brutus** - password cracking tool in `My Documents/EXPLOITATION/NT/Brutus/`
- **Ogre** - enumeration tool in `My Documents/ENUMERATION/NT/ogre/`

#### Additional Hacking Indicators:
- **Anonymizer software** - installed in Program Files for anonymizing internet activity
- **Cain 2.5B45** - password cracker/recovery tool (execution artifact in Windows Prefetch)
- **Alt.Hacking newsgroup mail** - Outlook Express database file named `alt.hacking.dbx` found in user's email storage
- **"Wardriving" cached files** - references to wardriving techniques in browser cache, consistent with the briefing's mention of parking near wireless hotspots

### 4. Evidence Organization and Intent

The tools are systematically organized in folders labeled with hacking methodology phases:
- **FOOTPRINTING** - initial network reconnaissance
- **ENUMERATION** - system and service enumeration
- **EXPLOITATION** - active attack tools

This organization pattern indicates deliberate preparation for targeted attacks.

### 5. Antivirus Scan Results

**ClamAV Scan Result:** No viruses detected  
Both image segments scanned clean: `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` and `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E02` returned OK status.

**Note:** The absence of virus detections is expected as the tools found are legitimate security research utilities being misused for malicious purposes (network sniffing, password cracking, port scanning), not malware themselves.

---

## Connection to Suspect

Multiple evidence points confirm this computer belonged to the suspect Greg Schardt:
1. Registry shows "Greg Schardt" as RegisteredOwner
2. Primary user account is "Mr. Evil" - the suspect's known online nickname
3. Alt.hacking newsgroup subscription in email
4. Tools and folders consistent with described activities (wireless traffic interception, credential harvesting)

---

## Case Questions

**Case Q1:** What operating system was used on the computer?  
**Answer:** Microsoft Windows XP (version 5.1, build 2600)

**Case Q2:** Who is the registered owner?  
**Answer:** Greg Schardt

**Case Q3:** Perform an Anti-Virus check. Are there any viruses on the computer?  
**Answer:** ClamAV antivirus scan returned no virus detections. However, the computer contains numerous hacking and network analysis tools including Ethereal (packet sniffer), Nmap (port scanner), Dsniff (traffic analyzer), password crackers (Brutus, Pwdump3, Cain), and anonymization software. These are exploitation tools consistent with the suspected hacking activities, not traditional malware.