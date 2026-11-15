Perfect! I now have comprehensive information. Let me compile the final investigation report.

## FINAL FORENSIC INVESTIGATION REPORT

### Case Information
- **Case ID:** nist-hacking-case-av
- **Evidence:** Dell Latitude CPi Notebook (Serial # VLQLW)
- **Date Acquired:** 2004-09-20
- **Investigation Date:** 2026-11-14

### Executive Summary

Forensic examination of the Dell Latitude CPi notebook computer revealed extensive evidence of hacking activities, directly implicating the suspect Greg Schardt ("Mr. Evil"). The computer contains a comprehensive hacking toolkit organized in the My Documents folder, including network sniffing software (Ethereal, WinPcap, dsniff), password cracking tools (Cain, Brutus, pwdump), network reconnaissance utilities (nmap, Cerberus Internet Scanner, Look@LAN), and exploitation frameworks. The presence of "wardriving" references and wireless packet capture tools aligns with the suspected pattern of intercepting wireless internet traffic at hotspots to obtain credit card numbers, usernames, and passwords.

### Key Findings

#### 1. Hacking Software Installed

**Packet Sniffing & Network Analysis:**
- Ethereal (network protocol analyzer) - installed in Program Files
- WinPcap 3.01 (packet capture library) - Prefetch evidence shows execution
- dsniff 2.3 (Unix packet sniffer for capturing passwords) - located in My Documents/EXPLOITATION/Unix/

**Wireless/Wardriving Tools:**
- Reference to "wardriving[1]" file in Mr. Evil user's temporary internet files
- Look@LAN (network discovery tool) - installed in Program Files
- PCMCIA wireless card and external 802.11b antenna found with computer

**Password Cracking & Brute Force:**
- Cain v2.5 (password cracking/credential harvesting tool) - Prefetch shows CAIN25B45.EXE execution
- Brutus (brute force attack tool) - located in My Documents/EXPLOITATION/NT/Brutus/
- Pwdump (Windows password dumping from SAM) - located in My Documents/EXPLOITATION/NT/Pwdump/

**Network Reconnaissance:**
- nmap/nmapNT (port scanning) - located in My Documents/FOOTPRINTING/NT/Nmapnt/
- Cerberus Internet Scanner - located in My Documents/ENUMERATION/NT/
- SuperScan - located in My Documents/FOOTPRINTING/NT/superscan/
- enum (Windows enumeration tool) - located in My Documents/ENUMERATION/NT/enum/

**Exploitation Tools:**
- OGRE (exploitation framework) - located in My Documents/ENUMERATION/NT/ogre/
- snitch.exe - located in My Documents/COMMANDS/
- user2sid.exe - located in My Documents/COMMANDS/
- dsniff (credential capture) - located in My Documents/EXPLOITATION/Unix/

**Anonymization:**
- Anonymizer software installed in Program Files (browser anonymity tool)
- mIRC (IRC client for communication) - installed with shortcut in Start Menu

#### 2. Evidence Organization

The tools are systematically organized in the suspect's My Documents folder by attack methodology:
- **ARCHIVE** - compression/decompression utilities
- **COMMANDS** - Windows exploitation command-line tools
- **ENUMERATION** - network and system reconnaissance
- **EXPLOITATION** - active attack tools (NT and Unix variants)
- **FOOTPRINTING** - network mapping and service discovery
- **NOVELL** - Novell network exploitation tools

This organized structure suggests deliberate, methodical preparation for network attacks.

#### 3. Suspect Identification

The computer's registered owner is **Greg Schardt**, which directly matches the suspect's real name mentioned in the case briefing. The primary user account on the system is **"Mr. Evil"** - matching the suspect's known online nickname. This creates a direct link between the physical computer, the suspect's identity, and the suspect's online persona.

### Case Questions

**Case Q1: What operating system was used on the computer?**
Microsoft Windows XP (Build 2600, Version 5.1). Confirmed via registry query of HKLM\Software\Microsoft\Windows NT\CurrentVersion showing ProductName="Microsoft Windows XP" and CurrentBuildNumber="2600".

**Case Q2: Who is the registered owner?**
Greg Schardt. Confirmed via registry query of HKLM\Software\Microsoft\Windows NT\CurrentVersion showing RegisteredOwner="Greg Schardt". The primary user account on the system is "Mr. Evil," matching the suspect's known online nickname as referenced in the case briefing.

**Case Q3: Perform an Anti-Virus check. Are there any viruses on the computer?**
ClamAV antivirus scan was executed on the evidence files. The scan results showed status "OK" for both 4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02, indicating no known virus signatures were detected by ClamAV. However, the system contains extensive hacking tools that are used for malicious purposes (packet sniffing, password cracking, network reconnaissance, and exploitation). While these are legitimate tools, they are not classified as "viruses" in the traditional sense. The tools themselves are not self-replicating or automatically executing malware, but rather deliberate penetration testing and attack utilities that the suspect has collected and organized for conducting cyber attacks against wireless networks and internet users.

### Forensic Timeline

- Computer registered and configured: Installation Date shows August 27, 2004
- Tools assembled in My Documents folder: Multiple tools evidenced by file listings
- Computer abandoned: September 20, 2004 (discovery date) - approximately 3 weeks after OS installation
- Prefetch files show execution of: Ethereal, WinPcap, Cain, and other hacking tools

### Conclusion

The forensic evidence conclusively ties this computer to the suspect Greg Schardt ("Mr. Evil"). The systematic collection of packet sniffing tools, password cracking utilities, and wireless network assessment software, combined with the wardriving artifacts and the suspect's registered ownership of the system, demonstrates intent to intercept and compromise wireless network traffic at public hotspots. The tools and organization strongly support the allegations that this computer was used for hacking purposes, specifically targeting the interception of internet traffic to steal credit card numbers, usernames, and passwords from wireless network users.