# Mulder Investigation Report

**Case:** nist-hacking-case-q23
**Generated:** 2026-11-14T05:35:17.231690+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 186 evidence sources (18 disk, 168 other) | 135 tool calls | 12 minutes
**Results:** 7 findings | 3 confirmed, 4 inference
**Timeline:** 2004-08-19 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-20 to 2004-08-27): Security Tool Collection in My Documents (Organized for Training or Authorized Testing) (+5 related)
- **Persistence** (2004-08-19): User Identity Confirmed as "Mr. Evil"

**Tools:** search (40), submit_finding (7), update_finding (7), open_case (6), get_investigation_summary (6). SHA-256 hashes recorded for all evidence.



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

135 tool calls were executed across 6
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

## Background

This investigation concerns a Dell Latitude CPi notebook computer (serial # VLQLW) that was abandoned on September 20, 2004, along with a wireless PCMCIA card and homemade 802.11b antenna. The device is suspected of being used for hacking purposes, particularly for intercepting wireless internet traffic at public WiFi hotspots such as Starbucks and T-Mobile access points. The investigation seeks to establish whether the computer was used to conduct network reconnaissance or traffic interception attacks, and to determine if it can be linked to the suspect Greg Schardt, who operates under the online alias "Mr. Evil."

The forensic examination of the system recovered 6 distinct evidence sources through comprehensive disk analysis, registry examination, and metadata extraction. The investigation identified 7 findings spanning user identification, software installation history, tool execution logs, and network access patterns. The system is running Windows XP with evidence of administrative account activity and multiple user profiles configured for various applications.

## Incident Timeline

**August 19, 2004**: System initialization and account setup. Registry timestamps show the creation of the "Mr. Evil" user account at 23:04:14 UTC on August 19, 2004. This account becomes the primary evidence of user identity on the device, with registry entries from NTUSER.DAT showing user profile initialization in the Documents and Settings directory.

**August 20, 2004**: Batch software installation phase. Between 10:05 and 10:12 UTC, a coordinated installation of multiple security and network analysis tools occurred from a pre-staged location at D:\Drivers\. The installation sequence completed within seven minutes:
- Cain & Abel v2.5 installed at 10:05 from D:\Drivers\Cain & Abel\cain25b45.exe
- Forté Agent 1.9 email client installed at 10:08 from D:\Drivers\Forte Agent\a32-19.exe
- CuteFTP installed at 10:08 from D:\Drivers\FTP\cute3032.exe
- 123 WASP password recovery tool installed at 10:12 from D:\Drivers\Password recovery\123wasp_setup.exe

This rapid, sequential installation pattern from a single pre-staged source directory differs markedly from opportunistic tool acquisition and suggests either planned security testing or deliberate preparation of a pre-configured toolkit. WinPcap network packet capture driver was also installed during this window (08:20/10:06:18 UTC), a prerequisite for packet sniffing functionality.

**August 25-26, 2004**: Network resource access. On August 25 at 15:55:36 UTC, Forté Agent 1.9 executed—the email and newsreader client installed on August 20. Prefetch records indicate it performed normal client operations. On August 26 at 15:05:15 UTC, Telnet.exe execution was recorded in the system prefetch cache. While telnet is a legacy protocol for remote terminal access, no evidence of actual successful connections or credential transmission was found in network logs or temporary files. The primary evidence of network activity consists of Windows explorer shortcuts in the "NetHood" folder pointing to network resources on a system named "Andrews-1" (specifically \\ANDREWS-1\HPLaserJ printer and CD Drive mappings), suggesting routine local network browsing rather than unauthorized lateral movement.

**August 27, 2004**: Tool execution phase and system abandonment timeline. Between 15:11 and 15:34 UTC, multiple previously-installed tools were executed in rapid succession:
- NetStumbler wireless network scanner downloaded and executed at 15:11-15:12 UTC (netstumblerinstaller_0_4_0.exe execution recorded)
- Cain & Abel re-executed at 15:33:03 UTC (second run since installation)
- Ethereal v0.10.6 packet analysis tool executed at 15:34:54 UTC

Despite this execution activity, the critical absence of captured packet files (.pcap, .cap, .dump formats) in the default Ethereal save locations (My Documents, Desktop, temporary directories) indicates that either (1) Ethereal was executed for configuration or testing purposes only, or (2) any captured traffic was subsequently deleted or archived to external media. The Ethereal installation includes standard GTK GUI libraries, SNMP MIB documentation, and protocol plugins—consistent with a complete installation rather than a stripped-down attack tool, supporting the testing hypothesis.

Bulk extractor forensic carving identified references to wardriving.com and netstumbler.com websites in recovered data, with instances of "Mr. Evil@" prefixes associated with these URLs, confirming the system user's interest in WiFi network mapping and discovery tools. These references suggest familiarity with public wardrive databases and community tools for wireless network analysis.

## Key Findings

**User Identity Confirmation**: The system primary user account is definitively identified as "Mr. Evil," established through multiple independent registry data sources including NTUSER.DAT hive entries, RecentDocs collections, and UserAssist activity tracking. This username directly correlates the physical device to the online alias attributed to suspect Greg Schardt. Multiple bulk extractor domain carving results recovered references to "Mr. Evil@wardriving.com" and "Mr. Evil@netstumbler.com," confirming explicit engagement with wireless network scanning communities.

**Ethereal/Wireshark Network Sniffing Tool**: Ethereal version 0.10.6 is installed at C:\Program Files\Ethereal\ with installation records dating to August 20, 2004. Execution is confirmed via Windows prefetch data showing ETHEREAL.EXE launched at 15:34:54 UTC on August 27. However, a critical evidentiary gap exists: **no captured packet files were recovered in any default save location**. Ethereal's standard configuration saves packet captures to the user's My Documents directory by default; the complete absence of .pcap, .cap, or .dump files—despite comprehensive file system recovery—indicates either no packets were actively captured, or any captures were deleted or moved to external storage. The installation includes 68 files typical of standard Ethereal deployment (GTK libraries, SNMP MIB documentation, protocol plugins), not indicative of attack customization.

**Network Reconnaissance Tool Collection**: My Documents directory contains an organized collection of network analysis and password-related tools stored in categorized subdirectories (ARCHIVE, ENUMERATION, EXPLOITATION, FOOTPRINTING, NOVELL). Included tools encompass dsniff 2.3 (ARP spoofing and credential capture), Pwdump3 (Windows password hash extraction), Brutus (password brute-forcing), Nmap (port scanning), NSTPro2 (network topology scanning), SuperScan (multi-function network scanner), and SPADE vulnerability assessment tool. While each tool possesses documented exploit capabilities, their presence in an organized educational directory structure—alongside source code, documentation files, and README materials—suggests legitimate penetration testing preparation or security research environment rather than active attack staging. Significantly, no output files, captured credentials, or successful attack indicators were found to show these tools were actually used against external targets.

**Cain & Abel Execution and ARP Poisoning**: Prefetch records document two separate Cain installations: initial installation on August 20 at 10:05:52 UTC, and subsequent execution instances on August 20 at 15:05:52 UTC and August 27 at 15:33:03 UTC (with two run counts recorded). Cain is documented to perform ARP cache poisoning, session hijacking, and password capture functions. However, no evidence exists of actual attack results: no ARP poisoning output files, captured session data, or password dumps were recovered from the file system or registry. The 7-day gap between installation and re-execution (consistent with pre-staged tools awaiting planned testing) differs from the rapid execution pattern expected of active attacks. Presence of the tool alone does not establish that malicious network interception actually occurred.

**NetStumbler WiFi Scanning**: NetStumbler (Network Stumbler) wireless network discovery tool was installed at C:\Program Files\Network Stumbler\ with original installation dating to April 21, 2004, with final modification on August 27, 2004 at 15:12:35 UTC. Prefetch data confirms NETSTUMBLER.EXE execution on August 27 at 15:12:35 UTC. The installer file (netstumblerinstaller_0_4_0.exe) was recovered from the Desktop with download timestamp of August 27 at 15:11:07 UTC. Bulk extractor domain carving confirms user "Mr. Evil" visited www.netstumbler.com and www.wardriving.com, demonstrating active engagement with the wireless network mapping community. While NetStumbler is designed for WiFi network discovery and site surveying, no captured WiFi network maps, geolocation data, or access point database files were recovered, limiting assessment to confirmed tool presence and execution rather than confirmed wardriving attack data collection.

**Batch Tool Installation Pattern**: Contrary to an initial interpretation of progressive attack preparation escalating from August 15-27, forensic analysis reveals a different operational pattern: coordinated batch installation of multiple security tools from a single pre-staged repository location (D:\Drivers\) occurring within a 7-minute window on August 20, 2004. This installation window encompassed Cain & Abel, Forté Agent, CuteFTP, and 123 WASP password recovery tools, all completed between 10:05 and 10:12 UTC. The seven-day dormancy period (August 20-27) followed by simultaneous execution of multiple tools (NetStumbler, Cain, Ethereal) on August 27 is more consistent with a planned testing environment or pre-configured security toolkit staged for educational or authorized penetration testing purposes, rather than spontaneous attack preparation. The presence of installation source files (ETHEREAL-SETUP-0.10.6.EXE on Desktop, netstumblerinstaller on Desktop) further supports this staging hypothesis.

**Network Access and Local Resources**: Registry entries and file system evidence show the "Mr. Evil" user accessed network resources including shared folders and printers on a system identified as "Andrews-1" (\\ANDREWS-1\HPLaserJ printer and CD Drive F: mappings visible in NetHood shortcuts). Telnet.exe execution was recorded in prefetch logs on August 26, 2004. However, no evidence of actual successful unauthorized connections, credential compromise, or lateral movement to the Andrews-1 system was found. The shortcuts and resource mappings indicate routine network browsing consistent with normal Windows workgroup or domain access rather than attack-related lateral movement.

## Threat Intelligence and Attribution

The evidence pattern presents a forensic puzzle: a system configured with the online identity "Mr. Evil" contains a comprehensive collection of network reconnaissance and password attack tools, correlated with internet references to wardrive mapping and WiFi hacking communities. Yet the absence of output artifacts—no captured traffic files, no extracted credentials, no evidence of successful attacks—prevents definitive attribution of active malicious conduct.

The tool collection and installation pattern are consistent with **either** (1) a security professional or penetration tester conducting authorized testing with pre-staged tools, or (2) a less sophisticated attacker preparing for attacks who was interdicted before execution of a data theft or network breach campaign. The batch installation methodology differs from typical "attack kit" assembly and suggests deliberate preparation in a controlled environment rather than ad-hoc tool acquisition during active intrusion. The presence of source code, documentation, and README files alongside executable tools is atypical of minimalist attack staging.

The recovered internet references to "Mr. Evil@wardriving.com" and community participation in WiFi mapping activities establish the system user's documented interest in wireless network reconnaissance techniques. The specific deployment of NetStumbler and Ethereal—tools designed for WiFi discovery and wireless traffic analysis—is consistent with preparation for wireless eavesdropping attacks on open WiFi networks. However, the seven-day gap between tool installation and execution, the retention of full tool installations rather than obfuscation or deletion, and the complete absence of captured traffic data all argue against active attack execution.

**Attribution confidence**: Medium. The "Mr. Evil" alias directly correlates the device to suspect Greg Schardt based on online identity corroboration. However, the shift from suspected active hacking to observed tools-in-preparation without evidence of execution success suggests either (1) the suspect was prevented from conducting attacks, (2) the computer was staged for future testing and abandoned before use, or (3) attacks occurred but all evidence was successfully wiped before abandonment.

## Impact Assessment

**Scope**: The investigation is confined to analysis of a single endpoint device (Dell CPi notebook). No compromise of other systems has been definitively established, though the presence of network shortcuts to Andrews-1 suggests at minimum network visibility to one additional system.

**Data at Risk**: If wireless traffic interception attacks had been successfully executed (as the Ethereal and Cain installations suggest was intended), the captured packets would potentially contain unencrypted passwords, session tokens, email contents, and web traffic from multiple victims at public WiFi hotspots. The scope of such attacks would encompass any individual using the same WiFi networks during the interception window—potentially dozens to hundreds of people depending on hotspot location and frequency of use.

**Evidence of Data Exfiltration**: No recovered files or logs indicate successful data exfiltration. No credential output files, packet capture files, or reconnaissance reports were found. The absence of these artifacts does not prove attacks did not occur—it proves either they did not occur, or evidence was successfully deleted.

**Credential Exposure**: No evidence that system credentials or passwords on the Dell CPi were compromised. The "Mr. Evil" account itself represents no verified compromise risk unless the system was controlled by an unauthorized party, which the consistent user alias suggests was not the case.

**Persistence**: No rootkits, backdoors, or persistence mechanisms (e.g., scheduled tasks, registry run keys, service installations) were identified. The tools remain resident but dormant rather than actively establishing permanent access.

## Immediate Tactical Containment

1. **Isolate the Dell CPi from all networks** (both wireless and wired) to prevent any dormant attack code from contacting command infrastructure or resuming active packet capture.

2. **Disable the wireless PCMCIA card and 802.11b antenna** found with the device to eliminate wireless interception capability.

3. **Identify all systems named "Andrews-1" on the network** referenced in the device's NetHood shortcuts (\\ANDREWS-1\HPLaserJ, CD Drive F:). If located, audit for unauthorized access attempts and verify credential integrity on network-connected printers and systems.

4. **Search for and secure any external media** (USB drives, external hard drives, CDs/DVDs) that may contain:
   - Ethereal/Wireshark capture files (.pcap, .cap, .dump)
   - Exported password lists from Cain & Abel
   - NetStumbler wireless network maps or GPS data
   - Any files dated August 20-27, 2004

5. **Preserve the Dell CPi as evidence**—perform bit-level forensic imaging if not already completed, and maintain chain of custody for legal proceedings.

6. **Notify owners of any public WiFi hotspots** (Starbucks, T-Mobile locations) where this device may have operated during the August 20-27 window, as wireless users of those networks may have been targeted for credential interception.

## Strategic Remediation

**Root Cause 1 — Inadequate WiFi Security at Public Hotspots**: The device demonstrates capability to execute Ethereal packet sniffing on unencrypted wireless networks. Public WiFi providers using WEP encryption (if any) or no encryption should immediately upgrade to WPA2 or WPA3 with pre-shared key authentication. Public hotspots should deploy SSL/TLS enforcement and consider rogue access point detection to prevent attackers from establishing competing networks for credential capture. Finding reference: NetStumbler execution and Ethereal installation (T1592.004, T1040, MITRE ATT&CK).

**Root Cause 2 — User Credential Vulnerability on Public Networks**: The presence of Cain & Abel and WinPcap driver indicates preparation for ARP spoofing and session hijacking attacks. Individual users connecting to public WiFi should be advised that credentials transmitted over unencrypted HTTP or unsecured protocols are vulnerable to capture. Organizations should mandate use of Virtual Private Networks (VPNs) for all remote access and enforce TLS/SSL for all authentication. Finding reference: Cain & Abel execution and ARP poisoning capability identification (T1040, T1557.002).

**Root Cause 3 — Absence of Endpoint Detection on Prepared Attack Tools**: The system allowed installation of packet capture tools (Ethereal, WinPcap, Cain & Abel) without alerting administrators or users. Organizations should deploy endpoint protection software (antivirus, anti-malware, application whitelisting) that flags installation of known packet capture and network sniffing tools, particularly when installed from removable media or non-standard locations. WinPcap and raw socket APIs should be restricted to system administrators and whitelisted applications. Finding reference: Batch tool installation from D:\Drivers\ pre-staged location (T1046, T1040).

**Root Cause 4 — Insecure Physical Security of Mobile Devices**: The device's discovery as abandoned equipment suggests inadequate corporate asset tracking and endpoint loss prevention. Organizations should deploy Mobile Device Management (MDM) solutions with remote wipe capabilities, Full Disk Encryption (FDE) on all laptops, and GPS tracking on high-risk endpoints. The presence of wireless network tools and Internet references to hacking communities on a corporate or personally-owned device should trigger enhanced network segmentation and device isolation protocols. Finding reference: Device abandonment and lack of evidence of attempt to remotely disable or wipe device.

**Root Cause 5 — Insufficient Network Segmentation for Devices with Network Tools**: The Dell CPi had unrestricted access to the Andrews-1 system and local network resources despite housing network reconnaissance tools. Zero-trust network architecture should isolate systems containing penetration testing or security analysis tools into dedicated VLAN segments without access to production systems unless explicitly authorized and time-bounded. Network Access Control (NAC) should prevent devices with specific risky tool signatures from connecting to the primary network. Finding reference: Network shortcuts to Andrews-1 system despite tool collection (T1021, T1046).

## Conclusion

**Q1. What systems were compromised?** The Dell Latitude CPi notebook (serial # VLQLW) is the sole system definitively confirmed as the focus of this investigation. No evidence of successful compromise of other systems (such as Andrews-1) was found, though network visibility to external systems is established.

**Q2. How did the attacker gain initial access?** This question is not directly applicable to the investigation scope, as the Dell CPi itself is not being analyzed as a compromised victim, but rather as a suspected attack platform. The system was obtained by the suspect and configured with the "Mr. Evil" user account, but no evidence of initial compromise of the device itself was found.

**Q3. What lateral movement occurred?** Limited evidence of lateral movement. The system contains network shortcuts to Andrews-1 and Telnet.exe execution is recorded, but no evidence of successful unauthorized access to remote systems was found. Network access patterns suggest routine local browsing rather than attack-related lateral movement.

**Q4. What persistence mechanisms were installed?** No persistent backdoors, rootkits, or scheduled attack tasks were identified. Tools remain resident on the system but dormant. No evidence of registry run keys, scheduled tasks, or service modifications to establish automatic re-execution of malicious tools was found.

**Q5. Was data exfiltrated, and if so, what and how much?** No evidence of successful data exfiltration from other systems was found. However, the **critical question specific to this case is whether the Dell CPi captured intercepted data from public WiFi networks**: **No captured packet files (.pcap, .cap, .dump) were recovered from any location on the system despite Ethereal and WinPcap installation and execution.** If packet captures occurred, they were either deleted, stored on external media, or never actually executed despite tool installation. No exfiltrated credentials, password hashes, or reconnaissance reports from successful attacks were recovered.

**Q6. What is the full timeline of the incident?** System activity spans August 19-27, 2004. User account creation on August 19 at 23:04 UTC; batch tool installation August 20 at 10:05-10:12 UTC; network access and tool testing August 25-27; execution of packet capture and WiFi scanning tools August 27 at 15:11-15:34 UTC. Device abandoned September 20, 2004.

**Q7. What is the total scope and business impact?** Single endpoint device suspected of preparation for wireless traffic interception attacks at public WiFi hotspots. If attacks had been successfully executed, potential impact would include credential compromise and data exposure for any users of those WiFi networks during tool execution. No confirmed successful attacks, data theft, or downstream system compromise was established. Business impact is confined to investigation costs and potential notification to affected WiFi providers and users.

**Q8. What are the recommended remediation actions?** (1) Isolate device from networks and disable wireless hardware; (2) Audit Andrews-1 system for unauthorized access; (3) Upgrade public WiFi security to WPA2/WPA3 with enforcement; (4) Implement user VPN requirements for public network access; (5) Deploy endpoint detection to flag packet capture tool installation; (6) Establish secure mobile device tracking and remote wipe capabilities; (7) Implement network segmentation to isolate systems with security/hacking tools.

---

## Case Questions

**Case Q1:** Ethereal, a popular "sniffing" program that can be used to intercept wired and wireless internet packets was also found to be installed. When TCP packets are collected and re-assembled, the default save directory is that users \My Documents directory. What is the name of the file that contains the intercepted data?

**Answer:** No captured packet files were found in the My Documents directory, Desktop, or any other default location on the system. Ethereal v0.10.6 is confirmed installed at C:\Program Files\Ethereal\ and executed on August 27, 2004 at 15:34:54 UTC, but no .pcap, .cap, .dump, or other packet capture files containing intercepted data were recovered during forensic analysis. The absence of captured data files indicates either (1) Ethereal was executed for testing/configuration purposes without capturing actual network traffic, or (2) any captured files were deleted or stored on external media not recovered during the investigation. Therefore, the specific filename requested cannot be provided, as no captured packet file evidence exists in the recovered file system.


---

## Overview

| | |
|---|---|
| Findings | **7** (3 confirmed, 4 inference) |
| Severity | 0 critical, 0 high, 5 medium, 2 low, 0 info |
| Sources | 6 evidence sources across 135 tool calls |


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
| 2004-08-19T23:04:14 | User Identity Confirmed as "Mr. Evil" | MEDIUM | registry.ntuser.mr. evil, bulk.domain, tsk.filelist |
| 2004-08-20T15:05:52 | Security Tool Collection in My Documents (Organized for Training or Authorized Testing) | MEDIUM | tsk.filelist, bulk.domain |
| 2004-08-20T15:05:52 | Cain Tool Execution with Unclear Attack Intent (No Evidence of Actual Credential Capture) | MEDIUM | ez.prefetch |
| 2004-08-20T15:05:52 | Batch Tool Installation from D:\Drivers\ on August 20, 2004, NOT Progressive Attack Sequence | LOW | ez.prefetch |
| 2004-08-25T15:55:36 | Network Access via Windows Explorer and Shared Folder Shortcuts (Likely Legitimate) | LOW | registry.software, registry.ntuser.mr. evil, tsk.filelist |
| 2004-08-27T15:11:07 | NetStumbler WiFi Scanning Tool Installed and Executed | MEDIUM | registry.system, ez.prefetch, bulk.domain |
| 2004-08-27T15:34:54 | Ethereal/Wireshark Execution Recorded (No Evidence of Captured Packet Files) | MEDIUM | ez.prefetch, bulk.domain, tsk.filelist |





---

## Appendix A: Verified Forensic Findings


### 1. [MEDIUM] User Identity Confirmed as "Mr. Evil"

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T23:04:14 to 2004-08-27T15:46:27 |
| **Sources** | registry.ntuser.mr. evil, bulk.domain, tsk.filelist |
| **Evidence Refs** | tc_ec802512, tc_bd87957a, tc_79b99f16 |


The system primary user account is named "Mr. Evil" with registry data showing this username in multiple locations including NTUSER.DAT registry hive, RecentDocs, and UserAssist entries. Multiple bulk extractor domain carving results show "Mr. Evil@" references to wardriving.com and netstumbler.com websites, confirming user involvement with wireless network scanning and hacking tool websites.



### 2. [MEDIUM] Ethereal/Wireshark Execution Recorded (No Evidence of Captured Packet Files)

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-27T15:34:54 |
| **Sources** | ez.prefetch, bulk.domain, tsk.filelist |
| **Evidence Refs** | tc_11c7449d, tc_273daed3, tc_de1a093c |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/) |


Ethereal v0.10.6 is installed at C:\\Program Files\\Ethereal\\ and prefetch data shows ETHEREAL.EXE executed at 2004-08-27 15:34:54. However, counter-evidence suggests this may be legitimate use: (1) 68 Ethereal files in Program Files directory include standard GTK libraries, SNMP MIB documentation files, and plugins - typical of standard installation, not malicious packet capture setup, (2) ETHEREAL-SETUP-0.10.6.EXE on Desktop reflects normal software installation pattern, NOT evidence of active attacks, (3) CRITICAL: No evidence of actual captured packet files (.pcap, .cap, .dump files) found in My Documents, Desktop, or temp directories - if this tool was actively used for network reconnaissance, packet captures should be present, (4) Tool installation on 08/20 from pre-staged location and execution on 08/27 is consistent with testing environment rather than active attack timeline. Tool execution alone does not confirm malicious packet sniffing without evidence of captured traffic files or active network sniffing activity.",



### 3. [MEDIUM] Security Tool Collection in My Documents (Organized for Training or Authorized Testing)

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:05:52 to 2004-08-27T15:12:35 |
| **Sources** | tsk.filelist, bulk.domain |
| **Evidence Refs** | tc_bd87957a, tc_f4c1b9f6 |
| **ATT&CK** | [T1046](https://attack.mitre.org/techniques/T1046/), [T1040](https://attack.mitre.org/techniques/T1040/), [T1021](https://attack.mitre.org/techniques/T1021/) |


My Documents directory contains well-organized collection of network security tools, but context suggests legitimate educational or authorized testing purpose rather than malicious preparation: (1) Organized directory structure with ARCHIVE, ENUMERATION, EXPLOITATION, FOOTPRINTING folders - consistent with training materials, (2) Includes source code (e.g., Nmap source), documentation files, and README files alongside tools - unusual for actual attack preparation, (3) Presence of tools (dsniff 2.3, Pwdump3, Brutus, Nmap, NSTPro2, SuperScan, SPADE, Cerberus scanner) indicates network reconnaissance and password-related capabilities, (4) File modification dates range 2004-08-20 15:05:52 to 2004-08-27 15:12:35, coinciding with batch installation from D:\Drivers\ pre-staged location. While tools have known exploit capabilities, their presence alone does not confirm malicious intent without evidence of actual successful attacks, credential compromises, or data exfiltration. Pattern is consistent with penetration testing setup or security research environment.",



### 4. [MEDIUM] Cain Tool Execution with Unclear Attack Intent (No Evidence of Actual Credential Capture)

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:05:52 to 2004-08-27T15:33:03 |
| **Sources** | ez.prefetch |
| **Evidence Refs** | tc_bd87957a, tc_273daed3 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1110](https://attack.mitre.org/techniques/T1110/) |


Prefetch records show Cain v2.5 execution: CAIN25B45.EXE on 2004-08-20 15:05:52 and CAIN.EXE on 2004-08-27 15:33:03 (2 run counts); WinPcap driver (WINPCA~1.EXE) executed 2004-08-20 15:06:18. However, COUNTER-EVIDENCE limits severity assessment: (1) No evidence of actual captured credentials in file system or registry, (2) No evidence of ARP poisoning output files, session captures, or password dumps, (3) Cain installation from pre-staged D:\Drivers\ location on 2004-08-20 10:05 suggests planned testing environment rather than spontaneous attack preparation, (4) 7-day gap between installation and final execution suggests either dormant tool staging or scheduled testing, not active attack progression. While Cain's documented capabilities include ARP poisoning and password cracking, tool presence and execution alone do not confirm actual use for malicious attacks without evidence of attack results or network traffic showing session interception.",



### 5. [MEDIUM] NetStumbler WiFi Scanning Tool Installed and Executed

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:11:07 to 2004-08-27T15:12:35 |
| **Sources** | registry.system, ez.prefetch, bulk.domain |
| **Evidence Refs** | tc_bd87957a, tc_273daed3, tc_0fc33eb2 |
| **ATT&CK** | [T1592.004](https://attack.mitre.org/techniques/T1592/004/) |


NetStumbler (Network Stumbler) wireless network scanning tool was installed at C:\\Program Files\\Network Stumbler\\ with original installation date of 2004-04-21 07:16:58 and last modified 2004-08-27 15:12:35. Prefetch data confirms NETSTUMBLER.EXE execution on 2004-08-27 15:12:35 with 1 run count. Installation file (netstumblerinstaller_0_4_0.exe) was present on Desktop, downloaded 2004-08-27 15:11:07. Bulk extractor carving shows user visited www.netstumbler.com and www.wardriving.com with username \"Mr. Evil\". While NetStumbler is a wireless network discovery tool capable of mapping WiFi networks, execution alone does not confirm actual wardriving attacks without evidence of captured WiFi network data, maps, or related findings. Tool presence is consistent with network reconnaissance capability but execution may also represent testing or routine network analysis.\",



### 6. [LOW] Batch Tool Installation from D:\Drivers\ on August 20, 2004, NOT Progressive Attack Sequence

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:05:52 to 2004-08-27T15:34:54 |
| **Sources** | ez.prefetch |
| **Evidence Refs** | tc_273daed3 |
| **ATT&CK** | [T1046](https://attack.mitre.org/techniques/T1046/), [T1040](https://attack.mitre.org/techniques/T1040/), [T1592.004](https://attack.mitre.org/techniques/T1592/004/), [T1557.002](https://attack.mitre.org/techniques/T1557/002/) |


CORRECTION TO PRIOR ANALYSIS: Evidence shows tools were NOT installed in a progressive attack sequence from Aug 15-27, but rather BATCH INSTALLED on a single date with a 7-day execution gap. Installation logs confirm: (1) Forté Agent 1.9 installed 08/20/2004 10:08 from D:\Drivers\Forte Agent\a32-19.exe, (2) Cain & Abel v2.5 installed 08/20/04 10:05 from D:\Drivers\Cain & Abel\cain25b45.exe, (3) CuteFTP installed 08/20/2004 10:08 from D:\Drivers\FTP\cute3032.exe, (4) 123 WASP installed 08/20/2004 10:12 from D:\Drivers\Password recovery\123wasp_setup.exe. All installations completed within 7 minutes (10:05-10:12) during a single session from pre-staged D:\Drivers\ source. Tools remained dormant for 7 days until execution spike on 08/27/2004 (Cain/NetStumbler/Ethereal). This pattern is more consistent with legitimate pre-staged security testing tools or systems administration setup than with a spontaneous attack preparation. The initial characterization as an 'escalating attack timeline' overstates the threat profile.",



### 7. [LOW] Network Access via Windows Explorer and Shared Folder Shortcuts (Likely Legitimate)

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-25T15:55:36 to 2004-08-26T15:08:14 |
| **Sources** | registry.software, registry.ntuser.mr. evil, tsk.filelist |
| **Evidence Refs** | tc_135d4797 |


Registry evidence shows user accessed network resources including shortcuts in NetHood folder pointing to Andrews-1 system. However, critical correction: Agent.EXE (executed 2004-08-25 15:55:36) is NOT an attack tool but Forté Agent 1.9, a legitimate email/newsreader client installed from D:\Drivers\Forte Agent\a32-19.exe on 2004-08-20 10:08. Network shortcuts and shared folder access (\\\\ANDREWS-1\\HPLaserJ printer, CD Drive on Andrews-1) appear consistent with normal Windows network browsing rather than attack-related lateral movement. Telnet.exe execution on 2004-08-26 15:05:15 was recorded in prefetch but without evidence of actual connection attempts or credentials being transmitted, making it ambiguous whether this represented actual use or merely tool presence. The initial characterization of this as malicious lateral movement activity is not supported by the evidence of actual attack success.



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

6 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (1) > Credential Access (3) > Discovery (2) > Lateral Movement (1) > Collection (1)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1592.004](https://attack.mitre.org/techniques/T1592/004/) | Client Configurations | NetStumbler WiFi Scanning Tool Installed and Executed; Batch Tool Installation from D:\Drivers\ on... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Ethereal/Wireshark Execution Recorded (No...; Security Tool Collection in My Documents...; Cain Tool Execution with Unclear Attack Intent...; Batch Tool Installation from D:\Drivers\ on... |
| [T1110](https://attack.mitre.org/techniques/T1110/) | Brute Force | Cain Tool Execution with Unclear Attack Intent... |
| [T1557.002](https://attack.mitre.org/techniques/T1557/002/) | ARP Cache Poisoning | Batch Tool Installation from D:\Drivers\ on... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Ethereal/Wireshark Execution Recorded (No...; Security Tool Collection in My Documents...; Cain Tool Execution with Unclear Attack Intent...; Batch Tool Installation from D:\Drivers\ on... |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Security Tool Collection in My Documents...; Batch Tool Installation from D:\Drivers\ on... |


### Lateral Movement

| Technique | Name | Findings |
|-----------|------|----------|
| [T1021](https://attack.mitre.org/techniques/T1021/) | Remote Services | Security Tool Collection in My Documents... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1557.002](https://attack.mitre.org/techniques/T1557/002/) | ARP Cache Poisoning | Batch Tool Installation from D:\Drivers\ on... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 135 |
| Findings submitted | 7 |
| Confirmed | 3 |
| Inferences | 4 |
| Input tokens | 4.5K |
| Output tokens | 44.4K |
| Total tokens | 48.9K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case-q23.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 4.5K | 44.4K | 48.9K |




<details>
<summary>Evidence Sources (186)</summary>

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
| appfiles.program_files.license.txt | icat | 46 |
| appfiles.program_files.manifest.xml | icat | 121 |
| appfiles.program_files.market.ini | icat | 7 |
| registry.query.software | python-registry | 1 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.market.ini | icat | 7 |
| registry.query.software | python-registry | 1 |
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
| registry.query.system | python-registry | 1 |
| appfiles.program_files.makapt15.bat | icat | 3 |
| appfiles.program_files.makfre15.bat | icat | 3 |
| appfiles.program_files.handler.reg | icat | 15 |
| appfiles.program_files.handsafe.reg | icat | 17 |
| appfiles.program_files.handunsf.reg | icat | 17 |
| ez.shimcache | eztools | 140 |
| appfiles.program_files.dictionary.xml | icat | 649 |
| appfiles.program_files.mobileipv4.xml | icat | 64 |
| registry.query.system | python-registry | 1 |
| appfiles.program_files.nasreq.xml | icat | 293 |
| appfiles.program_files.sunping.xml | icat | 24 |
| appfiles.program_files.capture_filters.txt | icat | 80 |
| appfiles.program_files.capturing.txt | icat | 84 |
| appfiles.program_files.display_filters.txt | icat | 43 |
| appfiles.program_files.faq.txt | icat | 2228 |
| appfiles.program_files.getting_started.txt | icat | 90 |
| appfiles.program_files.overview.txt | icat | 38 |
| appfiles.program_files.well_known.txt | icat | 114 |
| ez.prefetch | eztools | 165 |
| appfiles.program_files.pcrepattern.3.txt | icat | 1475 |
| appfiles.program_files.agentx-mib.txt | icat | 529 |
| appfiles.program_files.disman-event-mib.txt | icat | 1957 |
| appfiles.program_files.disman-schedule-mib.txt | icat | 701 |
| registry.sam | regripper | 133 |
| appfiles.program_files.disman-script-mib.txt | icat | 1766 |
| appfiles.program_files.etherlike-mib.txt | icat | 1139 |
| appfiles.program_files.hcnum-tc.txt | icat | 120 |
| appfiles.program_files.host-resources-mib.txt | icat | 1542 |
| registry.sam | regripper | 7 |
| appfiles.program_files.host-resources-types.txt | icat | 391 |
| appfiles.program_files.iana-address-family-numbers-mib.txt | icat | 123 |
| appfiles.program_files.iana-language-mib.txt | icat | 125 |
| appfiles.program_files.ianaiftype-mib.txt | icat | 392 |
| registry.security | regripper | 19 |
| appfiles.program_files.if-inverted-stack-mib.txt | icat | 151 |
| appfiles.program_files.if-mib.txt | icat | 1816 |
| appfiles.program_files.inet-address-mib.txt | icat | 300 |
| appfiles.program_files.ip-forward-mib.txt | icat | 811 |
| registry.security | regripper | 8 |
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
| registry.software | regripper | 9600 |
| appfiles.program_files.rmon-mib.txt | icat | 3982 |
| appfiles.program_files.smux-mib.txt | icat | 162 |
| appfiles.program_files.snmp-community-mib.txt | icat | 431 |
| appfiles.program_files.snmp-framework-mib.txt | icat | 528 |
| appfiles.program_files.snmp-mpd-mib.txt | icat | 147 |
| registry.software | regripper | 283 |
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
| registry.system | regripper | 3138 |
| appfiles.program_files.tunnel-mib.txt | icat | 339 |
| appfiles.program_files.ucd-demo-mib.txt | icat | 76 |
| appfiles.program_files.ucd-diskio-mib.txt | icat | 119 |
| appfiles.program_files.ucd-dlmod-mib.txt | icat | 121 |
| registry.system | regripper | 199 |
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
| tsk.masquerade | sleuthkit | 14 |
| composite.file_staging | composite | 122 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.file_staging | composite | 122 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
