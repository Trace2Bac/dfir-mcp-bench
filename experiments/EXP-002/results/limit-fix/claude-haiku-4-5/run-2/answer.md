I have gathered sufficient evidence to answer all the case questions. Let me compile my findings into a comprehensive forensic report.

---

# DIGITAL FORENSIC EXAMINATION REPORT
## NIST Hacking Case - Dell Latitude CPi Notebook

**Case ID:** nist-hacking-case-av  
**Evidence Item:** 4Dell_Latitude_CPi.E01 (Dell Latitude CPi notebook - Serial #VLQLW)  
**Examination Date:** 2026-11-16  
**Operating System:** Microsoft Windows XP  

---

## EXECUTIVE SUMMARY

This forensic examination of an abandoned Dell Latitude CPi notebook reveals extensive evidence of hacking activities and the presence of numerous attack tools. The computer contains a user account matching the online nickname of the suspect, and the system contains organized collections of reconnaissance, enumeration, exploitation, and footprinting tools typically used for network-based attacks.

---

## FINDINGS

### 1. SYSTEM INFORMATION

The computer is running **Microsoft Windows XP** (version 5.1, build 2600), as confirmed by the Windows Registry SOFTWARE hive at key path `Microsoft\Windows NT\CurrentVersion`. The installation was registered to **Greg Schardt**, as documented in the `RegisteredOwner` registry value.

### 2. USER ACCOUNT DISCOVERY

A user account named **"Mr. Evil"** was identified on the system. This account matches the online nickname attributed to suspect Greg Schardt in the case briefing. The presence of this account, combined with the organized hacking tools stored within the associated Documents and Settings folder, provides strong correlation to the suspect.

### 3. HACKING SOFTWARE AND TOOLS IDENTIFIED

The computer contains extensive evidence of hacking and attack software, organized systematically by category:

**Installed Programs (Program Files):**
- **Ethereal** (v0.10.6) - Network packet capture and analysis tool used for traffic interception
- **Look@LAN** - Network scanning and reconnaissance tool
- **Anonymizer** - Proxy software for concealing internet activity

**Prefetch Evidence (Executed Programs):**
- **CAIN25B45.EXE** - Cain & Abel password recovery and ARP spoofing tool
- **WINPCAP_3_01_A.EXE** - WinPcap network packet capture library installer

**User Documents (My Documents) - Organized Attack Toolkit:**

| Category | Tools | Purpose |
|----------|-------|---------|
| **ENUMERATION** | Cerberus Internet Scanner, enum.exe, ogre.exe | Network reconnaissance and system information gathering |
| **EXPLOITATION** | Brutus, Pwdump3, dsniff 2.3 | Credential theft and password attacks |
| **FOOTPRINTING** | Nmap, NSTPro2, SuperScan, SPADE | Network mapping and vulnerability scanning |
| **COMMANDS** | snitch.exe, user2sid.exe, streamfind.exe | Miscellaneous attack utilities |

### 4. SPECIFIC EVIDENCE OF ATTACK CONFIGURATION

A critical file was recovered: `My Documents/EXPLOITATION/NT/Brutus/NetBus.bad`

This file is a Brutus Application Definition containing attack configuration parameters for launching brute-force attacks against **NetBUS remote access trojan (RAT)** servers. The configuration specifies:
- Target protocol: NetBUS
- Default port: 12345 (NetBUS default port)
- Authentication attack methodology

This represents direct evidence of the suspect attempting to compromise systems infected with NetBUS trojans, consistent with the described wireless-intercept and credential-harvesting activities.

### 5. WIRELESS ACTIVITY INDICATORS

Multiple references to wardriving and wireless network activities were discovered in the "Mr. Evil" user's Internet Explorer cache:
- Cached file: `wardriving[1]` in temporary internet files
- Wireless PCMCIA card was found with the abandoned computer
- Ethereal packet capture tool with wireless-capable libraries

### 6. ANTIVIRUS SCAN RESULTS

**Findings:** No traditional computer viruses (malware with replication capability) were detected on the system. 

**Important Distinction:** While the system does not contain viruses, it contains **weaponized hacking tools** intended for network attack, credential theft, and system compromise. The tools themselves are not malicious code, but rather legitimate security tools misused for offensive purposes. The organized collection and attack configuration files (such as the NetBus.bad file) represent the actual evidence of malicious intent.

---

## TIMELINE AND CORRELATION

- **Installation Date:** August 2003 (from Windows registry InstallDate: 1092955707 Unix epoch)
- **Last Registry Modification:** August 27, 2004, 15:08:22 UTC
- **Computer Abandonment Date:** September 20, 2004 (per case briefing)

The chronology shows the system was actively maintained through August 2004, just three weeks before abandonment.

---

## LINKAGE TO SUSPECT

Multiple indicators connect this computer to Greg Schardt (alias "Mr. Evil"):

1. **Username Match:** User account "Mr. Evil" explicitly matches the alias used by the suspect
2. **Registry Owner:** Registered owner name is "Greg Schardt"
3. **Tool Collection:** Organized hacking toolkit consistent with described wireless intercept and credential harvesting activities
4. **Attack Configuration:** NetBus.bad file indicates active participation in trojan-based attacks
5. **Wardriving Evidence:** Cached wardriving content and wireless packet capture tools match suspect profile

---

## CASE QUESTIONS

**Case Q1: What operating system was used on the computer?**
Microsoft Windows XP (Version 5.1, Build 2600), confirmed from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2: Who is the registered owner?**
Greg Schardt, confirmed from the SOFTWARE registry hive value `RegisteredOwner` at `Microsoft\Windows NT\CurrentVersion`. This matches the suspect name from the case briefing.

**Case Q3: Perform an Anti-Virus check. Are there any viruses on the computer?**
No traditional computer viruses (replicating malware) were detected on the system. However, the computer contains extensive evidence of hacking tools and weaponized attack software, including password cracking tools (Brutus, Pwdump), network sniffing utilities (Ethereal, dsniff), and attack configuration files specifically targeting NetBUS remote access trojans. While not viruses themselves, these tools represent clear evidence of malicious intent and capability for credential theft and network-based attacks.

---

## CONCLUSION

The abandoned Dell Latitude CPi notebook provides conclusive forensic evidence linking the computer to suspect Greg Schardt and his "Mr. Evil" online identity. The systematic collection of attack tools, organized by phase of attack (reconnaissance, exploitation, footprinting), combined with specific attack configuration files targeting trojan-infected systems, demonstrates active engagement in hacking activities. The presence of wireless packet capture tools and wardriving content is consistent with the described wireless access point intercept scenario. While no viruses were detected, the presence of weaponized tools and attack configurations represents substantial evidence of the suspect's involvement in unauthorized computer access activities.