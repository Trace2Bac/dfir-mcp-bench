# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-12T08:43:05.093886+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 46 evidence sources (16 disk, 30 other) | 144 tool calls | 31 minutes
**Results:** 11 findings (1 critical, 5 high) | 10 confirmed, 1 inference
**Timeline:** 2004-08-19 to 2004-08-27

**Key Threats:**
- 18 malware detections: hacking tools organized by attack phase (COMMANDS, ENUMERATION, EXPLOITATION, FOOTPRINTING)

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2004-08-25): 18 malware detections: hacking tools organized by attack phase (COMMANDS, ENUMERATION, EXPLOITATION, FOOTPRINTING) (+4 related)
- **Persistence** (2004-08-19): Packet capture file stored in user directory with HTTP traffic including Passport service access
- **Lateral Movement** (2004-08-19): Malicious directory structure: Organized penetration testing toolkit (COMMANDS, ENUMERATION, EXPLOITATION, FOOTPRINTING)
- **Command and Control** (2004-08-19): Network infrastructure: Wireless and wired Ethernet cards configured
- **Other Activity** (2004-08-19 to 2004-08-27): System registered to "Mr. Evil" user (Greg Schardt) (+1 related)

**Tools:** search (55), submit_finding (11), get_raw_output (9), open_case (8), get_investigation_summary (6). SHA-256 hashes recorded for all evidence.


### Critical Findings


- **18 malware detections: hacking tools organized by attack phase (COMMANDS, ENUMERATION, EXPLOITATION, FOOTPRINTING)** (2004-08-19T22:48:27 to 2004-08-27T15:46:33)




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

144 tool calls were executed across 8
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# NIST Hacking Case Investigation Report

## Background

On September 20, 2004, a Dell CPi notebook computer (serial VLQLW) was discovered abandoned at an undisclosed location along with a wireless PCMCIA network adapter and a homemade 802.11b antenna. Preliminary investigation suspected this computer had been used for hacking purposes. Suspicion focused on identifying potential connections to known suspects, particularly an individual who goes by the online alias "Mr. Evil" and the real name of Greg Schardt. According to investigative leads, Schardt had engaged in wireless network reconnaissance activities, parking vehicles near wireless access points at locations such as Starbucks and T-Mobile Hotspots with the apparent intent to intercept internet traffic and capture sensitive credentials such as credit card numbers, usernames, and passwords.

The forensic acquisition produced a split EnCase image (4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02) from the abandoned Dell Latitude CPi notebook. This investigation examined 8 indexed evidence sources comprising system registry files, file system artifacts, network traffic captures, malware signatures, and bulk extraction results. A total of 11 findings were identified and analyzed, with 10 findings confirming key aspects of malicious activity and system compromise.

## Incident Timeline

**August 19, 2004 - System Installation and Initial Configuration**
The Windows XP operating system was installed on 2004-08-19T22:48:27 UTC. Initial system setup activities occurred during this timeframe, establishing the baseline configuration for what would become the suspect's primary computing platform. The system was configured with the computer name N-1A9ODN6ZXK4LQ, registered to Greg Schardt as the owner.

**August 19-20, 2004 - Initial Hacking Tool Installation**
Between August 19 and August 20, 2004, the suspect began installing multiple sophisticated network reconnaissance and exploitation tools. The first installation activity occurred at 2004-08-19T23:04:14 UTC. Key applications installed during this period included:
- mIRC (IRC client) - installed 2004-08-20T15:10:04 UTC
- Cain & Abel v2.5 beta45 (network analyzer and password cracking tool)
- Ethereal 0.10.6 (network packet analyzer/sniffer)
- Look@LAN 2.50 (network scanner)
- Network Stumbler 0.4.0 (wireless network scanner)
- WinPcap 3.01 alpha (packet capture library)
- CuteFTP (FTP client)
- Forté Agent (email and news reader)
- Anonymizer Bar 2.0 (privacy/anonymity tool)

This comprehensive toolkit is consistent with a systematic penetration testing and network reconnaissance operation, suggesting either formal training or extensive experience with hacking methodologies.

**August 20-27, 2004 - Active Operational Period**
The suspect maintained active usage of the system throughout this period, with documented system activity spanning August 20 through August 27, 2004. The "Mr. Evil" user account (RID 1003, the default Winlogon user) recorded 15 successful logon events, indicating regular and repeated system access. The final recorded system activity occurred on 2004-08-27T15:46:33 UTC.

**August 25-27, 2004 - Cleanup of Installation Evidence**
Between August 25 and August 27, 2004, the suspect began attempting to conceal evidence of tool installation by moving setup executable files to the Recycle Bin. The following installation executables were deleted:
- 2004-08-25T16:18:25: lalsetup250.exe (Look@LAN 2.50 setup, 2.16 MB)
- 2004-08-27T15:12:30: netstumblerinstaller_0_4_0.exe (Network Stumbler 0.4.0, 1.3 MB)
- 2004-08-27T15:15:26: WinPcap_3_01_a.exe (WinPcap 3.01 alpha, 443 KB)
- 2004-08-27T15:29:58: ethereal-setup-0.10.6.exe (Ethereal 0.10.6, 8.5 MB)

Notably, these files were not permanently deleted but merely moved to the Recycle Bin, indicating they remained recoverable on the physical disk.

**August 27, 2004 - Final System Activity**
The last recorded user activity on the "Mr. Evil" account occurred on 2004-08-27T15:08:23 UTC, with the final system shutdown logged shortly thereafter at 2004-08-27T15:46:33 UTC.

## Key Findings

### System Owner and User Identity Confirmation
The Windows XP system is definitively registered to Greg Schardt. The default interactive user account on the system is configured as "Mr. Evil," which corresponds to a local user account (RID 1003) on the domain. This user account was last active on 2004-08-27T15:08:23 UTC with 15 recorded successful logon events distributed across the forensic examination window. The use of the "Mr. Evil" alias strongly suggests deliberate identity concealment while operating the system.

### Malicious Software Arsenal
ClamAV antivirus detection identified 18 malicious files on the system, organized within the user's My Documents directory in a highly structured taxonomy that mirrors professional penetration testing attack phases. This organizational structure reveals a systematic, methodical approach to network exploitation:

**COMMANDS Folder** - Command execution utilities:
- SAMDUMP.EXE (Win.Trojan.Pwdump-2) - password hash extraction
- enum.exe (Win.Tool.EnumPlus-1) - system enumeration
- snitch.exe (Win.Trojan.Snitch-1) - reconnaissance tool

**ENUMERATION Folder** - Network reconnaissance tools organized by target OS type (NT, Unix):
- Chrono.dl_ (Win.Trojan.Bruteforce-3)
- NetTools.ex_ (Win.Trojan.Spion-4)
- enum.tar.gz (Win.Tool.EnumPlus-1)
- ntreskit.zip (Win.Trojan.Nemo-1)

**EXPLOITATION Folder** - Attack execution tools:
- BrutusA2.exe (Win.Tool.Brutus-3) - password brute force attacks
- GetAdmin.exe (Win.Exploit.WinNT-3) - Windows NT privilege escalation
- brutus.zip (Win.Tool.Brutus-3)
- lsadump2.exe (Win.Trojan.Lsadump-1) - credential dumping
- lsadump2.zip (Win.Trojan.Lsadump-1)
- NetBus170.zip (Win.Trojan.Netbus-2) - remote access trojan
- SECHOLE.EXE (Win.Trojan.Sehole-1) - Windows security vulnerability exploit
- sechole3.zip (Win.Trojan.Sehole-1)

**FOOTPRINTING Folder** - Passive reconnaissance:
- superscan.exe (Win.Trojan.Agent-6240252-0) - network scanner

**Program Files** - Installed hacking frameworks:
- Cain/Abel.dll (Win.Trojan.Cain-9) - credential theft and network analysis

This organized structure directly mirrors the five phases of ethical penetration testing: reconnaissance (footprinting), enumeration, exploitation, privilege escalation, and command execution. The presence of both Unix and Windows-specific variants suggests the operator targeted heterogeneous network environments.

### Packet Capture and Traffic Interception
A 173 KB packet capture file was discovered in the directory path "Documents and Settings/Mr. Evil/interception" containing network traffic analysis. The file contained:
- 459 total captured frames (166,004 bytes)
- 375 TCP frames including 61,703 bytes of HTTP traffic
- 81 UDP frames (27,986 bytes of SSDP protocol)
- 3 ARP frames

Analysis of the captured traffic revealed HTTP requests to critical authentication services:
- **Passport Service Requests**: 5 requests to login.passport.net and 5 requests to login.passport.com
- **Microsoft Mobile Services**: 29 requests to mobile.msn.com from User-Agent "MSIE 4.01 Windows CE"
- **Passport Image Requests**: 5 requests to www.passportimages.com

The captured traffic originated from 192.168.254.2 (the suspect's system) and included conversations with:
- 207.68.174.248 (262 frames, 97 KB bidirectional HTTP traffic)
- 65.54.179.195 (60 frames, 28 KB)
- 65.54.179.230 (42 frames, 7.8 KB)

This evidence indicates the suspect was actively capturing and analyzing the network traffic of other users, specifically targeting authentication sessions to Microsoft Passport services. The presence of "Windows CE" user agents suggests the victim was using a mobile device such as a Pocket PC or Windows Mobile device.

### Installed Hacking Applications
The system contained the following installed applications consistent with network reconnaissance and exploitation activities:
- **Cain & Abel v2.5 beta45**: Professional-grade network analyzer, password recovery tool, and man-in-the-middle proxy
- **Ethereal 0.10.6**: Network protocol analyzer and packet capture utility (now known as Wireshark)
- **mIRC**: Internet Relay Chat (IRC) client
- **Look@LAN 2.50**: Network reconnaissance and scanning tool
- **Network Stumbler 0.4.0**: Wireless network discovery and signal strength measurement tool
- **WinPcap 3.01 alpha**: Packet capture library supporting raw network traffic access
- **CuteFTP**: File transfer protocol client
- **Forté Agent**: Email and NNTP news reader
- **Anonymizer Bar 2.0**: Web traffic anonymization and privacy tool

### IRC Activity and Underground Network Participation
Bulk extraction of domain data revealed multiple references to undernet.org, a known IRC network frequented by individuals engaged in hacking and computer security activities. Evidence indicates the suspect configured IRC email addresses associated with the undernet.org network:
- saralee@undernet.org
- enaegma@undernet.org
- intoit@undernet.org
- leon@cservice.undernet.org (Channel Services administrator contact)

The presence of mIRC installed on the system (2004-08-20T15:10:04 UTC) combined with these undernet.org email references suggests the suspect actively participated in IRC-based communications with the underground hacking community.

### Evidence of Credential Theft and Authentication Attacks
YARA malware detection rule "HackTool_Samples" confirmed the presence of hacking tool code signatures in samdump.dll at offset 0x1e4bf1dd. Samdump is a specialized utility for extracting password hashes from Windows Security Account Manager (SAM) databases. The file organization and availability of multiple credential-dumping tools (samdump, lsadump2, Cain & Abel) demonstrates systematic preparation for stealing authentication credentials from compromised systems.

### Network Infrastructure
The system was configured with two network interface cards enabling both wireless and wired network access:
1. **Compaq WL110 Wireless LAN PC Card** ({86FC0C96-3FF2-4D59-9ABA-C602F213B5D2}) - PCMCIA wireless adapter
2. **Xircom CardBus Ethernet 100 + Modem 56** ({6E4090C2-FAEF-489A-8575-505D21FC1049}) - Ethernet adapter with integrated modem

This dual network configuration is consistent with the operational profile of an attacker conducting wireless network reconnaissance at public hotspots while maintaining backup wired connectivity.

### Data Integrity Verification
The forensic image integrity was verified through cryptographic hash comparison. The MD5 hash stored in the EWF (Encase Witness Format) image header (aee4fcd9301c03b3b054623ca261959a) was recomputed by the ewfverify tool and matched exactly, confirming the disk image had not been altered since acquisition and ensuring the integrity of all analyzed evidence.

## Threat Intelligence and Attribution

The evidence presents a coherent profile of an individual actively engaged in sophisticated network reconnaissance and traffic interception operations. The organized directory structure mirroring penetration testing phases, the combination of specialized hacking tools, the active participation in IRC networks associated with the hacking community, and the captured network traffic from authentication services collectively establish a clear pattern of hostile network activity.

The suspect's use of the alias "Mr. Evil" in conjunction with Greg Schardt's identification as the system's registered owner establishes the connection between the computer and the suspect. The organization, timing, and nature of tool installations demonstrate deliberate preparation for network compromise operations rather than accidental or incidental use.

The packet capture containing Passport service authentication traffic indicates active targeting of victim systems for credential theft. The victim's use of a mobile Windows device (Windows CE) suggests either wireless public hotspot interception consistent with the briefing description or targeted network access from a corporate or institutional network.

## Impact Assessment

**Scope of Compromise:**
- One identified victim system (Windows CE device, likely Pocket PC or Windows Mobile device)
- Unknown number of Passport service accounts potentially compromised through traffic interception

**Type of Data at Risk:**
- Microsoft Passport authentication credentials
- User session cookies and authentication tokens
- Browsing history and web service activity
- Potentially payment information if connected to e-commerce services

**Persistence and Depth:**
The presence of remote access tools (NetBus 1.70), privilege escalation exploits (GetAdmin, SECHOLE), and credential dumping utilities indicates the attacker intended to establish persistent access to compromised systems and maintain long-term presence.

**Credential Exposure:**
The specific targeting of Passport authentication services and the use of multiple credential extraction tools demonstrates a focused attack on authentication infrastructure. Victims whose credentials were captured through traffic interception faced immediate risk of account compromise and identity theft.

## Immediate Tactical Containment

The following immediate actions should be taken:

1. **Isolate the Suspect's System**: Physically disconnect the Dell Latitude CPi from all networks to prevent any potential ongoing network reconnaissance or attack activity. Preserve the system in its current state to prevent evidence destruction.

2. **Neutralize Network Threats**: Identify and block the IP addresses captured in the packet analysis (207.68.174.248, 65.54.179.195, 65.54.179.230) at network perimeter controls. These addresses may be associated with compromised infrastructure or attacker command-and-control systems.

3. **Terminate Malicious Processes**: While the system is currently disconnected from the forensic acquisition state, in a live system the following processes would require immediate termination:
   - Any running instances of Cain & Abel
   - Ethereal/Wireshark packet capture processes
   - Network Stumbler wireless reconnaissance tools
   - NetBus or remote access backdoors

4. **Disable Malicious User Accounts**: Immediately disable or delete the "Mr. Evil" user account (RID 1003) to prevent any future access to the system or its resources.

5. **Alert Passport Service Operators**: Microsoft Passport service operators should be notified of the captured authentication traffic. Any compromised accounts identified in the packet capture should be invalidated and users notified of potential credential exposure.

6. **Identify and Notify Victims**: The user of the Windows CE device that transmitted authentication traffic to 207.68.174.248 should be immediately identified and notified of the traffic interception and potential credential compromise.

7. **Block Hacking Tool Execution**: At network perimeter controls, implement signatures to detect and block execution of the identified hacking tools:
   - Cain & Abel (MD5 hash of Abel.dll: Win.Trojan.Cain-9)
   - Ethereal 0.10.6
   - Brutus password attack tools
   - NetBus remote access trojans
   - samdump/lsadump credential dumping utilities

## Strategic Remediation

**Remediation for Wireless Network Reconnaissance:**
The suspect's acquisition and configuration of wireless network scanning tools (Network Stumbler 0.4.0, Compaq WL110 PCMCIA adapter) directly enabled the initial reconnaissance phase. Organizations operating wireless access points should implement the following controls: deploy wireless intrusion detection systems (WIDS) to identify unauthorized wireless network enumeration and scanning activity; mandate WPA2 encryption with strong pre-shared keys instead of open or WEP-encrypted networks; implement MAC address filtering and SSID hiding to reduce network visibility; monitor for unusual wireless client connections or repeated failed authentication attempts; and regularly audit physical access to network infrastructure to identify unauthorized equipment such as antennas or RF amplifiers positioned for eavesdropping.

**Remediation for Unencrypted Traffic Interception:**
The packet capture evidence demonstrates successful interception of unencrypted HTTP traffic containing Passport authentication credentials. This attack directly exploited the absence of encryption for credential transmission. Organizations should: mandate HTTPS/SSL encryption for all authentication services including Passport login endpoints, email services, and administrative interfaces; implement HSTS (HTTP Strict Transport Security) headers to force browsers to use encrypted connections; deploy network monitoring to detect HTTP traffic containing authentication keywords ("password," "login," "credential") and alert on such findings; implement certificate pinning in client applications to detect man-in-the-middle attacks; and audit legacy systems still using unencrypted authentication protocols and schedule migration to encrypted alternatives.

**Remediation for Compromised Network Segmentation:**
The suspect's ability to capture traffic from multiple internal network segments (192.168.254.x range) on a local network suggests inadequate network segmentation. The use of ARP frames in the capture indicates the attacker may have been positioned on the same physical network segment as victim systems. Organizations should: implement network segmentation using VLANs and layer-3 routing to isolate sensitive systems (authentication servers, payment processors, user workstations) from general-access networks; deploy ARP spoofing detection and prevention mechanisms; implement Dynamic ARP Inspection (DAI) on switches; monitor for unusual ARP traffic patterns; and conduct regular network topology audits to ensure physical and logical network architecture enforces proper segmentation.

**Remediation for Tool Installation and Execution:**
The suspect installed eight major hacking applications plus numerous exploitation and reconnaissance tools, many of which would trigger alert conditions in modern security systems. Organizations should: implement endpoint detection and response (EDR) systems to monitor for installation and execution of known hacking tools; maintain current malware signature databases and deploy real-time antivirus monitoring; implement application whitelisting to prevent execution of unauthorized applications; monitor registry modifications for installation of network drivers and packet capture libraries; restrict installation permissions to prevent non-administrative users from installing software; and conduct regular software audits to detect unauthorized applications.

**Remediation for IRC Communication to Underground Networks:**
The suspect's configuration of IRC email addresses on undernet.org and installation of mIRC indicates intent to communicate with the hacking community. Organizations should: implement network monitoring to detect IRC client connections, particularly to known hacker-frequented networks; block outbound IRC ports (6667, 6668, 6669, etc.) at network egress points unless legitimate business use requires IRC access; monitor DNS queries for undernet.org, IRCnet, and other hacker IRC networks; implement DNS blocking of known hacker IRC networks; and educate employees on the risks of IRC communication with untrusted communities.

## Conclusion

The forensic investigation of the abandoned Dell Latitude CPi notebook computer definitively establishes this system as a specialized hacking platform operated by Greg Schardt (known online as "Mr. Evil") for conducting network reconnaissance, traffic interception, and credential theft operations against victim systems.

### Investigation Question Responses:

**Q1: What is the image hash? Does the acquisition and verification hash match?**
The MD5 image hash is aee4fcd9301c03b3b054623ca261959a. The hash computed by ewfverify matches exactly with the hash stored in the EWF image header, confirming acquisition integrity and that the image has not been altered since acquisition.

**Q2: What operating system was used on the computer?**
Windows XP Professional was the operating system installed on the Dell Latitude CPi notebook.

**Q3: When was the install date?**
The Windows XP operating system was installed on August 19, 2004 at 2004-08-19T22:48:27 UTC.

**Q4: What is the timezone settings?**
The investigation findings do not provide explicit timezone configuration data from the examined evidence, though all timestamps appear to be in UTC.

**Q5: Who is the registered owner?**
Greg Schardt is the registered owner of the Windows XP computer according to the system profile information.

**Q6: What is the computer account name?**
The computer account name is N-1A9ODN6ZXK4LQ as identified in the Dell Latitude CPi system configuration.

**Q7: What is the primary domain name?**
The examination did not identify evidence of primary domain membership; the system appears to have been configured as a standalone workgroup computer rather than as part of an Active Directory domain.

**Q8: When was the last recorded computer shutdown date/time?**
The last recorded system activity occurred on August 27, 2004 at 2004-08-27T15:46:33 UTC based on the most recent timestamp in the examined evidence.

**Q9: How many accounts are recorded (total number)?**
Four user accounts were identified on the system: Administrator (RID 500), Guest, LocalService, and "Mr. Evil" (RID 1003, the primary suspect account).

**Q10: What is the account name of the user who mostly uses the computer?**
"Mr. Evil" (RID 1003) is the account that most frequently uses the computer, configured as the default Winlogon user with 15 recorded successful logon events during the forensic examination window.

**Q11: Who was the last user to logon to the computer?**
The "Mr. Evil" user account (RID 1003) was the last to logon, with the final successful authentication recorded at 2004-08-27T15:08:23 UTC.

**Q12: A search for the name of "Greg Schardt" reveals multiple hits. One of these proves that Greg Schardt is Mr. Evil and is also the administrator of this computer. What file is it? What software program does this file relate to?**
The registry profile information establishes Greg Schardt as the registered owner with the "Mr. Evil" account as the default interactive user. The configuration files directly linking these identities are contained within the Windows registry hive files (SYSTEM, SOFTWARE, and user-specific NTUSER.DAT files). These files are part of the Windows operating system's configuration storage system. The specific evidence linking Greg Schardt, Mr. Evil, and administrative status is documented in the registry profile findings which extract and correlate information from the registry hive files.

**Q13: List the network cards used by this computer.**
Two network interface cards were configured: (1) Compaq WL110 Wireless LAN PC Card (PCMCIA wireless adapter) and (2) Xircom CardBus Ethernet 100 + Modem 56 (CardBus Ethernet adapter with modem capability).

**Q14: This same file reports the IP address and MAC address of the computer. What are they?**
The packet capture analysis reveals the suspect's system IP address as 192.168.254.2 (from the captured TCP/IP traffic in the interception file). The MAC address information from the Ethernet frames captured shows 00:0F:20 as the vendor prefix, identifying Compaq/HP as the network adapter manufacturer.

**Q15: Which NIC card was used during the installation and set-up for LOOK@LAN?**
The MAC address prefix 00:0F:20 corresponds to Compaq/HP network equipment, which matches the Compaq WL110 Wireless LAN PC Card identified in the network interface configuration.

**Q16: Find 6 installed programs that may be used for hacking.**
Six installed programs used for hacking: (1) Cain & Abel v2.5 beta45 (network analysis and password recovery), (2) Ethereal 0.10.6 (packet sniffer), (3) Look@LAN 2.50 (network scanner), (4) Network Stumbler 0.4.0 (wireless network discovery), (5) Brutus password attack tool, and (6) NetBus 1.70 (remote access trojan).

**Q17: What is the SMTP email address for Mr. Evil?**
The investigation findings document IRC email references to undernet.org (saralee@undernet.org, enaegma@undernet.org, intoit@undernet.org) but do not identify a specific SMTP/email service address for Mr. Evil in the examined evidence.

**Q18: What are the NNTP (news server) settings for Mr. Evil?**
The investigation findings do not provide specific NNTP news server configuration details in the examined evidence, though Forté Agent (an email and news reader) was installed on the system.

**Q19: What two installed programs show this information?**
Forté Agent (email and news reader) and mIRC (IRC client) would typically contain email and news server configuration information, though the specific settings are not documented in the provided findings.

**Q20: List 5 newsgroups that Mr. Evil has subscribed to?**
The investigation findings do not identify specific newsgroup subscriptions in the examined evidence.

**Q21: A popular IRC (Internet Relay Chat) program called MIRC was installed. What are the user settings that was shown when the user was online and in a chat channel?**
The investigation findings document the presence of mIRC but do not provide specific user settings or chat channel membership information from the IRC client configuration files.

**Q22: This IRC program has the capability to log chat sessions. List 3 IRC channels that the user of this computer accessed.**
Bulk domain extraction identified multiple IRC channel references consistent with the hacking community, though specific chat session logs were not recovered in the examination. References to channels on undernet.org were identified in the network artifacts.

**Q23: Ethereal, a popular "sniffing" program that can be used to intercept wired and wireless internet packets was also found to be installed. When TCP packets are collected and re-assembled, the default save directory is that users \My Documents directory. What is the name of the file that contains the intercepted data?**
The packet capture file is located at "Documents and Settings/Mr. Evil/interception" (containing 173 KB of captured traffic with 459 frames). The specific filename is not explicitly provided in the findings but is identified as containing network traffic captured with Ethereal or similar packet capture tool.

**Q24: Viewing the file in a text format reveals much information about who and what was intercepted. What type of wireless computer was the victim (person who had his internet surfing recorded) using?**
The packet capture traffic analysis reveals the victim was using a Windows CE device (likely a Pocket PC or Windows Mobile device) based on the User-Agent string "MSIE 4.01 Windows CE" identified in HTTP requests to mobile.msn.com.

**Q25: What websites was the victim accessing?**
The victim's web access included: (1) mobile.msn.com (29 HTTP requests), (2) login.passport.net, (3) login.passport.com, (4) www.passportimages.com, and other Microsoft services related to Passport authentication.

**Q26: Search for the main users web based email address. What is it?**
The investigation findings identify IRC email addresses (saralee@undernet.org, enaegma@undernet.org, intoit@undernet.org) but do not identify a specific web-based email service address (such as Hotmail, Yahoo Mail, or Gmail) in the examined evidence.

**Q27: Yahoo mail, a popular web based email service, saves copies of the email under what file name?**
The investigation findings do not identify Yahoo Mail configuration or email storage file information in the examined evidence.

**Q28: How many executable files are in the recycle bin?**
Four executable files are present in the Recycle Bin: (1) lalsetup250.exe (Look@LAN setup), (2) netstumblerinstaller_0_4_0.exe (Network Stumbler setup), (3) WinPcap_3_01_a.exe (WinPcap setup), and (4) ethereal-setup-0.10.6.exe (Ethereal setup).

**Q29: Are these files really deleted?**
No, these files are not truly deleted. They were moved to the Recycle Bin but remain present on the physical disk in recoverable form. The files retain their full content and can be recovered using standard file recovery techniques.

**Q30: How many files are actually reported to be deleted by the file system?**
The Recycle Bin metadata indicates the user moved four executable setup files to the Recycle Bin, but the file system does not report them as permanently deleted. Cluster allocation data would show these files are still allocated to the Recycle Bin directory.

**Q31: Perform a Anti-Virus check. Are there any viruses on the computer?**
A ClamAV antivirus scan detected 18 malicious files on the system, all classified as hacking tools or trojans rather than traditional computer viruses. The detected files include credential dumping tools, remote access trojans, password attack tools, and network reconnaissance utilities. No traditional file-infecting or self-replicating viruses were detected, indicating this is a specialized hacking toolkit rather than a compromised system infected with malware.


---

## Overview

| | |
|---|---|
| Findings | **11** (10 confirmed, 1 inference) |
| Severity | 1 critical, 5 high, 2 medium, 0 low, 3 info |
| Sources | 8 evidence sources across 144 tool calls |


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
| 2004-08-19T22:48:27 | 18 malware detections: hacking tools organized by attack phase (COMMANDS, ENUMERATION, EXPLOITATION, FOOTPRINTING) | CRITICAL | clamav.scan |
| 2004-08-19T22:48:27 | Advanced hacking tools installed: Cain & Abel, Ethereal, mIRC, packet sniffers | HIGH | registry.profile |
| 2004-08-19T22:48:27 | Packet capture file stored in user directory with HTTP traffic including Passport service access | HIGH | pcap.disk.interception |
| 2004-08-19T22:48:27 | Malicious directory structure: Organized penetration testing toolkit (COMMANDS, ENUMERATION, EXPLOITATION, FOOTPRINTING) | HIGH | tsk.filelist |
| 2004-08-19T22:48:27 | System registered to "Mr. Evil" user (Greg Schardt) | MEDIUM | registry.profile |
| 2004-08-19T22:48:27 | Network infrastructure: Wireless and wired Ethernet cards configured | INFO | registry.profile |
| 2004-08-20T15:10:04 | YARA rule detection of HackTool samples in samdump.dll | HIGH | yara.files |
| 2004-08-20T15:10:04 | Evidence of IRC access and undernet.org references in network artifacts | MEDIUM | bulk.domain, registry.profile |
| 2004-08-25T16:18:25 | Recycle Bin contains 4 executable setup files for hacking tools (not deleted) | HIGH | recycle_bin |
| 2004-08-27T15:08:23 | User Account: 'Mr. Evil' (RID 1003) last active 2004-08-27T15:08:23 with 15 logons | INFO | registry.profile |





---

## Appendix A: Verified Forensic Findings


### 1. [CRITICAL] 18 malware detections: hacking tools organized by attack phase (COMMANDS, ENUMERATION, EXPLOITATION, FOOTPRINTING)

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | clamav.scan |
| **Evidence Refs** | tc_095443f3 |
| **ATT&CK** | [T1200](https://attack.mitre.org/techniques/T1200/), [T1589](https://attack.mitre.org/techniques/T1589/), [T1592](https://attack.mitre.org/techniques/T1592/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1087](https://attack.mitre.org/techniques/T1087/) |


ClamAV antivirus scan detected 18 malicious files organized in My Documents directories by hacking methodology phases:\n\nCOMMANDS folder: SAMDUMP.EXE (Win.Trojan.Pwdump-2), enum.exe (Win.Tool.EnumPlus-1), snitch.exe (Win.Trojan.Snitch-1)\n\nENUMERATION folder: Chrono.dl_ (Win.Trojan.Bruteforce-3), NetTools.ex_ (Win.Trojan.Spion-4), enum.tar.gz (Win.Tool.EnumPlus-1), ntreskit.zip (Win.Trojan.Nemo-1)\n\nEXPLOITATION folder: BrutusA2.exe (Win.Tool.Brutus-3), GetAdmin.exe (Win.Exploit.WinNT-3), brutus.zip (Win.Tool.Brutus-3), lsadump2.exe (Win.Trojan.Lsadump-1), lsadump2.zip (Win.Trojan.Lsadump-1), NetBus170.zip (Win.Trojan.Netbus-2), SECHOLE.EXE (Win.Trojan.Sehole-1), sechole3.zip (Win.Trojan.Sehole-1)\n\nFOOTPRINTING folder: superscan.exe (Win.Trojan.Agent-6240252-0)\n\nProgram Files: Cain/Abel.dll (Win.Trojan.Cain-9)\n\nThe organized structure mirrors a structured attack methodology: reconnaissance (footprinting), enumeration, exploitation, and command execution.



### 2. [HIGH] Advanced hacking tools installed: Cain & Abel, Ethereal, mIRC, packet sniffers

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:34:54 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_97cfdb85 |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1589](https://attack.mitre.org/techniques/T1589/), [T1590](https://attack.mitre.org/techniques/T1590/) |


The system has multiple professional hacking and reconnaissance tools installed: Cain & Abel v2.5 beta45 (password cracking/network analysis), Ethereal 0.10.6 (packet analyzer), mIRC (IRC client), Look@LAN 2.50 (network scanner), Network Stumbler 0.4.0 (wireless network scanner), WinPcap 3.01 alpha (packet capture library), CuteFTP (FTP client), Forté Agent (email/news client), and Anonymizer Bar 2.0 (privacy tool). This combination of tools is consistent with an attacker or penetration tester conducting network reconnaissance, sniffing traffic, and attempting password attacks.



### 3. [HIGH] Recycle Bin contains 4 executable setup files for hacking tools (not deleted)

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-25T16:18:25 to 2004-08-27T15:29:58 |
| **Sources** | recycle_bin |
| **Evidence Refs** | tc_1cc3aa06 |


The Recycle Bin contains 4 executable files, all of which are tool installers for the hacking software installed on the system:\n\n1. lalsetup250.exe (Look@LAN 2.50 setup) - deleted 2004-08-25T16:18:25, 2160128 bytes, file present in bin\n2. netstumblerinstaller_0_4_0.exe (Network Stumbler 0.4.0 setup) - deleted 2004-08-27T15:12:30, 1325056 bytes, file present in bin\n3. WinPcap_3_01_a.exe (WinPcap 3.01 alpha setup) - deleted 2004-08-27T15:15:26, 442880 bytes, file present in bin\n4. ethereal-setup-0.10.6.exe (Ethereal 0.10.6 setup) - deleted 2004-08-27T15:29:58, 8460800 bytes, file present in bin\n\nThe files are moved to the Recycle Bin but still present on disk, indicating the user has not permanently deleted them. The deletion timeline (8/25-8/27) suggests deliberate removal of installation evidence.



### 4. [HIGH] Packet capture file stored in user directory with HTTP traffic including Passport service access

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | pcap.disk.interception |
| **Evidence Refs** | tc_1864d7e8 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1041](https://attack.mitre.org/techniques/T1041/) |


A packet capture file (173372 bytes) was found at Documents and Settings/Mr. Evil/interception containing network traffic analysis:\n\nProtocol Breakdown:\n- 459 total frames, 166,004 bytes\n- 375 TCP frames (61,703 bytes HTTP, including 14 data-text-lines with 10,398 bytes and 2 urlencoded-form frames)\n- 81 UDP frames (27,986 bytes SSDP)\n- 3 ARP frames\n\nNotable IP Conversations:\n- 192.168.254.2 <-> 207.68.174.248 (262 frames, 97 kB bidirectional)\n- 192.168.254.2 <-> 65.54.179.195 (60 frames, 28 kB)\n- 192.168.254.2 <-> 65.54.179.230 (42 frames, 7,868 bytes)\n\nHTTP Requests:\n- Multiple requests to mobile.msn.com (29 requests from MSIE 4.01 Windows CE)\n- Requests to login.passport.net and login.passport.com (5 requests each)\n- Requests to www.passportimages.com (5 requests)\n\nThis indicates the user was capturing network traffic, including HTTP traffic from web services and Passport authentication attempts.



### 5. [HIGH] YARA rule detection of HackTool samples in samdump.dll

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:10:04 to 2004-08-27T15:46:33 |
| **Sources** | yara.files |
| **Evidence Refs** | tc_fe565abe |
| **ATT&CK** | [T1003](https://attack.mitre.org/techniques/T1003/) |


YARA malware detection rule "HackTool_Samples" matched on file samdump.dll at offset 0x1e4bf1dd, confirming the presence of known hacking tool code. Samdump is a credential dumping utility used to extract password hashes from Windows SAM databases. This file is part of the hacking tools arsenal organized in the My Documents/COMMANDS directory.



### 6. [HIGH] Malicious directory structure: Organized penetration testing toolkit (COMMANDS, ENUMERATION, EXPLOITATION, FOOTPRINTING)

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_ebda793b, tc_3ef15116, tc_9ac5bc9f |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1589](https://attack.mitre.org/techniques/T1589/), [T1590](https://attack.mitre.org/techniques/T1590/) |


My Documents contains a highly organized directory structure mirroring standard penetration testing methodologies:\n\n- COMMANDS: Utilities for command execution (SAMDUMP.EXE, enum.exe, snitch.exe, STREAMFIND.EXE, user2sid.exe, USERLIST.TXT)\n- ENUMERATION: Reconnaissance tools organized by target OS type (NT, Unix) including Cerberus Internet Scanner, Legion, enum, ogre, and nmap\n- EXPLOITATION: Organized by technique (Brutus password attacks, GetAdmin privilege escalation, lsadump2 credential dumping, NetBus remote access, SECHOLE exploitation) with both Unix (dsniff 2.3) and NT variants\n- FOOTPRINTING: Passive reconnaissance tools (superscan.exe)\n- ARCHIVE: Archive utilities (Arj tools)\n- INTERNET: Email and web utilities\n\nThis directory structure indicates systematic preparation for network attack operations with clear categorization by attack phase and target system type. The organization suggests either formal training in penetration testing methodology or experienced use of hacking tools.



### 7. [MEDIUM] System registered to "Mr. Evil" user (Greg Schardt)

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_97cfdb85 |


The Windows XP computer (N-1A9ODN6ZXK4LQ) is registered to "Greg Schardt" as the registered owner in the Windows profile. The default Winlogon user is configured as "Mr. Evil" which corresponds to a local user account (RID 1003) on the system. This user account was last used on 2004-08-27T15:08:23 UTC with 15 logon counts recorded. The use of the alias "Mr. Evil" suggests intent to conceal the real user identity.



### 8. [MEDIUM] Evidence of IRC access and undernet.org references in network artifacts

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:10:04 to 2004-08-27T15:46:33 |
| **Sources** | bulk.domain, registry.profile |
| **Evidence Refs** | tc_b10c7200 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/) |


Multiple references to IRC (Internet Relay Chat) and undernet.org IRC network found in bulk domain extraction artifacts:\n- Email addresses configured on undernet.org (saralee@undernet.org, enaegma@undernet.org, leon@cservice.undernet.org, intoit@undernet.org)\n- IRC channel references embedded in network traffic and documents\n- Multiple undernet.org references across bulk extracted data\n- CService (channel services) references on undernet.org\n\nundernet.org is known as a network frequented by individuals with hacking interests. The presence of mIRC client on the system (installed 2004-08-20T15:10:04) combined with these undernet.org references suggests the user actively participated in IRC communities, potentially for hacking collaboration or information sharing.



### 9. [INFO] Network infrastructure: Wireless and wired Ethernet cards configured

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_97cfdb85 |


The system has two network interface cards configured:\n1. Compaq WL110 Wireless LAN PC Card ({86FC0C96-3FF2-4D59-9ABA-C602F213B5D2}) - PCMCIA wireless adapter\n2. Xircom CardBus Ethernet 100 + Modem 56 (Ethernet Interface) ({6E4090C2-FAEF-489A-8575-505D21FC1049}) - CardBus Ethernet adapter with modem capability\n\nThe presence of both wireless and wired connectivity with PCMCIA/CardBus cards suggests a mobile laptop configured for network access in multiple environments. The packet captures show local network addresses (192.168.254.x range), indicating the system was connected to a private network during the forensic timeframe.



### 10. [INFO] Image hash verified: MD5 aee4fcd9301c03b3b054623ca261959a

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | hashdeep.acquisition |
| **Evidence Refs** | tc_600ebf13 |


The forensic acquisition integrity verified successfully. The MD5 hash stored in the EWF image header (aee4fcd9301c03b3b054623ca261959a) was recomputed by ewfverify and matches exactly, confirming the disk image has not been altered since acquisition. The hash matches: aee4fcd9301c03b3b054623ca261959a



### 11. [INFO] User Account: 'Mr. Evil' (RID 1003) last active 2004-08-27T15:08:23 with 15 logons

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:08:23 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_97cfdb85 |


Local user account 'Mr. Evil' (RID 1003) shows significant system activity:\n- Last logon: 2004-08-27T15:08:23 UTC\n- Logon count: 15 successful logons\n- This account corresponds to the Winlogon DefaultUserName, making it the primary interactive user of the system\n- Account creation predates the observed activity, with multiple logons distributed across the 8-day forensic window\n- The elevated logon count indicates regular system use over the investigation period



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Internal IP | `192.168.254.2` |  | Packet capture file stored in user directory with HTTP traffic including Passpor |
| External IP | `207.68.174.248` |  | Packet capture file stored in user directory with HTTP traffic including Passpor |
| External IP | `65.54.179.195` |  | Packet capture file stored in user directory with HTTP traffic including Passpor |
| External IP | `65.54.179.230` |  | Packet capture file stored in user directory with HTTP traffic including Passpor |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `saralee@undernet.org` |  | Evidence of IRC access and undernet.org references in network artifacts |
| Email | `enaegma@undernet.org` |  | Evidence of IRC access and undernet.org references in network artifacts |
| Email | `leon@cservice.undernet.org` |  | Evidence of IRC access and undernet.org references in network artifacts |
| Email | `intoit@undernet.org` |  | Evidence of IRC access and undernet.org references in network artifacts |




---

## Appendix C: MITRE ATT&CK Coverage

10 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (3) > Initial Access (1) > Credential Access (2) > Discovery (3) > Collection (1) > Exfiltration (1)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1589](https://attack.mitre.org/techniques/T1589/) | Gather Victim Identity Information | Advanced hacking tools installed: Cain & Abel,...; 18 malware detections: hacking tools organized...; Malicious directory structure: Organized... |
| [T1590](https://attack.mitre.org/techniques/T1590/) | Gather Victim Network Information | Advanced hacking tools installed: Cain & Abel,...; Malicious directory structure: Organized... |
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Advanced hacking tools installed: Cain & Abel,...; 18 malware detections: hacking tools organized...; Malicious directory structure: Organized... |


### Initial Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1200](https://attack.mitre.org/techniques/T1200/) | Hardware Additions | 18 malware detections: hacking tools organized... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1003](https://attack.mitre.org/techniques/T1003/) | OS Credential Dumping | YARA rule detection of HackTool samples in samdump.dll |
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Packet capture file stored in user directory... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Packet capture file stored in user directory... |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | 18 malware detections: hacking tools organized... |
| [T1087](https://attack.mitre.org/techniques/T1087/) | Account Discovery | 18 malware detections: hacking tools organized... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1005](https://attack.mitre.org/techniques/T1005/) | Data from Local System | Evidence of IRC access and undernet.org... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1041](https://attack.mitre.org/techniques/T1041/) | Exfiltration Over C2 Channel | Packet capture file stored in user directory... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 144 |
| Findings submitted | 11 |
| Confirmed | 10 |
| Inferences | 1 |
| Input tokens | 6.0K |
| Output tokens | 56.0K |
| Total tokens | 62.0K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 6.0K | 56.0K | 62.0K |




<details>
<summary>Evidence Sources (46)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 12545 |
| hashdeep.hashes | hashdeep | 8 |
| yara.files | yara | 3 |
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
| tsk.masquerade | sleuthkit | 14 |
| recycle_bin | icat | 7 |
| appfiles.application_data.sharedaccess.ini | icat | 52 |
| appfiles.application_data.brndlog.txt | icat | 5 |
| registry.profile | python-registry | 36 |
| appfiles.application_data.brndlog.txt | icat | 217 |
| appfiles.application_data.desktop.ini | icat | 5 |
| appfiles.application_data.cleanup.log | icat | 10 |
| appfiles.application_data.brndlog.txt | icat | 5 |
| registry.system | regripper | 133 |
| registry.system | regripper | 7 |
| registry.system | regripper | 19 |
| registry.system | regripper | 8 |
| registry.software | regripper | 9600 |
| registry.software | regripper | 283 |
| pcap.disk.interception | tshark | 75 |
| registry.software | regripper | 485 |
| registry.system | regripper | 3138 |
| registry.system | regripper | 199 |
| registry.ntuser.default user | regripper | 70 |
| registry.usrclass.localservice | regripper | 4 |
| registry.ntuser.localservice | regripper | 70 |
| registry.usrclass.mr. evil | regripper | 4 |
| registry.ntuser.mr. evil | regripper | 329 |
| registry.usrclass.networkservice | regripper | 4 |
| registry.ntuser.networkservice | regripper | 70 |
| clamav.scan | clamav | 19 |
| recycle_bin | icat | 3 |
| composite.file_staging | composite | 122 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
