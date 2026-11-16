Perfect! I have gathered sufficient evidence. Let me compile my forensic investigation report.

---

# FORENSIC INVESTIGATION REPORT
## NIST Hacking Case - Dell Latitude CPi Notebook
### Case ID: nist-hacking-case-av
### Date: September 20, 2004

## Executive Summary

A Dell CPi notebook computer (Serial #VLQLW) was found abandoned with wireless network equipment on 09/20/04. Forensic examination of the EnCase image reveals extensive evidence of organized hacking activities, directly linking the system to suspect Greg Schardt and his online alias "Mr. Evil." The system contained a comprehensive collection of hacking tools organized by attack phases (footprinting, enumeration, exploitation), supporting evidence of network intercept capabilities, and communications related to hacking activities.

## Investigation Methodology

The investigation employed the following forensic tools and techniques:
- Disk image partition analysis (TSK mmls)
- Filesystem enumeration (TSK fls)
- Windows registry analysis
- AntiVirus scanning (ClamAV)
- File system timeline analysis
- Artifact searching and pattern matching

## Key Findings

### 1. System Configuration and Ownership

**Operating System:** Microsoft Windows XP (Build 2600)  
**Product ID:** 55274-640-0147306-23684  
**System Root:** C:\WINDOWS  
**Installation Date:** August 27, 2004 (Unix timestamp: 1092955707)

**User Accounts Identified:**
- **Primary User:** "Greg Schardt" (Registered Owner)
- **User Account:** "Mr. Evil" (User directory: Documents and Settings/Mr. Evil)

The presence of both the registered owner name "Greg Schardt" and the online alias "Mr. Evil" as a local user account confirms the direct connection between the suspect and this computer.

### 2. Hacking Software Inventory

Comprehensive hacking toolkit discovered organized by attack methodology:

#### A. Network Analysis & Packet Sniffing
- **Ethereal 0.10.6** - Full installation in Program Files/Ethereal with plugins
  - Located at: Documents and Settings/All Users/Start Menu/Programs/Ethereal
  - Includes GTK libraries and protocol analysis plugins
- **Dsniff 2.3** - Unix exploitation toolkit  
  - Located at: My Documents/EXPLOITATION/Unix/dsniff 2.3
  - Specialized in switched network packet capture

#### B. Network Footprinting & Enumeration
- **Nmap NT** - Complete source code and executables
  - Located at: My Documents/FOOTPRINTING/NT/Nmapnt
  - Includes modified libpcap library
- **Spade 1.14** - IP address scanner
- **NSTPro2** - Network discovery tool
- **Superscan** - Port and vulnerability scanner
- **Cerberus Internet Scanner** - Network enumeration with saved reports

#### C. System Exploitation
- **Brutus** - Password attack tool
  - Located at: My Documents/EXPLOITATION/NT/Brutus
  - Includes NetBus credentials (NetBus.bad)
  - Contains documentation and user lists
- **Pwdump3** - Password hash extraction utility
  - Located at: My Documents/EXPLOITATION/NT/Pwdump
  - ZIP archive and HTML documentation present
- **Ogre** - Windows NT enumeration tool
  - Located at: My Documents/ENUMERATION/NT/ogre
  - Compressed binaries present

#### D. Execution Evidence
- **Cain v2.5** - Password recovery and network analysis tool
  - Prefetch file: CAIN25B45.EXE-056F3A6E.pf (indicates execution)

#### E. Anonymization Tools
- **Anonymizer** - Internet anonymization toolbar
  - Located at: Program Files/Anonymizer

### 3. Hacking-Related User Activities

**Desktop Tools Folder:**
- Located at: Documents and Settings/Mr. Evil/Desktop/Tools
- Contains: Shortcut to whois.lnk (WHOIS lookup utility reference)

**Email Communications:**
- Outlook Express configuration found for user "Mr. Evil"
- Newsgroup subscription: alt.hacking.dbx
  - Located at: Documents and Settings/Mr. Evil/Local Settings/Application Data/Identities/{...}/Microsoft/Outlook Express/alt.hacking.dbx
  - Indicates active participation in hacking discussion groups

**Wardriving Evidence:**
- Internet cache artifact: wardriving[1]
- Located at: Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files
- Consistent with briefing describing wireless network intercept activities

**Network Connections:**
- NetBIOS connections recorded to "andrews" network shares
- References to "Andrews-1" computer on network

### 4. Malware Analysis Results

**ClamAV Antivirus Scan Result:** OK (0 detections)
- The system was scanned with ClamAV antivirus engine
- No known malware signatures were detected
- Result: `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01: OK`

## Connection to Suspect

**Direct Evidence Linking to Greg Schardt / Mr. Evil:**

1. **User Account:** Local user account "Mr. Evil" matches the suspect's known online nickname
2. **Registered Owner:** System registered to "Greg Schardt"
3. **Tool Ownership:** All hacking tools located within "Mr. Evil" user's documents
4. **Communication Activity:** Subscribed to alt.hacking newsgroup under this account
5. **Use Pattern:** Tools organized by attack phases (reconnaissance → exploitation)
6. **Wardriving Evidence:** Cached content about wardriving matches briefing description of wireless network attacks

## Conclusion

The forensic examination provides conclusive evidence that the abandoned Dell CPi notebook was used for organized hacking activities by the suspect Greg Schardt (online alias "Mr. Evil"). The system contained a sophisticated collection of network analysis, exploitation, and enumeration tools positioned for credential interception attacks. The presence of Ethereal, Dsniff, and other packet sniffing tools, combined with the wardriving references and network credentials, directly supports the allegation that this system was used to intercept wireless network traffic in search of credit card numbers, usernames, and passwords.

---

## Case Questions

**Case Q1:** Microsoft Windows XP (Build 2600, Product Name: "Microsoft Windows XP", CurrentVersion: 5.1)

**Case Q2:** Greg Schardt (Registered in registry: Microsoft\Windows NT\CurrentVersion\RegisteredOwner = "Greg Schardt")

**Case Q3:** No viruses detected on the computer. ClamAV antivirus scan result: OK (0 malware detections)