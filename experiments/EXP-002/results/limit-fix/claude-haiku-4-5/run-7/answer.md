Perfect! I now have all the evidence needed. Let me compile the final report.

---

# DIGITAL FORENSIC INVESTIGATION REPORT
## NIST HACKING CASE - Dell Latitude CPi Notebook

### Case Information
- **Case ID:** nist-hacking-case-av
- **Evidence:** Dell Latitude CPi (Serial # VLQLW)
- **Image File:** 4Dell_Latitude_CPi.E01/E02
- **Investigation Date:** 2026-11-16

### Investigation Summary

This forensic examination focused on identifying the operating system, registered owner, and any viruses present on the abandoned Dell Latitude CPi notebook. The disk image was analyzed using The Sleuth Kit (TSK) for filesystem examination, Windows registry analysis for system information, and ClamAV for antivirus scanning.

### Key Findings

**Operating System Identification:**
The Windows XP registry was successfully extracted and analyzed. The SOFTWARE hive contains the ProductName value of "Microsoft Windows XP" with build number 2600 (Windows XP SP3 equivalent).

**Registered Owner:**
The SOFTWARE registry hive clearly identifies the registered owner as "Greg Schardt," which directly links this computer to the suspect mentioned in the case briefing. Additionally, a user account named "Mr. Evil" was found on the system, corresponding to the suspect's known online nickname.

**Hacking Tools Discovered:**
Extensive evidence of hacking tools and materials was found on the system:
- **Packet Sniffers:** Ethereal (fully installed in Program Files), dsniff 2.3
- **Password Cracking Tools:** Brutus, Pwdump (Windows password dumper), CAIN
- **Network Scanners:** nmap/nmapnt, SuperScan, SPADE (S.P.A.D.E 1.14), NSTPro2
- **Enumeration Tools:** ogre, Cerberus Internet Scanner
- **Miscellaneous Tools:** Look@LAN (network reconnaissance), Anonymizer (privacy tool)

These tools are organized in the My Documents folder under categorized subdirectories: ARCHIVE, COMMANDS, ENUMERATION, EXPLOITATION, FOOTPRINTING, and NOVELL.

**Evidence of War Driving Activities:**
Files named "wardriving[1]" were found in the "Mr. Evil" user's temporary internet files, providing evidence of wireless network intercept activities consistent with the case briefing.

**Antivirus Scan Results:**
ClamAV malware scanning detected one trojan:
- **Win.Trojan.Snitch-1** - Found in `My Documents/COMMANDS/snitch.exe`
  
Snitch.exe is a Trojan used for system monitoring and surveillance, which is consistent with the hacking profile.

### Case Questions

**Case Q1:** What operating system was used on the computer?
**Answer:** Microsoft Windows XP (Build 2600), as identified in the SOFTWARE registry hive at Microsoft\Windows NT\CurrentVersion.

**Case Q2:** Who is the registered owner?
**Answer:** Greg Schardt, as identified in the SOFTWARE registry hive value RegisteredOwner at Microsoft\Windows NT\CurrentVersion. This directly links the computer to the suspect.

**Case Q3:** Perform a Anti-Virus check. Are there any viruses on the computer?
**Answer:** Yes. One trojan virus was detected during antivirus scanning: Win.Trojan.Snitch-1 found in the file snitch.exe located in My Documents/COMMANDS/. Additionally, while not viruses per se, numerous hacking and network exploitation tools are present on the system, including packet sniffers (Ethereal, dsniff), password crackers (Brutus, Pwdump), and network scanning utilities.

### Conclusion

The forensic examination successfully linked this abandoned computer to suspect Greg Schardt through registry evidence of ownership. The system contains overwhelming evidence of hacking activities including professional-grade network sniffing and password cracking tools, consistent with the suspected activities of intercepting wireless traffic and stealing credentials at hotspot locations. The presence of the trojan Win.Trojan.Snitch-1 and the "wardriving" cached files corroborate the allegations of malicious network activity.