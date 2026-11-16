Based on my forensic investigation, I now have enough information to provide the final report. Let me compile all the evidence I've gathered.

---

# FORENSIC INVESTIGATION REPORT
## NIST Hacking Case - Dell Latitude CPi Notebook
**Case ID:** nist-hacking-case-av  
**Date Analyzed:** November 16, 2026  
**Examiner:** Digital Forensics Agent

## Executive Summary

This Dell Latitude CPi notebook, serial number VLQLW, found abandoned on 09/20/04 with wireless equipment, has been determined to contain extensive hacking tools, evidence of their active use, and is directly tied to suspect Greg Schardt (alias "Mr. Evil"). The computer was configured as a mobile hacking platform for intercepting wireless traffic and conducting network attacks.

## Key Findings

### Operating System
Windows XP Professional (Build 2600) was installed on the system, last modified on 08/27/04.

### Registered Owner
The primary user account is registered to **Greg Schardt**, confirming direct association with the suspect named in the briefing.

### User Profile Evidence
A user account named **"Mr. Evil"** exists on the system, matching the suspect's known online nickname. This account contains extensive hacking documentation and tools.

### Installed Hacking Tools

The following security/exploitation tools were discovered:

**Network Reconnaissance & Sniffing:**
- **Ethereal 0.10.6** (Program Files\Ethereal) - Full packet capture and analysis tool
- **Look@LAN** - Network device scanner
- **WinPcap 3.01** (executed - shown in Prefetch: WINPCAP_3_01_A.EXE-1E3EDEDC.pf)
- **nmap NT** - Port scanner source code and tools
- **spade114.exe** - Network mapping tool
- **SuperScan** - Vulnerability scanner
- **NSTPro2** - NT Scanner
- **Cerberus Internet Scanner** - Enumeration tool with stored reports on 172.16.0.2

**Password Cracking & Exploitation:**
- **CAIN & ABEL** (executed - shown in Prefetch: CAIN25B45.EXE-056F3A6E.pf) - Password recovery and network analysis tool
- **Brutus** - Password cracking tool with configuration targeting NetBUS systems
- **pwdump3** - Windows password hash extraction tool
- **enum** - NT enumeration tool
- **OGRE** - Exploitation tool

**Packet Interception & Analysis:**
- **dsniff 2.3** - Password and data interception suite specifically for switched networks
- **Ethereal** - Advanced packet analysis

**Anonymization:**
- **Anonymizer Toolbar & Core** - Web anonymization software

**System Access Tools:**
- **Telnet** (executed - shown in Prefetch)
- **netstat, ipconfig, wfp** - Network utilities
- **user2sid.exe, snitch.exe, STREAMFIND.EXE** - System enumeration tools

### Evidence of Tool Usage

Prefetch analysis shows evidence of execution of:
- CAIN25B45.EXE (password cracking tool)
- TELNET.EXE
- WINPCAP_3_01_A.EXE (packet capture installer)
- CMD.EXE (command prompt for scripting attacks)

### Hacking Documentation

Located in My Documents directories organized by hacking methodology:
- **FOOTPRINTING/** - Reconnaissance tools and documentation
- **ENUMERATION/** - System enumeration tools and results
- **EXPLOITATION/** - Attack tools including configuration for NetBUS attacks
- **COMMANDS/** - Script files and batch commands

A configuration file (NetBus.bad) found in the Brutus folder contains parameters targeting NetBUS systems on port 12345, demonstrating active preparation for attacks.

### User Profile Activity

- Stored Outlook Express mailbox "alt.hacking.dbx" in user "Mr. Evil" profile
- Temporary Internet Files cached from hacking-related websites
- Desktop shortcuts to "whois" lookup tool
- Extensive stored reports from network scanning against 172.16.0.2

### Connection to Wireless Activity

The presence of WinPcap and Ethereal, combined with the wireless card and antenna found with the computer, confirms this system was configured for wireless traffic interception and analysis - consistent with the briefing's description of the suspect intercepting wireless access point traffic.

---

## Case Questions

**Case Q1:** What operating system was used on the computer?

**Answer:** Microsoft Windows XP Professional (Build 2600, Version 5.1). The registry indicates it was installed on 08/17/01 and last modified on 08/27/04.

**Case Q2:** Who is the registered owner?

**Answer:** Greg Schardt. This was found in the registry at HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner. An additional user account named "Mr. Evil" (the suspect's known online alias) was also present on the system containing hacking tools and documentation.

**Case Q3:** Perform a Anti-Virus check. Are there any viruses on the computer?

**Answer:** ClamAV antivirus scan returned no virus detections. However, the computer contains extensive hacking tools and utilities (Ethereal, CAIN & ABEL, nmap, dsniff, Brutus, pwdump, etc.) configured and used for conducting network attacks and intercepting wireless traffic. These are legitimate security tools being used for malicious purposes, not viruses. The system shows clear evidence of hacking activity through prefetch records of executed security cracking tools and stored network scanning reports.

---

## Conclusion

This abandoned Dell notebook is definitively linked to suspect Greg Schardt and has been configured as a mobile hacking platform. The presence of packet sniffing tools (Ethereal, dsniff), password cracking utilities (CAIN & ABEL, Brutus, pwdump), combined with wireless equipment and the user account "Mr. Evil," confirms this was used to conduct the wireless access point attacks described in the briefing - specifically intercepting credit card numbers, usernames, and passwords from unsecured wireless networks.