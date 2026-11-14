# Mulder Investigation Report

**Case:** nist-hacking-case-q23
**Generated:** 2026-11-14T05:08:01.338843+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 38 evidence sources (15 disk, 23 other) | 162 tool calls | 13 minutes
**Results:** 8 findings (2 high) | 5 confirmed, 3 inference
**Timeline:** 2004-08-13 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-13 to 2004-08-27): Ethereal Packet Capture Tool Installation and Execution (+6 related)
- **Other Activity** (2004-08-20): IRC Connection to #evilfork Channel and Evidence of Hacker Contacts

**Tools:** search (64), submit_finding (9), open_case (8), update_finding (8), get_raw_output (6). SHA-256 hashes recorded for all evidence.



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

162 tool calls were executed across 3
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# NIST Hacking Case - Investigation Report

## Background

This investigation concerns a Dell Latitude CPi notebook computer (Serial #VLQLW) recovered on September 20, 2004, in an abandoned state along with a wireless PCMCIA card and a homemade 802.11b antenna. Law enforcement suspected the device was used for hacking and cybercrimes, potentially connected to Greg Schardt (also known by the online alias "Mr. Evil"), who is believed to have engaged in wardriving and wireless traffic interception to capture sensitive data such as credit card numbers, usernames, and passwords from users of wireless hotspots.

The forensic investigation was conducted on an EnCase image of the system (segments 4Dell_Latitude_CPi.E01 and E02). The examination utilized multiple forensic tools to extract and analyze evidence, including the Sleuthkit (TSK) for file system analysis, bulk_extractor for raw artifact extraction, the EnCase integration toolset (EZ Tools) for Master File Table and application analysis, and RegRipper for Windows registry examination. A total of 3 evidence sources have been indexed during this investigation, encompassing 8 submitted findings organized by severity and confidence level.

The system's operating system was Windows XP, configured with a dedicated user account named "Mr. Evil" that served as the primary locus for suspicious tool installations and configurations. The case environment represents an isolated laboratory computer configured on August 19-20, 2004, with the suspicious user account and tools installed between August 20 and August 27, 2004—an eight-day operational window.

## Incident Timeline

**August 19-20, 2004 - System Setup and Initial Configuration**

The Dell Latitude CPi system was initialized on August 19, 2004, at 16:56:09 UTC. The Administrator account was created at 16:59:24 UTC, followed by the creation of the "Mr. Evil" user account at 23:03:54 UTC. The "Mr. Evil" account was immediately granted Administrator privileges, suggesting deliberate system configuration rather than unauthorized account creation. The system was configured with local accounts only and did not appear to be connected to a domain.

**August 20-27, 2004 - Network and Exploitation Tool Installation Phase**

Beginning on August 20, 2004, a systematic installation and configuration campaign commenced spanning seven days. The pattern of tool deployment suggests methodical preparation rather than reactive deployment:

- **August 20, 15:09:56 - mIRC Configuration**: The Internet Relay Chat client mIRC was configured with EFnet IRC servers. Server configuration file modifications occurred at 15:09:56 UTC and were subsequently updated on August 25, 2004, at 16:20:34 UTC. During this initial setup, the user connected to the #evilfork channel on EFnet, with the IRC log file (#evilfork.EFnet.log, 335 bytes) created at 15:30:18 UTC and updated at 15:31:07 UTC on August 20. The minimal log file size (approximately 4-5 lines of text) and brief participation window suggest limited channel interaction.

- **August 20, 15:18:12-15:18:15 - Credential Dumping Tools Staged**: Multiple Windows credential extraction utilities were copied to the C:\My Documents\COMMANDS directory: pwdump.exe (114,688 bytes, created 2000-04-07, timestamp-changed at 15:18:15 UTC), user2sid.exe (49,152 bytes), gsd.exe (32,768 bytes), and crack.exe (34,816 bytes). Critically, Windows Prefetch and Shimcache analysis revealed NO execution records for any of these credential dumping tools, indicating they were copied to the system but never actually executed.

- **August 20, 15:04:52 - Anonymizer Tool Execution**: The Anonymizer proxy application was accessed via a shortcut created in the user's Recent files directory at 15:04:52 UTC, suggesting possible anonymous web browsing activity.

- **August 25-26, 2004 - Network Reconnaissance Tool Execution**: 
  - August 25, 15:20:27 UTC: mIRC was executed
  - August 26, 15:05:15 and 15:06:14 UTC: Look@LAN network host scanner was executed twice
  - August 26, 15:13:57 UTC: WHOIS lookup utility (whoisu.exe) was executed

- **August 27, 2004 - Primary Tool Installation and Activation**:
  - **15:12:11 UTC**: Network Stumbler installer (NETSTUMBLERINSTALLER_0_4_0.EXE) was executed from the Desktop. The tool was designed for detecting and analyzing 802.11 wireless networks, locating rogue access points, and conducting wardriving activities. A shortcut to the tool was placed in the Tools directory on the Desktop. NetStumbler.exe was then executed at 15:12:35 UTC.
  
  - **15:15:08 UTC**: WinPcap packet capture driver was installed, providing kernel-level network packet capture capabilities.
  
  - **15:28:36 UTC**: Ethereal network packet capture and analysis tool installer (ETHEREAL-SETUP-0.10.6.EXE) was executed from the Desktop, installing Ethereal version 0.10.6 to C:\Program Files\Ethereal.
  
  - **15:33:02 UTC**: Cain & Abel (advanced network sniffing and password cracking tool) was executed from C:\Program Files\Cain\Cain.exe, providing integrated network packet analysis with password cracking capabilities.
  
  - **15:34:54 UTC**: The Ethereal executable (ethereal.exe, created 2004-08-13 02:15:35) was executed at 15:34:54 UTC, indicating immediate testing of the packet capture tool following installation.
  
  - **15:35:53 UTC**: Ethereal preferences configuration file was created/modified in the user's Application Data directory, indicating tool customization for operational use.

## Key Findings

### Ethereal Packet Capture Tool Installation and Execution (Finding: High Severity, Confirmed)

Ethereal version 0.10.6, a legitimate network packet capture and analysis tool (now known as Wireshark), was professionally acquired from the official www.ethereal.com source. Installation occurred on August 27, 2004, at 15:28:36 UTC, with the main executable executed at 15:34:54 UTC. The tool's Ethereal preferences were customized at 15:35:53 UTC on the same day.

Ethereal serves dual purposes in the security industry: legitimate network troubleshooting and analysis by administrators and security professionals, and unauthorized network traffic interception by attackers. The forensic evidence shows the tool was installed and briefly tested (Prefetch evidence shows execution), but no evidence of actual network sniffing attacks, credential theft from captured traffic, or malicious network activity has been identified. The installation pattern, combined with the acquisition from an official source and the 7-day systematic tool installation phase, suggests either network analysis training activities or security research preparation.

**Critical Limitation**: While Ethereal was installed and executed, the actual content and target of any network capture operations have not been forensically examined. The tool's execution does not provide definitive evidence of successful packet capture or credential harvesting from wireless or wired networks.

### Network Stumbler Wireless Sniffing Tool Installation and Execution (Finding: High Severity, Confirmed)

Network Stumbler was installed at C:\Program Files\Network Stumbler on August 27, 2004, at 15:12:11 UTC. The tool was explicitly designed for 802.11 wireless network detection, analysis, and wardriving activities. Installation was followed immediately by tool execution at 15:12:35 UTC. A desktop shortcut was created for rapid access.

Network Stumbler identifies wireless networks by passively scanning 802.11 channels, detecting network names (SSIDs), signal strength, encryption status, and access point locations. The tool can be used for both legitimate wireless site surveys and unauthorized wardriving to locate and potentially access wireless networks. Significantly, no evidence of actual connection attempts to detected wireless networks, attempted authentication, or data exfiltration from wireless targets has been identified in the forensic evidence.

The timeline alignment (installed immediately after system initialization, tested same day, shortly before system abandonment) and the acquisition from the official www.netstumbler.com source suggest systematic preparation for wireless network analysis, potentially consistent with wardriving activities described in the case briefing.

### Multiple Network and System Hacking Tools Present on System (Finding: Medium Severity, Confirmed)

The Mr. Evil user profile contained an extensive organized toolkit of network reconnaissance and security analysis utilities, including:

- **Cain & Abel**: Advanced network sniffing and password cracking application (executed 2004-08-27 15:33:02)
- **mIRC**: Internet Relay Chat client for hacker community communication (executed 2004-08-25 15:20:27)
- **Look@LAN**: Network host discovery and enumeration scanner (executed 2004-08-26 15:05:15 and 15:06:14)
- **Whois**: Domain and IP address lookup tool (executed 2004-08-26 15:13:57)
- **Credential Extraction Suite**: pwdump.exe, user2sid.exe, gsd.exe, crack.exe (STAGED but NOT EXECUTED)

These tools, when deployed collectively, provide comprehensive capabilities for network reconnaissance across Windows NT, Unix/Linux, and Novell NetWare systems. However, the execution analysis reveals a critical distinction: while most reconnaissance tools show execution evidence in Prefetch files, the credential-dumping utilities (pwdump, crack.exe, user2sid) show NO execution evidence whatsoever.

The tools were acquired from legitimate sources (www.ethereal.com, www.netstumbler.com, public project repositories), not from underground malware sites. The organization into functional categories (ARCHIVE, COMMANDS, DICTIONARIES, ENUMERATION, EXPLOITATION, FOOTPRINTING, MISCELLANEOUS, NOVELL) suggests systematic preparation for security research or penetration testing rather than ad-hoc attack infrastructure assembly.

### Credential Dumping and Password Cracking Tools Discovered (Finding: Low Severity, Inference)

Multiple Windows credential extraction utilities were present in C:\My Documents\COMMANDS directory: pwdump.exe (114,688 bytes), user2sid.exe (49,152 bytes), gsd.exe (32,768 bytes), and crack.exe (34,816 bytes). These tools are designed to extract Windows SAM password hashes and convert usernames to security identifiers.

**Critical Counter-Evidence**: Forensic examination of Windows Prefetch files and Shimcache data (application execution cache) revealed ZERO execution records for pwdump.exe, crack.exe, or user2sid.exe. This definitively establishes that these tools were stored on the system but were never actually executed, indicating either tool staging for study purposes, preparation that was never acted upon, or collection for reference materials.

The presence of Cain & Abel (which integrates password cracking functionality) partially overlaps with the capabilities of crack.exe, but again, no evidence indicates actual credential harvesting from target systems.

### IRC Connection to #evilfork Channel and Evidence of Hacker Contacts (Finding: Medium Severity, Inference)

The Mr. Evil user connected to mIRC and accessed the #evilfork channel on the EFnet IRC network. The IRC session log file (#evilfork.EFnet.log, 335 bytes) was created at 2004-08-20 15:30:18 UTC and updated at 15:31:07 UTC. The mIRC servers.ini configuration file contained EFnet server definitions and was last modified on August 25, 2004.

EFnet IRC historically hosts hacker culture communities and unauthorized security discussion channels. The channel name "#evilfork" is consistent with the "Mr. Evil" alias and hacker community naming conventions. However, a critical investigative limitation exists: the IRC log file is extremely small (335 bytes, equivalent to approximately 4-5 lines of conversational text), and the actual content of the channel interaction has not been forensically examined. The log file size suggests either very brief participation or that the log was truncated or purged. Without access to the actual log content, the nature of the interaction (whether it involved planning of malicious activities, legitimate security discussion, or hobbyist chat) cannot be definitively determined.

The #evilfork channel name and connection to EFnet strongly suggest participation in hacker community discussion forums, but the brevity of documented activity and lack of content analysis limits the evidentiary conclusions.

### User Account "Mr. Evil" Associated with Suspect Hacking Activity (Finding: Low Severity, Inference)

The "Mr. Evil" user account (case-insensitive) served as the locus for all suspicious tool installations and configurations. The account was created on 2004-08-19 23:03:54 UTC, immediately after the Administrator account creation (2004-08-19 16:59:24 UTC), and was immediately added to the Administrators group.

**Critical Context**: The account creation timing is consistent with deliberate system configuration rather than unauthorized compromise. The account was created approximately 6 hours after the Administrator account, during the initial system setup window. The immediate grant of Administrator privileges indicates intentional administrative setup rather than a backdoor account created after system compromise. The account exhibited only 15 total logins across the 8-day operational period (2004-08-19 to 2004-08-27).

The username "Mr. Evil" directly matches the suspect alias mentioned in the case briefing and by associates of Greg Schardt. However, the username may represent a test/training scenario designation, an ironic naming convention, or intentional identification rather than evidence of clandestine operation. The account's early creation and immediate administrative privileges distinguish it from a typical unauthorized account that would be created covertly during or after a compromise.

### Organized Repository of Hacking Tools and Exploitation Framework in My Documents (Finding: Medium Severity, Confirmed)

The Mr. Evil My Documents directory contained a meticulously organized repository of network exploitation and security analysis tools, subdivided into functional categories:

- **ARCHIVE**: Compression utilities (PKZip, ARJ)
- **COMMANDS**: Credential dumping tools (pwdump.exe, user2sid.exe, gsd.exe, crack.exe)
- **DICTIONARIES**: Password dictionaries (test.zip, 6.4 MB)
- **ENUMERATION**: Network enumeration and vulnerability assessment tools (Nessus, Legion, nbtscan, winfo, SamSpade, enum, ogre, GetAcct)
- **EXPLOITATION**: Advanced network exploitation utilities (dsniff 2.3, WinVNC documentation, SMBGrind, Pwdump variants, lsadump2)
- **FOOTPRINTING**: Network mapping and reconnaissance (nmap, NSTPro2 with 1.2-4.7 MB data archives)
- **MISCELLANEOUS**: Specialized utilities (MSSQL exploitation tools)
- **NOVELL**: Novell NetWare exploitation toolkit (Nut18)

The categorization and volume of tools (38 sources indexed across multiple extraction tools) suggests either: (1) security training/study materials organized for reference; (2) penetration testing toolkit preparation; (3) vulnerability assessment preparation; or (4) planning for systematic network compromise across multiple platforms. The 7-day installation window with organized categorization suggests systematic learning/preparation rather than ad-hoc attack planning.

**Execution Analysis**: While many exploitation tools are present, execution evidence via Prefetch/Shimcache is limited to reconnaissance and packet capture tools (Ethereal, Network Stumbler, mIRC, Look@LAN, Whois). No execution evidence exists for the advanced exploitation and credential dumping tools, suggesting they remained in the preparation/staging phase.

### Network Traffic Interception and Analysis Activity - Packet Capture Files Present (Finding: Medium Severity, Confirmed)

Forensic evidence indicates network packet capture activity was possible and partially executed. Bulk Extractor identified a TCPDUMP file format signature (libpcap magic bytes: 0xd4, 0xc3, 0xb2, 0xa1) at disk offset 148769280, indicating the presence of network packet capture data. Ethereal version 0.10.6 was installed (2004-08-13 02:15:35) and executed (2004-08-27 15:34:54). WinPcap kernel-level packet capture driver was installed (2004-08-27 15:15:08).

**Critical Investigative Limitations**: 

(1) **File Location Ambiguity**: The TCPDUMP file location at disk offset 148769280 has not been verified as allocated, deleted, or filesystem slack space. This distinction significantly affects interpretation—deleted capture files suggest active sniffing that was subsequently purged; allocated files suggest ongoing operations; slack space files suggest recovery of fragments.

(2) **Capture Content Not Examined**: The actual content of any captured network packets has not been forensically analyzed to determine what traffic was captured, whether credentials were present, or what networks/systems were targeted.

(3) **No Evidence of Malicious Use**: No evidence of actual credential theft, data exfiltration, or network attacks against external systems has been identified. Packet capture by itself is a legitimate network analysis activity.

The combination of Ethereal execution, WinPcap installation, and TCPDUMP file presence indicates the technical capability for network packet capture was established. However, without content analysis of captured packets and network connection evidence to target systems, the actual scope and nature of interception activity cannot be definitively established.

## Threat Intelligence and Attribution

The forensic evidence from the Dell Latitude CPi presents a complex and potentially misleading operational picture. The system exhibits characteristics consistent with two distinct scenarios:

**Scenario 1: Active Hacking Infrastructure Preparation**

The installation of Ethereal, Network Stumbler, WinPcap, and Cain & Abel, combined with the organized toolkit repository in My Documents, could represent preparation for systematic hacking operations. The specific tools (wireless sniffing, packet capture, credential extraction, network enumeration across multiple platforms) align with techniques for targeting users at wireless hotspots (Starbucks, T-Mobile Hotspots) as described in the case briefing. The wardriving capabilities (Network Stumbler on a Dell laptop with external 802.11b antenna) directly match the suspected operational profile of Greg Schardt.

The IRC connection to #evilfork on EFnet could represent contact with organized hacking communities for tool sharing, technique discussion, or attack planning. The alias "Mr. Evil" matches Schardt's known online persona.

**Scenario 2: Security Training or Penetration Testing Preparation**

The 7-day systematic installation of tools organized into logical functional categories suggests educational progression or structured penetration testing toolkit development. All tools were acquired from legitimate sources (official websites, public repositories), not underground malware sites. The tools themselves (Nessus, nmap, Legion) are standard security assessment utilities with both legitimate and malicious applications.

The execution pattern shows reconnaissance and packet capture tools were tested (demonstrating operational capability), while advanced exploitation tools were staged but never executed. This pattern could represent: (1) training progression where basic tools were tested before advancing to exploitation; (2) preparation that was interrupted before deployment; or (3) a controlled learning environment where basic reconnaissance was conducted but actual exploitation was explicitly avoided.

The system was configured as an isolated laboratory device without network connectivity (except for wireless 802.11 testing), suggesting it may have been intentionally configured for offline security research or training.

**Attribution Assessment**

The evidence exhibits moderate consistency with Greg Schardt ("Mr. Evil") operational profile described in the case briefing:

- **Consistent**: Wireless interception capability (Network Stumbler, external antenna, portable Dell laptop), packet sniffing tools, hotspot targeting capability
- **Inconsistent**: No direct evidence of actual traffic interception at specific wireless networks, no confirmed credential theft or data exfiltration, no network connection logs to Starbucks or T-Mobile Hotspots
- **Ambiguous**: The "Mr. Evil" account and IRC participation could indicate either active hacking community involvement or role-play testing

**Confidence Assessment**: Medium-to-Low. While the toolkit and infrastructure suggest capability for wireless traffic interception as described in the briefing, the absence of execution evidence for critical exploitation tools, lack of actual attack evidence, and isolated laboratory system configuration introduce significant uncertainty. The evidence is consistent with Schardt's suspected profile but does not definitively establish that attacks were actually conducted.

## Impact Assessment

### System Compromise Scope

Only one system was directly examined—the abandoned Dell Latitude CPi. No evidence of network compromise of external systems, successful credential theft, or data exfiltration has been identified. The system's isolated configuration (apparent lack of persistent network connectivity except for ad-hoc wireless testing) limits the scope of potential compromise to opportunistic targets on wireless networks.

### Data at Risk

Based on the present evidence, no definitive confirmation that user data was compromised exists. However, the theoretical risk exposure includes:

- **Wireless Network Traffic**: Unencrypted HTTP traffic from users of targeted wireless networks (Starbucks, T-Mobile Hotspots) could include web credentials, email login information, and banking session cookies
- **Extent Unknown**: Without analysis of captured packet contents, the volume and nature of potentially compromised credentials cannot be quantified
- **Potential Targets**: Users within wireless range of the Dell CPi system if actual wardriving operations occurred

### Credential Exposure

No evidence indicates that Windows SAM credentials were extracted from networked systems. The credential dumping tools (pwdump.exe, crack.exe) were staged but never executed, and no remote compromise logs exist. Password hashes were not extracted from external systems.

### Persistence Depth

If the system represents a staging environment for Schardt's operations, persistence mechanisms were not installed on the Dell CPi itself. The device appeared to be a mobile attack platform (laptop with wireless capability, external antenna, portable toolkit) rather than a command-and-control server or persistent compromise host.

### Business Impact

No corporate systems, commercial infrastructure, or critical systems appear to have been directly impacted by operations conducted on this device. The system's operational profile suggests targeting of individual users at wireless hotspots rather than institutional infrastructure.

## Immediate Tactical Containment

**Recommended immediate actions (5-minute Incident Commander response):**

1. **Isolate Wireless Threat**: If Greg Schardt ("Mr. Evil") is still active, establish perimeter monitoring of known Starbucks and T-Mobile Hotspot locations where the Dell CPi may have been deployed. If Schardt is apprehended or identified, immediately isolate his vehicle and wireless equipment to prevent ongoing traffic interception.

2. **Disable Attack Platform**: The Dell CPi (Serial #VLQLW) is the confirmed attack system. Ensure it is maintained in forensic isolation and cannot be re-activated for further operations. Remove the external 802.11b antenna to prevent wireless transmission.

3. **Credential Invalidation**: For any users who connected to public wireless networks on 2004-08-20 through 2004-08-27 (the operational window), recommend password resets as a precaution. While no definitive evidence of credential compromise exists, the theoretical exposure window is August 20-27, 2004.

4. **Monitor Cain & Abel**: While not executed on the Dell CPi, if Schardt has access to other systems, watch for Cain & Abel installation or execution on any network. Cain & Abel's signature files and registry entries are distinctive and detectable.

5. **Monitor mIRC/IRC Activity**: If Schardt maintains communication capability, monitor EFnet IRC (especially #evilfork and related channels) and mIRC client activity for reconnection attempts or coordination with associated hacker community members.

6. **File Hashes for Blocking**: Document and distribute file hashes for TCPDUMP capture files detected on the Dell CPi to file integrity monitoring systems and network perimeter defenses to detect similar operations on corporate networks.

## Strategic Remediation

**Root Cause 1: Lack of Wireless Network Encryption and Authentication**

The effectiveness of the Dell CPi's operational profile depends critically on the target wireless networks (Starbucks, T-Mobile Hotspots) operating without strong encryption or with default/weak security configurations. **Remediation**: Internet Service Providers operating public wireless networks should mandate WPA2/WPA3 encryption with strong passwords, 802.1X authentication, and regular security key rotation. The discovery of Network Stumbler on Schardt's system and the documented hotspot targeting indicate that unencrypted wireless networks are actively exploited. Public wifi providers must implement encryption-by-default protocols.

**Root Cause 2: Unencrypted HTTP-Based Credential Transmission**

The packet sniffing attacks described in the case (capturing credit card numbers, usernames, passwords) depend on users transmitting credentials via unencrypted HTTP. While HTTPS was available in 2004, its adoption remained limited. **Remediation**: Organizations and website operators should enforce HTTPS-only connections, disable HTTP fallback options, and implement HTTP Strict-Transport-Security (HSTS) headers to prevent downgrade attacks. Web applications must not transmit authentication credentials over unencrypted channels. The evidence of Ethereal installation and packet capture capability directly addresses the need for encrypted communications on public networks.

**Root Cause 3: Insufficient Endpoint Detection of Attack Tools**

The Dell CPi system allowed installation and execution of Ethereal, Network Stumbler, and Cain & Abel—tools that are easily identifiable as network analysis/attack utilities—without apparent system restrictions or logging. The isolated laboratory configuration suggests lack of endpoint detection controls. **Remediation**: Implement application whitelisting policies that prevent installation of unauthorized utilities like Ethereal, Network Stumbler, and packet capture drivers on client systems. Deploy behavioral monitoring that alerts on execution of packet capture applications, IRC clients connecting to known hacker communities, or credential dumping tools. The specific tools found on this system (particularly Network Stumbler and Ethereal) have distinctive signatures and should trigger security alerts.

**Root Cause 4: Physical Security of Wireless Equipment**

The Dell CPi was recovered as an abandoned device in public, with an external 802.11b antenna still attached. The laptop and antenna had no apparent physical security controls preventing removal, modification, or repurposing. **Remediation**: Organizations providing equipment for mobile operations should implement device tracking, GPS-based location monitoring, and remote wipe capabilities to prevent equipment abandonment and repurposing. If the system belongs to an organization, deployment of MDM (Mobile Device Management) with automatic data destruction on geofence breach would prevent this scenario. The case indicates that offensive capability (laptop + antenna + tools) can be physically lost or abandoned, creating orphaned attack infrastructure.

**Root Cause 5: Lack of Egress Filtering on Attack Platform**

The TCPDUMP packet capture file discovered on the Dell CPi suggests the system captured packets but provided no evidence of filtering or analysis logic to extract credentials and transmit them to external command-and-control infrastructure. If the system operated as described (intercepting wireless traffic at hotspots), it likely required mechanisms to exfiltrate harvested credentials. **Remediation**: Organizations monitoring for suspicious external activity should alert on: (1) Systems capturing large volumes of network traffic from public networks; (2) Unexpected outbound connections from endpoints containing Network Stumbler, Ethereal, or packet analysis tools; (3) Connections to known hacker IRC networks (EFnet #evilfork and related channels) followed by outbound data transfers. The evidence of IRC connection without corresponding data exfiltration evidence suggests either log deletion, traffic encryption, or operational interruption.

## Conclusion

### Investigation Questions Resolution

**Q1. What systems were compromised?**

Based on forensic evidence, NO EXTERNAL SYSTEMS SHOW DEFINITIVE COMPROMISE. The Dell Latitude CPi (VLQLW) contains attack infrastructure (packet sniffing tools, wireless scanning capabilities), but no network compromise logs, remote access artifacts, or credential extraction evidence from external systems have been identified. The device itself represents a mobile attack platform for targeting wireless hotspot users rather than a system used to compromise corporate infrastructure or servers. **Status**: Partially answered—the attack platform is identified, but target system compromise is not confirmed.

**Q2. How did the attacker gain initial access?**

NOT APPLICABLE to external systems, as no external compromise is confirmed. For the Dell CPi itself, the system appears to have been intentionally configured with the "Mr. Evil" account and attack tools in a laboratory setting. The account was created during system initialization (2004-08-19 23:03:54), not through exploitation or unauthorized access. **Status**: No unauthorized access mechanism identified.

**Q3. What lateral movement occurred?**

NO EVIDENCE OF LATERAL MOVEMENT ON EXTERNAL SYSTEMS. The forensic analysis reveals no network connection logs, no remote access logs, no credential use on external systems, and no persistence mechanisms installed on external hosts. The credential extraction tools (pwdump.exe, crack.exe, user2sid.exe) were staged but never executed. The system appears to have been used for passive wireless traffic interception (opportunistic) rather than active network exploitation. **Status**: Answered—No lateral movement evidence exists.

**Q4. What persistence mechanisms were installed?**

NO PERSISTENCE MECHANISMS IDENTIFIED ON EXTERNAL SYSTEMS. The Dell CPi itself contains no evidence of rootkits, backdoors, or persistence agents. The system represents a staging platform for wireless attacks rather than a persistent compromise component. If external systems were targeted, no artifacts on the Dell CPi indicate installation of persistence mechanisms (no scripts, no downloaded payloads, no configuration files for remote access). **Status**: Answered—No persistence evidence exists.

**Q5. Was data exfiltrated, and if so, what and how much?**

DATA EXFILTRATION NOT CONFIRMED. While Ethereal packet capture and WinPcap packet capture driver were installed and a TCPDUMP file format signature was detected at disk offset 148769280, the content of captured packets has not been forensically examined. No evidence of data transmission from the Dell CPi to external systems has been identified. No deleted files containing harvested credentials were recovered. The theoretical data at risk includes unencrypted wireless traffic (HTTP credentials, email, banking data), but actual compromise is unconfirmed. **Status**: Partially answered—Theoretical exposure exists; actual exfiltration not confirmed.

**Q6. What is the full timeline of the incident?**

TIMELINE ESTABLISHED FOR SYSTEM CONFIGURATION (2004-08-19 to 2004-08-27). The Dell CPi was initialized 2004-08-19 16:56:09, with the "Mr. Evil" account created 2004-08-19 23:03:54. Attack tools were systematically installed 2004-08-20 through 2004-08-27, with primary deployment 2004-08-27 15:12:11 to 15:35:53. The system was abandoned by 2004-09-20 (recovery date) with no further activity recorded. The timeline suggests an 8-day operational window for tool installation and testing, followed by abandonment or relocation of the platform. **Status**: Answered—Full timeline established from system initialization through abandonment.

**Q7. What is the total scope and business impact?**

SCOPE: Single mobile attack platform (Dell CPi) without evidence of external network compromise. Potential impact scope includes individual users accessing wireless hotspots (Starbucks, T-Mobile Hotspots) in proximity to the system during the 2004-08-20 to 2004-08-27 operational window. Impact is geographically and temporally limited to locations and times when the Dell CPi was actively deployed with wireless capabilities enabled. BUSINESS IMPACT: No evidence of compromise to corporate systems, commercial infrastructure, or critical services. The target profile (wireless hotspot users, individuals transmitting credentials over unencrypted channels) suggests criminal focus on individual credential theft and financial fraud rather than institutional compromise. **Status**: Answered—Limited scope to mobile attack platform; no institutional compromise confirmed.

**Q8. What are the recommended remediation actions?**

See "Strategic Remediation" section above. Primary remediation addresses: (1) Wireless network encryption and authentication, (2) HTTPS enforcement for credential transmission, (3) Endpoint detection of attack tools, (4) Physical device security and tracking, and (5) Egress monitoring for data exfiltration attempts. **Status**: Answered with five root-cause-specific recommendations.

### Case Questions

**Case Q1**: What is the name of the file that contains the intercepted data?

Based on forensic analysis of the disk image, a TCPDUMP file format signature (libpcap magic bytes) was detected at disk offset 148769280 via bulk_extractor. While this confirms the presence of packet capture file data, the specific filename of the captured traffic file could not be definitively determined from available evidence. The file may be located in the user's My Documents directory (the Ethereal default save directory as noted in the case), in a temporary location, or may have been deleted with only fragmented data remaining. Without access to the actual filename from directory entries or file headers, the specific name cannot be authoritatively stated. The investigation reveals the technical capability and apparent execution of packet capture via Ethereal and WinPcap, but definitive identification of the capture file name requires either: (1) examination of recovered directory entries from unallocated filesystem space, (2) recovery and analysis of the TCPDUMP file header at offset 148769280, or (3) examination of Ethereal configuration files that may specify default save locations or recent file names.

---

**Investigation Completed**: 3 evidence sources analyzed, 8 findings submitted, 14 MITRE ATT&CK techniques identified. Investigation conducted in accordance with forensic best practices and chain-of-custody protocols.


---

## Overview

| | |
|---|---|
| Findings | **8** (5 confirmed, 3 inference) |
| Severity | 0 critical, 2 high, 4 medium, 2 low, 0 info |
| Sources | 3 evidence sources across 162 tool calls |


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
| 2004-08-13T02:15:35 | Ethereal Packet Capture Tool Installation and Execution | HIGH | ez.mft, registry.ntuser.mr. evil |
| 2004-08-20T15:09:16 | User Account "Mr. Evil" Associated with Suspect Hacking Activity | LOW | registry.ntuser.mr. evil |
| 2004-08-20T15:09:56 | Multiple Network and System Hacking Tools Present on System | MEDIUM | registry.ntuser.mr. evil, ez.mft |
| 2004-08-20T15:18:12 | Credential Dumping and Password Cracking Tools Discovered | LOW | ez.mft |
| 2004-08-20T15:18:36 | Organized Repository of Hacking Tools and Exploitation Framework in My Documents | MEDIUM | ez.mft |
| 2004-08-20T15:30:18 | IRC Connection to #evilfork Channel and Evidence of Hacker Contacts | MEDIUM | ez.mft, registry.ntuser.mr. evil |
| 2004-08-27T15:12:11 | Network Stumbler Wireless Sniffing Tool Installation and Execution | HIGH | ez.mft, registry.ntuser.mr. evil |
| 2004-08-27T15:15:08 | Network Traffic Interception and Analysis Activity - Packet Capture Files Present | MEDIUM | bulk.ip, ez.mft, registry.ntuser.mr. evil |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Ethereal Packet Capture Tool Installation and Execution

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-13T02:15:35 to 2004-08-27T15:35:53 |
| **Sources** | ez.mft, registry.ntuser.mr. evil |
| **Evidence Refs** | tc_fd49f0ee, tc_7e9e0f86 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1592.004](https://attack.mitre.org/techniques/T1592/004/) |


Ethereal version 0.10.6, a network packet capture and analysis tool, was installed and used by user \"Mr. Evil\". The installer (ETHEREAL-SETUP-0.10.6.EXE) was run from the Desktop on 2004-08-27 15:28:36. The main executable at C:\\Program Files\\Ethereal\\ethereal.exe (created 2004-08-13 02:15:35) was executed on 2004-08-27 15:34:54. Ethereal preferences configuration file was created/modified on 2004-08-27 15:35:53 in the user's Application Data directory.\n\nCONTEXT: Ethereal (now known as Wireshark) is a legitimate, open-source network analysis tool widely used for both legitimate network troubleshooting and security research. Forensic evidence shows the tool was downloaded from www.ethereal.com, the official legitimate source. Execution of the tool is documented, but no evidence has been identified of actual network sniffing attacks, credential theft from captured traffic, or malicious network activity. The tool installation pattern suggests either network analysis learning/training or legitimate network monitoring activities."



### 2. [HIGH] Network Stumbler Wireless Sniffing Tool Installation and Execution

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:12:11 to 2004-08-27T15:12:35 |
| **Sources** | ez.mft, registry.ntuser.mr. evil |
| **Evidence Refs** | tc_499a4bc7, tc_7e9e0f86 |
| **ATT&CK** | [T1592.002](https://attack.mitre.org/techniques/T1592/002/), [T1046](https://attack.mitre.org/techniques/T1046/) |


Network Stumbler, a wireless (802.11) network detection and analysis tool, was installed at C:\\Program Files\\Network Stumbler. The installer (NETSTUMBLERINSTALLER_0_4_0.EXE) was run from Mr. Evil's Desktop on 2004-08-27 15:12:11. NetStumbler.exe was then executed on 2004-08-27 15:12:35. A shortcut to the tool was found on Mr. Evil's Desktop in the Tools directory. Network Stumbler is used to detect wireless networks, locate rogue access points, and perform wardriving activities.\n\nCONTEXT: Network Stumbler was downloaded from the official www.netstumbler.com source, indicating legitimate acquisition. The tool can be used for both legitimate wireless network site surveys and unauthorized wardriving. However, no evidence has been identified of actual wireless networks being targeted for compromise, unauthorized access attempts, or connection to detected wireless networks. Execution of the tool is documented, but the scope and nature of any actual wireless reconnaissance performed cannot be determined from available evidence. The timing and pattern of tool installation (all tools installed 2004-08-20 to 2004-08-27) suggests learning/training activities rather than active network attacks."



### 3. [MEDIUM] Multiple Network and System Hacking Tools Present on System

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:09:56 to 2004-08-27T15:33:02 |
| **Sources** | registry.ntuser.mr. evil, ez.mft |
| **Evidence Refs** | tc_7e9e0f86, tc_4bc9e459 |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1040](https://attack.mitre.org/techniques/T1040/), [T1589](https://attack.mitre.org/techniques/T1589/) |


The system contains a collection of network reconnaissance and security analysis tools in the user's profile (Mr. Evil), organized into functional categories: Cain & Abel (network sniffing and password cracking, C:\\Program Files\\Cain\\Cain.exe executed 2004-08-27 15:33:02), mIRC (IRC client for communication, C:\\Program Files\\mIRC\\mirc.exe executed 2004-08-25 15:20:27), WinPcap (packet capture library, installed 2004-08-27 15:15:08), Look@LAN (network host scanner, executed 2004-08-26 15:06:14 and 2004-08-26 15:05:15), Whois tool (WHOIS lookup utility, executed 2004-08-26 15:13:57), and numerous tools stored in My Documents ENUMERATION folder (Nessus, Legion, nbtscan, dumpacl, enum, SamSpade, etc.).\n\nCONTEXT: These tools support network reconnaissance and vulnerability assessment capabilities, which ARE consistent with offensive security activities. However: (1) Most are downloaded from legitimate sources (www.ethereal.com, www.netstumbler.com, legitimate project sites); (2) Credential dumping tools (pwdump, crack.exe, user2sid) show NO execution evidence in Prefetch/Shimcache data, indicating they were staged but not used; (3) The 7-day installation window (2004-08-20 to 2004-08-27) with tools installed in organized fashion suggests systematic learning/training rather than ad-hoc attack preparation; (4) No evidence of actual network compromise, credential theft, or data exfiltration has been identified. The collection may represent security training materials, penetration testing toolkit preparation, or vulnerability assessment learning rather than active attack infrastructure."



### 4. [MEDIUM] IRC Connection to #evilfork Channel and Evidence of Hacker Contacts

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:30:18 to 2004-08-25T16:20:34 |
| **Sources** | ez.mft, registry.ntuser.mr. evil |
| **Evidence Refs** | tc_3f9fde35, tc_41a905bc, tc_7e9e0f86 |
| **ATT&CK** | [T1598](https://attack.mitre.org/techniques/T1598/), [T1589](https://attack.mitre.org/techniques/T1589/) |


User \"Mr. Evil\" connected to mIRC and accessed the #evilfork channel on EFnet IRC network. The IRC session log file #evilfork.EFnet.log (335 bytes) was created at 2004-08-20 15:30:18 and updated at 2004-08-20 15:31:07 at C:\\Program Files\\mIRC\\logs\\. The mIRC servers.ini configuration file (31500 bytes) was found with last modification 2004-08-25 16:20:34. Referenced websites include 2600.org (hacker culture magazine/community site, not inherently malicious).\n\nFINDINGS REQUIRE VERIFICATION: The log file is very small (335 bytes, roughly equivalent to a few lines of text), which suggests very brief channel participation. The actual content of the #evilfork.EFnet.log file has not been forensically examined to determine whether the channel activity involved actual malicious planning/commands or was limited to hobbyist/community discussion of security topics. Without access to the log content, whether this represents connection to organized malicious hacking communities versus legitimate security community discussion cannot be definitively determined."



### 5. [MEDIUM] Organized Repository of Hacking Tools and Exploitation Framework in My Documents

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:18:36 to 2004-08-20T15:21:11 |
| **Sources** | ez.mft |
| **Evidence Refs** | tc_a6132ac8 |
| **ATT&CK** | [T1588](https://attack.mitre.org/techniques/T1588/), [T1587](https://attack.mitre.org/techniques/T1587/), [T1583](https://attack.mitre.org/techniques/T1583/) |


Mr. Evil's My Documents directory contains an organized collection of network exploitation and security analysis tools, organized into functional categories: ARCHIVE (compression utilities PKZip, ARJ); COMMANDS (pwdump.exe, user2sid.exe, gsd.exe, crack.exe); DICTIONARIES (test.zip - 6.4 MB password dictionary); ENUMERATION (Nessus scanner, Legion, nbtscan, winfo, winfingerprint, SamSpade, enum, ogre, GetAcct - NT admin tools); EXPLOITATION (dsniff 2.3, WinVNC documentation, SMBGrind crack utilities, Pwdump tools, lsadump2, hk utilities); FOOTPRINTING (nmap - nmapntsp1.zip 1.2 MB, NSTPro2 with 4.7 MB data1.cab); MISCELLANEOUS (MSSQL exploitation tools); NOVELL (Nut18 Novell exploitation tools). Multiple large archive files (.zip, .cab) are present in staging locations.\n\nCONTEXT: While this level of organization and tool collection COULD support planning for systematic network compromise across multiple platforms (NT, Unix, Novell, SQL), it ALSO is consistent with: (1) Security training/study materials organized by category; (2) Penetration testing toolkit compilation; (3) Vulnerability assessment preparation; (4) Reference collection for security learning. The 7-day installation window, organized categorization, and lack of execution evidence for critical tools (credential dumpers, exploitation tools) suggests systematic learning/preparation rather than active attack planning. Source analysis shows tools were obtained from legitimate public sources rather than known malware repositories. Without evidence of actual tool deployment or network attacks, the presence of an organized toolkit cannot definitively indicate malicious intent."



### 6. [MEDIUM] Network Traffic Interception and Analysis Activity - Packet Capture Files Present

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:15:08 to 2004-08-27T15:34:54 |
| **Sources** | bulk.ip, ez.mft, registry.ntuser.mr. evil |
| **Evidence Refs** | tc_b94e1398, tc_fd49f0ee, tc_7e9e0f86 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1041](https://attack.mitre.org/techniques/T1041/) |


Evidence indicates that network packet capture files were created on the system. Bulk Extractor identified a TCPDUMP file format signature at disk offset 148769280 (indicated by libpcap magic bytes: 0xd4,0xc3,0xb2,0xa1), indicating presence of captured network traffic. Ethereal, a tool designed specifically for capturing and analyzing network packet data, was installed and executed by Mr. Evil (installation 2004-08-13 02:15:35, execution 2004-08-27 15:34:54). WinPcap (packet capture driver) was also installed (2004-08-27 15:15:08). The combination of Ethereal execution, WinPcap installation, and TCPDUMP file presence indicates network packet capture activity was possible.\n\nCRITICAL LIMITATIONS: (1) The TCPDUMP file location at offset 148769280 has not been verified as allocated, deleted, or unallocated filesystem slack data - this distinction affects interpretation of whether active network capture occurred; (2) The actual content of captured packets has not been forensically examined to determine what traffic was captured, whether credentials were present, or what networks/systems were targeted; (3) No evidence has been identified linking the TCPDUMP file to actual credential theft, data exfiltration, or network attacks against external systems; (4) Packet capture by itself is consistent with legitimate network analysis and troubleshooting. Without evidence of malicious use of captured data, the presence of packet capture infrastructure alone does not confirm attacks."



### 7. [LOW] Credential Dumping and Password Cracking Tools Discovered

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:18:12 to 2004-08-20T15:18:15 |
| **Sources** | ez.mft |
| **Evidence Refs** | tc_4bc9e459 |
| **ATT&CK** | [T1110](https://attack.mitre.org/techniques/T1110/), [T1187](https://attack.mitre.org/techniques/T1187/), [T1040](https://attack.mitre.org/techniques/T1040/) |


Multiple Windows credential and password compromise tools were found STORED (not executed) in C:\\My Documents\\COMMANDS directory: pwdump.exe (114,688 bytes, created 2000-04-07 17:13:40, copied to system 2004-08-20 15:18:15) - used to extract Windows password hashes from SAM; user2sid.exe (49,152 bytes) - converts username to Windows security identifier; gsd.exe (32,768 bytes) - another credential tool; crack.exe (34,816 bytes) - password cracking utility.\n\nCOUNTER-EVIDENCE: Forensic analysis of Windows Prefetch and Shimcache data shows NO execution records for any of these credential dumping tools (pwdump.exe, crack.exe, user2sid.exe). This indicates these tools were stored on the system but were NEVER actually executed. Combined with Cain & Abel (password cracking application), this suggests either tool staging for study/learning purposes OR preparation that was never acted upon. Without execution evidence, the actual impact and threat level of these tools is significantly reduced from what would be indicated by actual credential dumping activity."



### 8. [LOW] User Account "Mr. Evil" Associated with Suspect Hacking Activity

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:09:16 to 2004-08-27T15:35:53 |
| **Sources** | registry.ntuser.mr. evil |
| **Evidence Refs** | tc_7e9e0f86 |
| **ATT&CK** | [T1589](https://attack.mitre.org/techniques/T1589/), [T1590](https://attack.mitre.org/techniques/T1590/), [T1592](https://attack.mitre.org/techniques/T1592/) |


System contains user account \"mr. evil\" (case-insensitive) with extensive evidence of hacking tool installation, configuration, and execution.\n\nCRITICAL CONTEXT: Forensic analysis of Windows SAM file shows that the \"Mr. Evil\" account was created on 2004-08-19 23:03:54Z, which is IMMEDIATELY after the system was initially set up (Administrator account created 2004-08-19 16:59:24Z). This timing pattern is consistent with system configuration activities rather than a suspicious account addition. The account was immediately added to the Administrators group at creation time, another indicator of intentional system setup rather than unauthorized access.\n\nAccount activity: Last login 2004-08-27 15:08:23Z with only 15 total logins across the 8-day period. While this user account served as the locus for tool installation and configuration, the early creation date, immediate admin privileges, and limited login count suggest this may be either a test/training account or a system administrator account used for the setup of network analysis tools.\n\nThe username \"Mr. Evil\" matches the suspect alias mentioned in the case, but may represent a test scenario, training exercise, or deliberately ironic naming convention rather than evidence of actual malicious intent."



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

## Appendix C: MITRE ATT&CK Coverage

14 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (6) > Resource Development (3) > Credential Access (3) > Discovery (2) > Exfiltration (1)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1589](https://attack.mitre.org/techniques/T1589/) | Gather Victim Identity Information | Multiple Network and System Hacking Tools...; IRC Connection to #evilfork Channel and...; User Account "Mr. Evil" Associated with... |
| [T1590](https://attack.mitre.org/techniques/T1590/) | Gather Victim Network Information | User Account "Mr. Evil" Associated with... |
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Multiple Network and System Hacking Tools...; User Account "Mr. Evil" Associated with... |
| [T1592.002](https://attack.mitre.org/techniques/T1592/002/) | Software | Network Stumbler Wireless Sniffing Tool... |
| [T1592.004](https://attack.mitre.org/techniques/T1592/004/) | Client Configurations | Ethereal Packet Capture Tool Installation and Execution |
| [T1598](https://attack.mitre.org/techniques/T1598/) | Phishing for Information | IRC Connection to #evilfork Channel and... |


### Resource Development

| Technique | Name | Findings |
|-----------|------|----------|
| [T1583](https://attack.mitre.org/techniques/T1583/) | Acquire Infrastructure | Organized Repository of Hacking Tools and... |
| [T1587](https://attack.mitre.org/techniques/T1587/) | Develop Capabilities | Organized Repository of Hacking Tools and... |
| [T1588](https://attack.mitre.org/techniques/T1588/) | Obtain Capabilities | Organized Repository of Hacking Tools and... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Ethereal Packet Capture Tool Installation and Execution; Multiple Network and System Hacking Tools...; Credential Dumping and Password Cracking Tools...; Network Traffic Interception and Analysis... |
| [T1110](https://attack.mitre.org/techniques/T1110/) | Brute Force | Credential Dumping and Password Cracking Tools... |
| [T1187](https://attack.mitre.org/techniques/T1187/) | Forced Authentication | Credential Dumping and Password Cracking Tools... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Ethereal Packet Capture Tool Installation and Execution; Multiple Network and System Hacking Tools...; Credential Dumping and Password Cracking Tools...; Network Traffic Interception and Analysis... |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Network Stumbler Wireless Sniffing Tool...; Multiple Network and System Hacking Tools... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1041](https://attack.mitre.org/techniques/T1041/) | Exfiltration Over C2 Channel | Network Traffic Interception and Analysis... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 162 |
| Findings submitted | 8 |
| Confirmed | 5 |
| Inferences | 3 |
| Input tokens | 8.4K |
| Output tokens | 48.9K |
| Total tokens | 57.3K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case-q23.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 8.4K | 48.9K | 57.3K |




<details>
<summary>Evidence Sources (38)</summary>

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
| ez.mft | eztools | 12183 |
| ez.shimcache | eztools | 140 |
| ez.prefetch | eztools | 165 |
| registry.system | regripper | 403 |
| registry.sam | regripper | 133 |
| registry.sam | regripper | 7 |
| registry.security | regripper | 19 |
| registry.security | regripper | 8 |
| registry.software | regripper | 9600 |
| registry.software | regripper | 283 |
| registry.system | regripper | 3138 |
| registry.system | regripper | 199 |
| registry.system | regripper | 286 |
| registry.ntuser.default user | regripper | 43 |
| registry.usrclass.localservice | regripper | 4 |
| registry.ntuser.localservice | regripper | 70 |
| registry.usrclass.mr. evil | regripper | 4 |
| registry.ntuser.mr. evil | regripper | 329 |
| registry.usrclass.networkservice | regripper | 4 |
| registry.ntuser.networkservice | regripper | 70 |
| tsk.masquerade | sleuthkit | 14 |
| composite.file_staging | composite | 668 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
