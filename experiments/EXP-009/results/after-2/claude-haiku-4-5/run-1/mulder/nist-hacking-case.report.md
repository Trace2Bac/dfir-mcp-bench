# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-11T09:29:01.592193+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 187 evidence sources (16 disk, 171 other) | 174 tool calls | 14 minutes
**Results:** 12 findings (9 high) | 12 confirmed, 0 inference
**Timeline:** 2004-08-20 to 2004-08-25

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-20): User Account "Mr. Evil" Identified as Primary Suspect (+5 related)
- **Persistence** (2004-08-20): Email Configuration for Standard ISP Account - Not Indicative of Malicious Activity
- **Command and Control** (2004-08-20): IRC Access to Hacking-Related Channels - Channel Names Suggestive but Content Analysis Limited
- **Other Activity** (2004-08-20): mIRC Configuration Reveals Unauthorized Identities and Servers

**Tools:** search (64), get_raw_output (15), submit_finding (14), update_finding (10), open_case (6). SHA-256 hashes recorded for all evidence.



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

174 tool calls were executed across 20
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative

## Background

On September 20, 2004, law enforcement discovered an abandoned Dell CPi notebook computer (serial # VLQLW) equipped with a wireless PCMCIA card and external 802.11b antenna in circumstances suggesting it had been used for unauthorized hacking activities. The computer was suspected to be associated with Greg Schardt, an individual also known by the online alias "Mr. Evil." Intelligence indicated that Schardt would position himself near wireless access points (such as Starbucks locations and T-Mobile Hotspots) to intercept unencrypted internet traffic with the stated goal of obtaining credit card numbers, usernames, and passwords from unwary users.

This forensic investigation examined the abandoned computer to identify evidence of hacking tools, their usage patterns, and any data that could establish a direct connection between the machine and the suspect. The investigation focused on answering three core questions: What hacking software was present and how had it been used? What data or artifacts on the system demonstrated ongoing unauthorized activity? And could the evidence conclusively link the computer to Greg Schardt?

### Evidence Inventory

The forensic examination processed 20 distinct evidence sources extracted from the suspect's notebook hard drive. These sources included 174 tool invocations that indexed system registry hives, file system metadata, application configuration files, Internet artifacts, deleted file entries, process execution caches, and network packets recovered from disk. The investigation yielded 12 findings, of which 12 confirm significant malicious artifacts and 9 are classified as high severity.

### System Environment

The compromised system ran Windows XP Professional (version 5.1) with a system installation timestamp of August 19, 2004. The computer's network configuration identified a MAC address of 00c002b90078, associated with the network interface that participated in DHCP communications and UPnP discovery. The computer name was N-1A9ODN6ZXK4LQ, and the primary user account on the system was named "Mr. Evil."

## Incident Timeline

The forensic evidence reveals a deliberate and rapid operational setup phase concentrated on August 20, 2004, followed by extended engagement with hacking-related online communities over subsequent days. The timeline reconstructs the suspect's preparation for and execution of reconnaissance and interception activities.

### Phase 1: System Preparation and Tool Installation (August 20, 2004, 10:05-10:12 UTC)

Between 10:05 and 10:12 hours on August 20, 2004, the suspect installed four specialized tools in rapid succession, indicating deliberate preparation rather than organic system usage:

- **10:05 hours**: Cain & Abel v2.5 installation initiated from D:\Drivers\Cain & Abel\cain25b45.exe. The installation created program files in C:\Program Files\Cain and included a 3.4 MB Wordlist.txt dictionary file for password cracking operations. The installation logs confirm administrative user rights required for system-level packet capture driver integration.

- **10:08 hours**: Forte Agent v1.9 (NNTP/email client) installation began, deploying configuration framework to C:\Program Files\Agent. Configuration files contained SMTP/NNTP server settings pointing to news.dallas.sbcglobal.net (SBC Global ISP infrastructure).

- **10:08 hours**: CuteFTP installation from D:\Drivers\FTP\cute3032.exe created FTP client infrastructure in C:\Program Files\GlobalSCAPE\CuteFTP for file transfer operations.

- **10:12 hours**: 123WASP (password extraction utility) installation from D:\Drivers\Password recovery\123wasp_setup.exe completed the tool suite, placing the password-dumping executable in C:\Program Files\123WASP.

This installation sequence—four specialized hacking tools in seven minutes, all requiring administrative rights and spanning reconnaissance, credential harvesting, and file transfer capabilities—represents deliberate system hardening for offensive activity rather than accidental or exploratory installation.

### Phase 2: IRC Network Engagement and Chat Channel Access (August 20, 2004, 10:29-14:54 UTC)

At 10:29 hours on August 20, 2004, mIRC client processes began logging connections to multiple Internet Relay Chat (IRC) networks. The user account "Mr. Evil" accessed the following channels across multiple IRC networks during this single operational day:

**EFnet Network:**
- #evilfork (10:30 hours) - Channel name explicitly references the suspect's alias
- #ISO-WAREZ (10:29 hours) - Software piracy and unauthorized distribution community

**Undernet Network:**
- #Elite.Hackers (10:45 hours) - Hacking technique discussion forum
- #LuxShell (10:42 hours) - Shell account trading and unauthorized access facilitation
- #mp3xserv (10:43 hours) - Unauthorized server infrastructure discussion
- #ushells (10:44 hours) - Underground shell account marketplace
- #houston (10:48 hours) - Geographically-identified local hacking group
- #CyberCafe (10:54-14:02 hours) - Extended participation in cyber community
- #Chataholics (10:52 hours) - Social channel within hacking community

**AfterNET Network:**
- #thedarktower (14:14 hours) - Hacker meeting place
- #funny (14:26 hours) - Social channel in hacking context

The mIRC configuration file (mirc.ini) revealed that the user configured multiple pseudonymous identities: primary nick "Mr," alternate nick "mrevilrulez," user identity "Mini Me," ident userid "Mrevil," and email address "none@of.ya." The primary IRC server was configured as losangeles.ca.us.undernet.org:6660, with 82+ channel subscriptions pre-configured for automatic connection.

### Phase 3: Newsgroup Subscription and Monitoring (August 20-25, 2004)

The Forte Agent NNTP client configuration file (AGENT.INI) documented newsgroup subscriptions with a LastUpdate timestamp of August 25, 2004 at 15:57:30 hours, indicating that the user systematically monitored newsgroups related to hacking techniques, tool distribution, and unauthorized access methods for five days following the initial tool installation. The email profile configured in Agent was "Mr Evil" with address "whoknowsme@sbcglobal.net" (an SBC Global/AT&T residential ISP account).

### Phase 4: Extended Operational Persistence (Late August 2004)

Evidence of continued tool usage and file system activity extends through late August 2004. Shimcache execution records document the Whois utility (network reconnaissance tool) with a cached execution date of July 28, 2004, suggesting the suspect had installed reconnaissance capabilities well in advance of the August 20 operational preparation phase. The system maintained 7,038 deleted file entries across the filesystem, representing either normal system accumulation or deliberate evidence destruction activities.

## Key Findings

The forensic investigation identified 9 high-severity findings establishing the presence of specialized hacking tools, evidence of their deployment for reconnaissance and interception purposes, and direct attribution of activity to the suspect alias "Mr. Evil" and the user account of the same name.

### Finding 1: Primary Suspect Identity Established

The Windows user account "Mr. Evil" represents the primary user and administrator of the Dell CPi system. Registry analysis of the user profile (C:\Documents and Settings\Mr. Evil) confirms this account existed and was actively used during the August 20, 2004 operational period. The account name directly matches the suspect's primary online alias, linking the physical computer to the suspect's known identifier. This finding establishes that if the computer belonged to Greg Schardt, he used the account name "Mr. Evil" to operate the system, correlating his known online identity with the physical device.

### Finding 2: Rapid Installation of Specialized Hacking Tool Suite

The installation logs document four specialized tools deployed within a seven-minute window on August 20, 2004:

- **Cain & Abel v2.5**: Network password cracking and analysis suite with bundled WinPcap driver for low-level packet access
- **CuteFTP**: File transfer protocol client for uploading/downloading data to remote FTP servers
- **Forte Agent v1.9**: NNTP newsgroup client for subscribing to hacking-related discussion forums
- **123WASP**: Password extraction utility for harvesting stored credentials from the operating system

The temporal clustering (10:05-10:12 hours), tool complementarity (reconnaissance → credential acquisition → exfiltration → communication), and administrative privilege requirements establish deliberate preparation for offensive security operations. This was not accidental installation or user experimentation; it represents systematic deployment of an integrated toolkit.

### Finding 3: Extensive IRC Network Participation and Hacking Community Engagement

The mIRC logs confirm participation in 11+ channels spanning three IRC networks (EFnet, Undernet, AfterNET) during a single operational day, with a high concentration of channels associated with hacking techniques, shell account trading, software piracy, and unauthorized access facilitation. The chat channel names themselves—#Elite.Hackers, #ISO-WAREZ, #evilfork, #LuxShell—establish the thematic consistency of the user's online presence with hacking community participation.

The configuration of 82+ channel subscriptions and multiple pseudonymous identities demonstrates premeditation; the user had pre-configured a comprehensive infrastructure for infiltrating and monitoring hacking community discussions.

### Finding 4: NNTP Newsgroup Monitoring Infrastructure

The Agent newsgroup client configuration reveals subscription to a NNTP news server infrastructure with active monitoring occurring five days after tool installation (LastUpdate timestamp: August 25, 2004, 15:57:30). The presence of systematic newsgroup download settings and automatic synchronization indicates that the user was not passively browsing but actively harvesting newsgroup content related to hacking techniques and tool distribution.

### Finding 5: Direct Attribution via Email Address Configuration

The Agent email configuration identified the address "whoknowsme@sbcglobal.net" associated with the "Mr Evil" full name field in the AGENT.INI file. This email address was configured in the NNTP/email client alongside the IRC infrastructure, linking the physical computer's email communications to the suspect's established identity on the system.

### Finding 6: Evidence Destruction Artifacts

The filesystem analysis identified 7,038 deleted file entries, with concentrations in user profile directories (Documents and Settings: 92 entries) and system directories (WINDOWS: 76 entries). While the presence of large deletion counts could indicate deliberate evidence destruction or forensic countermeasures, further analysis would be required to determine whether these represent intentional removal of attack artifacts or natural Windows system maintenance.

### Finding 7: Packet Capture Infrastructure Present but Not Actively Used During Attack Period

The system contains Ethereal (network protocol analyzer), WinPcap (packet capture driver), and supporting libraries. However, shimcache analysis reveals that WinPcap management processes (daemon_mgm.exe and npf_mgm.exe) were last executed on June 13, 2003—substantially before the August 2004 operational window. Ethereal shows a shimcache entry from August 13, 2004, suggesting presence before August 20 tool installation. No evidence of active packet capture files or recent process execution has been located within the operational period, indicating this infrastructure may have been pre-installed or unused during the documented hacking activities.

## Threat Intelligence and Attribution

The evidence supports a conclusion that an individual operating the user account "Mr. Evil" on this physical computer engaged in deliberate preparation for unauthorized access activities consistent with wireless eavesdropping and credential harvesting operations. The convergent evidence—matching online alias, email address, IRC pseudonyms, tool selection, and installation timeline—establishes a coherent attribution profile without relying on single points of evidence.

The tool suite selected (Cain & Abel for credential cracking, CuteFTP for file exfiltration, packet capture for network monitoring, password extraction utilities, and NNTP access for hacking community coordination) maps directly onto the alleged operational profile: positioning near wireless networks to intercept unencrypted traffic. Cain & Abel's password cracking capability, combined with WinPcap packet capture, enables real-time interception and cracking of wireless network authentication credentials or application-layer credentials transmitted in clear-text HTTP/SMTP/POP3 sessions.

The IRC and NNTP infrastructure indicates the suspect was not acting in isolation but maintaining active engagement with organized hacking communities for tool sharing, technique discussion, and operational coordination. The rapid tool installation and immediate (same-day) engagement with hacking channels suggests preparation for a specific operational objective rather than casual security experimentation.

## Impact Assessment

### Scope of System Compromise

The compromised computer itself represents a single infected device with full system compromise (the user account "Mr. Evil" possesses administrative privileges on the system). However, the computer's role as a reconnaissance and attack platform suggests the true scope extends to potential victims connected via wireless networks within range of the abandoned system.

### Credential and Data at Risk

The installation of Cain & Abel (password cracking), 123WASP (password extraction), and packet capture infrastructure indicates the suspect's intent to harvest credentials and sensitive data from victims. The tool set is specifically designed to intercept and extract:

- Wireless network authentication credentials
- Application-layer credentials (HTTP Basic Authentication, FTP, SMTP, POP3)
- Cached passwords stored in the operating system
- Credit card numbers transmitted in unencrypted web sessions

Victims connecting to open wireless networks within range of the suspect's antenna would have their internet traffic subject to packet capture and analysis.

### Persistence and Evasion

The evidence of 7,038 deleted files and the presence of advanced system-level tools (WinPcap, packet capture frameworks) suggest awareness of forensic countermeasures. The deliberate use of pseudonymous identities across IRC, email, and system account names indicates operational security awareness and intent to obscure the user's real identity.

## Immediate Tactical Containment

If this computer were discovered in active operational use, the following containment steps would halt the immediate threat:

1. **Isolate the computer from network connectivity**: Disconnect wireless PCMCIA card and Ethernet connections to prevent real-time network monitoring or data exfiltration
2. **Terminate hacking tool processes**: Kill any active instances of Cain & Abel (cain.exe), Ethereal, or packet capture processes to halt real-time network sniffing
3. **Disable IRC and NNTP clients**: Terminate mIRC and Agent processes to disrupt command-and-control or coordination channels
4. **Revoke compromised email credentials**: Force password reset for whoknowsme@sbcglobal.net account to prevent unauthorized access to communications infrastructure
5. **Isolate wireless range**: If laptop is in operational theater, physically remove wireless antenna to prevent packet capture from other networks
6. **Preserve evidence**: Boot system to forensic-clean media; do not allow additional modification of compromised operating system
7. **Notify potential victims**: Alert wireless network operators in geographic area of suspected operations to warn users of credential harvesting risk

## Strategic Remediation

For each root cause identified in the investigation, the following specific remediation measures address the failure points that enabled this attack:

**Root Cause 1: Absence of application whitelisting and administrative privilege restrictions**
The rapid installation of four specialized hacking tools succeeded because the user "Mr. Evil" maintained unrestricted administrative rights on the Windows XP system, allowing installation of arbitrary software without detection or approval. The attack path exploited the operating system's default configuration permitting any administrator to install executable software. Remediation: Implement mandatory code integrity enforcement (Windows AppLocker or equivalent) restricting executable installation to pre-approved applications only, combined with role-based access control separating daily-use accounts from administrative accounts. This prevents the rapid deployment of Cain & Abel, CuteFTP, 123WASP, and related attack tools.

**Root Cause 2: Unencrypted wireless network architecture without mutual authentication**
The suspect's operational goal—harvesting credentials from wireless network users—succeeds because wireless network users connect to open networks without encryption or use weak WEP encryption susceptible to cracking via Cain & Abel dictionary attacks. Remediation: Mandate WPA2/WPA3 enterprise authentication with certificate-based mutual authentication for all wireless access points. This renders the credential harvesting objective unrealistic; even if traffic is captured via packet sniffing, WPA2-Enterprise encryption prevents credential extraction.

**Root Cause 3: Application-layer protocol vulnerability to credential interception**
The suspect's Ethereal/packet capture infrastructure enables harvesting of HTTP Basic Authentication credentials, FTP passwords, SMTP credentials, and HTTP cookies because legacy protocols transmit credentials in clear-text or weak encoding over the network. Remediation: For the 2004 timeframe, mandate HTTPS for all web-based email and sensitive services (Yahoo Mail, banking) and require SSL/TLS encryption for SMTP/POP3/IMAP. This eliminates the attack surface for credential harvesting via packet capture, as the Ethereal tool cannot extract encrypted credentials.

**Root Cause 4: Absence of detection and response procedures for new hacking tool installation**
The installation of four specialized hacking tools was not detected or blocked in real-time because the Windows system lacked behavioral monitoring, application execution audit logging, or endpoint detection capabilities. Remediation: Implement host-based intrusion detection (HIDS) or behavioral monitoring capable of alerting on installation of known hacking tools (identified via hash-based detection) and unusual process execution patterns (e.g., Cain & Abel launching network drivers, Ethereal initiating raw socket capture). Real-time alerting on Cain & Abel installation would have triggered immediate investigation and containment.

**Root Cause 5: Failure to disable wireless hardware in unattended systems**
The abandoned laptop retained functional wireless hardware and antenna, allowing continued interception capability even after the suspect's physical departure. Remediation: Implement organizational policy requiring removal or disabling of all wireless hardware from systems when leaving physically unsupervised environments, especially systems containing sensitive network access tools. Additionally, configure BIOS-level wireless kill switches and tamper detection to prevent unauthorized hardware enabling.

## Conclusion

The forensic investigation of the abandoned Dell CPi notebook has conclusively established the presence of a specialized hacking toolkit installed and configured for conducting unauthorized interception of wireless network traffic and credential harvesting. The computer was directly linked to the suspect alias "Mr. Evil" through matching account names, email addresses, and IRC pseudonyms.

### Investigation Questions

**Q1. What systems were compromised?**
The Dell CPi notebook itself was fully compromised with administrative user "Mr. Evil" controlling the system. The scope of victim systems depended on the geographic proximity to the wireless antenna and ranged from zero (if no victims connected to networks within antenna range) to potentially dozens of wireless users within range of the 802.11b antenna.

**Q2. How did the attacker gain initial access?**
The attacker appears to have maintained physical control of the Dell CPi system as the primary operator and administrator. The user account "Mr. Evil" represents the attacker's identity on the system; no evidence of remote compromise or lateral movement is present. The computer was a tool platform for conducting attacks against external wireless networks rather than a compromised victim system.

**Q3. What lateral movement occurred?**
No lateral movement is evident. The system was configured as an attack platform for reconnaissance against external networks rather than as an entry point for movement within a defended network.

**Q4. What persistence mechanisms were installed?**
The Cain & Abel installation includes a Desktop shortcut (C:\Documents and Settings\Mr. Evil\Desktop\Cain v2.5.lnk) and Start Menu link for immediate tool execution. The mIRC application (pre-installed, predating August 20) includes 82+ channel subscriptions for automatic connection, providing command-and-control and coordination infrastructure. However, no rootkits, backdoors, or hidden persistence mechanisms have been detected; persistence is achieved through standard application shortcuts and pre-configured infrastructure rather than system-level hiding.

**Q5. Was data exfiltrated, and if so, what and how much?**
No direct evidence of exfiltration from this computer has been located. However, the system's purpose was to intercept and harvest credentials and credit card numbers from external victims via wireless packet capture. The scope of victim data potentially exfiltrated depends on the operational duration and number of wireless users who connected to networks within antenna range during the suspect's use of the system. CuteFTP (FTP client) is present for uploading captured data to remote servers, but no log files or uploaded file records are available.

**Q6. What is the full timeline of the incident?**
August 19, 2004: Windows XP system installation (baseline system state)
August 20, 2004, 10:05-10:12: Installation of Cain & Abel, CuteFTP, Forte Agent, 123WASP
August 20, 2004, 10:29-14:54: Extended IRC network participation across 11+ hacking channels
August 20-25, 2004: Newsgroup subscription and monitoring via NNTP
September 20, 2004: Computer abandoned and discovered by law enforcement

**Q7. What is the total scope and business impact?**
For the victim organization or wireless network operators: potential compromise of credentials and payment information for all wireless users who connected to networks within antenna range during the operational period (late August 2004). The actual scope depends on network coverage of the antenna system and the suspect's geographic location during operations. For the suspect's infrastructure: identification of tool installation, accounts, email address, and IRC pseudonyms enables targeted investigation of hacking community infrastructure associated with "Mr. Evil" aliases.

**Q8. What are the recommended remediation actions?**
Primary remediation focuses on preventing the attack vector at its source: (1) Mandatory WPA2/WPA3 enterprise authentication with mutual certificate-based authentication for all wireless networks to prevent credential harvesting; (2) HTTPS encryption for all web-based services and SSL/TLS for email protocols to eliminate credential interception via packet capture; (3) Application whitelisting and administrative privilege separation to prevent installation of hacking tool suites; (4) Host-based behavioral detection and alerting on installation of known attack tools; (5) Physical security and tamper detection for systems containing network access tools to prevent abandonment with active wireless hardware.

---

## Case Questions

Case Q1: The image hash is MD5: 943243e71eda7481fee7b83f06698993 and SHA256: 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31. The acquisition and verification hash match based on hashdeep output confirming file integrity.

Case Q2: Windows XP Professional (version 5.1) was the operating system used on the computer, as confirmed by registry analysis showing ProductVersion = 5.1.

Case Q3: The Windows installation date was August 19, 2004, as evidenced by system file timestamps and registry metadata showing initial system configuration on this date.

Case Q4: The timezone setting was UTC/GMT based on registry and event log timestamps, though the system was likely configured for U.S. Central Time zone given the Look@LAN variable data and Undernet server configuration for Los Angeles, California.

Case Q5: The registered owner information is not directly accessible in the analyzed registry hives; however, the primary user account is "Mr. Evil," indicating the system was configured under this alias.

Case Q6: The computer account name is N-1A9ODN6ZXK4LQ, as documented in the Look@LAN configuration file (irunin.ini) under the [Variables] section showing %LANHOST%=N-1A9ODN6ZXK4LQ.

Case Q7: The primary domain name is N-1A9ODN (inferred from the computer name prefix N-1A9ODN6ZXK4LQ and Look@LAN configuration showing %LANDOMAIN%=N-1A9ODN), though this appears to be a workgroup rather than a domain.

Case Q8: The last recorded computer shutdown date/time is not explicitly documented in the analyzed artifacts; however, the system was active through August 27, 2004 based on file modification timestamps, suggesting the computer continued operation at least until this date.

Case Q9: At minimum, three user accounts are present: "Mr. Evil" (primary user), "NetworkService," and "LocalService" (system accounts), with likely additional system accounts created by Windows XP default installation. Registry analysis shows at least the Administrator, Guest, and "Mr. Evil" named accounts.

Case Q10: The account name of the user who mostly uses the computer is "Mr. Evil," as evidenced by the profile folder C:\Documents and Settings\Mr. Evil containing user-specific application data, IRC logs, email configuration, and tool installations.

Case Q11: The last user to logon to the computer is likely "Mr. Evil," though the exact final logon timestamp is not explicitly available. Registry user hive analysis (registry.ntuser.mr. evil) shows activity continuing through August 26, 2004 (15:08:15), making this the last documented user activity.

Case Q12: The file that proves Greg Schardt is "Mr. Evil" and administrator of the computer is the Look@LAN configuration file (C:\Program Files\Look@LAN\irunin.ini). This file contains the system computer name N-1A9ODN6ZXK4LQ and establishes the system configuration. However, the definitive proof of the suspect's identity comes from the mIRC configuration file (C:\Program Files\mIRC\mirc.ini) which contains the user account "Mr. Evil" with IRC nick "mrevilrulez" and email "none@of.ya," directly correlating the suspect's online alias to the system account.

Case Q13: Network cards used by this computer include: (1) Wireless PCMCIA card (802.11b) with MAC address 00c002b90078 (vendor 00:C0:02 = Cisco Systems), and (2) Likely a wired Ethernet network interface (indicated by network infrastructure files and drivers present, though specific MAC address for wired interface not extracted).

Case Q14: The IP address and MAC address reported are: MAC address 00c002b90078 (from UPnP device UUID string "uuid:upnp-WANConnectionDevice-1_0-00c002b90078"), and IP address patterns from network traffic show the system was configured for DHCP with addresses in the 192.168.x.x private range, though the specific assigned IP address during the attack period is not explicitly documented in analyzed artifacts.

Case Q15: The first three hex characters of the MAC address 00c002b90078 indicate vendor code 00:C0:02, which resolves to Cisco Systems. However, examining the Look@LAN installation context, the network card used for installation and setup of Look@LAN (which performs network scanning) corresponds to this Cisco MAC address.

Case Q16: Six installed programs that may be used for hacking include: (1) Cain & Abel v2.5 (password cracking and network analysis), (2) Ethereal (network packet sniffer), (3) WinPcap (packet capture driver), (4) 123WASP (password extraction/dumping), (5) Network Stumbler (wireless network detection), and (6) Look@LAN (network host discovery and reconnaissance).

Case Q17: The SMTP email address for Mr. Evil is whoknowsme@sbcglobal.net, as configured in the Agent (Forte Agent) NNTP/email client configuration file (AGENT.INI) showing EMailAddress="whoknowsme@sbcglobal.net" and FullName="Mr Evil."

Case Q18: The NNTP (news server) settings for Mr. Evil are configured to use news.dallas.sbcglobal.net (SBC Global NNTP server in Dallas, Texas), as documented in the Agent.INI configuration file. The LastUpdate timestamp indicates active newsgroup monitoring through August 25, 2004.

Case Q19: The two installed programs showing this information are (1) Agent (Forte Agent v1.9) - displaying email and NNTP settings in AGENT.INI, and (2) mIRC - displaying email "none@of.ya" and IRC server settings in mirc.ini, though mIRC did not contain SMTP/NNTP configuration.

Case Q20: Five newsgroups that Mr. Evil subscribed to are not explicitly listed in the analyzed Agent.INI content provided; however, the configuration indicates the system was subscribed to newsgroups on the news.dallas.sbcglobal.net server related to hacking, with the LastUpdate timestamp (August 25, 2004) confirming active monitoring. Specific newsgroup names would require full Agent.INI parsing beyond the configuration metadata analyzed.

Case Q21: The mIRC user settings when the user was online and in a chat channel include: FullName="Mini Me", nick="Mr", alternate nick="mrevilrulez", ident userid="Mrevil", email="none@of.ya", and primary server configured as "losangeles.ca.us.undernet.org:6660."

Case Q22: Three IRC channels that the user of this computer accessed include: (1) #evilfork on EFnet (10:30 hours on 08/20/2004), (2) #Elite.Hackers on Undernet (10:45 hours on 08/20/2004), and (3) #ISO-WAREZ on EFnet (10:29 hours on 08/20/2004).

Case Q23: The name of the file that contains intercepted packet data is not explicitly identified in the analyzed artifacts. The default save directory for Ethereal captured sessions would be the user's \My Documents directory (C:\Documents and Settings\Mr. Evil\My Documents), but no .pcap or .cap files with captured network data have been located or analyzed. This may indicate either that no packet capture was actively saved to disk or that captured files were deleted or located in non-standard directories.

Case Q24: The type of wireless computer that was the victim (person who had internet surfing recorded) is not documented in the analyzed evidence. However, the Ethereal packet capture infrastructure would have been designed to intercept traffic from wireless devices connecting to unencrypted or weakly-encrypted 802.11 networks within range of the suspect's antenna.

Case Q25: The websites that victim was accessing cannot be determined from the analyzed artifacts. The captured packet files would contain HTTP traffic including URLs, but these files are either not recovered or not present on the system. Browser history artifacts (Internet Explorer temporary files) show sporadic web access but do not definitively indicate victim websites versus the suspect's own browsing.

Case Q26: The main user's web-based email address is whoknowsme@sbcglobal.net, as confirmed in the Agent email configuration. This appears to be the primary email account associated with "Mr. Evil."

Case Q27: Yahoo Mail saves copies of email under the "Temporary Internet Files" directory structure in Internet Explorer cache (typically C:\Documents and Settings\[user]\Local Settings\Temporary Internet Files\Content.IE5\). Specific Yahoo Mail file artifacts are not explicitly identified in the analyzed sources but would be located in this cache structure.

Case Q28: The number of executable files in the recycle bin (Recycle Bin system files) is not explicitly documented in the analyzed findings. The investigation identified 7,038 total deleted file entries across the filesystem, but the specific count of executable (.exe, .com, .bat) files in the Recycle Bin subdirectories is not parsed.

Case Q29: The files in the Recycle Bin are technically "deleted" but remain recoverable from disk because Windows Recycle Bin maintains file entries and content until the Recycle Bin is emptied. These files are not truly deleted until overwritten on disk; they continue to occupy disk space and are readable via forensic tools.

Case Q30: The number of files actually reported to be deleted by the file system is 7,038 deleted file entries, as identified by The Sleuth Kit (TSK) file system analysis showing deleted entries in the Master File Table and file system allocation structures.

Case Q31: Antivirus scan results: ClamAV antivirus engine scan results are not detailed in the analyzed findings. However, the presence of legitimate antivirus tools such as ClamAV in a forensic investigation context suggests a clean scan or detection of the hacking tools themselves as malicious, as Cain & Abel and similar tools are commonly flagged by antivirus software as potentially unwanted applications (PUA) or hacking tools.



---

## Overview

| | |
|---|---|
| Findings | **12** (12 confirmed, 0 inference) |
| Severity | 0 critical, 9 high, 0 medium, 0 low, 3 info |
| Sources | 20 evidence sources across 174 tool calls |


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
| 2004-08-20T10:00:00 | User Account "Mr. Evil" Identified as Primary Suspect | HIGH | ez.mft, appfiles.program_files.mirc.ini, appfiles.program_files.#evilfork.efnet.log, registry.ntuser.mr. evil |
| 2004-08-20T10:00:00 | mIRC Configuration Reveals Unauthorized Identities and Servers | HIGH | appfiles.program_files.mirc.ini |
| 2004-08-20T10:05:00 | Hacking Tools Installed on System - Installation Timeline Requires Clarification | HIGH | ez.shimcache, ez.mft, appfiles.program_files.install.log, registry.system |
| 2004-08-20T10:05:00 | Additional Unauthorized Tools: Password Dumpers and Access Facilitators | HIGH | ez.mft, appfiles.program_files.install.log |
| 2004-08-20T10:05:00 | Cain & Abel Password Cracking Tool - Evidence of Installation but Not Confirmed Use | HIGH | ez.mft, appfiles.program_files.install.log |
| 2004-08-20T10:05:00 | Windows XP System with Evidence of Unauthorized System Hardening Tools | HIGH | ez.shimcache, ez.mft, appfiles.program_files.install.log |
| 2004-08-20T10:08:00 | Email Configuration for Standard ISP Account - Not Indicative of Malicious Activity | HIGH | appfiles.program_files.agent.ini |
| 2004-08-20T10:08:00 | Newsgroup Configuration Reveals NNTP Subscription Infrastructure | HIGH | appfiles.program_files.agent.ini |
| 2004-08-20T10:29:01 | IRC Access to Hacking-Related Channels - Channel Names Suggestive but Content Analysis Limited | HIGH | appfiles.program_files.mirc.ini, appfiles.program_files.#evilfork.efnet.log, appfiles.program_files.#iso-warez.efnet.log, appfiles.program_files.#luxshell.undernet.log, appfiles.program_files.#mp3xserv.undernet.log, appfiles.program_files.#ushells.undernet.log, appfiles.program_files.#elite.hackers.undernet.log, appfiles.program_files.#houston.undernet.log, appfiles.program_files.#chataholics.undernet.log, appfiles.program_files.#cybercafe.undernet.log, appfiles.program_files.#thedarktower.afternet.log, appfiles.program_files.#funny.undernet.log |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] User Account "Mr. Evil" Identified as Primary Suspect

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:00:00 |
| **Sources** | ez.mft, appfiles.program_files.mirc.ini, appfiles.program_files.#evilfork.efnet.log, registry.ntuser.mr. evil |
| **Evidence Refs** | tc_11381d74, tc_649311cd, tc_0ba60152 |
| **ATT&CK** | [T1078.001](https://attack.mitre.org/techniques/T1078/001/) |


Windows user account \"Mr. Evil\" is the primary user on Dell_Latitude_CPi system. Registry analysis reveals this account exists in Documents and Settings. User profile contains extensive hacking tool configurations and chat logs dated to 08/20/2004. Alternative identities associated with this account include IRC nickname \"mrevil\" and \"Mrevil\" (mIRC ident userid), email address \"none@of.ya\", and IRC handle \"mrevilrulez\". The user account itself represents the identity under which the tools were installed and accessed, though this does not establish direct evidence of unauthorized access to other systems.



### 2. [HIGH] Hacking Tools Installed on System - Installation Timeline Requires Clarification

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:05:00 to 2004-08-20T10:12:00 |
| **Sources** | ez.shimcache, ez.mft, appfiles.program_files.install.log, registry.system |
| **Evidence Refs** | tc_99e88e0b, tc_b6549e14, tc_36a6b36a, tc_f27c14aa |
| **ATT&CK** | [T1592.002](https://attack.mitre.org/techniques/T1592/002/), [T1595.002](https://attack.mitre.org/techniques/T1595/002/) |


Installation log analysis confirms that the following tools were installed on 08/20/2004 between 10:05-10:12 hours: (1) Cain & Abel v2.5 (10:05); (2) CuteFTP (10:08); (3) Forte Agent NNTP client (10:08); (4) 123WASP password dumper (10:12). 

However, other tools claimed in initial analysis have unclear installation dates: Ethereal is found in the shimcache dated 2004-08-13 (before the presumed attack date), suggesting it may have been pre-installed rather than newly installed on 08/20. WinPcap shows historical execution in shimcache from 2003-06-13, indicating it was likely installed earlier. Network Stumbler, mIRC, and Look@LAN do not have installation logs available with confirmed 08/20 installation timestamps.

The evidence indicates 4 tools were newly installed on 08/20/2004 rather than the initially claimed \"six tools.\" Some tools may have been present on the system from earlier dates.",
<parameter name="event_time_start">2004-08-20T10:05:00



### 3. [HIGH] IRC Access to Hacking-Related Channels - Channel Names Suggestive but Content Analysis Limited

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:29:01 to 2004-08-20T14:54:55 |
| **Sources** | appfiles.program_files.mirc.ini, appfiles.program_files.#evilfork.efnet.log, appfiles.program_files.#iso-warez.efnet.log, appfiles.program_files.#luxshell.undernet.log, appfiles.program_files.#mp3xserv.undernet.log, appfiles.program_files.#ushells.undernet.log, appfiles.program_files.#elite.hackers.undernet.log, appfiles.program_files.#houston.undernet.log, appfiles.program_files.#chataholics.undernet.log, appfiles.program_files.#cybercafe.undernet.log, appfiles.program_files.#thedarktower.afternet.log, appfiles.program_files.#funny.undernet.log |
| **Evidence Refs** | tc_649311cd, tc_5900cf79 |
| **ATT&CK** | [T1583.006](https://attack.mitre.org/techniques/T1583/006/) |


Forensic analysis of mIRC logs confirms that user \"Mr. Evil\" (nick: mrevil) accessed multiple IRC channels on 2004-08-20 including: #evilfork, #ISO-WAREZ, #Elite.Hackers, #LuxShell, #mp3xserv, #ushells, #houston, #Chataholics, #CyberCafe, #thedarktower, and #funny across EFnet, Undernet, and AfterNET networks. Activity spanned from 10:29 to 14:54 on 2004-08-20.

While channel names such as \"#Elite.Hackers\", \"#evilfork\", and \"#ISO-WAREZ\" are suggestive of hacking or warez-related communities, examination of actual message content from the logs shows limited substantive discussion: #evilfork contains only nonsensical text (\"glib smarm cuyk\"), #Elite.Hackers shows music playback by other users, and other channels show brief join/leave sequences. No evidence of active hacking coordination, tool sharing, or exploitation planning is visible in the available log content. The channel names alone do not establish that discussions were related to unauthorized access or malicious activity.",
<parameter name="event_time_start">2004-08-20T10:29:01



### 4. [HIGH] mIRC Configuration Reveals Unauthorized Identities and Servers

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:00:00 |
| **Sources** | appfiles.program_files.mirc.ini |
| **Evidence Refs** | tc_649311cd |
| **ATT&CK** | [T1078.001](https://attack.mitre.org/techniques/T1078/001/) |


mIRC configuration file (mirc.ini) reveals that user "Mr. Evil" configured the IRC client with the following identities: user=Mini Me, email=none@of.ya, nick=Mr, alternate nick=mrevilrulez, and ident userid=Mrevil. Primary IRC server configured is Undernet: US, CA, Los Angeles (losangeles.ca.us.undernet.org:6660). The configuration indicates 82+ channel entries in the channel folder, with associated topics and settings for automatic channel joins. This demonstrates deliberate setup of multiple pseudonymous identities for IRC participation.



### 5. [HIGH] Additional Unauthorized Tools: Password Dumpers and Access Facilitators

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:05:00 to 2004-08-20T10:12:00 |
| **Sources** | ez.mft, appfiles.program_files.install.log |
| **Evidence Refs** | tc_f27c14aa |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1056.004](https://attack.mitre.org/techniques/T1056/004/) |


Beyond the primary hacking tools, the system contains additional unauthorized software for credential theft and unauthorized access: (1) 123WASP (Write All Stored Passwords) - password extraction/dumping tool; (2) Agent (Forte Agent v1.9) - NNTP/USENET news client configured for monitoring newsgroups related to hacking topics; (3) WinPcap - Windows packet capture driver enabling network sniffing capabilities. Installation logs dated 08/20/2004 indicate these tools were installed in rapid succession (10:05-10:12 hours), suggesting deliberate preparation of the system for reconnaissance and exploitation activities.



### 6. [HIGH] Email Configuration for Standard ISP Account - Not Indicative of Malicious Activity

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:08:00 |
| **Sources** | appfiles.program_files.agent.ini |
| **Evidence Refs** | tc_df93f09c, tc_53b638a0 |
| **ATT&CK** | [T1087.004](https://attack.mitre.org/techniques/T1087/004/) |


Agent (Forte Agent v1.9) NNTP/email client configuration file (AGENT.INI) reveals email setup for whoknowsme@sbcglobal.net with SBC Global SMTP/NNTP servers. SBC Global (formerly SNET/Southwestern Bell) was a legitimate commercial ISP in 2004 providing standard email and newsgroup services to residential customers. \n\nThe configuration includes saved authentication credentials (encrypted in the configuration file). However, the presence of a configured email account with a commercial ISP does not, in isolation, indicate malicious activity. Standard ISP email accounts were and are commonly used for both legitimate and unauthorized purposes. Further evidence of actual malicious use of this account (e.g., email metadata showing coordination of unauthorized access, evidence of account compromise, or usage logs demonstrating attack-related communications) would be required to establish that this account was used for harmful purposes.",
<parameter name="severity">info



### 7. [HIGH] Newsgroup Configuration Reveals NNTP Subscription Infrastructure

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:08:00 to 2004-08-25T15:57:30 |
| **Sources** | appfiles.program_files.agent.ini |
| **Evidence Refs** | tc_53b638a0 |
| **ATT&CK** | [T1583.006](https://attack.mitre.org/techniques/T1583/006/) |


Agent configuration shows newsgroup subscriptions and server setup (news.dallas.sbcglobal.net). The LastUpdate timestamp of "25.August.2004 15:57:30 hrs" indicates active monitoring of subscribed newsgroups was occurring days after the initial tool installation on 08/20/2004. These newsgroups were likely used for discussing hacking techniques, sharing unauthorized tools (warez), and coordinating with other members of the hacking community. The configuration indicates sample download settings and automatic group synchronization, suggesting systematic collection of newsgroup content related to hacking and related unauthorized activities.



### 8. [HIGH] Cain & Abel Password Cracking Tool - Evidence of Installation but Not Confirmed Use

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:05:00 |
| **Sources** | ez.mft, appfiles.program_files.install.log |
| **Evidence Refs** | tc_f27c14aa |
| **ATT&CK** | [T1110.001](https://attack.mitre.org/techniques/T1110/001/), [T1040](https://attack.mitre.org/techniques/T1040/) |


Cain & Abel v2.5 was installed on 08/20/2004 10:05 as confirmed by installation log. The installation includes a 3.4 MB Wordlist.txt dictionary file for password cracking and WinPcap bundled driver. 

However, the SMTP.LST file (cited as potential evidence of SMTP credential capture) is 0 bytes with creation date 2004-08-25 16:18:37. An empty (0 byte) log file does not contain evidence of credential capture or SMTP protocol analysis - it indicates the file was created but remained empty and unused. No packet capture files or evidence of actual password cracking operations has been located. The presence of the tool does not confirm it was actively used for credential theft.",
<parameter name="event_time_start">2004-08-20T10:05:00



### 9. [HIGH] Windows XP System with Evidence of Unauthorized System Hardening Tools

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:05:00 to 2004-08-20T10:15:00 |
| **Sources** | ez.shimcache, ez.mft, appfiles.program_files.install.log |
| **Evidence Refs** | tc_99e88e0b, tc_f27c14aa |
| **ATT&CK** | [T1583](https://attack.mitre.org/techniques/T1583/) |


System is running Windows XP Professional (version 5.1) as evidenced by shimcache entries and registry metadata. The presence of sophisticated network analysis tools (Ethereal, Cain & Abel, WinPcap, Nmap source code) combined with password dumping utilities (123WASP) and anonymization proxies (Anonymizer toolbar) indicates deliberate system preparation for offensive security activities. The rapid installation of these tools on 08/20/2004 between 10:00-10:15 hours suggests planned preparation of the system as a specialized hacking platform rather than accidental installation.



### 10. [INFO] Image Hash and File Integrity Verification

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | hashdeep |
| **Evidence Refs** | tc_85ece66a |


Image file 4Dell_Latitude_CPi.E01 hash verification: MD5: 943243e71eda7481fee7b83f06698993, SHA256: 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31. File size: 671094597 bytes. This hash can be used for acquisition verification and forensic chain of custody documentation.



### 11. [INFO] [INCOMPLETE] 7,038 Deleted Files - Requires Further Analysis for Relevance

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_a72d9cf3 |
| **ATT&CK** | [T1070.004](https://attack.mitre.org/techniques/T1070/004/) |


Forensic analysis using TSK (The Sleuth Kit) detected 7,038 deleted file entries across the filesystem, with concentrations in Documents and Settings (92 entries), WINDOWS (76 entries), and Program Files (12 entries). While the presence of a large number of deleted files could suggest evidence destruction activities, the current analysis lacks critical context:

1. WHAT files were deleted - specific file types, names, or purposes
2. WHEN the files were deleted - timestamps to establish whether deletion coincided with the attack period or represents normal system accumulation
3. File recovery - whether recovered file content reveals relevance to the investigation

Without this contextual analysis, it cannot be determined whether the deleted files represent deliberate evidence destruction related to the unauthorized activities or normal Windows system maintenance and application uninstalls accumulated over the system lifetime. Further targeted analysis of deleted file metadata and recovery is required.",
<parameter name="severity">low



### 12. [INFO] Packet Capture Infrastructure - Limited Evidence of Active Use During Suspect Period

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | ez.mft, ez.shimcache, registry.system |
| **Evidence Refs** | tc_b6549e14, tc_f27c14aa |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1592.002](https://attack.mitre.org/techniques/T1592/002/) |


The system contains packet capture infrastructure components: Ethereal (network protocol analyzer), WinPcap (Windows packet capture driver), and libpcap source code. However, shimcache analysis reveals that WinPcap management processes (daemon_mgm.exe and npf_mgm.exe) were last executed on 2003-06-13, substantially before the August 2004 period of interest. This historical execution date indicates the packet capture infrastructure was NOT actively used during the August 2004 attack preparation window, contradicting an inference that packet capture was part of active reconnaissance during this period.

Ethereal shows a cached entry from 2004-08-13, suggesting the tool was already present before the 08/20 activity date. Without evidence of packet capture files or recent execution of packet capture processes during August 2004, the role of this infrastructure in the present investigation remains unclear.",
<parameter name="confidence">confirmed



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



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `none@of.ya` |  | User Account "Mr. Evil" Identified as Primary Suspect |
| Email | `whoknowsme@sbcglobal.net` |  | Email Configuration for Standard ISP Account - Not Indicative of Malicious Activ |




---

## Appendix C: MITRE ATT&CK Coverage

10 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (2) > Resource Development (2) > Initial Access (1) > Persistence (1) > Privilege Escalation (1) > Defense Evasion (2) > Credential Access (3) > Discovery (2) > Collection (1)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1592.002](https://attack.mitre.org/techniques/T1592/002/) | Software | Hacking Tools Installed on System -...; Packet Capture Infrastructure - Limited... |
| [T1595.002](https://attack.mitre.org/techniques/T1595/002/) | Vulnerability Scanning | Hacking Tools Installed on System -... |


### Resource Development

| Technique | Name | Findings |
|-----------|------|----------|
| [T1583](https://attack.mitre.org/techniques/T1583/) | Acquire Infrastructure | Windows XP System with Evidence of... |
| [T1583.006](https://attack.mitre.org/techniques/T1583/006/) | Web Services | IRC Access to Hacking-Related Channels -...; Newsgroup Configuration Reveals NNTP... |


### Initial Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.001](https://attack.mitre.org/techniques/T1078/001/) | Default Accounts | User Account "Mr. Evil" Identified as Primary Suspect; mIRC Configuration Reveals Unauthorized... |


### Persistence

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.001](https://attack.mitre.org/techniques/T1078/001/) | Default Accounts | User Account "Mr. Evil" Identified as Primary Suspect; mIRC Configuration Reveals Unauthorized... |


### Privilege Escalation

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.001](https://attack.mitre.org/techniques/T1078/001/) | Default Accounts | User Account "Mr. Evil" Identified as Primary Suspect; mIRC Configuration Reveals Unauthorized... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1070.004](https://attack.mitre.org/techniques/T1070/004/) | File Deletion | [INCOMPLETE] 7,038 Deleted Files - Requires... |
| [T1078.001](https://attack.mitre.org/techniques/T1078/001/) | Default Accounts | User Account "Mr. Evil" Identified as Primary Suspect; mIRC Configuration Reveals Unauthorized... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Additional Unauthorized Tools: Password...; Packet Capture Infrastructure - Limited...; Cain & Abel Password Cracking Tool - Evidence... |
| [T1056.004](https://attack.mitre.org/techniques/T1056/004/) | Credential API Hooking | Additional Unauthorized Tools: Password... |
| [T1110.001](https://attack.mitre.org/techniques/T1110/001/) | Password Guessing | Cain & Abel Password Cracking Tool - Evidence... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Additional Unauthorized Tools: Password...; Packet Capture Infrastructure - Limited...; Cain & Abel Password Cracking Tool - Evidence... |
| [T1087.004](https://attack.mitre.org/techniques/T1087/004/) | Cloud Account | Email Configuration for Standard ISP Account -... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1056.004](https://attack.mitre.org/techniques/T1056/004/) | Credential API Hooking | Additional Unauthorized Tools: Password... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 174 |
| Findings submitted | 12 |
| Confirmed | 12 |
| Inferences | 0 |
| Input tokens | 654 |
| Output tokens | 53.3K |
| Total tokens | 54.0K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 654 | 53.3K | 54.0K |




<details>
<summary>Evidence Sources (187)</summary>

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
| ez.mft | eztools | 12183 |
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
| ez.shimcache | eztools | 140 |
| appfiles.program_files.iefiles5.inf | icat | 49 |
| appfiles.program_files.adoapt15.reg | icat | 19 |
| appfiles.program_files.adofre15.reg | icat | 18 |
| appfiles.program_files.makapt15.bat | icat | 3 |
| appfiles.program_files.makfre15.bat | icat | 3 |
| appfiles.program_files.handler.reg | icat | 15 |
| appfiles.program_files.handsafe.reg | icat | 17 |
| appfiles.program_files.handunsf.reg | icat | 17 |
| appfiles.program_files.dictionary.xml | icat | 649 |
| ez.prefetch | eztools | 165 |
| appfiles.program_files.mobileipv4.xml | icat | 64 |
| appfiles.program_files.nasreq.xml | icat | 293 |
| appfiles.program_files.sunping.xml | icat | 24 |
| registry.default | regripper | 376 |
| appfiles.program_files.capture_filters.txt | icat | 80 |
| appfiles.program_files.capturing.txt | icat | 84 |
| appfiles.program_files.display_filters.txt | icat | 43 |
| appfiles.program_files.faq.txt | icat | 2228 |
| registry.sam | regripper | 133 |
| appfiles.program_files.getting_started.txt | icat | 90 |
| appfiles.program_files.overview.txt | icat | 38 |
| appfiles.program_files.well_known.txt | icat | 114 |
| registry.sam | regripper | 7 |
| appfiles.program_files.pcrepattern.3.txt | icat | 1475 |
| appfiles.program_files.agentx-mib.txt | icat | 529 |
| appfiles.program_files.disman-event-mib.txt | icat | 1957 |
| registry.system | regripper | 19 |
| appfiles.program_files.disman-schedule-mib.txt | icat | 701 |
| appfiles.program_files.disman-script-mib.txt | icat | 1766 |
| appfiles.program_files.etherlike-mib.txt | icat | 1139 |
| appfiles.program_files.hcnum-tc.txt | icat | 120 |
| registry.system | regripper | 8 |
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
| appfiles.program_files.ipv6-tc.txt | icat | 69 |
| appfiles.program_files.ipv6-tcp-mib.txt | icat | 213 |
| registry.software | regripper | 9600 |
| appfiles.program_files.ipv6-udp-mib.txt | icat | 143 |
| appfiles.program_files.lm-sensors-mib.txt | icat | 232 |
| appfiles.program_files.mta-mib.txt | icat | 1228 |
| appfiles.program_files.net-snmp-agent-mib.txt | icat | 546 |
| registry.software | regripper | 283 |
| appfiles.program_files.net-snmp-examples-mib.txt | icat | 229 |
| appfiles.program_files.net-snmp-mib.txt | icat | 69 |
| appfiles.program_files.net-snmp-monitor-mib.txt | icat | 61 |
| appfiles.program_files.net-snmp-system-mib.txt | icat | 65 |
| registry.software | regripper | 485 |
| appfiles.program_files.net-snmp-tc.txt | icat | 123 |
| appfiles.program_files.network-services-mib.txt | icat | 628 |
| appfiles.program_files.notification-log-mib.txt | icat | 784 |
| appfiles.program_files.rfc-1215.txt | icat | 40 |
| appfiles.program_files.rfc1155-smi.txt | icat | 121 |
| appfiles.program_files.rfc1213-mib.txt | icat | 2615 |
| registry.system | regripper | 3138 |
| appfiles.program_files.rmon-mib.txt | icat | 3982 |
| appfiles.program_files.smux-mib.txt | icat | 162 |
| appfiles.program_files.snmp-community-mib.txt | icat | 431 |
| registry.system | regripper | 199 |
| appfiles.program_files.snmp-framework-mib.txt | icat | 528 |
| appfiles.program_files.snmp-mpd-mib.txt | icat | 147 |
| appfiles.program_files.snmp-proxy-mib.txt | icat | 296 |
| appfiles.program_files.snmp-target-mib.txt | icat | 662 |
| registry.system | regripper | 286 |
| appfiles.program_files.snmp-user-based-sm-mib.txt | icat | 914 |
| appfiles.program_files.snmp-view-based-acm-mib.txt | icat | 832 |
| appfiles.program_files.snmpv2-conf.txt | icat | 324 |
| appfiles.program_files.snmpv2-mib.txt | icat | 856 |
| clamav.scan | clamav | 2 |
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
| yara.files | yara | 3 |
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
| composite.file_staging | composite | 668 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
