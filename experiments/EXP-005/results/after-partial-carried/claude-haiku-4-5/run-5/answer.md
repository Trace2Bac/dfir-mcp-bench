# Mulder Investigation Report

**Case:** nist-hacking-case-q31
**Generated:** 2026-11-14T14:28:06.878296+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 186 evidence sources (18 disk, 168 other) | 140 tool calls | 13 minutes
**Results:** 7 findings | 2 confirmed, 5 inference
**Timeline:** 2004-08-20 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-20 to 2004-08-27): Packet Capture and Network Sniffing Tools Installed and Executed (+1 related)
- **Persistence** (2004-08-20): Comprehensive Hacking Tool Collection and Documentation Stored on System
- **Lateral Movement** (2004-08-26): Remote Access Tool Execution - Telnet and WHOIS Utilities
- **Command and Control** (2004-08-20): System Tied to Suspect 'Mr. Evil' - Evidence of Hacking Community Participation
- **Defense Evasion / Anti-Forensics** (2004-08-20): File Masquerading - Content Type Signature Mismatches Detected

**Tools:** search (41), get_raw_output (11), update_finding (9), get_investigation_summary (8), open_case (7). SHA-256 hashes recorded for all evidence.



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

140 tool calls were executed across 12
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative: NIST Hacking Case - Abandoned Dell CPi Laptop

## Background

On September 20, 2004, law enforcement recovered an abandoned Dell CPi notebook computer (serial # VLQLW) along with a wireless PCMCIA card and a homemade 802.11b antenna. The discovery raised suspicion that the system had been used for unauthorized hacking activities and potentially could be connected to an individual known by the online nickname "Mr. Evil" who was suspected of intercepting wireless internet traffic to harvest credit card numbers, usernames, and passwords from victims using public wireless access points such as Starbucks and T-Mobile Hotspots.

This investigation examined 12 indexed sources extracted from the Dell laptop's hard disk image (/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01 and .E02) to determine whether the system contained evidence of hacking tools, their use, and any data that might have been generated during malicious activity. The forensic analysis examined file system artifacts, registry entries, prefetch execution records, IRC logs, URL history, and installed applications. A total of 7 findings were developed, including 2 confirmed observations and 5 inferred assessments.

## Incident Timeline

The recovered Dell CPi system's timeline of activity spans from early August 2004 through late August 2004, with the most recent evidence dating to August 27, 2004, shortly before the laptop was abandoned. The forensic investigation established the following chronological sequence:

**August 19, 2004**: System administration and software configuration occurred. Registry entries for the default user profile were modified (timestamps 17:01:55 to 23:00:30). System registry timestamps show configuration activity during this initialization period.

**August 20, 2004**: The user account "Mr. Evil" conducted initial tool reconnaissance and installation. Multiple hacking tools were installed on this date. Cain & Abel v2.5 was installed at approximately 10:05 from the D:\Drivers directory. IRC client mIRC connected to multiple hacking-themed IRC channels beginning at 10:29:01, with the nickname "mrevilrulez" joining the #iso-warez channel on EFnet. Over the course of the day, the user connected to #evilfork (EFnet) at 10:30:18, #Elite.Hackers (UnderNet) at 10:45:34, #ushells (UnderNet) at 10:44:49, #Houston (UnderNet) at 10:48:59, and #CyberCafe (UnderNet) at 10:54:21. The #CyberCafe session remained active until 14:02:55, extending for approximately 3 hours and 8 minutes.

**August 26, 2004**: Remote access and reconnaissance tools were executed. WHOIS.EXE executed twice at 15:13:57 and TELNET.EXE executed at 15:05:15 UTC, indicating attempts to gather domain ownership information and establish remote connections.

**August 27, 2004**: Peak tool execution occurred on this date. NetStumbler.exe (wireless network discovery tool) was executed at 15:12:35. Look@LAN network scanner executed at 15:06:14. Cain & Abel executed at 15:33:03, indicating active credential and network analysis. Ethereal packet capture tool executed at 15:34:54 with WinPcap driver support activated at 15:06:18. A cached file named "wardriving[1]" was accessed, suggesting research into wireless network reconnaissance techniques. At 15:46:27, the timeline shows the YARA scan evidence timestamp, detecting hacking tool signatures.

**August 20-27, 2004**: Throughout this period, the user visited multiple security-related and hacking-culture websites, including www.rootkit.com, www.insecure.org/nmap, www.2600.com, www.porcupine.org/satan, and www.foundstone.com. The user downloaded and installed Nmap source code and documentation, stored in organized directories. A reference to wardriving documentation was cached in temporary Internet files.

## Key Findings

### System Identification and User Attribution

The recovered laptop system definitively belonged to a user account named "Mr. Evil" with extensive evidence linking the system to the suspected online persona. The system contained a full user profile for "Mr. Evil" including Start Menu programs, desktop customizations, and user-specific application data. Email addresses associated with this account included mrevilrulez@yahoo.com, mr.evil@www.drudgereport.com, mr.evil@www.netstumbler.com, and mr.evil@www.maktoob.com. The IRC client mIRC contained connection logs showing login with the nickname "mrevilrulez" to multiple hacking-themed IRC channels during August 20, 2004.

The user's IRC activity included participation in channels with names indicating hacking communities: #Elite.Hackers on UnderNet, #evilfork on EFnet, #ushells on UnderNet, and #CyberCafe on UnderNet. However, detailed analysis of the available IRC logs reveals that the #Elite.Hackers channel contained primarily music and audio-related discussion, and the extended #CyberCafe session showed minimal contribution from the user "mrevilrulez" with primarily casual social conversation (about food and dating). No evidence of coordination of actual attacks, planning of unauthorized access, or technical discussion of hacking methodologies was found within the accessible IRC logs.

### Installed Hacking Tools and Demonstrated Execution

The system contained an extensive collection of network analysis and exploitation tools installed across the file system. These tools span multiple categories of the attack lifecycle:

**Packet Capture and Network Analysis Tools**: Ethereal network protocol analyzer was installed in C:\Program Files\Ethereal\ with last modification date of August 13, 2004. Prefetch execution records confirm this tool was executed on August 27, 2004 at 15:34:54. The WinPcap packet capture driver also shows execution evidence dated August 20, 2004 at 15:06:18. Cain & Abel v2.5, a credential extraction and network analyzer tool, was installed on August 20, 2004 at 10:05 and executed on August 27, 2004 at 15:33:03.

**Wireless Network Reconnaissance**: NetStumbler wireless network discovery tool is present at C:\Program Files\Network Stumbler\netstumbler.exe with execution evidence on August 27, 2004 at 15:12:35. Look@LAN network scanner executed on August 26, 2004 at 15:06:14.

**Remote Access Utilities**: TELNET.EXE and WHOIS.EXE were executed on August 26, 2004 at 15:05:15 and 15:13:57 respectively. These standard Windows utilities are commonly used for remote system access and domain reconnaissance.

**Critical Assessment Note**: Despite the presence of these packet capture tools and execution evidence, NO packet capture files (.pcap, .cap files) were found anywhere on the system. Typically, systems actively engaged in network sniffing or traffic analysis would contain captured traffic files. The absence of captured data, combined with single-instance execution records for most tools and the limited time frame of tool use, suggests these tools may have been present for learning, research, or educational purposes rather than evidence of active, sustained packet capture operations.

### Comprehensive Hacking Tool Repository

The system contained an organized, categorized collection of hacking tools and documentation stored in the user's My Documents directory, structured by attack phase methodology:

- **FOOTPRINTING/NT/Nmapnt/**: Complete Nmap source code and comprehensive documentation including nmap.usage.txt, nmapnt manual pages, nmap-rpc, and nmap-services files. Nmap is used for port scanning and network topology mapping.

- **ENUMERATION/NT/ogre/**: Directory structure indicating network enumeration tools organized for Windows system reconnaissance.

- **EXPLOITATION/Unix/dsniff 2.3/**: Dsniff network sniffing suite documentation referencing "switched networks lose security advantage due to packet tool," indicating study of network attack methodologies.

- **URL History References**: The user visited security tool repositories including www.insecure.org/nmap (Nmap official site), www.monkey.org URLs hosting KDCSpoof Kerberos attack tools and John password cracker patches, www.porcupine.org/satan/admin-gui (SATAN network analysis tool), www.foundstone.com/rdlabs/tools.php (security tool repository), and www.nessus.org (Nessus vulnerability scanner).

**Critical Assessment Note**: This organized repository of tools, structured by attack phases (Footprinting → Enumeration → Exploitation), does indicate systematic collection and study of offensive security methodologies. However, this represents a static tool collection with no corresponding evidence of actual execution against external targets. The investigation identified no captured output from tool execution, no scan results, no exploitation logs, no exfiltrated data, and no evidence of successful compromise or persistence on remote systems. The collection is consistent with security research, penetration testing study, or educational interest in offensive security techniques.

### Credential Extraction Capability

YARA scanning detected the presence of samdump.dll, a utility specifically designed to extract password hashes from the Windows SAM (Security Accounts Manager) database. This tool is classified as HackTool_Samples by YARA detection. Samdump.dll is commonly used in post-compromise scenarios for credential theft and lateral movement.

**Critical Assessment Note**: While the tool was detected on the system, there is no evidence that it was ever executed. No evidence of SAM database extraction, password hash dumping, password cracking attempts, or successful credential theft was discovered. The tool's presence indicates potential capability but not confirmed malicious activity.

### File System Anomalies

Multiple files on the system exhibited mismatches between their file extensions and actual content signatures, detected in the temporary Internet cache and archive directories. Examples include .gif files containing JPEG or text content, .htm files containing image data, and archived .DOC files stored as plain text. These mismatches are consistent with common browser caching artifacts (files downloaded with incorrect MIME types) and archived documentation from circa 1993. The file extension mismatches appear to be benign artifacts rather than evidence of intentional concealment.

### Antivirus Scan Results

A ClamAV antivirus scan was executed against the disk image. However, the clamscan utility read the .E01 EnCase image file as a single monolithic file rather than opening and scanning the actual files contained within the disk image. This technical limitation means the antivirus scan did not evaluate the actual file contents inside the recovered system. Consequently, **the antivirus check is inconclusive**, as the files within the image were not scanned by the antivirus engine.

## Threat Intelligence and Attribution

The recovered system exhibits characteristics consistent with an individual interested in hacking methodologies and wireless network reconnaissance techniques. The user account "Mr. Evil" and associated email addresses (mrevilrulez@yahoo.com, mr.evil@www.netstumbler.com) maintain consistent naming conventions suggesting deliberate adoption of a "hacker" persona. The organized categorization of tools by attack phase, combined with visits to known hacking community websites (www.2600.com, #Elite.Hackers IRC channel), indicates engagement with hacking culture and community participation.

However, the evidence presents a critical distinction between tool possession and actual malicious activity. While the laptop contained sophisticated network analysis and credential extraction tools, and the user demonstrated knowledge of their installation and operation, the investigation found no forensic evidence of these tools being successfully deployed against external targets. No captured network traffic, no scan results, no exfiltrated data, and no artifacts of remote system compromise were identified.

The convergence of evidence—the "Mr. Evil" persona adoption, the organized tool collection, the IRC channel participation in hacking communities, and the visits to security research websites—establishes that this individual was engaged with hacking culture and possessed interest in offensive security techniques. However, this evidence profile is equally consistent with security enthusiasts, penetration testers, or students of information security, not necessarily active threat actors.

## Impact Assessment

**Scope**: The investigation focused on a single abandoned Dell CPi laptop recovered with wireless interception hardware. The system does not appear to be part of a larger botnet, command-and-control infrastructure, or coordinated attack campaign. The recovered system represents the tools and research of an individual.

**Confirmed Compromise**: No evidence was found that external systems were compromised using tools on this laptop. No outbound attack artifacts, no command-and-control communications, and no indicators of successful remote access were discovered.

**Data at Risk**: While the system contained extensive documentation of hacking tools and methodologies, no evidence of stolen data, credit card information, compromised credentials, or victims' personal information was discovered on the laptop. The suspected modus operandi (wireless traffic interception for credit card harvesting) has no supporting artifacts.

**Wireless Capability**: The presence of the external wireless PCMCIA card and homemade 802.11b antenna, combined with NetStumbler tool installation and "wardriving" documentation cache, indicates the individual possessed the technical capability to detect and potentially monitor wireless networks. However, no evidence of actual wireless network compromise, captured wireless credentials, or unauthorized access to wireless-connected systems was found.

**Persistence Depth**: There is no evidence that malware, rootkits, backdoors, or persistence mechanisms were installed on this system or on external systems. The tools discovered are primarily legitimate security research utilities or known hacking tools, but with no evidence of execution leading to successful compromise.

## Immediate Tactical Containment

Given that this system was recovered in September 2004 and the most recent activity logged is from August 27, 2004, over two decades have elapsed since the incident was active. However, for reference to the investigation questions posed at the time of recovery:

1. **Isolate the recovered laptop**: Ensure the device is maintained as forensic evidence in a secure, disconnected state to preserve chain of custody.

2. **Verify the wireless PCMCIA card and antenna**: Confirm these items are accounted for and do not pose ongoing interception risk. Test to verify operational status and any residual configuration.

3. **Review access logs for the user "Mr. Evil"**: Any systems where this account or associated email addresses (mrevilrulez@yahoo.com, mr.evil@www.drudgereport.com, mr.evil@www.netstumbler.com, mr.evil@www.maktoob.com) maintain active accounts should have their access logs reviewed for the August 2004 timeframe.

4. **Monitor for indicator reuse**: Watch for future activation of the nicknames "mrevilrulez" or "Mr. Evil" in IRC networks or online communities, particularly on EFnet, UnderNet, and AfterNet IRC servers where these identities were previously active.

5. **Preserve evidence**: Maintain the Dell CPi laptop, disk image, wireless card, and antenna in secure evidence storage with proper chain of custody documentation.

## Strategic Remediation

**Root Cause 1 - Inadequate Endpoint Security Monitoring**: The system contained multiple executable hacking tools with no evidence of endpoint detection, application whitelisting, or behavioral monitoring that would have alerted to their installation or execution. The organized directory structure (FOOTPRINTING/ENUMERATION/EXPLOITATION) suggests the user could openly create and maintain tool collections without triggering security alerts. **Remediation**: Implement endpoint detection and response (EDR) capabilities that monitor for execution of known hacking tools by file hash signature and behavioral indicators. Configure application control policies to prevent execution of utilities commonly associated with network sniffing (Ethereal, Cain & Abel) and credential extraction (samdump.dll) from user directories. Detection of these specific tools executing on the system should generate high-priority alerts.

**Root Cause 2 - Insufficient Wireless Network Security Monitoring**: The presence of the external 802.11b antenna and NetStumbler execution evidence indicates wireless network reconnaissance activity was possible without detection. The user visited wardriving websites and maintained documentation of wireless network discovery techniques. **Remediation**: Deploy wireless intrusion detection systems (WIDS) to monitor for unauthorized wireless access point discovery tools and packet capture attempts. In the case of 2004-era wireless networks, basic protections include WPA encryption (superseding WEP), implementation of wireless network segmentation, and regular scanning for rogue access points. The specific finding of NetStumbler execution should trigger investigation of nearby wireless networks for unauthorized access.

**Root Cause 3 - Lack of Incident Response for Suspicious Tool Discovery**: The user could maintain extensive collections of known hacking tools, visit hacking community websites, and participate in hacking-themed IRC channels with no indication that internal security monitoring flagged this activity for investigation. **Remediation**: Establish security monitoring for indicators of malicious tool possession: detection of specific utilities like Cain & Abel, samdump.dll, or Ethereal in user file systems should be escalated for investigation. Web content filtering should flag access to known hacking tool repositories and warez distribution sites. IRC connection monitoring should flag connections to known hacking community channels (#Elite.Hackers, #ushells, etc.) or use of nicknames with obvious hacking connotations.

**Root Cause 4 - Incomplete Antivirus Coverage**: The antivirus scan conducted during this investigation (ClamAV) was unable to scan the actual files within the disk image, leaving the question of malware presence unanswered. **Remediation**: When examining disk images or archived systems, use antivirus scanning tools that can operate on forensic image formats directly (such as Clamav with explicit file extraction, or antivirus engines that can read EnCase image containers). The current investigation revealed that the standard antivirus approach failed to provide definitive malware status. In 2004, this would have been addressed by ensuring on-premises antivirus scanning of the live system before it was abandoned or by using forensic-capable antivirus tools during the investigation.

## Conclusion

### Case Question Responses

**Q1: What systems were compromised?**
Based on the forensic investigation, no external systems were confirmed to be compromised using this laptop. While the recovered Dell CPi contained extensive hacking tools and documentation of attack methodologies, no evidence was identified that these tools were successfully deployed against external systems. No artifacts of remote command execution, no compromised system indicators, and no stolen data from external systems were discovered. The tools were present on the laptop, but no evidence confirms successful exploitation of external systems.

**Q2: How did the attacker gain initial access?**
Not applicable. The investigation found no evidence of this system being used to gain access to external systems. While the tools for such access were present, their use against external targets is not supported by the forensic evidence.

**Q3: What lateral movement occurred?**
Not applicable. No evidence of lateral movement to other systems was identified. The system does not appear to have been part of a network-wide compromise or coordinated attack involving multiple systems.

**Q4: What persistence mechanisms were installed?**
No persistence mechanisms (rootkits, scheduled tasks, startup registry entries, or backdoors) were identified on this system or on any external systems it may have accessed. The hacking tools present are user-space applications without evidence of kernel-level modification or hidden startup routines.

**Q5: Was data exfiltrated, and if so, what and how much?**
No evidence of data exfiltration was found. The user's suspected modus operandi involved wireless traffic interception to harvest credit card numbers and credentials from nearby wireless network users. However, no captured traffic files, no credential repositories, and no apparent victim data were discovered on the recovered laptop. The absence of captured PCAP files despite packet capture tool installation suggests this particular function may not have been operationalized on this system.

**Q6: What is the full timeline of the incident?**
The active timeline spans August 20-27, 2004, a seven-day period. Tools were installed beginning August 20, 2004, with peak execution activity occurring on August 27, 2004. IRC logs show the user "mrevilrulez" active on August 20, 2004 from 10:29 through 14:02 (approximately 3.5 hours of hacking community channel participation). Remote access tools were executed on August 26, 2004. The most recent evidence is from August 27, 2004 at 15:46:27, after which no additional system activity was recorded until the laptop's discovery on September 20, 2004.

**Q7: What is the total scope and business impact?**
Business impact is limited to the scope of the single abandoned Dell CPi laptop. There is no evidence of compromise to other systems, theft of operational data, or disruption to business services. The potential impact—wireless interception of nearby users' internet traffic—could have affected individuals using wireless access points within range of the device's antenna, but no such victims were identified during this investigation. The scope is contained to the single device and its user's knowledge and tool collection.

**Q8: What are the recommended remediation actions?**
The specific remediation actions for this case include: (1) implementation of endpoint detection for known hacking tools (Ethereal, Cain & Abel, samdump.dll) via file hash and behavioral monitoring; (2) deployment of wireless intrusion detection to identify NetStumbler execution and wireless network reconnaissance attempts; (3) security monitoring for user file system presence of hacking tools and suspicious tool repositories; and (4) use of forensic-capable antivirus tools that can definitively evaluate disk images for malware presence. For the specific individual associated with this device, monitoring of the online nicknames "mrevilrulez" and "Mr. Evil" across hacking community channels would provide early warning of related activity. Long-term, organizations should implement network segmentation, strong wireless encryption (WPA2 minimum, WPA3 preferred), and endpoint protection to prevent both the installation of hacking tools and unauthorized access from external threat actors.

### Summary

The investigation of the recovered Dell CPi laptop identified a system used by an individual adopting the "Mr. Evil" persona who maintained extensive collections of hacking tools, participated in hacking community IRC channels, and visited security research websites. The system contained sophisticated tools for packet capture (Ethereal, Cain & Abel), wireless network discovery (NetStumbler), credential extraction (samdump.dll), and system reconnaissance (Nmap, WHOIS). Multiple tools showed execution evidence, particularly on August 27, 2004. However, the forensic investigation found no evidence that these tools were successfully deployed against external systems, no captured network traffic or credential data, and no indicators of successful compromise of other systems. The evidence is consistent with an individual interested in hacking culture and offensive security methodologies, but not with confirmed active attacks or data theft. The antivirus scan was inconclusive due to technical limitations of scanning EnCase disk images. The investigation identified 7 findings with appropriate evidentiary support, 2 confirmed observations, and 5 inferences based on tool signatures and execution records.


---

## Overview

| | |
|---|---|
| Findings | **7** (2 confirmed, 5 inference) |
| Severity | 0 critical, 0 high, 5 medium, 1 low, 1 info |
| Sources | 12 evidence sources across 140 tool calls |


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
| 2004-08-20T10:05:00 | Packet Capture and Network Sniffing Tools Installed and Executed | MEDIUM | ez.prefetch, registry.system, tsk.filelist |
| 2004-08-20T10:05:00 | Comprehensive Hacking Tool Collection and Documentation Stored on System | MEDIUM | tsk.filelist, bulk.domain, bulk.url |
| 2004-08-20T10:30:18 | System Tied to Suspect 'Mr. Evil' - Evidence of Hacking Community Participation | MEDIUM | appfiles.program_files*.#elite.hackers.undernet.log, appfiles.program_files*.#evilfork.efnet.log, appfiles.program_files*.#cybercafe.undernet.log, appfiles.program_files*.#ushells.undernet.log, bulk.email |
| 2004-08-20T15:32:10 | File Masquerading - Content Type Signature Mismatches Detected | MEDIUM | tsk.masquerade |
| 2004-08-26T15:05:15 | Remote Access Tool Execution - Telnet and WHOIS Utilities | LOW | ez.prefetch |
| 2004-08-27T15:12:35 | Wireless Network Interception Tools Installed | MEDIUM | ez.prefetch, tsk.filelist, bulk.url |





---

## Appendix A: Verified Forensic Findings


### 1. [MEDIUM] Packet Capture and Network Sniffing Tools Installed and Executed

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:05:00 to 2004-08-27T15:34:54 |
| **Sources** | ez.prefetch, registry.system, tsk.filelist |
| **Evidence Refs** | tc_b8ba623b, tc_0b87c32d, tc_68e05738, tc_acc7424d |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1557](https://attack.mitre.org/techniques/T1557/), [T1003](https://attack.mitre.org/techniques/T1003/) |


The system has multiple packet capture and network sniffing tools installed and executed, indicating potential interest in network monitoring capabilities. These tools were present on the system:\n\n1. **Ethereal (Network Protocol Analyzer)** - Installed at C:\\Program Files\\Ethereal\\ethereal.exe, last modified 2004-08-13 02:15:35. Prefetch records show execution on 2004-08-27 15:34:54. WinPcap driver also executed (2004-08-20 15:06:18).\n\n2. **Cain & Abel v2.5 (Credential and Network Analyzer)** - Installed at C:\\Program Files\\Cain on 2004-08-20 10:05 from D:\\Drivers\\Cain & Abel\\cain25b45.exe. Executed on 2004-08-27 15:33:03.\n\n3. **Look@LAN (Network Scanner)** - Installed at C:\\Program Files\\Look@LAN\\LookAtHost.exe. Executed 2004-08-26 15:06:14.\n\n**IMPORTANT NOTE**: Despite the presence of these tools and evidence of execution, NO packet capture files (.pcap, .cap) were found anywhere on the system. Typically, systems actively used for packet sniffing would have captured data files. The absence of any captured traffic files suggests these tools may have been present for learning/research purposes rather than active packet capture operations. Additionally, analysis dates (August 2004) show these tools were present but tools were only executed once each with no evidence of ongoing or repeated use."



### 2. [MEDIUM] Wireless Network Interception Tools Installed

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-27T15:12:35 to 2004-08-27T15:12:35 |
| **Sources** | ez.prefetch, tsk.filelist, bulk.url |
| **Evidence Refs** | tc_732c9254, tc_79ebb1d7 |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1592.004](https://attack.mitre.org/techniques/T1592/004/) |


NetStumbler wireless network discovery tool is installed and shows evidence of execution on the system. NetStumbler is used for detecting wireless networks and collecting SSID information. The tool's presence indicates the suspect had interest in wireless network reconnaissance capabilities.\n\nNetStumbler.exe located at C:\\Program Files\\Network Stumbler\\netstumbler.exe, last modified 2004-08-27 15:12:35. Prefetch records show execution on 2004-08-27 15:12:35.\n\nThe user \"Mr. Evil\" visited wardriving-related websites (www.wardriving.com visible in URL history) and a cached file named \"wardriving[1]\" was found in temporary Internet files, suggesting interest in wireless network wardriving techniques.\n\n**NOTE**: Tool execution alone does not confirm actual wireless network interception or attacks. No evidence of compromised wireless networks, captured credentials from wireless systems, or intrusion into external wireless systems was found. This finding indicates tool interest and research rather than confirmed malicious use."



### 3. [MEDIUM] System Tied to Suspect 'Mr. Evil' - Evidence of Hacking Community Participation

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:30:18 to 2004-08-20T14:02:55 |
| **Sources** | appfiles.program_files*.#elite.hackers.undernet.log, appfiles.program_files*.#evilfork.efnet.log, appfiles.program_files*.#cybercafe.undernet.log, appfiles.program_files*.#ushells.undernet.log, bulk.email |
| **Evidence Refs** | tc_41b300b2, tc_c9460dde, tc_d3998846, tc_00546413, tc_68e05738 |
| **ATT&CK** | [T1589](https://attack.mitre.org/techniques/T1589/) |


The system belongs to user \"Mr. Evil\" who has IRC activity with hacking-related usernames and visited security-related websites. Evidence includes:\n\n1. **Local User Account**: System contains user account \"Mr. Evil\" with full profile, Start Menu programs, and desktop items.\n\n2. **IRC Activity**: User logged into IRC with nickname \"mrevilrulez\" and was present in multiple channels:\n   - #Elite.Hackers (UnderNet) - 2004-08-20 10:45:34 to 10:49:05\n   - #evilfork (EFnet) - 2004-08-20 10:30:18 to 10:31:07\n   - #CyberCafe (UnderNet) - 2004-08-20 10:54:21 to 14:02:55  \n   - #ushells (UnderNet) - 2004-08-20 10:44:49 to 10:45:07\n\n3. **Email Identities**: Multiple email variations associated with the account:\n   - mrevilrulez@yahoo.com\n   - mr.evil@www.drudgereport.com\n   - mr.evil@www.netstumbler.com\n   - mr.evil@www.maktoob.com\n\n4. **Security Site Visits**: The user visited security reference sites including www.rootkit.com, www.insecure.org/nmap, www.2600.com.\n\n**IMPORTANT CONTEXT**: Analysis of the actual IRC logs reveals that the #Elite.Hackers channel contained only music/audio references, and the #CyberCafe log shows primarily casual social chat (about food, dating, etc.) with the user \"mrevilrulez\" contributing minimally (posting \"glib marm cuyk\" and \"hi\"). NO discussion of actual attacks, hacking coordination, or planning of malicious activities was found in the available logs. The username pattern and website visits indicate interest in hacking/security culture rather than confirmed participation in coordinated attack planning."



### 4. [MEDIUM] File Masquerading - Content Type Signature Mismatches Detected

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:32:10 to 2004-08-27T15:44:34 |
| **Sources** | tsk.masquerade |
| **Evidence Refs** | tc_acc7424d |
| **ATT&CK** | [T1036](https://attack.mitre.org/techniques/T1036/), [T1036.005](https://attack.mitre.org/techniques/T1036/005/) |


Multiple files on the system have file extensions that do not match their actual content signatures. Several instances were detected in the temporary Internet cache:\n\n1. **Image Files with Mismatched Types**:\n   - fpcount[1].gif (extension: gif, actual content: text) - 737 bytes, modified 2004-08-27 15:11:12\n   - faq[1].gif (extension: gif, actual content: jpeg) - 5,228 bytes, modified 2004-08-20 15:32:10\n   - maktoobTracking[1].htm (extension: htm, actual content: gif) - 4,297 bytes, modified 2004-08-27 15:44:34\n\n2. **Document Files with Text Content**:\n   - Multiple .DOC files in ARCHIVE folders detected as text (ADDENDUM.DOC, LICENSE.DOC, MANUAL.DOC, etc.) - created 1993\n\nThese files were located in the temporary Internet cache and archive directories. File extension mismatches in Internet cache are common artifacts caused by web browser behavior - files downloaded with incorrect MIME types, cached content with wrong extensions, or web pages saved with incorrect file type associations. The files in question appear to be cached web content and archived documentation, which commonly exhibit such mismatches without indicating intentional concealment. The ARCHIVE folder files with 1993 creation dates suggest these are old distribution files rather than active concealment activities."



### 5. [MEDIUM] Comprehensive Hacking Tool Collection and Documentation Stored on System

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:05:00 to 2004-08-27T15:46:27 |
| **Sources** | tsk.filelist, bulk.domain, bulk.url |
| **Evidence Refs** | tc_1b7662c8, tc_bb993e68 |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1592.004](https://attack.mitre.org/techniques/T1592/004/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1518](https://attack.mitre.org/techniques/T1518/) |


The system contains an extensive organized collection of hacking tools, exploit documentation, and attack methodology resources stored in the user's My Documents directory, organized by attack phases:\n\n1. **ENUMERATION/NT/** - Network enumeration tools:\n   - My Documents/ENUMERATION/NT/ogre/ directory containing network reconnaissance tools\n   - Organized for NT/Windows system enumeration\n\n2. **EXPLOITATION/Unix/** - Attack tools:\n   - My Documents/EXPLOITATION/Unix/dsniff 2.3/ - Dsniff is a suite of tools for sniffing network traffic and extracting credentials. Documentation found includes \"Switched networks lose security advantage due packet tool\"\n   - References to exploitation techniques\n\n3. **FOOTPRINTING/NT/** - Network reconnaissance:\n   - My Documents/FOOTPRINTING/NT/Nmapnt/ - Complete Nmap (Network Mapper) source code and documentation including:\n     - nmap.deprecated.txt\n     - nmap.usage.txt\n     - nmapfe.1 (nmapfe manual)\n     - nmap-rpc\n     - nmap-services\n   - Nmap is used for port scanning and network topology mapping\n\n4. **URL History References**:\n   - www.porcupine.org/satan/admin-gui - SATAN (System Administrator Tool for Analyzing Networks) tool\n   - www.insecure.org/nmap - Nmap official site\n   - www.monkey.org/~dugsong/kdcspoof.tar.gz - KDCSpoof Kerberos attack tool\n   - www.monkey.org/~dugsong/john-1.6.krb4.patch-3 - John password cracker\n   - www.foundstone.com/rdlabs/tools.php - Security tool repository\n   - www.nessus.org - Nessus vulnerability scanner\n\n**ANALYSIS**: This organized collection, with documentation structured by attack phases (Footprinting → Enumeration → Exploitation), does indicate systematic collection and categorization of offensive security tools and methodologies. However, this represents a STATIC tool repository with no evidence of actual execution of these tools in coordinated attacks. The tools are stored and documented but with no corresponding evidence of:\n- Actual targets being scanned or exploited\n- Captured output from tool execution (scan results, exploitation logs)\n- Exfiltrated data from compromised systems\n- Real attack attempts or compromise of external systems\n- Persistence mechanisms on remote systems\n\nThis collection is consistent with security research, penetration testing study, or educational interest in hacking methodologies, rather than evidence of actual active attacks."



### 6. [LOW] Remote Access Tool Execution - Telnet and WHOIS Utilities

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-26T15:05:15 to 2004-08-26T15:13:57 |
| **Sources** | ez.prefetch |
| **Evidence Refs** | tc_4b443958 |
| **ATT&CK** | [T1021](https://attack.mitre.org/techniques/T1021/), [T1049](https://attack.mitre.org/techniques/T1049/) |


Prefetch records show execution of remote access and information gathering utilities on 2004-08-26:\n\n1. **TELNET.EXE** - Executed 2004-08-26 15:05:15\n   - Windows system telnet client\n   - Used for remote command-line access to systems\n   - Single execution with no indication of connection details or success\n\n2. **WHOIS.EXE** - Executed 2004-08-26 15:13:57 (2 execution instances)\n   - Located at C:\\Program Files\\Whois\\whois.exe  \n   - Used for domain and IP address reconnaissance\n   - Gathers ownership, administrative, and technical contact information\n\nThe sequential execution of these tools on the same date (WHOIS followed by TELNET) is consistent with either innocent information gathering or administrative system reconnaissance. However, without evidence of actual telnet connections, successful authentication, or intrusions into external systems, the execution alone indicates tool presence rather than confirmed unauthorized access attempts. These are standard utilities commonly used by system administrators for network diagnostics."



### 7. [INFO] Credential Extraction Tool Detected - samdump.dll

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | yara.files |
| **Evidence Refs** | tc_b0e370d4 |
| **ATT&CK** | [T1003](https://attack.mitre.org/techniques/T1003/), [T1003.002](https://attack.mitre.org/techniques/T1003/002/) |


YARA scanning detected the presence of samdump.dll, a utility designed to extract password hashes from Windows SAM (Security Accounts Manager) database. This tool is classified as HackTool_Samples by YARA.\n\nDetection: offset 0x1e4bf1dd:$g: samdump.dll\n\nSamdump.dll is a tool used for offline password cracking and lateral movement by extracting local system credentials. However, file presence alone does not confirm actual use.\n\n**CRITICAL NOTE**: While the tool was detected on the system, there is NO evidence that it was actually executed or used. No evidence of SAM database extraction, password hashes being dumped, or credential cracking attempts was found. The tool's presence indicates potential capability but not confirmed malicious activity."



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
| Email | `mrevilrulez@yahoo.com` |  | System Tied to Suspect 'Mr. Evil' - Evidence of Hacking Community Participation |
| Email | `mr.evil@www.drudgereport.com` |  | System Tied to Suspect 'Mr. Evil' - Evidence of Hacking Community Participation |
| Email | `mr.evil@www.netstumbler.com` |  | System Tied to Suspect 'Mr. Evil' - Evidence of Hacking Community Participation |
| Email | `mr.evil@www.maktoob.com` |  | System Tied to Suspect 'Mr. Evil' - Evidence of Hacking Community Participation |




---

## Appendix C: MITRE ATT&CK Coverage

13 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (3) > Defense Evasion (2) > Credential Access (4) > Discovery (4) > Lateral Movement (1) > Collection (1)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1589](https://attack.mitre.org/techniques/T1589/) | Gather Victim Identity Information | System Tied to Suspect 'Mr. Evil' - Evidence... |
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Wireless Network Interception Tools Installed; Comprehensive Hacking Tool Collection and... |
| [T1592.004](https://attack.mitre.org/techniques/T1592/004/) | Client Configurations | Wireless Network Interception Tools Installed; Comprehensive Hacking Tool Collection and... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1036](https://attack.mitre.org/techniques/T1036/) | Masquerading | File Masquerading - Content Type Signature... |
| [T1036.005](https://attack.mitre.org/techniques/T1036/005/) | Match Legitimate Resource Name or Location | File Masquerading - Content Type Signature... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1003](https://attack.mitre.org/techniques/T1003/) | OS Credential Dumping | Packet Capture and Network Sniffing Tools...; Credential Extraction Tool Detected - samdump.dll |
| [T1003.002](https://attack.mitre.org/techniques/T1003/002/) | Security Account Manager | Credential Extraction Tool Detected - samdump.dll |
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Packet Capture and Network Sniffing Tools... |
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Packet Capture and Network Sniffing Tools... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Packet Capture and Network Sniffing Tools... |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Comprehensive Hacking Tool Collection and... |
| [T1049](https://attack.mitre.org/techniques/T1049/) | System Network Connections Discovery | Remote Access Tool Execution - Telnet and... |
| [T1518](https://attack.mitre.org/techniques/T1518/) | Software Discovery | Comprehensive Hacking Tool Collection and... |


### Lateral Movement

| Technique | Name | Findings |
|-----------|------|----------|
| [T1021](https://attack.mitre.org/techniques/T1021/) | Remote Services | Remote Access Tool Execution - Telnet and... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Packet Capture and Network Sniffing Tools... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 140 |
| Findings submitted | 7 |
| Confirmed | 2 |
| Inferences | 5 |
| Input tokens | 4.5K |
| Output tokens | 53.9K |
| Total tokens | 58.3K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case-q31.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 4.5K | 53.9K | 58.3K |




<details>
<summary>Evidence Sources (186)</summary>

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
| bulk.sin | bulk_extractor | 28 |
| bulk.tcp | bulk_extractor | 825 |
| bulk.telephone | bulk_extractor | 659 |
| bulk.url | bulk_extractor | 15563 |
| bulk.url_searches | bulk_extractor | 42 |
| bulk.url_services | bulk_extractor | 3045 |
| appfiles.program_files*.license.txt | icat | 46 |
| appfiles.program_files*.manifest.xml | icat | 121 |
| appfiles.program_files*.market.ini | icat | 7 |
| appfiles.program_files*.market.ini | icat | 7 |
| appfiles.program_files*.market.ini | icat | 7 |
| appfiles.program_files*.market.ini | icat | 7 |
| appfiles.program_files*.market.ini | icat | 7 |
| appfiles.program_files*.market.ini | icat | 7 |
| appfiles.program_files*.market.ini | icat | 7 |
| appfiles.program_files*.market.ini | icat | 7 |
| appfiles.program_files*.market.ini | icat | 7 |
| appfiles.program_files*.market.ini | icat | 7 |
| appfiles.program_files*.migrate.ini | icat | 128 |
| appfiles.program_files*.msn.inf | icat | 913 |
| appfiles.program_files*.msnupgrd.inf | icat | 69 |
| appfiles.program_files*.history.txt | icat | 26 |
| appfiles.program_files*.install.log | icat | 35 |
| appfiles.program_files*.license.txt | icat | 38 |
| appfiles.program_files*.readme.txt | icat | 49 |
| appfiles.program_files*.agent.ini | icat | 554 |
| appfiles.program_files*.errorlog.txt | icat | 6 |
| appfiles.program_files*.install.log | icat | 82 |
| appfiles.program_files*.order.txt | icat | 115 |
| appfiles.program_files*.readme.txt | icat | 102 |
| appfiles.program_files*.install.log | icat | 65 |
| appfiles.program_files*.credits.txt | icat | 19 |
| appfiles.program_files*.oui.txt | icat | 7087 |
| appfiles.program_files*.iefiles5.inf | icat | 49 |
| appfiles.program_files*.adoapt15.reg | icat | 19 |
| appfiles.program_files*.adofre15.reg | icat | 18 |
| appfiles.program_files*.makapt15.bat | icat | 3 |
| appfiles.program_files*.makfre15.bat | icat | 3 |
| appfiles.program_files*.handler.reg | icat | 15 |
| appfiles.program_files*.handsafe.reg | icat | 17 |
| appfiles.program_files*.handunsf.reg | icat | 17 |
| appfiles.program_files*.desktop.ini | icat | 11 |
| appfiles.program_files*.dictionary.xml | icat | 649 |
| appfiles.program_files*.mobileipv4.xml | icat | 64 |
| appfiles.program_files*.nasreq.xml | icat | 293 |
| appfiles.program_files*.sunping.xml | icat | 24 |
| registry.default | regripper | 400 |
| appfiles.program_files*.capture_filters.txt | icat | 80 |
| appfiles.program_files*.capturing.txt | icat | 84 |
| appfiles.program_files*.display_filters.txt | icat | 43 |
| appfiles.program_files*.faq.txt | icat | 2228 |
| appfiles.program_files*.getting_started.txt | icat | 90 |
| ez.prefetch | eztools | 165 |
| appfiles.program_files*.overview.txt | icat | 38 |
| appfiles.program_files*.well_known.txt | icat | 114 |
| appfiles.program_files*.pcrepattern.3.txt | icat | 1475 |
| appfiles.program_files*.agentx-mib.txt | icat | 529 |
| appfiles.program_files*.disman-event-mib.txt | icat | 1957 |
| appfiles.program_files*.disman-schedule-mib.txt | icat | 701 |
| registry.sam | regripper | 133 |
| appfiles.program_files*.disman-script-mib.txt | icat | 1766 |
| appfiles.program_files*.etherlike-mib.txt | icat | 1139 |
| appfiles.program_files*.hcnum-tc.txt | icat | 120 |
| appfiles.program_files*.host-resources-mib.txt | icat | 1542 |
| registry.sam | regripper | 7 |
| appfiles.program_files*.host-resources-types.txt | icat | 391 |
| appfiles.program_files*.iana-address-family-numbers-mib.txt | icat | 123 |
| appfiles.program_files*.iana-language-mib.txt | icat | 125 |
| appfiles.program_files*.ianaiftype-mib.txt | icat | 392 |
| appfiles.program_files*.if-inverted-stack-mib.txt | icat | 151 |
| registry.security | regripper | 19 |
| appfiles.program_files*.if-mib.txt | icat | 1816 |
| appfiles.program_files*.inet-address-mib.txt | icat | 300 |
| appfiles.program_files*.ip-forward-mib.txt | icat | 811 |
| appfiles.program_files*.ip-mib.txt | icat | 722 |
| registry.security | regripper | 8 |
| appfiles.program_files*.ipv6-icmp-mib.txt | icat | 531 |
| appfiles.program_files*.ipv6-mib.txt | icat | 1445 |
| appfiles.program_files*.ipv6-tc.txt | icat | 69 |
| appfiles.program_files*.ipv6-tcp-mib.txt | icat | 213 |
| appfiles.program_files*.ipv6-udp-mib.txt | icat | 143 |
| appfiles.program_files*.lm-sensors-mib.txt | icat | 232 |
| appfiles.program_files*.mta-mib.txt | icat | 1228 |
| appfiles.program_files*.net-snmp-agent-mib.txt | icat | 546 |
| appfiles.program_files*.net-snmp-examples-mib.txt | icat | 229 |
| appfiles.program_files*.net-snmp-mib.txt | icat | 69 |
| appfiles.program_files*.net-snmp-monitor-mib.txt | icat | 61 |
| appfiles.program_files*.net-snmp-system-mib.txt | icat | 65 |
| appfiles.program_files*.net-snmp-tc.txt | icat | 123 |
| appfiles.program_files*.network-services-mib.txt | icat | 628 |
| appfiles.program_files*.notification-log-mib.txt | icat | 784 |
| appfiles.program_files*.rfc-1215.txt | icat | 40 |
| appfiles.program_files*.rfc1155-smi.txt | icat | 121 |
| appfiles.program_files*.rfc1213-mib.txt | icat | 2615 |
| appfiles.program_files*.rmon-mib.txt | icat | 3982 |
| registry.software | regripper | 9600 |
| appfiles.program_files*.smux-mib.txt | icat | 162 |
| appfiles.program_files*.snmp-community-mib.txt | icat | 431 |
| appfiles.program_files*.snmp-framework-mib.txt | icat | 528 |
| appfiles.program_files*.snmp-mpd-mib.txt | icat | 147 |
| appfiles.program_files*.snmp-proxy-mib.txt | icat | 296 |
| registry.software | regripper | 283 |
| appfiles.program_files*.snmp-target-mib.txt | icat | 662 |
| appfiles.program_files*.snmp-user-based-sm-mib.txt | icat | 914 |
| appfiles.program_files*.snmp-view-based-acm-mib.txt | icat | 832 |
| appfiles.program_files*.snmpv2-conf.txt | icat | 324 |
| appfiles.program_files*.snmpv2-mib.txt | icat | 856 |
| appfiles.program_files*.snmpv2-smi.txt | icat | 346 |
| registry.software | regripper | 1134 |
| appfiles.program_files*.snmpv2-tc.txt | icat | 774 |
| appfiles.program_files*.snmpv2-tm.txt | icat | 178 |
| appfiles.program_files*.tcp-mib.txt | icat | 332 |
| appfiles.program_files*.tunnel-mib.txt | icat | 339 |
| appfiles.program_files*.ucd-demo-mib.txt | icat | 76 |
| appfiles.program_files*.ucd-diskio-mib.txt | icat | 119 |
| appfiles.program_files*.ucd-dlmod-mib.txt | icat | 121 |
| registry.system | regripper | 3138 |
| appfiles.program_files*.ucd-ipfilter-mib.txt | icat | 258 |
| appfiles.program_files*.ucd-ipfwacc-mib.txt | icat | 329 |
| appfiles.program_files*.ucd-snmp-mib-old.txt | icat | 746 |
| appfiles.program_files*.ucd-snmp-mib.txt | icat | 1384 |
| registry.system | regripper | 199 |
| appfiles.program_files*.udp-mib.txt | icat | 148 |
| appfiles.program_files*.snmp-notification-mib.txt | icat | 591 |
| appfiles.program_files*.config.cfg | icat | 20 |
| appfiles.program_files*.features.txt | icat | 144 |
| appfiles.program_files*.license.txt | icat | 62 |
| registry.system | regripper | 286 |
| appfiles.program_files*.html.txt | icat | 32 |
| appfiles.program_files*.install2.log | icat | 39 |
| appfiles.program_files*.install.log | icat | 72 |
| appfiles.program_files*.license.txt | icat | 67 |
| appfiles.program_files*.notes.txt | icat | 135 |
| appfiles.program_files*.irunin.ini | icat | 399 |
| appfiles.program_files*.license.txt | icat | 25 |
| appfiles.program_files*.mailtmpl.txt | icat | 22 |
| appfiles.program_files*.msmsgs.exe.manifest | icat | 24 |
| clamav.scan | clamav | 2 |
| appfiles.program_files*.aliases.ini | icat | 16 |
| appfiles.program_files*.#chataholics.undernet.log | icat | 16 |
| appfiles.program_files*.#cybercafe.undernet.log | icat | 207 |
| appfiles.program_files*.#elite.hackers.undernet.log | icat | 11 |
| appfiles.program_files*.#evilfork.efnet.log | icat | 11 |
| appfiles.program_files*.#funny.undernet.log | icat | 10 |
| appfiles.program_files*.#houston.undernet.log | icat | 9 |
| appfiles.program_files*.#iso-warez.efnet.log | icat | 7 |
| appfiles.program_files*.#luxshell.undernet.log | icat | 13 |
| appfiles.program_files*.#mp3xserv.undernet.log | icat | 15 |
| appfiles.program_files*.#thedarktower.afternet.log | icat | 14 |
| appfiles.program_files*.#ushells.undernet.log | icat | 9 |
| appfiles.program_files*.m5tar.undernet.log | icat | 8 |
| appfiles.program_files*.mirc.ini | icat | 224 |
| appfiles.program_files*.popups.ini | icat | 96 |
| appfiles.program_files*.readme.txt | icat | 34 |
| appfiles.program_files*.servers.ini | icat | 423 |
| appfiles.program_files*.urls.ini | icat | 9 |
| appfiles.program_files*.versions.txt | icat | 472 |
| appfiles.program_files*.wavemix.inf | icat | 101 |
| appfiles.program_files*.msoe.txt | icat | 3 |
| appfiles.program_files*.ie_userdata.ini | icat | 10 |
| appfiles.program_files*.ie4shell95userdata.ini | icat | 5 |
| appfiles.program_files*.whois.txt | icat | 70 |
| appfiles.program_files*.install.log | icat | 138 |
| yara.files | yara | 3 |
| registry.ntuser.default user | regripper | 43 |
| registry.usrclass.localservice | regripper | 4 |
| registry.ntuser.localservice | regripper | 70 |
| registry.usrclass.mr. evil | regripper | 4 |
| registry.ntuser.mr. evil | regripper | 329 |
| registry.usrclass.networkservice | regripper | 4 |
| registry.ntuser.networkservice | regripper | 70 |
| tsk.masquerade | sleuthkit | 14 |
| exiftool.metadata | exiftool | 9 |
| composite.file_staging | composite | 122 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
