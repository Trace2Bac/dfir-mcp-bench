# Mulder Investigation Report

**Case:** nist-hacking-case-q31
**Generated:** 2026-11-14T13:38:40.640494+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 44 evidence sources (17 disk, 27 other) | 149 tool calls | 12 minutes
**Results:** 9 findings (5 high) | 1 confirmed, 8 inference
**Timeline:** 2002-01-23 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2002-01-23 to 2004-08-20): IRC Client Installation and Remote Access Tool Use (+4 related)
- **Persistence** (2004-08-20): Suspicious Network Connections and Potential Lateral Movement (+2 related)
- **Credential Access** (2004-08-20): Credential Dumping and Password Extraction Tools Detected

**Tools:** search (36), submit_finding (10), update_finding (9), get_raw_output (8), open_case (6). SHA-256 hashes recorded for all evidence.



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

149 tool calls were executed across 7
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# NIST Hacking Case Investigation Report

## Background

This investigation concerns a Dell Latitude CPi notebook computer (serial number VLQLW) discovered abandoned on September 20, 2004, along with a wireless PCMCIA card and an external homemade 802.11b antenna. The abandoned equipment raised suspicion of use in hacking and unauthorized network access activities. The suspected user associated with this device is Greg Schardt, who operates under the online pseudonym "Mr. Evil." Intelligence suggests the suspect may have frequented wireless access points in locations such as Starbucks and T-Mobile Hotspots to intercept internet traffic in an attempt to steal credentials, including credit card numbers, usernames, and passwords.

The investigative environment consists of a single Dell CPi notebook system running Windows operating system. Forensic analysis was conducted on an EnCase image of the computer's storage media, consisting of two segments (4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02). The disk image was subjected to comprehensive forensic examination including file listing, registry analysis, executable analysis, and malware detection using multiple tools. A total of 7 forensic sources were indexed and analyzed during this investigation, yielding 9 significant findings across multiple categories of hacking-related activity.

## Incident Timeline

The forensic evidence indicates a concentrated period of tool installation and execution between August 20 and August 27, 2004, spanning eight days. This timeline is reconstructed from Windows registry execution logs, file modification times, and file system metadata.

**Installation Phase (August 20, 2004, 15:05:00 - 15:20:42)**

On August 20, 2004, beginning at 15:05:00, multiple hacking tools and utilities were installed on the system. Registry evidence indicates the source of these installations was the D:\\Drivers directory path. The installation sequence included credential extraction tools (pwdump version 2.2 in My Documents\\COMMANDS at 114,688 bytes, created 2000-04-07; pwdump3 utilities in My Documents\\EXPLOITATION\\NT\\Pwdump; lsadump2 in My Documents\\EXPLOITATION\\NT\\lsadump2), password cracking software (Brutus password cracking tool with supporting files including users.txt and NetBus.bad), and various support tools. Concurrent installations included the Anonymizer privacy tool (executable dated 2002-07-12, first executed 2004-08-20 15:05:09), IRC client (mIRC installed 2004-08-20 15:09:55), FTP clients, and newsreaders. By 15:20:42, an organized exploitation framework had been established in My Documents with subdirectories for EXPLOITATION (Windows NT and Unix variants), ENUMERATION, and FOOTPRINTING categories. This installation pattern is consistent with preparation for network reconnaissance or attack staging, though no evidence of execution or active attack during this installation window was identified.

**Reconnaissance and Discovery Phase (August 25-26, 2004)**

Between August 25 and August 26, 2004, network reconnaissance activity commenced. On August 26, 2004, at 15:05:15, the user executed telnet.exe, a command-line network utility. This was followed at 15:06:14 by execution of Look@LAN, a network scanning tool used to discover systems and services on local networks. At 15:07:27, the system accessed network resources including a shared folder on Andrews-1 computer (CD Drive and printer shares). At 15:08:14, the user accessed a shared folder at network address 4.12.220.254, identified as "Temp on m1200" in the Recent Documents registry, via both HTTP and FTP protocols. At 15:13:57 on August 26, the whois.exe utility was executed, a tool for obtaining domain registration information. The cumulative pattern indicates active network discovery and enumeration against both the local network (Andrews-1) and external network address (4.12.220.254).

**Intensive Tool Execution Phase (August 27, 2004, 15:11:07 - 15:46:00)**

On August 27, 2004, a substantial increase in tool execution frequency occurred. At 15:11:07, the NetStumbler wireless network scanner was installed (lalsetup250.exe). Between 15:12:11 and 15:12:35, NetStumbler was executed multiple times, a tool designed to locate and enumerate wireless access points. This activity aligns with the case context of the suspect parking near Starbucks and T-Mobile Hotspots with wireless equipment. At 15:15:08, WinPcap (Windows Packet Capture library) was installed, providing low-level network packet capture capability. At 15:28:36, Ethereal (now known as Wireshark) version 0.10.6 was installed; Ethereal is a comprehensive network packet analyzer used to capture and inspect network traffic in real time. At 15:33:02 on August 27, Cain & Abel was executed—a password recovery and network analysis tool capable of performing network sniffing and credential extraction. At 15:34:54, Ethereal was executed. This August 27 execution pattern is consistent with active packet capture and network traffic analysis, potentially targeting other users' network communications on wireless networks. By 15:46:00, the execution activity concluded. No evidence of commands received via IRC, outbound data exfiltration attempts, or inbound connection logs indicating successful compromise of remote systems was identified in the forensic record.

## Key Findings

### Credential Dumping and Password Extraction Capabilities

The system contained multiple utilities designed to extract Windows password hashes and credentials. Pwdump.exe (114,688 bytes) was located in My Documents\\COMMANDS, with creation date 2000-04-07. Pwdump3 utilities and associated files were located in My Documents\\EXPLOITATION\\NT\\Pwdump, with last modified time of 2004-08-20 15:19:41. The lsadump2 tool was located in My Documents\\EXPLOITATION\\NT\\lsadump2, last modified 2004-08-20 15:19:43. Additionally, the Brutus password cracking tool was installed in My Documents\\EXPLOITATION\\NT\\Brutus with supporting files (users.txt, NetBus.bad), designed for automated password guessing attacks against network services. YARA malware scanning detected samdump.dll as a HackTool_Samples variant. These tools collectively indicate capability for extracting credentials from the compromised system itself and for attacking remote systems with weak passwords. However, no forensic evidence of successful extraction of credentials from this local system or from any victim systems was identified. File access logs, registry modifications, or data staging areas that would indicate active credential theft were not found.

### Network Packet Capture and Traffic Analysis Infrastructure

The system contained a complete network packet capture and analysis infrastructure. Ethereal (Wireshark) version 0.10.6 with setup file dated 2004-08-27 15:28:36 was installed; execution occurred at 2004-08-27 15:34:54. Cain & Abel password recovery and network analysis tool with installation date 2003-12-13 was executed on 2004-08-27 15:33:02. WinPcap packet capture library (multiple versions) was installed at 2004-08-27 15:15:08, providing the low-level network interface required for packet capture. These tools collectively enable real-time capture and inspection of network traffic on local network segments, including extraction of unencrypted credentials transmitted over HTTP, FTP, Telnet, and other cleartext protocols. The user visited ethereal.com (the official Wireshark website), indicating deliberate research into packet capture capabilities. Despite the installation and execution of these tools, no captured packet files (tcpdump, pcap format) were found in the file system, and no log entries documenting captured credentials or traffic analysis were identified. The presence of the infrastructure does not establish proof of active eavesdropping against other users' networks.

### Wireless Network Reconnaissance

Network reconnaissance tools specifically targeting wireless networks were present and executed. NetStumbler wireless network scanner installers were located on the desktop (lalsetup250.exe and netstumblerinstaller_0_4_0.exe), with execution timestamps of 2004-08-27 15:12:11 and 15:12:35. NetStumbler scans for 802.11 wireless access points and clients, documenting signal strength, encryption status, and channel information. This tool aligns precisely with the case context describing the suspect parking near Starbucks and T-Mobile Hotspots equipped with a wireless PCMCIA card and external antenna. Additionally, Look@LAN network scanner was executed on 2004-08-26 15:06:14, designed to discover Windows file sharing services on local network segments. Whois.exe was executed on 2004-07-28 and 2004-08-26 15:13:57, used for domain registration lookups. Telnet.exe was executed on 2004-08-26 15:05:15 for manual network service enumeration. The user accessed security research websites: wardriving.com (an online repository of GPS-tagged wireless access point locations and security analysis), 2600.org (hacking culture forum), majorgeeks.com (software distribution), ethereal.com (packet analyzer), and maktoob.com (Arabic email service). This web browsing pattern is consistent with deliberate learning and preparation for wireless network exploitation, though the sites also support legitimate security research and penetration testing activities.

### Network Access and Lateral Movement Connections

Registry evidence documents network folder access indicating attempted lateral movement or network file browsing. A link file in Documents and Settings\\Mr. Evil\\Recent (dated 2004-08-26 15:08:14) references "Temp on m1200 (4.12.220.254)," indicating connection to network address 4.12.220.254 at IP layer. Registry typed URLs evidence documents access to both HTTP and FTP protocols at this address. Additionally, shared folder access is documented to \\\\Andrews-1\\cd (CD Drive) and \\\\Andrews-1\\printer (printer share), with access time recorded at 2004-08-26 15:07:27. NetHood (network shortcuts) entries in the registry document these persistent connections. While these accesses are documented in the file system and registry, they could represent legitimate network file browsing, testing, or lab activity. No evidence of credential theft from these remote systems, unauthorized data access, or malware deployment to these targets was identified in the forensic record.

### Persistence and Communication Infrastructure

Indicators of command and control or persistence capability were identified. mIRC IRC client was installed in Program Files\\mIRC (2004-08-20 15:09:55) and executed on 2004-08-25 16:20:27 (three execution instances documented in registry). IRC is commonly used for real-time communication among online communities, including hacking forums. The Anonymizer privacy tool (Program Files\\Anonymizer\\Core, installed 2002-07-12) was executed on 2004-08-20 15:05:09, masking internet protocol addresses from web services and ISP logs. FTP clients (Forte Agent, CuteFTP) and email tools (Agent newsreader) were installed. These dual-use tools could theoretically support command and control communication or data exfiltration; however, no inbound command activity via IRC, active data transfer logs, or persistence mechanisms (scheduled tasks, registry run keys, service installations) establishing automated callback capability were identified.

### User Account Association

All tool execution, network reconnaissance, and file access activity are attributed to the user account "Mr. Evil" through registry UserAssist and shimcache execution logs. This account executed packet sniffing tools (Ethereal at 2004-08-27 15:34:54, Cain at 2004-08-27 15:33:02), network scanning tools (NetStumbler, Look@LAN, whois, telnet), and accessed network resources. The account accessed security research websites (2600.org, wardriving.com, ethereal.com, majorgeeks.com). The account executed 329 lines of documented activity across the registry. While the account name "Mr. Evil" is suggestive of intentional association with malicious activity, the name alone is not definitive—the activity pattern is the basis for association with the suspected user Greg Schardt. The registry evidence demonstrates consistent tool usage by this single account, making this account the focal point of investigation.

### Antivirus Scanning Results

ClamAV antivirus scanning of the forensic image did not yield definitive results regarding file-level virus infection. The ClamAV tool treated the EnCase disk image file as a single binary file rather than parsing the file system structure, preventing scanning of individual files within the image. Consequently, the absence of detections in this scan does not establish that files in the image are clean. However, YARA-based malware detection successfully scanned the extracted file system and detected samdump.dll as a HackTool_Samples variant (consistent with credential extraction tools), confirming the presence of known hacking tools. Traditional computer viruses (self-replicating malware with worm or boot sector components) were not detected by available antivirus signatures; however, the system contains multiple hacking utilities designed for network attack rather than autonomous replication. The distinction between hacking tools (which require user execution or command and control) and traditional viruses (which self-replicate) is important: the system is infected with hacking tools rather than viruses per se, though the distinction is forensically academic—the threat posed by the hacking tools is considerable.

## Threat Intelligence and Attribution

The forensic evidence establishes that this computer contains a professional-grade collection of network reconnaissance, credential extraction, and packet capture tools organized in a deliberate exploitation framework. The installation on a single date (August 20, 2004), the organization into EXPLOITATION, ENUMERATION, and FOOTPRINTING directories, and the subsequent execution pattern over August 25-27 are consistent with preparation for network attacks, not accidental installation or casual security research.

However, establishing definitive attribution of this activity to a specific threat actor or confirming execution of successful attacks requires evidence beyond tool presence. The available forensic evidence shows:

**Confirmed activity patterns:**
- Intentional installation and execution of network reconnaissance tools targeting wireless networks (NetStumbler, IEEE 802.11 focus)
- Intentional network folder access to remote systems (Andrews-1, 4.12.220.254)
- User account "Mr. Evil" correlated with all execution activity
- Access to security research websites discussing hacking techniques and tools
- Possession of wireless equipment (PCMCIA card, external antenna) aligned with wireless network targeting

**Absence of confirming evidence:**
- No captured network traffic files (pcap format) indicating actual eavesdropping
- No credential harvesting logs or data staging files
- No outbound data exfiltration logs or command and control communication traces
- No evidence of compromise or infection of target systems (Andrews-1, 4.12.220.254)
- No persistent backdoors or malware on victim systems (no access logs to victim systems)

The evidence is consistent with both active hacking preparation and reconnaissance, and with security research or penetration testing activity conducted by an authorized party. The case context—an abandoned computer with hacking tools and the suspect's known association with wireless network interception—supports the hacking scenario. However, the absence of forensic evidence of successful attacks means this investigation has established capability and preparation, not confirmed compromise or data theft. The tool collection is consistent with known TTPs of wireless network eavesdropping campaigns documented in the 2000s (wardriving communities, wireless WEP cracking, credential interception), but a single system's tool collection does not establish attribution to a specific threat group without additional intelligence.

## Impact Assessment

The scope of this incident, if the suspected attack activity occurred, would be limited to systems within radio range of the suspect's wireless equipment. The abandoned location and the discovered wireless PCMCIA card and external antenna suggest the suspect operated from specific geographic locations, likely near Starbucks and T-Mobile Hotspots as indicated by the case context. No evidence of widespread network compromise, large-scale data exfiltration, or deployment to multiple systems was identified.

However, the forensic investigation does not confirm that attacks actually occurred. The investigation establishes:

- **Compromised systems**: Unknown. No evidence of successful attacks on specific targets identified.
- **Data at risk**: Unknown. No evidence of data exfiltration or credential theft from victim systems.
- **Credential exposure**: The presence of credential dumping tools indicates this was a capability, but no evidence of credential extraction from local or remote systems.
- **Persistence depth**: Limited to this single system. No evidence of malware or backdoors on other systems.
- **Affected user count**: Unknown. No specific victim systems identified.

The investigation's most significant finding is the absence of forensic evidence of successful compromise despite the presence of attack tools. This absence could indicate: (1) attacks were conducted but evidence was deleted or not recovered, (2) attacks were planned but not executed, or (3) the computer was used for legitimate security research rather than unauthorized access. The forensic evidence alone does not distinguish between these scenarios.

## Incident Timeline (Standard Q6)

August 20, 2004, 15:05:00 to 15:20:42: Exploitation framework installation from D:\\Drivers, including credential dumping tools, password crackers, network analysis tools, and IRC client.

August 25-26, 2004: Intermittent execution of network reconnaissance tools (Look@LAN, whois, telnet) and network folder access to Andrews-1 and 4.12.220.254.

August 27, 2004, 15:11:07 to 15:46:00: Intensive wireless network reconnaissance (NetStumbler execution, WinPcap installation) and packet capture tools execution (Ethereal, Cain & Abel).

September 20, 2004: Computer discovered abandoned with wireless equipment.

## Case Question Response

**Case Q1: Are there any viruses on the computer?**

The forensic investigation detected hacking and exploitation tools rather than traditional computer viruses. ClamAV antivirus scanning of the forensic image did not produce definitive results due to technical limitations (the tool could not parse the disk image file system structure). However, YARA-based malware detection successfully scanned extracted files and identified samdump.dll as a HackTool_Samples variant, confirming the presence of known credential extraction tools. No self-replicating worm or Trojan programs with autonomous propagation capability were detected. The system is infected with deliberate hacking utilities rather than viruses per se, which is a significant distinction: viruses self-replicate; these tools require user execution. The threat posed by the presence of these hacking tools is substantial regardless of the virus classification—they enable unauthorized network access, credential theft, and wireless network eavesdropping. No traditional antivirus signatures for known viruses matched files on the system.

## Conclusion

This investigation of the abandoned Dell Latitude CPi notebook has established the presence of a comprehensive hacking and network reconnaissance toolkit, with execution evidence concentrated in August 2004 and correlated to the user account "Mr. Evil." The evidence is consistent with preparation for wireless network eavesdropping and credential interception as described in the case context. However, the investigation has not identified forensic evidence of successful attacks, compromised remote systems, or data exfiltration.

**Answering the eight standard investigation questions:**

**Q1. What systems were compromised?** No compromised systems were identified through forensic evidence. While network access to Andrews-1 and 4.12.220.254 is documented, no evidence of unauthorized access, malware installation, or credential theft from these systems was recovered.

**Q2. How did the attacker gain initial access?** This question is not applicable as no confirmed attacks were identified. The presence of wireless equipment and packet capture tools suggests the intended attack method was wireless network eavesdropping or credential interception from legitimate users accessing wireless hotspots.

**Q3. What lateral movement occurred?** No confirmed lateral movement to other systems was identified. Network access to Andrews-1 and 4.12.220.254 is documented, but no evidence of privilege escalation, malware propagation, or persistence on these systems.

**Q4. What persistence mechanisms were installed?** No persistence mechanisms (scheduled tasks, registry run keys, service installations, or backdoors) were identified on this system or on accessed remote systems. The hacking tools present require manual execution rather than autonomous callback.

**Q5. Was data exfiltrated, and if so, what and how much?** No evidence of data exfiltration was identified. While credential extraction and packet capture tools are present, no captured credentials, exfiltrated files, or outbound command and control communication were recovered from the forensic image.

**Q6. What is the full timeline of the incident?** See Incident Timeline section. The active period spans August 20-27, 2004, with tool installation on August 20 and reconnaissance execution August 25-27.

**Q7. What is the total scope and business impact?** The scope is limited to this single computer and any systems within wireless range of the suspect's equipment. No specific victims or compromised systems were identified. Business impact is therefore undetermined—potential if attacks occurred, but no forensic evidence of actual compromise.

**Q8. What are the recommended remediation actions?** (See recommendations in Strategic Remediation section below.)

## Immediate Tactical Containment

1. **Isolate the abandoned computer from any network connectivity** to prevent any potential persistence mechanisms or command and control communications if the device were to be powered on.
2. **Preserve the forensic image** as evidence and prevent any modification or deletion of files.
3. **Disable the user account "Mr. Evil"** on any systems where it exists, and review account activity logs for all activity in August 2004.
4. **Block network connections** to 4.12.220.254 at network perimeter firewalls if this address is within the organization's network scope or known to be a controlled system. Review access logs to this address for all systems.
5. **Review Andrews-1 system** for evidence of unauthorized access, credential theft, or malware installation during August 2004. Preserve forensic evidence.
6. **Disable the IRC client (mIRC)** and verify that no IRC command and control channels are active on any network systems.
7. **Review wireless access point logs** near suspected locations (Starbucks, T-Mobile Hotspots) for any unauthorized authentication attempts or credential interception patterns during August 2004 (if available).

## Strategic Remediation

**Root Cause 1: Lack of endpoint detection and response (EDR) on user systems.** The presence of multiple hacking tool installations and executions was only discovered through forensic analysis of an abandoned device. A real-time EDR system would have detected the August 20 installation of credential dumping tools (pwdump, lsadump2, brutus), the August 27 installation of packet capture libraries (WinPcap), and the execution of network reconnaissance tools (NetStumbler, Ethereal, Cain & Abel). Implementation of EDR with behavioral detection rules for known hacking tool signatures would alert security operations to future similar activity. Specifically, detection rules should flag execution of pwdump variants, installation of WinPcap or similar packet capture libraries, execution of wireless network scanning tools, and access to security research websites in combination with hacking tool installations.

**Root Cause 2: Absence of network segmentation and monitoring of suspicious network connections.** The documented connections to 4.12.220.254 and Andrews-1 were recovered through file system and registry forensics, but were not flagged by network intrusion detection or access control systems in real time. The connection on 2004-08-26 15:08:14 to 4.12.220.254 should have generated a network alert if the address was known to be a high-value target or if network behavior anomaly detection was in place (a user system attempting multiple failed connections to unfamiliar addresses). Implementation of network flow monitoring with alerting on outbound connections from user workstations to unusual IP addresses, combined with geographic correlation (the abandoned computer connected to an address different from the user's normal operating location), would detect this activity.

**Root Cause 3: Inadequate wireless network access controls.** The suspect's possession of wireless PCMCIA card, external antenna, and wireless scanning tools (NetStumbler, wireless network analyzer) suggests wireless network eavesdropping as the primary attack vector. The case context describes the suspect parking near Starbucks and T-Mobile Hotspots. If these wireless networks were encrypted with WPA2 or WPA3 with strong pre-shared keys, or if they implemented MAC address filtering and strong authentication, the attack surface would be substantially reduced. Additionally, wireless intrusion detection systems (WIDS) would detect the presence of active wireless scanning tools and alert to potential wireless threats. Implementation of strong wireless encryption, strong key management, and wireless intrusion detection would mitigate this attack vector.

**Root Cause 4: Unrestricted software installation and application allowlisting absent.** The system allowed installation of multiple hacking tools from removable media (D:\\Drivers path indicates the source was likely external). Software application allowlisting or mandatory code signing verification would have prevented installation of pwdump, lsadump2, brutus, Ethereal, Cain & Abel, and other unsigned hacking utilities. Implementation of application allowlisting, where only approved applications are permitted to execute, with mandatory verification of digital signatures and hash checking, would prevent installation of unapproved hacking tools from removable media or untrusted sources.

**Root Cause 5: Absence of user behavior baseline and anomaly detection.** The execution of nine hacking tools by the "Mr. Evil" account over August 25-27 represents a substantial deviation from typical user behavior (assuming normal users do not execute credential dumping utilities or wireless scanners daily). A user behavior analytics (UBA) system would establish a baseline of normal account behavior and alert when the account executes tools outside that baseline. The combination of whois queries, wireless network scanning, packet capture tool execution, and network folder access to unusual addresses all in a single day (August 27) would constitute a high-confidence anomaly alert. Implementation of user behavior analytics with detection rules for suspicious tool usage patterns would provide real-time detection.

---

This investigation has completed forensic analysis of the abandoned Dell CPi notebook and has identified a professional-grade collection of hacking and network reconnaissance tools consistent with the case context of wireless network eavesdropping. While no confirmed attacks were identified through forensic evidence, the presence of these tools, the evidence of tool execution in August 2004, and the correlation to the user account "Mr. Evil" establish probable cause for further investigation and the recommended remediation actions outlined above.


---

## Overview

| | |
|---|---|
| Findings | **9** (1 confirmed, 8 inference) |
| Severity | 0 critical, 5 high, 4 medium, 0 low, 0 info |
| Sources | 7 evidence sources across 149 tool calls |


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
| 2002-01-23T03:51:16 | IRC Client Installation and Remote Access Tool Use | MEDIUM | ez.shimcache, registry.ntuser.mr. evil |
| 2002-07-12T00:01:32 | Anonymization and Privacy Evasion Tools | MEDIUM | ez.mft, registry.ntuser.mr. evil |
| 2004-08-13T02:15:35 | Network Packet Capture and Sniffing Tools Installed | HIGH | ez.shimcache, registry.ntuser.mr. evil, tsk.filelist |
| 2004-08-20T15:05:00 | Suspicious Network Connections and Potential Lateral Movement | HIGH | ez.mft, registry.ntuser.mr. evil, bulk.domain |
| 2004-08-20T15:05:00 | Active User Account "Mr. Evil" Associated with Hacking Tools and Activities | HIGH | registry.ntuser.mr. evil, ez.shimcache |
| 2004-08-20T15:05:00 | Execution Timeline of Hacking Tools (August 20-27, 2004) | MEDIUM | registry.ntuser.mr. evil |
| 2004-08-20T15:09:46 | Network Reconnaissance Tools and Scanning Activities | HIGH | ez.shimcache, registry.ntuser.mr. evil, bulk.domain |
| 2004-08-20T15:18:15 | Credential Dumping and Password Extraction Tools Detected | HIGH | yara.files, ez.mft, tsk.filelist |
| 2004-08-20T15:18:15 | Organized Exploitation Framework with Multiple Attack Categories | MEDIUM | composite.file_staging, ez.mft, tsk.filelist |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Credential Dumping and Password Extraction Tools Detected

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:18:15 to 2004-08-20T15:19:48 |
| **Sources** | yara.files, ez.mft, tsk.filelist |
| **Evidence Refs** | tc_3ffbb9d6, tc_c36507f7, tc_964bec7d |
| **ATT&CK** | [T1110.004](https://attack.mitre.org/techniques/T1110/004/), [T1003.003](https://attack.mitre.org/techniques/T1003/003/) |


Multiple credential extraction and password dumping utilities were discovered on the system, including: (1) pwdump.exe in My Documents\\COMMANDS (114,688 bytes, created 2000-04-07); (2) pwdump3 and associated files in My Documents\\EXPLOITATION\\NT\\Pwdump (modified 2004-08-20 15:19:41); (3) lsadump2 in My Documents\\EXPLOITATION\\NT\\lsadump2 (modified 2004-08-20 15:19:43); (4) Brutus password cracking tool in My Documents\\EXPLOITATION\\NT\\Brutus with supporting files (users.txt, NetBus.bad). YARA scan detected samdump.dll as HackTool_Samples variant. These tools are capable of extracting Windows password hashes and credentials. However, no forensic evidence of successful credential extraction from the local system or from victim systems was identified. Tool presence indicates capability but not confirmed active use in attacks.



### 2. [HIGH] Network Packet Capture and Sniffing Tools Installed

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-13T02:15:35 to 2004-08-27T15:35:53 |
| **Sources** | ez.shimcache, registry.ntuser.mr. evil, tsk.filelist |
| **Evidence Refs** | tc_c36507f7, tc_6ff20891, tc_964bec7d |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/) |


Multiple network packet capture and analysis tools were installed on the system. Evidence includes: (1) Ethereal (Wireshark) 0.10.6 with setup file dated 2004-08-27 15:28:36, executed 2004-08-27 15:34:54; (2) Cain & Abel (password recovery and network analysis tool) from 2003-12-13, executed 2004-08-27 15:33:02; (3) WinPcap packet capture library (multiple versions) installed 2004-08-27 15:15:08; (4) dsniff 2.3 (Unix network tool). User visited ethereal.com (official Wireshark website) and wardriving.com. While these tools enable packet capture and credential interception, they are also legitimate network troubleshooting tools used by network administrators and security professionals. No evidence of actual credential interception, packet capture of victim networks, or use in active attacks was identified.



### 3. [HIGH] Network Reconnaissance Tools and Scanning Activities

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:09:46 to 2004-08-27T15:12:35 |
| **Sources** | ez.shimcache, registry.ntuser.mr. evil, bulk.domain |
| **Evidence Refs** | tc_c36507f7, tc_6ff20891, tc_2fd85aba |
| **ATT&CK** | [T1046](https://attack.mitre.org/techniques/T1046/), [T1592](https://attack.mitre.org/techniques/T1592/) |


Multiple network reconnaissance and scanning tools were installed and executed. Evidence includes: (1) NetStumbler (wireless network scanner) installers on desktop (lalsetup250.exe, netstumblerinstaller_0_4_0.exe) executed 2004-08-27 15:12:11 and 15:12:35; (2) Look@LAN network scanner executed 2004-08-26 15:06:14; (3) Whois domain lookup tool (whois.exe) executed multiple times (2004-07-28, 2004-08-26 15:13:57); (4) Telnet.exe executed 2004-08-26 15:05:15. User visited security research sites: wardriving.com, 2600.org, majorgeeks.com, ethereal.com, and maktoob.com (Arabic email service). User accessed network IP 4.12.220.254 and Andrews-1 computer. While these tools and websites are consistent with network research, they could also support legitimate network troubleshooting or penetration testing rather than proof of malicious reconnaissance. No confirmed reconnaissance of victim networks or use in successful attacks was identified.



### 4. [HIGH] Suspicious Network Connections and Potential Lateral Movement

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:05:00 to 2004-08-26T15:08:14 |
| **Sources** | ez.mft, registry.ntuser.mr. evil, bulk.domain |
| **Evidence Refs** | tc_2fd85aba, tc_6ff20891, tc_b5ad3389 |
| **ATT&CK** | [T1021](https://attack.mitre.org/techniques/T1021/), [T1570](https://attack.mitre.org/techniques/T1570/) |


Registry and recent documents evidence indicates the system accessed network resources including: (1) Shared folder access to \\\\4.12.220.254\\Temp on host m1200 (2004-08-26 15:08:14) via both HTTP and FTP protocols; (2) Network access to Andrews-1 computer including CD Drive and printer shares (accessed 2004-08-26 15:07:27); (3) Typed URLs accessing 4.12.220.254 via both HTTP and FTP. While these connections are documented, they could represent legitimate network file browsing, network troubleshooting, or lab activity rather than proof of attack or compromise. No evidence of lateral movement post-exploitation, credential theft from target systems, or data exfiltration was identified.



### 5. [HIGH] Active User Account "Mr. Evil" Associated with Hacking Tools and Activities

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:05:00 to 2004-08-27T15:46:00 |
| **Sources** | registry.ntuser.mr. evil, ez.shimcache |
| **Evidence Refs** | tc_6ff20891, tc_c36507f7 |
| **ATT&CK** | [T1078.003](https://attack.mitre.org/techniques/T1078/003/) |


The user account "Mr. Evil" executed multiple hacking and network reconnaissance tools, and accessed security research websites. Evidence shows: (1) Packet sniffing tools executed by this account: Ethereal 2004-08-27 15:34:54, Cain 2004-08-27 15:33:02; (2) Network scanning tools: NetStumbler 2004-08-27 15:12:35, Look@LAN 2004-08-26 15:06:14; (3) Network access to 4.12.220.254 and Andrews-1; (4) Typed URLs to security research sites: 2600.org, wardriving.com, ethereal.com, majorgeeks.com; (5) Access to tool directories including Anonymizer, GhostWare, channels. Registry tracks 329 lines of user activity data. Note: The account name "Mr. Evil" is suggestive but not definitive proof of malicious intent - the activity pattern itself (not the name) is the basis for this finding. The account could represent testing, penetration testing, or security research rather than attack activity.



### 6. [MEDIUM] Organized Exploitation Framework with Multiple Attack Categories

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:18:15 to 2004-08-20T15:20:42 |
| **Sources** | composite.file_staging, ez.mft, tsk.filelist |
| **Evidence Refs** | tc_964bec7d, tc_c36507f7 |
| **ATT&CK** | [T1587.001](https://attack.mitre.org/techniques/T1587/001/) |


The system contained a collection of exploitation, enumeration, and network analysis tools organized in My Documents directories, created during 2004-08-20 15:18-15:20. Directories include: EXPLOITATION\\NT (Pwdump, lsadump2, Brutus password cracker, SMBGrind, WinVNC, HK hash cracking), EXPLOITATION\\Unix (dsniff 2.3), ENUMERATION\\NT (DumpTools, Cerberus), FOOTPRINTING\\NT (NSTPro2). Registry execution logs show sporadic use of these tools August 25-27, 2004, primarily for network discovery and analysis (NetStumbler, whois, telnet, Look@LAN execution). No forensic evidence of successful compromises, credential theft from victim systems, or data exfiltration was identified. The organization could represent archived security research materials, penetration testing tools, or attack infrastructure, but tool presence and limited execution alone do not confirm active malicious campaigns.



### 7. [MEDIUM] Anonymization and Privacy Evasion Tools

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2002-07-12T00:01:32 to 2004-08-20T15:05:09 |
| **Sources** | ez.mft, registry.ntuser.mr. evil |
| **Evidence Refs** | tc_a406c147, tc_6ff20891 |
| **ATT&CK** | [T1090](https://attack.mitre.org/techniques/T1090/) |


Anonymization software was installed on the system. Anonymizer.dll (274,432 bytes) in Program Files\\Anonymizer\\Core directory (installed 2002-07-12) shows execution on 2004-08-20 15:05:09. User's Recent Documents show 'Anonyymizer' as frequently accessed. Anonymizer tools can mask IP addresses and anonymize internet activity. While presence on a system used for security research or network testing could support privacy protection, no forensic evidence of use in actual attacks or compromise scenarios was identified. The tool could represent legitimate privacy practices rather than evidence of malicious evasion.



### 8. [MEDIUM] IRC Client Installation and Remote Access Tool Use

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2002-01-23T03:51:16 to 2004-08-25T16:20:27 |
| **Sources** | ez.shimcache, registry.ntuser.mr. evil |
| **Evidence Refs** | tc_c36507f7, tc_6ff20891 |
| **ATT&CK** | [T1071.001](https://attack.mitre.org/techniques/T1071/001/), [T1090](https://attack.mitre.org/techniques/T1090/) |


Multiple communication and data transfer tools were installed on the system. Evidence includes: (1) mIRC IRC client installed 2004-08-20 15:09:55 in Program Files\\mIRC, executed on 2004-08-25 16:20:27 (3 executions per registry); (2) Agent newsreader (2002-01-23); (3) Forte Agent FTP client; (4) CuteFTP. While IRC, email, and FTP tools could theoretically support command and control communication or data exfiltration, no forensic evidence of actual use for these purposes was identified. These are dual-use tools commonly found on personal systems for legitimate internet access. No evidence of inbound commands received via IRC, outbound data transfers, or compromise of systems for data theft was identified.



### 9. [MEDIUM] Execution Timeline of Hacking Tools (August 20-27, 2004)

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:05:00 to 2004-08-27T15:46:00 |
| **Sources** | registry.ntuser.mr. evil |
| **Evidence Refs** | tc_6ff20891 |
| **ATT&CK** | [T1587.001](https://attack.mitre.org/techniques/T1587/001/), [T1583](https://attack.mitre.org/techniques/T1583/) |


A timeline of tool execution was reconstructed from registry UserAssist data and ShimCache: August 20, 2004: Installation phase from D:\\Drivers paths (123wasp, pwdump, whois, mirc, FTP, Forte Agent, Cain, Anonymizer) between 15:05:00-15:12:54. August 25-26, 2004: Execution of network tools including Look@LAN (2004-08-26 15:06:14), telnet (2004-08-26 15:05:15), whois (2004-08-26 15:13:57), with network folder access (2004-08-26 15:07:27). August 27, 2004: Intensive tool activity: NetStumbler installer (15:11:07), NetStumbler execution (15:12:11-15:12:35), WinPcap installation (15:15:08), Ethereal installation (15:28:36), Ethereal execution (15:34:54), Cain execution (15:33:02). The pattern shows tool installation followed by sporadic execution over a week, consistent with either testing/research or attack preparation. However, no evidence of successful attacks, compromised systems, or data exfiltration was identified to confirm the timeline represents active attack operations versus legitimate testing.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| External IP | `4.12.220.254` |  | Network Reconnaissance Tools and Scanning Activities |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |





---

## Appendix C: MITRE ATT&CK Coverage

12 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (1) > Resource Development (2) > Initial Access (1) > Persistence (1) > Privilege Escalation (1) > Defense Evasion (1) > Credential Access (3) > Discovery (2) > Lateral Movement (2) > Command and Control (2)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Network Reconnaissance Tools and Scanning Activities |


### Resource Development

| Technique | Name | Findings |
|-----------|------|----------|
| [T1583](https://attack.mitre.org/techniques/T1583/) | Acquire Infrastructure | Execution Timeline of Hacking Tools (August... |
| [T1587.001](https://attack.mitre.org/techniques/T1587/001/) | Malware | Organized Exploitation Framework with Multiple...; Execution Timeline of Hacking Tools (August... |


### Initial Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.003](https://attack.mitre.org/techniques/T1078/003/) | Local Accounts | Active User Account "Mr. Evil" Associated with... |


### Persistence

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.003](https://attack.mitre.org/techniques/T1078/003/) | Local Accounts | Active User Account "Mr. Evil" Associated with... |


### Privilege Escalation

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.003](https://attack.mitre.org/techniques/T1078/003/) | Local Accounts | Active User Account "Mr. Evil" Associated with... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.003](https://attack.mitre.org/techniques/T1078/003/) | Local Accounts | Active User Account "Mr. Evil" Associated with... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1003.003](https://attack.mitre.org/techniques/T1003/003/) | NTDS | Credential Dumping and Password Extraction... |
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Network Packet Capture and Sniffing Tools Installed |
| [T1110.004](https://attack.mitre.org/techniques/T1110/004/) | Credential Stuffing | Credential Dumping and Password Extraction... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Network Packet Capture and Sniffing Tools Installed |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Network Reconnaissance Tools and Scanning Activities |


### Lateral Movement

| Technique | Name | Findings |
|-----------|------|----------|
| [T1021](https://attack.mitre.org/techniques/T1021/) | Remote Services | Suspicious Network Connections and Potential... |
| [T1570](https://attack.mitre.org/techniques/T1570/) | Lateral Tool Transfer | Suspicious Network Connections and Potential... |


### Command and Control

| Technique | Name | Findings |
|-----------|------|----------|
| [T1071.001](https://attack.mitre.org/techniques/T1071/001/) | Web Protocols | IRC Client Installation and Remote Access Tool Use |
| [T1090](https://attack.mitre.org/techniques/T1090/) | Proxy | Anonymization and Privacy Evasion Tools; IRC Client Installation and Remote Access Tool Use |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 149 |
| Findings submitted | 9 |
| Confirmed | 1 |
| Inferences | 8 |
| Input tokens | 429 |
| Output tokens | 45.0K |
| Total tokens | 45.4K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case-q31.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 429 | 45.0K | 45.4K |




<details>
<summary>Evidence Sources (44)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 12545 |
| clamav.scan | clamav | 2 |
| yara.files | yara | 3 |
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
| registry.query.software | python-registry | 1 |
| ez.mft | eztools | 12183 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| ez.shimcache | eztools | 140 |
| ez.prefetch | eztools | 165 |
| registry.system | regripper | 376 |
| registry.sam | regripper | 133 |
| registry.sam | regripper | 7 |
| registry.system | regripper | 19 |
| registry.system | regripper | 8 |
| registry.system | regripper | 9600 |
| registry.system | regripper | 283 |
| registry.system | regripper | 3138 |
| registry.system | regripper | 199 |
| registry.ntuser.default user | regripper | 43 |
| registry.usrclass.localservice | regripper | 4 |
| registry.ntuser.localservice | regripper | 70 |
| registry.usrclass.mr. evil | regripper | 4 |
| registry.ntuser.mr. evil | regripper | 329 |
| registry.usrclass.networkservice | regripper | 4 |
| registry.ntuser.networkservice | regripper | 70 |
| tsk.masquerade | sleuthkit | 14 |
| composite.file_staging | composite | 668 |
| composite.file_staging | composite | 668 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
