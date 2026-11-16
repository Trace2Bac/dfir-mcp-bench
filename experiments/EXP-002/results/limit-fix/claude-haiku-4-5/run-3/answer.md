Based on my thorough investigation of the evidence, I can now provide the final report:

---

## NIST HACKING CASE FORENSIC ANALYSIS REPORT

### Case Information
- **Case ID**: nist-hacking-case-av
- **Evidence**: Dell Latitude CPi Notebook (VLQLW)
- **Evidence Date**: 09/20/2004
- **Suspect**: Greg Schardt (alias "Mr. Evil")

### Executive Summary

This disk image examination reveals extensive evidence of hacking activity tied directly to the suspect Greg Schardt. The computer contains a comprehensive collection of network reconnaissance, password cracking, and network traffic interception tools, along with suspicious user accounts and activity logs consistent with the suspected wireless access point interception crimes.

### Key Findings

#### 1. Direct Link to Suspect
- **Registered Owner**: Greg Schardt (found in SOFTWARE hive, Microsoft\Windows NT\CurrentVersion)
- **User Account**: "Mr. Evil" - matching the suspect's known alias
- The Mr. Evil user profile directory contains extensive evidence of hacking-related activities

#### 2. Installed Hacking Software
The following network attack and reconnaissance tools are installed:

**Packet Sniffing/Traffic Interception:**
- Ethereal v0.10.6 (Program Files/Ethereal) - professional packet sniffer for capturing network traffic
- dsniff 2.3 (My Documents/EXPLOITATION/Unix/dsniff 2.3) - network sniffer for credential interception

**Password Cracking/Exploitation:**
- Brutus (My Documents/EXPLOITATION/NT/Brutus/) - remote access trojan and password cracking tool
- pwdump3 (My Documents/EXPLOITATION/NT/Pwdump/) - Windows password dumping utility
- NetBus (referenced in Brutus folder as NetBus.bad)

**Network Reconnaissance:**
- Nmap/nmapNT (My Documents/FOOTPRINTING/NT/Nmapnt/) - network scanner
- Look@LAN (Program Files/Look@LAN) - network discovery tool
- NSTPro2 (My Documents/FOOTPRINTING/NT/NSTPro2/)
- superscan (My Documents/FOOTPRINTING/NT/superscan)
- SPADE 1.14 (My Documents/FOOTPRINTING/NT/spade114.exe)

**Anonymization Tools:**
- Anonymizer (Program Files/Anonymizer) - web traffic anonymization

**Evidence of Hacking Interest:**
- Outlook Express with subscription to alt.hacking newsgroup (alt.hacking.dbx found in Mr. Evil profile)
- Reference to "wardriving" in cached Internet files
- Documentation and README files for exploitation tools

#### 3. Computer Configuration
- **Operating System**: Microsoft Windows XP (Build 2600, Version 5.1)
- **Computer Name**: N-1A9ODN6ZXK4LQ
- **Installation Date**: August 27, 2004 (approximately 3 weeks before discovery)

### Case Questions

**Case Q1: What operating system was used on the computer?**
Microsoft Windows XP (Version 5.1, Build 2600)

**Case Q2: Who is the registered owner?**
Greg Schardt (confirmed in HKLM\Software\Microsoft\Windows NT\CurrentVersion\RegisteredOwner)

**Case Q3: Perform a Anti-Virus check. Are there any viruses on the computer?**
ClamAV antivirus scan of extracted files returned clean results (OK status). No known virus signatures were detected in the scanned samples from the hacking tool collection. However, note that legitimate security tools (Ethereal, Nmap, etc.) are designed for legitimate network analysis and may be flagged by some antivirus vendors. The absence of virus signatures does not rule out the malicious intent of using these tools for unauthorized access.

### Conclusion

The evidence strongly supports that this computer belonged to and was actively used by the suspect Greg Schardt for hacking activities. The presence of his name as the registered owner, combined with the "Mr. Evil" user account and the extensive collection of network attack tools organized in typical hacker directory structures (FOOTPRINTING, EXPLOITATION, ENUMERATION), demonstrates clear intent for unauthorized network access and credential interception. The tools present are consistent with the profile of someone targeting wireless access points (Ethereal for traffic capture, dsniff for credential interception, Brutus for password cracking).