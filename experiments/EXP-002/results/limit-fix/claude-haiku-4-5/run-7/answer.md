Now I have enough information to compile my findings. Let me create the final report.

---

# FORENSIC INVESTIGATION REPORT
## NIST Hacking Case - Dell Latitude CPi (Serial: VLQLW)

### Summary
This investigation examined a Dell Latitude CPi notebook computer suspected of being used for hacking and network attack purposes. The computer was found abandoned along with wireless networking equipment on 09/20/04. Evidence strongly links this computer to the suspect Greg Schardt (alias: "Mr. Evil").

### Key Findings

**1. Hacking Software Identified:**
The computer contains multiple professional hacking and network attack tools stored in the My Documents directory:

- **Network Sniffing/Packet Analysis:**
  - Ethereal (installed to Program Files)
  - dsniff 2.3 (Unix network traffic analysis toolkit)
  
- **Password Cracking:**
  - Cain 2.5 (evidenced in Windows Prefetch: CAIN25B45.EXE)
  - Brutus (password dictionary attack tool)
  - pwdump3 (Windows password dumping utility)
  
- **Network Reconnaissance & Scanning:**
  - SuperScan (network mapper - contains detected malware)
  - SPADE 1.14 (network discovery tool)
  - NSTPro2 (network security probe)
  - OGRE (NT enumeration tool)
  - Look@LAN (network scanning tool)

**2. Evidence of Use:**
- The "Mr. Evil" user account (matching the suspect's known online alias) is present on the system with active Desktop and My Documents folders
- The tools are organized in structured directories: ENUMERATION, EXPLOITATION, FOOTPRINTING
- Browser history shows "alt.hacking" Outlook Express database
- References to "wardriving" content found in temporary internet files
- Anonymizer software installed (suggesting attempts to hide browsing activity)

**3. Malware Detection:**
ClamAV antivirus scan detected **1 trojan virus**:
- **File:** inode_10652 (My Documents/FOOTPRINTING/NT/superscan/)
- **Malware Type:** Win.Trojan.Agent-6240252-0

The infected SuperScan tool indicates the hacker may have been using compromised versions of legitimate security tools for malicious purposes, consistent with the briefing's description of intercepting credit card numbers and passwords.

---

## Case Questions

**Case Q1: What operating system was used on the computer?**
Microsoft Windows XP (Product Name: "Microsoft Windows XP", Version 5.1, Build 2600)

**Case Q2: Who is the registered owner?**
Greg Schardt (RegisteredOwner value from HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion)

**Case Q3: Perform a Anti-Virus check. Are there any viruses on the computer?**
Yes. ClamAV detected 1 virus: Win.Trojan.Agent-6240252-0 found in the SuperScan network mapping tool located at My Documents/FOOTPRINTING/NT/superscan/. This trojan presence, combined with the collection of network sniffing tools (Ethereal, dsniff) and password cracking utilities (Cain, Brutus, pwdump), confirms the computer was configured for network attack operations including traffic interception and credential theft, consistent with the suspect's alleged activities of stealing credit card numbers, usernames, and passwords at wireless hotspots.