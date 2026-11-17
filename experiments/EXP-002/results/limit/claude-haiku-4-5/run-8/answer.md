Based on my comprehensive forensic investigation, here is the final report:

---

# FORENSIC INVESTIGATION REPORT
## NIST Hacking Case - Dell Latitude CPi (Serial #VLQLW)

### CASE SUMMARY
A Dell Latitude CPi notebook computer, serial number VLQLW, was recovered on 09/20/04 with a wireless PCMCIA card and external 802.11b antenna. The computer is suspected to have been used for hacking and wireless interception activities. This report documents the forensic findings linking the equipment to suspect Greg Schardt (alias "Mr. Evil").

### EVIDENCE EXAMINED
- Disk Image: 4Dell_Latitude_CPi.E01 and .E02 (EnCase format)
- File System: Windows NTFS
- Registry Analysis: SOFTWARE and SYSTEM hives
- Anti-Virus Scan: ClamAV

### KEY FINDINGS

#### 1. SYSTEM IDENTIFICATION
The computer runs **Microsoft Windows XP** (Build 2600, Version 5.1), with installation date of September 4, 2004.

#### 2. USER ACCOUNT IDENTIFICATION
The computer is registered to **Greg Schardt**, matching the suspect named in the case briefing. Additionally, user profile "Mr. Evil" is present on the system, which matches the suspect's known online nickname.

#### 3. HACKING TOOLS DISCOVERED
The system contains extensive collections of network reconnaissance, enumeration, and exploitation tools organized in structured directories:

**Footprinting Tools** (My Documents/FOOTPRINTING/NT/):
- Nmap NT (source code and compiled binaries)
- NSTPro2 (network scanner)
- SPADE 1.14 (network scanner)
- SuperScan (port scanner)

**Enumeration Tools** (My Documents/ENUMERATION/NT/):
- Ogre (NetBIOS enumeration)
- Enum (network enumeration)
- Cerberus Internet Scanner
- Look@LAN

**Exploitation Tools** (My Documents/EXPLOITATION/NT/ & Unix/):
- **Brutus** (password brute-force tool) with files: NetBus.bad, Overview.doc, readme.doc, users.txt
- **Pwdump3** (SAM password dumping utility)
- **Dsniff 2.3** (Unix packet sniffer for traffic interception)

**Installed Applications:**
- Ethereal (professional packet sniffer/network analyzer)
- Cain & Abel (password recovery and network analysis)
- WinPcap 3.01 (packet capture library)
- Anonymizer (privacy/anonymity tool)

**Command Utilities** (My Documents/COMMANDS/):
- snitch.exe, user2sid.exe, streamfind.exe and others for system reconnaissance

#### 4. SUSPICIOUS INDICATORS
- User profile named "Mr. Evil" with Desktop/Tools directory containing network analysis shortcuts
- Outlook Express subscription to "alt.hacking.dbx" (hacking discussion newsgroup)
- Browser cache containing wardriving references
- Prefetch files showing execution of Cain & Abel (CAIN25B45.EXE), TELNET, and packet capture tools

#### 5. WIRELESS CAPABILITY CONFIRMATION
The recovered equipment included a wireless PCMCIA card and external 802.11b antenna, consistent with wardriving and wireless access point interception activities referenced in the case briefing.

### ANTI-VIRUS RESULTS
ClamAV scanning was performed on the evidence image. The native disk image files (E01, E02) scanned as "OK" when analyzed as files themselves. However, ClamAV could not extract and analyze individual files within the disk image from the command line, limiting traditional malware detection. This does not confirm the absence of malware—only that traditional malware signatures were not found in the image headers. Notably, many of the tools present (Dsniff, packet sniffers, password crackers) are legitimate security utilities that would not trigger antivirus signatures but are used for intercepting unencrypted network traffic and credential harvesting.

### CONCLUSION
The evidence strongly supports that this computer belonged to the suspect Greg Schardt and was actively configured for wireless network interception and credential theft activities. The organized collection of footprinting, enumeration, exploitation, and packet-sniffing tools—combined with the wireless hardware and the "Mr. Evil" user profile—creates a comprehensive picture of deliberate hacking capability matched to the suspect's known modus operandi.

---

## Case Questions

**Case Q1:** What operating system was used on the computer?
**Case Q1:** Microsoft Windows XP (Build 2600, Version 5.1) - confirmed from SOFTWARE hive registry key Microsoft\Windows NT\CurrentVersion.

**Case Q2:** Who is the registered owner?
**Case Q2:** Greg Schardt - confirmed from SOFTWARE hive registry value RegisteredOwner. This matches the primary suspect in the case briefing. Additionally, a user profile named "Mr. Evil" exists on the system, matching the suspect's known online alias.

**Case Q3:** Perform an Anti-Virus check. Are there any viruses on the computer?
**Case Q3:** ClamAV antivirus scan was executed but returned "OK" on the disk image files themselves. ClamAV notes that it read the .E01 and .E02 image files as single files and could not extract individual files within the disk image for scanning, so this result does not definitively prove the absence of malware. However, extensive hacking and network analysis tools were found on the system (Ethereal, Dsniff, Cain & Abel, Brutus, Pwdump, Nmap, etc.) that are designed for network interception and credential theft rather than traditional computer viruses. These tools would support the suspect's suspected activities of intercepting wireless traffic to obtain credit card numbers, usernames, and passwords at public access points.