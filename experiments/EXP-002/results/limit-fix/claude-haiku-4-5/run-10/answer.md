Perfect! Now I have all the information needed. Let me compile the final forensic report.

---

# DIGITAL FORENSIC INVESTIGATION REPORT
## NIST Hacking Case - Dell Latitude CPi Notebook

**Case ID:** nist-hacking-case-av  
**Date of Investigation:** November 16, 2026  
**Evidence:** 4Dell_Latitude_CPi.E01 / E02  
**Computer:** Dell CPi Notebook, Serial # VLQLW  
**Date Found:** September 20, 2004

---

## INVESTIGATION SUMMARY

A forensic examination of the abandoned Dell Latitude CPi notebook computer revealed extensive evidence of malicious hacking activity and network interception tools. The computer was configured for and actively used in wireless network exploitation activities, consistent with the suspected wardriving and credential theft activities described in the case briefing.

---

## FINDINGS

### 1. SYSTEM IDENTIFICATION

**Operating System:** Windows XP Professional (Build 2600)  
**Install Date:** August 27, 2004 (Unix timestamp: 1092955707)  
**System Root:** C:\WINDOWS

The computer was running Windows XP, a contemporary desktop operating system commonly used during the early 2000s for both legitimate and malicious purposes.

### 2. REGISTERED OWNER IDENTIFICATION

**Registered Owner:** Greg Schardt  
**Organization:** N/A  
**Product ID:** 55274-640-0147306-23684

**Critical Finding:** The computer is registered to Greg Schardt, the primary suspect named in the case briefing. This directly connects the physical computer to the suspect.

### 3. USER ACCOUNT EVIDENCE

A user account titled **"Mr. Evil"** was found on the system. This matches the suspect's known online nickname, providing additional confirmation of the suspect's use of this computer.

---

## HACKING TOOLS AND SOFTWARE DISCOVERED

The forensic examination identified multiple professional-grade hacking and network penetration tools installed on the system:

### Network Sniffing & Packet Analysis:
- **Ethereal** (v0.10.6) - Full packet capture and analysis tool, installed in Program Files
- **dsniff 2.3** - Advanced network sniffer for capturing sensitive data (stored in My Documents/EXPLOITATION/Unix/)
- **CAIN & Abel (v25B45)** - Password recovery and network packet sniffer tool (evidence in Prefetch)

### Network Enumeration & Scanning:
- **Nmap** - Network mapping tool (found in My Documents/FOOTPRINTING/NT/Nmapnt/)
- **SuperScan** - Network scanner and vulnerability assessment tool
- **NetStumbler** - Wireless network detector and site surveyor
- **OGRE** - Network enumeration tool (My Documents/ENUMERATION/NT/ogre/)

### Password & Credential Exploitation:
- **Brutus** - Multi-protocol password cracking tool (My Documents/EXPLOITATION/NT/Brutus/)
- **Pwdump3** - Password hash extraction tool (My Documents/EXPLOITATION/NT/Pwdump/)

### Command-Line Exploitation Tools:
- **user2sid.exe** - Windows SID to username converter
- **snitch.exe** - Account enumeration tool
- **SRVBOOT.BAT** - Server boot script (suspicious batch file)

### Supporting Infrastructure:
- Extensive documentation and resources related to wardriving techniques
- References to WEP cracking tools (Aircrack, AirSnort)
- Anonymous web browsing tools (Anonymizer toolbar installed)

---

## WARDRIVING EVIDENCE

### Critical Discovery: Wardriving.com Cache

A cached copy of **wardriving.com** website was recovered from the user "Mr. Evil"'s browser temporary files (inode 11945, 28,118 bytes). This website is dedicated to techniques for detecting and exploiting wireless 802.11b networks through vehicle-based reconnaissance.

**Content of Wardriving.com Page Includes:**
- Tutorials and news about wireless network detection
- References to WEP cracking tools and techniques
- Information about 802.11b vulnerability exploitation
- Links to security bypass tools and techniques
- Discussion of "war-driving" as an offensive hacking methodology

**Location:** `Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/JIRVJY9X/wardriving[1]`

This directly correlates with the case briefing describing the suspect as someone who "would park his vehicle within range of Wireless Access Points (like Starbucks and other T-Mobile Hotspots) where he would then intercept internet traffic."

---

## ACTIVITY PATTERN ANALYSIS

### Evidence Structure:

The suspect organized hacking tools into logical categories within "My Documents":
- **ARCHIVE/** - Archive utilities for compressed files
- **COMMANDS/** - Command-line exploitation utilities
- **ENUMERATION/** - System and network enumeration tools
- **EXPLOITATION/NT/** - Windows-specific attack tools (Brutus, Pwdump)
- **EXPLOITATION/Unix/** - Cross-platform tools (dsniff)
- **FOOTPRINTING/NT/** - Network reconnaissance tools (Nmap, SuperScan, NSTPro2)
- **NOVELL/** - Novell network-specific tools

### Usage Indicators:

Windows Prefetch files show evidence of tool execution:
- **CAIN25B45.EXE** - Prefetch evidence of execution (CAIN & Abel password/sniffer tool)
- **CMD.EXE** - Command interpreter usage (script/batch execution)
- Multiple utility executables with execution timestamps

---

## ANTIVIRUS SCAN RESULTS

**ClamAV Scan Status:** The direct antivirus scan of the disk image did not detect known virus signatures in the standard ClamAV database. However, the presence of multiple professional hacking and exploitation tools indicates the primary threat on this system is not traditional malware, but rather intentional installation of attack tools for offensive purposes.

**Assessment:** While no known computer viruses were detected, the system contains multiple sophisticated offensive security tools configured and organized specifically for network hacking, credential theft, and wireless network exploitation activities.

---

## TIMELINE SUMMARY

- **August 27, 2004:** Windows XP installed on computer
- **August - September 2004:** Hacking tools and Ethereal traffic analysis software installed
- **September 20, 2004:** Computer abandoned and recovered with wireless PCMCIA card and homemade antenna

---

## CONCLUSION

The forensic examination provides strong corroborating evidence that this Dell CPi notebook was actively used for unauthorized network hacking and credential interception activities:

1. **Direct suspect connection:** Computer registered to Greg Schardt
2. **Nickname confirmation:** User account "Mr. Evil" matches known online identity
3. **Tool collection:** Comprehensive suite of professional hacking tools organized and installed
4. **Wardriving evidence:** Cached wardriving.com website showing active interest in wireless network exploitation
5. **Geographic capability:** Wireless PCMCIA card and external antenna found with computer, consistent with mobile network targeting

---

## Case Questions

**Case Q1: What operating system was used on the computer?**  
Microsoft Windows XP Professional (Build 2600, Version 5.1)

**Case Q2: Who is the registered owner?**  
Greg Schardt (as recorded in the Windows registry SOFTWARE hive, Microsoft\Windows NT\CurrentVersion\RegisteredOwner value)

**Case Q3: Perform an Anti-Virus check. Are there any viruses on the computer?**  
No known viruses were detected by ClamAV antivirus scanning. However, the computer contains extensive professional-grade hacking and network exploitation tools including Ethereal, CAIN & Abel, dsniff, Nmap, Brutus password cracker, and Pwdump, which indicates active malicious intent for unauthorized network attacks and credential theft rather than infection by traditional computer viruses.