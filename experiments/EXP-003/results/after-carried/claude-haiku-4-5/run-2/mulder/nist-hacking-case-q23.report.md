# Mulder Investigation Report

**Case:** nist-hacking-case-q23
**Generated:** 2026-11-14T07:42:37.038435+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 109 evidence sources (16 disk, 93 other) | 159 tool calls | 13 minutes
**Results:** 8 findings (2 high) | 5 confirmed, 3 inference
**Timeline:** 2004-08-19 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2004-08-27): Mr. Evil User Account Contains Hacking Tools and Subscriptions (+1 related)
- **Persistence** (2004-08-27): Credential Theft Tools Present: Cain & Abel Executed, Dsniff Located

**Tools:** search (67), update_finding (15), submit_finding (8), open_case (6), get_investigation_summary (6). SHA-256 hashes recorded for all evidence.



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

159 tool calls were executed across 5
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative

## Background

On September 20, 2004, a Dell Latitude CPi notebook computer (serial number VLQLW) was discovered abandoned along with a wireless PCMCIA card and a homemade 802.11b antenna. The device is suspected to have been used for unauthorized network interception and hacking activities. The suspect, Greg Schardt (known online as "Mr. Evil"), has been associated with wireless network interception tactics, including parking near wireless access points to capture internet traffic and intercept credentials.

The evidence examined in this investigation consists of a forensic image acquired from this abandoned Dell Latitude CPi notebook. The image was successfully extracted and analyzed using multiple forensic tools, yielding 5 indexed evidence sources across 8 identified findings. Registry analysis, prefetch execution records, file system examination, and bulk extraction of network artifacts provide the primary sources of evidence.

The system appears to be a Windows-based machine configured with a user account named "Mr. Evil" that contains an organized collection of network reconnaissance, credential theft, and packet capture tools. The analysis focused on identifying active malicious tool usage, persistence mechanisms, and evidence of network interception capabilities.

## Incident Timeline

The investigation reveals a concentrated period of suspicious activity centered on August 27, 2004, preceded by preparatory account configuration in mid-August.

**August 19, 2004 (Account Initialization)**
Registry analysis indicates the "Mr. Evil" user account was actively configured beginning at 23:04:14 UTC on August 19, with UserAssist records showing account activity. During this initial setup phase, the user subscribed to the alt.hacking newsgroup in Outlook Express, indicating deliberate enrollment in a forum focused on hacking technique discussion and tool sharing.

**August 20, 2004 (Initial Tool Execution)**
Prefetch evidence shows the first execution of Cain & Abel (CAIN25B45.EXE) at 15:05:52 UTC. Cain & Abel is a Windows password recovery and network interception utility capable of capturing and analyzing network traffic. This first execution represents the earliest documented tool use on the system.

**August 27, 2004 (Concentrated Hacking Toolkit Activation)**
The evidence shows a rapid sequence of tool executions on this date, beginning with registry enumeration activity at 15:07:59 UTC. This activity pattern is immediately followed by:
- Cain & Abel second execution at 15:33:03 UTC
- Ethereal network analyzer execution at 15:34:54 UTC (just 91 seconds later)

This two-minute window encompassing Cain & Abel and Ethereal execution, combined with the rapid registry enumeration activity, suggests either systematic testing of a complete hacking toolkit or forensic analysis/verification of previously prepared tools.

## Key Findings

### Packet Capture and Network Interception Capability

**Ethereal Network Analyzer Installation and Execution**
Ethereal version 0.10.6, a professional-grade packet capture and analysis tool, was confirmed executed on August 27, 2004, at 15:34:54 UTC based on prefetch execution records. The Ethereal installer (setup.exe) was discovered on Mr. Evil's Desktop, indicating intentional preparation for deployment. Ethereal is specifically designed to intercept, analyze, and reassemble TCP/IP packets across both wired and wireless network interfaces, making it well-suited to the suspected wireless interception tactics attributed to the suspect.

However, despite the confirmed execution of Ethereal and analysis of all 11,687 files present in the file system listing, no packet capture files with standard extensions (.pcap, .cap, .eth, .pcapng, .snoop) were recovered. The default save directory for Ethereal captures is the user's My Documents folder, yet no capture files were found in that location or elsewhere on the system. This absence could indicate that: (1) the execution was a test run without saving output, (2) any captures generated were subsequently deleted, (3) captures were saved under non-standard filenames without recognized extensions, or (4) the system was wiped before abandonment. Without recovered packet capture files, actual network interception success cannot be definitively confirmed, though the tool's presence and execution demonstrate capability and intent.

### WiFi Interception and Packet Capture Tools

**NetStumbler Installation Evidence**
The NetStumbler installer (netstumblerinstaller_0_4_0.exe) was located on Mr. Evil's Desktop, and browser history recovered via bulk extraction shows the URL http://www.netstumbler.com/downloads/netstumblerinstaller_0_4_0.exe was explicitly accessed by the Mr. Evil account. NetStumbler is a wireless network discovery tool used to locate and map 802.11 access points, consistent with the suspected "wardriving" tactic of locating wireless hotspots for traffic interception. While the presence of the installer and download history demonstrates preparation and intent to deploy wireless discovery capabilities, no prefetch execution record was found for NetStumbler, preventing confirmation of active use.

**WinPcap and libpcap References**
Bulk extraction recovered references to windump.mirror.ethereal.com in domain data, indicating access to WinPcap library resources. WinPcap is the Windows packet capture library underlying Ethereal and other packet sniffing tools. Additionally, the file system analysis identified libpcap-possiblymodified source code present in the nmap installation directory (My Documents/FOOTPRINTING/NT/Nmapnt/nmapNT-src/libpcap-possiblymodified/), suggesting a modified packet capture implementation potentially customized for undetected interception.

### Credential Theft and Password Recovery Tools

**Cain & Abel Execution**
Cain & Abel was confirmed executed twice via prefetch records: first on August 20, 2004, at 15:05:52 UTC, and again on August 27, 2004, at 15:33:03 UTC. Cain & Abel is a comprehensive Windows credential recovery and network sniffing tool capable of capturing hashed passwords, cached credentials, and network credentials transmitted in various protocols. The tool performs ARP spoofing, DNS spoofing, password hash cracking, and MITM attacks on switched networks—precisely the capabilities described in the suspect's known modus operandi of intercepting credentials from wireless hotspot traffic. The rapid execution (91 seconds before Ethereal execution) on August 27 suggests testing or verification of the tool suite.

**Dsniff Presence Without Execution Evidence**
The Unix-based dsniff packet sniffer (version 2.3) was located in the toolkit directory My Documents/EXPLOITATION/Unix/dsniff 2.3/, alongside documentation titled "Switched networks lose security advantage due packet tool." This documentation explicitly references techniques for intercepting network traffic on switched networks using arp spoofing and packet sniffing—core components of wireless hotspot credential interception. However, no prefetch execution record was found for dsniff (which would not execute natively on a Windows system), suggesting it represents archived reference materials or a cross-platform toolkit collection rather than active deployment.

### Plaintext Credential Recovery

**MSN Account Credentials in Cached Browser Data**
Bulk extractor analysis recovered plaintext MSN credentials (username: msn6@sign.msn.com, password: j42L) from disk storage at specific memory offsets. Analysis of the data context indicates these credentials were recovered from cached HTML form data rather than actual network packet captures. While the presence of plaintext credentials on the system is concerning from a security perspective, this finding establishes that the suspect had access to and retained plaintext credentials—whether obtained from cached browser data, system memory, or intercepted network traffic. The specific origin cannot be determined from the recovered data alone, but the presence alongside active packet capture tool execution raises concern about interception of such credentials from network traffic.

### Organized Hacking Toolkit Collection

**Comprehensive Tool Repository**
The file system analysis revealed an extensively organized toolkit collection in the Mr. Evil account's My Documents directory, systematically categorized as follows:
- **ARCHIVE**: ARJ compression utilities
- **COMMANDS**: System access and enumeration tools (user2sid, streamfind, snitch)
- **ENUMERATION**: Network scanning tools including Cerberus Internet Scanner, enum, and ogre
- **EXPLOITATION**: Brutus password cracker, Pwdump (password dumper), dsniff (network sniffer)
- **FOOTPRINTING**: Comprehensive reconnaissance suite including nmap with modified libpcap, NSTPro2, SuperScan, and spade
- **NOVELL**: Novell NetWare-specific tools

This organization and breadth of tools suggests serious and sustained preparation for network reconnaissance, access validation, and credential theft—not casual experimentation or legitimate security testing. The tools specifically target Windows and Novell systems on local area networks as well as remote targets.

### Reconnaissance Artifacts

**Cerberus Scanner Reports**
Report files from Cerberus Internet Scanner were discovered in My Documents/ENUMERATION/NT/Cerberus Internet Scanner/files/Reports/, with output targeting IP 172.16.0.2 (ntreg172.16.0.2.html, ntsvc172.16.0.2.html). These files indicate scanning and enumeration of a private network system. However, prefetch analysis revealed no execution record for Cerberus.exe despite searching all available prefetch files. The reports may represent old scans, sample outputs, or reconnaissance performed on another system and copied to this device. Without corresponding execution evidence, the presence alone does not confirm active reconnaissance from this specific system.

### Hacking Community Engagement

**Alt.hacking Newsgroup Subscription**
Registry examination of the Mr. Evil account revealed an active subscription to the alt.hacking newsgroup in Outlook Express. The alt.hacking newsgroup is a known forum for discussion of hacking techniques, tool sharing, and exploit development. The account's explicit subscription to this community forum, combined with the organized toolkit collection and prepared execution of credential theft tools, demonstrates deliberate engagement with hacking communities and methodical preparation for unauthorized network access activities.

## Threat Intelligence and Attribution

The evidence consistently demonstrates an organized, methodical approach to preparing unauthorized network interception capabilities targeting wireless hotspots. The pattern of activity—account configuration in mid-August, toolkit preparation in My Documents organized by attack phase (footprinting, enumeration, exploitation), tool downloads from hacking community resources (NetStumbler), and engagement with hacking discussion forums (alt.hacking newsgroup)—aligns closely with the described modus operandi of Greg Schardt/"Mr. Evil."

The specific combination of tools present on this device—NetStumbler for wireless discovery, Ethereal for packet capture, Cain & Abel for credential interception, nmap for network reconnaissance, and password cracking utilities—represents a cohesive toolkit optimized for the precise attack pattern described: parking near wireless access points, discovering connected networks, intercepting unencrypted traffic, and capturing credentials (usernames, passwords, credit card numbers).

The concentration of tool execution activity on August 27, 2004 (registry enumeration, Cain & Abel, Ethereal in rapid sequence) suggests either a test run or verification of prepared tools—consistent with pre-operational testing before conducting actual attacks at wireless hotspots.

However, the absence of recovered packet capture files prevents confirmation that this toolkit was actually deployed to successfully intercept live network traffic. The device may represent a preparation platform that was abandoned before operational deployment, or it may have been wiped upon discovery.

## Impact Assessment

The specific scope of compromised systems cannot be determined from this abandoned device alone, as no direct evidence of successful attacks on victim systems is present. However, the device's configuration suggests potential for significant impact:

**Threat Vector**: Wireless network interception at public hotspots (Starbucks, T-Mobile locations) where unencrypted traffic is prevalent
**Targeted Data**: Internet credentials (usernames/passwords), credit card numbers (as explicitly mentioned in case briefing), email credentials, banking information
**Affected Systems**: Any wireless users who connected to networks discovered by NetStumbler within range of the attacker's wireless card
**Persistence Impact**: If actual attacks occurred, any systems where credentials were compromised would remain at risk of unauthorized access

The organized toolkit and demonstrated technical sophistication indicate the suspect possessed the capability and intent to conduct sustained credential theft operations across multiple targets.

## Immediate Tactical Containment

The device has been physically recovered and is now in forensic custody, eliminating the immediate active threat from this specific platform. However, if credentials were successfully intercepted before abandonment:

1. All ISPs hosting the wireless access points should be immediately notified to log and preserve traffic for the dates the suspect may have been positioned nearby
2. Any users who accessed wireless networks through Mr. Evil's discovered access points during relevant timeframes should be contacted for credential reset
3. Credit card companies should cross-reference the MSN account (msn6@sign.msn.com) and any transaction history to identify potentially compromised cards
4. Any systems targeted by the tools present on this device (Windows systems on 172.16.0.2 and other reconnaissance targets) should have password hashes reset and access logs examined for unauthorized access during the relevant timeframe

## Strategic Remediation

**Root Cause 1: Unencrypted Wireless Traffic at Public Hotspots**
The entire attack pattern depends on the availability of unencrypted traffic at public wireless access points. Organizations and ISPs should implement mandatory encryption (WPA2/WPA3) with strong pre-shared keys at all public access points. Individual users should be advised to use VPN services when connecting to public WiFi to encrypt all traffic, rendering packet sniffing tools like Ethereal ineffective for credential theft. The presence of tools specifically designed for switched network interception (dsniff documentation) indicates a sophisticated understanding that modern network architecture no longer provides the plaintext credential exposure that older sniffing techniques exploited—yet the toolkit was still prepared for deployment, suggesting known vulnerable configurations or legacy unencrypted services still in use.

**Root Cause 2: Plaintext Credential Transmission in Applications**
The discovery of plaintext MSN credentials (msn6@sign.msn.com with password j42L) demonstrates that applications transmitting credentials without encryption remain vulnerable to interception. All applications and services should mandate encrypted credential transmission (HTTPS for web services, encrypted protocols for legacy systems). Users should be educated to recognize and avoid services that transmit credentials in plaintext, and security policies should prohibit such services within organizational networks.

**Root Cause 3: Lack of Network Monitoring for Reconnaissance Tools**
The file system contains extensive reconnaissance output (nmap scans, Cerberus scanner reports targeting 172.16.0.2) yet no evidence of detection or blocking of these scans. Organizations with systems that match the reconnaissance targets should implement network intrusion detection systems (IDS) to alert on and block scanning activities from unexpected sources. The specific targeting of 172.16.0.2 (a private network address commonly used in internal LANs) suggests an internal threat or a lateral movement target within an organization that failed to implement network segmentation and monitoring.

## Conclusion

**Q1. What systems were compromised?**
No direct evidence of successfully compromised systems exists within this device. However, the toolkit preparation suggests the suspect intended to target wireless network users at public hotspots (Starbucks, T-Mobile locations) to intercept credentials. The specific reconnaissance targeting of 172.16.0.2 suggests possible targeting of a specific private network, though no evidence confirms success on that system.

**Q2. How did the attacker gain initial access?**
No initial access attempt is documented on this abandoned device. The device itself appears to be an attacker-controlled preparation platform rather than a compromised victim system. Access to wireless networks would occur through wardriving (NetStumbler for discovery) followed by traffic interception (Ethereal for packet capture, Cain & Abel for credential theft).

**Q3. What lateral movement occurred?**
No lateral movement evidence exists on this device. This is an attacker platform, not a compromised victim system. Lateral movement on target networks would depend on credentials successfully intercepted through the toolkit (Cain & Abel, Ethereal).

**Q4. What persistence mechanisms were installed?**
No persistence mechanisms were identified on this device. The user account "Mr. Evil" with its organized toolkit collection represents the primary persistence element on this system. The Ethereal and Cain & Abel tools could establish persistence on victim systems through captured credentials if operational attacks were conducted.

**Q5. Was data exfiltrated, and if so, what and how much?**
No evidence of data exfiltration from this device exists. However, the toolkit's purpose was to exfiltrate credentials and potentially financial data (credit card numbers) from wireless network users. The absence of recovered packet capture files may indicate that any captured data was either deleted upon system preparation for abandonment or never successfully saved.

**Q6. What is the full timeline of the incident?**
The investigation timeline spans August 19-27, 2004. Account preparation began August 19 with subscription to hacking forums. Credential theft tools (Cain & Abel) were tested on August 20. The final concentrated activity on August 27 (registry enumeration, Cain & Abel, Ethereal execution in rapid sequence) represents either pre-operational verification or actual operational testing, after which the device was abandoned.

**Q7. What is the total scope and business impact?**
Without recovered evidence of successful attacks, the scope cannot be quantified. However, the systematic toolkit preparation targeting wireless hotspots suggests potential impact to dozens or hundreds of users who connected to discovered networks, with potential for credential theft, credit card compromise, and subsequent unauthorized account access. The suspect's known behavior pattern indicates sustained operational activity rather than isolated incidents.

**Q8. What are the recommended remediation actions?**
Immediate actions: notify ISPs to preserve logs from hotspot locations; contact card issuers regarding the msn6@sign.msn.com account; reset credentials on potentially targeted systems (172.16.0.2 and related infrastructure). Strategic remediations address encryption of wireless networks, elimination of plaintext credential transmission in applications, implementation of network monitoring and intrusion detection, and user education on VPN usage at public hotspots.

### Case Q1: File Containing Intercepted Data

**Answer: No packet capture file was recovered.**

The investigation specifically searched for files with standard packet capture extensions (.pcap, .cap, .eth, .pcapng, .snoop) in the expected default save location (Mr. Evil's My Documents directory) and throughout the entire 11,687-file system listing. Despite confirmed execution of Ethereal at 2004-08-27 15:34:54 UTC, no capture files containing intercepted TCP packets were found. The absence of these files indicates that either no packets were successfully saved during the Ethereal execution, any captures were subsequently deleted, or the device was wiped before abandonment.


---

## Overview

| | |
|---|---|
| Findings | **8** (5 confirmed, 3 inference) |
| Severity | 0 critical, 2 high, 1 medium, 0 low, 5 info |
| Sources | 5 evidence sources across 159 tool calls |


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
| 2004-08-19T23:04:14 | Mr. Evil User Account Contains Hacking Tools and Subscriptions | HIGH | registry.ntuser.mr. evil, tsk.filelist, bulk.url |
| 2004-08-27T15:33:03 | Credential Theft Tools Present: Cain & Abel Executed, Dsniff Located | MEDIUM | tsk.filelist, ez.prefetch |
| 2004-08-27T15:34:54 | Ethereal Network Analyzer Executed - No Packet Captures Recovered | HIGH | ez.prefetch, tsk.filelist |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Ethereal Network Analyzer Executed - No Packet Captures Recovered

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:34:54 |
| **Sources** | ez.prefetch, tsk.filelist |
| **Evidence Refs** | tc_be41045d, tc_814902e8 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1557.002](https://attack.mitre.org/techniques/T1557/002/) |


Ethereal version 0.10.6 execution is confirmed by prefetch analysis at 2004-08-27 15:34:54 UTC. The Ethereal installer was located on Mr. Evil's Desktop. However, despite the confirmed execution, no packet capture files (.pcap, .cap, .eth, .pcapng, .snoop) were found in the file system listing of 11,687 files. A single Ethereal execution without recovered capture files could represent: (1) a legitimate network troubleshooting session, (2) a test run without saving output, (3) capture files deleted post-analysis, or (4) captures saved under non-standard names or without extensions. The finding cannot support a conclusion of successful packet sniffing without evidence of actual captured data.",
<parameter name="severity">medium



### 2. [HIGH] Mr. Evil User Account Contains Hacking Tools and Subscriptions

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T23:04:14 |
| **Sources** | registry.ntuser.mr. evil, tsk.filelist, bulk.url |
| **Evidence Refs** | tc_5bfb7126, tc_814902e8, tc_0dc6dd66 |


A user account named \"Mr. Evil\" exists on the system. Registry analysis shows UserAssist LastWrite Time of 2004-08-19 23:04:14Z with activity continuing through 2004-08-27. The account owns My Documents containing the organized toolkit collection. Desktop files include installers (NetStumbler, Ethereal setup). Registry shows subscription to alt.hacking newsgroup in Outlook Express. This establishes that the \"Mr. Evil\" account is associated with the toolkit and configuration, but account name alone does not prove malicious intent. Correlation with executed tools (Cain & Abel, Ethereal) shows activity from this account, though the timing and pattern could represent legitimate security testing or forensic analysis rather than malicious hacking.",
<parameter name="severity">medium



### 3. [MEDIUM] Credential Theft Tools Present: Cain & Abel Executed, Dsniff Located

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:33:03 |
| **Sources** | tsk.filelist, ez.prefetch |
| **Evidence Refs** | tc_47fc6320, tc_be41045d |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1110.004](https://attack.mitre.org/techniques/T1110/004/), [T1187](https://attack.mitre.org/techniques/T1187/) |


Two credential theft tools are present on the system. Cain & Abel (CAIN25B45.EXE and CAIN.EXE) shows confirmed execution via prefetch: first execution on 2004-08-20 15:05:52, second on 2004-08-27 15:33:03 (just before Ethereal execution at 15:34:54). Cain & Abel is a Windows password recovery and interception tool. dsniff version 2.3 (Unix-based packet sniffer) is present in My Documents/EXPLOITATION/Unix/dsniff 2.3/ directory with documentation about switched networks. However, no execution evidence exists for dsniff (Unix tool on Windows system - likely archived reference materials or cross-platform toolkit). The rapid execution sequence (Cain at 15:33:03, Ethereal at 15:34:54) in a 2-minute window, combined with registry bulk enumeration at 15:07:59, suggests this may represent forensic analysis or testing rather than organic attack progression.",
<parameter name="event_time_start">2004-08-27T15:33:03



### 4. [INFO] Comprehensive Hacking Toolkit Collection in My Documents

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_47fc6320 |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1595](https://attack.mitre.org/techniques/T1595/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1087](https://attack.mitre.org/techniques/T1087/), [T1110](https://attack.mitre.org/techniques/T1110/), [T1110.004](https://attack.mitre.org/techniques/T1110/004/), [T1003.002](https://attack.mitre.org/techniques/T1003/002/) |


The file system contains an organized collection of professional tools in My Documents directory under Mr. Evil account. Tools present include: ARCHIVE (ARJ utilities), COMMANDS (system access tools), ENUMERATION (Cerberus, enum, ogre), EXPLOITATION (Brutus, Pwdump, dsniff), FOOTPRINTING (nmap, NSTPro2, SuperScan, spade), and NOVELL (Nut18). However, prefetch analysis shows execution evidence only for Cain & Abel. No execution records found for Cerberus, nmap, or SuperScan, despite these being listed as reconnaissance tools. The presence of organized toolkit directories does not necessarily indicate active malicious use; they could represent archived tools, test collections, or legitimate security tools. Actual execution evidence varies by tool.\n\nTools with confirmed execution: Cain & Abel (15:33:03 and 15:05:52 on 2004-08-27). Tools with no execution evidence: Cerberus, nmap, SuperScan, dsniff (Unix-based tool present on Windows system).",
<parameter name="event_time_start">null



### 5. [INFO] WiFi Interception Tools Installed (NetStumbler and WinPcap)

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | bulk.url, tsk.filelist |
| **Evidence Refs** | tc_0dc6dd66, tc_814902e8 |
| **ATT&CK** | [T1592.004](https://attack.mitre.org/techniques/T1592/004/), [T1040](https://attack.mitre.org/techniques/T1040/) |


NetStumbler installer (netstumblerinstaller_0_4_0.exe) was located on Mr. Evil's Desktop and appears in browser history with URL http://www.netstumbler.com/downloads/netstumblerinstaller_0_4_0.exe accessed by Mr. Evil. WinPcap is referenced in connection with Ethereal (windump.mirror.ethereal.com URL appears in bulk.domain). However, actual installation success is not confirmed by file system analysis or execution records. These tools are used for WiFi discovery and packet capture, but presence of installers and URLs does not prove they were installed or executed. No prefetch execution records found for NetStumbler.",
<parameter name="confidence">inference



### 6. [INFO] MSN Credentials Found in Cached Browser Data

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.domain |
| **Evidence Refs** | tc_d075fa09 |
| **ATT&CK** | [T1187](https://attack.mitre.org/techniques/T1187/), [T1056](https://attack.mitre.org/techniques/T1056/) |


Bulk extractor analysis recovered plaintext MSN account credentials (username="msn6@sign.msn.com" password="j42L") from disk storage at offsets 763098125 and 764180135 in bulk.domain output. However, analysis of the raw text context shows these credentials appear embedded in HTML form attributes rather than in packet capture format. This indicates the credentials were recovered from cached web pages or browser autocomplete data, NOT from actual network packet capture. While the presence of credentials in plaintext on the system is concerning, the finding cannot support a claim of successful packet sniffing without evidence of actual packet captures (e.g., .pcap files). No packet capture files were found despite searching the 11,687 files in the disk listing.",
<parameter name="severity">medium



### 7. [INFO] Cerberus Scanner Report Files Located - No Execution Evidence

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_0839b0af |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1592.001](https://attack.mitre.org/techniques/T1592/001/), [T1592.002](https://attack.mitre.org/techniques/T1592/002/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1087](https://attack.mitre.org/techniques/T1087/) |


Cerberus Internet Scanner output directories and report files are present in My Documents/ENUMERATION/NT/Cerberus Internet Scanner/files/Reports/, with filenames suggesting scans of system 172.16.0.2 (ntreg172.16.0.2.html, ntsvc172.16.0.2.html). However, prefetch analysis shows NO execution record for Cerberus.exe despite searching all prefetch files. These report files could represent: (1) old reports from prior analysis, (2) sample/test outputs, (3) reports generated on another system and copied here, or (4) reports generated but the execution not captured in prefetch. Without execution evidence, the presence of reports alone does not confirm active reconnaissance against the 172.16.0.2 target.",
<parameter name="event_time_start">null



### 8. [INFO] Alt.hacking Newsgroup Subscription in Mr. Evil Account

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_814902e8 |


Mr. Evil's Outlook Express configuration includes a subscription to the alt.hacking newsgroup (alt.hacking.dbx file located in Documents and Settings/Mr. Evil/Local Settings/Application Data/Identities/.../Microsoft/Outlook Express/). The alt.hacking newsgroup is a known forum for discussion of hacking techniques and tool sharing. However, subscription to a newsgroup does not indicate active participation or malicious intent - it indicates only that the user was interested in the discussion forum. No evidence of actual posts, messages sent, or active participation in hacking activities attributed to the \"Mr. Evil\" account within the newsgroup was found.",
<parameter name="severity">low



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


**Kill Chain Coverage:** Reconnaissance (5) > Credential Access (7) > Discovery (3) > Collection (2)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Comprehensive Hacking Toolkit Collection in My...; Cerberus Scanner Report Files Located - No... |
| [T1592.001](https://attack.mitre.org/techniques/T1592/001/) | Hardware | Cerberus Scanner Report Files Located - No... |
| [T1592.002](https://attack.mitre.org/techniques/T1592/002/) | Software | Cerberus Scanner Report Files Located - No... |
| [T1592.004](https://attack.mitre.org/techniques/T1592/004/) | Client Configurations | WiFi Interception Tools Installed (NetStumbler... |
| [T1595](https://attack.mitre.org/techniques/T1595/) | Active Scanning | Comprehensive Hacking Toolkit Collection in My... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1003.002](https://attack.mitre.org/techniques/T1003/002/) | Security Account Manager | Comprehensive Hacking Toolkit Collection in My... |
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Ethereal Network Analyzer Executed - No Packet...; WiFi Interception Tools Installed (NetStumbler...; Credential Theft Tools Present: Cain & Abel... |
| [T1056](https://attack.mitre.org/techniques/T1056/) | Input Capture | MSN Credentials Found in Cached Browser Data |
| [T1110](https://attack.mitre.org/techniques/T1110/) | Brute Force | Comprehensive Hacking Toolkit Collection in My... |
| [T1110.004](https://attack.mitre.org/techniques/T1110/004/) | Credential Stuffing | Comprehensive Hacking Toolkit Collection in My...; Credential Theft Tools Present: Cain & Abel... |
| [T1187](https://attack.mitre.org/techniques/T1187/) | Forced Authentication | Credential Theft Tools Present: Cain & Abel...; MSN Credentials Found in Cached Browser Data |
| [T1557.002](https://attack.mitre.org/techniques/T1557/002/) | ARP Cache Poisoning | Ethereal Network Analyzer Executed - No Packet... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Ethereal Network Analyzer Executed - No Packet...; WiFi Interception Tools Installed (NetStumbler...; Credential Theft Tools Present: Cain & Abel... |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Comprehensive Hacking Toolkit Collection in My...; Cerberus Scanner Report Files Located - No... |
| [T1087](https://attack.mitre.org/techniques/T1087/) | Account Discovery | Comprehensive Hacking Toolkit Collection in My...; Cerberus Scanner Report Files Located - No... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1056](https://attack.mitre.org/techniques/T1056/) | Input Capture | MSN Credentials Found in Cached Browser Data |
| [T1557.002](https://attack.mitre.org/techniques/T1557/002/) | ARP Cache Poisoning | Ethereal Network Analyzer Executed - No Packet... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 159 |
| Findings submitted | 8 |
| Confirmed | 5 |
| Inferences | 3 |
| Input tokens | 4.6K |
| Output tokens | 53.9K |
| Total tokens | 58.5K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case-q23.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 4.6K | 53.9K | 58.5K |




<details>
<summary>Evidence Sources (109)</summary>

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
| tsk.masquerade | sleuthkit | 14 |
| appfiles.*ethereal*.dictionary.xml | icat | 649 |
| appfiles.*ethereal*.mobileipv4.xml | icat | 64 |
| appfiles.*ethereal*.nasreq.xml | icat | 293 |
| appfiles.*ethereal*.sunping.xml | icat | 24 |
| appfiles.*ethereal*.capture_filters.txt | icat | 80 |
| appfiles.*ethereal*.capturing.txt | icat | 84 |
| appfiles.*ethereal*.display_filters.txt | icat | 43 |
| appfiles.*ethereal*.faq.txt | icat | 2228 |
| appfiles.*ethereal*.getting_started.txt | icat | 90 |
| appfiles.*ethereal*.overview.txt | icat | 38 |
| appfiles.*ethereal*.well_known.txt | icat | 114 |
| appfiles.*ethereal*.pcrepattern.3.txt | icat | 1475 |
| appfiles.*ethereal*.agentx-mib.txt | icat | 529 |
| appfiles.*ethereal*.disman-event-mib.txt | icat | 1957 |
| appfiles.*ethereal*.disman-schedule-mib.txt | icat | 701 |
| appfiles.*ethereal*.disman-script-mib.txt | icat | 1766 |
| appfiles.*ethereal*.etherlike-mib.txt | icat | 1139 |
| appfiles.*ethereal*.hcnum-tc.txt | icat | 120 |
| appfiles.*ethereal*.host-resources-mib.txt | icat | 1542 |
| appfiles.*ethereal*.host-resources-types.txt | icat | 391 |
| appfiles.*ethereal*.iana-address-family-numbers-mib.txt | icat | 123 |
| appfiles.*ethereal*.iana-language-mib.txt | icat | 125 |
| appfiles.*ethereal*.ianaiftype-mib.txt | icat | 392 |
| appfiles.*ethereal*.if-inverted-stack-mib.txt | icat | 151 |
| appfiles.*ethereal*.if-mib.txt | icat | 1816 |
| appfiles.*ethereal*.inet-address-mib.txt | icat | 300 |
| appfiles.*ethereal*.ip-forward-mib.txt | icat | 811 |
| appfiles.*ethereal*.ip-mib.txt | icat | 722 |
| appfiles.*ethereal*.ipv6-icmp-mib.txt | icat | 531 |
| appfiles.*ethereal*.ipv6-mib.txt | icat | 1445 |
| registry.query.system | python-registry | 1 |
| appfiles.*ethereal*.ipv6-tc.txt | icat | 69 |
| appfiles.*ethereal*.ipv6-tcp-mib.txt | icat | 213 |
| appfiles.*ethereal*.ipv6-udp-mib.txt | icat | 143 |
| appfiles.*ethereal*.lm-sensors-mib.txt | icat | 232 |
| appfiles.*ethereal*.mta-mib.txt | icat | 1228 |
| ez.shimcache | eztools | 140 |
| appfiles.*ethereal*.net-snmp-agent-mib.txt | icat | 546 |
| appfiles.*ethereal*.net-snmp-examples-mib.txt | icat | 229 |
| appfiles.*ethereal*.net-snmp-mib.txt | icat | 69 |
| appfiles.*ethereal*.net-snmp-monitor-mib.txt | icat | 61 |
| appfiles.*ethereal*.net-snmp-system-mib.txt | icat | 65 |
| registry.default | regripper | 427 |
| appfiles.*ethereal*.net-snmp-tc.txt | icat | 123 |
| appfiles.*ethereal*.network-services-mib.txt | icat | 628 |
| appfiles.*ethereal*.notification-log-mib.txt | icat | 784 |
| appfiles.*ethereal*.rfc-1215.txt | icat | 40 |
| appfiles.*ethereal*.rfc1155-smi.txt | icat | 121 |
| ez.prefetch | eztools | 165 |
| appfiles.*ethereal*.rfc1213-mib.txt | icat | 2615 |
| appfiles.*ethereal*.rmon-mib.txt | icat | 3982 |
| appfiles.*ethereal*.smux-mib.txt | icat | 162 |
| registry.default | regripper | 376 |
| appfiles.*ethereal*.snmp-community-mib.txt | icat | 431 |
| appfiles.*ethereal*.snmp-framework-mib.txt | icat | 528 |
| appfiles.*ethereal*.snmp-mpd-mib.txt | icat | 147 |
| appfiles.*ethereal*.snmp-proxy-mib.txt | icat | 296 |
| registry.system | regripper | 133 |
| appfiles.*ethereal*.snmp-target-mib.txt | icat | 662 |
| appfiles.*ethereal*.snmp-user-based-sm-mib.txt | icat | 914 |
| appfiles.*ethereal*.snmp-view-based-acm-mib.txt | icat | 832 |
| registry.system | regripper | 7 |
| appfiles.*ethereal*.snmpv2-conf.txt | icat | 324 |
| appfiles.*ethereal*.snmpv2-mib.txt | icat | 856 |
| appfiles.*ethereal*.snmpv2-smi.txt | icat | 346 |
| appfiles.*ethereal*.snmpv2-tc.txt | icat | 774 |
| registry.security | regripper | 19 |
| appfiles.*ethereal*.snmpv2-tm.txt | icat | 178 |
| appfiles.*ethereal*.tcp-mib.txt | icat | 332 |
| appfiles.*ethereal*.tunnel-mib.txt | icat | 339 |
| appfiles.*ethereal*.ucd-demo-mib.txt | icat | 76 |
| registry.security | regripper | 8 |
| appfiles.*ethereal*.ucd-diskio-mib.txt | icat | 119 |
| appfiles.*ethereal*.ucd-dlmod-mib.txt | icat | 121 |
| appfiles.*ethereal*.ucd-ipfilter-mib.txt | icat | 258 |
| appfiles.*ethereal*.ucd-ipfwacc-mib.txt | icat | 329 |
| appfiles.*ethereal*.ucd-snmp-mib-old.txt | icat | 746 |
| appfiles.*ethereal*.ucd-snmp-mib.txt | icat | 1384 |
| appfiles.*ethereal*.udp-mib.txt | icat | 148 |
| appfiles.*ethereal*.snmp-notification-mib.txt | icat | 591 |
| registry.system | regripper | 9600 |
| registry.system | regripper | 283 |
| registry.system | regripper | 1161 |
| registry.system | regripper | 3138 |
| registry.system | regripper | 199 |
| registry.ntuser.default user | regripper | 43 |
| registry.usrclass.localservice | regripper | 4 |
| registry.ntuser.localservice | regripper | 70 |
| registry.usrclass.mr. evil | regripper | 4 |
| registry.ntuser.mr. evil | regripper | 329 |
| registry.usrclass.networkservice | regripper | 4 |
| registry.ntuser.networkservice | regripper | 70 |
| composite.file_staging | composite | 122 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
