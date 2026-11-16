Perfect! I now have comprehensive evidence. Let me create the final investigation report:

---

# NIST HACKING CASE FORENSIC INVESTIGATION REPORT

## Case Information
- **Case ID:** nist-hacking-case-av
- **Evidence:** Dell Latitude CPi (VLQLW) - E01/E02 disk image
- **Date Found:** September 20, 2004
- **Suspect:** Greg Schardt ("Mr. Evil")

## Case Questions

**Case Q1:** What operating system was used on the computer?
**Microsoft Windows XP** (Build 2600, Version 5.1). This was confirmed in the SOFTWARE registry hive at Microsoft\Windows NT\CurrentVersion, which shows ProductName="Microsoft Windows XP" and CurrentBuildNumber="2600". Install date was August 27, 2004.

**Case Q2:** Who is the registered owner?
**Greg Schardt**. This was confirmed in the SOFTWARE registry hive at Microsoft\Windows NT\CurrentVersion, which shows RegisteredOwner="Greg Schardt". Additionally, a user profile folder named "Mr. Evil" (the suspect's online nickname) exists on the system at Documents and Settings/Mr. Evil/, confirming his association with the computer.

**Case Q3:** Perform an Anti-Virus check. Are there any viruses on the computer?
**No viruses detected.** A ClamAV antivirus scan was performed on the entire disk image (both E01 and E02 segments). Both segments returned "OK" status with zero malware detections.

---

## Investigation Summary

### Hacking Software Identified

**Packet Sniffing/Network Analysis Tools:**
- **Ethereal** (now known as Wireshark) - full installation in Program Files/Ethereal/ with plugins and libraries
- **dsniff 2.3** - stored in My Documents/EXPLOITATION/Unix/dsniff 2.3/

**Password Cracking Tools:**
- **Brutus** - stored in My Documents/EXPLOITATION/NT/Brutus/ with configuration files (NetBus.bad, users.txt, readme.doc, Overview.doc)
- **Pwdump3** - stored in My Documents/EXPLOITATION/NT/Pwdump/ with documentation and .zip archive

**Network Reconnaissance/Scanning Tools:**
- **NmapNT** - complete with source code in My Documents/FOOTPRINTING/NT/Nmapnt/
- **NSTPro2** - network scanning tool with configuration files in My Documents/FOOTPRINTING/NT/NSTPro2/
- **SPADE 1.14** - stored as spade114.exe in My Documents/FOOTPRINTING/NT/
- **SuperScan** - network scanning tool in My Documents/FOOTPRINTING/NT/superscan/
- **Look@LAN** - network discovery tool installed in Program Files/Look@LAN/

**Domain/Network Intelligence Tools:**
- Whois tool shortcut on Desktop (Documents and Settings/Mr. Evil/Desktop/Tools/Shortcut to whois.lnk)

### Evidence of Hacking Activity

1. **Organized Folder Structure:** The suspect maintained a structured hacking toolkit organized by:
   - ENUMERATION (network host discovery)
   - EXPLOITATION (active attack tools)
   - FOOTPRINTING (passive reconnaissance)

2. **Wardriving Evidence:** Cached Internet file references include "wardriving[1]" in the Temporary Internet Files, consistent with the briefing describing the suspect parking near wireless access points and intercepting traffic.

3. **Hacking Discussion Community:** Outlook Express mailbox "alt.hacking.dbx" indicates participation in hacking-related email discussions.

4. **Suspect Identification:** 
   - User profile folder "Mr. Evil" matches the online nickname mentioned in the briefing
   - Registered owner "Greg Schardt" matches the suspect's legal name
   - This directly ties the computer to the suspect

### Technical Capabilities

The combination of tools on this system indicates the suspect possessed skills in:
- Network packet interception and analysis (Ethereal, dsniff)
- Network reconnaissance and enumeration (Nmap, NSTPro2, SuperScan)
- Wireless network detection (Look@LAN, wardriving activities)
- Password-based attacks (Brutus)
- Windows system exploitation (Pwdump, Brutus targeting NetBus)

This toolkit is consistent with the suspected activities of intercepting internet traffic to obtain credit card numbers, usernames, and passwords, particularly at wireless hotspots.

---

## Conclusion

The Dell Latitude CPi (VLQLW) found abandoned on September 20, 2004, was definitively used for hacking purposes and has been successfully tied to suspect Greg Schardt through:
1. Registered owner identification in Windows registry
2. Online nickname "Mr. Evil" present in system user profile
3. Comprehensive hacking toolkit organized and maintained on the system
4. Evidence of wireless network targeting activities (wardriving)
5. Participation in hacking discussion communities

No viruses were detected on the system, indicating the suspect maintained a stable, controlled hacking platform rather than an infected compromised system.