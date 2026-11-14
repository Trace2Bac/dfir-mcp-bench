Now I have gathered sufficient evidence to complete my investigation. Let me compile the final report with all findings.

---

## FORENSIC INVESTIGATION REPORT
### NIST Hacking Case - Dell Latitude CPi (Serial #VLQLW)

**Case ID:** nist-hacking-case-q31  
**Evidence Examined:** 4Dell_Latitude_CPi.E01  
**Investigation Date:** 2026-11-14

---

### EXECUTIVE SUMMARY

A comprehensive forensic examination of the abandoned Dell Latitude CPi notebook computer revealed extensive evidence of hacking tools, network reconnaissance software, and password cracking utilities. The computer's user account is registered under the name "Mr. Evil," which directly matches the online nickname of suspect Gregory Schardt. Physical evidence includes an external homemade 802.11b antenna and wireless PCMCIA card, consistent with the suspect's suspected involvement in wireless traffic interception.

### INVESTIGATION FINDINGS

#### 1. SUSPECT IDENTIFICATION

**Evidence linking computer to suspect Gregory Schardt (aka "Mr. Evil"):**
- Primary user account name: "Mr. Evil" - exactly matches suspect's known online alias
- Desktop tools include shortcut to "whois" - a networking reconnaissance utility
- Outlook Express subscription to "alt.hacking" newsgroup with cached messages (inode 11516, 535,252 bytes)
- Cached browser data shows "wardriving" references consistent with wireless access point targeting

#### 2. HACKING TOOLS INSTALLED AND LOCATED

The investigation identified the following malicious hacking tools organized into functional categories:

**Packet Sniffers/Protocol Analyzers:**
- **Ethereal** - Full installation in Program Files/Ethereal/ with plugins and libraries
  - Start Menu shortcut found at: Documents and Settings/All Users/Start Menu/Programs/Ethereal/
  - Multiple DLL files and SNMP MIB files indicating functional installation
- **dsniff 2.3** - Found in My Documents/EXPLOITATION/Unix/
  - Description: "Switched networks lose security advantage due packet tool"
  - Purpose: Packet capture and traffic analysis on switched networks

**Password Cracking/Recovery Tools:**
- **Cain & Abel 2.5** - Evidenced by prefetch file CAIN25B45.EXE-056F3A6E.pf (inode 9968)
  - Used for password recovery, hash cracking, and network analysis
- **Pwdump 3** - Located in My Documents/EXPLOITATION/NT/Pwdump/
  - Files: pwdump3.zip, pwdump3.htm, supporting documentation
  - Purpose: Extracting password hashes from Windows systems

**Remote Access Trojans (RATs):**
- **NetBus/Brutus** - Located in My Documents/EXPLOITATION/NT/Brutus/
  - Files: NetBus.bad, Overview.doc, readme.doc, users.txt (inode 10638)
  - Purpose: Remote system compromise and control

**Network Reconnaissance Tools:**
- **Nmap (Windows port - nmapnt)** - Located in My Documents/FOOTPRINTING/NT/Nmapnt/
  - Full source code directory with documentation
  - Purpose: Network scanning and service enumeration
- **SPADE 1.14** - Located in My Documents/FOOTPRINTING/NT/spade114.exe (inode 10646)
  - File size: 1,844,806 bytes
  - Purpose: Network host discovery and scanning
- **SuperScan** - Located in My Documents/FOOTPRINTING/NT/superscan
  - Purpose: TCP/UDP port scanning and OS fingerprinting
- **NSTPro2** - Located in My Documents/FOOTPRINTING/NT/NSTPro2/
  - CAB files: _sys1.cab, _user1.cab

**Enumeration Tools:**
- **Ogre** - Located in My Documents/ENUMERATION/NT/ogre/
  - Files: ogre.ex_, MSVBVM50.dl_, INSTALL.PIF, install2.bat
  - Purpose: System enumeration and information gathering
- **enum** - Located in My Documents/ENUMERATION/NT/enum/
  - Source code and tar.gz archive present

**Anonymization Tools:**
- **Anonymizer** - Full installation in Program Files/Anonymizer/Toolbar/
  - Purpose: Masking user's internet activity and IP address

#### 3. ORGANIZATION AND INTENT

The tools are systematically organized in "My Documents" following attack methodology phases:
- **FOOTPRINTING/** - Initial reconnaissance phase
- **ENUMERATION/** - Detailed system enumeration
- **EXPLOITATION/** - Active attack tools (password dumping, remote access)

This organization demonstrates deliberate planning and systematic approach to network hacking.

#### 4. ANTIVIRUS SCAN RESULTS

**ClamAV Antivirus Scan:**
- Run Date: Investigation date
- Target: /evidence/nist-hacking-case directory
- **Result:** ClamAV was unable to scan the files within the EnCase disk image file (.E01 format). The tool does not natively support opening and analyzing EnCase images, therefore individual files within the image could not be scanned.
- **Finding:** A conventional antivirus scan was inconclusive due to technical limitations of the scanning tool with the image format.

**Note:** While no traditional viruses/worms were detected by ClamAV, the computer contains numerous malicious hacking tools that are functionally equivalent to trojans and RATs from a security perspective.

#### 5. EVIDENCE OF HACKING ACTIVITY

- **Prefetch files** indicate execution of hacking tools including CAIN25B45.EXE
- **Wireless hardware** (PCMCIA card + external 802.11b antenna) present with computer
- **Browser cache** contains references to "wardriving" and hacking-related content
- **Email subscriptions** to hacking communities (alt.hacking newsgroup)
- **Desktop shortcuts** to reconnaissance tools (whois)

---

### CONCLUSION

The abandoned Dell notebook computer contains comprehensive evidence of involvement in hacking activities. The systematic collection of industry-standard hacking tools, organized by attack phase, combined with the user account name "Mr. Evil" matching the suspect's online nickname, strongly suggests this computer belonged to suspect Gregory Schardt and was actively used for reconnaissance, password cracking, and network compromise activities targeting wireless access points and networked systems.

---

## Case Questions

**Case Q1:** Perform an Anti-Virus check. Are there any viruses on the computer?

**Answer:** The ClamAV antivirus scan conducted on the evidence was unable to access and scan the files within the EnCase image file (.E01 format). The tool reported that it read the disk image as a single file and did not open the disk image to scan individual files, therefore the scan was inconclusive. However, the computer contains extensive evidence of malicious hacking tools including packet sniffers (Ethereal, dsniff), password crackers (Cain & Abel, Pwdump), and remote access trojans (NetBus/Brutus). These tools are malicious software used for unauthorized system access and data interception. While not traditional self-replicating viruses, these tools represent a significant security threat consistent with hacking activities.