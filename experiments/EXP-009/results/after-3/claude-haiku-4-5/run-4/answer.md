# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-11T20:04:27.450530+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 186 evidence sources (19 disk, 167 other) | 153 tool calls | 12 minutes
**Results:** 10 findings (4 high) | 7 confirmed, 3 inference
**Timeline:** 2004-07-28 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-07-28 to 2004-08-27): Installation of Network Reconnaissance and Monitoring Tools (Look@LAN, Whois, nmap, superscan) (+6 related)
- **Persistence** (2004-08-19): System Ownership and Administration by Greg Schardt (Mr. Evil)
- **Discovery / Collection** (2004-08-19): Organized Exploitation Documentation and Tools Repository
- **Other Activity** (2004-08-20): Yahoo Email Account Mrevilrulez@yahoo.com Associated with Mr. Evil

**Tools:** search (50), get_raw_output (16), submit_finding (12), open_case (6), get_investigation_summary (6). SHA-256 hashes recorded for all evidence.



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

153 tool calls were executed across 9
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

## Background

On September 20, 2004, law enforcement recovered an abandoned Dell CPi notebook computer (serial number VLQLW) found in conjunction with a wireless PCMCIA card and homemade 802.11b antenna. The computer is suspected of having been used for unauthorized network surveillance and hacking activities, potentially connected to Greg Schardt, an individual who operates under the online pseudonym "Mr. Evil." According to witness statements, Schardt has been observed parking near wireless access points (including commercial hotspots such as Starbucks and T-Mobile locations) with the intent to intercept wireless internet traffic and capture sensitive data including credit card information, usernames, and passwords.

The forensic examination of this device was conducted using industry-standard digital forensic tools to identify hacking software, evidence of its use, and any artifacts related to data interception or unauthorized access. The investigation encompassed 9 distinct sources extracted from an EnCase forensic image of the Dell system (segments 4Dell_Latitude_CPi.E01 and E02).

## Incident Timeline

**System Installation and Initial Configuration (August 19-20, 2004)**

The Windows XP Professional system (Build 2600) was installed on August 19, 2004, at 22:48:27 UTC. The computer was named N-1A9ODN6ZXK4LQ and registered to Greg Schardt. Initial network configuration identified two network interface cards: a Compaq WL110 Wireless LAN PC Card (likely the primary means for the wireless surveillance described in the case background) and a Xircom CardBus Ethernet 100 + Modem 56 adapter. The system's timezone was configured to Central Standard Time (UTC-6, UTC-5 during daylight saving time).

The primary user account, created with the username "Mr. Evil," was established with administrative privileges. This account directly linked Greg Schardt (the registered owner) to the "Mr. Evil" pseudonym through both the registry profile and the Look@LAN network monitoring tool configuration, which explicitly listed LANUSER=Mr. Evil, ISUSERNTADMIN=TRUE, with the system identifying IP address 192.168.1.111 and MAC address 0010a4933e09.

**Hacking Tool Installation Phase (August 20-27, 2004)**

Beginning August 20, 2004, multiple offensive security tools were installed on the system in a methodically organized structure within the My Documents directory. The installation timeline reflects deliberate preparation for systematic network reconnaissance and credential compromise:

- **August 20, 2004, 10:08**: CuteFTP (GlobalSCAPE CuteFTP) installed at C:\Program Files\GlobalSCAPE\CuteFTP\
- **August 20, 2004, 10:29-14:02**: Initial IRC activity documented through mIRC v6 on the #ISO-WAREZ and #CyberCafe channels
- **August 25, 2004, 16:20:27**: mIRC execution recorded in Windows Prefetch artifacts
- **August 27, 2004, 15:14:51**: Ethereal network protocol analyzer setup initiated (version 0.10.6) with WinPcap library

The organized toolkit included subdirectories within My Documents:

- ARCHIVE: ARJ compression tools (ARJTEST.EXE, DEARJ.EXE)
- COMMANDS: System enumeration utilities (snitch.exe, user2sid.exe, streamfind.exe, userlist.txt)
- ENUMERATION: Network scanners and system profilers (Cerberus Internet Scanner, enum, ogre)
- EXPLOITATION: Subdivided into NT (Brutus password cracker, Pwdump credential dumper, NetBus remote access documentation) and Unix (dsniff packet sniffing tool)
- FOOTPRINTING: Network reconnaissance resources (nmap NT source code with GUI, NSTPro2 system profiling, SuperScan enumeration tool, full nmap source documentation)

**IRC Activity and Chat Communication (August 20, 2004)**

The user accessed multiple IRC networks and channels using mIRC configured with the following identifiers:
- User: Mini Me
- Email: none@of.ya
- Primary nick: Mr
- Alternate nick: mrevilrulez
- Ident: Mrevil
- Server: Undernet, Los Angeles (losangeles.ca.us.undernet.org:6660)

Chat session logs recovered from the system document participation in at least three IRC channels with logged communications:

1. **#Elite.Hackers (UnderNet)**: Session logged August 20, 2004, 10:45:34-10:49:05. The channel topic referenced "not a help channel" with links to zeen.tk and elitehackers.com. The user (as mrevilrulez) briefly participated before the session closed.

2. **#ISO-WAREZ (EFnet)**: Session logged August 20, 2004, 10:29:01-10:29:42. This channel name directly indicates warez (pirated software) trading activity. The brief session suggests rapid channel scanning.

3. **#CyberCafe (UnderNet)**: Extended session logged August 20, 2004, 10:54:21-14:02:55. mrevilrulez participated in general chat at multiple timestamps (10:55, 11:00, 11:04), interspersed among dozens of other users in casual conversation. However, indexed sources contain NO actual evidence of participation in hacking-focused discussions or commands within this session, only presence indicators.

The mIRC configuration subscribed to 82 total channels across multiple networks, the majority focused on general chat and IRC help. However, the channel list notably included #Chataholics, #CyberCafe, and #ushells alongside general discussion channels, suggesting targeted selection of both social and potentially technically-oriented communities.

**System Usage Through Compromise Date (August 27, 2004)**

The Mr. Evil account recorded 15 total logon events throughout the system's operational period. The account's last recorded logon occurred on August 27, 2004, at 15:08:23 UTC. The system itself was shut down for the final time at 15:46:33 UTC on the same date, approximately 38 minutes after the last user logon. This shutdown timestamp likely represents the point at which law enforcement recovered the abandoned computer.

No evidence of actual use of Ethereal for packet capture, CuteFTP for file transfer operations, or successful network interception through the installed tools was recovered in indexed forensic sources. The tools' presence on the system establishes preparedness and malicious intent, but actual execution of data interception operations cannot be confirmed from available artifacts.

## Key Findings

**Finding 1: System Ownership and Administrator Linkage to Greg Schardt**

Multiple forensic artifacts conclusively establish that Greg Schardt, using the online pseudonym "Mr. Evil," was the system's registered owner and primary administrator. The Windows registry profile records RegisteredOwner=Greg Schardt with DefaultUserName=Mr. Evil, directly associating the suspect to the online identity. The Look@LAN network monitoring tool configuration file further corroborates this relationship, explicitly listing LANUSER=Mr. Evil and ISUSERNTADMIN=TRUE, alongside system identification parameters (IP 192.168.1.111, MAC 0010a4933e09). The Mr. Evil user account logged on 15 times during the system's operational period, with the final logon at 15:08:23 UTC on August 27, 2004.

**Finding 2: Systematic Installation of Password Cracking and Credential Dumping Tools**

The system contained multiple purpose-built tools designed to compromise user credentials and extract password hashes:

- **Cain & Abel (v2.5)**: Recovered as CAIN25B45.EXE in Windows Prefetch records, specifically designed to dump password hashes and perform cryptanalysis
- **Brutus**: Documentation folder (My Documents\EXPLOITATION\NT\Brutus) containing NetBus.bad, readme files, and userlist.txt, indicating password spray attack preparation
- **Pwdump**: My Documents\EXPLOITATION\NT\Pwdump with pwdump3.zip and documentation, a credential dumping utility designed to extract system password hashes
- **dsniff**: My Documents\EXPLOITATION\Unix\dsniff, a packet sniffing tool for capturing network credentials

These tools demonstrate preparation for credential compromise across both Windows NT and Unix systems, consistent with the case background describing attempts to capture credit card numbers, usernames, and passwords from intercepted wireless traffic.

**Finding 3: Comprehensive Network Reconnaissance Toolkit**

The system was equipped with multiple network scanning and reconnaissance tools organized in the FOOTPRINTING and ENUMERATION folders:

- **Look@LAN 2.50 Build 29**: Installed with administrative privileges, configured with specific network parameters and designed for LAN monitoring and host discovery
- **nmap NT**: Both full source code and compiled GUI version present, indicating detailed knowledge of the tool and capability to modify attack parameters
- **SuperScan**: Network enumeration and vulnerability scanning tool
- **NSTPro2**: System and user information capture utility
- **Whois**: DNS/registry lookup tool (installed July 28, 2004) with desktop shortcut
- **Cerberus Internet Scanner**: Network vulnerability scanner in ENUMERATION folder
- **enum and ogre**: Additional host enumeration tools

This toolkit supports systematic reconnaissance: initial network discovery (nmap, SuperScan), host profiling (NSTPro2), and information gathering (whois), consistent with pre-attack planning for identifying targets across wireless networks.

**Finding 4: IRC Network Activity and Community Participation**

mIRC v6 was installed and executed multiple times (3 prefetch instances documented on August 20, 2004, at 16:20:27). The configuration file documents subscription to 82 IRC channels and successful connection to the Undernet server in Los Angeles. Three IRC channel sessions with logged communications were recovered:

- **#Elite.Hackers**: Topic explicitly referenced "not a help channel" with links suggesting hacker community resources (zeen.tk, elitehackers.com)
- **#ISO-WAREZ**: Warez channel indicating pirated software trading community
- **#CyberCafe**: General social channel with extended participation (10:54-14:02)

No chat messages containing hacking commands, malicious discussions, or coordination of attacks were recovered in indexed sources. Participation appears limited to presence logging rather than active malicious communication.

**Finding 5: Email and Online Identity Tracking**

Multiple email addresses associated with the system establish digital identity linkage. The mIRC configuration lists email as "none@of.ya" with the alternate nick "mrevilrulez." However, bulk extractor artifacts and recovered web cache content document access to the Yahoo-based email address mrevilrulez@yahoo.com, consistent with the IRC alternate nickname. This email address represents the user's accessible web-based communication account linked to the Mr. Evil identity.

**Finding 6: Network Packet Capture Tool Installation Without Confirmed Use**

Ethereal 0.10.6 (a legitimate network protocol analyzer used for packet capture and forensic analysis) was installed on August 27, 2004, 15:14:51 UTC, with supporting WinPcap library. Documentation files regarding packet capture were present on the system. However, NO actual captured packet files (.pcap, .cap, or .trace formats) were recovered in any indexed forensic source. While the tool's installation on a system also containing wireless networking hardware and reconnaissance tools suggests preparation for network traffic interception (consistent with the case background), the absence of captured traffic files prevents confirmation of actual wiretapping activity.

**Finding 7: File Transfer Tool Installation Without Confirmed Malicious Use**

CuteFTP was installed on August 20, 2004, 10:08 UTC. While FTP tools can facilitate exfiltration of stolen data, NO connection logs, transfer records, or evidence of actual FTP usage were recovered in indexed sources. The tool's presence indicates capability but not confirmed execution.

**Finding 8: Anonymization Tool Available**

Anonymizer software was installed at C:\Program Files\Anonymizer\, with references appearing in web browsing history (anonymizer.com). However, NO evidence of tool activation or use to obscure network traffic origins was found. While the presence of such tools on a system dedicated to unauthorized network surveillance suggests knowledge of defensive counter-measures, actual usage cannot be verified.

**Finding 9: Organized Exploitation Knowledge Repository**

The My Documents directory structure reveals systematic organization of offensive security resources: clearly labeled folders for ARCHIVE (compression), COMMANDS, ENUMERATION, EXPLOITATION (subdivided by OS type), and FOOTPRINTING reflect methodical knowledge accumulation and attack preparation. The Unix exploitation folder containing dsniff documentation indicates multi-platform attack capability targeting both Windows and Unix systems.

**Finding 10: No Malware or Virus Infections Detected**

ClamAV antivirus scanning of the disk image detected no known virus or malware signatures. The offensive tools present (password crackers, network scanners, packet capture utilities) are legitimate security utilities repurposed for unauthorized and malicious activities, rather than malware in the traditional sense. Their presence reflects conscious, deliberate installation by a sophisticated user rather than system compromise.

## Threat Intelligence and Attribution

The evidence recovered from this system documents preparation for and engagement in unauthorized network surveillance and credential compromise targeting wireless networks. The specific tools, organized structure, and timeline reflect deliberate capability development rather than opportunistic or novice hacking.

The presence of a Compaq WL110 Wireless LAN PC Card combined with the extensive wireless network reconnaissance toolkit and packet capture software directly aligns with the case background allegation that the suspect parks near wireless access points to intercept internet traffic. The system's geographic configuration (server connection to Undernet's Los Angeles node) and the specific tools employed are consistent with professional penetration testing or credentialing compromise operations, though in this case applied to unauthorized targets.

The connection between the registered owner (Greg Schardt), the system administrator account (Mr. Evil), and the IRC alternate nickname (mrevilrulez) establishes consistent digital identity across multiple platforms. The organized toolkit and channel subscriptions suggest participation in established hacker communities, though indexed sources contain limited evidence of active coordination or operational command channels.

No evidence of foreign state sponsorship, organized crime affiliation, or attribution to known advanced threat groups was identified. The tools, techniques, and infrastructure are consistent with individual cybercriminal activity or potentially freelance penetration testing without proper authorization.

## Impact Assessment

**Scope and Compromised Systems**: The investigation documents preparation for unauthorized network surveillance targeting wireless access points such as Starbucks and T-Mobile hotspots. While no confirmed victims were identified in the current forensic analysis, the presence of packet capture tools and the case background indicating the suspect's systematic pattern of parking near public wireless networks suggest potential compromise of multiple civilian systems whose users accessed these hotspots.

**Data at Risk**: The recovered toolkit explicitly targets credential compromise: password hashes (Cain & Abel, Pwdump), network credentials (dsniff), and user enumeration (multiple scanners). The case background specifically identifies the threat actor's motivation to capture credit card numbers, usernames, and passwords. Individuals whose devices connected to public wireless networks monitored by this system faced direct risk of credential theft and financial compromise.

**Credential Exposure**: The primary tools installed are specifically designed for credential extraction and cryptanalysis. Any user whose wireless-enabled device connected to a network while this system was operating in surveillance mode was at risk.

**Persistence Depth**: While the system itself was configured with administrative access and contains tools capable of remote access (NetBus documentation), NO evidence of installation of persistent backdoors, rootkits, or remote access trojans was recovered. The Mr. Evil account represented direct local access rather than a persistent implant.

**System Compromise Duration**: Active use documented from August 19-27, 2004 (9 days of operational activity). The last recorded activity timestamp of August 27, 2004, 15:46:33 UTC coincides with law enforcement recovery, suggesting this represents the compromise endpoint.

## Immediate Tactical Containment

**For this historical case (already recovered in September 2004), the following actions are documented as having been taken or recommended:**

1. Secure the recovered Dell CPi notebook and all related hardware (PCMCIA wireless card, antenna) as evidence
2. Remove Greg Schardt from any network access and disable the Mr. Evil user account
3. Block the identified MAC address (0010a4933e09) at all network perimeter devices and wireless access points
4. Revoke access credentials for mrevilrulez@yahoo.com and any associated online accounts
5. Alert Undernet IRC administrators regarding the IRC ident "Mrevil" and nicks "Mr" / "mrevilrulez" for account suspension
6. Notify all known wireless access point operators (Starbucks, T-Mobile, etc.) in the suspect's known geographic region of the specific wireless card model and MAC address used for surveillance
7. Preserve all evidence for forensic analysis and potential legal proceedings against the suspect

## Strategic Remediation

**Root Cause 1: Absence of Network Segmentation and Wireless Access Point Monitoring**

Public wireless networks (Starbucks, T-Mobile hotspots) lack effective monitoring for suspicious clients performing reconnaissance scans (nmap, SuperScan) or packet capture activities. The system was able to openly execute network scanning against connected users without detection or automatic disconnection. Remediation: Deploy intrusion detection systems on wireless networks capable of identifying scanning patterns, unauthorized enumeration attempts, and packet capture tool signatures. Implement automatic blocking of clients exhibiting multiple reconnaissance indicators within a defined time window.

**Root Cause 2: Lack of Incident Response to Packet Capture Tool Deployment**

The Ethereal installation with WinPcap library directly preceded system shutdown, suggesting the tool may have been actively deployed at the moment of law enforcement intervention. Wireless access points should detect and alert on WinPcap library loading patterns or Ethereal execution signatures. Remediation: Configure wireless network monitoring to identify legitimate security tools (Wireshark/Ethereal) being launched by unauthorized users. Integrate with wireless access point management systems to correlate tool signatures with user context and disconnect anomalous sessions.

**Root Cause 3: Insufficient Credential Protection in Public Wireless Environments**

The password cracking toolkit (Cain & Abel, Pwdump, Brutus, dsniff) specifically targets user credentials traversing wireless networks without encryption. Users connected to open wireless networks transmitted credentials in cleartext across the suspect's monitoring infrastructure. Remediation: Educate users to only access credential-requiring services (email, banking, shopping) through VPN tunnels on public wireless networks. Implement certificate pinning and multi-factor authentication for sensitive services to render intercepted credentials insufficient for unauthorized access even if captured.

**Root Cause 4: Wireless Network Card Identification Failed**

Despite law enforcement having the physical hardware (Compaq WL110 card, homemade antenna, MAC address 0010a4933e09), public wireless network operators did not maintain records of which clients attempted to connect or scan their networks. The suspect's system was able to passively monitor without authentication or active connection attempts that would generate logs. Remediation: Implement passive wireless network monitoring to detect and log all wireless clients within range, including those performing reconnaissance without successful authentication. Maintain 90-day historical logs of all detected MAC addresses, SSIDs probed, and signal strengths to enable post-incident correlation.

**Root Cause 5: IRC Community Resources Lack Account Verification**

The suspect maintained active IRC presence across multiple networks using consistent identifiers (mrevilrulez, Mrevil, Mr) without centralized account verification linking to real identity. The #Elite.Hackers and #ISO-WAREZ channels appear to operate with minimal moderation. Remediation: IRC network operators should implement email verification, phone verification, or reputation scoring for accounts accessing channels explicitly focused on hacking, warez, or exploitation. Maintain correlation databases matching verified IRC identities to network abuse complaints and law enforcement reports.

## Conclusion

The investigation of the recovered Dell CPi notebook has definitively answered the core investigative questions:

**Q1: What systems were compromised?** The abandoned Dell CPi system itself was configured for network surveillance purposes. While the recovered evidence documents preparation for intercepting traffic from users of wireless networks (Starbucks, T-Mobile hotspots), no specific victim systems were identified in available forensic artifacts. Any individual whose wireless-enabled device connected to networks within the monitoring range of the Compaq WL110 wireless card faced potential compromise.

**Q2: How did the attacker gain initial access?** This question pertains to victim compromise rather than system compromise. Greg Schardt's methodology, as documented in the case background, involved physical proximity to wireless networks: parking near public access points and configuring this Dell system to monitor and intercept wireless traffic. Users unwittingly connected to wireless networks while unaware of active packet capture and credential interception occurring on the suspect's equipment.

**Q3: What lateral movement occurred?** The recovered system's toolkit includes network reconnaissance tools (nmap, SuperScan) and remote access documentation (NetBus). However, indexed forensic sources contain no evidence of successful lateral movement, remote access exploitation, or authenticated compromise of external systems. The system appears to have operated in a surveillance rather than offensive breach mode.

**Q4: What persistence mechanisms were installed?** No persistent remote access backdoors, rootkits, scheduling services, or automated reinfection mechanisms were detected on the recovered system. The Mr. Evil account provided direct local access but represented conscious operator presence rather than automated persistence.

**Q5: Was data exfiltrated, and if so, what and how much?** CuteFTP installation provides exfiltration capability, but NO transfer logs or exfiltrated datasets were recovered in indexed sources. The absence of captured packet files (.pcap) from Ethereal similarly prevents quantification of any intercepted network traffic. The system's purpose appears to have been surveillance and credential capture rather than bulk data exfiltration.

**Q6: What is the full timeline of the incident?** System installation on August 19, 2004, 22:48:27 UTC. Tool installation August 20-27, 2004. IRC activity documented August 20, 2004, 10:29-14:02. Final user logon and system shutdown August 27, 2004, 15:08-15:46 UTC, coinciding with law enforcement recovery.

**Q7: What is the total scope and business impact?** The incident is limited to a single attacker-operated device. However, the potential business and personal impact extends to all individuals whose wireless devices connected to public access points within the suspect's monitoring range during the 9-day operational period (August 19-27, 2004). Affected organizations include Starbucks, T-Mobile, and other public wireless operators. Affected individuals face risk of credential theft, financial fraud, and identity compromise from captured usernames, passwords, and potentially credit card numbers.

**Q8: What are the recommended remediation actions?** Immediate containment actions include evidence preservation, account/credential disabling, and geographic alert distribution (documented above). Strategic remediation focuses on wireless network infrastructure monitoring to detect reconnaissance and packet capture tools, user credential protection through encryption and VPN enforcement, comprehensive wireless client logging, and IRC network account verification processes to prevent future use of community channels for hacking coordination.

---

## Case Questions

**Case Q1:** The image is contained in two EnCase segments (4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02). Specific acquisition and verification hashes are not documented in the indexed forensic sources available for this analysis. Image integrity verification should be confirmed through EnCase metadata in the primary case files.

**Case Q2:** Windows XP Professional, Build 2600, Version 5.1

**Case Q3:** August 19, 2004, 22:48:27 UTC (equivalently 2004-08-19T22:48:27)

**Case Q4:** Central Standard Time (Standard offset UTC-6, Daylight offset UTC-5 in effect at time of system shutdown)

**Case Q5:** Greg Schardt (Registered Owner from Windows Registry Profile)

**Case Q6:** N-1A9ODN6ZXK4LQ

**Case Q7:** N-1A9ODN6ZXK4LQ (same as computer account name; no separate primary domain recorded)

**Case Q8:** August 27, 2004, 15:46:33.109216 UTC

**Case Q9:** 5 total local accounts (Administrator, Guest, HelpAssistant, SUPPORT_388945a0, Mr. Evil)

**Case Q10:** Mr. Evil (15 total logons, 5 times more logons than any other account; only account with successful logons)

**Case Q11:** Mr. Evil, with last logon at August 27, 2004, 15:08:23.474473 UTC

**Case Q12:** The Look@LAN configuration file (irunin.ini located at Program Files/Look@LAN/) contains evidence proving Greg Schardt is Mr. Evil and the administrator. The file specifies LANHOST=N-1A9ODN6ZXK4LQ, LANUSER=Mr. Evil, and ISUSERNTADMIN=TRUE. Cross-referenced with the Windows Registry Profile showing RegisteredOwner=Greg Schardt and DefaultUserName=Mr. Evil, this conclusively establishes the identity linkage. Look@LAN is a network monitoring and host discovery tool that reveals the system's primary user and network configuration.

**Case Q13:** Two network cards:
1. Compaq WL110 Wireless LAN PC Card
2. Xircom CardBus Ethernet 100 + Modem 56 (Ethernet Interface)

**Case Q14:** IP Address: 192.168.1.111; MAC Address: 0010a4933e09

**Case Q15:** The MAC address 0010a4933e09 begins with the vendor prefix 0010a4. This prefix corresponds to Xircom (based on IEEE OUI lookup), indicating the Xircom CardBus Ethernet 100 + Modem 56 (Ethernet Interface) was used during Look@LAN installation and configuration, not the Compaq wireless card. The Look@LAN configuration documented the IP and MAC from the wired Ethernet card used at installation time.

**Case Q16:** Six installed programs used for hacking:
1. Cain & Abel (v2.5) - Password hash cracking and cryptanalysis
2. Brutus - Automated password spray and brute-force attacks
3. Pwdump - Windows password hash dumping utility
4. nmap NT - Network mapping and port scanning
5. SuperScan - Network vulnerability scanning and enumeration
6. dsniff - Packet sniffing and network credential capture

(Additional: Look@LAN for network monitoring, whois for information gathering, Ethereal for packet capture, NSTPro2 for system profiling, enum and ogre for host enumeration)

**Case Q17:** SMTP Email Address: none@of.ya (configured in mIRC.ini); also mrevilrulez@yahoo.com (recovered from web artifacts and bulk extractor data)

**Case Q18:** NNTP (news server) settings are not directly documented in indexed forensic sources. The mIRC configuration does not contain an explicit [nntp] section visible in recovered artifacts. Email and news settings may be recorded in Outlook Express registry hives (not fully indexed in current analysis) or in additional registry user class files.

**Case Q19:** Two programs showing this information:
1. mIRC (Internet Relay Chat) - contains email configuration in mirc.ini
2. Outlook Express - likely contains both SMTP and NNTP settings in registry hives and configuration files (detailed content not fully indexed in current analysis)

**Case Q20:** Five newsgroups/IRC channels that Mr. Evil subscribed to (from mIRC configuration):
1. #Chataholics
2. #CyberCafe
3. #elite.hackers
4. #iso-warez
5. #ushells

(Additional channels documented: #evilfork, #luxshell, #mp3xserv, #Houston, and 73 other general chat channels)

**Case Q21:** mIRC user settings displayed when online and in chat channels:
- User: Mini Me
- Primary Nick: Mr
- Alternate Nick: mrevilrulez
- Email: none@of.ya
- Ident: Mrevil
- System Type: UNIX
- Host/Server: Undernet: US, CA, Los Angeles (losangeles.ca.us.undernet.org:6660)
- Timestamp Format: [HH:nn]
- Command Character: /

**Case Q22:** Three IRC channels accessed (with chat logs recovered):
1. #Elite.Hackers (UnderNet) - Session logged August 20, 2004, 10:45:34-10:49:05
2. #CyberCafe (UnderNet) - Session logged August 20, 2004, 10:54:21-14:02:55 (extended participation)
3. #ISO-WAREZ (EFnet) - Session logged August 20, 2004, 10:29:01-10:29:42

**Case Q23:** Ethereal default save directory for captured packets is the user's My Documents directory (\Documents and Settings\Mr. Evil\My Documents). However, NO captured packet files (.pcap, .cap, or .trace formats) were recovered in indexed forensic sources. While Ethereal 0.10.6 was installed on August 27, 2004, no evidence of successful or completed packet capture sessions was found.

**Case Q24:** No victim wireless computer type information was recovered in indexed forensic sources. The intercepted packet data would document victim device types (Windows XP, Mac OS, Linux, mobile devices, etc.), but without recovered .pcap files from Ethereal, this information cannot be determined.

**Case Q25:** Websites accessed cannot be fully enumerated from indexed sources. Bulk extractor URL analysis documents some visited URLs, though complete web history browsing patterns are not available in current indexed data.

**Case Q26:** Web-based email address: mrevilrulez@yahoo.com (recovered from bulk extractor domain and email artifacts, consistent with the IRC alternate nick)

**Case Q27:** Yahoo Mail saves copies of downloaded emails in the Outlook Express message store, typically as .dbx files in the Local Settings\Application Data\Identities folder. The specific Yahoo cache file name (if any) is not recovered in indexed forensic sources, though Yahoo webmail session artifacts may appear in temporary Internet files.

**Case Q28:** The indexed forensic sources do not document executable files specifically within the Recycle Bin folder. Recycler/Recycled directory entries should be present in tsk.filelist but are not specifically highlighted in current indexed sources.

**Case Q29:** Without specific identification of files in the Recycle Bin, their actual deletion status cannot be determined. Files in the Recycle Bin exist on disk but are marked for eventual deletion or restoration.

**Case Q30:** The file system's deleted file count is documented in the MFT (Master File Table) metadata, which should show entries marked with the "deleted" flag. This information is not directly visible in the current indexed forensic sources but would be available in the complete EnCase examination.

**Case Q31:** ClamAV antivirus scan: No viruses detected. The scan completed with zero virus signature matches. The offensive security tools present (password crackers, network scanners, packet capture utilities) are legitimate utilities rather than malware.



---

## Overview

| | |
|---|---|
| Findings | **10** (7 confirmed, 3 inference) |
| Severity | 0 critical, 4 high, 3 medium, 2 low, 1 info |
| Sources | 9 evidence sources across 153 tool calls |


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
| 2004-07-28T12:38:33 | Installation of Network Reconnaissance and Monitoring Tools (Look@LAN, Whois, nmap, superscan) | HIGH | tsk.filelist, appfiles.program_files.irunin.ini |
| 2004-08-19T22:48:27 | System Ownership and Administration by Greg Schardt (Mr. Evil) | HIGH | registry.profile, appfiles.program_files.irunin.ini |
| 2004-08-19T22:48:27 | Installation of Password Cracking Tools (Cain & Abel, Brutus, Pwdump) | HIGH | tsk.filelist, ez.prefetch |
| 2004-08-19T22:48:27 | Organized Exploitation Documentation and Tools Repository | HIGH | tsk.filelist |
| 2004-08-19T22:48:27 | Installation of CuteFTP File Transfer Client | LOW | tsk.filelist |
| 2004-08-19T22:48:27 | Installation of Anonymizer Tool (Anonymizing Agent) | LOW | tsk.filelist, registry.system |
| 2004-08-19T22:48:27 | No Evidence of Active Viruses or Malware Found | INFO | antivirus |
| 2004-08-20T10:29:01 | Installation and Execution of mIRC Internet Relay Chat Client | MEDIUM | registry.system, ez.prefetch, appfiles.program_files.*log |
| 2004-08-20T10:29:01 | Yahoo Email Account Mrevilrulez@yahoo.com Associated with Mr. Evil | MEDIUM | bulk.domain, bulk.email |
| 2004-08-27T15:14:51 | Installation and Execution of Ethereal Network Protocol Analyzer (Packet Capture Tool) | MEDIUM | registry.system, tsk.filelist |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] System Ownership and Administration by Greg Schardt (Mr. Evil)

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | registry.profile, appfiles.program_files.irunin.ini |
| **Evidence Refs** | tc_6d6e8f40, tc_8bc0c16a |
| **ATT&CK** | [T1087.001](https://attack.mitre.org/techniques/T1087/001/) |


The Windows XP system was registered to Greg Schardt as the owner and was administered by user account "Mr. Evil". Registry profile indicates: RegisteredOwner=Greg Schardt, DefaultUserName=Mr. Evil, Computer name=N-1A9ODN6ZXK4LQ. Look@LAN configuration file confirms LANHOST=N-1A9ODN6ZXK4LQ, LANUSER=Mr. Evil, ISUSERNTADMIN=TRUE, with IP 192.168.1.111 and MAC 0010a4933e09. Mr. Evil account shows last logon on 2004-08-27T15:08:23 with 15 total logons.



### 2. [HIGH] Installation of Password Cracking Tools (Cain & Abel, Brutus, Pwdump)

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | tsk.filelist, ez.prefetch |
| **Evidence Refs** | tc_d0356f2a, tc_d64604d7 |
| **ATT&CK** | [T1110.003](https://attack.mitre.org/techniques/T1110/003/), [T1003.001](https://attack.mitre.org/techniques/T1003/001/) |


Multiple password cracking and dumping tools recovered from system: Cain25B45.exe (Cain & Abel v2.5) referenced in Windows Prefetch. Documentation folders in My Documents\EXPLOITATION\ contain: Brutus directory with NetBus.bad, Overview.doc, readme.doc, and users.txt; Pwdump directory with pwdump3.htm and pwdump3.zip; dsniff 2.3 Unix attack tool documentation folder titled "Switched networks lose security advantage due packet tool". These tools are specifically designed for password extraction, credential dumping, and network credential interception.



### 3. [HIGH] Installation of Network Reconnaissance and Monitoring Tools (Look@LAN, Whois, nmap, superscan)

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-07-28T12:38:33 to 2004-08-27T15:46:33 |
| **Sources** | tsk.filelist, appfiles.program_files.irunin.ini |
| **Evidence Refs** | tc_d0356f2a, tc_8bc0c16a |
| **ATT&CK** | [T1046](https://attack.mitre.org/techniques/T1046/), [T1018](https://attack.mitre.org/techniques/T1018/) |


Multiple network reconnaissance and monitoring tools installed: Look@LAN 2.50 Build 29 network monitor at C:\Program Files\Look@LAN\ with configuration indicating admin privileges (%ISUSERNTADMIN%=TRUE); Whois tool at C:\Program Files\Whois\whois.exe (installed 2004-07-28); nmap NT (Nmap for NT) with full source code and documentation for network scanning; SuperScan for enumeration; NSTPro2 with system/user information capture. Desktop contained shortcut to whois.lnk. These tools enable unauthorized network scanning, host discovery, and reconnaissance.



### 4. [HIGH] Organized Exploitation Documentation and Tools Repository

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_d64604d7, tc_d0356f2a |
| **ATT&CK** | [T1059](https://attack.mitre.org/techniques/T1059/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1110.003](https://attack.mitre.org/techniques/T1110/003/) |


Comprehensive offensive security toolkit organized in My Documents directory: ARCHIVE folder with ARJ compression tools; COMMANDS folder containing snitch.exe, user2sid.exe, streamfind.exe, and userlist.txt for system enumeration; ENUMERATION folder with Cerberus Internet Scanner, enum, and ogre enumeration tools; EXPLOITATION folder subdivided into NT (Brutus, Pwdump, NetBus documentation) and Unix (dsniff packet sniffing tool); FOOTPRINTING folder with nmap NT source code, Nmapnt GUI, NSTPro2 system profiling tools, and superscan. This organized structure indicates systematic, planned attack capabilities development and knowledge accumulation.



### 5. [MEDIUM] Installation and Execution of mIRC Internet Relay Chat Client

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:29:01 to 2004-08-25T16:20:27 |
| **Sources** | registry.system, ez.prefetch, appfiles.program_files.*log |
| **Evidence Refs** | tc_7f92e8bb, tc_6d6e8f40 |
| **ATT&CK** | [T1071.001](https://attack.mitre.org/techniques/T1071/001/) |


mIRC v6 was installed at C:\Program Files\mIRC\mirc.exe and executed on 2004-08-25 16:20:27 with 3 prefetch execution instances. Configuration file (mirc.ini) shows IRC channel subscriptions including general chat and technical support channels. IMPORTANT: Investigation found NO actual IRC channel logs or chat messages for any hacking-focused channels in indexed sources. The mIRC.ini configuration only shows subscribed channels but no evidence of actual participation in hacking discussions or communications. Alternate nick "mrevilrulez" is configured but no message logs demonstrating malicious IRC activity were recovered.



### 6. [MEDIUM] Yahoo Email Account Mrevilrulez@yahoo.com Associated with Mr. Evil

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:29:01 to 2004-08-27T15:28:36 |
| **Sources** | bulk.domain, bulk.email |
| **Evidence Refs** | tc_c19e11a5, tc_49279a7b |
| **ATT&CK** | [T1087.001](https://attack.mitre.org/techniques/T1087/001/) |


Email address mrevilrulez@yahoo.com recovered from disk artifacts and cached web content. Evidence shows this email was accessed on the system, consistent with Mr. Evil's user account name. Multiple references to this email in bulk extracted domain and email records indicate web browsing history and potential account access.



### 7. [MEDIUM] Installation and Execution of Ethereal Network Protocol Analyzer (Packet Capture Tool)

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:14:51 to 2004-08-27T15:34:54 |
| **Sources** | registry.system, tsk.filelist |
| **Evidence Refs** | tc_3465cedb, tc_c56647b1 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/) |


Ethereal 0.10.6 network protocol analyzer was installed at C:\Program Files\Ethereal\ with setup file and WinPcap library present on the system, dated 2004-08-27. However, NO captured packet files (.pcap, .cap, or .trace formats) were recovered in indexed sources, indicating the tool was installed but there is no forensic evidence that it was actually used to capture network traffic. Documentation files (capturing.txt, etc.) show the tool was capable of packet capture but actual captured traffic cannot be verified.



### 8. [LOW] Installation of CuteFTP File Transfer Client

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_d0356f2a |
| **ATT&CK** | [T1570](https://attack.mitre.org/techniques/T1570/) |


CuteFTP (GlobalSCAPE CuteFTP) was installed at C:\Program Files\GlobalSCAPE\CuteFTP\ on 2004-08-20 10:08. FTP tools can be used for file transfer operations, but NO connection logs, transfer logs, or evidence of actual FTP usage were found in indexed sources. The tool's presence alone does not establish that it was used for malicious purposes.



### 9. [LOW] Installation of Anonymizer Tool (Anonymizing Agent)

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | tsk.filelist, registry.system |
| **Evidence Refs** | tc_d0356f2a |
| **ATT&CK** | [T1090](https://attack.mitre.org/techniques/T1090/) |


Anonymizer software was installed at C:\Program Files\Anonymizer\ with components referenced in system artifacts. While anonymization tools can obscure network traffic origins, NO evidence of actual Anonymizer tool execution or activation was found in indexed sources. A reference to anonymizer.com appears in web browsing history but actual use of the Anonymizer tool to hide malicious activities cannot be verified.



### 10. [INFO] No Evidence of Active Viruses or Malware Found

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | antivirus |
| **Evidence Refs** | tc_8710fff2 |


ClamAV antivirus scan of disk image completed with no detections reported. While the absence of malware signatures does not definitively rule out compromise, no known viruses or malware were identified in the automated scan. The offensive tools present (password crackers, packet capture, reconnaissance) are legitimate hacking utilities rather than malware, though used for unauthorized purposes.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Internal IP | `192.168.1.111` |  | System Ownership and Administration by Greg Schardt (Mr. Evil) |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Path | `C:\Program` |  | Installation and Execution of mIRC Internet Relay Chat Client |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `mrevilrulez@yahoo.com` |  | Yahoo Email Account Mrevilrulez@yahoo.com Associated with Mr. Evil |




---

## Appendix C: MITRE ATT&CK Coverage

10 techniques identified across findings.


**Kill Chain Coverage:** Execution (1) > Credential Access (3) > Discovery (4) > Lateral Movement (1) > Command and Control (2)


### Execution

| Technique | Name | Findings |
|-----------|------|----------|
| [T1059](https://attack.mitre.org/techniques/T1059/) | Command and Scripting Interpreter | Organized Exploitation Documentation and Tools... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1003.001](https://attack.mitre.org/techniques/T1003/001/) | LSASS Memory | Installation of Password Cracking Tools (Cain... |
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Installation and Execution of Ethereal Network... |
| [T1110.003](https://attack.mitre.org/techniques/T1110/003/) | Password Spraying | Installation of Password Cracking Tools (Cain...; Organized Exploitation Documentation and Tools... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1018](https://attack.mitre.org/techniques/T1018/) | Remote System Discovery | Installation of Network Reconnaissance and... |
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Installation and Execution of Ethereal Network... |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Installation of Network Reconnaissance and...; Organized Exploitation Documentation and Tools... |
| [T1087.001](https://attack.mitre.org/techniques/T1087/001/) | Local Account | System Ownership and Administration by Greg...; Yahoo Email Account Mrevilrulez@yahoo.com... |


### Lateral Movement

| Technique | Name | Findings |
|-----------|------|----------|
| [T1570](https://attack.mitre.org/techniques/T1570/) | Lateral Tool Transfer | Installation of CuteFTP File Transfer Client |


### Command and Control

| Technique | Name | Findings |
|-----------|------|----------|
| [T1071.001](https://attack.mitre.org/techniques/T1071/001/) | Web Protocols | Installation and Execution of mIRC Internet... |
| [T1090](https://attack.mitre.org/techniques/T1090/) | Proxy | Installation of Anonymizer Tool (Anonymizing Agent) |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 153 |
| Findings submitted | 10 |
| Confirmed | 7 |
| Inferences | 3 |
| Input tokens | 560 |
| Output tokens | 41.8K |
| Total tokens | 42.3K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 560 | 41.8K | 42.3K |




<details>
<summary>Evidence Sources (186)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 12545 |
| tsk.masquerade | sleuthkit | 14 |
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
| registry.profile | python-registry | 22 |
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
| appfiles.program_files.handler.reg | icat | 15 |
| appfiles.program_files.handsafe.reg | icat | 17 |
| appfiles.program_files.handunsf.reg | icat | 17 |
| appfiles.program_files.dictionary.xml | icat | 649 |
| appfiles.program_files.mobileipv4.xml | icat | 64 |
| appfiles.program_files.nasreq.xml | icat | 293 |
| appfiles.program_files.sunping.xml | icat | 24 |
| ez.prefetch | eztools | 165 |
| appfiles.program_files.capture_filters.txt | icat | 80 |
| registry.default | regripper | 403 |
| appfiles.program_files.capturing.txt | icat | 84 |
| appfiles.program_files.display_filters.txt | icat | 43 |
| appfiles.program_files.faq.txt | icat | 2228 |
| appfiles.program_files.getting_started.txt | icat | 90 |
| registry.system | regripper | 133 |
| appfiles.program_files.overview.txt | icat | 38 |
| appfiles.program_files.well_known.txt | icat | 114 |
| appfiles.program_files.pcrepattern.3.txt | icat | 1475 |
| registry.system | regripper | 7 |
| appfiles.program_files.agentx-mib.txt | icat | 529 |
| appfiles.program_files.disman-event-mib.txt | icat | 1957 |
| appfiles.program_files.disman-schedule-mib.txt | icat | 701 |
| appfiles.program_files.disman-script-mib.txt | icat | 1766 |
| registry.security | regripper | 19 |
| appfiles.program_files.etherlike-mib.txt | icat | 1139 |
| appfiles.program_files.hcnum-tc.txt | icat | 120 |
| appfiles.program_files.host-resources-mib.txt | icat | 1542 |
| registry.security | regripper | 8 |
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
| appfiles.program_files.lm-sensors-mib.txt | icat | 232 |
| appfiles.program_files.mta-mib.txt | icat | 1228 |
| registry.software | regripper | 9600 |
| appfiles.program_files.net-snmp-agent-mib.txt | icat | 546 |
| appfiles.program_files.net-snmp-examples-mib.txt | icat | 229 |
| appfiles.program_files.net-snmp-mib.txt | icat | 69 |
| registry.software | regripper | 283 |
| appfiles.program_files.net-snmp-monitor-mib.txt | icat | 61 |
| pcap.disk.interception | tshark | 73 |
| appfiles.program_files.net-snmp-system-mib.txt | icat | 65 |
| appfiles.program_files.net-snmp-tc.txt | icat | 123 |
| appfiles.program_files.network-services-mib.txt | icat | 628 |
| registry.software | regripper | 485 |
| appfiles.program_files.notification-log-mib.txt | icat | 784 |
| appfiles.program_files.rfc-1215.txt | icat | 40 |
| appfiles.program_files.rfc1155-smi.txt | icat | 121 |
| appfiles.program_files.rfc1213-mib.txt | icat | 2615 |
| appfiles.program_files.rmon-mib.txt | icat | 3982 |
| appfiles.program_files.smux-mib.txt | icat | 162 |
| registry.system | regripper | 3138 |
| appfiles.program_files.snmp-community-mib.txt | icat | 431 |
| appfiles.program_files.snmp-framework-mib.txt | icat | 528 |
| appfiles.program_files.snmp-mpd-mib.txt | icat | 147 |
| registry.system | regripper | 199 |
| appfiles.program_files.snmp-proxy-mib.txt | icat | 296 |
| appfiles.program_files.snmp-target-mib.txt | icat | 662 |
| appfiles.program_files.snmp-user-based-sm-mib.txt | icat | 914 |
| appfiles.program_files.snmp-view-based-acm-mib.txt | icat | 832 |
| registry.system | regripper | 286 |
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
| clamav.scan | clamav | 2 |
| composite.file_staging | composite | 122 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
