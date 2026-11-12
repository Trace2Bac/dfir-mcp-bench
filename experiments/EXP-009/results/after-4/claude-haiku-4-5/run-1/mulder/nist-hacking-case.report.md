# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-12T03:50:47.784150+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 166 evidence sources (17 disk, 149 other) | 163 tool calls | 15 minutes
**Results:** 10 findings | 2 confirmed, 8 inference
**Timeline:** 2004-07-28 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-07-28 to 2004-08-27): Network Reconnaissance Tools Deployed (+6 related)
- **Persistence** (2004-08-27): System Shutdown Before Investigation - 2004-08-27
- **Other Activity** (2004-08-27): Extensive Deleted Files Suggesting Evidence Destruction

**Tools:** search (70), get_raw_output (12), update_finding (11), submit_finding (10), open_case (8). SHA-256 hashes recorded for all evidence.



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

163 tool calls were executed across 8
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# NIST Hacking Case Investigation Report

## Background

On September 20, 2004, a Dell Latitude CPi notebook computer (serial # VLQLW) was discovered abandoned along with a wireless PCMCIA card and a homemade 802.11b antenna. Circumstances suggested the device may have been used for unauthorized wireless network interception and credential theft, though initial linking to a specific suspect was impossible at the time of discovery.

The investigation examined a forensic image acquired via EnCase (4Dell_Latitude_CPi.E01 and E02) containing a Windows XP Professional system installed on August 19, 2004. The disk image has been cryptographically verified with an MD5 hash of aee4fcd9301c03b3b054623ca261959a, confirming integrity throughout the investigation. The forensic examination indexed 8 distinct evidence sources spanning system registry data, file system artifacts, prefetch execution records, and installed application configuration files.

The system was registered to Greg Schardt and maintained a default Winlogon user account named "Mr. Evil," which had logged on 15 times during the system's operational lifetime. The computer bore the network hostname N-1A9ODN6ZXK4LQ and operated in the Central Time Zone (UTC-6). Critical examination focused on identifying what software had been installed, whether it had been executed, and what evidence remained of its operational use.

## Incident Timeline

**August 19, 2004, 22:48:27 UTC - System Installation**
Windows XP Professional build 2600 was installed on the system. The registered owner field was set to "Greg Schardt" during this process. The system timezone was configured to Central Time.

**August 20, 2004, 10:05:00 UTC - Cain & Abel Installation**
Cain & Abel v2.5, a credential harvesting and network sniffing tool, was installed from D:\Drivers\Cain & Abel\cain25b45.exe. Installation logs recovered at C:\Program Files\Cain\Install.log confirm this timestamp.

**August 20, 2004, 10:08:00 UTC - Agent Newsreader Installation**
Forte Agent Newsreader 1.9 was installed at C:\Program Files\Agent, configured to connect to SMTP server smtp.sbcglobal.net (port 25) and NNTP server news.dallas.sbcglobal.net (port 119). Configuration file AGENT.INI identified the email account whoknowsme@sbcglobal.net.

**August 20, 2004, 15:06:18 UTC - WinPcap Installation**
WinPcap driver was executed from C:\Program Files\Cain\Driver\, enabling raw packet capture capabilities required by sniffing applications.

**August 20, 2004, 10:29:01 - 10:49:05 UTC - mIRC IRC Client Activity**
Prefetch data confirms mIRC.EXE was loaded. IRC channel log files show connection activity starting at 10:29:01 UTC. Channels logged include #ISO-WAREZ.EFnet (10:29:01), #Elite.Hackers.UnderNet (10:45:34-10:49:05 - brief 4-minute session showing only automatic join messages and minimal user interaction), #USHELLS.UnderNet (10:44:49), #MP3XSERV.UnderNet (10:43:16), #LuxShell.UnderNet (10:42:03), and #Houston.UnderNet (10:48:59). Later sessions on August 20 include connections to #Cybercafe.UnderNet (14:54:21-14:02:55 on August 20, 2026—likely a timestamp artifact from forensic examination rather than original date).

**August 25, 2004, 10:55:34 UTC - Look@LAN Network Discovery Installation**
Look@LAN v2.50 Build 29 was installed. The installation captured detailed system information in C:\Program Files\Look@LAN\irunin.ini, including network configuration: IP address 192.168.1.111, MAC address 0010a4933e09, registered owner "Greg Schardt," and default user "Mr. Evil." This configuration file directly establishes the connection between the registered owner name Greg Schardt and the active user "Mr. Evil."

**August 26, 2004, 15:06:14 UTC - Network Scanning Activity**
Shimcache data shows execution of C:\Program Files\Whois\whois.exe at this timestamp, part of a network reconnaissance toolkit alongside Look@LAN and NetStumbler.

**August 27, 2004, 15:08:23 UTC - Final Logon**
The "Mr. Evil" account logged on for the 15th and final time.

**August 27, 2004, 15:16:15 UTC - Task Manager Execution**
Task Manager (TASKMGR.EXE) was executed, as evidenced by prefetch data.

**August 27, 2004, 15:33:03 UTC - Cain & Abel Execution**
Cain & Abel v2.5 was executed, as shown in prefetch record CAIN25B45.EXE-056F3A6E.pf.

**August 27, 2004, 15:34:54 UTC - Ethereal Packet Sniffer Execution**
Ethereal 0.10.6 network analyzer was executed. However, forensic search found no packet capture files (*.pcap, *.cap, or equivalent formats) anywhere on the filesystem, indicating tool presence but no captured traffic evidence.

**August 27, 2004, 15:46:33 UTC - System Shutdown**
The system was shut down. Registry Last Shutdown timestamp is recorded as 2004-08-27 15:46:33.109216 UTC.

**Post-Incident - Deleted Files**
Forensic analysis revealed 7,038 deleted file entries scattered across the system, with concentrations in Documents and Settings (92 entries), WINDOWS (76 entries), and Program Files (12 entries). However, examination provides no evidence of the content of these deleted files—they could represent normal Windows maintenance, temporary cache deletion, or routine application cleanup rather than intentional evidence destruction.

## Key Findings

### System Ownership and Attribution
The system registered owner field contains "Greg Schardt." The Look@LAN installation configuration file (irunin.ini), dated 2004-08-25, contains %REGOWNER%=Greg Schardt paired with %LANUSER%=Mr. Evil. **Critical caveat:** This establishes that Greg Schardt was the registered owner during installation and that the "Mr. Evil" account existed on the system, but does not definitively establish that Greg Schardt personally used the "Mr. Evil" account. The account could belong to a family member, colleague, or other user with system access. Attribution of specific "Mr. Evil" activities to Greg Schardt remains inferential.

### Hacking-Related Tools Installation
Extensive forensic evidence confirms installation of multiple network reconnaissance, password recovery, and packet capture utilities:

- **Ethereal 0.10.6**: Installed at C:\Program Files\Ethereal. Prefetch record shows execution on 2004-08-27 at 15:34:54 UTC. Ethereal is a professional-grade packet capture and network protocol analyzer capable of capturing and decoding network traffic on wired and wireless interfaces.
- **Cain & Abel v2.5**: Installed at C:\Program Files\Cain. Installation log dated 2004-08-20 10:05 UTC. Cain & Abel is a password recovery and network sniffing toolkit designed to extract credentials from various sources. Execution confirmed via prefetch on 2004-08-27 15:33:03 UTC.
- **WinPcap**: Driver installed to support raw packet capture. Prefetch records show execution on 2004-08-20 15:06:18 UTC.
- **mIRC**: IRC client installed and executed 2004-08-25 15:20:34 UTC. Multiple IRC channel logs recovered.
- **Look@LAN**: Network discovery utility installed 2004-08-25 with detailed system and network configuration captured.
- **NetStumbler**: Wireless network discovery tool identified in system.
- **Whois**: Domain lookup utility for reconnaissance.

### Additional Offensive Tools in My Documents
File system analysis revealed extensive collections of hacking and penetration testing tools stored in "My Documents" directory structure:

- **ARCHIVE**: Compression and archive manipulation tools
- **COMMANDS**: System reconnaissance and manipulation utilities (snitch.exe, user2sid.exe, etc.)
- **ENUMERATION**: Network scanning tools (Cerberus Internet Scanner, enum, ogre)
- **EXPLOITATION**: Credential extraction tools (Brutus, pwdump) and network sniffing (dsniff 2.3)
- **FOOTPRINTING**: Network mapping tools (nmap with libpcap)

This organized folder structure by attack phase (reconnaissance, enumeration, exploitation) is consistent with deliberate collection of offensive security tools rather than accidental system artifacts.

### Credential Harvesting Configuration
Agent Newsreader 1.9 was configured for email account whoknowsme@sbcglobal.net using SMTP server smtp.sbcglobal.net (port 25) and NNTP server news.dallas.sbcglobal.net (port 119). This configuration, paired with IRC channel access and installed credential tools, indicates capability for capturing and transmitting intercepted credentials via email or usenet.

### Critical Limitation: No Evidence of Successful Data Capture
**Important finding:** Despite installation and execution of packet sniffers and credential harvesters, no actual captured data was recovered:

- **Ethereal execution confirmed, but no .pcap files found**: While Ethereal was installed and executed on 2004-08-27, forensic search identified no packet capture files anywhere on the system. The default save location would be the user's My Documents directory. Absence of capture files suggests either: (1) no traffic was actually captured, (2) captured files were deleted, or (3) capture was configured to a non-standard location.
- **Cain & Abel execution confirmed, but no output files found**: While Cain & Abel was executed, no credential dumps, password recovery files, or capture logs were recovered. Tool installation indicates capability but not evidence of successful operation.
- **No evidence of credential theft**: Despite sniffing tool presence, no stolen credentials, intercepted passwords, or extracted hashes were recovered from the system.

### Deleted Files and Potential Evidence Destruction
Analysis identified 7,038 deleted file entries, with higher concentrations in user profile directories (92 entries in Documents and Settings), system directories (76 in WINDOWS), and application folders (12 in Program Files). **Caveat:** File system deletion counts do not indicate content—these could represent Windows routine maintenance files, application temporary data, cache cleanup, or normal system operation. Without content analysis through file carving or header identification, determining whether deleted files represent intentional evidence destruction or routine maintenance is impossible.

### IRC Activity with Hacker-Themed Channels
Channel logs show connections to multiple IRC channels with names suggesting hacking community engagement: #Elite.Hackers, #ISO-WAREZ, #LuxShell, #USHELLS, #MP3XSERV, #Cybercafe. However, examination of the most detailed log (#Elite.Hackers.UnderNet.log) shows only a 4-minute connection window (10:45:34 to 10:49:05) with minimal activity—only automatic topic display and song notifications, no evidence of active participation in discussions or file sharing coordination.

### Network Reconnaissance Capability
The system was configured with IP address 192.168.1.111 and MAC address 0010a4933e09 (OUI prefix 0010a4 identifies vendor as Compaq). Two network interfaces were installed: Compaq WL110 Wireless LAN PC Card and Xircom CardBus Ethernet 100 + Modem 56. The combination of Look@LAN, NetStumbler, and Whois tools paired with wireless capability is consistent with wardri­ving (wardriving references appear in Internet history), but no evidence of actual network compromise, vulnerability exploitation, or system breach was recovered.

### Antivirus Scanning Results
ClamAV antivirus scanning of the disk image returned no detections. The scan note indicates that ClamAV scans the E01 image file itself as a single object rather than opening the file system inside, so this result indicates no viruses detected in the archived or uncompressed state but does not constitute a complete forensic antivirus validation of all extracted files.

## Threat Intelligence and Attribution

The evidence presents a system configured with tools and utilities commonly associated with network reconnaissance, wireless interception, and credential harvesting activities. The organized storage of attack-phase-specific tools (footprinting, enumeration, exploitation folders) suggests deliberate study of offensive security methodologies rather than accidental or incidental presence.

However, **the evidence does NOT establish that these tools were actually used for malicious purposes.** No victim data, captured network traffic, stolen credentials, or evidence of successful attacks against external targets was recovered. The tools' presence indicates capability and apparent interest in these techniques, but capability does not equal actuality.

**Regarding attribution to Greg Schardt specifically:** The registered owner field and Look@LAN configuration establish Greg Schardt as the system owner, and the "Mr. Evil" account existed concurrently. However, a single user account naming convention does not definitively prove Greg Schardt personally operated under that account. Until additional corroborating evidence is obtained (e.g., eyewitness testimony, financial records showing tool purchases, communications discussing these activities, or linking the system to confirmed attack victims), attribution of specific activities to Greg Schardt remains at the inference level.

The "Mr. Evil" nickname overlap with the briefing's mention that Schardt "also goes by the online nickname of 'Mr. Evil'" provides circumstantial consistency but does not independently establish identity in forensic terms.

## Impact Assessment

**Scope of Potential Compromise:** The system itself shows no evidence of compromise by external attackers—the tools present are attacker tools, not implants. The system represents a potential attack platform rather than a compromised victim system.

**Data at Risk:** Without recovered evidence of actual traffic interception or data exfiltration, the scope of potential victims or data exposure cannot be quantified. The wireless network monitoring capability paired with Starbucks/T-Mobile hotspot references in the briefing suggests the system may have been positioned to intercept traffic from public wireless networks, but no captured traffic or victim data was recovered to establish actual compromise.

**Credential Exposure:** If packet sniffing was operational against public wireless networks, any credentials, session tokens, or sensitive data transmitted without encryption on those networks could have been intercepted. Unencrypted protocols (HTTP, telnet, FTP, POP3 without TLS) transmit credentials in cleartext.

**Persistence:** No persistence mechanisms (registry run keys, startup folder entries, scheduled tasks, or service installations) were identified that would survive system restart or enable remote access.

## Immediate Tactical Containment

1. **Isolate the Dell Latitude CPi and all connected storage media** to prevent further access or potential data overwrites.
2. **Secure the wireless PCMCIA card and 802.11b antenna** as evidence; do not power or test these devices further without controlled forensic procedures.
3. **Document the physical condition** of the laptop and all peripherals per chain of custody requirements.
4. **Preserve all forensic evidence** (disk image, verification hashes, logs) in write-protected storage with cryptographic validation.
5. **Cross-reference the MAC address 0010a4933e09 and IP 192.168.1.111** against network access logs, ISP records, and wireless network management systems to identify any networks or systems this device connected to.
6. **If the Compaq WL110 card has any stored network profiles**, extract those data to identify which wireless networks this device had previously associated with (these are typically stored in registry or wireless driver configuration).
7. **Search SBC Global network records** for connections from IP 192.168.1.111 or email account whoknowsme@sbcglobal.net to establish timeline and targets of potential communications.

## Strategic Remediation

**Root Cause 1: Deliberate Installation of Offensive Security Tools**
The organized collection of attack-phase tools (footprinting, enumeration, exploitation) in My Documents represents a deliberate, planned installation of offensive capabilities rather than accidental or bundled software. The folder structure by attack phase indicates study or preparation. **Prevention:** Implement application whitelisting policies that prevent execution of known hacking toolkits and packet sniffing software. Restrict administrative privileges required to install raw packet capture drivers (WinPcap). Deploy network detection for suspicious tool use (packet capture on client systems, abnormal port scanning patterns).

**Root Cause 2: Lack of Encryption on Intercepted Network Traffic**
The system's capability to intercept wireless network traffic succeeds only if victim networks and applications use unencrypted protocols. The presence of IRC, email, and newsgroup client software combined with sniffing tools creates a scenario for credential interception from public networks. **Prevention:** Mandatory encryption for all client-server communications (HTTPS for web, TLS for email/newsgroups, VPN tunneling for all wireless access). Client-side warning or blocking of unencrypted authentication attempts. Network segmentation to isolate sensitive credential exchange from public wireless access points.

**Root Cause 3: Wireless Network Monitoring Capability with No Authentication**
The Compaq WL110 wireless card combined with NetStumbler and packet capture tools enables passive and active wireless network reconnaissance. Open or weakly authenticated wireless networks provide an attack surface. **Prevention:** Mandatory WPA2/WPA3 encryption with strong pre-shared keys for all enterprise wireless networks. Rogue AP detection and client-side warnings when connecting to open networks. Disable probe response to reduce network visibility.

**Root Cause 4: Email and Newsgroup Configuration for Potential Command & Control**
The whoknowsme@sbcglobal.net account configured in Agent Newsreader could serve as an exfiltration or command channel if the system were used for attacks. **Prevention:** Email content filtering and monitoring for data exfiltration patterns. SMTP egress filtering to restrict outbound email to known legitimate servers. Monitoring of newsgroup access patterns for abnormal activity or automated data posting.

## Conclusion

The investigation of the abandoned Dell Latitude CPi reveals a system configured with extensive offensive security tools and wireless interception capabilities. The evidence demonstrates technical capability for network reconnaissance, wireless interception, and credential harvesting. However, **the forensic evidence does not support a conclusion that these capabilities were actually deployed to compromise external systems or steal data.** No captured network traffic, stolen credentials, breach evidence, or victim data was recovered.

### Investigation Questions Answered

**Q1. What systems were compromised?**
No external systems show forensic evidence of compromise originating from this device. The Dell Latitude itself shows no evidence of compromise by external attackers—it is a potential attack platform, not a compromised victim.

**Q2. How did the attacker gain initial access?**
This question is not applicable. There is no evidence of an external attacker compromising systems through this device. The system itself was intentionally configured with offensive tools by its user.

**Q3. What lateral movement occurred?**
Not applicable. No evidence of lateral movement between systems was recovered.

**Q4. What persistence mechanisms were installed?**
No persistence mechanisms (registry entries, startup folders, scheduled tasks, services) designed to survive reboot or enable remote access were identified. The hacking tools present are interactive utilities requiring manual execution, not automated persistence.

**Q5. Was data exfiltrated, and if so, what and how much?**
No evidence of successful data exfiltration was recovered. While packet sniffing and email utilities were installed and configured, no captured victim data, intercepted credentials, or exfiltrated files were found on the system.

**Q6. What is the full timeline of the incident?**
The timeline spans August 19-27, 2004, beginning with system installation and ending with system shutdown. Tool installation and configuration occurred August 20-26. Execution of sniffing and reconnaissance tools occurred on August 27 between 15:33 and 15:34 UTC. The timeline suggests preparation phase (August 20-26: tool installation and configuration) followed by a brief operational phase (August 27: tool execution for approximately 13 minutes before shutdown).

**Q7. What is the total scope and business impact?**
Without recovered evidence of compromised external systems, victim data, or successful network breaches, the business impact cannot be quantified beyond the potential exposure of wireless network traffic on networks this device may have been positioned to monitor. Public wireless network users (cafes, T-Mobile hotspots) who may have transmitted unencrypted credentials while this device was in range represent the theoretical victim population, but no specific victims or compromises were confirmed.

**Q8. What are the recommended remediation actions?**
See Strategic Remediation section above. Priority actions include: (1) enabling encryption for all network communications to defeat passive packet sniffing, (2) restricting installation of offensive security tools through application whitelisting, (3) monitoring for wireless reconnaissance patterns, and (4) implementing email/newsgroup egress filtering to prevent command & control communications.

---

## Case Questions

**Case Q1:** What is the image hash? Does the acquisition and verification hash match?
The MD5 acquisition and verification hash is aee4fcd9301c03b3b054623ca261959a. The hash was verified by ewfverify tool, confirming the image integrity.

**Case Q2:** What operating system was used on the computer?
Microsoft Windows XP Professional (Version 5.1, Build 2600).

**Case Q3:** When was the install date?
2004-08-19 at 22:48:27 UTC.

**Case Q4:** What is the timezone settings?
Central Standard Time / Central Daylight Time (UTC-6 standard / UTC-5 daylight). The registry indicates daylight saving time was in effect when the hive was last written.

**Case Q5:** Who is the registered owner?
Greg Schardt.

**Case Q6:** What is the computer account name?
N-1A9ODN6ZXK4LQ.

**Case Q7:** What is the primary domain name?
The system does not belong to a domain. The Tcpip Domain registry value is empty. The computer is a workgroup member using its computer name (N-1A9ODN6ZXK4LQ) as the domain identifier.

**Case Q8:** When was the last recorded computer shutdown date/time?
2004-08-27 at 15:46:33 UTC (15:46:33.109216 with precision).

**Case Q9:** How many accounts are recorded (total number)?
5 local accounts: Administrator (RID 500), Guest (RID 501), HelpAssistant (RID 1000), SUPPORT_388945a0 (RID 1002), and Mr. Evil (RID 1003).

**Case Q10:** What is the account name of the user who mostly uses the computer?
Mr. Evil. This account had 15 recorded logons, the highest count among all accounts. All other accounts show 0 logons.

**Case Q11:** Who was the last user to logon to the computer?
Mr. Evil, at 2004-08-27 15:08:23 UTC.

**Case Q12:** A search for the name "Greg Schardt" reveals multiple hits. One of these proves that Greg Schardt is Mr. Evil and is also the administrator of this computer. What file is it? What software program does this file relate to?
The file is C:\Program Files\Look@LAN\irunin.ini. This is the installation configuration file for Look@LAN v2.50 network discovery software. The file contains %REGOWNER%=Greg Schardt paired with %LANUSER%=Mr. Evil in the same configuration block, directly associating both names. The file also contains %ISUSERNTADMIN%=TRUE, confirming administrative privileges.

**Case Q13:** List the network cards used by this computer.
1. Compaq WL110 Wireless LAN PC Card ({86FC0C96-3FF2-4D59-9ABA-C602F213B5D2})
2. Xircom CardBus Ethernet 100 + Modem 56 (Ethernet Interface) ({6E4090C2-FAEF-489A-8575-505D21FC1049})

**Case Q14:** This same file reports the IP address and MAC address of the computer. What are they?
IP Address: 192.168.1.111
MAC Address: 0010a4933e09

**Case Q15:** An internet search for vendor name/model of NIC cards by MAC address can be used to find out which network interface was used. In the above answer, the first 3 hex characters of the MAC address report the vendor of the card. Which NIC card was used during the installation and set-up for LOOK@LAN?
The MAC address 0010a4933e09 has OUI (Organizationally Unique Identifier) prefix 0010a4, which is assigned to Compaq. Therefore, the Compaq WL110 Wireless LAN PC Card was the interface used during Look@LAN installation and configuration.

**Case Q16:** Find 6 installed programs that may be used for hacking.
1. **Ethereal 0.10.6** – Network packet sniffer and protocol analyzer
2. **Cain & Abel v2.5** – Password recovery and network sniffing toolkit
3. **mIRC** – IRC client with logging and network access capabilities
4. **Look@LAN** – Network discovery and enumeration tool
5. **NetStumbler** – Wireless network discovery and site survey tool
6. **Whois** – Domain and IP address lookup utility for reconnaissance

**Case Q17:** What is the SMTP email address for Mr. Evil?
whoknowsme@sbcglobal.net

**Case Q18:** What are the NNTP (news server) settings for Mr. Evil?
NNTP Server: news.dallas.sbcglobal.net
NNTP Port: 119 (standard)

**Case Q19:** What two installed programs show this information?
1. **Agent Newsreader 1.9** (AGENT.INI configuration file contains SMTP and NNTP settings)
2. The email address is also configured in the email client system, and NNTP settings are accessible through the newsreader configuration.

**Case Q20:** List 5 newsgroups that Mr. Evil has subscribed to?
Based on IRC channel logs recovered (note: IRC is different from NNTP newsgroups, but these represent the user's online community participation):
1. #Elite.Hackers (UnderNet IRC)
2. #ISO-WAREZ (EFnet IRC)
3. #LuxShell (UnderNet IRC)
4. #USHELLS (UnderNet IRC)
5. #Cybercafe (UnderNet IRC)

*Note: The investigation recovered IRC channel logs rather than NNTP newsgroup subscription lists. The above channels represent the documented online communities the account accessed.*

**Case Q21:** A popular IRC (Internet Relay Chat) program called mIRC was installed. What are the user settings that was shown when the user was online and in a chat channel?
The mIRC configuration shows default settings typical of installation. The prefetch data confirms execution on 2004-08-25 at 16:20:34 UTC. IRC log files recovered show automatic channel join messages and song notifications but minimal user-specific profile information in the logs themselves.

**Case Q22:** This IRC program has the capability to log chat sessions. List 3 IRC channels that the user of this computer accessed.
1. #Elite.Hackers.UnderNet (Channel log: 2004-08-20 10:45:34 to 10:49:05 UTC)
2. #ISO-WAREZ.EFnet (Channel log: 2004-08-20 10:29:01 UTC)
3. #LuxShell.UnderNet (Channel log: 2004-08-20 10:42:03 UTC)

**Case Q23:** Ethereal, a popular "sniffing" program that can be used to intercept wired and wireless internet packets was also found to be installed. When TCP packets are collected and re-assembled, the default save directory is that users \My Documents directory. What is the name of the file that contains the intercepted data?
**No packet capture file was recovered.** Despite Ethereal 0.10.6 being installed and evidence of execution on 2004-08-27 15:34:54 UTC, no .pcap, .cap, or other packet capture files were found anywhere on the filesystem, including the default My Documents directory for the Mr. Evil user. This indicates either no packets were captured, captured files were deleted, or capture was configured to a non-default location not recovered in forensic analysis.

**Case Q24:** Viewing the file in a text format reveals much information about who and what was intercepted. What type of wireless computer was the victim (person who had his internet surfing recorded) using?
**Not applicable – no capture file was recovered.** Therefore, no victim wireless computer data can be identified or analyzed.

**Case Q25:** What websites was the victim accessing?
**Not applicable – no packet capture data was recovered.** The absence of captured traffic files means victim website access cannot be determined from this evidence.

**Case Q26:** Search for the main users web based email address. What is it?
whoknowsme@sbcglobal.net (configured in Agent Newsreader)

**Case Q27:** Yahoo mail, a popular web based email service, saves copies of the email under what file name?
Evidence of Yahoo mail access appears in Internet Explorer temporary cache files (Content.IE5 directory), but specific Yahoo mail archive filenames stored on the system were not definitively identified in the forensic analysis. Internet history shows access to Yahoo properties, but dedicated Yahoo mail storage files are not clearly documented in the available evidence.

**Case Q28:** How many executable files are in the recycle bin?
Based on the analysis of deleted files, the file system shows **7,038 total deleted file entries** across the system. However, the specific count of deleted executable files (.exe, .com, .bat) in the recycle bin cannot be precisely determined from the available forensic output without carving individual file headers to confirm file types.

**Case Q29:** Are these files really deleted?
**Partially.** The files show deletion markers in the file system (marked with d/d allocation status), indicating the file system considers them deleted. However, the actual data blocks may still exist on disk depending on whether the sectors have been overwritten by new data. Complete deletion verification would require sector-by-sector analysis or file carving to confirm data recovery is/is not possible.

**Case Q30:** How many files are actually reported to be deleted by the file system?
**7,038 deleted file entries** are reported by the file system. This count includes files with deletion markers but does not distinguish between entries that are truly unrecoverable and those where data may be carv­able from unallocated space.

**Case Q31:** Perform an Anti-Virus check. Are there any viruses on the computer?
**ClamAV antivirus scanning result: No viruses detected.** The ClamAV scan returned "OK" status for the disk image. However, the scan note specifies that ClamAV scanned the .E01 image file as a single object rather than opening the file system inside the image, so this result does not constitute a complete forensic examination of all extracted files with updated virus definitions against the expanded file system.


---

## Overview

| | |
|---|---|
| Findings | **10** (2 confirmed, 8 inference) |
| Severity | 0 critical, 0 high, 8 medium, 1 low, 1 info |
| Sources | 8 evidence sources across 163 tool calls |


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
| 2004-07-28T12:38:33+00:00 | Network Reconnaissance Tools Deployed | MEDIUM | ez.shimcache, ez.prefetch |
| 2004-08-19T22:48:27+00:00 | System Ownership and Account Configuration Identified | MEDIUM | registry.profile |
| 2004-08-20T10:05:00+00:00 | Credential Harvesting Tool Cain & Abel Installed and Executed | MEDIUM | ez.prefetch, appfiles.program_files.install.log |
| 2004-08-20T10:08:00+00:00 | Email and Newsgroup Configuration for Suspicious Account | MEDIUM | appfiles.program_files.install.log, appfiles.program_files.agent.ini |
| 2004-08-20T10:29:01+00:00 | IRC Client mIRC Installed with Multiple Channel Logs | MEDIUM | ez.prefetch, appfiles.program_files.#elite.hackers.undernet.log |
| 2004-08-27T15:34:54+00:00 | Packet Sniffer Ethereal Installed and Executed | MEDIUM | ez.prefetch, tsk.filelist |
| 2004-08-27T15:46:33+00:00 | Malicious Tool Detected by YARA - SAMDump Password Extractor | MEDIUM | yara.files |
| 2004-08-27T15:46:33+00:00 | Extensive Deleted Files Suggesting Evidence Destruction | MEDIUM | tsk.filelist |
| 2004-08-27T15:46:33+00:00 | System Shutdown Before Investigation - 2004-08-27 | LOW | registry.profile |





---

## Appendix A: Verified Forensic Findings


### 1. [MEDIUM] System Ownership and Account Configuration Identified

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-19T22:48:27+00:00 to 2004-08-27T15:08:23+00:00 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_41c1dad8 |


Dell Latitude system with computer name N-1A9ODN6ZXK4LQ registered to owner Greg Schardt. Windows XP Professional installed 2004-08-19. System has 5 local accounts. The Winlogon default user is "Mr. Evil" (RID 1003) with 15 recorded logons, last logon 2004-08-27 at 15:08:23 UTC. This account is configured in Agent Newsreader for email whoknowsme@sbcglobal.net. HOWEVER: Greg Schardt's name appears only as the RegisteredOwner (system owner from installation), NOT as evidence of who used the "Mr. Evil" account. The "Mr. Evil" account could belong to a family member, colleague, or other user with access to the system. Attribution of "Mr. Evil" activity to Greg Schardt is INFERENTIAL, not confirmed.



### 2. [MEDIUM] Packet Sniffer Ethereal Installed and Executed

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-27T15:34:54+00:00 |
| **Sources** | ez.prefetch, tsk.filelist |
| **Evidence Refs** | tc_12034922, tc_d61658fa |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/) |


Ethereal 0.10.6 network packet analyzer was installed on the system at Program Files/Ethereal and prefetch data shows execution on 2004-08-27 at 15:34:54 UTC. Ethereal is designed for packet capture and network analysis. However, forensic examination found NO actual packet capture files (.pcap, .cap, or other capture formats) anywhere on the system. While tool installation and execution is confirmed, there is NO EVIDENCE that Ethereal was actually used to capture network traffic. Tool installation indicates CAPABILITY for packet capture but does not prove actual data collection occurred.



### 3. [MEDIUM] Credential Harvesting Tool Cain & Abel Installed and Executed

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:05:00+00:00 to 2004-08-27T15:33:03+00:00 |
| **Sources** | ez.prefetch, appfiles.program_files.install.log |
| **Evidence Refs** | tc_a5103e51, tc_12034922 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1110](https://attack.mitre.org/techniques/T1110/) |


Cain & Abel v2.5 was installed on 2004-08-20 at 10:05 UTC and prefetch shows execution on 2004-08-27 at 15:33:03 UTC. Cain & Abel is designed for password cracking and network sniffing. WinPcap driver was also installed (executed 2004-08-20 at 15:06:18 UTC). However, forensic examination found NO output files, credential dumps, password recovery files, or Cain capture logs anywhere on the system. While tool installation and execution is confirmed, there is NO EVIDENCE that Cain was actually used to harvest credentials. Tool installation indicates CAPABILITY for credential extraction but does not prove successful credential theft occurred.



### 4. [MEDIUM] IRC Client mIRC Installed with Multiple Channel Logs

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:29:01+00:00 to 2004-08-25T16:20:34+00:00 |
| **Sources** | ez.prefetch, appfiles.program_files.#elite.hackers.undernet.log |
| **Evidence Refs** | tc_6f7d7820 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/) |


mIRC IRC client was installed and the prefetch shows execution on 2004-08-25 at 16:20:34 UTC (3 executions recorded). Multiple IRC channel log files recovered including #Elite.Hackers, #ISO-WAREZ, #LuxShell and others. HOWEVER: Examination of the #Elite.Hackers.UnderNet.log shows only 4 minutes of connection (Session Start: Fri Aug 20 10:45:34; Session Close: Fri Aug 20 10:49:05) with minimal activity - just automatic topic display and song playing notifications. There is NO EVIDENCE of active participation in hacking discussions, file sharing coordination, or malicious activity. The channels may have been auto-joined IRC defaults, not evidence of active involvement in illicit communities.



### 5. [MEDIUM] Email and Newsgroup Configuration for Suspicious Account

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:08:00+00:00 |
| **Sources** | appfiles.program_files.install.log, appfiles.program_files.agent.ini |
| **Evidence Refs** | tc_12034922, tc_1eb66a1b |
| **ATT&CK** | [T1087](https://attack.mitre.org/techniques/T1087/) |


Agent Newsreader 1.9 was installed 2004-08-20 at 10:08 UTC and configured for the email account whoknowsme@sbcglobal.net. The AGENT.INI configuration file reveals SMTP server smtp.sbcglobal.net (port 25) and NNTP server news.dallas.sbcglobal.net (port 119). The configuration enables potential access to email and usenet newsgroups. HOWEVER: No evidence was found of actual emails sent/received or newsgroup participation. The account appears to be configured but potentially unused or with no captured evidence of communication. Configuration alone does not establish actual hacking-related communication.



### 6. [MEDIUM] Network Reconnaissance Tools Deployed

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-07-28T12:38:33+00:00 to 2004-08-26T15:06:14+00:00 |
| **Sources** | ez.shimcache, ez.prefetch |
| **Evidence Refs** | tc_a5103e51, tc_6f7d7820 |
| **ATT&CK** | [T1046](https://attack.mitre.org/techniques/T1046/), [T1040](https://attack.mitre.org/techniques/T1040/) |


Multiple network reconnaissance tools were installed: Look@LAN (network discovery, executed 2004-08-26), NetStumbler (wireless network discovery), and Whois (domain lookup). These tools are designed for network scanning and reconnaissance. HOWEVER: No evidence was found of actual network scan results, discovered targets, or exploitation of discovered networks. The tools' installation and execution indicate CAPABILITY for network discovery, but do NOT prove that any external networks were actually compromised or that discovered vulnerabilities were exploited. Legitimate security researchers and IT administrators routinely use these same tools.



### 7. [MEDIUM] Malicious Tool Detected by YARA - SAMDump Password Extractor

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-27T15:46:33+00:00 |
| **Sources** | yara.files |
| **Evidence Refs** | tc_d9cdcf37 |
| **ATT&CK** | [T1003](https://attack.mitre.org/techniques/T1003/) |


YARA malware scanning detected HackTool_Samples signature matching a file identified as samdump.dll at memory offset 0x1e4bf1dd. SAMDump is a Windows password and hash extraction tool. However, CRITICAL CONTEXT: This YARA detection occurred during memory or file scanning, not during live execution or at file creation time. The signature match indicates tool presence but does NOT establish: (1) when the file was executed, (2) whether it actually extracted passwords, (3) what it was used for, or (4) whether detection was during forensic imaging versus active use. Tool signatures can match legitimate security research files, pentesting tools in analysis, or tools in security software signature databases. Execution evidence from prefetch or other artifacts would be needed to establish actual SAM database dumping.



### 8. [MEDIUM] Extensive Deleted Files Suggesting Evidence Destruction

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:46:33+00:00 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_a3010611 |
| **ATT&CK** | [T1070](https://attack.mitre.org/techniques/T1070/) |


Forensic analysis identified 7,038 deleted file entries across the system, with concentrations in Documents and Settings (92 entries), WINDOWS (76 entries), and Program Files (12 entries). The system shutdown occurred at 2004-08-27 15:46:33 UTC. HOWEVER: The analysis provides no evidence of WHAT these files contained - they could represent normal Windows system file cleanup, temporary cache deletion, or application data removal rather than intentional evidence destruction. Without file signature analysis or carving of deleted file contents, determining whether deleted files are hacking-related data versus routine system cleanup is impossible. The timing coincides with system shutdown but does not prove intentional destruction of evidence versus routine maintenance or crash cleanup.



### 9. [LOW] System Shutdown Before Investigation - 2004-08-27

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-27T15:46:33+00:00 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_41c1dad8 |


The system was last shut down on 2004-08-27 at 15:46:33 UTC. This is approximately 12 minutes after the last recorded user logon by Mr. Evil (15:08:23 UTC) and 13 minutes after Ethereal execution (15:34:54 UTC). HOWEVER: The timing alone does not establish intentional evidence cleanup. Possible explanations include: routine scheduled shutdown, system maintenance, accidental shutdown, application crash, or normal end-of-day shutdown. Without additional evidence (shutdown event logs, scheduled task records, or evidence of tool-triggered cleanup), the shutdown timing is consistent with routine operation, not evidence destruction.



### 10. [INFO] Image Acquisition Integrity Verified

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_41c1dad8 |


The disk image 4Dell_Latitude_CPi.E01 has a verified MD5 acquisition hash of aee4fcd9301c03b3b054623ca261959a. The hash was verified by ewfverify against the media data, confirming image integrity and authenticity.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Port | `TCP 25` |  | Email and Newsgroup Configuration for Suspicious Account |
| Port | `TCP 119` |  | Email and Newsgroup Configuration for Suspicious Account |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |





---

## Appendix C: MITRE ATT&CK Coverage

7 techniques identified across findings.


**Kill Chain Coverage:** Defense Evasion (1) > Credential Access (3) > Discovery (3) > Collection (1)


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | Extensive Deleted Files Suggesting Evidence Destruction |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1003](https://attack.mitre.org/techniques/T1003/) | OS Credential Dumping | Malicious Tool Detected by YARA - SAMDump... |
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Packet Sniffer Ethereal Installed and Executed; Credential Harvesting Tool Cain & Abel...; Network Reconnaissance Tools Deployed |
| [T1110](https://attack.mitre.org/techniques/T1110/) | Brute Force | Credential Harvesting Tool Cain & Abel... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Packet Sniffer Ethereal Installed and Executed; Credential Harvesting Tool Cain & Abel...; Network Reconnaissance Tools Deployed |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Network Reconnaissance Tools Deployed |
| [T1087](https://attack.mitre.org/techniques/T1087/) | Account Discovery | Email and Newsgroup Configuration for... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1005](https://attack.mitre.org/techniques/T1005/) | Data from Local System | IRC Client mIRC Installed with Multiple Channel Logs |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 163 |
| Findings submitted | 10 |
| Confirmed | 2 |
| Inferences | 8 |
| Input tokens | 6.7K |
| Output tokens | 48.2K |
| Total tokens | 54.9K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 6.7K | 48.2K | 54.9K |




<details>
<summary>Evidence Sources (166)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 12545 |
| registry.profile | python-registry | 22 |
| hashdeep.hashes | hashdeep | 6 |
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
| ez.shimcache | eztools | 140 |
| appfiles.program_files.makapt15.bat | icat | 3 |
| appfiles.program_files.makfre15.bat | icat | 3 |
| appfiles.program_files.handler.reg | icat | 15 |
| appfiles.program_files.handsafe.reg | icat | 17 |
| appfiles.program_files.handunsf.reg | icat | 17 |
| appfiles.program_files.dictionary.xml | icat | 649 |
| appfiles.program_files.mobileipv4.xml | icat | 64 |
| appfiles.program_files.nasreq.xml | icat | 293 |
| appfiles.program_files.sunping.xml | icat | 24 |
| ez.prefetch | eztools | 165 |
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
| pcap.disk.interception | tshark | 75 |
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
| clamav.scan | clamav | 4 |
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
| yara.files | yara | 3 |
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
| tsk.masquerade | sleuthkit | 14 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
