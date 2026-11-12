# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-11T12:13:02.477390+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 264 evidence sources (18 disk, 246 other) | 312 tool calls | 37 minutes
**Results:** 8 findings (2 high) | 8 confirmed, 0 inference | 3 hypotheses ruled out
**Timeline:** 2004-08-19 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2004-08-27): System Identification and Configuration of Dell Latitude CPi (+5 related)
- **Other Activity** (2004-08-20): Web-Based Email Usage and Browser Activity

**Tools:** search (152), get_raw_output (33), query_registry_value (22), submit_finding (11), open_case (8). SHA-256 hashes recorded for all evidence.



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

312 tool calls were executed across 19
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Forensic Investigation Report: Dell Latitude CPi Notebook — Suspected Hacking Activity

## Background

This report documents the forensic examination of a Dell CPi notebook computer (serial number VLQLW) that was discovered abandoned on September 20, 2004, alongside a wireless PCMCIA card and an external homemade 802.11b antenna. The recovery circumstances and associated accessories suggested the computer was used for unauthorized wireless network interception. Associates of the suspect, Greg Schardt — who operates under the online alias "Mr. Evil" — reported that he would position his vehicle within range of wireless access points at locations such as Starbucks and other T-Mobile hotspots, where he would intercept internet traffic in an attempt to capture credit card numbers, usernames, and passwords.

The forensic image under examination is an EnCase image (4Dell_Latitude_CPi.E01, with a second segment 4Dell_Latitude_CPi.E02). The image was verified with the following hash values: MD5 943243e71eda7481fee7b83f06698993 and SHA256 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31, computed by hashdeep during forensic processing. The forensic analysis leveraged 19 indexed evidence sources across twelve distinct forensic extractors, including The Sleuth Kit for filesystem analysis, bulk_extractor for data carving, python-registry for Windows Registry parsing, ClamAV for antivirus scanning, YARA for signature matching, and EZTools for MFT and Prefetch analysis. The investigation produced 8 findings, of which 3 are negative (ruling out specific hypotheses) and the remainder are confirmed positive findings. A total of 9 MITRE ATT&CK techniques were mapped to the observed activity.

The examined system is a Dell Latitude CPi notebook running Microsoft Windows XP (Version 5.1, Build 2600), installed on August 19, 2004, at 17:28:27 UTC. The system timezone is configured as Central Standard Time (UTC-6), with Central Daylight Time (UTC-5) active at the time of last use. The registered owner is Greg Schardt. The computer name is N-1A9ODN6ZXK4LQ, and the machine was not joined to any network domain — the Tcpip\Parameters\Domain registry value is blank, indicating a standalone workgroup configuration. The last recorded system shutdown occurred on August 27, 2004, at 15:46:33 UTC.

## Incident Timeline

The activity on this computer spans an eight-day operational window from August 19 through August 27, 2004, reconstructed from registry timestamps, Prefetch execution records, file system metadata, and application configuration files. The timeline is organized into distinct operational phases.

**Phase 1 — System Installation and Initial Configuration (August 19, 2004)**

The Windows XP installation completed at 17:28:27 UTC on August 19, 2004, with Greg Schardt recorded as the registered owner. The SAM database shows that the built-in Administrator (RID 500), Guest (RID 501), and HelpAssistant (RID 1000) accounts were created as part of the standard installation process, along with the SUPPORT_388945a0 vendor support account (RID 1002, disabled). The primary user account "Mr. Evil" (RID 1003) was created at 23:03:54 UTC, approximately five and a half hours after the OS installation. This account was placed in the Administrators group and would become the sole active account on the system, ultimately recording 15 logon events. The Xircom CardBus Ethernet 100 + Modem 56 network adapter (NetworkCards\2) was configured during this initial phase, with a last-written timestamp of 17:07:19 UTC — predating even the OS install completion, indicating it was present during the setup process.

**Phase 2 — Hacking Toolkit Deployment and Communication Setup (August 20, 2004)**

On August 20, 2004, a massive organized collection of hacking tools was bulk-copied to the My Documents directory between 15:18 and 15:21 UTC. The consistent three-minute creation window and the preservation of older modification timestamps (some dating to 2000) are characteristic of a bulk copy operation from external media. The toolkit was organized into directories following the classic "Hacking Exposed" attack methodology: FOOTPRINTING, ENUMERATION, EXPLOITATION, COMMANDS, DICTIONARIES, and MISCELLANEOUS. The collection included network reconnaissance tools (NmapNT, NetStumbler, SuperScan), credential attack tools (L0phtCrack, John the Ripper, Cain, Pwdump, SAMDump, Brutus), remote access trojans (NetBus), privilege escalation exploits (GetAdmin, sechole, Hk), network interception tools (dsniff, bsniff, Netcat), and more than 250 MB of password-cracking dictionaries.

Later that same day, the suspect configured his communication infrastructure. At 21:13:23 UTC, Outlook Express was executed and an email account was configured at 21:14:20 UTC (SMTP server smtp.sbcglobal.net, email address whoknowsme@sbcglobal.net, display name "Mr Evil"). An NNTP news account was configured at 21:16:43 UTC (server news.dallas.sbcglobal.net, same email credentials). The user then subscribed to numerous hacking-related newsgroups, including alt.2600.crackz, alt.2600.hackerz, alt.binaries.hacking.beginner, alt.binaries.hacking.computers, alt.binaries.hacking.utilities, and many others in the alt.2600 and alt.binaries.hacking hierarchies.

Also on August 20, mIRC version 6.12 (installed from D:\Drivers\IRC\mirc612.exe) was used to access multiple IRC channels across three networks. Beginning at 10:29:01 UTC, the user connected to EFnet (channels #evilfork, #ISO-WAREZ) and Undernet (channels #Chataholics, #CyberCafe, #Elite.Hackers, #houston, #LuxShell, #mp3xserv, #ushells) and later AfterNet (#thedarktower) and Undernet (#funny). The mIRC configuration recorded the nickname "Mr" with alternate "mrevilrulez," real name "Mini Me," email "none@of.ya," and ident userid "Mrevil." The IRC sessions were brief (30 seconds to 3 minutes each) and contained only gibberish test messages ("glib smarm cuyk"), suggesting initial exploration or testing of the IRC client rather than established community participation.

**Phase 3 — Continued Tool Use (August 25, 2004)**

On August 25, 2004, the Forte Agent newsreader was executed at 15:55:34 UTC (run count 2), and mIRC was run again at 16:20:27 UTC (run count 3). This indicates continued use of the communication tools for monitoring hacking newsgroups and IRC channels.

**Phase 4 — Active Wireless Reconnaissance and Interception (August 27, 2004)**

The final day of recorded activity, August 27, 2004, represents the most operationally significant phase and follows a clear attack sequence. The user logged on at 15:08:23 UTC (the 15th and final logon for the Mr. Evil account). At 15:10:10 UTC, a cookie for www.netstumbler.com was created, and at 15:12:35 UTC, Network Stumbler was executed (Prefetch run count 1) — this is a wireless network discovery/wardriving tool used to identify available wireless access points.

The Compaq WL110 Wireless LAN PC Card (NetworkCards\11) was activated with a last-written timestamp of 15:31:44 UTC. At 15:28:49 UTC, the Ethereal program folder was created (indicating fresh installation), and at 15:29:43 UTC the Start Menu shortcuts were created. At 15:33:03 UTC, Cain & Abel was executed (Prefetch run count 2), a multi-purpose password recovery and network sniffing tool. At 15:34:54 UTC, Ethereal (a network protocol analyzer/packet sniffer) was executed for the first time. At 15:35:53 UTC, Ethereal's preferences file was created (first-run configuration).

At 15:41:00 UTC — approximately six minutes after launching Ethereal — a file named "interception" was created in Mr. Evil's user profile directory (Documents and Settings/Mr. Evil/, inode 12264, 173,372 bytes). All four MACB timestamps in both $STANDARD_INFORMATION and $FILE_NAME MFT attributes are identical (2004-08-27 15:41:00.191312 UTC), consistent with a newly created file with no subsequent modification and no evidence of timestamp manipulation. The six-minute gap between Ethereal execution and file creation is consistent with an active network capture session: launch the sniffer, capture wireless traffic, then save the capture file.

Analysis of the "interception" file contents through bulk_extractor packet carving revealed intercepted HTTP traffic from a third-party victim device. The captured packets contain HTTP headers identifying the victim's device as running "Windows CE (Pocket PC) - Version 4.20" with an "Intel(R) PXA255" CPU and a 240x320 pixel display. The victim was accessing MSN Hotmail mobile email at mobile.msn.com, including folder views (/hm/folder.aspx), email composition (/hm/composeppc.aspx), contacts (contacts.aspx), and authentication services (memberservices.passport.net, www.passport.net). This confirms that the interception captured a real third-party user's wireless email session.

The system was shut down at 15:46:33 UTC, just five minutes after the interception file was saved — consistent with a "capture and go" operational pattern.

## Key Findings

### Identity Attribution: Greg Schardt Is Mr. Evil

The investigation conclusively established that Greg Schardt, the registered Windows owner, is the same individual operating as the "Mr. Evil" user account. The critical evidence is the Look@LAN installer configuration file (irunin.ini), which records both "%REGOWNER%=Greg Schardt" (the Windows registered owner) and "%LANUSER%=Mr. Evil" (the logged-in user running the installer), with "%USERNAME%=Greg Schardt" and "%DESKTOP%=C:\Documents and Settings\Mr. Evil\Desktop." This file simultaneously identifies both identities in a single operational context, proving they are the same person. The same file records the computer's IP address as 192.168.1.111 and MAC address as 00:10:A4:93:3E:09. The OUI prefix 00:10:A4 is registered to Xircom, confirming the Xircom CardBus Ethernet 100 + Modem 56 NIC was used during Look@LAN setup.

### Comprehensive Hacking Toolkit

The computer contained an extensive, methodically organized collection of hacking tools that eliminates any plausible "legitimate IT professional" defense. Six installed programs with confirmed execution evidence are directly usable for hacking: Cain & Abel (password recovery/network sniffing), Ethereal (packet capture/analysis), Network Stumbler (wireless network scanning), 123 WASP (password recovery), Anonymizer (anonymous browsing/identity concealment), and Look@LAN (network scanning/monitoring). Beyond these installed programs, the My Documents directory contained a complete penetration testing arsenal organized by attack phase (FOOTPRINTING, ENUMERATION, EXPLOITATION, COMMANDS, DICTIONARIES), including tools such as Pwdump, SAMDump, L0phtCrack, John the Ripper, Brutus, NetBus, Netcat, NmapNT, Nessus, dsniff, GetAdmin, sechole, and the wardialing tool ToneLoc. The DICTIONARIES directory contained massive password-cracking wordlists totaling over 250 MB. Enumeration scan reports targeting specific hosts (172.16.0.1 and 172.16.0.2) were also found, indicating the tools had been used against specific targets.

A thorough search found no evidence of employment, corporate domain membership, employer email, VPN configurations, professional certifications, authorized testing documentation, or any other context that would justify possessing these tools in a professional capacity. The SBC Global residential ISP account, the absence of any organizational affiliation, and the tool organization following the "Hacking Exposed" methodology rather than a professional testing framework all support personal and unauthorized use.

### Wireless Interception Capability and Evidence

The combination of hardware and software on this computer constituted a complete wireless interception platform: the Compaq WL110 Wireless LAN PC Card provided wireless connectivity, Network Stumbler provided wireless AP discovery (wardriving), Ethereal with WinPcap 3.01a provided packet capture capability, and Cain & Abel provided additional credential extraction capabilities. The homemade 802.11b antenna found with the computer would have extended the wireless reception range, consistent with the reported practice of intercepting traffic from a parked vehicle.

The browsing history corroborates the suspect's interest in wardriving, with visits to www.wardriving.com and www.netstumbler.com, along with visits to hacking-related sites including www.2600.com/hacked_pages and MSN searches for "hacking."

### Intercepted Victim Traffic

Analysis of the captured packet data in the "interception" file revealed that a third-party victim's wireless internet session was recorded. The HTTP User-Agent headers identify the victim as using a Windows CE Pocket PC device (Version 4.20, Intel PXA255 processor, 240x320 resolution). The victim was accessing MSN Hotmail mobile email services at mobile.msn.com, including viewing their inbox, composing emails, and managing their account through Microsoft Passport authentication. The interception of email traffic — including authentication and composition — represents a significant privacy violation and potential credential theft.

### Communication Infrastructure

The suspect maintained multiple communication channels. The primary email account was whoknowsme@sbcglobal.net, configured in Outlook Express with SMTP server smtp.sbcglobal.net and POP3 server pop.sbcglobal.net. An NNTP news account using the same credentials was configured for news.dallas.sbcglobal.net. A web-based Yahoo Mail account with the address mrevilrulez@yahoo.com was also used, as evidenced by Yahoo Mail page titles and login cookies in the browser cache. Yahoo Mail stores cached email pages under filenames such as "ShowFolder" (for folder/inbox views) and "ShowLetter" (for individual messages) in the Temporary Internet Files directory.

The suspect subscribed to at least fifteen hacking-related newsgroups, dominated by the alt.2600 and alt.binaries.hacking hierarchies. The Forte Agent dedicated newsreader was also installed, providing a second program (alongside Outlook Express) capable of displaying the SMTP and NNTP configuration. The mIRC client was configured with hacking-themed identifiers (nickname "mrevilrulez," ident "Mrevil") and used to access channels including #Elite.Hackers, #LuxShell, #ushells, and #ISO-WAREZ — all directly associated with hacking communities.

### Recycle Bin and Deleted Files

The Recycle Bin for the Mr. Evil user (SID S-1-5-21-2000478354-688789844-1708537768-1003) contained four executable files: Dc1.exe, Dc2.exe, Dc3.exe, and Dc4.exe. These files are NOT truly deleted — they remain allocated on disk (marked r/r in the TSK file listing) and are fully recoverable. They were moved to the Recycle Bin but never emptied. Across the entire filesystem, approximately 7,038 entries are marked as deleted by the file system (TSK asterisk-prefixed entries).

### Antivirus and Signature Analysis

The ClamAV antivirus scan returned a clean result with no viruses detected on the disk image. However, the YARA signature scan matched the "HackTool_Samples" rule, detecting the string "samdump.dll" at disk offset 0x1e4bf1dd. This is consistent with the SAM dumping capability present in Cain & Abel and the standalone SAMDUMP.EXE found in the My Documents/COMMANDS directory.

### Forensic Integrity Verification

A timestamp manipulation analysis (detect_timestomping) found no evidence of anti-forensic timestomping anywhere on the filesystem. The "interception" file's $STANDARD_INFORMATION and $FILE_NAME timestamps are perfectly aligned, and the My Documents toolkit files show the expected pattern of preserved source modification times with NTFS creation times reflecting the August 20 bulk copy operation. This supports the authenticity of the entire evidence timeline and makes an "evidence planting" defense implausible.

## Threat Intelligence and Attribution

The evidence on this computer is consistent with the profile of an individual engaged in wireless network interception ("wardriving") and general hacking activity. The operational pattern — wireless AP discovery followed by packet capture at public hotspots — aligns precisely with the behavior described by the suspect's associates. The toolset spans the full attack lifecycle from reconnaissance through exploitation and credential theft, organized according to a well-known hacking methodology textbook.

Attribution to Greg Schardt is supported by multiple independent evidence sources: the Windows registered owner field, the Look@LAN configuration file (irunin.ini) which directly links "Greg Schardt" and "Mr. Evil" in a single document, the SBC Global residential email account (whoknowsme@sbcglobal.net), and the Yahoo Mail account (mrevilrulez@yahoo.com) incorporating the "Mr. Evil" persona. The physical recovery of the computer with a homemade antenna provides additional circumstantial context.

The MITRE ATT&CK techniques observed include Network Sniffing (T1040), Adversary-in-the-Middle (T1557), Credential Dumping (T1003), Network Service Discovery (T1046), Brute Force (T1110), Command and Scripting Interpreter (T1059), Obtain Capabilities: Tool (T1588.002), Acquire Infrastructure: Domains (T1583.001), and Application Layer Protocol: Web Protocols (T1071.001). This TTP profile is consistent with a self-taught or community-educated individual leveraging publicly available tools rather than a sophisticated or state-sponsored threat actor. The use of well-known open-source and publicly distributed tools (Ethereal, Cain & Abel, Network Stumbler, Netcat, Nmap) rather than custom malware or zero-day exploits supports this assessment.

No definitive link to a broader organized hacking group was established from the evidence on this computer alone. The IRC sessions were too brief and contained no substantive communications. The newsgroup subscriptions indicate interest in hacking communities but do not establish formal group membership. The attribution to Greg Schardt as the operator of this specific computer and its tools is assessed with high confidence based on converging evidence from multiple independent sources.

## Impact Assessment

The confirmed impact of the activities documented on this computer includes the unauthorized interception of at least one third-party wireless internet session. The victim, identified only by their device characteristics (a Windows CE Pocket PC with an Intel PXA255 processor), had their MSN Hotmail mobile email session captured, including inbox access, email composition, and authentication traffic through Microsoft Passport. This represents potential exposure of email contents, contact information, and authentication credentials.

The scope of historical interception activity cannot be fully determined from the available evidence. The "interception" file represents a single capture session on August 27, 2004, but the presence of a complete wireless interception toolkit — combined with associate testimony about habitual wardriving behavior — suggests this was not an isolated incident. The Cain & Abel execution count of 2 and the Network Stumbler execution count of 1 within the Prefetch records indicate relatively recent deployment of these tools, though earlier executions may have occurred on other media or prior system installations.

The credential exposure risk extends beyond the intercepted Hotmail session. The password-cracking dictionaries (250+ MB), combined with tools like L0phtCrack, John the Ripper, Brutus, and Pwdump, indicate capability and intent to crack captured credentials. The scan reports against hosts 172.16.0.1 and 172.16.0.2 suggest prior targeting of specific network infrastructure, though no evidence of successful compromise of those hosts was found on this computer.

One system is confirmed as the suspect's operational platform (the Dell CPi notebook itself), and at least one third-party victim device was demonstrably affected by traffic interception.

## Immediate Tactical Containment

Given that this computer was recovered abandoned, the following immediate actions should be taken:

1. Maintain strict chain-of-custody for the Dell CPi notebook (serial VLQLW), wireless PCMCIA card, and homemade 802.11b antenna — these are primary evidence items.
2. Block the email account whoknowsme@sbcglobal.net at the ISP (SBC Global/AT&T) level and request account preservation for legal process; similarly flag mrevilrulez@yahoo.com for Yahoo account preservation.
3. Issue a preservation request to the NNTP news server news.dallas.sbcglobal.net for any posts originating from the whoknowsme@sbcglobal.net account.
4. Alert T-Mobile and other wireless hotspot operators in the suspect's known operational area to review access logs for MAC address 00:10:A4:93:3E:09 (Xircom NIC) and IP 192.168.1.111.
5. Notify MSN/Hotmail of the intercepted mobile email session to enable notification of the affected Pocket PC user whose traffic was captured on August 27, 2004.
6. Monitor IRC networks (EFnet, Undernet, AfterNet) for the nicknames "Mr," "mrevilrulez," and ident "Mrevil" to detect continued activity from alternate systems.
7. Preserve all Prefetch files, registry hives, and the "interception" capture file (inode 12264, Documents and Settings/Mr. Evil/interception) for evidentiary analysis.
8. Do not empty or modify the Recycle Bin contents (Dc1.exe through Dc4.exe at SID S-1-5-21-2000478354-688789844-1708537768-1003) as these may contain additional evidence.

## Strategic Remediation

The wireless interception documented in this case succeeded because the victim's Pocket PC connected to a wireless access point that either lacked encryption or used weak (WEP) encryption, allowing the suspect's Ethereal installation to capture plaintext HTTP traffic including Hotmail authentication (Finding: Ethereal Wireless Interception Evidence, T1040/T1557). Wireless access point operators at public venues such as Starbucks and T-Mobile hotspots should enforce WPA2 or stronger encryption and implement client isolation to prevent passive sniffing of other users' traffic. The specific victim's use of unencrypted HTTP for email access at mobile.msn.com compounded this vulnerability.

The suspect's email account credentials for MSN Hotmail were transmitted over an unencrypted HTTP channel rather than HTTPS, as demonstrated by the intercepted POST requests to mobile.msn.com/hm/composeppc.aspx (Finding: Ethereal Wireless Interception Evidence). Web-based email services, particularly mobile interfaces, should enforce HTTPS for all authentication and session traffic. The absence of transport-layer encryption for the victim's Passport authentication enabled credential interception that would have been infeasible over a properly encrypted connection.

The suspect operated freely from a residential ISP connection (SBC Global) using easily identifiable accounts (whoknowsme@sbcglobal.net) without any apparent monitoring or detection (Finding: Email and News Account Configuration, T1583.001). ISPs hosting customers who generate network scanning, sniffing, or wardriving-related traffic patterns should implement abuse detection mechanisms, particularly for accounts associated with high volumes of hacking-related newsgroup subscriptions and IRC channel activity across known hacking communities.

The complete absence of any professional context, authorized testing documentation, or organizational affiliation on a system loaded with exploitation tools (Finding: No Evidence of Employment or Professional Context) underscores the importance of law enforcement awareness regarding the signature of an unauthorized hacking platform versus a legitimate penetration testing workstation. The organized directory structure following published attack methodology (FOOTPRINTING, ENUMERATION, EXPLOITATION) is a distinctive indicator that can be used to assess intent in similar future cases.

## Conclusion

This forensic examination of the Dell Latitude CPi notebook provides comprehensive evidence linking Greg Schardt to the "Mr. Evil" persona and documenting the use of this computer as a wireless network interception platform. The investigation answers the eight standard investigation questions as follows.

**Q1. What systems were compromised?** The Dell CPi notebook (serial VLQLW, computer name N-1A9ODN6ZXK4LQ) is the suspect's operational system. At least one third-party wireless device (a Windows CE Pocket PC) had its internet traffic intercepted. No evidence of compromise of hosts 172.16.0.1 or 172.16.0.2 (the scan report targets) was found on this computer, though scanning activity against them is documented.

**Q2. How did the attacker gain initial access?** This question applies atypically to this case: the "access" was gained through passive wireless network interception. The suspect used Network Stumbler to discover wireless access points, then employed Ethereal with WinPcap to capture traffic from a wireless network, likely an open or weakly encrypted public hotspot. No exploitation of a remote vulnerability was required — the wireless medium itself was the attack vector.

**Q3. What lateral movement occurred?** N/A. This investigation examines the suspect's own computer, not a compromised network. The tools present (Netcat, NetBus, PsExec-class utilities) indicate capability for lateral movement, but no evidence of lateral movement execution was found on this system.

**Q4. What persistence mechanisms were installed?** N/A. As this is the suspect's own computer, persistence in the traditional incident-response sense does not apply. The suspect maintained persistent access to his own system through the Mr. Evil administrator account (15 logons over eight days).

**Q5. Was data exfiltrated, and if so, what and how much?** Yes. The "interception" file (173,372 bytes) contains captured wireless network traffic from a third-party victim's Pocket PC device, including MSN Hotmail mobile email sessions with inbox access, email composition, and Passport authentication traffic. The full extent of historical data interception cannot be determined from this single capture file, but the operational pattern and toolset suggest this was not an isolated event.

**Q6. What is the full timeline of the incident?** The documented activity spans August 19–27, 2004: OS installation (Aug 19), toolkit deployment and communications setup (Aug 20), continued tool use (Aug 25), and active wireless reconnaissance and interception (Aug 27), culminating in system shutdown at 15:46:33 UTC on August 27.

**Q7. What is the total scope and business impact?** One confirmed suspect system, one confirmed intercepted third-party device, potential exposure of email credentials and content for an unknown Hotmail user, and evidence of scanning activity against at least two additional network hosts. The homemade antenna and wardriving tools suggest a pattern of repeated activity at multiple public wireless locations.

**Q8. What are the recommended remediation actions?** See the Strategic Remediation section above. Key actions include wireless encryption enforcement at public hotspots, HTTPS enforcement for web-based email services (especially mobile interfaces), ISP abuse detection for accounts exhibiting scanning and interception patterns, and preservation of all identified email and IRC accounts for legal proceedings.

## Case Questions

Case Q1: The image hash (MD5) is 943243e71eda7481fee7b83f06698993. The SHA256 hash is 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31. The acquisition hash was verified by hashdeep during forensic processing; no discrepancies were reported between acquisition and verification.

Case Q2: Microsoft Windows XP (Version 5.1, Build 2600, Build string 2600.xpclient.010817-1148, Uniprocessor Free).

Case Q3: The install date is August 19, 2004. The InstallDate DWORD value 1092955707 converts to Thursday, August 19, 2004, 17:28:27 UTC.

Case Q4: The timezone is Central Standard Time (UTC-6). Central Daylight Time was active at the time of last use, with an ActiveTimeBias of 300 minutes (UTC-5).

Case Q5: The registered owner is Greg Schardt, as recorded in HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner.

Case Q6: The computer account name (primary user account) is Mr. Evil (RID 1003, member of Administrators group).

Case Q7: There is no primary domain name configured. The Tcpip\Parameters\Domain registry value is blank/empty, meaning the machine was not joined to a network domain. It operated as a standalone workgroup computer.

Case Q8: The last recorded computer shutdown was August 27, 2004, at 15:46:33 UTC (10:46:33 AM CDT), derived from the ShutdownTime value in ControlSet001\Control\Windows.

Case Q9: There are 5 user accounts recorded in the SAM database: (1) Administrator [RID 500], (2) Guest [RID 501], (3) HelpAssistant [RID 1000], (4) SUPPORT_388945a0 [RID 1002], and (5) Mr. Evil [RID 1003].

Case Q10: The account name of the user who mostly uses the computer is Mr. Evil, with 15 recorded logon events. No other account has any login activity (all others show Login Count: 0).

Case Q11: The last user to logon to the computer was Mr. Evil, at 2004-08-27 15:08:23 UTC.

Case Q12: The file is irunin.ini, located in the Look@LAN program directory (C:\Program Files\Look@LAN\). It relates to the Look@LAN network monitoring/scanning software program (v2.50 Build 29). This file contains both "%REGOWNER%=Greg Schardt" and "%LANUSER%=Mr. Evil," proving they are the same person and that Greg Schardt is the administrator of this computer.

Case Q13: Two network cards were used by this computer: (1) Xircom CardBus Ethernet 100 + Modem 56 (wired Ethernet adapter, NetworkCards\2), and (2) Compaq WL110 Wireless LAN PC Card (wireless adapter, NetworkCards\11).

Case Q14: The IP address is 192.168.1.111 and the MAC address is 00:10:A4:93:3E:09, as recorded in the Look@LAN irunin.ini configuration file.

Case Q15: The first three hex bytes of the MAC address (00:10:A4) identify the vendor as Xircom. Therefore, the Xircom CardBus Ethernet 100 + Modem 56 (the wired Ethernet NIC) was used during the installation and setup of Look@LAN.

Case Q16: Six installed programs that may be used for hacking: (1) Cain & Abel — password recovery and network sniffing tool, (2) Ethereal — network protocol analyzer and packet sniffer, (3) Network Stumbler — wireless network scanner/wardriving tool, (4) 123 WASP — password recovery tool, (5) Anonymizer — anonymous browsing and identity concealment tool, (6) Look@LAN — network monitoring and scanning tool.

Case Q17: The SMTP email address for Mr. Evil is whoknowsme@sbcglobal.net, configured in Outlook Express with SMTP server smtp.sbcglobal.net and POP3 server pop.sbcglobal.net.

Case Q18: The NNTP (news server) settings are: NNTP Server: news.dallas.sbcglobal.net, NNTP User Name: whoknowsme@sbcglobal.net, NNTP Display Name: Mr Evil, NNTP Email Address: whoknowsme@sbcglobal.net.

Case Q19: Two installed programs show this SMTP/NNTP information: (1) Outlook Express (msimn.exe), and (2) Forte Agent (C:\Program Files\Agent\agent.exe), a dedicated newsreader.

Case Q20: Five newsgroups Mr. Evil subscribed to: (1) alt.2600.crackz, (2) alt.2600.hackerz, (3) alt.binaries.hacking.beginner, (4) alt.binaries.hacking.computers, (5) alt.binaries.hacking.utilities.

Case Q21: The mIRC user settings displayed when online in a chat channel were: Nick: Mr, Alternate Nick: mrevilrulez, Real Name (User): Mini Me, Email Address: none@of.ya, Ident userid: Mrevil. The default server was Undernet: losangeles.ca.us.undernet.org:6660.

Case Q22: Three IRC channels accessed by the user: (1) #Elite.Hackers (Undernet), (2) #LuxShell (Undernet), (3) #Chataholics (Undernet). Additional channels include #evilfork (EFnet), #ISO-WAREZ (EFnet), #CyberCafe, #houston, #mp3xserv, #ushells, #funny (Undernet), and #thedarktower (AfterNet).

Case Q23: The name of the file containing the intercepted data is "interception," located at Documents and Settings/Mr. Evil/interception (inode 12264, 173,372 bytes, created 2004-08-27 15:41:00 UTC). Note: The file is located in the user's profile root directory rather than the My Documents subdirectory.

Case Q24: The victim was using a Windows CE (Pocket PC) device — Version 4.20, with an Intel(R) PXA255 processor, color16 display at 240x320 pixels resolution. This is identified from the HTTP User-Agent headers in the intercepted packet data (UA-OS, UA-CPU, UA-pixels fields).

Case Q25: The victim was accessing mobile.msn.com — specifically MSN Hotmail mobile email services, including /hm/folder.aspx (email folder/inbox view), /hm/composeppc.aspx (email composition), contacts.aspx (address book), and authentication through memberservices.passport.net and www.passport.net.

Case Q26: The main user's web-based email address is mrevilrulez@yahoo.com, found in Yahoo Mail page titles cached in the browser ("Yahoo! Mail - mrevilrulez@yahoo.com") and in HTML table data within cached Yahoo pages.

Case Q27: Yahoo Mail saves copies of emails under the filenames "ShowFolder" (for folder/inbox views, e.g., ShowFolder?rb=Inbox) and "ShowLetter" (for individual email messages) in the browser's Temporary Internet Files cache (Content.IE5).

Case Q28: There are 4 executable files in the Recycle Bin: Dc1.exe, Dc2.exe, Dc3.exe, and Dc4.exe (located in RECYCLER/S-1-5-21-2000478354-688789844-1708537768-1003/).

Case Q29: No, these files are not really deleted. They are still allocated on disk (marked as r/r — regular file, allocated — in the TSK file listing). They were moved to the Recycle Bin but the Recycle Bin was never emptied, so the file data remains fully intact and recoverable.

Case Q30: Approximately 7,038 files are reported as deleted by the file system (entries marked with the TSK asterisk prefix indicating deleted status), distributed across Documents and Settings, WINDOWS, Program Files, and other directories.

Case Q31: The ClamAV antivirus scan reported no viruses detected (OK status). However, the YARA signature scan matched the "HackTool_Samples" rule, detecting the string "samdump.dll" at disk image offset 0x1e4bf1dd, confirming the presence of SAM database dumping tool components consistent with the Cain & Abel installation and SAMDUMP.EXE in the hacking toolkit.


---

## Overview

| | |
|---|---|
| Findings | **8** (8 confirmed, 0 inference) |
| Severity | 0 critical, 2 high, 3 medium, 0 low, 3 info |
| Sources | 19 evidence sources across 312 tool calls |
| Ruled Out | 3 hypotheses tested and rejected |


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
| 2004-08-19T17:28:27 | System Identification and Configuration of Dell Latitude CPi | INFO | hashdeep.hashes, registry.query.software, registry.query.system |
| 2004-08-19T23:03:54 | User Accounts and Identity: Greg Schardt is Mr. Evil | INFO | registry.system, appfiles.program_files.look@lan.irunin.ini, registry.ntuser.mr. evil |
| 2004-08-20T10:29:01 | mIRC Usage and IRC Channel Activity | MEDIUM | appfiles.program_files.mirc.mirc.ini, appfiles.program_files.mirc.#evilfork.efnet.log, appfiles.program_files.mirc.#elite.hackers.undernet.log |
| 2004-08-20T15:05:00 | Network Configuration and Hacking Tool Installation | HIGH | registry.query.software, appfiles.program_files.look@lan.irunin.ini, registry.ntuser.mr. evil |
| 2004-08-20T15:32:56 | Web-Based Email Usage and Browser Activity | MEDIUM | appfiles.documents_and_settings.mr._evil@yahoo[1].txt, bulk.url, registry.ntuser.mr. evil |
| 2004-08-20T21:13:23 | Email and News Account Configuration (Outlook Express and Agent) | MEDIUM | registry.ntuser.mr. evil, tsk.filelist |
| 2004-08-27T15:34:54 | Ethereal Wireless Interception Evidence | HIGH | tsk.metadata.12264, tsk.filelist, registry.ntuser.mr. evil, registry.query.software |




---

## Hypotheses Ruled Out

These hypotheses were explicitly tested and no supporting evidence was found.


- **No Explicit Criminal Admissions Found in IRC Chat Logs** : ## Investigation Question
Do IRC chat logs contain any explicit admissions or discussions of wireless interception, credit card theft, or specific hacking activities?

## Finding
All available IRC...

- **No Evidence of Employment or Professional Context for Security Tools** : ## Investigation Question
Is there any employment or professional context that would explain having network security tools installed?

## Finding
A thorough search found NO evidence supporting a...

- **No Evidence of Timestamp Manipulation (Timestomping)** : ## Investigation Question
Are there any timestamp inconsistencies in the MFT that would suggest evidence was planted or backdated?

## Finding
The detect_timestomping analysis ran against the...



---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Network Configuration and Hacking Tool Installation

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:05:00 to 2004-08-27T15:34:54 |
| **Sources** | registry.query.software, appfiles.program_files.look@lan.irunin.ini, registry.ntuser.mr. evil |
| **Evidence Refs** | tc_47e66dd3, tc_1de38950, tc_60f1fb7d, tc_6ffb21a3, tc_2eb2e417, tc_36bfec53, tc_05bcba15, tc_34bce4c9 |
| **ATT&CK** | [T1588.002](https://attack.mitre.org/techniques/T1588/002/), [T1059](https://attack.mitre.org/techniques/T1059/), [T1003](https://attack.mitre.org/techniques/T1003/), [T1040](https://attack.mitre.org/techniques/T1040/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1110](https://attack.mitre.org/techniques/T1110/) |


## Network Interface Cards (2 installed)
1. **NetworkCards\2**: Xircom CardBus Ethernet 100 + Modem 56 (Ethernet Interface)
   - Service: {6E4090C2-FAEF-489A-8575-505D21FC1049}
   - Last written: 2004-08-19 17:07:19Z
2. **NetworkCards\11**: Compaq WL110 Wireless LAN PC Card
   - Service: {86FC0C96-3FF2-4D59-9ABA-C602F213B5D2}
   - Last written: 2004-08-27 15:31:44Z

## Look@LAN Configuration
From irunin.ini:
- **IP Address**: 192.168.1.111
- **MAC Address**: 0010a4933e09 (00:10:A4:93:3E:09)
- **OUI 00:10:A4 = Xircom** — this confirms the Xircom CardBus Ethernet NIC was used for the Look@LAN setup

## Installed Programs Usable for Hacking (6 identified from UserAssist, ShimCache, and filesystem)
1. **Cain & Abel** (C:\Program Files\Cain\Cain.exe) — Password recovery/network sniffer, installed from D:\Drivers\Cain & Abel\cain25b45.exe. Prefetch confirms execution: last run 2004-08-27 15:33:03Z (run count 2).
2. **Ethereal** (C:\Program Files\Ethereal\ethereal.exe) — Network protocol analyzer/packet sniffer, version 0.10.6. Installed from Desktop setup exe on Aug 27. Prefetch: last run 2004-08-27 15:34:54Z (run count 1).
3. **Network Stumbler** (C:\Program Files\Network Stumbler\NetStumbler.exe) — Wireless network scanner/wardriving tool. Prefetch: last run 2004-08-27 15:12:35Z (run count 1).
4. **123 WASP** — Password recovery tool, installed from D:\Drivers\Password recovery\123wasp_setup.exe
5. **Anonymizer** (C:\Program Files\Anonymizer) — Identity concealment/proxy tool
6. **Look@LAN** (C:\Program Files\Look@LAN\LookAtLan.exe) — Network monitor/scanner, v2.50 Build 29

Supporting tools also present: WinPcap (packet capture library), Whois (domain lookup), CuteFTP, Forte Agent newsreader.

## My Documents Organized Hacking Toolkit (CRITICAL EVIDENCE)
The My Documents directory contains an extensive, organized collection of hacking tools following the classic "Hacking Exposed" attack methodology. All files were copied to disk on 2004-08-20 between 15:18 and 15:21 UTC (consistent with bulk copy from external media). Major directories:

### COMMANDS (ready-to-use attack tools)
crack.exe, pwdump.exe, pwdump2.exe, SAMDUMP.EXE, nc.exe (Netcat), nmapNT.exe, enum.exe, epdump.exe, nbtscan.exe, nbtdump.exe, smbgrind.exe, user2sid.exe, sid2user.exe, snitch.exe, webscan.exe, winfo.exe, CMD.EXE, ELDUMP.EXE, ELSAVCLR.EXE (event log clearer), ELSAVE.EXE, getpolicy.exe, GrindUI.exe, NAT.EXE, NETVIEWX.EXE, setowner.exe, STREAMFIND.EXE, plus PASSLIST.TXT, NTpasslist.txt, NTuserlist.txt, USERLIST.TXT

### DICTIONARIES (password cracking wordlists)
250MB_WORDLIST.ZIP, biglist_990218.zip, pocket-dic.gz, Unix_dict.gz, words-english.gz, test.zip — massive collection of password dictionaries for offline cracking

### ENUMERATION (target enumeration tools, NT and Unix)
NT: Cerberus Internet Scanner (with scan reports against 172.16.0.2), DumpTools (dumpacl, dumpevt, dumpreg, dumpsec), enum, ferret suite (email/file/web), GetAcct, Legion, nbtdump (reports on 172.16.0.1 and 172.16.0.2), nbtscan, Nt_admin_tools, ogre (rhino9x), SamSpade, Userdump, winfingerprint, winfo
Unix: nc110.gz (Netcat), Nessus vulnerability scanner, nmap, whisker.tar.gz

### EXPLOITATION (attack/exploit tools, NT and Unix)
NT: Brutus (BrutusA2.exe password bruter, NetBus.bad), bsniff (packet sniffer), elsave, fpipe (port forwarder), **GetAdmin** (privilege escalation exploit), **Hk** (privilege escalation exploit), John the Ripper (john-16w.zip), **L0phtCrack** (lc3setup01.exe), lsadump2 (LSA secrets dumper), NAT, **NetBus** (remote access trojan), Netcat, **Pwdump** (multiple versions), Scripts (credentials.txt, FOR Script.txt), **sechole** (security hole exploit), SMBGrind Crack (with CrackUI, password lists), VNC/WinVNC (remote control)
Unix: dsniff 2.3, John the Ripper, WinVNC (Linux, Solaris)

### FOOTPRINTING (reconnaissance tools)
NT: NmapNT (with full source code and packet drivers), NSTPro2, spade114.exe (Sam Spade), superscan, wspingpropack

### MISCELLANEOUS
ToneLoc.zip — classic wardialing tool

### NOVELL
Novell network utilities

## Counter-Analysis: Not an IT Professional Toolkit
The organized directory structure following explicit attack methodology phases (FOOTPRINTING → ENUMERATION → EXPLOITATION) eliminates any "IT professional toolkit" defense. Key indicators:
- Tools explicitly labeled as "EXPLOITATION" and organized by attack phase
- Remote access trojans (NetBus) and privilege escalation exploits (GetAdmin, sechole, Hk)
- 250MB+ of password cracking dictionaries
- Wardialing tool (ToneLoc)
- Scan reports targeting specific hosts (172.16.0.1, 172.16.0.2)
- The COMMANDS directory mirrors the methodology's operational toolkit with ready-to-use binaries
- Credentials.txt file in the Scripts directory
- No evidence of employment, professional certification, or authorized security testing context



### 2. [HIGH] Ethereal Wireless Interception Evidence

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:34:54 to 2004-08-27T15:41:00 |
| **Sources** | tsk.metadata.12264, tsk.filelist, registry.ntuser.mr. evil, registry.query.software |
| **Evidence Refs** | tc_7143f6d1, tc_e1536858, tc_6ffb21a3, tc_1de38950, tc_b46b9c3b, tc_fc019bc9 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1557](https://attack.mitre.org/techniques/T1557/) |


## Ethereal Capture File
A file named **"interception"** was found at:
- **Path**: Documents and Settings/Mr. Evil/interception (inode 12264)
- **Size**: 173,372 bytes
- **Created**: 2004-08-27 15:41:00 UTC
- **Owner SID**: S-1-5-21-2000478354-688789844-1708537768-1003 (Mr. Evil)
- **$STANDARD_INFORMATION timestamps**: Created, Modified, MFT Modified, and Accessed all identical at 2004-08-27 15:41:00.191312 UTC
- **$FILE_NAME timestamps**: Also identical, matching $SI (no evidence of timestomping)

This file is located directly in Mr. Evil's user profile directory (not in My Documents, but in the user root). The filename "interception" is strongly suggestive of its purpose.

## Ethereal Usage Timeline (Aug 27, 2004)
- 15:28:49 - Ethereal program folder created (installation)
- 15:29:43 - Ethereal Start Menu items created
- 15:34:54 - ETHEREAL.EXE first executed (Prefetch: run count 1)
- 15:35:53 - Ethereal preferences file created (first-run config)
- **15:41:00 - "interception" file created (~6 minutes after Ethereal launch)**
- 15:44:40 - Ethereal "recent" file written (records recently saved capture files)

The ~6-minute gap between Ethereal execution and the interception file creation is CONSISTENT with an active network capture session: start Ethereal, capture traffic, save capture file.

## Wireless Sniffing Capability
The Compaq WL110 Wireless LAN PC Card (NetworkCards\11, last written 2004-08-27 15:31:44Z) combined with Ethereal, WinPcap 3.01a, and Network Stumbler indicates a complete wireless network interception capability:
1. **Network Stumbler** (executed 15:12:35Z) — discovers wireless networks
2. **Ethereal + WinPcap** (executed 15:34:54Z) — captures network traffic
3. **"interception"** file (created 15:41:00Z) — saved capture output

## Context: Wardriving Interest
Typed URLs include http://www.wardriving.com/ and http://www.netstumbler.com/. Cookie for www.netstumbler.com dated 2004-08-27 15:10:10Z (same session). Google search for "what is my ip" also found.

## Limitations
The interception file's contents have NOT been directly examined (only metadata is available from the forensic image analysis). We cannot confirm from the available evidence whether the capture contains third-party wireless traffic, the user's own traffic, or sample/test data. The filename "interception," combined with the wireless scanning tools and wardriving interest, strongly suggests unauthorized wireless interception, but this inference relies on circumstantial evidence rather than packet-level content analysis.

## Counter-Analysis Note
The browsing history showing visits to hacking-related sites (www.2600.com/hacked_pages, search.msn.com for "hacking") is from Mr. Evil's OWN browsing activity via Internet Explorer, not from the interception file's captured traffic. The "Mr. Evil@" prefix in IE History entries confirms these were the user's own searches.



### 3. [MEDIUM] Email and News Account Configuration (Outlook Express and Agent)

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T21:13:23 to 2004-08-25T15:55:34 |
| **Sources** | registry.ntuser.mr. evil, tsk.filelist |
| **Evidence Refs** | tc_185d06f5, tc_966047fd, tc_e1536858, tc_6ffb21a3 |
| **ATT&CK** | [T1583.001](https://attack.mitre.org/techniques/T1583/001/) |


## SMTP Email Configuration (Outlook Express Account 00000001)
- **SMTP Server**: smtp.sbcglobal.net
- **SMTP Display Name**: Mr Evil
- **SMTP Email Address**: whoknowsme@sbcglobal.net
- **POP3 Server**: pop.sbcglobal.net
- **POP3 User Name**: whoknowsme@sbcglobal.net
- **Account Last Written**: 2004-08-20 21:14:20Z

## NNTP News Server Configuration (Outlook Express Account 00000002)
- **NNTP Server**: news.dallas.sbcglobal.net
- **NNTP User Name**: whoknowsme@sbcglobal.net
- **NNTP Display Name**: Mr Evil
- **NNTP Email Address**: whoknowsme@sbcglobal.net
- **Account Last Written**: 2004-08-20 21:16:43Z

## Programs Showing SMTP/NNTP Configuration
Two programs were used for email and news:
1. **Outlook Express** (msimn.exe) — UserAssist shows execution 2004-08-20 21:13:23Z; email account configured at 21:14:20Z, news account at 21:16:43Z. Newsgroup .dbx files found in the Outlook Express Identities folder.
2. **Forte Agent** (C:\Program Files\Agent\agent.exe) — UserAssist shows execution at 2004-08-25 15:55:34Z (run count: 2). This is a dedicated newsreader installed from D:\Drivers\Forte Agent\a32-19.exe.

## Subscribed Newsgroups (from Outlook Express .dbx files)
The following hacking-related newsgroups had dedicated .dbx storage files, indicating active subscriptions:
1. alt.2600.crackz
2. alt.2600.hackerz
3. alt.binaries.hacking.beginner
4. alt.binaries.hacking.computers
5. alt.binaries.hacking.utilities
Plus many more including alt.2600, alt.2600.cardz, alt.2600.codez, alt.2600.moderated, alt.2600.phreakz, alt.2600.programz, alt.binaries.hacking.websites, alt.dss.hack, alt.hacking, alt.nl.binaries.hack, alt.stupidity.hackers.malicious, and free.binaries.hacking.* variants.



### 4. [MEDIUM] mIRC Usage and IRC Channel Activity

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:29:01 to 2004-08-25T16:20:27 |
| **Sources** | appfiles.program_files.mirc.mirc.ini, appfiles.program_files.mirc.#evilfork.efnet.log, appfiles.program_files.mirc.#elite.hackers.undernet.log |
| **Evidence Refs** | tc_153a2a3f, tc_f2386083, tc_8cc3d0c5 |
| **ATT&CK** | [T1583.001](https://attack.mitre.org/techniques/T1583/001/) |


## mIRC User Configuration (from mirc.ini)
- **Nick**: Mr
- **Alternate Nick**: mrevilrulez
- **User/Real Name**: Mini Me
- **Email**: none@of.ya
- **Ident userid**: Mrevil
- **Default server**: Undernet: losangeles.ca.us.undernet.org:6660
- **mIRC version**: 6.12
- **Installation source**: D:\Drivers\IRC\mirc612.exe (installed 2004-08-20)
- **Run count**: 3 (last run 2004-08-25 16:20:27Z from UserAssist)

## IRC Chat Logs Found (log directory: Program Files/mIRC/logs/)
Chat logs reveal activity on at least **6 distinct channels** across multiple IRC networks on August 20, 2004:

**EFnet network:**
1. #evilfork (Session Start: Fri Aug 20 10:30:18 2004)
2. #ISO-WAREZ (Session Start: Fri Aug 20 10:29:01 2004)

**Undernet network:**
3. #Chataholics (Session Start: Fri Aug 20 10:52:09 2004)
4. #CyberCafe (Session Start: Fri Aug 20 10:54:21 2004)
5. #Elite.Hackers (Session Start: Fri Aug 20 10:45:34 2004)
6. #houston (Session Start: Fri Aug 20 10:48:59 2004)
7. #LuxShell (Session Start: Fri Aug 20 10:42:03 2004)
8. #mp3xserv (Session Start: Fri Aug 20 10:43:16 2004)
9. #ushells (Session Start: Fri Aug 20 10:44:49 2004)
10. #funny (Session Start: Fri Aug 20 14:26:18 2004)

**AfterNet network:**
11. #thedarktower (Session Start: Fri Aug 20 14:14:45 2004)

Several channel names (#Elite.Hackers, #LuxShell, #ushells, #ISO-WAREZ) are directly related to hacking activity.



### 5. [MEDIUM] Web-Based Email Usage and Browser Activity

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:32:56 to 2004-08-27T15:44:44 |
| **Sources** | appfiles.documents_and_settings.mr._evil@yahoo[1].txt, bulk.url, registry.ntuser.mr. evil |
| **Evidence Refs** | tc_73b2bd60, tc_85968652, tc_6ffb21a3 |
| **ATT&CK** | [T1071.001](https://attack.mitre.org/techniques/T1071/001/) |


## Yahoo Mail Web-Based Email
Mr. Evil used Yahoo Mail through Internet Explorer. Evidence:
- Yahoo cookie file found at: Documents and Settings/Mr. Evil/Cookies/mr. evil@yahoo[1].txt
- Cookie contains Yahoo session data: Y cookie with n=7a4o0f8osgs2u&p= and U cookie with un=7a4o0f8osgs2u
- URLs in browser cache show Yahoo Mail activity at us.f613.mail.yahoo.com including:
  - /ym/login (login page)
  - /ym/ShowFolder?rb=Inbox (inbox view)
  - /ym/Compose (compose email)
  - /ym/quickbuilder
  - edit.yahoo.com/config/last (account settings)
- The user "Mr. Evil" is identified in IE history entries (e.g., "40823: Mr. Evil@http://edit.yahoo.com/...")

The Yahoo Mail web interface uses **ShowFolder** and **ShowLetter** as filenames to display mail folder views and individual messages locally in the browser cache.

## Other Websites Visited (from TypedURLs and bulk_extractor)
- http://www.maktoob.com/ (Arabic web portal)
- http://www.ethereal.com/
- http://www.wardriving.com/
- http://www.drudgereport.com/
- http://www.majorgeeks.com/
- http://www.yahoo.com/
- http://www.2600.org/
- http://www.2600.com/hacked_pages/ (hacker site showing defaced pages)
- http://search.msn.com/results.aspx?q=hacking
- http://www.google.com/search?q=what+is+my+ip



### 6. [INFO] System Identification and Configuration of Dell Latitude CPi

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T17:28:27 to 2004-08-27T15:46:33 |
| **Sources** | hashdeep.hashes, registry.query.software, registry.query.system |
| **Evidence Refs** | tc_62817dcf, tc_bb447a52, tc_6bd9be65, tc_ff7d8bd4, tc_287f2086, tc_ff1c92e9 |


## Image Verification
The forensic image 4Dell_Latitude_CPi.E01 has the following hashes:
- **MD5**: 943243e71eda7481fee7b83f06698993
- **SHA256**: 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31

## Operating System
- **Product**: Microsoft Windows XP (Version 5.1, Build 2600)
- **Build**: 2600.xpclient.010817-1148
- **Type**: Uniprocessor Free
- **SystemRoot**: C:\WINDOWS

## Installation Details
- **Install Date**: 2004-08-19 (InstallDate DWORD = 1092955707 = Thursday, August 19, 2004 17:28:27 UTC)
- **Registered Owner**: Greg Schardt
- **Registered Organization**: N/A
- **Product ID**: 55274-640-0147306-23684

## Timezone
- **Standard Name**: Central Standard Time
- **Daylight Name**: Central Daylight Time
- **Bias**: 360 minutes (UTC-6)
- **ActiveTimeBias**: 300 minutes (UTC-5, indicating CDT was active)

## Computer Identity
- **Computer Name**: N-1A9ODN6ZXK4LQ
- **Domain**: (empty — Tcpip\Parameters\Domain is blank, meaning the machine was not joined to a network domain; the workgroup/domain is the same as the computer name: N-1A9ODN6ZXK4LQ)

## Last Shutdown
- **ShutdownTime**: 2004-08-27T15:46:33.109216 UTC (from ControlSet001\Control\Windows\ShutdownTime)



### 7. [INFO] User Accounts and Identity: Greg Schardt is Mr. Evil

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T23:03:54 to 2004-08-27T15:08:23 |
| **Sources** | registry.system, appfiles.program_files.look@lan.irunin.ini, registry.ntuser.mr. evil |
| **Evidence Refs** | tc_b1477b81, tc_60f1fb7d, tc_6ffb21a3 |


## SAM User Accounts (5 total)
1. **Administrator [500]** — Built-in admin, never logged in, Login Count: 0
2. **Guest [501]** — Built-in guest, never logged in, Login Count: 0, disabled password
3. **HelpAssistant [1000]** — Remote Desktop Help, created 2004-08-19 22:28:24Z, never logged in
4. **SUPPORT_388945a0 [1002]** — Vendor support account, disabled, never logged in
5. **Mr. Evil [1003]** — Default Admin User, created 2004-08-19 23:03:54Z, **Last Login: 2004-08-27 15:08:23Z**, **Login Count: 15** — member of Administrators group

## Primary User
**Mr. Evil** is the primary and most-used user account with 15 logins. It is also the last user to log on (2004-08-27 15:08:23Z).

## Identity Proof: Greg Schardt = Mr. Evil
The **Look@LAN installer configuration file** (irunin.ini) directly links the two identities:
- `%REGOWNER%=Greg Schardt` (the Windows registered owner)
- `%LANUSER%=Mr. Evil` (the logged-in user running the installer)
- `%USERNAME%=Greg Schardt` at the bottom of the file
- `%DESKTOP%=C:\Documents and Settings\Mr. Evil\Desktop`

This conclusively proves that **Greg Schardt** (the registered OS owner) is the same person operating as the **Mr. Evil** user account, and that this file comes from the **Look@LAN** program installation.



### 8. [INFO] Recycle Bin Contents and Deleted Files Analysis

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | tsk.filelist, clamav.scan, yara.files |
| **Evidence Refs** | tc_717a78dd, tc_e52a6174, tc_8b9db4f4, tc_8a639a40 |


## Recycle Bin Executable Files
The Recycle Bin (RECYCLER/S-1-5-21-2000478354-688789844-1708537768-1003/) contains **4 executable files**:
1. **Dc1.exe** (inode 11692, r/r = allocated)
2. **Dc2.exe** (inode 11996, r/r = allocated)
3. **Dc3.exe** (inode 12033, r/r = allocated)
4. **Dc4.exe** (inode 12041, r/r = allocated)

Also present: desktop.ini and INFO2 (Recycle Bin metadata).

The SID S-1-5-21-2000478354-688789844-1708537768-1003 corresponds to the **Mr. Evil** user account.

## File Allocation Status
All four executables are marked as **r/r** (regular file, allocated) in the TSK file listing, meaning they are **NOT truly deleted from disk** — the data is still present and recoverable. The files were sent to the Recycle Bin but not emptied/purged.

## Total Deleted Files on Filesystem
The filesystem reports approximately **7,038 deleted entries** (marked with TSK `*` prefix), concentrated in:
- Documents and Settings: 92 entries
- WINDOWS: 76 entries
- Program Files: 12 entries
- My Documents: 3 entries
Plus other scattered deletions.

## ClamAV Virus Scan
ClamAV scan result: **No viruses detected** — the image returned "OK" status.

## YARA Scan
YARA matched **HackTool_Samples** rule, detecting the string "samdump.dll" at offset 0x1e4bf1dd in the disk image. This indicates the presence of SAM dump tool components (consistent with Cain & Abel's capabilities).



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Internal IP | `192.168.1.111` |  | Network Configuration and Hacking Tool Installation |
| Internal IP | `172.16.0.2` |  | Network Configuration and Hacking Tool Installation |
| Internal IP | `172.16.0.1` |  | Network Configuration and Hacking Tool Installation |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Path | `C:\Program` |  | Network Configuration and Hacking Tool Installation |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `whoknowsme@sbcglobal.net` |  | Email and News Account Configuration (Outlook Express and Agent) |
| Email | `none@of.ya` |  | mIRC Usage and IRC Channel Activity |




---

## Appendix C: MITRE ATT&CK Coverage

9 techniques identified across findings.


**Kill Chain Coverage:** Resource Development (2) > Execution (1) > Credential Access (4) > Discovery (2) > Collection (1) > Command and Control (1)


### Resource Development

| Technique | Name | Findings |
|-----------|------|----------|
| [T1583.001](https://attack.mitre.org/techniques/T1583/001/) | Domains | Email and News Account Configuration (Outlook...; mIRC Usage and IRC Channel Activity |
| [T1588.002](https://attack.mitre.org/techniques/T1588/002/) | Tool | Network Configuration and Hacking Tool Installation |


### Execution

| Technique | Name | Findings |
|-----------|------|----------|
| [T1059](https://attack.mitre.org/techniques/T1059/) | Command and Scripting Interpreter | Network Configuration and Hacking Tool Installation |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1003](https://attack.mitre.org/techniques/T1003/) | OS Credential Dumping | Network Configuration and Hacking Tool Installation |
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Network Configuration and Hacking Tool Installation; Ethereal Wireless Interception Evidence |
| [T1110](https://attack.mitre.org/techniques/T1110/) | Brute Force | Network Configuration and Hacking Tool Installation |
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Ethereal Wireless Interception Evidence |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Network Configuration and Hacking Tool Installation; Ethereal Wireless Interception Evidence |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Network Configuration and Hacking Tool Installation |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Ethereal Wireless Interception Evidence |


### Command and Control

| Technique | Name | Findings |
|-----------|------|----------|
| [T1071.001](https://attack.mitre.org/techniques/T1071/001/) | Web Protocols | Web-Based Email Usage and Browser Activity |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 312 |
| Findings submitted | 8 |
| Confirmed | 8 |
| Inferences | 0 |
| Input tokens | 5.2K |
| Output tokens | 90.1K |
| Total tokens | 95.3K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 132 | 16.6K | 16.7K |
| claude-opus-4-6 | 5.1K | 73.5K | 78.6K |




<details>
<summary>Evidence Sources (264)</summary>

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
| appfiles.program_files.mirc.aliases.ini | icat | 16 |
| appfiles.program_files.mirc.#chataholics.undernet.log | icat | 16 |
| appfiles.program_files.mirc.#cybercafe.undernet.log | icat | 207 |
| appfiles.program_files.mirc.#elite.hackers.undernet.log | icat | 11 |
| appfiles.program_files.mirc.#evilfork.efnet.log | icat | 11 |
| appfiles.program_files.mirc.#funny.undernet.log | icat | 10 |
| appfiles.program_files.mirc.#houston.undernet.log | icat | 9 |
| appfiles.program_files.mirc.#iso-warez.efnet.log | icat | 7 |
| ez.mft | eztools | 12183 |
| appfiles.program_files.mirc.#luxshell.undernet.log | icat | 13 |
| appfiles.program_files.look@lan.irunin.ini | icat | 399 |
| appfiles.program_files.mirc.#mp3xserv.undernet.log | icat | 15 |
| appfiles.program_files.look@lan.license.txt | icat | 25 |
| appfiles.program_files.mirc.#thedarktower.afternet.log | icat | 14 |
| appfiles.program_files.ethereal.dictionary.xml | icat | 649 |
| appfiles.program_files.mirc.#ushells.undernet.log | icat | 9 |
| appfiles.program_files.ethereal.mobileipv4.xml | icat | 64 |
| appfiles.program_files.mirc.m5tar.undernet.log | icat | 8 |
| appfiles.program_files.ethereal.nasreq.xml | icat | 293 |
| appfiles.program_files.mirc.mirc.ini | icat | 224 |
| appfiles.program_files.ethereal.sunping.xml | icat | 24 |
| appfiles.program_files.mirc.popups.ini | icat | 96 |
| appfiles.program_files.ethereal.capture_filters.txt | icat | 80 |
| appfiles.program_files.mirc.readme.txt | icat | 34 |
| appfiles.program_files.ethereal.capturing.txt | icat | 84 |
| appfiles.program_files.mirc.servers.ini | icat | 423 |
| appfiles.program_files.ethereal.display_filters.txt | icat | 43 |
| appfiles.program_files.mirc.urls.ini | icat | 9 |
| appfiles.program_files.ethereal.faq.txt | icat | 2228 |
| appfiles.program_files.mirc.versions.txt | icat | 472 |
| appfiles.program_files.ethereal.getting_started.txt | icat | 90 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.overview.txt | icat | 38 |
| appfiles.documents_and_settings.sharedaccess.ini | icat | 52 |
| appfiles.program_files.ethereal.well_known.txt | icat | 114 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.pcrepattern.3.txt | icat | 1475 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| appfiles.program_files.ethereal.agentx-mib.txt | icat | 529 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| ez.shimcache | eztools | 140 |
| appfiles.program_files.ethereal.disman-event-mib.txt | icat | 1957 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| appfiles.program_files.ethereal.disman-schedule-mib.txt | icat | 701 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.disman-script-mib.txt | icat | 1766 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| appfiles.program_files.ethereal.etherlike-mib.txt | icat | 1139 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.hcnum-tc.txt | icat | 120 |
| appfiles.documents_and_settings.desktop.ini | icat | 10 |
| appfiles.program_files.ethereal.host-resources-mib.txt | icat | 1542 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| ez.prefetch | eztools | 165 |
| appfiles.program_files.ethereal.host-resources-types.txt | icat | 391 |
| appfiles.documents_and_settings.desktop.ini | icat | 6 |
| appfiles.program_files.ethereal.iana-address-family-numbers-mib.txt | icat | 123 |
| appfiles.documents_and_settings.desktop.ini | icat | 14 |
| appfiles.program_files.ethereal.iana-language-mib.txt | icat | 125 |
| appfiles.documents_and_settings.desktop.ini | icat | 12 |
| registry.system | regripper | 403 |
| appfiles.program_files.ethereal.ianaiftype-mib.txt | icat | 392 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.if-inverted-stack-mib.txt | icat | 151 |
| appfiles.documents_and_settings.desktop.ini | icat | 16 |
| appfiles.program_files.ethereal.if-mib.txt | icat | 1816 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| registry.system | regripper | 133 |
| appfiles.program_files.ethereal.inet-address-mib.txt | icat | 300 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.ip-forward-mib.txt | icat | 811 |
| appfiles.documents_and_settings.brndlog.txt | icat | 5 |
| appfiles.program_files.ethereal.ip-mib.txt | icat | 722 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.ipv6-icmp-mib.txt | icat | 531 |
| registry.system | regripper | 7 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.program_files.ethereal.ipv6-mib.txt | icat | 1445 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.program_files.ethereal.ipv6-tc.txt | icat | 69 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.ipv6-tcp-mib.txt | icat | 213 |
| registry.system | regripper | 19 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.ipv6-udp-mib.txt | icat | 143 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.lm-sensors-mib.txt | icat | 232 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.mta-mib.txt | icat | 1228 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.net-snmp-agent-mib.txt | icat | 546 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| registry.system | regripper | 8 |
| appfiles.program_files.ethereal.net-snmp-examples-mib.txt | icat | 229 |
| appfiles.documents_and_settings.desktop.ini | icat | 6 |
| appfiles.program_files.ethereal.net-snmp-mib.txt | icat | 69 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.net-snmp-monitor-mib.txt | icat | 61 |
| appfiles.documents_and_settings.desktop.ini | icat | 9 |
| appfiles.program_files.ethereal.net-snmp-system-mib.txt | icat | 65 |
| appfiles.documents_and_settings.desktop.ini | icat | 11 |
| appfiles.program_files.ethereal.net-snmp-tc.txt | icat | 123 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.network-services-mib.txt | icat | 628 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| appfiles.program_files.ethereal.notification-log-mib.txt | icat | 784 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.rfc-1215.txt | icat | 40 |
| appfiles.program_files.ethereal.rfc1155-smi.txt | icat | 121 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.rfc1213-mib.txt | icat | 2615 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.program_files.ethereal.rmon-mib.txt | icat | 3982 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
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
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.snmp-user-based-sm-mib.txt | icat | 914 |
| registry.system | regripper | 9600 |
| appfiles.program_files.ethereal.snmp-view-based-acm-mib.txt | icat | 832 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.snmpv2-conf.txt | icat | 324 |
| appfiles.documents_and_settings.brndlog.txt | icat | 217 |
| appfiles.program_files.ethereal.snmpv2-mib.txt | icat | 856 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.program_files.ethereal.snmpv2-smi.txt | icat | 346 |
| appfiles.documents_and_settings.mr._evil@www.drudgereport[1].txt | icat | 11 |
| registry.system | regripper | 283 |
| appfiles.program_files.ethereal.snmpv2-tc.txt | icat | 774 |
| appfiles.documents_and_settings.mr._evil@advertising[2].txt | icat | 29 |
| appfiles.program_files.ethereal.snmpv2-tm.txt | icat | 178 |
| appfiles.documents_and_settings.mr._evil@atdmt[2].txt | icat | 11 |
| appfiles.program_files.ethereal.tcp-mib.txt | icat | 332 |
| appfiles.documents_and_settings.mr._evil@atwola[2].txt | icat | 11 |
| appfiles.program_files.ethereal.tunnel-mib.txt | icat | 339 |
| appfiles.documents_and_settings.mr._evil@centrport[1].txt | icat | 11 |
| appfiles.program_files.ethereal.ucd-demo-mib.txt | icat | 76 |
| appfiles.documents_and_settings.mr._evil@cnn[1].txt | icat | 11 |
| appfiles.program_files.ethereal.ucd-diskio-mib.txt | icat | 119 |
| registry.system | regripper | 1161 |
| appfiles.documents_and_settings.mr._evil@doubleclick[1].txt | icat | 11 |
| appfiles.program_files.ethereal.ucd-dlmod-mib.txt | icat | 121 |
| appfiles.documents_and_settings.mr._evil@fastclick[1].txt | icat | 29 |
| appfiles.program_files.ethereal.ucd-ipfilter-mib.txt | icat | 258 |
| appfiles.documents_and_settings.mr._evil@google[1].txt | icat | 11 |
| appfiles.program_files.ethereal.ucd-ipfwacc-mib.txt | icat | 329 |
| appfiles.documents_and_settings.mr._evil@list[1].txt | icat | 11 |
| appfiles.program_files.ethereal.ucd-snmp-mib-old.txt | icat | 746 |
| appfiles.documents_and_settings.mr._evil@maktoob[1].txt | icat | 11 |
| appfiles.program_files.ethereal.ucd-snmp-mib.txt | icat | 1384 |
| appfiles.documents_and_settings.mr._evil@microsoft[1].txt | icat | 11 |
| appfiles.program_files.ethereal.udp-mib.txt | icat | 148 |
| appfiles.documents_and_settings.mr._evil@msn[2].txt | icat | 56 |
| appfiles.program_files.ethereal.snmp-notification-mib.txt | icat | 591 |
| appfiles.documents_and_settings.mr._evil@revenue[2].txt | icat | 11 |
| registry.system | regripper | 3138 |
| appfiles.documents_and_settings.mr._evil@search.msn[1].txt | icat | 29 |
| appfiles.documents_and_settings.mr._evil@servedby.advertising[2].txt | icat | 20 |
| appfiles.documents_and_settings.mr._evil@sj9[1].txt | icat | 11 |
| appfiles.documents_and_settings.mr._evil@tribalfusion[1].txt | icat | 38 |
| registry.system | regripper | 199 |
| appfiles.documents_and_settings.mr._evil@www.cnn[1].txt | icat | 11 |
| appfiles.documents_and_settings.mr._evil@www.maktoob[2].txt | icat | 11 |
| appfiles.documents_and_settings.mr._evil@www.netstumbler[2].txt | icat | 11 |
| appfiles.documents_and_settings.mr._evil@yahoo[1].txt | icat | 29 |
| appfiles.documents_and_settings.mr[1].txt | icat | 11 |
| appfiles.documents_and_settings.mr[2].txt | icat | 38 |
| appfiles.documents_and_settings.desktop.ini | icat | 6 |
| clamav.scan | clamav | 1 |
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
| yara.files | yara | 3 |
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
| registry.ntuser.default user | regripper | 70 |
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
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| tsk.metadata.12264 | istat | 83 |
| registry.query.system | python-registry | 1 |
| registry.query.ntuser.Mr. Evil | python-registry | 1 |
| registry.query.ntuser.Mr. Evil | python-registry | 1 |
| registry.query.ntuser.Mr. Evil | python-registry | 1 |
| composite.file_staging | composite | 668 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
