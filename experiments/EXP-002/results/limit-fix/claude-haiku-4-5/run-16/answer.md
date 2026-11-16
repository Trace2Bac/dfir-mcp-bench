Perfect! I have gathered sufficient evidence to complete the investigation. Let me compile my findings into the final report.

## FORENSIC INVESTIGATION REPORT
### NIST Hacking Case - Dell Latitude CPi (Serial #VLQLW)

---

## Case Summary

On 09/20/04, an abandoned Dell CPi notebook computer was seized along with a wireless PCMCIA card and external 802.11b antenna. The investigation focused on identifying the operating system, registered owner, and any evidence of malicious software and hacking activities.

---

## Investigation Findings

### Operating System and Owner Identification

**Operating System:** Windows XP Professional
- **Product Name:** Microsoft Windows XP
- **Version:** 5.1
- **Build Number:** 2600
- **BuildLab:** 2600.xpclient.010817-1148
- **Source:** SOFTWARE registry hive, Microsoft\Windows NT\CurrentVersion

**Registered Owner:** Greg Schardt
- **Computer Name:** N-1A9ODN6ZXK4LQ
- **Source:** SOFTWARE registry hive, RegisteredOrganization field

### Hacking Tools and Evidence

The computer contains extensive evidence of tools and organized materials used for network hacking and wireless interception, including:

**Installed Network Sniffing/Exploitation Tools:**
- **Ethereal v0.10.6** - Professional-grade network packet sniffer
- **Cain & Abel (v2.5B45)** - Password recovery and network analysis tool
- **WinPcap v3.01** - Windows packet capture library driver
- **Anonymizer** - Web anonymity and privacy tool
- **Look@LAN** - Network discovery and enumeration tool

**Hacking Tool Collections in My Documents:**
Organized by attack methodology:

1. **FOOTPRINTING (Reconnaissance):**
   - Nmapnt (Nmap for Windows) - Network mapper source code
   - NSTPro2 - Network enumeration tool  
   - SPADE 1.14 - Network scanner
   - SuperScan - Multi-function network scanner

2. **ENUMERATION:**
   - OGRE - Network enumeration utility

3. **EXPLOITATION:**
   - dsniff v2.3 (Unix version) - Network sniffing and credential interception tool

**Suspect Identification:**
- User account named **"Mr. Evil"** present on system, matching suspect's known online alias
- alt.hacking newsgroup subscription found in Outlook Express email folders
- Cached file reference to "wardriving" activity (wireless network scanning) in browser history

**Desktop Shortcuts:**
- Shortcut to "whois" reconnaissance tool

---

## Anti-Virus Scan Results

ClamAV antivirus scan was performed on the disk image:
- **Result:** No malware detected
- **Status:** OK on both image segments (4Dell_Latitude_CPi.E01 and E02)

---

## Conclusion

The computer evidence strongly correlates with the suspect Greg Schardt (online alias "Mr. Evil"). The presence of organized hacking tool collections, packet sniffing software, wireless analysis tools, and wardriving references align precisely with the suspected activity of intercepting wireless traffic to steal credit card numbers, usernames, and passwords from T-Mobile Hotspots and other wireless access points.

---

## Case Questions

**Case Q1:** What operating system was used on the computer?
**Microsoft Windows XP (Version 5.1, Build 2600)** - Identified from the SOFTWARE registry hive at Microsoft\Windows NT\CurrentVersion

**Case Q2:** Who is the registered owner?
**Greg Schardt** - Identified from the RegisteredOwner value in the SOFTWARE registry hive. Confirmed match to suspect's known online alias "Mr. Evil" found as active user account on the system.

**Case Q3:** Perform a Anti-Virus check. Are there any viruses on the computer?
**No viruses detected.** ClamAV antivirus scan returned OK status for both disk image segments. However, the computer contains extensive hacking and network exploitation tools which, while not malware signatures, are clearly used for malicious network interception activities targeting wireless hotspots.