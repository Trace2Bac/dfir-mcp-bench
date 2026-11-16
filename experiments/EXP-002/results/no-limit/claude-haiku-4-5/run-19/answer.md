Perfect! I now have comprehensive evidence. Let me create the final forensic report.

---

# FORENSIC INVESTIGATION REPORT
## NIST Hacking Case - Dell Latitude CPi Notebook

**Case ID:** nist-hacking-case-av  
**Evidence:** 4Dell_Latitude_CPi.E01, 4Dell_Latitude_CPi.E02  
**Serial Number:** VLQLW  
**Date Seized:** 09/20/04  
**Investigation Date:** 2026-11-16

---

## Executive Summary

The forensic examination of the abandoned Dell Latitude CPi notebook reveals extensive evidence of organized hacking activity. The computer is registered to **Greg Schardt** and contains a user account named **"Mr. Evil"** - directly matching the suspect profile. The system contains numerous professional-grade hacking tools organized into specific attack categories (Enumeration, Exploitation, Footprinting), along with evidence of participation in hacking-related IRC communities. The arrangement and sophistication of these tools strongly suggest intentional deployment for network reconnaissance, exploitation, and credential harvesting.

---

## Key Findings

### 1. System Identification
- **Operating System:** Microsoft Windows XP (Build 2600)
- **Registered Owner:** Greg Schardt
- **Computer Name:** N-1A9ODN6ZXK4LQ
- **Installation Date:** 2004-08-19

### 2. User Accounts
The system contains a user account explicitly named **"Mr. Evil"** located at `Documents and Settings/Mr. Evil/`, confirming the online nickname referenced in the briefing.

### 3. Hacking Tools Discovered

**Network Reconnaissance & Footprinting Tools:**
- **Ethereal** (v0.10.6) - Professional packet analyzer/network sniffer installed in Program Files
- **WinPcap** (v3.01) - Windows packet capture library, required for packet sniffing (Prefetch evidence: WINPCAP_3_01_A.EXE)
- **Nmap** (Windows port) - Complete source included in `My Documents/FOOTPRINTING/NT/Nmapnt/`
- **S.P.A.D.E.** (spade114.exe) - Network discovery tool in `My Documents/FOOTPRINTING/NT/`
- **SuperScan** - Network scanner in `My Documents/FOOTPRINTING/NT/superscan/`
- **NSTPro2** - Network analysis tool in `My Documents/FOOTPRINTING/NT/NSTPro2/`
- **Look@LAN** - LAN discovery tool installed in Program Files

**Password & Credential Harvesting Tools:**
- **Cain & Abel** (v2.5 or later) - Professional password cracking and network analysis tool (Prefetch evidence: CAIN25B45.EXE-056F3A6E.pf)
- **Pwdump3** - Windows password dumping utility in `My Documents/EXPLOITATION/NT/Pwdump/pwdump3.zip`
- **Brutus** - Remote access trojan/brute force tool in `My Documents/EXPLOITATION/NT/Brutus/`
- **dsniff 2.3** - Network traffic sniffer for capturing credentials in `My Documents/EXPLOITATION/Unix/`

**Enumeration Tools:**
- **ogre** - Enumeration tool in `My Documents/ENUMERATION/NT/ogre/`

**Offensive Infrastructure:**
- **Anonymizer** - Internet anonymity tool (Program Files/Anonymizer) for hiding hacking activities
- **mIRC** - IRC client installed, used for communicating on hacking channels
- **Agent** - Usenet newsreader (Program Files/Agent) with access to `alt.hacking` newsgroup

### 4. Evidence of Hacking Activity

**Organized Attack Structure:** The My Documents folder contains subdirectories specifically organized by attack methodology:
- `FOOTPRINTING/` - Network reconnaissance and mapping
- `ENUMERATION/` - Target system enumeration  
- `EXPLOITATION/` - Attack and compromise tools
- `NOVELL/` - Novell-specific exploitation tools

This organization indicates deliberate, methodical hacking operations planning.

**IRC/Hacking Community Participation:**
- Outlook Express email file `alt.hacking.dbx` found in Mr. Evil's profile, indicating active subscription to the alt.hacking Usenet newsgroup
- mIRC installation with associated files suggests IRC channel participation in hacking communities

**War-Driving Evidence:**
- Cached file reference "wardriving[1]" found in Mr. Evil's browser cache
- Combination of wireless PCMCIA card, external 802.11b antenna (found with notebook), and tools like Look@LAN suggest war-driving operations to locate and attack wireless networks

**Reconnaissance Documentation:**
- "Shortcut to whois.lnk" on Mr. Evil's desktop in `Tools` folder indicates active use of WHOIS lookups for target reconnaissance

---

## Malware Scan Results

**ClamAV Antivirus Scan:**
- Both E01 and E02 segments: **OK** (no viruses detected)
- Detection count: 0

*Note: The absence of malware detections is consistent with the era (2004) and the nature of these tools. Legitimate security tools like Ethereal and Nmap were not typically flagged by AV software, though when used for unauthorized network reconnaissance, they constitute hacking tools.*

---

## Connection to Suspect

**Direct Attribution to Greg Schardt / "Mr. Evil":**

1. **Registry Evidence:** Windows registry (SOFTWARE hive, Microsoft\Windows NT\CurrentVersion) shows "RegisteredOwner: Greg Schardt"
2. **User Account:** Active user account named "Mr. Evil" with extensive hacking tool collection
3. **Briefing Correlation:** Briefing states suspect "goes by the online nickname of Mr. Evil" - this account name directly confirms match
4. **Operational Pattern Match:** Briefing describes suspect parking vehicle at WiFi hotspots (Starbucks, T-Mobile) to intercept traffic - evidence supports this:
   - War-driving references in cached files
   - Ethereal packet analyzer + WinPcap installed (for traffic capture)
   - Network discovery tools (Look@LAN, SuperScan)
   - Credential harvesting tools (Cain & Abel, dsniff)

---

## Technical Significance

The combination of these tools represents a complete attack toolkit:
1. **Reconnaissance phase:** Nmap, SuperScan, NSTPro2, spade114 for network mapping
2. **Enumeration phase:** ogre and other tools for system discovery
3. **Exploitation phase:** Brutus, dsniff, Pwdump3, Cain & Abel for compromise and credential theft
4. **Concealment:** Anonymizer for hiding attacker identity and activity

The tools are installed system-wide and organized in My Documents, indicating regular, intentional use rather than accidental presence.

---

## Case Questions

**Case Q1:** What operating system was used on the computer?

Microsoft Windows XP (Build 2600, Version 5.1). Confirmed via registry query of SOFTWARE hive at Microsoft\Windows NT\CurrentVersion showing ProductName: "Microsoft Windows XP" and CurrentBuildNumber: "2600".

**Case Q2:** Who is the registered owner?

Greg Schardt. Confirmed via registry query of SOFTWARE hive at Microsoft\Windows NT\CurrentVersion showing RegisteredOwner: "Greg Schardt". Additionally, the system contains a user account named "Mr. Evil" (which matches the suspect's known online alias), located in Documents and Settings/Mr. Evil/, providing multiple evidence points linking the computer to the suspect.

**Case Q3:** Perform a Anti-Virus check. Are there any viruses on the computer?

ClamAV antivirus scan completed on both disk image segments (4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02). Result: **No viruses detected** (0 detections, status: OK for both segments). However, the computer does contain numerous hacking tools (Ethereal, Nmap, Cain & Abel, Pwdump3, dsniff, Brutus, etc.) organized in My Documents subdirectories that are consistent with unauthorized network reconnaissance, exploitation, and credential harvesting activities as described in the case briefing.

---

## Conclusion

The forensic evidence conclusively demonstrates that this Dell Latitude CPi notebook was actively used for hacking purposes by the suspect Greg Schardt, operating under the online alias "Mr. Evil." The system contains a comprehensive arsenal of professional-grade hacking tools, organized by attack methodology, combined with evidence of participation in hacking communities and war-driving operations. The registry ownership directly links the computer to the named suspect, and the user account name "Mr. Evil" provides additional confirmation. This evidence supports proceeding with prosecution and further investigation into specific victims of traffic interception and credential theft.