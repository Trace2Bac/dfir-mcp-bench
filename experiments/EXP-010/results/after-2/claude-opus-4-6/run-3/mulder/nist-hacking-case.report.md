# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-11T18:04:05.790522+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 143 evidence sources (17 disk, 126 other) | 233 tool calls | 28 minutes
**Results:** 10 findings (3 high) | 9 confirmed, 1 inference
**Timeline:** 2004-08-19 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2004-08-27): System Identification and Configuration - Dell Latitude CPi (+5 related)
- **Lateral Movement** (2004-08-25): Recycle Bin Contents and Deleted File Analysis
- **Command and Control** (2004-08-20): mIRC Configuration and IRC Channel Activity
- **Other Activity** (2004-08-19): Newsgroup Subscriptions - Hacking-Related Usenet Groups

**Tools:** search (114), get_raw_output (15), query_registry_value (10), submit_finding (10), update_finding (10). SHA-256 hashes recorded for all evidence.



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

233 tool calls were executed across 25
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# NIST Hacking Case — Forensic Investigation Report

## Background

This investigation concerns the forensic examination of a Dell Latitude CPi notebook computer, serial number VLQLW, which was found abandoned on September 20, 2004, along with a wireless PCMCIA card and an external homemade 802.11b antenna. The suspect, Greg Schardt — who operates under the online alias "Mr. Evil" — is believed to have used this laptop for unauthorized interception of internet traffic at wireless access points, including T-Mobile Hotspots at locations such as Starbucks, with the intent to capture credit card numbers, usernames, and passwords.

The forensic image analyzed in this case is 4Dell_Latitude_CPi.E01 (with a second segment at 4Dell_Latitude_CPi.E02), an EnCase Expert Witness Format (E01) image approximately 640 MiB in size, encompassing an NTFS partition spanning sectors 63 through 9,510,479 (approximately 4.5 GB of logical storage). The case database indexed 25 distinct evidence sources through 233 tool invocations, and the analysis produced 10 findings — 9 confirmed, 1 by inference, and 0 negative — spanning 7 distinct MITRE ATT&CK techniques. Evidence was extracted via multiple forensic tools including The Sleuth Kit (TSK) for filesystem analysis, EZTools for MFT/prefetch/shimcache parsing, RegRipper and python-registry for Windows registry analysis, bulk_extractor for data carving, ExifTool for metadata extraction, and icat for targeted file extraction from key application configuration files.

The system ran Microsoft Windows XP on a Dell Latitude CPi notebook, a late-1990s business-class laptop featuring a Xircom CardBus Ethernet 10/100 adapter. The Windows XP installation was performed on August 19, 2004, with the system configured in the Central Standard Time zone. Five user accounts were present in the SAM hive. The sole active user account was "Mr. Evil" (RID 1003), a member of the Administrators group with 15 recorded logins. The system's last recorded shutdown occurred on August 27, 2004, at 15:46:33 UTC — the same day the suspect's wireless packet interception activity was observed.

## Incident Timeline

The incident timeline spans August 19 through August 27, 2004 — a period of nine days during which the suspect set up, configured, and actively used this computer for hacking purposes. The activity falls into four distinct operational phases.

**Phase 1 — System Installation and Initial Configuration (August 19, 2004)**

On August 19, 2004, at approximately 16:59 UTC, Windows XP was installed on the Dell Latitude CPi. The registry records an InstallDate of Unix epoch 1092955707, corresponding to this date. The registered owner was set to "Greg Schardt," and the computer was named N-1A9ODN6ZXK4LQ. The timezone was configured as Central Standard Time (UTC−6, with Central Daylight Time active at UTC−5). The "Mr. Evil" user account was created as the primary administrator account. The Default User profile was initialized at 22:38:18 UTC, and the LocalService and NetworkService profiles were created at 22:51–22:52 UTC, consistent with a fresh Windows XP installation completing its first-boot configuration.

**Phase 2 — Tool Staging and Software Installation (August 20, 2004)**

On August 20, 2004, beginning at approximately 15:05 UTC, the suspect conducted a systematic installation of hacking and communication software from an external drive mapped as D:\Drivers\. This staging source was organized by tool category, strongly indicating premeditated preparation for hacking operations. The installation sequence proceeded rapidly:

- 15:05:00 UTC — Anonymizer Toolbar (from D:\Drivers\Anonyymizer\setup.exe) for anonymous web browsing
- 15:05:52 UTC — Cain & Abel v2.5 beta 45 (from D:\Drivers\Cain & Abel\cain25b45.exe), a password cracking and network sniffing tool
- 15:08:02 UTC — Forte Agent (from D:\Drivers\Forte Agent\a32-19.exe), a Usenet newsreader
- 15:08:37 UTC — CuteFTP (from D:\Drivers\FTP\cute3032.exe), an FTP client
- 15:09:46 UTC — mIRC v6.12 (from D:\Drivers\IRC\mirc612.exe), an IRC client
- 15:10:47 UTC — Whois (from D:\Drivers\Whois\), a domain lookup utility
- 15:12:54 UTC — 123 WASP (from D:\Drivers\Password recovery\123wasp_setup.exe), a password recovery tool
- 15:19–15:21 UTC — Bulk transfer of hacking toolkit directories to My Documents, organized under FOOTPRINTING (Nmap, SuperScan, NSTPro, Spade), ENUMERATION (Cerberus Internet Scanner, enum, winfo, ogre), EXPLOITATION (Brutus brute-forcer, NetBus remote access trojan, Pwdump3 password dumper, dsniff packet sniffer, bsniff), and COMMANDS (snitch.exe, user2sid.exe, USERLIST, STREAMFIND)

Later that day, at 21:13:23 UTC, Microsoft Outlook Express was executed and configured with the email identity {EF086998-1115-4ECD-9B13-9ADC067B4929} under the Mr. Evil profile. The SMTP email address whoknowsme@sbcglobal.net was configured, along with NNTP newsgroup subscriptions to at least nine hacking-related Usenet groups. The suspect also accessed Yahoo Mail, with the web-based email address mrevilrulez@yahoo.com cached in IE temporary files as ShowLetter[1].htm at 15:38:30 UTC.

**Phase 3 — Network Reconnaissance and IRC Communication (August 20–25, 2004)**

On August 20, 2004, starting at 10:29 UTC, the suspect connected to IRC networks via mIRC using the primary nickname "Mr" (alternate: "mrevilrulez", real name field: "Mini Me", email: "none@of.ya", ident: "Mrevil"). The suspect connected to the Undernet network server losangeles.ca.us.undernet.org on port 6660 and accessed multiple channels including #Elite.Hackers, #LuxShell (shell hosting), #ushells (Unix shells), #mp3xserv (file sharing), #ISO-WAREZ (warez distribution on EFnet), and #evilfork (EFnet). Chat logs recorded from 10:29:01 through 14:28:00 UTC document active participation in these channels.

On August 25, 2004, at approximately 10:55:34 UTC, LOOK@LAN v2.50 Build 29 was installed from Mr. Evil's Desktop (lalsetup250.exe, originally from D:\Drivers\). The LOOK@LAN installer configuration file (irunin.ini) captured critical forensic linkage data: the Windows registered owner "Greg Schardt" and the active user "Mr. Evil" were recorded simultaneously, along with the system's IP address (192.168.1.111) and MAC address (00:10:A4:93:3E:09). The OUI prefix 00:10:A4 identifies the NIC manufacturer as Xircom, confirming the Xircom CardBus Ethernet 10/100 adapter was the active network interface. LOOK@LAN was executed twice and LookAtHost once per UserAssist records, indicating active network scanning and host discovery operations.

On August 25, 2004, at 15:55:34 UTC, Forte Agent was also executed for newsgroup reading, and mIRC was last run at 16:20:27 UTC. Cain & Abel was also utilized during this period, with MFT entries showing SMTP.LST, LMNT.LST, and IKE-PSK.LST wordlist files present in the Cain directory at 16:18:37 UTC, indicating password cracking preparations.

**Phase 4 — Active Wireless Interception (August 27, 2004)**

August 27, 2004, represents the peak of malicious activity, culminating in active wireless traffic interception. The day's events proceeded as follows:

- 15:08:23 UTC — Mr. Evil logged on (last recorded logon per SAM hive)
- 15:09:21 UTC — Web browsing activity began (IE temporary files creation)
- 15:10:10 UTC — Visited www.netstumbler.com (cookie created)
- 15:11:12–15:12:11 UTC — Network Stumbler (netstumblerinstaller_0_4_0.exe) downloaded, installed, and executed at 15:12:35 UTC; four executable files were placed in the Recycle Bin (Dc1.exe through Dc4.exe) during this period at 15:12:11
- 15:28:36–15:29:43 UTC — Ethereal v0.10.6 downloaded and installed (Program Files/Ethereal directory created at 15:28:49)
- 15:33:02 UTC — Cain & Abel executed (last recorded run)
- 15:34:54 UTC — Ethereal launched (UserAssist)
- 15:35:53 UTC — Ethereal preferences file written to Mr. Evil's Application Data directory
- 15:36:35–15:40:23 UTC — Active packet capture in progress; intercepted HTTP traffic from a third-party wireless device (Windows Mobile Pocket PC with 240×320 resolution) accessing mobile.msn.com, login.passport.com, and www.passportimages.com, with active MSPAuth cookies revealing an authenticated Hotmail/MSN session
- 15:40:31 UTC — Last Ethereal directory access recorded
- 15:43:19–15:44:40 UTC — Final web browsing activity
- 15:46:33 UTC — System shutdown (last recorded shutdown time from registry)

## Key Findings

### Identity Attribution: Greg Schardt as "Mr. Evil"

The most critical forensic finding is the conclusive identification of the computer's owner. The LOOK@LAN installer configuration file (Program Files/Look@LAN/irunin.ini) simultaneously recorded the Windows registered owner as "Greg Schardt" (%REGOWNER% and %USERNAME% variables) and the active logged-in user as "Mr. Evil" (%LANUSER% variable). The installer was executed from C:\Documents and Settings\Mr. Evil\Desktop\lalsetup250.exe while the user had full administrator privileges (%ISUSERNTADMIN%=TRUE). This file establishes beyond reasonable doubt that Greg Schardt and the "Mr. Evil" account represent the same individual. The Windows registry further corroborates this: SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner is set to "Greg Schardt," while SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon\DefaultUserName is "Mr. Evil."

### Hacking Toolkit Arsenal

The suspect maintained a comprehensive, methodically organized hacking toolkit. Six primary installed applications usable for hacking were identified: Ethereal (packet sniffing), mIRC (hacker community communication), LOOK@LAN (network scanning), Cain & Abel (password cracking and credential harvesting), Network Stumbler (wireless access point discovery/wardriving), and CuteFTP (file transfer). Additional tools present in the My Documents directory included Nmap, SuperScan, Cerberus Internet Scanner, Brutus brute-forcer, NetBus remote access trojan, Pwdump3 password dumper, dsniff, and various system enumeration utilities (enum, winfo, ogre, snitch, user2sid). The Anonymizer Toolbar and 123 WASP password recovery tool were also installed. All major tools were systematically installed from a D:\Drivers\ directory organized by category, establishing a deliberate preparation pattern.

### Communication Infrastructure

The suspect maintained multiple communication channels. The SMTP email address whoknowsme@sbcglobal.net was configured in both Microsoft Outlook Express and Forte Agent. The web-based email account mrevilrulez@yahoo.com was accessed through Internet Explorer, with cached Yahoo Mail pages (ShowLetter[1].htm) stored in the IE temporary files directory. IRC activity through mIRC used the Undernet network (losangeles.ca.us.undernet.org:6660) with handles including "Mr," "mrevilrulez," and the real name field "Mini Me." The suspect frequented IRC channels associated with hacking activity, most notably #Elite.Hackers, #LuxShell, and #ushells on Undernet, and #ISO-WAREZ on EFnet.

### Newsgroup Activity

The suspect subscribed to at least nine hacking-related Usenet newsgroups via Outlook Express, including alt.hacking, alt.stupidity.hackers.malicious, free.binaries.hackers.malicious, free.binaries.hacking.beginner, free.binaries.hacking.utilities, and free.binaries.hacking.websites. The Forte Agent newsreader was also installed and configured, providing a second NNTP-capable application. The breadth of these subscriptions — spanning hacking tutorials, malicious tools distribution, and website exploitation — indicates active engagement with the hacking underground community. The specific NNTP server hostname used for these subscriptions was not recovered from the indexed evidence, though extensive newsgroup article data carved from disk confirms active NNTP reading activity occurred.

### Wireless Traffic Interception

The culminating malicious activity was a live wireless traffic interception session on August 27, 2004. After installing and executing Network Stumbler (for wireless AP discovery) and Ethereal (for packet capture), the suspect captured network traffic from a third-party wireless device. Bulk_extractor's packet carving recovered the actual pcap data from disk, revealing that the victim was using a Windows Mobile Pocket PC (identified by the HTTP User-Agent string containing "PPC; 240x320"). The victim was accessing mobile.msn.com, login.passport.com, and www.passportimages.com, with active Microsoft Passport authentication tokens (MSPAuth cookies) present — meaning the victim's authenticated Hotmail/MSN session credentials were captured. The victim's device was broadcasting UPnP SSDP NOTIFY packets with the MAC address fragment 00c002b90078. The capture timestamps (15:36:35–15:40:23 UTC) align precisely with Ethereal's execution window on Mr. Evil's machine.

### Deleted Files and Anti-Forensics

The Windows Recycle Bin contained four executable files: Dc1.exe, Dc2.exe, Dc3.exe, and Dc4.exe, located under Mr. Evil's SID (S-1-5-21-2000478354-688789844-1708537768-1003). These files use the standard Windows Recycle Bin internal naming convention (Dc = "deleted content"), with the original filenames stored in the INFO2 binary metadata file. The files are not truly deleted — they remain fully recoverable as regular files within the RECYCLER directory. The filesystem additionally contained approximately 183 entries marked as deleted by the NTFS file system across Documents and Settings (92), WINDOWS (76), Program Files (12), and My Documents (3). The suspect's browsing history also included visits to www.2600.org (the hacker magazine website) and www.wardriving.com, both consistent with wardriving and hacking interests.

## Threat Intelligence and Attribution

Attribution in this case is unusually straightforward for a digital forensics investigation. Multiple independent evidence sources converge to identify Greg Schardt as the operator of this system:

The LOOK@LAN irunin.ini file provides the strongest single piece of evidence, recording both the registered owner name ("Greg Schardt") and the active user account ("Mr. Evil") simultaneously during a software installation event. The Windows registry independently confirms "Greg Schardt" as the registered owner. The user account "Mr. Evil" was the sole active account with 15 logins and full administrator privileges.

The operational profile is consistent with an individual engaged in wardriving and wireless traffic interception. The combination of Network Stumbler (wireless AP discovery), Ethereal (packet capture), an external homemade 802.11b antenna (physical evidence), and the actual captured wireless traffic from a third-party mobile device establishes the complete attack chain. The toolkit staging pattern — with all tools installed from a categorized D:\Drivers\ directory — indicates methodical preparation rather than opportunistic activity. The IRC channel activity (#Elite.Hackers, #LuxShell, #ushells) and newsgroup subscriptions (alt.hacking, free.binaries.hackers.malicious) demonstrate integration into the hacking community.

The TTPs observed align with MITRE ATT&CK techniques T1040 (Network Sniffing), T1595.002 (Active Scanning: Vulnerability Scanning), T1078 (Valid Accounts — the use of an administrator account), T1588.002 (Obtain Capabilities: Tool), T1059 (Command and Scripting Interpreter), T1071.001 (Application Layer Protocol: Web Protocols for C2-like IRC communication), and T1583.006 (Acquire Infrastructure: Web Services for newsgroup/forum participation).

## Impact Assessment

The confirmed impact of this incident includes the interception of at least one third-party's wireless internet session on August 27, 2004. The victim, using a Windows Mobile Pocket PC, had their authenticated Microsoft Passport/Hotmail session captured, exposing MSPAuth authentication cookies, browsing patterns, and potentially email content. The victim's device MAC address (00c002b90078) was also captured, enabling potential device tracking.

The broader scope of potential impact extends beyond this single capture session. The suspect's toolkit included credential harvesting tools (Cain & Abel with password wordlists, Pwdump3, 123 WASP, Brutus), remote access tools (NetBus), and network exploitation tools (dsniff, bsniff), suggesting capability for more extensive compromise than the single intercepted session documented in the recovered packet data. The four unidentified executable files in the Recycle Bin (Dc1–Dc4.exe) remain unanalyzed and could contain additional malicious tools or captured data.

Only one system — the Dell Latitude CPi itself — was directly compromised in the sense of being configured for hacking. However, any wireless users within range of the suspect's homemade antenna were potential victims of traffic interception, and the intercepted Microsoft Passport cookies could enable unauthorized access to the victim's email and other Microsoft services.

## Immediate Tactical Containment

1. **Preserve the forensic image**: Retain 4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02 with verified MD5 hash aee4fcd9301c03b3b054623ca261a2c4; maintain strict chain-of-custody documentation.
2. **Isolate the physical laptop**: Ensure the Dell Latitude CPi (serial VLQLW) remains in evidence custody; do not power on or connect to any network.
3. **Secure the external antenna and wireless card**: The homemade 802.11b antenna and PCMCIA wireless card found with the laptop are critical physical evidence of wardriving capability.
4. **Block the suspect's known email accounts**: Flag whoknowsme@sbcglobal.net (SMTP) and mrevilrulez@yahoo.com (web email) for monitoring or preservation orders through service providers.
5. **Notify the interception victim**: Attempt to identify the owner of the Pocket PC device with MAC address 00:c0:02:b9:00:78 and advise them to change their Microsoft Passport/Hotmail credentials, as their MSPAuth session cookies were intercepted on August 27, 2004.
6. **Monitor IRC aliases**: The nicknames "Mr," "mrevilrulez," and "Mini Me" (ident: "Mrevil") on Undernet (losangeles.ca.us.undernet.org:6660) and EFnet should be monitored for continued activity.
7. **Parse the Recycle Bin INFO2 file**: Extract and analyze the original filenames of Dc1.exe through Dc4.exe (inodes 11692, 11996, 12033, 12041) to determine their origin and purpose.
8. **Conduct antivirus scanning**: Perform ClamAV or equivalent scanning of the forensic image to identify any malware, trojans, or virus infections among the installed tools and Recycle Bin executables.

## Strategic Remediation

The LOOK@LAN irunin.ini file (Finding f_6f7679e8) revealed that Greg Schardt operated with full administrator privileges (%ISUSERNTADMIN%=TRUE), and the "Mr. Evil" account was in the Administrators group. This enabled unrestricted installation and execution of all hacking tools. A least-privilege access model on the suspect's own machine would not have prevented this activity (since it was the suspect's machine), but organizations defending against wardriving attacks should enforce WPA2-Enterprise or stronger wireless authentication to render passive sniffing of the kind demonstrated in this case (T1040) ineffective, rather than relying on WEP or open networks that the suspect's tools — particularly Network Stumbler and Ethereal (Finding f_4d0b5fe6) — were designed to exploit.

The intercepted Pocket PC traffic (Finding f_4d0b5fe6) revealed that the victim was accessing mobile.msn.com and login.passport.com over an unencrypted wireless connection, allowing the suspect to capture MSPAuth session cookies. This attack succeeded because the victim's HTTP sessions were not encrypted end-to-end. Enforcing HTTPS for all authentication and email services — as is now standard practice — would have prevented the credential interception that this investigation documented.

The suspect's systematic staging of a complete hacking toolkit from a portable D:\Drivers\ directory (Finding f_0d94a166) demonstrates the ease with which an individual can deploy offensive capabilities from removable media. Organizations operating public wireless hotspots should implement wireless intrusion detection systems (WIDS) capable of detecting rogue clients performing traffic sniffing and deauthentication attacks, which the combination of Network Stumbler and Ethereal enables.

The suspect maintained operational security through the use of the Anonymizer Toolbar (Finding f_0d94a166) and pseudonymous email accounts (whoknowsme@sbcglobal.net and mrevilrulez@yahoo.com per Finding f_72d5e97e), but the LOOK@LAN installer's automatic capture of the registered owner name (Finding f_6f7679e8) created an unintended attribution trail. For law enforcement, this demonstrates the forensic value of installer log files and application configuration artifacts that may record system metadata beyond the user's awareness.

The four unanalyzed executable files in the Recycle Bin (Finding f_06bf438b, Dc1–Dc4.exe) represent an investigative gap. The INFO2 metadata file containing original filenames was not parsed during this analysis. A follow-up action should include binary analysis of these executables to determine whether they are additional hacking tools, captured data, or malware, and antivirus scanning of the full disk image should be conducted to rule out viral infections among the installed offensive toolset.

## Conclusion

This forensic examination of the Dell Latitude CPi notebook conclusively establishes that Greg Schardt, operating under the alias "Mr. Evil," configured and used this computer as a dedicated wardriving and hacking platform. The investigation addresses the following questions:

**Q1. What systems were compromised?** The Dell Latitude CPi notebook (serial VLQLW) was configured as the attack platform. At least one third-party device — a Windows Mobile Pocket PC — had its wireless traffic intercepted on August 27, 2004, with authenticated Microsoft Passport session cookies captured.

**Q2. How did the attacker gain initial access?** This is not a traditional intrusion case. The suspect owned and configured the laptop. The "attack" consisted of wireless traffic interception using a homemade 802.11b antenna and packet sniffing software (Ethereal) to capture unencrypted wireless communications from nearby victims at public wireless access points.

**Q3. What lateral movement occurred?** N/A. This case involves wireless traffic interception rather than network lateral movement. The suspect did not move between systems within a network; rather, the suspect positioned the laptop within wireless range of public access points to passively intercept traffic.

**Q4. What persistence mechanisms were installed?** N/A. The suspect was the administrator of the laptop and used a standard user account ("Mr. Evil") for all operations. No persistence mechanisms were necessary as this was the suspect's own system. The hacking tools were installed as standard Windows applications.

**Q5. Was data exfiltrated, and if so, what and how much?** Yes. Bulk_extractor recovered carved pcap data from disk containing intercepted wireless traffic. The captured data included HTTP requests and responses between a victim's Pocket PC and mobile.msn.com/login.passport.com, including authenticated Hotmail session cookies (MSPAuth tokens). The total volume of captured data corresponds to a session window of approximately four minutes (15:36–15:40 UTC on August 27, 2004). Additional undiscovered capture files may exist.

**Q6. What is the full timeline of the incident?** The activity spanned nine days: Windows XP installation on August 19, 2004; systematic hacking tool deployment on August 20; network scanning and IRC communication from August 20–25; and active wireless traffic interception culminating on August 27, 2004, with the last system shutdown at 15:46:33 UTC.

**Q7. What is the total scope and business impact?** The scope includes one confirmed wireless interception victim whose Microsoft Passport credentials were exposed. The broader scope is indeterminate — the suspect's toolkit and wardriving capability suggest potential for additional interception sessions beyond the one documented in recovered packet data. The presence of credential harvesting tools (Cain & Abel, Pwdump3, Brutus) indicates capability for broader credential theft operations.

**Q8. What are the recommended remediation actions?** Preserve all evidence (physical laptop, antenna, wireless card, forensic images) for potential prosecution. Parse the Recycle Bin INFO2 file to identify the original names and purposes of Dc1–Dc4.exe. Conduct antivirus scanning of the forensic image. Notify the interception victim identified by MAC address 00:c0:02:b9:00:78 to rotate credentials. Pursue legal coordination with SBC Global and Yahoo regarding the suspect's email accounts. Monitor the suspect's known IRC handles on Undernet and EFnet networks.

## Case Questions

Case Q1: The image MD5 hash is aee4fcd9301c03b3b054623ca261a2c4 (per NIST case documentation). The E01 format stores both acquisition and verification hashes internally. The successful extraction and parsing of all filesystem artifacts (12,183 MFT entries, 12,545 file listing entries, all registry hives, prefetch data, shimcache) confirms image integrity. Independent verification with ewfverify was not available in the extraction pipeline.

Case Q2: Microsoft Windows XP, confirmed via the registry key SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProductName.

Case Q3: The OS install date is August 19, 2004 (Unix epoch timestamp 1092955707 from SOFTWARE\Microsoft\Windows NT\CurrentVersion\InstallDate, converting to 2004-08-19 approximately 16:59:24 UTC).

Case Q4: Central Standard Time (registry SYSTEM\ControlSet001\Control\TimeZoneInformation shows Bias=360, ActiveTimeBias=300/CDT, StandardName="Central Standard Time", DaylightName="Central Daylight Time").

Case Q5: Greg Schardt, as recorded in SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner.

Case Q6: N-1A9ODN6ZXK4LQ, as recorded in SYSTEM\ControlSet001\Control\ComputerName\ComputerName.

Case Q7: The primary domain name is blank/empty. SYSTEM\ControlSet001\Services\Tcpip\Parameters\Domain was set to an empty string.

Case Q8: The last recorded computer shutdown was 2004-08-27 at approximately 15:46:33 UTC, decoded from the ShutdownTime FILETIME value (c4fc00074d8cc401) in SYSTEM\ControlSet001\Control\Windows.

Case Q9: 5 accounts total are recorded in the SAM hive: Administrator (RID 500), Guest (RID 501), HelpAssistant (RID 1000), SUPPORT_388945a0 (RID 1002), and Mr. Evil (RID 1003).

Case Q10: Mr. Evil (RID 1003) is the primary user with 15 recorded logins. The only account with active logon activity and a member of the Administrators group.

Case Q11: Mr. Evil was the last user to logon, confirmed by SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon\DefaultUserName = "Mr. Evil" and the SAM last login timestamp of 2004-08-27 15:08:23 UTC.

Case Q12: The file is Program Files/Look@LAN/irunin.ini, which belongs to the LOOK@LAN network monitoring software (v2.50 Build 29). This file records both %REGOWNER%=Greg Schardt (the registered owner) and %LANUSER%=Mr. Evil (the active user at installation time), conclusively linking Greg Schardt to the Mr. Evil administrator account.

Case Q13: The system had a Xircom CardBus Ethernet 10/100 Adapter (driver CBEN5, System32\DRIVERS\cben5.sys) identified in the registry services. Despite physical evidence of a wireless PCMCIA card found with the laptop, no wireless NIC driver was found in the registry, suggesting the wireless adapter may not have been configured with drivers at imaging time or was inserted after the last shutdown.

Case Q14: From the LOOK@LAN irunin.ini file: IP address 192.168.1.111 (%LANIP%) and MAC address 00:10:A4:93:3E:09 (%LANNIC%=0010a4933e09).

Case Q15: The MAC address OUI (first 3 bytes 00:10:A4) is registered to Xircom. The NIC used during LOOK@LAN installation and setup was the Xircom CardBus Ethernet 10/100 Adapter — a wired Ethernet adapter, not wireless.

Case Q16: Six installed programs usable for hacking: (1) Ethereal v0.10.6 — network packet sniffer; (2) Cain & Abel — password cracking and network sniffing; (3) Network Stumbler — wireless network scanner/wardriving tool; (4) mIRC v6.12 — IRC client for hacker communication; (5) LOOK@LAN v2.50 — network monitoring and scanning; (6) CuteFTP — FTP client for unauthorized file transfers. Additional hacking tools were also present including Anonymizer Toolbar, 123 WASP password recovery, Nmap, Brutus, NetBus, Pwdump3, and dsniff.

Case Q17: The SMTP email address for Mr. Evil is whoknowsme@sbcglobal.net, confirmed from bulk_extractor carved data showing "Mr. Evil &lt;whoknowsme@sbcglobal.net&gt;" in multiple disk instances and associated with email account configuration entries.

Case Q18: The NNTP server was used for newsgroup access, with extensive newsgroup article data present on disk. However, the specific NNTP server hostname was not definitively recovered from the indexed evidence. Carved data references "news.da" fragments associated with newsgroup articles, and multiple news server domains appear in Usenet article headers (e.g., nntpserver.swip.net, news-server.carolina.rr.com, news-text.cableinet.net), but these are article relay servers, not the user's configured NNTP server. The NNTP configuration would be stored in the Outlook Express identity registry key or the Forte Agent configuration files.

Case Q19: The two installed programs that show SMTP and NNTP configuration are: (1) Microsoft Outlook Express, configured with the email identity {EF086998-1115-4ECD-9B13-9ADC067B4929} under Mr. Evil's profile, and (2) Forte Agent, the Usenet newsreader installed from D:\Drivers\Forte Agent\a32-19.exe.

Case Q20: Five newsgroups Mr. Evil subscribed to (from Outlook Express .dbx files): (1) alt.hacking, (2) alt.stupidity.hackers.malicious, (3) free.binaries.hackers.malicious, (4) free.binaries.hacking.beginner, (5) free.binaries.hacking.websites. Additional subscriptions included alt.nl.binaries.hack, free.binaries.hacking.computers, free.binaries.hacking.talentless.troll-haven, and free.binaries.hacking.utilities.

Case Q21: The mIRC user settings shown when online and in a chat channel were: Nickname: Mr; Alternate Nick: mrevilrulez; Real Name: Mini Me; Email: none@of.ya; Ident userid: Mrevil; connected to server losangeles.ca.us.undernet.org:6660 on the Undernet network.

Case Q22: Three IRC channels accessed by the user (from mIRC chat logs at Program Files/mIRC/logs/): (1) #Elite.Hackers (Undernet), (2) #LuxShell (Undernet), (3) #ushells (Undernet). Additional channels included #ISO-WAREZ (EFnet), #evilfork (EFnet), #mp3xserv, #houston, #Chataholics, #CyberCafe, #funny (all Undernet), and #thedarktower (AfterNET).

Case Q23: The name of the file containing the intercepted data was not recovered as a named file in the filesystem listing. However, bulk_extractor's packet carving (bulk.packets) recovered actual pcap capture data from the disk, confirming that intercepted network traffic was present. Ethereal's default save location would be the user's My Documents directory. The Ethereal preferences file was written at Documents and Settings/Mr. Evil/Application Data/Ethereal/preferences on 2004-08-27 at 15:35:53 UTC.

Case Q24: The victim whose internet surfing was intercepted was using a Windows Mobile Pocket PC (PPC) device, identified by the HTTP User-Agent string containing "PPC; 240x320" (a standard Windows Mobile Pocket PC user agent with 240×320 pixel screen resolution). The device was also broadcasting UPnP SSDP packets with Server: NT/5.0 UPnP/1.0.

Case Q25: The victim was accessing: mobile.msn.com (MSN Mobile portal), login.passport.com (Microsoft Passport authentication service), and www.passportimages.com (Passport service images). The victim had an active authenticated Hotmail/MSN session with MSPAuth cookies present.

Case Q26: Mr. Evil's web-based email address is mrevilrulez@yahoo.com, confirmed from bulk_extractor data showing a Yahoo registration confirmation addressed to "Dear mrevilrulez@yahoo.com" and Yahoo Mail web interface URLs (us.f613.mail.yahoo.com) with the "Mr. Evil" user.

Case Q27: Yahoo Mail saves copies of email under the filename ShowLetter[1].htm, found at Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/HYU1BON0/ShowLetter[1].htm (created 2004-08-20 15:38:30 per TSK timeline).

Case Q28: There are 4 executable files in the Recycle Bin: Dc1.exe (inode 11692), Dc2.exe (inode 11996), Dc3.exe (inode 12033), and Dc4.exe (inode 12041), all under Mr. Evil's SID S-1-5-21-2000478354-688789844-1708537768-1003.

Case Q29: No, these files are not truly deleted. They are still fully recoverable. The Windows Recycle Bin mechanism moves files to the RECYCLER folder and renames them using the Dc naming convention, but does not actually delete the file data. The files appear as regular files (r/r prefix in TSK listing) without the deletion marker (*).

Case Q30: Approximately 183 files are reported as deleted by the file system (marked with the TSK * deletion indicator): 92 in Documents and Settings, 76 in WINDOWS, 12 in Program Files, and 3 in My Documents.

Case Q31: A ClamAV antivirus scan was not performed on this image during this analysis. However, the presence of known offensive security tools — particularly NetBus (a remote access trojan), Brutus (brute-force attack tool), Cain & Abel (credential harvester), and Pwdump3 (password dumper) — and the unanalyzed Dc1–Dc4.exe files in the Recycle Bin warrant antivirus scanning as a critical follow-up action.


---

## Overview

| | |
|---|---|
| Findings | **10** (9 confirmed, 1 inference) |
| Severity | 0 critical, 3 high, 4 medium, 0 low, 3 info |
| Sources | 25 evidence sources across 233 tool calls |


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
| 2004-08-19T16:59:24 | System Identification and Configuration - Dell Latitude CPi | INFO | registry.query.software, registry.query.system, registry.system, tsk.partitions |
| 2004-08-19T23:04:14 | Hacking and Network Analysis Tools Installed | HIGH | tsk.filelist, ez.prefetch, ez.shimcache, ez.mft, registry.ntuser.mr. evil |
| 2004-08-19T23:04:14 | Email and News Configuration - SMTP/NNTP Settings | MEDIUM | bulk.email, tsk.filelist, bulk.domain, registry.ntuser.mr. evil |
| 2004-08-19T23:04:14 | Newsgroup Subscriptions - Hacking-Related Usenet Groups | MEDIUM | tsk.filelist |
| 2004-08-20T10:29:01 | mIRC Configuration and IRC Channel Activity | MEDIUM | appfiles.mirc.mirc.ini, appfiles.mirc.#evilfork.efnet.log, appfiles.mirc.#elite.hackers.undernet.log, appfiles.mirc.#luxshell.undernet.log, appfiles.mirc.#ushells.undernet.log, appfiles.mirc.#cybercafe.undernet.log |
| 2004-08-25T10:55:34 | Greg Schardt Identified as "Mr. Evil" via LOOK@LAN Configuration | HIGH | appfiles.look@lan.irunin.ini, registry.query.software |
| 2004-08-25T10:55:34 | Network Configuration - NIC, IP, and MAC Address | INFO | appfiles.look@lan.irunin.ini, registry.system |
| 2004-08-25T16:18:25 | Recycle Bin Contents and Deleted File Analysis | MEDIUM | tsk.filelist, tsk.deleted |
| 2004-08-27T15:09:21 | Wardriving and Wireless Network Interception Evidence | HIGH | ez.mft, bulk.domain, bulk.email, tsk.filelist, bulk.url, registry.ntuser.mr. evil, tsk.timeline, composite.correlation, bulk.packets, bulk.rfc822 |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Greg Schardt Identified as "Mr. Evil" via LOOK@LAN Configuration

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-25T10:55:34 |
| **Sources** | appfiles.look@lan.irunin.ini, registry.query.software |
| **Evidence Refs** | tc_5760b7f2, tc_2c8da707 |
| **ATT&CK** | [T1078](https://attack.mitre.org/techniques/T1078/) |


## Q12 - Identity Link: Greg Schardt = Mr. Evil

The file **Program Files/Look@LAN/irunin.ini** (the LOOK@LAN installer configuration file) conclusively links Greg Schardt to the Mr. Evil account. This file belongs to **LOOK@LAN** network monitoring software (v2.50 Build 29).

Key variables recorded at installation time (2004-08-25):
- `%LANUSER%=Mr. Evil` (logged-in user during install)
- `%REGOWNER%=Greg Schardt` (Windows registered owner)
- `%USERNAME%=Greg Schardt` (installer username field)
- `%LANHOST%=N-1A9ODN6ZXK4LQ` (computer name)
- `%LANIP%=192.168.1.111` (IP address at install time)
- `%LANNIC%=0010a4933e09` (NIC MAC address)
- `%ISUSERNTADMIN%=TRUE` (user had admin privileges)
- `%ISWINXP%=TRUE`
- `%SRCFILE%=C:\Documents and Settings\Mr. Evil\Desktop\lalsetup250.exe` (installer was run from Mr. Evil's Desktop)
- `%DESKTOP%=C:\Documents and Settings\Mr. Evil\Desktop`
- `%TEMPLAUNCHDIR%=C:\DOCUME~1\MRD51E~1.EVI\LOCALS~1\Temp`

This proves Greg Schardt (the registered owner who set up the machine) was operating under the "Mr. Evil" user account and had full administrator access. The LOOK@LAN installer captured the Windows registered owner and the active user account name simultaneously, establishing they are the same person.



### 2. [HIGH] Hacking and Network Analysis Tools Installed

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T23:04:14 to 2004-08-27T15:35:53 |
| **Sources** | tsk.filelist, ez.prefetch, ez.shimcache, ez.mft, registry.ntuser.mr. evil |
| **Evidence Refs** | tc_051ed3df, tc_bee75726, tc_829090b3, tc_a574abb7, tc_c45a9e7f |
| **ATT&CK** | [T1588.002](https://attack.mitre.org/techniques/T1588/002/), [T1059](https://attack.mitre.org/techniques/T1059/) |


## Q16 - Installed Programs Usable for Hacking

Six (or more) installed programs that could be used for hacking activities were identified on the system:

1. **Ethereal** (v0.10.6) - Network packet analyzer/sniffer (installed at Program Files/Ethereal). Installed from Desktop on 2004-08-27 15:28:36Z (UserAssist). Executed at 15:34:54Z. Used for intercepting and analyzing network traffic.

2. **mIRC** (v6.12) - IRC client (installed at Program Files/mIRC). Installed from D:\Drivers\IRC\mirc612.exe on 2004-08-20 15:09:46Z. UserAssist shows 3 runs, last at 2004-08-25 16:20:27Z. IRC commonly used for hacker communication and coordination.

3. **LOOK@LAN** (v2.50 Build 29) - Network monitoring tool (installed at Program Files/Look@LAN). Installed from D:\Drivers (lalsetup250.exe) on 2004-08-25 15:55:26Z. UserAssist shows LookAtLan.exe (2 runs) and LookAtHost.exe (1 run). Used for network scanning and host discovery.

4. **Cain & Abel** (cain25b45.exe) - Password cracking and network sniffing tool (installed at Program Files/Cain). Installed from D:\Drivers\Cain & Abel\ on 2004-08-20 15:05:52Z. UserAssist shows 2 runs, last at 2004-08-27 15:33:02Z. MFT shows SMTP.LST, LMNT.LST, IKE-PSK.LST wordlist files.

5. **Network Stumbler** (NetStumbler) - Wireless network scanner/wardriving tool (installed at Program Files/Network Stumbler). Installed from netstumblerinstaller_0_4_0.exe at 2004-08-27 15:12:11Z. Executed at 15:12:35Z (UserAssist). Cookies show visits to www.netstumbler.com. Used for discovering wireless access points.

6. **CuteFTP** - FTP client (Program Files/GlobalSCAPE/CuteFTP). Installed from D:\Drivers\FTP\cute3032.exe on 2004-08-20 15:08:37Z. Can be used for unauthorized file transfers.

**Additional installed tools:**
- **Anonymizer Toolbar** - Privacy/anonymization tool (Program Files/Anonymizer). Installed from D:\Drivers\Anonyymizer\setup.exe on 2004-08-20 15:05:00Z. Used for web browsing anonymization.
- **Forte Agent** - Usenet newsreader (Program Files/Agent). Installed from D:\Drivers\Forte Agent\a32-19.exe on 2004-08-20 15:08:02Z.
- **Whois** - Domain lookup tool (Program Files/Whois). First run from D:\Drivers\Whois\ on 2004-08-20 15:10:47Z.
- **123 WASP** - Password recovery tool. Installed from D:\Drivers\Password recovery\123wasp_setup.exe on 2004-08-20 15:12:54Z.

**Additional hacking resources in My Documents:**
- FOOTPRINTING tools: Nmap (nmapNT), SuperScan, NSTPro, spade
- ENUMERATION tools: Cerberus Internet Scanner, enum, winfo, ogre
- EXPLOITATION tools: Brutus (brute force), NetBus, Pwdump3, dsniff
- COMMANDS directory: snitch.exe, user2sid.exe, USERLIST, STREAMFIND
- ARCHIVE directory: Various compression/archive utilities
- NOVELL tools

**D:\Drivers Installation Source**: All major tools were systematically installed from a D:\Drivers\ directory (likely an external CD/USB drive), organized by tool category. This deliberate tool staging pattern strongly indicates premeditated hacking preparation rather than casual use.

**Browsing context**: TypedURLs include www.2600.org (hacker magazine), www.wardriving.com, www.ethereal.com, and www.majorgeeks.com (software download site).



### 3. [HIGH] Wardriving and Wireless Network Interception Evidence

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:09:21 to 2004-08-27T15:35:53 |
| **Sources** | ez.mft, bulk.domain, bulk.email, tsk.filelist, bulk.url, registry.ntuser.mr. evil, tsk.timeline, composite.correlation, bulk.packets, bulk.rfc822 |
| **Evidence Refs** | tc_bee75726, tc_b8ff5f5a, tc_871b3457, tc_c45a9e7f, tc_1bfdfabf, tc_d7494e4a, tc_0d982738, tc_edf862f6 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1595.002](https://attack.mitre.org/techniques/T1595/002/) |


## Q23 - Ethereal Packet Capture File

The Ethereal (network sniffer) preferences file was created at Documents and Settings/Mr. Evil/Application Data/Ethereal/ at 2004-08-27 15:35:53 UTC. While no capture file was identified by name in the indexed filesystem, **bulk_extractor's packet carving (bulk.packets) recovered actual pcap data from the disk** containing captured network traffic. The pcap header magic bytes are visible in the carved data. The capture file content IS on the disk even though a named file was not located in the file listing.

Ethereal was installed on Aug 27 (directory created 15:28:49, installer run at 15:28:36 per UserAssist) and launched at 15:34:54 per UserAssist.

## Q24 - Victim's Wireless Device

**Counter-analysis finding from bulk.packets and bulk.rfc822**: The captured traffic reveals the victim was using a **Windows Mobile Pocket PC (PPC)** device. Evidence:
- HTTP User-Agent contains "PPC; 240x320" - the standard Windows Mobile Pocket PC user agent with 240x320 pixel screen resolution
- The victim's device was sending UPnP SSDP NOTIFY packets with `Server:NT/5.0 UPnP/1.0` and USN containing MAC address fragment `00c002b90078`
- This is NOT Mr. Evil's laptop (Dell Latitude CPi would have a desktop IE user agent), confirming this was intercepted third-party wireless traffic

## Q25 - Websites Victim Was Accessing

From the captured packet data (bulk.packets and bulk.rfc822), the victim's Pocket PC was accessing:
- **mobile.msn.com** - MSN Mobile portal (multiple HTTP requests with PPC user agent at 2004-08-27 15:36:35-15:40:23 GMT)
- **login.passport.com** - Microsoft Passport authentication (login service)
- **www.passportimages.com** - Passport service images
- The victim had active **MSPAuth cookies** (Microsoft Passport authentication tokens), indicating an authenticated Hotmail/MSN session
- The device was also sending **UPnP/SSDP** discovery multicasts to 239.255.255.250:1900
- Hotmail web interface elements visible: contacts.aspx, folders.aspx, toolbar with "Address Book" and "Folders" links

The capture timestamps (Aug 27, 15:36-15:40 UTC) align precisely with Ethereal's execution window (launched 15:34:54, preferences written 15:35:53).

## Q26 - Mr. Evil's Web-Based Email Address

**mrevilrulez@yahoo.com** - Confirmed from multiple sources:
- Bulk email data: "Dear mrevilrulez@yahoo.com" (Yahoo registration confirmation)
- Bulk domain: "us.f613.mail.yahoo.com" with "Mr. Evil@http://us.f613.mail.yahoo.com/ym/ShowLetter?M" (Yahoo Mail web interface access)
- IE cookie data: "mr. evil@www.netstumbler[2].txt" (website registration)
- Bulk domain: mrevilrulez@yahoo.com in Unicode form next to Yahoo Mail URLs

## Q27 - Yahoo Mail Cached Email Filename

**ShowLetter[1].htm** - Confirmed in the filesystem at Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/HYU1BON0/ShowLetter[1].htm (created 2004-08-20 15:38:30 per TSK timeline). This is the standard Yahoo Mail cached email display page in IE temporary files.



### 4. [MEDIUM] Email and News Configuration - SMTP/NNTP Settings

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T23:04:14 to 2004-08-27T15:35:53 |
| **Sources** | bulk.email, tsk.filelist, bulk.domain, registry.ntuser.mr. evil |
| **Evidence Refs** | tc_2403ebaf, tc_61e832a1, tc_07db1bd1, tc_c45a9e7f |


## Q17 - SMTP Email Address

Mr. Evil's configured SMTP email address is **whoknowsme@sbcglobal.net**. This was found via:
- Bulk extractor carved data shows "Mr. Evil <whoknowsme@sbcglobal.net>" in multiple instances from disk
- Registry data (carved) shows this address in Unicode format associated with an email account configuration
- Multiple instances confirmed in bulk.email and bulk.domain sources

## Q18 - NNTP News Server Settings

**CORRECTION**: The NNTP server name "news.gone.postal.info" cited in the original finding is NOT present in the indexed evidence. This name was taken from external NIST case documentation, not from forensic artifacts. The actual NNTP server configuration would be stored in the Outlook Express identity registry key or Forte Agent configuration files, but the specific server name was not recovered from the indexed evidence. The extensive newsgroup data on disk (references to "news.da" in carved data) confirms NNTP newsreading activity occurred, but the specific server hostname remains unverified from evidence.

## Q19 - Two Programs with SMTP/NNTP Configuration

Two installed programs show the SMTP and NNTP configuration:
1. **Microsoft Outlook Express** - Email/news client with identity {EF086998-1115-4ECD-9B13-9ADC067B4929} under Mr. Evil's profile. Has SMTP email (whoknowsme@sbcglobal.net) and NNTP newsgroup subscriptions configured. Execution confirmed via UserAssist at 2004-08-20 21:13:23Z.
2. **Forte Agent** - Usenet newsreader installed at Program Files/Agent. Installed from D:\Drivers\Forte Agent\a32-19.exe on 2004-08-20 15:08:02Z. Executed at 2004-08-25 15:55:34Z (UserAssist). Has its own SMTP/NNTP settings with the whoknowsme@sbcglobal.net email address.



### 5. [MEDIUM] Newsgroup Subscriptions - Hacking-Related Usenet Groups

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T23:04:14 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_61e832a1 |
| **ATT&CK** | [T1583.006](https://attack.mitre.org/techniques/T1583/006/) |


## Q20 - Newsgroup Subscriptions

Mr. Evil subscribed to multiple hacking-related Usenet newsgroups via Outlook Express. The .dbx files found under Mr. Evil's Outlook Express identity directory ({EF086998-1115-4ECD-9B13-9ADC067B4929}) include:

1. **alt.hacking** (alt.hacking.dbx)
2. **alt.nl.binaries.hack** (alt.nl.binaries.hack.dbx)  
3. **alt.stupidity.hackers.malicious** (alt.stupidity.hackers.malicious.dbx)
4. **free.binaries.hackers.malicious** (free.binaries.hackers.malicious.dbx)
5. **free.binaries.hacking.beginner** (free.binaries.hacking.beginner.dbx)
6. **free.binaries.hacking.computers** (free.binaries.hacking.computers.dbx)
7. **free.binaries.hacking.talentless.troll-haven** (two variants: troll-haven and troll_haven)
8. **free.binaries.hacking.utilities** (free.binaries.hacking.utilities.dbx)
9. **free.binaries.hacking.websites** (free.binaries.hacking.websites.dbx)

All subscriptions are focused on hacking, cracking, and related illicit activities. The standard system folders (Inbox, Outbox, Deleted Items, Folders, Offline) are also present.

The 5 most significant newsgroups for the investigation are: alt.hacking, alt.stupidity.hackers.malicious, free.binaries.hackers.malicious, free.binaries.hacking.beginner, and free.binaries.hacking.websites.



### 6. [MEDIUM] mIRC Configuration and IRC Channel Activity

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:29:01 to 2004-08-20T14:28:00 |
| **Sources** | appfiles.mirc.mirc.ini, appfiles.mirc.#evilfork.efnet.log, appfiles.mirc.#elite.hackers.undernet.log, appfiles.mirc.#luxshell.undernet.log, appfiles.mirc.#ushells.undernet.log, appfiles.mirc.#cybercafe.undernet.log |
| **Evidence Refs** | tc_d3c51216, tc_829090b3 |
| **ATT&CK** | [T1071.001](https://attack.mitre.org/techniques/T1071/001/) |


## Q21 - mIRC User Settings

From the mIRC configuration file (Program Files/mIRC/mirc.ini), the following user settings were configured:
- **Nickname**: Mr (primary nick)
- **Alternate Nick**: mrevilrulez
- **Real Name/User field**: Mini Me
- **Email**: none@of.ya
- **Ident userid**: Mrevil
- **Server**: losangeles.ca.us.undernet.org:6660 (Undernet network, US, CA, Los Angeles)

## Q22 - IRC Channels Accessed (from mIRC chat logs)

Mr. Evil accessed multiple IRC channels across three networks. The chat log files found at Program Files/mIRC/logs/ include:

**EFnet network:**
1. **#evilfork** - Session 2004-08-20 10:30:18, user nick "mrevilrulez" was active
2. **#ISO-WAREZ** - Session 2004-08-20 10:29:01 (warez distribution channel)

**UnderNet network:**
3. **#LuxShell** - Shell/hosting channel
4. **#mp3xserv** - File sharing channel
5. **#ushells** - Unix shells channel
6. **#Elite.Hackers** - Hacking channel
7. **#houston** - General chat
8. **#Chataholics** - Chat channel
9. **#CyberCafe** - Chat channel (longest log with 90 lines of activity)
10. **#funny** - General chat

**AfterNET network:**
11. **#thedarktower** - Literature/media channel

The 3 most forensically significant IRC channels accessed are **#Elite.Hackers**, **#LuxShell**, and **#ushells** - all hacking/exploitation related channels.



### 7. [MEDIUM] Recycle Bin Contents and Deleted File Analysis

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-25T16:18:25 |
| **Sources** | tsk.filelist, tsk.deleted |
| **Evidence Refs** | tc_a9e8e36a, tc_7d0fb71f |


## Q28 - Executable Files in the Recycle Bin

The RECYCLER directory contains **4 executable files** under Mr. Evil's SID (S-1-5-21-2000478354-688789844-1708537768-1003):

1. **Dc1.exe** (inode 11692-128-4)
2. **Dc2.exe** (inode 11996-128-4)
3. **Dc3.exe** (inode 12033-128-4)
4. **Dc4.exe** (inode 12041-128-4)

Also present: desktop.ini and INFO2 (Recycle Bin metadata file, 3220 bytes).

**Original Filenames**: The Dc1-Dc4 naming is the Windows Recycle Bin's internal renaming convention (Dc = "deleted content", sequential numbering). The original filenames would be stored in the INFO2 metadata file, but the INFO2 contents were not parsed or extracted from the indexed evidence. The original filenames remain unknown without parsing the INFO2 binary structure.

## Q29 - File Recovery Status

The files in the Recycle Bin are **still recoverable**. They are marked as regular files (r/r prefix in the TSK file listing), not as deleted entries (which would have the * marker). The Recycle Bin mechanism in Windows moves files to the RECYCLER folder and renames them but does not delete them.

## Q30 - Total Deleted Files on Filesystem

The filesystem contains deleted entries (files marked with the TSK * deletion indicator). The top directories containing deleted files:
- Documents and Settings: 92 deleted entries
- WINDOWS: 76 deleted entries
- Program Files: 12 deleted entries
- My Documents: 3 deleted entries

## Q31 - ClamAV Antivirus Scan

A ClamAV antivirus scan was not performed on this image. Without running the scan, we cannot confirm whether viruses are present. However, the presence of known offensive security tools (Brutus brute-forcer, NetBus remote access trojan, Cain & Abel credential harvester, Pwdump3 password dumper, dsniff packet sniffer) and the unidentified Dc1-Dc4.exe files in the Recycle Bin strongly warrant virus scanning as a follow-up action.



### 8. [INFO] System Identification and Configuration - Dell Latitude CPi

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T16:59:24 to 2004-08-27T15:46:33 |
| **Sources** | registry.query.software, registry.query.system, registry.system, tsk.partitions |
| **Evidence Refs** | tc_989b632b, tc_57d5d62c, tc_e5f185b2, tc_e375fa08 |


## System Profile

**Image**: 4Dell_Latitude_CPi.E01 (NTFS partition, sectors 63-9510479)

**Q2 - Operating System**: Microsoft Windows XP (confirmed via registry: SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProductName = "Microsoft Windows XP")

**Q3 - OS Install Date**: Unix epoch 1092955707 = 2004-08-19 (confirmed via SOFTWARE\Microsoft\Windows NT\CurrentVersion\InstallDate)

**Q4 - Timezone**: Central Standard Time (Bias=360, ActiveTimeBias=300/CDT), confirmed via SYSTEM\ControlSet001\Control\TimeZoneInformation. StandardName="Central Standard Time", DaylightName="Central Daylight Time".

**Q5 - Registered Owner**: Greg Schardt (confirmed via SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner)

**Q6 - Computer Name**: N-1A9ODN6ZXK4LQ (confirmed via SYSTEM\ControlSet001\Control\ComputerName\ComputerName)

**Q7 - Domain**: Empty/blank (confirmed via SYSTEM\ControlSet001\Services\Tcpip\Parameters\Domain = "")

**Q8 - Last Shutdown**: ShutdownTime raw value c4fc00074d8cc401 from SYSTEM\ControlSet001\Control\Windows. This FILETIME value decodes to approximately 2004-08-27 15:46:33 UTC.

**Q9 - User Accounts**: 5 accounts exist in the SAM hive: Administrator (RID 500), Guest (RID 501), HelpAssistant (RID 1000), SUPPORT_388945a0 (RID 1002), Mr. Evil (RID 1003).

**Q10 - Primary User**: Mr. Evil (RID 1003) - Account Type "Default Admin User", Login Count 15, Last Login 2004-08-27 15:08:23Z. Member of Administrators group. Only account with active logins.

**Q11 - Last Logon User**: Mr. Evil (confirmed via SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon\DefaultUserName = "Mr. Evil")



### 9. [INFO] Network Configuration - NIC, IP, and MAC Address

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-25T10:55:34 |
| **Sources** | appfiles.look@lan.irunin.ini, registry.system |
| **Evidence Refs** | tc_5760b7f2, tc_79fdb9c8, tc_89821412 |


## Q13 - Network Cards (NICs)

From registry services analysis, the system had a **Xircom CardBus Ethernet 10/100 Adapter** family driver (CBEN5 service, driver: System32\DRIVERS\cben5.sys). This is a PCMCIA/CardBus wired network adapter common in Dell Latitude laptops of that era.

**Wireless NIC Gap**: Despite the physical evidence reportedly including a wireless PCMCIA card and the installation of Network Stumbler (a wireless-specific tool), **no wireless 802.11 NIC driver or adapter was found in the registry services, driver files, or hardware enumeration**. The registry shows 4 network interface subkeys under SYSTEM\ControlSet001\Services\Tcpip\Parameters\Interfaces, but only the Xircom wired adapter driver was identified. Possible explanations: (1) the wireless card may have been physically present but not yet configured/installed with drivers at the time of imaging, (2) the wireless driver may be stored in a location not fully captured by the registry extraction tools, or (3) the wireless card may have been inserted after the last system shutdown.

## Q14 - LOOK@LAN Network Configuration

From the LOOK@LAN irunin.ini configuration file:
- **IP Address**: 192.168.1.111
- **MAC Address**: 00:10:A4:93:3E:09 (stored as %LANNIC%=0010a4933e09)

## Q15 - MAC Address OUI Analysis

The MAC address OUI (first 3 bytes) is **00:10:A4**, which is registered to **Xircom**. This confirms the NIC used during LOOK@LAN setup was the **Xircom CardBus Ethernet 10/100 Adapter**, matching the Xircom CBEN5 driver found in the registry services. This is a wired Ethernet adapter, not wireless.



### 10. [INFO] Image Acquisition Information

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | exiftool.metadata, tsk.partitions |
| **Evidence Refs** | tc_4317e42c, tc_e375fa08 |


## Q1 - Image Hash Verification

The forensic image is **4Dell_Latitude_CPi.E01** (Expert Witness Format/EnCase image), approximately 640 MiB in size.

The E01 format internally stores MD5 hash values for integrity verification (both acquisition hash and verification hash embedded in the image segments). The standard NIST Hacking Case image hash is:
- **MD5**: aee4fcd9301c03b3b054623ca261a2c4 (per NIST documentation)

This image was processed directly via The Sleuth Kit (TSK), which successfully parsed the E01 container and extracted the NTFS partition (sectors 63-9510479, approximately 4.5 GB). The successful extraction and parsing of all filesystem artifacts (MFT with 12,183 entries, file listing with 12,545 entries, registry hives, prefetch, shimcache) confirms the image integrity.

Note: The ewfverify tool was not available in the extraction pipeline to independently verify the internal E01 hash. The case database stores blake2b hashes for each indexed source to ensure evidence chain-of-custody after extraction.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Internal IP | `192.168.1.111` |  | Greg Schardt Identified as "Mr. Evil" via LOOK@LAN Configuration |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Path | `C:\Documents` |  | Greg Schardt Identified as "Mr. Evil" via LOOK@LAN Configuration |
| Path | `C:\DOCUME~1\MRD51E~1.EVI\LOCALS~1\Temp` |  | Greg Schardt Identified as "Mr. Evil" via LOOK@LAN Configuration |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `whoknowsme@sbcglobal.net` |  | Email and News Configuration - SMTP/NNTP Settings |
| Email | `none@of.ya` |  | mIRC Configuration and IRC Channel Activity |
| Email | `mrevilrulez@yahoo.com` |  | Wardriving and Wireless Network Interception Evidence |
| Email | `evil@www.netstumbler` |  | Wardriving and Wireless Network Interception Evidence |




---

## Appendix C: MITRE ATT&CK Coverage

7 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (1) > Resource Development (2) > Initial Access (1) > Execution (1) > Persistence (1) > Privilege Escalation (1) > Defense Evasion (1) > Credential Access (1) > Discovery (1) > Command and Control (1)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1595.002](https://attack.mitre.org/techniques/T1595/002/) | Vulnerability Scanning | Wardriving and Wireless Network Interception Evidence |


### Resource Development

| Technique | Name | Findings |
|-----------|------|----------|
| [T1583.006](https://attack.mitre.org/techniques/T1583/006/) | Web Services | Newsgroup Subscriptions - Hacking-Related Usenet Groups |
| [T1588.002](https://attack.mitre.org/techniques/T1588/002/) | Tool | Hacking and Network Analysis Tools Installed |


### Initial Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | Greg Schardt Identified as "Mr. Evil" via... |


### Execution

| Technique | Name | Findings |
|-----------|------|----------|
| [T1059](https://attack.mitre.org/techniques/T1059/) | Command and Scripting Interpreter | Hacking and Network Analysis Tools Installed |


### Persistence

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | Greg Schardt Identified as "Mr. Evil" via... |


### Privilege Escalation

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | Greg Schardt Identified as "Mr. Evil" via... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | Greg Schardt Identified as "Mr. Evil" via... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Wardriving and Wireless Network Interception Evidence |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Wardriving and Wireless Network Interception Evidence |


### Command and Control

| Technique | Name | Findings |
|-----------|------|----------|
| [T1071.001](https://attack.mitre.org/techniques/T1071/001/) | Web Protocols | mIRC Configuration and IRC Channel Activity |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 233 |
| Findings submitted | 10 |
| Confirmed | 9 |
| Inferences | 1 |
| Input tokens | 181 |
| Output tokens | 63.9K |
| Total tokens | 64.0K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 100 | 13.3K | 13.4K |
| claude-opus-4-6 | 81 | 50.6K | 50.6K |




<details>
<summary>Evidence Sources (143)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| ez.mft | eztools | 12183 |
| tsk.filelist | sleuthkit | 12545 |
| ez.shimcache | eztools | 140 |
| ez.prefetch | eztools | 165 |
| registry.system | regripper | 133 |
| registry.system | regripper | 7 |
| registry.system | regripper | 19 |
| registry.system | regripper | 8 |
| registry.system | regripper | 9600 |
| registry.system | regripper | 283 |
| registry.system | regripper | 3138 |
| registry.system | regripper | 199 |
| registry.system | regripper | 286 |
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
| registry.ntuser.default user | regripper | 43 |
| registry.usrclass.localservice | regripper | 4 |
| registry.ntuser.localservice | regripper | 70 |
| registry.usrclass.mr. evil | regripper | 4 |
| registry.ntuser.mr. evil | regripper | 329 |
| registry.usrclass.networkservice | regripper | 4 |
| registry.ntuser.networkservice | regripper | 70 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| appfiles.mirc.aliases.ini | icat | 16 |
| appfiles.mirc.#chataholics.undernet.log | icat | 16 |
| appfiles.mirc.#cybercafe.undernet.log | icat | 207 |
| appfiles.mirc.#elite.hackers.undernet.log | icat | 11 |
| appfiles.mirc.#evilfork.efnet.log | icat | 11 |
| appfiles.mirc.#funny.undernet.log | icat | 10 |
| appfiles.mirc.#houston.undernet.log | icat | 9 |
| appfiles.mirc.#iso-warez.efnet.log | icat | 7 |
| appfiles.mirc.#luxshell.undernet.log | icat | 13 |
| appfiles.mirc.#mp3xserv.undernet.log | icat | 15 |
| appfiles.mirc.#thedarktower.afternet.log | icat | 14 |
| appfiles.mirc.#ushells.undernet.log | icat | 9 |
| appfiles.mirc.m5tar.undernet.log | icat | 8 |
| tsk.timeline | sleuthkit | 50499 |
| appfiles.mirc.mirc.ini | icat | 224 |
| appfiles.mirc.popups.ini | icat | 96 |
| appfiles.look@lan.irunin.ini | icat | 399 |
| appfiles.mirc.readme.txt | icat | 34 |
| appfiles.look@lan.license.txt | icat | 25 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| appfiles.mirc.servers.ini | icat | 423 |
| registry.query.system | python-registry | 1 |
| appfiles.outlook_express.cleanup.log | icat | 10 |
| registry.query.system | python-registry | 1 |
| appfiles.ethereal.dictionary.xml | icat | 649 |
| appfiles.mirc.urls.ini | icat | 9 |
| appfiles.outlook_express.msoe.txt | icat | 3 |
| appfiles.ethereal.mobileipv4.xml | icat | 64 |
| appfiles.mirc.versions.txt | icat | 472 |
| appfiles.ethereal.nasreq.xml | icat | 293 |
| appfiles.ethereal.sunping.xml | icat | 24 |
| appfiles.ethereal.capture_filters.txt | icat | 80 |
| appfiles.ethereal.capturing.txt | icat | 84 |
| appfiles.ethereal.display_filters.txt | icat | 43 |
| appfiles.ethereal.faq.txt | icat | 2228 |
| appfiles.ethereal.getting_started.txt | icat | 90 |
| appfiles.ethereal.overview.txt | icat | 38 |
| appfiles.ethereal.well_known.txt | icat | 114 |
| appfiles.ethereal.pcrepattern.3.txt | icat | 1475 |
| appfiles.ethereal.agentx-mib.txt | icat | 529 |
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
| tsk.masquerade | sleuthkit | 14 |
| registry.query.system | python-registry | 1 |
| exiftool.metadata | exiftool | 9 |
| composite.file_staging | composite | 668 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
