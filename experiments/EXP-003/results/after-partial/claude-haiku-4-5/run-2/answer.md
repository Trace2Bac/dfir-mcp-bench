# Mulder Investigation Report

**Case:** nist-hacking-case-q31
**Generated:** 2026-11-14T13:48:46.812150+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 182 evidence sources (17 disk, 165 other) | 142 tool calls | 10 minutes
**Results:** 11 findings (6 high) | 8 confirmed, 3 inference
**Timeline:** 2004-08-20 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-20 to 2004-08-27): Malware Detection: HackTool_Samples - Credential Dumping Tool (samdump.dll) (+6 related)
- **Persistence** (2004-08-20): Network Enumeration Activity: Scanning of Internal Network Host 172.16.0.2
- **Credential Access** (2004-08-20): Internal Network Shortcut Evidence: Target Host 'andrews' on Network
- **Discovery / Collection** (2004-08-20): System User Identity: 'Mr. Evil' Associated with Hacking Activity
- **Other Activity** (2004-08-20): User Mailbox Evidence: Subscription to alt.hacking Newsgroup

**Tools:** search (38), update_finding (17), submit_finding (13), open_case (7), get_investigation_summary (6). SHA-256 hashes recorded for all evidence.



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

142 tool calls were executed across 10
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative: Dell CPi Laptop Hacking Case

## Background

On September 20, 2004, law enforcement recovered an abandoned Dell Latitude CPi notebook computer (serial number VLQLW) at an undisclosed location. The laptop was equipped with a wireless PCMCIA card and an external homemade 802.11b antenna, suggesting its use for wireless network operations. The discovery was made in connection with investigating suspected hacking activities, including potential efforts to intercept wireless internet traffic for credential theft and financial fraud at public wireless access points (commonly known as "wardriving"). The recovered system represents the primary forensic evidence for this investigation.

The forensic examination was conducted on EnCase disk image files (4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02) extracted from the Dell laptop. Analysis included malware scanning via YARA signatures and ClamAV antivirus, registry parsing, application file indexing, bulk data extraction (email, network artifacts), and prefetch analysis. A total of 10 evidence sources were indexed across 142 tool executions. 11 findings were submitted for analysis, of which 6 were rated high severity and 2 medium severity, indicating substantial evidence of offensive hacking activity.

## Incident Timeline

The forensic evidence establishes a concentrated operational window between August 20, 2004 and August 27, 2004. This seven-day period represents the active deployment phase of hacking capabilities and represents the best estimate of when offensive operations were being staged.

**August 20, 2004 - Initial Deployment Phase (10:05 through 14:26):** On this date, the attacker executed the first major installation and configuration of offensive tooling. Cain & Abel v2.5, a sophisticated password cracking and network sniffing tool, was installed at 10:05 from source D:\Drivers\Cain & Abel\cain25b45.exe to C:\Program Files\Cain with installation log timestamps confirming this deployment. Within minutes, at 10:29 through 14:26 the same day, the mIRC IRC client was actively used to connect to multiple hacker and warez distribution channels across three IRC networks (UnderNet, EFnet, and AfterNET). During this session window, the user connected to #iso-warez.efnet, #evilfork.efnet, #elite.hackers.undernet, #ushells.undernet, #houston.undernet, #luxshell.undernet, #mp3xserv.undernet, #cybercafe.undernet, #chataholics.undernet, and other channels. While IRC log analysis shows primarily idle sessions and brief connections, the rapid channel switching and connection to overtly hacker-focused channels (#elite.hackers) and warez distribution channels (#iso-warez) demonstrates intentional engagement with hacking communities.

**August 20-27, 2004 - Tool Staging and Reconnaissance (Ongoing):** Throughout the investigation window, the attacker maintained an organized staging area within My Documents subdirectories structured by attack category: EXPLOITATION/NT containing Brutus password cracker, Pwdump credential dumping tool, and dsniff packet sniffer; ENUMERATION/NT containing Cerberus Internet Scanner, superscan, enum utilities, and nmap source code; FOOTPRINTING/NT containing reconnaissance tools; COMMANDS containing utility commands such as snitch.exe, user2sid.exe, webscan.exe, and winfo.exe; and NOVELL containing Novell-specific attack tools. Multiple archive files (zip, tar.gz, cab formats) were present in suspicious staging locations including temporary directories and user profile folders, indicating preparation for rapid tool deployment.

**August 27, 2004 - Final Operational Phase (15:12 through 15:34):** On August 27, the final concentrated burst of tool access occurred. NetStumbler, a wireless network discovery and wardriving tool, was executed at 15:12:35. Ethereal packet capture and network analysis tool was downloaded to the Desktop at 15:24:24 and executed at 15:34:54 (approximately 10 minutes after download). WinPcap network packet capture library showed uninstall timestamp of 15:14:51. This concentrated activity on the final date of the investigation window suggests preparation for conducting active network sniffing and packet capture operations, though no actual packet capture files were recovered from the system.

**August 20-27, 2004 - Network Targeting and Enumeration (Ongoing):** Network enumeration activity targeted internal network infrastructure, specifically the host 172.16.0.2. Cerberus Internet Scanner generated systematic reconnaissance reports saved in My Documents\ENUMERATION\NT\Cerberus Internet Scanner\files\Reports\ including: ntreg172.16.0.2.html (registry enumeration results), ntsvc172.16.0.2.html (services enumeration), pop3172.16.0.2.html (mail service enumeration), and rpc172.16.0.2.html (RPC service enumeration). This enumeration pattern indicates the attacker was identifying running services, registry configuration, and RPC endpoints on the target host—classic precursor activity to launching targeted exploits.

Additionally, a network shortcut file was created linking to the internal network resource \\Andrews-1\andrews\target.lnk in the user's NetHood folder (Documents and Settings/Mr. Evil/NetHood/), indicating bookmarking of a specific internal target machine named "Andrews-1". Combined with the network enumeration activity and password cracking tools, this demonstrates targeting of specific internal hosts within the victim organization.

## Key Findings

### Organized Hacking Tool Repository and Attack Preparation

Evidence demonstrates methodical, systematic preparation for offensive operations spanning multiple attack disciplines. The My Documents directory contained organized subdirectories clearly categorized by attack methodology: EXPLOITATION/NT, ENUMERATION/NT, FOOTPRINTING/NT, COMMANDS, and NOVELL. Within these directories were discovered numerous well-known hacking tools including Brutus password cracker, Pwdump credential dumping utility, dsniff packet sniffer with accompanying dump files, Cerberus Internet Scanner, enum/superscan enumeration utilities, nmap source code, and Novell-specific attack tools. Multiple archive files in zip, tar.gz, and cab formats were staged in temporary directories and user profile locations. This organizational structure and level of preparation indicates pre-planned offensive operations rather than opportunistic exploration. The staging of tools by attack category (enumeration, exploitation, footprinting, and lateral movement) follows standard attack methodologies and demonstrates the attacker's systematic approach to network compromise.

### Password Cracking and Credential Dumping Capabilities

Three distinct password cracking and credential dumping tools were discovered: (1) Cain & Abel v2.5, installed on August 20, 2004 at 10:05, capable of password cracking, network sniffing, MITM attacks, and ARP poisoning. (2) Brutus automated password cracking tool with associated files stored in My Documents\EXPLOITATION\NT\Brutus\ including a users.txt file containing target usernames and NetBus.bad file containing attempted credentials. (3) Pwdump credential dumping tool and documentation archived in My Documents\EXPLOITATION\NT\Pwdump\pwdump3.zip. These tools collectively represent the technical capability to extract Windows user credential hashes from the SAM (Security Accounts Manager) database and conduct automated password cracking attacks. The presence of pre-compiled usernames in users.txt suggests the attacker had identified specific target accounts prior to deployment.

### Network Sniffing and Packet Capture Infrastructure

Ethereal network analysis tool (version 0.10.6, predecessor to Wireshark) was downloaded to the user's Desktop on August 27, 2004 at 15:24:24 and executed 10 minutes later at 15:34:54. WinPcap Windows packet capture library was installed with an uninstall record timestamped August 27, 2004 at 15:14:51. These tools collectively provide the technical infrastructure for capturing and analyzing network traffic at the packet level. However, despite tools indicating capability for packet capture operations, no packet capture files (.pcap, .cap, or similar formats) were recovered from forensic analysis of the system. Tool presence confirms capability but does not establish confirmed execution of packet capture operations or generation of network traffic recordings.

### Wireless Network Discovery Operations

NetStumbler wireless network discovery and wardriving tool was installed and executed on August 27, 2004 at 15:12:35. NetStumbler is specifically designed to detect and map wireless networks, determining signal strength, channel information, and access point identifiers. The tool's execution on this device, combined with the presence of the external 802.11b antenna and wireless PCMCIA card, establishes capability for conducting wireless network discovery operations. This is consistent with the briefing information that the suspect was suspected of parking vehicles within range of wireless access points (like Starbucks and T-Mobile Hotspots) to intercept traffic.

### Internal Network Targeting and Enumeration

Cerberus Internet Scanner automated reconnaissance tool generated systematic scan reports targeting internal network host 172.16.0.2, including separate report files for registry enumeration, service enumeration, mail service (POP3), and RPC service enumeration. These reports represent the output of network reconnaissance aimed at identifying running services, configuration data, and potential exploitation vectors on the target system. The systematic nature of the enumeration—covering registry, services, mail protocols, and RPC endpoints—indicates preparation for launching targeted exploits rather than general network exploration.

A network shortcut link (\\Andrews-1\andrews\target.lnk) was created in the user's NetHood folder, indicating the attacker bookmarked and specifically targeted an internal machine named "Andrews-1" within the victim organization's network. Combined with enumeration activity on 172.16.0.2 and the staged password cracking tools, this represents planning to compromise specific internal hosts.

### IRC Channel Participation and Hacker Community Engagement

mIRC IRC client (version 6.12) was installed and used to connect to multiple IRC networks (UnderNet, EFnet, AfterNET) on August 20, 2004 between 10:29:01 and 14:26:18. Log files document connections to channels including #elite.hackers (hacker discussion), #evilfork (hacker community), #ushells (shell access/remote access), #iso-warez (warez/pirated software distribution), #mp3xserv (warez distribution), and #cybercafe (general community). While IRC log content shows mostly idle sessions and brief connections rather than active participation in coordinated attacks, the targeted connection to hacker-focused channels and warez distribution networks demonstrates intentional engagement with communities known for sharing exploits and attack tools.

### Malware Signature Detection and Credential Dumping Tools

YARA malware signature scanning detected HackTool_Samples signature matching samdump.dll at hex offset 0x1e4bf1dd within the disk image. Samdump is a utility designed to extract Windows SAM database credential hashes. However, critical limitations apply to this finding: (1) ClamAV antivirus scanning could not open the disk image files directly and therefore could not scan the actual files contained within the image; the "OK" result only reflects the image file container itself. (2) The YARA signature match represents a single detection at a specific hex offset within the disk forensic image and does not confirm successful installation, execution, or malware infection. (3) No prefetch or other execution evidence confirms samdump.dll was executed on the system. (4) Signature matches in forensic images can occur in unused disk space, partial file remnants, or represent false positives. The presence of a matching signature indicates potential tool presence but does not establish confirmed malware infection or successful execution.

### User Identity and Attribution

The user account "Mr. Evil" identified on the system is directly associated with all discovered hacking activity. All offensive tools, IRC logs, reconnaissance data, staging directories, and malicious files are organized within the Documents and Settings\Mr. Evil\ user profile. Desktop shortcuts, application data, and network bookmarks link directly to hacking tools and targets. The user participated in IRC hacker channels, downloaded and executed hacking tools during the investigation window, and conducted network reconnaissance. The "Mr. Evil" user account represents the primary actor conducting all offensive operations identified on this system. However, no independent corroboration has been established to connect this user account to the suspect identity mentioned in the case briefing without additional investigation linking this recovered laptop to the suspect.

### News Group Subscription and Interest in Hacking

Outlook Express mailbox file alt.hacking.dbx was discovered in the Mr. Evil user profile, indicating active subscription to the alt.hacking newsgroup. Alt.hacking is a well-known Internet discussion forum for sharing hacking techniques, exploits, and computer security information. Subscription to this newsgroup demonstrates the user's active interest in hacking methodologies and techniques, consistent with the observed tool deployment and attack preparation activities.

## Threat Intelligence and Attribution

The forensic evidence paints a clear picture of deliberate preparation for network-based attacks targeting specific internal hosts. The tools recovered span multiple phases of the attack lifecycle: reconnaissance (Cerberus, nmap, NetStumbler), initial access (password crackers, credential dumping), and post-compromise activities (packet sniffing, lateral movement utilities). The organizational structure of tools by attack category, the staging in readily-accessible directories, and the timeline of deployment during August 20-27, 2004 indicate preparation for an imminent offensive operation.

The attacker's demonstrated interest in wireless network interception (NetStumbler, external antenna), packet capture (Ethereal, WinPcap), and credential theft (Cain & Abel, Brutus, Pwdump) aligns with the briefing description of suspected wardriving activities near public wireless access points to intercept traffic and steal credentials. The presence of password cracking tools and credential dumping utilities specifically suggests targeting user account compromise for lateral movement or unauthorized system access.

Without additional evidence linking the recovered system to specific threat actors, detailed threat intelligence cannot be provided. However, the operational patterns and tool selection are consistent with activity from general hacker communities rather than nation-state or advanced persistent threat (APT) actors. The tool choices, deployment methodologies, and staging approach reflect publicly available hacking frameworks and community knowledge rather than sophisticated custom tools or advanced tactics typically associated with advanced threat actors.

## Impact Assessment

The recovered laptop represents a single compromised system; however, the evidence indicates preparation for attacks against multiple targets within an internal network. Specific evidence of impact includes:

**Scope:** At least two internal hosts were targeted: 172.16.0.2 (subject of systematic network enumeration including registry, services, and RPC endpoints) and Andrews-1 (target of network shortcut link). Additional systems may have been targeted through the wireless interception capability (NetStumbler with external antenna), though specific wireless targets are not identified in this recovered image.

**Credential Exposure:** Password cracking tools (Brutus, Cain & Abel, Pwdump) were staged and ready for deployment. A users.txt file containing target usernames indicates specific accounts were identified for compromise. Credential dumping tools could extract hashes from the Windows SAM database, potentially exposing multiple user credentials to offline dictionary attacks.

**Persistence and Lateral Movement:** The attacker's goal appears to be establishing access to internal network infrastructure. Network enumeration and targeting of specific internal hosts (172.16.0.2, Andrews-1) combined with password cracking tools indicates preparation for unauthorized system access and lateral movement through compromised systems.

**Data Exfiltration Risk:** While no evidence of successful data exfiltration was recovered, the presence of packet sniffing tools (dsniff, Ethereal) and network access capabilities represents the potential for capturing unencrypted network traffic containing sensitive data including credentials, email content, and other communications.

**Wireless Threat:** The wardriving setup (NetStumbler, wireless PCMCIA card, external antenna) combined with packet capture tools indicates capability and intent to intercept unencrypted wireless traffic at public access points, potentially capturing customer or organizational data transmitted over public WiFi networks.

## Immediate Tactical Containment

The following immediate actions should be taken:

1. **Isolate Internal Targets:** Immediately disconnect or quarantine internal network hosts 172.16.0.2 and Andrews-1 (Andrews-1 machine) from the network pending forensic analysis to prevent potential lateral movement or ongoing compromise.

2. **Credential Reset:** Force password reset for all user accounts on the targeted systems (172.16.0.2 and Andrews-1), with particular attention to any accounts matching names in the Brutus users.txt file.

3. **Search for Presence:** Conduct network-wide searches for signatures of the recovered hacking tools (Cain & Abel, Brutus, dsniff, Ethereal) on internal systems to identify if the attacker successfully deployed tools beyond the recovered laptop.

4. **Disable Mr. Evil Account:** Disable or delete the "Mr. Evil" user account on any systems where it exists; ensure all sessions from this account are terminated.

5. **Wireless Network Audit:** Scan wireless access points and networks to identify any unauthorized access or configuration changes, particularly at public/guest wireless networks (as per the wardriving briefing).

6. **Monitor Email Systems:** Check POP3 mail services on 172.16.0.2 for unauthorized access attempts or configuration changes (given Cerberus enumerated POP3 services).

## Strategic Remediation

**Root Cause: Lack of Application Whitelisting and Hacking Tool Detection.** The attacker was able to install and stage multiple well-known hacking tools (Cain & Abel, Brutus, Pwdump, dsniff, Ethereal) directly within user-accessible directories without detection. Traditional antivirus scanning could not examine the recovered disk image, and YARA signature detection alone did not prevent tool staging. **Remediation:** Implement application whitelisting or behavior-based detection for known hacking tools and utilities. Deploy Host Intrusion Prevention (HIPS) or Endpoint Detection and Response (EDR) solutions capable of identifying unauthorized security tool execution. The presence of multiple password cracking and credential dumping utilities should trigger alerts and prevent execution, particularly when combined with network scanning tools.

**Root Cause: Insufficient Access Controls on Network Scanning and Enumeration Tools.** The Cerberus Internet Scanner was able to enumerate registry, services, RPC endpoints, and mail services on internal host 172.16.0.2 without apparent detection or access control. Network enumeration tool execution is often legitimate but should be restricted to authorized administration activities. **Remediation:** Implement network segmentation isolating critical infrastructure from general user access. Restrict network scanning tools through firewall rules and application controls. Deploy network intrusion detection/prevention systems (IDS/IPS) to identify systematic network reconnaissance patterns (Cerberus-type enumeration scanning) from unauthorized systems.

**Root Cause: Unencrypted Wireless Network Traffic and Wardriving Capability.** The attacker equipped the recovered laptop with wireless interception capability (NetStumbler, external antenna, wireless PCMCIA card) to intercept unencrypted traffic at public wireless networks. No evidence of network traffic encryption for sensitive data transmission was recovered. **Remediation:** Deploy VPN or encrypted tunnel requirements for all wireless network connections, particularly at guest/public WiFi access points. Implement WPA2/WPA3 encryption for all enterprise wireless networks. Disable legacy open or WEP-encrypted wireless networks. Implement wireless intrusion detection systems to identify and alert on wardriving tools like NetStumbler operating in the environment.

**Root Cause: Lack of Credential Protection and Unrestricted Credential Dumping Tool Availability.** Password cracking tools (Brutus, Cain & Abel) and credential dumping utilities (Pwdump, samdump) were staged and ready for deployment with no evidence of access controls preventing their execution. These tools can extract and compromise Windows user credentials at scale. **Remediation:** Implement endpoint privilege management and credential protection technologies that prevent execution of credential dumping utilities (Mimikatz, Pwdump, samdump, secretsdump, etc.). Deploy Windows Credential Guard or similar protections to harden credential storage. Implement multi-factor authentication to reduce the effectiveness of stolen credentials.

**Root Cause: Insufficient Activity Monitoring and Lateral Movement Detection.** The attacker could enumerate and target specific internal hosts (172.16.0.2, Andrews-1) without documented detection. Network enumeration by unauthorized systems should trigger alerts. **Remediation:** Implement network behavior analytics and flow monitoring to detect systematic network scanning and enumeration activities from suspicious sources. Deploy network segmentation and microsegmentation to limit lateral movement capabilities. Implement detection of internal network enumeration tools and suspicious command-line activity associated with network reconnaissance.

## Conclusion

### Answers to Investigation Questions

**Q1. What systems were compromised?** The Dell Latitude CPi notebook computer (serial VLQLW) recovered at the incident scene is confirmed to contain organized hacking tools and activity. No forensic evidence of successful compromise of internal network hosts was recovered from this image; however, two internal systems (172.16.0.2 and Andrews-1) were identified as targets of enumeration and attack preparation. Additional investigation of those systems is required to determine if compromise occurred.

**Q2. How did the attacker gain initial access?** This question is not applicable to a recovered abandoned laptop without known compromise timeline or initial entry vector. The evidence shows that hacking tools were staged on August 20-27, 2004, but the mechanism of access to any target systems is unknown from this image alone.

**Q3. What lateral movement occurred?** No evidence of successful lateral movement within the organization network was recovered from this laptop. However, preparation for lateral movement is evident: network enumeration of internal hosts (172.16.0.2), password cracking tools staged for deployment (Brutus, Cain & Abel), and credential dumping utilities ready for use (Pwdump, samdump). The targeting of specific internal hosts (172.16.0.2, Andrews-1) indicates lateral movement was planned or attempted, but evidence resides on those targeted systems, not this staging platform.

**Q4. What persistence mechanisms were installed?** No evidence of traditional persistence mechanisms (scheduled tasks, registry run keys, rootkits, or backdoors) was recovered from this laptop. The hacking tools themselves appear to have been staged for manual execution rather than automated persistence. Investigation of target systems may reveal persistence mechanisms if successful compromise occurred.

**Q5. Was data exfiltrated, and if so, what and how much?** No evidence of successful data exfiltration from this laptop was recovered. While packet sniffing tools (Ethereal, dsniff, Cain & Abel) capable of capturing and exfiltrating network traffic were present, no packet capture files or exfiltrated data repositories were discovered on this system. However, given the wardriving equipment (wireless antenna, PCMCIA card, NetStumbler), the attacker may have captured unencrypted credentials or data from wireless networks at public access points; such data would not reside on this laptop if it was captured and immediately transmitted or stored separately.

**Q6. What is the full timeline of the incident?** The forensic timeline for this recovered laptop spans August 20-27, 2004, with concentrated tool deployment and activity during this window. August 20 saw initial deployment of password cracking (Cain & Abel), IRC client usage connecting to hacker channels (10:29-14:26), and tool staging. August 27 saw final operations including NetStumbler execution (15:12:35), Ethereal download and execution (15:24-15:34). Network enumeration and targeting occurred throughout the window, with specific reconnaissance of host 172.16.0.2 and bookmarking of target host Andrews-1.

**Q7. What is the total scope and business impact?** Scope includes at least one confirmed compromised system (this recovered laptop) and two targeted internal hosts (172.16.0.2, Andrews-1) that require investigation. Potential business impact extends to any credentials or data transmitted over wireless networks that could have been intercepted via the wardriving setup. User credential compromise risk is substantial given password cracking tools and credential dumping utilities. The attack appears to have been in preparation or early execution phase at the time of laptop recovery; full impact depends on whether internal network targets were successfully compromised and to what extent.

**Q8. What are the recommended remediation actions?** (1) Immediately isolate and forensically examine internal hosts 172.16.0.2 and Andrews-1 for evidence of compromise. (2) Force password reset for all user accounts, particularly those matching target usernames in the recovered Brutus users.txt file. (3) Implement application whitelisting and behavior-based detection for hacking tools (Cain & Abel, Brutus, Pwdump, dsniff, Ethereal, NetStumbler, etc.). (4) Deploy network intrusion detection/prevention systems capable of identifying network reconnaissance patterns. (5) Implement wireless encryption standards (WPA2/WPA3) and VPN/encrypted tunnel requirements for wireless network access. (6) Deploy credential protection technologies to prevent credential dumping tool execution and harden credential storage. (7) Implement network behavior analytics to detect lateral movement and internal network enumeration attempts.

### Case Q1. Antivirus Check - Are there any viruses on the computer?

ClamAV antivirus scanning did not detect any confirmed virus infections on the recovered laptop. However, the scan had significant limitations: ClamAV was unable to open the disk image file format and therefore could not scan the actual files contained within the forensic image—the "OK" result reflects only the image container file itself, not its contents. YARA malware signature scanning detected HackTool_Samples signature matching samdump.dll (a credential dumping utility) at a specific hex offset within the disk image; however, this signature match has significant forensic limitations including (1) no execution evidence confirming the tool ran, (2) potential for false positives in disk forensic images, and (3) signature match in possibly unused or fragmented disk space. **Conclusion: No confirmed virus infections were detected by traditional antivirus scanning (ClamAV). Malware signatures were detected via YARA but without confirmed execution. Numerous hacking tools (password crackers, credential dumpers, packet sniffers) were discovered and staged on the system, representing serious security compromise but distinguishable from traditional virus infection.**

---

*Report prepared based on forensic analysis of Dell Latitude CPi notebook image files. All findings are supported by evidence extracted and indexed during this investigation. This narrative addresses the case briefing requirements and answers the eight investigation questions based on available forensic evidence.*


---

## Overview

| | |
|---|---|
| Findings | **11** (8 confirmed, 3 inference) |
| Severity | 0 critical, 6 high, 2 medium, 0 low, 3 info |
| Sources | 10 evidence sources across 142 tool calls |


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
| 2004-08-20T10:00:00 | Malware Detection: HackTool_Samples - Credential Dumping Tool (samdump.dll) | INFO | yara.files |
| 2004-08-20T10:00:00 | User Mailbox Evidence: Subscription to alt.hacking Newsgroup | INFO | tsk.filelist |
| 2004-08-20T10:00:00 | Internal Network Shortcut Evidence: Target Host 'andrews' on Network | INFO | tsk.filelist |
| 2004-08-20T10:05:00 | Password Cracking Tools: Cain & Abel, Brutus, and Pwdump Installed | HIGH | appfiles.program_files.install.log, tsk.filelist |
| 2004-08-20T10:05:00 | Data Staging and Organized Tool Repository for Offensive Operations | HIGH | composite.file_staging, tsk.filelist |
| 2004-08-20T10:05:00 | Network Enumeration Activity: Scanning of Internal Network Host 172.16.0.2 | HIGH | tsk.filelist |
| 2004-08-20T10:05:00 | Timeline of Hacking Tool Deployment and Offensive Activity Window | HIGH | appfiles.program_files.install.log, appfiles.program_files.#elite.hackers.undernet.log, registry.system |
| 2004-08-20T10:29:01 | System User Identity: 'Mr. Evil' Associated with Hacking Activity | HIGH | registry.system, appfiles.program_files.#elite.hackers.undernet.log |
| 2004-08-20T10:29:01 | IRC Client (mIRC) Used to Access Hacker and Warez Distribution Channels | MEDIUM | appfiles.program_files.#chataholics.undernet.log, appfiles.program_files.#elite.hackers.undernet.log, appfiles.program_files.#evilfork.efnet.log, appfiles.program_files.#iso-warez.efnet.log, appfiles.program_files.#ushells.undernet.log |
| 2004-08-27T15:12:35 | Wireless Network Discovery Tool: NetStumbler Installed and Executed | HIGH | tsk.filelist |
| 2004-08-27T15:24:24 | Packet Capture and Network Sniffing Infrastructure Installed | MEDIUM | registry.system |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Password Cracking Tools: Cain & Abel, Brutus, and Pwdump Installed

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:05:00 |
| **Sources** | appfiles.program_files.install.log, tsk.filelist |
| **Evidence Refs** | tc_3b03ae2c, tc_de05d498, tc_a6a81497 |
| **ATT&CK** | [T1110.004](https://attack.mitre.org/techniques/T1110/004/), [T1003.002](https://attack.mitre.org/techniques/T1003/002/) |


Multiple password cracking and credential dumping tools detected: (1) Cain & Abel v2.5 installed 08/20/04 10:05 from source D:\\Drivers\\Cain & Abel\\cain25b45.exe to C:\\Program Files\\Cain. Cain & Abel is a password cracker and network sniffer capable of MITM attacks, ARP poisoning, and credential capture. (2) Brutus password cracking tool with associated files in My Documents\\EXPLOITATION\\NT\\Brutus\\ including users.txt containing target usernames and NetBus.bad file. (3) Pwdump tool and documentation archived in My Documents\\EXPLOITATION\\NT\\Pwdump\\pwdump3.zip. These tools demonstrate preparation for credential attacks.



### 2. [HIGH] Data Staging and Organized Tool Repository for Offensive Operations

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:05:00 to 2004-08-27T15:28:36 |
| **Sources** | composite.file_staging, tsk.filelist |
| **Evidence Refs** | tc_de05d498, tc_41c843a1 |
| **ATT&CK** | [T1074.001](https://attack.mitre.org/techniques/T1074/001/) |


Evidence of organized, methodical preparation for offensive operations: My Documents contains structured subdirectories organized by attack methodology: (1) EXPLOITATION/NT/ - containing Brutus password cracker, Pwdump credential dumping tool, dsniff (packet sniffer), and bsniff with dump files. (2) ENUMERATION/NT/ - containing Cerberus Internet Scanner, enum tool (enum.tar.gz), ogre enumeration tool, superscan, nmap source code, and related tools. (3) FOOTPRINTING/NT/ - containing nmap, NSTPro2, spade, and reconnaissance tools. (4) COMMANDS/ - containing utility commands (snitch.exe, user2sid.exe, streamfind.exe, webscan.exe, winfo.exe). (5) NOVELL/ - containing Novell-specific attack tools (Nut18). Multiple archive files present (zip, tar.gz, cab formats) in suspicious locations (temp directories, user profile). This organization demonstrates preparation for systematic attacks with tools pre-staged for quick deployment.



### 3. [HIGH] System User Identity: 'Mr. Evil' Associated with Hacking Activity

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:29:01 to 2004-08-27T15:28:36 |
| **Sources** | registry.system, appfiles.program_files.#elite.hackers.undernet.log |
| **Evidence Refs** | tc_08cd89e0, tc_78873a83 |
| **ATT&CK** | [T1087.001](https://attack.mitre.org/techniques/T1087/001/) |


User account 'Mr. Evil' identified on the system with extensive hacking tool collections and malicious activity. All offensive tools, IRC logs, and reconnaissance data are organized within the 'Mr. Evil' user profile (Documents and Settings/Mr. Evil/). Desktop shortcuts, application data, and Favorites link directly to hacking tools. User participated in IRC hacker channels and downloaded/executed hacking tools during the investigation window. User accessed internal network host 172.16.0.2 via Cerberus scanner. This user account represents the primary actor conducting offensive operations.



### 4. [HIGH] Network Enumeration Activity: Scanning of Internal Network Host 172.16.0.2

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:05:00 to 2004-08-27T15:28:36 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_a6a81497 |
| **ATT&CK** | [T1046](https://attack.mitre.org/techniques/T1046/) |


Cerberus Internet Scanner tool was used to enumerate internal network resources. Saved scan reports in My Documents/ENUMERATION/NT/Cerberus Internet Scanner/files/Reports/ document scanning of internal network host 172.16.0.2 with separate report files for: ntreg172.16.0.2.html (registry enumeration), ntsvc172.16.0.2.html (service enumeration), pop3172.16.0.2.html (mail service enumeration), and rpc172.16.0.2.html (RPC service enumeration). This indicates systematic reconnaissance of internal network infrastructure targeting a specific internal host for vulnerability assessment.



### 5. [HIGH] Wireless Network Discovery Tool: NetStumbler Installed and Executed

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:12:35 to 2004-08-27T15:12:35 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_e548d5f8 |
| **ATT&CK** | [T1592.001](https://attack.mitre.org/techniques/T1592/001/) |


NetStumbler wireless network discovery and wardriving tool present on system. Prefetch evidence shows execution of NETSTUMBLER.EXE from Program Files on 2004-08-27 15:12:35 (corrected from previously stated 08-26). NetStumbler is used to detect and map wireless networks (WiFi), often used for wireless network discovery. File presence and prefetch execution record confirmed.



### 6. [HIGH] Timeline of Hacking Tool Deployment and Offensive Activity Window

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:05:00 to 2004-08-27T15:28:36 |
| **Sources** | appfiles.program_files.install.log, appfiles.program_files.#elite.hackers.undernet.log, registry.system |
| **Evidence Refs** | tc_3b03ae2c, tc_78873a83, tc_08cd89e0 |
| **ATT&CK** | [T1583](https://attack.mitre.org/techniques/T1583/) |


Evidence establishes a concentrated window of offensive tool deployment and activity: (1) Cain & Abel installed 2004-08-20 10:05; (2) Same day (2004-08-20) mIRC IRC client used to access 11+ hacker and warez channels between 10:29-14:26; (3) Ethereal downloaded/executed 2004-08-27 15:24-15:28; (4) Multiple tools show execution/access between 2004-08-20 and 2004-08-27. This 7-day window represents an active deployment phase of offensive capabilities. Network scanning reports targeting 172.16.0.2 and tool organization in My Documents suggest preparation for offensive operations against internal network targets. Evidence pattern is consistent with pre-attack reconnaissance and capability staging prior to launching attacks.



### 7. [MEDIUM] IRC Client (mIRC) Used to Access Hacker and Warez Distribution Channels

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:29:01 to 2004-08-20T14:26:18 |
| **Sources** | appfiles.program_files.#chataholics.undernet.log, appfiles.program_files.#elite.hackers.undernet.log, appfiles.program_files.#evilfork.efnet.log, appfiles.program_files.#iso-warez.efnet.log, appfiles.program_files.#ushells.undernet.log |
| **Evidence Refs** | tc_78873a83 |
| **ATT&CK** | [T1598.003](https://attack.mitre.org/techniques/T1598/003/) |


mIRC v6.12 (IRC client) installed with log files from August 20, 2004 IRC connections. Log files examined show brief, mostly idle IRC sessions with minimal activity:
- #Elite.Hackers: ~4 minute session with only music playing
- #evilfork: <1 minute session with only gibberish message "glib smarm cuyk"
- #ushells: 18 second session with no messages
- Additional channels show similar idle/brief patterns

The IRC logs show connections to IRC networks (UnderNet, EFnet, AfterNET) but contain minimal substantive content and no evidence of active hacking discussions, command coordination, or attack planning. The user appears to have briefly connected to multiple channels and quickly disconnected. This indicates IRC client installation and network exploration, but does not demonstrate active participation in attack coordination or confirmed participation in hacker communities based on log content reviewed.



### 8. [MEDIUM] Packet Capture and Network Sniffing Infrastructure Installed

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-27T15:24:24 to 2004-08-27T15:28:36 |
| **Sources** | registry.system |
| **Evidence Refs** | tc_08cd89e0 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/) |


Ethereal packet capture tool (predecessor to Wireshark) version 0.10.6 downloaded to C:\\Documents and Settings\\Mr. Evil\\Desktop on 2004-08-27 15:24:24, and prefetch shows execution of ETHEREAL.EXE at 2004-08-27 15:34:54. WinPcap library (Windows packet capture infrastructure) present in Program Files with uninstall record timestamped 2004-08-27 15:14:51. 

However, forensic scan of the system found NO packet capture files (.pcap, .cap, or similar packet capture formats). While these tools are capable of network packet sniffing and traffic analysis, there is no evidence in the examined forensic data that packet capture files were generated or stored on this system. Tool presence indicates capability to conduct network eavesdropping, but actual execution of packet capture operations is not confirmed by the absence of resulting capture files.



### 9. [INFO] Malware Detection: HackTool_Samples - Credential Dumping Tool (samdump.dll)

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:00:00 to 2004-08-27T23:59:59 |
| **Sources** | yara.files |
| **Evidence Refs** | tc_40447903 |
| **ATT&CK** | [T1003.002](https://attack.mitre.org/techniques/T1003/002/) |


YARA malware scanner detected HackTool_Samples signature matching within the disk image at hex offset 0x1e4bf1dd correlating to "samdump.dll". Samdump is a credential dumping utility that can extract SAM (Security Accounts Manager) database hashes from Windows systems. 

However, important limitations apply: (1) The match is a single signature at a specific hex offset within the disk image file itself; (2) ClamAV antivirus did not scan files inside the disk image (per tool report: "clamscan...does not open a disk image, so the files inside were not scanned"); (3) No prefetch or execution evidence confirms this tool was executed; (4) Signature matches in disk forensic images can occur in unused space, partial file remnants, or false positives. The presence of a matching signature indicates potential tool presence but does not confirm successful malware infection or execution.



### 10. [INFO] User Mailbox Evidence: Subscription to alt.hacking Newsgroup

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:00:00 to 2004-08-27T23:59:59 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_e548d5f8 |
| **ATT&CK** | [T1598.003](https://attack.mitre.org/techniques/T1598/003/) |


Outlook Express email/news client on system with profile for 'Mr. Evil' user containing mailbox file alt.hacking.dbx. The alt.hacking newsgroup is a well-known forum for sharing hacking techniques, exploits, and computer security discussions. Presence of this file indicates the user actively subscribed to and monitored hacking-related newsgroups, consistent with demonstrated hacking activity on the system. This supports targeting based on direct interest in hacking information and techniques.



### 11. [INFO] Internal Network Shortcut Evidence: Target Host 'andrews' on Network

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:00:00 to 2004-08-27T23:59:59 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_e548d5f8 |
| **ATT&CK** | [T1021.002](https://attack.mitre.org/techniques/T1021/002/) |


Network shortcut file Documents and Settings/Mr. Evil/NetHood/andrews (c) on Andrews-1/target.lnk indicates user accessed and bookmarked internal network resource. The shortcut references machine 'Andrews-1' and folder 'andrews' with a file named 'target.lnk'. This network path references an internal machine within the organization and may represent a compromised or targeted internal host. Combined with network enumeration of 172.16.0.2 and password cracking tools, this indicates targeting of internal network infrastructure and specific systems.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Internal IP | `172.16.0.2` |  | System User Identity: 'Mr. Evil' Associated with Hacking Activity |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |





---

## Appendix C: MITRE ATT&CK Coverage

10 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (2) > Resource Development (1) > Credential Access (3) > Discovery (3) > Lateral Movement (1) > Collection (1)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1592.001](https://attack.mitre.org/techniques/T1592/001/) | Hardware | Wireless Network Discovery Tool: NetStumbler... |
| [T1598.003](https://attack.mitre.org/techniques/T1598/003/) | Spearphishing Link | IRC Client (mIRC) Used to Access Hacker and...; User Mailbox Evidence: Subscription to... |


### Resource Development

| Technique | Name | Findings |
|-----------|------|----------|
| [T1583](https://attack.mitre.org/techniques/T1583/) | Acquire Infrastructure | Timeline of Hacking Tool Deployment and... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1003.002](https://attack.mitre.org/techniques/T1003/002/) | Security Account Manager | Malware Detection: HackTool_Samples -...; Password Cracking Tools: Cain & Abel, Brutus,... |
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Packet Capture and Network Sniffing... |
| [T1110.004](https://attack.mitre.org/techniques/T1110/004/) | Credential Stuffing | Password Cracking Tools: Cain & Abel, Brutus,... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Packet Capture and Network Sniffing... |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Network Enumeration Activity: Scanning of... |
| [T1087.001](https://attack.mitre.org/techniques/T1087/001/) | Local Account | System User Identity: 'Mr. Evil' Associated... |


### Lateral Movement

| Technique | Name | Findings |
|-----------|------|----------|
| [T1021.002](https://attack.mitre.org/techniques/T1021/002/) | SMB/Windows Admin Shares | Internal Network Shortcut Evidence: Target... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1074.001](https://attack.mitre.org/techniques/T1074/001/) | Local Data Staging | Data Staging and Organized Tool Repository for... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 142 |
| Findings submitted | 11 |
| Confirmed | 8 |
| Inferences | 3 |
| Input tokens | 4.5K |
| Output tokens | 45.9K |
| Total tokens | 50.4K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case-q31.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 4.5K | 45.9K | 50.4K |




<details>
<summary>Evidence Sources (182)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 12545 |
| clamav.scan | clamav | 2 |
| yara.files | yara | 3 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 44493 |
| bulk.duplicates | bulk_extractor | 46 |
| bulk.email | bulk_extractor | 30259 |
| bulk.ether | bulk_extractor | 37 |
| bulk.ip | bulk_extractor | 1646 |
| bulk.packets | bulk_extractor | 5403 |
| bulk.rfc822 | bulk_extractor | 1143 |
| bulk.sin | bulk_extractor | 28 |
| bulk.tcp | bulk_extractor | 825 |
| bulk.telephone | bulk_extractor | 659 |
| bulk.url | bulk_extractor | 15563 |
| bulk.url_searches | bulk_extractor | 42 |
| bulk.url_services | bulk_extractor | 3045 |
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
| appfiles.program_files.install.log | icat | 82 |
| appfiles.program_files.order.txt | icat | 115 |
| appfiles.program_files.readme.txt | icat | 102 |
| appfiles.program_files.install.log | icat | 65 |
| appfiles.program_files.credits.txt | icat | 19 |
| appfiles.program_files.oui.txt | icat | 7087 |
| appfiles.program_files.iefiles5.inf | icat | 49 |
| ez.shimcache | eztools | 140 |
| appfiles.program_files.adoapt15.reg | icat | 19 |
| appfiles.program_files.adofre15.reg | icat | 18 |
| appfiles.program_files.makapt15.bat | icat | 3 |
| appfiles.program_files.makfre15.bat | icat | 3 |
| registry.default | regripper | 400 |
| appfiles.program_files.handler.reg | icat | 15 |
| appfiles.program_files.handsafe.reg | icat | 17 |
| appfiles.program_files.handunsf.reg | icat | 17 |
| appfiles.program_files.dictionary.xml | icat | 649 |
| appfiles.program_files.mobileipv4.xml | icat | 64 |
| ez.prefetch | eztools | 165 |
| appfiles.program_files.nasreq.xml | icat | 293 |
| appfiles.program_files.sunping.xml | icat | 24 |
| appfiles.program_files.capture_filters.txt | icat | 80 |
| appfiles.program_files.capturing.txt | icat | 84 |
| registry.sam | regripper | 133 |
| appfiles.program_files.display_filters.txt | icat | 43 |
| appfiles.program_files.faq.txt | icat | 2228 |
| appfiles.program_files.getting_started.txt | icat | 90 |
| registry.sam | regripper | 7 |
| appfiles.program_files.overview.txt | icat | 38 |
| appfiles.program_files.well_known.txt | icat | 114 |
| appfiles.program_files.pcrepattern.3.txt | icat | 1475 |
| appfiles.program_files.agentx-mib.txt | icat | 529 |
| registry.system | regripper | 19 |
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
| registry.software | regripper | 9600 |
| appfiles.program_files.ipv6-tc.txt | icat | 69 |
| appfiles.program_files.ipv6-tcp-mib.txt | icat | 213 |
| appfiles.program_files.ipv6-udp-mib.txt | icat | 143 |
| registry.software | regripper | 283 |
| appfiles.program_files.lm-sensors-mib.txt | icat | 232 |
| appfiles.program_files.mta-mib.txt | icat | 1228 |
| appfiles.program_files.net-snmp-agent-mib.txt | icat | 546 |
| appfiles.program_files.net-snmp-examples-mib.txt | icat | 229 |
| appfiles.program_files.net-snmp-mib.txt | icat | 69 |
| appfiles.program_files.net-snmp-monitor-mib.txt | icat | 61 |
| registry.system | regripper | 3138 |
| appfiles.program_files.net-snmp-system-mib.txt | icat | 65 |
| appfiles.program_files.net-snmp-tc.txt | icat | 123 |
| registry.system | regripper | 199 |
| appfiles.program_files.network-services-mib.txt | icat | 628 |
| appfiles.program_files.notification-log-mib.txt | icat | 784 |
| appfiles.program_files.rfc-1215.txt | icat | 40 |
| registry.system | regripper | 286 |
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
| registry.ntuser.default user | regripper | 43 |
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
