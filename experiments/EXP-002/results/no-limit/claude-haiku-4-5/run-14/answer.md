Perfect! I now have all the information needed to answer the case questions. Let me compile the final investigation report.

---

# NIST HACKING CASE INVESTIGATION REPORT
## Case ID: nist-hacking-case-av

### Executive Summary

This investigation examined a Dell Latitude CPi notebook computer discovered on 09/20/04, allegedly used by suspect Greg Schardt (online alias "Mr. Evil") for hacking purposes. The forensic analysis has uncovered substantial evidence consistent with network hacking activities, including network sniffing tools, password cracking utilities, and enumeration/exploitation frameworks.

### Investigation Methodology

1. **Evidence Ingestion** - EnCase E01 disk image analyzed using TSK (The Sleuth Kit)
2. **Registry Analysis** - Windows registry hives queried to determine OS and registered owner
3. **Malware Scanning** - ClamAV antivirus engine used to scan for known malicious signatures
4. **Filesystem Enumeration** - Complete filesystem listing reviewed to identify hacking tools and suspicious artifacts

### Key Findings

#### Operating System & Owner Information
- **OS**: Microsoft Windows XP (Build 2600, SP2 era)
- **Registered Owner**: Greg Schardt
- **Owner Organization**: N/A
- **Product ID**: 55274-640-0147306-23684
- **Installation Date**: August 27, 2004

#### Hacking Tools Identified

**Network Analysis & Packet Capture:**
- **Ethereal** (network protocol analyzer) - installed in `Program Files/Ethereal/`
- Evidence of usage in Windows Prefetch files

**Password Cracking & Credential Tools:**
- **Cain 2.5** - Password recovery and network analysis tool
  - Prefetch evidence: `WINDOWS/Prefetch/CAIN25B45.EXE-056F3A6E.pf`
- **Pwdump3** - Windows password dumping utility
  - Located at: `My Documents/EXPLOITATION/NT/Pwdump/`

**Network Enumeration & Scanning:**
- **Nmap** (NmapNT) - Network mapper and port scanner
  - Located at: `My Documents/FOOTPRINTING/NT/Nmapnt/`
- **Superscan** - Network scanning tool
  - Located at: `My Documents/FOOTPRINTING/NT/superscan/`
- **SPADE 1.14** - Scanning and enumeration tool
  - Located at: `My Documents/FOOTPRINTING/NT/spade114.exe`
- **NSTPro2** - Network scanning tools
  - Located at: `My Documents/FOOTPRINTING/NT/NSTPro2/`
- **Look@LAN** - Network discovery tool
  - Located at: `Program Files/Look@LAN/`

**Network Traffic Sniffing:**
- **dsniff 2.3** - Network protocol analyzer and credential sniffer
  - Located at: `My Documents/EXPLOITATION/Unix/dsniff 2.3/`
- **Brutus** - Password testing/cracking tool
  - Located at: `My Documents/EXPLOITATION/NT/Brutus/`

**Exploitation & Enumeration Frameworks:**
- **OGRE** - Exploitation tool
  - Located at: `My Documents/ENUMERATION/NT/ogre/`
- Archive tools (ARJ utilities)
  - Located at: `My Documents/ARCHIVE/Arj/`

#### Suspect Account Evidence
- **User Account**: "Mr. Evil" (matching the suspect's known online alias from the case briefing)
  - User directory: `Documents and Settings/Mr. Evil/`
- **Email/News**: Subscribed to alt.hacking newsgroup
  - Evidence: `Documents and Settings/Mr. Evil/Local Settings/Application Data/Identities/{EF086998-1115-4ECD-9B13-9ADC067B4929}/Microsoft/Outlook Express/alt.hacking.dbx`
- **Tools Shortcuts**: Desktop/Tools folder with links to hacking utilities

#### Antivirus Results
- **ClamAV Scan**: CLEAN - No viruses or malware signatures detected
- **Detection Count**: 0
- **Scan Status**: OK

### Conclusion

The forensic investigation confirms this computer was actively used for hacking activities. The comprehensive collection of network enumeration, packet sniffing, password cracking, and exploitation tools—organized in structured directories (FOOTPRINTING, ENUMERATION, EXPLOITATION)—indicates organized and systematic hacking operations. The presence of the "Mr. Evil" user account directly correlates the computer to suspect Greg Schardt's known online identity. While no computer viruses were detected, the abundance of intentional hacking software and the suspect's documented interest in the alt.hacking community provide strong circumstantial evidence linking this computer to the suspected hacking activities described in the case briefing.

---

## Case Questions

**Case Q1:** Microsoft Windows XP (Product Name: "Microsoft Windows XP", CurrentVersion: 5.1, Build: 2600). This was determined from the SOFTWARE hive registry key `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** Greg Schardt. This was determined from the SOFTWARE hive registry value `RegisteredOwner` at key `Microsoft\Windows NT\CurrentVersion`, which contains "Greg Schardt" as the registered owner. This name matches the suspect named in the case briefing.

**Case Q3:** No viruses were detected. ClamAV antivirus scan of the disk image returned "OK" with zero detections. However, the computer contains numerous intentional hacking tools (Ethereal, Cain, dsniff, Nmap, etc.) which are not viruses but legitimate security testing utilities that have been repurposed for malicious hacking activities.