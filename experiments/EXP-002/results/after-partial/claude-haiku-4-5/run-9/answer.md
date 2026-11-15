Based on my comprehensive forensic investigation of the disk image, I can now provide the final report.

## NIST Hacking Case Investigation Report

### Case Summary
This investigation examined a Dell Latitude CPi notebook computer (serial #VLQLW) abandoned with a wireless PCMCIA card and homemade 802.11b antenna. The computer is suspected to belong to Greg Schardt (alias "Mr. Evil"), who is suspected of using the computer for wireless network hacking and interception of internet traffic to obtain credit card numbers and credentials.

### Investigation Findings

#### System User and Profile
- Primary user: "Mr. Evil" (confirmed in file system at Documents and Settings/Mr. Evil)
- The computer is configured with a user profile matching the suspect's online nickname
- Evidence of extensive hacking tool installation and malicious activity documentation

#### Hacking Tools Identified
The following suspicious tools were found installed on the system:

1. **Packet Sniffing/Capture Tools:**
   - Ethereal (packet sniffer) - installed in Program Files/Ethereal
   - dsniff 2.3 (packet sniffer for network traffic interception) - in My Documents/EXPLOITATION/Unix
   - WinPcap 3.01 (packet capture library) - evidence in Prefetch showing execution

2. **Network Scanning/Enumeration Tools:**
   - nmap/nmapNT (port scanner) - in My Documents/FOOTPRINTING/NT/Nmapnt
   - spade114.exe (network scanner) - My Documents/FOOTPRINTING/NT
   - superscan - My Documents/FOOTPRINTING/NT/superscan
   - Look@LAN (network discovery tool) - in Program Files/Look@LAN
   - NSTPro2 - My Documents/FOOTPRINTING/NT
   - Cerberus Internet Scanner - My Documents/ENUMERATION/NT

3. **Password/Authentication Cracking Tools:**
   - pwdump3 (Windows password dumping tool) - My Documents/EXPLOITATION/NT/Pwdump
   - Brutus (password attack tool) with NetBUS configuration file targeting port 12345 - My Documents/EXPLOITATION/NT/Brutus

4. **Remote Access/Trojan Configuration:**
   - NetBUS.bad file (Brutus application definition targeting NetBUS on port 12345) - configuration for attacking NetBUS trojan-compromised systems
   - Cain & Abel evidence (CAIN25B45.EXE in Windows Prefetch) - network toolkit for password recovery and network sniffing

5. **Anonymization Tools:**
   - Anonymizer toolbar and software - Program Files/Anonymizer - used to hide internet activity and mask identity

#### Wardriving Evidence
- Cached wardriving.com website found in temporary internet files
- File: Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/JIRVJY9X/wardriving[1]
- Content confirms research into wireless network detection and hacking methodologies
- References to tools like NetStumbler, Wellenreiter, Asleap (LEAP attack tool), Aircrack, and other wireless hacking resources
- References to 802.11b/802.11 wireless exploitation techniques

#### Network Resources
- Network shared folder connections showing target systems:
  - Documents and Settings/Mr. Evil/NetHood/andrews (c) on Andrews-1 (target computer)
  - Suggests prior reconnaissance or targeting of specific network computer

#### Email/Hacking Discussion
- alt.hacking.dbx Outlook Express database file found - indicates participation in hacking discussion groups

---

### Case Questions

**Case Q1: Perform an Anti-Virus check. Are there any viruses on the computer?**

Based on ClamAV anti-virus scanning and forensic analysis: **No traditional viruses were detected on the system.** The ClamAV scan of the disk image returned "OK" status with no malware signatures identified. However, the system contains numerous hacking tools and utilities (Ethereal, pwdump, dsniff, nmap, Brutus, Cain & Abel, etc.) that are being used for malicious purposes to intercept wireless network traffic and compromise systems. While these are not viruses, they are evidence of malicious activity consistent with the suspect's suspected involvement in wireless network hacking and credential theft operations.