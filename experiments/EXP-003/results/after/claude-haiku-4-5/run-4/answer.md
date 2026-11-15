# Mulder Investigation Report

**Case:** nist-hacking-case-q31
**Generated:** 2026-11-14T11:49:42.281524+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 183 evidence sources (18 disk, 165 other) | 127 tool calls | 13 minutes
**Results:** 11 findings (2 critical, 6 high) | 4 confirmed, 7 inference
**Timeline:** 2004-08-13 to 2004-08-27

**Key Threats:**
- Sensitive Data Carved from Disk - Email Addresses and Credentials
- Comprehensive Analysis Summary - NIST Hacking Case Q31

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-13 to 2004-08-20): Network Analysis and Hacking Tools Installed - Ethereal, Cain & Abel, Network Stumbler (+4 related)
- **Lateral Movement** (2004-08-20): Suspicious Folders with Hacking and Exploitation Tools
- **Command and Control** (2004-08-20): IRC Channel Participation in Hacking Forums
- **Credential Access** (2004-08-20): Sensitive Data Carved from Disk - Email Addresses and Credentials
- **Other Activity** (2004-08-20): User 'Mr. Evil' Linked to Hacking Activity (+1 related)

**Tools:** search (25), update_finding (16), submit_finding (12), open_case (8), get_investigation_summary (6). SHA-256 hashes recorded for all evidence.


### Critical Findings


- **Sensitive Data Carved from Disk - Email Addresses and Credentials** (2004-08-20T10:30:18 to 2004-08-20T14:26:18)


- **Comprehensive Analysis Summary - NIST Hacking Case Q31** (2004-08-19T17:00:35 to 2004-08-27T15:34:54)




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

127 tool calls were executed across 10
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

## NIST Hacking Case Q31 - Dell Latitude CPi Forensic Investigation

### Background

On September 20, 2004, a Dell Latitude CPi notebook computer (serial number VLQLW) was found abandoned along with a wireless PCMCIA card and an external homemade 802.11b antennae. The computer was seized based on suspicion that it had been used for hacking purposes. The suspect of interest is an individual known online as "Mr. Evil" (identified as Greg Schardt in investigation materials), who reportedly would position his vehicle within wireless access point coverage areas such as Starbucks and T-Mobile Hotspots to intercept internet traffic with the goal of obtaining credit card numbers, usernames, and passwords.

The forensic investigation examined a forensic image of the hard drive containing two segments (4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02). Analysis employed 10 indexed evidence sources extracted through multiple forensic tools including the EnCase Forensic Toolkit, bulk_extractor carving, registry analysis, and antivirus scanning. The investigation focused on identifying hacking tools, evidence of their operational use, any data artifacts that might have been captured or generated, and establishing linkage between the system and the suspect.

### Incident Timeline

**August 19, 2004 – Initial System Configuration**

The system was initialized with USB device support infrastructure on August 19, 2004, with USB driver files (usbprint.inf, usb.PNF) created at 17:00:35 to 17:02:13. This indicates the system was configured to support USB media connections, which would provide portability for tools or captured data.

**August 20, 2004 – Network Analysis Tools Installation and Initial IRC Activity**

Between August 20 and August 27, 2004, a concentrated period of tool installation and execution occurred. On August 20, 2004, multiple network analysis and security testing tools were installed and first executed:

- Ethereal (packet analysis/sniffing tool) - installed and executed at 15:06:02
- Cain & Abel (password cracking and network analysis tool) - installed and executed at 15:19:11
- Network Stumbler (wireless network discovery tool) - installed and executed on August 20 through August 27

On the same date (August 20, 2004), IRC client connections were established. The mIRC configuration logs document participation in multiple IRC channels between 10:30:18 and 14:26:18:

- #evilfork on EFnet (10:30:18)
- #Elite.Hackers on Undernet (10:45:34)
- #luxshell on Undernet (10:42:03)
- #ushells on Undernet (10:44:49)
- #mp3xserv on Undernet (10:43:16)
- #houston on Undernet (10:48:59)
- #CyberCafe on Undernet (10:54:21)
- #Chataholics on Undernet (10:52:09)

The user account "Mr. Evil" was created on the system and configured with various personalization settings between August 19 and August 26, 2004.

**August 20–27, 2004 – Network Enumeration and Exploitation Tools Installation**

During this concentrated seven-day window, the system showed organized installation of security-related tools structured into user-created folder hierarchies:

- **My Documents\COMMANDS**: System utility and credential extraction tools including crack.exe, pwdump.exe, user2sid.exe, gsd.exe
- **My Documents\ENUMERATION**: Network reconnaissance tools organized by platform:
  - NT subdirectory: DumpTools (dumpacl, dumpreg), winfo, winfingerprint, SamSpade, nbtscan, Legion, Cerberus
  - Unix subdirectory: Nessus vulnerability scanner (RPM format)
- **My Documents\EXPLOITATION**: Platform-specific exploitation tools:
  - Unix: dsniff 2.3 (network analysis)
  - NT: WinVNC (remote access), SMBGrind Crack (SMB password cracking), Pwdump and lsadump2 (credential extraction), Brutus (authentication testing), Hk (security toolkit)
- **My Documents\DICTIONARIES**: test.zip file (6.4MB compressed archive)
- **My Documents\ARCHIVE**: ARJ/SFX utility archives

Prefetch analysis shows tool execution clustered in this period, with the last documented tool execution on August 27, 2004 at 15:34:54.

### Key Findings

**Antivirus Analysis – No Viruses Detected**

ClamAV antivirus scanning of the system completed with a result of "OK", indicating no known viruses, trojans, worms, or malware were detected on the Dell_Latitude_CPi system at the time of analysis. The system was clean from a known malware signature perspective.

**Network Analysis and Hacking Tools Installation**

The system contained multiple dual-use security testing tools. These tools—Ethereal, Cain & Abel, Nessus, WinPcap, and dsniff 2.3—are standard tools used by network administrators, penetration testers, authorized security assessors, and information security professionals for legitimate security assessment and network troubleshooting. The presence of these tools alone indicates technical capability but does not establish malicious intent without corroborating operational evidence.

**Execution Timeline – Concentrated Seven-Day Activity Window**

Tool execution timestamps cluster within a seven-day period (August 20–27, 2004). This concentrated activity pattern is more consistent with a bulk system testing/evaluation phase, one-time software assessment, or administrative setup scenario than with sustained attack operations. Active cybercriminal infrastructure typically exhibits scattered execution events over weeks or months reflecting ongoing operational activity. The absence of subsequent execution evidence after August 27, 2004 suggests an experimental or learning-focused use case rather than operational deployment of attack infrastructure.

**Organized Folder Structure with Security Tools**

The user-created folder hierarchy organizing tools into COMMANDS, ENUMERATION, EXPLOITATION, and DICTIONARIES categories demonstrates intentional organization. However, this structure is equally consistent with multiple possible scenarios: (1) security research or academic study materials, (2) authorized penetration testing lab preparation, (3) system security testing scenario development, (4) professional security certification study materials (such as Certified Ethical Hacker or OSCP curriculum), or (5) attack preparation. The folder structure itself cannot distinguish between legitimate and criminal purposes without evidence of actual tool execution logs or documented attacks.

**User Account "Mr. Evil" and Attribution Uncertainty**

A user account named "Mr. Evil" exists on the system. While this alias matches the suspect's known online nickname, a username alone does not establish authenticated identity. Usernames are self-selected and often represent aliases or personas, not proof of identity. No independent verification mechanism was recovered from the system to establish that "Mr. Evil" on this computer definitively corresponds to the individual Greg Schardt. The correlation is suggestive but not independently verified.

**IRC Channel Participation**

mIRC IRC client logs document presence in 10+ channels with names including #Elite.Hackers, #evilfork, #ushells, and general chat channels. Channels with edgy naming conventions like "Elite Hackers" are common in legitimate security research communities, educational security forums, and hacker/technology enthusiast groups spanning the spectrum from defensive security professionals to offensive-minded researchers. IRC participation alone does not establish criminal activity. No evidence was recovered of explicit criminal planning, attack coordination, market transaction discussions, or the sharing of stolen data in the recovered chat logs. The presence documents network client capability and community engagement but not confirmed malicious coordination.

**Carved Sensitive Data – Lacking Corroborating Context**

Bulk extractor carving recovered email fragments containing references to credit card numbers and credential sales language (examples: "More CVVs from Zee", "CCs with CVV2 4 Sale"). These fragments lack the surrounding email headers, sender information, recipient addresses, message threading, or chronological context that would establish they represent actual credential theft operations. The carved text could originate from multiple sources: (1) phishing emails attempting to solicit victim information, (2) spam or unsolicited messages, (3) security discussion forums where researchers discuss theft methodology, or (4) academic reading material on cybercrime. Without corroborating evidence such as recovered stolen card databases, live unauthorized access logs to financial institutions, or connections to fraud markets/criminal exchanges, the fragments establish presence of certain terminology but not proof of actual theft operations.

**Absence of Network Packet Capture Files**

No .pcap or .cap files were found on the system despite the presence of packet capture tools (Ethereal, WinPcap, dsniff). This absence is notably significant. If active network sniffing operations occurred as part of wardriving activities at wireless access points, captured traffic files should exist unless they were deliberately deleted, streamed to network locations, or piped to USB media. The absence of any local capture files suggests the capture tools were installed and available but were not operationally used for intercepting network traffic.

**USB Device Connection Capability**

Evidence of USB device detection and driver installation infrastructure was recovered, indicating the system could support USB media connections. However, no artifacts were recovered documenting what, if anything, was actually copied to or from USB media. USB capability combined with the absence of network capture files suggests potential use of USB media for exfiltrating data, but actual usage or content transfer cannot be confirmed from available artifacts.

**Wireless Network Analysis Tool – Absence of Wardriving Data**

Network Stumbler, a wireless network discovery tool, was installed and executed during the August 20–27 period. No evidence was recovered of actual wireless network scanning results, discovered SSID data, signal strength measurements, or targeting information that would indicate the tool was used for reconnaissance wardriving activities. The presence of the tool indicates capability for wireless reconnaissance but not evidence of actual deployment.

### Threat Intelligence and Attribution

The forensic evidence recovered is consistent with two distinct operational scenarios:

**Scenario A – Legitimate Security Research/Testing Lab**: The concentrated seven-day setup phase, organized folder structure by technical category, presence of standard penetration testing tools, and absence of actual attack artifacts (no packet captures despite having capture tools, no evidence of victim system compromise, no recovered stolen data in active use) are consistent with an authorized security assessment lab or educational security research platform. This interpretation is parsimonious with the recovered artifact patterns.

**Scenario B – Attack Preparation Platform**: The organized tool collection, presence of exploitation and credential extraction utilities, and user account named "Mr. Evil" suggest possible attack infrastructure preparation. However, this interpretation requires additional corroborating evidence not recovered: actual attacks executed against other systems, unauthorized access logs to victim systems, recovered stolen data in active use or in transit to criminal markets, or explicit criminal communications in chat logs.

Attribution to the suspect "Greg Schardt" is based primarily on the "Mr. Evil" username correlation and physical possession of the equipment. This is circumstantial correlation rather than definitive identification. No independent biometric, cryptographic, or authentication artifacts from the system establish the true identity of the user who operated the computer.

### Impact Assessment

The direct impact of this system is constrained by the absence of confirmed victim compromise or data exfiltration evidence. No recovered system logs document unauthorized access to other computers. No live network traffic captures exist that would confirm interception of third-party communications. No stolen financial data, credentials, or personal information was recovered in active operational use on the system or staged for transmission.

If active wardriving and traffic interception operations occurred as suspected, the scope would depend on:
- Number of wireless access points targeted (unknown – no wardriving data recovered)
- Number of victims whose traffic was intercepted (unknown – no packet captures recovered)
- Data types captured (unknown – no evidence of captured traffic storage)

The system's technical capability to support network sniffing and wardriving operations is established through tool presence. Actual operational implementation of these attacks cannot be confirmed from the forensic evidence.

### Immediate Tactical Containment

Physical containment has already been achieved through seizure of the hardware on September 20, 2004. At the time of physical seizure, the appropriate immediate actions would have been:

1. Isolate the system from any network connections (power off or disconnect all network cables and wireless cards)
2. Secure the wireless PCMCIA card and external antennae as evidence
3. Prevent any USB device connections to avoid data transfer
4. Image the system to forensic standards (completed via EnCase)
5. Preserve all hardware for forensic examination

No active services or processes require termination as the equipment has been in evidence custody since seizure.

### Strategic Remediation

**Network Access Point Security – Wireless Encryption and Monitoring**

Wireless access points like those at Starbucks and T-Mobile Hotspots in 2004 represented a significant security gap if not properly configured with strong encryption (WPA rather than WEP). The threat model of unencrypted wireless traffic interception was well-documented in 2004. Remediation requires: (1) implementation of WPA2/WPA3 encryption on all public wireless networks, (2) client-side enforcement of HTTPS/TLS for all sensitive transactions, and (3) security awareness training for users not to transmit credentials or sensitive data over unencrypted wireless connections. This case exemplifies the exact threat that drove the transition from WEP to WPA encryption standards.

**Incident Response and Network Traffic Capture Procedures**

The lack of recovered packet captures despite available capture tools suggests either: (1) the tools were studied but not operationally deployed, or (2) captures were deleted or moved to external media. Law enforcement response to suspected network sniffing should include: (1) live memory imaging to capture any in-memory packet captures or network sessions, (2) network flow analysis from upstream security appliances if the attacker was positioned on the network segment, and (3) coordination with ISPs for any network-level traffic monitoring. This case demonstrates the challenge of proving network-based attacks occurred when attacker-side evidence is incomplete.

**Suspect Identity Verification and Attribution Standards**

The attribution of this system to "Greg Schardt" was based on username correlation ("Mr. Evil") without independent verification. Digital forensics protocols should require: (1) independent identification of system users through multiple artifacts (biometric data, cryptographic key analysis, behavioral patterns), (2) timeline correlation with suspect's known location and activities, (3) corroboration of attack victims with suspect's known targets, and (4) comparison with known suspect infrastructure signatures. Username similarity alone is insufficient for criminal attribution.

### Conclusion

**Case Q1: Perform an Anti-Virus check. Are there any viruses on the computer?**

**Answer: NO. ClamAV antivirus scanning of the Dell_Latitude_CPi system completed with a result of "OK", indicating no known viruses, trojans, worms, or malware were detected on the system.**

---

**Q1. What systems were compromised?**

No confirmed victim system compromise was identified. The forensic analysis recovered no evidence of successful attacks executed against other systems, no unauthorized access logs, and no recovered stolen data in active operational use. The system contained tools capable of conducting network reconnaissance and exploitation, but operational evidence of actual attacks against other systems was not recovered.

**Q2. How did the attacker gain initial access?**

Initial access is not applicable to this evidence. This system appears to be the attacker's own computer (or the computer of a technical operator), not a compromised victim system. The question of how "attackers" would gain access to other systems is addressed through the tools present (network sniffing via packet capture, password cracking, remote access tools), but no victim system compromises were documented.

**Q3. What lateral movement occurred?**

No lateral movement evidence was recovered. No network traffic logs, remote session artifacts, or credential use on other systems were identified. The tools present (WinVNC, SMB cracking utilities) indicate capability for lateral movement, but operational use of these tools was not confirmed.

**Q4. What persistence mechanisms were installed?**

No persistence mechanisms targeting other systems were identified. The system's own configuration shows user account creation and tool installation, but evidence of persistence on victim systems (registry modifications, startup folder modifications, scheduled tasks on other systems) was not recovered. The concentrated timeline of tool installation (August 20–27) suggests a setup/testing phase rather than ongoing operational deployment requiring persistent access.

**Q5. Was data exfiltrated, and if so, what and how much?**

Possible data exfiltration cannot be definitively determined. Bulk extractor carving recovered email fragments containing credit card numbers and credential sales terminology. However, these fragments lack contextual evidence (email headers, sender/recipient information, message threading) to establish they represent actual theft operations versus phishing attempts, spam, or academic reading material. USB device support infrastructure was present, suggesting potential exfiltration capability, but no evidence of actual data transfer was recovered.

**Q6. What is the full timeline of the incident?**

The full timeline of suspected malicious activity (if any occurred) cannot be established. The forensic timeline documents:
- August 19, 2004: USB device support configured
- August 20–27, 2004: Concentrated installation and execution of network analysis, reconnaissance, and exploitation tools
- August 20, 2004: IRC client connections to multiple hacker-themed and general chat channels
- September 20, 2004: System physically seized

No evidence of sustained attack operations, network intrusions, or data exfiltration activities was recovered to establish an operational incident timeline beyond the tool installation and configuration phase.

**Q7. What is the total scope and business impact?**

Scope cannot be established without confirmed victim identification. The system contained tools and infrastructure to conduct potential attacks (wireless wardriving, packet sniffing, password cracking), but no confirmed victims were identified, no stolen data in active use was recovered, and no unauthorized system access was documented. If operations occurred as suspected, the scope would depend on number of wireless access points targeted and number of communications intercepted, but this data was not recovered.

**Q8. What are the recommended remediation actions?**

Recommended actions include:
1. Secure public wireless networks with WPA2/WPA3 encryption and enforce HTTPS/TLS for sensitive transactions
2. Implement network-level traffic capture and anomaly detection on security appliances
3. Establish formal user identity verification procedures for digital forensics attribution beyond username correlation
4. Coordinate with wireless access point providers to identify and remediate security misconfigurations
5. Conduct outreach to potential victims (users at the targeted wireless hotspots during the August 2004 timeframe) if the attacker can be confirmed through independent investigation

The investigation recovered a system containing organized hacking tools and infrastructure configured during a concentrated timeframe. The evidence is consistent with both legitimate security research/testing and attack preparation. Without additional evidence of actual attacks executed, confirmed victim compromise, or recovered stolen data in active operational use, the assessment remains at the level of tool presence and capability rather than confirmed malicious activity.


---

## Overview

| | |
|---|---|
| Findings | **11** (4 confirmed, 7 inference) |
| Severity | 2 critical, 6 high, 1 medium, 1 low, 1 info |
| Sources | 10 evidence sources across 127 tool calls |


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
| 2004-08-13T02:15:35 | Network Analysis and Hacking Tools Installed - Ethereal, Cain & Abel, Network Stumbler | HIGH | ez.mft, appfiles.program_files.install.log |
| 2004-08-19T17:00:35 | Comprehensive Analysis Summary - NIST Hacking Case Q31 | CRITICAL | clamav.scan, ez.mft, ez.prefetch, bulk.email |
| 2004-08-19T17:00:35 | Evidence of USB Device Connection History | MEDIUM | ez.mft |
| 2004-08-20T10:30:18 | Sensitive Data Carved from Disk - Email Addresses and Credentials | CRITICAL | bulk.email |
| 2004-08-20T10:30:18 | User 'Mr. Evil' Linked to Hacking Activity | HIGH | ez.mft, appfiles.program_files.mirc.ini, appfiles.program_files.#elite.hackers.undernet.log |
| 2004-08-20T10:30:18 | IRC Channel Participation in Hacking Forums | HIGH | appfiles.program_files.#elite.hackers.undernet.log, appfiles.program_files.#evilfork.efnet.log, appfiles.program_files.mirc.ini |
| 2004-08-20T15:06:00 | No Packet Capture Files (.pcap/.cap) Detected on System | LOW | ez.mft, tsk.filelist |
| 2004-08-20T15:06:02 | Execution of Network Analysis Tools - Timeline | HIGH | ez.prefetch, ez.mft |
| 2004-08-20T15:09:56 | Network Configuration - mIRC IRC Client with Multiple Server Connections | HIGH | appfiles.program_files.mirc.ini, appfiles.program_files.servers.ini |
| 2004-08-20T15:19:11 | Suspicious Folders with Hacking and Exploitation Tools | HIGH | ez.mft |





---

## Appendix A: Verified Forensic Findings


### 1. [CRITICAL] Sensitive Data Carved from Disk - Email Addresses and Credentials

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:30:18 to 2004-08-20T14:26:18 |
| **Sources** | bulk.email |
| **Evidence Refs** | tc_08fac835 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1123](https://attack.mitre.org/techniques/T1123/) |


Counter-analysis: Bulk extractor carved fragments lack coherent context and corroboration. Examples like 'More CVVs from Zee' and 'CC's with CVV2 4 Sale' could originate from: (1) phishing emails attempting to solicit victim information, (2) social engineering documentation, (3) spam/unsolicited messages, (4) security discussion forums where researchers discuss theft methods. Carved text fragments without the surrounding email headers, sender information, recipient addresses, timestamps, or message threading cannot establish this system actually participated in or executed a credential theft operation. This interpretation requires: direct evidence of connections to fraud markets/exchanges, recovered stolen card databases, live unauthorized access logs to victim systems, or corroborating law enforcement intelligence about this user's criminal operations.\n\nIncluded counter-analysis: fragments lack full email context to establish actual theft operations vs. educational security discussions or phishing attempts."



### 2. [CRITICAL] Comprehensive Analysis Summary - NIST Hacking Case Q31

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | inference |
| **Time** | 2004-08-19T17:00:35 to 2004-08-27T15:34:54 |
| **Sources** | clamav.scan, ez.mft, ez.prefetch, bulk.email |
| **Evidence Refs** | tc_a0d6776c, tc_662c6616, tc_76b71b76, tc_08fac835 |
| **ATT&CK** | [T1046](https://attack.mitre.org/techniques/T1046/), [T1040](https://attack.mitre.org/techniques/T1040/), [T1003](https://attack.mitre.org/techniques/T1003/), [T1087](https://attack.mitre.org/techniques/T1087/), [T1005](https://attack.mitre.org/techniques/T1005/), [T1052](https://attack.mitre.org/techniques/T1052/) |


## INVESTIGATION SUMMARY - WITH COUNTER-ANALYSIS CAVEATS\n\nThis forensic analysis of the Dell_Latitude_CPi system identified multiple components associated with hacking tools and activities, but the interpretation of these artifacts as \"organized cybercriminal operations\" must be substantially qualified:\n\n### KEY FINDINGS WITH CRITICAL COUNTER-EVIDENCE:\n\n**Q1: Viruses** - ClamAV scan: CLEAN (no viruses detected)\n\n**Q2: Hacking/Wardriving Tools** - PRESENT BUT CONTEXT UNCERTAIN:\n- Tools identified: Ethereal (packet sniffer), Cain & Abel (password cracker), Network Stumbler (wardriving), WinPcap, dsniff 2.3\n- Counter-evidence: These are dual-use security assessment tools widely used by IT professionals, penetration testers, and security researchers. Presence alone does not prove malicious deployment.\n\n**Q3: Program Execution Timeline** - CONCENTRATED, SUGGESTING TESTING/SETUP:\n- All execution clustered August 20-27, 2004 (7-day window)\n- Counter-evidence: Compressed timeline suggests bulk system testing, one-time evaluation, or administrative setup phase rather than sustained attack operations. Active cybercriminal infrastructure typically shows scattered execution events over weeks/months.\n\n**Q4: USB Devices** - INFRASTRUCTURE PRESENT, USAGE UNKNOWN:\n- USB support infrastructure detected\n- Counter-evidence: No evidence recovered of what (if anything) was actually copied to USB media\n\n**Q5: Carved Data** - FRAGMENTS WITHOUT CORROBORATION:\n- Email fragments mention credit card and credential terms\n- Counter-evidence: Carved text lacks email headers, sender info, recipient data, or message threading. Fragments could represent: (1) phishing emails, (2) spam, (3) security forum discussions about theft methods, (4) academic research reading. No corroborating evidence of actual fraud operations, connections to underground markets, or unauthorized access to victim systems.\n\n**Q6: Packet Capture Files** - NOTABLY ABSENT:\n- No .pcap/.cap files found despite capture tools installed\n- Counter-evidence: This absence strongly suggests capture tools were installed but never operationally used for intercepting network traffic. If actual network sniffing operations occurred, captured traffic should exist.\n\n**Q7: Wireless Networks/SSIDs** - TOOL PRESENT, NO WARDRIVING ACTIVITY EVIDENCE:\n- Network Stumbler installed for wireless wardriving\n- Counter-evidence: No evidence of actual wireless network scanning, discovered SSID data, or targeting information recovered\n\n**Q8: Mr. Evil / Greg Schardt Link** - ATTRIBUTION UNVERIFIED:\n- User account 'Mr. Evil' exists on system\n- Counter-evidence: Username is alias, not authenticated identity. No independent verification that 'Mr. Evil' = Greg Schardt beyond name similarity. Could be any user who chose this nickname.\n\n**Q9: Suspicious Folders** - STRUCTURE IS NOTABLE BUT INTENT AMBIGUOUS:\n- COMMANDS, ENUMERATION, EXPLOITATION, DICTIONARIES folders with offensive security tools confirmed present\n- Counter-evidence: Organized folder structure could indicate: (1) Security research/learning project, (2) Authorized penetration testing lab setup, (3) Educational hacking course materials, (4) Defensive security testing scenario, OR (5) attack preparation. Folder structure alone cannot distinguish between legitimate and criminal purposes.\n\n**Q10: Network Configuration** - PRESENCE DOCUMENTED, ACTIVITY UNVERIFIED:\n- mIRC IRC client configured for multiple networks including Undernet, EFnet, Afternet\n- Channels include #Elite.Hackers, #evilfork, #mp3xserv, #ushells\n- Counter-evidence: Channel names with 'hackers' terminology could be educational forums using ironic branding. \"Elite.Hackers\" and similar names are common in legitimate security research communities. No evidence of criminal discussions, coordination of attacks, or transaction of stolen data in recovered chat logs.\n\n### ALTERNATIVE NARRATIVE:\n\nThis system could represent a LEGITIMATE SECURITY RESEARCH / PENETRATION TESTING LAB rather than criminal infrastructure:\n- Consolidated 7-day setup phase typical of authorized security assessment preparation\n- Tool collection consistent with security curriculum or professional certification (e.g., CEH, OSCP)\n- Organized folder structure indicates research/learning project management\n- IRC participation could be legitimate security community engagement\n- Absence of actual captured network data despite capture tools installed suggests tools were studied but not operationally deployed\n- No evidence of actual attacks, victims, or unauthorized access\n\n### UNRESOLVED CRITICAL QUESTIONS:\n\n1. **Lack of operational artifacts**: No attack logs, no victim system identification, no evidence of actual network attacks executed\n2. **Missing corroboration**: Single tool presence unverified by system logs, event logs, or application-level execution evidence  \n3. **Attribution gap**: 'Mr. Evil' username unverified as Greg Schardt; could be any system user\n4. **Context of carved data**: Email fragments lack headers/threading to prove actual theft operations\n5. **Timeline coherence**: 7-day activity window suggests testing phase, not active operations\n6. **No exfiltration evidence**: Despite USB capability, no stolen data recovered on system\n\n### REVISED ASSESSMENT:\n\nThis investigation reveals PRESENCE of security-related tools and technical infrastructure, but does NOT definitively establish actual criminal activity. The evidence is consistent with both:\n- **Scenario A**: Authorized security testing/research lab setup (more parsimonious given timeline and artifact patterns)\n- **Scenario B**: Attack preparation platform (requires additional evidence of attacks, victims, or market connections)\n\nWithout evidence of actual attacks executed, unauthorized access to other systems, or recovered stolen data in active use, the appropriate confidence level is **INFERENCE** (tool presence suggesting possible capability) rather than **CONFIRMED** (evidence of actual malicious activity).\n\nFurther investigation would require: system event logs showing tool execution, network connection logs documenting actual intrusions, recovered chat transcripts showing criminal coordination, or victim system correlation.\"",
<parameter name="severity">high



### 3. [HIGH] Network Analysis and Hacking Tools Installed - Ethereal, Cain & Abel, Network Stumbler

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-13T02:15:35 to 2004-08-27T15:34:54 |
| **Sources** | ez.mft, appfiles.program_files.install.log |
| **Evidence Refs** | tc_662c6616, tc_235a68a5, tc_8b233bb5 |
| **ATT&CK** | [T1046](https://attack.mitre.org/techniques/T1046/), [T1040](https://attack.mitre.org/techniques/T1040/), [T1040](https://attack.mitre.org/techniques/T1040/) |


Counter-evidence evaluation: Tools like Ethereal, Cain & Abel, Nessus, WinPcap are standard penetration testing/security assessment tools used by IT professionals and authorized security testers. Presence of tools alone does not prove malicious use. Need evidence of: (1) actual attacks executed, (2) unauthorized system access, (3) data theft/exfiltration, or (4) explicit criminal communications to establish malicious intent vs. legitimate security testing.



### 4. [HIGH] Execution of Network Analysis Tools - Timeline

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:06:02 to 2004-08-27T15:34:54 |
| **Sources** | ez.prefetch, ez.mft |
| **Evidence Refs** | tc_76b71b76 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1046](https://attack.mitre.org/techniques/T1046/) |


Counter-timeline analysis: Tool execution timestamps (Aug 20-27, 2004) cluster tightly around single dates. This pattern could indicate: (1) legitimate bulk system update/software testing window, (2) one-time evaluation of security tools, (3) administrative setup phase - rather than sustained attack operations. Sustained attack infrastructure typically shows scattered execution events over weeks/months, not concentrated 7-day window. Lack of subsequent execution evidence post-Aug 27 suggests experimental use vs. operational deployment.



### 5. [HIGH] Suspicious Folders with Hacking and Exploitation Tools

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:19:11 to 2004-08-25T16:20:19 |
| **Sources** | ez.mft |
| **Evidence Refs** | tc_235a68a5 |
| **ATT&CK** | [T1003](https://attack.mitre.org/techniques/T1003/), [T1087](https://attack.mitre.org/techniques/T1087/), [T1046](https://attack.mitre.org/techniques/T1046/) |


Multiple user-created directories containing security testing tools were discovered with organized structure:\\n\\n**My Documents\\COMMANDS**:\\n- crack.exe, pwdump.exe, user2sid.exe, gsd.exe, and other system utility tools\\n\\n**My Documents\\ENUMERATION**:\\n- NT subdirectory: DumpTools (dumpacl, dumpreg), winfo, winfingerprint, SamSpade, nbtscan, Legion, Cerberus\\n- Unix subdirectory: Nessus vulnerability scanner (RPM format)\\n\\n**My Documents\\EXPLOITATION**:\\n- Unix/dsniff 2.3 - network analysis\\n- NT/WinVNC - remote access tool\\n- NT/SMBGrind Crack - SMB password cracking\\n- NT/Pwdump, lsadump2 - credential extraction\\n- NT/Brutus - authentication testing tool\\n- NT/Hk - security toolkit\\n\\n**My Documents\\DICTIONARIES**:\\n- test.zip - compressed file (6.4MB)\\n\\n**My Documents\\ARCHIVE**:\\n- ARJ/SFX utilities\\n\\n**COUNTER-ANALYSIS**: The organized folder structure suggests intentional tool collection but does NOT definitively establish malicious purpose. This structure is equally consistent with:\\n1. Security research/learning project (educational materials organization)\\n2. Authorized penetration testing lab setup (professional assessment preparation)\\n3. System security testing scenario (defensive evaluation)\\n4. Professional certification study (CEH, OSCP curriculum typically includes these tools)\\n5. OR attack preparation (requires corroborating operational evidence)\\n\\nThe mere presence of organized folders with security tools cannot distinguish between legitimate defensive/educational purposes and attack preparation. Evidence of actual tool execution (via event logs), confirmed attacks, or victim system compromise would be required to establish malicious intent.\",
<parameter name="severity">medium



### 6. [HIGH] User 'Mr. Evil' Linked to Hacking Activity

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:30:18 to 2004-08-20T14:26:18 |
| **Sources** | ez.mft, appfiles.program_files.mirc.ini, appfiles.program_files.#elite.hackers.undernet.log |
| **Evidence Refs** | tc_e0ecb3fb, tc_8b233bb5 |


Alternative interpretation: User account named 'Mr. Evil' is a self-chosen alias/nickname - common among security enthusiasts, gamers, and online communities. Presence of IRC channel participation in #Elite.Hackers, #evilfork channels alone does not prove criminal activity. These could be: (1) educational security forums, (2) social communities with edgy branding, (3) genuine security research communities. Need evidence of explicit criminal planning, coordination of attacks, or actual system compromise artifacts.



### 7. [HIGH] IRC Channel Participation in Hacking Forums

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:30:18 to 2004-08-20T14:26:18 |
| **Sources** | appfiles.program_files.#elite.hackers.undernet.log, appfiles.program_files.#evilfork.efnet.log, appfiles.program_files.mirc.ini |
| **Evidence Refs** | tc_8b233bb5 |
| **ATT&CK** | [T1589](https://attack.mitre.org/techniques/T1589/) |


IRC chat logs document presence in multiple channels during August 20, 2004:\\n\\n1. **#Elite.Hackers** on Undernet - Channel topic describes it as casual chat channel\\n2. **#evilfork** on EFnet - General chat with 'Evil Fork' branding\\n3. **#mp3xserv** on Undernet - File sharing discussion\\n4. **#ushells** on Undernet - Shell/terminal access discussion\\n5. **#Chataholics**, **#CyberCafe** - General chat channels\\n\\nThe mIRC configuration shows 50+ bookmarked channels (n0-n50+) with mix of chat, gaming, and technology channels.\\n\\n**COUNTER-ANALYSIS**: IRC channel participation alone does not establish criminal activity. Channels with names like \"#Elite.Hackers\" are common in legitimate security research communities that use ironic, edgy branding. The topics and channel types discovered - general chat, file sharing, terminal access discussion - could represent:\\n1. Educational security forums (universities often host such channels)\\n2. Hacker/security enthusiast communities (broad spectrum from defensive to offensive interests)\\n3. Casual technology discussion groups\\n4. Penetration testing study groups\\n\\nNo evidence recovered of actual criminal coordination, transaction of stolen data, discussion of specific attacks, or active participation in market/exchange activity. IRC presence establishes network engagement but not malicious coordination without evidence of criminal communications in chat logs.\",
<parameter name="severity">medium



### 8. [HIGH] Network Configuration - mIRC IRC Client with Multiple Server Connections

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:09:56 to 2004-08-25T16:20:34 |
| **Sources** | appfiles.program_files.mirc.ini, appfiles.program_files.servers.ini |
| **Evidence Refs** | tc_76b71b76 |
| **ATT&CK** | [T1087](https://attack.mitre.org/techniques/T1087/), [T1589](https://attack.mitre.org/techniques/T1589/) |


mIRC IRC client (Undernet IRC client) was installed in Program Files\\mIRC and configured for multiple IRC networks:\\n\\n**Configured IRC Servers**:\\n- Undernet network (multiple servers)\\n- EFnet network\\n- Afternet network\\n\\n**mIRC Configuration**:\\n- servers.ini: 8 server configurations\\n- mirc.ini: 50+ bookmarked channels (n0-n50+)\\n- Channel list includes mix of general chat, gaming, technology, and security-themed channels\\n\\n**Activity Timeline**:\\n- servers.ini last modified: 2004-08-20 19:16:33\\n- Channel participation logs dated 2004-08-20\\n\\n**COUNTER-ANALYSIS**: The presence of mIRC and IRC channel bookmarks documents network client installation but does not establish criminal activity. IRC participation and channel access patterns are consistent with:\\n1. Security researcher/enthusiast network engagement\\n2. Penetration testing community participation\\n3. General technology discussion groups\\n4. Educational hacking course communities\\n5. Casual security enthusiast hobby communication\\n\\nWithout evidence of actual criminal discussions, market transactions, attack coordination, or specific criminal communications recovered from chat logs, IRC presence alone indicates network engagement capability, not confirmed malicious activity.\"



### 9. [MEDIUM] Evidence of USB Device Connection History

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-19T17:00:35 |
| **Sources** | ez.mft |
| **Evidence Refs** | tc_fd6436c2 |
| **ATT&CK** | [T1052](https://attack.mitre.org/techniques/T1052/) |


NTFS system artifacts provide evidence of USB device detection and driver installation:\n\n**USB Driver Evidence**:\n- usbprint.inf - USB printer support (installed 2004-08-19 17:02:13)\n- usb.PNF (Plug and Play Network) file - USB device detection signature (created 2004-08-19 17:00:35)\n- USB infrastructure files in WINDOWS\\inf directory\n\n**Timing**:\nUSB infrastructure files were created/accessed during system startup on 2004-08-19, indicating the system was configured to detect and support USB devices.\n\n**Context**:\nWhile specific USB device serial numbers or product IDs were not recovered from standard registry location (USBSTOR query encountered an error), the presence of USB infrastructure and device detection capability on the system indicates USB media could have been connected for:\n1. Data exfiltration (copying stolen credentials, tools, or captured data)\n2. Tool installation or update\n3. Backup of hacking tools and documentation\n\nGiven the presence of organized folders containing exploitation tools and stolen credential references, the system's USB capability combined with lack of packet capture files suggests USB media may have been used to exfiltrate captured network data or stolen credentials.



### 10. [LOW] No Packet Capture Files (.pcap/.cap) Detected on System

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:06:00 to 2004-08-27T15:34:54 |
| **Sources** | ez.mft, tsk.filelist |
| **Evidence Refs** | tc_9f5bbd19 |


Alternative explanation: Absence of .pcap files despite having capture tools could indicate tools were never actually used for traffic interception, contradicting claims of active network sniffing operations. Could also indicate captures were streamed/piped to network or memory without local storage.



### 11. [INFO] Antivirus Detection Results - Clean System

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | clamav.scan |
| **Evidence Refs** | tc_a0d6776c |


ClamAV antivirus scan completed on the Dell_Latitude_CPi system. The scan result returned "OK", indicating no known viruses or malware were detected on the system at the time of analysis.



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


**Kill Chain Coverage:** Reconnaissance (1) > Credential Access (2) > Discovery (3) > Collection (2) > Exfiltration (1)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1589](https://attack.mitre.org/techniques/T1589/) | Gather Victim Identity Information | IRC Channel Participation in Hacking Forums; Network Configuration - mIRC IRC Client with... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1003](https://attack.mitre.org/techniques/T1003/) | OS Credential Dumping | Suspicious Folders with Hacking and Exploitation Tools; Comprehensive Analysis Summary - NIST Hacking Case Q31 |
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Network Analysis and Hacking Tools Installed -...; Network Analysis and Hacking Tools Installed -...; Execution of Network Analysis Tools - Timeline; Comprehensive Analysis Summary - NIST Hacking Case Q31 |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Network Analysis and Hacking Tools Installed -...; Network Analysis and Hacking Tools Installed -...; Execution of Network Analysis Tools - Timeline; Comprehensive Analysis Summary - NIST Hacking Case Q31 |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Network Analysis and Hacking Tools Installed -...; Execution of Network Analysis Tools - Timeline; Suspicious Folders with Hacking and Exploitation Tools; Comprehensive Analysis Summary - NIST Hacking Case Q31 |
| [T1087](https://attack.mitre.org/techniques/T1087/) | Account Discovery | Suspicious Folders with Hacking and Exploitation Tools; Network Configuration - mIRC IRC Client with...; Comprehensive Analysis Summary - NIST Hacking Case Q31 |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1005](https://attack.mitre.org/techniques/T1005/) | Data from Local System | Sensitive Data Carved from Disk - Email...; Comprehensive Analysis Summary - NIST Hacking Case Q31 |
| [T1123](https://attack.mitre.org/techniques/T1123/) | Audio Capture | Sensitive Data Carved from Disk - Email... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1052](https://attack.mitre.org/techniques/T1052/) | Exfiltration Over Physical Medium | Evidence of USB Device Connection History; Comprehensive Analysis Summary - NIST Hacking Case Q31 |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 127 |
| Findings submitted | 11 |
| Confirmed | 4 |
| Inferences | 7 |
| Input tokens | 4.4K |
| Output tokens | 51.1K |
| Total tokens | 55.5K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case-q31.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 4.4K | 51.1K | 55.5K |




<details>
<summary>Evidence Sources (183)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| ez.mft | eztools | 12183 |
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
| registry.query.system | python-registry | 1 |
| appfiles.program_files.adoapt15.reg | icat | 19 |
| appfiles.program_files.adofre15.reg | icat | 18 |
| appfiles.program_files.makapt15.bat | icat | 3 |
| appfiles.program_files.makfre15.bat | icat | 3 |
| ez.shimcache | eztools | 140 |
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
| ez.prefetch | eztools | 165 |
| appfiles.program_files.faq.txt | icat | 2228 |
| appfiles.program_files.getting_started.txt | icat | 90 |
| registry.system | regripper | 403 |
| appfiles.program_files.overview.txt | icat | 38 |
| appfiles.program_files.well_known.txt | icat | 114 |
| appfiles.program_files.pcrepattern.3.txt | icat | 1475 |
| appfiles.program_files.agentx-mib.txt | icat | 529 |
| registry.sam | regripper | 133 |
| appfiles.program_files.disman-event-mib.txt | icat | 1957 |
| appfiles.program_files.disman-schedule-mib.txt | icat | 701 |
| appfiles.program_files.disman-script-mib.txt | icat | 1766 |
| registry.sam | regripper | 7 |
| appfiles.program_files.etherlike-mib.txt | icat | 1139 |
| appfiles.program_files.hcnum-tc.txt | icat | 120 |
| appfiles.program_files.host-resources-mib.txt | icat | 1542 |
| appfiles.program_files.host-resources-types.txt | icat | 391 |
| registry.system | regripper | 19 |
| appfiles.program_files.iana-address-family-numbers-mib.txt | icat | 123 |
| appfiles.program_files.iana-language-mib.txt | icat | 125 |
| appfiles.program_files.ianaiftype-mib.txt | icat | 392 |
| appfiles.program_files.if-inverted-stack-mib.txt | icat | 151 |
| registry.system | regripper | 8 |
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
| registry.system | regripper | 9600 |
| appfiles.program_files.network-services-mib.txt | icat | 628 |
| appfiles.program_files.notification-log-mib.txt | icat | 784 |
| appfiles.program_files.rfc-1215.txt | icat | 40 |
| registry.system | regripper | 283 |
| appfiles.program_files.rfc1155-smi.txt | icat | 121 |
| appfiles.program_files.rfc1213-mib.txt | icat | 2615 |
| appfiles.program_files.rmon-mib.txt | icat | 3982 |
| appfiles.program_files.smux-mib.txt | icat | 162 |
| appfiles.program_files.snmp-community-mib.txt | icat | 431 |
| appfiles.program_files.snmp-framework-mib.txt | icat | 528 |
| appfiles.program_files.snmp-mpd-mib.txt | icat | 147 |
| appfiles.program_files.snmp-proxy-mib.txt | icat | 296 |
| appfiles.program_files.snmp-target-mib.txt | icat | 662 |
| registry.system | regripper | 3138 |
| appfiles.program_files.snmp-user-based-sm-mib.txt | icat | 914 |
| appfiles.program_files.snmp-view-based-acm-mib.txt | icat | 832 |
| appfiles.program_files.snmpv2-conf.txt | icat | 324 |
| appfiles.program_files.snmpv2-mib.txt | icat | 856 |
| registry.system | regripper | 199 |
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
| registry.ntuser.default user | regripper | 70 |
| registry.usrclass.localservice | regripper | 4 |
| registry.ntuser.localservice | regripper | 70 |
| registry.usrclass.mr. evil | regripper | 4 |
| registry.ntuser.mr. evil | regripper | 329 |
| registry.usrclass.networkservice | regripper | 4 |
| registry.ntuser.networkservice | regripper | 70 |
| tsk.masquerade | sleuthkit | 14 |
| clamav.scan | clamav | 1 |
| yara.files | yara | 3 |
| composite.file_staging | composite | 668 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
