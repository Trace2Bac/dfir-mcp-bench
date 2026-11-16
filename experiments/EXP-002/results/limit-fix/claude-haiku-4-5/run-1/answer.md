Perfect! I now have all the information needed to answer the case questions. Let me compile my final forensic report.

---

# FORENSIC INVESTIGATION REPORT
## Case: NIST Hacking Case - Dell Latitude CPi (Serial #VLQLW)

### Executive Summary
This forensic investigation examined a Dell Latitude CPi notebook (serial #VLQLW) abandoned on 09/20/04, suspected of being used for hacking purposes to intercept internet traffic and steal credentials via wireless access points. The investigation confirms the computer was used for unauthorized hacking activities and contains evidence directly linking it to the suspect Greg Schardt (online alias "Mr. Evil").

### System Information
- **Computer**: Dell Latitude CPi
- **Serial Number**: VLQLW
- **Operating System**: Microsoft Windows XP (Version 5.1, Build 2600)
- **Registered Owner**: Greg Schardt
- **Registered Organization**: N/A
- **Installation Date**: August 27, 2004 (Unix timestamp: 1092955707)

### Evidence of Hacking Software and Tools Found

**Network Sniffing/Packet Capture Tools:**
- Ethereal (installed in Program Files/Ethereal) - professional packet analyzer for capturing network traffic
- dsniff 2.3 (found in My Documents/EXPLOITATION/Unix/dsniff 2.3) - tool specifically designed to capture network traffic and credentials

**Password/Credential Harvesting Tools:**
- Pwdump3 (found in My Documents/EXPLOITATION/NT/Pwdump) - password dumping utility to extract Windows account credentials
- Cain & Abel (prefetch file CAIN25B45.EXE found in Windows/Prefetch) - password recovery and credential interception toolkit

**Network Enumeration/Scanning Tools:**
- Cerberus Internet Scanner (found in My Documents/ENUMERATION/NT) - vulnerability scanner
- enum (found in My Documents/ENUMERATION/NT/enum) - network enumeration tool
- ogre (found in My Documents/ENUMERATION/NT/ogre) - network enumeration tool

**Exploitation/Hacking Tools:**
- Brutus (found in My Documents/EXPLOITATION/NT/Brutus) - password cracking/brute force tool
- user2sid.exe, snitch.exe, STREAMFIND.EXE (found in My Documents/COMMANDS) - various hacking utilities

**Privacy/Anonymization:**
- Anonymizer (installed in Program Files/Anonymizer) - internet anonymization software

### Malware Detection Results

**Antivirus Scan Results:**
A ClamAV antivirus scan was performed on suspicious executable files extracted from the system.

**Detections:**
- **File**: snitch.exe (inode 10277, located in My Documents/COMMANDS)
- **Malware Type**: Win.Trojan.Snitch-1
- **Classification**: Trojan/Spyware capable of monitoring and capturing network traffic

### Evidence Linking to Suspect

1. **User Account**: A user profile named "Mr. Evil" exists on the system, matching the online nickname mentioned in the case briefing for suspect Greg Schardt
2. **Wireless Hacking Evidence**: A cached web file named "wardriving[1]" was found in the Internet cache, directly correlating to the suspected wardriving activity (parking near wireless access points to intercept traffic)
3. **Hacking Newsgroup**: Outlook Express contains a folder for "alt.hacking.dbx" - an unmoderated Usenet newsgroup dedicated to hacking discussions
4. **Network Reconnaissance**: NetHood connections show links to other computers on the network (andrews (c) on Andrews-1), indicating network scanning/reconnaissance activity

### Forensic Analysis Conclusion

The evidence conclusively demonstrates that this Dell Latitude CPi computer was used as a mobile hacking platform. The presence of:
- Professional network sniffing tools (Ethereal, dsniff)
- Password capture utilities (Pwdump, Cain & Abel)
- Network enumeration tools
- A trojan with spyware capabilities
- Wireless wardriving references
- The registered owner being Greg Schardt with a "Mr. Evil" user account

...all strongly support the hypothesis that this computer was used by Greg Schardt to conduct unauthorized access attempts, intercept wireless traffic, and harvest credentials from wireless access points in public locations (Starbucks, T-Mobile Hotspots, etc.).

---

## Case Questions

**Case Q1**: Microsoft Windows XP (Version 5.1, Build 2600) as confirmed in the SOFTWARE registry hive key: HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion

**Case Q2**: Greg Schardt as confirmed in the SOFTWARE registry hive. The registry value "RegisteredOwner" under HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion contains "Greg Schardt". Additionally, the user account "Mr. Evil" (matching the suspect's online nickname) is present on the system with extensive hacking tool collections in the user's My Documents folder.

**Case Q3**: Yes, viruses are present on the computer. ClamAV antivirus scan detected Win.Trojan.Snitch-1 in the file snitch.exe located in My Documents/COMMANDS. This trojan is classified as spyware capable of monitoring network traffic and intercepting communications. Additionally, the computer contains multiple hacking tools including network sniffers, password dumpers, and other unauthorized access utilities that, while not detected as viruses, are clearly malicious in nature and were used for unauthorized hacking activities.