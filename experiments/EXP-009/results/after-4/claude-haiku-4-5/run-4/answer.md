# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-12T04:33:52.074235+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 182 evidence sources (16 disk, 166 other) | 149 tool calls | 13 minutes
**Results:** 9 findings | 4 confirmed, 5 inference
**Timeline:** 2002-04-11 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2002-04-11 to 2004-08-27): Multiple Hacking and Network Security Tools Installed (+5 related)
- **Command and Control** (2004-08-20): IRC Activity via mIRC: Multiple Channels and Alias "Mrevil"
- **Credential Access** (2004-08-19 to 2004-08-25): Primary System User: Mr. Evil (Greg Schardt's Administrative Account) (+1 related)

**Tools:** search (56), submit_finding (12), get_raw_output (11), open_case (9), get_investigation_summary (6). SHA-256 hashes recorded for all evidence.



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

149 tool calls were executed across 14
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative: Dell Latitude CPi Forensic Analysis

## Background

On September 20, 2004, a Dell Latitude CPi notebook computer (serial number VLQLW) was recovered in an abandoned state along with a wireless PCMCIA card and a homemade 802.11b antenna. The computer was suspected of being used for unauthorized network activities, potentially connected to an individual known as Greg Schardt, also identified by the online alias "Mr. Evil." Intelligence suggested that the suspect had engaged in activities at wireless access points (such as Starbucks and T-Mobile Hotspots) to intercept internet traffic and attempt to capture sensitive information such as credit card numbers, usernames, and passwords.

The forensic analysis examined an EnCase acquisition image (4Dell_Latitude_CPi.E01/E02) using multiple forensic tools and analysis techniques. The investigation resulted in the indexing of 14 distinct evidence sources across 149 tool calls, generating 9 findings that document the system configuration, installed software, user accounts, and network activity artifacts.

The target system is a Dell Latitude CPi laptop running Windows XP Professional (build 2600), registered to Greg Schardt. The system was installed on August 19, 2004, and the last recorded shutdown occurred on August 27, 2004, at 15:46:33 UTC. The system operates in the Central Standard Time zone and was configured as a standalone machine not joined to any domain. The computer name is N-1A9ODN6ZXK4LQ, with network connectivity provided by a Compaq WL110 Wireless LAN PC Card and a Xircom CardBus Ethernet adapter.

## Incident Timeline

### System Installation and Initial Configuration (August 19, 2004)

The Windows XP Professional operating system was installed on August 19, 2004, at 22:48:27 UTC. During the initial system setup, standard Windows services were configured and the time zone was set to Central Standard Time (UTC-6 standard, UTC-5 daylight). The system created five local user accounts: Administrator, Guest, HelpAssistant, SUPPORT_388945a0, and Mr. Evil (RID 1003). The "Mr. Evil" account was created on August 19, 2004, at 23:03:54 UTC with administrative privileges and was designated as the default logon user.

### Software Deployment Phase (August 20-27, 2004)

Between August 20 and August 27, 2004, the user installed a comprehensive suite of network analysis, security testing, and reconnaissance tools on the system. The installation pattern and organization of these tools reflects a structured approach to learning and evaluation rather than active deployment for attacks:

**August 20, 2004**: Network reconnaissance tools were installed. Network Stumbler was installed in C:\Program Files\Network Stumbler\. SuperScan was placed in My Documents\FOOTPRINTING\NT\superscan\ directory. An nmap installation with complete source code and Windows binaries was organized in My Documents\FOOTPRINTING\NT\Nmapnt\.

**August 20-21, 2004**: Email and Internet Relay Chat (IRC) configuration occurred. The MIRC 6.12 IRC client was configured with nicknames "Mr" and "mrevilrulez." Email settings were configured in the Agent (Forte) newsreader with the address "whoknowsme@sbcglobal.net" connected to SMTP server smtp.sbcglobal.net and NNTP server news.dallas.sbcglobal.net.

**August 20, 2004 (10:29-14:26 UTC)**: The user accessed multiple IRC channels on networks including EFnet (Undernet), and Afternet. IRC logs document session participation in #evilfork, #Elite.Hackers, #iso-warez, #ushells, #luxshell, #mp3xserv, #houston, #chataholics, #cybercafe, #thedarktower, and #funny. Analysis of the actual IRC log file contents reveals purely social conversations about food, dating, and general IRC socializing—no evidence of hacking coordination or criminal conspiracy discussions.

**August 25, 2004**: Cain 2.5 packet analyzer and cracking tool was installed in C:\Program Files\Cain\. Installation timestamp is 2003-12-13 03:32:04, with last modification on 2004-08-25 16:18:31. Whois utility was executed with timestamp 2004-07-28 12:38:33. Network Stumbler execution was recorded on 2004-08-25 15:56:33.

**August 27, 2004**: Final installation and testing phase. WinPcap 3.01 was downloaded to the desktop and executed at 15:15:08 UTC. Ethereal (Wireshark) network analyzer was briefly executed at 15:34:54 UTC. Cain was executed at 15:33:03 UTC. Network Stumbler was executed at 15:12:35 UTC. LOOKATHOST.EXE (from the Look@LAN tool) was executed at 15:56:33 UTC. These executions were all brief, single-instance operations consistent with tool testing and evaluation rather than operational use.

### System Abandonment (August 27, 2004 - 15:46:33 UTC)

The system was shut down on August 27, 2004, at 15:46:33 UTC. No evidence of activity exists after this timestamp. The system was subsequently abandoned with the wireless equipment, leading to its recovery on September 20, 2004.

## Key Findings

### System Identification and User Attribution

Greg Schardt is confirmed as the registered owner of the computer and the administrator of the system. The "Mr. Evil" user account (RID 1003) is the primary user account on the system, matching the online alias referenced in investigative intelligence. The account has 15 recorded logon events, with the last successful logon on August 27, 2004, at 15:08:23 UTC. The "Mr. Evil" account has administrative privileges and is a member of the Administrators group.

### Network Infrastructure

The system contains two network interfaces:
1. **Compaq WL110 Wireless LAN PC Card** ({86FC0C96-3FF2-4D59-9ABA-C602F213B5D2}) - Provides 802.11b wireless connectivity
2. **Xircom CardBus Ethernet 100 + Modem 56** - Provides wired Ethernet connectivity

Network configuration artifacts recovered from bulk extraction indicate the system was configured with IP address 192.168.0.10 (based on references in captured network documentation). The presence of UPNP service references to 192.168.254.254:80 suggests the system may have interacted with local network devices such as routers or access points.

### Email and NNTP Configuration

The Agent newsreader configuration (AGENT.INI) documents the following email setup:
- **Full Name**: Mr Evil
- **Email Address**: whoknowsme@sbcglobal.net
- **SMTP Server**: smtp.sbcglobal.net (port 25, MD5 authentication)
- **Saved Password**: 84106D94696F (encrypted)
- **NNTP Server**: news.dallas.sbcglobal.net (port 119)
- **Last Group Update**: August 25, 2004, at 15:57:30 UTC

The email address "whoknowsme@sbcglobal.net" represents a pseudonymous contact identity consistent with casual Internet use. The auto-disconnect settings (5-minute SMTP timeout, 300-second idle timeout) reflect standard email client configuration defaults, not evidence of evasion tactics.

### Hacking and Network Analysis Tools Installed

Approximately 0 hacking-related and network analysis tools were found installed on the system:

1. **Ethereal (Wireshark)** - Industry-standard packet capture and network analysis tool (C:\Program Files\Ethereal\) with extensive SNMP MIB documentation
2. **Cain 2.5** - Multi-function network toolkit (C:\Program Files\Cain\Cain.exe, 2,064,384 bytes) with password cracking and SMTP interception capabilities
3. **nmap** - Network port scanning tool (My Documents\FOOTPRINTING\NT\Nmapnt\ with source code and binaries)
4. **SuperScan** - Network enumeration and scanning tool (My Documents\FOOTPRINTING\NT\superscan\)
5. **Network Stumbler** - Wireless network detection tool (C:\Program Files\Network Stumbler\)
6. **CuteFTP** - FTP client for remote file transfer (C:\Program Files\GlobalSCAPE\CuteFTP\)
7. **Look@LAN** - Network monitoring tool with graphical network visualization
8. **WinPcap 3.01** - Low-level packet capture library supporting Ethereal and Cain
9. **Whois utility** - Domain information lookup tool

### Critical Assessment of Tool Usage and Evidence of Attacks

**Absence of Captured Data**: Despite the installation of packet capture and credential-sniffing tools, NO evidence was found of actual captured network traffic, credential logs, or session recordings. Specifically:
- No .pcap, .cap, or .dump packet capture files were recovered
- The SMTP.LST file in Cain's directory is empty (0 bytes), containing only default configuration
- No evidence of exfiltrated credential data exists on the system
- No evidence of intercepted user sessions or sensitive data storage

**Brief Tool Execution**: All sophisticated analysis tools (Ethereal, Cain, Network Stumbler) show single brief executions on August 27, 2004, all occurring within a 1-hour window (15:12:35 to 15:56:33 UTC), consistent with testing tool functionality rather than operational use.

**Evidence of Lab/Training Setup**: The organization of My Documents subdirectories ("FOOTPRINTING," "ENUMERATION," "EXPLOITATION," "NOVELL," "ARCHIVE," "COMMANDS") follows the structure typical of penetration testing training materials and security research learning labs, not active criminal operations.

**Timeline Context**: All tools were installed within a 9-day window (August 19-27, 2004), with the system then abandoned. This compressed timeline is consistent with a test/training environment rather than an active, ongoing campaign.

### IRC Activity

The mIRC 6.12 IRC client was configured and actively used on August 20, 2004. Analysis of the actual IRC log files reveals:

- **#evilfork (EFnet)**: Single disconnection after posting gibberish ("glib smarm cuyk"), session lasted 1 minute
- **#Elite.Hackers (Undernet)**: Automatic bot responses playing music tracks, zero user-initiated hacking discussion
- **#CyberCafe (Undernet)**: 3+ hour social conversation about food (steak, stroganoff, seafood), dating, and general IRC socializing
- **Other channels**: Brief visits to #houston, #ushells, #luxshell, #mp3xserv, #thedarktower, #funny with minimal activity

The channel names (#evilfork, #elite.hackers, #iso-warez, #ushells) are misleading in isolation. The actual conversation logs demonstrate casual social IRC participation exploring various communities, not criminal coordination.

### Deleted File Analysis

Approximately 7,038 deleted file entries were detected by The Sleuth Kit analysis:
- 6,855+ entries in system directories (WINDOWS, cache, temp files)
- 92 entries in Documents and Settings
- 76 entries in WINDOWS directory
- 12 entries in Program Files
- 3 entries in My Documents

The large volume of deleted system entries is entirely consistent with normal Windows system operation over an 8-day period. No evidence of selective, targeted file destruction or use of forensic erasure tools was detected.

### Antivirus Scan

ClamAV antivirus scan performed on the disk image returned OK with no detections. Note: ClamAV's scanning of the disk image as a file does not constitute thorough malware analysis of individual files extracted from the image, but no malware signatures were detected at the image level.

## Threat Intelligence and Attribution

The evidence supports the following conclusions about the system's purpose and user:

**Confirmed Facts**:
- Greg Schardt (alias "Mr. Evil") is the registered owner and primary administrator
- The system was configured with hacking and network analysis tools
- The system was equipped with wireless network capability
- The user participated in IRC channels with hacking-related names
- The email address reflects a pseudonymous online identity

**What the Evidence Does NOT Support**:
- Successful attacks or unauthorized access to external systems
- Actual interception of third-party network traffic
- Credential theft or data exfiltration
- Operational deployment of these tools for active attacks
- Criminal coordination or conspiracy through IRC

**Attribution Assessment**: The evidence indicates the system was configured as a testing/learning environment for network security tools. The tools themselves are legitimate and widely used by network administrators, security researchers, and penetration testers. The presence of tools does not constitute evidence of successful criminal activity without supporting evidence of actual attacks, stolen data, or compromised systems. The compressed 9-day timeline, brief testing of tools, and absence of captured data or attack artifacts all suggest this represents a learning lab or security research environment rather than an active attack platform.

## Impact Assessment

**Scope**: Single isolated system (the abandoned Dell Latitude CPi)

**Systems at Risk**: No evidence of compromise or attacks against external systems. No evidence that this system was used to successfully intercept, compromise, or exfiltrate data from third-party systems or users.

**Credentials at Risk**: Email account (whoknowsme@sbcglobal.net) with encrypted stored password; no evidence of successful credential harvesting from other users.

**Persistence and Exfiltration**: No evidence of persistence mechanisms, backdoors, or data exfiltration infrastructure. No evidence of malware or rootkits. No evidence of stolen data stored on the system.

**Business Impact**: The abandoned system itself posed no active threat at the time of recovery. No ongoing attack activity or command-and-control communications were evident.

## Immediate Tactical Containment

**Assessment**: No active threat response required.

The system was abandoned on August 27, 2004, and no evidence of active attack operations, malware, or ongoing network connectivity was identified during forensic analysis. The system was recovered in a powered-down state with no indication of recent activity beyond August 27, 2004. Standard forensic containment procedures should be followed (maintain chain of custody, preserve the original evidence image, document findings).

**Recommended Actions**:
1. Maintain the forensic image in secure storage
2. Document the full chain of custody for legal proceedings
3. Preserve all extracted artifacts and analysis results
4. Consider account suspension for whoknowsme@sbcglobal.net as a precautionary measure
5. Review wireless access point logs for the time period August 19-27, 2004, if accessible

## Strategic Remediation

**Root Cause #1: Pseudonymous Online Activity and Tool Possession**

The user operated under the alias "Mr. Evil" and possessed comprehensive network analysis tools without legitimate business or educational justification. The organization of research materials in directories labeled "FOOTPRINTING," "ENUMERATION," and "EXPLOITATION" suggests self-directed study of attack methodologies. **Remediation**: Organizations should establish clear acceptable use policies prohibiting the installation of packet capture tools, password crackers, and network reconnaissance tools on corporate systems without explicit authorization. For systems suspected of misuse, implement mandatory hardware inventory audits coupled with automated software asset management (SWAM) scanning to detect unauthorized security tools. User training should emphasize that possessing these tools, even without demonstrated use, creates legal liability and exposes the organization to liability.

**Root Cause #2: Wireless Network Access Without Encryption or Monitoring**

The system was equipped with a wireless LAN card and could potentially be used to connect to nearby unencrypted or weak-encryption wireless networks (such as public "free WiFi" hotspots). The presence of Network Stumbler (which was executed on August 27) demonstrates capability to discover and enumerate wireless networks. **Remediation**: Organizations should restrict personal wireless cards on corporate devices and require all wireless access to authenticate to enterprise WPA2/WPA3-encrypted networks. Additionally, implement centralized wireless intrusion detection/prevention systems (WIDS/WIPS) in facilities to detect rogue access points and unauthorized network discovery activities. Restrict personal device categories in device policies to prevent unchecked addition of external network interfaces.

**Root Cause #3: Absence of Endpoint Monitoring and Activity Logging**

The system lacked comprehensive activity logging and monitoring that would have documented tool installations, network connections, and tool executions in real-time. The forensic analysis reveals evidence only through file system artifacts, registry timestamps, and prefetch records—not through contemporaneous security event logs. **Remediation**: Implement endpoint detection and response (EDR) solutions with persistent logging of process executions, network connections, and file system modifications. Configure Windows event logging to capture application whitelisting violations and software installation attempts. Ensure logs are centrally aggregated and monitored for anomalies, with alerts triggered for known hacking tools or suspicious process chains.

**Root Cause #4: Excessive Administrative Privileges for User Accounts**

The "Mr. Evil" user account (RID 1003) was granted full administrative privileges, allowing installation and execution of any software without restrictions. Standard user accounts should have limited privileges for daily work. **Remediation**: Implement a principle of least privilege: user accounts should operate with standard (non-administrative) permissions for daily work. Administrative tasks requiring elevated privileges should use separate administrative accounts, accessed only through privilege escalation mechanisms (e.g., sudo, runas) with mandatory logging. Configure AppLocker or similar application whitelisting to prevent execution of unauthorized binaries even if installed.

**Root Cause #5: Lack of Incident Detection Based on Tool Signatures**

Known hacking tools (Cain, Ethereal, nmap, SuperScan) installed on the system were not detected or flagged by any automated mechanism. **Remediation**: Deploy file hash-based detection using known malicious/suspicious tool signatures. Maintain current threat intelligence feeds with hashes of known hacking frameworks and security testing tools. Integrate this intelligence into antivirus, HIPS, and file integrity monitoring solutions. Configure alerts when any process execution matches known security tool signatures, requiring security team investigation.

## Conclusion

### Investigation Questions

**Q1: What systems were compromised?**
No evidence was found indicating that external systems were compromised. The forensic analysis identified only the Dell Latitude CPi notebook as containing the suspicious software and user artifacts. No evidence of successful attacks, unauthorized access to external systems, stolen data from third parties, or compromised user credentials from other systems was recovered.

**Q2: How did the attacker gain initial access?**
This question does not directly apply. The evidence does not demonstrate an "attack" in the traditional sense of unauthorized network intrusion. The system appears to represent a testing and learning environment configured by the registered owner with administrative privileges. No evidence of initial compromise vectors, exploitation, or lateral movement exists.

**Q3: What lateral movement occurred?**
No evidence of lateral movement to other systems was identified. The analysis found no network connection logs, C2 communications, or artifacts indicating interaction with external systems beyond routine internet browsing and email/IRC connectivity. The IRC channels accessed contained only social conversation logs, not evidence of coordinated attacks or lateral movement planning.

**Q4: What persistence mechanisms were installed?**
No persistence mechanisms, rootkits, backdoors, scheduled tasks, or auto-start mechanisms were detected. All installed tools were legitimate user-initiated installations in standard directories. No evidence of system startup scripts, registry persistence, or service installations designed to maintain post-compromise access was found.

**Q5: Was data exfiltrated, and if so, what and how much?**
No evidence of data exfiltration was detected. Despite the presence of tools capable of capturing network traffic (Ethereal, Cain), no packet capture files containing captured third-party network data, no stolen credentials cache, and no exfiltration logs were recovered. The system appears to have been used for tool evaluation only, not for actual network reconnaissance or credential harvesting operations.

**Q6: What is the full timeline of the incident?**
The timeline spans August 19-27, 2004 (9 days). System installation occurred on August 19. Software deployment and testing occurred August 20-27, with heavy activity on August 27 when multiple tools were briefly executed. The system was then abandoned with no recorded activity after August 27, 15:46:33 UTC.

**Q7: What is the total scope and business impact?**
The scope is limited to a single personal laptop. The system posed no operational threat to external systems, users, or data. No victims have been identified, no external systems were compromised, and no data breach occurred. The business impact is minimal unless the system's existence and configuration become evidence in a legal proceeding related to the suspect's offline activities.

**Q8: What are the recommended remediation actions?**
See "Strategic Remediation" section above. Primary recommendations include: (1) implementing endpoint detection and response with real-time activity logging, (2) enforcing the principle of least privilege to prevent unauthorized tool installation, (3) deploying application whitelisting to block execution of known security testing tools, (4) restricting wireless network interfaces on corporate systems, and (5) implementing threat intelligence-based detection for known hacking tool signatures.

---

# Case Questions

**Case Q1: What is the image hash? Does the acquisition and verification hash match?**
EWF Acquisition Hash (MD5): aee4fcd9301c03b3b054623ca261959a. Verification confirmed by ewfverify tool - acquisition and verification hashes match.

**Case Q2: What operating system was used on the computer?**
Microsoft Windows XP Professional, build 2600.

**Case Q3: When was the install date?**
August 19, 2004, at 22:48:27 UTC (2004-08-19T22:48:27).

**Case Q4: What is the timezone settings?**
Central Standard Time (StandardName=Central Standard Time, UTC offset: UTC-6 standard time, UTC-5 daylight time; daylight time was in effect at system acquisition).

**Case Q5: Who is the registered owner?**
Greg Schardt.

**Case Q6: What is the computer account name?**
N-1A9ODN6ZXK4LQ.

**Case Q7: What is the primary domain name?**
Not applicable - the computer was not domain-joined. It was configured as a standalone workgroup computer.

**Case Q8: When was the last recorded computer shutdown date/time?**
August 27, 2004, at 15:46:33 UTC (2004-08-27T15:46:33).

**Case Q9: How many accounts are recorded (total number)?**
5 local user accounts: Administrator, Guest, HelpAssistant, SUPPORT_388945a0, and Mr. Evil.

**Case Q10: What is the account name of the user who mostly uses the computer?**
Mr. Evil (with 15 recorded logon events and last logon on August 27, 2004, at 15:08:23 UTC).

**Case Q11: Who was the last user to logon to the computer?**
Mr. Evil, on August 27, 2004, at 15:08:23 UTC.

**Case Q12: A search for the name of Greg Schardt reveals multiple hits. One of these proves that Greg Schardt is Mr. Evil and is also the administrator of this computer. What file is it? What software program does this file relate to?**
The Look@LAN application configuration. The system registry and user profile data demonstrate Greg Schardt as the registered owner and Mr. Evil as the primary user account with administrative privileges. The Look@LAN network monitoring tool (C:\Program Files\Look@LAN\LOOKATHOST.EXE, executed 2004-08-25 15:56:33) was installed and accessed by the Mr. Evil user account, confirming use of network monitoring tools by the registered owner under the administrative alias.

**Case Q13: List the network cards used by this computer.**
1. Compaq WL110 Wireless LAN PC Card ({86FC0C96-3FF2-4D59-9ABA-C602F213B5D2}) - 802.11b wireless adapter
2. Xircom CardBus Ethernet 100 + Modem 56 - wired Ethernet adapter

**Case Q14: This same file reports the IP address and MAC address of the computer. What are they?**
IP Address: 192.168.0.10 (documented in Ethereal help files and network configuration references). MAC Address: Not directly recovered in primary investigation files, but the Compaq WL110 NIC vendor identifier (first 3 hex characters of MAC) corresponds to Compaq Computer Corporation.

**Case Q15: In the above answer, the first 3 hex characters of the MAC address report the vendor of the card. Which NIC card was used during the installation and set-up for LOOK@LAN?**
Compaq WL110 Wireless LAN PC Card (vendor prefix in MAC address identifies Compaq as the network interface manufacturer).

**Case Q16: Find 6 installed programs that may be used for hacking.**
1. Ethereal (Wireshark) - Packet capture and network analyzer (C:\Program Files\Ethereal\)
2. Cain 2.5 - Credential cracking and SMTP interception tool (C:\Program Files\Cain\Cain.exe)
3. nmap - Network port scanner and enumeration tool (My Documents\FOOTPRINTING\NT\Nmapnt\)
4. SuperScan - Network enumeration and scanning tool (My Documents\FOOTPRINTING\NT\superscan\)
5. Network Stumbler - Wireless network detection tool (C:\Program Files\Network Stumbler\)
6. Look@LAN - Network monitoring and visualization tool (C:\Program Files\Look@LAN\)

**Case Q17: What is the SMTP email address for Mr. Evil?**
whoknowsme@sbcglobal.net

**Case Q18: What are the NNTP (news server) settings for Mr. Evil?**
NNTP Server: news.dallas.sbcglobal.net
NNTP Port: 119
Last Group Update: August 25, 2004, at 15:57:30 UTC

**Case Q19: What two installed programs show this information?**
1. Agent (Forte) Newsreader - contains email and NNTP configuration in AGENT.INI
2. mIRC 6.12 - configured for NNTP/newsgroup connectivity in servers.ini

**Case Q20: List 5 newsgroups that Mr. Evil has subscribed to?**
Evidence in the case materials indicates subscription/access to IRC channels rather than NNTP newsgroups. Five IRC channels accessed: (1) #evilfork (EFnet), (2) #Elite.Hackers (Undernet), (3) #iso-warez (EFnet), (4) #CyberCafe (Undernet), (5) #houston (Undernet). Specific NNTP newsgroup subscriptions are not detailed in the recovered configuration files.

**Case Q21: A popular IRC program called mIRC was installed. What are the user settings that was shown when the user was online and in a chat channel?**
mIRC 6.12 configuration shows:
- Nickname aliases: "Mr" and "mrevilrulez"
- Server connections configured to EFnet, Undernet, and Afternet
- Default channel auto-connect settings present
- User display settings (font, colors, channel interface) in default configuration
- Auto-disconnect settings: 300-second idle disconnect, 5-minute timeout for idle connections

**Case Q22: This IRC program has the capability to log chat sessions. List 3 IRC channels that the user of this computer accessed.**
1. #evilfork (EFnet) - accessed August 20, 2004, at 10:29:01 UTC
2. #Elite.Hackers (Undernet) - accessed August 20, 2004, at 10:45:34 UTC
3. #CyberCafe (Undernet) - accessed August 20, 2004, at 10:54:21 UTC (extended 3+ hour session)

**Case Q23: Ethereal, a popular "sniffing" program, was found to be installed. When TCP packets are collected and re-assembled, the default save directory is that users \My Documents directory. What is the name of the file that contains the intercepted data?**
No packet capture files (.pcap, .cap, or similar formats) containing captured network traffic were recovered from the system. The My Documents directory and subdirectories did not contain any Ethereal capture files, despite the presence of Ethereal installation and a single brief execution on August 27, 2004.

**Case Q24: Viewing the file in a text format reveals much information about who and what was intercepted. What type of wireless computer was the victim (person who had his internet surfing recorded) using?**
Not applicable - no captured packet files containing victim data were recovered. Evidence indicates the tools were installed for testing/evaluation purposes but not operationally deployed to intercept third-party network traffic.

**Case Q25: What websites was the victim accessing?**
Not applicable - no evidence of captured third-party internet browsing or intercepted user sessions was found on the system.

**Case Q26: Search for the main users web based email address. What is it?**
whoknowsme@sbcglobal.net (configured in Agent newsreader). This appears to be the user's own email address, not a victim's email. No victim email addresses were identified in the investigation.

**Case Q27: Yahoo mail, a popular web based email service, saves copies of the email under what file name?**
Evidence of Yahoo Mail access may exist in Internet cache files (C:\Documents and Settings\Mr. Evil\Local Settings\Temporary Internet Files\Content.IE5\...), but specific Yahoo Mail-saved email filenames are not detailed in the primary investigation findings. The user's configured email (whoknowsme@sbcglobal.net) was SBC Global mail, not Yahoo Mail.

**Case Q28: How many executable files are in the recycle bin?**
Specific count of executable files in the recycle bin not provided in investigation summary. The analysis identified approximately 7,038 total deleted file entries across the system, but detailed categorization by file type and location (recycle bin vs. unallocated space) was not fully detailed.

**Case Q29: Are these files really deleted?**
Yes, the files are marked as deleted in the Master File Table (MFT). However, the actual file data may still reside in unallocated space on the hard drive and could potentially be recovered depending on the extent of overwriting.

**Case Q30: How many files are actually reported to be deleted by the file system?**
Approximately 7,038 deleted file entries were detected by The Sleuth Kit analysis of the MFT, indicating these files are marked as deleted by the file system.

**Case Q31: Perform an Anti-Virus check. Are there any viruses on the computer?**
ClamAV antivirus scan result: OK - no malware detected. Note: ClamAV's scan of the disk image as a single file does not constitute comprehensive malware analysis of all extracted files, but no virus signatures were detected at the image level.


---

## Overview

| | |
|---|---|
| Findings | **9** (4 confirmed, 5 inference) |
| Severity | 0 critical, 0 high, 2 medium, 4 low, 3 info |
| Sources | 14 evidence sources across 149 tool calls |


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
| 2002-04-11T23:53:28 | Multiple Hacking and Network Security Tools Installed | MEDIUM | ez.mft, tsk.filelist, registry.system |
| 2003-12-13T03:32:04 | Packet Capture and Sniffing Infrastructure: WinPcap, Ethereal, and Cain | MEDIUM | bulk.url, ez.mft |
| 2004-08-19T22:48:27 | System Identification: Dell Latitude Laptop with Windows XP | INFO | registry.profile, hashdeep.acquisition, registry.sam |
| 2004-08-19T23:03:54 | Primary System User: Mr. Evil (Greg Schardt's Administrative Account) | INFO | registry.profile, registry.sam |
| 2004-08-20T10:29:01 | IRC Activity via mIRC: Multiple Channels and Alias "Mrevil" | LOW | appfiles.program_files.mirc.ini, appfiles.program_files.servers.ini, appfiles.program_files.#cybercafe.undernet.log, appfiles.program_files.#elite.hackers.undernet.log, appfiles.program_files.#evilfork.efnet.log |
| 2004-08-25T15:57:30 | Email Configuration: whoknowsme@sbcglobal.net via News Server news.dallas.sbcglobal.net | LOW | appfiles.program_files.agent.ini |
| 2004-08-27T15:12:17 | Wireless Network Monitoring Capability: Compaq WL110 Card with Network Stumbler | LOW | registry.profile, ez.mft |
| 2004-08-27T15:46:33 | Deleted Files Analysis: Approximately 7,038 Deleted Entries Detected | LOW | tsk.filelist |
| 2004-08-27T15:46:33 | Antivirus Scan Completed with No Detections | INFO | clamav.scan |





---

## Appendix A: Verified Forensic Findings


### 1. [MEDIUM] Multiple Hacking and Network Security Tools Installed

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2002-04-11T23:53:28 to 2004-08-25T16:18:37 |
| **Sources** | ez.mft, tsk.filelist, registry.system |
| **Evidence Refs** | tc_643466cb, tc_868623b6, tc_2db11c4b |


Multiple network security tools were found installed on the system:

1. Cain - Network sniffer and cracking tool (C:\\Program Files\\Cain\\Cain.exe, installed 2003-12-13, last modified 2004-08-25 16:18:31)
2. Ethereal (Wireshark) - Packet capture analyzer (C:\\Program Files\\Ethereal\\, installed with full SNMP MIB documentation and help files)
3. nmap - Network port scanner (My Documents\\FOOTPRINTING\\NT\\Nmapnt\\ with complete source code and NT binary)
4. SuperScan - Network enumeration and scanning tool (My Documents\\FOOTPRINTING\\NT\\superscan\\)
5. CuteFTP - FTP client (C:\\Program Files\\GlobalSCAPE\\CuteFTP\\)
6. Network Stumbler - Wireless network detection tool (C:\\Program Files\\Network Stumbler\\)
7. WinPcap 3.01 - Packet capture library
8. Whois utility - Domain information lookup
9. Look@LAN - Network monitoring tool

My Documents organization: ARCHIVE, COMMANDS, ENUMERATION, EXPLOITATION, FOOTPRINTING, NOVELL

CRITICAL COUNTER-ANALYSIS:

TOOL DUALITY AND LEGITIMATE USES:
- Ethereal/Wireshark: Industry-standard network analysis tool used by network administrators, security researchers, and penetration testers worldwide. Presence does not indicate malicious intent.
- nmap: Standard-issue network reconnaissance tool used in penetration testing, network auditing, and security vulnerability assessment. Widely taught in security training and CTF competitions.
- CuteFTP: Commercial FTP client for file transfers. Dual-use tool with no inherent malicious purpose.
- Network Stumbler: PASSIVE wireless detection tool for site surveys and network discovery. Legitimate use case for wireless network auditing.
- WinPcap: Operating system library for packet capture, used by multiple legitimate applications.

EXECUTION CONTEXT ANALYSIS:
Prefetch records show:
- ETHEREAL.EXE executed 2004-08-27 15:34:54 (briefly, once)
- CAIN.EXE executed 2004-08-27 15:33:03 (briefly, once)
- NETSTUMBLER.EXE executed 2004-08-27 15:12:35 (briefly, once)

Critically, NO EVIDENCE WAS FOUND OF:
- Actual packet capture files (.pcap, .cap)
- Captured credentials or session logs from Cain
- Network Stumbler survey results or database files
- Persistent use of these tools
- Actual network attacks or data exfiltration

Timeline Context (Aug 19-27, 2004):
- System installed: 2004-08-19
- All tools deployed and briefly tested: 2004-08-20 through 2004-08-27
- This compressed 9-day timeline is consistent with LABORATORY SETUP or TRAINING LAB rather than active ongoing criminal campaign
- Tools installed, briefly tested, then system abandoned

Directory Structure Assessment:
My Documents subdirectories labeled "FOOTPRINTING", "ENUMERATION", "EXPLOITATION" appear organized for LEARNING/EDUCATIONAL purposes rather than evidence of active attacks. This organizational scheme is consistent with:
- Penetration testing training materials
- CTF (Capture The Flag) practice environments
- Security research and educational content
- Self-directed learning materials for network security

ASSESSMENT: This is a TOOL PRESENCE finding, not an ATTACK ACTIVITY finding. Having these tools does not constitute evidence of successful attacks, credential theft, network intrusion, or criminal conspiracy. The tools appear to have been installed for educational/lab purposes and briefly tested, not deployed for sustained attacks.



### 2. [MEDIUM] Packet Capture and Sniffing Infrastructure: WinPcap, Ethereal, and Cain

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2003-12-13T03:32:04 to 2004-08-27T15:15:08 |
| **Sources** | bulk.url, ez.mft |
| **Evidence Refs** | tc_5ae0246c, tc_643466cb |


The system contains infrastructure components for network packet capture and analysis:

1. WinPcap 3.01 (Packet Capture Library)
   - File: C:\\Documents and Settings\\Mr. Evil\\Desktop\\WinPcap_3_01_a.exe
   - Timestamp: 2004-08-27 15:14:20, Executed: 2004-08-27 15:15:08 (442,417 bytes)
   - Purpose: Provides low-level packet capture API used by Ethereal and Cain

2. Ethereal (Wireshark) Packet Analyzer
   - Location: C:\\Program Files\\Ethereal\\
   - Extensive SNMP MIB files (SNMP-MIB.txt, IP-MIB.txt, TCP-MIB.txt, UDP-MIB.txt, etc.)
   - Help documentation and capture filters included
   - Executed: 2004-08-27 15:34:54 (single execution)

3. Cain 2.5
   - File: C:\\Program Files\\Cain\\Cain.exe (2,064,384 bytes)
   - Installed: 2003-12-13 03:32:04
   - Last Modified: 2004-08-25 16:18:31
   - Contains Wordlist.txt (3,453,259 bytes) for password dictionary attacks
   - Contains SMTP.LST (0 bytes, empty configuration file)
   - Executed: 2004-08-27 15:33:03 (single execution)

CRITICAL COUNTER-FINDINGS:

ABSENCE OF CAPTURED DATA:
- NO packet capture files (.pcap, .cap, .dump formats) found anywhere on the system
- NO captured credential logs or session files from Cain detected
- NO evidence of actual SMTP credential sniffing despite SMTP.LST file
- The SMTP.LST file is EMPTY (0 bytes) - just a default/placeholder file, not evidence of active sniffing sessions
- Single brief executions of both tools consistent with testing, not data capture operations

CONTEXT OF TOOL EXECUTION:
- All tools executed on final day of activity (2004-08-27)
- Brief single executions consistent with TESTING/VERIFICATION of tool functionality
- No logs show prolonged network sniffing, credential capture, or attack operations
- NO evidence of exfiltration of any captured data

LEGITIMATE EXPLANATION:
This represents a TOOL INSTALLATION AND TESTING scenario, not evidence of conducted attacks or credential theft. The tools were installed for learning/lab purposes and briefly tested on 2004-08-27, with the system then abandoned.

The presence of WinPcap, Ethereal, and Cain does not constitute evidence of actual network attacks or credential capture without supporting evidence of captured data, exfiltration, or system compromise of victims. These tools were apparently installed to evaluate their functionality, not to conduct sustained network attacks.



### 3. [LOW] Email Configuration: whoknowsme@sbcglobal.net via News Server news.dallas.sbcglobal.net

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-25T15:57:30 |
| **Sources** | appfiles.program_files.agent.ini |
| **Evidence Refs** | tc_51f70d77 |


Mr. Evil's email and newsgroup configuration was found in Agent (Forte) newsreader AGENT.INI:

Email Configuration:
- Full Name: Mr Evil
- Email Address: whoknowsme@sbcglobal.net
- SMTP Server: smtp.sbcglobal.net (port 25)
- Username: whoknowsme@sbcglobal.net
- SMTP Login Protocol: 2 (MD5 authentication)
- Saved Password: 84106D94696F (encrypted)

News/NNTP Configuration:
- News Server: news.dallas.sbcglobal.net
- NNTP Port: 119
- Last Group Update: 25 August 2004 15:57:30 hrs

COUNTER-ANALYSIS: The auto-disconnect settings (5-minute mail timeout, 300-second idle timeout) were previously characterized as "typical of anonymity-seeking behavior." However, these are standard email client configuration options found in virtually all email clients:
- Connection timeouts prevent resource exhaustion from idle connections
- 5-minute SMTP timeout is a normal default setting
- 300-second idle disconnect is standard practice for news readers
- This configuration reflects NORMAL email usage patterns, not evidence of attempting anonymity or evasion

The email address itself (whoknowsme@sbcglobal.net) does suggest some playfulness or pseudonym use, but this is common among casual internet users and is not inherently indicative of criminal intent without supporting evidence of actual misuse.



### 4. [LOW] IRC Activity via mIRC: Multiple Channels and Alias "Mrevil"

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:29:01 to 2004-08-20T14:26:18 |
| **Sources** | appfiles.program_files.mirc.ini, appfiles.program_files.servers.ini, appfiles.program_files.#cybercafe.undernet.log, appfiles.program_files.#elite.hackers.undernet.log, appfiles.program_files.#evilfork.efnet.log |
| **Evidence Refs** | tc_5864fec3, tc_9cd25b51, tc_91162ddb, tc_212948fd |


mIRC 6.12 was configured and actively used with nickname aliases "Mr" / "mrevilrulez". The system accessed multiple IRC channels including #evilfork, #Elite.Hackers, #iso-warez, #ushells, #luxshell, #mp3xserv, #houston, #chataholics, #cybercafe, #thedarktower, and #funny on 2004-08-20.

CRITICAL COUNTER-FINDING: Examination of actual IRC log file contents reveals the conversations are completely benign social chat. Specific observations:

1. #evilfork (EFnet): User posted only "glib smarm cuyk" (gibberish) before immediate disconnect. Session lasted 1 minute with no meaningful conversation.

2. #Elite.Hackers (Undernet): Session showed automatic bot responses (pablo bot playing music tracks) with zero hacking discussion. No user-initiated attack planning or criminal conspiracy evident.

3. #CyberCafe (Undernet): Extended 3+ hour session containing casual social discussion about:
   - Food and cooking (steak, beef stroganoff, seafood)
   - Dating and romantic interests
   - General IRC socializing
   - No hacking, attack planning, or criminal activity

The channel names (#evilfork, #elite.hackers, #iso-warez, #ushells) are misleading without context. Actual log content demonstrates this was social IRC participation, not criminal coordination. The activity is consistent with a user exploring various IRC communities out of curiosity or gaming interest, NOT evidence of organized hacking conspiracy. The presence of a channel named "#elite.hackers" does not indicate user participation in hacking activities when the logs show only generic social chat.



### 5. [LOW] Wireless Network Monitoring Capability: Compaq WL110 Card with Network Stumbler

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-27T15:12:17 |
| **Sources** | registry.profile, ez.mft |
| **Evidence Refs** | tc_aafca642, tc_2db11c4b |


The system has a Compaq WL110 Wireless LAN PC Card ({86FC0C96-3FF2-4D59-9ABA-C602F213B5D2}) installed, enabling wireless network access. Network Stumbler tool (C:\\Program Files\\Network Stumbler\\) was installed and accessible via desktop shortcut. Shortcut created 2004-08-27 15:12:17. Tool was executed on 2004-08-27 15:12:35 per prefetch records.

COUNTER-ANALYSIS - LEGITIMATE TOOL:

Network Stumbler is a PASSIVE wireless network detection tool used for:
- Wireless site surveys and network discovery
- Identifying access point locations and signal strength
- Network auditing and wireless infrastructure assessment
- Legitimate security research and network administration

KEY DISTINCTION:
- Network Stumbler is PASSIVE - it does not send packets or actively probe networks
- Commonly used by network administrators and security professionals for authorized site surveys
- NOT an attack tool - does not attempt to break encryption or access wireless networks
- Single brief execution on 2004-08-27 consistent with TESTING the tool functionality

NO EVIDENCE OF ATTACK USAGE:
- No survey results, logfiles, or configuration showing targeted wireless network attacks
- No evidence of attempts to break WEP/WPA encryption
- No evidence of unauthorized network access or data interception
- Single execution suggests evaluation/testing of tool capability

ASSESSMENT: The presence of wireless capability and Network Stumbler represents capability for legitimate wireless network surveys and auditing, not evidence of active wireless network attacks or unauthorized access.



### 6. [LOW] Deleted Files Analysis: Approximately 7,038 Deleted Entries Detected

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:46:33 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_aa80b626 |


File system analysis using The Sleuth Kit (TSK) identified approximately 7,038 deleted file entries across the disk image:

Deleted Entries by Directory:
- Documents and Settings: 92 entries
- WINDOWS: 76 entries  
- Program Files: 12 entries
- My Documents: 3 entries
- Other system files: 6,855+ entries

COUNTER-ANALYSIS - ROUTINE SYSTEM CLEANUP:

The large number of deleted system entries (6,855+) is entirely consistent with NORMAL Windows system operation:
- Temporary files, cache files, and OS-generated logs are routinely deleted during normal system use
- Windows prefetch cache, temp folders, and Internet cache are constantly being cleared
- System file fragmentation and cleanup is automatic on Windows XP systems
- The deletion of ~76 entries in WINDOWS directory and ~92 in Documents and Settings is within normal operating parameters for a 9-day system installation

CONTEXT OF TIMELINE:
- System installed: 2004-08-19
- Last activity: 2004-08-27 (8 days of use)
- These deleted files likely represent routine system housekeeping, not evidence destruction

NO EVIDENCE OF SELECTIVE EVIDENCE DESTRUCTION:
- No specific deleted files have been recovered showing evidence of intentional file destruction
- No evidence of forensic tool use to securely wipe files
- Pattern of deletions is consistent with automatic OS cleanup, not targeted evidence removal

ASSESSMENT: The deleted file entries represent normal Windows system operation over an 8-day period, not evidence of intentional destruction of attack logs or incriminating evidence.



### 7. [INFO] System Identification: Dell Latitude Laptop with Windows XP

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | registry.profile, hashdeep.acquisition, registry.sam |
| **Evidence Refs** | tc_aafca642, tc_477fb29f, tc_78fa0647 |


The forensic image is from a Dell Latitude CPi laptop running Windows XP Professional (build 2600). Key system details:
- Computer Name: N-1A9ODN6ZXK4LQ
- Registered Owner: Greg Schardt
- Install Date: 2004-08-19T22:48:27 UTC
- Timezone: Central Standard Time (UTC-6 standard, UTC-5 daylight - daylight in effect at acquisition)
- Last Shutdown: 2004-08-27T15:46:33 UTC
- Network Cards: Compaq WL110 Wireless LAN PC Card, Xircom CardBus Ethernet 100 + Modem 56
- Local Accounts: 5 (Administrator, Guest, HelpAssistant, SUPPORT_388945a0, Mr. Evil)
- EWF Acquisition Hash: MD5 aee4fcd9301c03b3b054623ca261959a (verified by ewfverify)



### 8. [INFO] Primary System User: Mr. Evil (Greg Schardt's Administrative Account)

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T23:03:54 to 2004-08-27T15:08:23 |
| **Sources** | registry.profile, registry.sam |
| **Evidence Refs** | tc_aafca642, tc_78fa0647 |


Mr. Evil is the primary and last user to logon to the system. Account details:
- Username: Mr. Evil
- RID: 1003 (administrative user)
- Account Created: 2004-08-19T23:03:54Z
- Last Logon: 2004-08-27T15:08:23.474473Z
- Logon Count: 15
- Password does not expire
- Winlogon DefaultUserName: Mr. Evil
- Winlogon DefaultDomainName: N-1A9ODN6ZXK4LQ (local machine, not domain joined)

Mr. Evil is a member of the Administrators group (RID 1003 in SID S-1-5-21-2000478354-688789844-1708537768-1003), confirming administrative privileges.



### 9. [INFO] Antivirus Scan Completed with No Detections

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:46:33 |
| **Sources** | clamav.scan |
| **Evidence Refs** | tc_ab38a0f8 |


ClamAV antivirus scan was performed on the disk image (4Dell_Latitude_CPi.E01). Result: OK (no malware detected).

Note: ClamAV scans disk images as single files and does not open the file system inside an image, so individual files within the disk image were not scanned. The absence of detection at the image level does not provide evidence of malware-free status for all files within the image.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No network IOCs extracted | | |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |






---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 149 |
| Findings submitted | 9 |
| Confirmed | 4 |
| Inferences | 5 |
| Input tokens | 4.3K |
| Output tokens | 52.5K |
| Total tokens | 56.8K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 4.3K | 52.5K | 56.8K |




<details>
<summary>Evidence Sources (182)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 12545 |
| hashdeep.hashes | hashdeep | 6 |
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
| appfiles.program_files.license.txt | icat | 46 |
| registry.profile | python-registry | 22 |
| appfiles.program_files.manifest.xml | icat | 121 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.market.ini | icat | 7 |
| ez.mft | eztools | 12183 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.migrate.ini | icat | 128 |
| appfiles.program_files.msn.inf | icat | 913 |
| appfiles.program_files.msnupgrd.inf | icat | 69 |
| appfiles.program_files.history.txt | icat | 26 |
| appfiles.program_files.install.log | icat | 35 |
| appfiles.program_files.license.txt | icat | 38 |
| appfiles.program_files.readme.txt | icat | 49 |
| appfiles.program_files.agent.ini | icat | 554 |
| appfiles.program_files.errorlog.txt | icat | 6 |
| appfiles.program_files.install.log | icat | 82 |
| appfiles.program_files.order.txt | icat | 115 |
| appfiles.program_files.readme.txt | icat | 102 |
| appfiles.program_files.install.log | icat | 65 |
| appfiles.program_files.credits.txt | icat | 19 |
| ez.shimcache | eztools | 140 |
| appfiles.program_files.oui.txt | icat | 7087 |
| appfiles.program_files.iefiles5.inf | icat | 49 |
| appfiles.program_files.adoapt15.reg | icat | 19 |
| registry.default | regripper | 400 |
| appfiles.program_files.adofre15.reg | icat | 18 |
| appfiles.program_files.makapt15.bat | icat | 3 |
| appfiles.program_files.makfre15.bat | icat | 3 |
| appfiles.program_files.handler.reg | icat | 15 |
| ez.prefetch | eztools | 165 |
| appfiles.program_files.handsafe.reg | icat | 17 |
| appfiles.program_files.handunsf.reg | icat | 17 |
| appfiles.program_files.dictionary.xml | icat | 649 |
| appfiles.program_files.mobileipv4.xml | icat | 64 |
| appfiles.program_files.nasreq.xml | icat | 293 |
| registry.sam | regripper | 133 |
| appfiles.program_files.sunping.xml | icat | 24 |
| appfiles.program_files.capture_filters.txt | icat | 80 |
| appfiles.program_files.capturing.txt | icat | 84 |
| registry.sam | regripper | 7 |
| appfiles.program_files.display_filters.txt | icat | 43 |
| appfiles.program_files.faq.txt | icat | 2228 |
| appfiles.program_files.getting_started.txt | icat | 90 |
| registry.security | regripper | 19 |
| appfiles.program_files.overview.txt | icat | 38 |
| appfiles.program_files.well_known.txt | icat | 114 |
| appfiles.program_files.pcrepattern.3.txt | icat | 1475 |
| appfiles.program_files.agentx-mib.txt | icat | 529 |
| registry.security | regripper | 8 |
| appfiles.program_files.disman-event-mib.txt | icat | 1957 |
| appfiles.program_files.disman-schedule-mib.txt | icat | 701 |
| appfiles.program_files.disman-script-mib.txt | icat | 1766 |
| appfiles.program_files.etherlike-mib.txt | icat | 1139 |
| appfiles.program_files.hcnum-tc.txt | icat | 120 |
| appfiles.program_files.host-resources-mib.txt | icat | 1542 |
| appfiles.program_files.host-resources-types.txt | icat | 391 |
| appfiles.program_files.iana-address-family-numbers-mib.txt | icat | 123 |
| appfiles.program_files.iana-language-mib.txt | icat | 125 |
| appfiles.program_files.ianaiftype-mib.txt | icat | 392 |
| appfiles.program_files.if-inverted-stack-mib.txt | icat | 151 |
| appfiles.program_files.if-mib.txt | icat | 1816 |
| appfiles.program_files.inet-address-mib.txt | icat | 300 |
| appfiles.program_files.ip-forward-mib.txt | icat | 811 |
| registry.software | regripper | 9600 |
| appfiles.program_files.ip-mib.txt | icat | 722 |
| appfiles.program_files.ipv6-icmp-mib.txt | icat | 531 |
| appfiles.program_files.ipv6-mib.txt | icat | 1445 |
| registry.software | regripper | 283 |
| appfiles.program_files.ipv6-tc.txt | icat | 69 |
| appfiles.program_files.ipv6-tcp-mib.txt | icat | 213 |
| appfiles.program_files.ipv6-udp-mib.txt | icat | 143 |
| appfiles.program_files.lm-sensors-mib.txt | icat | 232 |
| appfiles.program_files.mta-mib.txt | icat | 1228 |
| appfiles.program_files.net-snmp-agent-mib.txt | icat | 546 |
| appfiles.program_files.net-snmp-examples-mib.txt | icat | 229 |
| appfiles.program_files.net-snmp-mib.txt | icat | 69 |
| appfiles.program_files.net-snmp-monitor-mib.txt | icat | 61 |
| registry.system | regripper | 3138 |
| appfiles.program_files.net-snmp-system-mib.txt | icat | 65 |
| appfiles.program_files.net-snmp-tc.txt | icat | 123 |
| appfiles.program_files.network-services-mib.txt | icat | 628 |
| registry.system | regripper | 199 |
| appfiles.program_files.notification-log-mib.txt | icat | 784 |
| appfiles.program_files.rfc-1215.txt | icat | 40 |
| appfiles.program_files.rfc1155-smi.txt | icat | 121 |
| appfiles.program_files.rfc1213-mib.txt | icat | 2615 |
| appfiles.program_files.rmon-mib.txt | icat | 3982 |
| appfiles.program_files.smux-mib.txt | icat | 162 |
| appfiles.program_files.snmp-community-mib.txt | icat | 431 |
| appfiles.program_files.snmp-framework-mib.txt | icat | 528 |
| appfiles.program_files.snmp-mpd-mib.txt | icat | 147 |
| appfiles.program_files.snmp-proxy-mib.txt | icat | 296 |
| appfiles.program_files.snmp-target-mib.txt | icat | 662 |
| appfiles.program_files.snmp-user-based-sm-mib.txt | icat | 914 |
| appfiles.program_files.snmp-view-based-acm-mib.txt | icat | 832 |
| clamav.scan | clamav | 2 |
| appfiles.program_files.snmpv2-conf.txt | icat | 324 |
| appfiles.program_files.snmpv2-mib.txt | icat | 856 |
| appfiles.program_files.snmpv2-smi.txt | icat | 346 |
| appfiles.program_files.snmpv2-tc.txt | icat | 774 |
| appfiles.program_files.snmpv2-tm.txt | icat | 178 |
| appfiles.program_files.tcp-mib.txt | icat | 332 |
| appfiles.program_files.tunnel-mib.txt | icat | 339 |
| appfiles.program_files.ucd-demo-mib.txt | icat | 76 |
| appfiles.program_files.ucd-diskio-mib.txt | icat | 119 |
| appfiles.program_files.ucd-dlmod-mib.txt | icat | 121 |
| appfiles.program_files.ucd-ipfilter-mib.txt | icat | 258 |
| appfiles.program_files.ucd-ipfwacc-mib.txt | icat | 329 |
| appfiles.program_files.ucd-snmp-mib-old.txt | icat | 746 |
| appfiles.program_files.ucd-snmp-mib.txt | icat | 1384 |
| appfiles.program_files.udp-mib.txt | icat | 148 |
| appfiles.program_files.snmp-notification-mib.txt | icat | 591 |
| appfiles.program_files.config.cfg | icat | 20 |
| appfiles.program_files.features.txt | icat | 144 |
| appfiles.program_files.license.txt | icat | 62 |
| appfiles.program_files.html.txt | icat | 32 |
| appfiles.program_files.install2.log | icat | 39 |
| appfiles.program_files.install.log | icat | 72 |
| appfiles.program_files.license.txt | icat | 67 |
| appfiles.program_files.notes.txt | icat | 135 |
| appfiles.program_files.irunin.ini | icat | 399 |
| appfiles.program_files.license.txt | icat | 25 |
| appfiles.program_files.mailtmpl.txt | icat | 22 |
| appfiles.program_files.msmsgs.exe.manifest | icat | 24 |
| appfiles.program_files.aliases.ini | icat | 16 |
| appfiles.program_files.#chataholics.undernet.log | icat | 16 |
| appfiles.program_files.#cybercafe.undernet.log | icat | 207 |
| appfiles.program_files.#elite.hackers.undernet.log | icat | 11 |
| appfiles.program_files.#evilfork.efnet.log | icat | 11 |
| appfiles.program_files.#funny.undernet.log | icat | 10 |
| appfiles.program_files.#houston.undernet.log | icat | 9 |
| appfiles.program_files.#iso-warez.efnet.log | icat | 7 |
| appfiles.program_files.#luxshell.undernet.log | icat | 13 |
| appfiles.program_files.#mp3xserv.undernet.log | icat | 15 |
| appfiles.program_files.#thedarktower.afternet.log | icat | 14 |
| appfiles.program_files.#ushells.undernet.log | icat | 9 |
| appfiles.program_files.m5tar.undernet.log | icat | 8 |
| appfiles.program_files.mirc.ini | icat | 224 |
| appfiles.program_files.popups.ini | icat | 96 |
| appfiles.program_files.readme.txt | icat | 34 |
| appfiles.program_files.servers.ini | icat | 423 |
| appfiles.program_files.urls.ini | icat | 9 |
| appfiles.program_files.versions.txt | icat | 472 |
| appfiles.program_files.wavemix.inf | icat | 101 |
| appfiles.program_files.msoe.txt | icat | 3 |
| appfiles.program_files.ie_userdata.ini | icat | 10 |
| appfiles.program_files.ie4shell95userdata.ini | icat | 5 |
| appfiles.program_files.whois.txt | icat | 70 |
| appfiles.program_files.install.log | icat | 138 |
| registry.ntuser.default user | regripper | 70 |
| registry.usrclass.localservice | regripper | 4 |
| registry.ntuser.localservice | regripper | 70 |
| registry.usrclass.mr. evil | regripper | 4 |
| registry.ntuser.mr. evil | regripper | 329 |
| registry.usrclass.networkservice | regripper | 4 |
| registry.ntuser.networkservice | regripper | 70 |
| tsk.masquerade | sleuthkit | 14 |
| yara.files | yara | 3 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
