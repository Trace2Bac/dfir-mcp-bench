Perfect. I have gathered all the necessary information. Let me compile the final forensic report.

---

# DIGITAL FORENSIC EXAMINATION REPORT
## Case: NIST Hacking Case - Dell Latitude CPi
**Case ID:** nist-hacking-case-av  
**Evidence:** 4Dell_Latitude_CPi.E01 (and E02)  
**Date of Examination:** 2026-11-14

## EXECUTIVE SUMMARY

This examination of an abandoned Dell CPi notebook computer has revealed strong evidence tying the device to the suspect Greg Schardt (also known as "Mr. Evil") and confirmed the presence of multiple hacking and network reconnaissance tools consistent with wireless interception and war driving activities.

## FINDINGS

### Operating System and System Information
The system runs **Microsoft Windows XP** (Windows NT 5.1, Build 2600), installed on 2004-08-15. The system timezone was configured for Central Time (Central Standard Time/Central Daylight Time). The system was last modified on 2004-08-27, consistent with the computer being recovered on 2004-09-20.

### User Accounts and Ownership
The registered owner in the Windows registry is **Greg Schardt** (confirmed in SOFTWARE hive: `Microsoft\Windows NT\CurrentVersion\RegisteredOwner = "Greg Schardt"`).

Additionally, a user account named **"Mr. Evil"** was found on the system with extensive activity, home directory, and customized settings. This account name matches the suspect's known online nickname cited in the case briefing.

### Hacking Tools and Suspicious Software

The following tools related to network reconnaissance, packet capture, and password cracking were identified:

1. **Ethereal** - Network protocol analyzer/packet sniffer found at `Program Files/Ethereal/`
   - Prefetch evidence: `WINDOWS/Prefetch/ETHEREAL.EXE-...pf`
   - Intended use: Legitimate network analysis; commonly used for unauthorized network traffic interception

2. **Cain & Abel (Cain)** - Password cracking and network analysis tool
   - Prefetch evidence: `WINDOWS/Prefetch/CAIN25B45.EXE-056F3A6E.pf`
   - Intended use: Password recovery; commonly used for credential theft and network attacks

3. **mIRC** - Internet Relay Chat client
   - Found at `Program Files/mIRC/`
   - Prefetch evidence: Shows execution
   - Suspicious context: Often used in hacking forums and for coordinating attacks

4. **WinPcap** - Network packet capture library
   - Installation found: `WINDOWS/Prefetch/WINPCAP_3_01_A.EXE-1E3EDEDC.pf`
   - Used by: Packet sniffing applications like Ethereal

5. **Look@LAN** - Network host discovery and scanning tool
   - Found at `Program Files/Look@LAN/`
   - Intended use: Locate active hosts on local network

6. **Anonymizer** - Web anonymization/privacy tool
   - Found at `Program Files/Anonymizer/`
   - Intended use: Hide user's online identity

7. **Shortcuts and Utilities**
   - `Documents and Settings/Mr. Evil/Desktop/Tools/Shortcut to whois.lnk` - Whois lookup utility for domain reconnaissance
   - Desktop "Tools" folder containing shortcut to whois and other utilities

### Evidence of Hacking Activity

1. **War Driving References**
   - File `Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/JIRVJY9X/wardriving[1]` found in cached Internet files
   - Consistent with case briefing that suspect would park vehicles near wireless access points to intercept traffic

2. **Hacking Network Environment**
   - Multiple network analysis tools installed on single system
   - Combination of tools (Ethereal + WinPcap + Cain) suggests systematic approach to network compromise
   - Anonymizer tool suggests awareness of law enforcement surveillance concerns

3. **User Activity Pattern**
   - "Mr. Evil" account with active Internet history, IRC usage, and tool deployment
   - Extensive cached Internet files consistent with active hacking research and activity

### Anti-Virus Examination

ClamAV scan performed on disk image files:
- **Result:** No virus signatures detected
- **Scan Details:** Both E01 and E02 segments scanned and returned "OK"
- **Note:** The scanned tools (Ethereal, mIRC, etc.) are themselves legitimate software, though used maliciously on this system

## CONCLUSION

The examination directly ties this computer to suspect Greg Schardt through:
1. Registry identification as registered owner
2. "Mr. Evil" user account matching known suspect nickname
3. Presence of war driving-related cached files
4. Systematic collection of network hacking and password cracking tools
5. Evidence of tool execution (prefetch files)

This computer was clearly used for unauthorized network reconnaissance and likely for intercepting wireless traffic at public hotspots as described in the case briefing.

---

## Case Questions

**Case Q1:** Microsoft Windows XP (version 5.1, build 2600)

**Case Q2:** Greg Schardt

**Case Q3:** No viruses detected. ClamAV scan of the disk image files returned OK with zero detections. Note: While no malware was found, multiple hacking and network reconnaissance tools are present on the system, which are legitimate software but being used for unauthorized hacking purposes.