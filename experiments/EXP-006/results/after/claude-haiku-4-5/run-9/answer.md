Now I have gathered sufficient evidence. Let me compile the final forensic report.

---

# FORENSIC INVESTIGATION REPORT
## NIST Hacking Case - Dell Latitude CPi Notebook (Serial # VLQLW)
### Case ID: nist-hacking-case-av
### Investigation Date: 2026-11-14

## Executive Summary

A comprehensive digital forensic examination was conducted on the abandoned Dell Latitude CPi notebook (Serial # VLQLW) discovered on 09/20/04. The investigation examined the EnCase disk image (4Dell_Latitude_CPi.E01/E02) and identified significant evidence linking the computer to suspect Greg Schardt (aka "Mr. Evil") and confirming the presence of multiple hacking tools consistent with wireless network interception activities.

## Investigation Methodology

1. **Case Creation and Evidence Intake**: Case created with case ID "nist-hacking-case-av" and evidence scanned from /evidence/nist-hacking-case/
2. **Partition Analysis**: TSK mmls and fls tools used to analyze disk structure and file listing
3. **Registry Analysis**: Windows registry hives queried to obtain OS and owner information
4. **File System Search**: Comprehensive file listing analyzed to identify hacking software and suspicious tools
5. **Antivirus Scanning**: ClamAV scan conducted on evidence

## Key Findings

### 1. System Configuration
- **Filesystem**: Windows NTFS 
- **Total Files Indexed**: 12,545 files across filesystem
- **Deleted Files Identified**: Multiple deleted files marked in file listing

### 2. Direct Suspect Link
**Critical Finding**: User account "Mr. Evil" exists on the system at path:
```
Documents and Settings/Mr. Evil/
```

This directly corresponds to the suspect's online nickname "Mr. Evil," which was identified in the briefing as an alias for Greg Schardt. This provides a definitive link between the suspect and the abandoned computer.

### 3. Hacking Software Identified

The following tools indicative of hacking activities were discovered on the system:

| Software | Location | Purpose |
|----------|----------|---------|
| **Ethereal** | Program Files/Ethereal/ | Network packet sniffer - captures and analyzes network traffic for interception of credentials |
| **mIRC** | Documents and Settings/All Users/Start Menu/Programs/mIRC/ | IRC client for hacker communications |
| **CAIN & Abel** | WINDOWS/Prefetch/CAIN25B45.EXE | Password recovery and cracking tool |
| **Anonymizer** | Program Files/Anonymizer/ | Network anonymization tool to hide user activity |
| **Look@LAN** | Program Files/Look@LAN/ | Network scanning and discovery tool |

### 4. Suspect Modus Operandi Match
The briefing indicated the suspect would "park his vehicle within range of Wireless Access Points (like Starbucks and other T-Mobile Hotspots) where he would then intercept internet traffic, attempting to get credit card numbers, usernames & passwords."

The tools discovered perfectly align with this methodology:
- **Ethereal** captures live network traffic from wireless networks
- **CAIN & Abel** cracks captured password hashes
- **Anonymizer** masks the attacker's identity while conducting these activities
- **Look@LAN** identifies available wireless networks and connected hosts
- **mIRC** enables communication with other hackers regarding stolen credentials

## Case Questions

**Case Q1: What operating system was used on the computer?**
Microsoft Windows XP (Version 5.1, Build 2600). Confirmed via registry query of HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion showing ProductName="Microsoft Windows XP"

**Case Q2: Who is the registered owner?**
Greg Schardt. Confirmed via registry query of HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion showing RegisteredOwner="Greg Schardt". Additionally, the suspect's online nickname "Mr. Evil" is associated with a user profile on the system (Documents and Settings/Mr. Evil/), providing corroborating evidence.

**Case Q3: Perform a Anti-Virus check. Are there any viruses on the computer?**
ClamAV antivirus scan returned no detections on the disk image itself (result: OK). However, the presence of hacking software tools indicates intentional installation of utilities designed for malicious network interception and credential theft. While not traditional viruses or malware, these tools constitute evidence of hacking activity and malicious intent. The tools discovered (Ethereal, CAIN & Abel, Anonymizer, Look@LAN) are legitimate applications when used for authorized security testing but their presence on an individual's personal laptop, combined with the other evidence (suspect's user profile, briefing information), indicates use for unauthorized hacking activities.

## Conclusion

The digital forensic examination successfully:
1. Confirmed the computer belonged to registered owner Greg Schardt
2. Identified the suspect's online alias "Mr. Evil" as an active user profile
3. Discovered multiple professional-grade hacking tools installed and ready for use
4. Connected the tools to the suspect's known method of operation (wireless network interception)
5. Provided strong evidence linking this abandoned computer to the suspected hacking activities

The evidence supports the hypothesis that this computer was indeed used for unauthorized wireless network interception and credential theft activities as suspected in the case briefing.

---