Perfect! I now have comprehensive evidence. Let me compile the final forensics report.

## DIGITAL FORENSICS INVESTIGATION REPORT

**Case ID:** nist-hacking-case-av  
**Evidence:** Dell Latitude CPi Notebook (Serial: VLQLW)  
**Date Acquired:** 09/20/2004  
**Analysis Date:** 2026-11-14

---

## Executive Summary

This investigation examined a Dell CPi notebook computer found abandoned along with a wireless PCMCIA card and homemade 802.11b antenna. Forensic analysis reveals the computer belonged to Greg Schardt and contained extensive hacking tools, stolen credentials, network reconnaissance data, and evidence of wardriving activities targeting wireless networks for credential interception.

---

## Key Findings

### System Information
The computer was running **Microsoft Windows XP** (Build 2600), last modified August 27, 2004. The system contained a user account "Mr. Evil" - the online alias mentioned in the case briefing for Greg Schardt.

### Hacking Tools and Software Found

**Network Reconnaissance Tools:**
- Ethereal (packet sniffer/network analyzer)
- Nmap (network port scanner) - stored in `My Documents/FOOTPRINTING/NT/Nmapnt`
- Cerberus Internet Scanner - with saved reports scanning 172.16.0.2
- SuperScan, Spade, OGRE, NSTPro2, Look@LAN
- WinPcap (packet capture library)

**Exploitation and Credential Tools:**
- Brutus (password cracking/brute force tool)
- Pwdump (Windows password dumper)
- Cain (password sniffing/recovery tool) - prefetch evidence: `CAIN25B45.EXE-056F3A6E.pf`
- dsniff (Unix packet sniffing tool for network exploitation)
- user2sid.exe, snitch.exe, STREAMFIND.EXE (system enumeration utilities)

**Directory Structure Evidence:**
- `My Documents/COMMANDS/` - Contains system command utilities for network intrusion
- `My Documents/ENUMERATION/NT/` - Network enumeration tools and reports
- `My Documents/EXPLOITATION/NT/` - Exploitation tools including Brutus and Pwdump
- `My Documents/FOOTPRINTING/NT/` - Network footprinting/scanning tools

### Wardriving Evidence
- **Cached wardriving.com HTML file** at `Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/JIRVJY9X/wardriving[1]` (28.1 KB)
- Content discusses 802.11b wireless network discovery, hacking techniques, and tools for exploiting wireless networks
- References to "Starbucks" and "T-Mobile Hotspots" - matching the case description of intercepting traffic at public wireless hotspots

### Communications Evidence
- **alt.hacking.dbx** email archive (535 KB) found at `Documents and Settings/Mr. Evil/Local Settings/Application Data/Identities/{EF086998-1115-4ECD-9B13-9ADC067B4929}/Microsoft/Outlook Express/`
- Indicates participation in the alt.hacking usenet newsgroup for hacking discussions

### Network Reconnaissance Data
- Cerberus Internet Scanner reports targeting 172.16.0.2 showing active reconnaissance
- Stored at `My Documents/ENUMERATION/NT/Cerberus Internet Scanner/files/Reports/`
- Files include: ntreg172.16.0.2.html, ntsvc172.16.0.2.html

### Anonymization Tools
- Anonymizer software and toolbar installed in `Program Files/Anonymizer/`
- Consistent with attempts to hide internet activities

---

## Antivirus Analysis

ClamAV scanning was performed on the forensic image files:
- Result: **OK** - No virus signatures detected

**Important Note:** While no traditional viruses were detected, the computer contains numerous security testing/hacking tools that, while not malicious in themselves, were clearly being used for unauthorized network intrusion and credential theft based on:
1. The organized folder structure by attack type (ENUMERATION, EXPLOITATION, FOOTPRINTING)
2. Saved network reconnaissance reports
3. The case facts about intercepting wireless traffic
4. User account named "Mr. Evil" linking to the suspect

---

## Connection to Suspect

**Strong Evidence Linking to Greg Schardt / "Mr. Evil":**
1. Registry shows RegisteredOwner: **"Greg Schardt"**
2. User account "Mr. Evil" present (Schardt's known online alias per case briefing)
3. Email archive from alt.hacking newsgroup (hacker community participation)
4. Organized collection of hacking tools designed for wireless network interception
5. Wardriving website cached showing interest in wireless exploitation techniques
6. Network reconnaissance data and tools positioned for credential theft at hotspots

---

## Case Questions

**Case Q1:** What operating system was used on the computer?  
**Answer:** Microsoft Windows XP (ProductName: "Microsoft Windows XP", CurrentVersion 5.1, CurrentBuildNumber 2600), as recorded in the registry at `HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion` with installation date of 2004-08-27.

**Case Q2:** Who is the registered owner?  
**Answer:** Greg Schardt, as shown in the registry value `HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion\RegisteredOwner: "Greg Schardt"`. The system also contains user account "Mr. Evil", which matches Schardt's known online alias from the case briefing.

**Case Q3:** Perform a Anti-Virus check. Are there any viruses on the computer?  
**Answer:** ClamAV antivirus scan returned "OK" with no virus signatures detected in the forensic image files. However, the computer contains extensive hacking software and tools including packet sniffers (Ethereal, dsniff), password cracking tools (Brutus, Pwdump, Cain), network scanners (Nmap, Cerberus Internet Scanner), and credential theft utilities - consistent with use for unauthorized wireless network interception and credential theft as described in the case.