# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-11T12:49:13.375992+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 263 evidence sources (17 disk, 246 other) | 322 tool calls | 36 minutes
**Results:** 6 findings (1 critical, 3 high) | 6 confirmed, 0 inference | 3 hypotheses ruled out
**Timeline:** 2004-08-19 to 2004-08-27

**Key Threats:**
- Wireless Traffic Interception: Victim's Pocket PC HTTP Traffic Captured

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19): System Identification: Greg Schardt Identified as "Mr. Evil" Hacker Account (+2 related)
- **Command and Control** (2004-08-20): Email, Newsgroup, and IRC Communications Infrastructure for Hacking Activities
- **Credential Access** (2004-08-20): Wireless Traffic Interception: Victim's Pocket PC HTTP Traffic Captured

**Tools:** search (175), get_raw_output (37), query_registry_value (22), submit_finding (9), open_case (7). SHA-256 hashes recorded for all evidence.


### Critical Findings


- **Wireless Traffic Interception: Victim's Pocket PC HTTP Traffic Captured** (2004-08-20T15:00:00 to 2004-08-27T15:34:54)




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

322 tool calls were executed across 13
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Forensic Investigation Report: NIST Hacking Case — Dell Latitude CPi Laptop

## Background

This investigation concerns a Dell CPi notebook computer, serial number VLQLW, which was found abandoned on September 20, 2004, along with a wireless PCMCIA card and an external homemade 802.11b antenna. The computer is suspected to have been used for unauthorized hacking activities, including wireless network interception and credential theft. The primary suspect is Greg Schardt, who operates under the online alias "Mr. Evil." Associates have reported that Schardt would park his vehicle within range of Wireless Access Points at locations such as Starbucks and other T-Mobile Hotspots, where he would intercept internet traffic in an attempt to capture credit card numbers, usernames, and passwords.

The forensic image under examination is an EnCase (E01) format acquisition of the abandoned laptop's hard drive, consisting of two segments: 4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02. The disk image contains a single NTFS partition (Volume Serial Number: B26CB1CE6CB18D9B) spanning approximately 9.5 million sectors (approximately 4.87 GB), with the file system version identified as Windows XP. A total of 13 evidence sources were indexed from this image using 322 tool invocations across multiple forensic disciplines including registry analysis (RegRipper, python-registry), filesystem analysis (Sleuth Kit, EZTools MFT and Prefetch parsing), bulk data extraction (bulk_extractor), string extraction, YARA scanning, ClamAV antivirus scanning, and application-specific file analysis. The investigation produced 6 formal findings, of which 6 are confirmed, with 3 negative findings ruling out alternative hypotheses. The findings map to 6 distinct MITRE ATT&CK techniques.

The examined system is a Dell Latitude CPi running Microsoft Windows XP, Version 5.1, Build 2600 (BuildLab: 2600.xpclient.010817-1148). The operating system was installed on August 19, 2004 (Unix epoch timestamp 1092955707, corresponding to 2004-08-19T16:48:27 UTC). The system timezone is set to Central Standard Time (CDT active, UTC-5). The registered owner in the Windows registry is "Greg Schardt," with Product ID 55274-640-0147306-23684. The computer name is N-1A9ODN6ZXK4LQ, and the primary domain is N-1A9ODN6ZXK4LQ (indicating the machine was not joined to an Active Directory domain). The last recorded system shutdown occurred on August 27, 2004 at 15:46:33 UTC.

## Incident Timeline

The activity on the Dell Latitude CPi spans a concentrated nine-day period from August 19 to August 27, 2004. The timeline can be organized into four distinct operational phases.

**Phase 1: System Installation and Initial Configuration (August 19, 2004)**

The Windows XP operating system was installed at approximately 16:48 UTC on August 19, 2004. During this process, the system was registered to "Greg Schardt" with the computer name N-1A9ODN6ZXK4LQ. The "Mr. Evil" user account was created as the first non-default user account (SID S-1-5-21-2000478354-688789844-1708537768-1003, RID 1003). The SAM database shows five total accounts: Administrator (RID 500), Guest (RID 501), HelpAssistant (RID 1000), SUPPORT_388945a0 (RID 1002), and Mr. Evil (RID 1003). Of these, only Mr. Evil shows any login activity, with a total of 15 logins recorded over the investigation period. The NTFS filesystem and device drivers were initialized during this phase, with Xircom CardBus Ethernet and Compaq WL110 Wireless LAN drivers loaded at approximately 17:01-17:02 UTC. The system registry keys for FileSystem and ComputerName were last written at 2004-08-19 17:01:59Z.

**Phase 2: Hacking Toolkit Deployment (August 19-20, 2004)**

Beginning on the evening of August 19 and continuing through August 20, 2004, an extensive collection of hacking tools was installed on the system. Installation media was loaded from a D:\Drivers directory (accessed via the TOSHIBA CD-ROM XM-1902B optical drive mapped to D:\). The tools installed include Ethereal v0.10.6 (packet capture and protocol analysis), Cain v2.5 (password cracking and ARP spoofing), Network Stumbler v0.4.0 (wireless network discovery and wardriving), Look@LAN v2.50 Build 29 (network monitoring and scanning), CuteFTP (file transfer, installed from D:\Drivers\FTP\cute3032.exe), 123 WASP (password recovery, installed from D:\Drivers\Password recovery\), Anonymizer (anonymous browsing, installed from D:\Drivers\Anonyymizer\setup.exe), mIRC v6.12 (Internet Relay Chat client), Forte Agent (newsgroup reader), Faber Toys (system analysis), and Whois (domain reconnaissance).

Additionally, a comprehensive collection of command-line hacking utilities was deployed to the My Documents\COMMANDS directory, including: crack.exe, nmapNT.exe (Nmap network scanner), nc.exe (netcat), pwdump.exe and pwdump2.exe (Windows password dumpers), SAMDUMP.EXE (SAM database extractor), smbgrind.exe (SMB brute-force tool), enum.exe (Windows enumeration), NAT.EXE (NetBIOS Auditing Tool), nbtscan.exe and nbtdump.exe (NetBIOS scanners), ELDUMP.EXE and ELSAVCLR.EXE (event log tools), user2sid.exe and sid2user.exe (SID enumeration), and numerous others. Supporting wordlists for password cracking were placed in the My Documents\DICTIONARIES directory, including a 250MB wordlist archive.

The Outlook Express email client was configured at 2004-08-20T21:14:20Z with SMTP server smtp.sbcglobal.net, POP3 server pop.sbcglobal.net, and the email address whoknowsme@sbcglobal.net with the display name "Mr Evil." An NNTP newsgroup account was configured at 2004-08-20T21:16:43Z using the news server news.dallas.sbcglobal.net with the same email address. The Yahoo web-based email account mrevil2000@yahoo.com was also accessed during this period, with Internet Explorer cache revealing the account registration URL containing the parameters fn=Greg, ln=Schardt, and id=mrevil2000, directly linking the real identity to the hacking persona.

**Phase 3: Active Hacking Operations (August 20-26, 2004)**

During this phase, the suspect engaged in active network reconnaissance, wireless interception, and communications through hacking channels. The wireless traffic interception — the most significant criminal activity documented — produced a packet capture file named "interception" (inode 12264-128-4, located at Documents and Settings/Mr. Evil/interception). This TCPDUMP/pcap format file contains intercepted wireless network traffic from a third-party victim.

Analysis of the captured traffic reveals the victim was using a Windows CE Pocket PC device (User-Agent: Mozilla/4.0 compatible; MSIE 4.01; Windows CE; PPC; 240x320; Intel PXA255 processor) on a 192.168.254.0/24 subnet, with the victim's IP address being 192.168.254.2. The victim was accessing mobile.msn.com (MSN Hotmail mobile web interface) and Passport.com authentication services, including email composition via HTTP POST to composeppc.aspx. The network gateway was identified as 192.168.254.254, a Sercomm router with MAC address 00:C0:02:B9:00:78.

Critically, bulk_extractor ether analysis confirmed Mr. Evil's Xircom NIC MAC address (00:10:A4:93:3E:09) appears as ether_shost (source host) at disk offset 2182312958 within the pcap data, directly proving the capturing machine's NIC was transmitting on the victim's wireless network. The captured traffic is on a completely different subnet (192.168.254.0/24) than Mr. Evil's configured IP (192.168.1.111 on 192.168.1.0/24), confirming this was an external network interception, not activity on the suspect's home network.

The suspect browsed hacking-related websites including wardriving.com, ethereal.com, 2600.org, majorgeeks.com, and netstumbler.com (confirmed by TypedURLs registry entries). An MSN search for the term "hacking" was also cached (http://search.msn.com/results.aspx?FORM=MSNH&q=hacking).

IRC communications via mIRC were active during this phase. The mIRC configuration (mirc.ini) shows the user profile as: User "Mini Me," Email "none@of.ya," Nick "Mr," Alternate Nick "mrevilrulez," Ident userid "Mrevil," connecting to the server losangeles.ca.us.undernet.org on port 6660. Chat logs document access to multiple IRC channels including #Chataholics, #CyberCafe, #Elite.Hackers, #LuxShell, #mp3xserv, #ushells, #houston, and #funny on UnderNet, as well as #evilfork and #iso-warez on EFNet, and #thedarktower on AfterNet. The channels #Elite.Hackers, #LuxShell, and #ushells are specifically associated with hacking activity and shell access trading.

Newsgroup subscriptions through both Outlook Express and Forte Agent covered an extensive set of hacking-related groups: alt.2600, alt.2600.cardz, alt.2600.codez, alt.2600.crackz, alt.2600.hackerz, alt.2600.moderated, alt.2600.phreakz, alt.2600.programz, alt.binaries.hacking.beginner, alt.binaries.hacking.computers, alt.binaries.hacking.utilities, alt.binaries.hacking.websites, alt.dss.hack, alt.hacking, alt.nl.binaries.hack, alt.stupidity.hackers.malicious, free.binaries.hackers.malicious, free.binaries.hacking.beginner, free.binaries.hacking.computers, free.binaries.hacking.utilities, and free.binaries.hacking.websites.

Tool execution continued throughout this phase: Look@LAN was last run 2004-08-26 15:06:14Z (run 2 times), Whois was last run 2004-08-26 15:13:57Z (2 times), telnet.exe was run 2004-08-26 15:05:15Z, and Faber Toys was last run 2004-08-25 15:27:27Z. Look@LAN was installed from the Mr. Evil Desktop on August 25, 2004 (source: lalsetup250.exe), and its irunin.ini configuration captured the critical identity-linking variables at installation time: %REGOWNER%=Greg Schardt, %USERNAME%=Greg Schardt, %LANUSER%=Mr. Evil.

**Phase 4: Final Activity Session (August 27, 2004)**

The last day of recorded activity shows intensive tool usage. Mr. Evil logged in at 15:08:23 UTC (the last recorded logon). The following tools were executed: Network Stumbler at 15:12:35Z, Cain at 15:33:02Z (second execution), and Ethereal at 15:34:54Z (the last tool executed). The system was shut down at 15:46:33 UTC, and the laptop was apparently abandoned shortly thereafter, being found on September 20, 2004.

## Key Findings

**Identity Correlation: Greg Schardt is Mr. Evil**

Three independent sources conclusively establish that Greg Schardt and "Mr. Evil" are the same individual operating this computer. First, the Windows registry RegisteredOwner value is set to "Greg Schardt." Second, the Look@LAN configuration file (Program Files/Look@LAN/irunin.ini) records both %REGOWNER%=Greg Schardt and %LANUSER%=Mr. Evil within the same installation context, along with %LANHOST%=N-1A9ODN6ZXK4LQ, %LANIP%=192.168.1.111, and %LANNIC%=0010a4933e09. Third, the Yahoo account registration URL cached in Internet Explorer (http://edit.yahoo.com/config/id_check?.fn=Greg&.ln=Schardt&.id=mrevil2000) links the real name directly to the mrevil2000 handle. This convergence of evidence from three distinct application contexts — operating system registration, network tool configuration, and web-based email registration — leaves no reasonable doubt about the identity link.

**Wireless Network Traffic Interception**

The most significant finding is the confirmed interception of wireless network traffic from a third-party victim. The "interception" file contains a complete pcap capture showing a Pocket PC user's HTTP sessions on an external wireless network. The presence of Mr. Evil's Xircom NIC MAC address (00:10:A4:93:3E:09) as the ether_shost in the capture, combined with the different subnet (192.168.254.0/24 versus Mr. Evil's home 192.168.1.0/24), proves active wireless surveillance was conducted on someone else's network. The victim's activities — including MSN Hotmail access and Passport authentication — were fully captured, consistent with the reported modus operandi of intercepting credentials at public wireless hotspots.

**Comprehensive Hacking Toolkit**

The system contains a deliberately assembled collection of hacking tools spanning multiple attack categories: network reconnaissance (Nmap, Look@LAN, Whois, nbtscan, enum), wireless attacks (Network Stumbler, Ethereal with WinPcap), credential theft (Cain, pwdump, SAMDUMP, crack.exe, smbgrind with extensive password wordlists), anonymity (Anonymizer), and network exploitation (netcat, telnet). The YARA scan confirmed HackTool_Samples matching samdump.dll within the disk image. All tools were installed and executed under the Mr. Evil user profile.

**Hacking Communications Infrastructure**

The suspect maintained active communications channels within the hacking community through IRC (channels including #Elite.Hackers, #LuxShell, and #ushells), newsgroups (21+ hacking-related subscriptions across the alt.2600 and alt.binaries.hacking hierarchies), and email (whoknowsme@sbcglobal.net via SBCGlobal and mrevil2000@yahoo.com for web-based email). The IRC nickname "mrevilrulez" and ident "Mrevil" further reinforce the deliberate adoption of the hacking persona.

**Recycle Bin Contents**

Four executable files were found in the Recycle Bin under the Mr. Evil SID (S-1-5-21-2000478354-688789844-1708537768-1003): Dc1.exe, Dc2.exe, Dc3.exe, and Dc4.exe. These files carry the 'r/r' (regular/regular allocated) status in the filesystem, meaning they have been moved to the Recycle Bin but not permanently deleted — they remain fully recoverable. The original filenames are stored in the INFO2 database within the same Recycle Bin directory. Across the entire filesystem, approximately 7,038 entries are marked as deleted (indicated by the '*' prefix in The Sleuth Kit output).

**Antivirus Assessment**

The ClamAV scan was performed on the E01 disk image as a single monolithic file and returned an "OK" result for the container. However, as the scan explicitly notes, ClamAV does not open the filesystem inside an image and therefore did not individually scan the files within it. This means no conclusion can be drawn about the presence or absence of malware on individual files. The YARA scan did detect hacking tool signatures (HackTool_Samples matching samdump.dll), which is consistent with the known credential-theft toolkit rather than third-party compromise.

## Threat Intelligence and Attribution

The evidence establishes with high confidence that this computer was operated by Greg Schardt using the alias "Mr. Evil" for the purpose of unauthorized wireless network surveillance and credential interception. The attribution to Greg Schardt rests on three independent, corroborating sources of evidence linking the real name to the "Mr. Evil" account: the Windows RegisteredOwner registry value, the Look@LAN irunin.ini configuration file, and the Yahoo account registration URL cached in Internet Explorer. This multi-source convergence provides a strong basis for attribution.

The suspect's operational profile is consistent with a hobbyist or freelance hacker rather than a state-sponsored threat actor or organized criminal enterprise. Indicators supporting this assessment include: the use of freely available, common hacking tools rather than custom malware or commercial exploitation frameworks; the reliance on public IRC channels and Usenet newsgroups for community engagement rather than private command-and-control infrastructure; the relatively unsophisticated operational security (using real name in OS registration and Yahoo account creation while simultaneously maintaining a hacking persona); and the storage of tools directly on the operating laptop without encryption or concealment.

The MITRE ATT&CK techniques observed include T1588.002 (Obtain Capabilities: Tool), T1046 (Network Service Discovery), T1040 (Network Sniffing), T1110 (Brute Force), T1557 (Adversary-in-the-Middle), and T1070.004 (Indicator Removal: File Deletion). These techniques are consistent with wireless network surveillance and credential harvesting operations.

The negative findings from the investigation are also significant. No evidence was found to support the hypothesis that this was a legitimate security consulting or authorized penetration testing engagement — no contracts, scope documents, statements of work, or professional assessment reports were present on the system. Similarly, no evidence supports a stolen or shared laptop hypothesis — only Mr. Evil shows login activity, all tools were installed under this profile, and no indicators of password resets, new account creation, or profile changes were found.

## Impact Assessment

The confirmed compromise scope includes the interception of at least one victim's wireless network traffic, capturing HTTP sessions including MSN Hotmail access, Passport.com authentication exchanges, and email composition activity. The victim was using a Pocket PC device (Windows CE, Intel PXA255, 240x320 display) on a network with a Sercomm gateway (192.168.254.254). The full extent of interception activity cannot be determined from the single capture file, but the presence of tools like Network Stumbler (for discovering wireless networks), Ethereal with WinPcap (for packet capture), and Cain (for ARP spoofing and password extraction) indicates the capability and intent for broader surveillance operations.

The credential exposure risk is significant. The captured traffic includes Passport.com authentication cookie exchanges and HTTP POST data for email composition, which could contain session tokens, login credentials, or personal information. The extensive password cracking toolkit (including a 250MB wordlist collection, pwdump variants, SAMDUMP, Cain, crack.exe, and smbgrind) indicates that any captured credentials or hashes would likely have been subjected to offline cracking attempts.

The suspect maintained a network of hacking community contacts through IRC channels (particularly #Elite.Hackers, #LuxShell, and #ushells on UnderNet) and hacking newsgroups, creating the potential for intercepted data to have been shared or sold through these channels, although no direct evidence of data exfiltration or sale was found in the examined evidence.

## Immediate Tactical Containment

1. Preserve the physical evidence chain: Maintain custody of the Dell CPi laptop (serial VLQLW), the wireless PCMCIA card, and the external homemade 802.11b antenna in a forensically sound manner.
2. Block the suspect's known network identifiers: MAC address 00:10:A4:93:3E:09 (Xircom CardBus Ethernet NIC) should be added to wireless access point deny lists at any locations the suspect is known to frequent.
3. Disable or monitor the suspect's email accounts: whoknowsme@sbcglobal.net (SMTP/POP3 via sbcglobal.net) and mrevil2000@yahoo.com (Yahoo web mail) should be flagged for investigation with appropriate legal process served on SBC Global and Yahoo.
4. Monitor the suspect's known IRC servers: losangeles.ca.us.undernet.org:6660 (UnderNet), watching for the nicknames "Mr," "mrevilrulez," or ident "Mrevil."
5. Alert the victim: The owner of the Pocket PC device (victim IP 192.168.254.2, victim MAC 00:0F:20:80:47:17) on the Sercomm router network (gateway 192.168.254.254, MAC 00:C0:02:B9:00:78) should be identified and notified that their network traffic was intercepted.
6. Preserve the "interception" pcap file (inode 12264-128-4) and the INFO2 Recycle Bin database for further analysis to identify original filenames of the recycled executables (Dc1.exe through Dc4.exe).
7. Examine the network shares referenced in RecentDocs: "Temp on m1200 (4.12.220.254)" indicates the suspect may have accessed another machine at IP 4.12.220.254, which should be investigated for additional compromise.

## Strategic Remediation

The wireless traffic interception documented in Finding f_2c8fd8c8 succeeded because the victim's Pocket PC was communicating over an unencrypted wireless connection using HTTP (not HTTPS) for email access via mobile.msn.com. The lack of transport-layer encryption allowed complete capture of authentication tokens, email content, and browsing activity. Wireless network operators in public spaces should enforce WPA2/WPA3 encryption and web service providers should mandate HTTPS for all authenticated sessions, particularly mobile email interfaces.

The suspect's ability to discover and join the victim's wireless network, as evidenced by Network Stumbler usage (Finding f_bb402d67, technique T1046) and the subnet mismatch between the suspect's home network (192.168.1.0/24) and the victim's network (192.168.254.0/24), demonstrates the vulnerability of open or poorly secured wireless access points. The Sercomm router at 192.168.254.254 was either operating as an open network or using easily defeated WEP encryption, which allowed the suspect to associate and capture traffic. Public-facing wireless networks should implement client isolation, 802.1X authentication, and intrusion detection for rogue monitoring devices.

The suspect's operational security failure — registering the Windows XP system with his real name (Finding f_d38466b0), using the same real name in Yahoo account registration (Finding f_c2fcdf73), and storing all hacking tools directly on an unencrypted filesystem — provided the evidentiary basis for attribution. This is not a control gap to remediate but rather a forensic advantage to document: the absence of full-disk encryption and the use of consistent real-name registration across platforms enabled conclusive attribution through the Look@LAN irunin.ini file and Yahoo URL cache.

The presence of credential-dumping tools including pwdump, pwdump2, SAMDUMP.EXE, and smbgrind alongside extensive password wordlists (Finding f_bb402d67, techniques T1110 and T1040) indicates that any systems the suspect accessed could have had their credential stores compromised. Organizations whose wireless networks may have been within range of the suspect's operations should audit their SAM databases, rotate passwords, and check event logs for unauthorized access attempts, particularly targeting the IP range 172.16.0.2 identified in the Cerberus Internet Scanner reports found in the ENUMERATION\NT directory.

## Conclusion

This forensic investigation has thoroughly examined the Dell Latitude CPi laptop and produced definitive answers to the core investigative questions while establishing a comprehensive evidence base for potential prosecution.

**Case Questions**

Case Q1: The image hash verification was not directly available in the indexed evidence sources. The E01 image (4Dell_Latitude_CPi.E01 / E02) was processed through multiple forensic tools that successfully parsed the NTFS filesystem and extracted artifacts, confirming image integrity at the functional level. For formal hash verification, the acquisition tool's log or EnCase metadata embedded in the E01 header should be consulted.

Case Q2: Microsoft Windows XP, Version 5.1, Build 2600 (BuildLab: 2600.xpclient.010817-1148).

Case Q3: The install date was August 19, 2004 (InstallDate registry value = 1092955707 Unix epoch, corresponding to 2004-08-19T16:48:27 UTC).

Case Q4: Central Standard Time (CDT active, UTC-5).

Case Q5: The registered owner is "Greg Schardt" (from HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner).

Case Q6: The computer account name is N-1A9ODN6ZXK4LQ.

Case Q7: The primary domain name is N-1A9ODN6ZXK4LQ (the machine was not joined to an Active Directory domain; the domain name matches the computer name).

Case Q8: The last recorded computer shutdown date/time was 2004-08-27 at 15:46:33 UTC (10:46:33 AM CDT).

Case Q9: There are 5 accounts recorded in the SAM database: (1) Administrator (RID 500), (2) Guest (RID 501), (3) HelpAssistant (RID 1000), (4) SUPPORT_388945a0 (RID 1002), and (5) Mr. Evil (RID 1003).

Case Q10: Mr. Evil is the account name of the user who mostly uses the computer. It is the only account with login activity (Login Count: 15).

Case Q11: Mr. Evil was the last user to logon to the computer (Last Login: 2004-08-27 15:08:23 UTC).

Case Q12: The file is "irunin.ini" located at Program Files/Look@LAN/irunin.ini. This file relates to the Look@LAN network monitoring software (version 2.50 Build 29). The file contains both %REGOWNER%=Greg Schardt and %LANUSER%=Mr. Evil, proving that Greg Schardt is Mr. Evil and is the administrator of this computer.

Case Q13: Two network cards were used by this computer: (1) Xircom CardBus Ethernet 100 + Modem 56 (Ethernet adapter, driver: cben5.sys), and (2) Compaq WL110 Wireless LAN PC Card (wireless adapter).

Case Q14: The IP address is 192.168.1.111 and the MAC address is 00:10:A4:93:3E:09 (as recorded in the Look@LAN irunin.ini file: %LANIP%=192.168.1.111, %LANNIC%=0010a4933e09).

Case Q15: The first three hex octets of the MAC address are 00:10:A4, which is the OUI (Organizationally Unique Identifier) registered to Xircom. Therefore, the Xircom CardBus Ethernet 100 + Modem 56 (the wired Ethernet adapter) was the NIC used during the installation and set-up for Look@LAN.

Case Q16: Six installed programs that may be used for hacking: (1) Ethereal v0.10.6 — network packet sniffer/analyzer, (2) Cain v2.5 — password cracker and ARP poisoning tool, (3) Network Stumbler v0.4.0 — wireless network discovery/wardriving tool, (4) Look@LAN v2.50 — network scanner and monitor, (5) nmapNT — network port scanner (in My Documents\COMMANDS), and (6) 123 WASP — password recovery tool. Additional hacking utilities include netcat (nc.exe), pwdump/pwdump2, SAMDUMP, smbgrind, CuteFTP, Anonymizer, and Whois.

Case Q17: The SMTP email address for Mr. Evil is whoknowsme@sbcglobal.net (configured in Outlook Express with SMTP server smtp.sbcglobal.net).

Case Q18: The NNTP (news server) settings for Mr. Evil are: NNTP Server: news.dallas.sbcglobal.net, NNTP Display Name: "Mr Evil," NNTP Email Address: whoknowsme@sbcglobal.net.

Case Q19: The two installed programs that show this information (email and newsgroup settings) are Outlook Express and Forte Agent (both configured with the same SMTP/NNTP credentials).

Case Q20: Five newsgroups that Mr. Evil subscribed to: (1) alt.2600, (2) alt.2600.cardz, (3) alt.2600.codez, (4) alt.2600.crackz, (5) alt.2600.hackerz. Additional subscriptions include alt.2600.moderated, alt.2600.phreakz, alt.binaries.hacking.beginner, alt.binaries.hacking.computers, alt.binaries.hacking.utilities, alt.binaries.hacking.websites, alt.dss.hack, alt.hacking, and many others.

Case Q21: The mIRC user settings displayed when the user was online and in a chat channel were: User: "Mini Me," Email: none@of.ya, Nick: "Mr," Alternate Nick: "mrevilrulez," Ident userid: "Mrevil."

Case Q22: Three IRC channels that the user of this computer accessed: (1) #Chataholics (UnderNet), (2) #CyberCafe (UnderNet), (3) #Elite.Hackers (UnderNet). Additional channels include #LuxShell, #mp3xserv, #ushells, #houston, #funny, #evilfork, #iso-warez, and #thedarktower.

Case Q23: The name of the file that contains the intercepted data is "interception" — located at Documents and Settings/Mr. Evil/interception (inode 12264-128-4). Ethereal's default save directory is the user's My Documents directory, but this file was saved directly in the Mr. Evil user profile root.

Case Q24: The victim was using a Pocket PC — specifically a device running Windows CE Version 4.20 with an Intel PXA255 processor and a 240x320 pixel screen (User-Agent: Mozilla/4.0 (compatible; MSIE 4.01; Windows CE; PPC; 240x320)).

Case Q25: The victim was accessing mobile.msn.com (MSN Hotmail mobile web interface) and Passport.com (Microsoft authentication services, including login/logout and email composition via composeppc.aspx).

Case Q26: The main user's web-based email address is mrevil2000@yahoo.com (discovered via the cached IE URL: http://edit.yahoo.com/config/id_check?.fn=Greg&.ln=Schardt&.id=mrevil2000; also confirmed by the cookie file "mr. evil@yahoo[1].txt").

Case Q27: Yahoo Mail saves copies of emails under the file name "ShowLetter" (cached by Internet Explorer as ShowLetter?MsgId=... files, e.g., http://us.f613.mail.yahoo.com/ym/ShowLetter?MsgId=6284_1110_22_443_55_0_1_-1_0&Idx=0&YY=60138).

Case Q28: There are 4 executable files in the Recycle Bin: Dc1.exe, Dc2.exe, Dc3.exe, and Dc4.exe (all under the RECYCLER/S-1-5-21-2000478354-688789844-1708537768-1003/ directory).

Case Q29: No, these files are not really deleted. They have 'r/r' (regular/regular allocated) status in the filesystem, meaning they have been moved to the Recycle Bin but remain fully allocated and recoverable on disk. They have not been permanently deleted.

Case Q30: Approximately 7,038 files are reported as deleted by the file system (entries marked with the '*' prefix in The Sleuth Kit fls output, indicating unallocated/deleted file entries in the MFT).

Case Q31: The ClamAV antivirus scan was performed on the E01 image as a monolithic file and returned "OK" for the container. However, ClamAV explicitly noted that it does not scan individual files within a disk image. Therefore, no definitive conclusion can be drawn about individual file infections. The YARA scan detected HackTool_Samples matching samdump.dll, which is a known hacking tool (credential dumper) rather than a virus. A proper file-by-file antivirus scan would be needed to comprehensively answer this question, but no traditional viruses were identified by the available scanning methods.

**Investigation Questions Summary**

Q1 (What systems were compromised?): The Dell Latitude CPi laptop itself was configured as a hacking platform. Additionally, at least one external wireless network (gateway 192.168.254.254) was compromised through unauthorized access and traffic interception, affecting at least one victim using a Pocket PC device.

Q2 (How did the attacker gain initial access?): This case involves the attacker's own platform rather than a compromised victim system. The attacker gained access to the victim's wireless network through wardriving techniques using Network Stumbler to discover wireless access points and Ethereal with WinPcap to capture traffic.

Q3 (What lateral movement occurred?): The RecentDocs registry entries reference "Temp on m1200 (4.12.220.254)," suggesting network share access to at least one additional machine. The toolkit includes lateral movement tools (netcat, enum, smbgrind), though direct evidence of their use against specific targets beyond the wireless interception is limited.

Q4 (What persistence mechanisms were installed?): N/A — This is the attacker's own platform rather than a victim system. No persistence mechanisms were needed as the attacker had native administrative access to the laptop.

Q5 (Was data exfiltrated, and if so, what and how much?): The "interception" pcap file constitutes captured (exfiltrated) data from the victim's wireless network, including HTTP sessions, authentication cookies, and email composition data from the victim's MSN Hotmail access on a Pocket PC. The exact volume of intercepted data across all operations cannot be determined from the single capture file.

Q6 (What is the full timeline of the incident?): The activity spans August 19-27, 2004: OS installation (Aug 19), toolkit deployment (Aug 19-20), active hacking operations including wireless interception (Aug 20-26), and final tool usage session ending with system shutdown at 15:46:33 UTC on August 27.

Q7 (What is the total scope and business impact?): One confirmed wireless network was compromised with traffic interception of at least one victim's web sessions and email access. The suspect possessed tools and wordlists capable of broader attacks. The potential for credential theft, identity theft, and financial fraud (credit card interception) is significant given the reported modus operandi.

Q8 (What are the recommended remediation actions?): Preserve all evidence for prosecution. Serve legal process on SBC Global and Yahoo for email account records. Identify and notify the wireless interception victim. Block the suspect's MAC address at known locations. Investigate the remote machine at IP 4.12.220.254 referenced in RecentDocs. Conduct a broader wireless security assessment at T-Mobile Hotspot locations frequented by the suspect.


---

## Overview

| | |
|---|---|
| Findings | **6** (6 confirmed, 0 inference) |
| Severity | 1 critical, 3 high, 1 medium, 0 low, 1 info |
| Sources | 13 evidence sources across 322 tool calls |
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
| 2004-08-19T16:48:27 | System Identification: Greg Schardt Identified as "Mr. Evil" Hacker Account | HIGH | registry.query.software, registry.sam, appfiles.program_files.look@lan.irunin.ini |
| 2004-08-19T23:03:11 | Comprehensive Hacking Toolkit Installed and Executed | HIGH | registry.ntuser.mr. evil, tsk.filelist, yara.files |
| 2004-08-19T23:03:11 | Browser History and Recent Documents Reveal Hacking Research and Network Reconnaissance | MEDIUM | registry.ntuser.mr. evil, tsk.filelist, bulk.url |
| 2004-08-20T10:42:03 | Email, Newsgroup, and IRC Communications Infrastructure for Hacking Activities | HIGH | registry.ntuser.mr. evil, bulk.url, appfiles.program_files.mirc.#cybercafe.undernet.log, appfiles.program_files.mirc.#elite.hackers.undernet.log |
| 2004-08-20T15:00:00 | Wireless Traffic Interception: Victim's Pocket PC HTTP Traffic Captured | CRITICAL | tsk.filelist, bulk.packets, registry.ntuser.mr. evil, bulk.ether, bulk.domain |




---

## Hypotheses Ruled Out

These hypotheses were explicitly tested and no supporting evidence was found.


- **No Evidence of Legitimate Security Consulting or Authorized Penetration Testing** : Counter-hypothesis investigated: Could the hacking toolkit and interception activity represent legitimate security consulting or authorized penetration testing?

Searches conducted:
- "penetration...

- **No Evidence of Stolen Laptop or Third-Party Tool Installation** : Counter-hypothesis investigated: Could someone other than Greg Schardt have installed the hacking tools, e.g., if the laptop was stolen or shared?

Searches and analysis conducted:
- "stolen"...

- **ClamAV Antivirus Scan Did Not Analyze Individual Files Within Disk Image** : Investigation question: Does the anti-virus scan reveal any malware that could suggest the machine was itself compromised by a third party?

Finding: The ClamAV scan was performed on the E01 disk...



---

## Appendix A: Verified Forensic Findings


### 1. [CRITICAL] Wireless Traffic Interception: Victim's Pocket PC HTTP Traffic Captured

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:00:00 to 2004-08-27T15:34:54 |
| **Sources** | tsk.filelist, bulk.packets, registry.ntuser.mr. evil, bulk.ether, bulk.domain |
| **Evidence Refs** | tc_79f5eb8f, tc_3c2f774e, tc_3887a15c, tc_053692a5, tc_063f4deb |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1557](https://attack.mitre.org/techniques/T1557/) |


A packet capture file named "interception" was found at Documents and Settings/Mr. Evil/interception (inode 12264-128-4). This file is in TCPDUMP/pcap format and contains intercepted wireless network traffic from a third-party victim device.

**Victim Device Identification (from captured HTTP headers):**
- User-Agent: Mozilla/4.0 (compatible; MSIE 4.01; Windows CE; PPC; 240x320)
- Operating System: Windows CE Version 4.20 (Pocket PC)
- CPU: Intel PXA255 processor
- Screen resolution: 240x320 pixels
- Victim IP: 192.168.254.2

**Websites accessed by victim:**
- mobile.msn.com (MSN Hotmail mobile web interface)
- Passport.com authentication (login/logout observed)
- HTTP POST to composeppc.aspx (email composition)

**Network infrastructure identified from capture:**
- Gateway: 192.168.254.254 (Sercomm router, MAC 00:c0:02:b9:00:78)
- Victim MAC: 00:0F:20:80:47:17
- UPnP/SSDP multicast traffic from gateway confirming local network presence

**Critical MAC address corroboration (from bulk_extractor ether analysis):**
MAC address 00:10:A4:93:3E:09 (Xircom - Mr. Evil's NIC from Look@LAN irunin.ini) appears as ether_shost (source host) at disk offset 2182312958 within the pcap data. This directly proves the capturing machine's NIC was present and transmitting on the victim's wireless network. The same MAC is independently confirmed as Mr. Evil's NIC in the Look@LAN configuration (%LANNIC%=0010a4933e09).

**Subnet analysis supporting external network interception:**
Mr. Evil's configured IP was 192.168.1.111 (Look@LAN). The captured traffic is on 192.168.254.0/24 - a completely different subnet. IP 192.168.254.3 with subnet mask 255.255.255.0 also appears in the capture data, likely the IP assigned to the attacker's NIC when joining the victim's wireless network. This confirms the capture occurred on an external wireless network, not Mr. Evil's home network.

**Evidence this was a live capture, not a downloaded sample:**
1. Mr. Evil's Xircom MAC appears as ether_shost in the pcap
2. Complete bidirectional TCP sessions with real HTML content from MSN Hotmail
3. UPnP/SSDP broadcast traffic from the local Sercomm gateway
4. Full HTTP POST data for email composition (composeppc.aspx)
5. Passport.com authentication cookie exchanges

This interception was performed using the wireless NIC (Compaq WL110 Wireless LAN PC Card) in conjunction with Ethereal (last run 2004-08-27 15:34:54Z) and WinPcap 3.01a. The presence of Network Stumbler (wardriving tool) indicates active scanning for wireless networks to target.



### 2. [HIGH] System Identification: Greg Schardt Identified as "Mr. Evil" Hacker Account

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T16:48:27 to 2004-08-27T15:46:33 |
| **Sources** | registry.query.software, registry.sam, appfiles.program_files.look@lan.irunin.ini |
| **Evidence Refs** | tc_9f1eb785, tc_cca0062b, tc_0716d7d0 |


The Dell Latitude CPi laptop (image: 4Dell_Latitude_CPi.E01) runs Microsoft Windows XP Version 5.1 Build 2600 (BuildLab: 2600.xpclient.010817-1148), installed on 2004-08-19 (InstallDate=1092955707 Unix epoch). The system is registered to "Greg Schardt" (RegisteredOwner), with ProductId "55274-640-0147306-23684". Computer name: N-1A9ODN6ZXK4LQ. Timezone: Central Standard Time (CDT active, UTC-5). Last shutdown: 2004-08-27T15:46:33Z.

SAM analysis reveals 5 user accounts: Administrator[500], Guest[501], HelpAssistant[1000], SUPPORT_388945a0[1002], and Mr. Evil[1003]. Mr. Evil is the only account with login activity (Login Count: 15, Last Login: 2004-08-27 15:08:23Z), with SID S-1-5-21-2000478354-688789844-1708537768-1003.

The Look@LAN application's irunin.ini file conclusively links the registered owner to the hacker account: %REGOWNER%=Greg Schardt, %USERNAME%=Greg Schardt, %LANUSER%=Mr. Evil, %LANHOST%=N-1A9ODN6ZXK4LQ, %LANIP%=192.168.1.111, %LANNIC%=0010a4933e09 (MAC address 00:10:A4:93:3E:09, registered to Xircom).

Two network interface cards are installed: (1) Xircom CardBus Ethernet 100 + Modem 56 (Ethernet Interface), and (2) Compaq WL110 Wireless LAN PC Card.



### 3. [HIGH] Comprehensive Hacking Toolkit Installed and Executed

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T23:03:11 to 2004-08-27T15:46:00 |
| **Sources** | registry.ntuser.mr. evil, tsk.filelist, yara.files |
| **Evidence Refs** | tc_3887a15c, tc_c1c78c3e, tc_039bf77a, tc_c083569f |
| **ATT&CK** | [T1588.002](https://attack.mitre.org/techniques/T1588/002/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1040](https://attack.mitre.org/techniques/T1040/), [T1110](https://attack.mitre.org/techniques/T1110/) |


UserAssist registry data and filesystem analysis reveal a comprehensive hacking toolkit installed and actively used on the system. The Desktop/Tools folder contains shortcuts to the primary tools.

**Installed & Executed Applications (from UserAssist with timestamps):**
- Ethereal v0.10.6 (packet capture/analysis) - Last run: 2004-08-27 15:34:54Z; WinPcap 3.01a installed same day
- Cain v2.5 (password cracker/ARP spoofer) - Last run: 2004-08-27 15:33:02Z (run 2 times)
- Network Stumbler v0.4.0 (wardriving/wireless network discovery) - Last run: 2004-08-27 15:12:35Z
- mIRC v6.12 (IRC client for hacking channels) - Last run: 2004-08-25 16:20:27Z (3 times)
- Look@LAN v2.50 Build 29 (network scanner) - Last run: 2004-08-26 15:06:14Z (2 times)
- Forte Agent (newsgroup reader for hacking newsgroups) - Last run: 2004-08-25 15:55:34Z (2 times)
- 123 WASP (password recovery tool) - Installed from D:\Drivers\Password recovery\
- Whois (domain reconnaissance) - Last run: 2004-08-26 15:13:57Z (2 times)
- CuteFTP (file transfer) - Installed from D:\Drivers\FTP\cute3032.exe
- Anonymizer (anonymous browsing) - Installed from D:\Drivers\Anonyymizer\setup.exe
- Faber Toys (system analysis) - Last run: 2004-08-25 15:27:27Z
- telnet.exe - Run: 2004-08-26 15:05:15Z

**My Documents/COMMANDS Folder (hacking utilities collection):**
crack.exe, nmapNT.exe, nc.exe (netcat), pwdump.exe, pwdump2.exe, SAMDUMP.EXE, smbgrind.exe, enum.exe, NAT.EXE, nbtscan.exe, nbtdump.exe, ELDUMP.EXE, ELSAVCLR.EXE, ELSAVE.EXE, user2sid.exe, sid2user.exe, snitch.exe, webscan.exe, winfo.exe, NETVIEWX.EXE, epdump.exe, getpolicy.exe, STREAMFIND.EXE, setowner.exe, GrindUI.exe, gsd.exe.
Supporting wordlists: NTpasslist.txt, NTuserlist.txt, PASSLIST.TXT.

**My Documents/DICTIONARIES Folder (password cracking wordlists):**
250MB_WORDLIST.ZIP, biglist_990218.zip, pocket-dic.gz, Unix_dict.gz, words-english.gz.

**My Documents/ENUMERATION/NT Folder:**
Cerberus Internet Scanner with scan reports targeting IP 172.16.0.2.

YARA rule "HackTool_Samples" matched samdump.dll within the disk image.



### 4. [HIGH] Email, Newsgroup, and IRC Communications Infrastructure for Hacking Activities

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:42:03 to 2004-08-27T15:42:40 |
| **Sources** | registry.ntuser.mr. evil, bulk.url, appfiles.program_files.mirc.#cybercafe.undernet.log, appfiles.program_files.mirc.#elite.hackers.undernet.log |
| **Evidence Refs** | tc_df46a20d, tc_c5804d0c, tc_047109c9, tc_5a46b85f, tc_7a7393e2 |


Multiple communication channels were configured and actively used for hacking-related activities:

**Email Configuration (Outlook Express - Account 00000001):**
- SMTP Server: smtp.sbcglobal.net
- POP3 Server: pop.sbcglobal.net
- Email Address: whoknowsme@sbcglobal.net
- Display Name: "Mr Evil"
- POP3 User: whoknowsme@sbcglobal.net
- Last configured: 2004-08-20T21:14:20Z

**Yahoo Web-Based Email:**
- Account: mrevil2000@yahoo.com (discovered via IE cache URL: http://edit.yahoo.com/config/id_check?.fn=Greg&.ln=Schardt&.id=mrevil2000)
- First Name: Greg, Last Name: Schardt (confirming real identity)
- Yahoo Mail used via us.f613.mail.yahoo.com
- Cached pages include ShowLetter (email viewing page)
- Cookie: mr. evil@yahoo[1].txt

**NNTP/Newsgroup Configuration (Account 00000002):**
- NNTP Server: news.dallas.sbcglobal.net
- Display Name: "Mr Evil"
- NNTP Email: whoknowsme@sbcglobal.net
- Two newsgroup readers: Outlook Express and Forte Agent
- Last configured: 2004-08-20T21:16:43Z

**Hacking-Related Newsgroup Subscriptions (Outlook Express .dbx files):**
alt.2600, alt.2600.cardz, alt.2600.codez, alt.2600.crackz, alt.2600.hackerz, alt.2600.moderated, alt.2600.phreakz, alt.2600.programz, alt.binaries.hacking.beginner, alt.binaries.hacking.computers, alt.binaries.hacking.utilities, alt.binaries.hacking.websites, alt.dss.hack, alt.hacking, alt.nl.binaries.hack, alt.stupidity.hackers.malicious, free.binaries.hackers.malicious, free.binaries.hacking.beginner, free.binaries.hacking.computers, free.binaries.hacking.utilities, free.binaries.hacking.websites

**IRC Configuration (mIRC v6.12 - mirc.ini):**
- User: "Mini Me", Email: none@of.ya
- Nick: Mr, Alternate Nick: mrevilrulez
- Ident userid: Mrevil
- Server: losangeles.ca.us.undernet.org:6660

**IRC Channels Accessed (from mIRC chat logs):**
#Chataholics (UnderNet), #CyberCafe (UnderNet), #Elite.Hackers (UnderNet), #LuxShell (UnderNet), #mp3xserv (UnderNet), #ushells (UnderNet), #houston (UnderNet), #funny (UnderNet), #evilfork (EFNet), #iso-warez (EFNet), #thedarktower (AfterNet), plus private message from m5tar.

Notable channels: #Elite.Hackers, #LuxShell, and #ushells are associated with hacking/shell access trading.



### 5. [MEDIUM] Browser History and Recent Documents Reveal Hacking Research and Network Reconnaissance

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T23:03:11 to 2004-08-27T15:42:40 |
| **Sources** | registry.ntuser.mr. evil, tsk.filelist, bulk.url |
| **Evidence Refs** | tc_3887a15c, tc_31d3a343, tc_047109c9 |


The suspect's browsing history and recent documents provide additional evidence of hacking intent and reconnaissance activity.

**TypedURLs (manually typed in Internet Explorer):**
URLs revealing hacking research: wardriving.com, ethereal.com, 2600.org, majorgeeks.com, maktoob.com, drudgereport.com, yahoo.com.

**MSN Search History (from IE cache):**
The suspect searched for "hacking" on search.msn.com: http://search.msn.com/results.aspx?FORM=MSNH&q=hacking

**RecentDocs (recently accessed files/folders):**
- "Temp on m1200 (4.12.220.254)" - network share on a remote machine
- "channels" folder and "channels.txt" - likely IRC channel configuration
- "GhostWare" folder - potentially ghosting/disk imaging software
- "Anonyymizer" folder - anonymizer tools
- "keys.txt" - possibly captured keys or credentials
- "Receipt.rtf" - purchase receipt
- "yng13.bmp" - bitmap image

**Cookies analysis shows visits to:**
yahoo.com, maktoob.com, drudgereport.com, google.com, cnn.com, netstumbler.com, msn.com, and various ad networks.

The visit to www.netstumbler.com and wardriving.com confirms interest in wireless network scanning and wardriving, consistent with the Network Stumbler installation and the "interception" capture file.



### 6. [INFO] Recycle Bin Contains Four Executable Files Under Suspect's SID

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_3b2a6f16, tc_3505cbea |
| **ATT&CK** | [T1070.004](https://attack.mitre.org/techniques/T1070/004/) |


The RECYCLER directory contains files under the Mr. Evil user account's SID (S-1-5-21-2000478354-688789844-1708537768-1003):

- RECYCLER/S-1-5-21-2000478354-688789844-1708537768-1003/Dc1.exe (inode 11692-128-4)
- RECYCLER/S-1-5-21-2000478354-688789844-1708537768-1003/Dc2.exe (inode 11996-128-4)
- RECYCLER/S-1-5-21-2000478354-688789844-1708537768-1003/Dc3.exe (inode 12033-128-4)
- RECYCLER/S-1-5-21-2000478354-688789844-1708537768-1003/Dc4.exe (inode 12041-128-4)
- RECYCLER/S-1-5-21-2000478354-688789844-1708537768-1003/desktop.ini (inode 11814-128-1)
- RECYCLER/S-1-5-21-2000478354-688789844-1708537768-1003/INFO2 (inode 11850-128-3)

All four executable files have 'r/r' (regular/regular allocated) status in the filesystem listing, meaning they have NOT been permanently deleted from the filesystem. They are in the Windows Recycle Bin but are still recoverable and allocated on disk. This is significant because the Recycle Bin naming convention (Dc1.exe through Dc4.exe) is the standard Windows XP format where the original filename is stored in the INFO2 database.

The total deleted file count across the entire filesystem is approximately 7,038 entries (files marked with '*' prefix in TSK output).



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Internal IP | `192.168.1.111` |  | System Identification: Greg Schardt Identified as "Mr. Evil" Hacker Account |
| Internal IP | `172.16.0.2` |  | Comprehensive Hacking Toolkit Installed and Executed |
| Internal IP | `192.168.254.2` |  | Wireless Traffic Interception: Victim's Pocket PC HTTP Traffic Captured |
| Internal IP | `192.168.254.254` |  | Wireless Traffic Interception: Victim's Pocket PC HTTP Traffic Captured |
| Internal IP | `192.168.254.0` |  | Wireless Traffic Interception: Victim's Pocket PC HTTP Traffic Captured |
| Internal IP | `192.168.254.3` |  | Wireless Traffic Interception: Victim's Pocket PC HTTP Traffic Captured |
| External IP | `4.12.220.254` |  | Browser History and Recent Documents Reveal Hacking Research and Network Reconna |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `whoknowsme@sbcglobal.net` |  | Email, Newsgroup, and IRC Communications Infrastructure for Hacking Activities |
| Email | `mrevil2000@yahoo.com` |  | Email, Newsgroup, and IRC Communications Infrastructure for Hacking Activities |
| Email | `none@of.ya` |  | Email, Newsgroup, and IRC Communications Infrastructure for Hacking Activities |




---

## Appendix C: MITRE ATT&CK Coverage

6 techniques identified across findings.


**Kill Chain Coverage:** Resource Development (1) > Defense Evasion (1) > Credential Access (3) > Discovery (2) > Collection (1)


### Resource Development

| Technique | Name | Findings |
|-----------|------|----------|
| [T1588.002](https://attack.mitre.org/techniques/T1588/002/) | Tool | Comprehensive Hacking Toolkit Installed and Executed |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1070.004](https://attack.mitre.org/techniques/T1070/004/) | File Deletion | Recycle Bin Contains Four Executable Files... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Comprehensive Hacking Toolkit Installed and Executed; Wireless Traffic Interception: Victim's Pocket... |
| [T1110](https://attack.mitre.org/techniques/T1110/) | Brute Force | Comprehensive Hacking Toolkit Installed and Executed |
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Wireless Traffic Interception: Victim's Pocket... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Comprehensive Hacking Toolkit Installed and Executed; Wireless Traffic Interception: Victim's Pocket... |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Comprehensive Hacking Toolkit Installed and Executed |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Wireless Traffic Interception: Victim's Pocket... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 322 |
| Findings submitted | 6 |
| Confirmed | 6 |
| Inferences | 0 |
| Input tokens | 6.8K |
| Output tokens | 87.8K |
| Total tokens | 94.6K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 124 | 13.2K | 13.4K |
| claude-opus-4-6 | 6.7K | 74.5K | 81.3K |




<details>
<summary>Evidence Sources (263)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.fsstat | sleuthkit | 39 |
| tsk.filelist | sleuthkit | 12545 |
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
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.mirc.aliases.ini | icat | 16 |
| appfiles.program_files.ethereal.dictionary.xml | icat | 649 |
| appfiles.program_files.look@lan.irunin.ini | icat | 399 |
| appfiles.documents_and_settings.sharedaccess.ini | icat | 52 |
| appfiles.program_files.ethereal.mobileipv4.xml | icat | 64 |
| appfiles.program_files.mirc.#chataholics.undernet.log | icat | 16 |
| appfiles.program_files.look@lan.license.txt | icat | 25 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.nasreq.xml | icat | 293 |
| appfiles.program_files.mirc.#cybercafe.undernet.log | icat | 207 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| ez.mft | eztools | 12183 |
| appfiles.program_files.ethereal.sunping.xml | icat | 24 |
| appfiles.program_files.mirc.#elite.hackers.undernet.log | icat | 11 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.capture_filters.txt | icat | 80 |
| appfiles.program_files.mirc.#evilfork.efnet.log | icat | 11 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| appfiles.program_files.ethereal.capturing.txt | icat | 84 |
| appfiles.program_files.mirc.#funny.undernet.log | icat | 10 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.display_filters.txt | icat | 43 |
| appfiles.program_files.mirc.#houston.undernet.log | icat | 9 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| appfiles.program_files.ethereal.faq.txt | icat | 2228 |
| appfiles.program_files.mirc.#iso-warez.efnet.log | icat | 7 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.getting_started.txt | icat | 90 |
| appfiles.program_files.mirc.#luxshell.undernet.log | icat | 13 |
| appfiles.documents_and_settings.desktop.ini | icat | 10 |
| appfiles.program_files.ethereal.overview.txt | icat | 38 |
| appfiles.program_files.mirc.#mp3xserv.undernet.log | icat | 15 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| appfiles.program_files.ethereal.well_known.txt | icat | 114 |
| appfiles.program_files.mirc.#thedarktower.afternet.log | icat | 14 |
| appfiles.documents_and_settings.desktop.ini | icat | 6 |
| appfiles.program_files.ethereal.pcrepattern.3.txt | icat | 1475 |
| appfiles.program_files.mirc.#ushells.undernet.log | icat | 9 |
| appfiles.documents_and_settings.desktop.ini | icat | 14 |
| appfiles.program_files.ethereal.agentx-mib.txt | icat | 529 |
| appfiles.program_files.mirc.m5tar.undernet.log | icat | 8 |
| appfiles.documents_and_settings.desktop.ini | icat | 12 |
| appfiles.program_files.ethereal.disman-event-mib.txt | icat | 1957 |
| appfiles.program_files.mirc.mirc.ini | icat | 224 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.disman-schedule-mib.txt | icat | 701 |
| appfiles.program_files.mirc.popups.ini | icat | 96 |
| appfiles.documents_and_settings.desktop.ini | icat | 16 |
| appfiles.program_files.ethereal.disman-script-mib.txt | icat | 1766 |
| appfiles.program_files.mirc.readme.txt | icat | 34 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| ez.shimcache | eztools | 140 |
| appfiles.program_files.ethereal.etherlike-mib.txt | icat | 1139 |
| appfiles.program_files.mirc.servers.ini | icat | 423 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.hcnum-tc.txt | icat | 120 |
| appfiles.program_files.mirc.urls.ini | icat | 9 |
| appfiles.documents_and_settings.brndlog.txt | icat | 5 |
| appfiles.program_files.ethereal.host-resources-mib.txt | icat | 1542 |
| registry.default | regripper | 427 |
| appfiles.program_files.mirc.versions.txt | icat | 472 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.host-resources-types.txt | icat | 391 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.program_files.ethereal.iana-address-family-numbers-mib.txt | icat | 123 |
| ez.prefetch | eztools | 165 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.program_files.ethereal.iana-language-mib.txt | icat | 125 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.ianaiftype-mib.txt | icat | 392 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.if-inverted-stack-mib.txt | icat | 151 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.if-mib.txt | icat | 1816 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.inet-address-mib.txt | icat | 300 |
| registry.sam | regripper | 133 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.ip-forward-mib.txt | icat | 811 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.ip-mib.txt | icat | 722 |
| appfiles.documents_and_settings.desktop.ini | icat | 6 |
| appfiles.program_files.ethereal.ipv6-icmp-mib.txt | icat | 531 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| registry.sam | regripper | 7 |
| appfiles.program_files.ethereal.ipv6-mib.txt | icat | 1445 |
| appfiles.documents_and_settings.desktop.ini | icat | 9 |
| appfiles.program_files.ethereal.ipv6-tc.txt | icat | 69 |
| appfiles.documents_and_settings.desktop.ini | icat | 11 |
| appfiles.program_files.ethereal.ipv6-tcp-mib.txt | icat | 213 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.ipv6-udp-mib.txt | icat | 143 |
| appfiles.documents_and_settings.desktop.ini | icat | 7 |
| registry.system | regripper | 19 |
| appfiles.program_files.ethereal.lm-sensors-mib.txt | icat | 232 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.mta-mib.txt | icat | 1228 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.net-snmp-agent-mib.txt | icat | 546 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.program_files.ethereal.net-snmp-examples-mib.txt | icat | 229 |
| registry.system | regripper | 8 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.program_files.ethereal.net-snmp-mib.txt | icat | 69 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
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
| appfiles.program_files.ethereal.rfc1155-smi.txt | icat | 121 |
| appfiles.documents_and_settings.desktop.ini | icat | 4 |
| appfiles.program_files.ethereal.rfc1213-mib.txt | icat | 2615 |
| appfiles.documents_and_settings.brndlog.txt | icat | 217 |
| appfiles.program_files.ethereal.rmon-mib.txt | icat | 3982 |
| appfiles.documents_and_settings.desktop.ini | icat | 5 |
| appfiles.program_files.ethereal.smux-mib.txt | icat | 162 |
| appfiles.documents_and_settings.mr._evil@www.drudgereport[1].txt | icat | 11 |
| appfiles.program_files.ethereal.snmp-community-mib.txt | icat | 431 |
| appfiles.documents_and_settings.mr._evil@advertising[2].txt | icat | 29 |
| appfiles.program_files.ethereal.snmp-framework-mib.txt | icat | 528 |
| appfiles.documents_and_settings.mr._evil@atdmt[2].txt | icat | 11 |
| appfiles.program_files.ethereal.snmp-mpd-mib.txt | icat | 147 |
| appfiles.documents_and_settings.mr._evil@atwola[2].txt | icat | 11 |
| appfiles.program_files.ethereal.snmp-proxy-mib.txt | icat | 296 |
| appfiles.documents_and_settings.mr._evil@centrport[1].txt | icat | 11 |
| appfiles.program_files.ethereal.snmp-target-mib.txt | icat | 662 |
| appfiles.documents_and_settings.mr._evil@cnn[1].txt | icat | 11 |
| registry.software | regripper | 9600 |
| appfiles.program_files.ethereal.snmp-user-based-sm-mib.txt | icat | 914 |
| appfiles.documents_and_settings.mr._evil@doubleclick[1].txt | icat | 11 |
| appfiles.program_files.ethereal.snmp-view-based-acm-mib.txt | icat | 832 |
| appfiles.documents_and_settings.mr._evil@fastclick[1].txt | icat | 29 |
| appfiles.program_files.ethereal.snmpv2-conf.txt | icat | 324 |
| appfiles.documents_and_settings.mr._evil@google[1].txt | icat | 11 |
| appfiles.program_files.ethereal.snmpv2-mib.txt | icat | 856 |
| registry.software | regripper | 283 |
| appfiles.documents_and_settings.mr._evil@list[1].txt | icat | 11 |
| appfiles.program_files.ethereal.snmpv2-smi.txt | icat | 346 |
| strings.output | strings | 187581 |
| appfiles.documents_and_settings.mr._evil@maktoob[1].txt | icat | 11 |
| registry.software | regripper | 1161 |
| appfiles.program_files.ethereal.snmpv2-tc.txt | icat | 774 |
| appfiles.documents_and_settings.mr._evil@microsoft[1].txt | icat | 11 |
| appfiles.program_files.ethereal.snmpv2-tm.txt | icat | 178 |
| appfiles.documents_and_settings.mr._evil@msn[2].txt | icat | 56 |
| appfiles.program_files.ethereal.tcp-mib.txt | icat | 332 |
| appfiles.documents_and_settings.mr._evil@revenue[2].txt | icat | 11 |
| appfiles.program_files.ethereal.tunnel-mib.txt | icat | 339 |
| appfiles.documents_and_settings.mr._evil@search.msn[1].txt | icat | 29 |
| appfiles.program_files.ethereal.ucd-demo-mib.txt | icat | 76 |
| appfiles.documents_and_settings.mr._evil@servedby.advertising[2].txt | icat | 20 |
| appfiles.program_files.ethereal.ucd-diskio-mib.txt | icat | 119 |
| appfiles.documents_and_settings.mr._evil@sj9[1].txt | icat | 11 |
| appfiles.program_files.ethereal.ucd-dlmod-mib.txt | icat | 121 |
| registry.system | regripper | 3138 |
| appfiles.documents_and_settings.mr._evil@tribalfusion[1].txt | icat | 38 |
| appfiles.program_files.ethereal.ucd-ipfilter-mib.txt | icat | 258 |
| appfiles.documents_and_settings.mr._evil@www.cnn[1].txt | icat | 11 |
| appfiles.program_files.ethereal.ucd-ipfwacc-mib.txt | icat | 329 |
| appfiles.documents_and_settings.mr._evil@www.maktoob[2].txt | icat | 11 |
| appfiles.program_files.ethereal.ucd-snmp-mib-old.txt | icat | 746 |
| appfiles.documents_and_settings.mr._evil@www.netstumbler[2].txt | icat | 11 |
| registry.system | regripper | 199 |
| appfiles.program_files.ethereal.ucd-snmp-mib.txt | icat | 1384 |
| appfiles.documents_and_settings.mr._evil@yahoo[1].txt | icat | 29 |
| appfiles.program_files.ethereal.udp-mib.txt | icat | 148 |
| appfiles.documents_and_settings.mr[1].txt | icat | 11 |
| appfiles.program_files.ethereal.snmp-notification-mib.txt | icat | 591 |
| appfiles.documents_and_settings.mr[2].txt | icat | 38 |
| registry.system | regripper | 286 |
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
| clamav.scan | clamav | 2 |
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
| yara.files | yara | 3 |
| registry.ntuser.default user | regripper | 43 |
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
| registry.query.software | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.ntuser.Mr. Evil | python-registry | 1 |
| registry.query.ntuser.Mr. Evil | python-registry | 1 |
| registry.query.ntuser.Mr. Evil | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.ntuser.Mr. Evil | python-registry | 1 |
| registry.query.ntuser.Mr. Evil | python-registry | 1 |
| composite.file_staging | composite | 668 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
