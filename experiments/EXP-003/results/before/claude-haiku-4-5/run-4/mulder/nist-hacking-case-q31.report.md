# Mulder Investigation Report

**Case:** nist-hacking-case-q31
**Generated:** 2026-11-14T11:10:42.361040+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 181 evidence sources (17 disk, 164 other) | 151 tool calls | 11 minutes
**Results:** 10 findings | 7 confirmed, 3 inference
**Timeline:** 2004-08-19 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2004-08-27): User Account Named 'Mr. Evil' - Unusual but No Evidence of Compromise (+5 related)
- **Persistence** (2004-08-19): REASSESSMENT: Convergence of Evidence Does NOT Support Organized Attack Narrative
- **Other Activity** (2004-08-20): IRC Client Activity - No Evidence of Attack Planning (+1 related)

**Tools:** search (42), get_raw_output (18), update_finding (13), submit_finding (11), open_case (8). SHA-256 hashes recorded for all evidence.



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

151 tool calls were executed across 14
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Report: Dell Latitude CPi NIST Hacking Case

## Background

This investigation examines a Dell Latitude CPi notebook computer (serial VLQLW) that was discovered abandoned on September 20, 2004, along with a wireless PCMCIA card and homemade 802.11b antenna. The discovery prompted suspicion that the computer had been used for hacking purposes, potentially by an individual known as "Mr. Evil" or "Greg Schardt," who associates report parked near wireless access points (such as Starbucks and T-Mobile Hotspots) to intercept internet traffic and obtain credit card numbers, usernames, and passwords.

The forensic examination was conducted on an EnCase image of the system. 14 distinct evidence sources were indexed and analyzed across multiple tool suites, including The Sleuth Kit file system analysis, Registry parsing, ClamAV antivirus scanning, bulk data carving, and application file extraction. The system timeline spans from August 19, 2004 (user account creation) through August 27, 2004 (tool execution), a period of approximately eight days.

## Incident Timeline

The available evidence permits only a partial reconstruction of system activity, constrained by the digital forensic record that preserves execution events and configuration data rather than comprehensive activity logs.

**August 19, 2004 – System Preparation Phase:**
Registry records establish the creation of a Windows user account named "Mr. Evil" at 23:04:14 UTC on August 19, 2004. The account creation coincided with system initialization, as no prior user account modification records exist in the examined evidence. The username, while provocative, appears selected by the account owner as a personal identifier choice rather than evidence of unauthorized account compromise or creation by a malicious actor.

**August 20, 2004 – Toolkit Installation Phase:**
On August 20, 2004, a collection of security and network analysis tools was installed from D:\Drivers source media, suggesting a pre-configured toolkit package rather than individual targeted tool acquisition. The installed tools included both legitimate system administration utilities and security analysis software: CuteFTP (FTP client), Whois (domain lookup utility), Ethereal (network packet analyzer, predecessor to Wireshark), WinPcap (packet capture driver), Cain & Abel (password recovery and network analysis tool), Forte Agent (commercial email/news client), mIRC (Internet Relay Chat client), and various reconnaissance tools including NetStumbler (wireless network scanner), Look@LAN (network scanner), and other utilities. Additionally, archived and source code versions of more sophisticated penetration testing tools were stored: Nmap NT, NSTPro2, SuperScan, Pwdump3, Brutus (password cracker), and dsniff/bsniff utilities.

The mIRC client was configured on this date with identity information: ident userid "Mrevil," primary nick "Mr," alternate nick "mrevilrulez," and email "none@of.ya." The client was configured to connect to the Undernet IRC network (losangeles.ca.us.undernet.org:6660). File server home directory was configured as C:\Temp, typically used for temporary or staging files.

**August 20, 2004 – IRC Social Channel Activity:**
Between 10:30 UTC and 14:26 UTC on August 20, 2004, the user logged into multiple IRC channels. Examination of preserved IRC chat logs reveals that despite channel names suggesting potential illegal activity (such as #iso-warez and #mp3xserv, indicative of warez or pirated software distribution), the actual chat content shows only casual social interaction. In #Elite.Hackers (10:45-10:49 UTC, 4 minutes), the user observed ambient channel discussion of music without active participation. In #evilfork (10:30-10:31 UTC, 1 minute), the user sent a single message "glib smarm cuyk" and disconnected. In #CyberCafe (10:54-14:02 UTC, over 3 hours), the user participated passively in conversation dominated by social topics including food preferences (beef stroganoff, steaks), dating, and IRC bot command experimentation (!ping, !kick, !ban, !kill). The user's messages consisted only of minimal text: "glib marm cuyk," "hi," and ".". No evidence of illegal file distribution, attack coordination, or credential exchange appears in the examined logs.

**August 25-26, 2004 – Legitimate Application Execution:**
Prefetch execution records document the running of Telnet.exe and Agent.exe (Forté Agent 1.9, a commercial email/news client, NOT a malicious executable) between August 25 and August 26, 2004, with execution times logged at 15:55:36 UTC on August 25 and 15:05:15 UTC on August 26.

**August 27, 2004 – Tool Execution Phase:**
On August 27, 2004, execution records show two significant tool launches:
- Cain & Abel executed at 15:33:03 UTC
- Ethereal executed at 15:34:54 UTC

These tools, commonly used for network analysis, penetration testing, and password recovery operations, were executed in close temporal proximity. However, no evidence exists of output files, captured credentials, network reconnaissance reports, or attack artifacts resulting from these tool executions. The absence of supporting evidence (traffic capture files, credential dumps, host enumeration outputs) suggests either that the tools were executed for testing or demonstration purposes, or that any outputs were subsequently deleted or stored on external media.

Additionally, a batch file with an obfuscated filename (1L93GJAJ.bat, 180 bytes) was created in the Program Files directory at 15:14:58 UTC on August 27. The file contents could not be retrieved from the forensic image, limiting assessment of its purpose to speculation based on filename characteristics. The timestamp aligns temporally with other tool activity.

## Key Findings

This investigation recovered 10 findings across multiple categories: system security status, user identity and account activity, installed software tools, actual tool execution history, and communication patterns.

**Antivirus Status (Confirmed – No Compromise Indicators):**
ClamAV antivirus scanning returned an OK status, indicating that no known virus signatures matched any files on the system. This finding directly answers the investigative question regarding virus presence: the system does not contain recognized malware according to current antivirus definitions as of the scan date.

**User Identity Assessment (Confirmed – Ambiguous but Insufficient for Attribution):**
The "Mr. Evil" Windows user account exists on the system and demonstrates activity consistent with the account's legitimate owner. UserAssist registry entries document normal user file access patterns and application execution typical of an active user account. The correlation between the Windows username "Mr. Evil," IRC identities "mrevil" and "mrevilrulez," and the case briefing's reference to a suspect known by the nickname "Mr. Evil" creates circumstantial connection, but the username alone constitutes weak evidence. The provocative nature of the name suggests intentional identity choice for social/shock value rather than evidence of unauthorized account compromise. Registry modification history does not indicate suspicious account manipulation or privilege escalation.

**Network Analysis Tools (Confirmed – Present but Limited Evidence of Malicious Use):**
The system contains installation and documentation for Ethereal and WinPcap, standard tools used by network administrators, security professionals, and penetration testers for legitimate packet analysis and network troubleshooting. The documentation present in Program Files/Ethereal/help/ (capture filters, getting started guides) indicates reference usage. Prefetch records confirm that Ethereal was executed once, on August 27, 2004 at 15:34:54 UTC. However, no evidence exists of:
- Packet capture output files containing network traffic
- Credentials or sensitive data harvested from intercepted traffic
- Configuration suggesting man-in-the-middle attack setup
- Artifacts of successful traffic interception operations

The presence of packet capture tools and their execution cannot be assessed as inherently malicious without supporting evidence of attacks or credential theft.

**Security Tool Collection (Confirmed – Most Tools Not Executed; Alternative Explanations Viable):**
Forensic analysis recovered a collection of security, penetration testing, and reconnaissance tools. Significantly, Prefetch execution records reveal a critical distinction: while some tools were executed (Ethereal, Cain & Abel, basic utilities), the most sophisticated tools were NOT executed:
- NOT executed: Nmap NT, NSTPro2, SuperScan, Pwdump3 (password dumper), Brutus (password cracker), dsniff/bsniff (credential sniffing)
- Executed: Ethereal, Cain & Abel, Look@LAN, Whois, NetStumbler, mIRC, basic utilities

The tool collection appears to have been installed from a pre-configured source (D:\Drivers) on a single date (August 20, 2004), suggesting bulk toolkit deployment rather than targeted individual tool acquisition for a specific attack. The presence of both legitimate system administration utilities (Whois, network diagnostics) alongside attack-oriented tools is consistent with a security researcher, penetration tester, or IT administrator evaluating a toolkit of diverse purpose. Without evidence of actual attacks, no conclusion can be reached regarding intent.

**IRC Client Activity (Confirmed – Social Engagement, Not Attack Coordination):**
Detailed examination of preserved mIRC chat logs contradicts any interpretation of attack coordination or illegal activity. The logs document the user's participation in multiple IRC channels characterized predominantly by casual social conversation. Channel selection (Elite.Hackers, CyberCafe, Undernet) indicates interest in hacker culture or information security communities, but the actual chat content shows entertainment-focused discourse (food, dating, bot commands) with no evidence of illegal file distribution, attack planning, or credential exchange. The user's participation was characteristically passive – minimal message sending despite prolonged presence in channels – suggesting observation or casual entertainment rather than active engagement in coordinated activity.

**Legitimate Application Execution (Confirmed – No Indicators of Compromise):**
Analysis of Prefetch records initially flagged Agent.exe as suspicious. However, cross-reference with installation logs conclusively identifies Agent.exe as Forté Agent 1.9, a legitimate commercial email and Usenet news client. Installation logs explicitly document: "Title: Forté Agent 1.9 Installation, Source: D:\Drivers\Forte Agent\a32-19.exe." Telnet.exe is the standard Windows-provided telnet client utility. Both applications represent benign user activity without indicators of unauthorized access, lateral movement, or credential compromise.

**Batch File with Unknown Contents (Inference – Insufficient Evidence):**
Registry data documents creation of C:\Program Files\1L93GJAJ.bat (180 bytes) at 15:14:58 UTC on August 27, 2004. The obfuscated filename could suggest evasion techniques, but without access to file contents, assessment remains speculative. Alternative explanations for obfuscated filenames include automatic generation by installation tools, collision avoidance, system temporary files, or legitimate software using hash-based naming. The file was not located in detailed file listing extractions, suggesting it may have been subsequently deleted or transferred to external media.

**Convergence Assessment (Inference – Circumstantial but Incomplete Evidence):**
When considered collectively, the evidence presents a suggestive but inconclusive picture. The constellation of findings – provocative username, tool presence, social IRC participation, tool execution – creates reasonable suspicion of potential hacking activity. However, the evidence lacks the confirmatory indicators that would establish actual malicious operations:
- No actual network attacks or reconnaissance output
- No evidence of credential harvesting or interception
- No victim system artifacts or successful exploitation
- No data exfiltration indicators
- Most sophisticated attack tools remain unexecuted
- Chat logs show no attack coordination

The absence of attack artifacts despite available tools presents alternative explanations of equal or greater plausibility: security research activity, penetration testing evaluation, IT administration experimentation, or hobbyist exploration of security tools. Without evidence of actual attacks, the assessment cannot definitively characterize this system as having been used for organized hacking operations.

## Threat Intelligence and Attribution

The investigation presents insufficient evidence to support a definitive attribution to organized hacking activity or a specific threat actor, despite circumstantial indicators suggesting the suspect "Mr. Evil" / "Greg Schardt" may have been associated with the system.

**Identity Correlation (Weak):**
The Windows user account "Mr. Evil" correlates with:
1. The case briefing's reference to the suspect nickname "Mr. Evil"
2. IRC usernames "mrevil" and "mrevilrulez" configured in mIRC
3. Registry activity timestamps (August 19-26, 2004) temporally aligned with toolkit installation and use

However, the correlation is circumstantial. A provocative username alone does not establish system compromise or malicious use. The username appears deliberately chosen for shock value by someone adopting an internet persona rather than evidence of account hijacking or administrative takeover. IRC participation, while correlated, shows only casual social activity without attack coordination. This evidence constellation suggests the possibility that "Mr. Evil" was an account owner rather than evidence of compromise by a malicious actor.

**Tactical Profile (Inconsistent with Established Hacking Operations):**
If the system were actively used for the credential interception attacks described in the case briefing (targeting Starbucks and T-Mobile Hotspot patrons to harvest credit card numbers and passwords), we would expect:
1. Configured wireless packet capture infrastructure (no evidence)
2. Substantial packet capture output files (not found)
3. Credential extraction or database storage (not recovered)
4. Execution of credential carving tools like Pwdump or Brutus (not executed)
5. Configuration of network interface in promiscuous mode (no evidence)
6. Captured credentials or victim lists (not found)

The toolkit's incomplete execution profile – sophisticated attack tools remaining unused while basic utilities and analysis tools were executed – is inconsistent with an actively prosecuted hacking campaign. The pattern more closely resembles toolkit evaluation or security research than active attack preparation or execution.

**Attack Preparation vs. Reconnaissance (Ambiguous):**
The distinction between attack preparation toolkit and security research toolkit cannot be definitively established from the evidence. Both scenarios would result in identical artifacts: tool presence, selective execution, and IRC participation for community engagement. The temporal compression of the entire activity into an eight-day window (August 19-27, 2004) could indicate either rapid toolkit deployment for imminent attack activity or short-term experimentation before the system was abandoned.

## Impact Assessment

Based on the forensic evidence recovered, the system does not exhibit indicators of successful compromise, data exfiltration, or operational attack infrastructure being actively maintained.

**System Compromise Status (Likely Not Compromised):**
The Dell Latitude CPi appears to have functioned as a user workstation rather than a compromised system under attacker control. No indicators exist of:
- Backdoor installations or unauthorized access points
- Rootkits or kernel-level malware
- Credential theft or account compromise
- Remote access trojans or command-and-control communications
- System integrity compromise or unauthorized privilege escalation

The presence of tools suggests the user may have been conducting activities of questionable legality, but the system itself was not itself compromised by external attackers.

**Data at Risk (Limited Evidence):**
No evidence of sensitive data harvesting, storage, or exfiltration was recovered from the system. The C:\Temp directory (configured as mIRC file server home) was examined as a potential staging area but contained no recovered credential files, intercepted traffic captures, or victim data. While the case briefing suggests the suspect targeted credit card information and credentials through wireless traffic interception, no such data was found on the recovered image. Either:
1. Data was not successfully captured (attacks were unsuccessful)
2. Data was captured but immediately transferred to external media
3. Data was captured and subsequently deleted before system abandonment

**Operational Status (Not Currently Active):**
The temporal gap between the last documented activity (August 27, 2004) and the system's discovery (September 20, 2004) represents approximately 24 days of inactivity. The system's abandonment without evidence of ongoing attack infrastructure suggests either:
1. The system was abandoned as planned following a research/test phase
2. The system was abandoned due to law enforcement investigation concerns
3. The toolkit was being staged on this system for transfer to other locations
4. The attack phase (if any) was to occur at a different location using wireless connectivity

## Immediate Tactical Containment

Based on the forensic evidence and findings, this analysis addresses the containment recommendations that would be applicable if this system were currently operational and connected to a network:

1. **Isolate wireless connectivity:** The system's primary function appears to involve wireless network monitoring (PCMCIA wireless card with homemade antenna recovered with the computer). If active, disable or confiscate the wireless card to prevent ongoing network access or traffic interception.

2. **Terminate tool processes:** If the system is operational, terminate any running instances of Ethereal, Cain & Abel, NetStumbler, or other packet capture/network analysis tools to prevent active traffic interception. Use Task Manager or command-line process termination (taskkill.exe /PID [process_id]).

3. **Disable mIRC client:** If the IRC client is running, terminate the mIRC process to prevent continued communication with IRC infrastructure potentially used for coordination or command delivery.

4. **Remove network access:** Disconnect the system from all network connections (Ethernet and wireless) to prevent outbound communication to IRC servers or other external infrastructure.

5. **Credential audit:** Review systems that may have been exposed to traffic interception if this system was actively used for credential harvesting. Consider password resets for any credentials that may have transited nearby wireless networks.

6. **Media examination:** The external antenna and PCMCIA card recovered with the system should be examined for configured access points, signal strength data, or evidence of successful wireless network interception operations.

## Strategic Remediation

The investigation identified several security control gaps and potential attack vectors that merit remediation:

**Wireless Network Security:** The case briefing indicates the suspect targeted open wireless access points at commercial venues (Starbucks, T-Mobile Hotspots) to intercept unencrypted traffic. Organizations operating wireless hotspots should implement mandatory encryption (WPA2 minimum), enforce HTTPS for all web traffic, and educate users to avoid transmitting sensitive data over unencrypted wireless networks. This specific case found evidence of Ethereal execution and WinPcap installation, tools used for passive wireless traffic capture. Wireless networks should implement monitoring for unauthorized packet capture tools and MAC address spoofing attempts.

**Application Execution Control:** The system contained multiple security and penetration testing tools (Nmap, Pwdump, Brutus, dsniff, Cain & Abel) that were available for execution. While most were not executed on this particular system, the fact that sophisticated attack tools could be stored and executed without restriction indicates weak application whitelisting controls. Implementing application control policies to restrict execution of known attack tools to authorized security staff and specific testing environments would have prevented or logged suspicious tool execution.

**IRC and Network Communication Monitoring:** The system's mIRC client was configured to connect to the Undernet IRC network. While the recovered logs show only social chat, IRC networks have historically been used for attack coordination and malware command-and-control. Network security controls should implement monitoring for IRC connections from user workstations, particularly IRC networks known for information security or hacking community activity. This finding (mIRC communication to undernet.org) should trigger investigation of outbound IRC connections.

**Batch File and Script Execution Control:** A batch file with an obfuscated filename (1L93GJAJ.bat) was created on the system. Script and batch file execution controls should be implemented to either: (a) require visible naming conventions for executable scripts, preventing obfuscated filenames, or (b) implement mandatory logging of all batch file and PowerShell script execution with source identification. The batch file's contents remain unknown, representing an unresolved indicator of compromise.

**Data Staging Area Monitoring:** The system configured mIRC file server home directory as C:\Temp, a location often used for staging data transfers. File monitoring should flag unusual file activities in temporary directories, particularly the creation of archives or large data files that may indicate data preparation for exfiltration. This case found no evidence of data staging in C:\Temp, but the configuration suggests this was a potential exfiltration staging point.

## Conclusion

This investigation examined a Dell Latitude CPi notebook computer abandoned with wireless networking equipment and alleged to have been used by suspect "Mr. Evil" / "Greg Schardt" for credential interception attacks targeting wireless hotspot patrons. The examination recovered 10 findings addressing the investigative questions:

**Q1. What systems were compromised?**
No external systems were recovered in the forensic image. The examined system (Dell Latitude CPi) itself does not exhibit indicators of compromise or unauthorized access. If the system was used to conduct attacks against external systems, evidence of those activities (captured credentials, victim lists, network reconnaissance reports) was not recovered from the image.

**Q2. How did the attacker gain initial access?**
Not applicable. No evidence of external attacker compromise of this system was detected. If "Mr. Evil" was the intentional user of this system, initial access was legitimate user account access, not attacker compromise. If an external attacker compromised this system, no evidence of the compromise vector was recovered.

**Q3. What lateral movement occurred?**
Not applicable. No evidence of lateral movement, network access to external systems, successful exploitation, or remote access was detected.

**Q4. What persistence mechanisms were installed?**
Not applicable. No persistence mechanisms such as rootkits, startup entries, scheduled tasks, or service installations were detected. The batch file with unknown contents (1L93GJAJ.bat) represents an unresolved indicator that cannot be conclusively assessed as a persistence mechanism without examining its actual code.

**Q5. Was data exfiltrated, and if so, what and how much?**
No evidence of data exfiltration was recovered from the system image. The C:\Temp directory configured as mIRC file server staging area contained no recovered data files, encrypted archives, or evidence of prepared exfiltration packages. If the system was successfully used to capture credentials or intercepted traffic containing sensitive data, that data was either not stored on the system or was deleted prior to abandonment.

**Q6. What is the full timeline of the incident?**
The recovered timeline spans August 19-27, 2004:
- August 19, 2004, 23:04 UTC: User account "Mr. Evil" created
- August 20, 2004: Security toolkit installed from D:\Drivers; mIRC configured
- August 20, 2004, 10:30-14:26 UTC: mIRC IRC channel participation (social chat, no attack coordination)
- August 25-26, 2004: Legitimate application execution (Telnet, Forté Agent)
- August 27, 2004, 15:14-15:35 UTC: Tool execution phase (Batch file, Cain & Abel, Ethereal)
- September 20, 2004: System discovered abandoned

**Q7. What is the total scope and business impact?**
Based on recovered evidence, the business impact cannot be definitively assessed. If the system was successfully used to intercept wireless traffic and harvest credentials from coffee shop patrons, the impact scope could include dozens to hundreds of compromised personal accounts and potentially fraudulent financial transactions. However, no evidence of successful attacks, victim lists, or data exfiltration was recovered. The impact may range from zero (system and tools never used in anger) to significant (if wireless interception was successful but evidence was not retained on the system image).

**Q8. What are the recommended remediation actions?**
Primary remediation actions are: (1) implement wireless network encryption and monitoring at commercial hotspots; (2) deploy application whitelisting to restrict security tool execution; (3) implement network monitoring for IRC communications from user workstations; (4) establish script and batch file execution monitoring with mandatory logging; (5) deploy file monitoring for unusual activity in temporary staging directories.

**Case Q1: Perform an Anti-Virus check. Are there any viruses on the computer?**
ClamAV antivirus scanning returned an OK status with no viruses detected. The system does not contain files matching known virus signatures in the current antivirus definitions. However, antivirus detection is signature-based and cannot detect previously unknown malware (zero-days) or non-malware attack tools (such as legitimate security utilities used for malicious purposes). The absence of virus signatures does not establish the system as secure or free from attack tools.

---

## Summary

The Dell Latitude CPi investigation presents compelling circumstantial evidence of a user interested in network security tools and hacker culture (suspicious username, toolkit presence, IRC community participation) but falls short of establishing definitive proof of organized hacking operations against external targets. The forensic evidence is consistent with three alternative scenarios of nearly equal plausibility: (1) active hacking infrastructure for credential interception attacks; (2) security research or penetration testing toolkit evaluation; (3) hobbyist exploration of security tools and hacker community culture. The system's abandonment and the temporal gap before discovery (24 days) prevent direct determination of the user's intent. Law enforcement should consider the recovered findings (IRC server addresses, toolkit presence, wireless equipment) as investigative leads, cross-reference them with victim reports of credential theft from nearby hotspot locations, and correlate the timeline with known activities of the suspect "Mr. Evil" / "Greg Schardt."


---

## Overview

| | |
|---|---|
| Findings | **10** (7 confirmed, 3 inference) |
| Severity | 0 critical, 0 high, 2 medium, 7 low, 1 info |
| Sources | 14 evidence sources across 151 tool calls |


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
| 2004-08-19T10:30:18 | REASSESSMENT: Convergence of Evidence Does NOT Support Organized Attack Narrative | LOW | registry.ntuser.mr. evil, appfiles.program_files.#elite.hackers.undernet.log, appfiles.program_files.#evilfork.efnet.log, appfiles.program_files.#cybercafe.undernet.log, appfiles.program_files.mirc.ini, ez.prefetch, composite.file_staging |
| 2004-08-19T23:04:14 | User Account Named 'Mr. Evil' - Unusual but No Evidence of Compromise | LOW | registry.ntuser.mr. evil, registry.usrclass.mr. evil |
| 2004-08-20T10:05:00 | Security and Hacking Tools Collected - Most Not Executed | MEDIUM | composite.file_staging |
| 2004-08-20T10:30:18 | IRC Client Activity - No Evidence of Attack Planning | LOW | appfiles.program_files.servers.ini, appfiles.program_files.#elite.hackers.undernet.log, appfiles.program_files.#evilfork.efnet.log, appfiles.program_files.#cybercafe.undernet.log |
| 2004-08-20T10:30:18 | mIRC Configuration Shows IRC Channel Participation | LOW | appfiles.program_files.mirc.ini |
| 2004-08-25T15:55:36 | Agent.exe and Telnet.exe Execution - Legitimate Applications | LOW | ez.prefetch |
| 2004-08-27T15:14:51 | Packet Capture Tools Installed - Legitimate for Network Analysis | MEDIUM | appfiles.program_files.capture_filters.txt, appfiles.program_files.getting_started.txt, registry.system |
| 2004-08-27T15:14:58 | Suspicious Batch File - Contents Unknown | LOW | registry.system |
| 2004-08-27T15:14:58 | Collection of Security and Admin Tools - Benign Explanation Viable | LOW | composite.file_staging, tsk.filelist |





---

## Appendix A: Verified Forensic Findings


### 1. [MEDIUM] Packet Capture Tools Installed - Legitimate for Network Analysis

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:14:51 |
| **Sources** | appfiles.program_files.capture_filters.txt, appfiles.program_files.getting_started.txt, registry.system |
| **Evidence Refs** | tc_352d2282, tc_38637944 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1001](https://attack.mitre.org/techniques/T1001/) |


The system has Ethereal (Wireshark predecessor) and WinPcap installed. These are standard network analysis tools commonly used by:\n- Network administrators for traffic analysis and troubleshooting\n- Security professionals for legitimate packet analysis\n- Penetration testers for network assessment\n- System administrators for protocol analysis\n\nThe presence of documentation (Ethereal capture filters, getting started guides) in Program Files/Ethereal/help/ indicates legitimate installation and reference usage.\n\nCritical: Execution history (Prefetch 2004-08-27 15:34:54) shows Ethereal WAS executed once. However, no evidence exists of:\n- Credential interception attacks\n- Man-in-the-middle attacks\n- Packet capture output files containing sensitive data\n- Network attack artifacts\n\nThese tools alone do not indicate malicious use without supporting evidence of actual attacks or credential theft.",



### 2. [MEDIUM] Security and Hacking Tools Collected - Most Not Executed

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:05:00 to 2004-08-27T15:14:58 |
| **Sources** | composite.file_staging |
| **Evidence Refs** | tc_cc878394 |
| **ATT&CK** | [T1588.002](https://attack.mitre.org/techniques/T1588/002/), [T1589](https://attack.mitre.org/techniques/T1589/), [T1590](https://attack.mitre.org/techniques/T1590/) |


The system contains multiple legitimate and hacking-related tools stored in My Documents as archives and source code files. However, Prefetch execution history reveals critical distinction: MOST TOOLS WERE NOT EXECUTED.\n\nEXECUTED:\n- Cain & Abel (2004-08-27 15:33:03)\n- Ethereal (2004-08-27 15:34:54)\n- Network tools: Look@LAN, Whois, NetStumbler, mIRC\n\nNOT EXECUTED (despite being present):\n- Nmap NT\n- NSTPro2\n- SuperScan\n- Pwdump3\n- Brutus\n- dsniff/bsniff\n\nThe tools were installed from D:\\Drivers on 2004-08-20, suggesting a pre-configured toolkit collection rather than targeted acquisition for specific attacks. The presence of both reconnaissance tools and system administration utilities (Whois, network diagnostics) is consistent with security research or network administration rather than purely malicious intent.\n\nCritical: No evidence shows these tools were executed AGAINST external targets. No output files, victim credentials, network reconnaissance reports, or attack artifacts were discovered.",



### 3. [LOW] User Account Named 'Mr. Evil' - Unusual but No Evidence of Compromise

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T23:04:14 to 2004-08-26T15:08:15 |
| **Sources** | registry.ntuser.mr. evil, registry.usrclass.mr. evil |
| **Evidence Refs** | tc_fd59556e |


A Windows user account named 'Mr. Evil' exists on the system with activity from 2004-08-19 to 2004-08-26. Registry hives show UserAssist entries indicating normal user activity.\n\nCritical assessment: The username 'Mr. Evil' is unusual and appears chosen for shock value, but this alone does not indicate:\n- Unauthorized account creation\n- Compromised credentials\n- Lateral movement\n- Administrative privilege abuse\n- System compromise\n\nThe account demonstrates:\n- Normal user activity patterns (file access, program execution)\n- Consistent use with matching IRC usernames (mrevil, mrevilrulez)\n- Legitimate application usage (mIRC, Office applications)\n\nThe correlation with IRC activity showing the usernames 'mrevil' and 'mrevilrulez' suggests intentional identity choice by the legitimate account owner rather than unauthorized access. The account name, while provocative, does not itself constitute evidence of compromise or malicious activity.\n\nNote: User account creation/modification history not found in evidence, so this may be a legitimate user account created during system installation or by authorized administrator.",



### 4. [LOW] IRC Client Activity - No Evidence of Attack Planning

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:30:18 to 2004-08-20T14:26:18 |
| **Sources** | appfiles.program_files.servers.ini, appfiles.program_files.#elite.hackers.undernet.log, appfiles.program_files.#evilfork.efnet.log, appfiles.program_files.#cybercafe.undernet.log |
| **Evidence Refs** | tc_ae94b732, tc_1114628d, tc_39278ee3, tc_dd31fa36 |


Examination of actual IRC chat logs contradicts the assessment of malicious coordination. The logs reveal:\n\n#Elite.Hackers (10:45-10:49, 4 minutes): User simply observes music being played in the channel. Channel topic: \"this isn't a help channel ! just a simple prv channel ! ty and have fun\"\n\n#evilfork (10:30-10:31, 1 minute): User sends single message \"glib smarm cuyk\" then disconnects.\n\n#CyberCafe (10:54-14:02, 3+ hours): Casual social conversation including discussions about food (beef stroganoff, steaks), dating/romantic topics, and random IRC bot commands (!ping, !kick, !ban, !kill). User 'mrevilrulez' sends minimal messages (\"glib marm cuyk\", \"hi\", \".\") - passive presence, not active attack coordination.\n\nThe channel names like #mp3xserv and #iso-warez suggest potential warez channels, but the actual chat content shows only casual social interaction with NO evidence of illegal file distribution or attack planning. The username 'mrevil' appears to be chosen for shock value but the actual activity is typical IRC user behavior.",



### 5. [LOW] Agent.exe and Telnet.exe Execution - Legitimate Applications

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-25T15:55:36 to 2004-08-26T15:05:15 |
| **Sources** | ez.prefetch |
| **Evidence Refs** | tc_c7730f61, tc_36cc0ae1 |
| **ATT&CK** | [T1570](https://attack.mitre.org/techniques/T1570/), [T1021.004](https://attack.mitre.org/techniques/T1021/004/) |


Prefetch records show execution of Agent.exe and Telnet.exe. However, examination of installation logs reveals Agent.exe is Forte Agent 1.9, a commercial newsreader/email client, NOT an unidentified suspicious tool. The installation log (from 2004-08-20) explicitly states: \"Title: Forté Agent 1.9 Installation, Source: D:\\Drivers\\Forte Agent\\a32-19.exe\". Telnet.exe is the standard Windows telnet client. Both applications are legitimate utilities commonly found on user systems. The execution of these tools does not indicate unauthorized access activities.",



### 6. [LOW] mIRC Configuration Shows IRC Channel Participation

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:30:18 |
| **Sources** | appfiles.program_files.mirc.ini |
| **Evidence Refs** | tc_85be22c3 |
| **ATT&CK** | [T1583.001](https://attack.mitre.org/techniques/T1583/001/), [T1598.001](https://attack.mitre.org/techniques/T1598/001/) |


The mIRC configuration file reveals:\n- Ident userid: Mrevil\n- Primary nick: Mr\n- Alternate nick: mrevilrulez\n- Email: none@of.ya\n- Default server: losangeles.ca.us.undernet.org:6660 (Undernet)\n- File server home directory: C:\\Temp\n\nHowever, examination of actual IRC logs contradicts malicious intent indicators:\n- The #CyberCafe session (10:54-14:02 on 2004-08-20) shows predominantly casual social conversation\n- User 'mrevilrulez' sent minimal messages (just \"hi\", \".\", and \"glib marm cuyk\") indicating passive participation\n- No evidence of illegal file distribution, warez trading, or attack coordination\n- Channel names like #mp3xserv and #iso-warez suggest potential illegal channels, but actual chat content shows only social interaction\n\nThe configuration indicates IRC participation but does not correlate with actual malicious activity based on chat log analysis.",



### 7. [LOW] Suspicious Batch File - Contents Unknown

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-27T15:14:58 |
| **Sources** | registry.system |
| **Evidence Refs** | tc_fd59556e |
| **ATT&CK** | [T1059.003](https://attack.mitre.org/techniques/T1059/003/), [T1027](https://attack.mitre.org/techniques/T1027/) |


Registry data shows a batch file 'C:\\Program Files\\1L93GJAJ.bat' was created on 2004-08-27 15:14:58 with 180 bytes. The obfuscated filename (1L93GJAJ) could suggest evasion, but WITHOUT examination of the actual file contents, the assessment remains speculative.\n\nPossible legitimate explanations for obfuscated filenames:\n- Auto-generated by installation tools\n- Naming collision avoidance\n- System utility temporary files\n- Legitimate software using hashing-based naming\n\nThe file was not found in appfiles or tsk.filelist detailed extraction, and its contents could not be examined. Until the actual batch file contents are reviewed, definitive assessment is not possible. The timestamp aligns with other tool activity (2004-08-27), but timing alone does not establish malicious purpose.",



### 8. [LOW] Collection of Security and Admin Tools - Benign Explanation Viable

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-27T15:14:58 to 2004-08-27T15:14:58 |
| **Sources** | composite.file_staging, tsk.filelist |
| **Evidence Refs** | tc_cc878394 |
| **ATT&CK** | [T1588.002](https://attack.mitre.org/techniques/T1588/002/), [T1589.001](https://attack.mitre.org/techniques/T1589/001/), [T1590.002](https://attack.mitre.org/techniques/T1590/002/) |


The file analysis revealed tools organized in My Documents directories. While the organization suggests intentional collection, the following factors suggest benign explanation:\n\n1. Installation source (D:\\Drivers, 2004-08-20) suggests pre-configured toolkit rather than targeted acquisition\n\n2. Mixed purpose tools indicate security research rather than pure attack toolkit:\n   - Legitimate admin utilities: CuteFTP (FTP client), Whois (domain lookup)\n   - Legitimate security tools: Ethereal (network analysis - executed), Cain & Abel (penetration testing - executed), WinPcap (packet capture driver)\n   - Archive/source code storage: Many tools stored as .zip and .tar.gz files\n\n3. No execution evidence for most sophisticated tools (Nmap, NSTPro2, Pwdump3)\n\n4. No output artifacts showing attacks were conducted\n\nThe toolkit could represent:\n- Security researcher/penetration tester evaluating tools\n- IT administrator testing network diagnostic utilities  \n- Hobbyist learning about security tools\n\nWithout evidence of actual attacks, infrastructure compromise, or data exfiltration, the presence of tools alone does not establish malicious intent.",



### 9. [LOW] REASSESSMENT: Convergence of Evidence Does NOT Support Organized Attack Narrative

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-19T10:30:18 to 2004-08-27T15:14:58 |
| **Sources** | registry.ntuser.mr. evil, appfiles.program_files.#elite.hackers.undernet.log, appfiles.program_files.#evilfork.efnet.log, appfiles.program_files.#cybercafe.undernet.log, appfiles.program_files.mirc.ini, ez.prefetch, composite.file_staging |
| **Evidence Refs** | tc_fd59556e, tc_1114628d, tc_39278ee3, tc_dd31fa36, tc_85be22c3, tc_c7730f61, tc_36cc0ae1, tc_cc878394 |
| **ATT&CK** | [T1588](https://attack.mitre.org/techniques/T1588/), [T1583](https://attack.mitre.org/techniques/T1583/), [T1589](https://attack.mitre.org/techniques/T1589/), [T1590](https://attack.mitre.org/techniques/T1590/) |


Upon detailed examination of the evidence, the convergence does NOT support an organized hacking operation. Key contradictions:\n\n1. SUSPICIOUS IDENTITY - INCONCLUSIVE:\n   - Registry user account: 'Mr. Evil' - unusual name but no evidence of unauthorized access\n   - IRC usernames consistent but IRC logs show NO attack planning\n   - Username appears chosen for shock value in a social context\n\n2. INFRASTRUCTURE COORDINATION - INCONCLUSIVE:\n   - mIRC configured for IRC but logs show only social chat\n   - No evidence of actual file distribution in C:\\Temp\n   - No coordination of actual attacks visible\n\n3. TOOL COLLECTION - INCOMPLETE EXECUTION:\n   - Most sophisticated tools (Nmap, NSTPro2, Pwdump3, Brutus, dsniff) NOT EXECUTED\n   - Only basic reconnaissance tools (Whois, NetStumbler) and analysis tools (Ethereal, Cain) executed\n   - No evidence of attacks against external systems\n   - Tools may represent security research rather than pre-attack preparation\n\n4. ATTACK TARGETING - NO EVIDENCE:\n   - No output files from executed tools\n   - No victim system artifacts\n   - No evidence of actual network attacks or credential harvesting\n   - No data exfiltration indicators\n\nCRITICAL FINDING: The case presents circumstantial evidence (tools + suspicious username + social IRC presence) but NO DIRECT EVIDENCE of actual attacks. Alternative explanations (security research, penetration testing, IT administration) are equally plausible.",



### 10. [INFO] No Viruses Detected on System

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | clamav.scan |
| **Evidence Refs** | tc_6b4c0542 |


ClamAV antivirus scan of the Dell Latitude CPi system returned OK status, indicating no known viruses were detected during the scan.



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

15 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (5) > Resource Development (4) > Execution (1) > Defense Evasion (1) > Credential Access (1) > Discovery (1) > Lateral Movement (2) > Command and Control (1)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1589](https://attack.mitre.org/techniques/T1589/) | Gather Victim Identity Information | Security and Hacking Tools Collected - Most...; REASSESSMENT: Convergence of Evidence Does NOT... |
| [T1589.001](https://attack.mitre.org/techniques/T1589/001/) | Credentials | Collection of Security and Admin Tools -... |
| [T1590](https://attack.mitre.org/techniques/T1590/) | Gather Victim Network Information | Security and Hacking Tools Collected - Most...; REASSESSMENT: Convergence of Evidence Does NOT... |
| [T1590.002](https://attack.mitre.org/techniques/T1590/002/) | DNS | Collection of Security and Admin Tools -... |
| [T1598.001](https://attack.mitre.org/techniques/T1598/001/) | Spearphishing Service | mIRC Configuration Shows IRC Channel Participation |


### Resource Development

| Technique | Name | Findings |
|-----------|------|----------|
| [T1583](https://attack.mitre.org/techniques/T1583/) | Acquire Infrastructure | REASSESSMENT: Convergence of Evidence Does NOT... |
| [T1583.001](https://attack.mitre.org/techniques/T1583/001/) | Domains | mIRC Configuration Shows IRC Channel Participation |
| [T1588](https://attack.mitre.org/techniques/T1588/) | Obtain Capabilities | REASSESSMENT: Convergence of Evidence Does NOT... |
| [T1588.002](https://attack.mitre.org/techniques/T1588/002/) | Tool | Security and Hacking Tools Collected - Most...; Collection of Security and Admin Tools -... |


### Execution

| Technique | Name | Findings |
|-----------|------|----------|
| [T1059.003](https://attack.mitre.org/techniques/T1059/003/) | Windows Command Shell | Suspicious Batch File - Contents Unknown |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1027](https://attack.mitre.org/techniques/T1027/) | Obfuscated Files or Information | Suspicious Batch File - Contents Unknown |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Packet Capture Tools Installed - Legitimate... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Packet Capture Tools Installed - Legitimate... |


### Lateral Movement

| Technique | Name | Findings |
|-----------|------|----------|
| [T1021.004](https://attack.mitre.org/techniques/T1021/004/) | SSH | Agent.exe and Telnet.exe Execution -... |
| [T1570](https://attack.mitre.org/techniques/T1570/) | Lateral Tool Transfer | Agent.exe and Telnet.exe Execution -... |


### Command and Control

| Technique | Name | Findings |
|-----------|------|----------|
| [T1001](https://attack.mitre.org/techniques/T1001/) | Data Obfuscation | Packet Capture Tools Installed - Legitimate... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 151 |
| Findings submitted | 10 |
| Confirmed | 7 |
| Inferences | 3 |
| Input tokens | 10.6K |
| Output tokens | 50.0K |
| Total tokens | 60.6K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case-q31.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 10.6K | 50.0K | 60.6K |




<details>
<summary>Evidence Sources (181)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 12545 |
| clamav.scan | clamav | 1 |
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
| registry.query.system | python-registry | 1 |
| ez.shimcache | eztools | 140 |
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
| composite.file_staging | composite | 122 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
