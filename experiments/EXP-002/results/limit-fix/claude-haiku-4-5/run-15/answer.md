Now I have all the information needed to answer the case questions. Let me compile the final report.

---

# NIST Hacking Case - Forensic Investigation Report

## Case Summary

On 09/20/04, a Dell CPi notebook computer (serial #VLQLW) was found abandoned with wireless networking equipment. This investigation analyzed the disk image to determine the operating system, registered owner, and presence of malware on the abandoned computer.

## Investigation Findings

### 1. Operating System Identification

**Finding:** Microsoft Windows XP is installed on the computer.

**Evidence:**
- Registry query of SOFTWARE hive, key: `Microsoft\Windows NT\CurrentVersion`
- ProductName value: "Microsoft Windows XP"
- CurrentVersion: 5.1
- CurrentBuildNumber: 2600
- InstallDate: 1092955707 (Unix timestamp: August 27, 2004)

### 2. Registered Owner Identification

**Finding:** The computer is registered to **Greg Schardt**, confirming a direct link to the primary suspect.

**Evidence:**
- Registry query of SOFTWARE hive, key: `Microsoft\Windows NT\CurrentVersion`
- RegisteredOwner value: "Greg Schardt"
- Additional corroborating evidence: User account "Mr. Evil" exists on the system, matching the suspect's online nickname mentioned in the case briefing

### 3. Evidence of Hacking Tools and Activities

The computer contains extensive evidence of hacking tools organized in structured directories:

**Network Analysis Tools:**
- Ethereal (network packet sniffer) - Program Files/Ethereal
- Nmap (network mapper) - My Documents/FOOTPRINTING/NT/Nmapnt
- Cain & Abel (password recovery) - Evidence in Windows Prefetch: CAIN25B45.EXE
- WinPcap (packet capture library) - Windows Prefetch: WINPCAP_3_01_A.EXE

**Exploitation Tools:**
- Brutus (password cracking tool) - My Documents/EXPLOITATION/NT/Brutus
- Pwdump3 (password dumping utility) - My Documents/EXPLOITATION/NT/Pwdump
- dsniff 2.3 (packet sniffing tool) - My Documents/EXPLOITATION/Unix/dsniff 2.3

**Enumeration/Reconnaissance Tools:**
- OGRE (network scanner) - My Documents/ENUMERATION/NT/ogre
- Nmap NT - My Documents/FOOTPRINTING/NT/Nmapnt
- SuperScan - My Documents/FOOTPRINTING/NT/superscan
- NSTPro2 - My Documents/FOOTPRINTING/NT/NSTPro2

**Wireless Hacking Evidence:**
- File named "wardriving[1]" found in "Mr. Evil" user's cache, confirming wireless network scanning activities consistent with the briefing about parking near hotspots

**Command Tools:**
- snitch.exe - My Documents/COMMANDS/
- user2sid.exe - My Documents/COMMANDS/
- STREAMFIND.EXE - My Documents/COMMANDS/

### 4. Malware Detection

**Finding:** **YES - A virus was detected on the computer.**

**Evidence:**
- ClamAV antivirus scan detected: **Win.Trojan.Snitch-1**
- Location: My Documents/COMMANDS/snitch.exe
- Inode: 10277
- File size: 24,576 bytes
- SHA-256: 42ac6b745abd6ab4895ecab7baa93ec7cbdd618cc9419a1e7f8609f403d3110a

Snitch is a known Windows trojan used for network reconnaissance and credential harvesting.

### 5. User Account Analysis

The "Mr. Evil" user account on the system contains:
- Outlook Express email folder: alt.hacking.dbx (related to hacking/alt.* newsgroups)
- Browser cache with wardriving-related content
- Desktop shortcuts to hacking tools

This user account corresponds to the online nickname mentioned in the case briefing for the suspect Gregory Schardt.

## Conclusion

The investigation provides strong evidence linking the abandoned Dell CPi notebook to the suspect Gregory Schardt:

1. The computer is registered to "Greg Schardt"
2. A user account named "Mr. Evil" exists (matching the suspect's online alias)
3. The system contains a comprehensive collection of network hacking, password cracking, and exploitation tools
4. Evidence of wardriving activities (wireless access point scanning) is present
5. A confirmed trojan (Win.Trojan.Snitch-1) is installed on the computer

The organized folder structure (COMMANDS, ENUMERATION, EXPLOITATION, FOOTPRINTING, NOVELL) suggests deliberate collection and use of these tools for malicious hacking purposes, directly supporting the suspected use of this computer for illegal network intrusion and credential theft activities at wireless hotspots.

---

## Case Questions

**Case Q1:** What operating system was used on the computer?
**Answer:** Microsoft Windows XP

**Case Q2:** Who is the registered owner?
**Answer:** Greg Schardt

**Case Q3:** Perform an Anti-Virus check. Are there any viruses on the computer?
**Answer:** Yes. ClamAV detected Win.Trojan.Snitch-1 trojan in the file snitch.exe located at My Documents/COMMANDS/snitch.exe. Additionally, the system contains multiple malicious hacking and exploitation tools including password crackers, network sniffers, and password dumping utilities that pose security threats.