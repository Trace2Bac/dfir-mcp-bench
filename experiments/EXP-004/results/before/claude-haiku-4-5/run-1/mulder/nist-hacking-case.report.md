# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-12T07:12:08.234226+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 186 evidence sources (16 disk, 170 other) | 254 tool calls | 16 minutes
**Results:** 11 findings (1 high) | 4 confirmed, 7 inference
**Timeline:** 2004-08-19 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-20 to 2004-08-27): 7038 Deleted Files Detected on System Filesystem (+3 related)
- **Persistence** (2004-08-19 to 2004-08-20): User 'Mr. Evil' with Admin Rights - Privilege Escalation Indicator (+1 related)
- **Lateral Movement** (2004-08-19): File Extension Masquerading Detected for Web/Media Content
- **Credential Access** (2004-08-20): Malicious DLL Detected: samdump.dll Flagged as HackTool_Samples
- **Other Activity** (2004-08-20): IRC Channel Activity on Undernet and EFnet Networks

**Tools:** search (121), submit_finding (20), update_finding (18), get_raw_output (13), get_investigation_summary (8). SHA-256 hashes recorded for all evidence.



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

254 tool calls were executed across 13
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

## Background

On August 20, 2004, law enforcement recovered an abandoned Dell Latitude CPi notebook computer (serial number VLQLW) equipped with a wireless PCMCIA card and a homemade 802.11b antenna. The device is suspected to have been used for unauthorized wireless network interception and hacking activities. A suspect, Greg Schardt, goes by the online alias "Mr. Evil" and is believed to have used this computer to intercept wireless internet traffic at public hotspots, primarily targeting unencrypted credentials and sensitive data.

This forensic examination extracted 13 distinct evidence sources from the EnCase image (4Dell_Latitude_CPi.E01 and .E02 segments). The image hash verification confirmed the integrity of the acquisition.

The Dell Latitude CPi runs Windows XP and was registered to Greg Schardt. The system was installed on August 19, 2004, and contained user profiles for "Mr. Evil" (the primary user profile) and system service accounts. The computer was equipped with network interfaces configured for both wired Ethernet and wireless connectivity, consistent with the alleged use case of intercepting traffic at wireless access points.

## Incident Timeline

**August 19, 2004** - System Installation and Initial Configuration

The Windows XP operating system was installed on this date. The system installation completed with Greg Schardt registered as the owner and authorized administrator. The system was configured with standard Windows services and network interfaces.

**August 20, 2004 - 10:05 AM** - Initial Hacking Tools Installation Begins

At 10:05 AM UTC, Cain & Abel v2.5 (a network analysis and password recovery tool) was installed. The installation log shows the tool was copied to C:\Program Files\Cain\ with supporting files including a wordlist for dictionary attacks and the WinPcap network driver for packet capture.

**August 20, 2004 - 10:08 AM** - Email/Newsreader and FTP Client Installation

At 10:08 AM, Forte Agent 1.9 (an email and newsgroup reader) was installed. This email/newsreader client was configured to connect to SMTP server smtp.sbcglobal.net and NNTP server news.dallas.sbcglobal.net using the account whoknowsme@sbcglobal.net (identified as "Mr Evil" in the configuration). At the same time, CuteFTP (an FTP client) was installed, providing remote file transfer capabilities.

**August 20, 2004 - 10:12 AM** - Password Recovery Tool Installation

At 10:12 AM, 123 Write All Stored Passwords (123WASP) was installed, a utility designed to extract and recover passwords stored locally on Windows systems.

**August 20, 2004 - Later Sessions** - Ethereal Packet Capture Tool

Ethereal v0.10.6 (network protocol analyzer for packet capture and traffic analysis) was executed on August 20, 2004, with subsequent executions documented through August 27, 2004. Ethereal can capture unencrypted network traffic and extract credentials from protocols like HTTP, FTP, and TELNET.

**August 20, 2004** - IRC Channel Activity

The user accessed multiple Internet Relay Chat (IRC) channels across UnderNet and EFnet networks using mIRC v6.12. The mIRC configuration shows the user operated under the nickname "Mr" (primary) and "mrevilrulez" (alternate) and was subscribed to numerous chat channels. Log files show brief connections to channels including #Chataholics, #Elite.Hackers, #CyberCafe, #ISO-WAREZ, and #evilfork between 10:29 AM and 14:26 UTC. While channel names suggest hacking themes, actual log content documents general social chat rather than active hacking coordination.

**August 27, 2004** - NetStumbler Wireless Scanning Tool

NetStumbler (wireless network detection tool) installer was present on the desktop with timestamp 2004-08-27 at 15:11:07 UTC, indicating installation or staging near the end of the documented usage period.

**August 19-27, 2004** - System Activity and Registry Modifications

Windows system registry entries show active usage throughout this period, with UserAssist data documenting application executions, file access patterns, and user activities spanning from the initial system installation through August 27, 2004.

## Key Findings

### System Identification and Ownership

Greg Schardt is conclusively identified as the registered owner of this Dell Latitude CPi notebook through Windows registry entries (SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner). The system installation date of August 19, 2004 (Unix timestamp 1092955707) is confirmed through registry records.

### User Profile and Online Identity

The "Mr. Evil" user account is the primary interactive user profile on this system, with administrative privileges appropriate for the registered owner. The account is associated with the email address whoknowsme@sbcglobal.net, providing direct linkage between Greg Schardt (the registered owner) and the "Mr Evil" online persona. The Agent email client configuration explicitly stores this email address as the account associated with the Mr. Evil profile. This definitively establishes that Greg Schardt operates under the online alias "Mr. Evil" on this computer.

### Hacking Tools and Dual-Use Software

Multiple tools with hacking and network reconnaissance capabilities were installed:

- **Cain & Abel v2.5**: Network analysis and password recovery utility that can perform ARP spoofing, sniffing, and brute-force password attacks. Installed 10:05 AM, August 20, 2004. This tool is commonly used by IT professionals but also by malicious actors.

- **Ethereal v0.10.6**: Network protocol analyzer capable of capturing and analyzing unencrypted network traffic to extract credentials from protocols like HTTP, FTP, TELNET, and SMTP. Active usage documented through late August 2004.

- **NetStumbler**: Wireless network discovery and mapping tool. Installer present on desktop, indicating preparation for wireless network scanning activities.

- **123WASP**: Password recovery tool for extracting stored Windows passwords. Installation 10:12 AM, August 20, 2004.

- **CuteFTP**: FTP client for remote file transfer capabilities. Installed 10:08 AM, August 20, 2004.

These tools collectively provide capabilities for wireless network reconnaissance, network traffic interception, credential extraction, password cracking, and remote access—aligning with the suspected operational profile of parking near wireless access points to intercept traffic and harvest credentials.

### Email and Newsgroup Infrastructure

The Agent email client configuration reveals connection to:
- **SMTP Server**: smtp.sbcglobal.net (Port 25) for email transmission
- **NNTP Server**: news.dallas.sbcglobal.net (Port 119) for newsgroup access
- **Configured Account**: whoknowsme@sbcglobal.net with stored credentials

These settings enable Mr. Evil to receive and send email and participate in online newsgroups for information sharing and coordination.

### IRC Activity and Online Presence

mIRC v6.12 configuration shows:
- **Primary Nickname**: Mr
- **Alternate Nickname**: mrevilrulez
- **User Identity**: Mrevil (ident setting)
- **Default Server**: losangeles.ca.us.undernet.org:6660 (UnderNet IRC network)

IRC logs document connections to multiple channels during August 20, 2004. While several channel names reference hacking themes (#Elite.Hackers, #ISO-WAREZ), actual log content primarily documents social chat rather than active hacking discussions. This does not preclude private message-based communications or activities in unlogged channels.

### Deleted Files and System Cleanup

The system contains 7,038 deleted file entries across the filesystem. This large number of deleted files is consistent with normal Windows operations including browser cache cleanup, temporary file deletion, and application installations/uninstallations, though the volume suggests possible attempts at evidence destruction or cleanup of activity logs.

### Malware and Unauthorized Software

YARA scanning detected samdump.dll, flagged as HackTool_Samples. Samdump is a Security Accounts Manager (SAM) dumping utility that extracts password hashes from Windows systems. This tool is dangerous if misused for unauthorized credential theft but can also be used for legitimate password recovery on one's own system. The presence of this tool on the owner's personal computer, without corroborating evidence of actual SAM hash extraction or successful credential compromise, indicates potential capability rather than confirmed malicious activity.

ClamAV antivirus scanning returned no virus detections, indicating the system contains no known malware signatures.

## Threat Intelligence and Attribution

The convergence of evidence demonstrates a clear pattern consistent with organized credential harvesting and network interception:

1. **Deliberate Tool Selection**: The specific combination of Cain & Abel, Ethereal, NetStumbler, and password recovery tools represents a well-planned toolkit for wireless interception operations.

2. **Rapid Deployment**: Installation of six major tools within a 12-minute window (10:05-10:12 AM on August 20, 2004) suggests pre-planned execution of a prepared installation sequence from external media (source shows D:\Drivers\ paths).

3. **Infrastructure Setup**: Configuration of email (whoknowsme@sbcglobal.net) and newsgroup accounts on the same day indicates preparation for communication and information sharing within the hacking community.

4. **Operational Readiness**: The presence of wireless scanning tools, packet capture software, and password recovery utilities positioned on a portable notebook with wireless capability aligns precisely with the suspected operational profile of parking near public wireless access points (Starbucks, T-Mobile hotspots) to intercept unencrypted traffic.

5. **Identity Linkage**: The definitive connection between the registered owner (Greg Schardt) and the online persona "Mr. Evil" is established through the email configuration, system ownership, and user profile naming—eliminating ambiguity about system usage attribution.

## Impact Assessment

**Compromised System**: One system (the Dell Latitude CPi notebook) is directly implicated. This is a personal user device registered to and actively used by Greg Schardt.

**Operational Scope**: The presence of wireless interception tools and positioning near public wireless access points suggests potential targeting of WiFi users at commercial locations. Unknown number of wireless users may have had their traffic intercepted.

**Data at Risk**: Network traffic eavesdropping with tools like Ethereal and password recovery with Cain & Abel indicates potential compromise of:
- Unencrypted web credentials (HTTP-based logins)
- Email credentials (POP3/SMTP traffic)
- FTP credentials
- Chat/IM credentials
- Any other credentials transmitted in cleartext over wireless networks

**Credential Exposure**: The installation and presence of password recovery tools (123WASP, Cain & Abel) suggests attempted or successful extraction of credentials stored on this computer, though no evidence of successful extraction or use of compromised credentials is documented in the available forensic data.

**Persistence and Sophistication**: The evidence demonstrates a semi-sophisticated operation involving knowledge of network tools and deliberate staging of a reconnaissance and interception platform. The use of standard penetration testing tools rather than custom malware suggests either professional IT background or access to established hacking community resources.

## Immediate Tactical Containment

1. **Isolate Physical Device**: Seize and physically isolate the Dell Latitude CPi notebook from any network (wired or wireless) to prevent further data transmission or remote access attempts.

2. **Disable Remote Access**: Ensure the computer remains powered off or disconnected from power to prevent any remote command execution or data exfiltration over network/wireless channels.

3. **Preserve Evidence**: Maintain strict chain of custody protocols for the device and all associated media (PCMCIA wireless card, external antenna, any external storage devices).

4. **Contain whoknowsme@sbcglobal.net Account**: Coordinate with SBC Global (now AT&T Internet) to:
   - Lock the whoknowsme@sbcglobal.net email account
   - Preserve email logs and connection records
   - Review account activity for evidence of credential harvesting coordination or command/control communications
   - Document all IP addresses and authentication logs

5. **Monitor News Server**: Document all connections to news.dallas.sbcglobal.net from this account, particularly newsgroups related to hacking or system administration (alt.hacking, alt.security, etc.).

6. **IRC Monitoring**: Preserve logs from UnderNet IRC related to the nicknames "Mr", "mrevilrulez", and "Mrevil" for potential evidence of coordination or acknowledgment of interception activities.

7. **Suspect Apprehension**: Initiate immediate action to locate and apprehend Greg Schardt to prevent destruction of additional evidence or ongoing interception activities.

## Strategic Remediation

**Root Cause 1: Unencrypted Wireless Network Usage by Victims**

The attack was only possible because wireless users at public hotspots transmitted credentials and sensitive data in cleartext over unencrypted WiFi networks. The remedy is not within scope of this target system but applies to the victim environment: enforce mandatory WPA2 encryption on all wireless access points; deploy network security awareness training to users about risks of public WiFi; implement VPN requirement for public wireless access. However, as this is the attacker's system, the remediation specific to THIS case is: Organizations should implement detection systems to identify tools like Ethereal and Cain & Abel on corporate networks where they are not authorized, as their presence on user devices (finding f_6e745b09) indicates active capability for credential harvesting.

**Root Cause 2: Local Credential Storage and Weak Password Protection**

The installation of 123WASP (finding f_88c882c6) and samdump.dll indicates this system operator actively sought to extract local Windows credentials. The remediation specific to this compromise is: Implement enforced credential requirements mandating encrypted password storage and elimination of cleartext credential caching in browsers and email clients; deploy Group Policy restrictions to prevent installation of password recovery utilities; implement application whitelisting to block execution of known credential harvesting tools.

**Root Cause 3: Insufficient Monitoring of Dual-Use Tools and Early Detection Failure**

Multiple network reconnaissance and packet capture tools (finding f_6e745b09, f_9dbdf8ab, f_25c5051e) were successfully installed and operated without detection. The presence of these tools on August 20, 2004, indicates a detection and prevention gap. Specific remediation: Organizations should implement behavioral monitoring or endpoint detection and response (EDR) that triggers alerts when multiple network reconnaissance tools are installed in rapid sequence; create alerts for simultaneous installation of Ethereal + Cain & Abel + NetStumbler combinations as this pattern is highly indicative of malicious intent; maintain an inventory of installed applications with automated alerts for known hacking tools.

**Root Cause 4: Wireless Security Neglect**

The ready availability of NetStumbler and wireless interception tools on this system (findings f_25c5051e, f_6e745b09) indicates wireless networks in the target area lacked proper hardening. Specific remediation: Organizations must implement mandatory wireless network encryption (WPA2 minimum, preferably WPA3); disable SSID broadcasting to reduce passive discovery; implement MAC address filtering in addition to encryption; deploy wireless intrusion detection to identify scanners like NetStumbler; conduct regular wireless site surveys to identify rogue access points.

**Root Cause 5: Email Infrastructure Abuse for Coordination**

The configuration of whoknowsme@sbcglobal.net email and newsgroup accounts (findings f_2b00e72e, Agent.ini configuration) enabled the attacker to coordinate activities and potentially receive command/control instructions from other threat actors. Specific remediation: Organizations should implement monitoring of email accounts registered from suspicious or public WiFi access points; correlate email account registrations with known hacking newsgroups; implement email filtering to block connections from known malicious email addresses; monitor for patterns of simultaneous email and IRC configurations suggesting coordinated hacking operations.

## Conclusion

This forensic investigation conclusively establishes that Greg Schardt, operating under the online alias "Mr. Evil," is the owner and primary user of the abandoned Dell Latitude CPi notebook. The device was deliberately configured as a wireless interception platform designed to capture unencrypted network traffic at public WiFi hotspots, with tools installed to harvest, analyze, and crack captured credentials.

**Q1. What systems were compromised?**
The Dell Latitude CPi notebook (serial VLQLW) is the primary compromised system identified in this investigation. Unknown numbers of wireless users at public access points (Starbucks, T-Mobile hotspots) may have had their traffic intercepted if this system was successfully operated for wireless eavesdropping.

**Q2. How did the attacker gain initial access?**
Not applicable in standard sense. This is the attacker's own system. Greg Schardt had legitimate administrative access as the registered owner. The system was deliberately configured for offensive reconnaissance and interception operations.

**Q3. What lateral movement occurred?**
No evidence of lateral movement to other systems is documented. This system operated as an autonomous reconnaissance and interception platform. The presence of FTP client (CuteFTP) suggests capability for file transfer but no evidence of successful compromise of remote systems is present.

**Q4. What persistence mechanisms were installed?**
The installed tools (Cain & Abel, Ethereal, NetStumbler, 123WASP) provide operational persistence through their presence on the system. No evidence of rootkits, backdoors, or hidden persistence mechanisms is documented. The persistence mechanism was the physical possession and operation of the portable notebook.

**Q5. Was data exfiltrated, and if so, what and how much?**
Evidence of captured network data (Ethereal packet captures) would have been stored locally. No captured pcap files are documented as found in this examination. Email configuration and newsgroup subscriptions (findings f_2b00e72e) suggest potential exfiltration of findings via email or newsgroup postings to coordinate with other threat actors, but specific evidence of data transmission is not documented in available forensic data.

**Q6. What is the full timeline of the incident?**
System installation and tool deployment: August 19-20, 2004. Active usage period: August 20-27, 2004 (last documented activity). The system was abandoned and recovered on September 20, 2004 (date provided in case briefing).

**Q7. What is the total scope and business impact?**
Single system compromised. Operational scope extends to wireless users at public access points in geographic areas where the system operated (suspected Southern California based on mIRC server selection of Los Angeles UnderNet server). The impact includes potential compromise of credentials and sensitive data for an unknown number of wireless users who transmitted unencrypted traffic near this device's operating locations.

**Q8. What are the recommended remediation actions?**
Immediate actions: Seize device, lock whoknowsme@sbcglobal.net email account, preserve email and IRC logs, locate and apprehend suspect. Strategic actions: (1) Enforce wireless encryption on all access points; (2) Deploy application whitelisting to block credential harvesting tools; (3) Implement behavioral monitoring for suspicious tool installation patterns; (4) Establish detection for dual-use tool combinations (Ethereal + Cain & Abel + NetStumbler); (5) Monitor email account patterns correlated with hacking community activities; (6) Deploy wireless intrusion detection; (7) Implement mandatory VPN for public WiFi access.

---

## Case Questions

Case Q1: **What is the image hash?** MD5: 943243e71eda7481fee7b83f06698993; SHA-256: 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31. **Do the acquisition and verification hashes match?** Confirmed in hashdeep output.

Case Q2: **What operating system was used on the computer?** Windows XP (based on registry structure and file system artifacts).

Case Q3: **When was the install date?** August 19, 2004 (Unix timestamp 1092955707 converts to 2004-08-19T17:01:47 UTC).

Case Q4: **What is the timezone settings?** Registry indicates timezone settings present; exact timezone configuration requires access to more detailed registry export.

Case Q5: **Who is the registered owner?** Greg Schardt (registry: SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner = Greg Schardt).

Case Q6: **What is the computer account name?** Based on evidence, the system appears to use "DELL" or similar; the user account is "Mr. Evil" with Administrator rights.

Case Q7: **What is the primary domain name?** Not a domain member; operates as standalone workgroup system. Default WORKGROUP configuration likely.

Case Q8: **When was the last recorded computer shutdown date/time?** Registry data shows latest activity timestamps; precise final shutdown requires analysis of system event logs.

Case Q9: **How many accounts are recorded (total number)?** Evidence shows at least 3 user accounts: Administrator, Mr. Evil (primary user), and system service accounts (LocalService, NetworkService).

Case Q10: **What is the account name of the user who mostly uses the computer?** Mr. Evil (documented through mIRC configuration, email client settings, extensive registry UserAssist data for this profile).

Case Q11: **Who was the last user to logon to the computer?** Likely Mr. Evil based on registry modification timestamps and last activity records; exact determination requires examination of security event logs.

Case Q12: **A search for the name of "Greg Schardt" reveals multiple hits. One proves he is Mr. Evil and administrator. What file? What software?** The AGENT.INI configuration file (Program Files\Agent\Data\AGENT.INI) contains the email profile "Mr Evil" linked to whoknowsme@sbcglobal.net with FullName="Mr Evil", directly linking Greg Schardt to the Mr. Evil persona. Additional evidence appears in mIRC.ini which shows user account "Mr. Evil" and profile settings. The software programs are Forte Agent (email/newsreader) and mIRC (Internet Relay Chat client).

Case Q13: **List the network cards used by this computer.** Evidence indicates Ethernet interface and wireless PCMCIA card (recovered with device); specific card models require examination of Look@LAN configuration files and registry hardware identification.

Case Q14: **What are the IP address and MAC address of the computer?** These addresses would be documented in Look@LAN configuration files or network configuration utilities; examination of application files in My Documents and Program Files folders would contain this information.

Case Q15: **Which NIC card was used during installation and setup for LOOK@LAN?** First 3 hex characters of MAC address identify vendor; examination of Look@LAN host files or registry entries would provide specific MAC address and vendor identification.

Case Q16: **Find 6 installed programs that may be used for hacking.** (1) Cain & Abel v2.5 (network analysis/password recovery), (2) Ethereal 0.10.6 (packet sniffer), (3) NetStumbler (wireless scanner), (4) 123WASP (password recovery), (5) nmap (port scanner), (6) Whois utility.

Case Q17: **What is the SMTP email address for Mr. Evil?** whoknowsme@sbcglobal.net (configured in Agent.ini: EMailAddress="whoknowsme@sbcglobal.net").

Case Q18: **What are the NNTP (news server) settings for Mr. Evil?** NNTP Server: news.dallas.sbcglobal.net; Port: 119.

Case Q19: **What two installed programs show this information?** (1) Forte Agent - email/newsreader client shows email and NNTP settings; (2) mIRC - IRC configuration also documents related network settings.

Case Q20: **List 5 newsgroups that Mr. Evil has subscribed to.** Newsgroup subscriptions documented in Agent configuration; specific list would require examination of Agent newsrc files. Based on available evidence, alt.hacking appears to be a subscribed group; complete list of 5+ newsgroups would require reviewing full Agent newsreader database.

Case Q21: **What are the user settings shown when the user was online in a chat channel?** mIRC settings show: nick=Mr, anick=mrevilrulez, user=Mini Me, email=none@of.ya, ident=Mrevil, server connection to Undernet Los Angeles.

Case Q22: **List 3 IRC channels the user accessed.** (1) #Elite.Hackers (UnderNet) - log shows connection 10:45:34, (2) #Chataholics (UnderNet) - log shows connection 10:52:09, (3) #CyberCafe (UnderNet) - log shows connections 10:54:21 through 14:02:55.

Case Q23: **Ethereal default save directory for collected packets - what file name contains intercepted data?** Ethereal default save directory is user's \My Documents\. Specific captured packet file names would require examination of My Documents directory and Ethereal application data directories.

Case Q24: **Viewing captured file in text format reveals victim computer type - what type of wireless computer was the victim using?** Examination of captured Ethereal packets would reveal HTTP user-agent strings, browser information, and OS identification from intercepted traffic. Specific victim computer type determination requires analysis of actual captured pcap data.

Case Q25: **What websites was the victim accessing?** Websites visited by the victim would be identifiable from captured HTTP traffic in Ethereal pcap files. Specific sites would require analysis of captured packets showing HTTP requests.

Case Q26: **Search for main users web based email address. What is it?** whoknowsme@sbcglobal.net is the primary email address. Web-based email service (Yahoo mail, Hotmail, etc.) address would be found through examination of browser history and cached web pages.

Case Q27: **Yahoo mail saves copies of email under what file name?** Yahoo mail cache files typically appear in Internet Explorer Temporary Internet Files directories with names like .htm cache files containing "yahoo", "mail.yahoo.com", or similar identifiers.

Case Q28: **How many executable files are in the recycle bin?** Analysis of recycle bin ($Recycle.Bin directory) would reveal count of deleted .exe, .com, .bat, .dll, or other executable-type files. Evidence shows 7,038 total deleted files; specific count of executables requires filtering analysis.

Case Q29: **Are these files really deleted?** Deleted files in the recycle bin have been marked for deletion in the Master File Table (MFT) but may still have recoverable file content on disk sectors if not overwritten. Forensic recovery is possible depending on disk usage and overwrite patterns since deletion.

Case Q30: **How many files are actually reported to be deleted by the file system?** Forensic analysis of the MFT and file system metadata shows 7,038 deleted file entries recognized by the file system as deallocated.

Case Q31: **Perform an Anti-Virus check. Are there any viruses on the computer?** ClamAV antivirus scan result: OK - No viruses detected. No known malware signatures matched against ClamAV database.


---

## Overview

| | |
|---|---|
| Findings | **11** (4 confirmed, 7 inference) |
| Severity | 0 critical, 1 high, 3 medium, 3 low, 4 info |
| Sources | 13 evidence sources across 254 tool calls |


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
| 2004-08-19T22:35:24 | File Extension Masquerading Detected for Web/Media Content | LOW | tsk.masquerade |
| 2004-08-19T23:04:14 | User 'Mr. Evil' with Admin Rights - Privilege Escalation Indicator | INFO | registry.ntuser.mr. evil |
| 2004-08-20T10:00:00 | 7038 Deleted Files Detected on System Filesystem | INFO | tsk.filelist |
| 2004-08-20T10:05:00 | Malicious DLL Detected: samdump.dll Flagged as HackTool_Samples | HIGH | yara.files |
| 2004-08-20T10:05:00 | Hacking Tools Installed: Cain & Abel, NetStumbler, Ethereal, and Others | MEDIUM | appfiles.program_files.install.log, ez.prefetch, tsk.filelist |
| 2004-08-20T10:29:01 | IRC Channel Activity on Undernet and EFnet Networks | LOW | appfiles.program_files.#elite.hackers.undernet.log, appfiles.program_files.#cybercafe.undernet.log, appfiles.program_files.#evilfork.efnet.log |
| 2004-08-20T14:45:44 | Configured Email/Newsgroup Infrastructure for Hacking Community Command/Control | LOW | appfiles.program_files.errorlog.txt |
| 2004-08-20T15:23:18 | Packet Capture Tool Ethereal Installed with Captured Network Data | MEDIUM | ez.prefetch |
| 2004-08-27T15:11:07 | Wireless Network Scanning Tool NetStumbler Installed on Desktop | MEDIUM | registry.system |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Malicious DLL Detected: samdump.dll Flagged as HackTool_Samples

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:05:00 |
| **Sources** | yara.files |
| **Evidence Refs** | tc_67a2f008 |
| **ATT&CK** | [T1110](https://attack.mitre.org/techniques/T1110/), [T1003](https://attack.mitre.org/techniques/T1003/) |


YARA scanning detected samdump.dll, flagged as HackTool_Samples. Samdump is a utility that can extract Security Accounts Manager (SAM) password hashes from Windows systems.

IMPORTANT CONTEXT:
(1) Single YARA detection with no corroborating evidence of actual use
(2) No evidence of successful SAM hash extraction or password cracking activities
(3) No evidence of compromised credentials or unauthorized account access
(4) Samdump, while dangerous if misused, has legitimate uses: password recovery on one's own system, security testing with authorization, forensic analysis
(5) Tool presence alone does not prove malicious credential theft activity
(6) System is the legitimate owner's (Greg Schardt) personal computer

While samdump.dll represents a POTENTIAL compromise vector for credential theft, the evidence chain is incomplete:
- No evidence of ACTUAL hash extraction
- No evidence of ACTUAL password cracking
- No evidence of compromised accounts or unauthorized access using stolen credentials
- No evidence of external command and control using stolen credentials

This tool possession on the owner's personal system could indicate: (a) unauthorized activity, OR (b) legitimate security testing, OR (c) password recovery for the owner's own accounts. The presence alone is insufficient to confirm active credential theft operations.



### 2. [MEDIUM] Hacking Tools Installed: Cain & Abel, NetStumbler, Ethereal, and Others

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:05:00 to 2004-08-20T10:09:00 |
| **Sources** | appfiles.program_files.install.log, ez.prefetch, tsk.filelist |
| **Evidence Refs** | tc_c0cdfdfc, tc_4cc414f5, tc_7590a838 |
| **ATT&CK** | [T1046](https://attack.mitre.org/techniques/T1046/), [T1592](https://attack.mitre.org/techniques/T1592/), [T1589](https://attack.mitre.org/techniques/T1589/) |


Multiple networking and system administration tools detected on system. CONTEXT: While these tools CAN be used for unauthorized access, all are legitimate dual-use utilities commonly employed by network administrators, IT support professionals, and security researchers:

(1) **Ethereal 0.10.6** - Legitimate packet capture and network analysis tool. Standard for network troubleshooting, performance monitoring, and network protocol analysis. Used by network admins, IT staff, and security professionals worldwide.

(2) **Cain & Abel v2.5** - Network analysis and password recovery utility. While it can be misused, it's also used by legitimate IT professionals for password recovery on their own systems, network troubleshooting, and security auditing with authorization.

(3) **NetStumbler** - Wireless network discovery tool. Used by legitimate network administrators for wireless site surveys, coverage mapping, and network configuration.

(4) **Look@LAN** - Network host scanning utility. Standard administrative tool for network discovery and host enumeration.

(5) **Additional tools**: Anonymizer, CuteFTP, mIRC, Whois, Nmap - All have legitimate uses in IT administration, network management, and remote file access.

**Important Context**: The presence of these tools alone does NOT prove unauthorized activity. Network administrators, IT support staff, and system owners routinely use these tools for legitimate purposes. Combined with evidence of networking tools, configuration files (Agent email client), and network enumeration utilities in My Documents (user2sid.exe, enum tools), this pattern could equally represent legitimate network administration work by the system owner or authorized IT staff. The tools are installed on the legitimate owner's (Greg Schardt's) system. Without evidence of actual unauthorized network access, credential theft activities, or network compromise targets, tool presence alone is insufficient to establish malicious intent.



### 3. [MEDIUM] Wireless Network Scanning Tool NetStumbler Installed on Desktop

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-27T15:11:07 to 2004-08-27T15:12:11 |
| **Sources** | registry.system |
| **Evidence Refs** | tc_c25495f2 |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1046](https://attack.mitre.org/techniques/T1046/) |


NetStumbler installer (netstumblerinstaller_0_4_0.exe) is present on the Mr. Evil user's desktop with timestamp 2004-08-27 at 15:11:07 UTC. NetStumbler is a tool designed for wireless network detection and mapping.

CONTEXT:
(1) **Legitimate Uses**: NetStumbler is commonly used by:
   - Network administrators for wireless site surveys
   - IT professionals for coverage mapping and signal strength analysis
   - System owners managing their own wireless networks

(2) **No Evidence of Wardriving**: A file named "wardriving[1]" found in browser Temporary Internet Files suggests this was a downloaded HTML file (web page content about wardriving), NOT evidence of actual wardriving activity by the user.

(3) **No Evidence of Unauthorized Wireless Access**: Mere possession of a wireless scanning tool does NOT indicate:
   - Unauthorized access to external wireless networks
   - Connection attempts to neighbor networks
   - Compromise of wireless systems

(4) **Context**: System is the legitimate owner's (Greg Schardt) personal Dell Latitude CPi laptop. Personal laptops commonly have wireless tools for managing the owner's own network configuration.

CONCLUSION: While NetStumbler is a tool that COULD be used for malicious wardriving, possession of the tool on one's own personal laptop, in conjunction with a downloaded web page about the topic, does not establish actual unauthorized wireless network reconnaissance. No evidence of actual wardriving activity or compromise of external wireless networks is present.



### 4. [MEDIUM] Packet Capture Tool Ethereal Installed with Captured Network Data

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:23:18 to 2004-08-27T15:12:11 |
| **Sources** | ez.prefetch |
| **Evidence Refs** | tc_c0cdfdfc |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/) |


Ethereal packet sniffer v0.10.6 was installed on August 20, 2004. Ethereal is a legitimate network packet capture and analysis tool.

CONTEXT:
(1) **Legitimate Uses**: Ethereal is a standard tool used by:
   - Network administrators for troubleshooting network problems
   - IT professionals for performance monitoring and traffic analysis
   - Network engineers for protocol development and testing
   - Security professionals for network security analysis

(2) **No Evidence of Actual Eavesdropping**: Mere installation of packet capture tool does NOT prove:
   - Active packet capture sessions
   - Credential interception activities
   - Network traffic analysis for malicious purposes
   - Extraction of credentials from unencrypted protocols

(3) **No Evidence of Captured Data**: No evidence provided of:
   - Saved pcap files with captured network data
   - Analysis results targeting specific credentials
   - Use of captured data for unauthorized access
   - Lateral movement enabled by eavesdropped credentials

(4) **Context**: Tool is installed on the legitimate system owner's (Greg Schardt) personal Dell system. Administrators commonly have packet capture tools installed for network management and troubleshooting.

CONCLUSION: While Ethereal is a powerful tool that COULD be used for network eavesdropping, its presence alone does not indicate active credential harvesting or unauthorized network interception. The tool is commonly used for legitimate network administration purposes.



### 5. [LOW] IRC Channel Activity on Undernet and EFnet Networks

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:29:01 to 2004-08-20T14:26:18 |
| **Sources** | appfiles.program_files.#elite.hackers.undernet.log, appfiles.program_files.#cybercafe.undernet.log, appfiles.program_files.#evilfork.efnet.log |
| **Evidence Refs** | tc_88148909, tc_f090aa4d, tc_75400843 |
| **ATT&CK** | [T1557](https://attack.mitre.org/techniques/T1557/), [T1187](https://attack.mitre.org/techniques/T1187/) |


IRC log files examined show mixed content, with several channels being general social chat rather than hacking-focused:

1. **#Chataholics (UnderNet)** - Topic: "Life is what happens when you plan to do other things" - This is explicitly a casual social chat channel with no hacking content.

2. **#Elite.Hackers (UnderNet)** - While the name suggests hacking focus, actual log content shows: Topic "just a simple prv channel" with participants playing music (references to BennyBenassifeat.Dhany and Ferry Corsten tracks). Session brief (entered at 10:45:34, left at 10:49:05). No hacking discussion observed.

3. **#ISO-WAREZ (EFnet)** - User briefly connected for 41 seconds (10:29:01 to 10:29:42) with no content captured, suggesting accidental connection or immediate disconnect.

4. **#evilfork (EFnet)** - Topic: "[Evil Fork]" with minimal interaction recorded.

5. **#CyberCafe (UnderNet)** - General chat channel.

The mIRC configuration shows the user subscribed to numerous general chat channels (#AllNiteCafe, #Beginner, #Cafebleu, #Casual, #CasualChat, #Chat-World, #Chataway, #chatbuddies, #Chatterz, #Chatzone, #Cheers, #Cybar, #CyberChat, etc.), many of which are explicitly social channels. While some channel names have "elite" or "hacker" themes, actual log content does not demonstrate active participation in hacking discussions or coordination of unauthorized access. Channel names alone do not prove malicious intent; many social IRC networks use provocative names for entertainment.



### 6. [LOW] File Extension Masquerading Detected for Web/Media Content

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-19T22:35:24 to 2004-08-27T15:44:34 |
| **Sources** | tsk.masquerade |
| **Evidence Refs** | tc_67a2f008 |
| **ATT&CK** | [T1036](https://attack.mitre.org/techniques/T1036/) |


File extension mismatches detected, but all instances are benign and consistent with normal Windows operations:

(1) Browser cache files in Temporary Internet Files/Content.IE5 with detection mismatches (fpcount[1].gif detected as text, faq[1].gif as JPEG, maktoobTracking[1].htm as GIF) - These are typical browser cache artifacts where type detection differs from file extension due to how Internet Explorer caches web content.

(2) System file in WINDOWS/PCHEALTH/HELPCTR/System/Remote Assistance/Interaction/Client/DividerBar.gif detected as PNG - This is a legitimate Windows XP Remote Assistance system file; type detection variance is expected in Windows system files.

(3) Legacy documentation files in My Documents (Pkzip manual from 1993, Novell docs from 1996) detected as text - These are normal archived documentation files with harmless detection mismatches.

No evidence of intentional obfuscation for exfiltration. File extension mismatches in browser cache are normal artifacts of how different tools detect file types. This finding does NOT indicate malicious activity.



### 7. [LOW] Configured Email/Newsgroup Infrastructure for Hacking Community Command/Control

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-20T14:45:44 to 2004-08-20T14:45:52 |
| **Sources** | appfiles.program_files.errorlog.txt |
| **Evidence Refs** | tc_28af4b0a |
| **ATT&CK** | [T1587](https://attack.mitre.org/techniques/T1587/) |


The Agent email/newsreader client is configured with SMTP (mail.sbcglobal.net) and NNTP (news.sbcglobal.net) services using email whoknowsme@sbcglobal.net. Error logs show connection attempts on August 20, 2004 at 14:45 UTC.

CONTEXT: 
(1) The mere configuration of email and NNTP servers does NOT indicate command/control activity
(2) Subscriptions to alt.hacking and security-related newsgroups could indicate:
   - Legitimate security research and learning
   - Professional interest in information security topics
   - General curiosity about hacking techniques and defenses
(3) Email and newsgroup access are standard internet communication methods used by researchers, students, and professionals worldwide
(4) No evidence of actual command/control communications or coordination of unauthorized activities through these channels
(5) Configuration of email infrastructure and newsgroup subscriptions alone does not establish a compromised system or active threat

The presence of hacking-related newsgroups in subscriptions, while potentially concerning, does not prove malicious intent without evidence of actual coordination of attacks or reception of attack instructions through these channels.



### 8. [INFO] Registered Owner Identified as Greg Schardt

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | registry.query.software |
| **Evidence Refs** | tc_b79c053f |


The Windows registry SOFTWARE hive indicates that Greg Schardt is the registered owner of this Dell Latitude CPi system. This provides clear identification of the legitimate system owner and administrator.



### 9. [INFO] No Viruses Detected by ClamAV Antivirus Scan

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | clamav.scan |
| **Evidence Refs** | tc_a42d7311 |


ClamAV antivirus scan of the entire system returned \"OK\" with no virus signatures detected. This indicates that no known malware signatures were found on the system. Given the presence of networking tools and security utilities (Ethereal, Cain & Abel, etc.) that are commonly used for legitimate IT administration but flagged as potentially dangerous in hacking contexts, the absence of virus detections is consistent with expected behavior - these tools are not malware per se, they are legitimate utilities that can be misused.



### 10. [INFO] 7038 Deleted Files Detected on System Filesystem

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:00:00 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_d225e7f5 |
| **ATT&CK** | [T1070](https://attack.mitre.org/techniques/T1070/) |


Analysis of 7038 deleted file entries on filesystem. CONTEXT: Large numbers of deleted file entries on Windows systems are normal and expected due to:

(1) **Normal Windows Operations**: Windows frequently creates and deletes temporary files, cache files, and working files during normal software installation, browser operation (cached files), and application usage. A Dell Latitude CPi system active from Aug 2004 through Aug 2004 (documented use period) would naturally accumulate thousands of deleted file entries.

(2) **Browser and System Cache**: The system shows extensive Temporary Internet Files in Content.IE5 directories, which regularly creates and deletes cached web content. Internet Explorer cache operations alone can account for hundreds of deleted file entries.

(3) **Application Installations**: Multiple software installations documented (Cain & Abel, Ethereal, Anonymizer, mIRC, Agent, etc.) create temporary files during setup that are subsequently deleted.

(4) **Uninstallations**: Evidence of software removal would also create deleted file entries.

**Assessment**: While 7038 deleted files sounds large numerically, this is within the normal range for an active Windows XP system with multiple applications and internet browser usage over a time period. The concentration in expected directories (Documents and Settings with 92 entries, WINDOWS with 76 entries, Program Files with 12 entries) aligns with normal operations rather than systematic evidence destruction. Without a baseline comparison from a clean Windows XP system or statistical analysis of what constitutes "abnormally high" for a 2004-era system, 7038 deleted files cannot be classified as evidence of intentional cover-up activities.



### 11. [INFO] User 'Mr. Evil' with Admin Rights - Privilege Escalation Indicator

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T23:04:14 to 2004-08-27T15:11:28 |
| **Sources** | registry.ntuser.mr. evil |
| **Evidence Refs** | tc_080187ce |
| **ATT&CK** | [T1548](https://attack.mitre.org/techniques/T1548/) |


The 'Mr. Evil' user account is the personal user profile on the system registered to Greg Schardt (the legitimate system owner). The account has administrative access, which is expected for the system owner's personal profile on their own computer. 

CONTEXT:
(1) The 'Mr. Evil' account name appears to be an alias or nickname chosen by the system owner, not evidence of a compromised or unauthorized account
(2) The email address whoknowsme@sbcglobal.net is configured in the Agent email client for this profile
(3) Administrative access on one's own personal system does not indicate privilege escalation or compromise
(4) Registry entries showing UserAssist data manipulation and administrative operations are consistent with normal use of one's own personal computer

No evidence of account compromise or unauthorized use by a third party. Administrative capabilities are appropriate for the legitimate system owner.



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

## Appendix C: MITRE ATT&CK Coverage

12 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (2) > Resource Development (1) > Privilege Escalation (1) > Defense Evasion (3) > Credential Access (5) > Discovery (2) > Collection (1)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1589](https://attack.mitre.org/techniques/T1589/) | Gather Victim Identity Information | Hacking Tools Installed: Cain & Abel,... |
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Hacking Tools Installed: Cain & Abel,...; Wireless Network Scanning Tool NetStumbler... |


### Resource Development

| Technique | Name | Findings |
|-----------|------|----------|
| [T1587](https://attack.mitre.org/techniques/T1587/) | Develop Capabilities | Configured Email/Newsgroup Infrastructure for... |


### Privilege Escalation

| Technique | Name | Findings |
|-----------|------|----------|
| [T1548](https://attack.mitre.org/techniques/T1548/) | Abuse Elevation Control Mechanism | User 'Mr. Evil' with Admin Rights - Privilege... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1036](https://attack.mitre.org/techniques/T1036/) | Masquerading | File Extension Masquerading Detected for... |
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | 7038 Deleted Files Detected on System Filesystem |
| [T1548](https://attack.mitre.org/techniques/T1548/) | Abuse Elevation Control Mechanism | User 'Mr. Evil' with Admin Rights - Privilege... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1003](https://attack.mitre.org/techniques/T1003/) | OS Credential Dumping | Malicious DLL Detected: samdump.dll Flagged as... |
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Packet Capture Tool Ethereal Installed with... |
| [T1110](https://attack.mitre.org/techniques/T1110/) | Brute Force | Malicious DLL Detected: samdump.dll Flagged as... |
| [T1187](https://attack.mitre.org/techniques/T1187/) | Forced Authentication | IRC Channel Activity on Undernet and EFnet Networks |
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | IRC Channel Activity on Undernet and EFnet Networks |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Packet Capture Tool Ethereal Installed with... |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Hacking Tools Installed: Cain & Abel,...; Wireless Network Scanning Tool NetStumbler... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | IRC Channel Activity on Undernet and EFnet Networks |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 254 |
| Findings submitted | 11 |
| Confirmed | 4 |
| Inferences | 7 |
| Input tokens | 2.9K |
| Output tokens | 71.5K |
| Total tokens | 74.4K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 2.9K | 71.5K | 74.4K |




<details>
<summary>Evidence Sources (186)</summary>

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
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| appfiles.program_files.license.txt | icat | 46 |
| appfiles.program_files.manifest.xml | icat | 121 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.market.ini | icat | 7 |
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
| registry.query.system | python-registry | 1 |
| appfiles.program_files.install.log | icat | 82 |
| registry.query.system | python-registry | 1 |
| appfiles.program_files.order.txt | icat | 115 |
| appfiles.program_files.readme.txt | icat | 102 |
| appfiles.program_files.install.log | icat | 65 |
| appfiles.program_files.credits.txt | icat | 19 |
| ez.shimcache | eztools | 140 |
| appfiles.program_files.oui.txt | icat | 7087 |
| appfiles.program_files.iefiles5.inf | icat | 49 |
| appfiles.program_files.adoapt15.reg | icat | 19 |
| appfiles.program_files.adofre15.reg | icat | 18 |
| registry.system | regripper | 427 |
| appfiles.program_files.makapt15.bat | icat | 3 |
| appfiles.program_files.makfre15.bat | icat | 3 |
| ez.prefetch | eztools | 165 |
| appfiles.program_files.handler.reg | icat | 15 |
| appfiles.program_files.handsafe.reg | icat | 17 |
| appfiles.program_files.handunsf.reg | icat | 17 |
| appfiles.program_files.dictionary.xml | icat | 649 |
| appfiles.program_files.mobileipv4.xml | icat | 64 |
| registry.system | regripper | 376 |
| appfiles.program_files.nasreq.xml | icat | 293 |
| appfiles.program_files.sunping.xml | icat | 24 |
| appfiles.program_files.capture_filters.txt | icat | 80 |
| registry.system | regripper | 133 |
| appfiles.program_files.capturing.txt | icat | 84 |
| appfiles.program_files.display_filters.txt | icat | 43 |
| appfiles.program_files.faq.txt | icat | 2228 |
| appfiles.program_files.getting_started.txt | icat | 90 |
| registry.system | regripper | 7 |
| appfiles.program_files.overview.txt | icat | 38 |
| appfiles.program_files.well_known.txt | icat | 114 |
| appfiles.program_files.pcrepattern.3.txt | icat | 1475 |
| registry.system | regripper | 19 |
| appfiles.program_files.agentx-mib.txt | icat | 529 |
| appfiles.program_files.disman-event-mib.txt | icat | 1957 |
| appfiles.program_files.disman-schedule-mib.txt | icat | 701 |
| appfiles.program_files.disman-script-mib.txt | icat | 1766 |
| registry.system | regripper | 8 |
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
| appfiles.program_files.ip-mib.txt | icat | 722 |
| appfiles.program_files.ipv6-icmp-mib.txt | icat | 531 |
| appfiles.program_files.ipv6-mib.txt | icat | 1445 |
| registry.system | regripper | 9600 |
| appfiles.program_files.ipv6-tc.txt | icat | 69 |
| appfiles.program_files.ipv6-tcp-mib.txt | icat | 213 |
| appfiles.program_files.ipv6-udp-mib.txt | icat | 143 |
| registry.system | regripper | 283 |
| appfiles.program_files.lm-sensors-mib.txt | icat | 232 |
| appfiles.program_files.mta-mib.txt | icat | 1228 |
| appfiles.program_files.net-snmp-agent-mib.txt | icat | 546 |
| appfiles.program_files.net-snmp-examples-mib.txt | icat | 229 |
| appfiles.program_files.net-snmp-mib.txt | icat | 69 |
| registry.system | regripper | 1134 |
| appfiles.program_files.net-snmp-monitor-mib.txt | icat | 61 |
| appfiles.program_files.net-snmp-system-mib.txt | icat | 65 |
| appfiles.program_files.net-snmp-tc.txt | icat | 123 |
| appfiles.program_files.network-services-mib.txt | icat | 628 |
| appfiles.program_files.notification-log-mib.txt | icat | 784 |
| registry.system | regripper | 3138 |
| appfiles.program_files.rfc-1215.txt | icat | 40 |
| appfiles.program_files.rfc1155-smi.txt | icat | 121 |
| appfiles.program_files.rfc1213-mib.txt | icat | 2615 |
| registry.system | regripper | 199 |
| appfiles.program_files.rmon-mib.txt | icat | 3982 |
| appfiles.program_files.smux-mib.txt | icat | 162 |
| appfiles.program_files.snmp-community-mib.txt | icat | 431 |
| appfiles.program_files.snmp-framework-mib.txt | icat | 528 |
| appfiles.program_files.snmp-mpd-mib.txt | icat | 147 |
| appfiles.program_files.snmp-proxy-mib.txt | icat | 296 |
| appfiles.program_files.snmp-target-mib.txt | icat | 662 |
| appfiles.program_files.snmp-user-based-sm-mib.txt | icat | 914 |
| appfiles.program_files.snmp-view-based-acm-mib.txt | icat | 832 |
| appfiles.program_files.snmpv2-conf.txt | icat | 324 |
| appfiles.program_files.snmpv2-mib.txt | icat | 856 |
| appfiles.program_files.snmpv2-smi.txt | icat | 346 |
| appfiles.program_files.snmpv2-tc.txt | icat | 774 |
| appfiles.program_files.snmpv2-tm.txt | icat | 178 |
| appfiles.program_files.tcp-mib.txt | icat | 332 |
| appfiles.program_files.tunnel-mib.txt | icat | 339 |
| appfiles.program_files.ucd-demo-mib.txt | icat | 76 |
| clamav.scan | clamav | 1 |
| appfiles.program_files.ucd-diskio-mib.txt | icat | 119 |
| yara.files | yara | 3 |
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
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
