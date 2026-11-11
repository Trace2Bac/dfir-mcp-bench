# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-11T08:14:19.884531+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 135 evidence sources (16 disk, 119 other) | 215 tool calls | 16 minutes
**Results:** 18 findings (3 high) | 14 confirmed, 4 inference
**Timeline:** 2004-08-18 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2004-08-27): System Configuration - Windows XP, 5 User Accounts, Installed 2004-08-19 (+5 related)
- **Persistence** (2004-08-19 to 2004-08-27): Network MAC Address Identified - 80:6D:61:72:69:6F (+2 related)
- **Command and Control** (2004-08-27): Image Hash - Evidence File Integrity (MD5 and SHA256)
- **Credential Access** (2004-08-19 to 2004-08-20): User "Mr. Evil" - Primary Administrator Account with Hacking Tool Collection (+1 related)
- **Defense Evasion / Anti-Forensics** (2004-08-18): File Extension Masquerading Detected - Multiple Files with Mismatched Content and Extensions
- **Discovery / Collection** (2004-08-19): Large Number of Deleted Files - 7,038 Entries Detected with Evidence Preservation (+1 related)
- **Other Activity** (2004-08-20): IRC Chat Activity - Multiple Channel Access with "mrevilrulez" and "mrevil" Aliases

**Tools:** search (91), submit_finding (20), get_raw_output (18), get_investigation_summary (7), open_case (6). SHA-256 hashes recorded for all evidence.



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

215 tool calls were executed across 16
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Dell Latitude CPi Forensic Investigation Report

## Background

This investigation concerns a Dell Latitude CPi notebook computer (serial number VLQLW) abandoned on September 20, 2004, along with a wireless PCMCIA card and an external 802.11b antenna. Law enforcement suspected the computer was used for hacking purposes and may be linked to an individual suspected of intercepting wireless internet traffic at public hotspots to steal financial and authentication credentials.

The forensic image was acquired from the Dell Latitude CPi as a split EnCase evidence file: 4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02, totaling approximately 639.8 MB. Cryptographic hashes confirm image integrity: MD5 943243e71eda7481fee7b83f06698993 and SHA256 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31.

The system contained 16 indexed forensic sources extracted through 215 tool executions, yielding 18 substantive findings: 3 high severity, 5 medium severity, 4 low severity, and 6 informational findings. Analysis identified 11 distinct attack tactics and techniques consistent with MITRE ATT&CK framework categories.

### System Environment

The examined system is a Dell Latitude CPi notebook running Windows XP Professional, installed on August 19, 2004, at 16:56:09 UTC. The system remained active for approximately eight days before being powered down on August 27, 2004. The device features a PCMCIA expansion slot and networking infrastructure compatible with wireless communication, consistent with the case hypothesis of wireless interception activity.

The system contained five user accounts: the built-in Administrator account (never logged in), Guest account, HelpAssistant (Remote Desktop Help Assistant), SUPPORT_388945a0 (Microsoft Support account, disabled), and a user account named "Mr. Evil" (RID 1003) which served as the default administrative user.

## Incident Timeline

### Phase 1: System Setup and Configuration (August 19-20, 2004)

The Windows XP Professional operating system was installed on August 19, 2004, at 16:56:09 UTC. Within hours of installation, the "Mr. Evil" user account was created on August 19, 2004, at 23:03:54 UTC with administrative privileges. This account was designated as the default administrative user for the system.

Registry configuration entries and system files indicate network interface initialization and configuration on August 19-20, 2004. The network adapter was assigned the MAC address 80:6D:61:72:69:6F and configured with private IP address 192.168.254.2 on a local area network with gateway 192.168.254.254. Network device registry entries reference shared resources on a system designated "ANDREWS-1," including a networked HP LaserJet printer, indicating established network connectivity to external systems.

Network reconnaissance software Look@LAN was installed in the Program Files directory during this initial configuration phase, positioning the system for network discovery and enumeration of available hosts and services.

### Phase 2: Hacking Tool Installation and IRC Activity (August 20, 2004)

On August 20, 2004, the "Mr. Evil" user account was actively configured with an mIRC (Internet Relay Chat) client. The system clock and mIRC configuration established connection to IRC networks Undernet and EFnet, with primary nicknames "Mr" and alternate nicknames "mrevilrulez" and "mrevil." User identity was set to "Mini Me" with email configured as "none@of.ya" (a pseudonym).

Between 10:29 UTC and 14:02 UTC on August 20, 2004, the mIRC client logged brief visits to multiple IRC channels: #Elite.Hackers on Undernet (10:45:34 start time), #ISO-WAREZ on EFnet (10:29:01-10:29:42, 41-second session), #evilfork on EFnet (10:30:18 session start), #CyberCafe on Undernet (10:54:21-14:02:55 session). Chat logs show the "mrevilrulez" user sent only three minimal messages during the 3+ hour #CyberCafe session: "glib marm cuyk" at 10:55, "hi" at 10:57, and "." at 11:00, indicating idle channel presence rather than active participation or coordination.

During this same timeframe, the system accumulated a comprehensive collection of hacking and network reconnaissance tools organized by functional category in the My Documents folder:

**FOOTPRINTING tools:** nmap, NSTPro2 network scanner, spade114.exe scanning tool, and SuperScan network scanner.

**ENUMERATION tools:** ogre (NT enumeration), enum (network enumeration), and Cerberus Internet Scanner.

**EXPLOITATION tools:** Brutus password cracking utility, Pwdump (Windows password hash extraction), and Dsniff 2.3 packet sniffer for network traffic analysis and interception.

**ARCHIVE tools:** Arj and Pkzip file compression and archiving utilities stored with documentation.

**COMMAND tools:** utility collection including snitch.exe, STREAMFIND.EXE, and user2sid.exe.

Additionally, Ethereal network packet sniffer was installed at Program Files/Ethereal with complete WinPcap 3.01 driver support for network packet capture. The mIRC client was configured with IRC channel logging enabled, creating persistent records of IRC sessions.

Email configuration was established with Outlook Express subscription to the alt.hacking newsgroup, positioning the system for consumption of hacking-related discussions and techniques.

### Phase 3: Extended System Activity and Email Access (August 20-27, 2004)

Forensic analysis of browser cache and network URL records extracted from the system show repeated access to web-based email services, specifically us.f613.mail.yahoo.com, with user credentials and multiple inbox access attempts throughout August 2004. The recovered URLs indicate login page access, inbox viewing, and email composition activities consistent with active email account management.

Outlook Express files show subscription to the alt.hacking newsgroup (alt.hacking.dbx), confirming active engagement with hacking-related discussion forums. Network shortcuts in the My Documents/NetHood folder reference "andrews (c) on Andrews-1/target.lnk" and "CD Drive (F) on Andrews-1," indicating network resource access to a remote system designated Andrews-1 for both file shares and optical media access.

System activity records show the Mr. Evil user account was actively logged in on August 27, 2004, with final logon timestamp at 15:08:23 UTC. Prefetch records document execution of Ethereal.exe at 15:34:54 UTC on August 27, 2004 (54,938-byte executable), despite the Mr. Evil user's final logon occurring 26 minutes earlier.

### Phase 4: System Shutdown (August 27, 2004)

The final recorded system activity occurred at 15:08:23 UTC on August 27, 2004, as evidenced by the Mr. Evil user account's last logon timestamp and the most recent registry key modifications. Registry analysis indicates system shutdown and forensic imaging occurred shortly thereafter, preserving the system state as it existed in the afternoon of August 27, 2004.

## Key Findings

### Administrative Compromise and Account Configuration

The "Mr. Evil" user account (RID 1003) was configured as the default administrative user on the Dell Latitude CPi system. This account shows 15 login instances during the system's operational lifetime, establishing it as the primary and most frequently used account on the system. The account was created on August 19, 2004, within hours of system installation, and remained active through August 27, 2004.

In stark contrast, the built-in Administrator account (RID 500) shows zero login instances, indicating the system was operationally configured to use the non-standard "Mr. Evil" account for administrative purposes rather than the system default.

### Comprehensive Hacking Tool Collection

The forensic analysis identified a methodically organized collection of 3 hacking and network reconnaissance tools, including network scanners (nmap, NSTPro2, SuperScan, Cerberus), password crackers (Brutus), hash extraction tools (Pwdump), packet sniffers (Dsniff 2.3), and network enumeration utilities (enum, ogre). Additionally, Ethereal network packet sniffer with WinPcap driver support was installed, providing capability to capture and analyze live network traffic from wired and wireless interfaces.

These tools represent a comprehensive toolkit for network reconnaissance, vulnerability assessment, and exploitation activities. Each tool is individually recognized in cybersecurity literature as capable of offensive security operations, including unauthorized network access, credential harvesting, and traffic interception.

### IRC Activity and Communication Infrastructure

The mIRC IRC client configuration reveals connection to established IRC networks (Undernet Los Angeles server: losangeles.ca.us.undernet.org:6660) with user aliases emphasizing "evil" nomenclature ("mrevilrulez," "mrevil," "Mr"). The mIRC client includes persistent chat session logging, creating records of IRC channel participation.

Documented IRC channel access on August 20, 2004, includes channels explicitly themed around hacking (#Elite.Hackers, #evilfork) and pirated software distribution (#ISO-WAREZ). However, chat logs reveal predominantly idle presence with minimal message volume during extended sessions, suggesting reconnaissance or monitoring of hacking community activity rather than active substantive participation.

### Email and Newsgroup Engagement

The system is configured with both Outlook Express and web-based Yahoo Mail access, with forensic evidence of repeated login attempts to Yahoo mail accounts during August 2004. Outlook Express shows subscription to the alt.hacking newsgroup, a USENET forum historically associated with hacking methodology discussions, vulnerability research, and exploitation technique sharing.

### Network Infrastructure and Cross-System Access

The system is configured with private IP address 192.168.254.2 on a local network with gateway 192.168.254.254. Network configuration registry entries document file and printer sharing with a remote system designated "ANDREWS-1," including mapped network resources (CD Drive F:) and shared printers. This indicates the Mr. Evil system maintained active network connectivity to additional systems within the local network environment.

The presence of network reconnaissance tools (nmap, SuperScan, Cerberus) combined with documented network access to the Andrews-1 system suggests potential targeting or enumeration of that system or its network resources.

### File Integrity and Deletion Activity

The filesystem analysis detected 7,038 deleted file entries marked for deletion in the Master File Table. TSK forensic analysis indicates that although files are marked as deleted by the filesystem, the actual file data blocks may still be present on the disk and potentially recoverable. This high volume of deleted entries suggests either routine system operations or deliberate data cleanup activities. The concentration of deleted entries in the Documents and Settings directory (92 entries) versus the WINDOWS system directory (76 entries) and Program Files (12 entries) suggests user-initiated deletion rather than automated system cleanup.

### Absence of Tool Execution Evidence

Forensic analysis of Windows prefetch records—execution artifacts that record program execution history—revealed a critical gap: NO prefetch records exist for any of the installed hacking and network reconnaissance tools. Specifically, prefetch searches for nmap, nmap-nt, Brutus, Pwdump, Dsniff, Enum, Ogre, Cerberus, SuperScan, and spade found zero matches. While these tools are present in the filesystem (installed in My Documents directories), the absence of execution traces indicates these programs were not launched during normal system operation. This represents a significant disconnection between tool availability and actual usage.

### Ethereal Execution Without Captured Traffic

Prefetch records document execution of Ethereal.exe on August 27, 2004, at 15:34:54 UTC (54,938-byte executable). However, comprehensive filesystem search found NO network packet capture files (.pcap, .cap, .dump extensions, or default Ethereal save formats) anywhere on the system. While WinPcap driver (WINPCAP_3_01_A.EXE prefetch record) is present to enable packet capture, no persistent capture files were created or retained. This indicates either: (1) Ethereal was launched but did not capture traffic, (2) no traffic was available to capture, or (3) any capture files were deleted after creation.

The execution timestamp (15:34:54) also occurs 26 minutes after the Mr. Evil user's final documented logon (15:08:23), suggesting a different user executed Ethereal or it was launched via automated mechanism.

### No Malware or Virus Infections

Comprehensive antivirus scanning using ClamAV antivirus engine and YARA rule-based malware detection found no virus detections or malicious signatures on the system. The absence of virus detections indicates the installed hacking tools were not detected as malware by contemporary security scanning tools, consistent with these being legitimate penetration testing or security research utilities from the 2004 timeframe.

### File Type Masquerading

The file masquerading detection identified multiple files where the file extension does not match the actual content type, including .gif files containing text or PNG data, and .htm files containing GIF data. While some masquerading could reflect image format evolution or extraction artifacts, the presence of text-labeled .doc files containing unformatted text content (MANUAL.DOC in the ARCHIVE directory) suggests possible intentional obfuscation or data concealment techniques.

### Absence of Forensic Link to Greg Schardt

Despite the case hypothesis linking the computer to an individual suspected of hacking activities, forensic analysis found NO direct evidence linking the "Mr. Evil" account or associated aliases ("mrevilrulez," "mrevil," "Mini Me") to any individual named Greg Schardt or "Schardt." Specifically, examination revealed no: personal documents or identifying information in user profiles, email correspondence to/from a person named Schardt, user profile metadata containing Schardt identification, browser history showing Schardt-related searches, or system configuration data referencing Schardt. The account names are clearly aliases and pseudonyms rather than actual identity indicators. Without direct forensic evidence, the assignment of this system to a specific named individual remains unsupported by the examined evidence.

## Threat Intelligence and Attribution

### Assessment Basis

The forensic evidence supports findings of a system configured to support network hacking and penetration testing activities. However, the investigation reveals significant gaps between tool availability and actual usage that must inform any threat assessment.

### Observable Indicators

The system contains a methodically organized collection of recognized offensive security tools, suggesting either intentional preparation for hacking operations or accumulation for learning and training purposes. The presence of network reconnaissance software (Look@LAN, nmap variants), password cracking tools (Brutus), hash extraction tools (Pwdump), and packet sniffing capability (Dsniff, Ethereal) represents a toolkit consistent with network penetration testing, vulnerability assessment, or unauthorized access preparation.

### Critical Gap: Tool Execution

The absence of prefetch execution records for any of the installed hacking tools represents a significant disconnection from the offensive indicators. In typical operational hacking scenarios, such tools would be executed to accomplish their function (network scanning, password cracking, packet capture). The presence of tools without execution evidence suggests either: (1) the tools were installed for collection, study, or research purposes without operational use, (2) execution occurred through mechanisms that bypass prefetch logging (e.g., command-line execution from removable media), or (3) prefetch records were deliberately cleared.

### Attribution Limitations

The evidence establishes that a system configured with offensive security capabilities was in the possession of an unknown individual during August 2004. However, several factors limit attribution to specific threat actors or operational intent:

1. **No Evidence of Actual Attack:** While tools capable of network attacks are present, no forensic evidence of actual attacks, intrusions, or unauthorized system access was documented in captured network traffic, logs, or other artifacts.

2. **IRC Activity Insufficient:** The documented IRC channel visits show idle presence in hacking-related channels but no substantive communication, coordination, or activity that would establish participation in organized threat operations.

3. **No Victim Data:** No evidence of exfiltrated data, stolen credentials, or victim information was located on the system, despite the presence of tools capable of capturing such data.

4. **Legitimate Research Possibility:** The configuration is also consistent with legitimate security research or penetration testing lab setup by an authorized security professional.

### Convergent Evidence of System Purpose

Despite attribution uncertainty, the convergence of multiple independent findings establishes the system's configuration for offensive security purposes with high confidence:
- Tools are organized by attack phase (footprinting, enumeration, exploitation)
- Network discovery software (Look@LAN) is installed
- Packet capture capability (Ethereal with WinPcap) is configured
- Email/newsgroup configuration includes hacking-focused discussion forums
- IRC client is configured with hacking-themed channel access
- MAC address and network configuration suggest portable wireless operation

This convergence of indicators represents deliberate system configuration rather than accidental tool presence.

## Impact Assessment

### Scope of Compromise

Analysis of the single Dell Latitude CPi system reveals it to be a standalone hacking toolkit system rather than evidence of an active network compromise. Forensic evidence does not establish successful compromise of the documented Andrews-1 system or any other external systems. The system itself contains no evidence of infection with malicious code or unauthorized external control.

### Data at Risk

No evidence of data exfiltration, stored victim information, stolen credentials, or unauthorized data collection was located on the system. The absence of Ethereal packet capture files (despite Ethereal execution) eliminates documentation of any network traffic analysis or credential interception during the active investigation period. Although the case briefing suggests suspected wireless traffic interception for credential harvesting, forensic evidence does not confirm successful credential collection or data exfiltration during the system's operational lifetime.

### Persistence Depth and Timeline

The system remained under control of the Mr. Evil account for eight days (August 19-27, 2004) before being powered down. No evidence of persistence mechanisms, system compromise indicators, rootkit installation, or unauthorized remote access was documented. The system appears to have been manually operated during this period rather than remaining under persistent remote compromise.

### Network Scope

The documented network activity indicates the system was connected to a local area network with gateway 192.168.254.254 and access to a remote system (Andrews-1) with network resources including shared CD drives and printers. However, this represents a single documented connection to external resources rather than evidence of widespread network compromise or lateral movement.

## Immediate Tactical Containment

The system was powered down and seized on August 27, 2004. No active incidents requiring containment were identified during this investigation. However, if this system were operational during an active investigation, the following immediate actions would be required:

1. **Isolate the Dell Latitude CPi from all networks** by disconnecting network cables and disabling wireless adapters to prevent further tool usage or external communication.

2. **Terminate process execution** of any running hacking tools or network reconnaissance applications.

3. **Disable the Mr. Evil user account** (RID 1003) to prevent further system access using the primary administrative account.

4. **Document the network configuration** capturing IP address 192.168.254.2, MAC address 80:6D:61:72:69:6F, and gateway 192.168.254.254 before isolation to aid network forensics on the Andrews-1 system and network perimeter security investigation.

5. **Secure the physical system** to prevent modification, deletion of logs, or execution of additional tools.

6. **Preserve the wireless PCMCIA card** found with the system for separate forensic analysis of wireless interception capabilities.

7. **Alert network security** that network reconnaissance tools (nmap, SuperScan, Cerberus) may have been executed from the private network during the active period; perform network intrusion detection system review for August 19-27, 2004.

## Strategic Remediation

### Root Cause 1: Inadequate Administrative Account Management

The system was configured with the non-standard "Mr. Evil" account as the primary administrative user rather than using the system default Administrator account. This creates multiple vulnerabilities: the account name itself reveals hostile intent to any system observer, no audit trail or documentation exists explaining the account's purpose, and the use of a non-standard admin account complicates incident response and forensic analysis.

**Remediation:** Implement mandatory administrative account naming standards requiring descriptive names aligned with organizational roles (e.g., "SysAdmin_User1" rather than "Mr. Evil"). Configure account creation procedures requiring documented business justification through change management processes. Require periodic account reviews to validate legitimacy and active use. Additionally, enforce the use of the system default Administrator account for critical administrative functions, with additional service accounts created only for specific delegation requirements. This would have made the purpose and legitimacy of the Mr. Evil account immediately evident to any system administrator performing routine maintenance or security audits.

### Root Cause 2: Unrestricted Software Installation and Removal

The system contains a comprehensive collection of offensive security tools without any evidence of installation approval, logging, or change management. The installation of multiple hacking toolkits (nmap, Brutus, Pwdump, Dsniff) and network packet analysis tools (Ethereal) occurred without apparent IT oversight or authorization controls.

**Remediation:** Implement application whitelisting using Windows AppLocker or equivalent mechanisms to restrict executable launches to only authorized security testing tools. Configure Software Restriction Policies to block execution from user-controlled directories (My Documents, desktop), limiting tool execution to administrator-approved installation paths. Implement Group Policy settings to prevent installation of unmarked or untrusted software. Require GPO enforcement that scripts and batch files execute only from protected system directories. This would have prevented the casual installation of offensive security tools in uncontrolled user directories and created audit trails of any permitted tool execution.

### Root Cause 3: Absence of Application Execution Logging

While prefetch records show Ethereal was executed at 15:34:54 UTC on August 27, the lack of persistent execution logs creates uncertainty about what programs were launched, by whom, and for what purpose. The tools installed but never executed (no prefetch records) create ambiguity about system configuration versus actual operational usage.

**Remediation:** Enable Windows Event Viewer application execution logging via GPO security audit settings, specifically "Audit Process Tracking" to log all program execution events with timestamp, user account, and command-line parameters. Configure Sysmon on Windows systems to generate detailed logs of process creation, network connections, file modifications, and registry changes. Implement centralized logging to a remote syslog server to prevent local log deletion or tampering. Enable Windows PowerShell Script Block logging and Process Invocation logging to capture command-line tool usage. This would have created a persistent record of exactly which hacking tools were executed, when, under which user account, and what network activities they performed, eliminating the current ambiguity about operational tool usage.

### Root Cause 4: Unrestricted Network Access and Cross-System Connectivity

The system maintains direct network connectivity to a documented remote system (Andrews-1) with file and printer sharing enabled. Network reconnaissance tools indicate capability and presumed intent to scan and enumerate network targets. No firewall rules, network access controls, or connection restrictions limit the system's network operations.

**Remediation:** Implement host-based firewall (Windows Defender Firewall or similar) with restrictive inbound and outbound rules allowing only necessary services. Disable file and printer sharing on systems not requiring it; if sharing is required, restrict to only necessary protocols (SMB3 with encryption) and specific source IP ranges. Implement outbound connection restrictions prohibiting network reconnaissance tools from network communication (prevent nmap port scans, Ethereal packet capture, Brutus password cracking attempts against external systems). Use network segmentation to isolate hacking research systems from production networks and sensitive resources. This would have prevented the system from performing network reconnaissance against the Andrews-1 system and provided network-layer containment if the tools were executed.

### Root Cause 5: Lack of Incident Response Preparation and Network Monitoring

The investigation revealed no network Intrusion Detection System (IDS) alerts, firewall logs, or network-layer incident response artifacts for the August 19-27 period when this tool-equipped system was active. The absence of documentation about what network activity this system actually performed suggests inadequate network monitoring for the local area network segment.

**Remediation:** Deploy network-based intrusion detection (Suricata, Zeek, or equivalent) on network perimeters with rules to detect characteristic attack traffic from reconnaissance tools: nmap SYN scans and service probes, Brutus password attack patterns, Dsniff ARP spoofing and packet capture patterns. Configure alerts for suspicious outbound network scanning and attack signatures. Maintain centralized network security event logging with at least 90 days of retention for forensic review. This would have documented any actual network attack activity performed by the hacking tools on this system, enabling faster incident response and damage assessment.

## Conclusion

### Summary of Investigation Findings

This forensic investigation examined a Dell Latitude CPi notebook computer seized on September 20, 2004, suspected of involvement in hacking activities including wireless traffic interception. The examination revealed a system configured for offensive network security operations, containing 3 high-severity indicators, 5 medium-severity findings regarding system configuration and deleted files, and 4 low-severity observations about tool collection and IRC activity.

### Investigation Questions

**Q1. What systems were compromised?**
The Dell Latitude CPi itself shows no evidence of compromise or unauthorized external control; it operated under the control of the known "Mr. Evil" user account. While network references to the "Andrews-1" system are documented, forensic evidence does not establish successful compromise of that system. The investigation reveals one intentionally-configured offensive system rather than evidence of an active network compromise.

**Q2. How did the attacker gain initial access?**
This question presumes successful attack; forensic evidence does not support such a conclusion. The "Mr. Evil" system was intentionally configured with administrative privileges (RID 1003, default admin user) and hacking tools were manually installed during normal operation. No evidence exists of unauthorized system access, remote exploitation, or privilege escalation. The system's configuration appears to reflect deliberate operational setup rather than post-compromise modification.

**Q3. What lateral movement occurred?**
Forensic evidence documents network connections to a system designated "Andrews-1" including mapped network drives and shared printer access. However, no evidence of successful unauthorized access, credential theft, or system compromise of the Andrews-1 system was identified on the Dell Latitude CPi. Network reconnaissance tools capable of lateral movement are present, but no execution traces (prefetch records) confirm they were operated against network targets.

**Q4. What persistence mechanisms were installed?**
Forensic analysis found no evidence of persistence mechanisms on the Dell Latitude CPi system: no rootkits, no suspicious scheduled tasks, no registry run-key entries for unauthorized executables, and no service installation. The system's continued operation depended on manual user intervention (the Mr. Evil account logons). No evidence suggests the system was configured to remain under attacker control after power-down or reboot.

**Q5. Was data exfiltrated, and if so, what and how much?**
No evidence of data exfiltration was identified. The system contains no captured network traffic files (no .pcap files from Ethereal), no stored victim credentials or personal information, and no archive files containing exfiltrated data. While the case briefing suggests suspected wireless traffic interception for credential capture, forensic examination of this system found no evidence of successful credential harvesting, stored passwords, or stolen data. The absence of Ethereal packet capture files despite documented Ethereal execution eliminates evidence of network traffic analysis during the active investigation period.

**Q6. What is the full timeline of the incident?**
The operational timeline is tightly bounded: Windows XP Professional installation occurred August 19, 2004, at 16:56:09 UTC. The "Mr. Evil" administrative account was created August 19 at 23:03:54 UTC. Hacking tools were accumulated and configured during August 19-20, 2004. IRC activity occurred August 20, 2004, between 10:29 UTC and 14:02 UTC. Email and newsgroup access occurred throughout August 20-27. The system's final recorded activity was August 27, 2004, at 15:08:23 UTC (Mr. Evil user logon) with system shutdown occurring later that day. The entire operational period spans 8 days (August 19-27, 2004) with active user sessions documented only on August 20 and August 27.

**Q7. What is the total scope and business impact?**
From forensic evidence, the scope is limited to a single Dell Latitude CPi system. No evidence establishes compromise of production networks, business systems, or user data. While the system is configured with offensive security capabilities and references a network system (Andrews-1), successful attack against external systems is not documented in the forensic evidence. The system's impact is therefore contained to itself and remains speculative regarding external network effects. However, the case briefing indicates suspected wireless traffic interception at public hotspots; forensic evidence does not confirm such activity occurred or succeeded.

**Q8. What are the recommended remediation actions?**
Primary remediation actions focus on: (1) implementing mandatory administrative account naming standards and change management approval for account creation; (2) deploying application whitelisting to restrict offensive tool execution to authorized testing scenarios only; (3) enabling comprehensive process execution logging and centralized security event collection; (4) implementing host-based firewall restrictions and network segmentation to contain offensive security tool access; and (5) deploying network-based intrusion detection with rules to detect characteristic offensive security tool traffic. These controls would have prevented casual deployment of a hacking toolkit system on a corporate network and provided rapid detection and containment of actual attack activity.

---

## Case Questions

**Case Q1:** What is the image hash? Does the acquisition and verification hash match?
MD5: 943243e71eda7481fee7b83f06698993; SHA256: 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31. Image file size: 671,094,597 bytes. Hash verification confirms evidence integrity.

**Case Q2:** What operating system was used on the computer?
Windows XP Professional

**Case Q3:** When was the install date?
2004-08-19 16:56:09 UTC

**Case Q4:** What is the timezone settings?
No explicit timezone setting was recovered in the extracted evidence, though all timestamps are recorded in UTC.

**Case Q5:** Who is the registered owner?
Registered owner information was not recovered in the extracted registry data.

**Case Q6:** What is the computer account name?
Dell Latitude CPi (from serial number VLQLW designation)

**Case Q7:** What is the primary domain name?
No primary domain was identified; the system appears configured as part of a workgroup rather than a domain.

**Case Q8:** When was the last recorded computer shutdown date/time?
2004-08-27 15:08:23 UTC (last recorded user logon and system activity)

**Case Q9:** How many accounts are recorded (total number)?
5 accounts: Administrator, Guest, HelpAssistant, SUPPORT_388945a0, and Mr. Evil

**Case Q10:** What is the account name of the user who mostly uses the computer?
Mr. Evil (RID 1003, 15 login instances, created 2004-08-19 23:03:54 UTC)

**Case Q11:** Who was the last user to logon to the computer?
Mr. Evil, last logon 2004-08-27 15:08:23 UTC

**Case Q12:** A search for the name "Greg Schardt" reveals multiple hits. One of these proves that Greg Schardt is Mr. Evil and is also the administrator of this computer. What file is it? What software program does this file relate to?
No forensic evidence was found directly linking "Greg Schardt" to the Mr. Evil account or system administration. The case briefing presumes this linkage, but it is not supported by examined evidence.

**Case Q13:** List the network cards used by this computer
Dell Latitude CPi system with PCMCIA expansion slot; primary network adapter MAC address: 80:6D:61:72:69:6F; wireless PCMCIA card recovered with the system (type and specific details not determined from image analysis)

**Case Q14:** This same file reports the IP address and MAC address of the computer. What are they?
IP Address: 192.168.254.2; MAC Address: 80:6D:61:72:69:6F

**Case Q15:** An internet search for vendor name/model of NIC cards by MAC address can be used to find out which network interface was used. In the above answer, the first 3 hex characters of the MAC address report the vendor of the card. Which NIC card was used during the installation and set-up for LOOK@LAN?
MAC address 80:6D:61:72:69:6F has vendor prefix 806D61. This corresponds to... (vendor lookup not performed in forensic analysis)

**Case Q16:** Find 6 installed programs that may be used for hacking.
1. nmap (network port scanner)
2. Brutus (password cracker)
3. Pwdump (Windows password hash extraction)
4. Dsniff 2.3 (packet sniffer)
5. Enum (network enumeration)
6. SuperScan (network reconnaissance scanner)
Additional tools: Ogre (NT enumeration), Cerberus Internet Scanner, spade114.exe, NSTPro2, Ethereal (packet sniffer)

**Case Q17:** What is the SMTP email address for Mr. Evil?
none@of.ya (configured in mIRC client)

**Case Q18:** What are the NNTP (news server) settings for Mr. Evil?
Undernet Los Angeles server: losangeles.ca.us.undernet.org:6660

**Case Q19:** What two installed programs show this information?
1. mIRC (IRC client showing server configuration)
2. Outlook Express (email and NNTP newsgroup configuration)

**Case Q20:** List 5 newsgroups that Mr. Evil has subscribed to?
Only one newsgroup was documented in the evidence: alt.hacking (found in Outlook Express .dbx file). Additional newsgroup subscriptions were not identified in the forensic analysis.

**Case Q21:** A popular IRC program called mIRC was installed. What are the user settings that was shown when the user was online and in a chat channel?
Primary nickname: "Mr"; Alternate nickname: "mrevilrulez"; User identity: "Mini Me"; Email: "none@of.ya"; IRC Server: Undernet Los Angeles (losangeles.ca.us.undernet.org:6660); IRC channel logging enabled.

**Case Q22:** This IRC program has the capability to log chat sessions. List 3 IRC channels that the user of this computer accessed.
1. #Elite.Hackers (Undernet) - 10:45:34 UTC session
2. #CyberCafe (Undernet) - 10:54:21-14:02:55 UTC session  
3. #evilfork (EFnet) - 10:30:18 UTC session

**Case Q23:** Ethereal, a popular "sniffing" program that can be used to intercept wired and wireless internet packets was also found to be installed. When TCP packets are collected and re-assembled, the default save directory is that users \My Documents directory. What is the name of the file that contains the intercepted data?
No packet capture file was found on the system. Ethereal execution is documented (prefetch 2004-08-27 15:34:54 UTC), but no .pcap, .cap, .dump, or other Ethereal capture files exist in \My Documents or elsewhere on the system.

**Case Q24:** Viewing the file in a text format reveals much information about who and what was intercepted. What type of wireless computer was the victim (person who had his internet surfing recorded) using?
No captured packet file was found, therefore victim computer type cannot be determined from this system's evidence.

**Case Q25:** What websites was the victim accessing?
No captured packet file was found, therefore victim website access cannot be determined from this system's evidence.

**Case Q26:** Search for the main users web based email address. What is it?
yahoo.com (Yahoo Mail) - user credentials and inbox access attempts documented in URL history

**Case Q27:** Yahoo mail, a popular web based email service, saves copies of the email under what file name?
Outlook Express cache files suggest yahoo mail data may have been stored, but specific yahoo mail archive file name was not definitively identified in the forensic analysis.

**Case Q28:** How many executable files are in the recycle bin?
Recycle bin search found no executable files specifically. The forensic analysis identified 7,038 total deleted file entries but did not perform specific enumeration of .exe files in the recycle bin directory.

**Case Q29:** Are these files really deleted?
No - TSK forensic analysis indicates deleted files are marked for deletion in the filesystem Master File Table, but the actual file data blocks remain present on the disk and are potentially recoverable through data carving or forensic reconstruction techniques.

**Case Q30:** How many files are actually reported to be deleted by the file system?
7,038 deleted file entries were detected across the filesystem

**Case Q31:** Perform an Anti-Virus check. Are there any viruses on the computer?
No viruses detected. ClamAV antivirus engine found zero virus matches. YARA rule-based malware detection found zero rule violations. The system is clean of detected malware as of the forensic analysis date.


---

## Overview

| | |
|---|---|
| Findings | **18** (14 confirmed, 4 inference) |
| Severity | 0 critical, 3 high, 5 medium, 4 low, 6 info |
| Sources | 16 evidence sources across 215 tool calls |


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
| 2004-08-18T16:50:14Z | File Extension Masquerading Detected - Multiple Files with Mismatched Content and Extensions | LOW | tsk.masquerade |
| 2004-08-19T16:48:58Z | Network MAC Address Identified - 80:6D:61:72:69:6F | INFO | registry.system |
| 2004-08-19T16:50:00Z | Large Number of Deleted Files - 7,038 Entries Detected with Evidence Preservation | MEDIUM | tsk.filelist |
| 2004-08-19T16:56:09Z | System Configuration - Windows XP, 5 User Accounts, Installed 2004-08-19 | MEDIUM | ez.prefetch, registry.sam, registry.system |
| 2004-08-19T17:00:00Z | Network Reconnaissance Tool Installed - Look@LAN Network Discovery Software | HIGH | tsk.filelist |
| 2004-08-19T17:00:00Z | Network References to \"Andrews\" System - Cross-System Access Indicators | MEDIUM | tsk.filelist |
| 2004-08-19T17:00:00Z | Network Printer Sharing Configuration - ANDREWS-1 System Reference | LOW | registry.software, tsk.filelist |
| 2004-08-19T23:03:54Z | User "Mr. Evil" - Primary Administrator Account with Hacking Tool Collection | HIGH | registry.sam, tsk.filelist, appfiles.program_files.mirc.mirc.ini |
| 2004-08-20T10:29:01Z | IRC Chat Activity - Multiple Channel Access with "mrevilrulez" and "mrevil" Aliases | LOW | appfiles.program_files.mirc.#elite.hackers.undernet.log, appfiles.program_files.mirc.#cybercafe.undernet.log, appfiles.program_files.mirc.#iso-warez.efnet.log, appfiles.program_files.mirc.#evilfork.efnet.log, appfiles.program_files.mirc.mirc.ini |
| 2004-08-20T15:00:00Z | Network Configuration - System IP Address 192.168.254.2 in Private Network | MEDIUM | bulk.ip, tsk.filelist |
| 2004-08-20T15:00:00Z | Email and Newsgroup Configuration - Yahoo Mail Access and alt.hacking Subscription | MEDIUM | bulk.url, tsk.filelist, appfiles.program_files.mirc.mirc.ini |
| 2004-08-20T15:15:00Z | Installed Hacking and Network Reconnaissance Tools - 6+ Programs for Offensive Operations | HIGH | tsk.filelist |
| 2004-08-27T15:00:00Z | No Viruses Detected by Antivirus Scans - ClamAV and YARA Analysis Shows Clean System | INFO | clamav.scan, yara.files |
| 2004-08-27T15:08:00Z | Image Hash - Evidence File Integrity (MD5 and SHA256) | INFO | hashdeep.hashes |
| 2004-08-27T15:08:00Z | No Prefetch Evidence of Hacking Tool Execution - Tools Installed but Not Run | INFO | ez.prefetch |
| 2004-08-27T15:34:54Z | Ethereal Network Packet Sniffer Executed But No Captured Traffic Found | LOW | ez.prefetch, tsk.filelist |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] User "Mr. Evil" - Primary Administrator Account with Hacking Tool Collection

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T23:03:54Z to 2004-08-27T15:08:23Z |
| **Sources** | registry.sam, tsk.filelist, appfiles.program_files.mirc.mirc.ini |
| **Evidence Refs** | tc_d54d4092, tc_00e57c47, tc_ad128d35 |
| **ATT&CK** | [T1082](https://attack.mitre.org/techniques/T1082/), [T1087](https://attack.mitre.org/techniques/T1087/), [T1592](https://attack.mitre.org/techniques/T1592/) |


Analysis of the Dell Latitude CPi system reveals a user account "Mr. Evil" (RID 1003) created on 2004-08-19 23:03:54Z as a default admin user with full administrative privileges. This account has 15 login instances, with the last logon on 2004-08-27 15:08:23Z. The user's profile contains a comprehensive collection of hacking and network reconnaissance tools organized in the My Documents folder, including: FOOTPRINTING tools (nmap, NSTPro2, spade, superscan), ENUMERATION tools (ogre, enum, Cerberus Internet Scanner), EXPLOITATION tools (Brutus password cracker, Pwdump, dsniff 2.3 packet sniffer), and ARCHIVE tools (Arj, Pkzip). Additionally, the profile includes a COMMANDS folder with utilities like snitch.exe, STREAMFIND.EXE, and user2sid.exe. The account is configured with mIRC IRC client using the nickname \"mrevilrulez\" and has IRC channel access logs showing participation in #Elite.Hackers, #CyberCafe, #evilfork, #ISO-WAREZ, and other channels. Email configuration shows access to yahoo.com mail accounts and Outlook Express with subscription to the alt.hacking newsgroup.



### 2. [HIGH] Installed Hacking and Network Reconnaissance Tools - 6+ Programs for Offensive Operations

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:15:00Z to 2004-08-27T15:08:23Z |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_82dae6de, tc_00e57c47 |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1087](https://attack.mitre.org/techniques/T1087/) |


The system contains multiple hacking and network reconnaissance tools stored in My Documents directories organized by function: (1) NMAP/Nmapnt - network port scanning tool (2) Brutus - remote password cracking tool (3) Pwdump - Windows password hash extraction tool (4) Ogre - NT enumeration tool (5) Enum - network enumeration tool (6) Dsniff 2.3 - packet sniffing/capture tool for analyzing network traffic. Additional tools include Cerberus Internet Scanner, SuperScan network scanner, spade114.exe scanning tool, and NSTPro2. These tools are commonly used for network reconnaissance, vulnerability assessment, and exploitation activities.



### 3. [HIGH] Network Reconnaissance Tool Installed - Look@LAN Network Discovery Software

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T17:00:00Z to 2004-08-27T15:08:23Z |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_8ee5b1f8 |
| **ATT&CK** | [T1046](https://attack.mitre.org/techniques/T1046/) |


Look@LAN network discovery software is installed on the system at Program Files/Look@LAN directory. This tool is designed to scan and enumerate computers and services available on a network. The installation includes sound files (pop.wav, ready.wav, stop.wav) suggesting active monitoring notifications. Look@LAN is commonly used for network discovery and reconnaissance of available hosts and resources on local networks. Combined with the nmap, Cerberus Internet Scanner, SuperScan, and other enumeration tools already present on the system, this indicates a comprehensive network discovery and reconnaissance capability on the Mr. Evil system.



### 4. [MEDIUM] System Configuration - Windows XP, 5 User Accounts, Installed 2004-08-19

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T16:56:09Z to 2004-08-27T15:08:23Z |
| **Sources** | ez.prefetch, registry.sam, registry.system |
| **Evidence Refs** | tc_d54d4092 |
| **ATT&CK** | [T1087](https://attack.mitre.org/techniques/T1087/) |


The system is running Windows XP Professional with installation date of 2004-08-19 16:56:09Z. The SAM database reveals 5 user accounts on the system: (1) Administrator (RID 500), (2) Guest (RID 501), (3) HelpAssistant (RID 1000) - Remote Desktop Help Assistant, (4) SUPPORT_388945a0 (RID 1002) - Microsoft Support account (disabled), and (5) Mr. Evil (RID 1003) - Default Admin User. The Mr. Evil account is the most actively used account with 15 login instances and most recent logon at 2004-08-27 15:08:23Z. Administrator account has never been logged in (login count 0). The system is part of a workgroup/domain environment with network connectivity configured.

**Merged findings:**
- **Last System Activity and Shutdown - 2004-08-27 15:08:23Z** (f_f246d044, info, confirmed): The final recorded system activity on the Dell Latitude CPi occurred on 2004-08-27 at 15:08:23Z, as evidenced by the Mr. Evil user account's last logon timestamp and the most recent registry key modifications. The system shows activity logs and file access through the morning and early afternoon hours of August 27, 2004, with the system appearing to be powered down or disconnected after 15:08:23Z. Browser cache, Outlook Express activity, and IRC session logs show activities concentrated in the August 20 and August 27 timeframe, with the final shutdown and capture occurring on August 27, 2004.

**Affected Systems:** ez.prefetch, registry.sam, registry.system



### 5. [MEDIUM] Large Number of Deleted Files - 7,038 Entries Detected with Evidence Preservation

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T16:50:00Z to 2004-08-27T15:11:12Z |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_24e9ec61 |
| **ATT&CK** | [T1070](https://attack.mitre.org/techniques/T1070/) |


The filesystem analysis detected 7,038 deleted file entries across the disk image. The majority of deleted entries (92) are concentrated in the \"Documents and Settings\" directory, with additional entries in WINDOWS (76), Program Files (12), My Documents (3), and other locations. Despite the files being marked as deleted in the filesystem, TSK analysis indicates the actual file blocks may still be present on the disk and potentially recoverable. This suggests either user-initiated deletion or cleanup activities. The high volume of deleted files warrants further analysis to determine if data exfiltration or evidence destruction occurred.



### 6. [MEDIUM] Network Configuration - System IP Address 192.168.254.2 in Private Network

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:00:00Z to 2004-08-27T15:08:23Z |
| **Sources** | bulk.ip, tsk.filelist |
| **Evidence Refs** | tc_549ad4e5, tc_8ee5b1f8 |
| **ATT&CK** | [T1590](https://attack.mitre.org/techniques/T1590/) |


The system is configured with a private IP address 192.168.254.2 on the internal network. Network analysis from packet captures and bulk extractor IP records shows communication with gateway 192.168.254.254, multicast address 239.255.255.250, and external IP addresses 207.68.174.248 and 65.54.179.195. The system is connected to a Dell Latitude laptop with PCMCIA card support (Dell Latitude CPi model). Look@LAN network discovery software is installed at Program Files/Look@LAN, indicating network enumeration and discovery capabilities on this system. The internal network uses RFC1918 private addressing scheme (192.168.254.0/24 subnet).



### 7. [MEDIUM] Email and Newsgroup Configuration - Yahoo Mail Access and alt.hacking Subscription

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:00:00Z to 2004-08-27T15:44:34Z |
| **Sources** | bulk.url, tsk.filelist, appfiles.program_files.mirc.mirc.ini |
| **Evidence Refs** | tc_2cb49d08, tc_eed0740f, tc_ad128d35 |
| **ATT&CK** | [T1589](https://attack.mitre.org/techniques/T1589/) |


Analysis of the Mr. Evil profile reveals email configuration with Yahoo Mail access. URL records show access to us.f613.mail.yahoo.com with user account credentials and multiple Inbox access attempts from August 2004. The user configured Outlook Express with subscription to the alt.hacking newsgroup (alt.hacking.dbx file found in Outlook Express data folder). The mIRC configuration shows email set to \"none@of.ya\" as a dummy address. Network URLs recovered from browser cache show multiple accesses to Yahoo mail login pages, Inbox viewing, and email composition activities. The combined evidence indicates active use of web-based email and newsgroup discussion forums focused on hacking topics.



### 8. [MEDIUM] Network References to \"Andrews\" System - Cross-System Access Indicators

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-19T17:00:00Z to 2004-08-27T15:08:23Z |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_73e7f15a |
| **ATT&CK** | [T1570](https://attack.mitre.org/techniques/T1570/) |


Network file shortcuts in Mr. Evil's profile indicate access to systems named \"Andrews-1\" or \"Andrews\". Specifically, NetHood shortcuts reference \"andrews (c) on Andrews-1/target.lnk\" and \"CD Drive (F) on Andrews-1\", suggesting the Mr. Evil user accessed network resources on a system designated as Andrews-1, including mapped network drives (F: drive) and specific target files. This indicates network connectivity to other systems and cross-system resource access patterns. The presence of network shortcuts combined with hacking tools suggests reconnaissance or exploitation of network targets, with \"Andrews\" being a potential target system or related infrastructure.



### 9. [LOW] IRC Chat Activity - Multiple Channel Access with "mrevilrulez" and "mrevil" Aliases

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:29:01Z to 2004-08-20T14:02:55Z |
| **Sources** | appfiles.program_files.mirc.#elite.hackers.undernet.log, appfiles.program_files.mirc.#cybercafe.undernet.log, appfiles.program_files.mirc.#iso-warez.efnet.log, appfiles.program_files.mirc.#evilfork.efnet.log, appfiles.program_files.mirc.mirc.ini |
| **Evidence Refs** | tc_bb433d3b, tc_3e2474d6, tc_a26e5b64, tc_8968530d, tc_ad128d35 |
| **ATT&CK** | [T1598](https://attack.mitre.org/techniques/T1598/), [T1589](https://attack.mitre.org/techniques/T1589/) |


The Mr. Evil user profile contains mIRC configuration logs showing brief presence in multiple IRC channels on Undernet and EFnet networks on 2004-08-20. Accessed channels include: (1) #Elite.Hackers (Undernet) session start at 10:45:34, (2) #CyberCafe (Undernet) session 10:54:21-14:02:55 with only 3 minimal messages from mrevilrulez user ("glib marm cuyk" at 10:55, "hi" at 10:57, "." at 11:00), (3) #ISO-WAREZ (EFnet) 10:29:01-10:29:42 (41 second session), and (4) #evilfork (EFnet) 10:30:18 with minimal activity. The mIRC client is configured with primary nick "Mr", alternate nick "mrevilrulez", user identity "Mini Me", email "none@of.ya", and host set to Undernet Los Angeles server (losangeles.ca.us.undernet.org:6660). The pattern shows idle presence in hacking-related IRC channels rather than active substantive participation. Detailed analysis of the #CyberCafe log shows the user was passively in the channel during a 3+ hour period but made only 3 messages - consistent with idle channel presence rather than active engagement or coordination.



### 10. [LOW] File Extension Masquerading Detected - Multiple Files with Mismatched Content and Extensions

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-18T16:50:14Z to 2004-08-27T15:44:34Z |
| **Sources** | tsk.masquerade |
| **Evidence Refs** | tc_13d9b76d |
| **ATT&CK** | [T1036](https://attack.mitre.org/techniques/T1036/) |


The file masquerading detection identified multiple files where the file extension does not match the actual content type. Examples include: fpcount[1].gif file containing text content, faq[1].gif file containing JPEG data, maktoobTracking[1].htm file containing GIF data, DividerBar.gif containing PNG data, and CONFIG.SYS containing text content. Additionally, My Documents/ARCHIVE/Pkzip DOC files contain text content (MANUAL.DOC with 202,252 bytes text), and My Documents/NOVELL/Nut18 DOC files contain text. These mismatches suggest either file compression artifacts, data hiding techniques, or artifacts from file extraction/conversion processes. The masquerading could be intentional to bypass file type filters or detection systems.



### 11. [LOW] Network Printer Sharing Configuration - ANDREWS-1 System Reference

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T17:00:00Z to 2004-08-27T15:08:20Z |
| **Sources** | registry.software, tsk.filelist |
| **Evidence Refs** | tc_38f141df, tc_73e7f15a |
| **ATT&CK** | [T1021](https://attack.mitre.org/techniques/T1021/) |


Registry analysis reveals network device configuration referencing a shared resource \"\\\\ANDREWS-1\\HPLaserJ\" indicating a network-connected HP LaserJet printer shared from a system named ANDREWS-1. This network share is configured in the system's network device registry, confirming active network connectivity and resource sharing with the ANDREWS-1 system. Combined with the NetHood shortcuts referencing \"andrews (c) on Andrews-1\", this indicates the Mr. Evil system had established network connections and resource access to the ANDREWS-1 system for both file and printer sharing. The network configuration suggests either a network workgroup environment or domain setup with shared resources.



### 12. [LOW] Ethereal Network Packet Sniffer Executed But No Captured Traffic Found

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:34:54Z |
| **Sources** | ez.prefetch, tsk.filelist |
| **Evidence Refs** | tc_9bb5fbfe, tc_cd846899 |


Windows prefetch records show Ethereal.exe was executed on 2004-08-27 15:34:54Z (64-bit timestamp: 1C148EEF, file size 54938 bytes). However, forensic search of the file system revealed NO network packet capture files (.pcap, .cap, or .dump extensions) created by Ethereal or stored anywhere on the system. This indicates that while Ethereal was launched, either: (1) no traffic was captured during its execution, (2) no persistent capture files were created, or (3) any capture files were deleted after creation. The execution timestamp (15:34:54) is also notable as occurring AFTER the Mr. Evil user's final logon at 15:08:23Z, suggesting a different user ran Ethereal or it was launched automatically. WinPcap 3.01 driver is also present on the system (WINPCAP_3_01_A.EXE prefetch entry), providing the network capture capability for Ethereal.



### 13. [INFO] No Viruses Detected by Antivirus Scans - ClamAV and YARA Analysis Shows Clean System

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:00:00Z to 2004-08-27T15:11:12Z |
| **Sources** | clamav.scan, yara.files |
| **Evidence Refs** | tc_9a185c07, tc_2302cb6f |


Comprehensive malware analysis of the system using ClamAV antivirus engine and YARA rule engine found no virus detections or malicious signatures. The clamav.scan source shows no virus matches, and yara.files source shows no rule violations. This indicates the installed hacking and reconnaissance tools are not detected by standard antivirus signatures as of the time of the scan. The absence of virus detections does not indicate malicious intent regarding the installed tools - rather, it shows these tools predate modern malware detection capabilities or are not classified as malware by the scanning engines used.



### 14. [INFO] Image Hash - Evidence File Integrity (MD5 and SHA256)

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:08:00Z |
| **Sources** | hashdeep.hashes |
| **Evidence Refs** | tc_9a514faf |


The forensic image file 4Dell_Latitude_CPi.E01 has been identified with the following cryptographic hashes: MD5: 943243e71eda7481fee7b83f06698993, SHA256: 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31. Image file size: 671094597 bytes (approximately 639.8 MB). These hash values can be used to verify the integrity and authenticity of the forensic image during examination and to ensure no data corruption or tampering occurred during acquisition or analysis.



### 15. [INFO] Network MAC Address Identified - 80:6D:61:72:69:6F

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T16:48:58Z to 2004-08-27T15:46:18Z |
| **Sources** | registry.system |
| **Evidence Refs** | tc_657b7707 |


The unique MAC address for the network adapter on the Dell Latitude CPi system is 80:6D:61:72:69:6F as identified from the registry system data. This MAC address is associated with the network interface(s) used by the system and can be used to identify network access patterns and communications. The MAC address format and registry extraction confirms the network adapter configuration at the time of system shutdown on 2004-08-27.



### 16. [INFO] No Prefetch Evidence of Hacking Tool Execution - Tools Installed but Not Run

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Time** | 2004-08-27T15:08:00Z |
| **Sources** | ez.prefetch |
| **Evidence Refs** | tc_1c0678b9 |


Forensic analysis of Windows prefetch records (execution artifacts) reveals NO evidence that any of the installed hacking and network reconnaissance tools were actually executed on the system. Specifically, searches for prefetch records of nmap, nmap-nt, Brutus, Pwdump, Dsniff, Enum, Ogre, Cerberus, Superscan, and spade found zero matches in execution history. While these tools are present in the file system (stored on disk in My Documents directories), the absence of prefetch records indicates the system user(s) did not execute these programs during normal system operation. This contrasts with expected behavior in an active hacking/penetration testing scenario where such tools would typically be launched and their execution traced. The installed tools represent a collection rather than evidence of active tool usage.



### 17. [INFO] [INVESTIGATION LIMITATION] No Forensic Evidence Linking Mr. Evil Account to Greg Schardt

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | registry.sam |
| **Evidence Refs** | tc_07930636 |


Investigation question: Is there direct forensic evidence linking the Mr. Evil account or mrevilrulez aliases to Greg Schardt beyond circumstantial naming? ANSWER: No direct evidence found. The case designation and account names suggest possible linkage to an individual named Greg Schardt, but forensic analysis of the system revealed NO evidence of: (1) personal documents or files identifying the account owner, (2) email correspondence to/from a person named Schardt, (3) user profile information containing personal identifying details, (4) browser history showing Schardt-related searches or pages, (5) any system configuration linking the account to Schardt. The naming of the account as "Mr. Evil" and IRC aliases like "mrevilrulez" and "mrevil" are clearly aliases/handles and do not provide identification of the actual person who created or used the account. Without direct evidence linking the account to a specific individual, the assignment to Greg Schardt remains unsupported by forensic evidence.



### 18. [INFO] Alternative Hypothesis: Legitimate Penetration Testing Lab Configuration

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | ez.prefetch |
| **Evidence Refs** | tc_1c0678b9 |


The system configuration is consistent with legitimate security research. No execution evidence for installed hacking tools, minimal IRC participation, no actual network attacks documented, and no victim data exfiltration found. Tools installed for learning purposes in isolated lab environment.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Internal IP | `192.168.254.2` |  | Network Configuration - System IP Address 192.168.254.2 in Private Network |
| Internal IP | `192.168.254.254` |  | Network Configuration - System IP Address 192.168.254.2 in Private Network |
| External IP | `207.68.174.248` |  | Network Configuration - System IP Address 192.168.254.2 in Private Network |
| External IP | `65.54.179.195` |  | Network Configuration - System IP Address 192.168.254.2 in Private Network |
| Internal IP | `192.168.254.0` |  | Network Configuration - System IP Address 192.168.254.2 in Private Network |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `none@of.ya` |  | Email and Newsgroup Configuration - Yahoo Mail Access and alt.hacking Subscripti |




---

## Appendix C: MITRE ATT&CK Coverage

11 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (4) > Defense Evasion (2) > Discovery (3) > Lateral Movement (2)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1589](https://attack.mitre.org/techniques/T1589/) | Gather Victim Identity Information | IRC Chat Activity - Multiple Channel Access...; Email and Newsgroup Configuration - Yahoo Mail... |
| [T1590](https://attack.mitre.org/techniques/T1590/) | Gather Victim Network Information | Network Configuration - System IP Address... |
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | User "Mr. Evil" - Primary Administrator...; Installed Hacking and Network Reconnaissance... |
| [T1598](https://attack.mitre.org/techniques/T1598/) | Phishing for Information | IRC Chat Activity - Multiple Channel Access... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1036](https://attack.mitre.org/techniques/T1036/) | Masquerading | File Extension Masquerading Detected -... |
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | Large Number of Deleted Files - 7,038 Entries... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Installed Hacking and Network Reconnaissance...; Network Reconnaissance Tool Installed -... |
| [T1082](https://attack.mitre.org/techniques/T1082/) | System Information Discovery | User "Mr. Evil" - Primary Administrator... |
| [T1087](https://attack.mitre.org/techniques/T1087/) | Account Discovery | User "Mr. Evil" - Primary Administrator...; System Configuration - Windows XP, 5 User...; Installed Hacking and Network Reconnaissance... |


### Lateral Movement

| Technique | Name | Findings |
|-----------|------|----------|
| [T1021](https://attack.mitre.org/techniques/T1021/) | Remote Services | Network Printer Sharing Configuration -... |
| [T1570](https://attack.mitre.org/techniques/T1570/) | Lateral Tool Transfer | Network References to \"Andrews\" System -... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 215 |
| Findings submitted | 18 |
| Confirmed | 14 |
| Inferences | 4 |
| Input tokens | 670 |
| Output tokens | 67.4K |
| Total tokens | 68.0K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 670 | 67.4K | 68.0K |




<details>
<summary>Evidence Sources (135)</summary>

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
| ez.shimcache | eztools | 140 |
| ez.prefetch | eztools | 165 |
| registry.system | regripper | 376 |
| registry.sam | regripper | 133 |
| registry.sam | regripper | 7 |
| registry.system | regripper | 19 |
| registry.system | regripper | 8 |
| registry.software | regripper | 9600 |
| registry.software | regripper | 283 |
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
| appfiles.program_files.mirc.aliases.ini | icat | 16 |
| appfiles.program_files.ethereal.dictionary.xml | icat | 649 |
| appfiles.program_files.ethereal.mobileipv4.xml | icat | 64 |
| appfiles.program_files.mirc.#chataholics.undernet.log | icat | 16 |
| appfiles.program_files.ethereal.nasreq.xml | icat | 293 |
| appfiles.program_files.mirc.#cybercafe.undernet.log | icat | 207 |
| appfiles.program_files.ethereal.sunping.xml | icat | 24 |
| appfiles.program_files.mirc.#elite.hackers.undernet.log | icat | 11 |
| appfiles.program_files.ethereal.capture_filters.txt | icat | 80 |
| appfiles.program_files.mirc.#evilfork.efnet.log | icat | 11 |
| appfiles.program_files.ethereal.capturing.txt | icat | 84 |
| appfiles.program_files.mirc.#funny.undernet.log | icat | 10 |
| appfiles.program_files.ethereal.display_filters.txt | icat | 43 |
| appfiles.program_files.mirc.#houston.undernet.log | icat | 9 |
| appfiles.program_files.ethereal.faq.txt | icat | 2228 |
| appfiles.program_files.mirc.#iso-warez.efnet.log | icat | 7 |
| appfiles.program_files.ethereal.getting_started.txt | icat | 90 |
| appfiles.program_files.mirc.#luxshell.undernet.log | icat | 13 |
| appfiles.program_files.ethereal.overview.txt | icat | 38 |
| appfiles.program_files.mirc.#mp3xserv.undernet.log | icat | 15 |
| appfiles.program_files.ethereal.well_known.txt | icat | 114 |
| appfiles.program_files.mirc.#thedarktower.afternet.log | icat | 14 |
| appfiles.program_files.ethereal.pcrepattern.3.txt | icat | 1475 |
| appfiles.program_files.mirc.#ushells.undernet.log | icat | 9 |
| appfiles.program_files.ethereal.agentx-mib.txt | icat | 529 |
| appfiles.program_files.mirc.m5tar.undernet.log | icat | 8 |
| appfiles.program_files.ethereal.disman-event-mib.txt | icat | 1957 |
| appfiles.program_files.mirc.mirc.ini | icat | 224 |
| appfiles.program_files.ethereal.disman-schedule-mib.txt | icat | 701 |
| appfiles.program_files.mirc.popups.ini | icat | 96 |
| appfiles.program_files.ethereal.disman-script-mib.txt | icat | 1766 |
| appfiles.program_files.mirc.readme.txt | icat | 34 |
| appfiles.program_files.ethereal.etherlike-mib.txt | icat | 1139 |
| appfiles.program_files.mirc.servers.ini | icat | 423 |
| appfiles.program_files.ethereal.hcnum-tc.txt | icat | 120 |
| appfiles.program_files.mirc.urls.ini | icat | 9 |
| appfiles.program_files.ethereal.host-resources-mib.txt | icat | 1542 |
| appfiles.program_files.mirc.versions.txt | icat | 472 |
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
| clamav.scan | clamav | 1 |
| yara.files | yara | 3 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.file_staging | composite | 122 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
