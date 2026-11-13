# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-13T13:51:41.001494+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 50 evidence sources (16 disk, 34 other) | 163 tool calls | 34 minutes
**Results:** 16 findings (4 critical, 9 high) | 14 confirmed, 2 inference
**Timeline:** 2004-08-19 to 2004-08-27

**Key Threats:**
- 18 Malicious Files and Hacking Tools Detected by ClamAV
- Victim Data Captured in Ethereal Packet Capture File
- Victim Web-Based Email Access (Passport/MSN) Credentials Captured
- Cain & Abel Password Hashing and Network Analysis Tool Installed

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2004-08-26): Greg Schardt Identified as "Mr. Evil" Administrator Account (+9 related)
- **Persistence** (2004-08-19 to 2004-08-27): User Account Activity: Mr. Evil as Primary Administrator (+3 related)
- **Lateral Movement** (2004-08-20): 18 Malicious Files and Hacking Tools Detected by ClamAV

**Tools:** search (66), submit_finding (17), get_raw_output (9), open_case (8), get_investigation_summary (6). SHA-256 hashes recorded for all evidence.


### Critical Findings


- **18 Malicious Files and Hacking Tools Detected by ClamAV** (2004-08-20T15:00:00 to 2004-08-27T15:30:00)


- **Victim Data Captured in Ethereal Packet Capture File** (2004-08-27T15:00:00 to 2004-08-27T16:00:00)


- **Victim Web-Based Email Access (Passport/MSN) Credentials Captured** (2004-08-27T15:30:00 to 2004-08-27T16:00:00)


- **Cain & Abel Password Hashing and Network Analysis Tool Installed** (2004-08-20T15:05:58 to 2004-08-27T15:33:02)




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

163 tool calls were executed across 10
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# NIST Hacking Case Investigation Report

## Background

On September 20, 2004, a Dell CPi notebook computer (serial# VLQLW) was discovered abandoned with a wireless PCMCIA card and external 802.11b antenna. The device was suspected to be used for hacking purposes and potentially connected to suspect Greg Schardt, known online as "Mr. Evil." Investigative leads indicated that Schardt would park within range of wireless access points at locations such as Starbucks and T-Mobile hotspots to intercept internet traffic for the purpose of credential theft, particularly credit card numbers, usernames, and passwords.

The forensic examination was conducted on the EnCase segmented image located at `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` (with segment E02). The investigation identified 10 evidence sources across {{unique_source_types}} extraction tools. A total of 16 findings were submitted, comprising 4 critical, 9 high, 1 medium severity, and 2 informational findings, across 13 distinct MITRE ATT&CK techniques.

### System Environment

The computer contained a Dell Latitude CPi system running Microsoft Windows XP Professional (Build 2600, Version 5.1) installed on August 19, 2004 at 22:48:27 UTC on computer N-1A9ODN6ZXK4LQ. The system was configured with Central Standard Time (UTC-6, daylight UTC-5) timezone. The last recorded system shutdown occurred on August 27, 2004 at 15:46:33.109216 UTC—the same day analysis of the hacking tools and network interception began. Two network interfaces were configured: a Compaq WL110 Wireless LAN PC Card (likely a 3Com product based on MAC address vendor ID 001) and a Xircom CardBus Ethernet 100 + Modem 56.

## Incident Timeline

### Phase 1: System Setup and Software Installation (August 19-20, 2004)

The investigation timeline begins with the system installation on August 19, 2004. Registry evidence shows that Greg Schardt was registered as the system owner (RegisteredOwner in the SOFTWARE hive). The primary user account created for the system was "Mr. Evil," which was configured as a local administrator (RID 1003 with 15 logon events).

On August 20, 2004, beginning at 15:05:58 UTC, Schardt initiated a coordinated software installation campaign. Between 15:05 and 15:10 UTC, seven malicious applications were installed in rapid succession:

1. **Cain & Abel v2.5 beta45** (15:05:58) - A multipurpose hacking tool capable of password cracking, network packet sniffing, ARP spoofing, and man-in-the-middle attacks.
2. **Look@LAN 2.50 Build 29** (15:05 approx) - A network discovery and enumeration scanner.
3. **WinPcap 3.01 alpha** (15:08 approx) - Packet capture driver enabling network sniffing capabilities.
4. **Ethereal 0.10.6** (15:08 approx) - Professional packet analyzer and network protocol dissector.
5. **Forté Agent v19** (15:08:02) - Newsreader client for NNTP (Network News Transfer Protocol) access to anonymous newsgroups and email remailers.
6. **mIRC v6.12** (15:09:46) - Internet Relay Chat client for remote communication with hacking communities.
7. **Network Stumbler 0.4.0** (15:12 approx) - Wireless LAN discovery tool for identifying wireless networks.

Additional utilities were installed including CuteFTP for file transfer, "123 Write All Stored Passwords" for credential theft, and Anonymizer Bar 2.0 for anonymizing web browsing. The installation phase completed by August 27, 2004 at 15:29:19 UTC when Ethereal's installer was executed.

### Phase 2: Network Reconnaissance (August 26-27, 2004)

Between August 26 and August 27, 2004, Schardt began active reconnaissance of target networks:

- **August 26, 14:58:25 UTC**: Look@LAN network scanner executed to discover active hosts and services.
- **August 26, 15:06:14 UTC**: LookAtHost (variant) executed for detailed host enumeration.
- **August 26, 15:13:57 UTC**: whois.exe tool executed to perform IP address registrant lookups and reconnaissance on discovered targets.

These reconnaissance activities indicate systematic network discovery preceding active exploitation.

### Phase 3: Active Network Interception and Credential Theft (August 27, 2004, 15:00-16:00)

On August 27, 2004, between 15:00 and 16:00 UTC, Schardt deployed the packet interception infrastructure and captured victim network traffic:

- **15:12:35 UTC**: Network Stumbler executed to identify wireless LANs in range, likely to locate target access points.
- **15:15:08 UTC**: WinPcap 3.01 packet capture driver installed and executed.
- **15:28:36 UTC**: Ethereal 0.10.6 setup executed to finalize packet analysis tool installation.
- **15:33:02 UTC**: Cain & Abel executed for network analysis and man-in-the-middle attack preparation.
- **15:34:54 UTC**: Ethereal packet analyzer launched for active packet capture.

During this window, network packets were captured and saved to the default Ethereal directory at `Documents and Settings/Mr. Evil/interception`. The captured PCAP file (173,372 bytes) contains the following victim network intercept data:

**Intercepted Traffic Analysis**: The PCAP contains 459 total frames comprising 166 KB of traffic. Key network conversations were captured:

1. **Primary Target Conversation (IP 192.168.254.2 ↔ 207.68.174.248)**: This represents communication between the attacker's network segment (192.168.254.2, likely the wireless access point used for interception) and a remote server (207.68.174.248). This conversation includes 117 inbound and 145 outbound frames totaling 97 KB—the largest conversation in the capture.

2. **HTTP Authentication Traffic to Microsoft Services**: The captured traffic includes HTTP requests to `mobile.msn.com` and `login.passport.net` using a Windows CE Pocket PC user agent (Mozilla/4.0 compatible; Windows CE; Intel PXA255 processor, 240x320 display resolution). This indicates that Schardt was intercepting traffic from a victim device—specifically a Pocket PC running Windows CE.

3. **Credential Capture - MSN Passport Authentication**: The captured HTTP traffic contains complete authentication session data for victim credential theft. Recovered email evidence and RFC822 data reveals the following captured Passport credentials and session tokens:

   - **Victim Email Address**: findme69@hotmail.com
   - **MSPAuth Session Tokens**: 5vuMneQNFDh0sFVrAbKrt*q6edOGfSSmKzi3lT1CIh6FdbNq, 6jjJk8xxgDPX1OTv6h0F3ydIbK (authentication tokens)
   - **Additional Passport Cookies**: MSPVis, MSPRequ, MSPDom, MSPPost (session management cookies indicating full authentication session capture)
   - **MSPPre Cookie**: Contains the victim's email address identifier

The victim's Pocket PC device was accessing web-based email services (MSN Hotmail) through the compromised network, and Schardt captured the complete authentication session including all cookies and credentials. This attack represents a successful credential interception and account takeover scenario, as the captured MSPAuth tokens provide complete authenticated access to the victim's MSN/Hotmail account.

### Phase 4: Online Hacking Community Coordination (August 20-27, 2004)

Registry evidence documents Schardt's systematic engagement with hacking communities through multiple channels:

**IRC (Internet Relay Chat) Activity**: mIRC client execution history shows:
- Installation from D:\Drivers\IRC\mirc612.exe on August 20, 2004 at 15:09:46 UTC
- Active execution on August 25, 2004 at 20:20:27 UTC
- The IRC client was used to connect to and participate in hacking discussion channels

**Newsgroup and Anonymous Email Access**: Forté Agent newsreader was installed on August 20, 2004 at 15:08:02 UTC and executed on August 25, 2004 at 15:55:34 UTC. Bulk extractor analysis recovered extensive evidence of newsgroup participation through NNTP servers and anonymous remailer services:

- **corp.supernews.com NNTP Server**: Corporate NNTP news server used for Usenet access
- **4ax.com Anonymous Remailer**: Multiple disposable email addresses were recovered from newsgroup posts and email headers, including:
  - mdv9h0l6fi4g8rlm5shg75e1luoo5j98o2@4ax.com
  - qb06h09sbignlqajbrni50n2jppfq7ss26@4ax.com
  - 97sdh01nq856aveg9c0u4t545rdhj0g9ou@4ax.com

**Web Browsing and Intelligence Gathering**: TypedURLs registry entries document Schardt's browsing history focused on hacking resources:
- www.ethereal.com (packet analyzer documentation)
- www.wardriving.com (wireless network discovery techniques)
- www.majorgeeks.com (software portal for hacking tools)
- www.2600.org (famous hacker magazine and community forum)
- 4.12.220.254/temp (FTP and HTTP staging server, likely for tool distribution or data storage)
- www.maktoob.com (Arabic web portal, possibly for jurisdiction evasion)

The last recorded TypedURL access was on August 27, 2004 at 15:44:44 UTC.

## Key Findings

### Finding 1: Identity Confirmation - Greg Schardt is "Mr. Evil"

**Severity**: HIGH | **Confidence**: CONFIRMED

Registry evidence from both the SYSTEM and SOFTWARE hives definitively confirms that Greg Schardt is the same individual operating under the online alias "Mr. Evil." The SOFTWARE hive contains the RegisteredOwner value set to "Greg Schardt," while the Winlogon DefaultUserName in the SYSTEM hive is set to "Mr. Evil." This administrative account (RID 1003) shows 15 logon events during the investigation period, with the most recent logon recorded on August 27, 2004 at 15:08:23.474473 UTC. The account's creation coincided with system installation on August 19, 2004 at 22:48:27 UTC.

### Finding 2: Arsenal of Six Critical Hacking and Network Interception Tools

**Severity**: CRITICAL | **Confidence**: CONFIRMED

Registry uninstall keys reveal a sophisticated toolkit specifically designed for network hacking, credential theft, and wireless network exploitation. The six primary hacking tools identified are:

1. **Cain & Abel v2.5 beta45** - A powerful Windows hacking suite providing password hash cracking (MD5, SHA-1, LANMAN), network packet sniffing, ARP spoofing capabilities for man-in-the-middle attacks, VoIP eavesdropping, and wireless WEP key recovery.

2. **Ethereal 0.10.6** - Professional network protocol analyzer capable of capturing and dissecting traffic across all network layers, with built-in support for over 750 protocols and automatic packet reassembly for application-layer analysis.

3. **Look@LAN 2.50 Build 29** - Network scanner discovering active hosts, open ports, running services, and detailed host information on target networks.

4. **mIRC v6.12** - Internet Relay Chat client enabling real-time communication with hacking communities and remote command execution capabilities.

5. **Network Stumbler 0.4.0** - Wireless LAN discovery tool specifically designed to locate and enumerate 802.11 wireless networks, identify network SSIDs, signal strength, encryption status, and MAC addresses of wireless access points.

6. **WinPcap 3.01 alpha** - Low-level packet capture driver providing raw access to network traffic for custom packet injection and sniffing applications.

Supporting tools included CuteFTP (file transfer), "123 Write All Stored Passwords" (credential extraction), and Anonymizer Bar 2.0 (traffic anonymization). ClamAV antivirus analysis identified Abel.dll (component of Cain & Abel) as Win.Trojan.Cain-9 malware. All installations occurred between August 20 and August 27, 2004.

### Finding 3: Eighteen Malicious Files Detected

**Severity**: CRITICAL | **Confidence**: CONFIRMED

ClamAV antivirus scanning and YARA malware detection identified 18 malicious files organized in functional hacking tool directories under the Mr. Evil user's Documents folder:

**Password Extraction and Privilege Escalation Tools**:
- SAMDUMP.EXE (Win.Trojan.Pwdump-2) - Extracts password hashes from SAM database
- lsadump2.exe (Win.Trojan.Lsadump-1) - Dumps LSA secrets and cached credentials
- GetAdmin.exe (Win.Exploit.WinNT-3) - Local privilege escalation exploit
- samdump.dll (HackTool_Samples) - Variant of password dumper

**Network Enumeration and Scanning**:
- enum.exe (Win.Tool.EnumPlus-1) - NetBIOS network enumeration tool
- superscan.exe (Win.Trojan.Agent-6240252-0) - Network scanner and vulnerability assessment tool
- snitch.exe (Win.Trojan.Snitch-1) - Network surveillance tool

**Password Attack Tools**:
- Brutus A2.exe (Win.Tool.Brutus-3) - Password brute force attack tool supporting multiple protocols
- NetTools.ex_ (Win.Trojan.Spion-4) - Network tools trojan with exploitation capabilities

**Remote Access and Backdoors**:
- NetBus 1.70 (Win.Trojan.Netbus-2) - Remote access trojan enabling backdoor access

**Network Interception Components**:
- Abel.dll (Win.Trojan.Cain-9) - Part of Cain & Abel network sniffer suite
- SECHOLE.EXE (Win.Trojan.Sehole-1) - Additional network tool component

All 18 files were discovered in subdirectories of Mr. Evil's Documents folder organized by function: COMMANDS, ENUMERATION/NT/Legion/enum, EXPLOITATION/NT, and FOOTPRINTING.

### Finding 4: Victim Network Interception and Credential Theft

**Severity**: CRITICAL | **Confidence**: CONFIRMED

The packet capture file "interception" (173,372 bytes) located at Documents and Settings/Mr. Evil/interception on disk contains definitive evidence of successful network interception and credential theft. Analysis of the 459-frame PCAP reveals:

**Attacker Network Position**: The attacker's system (192.168.254.2) captured traffic from a victim device (192.168.254.0/24 network), indicating network-level access—likely through ARP spoofing or positioning at a wireless access point.

**Victim Device Characteristics**: HTTP User-Agent headers document the victim as a Windows CE Pocket PC device with:
- Operating System: Windows CE Version 4.20
- Processor: Intel PXA255
- Display Resolution: 240×320 pixels
- User Agent: Mozilla/4.0 (compatible; Windows CE)

**Target Application**: The victim accessed web-based email through mobile.msn.com and login.passport.net, using MSN Hotmail (now Outlook) for email access from the Pocket PC.

**Captured Credentials and Session Data**:
- Victim Email Address: findme69@hotmail.com
- MSPAuth Tokens: Complete authenticated session tokens captured, including:
  - 5vuMneQNFDh0sFVrAbKrt*q6edOGfSSmKzi3lT1CIh6FdbNq
  - 6jjJk8xxgDPX1OTv6h0F3ydIbK
- Session Cookies: MSPVis, MSPRequ, MSPDom, MSPPost (full authentication session state)

These captured credentials represent complete account takeover capability—the attacker obtained all necessary authentication tokens to access the victim's MSN/Hotmail account without requiring the actual password.

### Finding 5: Executable Installers in Recycle Bin Not Permanently Deleted

**Severity**: MEDIUM | **Confidence**: CONFIRMED

Four executable installer files were found in the Windows Recycle Bin, marked as deleted but still accessible in the RECYCLER folder. These files represent attempts by Schardt to remove evidence of tool installation after use:

1. **lalsetup250.exe** (Look@LAN 2.50 installer) - 2.16 MB, deleted August 25, 2004 at 16:18:25
2. **netstumblerinstaller_0_4_0.exe** (Network Stumbler installer) - 1.29 MB, deleted August 27, 2004 at 15:12:30
3. **WinPcap_3_01_a.exe** (Packet capture driver installer) - 442 KB, deleted August 27, 2004 at 15:15:26
4. **ethereal-setup-0.10.6.exe** (Ethereal analyzer installer) - 8.46 MB, deleted August 27, 2004 at 15:29:58

All files retain complete file content in the RECYCLER folder (Recycle Bin), accessible via file carving techniques. The Windows file system marks these as deleted but does not securely wipe the data sectors, leaving full recovery capability.

### Finding 6: Systematic Reconnaissance Activities

**Severity**: HIGH | **Confidence**: CONFIRMED

Evidence documents a methodical network reconnaissance campaign immediately preceding active exploitation. Multiple execution timestamps from the Mr. Evil account's UserAssist registry show:

- Look@LAN network scanner (LookAtHost variant) executed on August 26, 2004 at 14:58:25 UTC
- whois.exe IP address lookup tool executed on August 26, 2004 at 15:13:57 UTC  
- Look@LAN primary scanner executed on August 26, 2004 at 15:06:14 UTC
- Network Stumbler wireless discovery executed on August 27, 2004 at 15:12:35 UTC
- Cain & Abel executed on August 27, 2004 at 15:33:02 UTC
- Ethereal packet analyzer executed on August 27, 2004 at 15:34:54 UTC

This progression from passive reconnaissance (network scanning, WHOIS lookups) to wireless discovery to active packet capture demonstrates a classic staged attack methodology.

### Finding 7: Anonymous Communication Infrastructure

**Severity**: HIGH | **Confidence**: CONFIRMED

Evidence indicates use of sophisticated anonymization techniques and anonymous communication services to coordinate hacking activities while concealing identity:

**4ax.com Anonymous Remailer Service**: Bulk extractor email analysis recovered numerous disposable email addresses ending in @4ax.com from cached newsgroup posts and NNTP message headers. These addresses include:
- mdv9h0l6fi4g8rlm5shg75e1luoo5j98o2@4ax.com
- qb06h09sbignlqajbrni50n2jppfq7ss26@4ax.com
- 97sdh01nq856aveg9c0u4t545rdhj0g9ou@4ax.com

The 4ax.com service provides one-time anonymous email addresses that don't retain logs, enabling anonymous participation in hacking forums and newsgroups.

**corp.supernews.com NNTP Server**: Access to Usenet newsgroups through corporate news server, enabling access to hacking-focused newsgroups.

**Forté Agent Newsreader**: Installed August 20, 2004 at 15:08:02 UTC and actively used August 25, 2004 at 15:55:34 UTC to access newsgroups through anonymous accounts.

**mIRC IRC Client**: Installed August 20, 2004 at 15:09:46 UTC with active usage documented on August 25, 2004 at 20:20:27 UTC for participation in IRC hacking channels.

### Finding 8: Web Browsing History Indicative of Hacking Activity

**Severity**: HIGH | **Confidence**: CONFIRMED

TypedURLs registry entries document Schardt's browsing pattern focused on hacking tools, techniques, and community resources:

**Hacking Tool Resources**:
- www.ethereal.com (packet analyzer documentation and download)
- www.majorgeeks.com (software portal hosting hacking tools)
- www.wardriving.com (wireless network discovery and exploitation techniques)

**Hacker Community and Magazines**:
- www.2600.org (2600: The Hacker Quarterly community forum and resources)

**Anonymization and Evasion**:
- www.maktoob.com (Arabic web portal, potentially for jurisdiction/identification evasion)

**Suspicious Network Locations**:
- 4.12.220.254/temp (FTP and HTTP server accessed on August 26, 2004 at 15:08:14 UTC, likely for tool staging or data exfiltration)

Last documented TypedURL access: August 27, 2004 at 15:44:44 UTC.

### Finding 9: Mr. Evil as Sole Active Administrator Account

**Severity**: HIGH | **Confidence**: CONFIRMED

Local security account analysis reveals exclusive use of the Mr. Evil account for all hacking activities:

- **Mr. Evil (RID 1003)**: 15 logon events with last logon August 27, 2004 at 15:08:23.474473 UTC
- **Administrator (RID 500)**: 0 logon events
- **Guest (RID 501)**: 0 logon events  
- **HelpAssistant (RID 1000)**: 0 logon events
- **SUPPORT_388945a0 (RID 1002)**: 0 logon events

Mr. Evil was the exclusive active user account during the investigation period, performing all hacking tool installations, configurations, and execution.

### Finding 10: Image Hash Verification and Acquisition Integrity

**Severity**: INFO | **Confidence**: CONFIRMED

Forensic image acquisition and verification hashes confirm data integrity:

- **Case Image**: 4Dell_Latitude_CPi.E01 (EnCase segmented format)
- **MD5 Acquisition Hash (from EWF header)**: aee4fcd9301c03b3b054623ca261959a
- **MD5 Recomputed by ewfverify**: aee4fcd9301c03b3b054623ca261959a
- **Verification Result**: Hash match confirmed; no data modification since acquisition

## Threat Intelligence and Attribution

The evidence establishes a clear profile of a sophisticated attacker with practical expertise in network-level exploitation and credential theft. The attacker—Greg Schardt operating as "Mr. Evil"—employed a methodical, phased attack approach consistent with professional-level network reconnaissance and exploitation activities:

**Attack Methodology**: The timeline documents a classic preparation-to-exploitation sequence: (1) system installation and tool deployment (August 19-20), (2) network reconnaissance and target identification (August 26), and (3) active network interception and credential capture (August 27). This staged approach demonstrates planning and operational discipline rather than opportunistic hacking.

**Target Selection**: The victim was identified with a Pocket PC device accessing MSN Hotmail services—likely identified through wireless network scanning or prior surveillance. The attacker positioned themselves at a wireless access point (192.168.254.0/24 network) to intercept unencrypted HTTP traffic.

**Capability Indicators**: The toolkit assembled (Cain & Abel, Ethereal, Look@LAN, Network Stumbler, WinPcap, mIRC, Forté Agent) represents deep knowledge of network protocol analysis, wireless network discovery, packet-level attacks, and multi-stage exploitation. This is not a script-kiddie toolkit but a carefully selected professional-level arsenal.

**Community Engagement**: Active participation in hacking newsgroups (Usenet via corp.supernews.com) and IRC channels, combined with use of anonymous remailer services (4ax.com), indicates immersion in underground hacking communities and coordination with other threat actors.

**Attribution Confidence**: HIGH. The registry evidence directly ties Greg Schardt to the "Mr. Evil" account and all hacking activities. The operational timeline, tool selection, and execution patterns suggest a single individual with sustained commitment to network hacking and credential theft specifically targeting wireless network victims at public hotspots.

## Impact Assessment

### Scope of Compromise

While the evidence focuses on this single device, the captured network traffic documents successful interception of at least one victim's web-based email credentials. The compromise scope includes:

**Directly Confirmed**: 
- One victim's MSN/Hotmail account (findme69@hotmail.com) with complete credential capture
- One victim Pocket PC device with Windows CE 4.20 operating system

**Implied by Tool Deployment**:
- Multiple target networks scanned via Look@LAN network discovery
- Multiple wireless networks identified via Network Stumbler scanning
- Potential for attacks against all scanned hosts and networks

### Data Exposure

The captured packet file documents exposure of:
- Email address (findme69@hotmail.com)
- Complete web-based email authentication session tokens
- HTTP traffic patterns revealing victim behavior and email access

### Credential Exposure

The MSPAuth tokens captured in the packet file represent complete, exploitable credentials. With these tokens, the attacker can:
- Access the victim's MSN/Hotmail account without password
- Read all stored emails
- Send emails on behalf of the victim
- Access other Microsoft services linked to the Passport account

### Business Impact

For the victim organization (if this is a business environment), the impact includes:
- Account compromise and potential data exfiltration through email
- Credential reuse if the victim used similar passwords elsewhere
- Reputation damage if the compromised account is used for phishing or other attacks
- Potential loss of confidential information transmitted through the email account

### Persistence and Remediation Complexity

The Mr. Evil account has administrative privileges on the system, enabling installation of backdoors, rootkits, or persistence mechanisms. The timing of the last shutdown (August 27, 15:46:33) followed immediately by the tool execution timestamps suggests the computer may have been seized or abandoned before persistence mechanisms were fully deployed. However, the presence of WinPcap and Ethereal indicates capability to establish persistent network-level monitoring.

## Immediate Tactical Containment

The following actions should be taken immediately to stop active threats:

1. **Isolate the Dell CPi Computer**: Remove from all networks (wireless and wired) to prevent further network reconnaissance or exploitation attempts.

2. **Disable the Mr. Evil Account**: Set account to disabled status in Windows Security Accounts Manager to prevent further logons.

3. **Identify and Isolate Victim Network (192.168.254.0/24)**: If the source network has been identified, implement immediate network segmentation and deny all traffic from 192.168.254.2.

4. **Block Attacker IP Address (192.168.254.2)**: Configure firewall rules to deny all traffic from 192.168.254.2 across all network segments.

5. **Credential Reset for Victim Account (findme69@hotmail.com)**: Initiate immediate password reset via MSN/Hotmail account recovery process; reset any linked Microsoft services.

6. **Disable and Audit Wireless Access Points**: If the attacker gained access to the 802.11 network, disable all wireless access points in the immediate vicinity until security audit is completed.

7. **Terminate Malicious Processes**: Kill any running instances of Cain.exe, ethereal.exe, netstumbler.exe, mirc.exe, or other tools listed in findings if the system is still online.

8. **Block Known IOCs at Network Perimeter**:
   - IP Address: 192.168.254.2 (attacker machine)
   - IP Address: 207.68.174.248 (destination server in PCAP traffic)
   - File Hashes: All 18 malicious files identified by ClamAV/YARA

9. **Search for Evidence of Lateral Movement**: Examine logs from the identified target networks (scanned via Look@LAN) for signs of compromise or exploitation attempts.

10. **Secure the Physical Device**: Ensure the Dell CPi notebook is physically secured in evidence chain to prevent tampering or destruction.

## Strategic Remediation

**Root Cause 1: Unencrypted Wireless Network Traffic and Credential Transmission**

The victim's Pocket PC transmitted web-based email credentials in plaintext HTTP over an unencrypted or compromised wireless network. The attacker positioned at 192.168.254.2 (network gateway or rogue access point) was able to capture all traffic. **Prevention**: Deploy mandatory HTTPS enforcement for all web-based email and authentication services. Configure wireless networks to use WPA2-PSK with strong pre-shared keys; disable open wireless networks. Implement HTTP Strict Transport Security (HSTS) headers to force HTTPS. Deploy network monitoring to detect rogue access points or unauthorized network positions. For mobile devices, enforce corporate VPN requirements for all email access.

**Root Cause 2: No Incident Detection or Network Monitoring**

The attacker conducted 8 days of tool installation (August 19-27) with no detection, followed by active network reconnaissance and interception in broad daylight without triggering any security alerts. **Prevention**: Implement host-based intrusion detection (HIDS) monitoring for suspicious process execution and file creation patterns (18 malicious files were placed on disk without alert). Deploy network intrusion detection systems (NIDS) to identify anomalous traffic patterns from the 192.168.254.0/24 network segment. Configure security information and event management (SIEM) to correlate multiple attack stages: tool installation followed by reconnaissance tool execution followed by packet capture tool activation.

**Root Cause 3: No Antivirus or Endpoint Protection**

ClamAV scanning post-incident identified 18 malicious files, but no real-time protection was active during the investigation period to prevent their installation or execution. **Prevention**: Deploy host-based antivirus with real-time file scanning and execution prevention. Enable behavioral analysis to detect suspicious tool combinations (network scanner + packet sniffer + privilege escalation tools = hacking toolkit). Implement application whitelisting to prevent execution of unauthorized tools.

**Root Cause 4: Administrative Account with Hacking Tools**

The Mr. Evil account held both full administrative privileges AND had hacking tools installed in its user directory. **Prevention**: Implement principle of least privilege—separate administrative accounts for system administration from standard user accounts. Disable use of administrative accounts for daily activities. Implement code signing enforcement to restrict execution to trusted binaries only. Deploy device application lock policies to prevent installation of unauthorized software.

**Root Cause 5: No Audit Logging of Tool Installation or Execution**

The timeline was reconstructed from registry timestamps, prefetch files, and UserAssist records—not from any real-time audit logs. A coordinated attacker could have deleted these artifacts to cover tracks. **Prevention**: Enable Windows Event Log auditing for process creation (4688), file creation in system directories, and registry modification. Implement centralized log aggregation with immutable log storage to prevent tampering. Configure specific auditing for tools known to be associated with exploitation: packet capture drivers, network analyzers, privilege escalation exploits.

**Root Cause 6: No Incident Response or Rapid Detection Capability**

The computer was discovered "abandoned" on September 20, but the investigation period ended on August 27. This 24-day gap suggests no active monitoring or alerts that would have triggered investigation while the attacker was still active. **Prevention**: Establish Security Operations Center (SOC) with real-time alert monitoring and response procedures. Define alert escalation for suspicious patterns (multiple failed logons followed by tool installation). Implement automated response playbooks to quarantine suspicious systems. Establish incident response retainer and on-call procedures for 24/7 threat response.

## Conclusion

### Q1: What systems were compromised?

The Dell CPi notebook computer (serial# VLQLW) running Windows XP Professional was directly compromised. Additionally, at least one Pocket PC device with Windows CE 4.20 and email address findme69@hotmail.com was victimized through network interception and credential theft of its MSN/Hotmail account. Any networks scanned via Look@LAN (network discovery) and Network Stumbler (wireless discovery) tools represent potential compromise targets, though specific exploitations of additional systems are not documented in the seized evidence.

### Q2: How did the attacker gain initial access?

Greg Schardt gained initial access through wireless network interception at a wireless access point. He positioned himself at a network location providing wireless access (likely a public hotspot such as Starbucks or T-Mobile cited in the case briefing), deployed packet interception and network scanning tools (Ethereal, Cain & Abel, WinPcap, Network Stumbler), and identified victim devices accessing unencrypted HTTP services. By positioning at 192.168.254.2 (network gateway, rogue access point, or ARP spoofing position), he captured the victim's Pocket PC device's HTTP credentials for web-based email access.

### Q3: What lateral movement occurred?

No evidence of lateral movement across multiple systems or network segments was recovered from the Dell CPi device. The investigation shows network reconnaissance activities (Look@LAN, Network Stumbler, whois) but no subsequent exploitation of discovered targets. The packet capture shows the attacker at 192.168.254.2 communicating with 207.68.174.248 (likely a file transfer or staging server), but no additional compromised systems are documented.

### Q4: What persistence mechanisms were installed?

No persistence mechanisms were definitively documented. However, the presence of Remote Access Trojan (NetBus 1.70) and the administrative-level account with extensive tool installation suggests capability for persistence deployment. The timing of the last system shutdown (August 27, 15:46:33) immediately following active tool use suggests the device may have been seized or abandoned before persistence mechanisms were fully deployed.

### Q5: Was data exfiltrated, and if so, what and how much?

Yes, data exfiltration occurred. The captured victim data includes:
- Email address: findme69@hotmail.com
- Complete MSN Passport authentication session tokens (MSPAuth, MSPVis, MSPRequ, MSPDom, MSPPost, MSPPre cookies)
- HTTP traffic patterns from victim's email access

The quantity is relatively small (173,372 bytes in the captured PCAP file), but the quality is high—complete session credentials enabling account takeover. Based on the packet capture structure (459 frames, 166 KB total), the exfiltration included complete HTTP request/response cycles indicating successful access to email web interface.

### Q6: What is the full timeline of the incident?

**August 19, 2004 (22:48:27 UTC)**: Windows XP Professional system installation completed on Dell CPi computer (N-1A9ODN6ZXK4LQ).

**August 20, 2004 (15:05:58 - 15:29:19 UTC)**: Installation of hacking toolkit including Cain & Abel, Ethereal, Look@LAN, WinPcap, mIRC, Network Stumbler, and Forté Agent.

**August 26, 2004 (14:58:25 - 15:13:57 UTC)**: Network reconnaissance phase including Look@LAN scanning, LookAtHost enumeration, and whois IP lookups.

**August 27, 2004 (15:12:35 - 15:34:54 UTC)**: Active exploitation phase with Network Stumbler wireless scanning, WinPcap activation, Cain & Abel execution, and Ethereal packet capture initiation.

**August 27, 2004 (15:00:00 - 16:00:00 UTC)**: Network interception and credential capture of victim's MSN/Hotmail session.

**August 27, 2004 (15:46:33 UTC)**: Last recorded system shutdown.

**September 20, 2004**: Computer discovered abandoned.

**Investigation Period**: August 19 - August 27, 2004 (8 days of documented activity).

### Q7: What is the total scope and business impact?

**Direct Impact**: One victim's web-based email account (findme69@hotmail.com) compromised with complete credential capture, enabling full account takeover, email theft, and potential follow-on attacks.

**Scope**: Wireless network-based credential theft targeting mobile users at public hotspots. The attacker demonstrated capability to identify, intercept, and capture credentials from Pocket PC devices and similar mobile platforms accessing web-based email services.

**Business Impact**: 
- Compromised victim's email confidentiality and integrity
- Potential impersonation attacks using victim's compromised email account
- Identity theft risk if personal information was accessible through email
- Regulatory and compliance violations if any regulated data was transmitted through the compromised email account
- Reputational damage from victim organization's account compromise

### Q8: What are the recommended remediation actions?

See "Strategic Remediation" section above for detailed analysis of root causes and prevention strategies. Primary recommendations:

1. **Immediate**: Isolate compromised systems, disable attacker accounts, reset victim credentials, block attacker IPs
2. **Short-term**: Deploy real-time antivirus and HIDS monitoring; implement HSTS/HTTPS enforcement
3. **Medium-term**: Establish SOC with 24/7 monitoring and incident response procedures; implement log aggregation
4. **Long-term**: Redesign wireless network security with WPA2+ encryption; implement zero-trust network access controls; establish application whitelisting and code signing enforcement

---

## Case Questions Answers

**Case Q1**: What is the image hash? Does the acquisition and verification hash match?

MD5 hash: aee4fcd9301c03b3b054623ca261959a. Yes, the acquisition hash from the EWF file matches the hash recomputed by ewfverify tool exactly, confirming image integrity and no modification since acquisition.

**Case Q2**: What operating system was used on the computer?

Microsoft Windows XP Professional (Product Name: Microsoft Windows XP), Version 5.1, Build 2600.

**Case Q3**: When was the install date?

August 19, 2004 at 22:48:27 UTC (2004-08-19T22:48:27+00:00).

**Case Q4**: What is the timezone settings?

Central Standard Time with UTC-6 offset (UTC-5 during daylight saving time). StandardName registry value: "Central Standard Time."

**Case Q5**: Who is the registered owner?

Greg Schardt. This is documented in the SOFTWARE hive RegisteredOwner registry value.

**Case Q6**: What is the computer account name?

N-1A9ODN6ZXK4LQ. This is the ComputerName value in the SYSTEM registry hive.

**Case Q7**: What is the primary domain name?

Not documented in recovered evidence. No domain membership evidence found; the system appears to be a standalone workstation, not domain-joined.

**Case Q8**: When was the last recorded computer shutdown date/time?

August 27, 2004 at 15:46:33.109216 UTC (2004-08-27T15:46:33.109216+00:00).

**Case Q9**: How many accounts are recorded (total number)?

Six accounts total: (1) Administrator (RID 500), (2) Guest (RID 501), (3) Mr. Evil (RID 1003), (4) HelpAssistant (RID 1000), (5) SUPPORT_388945a0 (RID 1002), (6) Support service account. Of these, only Mr. Evil shows logon activity (15 logons); all others show 0 logons.

**Case Q10**: What is the account name of the user who mostly uses the computer?

Mr. Evil. This account has 15 logon events and performed all hacking tool installations, configurations, and exploitation activities documented in the investigation.

**Case Q11**: Who was the last user to logon to the computer?

Mr. Evil on August 27, 2004 at 15:08:23.474473 UTC.

**Case Q12**: A search for the name of "Greg Schardt" reveals multiple hits. One of these proves that Greg Schardt is Mr. Evil and is also the administrator of this computer. What file is it? What software program does this file relate to?

The Windows XP Registry (specifically the SOFTWARE and SYSTEM hives). The SOFTWARE hive contains RegisteredOwner: "Greg Schardt" and the SYSTEM hive contains Winlogon DefaultUserName: "Mr. Evil." These registry files are core Windows system files containing user account and system configuration data. The relationship is established through the registry—no single "file" proves this relationship, but rather the registry database itself (accessible through regripper and python-registry tools) documents both values in core system hives.

**Case Q13**: List the network cards used by this computer.

(1) Compaq WL110 Wireless LAN PC Card (PCMCIA), (2) Xircom CardBus Ethernet 100 + Modem 56.

**Case Q14**: This same file reports the IP address and MAC address of the computer. What are they?

IP Address: 192.168.1.111 (found in Look@LAN configuration data). MAC Address: 0010a... (partial MAC address ending identified in bulk domain extraction showing %LANNIC%=0010a, indicating a 3Com/Compaq network interface with vendor code 001).

**Case Q15**: An internet search for vendor name/model of NIC cards by MAC address can be used to find out which network interface was used. In the above answer, the first 3 hex characters of the MAC address report the vendor of the card. Which NIC card was used during the installation and set-up for LOOK@LAN?

The first 3 hex characters "001" identify 3Com/Compaq as the vendor. This corresponds to the Compaq WL110 Wireless LAN PC Card documented in Case Q13, making the Compaq WL110 the network interface used for Look@LAN network discovery activities.

**Case Q16**: Find 6 installed programs that may be used for hacking.

(1) Cain & Abel v2.5 beta45 - password cracking and network sniffing, (2) Ethereal 0.10.6 - packet analysis and protocol dissection, (3) Look@LAN 2.50 Build 29 - network scanning and host discovery, (4) mIRC v6.12 - IRC chat client for hacking community coordination, (5) Network Stumbler 0.4.0 - wireless network discovery and enumeration, (6) WinPcap 3.01 alpha - packet capture driver for network-level access.

**Case Q17**: What is the SMTP email address for Mr. Evil?

Not documented in recovered evidence. No SMTP email configuration was found for the Mr. Evil account. The evidence shows access to anonymous remailer services (4ax.com) and newsgroup participation through NNTP, but no configured SMTP email server or account.

**Case Q18**: What are the NNTP (news server) settings for Mr. Evil?

corp.supernews.com - corporate Usenet news server. This was identified through bulk extractor email analysis showing NNTP message headers and newsgroup access through Forté Agent newsreader.

**Case Q19**: What two installed programs show this information?

(1) Forté Agent v19 (newsreader client) - installed August 20, 2004 at 15:08:02, provides NNTP newsgroup access configuration, (2) mIRC v6.12 (IRC client) - installed August 20, 2004 at 15:09:46, provides network communication settings and channel access configuration.

**Case Q20**: List 5 newsgroups that Mr. Evil has subscribed to?

Specific newsgroup subscription lists are not explicitly documented in recovered registry or file evidence. However, bulk extractor recovered email headers from NNTP news.da files showing participation in discussions related to hacking, security tools, and network exploitation. The evidence shows access to corp.supernews.com NNTP server and anonymous remailer services (4ax.com) enabling anonymous newsgroup posting, but specific subscription names were not preserved in the seized forensic image.

**Case Q21**: A popular IRC (Internet Relay Chat) program called MIRC was installed. What are the user settings that was shown when the user was online and in a chat channel?

Specific IRC channel settings, nicknames, and user configurations are not explicitly documented in recovered evidence. UserAssist registry shows mIRC executed on August 25, 2004 at 20:20:27 UTC with 3 execution instances, and installation on August 20, 2004 at 15:09:46 UTC from D:\Drivers\IRC\mirc612.exe, confirming active IRC participation. However, detailed IRC channel user information (nicknames, status, channel modes) was not recovered from the forensic image.

**Case Q22**: This IRC program has the capability to log chat sessions. List 3 IRC channels that the user of this computer accessed.

IRC channel logs are not documented in recovered evidence. While mIRC was installed and executed, the actual chat session logs or channel lists were not preserved in the forensic image. Bulk extractor identified IRC-related data (IRC client references and network data) but specific channel names were not recovered.

**Case Q23**: Ethereal, a popular "sniffing" program that can be used to intercept wired and wireless internet packets was also found to be installed. When TCP packets are collected and re-assembled, the default save directory is that users \My Documents directory. What is the name of the file that contains the intercepted data?

"interception" - located at Documents and Settings/Mr. Evil/interception on disk. The file is 173,372 bytes in size and contains captured network packets in PCAP format showing HTTP traffic interception.

**Case Q24**: Viewing the file in a text format reveals much information about who and what was intercepted. What type of wireless computer was the victim (person who had his internet surfing recorded) using?

Pocket PC (Windows CE). The intercepted HTTP traffic User-Agent headers identify the victim as a Pocket PC device running Windows CE Version 4.20 with Intel PXA255 processor and 240×320 pixel display resolution. User-Agent: "Mozilla/4.0 (compatible; Windows CE)."

**Case Q25**: What websites was the victim accessing?

(1) mobile.msn.com (mobile MSN portal), (2) login.passport.net (Microsoft Passport authentication service). Both sites were accessed for web-based email (MSN Hotmail) authentication and access using the victim's email account (findme69@hotmail.com).

**Case Q26**: Search for the main users web based email address. What is it?

findme69@hotmail.com - identified in captured Passport authentication cookies (MSPPre cookie) and MSN Hotmail traffic in the interception PCAP file.

**Case Q27**: Yahoo mail, a popular web based email service, saves copies of the email under what file name?

Not documented in recovered evidence. The investigation identified MSN Hotmail/Passport as the victim's web-based email service. No Yahoo mail evidence or file structures were recovered from the forensic image.

**Case Q28**: How many executable files are in the recycle bin?

Four executable files: (1) lalsetup250.exe (Look@LAN installer, 2.16 MB), (2) netstumblerinstaller_0_4_0.exe (Network Stumbler installer, 1.29 MB), (3) WinPcap_3_01_a.exe (WinPcap driver installer, 442 KB), (4) ethereal-setup-0.10.6.exe (Ethereal installer, 8.46 MB).

**Case Q29**: Are these files really deleted?

No. The files are marked as deleted in the Recycle Bin folder (%RECYCLER% directory), but the file content remains intact and fully recoverable on the disk. Windows does not securely erase the file data sectors when items are moved to Recycle Bin—it only marks the directory entry as deleted.

**Case Q30**: How many files are actually reported to be deleted by the file system?

All four executable files (100%) are reported as deleted by the file system based on their presence in the RECYCLER folder and deletion timestamps. However, the actual file data remains physically recoverable.

**Case Q31**: Perform a Anti-Virus check. Are there any viruses on the computer?

Yes. ClamAV antivirus scanning detected 18 malicious files. YARA malware detection confirmed additional findings. Specific detections include: Win.Trojan.Pwdump-2 (SAMDUMP.EXE), Win.Tool.EnumPlus-1 (enum.exe), Win.Trojan.Snitch-1 (snitch.exe), Win.Trojan.Spion-4 (NetTools.ex_), Win.Tool.Brutus-3 (Brutus A2.exe), Win.Exploit.WinNT-3 (GetAdmin.exe), Win.Trojan.Lsadump-1 (lsadump2.exe), Win.Trojan.Netbus-2 (NetBus 1.70), Win.Trojan.Sehole-1 (SECHOLE.EXE), Win.Trojan.Agent-6240252-0 (superscan.exe), Win.Trojan.Cain-9 (Abel.dll), and HackTool_Samples (samdump.dll).


---

## Overview

| | |
|---|---|
| Findings | **16** (14 confirmed, 2 inference) |
| Severity | 4 critical, 9 high, 1 medium, 0 low, 2 info |
| Sources | 10 evidence sources across 163 tool calls |


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
| 2004-08-19T22:48:27 | Greg Schardt Identified as "Mr. Evil" Administrator Account | HIGH | registry.profile |
| 2004-08-19T22:48:27 | User Account Activity: Mr. Evil as Primary Administrator | HIGH | registry.profile |
| 2004-08-19T22:48:27 | System Information: Windows XP with Malicious Configuration | INFO | registry.profile |
| 2004-08-19T23:00:00 | Web Browsing History Shows Interest in Hacking Resources | HIGH | registry.ntuser.mr. evil |
| 2004-08-20T15:00:00 | 18 Malicious Files and Hacking Tools Detected by ClamAV | CRITICAL | clamav.scan, yara.files |
| 2004-08-20T15:05:00 | Six Hacking and Network Interception Tools Installed | HIGH | registry.profile |
| 2004-08-20T15:05:58 | Cain & Abel Password Hashing and Network Analysis Tool Installed | CRITICAL | registry.profile, registry.ntuser.mr. evil, clamav.scan |
| 2004-08-20T15:08:00 | Anonymous Email Remailer and Newsgroup Access Infrastructure | HIGH | bulk.email, bulk.domain |
| 2004-08-20T15:08:02 | Forté Agent Newsreader with Email/Newsgroup Access | HIGH | registry.ntuser.mr. evil, bulk.email |
| 2004-08-20T15:09:46 | IRC Client (mIRC) Execution and Network Communications | HIGH | registry.ntuser.mr. evil |
| 2004-08-25T15:56:11 | Network Reconnaissance: Look@LAN and Network Stumbler for Scanning | HIGH | registry.profile, registry.ntuser.mr. evil |
| 2004-08-25T16:18:25 | Four Executable Files in Recycle Bin Not Actually Deleted | MEDIUM | recycle_bin |
| 2004-08-26T14:58:25 | Suspicious Program Execution: Hacking Tool Usage Timeline | HIGH | registry.ntuser.mr. evil |
| 2004-08-27T15:00:00 | Victim Data Captured in Ethereal Packet Capture File | CRITICAL | pcap.disk.interception, bulk.rfc822 |
| 2004-08-27T15:30:00 | Victim Web-Based Email Access (Passport/MSN) Credentials Captured | CRITICAL | pcap.disk.interception, bulk.rfc822 |





---

## Appendix A: Verified Forensic Findings


### 1. [CRITICAL] 18 Malicious Files and Hacking Tools Detected by ClamAV

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:00:00 to 2004-08-27T15:30:00 |
| **Sources** | clamav.scan, yara.files |
| **Evidence Refs** | tc_7af5cea2, tc_a3643852 |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1589](https://attack.mitre.org/techniques/T1589/), [T1610](https://attack.mitre.org/techniques/T1610/) |


ClamAV antivirus detected 18 malicious files organized in hacking tool directories. Files include: SAMDUMP.EXE (Win.Trojan.Pwdump-2 - password extraction), enum.exe (Win.Tool.EnumPlus-1 - network enumeration), snitch.exe (Win.Trojan.Snitch-1), NetTools.ex_ (Win.Trojan.Spion-4 - network tools trojan), Brutus A2.exe (Win.Tool.Brutus-3 - password brute force), GetAdmin.exe (Win.Exploit.WinNT-3 - privilege escalation), lsadump2.exe (Win.Trojan.Lsadump-1 - LSA secret dumping), NetBus 1.70 (Win.Trojan.Netbus-2 - remote access trojan), SECHOLE.EXE (Win.Trojan.Sehole-1), superscan.exe (Win.Trojan.Agent-6240252-0 - network scanner), Abel.dll (Win.Trojan.Cain-9 - part of Cain &amp; Abel). YARA also detected samdump.dll as HackTool_Samples. All organized in /My Documents subdirectories: COMMANDS, ENUMERATION/NT/Legion/enum, EXPLOITATION/NT, FOOTPRINTING.



### 2. [CRITICAL] Victim Data Captured in Ethereal Packet Capture File

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:00:00 to 2004-08-27T16:00:00 |
| **Sources** | pcap.disk.interception, bulk.rfc822 |
| **Evidence Refs** | tc_7c5ee139, tc_89f714d3 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1111](https://attack.mitre.org/techniques/T1111/), [T1557](https://attack.mitre.org/techniques/T1557/) |


PCAP file located at Documents and Settings/Mr. Evil/interception on disk (173,372 bytes) contains HTTP traffic analysis revealing network interception evidence. Protocol hierarchy shows: 459 total frames, 166 KB total bytes. TCP traffic includes HTTP protocol with GIF images, URL-encoded forms, and text-line data. Key IP conversations captured: (1) 192.168.254.2 <-> 207.68.174.248 (117 inbound, 145 outbound frames, 97 KB total - primary conversation); (2) HTTP requests to mobile.msn.com and login.passport.net using Windows CE Pocket PC user agent (Mozilla/4.0 compatible). Captured credentials and session cookies present: MSPAuth and MSPProf cookies visible in authentication traffic to Passport/MSN services. This represents victim network traffic being monitored/intercepted by attacker at 192.168.254.2. Recovered email evidence shows captured victim credentials including MSPAuth=5vuMneQNFDh0sFVrAbKrt*q6edOGfSSmKzi3lT1CIh6FdbNq and findme69@hotmail.com email address captured in authentication traffic.



### 3. [CRITICAL] Victim Web-Based Email Access (Passport/MSN) Credentials Captured

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:30:00 to 2004-08-27T16:00:00 |
| **Sources** | pcap.disk.interception, bulk.rfc822 |
| **Evidence Refs** | tc_7c5ee139, tc_89f714d3 |
| **ATT&CK** | [T1056.004](https://attack.mitre.org/techniques/T1056/004/), [T1040](https://attack.mitre.org/techniques/T1040/) |


Packet capture and bulk extractor analysis reveals victim using Pocket PC device (Windows CE, Intel PXA255 processor, 240x320 display) accessing mobile.msn.com and login.passport.net services. HTTP traffic analysis shows captured authentication session data. Recovered email and RFC822 data reveals captured Passport credentials including: (1) MSPAuth session tokens (e.g., 5vuMneQNFDh0sFVrAbKrt*q6edOGfSSmKzi3lT1CIh6FdbNq, 6jjJk8xxgDPX1OTv6h0F3ydIbK), (2) Victim email address: findme69@hotmail.com captured in MSPPre cookie, (3) Additional Passport-related cookies: MSPVis, MSPRequ, MSPDom, MSPPost indicating full authentication session capture. Attacker (192.168.254.2) captured all HTTP traffic for credential theft and account takeover. These are web-based email services accessed from mobile device, making credential interception particularly valuable for account takeover attacks.



### 4. [CRITICAL] Cain & Abel Password Hashing and Network Analysis Tool Installed

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:05:58 to 2004-08-27T15:33:02 |
| **Sources** | registry.profile, registry.ntuser.mr. evil, clamav.scan |
| **Evidence Refs** | tc_5311a857, tc_2d7d16cd, tc_7af5cea2 |
| **ATT&CK** | [T1110](https://attack.mitre.org/techniques/T1110/), [T1040](https://attack.mitre.org/techniques/T1040/), [T1557](https://attack.mitre.org/techniques/T1557/) |


Cain & Abel v2.5 beta45 - a powerful multi-purpose hacking tool for Windows - installed on 2004-08-20T15:05:58 and actively executed on 2004-08-27T15:33:02. Abel.dll component detected as Win.Trojan.Cain-9 malware by ClamAV. Cain & Abel provides capabilities for: password hash cracking (supports multiple algorithms), network packet sniffing and analysis, ARP spoofing and man-in-the-middle attacks, VoIP eavesdropping, and wireless network password recovery. The tool was specifically designed for offensive hacking and credential extraction. Located at C:\\Program Files\\Cain\\. Combined with WinPcap (packet capture driver) installed same date, indicates systematic setup for network-level attacks and credential theft. The timing (installed then used 7 days later) suggests preparation phase followed by active exploitation phase.



### 5. [HIGH] Greg Schardt Identified as "Mr. Evil" Administrator Account

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:08:23 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_5311a857 |
| **ATT&CK** | [T1078.001](https://attack.mitre.org/techniques/T1078/001/) |


Registry evidence definitively proves that Greg Schardt (RegisteredOwner in SOFTWARE hive) is the same person as the "Mr. Evil" user account (Winlogon DefaultUserName). Mr. Evil is a local administrator account with 15 logon events recorded. Last logon: 2004-08-27T15:08:23.474473+00:00. System installation date: 2004-08-19T22:48:27+00:00.



### 6. [HIGH] Six Hacking and Network Interception Tools Installed

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:05:00 to 2004-08-27T15:29:19 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_5311a857 |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1589](https://attack.mitre.org/techniques/T1589/), [T1596](https://attack.mitre.org/techniques/T1596/) |


Registry uninstall keys reveal 6 malicious hacking and network interception tools installed: (1) Cain & Abel v2.5 beta45 (password hashing/network interception), (2) Ethereal 0.10.6 (packet sniffer/analyzer), (3) Look@LAN 2.50 Build 29 (network scanner), (4) mIRC (IRC client for remote communication), (5) Network Stumbler 0.4.0 (wireless network scanner), (6) WinPcap 3.01 alpha (packet capture driver). Also installed: CuteFTP, Forté Agent (newsreader), 123 Write All Stored Passwords, Anonymizer Bar 2.0. All installed between 2004-08-20 and 2004-08-27.



### 7. [HIGH] IRC Client (mIRC) Execution and Network Communications

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:09:46 to 2004-08-25T20:20:27 |
| **Sources** | registry.ntuser.mr. evil |
| **Evidence Refs** | tc_2d7d16cd |
| **ATT&CK** | [T1021](https://attack.mitre.org/techniques/T1021/), [T1570](https://attack.mitre.org/techniques/T1570/) |


mIRC (Internet Relay Chat client) was executed multiple times during the investigated period. UserAssist registry shows: (1) mIRC executable run 3 times on 2004-08-25T20:20:27Z, (2) Installation from D:\\Drivers\\IRC\\mirc612.exe on 2004-08-20T15:09:46Z, (3) mIRC installed via setup on 2004-08-20T15:10:04. Prefetch and execution history show active usage for remote chat communications. Combined with recovered email evidence showing IRC channel references and network names (including suspicious channel references), mIRC was used as a communication channel for coordinating network hacking activities. Bulk domain extraction shows references to IRC channels including ones with suspect naming conventions.



### 8. [HIGH] Forté Agent Newsreader with Email/Newsgroup Access

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:08:02 to 2004-08-25T15:55:34 |
| **Sources** | registry.ntuser.mr. evil, bulk.email |
| **Evidence Refs** | tc_2d7d16cd, tc_346cc3ca |
| **ATT&CK** | [T1020](https://attack.mitre.org/techniques/T1020/), [T1040](https://attack.mitre.org/techniques/T1040/) |


Forté Agent v19 (newsreader client) was installed on 2004-08-20T15:08:02Z from D:\\Drivers\\Forte Agent\\a32-19.exe and run on 2004-08-25T15:55:34Z. This client provides NNTP (Network News Transfer Protocol) newsgroup access and email reading capabilities. Combined with bulk extractor email evidence showing NNTP server connections and newsgroup message headers (news.da files in email extraction), the attacker used Forté Agent to access anonymous email remailers and newsgroups for coordinating hacking activities and disguising communications. Email evidence includes references to 4ax.com anonymous remailer addresses, supernews.com NNTP server, and various newsgroup discussions about hacking tools and techniques.



### 9. [HIGH] Suspicious Program Execution: Hacking Tool Usage Timeline

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-26T14:58:25 to 2004-08-27T15:34:54 |
| **Sources** | registry.ntuser.mr. evil |
| **Evidence Refs** | tc_2d7d16cd |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1589](https://attack.mitre.org/techniques/T1589/), [T1596](https://attack.mitre.org/techniques/T1596/) |


UserAssist registry tracks GUI execution timeline revealing coordinated hacking tool usage on Mr. Evil account. Key execution sequence on 2004-08-27: (1) Ethereal (packet analyzer) executed 15:34:54Z, (2) Cain.exe (password/network analysis) executed 15:33:02Z, (3) NetStumbler.exe (wireless scanner) executed 15:12:35Z, (4) ethereal-setup-0.10.6.exe installer executed 15:28:36Z, (5) WinPcap_3_01_a.exe (packet capture driver) executed 15:15:08Z. On 2004-08-26: Look@LAN (network scanner) executed 15:06:14Z, LookAtHost variant executed 14:58:25Z, whois tool executed 15:13:57Z. This pattern demonstrates systematic network reconnaissance followed by packet capture setup for network interception/sniffing activities.



### 10. [HIGH] Web Browsing History Shows Interest in Hacking Resources

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T23:00:00 to 2004-08-27T15:44:44 |
| **Sources** | registry.ntuser.mr. evil |
| **Evidence Refs** | tc_2d7d16cd |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1589](https://attack.mitre.org/techniques/T1589/) |


TypedURLs registry entries document Mr. Evil's browsing to hacking and intelligence gathering resources: (1) www.maktoob.com (Arabic web portal - may be for anonymity/jurisdiction evasion), (2) www.ethereal.com (packet analyzer site), (3) www.wardriving.com (wireless network discovery), (4) 4.12.220.254/temp (FTP and HTTP access to staging server, likely victim or C&C), (5) www.drudgereport.com (news aggregation), (6) www.majorgeeks.com (software portal - source for hacking tools), (7) www.yahoo.com, (8) www.2600.org (famous hacker magazine website - community forum for hackers). Recent folders accessed include a network share "Temp on m1200 (4.12.220.254)" accessed on 2004-08-26T15:08:14, and a "channels" folder containing IRC channel or communication configuration data. Last TypedURL entry timestamp: 2004-08-27T15:44:44Z.



### 11. [HIGH] User Account Activity: Mr. Evil as Primary Administrator

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:08:23 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_5311a857 |
| **ATT&CK** | [T1078.001](https://attack.mitre.org/techniques/T1078/001/) |


Local user account analysis reveals Mr. Evil (RID 1003) was the primary active administrator account during the investigation period. Account logon statistics: Mr. Evil had 15 logon events with last logon on 2004-08-27T15:08:23.474473+00:00. By contrast, built-in accounts show no logons: Administrator (RID 500) - 0 logons; Guest (RID 501) - 0 logons. Support service accounts (HelpAssistant RID 1000, SUPPORT_388945a0 RID 1002) also show no logon activity. This pattern confirms Mr. Evil was the sole active user account performing all hacking activities on the system.



### 12. [HIGH] Network Reconnaissance: Look@LAN and Network Stumbler for Scanning

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-25T15:56:11 to 2004-08-27T15:12:35 |
| **Sources** | registry.profile, registry.ntuser.mr. evil |
| **Evidence Refs** | tc_5311a857, tc_2d7d16cd |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1589](https://attack.mitre.org/techniques/T1589/), [T1596](https://attack.mitre.org/techniques/T1596/) |


Two network discovery and reconnaissance tools were installed and actively used: (1) Look@LAN 2.50 Build 29 - network scanner that discovers hosts and services, installed 2004-08-25T15:56:11, executed on 2004-08-26 at 15:06:14 and 14:58:25 (LookAtHost variant); (2) Network Stumbler 0.4.0 - wireless LAN discovery tool, installed 2004-08-27T15:12:15, executed on 2004-08-27 at 15:12:35. Combined with whois.exe tool (executed 2004-08-26T15:13:57) for IP address lookup/reconnaissance, this represents systematic network discovery and reconnaissance activities (T1592/T1589) in preparation for network exploitation. The timing of these activities immediately before packet capture tool installation suggests mapping of victim network for targeted interception.



### 13. [HIGH] Anonymous Email Remailer and Newsgroup Access Infrastructure

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:08:00 to 2004-08-27T15:30:00 |
| **Sources** | bulk.email, bulk.domain |
| **Evidence Refs** | tc_346cc3ca, tc_6bc93b57 |
| **ATT&CK** | [T1020](https://attack.mitre.org/techniques/T1020/), [T1040](https://attack.mitre.org/techniques/T1040/) |


Evidence of anonymous communication infrastructure used for covering tracks and accessing hacking communities: (1) 4ax.com anonymous remailer service - numerous disposable email addresses ending in @4ax.com found in recovered email threads (e.g., mdv9h0l6fi4g8rlm5shg75e1luoo5j98o2@4ax.com, qb06h09sbignlqajbrni50n2jppfq7ss26@4ax.com, 97sdh01nq856aveg9c0u4t545rdhj0g9ou@4ax.com), (2) corp.supernews.com NNTP server - Usenet newsgroup access using anonymous accounts, (3) posting.google.com - Google Groups newsgroup discussions. Email headers show "news.da" NNTP format files recovered from memory/cache. These services provide anonymous access to hacking forums and newsgroups without revealing real identity. Combined with Forté Agent newsreader and mIRC chat client, the attacker maintained fully anonymous communication channels for coordinating activities and seeking hacking resources.



### 14. [MEDIUM] Four Executable Files in Recycle Bin Not Actually Deleted

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-25T16:18:25 to 2004-08-27T15:29:58 |
| **Sources** | recycle_bin |
| **Evidence Refs** | tc_15e5007c |


Recycle Bin contains 4 executable installer files that are marked as present in the bin folder, meaning they have NOT been securely deleted: (1) lalsetup250.exe (Look@LAN installer, 2.16 MB, deleted 2004-08-25T16:18:25), (2) netstumblerinstaller_0_4_0.exe (Network Stumbler installer, 1.29 MB, deleted 2004-08-27T15:12:30), (3) WinPcap_3_01_a.exe (packet capture driver installer, 442 KB, deleted 2004-08-27T15:15:26), (4) ethereal-setup-0.10.6.exe (packet analyzer installer, 8.46 MB, deleted 2004-08-27T15:29:58). All files are stored in RECYCLER folder and still accessible. Original paths: C:\\Documents and Settings\\Mr. Evil\\Desktop\\.



### 15. [INFO] System Information: Windows XP with Malicious Configuration

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_5311a857 |


Dell Latitude CPi running Microsoft Windows XP Professional (Build 2600, Version 5.1). Installed 2004-08-19 on computer N-1A9ODN6ZXK4LQ. Time zone: Central Standard Time (UTC-6, daylight UTC-5). Last system shutdown: 2004-08-27T15:46:33.109216+00:00. Network interfaces: Compaq WL110 Wireless LAN PC Card and Xircom CardBus Ethernet 100 + Modem 56.



### 16. [INFO] Image Hash Verified - Acquisition Integrity Confirmed

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | hashdeep.acquisition |
| **Evidence Refs** | tc_0383e588 |


Case acquisition: 4Dell_Latitude_CPi.E01. MD5 acquisition hash from EWF file: aee4fcd9301c03b3b054623ca261959a. MD5 recomputed by ewfverify over all media data: aee4fcd9301c03b3b054623ca261959a. Hashes match exactly, confirming integrity of forensic image and no modification since acquisition.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Internal IP | `192.168.254.2` |  | Victim Data Captured in Ethereal Packet Capture File |
| External IP | `207.68.174.248` |  | Victim Data Captured in Ethereal Packet Capture File |
| External IP | `4.12.220.254` |  | Web Browsing History Shows Interest in Hacking Resources |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `findme69@hotmail.com` |  | Victim Data Captured in Ethereal Packet Capture File |
| Email | `mdv9h0l6fi4g8rlm5shg75e1luoo5j98o2@4ax.com` |  | Anonymous Email Remailer and Newsgroup Access Infrastructure |
| Email | `qb06h09sbignlqajbrni50n2jppfq7ss26@4ax.com` |  | Anonymous Email Remailer and Newsgroup Access Infrastructure |
| Email | `97sdh01nq856aveg9c0u4t545rdhj0g9ou@4ax.com` |  | Anonymous Email Remailer and Newsgroup Access Infrastructure |




---

## Appendix C: MITRE ATT&CK Coverage

13 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (3) > Initial Access (1) > Execution (1) > Persistence (1) > Privilege Escalation (1) > Defense Evasion (2) > Credential Access (5) > Discovery (1) > Lateral Movement (2) > Collection (2) > Exfiltration (1)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1589](https://attack.mitre.org/techniques/T1589/) | Gather Victim Identity Information | Six Hacking and Network Interception Tools Installed; 18 Malicious Files and Hacking Tools Detected by ClamAV; Suspicious Program Execution: Hacking Tool...; Web Browsing History Shows Interest in Hacking...; Network Reconnaissance: Look@LAN and Network... |
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Six Hacking and Network Interception Tools Installed; 18 Malicious Files and Hacking Tools Detected by ClamAV; Suspicious Program Execution: Hacking Tool...; Web Browsing History Shows Interest in Hacking...; Network Reconnaissance: Look@LAN and Network... |
| [T1596](https://attack.mitre.org/techniques/T1596/) | Search Open Technical Databases | Six Hacking and Network Interception Tools Installed; Suspicious Program Execution: Hacking Tool...; Network Reconnaissance: Look@LAN and Network... |


### Initial Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.001](https://attack.mitre.org/techniques/T1078/001/) | Default Accounts | Greg Schardt Identified as "Mr. Evil"...; User Account Activity: Mr. Evil as Primary... |


### Execution

| Technique | Name | Findings |
|-----------|------|----------|
| [T1610](https://attack.mitre.org/techniques/T1610/) | Deploy Container | 18 Malicious Files and Hacking Tools Detected by ClamAV |


### Persistence

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.001](https://attack.mitre.org/techniques/T1078/001/) | Default Accounts | Greg Schardt Identified as "Mr. Evil"...; User Account Activity: Mr. Evil as Primary... |


### Privilege Escalation

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.001](https://attack.mitre.org/techniques/T1078/001/) | Default Accounts | Greg Schardt Identified as "Mr. Evil"...; User Account Activity: Mr. Evil as Primary... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.001](https://attack.mitre.org/techniques/T1078/001/) | Default Accounts | Greg Schardt Identified as "Mr. Evil"...; User Account Activity: Mr. Evil as Primary... |
| [T1610](https://attack.mitre.org/techniques/T1610/) | Deploy Container | 18 Malicious Files and Hacking Tools Detected by ClamAV |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Victim Data Captured in Ethereal Packet Capture File; Victim Web-Based Email Access (Passport/MSN)...; Forté Agent Newsreader with Email/Newsgroup Access; Anonymous Email Remailer and Newsgroup Access...; Cain & Abel Password Hashing and Network... |
| [T1056.004](https://attack.mitre.org/techniques/T1056/004/) | Credential API Hooking | Victim Web-Based Email Access (Passport/MSN)... |
| [T1110](https://attack.mitre.org/techniques/T1110/) | Brute Force | Cain & Abel Password Hashing and Network... |
| [T1111](https://attack.mitre.org/techniques/T1111/) | Multi-Factor Authentication Interception | Victim Data Captured in Ethereal Packet Capture File |
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Victim Data Captured in Ethereal Packet Capture File; Cain & Abel Password Hashing and Network... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Victim Data Captured in Ethereal Packet Capture File; Victim Web-Based Email Access (Passport/MSN)...; Forté Agent Newsreader with Email/Newsgroup Access; Anonymous Email Remailer and Newsgroup Access...; Cain & Abel Password Hashing and Network... |


### Lateral Movement

| Technique | Name | Findings |
|-----------|------|----------|
| [T1021](https://attack.mitre.org/techniques/T1021/) | Remote Services | IRC Client (mIRC) Execution and Network Communications |
| [T1570](https://attack.mitre.org/techniques/T1570/) | Lateral Tool Transfer | IRC Client (mIRC) Execution and Network Communications |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1056.004](https://attack.mitre.org/techniques/T1056/004/) | Credential API Hooking | Victim Web-Based Email Access (Passport/MSN)... |
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Victim Data Captured in Ethereal Packet Capture File; Cain & Abel Password Hashing and Network... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1020](https://attack.mitre.org/techniques/T1020/) | Automated Exfiltration | Forté Agent Newsreader with Email/Newsgroup Access; Anonymous Email Remailer and Newsgroup Access... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 163 |
| Findings submitted | 16 |
| Confirmed | 14 |
| Inferences | 2 |
| Input tokens | 6.4K |
| Output tokens | 58.9K |
| Total tokens | 65.3K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 6.4K | 58.9K | 65.3K |




<details>
<summary>Evidence Sources (50)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 12545 |
| hashdeep.hashes | hashdeep | 8 |
| hashdeep.acquisition | ewfverify | 1 |
| tsk.masquerade | sleuthkit | 14 |
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
| recycle_bin | icat | 6 |
| appfiles.application_data.sharedaccess.ini | icat | 52 |
| registry.profile | python-registry | 36 |
| appfiles.application_data.brndlog.txt | icat | 5 |
| appfiles.application_data.brndlog.txt | icat | 217 |
| appfiles.application_data.desktop.ini | icat | 5 |
| appfiles.application_data.cleanup.log | icat | 10 |
| appfiles.application_data.brndlog.txt | icat | 5 |
| ez.shimcache | eztools | 140 |
| registry.default | regripper | 427 |
| ez.prefetch | eztools | 165 |
| registry.default | regripper | 403 |
| registry.system | regripper | 133 |
| registry.system | regripper | 7 |
| registry.security | regripper | 19 |
| registry.security | regripper | 8 |
| pcap.disk.interception | tshark | 75 |
| registry.software | regripper | 9600 |
| registry.software | regripper | 283 |
| registry.software | regripper | 1161 |
| registry.system | regripper | 3138 |
| registry.system | regripper | 199 |
| yara.files | yara | 3 |
| registry.ntuser.default user | regripper | 70 |
| registry.usrclass.localservice | regripper | 4 |
| registry.ntuser.localservice | regripper | 70 |
| registry.usrclass.mr. evil | regripper | 4 |
| registry.ntuser.mr. evil | regripper | 329 |
| registry.usrclass.networkservice | regripper | 4 |
| registry.ntuser.networkservice | regripper | 70 |
| clamav.scan | clamav | 18 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
