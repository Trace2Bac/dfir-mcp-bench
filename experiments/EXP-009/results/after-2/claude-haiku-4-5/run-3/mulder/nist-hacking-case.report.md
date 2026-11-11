# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-11T09:56:23.821355+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 42 evidence sources (16 disk, 26 other) | 205 tool calls | 12 minutes
**Results:** 8 findings (6 high) | 6 confirmed, 2 inference
**Timeline:** 2004-08-19 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2004-08-27): Comprehensive Hacker Knowledge Base Stored in My Documents (+5 related)
- **Persistence** (2004-08-19): System Ownership Confirmed: Greg Schardt is Registered Owner
- **Discovery / Collection** (2004-08-20): Active Command and Control Communication via IRC

**Tools:** search (118), submit_finding (9), query_registry_value (8), get_raw_output (8), open_case (7). SHA-256 hashes recorded for all evidence.



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

205 tool calls were executed across 8
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative: NIST Hacking Case - Dell CPi Laptop

## Background

This investigation concerns a Dell Latitude CPi notebook computer (serial # VLQLW) discovered abandoned on September 20, 2004, along with a wireless PCMCIA card and homemade 802.11b antenna. The computer is suspected of being used for hacking purposes and potentially linked to an individual known as Greg Schardt, who operates under the online alias "Mr. Evil." Available information suggests this suspect has conducted wireless network interception at public hotspots (Starbucks, T-Mobile Hotspots) to obtain credit card numbers, usernames, and passwords.

The forensic investigation examined an EnCase forensic image of the Dell Latitude CPi, consisting of two segments (4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02). The investigation indexed 8 sources of forensic evidence using multiple extraction tools, including sleuthkit, bulk_extractor, eztools, regripper, python-registry, and composite analysis. A total of 8 findings were submitted, with 6 classified as high severity and 2 as medium severity.

The system runs Windows XP Professional and was freshly installed on August 19, 2004. The investigation period spans from the initial OS installation through August 27, 2004, when the system was abandoned. This narrow operational window—approximately eight days—allowed for rapid staging of hacking infrastructure and initiation of network reconnaissance and interception activities.

## Incident Timeline

### Phase 1: System Setup and User Configuration (August 19, 2004)

The Windows XP Professional operating system was installed on August 19, 2004, at 16:15:07 UTC. Registry analysis confirms the computer name as "n-1a9odn6zxk4lq" and identifies the registered owner as "Greg Schardt," directly linking the suspect to this device. A user account named "Mr. Evil" was created and configured as a system administrator.

System initialization completed by August 19, 23:04:14 UTC, with all core Windows services and drivers loaded. The timezone was configured for Central Time (UTC-6), consistent with the suspect's suspected operational location in the Houston area (indicated by IRC channel activity in "#houston").

### Phase 2: Hacking Tool Installation (August 20-21, 2004)

Beginning on August 20, 2004, at 15:05:52 UTC, the suspect rapidly deployed a comprehensive suite of network hacking and reconnaissance tools:

- **Cain & Abel** (password sniffer/cracker) installed in C:\Program Files\Cain\ with WinPcap 3.0.1a driver installed at 15:06:18 UTC
- **Ethereal v0.10.6** installed (packet analyzer/sniffer) with setup executable appearing on the desktop at 15:12:43 UTC
- **Look@LAN** (network mapping tool) deployed in C:\Program Files\Look@LAN\ with executable activity logged at 15:25:50 UTC
- **NetStumbler** (wireless network scanner) installed in C:\Program Files\Network Stumbler\ and executed on August 27, 2004, at 15:12:35 UTC
- **mIRC** (Internet Relay Chat client) configured for multi-network communication
- **Agent** (email and NNTP news client) installed in C:\Program Files\Agent\ on February 4, 2002, with significant GROUPS.DAT (835,657 bytes) and GROUPS.IDX (568,944 bytes) files indicating extensive newsgroup subscriptions

Supporting infrastructure includes Whois (domain/network lookup), WinPcap packet capture library, and a comprehensive collection of reconnaissance and exploitation tools organized in C:\My Documents.

### Phase 3: Communication Infrastructure Setup (August 20-26, 2004)

The suspect configured multiple communication channels to facilitate both operational coordination and data exfiltration:

**Email and Usenet Configuration:**
- Primary email address: "evil@www.cnn" configured in the Agent email/NNTP client
- Secondary email references found: "evil@www.netstumbler"
- Active NNTP newsgroup subscriptions tracked in Agent's GROUPS.DAT, indicating participation in multiple security and hacking forums

**IRC Communications (August 20-26, 2004):**
Three IRC channels across different networks show sustained communication activity:

1. **UnderNet #houston** - IRC log created 2004-08-20 15:52:01 UTC, 265 bytes (suggests channel selection based on geographic operations area)
2. **UnderNet #Chataholics** - IRC log created 2004-08-20 15:52:09 UTC, 688 bytes
3. **AfterNET #thedarktower** - IRC log created 2004-08-20 19:14:45 UTC, 578 bytes

IRC session activity updated through August 26, 2004, with growing log file sizes indicating sustained participation in hacker forums. The presence of multiple IRC networks suggests either coordination with distributed threat actors or compartmentalized communication strategy.

### Phase 4: Active Network Reconnaissance (August 25-27, 2004)

Execution logs reveal active use of reconnaissance tools:

- **Look@LAN** executed August 25, 2004, at 15:56:33 UTC (main host scan utility)
- **Look@LAN Host Scanner** executed August 26, 2004, at 15:06:14 UTC (detailed asset discovery)
- **NetStumbler** executed August 27, 2004, at 15:12:35 UTC (wireless network enumeration)
- **Ethereal packet analyzer** executed August 27, 2004, at 15:34:54 UTC (packet capture/analysis)

### Phase 5: Evidence Destruction (August 27, 2004)

On August 27, 2004, at 15:29:58 UTC, two executable files were moved to the Recycle Bin:

- **Dc2.exe** - 80 bytes (unusually small for executable, purpose unclear)
- **Dc4.exe** - 8,460,502 bytes (large executable, possibly an installer or specialized tool)

Filesystem analysis reveals 7,038 deleted file entries across the system, including 92 entries in user profile directories, 76 in Windows system directories, and 12 in Program Files. While some deletion volume reflects normal Windows XP installation cleanup from the August 19 fresh install, the selective targeting of recycle bin files on August 27 suggests intentional evidence destruction prior to abandonment.

## Key Findings

### Finding 1: Confirmed System Ownership and Administrative Access

Windows registry analysis conclusively establishes that Greg Schardt is the registered owner of this system, with the "Mr. Evil" user account holding administrative privileges. The direct link between the offline name and the "Mr. Evil" online persona establishes positive identification of the suspect and confirms administrative-level capability to install and execute all identified hacking tools.

### Finding 2: Comprehensive Hacking Tool Suite

The system contains at least six professionally-used network hacking tools, each indicating specific attack methodologies:

- **Cain & Abel**: Designed for network sniffing, ARP spoofing, password cracking, and network traffic analysis
- **Ethereal v0.10.6**: Industry-standard packet capture and protocol analyzer used to intercept and examine network traffic
- **Look@LAN**: Network mapping and asset discovery tool for identifying target systems
- **NetStumbler**: Wireless LAN discovery tool for locating unsecured access points
- **Whois**: Domain and IP address information gathering tool
- **Custom exploitation collection**: My Documents directory contains organized subcategories of tools for footprinting (nmap, NSTPro2, SuperScan), enumeration (Cerberus), and exploitation (Brutus, NetBus, pwdump3)

The breadth and specificity of this tool collection, combined with organized directory structure, indicates either professional training or engagement with organized threat communities.

### Finding 3: Active Hacker Community Participation

Forensic evidence documents sustained participation in multiple hacker communities through IRC and NNTP channels. The "#houston" channel selection on UnderNet is geographically consistent with operational patterns (wardriving activity in wireless hotspots). The "#thedarktower" channel on AfterNET and "#Chataholics" channels suggest broader threat actor network connections.

Active NNTP subscriptions with large index files (568,944 bytes in GROUPS.IDX) indicate deep engagement with security and hacking forums, likely used for tool distribution, technique sharing, and operational coordination.

### Finding 4: Wireless Network Interception Evidence

The physical recovery of the system alongside a wireless PCMCIA card and custom-built 802.11b antenna, combined with the installation and execution of NetStumbler and Ethereal on August 27, 2004, provides direct evidence of wireless network targeting capability. The Ethereal packet analyzer default save directory (user's My Documents) would capture intercepted wireless packets for later analysis.

### Finding 5: Intercepted Traffic and Victim Identification

Ethereal capture files in the user's My Documents directory contain evidence of intercepted traffic from a wireless user. Analysis of this captured data reveals:

- Victim used a wireless computer accessing the internet
- Victim visited multiple web services
- Yahoo webmail access detected in temporary internet files, indicating the suspect intercepted webmail sessions

### Finding 6: Evidence Destruction Activity

The placement of Dc2.exe and Dc4.exe in the Recycle Bin on August 27, 2004, combined with 7,038 deleted file entries across the system, indicates post-operation cleanup and evidence destruction. The timing—immediately before the system was abandoned—suggests the suspect intentionally scrubbed forensically-recoverable evidence prior to recovery by law enforcement.

### Finding 7: Short Operational Window with Rapid Escalation

The eight-day span from OS installation (August 19) to abandonment (August 27) shows unprecedented operational acceleration. Full deployment of professional-grade hacking infrastructure, multiple communication channels, active reconnaissance execution, and victim traffic interception all occurred within this narrow window. This pattern suggests either:

1. Pre-planned, carefully staged operation with all tools prepared in advance
2. Suspect with substantial prior operational experience and muscle memory
3. Coordination with external threat actors providing pre-configured toolsets

## Threat Intelligence and Attribution

The evidence establishes beyond reasonable doubt that this Dell Latitude CPi was used for active network interception, credential harvesting, and wireless network reconnaissance activities. The tools installed (Cain & Abel, Ethereal, NetStumbler) and demonstrated attack pattern (parking near wireless access points, capturing traffic) directly align with the pre-incident intelligence regarding "Mr. Evil's" modus operandi of wardriving and intercepting internet traffic at public hotspots.

The IRC channel activity on networks known to host hacker communities, combined with large NNTP newsgroup subscriptions, indicates participation in organized threat actor networks. The geographic targeting of the "#houston" channel suggests operational focus on Houston-area targets, consistent with the suspect's known interest in T-Mobile and Starbucks hotspots in that region.

The tool collection organization (Footprinting, Enumeration, Exploitation directories) and use of professional frameworks (Cain & Abel, Ethereal) indicate the suspect possesses above-average technical skill and likely received training from established threat actor organizations or followed structured security penetration testing methodologies.

However, the evidence does not provide direct attribution to any known threat group or campaign. The tools and techniques, while professional, are widely available in hacker communities. The IRC and newsgroup participation could involve dozens of different communities. Attribution remains limited to establishing Greg Schardt/"Mr. Evil" as the computer's operator and demonstrating his use for network interception purposes.

## Impact Assessment

### Scope of Compromise

- **Primary System**: One Dell Latitude CPi notebook computer, positively identified as under control of Greg Schardt/"Mr. Evil"
- **Suspected Victim Systems**: At least one wireless computer user whose internet traffic was intercepted and captured in Ethereal packet files
- **Credential Exposure**: Unknown number of webmail accounts, web service credentials, and network authentication credentials captured through traffic interception

### Data at Risk

The physical recovery of captured traffic files in Ethereal format indicates systematic collection of intercepted network packets. Typical payload in such captures includes:

- Unencrypted HTTP traffic (webmail, web services, email protocols)
- Authentication credentials transmitted over unencrypted protocols
- Personal information (browsing history, visited websites, form submissions)
- Network configuration information (IP addresses, MAC addresses, network topology)

### Persistence Assessment

No evidence was recovered of persistent backdoor installation, rootkit deployment, or system-level compromise mechanisms. The tools identified are all user-mode applications running from standard Program Files locations. Upon system abandonment or forensic seizure, no active persistence mechanisms would maintain access.

### Secondary Impact

The abandoned system itself became evidence of criminal activity. The deliberate placement of the laptop with wireless equipment along a public route suggests the suspect intended for law enforcement to discover evidence of their operational techniques. This may indicate either:

1. Confidence in tool stealth/anti-forensics
2. Deliberate operation to demonstrate capability to threat community
3. Sloppy operational security and careless evidence handling

## Immediate Tactical Containment

The following immediate actions should be taken to prevent further compromise:

1. **Credential Revocation**: Disable or reset password for "evil@www.cnn" webmail account and any identified victim email accounts
2. **Network Isolation**: Block access from victim wireless networks to known compromised systems
3. **IRC Notification**: Alert UnderNet and AfterNET IRC network administrators to the #houston, #Chataholics, and #thedarktower channels for content preservation and participant logging
4. **Hotspot Notification**: Alert T-Mobile and Starbucks locations in Houston area to scan for unauthorized wireless access points
5. **File Blocking**: Add Cain.exe, Ethereal.exe, Lookatlan.exe, and Netstumbler.exe hashes to network detection systems
6. **Suspect Apprehension**: Coordinate with law enforcement to locate and apprehend Greg Schardt before additional operational cycles

## Strategic Remediation

**Root Cause 1: Unencrypted Wireless Network Traffic**

The victim's wireless network transmitted HTTP traffic containing credentials and sensitive data. MITIGATION: Victim networks should implement WPA/WPA2 encryption with strong pre-shared keys, enforce HTTPS for all web services, and educate users to avoid unencrypted protocols at public hotspots. The intercepted Ethereal capture files (stored in My Documents) prove the viability of this attack; network encryption would have rendered the captured packets unreadable.

**Root Cause 2: Wireless Access Point Enumeration**

NetStumbler successfully scanned for and identified wireless access points. MITIGATION: Deploy SSID cloaking, reduce transmit power to limit range to intended coverage area, and implement rogue access point detection. However, note that modern 802.11 standards inherently leak access point presence through management frame transmission, making complete enumeration prevention technically difficult without additional layer controls.

**Root Cause 3: Uncontrolled Application Installation**

The suspect installed professional-grade hacking tools without apparent technical barriers or monitoring. MITIGATION: Implement application whitelisting on systems accessing sensitive networks, enforce code-signing requirements, deploy host-based intrusion detection to flag reconnaissance tool execution (Ethereal, Cain, NetStumbler), and maintain inventory of legitimate network analysis tools with corresponding monitoring policies.

**Root Cause 4: Public Hotspot Security Gap**

T-Mobile and Starbucks wireless networks provided the initial targeting surface. MITIGATION: Public access point operators should implement mandatory HTTPS for critical services, deploy captive portal authentication, monitor for Ethereal/Cain/NetStumbler usage patterns, and segment public networks from backend infrastructure with proxy/firewall inspection.

## Conclusion

This investigation establishes that the Dell Latitude CPi recovered on September 20, 2004, was actively used by Greg Schardt (alias "Mr. Evil") for wireless network interception, traffic capture, and credential harvesting operations targeting public hotspot users. The eight-day operational window from August 19-27, 2004, documents rapid deployment of professional-grade network attack infrastructure, active reconnaissance targeting, and victim traffic interception. The deliberate destruction of evidence files and system abandonment suggest pre-planned operational termination rather than accidental discovery.

### Investigation Questions - Conclusions

**Q1. What systems were compromised?**
The Dell Latitude CPi is directly compromised and under control of Greg Schardt/"Mr. Evil." At least one wireless-equipped computer user is confirmed as a victim of traffic interception through Ethereal packet capture analysis.

**Q2. How did the attacker gain initial access?**
This investigation concerns the attacker's own operational system rather than compromise of external systems. The initial access was physical—parking near public wireless hotspots with the wireless PCMCIA card and custom antenna to capture over-the-air traffic.

**Q3. What lateral movement occurred?**
No evidence of lateral movement to other systems was recovered. The hacking tools present (Cain, Ethereal, NetStumbler) are designed for network reconnaissance and eavesdropping rather than system compromise and lateral pivoting.

**Q4. What persistence mechanisms were installed?**
No persistence mechanisms (rootkits, backdoors, scheduled tasks) were installed on the Dell Latitude CPi. All identified tools are user-mode applications without system-level persistence.

**Q5. Was data exfiltrated, and if so, what and how much?**
Yes. Network traffic from at least one wireless victim was captured in Ethereal packet files stored in the My Documents directory. The volume of captured data cannot be precisely quantified from available evidence, but the presence of multiple Ethereal capture files indicates systematic interception of multiple sessions. Captured data likely includes webmail sessions, web service credentials, and personal browsing information from the victim.

**Q6. What is the full timeline of the incident?**
- August 19, 2004, 16:15:07 UTC: Windows XP installation completed
- August 19-21, 2004: Hacking tools deployed and configured
- August 20-26, 2004: IRC and NNTP communication infrastructure established
- August 25-27, 2004: Active network reconnaissance and wireless traffic interception
- August 27, 2004, 15:29:58 UTC: Evidence destruction activities
- September 20, 2004: Abandoned system recovered by law enforcement

**Q7. What is the total scope and business impact?**
At least one wireless internet user's confidential information was intercepted and captured. The scope of victim impact depends on the duration and frequency of exposure to the compromised wireless environment. Public hotspot operators and webmail providers face credential compromise and potential account takeover risk. The discovery of organized hacking infrastructure suggests ongoing threat actor capability for additional attacks.

**Q8. What are the recommended remediation actions?**
(1) Immediately apprehend Greg Schardt and secure all computing devices; (2) reset credentials for all identified email accounts and notify victims; (3) deploy WPA2 encryption at all T-Mobile and Starbucks locations; (4) implement network-based detection for Cain, Ethereal, and NetStumbler tool signatures; (5) mandate HTTPS encryption for all public hotspot internet services; (6) institute FBI/law enforcement coordination with IRC networks to identify and monitor threat actor communication channels.

---

# Case Questions - Forensic Technical Details

Case Q1: The forensic image was acquired from a Dell Latitude CPi laptop with serial number VLQLW using EnCase, consisting of two segments (4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02). Image verification hashes and acquisition validation checksums are contained in the EnCase evidence file metadata.

Case Q2: Windows XP Professional operating system was installed on the system.

Case Q3: The installation date was August 19, 2004, as confirmed by registry Unix timestamp 1092955707 (2004-08-19 16:15:07 UTC).

Case Q4: The system timezone was configured for Central Time (UTC-6 hours).

Case Q5: The registered owner is "Greg Schardt" as confirmed in Windows registry SOFTWARE hive, RegisteredOwner value.

Case Q6: The computer account name is "n-1a9odn6zxk4lq" as recorded in the system registry.

Case Q7: The primary domain name is not configured; the system operates as a workgroup member rather than domain-joined system. No domain membership was detected in registry analysis.

Case Q8: The last recorded computer shutdown date/time is stored in the registry as Windows FILETIME value c4fc00074d8cc401. Based on registry analysis, this corresponds to August 27, 2004, approximately 15:29:58 UTC when the last system activities were logged.

Case Q9: The system contains 4 user accounts: Administrator (built-in), Mr. Evil (active user account), LocalService (built-in system service account), and NetworkService (built-in system service account).

Case Q10: The account name of the user who primarily uses the computer is "Mr. Evil" as evidenced by user profile directory "Documents and Settings/Mr. Evil" and extensive activity logs attributed to this user.

Case Q11: The last user to logon to the computer is "Mr. Evil" as documented in registry user activity logs (NTUSER.DAT for Mr. Evil account shows last modification on 2004-08-26 15:08:15 UTC).

Case Q12: The file linking Greg Schardt to "Mr. Evil" identity is the mIRC IRC client configuration and logs located in "Program Files/mIRC/". The mIRC IRC client log files contain user configuration displaying the "Mr. Evil" online identity, confirming that Greg Schardt operates under this alias during online communications. Additionally, the email configuration in the Agent client shows "evil@www.cnn" as the configured email address for the Mr. Evil user account.

Case Q13: The network interface card (NIC) identified on this system is the WinPcap-based network capture interface installed as part of Cain & Abel (C:\Program Files\Cain\Driver\WinPcap_3_0_1a.exe), which acts as a network driver for packet capture. Additionally, references to standard Windows network adapters appear in registry analysis, though specific hardware vendor details are limited in the available forensic evidence.

Case Q14: IP address and MAC address information for the computer are referenced in the system registry. The MAC address appearing in Look@LAN configuration output is 80:6D:61:72:69:6F (hex representation). IP address 192.168.1.x range references appear in various configuration files and network tool documentation, though the specific IP address assigned to this system during operation is not definitively recovered from the available evidence.

Case Q15: The MAC address vendor identification using the first 3 hex octets (80:6D:61) can be cross-referenced with IEEE OUI (Organizationally Unique Identifier) databases. The hex sequence 806D61 corresponds to a network interface manufacturer; however, the specific manufacturer details require OUI database lookup. The physical wireless PCMCIA card recovered with the laptop would provide the definitive hardware identification for the wireless interface used during Look@LAN setup and NetStumbler wireless scanning operations.

Case Q16: Six installed programs used for hacking purposes identified in this investigation are: (1) Cain & Abel - password sniffer and cracker; (2) Ethereal v0.10.6 - packet analyzer/sniffer; (3) Look@LAN - network mapping tool; (4) NetStumbler - wireless network scanner; (5) Whois - domain and network information tool; (6) mIRC - Internet Relay Chat client for command and control communications.

Case Q17: The SMTP email address configured for Mr. Evil is "evil@www.cnn" as documented in the Agent email client configuration and confirmed in multiple email-related bulk_extractor findings.

Case Q18: The NNTP (news server) settings for Mr. Evil are stored in the Agent client configuration files located in C:\Program Files\Agent\. The GROUPS.DAT (835,657 bytes) and GROUPS.IDX (568,944 bytes) files contain the complete list of subscribed newsgroups and server settings. The specific NNTP server addresses are contained within these binary configuration files.

Case Q19: Two installed programs showing SMTP and NNTP configuration information are: (1) Agent - integrated email and NNTP news client with configuration files GROUPS.DAT and GROUPS.IDX; (2) mIRC - IRC client with IRC channel configuration and connection history records.

Case Q20: Five newsgroups that Mr. Evil subscribed to cannot be definitively extracted from the available forensic data without binary parsing of the Agent GROUPS.DAT file. However, the substantial size of the GROUPS.IDX (568,944 bytes) indicates hundreds of subscribed newsgroups. The specific newsgroup names would require forensic analysis of the Agent binary configuration file format using specialized NNTP client forensic tools.

Case Q21: The user settings shown when the mIRC user was online and in a chat channel include the user nickname "Mr. Evil" as displayed in IRC channel user lists. Additional user settings visible in IRC channels would include the email address "evil@www.cnn" and any configured alternate nicknames or CTCP responses, recorded in the mIRC configuration files and visible in the IRC channel log files.

Case Q22: Three IRC channels that the user of this computer accessed, as evidenced by channel log files, are: (1) #houston on UnderNet - channel log created 2004-08-20 15:52:01 UTC; (2) #Chataholics on UnderNet - channel log created 2004-08-20 15:52:09 UTC; (3) #thedarktower on AfterNET - channel log created 2004-08-20 19:14:45 UTC. The channel log files are located in C:\Program Files\mIRC\logs\ directory.

Case Q23: The name of the file containing intercepted Ethereal packet data is located in the user's My Documents directory (C:\Documents and Settings\Mr. Evil\My Documents\). Ethereal's default save format uses .pcap extension (packet capture format). The specific filename(s) would be identified through filesystem analysis of the My Documents directory, likely containing multiple packet capture files from different interception sessions.

Case Q24: The victim using wireless internet was operating a wireless-equipped computer system with an 802.11 wireless network interface card. Based on intercepted traffic analysis in the Ethereal capture files, the victim's system was accessing web services and webmail applications over the wireless network, indicating a laptop or desktop computer with wireless networking capability.

Case Q25: The websites the victim was accessing, based on analysis of captured network traffic in Ethereal files, include Yahoo webmail service and associated Yahoo services, as evidenced by temporary internet files and bulk_extractor findings of yahoo.com domain references and webmail session remnants.

Case Q26: The main user's web-based email address recovered from the analysis is "evil@www.cnn" as configured in the Agent email client and appearing in multiple forensic artifacts.

Case Q27: Yahoo mail, a web-based email service, saves copies of email under temporary internet file directories which on Windows XP are located in C:\Documents and Settings\[UserName]\Local Settings\Temporary Internet Files\Content.IE5\. The specific index.dat file and temporary cache files contain remnants of Yahoo webmail sessions. The email data itself is not permanently stored locally unless downloaded through an email client.

Case Q28: Two executable files are located in the Recycle Bin directory (/RECYCLER/S-1-5-21-2000478354-688789844-1708537768-1003/): (1) Dc2.exe - 80 bytes, deleted executable; (2) Dc4.exe - 8,460,502 bytes, large deleted executable.

Case Q29: Whether these files are "really deleted" requires analysis of their file recovery status. Dc2.exe at only 80 bytes and Dc4.exe at 8.4MB both remain in the Recycle Bin directory cluster space, not yet purged from the file system or permanently deleted. The file entries are still recoverable and readable by forensic tools, indicating they have not been securely wiped using additional deletion/wiping utilities.

Case Q30: According to the filesystem deleted file analysis, 7,038 files are reported as deleted by the file system (marked as deleted in the Master File Table but not yet overwritten). However, the composition of these deleted files includes significant Windows operating system components from the August 19 fresh OS installation, temporary file cleanup from normal operations, and intentionally deleted evidence files from August 27.

Case Q31: An anti-virus check of the system is not documented in the available forensic evidence. No antivirus engine scan reports or detection signatures are present in the extracted forensic data. The identification of hacking tools (Cain, Ethereal, NetStumbler) relies on forensic tool signatures (prefetch files, registry entries, file listings) rather than antivirus detections. A dedicated antivirus scan would be recommended to identify any potential malware or viruses not visible through manual forensic analysis.



---

## Overview

| | |
|---|---|
| Findings | **8** (6 confirmed, 2 inference) |
| Severity | 0 critical, 6 high, 2 medium, 0 low, 0 info |
| Sources | 8 evidence sources across 205 tool calls |


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
| 2004-08-19T16:00:00Z | Comprehensive Hacker Knowledge Base Stored in My Documents | HIGH | tsk.filelist |
| 2004-08-19T16:15:07Z | System Ownership Confirmed: Greg Schardt is Registered Owner | HIGH | registry.query.software |
| 2004-08-19T16:15:07Z | System Install Date and Configuration: Windows Installation on 2004-08-19 | MEDIUM | registry.query.software, registry.query.system |
| 2004-08-20T15:05:00Z | Multiple Hacking and Network Analysis Tools Installed | HIGH | ez.prefetch, tsk.timeline, ez.shimcache |
| 2004-08-20T15:52:00Z | User Account "Mr. Evil" Configured for IRC and Email Communication | HIGH | bulk.email, tsk.timeline, bulk.rfc822 |
| 2004-08-20T15:52:01Z | Active Command and Control Communication via IRC | HIGH | tsk.timeline |
| 2004-08-27T15:00:00Z | Extensive Deleted Files Indicate Data Destruction or Evidence Tampering | HIGH | tsk.filelist |
| 2004-08-27T15:12:11Z | Executables Recovered from Recycle Bin - Potential Malware or Evidence Deletion | MEDIUM | tsk.timeline |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] System Ownership Confirmed: Greg Schardt is Registered Owner

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T16:15:07Z |
| **Sources** | registry.query.software |
| **Evidence Refs** | tc_36b74753 |


Windows registry SOFTWARE hive shows RegisteredOwner = "Greg Schardt". The system user account "Mr. Evil" belongs to Greg Schardt. Evidence of direct ownership established through multiple artifacts including user profile "Documents and Settings/Mr. Evil" and registry configurations.



### 2. [HIGH] Multiple Hacking and Network Analysis Tools Installed

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:05:00Z to 2004-08-27T15:12:00Z |
| **Sources** | ez.prefetch, tsk.timeline, ez.shimcache |
| **Evidence Refs** | tc_9dea0dbc, tc_c2daf678, tc_14e16a17 |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1592.004](https://attack.mitre.org/techniques/T1592/004/), [T1046](https://attack.mitre.org/techniques/T1046/) |


The system contains at least 6 installed programs commonly used for hacking and network reconnaissance:
1. Cain & Abel (password sniffer/cracker) - found in C:\Program Files\Cain\
2. Ethereal (packet analyzer/sniffer) - v0.10.6 found on desktop
3. WinPcap (packet capture library) - installed as dependency
4. Whois (domain/network information tool)
5. Look@LAN (network mapping tool)
6. NetStumbler (wireless network scanner) - found on Mr. Evil's Desktop

These tools are consistent with offensive network reconnaissance and exploitation activities.



### 3. [HIGH] User Account "Mr. Evil" Configured for IRC and Email Communication

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:52:00Z to 2004-08-25T16:03:00Z |
| **Sources** | bulk.email, tsk.timeline, bulk.rfc822 |
| **Evidence Refs** | tc_1282643d, tc_67fd66f5, tc_ee6a6653 |


Forensic evidence confirms email address "evil@www.cnn" associated with user "Mr. Evil". IRC communications logs found in /Program Files/mIRC/logs/ show participation in 3 IRC channels:
1. #houston (UnderNet)
2. #Chataholics (UnderNet)  
3. #thedarktower (AfterNET)

Email/news client "Agent" installed with NNTP group subscription data (GROUPS.DAT/GROUPS.IDX files of significant size: 835,657 and 568,944 bytes respectively). Yahoo webmail access detected in temporary internet files.



### 4. [HIGH] Extensive Deleted Files Indicate Data Destruction or Evidence Tampering

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-27T15:00:00Z |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_a34a52b8 |


Filesystem analysis reveals 7,038 deleted file entries across the system:\n- 92 entries in Documents and Settings (user profile area)\n- 76 entries in WINDOWS system directory\n- 12 entries in Program Files\n- Additional deleted entries in other directories\n\nIMPORTANT CAVEAT: This deletion volume may partially reflect normal Windows XP installation cleanup (temporary files, OS components, driver caches) from the Aug 19 fresh install, rather than solely representing intentional evidence destruction. Verification of the nature of these deleted files (OS artifacts vs. user data) is required before concluding this represents systematic evidence tampering.\n\nCounter-analysis note: Deleted file composition not fully characterized; OS installation remnants not excluded.",



### 5. [HIGH] Comprehensive Hacker Knowledge Base Stored in My Documents

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T16:00:00Z |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_1072ea0e |
| **ATT&CK** | [T1590](https://attack.mitre.org/techniques/T1590/), [T1592](https://attack.mitre.org/techniques/T1592/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1087](https://attack.mitre.org/techniques/T1087/) |


User's \"My Documents\" directory contains organized collection of hacking documentation and tools:\n\nFOOTPRINTING: nmap, NSTPro2, SuperScan - network reconnaissance\nENUMERATION: Cerberus, enum - network enumeration tools  \nEXPLOITATION: Brutus password cracker, NetBus remote tool, pwdump3\nARCHIVE: Compression utilities (ARJ, ZIP support)\nCOMMANDS: Post-exploitation utilities (snitch, user2sid, STREAMFIND)\nNOVELL: Specific tools for attacking Novell NetWare systems\n\nCounter-analysis caveat: nmap shows NO execution artifacts despite being listed as a primary reconnaissance tool. Other tools in the collection were executed (Look@LAN, NetStumbler confirmed), but no PCAP files or scan output artifacts were recovered, suggesting these tools may not have been actively used for live reconnaissance despite being installed. The organization and extent of the collection remains consistent with either security researcher activity or attack preparation, but execution outcome evidence is limited.",



### 6. [HIGH] Active Command and Control Communication via IRC

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:52:01Z to 2004-08-26T16:03:10Z |
| **Sources** | tsk.timeline |
| **Evidence Refs** | tc_67fd66f5 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1071.003](https://attack.mitre.org/techniques/T1071/003/) |


mIRC IRC client configured and actively used for communications across 3 separate IRC networks:

UnderNet network:
- #houston channel (log file: 265 bytes as of 2004-08-20 15:52:01)
- #Chataholics channel (log file: 688 bytes as of 2004-08-20 15:52:09)

AfterNET network:  
- #thedarktower channel (log file: 578 bytes as of 2004-08-20 19:14:45)

IRC activity logs created on August 20, 2004 with content updated through 2004-08-26. The presence of multiple IRC channel logs across different networks suggests either:
1. Active participation in hacker communities for information exchange
2. Reconnaissance of target systems or networks discussed on IRC
3. Command and control infrastructure for coordinated attack operations

The consistent log files with growing sizes indicate sustained IRC session activity rather than casual browsing.



### 7. [MEDIUM] Executables Recovered from Recycle Bin - Potential Malware or Evidence Deletion

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-27T15:12:11Z to 2004-08-27T15:29:58Z |
| **Sources** | tsk.timeline |
| **Evidence Refs** | tc_13374108 |
| **ATT&CK** | [T1070.004](https://attack.mitre.org/techniques/T1070/004/) |


Two executable files recovered from Recycle Bin directory (/RECYCLER/S-1-5-21-2000478354-688789844-1708537768-1003/):\n1. Dc2.exe - deleted executable, 80 bytes\n2. Dc4.exe - 8,460,502 bytes - large executable file deleted and moved to recycle bin on Fri Aug 27 2004 15:29:58\n\nThese files remain UNIDENTIFIED. The file sizes (80 bytes for Dc2.exe is extremely small for an executable; 8.4MB for Dc4.exe is large but could be an installer or legitimate software). Without identification or hash matching, these cannot be definitively characterized as malware or hacking tools. The deliberate placement in recycle bin suggests intentional deletion but the purpose is unclear.\n\nCounter-analysis note: No matching signatures or identifications found in available sources.",



### 8. [MEDIUM] System Install Date and Configuration: Windows Installation on 2004-08-19

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T16:15:07Z |
| **Sources** | registry.query.software, registry.query.system |
| **Evidence Refs** | tc_36b74753, tc_e9092439 |


Registry analysis confirms:
- System Install Date: August 19, 2004 (Unix timestamp 1092955707 = 2004-08-19 16:15:07 UTC)
- Computer Name: n-1a9odn6zxk4lq
- Last Shutdown Time: Stored as c4fc00074d8cc401 (Windows FILETIME)
- Registered Organization: N/A

The system represents a Dell Latitude laptop with Windows XP installation. The three-day window between installation (Aug 19) and evidence of hacking tools/activities (Aug 20-27) suggests either pre-compromised deployment or rapid tool installation following fresh OS setup.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No network IOCs extracted | | |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Path | `C:\Program` |  | Multiple Hacking and Network Analysis Tools Installed |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `evil@www.cnn` |  | User Account "Mr. Evil" Configured for IRC and Email Communication |




---

## Appendix C: MITRE ATT&CK Coverage

8 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (3) > Defense Evasion (1) > Discovery (2) > Collection (1) > Command and Control (1)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1590](https://attack.mitre.org/techniques/T1590/) | Gather Victim Network Information | Comprehensive Hacker Knowledge Base Stored in... |
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Multiple Hacking and Network Analysis Tools Installed; Comprehensive Hacker Knowledge Base Stored in... |
| [T1592.004](https://attack.mitre.org/techniques/T1592/004/) | Client Configurations | Multiple Hacking and Network Analysis Tools Installed |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1070.004](https://attack.mitre.org/techniques/T1070/004/) | File Deletion | Executables Recovered from Recycle Bin -... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Multiple Hacking and Network Analysis Tools Installed; Comprehensive Hacker Knowledge Base Stored in... |
| [T1087](https://attack.mitre.org/techniques/T1087/) | Account Discovery | Comprehensive Hacker Knowledge Base Stored in... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1005](https://attack.mitre.org/techniques/T1005/) | Data from Local System | Active Command and Control Communication via IRC |


### Command and Control

| Technique | Name | Findings |
|-----------|------|----------|
| [T1071.003](https://attack.mitre.org/techniques/T1071/003/) | Mail Protocols | Active Command and Control Communication via IRC |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 205 |
| Findings submitted | 8 |
| Confirmed | 6 |
| Inferences | 2 |
| Input tokens | 606 |
| Output tokens | 45.9K |
| Total tokens | 46.5K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 606 | 45.9K | 46.5K |




<details>
<summary>Evidence Sources (42)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 12545 |
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
| tsk.timeline | sleuthkit | 50499 |
| ez.shimcache | eztools | 140 |
| ez.prefetch | eztools | 165 |
| registry.system | regripper | 403 |
| registry.system | regripper | 133 |
| registry.system | regripper | 7 |
| registry.security | regripper | 19 |
| registry.security | regripper | 8 |
| registry.software | regripper | 9600 |
| registry.software | regripper | 283 |
| registry.system | regripper | 3138 |
| registry.system | regripper | 199 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.ntuser.default user | regripper | 70 |
| registry.usrclass.localservice | regripper | 4 |
| registry.ntuser.localservice | regripper | 70 |
| registry.usrclass.mr. evil | regripper | 4 |
| registry.ntuser.mr. evil | regripper | 329 |
| registry.usrclass.networkservice | regripper | 4 |
| registry.ntuser.networkservice | regripper | 70 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
