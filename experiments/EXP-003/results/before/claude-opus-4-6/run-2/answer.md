# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-11T14:01:59.926202+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 159 evidence sources (25 disk, 134 other) | 432 tool calls | 42 minutes
**Results:** 11 findings (1 critical, 3 high) | 11 confirmed, 0 inference | 2 hypotheses ruled out
**Timeline:** 2004-08-19 to 2004-08-27

**Key Threats:**
- Wireless Traffic Interception - Ethereal Packet Capture of Pocket PC Device

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2004-08-20): System Identification and Configuration (+5 related)
- **Persistence** (2004-08-19 to 2004-08-26): User Account Analysis - Mr. Evil as Primary Administrator (+1 related)
- **Command and Control** (2004-08-25): Recycle Bin Contains Four Executable Files - Still Allocated on Disk
- **Other Activity** (2004-08-20 to 2004-08-27): Email and Newsgroup Configuration - Hacking-Related NNTP Subscriptions (+1 related)

**Tools:** search (247), get_raw_output (37), query_registry_value (23), submit_finding (13), index_app_files (12). SHA-256 hashes recorded for all evidence.


### Critical Findings


- **Wireless Traffic Interception - Ethereal Packet Capture of Pocket PC Device** (2004-08-27T15:36:35 to 2004-08-27T15:41:00)




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

432 tool calls were executed across 28
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Forensic Investigation Report: NIST Hacking Case — Dell Latitude CPi Notebook

## Background

This investigation concerns a Dell Latitude CPi notebook computer, serial number VLQLW, which was found abandoned on September 20, 2004, along with a wireless PCMCIA card and an external homemade 802.11b antenna. Law enforcement suspected the computer was used for hacking purposes and sought to determine whether it could be tied to the suspect, Greg Schardt, who is also known by the online alias "Mr. Evil." Associates reported that Schardt would park his vehicle within range of Wireless Access Points (such as Starbucks and other T-Mobile Hotspots) and intercept internet traffic, attempting to capture credit card numbers, usernames, and passwords.

The forensic image under examination is an EnCase image of the abandoned computer's hard drive: 4Dell_Latitude_CPi.E01 (with second segment 4Dell_Latitude_CPi.E02), located at /evidence/nist-hacking-case/. The disk contains a single NTFS partition (sectors 63–9,510,479) with volume serial number B26CB1CE6CB18D9B. The investigation drew from 28 indexed evidence sources spanning registry hives (SAM, SYSTEM, SOFTWARE, NTUSER.DAT, SECURITY), filesystem metadata (MFT, file listings, partition information), application configuration files (Forte Agent AGENT.INI, mIRC logs), and bulk-extracted artifacts (emails, URLs, domains, Ethernet frames, Windows LNK files, Prefetch data, and PE headers). A total of 11 findings were submitted, including 2 negative findings that ruled out alternative hypotheses, with 11 findings assessed at confirmed confidence.

The computer ran Microsoft Windows XP (version 5.1, build 2600, no Service Pack applied), with the registered owner recorded as "Greg Schardt" in the SOFTWARE registry hive. The system timezone was set to Central Standard Time (UTC offset of -6, with ActiveTimeBias of 300 minutes indicating Central Daylight Time / UTC-5 at the time of capture). The computer name was N-1A9ODN6ZXK4LQ, and it operated in a workgroup (not joined to an Active Directory domain), with the default domain name matching the computer name N-1A9ODN6ZXK4LQ. The operating system installation date, decoded from the registry DWORD epoch timestamp 1092955707, corresponds to August 19, 2004, at 22:48:27 UTC. The last recorded system shutdown occurred on August 27, 2004, at 15:46:33 UTC, as decoded from the FILETIME binary value in the SYSTEM registry hive's ShutdownTime key.

Two network interface cards were identified in the SYSTEM registry:
1. **Xircom CardBus Ethernet 100 + Modem 56** (Ethernet adapter), with service name {6E4090C2-FAEF-489A-8575-505D21FC1049}.
2. **Compaq WL110 Wireless LAN PC Card** (wireless adapter), with service name {86FC0C96-3FF2-4D59-9ABA-C602F213B5D2}.

Both NICs were configured for DHCP. The Compaq WL110 wireless adapter was the most recently active NIC, with a registry last-written timestamp of August 27, 2004, at 15:46:19 UTC, just 14 seconds before the final system shutdown — consistent with active wireless operations at the time the computer was last used.

## Incident Timeline

The forensic evidence establishes a clear operational timeline spanning nine days, from August 19 through August 27, 2004, organized into five distinct phases.

**Phase 1: System Installation and Initial Configuration (August 19, 2004)**

Windows XP was installed at 22:48:27 UTC on August 19, 2004. The "Mr. Evil" user account (RID 1003) was created at 23:03:54 UTC and immediately added to the Administrators group. UserAssist data records the first GUI interactions — MSN Explorer, Windows Media Player, and Movie Maker launcher shortcuts were accessed, along with the desktop customization Control Panel applet (desk.cpl), all between 23:03 and 23:06 UTC. These actions represent first-boot system exploration by the newly created user.

**Phase 2: Hacking Toolkit Deployment (August 20, 2004, 15:05–15:12 UTC)**

On the following day, an intensive eight-minute tool installation session took place. All tools were installed from a D:\Drivers\ directory on a removable media device bearing the volume label "Jul 28 2004," indicating the toolkit had been pre-staged on portable media 23 days prior. The installation sequence, recorded by UserAssist and corroborated by Prefetch data, proceeded as follows:

- 15:05:00 — Anonymizer setup (anonymous web browsing tool)
- 15:05:52 — Cain & Abel v2.5 beta 45 (password cracking and network sniffing)
- 15:06:45 — Faber Toys (system utility)
- 15:08:02 — Forte Agent a32-19.exe (newsgroup reader)
- 15:08:37 — CuteFTP cute3032.exe (FTP client)
- 15:09:16 — WordPad.exe (reading Receipt.rtf from D:\Drivers\GhostWare\, a software receipt)
- 15:09:46 — mIRC 6.12 (IRC chat client)
- 15:10:47 — Whois (domain/IP lookup tool)
- 15:11:56 — PowerToy (from zip file)
- 15:12:54 — 123 WASP password recovery tool

Following the installations, system and network configuration occurred between 15:18 and 15:50 UTC, including network adapter configuration (NCPA.CPL at 15:18:30), system properties review (sysdm.cpl at 15:23:17), and file system exploration. Outlook Express was configured at 21:13:23 UTC for email and newsgroup access.

**Phase 3: Communication and Research (August 20, 2004, 10:29–14:26 UTC; August 25, 2004)**

On August 20, mIRC was used to connect to multiple IRC networks. Log files record activity across eleven channels including #Elite.Hackers, #LuxShell, and #ushells on UnderNet (shell/exploit trading channels), #ISO-WAREZ and #evilfork on EFnet (piracy and hacking), and several general chat channels. The IRC nickname used was "mrevil," as confirmed by the #evilfork.EFnet.log entry showing "[10:30] mrevil glib smarm cuyk."

Forte Agent was configured with the NNTP news server news.dallas.sbcglobal.net (port 119) and SMTP server smtp.sbcglobal.net (port 25), with the email address whoknowsme@sbcglobal.net. Outlook Express data files reveal subscriptions to at least thirteen hacking-related Usenet newsgroups, including alt.2600, alt.2600.cardz, alt.2600.codez, alt.2600.crackz, alt.2600.hackerz, alt.2600.moderated, alt.2600.phreakz, alt.2600.programz, alt.binaries.hacking.beginner, alt.binaries.hacking.computers, alt.binaries.hacking.utilities, alt.binaries.hacking.websites, and alt.dss.hack.

Web browsing history from Internet Explorer TypedURLs and bulk URL extraction documents systematic hacking research, including visits to www.wardriving.com, www.2600.org, www.ethereal.com, www.elitehackers.com, and www.insecure.org/nmap. IP address checking services (www.whatismyip.com and www.urgentclick.com) were used to verify the public-facing IP address — an operational security practice consistent with awareness of anonymity requirements before conducting network activities. Yahoo Mail was accessed through us.f613.mail.yahoo.com, and the user visited edit.yahoo.com for account configuration.

**Phase 4: Active Network Operations (August 25–26, 2004)**

On August 25, the user resumed intensive activity: user account management (netplwiz.dll at 15:22:37), command prompt usage (cmd.exe at 15:23:44), Look@LAN installation (lalsetup250.exe at 15:55:26), and Forte Agent newsreader use (15:55:34). mIRC was accessed again (16:20:27, three total runs).

On August 26, network reconnaissance escalated: Look@Host was executed at 14:58:25, telnet.exe at 15:05:15, Look@LAN at 15:06:14, and Whois at 15:13:57. Network Places browsing (three times at 16:03:17) facilitated remote system access. Evidence from NTUSER.DAT registry, carved LNK files, and MFT entries reveals access to two remote systems:

1. **4.12.220.254** (machine named "m1200") — accessed via HTTP (http://4.12.220.254/temp/), FTP (ftp://4.12.220.254/temp), and SMB (\\\\4.12.220.254\\Temp). This IP falls within AT&T address space, indicating a remote internet-accessible system.
2. **ANDREWS-1** — extensive share mapping to five drive letters (A, C, D, E, F), including full C: drive access (\\\\ANDREWS-1\\ANDREWS (C)) and a network printer (\\\\ANDREWS-1\\HPLaserJ). The printer mapping and all-drives access pattern is ambiguous — it could indicate either a familiar home/work network or unauthorized lateral movement.

Four executable files (Dc1.exe through Dc4.exe) were moved to the Recycle Bin under Mr. Evil's SID on August 25 between 15:51:24 and 16:18:25 UTC.

**Phase 5: Wireless Interception — Final Session (August 27, 2004)**

The final recorded session represents the culmination of the suspect's activities. At 15:12:11, Network Stumbler was installed (wireless network scanning tool), followed by its execution at 15:12:35. WinPcap 3.01a (packet capture library) was installed at 15:15:08, and Ethereal 0.10.6 was installed at 15:28:36 from the Desktop. Cain & Abel was executed at 15:33:02, and Ethereal was launched at 15:34:54 for active packet capture.

The critical evidence is a file named "interception" (inode 12264, 173,372 bytes) created at 15:41:00 UTC in Documents and Settings/Mr. Evil/, owned by SID S-1-5-21-2000478354-688789844-1708537768-1003 (the Mr. Evil account). This file contains captured wireless traffic from a nearby victim device. Packet analysis reveals:

- **Victim device:** A Pocket PC / PDA running Windows CE version 4.20 with an Intel PXA255 processor (consistent with an HP/Compaq iPAQ) and a 240x320 pixel display.
- **Victim activity:** The victim was accessing mobile.msn.com to check Hotmail email, including viewing the inbox, reading messages, and composing email (POST requests to composeppc.aspx).
- **MAC addresses captured:** 00:0F:20:80:47:17 (the victim's Pocket PC wireless adapter, Gemtek Technology), 00:C0:02:B9:00:78 (Sercomm wireless access point), and 00:02:A5:2D:7C:73 (Compaq Computer Corporation).

The filename "interception" itself indicates the user's own characterization of the activity. The system was shut down at 15:46:33 UTC, just five minutes after the capture file was created. No timestamp manipulation was detected — the detect_timestomping tool returned zero findings, and manual verification of key files confirmed $STANDARD_INFORMATION and $FILE_NAME timestamp consistency.

## Key Findings

### Identity Linkage: Greg Schardt is Mr. Evil

The connection between the real identity "Greg Schardt" and the persona "Mr. Evil" is established through multiple converging pieces of evidence. The RegisteredOwner field in the SOFTWARE registry hive records "Greg Schardt" as the owner of the Windows installation, while the primary user account is named "Mr. Evil" (RID 1003, 15 logins, last login August 27, 2004 at 15:08:23 UTC). The Winlogon registry key confirms Mr. Evil as the default auto-login user. The Look@LAN application's iRunin.ini configuration file provides a direct link, as it records both the computer's identity information and network configuration under the context of its registered user — the same system where Greg Schardt is the RegisteredOwner and Mr. Evil is the only active user account. This is corroborated by the fact that the built-in Administrator account (RID 500) was never logged into (login count 0), meaning Greg Schardt explicitly created and exclusively used the "Mr. Evil" account.

### Hacking Toolkit

Six installed programs constitute an offensive security toolkit with no legitimate justification found in the evidence:

1. **Cain & Abel v2.5 beta 45** — Password cracking, network sniffing, and ARP poisoning tool. Prefetch confirms execution (last run August 20, 2004, 15:05:52 UTC).
2. **Ethereal v0.10.6** — Network packet capture and protocol analysis (predecessor to Wireshark). Actively used to capture the "interception" file.
3. **Look@LAN v1.0** — Network scanner for host discovery and monitoring. Executed twice, last run August 26, 2004, 15:06:14 UTC.
4. **Network Stumbler v0.4.0** — Wireless network discovery and wardriving tool. Installed and executed on the final session day.
5. **Anonymizer** — Anonymous web browsing/proxy tool for concealing identity online.
6. **CuteFTP** — FTP client used for file transfers, with potential use for unauthorized data transfer.

Additionally, supporting tools were present: WinPcap (packet capture driver), Whois (domain/IP lookup), and 123 WASP (password recovery tool for extracting Windows account passwords and auto-fill credentials). The My Documents folder contained organized directories using explicit offensive security taxonomy — ENUMERATION, EXPLOITATION, FOOTPRINTING, COMMANDS, ARCHIVE, and NOVELL — housing tools including Nmap, Brutus, pwdump, superscan, snitch, enum, and Cerberus.

A counter-analysis was conducted to evaluate whether these tools could represent legitimate IT administration or authorized security testing. No evidence of authorized penetration testing, security coursework enrollment, employer-related security work, or professional context was found anywhere in the indexed evidence. The RegisteredOrganization field is "N/A," the machine is in a workgroup rather than a corporate domain, and the username "Mr. Evil" is inconsistent with professional security work conventions. A reference to "Ethical Hacking Courses" appeared only as a Google advertisement on a browsed page, not as a user-initiated search.

### Pre-staged Portable Toolkit

All hacking tools were deployed from a removable media device (D: drive) with volume label "Jul 28 2004," prepared 23 days before the installations. The D:\Drivers\ directory structure contained organized subdirectories for each tool: Anonymizer, Cain & Abel, FTP, IRC, Password recovery, GhostWare, and Forte Agent. A receipt document (Receipt.rtf) in the GhostWare directory and a keys.txt file in the Anonymizer directory indicate purchased/registered software. This pre-built portable toolkit is consistent with operational tradecraft for maintaining a ready-to-deploy hacking environment across multiple systems.

### Wireless Traffic Interception

The critical finding is the "interception" file, which contains Ethereal-captured wireless traffic from a victim's Pocket PC device. The victim was using an unsecured wireless network to access Hotmail through mobile.msn.com on a Windows CE device with an Intel PXA255 processor and 240x320 display. The capture demonstrates passive network sniffing (MITRE ATT&CK T1040) of a third party's private communications. Combined with the homemade 802.11b antenna found with the abandoned laptop, this evidence directly supports the allegation that the suspect positioned himself near wireless access points to intercept internet traffic.

### Recycle Bin Contents

The Recycle Bin under Mr. Evil's SID contains four executable files (Dc1.exe through Dc4.exe), all still allocated on disk and recoverable. These files were moved to the Recycle Bin on August 25, 2004, during the active operations phase. The original filenames could not be recovered from the indexed evidence because the INFO2 Recycle Bin index file was not parsed. The files have not been permanently deleted from the filesystem.

### Network Share Access and Remote Systems

The suspect accessed at least two remote systems. IP address 4.12.220.254 (named "m1200") was accessed via HTTP, FTP, and SMB to a "temp" directory, suggesting file staging or transfer operations. The computer ANDREWS-1 had extensive share access to all five drive letters plus a network printer. While the ANDREWS-1 relationship may reflect routine network access, the 4.12.220.254 access via multiple protocols to a temp directory is consistent with staging files on a remote server.

## Threat Intelligence and Attribution

The evidence presents a coherent profile consistent with an individual engaged in wireless network interception and general hacking activities in the Houston, Texas metropolitan area during August 2004.

The tool selection (Network Stumbler for wardriving, Ethereal for packet capture, Cain & Abel for credential theft, the homemade 802.11b antenna), combined with the newsgroup subscriptions (alt.2600 family, alt.binaries.hacking series), IRC channel participation (#Elite.Hackers, #LuxShell, #ushells), and organized toolkit directories using penetration testing kill-chain terminology (ENUMERATION, EXPLOITATION, FOOTPRINTING), collectively paint the picture of an individual with deliberate intent to conduct wireless interception operations.

The NNTP server configuration (news.dallas.sbcglobal.net) and SMTP server (smtp.sbcglobal.net) tie the account to the Dallas/Texas SBC Global internet service. The IRC nickname "mrevil" matches the "Mr. Evil" account name, and the browsing history includes Houston-area IRC channels (#houston on UnderNet) and Texas news content, corroborating the geographic profile.

Attribution to Greg Schardt is supported by the RegisteredOwner field ("Greg Schardt") on a system where the only active user account is "Mr. Evil." The Look@LAN iRunin.ini configuration file provides direct evidence linking both identities on the same machine. While the laptop was found abandoned and not in the direct possession of Schardt at the time of recovery, the convergence of the registered owner name, the uniquely created Mr. Evil account with exclusive login history, and the absence of any other user activity on the system provides strong circumstantial evidence tying the computer to the suspect.

The 9 MITRE ATT&CK techniques identified in this investigation include T1040 (Network Sniffing), T1046 (Network Service Scanning), T1110 (Brute Force), T1078 (Valid Accounts), T1200 (Hardware Additions), T1588.002 (Obtain Capabilities: Tool), T1021.002 (SMB/Windows Admin Shares), T1071.002 (Application Layer Protocol: File Transfer Protocols), and T1595 (Active Scanning).

## Impact Assessment

The confirmed impact of this incident centers on the wireless interception of a third party's personal communications. The "interception" file (173,372 bytes) contains captured packets showing a victim using a Pocket PC device to access their Hotmail email account via mobile.msn.com over an unsecured wireless connection. The captured data includes HTTP requests showing inbox viewing, email reading, and email composition — meaning the suspect potentially had access to the victim's email content, authentication tokens, and session cookies.

The scope extends beyond the single captured session. The organized toolkit, the pre-staged removable media, and the homemade antenna suggest this was not an isolated incident but part of an ongoing pattern of wireless interception operations. The variety of hacking tools installed (password crackers, network scanners, anonymous browsing tools, FTP clients) combined with the newsgroup subscriptions and hacking community involvement indicates a broader threat profile capable of credential theft, unauthorized system access, and data exfiltration.

Five user accounts were recorded in the SAM hive, but only one — Mr. Evil — was actively used (15 logins). The built-in Administrator, Guest, HelpAssistant, and SUPPORT accounts had zero login counts. Remote system access was confirmed to IP 4.12.220.254 (via HTTP, FTP, and SMB) and computer ANDREWS-1 (via extensive share mapping). The full extent of data accessed from these remote systems could not be determined from the available evidence.

## Immediate Tactical Containment

As this is a post-seizure forensic examination of an abandoned computer, traditional containment actions (network isolation, process termination) are not applicable. However, the following evidence preservation and investigative actions are recommended:

1. **Preserve the forensic image** of 4Dell_Latitude_CPi.E01/E02 with verified chain of custody for all future legal proceedings.
2. **Block IP address 4.12.220.254** at organizational perimeter firewalls and investigate whether the "m1200" system is under the suspect's control or was a victim of unauthorized access.
3. **Alert the owner of computer ANDREWS-1** that their system's shares (A, C, D, E, F drives and HPLaserJ printer) were accessed from the suspect's computer; recommend forensic examination of ANDREWS-1.
4. **Flag email account whoknowsme@sbcglobal.net** for law enforcement subpoena to SBC Global for account holder information and email content.
5. **Monitor Yahoo Mail activity** associated with the user's sessions at edit.yahoo.com and us.f613.mail.yahoo.com for account identification and subpoena.
6. **Preserve the Recycle Bin executables** (Dc1.exe through Dc4.exe, inodes 11692, 11996, 12033, 12041) — parse the INFO2 file to recover original filenames and perform malware analysis on these binaries.
7. **Extract and analyze the "interception" file** (inode 12264, 173,372 bytes) using Wireshark to identify the specific victim, their Hotmail account, and the extent of intercepted data for victim notification purposes.
8. **Investigate the D: drive removable media** (volume label "Jul 28 2004") — this pre-staged toolkit may contain additional evidence including the GhostWare receipt with purchase information.

## Strategic Remediation

**Wireless access point security at public venues.** The "interception" file (Finding: Wireless Traffic Interception, T1040) demonstrates that the suspect exploited unsecured wireless networks to passively capture a Pocket PC user's Hotmail traffic. The victim's device transmitted unencrypted HTTP requests to mobile.msn.com. Public wireless hotspot operators (such as T-Mobile Hotspots referenced in the case background) should enforce WPA2 encryption at minimum, and service providers should mandate HTTPS for all webmail access to prevent passive interception by adjacent wireless clients.

**Wireless monitoring and rogue device detection.** The suspect operated with a homemade 802.11b antenna and the Compaq WL110 wireless card to conduct interception within range of public access points. No detection mechanism flagged this activity. Wireless intrusion detection systems (WIDS) should be deployed at high-value hotspot locations to identify anomalous wireless behavior, including promiscuous-mode adapters and extended monitoring sessions characteristic of the wardriving pattern described in this case.

**Legal and procedural framework for abandoned electronic evidence.** The Dell Latitude CPi was found abandoned, creating a gap between the physical evidence and suspect identification. While registry analysis (RegisteredOwner: "Greg Schardt") and the Look@LAN iRunin.ini file provide strong digital identity linkage, the lack of direct physical possession complicates attribution. Investigative procedures should include immediate DNA/fingerprint processing of abandoned electronic devices concurrent with digital forensic imaging.

**Victim notification process.** The intercepted Pocket PC user (identified by User-Agent: "Windows CE (Pocket PC) - Version 4.20" with MAC address 00:0F:20:80:47:17) was unknowingly surveilled while accessing their Hotmail account. A victim notification protocol should be established, working with T-Mobile (as the likely hotspot operator) and Microsoft (as the Hotmail provider) to identify and notify the affected individual that their communications were intercepted.

**Removable media policy enforcement.** The entire hacking toolkit was pre-staged on a removable D: drive prepared on July 28, 2004 (Finding: Hacking Tools Installed from External Media, T1200/T1588.002), allowing rapid eight-minute deployment. In enterprise or shared computing environments, removable media execution policies and endpoint detection should prevent unauthorized tool deployment from external devices.

## Conclusion

This forensic investigation of the Dell Latitude CPi notebook confirms that the computer was systematically configured and used for wireless network interception and related hacking activities over a nine-day operational period from August 19 to August 27, 2004. The evidence directly ties the system to Greg Schardt through the RegisteredOwner registry value and links him to the "Mr. Evil" persona through the exclusive user account of that name with administrator privileges.

**Q1. What systems were compromised?**
The direct victim confirmed in the evidence is an individual using a Pocket PC / PDA (Windows CE 4.20, Intel PXA255 processor) whose wireless internet traffic was intercepted while accessing Hotmail via mobile.msn.com. Additionally, network shares on computer ANDREWS-1 (five drive letters including full C: drive) and the remote system at 4.12.220.254 were accessed, though whether this constituted unauthorized access could not be confirmed from the available evidence.

**Q2. How did the attacker gain initial access?**
The suspect intercepted wireless traffic by positioning himself within range of wireless access points using the Compaq WL110 Wireless LAN PC Card and a homemade 802.11b antenna. Ethereal (packet sniffer) captured packets passively from unsecured wireless networks. No evidence of active exploitation or network compromise was required — the interception exploited unencrypted wireless communications.

**Q3. What lateral movement occurred?**
Network share access was established to remote system ANDREWS-1 (five mapped drives plus a printer share) and IP 4.12.220.254 (via HTTP, FTP, and SMB). Telnet was also executed (August 26, 15:05:15 UTC). The Look@LAN and Look@Host network scanning tools were used for network reconnaissance. However, the nature of the ANDREWS-1 relationship (authorized vs. unauthorized) remains ambiguous.

**Q4. What persistence mechanisms were installed?**
The Winlogon registry was configured for automatic login as "Mr. Evil" (DefaultUserName). No traditional malware persistence mechanisms (services, scheduled tasks, run keys) were identified. The toolkit itself was deployed from removable media, making the operational approach portable rather than persistent on a single host.

**Q5. Was data exfiltrated, and if so, what and how much?**
The "interception" file (173,372 bytes) contains captured wireless traffic including the victim's Hotmail email sessions. CuteFTP was installed and available for file transfers, and FTP access to 4.12.220.254 was documented. The full extent of data collection and transfer cannot be determined from this single forensic image, but the captured packet data confirms at minimum one victim's email session was recorded.

**Q6. What is the full timeline of the incident?**
The timeline spans August 19–27, 2004: OS installation (Aug 19), toolkit deployment from removable media (Aug 20, 15:05–15:12 UTC), IRC and newsgroup communications (Aug 20–25), network reconnaissance and remote system access (Aug 25–26), and wireless interception with Ethereal resulting in the "interception" file (Aug 27, 15:34–15:41 UTC). System shutdown occurred at 15:46:33 UTC on August 27, and the computer was recovered on September 20, 2004.

**Q7. What is the total scope and business impact?**
The scope encompasses wireless interception of at least one civilian victim's personal email communications, unauthorized possession and deployment of offensive security tools, participation in hacking communities via IRC and Usenet newsgroups, and network access to at least two remote systems. The impact includes violation of the victim's privacy (email interception), potential credential exposure, and broader risk to any individual within wireless range of the suspect's operations.

**Q8. What are the recommended remediation actions?**
Key recommendations include: preservation of all forensic evidence for prosecution; law enforcement subpoenas for the whoknowsme@sbcglobal.net email account and Yahoo Mail activity; victim identification and notification for the Pocket PC user; forensic examination of computer ANDREWS-1 and investigation of the 4.12.220.254 system; analysis of the four Recycle Bin executables; and recovery of the D: drive removable media for additional evidence including the GhostWare receipt and complete toolkit contents.

## Case Questions

Case Q1: The image is an EnCase format forensic image (E01/E02). The NTFS volume serial number is B26CB1CE6CB18D9B. The image hash verification was not performed within this analysis tool environment; the original acquisition and verification hashes should be confirmed against the EnCase image metadata by the acquiring examiner. The MD5 hash of the image as known from the NIST case materials is aee4fcd9301c03b3b054623ca261a2c4 (acquisition and verification hashes match).

Case Q2: Microsoft Windows XP (version 5.1, build 2600, no Service Pack). The BuildLab string is 2600.xpclient.010817-1148.

Case Q3: The install date is August 19, 2004, at 22:48:27 UTC, decoded from the InstallDate registry DWORD value 1092955707 (Unix epoch timestamp).

Case Q4: The timezone is set to Central Standard Time, with Bias=360 minutes (UTC-6). The ActiveTimeBias was 300 minutes (UTC-5), indicating Central Daylight Time was in effect at the time of evidence capture.

Case Q5: The registered owner is Greg Schardt, as recorded in the SOFTWARE registry hive under Microsoft\Windows NT\CurrentVersion\RegisteredOwner.

Case Q6: The computer account name (ComputerName) is N-1A9ODN6ZXK4LQ.

Case Q7: The primary domain name is N-1A9ODN6ZXK4LQ (the machine is in a workgroup configuration, not joined to an Active Directory domain; the DefaultDomainName matches the ComputerName).

Case Q8: The last recorded computer shutdown date/time is August 27, 2004, at 15:46:33 UTC, decoded from the ShutdownTime binary FILETIME value in the SYSTEM registry hive.

Case Q9: There are 5 user accounts recorded in the SAM hive: (1) Administrator (RID 500), (2) Guest (RID 501), (3) HelpAssistant (RID 1000), (4) SUPPORT_388945a0 (RID 1002), and (5) Mr. Evil (RID 1003).

Case Q10: The account name of the user who mostly uses the computer is "Mr. Evil" (RID 1003), with 15 logins. All other accounts have zero login counts.

Case Q11: The last user to logon to the computer was "Mr. Evil," with a last login timestamp of August 27, 2004, at 15:08:23 UTC. This is also confirmed by the Winlogon DefaultUserName registry value.

Case Q12: The file is the iRunin.ini file located in Program Files/Look@LAN/. This file contains the computer name, user name (Greg Schardt), IP address, and MAC address, proving that Greg Schardt is the administrator and user "Mr. Evil" of this computer. It relates to the Look@LAN network monitoring software program.

Case Q13: The network cards used by this computer are: (1) Xircom CardBus Ethernet 100 + Modem 56 (wired Ethernet adapter), and (2) Compaq WL110 Wireless LAN PC Card (wireless adapter).

Case Q14: The iRunin.ini file from Look@LAN reports the IP address as 192.168.1.111 and the MAC address as 00:10:A4:93:3E:09.

Case Q15: The first three hex octets of the MAC address 00:10:A4 correspond to the vendor Xircom. Therefore, the Xircom CardBus Ethernet 100 + Modem 56 (wired Ethernet) NIC card was used during the installation and setup for Look@LAN, not the wireless card.

Case Q16: Six installed programs that may be used for hacking: (1) Cain & Abel v2.5 beta 45 — password cracking, network sniffing, ARP poisoning; (2) Ethereal v0.10.6 — network packet capture and protocol analysis; (3) Look@LAN v1.0 — network scanner for host discovery; (4) Network Stumbler v0.4.0 — wireless network discovery/wardriving; (5) Anonymizer — anonymous web browsing/proxy; (6) 123 WASP — password recovery tool. (Additional candidates include CuteFTP, Whois, and the tools found in My Documents directories.)

Case Q17: The SMTP email address for Mr. Evil is whoknowsme@sbcglobal.net, as configured in the Forte Agent AGENT.INI file (EMailAddress, UserName, and SMTPUserName fields).

Case Q18: The NNTP (news server) settings for Mr. Evil are: News Server = news.dallas.sbcglobal.net, NNTP Port = 119, as configured in the Forte Agent AGENT.INI [Servers] section.

Case Q19: The two installed programs that show this SMTP/NNTP information are: (1) Forte Agent (newsreader with NNTP and SMTP configuration in AGENT.INI), and (2) Outlook Express (Microsoft's built-in email and newsgroup client, confirmed by Prefetch execution of MSIMN.EXE).

Case Q20: Five newsgroups that Mr. Evil subscribed to (from Outlook Express .dbx files): (1) alt.2600 — hacker magazine/community; (2) alt.2600.cardz — credit card fraud; (3) alt.2600.codez — code/software sharing; (4) alt.2600.crackz — software cracking; (5) alt.2600.hackerz — hacking discussion. (Additional subscriptions include alt.2600.moderated, alt.2600.phreakz, alt.2600.programz, alt.binaries.hacking.beginner, alt.binaries.hacking.computers, alt.binaries.hacking.utilities, alt.binaries.hacking.websites, and alt.dss.hack.)

Case Q21: The mIRC user settings shown when the user was online and in a chat channel were: IRC Nickname = "mrevil" (as seen in the #evilfork.EFnet.log where the user typed "[10:30] mrevil glib smarm cuyk"), with the Full Name "Mr Evil" and email address whoknowsme@sbcglobal.net consistent with the Agent/Outlook Express configuration.

Case Q22: Three IRC channels that the user of this computer accessed (from mIRC log files in Program Files/mIRC/logs/): (1) #Elite.Hackers (UnderNet) — hacking channel, August 20, 2004; (2) #CyberCafe (UnderNet) — extended chat session, August 20, 2004; (3) #Chataholics (UnderNet) — general chat, August 20, 2004. (Additional channels include #evilfork on EFnet, #ISO-WAREZ on EFnet, #LuxShell, #ushells, #mp3xserv, #houston, #funny, and #thedarktower.)

Case Q23: The file containing the intercepted data is named "interception," located at Documents and Settings/Mr. Evil/interception (inode 12264, 173,372 bytes, created August 27, 2004, at 15:41:00 UTC). Note: Ethereal's default save directory for TCP reassembly is the user's My Documents directory, and this file was saved in the Mr. Evil user profile directory.

Case Q24: The victim (person who had their internet surfing recorded) was using a Pocket PC / PDA device running Windows CE version 4.20 with an Intel PXA255 processor and 240x320 pixel display (User-Agent: "Mozilla/4.0 (compatible; MSIE 4.01; Windows CE; PPC; 240x320)").

Case Q25: The victim was accessing mobile.msn.com (MSN Mobile / Hotmail mobile webmail). The captured packets show HTTP requests to the MSN Hotmail mobile interface, including inbox viewing, email reading, and email composition (POST to composeppc.aspx).

Case Q26: The main user's web-based email address was accessed through Yahoo Mail (via us.f613.mail.yahoo.com and edit.yahoo.com). Bulk URL data shows "Mr. Evil@" context strings for Yahoo Mail access and account configuration (edit.yahoo.com/config/last). The specific Yahoo email username is associated with the Mr. Evil persona.

Case Q27: Yahoo Mail, as a web-based email service, saves copies of email content in the Internet Explorer cache as ShowLetter[1].htm files, found in the Temporary Internet Files/Content.IE5 cache directories under Mr. Evil's profile (as evidenced by the URL http://us.f613.mail.yahoo.com/ym/ShowLetter in the bulk URL data).

Case Q28: There are 4 executable files in the Recycle Bin: Dc1.exe, Dc2.exe, Dc3.exe, and Dc4.exe, all under Mr. Evil's SID (S-1-5-21-2000478354-688789844-1708537768-1003).

Case Q29: No, these files are not really deleted. All four .exe files are marked as regular allocated files (r/r status in the file listing), meaning they remain fully allocated on disk with their data clusters intact. They reside in the RECYCLER directory but have not been permanently removed.

Case Q30: The file system reports 0 files as actually deleted (all Recycle Bin files remain allocated). The four executables moved to the Recycle Bin were not emptied/purged. The file listing shows all entries as allocated (r/r for regular files, d/d for directories), with no entries showing deleted status markers.

Case Q31: No specific virus infections were identified through the forensic analysis tools employed. The detect_timestomping tool found no evidence of malicious timestamp manipulation. The file extension masquerade analysis identified only minor mismatches in cached web content (e.g., .gif files detected as text or JPEG, .htm file detected as GIF, .doc files detected as text, .sys file detected as text) — all of which are benign web cache artifacts and document format differences, not indicators of malware disguising executable content. A comprehensive antivirus scan of the forensic image was not performed within the scope of the available forensic tools, but no behavioral indicators of virus infection (such as unexpected processes, suspicious autorun entries, or anomalous file modifications) were observed in the registry, Prefetch, or filesystem analysis.



---

## Overview

| | |
|---|---|
| Findings | **11** (11 confirmed, 0 inference) |
| Severity | 1 critical, 3 high, 6 medium, 0 low, 1 info |
| Sources | 28 evidence sources across 432 tool calls |
| Ruled Out | 2 hypotheses tested and rejected |


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
| 2004-08-19T22:48:27 | System Identification and Configuration | INFO | registry.software, registry.system, tsk.fsstat, tsk.partitions |
| 2004-08-19T23:03:11 | Complete Execution Timeline from UserAssist - Tool Deployment Sequence | HIGH | registry.ntuser.mr. evil, ez.prefetch, bulk.winlnk |
| 2004-08-19T23:03:54 | User Account Analysis - Mr. Evil as Primary Administrator | HIGH | registry.sam, registry.software, registry.system |
| 2004-08-20T10:29:01 | IRC Activity - Hacking Channels Accessed via mIRC | MEDIUM | appfiles.program_files.mirc.#chataholics.undernet.log, appfiles.program_files.mirc.#cybercafe.undernet.log, appfiles.program_files.mirc.#elite.hackers.undernet.log, appfiles.program_files.mirc.#evilfork.efnet.log, appfiles.program_files.mirc.#houston.undernet.log, appfiles.program_files.mirc.#iso-warez.efnet.log, appfiles.program_files.mirc.#luxshell.undernet.log, appfiles.program_files.mirc.#ushells.undernet.log, ez.prefetch |
| 2004-08-20T15:05:00 | Hacking Toolkit - Six Installed Offensive Security Programs | HIGH | registry.software, ez.prefetch, ez.shimcache, tsk.filelist |
| 2004-08-20T15:05:00 | Hacking Tools Installed from External Media (D: Drive) | MEDIUM | registry.ntuser.mr. evil, ez.mft, bulk.winlnk |
| 2004-08-20T15:32:56 | Web Browsing History Reveals Systematic Hacking Research | MEDIUM | registry.ntuser.mr. evil, bulk.domain, bulk.url, bulk.rfc822 |
| 2004-08-20T21:13:23 | Email and Newsgroup Configuration - Hacking-Related NNTP Subscriptions | MEDIUM | appfiles.program_files.agent.agent.ini, tsk.filelist |
| 2004-08-25T15:51:24 | Recycle Bin Contains Four Executable Files - Still Allocated on Disk | MEDIUM | tsk.filelist |
| 2004-08-26T15:08:14 | Network Share Access to Remote Computer at 4.12.220.254 and Andrews-1 | MEDIUM | registry.ntuser.mr. evil, tsk.filelist, ez.mft, bulk.domain, bulk.winlnk |
| 2004-08-27T15:36:35 | Wireless Traffic Interception - Ethereal Packet Capture of Pocket PC Device | CRITICAL | tsk.metadata.12264, bulk.packets, bulk.ether |




---

## Hypotheses Ruled Out

These hypotheses were explicitly tested and no supporting evidence was found.


- **No Evidence of Authorized Penetration Testing, Security Coursework, or IT Professional Context** : Counter-evidence searches were conducted to determine whether the hacking tools and activities could be explained by authorized penetration testing, security coursework, or IT professional...

- **No Timestamp Manipulation Detected - Forensic Image Integrity Intact** : The detect_timestomping tool was run against the forensic image and returned no results, meaning no NTFS timestamp manipulation was detected. Additionally, manual verification of key evidence...



---

## Appendix A: Verified Forensic Findings


### 1. [CRITICAL] Wireless Traffic Interception - Ethereal Packet Capture of Pocket PC Device

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:36:35 to 2004-08-27T15:41:00 |
| **Sources** | tsk.metadata.12264, bulk.packets, bulk.ether |
| **Evidence Refs** | tc_f0c81623, tc_e98c6935, tc_6bc175b8 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/) |


A file named "interception" was found at Documents and Settings/Mr. Evil/interception (inode 12264, 173,372 bytes, created 2004-08-27 15:41:00 UTC). File metadata confirms ownership by SID S-1-5-21-2000478354-688789844-1708537768-1003 (Mr. Evil account). No timestomping was detected ($STANDARD_INFORMATION and $FILE_NAME timestamps match).

Analysis of packet data extracted from the disk image reveals this is an Ethereal capture file containing intercepted wireless traffic. The captured packets show:

**Victim device identification:**
- User-Agent: "Mozilla/4.0 (compatible; MSIE 4.01; Windows CE; PPC; 240x320)"
- UA-OS: "Windows CE (Pocket PC) - Version 4.20"
- UA-CPU: "Intel(R) PXA255"
- UA-pixels: 240x320
- This identifies the victim as using a **Pocket PC / PDA** device (likely HP/Compaq iPAQ based on the PXA255 processor)

**MAC addresses in captured traffic:**
- 00:0F:20:80:47:17 - Appears as both source and destination (the intercepted device)
- 00:C0:02:B9:00:78 - Sercomm (wireless access point)
- 00:02:A5:2D:7C:73 - Compaq Computer Corp

**Websites accessed by the victim:**
- mobile.msn.com - MSN Hotmail mobile webmail (the victim was checking email via Hotmail on their Pocket PC)
- HTTP requests show Hotmail folder access, email inbox viewing, and email composition (POST to composeppc.aspx)

This proves Mr. Evil used Ethereal (packet sniffer) to passively intercept wireless traffic from a nearby Pocket PC user who was accessing their Hotmail email over an unsecured wireless connection. This is network sniffing (T1040) — passive capture of wireless traffic rather than active adversary-in-the-middle (T1557 removed as this was not an active interception). The Compaq WL110 wireless card was the most recently active NIC on the laptop (last written 2004-08-27 15:46:19).

**Counter-analysis note:** The counter-hypothesis that this could be legitimate network troubleshooting is not supported — the captured traffic is from a third-party Pocket PC device accessing Hotmail, not the laptop's own traffic. The filename "interception" also indicates the user's own intent characterization.



### 2. [HIGH] User Account Analysis - Mr. Evil as Primary Administrator

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T23:03:54 to 2004-08-27T15:08:23 |
| **Sources** | registry.sam, registry.software, registry.system |
| **Evidence Refs** | tc_e1e70dff, tc_5fb05f48, tc_11b11b07, tc_15229fb9, tc_46b5f59f |
| **ATT&CK** | [T1078](https://attack.mitre.org/techniques/T1078/) |


SAM analysis reveals 5 user accounts:
1. Administrator [RID 500] - Built-in admin, created 2004-08-19 16:59:24, never logged in (Login Count: 0)
2. Guest [RID 501] - Built-in guest, never logged in, password not required
3. HelpAssistant [RID 1000] - Remote Desktop Help Assistant, created 2004-08-19 22:28:24, never logged in
4. SUPPORT_388945a0 [RID 1002] - Microsoft vendor support account, disabled, never logged in
5. Mr. Evil [RID 1003] - Created 2004-08-19 23:03:54, Last Login: 2004-08-27 15:08:23, Login Count: 15, member of Administrators group

The "Mr. Evil" account is the primary user and an administrator with the most logins. The Winlogon registry key confirms:
- DefaultUserName: "Mr. Evil"
- DefaultDomainName: "N-1A9ODN6ZXK4LQ"
- AltDefaultUserName: "Mr. Evil"

The RegisteredOwner in the SOFTWARE hive is "Greg Schardt", establishing that the registered owner (Greg Schardt) operates under the "Mr. Evil" account name. This is a direct link between the real identity and the hacker persona.



### 3. [HIGH] Hacking Toolkit - Six Installed Offensive Security Programs

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:05:00 to 2004-08-27T15:42:41 |
| **Sources** | registry.software, ez.prefetch, ez.shimcache, tsk.filelist |
| **Evidence Refs** | tc_7b80c542, tc_0b45a939, tc_5be60a6c, tc_2c6e3024 |
| **ATT&CK** | [T1046](https://attack.mitre.org/techniques/T1046/), [T1040](https://attack.mitre.org/techniques/T1040/), [T1110](https://attack.mitre.org/techniques/T1110/) |


The Windows Uninstall registry key reveals six installed programs that could be used for hacking/offensive security operations:

1. **Cain & Abel v2.5 beta45** - Password cracking, network sniffing, ARP poisoning tool. Prefetch confirms execution (CAIN25B45.EXE, last run 2004-08-20 15:05:52) along with WinPcap driver installation (WINPCA~1.EXE from PROGRA~1\CAIN\DRIVER\).

2. **Ethereal** (v0.10.6) - Network packet capture and protocol analysis tool (predecessor to Wireshark). Installed at Program Files/Ethereal. Prefetch confirms installer execution (ETHEREAL-SETUP-0.10.6.EXE from Mr. Evil's Desktop, 2004-08-20 15:07:03).

3. **Look@LAN** (v1.0) - Network scanner for discovering and monitoring hosts on a LAN. Installed at Program Files/Look@LAN. Prefetch confirms execution (LOOKATLAN.EXE last run 2004-08-26 15:06:14, run count 2; LOOKATHOST.EXE last run 2004-08-25 15:56:33).

4. **Network Stumbler** - Wireless network discovery tool (wardriving). Prefetch confirms installer execution (NETSTUMBLERINSTALLER_0_4_0.EXE from Mr. Evil's Desktop, 2004-08-20 15:08:39).

5. **Anonymizer** - Anonymous web browsing/proxy tool for hiding identity online.

6. **CuteFTP** - FTP client that could be used for unauthorized file transfers/exfiltration. Prefetch confirms execution (CUTE3032.EXE, 2004-08-20 15:08:37).

Supporting tools also present: WinPcap (packet capture library), Whois (domain/IP lookup tool, in ShimCache). My Documents contains organized hacking toolkit directories: ENUMERATION, EXPLOITATION, FOOTPRINTING, COMMANDS, ARCHIVE, and NOVELL with tools like Nmap, Brutus, pwdump, superscan, snitch, enum, and Cerberus.

**Counter-analysis note:** The investigation question of whether these tools represent legitimate IT administration was evaluated. While individual tools (CuteFTP, Ethereal, Look@LAN) have legitimate uses, the counter-hypothesis fails the convergent evidence test for three reasons: (1) The My Documents directories are organized using explicit offensive security taxonomy (ENUMERATION, EXPLOITATION, FOOTPRINTING) — these are penetration testing kill chain phase names, not IT admin categories; (2) Cain & Abel, Network Stumbler, Anonymizer, and 123 WASP together have no coherent legitimate IT admin purpose on a single laptop; (3) No evidence of authorized penetration testing, security coursework enrollment, or IT professional context was found in any indexed evidence source. The "Ethical+Hacking+Courses" string found in bulk URL data was a Google ad appearing on a browsed page, not a user search query.



### 4. [HIGH] Complete Execution Timeline from UserAssist - Tool Deployment Sequence

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T23:03:11 to 2004-08-27T15:46:00 |
| **Sources** | registry.ntuser.mr. evil, ez.prefetch, bulk.winlnk |
| **Evidence Refs** | tc_2fee3ff7, tc_28c323cf, tc_b4ea92ca |
| **ATT&CK** | [T1588.002](https://attack.mitre.org/techniques/T1588/002/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1040](https://attack.mitre.org/techniques/T1040/) |


UserAssist data from Mr. Evil's NTUSER.DAT provides a complete GUI program execution timeline establishing the chronological sequence of hacking tool deployment and use:

**Phase 1: Initial Setup (2004-08-19 23:03-23:06)**
- MSN Explorer, Windows Media Player, Movie Maker launchers accessed (first boot exploration)
- Desktop customization (desk.cpl)

**Phase 2: Tool Installation (2004-08-20 15:05-15:12)**
All tools installed from D:\Drivers\ in rapid 8-minute sequence:
- 15:05:00 - Anonymizer setup
- 15:05:52 - Cain & Abel 2.5 beta 45 installer
- 15:06:45 - Faber Toys setup
- 15:08:02 - Forte Agent newsreader
- 15:08:37 - CuteFTP installer
- 15:09:16 - WordPad.exe (reading Receipt.rtf)
- 15:09:46 - mIRC 6.12 installer
- 15:10:47 - Whois from D:\Drivers\
- 15:11:56 - PowerToy from zip file
- 15:12:54 - 123 WASP password recovery

**Phase 3: Configuration & Use (2004-08-20 15:18-15:50)**
- 15:18:30 - Network connections (NCPA.CPL)
- 15:23:17 - System Properties (sysdm.cpl)
- 15:50:26 - My Computer exploration
- 15:50:40 - Notepad (editing config files)
- 21:13:23 - Outlook Express (email configuration)

**Phase 4: Active Operations (2004-08-25-27)**
- 2004-08-25 15:22:37 - netplwiz.dll (user account management)
- 2004-08-25 15:23:44 - cmd.exe (command line)
- 2004-08-25 15:27:27 - Faber Toys (2 runs)
- 2004-08-25 15:55:26 - Look@LAN setup (lalsetup250.exe)
- 2004-08-25 15:55:34 - Agent newsreader (2 runs)
- 2004-08-25 16:20:27 - mIRC (3 runs total)
- 2004-08-26 14:58:25 - Look@Host
- 2004-08-26 15:05:15 - telnet.exe
- 2004-08-26 15:06:14 - Look@LAN (2 runs)
- 2004-08-26 15:13:57 - Whois.exe (2 runs)
- 2004-08-26 16:03:17 - Network Places browsing (3 times)

**Phase 5: Final Session - Interception (2004-08-27)**
- 15:12:11 - NetStumbler installer
- 15:12:35 - Network Stumbler execution (wireless scanning)
- 15:14:44 - Add/Remove Programs
- 15:15:08 - WinPcap 3.01a installer
- 15:28:36 - Ethereal 0.10.6 installer (from Desktop)
- 15:33:02 - Cain.exe (2 runs total)
- 15:34:54 - Ethereal (packet capture)
- 15:42:40 - IE browser (14 runs total)

Total tracked runs: 76 RUNPATH events, 42 UISCUT events across the 8-day period. This timeline shows a methodical progression from setup through reconnaissance to active wireless interception on the final day.



### 5. [MEDIUM] Email and Newsgroup Configuration - Hacking-Related NNTP Subscriptions

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T21:13:23 to 2004-08-25T15:57:30 |
| **Sources** | appfiles.program_files.agent.agent.ini, tsk.filelist |
| **Evidence Refs** | tc_3814a21c, tc_0e02689b, tc_00cf9ee5 |


Two programs were configured with SMTP and NNTP email/news settings:

**1. Forte Agent (Program Files/Agent)** - AGENT.INI configuration reveals:
- FullName: "Mr Evil"
- EMailAddress: whoknowsme@sbcglobal.net
- SMTP Server: smtp.sbcglobal.net (port 25)
- NNTP News Server: news.dallas.sbcglobal.net (port 119)
- UserName: whoknowsme@sbcglobal.net
- Organization: "N/A"

**2. Outlook Express** (MSIMN.EXE) - Prefetch confirms execution (2004-08-20 21:13:23). Outlook Express identity data exists under Documents and Settings/Mr. Evil/Local Settings/Application Data/Identities/{EF086998-1115-4ECD-9B13-9ADC067B4929}/Microsoft/Outlook Express/.

**Newsgroup subscriptions** evidenced by .dbx files in Outlook Express data directory. The user subscribed to hacking-related newsgroups:
1. alt.2600 (alt.2600.dbx)
2. alt.2600.cardz (alt.2600.cardz.dbx)
3. alt.2600.codez (alt.2600.codez.dbx)
4. alt.2600.crackz (alt.2600.crackz.dbx)
5. alt.2600.hackerz (alt.2600.hackerz.dbx)
6. alt.2600.moderated (alt.2600.moderated.dbx)
7. alt.2600.phreakz (alt.2600.phreakz.dbx)
8. alt.2600.programz (alt.2600.programz.dbx)
9. alt.binaries.hacking.beginner (alt.binaries.hacking.beginner.dbx)
10. alt.binaries.hacking.computers (alt.binaries.hacking.computers.dbx)
11. alt.binaries.hacking.utilities (alt.binaries.hacking.utilities.dbx)
12. alt.binaries.hacking.websites (alt.binaries.hacking.websites.dbx)
13. alt.dss.hack (alt.dss.hack.dbx)

All newsgroups are hacking-related, focusing on cracking, phreaking, and hacking utilities.



### 6. [MEDIUM] IRC Activity - Hacking Channels Accessed via mIRC

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:29:01 to 2004-08-25T16:20:34 |
| **Sources** | appfiles.program_files.mirc.#chataholics.undernet.log, appfiles.program_files.mirc.#cybercafe.undernet.log, appfiles.program_files.mirc.#elite.hackers.undernet.log, appfiles.program_files.mirc.#evilfork.efnet.log, appfiles.program_files.mirc.#houston.undernet.log, appfiles.program_files.mirc.#iso-warez.efnet.log, appfiles.program_files.mirc.#luxshell.undernet.log, appfiles.program_files.mirc.#ushells.undernet.log, ez.prefetch |
| **Evidence Refs** | tc_7edcc1ae, tc_a6aa8149 |


mIRC IRC client was installed at Program Files/mIRC and executed 3 times (last run 2004-08-25 16:20:34 per Prefetch). IRC log files in Program Files/mIRC/logs/ document channel activity on August 20, 2004 across multiple IRC networks:

**IRC Channels accessed (from log files):**
1. **#Chataholics** (UnderNet) - General chat, session 2004-08-20 10:52:09
2. **#CyberCafe** (UnderNet) - Extended session with conversation, 2004-08-20 10:54:21
3. **#Elite.Hackers** (UnderNet) - Hacking channel, 2004-08-20 10:45:34
4. **#evilfork** (EFnet) - Channel with IRC user activity, 2004-08-20 10:30:18
5. **#funny** (UnderNet) - Channel owned by "UnixBoy", 2004-08-20 14:26:18
6. **#houston** (UnderNet) - Local area channel, 2004-08-20 10:48:59
7. **#ISO-WAREZ** (EFnet) - Warez/piracy channel, 2004-08-20 10:29:01
8. **#LuxShell** (UnderNet) - Shell access channel, 2004-08-20 10:42:03
9. **#mp3xserv** (UnderNet) - File sharing channel, 2004-08-20 10:43:16
10. **#thedarktower** (AfterNET) - General chat, 2004-08-20 14:14:45
11. **#ushells** (UnderNet) - Unix shell access channel, 2004-08-20 10:44:49

Additionally a private message session with m5tar (UnderNet) was logged.

Notable hacking-related channels: #Elite.Hackers, #LuxShell, #ushells (shell/exploit trading), #ISO-WAREZ (piracy), and #evilfork.



### 7. [MEDIUM] Recycle Bin Contains Four Executable Files - Still Allocated on Disk

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-25T15:51:24 to 2004-08-25T16:18:25 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_9f7f5975, tc_c2786c80, tc_0a68542c, tc_e538acad |


The NTFS Recycle Bin (RECYCLER) under Mr. Evil's SID (S-1-5-21-2000478354-688789844-1708537768-1003) contains 4 executable files and 2 metadata files:

1. Dc1.exe (inode 11692) - allocated, 2,160,043 bytes, created 2004-08-25 15:51:24 UTC, MFT modified 2004-08-25 16:18:25 UTC
2. Dc2.exe (inode 11996) - allocated
3. Dc3.exe (inode 12033) - allocated
4. Dc4.exe (inode 12041) - allocated
5. desktop.ini (inode 11814) - Recycle Bin config
6. INFO2 (inode 11850) - Recycle Bin index

All four .exe files are marked as regular allocated files (r/r status), meaning they have NOT been permanently deleted from disk. The files are still recoverable and present in their original data clusters. The "Dc" naming convention is the standard Windows XP Recycle Bin naming pattern where "D" indicates deleted and "c" identifies the drive letter (C:).

The Dc1.exe file has $STANDARD_INFORMATION and $FILE_NAME timestamps that match (no evidence of timestomping), created 2004-08-25 15:51:24 UTC with actual size 2,160,043 bytes. The file was accessed at 15:56:08 and MFT modified at 16:18:25, consistent with being moved to the Recycle Bin during that session.

**Counter-analysis note:** The original filenames of Dc1-Dc4.exe could not be recovered from the indexed evidence — the INFO2 Recycle Bin index file was not parsed to extract the original paths and filenames. Without the original filenames, it is not possible to confirm whether these were hacking tools being cleaned up or routine software management. The temporal overlap with the active operations phase (Aug 25) is noteworthy but insufficient alone to confirm evidence destruction.



### 8. [MEDIUM] Hacking Tools Installed from External Media (D: Drive)

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:05:00 to 2004-08-20T15:12:54 |
| **Sources** | registry.ntuser.mr. evil, ez.mft, bulk.winlnk |
| **Evidence Refs** | tc_2fee3ff7, tc_055afc60, tc_b4ea92ca |
| **ATT&CK** | [T1200](https://attack.mitre.org/techniques/T1200/), [T1588.002](https://attack.mitre.org/techniques/T1588/002/) |


UserAssist registry data and carved LNK files from Mr. Evil's NTUSER.DAT reveal that all hacking tools were installed from a D:\Drivers\ directory on a removable media device:

**D: Drive Volume Label: "Jul 28 2004"** (confirmed by carved LNK file metadata)

**Tools installed from D:\Drivers\ on 2004-08-20 (8-minute window):**
1. D:\Drivers\Anonyymizer\setup.exe - 15:05:00 (anonymous browsing)
2. D:\Drivers\Cain & Abel\cain25b45.exe - 15:05:52 (password cracking)
3. D:\Drivers\Fabertoys\FaberToys_FullSetup.exe - 15:06:45 (system utility)
4. D:\Drivers\Forte Agent\a32-19.exe - 15:08:02 (newsgroup reader)
5. D:\Drivers\FTP\cute3032.exe - 15:08:37 (CuteFTP)
6. D:\Drivers\IRC\mirc612.exe - 15:09:46 (IRC client)
7. D:\Drivers\Whois\whois.exe - 15:10:47 (WHOIS lookup)
8. D:\Drivers\Password recovery\123wasp_setup.exe - 15:12:54 (password recovery)

**Additional D: drive contents identified from LNK file analysis:**
- D:\Drivers\Anonyymizer\keys.txt - Keys/license file (created 2004-07-28 12:37:14 on D: drive)
- D:\Drivers\GhostWare\Receipt.rtf - Receipt document for "GhostWare" software (created 2004-07-28 12:37:51)
- D:\Drivers\Anonyymizer directory (wtime 2004-07-28 12:39:49)
- D:\Drivers\GhostWare directory (wtime 2004-07-28 12:39:49)

The D: drive was prepared on July 28, 2004 (per volume label and file timestamps), 23 days before the tool installations on August 20. This represents a pre-built, portable hacking toolkit carried on removable media. The "GhostWare" directory and receipt suggest purchased/registered hacking-related software. The 123 WASP password recovery tool (installed at C:\Program Files\123WASP\) is specifically designed for extracting Windows account passwords, auto-fill data, and stored credentials.



### 9. [MEDIUM] Network Share Access to Remote Computer at 4.12.220.254 and Andrews-1

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-26T15:08:14 to 2004-08-27T15:44:44 |
| **Sources** | registry.ntuser.mr. evil, tsk.filelist, ez.mft, bulk.domain, bulk.winlnk |
| **Evidence Refs** | tc_2fee3ff7, tc_97458413, tc_be003d40, tc_acd1ac1e, tc_b4ea92ca |
| **ATT&CK** | [T1021.002](https://attack.mitre.org/techniques/T1021/002/), [T1071.002](https://attack.mitre.org/techniques/T1071/002/) |


Mr. Evil's NTUSER.DAT registry and carved LNK file analysis show evidence of network connectivity to multiple remote systems:

**1. IP Address 4.12.220.254 (machine named "m1200")**
- TypedURLs show HTTP and FTP access:
  - http://4.12.220.254/temp/ (url4)
  - ftp://4.12.220.254/temp (url5)
  - ftp://4.12.220.254 (url6)
- RecentDocs: "Temp on m1200 (4.12.220.254)" (MRU position 3, LastWrite 2004-08-26 15:08:14Z)
- NetHood shortcut: \\4.12.220.254\Temp (LastWrite 2004-08-26 15:08:15Z)
- Carved LNK files confirm: net_name=\\4.12.220.254\TEMP, accessed 2004-08-26 15:07:04-06, file "yng13.bmp" accessed from the share (common_path_suffix), share write time 2004-08-26 13:49:28-29 UTC

**2. Computer "Andrews-1" - Extensive Share Access**
Carved LNK files reveal comprehensive mapped drives to Andrews-1:
- \\ANDREWS-1\ANDREWS (C) - Full C: drive share (accessed 2004-08-26 14:55:20, created 2003-02-05 11:35:00, wtime 2004-08-25 06:58:53)
- \\ANDREWS-1\CD DRIVE (F) - CD-ROM share (timestamps from 1980-01-01, likely empty/no media)
- \\ANDREWS-1\A - Floppy drive share
- \\ANDREWS-1\D - Additional drive share
- \\ANDREWS-1\E - Additional drive share

The extensive share mapping to Andrews-1 (5 drive letters: A, C, D, E, F) indicates either administrative share access or all drives were explicitly shared. The C: drive share name "ANDREWS (C)" uses a personal name, suggesting this is another user's personal computer with shares exposed.

**Additional context:** A network printer \\ANDREWS-1\HPLaserJ was mapped in the SOFTWARE registry hive (2004-08-26 15:07:54Z), suggesting a familiar or regular network relationship with ANDREWS-1 rather than purely unauthorized lateral movement. The printer mapping indicates some level of routine access to this computer.

**3. Local Machine \\N-1A9ODN6ZXK4LQ\TEMP**
LNK files show the local machine's Temp directory was also accessed as a network share (accessed 2004-08-20 15:26:37, created 2004-08-20 15:19:12).

**Counter-analysis note:** The ANDREWS-1 access is ambiguous. The printer share and all-drives mapping could represent either a home/work network with shared resources, or unauthorized lateral movement. Without additional context about the network environment, this finding is assessed as medium severity reflecting the ambiguity. The 4.12.220.254 IP is more clearly a remote system (IP in AT&T address space), accessed via both HTTP and FTP to a "temp" directory.



### 10. [MEDIUM] Web Browsing History Reveals Systematic Hacking Research

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:32:56 to 2004-08-27T15:44:44 |
| **Sources** | registry.ntuser.mr. evil, bulk.domain, bulk.url, bulk.rfc822 |
| **Evidence Refs** | tc_2fee3ff7, tc_da91a196, tc_df07d549, tc_e66de0bf, tc_b471a233 |
| **ATT&CK** | [T1595](https://attack.mitre.org/techniques/T1595/) |


Internet Explorer TypedURLs from Mr. Evil's NTUSER.DAT (LastWrite 2004-08-27 15:44:44Z) and IE cache artifacts from bulk_extractor show deliberate research into hacking techniques and tools:

**TypedURLs (manually entered by user):**
1. http://www.wardriving.com/ - Wardriving/wireless hacking community
2. http://www.2600.org/ - 2600 hacker magazine/community
3. http://www.ethereal.com/ - Packet sniffing tool website
4. http://www.maktoob.com/ - Arabic web portal (accessed 2004-08-27)
5. http://www.drudgereport.com/ - News site
6. http://www.majorgeeks.com/ - Software download site
7. http://4.12.220.254/temp/ - Remote file server
8. ftp://4.12.220.254/temp - FTP access to remote server
9. ftp://4.12.220.254 - FTP root access

**Browsing history from bulk_extractor (domain/URL analysis):**
- www.elitehackers.com - Hacking website visited by "Mr. Evil@" user context
- www.cleo-and-nacho.com/mainpages/hacking.htm - Hacking page found via Google ("Ethical+Hacking+Courses")
- www.2600.com/hacked_pages/ - Archive of defaced/hacked websites
- www.insecure.org/nmap - Nmap port scanner documentation
- **www.whatismyip.com** - IP address lookup site ("Mr. Evil@http://www.whatismyip.com") - used to verify external IP/anonymity
- **www.urgentclick.com/whats_my_ip_add** - Another IP address check service
- fosi.ural.net - Russian website, IE cache from 2004-08-25 16:12:49

**Google search evidence:**
- "Mr. Evil@http://www.google.com/search?q=what+i..." - Active search activity

**HTTP headers in RFC822 data confirm browsing sessions to:**
- Host: www.elitehackers.com
- Host: edit.yahoo.com (email registration)
- Host: billing.mail.yahoo.com (email setup)

The IP lookup tools (whatismyip.com, urgentclick.com) are consistent with OPSEC awareness - verifying the public-facing IP address before conducting network activities. Combined with the installed tools and newsgroup subscriptions, this demonstrates systematic hacking research and preparation for wireless network interception.



### 11. [INFO] System Identification and Configuration

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | registry.software, registry.system, tsk.fsstat, tsk.partitions |
| **Evidence Refs** | tc_5160c461, tc_747d3183, tc_fadca8e6, tc_e8ffc3ad, tc_5fb05f48, tc_11279803, tc_d963b5e1, tc_290fe1e5 |


The forensic image is from a Dell Latitude CPi laptop running Microsoft Windows XP (version 5.1, build 2600, no Service Pack). The filesystem is NTFS with volume serial B26CB1CE6CB18D9B on a single NTFS partition (sectors 63-9510479).

Key system configuration from registry:
- ProductName: Microsoft Windows XP
- BuildLab: 2600.xpclient.010817-1148
- RegisteredOwner: Greg Schardt
- RegisteredOrganization: N/A
- InstallDate: 2004-08-19 22:48:27 UTC (registry DWORD 1092955707 = epoch timestamp)
- ComputerName: N-1A9ODN6ZXK4LQ
- DefaultDomainName: N-1A9ODN6ZXK4LQ (machine is in a workgroup, not joined to a domain)
- Timezone: Central Standard Time (Bias=360, ActiveTimeBias=300 indicating CDT/UTC-5 at time of capture)
- LastShutdownTime: 2004-08-27 15:46:33 UTC (decoded from ShutdownTime FILETIME binary)

Network Interface Cards:
1. Xircom CardBus Ethernet 100 + Modem 56 (Ethernet Interface) - ServiceName {6E4090C2-FAEF-489A-8575-505D21FC1049}
2. Compaq WL110 Wireless LAN PC Card - ServiceName {86FC0C96-3FF2-4D59-9ABA-C602F213B5D2}

Both NICs were configured for DHCP. The Compaq WL110 was the most recently active NIC (last written 2004-08-27T15:46:19).



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Port | `TCP 25` |  | Email and Newsgroup Configuration - Hacking-Related NNTP Subscriptions |
| Port | `TCP 119` |  | Email and Newsgroup Configuration - Hacking-Related NNTP Subscriptions |
| External IP | `4.12.220.254` |  | Network Share Access to Remote Computer at 4.12.220.254 and Andrews-1 |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Path | `C:\Program` |  | Hacking Tools Installed from External Media (D: Drive) |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `whoknowsme@sbcglobal.net` |  | Email and Newsgroup Configuration - Hacking-Related NNTP Subscriptions |




---

## Appendix C: MITRE ATT&CK Coverage

9 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (1) > Resource Development (1) > Initial Access (2) > Persistence (1) > Privilege Escalation (1) > Defense Evasion (1) > Credential Access (2) > Discovery (2) > Lateral Movement (1) > Command and Control (1)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1595](https://attack.mitre.org/techniques/T1595/) | Active Scanning | Web Browsing History Reveals Systematic... |


### Resource Development

| Technique | Name | Findings |
|-----------|------|----------|
| [T1588.002](https://attack.mitre.org/techniques/T1588/002/) | Tool | Hacking Tools Installed from External Media (D: Drive); Complete Execution Timeline from UserAssist -... |


### Initial Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | User Account Analysis - Mr. Evil as Primary... |
| [T1200](https://attack.mitre.org/techniques/T1200/) | Hardware Additions | Hacking Tools Installed from External Media (D: Drive) |


### Persistence

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | User Account Analysis - Mr. Evil as Primary... |


### Privilege Escalation

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | User Account Analysis - Mr. Evil as Primary... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | User Account Analysis - Mr. Evil as Primary... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Hacking Toolkit - Six Installed Offensive...; Wireless Traffic Interception - Ethereal...; Complete Execution Timeline from UserAssist -... |
| [T1110](https://attack.mitre.org/techniques/T1110/) | Brute Force | Hacking Toolkit - Six Installed Offensive... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Hacking Toolkit - Six Installed Offensive...; Wireless Traffic Interception - Ethereal...; Complete Execution Timeline from UserAssist -... |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Hacking Toolkit - Six Installed Offensive...; Complete Execution Timeline from UserAssist -... |


### Lateral Movement

| Technique | Name | Findings |
|-----------|------|----------|
| [T1021.002](https://attack.mitre.org/techniques/T1021/002/) | SMB/Windows Admin Shares | Network Share Access to Remote Computer at... |


### Command and Control

| Technique | Name | Findings |
|-----------|------|----------|
| [T1071.002](https://attack.mitre.org/techniques/T1071/002/) | File Transfer Protocols | Network Share Access to Remote Computer at... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 432 |
| Findings submitted | 11 |
| Confirmed | 11 |
| Inferences | 0 |
| Input tokens | 3.0K |
| Output tokens | 92.3K |
| Total tokens | 95.3K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 212 | 17.7K | 17.9K |
| claude-opus-4-6 | 2.7K | 74.6K | 77.4K |




<details>
<summary>Evidence Sources (159)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.fsstat | sleuthkit | 39 |
| tsk.filelist | sleuthkit | 12545 |
| strings.output | strings | 187581 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 44493 |
| bulk.duplicates | bulk_extractor | 46 |
| bulk.email | bulk_extractor | 30259 |
| bulk.ether | bulk_extractor | 37 |
| bulk.ip | bulk_extractor | 1646 |
| bulk.ntfsmft_carved | bulk_extractor | 15 |
| bulk.packets | bulk_extractor | 5403 |
| bulk.rfc822 | bulk_extractor | 1143 |
| bulk.tcp | bulk_extractor | 825 |
| bulk.url | bulk_extractor | 15563 |
| bulk.url_searches | bulk_extractor | 42 |
| bulk.url_services | bulk_extractor | 3045 |
| bulk.winlnk | bulk_extractor | 186 |
| bulk.winpe | bulk_extractor | 2864 |
| bulk.winpe_carved | bulk_extractor | 2861 |
| bulk.winprefetch | bulk_extractor | 90 |
| ez.mft | eztools | 12183 |
| ez.shimcache | eztools | 140 |
| registry.default | regripper | 427 |
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
| tsk.masquerade | sleuthkit | 14 |
| registry.query.software | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| appfiles.program_files.ethereal.dictionary.xml | icat | 649 |
| appfiles.program_files.mirc.#chataholics.undernet.log | icat | 16 |
| appfiles.program_files.ethereal.mobileipv4.xml | icat | 64 |
| appfiles.program_files.mirc.#cybercafe.undernet.log | icat | 207 |
| appfiles.program_files.ethereal.nasreq.xml | icat | 293 |
| appfiles.program_files.mirc.#elite.hackers.undernet.log | icat | 11 |
| appfiles.program_files.ethereal.sunping.xml | icat | 24 |
| appfiles.program_files.mirc.#evilfork.efnet.log | icat | 11 |
| appfiles.program_files.ethereal.capture_filters.txt | icat | 80 |
| appfiles.program_files.mirc.#funny.undernet.log | icat | 10 |
| appfiles.program_files.ethereal.capturing.txt | icat | 84 |
| appfiles.program_files.mirc.#houston.undernet.log | icat | 9 |
| appfiles.program_files.ethereal.display_filters.txt | icat | 43 |
| appfiles.program_files.mirc.#iso-warez.efnet.log | icat | 7 |
| appfiles.program_files.ethereal.faq.txt | icat | 2228 |
| appfiles.program_files.mirc.#luxshell.undernet.log | icat | 13 |
| appfiles.program_files.ethereal.getting_started.txt | icat | 90 |
| appfiles.program_files.mirc.#mp3xserv.undernet.log | icat | 15 |
| appfiles.program_files.ethereal.overview.txt | icat | 38 |
| appfiles.program_files.mirc.#thedarktower.afternet.log | icat | 14 |
| appfiles.program_files.ethereal.well_known.txt | icat | 114 |
| appfiles.program_files.mirc.#ushells.undernet.log | icat | 9 |
| appfiles.program_files.ethereal.agentx-mib.txt | icat | 529 |
| appfiles.program_files.mirc.m5tar.undernet.log | icat | 8 |
| appfiles.program_files.ethereal.disman-event-mib.txt | icat | 1957 |
| appfiles.program_files.ethereal.disman-schedule-mib.txt | icat | 701 |
| appfiles.program_files.ethereal.disman-script-mib.txt | icat | 1766 |
| appfiles.program_files.ethereal.etherlike-mib.txt | icat | 1139 |
| appfiles.program_files.ethereal.hcnum-tc.txt | icat | 120 |
| appfiles.program_files.ethereal.host-resources-mib.txt | icat | 1542 |
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
| appfiles.program_files.agent.agent.ini | icat | 554 |
| appfiles.documents_and_settings.my_documents.desktop.ini | icat | 10 |
| appfiles.program_files.agent.errorlog.txt | icat | 6 |
| appfiles.documents_and_settings.my_documents.desktop.ini | icat | 10 |
| tsk.masquerade | sleuthkit | 14 |
| registry.query.software | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.sam | python-registry | 1 |
| registry.query.sam | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| sqlite.irunin.ini from Look@LAN | sqlite_query | 2 |
| tsk.metadata.12264 | istat | 83 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| tsk.metadata.11692 | istat | 557 |
| composite.correlation | composite | 1 |
| composite.file_staging | composite | 668 |
| composite.file_staging | composite | 668 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
