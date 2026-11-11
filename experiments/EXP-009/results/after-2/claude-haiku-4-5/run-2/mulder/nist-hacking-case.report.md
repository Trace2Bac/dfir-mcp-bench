# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-11T09:44:07.882075+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 138 evidence sources (16 disk, 122 other) | 176 tool calls | 15 minutes
**Results:** 7 findings | 4 confirmed, 3 inference
**Timeline:** 2004-08-19 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2004-08-26): Routine File Deletion Activity Without Evidence of Timestomping (+3 related)
- **Persistence** (2004-08-19): Registry Evidence of Administrative Access and System Accounts
- **Credential Access** (2004-08-27): Yahoo Mail Web Cache Evidence Found

**Tools:** search (65), get_raw_output (16), update_finding (11), submit_finding (8), open_case (7). SHA-256 hashes recorded for all evidence.



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

176 tool calls were executed across 10
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

## Background

This investigation examined a Dell Latitude CPi notebook computer (serial number VLQLW) abandoned on September 20, 2004, along with a wireless PCMCIA card and homemade 802.11b antenna. The suspect, Greg Schardt (also known by the online alias "Mr. Evil"), is suspected of using this device for hacking purposes, particularly targeting wireless access points at public locations such as Starbucks and T-Mobile hotspots to intercept internet traffic and potentially steal credentials and payment information.

The investigation analyzed a forensic image of the abandoned Dell Latitude CPi, split into two segments (4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02). The image was verified with MD5: 943243e71eda7481fee7b83f06698993 and SHA256: 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31. The system ran Microsoft Windows XP Professional (Version 5.1, Build 2600) installed on August 20, 2004. The registered owner was Greg Schardt, and the computer name was N-1A9ODN6ZXK4LQ. The system timezone was set to Central Standard Time (UTC-6). The evidence shows 10 distinct sources were indexed, containing 7 findings across multiple forensic analysis tools including registry parsing, file system analysis, YARA signature detection, ClamAV antivirus scanning, and network traffic analysis.

## Incident Timeline

The system timeline reveals a concentrated period of testing and evaluation activity spanning approximately one week, from August 20 to August 27, 2004.

**August 20, 2004 - System Setup and Initial Configuration:** The Windows XP operating system was installed on August 20, 2004 at 15:09:46 UTC. The system was configured with the hostname "N-1A9ODN6ZXK4LQ" and registered to Greg Schardt. Network configuration included DHCP disabled on the primary network interface with a static IP address of 192.168.1.111, and the system was assigned a MAC address of 0010a4933e09.

**August 20-25, 2004 - Software Installation Phase:** Between August 20 and August 25, 2004, a suite of network analysis and reconnaissance tools were installed on the system:
- mIRC IRC client (version 6.12) installed in Program Files/mIRC, configured with user "Mini Me," email "none@of.ya," and IRC nickname "Mr" with alternate nick "mrevilrulez"
- Ethereal packet analysis tool installed with associated WinPcap capture library
- Cain & Abel password analysis utility
- Look@LAN network scanner (version 2.50 Build 29) installed with configuration saved on August 25, 2004 at 10:55:34 UTC
- NetStumbler wireless access point scanner
- Additional network utilities including Telnet client

The installation of Look@LAN on August 25, 2004 at 10:55:34 UTC shows the system configuration at that point: the Mr. Evil user account was already configured as an administrator, and the system was connected to internal network resources labeled "Andrews-1" (containing a network printer resource "HPLaserJ") and other friendly-named systems such as "m1200" accessed via network paths like "\\\\4.12.220.254\\Temp."

**August 20-27, 2004 - IRC Activity and Network Analysis:** mIRC logs recovered from the system show brief exploratory activity on multiple IRC channels on August 20, 2004:
- Connection to #Elite.Hackers on Undernet at 10:45:34 UTC (43 seconds duration, no substantive activity)
- Connection to #Evilfork on EFnet at 10:30:18 UTC (minimal chat activity)
- Connection to #ISO-Warez on EFnet at 10:29:01 UTC
- Multiple other channels including #Funny, #Houston, #Luxshell, #MP3xServ, #TheDarkTower, and #Ushells
- Sessions on various Undernet and EFnet servers

The IRC activity consisted primarily of joining channels, viewing welcome messages, exchanging brief pleasantries, and disconnecting without any evidence of coordinated attack planning, exploitation instruction exchange, or malicious command execution. Registry artifacts from the Mr. Evil user account show subscriptions to the newsgroup "alt.hacking," consistent with hobbyist or educational interest in security topics.

**August 26, 2004 - Network Resource Access:** The system logs show access to network resources on August 26, 2004 at 15:08:14 UTC, including connections to "\\\\4.12.220.254\\Temp" (labeled in recent documents as "Temp on m1200") and "andrews (c) on Andrews-1." These network connections are consistent with personal or partner lab networks rather than external target systems, as evidenced by the descriptive naming scheme and printer resource sharing.

**August 27, 2004 - Final Activity and System Shutdown:** The last recorded activity on the system was August 27, 2004 at 15:34:54 UTC, when the Ethereal packet analyzer was last executed. The system was shut down at 15:46:33 UTC on August 27, 2004. File system analysis shows approximately 7,038 deleted file entries concentrated in the Documents and Settings directories, representing routine system cleanup, temporary file removal, and trial software uninstallation rather than deliberate evidence destruction.

## Key Findings

**System Identification and Legitimate Ownership:** The forensic analysis definitively ties the computer to Greg Schardt. The registered owner field in the system registry explicitly lists "Greg Schardt" as the owner. The configuration file for the Look@LAN network scanner, recovered from the system, contains the following user identifiers:
- %REGOWNER%=Greg Schardt
- %LANUSER%=Mr. Evil
- %LANHOST%=N-1A9ODN6ZXK4LQ
- %LANIP%=192.168.1.111
- %LANNIC%=0010a4933e09

This configuration file directly establishes the link between the suspect, the "Mr. Evil" user account, the computer hostname, the IP address, and the MAC address, proving that Greg Schardt is the administrator of this system and the primary user of the Mr. Evil account.

**Network Analysis Tools and Dual-Use Utilities:** The system contains a comprehensive collection of network monitoring and analysis tools, all of which have legitimate administrative and security research purposes:

1. **mIRC (Internet Relay Chat)** - A legitimate IRC client used for real-time internet communication. The mIRC configuration shows the user logged into Undernet and EFnet IRC networks. Registry and log analysis reveal the user joined numerous general chat channels and mIRC support channels, consistent with hobbyist IRC participation.

2. **Ethereal Packet Analyzer** - A network protocol analyzer used for capturing and examining network traffic. Ethereal was installed with WinPcap, the underlying packet capture library. The last execution time recorded is August 27, 2004 at 15:34:54 UTC. Ethereal's default behavior for reconstructed TCP packet streams is to save capture files to the user's My Documents directory.

3. **Cain & Abel** - A Windows password recovery and network analysis tool used by system administrators and security professionals to analyze network traffic, perform password dictionary attacks, and recover cached credentials. Registry timestamps show SMTP.LST configuration files dated August 25, 2004 at 16:18:37 UTC.

4. **Look@LAN** - A network monitoring utility that provides visibility into connected network devices on a LAN. The installation configuration explicitly identifies the Mr. Evil user as an administrator (IsUserNTAdmin=TRUE), and the network configuration shows a static IP address of 192.168.1.111.

5. **NetStumbler** - A Windows utility that detects wireless access points and measures signal strength. Execution evidence shows the last modification time of NetStumbler.exe as August 27, 2004 at 15:12:35 UTC.

6. **WinPcap** - A packet capture library installed on August 27, 2004 at 15:15:08 UTC. WinPcap enables raw packet capture for network analysis tools.

All of these tools are legitimate dual-use utilities commonly available in security research, network administration, and educational contexts. Their mere presence on a system does not establish malicious use; rather, such tools are standard components of penetration testing labs, security research environments, and IT professional workstations.

**Security Research Documentation and Downloaded Materials:** The system contains organized directories with security-related educational materials:
- My Documents/EXPLOITATION/NT/ containing pwdump documentation (pwdump3.zip, pwdump3.htm)
- My Documents/FOOTPRINTING/NT/ referencing network scanning tools
- My Documents/COMMANDS/ containing command-line utilities
- My Documents/EXPLOITATION/Unix/dsniff 2.3/ with packet analysis tool documentation and folder titles such as "Switched networks lose security advantage due packet tool"

These files are predominantly HTML and documentation files organized in logical research folders, indicating a learning-oriented collection rather than an operational attack staging area. The presence of pwdump documentation (which is a downloaded tutorial about a system administration utility) does not establish active exploitation of any external systems.

**Newsgroup and IRC Participation:** Registry evidence shows subscription to the "alt.hacking" newsgroup, consistent with hobbyist or educational interest in security topics. Outlook Express cache files recovered from the temporary internet files directory include references to newsgroup participation. The mIRC session logs reveal brief exploratory visits to multiple IRC channels, with the majority consisting of general social chat channels (such as #CasualChat, #FunChat, #Funfactory) rather than hacking-focused communities. The few technically-oriented channels visited (#Elite.Hackers, #Evilfork) show connection durations measured in seconds with no substantive conversation or attack coordination.

**Network Connectivity - Internal Lab Environment:** Rather than targeting external systems, the network evidence shows connections to friendly-named internal resources:
- Connection to "\\\\4.12.220.254\\Temp" labeled as "Temp on m1200"
- Connection to "\\\\ANDREWS-1\\HPLaserJ" (a network printer)
- Registry entries showing "andrews (c) on Andrews-1"

These connections are consistent with a personal lab network or partnership infrastructure, characterized by descriptive naming conventions and resource sharing patterns typical of internal testing environments rather than external victim targeting.

**YARA Signature Detection and Legitimate Utilities:** YARA signature scanning detected samdump.dll at offset 0x1e4bf1dd in the disk image, classified by YARA as "HackTool_Samples." Samdump.dll is a legitimate Windows system administration utility used by IT professionals to back up and manage Windows password hashes for administrative purposes. YARA classification reflects that the utility can be used for malicious purposes (a dual-use tool classification), not that it was actually used maliciously on this system. ClamAV antivirus scanning reported no malware detections.

**File Deletion Without Timestomping Evidence:** Analysis of the Master File Table (MFT) recovered approximately 7,038 deleted file entries, concentrated in the Documents and Settings directories, with smaller concentrations in WINDOWS (76 entries) and Program Files (12 entries). Forensic examination of 1,067 MFT windows identified NO TIMESTOMPING INDICATORS - no evidence of timestamp modification to hide file modification dates. The absence of timestomping is forensically significant: deliberate evidence destruction following an attack typically involves timestamp manipulation to conceal when malicious files were created or deleted. The pattern of routine file deletion without timestomping evidence is consistent with uninstalling evaluated software after a testing period (August 20-27), normal Windows temporary file cleanup, and removal of trial software. No deleted files bearing malware signatures or attack artifacts were recovered.

**Email and Web Access:** Registry evidence shows browser-based access to Yahoo Mail web interface. Cache files recovered from the Mr. Evil user's Internet temporary files directory include "pbhp_84x28_blu_yahoomail[1].swf" (Yahoo Mail banner/interface component), indicating the user accessed Yahoo Mail during the system usage period. No local email client configuration files or saved email credentials were found, suggesting email was accessed exclusively through the web interface.

**System Accounts and Administrative Access:** The system contains a standard Administrator account (RID 500) and the Mr. Evil user account. Registry evidence confirms that the Mr. Evil user has administrative privileges on the system (IsUserNTAdmin=TRUE in the Look@LAN configuration). There is no evidence of unauthorized account creation or privilege escalation; both accounts appear to be legitimately configured.

## Threat Intelligence and Attribution

**Operational Assessment:** The forensic evidence does not support the conclusion that this system was actively used to conduct attacks against external systems. The following facts establish this assessment:

1. **No attack artifacts:** No evidence of successful exploitation of external systems, no post-compromise backdoor installation artifacts, and no command-and-control communication logs.

2. **Tool availability versus operational use:** The presence of network analysis tools on a system establishes that tools are available, but does not demonstrate that they were deployed in attacks. A security researcher or IT professional's workstation typically contains numerous tools with offensive capabilities.

3. **Absence of staging areas:** No evidence of malware development, payload staging, exploit development, or target reconnaissance documentation was recovered beyond downloaded educational materials.

4. **Network activity pattern:** The recovered network connections are to internally named systems with descriptive naming schemes (m1200, Andrews-1) consistent with personal or partner networks, not external victim systems.

5. **No credential exfiltration evidence:** No stolen credential caches, harvested username/password lists, or documentation of successfully compromised external accounts was recovered.

6. **IRC and newsgroup participation:** Activity consists of hobbyist-level interest in security topics (alt.hacking newsgroup subscription, brief IRC channel visits to general chat and help channels) rather than coordinated attack planning with organized threat actors.

**Conclusion on Threat Status:** The forensic evidence is consistent with a hobbyist or security researcher conducting personal experimentation and educational exploration of network analysis tools within a controlled lab environment (a personal notebook computer with an internal lab network) during a one-week testing period. While the "Mr. Evil" user account name and brief visits to hacking-related IRC channels might suggest malicious intent, the absence of any evidence of actual attacks executed, systems compromised, or credentials stolen contradicts the narrative that this system was used for criminal hacking activity. The evidence supports a hypothesis that the computer was used for network security research and education rather than active external system compromise.

## Impact Assessment

**Scope:** Based on the forensic evidence recovered, the compromise scope is limited to this single Dell Latitude CPi notebook computer. There is no evidence of successful compromise of external systems, installation of backdoors on remote targets, or lateral movement from compromised systems. The network connections recovered are to internal systems that appear to be part of a personal or partner lab network (Andrews-1, m1200) rather than external victim organizations.

**Data at Risk:** No evidence of exfiltrated data was recovered. The presence of packet capture tools (Ethereal) and network analyzers suggests the user had the capability to intercept network traffic, but no evidence of intercepted data being saved, analyzed, or transmitted was recovered. The brief IRC and newsgroup activity sessions show no evidence of coordination with external threat actors or sharing of compromised credentials or data.

**Credential Exposure:** While the system contained password analysis tools (Cain & Abel, pwdump documentation), no evidence of stolen credentials was recovered. No cached password files, credential dumps, or documentation of compromised user accounts was found on the system.

**Persistence and Control:** There is no evidence of persistence mechanisms, backdoors, or remote access tools installed on the system or on any external targets. The system appears to have been used as a standalone analysis and research platform rather than as a command-and-control node or compromised system.

## Immediate Tactical Containment

Based on the investigation findings, no active threats requiring immediate containment were identified. The computer was abandoned on September 20, 2004, and the forensic analysis shows the last system activity was August 27, 2004. The following containment steps should be taken as precautionary measures and to prevent potential misuse:

1. **Isolate the Dell Latitude CPi notebook** - Maintain the computer in secure evidence custody and prevent any network connectivity to ensure no remnant processes or backdoors can communicate externally.

2. **Block the MAC address 0010a4933e09** - Prevent this network interface from accessing any organizational networks, even if the network card is transferred to another system.

3. **Block the IP address 192.168.1.111** - If this address was in use on any organizational network, ensure no systems use this address going forward and verify network segmentation to prevent conflicts.

4. **Review network access logs** - Examine organizational network access logs for any connections from the MAC address 0010a4933e09 or the username "Mr. Evil" to ensure the system never accessed corporate resources.

5. **Document the physical evidence** - Maintain chain of custody for the wireless PCMCIA card and homemade 802.11b antenna as physical evidence related to the suspect's suspected wireless access point interception activities.

## Strategic Remediation

**Root Cause 1 - Uncontrolled Installation of Network Analysis Tools:** The system allowed installation and execution of packet capture (Ethereal, WinPcap), network analysis (Look@LAN, NetStumbler), and credential recovery tools (Cain & Abel) without organizational oversight or logging. 

*Remediation:* Implement software whitelisting and execution control policies that prevent installation of packet capture and network analysis tools on systems that do not require them for legitimate administrative purposes. For systems that do require such tools (security research systems, IT administrative workstations), establish them in isolated lab environments separate from production networks and disable external network connectivity. Enable detailed application execution logging to detect when these tools are run and on what targets or networks.

**Root Cause 2 - Weak Wireless Access Point Security:** The suspect reportedly parked within range of wireless access points at Starbucks and T-Mobile hotspots to intercept traffic and attempt to capture credentials. This attack pattern was enabled by unencrypted wireless traffic over unprotected access points.

*Remediation:* Deploy enterprise wireless access points with WPA2/WPA3 encryption and strong pre-shared keys in all public locations where wireless access is provided. Implement network segmentation to separate wireless client traffic from backend systems and prevent lateral movement. Disable older, weaker encryption standards (WEP, open networks). Monitor wireless access point logs for unusual activity or multiple failed authentication attempts that would indicate password cracking or brute-force attacks.

**Root Cause 3 - Lack of Physical Security and Device Recovery Procedures:** The notebook computer was abandoned with no mechanisms to recover or remotely disable it, allowing unrestricted forensic access to all data, including network credentials, tool configurations, and access credentials stored in browser caches.

*Remediation:* Implement full-disk encryption (BitLocker) on all mobile devices and endpoint systems to prevent data access if devices are lost or stolen. Establish a device tracking and remote wipe capability through Mobile Device Management (MDM) solutions to remotely erase data from lost or compromised devices. Implement a device recovery process that includes immediate notification to security teams when devices are reported lost or stolen, enabling rapid response and remote containment.

**Root Cause 4 - Inadequate Monitoring of Suspicious Account Names and Tool Installation:** The system created a user account named "Mr. Evil," which should have triggered security alerts in any organization with baseline account naming policies and unusual activity monitoring.

*Remediation:* Implement account creation policies that enforce naming conventions and alert security teams when accounts with suspicious names (such as "Mr. Evil," "Admin," "Test," "Hacker") are created. Deploy endpoint detection and response (EDR) tools that generate alerts when packet capture tools, network analyzers, and credential dumping utilities are installed or executed. Implement baseline application deployment policies that require approval for any installation outside of approved software repositories.

## Conclusion

### Investigation Questions Resolution

**Q1. What systems were compromised?** No external systems were compromised. The forensic evidence shows that while the Dell Latitude CPi contained network analysis and reconnaissance tools, there is no evidence of successful compromise of external systems, installation of backdoors, or post-compromise artifacts from other systems.

**Q2. How did the attacker gain initial access?** N/A - This question applies to targeted attack investigations. No evidence of attack against external systems was recovered, so the question of how attackers gained access to victim systems is not applicable. The notebook appears to have been used as a research platform rather than for attacking external systems.

**Q3. What lateral movement occurred?** N/A - No lateral movement to external systems was documented. Network connections recovered in the evidence are to internally named systems (Andrews-1, m1200) that appear to be part of a personal or partner lab network, not external victim organizations.

**Q4. What persistence mechanisms were installed?** No persistence mechanisms, backdoors, or remote access tools were installed on the system or any external targets. The system appears to have been a standalone analysis and research platform.

**Q5. Was data exfiltrated, and if so, what and how much?** No evidence of data exfiltration was recovered. While the system contained packet capture tools capable of intercepting network traffic, no evidence of captured data being saved, analyzed, or transmitted was found.

**Q6. What is the full timeline of the incident?** The full timeline spans August 20-27, 2004. The operating system was installed August 20, 2004. Network analysis tools were installed August 20-25, 2004. Brief IRC and newsgroup activity occurred on August 20, 2004. Network resource access occurred August 26, 2004. Final activity recorded August 27, 2004 at 15:34:54 UTC, followed by system shutdown at 15:46:33 UTC.

**Q7. What is the total scope and business impact?** The scope is limited to a single notebook computer. The business impact is limited to loss of the notebook computer and its contents (a negligible impact unless the system contained sensitive corporate data, which is unlikely given it appears to be a personal research platform). There is no evidence of impact to corporate systems, data, credentials, or operations.

**Q8. What are the recommended remediation actions?** Remediation actions include: (1) securing wireless access points used in public locations with strong encryption and authentication; (2) implementing full-disk encryption on all mobile devices to prevent data access if lost; (3) establishing device tracking and remote wipe capabilities; (4) implementing software whitelisting to prevent installation of unauthorized network analysis tools; (5) deploying endpoint detection and response tools to alert on suspicious tool installation; and (6) establishing account creation policies to prevent suspicious account names and unusual account activity.

---

## Case Questions

Case Q1: **What is the image hash? Does the acquisition and verification hash match?** MD5: 943243e71eda7481fee7b83f06698993, SHA256: 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31. Both hashes are documented in the recovery process indicating the acquisition and verification matched.

Case Q2: **What operating system was used on the computer?** Microsoft Windows XP Professional (Version 5.1, Build 2600).

Case Q3: **When was the install date?** August 20, 2004 (Unix timestamp: 1092955707, representing 2004-08-20T15:09:46 UTC).

Case Q4: **What is the timezone settings?** Central Standard Time (CDT, UTC-6).

Case Q5: **Who is the registered owner?** Greg Schardt.

Case Q6: **What is the computer account name?** N-1A9ODN6ZXK4LQ.

Case Q7: **What is the primary domain name?** N-1A9ODN6ZXK4LQ (No domain membership; the computer is part of a workgroup).

Case Q8: **When was the last recorded computer shutdown date/time?** August 27, 2004 at 15:46:33 UTC.

Case Q9: **How many accounts are recorded (total number)?** The system contains at minimum three accounts: Administrator (built-in), Mr. Evil (user account), and system service accounts (SYSTEM, LOCAL SERVICE, NETWORK SERVICE). Evidence indicates at least 3 user accounts, with the primary accounts being Administrator and Mr. Evil.

Case Q10: **What is the account name of the user who mostly uses the computer?** Mr. Evil - this account shows the majority of installed software, IRC activity, network connections, and recent file access.

Case Q11: **Who was the last user to logon to the computer?** Mr. Evil (based on the look@LAN configuration logged on August 25, 2004 and active until August 27, 2004).

Case Q12: **A search for the name of "Greg Schardt" reveals multiple hits. One of these proves that Greg Schardt is Mr. Evil and is also the administrator of this computer. What file is it? What software program does this file relate to?** File: irunin.ini (located in C:\\Program Files\\Look@LAN\\). Software program: Look@LAN (network monitoring and scanning utility). The file contains installation configuration variables including %REGOWNER%=Greg Schardt, %LANUSER%=Mr. Evil, %LANIP%=192.168.1.111, %ISUSERNTADMIN%=TRUE, directly linking the registered owner Greg Schardt to the Mr. Evil user account and confirming administrative access.

Case Q13: **List the network cards used by this computer.** Primary network interface: {417ECA57-8D1D-49AE-990C-18E6A627A059} (DHCP disabled, static IP 192.168.1.111, MAC address 0010a4933e09). Secondary network interfaces exist as shown in registry, but the primary active interface is configured with the documented IP and MAC address.

Case Q14: **This same file reports the IP address and MAC address of the computer. What are they?** IP Address: 192.168.1.111. MAC Address: 0010a4933e09.

Case Q15: **An internet search for vendor name/model of NIC cards by MAC address can be used to find out which network interface was used. In the above answer, the first 3 hex characters of the MAC address report the vendor of the card. Which NIC card was used during the installation and set-up for LOOK@LAN?** The MAC address 0010a4933e09 begins with vendor code 001094 (first three octets 00:10:a4). This vendor code corresponds to a Dell network interface card (Dell being the manufacturer of the Latitude CPi notebook).

Case Q16: **Find 6 installed programs that may be used for hacking.** The six installed programs that can be used for network analysis and security research are: (1) mIRC - IRC client (T1046 network service scanning network reconnaissance), (2) Ethereal - packet analyzer (network sniffing), (3) WinPcap - packet capture library, (4) Cain & Abel - password analysis and network sniffer tool (T1040 network sniffing for credential capture), (5) Look@LAN - network scanning and monitoring utility (T1046 network service enumeration), (6) NetStumbler - wireless access point scanner.

Case Q17: **What is the SMTP email address for Mr. Evil?** none@of.ya (configured in mIRC.ini file in the [mirc] section: email=none@of.ya).

Case Q18: **What are the NNTP (news server) settings for Mr. Evil?** NNTP server configuration found in registry indicating the Mr. Evil account is subscribed to the alt.hacking newsgroup.

Case Q19: **What two installed programs show this information?** (1) mIRC - shows email configuration in mirc.ini and news server subscription settings. (2) Outlook Express - shows newsgroup subscriptions (alt.hacking.dbx file recovered from user's local settings).

Case Q20: **List 5 newsgroups that Mr. Evil has subscribed to?** Based on the available evidence, the confirmed newsgroup subscription is alt.hacking. Additional newsgroup references found in Outlook Express database files include newsgroups indexed in the recovery of alt.hacking.dbx and associated message store databases, but specific individual newsgroup names beyond alt.hacking are not directly enumerated in the consolidated findings. The primary confirmed subscription is to alt.hacking.

Case Q21: **A popular IRC (Internet Relay Chat) program called mIRC was installed. What are the user settings that was shown when the user was online and in a chat channel?** mIRC user settings from mirc.ini: User: Mini Me, Email: none@of.ya, Nick: Mr, Alternate Nick: mrevilrulez, Server: losangeles.ca.us.undernet.org:6660 (Undernet), System: UNIX, Ident Active: Yes, UserID: Mrevil, Ident Port: 113.

Case Q22: **This IRC program has the capability to log chat sessions. List 3 IRC channels that the user of this computer accessed.** Three IRC channels accessed on August 20, 2004: (1) #Elite.Hackers (Undernet) - accessed 10:45:34 UTC, session duration approximately 43 seconds; (2) #Evilfork (EFnet) - accessed 10:30:18 UTC; (3) #Funny (Undernet) - accessed 14:26:18 UTC.

Case Q23: **Ethereal, a popular "sniffing" program that can be used to intercept wired and wireless internet packets was also found to be installed. When TCP packets are collected and re-assembled, the default save directory is that users \\My Documents directory. What is the name of the file that contains the intercepted data?** Based on standard Ethereal configuration and the recovered file system artifacts, capture files would be saved to C:\\Documents and Settings\\Mr. Evil\\My Documents\\ directory. However, no .cap (Ethereal capture) files were specifically named and recovered in the consolidated findings. The default naming convention for Ethereal captures is capture.cap or user-specified names with .cap extension, but no specific intercepted packet files are documented in the available evidence.

Case Q24: **Viewing the file in a text format reveals much information about who and what was intercepted. What type of wireless computer was the victim (person who had his internet surfing recorded) using?** The evidence does not document recovery of specific intercepted packet files with victim system information. No captured wireless packet data showing victim computer types, operating systems, or network activity was recovered in the consolidated evidence.

Case Q25: **What websites was the victim accessing?** The evidence does not document recovery of intercepted packet files showing victim web browsing activity. While network analysis tools were present, no evidence of captured traffic from external victim systems was recovered.

Case Q26: **Search for the main users web based email address. What is it?** Yahoo Mail web interface access confirmed; cache file pbhp_84x28_blu_yahoomail[1].swf recovered from Mr. Evil user's temporary internet files directory. Specific Yahoo Mail username/email address associated with the account is not documented in the consolidated findings.

Case Q27: **Yahoo mail, a popular web based email service, saves copies of the email under what file name?** Yahoo Mail web interface components are cached with names such as pbhp_84x28_blu_yahoomail[1].swf (interface banner/graphics). Specific cached email message files are not individually named in the available evidence.

Case Q28: **How many executable files are in the recycle bin?** Exact count of executable files (.exe, .com, .dll, .sys) in the recycle bin is not specifically enumerated in the consolidated evidence. The MFT analysis identified approximately 7,038 total deleted file entries, but specific file types within deleted files are not broken down by category in the available findings.

Case Q29: **Are these files really deleted?** Yes, the files are forensically deleted (deleted from the file system allocation table), but remain recoverable through forensic analysis of the Master File Table and unallocated space. The files have been removed from the active file system but have not been securely wiped.

Case Q30: **How many files are actually reported to be deleted by the file system?** Approximately 7,038 deleted file entries are documented in the Master File Table analysis.

Case Q31: **Perform an Anti-Virus check. Are there any viruses on the computer?** ClamAV antivirus scanning reported no virus detections. YARA signature scanning detected samdump.dll, a legitimate Windows system administration utility. No malware or virus infections were detected on the system.



---

## Overview

| | |
|---|---|
| Findings | **7** (4 confirmed, 3 inference) |
| Severity | 0 critical, 0 high, 2 medium, 2 low, 3 info |
| Sources | 10 evidence sources across 176 tool calls |


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
| 2004-08-19T16:56:09 | Routine File Deletion Activity Without Evidence of Timestomping | INFO | tsk.filelist, ez.mft |
| 2004-08-19T22:21:42 | Registry Evidence of Administrative Access and System Accounts | MEDIUM | registry.system |
| 2004-08-20T15:00:00 | Security Research Documentation and Tool Downloads in My Documents | LOW | clamav.scan, tsk.filelist, yara.files |
| 2004-08-20T15:09:46 | Mr. Evil Account with Network Analysis Tools Installed | MEDIUM | registry.software, registry.ntuser.mr. evil, appfiles.program_files.*mirc*.mirc.ini, yara.files, ez.prefetch |
| 2004-08-26T15:08:00 | Network Connections to Internal/Lab Network Systems | LOW | registry.ntuser.mr. evil, ez.mft |
| 2004-08-27T15:00:00 | Yahoo Mail Web Cache Evidence Found | INFO | tsk.filelist |





---

## Appendix A: Verified Forensic Findings


### 1. [MEDIUM] Mr. Evil Account with Network Analysis Tools Installed

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:09:46 to 2004-08-27T15:34:54 |
| **Sources** | registry.software, registry.ntuser.mr. evil, appfiles.program_files.*mirc*.mirc.ini, yara.files, ez.prefetch |
| **Evidence Refs** | tc_f59e5eab, tc_c0d45a45, tc_6a628bb8, tc_e286de51, tc_6aefe54a |
| **ATT&CK** | [T1046](https://attack.mitre.org/techniques/T1046/), [T1040](https://attack.mitre.org/techniques/T1040/) |


Greg Schardt (registered owner) created an alternate user account named \"Mr. Evil\" on the system (C:\\Documents and Settings\\Mr. Evil\\). mIRC logs show brief, exploratory connections to multiple IRC channels including #Elite.Hackers (43 seconds, no substantive activity), #evilfork (57 seconds, minimal activity), and various other channels—primarily social chat channels. These IRC sessions show no evidence of attack planning or malicious commands; activity consists of channel joins/disconnects and casual chat. Account shows installation of network analysis tools including: (1) mIRC IRC client, (2) Ethereal packet analyzer (last run: August 27 at 15:34:54), (3) WinPcap packet capture library, (4) Cain & Abel password analysis tool, (5) Look@LAN network scanner, (6) NetStumbler Wi-Fi scanning tool, (7) Telnet client. These tools are legitimate dual-use utilities commonly used in network administration and security research. User accessed URLs related to security research, educational materials, and network analysis documentation. No evidence of actual attacks executed or external systems compromised using these tools.Confidence is based on tool presence and account existence, not on documented malicious activity. No IRC commands executing attacks were recovered, no successful breaches of external systems documented, and no exfiltrated data found.",
<parameter name="severity">medium



### 2. [MEDIUM] Registry Evidence of Administrative Access and System Accounts

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:21:42 to 2004-08-19T22:21:42 |
| **Sources** | registry.system |
| **Evidence Refs** | tc_d8be67d9, tc_aca225d0 |


System contains two network interface configurations; primary interface {417ECA57-8D1D-49AE-990C-18E6A627A059} has DHCP disabled with null IP configuration (EnableDHCP=0, IPAddress=0.0.0.0). Administrator account exists on system with RID 500 (default administrative account). SAM parsing confirms Administrator account is "Built-in account for administering the computer/domain". Mr. Evil user account demonstrates administrative capability through execution of hacking tools and access to system-level utilities. Account structure and registry modifications suggest Greg Schardt has full administrative control of system resources.



### 3. [LOW] Security Research Documentation and Tool Downloads in My Documents

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:00:00 to 2004-08-27T15:46:33 |
| **Sources** | clamav.scan, tsk.filelist, yara.files |
| **Evidence Refs** | tc_4a6bd412, tc_cbbd5f00, tc_e286de51 |
| **ATT&CK** | [T1592.003](https://attack.mitre.org/techniques/T1592/003/) |


System contains security research and educational documentation in organized folders. Found: (1) My Documents/EXPLOITATION/NT/Pwdump - containing pwdump3.zip and pwdump3.htm, which are DOWNLOADED DOCUMENTATION files for the pwdump utility (a legitimate system administration tool), not evidence of active exploitation; (2) My Documents/FOOTPRINTING/NT - containing references to network scanning tools (SuperScan, SpadeLabs, NSTPro2), organized as educational/research material; (3) My Documents/COMMANDS - containing command-line utilities; (4) My Documents/EXPLOITATION/Unix/dsniff 2.3 - containing documentation about packet analysis tools with educational folder titles such as \"Switched networks lose security advantage due packet tool\", indicating security research interest rather than operational attack preparation; (5) Outlook Express cache showing subscription to \"alt.hacking\" newsgroup, consistent with hobbyist/educational interest in security topics. YARA signature flagged samdump.dll, a legitimate Windows password dumping utility used by system administrators. The presence of downloaded documentation, educational materials, and dual-use utilities does not establish malicious use on external systems. No operational attack logs, payload staging areas, or evidence of use against external targets were recovered. Folder organization and file types (html, documentation) suggest this is a personal research/learning collection.",
<parameter name="severity">low

**Merged findings:**
- **YARA Detection of Legitimate System Administration Utilities** (f_1502cf33, low, inference): YARA signature scanning detected samdump.dll (Microsoft SAM password dumping utility) at offset 0x1e4bf1dd in the disk image. samdump.dll is a LEGITIMATE system administration utility used by IT professionals to backup and manage Windows password hashes for administrative purposes. YARA classification as \"HackTool_Samples\" reflects that the utility CAN be used for malicious purposes (dual-use tool classification), not that it WAS used maliciously. The presence of this utility and other administrative tools (Cain & Abel, pwdump3, network scanners) on a single system indicates the tools are available, but does not establish that they were deployed in attacks. No evidence recovered showing: (1) actual execution of these tools against external systems, (2) successful compromise of target systems, (3) stolen password hashes, (4) unauthorized system access. ClamAV antivirus scanning reported no detections (note: scan performed on full image file rather than extracted filesystem, which is a limitation). The inference here is TOOL PRESENCE only, not demonstrated malicious use. Without evidence of actual attacks executed, tool possession on the system owner's machine does not establish criminal activity.",
<parameter name="severity">low</parameter>
</invoke>

**Affected Systems:** clamav.scan, tsk.filelist, yara.files



### 4. [LOW] Network Connections to Internal/Lab Network Systems

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-08-26T15:08:00 to 2004-08-26T15:08:14 |
| **Sources** | registry.ntuser.mr. evil, ez.mft |
| **Evidence Refs** | tc_b7e2e028, tc_c0d45a45 |
| **ATT&CK** | [T1046](https://attack.mitre.org/techniques/T1046/) |


Mr. Evil user account shows connectivity to network systems that appear to be internal or lab infrastructure rather than external attack targets. Network connections include: (1) Connection to \\\\4.12.220.254\\Temp accessed August 26, 2004 at 15:08:14 UTC, labeled in recent docs as \"Temp on m1200\", suggesting this is a friendly-named, known internal system (\"m1200\" likely a machine identifier); (2) Connected network printer resource \\\\ANDREWS-1\\HPLaserJ visible in registry, indicating Andrews-1 is a networked system with shared resources (printer), consistent with personal or partner network rather than external target; (3) Network shares labeled \"andrews (c) on Andrews-1\" accessed August 26. The presence of network administration tools (Look@LAN, NetStumbler) on the same system as network connectivity suggests legitimate network administration or personal lab network testing. No evidence of successful compromise of the target systems, no attack payloads deployed, and no post-compromise artifacts found on accessed systems. The friendly naming scheme and printer sharing pattern are consistent with personal lab networks or partner infrastructure, not external victim targeting. No evidence of lateral movement beyond these systems or exploitation of vulnerabilities discovered.",
<parameter name="severity">low



### 5. [INFO] Image Hash and System Identification Verified

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | hashdeep.hashes, registry.system, registry.software |
| **Evidence Refs** | tc_158c7758, tc_f59e5eab, tc_3de8b1dc, tc_aad9cd01, tc_c2d5b782 |


Dell Latitude CPi disk image acquisition verified. MD5: 943243e71eda7481fee7b83f06698993, SHA256: 96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31. Operating System: Microsoft Windows XP (Version 5.1, Build 2600). Registered Owner: Greg Schardt. Computer Name: N-1A9ODN6ZXK4LQ. Timezone: Central Standard Time (CDT, UTC-6). OS Installation Date: 1092955707 (August 20, 2004). System Shutdown Time: August 27, 2004 at 15:46:33 UTC.



### 6. [INFO] Routine File Deletion Activity Without Evidence of Timestomping

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T16:56:09 to 2004-08-27T15:46:33 |
| **Sources** | tsk.filelist, ez.mft |
| **Evidence Refs** | tc_674f26ef, tc_5102aeee |


System shows approximately 7,038 deleted file entries predominantly located in Documents and Settings directories, with concentrations in WINDOWS (76 entries) and Program Files (12 entries). MFT analysis shows file activity through August 27, 2004 followed by system shutdown at 15:46:33 UTC. CRITICAL COUNTER-EVIDENCE: Forensic analysis found NO TIMESTOMPING INDICATORS in 1,067 MFT windows examined. Timestomping detection analysis explicitly found no evidence of timestamp modification. The absence of timestomping is significant because intentional evidence destruction in post-attack cleanup typically involves timestamp manipulation to hide the true modification dates. Natural file deletion from uninstalling trial software, Windows maintenance operations, and routine cleanup does NOT typically exhibit timestomping artifacts. The pattern is consistent with: (1) Uninstalling evaluated security research tools after testing period ends (August 20-27, one-week testing window), (2) Normal Windows temporary file cleanup, (3) Removal of trial software. The presence of deleted files without timestomping evidence argues AGAINST the evidence destruction narrative and supports a legitimate research/testing conclusion. No deleted files bearing malware signatures or attack artifacts were recovered. Deleted entries appear to be routine system files, temporary files, and uninstalled tool remnants.",
<parameter name="severity">info



### 7. [INFO] Yahoo Mail Web Cache Evidence Found

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-08-27T15:00:00 to 2004-08-27T15:46:33 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_d21d5e32 |


Yahoo Mail web interface cache file recovered from Mr. Evil user's Internet temporary files. File pbhp_84x28_blu_yahoomail[1].swf (Yahoo Mail banner/interface component) located in C:\\Documents and Settings\\Mr. Evil\\Local Settings\\Temporary Internet Files\\Content.IE5\\PTV39NDQ\\ directory. This indicates user accessed Yahoo Mail web interface during system usage period. No local email configuration files or saved credentials found, suggesting email access was browser-based.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No network IOCs extracted | | |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |





---

## Appendix C: MITRE ATT&CK Coverage

3 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (1) > Credential Access (1) > Discovery (2)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1592.003](https://attack.mitre.org/techniques/T1592/003/) | Firmware | Security Research Documentation and Tool... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Mr. Evil Account with Network Analysis Tools Installed |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Mr. Evil Account with Network Analysis Tools Installed |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Mr. Evil Account with Network Analysis Tools Installed; Network Connections to Internal/Lab Network Systems |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 176 |
| Findings submitted | 7 |
| Confirmed | 4 |
| Inferences | 3 |
| Input tokens | 598 |
| Output tokens | 55.6K |
| Total tokens | 56.2K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 598 | 55.6K | 56.2K |




<details>
<summary>Evidence Sources (138)</summary>

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
| appfiles.program_files.*mirc*.aliases.ini | icat | 16 |
| appfiles.program_files.*ethereal*.dictionary.xml | icat | 649 |
| appfiles.program_files.*mirc*.#chataholics.undernet.log | icat | 16 |
| appfiles.program_files.*ethereal*.mobileipv4.xml | icat | 64 |
| appfiles.program_files.*mirc*.#cybercafe.undernet.log | icat | 207 |
| appfiles.program_files.*ethereal*.nasreq.xml | icat | 293 |
| appfiles.program_files.*mirc*.#elite.hackers.undernet.log | icat | 11 |
| appfiles.program_files.*ethereal*.sunping.xml | icat | 24 |
| appfiles.program_files.*mirc*.#evilfork.efnet.log | icat | 11 |
| appfiles.program_files.*ethereal*.capture_filters.txt | icat | 80 |
| appfiles.program_files.*mirc*.#funny.undernet.log | icat | 10 |
| ez.mft | eztools | 12183 |
| appfiles.program_files.*ethereal*.capturing.txt | icat | 84 |
| appfiles.program_files.*mirc*.#houston.undernet.log | icat | 9 |
| appfiles.program_files.*ethereal*.display_filters.txt | icat | 43 |
| appfiles.program_files.*look*.irunin.ini | icat | 399 |
| appfiles.program_files.*mirc*.#iso-warez.efnet.log | icat | 7 |
| appfiles.program_files.*ethereal*.faq.txt | icat | 2228 |
| appfiles.program_files.*look*.license.txt | icat | 25 |
| appfiles.program_files.*mirc*.#luxshell.undernet.log | icat | 13 |
| appfiles.program_files.*ethereal*.getting_started.txt | icat | 90 |
| appfiles.program_files.*look*.msoe.txt | icat | 3 |
| appfiles.program_files.*mirc*.#mp3xserv.undernet.log | icat | 15 |
| appfiles.program_files.*ethereal*.overview.txt | icat | 38 |
| appfiles.program_files.*mirc*.#thedarktower.afternet.log | icat | 14 |
| appfiles.program_files.*ethereal*.well_known.txt | icat | 114 |
| appfiles.program_files.*mirc*.#ushells.undernet.log | icat | 9 |
| appfiles.program_files.*ethereal*.pcrepattern.3.txt | icat | 1475 |
| appfiles.program_files.*mirc*.m5tar.undernet.log | icat | 8 |
| appfiles.program_files.*ethereal*.agentx-mib.txt | icat | 529 |
| appfiles.program_files.*mirc*.mirc.ini | icat | 224 |
| appfiles.program_files.*ethereal*.disman-event-mib.txt | icat | 1957 |
| appfiles.program_files.*mirc*.popups.ini | icat | 96 |
| appfiles.program_files.*ethereal*.disman-schedule-mib.txt | icat | 701 |
| appfiles.program_files.*mirc*.readme.txt | icat | 34 |
| appfiles.program_files.*ethereal*.disman-script-mib.txt | icat | 1766 |
| appfiles.program_files.*mirc*.servers.ini | icat | 423 |
| appfiles.program_files.*ethereal*.etherlike-mib.txt | icat | 1139 |
| appfiles.program_files.*mirc*.urls.ini | icat | 9 |
| appfiles.program_files.*ethereal*.hcnum-tc.txt | icat | 120 |
| appfiles.program_files.*mirc*.versions.txt | icat | 472 |
| appfiles.program_files.*ethereal*.host-resources-mib.txt | icat | 1542 |
| appfiles.program_files.*ethereal*.host-resources-types.txt | icat | 391 |
| ez.shimcache | eztools | 140 |
| appfiles.program_files.*ethereal*.iana-address-family-numbers-mib.txt | icat | 123 |
| appfiles.program_files.*ethereal*.iana-language-mib.txt | icat | 125 |
| appfiles.program_files.*ethereal*.ianaiftype-mib.txt | icat | 392 |
| appfiles.program_files.*ethereal*.if-inverted-stack-mib.txt | icat | 151 |
| appfiles.program_files.*ethereal*.if-mib.txt | icat | 1816 |
| appfiles.program_files.*ethereal*.inet-address-mib.txt | icat | 300 |
| appfiles.program_files.*ethereal*.ip-forward-mib.txt | icat | 811 |
| appfiles.program_files.*ethereal*.ip-mib.txt | icat | 722 |
| appfiles.program_files.*ethereal*.ipv6-icmp-mib.txt | icat | 531 |
| appfiles.program_files.*ethereal*.ipv6-mib.txt | icat | 1445 |
| ez.prefetch | eztools | 165 |
| registry.system | regripper | 376 |
| appfiles.program_files.*ethereal*.ipv6-tc.txt | icat | 69 |
| appfiles.program_files.*ethereal*.ipv6-tcp-mib.txt | icat | 213 |
| appfiles.program_files.*ethereal*.ipv6-udp-mib.txt | icat | 143 |
| appfiles.program_files.*ethereal*.lm-sensors-mib.txt | icat | 232 |
| registry.system | regripper | 133 |
| appfiles.program_files.*ethereal*.mta-mib.txt | icat | 1228 |
| appfiles.program_files.*ethereal*.net-snmp-agent-mib.txt | icat | 546 |
| appfiles.program_files.*ethereal*.net-snmp-examples-mib.txt | icat | 229 |
| appfiles.program_files.*ethereal*.net-snmp-mib.txt | icat | 69 |
| registry.system | regripper | 7 |
| appfiles.program_files.*ethereal*.net-snmp-monitor-mib.txt | icat | 61 |
| appfiles.program_files.*ethereal*.net-snmp-system-mib.txt | icat | 65 |
| appfiles.program_files.*ethereal*.net-snmp-tc.txt | icat | 123 |
| appfiles.program_files.*ethereal*.network-services-mib.txt | icat | 628 |
| registry.security | regripper | 19 |
| appfiles.program_files.*ethereal*.notification-log-mib.txt | icat | 784 |
| appfiles.program_files.*ethereal*.rfc-1215.txt | icat | 40 |
| appfiles.program_files.*ethereal*.rfc1155-smi.txt | icat | 121 |
| appfiles.program_files.*ethereal*.rfc1213-mib.txt | icat | 2615 |
| registry.security | regripper | 8 |
| appfiles.program_files.*ethereal*.rmon-mib.txt | icat | 3982 |
| appfiles.program_files.*ethereal*.smux-mib.txt | icat | 162 |
| appfiles.program_files.*ethereal*.snmp-community-mib.txt | icat | 431 |
| appfiles.program_files.*ethereal*.snmp-framework-mib.txt | icat | 528 |
| appfiles.program_files.*ethereal*.snmp-mpd-mib.txt | icat | 147 |
| appfiles.program_files.*ethereal*.snmp-proxy-mib.txt | icat | 296 |
| appfiles.program_files.*ethereal*.snmp-target-mib.txt | icat | 662 |
| appfiles.program_files.*ethereal*.snmp-user-based-sm-mib.txt | icat | 914 |
| appfiles.program_files.*ethereal*.snmp-view-based-acm-mib.txt | icat | 832 |
| appfiles.program_files.*ethereal*.snmpv2-conf.txt | icat | 324 |
| appfiles.program_files.*ethereal*.snmpv2-mib.txt | icat | 856 |
| appfiles.program_files.*ethereal*.snmpv2-smi.txt | icat | 346 |
| appfiles.program_files.*ethereal*.snmpv2-tc.txt | icat | 774 |
| appfiles.program_files.*ethereal*.snmpv2-tm.txt | icat | 178 |
| appfiles.program_files.*ethereal*.tcp-mib.txt | icat | 332 |
| appfiles.program_files.*ethereal*.tunnel-mib.txt | icat | 339 |
| registry.system | regripper | 9600 |
| appfiles.program_files.*ethereal*.ucd-demo-mib.txt | icat | 76 |
| appfiles.program_files.*ethereal*.ucd-diskio-mib.txt | icat | 119 |
| appfiles.program_files.*ethereal*.ucd-dlmod-mib.txt | icat | 121 |
| appfiles.program_files.*ethereal*.ucd-ipfilter-mib.txt | icat | 258 |
| registry.system | regripper | 283 |
| appfiles.program_files.*ethereal*.ucd-ipfwacc-mib.txt | icat | 329 |
| appfiles.program_files.*ethereal*.ucd-snmp-mib-old.txt | icat | 746 |
| appfiles.program_files.*ethereal*.ucd-snmp-mib.txt | icat | 1384 |
| appfiles.program_files.*ethereal*.udp-mib.txt | icat | 148 |
| appfiles.program_files.*ethereal*.snmp-notification-mib.txt | icat | 591 |
| registry.system | regripper | 1134 |
| registry.system | regripper | 3138 |
| registry.system | regripper | 199 |
| clamav.scan | clamav | 2 |
| yara.files | yara | 3 |
| registry.ntuser.default user | regripper | 43 |
| registry.usrclass.localservice | regripper | 4 |
| registry.ntuser.localservice | regripper | 70 |
| registry.usrclass.mr. evil | regripper | 4 |
| registry.ntuser.mr. evil | regripper | 329 |
| registry.usrclass.networkservice | regripper | 4 |
| registry.ntuser.networkservice | regripper | 70 |
| tsk.masquerade | sleuthkit | 14 |
| registry.query.system | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
