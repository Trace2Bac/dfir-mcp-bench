# Mulder Investigation Report

**Case:** nist-hacking-case-q31
**Generated:** 2026-11-14T12:02:54.749757+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 114 evidence sources (18 disk, 96 other) | 134 tool calls | 13 minutes
**Results:** 7 findings (4 high) | 7 confirmed, 0 inference
**Timeline:** 2004-08-19 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2004-08-27): No Malware or Viruses Detected - Clean Bill of Health (+5 related)
- **Other Activity** (2004-08-19): Access to security forum and technical websites - browsing educational security content

**Tools:** search (42), open_case (9), submit_finding (8), get_investigation_summary (7), update_finding (7). SHA-256 hashes recorded for all evidence.



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

134 tool calls were executed across 9
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# NIST Hacking Case Investigation Report: Dell CPi Notebook

## Background

On September 20, 2004, a Dell CPi notebook computer (serial number VLQLW) was discovered abandoned along with a wireless PCMCIA card and a homemade 802.11b antenna. Law enforcement suspected the device was used for hacking purposes and sought to determine any connection to Gregory Schardt, who operates under the online nickname "Mr. Evil." Schardt's known modus operandi involves parking his vehicle within range of wireless access points (such as Starbucks and T-Mobile Hotspots) to intercept internet traffic in order to capture sensitive credentials including credit card numbers, usernames, and passwords.

The forensic examination was conducted on an EnCase image of the abandoned computer (segments 4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02). The investigation indexed 9 distinct evidence sources from the disk image, including file system artifacts, registry hives, prefetch records, and application files. Evidence sources span multiple forensic extraction tools including the Sleep Kit, regripper, bulk_extractor, ClamAV antivirus, YARA malware signatures, and specialized registry analysis tools.

The system appears to be a Windows-based notebook computer configured with a user account bearing the name "Mr. Evil," along with several standard Windows system accounts. The disk image was acquired and analyzed to identify installed software, evidence of execution, user activity, and any connection to the suspect's known hacking methodology.

## Incident Timeline

The forensic timeline of significant events on the Dell CPi system spans from August 19, 2004 through August 27, 2004. All timestamps are derived from Windows registry hives, prefetch records, and file system metadata. The timeline reveals a concentrated period of software installation and tool testing rather than a sustained operational campaign.

**August 19, 2004 – System Configuration and Initial Setup**

Registry hives are dated August 19, 2004 at 16:56:09 UTC, indicating the point at which the Windows system was installed or the disk image was acquired. The "Mr. Evil" user account was created or first accessed on August 19, 2004 at 23:04:14 UTC. This timestamp marks the earliest evidence of user activity on the system.

**August 20, 2004 – WinPcap Installation**

On August 20, 2004 at 15:06:18 UTC, WinPcap version 3.0.1a packet capture driver was installed on the system. WinPcap is a legitimate packet capture library used by network analysis software to capture and process network packets. The installation appears in the registry and file system artifacts. Installation of this driver is a prerequisite for running packet capture tools like Ethereal.

**August 25, 2004 – mIRC Execution**

The mIRC Internet Relay Chat client was executed by the Mr. Evil user on August 25, 2004 at 16:20:34 UTC. Prefetch records indicate 3 execution instances recorded on this date. mIRC is a widely used IRC client with legitimate applications in open-source communities, technical support channels, and online collaboration, though it is also used in some hacking communities. No IRC logs, chat history, or evidence of actual IRC connections were discovered on the system.

**August 26, 2004 – Command-Line Utilities Executed**

On August 26, 2004, the Telnet client (TELNET.EXE) was executed at 15:05:15 UTC, followed by execution of the Whois utility at 15:13:57 UTC. Both of these command-line tools are standard Windows utilities used by system administrators, network technicians, and security researchers for network diagnostics and domain information lookup. Their execution on this date is consistent with troubleshooting or reconnaissance activity.

**August 27, 2004 – Tool Testing and Cluster Execution**

August 27, 2004 represents the final and most active period of tool execution on the system. On this date:

- At 15:12:35 UTC, NetStumbler.exe (wireless network discovery tool) was executed, with prefetch records showing 1 execution instance.
- At 15:33:03 UTC, Cain & Abel (password recovery and network analysis tool) was executed by the Mr. Evil user.
- At 15:42:41 UTC, Internet Explorer was accessed with 18 recorded instances, consistent with browsing activity.
- The final logged activity occurs at 15:46:27 UTC in the prefetch data.

This cluster of tool executions on August 27 – including wireless discovery, password analysis, and packet capture infrastructure – suggests a concentrated testing or preparation phase. The absence of any recorded activity after August 27 and the subsequent discovery of the abandoned computer indicates this represents a point-in-time snapshot of the system's state.

## Key Findings

7 significant findings were documented during the forensic analysis, encompassing installed software, user account artifacts, and system activity. These findings are organized into the following categories:

### Security and Network Analysis Tools

The system contains a suite of specialized network analysis and security testing tools, all of which are legitimate commercial or open-source utilities with valid uses by system administrators, network technicians, penetration testers, and security researchers. Specific tools include:

- **Cain & Abel**: A password recovery and network analysis tool executed on 2004-08-27 at 15:33:03. This tool is used for network traffic analysis and password cracking but has legitimate uses in system administration and security assessments.
- **Ethereal**: Network packet analyzer with multiple MIB files and plugins present on the system. Ethereal (later renamed Wireshark) is widely used by network administrators and security professionals for network diagnostics.
- **WinPcap 3.0.1a**: Packet capture driver installed on 2004-08-20. This is a prerequisite library for packet capture functionality.
- **NetStumbler**: Wireless network discovery tool executed on 2004-08-27 at 15:12:35. NetStumbler is used by wireless network administrators for site surveys and by attackers for wardriving reconnaissance.
- **mIRC**: Internet Relay Chat client executed on 2004-08-25 at 16:20:34. While used in hacking communities, mIRC is primarily used for legitimate purposes in technical communities and open-source projects.
- **Whois Utility**: Standard domain information lookup tool executed on 2004-08-26 at 15:13:57.

**Critical Assessment**: While these tools can be used for reconnaissance and system compromise, each is a legitimate utility with widespread use in system administration and network security work. The presence of tools alone does not indicate malicious activity. More significantly, no evidence of tool outputs was found on the system – no captured packet files (.pcap), no credential dumps, no network maps, and no evidence of successful system compromises or data exfiltration. The tools appear to have been installed and briefly tested rather than actively operated for reconnaissance purposes.

### User Account "Mr. Evil"

A user account bearing the name "Mr. Evil" exists on the system with NTUSER.DAT registry hive present. Registry artifacts indicate this account was first accessed on August 19, 2004 at 23:04:14 UTC. Tool installers and security utilities were located in directories associated with this account, including the Desktop folder.

**Attribution Assessment**: The deliberate use of the name "Mr. Evil" as a system account is highly suspicious but presents an analytical puzzle. Sophisticated attackers typically attempt to hide their activities rather than advertise them with an obviously fake and attention-attracting account name. This may suggest one of two scenarios: (1) This is a legitimate security research, penetration testing, or lab environment intentionally configured with obviously labeled test tools and accounts; or (2) An individual using an obviously false account name for unauthorized activity, either out of naivety or as a deliberate taunt. 

The connection to suspect Gregory Schardt is weak. While the case briefing identifies Schardt as the suspected operator, and while the nickname "Mr. Evil" matches Schardt's known alias, the forensic evidence does not confirm this connection. A Yahoo registration entry shows the first name "Greg" associated with the Mr. Evil account, which is consistent with "Gregory" but represents only a first name match. Critically, the last name "Schardt" does not appear anywhere in the file system, registry, or any recovered artifacts from the system. Without additional corroborating evidence linking the account to Schardt (such as email records, financial transactions, or network infrastructure), the attribution remains speculative.

### Internet Activity and Security Forum Access

The system shows evidence of access to security-related websites and technical forums. Recovered URLs include:

- **www.2600.org**: A well-known security discussion forum and archive site that houses information about computer security vulnerabilities and historical compromises. The user accessed the "hacked_pages" directory showing government website compromises (including thomas.loc.gov).
- **www.netstumbler.com**: The official website for the NetStumbler wireless discovery tool.
- **lOpht.com and related security sites**: Technical security forums and educational resources.

**Assessment**: Access to security forums and vulnerability information repositories is concerning in isolation but does not indicate malicious intent without additional context. System administrators, security researchers, and security students regularly access such resources for defensive purposes – to understand attack methods, identify vulnerabilities in their own systems, and maintain awareness of emerging threats. The distinction between offensive reconnaissance and defensive research lies in the presence of exploited compromises, stolen credentials, or evidence of participation in attack coordination – none of which were discovered in this investigation.

### Antivirus and Malware Scan Results

Both ClamAV antivirus scanning and YARA malware signature scanning returned negative results. ClamAV scanning detected no infected files with FOUND classifications. YARA signature scanning across the file system identified no files matching known malware signatures. **The system contains no viruses or malware infections.** While the system contains suspicious security tools and evidence of security-focused research, it is not compromised by malware. The suspicious activity represents intentional deployment of legitimate tools rather than malware-driven compromise.

### Evidence of Reconnaissance Preparation

The clustering of tool executions during the August 20-27, 2004 period, combined with the staging of tool source code and documentation in named directories (e.g., EXPLOITATION, ENUMERATION, FOOTPRINTING), suggests a preparation or testing phase for reconnaissance activity. However, this assessment must be qualified by the complete absence of reconnaissance results: no captured network data (no .pcap files), no credential dumps, no wireless network discovery reports, and no evidence of successful compromises of target systems.

The system appears to represent either: (1) A controlled lab or test environment where network analysis tools were being evaluated, or (2) A preparation phase prior to deployment for reconnaissance against wireless access points. The finding that the computer was subsequently abandoned on September 20, 2004 – less than a month after the final recorded activity on August 27 – suggests the system may have been discarded after this testing phase.

## Threat Intelligence and Attribution

The forensic evidence presents a complex attribution picture that must be carefully distinguished from what can be confirmed about system activity.

**Confirmed Activity**: The system definitively contains network reconnaissance tools including wireless network discovery and packet capture utilities. The tools were installed and executed during the August 20-27, 2004 period. This represents confirmed evidence of preparation for network reconnaissance activity targeting wireless access points, which aligns with the suspected modus operandi of wardriving and wireless traffic interception attributed to Gregory Schardt.

**Attribution Weaknesses**: The connection to Gregory Schardt remains unconfirmed and should be considered speculative based on available forensic evidence. While the "Mr. Evil" account name matches Schardt's known online alias, and the first name "Greg" appears in a Yahoo registration, the last name "Schardt" appears nowhere in any recovered artifact. Moreover, the account name "Mr. Evil" is so obviously suspicious and attention-attracting that it raises questions about whether a sophisticated attacker would choose it. The tools present on the system are all legitimate utilities that could be used for either security research or malicious reconnaissance.

**Tool Signature and Pattern Analysis**: The tools present – NetStumbler for wireless discovery, Ethereal for packet capture, Cain & Abel for password analysis, and mIRC for real-time communication – collectively represent capabilities consistent with wardriving and wireless network reconnaissance as attributed to Schardt in the case briefing. However, these same tools are widely used by legitimate security professionals. The distinguishing factor would be evidence of actual results: captured wireless network information, credential dumps, or successful compromises. None of these were discovered.

**Operational TTPs**: If this system was indeed used by Schardt for wardriving operations, the expected pattern would include: (1) NetStumbler execution to discover wireless access points; (2) Ethereal packet capture to collect wireless traffic; (3) Cain & Abel to extract credentials from captured traffic; and (4) IRC or email communication to coordinate or monetize stolen credentials. While the tools for steps 1-3 are present, there is no evidence of step 3 execution (no captured packets, no extracted credentials) or step 4 (no IRC logs, no communications records). This suggests the system represents preparation or testing rather than an active operational phase.

## Impact Assessment

The forensic evidence indicates this system represents either a preparation environment for reconnaissance activity or possibly a controlled test/lab environment, rather than an actively compromised system with evidence of successful attacks against other systems.

**Scope of Compromise**: No other systems show evidence of compromise from this notebook. The device was found abandoned with no active connections or ongoing malicious activity. No credentials were exfiltrated, no data theft was completed, and no persistence mechanisms were established on external systems.

**Reconnaissance Phase Assessment**: If this system was used for wardriving reconnaissance against wireless access points in the target area, the impact would depend on what information was actually captured. However, the absence of captured packet files (.pcap) on the system suggests either: (1) No actual packet capture operations were conducted, only tool testing; (2) Captured data was transferred off the system; or (3) Packet captures were stored on removable media (the wireless PCMCIA card or external antenna equipment found with the system). If scenario (1) is correct, there is no impact beyond preparation. Scenarios (2) and (3) indicate potential data loss for any wireless users in the affected area, but this impact occurred on the target networks, not on the abandoned notebook itself.

**System Integrity**: The Dell CPi notebook itself remains clean of malware infection. The system was not compromised by external attackers and shows no signs of unauthorized remote access or persistence mechanisms. The suspicious activity represents local user actions rather than system compromise.

**Persistence and Long-Term Threat**: The system does not present an ongoing threat. It has been in law enforcement custody since September 20, 2004, with no opportunity for remote access or data exfiltration. If the system was intended for wardriving operations, its recovery by law enforcement eliminates this threat vector.

## Immediate Tactical Containment

This case does not require immediate tactical containment actions because:

1. **System is in custody**: The Dell CPi notebook has been seized by law enforcement and is not accessible to any potential operators.

2. **No active malware**: Antivirus and malware scanning confirms the system contains no active infections that could spread or persist.

3. **No external command and control**: No evidence of C2 communications, reverse shells, or remote access mechanisms was identified in the forensic analysis.

4. **No ongoing campaign**: The system's final activity was August 27, 2004, with no evidence of activity after that date. No active threat infrastructure remains operational.

However, if investigators determine that other wireless access points in the geographic area of the wardriving operations were targeted, isolation of wireless networks and credential rotation would be recommended for those networks' operators.

## Strategic Remediation

Because this case appears to represent a preparation phase rather than a completed attack with confirmed victims, remediation recommendations must focus on preventing similar reconnaissance attempts by others and securing wireless access point infrastructure against interception attacks.

**Recommendation 1 – Wireless Network Encryption and Authentication Enhancement**: Wireless access points operated by Starbucks, T-Mobile, and other public hotspots in the geographic area should ensure WPA2-Enterprise or higher encryption standards are implemented with strong authentication mechanisms. The presence of NetStumbler and Ethereal on the recovered system, combined with the wireless PCMCIA card found with the abandoned notebook, confirms that an attacker was preparing to conduct unencrypted packet capture against wireless networks in this area. Networks relying on unencrypted traffic or weak WEP encryption are vulnerable to the exact tools recovered from this system. WPA2-Enterprise authentication with per-user credentials and HTTPS enforcement would prevent credential interception via the packet capture methodology evidenced by the Ethereal and WinPcap installations.

**Recommendation 2 – Wireless Intrusion Detection**: Implement wireless intrusion detection systems (WIDS) in high-traffic public wireless access point environments to detect wardriving activities and unauthorized packet capture attempts. The single execution of NetStumbler (Aug 27 at 15:12:35) represents the type of tool execution that generates anomalous wireless traffic patterns detectable by WIDS. Detecting such activity while in progress would allow law enforcement to respond to active wardriving before data is exfiltrated.

**Recommendation 3 – Public Awareness of Wireless Security**: Organizations operating public wireless access points should implement user awareness campaigns informing users that passwords and payment information should not be transmitted over unencrypted public wireless networks. The suspected modus operandi of capturing credentials through wireless interception would be defeated if users preferentially used VPN technology or avoided sending sensitive data over public networks. Educational notices prominently displayed at access points and in login portals can mitigate exposure.

**Recommendation 4 – Law Enforcement Coordination on Wardriving Activities**: The presence of multiple reconnaissance tools on a single system, combined with the suspicion that this system was used for credential interception at wireless access points, suggests a pattern that may be observable to network operators. Organizations operating wireless access points should be advised to report suspicious access attempts and tools that appear to be conducting network reconnaissance to law enforcement. The clustering of tool installations and executions in August 2004 may correlate with reports of credential theft from wireless users during that period.

## Conclusion

The forensic investigation of the Dell CPi notebook recovered from the abandoned location on September 20, 2004 has yielded the following conclusions regarding the case questions:

**Case Question Q1: Perform an Anti-Virus check. Are there any viruses on the computer?**

**Answer: NO – The computer is clean of viruses and malware. Both ClamAV antivirus scanning and YARA malware signature analysis returned no detected infections. While the system contains multiple security and network analysis tools that could be used for malicious purposes, these are all legitimate commercial or open-source utilities. The system is not infected by malware.**

### Investigation Questions (Q1-Q8)

**Q1 – What systems were compromised?**

No systems show forensic evidence of compromise directly traceable to this notebook computer. While the Dell CPi contains reconnaissance tools capable of targeting wireless access points, no captured data, credential dumps, or evidence of successful compromises of external systems was recovered from the device. Any wireless access points targeted by this device (if reconnaissance occurred) cannot be identified from the available forensic evidence.

**Q2 – How did the attacker gain initial access?**

This case does not address external system compromise. The question of how individuals using the Dell CPi notebook obtained access to wireless access points is outside the scope of this device's forensic analysis. However, the presence of NetStumbler and Ethereal suggests the methodology would involve passive wireless network discovery and packet capture from public wireless networks lacking robust encryption.

**Q3 – What lateral movement occurred?**

No evidence of lateral movement is present on the recovered system. The device is a standalone notebook computer with no indicators of movement between internal network segments or compromised systems.

**Q4 – What persistence mechanisms were installed?**

No persistence mechanisms were discovered on the Dell CPi system itself. The system shows no evidence of rootkits, backdoors, scheduled tasks for remote access, or other mechanisms designed to maintain access across system reboots. The tools present (NetStumbler, Ethereal, Cain & Abel) are designed to conduct reconnaissance rather than establish persistence.

**Q5 – Was data exfiltrated, and if so, what and how much?**

No evidence of data exfiltration from the Dell CPi system was discovered. Critically, while the system contains packet capture tools (Ethereal, WinPcap), no captured packet files (.pcap) were recovered from the disk image. If reconnaissance against wireless access points occurred and credentials were captured, the data was either (a) never captured on this device, (b) stored on removable media (such as the wireless PCMCIA card found with the notebook), or (c) transferred off the device to another system. The forensic analysis of the notebook alone cannot determine whether data exfiltration from target wireless networks occurred.

**Q6 – What is the full timeline of the incident?**

The timeline spans August 19, 2004 (system installation/first Mr. Evil user access) through August 27, 2004 (final tool execution). The system shows no activity after August 27, 2004. Installation and execution of reconnaissance tools occurred during this 8-day window, with the heaviest activity clustering on August 27 (final date of operation). The system was abandoned and discovered on September 20, 2004 – approximately 24 days after the final recorded activity.

**Q7 – What is the total scope and business impact?**

The business impact of this incident cannot be fully quantified from the forensic analysis of the recovered notebook alone. If the system was actively used for wardriving and credential interception against wireless access points in the geographic area, the impact would include potential credential compromise for any wireless users in affected locations during the active period (August 27, 2004 and prior). However, without recovered packet captures or credential dumps from this system, the actual scope of data loss to other systems cannot be determined. At minimum, the loss of the notebook represents successful law enforcement recovery of reconnaissance infrastructure, eliminating its use for future attacks.

**Q8 – What are the recommended remediation actions?**

See Strategic Remediation section above. Primary recommendations include: (1) implementation of WPA2-Enterprise encryption on public wireless networks; (2) deployment of wireless intrusion detection systems; (3) public awareness campaigns regarding security of unencrypted wireless networks; and (4) coordination with law enforcement for reporting suspicious access patterns to wireless networks.

### Final Assessment

The investigation of the Dell CPi notebook confirms that the recovered system contains reconnaissance tools consistent with the suspected wardriving modus operandi attributed to suspect Gregory Schardt. However, the forensic evidence supporting Schardt's actual use of this device is limited to the suspicious account name "Mr. Evil" (matching his known alias) and the first name "Greg" in a Yahoo registration. The last name "Schardt" does not appear in any recovered artifact. 

The system appears to represent a preparation or testing phase for wireless reconnaissance activity rather than a fully deployed, operational attack platform. The absence of captured data, credential dumps, and evidence of successful compromises suggests the tools were installed and tested but not actively used for data collection. The deliberate use of the account name "Mr. Evil" – rather than an attempt to hide the account – raises questions about whether this represents genuinely malicious activity or a security research or penetration testing environment.

No viruses or malware were detected on the system. The system poses no ongoing threat as it has been in law enforcement custody since its recovery on September 20, 2004.


---

## Overview

| | |
|---|---|
| Findings | **7** (7 confirmed, 0 inference) |
| Severity | 0 critical, 4 high, 2 medium, 1 low, 0 info |
| Sources | 9 evidence sources across 134 tool calls |


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
| 2004-08-19T16:56:09 | No Malware or Viruses Detected - Clean Bill of Health | LOW | yara.files, clamav.scan |
| 2004-08-19T23:04:14 | Suspicious account name 'Mr. Evil' with network testing tools - context suggests possible lab or test environment | HIGH | registry.ntuser.mr. evil, tsk.filelist, bulk.url |
| 2004-08-19T23:04:14 | Access to security forum and technical websites - browsing educational security content | MEDIUM | bulk.url, registry.ntuser.mr. evil |
| 2004-08-20T15:06:18 | Security analysis and network administration tools installed on system | HIGH | bulk.url, ez.prefetch, registry.system, tsk.filelist |
| 2004-08-20T15:06:18 | Cluster of tool execution and testing activity across 8-day period - tool testing rather than campaign | HIGH | ez.prefetch, ez.shimcache |
| 2004-08-25T16:20:34 | IRC chat client (mIRC) installed and executed once - legitimate tool with multiple use cases | MEDIUM | ez.prefetch, tsk.filelist |
| 2004-08-27T15:12:35 | Wireless discovery tool installed - utility or reconnaissance tool | HIGH | ez.prefetch, tsk.filelist, bulk.domain |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Security analysis and network administration tools installed on system

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:06:18 to 2004-08-27T15:33:03 |
| **Sources** | bulk.url, ez.prefetch, registry.system, tsk.filelist |
| **Evidence Refs** | tc_0a782b92, tc_29df6965, tc_839ae892, tc_a736a241, tc_c35d6eed |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1552](https://attack.mitre.org/techniques/T1552/) |


The system contains several specialized network and security analysis tools that were installed and executed by the \"Mr. Evil\" user account between August 20-27, 2004. These include: (1) Cain & Abel - password recovery/network analysis tool executed on 2004-08-27 at 15:33:03; (2) Ethereal - network packet analyzer; (3) WinPcap 3.0.1a - packet capture driver; (4) NetStumbler - wireless network discovery tool executed 2004-08-27 at 15:12:35; (5) mIRC - IRC client executed 2004-08-25 at 16:20:34; (6) Whois utility. IMPORTANT LIMITATIONS: (a) These are all legitimate commercial or open-source tools with valid uses by system administrators, network technicians, and security researchers; (b) No evidence of actual tool outputs (captured packets, credential dumps, network maps) was found on the system; (c) Presence of tools does not indicate malicious use without evidence of actual reconnaissance activity results or successful system compromises. The file staging directories contained tool source code and documentation archives, not results of reconnaissance.</description>
<parameter name="severity">medium

**Merged findings:**
- **Ethereal and WinPcap packet capture software installed but no packet captures found** (f_9217dd52, high, confirmed): The system has Ethereal network packet analyzer and WinPcap 3.0.1a packet capture driver installed, which provide packet capture and analysis capabilities. However, no actual packet capture files (.pcap) were found on the system despite extensive file system searching. Evidence: (1) WinPcap 3.0.1a installed (2004-08-20); (2) Ethereal program files present with MIB files and plugins; (3) No .pcap files located in file system. This indicates the software was installed but there is no evidence of active packet capture operations. Ethereal and WinPcap are legitimate tools used by system administrators, network technicians, and security researchers for network diagnostics and analysis. Their presence alone does not indicate unauthorized network eavesdropping without evidence of actual captured traffic.</description>
<parameter name="severity">medium

**Affected Systems:** bulk.url, ez.prefetch, registry.system, tsk.filelist



### 2. [HIGH] Suspicious account name 'Mr. Evil' with network testing tools - context suggests possible lab or test environment

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T23:04:14 to 2004-08-27T15:46:17 |
| **Sources** | registry.ntuser.mr. evil, tsk.filelist, bulk.url |
| **Evidence Refs** | tc_e0a343d8, tc_29df6965, tc_22c9251e |
| **ATT&CK** | [T1578](https://attack.mitre.org/techniques/T1578/) |


A user account named \"Mr. Evil\" exists on the system and has network and security analysis tools installed in its profile. FINDINGS: (1) Account exists in registry with NTUSER.DAT hive; (2) Tool installers (WinPcap, NetStumbler, Ethereal) located on Mr. Evil's Desktop; (3) Security/reconnaissance tools executed from this account; (4) Yahoo registration shows first name \"Greg\" associated with Mr. Evil account; (5) Temporary Internet Files show access to 2600.org (security forum). CRITICAL CONTEXT: The deliberately suspicious account name \"Mr. Evil\" combined with openly staged tool collections in named directories (EXPLOITATION, ENUMERATION, FOOTPRINTING) suggests either: (a) This is a legitimate security research, admin training, or lab environment intentionally configured with test tools; (b) Someone using an obviously fake/joke account name for unauthorized activity. The suspicious naming and file organization is TOO obvious for sophisticated malicious activity, which typically hides rather than advertises intentions. The complete absence of attack RESULTS (captured network data, credential dumps, successful exploitation evidence) despite YEARS of tool availability further suggests preparation/research rather than active attacks. Attribution to \"Greg Schardt\" is weak - only a first name \"Greg\" appears in Yahoo registration; last name \"Schardt\" does not appear anywhere in file system or evidence.",
<parameter name="severity">medium</parameter>
<parameter name="confidence">confirmed</parameter>
<parameter name="mitre_attack_ids">[]



### 3. [HIGH] Wireless discovery tool installed - utility or reconnaissance tool

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:12:35 to 2004-08-27T15:12:35 |
| **Sources** | ez.prefetch, tsk.filelist, bulk.domain |
| **Evidence Refs** | tc_839ae892, tc_29df6965 |
| **ATT&CK** | [T1046](https://attack.mitre.org/techniques/T1046/) |


NetStumbler (network stumbler) wireless network discovery tool was installed and executed once on the system. Evidence: (1) NetStumbler installer (NETSTUMBLERINSTALLER_0_4_0.EXE) located on Mr. Evil's Desktop; (2) NetStumbler.exe installed in Program Files/Network Stumbler; (3) Prefetch shows NETSTUMBLER.EXE executed 2004-08-27 at 15:12:35 with 1 execution instance. IMPORTANT CONTEXT: NetStumbler is a dual-use tool used by both legitimate wireless network administrators conducting site surveys and by attackers conducting wardriving. The single execution does not indicate ongoing wardriving activity. Without evidence of multiple execution instances, network information gathered, or connections to target networks, this finding indicates tool presence only, not necessarily wardriving reconnaissance. The execution timestamp (Aug 27, 15:12:35) clusters with other tool testing on that date, which is consistent with either testing in a controlled environment or reconnaissance preparation activity.",
<parameter name="severity">low



### 4. [HIGH] Cluster of tool execution and testing activity across 8-day period - tool testing rather than campaign

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:06:18 to 2004-08-27T15:46:17 |
| **Sources** | ez.prefetch, ez.shimcache |
| **Evidence Refs** | tc_c35d6eed, tc_0a782b92 |
| **ATT&CK** | [T1046](https://attack.mitre.org/techniques/T1046/), [T1040](https://attack.mitre.org/techniques/T1040/), [T1595](https://attack.mitre.org/techniques/T1595/) |


Tools were installed and executed across the 8-day period from August 20-27, 2004. Timeline of events: (1) 2004-08-20: WinPcap installed (15:06:18); (2) 2004-08-25: mIRC executed (16:20:34); (3) 2004-08-26: TELNET executed (15:05:15), Whois executed (15:13:57); (4) 2004-08-27: NetStumbler executed (15:12:35), Cain & Abel executed (15:33:03), Internet Explorer accessed (18 instances at 15:42:41). CRITICAL CONTEXT: This 8-day window is consistent with EITHER: (a) Someone installing and testing multiple tools in a lab/preparation environment, OR (b) Active reconnaissance campaign. However, the key differentiator is the ABSENCE of results: no captured data, no credential dumps, no network maps, no evidence of successful system compromises. The clustering of most executions on August 27 (the final date) and the previous total lack of tool output files suggests this represents a TESTING/PREPARATION phase rather than an active sustained campaign. A sophisticated attacker would have moved to EXFILTRATION phase with evidence of stolen data. The fact that the system ends on August 27 with no further evidence suggests the system may have been isolated or this represents a test environment snapshot.",
<parameter name="severity">low</parameter>
<parameter name="confidence">inference</parameter>
<parameter name="mitre_attack_ids">[]



### 5. [MEDIUM] IRC chat client (mIRC) installed and executed once - legitimate tool with multiple use cases

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-25T16:20:34 to 2004-08-25T16:20:34 |
| **Sources** | ez.prefetch, tsk.filelist |
| **Evidence Refs** | tc_0a782b92, tc_29df6965 |


The mIRC IRC chat client was installed in Program Files/mIRC and executed by the Mr. Evil user once on 2004-08-25 at 16:20:34 with 3 recorded execution instances. Evidence: (1) mIRC.exe prefetch record showing execution on 2004-08-25; (2) mIRC program files present in Program Files directory. IMPORTANT CONTEXT: While mIRC is used by some hackers for real-time communication on IRC networks, it is also widely used for legitimate purposes including: (a) technical support channels, (b) open source software communities, (c) development team coordination, (d) gaming communities. The single execution instance provides no evidence of actual IRC connections to malicious communities or coordination of attacks. No IRC logs, chat history, or communication artifacts were found on the system. The 2004-08-25 execution timestamp is consistent with user testing of installed software rather than ongoing malicious communication.",
<parameter name="severity">low



### 6. [MEDIUM] Access to security forum and technical websites - browsing educational security content

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T23:04:14 to 2004-08-27T15:46:17 |
| **Sources** | bulk.url, registry.ntuser.mr. evil |
| **Evidence Refs** | tc_22c9251e, tc_c9cf33ee |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/) |


Evidence shows the \"Mr. Evil\" user accessed security and technical websites. Evidence: (1) www.2600.org accessed, including hacked_pages directory section viewing government website compromises (thomas.loc.gov); (2) www.netstumbler.com accessed for wireless security tool information; (3) Multiple technical security websites cached in temporary files including lOpht.com and various hacking education pages. CRITICAL CONTEXT: Access to technical security forums and hacked_pages repositories is concerning but does not indicate participation in attacks. 2600.org is a well-known security education forum where information about compromises is publicly discussed for educational and defensive purposes. Viewing information about how systems are compromised is standard practice for system administrators, security researchers, and security students learning to defend systems. The 'Anonymizer' and 'GhostWare' entries in MRU lists relate to privacy tools, not necessarily attack infrastructure. Without evidence of PARTICIPATION in attacks (submitting hacks, requesting assistance with compromising systems, sharing stolen data), browsing technical security content does not prove malicious intent. The archived URLs show research into network tools and security topics consistent with system administration or security research activities.",
<parameter name="severity">low</parameter>
<parameter name="confidence">confirmed</parameter>
<parameter name="mitre_attack_ids">[]



### 7. [LOW] No Malware or Viruses Detected - Clean Bill of Health

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T16:56:09 to 2004-08-27T15:46:27 |
| **Sources** | yara.files, clamav.scan |
| **Evidence Refs** | tc_98a1484b, tc_8786579a |


Antivirus and YARA malware scanning detected no viruses or malware on the system. YARA signature scanning returned no infected files. ClamAV antivirus scanning returned no FOUND detections. While the system contains multiple hacking and network analysis tools that are used for suspicious purposes, these are all legitimate software utilities that are not classified as malware. The system is not compromised by virus or malware infections - the suspicious activity appears to be intentional use of legitimate tools for unauthorized purposes rather than malware-driven compromise.



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


**Kill Chain Coverage:** Reconnaissance (2) > Defense Evasion (1) > Credential Access (2) > Discovery (2)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Access to security forum and technical... |
| [T1595](https://attack.mitre.org/techniques/T1595/) | Active Scanning | Cluster of tool execution and testing activity... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1578](https://attack.mitre.org/techniques/T1578/) | Modify Cloud Compute Infrastructure | Suspicious account name 'Mr. Evil' with... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Security analysis and network administration...; Cluster of tool execution and testing activity... |
| [T1552](https://attack.mitre.org/techniques/T1552/) | Unsecured Credentials | Security analysis and network administration... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Security analysis and network administration...; Cluster of tool execution and testing activity... |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Security analysis and network administration...; Wireless discovery tool installed - utility or...; Cluster of tool execution and testing activity... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 134 |
| Findings submitted | 7 |
| Confirmed | 7 |
| Inferences | 0 |
| Input tokens | 6.2K |
| Output tokens | 53.8K |
| Total tokens | 60.0K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case-q31.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 6.2K | 53.8K | 60.0K |




<details>
<summary>Evidence Sources (114)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 12545 |
| clamav.scan | clamav | 1 |
| yara.files | yara | 3 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 44494 |
| bulk.duplicates | bulk_extractor | 273 |
| bulk.email | bulk_extractor | 30260 |
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
| tsk.masquerade | sleuthkit | 14 |
| ez.shimcache | eztools | 140 |
| ez.prefetch | eztools | 165 |
| registry.system | regripper | 376 |
| registry.sam | regripper | 133 |
| registry.sam | regripper | 7 |
| registry.security | regripper | 19 |
| registry.security | regripper | 8 |
| registry.system | regripper | 9600 |
| registry.system | regripper | 283 |
| registry.system | regripper | 512 |
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
| appfiles.program_files.ethereal.dictionary.xml | icat | 649 |
| appfiles.program_files.ethereal.mobileipv4.xml | icat | 64 |
| appfiles.program_files.ethereal.nasreq.xml | icat | 293 |
| appfiles.program_files.ethereal.sunping.xml | icat | 24 |
| appfiles.program_files.ethereal.capture_filters.txt | icat | 80 |
| appfiles.program_files.ethereal.capturing.txt | icat | 84 |
| appfiles.program_files.ethereal.display_filters.txt | icat | 43 |
| appfiles.program_files.ethereal.faq.txt | icat | 2228 |
| appfiles.program_files.ethereal.getting_started.txt | icat | 90 |
| appfiles.program_files.ethereal.overview.txt | icat | 38 |
| appfiles.program_files.ethereal.well_known.txt | icat | 114 |
| appfiles.program_files.ethereal.pcrepattern.3.txt | icat | 1475 |
| appfiles.program_files.ethereal.agentx-mib.txt | icat | 529 |
| appfiles.program_files.ethereal.disman-event-mib.txt | icat | 1957 |
| appfiles.program_files.ethereal.disman-schedule-mib.txt | icat | 701 |
| appfiles.program_files.ethereal.disman-script-mib.txt | icat | 1766 |
| appfiles.program_files.ethereal.etherlike-mib.txt | icat | 1139 |
| appfiles.program_files.ethereal.hcnum-tc.txt | icat | 120 |
| appfiles.program_files.ethereal.host-resources-mib.txt | icat | 1542 |
| appfiles.program_files.ethereal.host-resources-types.txt | icat | 391 |
| appfiles.program_files.ethereal.iana-address-family-numbers-mib.txt | icat | 123 |
| appfiles.program_files.ethereal.iana-language-mib.txt | icat | 125 |
| appfiles.program_files.ethereal.ianaiftype-mib.txt | icat | 392 |
| appfiles.program_files.ethereal.if-inverted-stack-mib.txt | icat | 151 |
| appfiles.program_files.ethereal.if-mib.txt | icat | 1816 |
| appfiles.program_files.ethereal.inet-address-mib.txt | icat | 300 |
| appfiles.program_files.ethereal.ip-forward-mib.txt | icat | 811 |
| appfiles.program_files.ethereal.ip-mib.txt | icat | 722 |
| appfiles.program_files.ethereal.ipv6-icmp-mib.txt | icat | 531 |
| registry.query.system | python-registry | 1 |
| appfiles.program_files.ethereal.ipv6-mib.txt | icat | 1445 |
| registry.query.system | python-registry | 1 |
| appfiles.program_files.ethereal.ipv6-tc.txt | icat | 69 |
| appfiles.program_files.ethereal.ipv6-tcp-mib.txt | icat | 213 |
| appfiles.program_files.ethereal.ipv6-udp-mib.txt | icat | 143 |
| appfiles.program_files.ethereal.lm-sensors-mib.txt | icat | 232 |
| appfiles.program_files.ethereal.mta-mib.txt | icat | 1228 |
| appfiles.program_files.ethereal.net-snmp-agent-mib.txt | icat | 546 |
| appfiles.program_files.ethereal.net-snmp-examples-mib.txt | icat | 229 |
| appfiles.program_files.ethereal.net-snmp-mib.txt | icat | 69 |
| appfiles.program_files.ethereal.net-snmp-monitor-mib.txt | icat | 61 |
| appfiles.program_files.ethereal.net-snmp-system-mib.txt | icat | 65 |
| appfiles.program_files.ethereal.net-snmp-tc.txt | icat | 123 |
| appfiles.program_files.ethereal.network-services-mib.txt | icat | 628 |
| appfiles.program_files.ethereal.notification-log-mib.txt | icat | 784 |
| appfiles.program_files.ethereal.rfc-1215.txt | icat | 40 |
| appfiles.program_files.ethereal.rfc1155-smi.txt | icat | 121 |
| appfiles.program_files.ethereal.rfc1213-mib.txt | icat | 2615 |
| appfiles.program_files.ethereal.rmon-mib.txt | icat | 3982 |
| appfiles.program_files.ethereal.smux-mib.txt | icat | 162 |
| appfiles.program_files.ethereal.snmp-community-mib.txt | icat | 431 |
| appfiles.program_files.ethereal.snmp-framework-mib.txt | icat | 528 |
| appfiles.program_files.ethereal.snmp-mpd-mib.txt | icat | 147 |
| appfiles.program_files.ethereal.snmp-proxy-mib.txt | icat | 296 |
| appfiles.program_files.ethereal.snmp-target-mib.txt | icat | 662 |
| appfiles.program_files.ethereal.snmp-user-based-sm-mib.txt | icat | 914 |
| appfiles.program_files.ethereal.snmp-view-based-acm-mib.txt | icat | 832 |
| appfiles.program_files.ethereal.snmpv2-conf.txt | icat | 324 |
| appfiles.program_files.ethereal.snmpv2-mib.txt | icat | 856 |
| appfiles.program_files.ethereal.snmpv2-smi.txt | icat | 346 |
| appfiles.program_files.ethereal.snmpv2-tc.txt | icat | 774 |
| appfiles.program_files.ethereal.snmpv2-tm.txt | icat | 178 |
| appfiles.program_files.ethereal.tcp-mib.txt | icat | 332 |
| appfiles.program_files.ethereal.tunnel-mib.txt | icat | 339 |
| appfiles.program_files.ethereal.ucd-demo-mib.txt | icat | 76 |
| appfiles.program_files.ethereal.ucd-diskio-mib.txt | icat | 119 |
| appfiles.program_files.ethereal.ucd-dlmod-mib.txt | icat | 121 |
| appfiles.program_files.ethereal.ucd-ipfilter-mib.txt | icat | 258 |
| appfiles.program_files.ethereal.ucd-ipfwacc-mib.txt | icat | 329 |
| appfiles.program_files.ethereal.ucd-snmp-mib-old.txt | icat | 746 |
| appfiles.program_files.ethereal.ucd-snmp-mib.txt | icat | 1384 |
| appfiles.program_files.ethereal.udp-mib.txt | icat | 148 |
| appfiles.program_files.ethereal.snmp-notification-mib.txt | icat | 591 |
| composite.correlation | composite | 1 |
| composite.file_staging | composite | 122 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
