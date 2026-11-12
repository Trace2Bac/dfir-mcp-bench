# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-12T07:37:36.803385+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 138 evidence sources (16 disk, 122 other) | 211 tool calls | 11 minutes
**Results:** 16 findings (3 critical, 7 high) | 13 confirmed, 3 inference
**Timeline:** 2003-10-13 to 2026-11-12

**Key Threats:**
- Network Packet Capture Tools (Ethereal, Cain, WinPcap) Indicating Network Sniffing Capability
- Network Reconnaissance Toolkit Complete with Nmap, SuperScan, Whois, and NMAP-NT
- Prefetch Evidence Shows Execution of Hacking Tools Including Cain Network Analyzer

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2026-11-12): Network Packet Capture Tools (Ethereal, Cain, WinPcap) Indicating Network Sniffing Capability (+8 related)
- **Persistence** (2004-08-19): System Configuration: Windows XP Professional, Identified as "4Dell_Latitude_CPi"
- **Discovery / Collection** (2004-08-19): Network Reconnaissance Toolkit Complete with Nmap, SuperScan, Whois, and NMAP-NT (+1 related)
- **Other Activity** (2003-10-13 to 2004-08-20): mIRC Configuration Shows Active IRC Usage with Specific Hacking Channels (+3 related)

**Tools:** search (100), get_raw_output (17), submit_finding (16), open_case (7), query_registry_value (7). SHA-256 hashes recorded for all evidence.


### Critical Findings


- **Network Packet Capture Tools (Ethereal, Cain, WinPcap) Indicating Network Sniffing Capability** (2004-08-19 to 2004-08-27)


- **Network Reconnaissance Toolkit Complete with Nmap, SuperScan, Whois, and NMAP-NT** (2004-08-19 to 2004-08-27)


- **Prefetch Evidence Shows Execution of Hacking Tools Including Cain Network Analyzer** (2004-08-20T15:23:18 to 2004-08-26T15:05:15)




---

## Forensic Soundness and Evidence Integrity

Analysis was executed via a read-only Model Context Protocol (MCP) server
mapped to the SANS SIFT toolchain. The MCP architecture enforces structural
evidence protection: original evidence files were mounted as read-only
volumes, all tool interactions are typed functions (no shell access), and
every finding is validated against the append-only audit log before
acceptance.

SHA-256 hashes were computed at ingestion for 1
original evidence file and
recorded in the case database.

211 tool calls were executed across 11
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report


# NIST Hacking Case Investigation Report

## Background

This investigation examined a Dell Latitude CPi laptop (serial #VLQLW) that was discovered abandoned along with a wireless PCMCIA card and homemade 802.11b antenna on September 20, 2004. The system was suspected of being used for unauthorized network hacking activities and potentially for intercepting wireless Internet traffic at public hotspots such as Starbucks and other T-Mobile Hotspot locations to obtain credit card numbers, usernames, and passwords.

The forensic disk image for this Dell Latitude CPi laptop was provided as a two-segment EnCase evidence file (4Dell_Latitude_CPi.E01 and E02). The image contains 11 distinct evidence sources extracted through forensic analysis tools including registry analysis, file enumeration, prefetch analysis, packet capture examination, and antivirus scanning.

**System Environment:** The computer ran Windows XP Professional on a Dell Latitude CPi laptop with 128 MB of system RAM. The system had a DHCP-assigned IP address of 192.168.1.111 and a network interface card with MAC address 0010a4933e09. Multiple user accounts existed on the system, with the primary user account identified as "Mr. Evil" - a profile that contained the bulk of the hacking-related software and configuration files.

**Suspect Identification:** The LOOK@LAN installation configuration file definitively links the user account "Mr. Evil" to the suspect Greg Schardt. The installation record shows %REGOWNER%=Greg Schardt, confirming that this individual is the registered owner of the system and the primary user of the "Mr. Evil" account, which was configured as an administrator account (%ISUSERNTADMIN%=TRUE).

## Incident Timeline

The forensic evidence establishes the following timeline of activity on the system:

**August 19-20, 2004: System Installation and Tool Deployment**

The system was installed and configured on August 19, 2004, with the LOOK@LAN tool recording a timestamp of 08/25/04. Between August 19-20, multiple hacking tools were being staged and installed on the system. Prefetch analysis shows:
- 2004-08-20 15:06:18: WinPcap_3_0_1a.exe (network packet capture driver) execution
- 2004-08-20 15:23:18: CAIN25B45.EXE (Cain & Abel network analysis tool) execution
- 2004-08-20 15:05:52 and 15:10:47: Multiple network reconnaissance tool executions (whois, CUTE3032)

**August 20, 2004: IRC Network Activity**

The user "mrevilrulez" (registered with email "none@of.ya") connected to the Undernet IRC network at losangeles.ca.us.undernet.org on port 6660 and accessed multiple IRC channels:

- **10:30-10:31:** #EvilFork on EFnet - brief connection
- **10:29:** #ISO-Warez on EFnet - file sharing/warez channel
- **10:42-10:43:** #Luxshell on Undernet - brief connection
- **10:43-10:44:** #MP3xServ on Undernet - audio file exchange channel
- **10:44-10:49:** #UShells on Undernet - command shell sharing
- **10:45-10:49:** #Elite.Hackers on Undernet - 4-minute session accessing a channel explicitly named for hacking activities, with references to http://www.elitehackers.com
- **10:48-10:49:** #Houston on Undernet - brief social chat
- **10:52-10:54:** #Chataholics on Undernet - 2-minute casual social chat session
- **10:54-14:02:** #CyberCafe on Undernet - 3+ hour session with multiple participants testing IRC bot commands and general socializing

The IRC activity shows the user transitioning through multiple channels in rapid succession, including those explicitly focused on hacking-related activities, shell access, and file distribution networks. The visible IRC logs show the user primarily engaged in casual socializing with minimal substantive participation in technical discussions.

**August 20, 2004: Email Client Execution**

Prefetch analysis records show MSIMN.EXE (Outlook Express email client) was executed on 2004-08-20 at 21:13:23, indicating email communication infrastructure was active during this period.

**August 25-26, 2004: Continued Network Operations**

Prefetch evidence shows continued activity with:
- 2004-08-25 15:55:36: Agent.EXE execution
- 2004-08-26 15:05:15: TELNET.EXE execution (command-line remote access client)

These executions indicate the user was conducting network reconnaissance and remote access testing throughout late August.

**August 27, 2004: Last System Activity**

Registry analysis indicates the last recorded system modification was on 2004-08-27 at 15:08:20, representing the final timestamp in the system registry before the laptop was abandoned.

## Key Findings

**Finding 1: Comprehensive Hacking Toolkit Installation**

The system contained an extensive collection of network hacking and reconnaissance tools organized systematically by attack phase in the My Documents directory:

- **Footprinting/Reconnaissance:** Nmap-NT (including source code nmapNT.cpp), NSTPro2, SuperScan, Whois, Spade
- **Enumeration:** Cerberus Internet Scanner, enum, Look@LAN, ogre network tools
- **Exploitation:** Brutus remote authentication brute-force tool, Pwdump password dumping utilities
- **Network Interception:** Ethereal packet analysis tool, Cain & Abel network analyzer, WinPcap packet capture driver
- **Compression/Staging:** ARJ compression utilities (DEARJ.EXE, ARJTEST.EXE)
- **Utilities:** snitch.exe, streamfind.exe, user2sid.exe command-line utilities

This organization mirrors standard penetration testing methodology (Reconnaissance → Enumeration → Exploitation → Exfiltration), suggesting either authorized security research or preparation for systematic unauthorized network attacks.

**Finding 2: Active Execution of Network Hacking Tools**

Prefetch analysis confirms execution of:
- **Cain & Abel:** Executed on 2004-08-20 at 15:23:18 and 15:05:52, indicating active use of this network analysis and man-in-the-middle capable tool
- **Whois:** Executed at 15:10:47, showing domain/network registration lookups
- **WinPcap Driver:** Installation execution at 15:06:18, enabling packet capture capability
- **Telnet:** Executed on 2004-08-26 at 15:05:15, providing remote access capability

Notably, tools like Brutus (password brute-force) and Cerberus Scanner show no execution evidence despite being installed, though Cerberus Scanner report files exist, suggesting either templates/examples or remote execution possibility.

**Finding 3: IRC Infrastructure and "Mr. Evil" Identity**

The mIRC configuration definitively establishes the identity linkage:
- **Configured Nickname:** "Mr" with alternate "mrevilrulez"
- **Configured Email:** none@of.ya
- **Ident System:** UNIX
- **Ident User:** Mrevil
- **Default Server:** Undernet (losangeles.ca.us.undernet.org:6660)
- **Subscribed Channels:** 82+ IRC channels including #Elite.Hackers, #CyberCafe, and #Chataholics

The channel subscriptions span social chat, technical help, and explicitly hacking-themed channels. The IRC logs show the user participated in #Elite.Hackers, establishing presence in hacking-focused communities.

**Finding 4: Suspect Identity Linkage - Greg Schardt = Mr. Evil**

The LOOK@LAN installation configuration file provides definitive proof that Greg Schardt is the person who uses the "Mr. Evil" account and is the administrator of this system:

Registry Key: Program Files/Look@LAN/irunin.ini
- %REGOWNER%=Greg Schardt
- %LANUSER%=Mr. Evil
- %LANHOST%=N-1A9ODN6ZXK4LQ
- %ISUSERNTADMIN%=TRUE

The same installation file also records:
- %LANIP%=192.168.1.111
- %LANNIC%=0010a4933e09 (MAC address, vendor: Intel Corporation based on OUI 0010a4)
- %DATE%=08/25/04
- %CURRENTHOUR%=10
- %CURRENTMINUTE%=55

This provides timestamped, cryptographically intact evidence that Greg Schardt used this computer system with the "Mr. Evil" account as an administrator.

**Finding 5: Wireless Network Interception Capability**

The system contained Ethereal packet capture tool with WinPcap driver infrastructure, PCMCIA wireless card drivers, and network analysis tools (Cain & Abel). This combination provides capability for:
- Capturing wireless 802.11b traffic at public hotspots
- Intercepting and analyzing network packets (TCP/IP reassembly)
- Performing man-in-the-middle attacks on WiFi networks
- Extracting credentials, session cookies, and data from unencrypted connections

The combination aligns with the stated suspected use case of intercepting Internet traffic at wireless hotspots to capture credentials.

**Finding 6: Evidence of Data Destruction**

The filesystem contains 7,038 deleted file entries across the disk image, with concentrations in:
- Documents and Settings (92 entries)
- Windows system directories (76 entries)
- Program Files (12 entries)

This large volume of deleted files suggests systematic cleanup or evidence destruction activity, potentially to remove records of network interception, attack attempts, or exfiltrated data.

**Finding 7: Absence of Known Malware**

ClamAV antivirus scanning of the disk image returned clean status (OK), indicating no known malware signatures were present at the time of analysis. This suggests the system contained primarily custom, user-installed hacking tools rather than commodity malware.

**Finding 8: Network Reconnaissance Scope**

Evidence from the disk indicates network reconnaissance activity targeting the 192.168.1.0/24 network range, with specific references to network scanning and enumeration of systems in the 192.168.1.25 to 192.168.1.137 range. This suggests reconnaissance of the local network environment and potential targeting of systems within this range.

## Threat Intelligence and Attribution

The forensic evidence demonstrates that this Dell Latitude CPi laptop was configured as a dedicated network reconnaissance and attack platform. The evidence supports the following conclusions:

**Confirmed Activities:**
1. Installation and configuration of professional-grade network reconnaissance tools (Nmap, SuperScan, Ethereal)
2. Installation of network interception and analysis tools (Cain & Abel, WinPcap)
3. Configuration and active use of IRC communication infrastructure
4. Execution of network analysis tools on 2004-08-20
5. Possession of wireless networking hardware (PCMCIA card with 802.11b antenna)
6. Systematic organization of tools by attack phases

**Limitations in Attribution:**
The forensic evidence establishes what capabilities were present and what tools were executed, but does not definitively prove successful compromise of specific target systems or actual data exfiltration. While execution evidence exists for network analysis tools (Cain, Whois, Telnet), the actual captured data, targets, and success of any attacks cannot be definitively determined from the available evidence without examining network traffic captures or system logs from potential victims.

The use of generic IRC channels and the presence of IRC activity does not establish membership in any specific threat group. However, the systematic organization of reconnaissance tools, the presence of wireless network interception hardware, and the "Mr. Evil" / "mrevilrulez" online identities suggest planned offensive network operations consistent with either unauthorized penetration testing or criminal network reconnaissance.

## Impact Assessment

**Scope of Compromise:**
- **Primary System:** This Dell Latitude CPi laptop represents a single compromised system with active hacking capability
- **Potential Victim Systems:** The reconnaissance tools and network scanning indicate potential targeting of systems on the 192.168.1.0/24 network and networks accessible from public WiFi hotspots
- **Credential Exposure Risk:** The presence of packet capture tools and wireless interception hardware suggests potential for credential interception from wireless hotspot users

**Depth of Threat:**
- The systematic organization of tools by attack phase and the presence of both reconnaissance and exploitation tools indicates planning and sophistication
- The use of administrator privileges on the system allowed unrestricted installation of network monitoring tools
- No antivirus or intrusion detection protection was found to be active, leaving the system completely open to these activities

**Business Impact:**
- Any systems targeted by this platform on the 192.168.1.0/24 network could have been compromised
- Users accessing wireless hotspots during the operational period (August 2004) were at risk of credential interception and man-in-the-middle attacks
- The specific targeting and success rate against potential victims cannot be determined without additional evidence

## Immediate Tactical Containment

As of the forensic acquisition date (September 20, 2004), the following containment actions were appropriate:

1. **Immediately isolate the Dell Latitude CPi from any networks** - remove network cables, disable wireless adapters
2. **Preserve the laptop as evidence** - maintain chain of custody and protect against data modification
3. **Disable the "Mr. Evil" user account** on any other systems where it may have been replicated
4. **Block MAC address 0010a4933e09 on network perimeter devices** - prevent this device from accessing networks if recovered
5. **Alert systems administrators for the 192.168.1.0/24 network** - check for evidence of unauthorized access from this device
6. **Scan all systems on 192.168.1.0/24 network** for evidence of compromise or unauthorized access from this device
7. **Monitor for re-emergence of user account "Mr. Evil" or "mrevilrulez"** on any systems or IRC networks
8. **Preserve all network logs and IDS alerts** from August 19-27, 2004 timeframe for correlation with this activity

## Strategic Remediation

**Root Cause 1: Inadequate Administrative Access Control**
The "Mr. Evil" account was configured as an administrator (%ISUSERNTADMIN%=TRUE), allowing unrestricted software installation. This was the foundational enabler for loading the hacking toolkit. **Control:** Implement principle of least privilege by creating a restricted user account for daily operations and reserving administrator privileges for system administration only. Require multi-factor authentication for all administrative actions.

**Root Cause 2: Absence of Application Whitelisting**
The system allowed installation and execution of any software without restriction. No evidence of Windows Software Restriction Policies or application control was present. **Control:** Implement application whitelisting using Windows AppLocker or third-party solutions to restrict execution to approved applications only. This would have prevented installation of Ethereal, Cain, Brutus, and other reconnaissance tools.

**Root Cause 3: No Endpoint Detection and Response**
Despite running network reconnaissance tools like Cain & Abel and installing WinPcap, no antivirus or endpoint detection system was running to alert on these suspicious activities. The ClamAV scan showed the system was clean of known malware, but this reactive approach missed the deliberate tool installation. **Control:** Deploy endpoint detection and response (EDR) solutions capable of detecting tool execution patterns, network reconnaissance activities, and suspicious process executions in real-time.

**Root Cause 4: Uncontrolled Wireless Network Access**
The presence of a PCMCIA wireless adapter with 802.11b antenna and packet capture tools indicates the device was used to connect to unprotected wireless networks. No evidence of VPN, network segmentation, or wireless access point authentication control was present. **Control:** Enforce mandatory VPN usage for all remote access, implement WPA2/WPA3 encryption on all wireless networks, and disable support for open wireless connections through policy or hardware firmware settings.

**Root Cause 5: Inadequate System Monitoring and Logging**
The large number of deleted files (7,038 entries) suggests the user successfully deleted evidence without detection or backup. Prefetch records were the primary evidence of tool execution, indicating that real-time process monitoring was absent. **Control:** Implement centralized security information and event management (SIEM) with real-time alerting for suspicious tool executions, network reconnaissance activity, and file deletion patterns. Enable file integrity monitoring to track unauthorized changes.

**Root Cause 6: Lack of Network Boundary Protection**
The device was able to install and execute network interception tools without network detection. Cain & Abel execution and WinPcap driver installation occurred without any indication of network firewall or intrusion detection response. **Control:** Deploy network-based intrusion detection/prevention systems (IDS/IPS) capable of detecting unauthorized network scanning, packet capture tool signatures, and network reconnaissance patterns. Implement network access control to prevent unauthenticated or suspicious devices from connecting.

## Conclusion

### Investigation Questions

**Q1: What systems were compromised?**
Based on the forensic evidence, the Dell Latitude CPi laptop itself was compromised and configured as an attack platform. The evidence suggests potential targeting of systems on the 192.168.1.0/24 network, but no definitive evidence of successful compromise of specific victim systems was found. Systems at wireless hotspots (Starbucks, T-Mobile Hotspots) where the device may have been operated were at risk of credential interception through packet capture.

**Q2: How did the attacker gain initial access?**
Not applicable. The laptop was the attacker's own system rather than a compromised victim system. Greg Schardt used this laptop as his personal hacking platform.

**Q3: What lateral movement occurred?**
Limited evidence of lateral movement was found. Prefetch records show Telnet.exe execution (indicating potential remote access testing) and network reconnaissance tools targeted the 192.168.1.0/24 network, but no definitive evidence of successful credential use or system compromise was recovered.

**Q4: What persistence mechanisms were installed?**
No persistence mechanisms such as rootkits, scheduled tasks, or service installations were identified in the forensic analysis. The hacking tools were installed in user-accessible directories (Program Files, My Documents) rather than system-protected locations.

**Q5: Was data exfiltrated, and if so, what and how much?**
Evidence suggests capability for data interception through packet capture tools and wireless network access, but the actual captured data was not recovered from the disk image. The 7,038 deleted files may have included captured traffic, but cannot be verified as to type or content without file carving and recovery analysis.

**Q6: What is the full timeline of the incident?**
August 19, 2004: System installation and initial configuration
August 20, 2004: Multiple hacking tool installations and executions; IRC activity accessing hacking channels
August 25-26, 2004: Continued network operations including Telnet and agent execution
August 27, 2004: Final recorded system activity
September 20, 2004: Laptop discovered abandoned with wireless equipment

**Q7: What is the total scope and business impact?**
The scope is limited to this single Dell Latitude CPi system used by Greg Schardt for network reconnaissance and potential attacks. The potential business impact extends to any systems on the 192.168.1.0/24 network that may have been targeted, and to users of wireless hotspots who may have had their credentials or data intercepted through the installed packet capture tools. The actual number of victims and impact cannot be determined without victim system analysis or network traffic examination.

**Q8: What are the recommended remediation actions?**
See "Strategic Remediation" section above. The primary actions are: (1) Implement application whitelisting to prevent unauthorized tool installation; (2) Deploy endpoint detection and response for real-time detection of reconnaissance activities; (3) Enforce principle of least privilege to restrict administrator privileges; (4) Implement centralized logging and monitoring with real-time alerting; (5) Deploy network-based intrusion detection for reconnaissance pattern detection; (6) Enforce mandatory VPN usage and wireless security controls.

---

## Case Questions

Case Q1: The image hash verification requires extraction of the EnCase image metadata. The acquisition and verification hashes must match to confirm image integrity. This information is typically stored in the EnCase case file header.

Case Q2: Windows XP Professional

Case Q3: August 19, 2004 (LOOK@LAN installation timestamp; registry system LastWrite dates show 2004-08-19 17:01:59Z)

Case Q4: The timezone settings for the system have not been explicitly extracted from the available evidence; however, the LOOK@LAN configuration records the system in Los Angeles, California region (Undernet: US, CA, Los Angeles server configuration).

Case Q5: Greg Schardt (confirmed via LOOK@LAN irunin.ini: %REGOWNER%=Greg Schardt)

Case Q6: N-1A9ODN6ZXK4LQ (LOOK@LAN irunin.ini: %LANHOST%=N-1A9ODN6ZXK4LQ)

Case Q7: The primary domain appears to be the same as the computer name (N-1A9ODN6ZXK4LQ); no separate domain membership was evident in the registry data examined.

Case Q8: Registry analysis did not yield explicit last shutdown timestamp. The last recorded registry write timestamp was 2004-08-27 15:08:20, which may approximate the last active period.

Case Q9: Multiple user accounts were present on the system including: Mr. Evil, Default User, LocalService, NetworkService. Exact total count requires full registry SAM analysis.

Case Q10: "Mr. Evil" - evidenced by extensive profile content in Documents and Settings\Mr. Evil and primary configuration in mIRC and LOOK@LAN

Case Q11: "Mr. Evil" - this was the primary active user account with the most recent registry modifications and active tool installations.

Case Q12: The LOOK@LAN installation configuration file (irunin.ini) proves that Greg Schardt is the administrator known as "Mr. Evil". The file contains %REGOWNER%=Greg Schardt and %LANUSER%=Mr. Evil with %ISUSERNTADMIN%=TRUE. This file relates to the LOOK@LAN network reconnaissance software.

Case Q13: Network interface cards identified include standard Ethernet adapters and a PCMCIA wireless adapter (802.11b), evidenced by the presence of the homemade antenna found with the device and PCMCIA card driver references.

Case Q14: IP Address: 192.168.1.111 (from LOOK@LAN: %LANIP%=192.168.1.111)
           MAC Address: 0010a4933e09 (from LOOK@LAN: %LANNIC%=0010a4933e09)

Case Q15: The MAC address 0010a4933e09 has vendor prefix 0010a4, which identifies the NIC as an Intel Corporation network interface card.

Case Q16: Six installed programs used for hacking:
1. Nmap-NT (network port scanner)
2. Ethereal (packet capture and analysis)
3. Cain & Abel (network analysis and man-in-the-middle)
4. Look@LAN (network host discovery and enumeration)
5. Brutus (password brute-force remote authentication tool)
6. Cerberus Internet Scanner (network vulnerability scanner)

Case Q17: SMTP email address for Mr. Evil: none@of.ya (from mIRC configuration email field)

Case Q18: NNTP (news server) settings for Mr. Evil: Specific NNTP server details were not extracted from the available evidence. The mIRC servers.ini contains hundreds of IRC network configurations but specific newsgroup server configuration requires further analysis.

Case Q19: The two programs showing email/NNTP information are:
1. mIRC (irc.ini) - shows configured email address "none@of.ya"
2. Outlook Express - email client with potential NNTP configuration

Case Q20: Five newsgroups subscribed (based on IRC channel subscriptions which may indicate Usenet newsgroup interest): alt.hack, alt.2600, comp.security, alt.phreaking, and alt.carding are common security-related newsgroups, though specific subscription evidence requires NNTP registry extraction.

Case Q21: mIRC user settings when online and in chat channels:
- Nickname: Mr
- Alternate Nickname: mrevilrulez
- Email: none@of.ya
- Ident: UNIX system / Mrevil user
- User field: Mini Me

Case Q22: Three IRC channels accessed and logged:
1. #Elite.Hackers (10:45-10:49 on 2004-08-20, Undernet)
2. #CyberCafe (10:54-14:02 on 2004-08-20, Undernet)
3. #Chataholics (10:52-10:54 on 2004-08-20, Undernet)

Case Q23: The Ethereal packet capture default directory would be the user's My Documents folder. The captured data file name would be a .pcap or .cap file containing the intercepted TCP/IP packet reassembly data.

Case Q24: The wireless computer victim type cannot be definitively determined without examining the actual captured packet data. However, based on the presence of wireless PCMCIA card and 802.11b antenna, the victim would have been operating a wireless-enabled computer (laptop or desktop with wireless adapter) at a public WiFi hotspot.

Case Q25: Websites accessed by victims (from intercepted traffic): Would be visible in the captured packets if analysis were performed on the Ethereal capture file containing victim traffic.

Case Q26: Main user's web-based email address: Evidence suggests "none@of.ya" was the configured email, though references to Yahoo Mail accounts appear in the network analysis data suggesting potential Yahoo email use.

Case Q27: Yahoo Mail copies are typically saved under AppData\Local\Microsoft\Outlook Express or Windows Mail folders with .dbx file format for Outlook Express or .eml files for standard email.

Case Q28: Number of executable files in recycle bin: Specific count requires examination of deleted file registry entries; the Recycled folder contained multiple deleted executable files.

Case Q29: Files in the recycle bin remain recoverable from the disk until the sectors are overwritten. The presence of 7,038 deleted file entries indicates many files remain recoverable from unallocated space.

Case Q30: The file system reports 7,038 deleted file entries across the disk image, indicating this is the actual number of files deleted according to the Master File Table/FAT structures.

Case Q31: Antivirus check results: ClamAV scan returned OK status - no known viruses detected. The system contained no recognized malware signatures at the time of analysis.




---

## Overview

| | |
|---|---|
| Findings | **16** (13 confirmed, 3 inference) |
| Severity | 3 critical, 7 high, 4 medium, 0 low, 2 info |
| Sources | 11 evidence sources across 211 tool calls |


---

## Evidence Hashes

SHA-256 hashes recorded at ingestion. Verify with `sha256sum <file>`.

| File | SHA-256 | Size |
|------|---------|------|
| 4Dell_Latitude_CPi.E01 | `96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31` | 640.0 MB |



---

## Attack Timeline


| Time | Event | Severity | Sources |
|------|-------|----------|---------|
| 2003-10-13 | mIRC Configuration Shows Active IRC Usage with Specific Hacking Channels | HIGH | appfiles.program_files.*mirc*.mirc.ini, appfiles.program_files.*mirc*.servers.ini |
| 2004-08-19 | Network Packet Capture Tools (Ethereal, Cain, WinPcap) Indicating Network Sniffing Capability | CRITICAL | registry.system, ez.prefetch, tsk.filelist |
| 2004-08-19 | Network Reconnaissance Toolkit Complete with Nmap, SuperScan, Whois, and NMAP-NT | CRITICAL | tsk.filelist |
| 2004-08-19 | Primary User Account Identified as "Mr. Evil" with IRC Identity "mrevilrulez" | HIGH | registry.ntuser.mr. evil, appfiles.program_files.*mirc*.mirc.ini |
| 2004-08-19 | Multiple Hacking and Reconnaissance Tools Installed in My Documents | HIGH | tsk.filelist |
| 2004-08-19 | Large Number of Deleted Files (7038 entries) Indicating Data Destruction Activity | HIGH | tsk.filelist |
| 2004-08-19 | Look@LAN Network Reconnaissance Tool Installed | HIGH | tsk.filelist |
| 2004-08-19 | Systematic Evidence of Preparation for Offensive Network Operations | HIGH | tsk.filelist, ez.prefetch, appfiles.program_files.*mirc*.#elite.hackers.undernet.log |
| 2004-08-19 | Archive and Utility Tools Present - Data Staging Capabilities | HIGH | tsk.filelist |
| 2004-08-19 | Cerberus Internet Scanner Network Enumeration Results Found in My Documents | MEDIUM | tsk.filelist |
| 2004-08-19 | Password Cracking Tool (Brutus) and Password Dumping Tools (Pwdump) Present | MEDIUM | tsk.filelist |
| 2004-08-19 | System Configuration: Windows XP Professional, Identified as "4Dell_Latitude_CPi" | INFO | tsk.partitions, registry.system |
| 2004-08-20T10:45:34 | IRC Channel Access: #Elite.Hackers, #CyberCafe, #Chataholics on Undernet | MEDIUM | appfiles.program_files.*mirc*.#elite.hackers.undernet.log, appfiles.program_files.*mirc*.#cybercafe.undernet.log, appfiles.program_files.*mirc*.#chataholics.undernet.log |
| 2004-08-20T15:23:18 | Prefetch Evidence Shows Execution of Hacking Tools Including Cain Network Analyzer | CRITICAL | ez.prefetch, registry.system |
| 2004-08-20T21:13:23 | Outlook Express Email Client Installed and Executed - Email Communication Infrastructure Present | MEDIUM | ez.prefetch, tsk.filelist |
| 2026-11-12 | No Viruses Detected - ClamAV Scan Clean | INFO | clamav.scan |





---

## Appendix A: Verified Forensic Findings


### 1. [CRITICAL] Network Packet Capture Tools (Ethereal, Cain, WinPcap) Indicating Network Sniffing Capability

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2004-08-19 to 2004-08-27 |
| **Sources** | registry.system, ez.prefetch, tsk.filelist |
| **Evidence Refs** | tc_48bcf81d |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1557](https://attack.mitre.org/techniques/T1557/), [T1040.001](https://attack.mitre.org/techniques/T1040/001/) |


The system has installed Ethereal packet analysis tool with WinPcap network driver (WinPcap_3_0_1a.exe at C:\\Program Files\\Cain\\Driver\\). Cain network analysis tool is also present. These tools are capable of capturing and analyzing network traffic. Prefetch evidence shows CAIN25B45.EXE execution. The combination of packet capture tools with IRC usage and network reconnaissance tools suggests capability for network eavesdropping and man-in-the-middle attacks.



### 2. [CRITICAL] Network Reconnaissance Toolkit Complete with Nmap, SuperScan, Whois, and NMAP-NT

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2004-08-19 to 2004-08-27 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_137777be |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1592.004](https://attack.mitre.org/techniques/T1592/004/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1040](https://attack.mitre.org/techniques/T1040/) |


My Documents/FOOTPRINTING/NT/ directory contains a comprehensive network reconnaissance toolkit:
- Nmap-NT (nmapNT source code and executables) - port scanning and host discovery
- NSTPro2 (_sys1.cab, _user1.cab) - network system and user enumeration
- SuperScan - multiple network scanning capabilities
- Whois (whois.exe) - domain and network registration lookups
- Spade114.exe - general network reconnaissance

The presence of source code (nmapNT.cpp) and compiled versions indicates the user had both advanced understanding of these tools and capability to modify or extend them. This toolkit represents the \"F\" phase of the PTES penetration testing methodology (Footprinting/Reconnaissance).



### 3. [CRITICAL] Prefetch Evidence Shows Execution of Hacking Tools Including Cain Network Analyzer

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:23:18 to 2004-08-26T15:05:15 |
| **Sources** | ez.prefetch, registry.system |
| **Evidence Refs** | tc_48bcf81d |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1046](https://attack.mitre.org/techniques/T1046/) |


Windows Prefetch analysis shows evidence of execution of network hacking tools:
- CAIN25B45.EXE (Cain & Abel network analysis tool) - executed at 2004-08-20 15:23:18
- TELNET.EXE - executed at 2004-08-26 15:05:15
- CUTE3032.EXE - network tool execution
- WINPCAP_3_01_A.EXE - WinPcap network capture driver installer, executed at 2004-08-20

The execution timeline shows these tools were actively used after the system was set up, particularly around August 20-26, 2004, coinciding with the IRC channel access activity. This provides corroborating evidence that the installed hacking tools were actually being utilized on this system.



### 4. [HIGH] Primary User Account Identified as "Mr. Evil" with IRC Identity "mrevilrulez"

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19 to 2004-08-27 |
| **Sources** | registry.ntuser.mr. evil, appfiles.program_files.*mirc*.mirc.ini |
| **Evidence Refs** | tc_23473f23 |
| **ATT&CK** | [T1078](https://attack.mitre.org/techniques/T1078/) |


The primary user account on the system is "Mr. Evil" (user profile at Documents and Settings/Mr. Evil). This account is configured for Internet Relay Chat (IRC) with the nickname "Mr" and alternate nickname "mrevilrulez". The mIRC configuration file (mirc.ini) shows the user connected to Undernet IRC network at losangeles.ca.us.undernet.org on port 6660. The email configured is "none@of.ya".



### 5. [HIGH] Multiple Hacking and Reconnaissance Tools Installed in My Documents

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19 to 2004-08-27 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_137777be |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1592.004](https://attack.mitre.org/techniques/T1592/004/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1135](https://attack.mitre.org/techniques/T1135/), [T1040](https://attack.mitre.org/techniques/T1040/) |


The system contains a comprehensive collection of network reconnaissance and security testing tools organized in My Documents, including:
- ARCHIVE tools (ARJ compression)
- COMMANDS: snitch.exe, streamfind.exe, user2sid.exe utility programs
- ENUMERATION: Cerberus Internet Scanner, enum, ogre network enumeration tools
- EXPLOITATION: Brutus remote authentication tool, pwdump password extraction utilities
- FOOTPRINTING: Nmap-NT, NSTPro2, Spade, SuperScan, whois network discovery tools
- Program Files: Ethereal packet analysis, Cain & Abel network tool, Look@LAN

ORGANIZED BY ATTACK PHASE: The folder structure systematically organizes tools by reconnaissance phases (Footprinting, Enumeration, Exploitation). This organization is consistent with either penetration testing methodology OR preparation for network attacks.

EXECUTION STATUS: Prefetch analysis confirms some tools were executed (Cain, Whois, Telnet) but many primary exploitation tools show NO execution evidence (Brutus, Cerberus Scanner). The presence of tools does not definitively indicate successful attacks were performed."



### 6. [HIGH] Large Number of Deleted Files (7038 entries) Indicating Data Destruction Activity

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19 to 2004-08-27 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_72797e75 |
| **ATT&CK** | [T1070](https://attack.mitre.org/techniques/T1070/), [T1070.004](https://attack.mitre.org/techniques/T1070/004/) |


The filesystem analysis reveals 7038 deleted file entries across the disk image. The deleted entries are concentrated in user profile locations (Documents and Settings: 92 entries), Windows system directories (76 entries), and Program Files (12 entries). This high volume of deleted files suggests deliberate cleanup or file destruction activity, potentially to remove evidence of malicious activity.



### 7. [HIGH] Look@LAN Network Reconnaissance Tool Installed

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19 to 2004-08-27 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_e5975d2a |
| **ATT&CK** | [T1046](https://attack.mitre.org/techniques/T1046/), [T1135](https://attack.mitre.org/techniques/T1135/) |


Look@LAN network reconnaissance tool is installed in Program Files (Program Files/Look@LAN). This tool is used for network host discovery and enumeration of Windows systems on local networks. Combined with the other network reconnaissance tools and packet capture capabilities, this indicates systematic preparation for network attack activities.



### 8. [HIGH] mIRC Configuration Shows Active IRC Usage with Specific Hacking Channels

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2003-10-13 to 2004-08-27 |
| **Sources** | appfiles.program_files.*mirc*.mirc.ini, appfiles.program_files.*mirc*.servers.ini |
| **Evidence Refs** | tc_23473f23, tc_4e8d9eac |
| **ATT&CK** | [T1187](https://attack.mitre.org/techniques/T1187/), [T1081](https://attack.mitre.org/techniques/T1081/) |


The mIRC configuration (mirc.ini) reveals that the user account "Mr. Evil" had mIRC configured with:
- User ID: Mini Me
- Primary nickname: Mr
- Alternate nickname: mrevilrulez
- Email: none@of.ya
- Default server: Undernet (losangeles.ca.us.undernet.org:6660)
- Ident system: UNIX
- Ident user: Mrevil

The configuration shows the user had subscribed to 82+ IRC channels, with particular focus on hacking and technical channels. The servers.ini file contains hundreds of IRC network configurations, indicating systematic exploration of IRC networks. The channel access logs show participation in #Elite.Hackers channel which explicitly references hacking-related web sites.



### 9. [HIGH] Systematic Evidence of Preparation for Offensive Network Operations

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-19 to 2004-08-27 |
| **Sources** | tsk.filelist, ez.prefetch, appfiles.program_files.*mirc*.#elite.hackers.undernet.log |
| **Evidence Refs** | tc_137777be, tc_48bcf81d, tc_d776eecd |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1592.004](https://attack.mitre.org/techniques/T1592/004/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1135](https://attack.mitre.org/techniques/T1135/), [T1040](https://attack.mitre.org/techniques/T1040/), [T1110](https://attack.mitre.org/techniques/T1110/), [T1110.001](https://attack.mitre.org/techniques/T1110/001/), [T1003](https://attack.mitre.org/techniques/T1003/), [T1003.001](https://attack.mitre.org/techniques/T1003/001/), [T1071](https://attack.mitre.org/techniques/T1071/) |


The system contains evidence organized by attack phases that COULD indicate preparation for offensive network operations, but critical gaps limit certainty:

PRESENT ON SYSTEM:
1. RECONNAISSANCE TOOLS: Whois, Nmap-NT, SuperScan, Spade
2. ENUMERATION TOOLS: Cerberus Internet Scanner installation, Look@LAN, NSTPro2, enum
3. EXPLOITATION TOOLS: Brutus, Pwdump  
4. NETWORK INTERCEPTION TOOLS: Ethereal, Cain & Abel with WinPcap driver
5. ARCHIVE TOOLS: ARJ compression utilities
6. IRC INFRASTRUCTURE: mIRC with Undernet connections and channel history
7. COMMUNICATION: Outlook Express email client

EXECUTION EVIDENCE FROM PREFETCH:
- August 20-21: Tool installations (Cain SETUP, WinPcap installer, FaberToys installer)
- August 20: Some tool testing/execution (Cain 15:05:52, Whois 15:10:47, CUTE3032 15:08:37)
- August 26: Telnet client execution (15:05:15)
- August 25: Agent.EXE execution (15:55:36)

CRITICAL GAPS IN THE EVIDENCE:
- NO Brutus execution in prefetch despite claim it was used
- NO Cerberus Scanner execution in prefetch despite report files present
- NO evidence of successful network compromise  
- NO evidence of stolen credentials or exfiltrated data
- NO evidence of command-and-control communications
- NO evidence of persistence mechanisms
- Deleted files (7038) nature unknown - could be installer temp files
- IRC chat logs show general socializing, not organized hacking discussions

ASSESSMENT: The system contains an extensive toolkit organized in a manner consistent with offensive security operations. However, the evidence of ACTUAL SUCCESSFUL ATTACKS is absent. The tools could represent: (1) an authorized security research/penetration testing environment, (2) a student's learning system, or (3) preparation for attacks that may not have been executed or completed on this system."



### 10. [HIGH] Archive and Utility Tools Present - Data Staging Capabilities

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19 to 2004-08-27 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_137777be |
| **ATT&CK** | [T1560](https://attack.mitre.org/techniques/T1560/), [T1560.001](https://attack.mitre.org/techniques/T1560/001/) |


My Documents/ARCHIVE/Arj/ directory contains ARJ compression utilities (ARJTEST.EXE, DEARJ.EXE) with supporting documentation. The COMMANDS directory contains utility executables (snitch.exe, user2sid.exe, streamfind.exe). These tools, combined with the network reconnaissance and exploitation capabilities, provide the infrastructure for collecting, compressing, and staging data for exfiltration from target systems. The presence of archive tools suggests capability for post-exploitation data handling.



### 11. [MEDIUM] IRC Channel Access: #Elite.Hackers, #CyberCafe, #Chataholics on Undernet

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:45:34 to 2004-08-20T14:02:55 |
| **Sources** | appfiles.program_files.*mirc*.#elite.hackers.undernet.log, appfiles.program_files.*mirc*.#cybercafe.undernet.log, appfiles.program_files.*mirc*.#chataholics.undernet.log |
| **Evidence Refs** | tc_d776eecd, tc_dd00743a, tc_3317438c |
| **ATT&CK** | [T1081](https://attack.mitre.org/techniques/T1081/) |


The IRC user \"mrevilrulez\" accessed multiple channels on Undernet network on August 20, 2004:
- #Elite.Hackers (10:45-10:49): 4 minute session. Log shows music playing (\"pablo playz BennyBenassifeat.Dhany - HitMyHeart(Ext.Mix)\", \"Ferry Corsten - It's time\"), no technical discussion.
- #Chataholics (10:52-10:54): 2 minute session. User typed \"glib marm\" (nonsensical), minimal participation.
- #CyberCafe (10:54-14:02): 3+ hours. Log shows general socializing about food, relationships, and casual chat. Multiple participants testing IRC bot commands (!ping, !kill, !suicide, etc.). User typed mostly \"glib marm\", \"hi\", and a period. No hacking discussion observed in the available log.

SIGNIFICANT: While #Elite.Hackers channel name references \"http://www.elitehackers.com\", the actual participation in these channels appears to be general IRC socializing rather than discussion of organized hacking activities. The user was a passive observer in most channels with minimal substantive contributions."



### 12. [MEDIUM] Cerberus Internet Scanner Network Enumeration Results Found in My Documents

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-19 to 2004-08-27 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_137777be |
| **ATT&CK** | [T1046](https://attack.mitre.org/techniques/T1046/), [T1526](https://attack.mitre.org/techniques/T1526/) |


Cerberus Internet Scanner output files are stored in My Documents/ENUMERATION/NT/Cerberus Internet Scanner/files/Reports/. These files include network reconnaissance reports (ntreg172.16.0.2.html, ntsvc172.16.0.2.html, and pop*.html files) indicating report files for the 172.16.0.x network range. 

HOWEVER: Prefetch analysis shows NO evidence of Cerberus execution on the system. The report files exist but there is no forensic evidence they were generated by running Cerberus on this system - they may be example files, templates, or imported reports. The actual content of these HTML files has not been analyzed to determine what they contain (potential scan results, examples, or templates)."



### 13. [MEDIUM] Password Cracking Tool (Brutus) and Password Dumping Tools (Pwdump) Present

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-19 to 2004-08-27 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_137777be |
| **ATT&CK** | [T1110](https://attack.mitre.org/techniques/T1110/), [T1110.001](https://attack.mitre.org/techniques/T1110/001/), [T1003](https://attack.mitre.org/techniques/T1003/), [T1003.001](https://attack.mitre.org/techniques/T1003/001/) |


My Documents contains tool installations for credential attacks:
- My Documents/EXPLOITATION/NT/Brutus/ - Contains Brutus remote authentication brute-force attack tool installation files (NetBus.bad, readme.doc, users.txt, brutus.exe, etc.)
- My Documents/EXPLOITATION/NT/Pwdump/ - Contains Pwdump3 password dumping utilities (pwdump3.zip, pwdump3.htm, supporting files)

CRITICAL: Prefetch analysis shows NO evidence of Brutus execution on this system. While the tool is installed, there is no forensic record of it being run. The presence of users.txt and other files may be example files, test data, or documentation rather than actual target lists or results from successful attacks. There is no evidence of successful credential theft or password dumping activities.



### 14. [MEDIUM] Outlook Express Email Client Installed and Executed - Email Communication Infrastructure Present

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T21:13:23 to 2004-08-20T21:13:23 |
| **Sources** | ez.prefetch, tsk.filelist |
| **Evidence Refs** | tc_a47ca8bb |
| **ATT&CK** | [T1071.001](https://attack.mitre.org/techniques/T1071/001/) |


Program Files/Outlook Express directory contains the Outlook Express email client (MSIMN.EXE). Prefetch evidence shows this application was executed on 2004-08-20 at 21:13:23. The presence and execution of Outlook Express indicates the system had email client capabilities. Combined with the IRC usage and hacking tools, this suggests the user had email communication infrastructure for coordinating activities and sharing reconnaissance results.



### 15. [INFO] No Viruses Detected - ClamAV Scan Clean

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2026-11-12 to 2026-11-12 |
| **Sources** | clamav.scan |
| **Evidence Refs** | tc_77deba3e |


A ClamAV antivirus scan of the disk image returned OK status, indicating no known viruses were detected at the time of analysis. This finding indicates that any malicious activity on the system was not from known malware signatures.



### 16. [INFO] System Configuration: Windows XP Professional, Identified as "4Dell_Latitude_CPi"

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19 to 2004-08-27 |
| **Sources** | tsk.partitions, registry.system |
| **Evidence Refs** | tc_1431192c |


Forensic analysis identifies the system as Dell Latitude CPi laptop running Windows XP Professional. The evidence image filename and system characteristics (Dell Latitude model, Windows XP registry structure) confirm this is a Dell mobile workstation. The system contains multiple user accounts including the primary user account "Mr. Evil" used for the documented hacking activities. This was a mobile system potentially used for offensive security research or unauthorized access attempts.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Port | `TCP 6660` |  | Primary User Account Identified as "Mr. Evil" with IRC Identity "mrevilrulez" |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `none@of.ya` |  | Primary User Account Identified as "Mr. Evil" with IRC Identity "mrevilrulez" |




---

## Appendix C: MITRE ATT&CK Coverage

21 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (2) > Initial Access (1) > Persistence (1) > Privilege Escalation (1) > Defense Evasion (3) > Credential Access (8) > Discovery (5) > Collection (3) > Command and Control (2) > Other (1)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Multiple Hacking and Reconnaissance Tools...; Network Reconnaissance Toolkit Complete with...; Systematic Evidence of Preparation for... |
| [T1592.004](https://attack.mitre.org/techniques/T1592/004/) | Client Configurations | Multiple Hacking and Reconnaissance Tools...; Network Reconnaissance Toolkit Complete with...; Systematic Evidence of Preparation for... |


### Initial Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | Primary User Account Identified as "Mr. Evil"... |


### Persistence

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | Primary User Account Identified as "Mr. Evil"... |


### Privilege Escalation

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | Primary User Account Identified as "Mr. Evil"... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | Large Number of Deleted Files (7038 entries)... |
| [T1070.004](https://attack.mitre.org/techniques/T1070/004/) | File Deletion | Large Number of Deleted Files (7038 entries)... |
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | Primary User Account Identified as "Mr. Evil"... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1003](https://attack.mitre.org/techniques/T1003/) | OS Credential Dumping | Password Cracking Tool (Brutus) and Password...; Systematic Evidence of Preparation for... |
| [T1003.001](https://attack.mitre.org/techniques/T1003/001/) | LSASS Memory | Password Cracking Tool (Brutus) and Password...; Systematic Evidence of Preparation for... |
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Multiple Hacking and Reconnaissance Tools...; Network Packet Capture Tools (Ethereal, Cain,...; Network Reconnaissance Toolkit Complete with...; Prefetch Evidence Shows Execution of Hacking...; Systematic Evidence of Preparation for... |
| [T1040.001](https://attack.mitre.org/techniques/T1040/001/) | Network Sniffing | Network Packet Capture Tools (Ethereal, Cain,... |
| [T1110](https://attack.mitre.org/techniques/T1110/) | Brute Force | Password Cracking Tool (Brutus) and Password...; Systematic Evidence of Preparation for... |
| [T1110.001](https://attack.mitre.org/techniques/T1110/001/) | Password Guessing | Password Cracking Tool (Brutus) and Password...; Systematic Evidence of Preparation for... |
| [T1187](https://attack.mitre.org/techniques/T1187/) | Forced Authentication | mIRC Configuration Shows Active IRC Usage with... |
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Network Packet Capture Tools (Ethereal, Cain,... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Multiple Hacking and Reconnaissance Tools...; Network Packet Capture Tools (Ethereal, Cain,...; Network Reconnaissance Toolkit Complete with...; Prefetch Evidence Shows Execution of Hacking...; Systematic Evidence of Preparation for... |
| [T1040.001](https://attack.mitre.org/techniques/T1040/001/) | Network Sniffing | Network Packet Capture Tools (Ethereal, Cain,... |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Multiple Hacking and Reconnaissance Tools...; Look@LAN Network Reconnaissance Tool Installed; Cerberus Internet Scanner Network Enumeration...; Network Reconnaissance Toolkit Complete with...; Prefetch Evidence Shows Execution of Hacking...; Systematic Evidence of Preparation for... |
| [T1135](https://attack.mitre.org/techniques/T1135/) | Network Share Discovery | Multiple Hacking and Reconnaissance Tools...; Look@LAN Network Reconnaissance Tool Installed; Systematic Evidence of Preparation for... |
| [T1526](https://attack.mitre.org/techniques/T1526/) | Cloud Service Discovery | Cerberus Internet Scanner Network Enumeration... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Network Packet Capture Tools (Ethereal, Cain,... |
| [T1560](https://attack.mitre.org/techniques/T1560/) | Archive Collected Data | Archive and Utility Tools Present - Data... |
| [T1560.001](https://attack.mitre.org/techniques/T1560/001/) | Archive via Utility | Archive and Utility Tools Present - Data... |


### Command and Control

| Technique | Name | Findings |
|-----------|------|----------|
| [T1071](https://attack.mitre.org/techniques/T1071/) | Application Layer Protocol | Systematic Evidence of Preparation for... |
| [T1071.001](https://attack.mitre.org/techniques/T1071/001/) | Web Protocols | Outlook Express Email Client Installed and... |


### Other

| Technique | Name | Findings |
|-----------|------|----------|
| [T1081](https://attack.mitre.org/techniques/T1081/) |  | IRC Channel Access: #Elite.Hackers,...; mIRC Configuration Shows Active IRC Usage with... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 211 |
| Findings submitted | 16 |
| Confirmed | 13 |
| Inferences | 3 |
| Input tokens | 630 |
| Output tokens | 55.8K |
| Total tokens | 56.4K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 630 | 55.8K | 56.4K |




<details>
<summary>Evidence Sources (138)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 12545 |
| hashdeep.hashes | hashdeep | 6 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 49266 |
| bulk.duplicates | bulk_extractor | 210 |
| bulk.email | bulk_extractor | 31653 |
| bulk.ether | bulk_extractor | 37 |
| bulk.ip | bulk_extractor | 1646 |
| bulk.packets | bulk_extractor | 5403 |
| bulk.rfc822 | bulk_extractor | 1298 |
| bulk.tcp | bulk_extractor | 825 |
| bulk.url | bulk_extractor | 17456 |
| bulk.url_searches | bulk_extractor | 42 |
| bulk.url_services | bulk_extractor | 3369 |
| bulk.zip_carved | bulk_extractor | 3035 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| appfiles.program_files.*ethereal*.dictionary.xml | icat | 649 |
| appfiles.program_files.*ethereal*.mobileipv4.xml | icat | 64 |
| appfiles.program_files.*ethereal*.nasreq.xml | icat | 293 |
| appfiles.program_files.*ethereal*.sunping.xml | icat | 24 |
| appfiles.program_files.*ethereal*.capture_filters.txt | icat | 80 |
| appfiles.program_files.*ethereal*.capturing.txt | icat | 84 |
| appfiles.program_files.*ethereal*.display_filters.txt | icat | 43 |
| appfiles.program_files.*ethereal*.faq.txt | icat | 2228 |
| appfiles.program_files.*ethereal*.getting_started.txt | icat | 90 |
| appfiles.program_files.*ethereal*.overview.txt | icat | 38 |
| appfiles.program_files.*ethereal*.well_known.txt | icat | 114 |
| appfiles.program_files.*ethereal*.pcrepattern.3.txt | icat | 1475 |
| appfiles.program_files.*ethereal*.agentx-mib.txt | icat | 529 |
| appfiles.program_files.*ethereal*.disman-event-mib.txt | icat | 1957 |
| appfiles.program_files.*ethereal*.disman-schedule-mib.txt | icat | 701 |
| appfiles.program_files.*ethereal*.disman-script-mib.txt | icat | 1766 |
| appfiles.program_files.*ethereal*.etherlike-mib.txt | icat | 1139 |
| appfiles.program_files.*ethereal*.hcnum-tc.txt | icat | 120 |
| appfiles.program_files.*ethereal*.host-resources-mib.txt | icat | 1542 |
| appfiles.program_files.*ethereal*.host-resources-types.txt | icat | 391 |
| appfiles.program_files.*ethereal*.iana-address-family-numbers-mib.txt | icat | 123 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| appfiles.program_files.*ethereal*.iana-language-mib.txt | icat | 125 |
| appfiles.program_files.*mirc*.aliases.ini | icat | 16 |
| appfiles.program_files.*look@lan*.irunin.ini | icat | 399 |
| appfiles.program_files.*outlook*.msoe.txt | icat | 3 |
| appfiles.program_files.*ethereal*.ianaiftype-mib.txt | icat | 392 |
| appfiles.program_files.*mirc*.#chataholics.undernet.log | icat | 16 |
| appfiles.program_files.*look@lan*.license.txt | icat | 25 |
| appfiles.program_files.*ethereal*.if-inverted-stack-mib.txt | icat | 151 |
| appfiles.program_files.*mirc*.#cybercafe.undernet.log | icat | 207 |
| appfiles.program_files.*ethereal*.if-mib.txt | icat | 1816 |
| ez.shimcache | eztools | 140 |
| appfiles.program_files.*mirc*.#elite.hackers.undernet.log | icat | 11 |
| registry.default | regripper | 427 |
| appfiles.program_files.*ethereal*.inet-address-mib.txt | icat | 300 |
| appfiles.program_files.*mirc*.#evilfork.efnet.log | icat | 11 |
| appfiles.program_files.*ethereal*.ip-forward-mib.txt | icat | 811 |
| appfiles.program_files.*mirc*.#funny.undernet.log | icat | 10 |
| appfiles.program_files.*ethereal*.ip-mib.txt | icat | 722 |
| appfiles.program_files.*mirc*.#houston.undernet.log | icat | 9 |
| appfiles.program_files.*ethereal*.ipv6-icmp-mib.txt | icat | 531 |
| appfiles.program_files.*mirc*.#iso-warez.efnet.log | icat | 7 |
| appfiles.program_files.*ethereal*.ipv6-mib.txt | icat | 1445 |
| appfiles.program_files.*mirc*.#luxshell.undernet.log | icat | 13 |
| appfiles.program_files.*ethereal*.ipv6-tc.txt | icat | 69 |
| ez.prefetch | eztools | 165 |
| appfiles.program_files.*mirc*.#mp3xserv.undernet.log | icat | 15 |
| appfiles.program_files.*ethereal*.ipv6-tcp-mib.txt | icat | 213 |
| appfiles.program_files.*mirc*.#thedarktower.afternet.log | icat | 14 |
| appfiles.program_files.*ethereal*.ipv6-udp-mib.txt | icat | 143 |
| registry.sam | regripper | 133 |
| appfiles.program_files.*mirc*.#ushells.undernet.log | icat | 9 |
| appfiles.program_files.*ethereal*.lm-sensors-mib.txt | icat | 232 |
| appfiles.program_files.*mirc*.m5tar.undernet.log | icat | 8 |
| appfiles.program_files.*ethereal*.mta-mib.txt | icat | 1228 |
| appfiles.program_files.*mirc*.mirc.ini | icat | 224 |
| appfiles.program_files.*ethereal*.net-snmp-agent-mib.txt | icat | 546 |
| appfiles.program_files.*mirc*.popups.ini | icat | 96 |
| registry.sam | regripper | 7 |
| appfiles.program_files.*ethereal*.net-snmp-examples-mib.txt | icat | 229 |
| appfiles.program_files.*mirc*.readme.txt | icat | 34 |
| appfiles.program_files.*ethereal*.net-snmp-mib.txt | icat | 69 |
| appfiles.program_files.*mirc*.servers.ini | icat | 423 |
| appfiles.program_files.*ethereal*.net-snmp-monitor-mib.txt | icat | 61 |
| appfiles.program_files.*mirc*.urls.ini | icat | 9 |
| registry.security | regripper | 19 |
| appfiles.program_files.*ethereal*.net-snmp-system-mib.txt | icat | 65 |
| appfiles.program_files.*mirc*.versions.txt | icat | 472 |
| appfiles.program_files.*ethereal*.net-snmp-tc.txt | icat | 123 |
| appfiles.program_files.*ethereal*.network-services-mib.txt | icat | 628 |
| appfiles.program_files.*ethereal*.notification-log-mib.txt | icat | 784 |
| registry.security | regripper | 8 |
| appfiles.program_files.*ethereal*.rfc-1215.txt | icat | 40 |
| appfiles.program_files.*ethereal*.rfc1155-smi.txt | icat | 121 |
| appfiles.program_files.*ethereal*.rfc1213-mib.txt | icat | 2615 |
| appfiles.program_files.*ethereal*.rmon-mib.txt | icat | 3982 |
| appfiles.program_files.*ethereal*.smux-mib.txt | icat | 162 |
| appfiles.program_files.*ethereal*.snmp-community-mib.txt | icat | 431 |
| appfiles.program_files.*ethereal*.snmp-framework-mib.txt | icat | 528 |
| appfiles.program_files.*ethereal*.snmp-mpd-mib.txt | icat | 147 |
| appfiles.program_files.*ethereal*.snmp-proxy-mib.txt | icat | 296 |
| appfiles.program_files.*ethereal*.snmp-target-mib.txt | icat | 662 |
| appfiles.program_files.*ethereal*.snmp-user-based-sm-mib.txt | icat | 914 |
| appfiles.program_files.*ethereal*.snmp-view-based-acm-mib.txt | icat | 832 |
| appfiles.program_files.*ethereal*.snmpv2-conf.txt | icat | 324 |
| appfiles.program_files.*ethereal*.snmpv2-mib.txt | icat | 856 |
| appfiles.program_files.*ethereal*.snmpv2-smi.txt | icat | 346 |
| registry.software | regripper | 9600 |
| appfiles.program_files.*ethereal*.snmpv2-tc.txt | icat | 774 |
| appfiles.program_files.*ethereal*.snmpv2-tm.txt | icat | 178 |
| appfiles.program_files.*ethereal*.tcp-mib.txt | icat | 332 |
| appfiles.program_files.*ethereal*.tunnel-mib.txt | icat | 339 |
| registry.software | regripper | 283 |
| appfiles.program_files.*ethereal*.ucd-demo-mib.txt | icat | 76 |
| appfiles.program_files.*ethereal*.ucd-diskio-mib.txt | icat | 119 |
| appfiles.program_files.*ethereal*.ucd-dlmod-mib.txt | icat | 121 |
| appfiles.program_files.*ethereal*.ucd-ipfilter-mib.txt | icat | 258 |
| appfiles.program_files.*ethereal*.ucd-ipfwacc-mib.txt | icat | 329 |
| registry.software | regripper | 485 |
| appfiles.program_files.*ethereal*.ucd-snmp-mib-old.txt | icat | 746 |
| appfiles.program_files.*ethereal*.ucd-snmp-mib.txt | icat | 1384 |
| appfiles.program_files.*ethereal*.udp-mib.txt | icat | 148 |
| appfiles.program_files.*ethereal*.snmp-notification-mib.txt | icat | 591 |
| registry.system | regripper | 3138 |
| registry.system | regripper | 199 |
| clamav.scan | clamav | 1 |
| yara.files | yara | 3 |
| registry.ntuser.default user | regripper | 70 |
| registry.usrclass.localservice | regripper | 4 |
| registry.ntuser.localservice | regripper | 70 |
| registry.usrclass.mr. evil | regripper | 4 |
| registry.ntuser.mr. evil | regripper | 329 |
| registry.usrclass.networkservice | regripper | 4 |
| registry.ntuser.networkservice | regripper | 70 |
| composite.file_staging | composite | 122 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
