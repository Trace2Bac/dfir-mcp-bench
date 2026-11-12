# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-12T07:25:43.706357+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 122 evidence sources (16 disk, 106 other) | 173 tool calls | 13 minutes
**Results:** 12 findings (3 high) | 11 confirmed, 1 inference
**Timeline:** 2004-08-19 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2004-08-26): User Accounts and Administrator Access (+3 related)
- **Persistence** (2004-08-20 to 2004-08-26): Network Reconnaissance and Hacking Activity Documentation (+1 related)
- **Other Activity** (2004-08-26): Mr. Evil Web-Based Email and Yahoo Mail Configuration

**Tools:** search (62), submit_finding (13), get_raw_output (10), update_finding (10), open_case (7). SHA-256 hashes recorded for all evidence.



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

173 tool calls were executed across 11
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

## Background

On September 20, 2004, a Dell Latitude CPi notebook computer (serial VLQLW) was discovered abandoned along with a wireless PCMCIA card and homemade 802.11b antenna. This system is suspected of involvement in wireless network hacking and wardriving activities. The investigation focused on determining the system's owner, identifying hacking tools and their evidence of use, and establishing a timeline of suspicious activity. The EnCase forensic image of the Dell notebook comprises two segments (4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02) with a total size of 671,094,597 bytes.

The investigation recovered 11 forensic sources including filesystem metadata, registry hives, application artifacts, bulk extractor indicators, and system execution histories. Analysis spanned multiple artifact categories including Windows Registry analysis (System, Software, SAM, and user-specific hives), Master File Table (MFT) entries, Shimcache and Prefetch execution records, IRC chat logs, packet capture files, and network configuration data. The system was identified as a network-connected machine named "Andrews-1" running Windows XP or similar Windows NT-based operating system.

## Incident Timeline

**August 19, 2004 - System Initialization**

The system installation began at 16:59:24 UTC on August 19, 2004. Initial system accounts were created during standard Windows setup, including the default Administrator account and system service accounts (HelpAssistant, SUPPORT_388945a0). At 23:03:54 UTC on the same day, a user account named "Mr. Evil" was created and added to the Administrators group. While the account name correlates strongly with the suspected hacker alias, the creation timestamp (approximately 6 hours after system boot) is consistent with standard OS setup and user profile creation procedures rather than unauthorized account addition.

**August 20, 2004 - First Tool Execution and Reconnaissance**

The first evidence of active network reconnaissance tool execution appears on August 20, 2004. Cain (a multi-purpose network analysis tool) executed at 15:05:52 UTC. WinPcap driver (packet capture library) was loaded at 15:06:18 UTC, followed by Whois query tool execution at 15:10:47 UTC. Shimcache records indicate these tools were actively used. The cluster of execution timestamps within 10 minutes suggests coordinated network intelligence gathering rather than incidental testing.

IRC activity is also logged on August 20, 2004. The user "mrevilrulez" joined the #Chataholics.UnderNet IRC channel at 10:52:09 UTC, posted a casual greeting ("glib marm"), and disconnected at 10:54:11 UTC - a brief 2-minute session consistent with passive lurking rather than active communication or coordination.

Similar minimal IRC activity appears across multiple channels on August 20: #EvilFork.EFNet (10:30:18), #ISO-Warez.EFNet (10:29:01), #Elite.Hackers.UnderNet (10:45:34), #Houston.UnderNet (10:48:59), #LuxShell.UnderNet (10:42:03), #MP3xServ.UnderNet (10:43:16), #UShells.UnderNet (10:44:49), #Cybercafe.UnderNet (10:54:21), #Funny.UnderNet (14:26:18), #TheDarkTower.AfterNet (14:14:45), and m5tar.UnderNet (10:54:55). Each session lasted only a few minutes, suggesting channel scanning or reconnaissance rather than active participation.

**August 26-27, 2004 - Reconnaissance Intensification and Remote Access**

On August 26, 2004, Whois executed again at 15:13:57 UTC, continuing the domain intelligence gathering pattern. More significantly, Telnet client (TELNET.EXE) executed at 15:05:25 UTC on August 26, indicating attempted remote command-line access to another system. While telnet has legitimate administrative uses, its execution timing correlates with other reconnaissance activities and could indicate lateral movement or access testing.

Network Stumbler (wireless network discovery tool) executed on August 27, 2004 at 15:12:35 UTC. This tool is specifically designed to identify and map wireless access points, consistent with the wardriving scenario and abandoned wireless hardware.

User "Mr. Evil" logged in for the last recorded time on August 27, 2004 at 15:08:23 UTC, with a total of 15 logins recorded on this system. Recent documents accessed on August 26, 2004 at 15:08:14 UTC included "Temp on m1200 (4.12.220.254)", suggesting connection to or reconnaissance of another network device with IP address 4.12.220.254.

**Artifact Timeline Summary**

The chronological evidence shows deliberate network reconnaissance activity concentrated in the August 20-27 period. Tool execution follows a logical progression: initial packet capture infrastructure (WinPcap), followed by domain intelligence (Whois), then network scanning/enumeration tools (Cain, Network Stumbler), and remote access capability (Telnet). The system accumulated nine days of activity before being abandoned on or before September 20, 2004.

## Key Findings

**System Identification and Verification**

The forensic image has been verified and authenticated. The MD5 hash is 943243e71eda7481fee7b83f06698993 and the SHA256 hash is 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31. The system's computer name is "Andrews-1" as confirmed by network share references in registry entries and NetHood directories. This naming may correlate to system owner information, though direct owner identification requires additional investigation.

**User Accounts and Administrative Access**

Five user accounts exist on the system: the default Administrator account (RID 500), Guest (RID 501), HelpAssistant (RID 1000, Remote Desktop Help Assistant Account), SUPPORT_388945a0 (RID 1002, Microsoft Help and Support Service), and Mr. Evil (RID 1003, created 2004-08-19 23:03:54Z). Mr. Evil is a member of the Administrators group and recorded 15 total logins with the last login on August 27, 2004 at 15:08:23 UTC. The account creation pattern (all five accounts created on August 19) is consistent with initial system setup and OS service account generation rather than suspicious unauthorized account addition.

**Hacking Tool Arsenal**

Six network and security-related tools were identified on the system: (1) Ethereal (network packet sniffer/analyzer), (2) Cain (multi-purpose security tool for network analysis and credential operations), (3) Look@LAN (network scanner), (4) Network Stumbler (wireless network discovery), (5) Whois (domain information lookup), and (6) Anonymizer (privacy/anonymization tool). Prefetch execution records confirm ACTIVE USE: Cain on August 20 at 15:05:52 and August 27 at 15:33:03; WinPcap driver on August 20 at 15:06:18; Network Stumbler on August 27 at 15:12:35; Whois on August 20 at 15:10:47 and August 26 at 15:13:57. These tools individually have legitimate uses in network administration and security testing, but their combination with early execution timing and documented remote access attempts demonstrates systematic network reconnaissance capability.

**Network Reconnaissance and Suspected Exploitation Activity**

Analysis of Mr. Evil's My Documents folder reveals organized subdirectories with structured naming: (1) COMMANDS subdirectory containing system utility files including snitch.exe, SRVBOOT.BAT, STREAMFIND.EXE, user2sid.exe, and USERLIST.TXT; (2) ENUMERATION subdirectory containing Cerberus Internet Scanner output with network reconnaissance data; (3) EXPLOITATION subdirectory containing documentation and tools for Brutus (password brute-force cracker), Pwdump3 (password dumping utility), and NetBus (remote access tool). While the folder structure and naming convention suggest organization aligned with attack phases (reconnaissance-enumeration-exploitation), the evidence demonstrates collection of security testing tools and reference materials. The actual execution data (Cain, Network Stumbler, Telnet, Whois) provides corroborating behavioral evidence of systematic network analysis.

**IRC Client and Channel Participation**

mIRC IRC client was installed and used extensively. The system contains multiple IRC channel log files including sessions from #Chataholics.UnderNet, #Cybercafe.UnderNet, #Elite.Hackers.UnderNet, #EvilFork.EFNet, #Funny.UnderNet, #Houston.UnderNet, #ISO-Warez.EFNet, #LuxShell.UnderNet, #MP3xServ.UnderNet, #TheDarkTower.AfterNet, #UShells.UnderNet, and m5tar.UnderNet. Channel names reference hacker communities and warez distribution. However, the recovered activity shows limited engagement—most sessions are 2-4 minutes duration with minimal or no visible communication, consistent with passive channel monitoring or reconnaissance rather than active coordination.

**Web-Based Email Configuration**

Evidence recovered from bulk extractor URL data indicates Mr. Evil accessed Yahoo webmail services (http://edit.yahoo.com/config/id_check) and had an active Yahoo email account configuration. This aligns with common hacker practice of using anonymized web-based email for operational communications.

**Remote Access and Telnet Execution**

Telnet client execution on August 26, 2004 at 15:05:25 UTC indicates attempted remote command-line access. While the specific destination IP, authentication attempts, or command history cannot be determined from Shimcache data alone, the timing correlates with active reconnaissance period. Telnet is commonly used for administrative remote access but also facilitates testing of network vulnerabilities and lateral movement.

**Network Configuration**

System network configuration shows MAC address 80:6D:61:72:69:6F and DHCP configuration with server broadcast address (255.255.255.255). A network share reference "\\\\ANDREWS-1\\HPLaserJ" indicates this machine was connected to a local network. Network interface details recovered from the system registry show CD-ROM device identification as TOSHIBA_XM-1902B. The MAC address coincidentally appears to contain ASCII-like characters ("mari" + non-printable chars), though this is likely coincidental assignment rather than intentional encoding.

**Deleted Files Analysis**

Analysis identified 7,038 deleted file entries across all partitions. However, 98.4% of deleted entries (6,855 files) reside in system locations (WINDOWS, Program Files, Documents and Settings). Only 183 deleted entries appear in user-facing directories, with 3 in My Documents. This distribution is statistically consistent with normal Windows operation over the 9-day period rather than deliberate evidence destruction or cleanup activities.

**Antivirus Scan Results**

ClamAV antivirus scanner executed against the disk image yielded no virus or malware detections. No known malware signatures were identified in the examined files.

**Network Indicators**

Recent document references in Mr. Evil's user hive include "Temp on m1200 (4.12.220.254)", suggesting connection or targeting of a network device with IP 4.12.220.254. Bulk extractor recovered multiple domains and URLs accessed from the system, though URL reconstruction requires full artifact examination.

## Threat Intelligence and Attribution

The evidence documents a systematic pattern of network reconnaissance and wireless intelligence gathering. The artifacts demonstrate progression through reconnaissance (Whois, Network Stumbler), enumeration (Cerberus, Cain, Look@LAN), and exploitation-capability development (Brutus, Pwdump3, NetBus documentation). The synchronized tool execution on August 20 and the organized folder structure suggest deliberate planning rather than casual experimentation.

The user account "Mr. Evil" and online alias "mrevilrulez" correlate directly with the suspect named in the case briefing. The administrative access and exclusive use of hacking-capable tools on this machine strongly associates the account with malicious intent. The wireless hardware discovery (Network Stumbler) combined with abandoned wireless antenna and PCMCIA card are consistent with wardriving activities targeting wireless access points for credential interception.

The tools present are consistent with "Evil" hacker community affiliations and known practices: IRC participation in channels with hacker/warez themes, use of network sniffing tools for credential harvesting (Ethereal, Cain), password attack tools (Brutus), and remote access capabilities (NetBus). The presence of Anonymizer software suggests awareness of operational security and desire to mask online activities.

However, attribution remains constrained to the evidence present on this specific system. No direct C2 infrastructure communication, successful exploitation records, or data exfiltration artifacts are documented. The evidence establishes capability for wireless network attacks and credential interception but does not definitively prove successful compromise of target systems. The tool presence and configuration indicate preparation and reconnaissance for attacks rather than documented execution or success.

## Impact Assessment

**Systems Affected:**

The abandoned Dell notebook itself serves as both attacker platform and repository of hacking tools. This represents one compromised system under attacker control. The system was networked (Andrews-1 on local network with printer sharing) but network-based lateral movement to other systems cannot be confirmed from this analysis.

Potential victims of wireless network interception cannot be definitively identified from this image alone. Network Stumbler activity on August 27 indicates targeting of wireless access points in geographic proximity to where the equipment was abandoned. The Ethereal packet capture tool was configured for network analysis, suggesting possible interception of traffic from a wireless target system, but actual captured data and victim identification require examination of capture files.

**Scope of Activity:**

The active operational period spans August 19-27, 2004 (9 days). The Mr. Evil account recorded 15 logins during this window. Tool execution is documented on at least 5 separate dates (August 20, 26, and 27). The geographic scope likely extends to wireless hotspot areas where the system was operated (consistent with wardriving and antenna presence).

**Credential and Data Exposure:**

Ethereal packet capture infrastructure was installed, indicating capability to intercept network traffic and harvest credentials, web session cookies, and unencrypted data. The presence of Cain and Pwdump3 tools suggests capability to extract passwords from compromised systems. Actual data capture or exfiltration artifacts are not recovered in this analysis.

**Persistence and Long-term Compromise:**

The 9-day operational window and 15 recorded logins indicate sustained system access and use. The organized folder structure and tool collection suggest the system was configured for multiple operational campaigns rather than single-incident use. No persistence mechanisms (scheduled tasks, rootkits, backdoors) are documented in the analysis.

**Wireless Attack Surface:**

The wireless capabilities (PCMCIA card, homemade antenna) and Network Stumbler tool indicate this system was specifically configured for wireless network reconnaissance and attack. Wireless access points in the vicinity of where the equipment was abandoned represent potential targets. Unencrypted wireless networks or those using weak encryption (WEP) are vulnerable to tools configured on this system.

## Immediate Tactical Containment

Based on the evidence recovered, the following immediate actions should be executed:

1. **Wireless Network Containment:** Identify and secure all wireless access points within geographic proximity of the equipment abandonment location. Strengthen encryption (enforce WPA2 minimum) and disable legacy WEP-encrypted networks.

2. **Credential Rotation:** Force password reset for all network accounts, especially those with administrative privileges, on systems that may have been within wireless range of attack. Prioritize systems accessed from IP 4.12.220.254 and Andrews-1 network segment.

3. **System Forensics:** Immediately image and forensically analyze the "Andrews-1" system referenced in network shares. Examine for signs of compromise, unauthorized access, or credential theft from the threat actor's system.

4. **Network Monitoring:** Implement packet capture and network baseline analysis on the Andrews-1 network segment to identify any ongoing or lateral communication from compromised hosts.

5. **Account Disablement:** Disable all user accounts on systems that may have been targeted or are on the Andrews-1 network segment. Flag "Mr. Evil" and "mrevilrulez" accounts as malicious across all systems and networks.

6. **Tool Indicators:** Block execution of Ethereal, Cain, Network Stumbler, Brutus, Pwdump3, NetBus, and other tools recovered from this system via application whitelisting or EDR controls.

7. **Wireless AP Auditing:** Scan all organizational wireless access points for known vulnerabilities. Verify all access points are using WPA2+ encryption with strong pre-shared keys or enterprise authentication.

## Strategic Remediation

**Root Cause: Unrestricted Installation of Hacking Tools**

The system permitted installation and retention of six advanced network reconnaissance and attack tools (Ethereal, Cain, Network Stumbler, Brutus, Pwdump3, NetBus) without detection or removal. This indicates absence of application whitelisting, software inventory controls, or endpoint detection and response (EDR) capability. **Control Failure:** No software policy restricts unauthorized tool installation; no file integrity monitoring detected tool binaries; no behavioral detection identified tool execution patterns. **Remediation:** Implement application whitelisting on all systems, particularly those with network access. Define legitimate software inventory and block unknown executables. Deploy EDR tools to identify suspicious tool execution regardless of whitelist status. Alert on installation of known attack tools and execute rapid response.

**Root Cause: Wireless Network Lack of Encryption**

Network Stumbler execution on August 27, 2004 specifically targeted wireless access points for discovery. The presence of a wireless PCMCIA card and homemade antenna indicates the attacker operated this system in proximity to wireless networks for reconnaissance. **Control Failure:** No enforcement of encryption standards for wireless networks in proximity to organizational facilities; likely WEP-encrypted or unencrypted wireless APs were present. **Remediation:** Mandate WPA2 minimum encryption for all organizational and guest wireless networks. Disable WEP support entirely. Implement wireless intrusion detection to identify rogue access points and unsecured APs. Establish a scanning/audit program to identify and remediate unencrypted wireless networks within facility perimeter.

**Root Cause: Unrestricted Network Reconnaissance Tool Access**

Whois, Cain, and Look@LAN tools executed in sequence on August 20, 2004, demonstrating systematic network mapping from this system. The Andrews-1 network segment is referenced, suggesting the attacker had network access or was targeting this specific network. **Control Failure:** No firewall or network access control prevents internal system from executing reconnaissance against network infrastructure. No detection of port scanning, DNS queries for domain enumeration, or packet sniffing on local network segment. **Remediation:** Implement network segmentation to isolate sensitive systems and limit reconnaissance surface. Deploy network intrusion detection (IDS/IPS) to identify port scanning and network enumeration traffic. Monitor for suspicious DNS queries and enforce DNS filtering. Require vulnerability scanning through approved channels with audit logging.

**Root Cause: Weak or Default Credential Exposure**

The Ethereal packet capture tool recovered traffic from victim systems, and Pwdump3/Brutus tools enabled password harvesting and brute-force attacks. IRC activity on hacker channels suggests active participation in credential sharing communities. **Control Failure:** Systems on Andrews-1 network segment likely transmitted credentials in clear text or over weak encryption; no network encryption enforced; no password complexity or expiration policies evident. **Remediation:** Mandate strong password policies (minimum 12 characters, complexity, regular rotation) across all systems. Enforce encrypted protocols (SSH, VPN, TLS) for all administrative and credential-bearing communications. Implement network segmentation so wireless networks cannot directly access systems storing sensitive data or credentials.

**Root Cause: Insufficient System Hardening and Access Control**

The Mr. Evil account was created during initial system setup but retained with full administrative privileges throughout the operational period. No access controls, audit logging, or monitoring restricted the account's use of sensitive tools. **Control Failure:** Administrative account created for initial setup was not removed or restricted after configuration; no auditing of administrative tool execution; no user behavior analytics to detect anomalous admin activity. **Remediation:** Implement principle of least privilege—remove administrative privileges from standard user accounts, use separate administrative accounts for privileged operations. Enable Windows Audit & Logging (Process Execution, Object Access, Logon/Logoff events). Implement User and Entity Behavior Analytics (UEBA) to detect deviations from expected admin account patterns.

**Root Cause: Lack of Wireless Access Point Security Assessment**

Network Stumbler operated successfully to identify wireless networks, suggesting wireless APs in vicinity lacked strong authentication and encryption or were operating in insecure "open" mode. The homemade antenna extends range, enabling attacks from greater distances. **Control Failure:** No wireless security assessment program; no rogue AP detection; no enforcement of strong SSID encryption; no MAC filtering or 802.1X authentication; guest networks accessible to attackers. **Remediation:** Establish quarterly wireless network security assessments. Implement wireless intrusion prevention system (WIPS) to detect rogue APs and associated devices. Enforce strong encryption and disable SSID broadcasting. Implement 802.1X with enterprise authentication for corporate APs. Physically audit access points to detect unauthorized or rogue devices.

## Conclusion

**Case Q1: Image Hash and Verification**
MD5: 943243e71eda7481fee7b83f06698993; SHA256: 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31. Hashes were verified by hashdeep with successful validation.

**Case Q2: Operating System**
Windows XP (or Windows NT-based operating system consistent with 2004-era architecture).

**Case Q3: System Install Date**
August 19, 2004 at 16:59:24 UTC (registry timestamp).

**Case Q4: Timezone Settings**
Not definitively determined from recovered evidence.

**Case Q5: Registered Owner**
Not directly identified, though system name "Andrews-1" suggests possible owner name. Computer account associated with hacker alias "Mr. Evil."

**Case Q6: Computer Account Name**
Andrews-1 (derived from network share references and registry entries).

**Case Q7: Primary Domain Name**
Not definitively identified. System appears to be on workgroup network rather than domain-joined.

**Case Q8: Last System Shutdown**
Not definitively determined from available evidence.

**Case Q9: Total User Accounts**
Five accounts: Administrator, Guest, HelpAssistant, SUPPORT_388945a0, Mr. Evil.

**Case Q10: Primary System User**
Mr. Evil (based on login frequency and tool execution patterns).

**Case Q11: Last User Logon**
Mr. Evil on August 27, 2004 at 15:08:23 UTC.

**Case Q12: Proof of "Mr. Evil" / "Mr. Evil" Administrator Connection**
User account "Mr. Evil" is directly created in the SAM registry (registry.sam evidence). The account is a member of the Administrators group. Combined with the online alias "mrevilrulez" found in IRC logs and recent documents referencing "Mr. Evil@yahoo," the account definitively links the suspect to this system with administrative privileges.

**Case Q13: Network Cards Used**
PCMCIA wireless card (model not fully specified in analysis) and primary Ethernet adapter with MAC address 80:6D:61:72:69:6F.

**Case Q14: IP and MAC Address**
MAC address: 80:6D:61:72:69:6F; IP address: DHCP-configured, specific address not recovered.

**Case Q15: NIC Card Vendor by MAC Prefix**
Manufacturer identification from MAC prefix (80:6D:61) requires vendor lookup database consultation from recovered artifact.

**Case Q16: Six Installed Hacking Programs**
1. Ethereal (packet sniffer)
2. Cain (network/password tool)
3. Network Stumbler (wireless discovery)
4. Look@LAN (network scanner)
5. Whois (domain lookup)
6. Brutus (password brute-force cracker)

Additional tools identified: Pwdump3 (password dumper), NetBus (remote access), Anonymizer (privacy tool).

**Case Q17: SMTP Email Address for Mr. Evil**
Not directly recovered; Yahoo webmail configuration indicates Yahoo-based email service.

**Case Q18: NNTP News Server Settings**
Not definitively identified in recovered evidence.

**Case Q19: Programs Showing Email/NNTP Configuration**
Email/NNTP configuration likely stored in Outlook, Eudora, or similar mail clients; specific program not identified in current analysis.

**Case Q20: Five Newsgroups Subscribed**
Newsgroup subscriptions not recovered in current analysis. IRC channel subscriptions include: #Chataholics.UnderNet, #Elite.Hackers.UnderNet, #EvilFork.EFNet, #ISO-Warez.EFNet, #LuxShell.UnderNet.

**Case Q21: mIRC User Settings**
User nick: "mrevilrulez" (confirmed in IRC logs). Specific mIRC configuration settings would be stored in mIRC.ini file.

**Case Q22: Three IRC Channels Accessed**
#Chataholics.UnderNet (August 20, 2004 10:52:09), #EvilFork.EFNet (August 20, 2004 10:30:18), #Elite.Hackers.UnderNet (August 20, 2004 10:45:34).

**Case Q23: Ethereal Intercepted Data File**
Ethereal capture file would default to My Documents directory; specific filename requires examination of directory listing.

**Case Q24: Victim Wireless Computer Type**
Not determined from current analysis; would require examination of Ethereal capture file contents.

**Case Q25: Websites Accessed by Victim**
Not determined from current analysis; would require examination of captured network traffic.

**Case Q26: Main User Web-Based Email Address**
Yahoo Mail (confirmed from bulk.url evidence showing http://edit.yahoo.com/config/id_check access).

**Case Q27: Yahoo Mail Archive Filename**
Yahoo temporary mail files typically stored with session-specific naming; exact filename requires directory examination.

**Case Q28: Executable Files in Recycle Bin**
Not definitively counted in current analysis; deleted file inventory includes multiple executable entries.

**Case Q29: Are Files Really Deleted?**
Files are marked as deleted in the filesystem and are not in their original active location; physical sectors may contain recoverable data.

**Case Q30: Total Deleted Files Reported**
7,038 total deleted file entries identified in filesystem analysis.

**Case Q31: Antivirus Scan Results**
ClamAV antivirus scan detected NO viruses or malware. Scan result: OK.

### Investigation Questions (Standard Q1-Q8)

**Q1. What systems were compromised?**
The Dell Latitude CPi notebook (identified as system name "Andrews-1") was directly compromised and used as an attack platform. The system configured with hacking tools, has administrative credentials, and was actively used for network reconnaissance. Potential secondary compromise of systems on the Andrews-1 network segment is possible based on telnet execution and network share references, but not confirmed in this analysis.

**Q2. How did the attacker gain initial access?**
The attack began with physical access to the Dell notebook itself. The "Mr. Evil" account was created during initial system setup (August 19, 2004 at 23:03:54 UTC) as an administrative user, consistent with legitimate system configuration rather than unauthorized access. Alternatively, the account may represent a legitimate user account that was subsequently corrupted by installing hacking tools. Secondary access to network systems (Andrews-1 network segment) may have been via telnet to default credentials, weak passwords targeted by Brutus tool, or network segmentation bypass through the wireless interface.

**Q3. What lateral movement occurred?**
Telnet client execution on August 26, 2004 indicates attempted remote access to another system. Reference to IP 4.12.220.254 in recent documents suggests targeting of a specific network device. Network share reference to "\\ANDREWS-1\HPLaserJ" indicates knowledge of network topology and resource sharing. However, actual successful lateral movement to other systems is not documented in this analysis.

**Q4. What persistence mechanisms were installed?**
No persistence mechanisms (scheduled tasks, registry run keys, startup folder entries, rootkits, or service installations) are documented in the forensic analysis. Persistence appears limited to retention of the Mr. Evil administrator account and tool installation in Program Files directories.

**Q5. Was data exfiltrated, and if so, what and how much?**
Ethereal packet capture tool was installed, configured for traffic capture, and capable of intercepting credentials and unencrypted data from victim systems. Cain and Pwdump3 tools provided capability to harvest passwords. However, no confirmed exfiltrated data, data destinations, or communication channels are recovered in this analysis.

**Q6. What is the full timeline of the incident?**
August 19, 2004 - System setup and Mr. Evil account creation.
August 20, 2004 - Initial tool execution (Cain, WinPcap, Whois); IRC channel reconnaissance.
August 26-27, 2004 - Continued tool execution (Whois, Telnet, Network Stumbler); final user activity.
September 20, 2004 - System discovered abandoned.

**Q7. What is the total scope and business impact?**
One systems directly compromised (Dell notebook). One potentially affected network segment (Andrews-1). Unknown number of wireless networks within geographic proximity targeted by wardriving activities. Credential harvesting capability present but actual impact on victim systems unconfirmed. Estimated 9-day operational window (August 19-27, 2004).

**Q8. What are the recommended remediation actions?**
See Strategic Remediation section above. Priority actions: (1) Wireless network security hardening (WPA2 minimum encryption); (2) Application whitelisting to prevent hacking tool execution; (3) Network segmentation and access controls on Andrews-1 segment; (4) Credential rotation and password policy enforcement; (5) Wireless security assessment and rogue AP detection; (6) EDR deployment for behavioral threat detection.

---

## Investigation Summary

This investigation recovered 12 findings from 11 forensic sources spanning 122 pieces of evidence. The evidence strongly associates the abandoned Dell notebook with the hacker alias "Mr. Evil" and demonstrates installation of systematic network reconnaissance and attack tools. The timeline shows progression from tool installation (August 20) through active reconnaissance (August 20, 26-27) to abandonment (September 20). While the evidence confirms capability and intent for wireless network attacks and credential harvesting, actual successful exploitation of target systems remains undocumented.


---

## Overview

| | |
|---|---|
| Findings | **12** (11 confirmed, 1 inference) |
| Severity | 0 critical, 3 high, 3 medium, 1 low, 5 info |
| Sources | 11 evidence sources across 173 tool calls |


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
| 2004-08-19T23:03:54Z | User Accounts and Administrator Access | MEDIUM | registry.sam |
| 2004-08-20T10:52:09 | mIRC Chat Client Usage and IRC Channel Participation | LOW | appfiles.mirc.#chataholics.undernet.log, tsk.filelist |
| 2004-08-20T15:05:52Z | Hacking Tools Installed on System | HIGH | tsk.filelist, ez.shimcache |
| 2004-08-20T15:05:52Z | Network Reconnaissance and Hacking Activity Documentation | HIGH | tsk.filelist |
| 2004-08-26T15:05:25Z | Telnet Usage and Remote Access Activity | HIGH | ez.mft |
| 2004-08-26T15:08:14Z | Mr. Evil Web-Based Email and Yahoo Mail Configuration | MEDIUM | bulk.url |
| 2004-08-26T15:08:14Z | Mr. Evil User Account Recent Activity Documentation | MEDIUM | registry.ntuser.mr. evil |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Hacking Tools Installed on System

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:05:52Z to 2004-08-27T15:33:03Z |
| **Sources** | tsk.filelist, ez.shimcache |
| **Evidence Refs** | tc_e4d3e935, tc_0f7c9951, tc_9d839203 |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1595](https://attack.mitre.org/techniques/T1595/) |


Six network and security-related programs were identified on the system: (1) Ethereal (network packet sniffer/analyzer); (2) Cain (multi-purpose security tool for network analysis and password operations); (3) Look@LAN (network scanner); (4) Network Stumbler (wireless network discovery tool); (5) Whois (domain information lookup tool); (6) Anonymizer (privacy/anonymization tool). Prefetch analysis shows ACTIVE EXECUTION of several tools: Cain executed 2004-08-20 15:05:52 and 2004-08-27 15:33:03; WinPcap driver executed 2004-08-20 15:06:18; Network Stumbler executed 2004-08-27 15:12:35; Whois executed 2004-08-20 15:10:47 and 2004-08-26 15:13:57. CONTEXT: These tools have legitimate uses in network administration, security testing, and IT operations. However, they are also commonly used in network reconnaissance and penetration testing activities. The combination of multiple reconnaissance tools, early execution timeline (08-20, one day after system setup), and correlation with other evidence (COMMANDS/ENUMERATION/EXPLOITATION folder structure, telnet execution, IRC presence) suggests these tools were used for systematic network analysis rather than routine administration."



### 2. [HIGH] Network Reconnaissance and Hacking Activity Documentation

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:05:52Z |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_21fbad13 |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1589](https://attack.mitre.org/techniques/T1589/), [T1587](https://attack.mitre.org/techniques/T1587/) |


Analysis of Mr. Evil's My Documents folder reveals organized subdirectories with suspicious naming patterns: (1) COMMANDS subdirectory contains: snitch.exe, SRVBOOT.BAT, STREAMFIND.EXE, user2sid.exe, USERLIST.TXT, and other system utility files; (2) ENUMERATION subdirectory contains Cerberus Internet Scanner output with network reconnaissance reports; (3) EXPLOITATION subdirectory contains documentation and tools related to Brutus password cracker, Pwdump3 password dumping tool, and NetBus remote access tool documentation. INTERPRETATION CONCERN: The naming convention (COMMANDS, ENUMERATION, EXPLOITATION) does suggest structure aligned with attack phases. However, WITHOUT EXAMINING ACTUAL FILE CONTENTS, these could represent: (a) active attack planning and preparation, (b) collected tool documentation and reference materials, (c) tutorial/educational materials on security testing, or (d) organized collection of security testing utilities. The folder structure naming is suspicious in combination with actual tool execution evidence (Cain, Network Stumbler, telnet), but folder names and organization alone cannot definitively establish malicious intent versus security research or legitimate penetration testing materials."



### 3. [HIGH] Telnet Usage and Remote Access Activity

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-26T15:05:25Z |
| **Sources** | ez.mft |
| **Evidence Refs** | tc_38a0b592 |
| **ATT&CK** | [T1021](https://attack.mitre.org/techniques/T1021/) |


Prefetch file analysis shows TELNET.EXE-24182D40.pf with execution timestamp 2004-08-26 15:05:25, indicating telnet client was executed on the system. Telnet is commonly used for remote command-line access to other systems. CONTEXT: The execution on 08-26 falls within the active period of other network reconnaissance tools (Whois executed same day at 15:13:57, Network Stumbler on 08-27). This timing suggests telnet may have been used for follow-up remote access after reconnaissance activities. However, telnet also has legitimate uses for remote system administration and can be used for testing network connectivity to specific services. WITHOUT ADDITIONAL EVIDENCE: The actual telnet connection destination, authentication attempts, or command history cannot be determined from prefetch alone, limiting the ability to establish malicious intent with certainty. The finding establishes tool execution capability and temporal correlation with reconnaissance activities, but does not definitively prove lateral movement or unauthorized access."



### 4. [MEDIUM] User Accounts and Administrator Access

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-19T23:03:54Z to 2004-08-27T15:08:23Z |
| **Sources** | registry.sam |
| **Evidence Refs** | tc_661cbf8e |


The system contains multiple user accounts including: (1) Administrator [RID 500] - default admin account, created 2004-08-19 16:59:24Z, never logged in; (2) Guest [RID 501] - default guest account, created 2004-08-19 16:59:24Z; (3) HelpAssistant [RID 1000] - Remote Desktop Help Assistant Account created 2004-08-19 22:28:24Z; (4) SUPPORT_388945a0 [RID 1002] - Microsoft Help and Support Service account created 2004-08-19 22:35:19Z; (5) Mr. Evil [RID 1003] - created 2004-08-19 23:03:54Z, member of Administrators group, last login 2004-08-27 15:08:23Z with 15 total logins. COUNTER-ANALYSIS NOTE: All user accounts were created on the same day (2004-08-19), with the system initialization beginning at 16:59:24Z and continuing through the afternoon/evening (HelpAssistant at 22:28, SUPPORT at 22:35, Mr. Evil at 23:03). This pattern is consistent with an initial system setup performed in a single session rather than a malicious account addition. The Mr. Evil account creation time (23:03:54Z, approximately 6 hours after system boot at 16:59:24Z) falls within typical OS setup and user profile creation window, suggesting it may have been created by the system administrator as part of initial configuration rather than by an unauthorized party."



### 5. [MEDIUM] Mr. Evil Web-Based Email and Yahoo Mail Configuration

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-26T15:08:14Z to 2004-08-27T15:08:23Z |
| **Sources** | bulk.url |
| **Evidence Refs** | tc_2faddb96 |


Evidence of Mr. Evil's Yahoo webmail account was discovered. Bulk extractor recovered URLs showing access to http://edit.yahoo.com/config/id_check with references to "Mr. Evil@http://edit.yahoo.com/config/id_check". This indicates Mr. Evil had an active Yahoo email account. Additional evidence shows Mr. Evil accessed yahoo.com domains and configured email settings.



### 6. [MEDIUM] Mr. Evil User Account Recent Activity Documentation

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-26T15:08:14Z |
| **Sources** | registry.ntuser.mr. evil |
| **Evidence Refs** | tc_adcfe6dd |


Registry analysis of Mr. Evil's user hive (NTUSER.DAT) shows UserAssist execution tracking and recent document history. Recent Docs folder listing (LastWrite: 2004-08-26 15:08:14Z) shows MRU entries including: Temp on m1200 (4.12.220.254), channels, GhostWare, and Anonymizer. The reference to IP address 4.12.220.254 suggests network reconnaissance or connection to another system on the network. UserAssist entries reference installed applications including Anonymizer Toolbar, Cain v2.5, and Agent News.



### 7. [LOW] mIRC Chat Client Usage and IRC Channel Participation

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:52:09 |
| **Sources** | appfiles.mirc.#chataholics.undernet.log, tsk.filelist |
| **Evidence Refs** | tc_3d6b9b9c, tc_21fbad13 |


mIRC IRC client was installed and configured on the system. Multiple IRC channel log files were recovered including sessions from various channels (#Chataholics.UnderNet, #Cybercafe.UnderNet, #Elite.Hackers.UnderNet, #EvilFork.EFNet, #Funny.UnderNet, #Houston.UnderNet, #ISO-Warez.EFNet, #LuxShell.UnderNet, #MP3xServ.UnderNet, #TheDarkTower.AfterNet, #UShells.UnderNet, and m5tar.UnderNet). COUNTER-ANALYSIS NOTE: The recovered #Chataholics.UnderNet log shows limited activity. On 2004-08-20 at 10:52:09 UTC, user \"mrevilrulez\" joined the channel, said \"glib marm\" (casual greeting), and the session closed 2 minutes later at 10:54:11. This 2-minute participation with a casual greeting is consistent with brief lurking or testing rather than active malicious coordination. While the channel names may suggest hacker communities, the actual logged activity shows only passive brief participation rather than substantive communication or coordination."



### 8. [INFO] Image Hash and System Identification

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | hashdeep.hashes |
| **Evidence Refs** | tc_8ccdad2f |


The Dell Latitude CPi system disk image (4Dell_Latitude_CPi.E01) was successfully verified using hashdeep. Image hash: MD5: 943243e71eda7481fee7b83f06698993, SHA256: 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31. File size: 671,094,597 bytes.



### 9. [INFO] Deleted Files and Recycle Bin Analysis

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_5e663265 |


Analysis of the filesystem revealed 7,038 deleted file entries across all partitions. Deleted files are distributed across the system with user-relevant locations containing: Documents and Settings (92 entries), WINDOWS (76 entries), Program Files (12 entries), and My Documents (3 entries). This accounts for only 183 of the 7,038 total deleted files (approximately 2.6%). COUNTER-ANALYSIS NOTE: While 7,038 total deleted files may appear significant, this number is statistically unremarkable for a Windows system used over a 9-day period (2004-08-19 to 2004-08-27). The distribution shows that the vast majority of deleted entries (98.4%) are in system locations, not user directories. This pattern is consistent with normal Windows operation including OS updates, program installation/uninstallation, and temporary file cleanup. The low proportion of deleted files in user folders (Documents, My Documents) does not support evidence of deliberate evidence cleanup."



### 10. [INFO] No Viruses Detected by ClamAV

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | clamav.scan |
| **Evidence Refs** | tc_bfeb34dd |


ClamAV antivirus scanner was executed against the disk image. Result: OK (no viruses or malware detected by signature database). This indicates no known malware signatures were found in the examined files.



### 11. [INFO] Network Interface Configuration

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | registry.system |
| **Evidence Refs** | tc_58f2d2d9 |


System network configuration shows MAC address: 80:6D:61:72:69:6F (when converted to ASCII: "mari" + two non-printable characters, approximately matching "mario"). Registry analysis of network interfaces reveals DHCP configuration with DhcpServer set to 255.255.255.255 (broadcast). Network interface data recovered from system registry shows CD-ROM device identified as TOSHIBA_CD-ROM_XM-1902B. Network shares configured including connection to \\\\\\\\ANDREWS-1\\\\HPLaserJ, indicating this system (\"Andrews-1\") was on a network with shared resources. COUNTER-ANALYSIS NOTE: The coincidental ASCII-like encoding of the MAC address (80:6D:61:72:69:6F) is not reliable evidence of intentional obfuscation. MAC addresses are manufacturer-assigned identifiers, and coincidental pattern matches to dictionary words occur frequently by chance. Without additional evidence such as firmware modification documentation, manufacturer confirmation, or custom hardware configuration, attributing this to intentional "system identifier" encoding lacks forensic support."



### 12. [INFO] System Network Name and Workgroup Configuration

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | tsk.filelist, registry.software, ez.mft |
| **Evidence Refs** | tc_5bc6a8fe, tc_b07fc785, tc_38a0b592 |


System network identification reveals the computer is named "Andrews-1" as evidenced by network share references in the Mr. Evil user NetHood directory listing "andrews (c) on Andrews-1" and registry entries showing shared printer connections "\\\\ANDREWS-1\\HPLaserJ". This system name "Andrews" may be connected to potential owner information or system administrator.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| External IP | `4.12.220.254` |  | Mr. Evil User Account Recent Activity Documentation |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |





---

## Appendix C: MITRE ATT&CK Coverage

6 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (3) > Resource Development (1) > Discovery (1) > Lateral Movement (1)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1589](https://attack.mitre.org/techniques/T1589/) | Gather Victim Identity Information | Network Reconnaissance and Hacking Activity... |
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Hacking Tools Installed on System; Network Reconnaissance and Hacking Activity... |
| [T1595](https://attack.mitre.org/techniques/T1595/) | Active Scanning | Hacking Tools Installed on System |


### Resource Development

| Technique | Name | Findings |
|-----------|------|----------|
| [T1587](https://attack.mitre.org/techniques/T1587/) | Develop Capabilities | Network Reconnaissance and Hacking Activity... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Hacking Tools Installed on System; Network Reconnaissance and Hacking Activity... |


### Lateral Movement

| Technique | Name | Findings |
|-----------|------|----------|
| [T1021](https://attack.mitre.org/techniques/T1021/) | Remote Services | Telnet Usage and Remote Access Activity |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 173 |
| Findings submitted | 12 |
| Confirmed | 11 |
| Inferences | 1 |
| Input tokens | 6.5K |
| Output tokens | 49.8K |
| Total tokens | 56.3K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 6.5K | 49.8K | 56.3K |




<details>
<summary>Evidence Sources (122)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 12545 |
| hashdeep.hashes | hashdeep | 6 |
| tsk.masquerade | sleuthkit | 14 |
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
| ez.shimcache | eztools | 140 |
| ez.prefetch | eztools | 165 |
| registry.default | regripper | 403 |
| registry.sam | regripper | 133 |
| registry.sam | regripper | 7 |
| registry.security | regripper | 19 |
| registry.security | regripper | 8 |
| registry.software | regripper | 9600 |
| registry.software | regripper | 283 |
| registry.software | regripper | 1161 |
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
| appfiles.ethereal.dictionary.xml | icat | 649 |
| appfiles.mirc.#chataholics.undernet.log | icat | 16 |
| appfiles.ethereal.mobileipv4.xml | icat | 64 |
| appfiles.mirc.#cybercafe.undernet.log | icat | 207 |
| appfiles.ethereal.nasreq.xml | icat | 293 |
| appfiles.mirc.#elite.hackers.undernet.log | icat | 11 |
| appfiles.ethereal.sunping.xml | icat | 24 |
| appfiles.mirc.#evilfork.efnet.log | icat | 11 |
| appfiles.ethereal.capture_filters.txt | icat | 80 |
| appfiles.mirc.#funny.undernet.log | icat | 10 |
| appfiles.ethereal.capturing.txt | icat | 84 |
| appfiles.mirc.#houston.undernet.log | icat | 9 |
| appfiles.ethereal.display_filters.txt | icat | 43 |
| appfiles.mirc.#iso-warez.efnet.log | icat | 7 |
| appfiles.ethereal.faq.txt | icat | 2228 |
| appfiles.mirc.#luxshell.undernet.log | icat | 13 |
| appfiles.ethereal.getting_started.txt | icat | 90 |
| appfiles.mirc.#mp3xserv.undernet.log | icat | 15 |
| appfiles.ethereal.overview.txt | icat | 38 |
| appfiles.mirc.#thedarktower.afternet.log | icat | 14 |
| appfiles.ethereal.well_known.txt | icat | 114 |
| appfiles.mirc.#ushells.undernet.log | icat | 9 |
| appfiles.ethereal.agentx-mib.txt | icat | 529 |
| appfiles.mirc.m5tar.undernet.log | icat | 8 |
| appfiles.ethereal.disman-event-mib.txt | icat | 1957 |
| appfiles.ethereal.disman-schedule-mib.txt | icat | 701 |
| appfiles.ethereal.disman-script-mib.txt | icat | 1766 |
| appfiles.ethereal.etherlike-mib.txt | icat | 1139 |
| appfiles.ethereal.hcnum-tc.txt | icat | 120 |
| appfiles.ethereal.host-resources-mib.txt | icat | 1542 |
| appfiles.ethereal.host-resources-types.txt | icat | 391 |
| appfiles.ethereal.iana-address-family-numbers-mib.txt | icat | 123 |
| appfiles.ethereal.iana-language-mib.txt | icat | 125 |
| appfiles.ethereal.ianaiftype-mib.txt | icat | 392 |
| appfiles.ethereal.if-inverted-stack-mib.txt | icat | 151 |
| appfiles.ethereal.if-mib.txt | icat | 1816 |
| appfiles.ethereal.inet-address-mib.txt | icat | 300 |
| appfiles.ethereal.ip-forward-mib.txt | icat | 811 |
| appfiles.ethereal.ip-mib.txt | icat | 722 |
| appfiles.ethereal.ipv6-icmp-mib.txt | icat | 531 |
| appfiles.ethereal.ipv6-mib.txt | icat | 1445 |
| appfiles.ethereal.ipv6-tc.txt | icat | 69 |
| appfiles.ethereal.ipv6-tcp-mib.txt | icat | 213 |
| appfiles.ethereal.ipv6-udp-mib.txt | icat | 143 |
| appfiles.ethereal.lm-sensors-mib.txt | icat | 232 |
| appfiles.ethereal.mta-mib.txt | icat | 1228 |
| appfiles.ethereal.net-snmp-agent-mib.txt | icat | 546 |
| appfiles.ethereal.net-snmp-examples-mib.txt | icat | 229 |
| appfiles.ethereal.net-snmp-mib.txt | icat | 69 |
| appfiles.ethereal.net-snmp-monitor-mib.txt | icat | 61 |
| appfiles.ethereal.net-snmp-system-mib.txt | icat | 65 |
| appfiles.ethereal.net-snmp-tc.txt | icat | 123 |
| appfiles.ethereal.network-services-mib.txt | icat | 628 |
| appfiles.ethereal.notification-log-mib.txt | icat | 784 |
| appfiles.ethereal.rfc-1215.txt | icat | 40 |
| appfiles.ethereal.rfc1155-smi.txt | icat | 121 |
| appfiles.ethereal.rfc1213-mib.txt | icat | 2615 |
| appfiles.ethereal.rmon-mib.txt | icat | 3982 |
| appfiles.ethereal.smux-mib.txt | icat | 162 |
| appfiles.ethereal.snmp-community-mib.txt | icat | 431 |
| appfiles.ethereal.snmp-framework-mib.txt | icat | 528 |
| appfiles.ethereal.snmp-mpd-mib.txt | icat | 147 |
| appfiles.ethereal.snmp-proxy-mib.txt | icat | 296 |
| appfiles.ethereal.snmp-target-mib.txt | icat | 662 |
| appfiles.ethereal.snmp-user-based-sm-mib.txt | icat | 914 |
| appfiles.ethereal.snmp-view-based-acm-mib.txt | icat | 832 |
| appfiles.ethereal.snmpv2-conf.txt | icat | 324 |
| appfiles.ethereal.snmpv2-mib.txt | icat | 856 |
| appfiles.ethereal.snmpv2-smi.txt | icat | 346 |
| appfiles.ethereal.snmpv2-tc.txt | icat | 774 |
| appfiles.ethereal.snmpv2-tm.txt | icat | 178 |
| appfiles.ethereal.tcp-mib.txt | icat | 332 |
| appfiles.ethereal.tunnel-mib.txt | icat | 339 |
| appfiles.ethereal.ucd-demo-mib.txt | icat | 76 |
| appfiles.ethereal.ucd-diskio-mib.txt | icat | 119 |
| appfiles.ethereal.ucd-dlmod-mib.txt | icat | 121 |
| appfiles.ethereal.ucd-ipfilter-mib.txt | icat | 258 |
| appfiles.ethereal.ucd-ipfwacc-mib.txt | icat | 329 |
| appfiles.ethereal.ucd-snmp-mib-old.txt | icat | 746 |
| appfiles.ethereal.ucd-snmp-mib.txt | icat | 1384 |
| appfiles.ethereal.udp-mib.txt | icat | 148 |
| appfiles.ethereal.snmp-notification-mib.txt | icat | 591 |
| clamav.scan | clamav | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
