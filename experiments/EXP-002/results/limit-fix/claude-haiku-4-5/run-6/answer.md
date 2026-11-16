Based on my comprehensive investigation of the disk image, I can now prepare my final report.

---

# NIST HACKING CASE - DIGITAL FORENSICS REPORT

## Case Information
- **Case ID:** nist-hacking-case-av
- **Evidence:** 4Dell_Latitude_CPi.E01 (Dell Latitude CPi notebook)
- **Serial Number:** VLQLW
- **Investigation Date:** 2026-11-16

## Investigation Summary

The Dell CPi notebook was systematically analyzed for hacking software, evidence of use, and data connecting it to the suspect. The investigation revealed extensive hacking infrastructure and confirmed the system was actively used for network intrusion activities.

## Key Findings

### Hacking Software Identified

**Network Analysis & Packet Sniffing:**
- Ethereal 0.10.6 (network packet analyzer)
- dsniff 2.3 (Switched network sniffing tool)
- WINPCAP 3.01 (network packet capture library)

**Password Cracking & Credential Theft:**
- Cain & Abel 2.5 (CAIN25B45.EXE - password cracker and credential harvester)
- CUTE 3032 (CUTE3032.EXE - password cracker)
- Brutus (password brute-force tool)
- pwdump3 (password dumping utility) - stored in My Documents/EXPLOITATION/NT/Pwdump/

**Network Reconnaissance & Enumeration:**
- Look@LAN (network scanning tool)
- Nmap NT (network mapping)
- Cerberus Internet Scanner (NT network scanning)
- nstscan (network scanner)
- ogre (NT enumeration tool)
- ENUMERATION/NT/enum (network enumeration utilities)
- user2sid.exe (system enumeration)

**Remote Access & Backdoors:**
- NetBus (remote access trojan) - stored in My Documents/EXPLOITATION/NT/Brutus/
- snitch.exe (**DETECTED AS TROJAN** - Win.Trojan.Snitch-1)

**Anonymization Tools:**
- Anonymizer (internet privacy tool for masking network activity)

**Communication & Exploitation Frameworks:**
- mIRC (IRC client commonly used for coordinating attacks)

### Evidence of Exploitation Activity

**Documentation Folders:**
- My Documents/FOOTPRINTING/NT/ - network reconnaissance data
- My Documents/ENUMERATION/NT/ - enumeration results and tools
- My Documents/EXPLOITATION/NT/ - exploitation tools and documents
- My Documents/COMMANDS/ - command-line exploitation utilities
- My Documents/NOVELL/ - Novell network exploitation tools
- My Documents/ARCHIVE/ - archived exploitation tools

**Email Evidence:**
- alt.hacking.dbx (Outlook Express email database with hacking-related content)
- Stored in: Documents and Settings/Mr. Evil/Local Settings/Application Data/Identities/

**Wardriving Evidence:**
- File reference: "wardriving[1]" in cached internet files
- Consistent with case briefing describing suspect's wardriving activities at wireless hotspots

### Network Connection Evidence

- NetHood references to "andrews (c) on Andrews-1" indicating target computers or known associates
- Network mapping and scanning tools suggest active reconnaissance of networks

---

## Case Questions

**Case Q1: What operating system was used on the computer?**
Windows XP. Evidence includes: (1) "Powertoys for Windows XP" in Documents and Settings/All Users/Start Menu/Programs; (2) OOBE (Out-of-Box Experience) directory structure at WINDOWS/system32/oobe; (3) Prefetch files (.pf files) indicating Windows XP execution history; (4) Registry structure with system32/config directories typical of Windows XP.

**Case Q2: Who is the registered owner?**
The primary user account is "Mr. Evil" as evidenced by the user profile folder at "Documents and Settings/Mr. Evil". This account name matches the suspect's documented online nickname. The case briefing identifies this suspect's alias as "Mr. Evil," confirming the connection between the computer and the suspect Greg Schardt (also denoted in the briefing with equal signs around the name to prevent web indexing).

**Case Q3: Perform a Anti-Virus check. Are there any viruses on the computer?**
YES, VIRUS DETECTED. ClamAV antivirus scanning identified: **Win.Trojan.Snitch-1** in the file snitch.exe (My Documents/COMMANDS/snitch.exe, inode 10277). This is a remote access trojan/trojan horse program used for unauthorized system access and control. Additional malicious software present includes multiple password-stealing utilities (Cain & Abel, Brutus, pwdump3) and network sniffing tools designed for intercepting credentials and internet traffic, consistent with the case briefing describing the suspect's activities intercepting credit card numbers, usernames, and passwords at wireless hotspots.

---

## Conclusion

The Dell Latitude CPi notebook (Serial # VLQLW) contains comprehensive hacking infrastructure belonging to suspect Greg Schardt (alias "Mr. Evil"). The system contains active malware (Win.Trojan.Snitch-1) and numerous tools for network reconnaissance, password cracking, credential harvesting, packet sniffing, and remote access. Internet cache files reference wardriving activities. The evidence strongly ties this computer to the hacking suspect and supports the theory that it was used for the described wireless network intrusion activities.