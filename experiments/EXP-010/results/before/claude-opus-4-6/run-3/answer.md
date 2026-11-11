# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-11T14:32:30.160800+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 262 evidence sources (17 disk, 245 other) | 238 tool calls | 30 minutes
**Results:** 8 findings (2 high) | 7 confirmed, 1 inference
**Timeline:** 2004-08-19 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2004-08-27): System Identification and Acquisition Verification (+5 related)
- **Persistence** (2004-08-27): Network Interception and Wardriving Evidence
- **Command and Control** (2004-08-20): mIRC Chat Activity and IRC Channel Analysis

**Tools:** search (104), get_raw_output (25), query_registry_value (22), submit_finding (8), open_case (7). SHA-256 hashes recorded for all evidence.



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

238 tool calls were executed across 21
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Digital Forensic Investigation Report: NIST Hacking Case — Dell Latitude CPi Notebook

## Background

On September 20, 2004, law enforcement recovered an abandoned Dell CPi notebook computer (Serial Number VLQLW) along with a wireless PCMCIA card and an external homemade 802.11b antenna. The circumstances of the abandonment, combined with the presence of a custom-fabricated wireless antenna, raised immediate suspicion that the computer had been used for unauthorized wireless network interception. Intelligence from associates of a suspect, Greg Schardt — known by the online handle "Mr. Evil" — indicated that Schardt would park his vehicle within range of commercial wireless access points (such as Starbucks and other T-Mobile Hotspots) to intercept internet traffic and attempt to capture credit card numbers, usernames, and passwords.

This investigation was tasked with forensically imaging and analyzing the recovered notebook to identify hacking software, evidence of its use, any intercepted data, and — critically — any evidence tying the computer to the suspect Greg Schardt.

The forensic evidence consisted of an EnCase image of the notebook's hard drive, provided as a two-segment E01 file (4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02), totaling 671,094,597 bytes. The analysis leveraged 21 indexed evidence sources across multiple forensic extraction tools, including The Sleuth Kit for filesystem analysis, bulk_extractor for data carving, RegRipper and python-registry for Windows registry analysis, YARA rule scanning, ClamAV antivirus scanning, and hashdeep for integrity verification. A total of 238 tool invocations were performed over the course of the investigation, producing 8 formal findings, of which 7 were confirmed with high confidence and 1 were assessed as investigative inferences. The analysis mapped observed activity to 5 MITRE ATT&CK techniques.

The examined system ran Microsoft Windows XP, installed on August 19, 2004, with the last recorded shutdown on August 27, 2004 — placing the entire operational window within a nine-day period. The system was configured with the timezone set to Central Standard Time / Central Daylight Time (UTC−6 standard, UTC−5 during daylight saving), and the registered owner was recorded as "Greg Schardt." The computer account name was N-1A9ODN6ZXK4LQ, which also served as the primary domain name, confirming the machine operated as a standalone workgroup computer rather than a domain-joined enterprise asset.

## Incident Timeline

The operational activity on this computer spans a concentrated nine-day window from August 19 to August 27, 2004, and can be organized into four distinct phases.

**Phase 1: System Setup and Initial Configuration (August 19, 2004)**

The Windows XP operating system was installed at approximately 17:08 UTC on August 19, 2004 (Unix timestamp 1092955707), with "Greg Schardt" entered as the registered owner. During the initial configuration, the user account "Mr. Evil" was created (RID 1003) at 23:03:54 UTC, establishing it as the sole operational user account. The system contained five total accounts — Administrator (RID 500), Guest (RID 501), HelpAssistant (RID 1000), SUPPORT_388945a0 (RID 1002), and Mr. Evil (RID 1003) — but only Mr. Evil ever recorded a login, ultimately accumulating 15 login sessions over the computer's operational life. The choice to register the system under the real name "Greg Schardt" while creating a pseudonymous operational account "Mr. Evil" represents the first piece of evidence linking the suspect's true identity to the hacking persona.

**Phase 2: Tool Acquisition and Hacking Infrastructure Build-Out (August 20, 2004)**

On August 20, 2004, Mr. Evil began an intensive period of software installation and configuration. Beginning at approximately 15:05 UTC, the Anonymizer anonymous browsing tool was installed from D:\Drivers\Anonyymizer\setup.exe, followed shortly at 15:12:54 UTC by 123 WASP, a password recovery utility, installed from D:\Drivers\Password recovery\123wasp_setup.exe. Cain & Abel, a powerful password cracking and network sniffing tool, was installed from D:\Drivers\Cain & Abel\cain25b45.exe. The use of a D: drive path labeled "Drivers" for all three installations suggests the tools were pre-staged on removable media.

During this same day, Mr. Evil configured email and news services. Outlook Express was executed at 21:13:23 UTC and configured with a POP3/SMTP email account (whoknowsme@sbcglobal.net) connected to smtp.sbcglobal.net and pop.sbcglobal.net, as well as an NNTP newsgroup account pointing to news.dallas.sbcglobal.net. Between 21:14:20 and 21:16:43 UTC, Mr. Evil subscribed to over twenty newsgroups, overwhelmingly focused on hacking: alt.hacking, alt.2600.crackz, alt.2600.phreakz, alt.binaries.hacking.beginner, alt.binaries.hacking.utilities, alt.2600, alt.2600.cardz, alt.2600.codez, alt.2600.hackerz, alt.dss.hack, and numerous others. The breadth and specificity of these subscriptions — spanning phreaking, credit card fraud ("cardz"), password cracking ("crackz"), and hacking tools — go well beyond casual interest.

Also on August 20, Mr. Evil connected to multiple IRC networks using mIRC, configured with the nickname "Mr" (alternate: "mrevilrulez"), the real name field set to "Mini Me," the email set to "none@of.ya," and the system identifier falsely set to "UNIX." Between 10:30 and approximately 14:26 UTC, Mr. Evil visited channels including #evilfork on EFnet, #Elite.Hackers, #LuxShell, #ushells, #Chataholics, and #CyberCafe on UnderNet. Most sessions were brief (one to three minutes), with Mr. Evil posting the apparent test phrase "glib smarm cuyk" in several channels before disconnecting — behavior more consistent with channel reconnaissance than active participation.

**Phase 3: Advanced Tool Deployment (August 25–26, 2004)**

On August 25, 2004, Look@LAN, a network monitoring and scanning tool, was installed at approximately 10:55:34 UTC. The Look@LAN installer configuration file (irunin.ini) captured critical forensic data: it recorded %REGOWNER% as "Greg Schardt," %LANUSER% as "Mr. Evil," and %USERNAME% as "Greg Schardt," providing irrefutable evidence that the Windows registered owner Greg Schardt and the Mr. Evil user account existed on the same machine at the same time. The file also recorded %ISUSERNTADMIN%=TRUE, confirming administrator privileges, and captured the network configuration at installation time: IP address 192.168.1.111, MAC address 00:10:A4:93:3E:09. The MAC address prefix 00:10:A4 is registered to Xircom, Inc., identifying the Xircom CardBus Ethernet 100 + Modem 56 as the active network interface during installation. Forte Agent, a newsreader application, was also executed on August 25 at 15:55:34 UTC, providing a second program capable of accessing the NNTP news settings.

Look@LAN was subsequently executed on August 26 at 15:06:14 UTC for network reconnaissance.

**Phase 4: Final Operational Activity and Cleanup (August 27, 2004)**

August 27, 2004, represented the most intense day of operational activity and the last day the system was used. Network Stumbler, a wireless network scanning and wardriving tool, was installed from netstumblerinstaller_0_4_0.exe and executed at 15:12:35 UTC. Combined with the Compaq WL110 Wireless LAN PC Card present in the system and the homemade 802.11b antenna recovered with the notebook, this confirmed a complete wardriving capability.

Cain & Abel was executed at 15:33:02 UTC, and Ethereal (version 0.10.6), a network protocol analyzer and packet sniffer, was installed and executed at 15:34:54 UTC. The installation of Ethereal's prerequisite WinPcap library was confirmed through URL history showing a download from winpcap.mirror.ethereal.com. A file named "interception" was found in Mr. Evil's user profile directory (Documents and Settings\Mr. Evil\interception), representing captured network packet data consistent with Ethereal's default output behavior.

Between 15:12:11 and 15:29:58 UTC, four executable files (Dc1.exe through Dc4.exe) were moved to the Windows Recycle Bin under Mr. Evil's SID (S-1-5-21-2000478354-688789844-1708537768-1003), suggesting an attempt to conceal or clean up tools from the active filesystem. These files were not permanently deleted and remained recoverable.

The last recorded login by Mr. Evil occurred at 15:08:23 UTC, and the system's final shutdown was recorded at 15:46:33 UTC on August 27, 2004. The computer was subsequently abandoned along with the wireless hardware.

## Key Findings

**Identity Attribution: Greg Schardt Is Mr. Evil**

The most forensically significant finding is the definitive link between the suspect Greg Schardt and the "Mr. Evil" persona. The Look@LAN installer configuration file (irunin.ini) simultaneously captured both identities: the Windows registered owner "Greg Schardt" and the logged-in user account "Mr. Evil" during a single installation event on August 25, 2004. This was corroborated by the Windows XP registration in the SOFTWARE hive (RegisteredOwner = "Greg Schardt") and the SAM hive showing Mr. Evil as the sole active account with 15 logins. Additionally, a Yahoo account registration URL found in the browser history — http://edit.yahoo.com/config/id_check?.fn=Greg&.ln=Schardt&.id=mrevil2000 — explicitly associates the first name "Greg," last name "Schardt," and Yahoo ID "mrevil2000," further cementing the connection between the real identity and the online persona. The web-based email address mrevil2000@yahoo.com was confirmed through cached Yahoo Mail access artifacts.

**Hacking Tool Arsenal**

Six distinct hacking-related programs were identified as installed and executed on the system. Cain & Abel (v2.5 beta 45) is a comprehensive password recovery and network sniffing tool capable of credential interception. Ethereal (v0.10.6) is a network protocol analyzer used for packet capture and analysis. Network Stumbler (v0.4.0) is a dedicated wireless network discovery and wardriving tool. Look@LAN (v2.50 Build 29) is a network monitoring and scanning utility. 123 WASP is a password recovery tool. Anonymizer provides anonymous browsing capabilities to mask the user's true IP address.

Beyond these six primary tools, the system contained extensive additional hacking resources. YARA scanning detected a HackTool_Samples signature matching "samdump.dll," a tool used to dump credentials from the Windows SAM database. The My Documents directory contained organized subdirectories — ARCHIVE, COMMANDS, ENUMERATION, EXPLOITATION, and FOOTPRINTING — following a structured attack methodology. Within these directories were additional tools including Nmap (network scanner), Brutus (password brute-force tool), Pwdump (Windows password dumper), dsniff (network auditing suite), Cerberus Internet Scanner, and various exploitation utilities.

**Wireless Interception Capability**

The system was equipped with two network interface cards: a Compaq WL110 Wireless LAN PC Card for wireless network access and a Xircom CardBus Ethernet 100 + Modem 56 for wired connectivity. The combination of the wireless card, Network Stumbler (a dedicated wardriving tool), Ethereal (a packet capture tool), the homemade 802.11b antenna found with the computer, and the "interception" capture file constitutes a complete wireless network interception toolkit. Mr. Evil's browser history included visits to wardriving.com, further demonstrating active interest in wireless network exploitation. The interception file found in Mr. Evil's profile directory represents actual captured network traffic, though the binary contents of the packet capture were not parsed during this analysis to determine the specific victim device type or intercepted web traffic.

**Hacking Community Engagement**

Mr. Evil demonstrated extensive engagement with hacking communities through multiple channels. Over twenty hacking-focused newsgroup subscriptions were configured, spanning topics from phreaking to credit card fraud to password cracking. IRC activity across multiple servers (UnderNet, EFnet, AfterNet) included visits to channels named #Elite.Hackers, #LuxShell, #ushells, and #evilfork — though actual chat participation was minimal, consisting primarily of brief test messages. Browser history revealed visits to hacking-oriented websites including 2600.org/hacked_pages, elitehackers.com, and an MSN search for the term "hacking."

**Anti-Forensics and Evidence Concealment**

Several indicators of anti-forensic awareness were observed. The use of the Anonymizer tool for anonymous browsing demonstrates intent to obscure online activity. The mIRC configuration used a false email address ("none@of.ya") and falsely identified the operating system as "UNIX." Four executable files were moved to the Recycle Bin on the final day of operation (August 27), suggesting a cleanup attempt before the computer was abandoned. However, these anti-forensic efforts were incomplete: the Recycle Bin files were not permanently purged, the Look@LAN installer file retained the identity-linking configuration data, browser history and caches were not cleared, and the "interception" file was left in the user profile.

**Antivirus Assessment**

ClamAV scanning of the disk image returned a clean result with no viruses or malware detected. YARA scanning identified a HackTool_Samples signature matching samdump.dll, which is a hacking tool for dumping SAM database credentials, not a self-replicating virus. No traditional malware (viruses, worms, trojans) was present on the system. The hacking tools found are dual-use software that, while used for malicious purposes, do not constitute malware in the traditional antivirus sense.

## Threat Intelligence and Attribution

The evidence supports a high-confidence attribution of the computer and all activity on it to Greg Schardt, operating under the alias "Mr. Evil." This attribution rests on multiple independent and mutually reinforcing evidence sources: the Windows registered owner field recording "Greg Schardt," the Look@LAN installer configuration capturing both "Greg Schardt" and "Mr. Evil" during the same session, a Yahoo account registration URL containing the first name "Greg," last name "Schardt," and user ID "mrevil2000," and the fact that Mr. Evil was the sole account with any login activity across the computer's entire operational life.

The behavioral profile is consistent with an individual engaged in wardriving and wireless network interception. The tool selection — Network Stumbler for wireless discovery, Ethereal for packet capture, Cain & Abel for credential extraction, and the Anonymizer for operational security — represents a coherent attack chain optimized for intercepting wireless network traffic at public hotspots. This is consistent with the intelligence from Schardt's associates describing his practice of parking near Starbucks and T-Mobile hotspots to intercept internet traffic.

The structured organization of attack tools into FOOTPRINTING, ENUMERATION, EXPLOITATION, COMMANDS, and ARCHIVE directories mirrors the phases of a systematic attack methodology, suggesting the user had formal or self-directed training in penetration testing techniques, applied without authorization. The breadth of newsgroup subscriptions and IRC channel visits indicates active engagement with underground hacking communities, though no evidence of collaborative criminal activity or data sharing was found in the IRC logs.

No evidence was found to support a legitimate or authorized purpose for this tool collection. There were no penetration testing engagement letters, no educational institution affiliations, no security certification materials, and no professional security consulting documentation anywhere on the system.

## Impact Assessment

The scope of this incident centers on a single compromised notebook computer operated by a single individual over a nine-day period. However, the potential impact extends beyond the device itself.

The confirmed presence of the "interception" packet capture file demonstrates that actual network traffic interception occurred, though the full scope of intercepted data — including victim identities, captured credentials, and compromised communications — could not be fully assessed without parsing the binary packet capture file. The tool arsenal (Cain & Abel, Ethereal, samdump.dll, Pwdump, 123 WASP) was capable of capturing and cracking passwords from both network traffic and local Windows systems. The wardriving capability (Network Stumbler, wireless card, homemade antenna) enabled the operator to target any wireless access point within range, potentially affecting multiple victims at multiple locations.

The credential exposure risk is significant: Cain & Abel was last executed just minutes before Ethereal on the final day of operation, and the presence of samdump.dll and Pwdump indicates capability to extract Windows credentials from compromised systems. The Anonymizer tool's presence suggests awareness that the activity was illegal, as it served no purpose other than to obscure the attacker's identity.

The four executable files in the Recycle Bin, whose original names and purposes remain undetermined (the INFO2 metadata file was not parsed), may represent additional tools or captured data that the operator attempted to conceal before abandoning the system.

## Immediate Tactical Containment

Given that this investigation concerns an abandoned computer from 2004, traditional real-time containment actions (network isolation, process termination) are not applicable. However, the following evidence preservation and investigative actions should be taken:

1. Preserve the disk image integrity by verifying against the computed hashes: MD5 943243e71eda7481fee7b83f06698993 and SHA256 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31.
2. Parse the "interception" packet capture file (Documents and Settings\Mr. Evil\interception, inode 12264-128-4) to identify victims, intercepted credentials, and compromised web sessions.
3. Parse the Recycle Bin INFO2 metadata file (inode 11850-128-3) to recover original filenames and deletion timestamps for Dc1.exe through Dc4.exe.
4. Block or flag the email addresses whoknowsme@sbcglobal.net and mrevil2000@yahoo.com in any ongoing investigations as known identifiers for the suspect.
5. Flag the IP address 192.168.1.111 and MAC address 00:10:A4:93:3E:09 (Xircom NIC) as indicators associated with this investigation.
6. Investigate the Yahoo account mrevil2000 (registration URL: edit.yahoo.com/config/id_check?.fn=Greg&.ln=Schardt&.id=mrevil2000) for additional communications and contacts via legal process.
7. Examine the external D: drive source media referenced in installation paths (D:\Drivers\) for additional tool staging and potential evidence on other systems.

## Strategic Remediation

**Root Cause 1: Unencrypted Wireless Network Traffic Enabled Passive Interception.** The entire attack methodology — wardriving with Network Stumbler and the Compaq WL110 card, capturing traffic with Ethereal, and cracking credentials with Cain & Abel (Finding f_89b9d1f0, MITRE T1040, T1003) — depended on the availability of unencrypted or weakly encrypted wireless network traffic at public hotspots. The victim's traffic was interceptable because wireless access points of that era commonly used no encryption or weak WEP encryption. Deployment of WPA2 or stronger encryption at public wireless access points, combined with mandatory HTTPS for sensitive web services, would have rendered the packet capture in the "interception" file (Finding f_ccc16dc5) unreadable even if intercepted.

**Root Cause 2: Freely Available Attack Tooling With No Execution Controls.** Six hacking tools were installed and executed without any system-level controls preventing their use (Finding f_89b9d1f0). The Windows XP operating system provided no application whitelisting, code signing enforcement, or execution policy restrictions. While this reflects the state of consumer operating systems in 2004, the finding underscores the importance of application control policies on systems that may be used in sensitive environments.

**Root Cause 3: Incomplete Anti-Forensic Cleanup Left Full Attribution Trail.** Despite using the Anonymizer tool and false identity fields in mIRC, Schardt failed to sanitize the Look@LAN installer configuration (irunin.ini) that captured both his real name and alias simultaneously (Finding f_41128aa9), the Yahoo registration URL containing his full name (Finding f_ccc16dc5), browser history and caches, and the Recycle Bin contents (Finding f_2f85a88f). This finding serves as an investigative lesson: even technically sophisticated suspects frequently leave attribution artifacts in application installer logs, browser caches, and improperly purged Recycle Bins. Forensic investigators should prioritize these artifact categories when attempting to link devices to suspects.

**Root Cause 4: No Network Monitoring Detected the Wardriving Activity.** The suspect operated Network Stumbler to scan for wireless access points (Finding f_89b9d1f0, MITRE T1046) and then captured traffic with Ethereal (MITRE T1040), but there is no evidence that any wireless intrusion detection system flagged the scanning or interception activity. Deployment of wireless intrusion detection and prevention systems (WIDS/WIPS) at targeted hotspot locations could have detected the anomalous wireless probing associated with NetStumbler's active scanning behavior and provided real-time alerting.

## Conclusion

This investigation examined a Dell CPi notebook computer abandoned on September 20, 2004, suspected of being used for wireless network hacking. The forensic analysis produced 8 findings across 21 evidence sources, definitively establishing the computer's purpose and ownership.

**Case Questions**

Case Q1: The disk image MD5 hash is 943243e71eda7481fee7b83f06698993 and the SHA256 hash is 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31. The hashes were computed by hashdeep and can be verified against the original acquisition log. Image size is 671,094,597 bytes.

Case Q2: Microsoft Windows XP, as recorded in the SOFTWARE registry hive (Microsoft\Windows NT\CurrentVersion\ProductName).

Case Q3: August 19, 2004, at approximately 17:08 UTC (Unix timestamp 1092955707 from the SOFTWARE registry).

Case Q4: Central Standard Time (CST) / Central Daylight Time (CDT). StandardName: Central Standard Time, DaylightName: Central Daylight Time, ActiveTimeBias: 300 minutes (UTC−5, CDT active), Bias: 360 minutes (UTC−6 standard).

Case Q5: Greg Schardt (from SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner).

Case Q6: N-1A9ODN6ZXK4LQ (from SYSTEM\ControlSet001\Control\ComputerName\ComputerName).

Case Q7: N-1A9ODN6ZXK4LQ. The TCP/IP Parameters Domain value is empty, indicating a standalone workgroup computer. The computer name serves as the domain name.

Case Q8: August 27, 2004, at 15:46:33 UTC (from SYSTEM\ControlSet001\Control\Windows\ShutdownTime, decoded FILETIME value).

Case Q9: 5 accounts total: Administrator (RID 500), Guest (RID 501), HelpAssistant (RID 1000), SUPPORT_388945a0 (RID 1002), and Mr. Evil (RID 1003).

Case Q10: Mr. Evil — the only account with login activity, recording 15 logins. All other accounts show a login count of zero.

Case Q11: Mr. Evil — last login recorded at 2004-08-27 15:08:23 UTC.

Case Q12: The file is irunin.ini, located at C:\Program Files\Look@LAN\irunin.ini. It is the installer configuration file for Look@LAN (version 2.50 Build 29), a network monitoring program. This file contains both %REGOWNER%=Greg Schardt and %LANUSER%=Mr. Evil, proving they are the same person, along with %ISUSERNTADMIN%=TRUE confirming administrator status.

Case Q13: Two network cards: (1) Compaq WL110 Wireless LAN PC Card, and (2) Xircom CardBus Ethernet 100 + Modem 56 (Ethernet Interface).

Case Q14: IP Address: 192.168.1.111 (%LANIP% in irunin.ini). MAC Address: 00:10:A4:93:3E:09 (%LANNIC% in irunin.ini).

Case Q15: The Xircom CardBus Ethernet 100 + Modem 56 (Ethernet Interface). The MAC address prefix 00:10:A4 is registered to Xircom, Inc.

Case Q16: (1) Cain & Abel — password cracking and network sniffing; (2) Ethereal — network protocol analyzer/packet sniffer; (3) Network Stumbler — wireless network scanner/wardriver; (4) Look@LAN — network monitor/scanner; (5) 123 WASP — password recovery tool; (6) Anonymizer — anonymous browsing/IP masking tool.

Case Q17: whoknowsme@sbcglobal.net (configured in Outlook Express, SMTP server: smtp.sbcglobal.net).

Case Q18: NNTP Server: news.dallas.sbcglobal.net. NNTP User Name: whoknowsme@sbcglobal.net. NNTP Display Name: Mr Evil. NNTP Email Address: whoknowsme@sbcglobal.net.

Case Q19: (1) Outlook Express (msimn.exe) — contains both email and NNTP account configurations; (2) Forte Agent (agent.exe) — newsreader with email and NNTP capabilities.

Case Q20: (1) alt.hacking; (2) alt.2600.crackz; (3) alt.2600.phreakz; (4) alt.binaries.hacking.beginner; (5) alt.binaries.hacking.utilities.

Case Q21: Real Name: Mini Me; Email: none@of.ya; Nick: Mr; Alternate Nick: mrevilrulez; Ident userid: Mrevil; System: UNIX; Default server: losangeles.ca.us.undernet.org:6660.

Case Q22: (1) #Chataholics (UnderNet); (2) #CyberCafe (UnderNet); (3) #evilfork (EFnet). Additional channels logged include #Elite.Hackers, #LuxShell, #houston, #iso-warez, #mp3xserv, #ushells, #funny, and #thedarktower.

Case Q23: The file is named "interception," located at Documents and Settings\Mr. Evil\interception (inode 12264-128-4).

Case Q24: The victim's wireless computer type cannot be reliably determined from the indexed evidence. Identifying the victim's device would require parsing the binary contents of the "interception" packet capture file to examine MAC addresses, HTTP User-Agent strings, or 802.11 frame headers. This parsing was not performed during this analysis.

Case Q25: The victim's accessed websites cannot be reliably determined from the indexed evidence. The TypedURLs registry key reflects Mr. Evil's own browsing activity, not the victim's. The victim's web traffic would only be visible within the "interception" packet capture file, which was not parsed. For reference, Mr. Evil's own browsing included wardriving.com, ethereal.com, yahoo.com, 2600.org, drudgereport.com, majorgeeks.com, and maktoob.com.

Case Q26: mrevil2000@yahoo.com — confirmed by a Yahoo account registration URL in the browser cache: edit.yahoo.com/config/id_check?.fn=Greg&.ln=Schardt&.id=mrevil2000, which explicitly contains the first name Greg, last name Schardt, and Yahoo ID mrevil2000.

Case Q27: ShowLetter[1].htm — found in the IE cache at Documents and Settings\Mr. Evil\Local Settings\Temporary Internet Files\Content.IE5\HYU1BON0\ShowLetter[1].htm, timestamped Fri Aug 20 2004 15:38:30.

Case Q28: 4 executable files: Dc1.exe, Dc2.exe, Dc3.exe, and Dc4.exe, found in the RECYCLER folder under Mr. Evil's SID (S-1-5-21-2000478354-688789844-1708537768-1003).

Case Q29: No, the files are not truly deleted. They reside in the Recycle Bin (RECYCLER folder) and are marked as regular allocated files in the filesystem. They are fully recoverable. The INFO2 metadata file contains the information needed for restoration.

Case Q30: The precise total count of deleted filesystem entries cannot be determined from the indexed evidence without line-by-line enumeration of the full filesystem listing. Deleted entries (marked with the TSK deletion indicator) were found concentrated in Documents and Settings, WINDOWS system directories, and Program Files, consistent with normal Windows XP operation including temporary files, system updates, and application cache cleanup.

Case Q31: No viruses were found. ClamAV returned a clean scan result. YARA detected a HackTool_Samples signature matching samdump.dll, which is a hacking tool (SAM database credential dumper) rather than a virus or malware. The hacking tools present on the system are dual-use software, not self-replicating malware.

**Investigation Questions Summary**

Q1 (What systems were compromised?): One system was directly examined — the Dell CPi notebook (serial VLQLW) running Windows XP. Additionally, the "interception" packet capture file indicates at least one victim system had its network traffic intercepted, though the victim's identity and system details were not determined from the indexed evidence.

Q2 (How did the attacker gain initial access?): This case involves an attacker's own tool rather than a compromised victim system. The attacker used wireless network scanning (Network Stumbler) combined with a Compaq WL110 wireless card and a homemade 802.11b antenna to gain access to wireless networks, consistent with MITRE ATT&CK technique T1040 (Network Sniffing).

Q3 (What lateral movement occurred?): N/A. This investigation examined the attacker's own computer, not a network of compromised systems. No evidence of lateral movement to other systems was observed, though the tool collection (Nmap, Brutus, Cerberus) suggests capability for such activity.

Q4 (What persistence mechanisms were installed?): N/A. As this is the attacker's own system, persistence mechanisms in the traditional sense (maintaining access to a victim network) were not applicable. The hacking tools were installed as standard applications.

Q5 (Was data exfiltrated?): The "interception" file confirms that network data was captured. The full extent of captured data — including any credentials, credit card numbers, or personal information — could not be determined without parsing the packet capture file. Mr. Evil's browsing of Yahoo Mail and the presence of credential-harvesting tools (Cain & Abel, 123 WASP, samdump.dll) suggest capability and intent to extract sensitive data from intercepted traffic.

Q6 (What is the full timeline?): August 19, 2004 (OS installation and account creation) through August 27, 2004 (final tool execution and system shutdown). Key milestones: Aug 19 — system setup; Aug 20 — tool installation, email/news configuration, IRC activity; Aug 25 — Look@LAN installation and Forte Agent use; Aug 26 — network scanning; Aug 27 — NetStumbler, Cain & Abel, and Ethereal execution, Recycle Bin cleanup, and final shutdown at 15:46:33 UTC.

Q7 (What is the total scope and business impact?): The scope encompasses one attacker system with confirmed wireless interception capability and actual captured traffic data. The potential business impact extends to any wireless access point customers within range of the attacker's operations, particularly at commercial hotspots. The presence of credential-harvesting tools indicates potential for identity theft, financial fraud, and unauthorized account access affecting unknown numbers of victims.

Q8 (What are the recommended remediation actions?): Deploy WPA2 or stronger encryption at all wireless access points to prevent passive traffic interception. Implement wireless intrusion detection systems at high-value hotspot locations to detect scanning tools like Network Stumbler. Pursue legal process against the Yahoo account mrevil2000 and the SBC Global email whoknowsme@sbcglobal.net for additional evidence and victim notification. Parse the "interception" packet capture file to identify and notify affected victims. Recover original filenames from the Recycle Bin INFO2 file to identify concealed tools or data.


---

## Overview

| | |
|---|---|
| Findings | **8** (7 confirmed, 1 inference) |
| Severity | 0 critical, 2 high, 2 medium, 0 low, 4 info |
| Sources | 21 evidence sources across 238 tool calls |


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
| 2004-08-19T17:08:00 | System Identification and Acquisition Verification | INFO | hashdeep.hashes, registry.query.software, registry.query.system |
| 2004-08-19T23:03:54 | User Account Analysis and Identity Confirmation | INFO | registry.system, registry.query.sam, appfiles.program_files.look@lan.irunin.ini |
| 2004-08-20T10:30:18 | mIRC Chat Activity and IRC Channel Analysis | MEDIUM | appfiles.program_files.mirc.mirc.ini, appfiles.program_files.mirc.#chataholics.undernet.log, appfiles.program_files.mirc.#cybercafe.undernet.log, appfiles.program_files.mirc.#evilfork.efnet.log, appfiles.program_files.mirc.#elite.hackers.undernet.log, appfiles.program_files.mirc.#luxshell.undernet.log, appfiles.program_files.mirc.#ushells.undernet.log, appfiles.program_files.mirc.m5tar.undernet.log |
| 2004-08-20T15:05:00 | Hacking Tools Installation and Usage | HIGH | registry.ntuser.mr. evil, yara.files, tsk.filelist, bulk.url |
| 2004-08-20T21:14:20 | Email and Newsgroup Configuration Analysis | MEDIUM | registry.ntuser.mr. evil, tsk.filelist |
| 2004-08-25T10:55:34 | Network Configuration and Look@LAN Analysis | INFO | registry.query.software, appfiles.program_files.look@lan.irunin.ini |
| 2004-08-27T15:12:11 | Recycle Bin Analysis and Deleted Files Assessment | INFO | tsk.filelist, tsk.timeline, clamav.scan, yara.files |
| 2004-08-27T15:34:54 | Network Interception and Wardriving Evidence | HIGH | tsk.filelist, registry.ntuser.mr. evil, bulk.url, tsk.timeline, appfiles.documents_and_settings.mr._evil@yahoo[1].txt |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Hacking Tools Installation and Usage

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:05:00 to 2004-08-27T15:34:54 |
| **Sources** | registry.ntuser.mr. evil, yara.files, tsk.filelist, bulk.url |
| **Evidence Refs** | tc_fcf014cf, tc_27b2542c, tc_bc07d50b, tc_95683b9b, tc_6f231379, tc_a7bbac7b, tc_6024a8b8 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1110](https://attack.mitre.org/techniques/T1110/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1003](https://attack.mitre.org/techniques/T1003/) |


**Q16: Six Installed Programs That May Be Used for Hacking**
Evidence from the filesystem (Program Files), execution history (UserAssist, Prefetch), and installer artifacts confirms the following 6 hacking-related programs were installed and executed:

1. **Cain & Abel** (C:\Program Files\Cain\Cain.exe) - Password recovery/cracking and network sniffing tool. Installed from D:\Drivers\Cain & Abel\cain25b45.exe on 2004-08-20. Last executed 2004-08-27 15:33:02Z.

2. **Ethereal** (C:\Program Files\Ethereal\ethereal.exe) - Network protocol analyzer/packet sniffer (v0.10.6). Installed from desktop on 2004-08-27. Last executed 2004-08-27 15:34:54Z.

3. **Look@LAN** (C:\Program Files\Look@LAN\LookAtLan.exe) - Network monitor/scanner (v2.50 Build 29). Installed 2004-08-25. Last executed 2004-08-26 15:06:14Z.

4. **Network Stumbler** (C:\Program Files\Network Stumbler\NetStumbler.exe) - Wireless network scanner/wardriver. Installed from netstumblerinstaller_0_4_0.exe on 2004-08-27. Last executed 2004-08-27 15:12:35Z.

5. **123 WASP** (installed from D:\Drivers\Password recovery\123wasp_setup.exe) - Password recovery tool. Executed 2004-08-20 15:12:54Z.

6. **Anonymizer** (C:\Program Files\Anonymizer) - Anonymous browsing/IP masking tool. Installed from D:\Drivers\Anonyymizer\setup.exe on 2004-08-20 15:05:00Z.

Additionally, YARA scanning detected HackTool signature matching "samdump.dll" in the disk image, indicating SAM database dumping capability. The My Documents folder contains extensive hacking materials organized in directories: ARCHIVE, COMMANDS, ENUMERATION, EXPLOITATION, and FOOTPRINTING, with tools such as Nmap, Brutus, Pwdump, dsniff, Cerberus Internet Scanner, and various exploitation utilities.

**COUNTER-ANALYSIS: Dual-Use Defense Assessment**
Investigation question: Could this tool collection be explained as security research, penetration testing training, or educational use?

No evidence of legitimate educational or professional context was found:
- No coursework, class assignments, homework, or educational institution references anywhere on the disk
- No penetration testing scope documents, engagement letters, or rules of engagement
- No security certification study materials (e.g., SANS, CEH, OSCP)
- The registered owner "Greg Schardt" and user "Mr. Evil" show no professional security affiliations
- The organization of tools into FOOTPRINTING → ENUMERATION → EXPLOITATION follows an attack methodology structure, not an educational curriculum

**COUNTER-ANALYSIS: Convergent Evidence Assessment**
When evaluated as a complete chain, the totality of evidence forms a coherent attack preparation toolkit spanning multiple kill chain phases:

1. **Reconnaissance**: Wardriving.com visits, NetStumbler download, Compaq WL110 wireless card, hacking newsgroups (20+ subscriptions), hacking IRC channels, MSN search for "hacking", visits to 2600.org/hacked_pages and elitehackers.com
2. **Resource Development**: Organized tool directories (FOOTPRINTING/ENUMERATION/EXPLOITATION/COMMANDS), Nmap, Brutus, Cerberus Internet Scanner, enum
3. **Initial Access**: Network Stumbler (wireless scanning), Compaq WL110 wireless card
4. **Credential Access**: Cain & Abel, 123 WASP, samdump.dll, Pwdump
5. **Collection**: Ethereal + WinPcap (packet capture), the "interception" file
6. **Defense Evasion**: Anonymizer (anonymous browsing), fake mIRC identity ("Mini Me", "none@of.ya", system set to "UNIX")

This chain spans 6 kill chain phases with temporal coherence (all activity Aug 19-27, 2004). No single benign explanation accounts for the simultaneous presence of wardriving hardware + wardriving software + packet sniffer + password crackers + anonymization tools + hacking community engagement + organized attack methodology folders + actual interception data file. Each individual tool might be explained innocently; the convergence of all of them on a single system defeats the dual-use defense.



### 2. [HIGH] Network Interception and Wardriving Evidence

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-27T15:34:54 |
| **Sources** | tsk.filelist, registry.ntuser.mr. evil, bulk.url, tsk.timeline, appfiles.documents_and_settings.mr._evil@yahoo[1].txt |
| **Evidence Refs** | tc_a1f8fea4, tc_668e0bb8, tc_6024a8b8, tc_1e3e0942, tc_be160295, tc_19eb5662 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1557](https://attack.mitre.org/techniques/T1557/) |


**Q23: Ethereal Intercepted Data File**
The file "interception" located at Documents and Settings/Mr. Evil/interception (inode 12264-128-4) is the Ethereal packet capture data file stored in Mr. Evil's user profile directory. This file was created in the user's home folder, not under My Documents.

**Q24: Victim's Wireless Computer Type**
COUNTER-ANALYSIS CORRECTION: This question CANNOT be reliably answered from the indexed evidence. The original finding incorrectly described Mr. Evil's own hardware (Compaq WL110 Wireless LAN PC Card) rather than the victim's device. The victim's computer type would only be determinable by parsing the contents of the "interception" packet capture file (e.g., examining MAC addresses, HTTP User-Agent strings, or 802.11 frame headers within the capture). The interception file's binary content was not parsed in this analysis. The presence of Network Stumbler and the Compaq WL110 card establishes Mr. Evil's wireless interception capability but does NOT identify the victim's hardware.

**Q25: Websites Victim Was Accessing When Intercepted**
COUNTER-ANALYSIS CORRECTION: The previously listed URLs were from Mr. Evil's OWN TypedURLs registry key (Software\Microsoft\Internet Explorer\TypedURLs), which records URLs that the computer user typed into the IE address bar. These are NOT the victim's browsing activity. The victim's web traffic would only be visible inside the "interception" packet capture file, which was not parsed.

Mr. Evil's own TypedURLs (for reference, not victim data):
- http://www.maktoob.com/, http://www.ethereal.com/, http://www.wardriving.com/, http://4.12.220.254/temp/, ftp://4.12.220.254/temp, http://www.drudgereport.com/, http://www.majorgeeks.com/, http://www.yahoo.com/, http://www.2600.org/

Mr. Evil's full IE browsing history (from bulk_extractor) also includes:
- http://search.msn.com/results.aspx?FORM=MSNH&q=hacking (search for "hacking")
- http://www.2600.org/hacked_pages (hacked pages archive)
- http://www.cleo-and-nacho.com/mainpages/hacking.htm
- http://www.elitehackers.com
- http://www.netstumbler.com/downloads (downloaded NetStumbler)
- http://winpcap.mirror.ethereal.com (downloaded WinPcap)

**Q26: Main User's Web-Based Email Address**
COUNTER-ANALYSIS CORRECTION: The email address is mrevil2000@yahoo.com, NOT whoknowsme@yahoo.com. Direct evidence from the IE cache/history:
- Yahoo ID registration URL: http://edit.yahoo.com/config/id_check?.fn=Greg&.ln=Schardt&.id=mrevil2000&.u=b568cfp0ic6g0
  This URL explicitly contains: First Name=Greg, Last Name=Schardt, Yahoo ID=mrevil2000
- Yahoo Mail registration: http://billing.mail.yahoo.com/bm/MailReg?.v=8 (new account registration)
- Yahoo Mail account creation: http://edit.yahoo.com/config/eval_register?.v=&.intl=&new=1&.done=&.src=ym (new registration from Yahoo Mail)
- Yahoo Mail Inbox access: http://us.f613.mail.yahoo.com/ym/ShowFolder?YY=78169&.first=1&box=Inbox&YN=1
- Yahoo cookie file: mr._evil@yahoo[1].txt (confirms Yahoo account access)

The previous claim of "whoknowsme@yahoo.com" was an incorrect inference from the POP3/SMTP username pattern. The Yahoo registration URL proves the ID was mrevil2000, making the web-based email mrevil2000@yahoo.com.

**Q27: Yahoo Mail Sent Copies Filename**
ShowLetter[1].htm IS confirmed present in the IE cache:
- Timeline: Fri Aug 20 2004 15:38:30 at /Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/HYU1BON0/ShowLetter[1].htm
- bulk.url: http://us.f613.mail.yahoo.com/ym/ShowLetter?MsgId=6284_1110_22_443_55_0_1_-1_0&Idx=0&YY=60138&.first=1&inc=25&order=down&sort=date&pos=0&view=&head=&box=Inbox
This is the Yahoo Mail message-reading view cached locally. Note: ShowLetter displays messages from the Inbox, not specifically sent copies. The filename for sent messages would be accessed via ShowFolder with box=Sent.



### 3. [MEDIUM] Email and Newsgroup Configuration Analysis

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T21:14:20 to 2004-08-20T21:16:43 |
| **Sources** | registry.ntuser.mr. evil, tsk.filelist |
| **Evidence Refs** | tc_f37cb882, tc_fd71d8de, tc_dc1cc316, tc_fcf014cf |


**Q17: Mr. Evil's SMTP Email Address**
whoknowsme@sbcglobal.net
(From Outlook Express account 00000001 in NTUSER.DAT registry: Software\Microsoft\Internet Account Manager\Accounts\00000001)
- SMTP Server: smtp.sbcglobal.net
- SMTP Display Name: Mr Evil
- SMTP Email Address: whoknowsme@sbcglobal.net
- POP3 Server: pop.sbcglobal.net
- POP3 User Name: whoknowsme@sbcglobal.net

**Q18: NNTP News Server Settings**
(From Outlook Express account 00000002 in NTUSER.DAT registry: Software\Microsoft\Internet Account Manager\Accounts\00000002)
- NNTP Server: news.dallas.sbcglobal.net
- NNTP User Name: whoknowsme@sbcglobal.net
- NNTP Display Name: Mr Evil
- NNTP Email Address: whoknowsme@sbcglobal.net

**Q19: Two Programs Showing Email/NNTP Settings**
1. **Outlook Express** (C:\Program Files\Outlook Express\msimn.exe) - Contains both email (POP3/SMTP) and NNTP account configurations in the Internet Account Manager registry keys. Executed 2004-08-20 21:13:23Z.
2. **Forte Agent** (C:\Program Files\Agent\agent.exe) - Newsreader application capable of email and NNTP. Executed 2004-08-25 15:55:34Z. Installed from D:\Drivers\Forte Agent\a32-19.exe.

**Q20: Five Newsgroups Mr. Evil Subscribed To**
From the Outlook Express .dbx newsgroup data store files found in the user's profile (Documents and Settings/Mr. Evil/Local Settings/Application Data/Identities/{EF086998-1115-4ECD-9B13-9ADC067B4929}/Microsoft/Outlook Express/), the following newsgroups were subscribed:
1. alt.hacking
2. alt.2600.crackz
3. alt.2600.phreakz
4. alt.binaries.hacking.beginner
5. alt.binaries.hacking.utilities

(Additional newsgroups also present: alt.2600, alt.2600.cardz, alt.2600.codez, alt.2600.hackerz, alt.2600.moderated, alt.2600.programz, alt.nl.binaries.hack, alt.stupidity.hackers.malicious, alt.binaries.hacking.computers, alt.binaries.hacking.websites, alt.dss.hack, free.binaries.hackers.malicious, free.binaries.hacking.beginner, free.binaries.hacking.computers, free.binaries.hacking.talentless.troll-haven, free.binaries.hacking.talentless.troll_haven, free.binaries.hacking.utilities, free.binaries.hacking.websites)



### 4. [MEDIUM] mIRC Chat Activity and IRC Channel Analysis

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:30:18 to 2004-08-20T14:26:18 |
| **Sources** | appfiles.program_files.mirc.mirc.ini, appfiles.program_files.mirc.#chataholics.undernet.log, appfiles.program_files.mirc.#cybercafe.undernet.log, appfiles.program_files.mirc.#evilfork.efnet.log, appfiles.program_files.mirc.#elite.hackers.undernet.log, appfiles.program_files.mirc.#luxshell.undernet.log, appfiles.program_files.mirc.#ushells.undernet.log, appfiles.program_files.mirc.m5tar.undernet.log |
| **Evidence Refs** | tc_38694691, tc_6d001ca0, tc_e2a8bf1f, tc_90b46bd6, tc_0f58ef6e, tc_a9259ac0, tc_f35a38ca, tc_ce1cc331 |


**Q21: mIRC User Settings When Online**
From the mIRC configuration file (Program Files/mIRC/mirc.ini):
- User (Real Name): Mini Me
- Email: none@of.ya
- Nick: Mr
- Alternate Nick: mrevilrulez
- Ident userid: Mrevil
- System: UNIX
- Default Server: losangeles.ca.us.undernet.org:6660 (Undernet: US, CA, LosAngeles)

**Q22: Three IRC Channels Accessed (from mIRC logs)**
The mIRC logs directory contains sessions in multiple channels. The logged IRC channels include:
1. **#Chataholics** (on UnderNet) - Session: Fri Aug 20 10:52:09 2004
2. **#CyberCafe** (on UnderNet) - Session: Fri Aug 20 10:54:21 2004 (most active with ~90 lines logged)
3. **#evilfork** (on EFnet) - Session: Fri Aug 20 10:30:18 2004

Additional channels also logged: #Elite.Hackers (UnderNet), #LuxShell (UnderNet), #houston (UnderNet), #iso-warez (EFnet), #mp3xserv (UnderNet), #ushells (UnderNet), #funny (UnderNet), #thedarktower (AfterNet), and a private message with m5tar (UnderNet).

**COUNTER-ANALYSIS: IRC Chat Content Assessment**
Detailed examination of ALL available IRC log files reveals NO admissions of criminal activity, NO discussion of specific targets, and NO sharing of stolen data:

- **#evilfork (EFnet)**: 1-minute session. Mr. Evil (nick: mrevil) said only "glib smarm cuyk" before disconnecting.
- **#Elite.Hackers (UnderNet)**: 4-minute session. Mr. Evil was silent; other users played music.
- **#LuxShell (UnderNet)**: 1-minute session. Mr. Evil (nick: mrevilrulez) said "glib smarm cuyk" then left.
- **#Chataholics (UnderNet)**: 2-minute session. Mr. Evil said "glib marm" then left.
- **#CyberCafe (UnderNet)**: Longest session (~3+ hours idle). Mr. Evil said "glib marm cuyk", "hi", and "." — only 3 messages total. The rest was casual chat between other users.
- **#ushells (UnderNet)**: Brief session with no content from Mr. Evil.
- **m5tar (UnderNet PM)**: Received unsolicited spam message with a link.

The repeated phrase "glib smarm cuyk" (or "glib marm cuyk") appears to be a test message or gibberish posted in multiple channels. While the CHANNEL NAMES (#Elite.Hackers, #LuxShell, #ushells, #evilfork) have hacking connotations, Mr. Evil's actual contributions to these channels contained zero substantive hacking discussion, zero criminal admissions, and zero evidence of operational collaboration. The brevity of all sessions (most <3 minutes) suggests reconnaissance of available channels rather than active participation in a criminal community.



### 5. [INFO] System Identification and Acquisition Verification

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T17:08:00 to 2004-08-27T15:46:33 |
| **Sources** | hashdeep.hashes, registry.query.software, registry.query.system |
| **Evidence Refs** | tc_0dfeffae, tc_91daff8b, tc_17a56b69, tc_2d2f9c89, tc_cccc7078, tc_66c6afd5 |


**Q1: Image Hash Verification**
The disk image (4Dell_Latitude_CPi.E01) has the following hashes:
- MD5: 943243e71eda7481fee7b83f06698993
- SHA256: 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31
- Size: 671,094,597 bytes
The acquisition hash was computed by hashdeep and can be used for verification against the original imaging log.

**Q2: Operating System**
Microsoft Windows XP (from SOFTWARE registry hive: Microsoft\Windows NT\CurrentVersion\ProductName)

**Q3: Install Date**
Unix timestamp 1092955707, which converts to 2004-08-19 approximately 17:08 UTC (August 19, 2004).

**Q4: Timezone Setting**
Central Daylight Time (CDT) / Central Standard Time (CST)
- StandardName: Central Standard Time
- DaylightName: Central Daylight Time
- ActiveTimeBias: 300 minutes (UTC-5, CDT was active)
- Bias: 360 minutes (UTC-6 standard)

**Q5: Registered Owner**
Greg Schardt (SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner)

**Q6: Computer Account Name**
N-1A9ODN6ZXK4LQ (SYSTEM\ControlSet001\Control\ComputerName\ComputerName)

**Q7: Primary Domain Name**
N-1A9ODN6ZXK4LQ (The TCP/IP Parameters Domain value is empty, indicating this is a workgroup computer. The computer name serves as the domain name, confirmed by Look@LAN config: %LANDOMAIN%=N-1A9ODN6ZXK4LQ)

**Q8: Last Shutdown Date/Time**
2004-08-27 15:46:33 UTC (from SYSTEM\ControlSet001\Control\Windows\ShutdownTime, decoded FILETIME: 2004-08-27T15:46:33.109216+00:00)



### 6. [INFO] User Account Analysis and Identity Confirmation

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T23:03:54 to 2004-08-27T15:08:23 |
| **Sources** | registry.system, registry.query.sam, appfiles.program_files.look@lan.irunin.ini |
| **Evidence Refs** | tc_6882a699, tc_03ab4b8e, tc_b1e6e7b3, tc_907c972e |


**Q9: Total Number of Accounts**
5 user accounts recorded in the SAM hive:
1. Administrator [RID 500] - Default admin, never logged in (Login Count: 0)
2. Guest [RID 501] - Default guest, never logged in (Login Count: 0)
3. HelpAssistant [RID 1000] - Remote assistance account, never logged in
4. SUPPORT_388945a0 [RID 1002] - Microsoft vendor support account, disabled
5. Mr. Evil [RID 1003] - Created 2004-08-19 23:03:54Z, Login Count: 15

**Q10: Primary User Account**
Mr. Evil - the only account with actual login activity (15 logins). All other accounts show Login Count: 0. Mr. Evil is a member of the Administrators group (confirmed by SAM group membership SID S-1-5-21-2000478354-688789844-1708537768-1003 in Administrators group).

**Q11: Last User to Logon**
Mr. Evil - Last Login Date: 2004-08-27 15:08:23Z (the only account with any login history)

**Q12: File Proving Greg Schardt is Mr. Evil and Administrator**
The Look@LAN installation configuration file (irunin.ini at C:\Program Files\Look@LAN\irunin.ini) contains:
- %LANUSER%=Mr. Evil (the Windows logged-in user during installation)
- %REGOWNER%=Greg Schardt (the Windows registered owner)
- %USERNAME%=Greg Schardt (the user who ran the installer)
- %ISUSERNTADMIN%=TRUE (confirms administrator status)
This directly links the registered owner "Greg Schardt" to the user account "Mr. Evil" and confirms administrator privileges. The software is Look@LAN network monitor (version 2.50 Build 29).



### 7. [INFO] Network Configuration and Look@LAN Analysis

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-25T10:55:34 |
| **Sources** | registry.query.software, appfiles.program_files.look@lan.irunin.ini |
| **Evidence Refs** | tc_2258e5a1, tc_e1f7cb2e, tc_e00fd0c8, tc_b1e6e7b3 |


**Q13: Network Interface Cards**
Two NICs registered in SOFTWARE\Microsoft\Windows NT\CurrentVersion\NetworkCards:
1. Compaq WL110 Wireless LAN PC Card (NetworkCards\11, ServiceName: {86FC0C96-3FF2-4D59-9ABA-C602F213B5D2})
2. Xircom CardBus Ethernet 100 + Modem 56 (Ethernet Interface) (NetworkCards\2, ServiceName: {6E4090C2-FAEF-489A-8575-505D21FC1049})

**Q14: Look@LAN IP Address and MAC Address**
From the Look@LAN irunin.ini configuration file:
- IP Address: 192.168.1.111 (%LANIP%=192.168.1.111)
- MAC Address: 0010a4933e09 (%LANNIC%=0010a4933e09)

**Q15: NIC Card Used During Look@LAN Installation**
The MAC address prefix 00:10:A4 is registered to Xircom, Inc. Therefore, the Xircom CardBus Ethernet 100 + Modem 56 (Ethernet Interface) was the active NIC during Look@LAN installation (on 2004-08-25 at 10:55:34 based on installer date stamps).



### 8. [INFO] Recycle Bin Analysis and Deleted Files Assessment

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:12:11 to 2004-08-27T15:29:58 |
| **Sources** | tsk.filelist, tsk.timeline, clamav.scan, yara.files |
| **Evidence Refs** | tc_8ef034de, tc_d031fe56, tc_e2d63d14, tc_27b2542c, tc_bf532d4a, tc_0b63159c, tc_90a3714e |


**Q28: Executable Files in the Recycle Bin**
4 executable files found in the RECYCLER under SID S-1-5-21-2000478354-688789844-1708537768-1003 (Mr. Evil's SID):
1. Dc1.exe (inode 11692-128-4)
2. Dc2.exe (inode 11996-128-4)
3. Dc3.exe (inode 12033-128-4)
4. Dc4.exe (inode 12041-128-4, size 8,460,502 bytes per timeline)

Also present: desktop.ini (inode 11814-128-1) and INFO2 (inode 11850-128-3) which are Recycle Bin metadata files.

Note on original filenames: The "Dc" prefix follows the Windows XP Recycle Bin naming convention where "D" = deleted file and the letter (c) = source drive letter (C:). The original filenames and deletion timestamps are stored in the INFO2 metadata file (inode 11850-128-3), which was not parsed in this analysis. Parsing INFO2 would reveal what programs were being concealed. Timeline shows Dc2.exe change time at 2004-08-27 15:12:11 and Dc4.exe change time at 2004-08-27 15:29:58.

**Q29: Are the Recycle Bin Files Really Deleted?**
No. The files are NOT permanently deleted. They reside in the RECYCLER folder (Windows XP Recycle Bin) and are marked as regular files ("r/r" in the fls listing, not marked with the TSK deletion "*" indicator). The files are still recoverable. The Recycle Bin's INFO2 file contains metadata for restoration. The files have been "recycled" (moved to Recycle Bin) but not purged from the filesystem.

**Q30: Total Deleted Files Reported by the Filesystem**
COUNTER-ANALYSIS CORRECTION: The previously claimed "~7,038 deleted file entries" is not supported by indexed evidence. The number 7,038 appears to coincide with an inode number in the filesystem rather than a deleted file count. 

Actual deleted file evidence from tsk.filelist:
- Files marked with "r/- * 0:" (orphaned deleted files, inode 0): Found across 118 matching search windows in tsk.filelist, each containing multiple entries
- Files marked with "r/r *" (reallocated deleted files): Found across 40 matching search windows
- The itemized breakdown in the original finding totaled only ~185 entries across identified directories

The precise total count of deleted filesystem entries cannot be determined without line-by-line counting of the full tsk.filelist output, but the breakdown categories are accurate: deleted entries are concentrated in Documents and Settings, WINDOWS system directories, and Program Files, consistent with normal Windows XP operation (temp files, system updates, and application cache cleanup).

**Q31: Viruses on the Computer**
- ClamAV scan result: "OK" (no viruses detected in the disk image)
- YARA scan detected a HackTool_Samples signature matching "samdump.dll" - this is a hacking tool (SAM database dumper) rather than a virus/malware
- No traditional viruses or malware were found on the system. The hacking tools present (Cain & Abel, password recovery tools, network sniffers) are dual-use tools, not self-replicating malware.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| External IP | `4.12.220.254` |  | Network Interception and Wardriving Evidence |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Path | `C:\Program` |  | Hacking Tools Installation and Usage |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `none@of.ya` |  | Hacking Tools Installation and Usage |
| Email | `whoknowsme@sbcglobal.net` |  | Email and Newsgroup Configuration Analysis |
| Email | `mrevil2000@yahoo.com` |  | Network Interception and Wardriving Evidence |
| Email | `whoknowsme@yahoo.com` |  | Network Interception and Wardriving Evidence |




---

## Appendix C: MITRE ATT&CK Coverage

5 techniques identified across findings.


**Kill Chain Coverage:** Credential Access (4) > Discovery (2) > Collection (1)


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1003](https://attack.mitre.org/techniques/T1003/) | OS Credential Dumping | Hacking Tools Installation and Usage |
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Hacking Tools Installation and Usage; Network Interception and Wardriving Evidence |
| [T1110](https://attack.mitre.org/techniques/T1110/) | Brute Force | Hacking Tools Installation and Usage |
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Network Interception and Wardriving Evidence |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Hacking Tools Installation and Usage; Network Interception and Wardriving Evidence |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Hacking Tools Installation and Usage |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Network Interception and Wardriving Evidence |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 238 |
| Findings submitted | 8 |
| Confirmed | 7 |
| Inferences | 1 |
| Input tokens | 206 |
| Output tokens | 80.8K |
| Total tokens | 81.0K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 124 | 19.2K | 19.4K |
| claude-opus-4-6 | 82 | 61.6K | 61.7K |




<details>
<summary>Evidence Sources (262)</summary>

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
| ez.mft | eztools | 12183 |
| tsk.timeline | sleuthkit | 50499 |
| ez.shimcache | eztools | 140 |
| appfiles.program_files.mirc.aliases.ini | icat | 16 |
| appfiles.program_files.look@lan.irunin.ini | icat | 399 |
| appfiles.program_files.mirc.#chataholics.undernet.log | icat | 16 |
| appfiles.program_files.look@lan.license.txt | icat | 25 |
| appfiles.program_files.mirc.#cybercafe.undernet.log | icat | 207 |
| appfiles.program_files.ethereal.dictionary.xml | icat | 649 |
| appfiles.program_files.mirc.#elite.hackers.undernet.log | icat | 11 |
| appfiles.program_files.ethereal.mobileipv4.xml | icat | 64 |
| appfiles.program_files.mirc.#evilfork.efnet.log | icat | 11 |
| appfiles.program_files.ethereal.nasreq.xml | icat | 293 |
| appfiles.program_files.mirc.#funny.undernet.log | icat | 10 |
| appfiles.program_files.ethereal.sunping.xml | icat | 24 |
| appfiles.program_files.mirc.#houston.undernet.log | icat | 9 |
| appfiles.program_files.ethereal.capture_filters.txt | icat | 80 |
| appfiles.program_files.mirc.#iso-warez.efnet.log | icat | 7 |
| appfiles.program_files.ethereal.capturing.txt | icat | 84 |
| appfiles.program_files.mirc.#luxshell.undernet.log | icat | 13 |
| ez.prefetch | eztools | 165 |
| appfiles.program_files.ethereal.display_filters.txt | icat | 43 |
| strings.output | strings | 187581 |
| appfiles.program_files.mirc.#mp3xserv.undernet.log | icat | 15 |
| registry.system | regripper | 133 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.faq.txt | icat | 2228 |
| appfiles.program_files.mirc.#thedarktower.afternet.log | icat | 14 |
| appfiles.program_files.ethereal.getting_started.txt | icat | 90 |
| appfiles.documents_and_settings.sharedaccess.ini | icat | 52 |
| appfiles.program_files.mirc.#ushells.undernet.log | icat | 9 |
| appfiles.program_files.ethereal.overview.txt | icat | 38 |
| registry.system | regripper | 7 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.mirc.m5tar.undernet.log | icat | 8 |
| appfiles.program_files.ethereal.well_known.txt | icat | 114 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| appfiles.program_files.mirc.mirc.ini | icat | 224 |
| appfiles.program_files.ethereal.pcrepattern.3.txt | icat | 1475 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.mirc.popups.ini | icat | 96 |
| registry.system | regripper | 19 |
| appfiles.program_files.ethereal.agentx-mib.txt | icat | 529 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| appfiles.program_files.mirc.readme.txt | icat | 34 |
| appfiles.program_files.ethereal.disman-event-mib.txt | icat | 1957 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.mirc.servers.ini | icat | 423 |
| appfiles.program_files.ethereal.disman-schedule-mib.txt | icat | 701 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| registry.system | regripper | 8 |
| appfiles.program_files.mirc.urls.ini | icat | 9 |
| appfiles.program_files.ethereal.disman-script-mib.txt | icat | 1766 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.mirc.versions.txt | icat | 472 |
| appfiles.program_files.ethereal.etherlike-mib.txt | icat | 1139 |
| appfiles.documents_and_settings.desktop.ini | icat | 10 |
| appfiles.program_files.ethereal.hcnum-tc.txt | icat | 120 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| appfiles.program_files.ethereal.host-resources-mib.txt | icat | 1542 |
| appfiles.documents_and_settings.desktop.ini | icat | 6 |
| appfiles.program_files.ethereal.host-resources-types.txt | icat | 391 |
| appfiles.documents_and_settings.desktop.ini | icat | 14 |
| appfiles.program_files.ethereal.iana-address-family-numbers-mib.txt | icat | 123 |
| appfiles.documents_and_settings.desktop.ini | icat | 12 |
| appfiles.program_files.ethereal.iana-language-mib.txt | icat | 125 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.ianaiftype-mib.txt | icat | 392 |
| appfiles.documents_and_settings.desktop.ini | icat | 16 |
| appfiles.program_files.ethereal.if-inverted-stack-mib.txt | icat | 151 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.if-mib.txt | icat | 1816 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.inet-address-mib.txt | icat | 300 |
| appfiles.documents_and_settings.brndlog.txt | icat | 5 |
| registry.system | regripper | 9600 |
| appfiles.program_files.ethereal.ip-forward-mib.txt | icat | 811 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.ip-mib.txt | icat | 722 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.program_files.ethereal.ipv6-icmp-mib.txt | icat | 531 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| registry.system | regripper | 283 |
| appfiles.program_files.ethereal.ipv6-mib.txt | icat | 1445 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.ipv6-tc.txt | icat | 69 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.ipv6-tcp-mib.txt | icat | 213 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.ipv6-udp-mib.txt | icat | 143 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.lm-sensors-mib.txt | icat | 232 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.mta-mib.txt | icat | 1228 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.net-snmp-agent-mib.txt | icat | 546 |
| appfiles.documents_and_settings.desktop.ini | icat | 6 |
| appfiles.program_files.ethereal.net-snmp-examples-mib.txt | icat | 229 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| registry.system | regripper | 3138 |
| appfiles.program_files.ethereal.net-snmp-mib.txt | icat | 69 |
| appfiles.documents_and_settings.desktop.ini | icat | 9 |
| appfiles.program_files.ethereal.net-snmp-monitor-mib.txt | icat | 61 |
| appfiles.documents_and_settings.desktop.ini | icat | 11 |
| appfiles.program_files.ethereal.net-snmp-system-mib.txt | icat | 65 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.net-snmp-tc.txt | icat | 123 |
| registry.system | regripper | 199 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| appfiles.program_files.ethereal.network-services-mib.txt | icat | 628 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.notification-log-mib.txt | icat | 784 |
| appfiles.program_files.ethereal.rfc-1215.txt | icat | 40 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| registry.system | regripper | 286 |
| appfiles.program_files.ethereal.rfc1155-smi.txt | icat | 121 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| clamav.scan | clamav | 1 |
| appfiles.program_files.ethereal.rfc1213-mib.txt | icat | 2615 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.program_files.ethereal.rmon-mib.txt | icat | 3982 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.smux-mib.txt | icat | 162 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.snmp-community-mib.txt | icat | 431 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.snmp-framework-mib.txt | icat | 528 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.snmp-mpd-mib.txt | icat | 147 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.snmp-proxy-mib.txt | icat | 296 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.snmp-target-mib.txt | icat | 662 |
| appfiles.program_files.ethereal.snmp-user-based-sm-mib.txt | icat | 914 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.snmp-view-based-acm-mib.txt | icat | 832 |
| appfiles.documents_and_settings.brndlog.txt | icat | 217 |
| appfiles.program_files.ethereal.snmpv2-conf.txt | icat | 324 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.program_files.ethereal.snmpv2-mib.txt | icat | 856 |
| appfiles.documents_and_settings.mr._evil@www.drudgereport[1].txt | icat | 11 |
| appfiles.program_files.ethereal.snmpv2-smi.txt | icat | 346 |
| appfiles.documents_and_settings.mr._evil@advertising[2].txt | icat | 29 |
| appfiles.program_files.ethereal.snmpv2-tc.txt | icat | 774 |
| appfiles.documents_and_settings.mr._evil@atdmt[2].txt | icat | 11 |
| appfiles.program_files.ethereal.snmpv2-tm.txt | icat | 178 |
| appfiles.documents_and_settings.mr._evil@atwola[2].txt | icat | 11 |
| appfiles.program_files.ethereal.tcp-mib.txt | icat | 332 |
| appfiles.documents_and_settings.mr._evil@centrport[1].txt | icat | 11 |
| appfiles.program_files.ethereal.tunnel-mib.txt | icat | 339 |
| appfiles.documents_and_settings.mr._evil@cnn[1].txt | icat | 11 |
| appfiles.program_files.ethereal.ucd-demo-mib.txt | icat | 76 |
| appfiles.documents_and_settings.mr._evil@doubleclick[1].txt | icat | 11 |
| appfiles.program_files.ethereal.ucd-diskio-mib.txt | icat | 119 |
| appfiles.documents_and_settings.mr._evil@fastclick[1].txt | icat | 29 |
| appfiles.program_files.ethereal.ucd-dlmod-mib.txt | icat | 121 |
| appfiles.documents_and_settings.mr._evil@google[1].txt | icat | 11 |
| appfiles.program_files.ethereal.ucd-ipfilter-mib.txt | icat | 258 |
| appfiles.documents_and_settings.mr._evil@list[1].txt | icat | 11 |
| appfiles.program_files.ethereal.ucd-ipfwacc-mib.txt | icat | 329 |
| appfiles.documents_and_settings.mr._evil@maktoob[1].txt | icat | 11 |
| appfiles.program_files.ethereal.ucd-snmp-mib-old.txt | icat | 746 |
| appfiles.documents_and_settings.mr._evil@microsoft[1].txt | icat | 11 |
| yara.files | yara | 3 |
| appfiles.program_files.ethereal.ucd-snmp-mib.txt | icat | 1384 |
| appfiles.documents_and_settings.mr._evil@msn[2].txt | icat | 56 |
| appfiles.program_files.ethereal.udp-mib.txt | icat | 148 |
| appfiles.documents_and_settings.mr._evil@revenue[2].txt | icat | 11 |
| appfiles.program_files.ethereal.snmp-notification-mib.txt | icat | 591 |
| appfiles.documents_and_settings.mr._evil@search.msn[1].txt | icat | 29 |
| appfiles.documents_and_settings.mr._evil@servedby.advertising[2].txt | icat | 20 |
| appfiles.documents_and_settings.mr._evil@sj9[1].txt | icat | 11 |
| appfiles.documents_and_settings.mr._evil@tribalfusion[1].txt | icat | 38 |
| appfiles.documents_and_settings.mr._evil@www.cnn[1].txt | icat | 11 |
| appfiles.documents_and_settings.mr._evil@www.maktoob[2].txt | icat | 11 |
| appfiles.documents_and_settings.mr._evil@www.netstumbler[2].txt | icat | 11 |
| appfiles.documents_and_settings.mr._evil@yahoo[1].txt | icat | 29 |
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
| registry.ntuser.default user | regripper | 43 |
| registry.usrclass.localservice | regripper | 4 |
| registry.ntuser.localservice | regripper | 70 |
| registry.usrclass.mr. evil | regripper | 4 |
| registry.ntuser.mr. evil | regripper | 329 |
| registry.usrclass.networkservice | regripper | 4 |
| registry.ntuser.networkservice | regripper | 70 |
| tsk.masquerade | sleuthkit | 14 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.sam | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.sam | python-registry | 1 |
| registry.query.sam | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.ntuser.Mr. Evil | python-registry | 1 |
| registry.query.ntuser.Mr. Evil | python-registry | 1 |
| registry.query.ntuser.Mr. Evil | python-registry | 1 |
| composite.file_staging | composite | 668 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
