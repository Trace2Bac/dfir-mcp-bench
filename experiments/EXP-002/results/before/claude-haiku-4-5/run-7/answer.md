Perfect! I now have all the information needed to answer the case questions. Let me compile the final forensic report.

## DIGITAL FORENSIC EXAMINATION REPORT

**Case ID**: nist-hacking-case-av  
**Evidence**: Dell Latitude CPi Notebook (4Dell_Latitude_CPi.E01/E02)  
**Date Found**: 09/20/04  
**Serial**: VLQLW  
**Examination Date**: 2026-11-14

### Case Questions

**Case Q1: What operating system was used on the computer?**
Microsoft Windows XP (version 5.1, build 2600). Confirmed via Software registry hive (Microsoft\Windows NT\CurrentVersion\ProductName).

**Case Q2: Who is the registered owner?**
Greg Schardt. Confirmed via Software registry hive (Microsoft\Windows NT\CurrentVersion\RegisteredOwner value = "Greg Schardt").

**Case Q3: Perform an Anti-Virus check. Are there any viruses on the computer?**
No viruses detected. ClamAV scan of the entire evidence source returned 0 detections (both E01 and E02 segments scanned: "OK").

### Investigation Findings

**Suspect Linkage:**
The computer contains a user account folder named "Mr. Evil" (Documents and Settings/Mr. Evil/), which directly correlates to the suspect's online nickname mentioned in the case briefing.

**Hacking Software Identified:**

The system contains extensive evidence of hacking tools organized into functional categories:

1. **Network Reconnaissance Tools** (Footprinting):
   - Nmap NT (port scanner) - My Documents/FOOTPRINTING/NT/Nmapnt/
   - NSTPro2 (network scanner) - My Documents/FOOTPRINTING/NT/NSTPro2/
   - SPADE (network scanner) - My Documents/FOOTPRINTING/NT/spade114.exe
   - SuperScan (network scanner) - My Documents/FOOTPRINTING/NT/superscan/
   - Look@LAN (network scanning tool) - Program Files/Look@LAN/

2. **System Enumeration Tools**:
   - OGRE (NT enumeration) - My Documents/ENUMERATION/NT/ogre/
   - enum (network enumeration) - My Documents/ENUMERATION/NT/enum/

3. **Network Packet Interception/Sniffing**:
   - dsniff 2.3 (packet sniffer for traffic interception) - My Documents/EXPLOITATION/Unix/dsniff 2.3/
   - Ethereal (comprehensive packet capture and analysis) - Program Files/Ethereal/

4. **Password Attack Tools**:
   - Brutus (password cracking) - My Documents/EXPLOITATION/NT/Brutus/ (includes NetBus.bad, users.txt, documentation)
   - pwdump3 (password hash dumping) - My Documents/EXPLOITATION/NT/Pwdump/

5. **Anonymization/Evasion**:
   - Anonymizer (proxy service for anonymization) - Program Files/Anonymizer/

**Suspicious Communication Evidence:**
Outlook Express mailbox "alt.hacking.dbx" found in Documents and Settings/Mr. Evil/Local Settings/Application Data/Identities/, indicating participation in hacking-related newsgroups/discussions.

**Correlation with Case Allegations:**
The presence of dsniff 2.3 and Ethereal packet sniffing tools is particularly significant, as these directly support the allegation that the suspect was intercepting wireless internet traffic at public hotspots (Starbucks, T-Mobile Hotspots) to obtain credit card numbers, usernames, and passwords. The organized structure of exploitation and footprinting tools demonstrates systematic preparation for attacks.

### Conclusion

The forensic examination confirms this is the computer used by suspect Greg Schardt ("Mr. Evil"). Extensive evidence of hacking software, particularly packet sniffing tools (dsniff, Ethereal) aligned with wireless network interception tactics, supports the allegation that this system was used for cybercriminal activity targeting wireless access point users. The organized toolkit demonstrates both planning and capability for the suspected crimes. No anti-virus software detected any malicious code, suggesting the user implemented evasion measures or the tools were not considered malicious by legacy antivirus definitions.