---

# FORENSIC INVESTIGATION REPORT
## NIST Hacking Case - Dell Latitude CPi

**Case ID:** nist-hacking-case-av  
**Evidence:** 4Dell_Latitude_CPi.E01 / E02  
**Investigation Date:** 2026-11-14

---

## Evidence Collection Summary

The investigation examined a Dell Latitude CPi notebook computer found abandoned on 09/20/04. The disk image (640.0 MB) was successfully analyzed using forensic tools including partition analysis, file listing, ClamAV antivirus scanning, and Windows Registry examination.

---

## Key Findings

### Operating System Analysis
Windows XP was identified as the operating system installed on the computer. The system was installed on August 27, 2004, less than a month before the computer's discovery.

### Registered Owner Identification
The computer's registered owner is **Greg Schardt**, as documented in the Windows Registry SOFTWARE hive. Notably, the system also contains a user account named **"Mr. Evil"**, which directly matches the online nickname associated with the suspect mentioned in the case briefing.

### Anti-Virus Scan Results
A comprehensive ClamAV antivirus scan was performed on the entire evidence directory. The results show:
- **Status:** No malware detected
- **Detections:** 0
- Both E01 and E02 image segments: OK

---

## Hacking Software and Tools Discovered

The forensic analysis revealed extensive evidence of hacking software installed and organized on the computer, structured into functional categories within "My Documents":

### Network Reconnaissance Tools
- **FOOTPRINTING/NT**: Contains Nmapnt (network mapper), NSTPro2, SuperScan, SPADE port scanner
- **ENUMERATION/NT**: Cerberus Internet Scanner, enum tool, ogre enumeration utility

### Exploitation Tools
- **EXPLOITATION/NT/Brutus**: Password cracking tool with associated documentation (NetBus.bad, Overview.doc, readme.doc, users.txt)
- **EXPLOITATION/NT/Pwdump**: Password dumping utility (pwdump3)
- **EXPLOITATION/Unix/dsniff 2.3**: Advanced packet sniffer and credential extraction tool specifically noted for "Switched networks lose security advantage"

### Installed Applications
- **Ethereal**: Network packet sniffer installed in Program Files with full plugin suite (version 0.10.6)
- **Cain & Abel**: Password recovery and network analysis tool (CAIN25B45.EXE found in Windows Prefetch)
- **Anonymizer Toolbar**: Internet anonymity software installed in Program Files

### Evidence of Wireless Intrusion Activity
- **Wardriving reference**: File "wardriving[1]" found in Mr. Evil's temporary Internet files cache
- **Network utilities**: Whois tool shortcut on Desktop/Tools
- **Network connections**: Mapped network shares in NetHood directory

### User Activity Evidence
- **alt.hacking.dbx**: Outlook Express database file showing subscription to the alt.hacking newsgroup
- **User account "Mr. Evil"**: Matches the suspect's known online nickname, confirming user identity on system

---

## Correlation to Case Background

The discovered tools and evidence directly correlate with the suspect's alleged activities:
1. **Wireless interception capability**: Ethereal and dsniff are designed for capturing wireless and network traffic
2. **Credential acquisition**: Brutus, Pwdump, and Cain & Abel are used for password cracking and credential harvesting
3. **Network reconnaissance**: The collection of footprinting and enumeration tools supports systematic network surveying
4. **Online identity**: The "Mr. Evil" user account confirms the suspect's online alias presence on this device
5. **Organized approach**: The systematic folder structure (ENUMERATION, EXPLOITATION, FOOTPRINTING) indicates deliberate, methodical hacking activity rather than casual usage

---

## Case Questions

**Case Q1: What operating system was used on the computer?**  
Microsoft Windows XP (Version 5.1, Build 2600) was installed on the computer. The system was installed on August 27, 2004.

**Case Q2: Who is the registered owner?**  
Greg Schardt is the registered owner according to the Windows Registry. Additionally, the system contains a user account named "Mr. Evil" which matches the suspect's known online nickname, confirming his association with this device.

**Case Q3: Perform an Anti-Virus check. Are there any viruses on the computer?**  
The ClamAV antivirus scan detected 0 viruses. Both the E01 and E02 image segments returned status "OK" with no malware detections.

---

**Investigator Note:** While no viruses were detected, the computer contains an extensive collection of legitimate hacking and network analysis tools that have been organized and configured for active use in network intrusion and credential harvesting activities consistent with the suspect's alleged modus operandi.