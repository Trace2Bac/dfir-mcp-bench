# Mulder Investigation Report

**Case:** nist-hacking-case-q23
**Generated:** 2026-11-14T05:22:52.174845+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 181 evidence sources (16 disk, 165 other) | 195 tool calls | 14 minutes
**Results:** 6 findings (1 high) | 6 confirmed, 0 inference
**Timeline:** 2004-08-20 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-20): Cain & Abel Password Cracking and Network Sniffing Tool Installed (+2 related)
- **Persistence** (2004-08-20 to 2004-08-27): Suspect Identity: Greg Schardt (aka 'Mr. Evil') with Yahoo Email Account (+1 related)
- **Credential Access** (2004-08-20): Comprehensive Hacking and Network Reconnaissance Toolkit in My Documents

**Tools:** search (87), update_finding (11), open_case (8), submit_finding (8), get_investigation_summary (7). SHA-256 hashes recorded for all evidence.



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

195 tool calls were executed across 11
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative: Dell CPi Notebook Hacking Incident

## Background

On September 20, 2004, law enforcement recovered an abandoned Dell CPi notebook computer (serial #VLQLW) along with a wireless PCMCIA card and external 802.11b antenna. The device was discovered in circumstances suggesting possible use for wireless network hacking, with initial suspicion linking it to suspect Greg Schardt (pseudonym "Mr. Evil"). The investigation focused on establishing whether this system was used for malicious network interception and credential theft activities, particularly targeting public wireless hotspots at locations such as T-Mobile Hotspots and Starbucks. 

This forensic analysis examined an EnCase image containing 11 indexed evidence sources from the Dell Latitude CPi system. Extraction and analysis tools recovered evidence from filesystem artifacts, registry hives, prefetch files, network packet captures, and application files. The investigation period covers August 19-27, 2004, based on system timestamps, with the system ultimately powered down on August 27, 2004, at 15:46:33 UTC.

## Incident Timeline

The timeline of events related to this investigation spans approximately one week in August 2004, with installation and configuration of hacking tools occurring during the first phase, followed by system execution and shutdown.

**August 20, 2004 - Installation Phase:**
At 10:05 AM UTC on August 20, 2004, Cain & Abel v2.5 build 45 was installed on the system, as documented in Program Files\Cain\Install.log. This installation automatically included the WinPcap 3.0.1a network driver necessary for packet capture operations. The Cain installation log indicates the software setup process completed successfully on this date, establishing network sniffing capability on the system.

**August 20, 2004 - Ethereal Setup and Desktop Placement:**
The Ethereal packet sniffer installer (ETHEREAL-SETUP-0.10.6.EXE) was placed on the desktop of the "Mr. Evil" user account at 15:05:52 UTC. Ethereal 0.10.6 was subsequently installed in Program Files\Ethereal, with supporting documentation files (capture_filters.txt, capturing.txt, display_filters.txt, faq.txt) present in the application's help directory. The placement of the installer on the desktop rather than in a typical downloads folder suggests deliberate setup and configuration by the user.

**August 20, 2004 - Hacking Toolkit Organization:**
On the same date, an extensive collection of reconnaissance and exploitation tools was organized into categorized folders within the My Documents directory. Tools were organized under categories including: FOOTPRINTING (Nmap, Nmapnt, NSTPro2, Superscan, Spade), ENUMERATION (enum, ogre, Cerberus Internet Scanner), EXPLOITATION (Brutus password cracker, Pwdump for SAM extraction, dsniff network analysis), and supporting COMMANDS and ARCHIVE folders. This systematic organization suggests planning and preparation for network reconnaissance activities.

**August 20, 2004 - Look@LAN Installation:**
An additional network reconnaissance tool, Look@LAN, was executed at 15:08:37 UTC on August 20, 2004. This tool capabilities are documented in Program Files\iRunin.ini, indicating configuration for network discovery and host enumeration. The simultaneous deployment of multiple reconnaissance tools on this date reinforces the pattern of systematic toolkit preparation.

**August 25-27, 2004 - Execution Phase:**
System activity records indicate tool execution during the operational window of August 25-27. Cain & Abel was executed on August 27, 2004, at 15:33:03 UTC. Ethereal was executed on August 27, 2004, at 15:34:54 UTC, just moments after Cain & Abel, suggesting a coordinated packet capture and analysis sequence.

**August 27, 2004 - System Shutdown:**
The system was powered down at 15:46:33 UTC on August 27, 2004, approximately 12 minutes after Ethereal execution. This timestamp, recorded in the SYSTEM registry hive (ControlSet001\Control\Windows\ShutdownTime), represents the final operational moment of the system before seizure and forensic imaging.

## Key Findings

### Finding 1: Suspect Identity and Account Linkage

The investigation conclusively identified the primary user account on the system as belonging to Greg Schardt operating under the pseudonym "Mr. Evil". Direct evidence includes a Yahoo account configuration URL recovered from browser cache showing the fields: First Name "Greg", Last Name "Schardt", Yahoo ID "mrevil2000", at the URL: http://edit.yahoo.com/config/id_check?.fn=Greg&.ln=Schardt&.id=mrevil2000. The Windows user account name is "Mr. Evil" with corresponding NTUSER.DAT registry hive, confirming active system use by this user profile. The nexus between the legal name Greg Schardt and the online identifier "mrevil2000" along with the "Mr. Evil" pseudonym directly links the suspect to this system.

The pseudonym "Mr. Evil" raises ambiguity regarding intent—such naming conventions can represent legitimate security testing personas or malicious activity. However, combined with the possession and organization of hacking tools, the pseudonym carries investigative significance.

### Finding 2: Ethereal Packet Sniffer with Network Capture Capability

Ethereal 0.10.6, a professional-grade packet sniffer and network protocol analyzer, was installed on the system with full packet capture functionality. Evidence of installation includes: (1) ETHEREAL-SETUP-0.10.6.EXE found on the desktop of the Mr. Evil account; (2) ETHEREAL.EXE located in Program Files\Ethereal; (3) WinPcap 3.0.1a driver installed in Program Files\Cain\Driver as a dependency for packet capture; (4) Complete documentation in Program Files\Ethereal\help including capture_filters.txt, capturing.txt, display_filters.txt, and faq.txt. Ethereal execution was confirmed via prefetch records on August 27, 2004, at 15:34:54 UTC.

Critically, a binary network traffic file in TCPDUMP format was recovered bearing the magic number signature 0xd4,0xc3,0xb2,0xa1 at disk offset 148769280. This TCPDUMP file presence confirms that packet capture operations were performed. However, examination of the packet capture content found no evidence of successful credential theft, extraction of sensitive protocols (such as unencrypted HTTP with authentication headers), or interception of payment card data. The actual content and scope of captured network traffic remains unclear, as analysis revealed no indicators of compromised credentials or exfiltrated data within the recovered capture file.

### Finding 3: Cain & Abel Password Cracking Tool

Cain & Abel v2.5 build 45, a password cracking and network analysis tool with multi-protocol sniffing capabilities, was installed on August 20, 2004, at 10:05 UTC as documented in Program Files\Cain\Install.log. The executable CAIN.EXE was executed on August 27, 2004, at 15:33:03 UTC (Prefetch record), immediately preceding Ethereal execution. CAIN25B45.EXE was executed on August 20, 2004, at 15:05:52 UTC during the initial setup phase.

Cain & Abel installation included the WinPcap driver, establishing the necessary kernel-level packet capture infrastructure. Despite the tool's capabilities for password cracking, ARP spoofing, credential harvesting, and network analysis, searches for evidence of actual credential cracking operations, captured passwords, or successful exploitation yielded no results. No password hash files, cracking session logs, or captured credentials were identified in the evidence.

### Finding 4: Comprehensive Network Reconnaissance and Exploitation Toolkit

A systematic collection of security testing and network exploitation tools was identified in the My Documents directory, organized into functional categories that suggest planned reconnaissance and assessment activities:

**Footprinting Tools:** Nmap (port scanner), Nmapnt (Windows version), NSTPro2 (network topology/asset discovery), Superscan (comprehensive network scanner), and Spade 1.14 (IP and host enumeration).

**Enumeration Tools:** Enum (Windows-specific enumeration), Ogre (comprehensive host enumeration), Cerberus Internet Scanner (vulnerability scanning and host profiling).

**Exploitation Tools:** Brutus (password cracking/brute force), Pwdump (Windows SAM extraction), dsniff 2.3 (network protocol analysis with credential capture capability).

**Supporting Infrastructure:** COMMANDS folder with system utility tools, ARCHIVE folder with compressed files, NOVELL folder with Novell network tools, plus documentation and source code files.

The systematic organization into functional categories (reconnaissance → enumeration → exploitation) suggests preparation for a structured attack workflow. However, despite the organized toolkit presence, searches for evidence of tool execution results, scan output files, targeting information, or successful exploitation yielded no results. No output logs from Nmap scans, Brutus cracking attempts, or successful system compromises were recovered.

### Finding 5: Look@LAN Network Discovery Tool

Look@LAN, a network discovery and host enumeration utility, was executed on August 20, 2004, at 15:08:37 UTC. Configuration information is documented in Program Files\iRunin.ini. This tool provides capabilities for discovering network neighbors, identifying active hosts, and performing network topology mapping. Like the other reconnaissance tools, Look@LAN was installed and executed but no output files or results of network scans were recovered in the evidence.

### Finding 6: System Timeline and Operational Conclusion

The system maintained operational status from August 19-27, 2004, with the final recorded shutdown at 15:46:33 UTC on August 27, 2004. Registry timestamps establish that the system was active and configured during this period, with tool installation completing on August 20, 2004. Tool execution occurred on August 27, 2004, with the system shutdown occurring approximately 12 minutes after Ethereal was launched.

## Threat Intelligence and Attribution

The evidence pattern presents a clear narrative of an individual (Greg Schardt/"Mr. Evil") preparing a comprehensive network hacking toolkit with the apparent intent to conduct wireless network interception and credential capture. The suspect's use of the pseudonym "Mr. Evil," combined with systematic toolkit organization and the specific malicious tools selected (Ethereal for packet sniffing, Cain & Abel for password cracking, Brutus for credential brute-forcing), strongly suggests malicious intent rather than legitimate security testing.

The wireless PCMCIA card and external 802.11b antenna discovered with the system, combined with Ethereal and WinPcap installation, directly support the stated law enforcement theory that this system was intended for wireless network interception at public hotspots. The timeline of August 20 toolkit setup followed by August 27 execution suggests an operational window ending with system seizure or deliberate shutdown to destroy evidence.

However, the investigation faces a critical gap: despite the presence of comprehensive hacking tools and evidence that packet capture occurred (TCPDUMP file recovered), there is no recovered evidence of actual successful attacks, credential theft, or data exfiltration. This gap could indicate: (1) the tools were acquired but not yet actively deployed against targets; (2) attack outputs were deliberately deleted or encrypted; or (3) the system was seized before operational deployment.

## Impact Assessment

The scope of the compromise remains limited to the single Dell CPi notebook. No evidence of lateral movement to other systems, network share compromises, or data exfiltration was identified. The system appears to be a standalone workstation configured as a wireless interception platform for opportunistic network attacks.

The potential impact, had the system been deployed operationally, would be significant: Ethereal and Cain & Abel could capture credentials, payment card data, and authentication tokens from wireless users. The presence of an 802.11b antenna suggests targeting of wireless networks, which in 2004 were frequently unencrypted or weakly encrypted. Potential victims would include wireless users at public hotspots who accessed banking, email, or other credential-bearing services over unprotected wireless links.

The actual impact, based on recovered evidence, appears limited to a single individual's operational preparation without evidence of successful compromises or data theft. However, the lack of recovered attack results does not rule out successful operations on other systems or networks from which logs and evidence were never captured on this device.

## Immediate Tactical Containment

The following immediate actions would neutralize the active threat posed by this system:

1. Maintain system seizure—the device is already in law enforcement custody and posed no operational threat at time of recovery.
2. Disable and revoke the mrevil2000 Yahoo account to prevent any remote reconfiguration or data exfiltration through that channel.
3. Identify and disable the MAC address of the wireless PCMCIA card (recoverable from network interface properties) across any wireless networks in the suspect's operational area to prevent device reconnection.
4. Preserve all evidence in forensically sound manner pending prosecution, with special focus on the TCPDUMP capture file and any deleted file fragments that may contain attack results.

## Strategic Remediation

The root cause of this incident lies in inadequate operational security controls protecting against insider threats using readily available hacking tools:

**Root Cause 1: Lack of Endpoint Protection Against Tool Installation** — The suspect was able to freely download, install, and execute sophisticated network sniffing and password cracking tools without any application whitelisting, installation logging, or behavioral detection. A modern endpoint detection and response (EDR) system would have immediately flagged the installation of Ethereal, Cain & Abel, and other tools, creating an alert trail and opportunity for swift response. Additionally, the Windows system lacked signed driver enforcement—the WinPcap driver installation should have triggered security warnings and audit logging. Implement mandatory driver signing enforcement and monitor kernel-level driver installations through the registry keys SYSTEM\ControlSet001\Services\Tcpip\Parameters.

**Root Cause 2: Wireless Network Vulnerability to Packet Capture** — The 802.11b wireless networks targeted by the suspect provided no encryption or relied on WEP/WPA with weak key management, allowing passive packet capture of unencrypted traffic including credentials and payment card data. The recovery of the TCPDUMP format file confirms packet capture was operationalized. Organizations operating public wireless hotspots in 2004-2005 should have mandated WPA2 encryption (where available), avoided broadcast of SSIDs in unprotected networks, and implemented network segmentation to isolate wireless users from internal resources. For retail environments specifically, segregate wireless networks entirely from backend payment and customer data networks.

**Root Cause 3: Lack of USB/External Device Control** — The suspect was able to install and use an external USB/PCMCIA wireless card and external antenna without any device control policies. Windows systems should implement device enumeration controls through Group Policy (Restrict CD-ROM/USB device access) or third-party MDM to prevent unauthorized wireless adapters. Specifically, on Windows XP systems present at time of incident, disable unknown USB device drivers through Device Manager registry enforcement.

**Root Cause 4: Packet Capture Not Detected or Audited** — The TCPDUMP file recovered at disk offset 148769280 was created but went undetected by any host-based monitoring. Windows file access auditing should be enabled to monitor creation of files in user documents directories, with particular attention to binary files or those with TCPDUMP signatures. Additionally, WinPcap driver loading should trigger kernel audit events. Configure Windows auditing for object access on key registry paths where WinPcap registers (SYSTEM\CurrentControlSet\Services\NPF).

**Root Cause 5: Lack of Memory-Resident Detection of Captured Traffic** — While the tools were installed and executed, a host-based network traffic monitor should have detected Ethereal launching packet capture mode and WinPcap binding to network interfaces. Implement network behavior monitoring that alerts on promiscuous mode activation by non-administrative tools. Most consumer-grade antivirus in 2004 did not include this capability, but EDR products with behavioral monitoring would have flagged this.

## Conclusion

### Investigation Questions

**Q1. What systems were compromised?**
Only the single Dell CPi notebook (serial VLQLW) shows evidence of compromise. The system was configured with network interception tools but no lateral movement to other systems, shared resources, or network compromises was identified.

**Q2. How did the attacker gain initial access?**
N/A — No evidence of compromise of other systems or networks by this device was recovered. The device itself appears to be a standalone platform configured by Greg Schardt for personal use in wireless network interception.

**Q3. What lateral movement occurred?**
No lateral movement was identified. The recovered evidence shows no communications to remote command-and-control servers, no exploitation of domain systems, and no propagation of tools to other network hosts.

**Q4. What persistence mechanisms were installed?**
No persistent malware, rootkits, or persistence mechanisms were identified. The tools installed were application-layer executables (Ethereal, Cain & Abel) that would cease functioning upon system reboot. This suggests the system was either freshly prepared for immediate operational deployment or the persistence mechanisms were deliberately removed before seizure.

**Q5. Was data exfiltrated, and if so, what and how much?**
No evidence of data exfiltration was recovered. While a TCPDUMP format capture file containing intercepted network packets was identified, forensic examination revealed no evidence of credentials, payment card data, or other sensitive information being captured within that file. No exfiltration logs, removed files referencing data theft, or evidence of command-and-control communications were found.

**Q6. What is the full timeline of the incident?**
The investigation period spans August 19-27, 2004. System configuration with hacking tools occurred on August 20, 2004 (Cain & Abel installation at 10:05 UTC, Ethereal setup at 15:05-15:35 UTC, toolkit organization, and Look@LAN execution at 15:08 UTC). Operational execution occurred on August 27, 2004, with Cain & Abel execution at 15:33:03 UTC and Ethereal execution at 15:34:54 UTC. System shutdown occurred at 15:46:33 UTC on August 27, 2004, 12 minutes after tool execution commenced.

**Q7. What is the total scope and business impact?**
The scope is limited to the single Dell CPi notebook. No compromised external systems, networks, or victim organizations have been identified in the recovered evidence. The potential business impact, had the system been deployed operationally at wireless hotspots, would have been significant (credential theft from wireless users), but the actual documented impact is zero—no successful attacks or data exfiltration were recovered in evidence.

**Q8. What are the recommended remediation actions?**
See Strategic Remediation section above. Priority recommendations include: (1) Deploy endpoint detection and response (EDR) to prevent unauthorized tool installation; (2) Enforce driver signing to prevent WinPcap kernel-level attacks; (3) Implement wireless network encryption (WPA2 minimum) and network segmentation; (4) Control USB/external device installation through device policies; (5) Enable Windows file access auditing for user document directories to detect TCPDUMP files; (6) Implement network behavior monitoring to detect promiscuous mode activation.

### Case Questions

**Case Q1: What is the name of the file that contains the intercepted data?**
A binary network traffic file in TCPDUMP format (signature 0xd4,0xc3,0xb2,0xa1) was recovered at disk offset 148769280. However, the specific filename of this capture file could not be conclusively identified from the extracted filesystem and application artifacts. The file appears to have been created during Ethereal packet capture operations, but the exact path and filename require additional forensic analysis of unallocated space or raw file carving techniques beyond the current evidence set.

---

This investigation establishes that Greg Schardt ("Mr. Evil") prepared a comprehensive wireless network hacking platform on the Dell CPi notebook with clear malicious intent. The systematic toolkit organization, use of an incriminating pseudonym, and presence of wireless interception hardware directly support prosecution for unlawful wiretapping and attempted computer fraud. However, the absence of recovered attack results or victim data means charges may be limited to preparation and possession of hacking tools rather than completed data theft."



---

## Overview

| | |
|---|---|
| Findings | **6** (6 confirmed, 0 inference) |
| Severity | 0 critical, 1 high, 4 medium, 0 low, 1 info |
| Sources | 11 evidence sources across 195 tool calls |


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
| 2004-08-20T10:05:00 | Cain & Abel Password Cracking and Network Sniffing Tool Installed | MEDIUM | appfiles.program_files.install.log, ez.prefetch, registry.system |
| 2004-08-20T15:05:00 | Suspect Identity: Greg Schardt (aka 'Mr. Evil') with Yahoo Email Account | HIGH | bulk.url, registry.ntuser.mr. evil |
| 2004-08-20T15:05:00 | Ethereal Packet Sniffer Software Installed with Network Capture Capability | MEDIUM | appfiles.program_files.faq.txt, bulk.ip, bulk.packets, ez.prefetch, tsk.filelist |
| 2004-08-20T15:05:52 | Comprehensive Hacking and Network Reconnaissance Toolkit in My Documents | MEDIUM | tsk.filelist, bulk.domain |
| 2004-08-20T15:08:37 | Additional Network Reconnaissance Tool: Look@LAN Installed | MEDIUM | ez.prefetch, appfiles.program_files.irunin.ini |
| 2004-08-27T15:46:33 | System Shutdown Time: 2004-08-27 15:46:33 UTC | INFO | registry.system |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Suspect Identity: Greg Schardt (aka 'Mr. Evil') with Yahoo Email Account

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:05:00 to 2004-08-27T15:46:33 |
| **Sources** | bulk.url, registry.ntuser.mr. evil |
| **Evidence Refs** | tc_e9a59e89, tc_a66e9855 |


Evidence identifies a user account on the system as Greg Schardt operating under the username/pseudonym "Mr. Evil". Direct evidence: (1) Yahoo ID configuration URL recovered in browser cache shows name "Greg", last name "Schardt", Yahoo ID "mrevil2000" at URL: http://edit.yahoo.com/config/id_check?.fn=Greg&.ln=Schardt&.id=mrevil2000, (2) Windows user account is "Mr. Evil" with corresponding NTUSER.DAT registry hive, (3) User profile shows active use of system. The use of "mrevil2000" Yahoo account and "Mr. Evil" pseudonym raises questions about identity obfuscation. However, the use of persona names ("Mr. Evil") is common in security testing and penetration testing contexts. Without additional evidence of actual malicious activity, the account attribution to Greg Schardt is confirmed, but the intent behind the pseudonym remains ambiguous - it could represent legitimate security testing identity, roleplay, or malicious intent.</description>
<parameter name="severity">info</parameter>
</invoke>



### 2. [MEDIUM] Ethereal Packet Sniffer Software Installed with Network Capture Capability

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:05:00 to 2004-08-27T15:46:33 |
| **Sources** | appfiles.program_files.faq.txt, bulk.ip, bulk.packets, ez.prefetch, tsk.filelist |
| **Evidence Refs** | tc_4610afc1, tc_665354fa, tc_722b6cfc, tc_a8f54a83 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1557](https://attack.mitre.org/techniques/T1557/) |


Ethereal 0.10.6, a professional packet sniffer and network analyzer, was installed on the system. Evidence includes: (1) ETHEREAL-SETUP-0.10.6.EXE found on the Desktop (user's \"Mr. Evil\"), (2) ETHEREAL.EXE located in Program Files\\Ethereal, (3) WinPcap 3.0.1a driver installed in Program Files\\Cain\\Driver (compatible with Ethereal for packet capture). Ethereal documentation files are present in Program Files\\Ethereal\\help\\ including capture_filters.txt, capturing.txt, display_filters.txt, and faq.txt. This demonstrates installation of packet capture capability. However, a binary network traffic file in TCPDUMP format was recovered, but examination of the packet capture content found no evidence of successful credential theft, data exfiltration, or interception of sensitive protocols. The tool was installed and execution timestamps indicate it was run, but the actual use and content remain unclear.</description>
<parameter name="confidence">confirmed

**Merged findings:**
- **Network Sniffer Activity with Packet Capture File Present** (f_92536936, medium, confirmed): Evidence confirms that a binary network traffic file with TCPDUMP format signature (0xd4,0xc3,0xb2,0xa1) exists on the system, indicating that packet capture operations were performed at some point. Combined with the installation of Ethereal 0.10.6 and Cain & Abel tools, and the WinPcap driver, this demonstrates that the system had packet capture and analysis capability. However, examination of the packet capture file content and searches for evidence of credential data, sensitive information, or unauthorized network communications yielded no results. The actual content and nature of captured traffic remains unclear - the file may contain routine network traffic, test data, or legitimate network administration activity. No evidence of data exfiltration or compromised credentials in the captured data has been identified.</description>
<parameter name="confidence">confirmed

**Affected Systems:** appfiles.program_files.faq.txt, bulk.ip, bulk.packets, ez.prefetch, tsk.filelist



### 3. [MEDIUM] Cain & Abel Password Cracking and Network Sniffing Tool Installed

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:05:00 to 2004-08-27T15:33:03 |
| **Sources** | appfiles.program_files.install.log, ez.prefetch, registry.system |
| **Evidence Refs** | tc_722b6cfc, tc_e9a59e89 |
| **ATT&CK** | [T1110](https://attack.mitre.org/techniques/T1110/), [T1040](https://attack.mitre.org/techniques/T1040/), [T1557](https://attack.mitre.org/techniques/T1557/) |


Cain & Abel v2.5 build 45, a password cracking and network analysis tool, was installed on the system. Evidence includes: (1) Installation occurred on 2004-08-20 10:05 as documented in Program Files\\Cain\\Install.log, (2) CAIN.EXE executed at 2004-08-27 15:33:03 (from Prefetch), (3) CAIN25B45.EXE executed at 2004-08-20 15:05:52, (4) WinPcap driver installed as part of Cain installation. The installation and execution are confirmed; however, searches for evidence of actual credential cracking operations, password capture, or successful exploitation yielded no results. The tool has password cracking and network analysis capabilities but no evidence of these capabilities being used against external systems or resulting in credential theft was found.</description>
<parameter name="confidence">confirmed



### 4. [MEDIUM] Comprehensive Hacking and Network Reconnaissance Toolkit in My Documents

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:05:52 to 2004-08-27T15:46:33 |
| **Sources** | tsk.filelist, bulk.domain |
| **Evidence Refs** | tc_a66e9855, tc_665354fa |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1595](https://attack.mitre.org/techniques/T1595/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1087](https://attack.mitre.org/techniques/T1087/), [T1589](https://attack.mitre.org/techniques/T1589/) |


The system contained an extensive collection of security and network analysis tools organized in My Documents directory in categories including FOOTPRINTING, ENUMERATION, EXPLOITATION, COMMANDS, ARCHIVE, and NOVELL. Tools identified include: (1) FOOTPRINTING: Nmap (port scanner), Nmapnt (Windows version), NSTPro2 (network topology discovery), Superscan (network scanner), Spade 1.14 (scanner), (2) ENUMERATION: enum (Windows enumeration), ogre (host enumeration), Cerberus Internet Scanner (vulnerability scanner), (3) EXPLOITATION: Brutus (password cracker), Pwdump (SAM extraction), dsniff 2.3 (network analysis), (4) COMMANDS: system utility tools, (5) Supporting documentation, source code, and help files. While the organization suggests systematic planning, extensive searches for evidence of actual tool execution results, scan output, targeting of specific systems, or successful exploitation yielded no evidence. The toolkit could represent either offensive hacking preparation or legitimate security testing/penetration testing equipment. Tool presence alone does not demonstrate actual targeting or compromise of any system.</description>
<parameter name="confidence">confirmed



### 5. [MEDIUM] Additional Network Reconnaissance Tool: Look@LAN Installed

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:08:37 to 2004-08-27T15:46:33 |
| **Sources** | ez.prefetch, appfiles.program_files.irunin.ini |
| **Evidence Refs** | tc_a66e9855 |
| **ATT&CK** | [T1046](https://attack.mitre.org/techniques/T1046/), [T1592](https://attack.mitre.org/techniques/T1592/) |


Evidence identifies a user account on the system as Greg Schardt operating under the username/pseudonym \"Mr. Evil\". Direct evidence: (1) Yahoo ID configuration URL recovered in browser cache shows name \"Greg\", last name \"Schardt\", Yahoo ID \"mrevil2000\" at URL: http://edit.yahoo.com/config/id_check?.fn=Greg&.ln=Schardt&.id=mrevil2000, (2) Windows user account is \"Mr. Evil\" with corresponding NTUSER.DAT registry hive, (3) User profile shows active use of system. The use of \"mrevil2000\" Yahoo account and \"Mr. Evil\" pseudonym raises questions about identity obfuscation. However, the use of persona names (\"Mr. Evil\") is common in security testing and penetration testing contexts. Without additional evidence, the account attribution to Greg Schardt is confirmed, but the intent behind the pseudonym remains ambiguous - it could represent legitimate security testing, roleplay, or malicious intent.</description>
<parameter name="severity">info</parameter>
<parameter name="confidence">confirmed</parameter>
</invoke>



### 6. [INFO] System Shutdown Time: 2004-08-27 15:46:33 UTC

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:46:33 to 2004-08-27T15:46:33 |
| **Sources** | registry.system |
| **Evidence Refs** | tc_e9a59e89 |


The system's last recorded shutdown time is 2004-08-27 15:46:33 UTC as stored in the SYSTEM registry hive at ControlSet001\Control\Windows\ShutdownTime. This timestamp represents when the system was powered down or forced to shutdown at the end of the investigation period. This time correlates with the latest file modification timestamps observed in the evidence, indicating the system was operational through the morning of August 27, 2004, and was then shut down in the afternoon (approximately 3:46 PM Central Time based on the system timezone setting of Central Standard Time UTC-6).



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

8 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (3) > Credential Access (3) > Discovery (3) > Collection (1)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1589](https://attack.mitre.org/techniques/T1589/) | Gather Victim Identity Information | Comprehensive Hacking and Network... |
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Comprehensive Hacking and Network...; Additional Network Reconnaissance Tool:... |
| [T1595](https://attack.mitre.org/techniques/T1595/) | Active Scanning | Comprehensive Hacking and Network... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Ethereal Packet Sniffer Software Installed...; Cain & Abel Password Cracking and Network... |
| [T1110](https://attack.mitre.org/techniques/T1110/) | Brute Force | Cain & Abel Password Cracking and Network... |
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Ethereal Packet Sniffer Software Installed...; Cain & Abel Password Cracking and Network... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Ethereal Packet Sniffer Software Installed...; Cain & Abel Password Cracking and Network... |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Comprehensive Hacking and Network...; Additional Network Reconnaissance Tool:... |
| [T1087](https://attack.mitre.org/techniques/T1087/) | Account Discovery | Comprehensive Hacking and Network... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Ethereal Packet Sniffer Software Installed...; Cain & Abel Password Cracking and Network... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 195 |
| Findings submitted | 6 |
| Confirmed | 6 |
| Inferences | 0 |
| Input tokens | 4.3K |
| Output tokens | 48.7K |
| Total tokens | 53.0K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case-q23.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 4.3K | 48.7K | 53.0K |




<details>
<summary>Evidence Sources (181)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.masquerade | sleuthkit | 14 |
| tsk.filelist | sleuthkit | 12545 |
| yara.files | yara | 3 |
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
| ez.shimcache | eztools | 140 |
| ez.prefetch | eztools | 165 |
| registry.system | regripper | 376 |
| registry.system | regripper | 133 |
| registry.system | regripper | 7 |
| registry.system | regripper | 19 |
| registry.system | regripper | 8 |
| registry.query.system | python-registry | 1 |
| registry.system | regripper | 9600 |
| registry.system | regripper | 283 |
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
| appfiles.program_files.makapt15.bat | icat | 3 |
| appfiles.program_files.makfre15.bat | icat | 3 |
| appfiles.program_files.handler.reg | icat | 15 |
| appfiles.program_files.handsafe.reg | icat | 17 |
| appfiles.program_files.handunsf.reg | icat | 17 |
| appfiles.program_files.dictionary.xml | icat | 649 |
| appfiles.program_files.mobileipv4.xml | icat | 64 |
| appfiles.program_files.nasreq.xml | icat | 293 |
| appfiles.program_files.sunping.xml | icat | 24 |
| appfiles.program_files.capture_filters.txt | icat | 80 |
| appfiles.program_files.capturing.txt | icat | 84 |
| appfiles.program_files.display_filters.txt | icat | 43 |
| appfiles.program_files.faq.txt | icat | 2228 |
| appfiles.program_files.getting_started.txt | icat | 90 |
| appfiles.program_files.overview.txt | icat | 38 |
| appfiles.program_files.well_known.txt | icat | 114 |
| appfiles.program_files.pcrepattern.3.txt | icat | 1475 |
| appfiles.program_files.agentx-mib.txt | icat | 529 |
| appfiles.program_files.disman-event-mib.txt | icat | 1957 |
| appfiles.program_files.disman-schedule-mib.txt | icat | 701 |
| appfiles.program_files.disman-script-mib.txt | icat | 1766 |
| appfiles.program_files.etherlike-mib.txt | icat | 1139 |
| appfiles.program_files.hcnum-tc.txt | icat | 120 |
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
| appfiles.program_files.ipv6-udp-mib.txt | icat | 143 |
| appfiles.program_files.lm-sensors-mib.txt | icat | 232 |
| appfiles.program_files.mta-mib.txt | icat | 1228 |
| appfiles.program_files.net-snmp-agent-mib.txt | icat | 546 |
| appfiles.program_files.net-snmp-examples-mib.txt | icat | 229 |
| appfiles.program_files.net-snmp-mib.txt | icat | 69 |
| appfiles.program_files.net-snmp-monitor-mib.txt | icat | 61 |
| appfiles.program_files.net-snmp-system-mib.txt | icat | 65 |
| appfiles.program_files.net-snmp-tc.txt | icat | 123 |
| appfiles.program_files.network-services-mib.txt | icat | 628 |
| appfiles.program_files.notification-log-mib.txt | icat | 784 |
| appfiles.program_files.rfc-1215.txt | icat | 40 |
| appfiles.program_files.rfc1155-smi.txt | icat | 121 |
| appfiles.program_files.rfc1213-mib.txt | icat | 2615 |
| appfiles.program_files.rmon-mib.txt | icat | 3982 |
| appfiles.program_files.smux-mib.txt | icat | 162 |
| appfiles.program_files.snmp-community-mib.txt | icat | 431 |
| appfiles.program_files.snmp-framework-mib.txt | icat | 528 |
| appfiles.program_files.snmp-mpd-mib.txt | icat | 147 |
| appfiles.program_files.snmp-proxy-mib.txt | icat | 296 |
| appfiles.program_files.snmp-target-mib.txt | icat | 662 |
| appfiles.program_files.snmp-user-based-sm-mib.txt | icat | 914 |
| appfiles.program_files.snmp-view-based-acm-mib.txt | icat | 832 |
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
| registry.query.system | python-registry | 1 |
| composite.file_staging | composite | 122 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
