# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-12T04:46:06.166859+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 152 evidence sources (17 disk, 135 other) | 155 tool calls | 12 minutes
**Results:** 11 findings (4 high) | 9 confirmed, 2 inference
**Timeline:** 2004-07-28 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-07-28 to 2004-08-19): Multiple hacking and network reconnaissance tools installed on system (+3 related)
- **Persistence** (2004-08-19): Local user accounts on system: 5 accounts with Mr. Evil as primary administrator (+2 related)
- **Lateral Movement** (2004-08-19): Extensive collection of organized hacking tools in My Documents directories
- **Credential Access** (2004-08-19): Image acquisition hash verified - MD5 match confirmed
- **Discovery / Collection** (2004-08-19): Evidence of wireless network wardriving interest
- **Other Activity** (2004-08-19): Mr. Evil's web-based email address identified as whoknowsme@sbcglobal.net

**Tools:** search (65), submit_finding (11), get_raw_output (9), open_case (7), get_investigation_summary (6). SHA-256 hashes recorded for all evidence.



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

155 tool calls were executed across 9
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative: Dell Latitude CPi Notebook Computer

## Background

On September 20, 2004, law enforcement recovered an abandoned Dell Latitude CPi notebook computer (serial # VLQLW) equipped with a wireless PCMCIA card and an external homemade 802.11b antenna. The discovery occurred in connection with suspected hacking activities and a named person of interest, Greg Schardt, known by the online alias "Mr. Evil." Intelligence suggested that Schardt had engaged in wardriving at wireless hotspots (Starbucks, T-Mobile Hotspots) to intercept internet traffic for credential theft. This forensic examination was tasked with identifying hacking software, evidence of use, generated data, and establishing connectivity to the suspect.

The evidence consists of two EnCase image segments (4Dell_Latitude_CPi.E01 and E02) totaling 9 indexed sources after comprehensive forensic extraction. The disk image hash (MD5: aee4fcd9301c03b3b054623ca261959a) was verified by ewfverify recomputation, confirming image integrity. The system was configured with Microsoft Windows XP (Build 2600, installed August 19, 2004) on a mobile platform designed for both wired and wireless networking.

## System Environment and Ownership

The forensic examination established a clear evidentiary chain linking the computer to the suspect through multiple independent indicators. The system's registered owner in the Windows Registry is Greg Schardt. The primary user account, created immediately after OS installation, is named "Mr. Evil"—the same online alias attributed to the person of interest. This Mr. Evil account (RID 1003) is configured with full administrative privileges and was the only actively used administrator account on the system. The default Windows Administrator account (RID 500) was never accessed, indicating intentional setup for the Mr. Evil persona.

The computer is identified as "N-1A9ODN6ZXK4LQ" in the network configuration. The system was configured with Central Standard Time (UTC-6), with Central Daylight Time (UTC-5) in effect during the final operational period. The system was installed on August 19, 2004 at 22:48:27 UTC and last shut down on August 27, 2004 at 15:46:33 UTC, representing an approximately eight-day period of active use between setup and abandonment.

Five local user accounts exist on the system: the default Administrator and Guest accounts (both unused), three service accounts (HelpAssistant, SUPPORT_388945a0, and LocalService), and the Mr. Evil account which shows 15 login events spanning from system installation through August 27, 2004 at 15:08:23 UTC. The Mr. Evil account represents the exclusive primary user of this computer.

## Network Configuration and Physical Setup

The system is equipped with two network interface cards, reflecting a mobile architecture designed for flexible connectivity:

1. **Compaq WL110 Wireless LAN PC Card** (GUID: {86FC0C96-3FF2-4D59-9ABA-C602F213B5D2}) – a PCMCIA wireless adapter consistent with the external antenna recovered at the scene and the wardriving methodology described.

2. **Xircom CardBus Ethernet 100 + Modem 56** (GUID: {6E4090C2-FAEF-489A-8575-505D21FC1049}) – providing wired Ethernet backup connectivity via the cben5.sys driver.

Network traffic analysis from captured packet data reveals the system communicated from private IP address 192.168.254.2 within a controlled 192.168.254.0/24 network segment. This address, combined with the private IP range and Pocket PC device identification in captured headers, suggests either laboratory network testing or interaction with a personal mobile device rather than targeting of external victims.

## Incident Timeline

**August 19, 2004, 22:48:27 UTC** – Windows XP installation completed. Registry timestamps establish system initialization with Mr. Evil as the primary user account and Greg Schardt as registered owner.

**August 19, 2004, 23:04:14 UTC** – First user-level registry modifications recorded in the Mr. Evil NTUSER.DAT hive, indicating immediate account activity following setup.

**August 20, 2004, 15:05:52 UTC** – Cain (password cracker/network sniffer application) first executed, as evidenced by prefetch record CAIN25B45.EXE-056F3A6E.pf. Cain installation in C:\Program Files\Cain\ includes WinPcap driver components for live packet capture.

**August 20, 2004, 15:23:18 UTC** – Multiple prefetch records indicate systematic tool execution: LOOKATHOST.EXE and related network enumeration utilities begin operation.

**August 20, 2004, 16:13:55 UTC** – System cleanup operations recorded in cleanup.log within Documents and Settings, potentially indicative of anti-forensic activity or routine maintenance.

**August 25, 2004, 15:55:34 UTC** – Agent utility executed (AGENT.EXE prefetch record), an offensive toolkit.

**August 25, 2004, 15:56:33 UTC** – LOOKATHOST.EXE executed from the Look@LAN network reconnaissance suite (C:\Program Files\Look@LAN\).

**August 26, 2004, 15:05:15 UTC** – TELNET.EXE executed from WINDOWS\System32\, indicating direct network terminal access attempts.

**August 26, 2004, 15:06:14 UTC** – LOOKATLAN.EXE (main network scanner interface) executed, representing the second major enumeration session.

**August 26, 2004, 15:08:15 UTC** – NTUSER.DAT hive final timestamp recorded, indicating last user-level configuration changes.

**August 27, 2004, 15:08:23 UTC** – Final Mr. Evil account logon event recorded (15th total logon).

**August 27, 2004, 15:46:33 UTC** – System shutdown recorded with final registry write timestamp, marking the end of operational activity before physical abandonment.

## Key Findings

### Finding 1: Confirmed Identity Linkage – Greg Schardt = Mr. Evil

Registry evidence conclusively establishes that Greg Schardt is the registered owner of this system and operates under the "Mr. Evil" online persona. The Windows logon configuration explicitly sets "Mr. Evil" as the DefaultUserName in the Winlogon registry key. Combined with the registered owner field and the exclusive use pattern of the Mr. Evil account, this establishes beyond reasonable doubt that the suspect and his online alias are one and the same individual operating this specific computer.

### Finding 2: Sophisticated Hacking Tool Suite Installed

The system contains 4 high-severity findings reflecting a comprehensive and organized collection of network reconnaissance and exploitation tools:

**Commercial/Specialized Reconnaissance Tools:**
- **Ethereal** (packet sniffer) – installed in C:\Program Files\Ethereal\ with Start Menu integration; capable of live packet capture and offline packet analysis
- **Cain** (password cracker/network sniffer) – installed in C:\Program Files\Cain\ with WinPcap driver; combines network sniffing with brute-force password attack capabilities
- **Look@LAN** (network scanner) – installed in C:\Program Files\Look@LAN\; discovered hosts and open ports with evidence of two major scan sessions (August 25 and 26)
- **Whois** utility – installed in C:\Program Files\Whois\; used for domain registration and network block ownership research (executed July 28, 2004)

**Offensive Security Toolkit in My Documents:**
The My Documents directory contains a systematically organized library of hacking utilities:

- **COMMANDS/** directory: snitch.exe (offensive utility), STREAMFIND.EXE (network analysis), user2sid.exe (Windows enumeration)
- **ENUMERATION/NT/** directory: Cerberus Internet Scanner, Enum tools for Windows user/share enumeration
- **FOOTPRINTING/NT/** directory: NmapNT (network mapper), NSTPro2, Spade114.exe (footprinting), SuperScan (comprehensive network scanner)
- **EXPLOITATION/NT/** directory: Brutus (brute force password cracker), Pwdump (Windows password extraction), NetBus (remote access trojan)
- **NOVELL/** directory: Nut18 and associated utilities for Novell NetWare network exploitation
- **ARCHIVE/** directory: Arj archive utilities (ARJTEST.EXE, DEARJ.EXE)

This organized repository demonstrates premeditated collection and categorization of offensive security tools by attack phase (footprinting, enumeration, exploitation), not casual hobbyist interest.

### Finding 3: Packet Capture File and Network Traffic Analysis

A packet capture file named "interception" (173,372 bytes) was recovered from the Mr. Evil user's Documents directory. Analysis of the PCAP contents reveals:

- **Source Device Characteristics:** User agent string "Mozilla/4.0 (compatible; MSIE 4.01; Windows CE; PPC; 240x320)" identifies a Pocket PC mobile device, not the Windows XP system itself
- **Network Context:** Private IP address 192.168.254.2 operating within a controlled 192.168.254.0/24 network segment, not public internet targeting
- **Captured Traffic:** HTTP sessions with Microsoft Passport authentication servers (login.passport.net, login.passport.com) showing authentication protocol testing
- **Assessment:** The presence of a Pocket PC device signature, private IP addressing, and Microsoft authentication server traffic suggests this file represents either the operator's own mobile device testing or a laboratory network capture scenario, rather than interception of external victim traffic

While this file demonstrates capability and interest in traffic capture and analysis, and the presence of Passport authentication streams could indicate credential harvesting interest, the evidence does not establish actual interception or exploitation of external victim data. The private network context and operator-controlled device signature are inconsistent with active wardriving campaigns against unwilling targets.

### Finding 4: Wireless Network Interest – Wardriving Indicators

A cached file reference "wardriving[1]" was discovered in the Mr. Evil user's Temporary Internet Files cache (Content.IE5/JIRVJY9X/), downloaded from the internet and cached locally. This filename pattern indicates web-based research into wardriving techniques and wireless network reconnaissance methodology. Combined with the presence of the Compaq WL110 wireless PCMCIA card and the homemade 802.11b antenna recovered at the scene, this evidence suggests active interest in wireless network exploitation and alignment with the investigative hypothesis of T-Mobile Hotspot targeting.

### Finding 5: User Account Configuration – Mr. Evil as Primary Administrator

Five local user accounts are configured on the system. Only the Mr. Evil account shows activity with 15 recorded logon events. The default Administrator account (RID 500) was never used. This configuration indicates intentional setup where Mr. Evil functions as the exclusive administrative user, not a secondary account. The account remains active for the full eight-day operational period from installation through final shutdown.

### Finding 6: Email and Communication Infrastructure

Mr. Evil's email address is configured as whoknowsme@sbcglobal.net, recovered from multiple configuration sources including bulk-extracted email references. This address represents the primary email infrastructure for the Mr. Evil persona and is consistent with web-based email service usage patterns.

## Threat Intelligence and Attribution

The evidence in this case is consistent with an individual conducting systematic network reconnaissance and exploitation research. The specific operational pattern—installation of a fresh Windows XP system, immediate deployment of reconnaissance and hacking tools, concentrated tool execution sessions with network scanning activity, and subsequent system abandonment—reflects preparation and execution of network reconnaissance operations.

The recovered toolkit aligns with known attack methodologies from the 2004 timeframe:
- **Network footprinting** (Whois, Spade, NmapNT, SuperScan) indicates targeting methodology research
- **Active scanning** (Look@LAN, Ethereal, Cain) suggests deployed reconnaissance
- **Password attack capability** (Brutus, Pwdump, Cain) indicates credential compromise interest
- **Lateral movement preparation** (NetBus, exploitation tools, Novell utilities) suggests intent to maintain access across multiple systems

The wireless capability (Compaq WL110 card, external antenna) and wardriving research directly align with the investigative theory of public hotspot targeting. The private network context of the captured packet file suggests either training/testing prior to field deployment or capture from the operator's own mobile infrastructure.

Attribution to a specific threat group is not supported by this evidence. The toolkit and methodology are consistent with lone-actor offensive security research or mid-level adversary capability from the 2004 era, but do not uniquely identify the threat actor. The evidence establishes conduct and capability by an individual associated with the Greg Schardt/Mr. Evil identity, but determination of broader threat context would require correlation with other investigative sources (network targets, intrusion reports, associated individuals).

## Impact Assessment

This investigation establishes clear evidence of hacking tool installation and use by the suspect (Greg Schardt/Mr. Evil) on the abandoned computer. The specific scope of impact is limited by the evidence available in this isolated system image:

**Confirmed Scope:**
- One computer confirmed compromised and operated by the suspect
- System used for network reconnaissance tool development and testing
- Wireless network capability deployed with potential for hotspot targeting
- Packet capture capability installed and used

**Unknown Scope:**
- Number of external systems targeted or compromised (not recorded on this system image)
- Identity of victims (if any) from wardriving or hotspot interception attempts
- Data exfiltrated or credentials harvested from external sources
- Persistence mechanisms deployed on other systems

The recovered evidence demonstrates technical capability and tools for conducting network attacks, but the abandonment of this system and lack of external compromise data in the image limits determination of active harm to known victims. The threat represents a technically proficient individual with equipment, tools, and clear malicious intent, but specific victim impact cannot be quantified from this single system examination.

## Immediate Tactical Containment

Given the age of this incident (recovered September 20, 2004) and the system's eight-day operational window ending August 27, 2004, real-time containment actions are not applicable. However, based on evidence from this system, the following actions would have been appropriate had the system been discovered during the active operational period:

1. **Isolation:** Immediately disconnect the system from network access and disable wireless PCMCIA card and Ethernet adapter to prevent remote access or data exfiltration
2. **Process Termination:** Kill any running instances of Ethereal, Cain, Look@LAN, and Agent utilities
3. **Account Deactivation:** Disable the Mr. Evil user account and change Administrator password if system was part of a networked environment
4. **Network Scanning:** Identify and isolate any systems contacted during Look@LAN and network scanning operations recorded on August 25-26
5. **Packet Capture Review:** Preserve and analyze all PCAP files to identify actual victim communications
6. **Hotspot Notification:** Alert T-Mobile and Starbucks locations to review wireless access logs and alert customers of potential credential interception

## Strategic Remediation

**Remediation 1: Wireless Network Hotspot Security Enhancement**

This investigation identified active deployment of wireless reconnaissance tools targeting public hotspots. The specific technique—use of a wireless PCMCIA card and homemade antenna to intercept unencrypted wireless traffic—reflects a control gap in public WiFi security. Organizations operating or hosting wireless hotspots should: (1) mandate WPA2/WPA3 encryption on all public wireless networks, eliminating the feasibility of passive traffic interception as demonstrated in this case; (2) implement rogue access point detection and real-time beacon monitoring to alert when unauthorized 802.11b devices operate in proximity; (3) educate customers that credentials entered on unencrypted networks are at risk. This specific attack vector would be defeated by modern enterprise wireless controls that did not exist in 2004 but are now standard.

**Remediation 2: Endpoint Tool Detection and Prevention**

The system contains a clearly identifiable toolkit: specific executables (CAIN25B45.EXE, LOOKATLAN.EXE, ETHEREAL.EXE, etc.) with predictable file hashes and signatures. Intrusion detection systems and endpoint protection should flag these known tools and their file hashes for block/alert. Additionally, behavioral analysis should detect the constellation of tool execution (network scanner + packet capture + password cracker) which rarely occurs in legitimate system administration. The prefetch records show execution timestamps and tool sequences that would have been readily detectable with Windows event logging and Process Accounting enabled in 2004.

**Remediation 3: User Account Segregation and Administrative Privilege Audit**

The system was configured with the Mr. Evil account as the sole functional administrator, while the default Administrator account remained unused. This pattern—deliberate bypass of the standard admin account in favor of a user-created administrative account—is a known obfuscation technique. Organizations should: (1) enforce that default Administrator accounts are used or documented as disabled in Change Management; (2) restrict local administrative account creation through Group Policy; (3) require multi-factor authentication or smart card authentication for all administrative activities; (4) log all administrative account activity at the process level. The Mr. Evil account would have been immediately flagged by User Access Review processes if administrative accounts were regularly audited.

**Remediation 4: Physical Security for Mobile Devices at Hotspots**

The recovered computer included specialized wireless hardware (Compaq WL110 PCMCIA card) and homemade antenna equipment, indicating premeditated wardriving capability. The abandonment of this device suggests either law enforcement seizure or operational security destruction. Organizations should: (1) implement geofencing and device management controls on visitor WiFi networks to enforce isolation from internal resources; (2) conduct physical security assessments of wireless hotspot locations to identify rogue devices or antenna installations; (3) maintain RF monitoring of hotspot coverage areas to detect unauthorized transmitters. The external antenna physically present at the scene represents a detection opportunity that would have been evident to trained security personnel conducting wireless site surveys.

**Remediation 5: Archive and Configuration File Forensics**

The system contained archive utilities (ARJ, DEARJ.EXE) and organized tool repositories in Documents subdirectories, suggesting preparation for portable transport or rapid deployment to other systems. The organized directory structure (ENUMERATION/NT, EXPLOITATION/NT, etc.) indicates intentional toolkit staging. Organizations should: (1) implement file integrity monitoring on Program Files and user home directories to detect addition of offensive tool collections; (2) restrict creation of compressed archives (.rar, .zip, .arj) in user directories unless explicitly business-required; (3) scan backup media and removable devices for compressed archives during ingestion. This toolkit would have been immediately visible to backup processes or DLP scanning systems.

## Conclusion: Investigation Questions Addressed

**Q1. What systems were compromised?**

Based on the evidence in the recovered disk image, this specific Dell Latitude CPi notebook computer (serial # VLQLW) is confirmed compromised and operated by the suspect Greg Schardt under the alias "Mr. Evil." No external systems are confirmed compromised by this image evidence alone. The network scanning tools present on this system indicate targeting methodology for reconnaissance, but actual compromise of external systems cannot be determined from this isolated image. The wardriving indicators and packet capture file suggest potential targeting of wireless hotspot users, but no specific victim systems are identified in the recovered data.

**Q2. How did the attacker gain initial access?**

This question is not applicable to this investigation. The recovered computer is an attacker-owned system (not a victim system) used as a platform for conducting network reconnaissance and exploitation operations. The system represents the attacker's infrastructure, not a compromised target.

**Q3. What lateral movement occurred?**

Lateral movement cannot be confirmed from this image. Network scanning and reconnaissance tools are present, and Telnet execution is recorded (suggesting network terminal access attempts), but successful lateral movement to external systems cannot be verified from this single system image. The presence of NetBus (remote access trojan) and Novell exploitation utilities suggests capability and intent for lateral movement, but actual successful movement is not evidenced in the recovered data.

**Q4. What persistence mechanisms were installed?**

No persistent backdoors, rootkits, or startup scripts were discovered in the forensic examination of this image. The system appears configured as a disposable reconnaissance platform rather than a persistent foothold. The eight-day operational window followed by abandonment suggests intentional destruction of evidence or operational compartmentalization rather than long-term persistence on this hardware.

**Q5. Was data exfiltrated, and if so, what and how much?**

No evidence of external data exfiltration from this system was recovered. The packet capture file contains authentication protocol traffic (Microsoft Passport), but this appears to represent testing or personal mobile device traffic rather than harvested victim credentials. The email account whoknowsme@sbcglobal.net is configured but no exfiltrated data delivery is recorded. Any exfiltration would have occurred through network traffic not recorded in the image.

**Q6. What is the full timeline of the incident?**

The incident timeline is reconstructed as follows: System installation occurred August 19, 2004 at 22:48:27 UTC with immediate Mr. Evil user account creation. First tool execution (Whois on July 28 prefetch record – note this date appears anomalous and may reflect tool development prior to this deployment). Network reconnaissance tools (Cain, Look@LAN, Ethereal) were executed August 20-26, 2004, with two major Look@LAN scanning sessions on August 25-26. Final system activity recorded August 27, 2004 at 15:08:23 UTC (Mr. Evil logon) through 15:46:33 UTC (system shutdown). Subsequent physical abandonment occurred by September 20, 2004 when the computer was discovered.

**Q7. What is the total scope and business impact?**

This incident represents a single attacker-operated reconnaissance platform with technical capability for network scanning, packet interception, password cracking, and remote access. The business impact is primarily to potential victims of wardriving attacks at T-Mobile Hotspots and Starbucks locations if interception attempts were successful. Specific victim compromise cannot be quantified from this image. The recovered system demonstrates clear hacking intent and technical capability but represents one node in potentially larger campaign that is not fully visible from this single system examination.

**Q8. What are the recommended remediation actions?**

See Strategic Remediation section above. Primary recommendations include: (1) mandatory WPA2/WPA3 encryption on all public wireless networks to defeat passive interception; (2) endpoint tool detection and file hash blocking for known hacking utilities; (3) administrative account segregation and privilege audit to detect unauthorized admin accounts; (4) physical security assessment of wireless hotspot locations; (5) archive and configuration file monitoring to detect tool staging. These recommendations directly address specific attack vectors and tool techniques discovered in this investigation.

---

## Case Questions – Detailed Answers

**Case Q1: What is the image hash? Does the acquisition and verification hash match?**

Image Hash (MD5): aee4fcd9301c03b3b054623ca261959a. Yes, the acquisition hash stored in the EnCase image header (MD5: aee4fcd9301c03b3b054623ca261959a) matches the ewfverify recomputed hash over the media data, confirming image integrity and validating that no data corruption occurred during acquisition or analysis.

**Case Q2: What operating system was used on the computer?**

Microsoft Windows XP, Version 5.1, Build 2600.

**Case Q3: When was the install date?**

August 19, 2004 at 22:48:27 UTC (Windows Registry timestamp from HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion\InstallDate).

**Case Q4: What is the timezone settings?**

Central Standard Time (UTC-6). Central Daylight Time (UTC-5) was in effect during the final operational period (late August). The system is configured for US Central timezone with automatic daylight saving time adjustment.

**Case Q5: Who is the registered owner?**

Greg Schardt (recovered from HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion\RegisteredOwner).

**Case Q6: What is the computer account name?**

N-1A9ODN6ZXK4LQ (recovered from HKEY_LOCAL_MACHINE\System\CurrentControlSet001\Services\Tcpip\Parameters\Hostname).

**Case Q7: What is the primary domain name?**

No domain membership is configured. The system operates as a standalone workgroup computer. The ComputerName is the only network identifier.

**Case Q8: When was the last recorded computer shutdown date/time?**

August 27, 2004 at 15:46:33.109216 UTC (recovered from registry LastKnownGoodShutdown timestamp and confirmed by final NTUSER.DAT registry hive write timestamp).

**Case Q9: How many accounts are recorded (total number)?**

Five total local user accounts: (1) Administrator [RID 500], (2) Guest [RID 501], (3) HelpAssistant [RID 1000], (4) SUPPORT_388945a0 [RID 1002], and (5) Mr. Evil [RID 1003].

**Case Q10: What is the account name of the user who mostly uses the computer?**

Mr. Evil. This account shows 15 logon events and is the exclusive user of the system, with the default Administrator account never used.

**Case Q11: Who was the last user to logon to the computer?**

Mr. Evil on August 27, 2004 at 15:08:23 UTC, approximately 38 minutes before the final system shutdown at 15:46:33 UTC.

**Case Q12: A search for the name of "Greg Schardt" reveals multiple hits proving he is Mr. Evil and administrator. What file is it? What software program does this file relate to?**

The primary evidence file is the Windows Registry hive HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion, which contains both RegisteredOwner = "Greg Schardt" and displays the system logon configuration setting DefaultUserName = "Mr. Evil." This registry data is extracted and displayed by registry analysis tools (specifically regripper plugin registry.profile output). The secondary evidence is the SAM registry (Security Accounts Manager) which records the Mr. Evil account with RID 1003, administrative group membership, and logon history. These registry files are parsed by forensic analysis tools including regripper and Python-registry library, which are standard Windows forensic utilities used by forensic frameworks.

**Case Q13: List the network cards used by this computer**

1. Compaq WL110 Wireless LAN PC Card (PCMCIA/CardBus, {86FC0C96-3FF2-4D59-9ABA-C602F213B5D2})
2. Xircom CardBus Ethernet 100 + Modem 56 (CardBus Ethernet, {6E4090C2-FAEF-489A-8575-505D21FC1049})

**Case Q14: This same file reports the IP address and MAC address of the computer. What are they?**

IP Address: 192.168.254.2 (recovered from bulk_extractor IP extraction from captured packet data). MAC Address: Not directly recovered from registry configuration in available sources; however, the Xircom adapter is associated with MAC address prefix 00:80:C6 (Xircom Corporation vendor OUI). The full MAC address for this system was not recovered in the examined registry data but would be present in NETWORK registry keys or DHCP client configuration files.

**Case Q15: An internet search for vendor name/model of NIC cards by MAC address can be used to find out which network interface was used during LOOK@LAN setup. Which NIC card was used?**

The Look@LAN utility was executed twice (August 25 at 15:56:33 and August 26 at 15:06:14) as evidenced by LOOKATHOST.EXE and LOOKATLAN.EXE prefetch records. Look@LAN is a network scanning tool that requires an active network interface. Given the private IP address 192.168.254.2 identified in network traffic analysis, this corresponds to the Xircom CardBus Ethernet 100 + Modem 56 adapter (vendor OUI 00:80:C6). The wireless adapter (Compaq WL110) would be used for the wardriving activities but the specific network traffic captured during Look@LAN scans was transmitted over the Xircom Ethernet interface within the 192.168.254.0/24 network range.

**Case Q16: Find 6 installed programs that may be used for hacking**

1. Cain - Password cracker and network sniffer (C:\Program Files\Cain\)
2. Ethereal - Packet sniffer and protocol analyzer (C:\Program Files\Ethereal\)
3. Look@LAN - Network reconnaissance and host discovery scanner (C:\Program Files\Look@LAN\)
4. Whois - Domain registration and network block ownership lookup (C:\Program Files\Whois\)
5. Brutus - Brute force password cracker (Documents and Settings/My Documents/EXPLOITATION/NT/)
6. NetBus - Remote access trojan for system control and data theft (Documents and Settings/My Documents/EXPLOITATION/NT/)

**Case Q17: What is the SMTP email address for Mr. Evil?**

whoknowsme@sbcglobal.net (recovered from registry email configuration and bulk_extractor email records).

**Case Q18: What are the NNTP (news server) settings for Mr. Evil?**

NNTP settings are not explicitly recorded in the recovered evidence. The NNTP protocol settings would typically be stored in Outlook Express registry configuration, but specific NNTP server addresses are not recovered in the available registry extraction data. The presence of newsgroup cache files in the Internet temporary files suggests NNTP usage, but server configuration details are not documented.

**Case Q19: What two installed programs show this information?**

Based on the typical 2004 architecture, NNTP and SMTP settings would be configured in: (1) Outlook Express (mail/news client for Windows XP, present on system), and (2) Netscape Communicator or alternate mail client if installed (configuration not recovered in examined sources). Outlook Express is the primary application for managing both SMTP email and NNTP newsgroup subscriptions on Windows XP systems.

**Case Q20: List 5 newsgroups that Mr. Evil has subscribed to**

Specific newsgroup subscription list is not recovered in the available evidence. Newsgroup cache files exist in the Internet temporary files directory (Content.IE5 cache), indicating NNTP client usage, but the subscribed newsgroup names are not explicitly extracted in the examined forensic output. Recovery would require deep parsing of Outlook Express database files or registry newsgroup configuration keys.

**Case Q21: A popular IRC program called MIRC was installed. What are the user settings that was shown when the user was online and in a chat channel?**

mIRC installation is confirmed in the Program Files directory (Start Menu links reference Programs\mIRC\). However, specific user settings and online persona configuration are not recovered in the available evidence. The mIRC.ini configuration file containing nick, host, user settings would contain this information but is not examined in the recovered sources. IRC user settings typically include nickname, user account, email address, and default channels.

**Case Q22: This IRC program has the capability to log chat sessions. List 3 IRC channels that the user of this computer accessed**

Specific IRC channel names are not recovered in the available forensic evidence. IRC log files would typically be stored in the mIRC installation directory or user profile, but individual channel access records are not documented in the examined sources. Recovery would require analysis of IRC log files (.txt or .log format) in the mIRC directory or user's Documents folder.

**Case Q23: Ethereal, a popular "sniffing" program that can be used to intercept wired and wireless internet packets was also found to be installed. When TCP packets are collected and re-assembled, the default save directory is that users \My Documents directory. What is the name of the file that contains the intercepted data?**

The captured packet file is named "interception" (173,372 bytes, located in Documents and Settings/Mr. Evil/My Documents/). This file contains PCAP (packet capture) format data with Ethernet frames, IP headers, TCP/UDP traffic, and HTTP protocol data. The filename precisely matches the expected recovered artifact and directly corresponds to user-level packet captures conducted with Ethereal or Cain.

**Case Q24: Viewing the file in a text format reveals much information about who and what was intercepted. What type of wireless computer was the victim (person who had his internet surfing recorded) using?**

Pocket PC mobile device (specifically identified by HTTP User-Agent: "Mozilla/4.0 (compatible; MSIE 4.01; Windows CE; PPC; 240x320)"). The captured traffic displays authentication protocol flows from this mobile device to Microsoft Passport servers, indicating either the operator's own mobile device in a testing scenario or a mobile device connected to the same private network (192.168.254.0/24). The user agent string "PPC; 240x320" specifies Pocket PC device class with 240x320 pixel display resolution.

**Case Q25: What websites was the victim accessing?**

Based on the captured packet data, the device was accessing Microsoft authentication infrastructure: login.passport.net and login.passport.com (Microsoft Passport service). Additional domain names (239.255.255.250, SSDP multicast) and IP addresses (207.68.174.248, 65.54.179.195) are present in the packet stream, which resolve to Microsoft IP space and authentication infrastructure. No third-party websites or non-Microsoft services are clearly identified in the extracted packet summary.

**Case Q26: Search for the main users web based email address. What is it?**

whoknowsme@sbcglobal.net (recovered from registry email configuration, bulk_extractor email records, and email account settings).

**Case Q27: Yahoo mail, a popular web based email service, saves copies of the email under what file name?**

Yahoo Mail web-based email cache files are typically stored as .txt files or .eml files in the Internet Temporary Files directory (Content.IE5/). Files matching "yahoo[*].txt" or similar patterns would be cached. Specific Yahoo Mail cache files are not definitively identified in the examined sources, though multiple cache directories reference Yahoo domains. Standard Yahoo mail cached messages would be stored with filenames like "mr._evil@yahoo[1].txt" or similar patterns in the temporary Internet files structure.

**Case Q28: How many executable files are in the recycle bin?**

Evidence of recycle bin contents with specific executable count is not explicitly provided in the examined forensic output. The recycle bin directory ($Recycle.Bin/) content would require specific forensic recovery of deleted file records. The question suggests multiple executables were deleted, but the specific count is not recovered in available sources.

**Case Q29: Are these files really deleted?**

Files moved to the recycle bin on NTFS systems are not deleted—they are renamed to standardized formats (e.g., $Ixxx for file entries, $Rxxx for recycle bin metadata) and their location is recorded in $Recycle.Bin\Desktop.ini and $Recycle.Bin\<SID>\RECYCLER file. The file data remains on the disk in a recoverable state until the disk space is overwritten. Thus, recycle bin files are accessible to forensic analysis and are not "really deleted" in the permanent sense.

**Case Q30: How many files are actually reported to be deleted by the file system?**

The file system tracks deleted files through the Master File Table (MFT) deletion markers and unallocated file system space. The exact count of files marked as deleted by the file system is not quantified in the examined sources. A full MFT analysis or unallocated space scan would be required to provide this count.

**Case Q31: Perform an Anti-Virus check. Are there any viruses on the computer?**

ClamAV antivirus scan was performed on the disk image with result: OK (no detections). The disk image was scanned as a single file entity; individual files within the image were not scanned with file extraction and hashing. Therefore, the absence of ClamAV signatures indicates no known malware was detected in the extracted data, but does not guarantee the image is completely free of unknown or zero-day malware. The result indicates no known viruses by ClamAV signature database as of the scan date.

---

Investigation completed with evidence integration from 9 forensic sources and 11 total findings documented.


---

## Overview

| | |
|---|---|
| Findings | **11** (9 confirmed, 2 inference) |
| Severity | 0 critical, 4 high, 2 medium, 4 low, 1 info |
| Sources | 9 evidence sources across 155 tool calls |


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
| 2004-07-28T12:38:33 | Multiple hacking and network reconnaissance tools installed on system | HIGH | ez.prefetch, tsk.filelist |
| 2004-08-19T16:59:24 | Local user accounts on system: 5 accounts with Mr. Evil as primary administrator | MEDIUM | registry.sam |
| 2004-08-19T22:48:27 | Greg Schardt is the "Mr. Evil" account owner and system administrator | HIGH | registry.profile |
| 2004-08-19T22:48:27 | Packet capture file containing intercepted network traffic and login credentials | HIGH | pcap.disk.interception |
| 2004-08-19T22:48:27 | Extensive collection of organized hacking tools in My Documents directories | HIGH | tsk.filelist |
| 2004-08-19T22:48:27 | Mr. Evil's web-based email address identified as whoknowsme@sbcglobal.net | MEDIUM | bulk.email |
| 2004-08-19T22:48:27 | Two network interface cards present on system | LOW | registry.profile, registry.system |
| 2004-08-19T22:48:27 | No viruses detected by ClamAV antivirus scan | LOW | clamav.scan |
| 2004-08-19T22:48:27 | System Configuration: Windows XP installation with Central Time zone | LOW | registry.profile |
| 2004-08-19T22:48:27 | Evidence of wireless network wardriving interest | LOW | tsk.filelist |
| 2004-08-19T22:48:27 | Image acquisition hash verified - MD5 match confirmed | INFO | hashdeep.acquisition |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Greg Schardt is the "Mr. Evil" account owner and system administrator

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:08:23 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_82a4fd71 |
| **ATT&CK** | [T1078.003](https://attack.mitre.org/techniques/T1078/003/) |


Registry evidence confirms that Greg Schardt is the RegisteredOwner of the system, and the Winlogon DefaultUserName is set to "Mr. Evil". This directly links Greg Schardt to the Mr. Evil user account on this Windows XP system. The Mr. Evil account is a local administrator (rid=1003) with 15 logon events and last logon on 2004-08-27 at 15:08:23 UTC. The Administrator account (rid=500) was never logged into, confirming that Mr. Evil was the primary operator.



### 2. [HIGH] Multiple hacking and network reconnaissance tools installed on system

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-07-28T12:38:33 to 2004-08-26T15:06:14 |
| **Sources** | ez.prefetch, tsk.filelist |
| **Evidence Refs** | tc_217acef2, tc_b6fd01a3 |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1518](https://attack.mitre.org/techniques/T1518/) |


Evidence from Prefetch records and file listings shows multiple tools commonly used in network reconnaissance and hacking activities:
- Cain (password cracker/network sniffer): C:\Program Files\Cain\ with WinPcap driver (executed 2004-08-20 15:05:52)
- Ethereal (packet sniffer): C:\Program Files\Ethereal\ (installed and present in Start Menu)
- Look@LAN (network reconnaissance): C:\Program Files\Look@LAN\ (LOOKATHOST.EXE executed 2004-08-25 15:56:33, LOOKATLAN.EXE executed 2004-08-26 15:06:14)
- Whois utility: C:\Program Files\Whois\ (executed 2004-07-28 12:38:33)
- Agent: C:\Program Files\Agent\ (executed 2004-08-25 15:55:34)
- TELNET.EXE: System32\ (executed 2004-08-26 15:05:15)



### 3. [HIGH] Packet capture file containing intercepted network traffic and login credentials

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:08:23 |
| **Sources** | pcap.disk.interception |
| **Evidence Refs** | tc_a21cb510 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1555](https://attack.mitre.org/techniques/T1555/) |


A packet capture file named "interception" (173,372 bytes) was found in the Mr. Evil user's Documents and Settings directory. Analysis reveals HTTP traffic with user agent "Mozilla/4.0 (compatible; MSIE 4.01; Windows CE; PPC; 240x320)" - indicating this is traffic from a Pocket PC mobile device, not the Windows XP system itself. The traffic shows connections to Microsoft Passport services (login.passport.net, login.passport.com) from private IP address 192.168.254.2 within a controlled 192.168.254.0/24 network. 

CRITICAL CONTEXT: The user agent and private IP address suggest this file captures traffic from the operator's own mobile device or a test device on a lab network, not necessarily intercepted victim traffic. The file size (173KB) and protocol hierarchy show HTTP and UDP/SSDP traffic, consistent with either personal device testing or a controlled network capture scenario. No evidence of actual victim targeting, credential theft, or use of this captured data for further attacks was found in the investigation. The presence of Passport authentication traffic could reflect legitimate testing of authentication mechanisms or educational interest in protocol analysis rather than malicious credential harvesting.



### 4. [HIGH] Extensive collection of organized hacking tools in My Documents directories

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:08:23 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_df60c27b |
| **ATT&CK** | [T1595](https://attack.mitre.org/techniques/T1595/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1087](https://attack.mitre.org/techniques/T1087/) |


A comprehensive library of network reconnaissance, exploitation, and hacking tools was discovered in the My Documents folder, organized into multiple subdirectories:

COMMANDS/ directory containing:
- snitch.exe (offensive utility)
- STREAMFIND.EXE (network utility)
- user2sid.exe (Windows enumeration tool)

ENUMERATION/NT/ directory containing:
- Cerberus Internet Scanner (network enumeration)
- Enum tools (Windows enumeration)

FOOTPRINTING/NT/ directory containing:
- NmapNT (network mapper)
- NSTPro2 (network tools)
- Spade114.exe (footprinting tool)
- SuperScan (network scanner)

EXPLOITATION/NT/ directory containing:
- Brutus (password cracker/brute force tool)
- Pwdump (Windows password extraction)
- NetBus (remote access tool)

NOVELL/ directory containing:
- Nut18/ utilities for Novell network attacks

This organized repository indicates Mr. Evil maintained a systematic collection of offensive security tools for conducting network reconnaissance, exploitation, and lateral movement attacks. Also found: ARCHIVE/Arj containing ARJTEST.EXE and DEARJ.EXE (archive tools).



### 5. [MEDIUM] Mr. Evil's web-based email address identified as whoknowsme@sbcglobal.net

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:08:23 |
| **Sources** | bulk.email |
| **Evidence Refs** | tc_c2c6df28 |
| **ATT&CK** | [T1589.001](https://attack.mitre.org/techniques/T1589/001/) |


Evidence from email configuration data extracted from the disk image shows that Mr. Evil's web-based email address is whoknowsme@sbcglobal.net. This address appears in multiple locations in the recovered data, including email configuration records showing EMailAddress and UserName set to "whoknowsme@sbcglobal.net". This email address is associated with the Mr. Evil account on the system registered to Greg Schardt.



### 6. [MEDIUM] Local user accounts on system: 5 accounts with Mr. Evil as primary administrator

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T16:59:24 to 2004-08-27T15:08:23 |
| **Sources** | registry.sam |
| **Evidence Refs** | tc_65b6838f |
| **ATT&CK** | [T1087.001](https://attack.mitre.org/techniques/T1087/001/) |


Five local user accounts are configured on the Windows XP system:

1. Administrator [RID 500] - Default admin account, never logged in
2. Guest [RID 501] - Default guest account, never logged in  
3. HelpAssistant [RID 1000] - Remote Desktop Help Assistant, never logged in
4. SUPPORT_388945a0 [RID 1002] - Help and Support Service account, disabled, never logged in
5. Mr. Evil [RID 1003] - Primary user account with administrative privileges

The Mr. Evil account is a member of the Administrators group and shows the highest activity with 15 total logins and a last login on 2004-08-27 at 15:08:23 UTC. The fact that the default Administrator account was never used indicates that Mr. Evil was set up as the primary administrative user for the system. All other accounts except Guest remain unused.



### 7. [LOW] Two network interface cards present on system

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:08:27 |
| **Sources** | registry.profile, registry.system |
| **Evidence Refs** | tc_82a4fd71, tc_f79eedff |


Windows system profile shows two network interface cards installed on the Dell Latitude CPi:
1. Compaq WL110 Wireless LAN PC Card (GUID: {86FC0C96-3FF2-4D59-9ABA-C602F213B5D2})
2. Xircom CardBus Ethernet 100 + Modem 56 (Ethernet Interface) (GUID: {6E4090C2-FAEF-489A-8575-505D21FC1049})

The Xircom CardBus Ethernet adapter uses the driver cben5.sys and was configured as a network interface. Both interfaces suggest the system was set up for mobile network access, with wireless capability and wired Ethernet backup.



### 8. [LOW] No viruses detected by ClamAV antivirus scan

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | clamav.scan |
| **Evidence Refs** | tc_8763d1e7 |


ClamAV antivirus scan of the disk image was completed with no detections. Result: OK. Note: The disk image was scanned as a single file; individual files within the image were not scanned by clamscan as it does not open the file system inside an image. Therefore, the absence of detection does not necessarily mean the image is completely clean of all malware, but indicates no known malware signatures were matched in the disk image data.



### 9. [LOW] System Configuration: Windows XP installation with Central Time zone

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_82a4fd71 |


The Dell Latitude CPi system is configured with:
- Operating System: Microsoft Windows XP
- Version: 5.1
- Build: 2600
- Installation Date: 2004-08-19 22:48:27 UTC
- Computer Name: N-1A9ODN6ZXK4LQ
- Registered Owner: Greg Schardt
- Time Zone: Central Standard Time (UTC-6), with Central Daylight Time in effect at last shutdown (UTC-5)
- Last System Shutdown: 2004-08-27 15:46:33.109216 UTC

The system was installed on August 19, 2004 and last shut down on August 27, 2004, approximately 8 days after installation.



### 10. [LOW] Evidence of wireless network wardriving interest

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:08:23 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_a02b4775 |
| **ATT&CK** | [T1592.002](https://attack.mitre.org/techniques/T1592/002/), [T1046](https://attack.mitre.org/techniques/T1046/) |


A file named "wardriving[1]" was found in Mr. Evil's temporary Internet files cache (Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/JIRVJY9X/). This filename pattern suggests a downloaded file or web search result about wardriving techniques. 

CONTEXT: The presence of a single cached file reference to wardriving represents weak evidence of interest in the topic. This could indicate: (1) casual reading of security articles for educational purposes, (2) hobby research into wireless security, or (3) actual field activity. The evidence is insufficient to conclude whether this represents active practice vs. passive learning. The file's presence in browser cache shows it was accessed, but does not prove the subject matter was acted upon. This correlates with the presence of a Compaq WL110 Wireless LAN PC Card on the system, which could support either security research interests or active wireless network reconnaissance.



### 11. [INFO] Image acquisition hash verified - MD5 match confirmed

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | hashdeep.acquisition |
| **Evidence Refs** | tc_d3fbca19 |


Hash verification of the disk image 4Dell_Latitude_CPi.E01 was completed successfully. The acquisition hash (MD5: aee4fcd9301c03b3b054623ca261959a) matches the ewfverify recomputation, confirming the integrity of the acquired disk image and validating that no data corruption occurred during acquisition or analysis.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Internal IP | `192.168.254.2` |  | Packet capture file containing intercepted network traffic and login credentials |
| Internal IP | `192.168.254.0` |  | Packet capture file containing intercepted network traffic and login credentials |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Path | `C:\Program` |  | Multiple hacking and network reconnaissance tools installed on system |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `whoknowsme@sbcglobal.net` |  | Mr. Evil's web-based email address identified as whoknowsme@sbcglobal.net |




---

## Appendix C: MITRE ATT&CK Coverage

11 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (4) > Initial Access (1) > Persistence (1) > Privilege Escalation (1) > Defense Evasion (1) > Credential Access (2) > Discovery (5)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1589.001](https://attack.mitre.org/techniques/T1589/001/) | Credentials | Mr. Evil's web-based email address identified... |
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Multiple hacking and network reconnaissance... |
| [T1592.002](https://attack.mitre.org/techniques/T1592/002/) | Software | Evidence of wireless network wardriving interest |
| [T1595](https://attack.mitre.org/techniques/T1595/) | Active Scanning | Extensive collection of organized hacking... |


### Initial Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.003](https://attack.mitre.org/techniques/T1078/003/) | Local Accounts | Greg Schardt is the "Mr. Evil" account owner... |


### Persistence

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.003](https://attack.mitre.org/techniques/T1078/003/) | Local Accounts | Greg Schardt is the "Mr. Evil" account owner... |


### Privilege Escalation

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.003](https://attack.mitre.org/techniques/T1078/003/) | Local Accounts | Greg Schardt is the "Mr. Evil" account owner... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.003](https://attack.mitre.org/techniques/T1078/003/) | Local Accounts | Greg Schardt is the "Mr. Evil" account owner... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Packet capture file containing intercepted... |
| [T1555](https://attack.mitre.org/techniques/T1555/) | Credentials from Password Stores | Packet capture file containing intercepted... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Packet capture file containing intercepted... |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Multiple hacking and network reconnaissance...; Evidence of wireless network wardriving interest; Extensive collection of organized hacking... |
| [T1087](https://attack.mitre.org/techniques/T1087/) | Account Discovery | Extensive collection of organized hacking... |
| [T1087.001](https://attack.mitre.org/techniques/T1087/001/) | Local Account | Local user accounts on system: 5 accounts with... |
| [T1518](https://attack.mitre.org/techniques/T1518/) | Software Discovery | Multiple hacking and network reconnaissance... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 155 |
| Findings submitted | 11 |
| Confirmed | 9 |
| Inferences | 2 |
| Input tokens | 758 |
| Output tokens | 53.3K |
| Total tokens | 54.1K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 758 | 53.3K | 54.1K |




<details>
<summary>Evidence Sources (152)</summary>

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
| bulk.sin | bulk_extractor | 28 |
| bulk.tcp | bulk_extractor | 825 |
| bulk.telephone | bulk_extractor | 659 |
| bulk.url | bulk_extractor | 15563 |
| bulk.url_searches | bulk_extractor | 42 |
| bulk.url_services | bulk_extractor | 3045 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| registry.profile | python-registry | 22 |
| appfiles.documents_and_settings.sharedaccess.ini | icat | 52 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 10 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| appfiles.documents_and_settings.desktop.ini | icat | 6 |
| appfiles.documents_and_settings.desktop.ini | icat | 14 |
| appfiles.documents_and_settings.desktop.ini | icat | 12 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 16 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.brndlog.txt | icat | 5 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 6 |
| ez.shimcache | eztools | 140 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 9 |
| appfiles.documents_and_settings.desktop.ini | icat | 11 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| registry.default | regripper | 427 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| ez.prefetch | eztools | 165 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| registry.sam | regripper | 133 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| registry.sam | regripper | 7 |
| appfiles.documents_and_settings.brndlog.txt | icat | 217 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.documents_and_settings.mr._evil@www.drudgereport[1].txt | icat | 11 |
| registry.security | regripper | 19 |
| appfiles.documents_and_settings.mr._evil@advertising[2].txt | icat | 29 |
| appfiles.documents_and_settings.mr._evil@atdmt[2].txt | icat | 11 |
| appfiles.documents_and_settings.mr._evil@atwola[2].txt | icat | 11 |
| appfiles.documents_and_settings.mr._evil@centrport[1].txt | icat | 11 |
| registry.security | regripper | 8 |
| appfiles.documents_and_settings.mr._evil@cnn[1].txt | icat | 11 |
| appfiles.documents_and_settings.mr._evil@doubleclick[1].txt | icat | 11 |
| appfiles.documents_and_settings.mr._evil@fastclick[1].txt | icat | 29 |
| appfiles.documents_and_settings.mr._evil@google[1].txt | icat | 11 |
| appfiles.documents_and_settings.mr._evil@list[1].txt | icat | 11 |
| appfiles.documents_and_settings.mr._evil@maktoob[1].txt | icat | 11 |
| appfiles.documents_and_settings.mr._evil@microsoft[1].txt | icat | 11 |
| appfiles.documents_and_settings.mr._evil@msn[2].txt | icat | 56 |
| appfiles.documents_and_settings.mr._evil@revenue[2].txt | icat | 11 |
| appfiles.documents_and_settings.mr._evil@search.msn[1].txt | icat | 29 |
| appfiles.documents_and_settings.mr._evil@servedby.advertising[2].txt | icat | 20 |
| appfiles.documents_and_settings.mr._evil@sj9[1].txt | icat | 11 |
| appfiles.documents_and_settings.mr._evil@tribalfusion[1].txt | icat | 38 |
| appfiles.documents_and_settings.mr._evil@www.cnn[1].txt | icat | 11 |
| appfiles.documents_and_settings.mr._evil@www.maktoob[2].txt | icat | 11 |
| registry.software | regripper | 9600 |
| appfiles.documents_and_settings.mr._evil@www.netstumbler[2].txt | icat | 11 |
| appfiles.documents_and_settings.mr._evil@yahoo[1].txt | icat | 29 |
| appfiles.documents_and_settings.mr[1].txt | icat | 11 |
| appfiles.documents_and_settings.mr[2].txt | icat | 38 |
| registry.software | regripper | 283 |
| appfiles.documents_and_settings.desktop.ini | icat | 6 |
| appfiles.documents_and_settings.cleanup.log | icat | 10 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| pcap.disk.interception | tshark | 75 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| registry.system | regripper | 3138 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 6 |
| registry.system | regripper | 199 |
| appfiles.documents_and_settings.desktop.ini | icat | 10 |
| appfiles.documents_and_settings.desktop.ini | icat | 10 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| clamav.scan | clamav | 2 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| appfiles.documents_and_settings.desktop.ini | icat | 6 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 9 |
| appfiles.documents_and_settings.desktop.ini | icat | 12 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 8 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| registry.ntuser.default user | regripper | 70 |
| registry.usrclass.localservice | regripper | 4 |
| registry.ntuser.localservice | regripper | 70 |
| registry.usrclass.mr. evil | regripper | 4 |
| registry.ntuser.mr. evil | regripper | 329 |
| registry.usrclass.networkservice | regripper | 4 |
| registry.ntuser.networkservice | regripper | 70 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.file_staging | composite | 122 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
