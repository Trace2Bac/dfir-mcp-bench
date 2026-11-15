I now have all the evidence needed to answer the case questions. Here is the final report.

---

# Digital Forensic Investigation Report — NIST Hacking Case

## Case Summary

A Dell CPi notebook (serial #VLQLW) was found abandoned with wireless hacking equipment. The EnCase image (`4Dell_Latitude_CPi.E01`/`.E02`) was analyzed to identify the operating system, registered owner, and presence of malware.

## Key Findings

### Operating System
The SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` confirms:
- **Product**: Microsoft Windows XP
- **Version**: 5.1 (Build 2600)
- **Product ID**: 55274-640-0147306-23684
- **System Root**: C:\WINDOWS
- **Install Date**: Unix epoch 1092955707 (2004-08-19)

### Computer Tied to Suspect
- **Registered Owner**: Greg Schardt (from `RegisteredOwner` registry value)
- **Windows User Profile**: "Mr. Evil" — the suspect's known alias
- A file named `interception` was found on Mr. Evil's desktop (inode 12264)
- Cookies reference the username `mr. evil` across multiple sites

### Hacking Software on Desktop (Tools folder)
The user profile `Mr. Evil` contained a Desktop\Tools directory with shortcuts to:
- **Cain v2.5** — password cracking and network sniffing tool
- **Ethereal** — network packet analyzer (installed in Program Files)
- **Network Stumbler** — wireless network discovery tool (wardriving)
- **123 WASP** — wireless packet capture tool
- **Look@LAN / Look@Host** — network scanning tools
- **mIRC** — IRC client (commonly used by hackers)
- **CuteFTP** — FTP client for file transfers
- **whois** — domain lookup tool

### Additional Evidence of Hacking Activity
- **Anonymizer Toolbar** installed in Program Files (privacy/evasion tool)
- **Outlook Express newsgroup subscriptions** to multiple hacking-related USENET groups: alt.2600 (and sub-groups: cardz, codez, crackz, hackerz, phreakz, programz), alt.binaries.hacking.beginner, alt.binaries.hacking.computers, alt.binaries.hacking.utilities, alt.binaries.hacking.websites, alt.dss.hack, alt.hacking
- **Cookies** for www.netstumbler.com (wardriving community site)
- **Browsing history** referencing "wardriving" content

### Anti-Virus Scan
ClamAV scanned both E01 segments with **0 detections**. No known viruses or malware signatures were found on the disk image.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), installed on 2004-08-19.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion\RegisteredOwner`. The Windows user profile name "Mr. Evil" further ties the computer to the suspect's known alias.

**Case Q3:** ClamAV anti-virus scan found **no viruses** on the computer. Both image segments (E01 and E02) returned "OK" with 0 detections. While no traditional malware was found, the system contained numerous hacking/intrusion tools (Cain, Ethereal, Network Stumbler, 123 WASP) which are dual-use software commonly associated with unauthorized network interception.