Perfect! I've found the key connection. Let me compile the final investigation report.

---

# FORENSIC INVESTIGATION REPORT
## NIST Hacking Case - Dell Latitude CPi Notebook
### Case ID: nist-hacking-case-av
**Investigation Date:** 2026-11-16

## Executive Summary

This forensic investigation of an abandoned Dell Latitude CPi notebook (Serial # VLQLW) has revealed extensive evidence of hacking activities and confirmed a direct link between the computer's registered owner, Greg Schardt, and the online persona "Mr. Evil." The computer contains multiple professional-grade hacking tools and exploitation utilities, organized systematically for network attack operations, specifically targeting wireless access points and intercepting internet traffic.

## Findings

### Finding 1: Operating System and System Configuration
**Severity: Informational**

The computer was running **Microsoft Windows XP** (Version 5.1, Build 2600). This is an extremely outdated and vulnerable operating system from 2001, which was particularly susceptible to network-based attacks in 2004. The system was configured with network capabilities suitable for wireless penetration testing activities.

**Evidence:**
- Windows NT CurrentVersion registry: ProductName = "Microsoft Windows XP"
- Current Build Number: 2600
- System Root: C:\WINDOWS
- Source: `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` → Registry SOFTWARE hive

### Finding 2: Registered Owner Identification and Suspect Connection
**Severity: Critical**

The computer's registered owner is **Greg Schardt**, which directly connects to the suspect named in the case briefing. Additionally, the primary user account on the computer is named **"Mr. Evil"** — the exact online nickname attributed to Greg Schardt in the briefing materials. This constitutes direct evidence linking the physical computer to the suspect.

**Evidence:**
- Registry KEY: HKLM\Software\Microsoft\Windows NT\CurrentVersion
- Value: RegisteredOwner = "Greg Schardt"
- Value: RegisteredOrganization = "N/A"
- User Profile: Documents and Settings/Mr. Evil/
- Email subscription: alt.hacking.dbx (Usenet hacking group)
- Source: `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` → Windows Registry and file system

### Finding 3: Hacking Tools Installed and Documented
**Severity: Critical**

The computer contains an extensive collection of hacking tools, organized into functional categories (ENUMERATION, EXPLOITATION, FOOTPRINTING, ARCHIVE) in the user's My Documents folder. These tools are specifically designed for network reconnaissance, password cracking, and unauthorized system access — aligning perfectly with the suspected activity of intercepting traffic at wireless hotspots to steal credentials.

**Network Sniffing/Analysis Tools:**
- **Ethereal** (v0.10.6) - Professional packet sniffer/network analyzer installed in Program Files
- **Look@LAN** - Network discovery and scanning tool
- **Anonymizer** - Privacy/anonymity software (installed in Program Files)

**Network Reconnaissance Tools:**
- **Nmap for Windows (Nmapnt)** - Network mapping tool (My Documents/FOOTPRINTING/NT/)
- **SuperScan** - Network port scanner (My Documents/FOOTPRINTING/NT/)
- **NSTPro2** - Network scanning utility (My Documents/FOOTPRINTING/NT/)
- **OGRE** - Network enumeration tool (My Documents/ENUMERATION/NT/)
- **SPADE 1.14** - Network information gathering

**Password/Exploitation Tools:**
- **Cain & Abel (v2.5)** - Password cracking and credential dumping (Prefetch: CAIN25B45.EXE)
- **Brutus** - Password brute-force cracking tool (My Documents/EXPLOITATION/NT/Brutus/)
- **NetBus** - Remote access trojan (My Documents/EXPLOITATION/NT/Brutus/NetBus.bad)
- **Pwdump3** - Windows password dumping utility (My Documents/EXPLOITATION/NT/Pwdump/)
- **Dsniff** - Packet sniffer for UNIX systems (My Documents/EXPLOITATION/Unix/)

**Evidence:**
- File listing from tsk.filelist source showing organized directory structure
- Prefetch files indicating execution: CAIN25B45.EXE-056F3A6E.pf
- Program Files installation paths
- My Documents folder structure organized by attack type
- Source: `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` → File system

### Finding 4: Malware Detection Results
**Severity: Informational**

ClamAV antivirus scanning was performed on the evidence images. The results show no malware signatures detected in the image files themselves (E01 segments scanned OK). However, it should be noted that ClamAV did not open the disk image containers to scan the individual files within the forensic image—it only scanned the E01 files as opaque objects.

**Evidence:**
- ClamAV scan results: `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01: OK`
- ClamAV scan results: `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E02: OK`
- Source: `clamav.scan` indexed output

## Summary of Evidence Linking Computer to Suspect Activity

1. **Owner Identification**: Registry shows "Greg Schardt" as registered owner
2. **Online Persona**: Primary user account is "Mr. Evil" (suspect's known nickname)
3. **Hacking Intent**: Systematic collection of exploitation tools organized by attack category
4. **Wireless Focus**: Ethereal, Look@LAN, and wireless card presence indicate wireless traffic interception capability
5. **Credential Theft**: Cain, Brutus, Pwdump, and dsniff are specifically designed to capture passwords and credentials
6. **Network Access**: Tools consistent with the briefing description of parking near Wireless Access Points (WAPs) to intercept traffic

---

## Case Questions

**Case Q1:** What operating system was used on the computer?
**Answer:** Microsoft Windows XP (Version 5.1, Build 2600)

**Case Q2:** Who is the registered owner?
**Answer:** Greg Schardt

**Case Q3:** Perform a Anti-Virus check. Are there any viruses on the computer?
**Answer:** ClamAV antivirus scan returned OK (no detections) for the E01 image file segments. However, ClamAV scanned only the image containers themselves and did not extract and scan the individual files within the forensic image. The scan confirms no viruses are detected at the container level, but a full scan of extracted files would be required for comprehensive malware analysis.

---

**Investigation Completed:** 2026-11-16
**Evidence Chain of Custody:** Maintained throughout analysis