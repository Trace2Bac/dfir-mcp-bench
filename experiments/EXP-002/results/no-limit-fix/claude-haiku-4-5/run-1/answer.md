Excellent findings. Now let me compile the final forensic report based on all evidence gathered.

---

# DIGITAL FORENSIC EXAMINATION REPORT

**Case ID:** nist-hacking-case-av  
**Evidence:** Dell Latitude CPi notebook (Serial # VLQLW)  
**Image:** 4Dell_Latitude_CPi.E01/E02  
**Date Examined:** 2026-11-16

## Executive Summary

This investigation examined an abandoned Dell notebook computer suspected of being used for hacking purposes, specifically for intercepting wireless network traffic to obtain credit card numbers, usernames, and passwords. The forensic analysis reveals conclusive evidence that this computer was used for malicious hacking activities and can be directly tied to the suspect Gregory Schardt (online alias "Mr. Evil").

## Key Findings

### 1. Operating System Identification
The computer was running **Microsoft Windows XP** (Build 2600). The registry indicates the system was installed on August 27, 2004 (InstallDate: 1092955707 Unix epoch).

### 2. Registered Owner
The registered owner of the system is **Greg Schardt**, confirming direct connection between the suspect and this equipment. Additionally, a user profile named "**Mr. Evil**" was discovered on the system, directly matching the suspect's known online alias.

### 3. Hacking Software and Tools Discovered

The system contained a comprehensive suite of hacking and network exploitation tools:

**Network Sniffing/Packet Capture:**
- **Ethereal** (Modern name: Wireshark) - installed in Program Files, capable of capturing and analyzing network traffic
- **dsniff 2.3** - documentation found at `My Documents/EXPLOITATION/Unix/dsniff 2.3`
- **Cain & Abel** (CAIN25B45.EXE) - found in Windows Prefetch, comprehensive network sniffing and password recovery tool

**Password Cracking/Exploitation:**
- **Pwdump3** - Windows password hash extraction tool, located at `My Documents/EXPLOITATION/NT/Pwdump/`
- **Brutus** - password cracking tool, located at `My Documents/EXPLOITATION/NT/Brutus/`
- **NetBus** configuration file found in Brutus folder

**Network Reconnaissance:**
- **Look@LAN** - network scanning tool installed in Program Files
- **OGRE** - network enumeration tool, found at `My Documents/ENUMERATION/NT/ogre/`

**Supporting Infrastructure:**
- **mIRC** - IRC client for communication
- **Anonymizer** - web anonymization tool for concealing online activities

### 4. Evidence of Malicious Intent

**Organized Exploitation Infrastructure:**
- Dedicated folder structure: `My Documents/EXPLOITATION/` containing categorized attack tools
- Separate `My Documents/ENUMERATION/` folder for reconnaissance tools
- Systematic organization indicates deliberate hacking operations

**War-Driving Evidence:**
- Cached file reference "wardriving[1]" found in "Mr. Evil" user's Internet Explorer cache at `Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/JIRVJY9X/wardriving[1]`
- This directly correlates with the briefing's description of war-driving activity (parking near wireless access points)

**Communication Records:**
- Outlook Express mailbox file `alt.hacking.dbx` found in "Mr. Evil" profile
- IRC client (mIRC) presence indicates coordination with other parties

### 5. Anti-Virus Scan Results

ClamAV antivirus scan performed on 2026-11-16:
- **Result:** OK (no viruses detected)
- Both image segments (E01 and E02) returned clean
- No malicious code signatures detected in the scanning database

## Timeline

- **August 27, 2004:** Windows XP system installation date
- **August 19, 2004:** Last registry write to TimeZoneInformation (Central Time Zone)
- **September 20, 2004:** Computer found abandoned with wireless PCMCIA card and antenna

## Forensic Conclusions

This investigation provides **conclusive evidence** that:

1. The abandoned Dell notebook was systematically configured for hacking operations
2. The suspect Gregory Schardt (alias "Mr. Evil") is the registered owner and primary user
3. Multiple sophisticated tools for network sniffing, password cracking, and network reconnaissance were installed and organized for active use
4. The tools are consistent with the briefing's description of intercepting wireless network traffic for credential theft
5. War-driving artifacts corroborate the suspect's suspected activities near wireless hotspots

---

## Case Questions

**Case Q1:** Microsoft Windows XP (Build 2600, Version 5.1)

**Case Q2:** Greg Schardt (Registry value "RegisteredOwner" = "Greg Schardt"; confirmed via user profile alias "Mr. Evil")

**Case Q3:** No viruses detected. ClamAV antivirus scan completed on both E01 and E02 image segments with result "OK" – zero malware signatures matched.