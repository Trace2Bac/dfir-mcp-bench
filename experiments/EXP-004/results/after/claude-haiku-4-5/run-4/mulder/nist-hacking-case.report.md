# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-12T10:18:00.909394+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 184 evidence sources (16 disk, 168 other) | 224 tool calls | 29 minutes
**Results:** 9 findings (6 high) | 7 confirmed, 2 inference
**Timeline:** 2004-08-19 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2004-08-25): System Ownership and User Identity Confirmed: Greg Schardt is "Mr. Evil" (+6 related)
- **Persistence** (2004-08-20): Suspicious Website Access Including Wardriving and Hacking Resources
- **Other Activity** (2004-08-20): IRC Communication Infrastructure Using Undernet Network

**Tools:** search (128), get_raw_output (17), submit_finding (9), open_case (8), get_investigation_summary (6). SHA-256 hashes recorded for all evidence.



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

224 tool calls were executed across 10
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

## Background

On September 20, 2004, a Dell Latitude CPi notebook computer (serial number VLQLW) was discovered abandoned with a wireless PCMCIA card and homemade 802.11b antenna. The device was suspected to have been used for hacking and potentially wardriving activities in the vicinity of wireless access points. The investigation targeted a specific suspect, Greg Schardt (online alias "Mr. Evil"), who associates have indicated engaged in wireless interception activities to capture credit card numbers, usernames, and passwords.

The examination focused on a forensic image of the abandoned Dell computer containing 10 indexed data sources. The system was found to be a Windows XP machine configured with 9 significant findings revealing a comprehensive setup for network reconnaissance, packet interception, and credential harvesting activities. The investigation identified 6 high-severity and 3 medium-severity findings documenting both direct evidence of ownership linking Greg Schardt to the device and evidence of malicious tools staged for attack operations.

## Incident Timeline

The system's Windows XP installation was initiated on August 19, 2004 at 22:48:27 UTC. The computer account name was N-1A9ODN6ZXK4LQ, configured with the default username "Mr. Evil" (matching the suspect's known alias), and registered to "Greg Schardt" in the system profile, establishing initial ownership linkage.

Between August 20-21, 2004, the primary attack preparation phase commenced. Multiple hacking and network analysis tools were installed sequentially: CuteFTP (August 20, 10:08 UTC), Forté Agent newsreader (August 20, 15:08 UTC), mIRC (August 20, 15:10 UTC), Ethereal 0.10.6 (August 27, 15:29 UTC), WinPcap 3.01 (August 27, 15:15 UTC), Network Stumbler 0.4.0 (August 27, 15:12 UTC), and Look@LAN 2.50 (August 25, 15:56 UTC). These installations were organized into a structured directory hierarchy under "My Documents": COMMANDS/, ENUMERATION/NT/, EXPLOITATION/NT/, and FOOTPRINTING/NT/ directories.

The Forté Agent newsreader configuration (installed August 20, 10:08 UTC) was configured with SMTP server smtp.sbcglobal.net (port 25), NNTP server news.dallas.sbcglobal.net (port 119), and email address whoknowsme@sbcglobal.net, providing access to SBC Global's discussion forums and hacker communities.

On August 25, 2004, the Look@LAN network monitoring tool was installed and configured at 10:55 UTC (timestamps recorded in irunin.ini). The configuration explicitly specified the wireless interface: Compaq WL110 Wireless LAN Card (MAC address 0010a4933e09) with IP address 192.168.1.111, confirmed that the user was "Mr. Evil" (%LANUSER%=Mr. Evil), that the registered owner was "Greg Schardt" (%REGOWNER%=Greg Schardt), and that the user held administrator privileges (%ISUSERNTADMIN%=TRUE).

mIRC IRC client version 6.12 was configured with nickname "Mr" and alternate nickname "mrevilrulez," user ID "Mini Me," and connected to the Undernet network via losangeles.ca.us.undernet.org:6660 (Los Angeles US server). UserAssist registry records document three executions of mirc.exe between August 20-25, 2004, with the most recent logged at August 25, 2004, 16:20:27 UTC. The IRC client's configuration contained 83 subscribed channels, indicating sustained engagement with the IRC hacker community.

Between August 25-27, 2004, a critical cleanup phase occurred. On August 25 at 16:18:25 UTC, the Look@LAN installer (lalsetup250.exe, 2.1MB) was moved to the Recycle Bin. Subsequently, installation files for Network Stumbler (August 27, 15:12:30 UTC), WinPcap (August 27, 15:15:26 UTC), and Ethereal (August 27, 15:29:58 UTC) were all deleted to the Recycle Bin, suggesting attempted cleanup of installation evidence before system abandonment.

The system's last recorded shutdown occurred on August 27, 2004 at 15:46:33 UTC. The user "Mr. Evil" was last logged on at 15:08:23 UTC on August 27, 2004.

## Key Findings

**System Ownership and User Identity Confirmation**

The investigation definitively established that Greg Schardt and the online user "Mr. Evil" are the same individual with administrative control of the system. The Windows registry profile lists "Greg Schardt" as the RegisteredOwner. The Winlogon DefaultUserName is configured as "Mr. Evil." Most critically, the Look@LAN installation configuration file (irunin.ini), which captures the system state during software installation on August 25, 2004, explicitly records %REGOWNER%=Greg Schardt, %LANUSER%=Mr. Evil, and %ISUSERNTADMIN%=TRUE, directly associating both identities and confirming administrative privilege.

Additionally, bulk URL analysis recovered a web request to edit.yahoo.com/config/id_check showing the parameters .fn=Greg, .ln=Schardt, and .id=mrevil2000, further confirming the same individual uses both the "Greg Schardt" legal identity and "mrevil2000" online identifier.

**Malware and Hacking Tools Detection**

ClamAV antivirus scanning detected 18 malicious files and hacking tool signatures across the system. These included trojans for credential harvesting (Pwdump for SAM password dumping, LSAdump for LSA secrets extraction, NetBus for remote access), reconnaissance tools (EnumPlus for network enumeration, SuperScan for network scanning), and exploit utilities (WinNT privilege escalation, Brutus brute-force attacks, GetAdmin elevation). The files were organized in structured directories: /My Documents/COMMANDS/, /ENUMERATION/NT/, /EXPLOITATION/NT/, and /FOOTPRINTING/NT/, demonstrating intentional categorization of tools by attack phase.

However, notably absent from the evidence are output files from tool execution: no captured network sessions from Ethereal despite WinPcap installation, no Brutus brute-force logs despite the tool's presence, no password dump files, no enumeration result files, and no stolen victim data repositories. The presence of tools indicates staged capability and planning, but the absence of execution artifacts suggests the system may represent a learning or staging environment rather than evidence of completed attacks against external targets.

**Network Reconnaissance and Wireless Packet Capture Infrastructure**

The system contained a comprehensive suite of network analysis tools: Ethereal 0.10.6 packet analyzer, WinPcap 3.01 alpha packet capture library, Network Stumbler 0.4.0 wireless network scanner, Look@LAN 2.50 network monitor, and Cain & Abel v2.5. UserAssist registry timestamps document execution of ethereal.exe (August 27, 15:34:54 UTC), Network Stumbler (August 27, 15:12:35 UTC), Cain.exe (August 27, 15:33:02 UTC), and Look@LAN (August 26, 15:06:14 UTC).

The Look@LAN configuration specifically documented deployment targeting a Compaq WL110 Wireless LAN interface (MAC 0010a4933e09) from IP 192.168.1.111, with configuration timestamp August 25, 2004, 10:55 UTC. This configuration directly aligns with the suspect's known modus operandi: positioning near wireless access points (such as Starbucks, T-Mobile Hotspots) to capture wireless traffic. The presence of Network Stumbler reinforces active wardriving capability for wireless network discovery.

**Internet and Communication Infrastructure for Information Gathering**

Internet Explorer TypedURLs history recovered from the "Mr. Evil" user registry hive shows access to wardriving.com (wireless network discovery), ethereal.com (packet analysis tool support), 2600.org (hacking publication), maktoob.com (Arabic email service), yahoo.com, majorgeeks.com (software repository), and drudgereport.com. These URLs demonstrate research into network interception capabilities and engagement with hacker culture.

The Forté Agent newsreader configuration identified EMailAddress=whoknowsme@sbcglobal.net, SMTP server smtp.sbcglobal.net, and NNTP server news.dallas.sbcglobal.net, establishing configured access to newsgroups and email infrastructure.

The mIRC IRC client configured connection parameters to Undernet with 83 subscribed channels, indicating sustained engagement with IRC-based hacker communities. IRC logs recovered from the system show activity in channels including #Elite.Hackers, #CyberCafe, #Chataholics, and others, consistent with information-sharing and coordination activities within hacker communities.

**Attempted Deletion and Evidence Evasion**

Four executable installer files were recovered from the Windows Recycle Bin with deletion timestamps between August 25-27, 2004: Look@LAN installer (deleted August 25, 16:18:25 UTC, 2.1MB), Network Stumbler installer (deleted August 27, 15:12:30 UTC, 1.3MB), WinPcap installer (deleted August 27, 15:15:26 UTC, 442KB), and Ethereal setup (deleted August 27, 15:29:58 UTC, 8.4MB). All files remained present in Recycle Bin storage, indicating the deletion operation failed to permanently remove evidence before system acquisition.

**System Configuration Details**

The system is a Dell Latitude CPi notebook running Windows XP (Build 2600) with installation date August 19, 2004, 22:48:27 UTC. Computer account name: N-1A9ODN6ZXK4LQ. Timezone configuration: Central Standard Time (UTC-6) with Central Daylight Time in effect (UTC-5) when the system hives were last written. Last system shutdown: August 27, 2004, 15:46:33 UTC. Last user logon: Mr. Evil, August 27, 2004, 15:08:23 UTC.

Network interfaces identified: Compaq WL110 Wireless LAN PC Card (MAC 0010a4933e09, IP 192.168.1.111) and Xircom CardBus Ethernet 100+Modem 56. Five local user accounts exist on the system (Administrator, Guest, HelpAssistant, SUPPORT_388945a0, Mr. Evil), with "Mr. Evil" being the primary user account.

The acquisition hash verification confirmed the forensic integrity of the image: MD5 aee4fcd9301c03b3b054623ca261959a stored in the image matches the hash recomputed by ewfverify over the media data.

## Threat Intelligence and Attribution

The pattern of evidence converges consistently on a single operational profile. Greg Schardt, operating under the alias "Mr. Evil," has established a comprehensive infrastructure for wireless network reconnaissance and traffic interception aligned with documented wardriving and credential harvesting activities. The tool acquisition pattern (Ethereal, WinPcap, Network Stumbler, Cain & Abel), the explicit wireless interface configuration targeting packet capture operations, the organized directory structure separating reconnaissance, enumeration, and exploitation tools, and the engagement with IRC-based hacker communities all demonstrate consistent operational tradecraft.

The evidence directly supports the suspicion regarding Mr. Evil's activities: the combination of wireless monitoring tools (Network Stumbler, Look@LAN), packet capture capability (Ethereal, WinPcap), and positioning near wireless access points (consistent with tool configuration and known suspect behavior) aligns precisely with the hypothesized attack vector of intercepting wireless internet traffic to harvest credentials and financial data.

However, the investigation reveals a critical limitation: while the system demonstrates comprehensive tool staging and capability preparation, no execution artifacts or output files from actual attack operations were recovered. No captured .pcap files from Ethereal despite tool installation and execution, no Brutus brute-force logs, no stolen credential databases, and no intercepted victim communications. This suggests either: (1) the system represents a staging or learning environment where tools were prepared but not yet deployed for full operations against external targets, (2) output artifacts were successfully deleted or stored on external media not included in this acquisition, or (3) the system was abandoned before attack execution completed.

The URL reference to IP address 4.12.220.254 appearing multiple times in IE history and browser references as "Temp on m1200 (4.12.220.254)" suggests possible access to shared attacker infrastructure, though this connection cannot be definitively confirmed as command-and-control based on current evidence.

## Impact Assessment

**System Compromise Scope**

A single computer system (Dell Latitude CPi, N-1A9ODN6ZXK4LQ) was identified as comprehensively compromised with attack tools and staging infrastructure. The system was abandoned with physical evidence (wireless PCMCIA card, homemade antenna) indicating mobile operational deployment.

**Capability and Threat Level**

The presence of 6 high-severity findings reflects the significant threat posed by the identified toolset. The system was configured with full packet capture capability (Ethereal + WinPcap), wireless network discovery tools (Network Stumbler, Look@LAN), credential harvesting exploits (password dumping, LSA extraction), and remote access trojans (NetBus). This represents comprehensive capability for the stated attack objective: intercepting wireless traffic to harvest financial and authentication credentials.

**Persistence and Potential Victims**

No evidence of persistence mechanisms (scheduled tasks, registry autoruns, startup folder modifications) was recovered. The system appears designed for mobile/temporary deployment rather than persistent compromise of the host itself. However, the wireless interception capability, if deployed near wireless access points, could have affected multiple transient victims whose connections passed through the captured network.

The Internet Explorer history shows access to financial and email services (Yahoo Mail, banking-related domains), but no victim machine logs or network captures containing actual intercepted data were recovered. The scope of victim impact cannot be quantified from available evidence.

## Immediate Tactical Containment

1. **Isolate the computer system**: Disconnect the Dell Latitude CPi from all networks (wired and wireless). Prevent any network activity or data exfiltration.

2. **Secure the physical device**: Chain-of-custody procedures should be maintained on the abandoned hardware, including the wireless PCMCIA card and antenna, pending further law enforcement investigation.

3. **Block known infrastructure**: Monitor for and block network traffic to IP address 4.12.220.254, which appears in the suspect's browsing history and may represent attacker-controlled infrastructure.

4. **Disable user accounts**: The "Mr. Evil" user account (RID 1003) should be disabled on any network systems where credentials matching whoknowsme@sbcglobal.net or mrevil2000 may have been used or reused.

5. **Capture IRC communications**: If the Undernet IRC network (losangeles.ca.us.undernet.org:6660) is accessible to law enforcement, capture sessions for user "Mr" or "mrevilrulez" to identify ongoing communications with hacker communities and potential coconspirators.

6. **Preserve the newsgroup account**: The Forté Agent configuration with whoknowsme@sbcglobal.net on news.dallas.sbcglobal.net should be monitored for continued access to identify if the suspect maintains ongoing newsgroup engagement.

7. **Terminate hacking tool processes**: Any instances of Ethereal, WinPcap, mIRC, Network Stumbler, or other tools identified in this analysis should be terminated on any network of interest.

## Strategic Remediation

**Tool Acquisition and Staging Evasion Failure**

The evidence demonstrates Mr. Evil's intent to acquire and stage sophisticated attack tools, yet the deletion of installer files to the Recycle Bin rather than secure permanent deletion allowed forensic recovery. **Remediation**: Implement endpoint detection and response (EDR) solutions capable of detecting and alerting on acquisition of known hacking tools (Ethereal, WinPcap, Network Stumbler, Cain & Abel, credential dumpers) before installation completes. This case specifically shows that Ethereal installation occurred on August 27, 2004—detection at installation time would have provided immediate tactical opportunity to interdict the attack. Additionally, secure deletion verification should be required for any compliance regime handling suspected malicious tools; simple Recycle Bin moves are insufficient.

**Unencrypted Communications Infrastructure**

The system was configured with unencrypted SMTP (port 25) and NNTP (port 119) credentials recorded in configuration files: whoknowsme@sbcglobal.net password stored in Forté Agent .ini files, and IRC user account credentials visible in mIRC.ini. **Remediation**: Enforce encrypted communication protocols (TLS/SSL) for all email and newsreader clients. This specific case shows that the suspect's email address (whoknowsme@sbcglobal.net) was recoverable directly from configuration, enabling account targeting and credential compromise. Network traffic for SMTP/NNTP should be monitored for suspicious newsgroup access patterns indicative of information gathering on hacking techniques.

**Wireless Network Monitoring Capability Without Encryption**

The Look@LAN configuration documented the Compaq WL110 wireless interface with specific IP (192.168.1.111) and MAC address (0010a4933e09) at installation time. This demonstrates that the attacker successfully positioned wireless monitoring tools on the network. **Remediation**: Wireless networks within range of public access points should implement WPA2/WPA3 encryption and disable unencrypted connection fallback to older standards (WEP, open networks). Additionally, deploy wireless intrusion detection systems (WIDS) capable of detecting passive sniffing tools like Ethereal and Network Stumbler execution against wireless infrastructure. This case shows the attacker was operating with Ethereal 0.10.6 and WinPcap 3.01 alpha, both identifiable network tools with distinctive traffic signatures.

**IRC Community Engagement Without Monitoring**

The mIRC configuration with 83 subscribed channels on Undernet demonstrates sustained engagement with hacker communities for information sharing and coordination. The specific channel subscriptions include #Elite.Hackers, #CyberCafe, and #Chataholics, all associated with hacking and information exchange. **Remediation**: Establish monitoring of IRC networks known to host hacker communities (Undernet, EFNet, AfterNet, etc.) to detect suspicious usernames and channel patterns. This specific case shows "Mr" and "mrevilrulez" as identifiers used by the same attacker—monitoring for these specific nicks should be cross-referenced with other intelligence sources to identify coordinated campaigns. Intelligence sharing with IRC network operators should prioritize identification and takedown of channels explicitly focused on hacking techniques.

**Physical Wardriving Without Detection**

The combination of wireless PCMcarta, homemade antenna, and Look@LAN configuration suggests active wardriving operations positioning near wireless access points. The presence of Network Stumbler confirms active scanning capability. **Remediation**: Wireless access points near high-value targets (financial services, retail payment systems, corporate facilities) should implement geofencing alerts when external wireless scanning tools (like Network Stumbler or similar) are detected attempting to enumerate SSIDs and security parameters. Additionally, law enforcement should increase monitoring of parking areas adjacent to Starbucks, T-Mobile Hotspots, and other public wireless locations for vehicles with external antenna equipment consistent with wardriving activity. This case documents the specific antenna and PCMCIA card configuration used—physical evidence can be distributed to local law enforcement for mobile surveillance interdiction.

## Conclusion

**Q1: What systems were compromised?**

A single Dell Latitude CPi notebook computer (serial number VLQLW, account name N-1A9ODN6ZXK4LQ) was compromised. The system contained comprehensive hacking tool infrastructure and was discovered abandoned with wireless interception equipment.

**Q2: How did the attacker gain initial access?**

No evidence of initial compromise of the target system was recovered. The system appears to have been directly controlled by the attacker (Greg Schardt / Mr. Evil) as the registered owner and primary user. The question of how external victims' systems were compromised is not directly addressed by this evidence, though the tool set suggests wireless network interception attacks against machines connecting through wardriving-positioned monitoring points.

**Q3: What lateral movement occurred?**

No lateral movement evidence was recovered on the target system itself. The target appears to be an attacker-controlled staging platform rather than a victim system. However, the presence of remote access trojans (NetBus) suggests capability to establish lateral movement on external victim systems once credentials are harvested through wireless interception.

**Q4: What persistence mechanisms were installed?**

No persistence mechanisms (scheduled tasks, registry autoruns, service installations, startup folder entries) were identified on the target system. The system appears designed for temporary deployment in mobile wardriving scenarios rather than persistent compromise establishment.

**Q5: Was data exfiltrated, and if so, what and how much?**

No exfiltrated data artifacts were recovered from the target system. While the installed tools (Ethereal, credential dumpers, remote access trojans) provided capability for interception and exfiltration, no captured network traffic files, password dumps, or stolen victim credentials were found in the evidence. This suggests either: (1) the system was abandoned before attack operations commenced, (2) exfiltrated data was stored on external media not included in this acquisition, or (3) data was successfully deleted using methods more secure than Recycle Bin moves.

**Q6: What is the full timeline of the incident?**

System installation and tool staging occurred August 19-27, 2004. Windows XP was installed August 19, 22:48:27 UTC. Hacking and network analysis tools were installed August 20-27, 2004. Look@LAN was configured for wireless packet capture August 25, 2004, 10:55 UTC. Installer files were deleted August 25-27, 2004. Last system activity: August 27, 2004, 15:08:23 UTC (user logon); system shutdown 15:46:33 UTC. The system was subsequently abandoned and discovered September 20, 2004.

**Q7: What is the total scope and business impact?**

A single attacker-controlled system was compromised with sophisticated wireless interception capability. The business impact of victim organizations cannot be quantified without recovered victim data or network captures. The infrastructure suggests potential compromise of financial credentials and authentication information from wireless network users in proximity to the attacker's positioning, but the specific scale of victim compromise is unknown.

**Q8: What are the recommended remediation actions?**

See Strategic Remediation section above. Key actions include: (1) endpoint detection of hacking tool acquisition, (2) enforcement of encrypted communications protocols, (3) wireless network encryption and intrusion detection, (4) IRC hacker community monitoring, and (5) physical wardriving detection and law enforcement interdiction.

---

## Case Questions

Case Q1: What is the image hash? Does the acquisition and verification hash match?

The acquisition hash is MD5: aee4fcd9301c03b3b054623ca261959a. The hash is verified—ewfverify recomputed it over the media data and confirmed it matches the stored acquisition hash, establishing forensic integrity.

Case Q2: What operating system was used on the computer?

Windows XP (Version 5.1, Build 2600)

Case Q3: When was the install date?

August 19, 2004 at 22:48:27 UTC

Case Q4: What is the timezone settings?

Central Standard Time (UTC-6) / Central Daylight Time (UTC-5) in effect

Case Q5: Who is the registered owner?

Greg Schardt

Case Q6: What is the computer account name?

N-1A9ODN6ZXK4LQ

Case Q7: What is the primary domain name?

No domain was configured; the system is a standalone workstation. The computer is its own domain (N-1A9ODN6ZXK4LQ).

Case Q8: When was the last recorded computer shutdown date/time?

August 27, 2004 at 15:46:33 UTC

Case Q9: How many accounts are recorded (total number)?

5 local accounts: Administrator, Guest, HelpAssistant, SUPPORT_388945a0, Mr. Evil

Case Q10: What is the account name of the user who mostly uses the computer?

Mr. Evil (logon_count=15, last_logon=2004-08-27T15:08:23)

Case Q11: Who was the last user to logon to the computer?

Mr. Evil at August 27, 2004 at 15:08:23 UTC

Case Q12: A search for "Greg Schardt" reveals multiple hits. One proves Greg Schardt is Mr. Evil and is administrator. What file is it? What software program does this file relate to?

The file is irunin.ini (Look@LAN installation configuration file). The software program is Look@LAN 2.50 network monitoring tool. The file explicitly records: %REGOWNER%=Greg Schardt, %LANUSER%=Mr. Evil, and %ISUSERNTADMIN%=TRUE, directly linking both identities to the same administrator user.

Case Q13: List the network cards used by this computer.

1. Compaq WL110 Wireless LAN PC Card
2. Xircom CardBus Ethernet 100 + Modem 56 (Ethernet Interface)

Case Q14: This same file reports the IP address and MAC address of the computer. What are they?

IP Address: 192.168.1.111
MAC Address: 0010a4933e09

Case Q15: Which NIC card was used during the installation and set-up for LOOK@LAN?

The Compaq WL110 Wireless LAN PC Card was used. The MAC address 0010a4933e09 begins with vendor code 0010a4, which identifies Compaq as the manufacturer.

Case Q16: Find 6 installed programs that may be used for hacking.

1. Ethereal 0.10.6 (packet analyzer/sniffer)
2. Cain & Abel v2.5 (network analysis and password cracking)
3. WinPcap 3.01 alpha (packet capture library)
4. Network Stumbler 0.4.0 (wireless network scanner)
5. Look@LAN 2.50 (network monitor)
6. mIRC 6.12 (IRC client for hacker community communication)

Additional hacking tools detected: Brutus (brute force), GetAdmin (privilege escalation), SuperScan (port scanner), EnumPlus (network enumeration).

Case Q17: What is the SMTP email address for Mr. Evil?

whoknowsme@sbcglobal.net

Case Q18: What are the NNTP (news server) settings for Mr. Evil?

NNTP Server: news.dallas.sbcglobal.net
Port: 119

Case Q19: What two installed programs show this information?

1. Forté Agent (newsreader) - configuration in AGENT.INI
2. Agent (newsreader application) - configuration in agent.ini

Case Q20: List 5 newsgroups that Mr. Evil has subscribed to?

The newsgroup subscriptions were not directly enumerable from the recovered configuration files. The configuration shows that the newsreader was set up to access news.dallas.sbcglobal.net but specific subscribed newsgroup names are not recovered in the available evidence.

Case Q21: A popular IRC program called mIRC was installed. What are the user settings that was shown when the user was online and in a chat channel?

User: Mini Me
Nick: Mr
Alternate Nick: mrevilrulez
Connected to: Undernet (losangeles.ca.us.undernet.org:6660)
User ID (ident): Mrevil
System type: UNIX
Ident port: 113

Case Q22: This IRC program has the capability to log chat sessions. List 3 IRC channels that the user of this computer accessed.

1. #Elite.Hackers (UnderNet) - Logged August 20, 2004, 10:45:34 UTC
2. #CyberCafe (UnderNet) - Logged August 20, 2004, 10:54:21 UTC
3. #Chataholics (UnderNet) - Logged August 20, 2004, 10:52:09 UTC

Case Q23: Ethereal, a popular "sniffing" program was found to be installed. When TCP packets are collected and re-assembled, the default save directory is the users \My Documents directory. What is the name of the file that contains the intercepted data?

No captured packet files (.pcap, .cap) were recovered from the system. Despite Ethereal 0.10.6 installation (August 27, 15:29 UTC), WinPcap 3.01 installation (August 27, 15:15 UTC), and documented execution of ethereal.exe (August 27, 15:34:54 UTC), no network traffic capture files were found in the My Documents directory or elsewhere on the filesystem. The absence of capture files suggests either: (1) the tools were executed in analysis mode without saving captures, (2) capture files were deleted, or (3) captured data was stored on external media.

Case Q24: Viewing the file in a text format reveals information about who and what was intercepted. What type of wireless computer was the victim (person who had his internet surfing recorded) using?

Evidence not found. No captured network traffic or packet files were recovered that would contain victim computer information.

Case Q25: What websites was the victim accessing?

Evidence not found. No network captures with victim browsing history were recovered.

Case Q26: Search for the main users web based email address. What is it?

mrevil2000@yahoo.com (confirmed via edit.yahoo.com/config URL with parameters .id=mrevil2000)
Alternative email address: whoknowsme@sbcglobal.net

Case Q27: Yahoo mail, a popular web based email service, saves copies of the email under what file name?

Evidence not recovered. While access to Yahoo mail services was documented in browser history, no recovered Yahoo mail files or cache entries containing email copies were identified in the available evidence.

Case Q28: How many executable files are in the recycle bin?

4 executable files:
1. lalsetup250.exe (Look@LAN installer, 2,160,128 bytes)
2. netstumblerinstaller_0_4_0.exe (Network Stumbler installer, 1,325,056 bytes)
3. WinPcap_3_01_a.exe (WinPcap installer, 442,880 bytes)
4. ethereal-setup-0.10.6.exe (Ethereal installer, 8,460,800 bytes)

Case Q29: Are these files really deleted?

No, they are not really deleted. All four executable files remain present in the Recycle Bin storage (confirmed by INFO2 and Recycle Bin index records). The files were moved to RECYCLER folder with modified names (Dc1.exe, Dc2.exe, Dc3.exe, Dc4.exe) but remain intact and recoverable. Deletion to the Recycle Bin does not permanently remove files; they persist until the Recycle Bin is emptied.

Case Q30: How many files are actually reported to be deleted by the file system?

7038 deleted file entries are reported in the filesystem. This represents the total number of file system entries marked as deleted but not yet overwritten on disk.

Case Q31: Perform an Anti-Virus check. Are there any viruses on the computer?

Yes, 18 malicious files were detected by ClamAV antivirus scan:

**Trojans (credential harvesting and remote access):**
1. SAMDUMP.EXE - Win.Trojan.Pwdump-2 (SAM password dumping)
2. snitch.exe - Win.Trojan.Snitch-1 (credential stealing)
3. lsadump2.exe - Win.Trojan.Lsadump-1 (LSA secrets extraction)
4. NetBus170.zip - Win.Trojan.Netbus-2 (remote access trojan)
5. SECHOLE.EXE - Win.Trojan.Sehole-1 (privilege escalation trojan)
6. Abel.dll (Cain component) - Win.Trojan.Cain-9

**Reconnaissance and Exploitation Tools:**
7. enum.exe - Win.Tool.EnumPlus-1 (network enumeration)
8. Chrono.dl_ - Win.Trojan.Bruteforce-3 (brute force tool)
9. NetTools.ex_ - Win.Trojan.Spion-4 (network reconnaissance)
10. superscan.exe - Win.Trojan.Agent-6240252-0 (port scanner)
11. BrutusA2.exe - Win.Tool.Brutus-3 (brute force attack tool)
12. GetAdmin.exe - Win.Exploit.WinNT-3 (privilege escalation exploit)

**Additional malicious archives and collections:**
13. ntreskit.zip - Win.Trojan.Nemo-1
14. enum.tar.gz - Win.Tool.EnumPlus-1 (duplicate)
15. enum/enum.exe - Win.Tool.EnumPlus-1 (duplicate)
16. brutus.zip - Win.Tool.Brutus-3 (duplicate)
17. lsadump2.zip - Win.Trojan.Lsadump-1 (duplicate)
18. sechole3.zip - Win.Trojan.Sehole-1 (duplicate)

These detections indicate a comprehensive suite of credential harvesting, network reconnaissance, remote access, and privilege escalation tools organized in the My Documents directory structure for systematic attack operations.


---

## Overview

| | |
|---|---|
| Findings | **9** (7 confirmed, 2 inference) |
| Severity | 0 critical, 6 high, 3 medium, 0 low, 0 info |
| Sources | 10 evidence sources across 224 tool calls |


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
| 2004-08-19T22:48:27 | System Ownership and User Identity Confirmed: Greg Schardt is "Mr. Evil" | HIGH | registry.profile, appfiles.program_files.irunin.ini, bulk.url |
| 2004-08-19T22:48:27 | System Configuration and Timeline Summary | HIGH | hashdeep.acquisition, registry.profile |
| 2004-08-20T10:08:00 | Newsreader and NNTP Configuration for Unauthorized Access Information | MEDIUM | appfiles.program_files.agent.ini |
| 2004-08-20T10:29:00 | Suspicious Website Access Including Wardriving and Hacking Resources | HIGH | registry.ntuser.mr. evil |
| 2004-08-20T15:00:00 | Extensive Malware and Hacking Tools Detected on System | HIGH | clamav.scan |
| 2004-08-20T15:00:00 | Organized Hacking Attack Infrastructure: Structured Directory Organization and Tool Staging | HIGH | clamav.scan, tsk.filelist |
| 2004-08-20T15:00:00 | IRC Communication Infrastructure Using Undernet Network | MEDIUM | appfiles.program_files.mirc.ini, registry.ntuser.mr. evil |
| 2004-08-25T10:55:00 | Network Reconnaissance Tools and Wireless Packet Capture Infrastructure Installed | HIGH | registry.profile, appfiles.program_files.irunin.ini, registry.ntuser.mr. evil |
| 2004-08-25T16:18:25 | Acquisition and Deletion Evasion: Installer Executables in Recycle Bin | MEDIUM | recycle_bin |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] System Ownership and User Identity Confirmed: Greg Schardt is "Mr. Evil"

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | registry.profile, appfiles.program_files.irunin.ini, bulk.url |
| **Evidence Refs** | tc_23347454, tc_d3d3b0f9, tc_47b04c48 |


The Windows XP system is registered to Greg Schardt (RegisteredOwner in registry profile). The Winlogon DefaultUserName is "Mr. Evil," and the Look@LAN installation configuration file (irunin.ini) confirms both identities: %REGOWNER%=Greg Schardt and %LANUSER%=Mr. Evil, with %ISUSERNTADMIN%=TRUE, proving the same individual holds administrative access. The URL analysis shows connections to mrevil2000 Yahoo account (from bulk.url searches showing edit.yahoo.com config check with id=mrevil2000). This establishes that Greg Schardt and Mr. Evil are the same person with administrator privileges on the system.



### 2. [HIGH] Extensive Malware and Hacking Tools Detected on System

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:00:00 to 2004-08-27T15:30:00 |
| **Sources** | clamav.scan |
| **Evidence Refs** | tc_4d9a0f7d |
| **ATT&CK** | [T1595](https://attack.mitre.org/techniques/T1595/), [T1592](https://attack.mitre.org/techniques/T1592/), [T1110](https://attack.mitre.org/techniques/T1110/) |


ClamAV scan detected 18 files flagged as malicious or hacking tools on the system: trojans (Pwdump, Snitch, Nemo, Lsadump, Sehole, Netbus, Cain), exploit tools (WinNT, Brutus), and reconnaissance utilities (EnumPlus, SuperScan, Spion). These files were organized in structured directories: /My Documents/COMMANDS, /My Documents/ENUMERATION/NT, /My Documents/EXPLOITATION/NT, and /My Documents/FOOTPRINTING/NT. Key executables include: SAMDUMP.EXE (password dumping), enum.exe (network enumeration), NetBus.zip (remote access trojan), GetAdmin.exe (privilege escalation), lsadump2.exe (LSA dump), and Brutus (brute force tool). However, the presence of these files indicates staging and potential capability but does not confirm actual malicious activity against external targets. No evidence of attack output (network captures, password dumps, scanning results) was recovered.



### 3. [HIGH] Network Reconnaissance Tools and Wireless Packet Capture Infrastructure Installed

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-25T10:55:00 to 2004-08-27T15:34:54 |
| **Sources** | registry.profile, appfiles.program_files.irunin.ini, registry.ntuser.mr. evil |
| **Evidence Refs** | tc_23347454, tc_8e8e1103, tc_d3d3b0f9 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1041](https://attack.mitre.org/techniques/T1041/) |


The system has network analysis tools installed: Ethereal 0.10.6, WinPcap 3.01 alpha, Network Stumbler 0.4.0, Look@LAN 2.50, and Cain & Abel v2.5. UserAssist registry shows execution of: ethereal.exe (2004-08-27 15:34:54), Network Stumbler (2004-08-27 15:12:35), Cain.exe (2004-08-27 15:33:02), and Look@LAN (2004-08-26 15:06:14). The Look@LAN configuration (irunin.ini) shows configuration for monitoring on the Compaq WL110 Wireless LAN interface (MAC 0010a4933e09) from IP 192.168.1.111, with configuration timestamp 2004-08-25 at 10:55 UTC. This demonstrates setup and execution of network analysis tools on wireless interfaces. However, no network capture output files (.pcap, .cap) were recovered, suggesting these may have been deleted or the tools were run in analysis/discovery mode without saving capture files.



### 4. [HIGH] Suspicious Website Access Including Wardriving and Hacking Resources

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T10:29:00 to 2004-08-27T15:44:44 |
| **Sources** | registry.ntuser.mr. evil |
| **Evidence Refs** | tc_8e8e1103 |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1598](https://attack.mitre.org/techniques/T1598/) |


Mr. Evil's Internet Explorer TypedURLs history shows access to: wardriving.com (wireless network discovery), ethereal.com (packet analysis), 2600.org (well-known hacking/phreaking publication), maktoob.com (Arabic email service), yahoo.com, majorgeeks.com (software download site), and drudgereport.com. Additionally, connections to 4.12.220.254 (both http and ftp) suggest access to shared attacker infrastructure or stolen data repository. The sequence and nature of these URLs indicates active research into network interception capabilities (Ethereal), wireless network mapping (wardriving), and engagement with hacker/phreaker culture (2600).



### 5. [HIGH] System Configuration and Timeline Summary

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | hashdeep.acquisition, registry.profile |
| **Evidence Refs** | tc_93b17239, tc_23347454 |


Windows XP system (Build 2600) installed 2004-08-19T22:48:27 UTC on Dell Latitude CPi. Owner: Greg Schardt (aka "Mr. Evil"), Winlogon DefaultUserName. Computer: N-1A9ODN6ZXK4LQ. Timezone: Central (UTC-6/UTC-5). Last shutdown: 2004-08-27T15:46:33 UTC. Last user logon: Mr. Evil at 2004-08-27T15:08:23 UTC. System contains 5 local accounts (Administrator, Guest, HelpAssistant, SUPPORT_388945a0, Mr. Evil). Acquisition hash verified: MD5 aee4fcd9301c03b3b054623ca261959a. Network interfaces: Compaq WL110 Wireless LAN Card (MAC 0010a4933e09, IP 192.168.1.111) and Xircom CardBus Ethernet 100+Modem. Filesystem contains 7038 deleted file entries. Installation and execution of attack tools occurred August 20-27, 2004, with primary activity concentrated on August 25-27, 2004.



### 6. [HIGH] Organized Hacking Attack Infrastructure: Structured Directory Organization and Tool Staging

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:00:00 to 2004-08-27T15:30:00 |
| **Sources** | clamav.scan, tsk.filelist |
| **Evidence Refs** | tc_4d9a0f7d, tc_1bf039ce |
| **ATT&CK** | [T1595](https://attack.mitre.org/techniques/T1595/), [T1592](https://attack.mitre.org/techniques/T1592/), [T1595.003](https://attack.mitre.org/techniques/T1595/003/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1040](https://attack.mitre.org/techniques/T1040/) |


The attacker (Greg Schardt/Mr. Evil) organized tools into a structured directory hierarchy under My Documents: COMMANDS/ (execution utilities), ENUMERATION/NT/ (network reconnaissance), EXPLOITATION/NT/ (attack tools), and FOOTPRINTING/NT/ (scanning tools). This organization pattern, combined with tool installation (13+ utilities), configured IRC client, and newsreader for information sharing, demonstrates preparation for network attack activities. However, critically, no evidence of actual attack execution was recovered: no network capture files despite Ethereal/WinPcap execution, no Brutus brute-force logs, no password dumps, no enumeration results, and no stolen victim data. The structured organization and tool acquisition indicate capability and planning, but the absence of attack artifacts suggests the system may represent a learning/staging environment rather than evidence of completed attacks against external targets.



### 7. [MEDIUM] Newsreader and NNTP Configuration for Unauthorized Access Information

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:08:00 to 2004-08-27T15:46:33 |
| **Sources** | appfiles.program_files.agent.ini |
| **Evidence Refs** | tc_a07737ab |
| **ATT&CK** | [T1589](https://attack.mitre.org/techniques/T1589/), [T1598](https://attack.mitre.org/techniques/T1598/) |


Forté Agent 1.9 newsreader was installed and configured with: EMailAddress=whoknowsme@sbcglobal.net, SMTP server=smtp.sbcglobal.net (port 25), NNTP server=news.dallas.sbcglobal.net (port 119). The configuration provides access to SBC Global newsgroups. While no specific newsgroup message archives were recovered, the configuration aligns with the system's overall profile: structured organization of hacking tools, concurrent installation of IRC client for hacker community engagement (confirmed via IRC logs), and access to hacker/security research websites (2600.org, wardriving.com, ethereal.com). The newsreader configuration represents capability to access technical security and hacking discussion forums. However, confirmation of actual newsgroup access requires recovered message archives or email records not found in evidence.



### 8. [MEDIUM] IRC Communication Infrastructure Using Undernet Network

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:00:00 to 2004-08-25T16:20:27 |
| **Sources** | appfiles.program_files.mirc.ini, registry.ntuser.mr. evil |
| **Evidence Refs** | tc_da1ff756, tc_8e8e1103 |
| **ATT&CK** | [T1071](https://attack.mitre.org/techniques/T1071/) |


mIRC 6.12 IRC client configured with: Nick=Mr, Alternate Nick=mrevilrulez, User ID=Mini Me, connected to Undernet via losangeles.ca.us.undernet.org:6660 (Los Angeles US server). The chanfolder list in mirc.ini contains 83 IRC channels, suggesting deep involvement in IRC community for information sharing and coordination. UserAssist shows mirc.exe executed at 2004-08-25 16:20:27 UTC with 3 execution records, indicating regular IRC engagement.



### 9. [MEDIUM] Acquisition and Deletion Evasion: Installer Executables in Recycle Bin

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-25T16:18:25 to 2004-08-27T15:29:58 |
| **Sources** | recycle_bin |
| **Evidence Refs** | tc_3982cb2f |
| **ATT&CK** | [T1070](https://attack.mitre.org/techniques/T1070/) |


Four malicious installer executables recovered from Windows Recycle Bin, all still present in bin storage: lalsetup250.exe (Look@LAN installer, 2.1MB), netstumblerinstaller_0_4_0.exe (wireless network scanner, 1.3MB), WinPcap_3_01_a.exe (packet capture library, 442KB), ethereal-setup-0.10.6.exe (packet analyzer, 8.4MB). All were deleted from Desktop between 2004-08-25 and 2004-08-27, indicating attempted cleanup of installation evidence. The fact that files remain in the Recycle Bin shows the deletion operation did not permanently remove evidence before system acquisition.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Internal IP | `192.168.1.111` |  | Network Reconnaissance Tools and Wireless Packet Capture Infrastructure Installe |
| Port | `TCP 25` |  | Newsreader and NNTP Configuration for Unauthorized Access Information |
| Port | `TCP 119` |  | Newsreader and NNTP Configuration for Unauthorized Access Information |
| External IP | `4.12.220.254` |  | Suspicious Website Access Including Wardriving and Hacking Resources |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| MD5 | `aee4fcd9301c03b3b054623ca261959a` |  | System Configuration and Timeline Summary |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `whoknowsme@sbcglobal.net` |  | Newsreader and NNTP Configuration for Unauthorized Access Information |




---

## Appendix C: MITRE ATT&CK Coverage

11 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (5) > Defense Evasion (1) > Credential Access (2) > Discovery (2) > Command and Control (1) > Exfiltration (1)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1589](https://attack.mitre.org/techniques/T1589/) | Gather Victim Identity Information | Newsreader and NNTP Configuration for... |
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Extensive Malware and Hacking Tools Detected on System; Suspicious Website Access Including Wardriving...; Organized Hacking Attack Infrastructure:... |
| [T1595](https://attack.mitre.org/techniques/T1595/) | Active Scanning | Extensive Malware and Hacking Tools Detected on System; Organized Hacking Attack Infrastructure:... |
| [T1595.003](https://attack.mitre.org/techniques/T1595/003/) | Wordlist Scanning | Organized Hacking Attack Infrastructure:... |
| [T1598](https://attack.mitre.org/techniques/T1598/) | Phishing for Information | Newsreader and NNTP Configuration for...; Suspicious Website Access Including Wardriving... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | Acquisition and Deletion Evasion: Installer... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Network Reconnaissance Tools and Wireless...; Organized Hacking Attack Infrastructure:... |
| [T1110](https://attack.mitre.org/techniques/T1110/) | Brute Force | Extensive Malware and Hacking Tools Detected on System |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Network Reconnaissance Tools and Wireless...; Organized Hacking Attack Infrastructure:... |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Organized Hacking Attack Infrastructure:... |


### Command and Control

| Technique | Name | Findings |
|-----------|------|----------|
| [T1071](https://attack.mitre.org/techniques/T1071/) | Application Layer Protocol | IRC Communication Infrastructure Using Undernet Network |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1041](https://attack.mitre.org/techniques/T1041/) | Exfiltration Over C2 Channel | Network Reconnaissance Tools and Wireless... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 224 |
| Findings submitted | 9 |
| Confirmed | 7 |
| Inferences | 2 |
| Input tokens | 6.3K |
| Output tokens | 52.7K |
| Total tokens | 59.0K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 6.3K | 52.7K | 59.0K |




<details>
<summary>Evidence Sources (184)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 12545 |
| hashdeep.hashes | hashdeep | 8 |
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
| pcap.disk.interception | tshark | 75 |
| yara.files | yara | 3 |
| recycle_bin | icat | 7 |
| appfiles.program_files.license.txt | icat | 46 |
| registry.profile | python-registry | 36 |
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
| ez.shimcache | eztools | 140 |
| appfiles.program_files.iefiles5.inf | icat | 49 |
| appfiles.program_files.adoapt15.reg | icat | 19 |
| appfiles.program_files.adofre15.reg | icat | 18 |
| appfiles.program_files.makapt15.bat | icat | 3 |
| appfiles.program_files.makfre15.bat | icat | 3 |
| appfiles.program_files.handler.reg | icat | 15 |
| appfiles.program_files.handsafe.reg | icat | 17 |
| appfiles.program_files.handunsf.reg | icat | 17 |
| appfiles.program_files.dictionary.xml | icat | 649 |
| ez.prefetch | eztools | 165 |
| appfiles.program_files.mobileipv4.xml | icat | 64 |
| registry.system | regripper | 376 |
| appfiles.program_files.nasreq.xml | icat | 293 |
| appfiles.program_files.sunping.xml | icat | 24 |
| appfiles.program_files.capture_filters.txt | icat | 80 |
| appfiles.program_files.capturing.txt | icat | 84 |
| registry.system | regripper | 133 |
| appfiles.program_files.display_filters.txt | icat | 43 |
| appfiles.program_files.faq.txt | icat | 2228 |
| appfiles.program_files.getting_started.txt | icat | 90 |
| registry.system | regripper | 7 |
| appfiles.program_files.overview.txt | icat | 38 |
| appfiles.program_files.well_known.txt | icat | 114 |
| appfiles.program_files.pcrepattern.3.txt | icat | 1475 |
| registry.security | regripper | 19 |
| appfiles.program_files.agentx-mib.txt | icat | 529 |
| appfiles.program_files.disman-event-mib.txt | icat | 1957 |
| appfiles.program_files.disman-schedule-mib.txt | icat | 701 |
| registry.security | regripper | 8 |
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
| registry.system | regripper | 9600 |
| appfiles.program_files.ipv6-icmp-mib.txt | icat | 531 |
| appfiles.program_files.ipv6-mib.txt | icat | 1445 |
| appfiles.program_files.ipv6-tc.txt | icat | 69 |
| appfiles.program_files.ipv6-tcp-mib.txt | icat | 213 |
| registry.system | regripper | 283 |
| appfiles.program_files.ipv6-udp-mib.txt | icat | 143 |
| appfiles.program_files.lm-sensors-mib.txt | icat | 232 |
| appfiles.program_files.mta-mib.txt | icat | 1228 |
| appfiles.program_files.net-snmp-agent-mib.txt | icat | 546 |
| registry.system | regripper | 1134 |
| appfiles.program_files.net-snmp-examples-mib.txt | icat | 229 |
| appfiles.program_files.net-snmp-mib.txt | icat | 69 |
| appfiles.program_files.net-snmp-monitor-mib.txt | icat | 61 |
| appfiles.program_files.net-snmp-system-mib.txt | icat | 65 |
| appfiles.program_files.net-snmp-tc.txt | icat | 123 |
| appfiles.program_files.network-services-mib.txt | icat | 628 |
| registry.system | regripper | 3138 |
| appfiles.program_files.notification-log-mib.txt | icat | 784 |
| appfiles.program_files.rfc-1215.txt | icat | 40 |
| appfiles.program_files.rfc1155-smi.txt | icat | 121 |
| registry.system | regripper | 199 |
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
| registry.ntuser.default user | regripper | 43 |
| registry.usrclass.localservice | regripper | 4 |
| registry.ntuser.localservice | regripper | 70 |
| registry.usrclass.mr. evil | regripper | 4 |
| registry.ntuser.mr. evil | regripper | 329 |
| registry.usrclass.networkservice | regripper | 4 |
| registry.ntuser.networkservice | regripper | 70 |
| clamav.scan | clamav | 19 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
