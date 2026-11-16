Now let me compile the investigation results into the final report.

---

## FORENSIC INVESTIGATION REPORT
**Case ID:** nist-hacking-case-av  
**Evidence:** 4Dell_Latitude_CPi.E01 & E02  
**Investigation Date:** 2026-11-16

### Executive Summary
This investigation analyzed a Dell Latitude CPi notebook (S/N: VLQLW) suspected of being used for hacking purposes. The device was found abandoned with wireless networking equipment. The forensic analysis identified extensive evidence of hacking activities, malware infections, and confirmed ties to suspect Greg Schardt (aka "Mr. Evil").

### Key Findings

**Operating System:** Windows XP (ProductName: "Microsoft Windows XP", Version 5.1, Build 2600)

**User Accounts:** The system contains a user account named "Mr. Evil" which matches the online nickname referenced in the case briefing for suspect Greg Schardt.

**Hacking Tools Identified:**
- **Ethereal** (packet sniffer/analyzer) - Program Files/Ethereal
- **Cain 2.5B45.exe** (password cracker and network analyzer) - evidence of execution in Windows Prefetch
- **Brutus** (password brute-force tool) - My Documents/EXPLOITATION/NT/Brutus/
- **Pwdump3** (password dumping utility) - My Documents/EXPLOITATION/NT/Pwdump/pwdump3.zip
- **Spade114.exe** (port scanner) - My Documents/FOOTPRINTING/NT/spade114.exe
- **OGRE** (enumeration tool) - My Documents/ENUMERATION/NT/ogre/
- **Cerberus Internet Scanner** - My Documents/ENUMERATION/NT/Cerberus Internet Scanner/
- **NSTPro2** (network security scanner) - My Documents/FOOTPRINTING/NT/NSTPro2/
- **Nmap and NmapNT** (network mapping tools) - My Documents/FOOTPRINTING/NT/Nmapnt/
- **mIRC** (IRC client for network communication) - Program Files/mIRC/
- **SuperScan** (network scanning tool) - My Documents/FOOTPRINTING/NT/superscan/

**Suspicious Content:**
- File named "wardriving[1]" in temporary internet files (Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/)
- Outlook Express subscription to "alt.hacking" newsgroup (alt.hacking.dbx)
- Multiple organized folders: ENUMERATION, EXPLOITATION, FOOTPRINTING, COMMANDS, NOVELL - suggesting organized hacking methodologies
- Files like NetBus.bad, users.txt containing potential compromised credentials

**Registered Owner:** Greg Schardt (confirmed via SOFTWARE hive, Microsoft\Windows NT\CurrentVersion, RegisteredOwner value)

### Malware Analysis

**Antivirus Scan Results:** POSITIVE - Malware Detected

**Detected Malware:**
- **File:** snitch.exe (My Documents/COMMANDS/snitch.exe, inode 10277)
- **Detection:** Win.Trojan.Snitch-1
- **Type:** Trojan Horse
- **Location:** My Documents/COMMANDS/snitch.exe
- **Scanner:** ClamAV

The Snitch trojan is a known network monitoring tool used for packet sniffing and system reconnaissance, consistent with the suspected hacking activities.

### Timeline & Context

Install Date: August 20, 2004 (Unix timestamp 1092955707)
Registry Last Written: August 27, 2004 (2004-08-27T15:08:22)
This aligns with the discovery date of September 20, 2004.

### Correlation to Suspect

The evidence strongly links this computer to suspect Greg Schardt:
1. Registered owner name is "Greg Schardt"
2. User account "Mr. Evil" matches his known online nickname
3. The gathering of hacking tools, wireless sniffing capability, and the physical discovery with wireless equipment and antenna supports the narrative that this device was used for war-driving and network penetration activities
4. The presence of credential harvesting tools (Pwdump, Cain, Brutus) correlates with the suspected activity of intercepting credit card numbers and credentials

### Conclusion

This computer was definitively used for hacking and network reconnaissance purposes. The evidence includes:
- Extensive professional-grade penetration testing and hacking toolkits
- Active malware infection (Snitch trojan)
- Organized documentation of hacking methodologies
- Clear identification of the registered owner as Greg Schardt
- Evidence consistent with wireless network interception ("wardriving")
- Tools specifically designed for password theft and network credential capture

---

## Case Questions

**Case Q1:** What operating system was used on the computer?  
**Answer:** Microsoft Windows XP (Version 5.1, Build 2600) as confirmed in the SOFTWARE registry hive at Microsoft\Windows NT\CurrentVersion.

**Case Q2:** Who is the registered owner?  
**Answer:** Greg Schardt, as recorded in the SOFTWARE registry hive value RegisteredOwner at Microsoft\Windows NT\CurrentVersion.

**Case Q3:** Perform a Anti-Virus check. Are there any viruses on the computer?  
**Answer:** YES. ClamAV antivirus detected one malware infection: Win.Trojan.Snitch-1 in the file snitch.exe (located at My Documents/COMMANDS/snitch.exe, inode 10277). This is a trojan used for network monitoring and packet sniffing, consistent with the hacking activities on this system.