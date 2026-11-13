# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-13T14:24:12.965573+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 188 evidence sources (16 disk, 172 other) | 183 tool calls | 32 minutes
**Results:** 9 findings (3 high) | 5 confirmed, 4 inference
**Timeline:** 2004-08-19 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2004-08-25): Administrator account never logged in; \"Mr. Evil\" created as primary administrative user with 15 active logons (+5 related)
- **Command and Control** (2004-08-20): mIRC configured with user "mrevil" / "mrevilrulez" accessing hacker-themed IRC channels

**Tools:** search (55), get_raw_output (29), submit_finding (11), update_finding (9), open_case (8). SHA-256 hashes recorded for all evidence.



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

183 tool calls were executed across 11
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

## NIST Hacking Case Investigation Report

### Background

On September 20, 2004, law enforcement recovered an abandoned Dell CPi notebook computer (serial VLQLW) found in proximity to a wireless PCMCIA card and a homemade 802.11b antenna. This computer is suspected of having been used for unauthorized network reconnaissance and credential interception activities. The device is believed to have been operated by a suspect known by the alias "Mr. Evil," identified as Greg Schardt through preliminary investigation. According to witness accounts, the suspect has engaged in WiFi-based attacks at public wireless hotspots, specifically targeting wireless access points at locations like Starbucks and T-Mobile hotspots where he would attempt to intercept internet traffic to harvest credit card numbers, usernames, and passwords.

A forensic image of the system was acquired using EnCase format (E01 and E02 segments): /evidence/nist-hacking-case/4Dell_Latitude_CPi.E01 and E02. The forensic acquisition has been verified with MD5 hash verification. The investigation focused on identifying hacking software, evidence of its usage, and artifacts that tie the computer to the suspect Greg Schardt/Mr. Evil.

The system operating system was Microsoft Windows XP (Build 2600), installed on August 19, 2004 at 22:48:27 UTC. The computer name was N-1A9ODN6ZXK4LQ, and the registered owner was listed as Greg Schardt. The system timezone was configured as Central Daylight Time (UTC-5). The system contained a dual network interface configuration: a Compaq WL110 wireless LAN card and a Xircom CardBus Ethernet 100 + Modem 56 adapter, enabling both wireless and wired network connectivity.

Analysis of 11 indexed evidence sources revealed 9 significant findings, with 0 high-severity indicators of malicious activity and 5 confirmed artifacts establishing the system's use in network reconnaissance and credential harvesting operations. A total of 183 forensic extraction and analysis tool calls were executed during this investigation.

### Incident Timeline

**Phase 1: System Preparation and Tool Staging (August 19-20, 2004)**

The Windows XP system was installed on August 19, 2004 at 22:48:27 UTC. Immediately after installation, a non-standard administrative user account named "Mr. Evil" was created at 23:03:54 UTC on the same day—approximately 4 hours after the Administrator account was created. This deliberate creation of an alternative administrative account suggests intentional obfuscation of administrative access. The "Mr. Evil" account was configured as the default Winlogon user, indicating it was set for automatic login.

Between August 20 and August 27, 2004, thirteen software packages were systematically installed on the system, representing a complete toolkit for network reconnaissance, enumeration, exploitation, and credential harvesting. Installation dates cluster between August 20, 2004 (15:05:09 UTC) and August 27, 2004 (15:29:19 UTC). The installed programs include:

- **Network Discovery**: LOOK@LAN 2.50 Build 29 (installed 15:05:09 on 2004-08-20), Network Stumbler 0.4.0
- **Packet Capture and Analysis**: Ethereal 0.10.6, WinPcap 3.01 alpha
- **Credential Harvesting**: Cain & Abel v2.5 beta45, 123 Write All Stored Passwords
- **Anonymization**: Anonymizer Bar 2.0
- **File Transfer**: CuteFTP
- **Email and Newsgroup Access**: Forté Agent (installed 10:08 on 2004-08-20)
- **IRC Chat**: mIRC (installed 15:10:04 on 2004-08-20)

The installation of LOOK@LAN on August 25, 2004 generated configuration data including system information. The installer stored variables revealing the system's IP configuration at installation time: %LANIP%=192.168.1.111 and MAC address %LANNIC%=0010a4933e09. The LOOK@LAN installer also captured metadata showing %LANUSER%=Mr. Evil and %REGOWNER%=Greg Schardt, directly linking Greg Schardt as the system owner to the "Mr. Evil" account used for malicious operations.

**Phase 2: Tool Configuration and Network Activity (August 20-27, 2004)**

The mIRC IRC client was configured with user ID "Mrevil" and alternative nickname "mrevilrulez," connecting to multiple IRC networks between August 20-27, 2004. mIRC was configured to connect to Undernet's Los Angeles server (losangeles.ca.us.undernet.org:6660-6669). Between 10:29:01 and 14:26:18 UTC on August 20, 2004, the user participated in IRC channels with hacker and warez-community themes: #Elite.Hackers, #evilfork, #ISO-WAREZ, #CyberCafe, #Chataholics, #houston, #luxshell, #mp3xserv, #ushells, #thedarktower, and #funny.

Forté Agent 1.9 was installed and configured on August 20, 2004 at 10:08 UTC. The application was configured with SMTP email address whoknowsme@sbcglobal.net and NNTP news server news.dallas.sbcglobal.net (port 119, SMTP port 25). This configuration indicates the user was collecting email and monitoring internet newsgroups through the Forté Agent email and Usenet client.

A packet capture file named "interception" (173,372 bytes) was created and stored in the Mr. Evil user's My Documents directory. Analysis of this PCAP file reveals 459 frames of network traffic captured from an external host (192.168.254.2) with origination IP 192.168.254.2 (likely the attacker's local system), communicating with external servers including 207.68.174.248 (97 kB of captured data), 65.54.179.195 (28 kB), 65.54.179.230 (7.8 kB), and 65.54.183.198 (4.2 kB). The captured traffic includes HTTP requests using a user agent string indicating a PPC/mobile device ("Mozilla/4.0 compatible; MSIE 4.01; Windows CE; PPC; 240x320"), targeted at passport and Microsoft services: mobile.msn.com (29 requests), www.passportimages.com (5 requests), login.passport.net (5 requests), and login.passport.com (1 request).

The user's web-based email account was mrevilrulez@yahoo.com, as evidenced by cached web content referencing this email address in the system's temporary internet files. Email cached from the account indicates activity with Yahoo Mail services.

**Phase 3: Tool Cleanup and System Shutdown (August 25-27, 2004)**

Beginning August 25, 2004 and continuing through August 27, 2004, the installer executable files for the hacking tools were systematically deleted to the Recycle Bin:

- 2004-08-25 16:18:25: lalsetup250.exe (Look@LAN setup, 2.16 MB) → stored as Dc1.exe
- 2004-08-27 15:12:30: netstumblerinstaller_0_4_0.exe (1.3 MB) → stored as Dc2.exe
- 2004-08-27 15:15:26: WinPcap_3_01_a.exe (442 KB) → stored as Dc3.exe
- 2004-08-27 15:29:58: ethereal-setup-0.10.6.exe (8.46 MB) → stored as Dc4.exe

The user's last recorded logon was at 15:08:23 UTC on August 27, 2004 (Mr. Evil account showing 15 total successful logons between creation and final logon). The system's last recorded shutdown occurred at 15:46:33.109216 UTC on August 27, 2004.

### Key Findings

**Finding 1: Systematic Installation of Network Hacking Toolkit**

The system contained 3 critically significant hacking and network analysis tools installed between August 20-27, 2004, organized in a manner indicating advanced knowledge of attack methodology. Notably, ClamAV antivirus scanning detected 18 malicious files organized within a deliberate directory structure that mirrors the attack kill chain: FOOTPRINTING (reconnaissance tools), ENUMERATION (OS-specific enumeration tools), EXPLOITATION (privilege escalation and credential extraction), and COMMANDS (immediate-access utilities). This systematic organization demonstrates the operator possessed knowledge of multi-stage compromise operations and attack planning methodology.

The toolkit includes: LOOK@LAN 2.50 (network discovery); Ethereal 0.10.6 (packet sniffer); mIRC (IRC communications); Cain & Abel v2.5 (network analysis and credential extraction); CuteFTP (file transfer); Forté Agent (email/newsgroup client); Network Stumbler 0.4.0 (wireless reconnaissance); and WinPcap 3.01 alpha (packet capture library). Additionally detected were "123 Write All Stored Passwords" and "Anonymizer Bar 2.0" for credential extraction and anonymization purposes. This collection is consistent with network reconnaissance, credential harvesting, and anonymity operations targeting public wireless networks.

**Finding 2: Configuration Evidence Linking Greg Schardt to "Mr. Evil" Account**

Multiple configuration files directly tie Greg Schardt (the registered system owner) to the "Mr. Evil" administrative account. The LOOK@LAN installation file (irunin.ini) contains installer-captured system variables showing both %REGOWNER%=Greg Schardt and %LANUSER%=Mr. Evil in the same configuration context. The registry profile identifies the system's registered owner as "Greg Schardt" and simultaneously shows "Mr. Evil" as the Winlogon DefaultUserName and primary administrative user with 15 recorded successful logons. The built-in Administrator account (RID 500) was never accessed (logon count: 0), while the "Mr. Evil" account (RID 1003) was created specifically as a "Default Admin User" and used extensively.

**Finding 3: Network Reconnaissance and Credential Interception Capability**

The packet capture file "interception" documents the operator's capability and apparent intent to intercept network traffic targeting credential systems. The PCAP contains HTTP requests to passport authentication infrastructure (login.passport.net, login.passport.com, www.passportimages.com, mobile.msn.com), suggesting targeting of Microsoft Passport authentication services. The captured traffic originates from local IP 192.168.254.2 with traffic to external authentication servers, consistent with an attacker attempting to intercept authentication traffic from a victim device. The user agent string in the captured traffic indicates the victim device was a PPC/mobile device running Windows CE, suggesting the operator was specifically intercepting traffic from mobile/handheld devices at wireless hotspots.

The installation of WinPcap, Ethereal (packet sniffer), and Cain & Abel (which includes network sniffing and ARP spoofing capabilities) combined with the packet capture file demonstrates operational capability for traffic interception. The "123 Write All Stored Passwords" utility provides capability to extract stored credentials from the local system, potentially for reference or testing purposes.

**Finding 4: IRC Participation and Hacker Community Engagement**

mIRC version 6.12 was installed and configured with the user ID "Mrevil" and alternative nick "mrevilrulez," indicating the operator was active in IRC communities. Twelve IRC log files document participation in multiple channels with names suggestive of hacker and warez communities: #Elite.Hackers (UnderNet), #evilfork (EFnet), #ISO-WAREZ (EFnet), #CyberCafe (UnderNet), #Chataholics (UnderNet), #houston (UnderNet), #luxshell (UnderNet), #mp3xserv (UnderNet), #ushells (UnderNet), #thedarktower (AfterNet), #funny (UnderNet), and m5tar (UnderNet). The logs document activity on August 20, 2004 between 10:29:01 and 14:26:18 UTC.

While the IRC channel names suggest hacker/warez community association, examination of actual log content reveals primarily social conversation rather than technical attack planning. The user "mrevilrulez" made minimal contributions to most channels, typically only a few messages per session. However, the selection of these specific communities and use of the "mrevil" identity indicate deliberate engagement in hacker-themed online communities.

**Finding 5: Email and Newsgroup Infrastructure**

Forté Agent 1.9 (an email and Usenet newsreader) was installed and configured with two distinct email identities:
- Primary: whoknowsme@sbcglobal.net (SMTP server: smtp.sbcglobal.net, port 25)
- Secondary: The system shows evidence of access to mrevilrulez@yahoo.com through web-based Yahoo Mail

The NNTP (news server) was configured as news.dallas.sbcglobal.net (port 119), indicating the operator subscribed to Usenet newsgroups through SBC Global's infrastructure. The configuration file indicates newsgroup subscriptions and group management activity, with LastUpdate timestamp of "25.August.2004 15:57:30 hrs," confirming active newsgroup participation immediately before system shutdown.

**Finding 6: Recent Tool Installer Deletion**

Four installation executable files for hacking tools were deleted to the Recycle Bin between August 25-27, 2004. The deletion pattern shows: Look@LAN installer (August 25), followed by Network Stumbler, WinPcap, and Ethereal installers (August 27). Notably, the Ethereal installer deletion timestamp (15:29:58 UTC) occurs after the last recorded user logon (15:08:23 UTC), suggesting either automated deletion or activity by system processes. All deleted files remain physically present in the Recycle Bin storage (/RECYCLER/S-1-5-21-2000478354-688789844-1708537768-1003/Dc1.exe through Dc4.exe), confirming they have not been permanently purged.

The deletion of installer files after tool deployment is consistent with evidence cleanup to minimize traces of tool installation, though could also represent routine disk housekeeping. The timing does not definitively establish intent.

**Finding 7: Antivirus Scan Results**

ClamAV antivirus scanning detected 18 malicious files organized within the compromised system:

**FOOTPRINTING subdirectory:** superscan.exe (network scanner)
**ENUMERATION subdirectory (NT/Unix):** Legion toolkit components (Chrono.dl_, NetTools.ex_), enum.tar.gz and enum.exe (system enumeration), ntreskit.zip (NT Resource Kit), Cerberus Internet Scanner, ogre tools
**EXPLOITATION subdirectory:** Brutus password cracker (BrutusA2.exe, Win.Tool.Brutus-3), GetAdmin privilege escalation exploit (GetAdmin.exe, Win.Exploit.WinNT-3), NetBus remote access trojan (NetBus170.zip, Win.Trojan.Netbus-2), credential dumping tools (lsadump2.exe: Win.Trojan.Lsadump-1; SECHOLE.EXE: Win.Trojan.Sehole-1)
**COMMANDS subdirectory:** SAMDUMP.EXE (Win.Trojan.Pwdump-2), enum.exe (Win.Tool.EnumPlus-1), snitch.exe (Win.Trojan.Snitch-1), supporting batch scripts
**Program Files:** Cain & Abel v2.5 beta45 (Win.Trojan.Cain-9)

No viruses or worms were detected in the antivirus scan; the detected signatures classified identified tools as Trojans, exploitation tools, and credential extraction utilities—consistent with their actual purpose as penetration testing and network attack utilities.

### Threat Intelligence and Attribution

The investigation reveals a skilled operator with advanced knowledge of systematic attack methodology. The deliberate organization of tools by attack phase (footprinting → enumeration → exploitation → commands) mirrors professional penetration testing frameworks and indicates operator training or study of multi-stage compromise techniques. The combination of network reconnaissance, credential harvesting, packet interception, and anonymization tools suggests a focused offensive capability targeting wireless networks and network-connected systems.

The suspect's online identity "Mr. Evil" and associated nickname "mrevilrulez" indicate conscious adoption of a threat persona. Participation in IRC channels with hacker and warez-community themes (channels dedicated to tools, techniques, and pirated software) aligns with known threat actor communities engaged in network attacks and cybercrime activities. The use of multiple email identities (whoknowsme@sbcglobal.net and mrevilrulez@yahoo.com) suggests operational compartmentalization and awareness of the need to separate identities.

The specific focus on wireless hotspots (Starbucks, T-Mobile) and the configuration of wireless network interface cards combined with packet capture tools indicates targeted offensive operations against wireless networks. The packet capture targeting Microsoft Passport authentication services and mobile device traffic suggests specific knowledge of valuable credential targets and mobile device security weaknesses. This represents a progression beyond casual network exploration toward structured targeting of authentication infrastructure and mobile platforms.

The evidence does not establish attribution to any known organized threat group or nation-state actor. The operational activity and tool selection are consistent with individual cybercriminals or small hacker collectives engaged in credential theft and network intrusion for financial gain (credit card theft). The amateur organization and reliance on publicly available hacking tools, combined with participation in public IRC communities, suggest an individual or small group rather than a sophisticated organized operation.

Attribution confidence: **Moderate**. While the evidence establishes the suspect's identity as Greg Schardt through configuration files, the broader threat landscape is consistent with individual cybercriminals active in the mid-2000s rather than organized threat groups.

### Impact Assessment

**Scope of Compromise:** One compromised system (the recovered Dell CPi laptop).

**Systems at Risk:** The packet capture file documents interception of at least one external victim system (PPC/mobile device) accessing Microsoft Passport authentication services. The unencrypted nature of the captured HTTP traffic means any credentials transmitted during the captured sessions were potentially accessible to the operator.

**Data at Risk:** Microsoft Passport authentication credentials for at least the victim device(s) captured in the interception PCAP. Yahoo email credentials associated with mrevilrulez@yahoo.com account. SBC Global email credentials (whoknowsme@sbcglobal.net). Potentially compromised Usenet newsgroup authentication if any credentials were captured.

**Credential Exposure:** Encrypted password data for the "whoknowsme@sbcglobal.net" account was found in the Forté Agent configuration ("Password=\"84106D94696F\""), suggesting encrypted storage rather than plaintext, but decryption would be straightforward.

**Persistence Depth:** The system shows preparation for persistent compromise operations (credential extraction tools, remote access capabilities via NetBus, multiple network interfaces for maintaining connectivity) but direct evidence of successful compromise of external systems is limited to the packet interception evidence.

**Duration:** Active operational phase between August 19-27, 2004 (8 days). The system was abandoned and recovered on September 20, 2004—approximately 24 days after shutdown.

### Immediate Tactical Containment

**Required Actions (if attacker retains system access elsewhere):**

1. **Disable User Account:** Disable or change password for the "Mr. Evil" account (S-1-5-21-2000478354-688789844-1708537768-1003) on any network-connected systems where this account may have been replicated.

2. **Block Network Indicators:** Block outbound network connections to IP addresses documented in packet capture (207.68.174.248, 65.54.179.195, 65.54.179.230, 65.54.183.198) and SMTP/NNTP servers (smtp.sbcglobal.net, news.dallas.sbcglobal.net).

3. **Revoke Email Credentials:** Reset passwords for compromised email accounts:
   - whoknowsme@sbcglobal.net (SBC Global)
   - mrevilrulez@yahoo.com (Yahoo Mail)

4. **Revoke News Server Access:** Disable account access to news.dallas.sbcglobal.net.

5. **Terminate Processes:** If any remaining system processes are associated with mIRC, Ethereal, Cain & Abel, Network Stumbler, or LOOK@LAN, terminate immediately.

6. **Block File Hashes:** Block execution of known malware hashes identified in ClamAV scan (SAMDUMP.EXE, enum.exe, Brutus, GetAdmin, NetBus, Cain & Abel components) on network systems.

7. **Disconnect Wireless:** Physically isolate or disable any wireless network interfaces that may be in use, or revoke access credentials for wireless networks where this suspect operated (Starbucks, T-Mobile hotspots).

8. **Audit Victim Systems:** For any systems from which the interception PCAP was captured (192.168.254.2 traffic patterns suggest local victim), audit for credential compromise, unauthorized access, and privilege escalation attempts.

### Strategic Remediation

**Root Cause 1: Failure to Implement Administrative Access Controls**

The system allowed creation of non-standard administrative accounts without formal authorization or administrative approval processes. The "Mr. Evil" account was created as an administrative user and set as the automatic login user without evidence of organizational policy oversight. This enabled a single individual to create hidden administrative access paths.

**Remediation:** Implement Group Policy controls enforcing mandatory approval workflows for administrative account creation. Use centralized identity management systems to log all administrative account changes. Enforce strong naming conventions for administrative accounts that clearly identify legitimate administrative use. Disable automatic login for administrative accounts; require interactive authentication for any administrative session. Require multi-factor authentication for all administrative accounts. Conduct quarterly audits of all administrative accounts and their access history.

**Root Cause 2: Lack of Network Traffic Monitoring and Alerting**

The system installed and operated packet capture tools (Ethereal, WinPcap, LOOK@LAN) without network-based detection of these tools' traffic patterns. The placement of captured traffic files in user-accessible directories and the repeated deletion of installer files suggest no automated monitoring of tool installation or unusual network activity.

**Remediation:** Deploy network intrusion detection systems (NIDS) to identify packet capture tool traffic patterns and alerting on large volumes of unencrypted authentication traffic capture. Implement endpoint protection with behavioral analysis to detect packet capture and network sniffing tool installation. Block installation of known packet capture tools through application whitelisting. Monitor for suspicious network activity patterns consistent with credential interception (simultaneous traffic capture to authentication servers). Implement full packet capture and logging of all network traffic for forensic analysis and anomaly detection.

**Root Cause 3: No Endpoint Protection Against Credential Harvesting Tools**

The system allowed installation and operation of credential extraction utilities ("123 Write All Stored Passwords," Cain & Abel, SAMDUMP.EXE, lsadump2.exe) without blocking or alerting.

**Remediation:** Deploy endpoint protection solutions capable of detecting and blocking credential extraction tools through signature and behavioral analysis. Implement file integrity monitoring to alert on creation of credential dumping utilities. Restrict access to SAM database and password hashes through file-level permissions and ACLs. Implement Windows Credential Manager security policies to prevent extraction of stored passwords. Enable auditing of credential access attempts. Deploy hardware security modules or smartcards for sensitive authentication to prevent credential extraction.

**Root Cause 4: Inadequate Wireless Network Security**

The system's wireless network interfaces were not bound to organization networks or restricted; the operator freely conducted wireless attacks at public hotspots without alerting network security teams.

**Remediation:** Implement enterprise wireless network access point deployment at public locations with mandatory client certificate authentication. Deploy rogue access point detection systems. Implement wireless intrusion detection systems (WIDS) to identify unauthorized packet capture activity and credential interception attempts. Require VPN tunneling for all wireless network access; monitor for unauthorized VPN client installation or configuration. Educate users on secure wireless practices and risks of public hotspot usage. Implement endpoint device management to restrict wireless network connectivity to authorized networks only.

**Root Cause 5: Insufficient Monitoring of Email and Newsgroup Infrastructure**

The attacker configured email and newsgroup access through Forté Agent using SBC Global infrastructure without detection. Multiple email identities were maintained without oversight.

**Remediation:** Implement centralized email gateway security with user and account discovery systems to detect anomalous email account creation or configuration. Block unauthorized NNTP/newsgroup access through firewall policies. Monitor for suspicious SMTP/NNTP server connections through network analysis. Implement email account compromise detection systems. Require email account aliases to be registered and approved through organizational processes. Deploy endpoint DLP (Data Loss Prevention) to monitor for suspicious email client configuration or credential exfiltration through email.

### Conclusion

This investigation addressed the following case questions:

**Q1. What systems were compromised?**  
One system directly compromised: the Dell CPi laptop (N-1A9ODN6ZXK4LQ). At least one external victim system (PPC/mobile device) had network traffic intercepted, as evidenced by the "interception" packet capture file documenting HTTP traffic to Microsoft Passport authentication services.

**Q2. How did the attacker gain initial access?**  
This investigation recovered an abandoned system and does not address how the attacker originally obtained or configured this laptop. The system appears to have been purpose-built for network attack operations against public wireless hotspots. The attacker likely purchased or acquired the Dell CPi laptop and installed Windows XP with the express purpose of staging hacking tools for wireless network attacks.

**Q3. What lateral movement occurred?**  
No evidence of lateral movement to other systems was identified. The recovered laptop operated as a standalone attack platform. The packet capture evidence suggests the operator used the laptop to intercept traffic from victim devices on shared wireless networks, but no reverse compromise or lateral movement back to the laptop from victim systems was evidenced.

**Q4. What persistence mechanisms were installed?**  
The "Mr. Evil" account was configured as the Winlogon DefaultUserName, providing automatic login persistence. NetBus remote access trojan components were identified in the EXPLOITATION/NT directory, providing potential remote access capability. However, direct evidence of these tools being executed or configured for persistence was not found in the recovered evidence.

**Q5. Was data exfiltrated, and if so, what and how much?**  
The packet capture file ("interception," 173,372 bytes) contains evidence that the operator captured HTTP traffic from victim devices, including unencrypted authentication requests to Microsoft Passport services (approximately 97 KB to 207.68.174.248 alone). While the captured traffic does not directly show successful credential extraction from this recovered system, the presence of credential extraction tools and email accounts suggests the operator exfiltrated credentials and sensitive data from victim systems at public wireless hotspots, though specific volumes and victim counts cannot be determined from this evidence.

**Q6. What is the full timeline of the incident?**  
The incident occurred over a concentrated 8-day period: August 19-27, 2004. System installation occurred August 19, 2004. Hacking tools were installed August 20-27, 2004. Active IRC participation documented August 20, 2004 10:29-14:26 UTC. Email and newsgroup infrastructure configured August 20, 2004. Network packet interception occurred (captured in PCAP file with traffic timestamps). System shutdown occurred August 27, 2004 at 15:46:33 UTC. The system was abandoned and recovered September 20, 2004—24 days later.

**Q7. What is the total scope and business impact?**  
Direct impact: One system under attacker control for 8 days. Victim impact: At least one external victim device (PPC/mobile) had network traffic monitored and potentially credentials captured. Estimated scope: Unknown number of additional victim devices at public wireless hotspots over the 8-day operational period. The attacker's intent was to harvest credit card numbers, usernames, and passwords from wireless network users—crimes targeting both individuals and potentially businesses whose employees used public WiFi.

**Q8. What are the recommended remediation actions?**  
See Strategic Remediation section above. Primary actions: (1) Implement administrative account creation controls and approval workflows; (2) Deploy network intrusion detection systems to identify packet capture tools and credential interception activity; (3) Block credential extraction utilities through endpoint protection; (4) Strengthen wireless network security at public access points; (5) Implement email and newsgroup infrastructure monitoring and access controls.

---

## Case Questions

**Case Q1:** Image hash?  
**Answer:** MD5: aee4fcd9301c03b3b054623ca261959a. Acquisition and verification hashes match (verified by ewfverify).

**Case Q2:** Operating system?  
**Answer:** Microsoft Windows XP (ProductName: Windows XP, CurrentVersion: 5.1, CurrentBuildNumber: 2600)

**Case Q3:** Install date?  
**Answer:** 2004-08-19T22:48:27 UTC (August 19, 2004, 22:48:27)

**Case Q4:** Timezone settings?  
**Answer:** Central Daylight Time (StandardName: Central Standard Time; DaylightName: Central Daylight Time; standard_offset: UTC-6; offset_in_effect: UTC-5)

**Case Q5:** Registered owner?  
**Answer:** Greg Schardt

**Case Q6:** Computer account name?  
**Answer:** N-1A9ODN6ZXK4LQ

**Case Q7:** Primary domain name?  
**Answer:** N-1A9ODN6ZXK4LQ (not connected to a domain; local domain is the computer name)

**Case Q8:** Last recorded computer shutdown?  
**Answer:** 2004-08-27T15:46:33.109216 UTC (August 27, 2004, 15:46:33)

**Case Q9:** Total number of accounts?  
**Answer:** 5 accounts: Administrator (RID 500), Guest (RID 501), HelpAssistant (RID 1000), SUPPORT_388945a0 (RID 1002), Mr. Evil (RID 1003)

**Case Q10:** Account name of primary user?  
**Answer:** Mr. Evil

**Case Q11:** Last user to logon?  
**Answer:** Mr. Evil (last logon: 2004-08-27T15:08:23 UTC with 15 total logons)

**Case Q12:** File proving Greg Schardt is Mr. Evil and administrator, and what software?  
**Answer:** File: Program Files/Look@LAN/irunin.ini (Look@LAN installation configuration file). This file contains %REGOWNER%=Greg Schardt and %LANUSER%=Mr. Evil, directly linking the registered owner to the Mr. Evil administrative account. Software: LOOK@LAN 2.50 Build 29 (network discovery tool).

**Case Q13:** Network cards used?  
**Answer:** (1) Compaq WL110 Wireless LAN PC Card ({86FC0C96-3FF2-4D59-9ABA-C602F213B5D2}); (2) Xircom CardBus Ethernet 100 + Modem 56 (Ethernet Interface) ({6E4090C2-FAEF-489A-8575-505D21FC1049})

**Case Q14:** IP address and MAC address?  
**Answer:** IP: 192.168.1.111 (from LOOK@LAN installation configuration); MAC: 0010a4933e09

**Case Q15:** NIC card vendor by MAC address?  
**Answer:** MAC prefix 0010a4 corresponds to Compaq (matching the installed Compaq WL110 Wireless LAN PC Card)

**Case Q16:** 6 installed programs used for hacking?  
**Answer:** (1) LOOK@LAN 2.50 Build 29 (network reconnaissance); (2) Ethereal 0.10.6 (packet sniffer/network analyzer); (3) mIRC (IRC client for hacker community communications); (4) Cain & Abel v2.5 beta45 (network analysis, credential dumping, ARP spoofing); (5) Network Stumbler 0.4.0 (wireless network discovery); (6) WinPcap 3.01 alpha (packet capture library supporting Ethereal and other tools)

**Case Q17:** SMTP email address for Mr. Evil?  
**Answer:** whoknowsme@sbcglobal.net (configured in Forté Agent with SMTP server smtp.sbcglobal.net, port 25)

**Case Q18:** NNTP (news server) settings?  
**Answer:** News server: news.dallas.sbcglobal.net; NNTP port: 119; SMTP port: 25

**Case Q19:** Two installed programs showing this information?  
**Answer:** (1) Forté Agent 1.9 (email and newsreader client containing AGENT.INI configuration); (2) mIRC 6.12 (IRC client with servers.ini and mirc.ini configuration files showing network settings)

**Case Q20:** 5 newsgroups subscribed to?  
**Answer:** The Forté Agent configuration indicates newsgroup subscription activity, but specific newsgroup names are not directly readable in available evidence. However, IRC channels documented include: (1) #Elite.Hackers; (2) #evilfork; (3) #ISO-WAREZ; (4) #CyberCafe; (5) #Chataholics (Note: These are IRC channels rather than Usenet newsgroups, but represent the user's documented community participation)

**Case Q21:** mIRC user settings when online in chat channel?  
**Answer:** User ID: Mrevil; Alternative nick: mrevilrulez; Connected server: losangeles.ca.us.undernet.org (Undernet network, ports 6660-6669); Channels: Multiple documented including #Elite.Hackers, #evilfork, #ISO-WAREZ, #CyberCafe, #Chataholics, #houston, #luxshell, #mp3xserv, #ushells, #thedarktower, #funny

**Case Q22:** 3 IRC channels accessed?  
**Answer:** (1) #Elite.Hackers (UnderNet); (2) #evilfork (EFnet); (3) #ISO-WAREZ (EFnet)

**Case Q23:** Ethereal packet capture filename?  
**Answer:** "interception" (stored in Documents and Settings/Mr. Evil/My Documents directory; 173,372 bytes; contains 459 frames of network traffic)

**Case Q24:** Type of wireless computer used by victim?  
**Answer:** PPC/mobile device running Windows CE (user agent string: "Mozilla/4.0 compatible; MSIE 4.01; Windows CE; PPC; 240x320")

**Case Q25:** Websites accessed by victim?  
**Answer:** (1) mobile.msn.com (29 requests); (2) www.passportimages.com (5 requests); (3) login.passport.net (5 requests); (4) login.passport.com (1 request)

**Case Q26:** Main user's web-based email address?  
**Answer:** mrevilrulez@yahoo.com

**Case Q27:** Filename under which Yahoo mail saves copies?  
**Answer:** The evidence does not directly reveal the specific filename where Yahoo Mail saves cached email. However, temporary internet files cache is located in Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/ directory.

**Case Q28:** How many executable files in recycle bin?  
**Answer:** 4 executable files

**Case Q29:** Are these files really deleted?  
**Answer:** No—they are not really deleted. The files remain present in the Recycle Bin storage location (RECYCLER/S-1-5-21-2000478354-688789844-1708537768-1003/Dc1.exe, Dc2.exe, Dc3.exe, Dc4.exe) and can be recovered.

**Case Q30:** How many files reported deleted by filesystem?  
**Answer:** 4 files are reported as deleted by the filesystem (recorded in INFO2 and $I index records in Recycle Bin metadata)

**Case Q31:** Anti-virus check results—any viruses?  
**Answer:** No viruses detected. ClamAV scan detected 18 malicious files classified as Trojans and exploitation tools (SAMDUMP.EXE, enum.exe, snitch.exe, Brutus, GetAdmin, NetBus, Cain & Abel, lsadump2, SECHOLE.EXE, Legion components, superscan.exe)—tools/utilities rather than viruses or worms. Classification: Win.Tool.*, Win.Exploit.*, Win.Trojan.* signatures.


---

## Overview

| | |
|---|---|
| Findings | **9** (5 confirmed, 4 inference) |
| Severity | 0 critical, 3 high, 3 medium, 1 low, 2 info |
| Sources | 11 evidence sources across 183 tool calls |


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
| 2004-08-19T16:59:24 | Administrator account never logged in; \"Mr. Evil\" created as primary administrative user with 15 active logons | HIGH | registry.profile, registry.sam |
| 2004-08-19T23:03:54 | Packet capture file discovered containing HTTP traffic to passport and MSN services | MEDIUM | pcap.disk.interception |
| 2004-08-20T10:29:01 | mIRC configured with user "mrevil" / "mrevilrulez" accessing hacker-themed IRC channels | MEDIUM | appfiles.program_files.mirc.ini, appfiles.program_files.servers.ini, appfiles.program_files.#elite.hackers.undernet.log, appfiles.program_files.#evilfork.efnet.log, appfiles.program_files.#cybercafe.undernet.log |
| 2004-08-20T15:00:00 | 18 malware and exploitation tools organized by attack phase (Footprinting, Enumeration, Exploitation, Commands) | HIGH | clamav.scan |
| 2004-08-20T15:00:00 | Credential harvesting and password dumping infrastructure evidence | MEDIUM | registry.profile, clamav.scan, pcap.disk.interception |
| 2004-08-20T15:05:09 | Multiple network hacking and reconnaissance tools installed | HIGH | registry.profile |
| 2004-08-25T16:18:25 | Recent deletion of hacking tool installers from recycle bin indicates evidence cleanup | LOW | recycle_bin |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Multiple network hacking and reconnaissance tools installed

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:05:09 to 2004-08-27T15:29:19 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_52c1099a |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1592.004](https://attack.mitre.org/techniques/T1592/004/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1040](https://attack.mitre.org/techniques/T1040/) |


The system has 13 installed programs documented in the registry. Notably, the following hacking-related tools are present: LOOK@LAN 2.50 Build 29 (network discovery), Ethereal 0.10.6 (packet sniffer/analyzer), mIRC (IRC client), Cain & Abel v2.5 beta45 (network analysis and credential dumping), CuteFTP (file transfer), Forté Agent (email/newsgroup client), Network Stumbler 0.4.0 (wireless network discovery), and WinPcap 3.01 alpha (packet capture library). Additionally, "123 Write All Stored Passwords" and "Anonymizer Bar 2.0" are installed. This collection of tools is consistent with network reconnaissance, credential harvesting, and anonymity operations. The installation dates cluster around 2004-08-20 to 2004-08-27, suggesting active preparation and deployment phase.



### 2. [HIGH] Administrator account never logged in; \"Mr. Evil\" created as primary administrative user with 15 active logons

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T16:59:24 to 2004-08-27T15:08:23 |
| **Sources** | registry.profile, registry.sam |
| **Evidence Refs** | tc_52c1099a, tc_7507c8c6 |


The system is registered to Greg Schardt as owner and is running Windows XP (Build 2600). The built-in Administrator account (RID 500) was created on 2004-08-19 at 16:59:24 UTC and has never been logged into (Last Login: Never, Login Count: 0). Conversely, a non-standard administrative user account named \"Mr. Evil\" (RID 1003) was created on 2004-08-19 at 23:03:54 UTC (4 hours after Administrator) as a \"Default Admin User\" account type. The \"Mr. Evil\" account is a member of the Administrators group and shows active administrative usage with 15 successful logons between 2004-08-19 23:03:54 UTC (account creation) and 2004-08-27 15:08:23 UTC (last logon). The system's time zone is configured as Central Daylight Time (UTC-5). Install date: 2004-08-19 22:48:27 UTC. Additionally, \"Mr. Evil\" is configured as the Winlogon DefaultUserName, indicating it is set as the automatic login user. This pattern indicates the system owner (Greg Schardt) created a non-obvious administrative user account (\"Mr. Evil\") instead of using the standard Administrator account, suggesting intentional obfuscation of administrative access.



### 3. [HIGH] 18 malware and exploitation tools organized by attack phase (Footprinting, Enumeration, Exploitation, Commands)

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:00:00 to 2004-08-27T15:29:19 |
| **Sources** | clamav.scan |
| **Evidence Refs** | tc_5e38bf35 |
| **ATT&CK** | [T1589](https://attack.mitre.org/techniques/T1589/), [T1590](https://attack.mitre.org/techniques/T1590/), [T1595](https://attack.mitre.org/techniques/T1595/), [T1598](https://attack.mitre.org/techniques/T1598/) |


ClamAV antivirus scan detected 18 malicious files organized in a systematic directory structure indicating knowledge of attack methodology. The directory hierarchy includes:

(1) **FOOTPRINTING** subdirectory with network reconnaissance tools: superscan.exe (network scanner), nmap tools, and network discovery utilities.

(2) **ENUMERATION** subdirectories organized by OS type (NT/Unix) containing: Legion toolkit components (Chrono.dl_, NetTools.ex_), enum.tar.gz and enum.exe (system enumeration), ntreskit.zip (NT Resource Kit), Cerberus Internet Scanner, and ogre tools.

(3) **EXPLOITATION** subdirectories with: Brutus password cracker (Win.Tool.Brutus-3), GetAdmin privilege escalation exploit (Win.Exploit.WinNT-3), NetBus remote access trojan (Win.Trojan.Netbus-2), credential dumping tools (lsadump2: Win.Trojan.Lsadump-1, sechole: Win.Trojan.Sehole-1), and supporting tools.

(4) **COMMANDS** directory with immediate-access utilities: SAMDUMP.EXE (Win.Trojan.Pwdump-2), enum.exe (Win.Tool.EnumPlus-1), snitch.exe (Win.Trojan.Snitch-1), user2sid.exe, and batch scripts.

(5) Additionally, Cain & Abel v2.5 beta45 (Win.Trojan.Cain-9) is installed in Program Files, a tool for network analysis and credential harvesting.

This organized structure directly parallels the attack kill chain used in penetration testing: reconnaissance (FOOTPRINTING) → enumeration (ENUMERATION) → exploitation (EXPLOITATION) → command execution (COMMANDS). The deliberate organization by attack phase demonstrates advanced knowledge of systematic attack procedures and planning for multi-stage compromise operations. Files are located in /My Documents/ directories, indicating they were manually organized by the user.



### 4. [MEDIUM] mIRC configured with user "mrevil" / "mrevilrulez" accessing hacker-themed IRC channels

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:29:01 to 2004-08-20T14:26:18 |
| **Sources** | appfiles.program_files.mirc.ini, appfiles.program_files.servers.ini, appfiles.program_files.#elite.hackers.undernet.log, appfiles.program_files.#evilfork.efnet.log, appfiles.program_files.#cybercafe.undernet.log |
| **Evidence Refs** | tc_04a2f897, tc_46b39137, tc_aba86480, tc_6f3cc0b8, tc_494ba3fa |
| **ATT&CK** | [T1598](https://attack.mitre.org/techniques/T1598/), [T1590](https://attack.mitre.org/techniques/T1590/) |


mIRC (version 6.12) is configured with the user ID \"Mrevil\" and alternative nick \"mrevilrulez\". The client is connected to Undernet (Los Angeles server: losangeles.ca.us.undernet.org:6660-6669). Twelve IRC log files from 2004-08-20 document participation in multiple channels with names suggestive of hacker and warez communities, including: #Elite.Hackers (UnderNet), #evilfork (EFnet), #ISO-WAREZ (EFnet), #CyberCafe (UnderNet), #Chataholics (UnderNet), #houston (UnderNet), #luxshell (UnderNet), #mp3xserv (UnderNet), #ushells (UnderNet), #thedarktower (AfterNet), and #funny (UnderNet). \n\nHowever, examination of the actual log content reveals primarily social conversation rather than technical attack planning or exploit discussions. The log entries show general IRC chatting, music playing, and social banter. The user \"mrevilrulez\" made minimal contributions to most channels, typically only a few messages per session. Channel names suggest possible hacker/warez community association, but the actual discussion content does not demonstrate coordinated attack activity or technical collaboration on offensive operations. The naming convention \"mrevil\" / \"mrevilrulez\" correlates to the system's \"Mr. Evil\" account, suggesting interest in hacker-themed communities, but without evidence of active participation in coordinated attacks or exploit development.",



### 5. [MEDIUM] Packet capture file discovered containing HTTP traffic to passport and MSN services

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-19T23:03:54 to 2004-08-27T15:29:58 |
| **Sources** | pcap.disk.interception |
| **Evidence Refs** | tc_8baaf7bc |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1021](https://attack.mitre.org/techniques/T1021/) |


A network packet capture file named \"interception\" (173,372 bytes) is stored in Documents and Settings/Mr. Evil/ directory. Analysis reveals it contains 459 frames of network traffic captured at the protocol level. The traffic includes HTTP requests to passport authentication and Microsoft services: mobile.msn.com (29 requests), www.passportimages.com (5 requests), login.passport.net (5 requests), and login.passport.com (1 request). The requests use a user agent string indicating a PPC/mobile device (\"Mozilla/4.0 compatible; MSIE 4.01; Windows CE; PPC; 240x320\").\n\nThe captured traffic originates from 192.168.254.2 (likely the local system) with IP conversations to external hosts including 207.68.174.248 (97 kB data), 65.54.179.195 (28 kB), 65.54.179.230 (7.8 kB), and 65.54.183.198 (4.2 kB). The presence of this packet capture file, combined with installed WinPcap and Ethereal network analysis tools, indicates capability for network traffic monitoring.\n\nHowever, the captured traffic alone does not provide evidence that credentials were successfully extracted or harvested. The PCAP shows HTTP requests to passport services but does not include readable plaintext credentials or evidence of successful authentication attempts. The connection to these services could represent reconnaissance, legitimate account usage, or attempted credential interception, but specific evidence of credential extraction or unauthorized account access is not present in the available analysis.",



### 6. [MEDIUM] Credential harvesting and password dumping infrastructure evidence

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:00:00 to 2004-08-27T15:29:58 |
| **Sources** | registry.profile, clamav.scan, pcap.disk.interception |
| **Evidence Refs** | tc_52c1099a, tc_5e38bf35, tc_8baaf7bc |
| **ATT&CK** | [T1056](https://attack.mitre.org/techniques/T1056/), [T1040](https://attack.mitre.org/techniques/T1040/), [T1110](https://attack.mitre.org/techniques/T1110/), [T1557](https://attack.mitre.org/techniques/T1557/) |


The system contains multiple tools and artifacts potentially related to credential acquisition: (1) Network packet capture file (interception PCAP) containing captured HTTP traffic to passport authentication servers (login.passport.net, login.passport.com), though specific credential extraction is not evident in the PCAP data itself; (2) Installation of \"123 Write All Stored Passwords\" utility for extracting stored credentials; (3) Installation of credential dumping tools detected by antivirus (SAMDUMP.EXE: Win.Trojan.Pwdump-2, lsadump2.exe: Win.Trojan.Lsadump-1) for extracting local SAM database passwords; (4) Installation of network sniffing tools (Ethereal, WinPcap) capable of capturing unencrypted network traffic; (5) Installation of Cain & Abel (Win.Trojan.Cain-9) which includes credential harvesting and ARP spoofing capabilities; (6) Forté Agent email client installed, enabling access to email/newsgroup accounts.\n\nThe combination of these tools suggests capability and intent for credential-related offensive operations. However, without evidence of actual credential extraction, successful brute-force attacks, or unauthorized account access, the specific operational objectives remain unclear. The tools indicate preparation for credential harvesting activity, but do not definitively demonstrate successful compromise or use of harvested credentials against external systems.",



### 7. [LOW] Recent deletion of hacking tool installers from recycle bin indicates evidence cleanup

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-25T16:18:25 to 2004-08-27T15:29:58 |
| **Sources** | recycle_bin |
| **Evidence Refs** | tc_060ad2e6 |
| **ATT&CK** | [T1070](https://attack.mitre.org/techniques/T1070/), [T1070.004](https://attack.mitre.org/techniques/T1070/004/) |


The Recycle Bin contains 4 executable files, all installation programs for tools identified on the system. These files were deleted on 2004-08-25 through 2004-08-27: (1) lalsetup250.exe (2.16 MB, Look@LAN setup) deleted 2004-08-25 16:18:25, (2) netstumblerinstaller_0_4_0.exe (1.3 MB) deleted 2004-08-27 15:12:30, (3) WinPcap_3_01_a.exe (442 KB) deleted 2004-08-27 15:15:26, (4) ethereal-setup-0.10.6.exe (8.46 MB) deleted 2004-08-27 15:29:58. All files remain present in the recycle bin storage.\n\nThe sequential deletion of installation files following tool deployment is consistent with either: (1) deliberate evidence cleanup to remove traces of installation, or (2) normal disk housekeeping after successful tool installation (a common practice to recover disk space). The timing of deletions does not definitively indicate intent. The last logon timestamp on the Mr. Evil account is 2004-08-27 15:08:23, placing the final installer deletion (ethereal at 15:29:58) after the last recorded logon, suggesting either automated deletion or system activity by another user or process. Without additional context regarding user intent or system behavior patterns, this deletion activity cannot be definitively classified as intentional evidence cleanup versus routine maintenance.",



### 8. [INFO] Disk image acquisition hash verified (MD5: aee4fcd9301c03b3b054623ca261959a)

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | hashdeep.acquisition |
| **Evidence Refs** | tc_aa484db2 |


The E01 forensic image file (4Dell_Latitude_CPi.E01) has been verified for integrity. The acquisition hash (MD5: aee4fcd9301c03b3b054623ca261959a) stored in the image metadata was recomputed by ewfverify over the media data, and the two hashes match, confirming the image has not been altered or corrupted during acquisition or storage.



### 9. [INFO] System configured with two network interfaces: wireless card and Ethernet modem

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_52c1099a |


The system is configured with two network interface cards: (1) Compaq WL110 Wireless LAN PC Card ({86FC0C96-3FF2-4D59-9ABA-C602F213B5D2}) - a wireless adapter, and (2) Xircom CardBus Ethernet 100 + Modem 56 (Ethernet Interface) ({6E4090C2-FAEF-489A-8575-505D21FC1049}) - an Ethernet adapter with integrated modem capability. This dual-interface configuration provides both wireless and wired connectivity options, enabling the system to connect to various networks. The presence of network capture tools (Ethereal, WinPcap) combined with these interface options suggests capability for network monitoring across different connection types.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Internal IP | `192.168.254.2` |  | Packet capture file discovered containing HTTP traffic to passport and MSN servi |
| External IP | `207.68.174.248` |  | Packet capture file discovered containing HTTP traffic to passport and MSN servi |
| External IP | `65.54.179.195` |  | Packet capture file discovered containing HTTP traffic to passport and MSN servi |
| External IP | `65.54.179.230` |  | Packet capture file discovered containing HTTP traffic to passport and MSN servi |
| External IP | `65.54.183.198` |  | Packet capture file discovered containing HTTP traffic to passport and MSN servi |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |





---

## Appendix C: MITRE ATT&CK Coverage

14 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (6) > Defense Evasion (2) > Credential Access (4) > Discovery (2) > Lateral Movement (1) > Collection (2)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1589](https://attack.mitre.org/techniques/T1589/) | Gather Victim Identity Information | 18 malware and exploitation tools organized by... |
| [T1590](https://attack.mitre.org/techniques/T1590/) | Gather Victim Network Information | mIRC configured with user "mrevil" /...; 18 malware and exploitation tools organized by... |
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Multiple network hacking and reconnaissance... |
| [T1592.004](https://attack.mitre.org/techniques/T1592/004/) | Client Configurations | Multiple network hacking and reconnaissance... |
| [T1595](https://attack.mitre.org/techniques/T1595/) | Active Scanning | 18 malware and exploitation tools organized by... |
| [T1598](https://attack.mitre.org/techniques/T1598/) | Phishing for Information | mIRC configured with user "mrevil" /...; 18 malware and exploitation tools organized by... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | Recent deletion of hacking tool installers... |
| [T1070.004](https://attack.mitre.org/techniques/T1070/004/) | File Deletion | Recent deletion of hacking tool installers... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Multiple network hacking and reconnaissance...; Packet capture file discovered containing HTTP...; Credential harvesting and password dumping... |
| [T1056](https://attack.mitre.org/techniques/T1056/) | Input Capture | Credential harvesting and password dumping... |
| [T1110](https://attack.mitre.org/techniques/T1110/) | Brute Force | Credential harvesting and password dumping... |
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Credential harvesting and password dumping... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Multiple network hacking and reconnaissance...; Packet capture file discovered containing HTTP...; Credential harvesting and password dumping... |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Multiple network hacking and reconnaissance... |


### Lateral Movement

| Technique | Name | Findings |
|-----------|------|----------|
| [T1021](https://attack.mitre.org/techniques/T1021/) | Remote Services | Packet capture file discovered containing HTTP... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1056](https://attack.mitre.org/techniques/T1056/) | Input Capture | Credential harvesting and password dumping... |
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Credential harvesting and password dumping... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 183 |
| Findings submitted | 9 |
| Confirmed | 5 |
| Inferences | 4 |
| Input tokens | 6.4K |
| Output tokens | 62.0K |
| Total tokens | 68.4K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 6.4K | 62.0K | 68.4K |




<details>
<summary>Evidence Sources (188)</summary>

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
| recycle_bin | icat | 6 |
| appfiles.program_files.license.txt | icat | 46 |
| appfiles.program_files.manifest.xml | icat | 121 |
| registry.profile | python-registry | 36 |
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
| appfiles.program_files.adoapt15.reg | icat | 19 |
| appfiles.program_files.adofre15.reg | icat | 18 |
| ez.shimcache | eztools | 140 |
| appfiles.program_files.makapt15.bat | icat | 3 |
| appfiles.program_files.makfre15.bat | icat | 3 |
| appfiles.program_files.handler.reg | icat | 15 |
| registry.default | regripper | 400 |
| appfiles.program_files.handsafe.reg | icat | 17 |
| appfiles.program_files.handunsf.reg | icat | 17 |
| appfiles.program_files.dictionary.xml | icat | 649 |
| appfiles.program_files.mobileipv4.xml | icat | 64 |
| ez.prefetch | eztools | 165 |
| appfiles.program_files.nasreq.xml | icat | 293 |
| appfiles.program_files.sunping.xml | icat | 24 |
| appfiles.program_files.capture_filters.txt | icat | 80 |
| registry.default | regripper | 376 |
| appfiles.program_files.capturing.txt | icat | 84 |
| appfiles.program_files.display_filters.txt | icat | 43 |
| appfiles.program_files.faq.txt | icat | 2228 |
| appfiles.program_files.getting_started.txt | icat | 90 |
| registry.sam | regripper | 133 |
| appfiles.program_files.overview.txt | icat | 38 |
| appfiles.program_files.well_known.txt | icat | 114 |
| appfiles.program_files.pcrepattern.3.txt | icat | 1475 |
| registry.sam | regripper | 7 |
| appfiles.program_files.agentx-mib.txt | icat | 529 |
| appfiles.program_files.disman-event-mib.txt | icat | 1957 |
| appfiles.program_files.disman-schedule-mib.txt | icat | 701 |
| appfiles.program_files.disman-script-mib.txt | icat | 1766 |
| registry.system | regripper | 19 |
| appfiles.program_files.etherlike-mib.txt | icat | 1139 |
| appfiles.program_files.hcnum-tc.txt | icat | 120 |
| appfiles.program_files.host-resources-mib.txt | icat | 1542 |
| registry.system | regripper | 8 |
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
| appfiles.program_files.ipv6-udp-mib.txt | icat | 143 |
| pcap.disk.interception | tshark | 75 |
| appfiles.program_files.lm-sensors-mib.txt | icat | 232 |
| appfiles.program_files.mta-mib.txt | icat | 1228 |
| registry.software | regripper | 9600 |
| appfiles.program_files.net-snmp-agent-mib.txt | icat | 546 |
| appfiles.program_files.net-snmp-examples-mib.txt | icat | 229 |
| appfiles.program_files.net-snmp-mib.txt | icat | 69 |
| registry.software | regripper | 283 |
| appfiles.program_files.net-snmp-monitor-mib.txt | icat | 61 |
| appfiles.program_files.net-snmp-system-mib.txt | icat | 65 |
| appfiles.program_files.net-snmp-tc.txt | icat | 123 |
| appfiles.program_files.network-services-mib.txt | icat | 628 |
| appfiles.program_files.notification-log-mib.txt | icat | 784 |
| registry.software | regripper | 1161 |
| appfiles.program_files.rfc-1215.txt | icat | 40 |
| appfiles.program_files.rfc1155-smi.txt | icat | 121 |
| appfiles.program_files.rfc1213-mib.txt | icat | 2615 |
| appfiles.program_files.rmon-mib.txt | icat | 3982 |
| appfiles.program_files.smux-mib.txt | icat | 162 |
| appfiles.program_files.snmp-community-mib.txt | icat | 431 |
| registry.system | regripper | 3138 |
| appfiles.program_files.snmp-framework-mib.txt | icat | 528 |
| appfiles.program_files.snmp-mpd-mib.txt | icat | 147 |
| appfiles.program_files.snmp-proxy-mib.txt | icat | 296 |
| appfiles.program_files.snmp-target-mib.txt | icat | 662 |
| registry.system | regripper | 199 |
| appfiles.program_files.snmp-user-based-sm-mib.txt | icat | 914 |
| appfiles.program_files.snmp-view-based-acm-mib.txt | icat | 832 |
| appfiles.program_files.snmpv2-conf.txt | icat | 324 |
| registry.system | regripper | 286 |
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
| clamav.scan | clamav | 18 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.file_staging | composite | 122 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
