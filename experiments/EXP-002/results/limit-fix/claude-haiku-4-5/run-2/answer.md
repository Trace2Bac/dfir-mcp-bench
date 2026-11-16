Perfect! I now have comprehensive evidence. Let me compile the final forensic report.

---

# FORENSIC INVESTIGATION REPORT
## NIST Hacking Case - Dell CPi Notebook (Serial # VLQLW)

### Case Information
- **Case ID:** nist-hacking-case-av
- **Evidence:** Dell Latitude CPi Notebook EnCase Image (4Dell_Latitude_CPi.E01)
- **Investigation Date:** 2026-11-16
- **Investigator:** Digital Forensic Examiner

---

## EXECUTIVE SUMMARY

This investigation examined an abandoned Dell CPi notebook computer suspected of being used for hacking purposes. The computer was found with a wireless PCMCIA card and external 802.11b antenna on 09/20/04. The investigation reveals extensive evidence of the computer being used for network reconnaissance, packet sniffing, password cracking, and credential interception activities consistent with the briefing description of intercepting traffic from wireless hotspots to capture credit card numbers, usernames, and passwords.

---

## FINDINGS

### 1. System Information
- **Operating System:** Microsoft Windows XP (Version 5.1, Build 2600)
- **Install Date:** 08/20/2004 (Unix timestamp: 1092955707)
- **Product ID:** 55274-640-0147306-23684

### 2. User Accounts
The system contains a user account named **"Mr. Evil"** located at:
- `Documents and Settings/Mr. Evil/`

This username directly matches the online nickname referenced in the case briefing for the suspect Greg Schardt.

Evidence of this account's activity includes:
- Desktop containing a "Tools" folder with shortcut to whois utility
- Extensive browser history and temporary internet files
- Outlook Express mailbox related to hacking discussions

### 3. Hacking Tools and Software

The computer contains extensive collections of professional hacking and security testing tools organized into directories:

**EXPLOITATION TOOLS:**
- `My Documents/EXPLOITATION/NT/Brutus/` - Brute force attack tool
- `My Documents/EXPLOITATION/NT/Pwdump/` - Windows password dumping utility
- `My Documents/EXPLOITATION/Unix/dsniff 2.3/` - **Packet sniffing tool for intercepting network traffic and credentials**
- CAIN25B45.EXE (Prefetch evidence shows execution)

**RECONNAISSANCE/FOOTPRINTING TOOLS:**
- `My Documents/FOOTPRINTING/NT/Nmapnt/` - Network mapping tool
- `My Documents/FOOTPRINTING/NT/NSTPro2/` - Port scanner
- `My Documents/FOOTPRINTING/NT/spade114.exe` - Network reconnaissance tool
- `My Documents/FOOTPRINTING/NT/superscan/` - Port scanner
- `My Documents/ENUMERATION/NT/` - Cerberus Internet Scanner, enum tools

**INSTALLED APPLICATIONS:**
- `Program Files/Ethereal/` - **Network packet analysis tool (now called Wireshark)**
- `Program Files/Look@LAN/` - Network discovery and analysis tool
- `Program Files/Anonymizer/` - Traffic anonymization software
- `Program Files/Agent/` - Email retrieval software

**NETWORK INTERCEPTION EVIDENCE:**
- Temporary Internet Files cache contains reference to **"wardriving"** - a technique of driving around to locate and intercept wireless networks

### 4. Malware Detection

**ClamAV Antivirus Scan Results:**
- **Detection Found:** Yes (1 detection)
- **Malware Identified:** `Win.Trojan.Snitch-1` in file `My Documents/COMMANDS/snitch.exe`
  - File Size: 24,576 bytes
  - SHA256: 42ac6b745abd6ab4895ecab7baa93ec7cbdd618cc9419a1e7f8609f403d3110a
  - Snitch is a known trojan that performs spyware-like reconnaissance functions

### 5. Evidence of Hacking Activity

**Prefetch Files (Program Execution Evidence):**
- CAIN25B45.EXE - Password cracking and network analysis tool
- TELNET.EXE - Remote access utility
- CMD.EXE - Command shell for exploitation
- WINPCAP_3_01_A.EXE - Packet capture library (required by sniffing tools)

**Email Evidence:**
- Outlook Express mailbox located at:
  `Documents and Settings/Mr. Evil/Local Settings/Application Data/Identities/.../alt.hacking.dbx`
  - This mailbox is specifically named "alt.hacking" suggesting subscription to hacking-related newsgroups/discussions

### 6. Connection to Suspect Greg Schardt

Multiple lines of evidence connect this computer to the suspect:
1. **Registered Owner:** Registry shows "Greg Schardt" as the RegisteredOwner
2. **User Account:** "Mr. Evil" username matches suspect's known online nickname
3. **Tool Collection:** Professional hacking tools consistent with briefing description of intercepting wireless hotspot traffic
4. **Wireless Hardware:** Computer found with wireless PCMCIA card and external 802.11b antenna
5. **Wardriving Evidence:** Browser cache contains wardriving references consistent with parking near T-Mobile Hotspots/Starbucks as described

---

## CASE QUESTIONS

**Case Q1: What operating system was used on the computer?**
Microsoft Windows XP (Version 5.1, Build 2600), installed on 08/20/2004.

**Case Q2: Who is the registered owner?**
Greg Schardt. This is confirmed in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion\RegisteredOwner` which contains the value "Greg Schardt". The user account "Mr. Evil" on the system matches the suspect's known online nickname.

**Case Q3: Perform a Anti-Virus check. Are there any viruses on the computer?**
Yes. ClamAV antivirus scan detected 1 malware infection: **Win.Trojan.Snitch-1** in the file `My Documents/COMMANDS/snitch.exe` (24,576 bytes). Snitch is a known trojan used for reconnaissance and network monitoring. Additionally, the computer contains numerous legitimate but malicious-use tools including packet sniffers (dsniff, Ethereal), password crackers (CAIN & Abel), and brute force tools (Brutus), indicating the computer was actively used for hacking operations targeting wireless hotspots to intercept traffic and capture credentials.

---

## CONCLUSION

The forensic examination provides compelling evidence that this Dell CPi notebook was used for hacking and credential interception operations consistent with the briefing description. The presence of packet sniffing tools (dsniff, Ethereal), password cracking utilities (CAIN & Abel), and the wardriving evidence combined with the wireless hardware strongly suggests the suspect parked near wireless hotspots (T-Mobile/Starbucks) to intercept internet traffic and capture credit card numbers and login credentials. The computer is registered to Greg Schardt and contains a user account matching his online nickname "Mr. Evil," providing direct attribution to the suspect.