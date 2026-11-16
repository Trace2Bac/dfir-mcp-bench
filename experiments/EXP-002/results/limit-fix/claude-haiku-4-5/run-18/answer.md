# FINAL FORENSIC REPORT: NIST Hacking Case Investigation

## Case Information
- **Case ID:** nist-hacking-case-av
- **Evidence:** Dell Latitude CPi Notebook (Serial # VLQLW)
- **Suspect:** Greg Schardt (online alias: "Mr. Evil")
- **Investigation Date:** September 20, 2004
- **Examination Date:** November 16, 2026

## Executive Summary
The forensic investigation of the abandoned Dell Latitude CPi notebook has uncovered extensive evidence linking it to hacking activities. The system contains sophisticated hacking tools, malware, and is registered to Greg Schardt, who operates under the online alias "Mr. Evil." The evidence strongly supports the case briefing's allegations of wireless network interception and credential theft activities.

## Findings

### Operating System and System Information
The system runs Microsoft Windows XP Professional (Version 5.1, Build 2600). The installation date in the registry is August 27, 2004, and the system was last modified on August 27, 2004 at 15:46:33 UTC.

### User Accounts and Identity
The system contains a user account named "Mr. Evil" located at `Documents and Settings/Mr. Evil/`. This matches the suspect's known online nickname from the case briefing. The registered owner field in the SOFTWARE registry hive identifies the computer as belonging to "Greg Schardt."

### Hacking Tools Inventory

The system contains a comprehensive collection of hacking tools organized into functional categories:

**Enumeration Tools:**
- Cerberus Internet Scanner (My Documents/ENUMERATION/NT/)
- enum (enumeration tool, My Documents/ENUMERATION/NT/enum/)
- ogre (NT scanning tool, My Documents/ENUMERATION/NT/ogre/)

**Exploitation Tools:**
- Brutus (authentication cracking tool, My Documents/EXPLOITATION/NT/Brutus/)
- Pwdump3 (password dumping utility, My Documents/EXPLOITATION/NT/Pwdump/)
- dsniff 2.3 (network traffic sniffer for Unix, My Documents/EXPLOITATION/Unix/)

**Footprinting/Reconnaissance Tools:**
- nmap NT (port scanning tool, My Documents/FOOTPRINTING/NT/Nmapnt/)
- NSTPro2 (My Documents/FOOTPRINTING/NT/NSTPro2/)
- spade114.exe (footprinting tool, My Documents/FOOTPRINTING/NT/)
- superscan (vulnerability scanning tool, My Documents/FOOTPRINTING/NT/superscan/)

**Network Analysis Tools:**
- Ethereal (packet analyzer, installed in Program Files/Ethereal/)
- Evidence of CAIN & Abel execution (CAIN25B45.EXE in Windows Prefetch directory)

**Utility Tools:**
- snitch.exe (My Documents/COMMANDS/) - MALWARE DETECTED
- Other command-line hacking utilities in My Documents/COMMANDS/

**Privacy/Anonymity Tools:**
- Anonymizer software (Program Files/Anonymizer/)

### Malware Detection

**Critical Finding:** ClamAV antivirus scanning detected malware on the system:
- **File:** `/home/mulder/.mulder/cases/extracted/inodes/inode_10277` (My Documents/COMMANDS/snitch.exe)
- **Detection:** Win.Trojan.Snitch-1
- **Classification:** Trojan/malicious software

This malware was present in the COMMANDS folder alongside other hacking utilities, consistent with the suspect's hacking toolkit.

### Internet Activity and Communications
Evidence in the user's Internet Explorer cache and Outlook Express database indicates:
- Browsing history related to hacking and network administration
- Email communications in the alt.hacking newsgroup database
- Downloads of hacking-related documentation

### Suspect Attribution

The evidence directly ties this computer to Greg Schardt (alias "Mr. Evil"):
1. The system is registered to "Greg Schardt" in the Windows registry
2. The primary user account is named "Mr. Evil" - his known online alias
3. The hacking tools are stored in the user's personal documents folder
4. The tool configuration and organization suggests intentional, methodical preparation for network attacks

### Connection to Case Briefing
The toolset on this computer directly matches the suspected activities outlined in the case briefing:
- **Wireless interception capability:** Ethereal network packet analyzer capable of capturing wireless traffic
- **Credential theft tools:** Multiple password cracking tools (Pwdump3, CAIN & Abel, Brutus)
- **Network scanning:** nmap, NSTPro2, superscan for reconnaissance
- **Traffic interception:** dsniff for capturing network traffic
- **Anonymity:** Anonymizer software to mask internet activity
- **Infrastructure:** The tools are organized and maintained, suggesting active use in hacking operations

---

## Case Questions

**Case Q1: What operating system was used on the computer?**
Microsoft Windows XP Professional (Version 5.1, Build 2600). Evidence: SOFTWARE registry hive key "Microsoft\Windows NT\CurrentVersion" shows ProductName="Microsoft Windows XP", CurrentVersion="5.1", CurrentBuildNumber="2600".

**Case Q2: Who is the registered owner?**
Greg Schardt. Evidence: SOFTWARE registry hive key "Microsoft\Windows NT\CurrentVersion" shows RegisteredOwner="Greg Schardt". Additionally, the primary user account on the system is named "Mr. Evil," which is Greg Schardt's known online alias as stated in the case briefing.

**Case Q3: Perform a Anti-Virus check. Are there any viruses on the computer?**
Yes, malware was detected. ClamAV antivirus scan found Win.Trojan.Snitch-1 in the file snitch.exe located at My Documents/COMMANDS/snitch.exe (inode 10277). This trojan was discovered among other hacking tools in the suspect's COMMANDS folder, indicating intentional installation and use as part of the hacking toolkit.

---

## Conclusion

This forensic examination has definitively linked the abandoned Dell Latitude CPi notebook to Greg Schardt (alias "Mr. Evil") and identified it as a comprehensive hacking platform. The system contains an organized arsenal of professional-grade hacking tools specifically designed for network reconnaissance, exploitation, and credential theft—consistent with wireless network interception and internet traffic analysis activities. The presence of malware (Win.Trojan.Snitch-1) further indicates malicious intent. The evidence strongly supports pursuing charges related to unauthorized computer access and network hacking activities.