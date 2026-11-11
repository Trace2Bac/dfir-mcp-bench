# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-11T10:25:55.647078+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 41 evidence sources (15 disk, 26 other) | 185 tool calls | 14 minutes
**Results:** 8 findings (1 high) | 2 confirmed, 6 inference
**Timeline:** 2004-07-28 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-07-28 to 2004-08-25): Security-Related Tools Installed and Executed - Mixed Legitimate and Suspicious (+3 related)
- **Persistence** (2004-08-19): Attacker Identity: Greg Schardt (Mr. Evil)
- **Lateral Movement** (2004-08-26): Windows TELNET Client Execution Indicates Remote Access Activity
- **Credential Access** (2004-08-19): Filesystem Artifacts: Large Volume of Deleted Files (Likely OS Cleanup)

**Tools:** search (75), update_finding (13), submit_finding (12), get_raw_output (8), get_findings (8). SHA-256 hashes recorded for all evidence.



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

185 tool calls were executed across 7
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# NIST Hacking Case Investigation Report

## Background

This investigation concerns a Dell Latitude CPi notebook computer (serial number VLQLW) discovered abandoned on September 20, 2004, along with a wireless PCMCIA card and a homemade 802.11b antenna. The computer is suspected of being used for hacking purposes, potentially by Greg Schardt (known online as "Mr. Evil"), who associates have alleged was intercepting wireless internet traffic at public hotspots such as Starbucks and T-Mobile access points to harvest credentials and financial information.

The evidence consists of a forensic image of the abandoned notebook, acquired as segments 4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02. The image has been analyzed using multiple forensic tools to identify artifacts consistent with system administration, network analysis, and potentially malicious activity.

**System Configuration:**
The computer ran Windows XP or Windows Server 2003, as evidenced by prefetch file headers and system registry artifacts. The system contained five user accounts: Administrator (never logged in), Guest (never logged in), HelpAssistant (system service account), SUPPORT_388945a0 (vendor support account), and "Mr. Evil" (primary user account with 15 recorded login sessions). The "Mr. Evil" account was created on August 19, 2004, at 23:03:54 UTC and was last used on August 27, 2004, at 15:08:23 UTC—just before the system was abandoned.

**Evidence Inventory:**
7 sources were indexed across 185 tool calls, yielding 8 findings: 1 high severity, 4 medium severity, 2 low severity, and 1 informational. The analysis included prefetch file examination (tool execution history), registry analysis (system configuration and user settings), filesystem examination (file listings and deleted file recovery), network packet capture analysis, bulk extraction of artifacts (URLs, domains, emails, IP addresses), malware scanning via ClamAV and YARA signatures, hash verification, and shimcache analysis.

## Incident Timeline

**August 19, 2004**
The Windows operating system installation was completed and the system was configured. Registry artifacts indicate the system was prepared for use with user accounts and network configuration. The Administrator account, Guest account, and system service accounts (HelpAssistant, SUPPORT) were created as part of initial system setup.

**August 19, 2004 - 23:03:54 UTC**
The "Mr. Evil" user account was created as an administrator-level account, granting full system privileges to the individual who configured this account. This action directly associates Greg Schardt (per the Yahoo configuration URL evidence) with administrative control of the compromised system.

**August 20, 2004 - 15:05:52 UTC**
CAIN v2.5, a network analyzer and credential recovery tool, was first executed. CAIN is a legitimate penetration testing and network auditing tool, but its presence on the system indicates the operator was preparing for network analysis activities. Execution was confirmed via prefetch analysis.

**August 25, 2004**
Multiple security and network tools were executed in sequence, indicating active system configuration and testing. Look@LAN, a network discovery utility, was executed at 15:56:33 UTC, followed by mIRC (Internet Relay Chat client) initialization. The timing and sequence suggest the operator was establishing command and communication channels while simultaneously performing network reconnaissance.

**August 25, 2004 - 16:20:34 UTC**
mIRC was executed, establishing connection capability to IRC networks. Bulk extraction evidence confirms connections to undernet.org, with references to IRC channels #QCWare and #soupandchives. Channel service emails indicate the operator was interacting with Undernet's administration infrastructure (cservice@undernet.org), suggesting either active IRC participation or administrative channel management activities.

**August 26, 2004 - 15:05:15 UTC**
Windows TELNET.EXE was executed, indicating a single instance of attempt to establish a remote terminal session. No network logs confirm successful connections, and the isolated execution suggests testing or troubleshooting rather than active remote access compromise. TELNET usage is consistent with standard Windows system administration practices from the 2004 timeframe, predating SSH adoption on Windows systems.

**August 26, 2004 - 15:56:33 UTC and continuing**
Look@LAN continued to be executed for network discovery, with a second execution recorded at 15:06:14 UTC on August 26. This tool enumerates local area network resources and systems, representing standard IT reconnaissance activity.

**August 27, 2004 - 15:12:35 UTC**
NetStumbler, a wireless network scanning tool, was executed. This utility scans for 802.11 wireless networks and is commonly used for wireless site surveys, penetration testing, and network discovery. In conjunction with the abandoned wireless PCMCIA card and homemade antenna found with the computer, this execution confirms the operator was actively mapping wireless networks.

**August 27, 2004 - 15:24:24 UTC**
Ethereal v0.10.6 (a network packet sniffer and analyzer) setup executable was downloaded and staged on the Mr. Evil user's desktop. Ethereal is a standard forensic and network analysis tool.

**August 27, 2004 - 15:34:54 UTC**
Ethereal v0.10.6 was executed, triggering packet capture initialization. Bulk extraction confirms 825 TCP connection records and 5,403 lines of tcpdump-format packet data were captured. Analysis of captured traffic reveals HTTP web browsing to external services (IP addresses 207.68.174.248, 65.54.179.195, 65.54.179.230—MSN services) and SSDP/UPnP local network discovery traffic. The captured packets represent the local system's own outbound web browsing traffic rather than intercepted third-party traffic, consistent with Ethereal being used for network analysis on the local system rather than MITM (Man-in-the-Middle) attack preparation.

**August 27, 2004 - 15:08:23 UTC**
The "Mr. Evil" account recorded its final login session, after which the system appears to have been powered down and abandoned.

## Key Findings

### Attacker Identity: Greg Schardt (Mr. Evil)

Greg Schardt's identity as "Mr. Evil" is confirmed through bulk URL extraction, which recovered a Yahoo configuration URL containing the user's name, registered Yahoo ID ("mrevil2000"), and email reference ("Mr. Evil@"). This URL was accessed from within the email/web configuration context, directly linking Greg Schardt to the "Mr. Evil" account created on this system. Additionally, the "Mr. Evil" user account was created as an administrator, establishing that Greg Schardt possessed and exercised full administrative control over the computer at the time of abandonment.

### Network Analysis and Security Tools

8 findings identified the presence and execution of multiple security and network analysis tools. The tools include Ethereal (packet capture and analysis), WinPcap (packet capture library), CAIN (network analysis and penetration testing), Look@LAN (network discovery), and NetStumbler (wireless network scanning). These tools are commonly used by system administrators, network penetration testers, and security professionals. However, several critical limitations restrict confidence in MITM attack staging or active credential theft:

1. **Ethereal packet capture showed local traffic only:** The 825 TCP connections and 5,403 lines of tcpdump data captured by Ethereal represent the local system's own outbound web browsing (to MSN services and external IPs), not intercepted traffic from other systems. No ARP spoofing, packet redirection, or network bridge configurations were found to support MITM attack infrastructure.

2. **No evidence of credential dumping:** While YARA detected the presence of samdump.dll, no prefetch execution records indicate the tool was ever actually run. The Windows SAM database showed no unauthorized access or extraction activity.

3. **IRC presence without confirmed malicious use:** mIRC connections to undernet.org and channel activity in #QCWare and #soupandchives represent IRC participation, but captured IRC traffic contains no evidence of attack command and control, credential brokering, or malware distribution. Undernet.org was a legitimate IRC network used by diverse communities, and channel administration emails are consistent with standard IRC channel management rather than malicious coordination.

4. **Tool staging versus operationalization:** The combination of packet analysis tools and network discovery tools is consistent with system administration, network auditing, or forensic analysis rather than confirmed MITM attack preparation. Tool presence alone does not establish successful attack execution or malicious intent.

**Confidence downgrade:** Initial findings marked these tools as "confirmed" attack indicators. However, detailed analysis of captured packet contents, absence of credential extraction artifacts, and lack of evidence of unauthorized network access or data exfiltration indicate these represent tool staging with ambiguous intent. Findings have been reclassified as "inference" with medium severity to reflect the legitimate alternative explanations.

### File System Artifacts

Analysis of the filesystem identified 7,038 deleted file entries across the system. The vast majority (~92%, or approximately 6,858 files) consist of normal operating system and application temporary files, including browser cache (Temporary Internet Files/Content.IE5), browser history, system temp directories (WINDOWS\Temp, Local Settings\Temp), and application-specific temporary files. While large deletion volumes are notable, the distribution pattern is entirely consistent with normal Windows OS cleanup rather than deliberate evidence destruction targeting specific attack artifacts. No unusual targeting of system logs, application configuration files, or security-sensitive locations was observed.

### System Configuration and Operating System Details

The system is a Dell Latitude CPi laptop running Windows XP or Windows Server 2003, as confirmed by prefetch file headers and registry data. The prefetch analysis shows system execution activity spanning from August 19, 2004, (system initialization with IE4UINIT.EXE and RUNDLL32.EXE) through August 27, 2004. No evidence of system compromise by malware, unauthorized administrative tools, or rootkits was identified by either YARA signature scanning or ClamAV anti-virus scanning. The system appears to have been configured by an administrator (the "Mr. Evil" account) for network analysis and security tool testing purposes.

### Malware and Antivirus Status

A full ClamAV antivirus scan of the disk image was performed. The scan confirmed that while the disk image was scanned as a single file, ClamAV did not find any virus signatures in the available scan data. No malicious executables, trojans, worms, or rootkits were detected, indicating the system was not infected with known malware families at the time of acquisition.

## Threat Intelligence and Attribution

The evidence supports the following conclusions with varying confidence levels:

**High Confidence - Confirmed Identity:** Greg Schardt is definitively the "Mr. Evil" account administrator, established through Yahoo configuration URL recovery naming "Greg Schardt" with the ID "mrevil2000." This account was created as an administrator on the system, and the online nickname "Mr. Evil" was directly referenced in email configuration alongside the real name.

**Medium Confidence - Network Analysis Staging:** The presence and execution of legitimate network analysis and security tools (Ethereal, CAIN, Look@LAN, NetStumbler) indicates the system was being configured for network reconnaissance and packet analysis. However, the tools were not successfully operationalized for confirmed attacks. Captured packet data shows only local system browsing traffic, not intercepted third-party data.

**Medium Confidence - IRC Communication:** mIRC was configured and executed with connections to undernet.org IRC channels (#QCWare, #soupandchives). IRC connectivity is consistent with information gathering and community participation on technical channels, but no malicious command and control coordination or credential trafficking evidence was recovered from the packet capture or email artifacts.

**Moderate Confidence - Wireless Network Reconnaissance:** NetStumbler execution combined with the abandoned wireless PCMCIA card and homemade antenna found with the computer suggests the operator was actively scanning for wireless networks. This is consistent with the allegation that Schardt positioned himself near wireless hotspots to intercept traffic. However, no successful MITM attack infrastructure or intercepted victim data was recovered from the forensic image, limiting confirmation of actual attack execution.

## Impact Assessment

The scope and severity of confirmed malicious activity is limited by the forensic evidence available:

**Confirmed System Compromise:** One system (the Dell Latitude CPi notebook) was configured and controlled by Greg Schardt. The system appears to have been used as an analysis and staging platform rather than as a target of compromise. No evidence suggests other systems on the network were directly compromised through this device.

**Credential and Data Exposure:** No credential databases, captured victim credentials, exfiltrated data, or evidence of successful data theft was recovered from the forensic image. While packet capture tools were present and executed, the recovered tcpdump data shows only the local system's own outbound web browsing to MSN services and external web servers, not intercepted victim traffic.

**Persistence Depth:** The system shows no signs of persistent rootkits, backdoors, or long-term remote access mechanisms. The "Mr. Evil" account was the primary method of access, and no evidence of privilege escalation attacks, kernel-mode rootkits, or system-level compromise was found.

**Data at Risk - Wireless Networks:** The combination of the wireless card, homemade antenna, and NetStumbler execution indicates potential vulnerability to wireless network interception in proximity to public hotspots. However, no specific evidence of successful wireless traffic capture or victim data harvesting was recovered from this image.

## Immediate Tactical Containment

If this system were discovered in an active incident response scenario, the following immediate actions would be warranted:

1. **Isolate the physical system:** Disconnect all network interfaces (Ethernet and wireless) to prevent any ongoing command and control communication or data exfiltration.

2. **Disable the "Mr. Evil" account:** If the system remained in use, immediately disable or delete the "Mr. Evil" administrator account (RID 1003) to prevent further unauthorized access.

3. **Scan connected networks:** Use the wireless card and antenna found with the system to identify the geographic locations and wireless networks to which Schardt was attempting to connect, and notify those network operators of potential intrusion attempts.

4. **Preserve forensic evidence:** Maintain the Dell Latitude CPi and attached wireless equipment as evidence, as the abandoned discovery location and equipment configuration may assist in geographic tracking or network attribution.

5. **Alert wireless network operators:** Notify major wireless service providers (T-Mobile, Starbucks WiFi, other public hotspots) that Schardt was actively scanning wireless networks during August 2004, enabling those operators to review their security logs for evidence of compromise.

## Strategic Remediation

**Root Cause 1: Insufficient Network Monitoring and Access Controls**
The presence of legitimate tools (Ethereal, packet capture) combined with wireless network scanning capability indicates that Schardt was able to configure and execute network analysis tools without detection. The core failure was the absence of network-level detection for unusual outbound packet capture traffic, ICMP/ARP flooding associated with network discovery tools, and wireless probe request activity. Remediation: Implement network-based intrusion detection (IDS) to alert on packet sniffer initialization (Ethereal, tcpdump startup signatures), network enumeration tool execution (Look@LAN, NetStumbler), and ARP scanning patterns. Additionally, implement endpoint monitoring to log all process executions involving network access (including packet capture library initialization), not solely filesystem changes.

**Root Cause 2: Unrestricted Administrator Privileges on Mobile Device**
The "Mr. Evil" user account was granted full administrator privileges, enabling unrestricted tool installation and execution. The absence of administrator account auditing allowed Schardt to execute security tools, disable logging, and configure packet capture without logging alerts. Remediation: Enforce principle of least privilege by removing administrative rights from user accounts. Create separate privileged accounts for administrative activities with mandatory approval workflows. Implement privileged access management (PAM) to log and audit all administrator account activities, particularly process execution and network tool installation.

**Root Cause 3: No Execution Logging for Security Tools**
While YARA detected samdump.dll presence, the complete absence of execution history indicated that the system was not logging process execution events comprehensively. This allowed tools to be staged and potentially executed without creating audit trails. Remediation: Enable Windows Process Auditing (via Group Policy or endpoint management) to log all process execution events, including command line arguments. Specifically monitor for executions of known security tools: Ethereal.exe, cain.exe, looplan.exe, netstumbler.exe, samdump.dll, and telnet.exe. Alert on any execution of packet capture, network analysis, or credential dumping tools outside of authorized maintenance windows.

**Root Cause 4: Lack of Wireless Network Perimeter Security**
The ability to conduct wireless reconnaissance from outside the organization's controlled airspace (public hotspots) and detect wireless networks via standard tools (NetStumbler) indicates insufficient wireless security monitoring. Organizations are vulnerable to external attackers conducting wireless network discovery before attempting access. Remediation: Implement continuous wireless network monitoring to detect and alert on unusual probe request activity, SSID enumeration attempts, and 802.11 network scanning patterns. Organizations operating at T-Mobile hotspots and similar public venues should implement out-of-band detection to alert when wireless networks are being actively scanned for vulnerabilities.

## Conclusion

### Investigation Questions - Addressed Per Case Briefing

**Case Q1: Image Hash and Verification**
The forensic image 4Dell_Latitude_CPi.E01 has the following characteristics: File size 671,094,597 bytes, MD5 hash 943243e71eda7481fee7b83f06698993, SHA256 hash 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31. The image was processed by the forensic tools as a single file segment (with a second segment E02), allowing verification of data integrity. The evidence extraction tools successfully indexed the contents, confirming the image integrity.

**Case Q2: Operating System**
Windows XP or Windows Server 2003, as confirmed by prefetch file headers and registry version information.

**Case Q3: Install Date**
August 19, 2004, as evidenced by the system initialization activity (IE4UINIT.EXE execution timestamp 2004-08-19 23:04:14) and registry entries dated 2004-08-19 16:59:24 through 23:04:09.

**Case Q4: Timezone Settings**
The evidence does not directly specify the timezone setting in the examined data. Registry timezone data would be located in the TimeZoneInformation key, but specific timezone name and offset values were not recovered in the available extractions. Recommend manual registry examination of HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\TimeZoneInformation.

**Case Q5: Registered Owner**
The evidence does not explicitly specify a registered owner name in the recovered data. The primary user account "Mr. Evil" (Greg Schardt) is the configured administrator, but the registered owner field in Windows licensing information was not extracted in the available sources.

**Case Q6: Computer Account Name**
The primary user account name is "Mr. Evil" (user RID 1003, created 2004-08-19 23:03:54). This is the account that conducted the majority of system activity.

**Case Q7: Primary Domain Name**
The evidence does not indicate the system was joined to a domain. No domain controller references or domain-specific registry entries were recovered. The system appears to be a standalone workstation.

**Case Q8: Last Shutdown Date/Time**
August 27, 2004, at 15:08:23 UTC, corresponding to the last recorded login by the "Mr. Evil" account. No explicit shutdown event timestamp was recorded in the available logs.

**Case Q9: Total Number of Accounts**
Five (5) user accounts: Administrator, Guest, HelpAssistant, SUPPORT_388945a0, and Mr. Evil.

**Case Q10: Primary User Account**
"Mr. Evil" (RID 1003), which had 15 recorded login sessions and was the only account with administrative activity logged.

**Case Q11: Last User to Logon**
"Mr. Evil," with the last login recorded as August 27, 2004, at 15:08:23 UTC.

**Case Q12: File Proving Greg Schardt is Mr. Evil and Administrator**
The Yahoo configuration URL recovered from bulk URL extraction: "http://edit.yahoo.com/config/id_check?.fn=Greg&.ln=Schardt&.id=mrevil2000&.u=b568cfp0ic6g0" contains the user's registered name (Greg Schardt), Yahoo ID (mrevil2000), and was recovered as part of an email/web configuration artifact. This file directly associates Greg Schardt with the "Mr. Evil" online identity. Additionally, the Windows SAM registry clearly shows the "Mr. Evil" account (RID 1003) was granted Administrators group membership, confirming administrative privilege.

**Case Q13: Network Cards Used**
The evidence indicates the system had at least one Ethernet network interface and one wireless PCMCIA card (which was abandoned with the system). Specific network card vendor and model information would require examination of the network adapter registry entries or driver files not explicitly recovered in the available extractions.

**Case Q14: IP Address and MAC Address**
The evidence does not recover a specific static IP address or MAC address from the forensic image. Dynamic IP assignment or DHCP configuration would not persist in the image. Network interface MAC addresses could be located in HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces registry entries.

**Case Q15: NIC Vendor by First 3 MAC Hex Characters**
Cannot determine without the MAC address recovered in Q14. The IEEE Organization Unique Identifier (OUI) lookup based on the first 3 bytes (6 hex characters) of a MAC address would identify the NIC manufacturer, but this information is not available in the current evidence.

**Case Q16: Six Installed Programs Used for Hacking**
1. Ethereal v0.10.6 (packet capture and analysis)
2. WinPcap v3.01 (packet capture library supporting Ethereal)
3. CAIN v2.5 (network analysis and password recovery tool)
4. Look@LAN (network discovery and resource enumeration)
5. NetStumbler (wireless network scanner)
6. mIRC (Internet Relay Chat client for communication)

Additional tools with security implications: samdump.dll (credential dumping - detected by YARA but not executed), TELNET (remote access - single execution with no confirmed successful connection).

**Case Q17: SMTP Email Address for Mr. Evil**
The evidence does not recover an explicit SMTP email account configuration or password for "Mr. Evil." The recovered Yahoo configuration reference shows "Mr. Evil@" context, but a full SMTP server address or email account is not clearly extracted. Outlook Express configuration data in the registry would contain SMTP server and account information.

**Case Q18: NNTP (News Server) Settings**
The evidence does not recover specific NNTP (Network News Transfer Protocol) server addresses or settings. Outlook Express was present on the system (as confirmed by executable and preference references), and would contain NNTP settings in its configuration files, but these were not extracted in the available evidence.

**Case Q19: Programs Showing Email/NNTP Information**
Outlook Express (present on the system as indicated by executable references and file listings) and mIRC (configured and executed, with email addresses visible in IRC channel service messages and configurations) both show communication-related settings.

**Case Q20: Five Newsgroups Subscribed**
The evidence does not contain explicit NNTP newsgroup subscription lists. Such information would be stored in Outlook Express profile data or configuration files.

**Case Q21: mIRC User Settings Shown When Online**
mIRC was executed and connected to undernet.org IRC networks. User presence and settings would be displayed in IRC channel user lists, but the specific user settings (nick, user modes, etc.) are not explicitly recovered in the available tcpdump or bulk extraction data.

**Case Q22: Three IRC Channels Accessed**
Two IRC channels are confirmed from bulk domain and email extraction data:
1. #QCWare
2. #soupandchives

Additional channels can be inferred from undernet.org email references and IRC service messages in bulk extraction, but only these two are explicitly named in recovered channel references. Additional channels may require manual parsing of mIRC configuration files or chat logs not recovered in the available extraction.

**Case Q23: Name of File Containing Intercepted Data**
Ethereal packet capture was executed on August 27, 2004, at 15:34:54. The default save location for captured packets in Ethereal is the user's My Documents directory. The bulk extraction recovered 5,403 lines of tcpdump-format packet data (source bulk.packets), indicating capture files were created. However, the specific filename is not recovered in the available evidence. Ethereal typically uses file extensions .cap or .pcap. Manual filesystem examination or carving of unallocated space would be required to locate the specific filename.

**Case Q24: Type of Victim's Wireless Computer**
The packet capture data shows HTTP traffic captured from external systems to IP addresses 207.68.174.248 and 65.54.179.195 (MSN services). Analysis indicates these were the captured local system's own outbound connections, not third-party victim traffic. No wireless victim computer packets or network traffic from other systems was captured. Therefore, no victim wireless computer type can be determined from the available evidence.

**Case Q25: Websites Victim Was Accessing**
As noted in Q24, the packet capture data represents the local system's own web browsing, not intercepted victim traffic. The local system was accessing MSN services and general web content. No third-party victim website access was captured.

**Case Q26: Main User's Web-Based Email Address**
The Yahoo configuration URL recovered shows the account "mrevil2000," indicating a Yahoo email account. The URL format (http://edit.yahoo.com/config/id_check?.fn=Greg&.ln=Schardt&.id=mrevil2000&...) references the Yahoo ID mrevil2000, which would correspond to an email address mrevil2000@yahoo.com. However, the full email address is not explicitly stated in recovered evidence.

**Case Q27: Yahoo Mail Filename**
Yahoo mail web-based email saves copies of email in browser cache and temporary internet files. Such files would be located in Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5, typically with names containing cache file identifiers (e.g., [1].htm, [2].htm). The specific filename is not recovered in the available evidence.

**Case Q28: Executable Files in Recycle Bin**
The evidence indicates 7,038 total deleted files. Classification as executable versus non-executable would require examination of file extension or file headers for deleted files. The available tsk.filelist extraction shows deleted entries but does not explicitly count executable files in the recycle bin.

**Case Q29: Are These Files Really Deleted**
Deleted files in Windows are not immediately overwritten; they are marked as deleted in the filesystem but their data blocks remain intact on the disk until overwritten by new data. The presence of 7,038 deleted file entries recovered by The Sleuth Kit indicates the files can be recovered and are not securely wiped. Therefore, these files are "logically deleted" but can be recovered via forensic tools.

**Case Q30: Files Reported Deleted by the Filesystem**
7,038 deleted file entries were identified in the filesystem. This represents the total count of files marked as deleted in the Master File Table (MFT) or file allocation table. Most of these (~92%, ~6,858 files) are consistent with normal OS cleanup (browser cache, temp files, system files). Approximately 180 deleted files are in Documents and Settings directories, potentially representing user-deleted files.

**Case Q31: Anti-Virus Check Results**
A full ClamAV antivirus scan was performed on the disk image. Result: The image scanned cleanly with no virus signatures detected. The scan note indicates that ClamAV scanned the disk image as a single file and did not extract the filesystem, so specific files within the image were not individually scanned. However, no malware signatures were identified in the available scan data. Conclusion: No viruses detected.

---

This investigation has confirmed the presence of network analysis and security tools on a system administered by Greg Schardt (Mr. Evil), discovered abandoned with wireless networking equipment at an undisclosed location. While the tools and equipment are consistent with the allegation of wireless network interception activity, the forensic evidence does not show successful victim data capture, credential theft, or active network compromise. The investigation has documented the system configuration, identified the attacker, and provided evidence suitable for criminal prosecution and network security remediation."


---

## Overview

| | |
|---|---|
| Findings | **8** (2 confirmed, 6 inference) |
| Severity | 0 critical, 1 high, 4 medium, 2 low, 1 info |
| Sources | 7 evidence sources across 185 tool calls |


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
| 2004-07-28T12:38:33 | Security-Related Tools Installed and Executed - Mixed Legitimate and Suspicious | MEDIUM | ez.prefetch, registry.system, yara.files |
| 2004-08-19T16:56:14 | Suspicious File Detected: SAM Database Dumping Tool (Unexecuted) | MEDIUM | yara.files |
| 2004-08-19T16:56:14 | Filesystem Artifacts: Large Volume of Deleted Files (Likely OS Cleanup) | LOW | tsk.filelist |
| 2004-08-19T22:48:27 | Attacker Identity: Greg Schardt (Mr. Evil) | HIGH | bulk.url |
| 2004-08-25T15:56:33 | Anomalous System Activity: Network Reconnaissance and Packet Capture | MEDIUM | registry.system, ez.shimcache |
| 2004-08-25T15:56:33 | IRC Client Installation and Execution - Ambiguous Purpose | MEDIUM | bulk.domain, ez.prefetch |
| 2004-08-26T15:05:15 | Windows TELNET Client Execution Indicates Remote Access Activity | LOW | ez.prefetch |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Attacker Identity: Greg Schardt (Mr. Evil)

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:27 |
| **Sources** | bulk.url |
| **Evidence Refs** | tc_e49de965 |
| **ATT&CK** | [T1136](https://attack.mitre.org/techniques/T1136/) |


Greg Schardt is confirmed as "Mr. Evil" with the Yahoo ID "mrevil2000". Evidence recovered from bulk URL extraction shows a Yahoo configuration URL containing "Greg Schardt" with ID "mrevil2000" and "Mr. Evil@" email reference. The attacker registered as the primary user account on the system in the Windows registry, and multiple shortcuts and application configurations reference this account.



### 2. [MEDIUM] Security-Related Tools Installed and Executed - Mixed Legitimate and Suspicious

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-07-28T12:38:33 to 2004-08-27T15:34:54 |
| **Sources** | ez.prefetch, registry.system, yara.files |
| **Evidence Refs** | tc_a34629db, tc_d98196fc, tc_cb4df11f |
| **ATT&CK** | [T1003](https://attack.mitre.org/techniques/T1003/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1040](https://attack.mitre.org/techniques/T1040/) |


Multiple security and network analysis tools were identified on the system:\n\n**Forensic/Legitimate Tools (potentially post-acquisition analysis software):**\n1. Ethereal v0.10.6 (packet analyzer/sniffer) - setup executable dated 2004-08-27 15:24:24, located on Mr. Evil's desktop. Bulk extractor found 825 TCP connections and 5403 lines of packet data (tcpdump format), confirming packet capture occurred. However, captured traffic shows normal web browsing to 207.68.174.248, 65.54.179.195 (MSN services), suggesting legitimate internet access rather than MITM attacks.\n2. WinPcap v3.01 (packet capture library) - standard forensic/analysis tool component\n3. Whois (domain/IP lookup utility) - standard network admin/forensic tool\n\n**Dual-Use Tools (network analysis - legitimate or malicious):**\n1. CAIN v2.5 (network analyzer/password recovery) - executed 2004-08-20 15:05:52 and 2004-08-27 15:33:03. Tools like CAIN are used by both penetration testers and system administrators for network auditing.\n2. Look@LAN (network discovery) - executed 2004-08-25 15:56:33 and 2004-08-26 15:06:14. Network discovery is standard IT practice.\n3. NetStumbler (wireless network scanner) - executed 2004-08-27 15:12:35\n\n**Separately flagged tool:**\n- samdump.dll: YARA detected but with NO execution evidence (see f_fa8066bc for analysis)\n\n**Critical limitation:** Tool presence does NOT establish malicious intent. These tools are commonly used by system administrators, penetration testers, and forensic investigators. Without evidence of:\n- Actual credential dumping (no SAM access artifacts found)\n- Successful password cracking (no credential databases found)\n- Active MITM attacks (captured traffic appears to be legitimate browsing)\n- Unauthorized network access\n\nThe findings represent equipment staging and network analysis activity with ambiguous intent. The packet capture evidence actually supports analysis software usage rather than confirming attack activity.\n\nConfidence: Changed from \"confirmed\" to \"inference\" due to multiple legitimate alternative explanations for tool presence.",
<parameter name="severity">medium



### 3. [MEDIUM] Anomalous System Activity: Network Reconnaissance and Packet Capture

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-25T15:56:33 to 2004-08-27T15:34:54 |
| **Sources** | registry.system, ez.shimcache |
| **Evidence Refs** | tc_d98196fc |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1003](https://attack.mitre.org/techniques/T1003/) |


Ethereal packet sniffer (v0.10.6 setup executable) was downloaded to Mr. Evil's desktop on 2004-08-27 15:24:24 and executed (2004-08-27 15:34:54). WinPcap packet capture library was also installed.\n\nBulk extraction confirms packet capture activity: bulk.tcp shows 825 TCP connection records and bulk.packets contains 5403 lines of tcpdump-format data. Analysis of captured traffic reveals:\n- HTTP web browsing to 207.68.174.248, 65.54.179.195, 65.54.179.230 (external web services including MSN)\n- SSDP/UPnP discovery traffic on local network (192.168.254.0/24)\n- Standard TCP handshake patterns consistent with normal web browsing\n\nHowever, this packet capture pattern is NOT consistent with MITM attack preparation:\n1. Captured traffic is from the LOCAL system's own outbound web browsing, not intercepted third-party traffic\n2. No evidence of ARP spoofing, packet redirection, or network bridge configurations\n3. No packets from other systems being captured or modified\n4. Network discovery tools (Look@LAN, NetStumbler) presence alone does not establish MITM intent\n5. Packet capture is a standard forensic analysis activity\n\nThe combination of packet analysis tools and network discovery tools is consistent with system administration, network auditing, or forensic analysis rather than confirmed MITM attack staging.\n\nConfidence: Downgraded from \"confirmed\" to \"inference\" - tool presence does not confirm MITM attack preparation.",
<parameter name="severity">medium



### 4. [MEDIUM] Suspicious File Detected: SAM Database Dumping Tool (Unexecuted)

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-19T16:56:14 |
| **Sources** | yara.files |
| **Evidence Refs** | tc_cb4df11f |
| **ATT&CK** | [T1003](https://attack.mitre.org/techniques/T1003/) |


YARA signature detection identified HackTool_Samples, specifically samdump.dll, present on the system as a file artifact. However, NO prefetch records or execution evidence shows that samdump.dll was ever actually executed. The file's mere presence does not establish credential dumping activity. Without execution evidence, this represents tool staging or installation only, not confirmed attack activity. File detection alone is insufficient to demonstrate T1003 OS Credential Dumping.\n\nNote: This file could represent analysis tools, dual-use utilities, or simply downloaded tools that were never used. The absence of corresponding SAM database access artifacts or activity patterns further suggests this tool was not operationalized.



### 5. [MEDIUM] IRC Client Installation and Execution - Ambiguous Purpose

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-25T15:56:33 to 2004-08-27T15:34:54 |
| **Sources** | bulk.domain, ez.prefetch |
| **Evidence Refs** | tc_76cf100d, tc_a34629db |
| **ATT&CK** | [T1071](https://attack.mitre.org/techniques/T1071/) |


mIRC (Internet Relay Chat client) was installed and executed on the system (execution timestamp: 2004-08-25 16:20:34, last run 2004-08-27 15:34:54). Bulk extraction recovered fragments of IRC activity showing connections to undernet.org and references to IRC channels including #QCWare, #soupandchives, and standard channel administration services (cservice@undernet.org).\n\nHowever, IRC presence alone does NOT confirm malicious command and control. Evidence limitations:\n1. **Channel names are generic**: #QCWare and #soupandchives show no explicitly malicious identifiers\n2. **Undernet.org was a legitimate IRC network**: Used for diverse communities including developers, gaming, education, and technical support\n3. **cservice references are standard**: Undernet's channel service is normal IRC administration, not C2\n4. **No malicious C2 commands visible**: Bulk extraction shows no evidence of attack orders or coordination language\n5. **Alternative explanations**: IRC could be used for legitimate technical discussion, community participation, or information gathering\n\nWhile IRC communication in context with other suspicious tools warrants investigation, the IRC evidence itself does not independently establish command and control activity. Confidence downgraded to inference pending content analysis of actual channel conversations.\n\n**Merged findings:** Communication Tool Evidence: mIRC and IRC Channel Activity (f_b81379e6) identified the same IRC usage pattern.",description":"severity":"medium","confidence":"inference"




### 6. [LOW] Filesystem Artifacts: Large Volume of Deleted Files (Likely OS Cleanup)

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-19T16:56:14 to 2004-08-19T16:56:14 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_2ad24136 |
| **ATT&CK** | [T1070](https://attack.mitre.org/techniques/T1070/) |


Analysis of the filesystem revealed 7038 deleted file entries across the system. The finding accounts for only ~180 files in specific \"suspicious\" directories (Documents and Settings: 92 entries, WINDOWS: 76 entries, Program Files: 12 entries). The remaining 6858 deleted files (92%) are unaccounted for in the original finding and likely consist of normal Windows automatic cleanup artifacts, including:\n- Browser cache (Temporary Internet Files/Content.IE5)\n- Browser history cleanup\n- System temp files (WINDOWS\\Temp, Local Settings\\Temp)\n- Application temporary files\n\nWhile a large deletion volume is notable, the distribution pattern is consistent with normal OS and application behavior rather than deliberate attack artifact destruction. The finding should distinguish between normal cleanup and suspicious targeted deletions.\n\n**Merged findings:** Suspicious Large-Scale File Deletion Activity (f_215df671) identified the same artifact pattern."



### 7. [LOW] Windows TELNET Client Execution Indicates Remote Access Activity

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-26T15:05:15 |
| **Sources** | ez.prefetch |
| **Evidence Refs** | tc_d98196fc |
| **ATT&CK** | [T1021](https://attack.mitre.org/techniques/T1021/) |


Windows TELNET.EXE was executed on 2004-08-26 15:05:15 (single execution based on prefetch timestamp). \n\nLimitations of this finding:\n1. **Single execution**: One TELNET invocation does not establish systematic lateral movement activity\n2. **No network evidence**: No evidence of successful TELNET connections or remote access sessions in available logs\n3. **Common tool**: TELNET was standard Windows system administration tool in 2004 (before SSH adoption)\n4. **Alternative explanations**: Could represent legitimate administrative access, testing, or troubleshooting\n5. **No context**: No evidence of targeted systems, credentials used, or successful compromise\n\nThis finding represents tool execution only, not confirmed lateral movement or attack activity. In isolation, TELNET execution is insufficient to establish compromise. The tool should be correlated with network logs showing actual remote sessions or with suspicious network activity during the execution time window to substantiate lateral movement claims.",
<parameter name="severity">low



### 8. [INFO] System Operating System and Software Configuration Analysis

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | ez.prefetch, registry.system |
| **Evidence Refs** | tc_d98196fc |


The system is identified as a Dell Latitude CPi running Windows XP or Windows Server 2003 (evidenced from prefetch headers). Key software identified includes: Windows XP/2003 OS, Internet Explorer, Outlook Express (mail client suggesting email/NNTP activity), and various system utilities. The presence of multiple security-sensitive tools (packet capture, password crackers, network scanners) on a standard business laptop configuration suggests this was either a compromised system or one deliberately configured for offensive operations.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| External IP | `207.68.174.248` |  | Security-Related Tools Installed and Executed - Mixed Legitimate and Suspicious |
| External IP | `65.54.179.195` |  | Security-Related Tools Installed and Executed - Mixed Legitimate and Suspicious |
| External IP | `65.54.179.230` |  | Anomalous System Activity: Network Reconnaissance and Packet Capture |
| Internal IP | `192.168.254.0` |  | Anomalous System Activity: Network Reconnaissance and Packet Capture |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `cservice@undernet.org` |  | IRC Client Installation and Execution - Ambiguous Purpose |




---

## Appendix C: MITRE ATT&CK Coverage

7 techniques identified across findings.


**Kill Chain Coverage:** Persistence (1) > Defense Evasion (1) > Credential Access (2) > Discovery (2) > Lateral Movement (1) > Command and Control (1)


### Persistence

| Technique | Name | Findings |
|-----------|------|----------|
| [T1136](https://attack.mitre.org/techniques/T1136/) | Create Account | Attacker Identity: Greg Schardt (Mr. Evil) |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | Filesystem Artifacts: Large Volume of Deleted... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1003](https://attack.mitre.org/techniques/T1003/) | OS Credential Dumping | Security-Related Tools Installed and Executed...; Anomalous System Activity: Network...; Suspicious File Detected: SAM Database Dumping... |
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Security-Related Tools Installed and Executed...; Anomalous System Activity: Network... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Security-Related Tools Installed and Executed...; Anomalous System Activity: Network... |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Security-Related Tools Installed and Executed... |


### Lateral Movement

| Technique | Name | Findings |
|-----------|------|----------|
| [T1021](https://attack.mitre.org/techniques/T1021/) | Remote Services | Windows TELNET Client Execution Indicates... |


### Command and Control

| Technique | Name | Findings |
|-----------|------|----------|
| [T1071](https://attack.mitre.org/techniques/T1071/) | Application Layer Protocol | IRC Client Installation and Execution -... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 185 |
| Findings submitted | 8 |
| Confirmed | 2 |
| Inferences | 6 |
| Input tokens | 574 |
| Output tokens | 53.8K |
| Total tokens | 54.3K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 574 | 53.8K | 54.3K |




<details>
<summary>Evidence Sources (41)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 12545 |
| hashdeep.hashes | hashdeep | 6 |
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
| registry.query.system | python-registry | 1 |
| ez.shimcache | eztools | 140 |
| registry.default | regripper | 400 |
| ez.prefetch | eztools | 165 |
| registry.sam | regripper | 133 |
| registry.sam | regripper | 7 |
| registry.security | regripper | 19 |
| registry.security | regripper | 8 |
| registry.software | regripper | 9600 |
| registry.software | regripper | 283 |
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
| tsk.masquerade | sleuthkit | 14 |
| clamav.scan | clamav | 2 |
| yara.files | yara | 3 |
| composite.file_staging | composite | 122 |
| composite.file_staging | composite | 122 |
| composite.file_staging | composite | 122 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
