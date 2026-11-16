Perfect! Now I have all the information needed. Let me compile the final investigative report.

---

# DIGITAL FORENSIC INVESTIGATION REPORT
## Case: NIST Hacking Case - Dell CPi Laptop
### Investigation ID: nist-hacking-case-av
### Date: November 16, 2026

## Executive Summary

This investigation examined the Dell CPi notebook computer (serial # VLQLW) discovered on 09/20/04 with wireless PCMCIA card and homemade 802.11b antenna. The evidence clearly indicates the computer was used for hacking and network intrusion activities. The computer is directly tied to suspect Greg Schardt, who operates under the online nickname "Mr. Evil." Malware was detected on the system.

## Findings

### 1. Hacking Software Identified

The computer contained an extensive collection of hacking tools organized in systematic folders:

**Network Reconnaissance and Scanning Tools:**
- Ethereal (v0.10.6) - Professional network packet sniffer with full protocol analysis capabilities
- dsniff 2.3 - Unix network sniffing toolkit for traffic interception
- Cerberus Internet Scanner - Network scanning and vulnerability assessment
- Superscan - Network port scanner and enumeration tool
- NSTPro2 - Network enumeration framework
- Look@LAN - Network discovery application
- SPADE 1.14 - IP tracking and mapping tool

**Password Cracking and Exploitation Tools:**
- Cain & Abel 2.5 (Prefetch evidence: CAIN25B45.EXE) - Password cracking and network recovery tool
- Brutus - Remote access exploitation tool
- NetBus - Remote system backdoor
- Pwdump3 - Password hash extraction utility
- User2sid.exe - User enumeration tool
- Snitch.exe - System monitoring/trojan

**Enumeration and Exploitation Frameworks:**
- OGRE - Network enumeration
- Enum - Windows enumeration toolkit
- Arj - Archive extraction utilities stored in ARCHIVE folder

**Command and Control Infrastructure:**
- Multiple command execution utilities organized in /COMMANDS directory
- Streamfind.exe - Streaming data capture utility
- Custom batch files for system bootstrap (SRVBOOT.BAT)

### 2. Evidence of Tool Use

Prefetch file analysis reveals execution history of hacking tools:
- CAIN25B45.EXE - Password cracking tool execution
- TELNET.EXE - Remote command execution
- WINPCAP_3_01_A.EXE - Network packet capture driver installation

Browser cache and temporary internet files show research into wardriving techniques and wireless network attack methods.

### 3. Direct Connection to Suspect

**User Account Evidence:**
- System user account "Mr. Evil" exists on the computer - matching suspect's known online alias
- Email artifacts reference "alt.hacking" newsgroup mailbox (alt.hacking.dbx)
- Networked resources accessed: network shares on "Andrews-1" system

**Registry Evidence:**
- Registered Owner: **Greg Schardt** (from HKLM\Software\Microsoft\Windows NT\CurrentVersion)
- Operating System: Windows XP (Build 2600)
- System configured for network monitoring and remote access

**Physical Evidence Correlation:**
- Wireless PCMCIA card and custom 802.11b antenna found with computer support wireless network traffic interception ("wardriving") capability referenced in cached files
- Configuration consistent with parking near Wireless Access Points to intercept traffic

### 4. Malware Detection

**ClamAV Antivirus Scan Results:**
- **Detection Found:** Win.Trojan.Snitch-1
- **File:** snitch.exe (inode 10277, 24,576 bytes)
- **SHA-256:** 42ac6b745abd6ab4895ecab7baa93ec7cbdd618cc9419a1e7f8609f403d3110a
- **Classification:** Windows Trojan - System monitoring/information stealing malware

The Snitch trojan is designed for system surveillance and data exfiltration, consistent with credit card and credential harvesting objectives described in the briefing.

## Technical Specifications

**Operating System Details:**
- Product Name: Microsoft Windows XP
- Version: 5.1
- Build: 2600 (Build Lab: 2600.xpclient.010817-1148)
- Install Date: August 27, 2004 (Unix timestamp: 1092955707)

**System Architecture:**
- Processor Type: Uniprocessor Free

## Correlation Analysis

The tool collection, system configuration, and physical hardware setup form a cohesive picture of an organized hacking operation targeting wireless networks and remote systems:

1. **Wireless Interception Capability:** Custom antenna + PCMCIA wireless card + packet sniffing tools (Ethereal, dsniff)
2. **Credential Harvesting:** Cain & Abel, Snitch trojan, password cracking tools
3. **Target Identification:** Enumeration frameworks (OGRE, Enum, Superscan, NSTPro)
4. **Exploitation Chain:** Brutus, NetBus, remote access tools
5. **Command Infrastructure:** Organized command directories and batch scripts for automated attacks

The presence of "alt.hacking" mailbox and "Mr. Evil" user account directly links this operation to the suspect's known activities.

---

## Case Questions

**Case Q1: What operating system was used on the computer?**
Microsoft Windows XP (Version 5.1, Build 2600)

**Case Q2: Who is the registered owner?**
Greg Schardt. This directly matches the suspect named in the case briefing. Additionally, the system contains a user account named "Mr. Evil," which is the suspect's known online alias, further confirming the computer's association with the suspect.

**Case Q3: Perform an Anti-Virus check. Are there any viruses on the computer?**
Yes. ClamAV detected Win.Trojan.Snitch-1 in snitch.exe (inode 10277). This is a Windows trojan classified as system monitoring/information stealing malware, consistent with the suspected use for harvesting credit card numbers and credentials.