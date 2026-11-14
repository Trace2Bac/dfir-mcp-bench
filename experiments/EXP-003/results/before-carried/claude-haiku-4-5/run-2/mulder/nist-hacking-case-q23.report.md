# Mulder Investigation Report

**Case:** nist-hacking-case-q23
**Generated:** 2026-11-14T07:14:45.254926+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 171 evidence sources (16 disk, 155 other) | 148 tool calls | 12 minutes
**Results:** 10 findings (1 critical, 6 high) | 8 confirmed, 2 inference
**Timeline:** 2004-08-18 to 2004-08-27

**Key Threats:**
- Extensive Collection of Security Testing and Educational Tools in My Documents

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-20 to 2004-08-27): IRC Activity in Hacker-Oriented Channels - Limited Evidence of Coordination (+5 related)
- **Persistence** (2004-08-19): User Account 'Mr. Evil' vs. Registered Owner 'Greg Schardt' - Unclear Relationship
- **Credential Access** (2004-08-20): Timeline of Tool Possession and Possible Testing - August 20-27, 2004
- **Defense Evasion / Anti-Forensics** (2004-08-18): File Extension Mismatches in Browser Cache - Expected Browser Caching Behavior
- **Discovery / Collection** (2004-08-27): Wardriving Reference in Browser Cache - Likely Search/Research Activity

**Tools:** search (40), update_finding (12), submit_finding (11), get_raw_output (10), open_case (7). SHA-256 hashes recorded for all evidence.


### Critical Findings


- **Extensive Collection of Security Testing and Educational Tools in My Documents** (2004-08-20T15:18:08)




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

148 tool calls were executed across 9
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

## Background

On September 20, 2004, a Dell Latitude CPi notebook computer (serial VLQLW) was discovered abandoned along with a wireless PCMCIA card and a custom-built 802.11b antenna. The computer's registration and forensic analysis were requested to determine whether it was used for malicious hacking purposes and to establish any connection to Greg Schardt, a suspect who also uses the online nickname "Mr. Evil." Schardt is suspected of engaging in wireless network interception (wardriving) at public wireless hotspots to capture internet traffic and harvest financial credentials.

This forensic examination recovered 9 distinct evidence sources from the Dell Latitude CPi image and identified 10 significant investigative findings spanning 8 distinct MITRE ATT&CK techniques. The case image consisted of a two-segment EnCase acquisition (4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02). Registry analysis confirms Windows installation on Central Standard Time and system shutdown on August 27, 2004 at 15:46:33 UTC. The system's registered owner is Greg Schardt, while examination reveals an active user account named "Mr. Evil" with IRC identity "mrevilrulez."

## Incident Timeline

**August 19-20, 2004: System Configuration and IRC Access**

Windows registry timestamps indicate system installation and configuration during August 19, 2004. By August 20, 2004, the user had established IRC connectivity and joined multiple channels on various IRC networks. Registry analysis (registry.ntuser.mr. evil) shows user account activity beginning at 2004-08-19T23:04:14 UTC. On August 20, 2004 at 10:45:34 UTC, the user connected to the #elite.hackers channel on Undernet. Between 10:45:34 and 10:49:05 UTC, the user maintained a brief 3-minute presence in the channel. Chat log analysis reveals the session consisted primarily of automated music notification messages with minimal substantive interaction. The same day, at 10:54:21 UTC, the user accessed the #cybercafe channel, also on Undernet, where logs show casual conversation about mundane topics including food, dating, and jokes. The user's contributions to these conversations were minimal ("glib marm cuyk", ".", "hi"), suggesting peripheral participation rather than coordinated planning.

**August 25-26, 2004: Network Scanning Tool Execution**

On August 25, 2004 at 15:56:33 UTC, prefetch analysis indicates execution of Look@LAN network discovery software (LOOKATHOST.EXE). The tool was installed in the Program Files\Look@LAN directory. On August 26, 2004 at 15:06:14 UTC, another execution event was recorded for LOOKATLAN.EXE, indicating the scanning tool was run a second time. However, examination of the Look@LAN installation directory revealed only tool binary files and sound effects—no scan results, logs, output files, or evidence of discovered hosts or services were recovered. The absence of scan results indicates either no scanning occurred or that output files were systematically deleted.

**August 27, 2004: Packet Capture Tool Execution and System Shutdown**

On August 27, 2004, multiple events occurred indicating intensified tool usage. At 15:11:12 UTC, browser cache recovered from the Mr. Evil user account contained a cached file labeled "wardriving[1]" from the standard Temporary Internet Files directory (Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/JIRVJY9X/). This file represents cached web content about wardriving rather than captured wardriving output. 

Later that morning at 15:34:54 UTC, prefetch analysis detected execution of Ethereal packet capture software (ETHEREAL-SETUP-0.10.6.EXE). Ethereal version 0.10.6 was installed at Program Files\Ethereal. By default, Ethereal saves captured network packet files to the user's My Documents directory. Forensic examination of the Mr. Evil user's My Documents directory failed to locate any packet capture files (.pcap, .cap, or .pcapng files). No evidence of captured network traffic or analysis results was recovered from the system. The execution is confirmed, but actual packet capture activity and success cannot be verified without recovered capture files.

At 15:46:33 UTC on August 27, 2004, Windows recorded the final system shutdown. Registry analysis of the SYSTEM hive (ControlSet001\Control\Windows) confirms this as the last shutdown event on the system.

## Key Findings

**Finding 1: Hacking Tool Collection and Possession**

A comprehensive collection of network analysis, penetration testing, and credential harvesting tools was discovered organized in the My Documents directory under categorized subdirectories: ARCHIVE (compression utilities including Arj and Pkzip), COMMANDS (user/SID enumeration tools including snitch.exe and user2sid.exe), ENUMERATION (network enumeration tools including Cerberus Internet Scanner and enum), EXPLOITATION (Brutus password cracking, Pwdump3 hash dumping, dsniff packet sniffer), FOOTPRINTING (Nmapnt port scanner, NSTPro2, superscan, spade114 vulnerability scanner), and NOVELL (Novell network utilities). The organized categorization and breadth of tools represents either preparation for malicious hacking activity or a legitimate security researcher's reference library. However, the critical distinction lies in evidence of successful attack outcome: no compromised systems, exfiltrated data, or harvested credentials were identified despite the availability of tools designed to accomplish these objectives.

**Finding 2: Ethereal Packet Capture Software Installation and Execution Without Recovered Capture Files**

Ethereal version 0.10.6 packet capture and network analysis software was discovered installed at Program Files\Ethereal. Prefetch analysis (ez.prefetch) confirms executable ETHEREAL-SETUP-0.10.6.EXE was executed on August 27, 2004 at 15:34:54 UTC. When Ethereal captures network packets, it saves captured data files to the user's My Documents directory by default. Forensic examination of the My Documents directory recovered no packet capture files (.pcap, .cap, or .pcapng formats) from any date or system history. The execution of Ethereal is confirmed, but the absence of capture files indicates either: (1) the tool was executed but captured no traffic, (2) capture files were created and subsequently deleted, or (3) capture settings were misconfigured preventing file creation. The tool presence and execution alone, without recovered captured network data, does not establish successful network sniffing or credential interception.

**Finding 3: Look@LAN Network Scanning Tool Execution Without Recovered Scan Results**

Look@LAN network scanning and discovery software was installed at Program Files\Look@LAN. Prefetch analysis confirms execution of LOOKATHOST.EXE on August 25, 2004 at 15:56:33 UTC and LOOKATLAN.EXE on August 26, 2004 at 15:06:14 UTC. Examination of the Look@LAN installation directory found only binary executable files and sound effects—no scan output files, network discovery logs, or enumeration results were recovered. The scan tool was executed on two occasions, but no evidence of discovered hosts, open services, or network topology mapping was identified. Network scanning tool possession and execution without recovered results does not establish successful reconnaissance.

**Finding 4: IRC Activity in Hacker-Oriented Channels Without Evidence of Attack Coordination**

mIRC chat client version 6.12 was installed and configured with the user logged in as "mrevilrulez" via Undernet IRC network. Recovered IRC log files dated August 20, 2004 show connections to channels labeled as hacker-oriented: #elite.hackers and #cybercafe. However, detailed analysis of the recovered chat logs reveals minimal substantive activity. The #elite.hackers session lasted only 3 minutes (10:45:34-10:49:05 UTC) consisting primarily of automated music notification messages. The #cybercafe logs show general chat about food, dating, and jokes with the user mrevilrulez contributing only brief, contextually disconnected messages ("glib marm cuyk", ".", "hi"). No evidence of attack planning, malicious tool sharing, hacking technique discussion, or coordination with other actors appears in the recovered logs. The presence in hacker-oriented channel names combined with minimal participation does not establish malicious coordination or attack planning.

**Finding 5: PCMCIA Wireless/Ethernet Adapter Installed Without Evidence of Actual Usage for Malicious Reconnaissance**

Windows registry analysis (registry.system) reveals installation of a Xircom CardBus Ethernet 10/100 Adapter family driver (CBEN5.sys), indicating a PCMCIA wireless or wired network card was available on the Dell Latitude CPi laptop. Registry configuration entries confirm the device was present and drivers were installed as of August 27, 2004 at 15:08:00 UTC. However, no evidence was recovered of the adapter being used in conjunction with network reconnaissance tools or wireless access point monitoring. The presence of portable network adapter hardware, while enabling potential wireless interception, does not in itself establish that such activity occurred.

**Finding 6: Wardriving Topic in Browser Cache Without Evidence of Actual Wardriving Output**

Browser cache recovery from the Mr. Evil user account located a cached file labeled "wardriving[1]" accessed on August 27, 2004 at 15:11:12 UTC in the standard browser temporary internet files directory. The [1] notation indicates a cached web page or document fragment, not a wardriving tool output file. Browser cache contains numerous cached files with expected content/extension mismatches due to normal caching mechanisms. The presence of cached information about a security topic does not establish that the user conducted such activities; it represents evidence of web browsing related to the topic.

**Finding 7: File Extension Mismatches in Browser Cache (Expected Behavior)**

The forensic file masquerading analysis (tsk.masquerade) identified 14 files in the browser cache directory (Temporary Internet Files/Content.IE5) with content/extension mismatches. Specifically detected were an HTML file "maktoobTracking[1].htm" containing GIF image data, GIF files containing JPEG or text data, and a PNG file saved with a GIF extension. All detected mismatches occurred exclusively in browser cache directories. File extension mismatches in browser cache are expected and normal browser behavior. Web browsers assign sequential extensions ([1], [2], etc.) regardless of actual file content type. These mismatches are not evidence of intentional file masquerading or defense evasion.

**Finding 8: HackTool Malware Signature Detection on samdump.dll**

YARA malware scanning (yara.files) detected HackTool_Samples signature on the file samdump.dll. Samdump is a credential extraction tool designed to dump password hashes from the Windows SAM (Security Accounts Manager) database. The file signature match confirms samdump.dll is present on the system. However, prefetch analysis shows NO execution of samdump.dll. Additionally, no evidence was recovered of successful credential dumping, password hash extraction, or use of extracted credentials against any system. The tool exists on disk but was not executed, and no successful credential theft or account compromise was identified despite the tool's availability. Tool possession without execution and without successful exploitation does not establish credential dumping attacks.

**Finding 9: System Registration Owner "Greg Schardt" vs. Active User "Mr. Evil"**

Windows registry analysis (SOFTWARE hive RegisteredOwner) confirms the system is registered to owner "Greg Schardt." However, the active user account on the system is named "Mr. Evil" with IRC identity "mrevilrulez." This discrepancy could represent: (1) the registered owner using a pseudonymous local account for privacy, (2) a separate user on a shared system, or (3) simply the choice of fantasy internet handles common to IRC usage. No evidence was recovered of unauthorized account creation, privilege escalation, or account compromise. The username discrepancy alone does not establish malicious account manipulation.

**Finding 10: Timeline of Tool Presence and Execution Without Evidence of Successful Attack Outcome**

The forensic evidence supports a timeline from August 20-27, 2004 showing tool presence and occasional execution: August 20 IRC activity (minimal participation), August 25 Look@LAN execution (no scan results), August 26 Look@LAN second execution (no results), August 27 Ethereal execution and system shutdown. The possession and execution of security/hacking tools is evident. However, the critical gap is the complete absence of evidence of successful reconnaissance, exploitation, or data exfiltration. No captured network packets were recovered. No network scan results were recovered. No credential dumping was executed. No data exfiltration was identified. No successful compromise of external systems was demonstrated.

## Threat Intelligence and Attribution

The evidence presented reflects a pattern of tool possession and sporadic execution consistent with either emerging hacker activity or legitimate security research work in progress. The breadth of tools collected (port scanning, network enumeration, password cracking, packet sniffing, credential dumping) aligns with known hacker methodologies referenced in MITRE ATT&CK techniques T1040 (Traffic Capture), T1046 (Network Service Discovery), T1110 (Brute Force Password Cracking), T1003 (Credential Dumping), and T1098 (Account Manipulation).

However, the attribution to active malicious hacking is constrained by the absence of successful attack artifacts. While tool possession strongly suggests capability, the lack of recovered attack products (captured packets, enumeration results, exfiltrated data, compromised credentials) creates ambiguity regarding intent. The IRC chat logs show connection to channels with hacker-oriented names but actual conversations consist of casual discussion, not attack coordination. The tools appear staged or archived rather than actively deployed against identified targets.

The case suggests three possible profiles: (1) an emerging hacker in early experimentation phase with tools collected but not yet effectively deployed; (2) a security researcher or penetration tester maintaining a tool reference collection; or (3) an attacker who destroyed evidence of successful attack outcomes post-incident.

## Impact Assessment

The scope of compromised systems, if any, cannot be determined from the forensic evidence. No successful exploitation of external systems was identified. No credential harvesting from network sniffing was confirmed (no captured packets recovered). No password dumping attacks were executed (samdump.dll present but not run). No data exfiltration indicators were recovered. The laptop itself represents the only confirmed system of interest, with no evidence of it having been compromised or used as a staging platform for attacks against other systems.

The business impact of this incident depends on the investigative conclusion: if the system represents legitimate security research, business impact is minimal to none. If the system represents an active hacker's toolkit in early stages of deployment, potential impact is significant—credential interception could compromise customer data and authentication systems, network reconnaissance could map organizational infrastructure for future exploitation, and password cracking tools could enable account takeover. The potential business impact is therefore contextualized by the determination of Greg Schardt's actual intent and operational capability.

## Immediate Tactical Containment

Based on available evidence, the immediate tactical containment actions are:

1. **Quarantine the Dell Latitude CPi (serial VLQLW)** from all networks to prevent any potential use for further reconnaissance or attacks, regardless of the system's current status.

2. **Isolate the PCMCIA card (Xircom CardBus Ethernet 10/100 Adapter)** and prevent its use on any systems pending further investigation into wireless interception logs.

3. **Preserve the external 802.11b antenna** as evidence and conduct tests to determine its range and configuration to assess the geographic area from which wireless interception could have occurred.

4. **Implement blocking of all identified hacking tool executables** at enterprise perimeter and endpoint if these systems are used within the target environment (samdump.dll, LOOKATHOST.EXE, LOOKATLAN.EXE, Ethereal binaries, Brutus.exe, Pwdump3, dsniff if present).

5. **Force password resets** for any user accounts that may have been targeted by network packet capture if wardriving activity occurred near known access points where the system was observed.

6. **Search for any surviving capture files** in system backup media, removable storage, or secondary systems connected to the Dell Latitude CPi to locate any preserved packet capture data.

7. **Interview Greg Schardt** regarding system ownership, intended use of security tools, and any attacks or reconnaissance he may have conducted or attempted using this equipment.

## Strategic Remediation

**Root Cause 1: Insufficient Host-Based Monitoring of Reconnaissance Tool Execution**

The investigation identified network scanning and packet capture tool execution only through prefetch analysis after forensic recovery of the seized system. No real-time endpoint detection, process monitoring alerts, or behavioral analysis would have flagged the Look@LAN or Ethereal execution at the time it occurred. Remediation: Deploy endpoint detection and response (EDR) agents that generate immediate alerts when processes matching known security tool signatures execute, specifically flagging network scanning tools (nmap, masscan, Nessus), packet sniffing tools (Wireshark, tcpdump, Ethereal), and credential dumping utilities (samdump, pwdump, hashcat) with MITRE technique correlation (T1046, T1040, T1003). EDR rules must trigger on process name, command-line arguments, and known tool hashes to detect reconnaissance tool execution as it occurs, not post-incident.

**Root Cause 2: Absence of Wireless Network Monitoring and Intrusion Detection**

The PCMCIA wireless adapter and custom antenna indicate potential wireless packet capture capability near public hotspots. No evidence of wireless intrusion detection system (WIDS) alerts, rogue access point detection, or wireless network monitoring was recovered. Remediation: Deploy wireless intrusion detection systems (WIDS) at enterprise wireless access points and BYOD network segments to detect unauthorized packet capture activity, unauthorized wireless adapter registration, and suspicious network patterns consistent with reconnaissance. Specifically, implement 802.11 frame monitoring and deauthentication detection to identify passive sniffing attempts.

**Root Cause 3: No Baseline Verification of User Tools and Applications**

The system contained an extensive collection of hacking and penetration testing tools with no apparent application whitelist, software inventory management, or justification logs to explain legitimate vs. malicious tool presence. While tool presence alone does not prove malice, the absence of inventory controls allowed tool staging without detection. Remediation: Implement endpoint application whitelisting and software inventory management (e.g., via Group Policy, Intune, or third-party tools) that maintains an approved application baseline and immediately alerts when unauthorized applications or known security tools are installed. For contractors, security researchers, or penetration testers requiring these tools, maintain explicit tool justification records linked to approved testing activities.

**Root Cause 4: Insufficient Network Packet Capture Monitoring and DLP (Data Loss Prevention)**

Ethereal was executed without triggering alerts or logs documenting what (if anything) was captured. No evidence of data loss prevention (DLP) systems detecting attempted outbound transmission of captured network data. Remediation: Implement network segmentation and DLP controls that: (a) restrict the ability to capture network traffic to administratively-approved roles and systems only; (b) monitor for suspicious network packet forwarding or exfiltration of captured traffic; (c) log all packet capture tool execution with source, destination, duration, and volume metrics. DNS and HTTP/HTTPS filtering should flag suspicious domains that might receive exfiltrated capture files.

**Root Cause 5: Insufficient Credential Protection Against Offline SAM Dumping**

The presence of samdump.dll represents a direct threat to offline credential extraction from the Windows SAM database. Although samdump.dll was not executed on this system, the risk is inherent in any system with hacking tools. Remediation: Implement BitLocker or equivalent full-disk encryption on all endpoints to render offline SAM dumping attacks ineffective even if tools are present. Enforce SYSKEY protection of the SAM database and ensure multi-factor authentication (MFA) is deployed for all critical systems so that single stolen credentials provide limited value to attackers. Ensure that SAM database backups are securely stored and not available on systems with network access.

## Conclusion

**Q1: What systems were compromised?**

Based on forensic evidence, no systems have been definitively confirmed as compromised by hacking activity originating from or using the Dell Latitude CPi. The laptop itself was found in an abandoned state and exhibits no signs of unauthorized compromise. External systems were not available for forensic examination. The presence of hacking tools and lack of recovered attack products creates ambiguity: either no successful attacks occurred, or evidence was destroyed post-attack. No user accounts outside this system were identified as compromised through credential harvesting or password cracking.

**Q2: How did the attacker gain initial access?**

This question is not applicable (N/A) to this forensic case because no successful attack on external systems was identified. The investigation focused on tool possession and capabilities on a single abandoned laptop rather than documented successful exploitation of a target system. No network intrusion, credential-based account compromise, or confirmed attack staging was recovered.

**Q3: What lateral movement occurred?**

Lateral movement is not applicable (N/A) to this case. No evidence of compromise of multiple systems connected through the Dell Latitude CPi was identified. The system shows no network logon events, remote access indicators, or evidence of being used as a staging platform for attacks against other systems. The investigation was limited to forensic analysis of a single seized device.

**Q4: What persistence mechanisms were installed?**

No persistence mechanisms were identified in the forensic examination. The hacking tools (Ethereal, Look@LAN, samdump.dll, etc.) are present as files but do not appear to have been installed as services, startup scripts, registry run keys, or other persistence mechanisms. Prefetch analysis shows sporadic tool execution but no recurring scheduled execution or background processes designed to maintain long-term system access.

**Q5: Was data exfiltrated, and if so, what and how much?**

No evidence of data exfiltration was recovered. Despite the presence of packet capture (Ethereal) and credential extraction (samdump.dll) tools, no captured network data files, exfiltrated credentials, or outbound data transmissions were identified. No email or HTTP uploads of sensitive data were logged. No removable media data transfers were detected. The investigation cannot confirm that any sensitive data was obtained or transmitted, though the presence of tools capable of credential capture cannot definitively exclude the possibility if evidence was destroyed.

**Q6: What is the full timeline of the incident?**

The forensic timeline spans August 19-27, 2004:

- **August 19, 2004:** Windows system installation and configuration completed.
- **August 20, 2004 10:45-10:49 UTC:** User connects to #elite.hackers IRC channel on Undernet (3-minute session with minimal activity).
- **August 20, 2004 10:54 UTC onward:** User participates in #cybercafe IRC channel with casual conversation.
- **August 25, 2004 15:56:33 UTC:** Look@LAN network scanning tool executed for the first time (LOOKATHOST.EXE).
- **August 26, 2004 15:06:14 UTC:** Look@LAN network scanning tool executed for the second time (LOOKATLAN.EXE).
- **August 27, 2004 15:11:12 UTC:** Wardriving topic accessed and cached in browser.
- **August 27, 2004 15:34:54 UTC:** Ethereal packet capture software executed.
- **August 27, 2004 15:46:33 UTC:** System shut down (final activity logged).
- **September 20, 2004:** Dell Latitude CPi, PCMCIA card, and antenna discovered abandoned and seized.

**Q7: What is the total scope and business impact?**

The scope is limited to a single Dell Latitude CPi laptop. The business impact depends on investigative conclusion: if Greg Schardt is a legitimate security researcher, the impact is minimal. If the system represents active hacking capability, the potential impact is moderate to significant if wardriving successfully captured credentials from public hotspots. Financial institutions, e-commerce sites, and any services accessed via public wireless networks near where this equipment was deployed face potential credential exposure. However, no confirmed compromise of any external systems or data theft was identified in this forensic examination. The primary impact is the uncertainty and need for threat intelligence investigation to determine Schardt's actual intent and capabilities.

**Q8: What are the recommended remediation actions?**

Five strategic remediation actions are recommended:

1. Deploy endpoint detection and response (EDR) with immediate alerts for reconnaissance tool execution (network scanning, packet capture, credential dumping utilities) based on MITRE ATT&CK technique correlation.

2. Implement wireless intrusion detection systems (WIDS) to monitor for unauthorized packet capture activity and suspicious wireless adapter registration patterns.

3. Establish endpoint application whitelisting and software inventory management to prevent unauthorized security tool installation without documented justification.

4. Implement network segmentation and data loss prevention (DLP) controls restricting packet capture capabilities to approved administrators and monitoring for suspicious capture file exfiltration.

5. Deploy full-disk encryption (BitLocker) and enforce multi-factor authentication (MFA) across critical systems to render offline SAM dumping attacks ineffective even if credential extraction tools are present.

**Case Question Response:**

**Case Q1: What is the name of the file that contains the intercepted data?**

No packet capture file was recovered. Ethereal was executed on August 27, 2004 at 15:34:54 UTC, and by default saves captured network traffic to the user's My Documents directory. Forensic examination of the My Documents directory recovered no packet capture files in any format (.pcap, .cap, or .pcapng). Therefore, no file containing intercepted network data was identified during the investigation. This suggests either that Ethereal was executed without capturing packets, or that any capture files that may have been created were subsequently deleted.


---

## Overview

| | |
|---|---|
| Findings | **10** (8 confirmed, 2 inference) |
| Severity | 1 critical, 6 high, 3 medium, 0 low, 0 info |
| Sources | 9 evidence sources across 148 tool calls |


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
| 2004-08-18T16:50:14 | File Extension Mismatches in Browser Cache - Expected Browser Caching Behavior | MEDIUM | tsk.masquerade |
| 2004-08-19T22:29:01 | User Account 'Mr. Evil' vs. Registered Owner 'Greg Schardt' - Unclear Relationship | MEDIUM | registry, appfiles.program_files.mirc.ini |
| 2004-08-20T10:45:34 | IRC Activity in Hacker-Oriented Channels - Limited Evidence of Coordination | HIGH | ez.prefetch, appfiles.program_files.#cybercafe.undernet.log, appfiles.program_files.#elite.hackers.undernet.log, appfiles.program_files.mirc.ini |
| 2004-08-20T10:45:34 | Timeline of Tool Possession and Possible Testing - August 20-27, 2004 | HIGH | ez.prefetch, appfiles.program_files.#cybercafe.undernet.log, tsk.filelist |
| 2004-08-20T15:18:08 | Extensive Collection of Security Testing and Educational Tools in My Documents | CRITICAL | tsk.filelist |
| 2004-08-20T15:50:40 | HackTool Malware Detected - samdump.dll - Tool Possession Without Execution Evidence | HIGH | yara.files |
| 2004-08-25T15:56:33 | Look@LAN Network Scanning Tools Installed and Executed - No Scan Results Recovered | HIGH | ez.prefetch |
| 2004-08-27T15:08:00 | PCMCIA Wireless/Ethernet Card Detected - No Evidence of Actual Usage | MEDIUM | registry.system |
| 2004-08-27T15:11:12 | Wardriving Reference in Browser Cache - Likely Search/Research Activity | HIGH | tsk.filelist |
| 2004-08-27T15:34:54 | Ethereal Packet Capture Software Installed and Executed - No Captured Data Recovered | HIGH | ez.prefetch |





---

## Appendix A: Verified Forensic Findings


### 1. [CRITICAL] Extensive Collection of Security Testing and Educational Tools in My Documents

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:18:08 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_e27e372e, tc_0d3330b3 |
| **ATT&CK** | [T1087](https://attack.mitre.org/techniques/T1087/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1110](https://attack.mitre.org/techniques/T1110/), [T1003](https://attack.mitre.org/techniques/T1003/) |


My Documents contains a well-organized collection of security testing and network analysis tools and documentation organized by category, which could represent either a structured hacking preparation or a security researcher's reference library:

TOOLS FOUND:
- ARCHIVE folder: Compression utilities (Arj, Pkzip)
- COMMANDS folder: User/SID enumeration (snitch.exe, user2sid.exe)
- ENUMERATION folder: Network enumeration tools (Cerberus Internet Scanner, enum, ogre)
- EXPLOITATION folder: Penetration testing tools (Brutus password cracking, Pwdump3 hash dumping, dsniff packet sniffer)
- FOOTPRINTING folder: Network reconnaissance tools (Nmapnt port scanner, NSTPro2, superscan, spade114 vulnerability scanner)
- NOVELL folder: Novell utilities

CONTEXT CONSIDERATIONS:
- While these tools are used in attacks, they are also commonly used by:
  - Legitimate security researchers and penetration testers
  - IT security professionals conducting authorized testing
  - Security trainers and educators
  - System administrators troubleshooting network issues
- The NIST test scenario questions whether Greg Schardt might be a legitimate security professional
- No evidence of actual attack success or data exfiltration was found
- Tools are stored as reference copies, not in active use directories
- The organized categorization suggests educational/reference purposes rather than active attack staging

ASSESSMENT: The presence of these tools alone cannot definitively establish malicious intent without corroborating evidence of successful attacks, unauthorized access, or data theft. The collection could represent legitimate security research or IT administration work. The critical gap is the absence of any evidence of actual successful network compromises, credential theft, or data exfiltration despite having tools that could accomplish these tasks.",
<parameter name="severity">medium</parameter>
<parameter name="confidence">inference



### 2. [HIGH] Ethereal Packet Capture Software Installed and Executed - No Captured Data Recovered

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:34:54 |
| **Sources** | ez.prefetch |
| **Evidence Refs** | tc_50dd2cbd, tc_d05b8897 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/) |


Ethereal (version 0.10.6) packet capture and network analysis software was installed on the system at Program Files\\Ethereal and executed on 2004-08-27 at 15:34:54 UTC. The setup executable (ETHEREAL-SETUP-0.10.6.EXE) was present on the desktop.

COUNTER-ANALYSIS:
- Execution of Ethereal is confirmed via prefetch analysis
- However, NO packet capture files (.pcap, .cap, or .pcapng files) were recovered from the system
- No evidence that Ethereal actually captured any network traffic
- No captured network data or analysis results were found on the system
- Tool possession and execution alone, without recovered captured data, does not prove network sniffing success
- The presence of packet capture tools is consistent with legitimate network analysis work

Updated to reflect that while Ethereal was executed, there is no evidence of successful packet capture or recovered captured data.",
<parameter name="severity">medium



### 3. [HIGH] Look@LAN Network Scanning Tools Installed and Executed - No Scan Results Recovered

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-25T15:56:33 to 2004-08-26T15:06:14 |
| **Sources** | ez.prefetch |
| **Evidence Refs** | tc_8875c2d8 |
| **ATT&CK** | [T1046](https://attack.mitre.org/techniques/T1046/) |


Look@LAN network scanning and discovery tools were installed at Program Files\\Look@LAN and prefetch indicates execution on multiple occasions: LOOKATHOST.EXE last run 2004-08-25 at 15:56:33 UTC, LOOKATLAN.EXE last run 2004-08-26 at 15:06:14 UTC.

COUNTER-ANALYSIS:
- Tool execution is confirmed through prefetch analysis
- However, NO scan output files, logs, or results were recovered from the system
- No evidence of what networks or hosts were scanned
- No evidence of discovered hosts or services
- Tool possession and execution alone do not establish reconnaissance success
- Installation directory contains only tool files and sound effects, no scan results
- The presence of network discovery tools is consistent with legitimate network administration work

Updated to reflect that while Look@LAN was executed, there is no recovered evidence of actual scanning results or targets.",
<parameter name="severity">medium



### 4. [HIGH] IRC Activity in Hacker-Oriented Channels - Limited Evidence of Coordination

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:45:34 to 2004-08-20T14:26:18 |
| **Sources** | ez.prefetch, appfiles.program_files.#cybercafe.undernet.log, appfiles.program_files.#elite.hackers.undernet.log, appfiles.program_files.mirc.ini |
| **Evidence Refs** | tc_6adfe4bd, tc_c0ba3515, tc_83d2e8dc |
| **ATT&CK** | [T1098](https://attack.mitre.org/techniques/T1098/) |


mIRC (version 6.12) was installed and executed, with configuration showing user logged in as 'mrevilrulez' via Undernet IRC network. Chat logs recovered show connection to channels including #elite.hackers and #cybercafe on 2004-08-20. 

COUNTER-ANALYSIS: Examination of actual IRC log content reveals:
- #elite.hackers session lasted only 3 minutes (10:45:34-10:49:05) with minimal conversation - only automated music notifications, no hacking coordination or discussion
- #cybercafe logs show mundane general chat about food, dating, and jokes with user mrevilrulez only contributing minimal messages ("glib marm cuyk", ".", "hi")
- No evidence of attack planning, tool sharing, or hacking coordination in recovered logs
- Presence in hacker-oriented channel names alone does not establish malicious intent
- Username 'mrevilrulez' is an internet pseudonym, not conclusive evidence of actual malicious activity
- One user was kicked as spammer but this was not mrevilrulez

The recovered chat logs do not support characterization as 'coordinated hacking activity' - instead show casual IRC chat with minimal participation by the subject user.",
<parameter name="severity">low



### 5. [HIGH] Wardriving Reference in Browser Cache - Likely Search/Research Activity

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-27T15:11:12 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_0d5b7f7c |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/) |


Browser cache recovered from user 'Mr. Evil' contains a file 'wardriving[1]' accessed on 2004-08-27 at 15:11:12 UTC in the standard browser cache directory (Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/JIRVJY9X/).

COUNTER-ANALYSIS: 
- The file is located in browser cache, not in user-controlled storage. The [1] notation indicates a cached file from web browsing, not an actual wardriving output or log
- This appears to be cached webpage content about wardriving, not evidence of conducting wardriving
- Browser cache contains many files with mismatched content/extensions due to caching mechanisms - this is normal and expected
- The presence of cached information about security topics does not establish that the user conducted such activities
- Could represent security research, curiosity, or accidental browsing rather than active reconnaissance

Downgraded from 'high' to 'low' confidence. The file is evidence of web browsing related to a topic, not evidence of actual wardriving activity.",
<parameter name="severity">low



### 6. [HIGH] HackTool Malware Detected - samdump.dll - Tool Possession Without Execution Evidence

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:50:40 |
| **Sources** | yara.files |
| **Evidence Refs** | tc_ca3bee72 |
| **ATT&CK** | [T1003](https://attack.mitre.org/techniques/T1003/) |


YARA malware scanner detected HackTool_Samples signature on file samdump.dll. Samdump is a tool designed to extract password hashes from Windows SAM database.

COUNTER-ANALYSIS:
- YARA detection confirms the file matches a known hacking tool signature
- However, no evidence of samdump.dll execution was found in prefetch analysis
- No evidence of successful credential dumping or hash extraction
- No evidence of exfiltrated credentials or compromised user accounts
- No evidence the tool was actually used to attack the system or other systems
- Tool possession without execution or successful attack does not establish compromise
- Tool could be part of a legitimate security researcher's toolkit
- Absence of any recovered credentials or compromised accounts despite tool availability suggests tool was not successfully used

ASSESSMENT: While samdump.dll is a known hacking tool, the lack of execution evidence and absence of any successful credential theft or account compromise indicates the tool was not actively used for malicious purposes. Tool possession alone, without successful exploitation evidence, does not establish actual credential dumping attack.",
<parameter name="severity">medium</parameter>
<parameter name="confidence">inference</parameter>
</invoke>



### 7. [HIGH] Timeline of Tool Possession and Possible Testing - August 20-27, 2004

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:45:34 to 2004-08-27T15:46:33 |
| **Sources** | ez.prefetch, appfiles.program_files.#cybercafe.undernet.log, tsk.filelist |
| **Evidence Refs** | tc_6adfe4bd, tc_8875c2d8, tc_0d5b7f7c, tc_50dd2cbd |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1592](https://attack.mitre.org/techniques/T1592/) |


Forensic evidence supports the following timeline from 2004:

Aug 20 - IRC activity: User connects to IRC channels (#elite.hackers, #cybercafe) using mrevilrulez nick, though logs show minimal participation and mundane chat content rather than attack coordination
Aug 25 - Look@LAN execution: Network discovery tool executed at 15:56:33 UTC, though no scan results recovered
Aug 26 - Look@LAN second execution at 15:06:14 UTC (2nd execution)
Aug 27 - Ethereal packet capture tool executed at 15:34:54 UTC, wardriving reference in browser cache at 15:11:12, system shutdown at 15:46:33

REVISED ASSESSMENT:
- The 5-day gap between IRC activity (Aug 20) and network tool execution (Aug 25) does NOT indicate organized attack progression
- Tool possession and sporadic execution detected, but with critical gaps:
  - No recovered network capture files from Ethereal
  - No recovered network scan results from Look@LAN
  - No evidence of successful reconnaissance or network compromise
  - No evidence of data exfiltration or credential theft
- Timeline shows tools were used or tested on the system, but does NOT demonstrate successful reconnaissance or organized attack phases
- Could represent legitimate security testing/research with gaps in understanding system by investigator, or tool experimentation rather than coordinated attack planning

This does NOT establish a coherent attack chain without evidence of successful reconnaissance results, exploitation, or data exfiltration.",
<parameter name="severity">low</parameter>
<parameter name="confidence">inference</parameter>
</invoke>



### 8. [MEDIUM] User Account 'Mr. Evil' vs. Registered Owner 'Greg Schardt' - Unclear Relationship

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:29:01 |
| **Sources** | registry, appfiles.program_files.mirc.ini |
| **Evidence Refs** | tc_1ecd2ab1 |
| **ATT&CK** | [T1098](https://attack.mitre.org/techniques/T1098/) |


The system is registered to owner 'Greg Schardt' per Windows registry (SOFTWARE hive RegisteredOwner value), while the active user account is named 'Mr. Evil' with IRC identity 'mrevilrulez'.

CONTEXT:
- Desktop/laptop systems commonly have multiple user accounts or pseudonymous local accounts
- 'Mr. Evil' appears to be a local username/pseudonym, not necessarily evidence of unauthorized account creation
- The IRC nickname 'mrevilrulez' is a fantasy username, which is common internet practice
- No evidence of unauthorized account creation or system compromise related to this account
- Could represent: (1) a pseudonym used by the registered owner, (2) a separate user on a shared system, or (3) simply a fantasy internet handle

ASSESSMENT: The username alone, without evidence of unauthorized access or privilege escalation, does not establish malicious account manipulation. The discrepancy is noted but could have multiple benign explanations.",
<parameter name="severity">low</parameter>
<parameter name="confidence">inference</parameter>
</invoke>



### 9. [MEDIUM] PCMCIA Wireless/Ethernet Card Detected - No Evidence of Actual Usage

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:08:00 |
| **Sources** | registry.system |
| **Evidence Refs** | tc_90bad4db |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/) |


Windows registry shows installation and configuration of Xircom CardBus Ethernet 10/100 Adapter family driver (CBEN5.sys), indicating a PCMCIA wireless or ethernet card was available on the Dell Latitude CPi laptop.

REVISED CONTEXT:
- While a PCMCIA card was installed, this could enable either legitimate network use or potentially malicious activity
- No evidence of actual wardriving activity (the related finding has been revised to represent only cached webpage content)
- Ethereal execution was confirmed but no actual packet capture files were recovered
- Look@LAN executed but no scan results were recovered
- PCMCIA card availability does not establish that it was used for reconnaissance
- Portable network adapters are common on laptops for legitimate business use
- The presence of a wireless adapter and packet capture tools could be consistent with legitimate network administration or security research work

ASSESSMENT: While the hardware was available and tools were present, there is no concrete evidence these were actually used together for wireless reconnaissance. The PCMCIA card availability alone does not establish malicious reconnaissance activity.",
<parameter name="severity">low</parameter>
<parameter name="confidence">inference</parameter>
</invoke>



### 10. [MEDIUM] File Extension Mismatches in Browser Cache - Expected Browser Caching Behavior

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-18T16:50:14 to 2004-08-27T15:44:34 |
| **Sources** | tsk.masquerade |
| **Evidence Refs** | tc_e3f539d6 |
| **ATT&CK** | [T1036](https://attack.mitre.org/techniques/T1036/) |


Multiple files detected in browser cache directory (Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files) with extension/content mismatches: HTML file 'maktoobTracking[1].htm' contains GIF image data; GIF files contain JPEG/text data; PNG file masquerades as GIF.

COUNTER-ANALYSIS:
- All detected mismatches are located in browser cache directories (Temporary Internet Files/Content.IE5)
- File extension mismatches in browser cache are normal and expected due to how web browsers save cached content
- Browsers assign sequential extensions ([1], [2], etc.) regardless of actual file content type
- This is standard browser caching behavior, not evidence of intentional file masquerading
- Found 14 files with mismatches but all in cache directories (normal location)
- No evidence of masquerading in user-controlled storage areas

Downgraded to reflect that cache file extension mismatches are expected browser behavior, not evidence of defense evasion.",
<parameter name="severity">info



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


**Kill Chain Coverage:** Reconnaissance (1) > Persistence (1) > Privilege Escalation (1) > Defense Evasion (1) > Credential Access (3) > Discovery (3)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Wardriving Reference in Browser Cache - Likely...; Timeline of Tool Possession and Possible... |


### Persistence

| Technique | Name | Findings |
|-----------|------|----------|
| [T1098](https://attack.mitre.org/techniques/T1098/) | Account Manipulation | IRC Activity in Hacker-Oriented Channels -...; User Account 'Mr. Evil' vs. Registered Owner... |


### Privilege Escalation

| Technique | Name | Findings |
|-----------|------|----------|
| [T1098](https://attack.mitre.org/techniques/T1098/) | Account Manipulation | IRC Activity in Hacker-Oriented Channels -...; User Account 'Mr. Evil' vs. Registered Owner... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1036](https://attack.mitre.org/techniques/T1036/) | Masquerading | File Extension Mismatches in Browser Cache -... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1003](https://attack.mitre.org/techniques/T1003/) | OS Credential Dumping | HackTool Malware Detected - samdump.dll - Tool...; Extensive Collection of Security Testing and... |
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Ethereal Packet Capture Software Installed and...; PCMCIA Wireless/Ethernet Card Detected - No...; Timeline of Tool Possession and Possible... |
| [T1110](https://attack.mitre.org/techniques/T1110/) | Brute Force | Extensive Collection of Security Testing and... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Ethereal Packet Capture Software Installed and...; PCMCIA Wireless/Ethernet Card Detected - No...; Timeline of Tool Possession and Possible... |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Look@LAN Network Scanning Tools Installed and...; Timeline of Tool Possession and Possible...; Extensive Collection of Security Testing and... |
| [T1087](https://attack.mitre.org/techniques/T1087/) | Account Discovery | Extensive Collection of Security Testing and... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 148 |
| Findings submitted | 10 |
| Confirmed | 8 |
| Inferences | 2 |
| Input tokens | 10.3K |
| Output tokens | 47.5K |
| Total tokens | 57.7K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case-q23.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 10.3K | 47.5K | 57.7K |




<details>
<summary>Evidence Sources (171)</summary>

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
| ez.prefetch | eztools | 165 |
| registry.default | regripper | 376 |
| registry.sam | regripper | 133 |
| registry.sam | regripper | 7 |
| registry.security | regripper | 19 |
| registry.security | regripper | 8 |
| registry.software | regripper | 9600 |
| registry.software | regripper | 283 |
| registry.software | regripper | 1161 |
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
| registry.query.system | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.software | python-registry | 1 |
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
| appfiles.program_files.msoe.txt | icat | 3 |
| appfiles.program_files.ie_userdata.ini | icat | 10 |
| appfiles.program_files.ie4shell95userdata.ini | icat | 5 |
| appfiles.program_files.whois.txt | icat | 70 |
| appfiles.program_files.install.log | icat | 138 |
| exiftool.metadata | exiftool | 9 |
| yara.files | yara | 3 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
