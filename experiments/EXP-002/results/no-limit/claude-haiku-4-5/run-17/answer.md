Perfect! I have gathered sufficient evidence. Now let me compile a comprehensive forensic report.

---

# FORENSIC INVESTIGATION REPORT
## NIST Hacking Case - Dell CPi Notebook (Serial: VLQLW)

**Case ID:** nist-hacking-case-av  
**Investigation Date:** 2026-11-14  
**Evidence:** 4Dell_Latitude_CPi.E01, 4Dell_Latitude_CPi.E02

### EXECUTIVE SUMMARY

Investigation of the abandoned Dell CPi notebook has revealed it was registered to **Greg Schardt** and operated on **Microsoft Windows XP**. The computer contains multiple hacking and network analysis tools consistent with the suspect's known activities. ClamAV antivirus scanning detected no viruses on the system. Extensive evidence ties this computer to the suspect "Mr. Evil" and demonstrates capability for intercepting wireless traffic and capturing network credentials.

---

## FINDINGS

### 1. System Identification

The forensic examination established the following system specifications:

- **Operating System:** Microsoft Windows XP (Version 5.1, Build 2600)
- **System Root:** C:\WINDOWS
- **Installation Date:** August 20, 2004
- **Registry Last Modified:** August 27, 2004 at 15:46:33 UTC

Source: SOFTWARE Registry Hive - Microsoft\Windows NT\CurrentVersion

### 2. Registered Owner - Critical Link to Suspect

- **Registered Owner:** Greg Schardt
- **Organization:** N/A
- **Product ID:** 55274-640-0147306-23684

This registry information directly ties the computer to the named suspect, Greg Schardt. Additionally, user profile examination revealed a user account named **"Mr. Evil"** - the online nickname mentioned in the case briefing as being used by the suspect and his associates.

Evidence files located in: Documents and Settings/Mr. Evil/

### 3. Hacking Software Installed

The computer contains multiple specialized tools commonly used for network reconnaissance, traffic interception, and password recovery:

#### **Network Packet Capture & Analysis:**
- **Ethereal** - Network protocol analyzer and packet sniffer
  - Location: Program Files/Ethereal/
  - Start Menu: Documents and Settings/All Users/Start Menu/Programs/Ethereal/
  - Evidence: Program files, plugins, SNMP MIB libraries
  - Purpose: Captures and analyzes network traffic packets

- **WinPcap 3.01** - Packet capture library
  - Evidence: WINDOWS/Prefetch/WINPCAP_3_01_A.EXE-1E3EDEDC.pf
  - Purpose: Core library for packet capture, dependency for Ethereal and similar tools

#### **Network Reconnaissance:**
- **Look@LAN** - Network discovery and scanning tool
  - Location: Program Files/Look@LAN/
  - Evidence: Sound files, application infrastructure
  - Purpose: Discovers computers and services on local networks

#### **Password & Credential Tools:**
- **CAIN & Abel** - Password recovery and network analysis tool
  - Evidence: WINDOWS/Prefetch/CAIN25B45.EXE-056F3A6E.pf
  - Purpose: Password cracking, network analysis, ARP spoofing

#### **Communication & Anonymity:**
- **mIRC** - Internet Relay Chat client
  - Location: Documents and Settings/All Users/Start Menu/Programs/mIRC/
  - Purpose: Communication platform commonly used in hacking communities

- **Anonymizer** - Privacy/anonymization software
  - Location: Program Files/Anonymizer/
  - Evidence: Core DLL, toolbar, images
  - Purpose: Masks user identity and online activities

### 4. Evidence of Malicious Activity

**Wardriving Evidence:**
- Located in: Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/JIRVJY9X/wardriving[1]
- This file reference directly matches the case briefing describing the suspect parking near wireless access points (Starbucks, T-Mobile Hotspots) to intercept internet traffic
- Consistent with possession of wireless PCMCIA card and 802.11b antenna found with the computer

**Suspect Nickname Confirmation:**
- User account "Mr. Evil" located on the system matches the online nickname mentioned in the case briefing
- Demonstrates this computer was actively used by the identified suspect

### 5. Antivirus Scan Results

**ClamAV Antivirus Scan:**
- **Result:** OK (No malware detected)
- **Detections:** 0
- **Scan Date/Time:** Conducted during forensic examination
- **Evidence Source:** clamav.scan output

---

## CASE QUESTIONS

**Case Q1: What operating system was used on the computer?**

Microsoft Windows XP (Version 5.1, Build 2600, installed August 20, 2004). Evidence: SOFTWARE Registry Hive - Microsoft\Windows NT\CurrentVersion - ProductName value shows "Microsoft Windows XP" and CurrentBuildNumber shows "2600".

**Case Q2: Who is the registered owner?**

Greg Schardt. Evidence: SOFTWARE Registry Hive - Microsoft\Windows NT\CurrentVersion - RegisteredOwner value shows "Greg Schardt". Additionally, user profile "Mr. Evil" (the suspect's known online nickname) is present on the system in Documents and Settings/Mr. Evil/.

**Case Q3: Perform a Anti-Virus check. Are there any viruses on the computer?**

No viruses detected. ClamAV antivirus scan returned "OK" with 0 detections. Evidence: clamav.scan result shows clean status for the E01 disk image.

---

## CONCLUSION

The abandoned Dell CPi notebook has been conclusively linked to suspect Greg Schardt through multiple forensic artifacts including the registered owner information and the "Mr. Evil" user account. The system is configured with specialized hacking and network analysis tools (Ethereal, Look@LAN, CAIN & Abel, WinPcap) consistent with the suspect's known activities of intercepting wireless traffic to obtain credentials. Evidence of wardriving activity corroborates the case briefing regarding the suspect's modus operandi of parking near wireless hotspots. The system poses significant risk for credential and financial data interception. No antivirus detections were found, indicating the suspect successfully operated without malware infection.

---

**Report Compiled By:** Digital Forensic Examiner  
**Date:** November 14, 2026