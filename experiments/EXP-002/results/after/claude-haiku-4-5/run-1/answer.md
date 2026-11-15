## FORENSIC INVESTIGATION REPORT
### Case: NIST Hacking Case - Dell Latitude CPi (Serial #VLQLW)
**Case ID:** nist-hacking-case-q31  
**Examiner:** Digital Forensic Unit  
**Date:** 2026-11-14

---

## Executive Summary

A forensic examination was conducted on the Dell Latitude CPi notebook computer (serial #VLQLW) recovered with wireless PCMCIA card and homemade 802.11b antenna on 09/20/04. The investigation reveals this computer belongs to a user identifying as "Mr. Evil"—matching the suspected attacker's online nickname—and contains extensive hacking and exploitation tools organized in deliberate directory structures for network reconnaissance, password cracking, packet sniffing, and system exploitation.

---

## Findings

### 1. Computer Ownership & Identity Tie
The system belongs to user account **"Mr. Evil"** as evidenced by the user profile directory `Documents and Settings/Mr. Evil/`. This directly matches the suspected hacker's online nickname from the case briefing, establishing a strong identity link to the suspect Gregory Schardt.

### 2. Hacking Tools & Infrastructure

The computer contains a comprehensive arsenal of hacking tools organized into functional categories:

**EXPLOITATION TOOLS:**
- **Brutus** - Password cracking/brute force tool (My Documents/EXPLOITATION/NT/Brutus/)
- **Pwdump3** - Windows password hash extraction tool
- **NetBus** - Remote system control tool (NetBus.bad file)
- **dsniff 2.3** - Network packet sniffing tool for intercepting traffic

**ENUMERATION/SCANNING TOOLS:**
- **ogre** - System enumeration tool
- **Cerberus Internet Scanner** - Network scanning tool with saved reports
- **enum** - Detailed enumeration tool

**FOOTPRINTING/RECONNAISSANCE:**
- **SPADE 1.14** - Network scanning and probing tool
- **SuperScan** - Port scanning utility
- **Nmap NT** - Network mapping tool with full source code
- **NSTPro2** - Network security testing tool

**SUPPORTING INFRASTRUCTURE:**
- **Anonymizer** software - For IP address hiding
- **ARJ archiver** - For file compression/obfuscation
- **COMMANDS directory** - Contains utilities like snitch.exe, user2sid.exe for system enumeration

### 3. Evidence of Intended Use

- **Wardriving evidence**: File "wardriving[1]" found in browser cache (Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/), indicating wireless network reconnaissance
- **Hacking newsgroup subscription**: Email database "alt.hacking.dbx" (Outlook Express) found in user profile
- **Organized structure**: Tools meticulously organized by attack phase (COMMANDS, ENUMERATION, EXPLOITATION, FOOTPRINTING) and platform type (NT/Unix)
- **Documentation**: Included readme files, overview documents, and saved scan reports

### 4. Antivirus Scan Results

**ClamAV antivirus scan performed on:** Both disk image segments (E01 and E02)

**Result:** No viruses detected  
- /evidence/nist-hacking-case/4Dell_Latitude_CPi.E01: **OK**
- /evidence/nist-hacking-case/4Dell_Latitude_CPi.E02: **OK**

---

## Case Questions

**Case Q1:** Perform an Anti-Virus check. Are there any viruses on the computer?

**Answer:** ClamAV antivirus scan of both image segments returned clean results (OK status for both E01 and E02). No known virus signatures were detected. However, the computer contains extensive hacking and exploitation tools deliberately organized for malicious purposes (password cracking, packet sniffing, remote access, and network enumeration), which represent a significant security threat even though they are not detected as viruses by signature-based antivirus. These are purpose-built hacking tools, not malware/viruses.

---

## Conclusion

The Dell Latitude CPi computer provides strong evidence of malicious hacking activity and directly implicates the suspect "Mr. Evil" (Gregory Schardt). While no traditional viruses were found, the system is weaponized with a sophisticated toolkit for password cracking, network reconnaissance, packet interception, and remote system exploitation—consistent with the suspected activity pattern of intercepting wireless internet traffic and attempting to obtain credit card numbers, usernames, and passwords from Wireless Access Point (WAP) hotspots such as Starbucks and T-Mobile.