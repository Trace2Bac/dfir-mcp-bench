Based on my forensic investigation, I can now provide the final report. I have gathered comprehensive evidence from the disk image.

---

# FORENSIC INVESTIGATION REPORT
## NIST Hacking Case - Dell CPi Notebook

**Case ID:** nist-hacking-case-av  
**Evidence:** 4Dell_Latitude_CPi.E01/E02  
**Computer:** Dell CPi Notebook, Serial # VLQLW  
**Date Found:** 09/20/04

## Investigation Summary

The abandoned Dell CPi notebook was found with a wireless PCMCIA card and homemade 802.11b antenna, suspected to be used for hacking purposes. The investigation aimed to identify the operating system, registered owner, and check for viruses.

## Evidence Findings

### Operating System Identification
Registry analysis of the SOFTWARE hive revealed:
- **ProductName:** Microsoft Windows XP
- **CurrentVersion:** 5.1
- **BuildNumber:** 2600
- **BuildLab:** 2600.xpclient.010817-1148
- **InstallDate:** 2004-08-27

### Registered Owner
Registry analysis of Microsoft\Windows NT\CurrentVersion confirmed:
- **RegisteredOwner:** Greg Schardt
- **RegisteredOrganization:** N/A
- **ProductID:** 55274-640-0147306-23684

This directly ties the computer to the primary suspect, Greg Schardt (also known by the alias "Mr. Evil").

### User Accounts
A user account named **"Mr. Evil"** was found on the system, confirming the suspect's online presence and nickname.

### Hacking Tools and Evidence

**Network Analysis/Packet Sniffing Tools:**
1. **Ethereal** (now Wireshark) - Full packet capture and network analysis tool installed in Program Files/Ethereal/
2. **WinPcap 3.01** - Network packet capture library (prefetch evidence shows WINPCAP_3_01_A.EXE was executed)
3. **Look@LAN** - LAN network discovery/scanner tool in Program Files/Look@LAN/

**Network Reconnaissance Tools in My Documents/FOOTPRINTING/NT/:**
- **spade114.exe** - SPade network scanner (inode 10646, size 1,844,806 bytes)
- **SuperScan** - Port scanner directory
- **NSTPro2** - Network scanning tools with system/user capture files (_sys1.cab, _user1.cab)

**Other Suspicious Evidence:**
- **Anonymizer software** - Installed in Program Files for anonymizing internet traffic
- **Prefetch evidence:**
  - TELNET.EXE executed
  - WINPCAP_3_01_A.EXE executed
  - RUNDLL32.EXE executed
- **Outlook Express:**
  - alt.hacking.dbx mailbox folder (subscription to hacking-related newsgroup)
- **Internet Cache:**
  - "wardriving[1]" cached file in temporary internet files (relating to wireless access point discovery and security testing)
- **Network References:**
  - "target.lnk" shortcut pointing to "andrews (c) on Andrews-1" (possible target system)

### Anti-Virus Scan Results

**ClamAV Direct Scan on Image Files:**
- 4Dell_Latitude_CPi.E01: OK (no detections)
- 4Dell_Latitude_CPi.E02: OK (no detections)
- **Result: 0 viruses detected**

Note: While no known malware signatures were detected by ClamAV, the computer contains an extensive collection of legitimate security testing and network reconnaissance tools that are commonly associated with network security assessments and potentially malicious hacking activities.

---

## Case Questions

**Case Q1: What operating system was used on the computer?**
Microsoft Windows XP (Version 5.1, Build 2600, installed 2004-08-27)

**Case Q2: Who is the registered owner?**
Greg Schardt (whose alias is "Mr. Evil" - matching the suspect name mentioned in the case briefing)

**Case Q3: Perform an Anti-Virus check. Are there any viruses on the computer?**
No viruses were detected by ClamAV antivirus scan (0 detections). However, multiple network analysis and packet sniffing tools (Ethereal, WinPcap, Look@LAN) and network reconnaissance utilities (SPade, SuperScan, NSTPro2) are installed on the computer, which are consistent with the suspected hacking activities described in the briefing. The computer also shows evidence of execution of these tools and interest in wireless network wardriving and network traffic interception.