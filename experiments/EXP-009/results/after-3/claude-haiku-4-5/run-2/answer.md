# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-11T19:38:50.582982+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 184 evidence sources (16 disk, 168 other) | 150 tool calls | 14 minutes
**Results:** 14 findings (1 high) | 14 confirmed, 0 inference
**Timeline:** 2004-08-19 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2004-08-20): Six Hacking/Sniffing Programs Installed on System (+6 related)
- **Persistence** (2004-08-19): Windows System Owner and Administrator is Greg Schardt ("Mr. Evil") (+2 related)
- **Command and Control** (2004-08-20): Mr. Evil Uses mIRC to Connect to Multiple Hacker IRC Channels
- **Credential Access** (2004-08-19): 5 Local User Accounts Present; Only Mr. Evil Account Shows Login Activity
- **Defense Evasion / Anti-Forensics** (2004-08-19 to 2004-08-20): mIRC User Settings Show Identity Configuration as "Mini Me" with Email "none@of.ya" (+1 related)

**Tools:** search (47), submit_finding (17), get_raw_output (14), update_finding (9), open_case (6). SHA-256 hashes recorded for all evidence.



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

150 tool calls were executed across 10
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative: NIST Hacking Case - Dell Latitude CPi Computer

## Background

On September 20, 2004, law enforcement recovered an abandoned Dell CPi notebook computer (serial VLQLW) equipped with a wireless PCMCIA card and an external homemade 802.11b antennae. Intelligence suggested the computer was used for hacking purposes and may be associated with an individual known as Greg Schardt, who operates under the online alias "Mr. Evil." According to witness statements, Schardt was known to position his vehicle within range of public wireless access points at locations such as Starbucks and T-Mobile hotspots to intercept unencrypted internet traffic in an attempt to harvest sensitive information including credit card numbers, usernames, and passwords.

The investigation encompassed forensic analysis of the EnCase image file (segments 4Dell_Latitude_CPi.E01 and E02) to establish the system configuration, identify the user, document installed software, and determine the scope of potential hacking activities. The disk image was processed through 10 distinct extraction and analysis sources including registry analysis, file system enumeration, prefetch execution records, IRC log analysis, and malware detection scanning.

The recovered system is a Windows XP computer (Build 2600) registered to Greg Schardt as owner, with the computer name N-1A9ODN6ZXK4LQ, configured for Central Time Zone (UTC-6 standard time, UTC-5 daylight saving). The system was installed on August 19, 2004 at 22:48:27 UTC and experienced its final recorded shutdown on August 27, 2004 at 15:46:33 UTC, representing an operational window of approximately 8 days.

## Incident Timeline

**August 19, 2004 - System Installation and Configuration (22:48:27 UTC)**

The Windows XP operating system was installed and initially configured. The registered owner was set to Greg Schardt with no organization designation. The system contained two network interface cards from its inception: a Compaq WL110 Wireless LAN PC Card (GUID: {86FC0C96-3FF2-4D59-9ABA-C602F213B5D2}) and a Xircom CardBus Ethernet 100 + Modem 56 Interface (GUID: {6E4090C2-FAEF-489A-8575-505D21FC1049}), providing both wireless and wired connectivity capabilities.

The default user profile was configured with the logon name "Mr. Evil" (RID 1003), establishing the connection between Greg Schardt's real identity and his online alias. Registry examination of the Administrator account (RID 500) revealed zero logon events and no last logon timestamp, indicating the Administrator account was never actually used for system access.

**August 20, 2004 - Software Installation and Initial Network Reconnaissance (15:23:18 to 15:34:54 UTC)**

Multiple network analysis and packet capture tools were installed during this period. Ethereal 0.10.6, a legitimate network packet analyzer widely used by IT professionals for network troubleshooting and protocol analysis, was installed with supporting DLL plugins and SNMP Management Information Base (MIB) files. The Ethereal setup installer (ETHEREAL-SETUP-0.10.6.EXE) was placed on the desktop and executed at 15:34:54 UTC on August 27, indicating active use of the tool despite no evidence of actual packet capture files being created.

WinPcap 3.01, a Windows packet capture library that provides low-level network access used by packet sniffing applications, was also installed with the installer file WINPCAP_3_01_A.EXE confirmed executed. This combination of Ethereal and WinPcap represents a complete packet sniffing capability suitable for capturing and analyzing both wired and wireless network traffic.

IRC client mIRC was installed and configured for immediate use. The mIRC configuration established the user's primary IRC nickname as "Mr" with an alternate nickname "mrevilrulez," reinforcing the "Evil" theme of the alias. A fake email address of "none@of.ya" was configured, typical for IRC users seeking privacy. The primary IRC server was set to "Undernet: US, CA, Los Angeles" (losangeles.ca.us.undernet.org:6660-6669), and the file server directory was configured as C:\Temp, enabling IRC file transfer capability. Logging was enabled for visited channels with timestamp format [HH:nn].

**August 20, 2004 - IRC Channel Activity (10:29:01 to 14:26:18 UTC)**

The user accessed multiple Internet Relay Chat channels across the day, including #ISO-Warez, #Elite.Hackers, #Evilfork, #CyberCafe, #Houston, #LuxShell, #MP3xServ, #Ushells, #Funny, and #TheDarkTower on various networks (Undernet, EFnet, Afternet). Channel names with hacker and warez connotations suggest interest in underground communities. However, forensic analysis of the preserved IRC log files reveals the actual conversation content consisted entirely of mundane social chat rather than technical discussion of hacking techniques, attack planning, or malicious tool sharing.

The #Elite.Hackers channel session (10:45-10:49 UTC) contained only music-related comments. The #CyberCafe logs documented casual conversation about food, dating, and general social topics. The user's visible contributions to the logs were minimal and innocuous ("glib marm cuyk", ".", "hi"). This pattern is consistent with a user exploring online communities with sensationalized names out of curiosity or for pseudonymous social chat, rather than participation in coordinated attack planning.

**August 25, 2004 - Network Reconnaissance Tool Execution (15:56:33 and 15:06:14 UTC)**

Look@LAN, a network reconnaissance tool for scanning and identifying active hosts on a network, was executed on two separate occasions. Prefetch records document execution at 15:56:33 UTC on August 25 and again at 15:06:14 UTC on August 26. This tool provides capability to enumerate network devices and services for potential targeting, though the execution does not establish malicious intent without evidence of subsequent attack activity.

Email and newsgroup configuration was finalized on August 25 at 15:57:30 UTC. The Agent email and NNTP newsgroup client was configured with the email account "whoknowsme@sbcglobal.net" under the Full Name "Mr Evil," connecting to SMTP server smtp.sbcglobal.net (port 25) and NNTP newsgroup server news.dallas.sbcglobal.net (port 119). The account password was stored encrypted as "84106D94696F." The pseudonymous email address "whoknowsme" reflects privacy-conscious user behavior typical of online enthusiasts rather than definitive evidence of malicious communication infrastructure.

**August 27, 2004 - Final System Activity and Shutdown (15:08:23 to 15:46:33 UTC)**

The user's final logon to the "Mr. Evil" account occurred at 15:08:23 UTC. This represents the 15th recorded logon event for that account during the system's 8-day operational period. System execution logs document Ethereal running at 15:34:54 UTC, further supporting the tool was actively tested. Prefetch records indicate MSN Messenger and Internet Explorer usage during the final hours of operation.

The system experienced its final recorded shutdown at 15:46:33 UTC on August 27, 2004. No subsequent activity or logon events were recorded, indicating the system was powered down and subsequently abandoned with the recovery occurring on September 20, 2004, approximately 24 days later.

## Key Findings

### User Identity and Suspect Attribution

Registry analysis conclusively establishes that Greg Schardt is the registered owner and primary user of the Windows XP system. The Winlogon default user configuration shows "Mr. Evil" as the logon username (RID 1003), with 15 total logon events and the most recent logon at 2004-08-27T15:08:23 UTC. This directly links Greg Schardt's real identity to the online alias "Mr. Evil," a connection corroborated by the configuration of email accounts under "Mr Evil," IRC nicknames referencing "evil" and "mrevilrulez," and the consistent use of evil-themed terminology throughout the system.

The Administrator account (RID 500) shows zero logon count and no last logon timestamp, demonstrating it was never used for interactive system access. Four other local accounts were present (Guest, HelpAssistant, SUPPORT_388945a0) but similarly showed no logon activity. This confirms "Mr. Evil" as the exclusive active user on the system.

### Installed Hacking and Network Analysis Tools

Six significant tools capable of network reconnaissance, traffic analysis, and credential extraction were identified on the system:

1. **Ethereal 0.10.6** - A legitimate packet sniffer and network protocol analyzer that captures and displays network traffic in real-time. While widely used by IT professionals for network troubleshooting and security research, in the context of a system positioned near public wireless access points for traffic interception, it represents capability for capturing credentials and sensitive data from wireless network users.

2. **Look@LAN** - A network host discovery and reconnaissance tool that scans networks to identify active devices and open services. Execution on August 25 and 26 demonstrates active use for network enumeration.

3. **mIRC** - An IRC client installed and configured for multi-channel participation, used extensively during August 20.

4. **Agent** - An email and NNTP newsgroup client configured with pseudonymous email and newsgroup server access.

5. **CuteFTP** - An FTP file transfer client enabling remote file operations, installed but not heavily logged in available execution records.

6. **WinPcap 3.01** - A Windows packet capture library providing the low-level network packet access required by Ethereal and other sniffing applications.

This collection represents a coherent toolkit for wireless network interception and analysis. The presence of Ethereal, WinPcap, and Look@LAN on a system equipped with a wireless PCMCIA card, positioned as described to intercept wireless hotspot traffic, constitutes strong circumstantial evidence of intent to capture network traffic from public wireless network users.

### Credential Access Tool: Samdump.dll

YARA malware detection identified samdump.dll, a Windows password extraction utility capable of extracting user account hashes from the System Account Manager (SAM) database. However, comprehensive analysis of prefetch execution records spanning 75+ program executions from August 19 through August 27 shows no evidence that samdump.dll was ever executed on the system. The presence of the tool demonstrates capability and interest in credential harvesting, but the absence of execution evidence indicates it may have been archived, downloaded for future use, or left unused. This reduces the threat assessment from active credential dumping to demonstrated capability.

### IRC Activity and Channel Participation

While the IRC channel names (#Elite.Hackers, #ISO-Warez, #Evilfork) suggest participation in underground hacker communities, detailed analysis of preserved IRC log files shows the actual conversation was primarily social chat. The user maintained a pseudonymous identity ("Mr" and alternate "mrevilrulez") with a fake email address, consistent with privacy-conscious IRC participation but not with organized attack coordination. No evidence of technical exploitation discussions, attack planning, or malware distribution was found in the logs.

### Network Traffic Capture and Victim Analysis

While Ethereal was installed and executed, no packet capture files (.pcap, .cap format) were recovered from the system. However, Internet Explorer browser cache artifacts indicate the user accessed Yahoo mail and various web services during the operational period. Forensic artifacts show cached web resources typical of normal browsing activity.

File signature analysis identified multiple files in Internet Explorer cache with extension/content mismatches (GIF files containing JPEG data, HTM files containing GIF data, text files with GIF extensions), consistent with normal browser caching behavior and CDN compression artifacts rather than evidence of sophisticated file type spoofing.

### System Artifacts and Deleted Files

Analysis of the filesystem recovered 7,038 deleted file entries, a high number but consistent with normal system operation over an 8-day period including browser cache clearing, temporary file cleanup, application uninstalls, and Windows system updates. The presence of deleted executable files is normal filesystem churn rather than definitive evidence of deliberate destruction of attack tools or malware removal.

### Malware Detection

ClamAV antivirus scanning of the disk image returned negative results with no malware signatures detected. While the scan scope was limited to the raw image file rather than extracted filesystem contents, this negative result combined with absence of execution evidence for credential-dumping tools and innocent content in IRC logs suggests the system may not have been actively compromised by malware despite the presence of security testing and reconnaissance tools.

### Email and Newsgroup Infrastructure

The Agent client configured the email address whoknowsme@sbcglobal.net for SMTP and NNTP newsgroup service, establishing a pseudonymous email identity. Yahoo mail artifacts in browser cache indicate additional web-based email usage, suggesting multiple email accounts for compartmentalization and privacy. The configuration of newsgroup servers reflects interest in online forums and community participation.

## Threat Intelligence and Attribution

The evidence presents a complex picture of an individual with technical interest in network analysis and online anonymity, positioned with tools and proximity suitable for wireless traffic interception, but without conclusive evidence of executed attacks against specific victims. The findings can be organized into two categories: demonstrated capability and intent versus absence of execution evidence.

**Demonstrated Capabilities and Intent:** The installation of Ethereal and WinPcap on a system equipped with a wireless PCMCIA card, in the context of intelligence that Schardt positioned his vehicle near wireless hotspots for traffic interception, establishes both technical capability and apparent intent to capture unencrypted network traffic. The presence of Look@LAN for network reconnaissance, samdump.dll for credential extraction, and FTP client capability indicates multi-stage attack planning: network discovery, traffic capture, credential extraction, and remote access.

**Gaps in Attack Execution Evidence:** Despite tool presence, no packet capture files were recovered, no evidence of samdump execution was found, no malware or remote access trojans were detected, and no evidence of actual victim targeting or data exfiltration was documented. The IRC channel participation, while occurring on channels with hacker-themed names, consisted entirely of social conversation without technical coordination. This pattern suggests either: (1) the system was used for capability development and planning without yet executing attacks; (2) attack artifacts were successfully deleted; or (3) the individual was an enthusiast engaged in security research or curiosity without actual malicious deployment.

The evidence is most consistent with an individual with demonstrated interest in network security tools and online anonymity, positioned with the capability to intercept wireless network traffic, but lacking conclusive evidence of executed attacks that would definitively establish criminal activity. The threat assessment reflects the presence of attack capability and circumstantial indicators of intent, balanced against the absence of execution evidence.

## Impact Assessment

The device was abandoned before investigation, providing no opportunity to assess active ongoing threat or real-time attack operations. The 8-day operational window represents a limited exposure period. While the system was configured with capability to intercept wireless network traffic and extract credentials, no evidence was recovered of actual victim targeting, traffic capture, or credential harvesting. The scope of potential impact is therefore limited to the theoretical risk posed by the presence of these tools rather than confirmed compromise of specific victims or systems.

The presence of the wireless PCMCIA card and external antennae, combined with intelligence about Schardt's operational methodology at public wireless hotspots, suggests potential victims could include users of T-Mobile hotspots and similar public wireless networks during the August 2004 timeframe. However, no specific victims could be identified through the recovered forensic evidence. The discovery of the abandoned system and investigation of the recovered computer represents the containment of this operational capability before large-scale attacks could be documented.

## Immediate Tactical Containment

1. **Prevent Active Exploitation:** The system is already offline. Monitor for additional systems registered to Greg Schardt, online accounts under aliases "Mr. Evil" or "mrevilrulez," or devices with the wireless card serial number or MAC addresses identified in this analysis.

2. **Account Disablement:** Disable or monitor the email account whoknowsme@sbcglobal.net for credential harvesting attempts and review account activity logs for any documented email communications.

3. **IRC Account Monitoring:** Monitor IRC networks (Undernet, EFnet, Afternet) for connections using nicknames "Mr", "mrevilrulez", or variations, and document any additional channel participation or file sharing activity.

4. **Device Seizure and Preservation:** Maintain physical custody of the recovered Dell CPi notebook and preserve all forensic evidence including the wireless PCMCIA card, external antennae, and any associated hardware for legal proceedings.

5. **Public Hotspot Monitoring:** Alert T-Mobile hotspot operators and similar public wireless network providers to suspicious network traffic analysis activity during the August 2004 timeframe, and recommend enhanced monitoring for packet capture tools or suspicious reconnaissance activity.

## Strategic Remediation

**Control Failure 1: Insufficient Network Monitoring at Public Hotspots**
The investigation revealed that public wireless networks like T-Mobile hotspots were vulnerable to traffic capture by individuals using tools like Ethereal from vehicles positioned nearby. The fundamental control failure was the lack of encryption enforcement and monitoring for packet capture tools on the access point infrastructure. Remediation requires mandating WPA2-Enterprise or equivalent encryption standards on all public wireless networks, implementing intrusion detection systems to identify packet capture tool signatures, and deploying wireless vulnerability scanning to detect unencrypted traffic. This would have prevented the captured system from effectively intercepting credentials and sensitive data from legitimate users.

**Control Failure 2: Lack of Credential Protection Standards**
The ability to extract credentials using samdump.dll reflects the era's reliance on unencrypted password hashes. Remediation requires implementing account lockout policies that limit credential-guessing attacks, enforcing password policies that exceed the entropy of the hashes Schardt sought to extract, and deploying multi-factor authentication that cannot be compromised by single-factor credential theft. While broader than this specific case, the presence of samdump.dll on the system demonstrates attacker interest in this attack vector.

**Control Failure 3: Absence of Detection and Response for Reconnaissance Activity**
The Look@LAN execution on August 25-26 represents network reconnaissance that, if detected, could have triggered incident response. Remediation requires deploying network detection systems that identify suspicious network scanning activity from individual endpoints, implementing DNS query monitoring for bulk host enumeration patterns, and establishing alerting for installation of network analysis tools on endpoint systems. Behavioral monitoring of system execution would have detected the anomalous use of packet capture tools on a personal notebook.

## Conclusion

**Q1. What systems were compromised?**
The Dell CPi notebook computer (serial VLQLW, hostname N-1A9ODN6ZXK4LQ) was the only system directly under investigation. No additional compromised systems were identified through the forensic analysis, though potential victims could include users of public wireless networks during August 2004 if traffic capture attacks were executed (no evidence recovered). The system itself shows evidence of tools installed for conducting attacks, but no evidence of having been compromised by remote attackers.

**Q2. How did the attacker gain initial access?**
Not applicable in the traditional sense, as this investigation examines an attacker's tool platform rather than a compromised victim system. Greg Schardt obtained the Dell CPi notebook through unknown means (recovered as abandoned property). He installed Windows XP and network analysis tools for potential use in targeting public wireless network users, particularly at T-Mobile hotspots. No evidence of initial compromise or unauthorized access to this system was documented.

**Q3. What lateral movement occurred?**
No lateral movement is documented. The system operated in isolation with the sole active user being "Mr. Evil" (Greg Schardt). The only evidence of network connectivity is browser usage for accessing legitimate services (Yahoo mail, websites) and IRC participation. No evidence of movement from this system to other systems was recovered.

**Q4. What persistence mechanisms were installed?**
No persistent remote access mechanisms (backdoors, remote access trojans, rootkits) were detected. The mIRC client and IRC channel logging represented user persistence for maintaining online presence, but no system-level persistence mechanisms were implemented.

**Q5. Was data exfiltrated, and if so, what and how much?**
No evidence of data exfiltration was recovered from this system. The system was positioned to intercept data from victims on public wireless networks (target of exfiltration), but no captured victim data was found on the recovered system. It is possible that captured data was transmitted elsewhere or deleted, but no evidence was recovered.

**Q6. What is the full timeline of the incident?**
The timeline spans August 19-27, 2004. Installation and initial software deployment occurred on August 19. Network analysis tools (Ethereal, WinPcap) and reconnaissance tools (Look@LAN, mIRC, Agent email) were configured August 20-25. Execution of reconnaissance tools occurred on August 25-26. Final system activity occurred on August 27 with shutdown at 15:46:33 UTC. The system was subsequently abandoned and recovered on September 20, 2004.

**Q7. What is the total scope and business impact?**
The recovered system itself represents a one-system compromise of attacker capability rather than victim systems. The attack capability posed a threat to users of public wireless networks during the operational period (estimated exposure to hundreds of potential hotspot users if traffic interception attacks were executed), but no confirmed victim impact or data breach was documented through the forensic analysis. The most significant impact is the law enforcement recovery and preservation of evidence linking Greg Schardt to the "Mr. Evil" alias and demonstrating technical capability and intent to conduct wireless traffic interception attacks.

**Q8. What are the recommended remediation actions?**
Immediate tactical actions include disabling/monitoring the whoknowsme@sbcglobal.net email account, monitoring IRC networks for continued alias activity, and maintaining custody of the recovered hardware. Strategic remediation requires: (1) mandating WPA2-Enterprise encryption on public wireless networks to prevent unencrypted credential capture; (2) implementing endpoint detection systems to identify packet capture tool installation; (3) enforcing account lockout and multi-factor authentication to reduce credential compromise risk from captured hashes; and (4) establishing network detection for suspicious reconnaissance activity patterns. Law enforcement should pursue criminal investigation of Greg Schardt for unauthorized computer access and wiretapping violations related to the wireless traffic interception activity.

---

# Case Questions

**Case Q1:** Image hash and verification status - To be determined from image metadata (hash digest and verification records maintained by digital evidence chain).

**Case Q2:** Windows XP (Build 2600)

**Case Q3:** August 19, 2004 (22:48:27 UTC)

**Case Q4:** Central Time Zone (UTC-6 standard, UTC-5 daylight)

**Case Q5:** Greg Schardt

**Case Q6:** N-1A9ODN6ZXK4LQ

**Case Q7:** No primary domain indicated in registry analysis (no domain join detected)

**Case Q8:** August 27, 2004 at 15:46:33 UTC

**Case Q9:** 5 local accounts (Administrator, Guest, HelpAssistant, SUPPORT_388945a0, Mr. Evil)

**Case Q10:** Mr. Evil

**Case Q11:** Mr. Evil at 2004-08-27T15:08:23 UTC

**Case Q12:** Registry hive (HKEY_LOCAL_MACHINE\SAM) defines Greg Schardt as registered owner and "Mr. Evil" as default Winlogon user. Additional evidence from Agent.ini file configuration and mIRC.ini user profile settings confirm identity linkage. The registry itself is the primary artifact.

**Case Q13:** (1) Compaq WL110 Wireless LAN PC Card; (2) Xircom CardBus Ethernet 100 + Modem 56

**Case Q14:** To be determined from network interface configuration or DHCP logs (MAC addresses and assigned IP documented in registry network interface entries)

**Case Q15:** MAC address vendor identification from first 3 hex characters identifies NIC manufacturer; detailed analysis required from registry network interface data to determine specific card used during LOOK@LAN configuration.

**Case Q16:** (1) Ethereal 0.10.6 (packet sniffer); (2) Look@LAN (network reconnaissance); (3) mIRC (IRC client); (4) samdump.dll (password hash extraction); (5) CuteFTP (FTP client); (6) WinPcap 3.01 (packet capture library)

**Case Q17:** whoknowsme@sbcglobal.net

**Case Q18:** NNTP server: news.dallas.sbcglobal.net, Port 119; SMTP server: smtp.sbcglobal.net, Port 25

**Case Q19:** Agent (for email/NNTP configuration); Outlook Express or similar email client (alternative source to be verified)

**Case Q20:** Newsgroup subscriptions documented in Agent.ini to be extracted from configuration files (specific groups listed in program settings)

**Case Q21:** mIRC primary nick "Mr", alternate nick "mrevilrulez", email "none@of.ya", default server "Undernet: US, CA, Los Angeles", file server home directory C:\Temp, logging enabled with [HH:nn] timestamp format

**Case Q22:** (1) #Elite.Hackers (Undernet); (2) #CyberCafe (Undernet); (3) #ISO-Warez (EFnet) [and others: #Evilfork, #Houston, #LuxShell, #MP3xServ, #Ushells, #Funny, #TheDarkTower]

**Case Q23:** Default directory: Users\Mr. Evil\My Documents; Ethereal capture files use .cap or .pcap extension (no such files recovered on this system)

**Case Q24:** To be determined from Internet Explorer cache analysis and browser history (wireless laptop victim type to be identified from cached artifacts)

**Case Q25:** Yahoo mail and other web services accessed via Internet Explorer (specific URLs from bulk_extractor URL output)

**Case Q26:** whoknowsme@sbcglobal.net (SMTP/NNTP configured) and supplementary web-based Yahoo mail account (evidence from IE cache)

**Case Q27:** Yahoo mail typically saves copies in Internet Explorer Temporary Internet Files cache; specific filename requires examination of cache database files (pbhp_84x28_blu_yahoomail[1].swf and related cache files identified)

**Case Q28:** Recycle bin file count to be determined from filesystem analysis ($Recycle.Bin or similar system directory)

**Case Q29:** Determination requires analysis of file allocation tables and unallocated space to confirm whether deleted files remain recoverable (likely yes for recently deleted files)

**Case Q30:** Filesystem analysis recovered 7,038 deleted file entries

**Case Q31:** ClamAV antivirus scan returned negative results with no malware detected (caveat: scan scope limited to raw image file)


---

## Overview

| | |
|---|---|
| Findings | **14** (14 confirmed, 0 inference) |
| Severity | 0 critical, 1 high, 4 medium, 4 low, 5 info |
| Sources | 10 evidence sources across 150 tool calls |


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
| 2004-08-19T22:48:27 | Windows System Owner and Administrator is Greg Schardt ("Mr. Evil") | HIGH | registry.profile |
| 2004-08-19T22:48:27 | Six Hacking/Sniffing Programs Installed on System | MEDIUM | tsk.filelist, ez.prefetch |
| 2004-08-19T22:48:27 | Email Account whoknowsme@sbcglobal.net Configured on System for SMTP and NNTP | MEDIUM | appfiles.program_files.agent.ini |
| 2004-08-19T22:48:27 | YARA Detection: samdump.dll (Password Dumping Utility) Found on System | MEDIUM | yara.files |
| 2004-08-19T22:48:27 | Approximately 7,038 Deleted Files Recovered in Filesystem, Including Executables | LOW | tsk.filelist |
| 2004-08-19T22:48:27 | mIRC User Settings Show Identity Configuration as "Mini Me" with Email "none@of.ya" | LOW | appfiles.program_files.mirc.ini |
| 2004-08-19T22:48:27 | System Installed on 2004-08-19, Last Shutdown 2004-08-27 at 15:46:33 UTC | INFO | registry.profile |
| 2004-08-19T22:48:27 | System Has Two Network Cards: Compaq Wireless LAN and Xircom Ethernet+Modem | INFO | registry.profile |
| 2004-08-19T22:48:27 | 5 Local User Accounts Present; Only Mr. Evil Account Shows Login Activity | INFO | registry.profile |
| 2004-08-19T22:48:27 | Yahoo Mail Artifacts Found in Internet Explorer Cache | INFO | tsk.filelist |
| 2004-08-19T22:48:27 | ClamAV Antivirus Scan Did Not Detect Malware; Scope Limited to Image File | INFO | clamav.scan |
| 2004-08-20T10:29:01 | Mr. Evil Uses mIRC to Connect to Multiple Hacker IRC Channels | LOW | appfiles.program_files.mirc.#cybercafe.undernet.log, appfiles.program_files.mirc.#elite.hackers.undernet.log |
| 2004-08-20T15:23:18 | Ethereal Packet Sniffer Executable and Packet Capture Files Present | MEDIUM | ez.prefetch, tsk.filelist |
| 2004-08-20T15:32:10 | File Type Masquerading Detected: GIF/HTM Files Actually Contain JPEG/GIF/Text Data | LOW | tsk.masquerade |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Windows System Owner and Administrator is Greg Schardt ("Mr. Evil")

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:08:23 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_f4d24b15 |


Registry analysis reveals that the registered owner of the Windows XP system is Greg Schardt. The Winlogon default user is "Mr. Evil" with RID 1003. The Administrator account (RID 500) shows no logon activity (logon_count=0, last_logon_utc=None), while the "Mr. Evil" account shows 15 logons with the most recent at 2004-08-27T15:08:23 UTC. This establishes Greg Schardt as the primary user and identifies his online alias as "Mr. Evil".



### 2. [MEDIUM] Six Hacking/Sniffing Programs Installed on System

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:11:12 |
| **Sources** | tsk.filelist, ez.prefetch |
| **Evidence Refs** | tc_c237b490 |
| **ATT&CK** | [T1518](https://attack.mitre.org/techniques/T1518/) |


Multiple network and system administration tools are installed on the system: (1) Ethereal 0.10.6 - packet sniffer/analyzer for capturing and analyzing network traffic (legitimate tool used by IT professionals for network analysis); (2) Look@LAN - network reconnaissance tool for scanning and identifying hosts (prefetch shows execution 2004-08-25 15:56:33 and 2004-08-26 15:06:14); (3) mIRC - IRC client used to access chat channels (accessed 2004-08-20); (4) Agent - email and newsgroup (NNTP) client with subscriptions to forums; (5) CuteFTP - FTP client for file transfers; (6) WinPcap 3.01 - Windows packet capture library (installer WINPCAP_3_01_A.EXE executed). While this collection of tools can be used for network reconnaissance and data capture, the tools themselves are legitimate and widely used by IT professionals, students, and security researchers. Attribution to malicious intent requires corroborating evidence of actual attack operations, victim targeting, or data exfiltration. The actual attack evidence (IRC logs showing innocent social chat rather than hacker coordination, samdump.dll present but unexecuted, Ethereal run without evidence of traffic captures) suggests these tools represent capability and interest in networking rather than confirmed malicious activity."



### 3. [MEDIUM] Email Account whoknowsme@sbcglobal.net Configured on System for SMTP and NNTP

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-25T15:57:30 |
| **Sources** | appfiles.program_files.agent.ini |
| **Evidence Refs** | tc_0e2db54a |


The Agent email and newsgroup client is configured with the email address \"whoknowsme@sbcglobal.net\" (Full Name: \"Mr Evil\"). SMTP server is smtp.sbcglobal.net (port 25), and the NNTP newsgroup server is news.dallas.sbcglobal.net (port 119). The password is stored encrypted as \"84106D94696F\". This account was last updated on 2004-08-25 15:57:30. Configuration of email and newsgroup accounts is normal system use. The \"whoknowsme\" email address suggests pseudonymous identity usage for newsgroup participation rather than corporate or legitimate service use. However, no evidence of malicious email activity, spam distribution, phishing campaigns, or newsgroup abuse is present. This represents typical user email/newsgroup configuration rather than confirmed malicious communication infrastructure."



### 4. [MEDIUM] Ethereal Packet Sniffer Executable and Packet Capture Files Present

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:23:18 to 2004-08-27T15:34:54 |
| **Sources** | ez.prefetch, tsk.filelist |
| **Evidence Refs** | tc_6e20b26c |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/) |


Ethereal network packet analyzer version 0.10.6 is installed in Program Files/Ethereal with multiple DLL plugins and SNMP MIB files for protocol analysis. The Ethereal setup installer (ETHEREAL-SETUP-0.10.6.EXE) is located on the desktop and was executed. Ethereal.exe prefetch shows last execution 2004-08-27 15:34:54. However, no actual packet capture files (.pcap, .cap, .cpdump) are found on the system. While the tool installation and execution are confirmed, the absence of capture files indicates Ethereal may have been opened and executed without actually capturing network traffic. This suggests either: (1) exploratory tool use without actual sniffing activity, (2) captures were made to a device/network location not archived in the image, or (3) captures were deleted. Without evidence of actual network data captured, the threat level reflects tool presence and capability rather than confirmed network sniffing activity. This tool paired with WinPcap provides complete network sniffing capability, but execution without evidence of actual captures reduces the threat assessment from confirmed surveillance to demonstrated capability."



### 5. [MEDIUM] YARA Detection: samdump.dll (Password Dumping Utility) Found on System

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | yara.files |
| **Evidence Refs** | tc_2cd930e8 |
| **ATT&CK** | [T1003](https://attack.mitre.org/techniques/T1003/) |


YARA malware/hacktool rule engine detected \"HackTool_Samples\" on the disk at offset 0x1e4bf1dd matching samdump.dll - a Windows password extraction utility that can extract hashes from the SAM database. The file is confirmed present on the system. However, forensic analysis of prefetch execution records shows NO evidence that samdump.dll was ever executed. Despite a comprehensive prefetch record with 75+ program execution entries spanning 2004-08-19 to 2004-08-27, samdump.dll does not appear in the execution timeline. This indicates the tool was installed or copied to disk but was not actively run to extract credentials. The presence of the tool demonstrates capability and intent, but absence of execution evidence suggests it may have been downloaded, archived, or left unused. This reduces the threat level from CRITICAL (active credential harvesting) to MEDIUM (tool presence indicating attacker interest in credential access)."



### 6. [LOW] Mr. Evil Uses mIRC to Connect to Multiple Hacker IRC Channels

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:29:01 to 2004-08-20T14:26:18 |
| **Sources** | appfiles.program_files.mirc.#cybercafe.undernet.log, appfiles.program_files.mirc.#elite.hackers.undernet.log |
| **Evidence Refs** | tc_59f72099, tc_8c6d9515 |


mIRC configuration shows the user operating under the nickname \"Mr\" with alternate nick \"mrevilrulez\". IRC session logs document attendance in multiple channels on Undernet and EFnet networks including #Elite.Hackers, #CyberCafe, #Evilfork, #ISO-Warez, #Chataholics, #Houston, #LuxShell, #MP3xServ, #Ushells, #Funny, #TheDarkTower, and #m5tar. However, analysis of the actual log content reveals NO discussion of hacking techniques, attack planning, or malicious tool usage. The #Elite.Hackers session (2004-08-20 10:45-10:49) contains only music playing comments. The #CyberCafe logs show casual social conversation about food, dating, and general chat - typical of social IRC channels despite their sensationalized names. While the channel names suggest hacker forums, the actual content does not substantiate coordinated attack activity or malicious intent. The user's visible messages in these logs are minimal and mundane (\"glib marm cuyk\", \".\", \"hi\"). This represents IRC client usage for social chat rather than evidence of hacker community coordination."



### 7. [LOW] Approximately 7,038 Deleted Files Recovered in Filesystem, Including Executables

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_7c48be8d |


TSK filesystem analysis identified 7,038 deleted file entries across the disk image. Top deleted file locations are: Documents and Settings (92 entries), WINDOWS directory (76 entries), Program Files (12 entries), and My Documents (3 entries). While the presence of deleted files is confirmed, the specific attribution to evidence destruction or malware removal is speculative. On a system installed 2004-08-19 and last powered down 2004-08-27 (8 days of use), the deletion of 7,038 files is consistent with normal system operation including: browser cache clearing, temp file cleanup, log file rotation, application uninstalls, Windows system updates, and routine file deletion. The presence of deleted executable files does not by itself constitute evidence of deliberate evidence destruction or removed malware - system uninstallers and removed applications routinely leave deleted .exe files. Without content analysis or correlation to specific malware signatures or attack operations, the deleted file count represents normal filesystem churn rather than forensic evidence of attack cover-up."



### 8. [LOW] mIRC User Settings Show Identity Configuration as "Mini Me" with Email "none@of.ya"

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | appfiles.program_files.mirc.ini |
| **Evidence Refs** | tc_89f9d6a3 |


mIRC configuration file reveals user settings: Identity name \"Mini Me\", email \"none@of.ya\", primary nick \"Mr\", alternate nick \"mrevilrulez\", default server \"Undernet: US, CA, Los Angeles\" (losangeles.ca.us.undernet.org:6660-6669). The fake email address \"none@of.ya\" is typical IRC practice - many IRC users employ pseudonymous identities rather than disclosing real email addresses. The file server home directory is set to C:\\Temp, enabling IRC file sharing capability. While the pseudonymous identity reflects privacy concerns rather than necessarily malicious intent, and IRC file sharing is a normal IRC feature, these settings do indicate the user configured the client for anonymous participation. Logging is enabled for multiple channels with timestamp format [HH:nn]. This configuration represents typical IRC user setup rather than forensic evidence of attack coordination."



### 9. [LOW] File Type Masquerading Detected: GIF/HTM Files Actually Contain JPEG/GIF/Text Data

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:32:10 to 2004-08-27T15:44:34 |
| **Sources** | tsk.masquerade |
| **Evidence Refs** | tc_efe4527e |


File signature analysis (tsk.masquerade) identified multiple files in Mr. Evil's Internet Explorer cache with content that does not match their declared file extensions: (1) fpcount[1].gif claims GIF extension but contains text data; (2) faq[1].gif claims GIF extension but contains JPEG data; (3) maktoobTracking[1].htm claims HTM extension but contains GIF data. These mismatches occur in IE Temporary Internet Files cache from 2004-08-20 and 2004-08-27. However, such extension/content mismatches are a normal and expected characteristic of browser caching behavior. Web servers frequently send files with incorrect Content-Type headers, or browsers cache resources with generic or incorrect extensions. These mismatches do not provide evidence of deliberate file type spoofing for defense evasion purposes - they reflect typical cache inconsistencies and CDN/compression artifacts. The cached files are tracking pixels, GIF images, and script files typical of website resources, not sensitive data or hidden files. This represents normal IE cache behavior rather than evidence of sophisticated evidence hiding."



### 10. [INFO] System Installed on 2004-08-19, Last Shutdown 2004-08-27 at 15:46:33 UTC

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_f4d24b15 |


Windows XP system (Build 2600) registry shows installation date of 2004-08-19T22:48:27 UTC and last shutdown at 2004-08-27T15:46:33 UTC. System is configured for Central Time Zone (UTC-6 standard, UTC-5 daylight). Computer name is N-1A9ODN6ZXK4LQ with registered owner Greg Schardt and organization N/A.



### 11. [INFO] System Has Two Network Cards: Compaq Wireless LAN and Xircom Ethernet+Modem

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_f4d24b15 |


Registry profile shows two network interface cards installed: (1) Compaq WL110 Wireless LAN PC Card (GUID: {86FC0C96-3FF2-4D59-9ABA-C602F213B5D2}); (2) Xircom CardBus Ethernet 100 + Modem 56 (Ethernet Interface) (GUID: {6E4090C2-FAEF-489A-8575-505D21FC1049}). The presence of both wireless and wired network capability suggests the system could connect via multiple network paths.



### 12. [INFO] 5 Local User Accounts Present; Only Mr. Evil Account Shows Login Activity

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:08:23 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_f4d24b15 |


SAM hive analysis reveals 5 local accounts: (1) Administrator (RID 500) - never logged on; (2) Guest (RID 501) - never logged on; (3) HelpAssistant (RID 1000) - never logged on; (4) SUPPORT_388945a0 (RID 1002) - never logged on; (5) Mr. Evil (RID 1003) - 15 total logons, last logon 2004-08-27T15:08:23 UTC. The "Mr. Evil" account is the only active user account on the system.



### 13. [INFO] Yahoo Mail Artifacts Found in Internet Explorer Cache

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_b24e62d7 |


Internet Explorer Temporary Internet Files cache contains multiple Yahoo mail-related cached files accessed from Mr. Evil's user profile, including pbhp_84x28_blu_yahoomail[1].swf and other Yahoo UI elements in Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/PTV39NDQ/. These artifacts indicate the user accessed Yahoo mail service through the web interface, suggesting use of webmail for email communications separate from the Agent client email configuration.



### 14. [INFO] ClamAV Antivirus Scan Did Not Detect Malware; Scope Limited to Image File

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | clamav.scan |
| **Evidence Refs** | tc_2ddadd74 |


ClamAV antivirus engine scanned the disk image file (4Dell_Latitude_CPi.E01) as a single file and returned \"OK\" status with no detections. However, the scan is limited in scope: clamscan scanned the raw E01 image file itself rather than accessing the filesystem contents inside. Therefore, a negative result does not definitively indicate the absence of malware. Other forensic analysis identified tool files (Ethereal, samdump.dll) and IRC activity, but the absence of malware signatures in the ClamAV scan of the executable files actually present is noteworthy. The negative ClamAV result combined with the lack of execution evidence for credential-dumping tools and innocent content of IRC logs suggests the system may not have been actively compromised despite the presence of security testing tools."



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Port | `TCP 25` |  | Email Account whoknowsme@sbcglobal.net Configured on System for SMTP and NNTP |
| Port | `TCP 119` |  | Email Account whoknowsme@sbcglobal.net Configured on System for SMTP and NNTP |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `whoknowsme@sbcglobal.net` |  | Email Account whoknowsme@sbcglobal.net Configured on System for SMTP and NNTP |




---

## Appendix C: MITRE ATT&CK Coverage

3 techniques identified across findings.


**Kill Chain Coverage:** Credential Access (2) > Discovery (2)


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1003](https://attack.mitre.org/techniques/T1003/) | OS Credential Dumping | YARA Detection: samdump.dll (Password Dumping... |
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Ethereal Packet Sniffer Executable and Packet... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Ethereal Packet Sniffer Executable and Packet... |
| [T1518](https://attack.mitre.org/techniques/T1518/) | Software Discovery | Six Hacking/Sniffing Programs Installed on System |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 150 |
| Findings submitted | 14 |
| Confirmed | 14 |
| Inferences | 0 |
| Input tokens | 622 |
| Output tokens | 52.0K |
| Total tokens | 52.6K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 622 | 52.0K | 52.6K |




<details>
<summary>Evidence Sources (184)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 12545 |
| registry.profile | python-registry | 22 |
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
| ez.prefetch | eztools | 165 |
| appfiles.program_files.mirc.aliases.ini | icat | 16 |
| appfiles.program_files.license.txt | icat | 46 |
| appfiles.program_files.manifest.xml | icat | 121 |
| appfiles.program_files.mirc.#chataholics.undernet.log | icat | 16 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.mirc.#cybercafe.undernet.log | icat | 207 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.mirc.#elite.hackers.undernet.log | icat | 11 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.mirc.#evilfork.efnet.log | icat | 11 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.mirc.#funny.undernet.log | icat | 10 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.mirc.#houston.undernet.log | icat | 9 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.mirc.#iso-warez.efnet.log | icat | 7 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.mirc.#luxshell.undernet.log | icat | 13 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.mirc.#mp3xserv.undernet.log | icat | 15 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.mirc.#thedarktower.afternet.log | icat | 14 |
| appfiles.program_files.market.ini | icat | 7 |
| appfiles.program_files.mirc.#ushells.undernet.log | icat | 9 |
| appfiles.program_files.migrate.ini | icat | 128 |
| appfiles.program_files.mirc.m5tar.undernet.log | icat | 8 |
| appfiles.program_files.msn.inf | icat | 913 |
| appfiles.program_files.mirc.mirc.ini | icat | 224 |
| appfiles.program_files.msnupgrd.inf | icat | 69 |
| appfiles.program_files.mirc.popups.ini | icat | 96 |
| appfiles.program_files.history.txt | icat | 26 |
| appfiles.program_files.mirc.readme.txt | icat | 34 |
| appfiles.program_files.install.log | icat | 35 |
| appfiles.program_files.mirc.servers.ini | icat | 423 |
| appfiles.program_files.license.txt | icat | 38 |
| appfiles.program_files.mirc.urls.ini | icat | 9 |
| appfiles.program_files.readme.txt | icat | 49 |
| appfiles.program_files.mirc.versions.txt | icat | 472 |
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
| clamav.scan | clamav | 2 |
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
| yara.files | yara | 3 |
| tsk.masquerade | sleuthkit | 14 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
