---

# FORENSIC INVESTIGATION REPORT
## NIST Hacking Case - Dell CPi Notebook
### Case ID: nist-hacking-case-av

---

## Executive Summary

A comprehensive forensic examination of the abandoned Dell CPi notebook (Serial #VLQLW) has been completed. The investigation confirms this computer was actively used for hacking and network intrusion purposes. Multiple hacking tools, evidence of network reconnaissance, and confirmed malware were discovered on the system.

---

## Investigation Findings

### System Information
- **Computer Model**: Dell CPi Notebook
- **Serial Number**: VLQLW
- **Evidence Source**: EnCase image files (4Dell_Latitude_CPi.E01, E02)

### Owner Identification
The Windows XP registry clearly identifies the registered owner as **Greg Schardt**. A user account named **"Mr. Evil"** exists on the system, which matches the suspect's known online alias mentioned in the case briefing.

### Hacking Tools Identified

**Network Analysis & Packet Sniffing:**
- Ethereal (packet sniffer) - installed in Program Files with full plugin libraries
- WinPcap 3.01 (Prefetch evidence: WINPCAP_3_01_A.EXE)
- Look@LAN (network scanner) - Program Files/Look@LAN

**Password Cracking & Exploitation:**
- Cain & Abel 2.5 (Prefetch evidence: CAIN25B45.EXE) - professional password cracker and network analyzer
- Brutus - brute force password attack tool (My Documents/EXPLOITATION/NT/Brutus)
- Pwdump - password hash extraction tool (My Documents/EXPLOITATION/NT/Pwdump)

**Network Reconnaissance & Enumeration:**
- Nmap and nmapNT - network port scanner (My Documents/FOOTPRINTING/NT/Nmapnt)
- NSTPro2 - network enumeration tool (My Documents/FOOTPRINTING/NT/NSTPro2)
- SPADE 1.14 - network scanner (My Documents/FOOTPRINTING/NT/spade114.exe)
- SuperScan - network scanner (My Documents/FOOTPRINTING/NT/superscan)
- Cerberus Internet Scanner (My Documents/ENUMERATION/NT)
- enum tool - Windows enumeration utility (My Documents/ENUMERATION/NT/enum)
- ogre - system enumeration tool (My Documents/ENUMERATION/NT/ogre)

**System Exploitation & Utilities:**
- snitch.exe (TROJAN - detected by ClamAV) - My Documents/COMMANDS/snitch.exe
- user2sid.exe - Windows SID lookup tool (My Documents/COMMANDS/user2sid.exe)
- STREAMFIND.EXE (My Documents/COMMANDS/STREAMFIND.EXE)

**Privacy/Anonymization:**
- Anonymizer - internet traffic anonymizer and privacy tool (Program Files/Anonymizer)

### Evidence of Hacking Activity

1. **Wardriving Activity**: File named "wardriving[1]" cached in Mr. Evil's temporary internet files (Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/JIRVJY9X/wardriving[1]) - consistent with case briefing about the suspect parking near wireless access points

2. **Hacking Community Involvement**: Outlook Express email folder for "alt.hacking.dbx" found in Mr. Evil's account (Documents and Settings/Mr. Evil/Local Settings/Application Data/Identities/.../Microsoft/Outlook Express/alt.hacking.dbx)

3. **Organized Tool Collections**: Systematically organized folders in My Documents:
   - COMMANDS/ - command-line hacking utilities
   - ENUMERATION/ - reconnaissance and enumeration tools
   - EXPLOITATION/ - password cracking and exploitation frameworks
   - FOOTPRINTING/ - network scanning and mapping tools
   - NOVELL/ - Novell network exploitation tools
   - ARCHIVE/ - archive and file manipulation utilities

4. **Desktop Tools**: Desktop shortcut to "whois" network lookup tool in Documents and Settings/Mr. Evil/Desktop/Tools

---

## Anti-Virus Scan Results

ClamAV malware scanning detected the following malicious file:

- **Detection**: Win.Trojan.Snitch-1
- **File**: snitch.exe
- **Location**: My Documents/COMMANDS/snitch.exe
- **Inode**: 10277
- **File Size**: 24,576 bytes
- **SHA256**: 42ac6b745abd6ab4895ecab7baa93ec7cbdd618cc9419a1e7f8609f403d3110a

Snitch is a known trojan/spyware tool used for system monitoring and unauthorized access.

---

## Suspect Linkage to Greg Schardt/"Mr. Evil"

The evidence directly links this computer to the suspect:

1. **Registered Owner Match**: Windows XP registry shows registered owner as "Greg Schardt"
2. **Online Alias Confirmation**: User account "Mr. Evil" exists on system, matching Greg Schardt's known nickname
3. **Activity Pattern Match**: Wardriving file evidence aligns with case briefing description of suspect parking near wireless access points to intercept traffic
4. **Tool Collection**: Comprehensive hacking toolkit consistent with case briefing description of password and credit card number theft attempts

---

## Conclusion

This computer unequivocally belonged to and was actively used by Greg Schardt (online alias "Mr. Evil") for conducting hacking operations. The combination of professionally-grade hacking tools, organized exploitation resources, confirmed malware, and evidence of wardriving activity establishes this as an active hacking platform used for network intrusion, credential theft, and unauthorized access attempts.

---

## Case Questions

**Case Q1**: What operating system was used on the computer?
**Answer**: Microsoft Windows XP (Product Name: "Microsoft Windows XP", Current Version: 5.1, Current Build Number: 2600) - verified from HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion registry hive.

**Case Q2**: Who is the registered owner?
**Answer**: Greg Schardt - verified from HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion\RegisteredOwner registry value. Additionally, a user account named "Mr. Evil" exists on the system, matching the suspect's known online alias mentioned in the case briefing.

**Case Q3**: Perform a Anti-Virus check. Are there any viruses on the computer?
**Answer**: Yes, ClamAV antivirus detected malware on the computer. One confirmed detection: Win.Trojan.Snitch-1 in the file snitch.exe (My Documents/COMMANDS/snitch.exe). Additionally, the system contains numerous hacking and exploitation tools that, while some may not be inherently malicious, demonstrate the system's use for unauthorized and malicious hacking activities. These include password cracking tools (Cain & Abel, Brutus, Pwdump), network analysis tools (Ethereal, WinPcap), network reconnaissance tools (Nmap, SuperScan, SPADE, Cerberus), and privacy evasion tools (Anonymizer).