Perfect! I've found strong evidence linking this computer to the suspect. Let me now compile the final report.

---

# INVESTIGATION REPORT
## NIST Hacking Case - Dell Latitude CPi (Serial #VLQLW)
**Case ID:** nist-hacking-case-q31  
**Date of Investigation:** 2026-11-14  
**Evidence Source:** 4Dell_Latitude_CPi.E01/E02

---

## EXECUTIVE SUMMARY

Investigation of the abandoned Dell Latitude CPi notebook computer has revealed comprehensive evidence of organized hacking activities. The computer contains an extensive collection of hacking and network exploitation tools organized in a methodical directory structure. The system user account is named "Mr. Evil," directly matching the online alias of suspect Greg Schardt. ClamAV anti-virus scanning revealed no malware, but the presence of legitimate penetration testing tools repurposed for unauthorized hacking activities, combined with the suspect's alias and hacking methodology directories, provides strong evidence of criminal hacking intent.

---

## FINDINGS

### Finding 1: Extensive Collection of Hacking/Penetration Testing Tools
The computer contains a comprehensive arsenal of hacking tools, systematically organized in the My Documents directory under clear methodological categories:

**FOOTPRINTING/RECONNAISSANCE:**
- Nmap NT (network mapping and scanning)
- SPADE 1.1.4 (network scanner)
- SuperScan (network port scanner)
- NSTPro2 (network analysis)

**ENUMERATION:**
- enum (Windows enumeration utility)
- ogre (NT enumeration tool)
- Cerberus Internet Scanner

**EXPLOITATION:**
- Brutus (network password attack tool)
- dsniff 2.3 (packet sniffing and network analysis)
- pwdump3 (password hash dumping utility)
- NetBus (remote access trojan framework files)

**PACKET ANALYSIS & MONITORING:**
- Ethereal (installed in Program Files/Ethereal - full installation with plugins and libraries)
- Ethereal Start Menu shortcuts

**ADDITIONAL TOOLS:**
- Anonymizer (privacy/anonymity proxy tool)
- Various command-line utilities (snitch.exe, user2sid.exe, USERLIST.TXT, STREAMFIND.EXE)

### Finding 2: Direct Link to Suspect "Mr. Evil"
- User account name: "Mr. Evil" is present as an active Windows user on the system
- Full user directory structure under "Documents and Settings/Mr. Evil/"
- This directly matches the suspect's known online alias

### Finding 3: Evidence of Hacking Tool Execution
- Windows Prefetch file found: CAIN25B45.EXE-056F3A6E.pf
- Indicates Cain & Abel password recovery tool was previously executed on the system
- Prefetch analysis confirms active use of hacking tools

### Finding 4: Network Reconnaissance Evidence
- References to wardriving activity in Internet Explorer cache: "wardriving[1]" file found in Mr. Evil's temporary Internet files
- Network neighborhood shortcuts found, including reference to "andrews (c) on Andrews-1/target.lnk" suggesting network targeting
- Evidence consistent with case briefing describing wireless access point interception activities

### Finding 5: Organized Hacking Methodology
The directory structure demonstrates systematic approach to hacking:
- COMMANDS/ - Utility programs
- FOOTPRINTING/ - Reconnaissance tools
- ENUMERATION/ - Network discovery tools
- EXPLOITATION/ - Attack tools

This organization suggests planned, deliberate hacking activities rather than incidental tool presence.

---

## CASE QUESTIONS

**Case Q1:** Perform an Anti-Virus check. Are there any viruses on the computer?

**Case Q1 Answer:** ClamAV anti-virus scanning of the evidence showed 0 detections. Both disk image segments returned "OK" status. No known viruses were detected. However, the computer contains numerous legitimate penetration testing and hacking tools (Ethereal, Nmap, Cain, Brutus, dsniff, pwdump, etc.) that have been repurposed for unauthorized hacking activities targeting wireless access points and network systems, as described in the case briefing.

---

## CONCLUSION

This investigation reveals clear evidence that the abandoned Dell Latitude CPi notebook was actively used for unauthorized hacking activities. The presence of an extensive collection of hacking tools, combined with the system user account named "Mr. Evil" (matching suspect Greg Schardt's known alias), evidence of tool execution, organized methodology, and explicit wardriving references provides strong circumstantial evidence linking this computer to the suspect. The computer appears to have been specifically configured for intercepting wireless network traffic and conducting password attacks on T-Mobile and other wireless hotspot users.