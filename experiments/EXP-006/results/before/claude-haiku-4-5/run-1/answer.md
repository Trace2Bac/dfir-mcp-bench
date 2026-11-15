Now I have comprehensive evidence to compile my final report. Let me verify all the key findings and create the final report.

---

# NIST HACKING CASE FORENSIC INVESTIGATION REPORT

## Case Information
- **Case ID**: nist-hacking-case-av
- **Evidence Image**: 4Dell_Latitude_CPi (E01/E02)
- **Analysis Date**: 2026-11-14
- **Equipment**: Dell Latitude CPi Notebook, Serial # VLQLW

## Executive Summary

This Dell CPi notebook computer, found abandoned on 09/20/04 with a wireless PCMCIA card and external 802.11b antenna, contained extensive hacking software and tools organized in a systematic manner. The computer is registered to Greg Schardt, who operates under the online nickname "Mr. Evil," matching the suspect profile. The machine contains specialized tools for network reconnaissance, password attacks, traffic interception, and system exploitation—all consistent with the suspected wireless interception and credential theft activities.

## Key Findings

### 1. Hacking Tools Identified

The computer contains an extensive collection of hacking software organized into functional categories in the "My Documents" folder:

**Network Enumeration & Reconnaissance Tools:**
- Cerberus Internet Scanner (with active scan reports)
- SuperScan (network vulnerability scanner)
- S.P.A.D.E. Scanner
- Nmap/NmapNT (port scanner with source code)
- NSTPro2 (network analysis)
- Enum and Ogre (NT enumeration utilities)

**Network Interception & Analysis:**
- Ethereal 0.10.6 (packet sniffer/network analyzer, later renamed Wireshark)
- dsniff 2.3 (network packet sniffer designed to intercept traffic)
- Anonymizer Software (anonymization/proxy tools)

**Password Attack & System Exploitation:**
- Brutus (password brute-force attack tool with dictionary file containing: admin, administrator, test, guest, root, backup)
- Pwdump3 (Windows password hash extraction tool)

**Utility Commands:**
- user2sid.exe (SID enumeration)
- snitch.exe, streamfind.exe, and other command-line utilities

### 2. Evidence of Active Use

- **Cerberus Internet Scanner Reports**: Active scan output files found for IP address 172.16.0.2 showing registry and service scans
- **Brutus Dictionary File**: users.txt containing common usernames used in brute-force password attacks
- **Organized Tool Structure**: Tools organized into ENUMERATION, EXPLOITATION, FOOTPRINTING, and COMMANDS folders, indicating systematic hacking operations
- **Source Code Included**: Full Nmap source code and documentation present, suggesting advanced knowledge

### 3. Link to Suspect "Mr. Evil"/Greg Schardt

- **User Account**: The Windows user account on the system is named "Mr. Evil"
- **Registered Owner**: Windows registry shows RegisteredOwner: "Greg Schardt"
- **Email Records**: User account "Mr. Evil" with email associations found in Outlook Express

The use of the nickname "Mr. Evil" as the Windows user account name directly connects this computer to the suspect's known online identity.

## Technical Details

- **Operating System**: Microsoft Windows XP (Professional edition)
- **OS Version**: 5.1 (Build 2600)
- **Installation Date**: 2004-08-27 (approximately 3 weeks before discovery)
- **System Root**: C:\WINDOWS

---

## Case Questions

**Case Q1**: What operating system was used on the computer?

**Answer**: Microsoft Windows XP Professional (Version 5.1, Build 2600). This is confirmed by the registry value ProductName in the SOFTWARE hive showing "Microsoft Windows XP" and CurrentVersion showing "5.1" with CurrentBuildNumber "2600". The system was installed on 2004-08-27, approximately 3 weeks before the computer was abandoned.

**Case Q2**: Who is the registered owner?

**Answer**: Greg Schardt. The registry value RegisteredOwner in SOFTWARE\Microsoft\Windows NT\CurrentVersion is set to "Greg Schardt". Additionally, the primary Windows user account on the system is named "Mr. Evil," which is the known online nickname of the suspect. This directly links the computer to the suspect through both the formal registration and the operational account name.

**Case Q3**: Perform a Anti-Virus check. Are there any viruses on the computer?

**Answer**: No viruses were detected. ClamAV antivirus scan of the disk image (both E01 and E02 segments) returned OK with zero detections, indicating no known malware signatures were found on the system at the time of analysis.

---

## Conclusion

The evidence strongly supports that this Dell CPi notebook was used for hacking activities by the suspect Greg Schardt (online alias "Mr. Evil"). The presence of:

1. Tools specifically designed for wireless interception and network sniffing (Ethereal, dsniff)
2. Network reconnaissance tools with evidence of active scans (Cerberus Scanner)
3. Password attack infrastructure (Brutus with dictionary files)
4. The suspect's user account ("Mr. Evil") and registered name on the system
5. The organized structure suggesting systematic hacking operations

All findings are consistent with the case briefing describing use of wireless interception equipment to intercept internet traffic and steal credentials at wireless hotspots. This computer represents the operational toolkit for those activities.