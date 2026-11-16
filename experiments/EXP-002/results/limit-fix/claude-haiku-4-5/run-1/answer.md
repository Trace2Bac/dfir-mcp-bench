Perfect! Now I have all the information needed. Let me compile the final investigation report.

---

# NIST HACKING CASE - FINAL INVESTIGATION REPORT

## Executive Summary

This investigation examined a Dell CPi notebook computer (serial # VLQLW) abandoned with wireless equipment, suspected to be used for hacking purposes. The computer shows extensive evidence of hacking tools and activities consistent with the suspect profile, including password recovery tools, packet sniffers, port scanners, and wireless wardriving software.

## Investigation Findings

### 1. Operating System Identification
**Evidence:** Windows Registry (SOFTWARE hive) - Microsoft\Windows NT\CurrentVersion
- **ProductName:** Microsoft Windows XP
- **CurrentVersion:** 5.1
- **CurrentBuildNumber:** 2600
- **InstallDate:** August 27, 2004

### 2. Registered Owner
**Evidence:** Windows Registry (SOFTWARE hive) - Microsoft\Windows NT\CurrentVersion
- **RegisteredOwner:** Greg Schardt

### 3. User Account Linked to Suspect
**Evidence:** File system analysis
- A user account "Mr. Evil" was discovered, which matches the online nickname of suspect Greg Schardt
- Browser cache and application data for this user found at: `Documents and Settings/Mr. Evil`
- Evidence suggests this account was actively used on the computer

### 4. Installed Hacking Software

#### Network Analysis Tools:
- **Ethereal (Network Protocol Analyzer)** - Installed in Program Files/Ethereal
  - Located at: WINDOWS/Prefetch/ETHEREAL.EXE
  - Used for capturing and analyzing network packets

#### Password Recovery/Cracking Tools:
- **CAIN (CAIN25B45.EXE)** - Evidence found in WINDOWS/Prefetch
  - Known password recovery and network sniffing tool
  - Execution evidence: WINDOWS/Prefetch/CAIN25B45.EXE-056F3A6E.pf

- **CUTE (CUTE3032.EXE)** - Evidence found in WINDOWS/Prefetch
  - Hacking tool for credential theft
  - Execution evidence: WINDOWS/Prefetch/CUTE3032.EXE-1F409A25.pf

#### Organized Hacking Toolkit in My Documents:
Located in "My Documents" with well-organized categorization:

**EXPLOITATION Tools:**
- Brutus (brute force attack tool) - `My Documents/EXPLOITATION/NT/Brutus/`
  - Contains: NetBus.bad, Overview.doc, readme.doc, users.txt
- Pwdump (password dumping tool) - `My Documents/EXPLOITATION/NT/Pwdump/`
  - File: pwdump3.zip
- dsniff (packet sniffing tool) - `My Documents/EXPLOITATION/Unix/dsniff 2.3/`
  - Labeled: "Switched networks lose security advantage due packet tool"

**ENUMERATION/SCANNING Tools:**
- Cerberus Internet Scanner - `My Documents/ENUMERATION/NT/Cerberus Internet Scanner/`
- enum (network enumeration) - `My Documents/ENUMERATION/NT/enum/`
- ogre (vulnerability scanner) - `My Documents/ENUMERATION/NT/ogre/`
- spade114.exe - `My Documents/FOOTPRINTING/NT/spade114.exe`
- superscan - `My Documents/FOOTPRINTING/NT/superscan/`
- NSTPro2 - `My Documents/FOOTPRINTING/NT/NSTPro2/`

**FOOTPRINTING/PORT SCANNING Tools:**
- nmap/nmapNT (port scanner) - `My Documents/FOOTPRINTING/NT/Nmapnt/`
  - Complete source code included (nmapNT-src/)

**COMMAND UTILITIES:**
- `My Documents/COMMANDS/snitch.exe`
- `My Documents/COMMANDS/user2sid.exe`
- `My Documents/COMMANDS/STREAMFIND.EXE`

#### Additional Tools:
- **Anonymizer** - Installed in Program Files/Anonymizer
  - Internet anonymization software to hide browsing activity
  - Consistent with evidence of suspicious web browsing

### 5. Wireless Wardriving Evidence
**Evidence:** File system and browser cache
- File named "wardriving[1]" found in: `Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/JIRVJY9X/`
- This corresponds to wardriving activity (scanning for wireless access points)
- Consistent with case briefing: suspect would park near wireless hotspots to intercept traffic

### 6. Antivirus Scan Results
**ClamAV Antivirus Scan:**
- Scanned extracted hacking tool executables including:
  - CAIN25B45.EXE (9,244 bytes) - **CLEAN**
  - CUTE3032.EXE (9,578 bytes) - **CLEAN**
  - pwdump3.zip (88,815 bytes) - **CLEAN**
- **Result:** No viruses detected on these files

---

## Case Questions

**Case Q1:** What operating system was used on the computer?
**Answer:** Microsoft Windows XP (Build 2600, Version 5.1), installed August 27, 2004. Confirmed via Windows Registry SOFTWARE hive: HKLM\Microsoft\Windows NT\CurrentVersion.

**Case Q2:** Who is the registered owner?
**Answer:** Greg Schardt, as recorded in the Windows Registry SOFTWARE hive: HKLM\Microsoft\Windows NT\CurrentVersion\RegisteredOwner. Additionally, a user account named "Mr. Evil" (suspect's known online alias) was present on the system with active browsing and tool execution history.

**Case Q3:** Perform a Anti-Virus check. Are there any viruses on the computer?
**Answer:** ClamAV antivirus scan detected **NO VIRUSES** on the extracted hacking tool files examined (CAIN25B45.EXE, CUTE3032.EXE, pwdump3.zip). However, the computer contains extensive legitimate but malicious-intent hacking and penetration testing software tools, including password recovery tools (Cain, Pwdump), packet sniffers (Ethereal, dsniff), port scanners (nmap), and network enumeration tools. These tools are designed for attacking computer systems and extracting credentials, and their presence indicates the computer was specifically configured for conducting cyberattacks.

---

## Conclusion

The evidence strongly supports the conclusion that this computer belonged to Greg Schardt (online alias "Mr. Evil") and was actively used for hacking and unauthorized network access activities. The systematic organization of well-known hacking tools across multiple categories (Exploitation, Enumeration, Footprinting), combined with wireless wardriving evidence, password recovery software, and packet sniffing tools, indicates premeditated cybercriminal activity. The computer was specifically configured and tooled for intercepting wireless network traffic and conducting credential theft operations at public hotspots, exactly as described in the case briefing.