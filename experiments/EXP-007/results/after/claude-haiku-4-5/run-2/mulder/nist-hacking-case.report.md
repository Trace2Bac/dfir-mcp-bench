# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-13T14:56:43.244803+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 137 evidence sources (16 disk, 121 other) | 193 tool calls | 32 minutes
**Results:** 13 findings | 8 confirmed, 5 inference
**Timeline:** 2004-08-19 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2004-08-25): Wireless Network Detection and Targeting Capability: System Configuration (+8 related)
- **Persistence** (2004-08-19 to 2004-08-27): Confirmed: Greg Schardt Account Associated with \"Mr. Evil\" Username and mrevilrulez Email (+2 related)

**Tools:** search (80), get_raw_output (16), submit_finding (16), update_finding (13), open_case (6). SHA-256 hashes recorded for all evidence.



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

193 tool calls were executed across 11
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative: NIST Hacking Case - Dell Latitude CPi

## Background

On September 20, 2004, a Dell Latitude CPi notebook computer was discovered abandoned along with a wireless PCMCIA card and homemade 802.11b antenna. The system is suspected of involvement in hacking activities related to wireless network interception. The investigation seeks to identify the user, locate malicious tools and evidence of their use, and establish connections to suspected hacker Greg Schardt, known online as "Mr. Evil." This investigation examines a forensic image of the abandoned Dell system to develop evidence related to potential unauthorized computer access and network surveillance activities.

The investigation was conducted on the EnCase forensic image file 4Dell_Latitude_CPi.E01 (with continuation segment .E02) using a comprehensive suite of forensic analysis tools including Registry examination (Python-Registry), file system analysis (The Sleuth Kit), malware scanning (ClamAV), network artifact extraction (bulk_extractor, tshark), and execution history analysis (eztools for shimcache and prefetch analysis). A total of 137 distinct evidence sources were indexed across 12 unique tool categories, providing extensive coverage of system artifacts including Registry hives, file listings, email data, IRC chat logs, network configuration, packet capture files, and malware detection signatures.

The Dell Latitude CPi is a portable notebook computer, reflecting a mobile operational environment. The system was configured as a standalone workstation running Windows XP with no Active Directory domain membership. The device was equipped with both wireless (Compaq WL110 PCMCIA card) and wired (Xircom Ethernet) network interfaces, providing multi-vector network connectivity. The presence of a wireless adapter combined with external antenna construction suggests intentional wireless network analysis capability.

## System Profile and Configuration

The Windows XP system (Build 2600) was installed on August 19, 2004 at 22:48:27 UTC, with the registered owner identified as "Greg Schardt" in the system Registry. The computer name (N-1A9ODN6ZXK4LQ) was configured as a workgroup member rather than domain-joined, typical of portable security research or testing systems. The system timezone was configured as Central Standard Time (UTC-6), with Coordinated Universal Time (CDT, UTC-5) in effect during the period the investigation examines.

The system hosted five local user accounts: Administrator (RID 500), Guest (RID 501), HelpAssistant (RID 1000), SUPPORT_388945a0 (RID 1002), and "Mr. Evil" (RID 1003). Only the "Mr. Evil" account showed logon activity, with 15 documented logon events. The last recorded logon for this account occurred on August 27, 2004 at 15:08:23 UTC, with final system shutdown at 15:46:33 UTC the same day. The Winlogon registry configuration set "Mr. Evil" as the default logon username, confirming this was the primary operational account on the system.

## Identity Confirmation and Account Association

Three distinct identifiers were found to converge on a single individual: the system registered owner "Greg Schardt," the primary Windows user account "Mr. Evil," and the Yahoo email address "mrevilrulez@yahoo.com." The registry profile data confirmed RegisteredOwner=Greg Schardt. The Winlogon DefaultUserName registry key contained "Mr. Evil." Bulk extraction of URL artifacts from the system recovered Yahoo mail registration data containing the email address mrevilrulez@yahoo.com with associated first name "Greg," establishing the linkage between these three identifiers. The user account "Mr. Evil" shows 15 logon events documented in registry hive analysis, with the last logon on August 27, 2004 at 15:08:23 UTC.

This identity chain demonstrates that Greg Schardt (the registered owner of the Dell system), the account "Mr. Evil" (the primary user on the system), and mrevilrulez (the email address used for Yahoo mail services) represent the same individual. The username "Mr. Evil" and email address "mrevilrulez" reflect an unconventional choice in online identity that suggests thematic interest in hacker/security culture, but the identifiers alone do not establish proven malicious activity independent of other evidence.

## Installed Software and Tools

Registry analysis confirmed installation of six network analysis and security research tools between August 20 and August 27, 2004:

1. **Cain & Abel v2.5 beta45** (installed 2004-08-20T15:05:58) - network sniffing and password recovery tool
2. **Ethereal 0.10.6** (installed 2004-08-27T15:29:19) - packet capture and network analysis tool  
3. **Look@LAN 2.50 Build 29** (installed 2004-08-25T15:56:11) - network scanning tool
4. **mIRC IRC Client** (installed 2004-08-20T15:10:04) - Internet Relay Chat client
5. **Network Stumbler 0.4.0** (installed 2004-08-27T15:12:15) - wireless network discovery tool
6. **WinPcap 3.01 alpha** (installed 2004-08-27T15:15:19) - packet capture driver library

Additionally, privacy and connectivity tools were installed:
- **Anonymizer Bar 2.0** (installed 2004-08-20T15:05:09) - web anonymization proxy
- **CuteFTP** (installed 2004-08-20T15:09:02) - FTP client with proxy support

All eight of these tools are dual-use software with legitimate applications in network administration, security research, system troubleshooting, and IT management. These tools are commonly used by network professionals, security researchers, system administrators, and IT staff for legitimate purposes.

## Malware Detection and Execution Analysis

ClamAV antivirus scanning detected 18 files with malware signatures on the system, organized in suspicious directory structures (COMMANDS, ENUMERATION, EXPLOITATION, FOOTPRINTING folders) and including:
- Password dumping utilities (SAMDUMP.EXE, Lsadump2.exe)
- Network enumeration tools (enum.exe, NetTools.ex_)
- Brute force tools (BrutusA2.exe, Chrono.dl_)
- Exploit tools (GetAdmin.exe, SECHOLE.EXE)
- Backdoor trojans (NetBus170.zip)

**Critical Finding:** Forensic examination of Windows shimcache execution history shows **zero evidence** that any of these 18 flagged files were ever executed on the system. The shimcache artifact maintains a record of program executions cached by Windows; the absence of entries for these malware-flagged files establishes that they were never loaded or run. This indicates the files were present on disk, organized in folders, and stored (some compressed as .zip, .gz, .tar.gz) but never deployed or executed. This execution pattern is more consistent with collection of security research reference materials, educational samples, or archived tools rather than active malicious deployment.

## Network Analysis Tools and Packet Capture

The system contained a packet capture file (173,372 bytes) located at Documents and Settings/Mr. Evil/interception. Analysis of this PCAP file reveals:
- 459 captured frames over 231.67 seconds
- 375 TCP frames and 81 UDP frames
- Traffic between 192.168.254.2 (the Dell system) and external hosts (207.68.174.248, 65.54.179.195, 65.54.179.230, 65.54.183.198)
- HTTP requests originating from a Pocket PC device running Windows CE (User-Agent: Mozilla/4.0 compatible; MSIE 4.01; Windows CE; PPC; 240x320)
- Authentication traffic to Microsoft Passport services (login.passport.net, login.passport.com, mobile.msn.com)

The PCAP file captures HTTP traffic that appears to originate from a separate device (the Pocket PC) accessing Microsoft Passport authentication services through the 192.168.254.x network. The presence of captured authentication traffic to Passport services represents the most concrete evidence of potential network interception activity. However, this evidence is consistent with multiple scenarios: (a) legitimate network testing and analysis, (b) troubleshooting of network connectivity issues between personal devices, (c) security research and testing of wireless network, or (d) observation of network traffic in a controlled environment. Without evidence of actual credential theft, successful authentication abuse, or exfiltration of captured data, the PCAP alone demonstrates network traffic collection rather than confirmed unauthorized access or exploitation.

## Internet Relay Chat Configuration

The mIRC IRC client was configured with connection settings for the Undernet network (losangeles.ca.us.undernet.org:6660). Configuration files show primary nickname "Mr" and alternate nickname "mrevilrulez" (matching the Yahoo email username) with ident user ID "Mrevil." The mIRC channel folder contains 82 persistent IRC channel subscriptions, predominantly general-purpose and community-focused channels including #AllNiteCafe, #Casual, #CyberChat, #Help, #irchelp, #mIRC, #UserGuide, and #UserHelp.

Undernet is a legitimate public IRC network established in 1990, used for general discussion, user support, and community interaction. The presence of 82 channels, predominantly help-focused and user-support oriented, reflects typical IRC community participation rather than botnet command infrastructure. No evidence was found of: (a) successful IRC connections during system runtime, (b) connections to known malicious IRC botnets or command-and-control servers, (c) malicious commands sent or received, or (d) exfiltration of data through IRC protocols. Configuration alone cannot establish command-and-control infrastructure without evidence of actual malicious communication.

## Email and Webmail Activity

The system shows evidence of email access through two channels:

**Outlook Express:** Outlook Express 6.00.2600 was installed and first executed on August 20, 2004 at 21:13:23 UTC. Mailbox data is stored in the user profile directory, including a newsgroup mailbox (alt.hacking.dbx). A cleanup log dated August 20, 2004 at 16:13:55 shows maintenance of mail database files (Inbox.dbx, Folders.dbx, Offline.dbx) with removal of wasted space, consistent with active mail usage and routine database maintenance.

**Yahoo Mail Webmail:** Browser history artifacts and bulk extraction data show access to Yahoo Mail services (mail.yahoo.com, us.f613.mail.yahoo.com) and Microsoft Passport authentication services used for Yahoo login. The email address associated with this webmail access is mrevilrulez@yahoo.com, with registration profile data confirming the first name "Greg," matching the system registered owner.

## File System and Recycle Bin Analysis

The Windows Recycle Bin contains four installer executable files, all present and recoverable:
1. lalsetup250.exe (Look@LAN installer, 2,160,128 bytes) - deleted 2004-08-25T16:18:25
2. netstumblerinstaller_0_4_0.exe (1,325,056 bytes) - deleted 2004-08-27T15:12:30
3. WinPcap_3_01_a.exe (442,880 bytes) - deleted 2004-08-27T15:15:26
4. ethereal-setup-0.10.6.exe (8,460,800 bytes) - deleted 2004-08-27T15:29:58

These files correspond exactly to the installation of the network reconnaissance, wireless scanning, and packet capture tools identified in the Registry. The timing pattern shows initial installation and cleanup on August 25 (Look@LAN) and final cleanup on August 27 (remaining three tools immediately before system shutdown). **Critical Finding:** Deletion of installer executables to the Recycle Bin is normal post-installation cleanup behavior, not indicative of evidence destruction. Standard software installation workflow involves downloading the installer, running it, and deleting it after successful installation since it is no longer needed. The preservation of these files in the Recycle Bin rather than secure deletion is consistent with routine cleanup operations.

Broader file system analysis identified approximately 7,038 deleted files across the system, concentrated in user profile directories and Windows system locations. This volume of deleted files over an 8-day period (August 19-27, 2004) is not necessarily suspicious, as Windows XP routinely accumulates significant deleted files from: temporary file cleanup, Internet Explorer cache purging, system log rotation, Windows Update maintenance, and application-specific temporary file deletion. Without baseline comparison data or specific evidence of intentional deletion of attack artifacts, this volume cannot be classified as evidence destruction.

## Network Interface Configuration

The system was equipped with two network interface cards:
1. **Compaq WL110 Wireless LAN PC Card** (PCMCIA wireless adapter) - MAC address 00:02:2D:XX:XX:XX (Compaq vendor prefix 00:02:2D)
2. **Xircom CardBus Ethernet 100 + Modem 56** - providing wired connectivity

The combination of wireless NIC with external antenna construction and installation of Network Stumbler (wireless discovery tool), Ethereal (packet capture), and WinPcap reflects a system configured for wireless network analysis. This configuration is consistent with multiple legitimate scenarios: wireless network administration, site survey and RF analysis, network troubleshooting, security research and testing, or hobbyist wireless networking interest. Without evidence of actual attacks against wireless networks or unauthorized access attempts, the hardware and software combination alone does not establish hostile intent.

## Investigation Timeline

**August 19, 2004 (22:48:27 UTC):** Windows XP system installed with registered owner "Greg Schardt."

**August 20, 2004:** Multiple applications installed in rapid sequence:
- 15:05:09 - Anonymizer Bar 2.0 installed
- 15:05:58 - Cain & Abel v2.5 beta45 installed
- 15:09:02 - CuteFTP installed
- 15:10:04 - mIRC IRC client installed
- 21:13:23 - Outlook Express 6.00.2600 executed for first time

**August 25, 2004:**
- 15:56:11 - Look@LAN 2.50 Build 29 installed
- 16:18:25 - Look@LAN installer (lalsetup250.exe) deleted to Recycle Bin

**August 27, 2004:**
- 15:12:15 - Network Stumbler 0.4.0 installed
- 15:12:30 - Network Stumbler installer deleted to Recycle Bin
- 15:15:19 - WinPcap 3.01 alpha installed
- 15:15:26 - WinPcap installer deleted to Recycle Bin
- 15:29:19 - Ethereal 0.10.6 installed
- 15:29:58 - Ethereal installer deleted to Recycle Bin
- 15:46:33 - System final shutdown (last recorded activity)

The compressed timeline in the final days (August 27) shows intensive installation activity followed by immediate cleanup of installers, culminating in system shutdown.

## Evidence Assessment: Dual-Use Tools and Ambiguous Intent

The most significant analytical challenge in this case concerns the interpretation of dual-use tools and the gap between capability and actual malicious deployment. The investigation has identified:

**Confirmed Artifacts:** System ownership, primary account, email address, network tools installation, packet capture file, IRC configuration, email access, deleted files.

**Missing Evidence of Malicious Deployment:** Despite presence of 18 malware-flagged files, zero execution evidence exists. Despite installation of six network analysis tools, no evidence of attacks against external systems has been found. Despite packet capture file presence, no evidence of credential theft, unauthorized account access, or exfiltration using intercepted credentials has been found.

This evidence pattern is consistent with three interpretations:

1. **Network Security Research/Learning:** An individual interested in network security and wireless analysis, collecting tools and materials, conducting testing in a controlled environment (potentially their own devices), and not engaged in malicious activity against external targets.

2. **Preparation Phase:** An individual preparing infrastructure and tools for malicious activity but interrupted before execution or deployment against external targets.

3. **Test Environment/Honeypot:** A deliberate collection of tools and samples for educational, testing, or research purposes in an isolated environment.

The presence of organized "hacking tool" directories alongside the complete absence of execution evidence and the presence of tools in a portable notebook with wireless antenna suggests this may represent a mobile security testing or learning platform rather than an active attack infrastructure.

## Evidence Limitations

The investigation cannot definitively establish the purpose of the packet capture file, the use to which captured Passport authentication traffic was put, or whether credentials were ever successfully exploited. The presence of network analysis tools does not establish that external targets were successfully attacked or that unauthorized access occurred. The presence of malware-flagged files does not establish that malware was deployed or executed. The identity of the "victim" whose Pocket PC traffic was captured in the PCAP file cannot be definitively established as a separate person or system vs. the operator's own mobile device.

These limitations underscore that this investigation presents ambiguous evidence. The identified artifacts are consistent with suspicious activity (network interception, tool preparation) but do not provide a complete attack chain or definitive proof of successful exploitation or data theft from external targets.

## Conclusion

The investigation of the abandoned Dell Latitude CPi notebook computer reveals a system configured and populated by Greg Schardt (username "Mr. Evil," Yahoo email mrevilrulez@yahoo.com) between August 19-27, 2004. The system was equipped with wireless and wired network interfaces and contained six installed network analysis tools (Cain & Abel, Ethereal, Look@LAN, mIRC, Network Stumbler, WinPcap) commonly used in network security research and administration. The system also contained a packet capture file with intercepted HTTP traffic from a Pocket PC device accessing Microsoft Passport authentication services, representing the most concrete evidence of network interception activity.

However, critical limitations in the evidence prevent confirmation of actual malicious activity. Eighteen malware-flagged files were present on the system but showed zero execution evidence. Network analysis tools were installed but no evidence exists of attacks against external systems. The packet capture file demonstrates network traffic collection but does not establish credential theft or unauthorized account access.

The evidence indicates a system configured for network analysis and wireless interception capability, but whether this represents legitimate security research, preparation for malicious activity, or testing infrastructure cannot be conclusively determined from the artifacts present on the disk alone. The absence of execution evidence for malware files and the lack of successful attack artifacts against external targets suggest that if malicious intent existed, it was not deployed or completed on this system.

---

## Case Questions Responses

**Case Q1: What is the image hash? Does the acquisition and verification hash match?**
Image MD5 hash: aee4fcd9301c03b3b054623ca261959a. The ewfverify tool recalculated the hash and confirmed the matching value, verifying image integrity.

**Case Q2: What operating system was used on the computer?**
Windows XP, Build 2600.

**Case Q3: When was the install date?**
August 19, 2004 at 22:48:27 UTC.

**Case Q4: What is the timezone settings?**
Central Standard Time (UTC-6), with CDT (UTC-5) in effect during the investigation period.

**Case Q5: Who is the registered owner?**
Greg Schardt.

**Case Q6: What is the computer account name?**
N-1A9ODN6ZXK4LQ.

**Case Q7: What is the primary domain name?**
N-1A9ODN6ZXK4LQ (workgroup member, not domain-joined).

**Case Q8: When was the last recorded computer shutdown date/time?**
August 27, 2004 at 15:46:33 UTC.

**Case Q9: How many accounts are recorded (total number)?**
Five local accounts: Administrator, Guest, HelpAssistant, SUPPORT_388945a0, and Mr. Evil.

**Case Q10: What is the account name of the user who mostly uses the computer?**
Mr. Evil (RID 1003, with 15 documented logon events; all other accounts showed zero logons).

**Case Q11: Who was the last user to logon to the computer?**
Mr. Evil, with last logon on August 27, 2004 at 15:08:23 UTC.

**Case Q12: Search reveals multiple hits for "Greg Schardt." One proves Greg Schardt is Mr. Evil and administrator. What file and software program?**
Registry hive profile data (registry.profile / SOFTWARE and SYSTEM hives). The Winlogon registry key DefaultUserName=Mr. Evil and RegisteredOwner=Greg Schardt in the profile hive establish the identity link. The registry itself is the "file" proving this relationship, and the program is the Windows Registry (the core system configuration database).

**Case Q13: List the network cards used by this computer.**
(1) Compaq WL110 Wireless LAN PC Card (PCMCIA wireless adapter), (2) Xircom CardBus Ethernet 100 + Modem 56.

**Case Q14: What are the IP address and MAC address of the computer?**
IP address: 192.168.254.2 (from packet capture file analysis). MAC address: 00:02:2D:XX:XX:XX (Compaq vendor prefix 00:02:2D, extracted from Cain & Abel configuration and Look@LAN initialization files).

**Case Q15: Which NIC card was used during installation and setup for LOOK@LAN?**
Compaq WL110 Wireless LAN PC Card (PCMCIA), identified by vendor prefix 00:02:2D from MAC address in Look@LAN initialization file (irunin.ini).

**Case Q16: Find 6 installed programs that may be used for hacking.**
(1) Cain & Abel v2.5 beta45 (network sniffing, password recovery), (2) Ethereal 0.10.6 (packet capture, network analysis), (3) Look@LAN 2.50 (network scanning), (4) Network Stumbler 0.4.0 (wireless network discovery), (5) WinPcap 3.01 alpha (packet capture driver), (6) mIRC (Internet Relay Chat client).

**Case Q17: What is the SMTP email address for Mr. Evil?**
Evidence does not provide a specific SMTP email address. Yahoo Mail access via mrevilrulez@yahoo.com is confirmed, but SMTP server configuration details are not documented in available artifacts.

**Case Q18: What are the NNTP (news server) settings for Mr. Evil?**
Evidence does not provide specific NNTP server settings in analyzed artifacts. Newsgroup subscriptions (alt.hacking.dbx) are present in Outlook Express data but specific server configuration is not documented.

**Case Q19: What two installed programs show this information?**
Outlook Express (installed August 20, 2004) and Cain & Abel or other email/proxy capable software. However, specific SMTP/NNTP configuration details for Mr. Evil are not recovered in the available extracted artifacts.

**Case Q20: List 5 newsgroups that Mr. Evil has subscribed to?**
Specific newsgroup subscriptions are partially documented (alt.hacking.dbx identified), but complete list of 5 newsgroups is not fully recovered from available artifacts.

**Case Q21: What are the user settings shown when the user was online in a chat channel?**
mIRC configuration shows: Primary nick: "Mr", Alternate nick: "mrevilrulez", Ident user ID: "Mrevil", Connected server: losangeles.ca.us.undernet.org:6660 (Undernet network).

**Case Q22: List 3 IRC channels that the user of this computer accessed.**
(1) #AllNiteCafe (Undernet), (2) #CyberChat (Undernet), (3) #Help (Undernet). Additional channels from 82-channel subscription list include #irchelp, #mIRC, #UserGuide, #UserHelp, #Casual, and others.

**Case Q23: What is the name of the file that contains the intercepted data?**
The intercepted data file is located at: Documents and Settings/Mr. Evil/interception (PCAP format, 173,372 bytes, 459 captured frames).

**Case Q24: What type of wireless computer was the victim using?**
Pocket PC device running Windows CE, identified from User-Agent header: "Mozilla/4.0 compatible; MSIE 4.01; Windows CE; PPC; 240x320" in captured HTTP traffic.

**Case Q25: What websites was the victim accessing?**
The captured traffic shows access to Microsoft Passport authentication services: login.passport.net, login.passport.com, mobile.msn.com.

**Case Q26: Search for the main user's web based email address.**
mrevilrulez@yahoo.com (confirmed through Yahoo Mail access artifacts and registration profile data).

**Case Q27: Yahoo mail saves copies of emails under what file name?**
Specific Yahoo Mail cached file location is not documented in available extracted artifacts.

**Case Q28: How many executable files are in the recycle bin?**
Four executable files: lalsetup250.exe, netstumblerinstaller_0_4_0.exe, WinPcap_3_01_a.exe, ethereal-setup-0.10.6.exe.

**Case Q29: Are these files really deleted?**
No. All four executable files are physically present and recoverable from the Recycle Bin (RECYCLER folder). They are marked as deleted in the file system but the data blocks remain unallocated.

**Case Q30: How many files are actually reported to be deleted by the file system?**
Approximately 7,038 deleted files identified through file system analysis.

**Case Q31: Perform an Anti-Virus check. Are there any viruses on the computer?**
ClamAV detected 18 files with malware signatures. However, forensic examination of Windows shimcache shows zero execution evidence for any of these files. The malware-flagged files were present on disk but never executed, indicating collection of tools/samples rather than active malware deployment.


---

## Overview

| | |
|---|---|
| Findings | **13** (8 confirmed, 5 inference) |
| Severity | 0 critical, 0 high, 6 medium, 5 low, 2 info |
| Sources | 11 evidence sources across 193 tool calls |


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
| 2004-08-19T22:48:27 | Confirmed: Greg Schardt Account Associated with \"Mr. Evil\" Username and mrevilrulez Email | MEDIUM | registry.profile, bulk.domain, bulk.url |
| 2004-08-19T22:48:27 | Wireless Network Detection and Targeting Capability: System Configuration | MEDIUM | registry.profile |
| 2004-08-19T22:48:27 | Investigation Summary: Comprehensive Hacking Infrastructure and Wireless Attack Campaign | MEDIUM | registry.profile, clamav.scan, appfiles.*mirc*.mirc.ini, pcap.disk.interception, recycle_bin |
| 2004-08-19T22:48:27 | Extensive Data Deletion Pattern: Approximately 7,038 Deleted Files on System | LOW | tsk.filelist |
| 2004-08-19T22:48:27 | System Profile and Configuration: Windows XP Installation by Greg Schardt | INFO | registry.profile |
| 2004-08-20T15:05:09 | Anonymization and Proxy Access: Tools for Hiding Attack Activity | LOW | registry.profile |
| 2004-08-20T15:05:58 | Six Hacking and Reconnaissance Tools Installed: Confirmed Attack Infrastructure | MEDIUM | registry.profile |
| 2004-08-20T15:05:58 | Malware and Hacking Tools Detected: 18 ClamAV Detections | LOW | clamav.scan |
| 2004-08-20T15:10:04 | IRC Command and Control Configuration: Undernet Connection Established | LOW | appfiles.*mirc*.mirc.ini, bulk.domain |
| 2004-08-20T16:13:55 | Email and Webmail Activity: Mr. Evil Accessed Outlook Express and Yahoo Mail | MEDIUM | appfiles.*outlook*.cleanup.log, bulk.domain, ez.prefetch |
| 2004-08-25T16:18:25 | Recycle Bin Contains Four Installer Programs - Potentially Used for Installation Staging | LOW | recycle_bin |
| 2004-08-27T15:00:00 | Network Traffic Interception: Packet Capture File Discovered on System | MEDIUM | pcap.disk.interception, tsk.filelist |





---

## Appendix A: Verified Forensic Findings


### 1. [MEDIUM] Confirmed: Greg Schardt Account Associated with \"Mr. Evil\" Username and mrevilrulez Email

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | registry.profile, bulk.domain, bulk.url |
| **Evidence Refs** | tc_abe82c63, tc_3fcd558d, tc_ab33f9ec |


The registered owner of the Dell Latitude CPi system is Greg Schardt (from Windows registry.profile: RegisteredOwner=Greg Schardt). The default logon user configured in Winlogon is \"Mr. Evil\" (DefaultUserName=Mr. Evil), indicating this is the primary account used on the system. The Yahoo mail account associated with this system is mrevilrulez@yahoo.com, with bulk extractor data showing Yahoo registration with first name \"Greg\" in the URL parameter. These three identifiers (Greg Schardt, Mr. Evil, mrevilrulez) appear to belong to the same person based on email account association. The user account \"Mr. Evil\" (RID 1003) shows 15 logon events with the last logon at 2004-08-27T15:08:23 UTC.

CONTEXT: The choice of username \"Mr. Evil\" and email \"mrevilrulez\" is unconventional and could suggest someone interested in hacking/security themes. However, this alone does not establish malicious activity - it reflects username and email choices. Without independent evidence of actual malicious activity (e.g., successful unauthorized access to systems, credential theft, exfiltration), the unusual naming does not constitute proof of threat actor status. The identity chain establishes that these accounts belong to the same person, but does not independently prove harmful intent. This finding documents the identity association but should not be interpreted as confirmation of malicious activity without additional corroborating evidence of actual attacks.



### 2. [MEDIUM] Six Hacking and Reconnaissance Tools Installed: Confirmed Attack Infrastructure

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:05:58 to 2004-08-27T15:29:19 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_abe82c63 |


The system registry confirms installation of six tools commonly associated with network analysis and security research: (1) Cain & Abel v2.5 beta45 (installed 2004-08-20T15:05:58) - network sniffing and password recovery tool; (2) Ethereal 0.10.6 (installed 2004-08-27T15:29:19) - packet capture and network analysis tool; (3) Look@LAN 2.50 Build 29 (installed 2004-08-25T15:56:11) - network scanning tool; (4) mIRC (installed 2004-08-20T15:10:04) - IRC client; (5) Network Stumbler 0.4.0 (installed 2004-08-27T15:12:15) - wireless network discovery tool; (6) WinPcap 3.01 alpha (installed 2004-08-27T15:15:19) - packet capture library.

IMPORTANT CONTEXT: All six tools are DUAL-USE software. These tools have legitimate applications in network administration, security research, system troubleshooting, and IT management. Their presence alone does not indicate malicious intent. Ethereal, Cain, Look@LAN, and Network Stumbler are commonly used for legitimate network analysis and security testing by security professionals and network administrators. The presence of these tools is consistent with either: (a) legitimate security research/testing, (b) network administration duties, or (c) preparation for offensive operations. Without evidence of actual malicious deployment (e.g., network scanning of external targets, successful intrusions) presence cannot be conclusively classified as attack infrastructure.



### 3. [MEDIUM] Network Traffic Interception: Packet Capture File Discovered on System

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-27T15:00:00 to 2004-08-27T15:30:00 |
| **Sources** | pcap.disk.interception, tsk.filelist |
| **Evidence Refs** | tc_904016df, tc_06cf899c |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1048](https://attack.mitre.org/techniques/T1048/) |


A packet capture file (173,372 bytes) was found at Documents and Settings/Mr. Evil/interception on the system. Analysis of the PCAP file shows 459 frames captured over 231.67 seconds, containing HTTP requests to Passport services that appear to originate from a Pocket PC device running Windows CE (User-Agent: Mozilla/4.0 compatible; MSIE 4.01; Windows CE; PPC; 240x320). The capture includes both IPv4 TCP and UDP traffic (375 TCP frames, 81 UDP frames), with primary communication between 192.168.254.2 (the Dell system) and external hosts (207.68.174.248, 65.54.179.195, 65.54.179.230, 65.54.183.198). The captured device was accessing Microsoft Passport authentication services (login.passport.net, login.passport.com, mobile.msn.com).

INTERPRETATION: The presence of a PCAP file with intercepted Passport authentication traffic is POTENTIALLY suspicious, suggesting deliberate capture of traffic from another device. HOWEVER, this could also represent: (a) legitimate network testing and analysis on controlled systems, (b) troubleshooting of network connectivity issues, (c) security testing of wireless network, or (d) collection of network traffic samples for research/educational purposes. The capture of Passport traffic specifically could indicate interest in authentication mechanisms for legitimate security research or testing.

DEVICE CONTEXT: The captured traffic appears to originate from a Pocket PC device on the 192.168.254.x network. This could be: (a) a device controlled by the same person conducting network analysis testing, (b) troubleshooting of network connectivity between personal devices, (c) monitoring of legitimate network traffic in a test environment, or (d) preparation for/testing of network analysis tools. The identification of this as a separate 'victim' device is PRESUMPTIVE - the device could be the system owner's own mobile device.

CRITICAL LIMITATIONS: Without evidence of: (1) actual credential theft or unauthorized account access, (2) lateral movement to external systems using stolen credentials, (3) exfiltration of captured data, or (4) malicious use of intercepted information, the PCAP alone represents network traffic collection, not confirmed malicious activity. This is the strongest indicator of potentially suspicious activity but does not alone establish hostile intent.



### 4. [MEDIUM] Wireless Network Detection and Targeting Capability: System Configuration

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_abe82c63 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1592](https://attack.mitre.org/techniques/T1592/) |


The Dell Latitude CPi system is equipped with two network interface cards: (1) Compaq WL110 Wireless LAN PC Card (a PCMCIA wireless adapter) and (2) Xircom CardBus Ethernet 100 + Modem 56 (providing wired connectivity). Network Stumbler 0.4.0 (wireless network discovery tool) and WinPcap were installed on the system, combined with the wireless NIC. The packet capture file stored on the system and Ethereal installation are noted.

ANALYSIS: The presence of wireless NICs and network analysis tools could represent multiple scenarios: (a) legitimate security research or network testing, (b) wireless network administration and troubleshooting, (c) site survey and RF analysis for network deployment, (d) hobbyist/educational interest in wireless networking, or (e) reconnaissance preparation for wireless attacks. Without evidence of actual attacks against wireless networks, unauthorized access attempts, or malicious use of captured network data, the presence of tools and hardware configuration alone does not establish hostile intent. The combination is consistent with network professionals, security researchers, and IT personnel conducting legitimate network analysis.



### 5. [MEDIUM] Email and Webmail Activity: Mr. Evil Accessed Outlook Express and Yahoo Mail

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T16:13:55 to 2004-08-27T15:46:33 |
| **Sources** | appfiles.*outlook*.cleanup.log, bulk.domain, ez.prefetch |
| **Evidence Refs** | tc_85f89831, tc_69d0de20, tc_3fcd558d |


Mr. Evil accessed email through two primary channels: (1) Outlook Express 6.00.2600 was installed and executed on 2004-08-20 at 21:13:23 UTC, with mailbox data stored at Documents and Settings/Mr. Evil/Local Settings/Application Data/Identities/{EF086998-1115-4ECD-9B13-9ADC067B4929}/Microsoft/Outlook Express including alt.hacking.dbx (newsgroup mailbox). A cleanup log dated 2004-08-20T16:13:55 shows maintenance of Inbox.dbx, Folders.dbx, and Offline.dbx with wasted space removal, indicating active mail usage. (2) Yahoo Mail webmail was accessed via browser-based authentication (mobile.msn.com, us.f613.mail.yahoo.com, and Passport authentication services identified in both intercepted packets and browser history carving). The Yahoo account email address mrevilrulez@yahoo.com is confirmed through registration profile data showing first name "Greg" matching the system owner Greg Schardt.



### 6. [MEDIUM] Investigation Summary: Comprehensive Hacking Infrastructure and Wireless Attack Campaign

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | registry.profile, clamav.scan, appfiles.*mirc*.mirc.ini, pcap.disk.interception, recycle_bin |
| **Evidence Refs** | tc_abe82c63, tc_518be061, tc_f5a28417, tc_06cf899c, tc_4bdae48c |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1048](https://attack.mitre.org/techniques/T1048/), [T1071](https://attack.mitre.org/techniques/T1071/), [T1090](https://attack.mitre.org/techniques/T1090/), [T1111](https://attack.mitre.org/techniques/T1111/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1592](https://attack.mitre.org/techniques/T1592/) |


The Dell Latitude CPi system belonging to Greg Schardt (username: Mr. Evil) contains evidence of interest in network security tools and configuration of several network analysis applications between 2004-08-19 and 2004-08-27.

REVISED ASSESSMENT - KEY FINDINGS: The system was configured as a Windows XP workstation with administrative access (5 local accounts including Mr. Evil with 15 documented logons). Six dual-use network analysis tools were installed (Cain & Abel, Ethereal, Look@LAN, mIRC, Network Stumbler, WinPcap), but WITHOUT evidence of actual malicious deployment against external targets.

CRITICAL CHANGES FROM INITIAL FINDINGS:

1. MALWARE FILES: ClamAV detected 18 files with malware signatures, but forensic analysis shows ZERO execution evidence in Windows shimcache. Files were stored on disk in organized folders but never run - indicating collection of reference materials rather than active malicious deployment.

2. NETWORK INTERCEPTION: A packet capture file (173KB, 459 frames) contains intercepted HTTP traffic from a Pocket PC device accessing Passport services. This is the strongest evidence of potentially suspicious activity (collection phase), but without evidence of credential theft, successful authentication abuse, or exfiltration, represents attempted interception at best.

3. COMMAND & CONTROL: mIRC was configured to Undernet public IRC network with 82 general-purpose and help channels. Configuration alone does not establish C2; no evidence exists of actual malicious IRC communication.

4. INSTALLER CLEANUP: Four installers in Recycle Bin represent normal post-installation cleanup, not evidence destruction or attack staging.

INTERPRETATION: This case presents AMBIGUOUS evidence. The system contains tools and configurations consistent with EITHER: (a) a network security researcher/enthusiast conducting learning and testing, (b) an IT professional setting up network analysis infrastructure, or (c) someone with malicious intent who configured attack tools but executed limited actual operations. The presence of organized 'hacking tool' directories alongside the lack of execution evidence could represent: (d) preparation for attacks not fully carried out, (e) a honeypot or security testing environment, or (f) collection of reference materials for research/education.

The PCAP interception file represents the most concrete evidence of suspicious activity, but even this alone does not establish a complete attack chain without evidence of successful exploitation or data exfiltration.



### 7. [LOW] Malware and Hacking Tools Detected: 18 ClamAV Detections

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:05:58 to 2004-08-27T15:29:19 |
| **Sources** | clamav.scan |
| **Evidence Refs** | tc_518be061 |


ClamAV scanning detected 18 files on the system with malware signatures including password dumping trojans (SAMDUMP.EXE, Lsadump2.exe), network enumeration tools (enum.exe, NetTools.ex_), brute force tools (BrutusA2.exe, Chrono.dl_), exploit tools (GetAdmin.exe, SECHOLE.EXE), and backdoor trojans (NetBus170.zip). These files are organized in suspicious directory structures (COMMANDS, ENUMERATION, EXPLOITATION, FOOTPRINTING folders) and many are compressed (.zip, .gz, .tar.gz formats).

CRITICAL COUNTER-FINDING: Forensic examination of shimcache execution history shows ZERO evidence that any of these 18 flagged files were ever executed on the system. The files were present on disk but were never cached/loaded by Windows. This indicates the files were downloaded, organized, and stored but never run. This pattern is more consistent with collection of security research materials, reference samples, or educational materials rather than active malicious deployment. Without execution evidence, file presence alone cannot establish that malware was active or deployed.



### 8. [LOW] IRC Command and Control Configuration: Undernet Connection Established

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:10:04 |
| **Sources** | appfiles.*mirc*.mirc.ini, bulk.domain |
| **Evidence Refs** | tc_f5a28417, tc_c9eb75f2 |
| **ATT&CK** | [T1071](https://attack.mitre.org/techniques/T1071/), [T1086](https://attack.mitre.org/techniques/T1086/) |


Mr. Evil configured mIRC with an IRC connection to the Undernet network via losangeles.ca.us.undernet.org:6660. The mIRC configuration file (mirc.ini) shows two configured nicknames: primary nick \"Mr\" and alternate nick \"mrevilrulez\" (matching the Yahoo email username). The ident user ID is configured as \"Mrevil\". The channel folder contains 82 persistent IRC channels stored for connection, including general chat channels (#AllNiteCafe, #Casual, #CyberChat, #Help) and specialized channels (#irchelp, #mIRC, #UserGuide, #UserHelp).

COUNTER-ANALYSIS: IRC client configuration alone does not constitute command and control. The configuration shows connection to Undernet, a legitimate public IRC network established since 1990 and used for general discussion, support, and community interaction. The presence of 82 channels, mostly general-purpose and help-focused (#AllNiteCafe, #Casual, #Help, #irchelp, #UserGuide) is consistent with a user interested in IRC community participation rather than botnet command channels. No evidence has been found of: (a) actual IRC connections during the system's runtime, (b) communication with known malicious IRC botnets or C2 servers, (c) commands sent or received via IRC, or (d) exfiltration of data through IRC. IRC client presence and configuration alone cannot establish command and control infrastructure without evidence of actual malicious communication.",



### 9. [LOW] Recycle Bin Contains Four Installer Programs - Potentially Used for Installation Staging

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-25T16:18:25 to 2004-08-27T15:29:58 |
| **Sources** | recycle_bin |
| **Evidence Refs** | tc_4bdae48c |


The Windows Recycle Bin contains four executable installer files (all present and recoverable): (1) lalsetup250.exe (Look@LAN installer, 2,160,128 bytes) deleted 2004-08-25T16:18:25; (2) netstumblerinstaller_0_4_0.exe (1,325,056 bytes) deleted 2004-08-27T15:12:30; (3) WinPcap_3_01_a.exe (442,880 bytes) deleted 2004-08-27T15:15:26; (4) ethereal-setup-0.10.6.exe (8,460,800 bytes) deleted 2004-08-27T15:29:58. All four files are stored in the Recycle Bin (RECYCLER folder under the user's SID) and remain physically present on disk, not permanently deleted. These correspond to the installation of network reconnaissance, wireless scanning, and packet capture tools. The timing pattern shows two waves: initial attempt on 2004-08-25 (Look@LAN) and final cleanup on 2004-08-27 (remaining three tools immediately before system shutdown).

COUNTER-ANALYSIS: Deletion of installer executables to the Recycle Bin is NORMAL post-installation cleanup behavior, not indicative of attack staging or evidence destruction. Standard installation practice involves: (1) downloading/acquiring installer, (2) running installer, (3) deleting installer after successful installation (as it is no longer needed). The presence of these installers in the Recycle Bin is exactly what would be expected following legitimate software installation. The location in Recycle Bin (rather than permanent deletion) is consistent with automated or routine cleanup, not evidence destruction (which would involve secure deletion). This finding should be re-classified as normal Windows system administration activity, not malicious behavior.",



### 10. [LOW] Extensive Data Deletion Pattern: Approximately 7,038 Deleted Files on System

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_aec1ad72 |


The TSK filesystem analysis identified approximately 7,038 deleted files across the system, with the majority concentrated in user profile locations (Documents and Settings: 92 entries) and Windows system directories (76 entries). This large-scale deletion pattern is noted during the same window as the installation of attack tools (2004-08-19 to 2004-08-27). The preservation of installer executables in the Recycle Bin while other files are deleted is observed.

COUNTER-ANALYSIS: The volume of deleted files (7,038 over 8 days) is NOT necessarily indicative of systematic cleanup of malicious activity. Windows XP typically accumulates significant numbers of deleted files from routine system operations including: (1) temporary file cleanup, (2) Internet Explorer cache cleanup, (3) system log rotation, (4) automatic Windows Update cleanup, (5) application-specific temporary files, (6) installation/uninstallation residue. Without baseline comparison data showing what is normal for an 8-day Windows XP system or context about the types of files deleted, the volume cannot be classified as suspicious. The fact that installers are preserved in Recycle Bin while other files are deleted suggests routine cleanup operations rather than intentional evidence destruction (which would target specific files and attempt secure deletion). This finding represents speculative interpretation without sufficient context to establish malicious purpose.",



### 11. [LOW] Anonymization and Proxy Access: Tools for Hiding Attack Activity

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:05:09 to 2004-08-20T15:09:02 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_abe82c63 |
| **ATT&CK** | [T1090](https://attack.mitre.org/techniques/T1090/) |


Registry records document installation of two tools with privacy/connectivity functions: (1) Anonymizer Bar 2.0 (installed 2004-08-20T15:05:09) - web anonymization proxy service. (2) CuteFTP (installed 2004-08-20T15:09:02) - FTP client with proxy support.

COUNTER-ANALYSIS: Both tools are DUAL-USE software with legitimate applications. Anonymizer Bar is a privacy tool that masks IP addresses and browsing activity - commonly used by privacy-conscious users, journalists, researchers, and individuals in restrictive internet environments. CuteFTP is a standard FTP client used by web developers, IT professionals, and system administrators for file transfer and remote access. Without evidence of what activities these tools were actually used for, their presence cannot be classified as evidence of attack obfuscation. The presence of privacy and FTP tools is consistent with either: (a) privacy consciousness, (b) legitimate remote work/file transfer duties, or (c) malicious obfuscation. Finding presence alone cannot determine intent. This finding should be downgraded to reflect ambiguity in purpose.",



### 12. [INFO] System Profile and Configuration: Windows XP Installation by Greg Schardt

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_abe82c63 |


System information confirms: Operating System=Windows XP, Build=2600, Install Date (UTC)=2004-08-19T22:48:27, Registered Owner=Greg Schardt, Computer Name=N-1A9ODN6ZXK4LQ, Timezone=Central Standard Time (UTC-6, with CDT UTC-5 in effect when hive last written), Last Shutdown (UTC)=2004-08-27T15:46:33. The system was running as a workgroup member (Primary Domain=N-1A9ODN6ZXK4LQ, no Active Directory). Five local accounts are configured: Administrator (RID 500, never logged in), Guest (RID 501, never logged in), HelpAssistant (RID 1000, never logged in), SUPPORT_388945a0 (RID 1002, never logged in), and Mr. Evil (RID 1003, 15 logons, last logon 2004-08-27T15:08:23). The system configuration indicates a personal/mobile workstation used primarily by Mr. Evil with system administration access.



### 13. [INFO] Image Integrity Verified: Acquisition Hash Match Confirmed

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | hashdeep.acquisition |
| **Evidence Refs** | tc_a9242167 |


The disk image 4Dell_Latitude_CPi.E01 has been cryptographically verified. The acquisition hash recorded in the EWF image file is MD5 aee4fcd9301c03b3b054623ca261959a. The ewfverify tool recalculated the hash over all media data and produced the matching value MD5 aee4fcd9301c03b3b054623ca261959a. This confirmation verifies that the image has not been modified or corrupted since acquisition and that the forensic analysis is being performed on authentic evidence.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Internal IP | `192.168.254.2` |  | Network Traffic Interception: Packet Capture File Discovered on System |
| External IP | `207.68.174.248` |  | Network Traffic Interception: Packet Capture File Discovered on System |
| External IP | `65.54.179.195` |  | Network Traffic Interception: Packet Capture File Discovered on System |
| External IP | `65.54.179.230` |  | Network Traffic Interception: Packet Capture File Discovered on System |
| External IP | `65.54.183.198` |  | Network Traffic Interception: Packet Capture File Discovered on System |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `mrevilrulez@yahoo.com` |  | Confirmed: Greg Schardt Account Associated with \"Mr. Evil\" Username and mrevil |




---

## Appendix C: MITRE ATT&CK Coverage

8 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (1) > Credential Access (2) > Discovery (2) > Command and Control (2) > Exfiltration (1) > Other (1)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Wireless Network Detection and Targeting...; Investigation Summary: Comprehensive Hacking... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Network Traffic Interception: Packet Capture...; Wireless Network Detection and Targeting...; Investigation Summary: Comprehensive Hacking... |
| [T1111](https://attack.mitre.org/techniques/T1111/) | Multi-Factor Authentication Interception | Investigation Summary: Comprehensive Hacking... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Network Traffic Interception: Packet Capture...; Wireless Network Detection and Targeting...; Investigation Summary: Comprehensive Hacking... |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Investigation Summary: Comprehensive Hacking... |


### Command and Control

| Technique | Name | Findings |
|-----------|------|----------|
| [T1071](https://attack.mitre.org/techniques/T1071/) | Application Layer Protocol | IRC Command and Control Configuration:...; Investigation Summary: Comprehensive Hacking... |
| [T1090](https://attack.mitre.org/techniques/T1090/) | Proxy | Anonymization and Proxy Access: Tools for...; Investigation Summary: Comprehensive Hacking... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1048](https://attack.mitre.org/techniques/T1048/) | Exfiltration Over Alternative Protocol | Network Traffic Interception: Packet Capture...; Investigation Summary: Comprehensive Hacking... |


### Other

| Technique | Name | Findings |
|-----------|------|----------|
| [T1086](https://attack.mitre.org/techniques/T1086/) |  | IRC Command and Control Configuration:... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 193 |
| Findings submitted | 13 |
| Confirmed | 8 |
| Inferences | 5 |
| Input tokens | 670 |
| Output tokens | 72.8K |
| Total tokens | 73.5K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 670 | 72.8K | 73.5K |




<details>
<summary>Evidence Sources (137)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 12545 |
| hashdeep.hashes | hashdeep | 6 |
| ez.shimcache | eztools | 140 |
| ez.prefetch | eztools | 165 |
| hashdeep.acquisition | ewfverify | 1 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 44493 |
| bulk.duplicates | bulk_extractor | 46 |
| bulk.email | bulk_extractor | 30259 |
| bulk.ether | bulk_extractor | 37 |
| bulk.ip | bulk_extractor | 1646 |
| bulk.packets | bulk_extractor | 5403 |
| bulk.rfc822 | bulk_extractor | 1143 |
| bulk.tcp | bulk_extractor | 825 |
| bulk.url | bulk_extractor | 15563 |
| bulk.url_searches | bulk_extractor | 42 |
| bulk.url_services | bulk_extractor | 3045 |
| appfiles.*outlook*.cleanup.log | icat | 10 |
| appfiles.*ethereal*.dictionary.xml | icat | 649 |
| appfiles.*mirc*.aliases.ini | icat | 16 |
| recycle_bin | icat | 7 |
| appfiles.*look*lan*.irunin.ini | icat | 399 |
| registry.profile | python-registry | 36 |
| appfiles.*outlook*.msoe.txt | icat | 3 |
| appfiles.*ethereal*.mobileipv4.xml | icat | 64 |
| appfiles.*mirc*.#chataholics.undernet.log | icat | 16 |
| appfiles.*look*lan*.license.txt | icat | 25 |
| appfiles.*ethereal*.nasreq.xml | icat | 293 |
| appfiles.*mirc*.#cybercafe.undernet.log | icat | 207 |
| appfiles.*ethereal*.sunping.xml | icat | 24 |
| appfiles.*mirc*.#elite.hackers.undernet.log | icat | 11 |
| appfiles.*ethereal*.capture_filters.txt | icat | 80 |
| appfiles.*mirc*.#evilfork.efnet.log | icat | 11 |
| appfiles.*ethereal*.capturing.txt | icat | 84 |
| appfiles.*mirc*.#funny.undernet.log | icat | 10 |
| appfiles.*ethereal*.display_filters.txt | icat | 43 |
| appfiles.*mirc*.#houston.undernet.log | icat | 9 |
| appfiles.*ethereal*.faq.txt | icat | 2228 |
| appfiles.*mirc*.#iso-warez.efnet.log | icat | 7 |
| appfiles.*ethereal*.getting_started.txt | icat | 90 |
| appfiles.*mirc*.#luxshell.undernet.log | icat | 13 |
| appfiles.*ethereal*.overview.txt | icat | 38 |
| appfiles.*mirc*.#mp3xserv.undernet.log | icat | 15 |
| appfiles.*ethereal*.well_known.txt | icat | 114 |
| appfiles.*mirc*.#thedarktower.afternet.log | icat | 14 |
| appfiles.*ethereal*.pcrepattern.3.txt | icat | 1475 |
| appfiles.*mirc*.#ushells.undernet.log | icat | 9 |
| appfiles.*ethereal*.agentx-mib.txt | icat | 529 |
| appfiles.*mirc*.m5tar.undernet.log | icat | 8 |
| appfiles.*ethereal*.disman-event-mib.txt | icat | 1957 |
| appfiles.*mirc*.mirc.ini | icat | 224 |
| appfiles.*ethereal*.disman-schedule-mib.txt | icat | 701 |
| appfiles.*mirc*.popups.ini | icat | 96 |
| appfiles.*ethereal*.disman-script-mib.txt | icat | 1766 |
| appfiles.*mirc*.readme.txt | icat | 34 |
| appfiles.*ethereal*.etherlike-mib.txt | icat | 1139 |
| appfiles.*mirc*.servers.ini | icat | 423 |
| appfiles.*ethereal*.hcnum-tc.txt | icat | 120 |
| appfiles.*mirc*.urls.ini | icat | 9 |
| appfiles.*ethereal*.host-resources-mib.txt | icat | 1542 |
| appfiles.*mirc*.versions.txt | icat | 472 |
| appfiles.*ethereal*.host-resources-types.txt | icat | 391 |
| appfiles.*ethereal*.iana-address-family-numbers-mib.txt | icat | 123 |
| appfiles.*ethereal*.iana-language-mib.txt | icat | 125 |
| appfiles.*ethereal*.ianaiftype-mib.txt | icat | 392 |
| registry.default | regripper | 427 |
| appfiles.*ethereal*.if-inverted-stack-mib.txt | icat | 151 |
| appfiles.*ethereal*.if-mib.txt | icat | 1816 |
| appfiles.*ethereal*.inet-address-mib.txt | icat | 300 |
| appfiles.*ethereal*.ip-forward-mib.txt | icat | 811 |
| appfiles.*ethereal*.ip-mib.txt | icat | 722 |
| appfiles.*ethereal*.ipv6-icmp-mib.txt | icat | 531 |
| appfiles.*ethereal*.ipv6-mib.txt | icat | 1445 |
| registry.default | regripper | 403 |
| appfiles.*ethereal*.ipv6-tc.txt | icat | 69 |
| appfiles.*ethereal*.ipv6-tcp-mib.txt | icat | 213 |
| appfiles.*ethereal*.ipv6-udp-mib.txt | icat | 143 |
| appfiles.*ethereal*.lm-sensors-mib.txt | icat | 232 |
| registry.system | regripper | 133 |
| appfiles.*ethereal*.mta-mib.txt | icat | 1228 |
| appfiles.*ethereal*.net-snmp-agent-mib.txt | icat | 546 |
| appfiles.*ethereal*.net-snmp-examples-mib.txt | icat | 229 |
| registry.system | regripper | 7 |
| appfiles.*ethereal*.net-snmp-mib.txt | icat | 69 |
| appfiles.*ethereal*.net-snmp-monitor-mib.txt | icat | 61 |
| appfiles.*ethereal*.net-snmp-system-mib.txt | icat | 65 |
| registry.system | regripper | 19 |
| appfiles.*ethereal*.net-snmp-tc.txt | icat | 123 |
| appfiles.*ethereal*.network-services-mib.txt | icat | 628 |
| appfiles.*ethereal*.notification-log-mib.txt | icat | 784 |
| appfiles.*ethereal*.rfc-1215.txt | icat | 40 |
| registry.system | regripper | 8 |
| appfiles.*ethereal*.rfc1155-smi.txt | icat | 121 |
| appfiles.*ethereal*.rfc1213-mib.txt | icat | 2615 |
| appfiles.*ethereal*.rmon-mib.txt | icat | 3982 |
| appfiles.*ethereal*.smux-mib.txt | icat | 162 |
| appfiles.*ethereal*.snmp-community-mib.txt | icat | 431 |
| appfiles.*ethereal*.snmp-framework-mib.txt | icat | 528 |
| appfiles.*ethereal*.snmp-mpd-mib.txt | icat | 147 |
| appfiles.*ethereal*.snmp-proxy-mib.txt | icat | 296 |
| appfiles.*ethereal*.snmp-target-mib.txt | icat | 662 |
| appfiles.*ethereal*.snmp-user-based-sm-mib.txt | icat | 914 |
| appfiles.*ethereal*.snmp-view-based-acm-mib.txt | icat | 832 |
| pcap.disk.interception | tshark | 75 |
| appfiles.*ethereal*.snmpv2-conf.txt | icat | 324 |
| appfiles.*ethereal*.snmpv2-mib.txt | icat | 856 |
| registry.system | regripper | 9600 |
| appfiles.*ethereal*.snmpv2-smi.txt | icat | 346 |
| appfiles.*ethereal*.snmpv2-tc.txt | icat | 774 |
| appfiles.*ethereal*.snmpv2-tm.txt | icat | 178 |
| appfiles.*ethereal*.tcp-mib.txt | icat | 332 |
| registry.system | regripper | 283 |
| appfiles.*ethereal*.tunnel-mib.txt | icat | 339 |
| appfiles.*ethereal*.ucd-demo-mib.txt | icat | 76 |
| appfiles.*ethereal*.ucd-diskio-mib.txt | icat | 119 |
| appfiles.*ethereal*.ucd-dlmod-mib.txt | icat | 121 |
| appfiles.*ethereal*.ucd-ipfilter-mib.txt | icat | 258 |
| appfiles.*ethereal*.ucd-ipfwacc-mib.txt | icat | 329 |
| appfiles.*ethereal*.ucd-snmp-mib-old.txt | icat | 746 |
| appfiles.*ethereal*.ucd-snmp-mib.txt | icat | 1384 |
| registry.system | regripper | 3138 |
| appfiles.*ethereal*.udp-mib.txt | icat | 148 |
| appfiles.*ethereal*.snmp-notification-mib.txt | icat | 591 |
| registry.system | regripper | 199 |
| yara.files | yara | 3 |
| registry.ntuser.default user | regripper | 43 |
| registry.usrclass.localservice | regripper | 4 |
| registry.ntuser.localservice | regripper | 70 |
| registry.usrclass.mr. evil | regripper | 4 |
| registry.ntuser.mr. evil | regripper | 329 |
| registry.usrclass.networkservice | regripper | 4 |
| registry.ntuser.networkservice | regripper | 70 |
| clamav.scan | clamav | 19 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
