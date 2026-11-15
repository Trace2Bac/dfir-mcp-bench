Based on my forensic investigation of the Dell CPi notebook, I have found comprehensive evidence linking this computer to hacking activities and the suspect. Here is my final report:

---

# DIGITAL FORENSIC EXAMINATION REPORT
## NIST Hacking Case - Dell Latitude CPi Notebook

### Investigation Summary
On September 20, 2004, an abandoned Dell CPi notebook was recovered along with wireless equipment. This examination was conducted to determine the operating system, registered owner, and presence of malicious software, as well as to identify hacking-related activities and tie the computer to the suspect.

### Methodology
The investigation employed the following forensic tools:
- **mmls**: Partition analysis
- **fls**: File system enumeration  
- **ClamAV**: Antivirus scanning
- **Registry Query**: Windows registry analysis
- **File System Search**: Keyword and pattern searching

### Findings

#### Operating System and Owner Information
The registry examination of the SOFTWARE hive revealed:
- **Operating System**: Microsoft Windows XP (version 5.1, Build 2600)
- **Registered Owner**: Greg Schardt
- **Installation Date**: August 27, 2004
- **Timezone**: Central Time Zone

#### Hacking Software Identified

1. **Ethereal (Network Packet Sniffer)**
   - Location: Program Files/Ethereal
   - Complete installation with libraries and plugins found
   - Used for capturing and analyzing network traffic

2. **Cain & Abel (CAIN25B45.EXE)**
   - Evidence in Windows/Prefetch directory
   - Professional-grade password cracking and network hacking tool
   - Specifically designed for credential harvesting

3. **CUTE3032.EXE (Wardriving Tool)**
   - Evidence in Windows/Prefetch directory
   - Wardriving software used for wireless network discovery and analysis

4. **Anonymizer Software**
   - Location: Program Files/Anonymizer
   - Browser anonymization tool to hide internet activity
   - Complete installation with toolbar and core components

#### Connection to Suspect "Mr. Evil"

- **User Account**: "Mr. Evil" profile found in Documents and Settings
- **Hacking Newsgroup Access**: "alt.hacking.dbx" Outlook Express database file found in Mr. Evil's profile
- **Reconnaissance Tools**: Shortcut to whois.lnk found in Mr. Evil/Desktop/Tools directory
- **Wardriving Activity**: "wardriving[1]" file found in Mr. Evil's Temporary Internet Files cache

### Antivirus Scan Results
**ClamAV Scan Result: CLEAN**
- Both image segments scanned: OK
- No viruses or malicious signatures detected
- The hacking tools were not flagged as malware (consistent with legitimate security research/penetration testing tools that can have legitimate uses, but in this context are part of an criminal hacking investigation)

### Conclusion
This computer contains multiple professional-grade hacking and network analysis tools consistent with the suspected hacking activity. The presence of the "Mr. Evil" user account, combined with the alt.hacking newsgroup membership, wardriving files, and installed tools for network sniffing and password cracking, strongly suggests this computer was used to:
- Intercept wireless network traffic
- Perform password cracking
- Conduct reconnaissance against networks
- Hide the perpetrator's internet activity

The registered owner "Greg Schardt" and the user account "Mr. Evil" (matching the suspect's online nickname) directly tie this computer to the investigation.

---

## Case Questions

**Case Q1:** What operating system was used on the computer?
Microsoft Windows XP (version 5.1, Build 2600)

**Case Q2:** Who is the registered owner?
Greg Schardt

**Case Q3:** Perform a Anti-Virus check. Are there any viruses on the computer?
ClamAV antivirus scan completed with no viruses detected. Both image segments scanned returned "OK" status. However, the system contains multiple hacking and network analysis tools (Ethereal, Cain & Abel, CUTE3032 wardriving tool, and Anonymizer) that are designed for network interception and credential harvesting, consistent with the suspected hacking activities described in the case briefing.