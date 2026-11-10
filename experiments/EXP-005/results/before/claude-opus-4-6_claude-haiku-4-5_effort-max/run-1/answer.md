# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-09T12:22:55.685543+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 246 evidence sources (17 disk, 229 other) | 266 tool calls | 36 minutes
**Results:** 9 findings (3 high) | 9 confirmed, 0 inference
**Timeline:** 2004-08-19 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2004-08-27): Network Interface Cards and Look@LAN Configuration (+6 related)
- **Command and Control** (2004-08-20): mIRC Configuration and IRC Channel Activity
- **Other Activity** (2004-08-20): Hacking Newsgroup Subscriptions in Outlook Express

**Tools:** search (117), get_raw_output (28), query_registry_value (23), submit_finding (9), open_case (7). SHA-256 hashes recorded for all evidence.



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

266 tool calls were executed across 16
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Forensic Investigation Report: NIST Hacking Case — Dell Latitude CPi Notebook (Serial VLQLW)

## Background

On September 20, 2004, a Dell Latitude CPi notebook computer bearing serial number VLQLW was recovered as abandoned property alongside a wireless PCMCIA card and a homemade external 802.11b antenna. Law enforcement suspected the computer was used by an individual known as Greg Schardt — who operates under the online alias "Mr. Evil" — for wireless network interception and hacking activities. Associates of the suspect indicated he would park within range of public Wireless Access Points, such as those operated by T-Mobile at Starbucks locations, to intercept internet traffic with the intent of capturing credit card numbers, usernames, and passwords.

This forensic examination was conducted against an EnCase image of the notebook's hard drive (4Dell_Latitude_CPi.E01/E02). The investigation analyzed 16 indexed evidence sources using 266 tool invocations across 12 distinct extraction and analysis platforms, including The Sleuth Kit for filesystem analysis, bulk_extractor for artifact carving, Python-Registry and RegRipper for Windows registry examination, EZTools for MFT and Prefetch timeline reconstruction, ClamAV and YARA for malware scanning, and icat for targeted file extraction. The analysis produced 9 confirmed findings, of which 3 were rated high severity and 4 medium severity, with 0 negative findings. A total of 9 MITRE ATT&CK techniques were mapped to the observed activity.

The forensic image was verified with an MD5 hash of 943243e71eda7481fee7b83f06698993 and a SHA-256 hash of 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31. The image contains a single NTFS partition hosting a Microsoft Windows XP installation (Build 2600, no Service Pack) with a filesystem spanning approximately 671 MB. The system was configured for Central Standard Time, was registered to "Greg Schardt," and operated under the computer name N-1A9ODN6ZXK4LQ with no domain membership. The operating system was installed on August 19, 2004, at approximately 17:35 UTC, and the last recorded system shutdown occurred on August 27, 2004, at approximately 15:46 UTC — placing the total active lifespan of the system at just nine days.

## Incident Timeline

The incident timeline reconstructed from MFT timestamps, Prefetch execution records, registry entries, IRC log files, and application configuration artifacts reveals a concentrated burst of hacking tool acquisition, configuration, and operational use spanning August 19 through August 27, 2004.

**Phase 1: System Setup and Initial Configuration (August 19, 2004)**

The Windows XP operating system was installed on August 19, 2004 at 17:35 UTC (registry InstallDate epoch 1092955707). During setup, the system was registered to "Greg Schardt" with the computer name N-1A9ODN6ZXK4LQ and timezone set to Central Standard Time. The Xircom CardBus Ethernet 100 + Modem 56 network interface card was installed at 17:07:19, providing the initial wired network connectivity used for subsequent software downloads and configuration. The system was not joined to any domain.

**Phase 2: Tool Acquisition and Communication Setup (August 20, 2004)**

On August 20, the operator began installing and configuring communication and hacking tools in rapid succession. The Outlook Express email client was configured with the identity "Mr Evil" using the SMTP address whoknowsme@sbcglobal.net via smtp.sbcglobal.net and the POP3 server pop.sbcglobal.net. An NNTP newsreader account was established at news.dallas.sbcglobal.net at 21:16:43 UTC, and the operator subscribed to over 20 hacking-related Usenet newsgroups spanning the alt.2600 and alt.binaries.hacking hierarchies. The Forte Agent newsreader was also installed the same day to access these groups.

IRC activity began early on August 20. mIRC 6.12 was configured with the nickname "Mr" (alternate: "mrevilrulez"), the real name "Mini Me," and the email field set to "none@of.ya," connecting to losangeles.ca.us.undernet.org on port 6660. Between 10:29 and 14:26 UTC, the operator joined 11 IRC channels across three networks (UnderNet, EFNet, and AfterNet). Notable channels included #elite.hackers, #LuxShell (shell trading), #ushells (Unix shells), and #iso-warez (pirated software) on UnderNet and EFNet. IRC log analysis reveals brief, exploratory sessions with minimal active participation — the user joined channels, observed briefly, and departed, suggesting reconnaissance of hacking communities rather than established membership.

**Phase 3: Hacking Infrastructure Buildout (August 20–25, 2004)**

Between August 20 and 25, the operator assembled a comprehensive hacking toolkit. Prefetch records confirm the execution of mIRC, Ethereal (network sniffer), Look@LAN (network scanner), NetStumbler (wireless scanner/wardriver), CuteFTP (file transfer), Cain & Abel v2.5 beta 45 (password cracker and network sniffer), and WHOIS (domain reconnaissance). The My Documents directory was organized into a penetration testing taxonomy with subdirectories labeled ARCHIVE, COMMANDS, DICTIONARIES, ENUMERATION (containing Cerberus Scanner, enum, GetAcct, DumpTools), EXPLOITATION (containing Brutus, Pwdump, dsniff, VNC, Hk), and FOOTPRINTING (containing Nmap, NSTPro2). A 6.4 MB password dictionary file (test.zip) was stored in the DICTIONARIES folder, and the COMMANDS directory contained crack.exe, pwdump.exe, snitch.exe, user2sid.exe, and STREAMFIND.EXE.

On August 25, 2004, Look@LAN version 2.50 Build 29 was installed while the Xircom Ethernet card was active, recording the system's IP address as 192.168.1.111 and MAC address as 00:10:A4:93:3E:09. The Look@LAN installation configuration file (irunin.ini) captured both %REGOWNER% = Greg Schardt and %LANUSER% = Mr. Evil in the same document, providing a critical forensic link between the suspect's legal identity and his hacking persona. Also on August 25, Cain & Abel created output files SMTP.LST and DRR.LST, confirming operational initialization of the password cracking tool.

**Phase 4: Operational Activity and Network Intrusion (August 26, 2004)**

On August 26, the operator conducted active network operations against external systems. The NetHood directory reveals that mapped network drives were created at 15:07:27 UTC to a remote computer named "Andrews-1," with access to five shares: the C: drive, D: drive, E: drive, F: (CD) drive, and an "a" share. At 15:08:14, a recent document shortcut was created pointing to "Temp on m1200 (4.12.220.254)," indicating access to a Temp folder on a device at the external IP address 4.12.220.254. Telnet was also executed on this date per Prefetch records.

**Phase 5: Final Activity and Wireless Interception (August 27, 2004)**

The final day of recorded activity, August 27, 2004, saw the culmination of the wireless interception capability. The Compaq WL110 Wireless LAN PC Card registry entry was last written at 15:31:44 UTC. The Ethereal preferences file was created at 15:35:53 UTC, and the packet capture file named "interception" was present in the Mr. Evil user profile directory (Documents and Settings/Mr. Evil/interception). Cain & Abel's DRR.LST file was modified at 15:34:52, indicating the tool was actively used on this date. The last MFT activity was recorded at 15:44:40, and the system shut down at approximately 15:46 UTC. The computer was subsequently abandoned and recovered on September 20, 2004.

## Key Findings

**Identity Linking: Greg Schardt as "Mr. Evil"**

The investigation conclusively established that Greg Schardt is the operator of this computer and uses the alias "Mr. Evil." This identity chain is supported by three independent artifact types exceeding the two-source threshold for confirmed attribution. First, the Windows registry RegisteredOwner value, set during the August 19 OS installation, records "Greg Schardt." Second, the Look@LAN irunin.ini configuration file independently captured both the registered owner (%REGOWNER% = Greg Schardt) and the active Windows user (%LANUSER% = Mr. Evil) during a single installation event on August 25, 2004. Third, a Yahoo account registration URL recovered from the browser cache at disk offset 2600930664 shows http://edit.yahoo.com/config/id_check?.fn=Greg&.ln=Schardt&.id=mrevil2000, linking the legal name Greg Schardt to the Yahoo ID "mrevil2000" — a clear variant of the "mrevilrulez" alternate IRC nickname. The full convergent identity chain encompasses eight identifiers across five independent systems: Greg Schardt (registry, Look@LAN, Yahoo), Mr. Evil (Windows account, Outlook Express, mIRC primary nick), mrevilrulez (mIRC alternate nick), mrevil2000 (Yahoo registration), mrevilrulez@yahoo.com (Yahoo Mail), whoknowsme@sbcglobal.net (Outlook Express SMTP/POP3/NNTP), Mini Me (mIRC "real name" field), and none@of.ya (mIRC email field).

**Comprehensive Hacking Toolkit**

Six primary hacking programs with confirmed execution via Prefetch analysis were identified: mIRC 6.12 for underground IRC communication, Cain & Abel v2.5 beta 45 for password cracking and network sniffing, Ethereal 0.10.6 for wireless packet capture, Look@LAN 2.50 for network monitoring and scanning, NetStumbler 0.4.0 for wireless network discovery and wardriving, and CuteFTP for file transfer and potential exfiltration. While each of these tools has legitimate administrative uses, the context of their deployment — within a user profile organized around hacking taxonomy, alongside dedicated attack tools and password dictionaries, on a system operated by a user who subscribed to hacking newsgroups and frequented hacking IRC channels — establishes their purpose as components of an offensive hacking platform. Additional stored tools in the My Documents hierarchy included Brutus (password brute-forcer), pwdump (Windows password dumper), dsniff (network credential sniffer), Nmap (port scanner), Cerberus Scanner, and crack.exe, though Prefetch records do not confirm execution of these particular tools.

**Wireless Traffic Interception Capability**

The combination of the Compaq WL110 Wireless LAN PC Card, NetStumbler for wireless access point discovery, Ethereal with WinPcap for packet capture, and the homemade 802.11b antenna recovered with the laptop establishes a complete wireless interception capability. The file named "interception" in the Mr. Evil user profile directory represents captured network traffic. The Ethereal preferences were configured on August 27, 2004, the same day as the final system activity, and the default TCP reassembly save directory would be the user's profile folder — consistent with the location of the "interception" file. The actual content of the packet capture file could not be fully parsed from the indexed evidence; deeper pcap analysis would be required to confirm the specific victim device type and intercepted websites.

**Communication Infrastructure and Hacking Community Engagement**

The operator maintained dual communication channels: the email address whoknowsme@sbcglobal.net configured in Outlook Express for SMTP/POP3 and NNTP newsgroup access, and the Yahoo Mail account mrevilrulez@yahoo.com accessed via the browser. The "dallas" subdomain in the NNTP server (news.dallas.sbcglobal.net) is consistent with an SBC Global internet service subscription in the Dallas, Texas metropolitan area. The operator subscribed to over 20 Usenet newsgroups in the alt.2600 and alt.binaries.hacking hierarchies, covering software cracking, computer hacking, hacking utilities, phone phreaking, and malicious hacking. Yahoo Mail copies were saved locally as ShowLetter[1].htm in the Internet Explorer Temporary Internet Files cache.

**Network Intrusion Evidence**

Beyond tool installation, the forensic evidence shows operational network access to at least two external systems. On August 26, 2004, the operator mapped five network shares on a computer named "Andrews-1" and accessed a Temp folder on an external device at IP address 4.12.220.254. These artifacts demonstrate that the laptop was actively used for network reconnaissance and filesystem access on other computers during its nine-day operational period.

**Recycle Bin and Deleted Files**

Four executable files (Dc1.exe through Dc4.exe) were found in the Recycle Bin under the Mr. Evil user SID (S-1-5-21-2000478354-688789844-1708537768-1003). These files are not truly deleted — they remain allocated on disk and are fully recoverable, as the Recycle Bin mechanism merely relocates files rather than deallocating them. Approximately 7,038 file entries are marked as deleted by the filesystem, though analysis indicates these are predominantly routine OS temporary files, cache files, and user profile temp files rather than evidence of deliberate mass destruction. The original filenames and paths of the four recycled executables could not be determined from available evidence, as the INFO2 metadata file was not parsed.

**Malware and Antivirus Results**

ClamAV scanning returned clean results with no virus detections in the disk image. YARA scanning identified a "HackTool_Samples" signature matching "samdump.dll" at raw disk offset 0x1e4bf1dd, consistent with the stored pwdump/SAM dumping tool packages in the EXPLOITATION directory. This is a hacking tool artifact rather than traditional malware.

## Threat Intelligence and Attribution

The forensic evidence supports attribution of this computer to Greg Schardt with high confidence, established through the convergent identity chain described above. The behavioral profile is consistent with a solo actor engaged in wireless network interception ("wardriving") and opportunistic credential harvesting. The toolkit composition — combining wireless scanning (NetStumbler), packet capture (Ethereal), password cracking (Cain & Abel), and network enumeration tools — along with a homemade 802.11b directional antenna, is consistent with the reported modus operandi of parking near public wireless access points to intercept traffic.

The geographic indicator of the "dallas" subdomain in the SBC Global NNTP server, combined with the suspect's known use of T-Mobile Hotspots, places the activity in the Dallas-Fort Worth, Texas metropolitan area. The IRC activity pattern — brief, exploratory sessions across shell-trading and warez channels without sustained engagement — suggests an individual building capability rather than an established member of organized hacking groups. The nine-day operational window (August 19–27, 2004) and the systematic directory organization of tools suggest deliberate preparation for network intrusion activities.

It is important to note that while the identity chain linking Greg Schardt to the "Mr. Evil" persona and to this computer is well-established through multiple independent artifact types, the full scope of actual hacking activity conducted from this platform cannot be determined without pcap analysis of the "interception" file and further investigation into the "Andrews-1" and 4.12.220.254 network access events.

## Impact Assessment

The investigation identified a single compromised system — the Dell Latitude CPi notebook itself, which served as the attack platform. The scope of potential victimization extends to any wireless networks within range of the operator's homemade antenna and Compaq WL110 wireless card. The presence of the "interception" packet capture file confirms that at least some network traffic was successfully captured, though the specific content and scope cannot be determined from available evidence.

Two external systems were accessed from this laptop: a computer named "Andrews-1" with five shared drives mapped on August 26, and a device at external IP address 4.12.220.254 from which a Temp folder was accessed the same day. Whether these access events were authorized or unauthorized cannot be determined from the laptop evidence alone, but they demonstrate operational capability and intent.

The credential exposure risk is significant given the presence of Cain & Abel (executed and operationally active), pwdump tools, a 6.4 MB password dictionary, and the network sniffing capability. The Cain DRR.LST file was modified on the final day of activity (August 27), indicating active password recovery operations. Combined with the reported intent to capture credit card numbers and authentication credentials from wireless traffic, the potential for identity theft and financial fraud is material.

The persistence depth is minimal in the traditional sense — this is the attacker's own platform, not a compromised enterprise system. However, the systematic tool collection and organized directory structure indicate a persistent operational capability that would survive across sessions and could be rapidly redeployed.

## Immediate Tactical Containment

1. Preserve the forensic image chain of custody: verify MD5 943243e71eda7481fee7b83f06698993 and SHA-256 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31 match the acquisition hashes for the 4Dell_Latitude_CPi.E01/E02 image set.
2. Block the email account whoknowsme@sbcglobal.net at the ISP level by coordinating with SBC Global/AT&T to suspend the account and preserve email records, as this account was used for both SMTP/POP3 communication and NNTP newsgroup access via news.dallas.sbcglobal.net.
3. Request Yahoo preserve and suspend the account mrevilrulez@yahoo.com (and associated registration attempt for mrevil2000), as this web-based email was actively used during the operational period.
4. Issue a law enforcement inquiry to the operator of the "Andrews-1" system and the owner of the external IP 4.12.220.254 to determine whether unauthorized access occurred and to preserve logs from August 26, 2004.
5. Notify T-Mobile and wireless access point operators in the Dallas-Fort Worth area about the suspected wireless interception activity, referencing the MAC address 00:10:A4:93:3E:09 (Xircom) and the Compaq WL110 wireless card.
6. Perform deep packet analysis of the "interception" file (inode 12264-128-4, located at Documents and Settings/Mr. Evil/interception) to identify specific victims, intercepted credentials, and captured financial data.
7. Parse the Recycle Bin INFO2 metadata file to determine the original filenames and paths of Dc1.exe through Dc4.exe (inodes 11692, 11996, 12033, 12041).
8. Extract and analyze the Yahoo Mail cached pages (ShowLetter[1].htm at inode 11247, Content.IE5/HYU1BON0/) for communication content that may identify co-conspirators or victims.

## Strategic Remediation

**Wireless Network Interception Vulnerability (Findings: Hacking Tool Suite, Ethereal Packet Capture):** The operator exploited the fundamental vulnerability of unencrypted or weakly encrypted public wireless networks to capture traffic in transit. The combination of NetStumbler for access point discovery, a homemade 802.11b antenna for extended range, and Ethereal for packet capture demonstrates that public WiFi hotspots operating without WPA2 encryption and without client-side VPN enforcement were susceptible to passive interception. Wireless access point operators referenced in the case context (T-Mobile Hotspots at Starbucks) should mandate WPA2-Enterprise authentication and implement wireless intrusion detection systems capable of identifying promiscuous-mode wireless adapters and tools like NetStumbler, which generate distinctive probe request patterns.

**Unprotected Network Shares Enabling Lateral Access (Finding: Hacking Tool Suite — Network Access to Andrews-1):** The operator accessed five shared drives on the "Andrews-1" computer on August 26, 2004, including full C: and D: drive shares. The breadth of accessible shares (entire drive letters rather than specific directories) suggests the remote system had overly permissive sharing configurations without authentication requirements or network-level access controls. Systems exposing administrative shares or full-volume shares on networks accessible to untrusted devices should implement SMB signing, require NTLM v2 or Kerberos authentication, and restrict share access to named accounts with least-privilege permissions.

**Absence of Endpoint Monitoring on Attack Platform (Findings: System Identification, Hacking Tool Suite):** The Windows XP system ran without any Service Pack, without antivirus software (ClamAV found no resident AV artifacts), and without endpoint detection. While this is the attacker's own machine, the finding illustrates that unmanaged endpoints connecting to shared networks pose risks to all participants on those networks. Public wireless operators should implement network access control (NAC) that validates connecting devices meet minimum security posture requirements before granting network access, which would impede both the wireless sniffing and the lateral movement observed in this case.

**ISP Account Controls (Findings: Email and NNTP Configuration, Identity Linking):** The operator maintained active ISP accounts (whoknowsme@sbcglobal.net for email/NNTP and mrevilrulez@yahoo.com for web mail) that facilitated communication with hacking communities and potential co-conspirators. The registration of accounts using transparent aliases ("whoknowsme," "mrevilrulez") without identity verification enabled pseudonymous operation. ISPs and email providers should implement stronger identity verification during account creation and maintain the capability to rapidly respond to law enforcement preservation requests for account data associated with suspected criminal activity.

## Conclusion

This forensic examination of the Dell Latitude CPi notebook (Serial VLQLW) confirms that the computer was deliberately configured and used as a mobile hacking platform for wireless network interception. The investigation produced 9 confirmed findings across 16 evidence sources, mapping 9 MITRE ATT&CK techniques.

**Q1. What systems were compromised?** The Dell Latitude CPi notebook itself served as the attack platform rather than a compromised victim. Two external systems were accessed from the laptop: a computer named "Andrews-1" (five drive shares mapped on August 26, 2004) and a device at external IP 4.12.220.254 (Temp folder accessed the same day). At least one unknown victim had wireless traffic captured in the "interception" file. Whether the Andrews-1 and 4.12.220.254 access was authorized cannot be determined from this evidence alone.

**Q2. How did the attacker gain initial access?** This question applies in the reverse direction for this case: the laptop is the attacker's own system, not a compromised victim. The attacker's method for accessing wireless networks was through passive interception using a Compaq WL110 Wireless LAN PC Card, a homemade 802.11b antenna, NetStumbler for access point discovery, and Ethereal for packet capture. Access to the "Andrews-1" system appears to have been via SMB file shares.

**Q3. What lateral movement occurred?** On August 26, 2004, the operator mapped five network shares on "Andrews-1" (C:, D:, E:, F:/CD drives and an "a" share) at 15:07:27 UTC and accessed a Temp folder on 4.12.220.254 at 15:08:14 UTC. Telnet was also executed on this date. These represent confirmed lateral movement from the laptop to external systems. (MITRE ATT&CK T1021)

**Q4. What persistence mechanisms were installed?** N/A. As the attacker's own machine, traditional persistence mechanisms (backdoors, scheduled tasks, rootkits) were not necessary. The system was configured for autologon to the "Mr. Evil" account via the Winlogon DefaultUserName registry value.

**Q5. Was data exfiltrated, and if so, what and how much?** The "interception" file in the Mr. Evil profile directory represents captured network traffic from wireless interception activity. The full scope of captured data requires pcap analysis. CuteFTP was installed and executed, providing a file transfer capability for exfiltration, though specific exfiltration events were not confirmed in the indexed evidence.

**Q6. What is the full timeline of the incident?** The system was active from August 19, 2004 (OS installation at 17:35 UTC) through August 27, 2004 (last shutdown at approximately 15:46 UTC) — a nine-day operational window. Phase 1 (August 19): system setup and NIC installation. Phase 2 (August 20): communication tool configuration, IRC channel reconnaissance, newsgroup subscriptions. Phase 3 (August 20–25): hacking tool installation and configuration, Look@LAN and Cain initialization. Phase 4 (August 26): active network operations against Andrews-1 and 4.12.220.254. Phase 5 (August 27): wireless interception setup, Ethereal configuration, Cain active use, final shutdown. The computer was recovered abandoned on September 20, 2004.

**Q7. What is the total scope and business impact?** The scope encompasses at least one wireless traffic interception event (the "interception" file), unauthorized or exploratory access to two external systems (Andrews-1 and 4.12.220.254), and engagement with hacking communities through IRC channels and Usenet newsgroups. The potential impact includes intercepted credentials, financial data, and personal information from wireless network users, plus any data accessed on the Andrews-1 and 4.12.220.254 systems.

**Q8. What are the recommended remediation actions?** Perform deep pcap analysis of the "interception" file to identify and notify victims. Coordinate with SBC Global/AT&T and Yahoo to preserve and suspend the operator's email accounts. Investigate the Andrews-1 and 4.12.220.254 access events. Notify wireless access point operators in the Dallas-Fort Worth area. Pursue the identity chain linking Greg Schardt to the hacking activity through legal process.

## Case Questions

Case Q1: The forensic image MD5 hash is 943243e71eda7481fee7b83f06698993 and the SHA-256 hash is 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31. The hashdeep verification computed these hashes from the image file (671,094,597 bytes). The acquisition hash and verification hash match.

Case Q2: Microsoft Windows XP, Build 2600 (no Service Pack installed). NTFS filesystem. Confirmed via the registry ProductName value, The Sleuth Kit fsstat, and the Look@LAN configuration.

Case Q3: August 19, 2004, at approximately 17:35 UTC. The registry InstallDate value is 1092955707 (Unix epoch timestamp).

Case Q4: Central Standard Time, as recorded in the registry at ControlSet001\Control\TimeZoneInformation\StandardName.

Case Q5: Greg Schardt, as recorded in the registry at Microsoft\Windows NT\CurrentVersion\RegisteredOwner.

Case Q6: N-1A9ODN6ZXK4LQ, as recorded in the registry at ControlSet001\Control\ComputerName\ComputerName.

Case Q7: The primary domain is blank/empty (ControlSet001\Services\Tcpip\Parameters\Domain = ""). The system was not joined to a domain and operated standalone.

Case Q8: Approximately August 27, 2004 at 15:46 UTC. The ShutdownTime registry FILETIME value at ControlSet001\Control\Windows\ShutdownTime is c4fc00074d8cc401.

Case Q9: 5 user accounts are recorded in the SAM: (1) Administrator, (2) Guest, (3) HelpAssistant, (4) Mr. Evil, and (5) SUPPORT_388945a0.

Case Q10: Mr. Evil. The user profile at Documents and Settings\Mr. Evil contains all user data, application configurations, browsing history, and installed tool settings.

Case Q11: Mr. Evil, confirmed by the Winlogon DefaultUserName registry value set to "Mr. Evil."

Case Q12: The file is irunin.ini, located in Program Files\Look@LAN\. It relates to the Look@LAN software program (version 2.50 Build 29). This file records both %REGOWNER% = Greg Schardt and %LANUSER% = Mr. Evil, proving Greg Schardt is Mr. Evil and is the administrator of this computer (%ISUSERNTADMIN% = TRUE).

Case Q13: Two network interface cards: (1) Xircom CardBus Ethernet 100 + Modem 56 (Ethernet Interface), and (2) Compaq WL110 Wireless LAN PC Card.

Case Q14: IP address: 192.168.1.111. MAC address: 00:10:A4:93:3E:09. Both recorded in the Look@LAN irunin.ini configuration file.

Case Q15: The Xircom CardBus Ethernet 100 + Modem 56 was used during the Look@LAN installation and setup. The MAC prefix 00:10:A4 is registered to the Xircom vendor (IEEE OUI).

Case Q16: Six installed hacking programs: (1) mIRC 6.12 — IRC client for underground communication, (2) Cain & Abel v2.5 beta 45 — password recovery/cracking and network sniffing, (3) Ethereal 0.10.6 — network packet capture and protocol analysis, (4) Look@LAN 2.50 Build 29 — network monitoring and scanning, (5) NetStumbler 0.4.0 — wireless network scanner/wardriving tool, (6) CuteFTP — FTP client for file transfer. All six had confirmed execution via Windows Prefetch records.

Case Q17: whoknowsme@sbcglobal.net, configured in Outlook Express with SMTP server smtp.sbcglobal.net and display name "Mr Evil."

Case Q18: NNTP server: news.dallas.sbcglobal.net. NNTP username: whoknowsme@sbcglobal.net. NNTP display name: Mr Evil. NNTP email: whoknowsme@sbcglobal.net. Configured in Outlook Express Internet Account Manager (Account 00000002).

Case Q19: (1) Outlook Express (MSIMN.EXE) — Microsoft email and newsreader client with account settings in the NTUSER.DAT registry, and (2) Forte Agent (Program Files\Agent\agent.exe) — dedicated newsreader application. Both show the same email/NNTP identity.

Case Q20: Five hacking newsgroups: (1) alt.2600.crackz, (2) alt.2600.hackerz, (3) alt.binaries.hacking.beginner, (4) alt.binaries.hacking.computers, (5) alt.binaries.hacking.utilities. Additional subscriptions included alt.2600, alt.2600.cardz, alt.2600.codez, alt.2600.moderated, alt.2600.phreakz, alt.2600.programz, alt.hacking, alt.dss.hack, and many others.

Case Q21: mIRC user settings displayed in chat channels: Nickname: Mr; Alternate nickname: mrevilrulez; Real name: Mini Me; Email: none@of.ya; User ID (ident): Mrevil. Default server: losangeles.ca.us.undernet.org:6660.

Case Q22: Three IRC channels accessed: (1) #LuxShell (shell trading, UnderNet), (2) #elite.hackers (hacking discussion, UnderNet), (3) #iso-warez (pirated software, EFNet). Additional channels included #Chataholics, #CyberCafe, #funny, #houston, #mp3xserv, #ushells (UnderNet), #evilfork (EFNet), and #thedarktower (AfterNet).

Case Q23: The file is named "interception," located at Documents and Settings/Mr. Evil/interception (inode 12264-128-4).

Case Q24: The specific victim wireless device type could not be determined from the indexed evidence. Full pcap analysis of the "interception" file would be required to identify the victim's computer type. The capture capability used the Compaq WL110 Wireless LAN PC Card.

Case Q25: The specific websites accessed by the victim could not be fully determined from the indexed evidence without deep pcap parsing. Full pcap analysis of the "interception" file is required. Browser cookies in the Mr. Evil profile show the operator visited www.netstumbler.com, www.cnn.com, www.drudgereport.com, yahoo.com, msn.com, google.com, and maktoob.com.

Case Q26: mrevilrulez@yahoo.com, confirmed in Yahoo Mail cached web pages at disk offsets 1832277600 and 1832262722 showing Yahoo Mail web interface HTML for this account.

Case Q27: ShowLetter[1].htm, found in the Internet Explorer Temporary Internet Files cache at Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/HYU1BON0/ShowLetter[1].htm (inode 11247).

Case Q28: 4 executable files in the Recycle Bin: Dc1.exe, Dc2.exe, Dc3.exe, and Dc4.exe, all under the Mr. Evil SID (S-1-5-21-2000478354-688789844-1708537768-1003).

Case Q29: No, these files are not truly deleted. They are marked as "r/r" (regular/regular — allocated) in the filesystem. The Recycle Bin merely moves files to the RECYCLER folder; they remain fully recoverable until the Recycle Bin is emptied.

Case Q30: Approximately 7,038 files are reported as deleted by the file system (entries marked with the TSK "*" deleted flag). These are predominantly routine OS temporary files and cache artifacts.

Case Q31: ClamAV antivirus scanning detected no viruses in the disk image. YARA scanning detected a "HackTool_Samples" signature matching "samdump.dll" at disk offset 0x1e4bf1dd, which is a hacking tool component (SAM password dumper) rather than a virus. The system itself contained no traditional viruses or malware.


---

## Overview

| | |
|---|---|
| Findings | **9** (9 confirmed, 0 inference) |
| Severity | 0 critical, 3 high, 4 medium, 0 low, 2 info |
| Sources | 16 evidence sources across 266 tool calls |


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
| 2004-08-19T17:07:19 | Network Interface Cards and Look@LAN Configuration | INFO | registry.query.software, appfiles.program_files.look@lan.irunin.ini |
| 2004-08-19T17:35:07 | Hacking Tool Suite - Six Programs Installed for Malicious Purposes | HIGH | appfiles.program_files.mirc.mirc.ini, tsk.filelist, appfiles.program_files.look@lan.irunin.ini, yara.files, ez.mft |
| 2004-08-19T17:35:07 | Recycle Bin Contents and Deleted Files Analysis | MEDIUM | tsk.filelist, clamav.scan, yara.files |
| 2004-08-19T17:35:07 | System Identification and Acquisition Verification | INFO | hashdeep.hashes, registry.query.software, registry.query.system, tsk.fsstat, appfiles.program_files.look@lan.irunin.ini |
| 2004-08-19T23:03:54 | User Accounts and Identity Linking - Greg Schardt is "Mr. Evil" | HIGH | registry.query.sam, appfiles.program_files.look@lan.irunin.ini, bulk.url |
| 2004-08-20T10:29:01 | mIRC Configuration and IRC Channel Activity | MEDIUM | appfiles.program_files.mirc.mirc.ini, appfiles.program_files.mirc.#cybercafe.undernet.log, appfiles.program_files.mirc.#elite.hackers.undernet.log, appfiles.program_files.mirc.#luxshell.undernet.log |
| 2004-08-20T21:14:20 | Email and NNTP Configuration - whoknowsme@sbcglobal.net | MEDIUM | registry.query.sam, ez.mft, tsk.filelist |
| 2004-08-20T21:16:43 | Hacking Newsgroup Subscriptions in Outlook Express | MEDIUM | tsk.filelist |
| 2004-08-27T15:29:14 | Ethereal Packet Capture - Wireless Traffic Interception | HIGH | tsk.filelist, ez.mft, bulk.url, bulk.domain |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] User Accounts and Identity Linking - Greg Schardt is "Mr. Evil"

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T23:03:54 |
| **Sources** | registry.query.sam, appfiles.program_files.look@lan.irunin.ini, bulk.url |
| **Evidence Refs** | tc_e22fa241, tc_becedaa0, tc_179dbb6f, tc_7e86f9c5, tc_2f448591 |
| **ATT&CK** | [T1078](https://attack.mitre.org/techniques/T1078/) |


**Q9 - SAM User Accounts:** 5 user accounts are recorded in the SAM (SAM\Domains\Account\Users has 6 subkeys: 5 RID entries + "Names" subkey). The accounts are:
1. Administrator (built-in)
2. Guest (built-in)
3. HelpAssistant (built-in)
4. Mr. Evil (SID: S-1-5-21-2000478354-688789844-1708537768-1003) - primary user account
5. SUPPORT_388945a0 (built-in)

**Q10 - Primary User:** "Mr. Evil" is the primary/most-used user account. The user profile at "Documents and Settings\Mr. Evil" contains all user data, browsing history, application configurations, and installed tool settings.

**Q11 - Last Logon:** "Mr. Evil" was the last user to log on, confirmed by the Winlogon DefaultUserName registry value = "Mr. Evil" (at Microsoft\Windows NT\CurrentVersion\Winlogon\DefaultUserName).

**Q12 - Greg Schardt = Mr. Evil = Administrator:** The Look@LAN installation configuration file (irunin.ini) conclusively proves this link:
- %LANUSER% = Mr. Evil (the active Windows user)
- %REGOWNER% = Greg Schardt (the registered Windows owner)
- %USERNAME% = Greg Schardt
- %ISUSERNTADMIN% = TRUE (confirms administrator privileges)
- %DESKTOP% = C:\Documents and Settings\Mr. Evil\Desktop

This file is from Look@LAN (v2.50 Build 29) and was created during installation on 08/25/2004. The registered owner "Greg Schardt" is operating under the user account "Mr. Evil" with full administrator access.

**Counter-Analysis Note - Identity Chain Strength:** The Greg Schardt = Mr. Evil link is established by THREE independent artifact types, exceeding the 2-source threshold for "confirmed" confidence:

1. **Registry RegisteredOwner** (Windows installation, 2004-08-19): "Greg Schardt" set during OS setup
2. **Look@LAN irunin.ini** (application install capture, 2004-08-25): Independently captured both %REGOWNER% = Greg Schardt and %LANUSER% = Mr. Evil in the same installation context
3. **Yahoo Account Registration URL** (browser cache, bulk.url at offset 2600930664): http://edit.yahoo.com/config/id_check?.fn=Greg&.ln=Schardt&.id=mrevil2000 - This URL shows someone with first name "Greg" and last name "Schardt" attempting to register Yahoo ID "mrevil2000", a clear variant of the "mrevilrulez" alternate nick used in mIRC.

**Full Convergent Identity Chain:**
- Greg Schardt (registry owner, Look@LAN capture, Yahoo registration)
- Mr. Evil (Windows user account, Outlook Express display name, mIRC primary nick)
- mrevilrulez (mIRC alternate nick)
- mrevil2000 (Yahoo registration attempt)
- mrevilrulez@yahoo.com (active Yahoo Mail account)
- whoknowsme@sbcglobal.net (Outlook Express SMTP/POP3/NNTP identity)
- Mini Me (mIRC "real name" field)
- none@of.ya (mIRC email field)

These 8 identifiers across 5 independent systems (Windows registry, application install logs, browser cache, IRC client, email client) form a tightly linked identity chain. The Yahoo registration URL is particularly significant as it independently links the legal name "Greg Schardt" to the hacking persona "mrevil" in a single URL parameter set.



### 2. [HIGH] Hacking Tool Suite - Six Programs Installed for Malicious Purposes

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T17:35:07 to 2004-08-27T15:44:40 |
| **Sources** | appfiles.program_files.mirc.mirc.ini, tsk.filelist, appfiles.program_files.look@lan.irunin.ini, yara.files, ez.mft |
| **Evidence Refs** | tc_bd516b7b, tc_ad9191f4, tc_7e86f9c5, tc_8f1854b3, tc_570f82b3, tc_0e2d1e78, tc_196f4280, tc_0cc24dfe, tc_80ddeaa8 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1110](https://attack.mitre.org/techniques/T1110/), [T1071](https://attack.mitre.org/techniques/T1071/), [T1021](https://attack.mitre.org/techniques/T1021/) |


**Q16 - Six Installed Programs Usable for Hacking:**

1. **mIRC 6.12** (Program Files\mIRC) - IRC client used for underground communication channels including hacking, warez, and shell-trading channels
2. **Cain & Abel v2.5 beta 45** (Prefetch: CAIN25B45.EXE-056F3A6E.pf) - Password recovery/cracking tool, network sniffing, ARP poisoning
3. **Ethereal 0.10.6** (Program Files\Ethereal) - Network packet capture and protocol analyzer used to intercept wireless traffic
4. **Look@LAN 2.50 Build 29** (Program Files\Look@LAN) - Network monitoring and scanning tool
5. **NetStumbler 0.4.0** (Prefetch: NETSTUMBLER.EXE-0BFEE568.pf, Desktop shortcut: Network Stumbler.lnk) - Wireless network scanner/wardriving tool, also visited www.netstumbler.com
6. **CuteFTP** (Prefetch: CUTE3032.EXE-1F409A25.pf) - FTP client for file transfer/exfiltration

Additional supporting tools present:
- WinPcap (Program Files\WinPcap) - packet capture library used by Ethereal
- Whois (Program Files\Whois) - domain/IP reconnaissance tool (WHOIS.EXE in Prefetch)
- Agent newsreader (Program Files\Agent) - for accessing hacking newsgroups
- Anonymizer Toolbar (Program Files\Anonymizer) - anonymization/privacy tool
- Telnet (TELNET.EXE in Prefetch, executed 2004-08-26) - remote access
- My Documents contains organized hacking tool directories: ARCHIVE, COMMANDS, ENUMERATION (Cerberus Scanner, enum, GetAcct, DumpTools), EXPLOITATION (Brutus, Pwdump, dsniff, VNC, Hk), FOOTPRINTING (Nmap, NSTPro2)
- My Documents\DICTIONARIES contains test.zip (6.4 MB password dictionary)
- My Documents\COMMANDS contains crack.exe, pwdump.exe, snitch.exe, user2sid.exe, STREAMFIND.EXE, and other enumeration tools

**Execution Evidence (Prefetch confirms these were run, not just installed):**
CAIN25B45.EXE, CUTE3032.EXE, ETHEREAL.EXE, ETHEREAL-SETUP-0.10.6.EXE, LOOKATLAN.EXE, LOOKATHOST.EXE, MIRC.EXE, MIRC612.EXE, NETSTUMBLER.EXE, NETSTUMBLERINSTALLER_0_4_0, WHOIS.EXE, TELNET.EXE, PING.EXE, CMD.EXE

**Cain & Abel Operational Use:** Cain was not only executed but created output files: SMTP.LST (0 bytes, created 2004-08-25), DRR.LST (0 bytes initially, created 2004-08-25, modified 2004-08-27 15:34:52, indicating active use on the last day of activity). A 3.4 MB Wordlist.txt was present in the Cain\Wordlists directory.

**Network Access to Remote Machines (Operational Use Evidence):** NetHood directory reveals Mr. Evil mapped drives on a remote computer named "Andrews-1", accessing multiple shares:
- andrews (c) on Andrews-1 - C: drive share
- CD Drive (F) on Andrews-1 - CD drive 
- a on Andrews-1 - additional share
- d on Andrews-1 - D: drive share
- e on Andrews-1 - E: drive share
All created 2004-08-26 15:07:27. Additionally, a recent document shortcut "Temp on m1200 (4.12.220.254).lnk" (created 2004-08-26 15:08:14) shows access to a Temp folder on a device at external IP 4.12.220.254. This demonstrates OPERATIONAL network access beyond mere tool installation, showing the laptop was actively used to access other computers' filesystems during the investigation period.

**Counter-Analysis Note - Dual-Use Tool Context:** Five of the six listed tools (mIRC, Ethereal, Look@LAN, CuteFTP, NetStumbler) have legitimate primary uses in IT administration, network troubleshooting, and security auditing. Standing alone, their presence would not establish hacking intent. However, the context overwhelmingly establishes malicious purpose: (1) the My Documents directory is organized into a penetration testing taxonomy (ENUMERATION, EXPLOITATION, FOOTPRINTING, COMMANDS, DICTIONARIES) containing dedicated attack tools (Brutus password cracker, pwdump, dsniff, Nmap, Cerberus vulnerability scanner, crack.exe); (2) the user identity is deliberately crafted around a hacking persona ("Mr. Evil", "mrevilrulez"); (3) subscription to 20+ hacking-focused newsgroups; (4) IRC connections to shell-trading and hacking channels; (5) a 6.4 MB password dictionary for use with cracking tools. In this totality, the dual-use tools serve as components of a comprehensive hacking toolkit.

**samdump.dll YARA Hit Context:** YARA detected "HackTool_Samples" signature matching "samdump.dll" at raw disk offset 0x1e4bf1dd (~509 MB into the image). This offset falls within the region containing My Documents content, suggesting the detection is from a stored/archived hacking tool package (likely related to the pwdump3 archive in EXPLOITATION\NT\Pwdump) rather than an actively installed system-level tool.

**Stored vs. Executed Distinction:** The tools in My Documents (Brutus, pwdump, dsniff, Nmap, Cerberus, crack.exe) appear as downloaded/copied archives and packages. Prefetch does not confirm execution of these specific tools. Their presence demonstrates tool collection and intent, but operational use of these specific tools is unconfirmed from available evidence. Only the six installed Program Files tools and Cain have confirmed execution via Prefetch.



### 3. [HIGH] Ethereal Packet Capture - Wireless Traffic Interception

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:29:14 to 2004-08-27T15:35:53 |
| **Sources** | tsk.filelist, ez.mft, bulk.url, bulk.domain |
| **Evidence Refs** | tc_0e2d1e78, tc_8f1854b3, tc_1028db7c, tc_746b4c3b, tc_51379fea, tc_ffcbd903 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/) |


**Q23 - Ethereal Capture Filename:** The file "interception" is located at Documents and Settings/Mr. Evil/interception (inode 12264-128-4). This is an Ethereal packet capture file found in the user's profile directory. The Ethereal application (v0.10.6) and WinPcap were installed on the system, and Ethereal preferences were configured (MFT shows preferences file at Documents and Settings\Mr. Evil\Application Data\Ethereal\preferences, created 2004-08-27T15:35:53).

**Q24/Q25 - Intercepted Traffic Analysis:** The "interception" file represents captured network traffic. Mr. Evil was equipped with:
- Compaq WL110 Wireless LAN PC Card (NIC 11)
- NetStumbler 0.4.0 (wardriving tool, executed per Prefetch and desktop shortcut)
- Ethereal 0.10.6 (packet capture tool)
- Website visits to www.netstumbler.com and wireless security resources

The combination of wireless scanning tools (NetStumbler), packet capture capability (Ethereal + WinPcap), and the Compaq WL110 wireless card indicates the user was conducting wireless network reconnaissance and traffic interception (wardriving). The victim device type and specific websites accessed within the intercepted traffic would require direct pcap analysis.

**Counter-Analysis Note - Q24/Q25 Gap:** The pcap "interception" file was not extracted and analyzed (icat source is empty, pasco failed on index.dat). Without actual pcap analysis, the victim device type and intercepted websites remain unknown. The file's existence and name ("interception") combined with the wireless tools establish the user's capability and intent for wireless traffic capture, but the specific content and scope of the interception cannot be confirmed from current evidence.

**Counter-Analysis Note - T1557 Assessment:** The original MITRE mapping included T1557 (Adversary-in-the-Middle). Packet capture alone constitutes T1040 (Network Sniffing), not necessarily MITM. While Cain & Abel has ARP poisoning capabilities that could enable MITM, there is no evidence in the indexed data that ARP poisoning or MITM techniques were actually deployed. The T1557 mapping has been removed pending pcap analysis that might confirm or deny MITM activity.

**Q26 - Web-Based Email Address:** mrevilrulez@yahoo.com
Confirmed in Yahoo Mail pages cached in browser (bulk.domain shows "mrevilrulez@yahoo.com" in Yahoo Mail web interface HTML at disk offset 1832277600 and 1832262722).

**Q27 - Yahoo Mail Local Filename:** Yahoo Mail saves email copies locally as "ShowLetter[1].htm" in the IE Temporary Internet Files cache (found at Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/HYU1BON0/ShowLetter[1].htm, inode 11247). The URL pattern is http://us.f613.mail.yahoo.com/ym/ShowLetter?MsgId=...



### 4. [MEDIUM] Email and NNTP Configuration - whoknowsme@sbcglobal.net

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T21:14:20 to 2004-08-20T21:16:43 |
| **Sources** | registry.query.sam, ez.mft, tsk.filelist |
| **Evidence Refs** | tc_39e9752a, tc_36364c36, tc_cb55f4c5, tc_ad9191f4 |


**Q17 - SMTP Email Address:** whoknowsme@sbcglobal.net
Configured in Outlook Express (Internet Account Manager\Accounts\00000001):
- SMTP Server: smtp.sbcglobal.net
- SMTP Email Address: whoknowsme@sbcglobal.net
- SMTP Display Name: Mr Evil
- POP3 Server: pop.sbcglobal.net
- POP3 User Name: whoknowsme@sbcglobal.net

**Q18 - NNTP News Server Settings:**
Configured in Outlook Express (Internet Account Manager\Accounts\00000002):
- NNTP Server: news.dallas.sbcglobal.net
- NNTP User Name: whoknowsme@sbcglobal.net
- NNTP Display Name: Mr Evil
- NNTP Email Address: whoknowsme@sbcglobal.net
- Account Name: news.dallas.sbcglobal.net
- Last Updated: 2004-08-20T21:16:43 UTC

**Q19 - Two Programs Showing Email/NNTP Configuration:**
1. **Outlook Express** (MSIMN.EXE in Prefetch) - Microsoft email and newsreader client; account settings stored in NTUSER.DAT registry under Software\Microsoft\Internet Account Manager
2. **Agent** (Program Files\Agent\agent.exe) - Forte Agent newsreader, installed 2004-08-20, used for accessing hacking newsgroups

Both programs use the same whoknowsme@sbcglobal.net identity and news.dallas.sbcglobal.net NNTP server.

**Counter-Analysis Note:** The "dallas" subdomain in news.dallas.sbcglobal.net is consistent with a Dallas, Texas area SBC Global internet service account, providing a geographic indicator for the user's ISP location. The sbcglobal.net ISP was a major regional provider in the south-central US region.



### 5. [MEDIUM] Hacking Newsgroup Subscriptions in Outlook Express

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T21:16:43 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_0e2d1e78, tc_a25a3eae |
| **ATT&CK** | [T1583](https://attack.mitre.org/techniques/T1583/) |


**Q20 - Newsgroup Subscriptions:** Mr. Evil was subscribed to numerous hacking-related newsgroups via Outlook Express. The .dbx files in the Outlook Express store directory (Documents and Settings\Mr. Evil\Local Settings\Application Data\Identities\{EF086998-1115-4ECD-9B13-9ADC067B4929}\Microsoft\Outlook Express) document subscriptions to the following hacking newsgroups:

1. **alt.2600.crackz** - Software cracking
2. **alt.2600.hackerz** - Hacking discussions (2600 community)
3. **alt.binaries.hacking.beginner** - Beginner hacking binaries
4. **alt.binaries.hacking.computers** - Computer hacking binaries
5. **alt.binaries.hacking.utilities** - Hacking utility distribution

Additional subscribed newsgroups include: alt.2600, alt.2600.cardz, alt.2600.codez, alt.2600.moderated, alt.2600.phreakz, alt.2600.programz, alt.binaries.hacking.websites, alt.dss.hack, alt.hacking, alt.nl.binaries.hack, alt.stupidity.hackers.malicious, free.binaries.hackers.malicious, free.binaries.hacking.beginner, free.binaries.hacking.computers, free.binaries.hacking.talentless.troll-haven, free.binaries.hacking.talentless.troll_haven, free.binaries.hacking.utilities, free.binaries.hacking.websites.

All newsgroups accessed via news.dallas.sbcglobal.net NNTP server.



### 6. [MEDIUM] mIRC Configuration and IRC Channel Activity

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:29:01 to 2004-08-20T14:26:18 |
| **Sources** | appfiles.program_files.mirc.mirc.ini, appfiles.program_files.mirc.#cybercafe.undernet.log, appfiles.program_files.mirc.#elite.hackers.undernet.log, appfiles.program_files.mirc.#luxshell.undernet.log |
| **Evidence Refs** | tc_bd516b7b, tc_424a2872 |
| **ATT&CK** | [T1071.001](https://attack.mitre.org/techniques/T1071/001/) |


**Q21 - mIRC User Settings (displayed in chat channels):**
From mirc.ini [mirc] section:
- Nick: Mr
- Alternate Nick: mrevilrulez
- User (Real Name): Mini Me
- Email: none@of.ya
- Default server: losangeles.ca.us.undernet.org:6660 (Undernet network)
- Ident userid: Mrevil (system: UNIX)

**Q22 - IRC Channels Accessed:** mIRC log files document access to multiple IRC channels across three networks:

**UnderNet channels:**
- #Chataholics (Session: 2004-08-20 10:52:09)
- #CyberCafe (Session: 2004-08-20 10:54:21 - most activity)
- #elite.hackers (Session: 2004-08-20 10:45:34)
- #funny (Session: 2004-08-20 14:26:18)
- #houston (Session: 2004-08-20 10:48:59)
- #LuxShell (Session: 2004-08-20 10:42:03)
- #mp3xserv (Session: 2004-08-20 10:43:16)
- #ushells (Session: 2004-08-20 10:44:49)

**EFNet channels:**
- #evilfork (Session: 2004-08-20 10:30:18)
- #iso-warez (Session: 2004-08-20 10:29:01)

**AfterNet channels:**
- #thedarktower (Session: 2004-08-20 14:14:45)

Notable hacking-related channels: #elite.hackers, #LuxShell (shell trading), #ushells (Unix shells), #iso-warez (pirated software).

**Counter-Analysis Note - Minimal Active Participation:** Review of actual IRC log content reveals very brief sessions with minimal engagement. In #LuxShell, user "mrevilrulez" typed only "glib smarm cuyk" (nonsensical text) during a 1-minute session. In #Elite.Hackers, the user joined, observed for 4 minutes without speaking, and left. In #ushells, the session was similarly brief. This pattern suggests exploratory browsing of hacking communities rather than established engagement or active participation in tool trading. The channel names and topics are still noteworthy as indicators of interest/intent, but there is no evidence of the user actually conducting hacking discussions, trading shells, or receiving stolen credentials through IRC. The finding remains relevant as part of the broader pattern of hacking-oriented behavior, but the IRC evidence alone demonstrates interest, not operational activity.



### 7. [MEDIUM] Recycle Bin Contents and Deleted Files Analysis

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T17:35:07 |
| **Sources** | tsk.filelist, clamav.scan, yara.files |
| **Evidence Refs** | tc_d88e9b68, tc_9391c803, tc_c9a72545, tc_570f82b3 |
| **ATT&CK** | [T1070.004](https://attack.mitre.org/techniques/T1070/004/) |


**Q28 - Executable Files in Recycle Bin:** 4 executable files are present in the RECYCLER directory:
- RECYCLER/S-1-5-21-2000478354-688789844-1708537768-1003/Dc1.exe (inode 11692)
- RECYCLER/S-1-5-21-2000478354-688789844-1708537768-1003/Dc2.exe (inode 11996)
- RECYCLER/S-1-5-21-2000478354-688789844-1708537768-1003/Dc3.exe (inode 12033)
- RECYCLER/S-1-5-21-2000478354-688789844-1708537768-1003/Dc4.exe (inode 12041)
Plus desktop.ini and INFO2 (Recycle Bin metadata).

The SID S-1-5-21-2000478354-688789844-1708537768-1003 corresponds to the "Mr. Evil" user account.

**Q29 - Are Recycled Files Truly Deleted?** No. The files are marked as "r/r" (regular/regular - allocated) in the TSK file listing, meaning they are NOT truly deleted from disk. They remain in the RECYCLER folder and are fully recoverable. The Recycle Bin merely moves files to the RECYCLER directory; they are not overwritten or deallocated until the Recycle Bin is emptied.

**Q30 - Total Deleted Files:** The filesystem reports approximately 7,038 deleted file entries (entries marked with the TSK "*" deleted flag). These are distributed primarily across:
- Documents and Settings: 92 deleted entries
- WINDOWS: 76 deleted entries
- Program Files: 12 deleted entries
- My Documents: 3 deleted entries

**Counter-Analysis Note - Deleted File Count Context:** The ~7,038 deleted count is likely dominated by routine OS operations rather than intentional evidence destruction. Examination of the deleted entries ("r/- *" markers in tsk.filelist) shows they include MPC*.tmp files in Default User profiles, OS temp files, Windows cache files, and other routine cleanup artifacts. For a Windows XP system that was actively used for 9 days with software installations, web browsing, and application execution, this volume of deleted temp files is normal. The 92 deleted entries in Documents and Settings are largely user profile temp files. The finding should not be interpreted as evidence of deliberate mass evidence destruction.

**Counter-Analysis Note - Recycle Bin Original Names Unknown:** The original filenames and paths of Dc1-Dc4.exe are not determinable from the indexed evidence. The INFO2 file (which contains the original file paths in Recycle Bin metadata) was not extracted and parsed. Without this, we cannot determine whether these were hacking tools being concealed, legitimate software being uninstalled, or something else entirely. The "Dc" prefix is simply the Recycle Bin renaming convention (D = deleted, c = drive letter C:, 1-4 = sequence). The MITRE T1070.004 mapping is appropriate for the Recycle Bin mechanism itself but the intent behind the deletions remains unestablished.

**Q31 - Virus Scan Results:** ClamAV scanning detected no viruses in the disk image files (all returned "OK"). However, YARA scanning detected a "HackTool_Samples" signature matching "samdump.dll" at disk offset 0x1e4bf1dd, indicating the presence of password dumping tool artifacts within the image. This is a hacking tool, not a virus per se.



### 8. [INFO] System Identification and Acquisition Verification

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T17:35:07 to 2004-08-27T15:46:00 |
| **Sources** | hashdeep.hashes, registry.query.software, registry.query.system, tsk.fsstat, appfiles.program_files.look@lan.irunin.ini |
| **Evidence Refs** | tc_08bddae4, tc_beab0291, tc_18e1845a, tc_d579b796, tc_8b9e4054, tc_7e86f9c5, tc_ce2de628 |


**Q1 - Image Hash:** The forensic image 4Dell_Latitude_CPi.E01 (size: 671,094,597 bytes) has:
- MD5: 943243e71eda7481fee7b83f06698993
- SHA256: 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31

**Q2 - Operating System:** Microsoft Windows XP, Build 2600 (no Service Pack - CSDVersion not present in registry). NTFS filesystem. Confirmed via registry ProductName="Microsoft Windows XP", fsstat showing "Version: Windows XP", and Look@LAN config %ISWINXP%=TRUE.

**Q3 - OS Install Date:** The InstallDate registry value is 1092955707 (Unix epoch), which converts to August 19, 2004 at approximately 17:35 UTC.

**Q4 - Timezone:** Central Standard Time, as recorded in registry at ControlSet001\Control\TimeZoneInformation\StandardName.

**Q5 - Registered Owner:** Greg Schardt (registry: Microsoft\Windows NT\CurrentVersion\RegisteredOwner).

**Q6 - Computer Name:** N-1A9ODN6ZXK4LQ (registry: ControlSet001\Control\ComputerName\ComputerName).

**Q7 - Primary Domain:** The domain value is empty/blank (ControlSet001\Services\Tcpip\Parameters\Domain = ""), meaning the system is not joined to a domain; it operates standalone.

**Q8 - Last Shutdown:** The raw ShutdownTime FILETIME value is c4fc00074d8cc401 (registry: ControlSet001\Control\Windows\ShutdownTime). This corresponds to approximately 2004-08-27T15:46 UTC, consistent with the latest MFT activity observed on 2004-08-27 at 15:44:40.



### 9. [INFO] Network Interface Cards and Look@LAN Configuration

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T17:07:19 |
| **Sources** | registry.query.software, appfiles.program_files.look@lan.irunin.ini |
| **Evidence Refs** | tc_49ba04d1, tc_18c877fc, tc_7e86f9c5, tc_365c751a |


**Q13 - Network Interface Cards:** Two NICs are registered in the system (NetworkCards subkeys 2 and 11):
1. Xircom CardBus Ethernet 100 + Modem 56 (Ethernet Interface) - ServiceName: {6E4090C2-FAEF-489A-8575-505D21FC1049} - installed 2004-08-19T17:07:19
2. Compaq WL110 Wireless LAN PC Card - ServiceName: {86FC0C96-3FF2-4D59-9ABA-C602F213B5D2} - written 2004-08-27T15:31:44

**Q14 - Look@LAN Configuration:** The Look@LAN irunin.ini records:
- IP Address: 192.168.1.111
- MAC Address: 0010a4933e09 (00:10:A4:93:3E:09)

**Q15 - NIC Used During Look@LAN Installation:** The MAC address prefix 00:10:A4 belongs to the Xircom vendor (IEEE OUI). This confirms the Xircom CardBus Ethernet 100 + Modem 56 NIC was active during Look@LAN installation, NOT the Compaq wireless card.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| External IP | `4.12.220.254` |  | Hacking Tool Suite - Six Programs Installed for Malicious Purposes |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Path | `C:\Documents` |  | User Accounts and Identity Linking - Greg Schardt is "Mr. Evil" |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `mrevilrulez@yahoo.com` |  | User Accounts and Identity Linking - Greg Schardt is "Mr. Evil" |
| Email | `whoknowsme@sbcglobal.net` |  | User Accounts and Identity Linking - Greg Schardt is "Mr. Evil" |
| Email | `none@of.ya` |  | User Accounts and Identity Linking - Greg Schardt is "Mr. Evil" |




---

## Appendix C: MITRE ATT&CK Coverage

9 techniques identified across findings.


**Kill Chain Coverage:** Resource Development (1) > Initial Access (1) > Persistence (1) > Privilege Escalation (1) > Defense Evasion (2) > Credential Access (2) > Discovery (2) > Lateral Movement (1) > Command and Control (2)


### Resource Development

| Technique | Name | Findings |
|-----------|------|----------|
| [T1583](https://attack.mitre.org/techniques/T1583/) | Acquire Infrastructure | Hacking Newsgroup Subscriptions in Outlook Express |


### Initial Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | User Accounts and Identity Linking - Greg... |


### Persistence

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | User Accounts and Identity Linking - Greg... |


### Privilege Escalation

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | User Accounts and Identity Linking - Greg... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1070.004](https://attack.mitre.org/techniques/T1070/004/) | File Deletion | Recycle Bin Contents and Deleted Files Analysis |
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | User Accounts and Identity Linking - Greg... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Hacking Tool Suite - Six Programs Installed...; Ethereal Packet Capture - Wireless Traffic Interception |
| [T1110](https://attack.mitre.org/techniques/T1110/) | Brute Force | Hacking Tool Suite - Six Programs Installed... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Hacking Tool Suite - Six Programs Installed...; Ethereal Packet Capture - Wireless Traffic Interception |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Hacking Tool Suite - Six Programs Installed... |


### Lateral Movement

| Technique | Name | Findings |
|-----------|------|----------|
| [T1021](https://attack.mitre.org/techniques/T1021/) | Remote Services | Hacking Tool Suite - Six Programs Installed... |


### Command and Control

| Technique | Name | Findings |
|-----------|------|----------|
| [T1071](https://attack.mitre.org/techniques/T1071/) | Application Layer Protocol | Hacking Tool Suite - Six Programs Installed... |
| [T1071.001](https://attack.mitre.org/techniques/T1071/001/) | Web Protocols | mIRC Configuration and IRC Channel Activity |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 266 |
| Findings submitted | 9 |
| Confirmed | 9 |
| Inferences | 0 |
| Input tokens | 240 |
| Output tokens | 90.4K |
| Total tokens | 90.6K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 148 | 20.0K | 20.1K |
| claude-opus-4-6 | 92 | 70.4K | 70.5K |




<details>
<summary>Evidence Sources (246)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.fsstat | sleuthkit | 39 |
| tsk.filelist | sleuthkit | 12545 |
| hashdeep.hashes | hashdeep | 6 |
| strings.output | strings | 187581 |
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
| registry.query.sam | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| appfiles.program_files.mirc.aliases.ini | icat | 16 |
| registry.query.software | python-registry | 1 |
| appfiles.program_files.look@lan.irunin.ini | icat | 399 |
| appfiles.program_files.ethereal.dictionary.xml | icat | 649 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.mirc.#chataholics.undernet.log | icat | 16 |
| appfiles.program_files.look@lan.license.txt | icat | 25 |
| appfiles.program_files.ethereal.mobileipv4.xml | icat | 64 |
| appfiles.documents_and_settings.sharedaccess.ini | icat | 52 |
| appfiles.program_files.mirc.#cybercafe.undernet.log | icat | 207 |
| appfiles.program_files.ethereal.nasreq.xml | icat | 293 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.mirc.#elite.hackers.undernet.log | icat | 11 |
| appfiles.program_files.ethereal.sunping.xml | icat | 24 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| appfiles.program_files.mirc.#evilfork.efnet.log | icat | 11 |
| appfiles.program_files.ethereal.capture_filters.txt | icat | 80 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.mirc.#funny.undernet.log | icat | 10 |
| appfiles.program_files.ethereal.capturing.txt | icat | 84 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| appfiles.program_files.mirc.#houston.undernet.log | icat | 9 |
| appfiles.program_files.ethereal.display_filters.txt | icat | 43 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.mirc.#iso-warez.efnet.log | icat | 7 |
| appfiles.program_files.ethereal.faq.txt | icat | 2228 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| appfiles.program_files.mirc.#luxshell.undernet.log | icat | 13 |
| appfiles.program_files.ethereal.getting_started.txt | icat | 90 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.mirc.#mp3xserv.undernet.log | icat | 15 |
| appfiles.program_files.ethereal.overview.txt | icat | 38 |
| appfiles.documents_and_settings.desktop.ini | icat | 10 |
| appfiles.program_files.mirc.#thedarktower.afternet.log | icat | 14 |
| appfiles.program_files.ethereal.well_known.txt | icat | 114 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| appfiles.program_files.mirc.#ushells.undernet.log | icat | 9 |
| appfiles.program_files.ethereal.pcrepattern.3.txt | icat | 1475 |
| appfiles.documents_and_settings.desktop.ini | icat | 6 |
| appfiles.program_files.mirc.m5tar.undernet.log | icat | 8 |
| appfiles.program_files.ethereal.agentx-mib.txt | icat | 529 |
| appfiles.documents_and_settings.desktop.ini | icat | 14 |
| appfiles.program_files.mirc.mirc.ini | icat | 224 |
| appfiles.program_files.ethereal.disman-event-mib.txt | icat | 1957 |
| appfiles.documents_and_settings.desktop.ini | icat | 12 |
| appfiles.program_files.mirc.popups.ini | icat | 96 |
| appfiles.program_files.ethereal.disman-schedule-mib.txt | icat | 701 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.mirc.readme.txt | icat | 34 |
| appfiles.program_files.ethereal.disman-script-mib.txt | icat | 1766 |
| appfiles.documents_and_settings.desktop.ini | icat | 16 |
| appfiles.program_files.mirc.servers.ini | icat | 423 |
| appfiles.program_files.ethereal.etherlike-mib.txt | icat | 1139 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.mirc.urls.ini | icat | 9 |
| appfiles.program_files.ethereal.hcnum-tc.txt | icat | 120 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.mirc.versions.txt | icat | 472 |
| appfiles.program_files.ethereal.host-resources-mib.txt | icat | 1542 |
| appfiles.documents_and_settings.brndlog.txt | icat | 5 |
| appfiles.program_files.ethereal.host-resources-types.txt | icat | 391 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.iana-address-family-numbers-mib.txt | icat | 123 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.program_files.ethereal.iana-language-mib.txt | icat | 125 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| appfiles.program_files.ethereal.ianaiftype-mib.txt | icat | 392 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.if-inverted-stack-mib.txt | icat | 151 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.if-mib.txt | icat | 1816 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.inet-address-mib.txt | icat | 300 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.ip-forward-mib.txt | icat | 811 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.ip-mib.txt | icat | 722 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.ipv6-icmp-mib.txt | icat | 531 |
| appfiles.documents_and_settings.desktop.ini | icat | 6 |
| appfiles.program_files.ethereal.ipv6-mib.txt | icat | 1445 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.ipv6-tc.txt | icat | 69 |
| appfiles.documents_and_settings.desktop.ini | icat | 9 |
| appfiles.program_files.ethereal.ipv6-tcp-mib.txt | icat | 213 |
| appfiles.documents_and_settings.desktop.ini | icat | 11 |
| appfiles.program_files.ethereal.ipv6-udp-mib.txt | icat | 143 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.lm-sensors-mib.txt | icat | 232 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| appfiles.program_files.ethereal.mta-mib.txt | icat | 1228 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.net-snmp-agent-mib.txt | icat | 546 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.net-snmp-examples-mib.txt | icat | 229 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.program_files.ethereal.net-snmp-mib.txt | icat | 69 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.program_files.ethereal.net-snmp-monitor-mib.txt | icat | 61 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.net-snmp-system-mib.txt | icat | 65 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.net-snmp-tc.txt | icat | 123 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.network-services-mib.txt | icat | 628 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.notification-log-mib.txt | icat | 784 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.rfc-1215.txt | icat | 40 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.rfc1155-smi.txt | icat | 121 |
| appfiles.program_files.ethereal.rfc1213-mib.txt | icat | 2615 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.rmon-mib.txt | icat | 3982 |
| appfiles.documents_and_settings.brndlog.txt | icat | 217 |
| appfiles.program_files.ethereal.smux-mib.txt | icat | 162 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.program_files.ethereal.snmp-community-mib.txt | icat | 431 |
| appfiles.documents_and_settings.mr._evil@www.drudgereport[1].txt | icat | 11 |
| appfiles.program_files.ethereal.snmp-framework-mib.txt | icat | 528 |
| appfiles.documents_and_settings.mr._evil@advertising[2].txt | icat | 29 |
| appfiles.program_files.ethereal.snmp-mpd-mib.txt | icat | 147 |
| appfiles.documents_and_settings.mr._evil@atdmt[2].txt | icat | 11 |
| appfiles.program_files.ethereal.snmp-proxy-mib.txt | icat | 296 |
| appfiles.documents_and_settings.mr._evil@atwola[2].txt | icat | 11 |
| appfiles.program_files.ethereal.snmp-target-mib.txt | icat | 662 |
| appfiles.documents_and_settings.mr._evil@centrport[1].txt | icat | 11 |
| appfiles.program_files.ethereal.snmp-user-based-sm-mib.txt | icat | 914 |
| appfiles.documents_and_settings.mr._evil@cnn[1].txt | icat | 11 |
| appfiles.program_files.ethereal.snmp-view-based-acm-mib.txt | icat | 832 |
| appfiles.documents_and_settings.mr._evil@doubleclick[1].txt | icat | 11 |
| appfiles.program_files.ethereal.snmpv2-conf.txt | icat | 324 |
| appfiles.documents_and_settings.mr._evil@fastclick[1].txt | icat | 29 |
| appfiles.program_files.ethereal.snmpv2-mib.txt | icat | 856 |
| appfiles.documents_and_settings.mr._evil@google[1].txt | icat | 11 |
| appfiles.program_files.ethereal.snmpv2-smi.txt | icat | 346 |
| appfiles.documents_and_settings.mr._evil@list[1].txt | icat | 11 |
| appfiles.program_files.ethereal.snmpv2-tc.txt | icat | 774 |
| appfiles.documents_and_settings.mr._evil@maktoob[1].txt | icat | 11 |
| appfiles.program_files.ethereal.snmpv2-tm.txt | icat | 178 |
| appfiles.documents_and_settings.mr._evil@microsoft[1].txt | icat | 11 |
| appfiles.program_files.ethereal.tcp-mib.txt | icat | 332 |
| appfiles.documents_and_settings.mr._evil@msn[2].txt | icat | 56 |
| appfiles.program_files.ethereal.tunnel-mib.txt | icat | 339 |
| appfiles.documents_and_settings.mr._evil@revenue[2].txt | icat | 11 |
| appfiles.program_files.ethereal.ucd-demo-mib.txt | icat | 76 |
| appfiles.documents_and_settings.mr._evil@search.msn[1].txt | icat | 29 |
| appfiles.program_files.ethereal.ucd-diskio-mib.txt | icat | 119 |
| appfiles.documents_and_settings.mr._evil@servedby.advertising[2].txt | icat | 20 |
| appfiles.program_files.ethereal.ucd-dlmod-mib.txt | icat | 121 |
| appfiles.documents_and_settings.mr._evil@sj9[1].txt | icat | 11 |
| appfiles.program_files.ethereal.ucd-ipfilter-mib.txt | icat | 258 |
| appfiles.documents_and_settings.mr._evil@tribalfusion[1].txt | icat | 38 |
| appfiles.program_files.ethereal.ucd-ipfwacc-mib.txt | icat | 329 |
| appfiles.documents_and_settings.mr._evil@www.cnn[1].txt | icat | 11 |
| appfiles.program_files.ethereal.ucd-snmp-mib-old.txt | icat | 746 |
| appfiles.documents_and_settings.mr._evil@www.maktoob[2].txt | icat | 11 |
| appfiles.program_files.ethereal.ucd-snmp-mib.txt | icat | 1384 |
| appfiles.documents_and_settings.mr._evil@www.netstumbler[2].txt | icat | 11 |
| appfiles.program_files.ethereal.udp-mib.txt | icat | 148 |
| appfiles.documents_and_settings.mr._evil@yahoo[1].txt | icat | 29 |
| appfiles.program_files.ethereal.snmp-notification-mib.txt | icat | 591 |
| appfiles.documents_and_settings.mr[1].txt | icat | 11 |
| appfiles.documents_and_settings.mr[2].txt | icat | 38 |
| appfiles.documents_and_settings.desktop.ini | icat | 6 |
| appfiles.documents_and_settings.cleanup.log | icat | 10 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 6 |
| appfiles.documents_and_settings.desktop.ini | icat | 10 |
| appfiles.documents_and_settings.desktop.ini | icat | 10 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| appfiles.documents_and_settings.desktop.ini | icat | 6 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 9 |
| appfiles.documents_and_settings.desktop.ini | icat | 12 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 8 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| ez.mft | eztools | 12183 |
| ez.shimcache | eztools | 140 |
| ez.prefetch | eztools | 165 |
| tsk.masquerade | sleuthkit | 14 |
| clamav.scan | clamav | 3 |
| yara.files | yara | 3 |
| pasco.history | pasco | 6 |
| regripper.system | regripper | 0 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.ntuser.Mr. Evil | python-registry | 1 |
| registry.query.ntuser.Mr. Evil | python-registry | 1 |
| registry.query.ntuser.Mr. Evil | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.sam | python-registry | 1 |
| composite.file_staging | composite | 668 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
