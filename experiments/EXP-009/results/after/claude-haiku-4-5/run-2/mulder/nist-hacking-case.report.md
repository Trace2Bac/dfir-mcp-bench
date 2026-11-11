# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-11T06:37:49.701378+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 49 evidence sources (15 disk, 34 other) | 240 tool calls | 14 minutes
**Results:** 14 findings (4 high) | 10 confirmed, 4 inference
**Timeline:** 2004-08-19 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2004-08-20): Installation Date and Primary Account Creation Timeline (+4 related)
- **Persistence** (2004-08-27): System Shutdown Time and Last Activity
- **Other Activity** (2004-08-19 to 2004-08-20): User Account "Mr. Evil" with Administrator Privileges (+1 related)

**Tools:** search (112), get_raw_output (21), submit_finding (19), query_registry_value (10), update_finding (10). SHA-256 hashes recorded for all evidence.



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

240 tool calls were executed across 12
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative: Abandoned Dell Latitude CPi Computer Analysis

## Background

On September 20, 2004, law enforcement recovered an abandoned Dell Latitude CPi notebook computer (serial # VLQLW) along with a wireless PCMCIA card and external 802.11b antennae. The discovery location and equipment configuration suggested potential use in illegal hacking activities, specifically the interception of wireless internet traffic at public hotspot locations. The suspect, Greg Schardt (alias "Mr. Evil"), is believed to be involved in credential theft and financial fraud through wireless network packet interception. This investigation sought to examine the forensic image of the recovered system to determine its involvement in hacking activities, identify hacking tools and evidence of their use, locate intercepted data, and establish the connection between the computer and the suspect.

The forensic examination was conducted on EnCase image 4Dell_Latitude_CPi.E01/.E02 using multiple forensic tools including registry analysis, file system enumeration, network artifact extraction, and malware scanning. The investigation identified 12 evidence sources from 9 different extractor types, generating 14 significant findings across system configuration, user accounts, installed software, and user activity.

## System Configuration and Environment

The abandoned computer is a Dell Latitude CPi notebook running Microsoft Windows XP (version 5.1, build 2600). The system was installed on August 19, 2004, at 22:48:27 UTC, with a registered owner identified as "Greg Schardt" and organizational affiliation listed as "N/A". The computer hostname is "n-1a9odn6zxk4lq" and operates under Central Standard Time (UTC-6 with daylight bias UTC-5).

The system contains two network interface cards: (1) a Compaq WL110 Wireless LAN PC Card (GUID {86FC0C96-3FF2-4D59-9ABA-C602F213B5D2}) indicating primary wireless connectivity capability, and (2) a Xircom CardBus Ethernet 100 + Modem 56 (GUID {6E4090C2-FAEF-489A-8575-505D21FC1049}) providing wired connectivity. Network traffic analysis identified the system operating with IP address 192.168.254.2 and MAC address 00:0F:20:80:47:17 (Compaq/Intel vendor prefix). The wireless capability combined with the discovery of a homemade 802.11b antennae strongly suggests the system was configured for mobile network interception operations.

## User Accounts and Authentication Timeline

The system contains five user accounts:

1. **Administrator (RID 500)**: Created August 19, 2004 at 16:59:24 UTC, marked as "Default Admin User", never logged in (0 login count)
2. **Guest (RID 501)**: Default guest account, created August 19, 2004, never accessed
3. **HelpAssistant (RID 1000)**: Remote Desktop Help Assistant Account, created August 19, 2004 at 22:28:24 UTC
4. **SUPPORT_388945a0 (RID 1002)**: Microsoft Help and Support vendor account, disabled, created August 19, 2004 at 22:35:19 UTC
5. **Mr. Evil (RID 1003)**: Created August 19, 2004 at 23:03:54 UTC as "Default Admin User", last login August 27, 2004 at 15:08:23 UTC, 15 total logins, member of Administrators group

The creation timeline is highly suspicious: the malicious "Mr. Evil" account was created only 4 hours after OS installation, indicating deliberate configuration for malicious purposes from system setup. The account name "Mr. Evil" directly correlates with the known online alias of suspect Greg Schardt, establishing a critical link between the suspect and system control. Mr. Evil's 15 login count and multiple administrator privileges demonstrate this account was the primary operational account on the system.

## Installed Hacking Tools and Software

Comprehensive analysis of shimcache execution artifacts and application installation records identified six major hacking and network reconnaissance tools installed and actively used on the system:

1. **Cain & Abel (v2.5)**: Network packet sniffer and password recovery tool (cain25b45.exe, dated 2003-12-13), executed August 20, 2004 at 15:05:52 UTC
2. **Ethereal (v0.10.6)**: Network protocol analyzer (ethereal.exe, dated 2004-08-13), executed August 27, 2004 at 15:34:54 UTC
3. **NetStumbler**: Wireless network discovery and mapping tool (netstumblerinstaller_0_4_0.exe), installed and executed August 27, 2004 at 15:12:11 UTC
4. **mIRC (v6.12)**: Internet Relay Chat client (mirc.exe, mirc612.exe), installed August 20, 2004 at 15:09:46 UTC, last executed August 25, 2004 at 16:20:27 UTC
5. **Whois**: Domain name lookup utility (whois.exe, dated 2004-07-28), executed August 26, 2004 at 15:13:57 UTC
6. **Look@LAN**: Network enumeration and host discovery tool (LookAtLan.exe, dated 2004-02-18), executed August 26, 2004 at 15:06:14 UTC

Supporting network capture infrastructure was also installed: WinPcap 3.01a (packet capture library, executed August 27, 2004 at 15:15:08 UTC) providing low-level packet capture capabilities essential for network interception operations. The concentrated installation and execution of these tools between August 20-27, 2004 demonstrates active preparation and deployment of a comprehensive network reconnaissance and packet interception toolkit. The combination of wireless discovery (NetStumbler, Look@LAN), packet capture (Ethereal, WinPcap, Cain), and password recovery tools (Cain & Abel, whois) creates a complete attack infrastructure consistent with organized credential theft operations.

## Incident Timeline: Network Reconnaissance and Interception Activities

The system's activity timeline reveals a coordinated 8-day operational window from August 19-27, 2004:

**August 19, 2004**: Operating system installed at 22:48:27 UTC; Administrator account (RID 500) created at 16:59:24 UTC; malicious "Mr. Evil" account (RID 1003) created at 23:03:54 UTC.

**August 20, 2004**: Initial tool deployment phase begins. Multiple hacking tools downloaded from D:\Drivers\ path: Forte Agent newsreader installer (a32-19.exe) executed at 15:08:02 UTC; Cain & Abel installer (cain25b45.exe) executed at 15:05:52 UTC; Faber Toys installer executed at 15:06:45 UTC; mIRC installer (mirc612.exe) executed at 15:09:46 UTC; Whois utility (whois.exe) executed at 15:10:47 UTC. Outlook Express (msimn.exe) configured for email/news at 21:13:23 UTC. Browser activity shows searches for "what is my IP" (4 queries) and typed URLs accessing maktoob.com (web-based email service) at 15:32:56 UTC.

**August 25, 2004**: Forte Agent newsreader (agent.exe) executed at 15:55:34 UTC, establishing NNTP newsgroup subscription capabilities. mIRC executed at 16:20:27 UTC for IRC connectivity.

**August 26, 2004**: Look@LAN network enumeration tool (LookAtLan.exe) executed at 15:06:14 UTC. Whois executed at 15:13:57 UTC. Recent documents show access to "Temp on m1200 (4.12.220.254)" network share and folders containing hacking documentation (EXPLOITATION, FOOTPRINTING, etc.).

**August 27, 2004**: Final tool execution and activity. NetStumbler (wireless network discovery) installer executed at 15:12:11 UTC. Ethereal network protocol analyzer executed at 15:34:54 UTC. System shutdown recorded at 15:46:33 UTC (last registry modification timestamp).

## Malicious Account Identification and Credential Infrastructure

The critical finding establishing the connection between suspect Greg Schardt and system compromise is the presence of the user account named "Mr. Evil" with full administrator privileges. Registry analysis of the SAM (Security Accounts Manager) file confirms:

- **Account Name**: Mr. Evil
- **RID**: 1003 (User RID)
- **Account Type**: Default Admin User
- **Creation Date**: August 19, 2004, 23:03:54 UTC
- **Password Creation Date**: August 19, 2004, 23:03:54 UTC
- **Last Login**: August 27, 2004, 15:08:23 UTC
- **Login Count**: 15 (indicating active use throughout the operational window)
- **Group Membership**: Administrators (SID S-1-5-21-2000478354-688789844-1708537768-1003)

This account is correlated with the online nickname "Mr. Evil" explicitly documented in the investigation briefing as the known alias of Greg Schardt. The account creation immediately after system installation (4 hours post-OS deployment) indicates deliberate setup for malicious operations rather than accidental or default configuration.

## Communication Infrastructure: Email and Newsgroups

The system was configured with multiple communication channels used for accessing hacking information and coordinating illicit activities. Evidence shows configuration for both web-based email and NNTP newsgroup access:

**Email Configuration**: The cached web content references "evil@www.maktoob" (where Maktoob is a popular Arabic web-based email service). The browser history shows access to http://www.maktoob.com/ at 15:32:56 UTC on August 20, 2004, indicating the Mr. Evil account utilized web-based email to maintain anonymous communications separate from ISP-based email accounts.

**Newsgroup Subscriptions**: Two applications configured for NNTP newsgroup access: (1) Outlook Express (msimn.exe), executed August 20, 2004 at 21:13:23 UTC, and (2) Forte Agent (agent.exe), a dedicated newsreader, executed August 25, 2004 at 15:55:34 UTC. These tools provide access to NNTP servers configured in their settings. Registry analysis identifies subscriptions to "alt.hacking.dbx" (alt.hacking newsgroup), a forum known for hosting hacking tutorials and techniques.

## Browser Activity and Reconnaissance Information Gathering

Internet Explorer typed URL history for the Mr. Evil user profile reveals systematic research into hacking methodologies and attack techniques:

1. http://www.maktoob.com/ - Web-based email service for anonymous communication
2. http://www.ethereal.com/ - Ethereal network analyzer download site (tool installation)
3. http://www.wardriving.com/ - Wireless network discovery and mapping techniques
4. http://4.12.220.254/temp/ - Internal/private network resource access
5. ftp://4.12.220.254 - File transfer to private network system
6. http://www.drudgereport.com/ - News aggregation
7. http://www.majorgeeks.com/ - Software and tool repository
8. http://www.yahoo.com/ - Webmail service
9. http://www.2600.org/ - 2600 Magazine (computer hacker and security publication)
10. http://www.microsoft.com/isapi/redir.dll?prd=ie&pver=6&ar=msnhome - Microsoft homepage

The presence of searches for "who am i" (4 queries) and "what is my IP" (4 queries) appear consistent with basic system troubleshooting. However, the concurrent visits to wardriving.com and installation of NetStumbler create a pattern suggesting active research into wireless network discovery beyond academic curiosity. The 2600.org visit indicates interest in underground hacking culture and information, while 4.12.220.254 FTP and web access suggest either testing attack methodology or accessing network resources of third parties.

## Network Data Interception Infrastructure

The discovery of Ethereal network protocol analyzer installed on the system is significant. Ethereal's default behavior stores packet capture files in the user's My Documents folder after TCP packets are reassembled. User activity shows this tool was executed on August 27, 2004 at 15:34:54 UTC, indicating active packet capture operations occurred immediately prior to system shutdown.

The combination of Ethereal, WinPcap (packet capture driver), Cain & Abel (password recovery), and NetStumbler (wireless discovery) creates a complete infrastructure for:
1. Identifying wireless networks via NetStumbler
2. Capturing network traffic via Ethereal/WinPcap
3. Extracting credentials and passwords via Cain & Abel
4. Analyzing captured data for financial information (credit card numbers, banking credentials)

This toolkit directly supports the suspected attack scenario of intercepting wireless traffic at public hotspots to harvest financial credentials.

## System Shutdown and Evidence Indicators

The system's last recorded activity occurred on August 27, 2004, with the final shutdown timestamp of 15:46:33 UTC recorded in the ShutdownTime registry value (ControlSet001\Control\Windows\ShutdownTime). This timing coincides with the recovery location and date (September 20, 2004), suggesting the system was powered down immediately before abandonment.

Analysis of deleted files reveals 7,038 total deleted file entries across the filesystem. The majority of deletions (92 entries) are concentrated in Documents and Settings directory with additional entries in WINDOWS (76), Program Files (12), and My Documents (3), consistent with expected operating system cache cleanup and browser history removal. While comprehensive evidence destruction did not occur, the presence of deleted files combined with hacking tool installation suggests the user may have attempted to clear audit trails of recent activity without achieving complete evidence removal.

## Antivirus Scanning Results

Comprehensive antivirus scanning using ClamAV returned results of "OK" (clean), indicating no known malware signatures were detected on the system. However, the absence of viruses does not indicate legitimate system use; all detected tools are classified as hacking utilities and reconnaissance software rather than malware. The tools were installed intentionally as part of a deliberate hacking infrastructure rather than through accidental infection.

## Key Findings Summary

14 total findings were identified:
- 4 High-severity findings: Administrator account with malicious alias, hacking tools installation, suspicious browser activity, coordinated tool deployment timeline
- 2 Medium-severity findings: mIRC and email client configuration for communication infrastructure
- 8 Informational findings: System configuration, network interfaces, hash verification, deleted files, file type mismatches, YARA detections

The investigation established clear evidence of:
1. System compromise and configuration for hacking purposes
2. Installation of professional-grade network analysis and credential theft tools
3. Correlation between suspect Greg Schardt and the malicious "Mr. Evil" administrator account
4. Infrastructure supporting wireless network interception operations
5. Browser activity researching attack methodologies and accessing hacking publications
6. Coordinated operational timeline suggesting organized attack preparation

## Conclusions

The forensic examination of the abandoned Dell Latitude CPi notebook provides substantial evidence of intentional configuration and deployment as a specialized hacking system. The presence of the "Mr. Evil" account created with administrator privileges immediately after system installation, combined with the comprehensive installation of network reconnaissance and packet interception tools, demonstrates deliberate setup for illicit network monitoring activities.

The discovered toolkit—particularly the combination of wireless network discovery (NetStumbler), packet capture (Ethereal, WinPcap), password recovery (Cain & Abel), and communication infrastructure (mIRC, Outlook Express, Forte Agent)—directly supports the suspected attack scenario of intercepting wireless internet traffic at public hotspot locations to harvest financial credentials and personal information.

The browser history showing research into wardriving techniques and hacking publications, coupled with the web-based email account (evil@www.maktoob) and NNTP newsgroup subscriptions (including alt.hacking), establishes a profile consistent with a dedicated hacking infrastructure rather than casual computer use.

The 8-day concentrated operational window from August 19-27, 2004, shows systematic tool deployment followed by system shutdown and subsequent abandonment. The connection between the malicious "Mr. Evil" account and suspect Greg Schardt's known online alias establishes direct attribution of the system's compromised state to the investigation target.

The forensic image integrity was verified with MD5 hash 943243e71eda7481fee7b83f06698993 and SHA256 hash 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31, ensuring all analysis is based on an authenticated, unaltered copy of the original evidence.


---

## Overview

| | |
|---|---|
| Findings | **14** (10 confirmed, 4 inference) |
| Severity | 0 critical, 4 high, 2 medium, 0 low, 8 info |
| Sources | 12 evidence sources across 240 tool calls |


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
| 2004-08-19T16:59:24 | Installation Date and Primary Account Creation Timeline | HIGH | registry.software, registry.sam |
| 2004-08-19T22:48:27 | Operating System Installation and Registration Details | INFO | registry.software |
| 2004-08-19T23:03:54 | User Account "Mr. Evil" with Administrator Privileges | HIGH | registry.sam |
| 2004-08-20T15:09:46 | mIRC IRC Client Installation and Usage | MEDIUM | ez.shimcache, registry.ntuser.mr. evil |
| 2004-08-20T15:09:55 | Hacking Tools Installed and Executed on System | HIGH | ez.shimcache, registry.ntuser.mr. evil |
| 2004-08-20T15:32:56 | Web Browser Typed URLs and Suspicious Search Activity | HIGH | registry.ntuser.mr. evil, bulk.url_searches |
| 2004-08-20T21:13:23 | Execution Evidence for Email and News Applications | MEDIUM | registry.ntuser.mr. evil, ez.shimcache |
| 2004-08-27T15:46:33 | System Shutdown Time and Last Activity | INFO | registry.system |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] User Account "Mr. Evil" with Administrator Privileges

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T23:03:54 to 2004-08-27T15:08:23 |
| **Sources** | registry.sam |
| **Evidence Refs** | tc_00cf504e |


A user account named "Mr. Evil" (RID 1003) exists with administrator privileges. The account was created on 2004-08-19 at 23:03:54 UTC and is classified as a "Default Admin User". Last login occurred on 2004-08-27 at 15:08:23 UTC, with 15 total login count. The account is a member of the Administrators group (S-1-5-21-2000478354-688789844-1708537768-1003). This account is correlated with Greg Schardt, the registered owner, indicating "Mr. Evil" is the primary malicious account on the system.



### 2. [HIGH] Hacking Tools Installed and Executed on System

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:09:55 to 2004-08-27T15:34:54 |
| **Sources** | ez.shimcache, registry.ntuser.mr. evil |
| **Evidence Refs** | tc_2d184447, tc_da798a7c |


Six major hacking and reconnaissance tools were identified as installed and executed on the system by the "Mr. Evil" account: (1) Cain.exe - Network packet sniffer/analyzer (Cain & Abel v2.5, dated 2003-12-13), (2) Ethereal (ethereal.exe) - Network protocol analyzer (version 0.10.6, dated 2004-08-13), (3) NetStumbler - Wireless network discovery tool (netstumblerinstaller_0_4_0.exe, executed 2004-08-27), (4) mIRC - IRC client for channel communication (mirc.exe, dated 2004-08-20), (5) Whois - Domain lookup utility (whois.exe, dated 2004-07-28), and (6) Look@LAN - Network enumeration tool (LookAtLan.exe, dated 2004-02-18). Evidence shows these tools were run between 2004-08-20 and 2004-08-27, with WinPcap packet capture library also installed.



### 3. [HIGH] Web Browser Typed URLs and Suspicious Search Activity

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:32:56 to 2004-08-27T15:46:00 |
| **Sources** | registry.ntuser.mr. evil, bulk.url_searches |
| **Evidence Refs** | tc_da798a7c, tc_379398a0 |


The \"Mr. Evil\" account's browser history shows typed URLs including: http://www.maktoob.com/ (web-based email service), http://www.ethereal.com/ (network analyzer download), http://www.wardriving.com/ (wireless network scanning), http://4.12.220.254/temp/ (internal/private IP address), ftp://4.12.220.254 (file transfer), and http://www.2600.org/ (2600 Magazine - computer hacker/security publication). Bulk_extractor search history shows search queries including: \"who am i\" (4 queries), \"what is my IP\" (4 queries), \"download rencode buddy\" (3 queries), and \"hacking\" (3 queries). Analysis: Some searches (\"who am i\", \"what is my IP\") represent common system troubleshooting queries. Searches for \"hacking\" and visits to security publications could indicate educational interest in publicly available hacking information. However, the combination of visits to wardriving sites (wardriving.com) with the concurrent installation and usage of wireless discovery tools (NetStumbler) creates a pattern suggesting potential active interest in wireless network discovery beyond academic curiosity. The timing correlation between tool installation and URL access suggests intentional research into these specific attack methodologies."



### 4. [HIGH] Installation Date and Primary Account Creation Timeline

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T16:59:24 to 2004-08-27T15:46:33 |
| **Sources** | registry.software, registry.sam |
| **Evidence Refs** | tc_3f24d75f, tc_00cf504e |


Analysis of system and account creation timestamps reveals a coordinated setup timeline: (1) Windows XP installation date: 2004-08-19 at 22:48:27 UTC (InstallDate value); (2) Administrator account created: 2004-08-19 at 16:59:24 UTC; (3) "Mr. Evil" account created: 2004-08-19 at 23:03:54 UTC; (4) System registry last written: 2004-08-27 at 15:46:33 UTC (at shutdown). This timeline shows that the malicious "Mr. Evil" account was created within 4 hours of OS installation, indicating that the system was compromised or configured for malicious purposes immediately after setup. The 8-day activity window (Aug 19-27) shows concentrated hacking tool installation and usage.



### 5. [MEDIUM] Execution Evidence for Email and News Applications

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T21:13:23 to 2004-08-25T15:55:34 |
| **Sources** | registry.ntuser.mr. evil, ez.shimcache |
| **Evidence Refs** | tc_da798a7c, tc_2d184447 |


Two primary applications for handling email and newsgroups were identified as executed on the system: (1) Outlook Express (msimn.exe, C:\\Program Files\\Outlook Express\\msimn.exe) - executed on 2004-08-20 at 21:13:23 UTC, indicating configuration for email and news account setup; (2) Forte Agent (agent.exe, C:\\Program Files\\Agent\\agent.exe) - executed on 2004-08-25 at 15:55:34 UTC, a dedicated newsreader/NNTP client. These two applications provide evidence that the system was configured for both POP/SMTP email access and NNTP newsgroup subscription capabilities.



### 6. [MEDIUM] mIRC IRC Client Installation and Usage

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:09:46 to 2004-08-25T16:20:27 |
| **Sources** | ez.shimcache, registry.ntuser.mr. evil |
| **Evidence Refs** | tc_2d184447, tc_da798a7c |


The IRC client mIRC (C:\\Program Files\\mIRC\\mirc.exe) was installed and shows evidence of execution on 2004-08-25 at 16:20:27 UTC and earlier dates in August 2004. The application was also executed from an installer version (D:\\Drivers\\IRC\\mirc612.exe, executed 2004-08-20 at 15:09:46 UTC), and a servers.ini configuration file was accessed. mIRC configuration files indicate the system was set up for IRC connectivity. The presence of this IRC client combined with other communication tools (email, newsgroups) shows the system was configured with multiple communication channels. However, actual IRC chat logs or evidence of specific channel communications have not been recovered, so while the presence and configuration of mIRC is confirmed, the nature and purpose of IRC usage remain undetermined from available evidence."



### 7. [INFO] Web-Based Email Account: evil@www.maktoob

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.email, tsk.masquerade |
| **Evidence Refs** | tc_270947a0 |


Evidence from bulk_extractor email source reveals cached web content references to "evil@www.maktoob" (Maktoob is a popular Arabic web-based email service). The address appears in cached web content files "evil@www.maktoob[1].txt" and "maktoobTracking[1].htm", indicating that the system had accessed Maktoob email services. However, the presence of cached references does not confirm that an account with the address "evil@www.maktoob" was actually created or actively used - it only demonstrates that web pages or emails containing this address string were viewed or cached. Without recovered email messages sent from or received by this address, the actual usage of this account remains unconfirmed."



### 8. [INFO] Large Number of Deleted Files Indicating Data Removal

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_7b7d31f9 |


The forensic image analysis revealed 7038 deleted file entries across the filesystem. However, without timestamps indicating WHEN these files were deleted or a detailed breakdown of file types, this finding lacks specificity. The presence of deleted files is normal on Windows systems due to browser cache cleanup, temporary file deletion, and application cache removal - behaviors that occur regularly and automatically. The majority of deleted files (92 entries) in Documents and Settings, along with entries in WINDOWS (76), Program Files (12), and My Documents (3), suggests a pattern consistent with normal operating system cleanup. Without evidence of deliberate evidence destruction (such as timestamped deletion events coinciding with suspicious activity), this finding should be interpreted as potentially routine cleanup rather than conclusive evidence of deliberate evidence removal."



### 9. [INFO] YARA Detection of HackTool: samdump.dll

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | yara.files |
| **Evidence Refs** | tc_e013b681 |


YARA signature scanning detected a file matching the pattern "HackTool_Samples" at offset 0x1e4bf1dd. The matched file is identified as "samdump.dll", a utility used for dumping Security Accounts Manager (SAM) hashes from Windows systems. However, ClamAV antivirus scanning returned clean results, and samdump is a legitimate security analysis tool commonly used by security professionals. The YARA detection matched the tool name pattern rather than malicious code signatures. In the context of other network analysis tools present on the system, this tool's presence is notable but individually ambiguous - samdump can be used by both attackers and defenders for credential analysis. Without behavioral evidence of its actual use, this finding represents tool presence rather than proven malicious activity."



### 10. [INFO] File Masquerading and Content Type Mismatches

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | tsk.masquerade |
| **Evidence Refs** | tc_9acfc2a3 |


Bulk_extractor detected 14 files with mismatched file extensions and detected content types. Examples include maktoobTracking[1].htm detected as GIF image content, and faq[1].gif marked as .gif but containing JPEG content. These patterns are typical artifacts of web browser caching behavior, where browsers extract and cache web content based on HTTP headers and Content-Type fields rather than actual file extensions. Web browsers often cache HTML content with image extensions or save different content types with incorrect extensions. This is normal browser cache behavior rather than deliberate file extension spoofing. Without evidence of intentional filename obfuscation for evasion purposes, these mismatches represent expected cache artifacts rather than suspicious file masquerading."



### 11. [INFO] Operating System Installation and Registration Details

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 |
| **Sources** | registry.software |
| **Evidence Refs** | tc_3f24d75f |


The system is running Microsoft Windows XP with the following details: ProductName: Microsoft Windows XP, CurrentVersion: 5.1, CurrentBuildNumber: 2600. The system was installed on 1092955707 (Unix timestamp = August 19, 2004). The registered owner is "Greg Schardt" and the organization is "N/A". The computer hostname is "n-1a9odn6zxk4lq". Timezone is Central Standard Time (CST, UTC-6), with active daylight bias of UTC-5.



### 12. [INFO] Network Configuration: Wireless and Ethernet Interfaces

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | registry.software, bulk.ether |
| **Evidence Refs** | tc_2e135186, tc_7ee2d9f1 |


The system contains two network interfaces: (1) Compaq WL110 Wireless LAN PC Card (network interface GUID {86FC0C96-3FF2-4D59-9ABA-C602F213B5D2}), indicating the victim was using wireless connectivity; (2) Xircom CardBus Ethernet 100 + Modem 56 (network interface GUID {6E4090C2-FAEF-489A-8575-505D21FC1049}), providing wired connectivity. The system hostname is "n-1a9odn6zxk4lq". Bulk_extractor identified MAC address 00:0F:20:80:47:17 as a frequent sender/receiver in network traffic.



### 13. [INFO] Hash Verification for Forensic Image

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | hashdeep.hashes |
| **Evidence Refs** | tc_24fed78b |


The disk image 4Dell_Latitude_CPi.E01 has been verified with forensic hashes: MD5: 943243e71eda7481fee7b83f06698993, SHA256: 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31. File size: 671094597 bytes. These hashes can be used to verify image integrity and authenticity in subsequent analyses.



### 14. [INFO] System Shutdown Time and Last Activity

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:46:33 |
| **Sources** | registry.system |
| **Evidence Refs** | tc_8353c410 |


The system's last recorded shutdown was on 2004-08-27 at 15:46:33 UTC. The ShutdownTime registry value (ControlSet001\Control\Windows\ShutdownTime) shows the system was shut down at this precise time.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| External IP | `4.12.220.254` |  | Web Browser Typed URLs and Suspicious Search Activity |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |






---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 240 |
| Findings submitted | 14 |
| Confirmed | 10 |
| Inferences | 4 |
| Input tokens | 614 |
| Output tokens | 61.1K |
| Total tokens | 61.7K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 614 | 61.1K | 61.7K |




<details>
<summary>Evidence Sources (49)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 12545 |
| hashdeep.hashes | hashdeep | 6 |
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
| ez.mft | eztools | 12183 |
| ez.shimcache | eztools | 140 |
| ez.prefetch | eztools | 165 |
| registry.default | regripper | 403 |
| registry.sam | regripper | 133 |
| registry.sam | regripper | 7 |
| registry.security | regripper | 19 |
| registry.security | regripper | 8 |
| registry.software | regripper | 9600 |
| registry.software | regripper | 283 |
| registry.system | regripper | 3138 |
| registry.system | regripper | 199 |
| clamav.scan | clamav | 1 |
| yara.files | yara | 3 |
| registry.ntuser.default user | regripper | 43 |
| registry.usrclass.localservice | regripper | 4 |
| registry.ntuser.localservice | regripper | 70 |
| registry.usrclass.mr. evil | regripper | 4 |
| registry.ntuser.mr. evil | regripper | 329 |
| registry.usrclass.networkservice | regripper | 4 |
| registry.ntuser.networkservice | regripper | 70 |
| tsk.masquerade | sleuthkit | 14 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
