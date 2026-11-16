Now I have gathered comprehensive evidence. Let me compile the forensic investigation report.

## FORENSIC INVESTIGATION REPORT
### NIST Hacking Case - Dell Latitude CPi Notebook

**Case ID:** nist-hacking-case-av  
**Evidence:** Dell_Latitude_CPi.E01/E02  
**Investigation Date:** November 16, 2026  
**Investigator:** Digital Forensics Team

---

### EXECUTIVE SUMMARY

An abandoned Dell CPi notebook computer (serial # VLQLW) was recovered with wireless network capabilities. The investigation reveals this computer was configured and actively used for hacking activities, with strong evidence linking it to the suspect Greg Schardt (online alias "Mr. Evil"). Numerous hacking tools were discovered organized in categorized folders, evidence of wardriving activity, and participation in hacking discussion forums.

---

### INVESTIGATION FINDINGS

#### 1. System Configuration
- **Operating System:** Microsoft Windows XP (Build 2600)
- **Install Date:** August 31, 2004 (Unix timestamp: 1092955707)
- **System Timezone:** Consistent with August 2004 installation

#### 2. Registered Owner - Direct Link to Suspect
The Windows registry SOFTWARE hive clearly identifies:
- **Registered Owner:** Greg Schardt
- **Registered Organization:** N/A

This directly connects the computer to the primary suspect mentioned in the case briefing.

#### 3. User Profile Evidence
A user profile named **"Mr. Evil"** was identified on the system. This matches the online nickname attributed to Greg Schardt in the case briefing, confirming his use of this alias. User folders show:
- Desktop with Tools shortcut
- Browser history and cache files dated August 16-23, 2004
- Outlook Express configured with access to hacking-related newsgroups

#### 4. Hacking Tools Discovered

The computer contains a comprehensive collection of hacking tools organized in three categories:

**EXPLOITATION Tools** (My Documents/EXPLOITATION/):
- **pwdump3** - Password extraction tool for dumping Windows SAM database hashes
  - Located in: My Documents/EXPLOITATION/NT/Pwdump/
  - Files: pwdump3.htm, pwdump3.zip, and documentation
  
- **Brutus** - Brute force authentication attack tool
  - Located in: My Documents/EXPLOITATION/NT/Brutus/
  - Associated files: NetBus.bad, users.txt, readme.doc, Overview.doc
  
- **dsniff 2.3** - Network packet sniffing and credential interception tool
  - Located in: My Documents/EXPLOITATION/Unix/dsniff 2.3/
  - Documentation: "Switched networks lose security advantage due packet tool"

**FOOTPRINTING/RECONNAISSANCE Tools** (My Documents/FOOTPRINTING/):
- **superscan** - Network scanner for identifying open ports and services
- **spade114.exe** - Information gathering and enumeration tool
- **NSTPro2** - System enumeration tool with system/user capture files (_sys1.cab, _user1.cab)

**ENUMERATION Tools** (My Documents/ENUMERATION/):
- **ogre** - Network enumeration tool for host discovery and service identification
  - Located in: My Documents/ENUMERATION/NT/ogre/

#### 5. Evidence of Hacking Activity

**Wardriving Evidence:**
- File named "wardriving[1]" located in cached internet cache files
- This directly confirms the case briefing allegation that Schardt would park his vehicle within range of wireless access points

**Hacking Community Participation:**
- Outlook Express mailbox: "alt.hacking.dbx"
- Evidence of subscription to alt.hacking newsgroup (Usenet discussion forum for hacking techniques)

**Network Reconnaissance:**
- NetHood (Network Neighborhood) shows references to network hosts accessed from this computer
- Shortcuts to network resources including "andrews (c) on Andrews-1"
- whois lookup shortcut on desktop, indicating IP/domain research activity

#### 6. Antivirus Scan Results

**ClamAV Scan Results:**
- Scanned: /evidence/nist-hacking-case/4Dell_Latitude_CPi.E01
- Scanned: /evidence/nist-hacking-case/4Dell_Latitude_CPi.E02
- **Result: OK (No viruses detected)**

The absence of detected viruses indicates either:
1. The hacking tools are not detected by ClamAV signatures
2. The tools are custom or legitimate open-source utilities not flagged as malware
3. Tools were obtained and stored before signature updates

---

### CASE QUESTIONS - ANSWERS

**Case Q1: What operating system was used on the computer?**
Microsoft Windows XP (Version 5.1, Build 2600). This was confirmed via the SOFTWARE registry hive at Microsoft\Windows NT\CurrentVersion where ProductName = "Microsoft Windows XP".

**Case Q2: Who is the registered owner?**
Greg Schardt. The SOFTWARE registry hive at Microsoft\Windows NT\CurrentVersion contains RegisteredOwner = "Greg Schardt". Additionally, the online user profile "Mr. Evil" (found in Documents and Settings folder) matches the suspect's known alias, directly linking the computer to the suspect mentioned in the case briefing.

**Case Q3: Perform an Anti-Virus check. Are there any viruses on the computer?**
ClamAV antivirus scan was performed on both disk image segments (4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02). Both segments returned "OK" status with zero detections. No viruses were detected by ClamAV signatures. However, the computer contains numerous legitimate hacking and penetration testing tools (pwdump3, dsniff, Brutus, superscan, etc.) which are not flagged as viruses but are commonly used in unauthorized network attacks.

---

### CONCLUSIONS

1. **Suspect Linkage:** The computer is definitively linked to Greg Schardt through registered owner information and the "Mr. Evil" user profile.

2. **Hacking Capability:** The system contains a comprehensive toolkit for conducting network attacks including password cracking, packet sniffing, network scanning, and brute force attacks.

3. **Intended Purpose:** The organized folder structure (ENUMERATION, EXPLOITATION, FOOTPRINTING) and presence of tools specifically mentioned in case briefing (wireless interception capability, packet sniffing for credential capture) suggests this computer was deliberately configured for attacking network systems and intercepting traffic.

4. **Wardriving Evidence:** The "wardriving" file in cached internet data combined with the wireless PCMCIA card and antenna found with the abandoned computer supports allegations that Schardt used this equipment to intercept wireless traffic and conduct man-in-the-middle attacks to steal credentials and credit card numbers.

5. **Active Hacking Community:** Participation in alt.hacking newsgroup and presence of multiple attack tools indicates active engagement in hacking techniques and community.

---

**Report Completed:** November 16, 2026