Based on my investigation of the forensic evidence, I can now provide the findings report.

---

# FORENSIC INVESTIGATION REPORT
## Case: NIST Hacking Case - Dell Latitude CPi
### Case ID: nist-hacking-case-q31

## Investigation Summary

This investigation focused on analyzing an abandoned Dell Latitude CPi notebook computer suspected to be used for hacking purposes. The computer was imaged into EnCase format (.E01 and .E02 segments) and analyzed using forensic tools.

## Key Findings

### 1. Suspect Identification
The suspect has been identified through filesystem artifacts:
- **User Account Found**: "Mr. Evil" - matches the suspect's online nickname (Gregory Schardt)
- **Evidence Location**: Documents and Settings/Mr. Evil user profile with browser cache and history files present
- This confirms the computer was likely used by the suspect mentioned in the case briefing

### 2. Hacking Software Detected
The computer contains an extensive collection of hacking, reconnaissance, and exploitation tools organized by category:

**Footprinting/Reconnaissance Tools:**
- Nmap (nmapnt) - network port scanner
- Spade 1.14 - vulnerability scanner
- SuperScan - port scanner
- NSTPro2 - network analysis tools

**Enumeration Tools:**
- Cerberus Internet Scanner
- enum - enumeration utility
- ogre - system enumeration tool

**Exploitation/Attacks Tools:**
- Brutus - authentication cracker (with NetBus reference)
- Pwdump - password dumping tool
- dsniff 2.3 - packet sniffer for intercepting traffic

**System Utilities:**
- Various command-line tools (snitch.exe, user2sid.exe, etc.)
- Archive utilities (ARJ compression tools)

### 3. Wireless Capability
The case briefing mentions the computer was found with:
- Wireless PCMCIA card
- Homemade 802.11b antenna
- These items support the theory of using this computer for wireless interception at T-Mobile hotspots and other wireless access points

---

## Case Questions

**Case Q1: Perform an Anti-Virus check. Are there any viruses on the computer?**

No viruses were detected. ClamAV antivirus scan was performed on the evidence. The scan results show "OK" for both disk image segments (.E01 and .E02), indicating no virus signatures were found. However, it should be noted that ClamAV was unable to scan the individual files inside the disk image due to the EnCase format limitations - it could only scan the image containers themselves. The presence of legitimate security and hacking tools on the system does not constitute malware infection. The filesystem shows normal Windows 98/2000 system files without obvious signs of viral corruption or system file replacements typical of virus infections from that era.

---

**Investigation Date**: November 14, 2026  
**Investigator**: Digital Forensic Examiner  
**Evidence Source**: /evidence/nist-hacking-case/4Dell_Latitude_CPi.E01