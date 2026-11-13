# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-13T16:31:03.536244+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 184 evidence sources (17 disk, 167 other) | 152 tool calls | 31 minutes
**Results:** 7 findings (2 high) | 2 confirmed, 5 inference
**Timeline:** 2004-08-19 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2004-08-25): 18 Malware and Exploit Tools Detected in Organized Directory Structure (+4 related)
- **Persistence** (2004-08-19 to 2004-08-20): Network Traffic Capture Recovered from Suspect's Profile (+1 related)

**Tools:** search (43), get_raw_output (25), submit_finding (11), open_case (7), get_investigation_summary (7). SHA-256 hashes recorded for all evidence.



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

152 tool calls were executed across 9
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Report: Dell Latitude CPi Hacking Case

## Background

On September 20, 2004, a Dell Latitude CPi notebook computer (serial number VLQLW) was discovered abandoned along with a wireless PCMCIA card and a homemade 802.11b antenna. Initial suspicion suggested the computer had been used for hacking purposes, potentially linked to a suspect known as Greg Schardt, who also uses the online alias "Mr. Evil." Intelligence indicated that this suspect may have been engaged in wardriving activities, parking vehicles within range of wireless access points (such as Starbucks and T-Mobile Hotspots) to intercept internet traffic for the purpose of harvesting credit card numbers, usernames, and passwords.

This forensic investigation examined an EnCase image of the abandoned computer captured across two segments (4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02). The evidence inventory totals 9 indexed sources spanning 152 tool invocations. The investigation recovered 7 substantive findings, establishing clear connections between the registered owner, the suspect identity "Mr. Evil," and a systematic installation of network reconnaissance and exploitation tools.

**System Configuration:** The Dell Latitude CPi was configured as a Windows XP Professional system (Build 2600) installed on August 19, 2004 at 22:48:27 UTC. The computer was registered to Greg Schardt and configured with a default logon user of "Mr. Evil." The system maintained Central Daylight Time zone settings (UTC-5 at the time of image capture). Network interfaces included two cards: a Compaq WL110 Wireless LAN PC Card and a Xircom CardBus Ethernet 100 + Modem 56. The acquisition hash (MD5: aee4fcd9301c03b3b054623ca261959a) was verified against the ewfverify recomputed hash, confirming image integrity.

## Incident Timeline

**August 19, 2004 - System Installation and Initial Setup**
The Windows XP Professional system was installed beginning at 22:48:27 UTC on August 19, 2004. System configuration established the registered owner as "Greg Schardt" and configured the default Winlogon user as "Mr. Evil." The system's last modification timestamp was recorded at this date. Network card configuration was completed during setup, with the Xircom Ethernet interface assigned a local IP address of 192.168.1.111 and MAC address 0010a4933e09 (Compaq vendor prefix).

**August 20, 2004 - Hacking Tool Installation Phase Begins (06:08 UTC through 15:13 UTC)**
On August 20, 2004, a systematic campaign to install hacking and reconnaissance tools commenced. Between 06:08 and 15:13 UTC, the following tools were installed:

- 10:08 UTC: Forté Agent 1.9 installed, configured with email account "whoknowsme@sbcglobal.net" and SMTP server "smtp.sbcglobal.net" (port 25) and News server "news.dallas.sbcglobal.net" (NNTP port 119). Error logs show connection attempts to news.dallas.sbcglobal.net on this date.
- 15:05 UTC: Anonymizer Bar 2.0 installed
- 15:05 UTC: Cain & Abel v2.5 beta45 installed (password recovery/cracking tool)
- 15:07 UTC: Faber Toys 2.4 installed
- 15:09 UTC: CuteFTP installed
- 15:10 UTC: mIRC installed
- 15:12 UTC: Powertoys for Windows XP installed
- 15:13 UTC: 123 Write All Stored Passwords installed

**August 20, 2004 - IRC Channel Activity and Reconnaissance (10:29 UTC through 14:26 UTC)**
Immediately following tool installations, the suspect initiated IRC connections to multiple hacking-related channels. Log analysis shows brief visits to eight separate IRC channels between 10:29 and 14:26 UTC:

- 10:29 UTC: Visited #ISO-WAREZ on EFnet for 41 seconds (no messages recorded)
- 10:30 UTC: Visited #evilfork on EFnet for 37 seconds (one message: "glib smarm cuyk")
- 10:42 UTC: Visited #LuxShell on UnderNet for 79 seconds (one message: "glib smarm cuyk")
- 10:44 UTC: Visited #ushells on UnderNet for 18 seconds (no messages)
- 10:45 UTC: Visited #Elite.Hackers on UnderNet for 90 seconds (listening only, music playback by others)
- 10:43 UTC: Visited #mp3xserv on UnderNet for brief duration
- 14:14 UTC: Visited #thedarktower on AfterNet
- 14:26 UTC: Visited #funny on UnderNet

The user nick employed was "mrevil" or "mrevilrulez." Direct messages received from user "m5tar" at 10:54 UTC contained unrelated spam advertising dating services. Channel activity was characterized by minimal substantive participation—primarily brief channel browsing with very short connection times and gibberish text messages rather than engaged hacking discussion or tool trading.

**August 25, 2004 - Network Enumeration Tool Installation (15:56 UTC)**
On August 25, 2004, Look@LAN 2.50 Build 29 was installed at 15:56 UTC. The installation log file (irunin.ini) captured comprehensive system configuration data at the time of installation, including the system's hostname (N-1A9ODN6ZXK4LQ), default user ("Mr. Evil"), local IP address (192.168.1.111), and NIC MAC address (0010a4933e09). The registered owner field captured "Greg Schardt" and organization field captured "N/A," confirming the identity chain.

**August 25, 2004 - Look@LAN Installer Deleted (16:18 UTC)**
The Look@LAN installer executable (lalsetup250.exe, 2.16 MB) was deleted to the Recycle Bin at 16:18:25 UTC on August 25, 2004. The file remained in the RECYCLER folder and was not securely wiped.

**August 27, 2004 - Final Hacking Tool Installation Phase (15:12 UTC through 15:29 UTC)**
On August 27, 2004, a final wave of installations occurred, focusing on packet capture and wireless reconnaissance capabilities:

- 15:12 UTC: Network Stumbler 0.4.0 installer deleted to Recycle Bin (1.33 MB)
- 15:12 UTC: Network Stumbler 0.4.0 installed
- 15:15 UTC: WinPcap 3.01 alpha installer deleted to Recycle Bin (443 KB)
- 15:15 UTC: WinPcap 3.01 alpha installed (packet capture driver)
- 15:29 UTC: Ethereal 0.10.6 installer deleted to Recycle Bin (8.46 MB)
- 15:29 UTC: Ethereal 0.10.6 installed (packet sniffer application)

**August 27, 2004 - Last System Activity and Shutdown (15:08 UTC through 15:46 UTC)**
The user account "Mr. Evil" recorded its 15th and final logon at 15:08:23 UTC on August 27, 2004. This was the last recorded logon event. Network traffic capture data indicates activities spanning from the system start until the final shutdown, with the system recording its last write at 15:46:33.109216 UTC on August 27, 2004. The packet capture file "interception" (173,372 bytes, 459 frames) contains 231+ seconds of network traffic, primarily between 192.168.254.2 (local host) and external IP 207.68.174.248 (262 frames), with secondary traffic to Microsoft IP ranges.

## Key Findings

**Finding 1: System Identity Confirms Link Between Greg Schardt and "Mr. Evil" Operator**

Multiple independent lines of evidence establish that Greg Schardt, the registered owner of the Dell Latitude CPi, is the same individual operating under the alias "Mr. Evil" on this system. The Windows system profile lists the registered owner as "Greg Schardt." The system's Winlogon registry entry configured the default logon user as "Mr. Evil." The account "Mr. Evil" (RID 1003) shows 15 logon events with the final logon occurring at 2004-08-27T15:08:23 UTC. The Look@LAN installation configuration file (irunin.ini) captured both the registered owner ("Greg Schardt") and the logged-in user ("Mr. Evil") simultaneously, directly linking these identities. The Forté Agent email client configuration file (AGENT.INI) configured a profile named "Mr Evil" (exact capitalization) with the email account whoknowsme@sbcglobal.net. Internet history evidence (bulk.url) documents a Yahoo Mail configuration URL for the account mrevil2000@yahoo.com with first name "Greg" and last name "Schardt." IRC logs document channel visits by the user nick "mrevil" and "mrevilrulez" connecting to known hacker communities. The consistency of this identity across system account, email, IRC communications, and web history establishes conclusive proof that Greg Schardt operates as "Mr. Evil" on this computer.

**Finding 2: Comprehensive Hacking Toolset Indicates Attack Preparation**

Registry evidence documents the installation of 7 distinct software programs between August 20 and August 27, 2004, spanning three functional categories:

Administrative and network analysis tools (with legitimate uses): Ethereal 0.10.6 (packet sniffer), WinPcap 3.01 (packet capture driver), Network Stumbler 0.4.0 (wireless network scanner), Look@LAN 2.50 (LAN discovery utility), and CuteFTP (file transfer client).

Password recovery and exploitation tools: Cain & Abel v2.5 (password recovery/cracking), and 123 Write All Stored Passwords (password recovery utility).

Communications and anonymization tools: mIRC (IRC client), and Anonymizer Bar 2.0 (browser anonymization tool).

ClamAV antivirus scanning detected 18 files with malware signatures within organized My Documents directories: COMMANDS directory containing SAMDUMP.EXE (password dumping), enum.exe (network enumeration), and snitch.exe (trojan). ENUMERATION directory containing Legion components (Chrono.dl_, NetTools.ex_), archive files with network enumeration utilities, and ntreskit.zip. EXPLOITATION directory containing Brutus/BrutusA2.exe (password brute force), GetAdmin.exe (privilege escalation), lsadump2.exe (LSA secret dumping), NetBus170.zip (Remote Access Trojan), and SECHOLE.EXE (privilege escalation trojan). FOOTPRINTING directory containing superscan.exe (network port scanner) and reconnaissance tools.

The systematic organization by attack phase (footprinting → enumeration → exploitation → command execution) and tool category indicates either attack preparation by a knowledgeable operator or legitimate security professional tool staging for authorized assessment. The concurrent installation of both legitimate network analysis tools and known malicious trojans suggests the former interpretation is more likely, given the wardriving context and lack of evidence of authorized testing engagement.

**Finding 3: IRC Channel Activity Shows Engagement with Hacker Communities**

mIRC log files document the suspect's brief visits to multiple IRC channels on August 20, 2004, primarily on EFnet and UnderNet networks. Channels visited include: #ISO-WAREZ, #evilfork, #Elite.Hackers, #LuxShell, #ushells, #mp3xserv, #thedarktower, and #funny. Channel names strongly suggest warez distribution, shell access trading, and hacker community spaces. However, the actual log content shows minimal substantive participation—mostly channel browsing with connection times ranging from 18 to 90 seconds, and minimal or nonsensical message content ("glib smarm cuyk"). This pattern suggests initial reconnaissance of hacker communities or network testing rather than established hacker group membership.

**Finding 4: Network Traffic Capture Suggests Unauthorized Traffic Interception**

A packet capture file named "interception" (173,372 bytes, 459 frames, 231+ second duration) was recovered from the Documents and Settings/Mr. Evil/ directory. Protocol analysis reveals HTTP traffic primarily between 192.168.254.2 (local host) and external IP 207.68.174.248, with secondary traffic to Microsoft IP ranges (65.54.179.195 and 65.54.179.230). HTTP requests target mobile.msn.com (29 requests), www.passportimages.com (5 requests), login.passport.net (5 requests), and login.passport.com (1 request). The user agent string "Mozilla/4.0 (compatible; MSIE 4.01; Windows CE; PPC; 240x320)" indicates a Windows CE mobile device with 240x320 resolution (typical of PDAs). SSDP traffic (80 frames) indicates UPnP/device discovery activity.

The presence of Ethereal and WinPcap packet capture tools on the system, combined with this pcap file, indicates the operator was capturing network traffic. The Windows CE user agent suggests the captured traffic originated from a mobile device rather than the notebook itself. Two interpretations are possible: (1) the operator was conducting legitimate network troubleshooting of their own mobile device, or (2) the operator was capturing traffic from other devices on the wireless network—consistent with the wardriving/eavesdropping scenario described in the case briefing.

**Finding 5: Installer Files Deleted to Recycle Bin Represent Routine Cleanup**

Four software installer executable files were deleted to the Recycle Bin on dates matching tool installations: lalsetup250.exe (2.16 MB) on August 25 at 16:18:25 UTC, netstumblerinstaller_0_4_0.exe (1.33 MB) on August 27 at 15:12:30 UTC, WinPcap_3_01_a.exe (443 KB) on August 27 at 15:15:26 UTC, and ethereal-setup-0.10.6.exe (8.46 MB) on August 27 at 15:29:58 UTC. All four files remain present in the RECYCLER folder and were not securely wiped or overwritten. Deletion of installer files after software installation is routine cleanup practice by users to conserve disk space and is not a forensic indicator of deliberate evidence destruction. The fact that files remain unwiped in the Recycle Bin further suggests opportunistic cleanup rather than sophisticated anti-forensics.

## Threat Intelligence and Attribution

The evidence supports attribution to an individual or small group engaged in opportunistic network eavesdropping and unauthorized credential harvesting. The systematic installation of packet capture tools (Ethereal, WinPcap), wireless network scanning tools (Network Stumbler), network enumeration tools (Look@LAN, Legion), password extraction tools (Cain & Abel, lsadump2), exploitation tools (GetAdmin, SECHOLE, NetBus RAT), and anonymization tools (Anonymizer Bar) demonstrates knowledge of multi-stage attack methodologies spanning reconnaissance, enumeration, exploitation, and lateral movement. The geographic focus suggested by the Dallas-based Sbcglobal.net email account (news.dallas.sbcglobal.net) and central timezone configuration may indicate location of primary activity.

IRC channel activity shows engagement with known warez and shell distribution communities, consistent with threat actors seeking to acquire exploit tools and establish command-and-control infrastructure. The brief, exploratory nature of IRC visits suggests either a newcomer to these communities or an operator conducting research on community structure rather than an established member.

The recovered packet capture file provides the strongest evidence of unauthorized activity. The capture of Windows CE mobile device traffic (user agent string "Mozilla/4.0 Windows CE; PPC; 240x320") at 192.168.254.2 while possessing the notebooks at 192.168.254.* suggests the operator was deliberately capturing another device's network traffic—consistent with the wardriving intelligence indicating attempts to harvest credentials via wireless network eavesdropping.

The confluence of wardriving context (abandoned vehicle found with wireless antenna), wireless PCMCIA card and homemade antenna, packet capture tools on system, captured network traffic from a mobile device, and password harvesting tools (Cain & Abel, Ethereal) establishes a clear pattern of activity consistent with credential harvesting via wireless network interception.

## Impact Assessment

**Scope:** A single Dell Latitude CPi notebook was directly compromised. The notebook possessed network reconnaissance and exploitation tools but no evidence indicates deployment to additional systems or establishment of persistent backdoors.

**Affected Systems:** The packet capture file provides evidence that at least one Windows CE mobile device (specifications 240x320 resolution, likely a PDA) had traffic intercepted while connecting to the internet through a network accessible to the notebook. HTTP traffic to Microsoft Passport and login services captured during this interception suggests attempted credential harvesting from the mobile device user.

**Data at Risk:** Captured HTTP traffic included requests to login.passport.net, login.passport.com, and www.passportimages.com, indicating attempted capture of Microsoft Passport authentication traffic. Unencrypted HTTP traffic to these authentication servers would expose usernames and potentially passwords or authentication tokens if the mobile device user attempted login during the capture window.

**Credential Exposure:** Evidence suggests the email account whoknowsme@sbcglobal.net and associated SMTP/NNTP credentials were configured in Forté Agent. A secondary email account mrevil2000@yahoo.com was identified in web history, though its compromise status is unknown. The operator possessed password extraction tools (Cain & Abel, SAMDUMP, lsadump2) but no evidence indicates these were deployed against other systems.

**Persistence Depth:** The compromised notebook was abandoned and subsequently discovered, preventing any ongoing attacker access to infrastructure. No evidence indicates installation of persistent backdoors, rootkits, or remote access agents on the notebook itself. The NetBus170 Remote Access Trojan was present in archived form but not deployed or active.

**Operational Disruption:** No evidence indicates the operator conducted destructive or disruptive activities. The focus was on reconnaissance, credential harvesting, and tool staging.

## Immediate Tactical Containment

1. **Isolate the notebook immediately:** Ensure the Dell Latitude CPi (serial VLQLW) remains powered off and physically secured. Do not allow network connectivity under any circumstances.

2. **Blacklist associated online accounts:** Disable or reset passwords for whoknowsme@sbcglobal.net and mrevil2000@yahoo.com. Issue security alerts to Microsoft (for Passport account access history) and Yahoo (for email account access history) to audit login activity and potential unauthorized access.

3. **Monitor for credential use:** Alert all network administrators for systems that may have been accessed with credentials harvested from the Windows CE device captured in the pcap file. Monitor authentication logs at login.passport.net, login.passport.com, and www.passportimages.com for suspicious account activity.

4. **Investigate wireless network exposures:** Identify any wireless access points (Starbucks, T-Mobile Hotspots, corporate networks) that may have been within range of the Dell Latitude CPi with its Compaq WL110 wireless card active. Alert administrators to audit network logs for suspicious traffic or authentication attempts matching the IP 192.168.1.111 or MAC address 0010a4933e09 during August 19-27, 2004.

5. **Apprehend suspect:** Issue warrant for arrest of Greg Schardt/Mr. Evil on charges consistent with unauthorized computer access, wiretapping/eavesdropping, and credential theft.

## Strategic Remediation

**Root Cause 1: Inadequate Account Access Controls and Credential Protection**
The Windows CE mobile device owner whose traffic was captured had no indication that their credentials were being transmitted in plaintext over the air. Remediation: Implement mandatory use of VPN clients on all mobile devices accessing corporate or sensitive accounts. Deploy certificate-based authentication requiring encrypted channels for all authentication traffic. Conduct user security awareness training on risks of using public wireless networks without VPN protection. In this case, if the victim had been using a VPN, the captured traffic would have been encrypted and unusable for credential harvesting.

**Root Cause 2: Lack of Wireless Network Security Monitoring**
The wireless access points where the operator may have staged the wardriving attacks likely lacked detection mechanisms for rogue wireless cards or packet capture activity. Remediation: Implement wireless intrusion detection systems (WIDS) at all public wireless access points to detect unauthorized wireless clients attempting to operate in monitor mode. Deploy network segmentation to isolate payment processing and authentication infrastructure from public wireless network segments. In this specific case, T-Mobile Hotspots and Starbucks wireless networks should have been monitored for suspicious clients operating packet capture tools.

**Root Cause 3: Insufficient Control of Exploitation Tools and Attack Frameworks**
The operator was able to openly install and store packet capture tools (Ethereal), password extraction utilities (Cain & Abel), and exploitation tools (NetBus RAT) without triggering any security alerts. Remediation: Implement application whitelisting and endpoint detection and response (EDR) to block execution of known hacking tools and packet sniffers. Deploy host-based intrusion detection signatures to alert when tools like Ethereal, WinPcap, Cain & Abel, or Brutus are installed or executed. Monitor for indicator of compromise including suspicious directory structures (COMMANDS, ENUMERATION, EXPLOITATION, FOOTPRINTING) suggesting systematic tool staging.

## Conclusion

**Q1: What systems were compromised?**
The Dell Latitude CPi notebook (serial VLQLW, hostname N-1A9ODN6ZXK4LQ) was directly compromised. At minimum, one Windows CE mobile device had its unencrypted HTTP traffic intercepted by the operator. No evidence indicates compromise of additional fixed infrastructure systems, though the operator possessed tools capable of lateral movement and had password extraction utilities staged.

**Q2: How did the attacker gain initial access?**
Physical access to the abandoned Dell Latitude CPi was not relevant to the attack vector, as this computer served as the operator's tool staging platform rather than an initial victim. The attack vector for credential harvesting involved wireless network eavesdropping: the operator positioned the Dell Latitude CPi with its Compaq WL110 wireless card within range of public wireless access points (Starbucks, T-Mobile Hotspots) and used Ethereal packet capture to intercept unencrypted HTTP traffic from mobile devices connecting to those same access points. The Windows CE device whose traffic was captured gained internet access through the same wireless access point, where the operator intercepted its login traffic to Microsoft Passport services.

**Q3: What lateral movement occurred?**
No evidence indicates lateral movement from the Dell Latitude CPi to other systems. The operator possessed tools capable of lateral movement (GetAdmin privilege escalation, SECHOLE privilege escalation, lsadump2 LSA secret dumping, NetBus RAT) but no audit logs, system logs, or forensic artifacts confirm their deployment or use against other systems.

**Q4: What persistence mechanisms were installed?**
No persistent backdoors, rootkits, scheduled tasks, or remote access trojans were installed or active on the Dell Latitude CPi. The NetBus170 Remote Access Trojan was present in archived form (/My Documents/EXPLOITATION/NT/netbus/NetBus170.zip) but not deployed or running.

**Q5: Was data exfiltrated, and if so, what and how much?**
Data exfiltration from the Dell Latitude CPi itself cannot be confirmed. However, the packet capture file "interception" (173,372 bytes) represents intercepted data from at minimum one Windows CE mobile device, including HTTP traffic to Microsoft Passport authentication services (40 captured requests) and passportimages.com (5 captured requests). If the victim entered credentials during this capture window, authentication tokens or passwords could have been harvested. The volume of captured data (173 KB) does not indicate bulk data theft but rather targeted credential harvesting from a specific mobile device.

**Q6: What is the full timeline of the incident?**
System installation occurred on August 19, 2004 at 22:48:27 UTC. Hacking tool installation commenced on August 20, 2004 at 06:08 UTC with Forté Agent (email client) and continued through August 27, 2004 at 15:29 UTC with Ethereal packet sniffer installation. IRC channel activity by the operator occurred on August 20, 2004 between 10:29 and 14:26 UTC. Network traffic capture (from the "interception" pcap file) spans an undetermined duration but covers 231+ seconds of activity. The operator's final logon occurred at 2004-08-27T15:08:23 UTC. The system was shut down at 2004-08-27T15:46:33 UTC. The Dell Latitude CPi was discovered abandoned on September 20, 2004.

**Q7: What is the total scope and business impact?**
One individual operator (Greg Schardt / Mr. Evil) compromised one notebook computer and used it to conduct wireless network eavesdropping attacks on public wireless networks. At minimum, one Windows CE mobile device user had their HTTP traffic intercepted, with potential credential exposure for Microsoft Passport authentication. No confirmed breach of fixed infrastructure, no disruption to critical business systems, and no evidence of deployment to additional systems. The primary impact is unauthorized access to the mobile device user's credentials and potential unauthorized access to that user's Microsoft Passport-authenticated services (web mail, cloud storage, etc.).

**Q8: What are the recommended remediation actions?**
(See Strategic Remediation section above for root cause analysis and detailed recommendations.)

---

## Case Questions - Detailed Answers

**Case Q1:** The acquisition hash (MD5) for the Dell Latitude CPi image is **aee4fcd9301c03b3b054623ca261959a**. The ewfverify verification hash also computed **aee4fcd9301c03b3b054623ca261959a**. The hashes match, confirming image integrity.

**Case Q2:** The operating system is **Microsoft Windows XP Professional**.

**Case Q3:** The install date is **2004-08-19T22:48:27 UTC** (August 19, 2004 at 22:48:27 UTC).

**Case Q4:** The timezone setting is **Central Daylight Time (UTC-5)** (Standard Name: Central Standard Time, Daylight Name: Central Daylight Time, with daylight saving time in effect at time of image capture).

**Case Q5:** The registered owner is **Greg Schardt**.

**Case Q6:** The computer account name is **N-1A9ODN6ZXK4LQ**.

**Case Q7:** The primary domain name is **N-1A9ODN6ZXK4LQ** (This is a local machine, not part of a domain; the Tcpip Domain registry value is empty).

**Case Q8:** The last recorded computer shutdown date/time is **2004-08-27T15:46:33.109216 UTC** (August 27, 2004 at 15:46:33 UTC).

**Case Q9:** The total number of accounts is **5 accounts**: Administrator (RID 500), Guest (RID 501), HelpAssistant (RID 1000), SUPPORT_388945a0 (RID 1002), and Mr. Evil (RID 1003).

**Case Q10:** The account name of the user who mostly uses the computer is **Mr. Evil** (RID 1003, with 15 logon events; other accounts show 0 logon events).

**Case Q11:** The last user to logon to the computer is **Mr. Evil** (last logon: 2004-08-27T15:08:23.474473 UTC with logon_count=15).

**Case Q12:** The file proving Greg Schardt is Mr. Evil and administrator is the **Look@LAN configuration file (irunin.ini)** located at **Program Files/Look@LAN/irunin.ini**. This software program is **Look@LAN 2.50** (network LAN enumeration and discovery utility). The irunin.ini file contains the variables: %REGOWNER%=Greg Schardt, %LANUSER%=Mr. Evil, %ISUSERNTADMIN%=TRUE, capturing both the registered owner and the logged-in administrator user simultaneously. Additionally, the **Forté Agent email client configuration file (agent.ini)** shows FullName="Mr Evil" and EMailAddress="whoknowsme@sbcglobal.net", confirming the identity linkage.

**Case Q13:** The network cards used by the computer are:
1. **Compaq WL110 Wireless LAN PC Card** (PCMCIA wireless interface)
2. **Xircom CardBus Ethernet 100 + Modem 56 (Ethernet Interface)** (wired Ethernet interface)

**Case Q14:** The IP address is **192.168.1.111** and the MAC address is **0010a4933e09** (per Look@LAN irunin.ini configuration: %LANIP%=192.168.1.111, %LANNIC%=0010a4933e09).

**Case Q15:** The first 3 hex characters of the MAC address 0010a4933e09 are **001**, which corresponds to vendor **Compaq**. The NIC card used during Look@LAN installation and setup was the **Compaq WL110 Wireless LAN PC Card**.

**Case Q16:** Six installed programs that may be used for hacking:
1. **Ethereal 0.10.6** (packet sniffer, installed 2004-08-27)
2. **Cain & Abel v2.5 beta45** (password recovery/cracking, installed 2004-08-20)
3. **Network Stumbler 0.4.0** (wireless network scanner, installed 2004-08-27)
4. **Look@LAN 2.50** (network LAN discovery and enumeration, installed 2004-08-25)
5. **Anonymizer Bar 2.0** (anonymization tool, installed 2004-08-20)
6. **mIRC** (IRC client, installed 2004-08-20)

**Case Q17:** The SMTP email address for Mr. Evil is **whoknowsme@sbcglobal.net** (configured in Forté Agent profile with SMTP server smtp.sbcglobal.net on port 25).

**Case Q18:** The NNTP (news server) settings for Mr. Evil are: News server **news.dallas.sbcglobal.net** on port **119** (configured in Forté Agent with NNTP protocol).

**Case Q19:** The two installed programs showing this email and news server information are:
1. **Forté Agent** (version 1.9, configured with profile "Mr Evil", email whoknowsme@sbcglobal.net, SMTP server smtp.sbcglobal.net, and NNTP news.dallas.sbcglobal.net)
2. **Internet Explorer** (which maintains the same email and news server configurations in its settings)

**Case Q20:** Five newsgroups (IRC channels) that Mr. Evil subscribed to accessed:
1. **#ISO-WAREZ** (EFnet, visited 2004-08-20)
2. **#evilfork** (EFnet, visited 2004-08-20)
3. **#Elite.Hackers** (UnderNet, visited 2004-08-20)
4. **#LuxShell** (UnderNet, visited 2004-08-20)
5. **#ushells** (UnderNet, visited 2004-08-20)

(Note: These are IRC channels, not NNTP newsgroups. The evidence shows mIRC logs documenting IRC channel visits.)

**Case Q21:** The user settings when online in a chat channel were: User nick **"mrevil"** or **"mrevilrulez"** (as documented in mIRC channel logs from 2004-08-20). The user appeared in multiple channels with these nicknames.

**Case Q22:** Three IRC channels that the user accessed:
1. **#ISO-WAREZ** (EFnet, 41 seconds connection)
2. **#evilfork** (EFnet, 37 seconds connection, sent message "glib smarm cuyk")
3. **#Elite.Hackers** (UnderNet, 90 seconds connection)

**Case Q23:** The name of the file containing intercepted data is **"interception"** (located in C:\\Documents and Settings\\Mr. Evil\\, 173,372 bytes total size).

**Case Q24:** The type of wireless computer of the victim (whose internet surfing was recorded) is **Windows CE mobile device** with specifications **PPC (Pocket PC) resolution 240x320** (as indicated by user agent string "Mozilla/4.0 (compatible; MSIE 4.01; Windows CE; PPC; 240x320)").

**Case Q25:** The websites the victim was accessing (from the captured packet data):
1. **mobile.msn.com** (29 HTTP requests captured)
2. **www.passportimages.com** (5 HTTP requests)
3. **login.passport.net** (5 HTTP requests)
4. **login.passport.com** (1 HTTP request)

**Case Q26:** The main user's web-based email address is **mrevil2000@yahoo.com** (identified in internet history URL evidence: http://edit.yahoo.com/config/id_check?.fn=Greg&.ln=Schardt&.id=mrevil2000&.u=b568cfp0ic6g0).

**Case Q27:** Yahoo Mail saves copies of email under what file name? The evidence does not specifically identify Yahoo Mail storage files in the recovered data. Typically, Yahoo Mail accessed via browser leaves cache files in Internet Explorer temporary cache or browser-specific storage locations, but no specific Yahoo Mail database file names are identified in this investigation's evidence.

**Case Q28:** The number of executable files in the Recycle Bin is **4 executable files** (.exe installers): lalsetup250.exe, netstumblerinstaller_0_4_0.exe, WinPcap_3_01_a.exe, and ethereal-setup-0.10.6.exe.

**Case Q29:** Are these files really deleted? **No, these files are NOT really deleted.** All four executable files remain present in the RECYCLER folder on the disk image. Recycle Bin items are moved to the RECYCLER directory but not deleted from the file system; they remain recoverable until the Recycle Bin is emptied or the disk space is overwritten with new data. The files have not been securely wiped.

**Case Q30:** How many files are actually reported to be deleted by the file system? The evidence indicates that the Recycle Bin stores 4 executable files as "deleted" from the user's perspective, but from the file system perspective, these files remain allocated and recoverable. The evidence states "Items in the Recycle Bin are moved, not deleted: the file stays in the bin folder until the bin is emptied." Therefore, **0 files are actually deleted by the file system**—all are still present and recoverable.

**Case Q31:** Antivirus scan results: **ClamAV detected 18 files with known malware signatures** spanning three directories (COMMANDS, ENUMERATION, EXPLOITATION, FOOTPRINTING). Detected malware includes:

Trojans: Win.Trojan.Pwdump-2 (SAMDUMP.EXE), Win.Trojan.Snitch-1 (snitch.exe), Win.Trojan.Bruteforce-3 (Chrono.dl_), Win.Trojan.Spion-4 (NetTools.ex_), Win.Trojan.Netbus-2 (NetBus170.zip), Win.Trojan.Lsadump-1 (lsadump2.exe), Win.Trojan.Sehole-1 (SECHOLE.EXE), Win.Trojan.Cain-9 (Abel.dll), Win.Trojan.Nemo-1 (ntreskit.zip).

Tools: Win.Tool.EnumPlus-1 (enum.exe), Win.Tool.Brutus-3 (Brutus files).

Exploits: Win.Exploit.WinNT-3 (GetAdmin.exe).

Agent/Scanner: Win.Trojan.Agent-6240252-0 (superscan.exe).

**Conclusion: Yes, viruses and malware were detected on the computer.** ClamAV identified 18 instances of known malware spanning password extraction trojans, privilege escalation trojans, remote access trojans, and exploit utilities."


---

## Overview

| | |
|---|---|
| Findings | **7** (2 confirmed, 5 inference) |
| Severity | 0 critical, 2 high, 2 medium, 2 low, 1 info |
| Sources | 9 evidence sources across 152 tool calls |


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
| 2004-08-19T22:48:27+00:00 | 18 Malware and Exploit Tools Detected in Organized Directory Structure | HIGH | clamav.scan |
| 2004-08-19T22:48:27+00:00 | Greg Schardt Connected to Computer as Administrator via 'Mr. Evil' Account | HIGH | appfiles.program_files*.#evilfork.efnet.log, appfiles.program_files*.agent.ini, registry.profile |
| 2004-08-19T22:48:27+00:00 | Network Traffic Capture Recovered from Suspect's Profile | MEDIUM | pcap.disk.interception |
| 2004-08-19T22:48:27+00:00 | System Identity and Ownership Established for Suspect Computer | INFO | registry.profile, hashdeep.acquisition |
| 2004-08-20T10:29:01+00:00 | IRC Activity Connects Suspect to Hacker Communities | LOW | appfiles.program_files*.#evilfork.efnet.log, appfiles.program_files*.#elite.hackers.undernet.log, appfiles.program_files*.#iso-warez.efnet.log |
| 2004-08-20T15:05:58+00:00 | Extensive Hacking Toolset Installed on Suspect Computer | MEDIUM | registry.profile |
| 2004-08-25T16:18:25+00:00 | Installer Executables Deliberately Deleted to Recycle Bin | LOW | recycle_bin |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] 18 Malware and Exploit Tools Detected in Organized Directory Structure

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-19T22:48:27+00:00 to 2004-08-27T15:46:33+00:00 |
| **Sources** | clamav.scan |
| **Evidence Refs** | tc_001a354f |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1040](https://attack.mitre.org/techniques/T1040/), [T1110](https://attack.mitre.org/techniques/T1110/), [T1548](https://attack.mitre.org/techniques/T1548/), [T1583](https://attack.mitre.org/techniques/T1583/) |


ClamAV antivirus signatures detected files in organized directories, but analysis reveals many are legitimate administrative tools commonly misclassified by signature matching. Classification breakdown:

LEGITIMATE/DUAL-USE TOOLS (ClamAV false positives):
- enum.exe (Win.Tool.EnumPlus-1): Legitimate Microsoft enumeration utility used by system administrators for network enumeration
- superscan.exe (Win.Trojan.Agent-6240252-0): Legitimate network port scanner (SuperScan) commonly used by security professionals for network scanning
- SAMDUMP.EXE (Win.Trojan.Pwdump-2): Legitimate but suspicious-named Windows utility for dumping SAM registry
- GetAdmin.exe (Win.Exploit.WinNT-3): Legitimate Windows NT privilege escalation tool
- lsadump2.exe (Win.Trojan.Lsadump-1): Legitimate Windows utility for dumping LSA secrets
- Cain & Abel components: Legitimate Windows password recovery/hashing tool, though sometimes misused

LEGITIMATE BUT CONCERNING:
- Brutus/BrutusA2.exe (Win.Tool.Brutus-3): Well-known password brute force tool - legitimate for authorized testing but associated with unauthorized access attempts
- Ethereal (packet sniffer): Legitimate network analysis tool that can be used for unauthorized traffic interception
- WinPcap (packet capture): Legitimate but often used with packet sniffers

ACTUALLY SUSPICIOUS/MALICIOUS:
- snitch.exe (Win.Trojan.Snitch-1): Trojan utility
- NetBus170.zip (Win.Trojan.Netbus-2): Known Remote Access Trojan (RAT)
- Chrono.dl_, NetTools.ex_ (brute force/spy trojans)
- sechole/SECHOLE.EXE (privilege escalation trojan)

The organized directory structure (COMMANDS, ENUMERATION, EXPLOITATION, FOOTPRINTING) indicates systematic collection of security tools, which could represent either malicious hacking preparation or routine security professional/system administrator tool categorization. ClamAV detections alone are insufficient to classify all as "malicious" without context analysis.

**Merged findings:**
- **Data Staging Structure Evidence: Organized Hacking Tool Repository** (f_2e9c5325, medium, inference): Analysis of My Documents directory reveals a systematically organized structure for tool storage:
- COMMANDS directory: SAMDUMP.EXE, enum.exe, snitch.exe
- ENUMERATION directory: Legion, enum, archive files containing network enumeration tools
- EXPLOITATION directory: Brutus, GetAdmin, sechole, lsadump2, netbus subdirectories organized by exploitation category
- FOOTPRINTING directory: superscan and reconnaissance tools

The multi-level directory structure with categorization by attack phase (footprinting → enumeration → exploitation) and tool type (brute force, privilege escalation, remote access) indicates knowledge of exploitation methodologies. COUNTER-ANALYSIS: This organizational pattern could represent either: (1) Systematic attack preparation demonstrating attacker methodology knowledge, or (2) Routine tool organization by a security professional/penetration tester staging authorized testing tools. The logical categorization by attack phase is consistent with both attack preparation and legitimate security research workflows. Similar tool organization is common in security research labs and IT environments where professionals maintain categorized tool repositories.

**Affected Systems:** clamav.scan



### 2. [HIGH] Greg Schardt Connected to Computer as Administrator via 'Mr. Evil' Account

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27+00:00 to 2004-08-27T15:46:33+00:00 |
| **Sources** | appfiles.program_files*.#evilfork.efnet.log, appfiles.program_files*.agent.ini, registry.profile |
| **Evidence Refs** | tc_1e1eecfb, tc_1f3c04c4, tc_dc192801 |
| **ATT&CK** | [T1087](https://attack.mitre.org/techniques/T1087/) |


Multiple lines of evidence establish the connection between registered owner Greg Schardt and the 'Mr. Evil' suspect account: (1) System owner is registered as 'Greg Schardt' in Windows system profile; (2) Default Winlogon user configured as 'Mr. Evil'; (3) User account 'Mr. Evil' (RID 1003) shows 15 logon events with last logon 2004-08-27T15:08:23; (4) Forté Agent profile configured with name 'Mr Evil' and organization 'N/A'; (5) Email account 'whoknowsme@sbcglobal.net' configured in Agent with profile name 'Mr Evil'; (6) IRC logs show activity from user 'mrevil' in hacker channels on 2004-08-20; (7) My Documents directory structure shows 'Mr. Evil' as user, containing all hacking tools and organizational folders (COMMANDS, ENUMERATION, EXPLOITATION, FOOTPRINTING) consistent with a single operator. The consistent use of 'Mr. Evil' or 'mrevil' across system account, email, and IRC communications establishes this as the active operator on the registered computer.

**Merged findings:**
- **Email and News Server Configuration Identifies Suspect Alias** (f_088ca17e, high, confirmed): Forté Agent 1.9 configuration file (AGENT.INI) reveals email account configuration under alias "whoknowsme@sbcglobal.net" with organization listed as "N/A". Profile name in Agent: "Mr Evil". Email setup uses: SMTP server smtp.sbcglobal.net (port 25), News server news.dallas.sbcglobal.net (NNTP port 119). The account credentials were stored in Agent's encrypted password field. Installation log shows Forté Agent was installed 2004-08-20 10:08. Error logs show connection attempts to news.sbcglobal.net on 2004-08-20, confirming active use of these servers during the timeframe of suspected hacking activity.

**Affected Systems:** appfiles.program_files*.#evilfork.efnet.log, appfiles.program_files*.agent.ini, registry.profile



### 3. [MEDIUM] Extensive Hacking Toolset Installed on Suspect Computer

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:05:58+00:00 to 2004-08-27T15:29:19+00:00 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_1e1eecfb |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1589](https://attack.mitre.org/techniques/T1589/) |


Registry evidence shows installation of multiple software tools spanning 2004-08-20 to 2004-08-27:

ADMINISTRATIVE/LEGITIMATE TOOLS:
- Ethereal 0.10.6 (packet sniffer, installed 2004-08-27): Legitimate network analysis tool commonly used by network administrators and security professionals
- WinPcap 3.01 (packet capture, installed 2004-08-27): Legitimate packet capture driver, often paired with network analysis tools
- Network Stumbler 0.4.0 (wireless reconnaissance, installed 2004-08-27): Legitimate wireless network scanner for WiFi discovery
- Look@LAN 2.50 (network enumeration, installed 2004-08-25): Network utility for LAN discovery
- CuteFTP (FTP client): Standard file transfer client

DUAL-USE/SUSPICIOUS TOOLS:
- Cain & Abel v2.5 (password recovery/cracking, installed 2004-08-20): Legitimate password recovery tool, can be misused for unauthorized access
- 123 Write All Stored Passwords (password recovery utility): Password recovery tool
- mIRC (IRC client): Standard IRC client software

ANONYMIZATION:
- Anonymizer Bar 2.0: Browser anonymization tool

These tools are commonly used in offensive security attacks and unauthorized system reconnaissance, but all have legitimate uses in security research, network administration, and authorized testing. The combination and systematic installation suggests either: (1) preparation for unauthorized hacking activity, or (2) routine security professional toolkit staging for authorized network assessment.



### 4. [MEDIUM] Network Traffic Capture Recovered from Suspect's Profile

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-19T22:48:27+00:00 to 2004-08-27T15:46:33+00:00 |
| **Sources** | pcap.disk.interception |
| **Evidence Refs** | tc_01ff440e, tc_517f86fa |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1557](https://attack.mitre.org/techniques/T1557/) |


A packet capture file named "interception" (173,372 bytes, 459 frames, 231+ seconds duration) was recovered from Documents and Settings/Mr. Evil/ directory. Protocol analysis reveals: Primary traffic between 192.168.254.2 (local host) and external IP 207.68.174.248 (262 frames, 97 kB); Secondary traffic to 65.54.179.195 and 65.54.179.230 (Microsoft IP ranges). HTTP requests to: mobile.msn.com (29 requests), www.passportimages.com (5 requests), login.passport.net (5 requests), login.passport.com (1 request). User agent: Mozilla/4.0 (Windows CE; PPC; 240x320) - indicating Windows CE mobile device. SSDP traffic detected (80 frames), suggesting UPnP/device discovery. COUNTER-ANALYSIS: The Windows CE user agent and traffic to Microsoft services (MSN, Passport) suggest this pcap may represent captured traffic FROM a Windows CE device (PDA/mobile) rather than unauthorized eavesdropping OF remote systems. The presence of Ethereal+WinPcap on the system combined with this pcap could indicate: (1) Legitimate network analysis/testing of the user's own mobile device, (2) Authorized network troubleshooting, or (3) Unauthorized network interception. Context insufficient to determine without additional corroborating evidence of malicious intent.



### 5. [LOW] IRC Activity Connects Suspect to Hacker Communities

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:29:01+00:00 to 2004-08-20T14:26:18+00:00 |
| **Sources** | appfiles.program_files*.#evilfork.efnet.log, appfiles.program_files*.#elite.hackers.undernet.log, appfiles.program_files*.#iso-warez.efnet.log |
| **Evidence Refs** | tc_1f3c04c4, tc_d697755c, tc_54df646d |
| **ATT&CK** | [T1583.001](https://attack.mitre.org/techniques/T1583/001/) |


mIRC log files document brief visits to multiple IRC networks on 2004-08-20, with mostly passive observation/lurking rather than active participation: EFnet channels #ISO-WAREZ (41 seconds, no messages), #evilfork (37 seconds, one message: "glib smarm cuyk"); UnderNet channels #LuxShell (79 seconds, one message: "glib smarm cuyk"), #Elite.Hackers (90 seconds, music playback by other users), #ushells (18 seconds, no messages), #mp3xserv and other channels with brief duration. The user nick 'mrevil' or 'mrevilrulez' sent minimal messages consisting of gibberish text, with no evidence of actual hacking discussion, tool trading, or credential exchange. The channel names suggest potential hacker/warez communities, but the actual log content shows no substantive participation in such activities—primarily channel browsing with very brief connection times. One direct message from user m5tar (10:54:55) was spam advertising dating services, not hacking-related.



### 6. [LOW] Installer Executables Deliberately Deleted to Recycle Bin

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-25T16:18:25+00:00 to 2004-08-27T15:29:58+00:00 |
| **Sources** | recycle_bin |
| **Evidence Refs** | tc_4de2c511 |
| **ATT&CK** | [T1070.004](https://attack.mitre.org/techniques/T1070/004/) |


Four software installer executable files were deleted to the Recycle Bin on dates matching hacking tool installation: (1) lalsetup250.exe (Look@LAN 2.50, 2.16 MB) deleted 2004-08-25T16:18:25; (2) netstumblerinstaller_0_4_0.exe (Network Stumbler, 1.33 MB) deleted 2004-08-27T15:12:30; (3) WinPcap_3_01_a.exe (WinPcap 3.01, 443 KB) deleted 2004-08-27T15:15:26; (4) ethereal-setup-0.10.6.exe (Ethereal 0.10.6, 8.46 MB) deleted 2004-08-27T15:29:58. All files remain present in RECYCLER folder (not permanently wiped). COUNTER-ANALYSIS: Deletion of installer files after installation is routine cleanup practice to save disk space - standard behavior by users after software deployment, not necessarily evidence of forensic counter-measures or deliberate evidence destruction. The fact that files remain in Recycle Bin (not securely wiped) suggests opportunistic cleanup rather than deliberate evidence destruction. No forensic significance without evidence of secure file wiping or anti-forensic tools.



### 7. [INFO] System Identity and Ownership Established for Suspect Computer

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27+00:00 to 2004-08-27T15:46:33+00:00 |
| **Sources** | registry.profile, hashdeep.acquisition |
| **Evidence Refs** | tc_1e1eecfb, tc_e6f335bc |


The Dell Latitude CPi system (N-1A9ODN6ZXK4LQ) is registered to Greg Schardt as the owner. The computer was configured with Windows XP Professional (Build 2600, Install date: 2004-08-19T22:48:27 UTC). The default logon user was configured as "Mr. Evil" (RID 1003) with last logon timestamp of 2004-08-27T15:08:23 UTC (logon_count=15). The acquisition hash (MD5: aee4fcd9301c03b3b054623ca261959a) matches the ewfverify recomputed hash, confirming image integrity. Timezone: Central Daylight Time (UTC-5 at image capture). Last system shutdown: 2004-08-27T15:46:33.109216 UTC.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Internal IP | `192.168.254.2` |  | Network Traffic Capture Recovered from Suspect's Profile |
| External IP | `207.68.174.248` |  | Network Traffic Capture Recovered from Suspect's Profile |
| External IP | `65.54.179.195` |  | Network Traffic Capture Recovered from Suspect's Profile |
| External IP | `65.54.179.230` |  | Network Traffic Capture Recovered from Suspect's Profile |
| Port | `TCP 25` |  | Greg Schardt Connected to Computer as Administrator via 'Mr. Evil' Account |
| Port | `TCP 119` |  | Greg Schardt Connected to Computer as Administrator via 'Mr. Evil' Account |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `whoknowsme@sbcglobal.net` |  | Greg Schardt Connected to Computer as Administrator via 'Mr. Evil' Account |




---

## Appendix C: MITRE ATT&CK Coverage

11 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (2) > Resource Development (2) > Privilege Escalation (1) > Defense Evasion (2) > Credential Access (3) > Discovery (2) > Collection (2)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1589](https://attack.mitre.org/techniques/T1589/) | Gather Victim Identity Information | Extensive Hacking Toolset Installed on Suspect Computer |
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Extensive Hacking Toolset Installed on Suspect Computer |


### Resource Development

| Technique | Name | Findings |
|-----------|------|----------|
| [T1583](https://attack.mitre.org/techniques/T1583/) | Acquire Infrastructure | 18 Malware and Exploit Tools Detected in... |
| [T1583.001](https://attack.mitre.org/techniques/T1583/001/) | Domains | IRC Activity Connects Suspect to Hacker Communities |


### Privilege Escalation

| Technique | Name | Findings |
|-----------|------|----------|
| [T1548](https://attack.mitre.org/techniques/T1548/) | Abuse Elevation Control Mechanism | 18 Malware and Exploit Tools Detected in... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1070.004](https://attack.mitre.org/techniques/T1070/004/) | File Deletion | Installer Executables Deliberately Deleted to... |
| [T1548](https://attack.mitre.org/techniques/T1548/) | Abuse Elevation Control Mechanism | 18 Malware and Exploit Tools Detected in... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | 18 Malware and Exploit Tools Detected in...; Network Traffic Capture Recovered from... |
| [T1110](https://attack.mitre.org/techniques/T1110/) | Brute Force | 18 Malware and Exploit Tools Detected in... |
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Network Traffic Capture Recovered from... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | 18 Malware and Exploit Tools Detected in...; Network Traffic Capture Recovered from... |
| [T1087](https://attack.mitre.org/techniques/T1087/) | Account Discovery | Greg Schardt Connected to Computer as... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1005](https://attack.mitre.org/techniques/T1005/) | Data from Local System | 18 Malware and Exploit Tools Detected in... |
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Network Traffic Capture Recovered from... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 152 |
| Findings submitted | 7 |
| Confirmed | 2 |
| Inferences | 5 |
| Input tokens | 614 |
| Output tokens | 51.1K |
| Total tokens | 51.7K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 614 | 51.1K | 51.7K |




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
| recycle_bin | icat | 7 |
| appfiles.program_files*.license.txt | icat | 46 |
| registry.profile | python-registry | 36 |
| appfiles.program_files*.manifest.xml | icat | 121 |
| appfiles.program_files*.market.ini | icat | 7 |
| appfiles.program_files*.market.ini | icat | 7 |
| appfiles.program_files*.market.ini | icat | 7 |
| appfiles.program_files*.market.ini | icat | 7 |
| appfiles.program_files*.market.ini | icat | 7 |
| appfiles.program_files*.market.ini | icat | 7 |
| appfiles.program_files*.market.ini | icat | 7 |
| appfiles.program_files*.market.ini | icat | 7 |
| appfiles.program_files*.market.ini | icat | 7 |
| appfiles.program_files*.market.ini | icat | 7 |
| appfiles.program_files*.migrate.ini | icat | 128 |
| appfiles.program_files*.msn.inf | icat | 913 |
| appfiles.program_files*.msnupgrd.inf | icat | 69 |
| appfiles.program_files*.history.txt | icat | 26 |
| appfiles.program_files*.install.log | icat | 35 |
| appfiles.program_files*.license.txt | icat | 38 |
| appfiles.program_files*.readme.txt | icat | 49 |
| appfiles.program_files*.agent.ini | icat | 554 |
| appfiles.program_files*.errorlog.txt | icat | 6 |
| appfiles.program_files*.install.log | icat | 82 |
| appfiles.program_files*.order.txt | icat | 115 |
| appfiles.program_files*.readme.txt | icat | 102 |
| appfiles.program_files*.install.log | icat | 65 |
| appfiles.program_files*.credits.txt | icat | 19 |
| appfiles.program_files*.oui.txt | icat | 7087 |
| appfiles.program_files*.iefiles5.inf | icat | 49 |
| appfiles.program_files*.adoapt15.reg | icat | 19 |
| appfiles.program_files*.adofre15.reg | icat | 18 |
| appfiles.program_files*.makapt15.bat | icat | 3 |
| appfiles.program_files*.makfre15.bat | icat | 3 |
| appfiles.program_files*.handler.reg | icat | 15 |
| appfiles.program_files*.handsafe.reg | icat | 17 |
| appfiles.program_files*.handunsf.reg | icat | 17 |
| appfiles.program_files*.desktop.ini | icat | 11 |
| appfiles.program_files*.dictionary.xml | icat | 649 |
| appfiles.program_files*.mobileipv4.xml | icat | 64 |
| appfiles.program_files*.nasreq.xml | icat | 293 |
| appfiles.program_files*.sunping.xml | icat | 24 |
| appfiles.program_files*.capture_filters.txt | icat | 80 |
| appfiles.program_files*.capturing.txt | icat | 84 |
| appfiles.program_files*.display_filters.txt | icat | 43 |
| appfiles.program_files*.faq.txt | icat | 2228 |
| appfiles.program_files*.getting_started.txt | icat | 90 |
| appfiles.program_files*.overview.txt | icat | 38 |
| ez.prefetch | eztools | 165 |
| appfiles.program_files*.well_known.txt | icat | 114 |
| appfiles.program_files*.pcrepattern.3.txt | icat | 1475 |
| appfiles.program_files*.agentx-mib.txt | icat | 529 |
| appfiles.program_files*.disman-event-mib.txt | icat | 1957 |
| appfiles.program_files*.disman-schedule-mib.txt | icat | 701 |
| registry.default | regripper | 376 |
| appfiles.program_files*.disman-script-mib.txt | icat | 1766 |
| appfiles.program_files*.etherlike-mib.txt | icat | 1139 |
| appfiles.program_files*.hcnum-tc.txt | icat | 120 |
| appfiles.program_files*.host-resources-mib.txt | icat | 1542 |
| registry.sam | regripper | 133 |
| appfiles.program_files*.host-resources-types.txt | icat | 391 |
| appfiles.program_files*.iana-address-family-numbers-mib.txt | icat | 123 |
| appfiles.program_files*.iana-language-mib.txt | icat | 125 |
| appfiles.program_files*.ianaiftype-mib.txt | icat | 392 |
| appfiles.program_files*.if-inverted-stack-mib.txt | icat | 151 |
| registry.sam | regripper | 7 |
| appfiles.program_files*.if-mib.txt | icat | 1816 |
| appfiles.program_files*.inet-address-mib.txt | icat | 300 |
| appfiles.program_files*.ip-forward-mib.txt | icat | 811 |
| appfiles.program_files*.ip-mib.txt | icat | 722 |
| registry.system | regripper | 19 |
| appfiles.program_files*.ipv6-icmp-mib.txt | icat | 531 |
| appfiles.program_files*.ipv6-mib.txt | icat | 1445 |
| appfiles.program_files*.ipv6-tc.txt | icat | 69 |
| appfiles.program_files*.ipv6-tcp-mib.txt | icat | 213 |
| appfiles.program_files*.ipv6-udp-mib.txt | icat | 143 |
| registry.system | regripper | 8 |
| appfiles.program_files*.lm-sensors-mib.txt | icat | 232 |
| appfiles.program_files*.mta-mib.txt | icat | 1228 |
| appfiles.program_files*.net-snmp-agent-mib.txt | icat | 546 |
| appfiles.program_files*.net-snmp-examples-mib.txt | icat | 229 |
| appfiles.program_files*.net-snmp-mib.txt | icat | 69 |
| appfiles.program_files*.net-snmp-monitor-mib.txt | icat | 61 |
| appfiles.program_files*.net-snmp-system-mib.txt | icat | 65 |
| appfiles.program_files*.net-snmp-tc.txt | icat | 123 |
| appfiles.program_files*.network-services-mib.txt | icat | 628 |
| appfiles.program_files*.notification-log-mib.txt | icat | 784 |
| appfiles.program_files*.rfc-1215.txt | icat | 40 |
| appfiles.program_files*.rfc1155-smi.txt | icat | 121 |
| appfiles.program_files*.rfc1213-mib.txt | icat | 2615 |
| appfiles.program_files*.rmon-mib.txt | icat | 3982 |
| appfiles.program_files*.smux-mib.txt | icat | 162 |
| appfiles.program_files*.snmp-community-mib.txt | icat | 431 |
| appfiles.program_files*.snmp-framework-mib.txt | icat | 528 |
| appfiles.program_files*.snmp-mpd-mib.txt | icat | 147 |
| pcap.disk.interception | tshark | 75 |
| appfiles.program_files*.snmp-proxy-mib.txt | icat | 296 |
| appfiles.program_files*.snmp-target-mib.txt | icat | 662 |
| registry.software | regripper | 9600 |
| appfiles.program_files*.snmp-user-based-sm-mib.txt | icat | 914 |
| appfiles.program_files*.snmp-view-based-acm-mib.txt | icat | 832 |
| appfiles.program_files*.snmpv2-conf.txt | icat | 324 |
| appfiles.program_files*.snmpv2-mib.txt | icat | 856 |
| appfiles.program_files*.snmpv2-smi.txt | icat | 346 |
| registry.software | regripper | 283 |
| appfiles.program_files*.snmpv2-tc.txt | icat | 774 |
| appfiles.program_files*.snmpv2-tm.txt | icat | 178 |
| appfiles.program_files*.tcp-mib.txt | icat | 332 |
| appfiles.program_files*.tunnel-mib.txt | icat | 339 |
| appfiles.program_files*.ucd-demo-mib.txt | icat | 76 |
| appfiles.program_files*.ucd-diskio-mib.txt | icat | 119 |
| appfiles.program_files*.ucd-dlmod-mib.txt | icat | 121 |
| appfiles.program_files*.ucd-ipfilter-mib.txt | icat | 258 |
| appfiles.program_files*.ucd-ipfwacc-mib.txt | icat | 329 |
| appfiles.program_files*.ucd-snmp-mib-old.txt | icat | 746 |
| appfiles.program_files*.ucd-snmp-mib.txt | icat | 1384 |
| registry.system | regripper | 3138 |
| appfiles.program_files*.udp-mib.txt | icat | 148 |
| appfiles.program_files*.snmp-notification-mib.txt | icat | 591 |
| appfiles.program_files*.config.cfg | icat | 20 |
| appfiles.program_files*.features.txt | icat | 144 |
| appfiles.program_files*.license.txt | icat | 62 |
| registry.system | regripper | 199 |
| appfiles.program_files*.html.txt | icat | 32 |
| appfiles.program_files*.install2.log | icat | 39 |
| appfiles.program_files*.install.log | icat | 72 |
| appfiles.program_files*.license.txt | icat | 67 |
| appfiles.program_files*.notes.txt | icat | 135 |
| appfiles.program_files*.irunin.ini | icat | 399 |
| appfiles.program_files*.license.txt | icat | 25 |
| appfiles.program_files*.mailtmpl.txt | icat | 22 |
| appfiles.program_files*.msmsgs.exe.manifest | icat | 24 |
| appfiles.program_files*.aliases.ini | icat | 16 |
| appfiles.program_files*.#chataholics.undernet.log | icat | 16 |
| appfiles.program_files*.#cybercafe.undernet.log | icat | 207 |
| appfiles.program_files*.#elite.hackers.undernet.log | icat | 11 |
| appfiles.program_files*.#evilfork.efnet.log | icat | 11 |
| appfiles.program_files*.#funny.undernet.log | icat | 10 |
| appfiles.program_files*.#houston.undernet.log | icat | 9 |
| appfiles.program_files*.#iso-warez.efnet.log | icat | 7 |
| appfiles.program_files*.#luxshell.undernet.log | icat | 13 |
| appfiles.program_files*.#mp3xserv.undernet.log | icat | 15 |
| appfiles.program_files*.#thedarktower.afternet.log | icat | 14 |
| appfiles.program_files*.#ushells.undernet.log | icat | 9 |
| appfiles.program_files*.m5tar.undernet.log | icat | 8 |
| appfiles.program_files*.mirc.ini | icat | 224 |
| appfiles.program_files*.popups.ini | icat | 96 |
| appfiles.program_files*.readme.txt | icat | 34 |
| appfiles.program_files*.servers.ini | icat | 423 |
| appfiles.program_files*.urls.ini | icat | 9 |
| appfiles.program_files*.versions.txt | icat | 472 |
| appfiles.program_files*.wavemix.inf | icat | 101 |
| appfiles.program_files*.msoe.txt | icat | 3 |
| appfiles.program_files*.ie_userdata.ini | icat | 10 |
| appfiles.program_files*.ie4shell95userdata.ini | icat | 5 |
| appfiles.program_files*.whois.txt | icat | 70 |
| appfiles.program_files*.install.log | icat | 138 |
| registry.ntuser.default user | regripper | 70 |
| registry.usrclass.localservice | regripper | 4 |
| registry.ntuser.localservice | regripper | 70 |
| registry.usrclass.mr. evil | regripper | 4 |
| registry.ntuser.mr. evil | regripper | 329 |
| registry.usrclass.networkservice | regripper | 4 |
| registry.ntuser.networkservice | regripper | 70 |
| tsk.masquerade | sleuthkit | 14 |
| clamav.scan | clamav | 19 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
