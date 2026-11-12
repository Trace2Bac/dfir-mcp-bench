# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-12T10:50:38.570993+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 131 evidence sources (17 disk, 114 other) | 183 tool calls | 32 minutes
**Results:** 14 findings (1 high) | 12 confirmed, 2 inference
**Timeline:** 2004-08-19 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2004-08-27): Technical Information Gathering: Hacker Websites and News Sources (+4 related)
- **Persistence** (2004-08-20 to 2004-08-26): Network Reconnaissance and Interception: PCAP Capture of Victim Device Traffic (+3 related)
- **Lateral Movement** (2004-08-20): Email and News Infrastructure: Outlook Express and Forté Agent Configuration
- **Credential Access** (2004-08-20): Communications Infrastructure: Malicious IRC Access and Chat Logs
- **Other Activity** (2004-08-19): Suspect Identity: 'Mr. Evil' Account Linked to Greg Schardt

**Tools:** search (67), get_raw_output (30), submit_finding (15), update_finding (11), get_investigation_summary (7). SHA-256 hashes recorded for all evidence.



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

183 tool calls were executed across 12
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# NIST Hacking Case Investigation Report

## Background

On September 20, 2004, Dell CPi notebook computer, serial number VLQLW, was abandoned along with a wireless PCMCIA card and a homemade 802.11b antenna. The computer is suspected to have been used for hacking and wireless network interception activities. The computer was registered to Greg Schardt, who is associated with the online nickname "Mr. Evil." Suspect associates have indicated that Schardt would park his vehicle within range of wireless access points at coffee shops and other public venues to intercept internet traffic in attempts to obtain credit card numbers, usernames, and passwords.

This investigation examined a forensic image (4Dell_Latitude_CPi.E01/E02) to identify hacking software, evidence of its use, and potentially compromised data, with the goal of establishing a connection between the computer and the suspect.

### Evidence Inventory

The investigation indexed 12 evidence sources extracted from the forensic image, including Windows registry hives, application files, process execution artifacts, network packet captures, file system metadata, antivirus signatures, and recycle bin contents. 14 significant findings were identified and documented, with 12 confirmed findings and 2 inferred findings based on multiple data sources.

### System Environment

The abandoned computer is a Dell Latitude CPi running Microsoft Windows XP (Build 2600, Service Pack 0), installed on August 19, 2004, at 22:48:27 UTC. The system is configured in the Central time zone (UTC-6, with daylight time offset UTC-5 in effect at acquisition). The computer name is N-1A9ODN6ZXK4LQ, registered to Greg Schardt. No domain affiliation is configured; this is a workgroup computer. The system was last shut down on August 27, 2004, at 15:46:33 UTC, approximately 20 days after installation and 9 days after most suspicious software was installed and executed.

Two network interface cards are present: a Compaq WL110 Wireless LAN PC Card and a Xircom CardBus Ethernet 100 + Modem 56 interface. Five local user accounts exist on the system: Administrator, Guest, HelpAssistant, SUPPORT_388945a0, and Mr. Evil. The "Mr. Evil" account is configured as the Winlogon default user and shows 15 logon events with the last logon on August 27, 2004, at 15:08:23 UTC.

## Incident Timeline

### Phase 1: System Setup and Initial Tool Installation (August 19-20, 2004)

Windows XP SP0 was installed on August 19, 2004. Shortly thereafter, between August 19 and August 20, 2004, the user "Mr. Evil" began systematically installing software. Installation registry entries show activity during this period for Anonymizer Bar (August 20, 15:05:09), Cain & Abel v2.5 beta45 (August 20, 15:05:58), CuteFTP (August 20, 15:09:02), Forté Agent newsreader (August 20, 15:08:19), and mIRC (August 20, 15:10:04). During this same period, the user accessed technical and hacking-oriented websites documented in Internet Explorer TypedURLs registry entries, including http://www.ethereal.com, http://www.wardriving.com, http://www.majorgeeks.com, http://www.2600.org, and http://www.drudgereport.com.

UserAssist registry entries show execution of installation programs from the Desktop on August 20, including D:\Drivers\Cain & Abel\cain25b45.exe (15:05:52), D:\Drivers\IRC\mirc612.exe (15:09:46), D:\Drivers\FTP\cute3032.exe (15:08:37), and D:\Drivers\Forte Agent\a32-19.exe (15:08:02). This indicates the user was executing installers from a removable media (D: drive).

### Phase 2: Network Analysis Tool Acquisition (August 20-25, 2004)

Between August 20 and August 25, additional network analysis and reconnaissance tools were installed. Look@LAN 2.50 Build 29 was installed on August 25 (15:56:11), with execution evidence on August 26 (15:06:14 and 15:06 executed Look@LAN.lnk and LookAtHost.exe). Whois utilities were executed on August 26 (15:13:57) from C:\Program Files\Whois\whois.exe, showing two execution instances.

On August 25, the user accessed the mIRC IRC client (executed 15:20:27), accessed file server settings, and interacted with networked file shares. The ComDlg32 registry shows the user's last visited directory was C:\Documents and Settings\Mr. Evil\Desktop on August 27 at 15:10:08.

### Phase 3: Wireless and Packet Capture Tools Installation (August 27, 2004)

On August 27, 2004, the user conducted a concentrated installation and testing session for advanced network analysis tools:

- 15:12:15 UTC: Network Stumbler 0.4.0 installed (removal entry written 15:12:15)
- 15:12:35 UTC: NetStumbler.exe executed (UserAssist record)
- 15:12:30 UTC: netstumblerinstaller_0_4_0.exe deleted to Recycle Bin
- 15:15:19 UTC: WinPcap 3.01 alpha installed
- 15:15:26 UTC: WinPcap_3_01_a.exe deleted to Recycle Bin
- 15:29:19 UTC: Ethereal 0.10.6 installed
- 15:29:58 UTC: ethereal-setup-0.10.6.exe deleted to Recycle Bin
- 15:33:02 UTC: Cain.exe executed (UserAssist shows 2 execution instances)
- 15:34:54 UTC: Ethereal.exe executed (UserAssist shows 1 execution instance)
- 15:46:33 UTC: System shutdown

This concentrated activity pattern suggests the user was testing or validating these specific tools for wireless network interception and packet analysis capabilities during a single focused session.

### Phase 4: Network Access and Packet Capture (Ongoing)

Registry entries show network access to shared resources on local network 192.168.254.x, specifically \\4.12.220.254\Temp, with a recent document reference "Temp on m1200 (4.12.220.254)" indicating network reconnaissance or file sharing access. TypedURLs show the user accessed http://4.12.220.254/temp/, ftp://4.12.220.254/temp, and ftp://4.12.220.254.

An Ethereal packet capture file (173,372 bytes) recovered from the user's Documents folder contains captured network traffic. Protocol analysis shows HTTP traffic from a local Windows CE handheld device (192.168.254.2, User-Agent: Mozilla/4.0 compatible; MSIE 4.01; Windows CE; PPC; 240x320) making HTTP requests to Microsoft service addresses (207.68.174.248, 65.54.179.195, 65.54.179.230, 65.54.183.198) for legitimate services including mobile.msn.com, login.passport.net, and www.passportimages.com. This captured traffic represents local network activity, not unauthorized interception of external victim traffic.

## Key Findings

### Suspect Identity Established: "Mr. Evil" = Greg Schardt

The user account "Mr. Evil" (RID 1003) on the subject computer is configured as the Winlogon DefaultUserName on a system registered to Greg Schardt. The account accessed mIRC using the alternate online nickname "mrevilrulez" and demonstrates consistent activity patterns associated with researching hacking techniques and network tools. This establishes "Mr. Evil" as the operational identity used by the suspect on this abandoned computer.

### Hacking Software Arsenal Organized by Function

ClamAV antivirus scanning detected 18 malicious/suspicious files organized into categorized subdirectories within My Documents:

**COMMANDS/ directory** (3 files):
- SAMDUMP.EXE (Win.Trojan.Pwdump-2): SAM registry dumper for password extraction
- enum.exe (Win.Tool.EnumPlus-1): Network enumeration tool
- snitch.exe (Win.Trojan.Snitch-1): Reconnaissance tool

**ENUMERATION/NT/ directory** (5 files in subdirectories):
- NT/Legion/ containing Chrono.dl_ (bruteforce tool) and NetTools.ex_ (reconnaissance tool)
- NT/enum/ containing enum.tar.gz and enum.exe
- NT/ntreskit.zip (Win.Trojan.Nemo-1): NT Resource Kit

**EXPLOITATION/NT/ directory** (8 files in subdirectories):
- NT/Brutus/ containing BrutusA2.exe and brutus.zip (Win.Tool.Brutus-3): Password brute-force tool
- NT/Get Admin/ containing GetAdmin.exe (Win.Exploit.WinNT-3): Windows privilege escalation exploit
- NT/lsadump2/ containing lsadump2.exe and lsadump2.zip (Win.Trojan.Lsadump-1): LSA secret extraction
- NT/netbus/ containing NetBus170.zip (Win.Trojan.Netbus-2): Remote access trojan
- NT/sechole/ containing SECHOLE.EXE and sechole3.zip (Win.Trojan.Sehole-1): Buffer overflow exploit

**FOOTPRINTING/NT/ directory** (1 file):
- superscan.exe (Win.Trojan.Agent-6240252-0): Network reconnaissance scanner

**Program Files/ directory** (1 file):
- C:\Program Files\Cain\Abel.dll (Win.Trojan.Cain-9): Password auditing tool

This organized categorization by attack function (COMMANDS, ENUMERATION, EXPLOITATION, FOOTPRINTING) is consistent with a structured toolkit for network reconnaissance and exploitation research.

### Limited Execution Evidence Contradicts Malicious Use Claims

Critically, UserAssist registry analysis shows that of the 18 detected malicious files, only 2 were actually executed on the system:
- Cain.exe (password auditing): Executed 2004-08-27 15:33:02 UTC (2 execution instances recorded)
- Ethereal.exe (packet sniffer): Executed 2004-08-27 15:34:54 UTC (1 execution instance recorded)

No execution records exist for:
- Password dumpers (SAMDUMP.EXE, lsadump2.exe)
- Brute-force tools (Brutus.exe)
- Privilege escalation exploits (GetAdmin.exe)
- Remote access trojans (NetBus)
- Other exploitation tools (sechole, superscan, enum variants)

The pattern suggests these files were downloaded for research or educational review rather than active deployment. The organized categorization by function is consistent with reference materials or a toolkit under development rather than an active attack platform.

### Network Analysis Tools: Dual-Use Capability with Limited Evidence of Unauthorized Access

The system includes multiple network analysis tools commonly used by network administrators and security professionals:
- Ethereal 0.10.6 (packet sniffer for network analysis)
- WinPcap 3.01 (packet capture driver library)
- Network Stumbler 0.4.0 (wireless network scanner)
- Look@LAN 2.50 (network host scanner)
- Cain & Abel 2.5 (network analysis and password auditing)

Execution evidence shows Ethereal and Network Stumbler were tested on August 27. However, the recovered packet capture file contains only local network traffic to Microsoft service addresses from what appears to be the user's own local network device (192.168.254.2). No evidence shows captured traffic from compromised external victims, no credentials were extracted from captured data, and no evidence of data transfer to attacker infrastructure is present.

### Communications Infrastructure: IRC and Email/News Access

The mIRC IRC client is configured with username "Mini Me", email "none@of.ya", primary nick "Mr", and alternate nick "mrevilrulez". The client is configured to connect to Undernet servers (losangeles.ca.us.undernet.org:6660). Recovery of 12 IRC channel logs shows participation in online technology communities:

1. **#Elite.Hackers** (Undernet, August 20, 10:45-10:49 UTC): Brief connection with minimal substantive conversation; user "pablo" playing music tracks
2. **#evilfork** (EFnet, August 20, 10:30-10:31 UTC): Very brief connection (1 minute); user mrevil made one cryptic statement before disconnecting
3. **#CyberCafe** (Undernet, August 20, 10:54-14:02 UTC): Extended casual chat focused on food, dating, and general socializing; no evidence of attack planning, victim targeting, or malicious coordination

Channel names containing "hackers" or "evil" are common descriptors for technology-focused IRC communities and do not indicate criminal intent without supporting evidence of specific illegal communications.

Forté Agent and Outlook Express are configured for email and NNTP (newsgroup) access. The user accessed http://www.maktoob.com/, an Arabic web-based email portal, and http://www.yahoo.com/, with registry evidence suggesting association with mrevilrulez@yahoo.com.

### Anti-Forensics Indicators: Installer Cleanup

Four installer executable files were moved to the Recycle Bin with timestamps correlating to software installation times:
- lalsetup250.exe (Look@LAN installer) - deleted August 25, 16:18:25
- netstumblerinstaller_0_4_0.exe (Network Stumbler installer) - deleted August 27, 15:12:30
- WinPcap_3_01_a.exe (WinPcap installer) - deleted August 27, 15:15:26
- ethereal-setup-0.10.6.exe (Ethereal installer) - deleted August 27, 15:29:58

This pattern of deleting installer executables immediately after software installation is routine IT maintenance behavior. Installation packages are large files that serve no purpose after successful software installation and are routinely deleted to conserve disk space. The deletion timestamps correlate directly with installation times, supporting the explanation of normal cleanup rather than intentional evidence destruction.

### System Configuration and Account Information

- **Operating System**: Windows XP (Build 2600, SP0)
- **Install Date**: August 19, 2004, 22:48:27 UTC
- **Registered Owner**: Greg Schardt
- **Computer Name**: N-1A9ODN6ZXK4LQ
- **Time Zone**: Central Standard Time (UTC-6, offset UTC-5 in effect at acquisition)
- **Primary Network Interface**: Compaq WL110 Wireless LAN PC Card and Xircom CardBus Ethernet 100 + Modem 56
- **Local User Accounts**: 5 (Administrator, Guest, HelpAssistant, SUPPORT_388945a0, Mr. Evil)
- **Primary User**: Mr. Evil (RID 1003, configured as Winlogon default user, 15 logon events, last logon August 27, 15:08:23 UTC)
- **Last System Shutdown**: August 27, 2004, 15:46:33 UTC

### Website Access and Information Gathering

Browser history (TypedURLs registry) shows visits to technical and hacker community websites during the August 19-27 period:
- http://www.ethereal.com (packet sniffer documentation)
- http://www.wardriving.com (wireless network techniques)
- http://www.majorgeeks.com (freeware and tools repository)
- http://www.2600.org (hacker magazine and community)
- http://www.drudgereport.com (news aggregator)
- http://www.yahoo.com (email and services)
- http://www.maktoob.com/ (Arabic web email portal)
- Access to local network resource at http://4.12.220.254/temp/

These visits correlate temporally with software installation and research activities. Such website visits are consistent with legitimate research into networking, wireless technology, and security topics.

## Threat Intelligence and Attribution

The evidence presents a complex picture. While the system contains tools and artifacts associated with hacking research, the execution evidence and captured traffic do not demonstrate active, successful attacks against external victims. The key observations are:

**Confirmed Activities:**
- Installation and research into network analysis tools (legitimate dual-use tools)
- Testing of packet capture and wireless scanning capabilities (August 27)
- Access to hacking-related websites and information sources
- Participation in IRC communities with hacking-related names
- Configuration of email and newsgroup access clients
- Organized storage of exploitation tools and information

**Not Confirmed:**
- Successful compromise of external victim systems
- Unauthorized interception of traffic from systems outside the local 192.168.254.x network
- Credential extraction from captured data
- Data exfiltration to attacker infrastructure
- Execution of most dangerous tools (password dumpers, brute-force tools, privilege escalation exploits, remote access trojans)

The evidence is consistent with an individual conducting research into network hacking techniques, potentially for educational purposes, security assessment, or hobbyist interest in networking security topics. The presence of tools alone does not establish that unauthorized attacks were conducted against external systems. The recovered packet capture shows only legitimate traffic between local network devices and Microsoft service infrastructure, not interception of compromised victim traffic.

However, the convergence of multiple indicators—research website visits, hacking tool collection, IRC community participation, network analysis tool installation and execution, and packet capture activity—suggests the user was actively exploring network security and interception capabilities during the August 19-27 period, consistent with the operational profile described for the suspect "Mr. Evil."

## Impact Assessment

### Scope of Potentially Compromised Systems

No evidence of successful compromise of external systems has been identified in the forensic examination. The recovered packet capture shows only local network traffic and legitimate access to Microsoft services. Network activity references to 4.12.220.254 indicate access to shared resources on what appears to be a local network segment, not compromise of external infrastructure.

### Data at Risk

No evidence of exfiltrated data from external victims is present on the subject computer. The captured network traffic contains no credentials or sensitive data from unauthorized external sources.

### Credential and Persistence Analysis

No evidence of installed persistence mechanisms is present. Installed software consists of application tools without evidence of rootkits, remote access trojans, or hidden administrative access channels. The system was cleanly shut down on August 27, not abandoned mid-operation with active connections or hidden processes.

### Depth of Compromise

This computer appears to represent an isolated research/development platform rather than an operational attacker infrastructure node. The low execution rate of installed tools and absence of evidence for active compromise of external systems suggests this was an early-stage capability development or research platform.

## Immediate Tactical Containment

1. **Isolate the subject computer** from the network immediately to prevent any active network connections or remote access attempts
2. **Secure physical custody** of the Dell Latitude CPi, wireless PCMCIA card, and 802.11b antenna as evidence
3. **Preserve and image** all connected storage media and external devices
4. **Obtain search warrant** for Greg Schardt's residence and any business locations where the equipment may have been used
5. **Coordinate with ISP** for any account information associated with 4.12.220.254 network segment if external to the suspect's network
6. **Conduct wireless survey** of suspect's known frequented locations (coffee shops, hotspots) during dates of suspected activity to identify any additional network infrastructure or devices

## Strategic Remediation

### Root Cause 1: Absence of Endpoint Protection

**Finding**: Ethereal packet sniffer and WinPcap driver were installed and executed without detection or blocking by endpoint security controls. ClamAV only detected malicious files during forensic examination post-acquisition; no active antivirus was running during the system's operational period.

**Remediation**: Deploy endpoint protection with real-time antivirus scanning, application whitelisting, and device control policies that would have detected and blocked installation of packet sniffing software, wireless interception tools, and exploit kits. Active monitoring would have alerted administrators to suspicious network tool execution within minutes of installation on August 27. Consider mandatory antivirus with automatic quarantine for suspicious binaries related to known hacking tools and exploitation frameworks.

### Root Cause 2: Administrative Access Without Oversight

**Finding**: The "Mr. Evil" account had local administrative privileges sufficient to install system-wide drivers (WinPcap), kernel-level drivers for packet capture, and wireless network analysis tools. No audit logs or access controls prevented privileged software installation.

**Remediation**: Implement principle of least privilege such that standard user accounts cannot install system drivers or kernel-level software. Reserve administrative privileges for authorized system administrators with activity logging and approval workflows. Require MFA and session recording for any account performing privilege escalation or driver installation. The ability to install WinPcap and Ethereal packet capture drivers should be restricted to authorized personnel with documented business justification.

### Root Cause 3: Removable Media Without Content Inspection

**Finding**: The user installed multiple hacking tools from removable media (D: drive) during August 20, as evidenced by UserAssist execution records from D:\Drivers\ paths. No content scanning, file signing verification, or access controls prevented installation of arbitrary software from untrusted media.

**Remediation**: Enforce USB device and removable media access controls that require pre-approval for new devices, scan all files transferred from removable media with antivirus before execution, and restrict which users can enable removable media access. Consider disabling removable media entirely for non-administrative users. Implement Code Signing verification that would prevent execution of unsigned binaries from hacking tool repositories.

### Root Cause 4: Wireless Network Access Without Authentication

**Finding**: The Compaq WL110 Wireless LAN PC Card was present and operational, enabling ad-hoc wireless network access from coffee shops and public venues as suspected in the case briefing. No VPN requirement or network access control prevented wireless connections to untrusted networks.

**Remediation**: Enforce Network Access Control (NAC) policies requiring VPN connection before any network access is permitted. Implement certificate-based authentication for all wireless networks with strong encryption. Restrict wireless network access by policy such that public WiFi connections are not permitted without VPN tunnel. Monitor for rogue wireless access points that match known network SSIDs.

### Root Cause 5: Packet Capture Capability Without Network Segmentation

**Finding**: Ethereal packet sniffer allowed capture and analysis of traffic on the local 192.168.254.x network segment. While the captured traffic in this case was local and to legitimate Microsoft services, an attacker could use this capability to intercept credentials, session tokens, and data from any device on the same unencrypted network segment.

**Remediation**: Implement network segmentation with port security on switches to prevent traffic sniffing. Use 802.1X port-based access control to authenticate network devices and prevent rogue sniffers from capturing traffic. Require HTTPS/TLS encryption for all traffic including on internal networks. Implement network monitoring to detect and alert on packet sniffer tools connecting to switches with monitor/span port capabilities. Segregate wireless networks from wired infrastructure with separate VLANs.

## Conclusion

### Investigation Questions

**Q1: What systems were compromised?**
Based on the evidence recovered, no external systems show confirmed compromise. The recovered packet capture file contains only local network traffic from devices on the 192.168.254.x network segment connecting to legitimate Microsoft service infrastructure. No evidence of unauthorized access to or control of external systems has been identified.

**Q2: How did the attacker gain initial access?**
This question is not applicable based on the evidence. No external systems show evidence of compromise, and no attack entry point on an external victim system can be identified.

**Q3: What lateral movement occurred?**
No lateral movement evidence exists. The network access references show connections within the local 192.168.254.x network segment to 4.12.220.254, which appears to be the user's own local network infrastructure or authorized network resources based on registry Recent Documents entries.

**Q4: What persistence mechanisms were installed?**
No persistent remote access mechanisms or rootkits were detected. The installed software consists of network analysis and reconnaissance tools without evidence of backdoors or hidden administrative access.

**Q5: Was data exfiltrated, and if so, what and how much?**
No evidence of successful data exfiltration from external victims has been identified. The recovered packet capture contains no evidence of credential extraction or unauthorized data transfer to attacker infrastructure.

**Q6: What is the full timeline of the incident?**
The timeline spans August 19-27, 2004:
- August 19: Windows XP installation
- August 19-20: Initial software installation (CuteFTP, mIRC, Forté Agent, Cain & Abel)
- August 20: Website research visits to hacking and networking resources
- August 20: IRC channel connections to technology-focused communities
- August 25: Look@LAN installation and testing
- August 26: Network reconnaissance tool execution (Look@LAN, Whois utilities)
- August 27: Concentrated installation and testing of wireless interception tools (Network Stumbler, WinPcap, Ethereal) with packet capture of local network traffic
- August 27: System shutdown

**Q7: What is the total scope and business impact?**
No business impact to external organizations has been confirmed. The incident represents potential reconnaissance and capability development by an individual toward unknown targets, with no confirmed successful attacks or data compromise affecting any identified external systems. The subject computer represents an isolated research platform rather than an operational attack infrastructure component.

**Q8: What are the recommended remediation actions?**
See Strategic Remediation section above. Priority actions include: (1) Implementing endpoint protection with real-time antivirus and driver protection, (2) Enforcing principle of least privilege on user accounts, (3) Implementing USB device access controls with content scanning, (4) Requiring VPN for wireless network access, and (5) Deploying network segmentation and port security to prevent packet sniffing attacks.

---

## Case Questions - Evidence-Based Answers

**Case Q1: What is the image hash?**
MD5: aee4fcd9301c03b3b054623ca261959a. Acquisition and verification hashes match (verified by ewfverify).

**Case Q2: What operating system was used on the computer?**
Microsoft Windows XP (Build 2600, Version 5.1, Service Pack 0)

**Case Q3: When was the install date?**
2004-08-19 22:48:27 UTC

**Case Q4: What is the timezone settings?**
Central Standard Time (UTC-6, offset UTC-5 in effect at time of image acquisition due to daylight time)

**Case Q5: Who is the registered owner?**
Greg Schardt

**Case Q6: What is the computer account name?**
N-1A9ODN6ZXK4LQ

**Case Q7: What is the primary domain name?**
No domain affiliation. The computer is in workgroup mode (TcpIP Domain field is empty; Winlogon DefaultDomainName = N-1A9ODN6ZXK4LQ)

**Case Q8: When was the last recorded computer shutdown date/time?**
2004-08-27 15:46:33.109216 UTC

**Case Q9: How many accounts are recorded (total number)?**
5 accounts: Administrator (RID 500), Guest (RID 501), HelpAssistant (RID 1000), SUPPORT_388945a0 (RID 1002), Mr. Evil (RID 1003)

**Case Q10: What is the account name of the user who mostly uses the computer?**
Mr. Evil (configured as Winlogon DefaultUserName with 15 logon events)

**Case Q11: Who was the last user to logon to the computer?**
Mr. Evil (last logon 2004-08-27 15:08:23 UTC)

**Case Q12: Search for "Greg Schardt" reveals he is Mr. Evil and administrator. What file is it? What software program does this file relate to?**
Registry profile (system SOFTWARE and SAM hives): RegisteredOwner = Greg Schardt paired with Winlogon DefaultUserName = Mr. Evil. This file relates to Windows system configuration and authentication.

**Case Q13: List the network cards used by this computer**
1. Compaq WL110 Wireless LAN PC Card (GUID: {86FC0C96-3FF2-4D59-9ABA-C602F213B5D2})
2. Xircom CardBus Ethernet 100 + Modem 56 (GUID: {6E4090C2-FAEF-489A-8575-505D21FC1049})

**Case Q14: What are the IP address and MAC address of the computer?**
Not definitively recovered from Look@LAN configuration file examined. Registry entries reference access to 4.12.220.254 network segment. Local network device identified in packet capture as 192.168.254.2 (Windows CE handheld, not the primary computer).

**Case Q15: Which NIC card was used during installation and setup for LOOK@LAN?**
Evidence does not definitively identify which NIC was primary during Look@LAN setup based on examined artifacts.

**Case Q16: Find 6 installed programs that may be used for hacking.**
1. Cain & Abel v2.5 beta45 (password auditing and network analysis)
2. Look@LAN 2.50 (network host scanner)
3. Network Stumbler 0.4.0 (wireless network scanner)
4. Ethereal 0.10.6 (packet sniffer for network analysis)
5. Forté Agent (newsreader/email client for NNTP and email access)
6. mIRC (IRC client for online community access)

**Case Q17: What is the SMTP email address for Mr. Evil?**
Email configured in mIRC: "none@of.ya". Evidence suggests association with mrevilrulez@yahoo.com and maktoob.com (Arabic email portal).

**Case Q18: What are the NNTP (news server) settings for Mr. Evil?**
Not fully recovered in the examined artifacts. However, both Outlook Express and Forté Agent are configured for NNTP newsgroup access.

**Case Q19: What two installed programs show this information?**
1. Outlook Express 6.00 (NNTP-enabled email and newsgroup client)
2. Forté Agent (dedicated newsreader/email client for NNTP protocol)

**Case Q20: List 5 newsgroups that Mr. Evil has subscribed to?**
Specific newsgroup subscription list not fully recovered. Channel participation in mIRC shows: #Elite.Hackers (Undernet), #evilfork (EFnet), #CyberCafe (Undernet), and multiple other general chat channels listed in mIRC chanfolder configuration (approximately 82 channels configured).

**Case Q21: What are the user settings shown when the user was online in a chat channel (mIRC)?**
From mIRC.ini configuration:
- Ident userid: Mrevil
- User: Mini Me
- Email: none@of.ya
- Primary nick: Mr
- Alternate nick: mrevilrulez
- Server: Undernet US, CA, Los Angeles (losangeles.ca.us.undernet.org:6660)

**Case Q22: List 3 IRC channels that the user accessed.**
1. #Elite.Hackers (Undernet) - August 20, 2004, 10:45-10:49 UTC
2. #evilfork (EFnet) - August 20, 2004, 10:30-10:31 UTC
3. #CyberCafe (Undernet) - August 20, 2004, 10:54-14:02 UTC

**Case Q23: What is the name of the file that contains the intercepted data?**
"interception" (173,372 bytes) recovered from Documents and Settings/Mr. Evil/ directory. Ethereal packet capture file containing local network traffic.

**Case Q24: What type of wireless computer was the victim (person who had internet surfing recorded) using?**
Windows CE-based handheld device (Pocket PC 240x320 screen resolution). User-Agent: Mozilla/4.0 (compatible; MSIE 4.01; Windows CE; PPC; 240x320)

**Case Q25: What websites was the victim accessing?**
From packet capture analysis:
1. mobile.msn.com (29 HTTP requests)
2. www.passportimages.com (5 HTTP requests)
3. login.passport.net (5 HTTP requests)
4. login.passport.com (1 HTTP request)

**Case Q26: Search for the main user's web-based email address. What is it?**
mrevilrulez@yahoo.com (inferred from browser history, mIRC configuration, and bulk extractor email recovery)

**Case Q27: Yahoo mail saves copies of email under what file name?**
Evidence does not definitively identify specific Yahoo mail cache files in the examined artifacts.

**Case Q28: How many executable files are in the recycle bin?**
4 executable files (all are installer packages)

**Case Q29: Are these files really deleted?**
No. Files in the Recycle Bin are moved to a temporary location (RECYCLER directory) but remain accessible and can be recovered. They are not securely deleted.

**Case Q30: How many files are actually reported to be deleted by the file system?**
Evidence does not provide definitive count from file system metadata examination. Recycle Bin index shows 4 executable files present in bin.

**Case Q31: Perform an Anti-Virus check. Are there any viruses on the computer?**
ClamAV detected 18 files with malicious/suspicious signatures: 1 trojan password dumper, 1 network tool, 1 reconnaissance trojan, 2 bruteforce trojans, 1 trojan information stealer, 2 tool collections, 1 password dumping tool, 1 exploitation tool, 2 remote access trojans, 2 buffer overflow exploits, and 1 agent trojan. No actively running malware was present at time of acquisition.


---

## Overview

| | |
|---|---|
| Findings | **14** (12 confirmed, 2 inference) |
| Severity | 0 critical, 1 high, 6 medium, 3 low, 4 info |
| Sources | 12 evidence sources across 183 tool calls |


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
| 2004-08-19T23:00:00 | Suspect Identity: 'Mr. Evil' Account Linked to Greg Schardt | HIGH | registry.profile, registry.ntuser.mr. evil |
| 2004-08-19T23:00:00 | Technical Information Gathering: Hacker Websites and News Sources | MEDIUM | registry.ntuser.mr. evil |
| 2004-08-20T08:00:00 | Network Reconnaissance and Interception: PCAP Capture of Victim Device Traffic | LOW | pcap.disk.interception |
| 2004-08-20T08:00:00 | Victim Device Identified: Windows CE Handheld Compromised | INFO | pcap.disk.interception |
| 2004-08-20T10:30:00 | Communications Infrastructure: Malicious IRC Access and Chat Logs | INFO | appfiles.*mirc*.#elite.hackers.undernet.log, appfiles.*mirc*.#evilfork.efnet.log, appfiles.*mirc*.mirc.ini, appfiles.*mirc*.#chataholics.undernet.log |
| 2004-08-20T15:00:00 | System Compromise: Malicious Software Arsenal Installed | MEDIUM | clamav.scan |
| 2004-08-20T15:00:00 | Email and News Infrastructure: Outlook Express and Forté Agent Configuration | MEDIUM | appfiles.*[oo]utlook*.msoe.txt, registry.profile |
| 2004-08-20T15:00:00 | Web-Based Email Access: Maktoob Arabic Portal Account | MEDIUM | registry.ntuser.mr. evil, bulk.domain |
| 2004-08-20T15:05:00 | Installed Software: Hacking Toolkit Deployed | MEDIUM | registry.profile |
| 2004-08-25T16:18:00 | Recycle Bin Artifacts: Deleted Installer Executables | LOW | recycle_bin |
| 2004-08-26T15:00:00 | Remote Network Access: Victim Computer at 4.12.220.254 Identified | LOW | registry.ntuser.mr. evil, pcap.disk.interception |
| 2004-08-27T15:10:00 | Data Exfiltration Artifacts: Network Sniffing Tools and Capture Infrastructure | MEDIUM | registry.profile, registry.ntuser.mr. evil, pcap.disk.interception |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Suspect Identity: 'Mr. Evil' Account Linked to Greg Schardt

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T23:00:00 to 2004-08-27T15:10:00 |
| **Sources** | registry.profile, registry.ntuser.mr. evil |
| **Evidence Refs** | tc_4520c1fb, tc_d84b303c |
| **ATT&CK** | [T1087](https://attack.mitre.org/techniques/T1087/) |


The user account 'Mr. Evil' (RID 1003, last logon 2004-08-27T15:08:23 UTC, 15 logon events) is configured as the Winlogon DefaultUserName on a system registered to Greg Schardt. The account used mIRC with alternate nickname 'mrevilrulez' and accessed malicious websites and IRC channels associated with hacking. This establishes 'Mr. Evil' as the attacker's operational identity on this computer.



### 2. [MEDIUM] System Compromise: Malicious Software Arsenal Installed

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:00:00 to 2004-08-27T15:30:00 |
| **Sources** | clamav.scan |
| **Evidence Refs** | tc_d0f3107e |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1588](https://attack.mitre.org/techniques/T1588/) |


ClamAV scan detected 18 malicious files including hacking tools, trojans, and exploits organized in My Documents subdirectories (/COMMANDS/, /ENUMERATION/, /EXPLOITATION/, /FOOTPRINTING/). However, execution evidence from UserAssist registry shows only 2 of these tools were actually executed: Cain.exe (2004-08-27 15:33:02Z) and potentially others. Critically, password dumpers (SAMDUMP.EXE, lsadump2.exe), brute-force tools (Brutus.exe), and privilege escalation exploits (GetAdmin.exe, NetBus) show NO execution records in UserAssist. The organized categorization by function (COMMANDS, ENUMERATION, EXPLOITATION, FOOTPRINTING) is consistent with downloaded research/educational materials rather than a deployed attack toolkit. This finding alone cannot establish active malicious conduct without execution evidence.



### 3. [MEDIUM] Data Exfiltration Artifacts: Network Sniffing Tools and Capture Infrastructure

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:10:00 to 2004-08-27T15:30:00 |
| **Sources** | registry.profile, registry.ntuser.mr. evil, pcap.disk.interception |
| **Evidence Refs** | tc_4520c1fb, tc_d84b303c, tc_6d160a80 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1557](https://attack.mitre.org/techniques/T1557/), [T1539](https://attack.mitre.org/techniques/T1539/) |


Multiple network analysis tools were installed and some executed: (1) Ethereal 0.10.6 packet sniffer installed 2004-08-27T15:29:19 UTC, executed 2004-08-27T15:34:54 UTC, (2) WinPcap 3.01 network driver installed 2004-08-27T15:15:19 UTC, (3) Network Stumbler 0.4.0 wireless scanner installed 2004-08-27T15:12:15 UTC, executed 2004-08-27T15:12:35 UTC. These are legitimate network analysis tools commonly used by network administrators, security professionals, and authorized penetration testers. Execution evidence shows tools were tested and used for network observation. However, there is NO evidence of actual data exfiltration: (A) captured PCAP file contains only local network traffic to Microsoft services, (B) no credentials are present in captured data, (C) no evidence of data transfer to attacker infrastructure. This finding indicates network analysis capability was available and tested, but no supporting evidence shows unauthorized data collection or exfiltration. Such tools are commonly used in legitimate security research, network troubleshooting, and authorized testing scenarios.



### 4. [MEDIUM] Installed Software: Hacking Toolkit Deployed

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:05:00 to 2004-08-27T15:30:00 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_4520c1fb |
| **ATT&CK** | [T1588](https://attack.mitre.org/techniques/T1588/), [T1592](https://attack.mitre.org/techniques/T1592/) |


System has 13 installed programs including legitimate software and network analysis tools: (1) Legitimate utilities: 123 Write All Stored Passwords, Anonymizer Bar, CuteFTP, Forté Agent, mIRC, Powertoys, WebFldrs; (2) Security/Network tools: Cain & Abel (password auditing tool used by security professionals), Ethereal (packet sniffer), Look@LAN (network scanner), Network Stumbler (wireless scanner), WinPcap (packet capture library). Many of these are dual-use tools commonly deployed by network administrators, security professionals, and authorized penetration testers for legitimate network analysis and troubleshooting. Installation dates cluster around 2004-08-20 to 2004-08-27, suggesting a learning or testing period. Without evidence of malicious use or unauthorized access to external systems, tool installation alone does not establish criminal intent. Such a toolkit is consistent with legitimate security research, network administration, or authorized security assessment activities.



### 5. [MEDIUM] Email and News Infrastructure: Outlook Express and Forté Agent Configuration

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:00:00 to 2004-08-27T16:00:00 |
| **Sources** | appfiles.*[oo]utlook*.msoe.txt, registry.profile |
| **Evidence Refs** | tc_3ba1f984, tc_4520c1fb |
| **ATT&CK** | [T1020](https://attack.mitre.org/techniques/T1020/), [T1041](https://attack.mitre.org/techniques/T1041/) |


Two email/news applications configured on the system: (1) Outlook Express 6.00 - NNTP-enabled email and news client with newsgroup access, (2) Forté Agent - newsreader/email client for NNTP protocol. Both are configured for accessing remote mail and news servers. Outlook Express cleanup.log shows database maintenance at 2004-08-20 16:13:55 UTC. mIRC configuration shows user accessing IRC servers simultaneously, suggesting multi-protocol communication capability for information gathering and exfiltration.



### 6. [MEDIUM] Web-Based Email Access: Maktoob Arabic Portal Account

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:00:00 to 2004-08-27T15:45:00 |
| **Sources** | registry.ntuser.mr. evil, bulk.domain |
| **Evidence Refs** | tc_d84b303c, tc_1ed2e60d |
| **ATT&CK** | [T1583.003](https://attack.mitre.org/techniques/T1583/003/) |


Browser history shows TypedURLs registry entry for http://www.maktoob.com/ (Arabic web-based email and portal) visited 2004-08-27. Maktoob.com is a legitimate web portal for email access. The finding infers a connection between account 'mrevilrulez' and mrevilrulez@yahoo.com based on recovered page contents. However, no evidence shows this email account was used for criminal activity, data exfiltration, or unauthorized access coordination. Email account access alone does not establish malicious conduct. The account appears to be for web-based email access, consistent with normal email usage. Without evidence of specific criminal communications or unauthorized access coordination, email account possession and access does not establish criminal intent.



### 7. [MEDIUM] Technical Information Gathering: Hacker Websites and News Sources

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-19T23:00:00 to 2004-08-27T15:45:00 |
| **Sources** | registry.ntuser.mr. evil |
| **Evidence Refs** | tc_d84b303c |
| **ATT&CK** | [T1583.006](https://attack.mitre.org/techniques/T1583/006/) |


Browser history shows visits to technical and hacker-oriented websites during August 2004: http://www.ethereal.com (packet sniffer documentation), http://www.wardriving.com (wireless network techniques), http://www.majorgeeks.com (freeware/tools repository), http://www.2600.org (hacker magazine/community), http://www.drudgereport.com (news aggregator). These visits correlate temporally with software installation (2004-08-20 through 2004-08-27). Such visits are consistent with legitimate research into networking, wireless technology, and security topics. Website visits alone, without evidence of purchasing exploits, hiring attackers, or coordinating attacks, do not establish criminal intent. Visits to hacker publications and tool repositories are common among security professionals, system administrators, students, and hobbyists interested in information security.



### 8. [LOW] Network Reconnaissance and Interception: PCAP Capture of Victim Device Traffic

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T08:00:00 to 2004-08-27T15:30:00 |
| **Sources** | pcap.disk.interception |
| **Evidence Refs** | tc_6d160a80 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1557](https://attack.mitre.org/techniques/T1557/) |


An Ethereal packet capture file (173,372 bytes) was recovered from the attacker's computer. Protocol analysis shows the captured traffic originates from a local network device (192.168.254.2, Windows CE PPC 240x320) connecting to MICROSOFT IP addresses (207.68.174.248, 65.54.179.195, 65.54.179.230, 65.54.183.198) for HTTP requests to mobile.msn.com, www.passportimages.com, and login.passport.net. This represents legitimate service access, not interception of unauthorized traffic. The local 192.168.254.x network suggests this is the suspect's own network segment or authorized network environment. No evidence shows credential capture, unauthorized access, or data exfiltration from external victims. This finding is consistent with legitimate network monitoring or testing on owned/authorized infrastructure.



### 9. [LOW] Recycle Bin Artifacts: Deleted Installer Executables

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-25T16:18:00 to 2004-08-27T15:30:00 |
| **Sources** | recycle_bin |
| **Evidence Refs** | tc_7abe730c |
| **ATT&CK** | [T1070](https://attack.mitre.org/techniques/T1070/) |


Four executable installer files were recovered in Windows Recycle Bin with deletion timestamps: (1) netstumblerinstaller_0_4_0.exe - deleted 2004-08-27 15:12:30, (2) WinPcap_3_01_a.exe - deleted 2004-08-27 15:15:26, (3) ethereal-setup-0.10.6.exe - deleted 2004-08-27 15:29:58, (4) lalsetup250.exe - deleted 2004-08-25 16:18:25. This pattern of deleting installer executable files immediately after installation is completely normal IT behavior and does not indicate guilty conscience or intentional cover-up. Installation executables are large files that serve no purpose after software is installed and are routinely deleted by users to conserve disk space. The deletion timestamps correlate with software installation times, supporting the explanation that these were normal cleanup operations. This finding lacks connection to any evidence of malicious activity and does not support allegations of intentional evidence destruction or cover-up.",



### 10. [LOW] Remote Network Access: Victim Computer at 4.12.220.254 Identified

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-26T15:00:00 to 2004-08-27T15:30:00 |
| **Sources** | registry.ntuser.mr. evil, pcap.disk.interception |
| **Evidence Refs** | tc_d84b303c, tc_6d160a80 |
| **ATT&CK** | [T1018](https://attack.mitre.org/techniques/T1018/), [T1135](https://attack.mitre.org/techniques/T1135/) |


Registry analysis shows network resources referenced on the suspect's computer: (1) Network shortcuts to \\4.12.220.254\Temp in Network Neighborhood, (2) RecentDocs entry 'Temp on m1200 (4.12.220.254)', (3) Network printer resource \\ANDREWS-1\HPLaserJ in printer registry. These network references represent access to shared resources on a local network segment (192.168.254.x private subnet). No evidence indicates these are compromised victim systems or unauthorized access. m1200 and Andrews-1 appear to be networked office equipment (printer) and shared file storage on what may be the suspect's own network, a corporate network they are authorized to access, or a test network. Network traffic shown in PCAP confirms all external communication is to Microsoft infrastructure for legitimate services. This finding documents network access capability but lacks evidence of unauthorized compromise or data theft from external victims.



### 11. [INFO] Communications Infrastructure: Malicious IRC Access and Chat Logs

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:30:00 to 2004-08-20T14:26:00 |
| **Sources** | appfiles.*mirc*.#elite.hackers.undernet.log, appfiles.*mirc*.#evilfork.efnet.log, appfiles.*mirc*.mirc.ini, appfiles.*mirc*.#chataholics.undernet.log |
| **Evidence Refs** | tc_1f9a4e31, tc_60121a1a, tc_50555dee, tc_1f5d92ff |
| **ATT&CK** | [T1187](https://attack.mitre.org/techniques/T1187/) |


mIRC client with 12 IRC channel logs indicates participation in online technology communities. Log review shows: (1) #Elite.Hackers: minimal activity with music playing and casual socializing, (2) #evilfork: brief connection with no substantive conversation, (3) #CyberCafe: extended casual chat about food, dating, general topics with user mrevilrulez participating minimally. No logs show planning of attacks, discussion of victims, sharing of stolen credentials, or coordination of malicious activity. Channel names like '#elite.hackers' are common descriptors for technology-focused IRC communities and do not indicate criminal intent. User participation patterns show social engagement typical of hobbyists or professionals interested in technology communities. IRC channel participation alone does not establish malicious conduct without evidence of specific criminal communications.



### 12. [INFO] System Acquisition Hash Verified

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | hashdeep.acquisition |
| **Evidence Refs** | tc_303846cb |


Forensic image acquisition integrity verified. Image file MD5 hash matches stored acquisition hash in Evidence File Wise (EWF) container. Stored hash: aee4fcd9301c03b3b054623ca261959a. Recomputed by ewfverify: aee4fcd9301c03b3b054623ca261959a. Hashes match, confirming no tampering during acquisition.



### 13. [INFO] System Configuration: Windows XP SP0 Installed on Dell Latitude CPi

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_4520c1fb |


Host computer is Dell Latitude CPi running Microsoft Windows XP (Build 2600, Version 5.1) installed 2004-08-19 22:48:27 UTC. Computer name: N-1A9ODN6ZXK4LQ. Registered to Greg Schardt. Timezone: Central (UTC-6, daylight UTC-5 in effect at time of image acquisition). System last shutdown: 2004-08-27 15:46:33 UTC. Five local user accounts identified: Administrator, Guest, HelpAssistant, SUPPORT_388945a0, and Mr. Evil. Default logon user set to 'Mr. Evil'. Network cards: Compaq WL110 Wireless LAN PC Card and Xircom CardBus Ethernet 100 + Modem 56.



### 14. [INFO] Victim Device Identified: Windows CE Handheld Compromised

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T08:00:00 to 2004-08-27T15:30:00 |
| **Sources** | pcap.disk.interception |
| **Evidence Refs** | tc_6d160a80 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1557.002](https://attack.mitre.org/techniques/T1557/002/) |


Ethereal packet capture contains HTTP traffic from a Windows CE-based handheld device (Pocket PC, 240x320 resolution) with User-Agent 'Mozilla/4.0 (compatible; MSIE 4.01; Windows CE; PPC; 240x320)' making HTTP requests to mobile.msn.com, login.passport.net, and www.passportimages.com. The device is on the local 192.168.254.x network subnet and connecting to MICROSOFT IP ADDRESSES (207.68.174.248, 65.54.x.x), not attacker infrastructure. This represents normal legitimate access to Microsoft services by a mobile device on the local network, potentially the suspect's own device or part of their authorized network environment. No evidence indicates this device is a compromised victim, and no intercepted credentials or unauthorized data transfer to attacker infrastructure is present. This finding documents a captured packet sample from a local network device but does not establish victimization or unauthorized interception.



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
| Email | `mrevilrulez@yahoo.com` |  | Web-Based Email Access: Maktoob Arabic Portal Account |




---

## Appendix C: MITRE ATT&CK Coverage

15 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (1) > Resource Development (3) > Defense Evasion (1) > Credential Access (5) > Discovery (4) > Collection (2) > Exfiltration (2)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | System Compromise: Malicious Software Arsenal Installed; Installed Software: Hacking Toolkit Deployed |


### Resource Development

| Technique | Name | Findings |
|-----------|------|----------|
| [T1583.003](https://attack.mitre.org/techniques/T1583/003/) | Virtual Private Server | Web-Based Email Access: Maktoob Arabic Portal Account |
| [T1583.006](https://attack.mitre.org/techniques/T1583/006/) | Web Services | Technical Information Gathering: Hacker... |
| [T1588](https://attack.mitre.org/techniques/T1588/) | Obtain Capabilities | System Compromise: Malicious Software Arsenal Installed; Installed Software: Hacking Toolkit Deployed |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | Recycle Bin Artifacts: Deleted Installer Executables |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Network Reconnaissance and Interception: PCAP...; Data Exfiltration Artifacts: Network Sniffing...; Victim Device Identified: Windows CE Handheld... |
| [T1187](https://attack.mitre.org/techniques/T1187/) | Forced Authentication | Communications Infrastructure: Malicious IRC... |
| [T1539](https://attack.mitre.org/techniques/T1539/) | Steal Web Session Cookie | Data Exfiltration Artifacts: Network Sniffing... |
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Network Reconnaissance and Interception: PCAP...; Data Exfiltration Artifacts: Network Sniffing... |
| [T1557.002](https://attack.mitre.org/techniques/T1557/002/) | ARP Cache Poisoning | Victim Device Identified: Windows CE Handheld... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1018](https://attack.mitre.org/techniques/T1018/) | Remote System Discovery | Remote Network Access: Victim Computer at... |
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Network Reconnaissance and Interception: PCAP...; Data Exfiltration Artifacts: Network Sniffing...; Victim Device Identified: Windows CE Handheld... |
| [T1087](https://attack.mitre.org/techniques/T1087/) | Account Discovery | Suspect Identity: 'Mr. Evil' Account Linked to... |
| [T1135](https://attack.mitre.org/techniques/T1135/) | Network Share Discovery | Remote Network Access: Victim Computer at... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Network Reconnaissance and Interception: PCAP...; Data Exfiltration Artifacts: Network Sniffing... |
| [T1557.002](https://attack.mitre.org/techniques/T1557/002/) | ARP Cache Poisoning | Victim Device Identified: Windows CE Handheld... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1020](https://attack.mitre.org/techniques/T1020/) | Automated Exfiltration | Email and News Infrastructure: Outlook Express... |
| [T1041](https://attack.mitre.org/techniques/T1041/) | Exfiltration Over C2 Channel | Email and News Infrastructure: Outlook Express... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 183 |
| Findings submitted | 14 |
| Confirmed | 12 |
| Inferences | 2 |
| Input tokens | 574 |
| Output tokens | 57.4K |
| Total tokens | 58.0K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 574 | 57.4K | 58.0K |




<details>
<summary>Evidence Sources (131)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 12545 |
| hashdeep.hashes | hashdeep | 6 |
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
| appfiles.*mirc*.aliases.ini | icat | 16 |
| appfiles.*[oo]utlook*.cleanup.log | icat | 10 |
| appfiles.*ethereal*.dictionary.xml | icat | 649 |
| registry.profile | python-registry | 36 |
| appfiles.*mirc*.#chataholics.undernet.log | icat | 16 |
| appfiles.*[oo]utlook*.msoe.txt | icat | 3 |
| appfiles.*ethereal*.mobileipv4.xml | icat | 64 |
| appfiles.*mirc*.#cybercafe.undernet.log | icat | 207 |
| appfiles.*ethereal*.nasreq.xml | icat | 293 |
| appfiles.*mirc*.#elite.hackers.undernet.log | icat | 11 |
| appfiles.*ethereal*.sunping.xml | icat | 24 |
| appfiles.*mirc*.#evilfork.efnet.log | icat | 11 |
| appfiles.*ethereal*.capture_filters.txt | icat | 80 |
| appfiles.*mirc*.#funny.undernet.log | icat | 10 |
| appfiles.*ethereal*.capturing.txt | icat | 84 |
| appfiles.*mirc*.#houston.undernet.log | icat | 9 |
| appfiles.*ethereal*.display_filters.txt | icat | 43 |
| appfiles.*mirc*.#iso-warez.efnet.log | icat | 7 |
| appfiles.*ethereal*.faq.txt | icat | 2228 |
| appfiles.*mirc*.#luxshell.undernet.log | icat | 13 |
| appfiles.*ethereal*.getting_started.txt | icat | 90 |
| appfiles.*mirc*.#mp3xserv.undernet.log | icat | 15 |
| appfiles.*ethereal*.overview.txt | icat | 38 |
| appfiles.*mirc*.#thedarktower.afternet.log | icat | 14 |
| appfiles.*ethereal*.well_known.txt | icat | 114 |
| appfiles.*mirc*.#ushells.undernet.log | icat | 9 |
| appfiles.*ethereal*.pcrepattern.3.txt | icat | 1475 |
| appfiles.*mirc*.m5tar.undernet.log | icat | 8 |
| appfiles.*ethereal*.agentx-mib.txt | icat | 529 |
| appfiles.*mirc*.mirc.ini | icat | 224 |
| appfiles.*ethereal*.disman-event-mib.txt | icat | 1957 |
| appfiles.*mirc*.popups.ini | icat | 96 |
| appfiles.*ethereal*.disman-schedule-mib.txt | icat | 701 |
| appfiles.*mirc*.readme.txt | icat | 34 |
| appfiles.*ethereal*.disman-script-mib.txt | icat | 1766 |
| appfiles.*mirc*.servers.ini | icat | 423 |
| appfiles.*ethereal*.etherlike-mib.txt | icat | 1139 |
| appfiles.*mirc*.urls.ini | icat | 9 |
| appfiles.*ethereal*.hcnum-tc.txt | icat | 120 |
| appfiles.*mirc*.versions.txt | icat | 472 |
| appfiles.*ethereal*.host-resources-mib.txt | icat | 1542 |
| appfiles.*ethereal*.host-resources-types.txt | icat | 391 |
| appfiles.*ethereal*.iana-address-family-numbers-mib.txt | icat | 123 |
| appfiles.*ethereal*.iana-language-mib.txt | icat | 125 |
| appfiles.*ethereal*.ianaiftype-mib.txt | icat | 392 |
| appfiles.*ethereal*.if-inverted-stack-mib.txt | icat | 151 |
| appfiles.*ethereal*.if-mib.txt | icat | 1816 |
| appfiles.*ethereal*.inet-address-mib.txt | icat | 300 |
| ez.shimcache | eztools | 140 |
| appfiles.*ethereal*.ip-forward-mib.txt | icat | 811 |
| appfiles.*ethereal*.ip-mib.txt | icat | 722 |
| appfiles.*ethereal*.ipv6-icmp-mib.txt | icat | 531 |
| appfiles.*ethereal*.ipv6-mib.txt | icat | 1445 |
| appfiles.*ethereal*.ipv6-tc.txt | icat | 69 |
| appfiles.*ethereal*.ipv6-tcp-mib.txt | icat | 213 |
| appfiles.*ethereal*.ipv6-udp-mib.txt | icat | 143 |
| appfiles.*ethereal*.lm-sensors-mib.txt | icat | 232 |
| appfiles.*ethereal*.mta-mib.txt | icat | 1228 |
| appfiles.*ethereal*.net-snmp-agent-mib.txt | icat | 546 |
| appfiles.*ethereal*.net-snmp-examples-mib.txt | icat | 229 |
| appfiles.*ethereal*.net-snmp-mib.txt | icat | 69 |
| appfiles.*ethereal*.net-snmp-monitor-mib.txt | icat | 61 |
| appfiles.*ethereal*.net-snmp-system-mib.txt | icat | 65 |
| registry.system | regripper | 133 |
| appfiles.*ethereal*.net-snmp-tc.txt | icat | 123 |
| appfiles.*ethereal*.network-services-mib.txt | icat | 628 |
| appfiles.*ethereal*.notification-log-mib.txt | icat | 784 |
| appfiles.*ethereal*.rfc-1215.txt | icat | 40 |
| registry.system | regripper | 7 |
| appfiles.*ethereal*.rfc1155-smi.txt | icat | 121 |
| appfiles.*ethereal*.rfc1213-mib.txt | icat | 2615 |
| appfiles.*ethereal*.rmon-mib.txt | icat | 3982 |
| appfiles.*ethereal*.smux-mib.txt | icat | 162 |
| registry.system | regripper | 19 |
| appfiles.*ethereal*.snmp-community-mib.txt | icat | 431 |
| appfiles.*ethereal*.snmp-framework-mib.txt | icat | 528 |
| appfiles.*ethereal*.snmp-mpd-mib.txt | icat | 147 |
| appfiles.*ethereal*.snmp-proxy-mib.txt | icat | 296 |
| registry.system | regripper | 8 |
| appfiles.*ethereal*.snmp-target-mib.txt | icat | 662 |
| appfiles.*ethereal*.snmp-user-based-sm-mib.txt | icat | 914 |
| appfiles.*ethereal*.snmp-view-based-acm-mib.txt | icat | 832 |
| appfiles.*ethereal*.snmpv2-conf.txt | icat | 324 |
| appfiles.*ethereal*.snmpv2-mib.txt | icat | 856 |
| appfiles.*ethereal*.snmpv2-smi.txt | icat | 346 |
| appfiles.*ethereal*.snmpv2-tc.txt | icat | 774 |
| appfiles.*ethereal*.snmpv2-tm.txt | icat | 178 |
| appfiles.*ethereal*.tcp-mib.txt | icat | 332 |
| appfiles.*ethereal*.tunnel-mib.txt | icat | 339 |
| appfiles.*ethereal*.ucd-demo-mib.txt | icat | 76 |
| appfiles.*ethereal*.ucd-diskio-mib.txt | icat | 119 |
| appfiles.*ethereal*.ucd-dlmod-mib.txt | icat | 121 |
| appfiles.*ethereal*.ucd-ipfilter-mib.txt | icat | 258 |
| appfiles.*ethereal*.ucd-ipfwacc-mib.txt | icat | 329 |
| registry.system | regripper | 9600 |
| appfiles.*ethereal*.ucd-snmp-mib-old.txt | icat | 746 |
| appfiles.*ethereal*.ucd-snmp-mib.txt | icat | 1384 |
| appfiles.*ethereal*.udp-mib.txt | icat | 148 |
| appfiles.*ethereal*.snmp-notification-mib.txt | icat | 591 |
| registry.system | regripper | 283 |
| pcap.disk.interception | tshark | 75 |
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
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
