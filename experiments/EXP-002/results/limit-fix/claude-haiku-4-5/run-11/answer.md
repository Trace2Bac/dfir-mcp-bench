Based on my investigation, I have gathered comprehensive evidence. Let me now compile the final forensic report.

## FORENSIC INVESTIGATION REPORT
### NIST Hacking Case - Dell Latitude CPi Notebook (Serial # VLQLW)

---

## CASE SUMMARY

On September 20, 2004, a Dell CPi notebook computer (serial # VLQLW) was found abandoned along with wireless networking equipment. The device is suspected to have been used for hacking/wireless interception purposes to steal credit card numbers, usernames, and passwords. The suspect is believed to be Greg Schardt (alias "Mr. Evil"). This investigation examined the EnCase forensic image of the hard drive.

---

## EVIDENCE CHAIN & ANALYSIS

**Disk Image Examined:**
- File: 4Dell_Latitude_CPi.E01 (640 MB)
- Total Files Indexed: 12,545 files
- File System: NTFS (Windows)

**Key Registry Findings:**
- SOFTWARE hive queried from: WINDOWS/system32/config
- SYSTEM hive queried from: WINDOWS/system32/config
- Last written date: 2004-08-27T15:08:22 UTC

---

## HACKING TOOLS DISCOVERED

The computer contains extensive collections of hacking and network analysis tools:

**Enumeration Tools:**
- Cerberus Internet Scanner (My Documents/ENUMERATION/NT/Cerberus Internet Scanner/)
- enum tool (My Documents/ENUMERATION/NT/enum/enum.tar.gz)
- ogre enumeration tool (My Documents/ENUMERATION/NT/ogre/)
- SPADE 1.14 port scanner (My Documents/FOOTPRINTING/NT/spade114.exe)
- NSTPro2 network security tool (My Documents/FOOTPRINTING/NT/NSTPro2/)

**Exploitation & Credential Tools:**
- Cain & Abel 2.5 (evidence in WINDOWS/Prefetch/CAIN25B45.EXE-056F3A6E.pf)
- pwdump3 password dumper (My Documents/EXPLOITATION/NT/Pwdump/pwdump3.zip)
- Brutus brute-force tool (My Documents/EXPLOITATION/NT/Brutus/ with NetBus.bad)
- dsniff network sniffer (My Documents/EXPLOITATION/Unix/dsniff 2.3/)

**Network Analysis Tools:**
- Ethereal network protocol analyzer (Program Files/Ethereal/)
- WinPcap packet capture library (WINDOWS/Prefetch/WINPCAP_3_01_A.EXE-1E3EDEDC.pf)
- mIRC IRC client (Installed in Program Files)
- Anonymizer privacy tool (Program Files/Anonymizer/)

**Utility & Command Tools (My Documents/COMMANDS/):**
- snitch.exe - System information/network spy tool
- user2sid.exe - User enumeration tool
- STREAMFIND.EXE - Network stream analysis
- Various scripting and utility executables

**Evidence of Wireless Activity:**
- Cached web reference to "wardriving" in temporary Internet files
- 802.11b wireless PCMCIA card found with device

---

## ANTI-VIRUS SCAN RESULTS

**ClamAV Scan Status:** 1 malware detection found

**Detection:**
- **File:** snitch.exe (My Documents/COMMANDS/)
- **Inode:** 10277
- **Detection:** Win.Trojan.Snitch-1 FOUND
- **SHA256:** 42ac6b745abd6ab4895ecab7baa93ec7cbdd618cc9419a1e7f8609f403d3110a
- **Size:** 24,576 bytes
- **Threat:** Trojan horse capable of espionage and system compromise

---

## SUSPECT IDENTIFICATION

**Account Profile Found:**
- User Directory: Documents and Settings/Mr. Evil
- Hacking tools and data stored in user's My Documents folder
- Direct correlation with suspect alias "Mr. Evil"
- Email/cache evidence indicates interest in network security attacks and credential theft

**Network Evidence:**
- Cached web pages referencing wardriving techniques
- Storage of network analysis tools and scanning reports
- Enumeration reports for network hosts (ntreg172.16.0.2.html, etc.)

---

## Case Questions

**Case Q1: What operating system was used on the computer?**
Microsoft Windows XP (Build 2600, Version 5.1). Registry ProductName: "Microsoft Windows XP", CurrentBuildNumber: "2600", BuildLab: "2600.xpclient.010817-1148".

**Case Q2: Who is the registered owner?**
Greg Schardt. Registry SOFTWARE hive, key: Microsoft\Windows NT\CurrentVersion, value: RegisteredOwner = "Greg Schardt". This matches the suspect alias "Mr. Evil" found as the primary user account directory name.

**Case Q3: Perform a Anti-Virus check. Are there any viruses on the computer?**
Yes. ClamAV detected 1 virus: Win.Trojan.Snitch-1 in the file snitch.exe located at My Documents/COMMANDS/. The trojan is a spyware/espionage tool capable of intercepting network traffic and extracting sensitive information, consistent with the suspect's suspected activities of intercepting passwords and credit card numbers at wireless hotspots.

---

## CONCLUSION

The forensic analysis confirms that this Dell CPi notebook was actively configured and used for network hacking operations. The registered owner is Greg Schardt (alias "Mr. Evil"), and substantial evidence of hacking tools, malware, and wireless interception activities are present on the device. The discovered Snitch trojan combined with Ethereal, Cain & Abel, pwdump3, and other network analysis tools strongly supports the theory that this computer was used to intercept wireless traffic and steal credentials at public wireless access points (T-Mobile Hotspots, Starbucks, etc.).

---

**Report Compiled:** November 16, 2026  
**Forensic Examiner:** Digital Forensics Analysis  
**Case ID:** nist-hacking-case-av