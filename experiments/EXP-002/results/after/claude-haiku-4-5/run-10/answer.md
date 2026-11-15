Now I have enough evidence to compile the final report. Let me create a comprehensive forensic investigation report.

---

# FORENSIC INVESTIGATION REPORT
## NIST Hacking Case - Dell Latitude CPi Notebook
### Case ID: nist-hacking-case-av
### Investigation Date: November 14, 2026

## Executive Summary

A Dell CPi notebook computer (Serial #VLQLW) was found abandoned on 09/20/04 with a wireless PCMCIA card and external 802.11b antennae. This forensic examination was conducted to determine if the computer was used for hacking purposes and to establish any connection to the suspect Greg Schardt (online nickname "Mr. Evil").

## Findings

### 1. System Configuration

**Operating System:** Microsoft Windows XP (Version 5.1, Build 2600)
**Installation Date:** August 27, 2004
**Registered Owner:** Greg Schardt
**Registered Organization:** N/A
**System Root:** C:\WINDOWS

### 2. Evidence of Hacking Tools and Activities

The forensic examination discovered extensive hacking software organized in specific directories indicating methodical preparation:

#### Footprinting and Reconnaissance Tools:
- **Nmap (nmapnt)** - Network mapping and port scanning tool located in `My Documents/FOOTPRINTING/NT/Nmapnt`
- **SPADE** - Network scanning tool (`My Documents/FOOTPRINTING/NT/spade114.exe`)
- **SuperScan** - Port scanning and enumeration tool (`My Documents/FOOTPRINTING/NT/superscan`)
- **NSTPro2** - Network scanning tool (`My Documents/FOOTPRINTING/NT/NSTPro2`)

#### Enumeration Tools:
- **OGRE** - Network enumeration tool located in `My Documents/ENUMERATION/NT/ogre`

#### Exploitation Tools:
- **Dsniff 2.3** - Network packet sniffer and credential interception tool (`My Documents/EXPLOITATION/Unix/dsniff 2.3`) - **Critical finding indicating intent to intercept passwords and credit card information**
- **Brutus** - Password brute force tool (`My Documents/EXPLOITATION/NT/Brutus`) with associated documentation
- **Pwdump** - Windows password hash extraction tool (`My Documents/EXPLOITATION/NT/Pwdump`)

#### Network Monitoring:
- **Ethereal** - Network packet analyzer/sniffer (`Program Files/Ethereal`) - sophisticated tool for capturing and analyzing network traffic
- **Anonymizer** - Privacy and anonymization tool (`Program Files/Anonymizer`)

### 3. User Account Identification

The computer contains a user account named **"Mr. Evil"** which corresponds to the online nickname of suspect Greg Schardt as mentioned in the case briefing. Evidence includes:
- User directory: `Documents and Settings/Mr. Evil`
- Browser history and temporary internet files cached under this account
- References to networking tools and shortcuts in the user's Desktop directory
- Outlook Express data including subscription to "alt.hacking" newsgroup

### 4. Network Activity and Wardriving Evidence

Internet Explorer temporary files cache contains references to "wardriving" content, consistent with the suspect's known activity of parking vehicles near wireless access points to intercept network traffic.

### 5. Anti-Virus Scan Results

**ClamAV Scan Result:** Both E01 image segments scanned as "OK" with zero detections.

**Important Note:** While ClamAV antivirus signatures did not detect any traditional viruses or malware, the computer contains multiple sophisticated hacking tools (dsniff, packet sniffers, password crackers) that are not classified as viruses by antivirus software. These tools were explicitly used for the alleged hacking activities described in the case (interception of internet traffic, credential theft).

---

## Case Questions

**Case Q1:** Microsoft Windows XP (Version 5.1, Build 2600)

**Case Q2:** Greg Schardt

**Case Q3:** ClamAV antivirus scan detected zero viruses on the disk image. However, the computer contains extensive sophisticated hacking tools including dsniff (packet sniffer), Ethereal (network analyzer), Brutus (password cracker), and Pwdump (password hash dumper), which are specifically designed for intercepting network traffic and obtaining credentials—consistent with the suspect's alleged activities of stealing credit card numbers and login credentials at wireless hotspots.