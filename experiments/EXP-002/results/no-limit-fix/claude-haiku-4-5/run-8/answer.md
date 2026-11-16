Now I have all the information needed to answer the case questions. Let me compile the final forensic report.

---

# DIGITAL FORENSIC INVESTIGATION REPORT
## Case: NIST Hacking Case - Dell Latitude CPi Notebook
### Evidence Item: Dell_Latitude_CPi (Serial #VLQLW)
### Case ID: nist-hacking-case-av
### Investigation Date: 2026-11-16

## EXECUTIVE SUMMARY

A forensic examination of the Dell Latitude CPi notebook (serial #VLQLW) was conducted to determine if the computer was used for hacking purposes and to establish any connection to suspected hacker Gregory Schardt (alias "Mr. Evil"). The investigation reveals extensive evidence of sophisticated network hacking tools, their organization by attack phase, and clear attribution to the suspect.

## INVESTIGATION FINDINGS

### 1. SYSTEM IDENTIFICATION
- **Operating System**: Microsoft Windows XP (Build 2600)
- **System Owner**: Greg Schardt (registry value: RegisteredOwner)
- **Owner Username**: "Mr. Evil" (user profile directory name)
- **Registered Organization**: N/A
- **Product ID**: 55274-640-0147306-23684

### 2. HACKING TOOLS DISCOVERED

The computer contains an extensive collection of hacking tools organized systematically in "My Documents" by attack methodology:

**FOOTPRINTING (Reconnaissance) Tools:**
- Nmapnt (Windows version of nmap) - network mapper with source code
- NSTPro2 - network analysis tool
- spade114.exe - network topology mapper
- superscan - network scanner
- WinCUTE (CUTE3032.EXE) - network monitoring tool found in Prefetch

**ENUMERATION Tools:**
- ogre - system enumeration utility with installation scripts
- enum - Windows enumeration tool with source code

**EXPLOITATION Tools:**
- Brutus - password brute-force tool with configuration file for attacking NetBUS backdoors (NetBUS.bad)
- Pwdump3 - Windows password hash extraction tool (pwdump3.zip)
- dsniff 2.3 - packet sniffer for intercepting network traffic

**Installed Applications:**
- **Ethereal** (Program Files/Ethereal) - professional packet sniffer/network analyzer with Start Menu shortcut
- **Look@LAN** (Program Files/Look@LAN) - LAN monitoring and discovery tool
- **Anonymizer** (Program Files/Anonymizer) - internet anonymization software
- **Cain & Abel v2.5** (referenced in Prefetch as CAIN25B45.EXE) - password recovery and network analysis tool

### 3. EVIDENCE OF USAGE

**Recent Program Execution (Prefetch Cache):**
- TELNET.EXE-24182D40.pf - Command-line remote connection tool
- WINPCAP_3_01_A.EXE-1E3EDEDC.pf - WinPcap packet capture library (required for Ethereal, dsniff)
- CUTE3032.EXE-1F409A25.pf - Network monitoring tool
- CMD.EXE-087B4001.pf - Command Prompt execution
- CAIN25B45.EXE-056F3A6E.pf - Password recovery tool

**Internet Activity:**
- Browser cache in temporary internet files with multiple domains
- Internet Explorer history dating from August-September 2004
- Outlook Express mailbox: "alt.hacking.dbx" - indicating participation in alt.hacking newsgroup/forum

**Suspicious Files:**
- Brutus configuration file (NetBUS.bad) showing target configuration: 127.0.0.1:12345 with authentication strings "netbus" and "Access" - evidence of attempted backdoor exploitation

### 4. ATTRIBUTION TO SUSPECT

Multiple lines of evidence directly link this computer to Gregory Schardt:

1. **Username**: User profile folder is literally named "Documents and Settings/Mr. Evil" - matching the suspect's known alias "Mr. Evil"
2. **Registry**: RegisteredOwner in SOFTWARE hive explicitly shows "Greg Schardt"
3. **Organized Hacking Infrastructure**: Tools are organized by attack phase (FOOTPRINTING → ENUMERATION → EXPLOITATION), indicating systematic, planned hacking methodology
4. **Wireless Equipment**: Computer found with wireless PCMCIA card and homemade 802.11b antenna - consistent with the briefing description and the cached reference to "wardriving"

### 5. ANTIVIRUS SCAN RESULTS

**ClamAV Antivirus Scan**: 
- Result: **0 detections (clean)**
- Image files scanned: 4Dell_Latitude_CPi.E01, 4Dell_Latitude_CPi.E02
- Extracted files scanned: Brutus configuration, pwdump3.zip, dsniff files

No viruses were detected by ClamAV. Note: Many hacking tools (nmap, Ethereal, dsniff, etc.) are legitimate security tools not flagged by commercial antivirus software, though they can be misused for malicious purposes.

---

## Case Questions

**Case Q1: What operating system was used on the computer?**
Microsoft Windows XP (Build 2600, Version 5.1)

**Case Q2: Who is the registered owner?**
Greg Schardt (as shown in the Windows XP SOFTWARE registry hive at HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner)

**Case Q3: Perform an Anti-Virus check. Are there any viruses on the computer?**
ClamAV antivirus scan completed with 0 detections. No viruses were identified on the disk image. However, the computer contains numerous hacking and network reconnaissance tools that, while not detected as viruses, are consistent with malicious use as described in the case briefing (credential theft, packet sniffing, password attacks).

---

## CONCLUSION

This investigation provides strong evidence that the Dell Latitude CPi notebook was used for network hacking and information gathering activities. The systematic organization of hacking tools by attack phase, the explicit registration to Gregory Schardt, and the username "Mr. Evil" (the suspect's known alias) provide clear attribution to the suspect. The presence of Ethereal, dsniff, and packet capture libraries specifically supports the briefing allegation that Schardt was intercepting internet traffic at wireless hotspots to capture credentials and payment information.