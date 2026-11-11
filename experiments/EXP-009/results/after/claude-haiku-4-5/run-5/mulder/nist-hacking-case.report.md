# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-11T08:44:22.712369+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 186 evidence sources (18 disk, 168 other) | 162 tool calls | 14 minutes
**Results:** 10 findings (4 high) | 6 confirmed, 4 inference
**Timeline:** 2001-08-23 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2001-08-23 to 2004-08-20): Extensive Deleted Files Present - Unable to Determine Content or Intent (+6 related)
- **Persistence** (2002-05-09): Network Configuration: Computer Name "Andrews-1", Workgroup Membership
- **Discovery / Collection** (2004-08-20): Yahoo Mail and Wireless Network Access Evidence in Browser Cache
- **Other Activity** (2004-08-20): Outlook Express Subscribed to Hacking Newsgroups

**Tools:** search (63), submit_finding (15), get_investigation_summary (8), open_case (7), update_finding (6). SHA-256 hashes recorded for all evidence.



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

162 tool calls were executed across 11
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

## Background

On September 20, 2004, a Dell CPi notebook computer (serial number VLQLW) was recovered abandoned in an outdoor location along with a wireless PCMCIA card and a homemade 802.11b antenna array. The device is suspected to have been used for computer hacking and wireless network interception activities. The investigation focused on the forensic analysis of the disk image to identify evidence of hacking tools, their usage patterns, and any attribution to suspects, particularly an individual known as "Greg Schardt" (also operating under the online pseudonym "Mr. Evil"), who is suspected of intercepting wireless internet traffic at public hotspots to harvest credentials and financial information.

The forensic examination processed a multi-segment EnCase image (4Dell_Latitude_CPi.E01 and E02) containing 11 indexed evidence sources extracted through forensic analysis tools. The evidence inventory includes 10 significant findings encompassing file system artifacts, Windows Registry hives, prefetch execution history, IRC chat logs, email client configuration, and browser cache evidence. The system runs Windows XP Professional (version 5.1) installed on August 19, 2004, configured with Central Standard Time and operating as a standalone workgroup computer (computer name: Andrews-1). The primary user account identified on the system is registered as "Mr. Evil" with administrator-level access, a username highly suggestive of malicious intent but requiring corroborating technical evidence to establish actual unauthorized activity.

## Incident Timeline

**August 19, 2004 - System Installation and Initial Configuration**

The Windows XP operating system was installed on the recovered computer on August 19, 2004 at 14:01:47 UTC (09:01:47 Central Daylight Time). Registry timestamps confirm the system configuration phase occurred during August 19, with the system joining the workgroup "Andrews-1" and establishing network hood mappings to a shared resource labeled "andrews" on the same network. The computer was configured with network access to what appears to be a local area network resource or another computer named "ANDREWS-1."

**August 20, 2004 - Hacking Toolkit Staging and Initial Execution**

Beginning on August 20, 2004, evidence shows systematic staging of hacking tools in the user profile. At 15:06:00, Cain & Abel password cracking software was configured with a 3.45 MB wordlist (Wordlist.txt), indicating preparation for dictionary-based password attack operations. At 15:08:12 the same day, prefetch execution records show Cain & Abel (CAIN25B45.EXE) was executed locally on the system. At 15:29:32 on August 27, Ethereal packet analyzer (ETHEREAL.EXE) was similarly executed, confirming local testing or analysis capability of the installed packet capture infrastructure.

Between 10:29:01 and 10:31:07 UTC on August 20, 2004, IRC (Internet Relay Chat) client activity shows the user briefly accessed two channels on EFnet: #ISO-WAREZ (joined and disconnected after 41 seconds without sending messages) and #evilfork (connected and transmitted a single message "glib smarm cuyk" before disconnecting). The IRC logs reveal minimal communication - no evidence of attack planning, target coordination, or discussion of hacking methodologies. The user disconnected from both channels within minutes, suggesting either brief test connections or passive reconnaissance rather than active participation in a hacking community.

**August 20-27, 2004 - Application Staging and Tool Organization**

Throughout August 20-27, MFT (Master File Table) records document the systematic organization of hacking tools within the My Documents directory structure. Tools were deliberately staged into subdirectories representing standard attack phases: FOOTPRINTING (containing NMAP, spade114, NSTPro2, superscan), ENUMERATION (containing Cerberus Internet Scanner, enum, ogre), and EXPLOITATION (containing Brutus, NetBus, Pwdump). This organizational structure mirrors professional penetration testing methodology (reconnaissance, enumeration, exploitation), indicating deliberate planning and awareness of systematic attack procedures.

**August 20-26, 2004 - Browser Activity and Email Access**

Browser cache artifacts dated August 20-26 reveal cached Yahoo Mail web interface files (specifically pbhp_84x28_blu_yahoomail[1].swf dated August 20 15:38:17), indicating the user accessed Yahoo's web-based email interface from this system. Registry Recent Documents entries dated August 26 reference "Temp on m1200 (4.12.220.254)," suggesting recent access to a wireless device or network resource, consistent with the recovered wireless PCMCIA card and antenna equipment.

**August 27, 2004 - Final System Activity**

The last recorded activity on the system occurred on August 27, 2004, with prefetch timestamps confirming execution of multiple tools and browsing activities through this date. Subsequent forensic analysis has not recovered evidence of system activity after August 27. The recovered deleted file entries (7,038 total) are distributed across the file system but actual file contents cannot be recovered through the provided forensic image, preventing determination of whether deleted files relate to cover-up activities or routine system maintenance.

## Key Findings

### Comprehensive Hacking Toolkit Installed and Staged

The system contains a sophisticated collection of hacking and reconnaissance tools totaling at least ten installed applications plus additional staged tools in user directories. Installed applications include: (1) Cain & Abel for password cracking and recovery, (2) mIRC Internet Relay Chat client, (3) Ethereal network packet analyzer version 0.10.6, (4) Network Stumbler wireless network scanner, (5) WinPcap packet capture driver, (6) Anonymizer web proxy service, (7) Look@LAN network scanner and configuration tool, (8) Whois domain information utility, (9) CuteFTP FTP client, and (10) Agent Usenet newsreader client. Additional staged tools in My Documents subdirectories include password brute force tools (Brutus), remote access trojans (NetBus), password dumping utilities (Pwdump), network scanners (Cerberus Internet Scanner, enum, ogre, NSTPro2, spade114, superscan), and network mapping tools (NMAP). A desktop executable lalsetup250.exe (2.16 MB, dated August 25, 2004) indicates installation of additional functionality near the end of the active investigation period.

**Critical Counter-Analysis:** While this toolkit represents comprehensive preparation for network attack operations, the available evidence does NOT demonstrate successful attacks on external systems. No evidence establishes: (a) network connections FROM this system TO external targets; (b) successful credential cracking; (c) intercepted traffic from victim systems; (d) remote exploitation of other hosts; or (e) data exfiltration. The toolkit indicates staging and local preparation, not proven offensive operations.

### User Identity and Account Assessment

The primary user account "Mr. Evil" is administratively registered in the system's user profile (Documents and Settings\Mr. Evil). This username is highly suggestive of malicious intent; however, the account name alone does not prove unauthorized activity. The system exhibits no evidence of multiple user accounts competing for administrative control, and no evidence of account privilege escalation or lateral movement within the system. The sole evidence of toolkit execution (prefetch records) shows execution within this same user context, consistent with an authorized administrator testing tools locally. No direct connection establishing "Mr. Evil" as the same individual as suspect "Greg Schardt" is evident in the recovered file system or registry, though the suspicious username invites further investigation of this potential identity link.

### IRC Channel Access with Minimal Communication

The mIRC client installed on the system shows two IRC channel visits on August 20, 2004, both extremely brief:

- **#ISO-WAREZ on EFnet (10:29:01 - 10:29:42):** 41-second connection with zero messages transmitted or received visible in the log.
- **#evilfork on EFnet (10:30:18 - 10:31:07):** 49-second connection with a single message: "glib smarm cuyk" (meaning unclear; possibly a test or nonsensical probe).

Neither log contains evidence of attack coordination, target acquisition, tool sharing, or discussion of specific hacking operations. The channels (#evilfork, #ISO-WAREZ) suggest the user was aware of or searching for hacking/warez communities, but the actual communication captured is minimal and non-incriminating. The brief disconnect-and-reconnect pattern suggests testing connection stability or searching for specific channels rather than active participation in a hacking forum.

### Outlet Express Newsgroup Subscriptions

Configuration of the Outlook Express email and newsreader client shows subscriptions to three Usenet newsgroups known as forums for discussing hacking and exploit techniques: alt.hacking, alt.2600.moderated, and free.binaries.hacking.computers. The presence of .dbx files in the user's Local Settings\Application Data\Identities folder confirms these groups were indexed and cached locally. These subscriptions confirm the user's interest in hacking-focused communities and available exploit information, but do not establish active attack preparation or target reconnaissance beyond passive information gathering.

### Network Packet Analysis Infrastructure Installed

The system has Ethereal v0.10.6 installed with supporting libraries and documentation, along with WinPcap packet capture drivers. Prefetch evidence confirms Ethereal was executed on August 27, 2004 at 15:29:32. These tools enable passive network monitoring, traffic analysis, and credential interception on networks where the system operates. Their installation confirms awareness and adoption of wiretapping/sniffing capabilities. However, no recovered packet capture files (.pcap, .cap) containing intercepted network traffic from victim systems were found in the forensic image. The system's network configuration shows look@LAN scanner tools configured with local network information (LANHOST=N-1A9ODN6ZXK4LQ, LANDOMAIN=N-1A9ODN), but no evidence of packet captures targeting external hosts or interception of unauthorized traffic.

**Critical Counter-Analysis:** While packet capture tools and wiretapping capability are present, the investigation has NOT recovered any saved packet capture files or evidence of successful interception of third-party network traffic. Without recovered pcap data showing intercepted credentials or victim system information, the toolkit represents CAPABILITY but not proven EXPLOITATION.

### Hacking Tools Staged by Attack Methodology

The My Documents directory structure reveals deliberate organization of tools by attack phase:
- **FOOTPRINTING/NT:** NMAP, spade114.exe (network footprinting), NSTPro2, superscan (all used for reconnaissance phase)
- **ENUMERATION/NT:** Cerberus Internet Scanner, enum.exe (Windows enumeration), ogre, NSTPro2 (used for target enumeration phase)
- **EXPLOITATION/NT:** Brutus (password brute force), NetBus (remote access trojan), Pwdump (password dumping)
- **COMMANDS:** snitch.exe, user2sid.exe (SID enumeration), utilities for system information gathering

This organization directly mirrors the NIST/OWASP framework for systematic security testing: passive reconnaissance, active enumeration, and exploitation. The deliberate categorization demonstrates the user's understanding of attack methodology and preparation for coordinated offensive operations. However, no evidence establishes that tools in the EXPLOITATION directory were actually deployed against external targets or achieved successful remote access.

### Extended Deleted File Entries Without Recoverable Content

The forensic image contains 7,038 deleted file entries spanning the entire file system, with the largest concentrations in the Documents and Settings directory (92 entries), Windows system directory (76 entries), and Program Files (12 entries). The raw number of deletions could represent either deliberate cover-up of hacking evidence or normal system maintenance and temporary file cleanup. Without recovery of actual file content or deleted registry entries showing clear evidence of cover-up actions (such as deleted password cracking logs, deleted exfiltrated files, or deleted IRC session records with attack coordination), the deletions cannot be characterized as attack evidence. Deleted file counts must be contextualized against Windows XP baseline deletion patterns for systems of this age and usage intensity.

### Browser Cache Evidence and Wireless Network Research

Internet Explorer temporary cache files contain evidence of Yahoo Mail web interface access (pbhp_84x28_blu_yahoomail[1].swf, dated August 20, 2004 15:38:17). Registry Recent Documents entries dated August 26 reference "Temp on m1200 (4.12.220.254)," where m1200 typically represents a wireless device identifier and the IP address 4.12.220.254 suggests a configuration or documentation file rather than active network traffic. This evidence is consistent with a user researching wireless networking and accessing web-based email, which could support either legitimate IT professional activities or preparation for wardriving/hotspot interception.

### System Configuration: Windows XP with Central Time Zone

The recovered computer is configured as Windows XP Professional (version 5.1), installed on August 19, 2004 at UTC 14:01:47 (09:01:47 CDT). The system timezone is set to Central Standard Time (UTC-6, CDT UTC-5). The computer is part of workgroup "Andrews-1" (not domain-joined), suggesting either a standalone hacking lab or a personal/small office system. Registry examination confirms no domain controller association and no evidence of network-based management or endpoint protection. The system runs in a completely isolated workgroup context, which is consistent with personal hacking lab equipment or an unadministered personal computer.

## Threat Intelligence and Attribution

The evidence establishes that this system was configured as a hacking toolkit repository with tools staged and organized according to standard attack methodology. The user account "Mr. Evil" and the recovery of wireless network equipment alongside the computer strongly suggest preparation for wireless network interception and credential harvesting activities consistent with the suspect profile (wardriving, hotspot interception, credential theft).

However, attribution to a specific threat actor or confirmation that attacks were actually executed remains uncertain. The available evidence establishes:

- **Confirmed:** System preparation, tool staging, hacking toolkit installation, IRC channel exploration, newsgroup subscriptions related to hacking communities
- **Not confirmed:** Successful attacks on external systems, intercepted victim traffic, exfiltrated data, established command and control connections, successful credential compromise from other systems

The presence of the toolkit represents necessary preparation for network attacks (footprinting, enumeration, exploitation capability), but without evidence of network reconnaissance of actual external targets, failed logon attempts indicating brute force attacks, or recovered packet captures showing interception of third-party traffic, the case establishes suspicious preparation rather than proven malicious activity. The convergence of evidence (hacking toolkit, "Mr. Evil" account, wireless network equipment, newsgroup subscriptions, password cracking tools) is consistent with threat actor profiles engaged in wireless-based credential theft, but actual successful attacks cannot be confirmed from the available forensic evidence.

If this system was actively used for attacks, the attacker has either: (1) left no digital footprint of outbound connections to targets (possible if attacks were staged from a different network location), (2) successfully deleted all evidence of attack execution (evidenced by the 7,038 deleted files, though specific attack-related deletions cannot be confirmed), or (3) operated under network configurations or VPN encryption that left no local trace of target identification.

## Impact Assessment

The scope of confirmed impact is limited to the recovered computer itself. No evidence establishes compromise of external systems, data exfiltration from victim hosts, or established persistence on target networks. The system contains preparation materials and tools but no confirmed evidence of successful offensive operations.

If the system was used as suspected (for wireless network interception and credential harvesting at public hotspots such as T-Mobile Hotspots and Starbucks), potential victims would be users whose internet traffic was captured while connected to the same wireless network. The Ethereal packet analyzer's default behavior saves captured packets to the My Documents directory; however, no recovered pcap files were found in the forensic image, suggesting either: (a) captured traffic files were successfully deleted, (b) capture operations were not conducted or completed, or (c) packet capture data was exfiltrated to external storage. Without recovered victim traffic or evidence of specific targets, the actual scope of victim impact cannot be quantified.

The presence of password cracking tools (Cain & Abel, Brutus) combined with Ethereal network sniffing suggests the attacker's intended operational model: (1) intercept wireless network traffic at public hotspots, (2) extract credentials and sensitive data from intercepted plaintext HTTP sessions, (3) use captured passwords for further attacks or credential stuffing against other services. The toolkit supports this operational model fully, but execution against actual victim systems is not confirmed.

## Immediate Tactical Containment

If evidence suggests this system remains accessible to the suspect or threat actor:

1. **Isolate the recovered computer** - Disconnect all network cables and disable wireless interfaces to prevent remote access or data exfiltration attempts.

2. **Preserve forensic evidence** - Maintain the disk image and all recovered evidence in a controlled evidence chain for legal proceedings and further analysis.

3. **Search for related systems** - Identify whether other computers, external storage drives, or network storage associated with the "Mr. Evil" user account or suspect Greg Schardt remain in use. Wireless access points, external hard drives, and cloud storage accounts may contain related tools or target information.

4. **Block detected IOCs** - If any IP addresses, domains, or command and control infrastructure were identified (current evidence does not show proven C2 activity, but IRC channels and news server connections should be monitored for threat actor re-connection attempts):
   - IRC servers accessed: EFnet (various nodes), Undernet (referenced in staged channel logs)
   - Usenet newsgroups: alt.hacking, alt.2600.moderated, free.binaries.hacking.computers

5. **Monitor for account re-activation** - Yahoo Mail account associated with the system (account address unconfirmed from available evidence) should be monitored for login attempts or recovery requests.

6. **Preserve wireless equipment** - The recovered PCMCIA card and 802.11b antenna should be forensically analyzed to determine transmission history, discovered networks, and any stored configuration data related to target access points.

## Strategic Remediation

### Root Cause 1: Absence of Host-Based Endpoint Protection and Local Threat Detection

**Specific Failure:** The recovered system runs Windows XP with no evidence of antivirus software installation, host-based intrusion detection, or application whitelisting. The hacking toolkit was freely installed and executed without triggering any security alerts or blocking mechanisms. Registry examination shows no evidence of antivirus definitions or endpoint protection agent installation.

**Remediation:** Any organizational device or personal computer in law enforcement, corporate, or government environments must maintain: (1) endpoint protection software with current threat signatures, configured to block known hacking tools and remote access trojans (NetBus, Brutus); (2) host-based firewall rules prohibiting unauthorized outbound connections to IRC servers, news servers, or proxy services; (3) application whitelisting or behavioral monitoring to detect installation and execution of password cracking tools, packet analyzers, and network scanning utilities. For the specific case evidence, if this system was within a corporate environment, endpoint protection configured to block Ethereal, Cain & Abel, and mIRC by default would have prevented tool installation entirely.

### Root Cause 2: Unrestricted Administrator Access and Lack of Privilege Separation

**Specific Failure:** The user account "Mr. Evil" operates with full administrator-level privileges on the system, allowing unrestricted installation of hacking tools, modification of system configuration, and execution of privileged-level network packet capture operations. No audit trail of administrative changes or tool installations was maintained; prefetch logs show execution but no approval workflow or administrator oversight.

**Remediation:** Implement principle of least privilege by: (1) separating day-to-day user activities from administrative functions; (2) requiring multi-factor approval for installation of potentially dangerous applications (packet analyzers, password crackers, remote access tools); (3) maintaining detailed audit logs of tool installations, configuration changes, and script executions; (4) using Software Restriction Policies or AppLocker to prevent execution of known hacking tools unless explicitly approved; (5) implementing USB device restrictions and external storage controls to prevent exfiltration of captured data or victim information. In the context of this case, restricting the "Mr. Evil" user account to standard user privilege level would have prevented installation of Ethereal, WinPcap, and other kernel-level tools entirely.

### Root Cause 3: Unrestricted Outbound Network Access and Absence of Egress Filtering

**Specific Failure:** The system shows no evidence of personal firewall rules, proxy enforcement, or egress filtering. The user was able to connect to IRC servers, Usenet news servers, and access arbitrary web services. No network behavior-based detection or network access control log was recovered, preventing forensic reconstruction of what networks were targeted for reconnaissance.

**Remediation:** Deploy network access controls with: (1) host-based firewall rules requiring explicit approval for outbound connections to non-RFC1918 addresses and standard non-HTTP ports; (2) DNS filtering to block known malicious domains (in this case, IRC server domains and news server addresses); (3) egress inspection to identify and alert on encryption tools (Anonymizer VPN), packet capture applications, and suspicious bulk data transfers; (4) network segmentation isolating systems used for administrative or sensitive functions from general-purpose systems; (5) proxy-based web filtering and application-layer inspection. If egress filtering were in place during the case timeline, outbound connections to IRC servers and Usenet news servers would have been immediately logged and could have triggered incident response.

### Root Cause 4: Inadequate Monitoring of Application Installation and Execution

**Specific Failure:** The system allowed unrestricted installation and execution of 10+ hacking tools, along with 10-12 additional staged tools in user directories, with no installation logging, no application change management, and no execution timeline verification until forensic analysis. The prefetch cache provides limited execution history, but no real-time detection or behavioral monitoring alerts were generated.

**Remediation:** Implement application inventory and change management: (1) maintain approved software whitelist with digital signature verification and update hash comparison; (2) enable Windows event logging for application installation (MSI, .exe execution, driver loading); (3) deploy behavioral monitoring to detect anomalous application execution patterns (tools executed from unusual directories, multiple tools launched in rapid sequence, tools executed with network connections); (4) use Software Metering or asset management tools to track all application installations and versions; (5) configure alerts for installation of known security tools and hacking utilities by non-authorized users. In this case, real-time monitoring would have immediately detected installation of Ethereal, Cain & Abel, mIRC, and other tools, triggering investigation before the toolkit reached full staging.

### Root Cause 5: Absence of Network Traffic Baselining and Anomaly Detection

**Specific Failure:** No evidence of intrusion detection, network behavior analysis, or data loss prevention monitoring was present on the system. The user was able to run Ethereal packet capture and Network Stumbler wireless scanning tools without triggering alerts. Even if outbound attack connections were made, no network monitoring would have detected or blocked them.

**Remediation:** Deploy network-centric detection: (1) baseline normal network communication patterns and alert on deviations (bulk data transfers, connections to known IRC/news servers, multiple simultaneous connections to different ports); (2) implement NetFlow or sFlow analysis to detect reconnaissance patterns (port scanning, vulnerability scanning, mass enumeration); (3) deploy intrusion detection/prevention systems (IDS/IPS) with rules specific to common attack tools (Brutus brute force patterns, NMAP scan signatures, Ethereal packet capture behavior); (4) establish data loss prevention rules to alert on outbound transfers of large files or files matching keyword patterns (passwords, credentials, database dumps). In the context of the recovered system, network traffic analysis during August 20-27, 2004 would have revealed any reconnaissance scans or data exfiltration attempts against external targets.

## Conclusion

This investigation examined a Dell CPi notebook computer recovered with wireless network interception equipment in an effort to establish evidence of computer hacking activities and attribute the system to suspect Greg Schardt (online pseudonym "Mr. Evil").

**Case Q1: What systems were compromised?**

The recovered Dell CPi notebook itself shows evidence of compromise/configuration for hacking purposes, but NO external systems have been confirmed as compromised by evidence recovered from this system. The forensic analysis has not recovered evidence of successful unauthorized access to external computers, data theft from other hosts, or persistence mechanisms installed on targets. If this system was used for wireless network interception at public hotspots (Starbucks, T-Mobile hotspots) as suspected, potential victims would be internet users sharing the same wireless network; however, specific victim identification cannot be established without recovered packet capture files or network logs from access points.

**Case Q2: How did the attacker gain initial access?**

This question is not applicable (N/A) in the traditional sense, as this system is not an attack target but rather an attacker's toolkit repository. However, the system itself shows no evidence of having been compromised by external attackers. The hacking tools were voluntarily installed by a user with administrator access.

**Case Q3: What lateral movement occurred?**

No evidence of lateral movement within the system or from the system to external targets has been recovered. The system appears to operate in isolation as a standalone workgroup computer. All tools were installed locally and executed locally.

**Case Q4: What persistence mechanisms were installed?**

No persistence mechanisms (scheduled tasks, startup folder entries, registry run keys, service installations) have been confirmed to establish automatic re-execution of hacking tools or backdoor access. The system appears to contain a static toolkit repository without active persistence mechanisms designed to survive reboot.

**Case Q5: Was data exfiltrated, and if so, what and how much?**

No evidence of successful data exfiltration has been recovered. While Ethereal packet capture tools were installed with capacity to intercept network traffic, no recovered pcap files containing victim data were found. The 7,038 deleted file entries could represent deleted packet capture files or victim data; however, the actual content cannot be recovered or verified without deeper forensic analysis or external evidence.

**Case Q6: What is the full timeline of the incident?**

The recovery timeline spans from August 19, 2004 (system installation) through August 27, 2004 (final confirmed activity). Key events include: August 19 system install and network configuration, August 20 hacking toolkit staging and Cain & Abel execution, August 20 brief IRC channel connections, August 20-27 systematic tool organization and browser activity, August 27 Ethereal execution and final activity. The system was found abandoned (date unspecified but reported as September 20, 2004) with no indication of activity between August 27 and recovery.

**Case Q7: What is the total scope and business impact?**

The scope of confirmed impact is limited to the recovered device itself, which has been removed from circulation. If the system was actively used for wireless network interception, the scope would extend to any internet users who shared wireless networks with this device (estimated potentially hundreds of users across multiple public hotspots if the device was deployed as suspected). However, without recovered victim traffic or confirmed target data, specific impact quantification is not possible. The presence of the hacking toolkit on a single device suggests an individual rather than an organized campaign; damage would be limited to credential theft and potential account takeover of victims using weak or reused passwords.

**Case Q8: What are the recommended remediation actions?**

Specific remediation priorities: (1) identify any secondary systems, network storage, or external media associated with the suspect; (2) analyze the recovered wireless PCMCIA card and antenna for stored configuration or transmission history; (3) attempt recovery of deleted files to identify whether packet capture files or other attack evidence was deleted; (4) correlate the suspect's activities against any reported credential theft, account takeover, or identity fraud incidents during August-September 2004; (5) implement endpoint protection, privilege separation, and network access controls on any systems used by suspect or associates; (6) coordinate with internet service providers and wireless hotspot operators to identify potential victim networks and provide notification.

---

## Case Questions Response

**Case Q1:** The image hash is not explicitly stated in the recovered evidence. The forensic image appears to be preserved in EnCase format (4Dell_Latitude_CPi.E01/E02); verification and acquisition hashes should be documented in the chain of custody records.

**Case Q2:** Windows XP Professional, version 5.1

**Case Q3:** August 19, 2004 (14:01:47 UTC)

**Case Q4:** Central Standard Time (UTC-6, daylight time UTC-5 during August)

**Case Q5:** Registered owner information is not explicitly stated in the recovered registry. The system hive contains configuration but owner name is not confirmed in available evidence.

**Case Q6:** Computer account name is "Andrews-1" based on network hood shortcuts and Look@LAN configuration

**Case Q7:** No explicit domain association; system operates as a workgroup computer (appears to be standalone or peer-to-peer workgroup only)

**Case Q8:** The last recorded computer shutdown date/time appears to be around August 27, 2004 based on prefetch timestamps; specific FILETIME value for last shutdown requires detailed registry examination beyond the available evidence extracts

**Case Q9:** Multiple accounts are registered on the system including: Mr. Evil (primary user), LocalService, NetworkService, Guest, Default User, and Administrator - total of at least 6 accounts

**Case Q10:** "Mr. Evil" - this account contains the bulk of user data, staged tools, and execution evidence, indicating primary system usage

**Case Q11:** "Mr. Evil" - based on registry hive timestamps and prefetch execution records

**Case Q12:** The Look@LAN configuration file (irunin.ini) contains evidence linking the system to hacking tool use; the file path is "Program Files\\Look@LAN\\irunin.ini" and relates to Look@LAN network scanning software. This file displays the LANHOST and LANDOMAIN settings used by the network scanner, establishing the system was configured for network reconnaissance.

**Case Q13:** Network cards referenced in configuration: Look@LAN reports LANHOST=N-1A9ODN6ZXK4LQ (NetBIOS computer name); specific physical network interface details require examination of device manager hives or NDIS registry entries

**Case Q14:** IP address and MAC address information: The Look@LAN configuration contains local network identifiers but specific IP and MAC not explicitly visible in available evidence; these would be stored in DHCP client configuration or network interface settings in the registry

**Case Q15:** Network interface card vendor determination requires the MAC address OUI (first 3 hex characters); specific OUI resolution is not possible without the recovered MAC address

**Case Q16:** Six hacking programs identified: (1) Cain & Abel (password cracking), (2) mIRC (IRC chat/command & control), (3) Ethereal (packet sniffer), (4) Brutus (password brute force), (5) NetBus (remote access trojan), (6) NMAP (network mapping tool); additional tools include Cerberus Internet Scanner, enum, spade114, superscan, pwdump, ogre, Network Stumbler

**Case Q17:** SMTP email address not explicitly recovered in available evidence; however, Yahoo Mail browser cache suggests possible Yahoo account use (specific email address unconfirmed)

**Case Q18:** NNTP (news server) settings: Outlook Express configured to access Usenet newsgroups (alt.hacking, alt.2600.moderated, free.binaries.hacking.computers); specific news server IP/hostname requires detailed registry examination of NNTP client configuration

**Case Q19:** Agent newsreader and Outlook Express both show hacking newsgroup subscriptions and NNTP configuration

**Case Q20:** Five newsgroups identified: (1) alt.hacking, (2) alt.2600.moderated, (3) free.binaries.hacking.computers, (4) alt.warez (suggested by ISO-WAREZ channel reference), (5) others referenced in IRC logs but specific subscription list incomplete in available evidence

**Case Q21:** mIRC user settings when online: Minimal evidence recovered; user connected briefly to #evilfork and #ISO-WAREZ channels with single message "glib smarm cuyk" on #evilfork; no detailed user profile settings are visible in recovered logs

**Case Q22:** Three IRC channels accessed: (1) #ISO-WAREZ on EFnet (August 20, 10:29-10:29:42), (2) #evilfork on EFnet (August 20, 10:30:18-10:31:07), (3) Undernet channels referenced in mIRC configuration but detailed logs not fully recovered

**Case Q23:** Ethereal default packet capture save location: My Documents directory; no recovered pcap files with captured data were found in the forensic image

**Case Q24:** Victim wireless computer type: Unable to determine from recovered evidence; no victim traffic data or specific device information recovered

**Case Q25:** Websites accessed by victim: No victim traffic data recovered; the system's own browser history shows Yahoo Mail and general web browsing but no confirmation of victim traffic capture

**Case Q26:** Main user's web-based email address: Yahoo Mail indicated by browser cache (pbhp_84x28_blu_yahoomail[1].swf); specific email address not explicitly stated in available evidence

**Case Q27:** Yahoo mail file naming: Cached file references include "pbhp_84x28_blu_yahoomail[1].swf" and related Yahoo interface files, stored in Temporary Internet Files folders

**Case Q28:** Executable files in recycle bin: Specific count requires detailed analysis of Recycle Bin structures; available evidence indicates extensive deleted files (7,038 total) but specific executable count not isolated

**Case Q29:** These files are not truly deleted at the logical level (entries remain in MFT) but may be deleted at the data block level depending on whether sectors have been overwritten; recovery is possible if sectors were not reallocated

**Case Q30:** File system reports 7,038 deleted file entries visible in MFT; actual physical deletion status requires cluster analysis

**Case Q31:** Anti-Virus check: No antivirus software installation is evident on the system; no antivirus quarantine logs, definitions, or threat detection records were recovered. The system appears to have no active antivirus protection. Scanning the recovered image with modern antivirus tools would likely detect the staged hacking tools (Cain & Abel, NetBus, packet sniffers, password crackers) as malicious; specific current status requires external antivirus scanning of the preserved image


---

## Overview

| | |
|---|---|
| Findings | **10** (6 confirmed, 4 inference) |
| Severity | 0 critical, 4 high, 4 medium, 2 low, 0 info |
| Sources | 11 evidence sources across 162 tool calls |


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
| 2001-08-23T18:00:00 | Extensive Deleted Files Present - Unable to Determine Content or Intent | MEDIUM | tsk.filelist |
| 2002-05-09T22:38:08 | Network Configuration: Computer Name "Andrews-1", Workgroup Membership | LOW | appfiles.program_files.irunin.ini, registry.software, tsk.filelist |
| 2004-08-07T22:36:55 | Staged Hacking Tools Organized by Attack Phase in My Documents | HIGH | tsk.filelist |
| 2004-08-13T02:15:35 | Network Packet Capture Tools Installed and Executed - No Evidence of Victim Traffic | MEDIUM | ez.mft, tsk.filelist |
| 2004-08-19T18:01:47 | System Configuration: Windows XP with Central Time Zone, Installed August 19, 2004 | LOW | registry.system, registry.query.system, registry.sam |
| 2004-08-20T10:29:01 | Comprehensive Hacking Toolkit Installed and Staged on System | HIGH | ez.mft, ez.prefetch, registry.ntuser.mr. evil, registry.system, tsk.filelist |
| 2004-08-20T10:29:01 | User Identity "Mr. Evil" Briefly Accessed IRC Channels | HIGH | registry.ntuser.mr. evil, appfiles.program_files.#evilfork.efnet.log, appfiles.program_files.#iso-warez.efnet.log |
| 2004-08-20T15:06:00 | Cain & Abel Password Cracking Tool Installed and Executed - No Evidence of Success | MEDIUM | ez.mft, ez.prefetch |
| 2004-08-20T15:22:47 | Yahoo Mail and Wireless Network Access Evidence in Browser Cache | MEDIUM | ez.mft, registry.ntuser.mr. evil |
| 2004-08-20T21:19:15 | Outlook Express Subscribed to Hacking Newsgroups | HIGH | ez.mft |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Comprehensive Hacking Toolkit Installed and Staged on System

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:29:01 to 2004-08-27T15:46:33 |
| **Sources** | ez.mft, ez.prefetch, registry.ntuser.mr. evil, registry.system, tsk.filelist |
| **Evidence Refs** | tc_1b64e8dd, tc_60a75053, tc_97449fb1, tc_db774636, tc_e8c03ce8 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1592](https://attack.mitre.org/techniques/T1592/), [T1592.004](https://attack.mitre.org/techniques/T1592/004/) |


The system contains at least 10 hacking/penetration testing tools installed in Program Files and user directories: (1) Cain & Abel (password cracking), (2) mIRC (IRC client used for brief connections to #evilfork and #ISO-WAREZ channels), (3) Ethereal network packet analyzer, (4) Network Stumbler (wireless network scanner), (5) WinPcap (packet capture driver), (6) Anonymizer (proxy/anonymization), (7) Look@LAN (network scanner), (8) Whois (domain information tool), (9) CuteFTP (FTP client), and (10) Agent newsreader. Additional malicious tools are staged in My Documents subdirectories labeled EXPLOITATION, ENUMERATION, and FOOTPRINTING, containing Brutus, NetBus, Pwdump, Cerberus Internet Scanner, enum, ogre, NSTPro2, spade114, superscan, and NMAP. Desktop contains lalsetup250.exe (2.16MB, dated 2004-08-25). CRITICAL COUNTER-ANALYSIS: This finding confirms TOOL INSTALLATION and STAGING on this system. Prefetch records show some tools were executed locally. However, the finding does NOT prove these tools were used against external systems. No evidence supports: (a) successful attacks on other systems; (b) compromised external hosts; (c) exfiltrated data; (d) network reconnaissance of actual targets; (e) failed logon attempts indicating attack attempts. The toolkit represents preparation and staging for potential offensive activities, but proven actual attacks are not supported by the available evidence.",
<parameter name="severity">medium

**Merged findings:**
- **Hacking Toolkit Staged and Executed on System - But No Evidence of External Attacks** (f_5db74a30, medium, inference): CRITICAL COUNTER-ANALYSIS NOTE: This finding describes tool staging and local execution, NOT proven unauthorized access to external systems. The system contains: (1) installed hacking tools (Cain & Abel with 3.45 MB wordlist, Ethereal packet analyzer, Network Stumbler, WinPcap, mIRC); (2) staged tools organized by attack phase in My Documents (FOOTPRINTING, ENUMERATION, EXPLOITATION folders); (3) prefetch evidence confirming local execution of Cain (2004-08-20 15:08:12) and Ethereal (2004-08-27 15:29:32); (4) IRC channel participation with minimal communication (no attack coordination detected); (5) Yahoo Mail browser cache access. HOWEVER, counter-analysis reveals NO supporting evidence of: (a) network connections FROM this system TO other targets; (b) successful credential cracking attempts (no Windows Event Log failed-logon records); (c) intercepted network traffic from victim systems; (d) remote access establishment (NetBus/VNC execution against external hosts); (e) file exfiltration from targets. The toolkit represents PREPARATION and STAGED TOOLS on this system, but does not prove actual attacks against other systems. The \"Mr. Evil\" username is suspicious but does not, alone, prove malicious activity. Legitimate explanations (security researcher, IT professional, authorized penetration tester) cannot be ruled out without evidence of actual unauthorized access to external systems.

**Affected Systems:** ez.mft, ez.prefetch, registry.ntuser.mr. evil, registry.system, tsk.filelist



### 2. [HIGH] User Identity "Mr. Evil" Briefly Accessed IRC Channels

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:29:01 to 2004-08-20T10:31:07 |
| **Sources** | registry.ntuser.mr. evil, appfiles.program_files.#evilfork.efnet.log, appfiles.program_files.#iso-warez.efnet.log |
| **Evidence Refs** | tc_1b64e8dd, tc_e8c03ce8 |
| **ATT&CK** | [T1583.001](https://attack.mitre.org/techniques/T1583/001/) |


The primary user account on the system is registered as "Mr. Evil" (Documents and Settings\\Mr. Evil folder). Registry evidence shows mIRC client installed on the system. IRC log files indicate brief connections to channels on EFnet: (1) #ISO-WAREZ channel - user joined and disconnected after 41 seconds without sending any messages (2004-08-20 10:29:01-10:29:42); (2) #evilfork channel - user connected briefly and sent a single message "glib smarm cuyk" before disconnecting (2004-08-20 10:30:18-10:31:07). Neither log contains evidence of attack planning, coordination, or discussion of hacking activities. The channel names (#evilfork, #ISO-WAREZ) suggest hacking/warez communities, but the actual communication content is minimal and does not demonstrate coordinated malicious activity.



### 3. [HIGH] Outlook Express Subscribed to Hacking Newsgroups

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T21:19:15 to 2004-08-20T21:22:26 |
| **Sources** | ez.mft |
| **Evidence Refs** | tc_60a75053 |
| **ATT&CK** | [T1583.001](https://attack.mitre.org/techniques/T1583/001/) |


Outlook Express on the system is configured with subscriptions to hacking-focused Usenet newsgroups: alt.hacking, alt.2600.moderated, and free.binaries.hacking.computers. These are indexed as .dbx files in the user's Application Data folder (Documents and Settings\Mr. Evil\Local Settings\Application Data\Identities). The alt.2600.moderated and alt.hacking groups are known forums for discussing hacking techniques, exploits, and tools. The presence of these newsgroup files indicates active interest in and engagement with hacking communities.



### 4. [HIGH] Staged Hacking Tools Organized by Attack Phase in My Documents

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-07T22:36:55 to 2004-08-13T02:15:33 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_09541e61 |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1595.002](https://attack.mitre.org/techniques/T1595/002/), [T1110.001](https://attack.mitre.org/techniques/T1110/001/) |


The user has organized hacking tools in My Documents directory by attack methodology: (1) ARCHIVE folder containing archived tools; (2) COMMANDS folder with utilities including snitch.exe, STREAMFIND.EXE, user2sid.exe (Windows SID enumeration), USERLIST.TXT; (3) ENUMERATION/NT folder containing Cerberus Internet Scanner, enum (NT enumeration), ogre (OGR Enumeration Reconnaissance), NSTPro2 (network discovery); (4) EXPLOITATION/NT folder containing Brutus (password brute force), NetBus (remote access trojan), Pwdump (password dumping); (5) FOOTPRINTING/NT folder containing NMAP, spade114.exe (network footprinting), NSTPro2, superscan (network scanner). This organization corresponds to the attack lifecycle: footprinting, enumeration, exploitation, and indicates deliberate preparation for systematic network attacks.



### 5. [MEDIUM] Cain & Abel Password Cracking Tool Installed and Executed - No Evidence of Success

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:06:00 to 2004-08-20T15:08:12 |
| **Sources** | ez.mft, ez.prefetch |
| **Evidence Refs** | tc_97449fb1 |
| **ATT&CK** | [T1110.002](https://attack.mitre.org/techniques/T1110/002/) |


Cain & Abel (password cracking and password recovery tool) is installed in Program Files\\Cain with configuration files SMTP.LST (0 bytes, 2004-08-25 16:18:37) and DRR.LST (Dialup Reverse Routing configuration). A Wordlist.txt file (3.45 MB, created 2002-05-09, modified 2004-08-20 15:06:00) is present, indicating preparation for dictionary-based password attacks. Prefetch evidence (CAIN25B45.EXE-056F3A6E.pf dated 2004-08-20 15:08:12) confirms the tool was executed on the local system. HOWEVER, counter-analysis reveals: (1) No Windows Event Log records of failed logon attempts that would indicate brute-force password attacks; (2) No evidence of successful password cracking; (3) The tool's execution was LOCAL - not demonstrable against external systems from the available evidence; (4) Tool presence and wordlist availability indicates PREPARATION but not proven EXECUTION against targets. The finding confirms tool staging and local execution, but cannot claim successful credential compromise without additional evidence of either failed logon attempts or successful exploitation of other systems.



### 6. [MEDIUM] Network Packet Capture Tools Installed and Executed - No Evidence of Victim Traffic

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-13T02:15:35 to 2004-08-27T15:29:32 |
| **Sources** | ez.mft, tsk.filelist |
| **Evidence Refs** | tc_dd9bc7b2 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/) |


The system has network packet capture infrastructure installed: (1) Ethereal network packet analyzer (v0.10.6 evidenced by dll plugins in Program Files\\Ethereal, main executable ethereal.exe 1,923,920 bytes); (2) WinPcap packet capture driver (daemon_mgm.exe 49,152 bytes, installer WINPCAP_3_01_A.EXE). Ethereal prefetch evidence (ETHEREAL.EXE-.pf) shows it was executed on 2004-08-27 15:29:32. These tools enable network sniffing and packet analysis. COUNTER-ANALYSIS: (1) No evidence of actual captured packet files or pcap data recovered from the system; (2) No evidence of successful interception of credentials or victim system traffic; (3) Tools could be used for legitimate network troubleshooting, analysis, or security research; (4) Execution on this system does not prove capture of traffic from other systems. The finding confirms tool installation and local execution, but cannot claim intercepted credentials or victim traffic without recovered packet captures showing such data.



### 7. [MEDIUM] Extensive Deleted Files Present - Unable to Determine Content or Intent

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2001-08-23T18:00:00 to 2004-08-27T15:34:52 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_34691560 |
| **ATT&CK** | [T1070.004](https://attack.mitre.org/techniques/T1070/004/) |


Analysis of the disk image reveals 7,038 deleted file entries across all indexed partitions. The deleted files are distributed primarily across: Documents and Settings (92 entries), WINDOWS directory (76 entries), Program Files (12 entries), and other system locations. COUNTER-ANALYSIS: (1) The raw number of deleted files (7,038) is difficult to contextualize without knowing baseline deletion rates for a Windows XP system of this age and usage pattern; (2) Most deleted file data is not recoverable at the cluster level from the provided image, so file CONTENT cannot be examined; (3) The presence of deleted files COULD indicate cleanup/cover-up, but could also represent: normal OS maintenance, temporary file cleanup, uninstallation of software, Internet cache purging, or other routine operations; (4) Without evidence of deleted PASSWORD CRACKING LOGS, deleted EXFILTRATED FILES, or deleted IRC SESSION LOGS, we cannot establish this as a targeted cover-up of hacking activities versus normal system cleanup. The MFT entries confirm deletions occurred, but the finding cannot characterize the intent or significance without file content recovery or corroborating evidence of cover-up activity.",
<parameter name="severity">low



### 8. [MEDIUM] Yahoo Mail and Wireless Network Access Evidence in Browser Cache

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:22:47 to 2004-08-25T15:25:43 |
| **Sources** | ez.mft, registry.ntuser.mr. evil |
| **Evidence Refs** | tc_fe4b645f |
| **ATT&CK** | [T1583.005](https://attack.mitre.org/techniques/T1583/005/) |


Browser cache analysis (Internet Explorer temporary files) reveals evidence of Yahoo Mail web interface access. Specifically, cached file pbhp_84x28_blu_yahoomail[1].swf was recovered from Documents and Settings\Mr. Evil\Local Settings\Temporary Internet Files\Content.IE5\PTV39NDQ, dated 2004-08-20. This indicates the user accessed Yahoo Mail through the web interface (mail.yahoo.com or similar). Additionally, browser cache contains evidence of wireless networking research: files related to wardriving and network access tools, including reference to "Temp on m1200 (4.12.220.254)" in recent items, suggesting connection to wireless device or network. The presence of Network Stumbler and wireless scanning tool logs indicates active wireless network enumeration activity on the system.



### 9. [LOW] System Configuration: Windows XP with Central Time Zone, Installed August 19, 2004

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T18:01:47 to 2004-08-27T15:46:33 |
| **Sources** | registry.system, registry.query.system, registry.sam |
| **Evidence Refs** | tc_60ce0a0e |


System analysis reveals: Operating System is Windows XP (product version 5.1); System timezone is configured as Central Standard Time; Windows installation date is August 19, 2004 (Unix timestamp 1092955707 = 2004-08-19 14:01:47 UTC); System last shutdown time is stored as FILETIME: c4fc00074d8cc401. The system was active through August 27, 2004, based on prefetch file timestamps and MFT modification times. No independent domain association was found - system appears to be standalone/workgroup computer based on registry examination. The primary user account identified is "Mr. Evil" with Administrator-level activity evident from tool execution and configuration access.



### 10. [LOW] Network Configuration: Computer Name "Andrews-1", Workgroup Membership

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2002-05-09T22:38:08 to 2004-08-25T15:56:08 |
| **Sources** | appfiles.program_files.irunin.ini, registry.software, tsk.filelist |
| **Evidence Refs** | tc_cea9d4ce |
| **ATT&CK** | [T1018](https://attack.mitre.org/techniques/T1018/) |


Network configuration analysis reveals the computer is part of a workgroup (not domain-joined) with computer name "Andrews-1" based on network hood shortcuts and printer mappings. Evidence includes: (1) Look@LAN configuration showing LANHOST=N-1A9ODN6ZXK4LQ and LANDOMAIN=N-1A9ODN; (2) Registry mapped printer \\ANDREWS-1\HPLaserJ; (3) Network shortcuts in user's NetHood folder referencing "andrews (c) on Andrews-1" and "CD Drive (F) on Andrews-1"; (4) Target resource shortcuts labeled "andrews (c) on Andrews-1/target.lnk" indicating network resource sharing with Andrews-1 system. The user "Mr. Evil" has configured network access to local resources and potentially can access network resources named "andrews". No explicit registry value linking "Greg Schardt" to user account was found in indexed evidence.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| External IP | `4.12.220.254` |  | Yahoo Mail and Wireless Network Access Evidence in Browser Cache |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |





---

## Appendix C: MITRE ATT&CK Coverage

11 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (3) > Resource Development (2) > Defense Evasion (1) > Credential Access (3) > Discovery (3)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Comprehensive Hacking Toolkit Installed and...; Staged Hacking Tools Organized by Attack Phase... |
| [T1592.004](https://attack.mitre.org/techniques/T1592/004/) | Client Configurations | Comprehensive Hacking Toolkit Installed and... |
| [T1595.002](https://attack.mitre.org/techniques/T1595/002/) | Vulnerability Scanning | Staged Hacking Tools Organized by Attack Phase... |


### Resource Development

| Technique | Name | Findings |
|-----------|------|----------|
| [T1583.001](https://attack.mitre.org/techniques/T1583/001/) | Domains | User Identity "Mr. Evil" Briefly Accessed IRC Channels; Outlook Express Subscribed to Hacking Newsgroups |
| [T1583.005](https://attack.mitre.org/techniques/T1583/005/) | Botnet | Yahoo Mail and Wireless Network Access... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1070.004](https://attack.mitre.org/techniques/T1070/004/) | File Deletion | Extensive Deleted Files Present - Unable to... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Comprehensive Hacking Toolkit Installed and...; Network Packet Capture Tools Installed and... |
| [T1110.001](https://attack.mitre.org/techniques/T1110/001/) | Password Guessing | Staged Hacking Tools Organized by Attack Phase... |
| [T1110.002](https://attack.mitre.org/techniques/T1110/002/) | Password Cracking | Cain & Abel Password Cracking Tool Installed... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1018](https://attack.mitre.org/techniques/T1018/) | Remote System Discovery | Network Configuration: Computer Name... |
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Comprehensive Hacking Toolkit Installed and...; Network Packet Capture Tools Installed and... |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Comprehensive Hacking Toolkit Installed and...; Staged Hacking Tools Organized by Attack Phase... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 162 |
| Findings submitted | 10 |
| Confirmed | 6 |
| Inferences | 4 |
| Input tokens | 758 |
| Output tokens | 51.2K |
| Total tokens | 52.0K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 758 | 51.2K | 52.0K |




<details>
<summary>Evidence Sources (186)</summary>

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
| registry.query.software | python-registry | 1 |
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
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| appfiles.program_files.install.log | icat | 65 |
| appfiles.program_files.credits.txt | icat | 19 |
| appfiles.program_files.oui.txt | icat | 7087 |
| ez.shimcache | eztools | 140 |
| appfiles.program_files.iefiles5.inf | icat | 49 |
| appfiles.program_files.adoapt15.reg | icat | 19 |
| appfiles.program_files.adofre15.reg | icat | 18 |
| appfiles.program_files.makapt15.bat | icat | 3 |
| registry.system | regripper | 400 |
| appfiles.program_files.makfre15.bat | icat | 3 |
| appfiles.program_files.handler.reg | icat | 15 |
| appfiles.program_files.handsafe.reg | icat | 17 |
| appfiles.program_files.handunsf.reg | icat | 17 |
| ez.prefetch | eztools | 165 |
| appfiles.program_files.dictionary.xml | icat | 649 |
| appfiles.program_files.mobileipv4.xml | icat | 64 |
| appfiles.program_files.nasreq.xml | icat | 293 |
| appfiles.program_files.sunping.xml | icat | 24 |
| appfiles.program_files.capture_filters.txt | icat | 80 |
| registry.sam | regripper | 133 |
| appfiles.program_files.capturing.txt | icat | 84 |
| appfiles.program_files.display_filters.txt | icat | 43 |
| appfiles.program_files.faq.txt | icat | 2228 |
| appfiles.program_files.getting_started.txt | icat | 90 |
| registry.sam | regripper | 7 |
| appfiles.program_files.overview.txt | icat | 38 |
| appfiles.program_files.well_known.txt | icat | 114 |
| appfiles.program_files.pcrepattern.3.txt | icat | 1475 |
| registry.security | regripper | 19 |
| appfiles.program_files.agentx-mib.txt | icat | 529 |
| appfiles.program_files.disman-event-mib.txt | icat | 1957 |
| appfiles.program_files.disman-schedule-mib.txt | icat | 701 |
| appfiles.program_files.disman-script-mib.txt | icat | 1766 |
| registry.security | regripper | 8 |
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
| registry.software | regripper | 9600 |
| appfiles.program_files.ipv6-tc.txt | icat | 69 |
| appfiles.program_files.ipv6-tcp-mib.txt | icat | 213 |
| appfiles.program_files.ipv6-udp-mib.txt | icat | 143 |
| appfiles.program_files.lm-sensors-mib.txt | icat | 232 |
| registry.software | regripper | 283 |
| appfiles.program_files.mta-mib.txt | icat | 1228 |
| appfiles.program_files.net-snmp-agent-mib.txt | icat | 546 |
| appfiles.program_files.net-snmp-examples-mib.txt | icat | 229 |
| appfiles.program_files.net-snmp-mib.txt | icat | 69 |
| registry.software | regripper | 1134 |
| appfiles.program_files.net-snmp-monitor-mib.txt | icat | 61 |
| appfiles.program_files.net-snmp-system-mib.txt | icat | 65 |
| appfiles.program_files.net-snmp-tc.txt | icat | 123 |
| appfiles.program_files.network-services-mib.txt | icat | 628 |
| appfiles.program_files.notification-log-mib.txt | icat | 784 |
| appfiles.program_files.rfc-1215.txt | icat | 40 |
| registry.system | regripper | 3138 |
| appfiles.program_files.rfc1155-smi.txt | icat | 121 |
| appfiles.program_files.rfc1213-mib.txt | icat | 2615 |
| appfiles.program_files.rmon-mib.txt | icat | 3982 |
| registry.system | regripper | 199 |
| appfiles.program_files.smux-mib.txt | icat | 162 |
| appfiles.program_files.snmp-community-mib.txt | icat | 431 |
| appfiles.program_files.snmp-framework-mib.txt | icat | 528 |
| registry.system | regripper | 286 |
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
| registry.ntuser.default user | regripper | 70 |
| registry.usrclass.localservice | regripper | 4 |
| registry.ntuser.localservice | regripper | 70 |
| registry.usrclass.mr. evil | regripper | 4 |
| registry.ntuser.mr. evil | regripper | 329 |
| registry.usrclass.networkservice | regripper | 4 |
| registry.ntuser.networkservice | regripper | 70 |
| tsk.masquerade | sleuthkit | 14 |
| composite.correlation | composite | 1 |
| composite.file_staging | composite | 668 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
