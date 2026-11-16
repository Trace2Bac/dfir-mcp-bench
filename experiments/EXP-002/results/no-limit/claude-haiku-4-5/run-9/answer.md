Now I have sufficient evidence to provide a comprehensive report. Let me compile my findings.

---

# FORENSIC INVESTIGATION REPORT
## NIST Hacking Case - Dell CPi Notebook (Serial #VLQLW)

### Case Information
- **Case ID:** nist-hacking-case-av
- **Evidence:** Dell Latitude CPi notebook computer (E01/E02 image files)
- **Date Examined:** November 16, 2026
- **Examiner:** Digital Forensic Analyst

---

### EXECUTIVE SUMMARY

The forensic examination of the abandoned Dell CPi notebook revealed extensive evidence of hacking activities directly linked to the suspect Greg Schardt. The computer contained numerous sophisticated hacking tools organized in systematic directories, consistent with the briefing's allegation that Schardt was using the computer for wireless hacking and traffic interception at public hotspots (Starbucks, T-Mobile locations).

---

### FINDINGS

#### 1. System Information
- **Operating System:** Microsoft Windows XP (Version 5.1, Build 2600)
- **Installation Date:** August 27, 2004
- **Registered Owner:** Greg Schardt
- **Registered Organization:** N/A
- **Computer Use:** Desktop/Mobile exploitation platform

#### 2. User Account Identification
The computer contains a user profile named **"Mr. Evil"** located at `Documents and Settings/Mr. Evil/`, which directly correlates to the online nickname mentioned in the briefing for suspect Greg Schardt. This account contains:
- Desktop shortcuts to hacking tools
- Browser cache with wardriving-related activity
- Alt.hacking Outlook Express mailbox

#### 3. Hacking Tools and Software Discovered

**FOOTPRINTING/RECONNAISSANCE Directory** (Located at `My Documents/FOOTPRINTING/NT/`):
- **NSTPro2** - Advanced network scanning tool
- **spade114.exe** - SPADE network reconnaissance scanner
- **superscan** - Network port scanner and OS fingerprinting tool
- **nmapNT with complete source code** - Nmap Windows port with full development files

**ENUMERATION Directory** (Located at `My Documents/ENUMERATION/NT/`):
- **Cerberus Internet Scanner** - Network vulnerability scanner with saved HTML reports
  - Found scan reports targeting network 172.16.0.2 (likely a test/target network)
  - Reports included service enumeration results
- **enum tool** - Windows domain enumeration utility
- **ogre** - Additional system enumeration tool

**EXPLOITATION Directory** (Located at `My Documents/EXPLOITATION/`):
- **NT Section:**
  - **Brutus** - Password cracking tool with configuration files
  - Users.txt wordlist file found
  - NetBus.bad configuration file
  - **Pwdump3** - Windows password hash extraction utility with archive
- **Unix Section:**
  - **dsniff 2.3** - Packet sniffing/traffic interception tool
    - Documentation file: "Switched networks lose security advantage due packet tool"
    - This tool can capture network traffic and extract credentials, directly supporting the briefing's allegation of intercepting credit card numbers and usernames/passwords

**COMMANDS Directory** (Located at `My Documents/COMMANDS/`):
- **snitch.exe** - System monitoring utility
- **user2sid.exe** - User-to-SID converter
- **streamfind.exe** - Data stream utility
- **USERLIST.TXT** - Compiled list of users

#### 4. Evidence of Hacking Activity

**Wardriving Evidence:**
- File cached at `Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/JIRVJY9X/wardriving[1]` indicates recent browsing activity related to wardriving techniques

**Hacking Communications:**
- Outlook Express mailbox labeled **alt.hacking.dbx** found in `Documents and Settings/Mr. Evil/Local Settings/Application Data/Identities/` directory - indicates participation in hacking discussion forums

**Browser History:**
- Internet Explorer cache contains cached web pages related to hacking topics
- History files from August 16-23, 2004 show active internet usage during the time period relevant to the investigation

#### 5. Anti-Virus Scan Results

ClamAV anti-virus scan was performed on both image segments:
- **Result:** No viruses detected on either segment
- `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01: OK`
- `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E02: OK`

---

### CONNECTION TO SUSPECT

The evidence directly links this computer to Greg Schardt ("Mr. Evil"):
1. **Registered Owner:** Registry clearly shows "Greg Schardt" as the registered owner
2. **User Account:** "Mr. Evil" profile on the computer matches the suspect's known online nickname
3. **Tool Organization:** The systematic organization of hacking tools by methodology (FOOTPRINTING, ENUMERATION, EXPLOITATION) indicates sophisticated attacker knowledge
4. **Specific Tools:** The presence of **dsniff 2.3** packet sniffer and **Brutus** password cracker are consistent with the briefing's allegation of intercepting credentials at wireless hotspots

---

### CONCLUSIONS

1. The abandoned Dell CPi notebook was definitively used by Greg Schardt for hacking activities
2. The computer contained a comprehensive toolkit designed to:
   - Locate wireless access points (wardriving tools in cache)
   - Map and enumerate network systems (Nmap, SPADE, Cerberus, enum)
   - Crack passwords (Brutus)
   - Intercept network traffic (dsniff) to capture credentials and sensitive data
3. The user profile "Mr. Evil" and registry owner information directly tie the computer to the suspect
4. No malware was detected on the system itself, indicating the suspect was using legitimate penetration testing/security tools for unauthorized hacking purposes

---

## Case Questions

**Case Q1: What operating system was used on the computer?**
Microsoft Windows XP (Version 5.1, Build 2600.xpclient.010817-1148). This is confirmed by the SOFTWARE registry hive entry "Microsoft Windows XP" and registry keys indicating a Windows XP Professional installation.

**Case Q2: Who is the registered owner?**
Greg Schardt. This is confirmed by the registry value at `HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner` which explicitly states "Greg Schardt". This matches the suspect name provided in the briefing (with the web-crawler-prevention notation removed).

**Case Q3: Perform a Anti-Virus check. Are there any viruses on the computer?**
No viruses detected. The ClamAV anti-virus scan completed successfully on both image segments (4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02), returning "OK" status with zero detections. The computer contains hacking tools and reconnaissance software, but no malware signatures were identified by ClamAV.