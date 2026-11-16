Now I have sufficient evidence to prepare my final report. Let me compile the findings.

---

# NIST Hacking Case Investigation Report
**Case ID:** nist-hacking-case-av  
**Date:** 2026-11-16  
**Evidence Source:** 4Dell_Latitude_CPi.E01/E02

## Executive Summary

An abandoned Dell CPi notebook computer (serial # VLQLW) was found with wireless equipment. This investigation examined the disk image to determine the operating system, registered owner, and evidence of hacking tools/malware. The investigation successfully ties this computer to suspect Greg Schardt and identifies extensive hacking toolkit and malicious software activities.

## Investigation Findings

### 1. System Identification

The computer contained **Microsoft Windows XP** operating system (version 5.1, Build 2600). Registry analysis confirms:
- **ProductName**: Microsoft Windows XP
- **CurrentBuild**: 2600.xpclient.010817-1148
- **InstallDate**: August 27, 2004 (timestamp: 1092955707)

### 2. Registered Owner Identification

Registry analysis of the SOFTWARE hive revealed:
- **RegisteredOwner**: Greg Schardt
- **RegisteredOrganization**: N/A

This directly matches the suspect named in the case briefing.

### 3. Suspect User Account

File system analysis identified a user account named **"Mr. Evil"** with the following artifacts:
- User directory: `Documents and Settings/Mr. Evil/`
- Start Menu and Quick Launch folders
- Browser cache containing suspicious files including "wardriving[1]" (consistent with case briefing about intercepting wireless traffic at hotspots)

This matches the online nickname used by Greg Schardt mentioned in the briefing.

### 4. Hacking Tools and Software Found

**Extensive hacking toolkit discovered in organized directory structure:**

**EXPLOITATION Tools:**
- `My Documents/EXPLOITATION/NT/Brutus/` - Brutus password cracking tool
  - Files: NetBus.bad, Overview.doc, readme.doc, users.txt
- `My Documents/EXPLOITATION/NT/Pwdump/` - Pwdump3 Windows password dumping tool
  - pwdump3.zip (88,815 bytes)
  - pwdump3.htm, pwdump3_files/
- `My Documents/EXPLOITATION/Unix/dsniff 2.3/` - dsniff packet sniffing tool
  - Directory name explicitly states: "Switched networks lose security advantage due packet tool"

**FOOTPRINTING/SCANNING Tools:**
- `My Documents/FOOTPRINTING/NT/Nmapnt/` - Nmap network scanner (Windows version)
  - Complete source code and documentation
- `My Documents/FOOTPRINTING/NT/NSTPro2/` - Network scanning tool
- `My Documents/FOOTPRINTING/NT/spade114.exe` - SPADE network scanner (1.8 MB)
- `My Documents/FOOTPRINTING/NT/superscan/` - SuperScan network scanning tool

**ENUMERATION Tools:**
- `My Documents/ENUMERATION/NT/ogre/` - OGRE network enumeration tool

**Network Analysis Software:**
- **Ethereal** (packet capture/analysis tool)
  - Installed in `Program Files/Ethereal/`
  - Shortcut in Start Menu: `Documents and Settings/All Users/Start Menu/Programs/Ethereal/Ethereal.lnk`
  - Full installation with plugins and support files

**Evidence of Hacking Tool Execution:**
- **CAIN25B45.EXE** prefetch file: `WINDOWS/Prefetch/CAIN25B45.EXE-056F3A6E.pf`
  - Indicates Cain & Abel (password recovery/hacking tool) was executed on this computer

**Anti-Detection Tool:**
- **Anonymizer** toolbar installed in `Program Files/Anonymizer/`
  - Used to hide internet activities and bypass detection

### 5. Antivirus Scan Results

**ClamAV Antivirus Scan Performed:**
- Target: Extracted suspicious executable files from disk image
- Files Scanned:
  - pwdump3.zip (inode 10579): **OK** (no detections)
  - spade114.exe (inode 10646): **OK** (no detections)
  - Full disk image E01/E02: **OK** (no detections)

**Result:** No virus signatures detected by ClamAV

**Important Note:** While the antivirus scan did not detect any known malware signatures, the presence of Cain & Abel, Ethereal, dsniff, Brutus, Pwdump, and network scanning tools indicates this computer was equipped for conducting network-based attacks, credential theft, and traffic interception—consistent with the suspected hacking activities described in the case briefing (intercepting internet traffic to obtain credit card numbers, usernames, and passwords at wireless hotspots).

## Conclusion

This computer is definitively tied to suspect Greg Schardt through:
1. Registry registration information bearing his name
2. User account "Mr. Evil" matching his known online alias
3. Comprehensive hacking toolkit stored in organized directories
4. Evidence of tool execution (Cain & Abel prefetch)
5. Anonymizer tool for hiding activities

The computer's configuration is consistent with the suspected activities: wireless packet sniffing and credential interception at public wireless hotspots.

---

## Case Questions

**Case Q1:** What operating system was used on the computer?  
**Microsoft Windows XP** (Version 5.1, Build 2600)

**Case Q2:** Who is the registered owner?  
**Greg Schardt**

**Case Q3:** Perform an Anti-Virus check. Are there any viruses on the computer?  
**ClamAV antivirus scanning found no virus signatures.** However, the computer contains an extensive suite of hacking tools including Ethereal, dsniff, Brutus, Pwdump, Cain & Abel, Nmap, and network scanning utilities organized in directories labeled "EXPLOITATION," "FOOTPRINTING," and "ENUMERATION." These legitimate security tools, when used together with the Anonymizer privacy tool, strongly indicate malicious intent consistent with the suspected wireless interception and credential theft activities. The absence of virus detections does not indicate a "clean" system—it indicates a computer intentionally configured with tools for unauthorized network access and data theft.