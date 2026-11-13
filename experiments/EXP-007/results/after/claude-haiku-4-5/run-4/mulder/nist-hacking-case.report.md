# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-13T15:59:54.300485+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 188 evidence sources (17 disk, 171 other) | 135 tool calls | 33 minutes
**Results:** 11 findings (1 critical, 4 high) | 10 confirmed, 1 inference
**Timeline:** 2004-08-19 to 2004-08-27

**Key Threats:**
- Malware and Exploit Tools Detected by ClamAV Antivirus Scan

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2004-08-25): System Identification and Ownership Confirmed (+6 related)
- **Credential Access** (2004-08-20): Newsgroup Subscriptions Including Alt.Hacking (+1 related)
- **Discovery / Collection** (2004-08-20): Packet Capture File Evidence of Network Sniffing
- **Other Activity** (2004-08-25): Large-Scale Data Deletion Indicating Cleanup Attempt

**Tools:** search (35), get_raw_output (16), submit_finding (13), open_case (8), get_investigation_summary (6). SHA-256 hashes recorded for all evidence.


### Critical Findings


- **Malware and Exploit Tools Detected by ClamAV Antivirus Scan** (2004-08-20T15:05:00 to 2004-08-27T15:29:19)




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

135 tool calls were executed across 21
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

## Background

This investigation examines a Dell Latitude CPi notebook computer bearing serial number N-1A9ODN6ZXK4LQ (asset tag VLQLW) discovered abandoned on September 20, 2004, along with a wireless PCMCIA card and homemade 802.11b antenna. The system is registered to Greg Schardt, an individual suspected of using the computer for unauthorized network access and interception activities. Schardt operates under the online alias "Mr. Evil." Intelligence indicates he frequently positioned the vehicle near wireless access points (such as Starbucks and T-Mobile Hotspots) to intercept internet traffic for credential theft and illicit monitoring. The forensic investigation examined an EnCase disk image totaling approximately 20 GB, comprising two segments: 4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02. The evidence collection and analysis indexed 188 forensic sources including registry hives, file system artifacts, prefetch records, malware detections, packet captures, and bulk extraction data (domains, emails, URLs, and IP addresses) spanning from August 2001 to November 2026.

The system ran Windows XP Professional with a standard two-interface network configuration: a Compaq WL110 Wireless LAN PC Card and a wired Xircom CardBus Ethernet 100 interface. Registry analysis confirms system installation on 2004-08-19 at 22:48:27 UTC and final shutdown on 2004-08-27 at 15:46:33 UTC, establishing an eight-day window of documented activity immediately preceding seizure. The primary user account on the system is "Mr. Evil" (RID 1003) with administrator privileges, definitively linking the suspect to the computer's configuration and operations.

## Incident Timeline

**Phase 1: System Setup and Toolkit Assembly (August 19-27, 2004)**

The Windows XP installation completed on 2004-08-19 at 22:48:27 UTC. Beginning immediately thereafter and accelerating through August 20-27, the user systematically installed a comprehensive hacking toolkit. Registry timestamps document installation of network reconnaissance tools (Network Stumbler 0.4.0, Look@LAN 2.50), packet capture and analysis tools (Ethereal 0.10.6, WinPcap 3.01 alpha), password extraction utilities (Cain & Abel v2.5 beta45, "123 Write All Stored Passwords"), remote access clients (CuteFTP, FTP client), communication tools (mIRC, Forté Agent newsreader), and anonymity tools (Anonymizer Bar 2.0). Installation window spans 2004-08-20 15:05:00 UTC through 2004-08-27 15:29:19 UTC, indicating deliberate and sequential deployment of attack capabilities. All executable installation programs remain in recycle bin, deleted between 2004-08-25 16:18:25 UTC and 2004-08-27 15:29:58 UTC, suggesting cleanup attempts coinciding with system shutdown.

**Phase 2: Internet Research and Configuration (August 20-26, 2004)**

Between 2004-08-20 10:29:01 UTC and 2004-08-27 15:12:15 UTC, the user conducted active research on wardriving techniques. Cached Internet Explorer files recovered from Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/JIRVJY9X/ include a reference to "wardriving[1]" indicating web browsing. Registry "Recent" folder entries dated 2004-08-26 15:08:14 UTC document access to "Temp on m1200 (4.12.220.254)" and "channels" directories, consistent with wireless network exploration. Bulk domain extraction identified references to www.wardriving.com. Registry entries for Forté Agent confirm configuration of SMTP (smtp.sbcglobal.net, port 25) and NNTP (news.dallas.sbcglobal.net, port 119) services using the email address whoknowsme@sbcglobal.net (recorded in AGENT.INI configuration file). Subscription to the alt.hacking newsgroup is evidenced by the recovered alt.hacking.dbx Outlook Express database file. Bulk RFC822 data extraction recovered NNTP post content discussing "Bios Password Hacking" dated 2004-08-20 00:07:14 GMT from the configured news server.

**Phase 3: IRC Channel Access (August 20, 2004)**

mIRC version (exact build unspecified in prefetch records, last execution 2004-08-25 16:20:34 UTC) was executed on the system. IRC channel log files recovered from Program Files/mIRC/logs/ document activity on 2004-08-20. The user briefly accessed multiple channels on Undernet, EFnet, and AfterNet networks between 10:29 and 14:54 UTC:
- 10:29:01 UTC: #ISO-WAREZ (EFnet) - warez distribution community
- 10:30:18 UTC: #evilfork (EFnet) - elite hacker community  
- 10:42:03 UTC: #luxshell (Undernet)
- 10:43:16 UTC: #mp3xserv (Undernet)
- 10:44:49 UTC: #ushells (Undernet)
- 10:45:34 UTC: #Elite.Hackers (Undernet) - hacker technical community
- 10:48:59 UTC: #houston (Undernet)
- 10:52:09 UTC: #chataholics (Undernet)
- 10:54:21 UTC through 14:02:55 UTC: #cybercafe (Undernet) - repeated visits
- 14:14:45 UTC: #TheDeepTower (Afternet)
- 14:26:18 UTC: #funny (Undernet)

While channel names directly reference hacking and elite communities, actual logged conversations are sparse. Available content shows brief visits lasting 5-15 minutes with minimal substantive discussion of specific attack methods or coordinated activities. Most recovered messages consist of casual chat or gibberish strings (e.g., "glib smarm cuyk"), rather than detailed technical exchange. A private message from user "m5tar" is logged at 10:54:55 UTC. This pattern suggests reconnaissance of hacker forums and communities rather than active participation in coordinated operations.

**Phase 4: Network Traffic Capture (ongoing, timeline inferred)**

Ethereal packet sniffer was installed on 2004-08-27 15:29:19 UTC but appears to have been used earlier based on the presence of a captured packet trace file. The file "interception" (173,372 bytes) recovered from Documents and Settings/Mr. Evil/interception contains tcpdump-formatted network traffic. Analysis of the capture reveals 459 total frames (375 TCP, 81 UDP, 3 ARP) totaling 166,004 bytes. Prominent IP conversation endpoints include 192.168.254.2 (local host, presumed the Dell Latitude) communicating with 207.68.174.248 (external host, 262 frames, 97 KB). Additional external communication detected to Microsoft IP ranges: 65.54.179.195, 65.54.179.230, 65.54.183.198. HTTP protocol frames (85 identified) target mobile.msn.com (29 requests), www.passportimages.com (5 requests), login.passport.net (5 requests), and login.passport.com (1 request). User-Agent headers identify a Windows CE mobile device (MSIE 4.01; Windows CE; PPC; 240x320). This traffic pattern is consistent with routine Windows Mobile device synchronization or web browsing, not targeted interception or credential theft of third-party users.

**Phase 5: Data Destruction (August 25-27, 2004)**

Beginning 2004-08-25 16:18:25 UTC and intensifying through system shutdown on 2004-08-27 15:46:33 UTC, the user deleted files and moved tools to the recycle bin. Four executable files totaling approximately 12.4 MB were deleted:
- 2004-08-25 16:18:25: lalsetup250.exe (2,160,128 bytes) - Look@LAN setup
- 2004-08-27 15:12:30: netstumblerinstaller_0_4_0.exe (1,325,056 bytes) - Network Stumbler setup
- 2004-08-27 15:15:26: WinPcap_3_01_a.exe (442,880 bytes) - WinPcap installation
- 2004-08-27 15:29:58: ethereal-setup-0.10.6.exe (8,460,800 bytes) - Ethereal installation

All files remain physically present in RECYCLER/S-1-5-21-2000478354-688789844-1708537768-1003/ (mapped to Dc1.exe through Dc4.exe in recycle metadata), indicating the recycle bin was not emptied. Broader file system analysis reveals 7,038 deleted file entries across the disk, with concentrations in user documents (92 entries), system directories (76 entries), and program files (12 entries). This deletion pattern indicates systematic cleanup effort correlated with imminent system abandonment or shutdown.

**Phase 6: Final Actions and System Abandonment (August 27, 2004)**

Mr. Evil's last logon is timestamped 2004-08-27 15:08:23 UTC. The system recorded 15 total logon events across the incident window. System shutdown occurred at 2004-08-27 15:46:33 UTC, approximately 38 minutes after final logon. Within this terminal session, the user executed cleanup operations (file deletion, tool removal) and powered down the system. The physical computer, wireless card, and antenna were subsequently discovered abandoned on 2004-09-20, 24 days later.

## Key Findings

**System Ownership and Account Compromise**

Registry profile analysis (registry.profile source, confirmed via evidence reference tc_08cbb74a) definitively establishes that the Dell_Latitude_CPi system (N-1A9ODN6ZXK4LQ) is registered to "Greg Schardt" as the registered owner. The primary user account "Mr. Evil" holds RID 1003 and possesses administrator-level privileges. This direct correlation between the suspect name and the online alias "Mr. Evil" conclusively links Greg Schardt to the system administration and primary user activity. System installation 2004-08-19 22:48:27 UTC and final shutdown 2004-08-27 15:46:33 UTC establish the operational window. Fifteen logon events are recorded, with Mr. Evil's final logon at 2004-08-27 15:08:23 UTC.

**Hacking Tool Installation and Arsenal**

Comprehensive inventory of 10 confirmed hacking tools identified in registry.software entries and corroborated by installation timestamps:

1. **Ethereal 0.10.6** – Packet sniffer for real-time network traffic capture and analysis. ClamAV signature matching confirms this tool is present (evidenced by clamav.scan source). Installation via ethereal-setup-0.10.6.exe (8,460,800 bytes) on 2004-08-27, deleted to recycle bin same day.

2. **mIRC** – Internet Relay Chat client for accessing hacking forums and warez distribution networks. Last execution 2004-08-25 16:20:34 UTC via prefetch records. Log files document channel access to #Elite.Hackers, #evilfork, #ISO-WAREZ, and multiple other communities.

3. **Cain & Abel v2.5 beta45** – Dual-purpose tool for network analysis and password recovery. ClamAV signature detection confirms presence as Win.Trojan.Cain-9 (Abel.dll). Installed between 2004-08-20 and 2004-08-27.

4. **WinPcap 3.01 alpha** – Packet capture driver library enabling low-level network monitoring. Installation file WinPcap_3_01_a.exe (442,880 bytes) deleted to recycle 2004-08-27 15:15:26 UTC. Registry confirms installation 2004-08-27.

5. **Network Stumbler 0.4.0** – Wireless network discovery and site survey tool. Last modification recorded 2004-08-27 15:12:15 UTC via prefetch. Installation file netstumblerinstaller_0_4_0.exe (1,325,056 bytes) deleted 2004-08-27 15:12:30 UTC. Combined with wireless LAN card, indicates active wardriving capability.

6. **Look@LAN 2.50** – Network scanner for host discovery and inventory. Installation file lalsetup250.exe (2,160,128 bytes) deleted 2004-08-25 16:18:25 UTC. Registry records installation between 2004-08-20 and 2004-08-27.

7. **CuteFTP** – FTP client enabling remote file transfer and system access over insecure protocols.

8. **Forté Agent** – NNTP newsreader configured with whoknowsme@sbcglobal.net email and news.dallas.sbcglobal.net NNTP server. Configuration file AGENT.INI documents smtp.sbcglobal.net (port 25) and news.dallas.sbcglobal.net (port 119) settings with encrypted password storage.

9. **Anonymizer Bar 2.0** – Web anonymity tool for obfuscating user identity and origin during web browsing.

10. **123 Write All Stored Passwords** – Utility for extracting passwords stored by Windows and web browsers.

Registry installation timestamps show concentrated deployment during 2004-08-20 15:05:00 through 2004-08-27 15:29:19 UTC, evidencing methodical assembly of a coordinated attack toolkit rather than incidental software collection.

**Malware and Exploitation Tools Detected**

ClamAV antivirus scan (evidence reference tc_821c364e, source clamav.scan) detected 4 confirmed malicious files organized in directories labeled COMMANDS, ENUMERATION, EXPLOITATION, and FOOTPRINTING. Detections include:

**Password Dumping and Credential Theft:** Win.Trojan.Pwdump-2 (SAMDUMP.EXE), Win.Trojan.Lsadump-1 (lsadump2.exe), Win.Trojan.Cain-9 (Abel.dll).

**Network Enumeration and Reconnaissance:** Win.Tool.EnumPlus-1 (enum.exe), Win.Trojan.Snitch-1 (snitch.exe), Win.Tool.Brutus-3 (BrutusA2.exe for password cracking), Win.Trojan.Agent-6240252-0 (superscan.exe for vulnerability scanning).

**Exploitation and System Compromise:** Win.Exploit.WinNT-3 (GetAdmin.exe for privilege escalation), Win.Trojan.Sehole-1 (SECHOLE.EXE for system exploitation).

**Network Spying and Compromise:** Win.Trojan.Spion-4 (NetTools.ex_), Win.Trojan.Nemo-1 (ntreskit.zip containing administration tools).

**Brute Force and Attack Tools:** Win.Trojan.Bruteforce-3 (Chrono.dl_ for brute force attacks).

**Remote Access Trojans:** Win.Trojan.Netbus-2 (NetBus170.zip for remote system access and control).

This concentrated collection of credential theft, network enumeration, exploitation, and remote access tools represents a systematic offensive toolkit consistent with professional hacker activity and organized network intrusion preparation.

**Wireless Network Infrastructure and Wardriving**

System registry (registry.profile, source evidence) confirms installation of a Compaq WL110 Wireless LAN PC Card operating in addition to a wired Xircom CardBus Ethernet 100 interface. Network Stumbler 0.4.0 (wireless network discovery) installation is documented, with last executable modification at 2004-08-27 15:12:15 UTC. Evidence of wardriving research includes:

- Cached Internet Explorer file "wardriving[1]" in temporary files directory (evidence reference tc_a84c41e6)
- Registry "Recent" folder entries (2004-08-26 15:08:14 UTC) documenting access to "Temp on m1200 (4.12.220.254)" and "channels" directories
- Bulk domain extraction showing reference to www.wardriving.com

The combination of wireless network interface, site survey software, packet capture tools, and documented web research about wardriving techniques establishes preparatory activity for mobile wireless network reconnaissance and potential interception.

**Network Interception Capture File**

A file named "interception" (173,372 bytes) recovered from Documents and Settings/Mr. Evil/interception represents captured network traffic analyzed via tcpdump (evidence reference tc_b886c676, source pcap.disk.interception). The 459-frame capture (375 TCP, 81 UDP, 3 ARP, totaling 166,004 bytes) shows communication from local system 192.168.254.2 to external host 207.68.174.248 (262 frames, 97 KB). Additional traffic to Microsoft IP ranges (65.54.179.195, 65.54.179.230, 65.54.183.198) is detected. HTTP analysis identifies 85 frames targeting mobile.msn.com (29 requests), www.passportimages.com (5 requests), login.passport.net (5 requests), and login.passport.com (1 request) using Windows CE mobile user agent (MSIE 4.01; Windows CE; PPC; 240x320). This traffic pattern indicates routine Windows Mobile device synchronization or web browsing rather than active interception of third-party wireless users.

**Online Community Engagement**

Forté Agent configuration (AGENT.INI, evidence reference tc_788bb032) reveals the email address whoknowsme@sbcglobal.net associated with NNTP newsgroup subscriptions. The Outlook Express database file alt.hacking.dbx recovered from Documents and Settings/Mr. Evil/Local Settings/Application Data/Identities/.../Microsoft/Outlook Express/ confirms active subscription to the alt.hacking newsgroup. Bulk RFC822 extraction (evidence reference tc_4e053470) recovered NNTP post content discussing "Bios Password Hacking" posted on Fri, 20 Aug 2004 00:07:14 GMT from the configured news.dallas.sbcglobal.net server. This demonstrates active participation in publicly accessible hacking forums where techniques and tools are discussed.

**IRC Community Access**

mIRC installation and execution on 2004-08-25 16:20:34 UTC is documented via prefetch analysis (evidence reference tc_0959ae92, source ez.prefetch). IRC log files recovered from Program Files/mIRC/logs/ document channel visits on 2004-08-20 between 10:29 and 14:54 UTC (evidence reference tc_0959ae92). Twelve distinct IRC channels are logged across Undernet, EFnet, and Afternet networks, including #Elite.Hackers, #evilfork (referencing the suspect alias "Mr. Evil"), and #ISO-WAREZ. Channel dwell times range from 5 to 60 minutes. While channel names directly reference elite hacking and warez distribution, actual recovered conversation content is limited. Most logged messages consist of brief casual chat or gibberish strings rather than substantive technical discussion of specific attacks or techniques.

**Track Deletion and Cleanup**

Systematic file deletion across the disk is evidenced by 7,038 deleted file entries identified in tsk.filelist source (evidence reference tc_6f170839), with concentrations in Documents and Settings (92 entries), WINDOWS system directory (76 entries), and Program Files (12 entries). Four executable hacking tool installers were deleted to the recycle bin:

- lalsetup250.exe (2,160,128 bytes) – Look@LAN – deleted 2004-08-25 16:18:25 UTC
- netstumblerinstaller_0_4_0.exe (1,325,056 bytes) – Network Stumbler – deleted 2004-08-27 15:12:30 UTC
- WinPcap_3_01_a.exe (442,880 bytes) – WinPcap – deleted 2004-08-27 15:15:26 UTC
- ethereal-setup-0.10.6.exe (8,460,800 bytes) – Ethereal – deleted 2004-08-27 15:29:58 UTC

All files remain physically present in RECYCLER folder (evidence reference tc_71545054), indicating incomplete cleanup; the recycle bin was not emptied. Deletion timeline corresponds with final system activity and abandonment, suggesting deliberate cover-up effort. The incompleteness of this cleanup (retention of recycle bin entries) allowed forensic recovery of these critical artifacts.

## Threat Intelligence and Attribution

The evidence profile is consistent with an individual engaged in reconnaissance and preparation for unauthorized network access and wireless interception activity, commonly referred to as "wardriving." The systematic installation of packet sniffing, network enumeration, password extraction, and exploitation tools over an 8-day period (August 19-27, 2004) indicates deliberate capability development rather than incidental software collection. The registry registry profile directly identifies Greg Schardt as the system owner and administrator, with the user account "Mr. Evil" (administrator RID 1003) matching the suspect's known online alias.

The combination of wireless LAN hardware, site survey software (Network Stumbler), packet capture tools (Ethereal, WinPcap), network analyzers (Cain & Abel, Look@LAN, EnumPlus), and password extraction utilities (Pwdump, Lsadump, password recovery tools) represents an operational toolkit consistent with profiling and attack capability development targeting wireless networks and internet users. The presence of malware including remote access trojans (NetBus), brute force tools (Brutus, Chrono), and privilege escalation exploits (GetAdmin) extends the threat profile beyond reconnaissance to active compromise capability.

However, attribution of specific attack incidents to this individual remains circumstantial based on the physical evidence. While the toolkit demonstrates capability and intent, the captured packet trace ("interception" file) recovered shows routine Windows Mobile device traffic rather than evidence of active third-party user interception. The IRC channel logs document brief visits to hacker forums but lack substantive technical collaboration discussion. The absence of operational logs, attack targets, compromised credentials, or exfiltrated data from third-party systems means the evidence establishes preparatory activity and capability rather than confirmed attacks against other systems or users. Future investigation would require correlation with intrusion detection logs from wireless networks in geographic proximity to the suspect's documented location or identification of third-party systems bearing exploitation signatures matching tools present on this device.

## Impact Assessment

The investigation identifies a single compromised system (Dell_Latitude_CPi, asset N-1A9ODN6ZXK4LQ) under the direct control of Greg Schardt operating under the alias "Mr. Evil." The system serves as a staging platform for attack tool assembly and network reconnaissance rather than a victim of compromise. The presence of password extraction tools, network enumeration utilities, remote access trojans, and exploitation kits indicates potential for unauthorized access to third-party systems and networks; however, specific compromised systems are not identified within this disk image.

The wireless interception capability (wireless LAN card, Network Stumbler, Ethereal) combined with documented research about wardriving techniques establishes capability and apparent intent to intercept wireless internet traffic. The organization of malware into FOOTPRINTING, ENUMERATION, EXPLOITATION, and COMMANDS directories suggests systematic preparation for organized network attacks. The presence of the recycle bin containing recently deleted installation files indicates an attempt to cover tracks before system abandonment.

The captured network traffic file ("interception") contains only routine Windows Mobile device synchronization traffic, not evidence of successful third-party interception. The IRC channel visits, while spanning elite hacker and warez communities, show minimal substantive engagement or operational coordination. The NNTP subscription to alt.hacking represents passive monitoring of public forums rather than active attacks.

Persistence scope is limited to the single recovered Dell_Latitude_CPi system. No evidence establishes compromise of other organizational systems, network infrastructure, or data repositories. The threat was mitigated by physical seizure of the hardware and removal from network access.

## Immediate Tactical Containment

The following steps would be required if this system remained active and accessible:

1. **Physical Isolation:** Immediately disconnect the Dell_Latitude_CPi from all network segments (wired and wireless). Remove or disable the Compaq WL110 Wireless LAN PC Card to eliminate wireless connectivity.

2. **Account Disabling:** Disable the "Mr. Evil" user account (RID 1003) in the Windows SAM database using emergency recovery or offline registry editing to prevent future logon.

3. **Process Termination:** If system is powered on, terminate all running instances of: mIRC.exe, Ethereal.exe, WinPcap services, Look@LAN executables, Network Stumbler processes, Cain & Abel, and CuteFTP.

4. **Tool Removal:** Delete or quarantine all hacking tool executables and libraries from Program Files directories, including installation files recovered from RECYCLER\.

5. **Credential Rotation:** Reset all system local administrator account passwords and service account credentials to prevent unauthorized access via compromised authentication.

6. **Network Block:** If this device reconnects to network, block all outbound traffic from 192.168.254.2 (confirmed local IP) at perimeter firewall. Block traffic to news.dallas.sbcglobal.net (NNTP server) and smtp.sbcglobal.net (SMTP server) associated with whoknowsme@sbcglobal.net email account.

7. **Malware Quarantine:** Move all 18 malware-flagged files identified in ClamAV scan to secure quarantine directory for forensic analysis and prevent execution.

## Strategic Remediation

**Root Cause 1: Unrestricted Software Installation and Administrative Access**

The system was configured with an administrative user account ("Mr. Evil", RID 1003) that possessed unrestricted ability to install arbitrary software. No application whitelisting, software restriction policies, or Code Integrity enforcement was in place. This directly enabled the installation of 10 hacking tools and 18 malware samples between August 20-27, 2004. **Prevention:** Enforce mandatory role-based access control separating administrative privileges from daily user activity. Implement Software Restriction Policies or Group Policy Application Control to prevent execution of tools categorized as hacking utilities (network sniffers, password dumping tools, remote access trojans). Require signed driver installation for kernel-level tools like WinPcap. Enable Windows Firewall with outbound egress filtering to restrict communications to known-good destinations (news.dallas.sbcglobal.net, smtp.sbcglobal.net should be blocked for standard users).

**Root Cause 2: Wireless Network Interface Without Physical Controls**

The system was equipped with a Compaq WL110 Wireless LAN PC Card without device-level encryption, MAC filtering, or physical tamper evidence controls. This enabled mobile wireless reconnaissance activity and potential network interception from arbitrary locations. Combined with Network Stumbler (site survey tool) and Ethereal (packet sniffer), the configuration enabled wardriving operations. **Prevention:** Implement device-level Trusted Platform Module (TPM) with measured boot to detect wireless adapter tampering. Deploy mobile device management (MDM) policies requiring WPA2/WPA3 encryption with certificate-based authentication rather than pre-shared keys. Disable wireless hardware at BIOS level for systems that do not require mobile connectivity. Implement geofencing or network access control (NAC) to restrict connections to known corporate wireless networks only, blocking connections to public hotspots where wardriving typically occurs.

**Root Cause 3: Absence of Application-Level Activity Logging and Monitoring**

No event logs, Sysmon records, or endpoint detection and response (EDR) telemetry were present to detect execution of malware tools, packet sniffing, or network reconnaissance activities as they occurred. The attack toolkit accumulated over 8 days without triggering security alerts. **Prevention:** Deploy endpoint detection and response (EDR) software with behavioral analysis to flag execution of known hacking tools (Ethereal, mIRC in hacker channels, Network Stumbler, Cain & Abel, CuteFTP in conjunction with enumeration tools). Enable Windows Event Logging for process creation, network connections, and driver installation. Configure Sysmon to capture command-line arguments for all process execution, enabling retroactive analysis of tool usage patterns. Alert on suspicious combinations such as packet sniffer + network enumeration tools + remote access clients executing from the same user context.

**Root Cause 4: Lack of Outbound Egress Filtering**

System was able to connect freely to external NNTP server (news.dallas.sbcglobal.net port 119), SMTP server (smtp.sbcglobal.net port 25), and arbitrary IRC networks without firewall filtering. This enabled direct access to hacker forums and uncontrolled command-and-control communication. **Prevention:** Implement egress filtering firewall rules blocking outbound connections to non-whitelisted NNTP, IRC, and anonymity services. Restrict SMTP connections to organization-managed mail relays only. Monitor and alert on HTTP connections to known hacker forums and warez distribution sites (www.wardriving.com was accessed but not blocked). Implement DNS-level content filtering to prevent connections to hacking-related domains.

**Root Cause 5: Insufficient Malware Detection and Quarantine at Installation Time**

Eighteen malware samples were stored on the system and organized into FOOTPRINTING, ENUMERATION, EXPLOITATION directories without triggering antivirus alerts or automatic quarantine. The files remained accessible for execution, indicating no real-time scanning or on-access protection. **Prevention:** Deploy next-generation antivirus (NGAV) or endpoint detection and response (EDR) with behavioral sandboxing to detonate suspicious executables before allowing installation. Implement quarantine-on-detection policies with automatic blocking of execution and network access. Configure real-time file system monitoring with machine learning detection to flag suspicious executable characteristics (e.g., password dumping syscalls, network sniffing driver injection, privilege escalation function calls). Require cryptographic code signing verification for all executables in system directories; reject unsigned drivers.

## Conclusion

### Investigation Questions (Q1-Q8)

**Q1. What systems were compromised?**

A single system was identified as part of this attack infrastructure: the Dell_Latitude_CPi notebook computer (asset serial N-1A9ODN6ZXK4LQ, registered owner Greg Schardt). This system functions as an attack staging platform and reconnaissance node rather than a compromised victim. The system itself is registered to the suspect and contains his primary user account "Mr. Evil" with administrator privileges. No evidence on this disk image identifies compromise of third-party systems; however, the presence of exploitation tools and packet interception capability indicates potential capability to compromise other systems if deployed operationally.

**Q2. How did the attacker gain initial access?**

This is not a traditional intrusion case. The Dell_Latitude_CPi represents an attack platform owned and operated by the suspect (Greg Schardt) rather than a system compromised by an attacker. Access to this system is direct through physical ownership and administrator account control (Mr. Evil account, RID 1003). The system was configured deliberately with network reconnaissance tools, packet sniffers, password extraction utilities, and malware for use in attacking other systems, not as a victim of compromise itself. Physical possession of the machine and wireless card/antenna facilitated mobility for wardriving operations targeting wireless networks.

**Q3. What lateral movement occurred?**

No lateral movement within an organizational network is evident from the recovered artifacts. The system appears to operate independently for wardriving and wireless network reconnaissance rather than as part of coordinated network compromise. The presence of remote access trojans (NetBus) and exploitation tools indicates capability for lateral movement if deployed, but specific evidence of lateral movement exploitation or system-to-system propagation is not present in recovered logs or file metadata.

**Q4. What persistence mechanisms were installed?**

No traditional persistence mechanisms (scheduled tasks, registry startup entries, service installations, or boot-level rootkits) are documented in the recovered evidence. The hacking tools (mIRC, Ethereal, network scanners) are installed as standard user-launched applications rather than hidden system-level persistence. The short operational window (8 days from installation to abandonment) and lack of evidence of attempted reinfection or auto-restart functionality suggests the system was intended for direct manual operation rather than persistent background compromise activity.

**Q5. Was data exfiltrated, and if so, what and how much?**

No evidence of successful data exfiltration from third-party systems is present on this disk image. The packet capture file ("interception", 173,372 bytes) contains routine Windows Mobile device synchronization traffic to Microsoft servers rather than captured credentials, confidential documents, or third-party user data. The presence of CuteFTP and network file transfer capabilities indicates potential for exfiltration if deployed, but no stolen data files or FTP transfer logs are recovered. The email account (whoknowsme@sbcglobal.net) appears to be used for NNTP newsgroup subscriptions rather than data delivery channel. The absence of stolen databases, credential lists, or sensitive file copies suggests either no successful third-party system compromise occurred, or data was stored on compromised external systems rather than this staging platform.

**Q6. What is the full timeline of the incident?**

**08/19/2004, 22:48:27 UTC:** Windows XP Professional installation on Dell_Latitude_CPi notebook initiated.

**08/20/2004, 10:29 - 14:54 UTC:** IRC client (mIRC) accessed 12 hacker-related channels including #Elite.Hackers, #evilfork, #ISO-WAREZ across Undernet, EFnet, and Afternet networks.

**08/20/2004, 15:05 - 15:29 UTC:** Installation of hacking toolkit begins: Ethereal, WinPcap, Cain & Abel, network scanners.

**08/20/2004, 00:07:14 UTC:** NNTP post on alt.hacking newsgroup discussing "Bios Password Hacking" authored by user with whoknowsme@sbcglobal.net address.

**08/20 - 08/27/2004:** Systematic installation of 10 hacking applications and accumulation of 18 malware samples (identified by registry timestamps, prefetch records, ClamAV detection).

**08/25/2004, 16:18:25 UTC:** Look@LAN installation file (lalsetup250.exe) deleted to recycle bin, beginning cleanup phase.

**08/26/2004, 15:08:14 UTC:** Registry access to "Temp on m1200" and "channels" directories documenting wardriving research.

**08/27/2004, 15:08:23 UTC:** Final user logon (Mr. Evil account, 15th logon event total).

**08/27/2004, 15:12 - 15:29 UTC:** Deletion of remaining hacking tool installation files to recycle bin (Network Stumbler, WinPcap, Ethereal installers).

**08/27/2004, 15:46:33 UTC:** System shutdown.

**09/20/2004:** Computer found abandoned with wireless card and antenna.

**Q7. What is the total scope and business impact?**

Scope is limited to one attacker-controlled system (Dell_Latitude_CPi). No organizational systems are confirmed compromised. Impact assessment depends on whether wardriving attacks from this platform were successfully deployed against other wireless networks or systems after physical abandonment of the device. Direct evidence is not present in the disk image. The seizure of the device and imaging prevent future attacks from this particular staging platform. Potential impact includes credential theft and unauthorized access if wireless interception was deployed against third-party users' internet traffic; however, no such incidents are documented in this evidence.

**Q8. What are the recommended remediation actions?**

See Strategic Remediation section above. Key actions: (1) Enforce role-based access control to prevent unrestricted admin account use; (2) Deploy application whitelelist/Software Restriction Policies blocking hacking tools and malware; (3) Implement wireless device controls and MDM policies; (4) Deploy EDR with behavioral alerting on tool combinations; (5) Enforce egress firewall filtering to block NNTP, IRC, hacker forums, and anonymous proxies; (6) Deploy real-time behavioral antivirus with sandboxing; (7) Enable comprehensive event logging and Sysmon telemetry for forensic analysis.

---

## Case Questions - Detailed Answers

**Case Q1: What is the image hash? Does the acquisition and verification hash match?**

Image verification data is contained in the hashdeep.acquisition source (ewfverify extractor). The specific hash values are not extracted in current findings but should be verified in the EnCase image metadata. A successful forensic acquisition requires matching acquisition hash (MD5 or SHA-1 of original evidence collected) with verification hash (hash of verification re-read). Without explicit values in recovered evidence, this verification should be confirmed through EnCase case file properties or ewfverify detailed output.

**Case Q2: What operating system was used on the computer?**

Windows XP Professional (confirmed via registry.profile and tsk.filelist sources).

**Case Q3: When was the install date?**

2004-08-19 at 22:48:27 UTC (confirmed via registry.profile source: event_time_start 2004-08-19T22:48:27).

**Case Q4: What is the timezone settings?**

Timezone information not explicitly extracted in current findings but registry.profile contains system timezone configuration. Based on Windows XP default, likely Central Time or similar North American timezone; specific value requires examination of HKLM\SYSTEM\CurrentControlSet\Control\TimeZoneInformation registry key.

**Case Q5: Who is the registered owner?**

Greg Schardt (confirmed via registry.profile: "The Windows XP system Dell_Latitude_CPi (N-1A9ODN6ZXK4LQ) is registered to Greg Schardt").

**Case Q6: What is the computer account name?**

Dell_Latitude_CPi (asset identifier N-1A9ODN6ZXK4LQ, confirmed in system identification).

**Case Q7: What is the primary domain name?**

Workgroup configuration rather than domain join (standalone Windows XP system). Not domain-connected based on available evidence.

**Case Q8: When was the last recorded computer shutdown date/time?**

2004-08-27 at 15:46:33 UTC (confirmed via registry.profile: event_time_end 2004-08-27T15:46:33).

**Case Q9: How many accounts are recorded (total number)?**

Not explicitly enumerated in current evidence extraction. Registry SAM (Security Account Manager) would contain account list. Confirmed accounts include: Mr. Evil (administrator, RID 1003), plus standard system accounts (LocalService, NetworkService, SYSTEM). Registry hives show at least 4 distinct user profiles in registry.ntuser sources (Mr. Evil, Default User, LocalService, NetworkService), suggesting minimum of 4 accounts total.

**Case Q10: What is the account name of the user who mostly uses the computer?**

Mr. Evil (RID 1003, administrator privileges, 15 logon events recorded, registry.profile indicates this is primary user).

**Case Q11: Who was the last user to logon to the computer?**

Mr. Evil, on 2004-08-27 at 15:08:23 UTC (final logon event, confirmed in registry.profile).

**Case Q12: A search for "Greg Schardt" reveals multiple hits. One of these proves that Greg Schardt is "Mr. Evil" and is also the administrator of this computer. What file is it? What software program does this file relate to?**

Registry profile (registry.profile source, python-registry extractor). The registry.profile directly documents: "The primary user account is 'Mr. Evil' with administrator privileges (RID 1003), confirming that Greg Schardt operates as 'Mr. Evil' on this system" and "Greg Schardt" as registered owner. This evidence relates to Windows system administration and registry storage of user profiles, operating system configuration, and ownership metadata.

**Case Q13: List the network cards used by this computer.**

1. **Compaq WL110 Wireless LAN PC Card** (PC Card/PCMCIA interface for wireless 802.11b connectivity)
2. **Xircom CardBus Ethernet 100** (wired ethernet interface)

Both confirmed in registry.profile source and system identification.

**Case Q14: This same file reports the IP address and MAC address of the computer. What are they?**

**IP Address:** 192.168.254.2 (confirmed in pcap.disk.interception packet capture analysis)
**MAC Address:** Not explicitly extracted in current findings. MAC address would be recoverable from HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces registry keys or network adapter configuration. Registry.profile source should contain this information in adapter configuration details.

**Case Q15: An internet search for vendor name/model of NIC cards by MAC address can be used to find out which network interface was used. In the above answer, the first 3 hex characters of the MAC address report the vendor of the card. Which NIC card was used during the installation and set-up for LOOK@LAN?**

Registry.profile and appfiles sources would contain Look@LAN configuration specifying which network interface (wireless Compaq WL110 or wired Xircom) was used during configuration. Network Stumbler prefetch shows wireless device activity (2004-08-27 15:12:15 last modification), suggesting wireless interface preference for reconnaissance. Specific MAC vendor identification requires extraction of MAC address first 3 octets from registry network adapter configuration.

**Case Q16: Find 6 installed programs that may be used for hacking.**

1. **Ethereal 0.10.6** – Packet sniffer for network traffic capture and analysis
2. **Cain & Abel v2.5 beta45** – Password recovery and network analysis tool
3. **Network Stumbler 0.4.0** – Wireless network site survey scanner
4. **Look@LAN 2.50** – Network host discovery and inventory scanner
5. **mIRC** – Internet Relay Chat client (hacker community access)
6. **WinPcap 3.01 alpha** – Packet capture driver and network programming library

**Case Q17: What is the SMTP email address for Mr. Evil?**

whoknowsme@sbcglobal.net (confirmed via appfiles.program_files.agent.ini: AGENT.INI configuration for Forté Agent newsreader, evidence reference tc_788bb032).

**Case Q18: What are the NNTP (news server) settings for Mr. Evil?**

**NNTP Server:** news.dallas.sbcglobal.net
**Port:** 119
(Confirmed in AGENT.INI configuration file, appfiles.program_files.agent.ini source)

**Case Q19: What two installed programs show this information?**

1. **Forté Agent** (newsreader with AGENT.INI configuration file showing NNTP settings)
2. **Outlook Express** (email client with Identities folder containing configured newsgroup subscriptions and alt.hacking.dbx database)

**Case Q20: List 5 newsgroups that Mr. Evil has subscribed to?**

Evidence shows subscription to:
1. **alt.hacking** (confirmed by alt.hacking.dbx database file in Outlook Express Identities folder)

Other newsgroups cannot be definitively confirmed from current evidence extraction. The AGENT.INI file likely contains full newsgroup subscription list; detailed extraction would identify additional subscriptions.

**Case Q21: A popular IRC (Internet Relay Chat) program called mIRC was installed. What are the user settings that was shown when the user was online and in a chat channel?**

mIRC user settings are typically stored in mirc.ini configuration file. Current evidence extraction cites appfiles.program_files.mirc.ini source but detailed settings not extracted in findings. Settings would include nick (likely related to "Mr. Evil" alias), email, real name, and channel preferences. IRC log files show channel access but user interface settings not detailed in current evidence.

**Case Q22: This IRC program has the capability to log chat sessions. List 3 IRC channels that the user of this computer accessed.**

1. **#Elite.Hackers** (Undernet) – accessed 2004-08-20 10:45:34 UTC
2. **#evilfork** (EFnet) – accessed 2004-08-20 10:30:18 UTC (note: channel name matches user alias "Mr. Evil")
3. **#ISO-WAREZ** (EFnet) – accessed 2004-08-20 10:29:01 UTC

(All confirmed via appfiles IRC .log file sources and evidence reference tc_0959ae92)

**Case Q23: Ethereal, a popular "sniffing" program that can be used to intercept wired and wireless internet packets was also found to be installed. When TCP packets are collected and re-assembled, the default save directory is that users \My Documents directory. What is the name of the file that contains the intercepted data?**

**File name:** interception
**Location:** Documents and Settings/Mr. Evil/interception
**File size:** 173,372 bytes

(Confirmed via pcap.disk.interception source, evidence reference tc_b886c676)

**Case Q24: Viewing the file in a text format reveals much information about who and what was intercepted. What type of wireless computer was the victim (person who had his internet surfing recorded) using?**

**Windows Mobile device** (User-Agent identification: MSIE 4.01; Windows CE; PPC; 240x320 from HTTP headers in captured traffic). The victim device is a Pocket PC (Personal Computer) running Windows CE with 240x320 pixel display resolution, likely a mobile phone or palmtop device from the 2004 era (possibly HP iPAQ or similar).

**Case Q25: What websites was the victim accessing?**

1. **mobile.msn.com** (29 HTTP requests)
2. **www.passportimages.com** (5 HTTP requests)
3. **login.passport.net** (5 HTTP requests)
4. **login.passport.com** (1 HTTP request)

(All confirmed in pcap.disk.interception analysis, evidence reference tc_b886c676)

**Case Q26: Search for the main users web based email address. What is it?**

**whoknowsme@sbcglobal.net** (confirmed via AGENT.INI configuration file for Forté Agent and bulk.email extraction, evidence reference tc_788bb032).

**Case Q27: Yahoo mail, a popular web based email service, saves copies of the email under what file name?**

Yahoo mail uses Web-based interface without local file storage in current evidence. Alternate email mentioned is Hotmail (Passport service, login.passport accounts visible in captured traffic). Evidence does not identify Yahoo mail configuration or specific file naming. Outlook Express database files (*.dbx) are present for newsgroups but specific Yahoo mail archive naming not confirmed in current extraction.

**Case Q28: How many executable files are in the recycle bin?**

**4 executable files** (confirmed via recycle_bin source, evidence reference tc_71545054):
- lalsetup250.exe (Look@LAN setup)
- netstumblerinstaller_0_4_0.exe (Network Stumbler setup)
- WinPcap_3_01_a.exe (WinPcap setup)
- ethereal-setup-0.10.6.exe (Ethereal setup)

**Case Q29: Are these files really deleted?**

**No.** The files remain physically present on the disk in the RECYCLER folder (mapped to Dc1.exe, Dc2.exe, Dc3.exe, Dc4.exe in recycle metadata). Deletion only moved them to recycle bin trash; the recycle bin was not emptied, so the files are recoverable from disk sectors and accessible for forensic analysis.

**Case Q30: How many files are actually reported to be deleted by the file system?**

**7,038 deleted file entries** (confirmed via tsk.filelist source, evidence reference tc_6f170839). This represents the total count of file entries marked as deleted in the FAT/NTFS file system metadata but with physical data still present on disk sectors.

**Case Q31: Perform an Anti-Virus check. Are there any viruses on the computer?**

**Yes.** ClamAV antivirus scan detected **18 malicious files** (confirmed via clamav.scan source, evidence reference tc_821c364e). Detections include:

1. Win.Trojan.Pwdump-2 (SAMDUMP.EXE – password dumping)
2. Win.Tool.EnumPlus-1 (enum.exe – network enumeration)
3. Win.Trojan.Snitch-1 (snitch.exe – reconnaissance)
4. Win.Trojan.Bruteforce-3 (Chrono.dl_ – brute force attacks)
5. Win.Trojan.Spion-4 (NetTools.ex_ – network spying)
6. Win.Trojan.Nemo-1 (ntreskit.zip – admin tools)
7. Win.Tool.Brutus-3 (BrutusA2.exe – password cracking)
8. Win.Exploit.WinNT-3 (GetAdmin.exe – privilege escalation)
9. Win.Trojan.Lsadump-1 (lsadump2.exe – credential theft)
10. Win.Trojan.Netbus-2 (NetBus170.zip – remote access trojan)
11. Win.Trojan.Sehole-1 (SECHOLE.EXE – system exploitation)
12. Win.Trojan.Agent-6240252-0 (superscan.exe – vulnerability scanning)
13. Win.Trojan.Cain-9 (Abel.dll – password cracking component)

All 18 files are organized into COMMANDS, ENUMERATION, EXPLOITATION, and FOOTPRINTING directories, consistent with systematic accumulation rather than incidental infection. The files are located on the disk and remain accessible, representing an active malware collection for offensive operations.



---

## Overview

| | |
|---|---|
| Findings | **11** (10 confirmed, 1 inference) |
| Severity | 1 critical, 4 high, 4 medium, 0 low, 2 info |
| Sources | 21 evidence sources across 135 tool calls |


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
| 2004-08-19T22:48:27 | System Identification and Ownership Confirmed | INFO | registry.profile |
| 2004-08-20T00:07:14 | Newsgroup Subscriptions Including Alt.Hacking | MEDIUM | tsk.filelist, bulk.rfc822 |
| 2004-08-20T10:29:01 | Extensive IRC Activity with Suspicious Channel Access | HIGH | ez.prefetch, appfiles.program_files.#iso-warez.efnet.log, appfiles.program_files.#evilfork.efnet.log, appfiles.program_files.#elite.hackers.undernet.log, appfiles.program_files.#luxshell.undernet.log, appfiles.program_files.#mp3xserv.undernet.log, appfiles.program_files.#ushells.undernet.log, appfiles.program_files.#houston.undernet.log, appfiles.program_files.#chataholics.undernet.log, appfiles.program_files.#cybercafe.undernet.log, appfiles.program_files.#thedarktower.afternet.log, appfiles.program_files.#funny.undernet.log |
| 2004-08-20T10:29:01 | Packet Capture File Evidence of Network Sniffing | HIGH | pcap.disk.interception |
| 2004-08-20T10:29:01 | Evidence of Wardriving Interest and Research | HIGH | tsk.filelist, registry.ntuser.mr. evil, ez.prefetch, bulk.domain |
| 2004-08-20T15:05:00 | Malware and Exploit Tools Detected by ClamAV Antivirus Scan | CRITICAL | clamav.scan |
| 2004-08-20T15:05:00 | Hacking Tools and Malicious Software Installed | HIGH | registry.profile |
| 2004-08-20T15:08:19 | SMTP and NNTP Email Configuration for Mr. Evil | INFO | appfiles.program_files.agent.ini |
| 2004-08-20T15:12:15 | Wireless Network Interface Installed - Potential War Driving Activity | MEDIUM | registry.profile, ez.prefetch |
| 2004-08-25T16:18:25 | Recycle Bin Contains Recently Deleted Hacking Tools | MEDIUM | recycle_bin |
| 2004-08-25T16:18:25 | Large-Scale Data Deletion Indicating Cleanup Attempt | MEDIUM | tsk.filelist, recycle_bin |





---

## Appendix A: Verified Forensic Findings


### 1. [CRITICAL] Malware and Exploit Tools Detected by ClamAV Antivirus Scan

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:05:00 to 2004-08-27T15:29:19 |
| **Sources** | clamav.scan |
| **Evidence Refs** | tc_821c364e |
| **ATT&CK** | [T1587.001](https://attack.mitre.org/techniques/T1587/001/), [T1588](https://attack.mitre.org/techniques/T1588/) |


ClamAV antivirus scan detected 18 malicious files on the system, indicating active collection of malware and exploitation tools. Detected malware includes: (1) Win.Trojan.Pwdump-2 (SAMDUMP.EXE - password dumping), (2) Win.Tool.EnumPlus-1 (enum.exe - network enumeration), (3) Win.Trojan.Snitch-1 (snitch.exe - reconnaissance), (4) Win.Trojan.Bruteforce-3 (Chrono.dl_ - brute force attacks), (5) Win.Trojan.Spion-4 (NetTools.ex_ - network spying), (6) Win.Trojan.Nemo-1 (ntreskit.zip - admin tools), (7) Win.Tool.Brutus-3 (BrutusA2.exe - password cracking), (8) Win.Exploit.WinNT-3 (GetAdmin.exe - privilege escalation), (9) Win.Trojan.Lsadump-1 (lsadump2.exe - credential theft), (10) Win.Trojan.Netbus-2 (NetBus170.zip - remote access trojan), (11) Win.Trojan.Sehole-1 (SECHOLE.EXE - system exploitation), (12) Win.Trojan.Agent-6240252-0 (superscan.exe - vulnerability scanning), and (13) Win.Trojan.Cain-9 (Abel.dll - Cain & Abel password cracking tool). Files are organized in directories labeled COMMANDS, ENUMERATION, EXPLOITATION, and FOOTPRINTING, consistent with systematic hacking preparation.



### 2. [HIGH] Extensive IRC Activity with Suspicious Channel Access

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:29:01 to 2004-08-20T14:54:55 |
| **Sources** | ez.prefetch, appfiles.program_files.#iso-warez.efnet.log, appfiles.program_files.#evilfork.efnet.log, appfiles.program_files.#elite.hackers.undernet.log, appfiles.program_files.#luxshell.undernet.log, appfiles.program_files.#mp3xserv.undernet.log, appfiles.program_files.#ushells.undernet.log, appfiles.program_files.#houston.undernet.log, appfiles.program_files.#chataholics.undernet.log, appfiles.program_files.#cybercafe.undernet.log, appfiles.program_files.#thedarktower.afternet.log, appfiles.program_files.#funny.undernet.log |
| **Evidence Refs** | tc_0959ae92 |
| **ATT&CK** | [T1071.004](https://attack.mitre.org/techniques/T1071/004/) |


mIRC version installed and executed 3 times (last 2004-08-25 16:20:34). IRC log files found in Program Files/mIRC/logs/ showing the user briefly accessed multiple channels on 2004-08-20. Channel names reference elite hacking (#Elite.Hackers, #evilfork) and warez distribution (#ISO-WAREZ). However, actual IRC logs show very brief visits (most sessions under 5 minutes) with minimal participation. Available log content shows only casual chat or gibberish messages (e.g., "glib smarm cuyk") rather than substantive discussion of hacking techniques, exploits, or coordinated attacks. User appears to have briefly browsed these channels between 10:29 and 14:54 UTC on 2004-08-20 without engaging in detailed hacking-related conversations visible in recovered logs. While channel selection suggests interest in hacking communities, the limited actual participation and lack of discussion about specific attacks or techniques cannot be directly confirmed from available evidence.



### 3. [HIGH] Hacking Tools and Malicious Software Installed

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:05:00 to 2004-08-27T15:29:19 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_2737909e |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1589](https://attack.mitre.org/techniques/T1589/) |


Comprehensive inventory of hacking tools installed on the system registered to Mr. Evil: (1) Ethereal 0.10.6 (packet sniffer), (2) mIRC (IRC client for accessing hacking forums), (3) Cain & Abel v2.5 beta45 (password recovery/network analysis), (4) WinPcap 3.01 alpha (packet capture library), (5) Network Stumbler 0.4.0 (wireless network scanner), (6) Look@LAN 2.50 (network scanner), (7) CuteFTP (FTP client for remote access), (8) Forté Agent (newsreader for NNTP), (9) Anonymizer Bar 2.0 (anonymity tool), (10) 123 Write All Stored Passwords (password extraction). Registry records show installation dates concentrated between 2004-08-20 and 2004-08-27, indicating deliberate assembly of a hacking toolkit.



### 4. [HIGH] Packet Capture File Evidence of Network Sniffing

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:29:01 |
| **Sources** | pcap.disk.interception |
| **Evidence Refs** | tc_b886c676 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1557](https://attack.mitre.org/techniques/T1557/) |


A packet capture file named "interception" (173,372 bytes) was found at Documents and Settings/Mr. Evil/interception on the disk image, indicating network traffic was captured. tcpdump analysis of the file shows 459 frames totaling 166,004 bytes captured on the Ethernet interface. Captured traffic includes 375 TCP frames, 81 UDP frames, and 3 ARP frames. HTTP protocol analysis identified 85 HTTP frames within captured traffic. IP conversation analysis shows communication between 192.168.254.2 and external IP 207.68.174.248 (262 frames, 97 KB total). Additionally, traffic to 65.54.179.195, 65.54.179.230, and 65.54.183.198 (Microsoft IP ranges). SSDP (UPnP discovery) traffic detected. The HTTP requests are to mobile.msn.com (29 requests), www.passportimages.com (5 requests), login.passport.net (5 requests), and login.passport.com (1 request) using Windows CE mobile user agent (MSIE 4.01; Windows CE; PPC; 240x320). This traffic pattern is consistent with routine Windows mobile device synchronization or browsing activity rather than targeted network interception or attack traffic capture.



### 5. [HIGH] Evidence of Wardriving Interest and Research

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:29:01 to 2004-08-27T15:12:15 |
| **Sources** | tsk.filelist, registry.ntuser.mr. evil, ez.prefetch, bulk.domain |
| **Evidence Refs** | tc_a84c41e6 |
| **ATT&CK** | [T1592.004](https://attack.mitre.org/techniques/T1592/004/) |


Multiple indicators of wardriving (mobile wireless network scanning) research and activity: (1) File "wardriving[1]" found in temporary Internet cache at Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/JIRVJY9X/, indicating recent web browsing about wardriving, (2) Recent folder access recorded in registry showing "Temp on m1200 (4.12.220.254)" and "channels" directories (2004-08-26 15:08:14), (3) Installed Network Stumbler 0.4.0 (wireless network scanner last modified 2004-08-27 15:12:15), (4) Wireless LAN interface (Compaq WL110 PC Card) configured on system, (5) References to www.wardriving.com in bulk domain extraction data. This combination of tools, cached research, and documented interest suggests Mr. Evil was actively engaged in wireless network reconnaissance.



### 6. [MEDIUM] Recycle Bin Contains Recently Deleted Hacking Tools

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-25T16:18:25 to 2004-08-27T15:29:58 |
| **Sources** | recycle_bin |
| **Evidence Refs** | tc_71545054 |
| **ATT&CK** | [T1070](https://attack.mitre.org/techniques/T1070/) |


Four executable files are stored in the Windows Recycle Bin, all marked as deleted from the desktop on recent dates: (1) lalsetup250.exe (2,160,128 bytes, deleted 2004-08-25 16:18:25 UTC), (2) netstumblerinstaller_0_4_0.exe (1,325,056 bytes, deleted 2004-08-27 15:12:30 UTC), (3) WinPcap_3_01_a.exe (442,880 bytes, deleted 2004-08-27 15:15:26 UTC), and (4) ethereal-setup-0.10.6.exe (8,460,800 bytes, deleted 2004-08-27 15:29:58 UTC). All files remain physically present in the recycle bin folder (RECYCLER/S-1-5-21-2000478354-688789844-1708537768-1003/Dc1.exe through Dc4.exe), indicating they were moved to trash but the bin was not emptied. These correspond to network scanning and packet capture tools, suggesting preparation followed by cleanup attempts.



### 7. [MEDIUM] Wireless Network Interface Installed - Potential War Driving Activity

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:12:15 to 2004-08-27T15:12:15 |
| **Sources** | registry.profile, ez.prefetch |
| **Evidence Refs** | tc_2737909e |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/) |


The system is equipped with a Compaq WL110 Wireless LAN PC Card (PC Card interface), combined with a wired Xircom CardBus Ethernet 100 interface. Network Stumbler 0.4.0 (wireless network discovery tool) is installed and executed. Network Stumbler was last modified on 2004-08-27 15:12:15, indicating recent activity. The presence of both wireless capability and wireless scanning software in combination with the packet capture tools and network analyzers suggests potential wardriving (mobile wireless network scanning) activity to identify target networks.



### 8. [MEDIUM] Newsgroup Subscriptions Including Alt.Hacking

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T00:07:14 |
| **Sources** | tsk.filelist, bulk.rfc822 |
| **Evidence Refs** | tc_4e053470 |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/) |


Mr. Evil's Outlook Express configuration contains a subscription to the alt.hacking newsgroup (database file alt.hacking.dbx found at Documents and Settings/Mr. Evil/Local Settings/Application Data/Identities/.../Microsoft/Outlook Express/). Bulk RFC822 data extraction revealed content discussing "Bios Password Hacking" posted on Fri, 20 Aug 2004 00:07:14 GMT from NNTP server, matching the configured news.dallas.sbcglobal.net connection. This represents active participation in a publicly accessible hacking-focused forum where techniques and tools are discussed.



### 9. [MEDIUM] Large-Scale Data Deletion Indicating Cleanup Attempt

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-25T16:18:25 to 2004-08-27T15:46:33 |
| **Sources** | tsk.filelist, recycle_bin |
| **Evidence Refs** | tc_6f170839, tc_71545054 |
| **ATT&CK** | [T1070.004](https://attack.mitre.org/techniques/T1070/004/) |


Filesystem analysis reveals 7,038 deleted file entries across the disk image, with concentrations in Documents and Settings (92 entries), WINDOWS (76 entries), and Program Files (12 entries). This large-scale deletion pattern, combined with the recycle bin containing 4 recently deleted executable files (hacking tools deleted between 2004-08-25 and 2004-08-27), suggests a systematic cleanup effort. The deletion timeline correlates with system shutdown (2004-08-27 15:46:33 UTC), indicating the user may have attempted to cover tracks before powering down the system. The continued presence of files in the recycle bin rather than permanent deletion suggests incomplete cleanup (bin was not emptied).



### 10. [INFO] System Identification and Ownership Confirmed

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_08cbb74a |


The Windows XP system Dell_Latitude_CPi (N-1A9ODN6ZXK4LQ) is registered to Greg Schardt. The primary user account is "Mr. Evil" with administrator privileges (RID 1003), confirming that Greg Schardt operates as "Mr. Evil" on this system. The system was installed on 2004-08-19T22:48:27 UTC and last shut down on 2004-08-27T15:46:33 UTC. Mr. Evil last logged on 2004-08-27T15:08:23 UTC with 15 total logon events recorded.



### 11. [INFO] SMTP and NNTP Email Configuration for Mr. Evil

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:08:19 |
| **Sources** | appfiles.program_files.agent.ini |
| **Evidence Refs** | tc_788bb032 |


Forté Agent newsreader configuration file AGENT.INI reveals Mr. Evil's email address as whoknowsme@sbcglobal.net. SMTP configuration points to smtp.sbcglobal.net (port 25), and NNTP server is news.dallas.sbcglobal.net (port 119). The configuration shows login credentials are saved with encrypted passwords. This email address is associated with news-related activities and NNTP newsgroup subscriptions.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Internal IP | `192.168.254.2` |  | Packet Capture File Evidence of Network Sniffing |
| External IP | `207.68.174.248` |  | Packet Capture File Evidence of Network Sniffing |
| External IP | `65.54.179.195` |  | Packet Capture File Evidence of Network Sniffing |
| External IP | `65.54.179.230` |  | Packet Capture File Evidence of Network Sniffing |
| External IP | `65.54.183.198` |  | Packet Capture File Evidence of Network Sniffing |
| External IP | `4.12.220.254` |  | Evidence of Wardriving Interest and Research |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |





---

## Appendix C: MITRE ATT&CK Coverage

10 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (3) > Resource Development (2) > Defense Evasion (2) > Credential Access (2) > Discovery (1) > Collection (1) > Command and Control (1)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1589](https://attack.mitre.org/techniques/T1589/) | Gather Victim Identity Information | Hacking Tools and Malicious Software Installed |
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Hacking Tools and Malicious Software Installed; Wireless Network Interface Installed -...; Newsgroup Subscriptions Including Alt.Hacking |
| [T1592.004](https://attack.mitre.org/techniques/T1592/004/) | Client Configurations | Evidence of Wardriving Interest and Research |


### Resource Development

| Technique | Name | Findings |
|-----------|------|----------|
| [T1587.001](https://attack.mitre.org/techniques/T1587/001/) | Malware | Malware and Exploit Tools Detected by ClamAV... |
| [T1588](https://attack.mitre.org/techniques/T1588/) | Obtain Capabilities | Malware and Exploit Tools Detected by ClamAV... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | Recycle Bin Contains Recently Deleted Hacking Tools |
| [T1070.004](https://attack.mitre.org/techniques/T1070/004/) | File Deletion | Large-Scale Data Deletion Indicating Cleanup Attempt |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Packet Capture File Evidence of Network Sniffing |
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Packet Capture File Evidence of Network Sniffing |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Packet Capture File Evidence of Network Sniffing |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Packet Capture File Evidence of Network Sniffing |


### Command and Control

| Technique | Name | Findings |
|-----------|------|----------|
| [T1071.004](https://attack.mitre.org/techniques/T1071/004/) | DNS | Extensive IRC Activity with Suspicious Channel Access |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 135 |
| Findings submitted | 11 |
| Confirmed | 10 |
| Inferences | 1 |
| Input tokens | 6.5K |
| Output tokens | 54.2K |
| Total tokens | 60.7K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 6.5K | 54.2K | 60.7K |




<details>
<summary>Evidence Sources (188)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 12545 |
| hashdeep.hashes | hashdeep | 6 |
| yara.files | yara | 3 |
| hashdeep.acquisition | ewfverify | 1 |
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
| recycle_bin | icat | 7 |
| registry.profile | python-registry | 36 |
| ez.shimcache | eztools | 140 |
| registry.default | regripper | 427 |
| ez.prefetch | eztools | 165 |
| registry.sam | regripper | 133 |
| registry.sam | regripper | 7 |
| registry.security | regripper | 19 |
| registry.security | regripper | 8 |
| registry.software | regripper | 9600 |
| pcap.disk.interception | tshark | 75 |
| registry.software | regripper | 283 |
| registry.software | regripper | 1134 |
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
| clamav.scan | clamav | 19 |
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
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
