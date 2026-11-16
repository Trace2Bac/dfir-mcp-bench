Now I have gathered comprehensive evidence. Let me compile the final forensic report.

---

# DIGITAL FORENSIC EXAMINATION REPORT
## NIST Hacking Case - Dell CPi Notebook (Serial # VLQLW)
### Case ID: nist-hacking-case-av
### Examination Date: 2026-11-16

## Executive Summary

This report documents the forensic examination of a Dell CPi notebook computer (Serial # VLQLW) abandoned on 09/20/04 with a wireless PCMCIA card and external 802.11b antennae. The examination successfully identified the computer as being used for hacking purposes with clear evidence linking it to suspect Greg Schardt, who uses the online nickname "Mr. Evil."

## Evidence Found

### 1. Operating System and Owner Identification
- **Operating System**: Microsoft Windows XP (Build 2600)
- **Registered Owner**: Greg Schardt
- **User Account**: "Mr. Evil" (matching the suspect's online nickname mentioned in the briefing)
- **System Installation Date**: August 27, 2004

### 2. Hacking and Exploitation Tools Identified

The computer contained an extensive collection of hacking tools organized in "My Documents/EXPLOITATION" and "My Documents/FOOTPRINTING" directories:

**Network Reconnaissance Tools:**
- nmapnt (port scanner) - located in FOOTPRINTING/NT directory
- SPADE 1.14 (network scanner) - 1.8 MB executable at My Documents/FOOTPRINTING/NT/spade114.exe
- NSTPro2 (network scanning tool)
- SuperScan (network scanner)

**Packet Sniffing & Interception Tools:**
- Ethereal (packet analyzer/sniffer) - Found in Program Files and Start Menu
- dsniff 2.3 (packet sniffing tool) - Located in EXPLOITATION/Unix directory

**Password Cracking & Exploitation:**
- Cain 2.5 (password/hash cracking tool) - Prefetch evidence shows execution: CAIN25B45.EXE-056F3A6E.pf
- Brutus (brute force password cracking) - Located in EXPLOITATION/NT/Brutus
- Pwdump3 (Windows password dumping tool) - Located in EXPLOITATION/NT/Pwdump

**Other Exploitation Tools:**
- CUTE 3.0 (network tool) - Evidence of execution found: CUTE3032.EXE-1F409A25.pf
- Ogre (enumeration tool) - Located in ENUMERATION/NT/ogre

### 3. Evidence of Wardriving Activities

Critical evidence links the suspect to wardriving (the practice of driving around searching for and exploiting wireless networks):

- **Cached HTML file** (Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/JIRVJY9X/wardriving[1]) containing the complete wardriving.com website with detailed information about:
  - Wireless network discovery techniques
  - Equipment setup for wardriving
  - Hacking tools and techniques
  - Links to wireless network databases
  - Discussion of credit card and password interception methods

- **User Profile**: User account "Mr. Evil" maintained active web browsing history, Internet Explorer cache, and Outlook Express account with subscriptions to alt.hacking groups

- **Physical Evidence Link**: The abandoned laptop was found with a wireless PCMCIA card and homemade 802.11b antennae, consistent with wardriving setup described in cached wardriving.com documentation

### 4. Anti-Virus Scan Results

**ClamAV Scan Status**: No virus signatures detected

**Analysis**: While no traditional viruses were detected by ClamAV, the computer contains multiple legitimate hacking/exploitation tools that, while not inherently malicious code, are designed specifically for:
- Intercepting network traffic (packet sniffing)
- Cracking passwords and account credentials
- Network reconnaissance and vulnerability discovery
- Brute force authentication attacks

These tools align with the briefing's description of the suspect attempting to intercept internet traffic to obtain credit card numbers, usernames, and passwords from wireless hotspot users.

## Forensic Artifacts

- **Prefetch Files**: Evidence of tool execution including CAIN25B45.EXE, CUTE3032.EXE, CMD.EXE
- **Internet History**: Temporary Internet Files cache containing wardriving.com research
- **Start Menu Shortcuts**: Ethereal and other tool shortcuts
- **Directory Structure**: Organized folders for "EXPLOITATION" and "FOOTPRINTING" methodologies

## Conclusions

The forensic examination provides strong evidence that:

1. This computer was actively configured and used for hacking purposes
2. The suspect Greg Schardt (online name "Mr. Evil") is directly linked through:
   - Registry ownership information
   - User account name matching the documented online nickname
   - Cached web content on wardriving research in the user's profile
3. The equipment setup (wireless card, antennae, hacking tools) is consistent with wardriving activities targeting wireless access points
4. The tool collection specifically targets wireless network interception and credential theft
5. The cached wardriving.com content demonstrates premeditation and knowledge of the techniques

## Case Questions

**Case Q1: What operating system was used on the computer?**
Microsoft Windows XP (Build 2600, installed August 27, 2004)

**Case Q2: Who is the registered owner?**
Greg Schardt (registered in HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion as RegisteredOwner; also has user account "Mr. Evil" on the system)

**Case Q3: Perform a Anti-Virus check. Are there any viruses on the computer?**
ClamAV detected no virus signatures. However, the computer contains multiple hacking and network interception tools including Ethereal, Cain, dsniff, Brutus, Pwdump3, nmap, and SPADE. These are legitimate security tools designed for network reconnaissance, password cracking, and packet sniffing—not viruses—but they are clearly intended for unauthorized hacking and credential theft purposes.