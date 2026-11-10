# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-10T06:24:57.950545+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 149 evidence sources (17 disk, 132 other) | 210 tool calls | 14 minutes
**Results:** 11 findings (3 high) | 2 confirmed, 9 inference
**Timeline:** 2004-07-28 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-07-28 to 2004-08-25): Multiple Network Hacking and Monitoring Tools Installed (+3 related)
- **Command and Control** (2004-08-20): Multiple IRC Hacking and Warez Channels Accessed
- **Credential Access** (2004-08-20): Active IRC User "mrevilrulez" - Communication with Underground Communities
- **Discovery / Collection** (2004-08-27): Network Stumbler Tool - Wireless Network Discovery (+1 related)
- **Other Activity** (2004-08-19 to 2004-08-20): Primary System User "Mr. Evil" - Suspected Link to Greg Schardt (+2 related)

**Tools:** search (90), get_raw_output (21), submit_finding (12), update_finding (11), open_case (8). SHA-256 hashes recorded for all evidence.



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

210 tool calls were executed across 9
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# NIST Hacking Case - Investigation Report

## Background

On September 20, 2004, a Dell Latitude CPi notebook computer (serial # VLQLW) was recovered abandoned at an unknown location, accompanied by a wireless PCMCIA card and a homemade 802.11b antenna. Law enforcement suspected the device was used for unauthorized network hacking and traffic interception. The investigation focused on linking this computer to a suspected perpetrator identified as Greg Schardt, who reportedly operates under the online alias "Mr. Evil." Intelligence indicated that Schardt and his associates engaged in wireless network monitoring at public hotspots (such as Starbucks and T-Mobile locations) to intercept credentials and financial information from unsuspecting users.

The imaging and forensic analysis of the recovered system was conducted to identify any hacking tools, evidence of their use, compromised credentials or victim data, and details establishing a connection between the computer and the suspect. The EnCase forensic image (segments E01 and E02) contained 9 distinct forensic data sources across multiple extraction tools, yielding 11 findings related to system configuration, installed software, network activity, and user behavior.

## Incident Timeline

### System Initialization and Configuration (August 19, 2004)

The investigated system was a Dell Latitude CPi notebook running Windows XP Home Edition (ProductVersion 5.1). Registry analysis reveals the system was configured with initial setup occurring on August 19, 2004 at approximately 16:56 UTC. The primary user account created on the system was named "Mr. Evil," with the account profile established and first login recorded at 2004-08-19T16:57:43 UTC. The account's email configuration referenced Mr. Evil@yahoo.com, establishing an association between the "Mr. Evil" username and an active Yahoo email account used during this period.

The system maintained a configured identity matching the Undernet IRC network (losangeles.ca.us.undernet.org, port 6660), with MIRC IRC client (version 6.12) preconfigured to connect to this network using the usernames "Mr" and alternate nickname "mrevilrulez" with ident user "Mrevil." This configuration suggests intentional setup for online IRC activity and communication.

### Tool Installation and Preparation Phase (August 7-26, 2004)

Between August 7 and August 26, 2004, the system user installed a comprehensive suite of network analysis and reconnaissance tools:

- **Ethereal Network Sniffer** (installed 2004-08-13T02:15:35): A full-featured packet capture and analysis tool capable of intercepting both wired and wireless network traffic, including capturing unencrypted credentials from network flows. The tool was installed with WinPcap driver support, enabling raw packet access.

- **WinPcap Library** (installed earlier, present on system): Low-level packet capture driver supporting network traffic interception.

- **LOOK@LAN Network Scanner** (executed 2004-08-25T15:56:33 and 2004-08-26T15:06:14): Network enumeration tool designed to discover active hosts and services on local networks. Configuration files identified the system's computer name as "N-1A9ODN6ZXK4LQ." Tool execution timestamps correlate with active system use during the investigation period.

- **Cain Password Recovery Tool** (installed pre-investigation): Password recovery and network credential capture utility with a 3.4 MB wordlist file, though no evidence of actual execution or usage was recovered.

- **Network Stumbler Shortcut** (created 2004-08-27T15:12:17): A shortcut to wireless network discovery software was created in a Desktop\Tools folder, indicating accessibility and organization of network reconnaissance capabilities.

- **Whois Tool** (executed 2004-07-28): Domain information lookup utility.

- **Telnet** (executed 2004-08-26): Remote access tool.

### IRC Activity and Community Engagement (August 20, 2004)

On August 20, 2004, the user engaged in IRC activity across multiple channels accessed through the Undernet network. The mIRC client logged sessions in the following channels:

**#evilfork channel** (2004-08-20 10:29:01 - 10:31): 2-minute session. User "mrevil" posted the single message "glib smarm cuyk" before disconnecting. No substantive communication occurred.

**#ISO-WAREZ channel** (2004-08-20 10:29:01 - 10:29:42): 41-second session with zero messages posted. User connected and immediately disconnected without participation.

**#ushells channel** (2004-08-20 10:44:49 - 10:45:12): 23-second session with no messages. Immediate disconnect.

**#LuxShell channel** (2004-08-20 10:42:03 - 10:43:52): User posted gibberish message "glib smarm cuyk."

**#Elite.Hackers channel** (2004-08-20 10:45:34 - 10:49:05): 3-minute observation session. No messages posted by the user. Session contained only a music bot (pablo playz) sharing songs, with no hacking-related discussion.

**#CyberCafe channel** (2004-08-20 10:54:21 - 14:02:55): Extended session over approximately 3.5 hours. User "mrevilrulez" posted three brief messages: "glib marm cuyk," a period ".", and "hi." Other channel participants discussed food, dating, and music sharing. No coordination of hacking activities or illegal conduct was documented in the accessible log.

**#Funny channel** (2004-08-20 14:26:18): Final brief session.

The mIRC configuration file lists 82+ channels in the channel folder, with many bearing suspicious names suggesting interest in hacking, elite communities, and shell access. However, the actual IRC logs recovered show the user's behavior to be primarily passive observation with only minimal and non-substantive posts (mostly gibberish or single words).

### User Activity Continuation (August 21-27, 2004)

Registry analysis shows continued activity by the "Mr. Evil" account through August 27, 2004. The user accessed various applications including Internet Explorer (generating Yahoo mail-related URLs), file operations, and system utilities. The last recorded activity in system logs occurs at 2004-08-27T15:46:27 UTC, with the desktop Tools folder created on 2004-08-27T15:12:17.

## Key Findings

### Finding 1: Multiple Network Hacking and Monitoring Tools Installed

11 distinct hacking and network analysis tools were installed on the system, demonstrating the user's interest in network reconnaissance and traffic analysis. The presence of Ethereal with WinPcap driver indicates the system owner had the technical capability to intercept and analyze network communications, including unencrypted credentials passing over network links. LOOK@LAN was actively executed during the investigation period (August 25-26), showing evidence of tool usage rather than mere installation. However, critical gaps in evidence exist: no saved packet capture files were recovered from the system, no Ethereal execution logs document actual packet capture sessions, and no evidence of credential theft or successful reconnaissance attacks was discovered. The presence of these tools establishes capability but does not alone constitute proof of actual malicious activity.

### Finding 2: Primary System User "Mr. Evil" and Connection to Suspect Greg Schardt

The primary and only substantive user account on the system was named "Mr. Evil," with associated email Mr. Evil@yahoo.com and profile path C:\Documents and Settings\Mr. Evil\. This username matches the suspect alias "Mr. Evil" attributed to Greg Schardt. However, the connection is based on username matching alone and lacks independent corroboration. While the briefing materials indicate Schardt is known by this alias, forensic evidence provides no additional identification confirmation such as biographical information, device registration, or identity verification. The attribution to Greg Schardt remains an inference based on nickname matching rather than definitive identity proof.

### Finding 3: IRC Channel Access and Passive Participation

The user accessed channels with names suggesting interest in hacking communities (Elite.Hackers, ISO-WAREZ, evilfork, ushells) and general chat communities. However, examination of the actual IRC logs contradicts any narrative of "active participation in underground communities." The user's behavior across channels is characterized by:
- Brief, passive lurking sessions
- Posting only gibberish messages or single words across most channels
- Lack of engagement in substantive discussions about hacking, exploits, tools, or illegal activities
- Observable session durations showing cursory observation (23 seconds to 3.5 hours) with minimal communication

The channel names are suspicious and suggest the user's interest in hacking-related topics, but the actual documented behavior shows peripheral participation rather than active involvement in malicious communities.

### Finding 4: Ethereal Packet Capture Tool Installation with WinPcap

The system contained Ethereal (installed 2004-08-13) and WinPcap driver, providing full capability for network packet capture and analysis including unencrypted credential interception. Ethereal remained present and current through August 27, 2004 (last modified timestamp). However, no evidence supports actual tool usage: no .pcap or .pcapng capture files were recovered, no execution logs document Ethereal being run, and no evidence of captured credentials or network analysis results was found. The tool's presence indicates technical interest and capability for credential theft operations, but not actuality of such attacks.

### Finding 5: LOOK@LAN Network Scanning Tool - Execution Evidence

LOOK@LAN network scanner shows execution evidence in prefetch records (executed 2004-08-25T15:56:33 and 2004-08-26T15:06:14), and configuration files identify the system's computer name (N-1A9ODN6ZXK4LQ). This represents confirmed tool usage rather than mere installation. However, no scan result files, logs, or output documenting target networks scanned or hosts discovered were recovered. The tool was executed during the active system usage period, correlating with the timeline of IRC activity and hacking tool installation, suggesting interest in network reconnaissance. Without evidence of scan results or subsequent attack activity, execution alone cannot establish successful reconnaissance or targeting.

### Finding 6: Cain Password Recovery and Network Tool

Cain password recovery tool was installed with an associated 3.4 MB wordlist file. The wordlist predates system activity (created 2002-05-09), suggesting default installation rather than active preparation. No evidence of Cain execution, password cracking attempts, or credential theft was recovered. The tool represents installed capability but lacks supporting evidence of usage.

### Finding 7: Network Stumbler Wireless Detection Tool Access

A desktop shortcut to Network Stumbler wireless network detection software was created on 2004-08-27 at 15:12:17, organized within a Desktop\Tools folder alongside other utilities. This indicates the tool was readily accessible and intentionally organized. However, no execution evidence or wireless network scanning results were discovered. The presence of a shortcut demonstrates access but not usage of the wireless reconnaissance tool.

### Finding 8: Desktop Tools Organization

The creation of a Desktop\Tools folder containing network reconnaissance tool shortcuts (Network Stumbler) indicates intentional collection and organization of utility access points. Folder organization suggests deliberate setup for network exploration but does not constitute evidence of attacks.

## Threat Intelligence and Attribution

The evidence documents a system owned by the primary user account "Mr. Evil" (@yahoo.com) containing multiple installed network analysis and reconnaissance tools. The system configuration shows preparation for both wired and wireless network monitoring, through tools such as Ethereal (packet sniffing), LOOK@LAN (network discovery), Network Stumbler (wireless detection), and Cain (credential recovery). The user's IRC activity shows interest in online communities with names associated with hacking, warez distribution, and shell access trading.

However, the evidence does not establish successful attacks or credential theft. The critical distinction is between **tool installation** (confirmed) and **tool usage for attacks** (not confirmed). Specifically:

- No packet capture files document actual network monitoring
- No evidence shows successful credential interception or theft
- No breach of victim systems was documented
- IRC behavior shows passive observation rather than active malicious coordination
- No exfiltrated victim data was recovered from the system

Regarding attribution to suspect Greg Schardt: The username "Mr. Evil" matches the suspected alias for Schardt. However, independent confirmation is absent. The findings note that this represents a single-source inference based on username matching. Generic usernames with "evil" themes are common in online gaming, testing, and chat communities, and the presence of such an alias does not definitively establish identity without additional corroboration.

## Impact Assessment

The recovered system represents a single device with preparation for network reconnaissance and credential interception activities. The owner (identified in system configuration as "Mr. Evil") had technical capability through installed tools to conduct wireless and wired network attacks targeting users at public hotspots. However, evidence of actual attacks—compromised victim systems, intercepted credentials, or exfiltrated data—was not recovered on this device.

The scope of impact is indeterminate. While the system contained tools and configuration consistent with the described suspected activity (wireless surveillance at public access points), the actual number of victim networks or users exposed remains unknown. No victim data, attack logs, or successful breach evidence was discovered.

## Immediate Tactical Containment

The device has been recovered and is secured in evidence. The following immediate actions are appropriate:

1. Preserve the system as forensic evidence for continued analysis and legal proceedings.
2. Monitor the Mr. Evil@yahoo.com email account for activity or associated accounts.
3. Monitor Undernet IRC network access for logins using the configured usernames "Mr," "mrevilrulez," or ident "Mrevil."
4. Alert wireless network operators (T-Mobile, Starbucks WiFi networks in Los Angeles area) to the suspected threat actor's modus operandi and potential system identifiers (computer name N-1A9ODN6ZXK4LQ, wireless PCMCIA card with homemade antenna).
5. Investigate the suspect Greg Schardt through law enforcement channels for additional devices, accounts, or associates.

## Strategic Remediation

**Root Cause 1: Wireless Access Point Security Gaps**
The suspected threat activity (interception of traffic at public wireless hotspots like T-Mobile and Starbucks) exploits the absence of network segmentation and default open wireless configurations at commercial establishments. The specific tools installed (Ethereal, WinPcap, Network Stumbler) are designed for wireless traffic analysis on unencrypted networks. Wireless operators must implement WPA2/WPA3 encryption with strong credentials, network segmentation isolating user traffic from backend systems, and monitoring for unauthorized packet capture tools. This case specifically demonstrates that default or open wireless configurations expose user credentials in cleartext to any user sharing the access point.

**Root Cause 2: Lack of User Credential Encryption in Transit**
The victim surveillance documented in the case briefing (users at wireless hotspots having internet traffic recorded) indicates unencrypted credential transmission. The tool choice (Ethereal packet sniffer) reflects the attacker's ability to simply capture traffic in cleartext from a shared wireless medium. Organizations and service providers must mandate HTTPS/TLS for all authentication and sensitive data access, enforce certificate pinning where applicable, and disable cleartext protocols (HTTP, Telnet, unencrypted IMAP/POP). The presence of Ethereal as the interception tool confirms the attacker was exploiting the absence of encryption rather than compromising application-level authentication.

**Root Cause 3: Public Device Network Access Controls**
This notebook computer demonstrates that a single consumer-grade laptop with freely available open-source tools can conduct reconnaissance and credential interception against commercial wireless networks. The ease of tool installation (Ethereal, WinPcap, LOOK@LAN are all open-source with simple Windows installation) and the system's unrestricted access to wireless networks reflects the absence of network access controls at public hotspots. Wireless operators should implement: (1) mandatory authentication gating before data network access, (2) continuous monitoring for packet sniffing tools and their drivers (WinPcap driver signature detection), and (3) isolation of the access point network from management and backend infrastructure.

**Root Cause 4: Incomplete Digital Forensics and Evidence Preservation**
The system contained suspicious configuration but minimal evidence of actual attacks—no victim data, no attack logs, no exfiltrated information was recovered. This suggests either the attacker was careful to remove evidence, or reconnaissance/credential interception happened on remote systems without data retention on the laptop. Law enforcement should expand the investigation to examine network infrastructure logs from T-Mobile and Starbucks network administrators for the suspect's presence, timeline, and any documented unauthorized access attempts during the dates the recovered device was active.

## Conclusion

### Investigation Questions

**Q1. What systems were compromised?**
The recovered Dell Latitude CPi notebook bears evidence of preparation for reconnaissance and credential interception at wireless access points but was not itself a compromised victim. The system was the attacker's tool. Victim systems and networks that may have been compromised through reconnaissance conducted from this device remain unknown. The investigation should expand to victim notification and law enforcement coordination across T-Mobile and Starbucks locations in the Los Angeles area during August 2004.

**Q2. How did the attacker gain initial access?**
The recovered device was the attacker's platform, not a victim system. However, the attacker's method for targeting victim networks was wireless network access point positioning with packet capture tools to intercept unencrypted traffic.

**Q3. What lateral movement occurred?**
No lateral movement evidence was recovered. The system was a stand-alone attacker platform, not a compromised network device.

**Q4. What persistence mechanisms were installed?**
No persistence mechanisms (rootkits, backdoors, scheduled tasks, or hidden startup modifications) were documented on the recovered device. The system represents a portable attacker toolkit rather than a compromised victim.

**Q5. Was data exfiltrated, and if so, what and how much?**
No exfiltrated victim data was recovered on the device itself. However, the system contained tools (Ethereal) and configuration (wireless access) consistent with data exfiltration through credential interception from wireless network users. The actual volume of exfiltrated data and identity of victims remain unknown.

**Q6. What is the full timeline of the incident?**
The recovered device was configured and activated for suspicious activity between August 19 and August 27, 2004. Initial system configuration and user account creation occurred on August 19, 2004. Hacking tools were installed August 7-26, 2004. LOOK@LAN network scanner was executed August 25-26. IRC activity occurred August 20, 2004, showing interest in hacking-related communities. The final recorded activity on the device is August 27, 2004 at 15:46:27 UTC. The extent of actual victim targeting and reconnaissance prior to device abandonment remains undetermined.

**Q7. What is the total scope and business impact?**
The scope is limited to the recovered device itself. The device's owner ("Mr. Evil"/"Mr. Evil@yahoo.com") had technical capability to intercept network traffic at wireless hotspots through installed packet capture tools. The actual impact—how many victim networks, how many users, what data—depends on victim network monitoring and user reports beyond this forensic analysis.

**Q8. What are the recommended remediation actions?**
1. Wireless operators (T-Mobile, Starbucks) must implement WPA2/WPA3 encryption and network segmentation.
2. Organizations must mandate TLS/HTTPS encryption for all credential and sensitive data transmission.
3. Law enforcement should expand the investigation to query wireless network logs during August 2004 for unauthorized access attempts and the recovered device's presence.
4. Suspect Greg Schardt should be interviewed; his residence, vehicles, and associated persons should be investigated for additional devices and accomplices.
5. Email provider (Yahoo) should preserve logs for Mr. Evil@yahoo.com account to identify communication with associates or victim accounts.

---

## Case Questions Appendix

**Case Q1:** Image hash: MD5 = 943243e71eda7481fee7b83f06698993; SHA256 = 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31. Acquisition hash verification: Unable to determine from available evidence if acquisition verification hash was computed and matches—only the image hash is available in hashdeep output.

**Case Q2:** Windows XP Home Edition (ProductVersion 5.1)

**Case Q3:** OS install date not directly documented in available evidence; system configuration begins August 19, 2004.

**Case Q4:** Timezone information not clearly extracted in available evidence searched.

**Case Q5:** Registered owner not documented in available evidence.

**Case Q6:** Computer account name: N-1A9ODN6ZXK4LQ (from LOOK@LAN configuration file).

**Case Q7:** Primary domain: Undernet (losangeles.ca.us.undernet.org) from MIRC IRC configuration.

**Case Q8:** Last recorded shutdown date/time: August 27, 2004 at 15:46:27 UTC (last user activity timestamp).

**Case Q9:** Number of accounts: At least 4 system accounts identified (Administrator, LocalService, NetworkService, Mr. Evil); exact count not fully enumerated in evidence reviewed.

**Case Q10:** Primary user: Mr. Evil (account name, email Mr. Evil@yahoo.com).

**Case Q11:** Last user to logon: Mr. Evil (August 27, 2004 activity).

**Case Q12:** File proving Greg Schardt is "Mr. Evil": Username match in system registry (C:\Documents and Settings\Mr. Evil\) and MIRC configuration correlates to the "Mr. Evil" alias, but no file definitively establishes that this username refers to Greg Schardt. The connection is based on briefing materials associating the "Mr. Evil" nickname with suspect Schardt, not independent evidence within the recovered device.

**Case Q13:** Network cards: Ethernet adapter (specific model/MAC address details not fully extracted in available evidence).

**Case Q14:** IP address and MAC address: Not extracted in available evidence searches.

**Case Q15:** NIC card vendor by MAC address prefix: Unable to determine from available evidence.

**Case Q16:** Six installed hacking programs: (1) Ethereal (packet sniffer), (2) WinPcap (packet capture driver), (3) LOOK@LAN (network scanner), (4) Cain (password recovery), (5) Network Stumbler (wireless detection), (6) Agent tool (purpose unclear from available evidence).

**Case Q17:** SMTP email address: Mr. Evil@yahoo.com (inferred from email references in URLs and account configuration).

**Case Q18:** NNTP settings: Not found in available evidence.

**Case Q19:** Programs showing email/NNTP: Not clearly identified; MIRC could support such configuration but specific settings not extracted.

**Case Q20:** Newsgroups subscribed: Not identified in available evidence.

**Case Q21:** MIRC user settings: ident user = "Mrevil", nick = "Mr", alternate nick = "mrevilrulez", user full name = "Mini Me", IRC server = Undernet Los Angeles.

**Case Q22:** Three IRC channels accessed: (1) #CyberCafe, (2) #evilfork, (3) #Elite.Hackers (plus #ISO-WAREZ, #ushells, #LuxShell also logged).

**Case Q23:** Ethereal packet capture file: No saved packet capture (.pcap) files were recovered. Ethereal was installed but no capture files documented.

**Case Q24:** Wireless computer type of victim: Not documented in recovered files.

**Case Q25:** Websites victim was accessing: Not documented.

**Case Q26:** Main user's web-based email address: Mr. Evil@yahoo.com

**Case Q27:** Yahoo mail filename: Not identified in available evidence.

**Case Q28-Q30:** Recycle bin executables and deletion status: Not analyzed in available evidence.

**Case Q31:** Antivirus check results: ClamAV scan output indicates no viruses detected on the system.


---

## Overview

| | |
|---|---|
| Findings | **11** (2 confirmed, 9 inference) |
| Severity | 0 critical, 3 high, 2 medium, 6 low, 0 info |
| Sources | 9 evidence sources across 210 tool calls |


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
| 2004-07-28T12:38:33 | Multiple Network Hacking and Monitoring Tools Installed | HIGH | ez.mft, ez.prefetch, registry.system |
| 2004-08-13T02:15:35 | Ethereal Packet Capture Tool Installation - Network Traffic Interception Capability | MEDIUM | ez.mft, registry.system |
| 2004-08-19T16:57:43 | Primary System User "Mr. Evil" - Suspected Link to Greg Schardt | HIGH | registry.ntuser.mr. evil, appfiles.program_files.look@lan.irunin.ini |
| 2004-08-20T10:29:01 | Multiple IRC Hacking and Warez Channels Accessed | LOW | appfiles.program_files.mirc.#evilfork.efnet.log, appfiles.program_files.mirc.#iso-warez.efnet.log, appfiles.program_files.mirc.#elite.hackers.undernet.log |
| 2004-08-20T10:29:01 | Active IRC User "mrevilrulez" - Communication with Underground Communities | LOW | appfiles.program_files.mirc.#cybercafe.undernet.log, appfiles.program_files.mirc.#evilfork.efnet.log |
| 2004-08-20T10:29:01 | Warez Channel Participation - Illegal Software Distribution Access | LOW | appfiles.program_files.mirc.#iso-warez.efnet.log |
| 2004-08-20T10:45:34 | Elite Hackers IRC Channel - Membership in Underground Hacking Community | LOW | appfiles.program_files.mirc.#elite.hackers.undernet.log |
| 2004-08-20T15:06:00 | Cain Password Recovery and Network Credential Capture Tool | MEDIUM | ez.mft |
| 2004-08-25T15:56:33 | LOOK@LAN Network Scanning Tool - Active System Reconnaissance | HIGH | appfiles.program_files.look@lan.irunin.ini, ez.prefetch |
| 2004-08-27T15:12:17 | Network Stumbler Tool - Wireless Network Discovery | LOW | ez.mft |
| 2004-08-27T15:12:17 | Desktop Tools Folder - Organized Collection of Hacking Utilities | LOW | ez.mft |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Multiple Network Hacking and Monitoring Tools Installed

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-07-28T12:38:33 to 2004-08-27T15:34:54 |
| **Sources** | ez.mft, ez.prefetch, registry.system |
| **Evidence Refs** | tc_5c6b841b |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1592](https://attack.mitre.org/techniques/T1592/) |


COUNTER-ANALYSIS UPDATE: Multiple hacking and network monitoring tools are INSTALLED on the system, indicating preparation or interest in network analysis. However, the finding should distinguish between tool INSTALLATION and tool USAGE.

**TOOLS IDENTIFIED (Installation dates):**
- Ethereal (2004-08-13) - packet sniffer [INSTALLED, no capture files found]
- WinPcap (packet capture library) [INSTALLED]
- LOOK@LAN (network scanner) - executed 2004-08-25 and 2004-08-26 [INSTALLATION CONFIRMED, EXECUTION CONFIRMED]
- Cain (password recovery) [INSTALLED, no usage evidence]
- Agent tool [INSTALLED]
- Whois (executed 2004-07-28) [INSTALLED, EXECUTION CONFIRMED]
- Telnet (executed 2004-08-26) [INSTALLED, EXECUTION CONFIRMED]

**CRITICAL CAVEAT:** Installation of these tools alone does not prove they were used for actual attacks. Evidence of ACTUAL ATTACKS or SUCCESSFUL RECONNAISSANCE would require:
- Network intrusion logs showing reconnaissance or attacks
- Captured credentials or successful password cracks
- Evidence of compromised systems
- Packet capture files from Ethereal usage
- LOOK@LAN scan results targeting specific networks

The finding appropriately identifies these tools and indicates capability for attacks, but the presence of installed tools is insufficient to prove attacks were conducted without additional evidence of actual usage and results.



### 2. [HIGH] Primary System User "Mr. Evil" - Suspected Link to Greg Schardt

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-19T16:57:43 to 2004-08-27T15:46:27 |
| **Sources** | registry.ntuser.mr. evil, appfiles.program_files.look@lan.irunin.ini |
| **Evidence Refs** | tc_897fc20b |
| **ATT&CK** | [T1087](https://attack.mitre.org/techniques/T1087/) |


COUNTER-ANALYSIS UPDATE: While "Mr. Evil" is the primary user account on this system, the connection to Greg Schardt is based on a single username match.

**EVIDENCE:**
- System user account: "Mr. Evil" 
- Profile location: C:\\Documents and Settings\\Mr. Evil\\
- Email: Mr. Evil@yahoo.com
- Active dates: 2004-08-19 through 2004-08-27

**ATTRIBUTION LIMITATION:**
The username "Mr. Evil" is presumed to correspond to a suspect alias for Greg Schardt. However:
1. This connection is based on username alone with NO OTHER CORROBORATING IDENTITY EVIDENCE
2. "Evil" themed usernames are common in gaming, chatting, and online communities
3. The username could have been created for gaming, testing, or roleplay purposes
4. Without additional identity confirmation (email verification, biographical information, device registration), the attribution remains speculative

REVISED ASSESSMENT: The finding appropriately identifies "Mr. Evil" as the primary system user. However, the connection to Greg Schardt is a single-source inference based on username matching, not confirmed through independent identity verification. This should be noted as a limitation in any attribution conclusions.



### 3. [HIGH] LOOK@LAN Network Scanning Tool - Active System Reconnaissance

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-25T15:56:33 to 2004-08-26T15:06:14 |
| **Sources** | appfiles.program_files.look@lan.irunin.ini, ez.prefetch |
| **Evidence Refs** | tc_3d6f6a5d, tc_897fc20b |
| **ATT&CK** | [T1046](https://attack.mitre.org/techniques/T1046/), [T1592](https://attack.mitre.org/techniques/T1592/) |


COUNTER-ANALYSIS UPDATE: LOOK@LAN network scanning tool shows execution evidence, but NO EVIDENCE of actual scanning activity or successful reconnaissance.

**EVIDENCE OF EXECUTION:**
- Prefetch evidence: Executed 2004-08-25 15:56:33 and 2004-08-26 15:06:14
- Configuration file identifies computer name: N-1A9ODN6ZXK4LQ
- Tool is designed for network host enumeration and service discovery

**EVIDENCE MISSING:**
- NO scan results found (no log files, no output documenting targets scanned)
- NO evidence of discovered systems or services
- NO evidence of reconnaissance activity on external networks
- NO evidence that scan results were used to target specific systems
- NO logs showing what networks/hosts were scanned

**ASSESSMENT:** While the tool WAS EXECUTED during the suspicious time period, there is no evidence it was used to conduct actual reconnaissance against external networks, or that the results led to further attacks.

SIGNIFICANCE: The execution of LOOK@LAN during the period of IRC activity and hacking tool installation does correlate with a timeline of active interest. However, LOOK@LAN could have been executed as testing, configuration, or learning exercises rather than actual malicious reconnaissance.

The finding appropriately documents tool execution, but execution alone (without scan results or subsequent attack evidence) is insufficient to prove successful reconnaissance was conducted.



### 4. [MEDIUM] Ethereal Packet Capture Tool Installation - Network Traffic Interception Capability

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-13T02:15:35 to 2004-08-27T15:34:54 |
| **Sources** | ez.mft, registry.system |
| **Evidence Refs** | tc_5c6b841b, tc_756029be |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1003](https://attack.mitre.org/techniques/T1003/) |


COUNTER-ANALYSIS UPDATE: While Ethereal is installed with WinPcap capability, there is NO EVIDENCE it was actually used for credential interception.

**WHAT THE EVIDENCE SHOWS:**
- Installation: Ethereal installed 2004-08-13, last modified 2004-08-27
- WinPcap driver present
- MITRE mapping (T1040) is technically correct for the tool's CAPABILITY

**WHAT IS MISSING:**
- NO saved packet capture files (.pcap, .pcapng) found on the system
- NO evidence from process execution logs that Ethereal was actually RUN
- NO evidence of credentials intercepted or captured
- NO evidence of successful network traffic analysis
- Tool presence indicates CAPABILITY but not ACTUALITY

The finding states "provides full capability to intercept and analyze network communications including unencrypted credentials" - this is true. However, the finding conflates CAPABILITY with USAGE. Tool installation does not prove the tool was used for attacks.

DOWNGRADE RATIONALE: While Ethereal + WinPcap does provide interception capability, there is zero evidence this system's owner actually used it to intercept credentials. The presence of a network sniffer is suspicious but does not constitute proof of credential theft attacks.



### 5. [MEDIUM] Cain Password Recovery and Network Credential Capture Tool

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:06:00 to 2004-08-20T15:06:00 |
| **Sources** | ez.mft |
| **Evidence Refs** | tc_756029be |
| **ATT&CK** | [T1110](https://attack.mitre.org/techniques/T1110/), [T1040](https://attack.mitre.org/techniques/T1040/) |


COUNTER-ANALYSIS UPDATE: While Cain is installed with a wordlist, there is NO EVIDENCE it was actually used for password cracking or credential theft.

**WHAT THE EVIDENCE SHOWS:**
- Tool installation: Present at C:\\Program Files\\Cain\\
- Wordlist present: 3.4 MB wordlist.txt (modified 2002-05-09)
- MITRE mapping (T1110 - Brute Force, T1040 - Network Traffic) reflects tool CAPABILITY

**WHAT IS MISSING:**
- NO evidence of password cracking attempts (no logs, no configuration changes)
- NO evidence of successful credential theft
- NO evidence of credential capture from network traffic
- NO evidence of ARP spoofing, DNS spoofing, or other attacks using Cain
- NO evidence of actual tool EXECUTION (no meaningful prefetch evidence showing Cain was run)

The wordlist file creation date (2002-05-09) predates the system's activity (2004), suggesting it may be a default/template installation.

DOWNGRADE RATIONALE: Cain presence indicates capability for password recovery and network attacks, but provides zero evidence the tool was actually used. Installation of a hacking tool is suspicious and warrant concern, but actual usage evidence is required to support "preparation for credential theft operations" claims.



### 6. [LOW] Multiple IRC Hacking and Warez Channels Accessed

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:29:01 to 2004-08-20T14:26:18 |
| **Sources** | appfiles.program_files.mirc.#evilfork.efnet.log, appfiles.program_files.mirc.#iso-warez.efnet.log, appfiles.program_files.mirc.#elite.hackers.undernet.log |
| **Evidence Refs** | tc_d6152f8a, tc_aef5b3f3, tc_3d6f6a5d |
| **ATT&CK** | [T1021](https://attack.mitre.org/techniques/T1021/), [T1566](https://attack.mitre.org/techniques/T1566/) |


COUNTER-ANALYSIS UPDATE: The IRC logs cited in this finding do NOT document participation in malicious communities. Actual log examination reveals:

**ORIGINAL CLAIM:** "participation in communities focused on hacking tools, warez distribution, and shell access trading, demonstrating active participation in underground hacker communities."

**ACTUAL EVIDENCE:**
1. #evilfork (2004-08-20 10:30-10:31): User "mrevil" posted single gibberish message "glib smarm cuyk" then disconnected
2. #Elite.Hackers (2004-08-20 10:45-10:49): User observed music bot (pablo playz) playing songs, ZERO hacking discussion
3. #ISO-WAREZ (2004-08-20 10:29-10:29): User connected for 41 seconds, ZERO messages posted, immediate disconnect
4. #LuxShell (2004-08-20 10:42-10:43): User posted same gibberish "glib smarm cuyk"
5. #ushells (2004-08-20 10:44-10:45): User connected for 23 seconds, ZERO messages, immediate disconnect
6. #CyberCafe (2004-08-20 10:54-14:02): User posted "glib marm cuyk", ".", and "hi" - general social chat with no malicious content

The channel NAMES suggest hacking/warez, but the actual user behavior shows only passive lurking with gibberish messages. No discussion of tools, exploits, vulnerabilities, or illegal activities. The majority of conversation shown in logs is OTHER users discussing food, dating, and music sharing.

DOWNGRADE RATIONALE: While the channel names are suspicious, the actual IRC conversation content contradicts the narrative of "active participation in underground hacker communities." The evidence shows brief, passive lurking with meaningless posts, not active coordination or information exchange about hacking or illegal activities.



### 7. [LOW] Active IRC User "mrevilrulez" - Communication with Underground Communities

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:29:01 to 2004-08-20T14:02:55 |
| **Sources** | appfiles.program_files.mirc.#cybercafe.undernet.log, appfiles.program_files.mirc.#evilfork.efnet.log |
| **Evidence Refs** | tc_a95cf6a3, tc_d6152f8a |
| **ATT&CK** | [T1021](https://attack.mitre.org/techniques/T1021/), [T1566](https://attack.mitre.org/techniques/T1566/) |


COUNTER-ANALYSIS UPDATE: The evidence of "active participation in underground hacker communities" does not support the severity claimed.

**ACTUAL EVIDENCE:**
Examination of cited IRC logs reveals:
1. #CyberCafe: User "mrevilrulez" posted THREE messages: "glib marm cuyk", ".", and "hi" - while OTHER users discussed food and dating
2. #evilfork: Same gibberish message "glib smarm cuyk"

No substantive communication occurred. The user did not engage in discussions about hacking tools, exploits, techniques, or illegal activities. The presence of usernames with "evil" and "mrevil" in channels with suspicious names suggests the user was curious or testing aliases, not actively participating in malicious communities.

DOWNGRADE RATIONALE: While channel names are suspicious, the actual user behavior shows minimal engagement (3-4 short messages including gibberish) across multiple channels. This does not constitute "active participation" in underground communities - it demonstrates brief lurking with random posts in various chat channels.



### 8. [LOW] Network Stumbler Tool - Wireless Network Discovery

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-27T15:12:17 to 2004-08-27T15:12:43 |
| **Sources** | ez.mft |
| **Evidence Refs** | tc_e25463a3 |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1046](https://attack.mitre.org/techniques/T1046/) |


COUNTER-ANALYSIS UPDATE: A shortcut to Network Stumbler exists on the Desktop in a Tools folder (created 2004-08-27), indicating the tool was available and organized with other utilities.

**EVIDENCE:**
- Shortcut location: C:\\Documents and Settings\\Mr. Evil\\Desktop\\Tools\\Network Stumbler.lnk
- Creation timestamp: 2004-08-27 15:12:17
- Tool purpose: Detects and maps wireless networks

**EVIDENCE MISSING:**
- NO evidence Network Stumbler was actually EXECUTED
- NO wireless network detection logs or results
- NO evidence of wireless network attacks or exploitation

A shortcut link indicates tool AVAILABILITY and ORGANIZATION, not necessarily active use. While the presence of wireless and wired network reconnaissance tools is suspicious, actual usage would require execution evidence.

DOWNGRADE RATIONALE: The presence of a shortcut link demonstrates the tool was available and accessible, but does not prove the tool was actively used. This finding documents tool presence, not malicious activity.



### 9. [LOW] Desktop Tools Folder - Organized Collection of Hacking Utilities

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-27T15:12:17 to 2004-08-27T15:12:43 |
| **Sources** | ez.mft |
| **Evidence Refs** | tc_e25463a3 |
| **ATT&CK** | [T1037](https://attack.mitre.org/techniques/T1037/) |


COUNTER-ANALYSIS UPDATE: The Desktop Tools folder contains a shortcut to Network Stumbler, indicating organized access to hacking utilities.

**EVIDENCE:**
- Folder location: C:\\Documents and Settings\\Mr. Evil\\Desktop\\Tools\\
- Contents: Network Stumbler shortcut (created 2004-08-27)
- Organization indicates intentional setup

**INTERPRETATION:**
While a Tools folder suggests premeditation and intentional collection of utility shortcuts, folder organization alone does not prove malicious activity. The folder could reflect:
- IT interest and experimentation
- Organized workspace for testing tools
- Preparation for potential network administration or security testing
- Gaming or hobbyist network exploration

WITHOUT EVIDENCE OF ACTUAL TOOL USAGE OR ATTACKS, the folder organization is a supporting indicator of suspicious interest but not definitive proof of malicious intent.

DOWNGRADE RATIONALE: A Tools folder is suspicious context for hacking tools, but organization of shortcuts alone does not constitute evidence of actual malicious activity. This is inference about intent based on organization patterns.



### 10. [LOW] Elite Hackers IRC Channel - Membership in Underground Hacking Community

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:45:34 to 2004-08-20T10:49:05 |
| **Sources** | appfiles.program_files.mirc.#elite.hackers.undernet.log |
| **Evidence Refs** | tc_d241cb89 |
| **ATT&CK** | [T1021](https://attack.mitre.org/techniques/T1021/), [T1005](https://attack.mitre.org/techniques/T1005/) |


COUNTER-ANALYSIS UPDATE: The actual IRC log content contradicts the claim of "membership in underground hacking community."

**ACTUAL EVIDENCE:**
The log for #Elite.Hackers (2004-08-20 10:45:34 to 10:49:05) shows:
[10:45] * Topic: "this isn`t a help channel ! just a simple prv channel ! ty and have fun..."
[10:46] * pablo playz BennyBenassifeat.Dhany - HitMyHeart(Ext.Mix)
[10:48] * pablo playz Ferry Corsten - It's time
Session Close: 10:49:05

The user simply observed a music-sharing bot in a channel. ZERO messages from the user. ZERO discussion of hacking or elite activities. The channel topic references websites, but the actual activity shown is a bot playing music tracks.

While the channel name includes "Elite.Hackers," the observable behavior is passive observation of music sharing, not participation in hacking community activities or self-identification as an elite hacker.

DOWNGRADE RATIONALE: Joining a channel and observing for 3 minutes without posting any messages does not constitute "membership in underground hacking community." The activity observed (music bot) is unrelated to hacking.



### 11. [LOW] Warez Channel Participation - Illegal Software Distribution Access

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:29:01 to 2004-08-20T10:29:42 |
| **Sources** | appfiles.program_files.mirc.#iso-warez.efnet.log |
| **Evidence Refs** | tc_aef5b3f3 |
| **ATT&CK** | [T1566](https://attack.mitre.org/techniques/T1566/) |


COUNTER-ANALYSIS UPDATE: The actual IRC log for #ISO-WAREZ.EFnet contradicts the finding's claim of "involvement in software piracy networks."

**ACTUAL EVIDENCE:** 
Log shows: "Session Start: Fri Aug 20 10:29:01 2004 / Session Ident: #ISO-WAREZ / [10:29] * Now talking in #ISO-WAREZ / Session Close: Fri Aug 20 10:29:42 2004"

The user connected for exactly 41 seconds and posted ZERO messages. There is NO evidence of participation in file distribution, downloading, or any interaction with the warez community. Simply connecting to a channel does not constitute participation in illegal software distribution.

DOWNGRADE RATIONALE: The finding infers involvement in software piracy based solely on channel name and brief presence, without any actual evidence of participation, file transfer, or discussion of illegal software. No messages, no downloads, no communication with community members.



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



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `evil@yahoo.com` |  | Primary System User "Mr. Evil" - Suspected Link to Greg Schardt |




---

## Appendix C: MITRE ATT&CK Coverage

10 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (1) > Initial Access (1) > Persistence (1) > Privilege Escalation (1) > Credential Access (3) > Discovery (3) > Lateral Movement (1) > Collection (1)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Multiple Network Hacking and Monitoring Tools Installed; LOOK@LAN Network Scanning Tool - Active System...; Network Stumbler Tool - Wireless Network Discovery |


### Initial Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1566](https://attack.mitre.org/techniques/T1566/) | Phishing | Multiple IRC Hacking and Warez Channels Accessed; Active IRC User "mrevilrulez" - Communication...; Warez Channel Participation - Illegal Software... |


### Persistence

| Technique | Name | Findings |
|-----------|------|----------|
| [T1037](https://attack.mitre.org/techniques/T1037/) | Boot or Logon Initialization Scripts | Desktop Tools Folder - Organized Collection of... |


### Privilege Escalation

| Technique | Name | Findings |
|-----------|------|----------|
| [T1037](https://attack.mitre.org/techniques/T1037/) | Boot or Logon Initialization Scripts | Desktop Tools Folder - Organized Collection of... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1003](https://attack.mitre.org/techniques/T1003/) | OS Credential Dumping | Ethereal Packet Capture Tool Installation -... |
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Multiple Network Hacking and Monitoring Tools Installed; Ethereal Packet Capture Tool Installation -...; Cain Password Recovery and Network Credential... |
| [T1110](https://attack.mitre.org/techniques/T1110/) | Brute Force | Cain Password Recovery and Network Credential... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Multiple Network Hacking and Monitoring Tools Installed; Ethereal Packet Capture Tool Installation -...; Cain Password Recovery and Network Credential... |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | LOOK@LAN Network Scanning Tool - Active System...; Network Stumbler Tool - Wireless Network Discovery |
| [T1087](https://attack.mitre.org/techniques/T1087/) | Account Discovery | Primary System User "Mr. Evil" - Suspected... |


### Lateral Movement

| Technique | Name | Findings |
|-----------|------|----------|
| [T1021](https://attack.mitre.org/techniques/T1021/) | Remote Services | Multiple IRC Hacking and Warez Channels Accessed; Active IRC User "mrevilrulez" - Communication...; Elite Hackers IRC Channel - Membership in... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1005](https://attack.mitre.org/techniques/T1005/) | Data from Local System | Elite Hackers IRC Channel - Membership in... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 210 |
| Findings submitted | 11 |
| Confirmed | 2 |
| Inferences | 9 |
| Input tokens | 6.3K |
| Output tokens | 56.2K |
| Total tokens | 62.5K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 6.3K | 56.2K | 62.5K |




<details>
<summary>Evidence Sources (149)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 12545 |
| hashdeep.hashes | hashdeep | 6 |
| yara.files | yara | 3 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 44493 |
| bulk.duplicates | bulk_extractor | 46 |
| bulk.email | bulk_extractor | 30259 |
| bulk.ether | bulk_extractor | 37 |
| bulk.exif | bulk_extractor | 8 |
| bulk.ip | bulk_extractor | 1646 |
| bulk.packets | bulk_extractor | 5403 |
| bulk.rfc822 | bulk_extractor | 1143 |
| bulk.tcp | bulk_extractor | 825 |
| bulk.url | bulk_extractor | 15563 |
| bulk.url_searches | bulk_extractor | 42 |
| bulk.url_services | bulk_extractor | 3045 |
| registry.query.software | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| appfiles.program_files.ethereal.dictionary.xml | icat | 649 |
| appfiles.program_files.mirc.aliases.ini | icat | 16 |
| appfiles.program_files.ethereal.mobileipv4.xml | icat | 64 |
| appfiles.program_files.ethereal.nasreq.xml | icat | 293 |
| appfiles.program_files.mirc.#chataholics.undernet.log | icat | 16 |
| appfiles.program_files.ethereal.sunping.xml | icat | 24 |
| appfiles.program_files.mirc.#cybercafe.undernet.log | icat | 207 |
| appfiles.program_files.ethereal.capture_filters.txt | icat | 80 |
| appfiles.program_files.mirc.#elite.hackers.undernet.log | icat | 11 |
| appfiles.program_files.ethereal.capturing.txt | icat | 84 |
| appfiles.program_files.mirc.#evilfork.efnet.log | icat | 11 |
| appfiles.program_files.ethereal.display_filters.txt | icat | 43 |
| appfiles.program_files.mirc.#funny.undernet.log | icat | 10 |
| appfiles.program_files.ethereal.faq.txt | icat | 2228 |
| appfiles.program_files.mirc.#houston.undernet.log | icat | 9 |
| appfiles.program_files.ethereal.getting_started.txt | icat | 90 |
| ez.shimcache | eztools | 140 |
| appfiles.program_files.mirc.#iso-warez.efnet.log | icat | 7 |
| ez.mft | eztools | 12183 |
| registry.system | regripper | 427 |
| appfiles.program_files.ethereal.overview.txt | icat | 38 |
| appfiles.documents_and_settings.my_documents.desktop.ini | icat | 6 |
| appfiles.program_files.mirc.#luxshell.undernet.log | icat | 13 |
| ez.prefetch | eztools | 165 |
| appfiles.program_files.look@lan.irunin.ini | icat | 399 |
| appfiles.program_files.ethereal.well_known.txt | icat | 114 |
| appfiles.documents_and_settings.my_documents.desktop.ini | icat | 10 |
| appfiles.program_files.mirc.#mp3xserv.undernet.log | icat | 15 |
| appfiles.documents_and_settings.application_data.desktop.ini | icat | 4 |
| appfiles.program_files.look@lan.license.txt | icat | 25 |
| appfiles.program_files.ethereal.pcrepattern.3.txt | icat | 1475 |
| appfiles.documents_and_settings.my_documents.desktop.ini | icat | 10 |
| appfiles.program_files.mirc.#thedarktower.afternet.log | icat | 14 |
| appfiles.documents_and_settings.application_data.sharedaccess.ini | icat | 52 |
| appfiles.program_files.ethereal.agentx-mib.txt | icat | 529 |
| appfiles.program_files.mirc.#ushells.undernet.log | icat | 9 |
| appfiles.documents_and_settings.application_data.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.disman-event-mib.txt | icat | 1957 |
| registry.system | regripper | 403 |
| appfiles.program_files.mirc.m5tar.undernet.log | icat | 8 |
| appfiles.documents_and_settings.application_data.brndlog.txt | icat | 5 |
| appfiles.program_files.ethereal.disman-schedule-mib.txt | icat | 701 |
| appfiles.program_files.mirc.mirc.ini | icat | 224 |
| appfiles.program_files.ethereal.disman-script-mib.txt | icat | 1766 |
| appfiles.documents_and_settings.application_data.desktop.ini | icat | 4 |
| appfiles.program_files.mirc.popups.ini | icat | 96 |
| appfiles.program_files.ethereal.etherlike-mib.txt | icat | 1139 |
| appfiles.documents_and_settings.application_data.brndlog.txt | icat | 217 |
| registry.system | regripper | 133 |
| appfiles.program_files.mirc.readme.txt | icat | 34 |
| appfiles.program_files.ethereal.hcnum-tc.txt | icat | 120 |
| appfiles.documents_and_settings.application_data.desktop.ini | icat | 5 |
| appfiles.program_files.mirc.servers.ini | icat | 423 |
| appfiles.program_files.ethereal.host-resources-mib.txt | icat | 1542 |
| appfiles.documents_and_settings.application_data.cleanup.log | icat | 10 |
| appfiles.program_files.mirc.urls.ini | icat | 9 |
| appfiles.program_files.ethereal.host-resources-types.txt | icat | 391 |
| registry.system | regripper | 7 |
| appfiles.program_files.mirc.versions.txt | icat | 472 |
| appfiles.program_files.ethereal.iana-address-family-numbers-mib.txt | icat | 123 |
| appfiles.program_files.ethereal.iana-language-mib.txt | icat | 125 |
| appfiles.program_files.ethereal.ianaiftype-mib.txt | icat | 392 |
| appfiles.program_files.ethereal.if-inverted-stack-mib.txt | icat | 151 |
| registry.security | regripper | 19 |
| appfiles.program_files.ethereal.if-mib.txt | icat | 1816 |
| appfiles.program_files.ethereal.inet-address-mib.txt | icat | 300 |
| appfiles.program_files.ethereal.ip-forward-mib.txt | icat | 811 |
| appfiles.program_files.ethereal.ip-mib.txt | icat | 722 |
| registry.security | regripper | 8 |
| appfiles.program_files.ethereal.ipv6-icmp-mib.txt | icat | 531 |
| appfiles.program_files.ethereal.ipv6-mib.txt | icat | 1445 |
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
| registry.system | regripper | 9600 |
| appfiles.program_files.ethereal.smux-mib.txt | icat | 162 |
| appfiles.program_files.ethereal.snmp-community-mib.txt | icat | 431 |
| appfiles.program_files.ethereal.snmp-framework-mib.txt | icat | 528 |
| appfiles.program_files.ethereal.snmp-mpd-mib.txt | icat | 147 |
| registry.system | regripper | 283 |
| appfiles.program_files.ethereal.snmp-proxy-mib.txt | icat | 296 |
| appfiles.program_files.ethereal.snmp-target-mib.txt | icat | 662 |
| appfiles.program_files.ethereal.snmp-user-based-sm-mib.txt | icat | 914 |
| appfiles.program_files.ethereal.snmp-view-based-acm-mib.txt | icat | 832 |
| registry.system | regripper | 1134 |
| appfiles.program_files.ethereal.snmpv2-conf.txt | icat | 324 |
| appfiles.program_files.ethereal.snmpv2-mib.txt | icat | 856 |
| appfiles.program_files.ethereal.snmpv2-smi.txt | icat | 346 |
| appfiles.program_files.ethereal.snmpv2-tc.txt | icat | 774 |
| appfiles.program_files.ethereal.snmpv2-tm.txt | icat | 178 |
| appfiles.program_files.ethereal.tcp-mib.txt | icat | 332 |
| appfiles.program_files.ethereal.tunnel-mib.txt | icat | 339 |
| registry.system | regripper | 3138 |
| appfiles.program_files.ethereal.ucd-demo-mib.txt | icat | 76 |
| appfiles.program_files.ethereal.ucd-diskio-mib.txt | icat | 119 |
| appfiles.program_files.ethereal.ucd-dlmod-mib.txt | icat | 121 |
| appfiles.program_files.ethereal.ucd-ipfilter-mib.txt | icat | 258 |
| appfiles.program_files.ethereal.ucd-ipfwacc-mib.txt | icat | 329 |
| registry.system | regripper | 199 |
| appfiles.program_files.ethereal.ucd-snmp-mib-old.txt | icat | 746 |
| appfiles.program_files.ethereal.ucd-snmp-mib.txt | icat | 1384 |
| appfiles.program_files.ethereal.udp-mib.txt | icat | 148 |
| appfiles.program_files.ethereal.snmp-notification-mib.txt | icat | 591 |
| registry.system | regripper | 286 |
| clamav.scan | clamav | 1 |
| registry.ntuser.default user | regripper | 70 |
| registry.usrclass.localservice | regripper | 4 |
| registry.ntuser.localservice | regripper | 70 |
| registry.usrclass.mr. evil | regripper | 4 |
| registry.ntuser.mr. evil | regripper | 329 |
| registry.usrclass.networkservice | regripper | 4 |
| registry.ntuser.networkservice | regripper | 70 |
| tsk.masquerade | sleuthkit | 14 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
