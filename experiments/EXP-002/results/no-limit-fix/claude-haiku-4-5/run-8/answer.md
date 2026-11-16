Perfect! I have comprehensive evidence. Let me now compile the final forensic report.

---

# DIGITAL FORENSIC INVESTIGATION REPORT
## Case: NIST Hacking Case - Dell Latitude CPi
**Case ID:** nist-hacking-case-av  
**Investigation Date:** 2026-11-16  
**Evidence:** /evidence/nist-hacking-case/4Dell_Latitude_CPi.E01 & E02

---

## Executive Summary

This investigation examined a Dell Latitude CPi notebook computer (serial # VLQLW) suspected of being used for hacking purposes. The investigation successfully identified the registered owner, the operating system in use, and discovered extensive hacking tools, suspicious configurations, and evidence of malicious activity directly tied to the suspect Greg Schardt (online alias "Mr. Evil").

---

## Investigation Findings

### 1. System Information
- **Operating System:** Microsoft Windows XP (Version 5.1, Build 2600)
- **Installation Date:** August 27, 2004 (Unix timestamp: 1092955707)
- **System Root:** C:\WINDOWS

### 2. Ownership Identification

A user profile named **"Mr. Evil"** was found in the Documents and Settings folder. Registry analysis revealed:
- **Registered Owner:** Greg Schardt
- **Registry Path:** HKLM\Software\Microsoft\Windows NT\CurrentVersion\RegisteredOwner
- **Source:** SOFTWARE hive, last written 2004-08-27

This directly ties the computer to the suspect. The username "Mr. Evil" matches the online nickname referenced in the case briefing as associated with Greg Schardt.

### 3. Antivirus Scan Results

**ClamAV Antivirus Scan Execution:**
- Scanned: /evidence/nist-hacking-case/4Dell_Latitude_CPi.E01
- Scanned: /evidence/nist-hacking-case/4Dell_Latitude_CPi.E02
- **Result:** OK (No detections)
- **Conclusion:** No viruses detected by ClamAV signature database

### 4. Hacking Software Discovered

The computer contains multiple professional hacking and reconnaissance tools:

**Network Sniffing Tools:**
- **Ethereal** - Network protocol analyzer/packet sniffer (installed in Program Files)
- **dsniff 2.3** - Advanced packet sniffer tool (in My Documents/EXPLOITATION/Unix/)

**Network Scanning & Enumeration:**
- **nmap (nmapNT)** - Network mapper for port scanning (in My Documents/FOOTPRINTING/NT/)
- **Cain & Abel 2.5** - Network security analysis tool (Windows prefetch: CAIN25B45.EXE)
- **NSTPro2** - System scanning tool
- **superscan** - Network scanner

**Password & Exploitation Tools:**
- **Brutus** - Password cracking/brute force tool (in My Documents/EXPLOITATION/NT/)
- **pwdump3** - Windows password dumping utility (in My Documents/EXPLOITATION/NT/)
- **NetBUS** - Remote administration tool configured in Brutus

**Email & Communications:**
- Outlook Express with subscription to **alt.hacking.dbx** (hacking newsgroup)

### 5. Evidence of Tool Usage

**Brutus Password Cracking Configuration:**
- File: My Documents/EXPLOITATION/NT/Brutus/NetBus.bad
- Content: Brutus configuration targeting NetBUS service on 127.0.0.1:12345
- Shows parameter setup for automated password cracking attacks

**Brute Force Attack Wordlist:**
- File: My Documents/EXPLOITATION/NT/Brutus/users.txt
- Contents: Common default usernames (admin, administrator, test, guest, root, backup)
- Purpose: Used for brute force password attacks

**Wardriving Activity:**
- File found: Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/.../wardriving[1]
- Indicates engagement in wardriving (wireless network scanning/interception)

### 6. Tool Organization Structure

Tools are systematically organized by attack type:
- **My Documents/ARCHIVE/** - Archived utility tools
- **My Documents/ENUMERATION/** - Network enumeration tools (OGRE enumeration tool)
- **My Documents/EXPLOITATION/** - Active exploitation tools
  - **/NT/** - Windows-targeted exploits
  - **/Unix/** - Unix/Linux-targeted exploits
- **My Documents/FOOTPRINTING/** - Reconnaissance tools (nmap, NSTPro2, SuperScan, SPADE)

### 7. Connection to Suspect

Multiple forensic artifacts establish connection between the computer and Greg Schardt (aka "Mr. Evil"):

1. **Registry Owner:** Greg Schardt registered as system owner
2. **User Profile:** "Mr. Evil" user folder with personal browser history, email, desktop items
3. **Email Subscription:** alt.hacking.dbx file in Mr. Evil's Outlook Express profile
4. **NetBUS Configuration:** Password cracking configuration in Mr. Evil's Documents folder
5. **Wardriving Reference:** Wardriving file in Mr. Evil's Internet cache

---

## Analysis

The evidence indicates the computer was actively used for:
- **Wireless network interception** (wardriving equipment referenced, wireless PCMCIA card found with device)
- **Network reconnaissance** (nmap, scanning tools organized and configured)
- **Credential harvesting** (packet sniffing tools: Ethereal, dsniff)
- **Password cracking** (Brutus with NetBUS attack configuration and common username wordlist)
- **Remote exploitation** (NetBUS remote admin tool)

This aligns with the case briefing allegations that Schardt ("Mr. Evil") would "park his vehicle within range of Wireless Access Points (like Starbucks and other T-Mobile Hotspots) where he would then intercept internet traffic, attempting to get credit card numbers, usernames & passwords."

---

## Case Questions

**Case Q1: What operating system was used on the computer?**
Microsoft Windows XP (Version 5.1, Build 2600, with system registry dated 2004-08-27)

**Case Q2: Who is the registered owner?**
Greg Schardt (confirmed in HKLM\Software\Microsoft\Windows NT\CurrentVersion\RegisteredOwner in the SOFTWARE registry hive, and user profile folder named "Mr. Evil" matching his suspected online nickname)

**Case Q3: Perform a Anti-Virus check. Are there any viruses on the computer?**
ClamAV antivirus scan was executed on both disk image segments (4Dell_Latitude_CPi.E01 and E02). Result: OK - No viruses detected by ClamAV. However, the presence of hacking tools (Ethereal, dsniff, Brutus, pwdump3, NetBUS, etc.) and evidence of their configured usage (password cracking wordlists, Brutus NetBUS attack configuration) indicates the computer contains malicious software tools and evidence of hacking activity, though these are not detected as viruses by ClamAV's signature database.

---

**End of Report**