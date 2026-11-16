Based on my comprehensive investigation of the evidence, I now have sufficient information to compile the final report. Let me create the complete forensic analysis.

---

# FORENSIC INVESTIGATION REPORT
## NIST Hacking Case - Dell Latitude CPi Notebook (Serial: VLQLW)

### Case Information
- **Case ID:** nist-hacking-case-av
- **Evidence Source:** 4Dell_Latitude_CPi.E01/E02 (640 MB disk image)
- **Examination Date:** 2026-11-16
- **Operating System:** Microsoft Windows XP

### Executive Summary

This investigation examined an abandoned Dell Latitude CPi notebook computer suspected of being used for hacking purposes. The computer was found with a wireless PCMCIA card and homemade 802.11b antenna. The investigation reveals extensive evidence of organized hacking activities on this device, directly linking it to the suspect Greg Schardt (online alias "Mr. Evil").

### Key Findings

#### 1. System Ownership - Direct Link to Suspect

The Windows registry SOFTWARE hive confirms:
- **Registered Owner:** Greg Schardt
- **Organization:** N/A
- **Product Name:** Microsoft Windows XP
- **Installation Date:** August 27, 2004
- **Active User Account:** "Mr. Evil" (matches the suspect's known online nickname)

#### 2. Comprehensive Hacking Toolkit

The computer contains a highly organized and extensive collection of hacking tools organized by attack phase:

**Footprinting/Reconnaissance Tools:**
- Spade114.exe (network scanner)
- NSTPro2 (NT network scanning)
- Superscan (port scanning)
- Nmapnt with full source code (comprehensive port mapper)
- Look@LAN (network discovery)

**Enumeration Tools:**
- Cerberus Internet Scanner (with scan reports showing target: 172.16.0.2)
- OGRE enumeration tool

**Exploitation Tools:**
- Brutus (brute-force password cracker) with target lists (NetBus.bad, users.txt)
- Pwdump3 (Windows password hash dumper) with documentation
- dsniff 2.3 (packet sniffer and password interceptor for Unix/Linux)

**Network Analysis & Interception:**
- Ethereal (network packet sniffer) - fully installed at Program Files/Ethereal/
- Cain & Abel (password cracking and traffic analysis) - evidence from Prefetch files

**Wireless Network Attacks:**
- Browser cache evidence of wardriving searches
- Wireless PCMCIA card and external 802.11b antenna (found with the computer)
- Interest in wireless access point enumeration

**Support Utilities:**
- Anonymizer (web privacy/anonymization tool)
- Various command-line exploitation utilities (user2sid.exe, snitch.exe, STREAMFIND.EXE)
- Archive tools (ARJ)

#### 3. Evidence of Malicious Intent

Located in "My Documents" organized as:
- `My Documents/FOOTPRINTING/` - reconnaissance phase
- `My Documents/ENUMERATION/` - target enumeration phase
- `My Documents/EXPLOITATION/` - exploitation tools and target lists
- `My Documents/COMMANDS/` - operational support tools with USERLIST.TXT
- `My Documents/NOVELL/` - Novell network-specific exploits
- `My Documents/ARCHIVE/` - compression tools

#### 4. User Activity Evidence

- **Outlook Express subscription to alt.hacking newsgroup** - Direct interest in hacking community
- **Desktop shortcuts to hacking tools** - Quick access to "Tools" folder
- **WHOIS tool shortcuts** - For domain/IP reconnaissance
- **Prefetch execution history** showing multiple tool executions:
  - CAIN25B45.EXE (Cain & Abel)
  - CMD.EXE (command-line access)
  - CUTE3032.EXE (network tool)

#### 5. Scanning Activity Evidence

Cerberus Internet Scanner reports found showing:
- Scans of network 172.16.0.0/16 address space
- Port scanning results (HTML reports)
- Service enumeration data

### Antivirus Scan Results

**ClamAV Malware Scan:**
- Segment E01: OK (no detections)
- Segment E02: OK (no detections)
- **Result:** No active virus signatures detected at time of examination

**Note:** The absence of virus detections does not indicate lack of malicious intent. The tools identified are legitimate security tools commonly misused for unauthorized network access and penetration testing without authorization.

### Connection to Suspected Activity

The briefing indicated the suspect would:
1. ✓ Park near wireless access points (Starbucks, T-Mobile Hotspots)
2. ✓ Intercept internet traffic
3. ✓ Attempt to capture credit card numbers, usernames & passwords

**Evidence Supporting This Profile:**
- Ethereal (network sniffer) - for intercepting traffic
- Cain & Abel - for capturing and analyzing network traffic
- dsniff 2.3 - specifically designed for traffic sniffing
- Wireless PCMCIA card and antenna - for accessing open networks
- Wardriving browser cache - evidence of searching for wireless APs
- Anonymizer tool - concealing online activities

### Conclusion

This investigation provides conclusive evidence that the computer was actively used for sophisticated hacking purposes. The combination of:
1. Registered to suspect Greg Schardt
2. Active username "Mr. Evil" matching suspect's known alias
3. Comprehensive organized toolkit for network attack
4. Wireless interception capability
5. Target lists and scanning evidence
6. Subscription to hacking forums

...establishes a strong connection between this computer and the suspected hacking activities described in the case briefing.

---

## Case Questions

Case Q1: **Microsoft Windows XP** (Build 2600, Service Pack 1, installed August 27, 2004 - Registry: HKLM\Software\Microsoft\Windows NT\CurrentVersion)

Case Q2: **Greg Schardt** (Registry: HKLM\Software\Microsoft\Windows NT\CurrentVersion\RegisteredOwner; also confirmed by active user profile "Mr. Evil" which is the suspect's known online alias)

Case Q3: **No viruses detected.** ClamAV antivirus scan completed on both disk image segments (E01 and E02) with results showing "OK" for each segment, indicating no known malware signatures were identified. However, the computer contains numerous legitimate security/hacking tools that were being actively used for unauthorized network access and traffic interception.