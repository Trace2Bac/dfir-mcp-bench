## FORENSIC INVESTIGATION REPORT
### NIST Hacking Case - Dell Latitude CPi (Serial: VLQLW)

---

## Investigation Summary

A comprehensive digital forensic examination of the abandoned Dell Latitude CPi notebook computer was conducted to identify the operating system, registered owner, and evidence of malicious software or hacking tools.

---

## Key Findings

### 1. Operating System Identification
The system registry clearly identifies the installed operating system as **Microsoft Windows XP**. Registry data from `Microsoft\Windows NT\CurrentVersion` shows:
- ProductName: Microsoft Windows XP
- CurrentVersion: 5.1
- CurrentBuildNumber: 2600
- InstallDate: August 27, 2004 (Unix timestamp: 1092955707)

### 2. Registered Owner Identification
The system registry identifies the registered owner as **Greg Schardt**. The registry value `RegisteredOwner` in `Microsoft\Windows NT\CurrentVersion` contains this name. Additionally, a user account named **"Mr. Evil"** exists on the system, which matches the suspect's known online nickname mentioned in the case briefing.

### 3. Anti-Virus Scan Results
A ClamAV antivirus scan was performed on the evidence:
- **Result: 0 detections (CLEAN)**
- Both image segments (E01 and E02) returned "OK" status
- No virus signatures detected

### 4. Hacking Software Discovered

The computer contains an extensive collection of hacking tools organized in structured directories:

**Installed Applications:**
- **Ethereal** - Packet sniffer and network protocol analyzer
- **Cain & Abel** - Password recovery and network analysis tool (evidence: CAIN25B45.EXE in Prefetch)
- **Anonymizer** - Internet anonymity tool

**In My Documents/FOOTPRINTING/NT:**
- **nmap** - Network mapper with complete source code (nmapnt source)
- **SPADE 1.14** - Network scanning tool (spade114.exe)
- **SuperScan** - Port scanning utility
- **NSTPro2** - Network topology enumeration tool

**In My Documents/ENUMERATION/NT:**
- **Ogre** - Network enumeration scanner

**In My Documents/EXPLOITATION/NT:**
- **Brutus** - Password cracking tool (with NetBus.bad, Overview.doc, readme.doc, users.txt)
- **Pwdump** - Windows password dumping utility (pwdump3.zip)

**In My Documents/EXPLOITATION/Unix:**
- **dsniff 2.3** - Packet sniffer and network eavesdropping tool (with documentation: "Switched networks lose security advantage due packet tool")

### 5. Suspect Connection
Multiple pieces of evidence directly connect this computer to suspect Greg Schardt (alias "Mr. Evil"):
- Registered owner in Windows registry: Greg Schardt
- User account on system: "Mr. Evil" (suspect's known online nickname)
- Organized collection of network reconnaissance and exploitation tools
- Tools consistent with suspected activity: wireless access point interception for credential harvesting

---

## Case Questions

**Case Q1:** What operating system was used on the computer?
**Case Q1:** Microsoft Windows XP (identified from registry: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion, ProductName = "Microsoft Windows XP", CurrentVersion = 5.1, BuildNumber = 2600)

**Case Q2:** Who is the registered owner?
**Case Q2:** Greg Schardt (identified from registry: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion, RegisteredOwner value = "Greg Schardt"; also user account "Mr. Evil" present on system, matching suspect's online nickname)

**Case Q3:** Perform an Anti-Virus check. Are there any viruses on the computer?
**Case Q3:** No viruses detected. ClamAV antivirus scan performed on evidence returned 0 detections with "OK" status for both image segments (4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02). However, extensive hacking software and network penetration tools were found installed and documented on the system.