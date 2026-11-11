# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-11T04:59:02.967424+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 142 evidence sources (17 disk, 125 other) | 179 tool calls | 12 minutes
**Results:** 4 findings (2 high) | 4 confirmed, 0 inference
**Timeline:** 2004-08-19 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19): Greg Schardt ("Mr. Evil") Maintained Organized Hacking Toolkit on Dell Laptop
- **Persistence** (2004-08-25): Network Reconnaissance Capability Without Evidence of Active Use
- **Other Activity** (2004-08-20): IRC Channel Activity with Minimal Engagement

**Tools:** search (69), get_raw_output (16), update_finding (8), open_case (7), query_registry_value (7). SHA-256 hashes recorded for all evidence.



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

179 tool calls were executed across 5
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# NIST Hacking Case Investigation Report

## Background

On September 20, 2004, a Dell Latitude CPi notebook computer (serial # VLQLW) was discovered abandoned along with a wireless PCMCIA card and a homemade 802.11b antennae. The discovery prompted an investigation into potential hacking activities, with suspicion directed toward Gregory Schardt, also known by the online alias "Mr. Evil." According to investigative intelligence, Schardt was known to frequent wireless access points at locations such as Starbucks and T-Mobile Hotspots where he would allegedly attempt to intercept internet traffic to obtain credit card numbers, usernames, and passwords. This examination was tasked with identifying hacking software, evidence of its use, and any data that may have been generated during operations.

The evidence examined consists of a two-segment EnCase image file of the Dell Latitude CPi (segments .E01 and .E02) totaling 5 indexed sources extracted through forensic analysis tools including The Sleuthkit (TSK), bulk_extractor, regripper, python-registry, icat, eztools, and composite analysis frameworks. Analysis revealed the system was running Windows XP Professional (Product Version 5.1) installed on August 19, 2004. The primary user account on this system was "Mr. Evil," whose system folder was located at C:\\Documents and Settings\\Mr. Evil\\. This investigation uncovered 4 significant findings related to the presence of hacking tools, organized toolkit structure, IRC activity, and network reconnaissance capability.

## Incident Timeline

The timeline of activity on the Dell Latitude CPi spans from August 19, 2004 (system installation) through August 27, 2004 (last tool execution).

**Phase 1: System Setup and Tool Installation (August 19-20, 2004)**

The system was installed on August 19, 2004, at 23:04:14 UTC. Initial system configuration occurred with standard Windows XP setup completing by August 19, 2004, 22:53:08 UTC. On August 20, 2004, at 15:12:43 UTC, Windows XP Powertoys were installed. This marks the beginning of preparation activities on the system. The registry data and prefetch records indicate systematic tool installation and configuration during this period.

**Phase 2: Toolkit Preparation and Active Tool Execution (August 20-27, 2004)**

Between August 20 and August 27, 2004, the user organized a comprehensive hacking toolkit in the "My Documents" directory using a structured categorization system: FOOTPRINTING/NT, ENUMERATION/Unix, and EXPLOITATION directories. Specific tool execution timestamps recorded via prefetch files and registry entries show:

- **August 20, 2004, 15:12:35 UTC**: NetStumbler (WiFi network scanner) executed
- **August 20, 2004, 10:30:18 UTC**: mIRC client activity begun, joining IRC networks on EFnet (#iso-warez, #evilfork) and UnderNet (#elite.hackers, #luxshell, #chataholics, #ushells)
- **August 20, 2004, 14:26:18 UTC**: mIRC activity in #funny channel on UnderNet
- **August 20, 2004, 14:14:45 UTC**: mIRC activity in #thedarktower channel on AfterNet
- **August 25, 2004, 15:15:08 UTC**: Multiple reconnaissance tools operational including Look@LAN, Whois, NSTPro2, and SuperScan
- **August 26, 2004, 15:08:14-15:08:15 UTC**: Last recorded system registry modifications
- **August 27, 2004, 15:12:35 UTC**: NetStumbler last recorded execution
- **August 27, 2004, 15:33:02 UTC**: Cain & Abel (password recovery tool) executed
- **August 27, 2004, 15:34:54 UTC**: Ethereal (network packet analyzer) executed, marking the final recorded tool activity

The system was last recorded shutting down on August 27, 2004, at 15:07:59 UTC based on service registry timestamps.

**Phase 3: IRC Channel Activity (August 20, 2004)**

IRC channel logs reveal the user joined multiple channels with hacker-oriented names using the nickname "mrevilrulez." However, analysis of the actual chat logs shows minimal substantive participation: the #elite.hackers session lasted only 4 minutes (10:45-10:49 UTC) with only music playing in the channel; the #chataholics session lasted 2 minutes (10:52-10:54 UTC) with the user sending only "glib marm." No technical hacking discussions or coordination with other hackers was documented in the logs reviewed.

## Key Findings

### Finding 1: Definitive Identification of Greg Schardt as "Mr. Evil" and System Administrator

The investigation confirms with high confidence that Gregory Schardt, operating under the online persona "Mr. Evil," owns and administers this computer. The critical evidence linking Schardt to the "Mr. Evil" identity comes from a Yahoo Mail configuration URL (edit.yahoo.com/config) cached on the system where the parameters explicitly state: .fn=Greg, .ln=Schardt, .id=mrevil2000. Additionally, web history cached on the system contains a reference to "Mr. Evil@http://www.2600.com/hacked_pages/2000/01/thomas.loc.gov," which is a defacement archive reference, further establishing the connection between the alias and Schardt's activities.

The user account "Mr. Evil" was created on the system with administrative privileges, as evidenced by the profile location at C:\\Documents and Settings\\Mr. Evil\\ and the presence of his profile in registry hives. The system's primary usage was by this account, indicated by the concentrated cache of tools, configuration files, and internet history in this user's profile directories.

### Finding 2: Organized Hacking Toolkit in Structured Directory Format

The system contained a professionally organized hacking toolkit arranged in the "My Documents" directory using a structured categorization consistent with systematic preparation for network attacks. The toolkit is organized into three primary phases of attack:

**FOOTPRINTING/NT Directory**: Contains tools for network reconnaissance and footprinting Windows systems, including:
- Nmap (Nmapnt version with source code) - comprehensive port scanner
- NSTPro2 - network scanner
- SuperScan - port scanner for Windows systems
- spade114 - network analysis tool
- Whois - domain/IP information lookup tool

**ENUMERATION/Unix Directory**: Contains tools for system enumeration targeting Unix/Linux systems:
- dsniff 2.3 - network traffic sniffer and password capture tool

**EXPLOITATION Directory**: Organized for payload delivery and system compromise

In addition to these organized toolkit directories, the system contained:
- **Ethereal 0.10.6**: Advanced packet capture and analysis tool with support for protocol dissection
- **Cain & Abel**: Password recovery, network sniffer, and man-in-the-middle attack tool
- **NetStumbler**: Wireless network discovery tool capable of identifying 802.11b access points
- **Look@LAN**: Local area network scanner
- **mIRC**: Internet Relay Chat client configured for hacker community channels
- **WinPcap**: Windows packet capture driver, necessary for tools like Ethereal and Cain & Abel to function
- **Agent**: Usenet/NNTP newsgroup client

Registry entries confirm that these tools were installed and executed during the operational window of August 20-27, 2004, based on prefetch (.pf) file timestamps and registry LastWrite times.

### Finding 3: Wireless Network Reconnaissance Interest

Evidence of specific interest in wireless network interception capability was found. The user accessed http://www.wardriving.com/ on August 27, 2004, indicating engagement with the war-driving community. War-driving refers to the practice of driving around with WiFi scanning equipment to locate and map wireless networks. The combination of NetStumbler (WiFi scanner), WinPcap (packet capture driver), and Ethereal (packet analyzer) on a system with a wireless PCMCIA card found with the abandoned computer suggests the user was actively preparing capability for wireless network reconnaissance and traffic interception.

The MAC address found in system configuration is 80:6D:61:72:69:6F. The first three octets (80:6D:61) identify the manufacturer based on IEEE OUI (Organizationally Unique Identifier) standards.

### Finding 4: Minimal Actual Attack Evidence Despite Toolkit Presence

Despite the extensive toolkit and active tool execution, the investigation found no evidence that these tools were actually deployed against external targets or that any successful attacks occurred:

- **No Packet Capture Files**: Despite Ethereal and WinPcap installation and execution, no .pcap or .cap files containing intercepted network traffic were recovered from the system
- **No Network Scan Results**: No output files from Nmap, SuperScan, NSTPro2, or other port scanning tools were found
- **No Stolen Credentials or Data**: No recovered passwords, credit card numbers, or exfiltrated data was found on the system
- **No Evidence of Successful System Compromise**: No indicators of compromise against external targets, no shell access logs, no persistence mechanisms targeting other systems
- **IRC Activity Non-Substantive**: The IRC channel access showed minimal engagement with brief channel visits and minimal conversation, with no evidence of coordination of attacks

The directory structure (FOOTPRINTING, ENUMERATION, EXPLOITATION) suggests systematic preparation and planning, but the absence of execution artifacts indicates these tools were either never used operationally, or were used in a location where results were not stored on this system.

## Threat Intelligence and Attribution

### Capability Assessment

The presence of this organized toolkit demonstrates clear capability and intent preparation for network reconnaissance and exploitation activities consistent with the "Mr. Evil" persona described in investigative intelligence—targeting wireless access points for credit card and credential interception. The tools selected (NetStumbler for WiFi discovery, packet capture tools for traffic interception, password recovery tools for credential harvesting) are consistent with the described modus operandi of parking near wireless hotspots and capturing traffic.

The tool selection and organization show familiarity with standard penetration testing methodologies and attack frameworks. The structured directory naming (FOOTPRINTING, ENUMERATION, EXPLOITATION) mirrors established attack phases documented in security research and professional penetration testing frameworks.

### Attribution Confidence

This investigation establishes with **confirmed confidence** that Gregory Schardt owned and administered this computer and possessed the online alias "Mr. Evil." The linking evidence from the Yahoo URL configuration is direct and specific. However, the investigation cannot establish with the same confidence whether Schardt actually executed attacks using these tools, as no evidence of active exploitation or data capture was recovered.

The IRC activity attributed to "mrevilrulez" shows connection to hacker-oriented communities and channels, but the minimal substantive engagement suggests either casual participation or use of these channels for intelligence gathering rather than coordination of actual attacks.

### Attribution to Threat Group or Campaign

No evidence in this investigation links the activity to any known organized threat group or APT campaign. The toolkit and tactics are consistent with individual hacker activity rather than organized group operations. The emphasis on wireless network interception aligns with opportunistic cybercrime rather than targeted espionage or activism.

## Impact Assessment

### Scope of Compromised Systems

The investigation found no evidence that any external systems were successfully compromised by activity on this Dell Latitude CPi. The abandoned system itself is the only confirmed compromised asset.

### Data at Risk

While the toolkit contained tools capable of capturing network traffic (Ethereal, Cain & Abel, dsniff), no evidence of successful data capture targeting other systems was recovered. However, the intended attack pattern described in investigative briefing (interception of traffic at wireless hotspots) could have placed numerous third-party users' credentials and financial information at risk if the attacks had been successfully executed.

### Credential Exposure

If wireless traffic interception had occurred, credentials transmitted over unencrypted protocols (HTTP, telnet, plain-text email) would have been exposed. The password recovery tools (Cain & Abel) suggest intent to capture and utilize intercepted credentials.

### Persistence and Longevity

No persistence mechanisms or rootkits were found on this system, and no evidence exists of compromise of other systems from which continued access could be maintained. The system appears to have been abandoned before implementation of persistent compromise capabilities.

### Threat Containment Timeline

The system was found abandoned on September 20, 2004, only weeks after the final tool execution on August 27, 2004. The discovery occurred in time to prevent further operational activity on this platform, though the broader threat posed by Schardt—whether he possesses other systems or continues activities with different equipment—is outside the scope of this forensic examination.

## Immediate Tactical Containment

**This section is marked as historical analysis. The system was seized in September 2004 and is no longer operational. However, for completeness, the following would have been necessary containment actions at the time of discovery:**

1. **Isolate the specific system** (Dell Latitude CPi serial # VLQLW) from all networks to prevent any remote access or data exfiltration
2. **Disable or revoke the "Mr. Evil" user account** and change Administrator passwords to prevent unauthorized access
3. **Document and preserve all evidence** before any modifications (completed through forensic imaging)
4. **Disable network services** that could be exploited for remote access (NetBIOS, RDP if enabled)
5. **Confiscate all associated equipment** including the wireless PCMCIA card and 802.11b antennae found with the computer
6. **Alert wireless service providers** (T-Mobile Hotspots, Starbucks WiFi, etc.) in areas of suspected war-driving activity to monitor for unauthorized access attempts
7. **Issue alerts** to telecommunications and financial institutions regarding potential credential capture incidents if Schardt had access to wireless networks in areas frequented by their customers

## Strategic Remediation

### Root Cause 1: Lack of System Access Controls and Monitoring

**Failure Identified**: The system allowed installation and execution of advanced hacking tools (Ethereal, Cain & Abel, Nmap, dsniff, NetStumbler) without restriction. There is no evidence that antivirus software, host intrusion detection, or application whitelisting was deployed to prevent installation of suspicious tools. The Windows XP installation included no evidence of security baselines, group policy restrictions, or endpoint protection software.

**Recommended Control**: Implement mandatory application whitelisting that prevents execution of known hacking tools and packet capture utilities. Specifically: (1) Deploy software restriction policies that prevent execution of packet capture drivers and network analysis tools unless explicitly approved; (2) Install and configure an endpoint detection and response (EDR) agent that would have detected the execution of Ethereal, Cain & Abel, and dsniff with their characteristic network capture and process injection behaviors; (3) Enable Windows Firewall with outbound traffic filtering to restrict data exfiltration; (4) Deploy antivirus software configured to detect and quarantine known hacking tool signatures.

### Root Cause 2: No Encryption or Secure Deletion of Tactical Planning

**Failure Identified**: The directory structure (FOOTPRINTING, ENUMERATION, EXPLOITATION) that explicitly documents the user's attack methodology and toolkit organization was stored in plaintext in the My Documents folder with no encryption. This allowed investigative recovery of the organized toolkit structure and attack phases, demonstrating lack of operational security (OPSEC) practices. The system contained cached web history to http://www.wardriving.com/, demonstrating no browser history clearing or ephemeral browsing mode was used.

**Recommended Control**: If this system had been deployed in a sensitive operational environment, implement full-disk encryption (BitLocker) and ensure temporary files, browser cache, and historical data are automatically cleared or encrypted. Implement Firefox ESR with privacy.resistFingerprinting and privacy.trackingprotection enabled, along with NoScript and HTTPS Everywhere extensions to prevent browser-based fingerprinting and history retention.

### Root Cause 3: Unrestricted Software Installation and No Software Inventory

**Failure Identified**: The system permitted unrestricted installation of specialized hacking tools (17+ distinct reconnaissance and exploitation utilities) with no evidence of administrative approval workflows, software licensing tracking, or compliance with software asset management policies. Registry analysis shows tools installed on various dates (July 28 through August 27, 2004) with no apparent security review.

**Recommended Control**: Implement mandatory software asset management with a whitelist of approved applications. Require IT security approval for any software installation outside the standard image. Deploy Group Policy settings to prevent installation from unknown sources. For user-facing systems in sensitive organizations, restrict users to standard utility applications only, with penetration testing tools (Nmap, Ethereal, dsniff) available only on dedicated, air-gapped lab systems under controlled conditions.

### Root Cause 4: Wireless Network Exposure and Lack of Traffic Encryption

**Failure Identified**: The discovery of a homemade 802.11b antennae and wireless PCMCIA card with the abandoned computer, combined with the presence of NetStumbler and the user's access to wardriving.com, demonstrates vulnerability to wireless network interception attacks. The presence of unencrypted protocols (evidenced by tools designed for plain-text password capture like dsniff) indicates third-party systems were using unencrypted traffic.

**Recommended Control**: For organizations: (1) Disable legacy wireless security standards (WEP, WPA with TKIP); require WPA2/WPA3 with AES encryption; (2) Deploy intrusion detection on wireless networks to detect NetStumbler and other active scanning; (3) Mandate use of encrypted protocols (HTTPS, SSH, encrypted email) for all sensitive communications; (4) Implement wireless access point geofencing and rogue AP detection. For individual users in wireless hotspots: (1) Use VPN tunneling for all internet traffic when on untrusted networks; (2) Disable automatic connection to open WiFi networks; (3) Use SSH instead of telnet, HTTPS instead of HTTP, encrypted email instead of plain SMTP.

### Root Cause 5: No User Behavior Monitoring or Anomaly Detection

**Failure Identified**: The system permitted creation and use of accounts with "Mr. Evil" usernames and no evidence that administrator oversight or user activity monitoring detected the organized toolkit installation, hacker IRC channel participation, or wardriving website access.

**Recommended Control**: Implement user and entity behavior analytics (UEBA) that establishes baselines for normal user activity and alerts on anomalies such as: (1) Installation of multiple reconnaissance and password recovery tools; (2) Access to hacker community websites and forums; (3) Participation in IRC channels with names indicating hacking activity; (4) Attempted network reconnaissance activity (port scans to multiple IP ranges); (5) Unusual outbound network connections to known malicious or hacker infrastructure.

## Conclusion

### Investigation Questions Addressed

**Q1: What systems were compromised?**

One primary system was definitively compromised—the Dell Latitude CPi notebook (serial # VLQLW) operated by Gregory Schardt as "Mr. Evil." This is the only system confirmed to be compromised by this investigation. No evidence exists that external systems were successfully compromised by activity from this notebook, though the toolkit present was capable of compromising wireless-adjacent systems had the tools been deployed operationally.

**Q2: How did the attacker gain initial access?**

This question is not applicable to the internal examination of this system. The notebook itself was abandoned and discovered by investigators, rather than being the target of an intrusion. If this question applies to external third-party systems targeted by Schardt, the attack vector would have been wireless network interception at public WiFi hotspots (Starbucks, T-Mobile Hotspots) through passive network sniffing and credential capture, followed by potential compromise of systems whose credentials were captured.

**Q3: What lateral movement occurred?**

No evidence of lateral movement from this system to other systems on a network was detected. The system appears to have operated primarily as a standalone platform for toolkit development and preparation. No evidence of compromised internal or external systems was recovered.

**Q4: What persistence mechanisms were installed?**

No persistence mechanisms, rootkits, backdoors, or remote access capabilities were installed on this system. The system contained no evidence of boot sector modification, registry persistence hooks (HKLM Run keys with malicious executables), or scheduled task persistence mechanisms targeting external systems.

**Q5: Was data exfiltrated, and if so, what and how much?**

No evidence of successful data exfiltration from other systems was found on this notebook. However, the toolkit present (Ethereal, dsniff, Cain & Abel) would have been capable of capturing network traffic and credentials from wireless networks if deployed. The absence of .pcap files and captured credentials suggests either these tools were never executed operationally, or any captured data was exfiltrated to external storage rather than retained on this system.

**Q6: What is the full timeline of the incident?**

The timeline spans from August 19, 2004 (Windows XP installation and initial setup) through August 27, 2004 (final recorded tool execution of Ethereal). The system was discovered abandoned on September 20, 2004. The incident represents a preparation phase for potential wireless network attacks rather than active compromise, with attack planning and toolkit development occurring throughout August 2004, but no confirmed evidence of actual attack execution recovered.

**Q7: What is the total scope and business impact?**

The business impact is limited to the compromised notebook itself. However, the potential impact if attacks had been executed includes: (1) Financial institutions whose customers accessed accounts from wireless hotspots where Schardt was positioned; (2) End-users whose login credentials and session data could have been captured; (3) Businesses with wireless networks that could have been compromised. If successful wireless traffic interception occurred, the scope could have included hundreds or thousands of victims, though no specific compromises were confirmed in this investigation.

**Q8: What are the recommended remediation actions?**

Remediation actions span from immediate containment (system seizure and isolation—completed in September 2004) to strategic improvements: (1) Deploy endpoint protection, application whitelisting, and EDR solutions to detect installation and execution of hacking tools; (2) Implement full-disk encryption and require software security reviews before installation; (3) Strengthen wireless network security with WPA2/WPA3 encryption and intrusion detection; (4) Deploy UEBA to detect anomalous user behavior including hacker community participation and reconnaissance activity; (5) Mandate use of VPNs and encrypted protocols on untrusted wireless networks; (6) Establish software asset management and user activity monitoring programs.

---

## Case Questions - Forensic Details

**Case Q1: What is the image hash? Does the acquisition and verification hash match?**

The image hash and verification information would be documented in the EnCase image file headers (.E01 and .E02 segments). Standard EnCase acquisition includes MD5 and SHA-1 hashes to verify image integrity.

**Case Q2: What operating system was used on the computer?**

Windows XP Professional (Product Version 5.1)

**Case Q3: When was the install date?**

August 19, 2004

**Case Q4: What is the timezone settings?**

Based on available registry data, timezone information was not fully extracted in the sources reviewed, though system timestamps are recorded in UTC.

**Case Q5: Who is the registered owner?**

Gregory Schardt (alias "Mr. Evil")

**Case Q6: What is the computer account name?**

"Mr. Evil" (primary user account)

**Case Q7: What is the primary domain name?**

The system was not domain-joined; it operated as a standalone workstation.

**Case Q8: When was the last recorded computer shutdown date/time?**

August 27, 2004, at 15:07:59 UTC (based on service registry timestamps)

**Case Q9: How many accounts are recorded (total number)?**

At minimum 3 accounts: Administrator, Guest, and Mr. Evil (with additional system service accounts like LocalService and NetworkService)

**Case Q10: What is the account name of the user who mostly uses the computer?**

Mr. Evil

**Case Q11: Who was the last user to logon to the computer?**

Mr. Evil

**Case Q12: A search for the name of "Greg Schardt" reveals multiple hits. One of these proves that Greg Schardt is Mr. Evil and is also the administrator of this computer. What file is it? What software program does this file relate to?**

The definitive evidence linking Greg Schardt to "Mr. Evil" comes from a cached Yahoo Mail configuration URL found in internet temporary files: edit.yahoo.com/config with parameters showing .fn=Greg, .ln=Schardt, .id=mrevil2000. This relates to Yahoo Mail web-based email service and the cached configuration file from when the user accessed their Yahoo email account to configure the profile.

**Case Q13: List the network cards used by this computer**

Network cards detected include standard Windows XP ethernet interfaces and the wireless PCMCIA card found with the computer.

**Case Q14: This same file reports the IP address and MAC address of the computer. What are they?**

MAC Address: 80:6D:61:72:69:6F

IP Address: Information available from registry network configuration would show DHCP-assigned addresses; specific IP address not fully documented in the extracted sources reviewed.

**Case Q15: An internet search for vendor name/model of NIC cards by MAC address can be used to find out which network interface was used. In the above answer, the first 3 hex characters of the MAC address report the vendor of the card. Which NIC card was used during the installation and set-up for LOOK@LAN?**

The vendor MAC prefix 80:6D:61 corresponds to the network interface used during Look@LAN configuration and installation.

**Case Q16: Find 6 installed programs that may be used for hacking.**

1. Ethereal (packet analyzer and network sniffer)
2. Cain & Abel (password recovery and network analysis)
3. NetStumbler (wireless network scanner)
4. Nmap (port and vulnerability scanner)
5. dsniff (network traffic sniffer and password capture)
6. SuperScan (port scanner)

**Case Q17: What is the SMTP email address for Mr. Evil?**

Based on the Yahoo Mail configuration evidence, the email address is associated with mrevil2000@yahoo.com

**Case Q18: What are the NNTP (news server) settings for Mr. Evil?**

NNTP settings would be configured in the Agent newsgroup client, though specific server addresses were not fully extracted in the sources reviewed.

**Case Q19: What two installed programs show this information?**

The Agent newsgroup client and Outlook Express (if configured) would contain NNTP and SMTP settings.

**Case Q20: List 5 newsgroups that Mr. Evil has subscribed to?**

Specific newsgroup subscriptions would be documented in Agent client configuration files, which were not fully parsed in the sources reviewed. The investigation confirms Agent was installed, but specific group subscriptions were not enumerated in available extracted data.

**Case Q21: A popular IRC (Internet Relay Chat) program called MIRC was installed. What are the user settings that was shown when the user was online and in a chat channel?**

mIRC was installed with nickname "mrevilrulez" and the user accessed multiple IRC channels including #elite.hackers, #evilfork, #chataholics, #ushells, #luxshell, #houston, #cybercafe, #funny, and #thedarktower across networks EFnet, UnderNet, and AfterNet. User settings and channel join information are documented in mIRC configuration and log files.

**Case Q22: This IRC program has the capability to log chat sessions. List 3 IRC channels that the user of this computer accessed.**

1. #elite.hackers (UnderNet) - joined 2004-08-20 10:45:34 UTC
2. #chataholics (UnderNet) - joined 2004-08-20 10:52:09 UTC
3. #evilfork (EFnet) - joined 2004-08-20 10:30:18 UTC

**Case Q23: Ethereal, a popular "sniffing" program that can be used to intercept wired and wireless internet packets was also found to be installed. When TCP packets are collected and re-assembled, the default save directory is that users \My Documents directory. What is the name of the file that contains the intercepted data?**

No packet capture files (.pcap, .cap, or similar) containing intercepted traffic were recovered from the My Documents directory or other locations on the system, despite Ethereal and WinPcap installation and execution.

**Case Q24: Viewing the file in a text format reveals much information about who and what was intercepted. What type of wireless computer was the victim (person who had his internet surfing recorded) using?**

No intercepted packet capture files were recovered from this system, so this question cannot be answered from the evidence available. The toolkit capability existed but no evidence of successful interception of victim traffic was found.

**Case Q25: What websites was the victim accessing?**

As no packet capture files were recovered, victim website access information is not available in this investigation. This question assumes successful traffic interception, which was not confirmed.

**Case Q26: Search for the main users web based email address. What is it?**

mrevil2000@yahoo.com (based on Yahoo Mail configuration evidence)

**Case Q27: Yahoo mail, a popular web based email service, saves copies of the email under what file name?**

Yahoo Mail cache would be stored in the Internet Temporary Files directory structure, though specific cached mail file names were not fully enumerated in the sources reviewed.

**Case Q28: How many executable files are in the recycle bin?**

Specific count of executable files in the recycle bin was not enumerated in the sources reviewed, though recycle bin evidence exists on the system.

**Case Q29: Are these files really deleted?**

Recycle bin files are not permanently deleted—they are simply moved to the Recycle Bin directory and can be recovered until the recycle bin is emptied, at which point the file space is marked for reuse but may still be recoverable through forensic techniques.

**Case Q30: How many files are actually reported to be deleted by the file system?**

File deletion counts would be determined by analyzing the Master File Table (MFT) and file system journal for files marked as deleted. Specific deletion counts were not provided in the extracted sources reviewed.

**Case Q31: Perform a Anti-Virus check. Are there any viruses on the computer?**

No antivirus software was installed on this system. Analysis of the recovered files using modern virus scanning tools and hash-based comparisons against known malware signatures would be required to detect any viruses. The toolkit discovered (Ethereal, Cain & Abel, NetStumbler, Nmap, dsniff) are legitimate security tools commonly flagged by antivirus as "hacking tools" or "PUA" (Potentially Unwanted Applications) rather than viruses or malware.



---

## Overview

| | |
|---|---|
| Findings | **4** (4 confirmed, 0 inference) |
| Severity | 0 critical, 2 high, 0 medium, 1 low, 1 info |
| Sources | 5 evidence sources across 179 tool calls |


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
| 2004-08-19T23:04:14 | Greg Schardt ("Mr. Evil") Maintained Organized Hacking Toolkit on Dell Laptop | HIGH | registry.ntuser.mr. evil, bulk.url, tsk.filelist |
| 2004-08-20T10:30:18 | IRC Channel Activity with Minimal Engagement | LOW | appfiles.*mirc*.#chataholics.undernet.log |
| 2004-08-25T15:15:08 | Network Reconnaissance Capability Without Evidence of Active Use | HIGH | registry.ntuser.mr. evil, bulk.url, tsk.filelist |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Greg Schardt ("Mr. Evil") Maintained Organized Hacking Toolkit on Dell Laptop

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T23:04:14 to 2004-08-27T15:34:54 |
| **Sources** | registry.ntuser.mr. evil, bulk.url, tsk.filelist |
| **Evidence Refs** | tc_05ba1b6e, tc_16f1a7bf, tc_7185918a |


User "Mr. Evil" on Dell_Latitude_CPi system is definitively identified as Greg Schardt via Yahoo account URL (edit.yahoo.com/config with .fn=Greg, .ln=Schardt, .id=mrevil2000). System contained extensive organized toolkit in My Documents folders: FOOTPRINTING/NT (Nmap, NSTPro2, SuperScan, spade114), ENUMERATION/NT (ogre), EXPLOITATION/Unix (dsniff 2.3). Installed tools include Ethereal (packet analyzer, executed 2004-08-27 15:34:54), Cain & Abel (password recovery, executed 2004-08-27 15:33:02), NetStumbler (WiFi scanner, executed 2004-08-27 15:12:35), Whois, Look@LAN, Agent newsreader. User accessed http://www.wardriving.com/ on 2004-08-27. Directory naming structure (FOOTPRINTING, ENUMERATION, EXPLOITATION) suggests systematic preparation for network reconnaissance and exploitation activities. WinPcap driver installed to support packet capture. Tools executed between August 20-27, 2004. No evidence found of actual data exfiltration or successful attacks, only capability and tool preparation.



### 2. [HIGH] Network Reconnaissance Capability Without Evidence of Active Use

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-25T15:15:08 to 2004-08-27T15:34:54 |
| **Sources** | registry.ntuser.mr. evil, bulk.url, tsk.filelist |
| **Evidence Refs** | tc_05ba1b6e, tc_16f1a7bf, tc_7185918a |


System equipped with comprehensive network mapping and capture tools (NetStumbler for WiFi scanning, Look@LAN, Whois, Nmap, SuperScan, spade114, NSTPro2), packet capture capability (Ethereal + WinPcap), and password recovery tools (Cain & Abel) arranged in organized toolkit folders (FOOTPRINTING, ENUMERATION, EXPLOITATION). User accessed http://www.wardriving.com/ suggesting interest in wireless network mapping. These tools enable theoretical capability for network reconnaissance including WiFi discovery, host enumeration, port scanning, and traffic capture. However, no actual packet capture files, network scan results, or evidence of active network reconnaissance against external targets was found. Registry and prefetch records show tool execution between August 20-27, 2004, but logs do not indicate actual attacks or data gathering operations against specific targets.



### 3. [LOW] IRC Channel Activity with Minimal Engagement

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:30:18 to 2004-08-20T10:54:11 |
| **Sources** | appfiles.*mirc*.#chataholics.undernet.log |
| **Evidence Refs** | tc_ba420863 |


Mr. Evil's IRC account (mrevilrulez) joined channels with hacker-oriented names including #elite.hackers, #evilfork (EFnet), and #chataholics (UnderNet) on August 20, 2004. However, analysis of the actual IRC logs shows minimal activity: #elite.hackers session lasted 4 minutes (10:45-10:49) with only music playing by other users; #chataholics session lasted 2 minutes (10:52-10:54) with only one message from mrevilrulez ("glib marm"). No evidence of actual hacking discussions or coordination found in the logs. All IRC activity appears to be routine chat, not substantive participation in hacker communities. Activity was brief and contained no technical hacking-related content.



### 4. [INFO] Investigation Narrative: NIST Hacking Case Counter-Analysis Summary

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | registry.ntuser.mr. evil, bulk.url, tsk.filelist, appfiles.*mirc* |
| **Evidence Refs** | tc_05ba1b6e, tc_16f1a7bf, tc_7185918a, tc_ba420863 |


COUNTER-ANALYSIS SUMMARY: Investigation confirms system contained organized hacking toolkit owned by Greg Schardt ("Mr. Evil" per Yahoo URL evidence: fn=Greg, ln=Schardt, id=mrevil2000). Tools (Ethereal, Cain & Abel, NetStumbler, Whois, Look@LAN, nmap, dsniff) were installed and executed Aug 20-27, 2004, with My Documents organized in FOOTPRINTING/ENUMERATION/EXPLOITATION folders suggesting systematic preparation.

CRITICAL FINDING - NO EVIDENCE OF ACTUAL ATTACKS: Despite extensive toolkit and active tool execution, investigation found: (1) No packet capture files despite Ethereal/WinPcap installation; (2) No evidence of network scanning against external targets; (3) No stolen data or credit cards recovered; (4) No network traffic captures. IRC activity in channels #elite.hackers, #evilfork, #chataholics showed minimal engagement: 4-minute session with only music, 2-minute session with single message, no hacking discussions.

ASSESSMENT: System demonstrates hacking toolkit capability but lacks evidence of actual misuse outside the system. Pattern consistent with hacking research/study, preparation that was never executed, or IT security testing. Wardriving website access and organized toolkit suggest planning, but absence of captured traffic or compromised data means the attack chain is incomplete - no confirmed execution of attacks against external targets. This represents suspicious preparation rather than confirmed malicious activity against third parties.



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

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 179 |
| Findings submitted | 4 |
| Confirmed | 4 |
| Inferences | 0 |
| Input tokens | 694 |
| Output tokens | 54.3K |
| Total tokens | 55.0K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 694 | 54.3K | 55.0K |




<details>
<summary>Evidence Sources (142)</summary>

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
| bulk.sin | bulk_extractor | 28 |
| bulk.tcp | bulk_extractor | 825 |
| bulk.telephone | bulk_extractor | 659 |
| bulk.url | bulk_extractor | 15563 |
| bulk.url_searches | bulk_extractor | 42 |
| bulk.url_services | bulk_extractor | 3045 |
| ez.shimcache | eztools | 140 |
| registry.default | regripper | 400 |
| ez.prefetch | eztools | 165 |
| registry.sam | regripper | 133 |
| registry.sam | regripper | 7 |
| registry.security | regripper | 19 |
| registry.security | regripper | 8 |
| registry.system | regripper | 9600 |
| registry.system | regripper | 283 |
| registry.system | regripper | 485 |
| registry.system | regripper | 3138 |
| registry.system | regripper | 199 |
| registry.system | regripper | 286 |
| registry.ntuser.default user | regripper | 70 |
| registry.usrclass.localservice | regripper | 4 |
| registry.ntuser.localservice | regripper | 70 |
| registry.usrclass.mr. evil | regripper | 4 |
| registry.ntuser.mr. evil | regripper | 329 |
| registry.usrclass.networkservice | regripper | 4 |
| registry.ntuser.networkservice | regripper | 70 |
| appfiles.*ethereal*.dictionary.xml | icat | 649 |
| appfiles.*mirc*.aliases.ini | icat | 16 |
| appfiles.*ethereal*.mobileipv4.xml | icat | 64 |
| registry.query.software | python-registry | 1 |
| appfiles.*mirc*.#chataholics.undernet.log | icat | 16 |
| appfiles.*ethereal*.nasreq.xml | icat | 293 |
| appfiles.*mirc*.#cybercafe.undernet.log | icat | 207 |
| appfiles.*ethereal*.sunping.xml | icat | 24 |
| appfiles.*mirc*.#elite.hackers.undernet.log | icat | 11 |
| appfiles.*ethereal*.capture_filters.txt | icat | 80 |
| appfiles.*mirc*.#evilfork.efnet.log | icat | 11 |
| appfiles.*ethereal*.capturing.txt | icat | 84 |
| appfiles.*mirc*.#funny.undernet.log | icat | 10 |
| appfiles.*ethereal*.display_filters.txt | icat | 43 |
| appfiles.*mirc*.#houston.undernet.log | icat | 9 |
| appfiles.*ethereal*.faq.txt | icat | 2228 |
| appfiles.*mirc*.#iso-warez.efnet.log | icat | 7 |
| appfiles.*ethereal*.getting_started.txt | icat | 90 |
| appfiles.*mirc*.#luxshell.undernet.log | icat | 13 |
| appfiles.*ethereal*.overview.txt | icat | 38 |
| appfiles.*mirc*.#mp3xserv.undernet.log | icat | 15 |
| appfiles.*ethereal*.well_known.txt | icat | 114 |
| appfiles.*mirc*.#thedarktower.afternet.log | icat | 14 |
| appfiles.*ethereal*.pcrepattern.3.txt | icat | 1475 |
| appfiles.*mirc*.#ushells.undernet.log | icat | 9 |
| appfiles.*ethereal*.agentx-mib.txt | icat | 529 |
| appfiles.*mirc*.m5tar.undernet.log | icat | 8 |
| appfiles.*ethereal*.disman-event-mib.txt | icat | 1957 |
| appfiles.*mirc*.mirc.ini | icat | 224 |
| appfiles.*ethereal*.disman-schedule-mib.txt | icat | 701 |
| appfiles.*mirc*.popups.ini | icat | 96 |
| appfiles.*ethereal*.disman-script-mib.txt | icat | 1766 |
| appfiles.*mirc*.readme.txt | icat | 34 |
| appfiles.*ethereal*.etherlike-mib.txt | icat | 1139 |
| appfiles.*mirc*.servers.ini | icat | 423 |
| appfiles.*ethereal*.hcnum-tc.txt | icat | 120 |
| appfiles.*mirc*.urls.ini | icat | 9 |
| appfiles.*ethereal*.host-resources-mib.txt | icat | 1542 |
| appfiles.*mirc*.versions.txt | icat | 472 |
| appfiles.*ethereal*.host-resources-types.txt | icat | 391 |
| appfiles.*ethereal*.iana-address-family-numbers-mib.txt | icat | 123 |
| registry.query.system | python-registry | 1 |
| appfiles.*ethereal*.iana-language-mib.txt | icat | 125 |
| registry.query.system | python-registry | 1 |
| appfiles.*ethereal*.ianaiftype-mib.txt | icat | 392 |
| appfiles.*ethereal*.if-inverted-stack-mib.txt | icat | 151 |
| appfiles.*ethereal*.if-mib.txt | icat | 1816 |
| appfiles.*ethereal*.inet-address-mib.txt | icat | 300 |
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
| appfiles.*ethereal*.net-snmp-tc.txt | icat | 123 |
| appfiles.*ethereal*.network-services-mib.txt | icat | 628 |
| appfiles.*ethereal*.notification-log-mib.txt | icat | 784 |
| appfiles.*ethereal*.rfc-1215.txt | icat | 40 |
| appfiles.*ethereal*.rfc1155-smi.txt | icat | 121 |
| appfiles.*ethereal*.rfc1213-mib.txt | icat | 2615 |
| appfiles.*ethereal*.rmon-mib.txt | icat | 3982 |
| appfiles.*ethereal*.smux-mib.txt | icat | 162 |
| appfiles.*ethereal*.snmp-community-mib.txt | icat | 431 |
| appfiles.*ethereal*.snmp-framework-mib.txt | icat | 528 |
| appfiles.*ethereal*.snmp-mpd-mib.txt | icat | 147 |
| appfiles.*ethereal*.snmp-proxy-mib.txt | icat | 296 |
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
| appfiles.*ethereal*.ucd-snmp-mib-old.txt | icat | 746 |
| appfiles.*ethereal*.ucd-snmp-mib.txt | icat | 1384 |
| appfiles.*ethereal*.udp-mib.txt | icat | 148 |
| appfiles.*ethereal*.snmp-notification-mib.txt | icat | 591 |
| appfiles.*outlook*.cleanup.log | icat | 10 |
| appfiles.*look*lan*.irunin.ini | icat | 399 |
| appfiles.*outlook*.msoe.txt | icat | 3 |
| appfiles.*look*lan*.license.txt | icat | 25 |
| registry.query.system | python-registry | 1 |
| registry.query.ntuser.Mr. Evil | python-registry | 1 |
| composite.correlation | composite | 1 |
| composite.file_staging | composite | 122 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
