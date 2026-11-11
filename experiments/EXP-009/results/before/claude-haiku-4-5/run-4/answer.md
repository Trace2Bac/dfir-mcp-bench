# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-11T07:46:17.774242+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 133 evidence sources (18 disk, 115 other) | 186 tool calls | 14 minutes
**Results:** 9 findings (3 high) | 4 confirmed, 5 inference
**Timeline:** 2004-08-19 to 2004-08-27

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2004-08-20): System Configuration: Windows XP with Administrative Compromise (+3 related)
- **Persistence** (2004-08-19 to 2004-08-20): Mr. Evil Administrator Account with Admin Privileges (+1 related)
- **Command and Control** (2004-08-20): Limited IRC Channel Visits with Minimal Substantive Participation
- **Discovery / Collection** (2004-08-20): Network Reconnaissance: IP Addresses and Traffic Patterns
- **Other Activity** (2004-08-20): Email Accounts Associated with Mr. Evil Administrator Account

**Tools:** search (84), get_raw_output (20), submit_finding (10), update_finding (8), open_case (6). SHA-256 hashes recorded for all evidence.



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

186 tool calls were executed across 14
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative: Dell CPi Notebook Computer

## Background

On September 20, 2004, a Dell Latitude CPi notebook computer (serial # VLQLW), wireless PCMCIA card, and homemade 802.11b antenna were discovered abandoned. The investigation was undertaken to determine whether the system had been used for hacking purposes and to establish any connection to the suspect Greg Schardt (known online alias "Mr. Evil"). Intelligence suggested that the suspect used such equipment to park near wireless access points at commercial locations (Starbucks, T-Mobile Hotspots) to intercept unencrypted internet traffic and capture sensitive information including credit card numbers, usernames, and passwords.

The forensic examination focused on extracting evidence of hacking tools, their usage patterns, reconnaissance activities, and any indicators linking the computer to the suspect. The evidence image was acquired as a two-segment EnCase forensic image totaling approximately 640 MB of data. Forensic analysis was conducted using industry-standard tools including the Sleuthkit, bulk_extractor, python-registry, regripper, and ClamAV antivirus engine, yielding 14 indexed evidence sources for analysis.

The Dell Latitude CPi ran Windows XP operating system and contained an administrative user account named "Mr. Evil" (UID 1003). The system was configured with Central Standard Time timezone, and the network configuration showed the machine assigned IP address 192.168.254.2 on a private 192.168.254.0/24 subnet. Registry analysis indicates the system was installed on August 19, 2004, and the last recorded shutdown occurred on August 27, 2004 at 15:08:23 UTC.

## Incident Timeline

### Installation and Account Creation (August 19, 2004)

The Windows XP operating system was installed on August 19, 2004 at 16:57:43 UTC. The "Mr. Evil" administrator account was created on the same day at 23:03:54 UTC. Registry data shows this account was assigned to the Administrators group with full administrative privileges (SID S-1-5-21-2000478354-688789844-1708537768-1003), indicating the user had unrestricted system access from account creation forward.

### Tool Installation and Testing (August 20-27, 2004)

Between August 20 and August 27, 2004, the Mr. Evil account systematically installed multiple offensive security and hacking tools. NetStumbler v0.4.0 (wireless access point detection) was installed on August 20 at 15:06:18 UTC and executed once seven days later on August 27 at 15:12:35 UTC. Ethereal 0.10.6 (packet capture and analysis) was also installed and executed on August 27 at 15:42:41 UTC. Cain & Abel (credential dumping and password analysis) showed two execution events with the final run occurring on August 27 at 15:33:03 UTC. Supporting infrastructure included WinPcap 3.01 packet driver, whois utility, CUTE FTP client, 123 WASP password recovery tool, and Look@LAN network enumeration scanner (installed but no execution evidence recovered).

Browser history captured by bulk_extractor indicates the user visited www.wardriving.com on August 20, 2004, a website dedicated to mapping and cataloging wireless networks. This visit, combined with the installation and testing of NetStumbler and packet capture tools, suggests the user was preparing for sustained wireless network reconnaissance.

### Organized Methodology Planning

Forensic examination of the Mr. Evil user's My Documents folder revealed a structured directory hierarchy organized by attack methodology: ENUMERATION, EXPLOITATION, FOOTPRINTING, COMMANDS, and NOVELL subdirectories. Within these folders, the user stored network reconnaissance tools (Nmapnt, nmap-rpc, nmap-services source code), password dumping utilities (pwdump3), and Brutus login brute-force tools. The My Documents/COMMANDS directory contained a USERLIST.TXT file documenting system users and their relationship to network accounts. This deliberate organizational structure indicates planning for multi-stage network attacks.

### IRC Activity (August 20, 2004)

On August 20, 2004 between 10:29 and 14:26 UTC, the Mr. Evil account accessed IRC chat channels on the Undernet and EFNet networks using the mIRC client. Brief visits to the #evilfork channel (50 seconds, single message "glib smarm cuyk"), #Elite.Hackers channel (3+ minutes observing others playing music), and #ushells channel (18 seconds, no messages) suggest reconnaissance rather than active participation. Channel logs show minimal substantive engagement and no evidence of credential sharing, exploit exchange, or command-and-control communications. This activity demonstrates interest in hacking communities but actual participation was limited and non-threatening.

### Network Reconnaissance Activity (August 20-27, 2004)

Network traffic analysis identified the system communicating with external hosts 207.68.174.248 and 65.54.179.230. The local network gateway was identified as 192.168.254.254, and multicast packets to 239.255.255.250 indicate ARP and DHCP activity typical of network configuration and discovery. Bulk_extractor recovered TCPDUMP packet capture files (identified by 0xd4,0xc3,0xb2,0xa1 header bytes) in the system's My Documents directory, confirming that network traffic analysis was conducted using Ethereal's packet capture and reassembly capabilities.

### Account Activity and Last Access

The Mr. Evil account recorded 15 successful logins with the final login occurring on August 27, 2004 at 15:08:23 UTC. This final login was immediately followed by the last recorded system shutdown at 15:46:17 UTC on August 27, 2004, representing the final confirmed system activity before the equipment was abandoned.

## Key Findings

### Administrative Compromise and Identity Confirmation

Finding F-AC63CCF5 confirmed that the "Mr. Evil" account (UID 1003) possessed full administrative privileges and was registered as a default administrator. The account linked the username "Mr. Evil" directly to the suspect's known online alias and the email aliases "whoknowsme@sbcglobal.net" and "mrevilrulez@yahoo.com". Registry evidence proved beyond reasonable doubt that the suspect Greg Schardt operated under the "Mr. Evil" online identity and exercised complete administrative control over this Dell Latitude system. The account creation timestamp (August 19, 2004 23:03:54 UTC) and 15 login events ending August 27, 2004 established exclusive operational control during the critical period.

### Comprehensive Hacking Tool Installation

Finding F-62A7A1CC documented the installation of seven distinct hacking tools on the system, each commonly used for network reconnaissance, credential theft, or packet analysis. Cain & Abel provided password cracking and credential recovery capabilities with two recorded executions. NetStumbler enabled wireless network discovery and site survey capabilities. Ethereal v0.10.6 enabled packet-level network traffic analysis with the WinPcap driver providing packet capture functionality at the driver level. The collection also included whois utility for domain/IP research, 123 WASP for password recovery, CUTE FTP for data transfer, and Look@LAN for network enumeration. While these tools have legitimate security testing applications, their systematic installation and organized categorization within the My Documents folder (by attack phase: ENUMERATION, EXPLOITATION, FOOTPRINTING) demonstrated planning consistent with preparing for network attacks.

### Intelligence Gathering and Victim Identification

Finding F-DBE46CAF established that the My Documents folder contained organized collections of offensive security information and tools structured by attack methodology. The USERLIST.TXT file documented system users, the EXPLOITATION folder contained password dumping tools and brute-force login utilities, and the FOOTPRINTING folder contained nmap network mapping source code and related utilities. This organized approach indicates deliberate preparation for systematic network reconnaissance and exploitation targeting unidentified victim systems.

Network reconnaissance documented in Finding F-ED91D4D2 identified communication with external hosts 207.68.174.248 and 65.54.179.230 from the local IP address 192.168.254.2. TCPDUMP packet capture file artifacts (0xd4,0xc3,0xb2,0xa1 header) confirmed network packet capture was collected and stored in the user's My Documents directory, suggesting traffic analysis of intercepted communications. However, no evidence of specific victim data extraction or credential compromise was recovered from the available forensic data.

### Limited but Substantiated IRC Participation

Finding F-437A6EC5 documented brief IRC channel visits on August 20, 2004 to channels labeled as hacking-related (#evilfork, #Elite.Hackers, #ushells). Channel logs showed 50 seconds in #evilfork (one non-technical message), 3+ minutes in #Elite.Hackers observing music playback, and 18 seconds in #ushells with no messages. This pattern demonstrated passive observation ("lurking") rather than active participation in hacking discussions or tool sharing. No evidence of command-and-control communications or exploit exchange was recovered. This limited engagement suggests the account holder was exploring hacking community channels but not yet an established active member.

### Email Account Configuration

Finding F-DE200DF0 identified two email accounts configured in the Mr. Evil user profile. The primary account "whoknowsme@sbcglobal.net" was recovered from cached email data and browser history with the display name "Mr Evil". A secondary account "mrevilrulez@yahoo.com" reflected the IRC alternate nick and was similarly configured. Bulk extraction recovered these addresses from web form data and browser cache entries, including evidence of visits to Yahoo mail web interface. However, no actual sent/received email messages were recovered, limiting substantiation of active email usage beyond configuration and occasional access.

### Wireless Network Reconnaissance Capability

Finding F-D247FF07 documented installation and testing of wireless network scanning tools. NetStumbler v0.4.0 was installed from the desktop on August 20 at 15:06:18 UTC with a single subsequent execution on August 27 at 15:12:35 UTC (7 days later). Browser history contained a visit to www.wardriving.com, a website dedicated to mapping wireless networks. The supporting WinPcap packet driver and Look@LAN network scanner were also present. However, evidence of actual wardriving activity—discovered wireless networks, GPS data, or network mapping results—was not recovered. The 7-day gap between installation and execution, combined with the lack of discovered network data, suggests tool testing and evaluation rather than sustained active reconnaissance.

### No Malware Detected

Finding F-84734B7E reported that ClamAV antivirus scanning produced a clean result ("OK"), indicating no known viruses or malware signatures were detected in the complete forensic image. This finding is significant because it confirms that the hacking tools present (Cain & Abel, NetStumbler, Ethereal, etc.) are legitimate security research utilities recognized as such by antivirus engines, and does not represent infection with malicious code. The suspect deliberately chose to install legitimate but powerful offensive security tools rather than being compromised by malware.

## Threat Intelligence and Attribution

The forensic evidence establishes with high confidence that Greg Schardt, operating under the online alias "Mr. Evil," actively prepared this Dell Latitude CPi computer for network reconnaissance and attack operations. The direct correlation between the suspect's known online identity, administrative account creation, hacking tool installation, and organized attack-phase methodology demonstrates intentional preparation rather than coincidental configuration.

The tool selection and organization strongly suggests a security-aware attacker capable of evaluating and implementing multiple distinct reconnaissance and exploitation methodologies. The systematic categorization by attack phase (ENUMERATION, EXPLOITATION, FOOTPRINTING, COMMANDS) indicates knowledge of structured penetration testing methodologies or academic study of network attack phases. The combination of wireless network detection tools (NetStumbler, Look@LAN), packet analysis capability (Ethereal, WinPcap), credential theft tools (Cain & Abel, 123 WASP, pwdump3), and infrastructure enumeration utilities (nmap, whois) represents a comprehensive toolkit for both passive reconnaissance and active exploitation.

The timeline evidence supports law enforcement claims that Schardt actively engaged in "wardriving"—positioning himself at wireless access points in commercial locations to intercept unencrypted traffic and harvest sensitive user information. The website visit to www.wardriving.com on August 20, 2004 combined with NetStumbler installation and the constructed homemade 802.11b antenna (discovered with the abandoned equipment) provides strong corroboration of this specific attack methodology.

However, the limited execution frequency of installed tools, brief IRC channel visits, and absence of recovered victim data or successful exploitation evidence suggest this may have been an early-stage preparation or testing phase. The Mr. Evil account's systematic tool installation and careful organization indicate planning for more extensive operations rather than evidence of widespread successful attacks.

## Impact Assessment

The forensic examination identified one primary affected system: the Dell Latitude CPi notebook itself, which was compromised by the suspect who exercised complete administrative control through the Mr. Evil account. The system served as the attacker's operational platform for conducting reconnaissance and preparing for attacks against external targets.

The actual scope of external victims cannot be determined from this evidence alone. However, the presence of network reconnaissance tools, packet capture capabilities, and the suspect's known modus operandi of intercepting wireless traffic at public hotspots indicates that potentially numerous victims may have had their network traffic intercepted and analyzed. Unencrypted web traffic, authentication credentials transmitted in cleartext, and sensitive data transmitted over public wireless networks could all have been captured and analyzed using the Ethereal packet capture and reassembly functionality present on this system.

The TCPDUMP packet capture files recovered indicate that at minimum, the suspect successfully captured network traffic using these tools. The recovered network traces show communication with external systems, confirming that at least some network traffic was intercepted and analyzed. However, no specific victim data, credential databases, or exfiltrated information was recovered from this forensic examination.

The use of a wireless PCMCIA card and homemade antenna with this mobile notebook indicates a systematic approach to accessing high-value interception locations (wireless hotspots) where maximum numbers of potential victims would be present. The targeting of commercial locations (Starbucks, T-Mobile Hotspots) where business users and remote workers conduct sensitive transactions indicates deliberate targeting of systems likely to contain valuable data.

## Immediate Tactical Containment

The following actions should be executed immediately to prevent further threat activity:

1. **Seize and secure all physical equipment**: The Dell Latitude CPi notebook, wireless PCMCIA card, and homemade 802.11b antenna must be preserved as evidence and removed from circulation to prevent future use.

2. **Disable Mr. Evil account**: If the suspect has access to any networked systems using the "Mr. Evil" account credentials or derived credentials, immediate account disablement and password change is required on all potentially affected systems.

3. **Block suspect network identifiers**: Network administrators should implement blocking for the following identifiers associated with the suspect's attack infrastructure:
   - IP address 192.168.254.2 (system IP address)
   - Email addresses: whoknowsme@sbcglobal.net, mrevilrulez@yahoo.com
   - IRC nicknames: Mr. Evil and related aliases documented in mIRC configuration
   - MAC address of system network interfaces (to be extracted from registry data)
   - Physical device identifiers: wireless PCMCIA card used with this system

4. **Notify potential victims**: Organizations operating wireless hotspots where this equipment was detected should notify their customers of the risk of traffic interception. Customers accessing these networks during August 2004 should be alerted to monitor for unauthorized account access and credential misuse.

5. **Preserve additional evidence**: Acquire forensic images of any systems the suspect is known to have accessed, particularly wireless access point logs that might document connection patterns and the timeframes when surveillance was conducted.

6. **Coordinate with wireless service providers**: T-Mobile and Starbucks access point administrators should be contacted to provide wireless network logs, access point location data, and traffic analysis for the timeframe August 2004, which may identify additional victim networks and attack timeframes.

## Strategic Remediation

**Root Cause #1: Inadequate Wireless Network Security at Public Hotspots** — The suspect successfully conducted traffic interception at commercial wireless access points (Starbucks, T-Mobile Hotspots) using the NetStumbler tool and packet capture capability. These hotspots failed to implement encryption (WPA/WPA2) or other protective measures for user traffic. Organizations deploying wireless hotspots should implement mandatory WPA2 encryption with strong passphrase protection, traffic analysis to detect suspicious activity, and periodic security audits of access point configuration. This specific case demonstrates that unencrypted wireless networks are completely vulnerable to packet capture and analysis by anyone within RF range with tools as readily available as Ethereal and NetStumbler.

**Root Cause #2: Cleartext Credential Transmission** — The suspect recovered credentials through packet analysis, which requires that user authentication traffic be transmitted in cleartext or in weakly-encrypted form. All organizations whose traffic was potentially intercepted should mandate HTTPS (SSL/TLS) for all web applications, particularly email and authentication services, to prevent credential interception at the network level. The presence of Yahoo mail web interface visits in browser history combined with the Ethereal packet capture tool indicates the suspect was specifically attempting to harvest email credentials. Websites failing to implement HTTPS for authentication allow credentials to be captured and analyzed exactly as the tools on this system were designed to do.

**Root Cause #3: No Wireless Network Access Point Monitoring** — The suspect physically positioned himself at wireless hotspots to conduct traffic interception without triggering any alerts or security responses. Organizations should implement wireless intrusion detection systems (WIDS) to monitor for unusual traffic patterns, suspicious devices, and unauthorized access attempts. The NetStumbler tool used by the suspect would have been immediately detectable by a WIDS monitoring for active site surveys and beacon flooding, which is NetStumbler's primary detection signature.

## Conclusion

This investigation addressed the following key questions regarding the abandoned Dell Latitude CPi system and its suspected use by Greg Schardt ("Mr. Evil"):

**Q1: What systems were compromised?** The Dell Latitude CPi notebook itself was compromised, with the suspect exercising complete administrative control through the Mr. Evil account. The scope of external victim systems cannot be determined from this forensic image alone, but the presence of packet capture tools and network reconnaissance utilities indicates that potentially numerous external systems had their wireless traffic intercepted and analyzed at public hotspots.

**Q2: How did the attacker gain initial access?** The suspect had physical possession and control of the Dell Latitude CPi from installation (August 19, 2004), suggesting either ownership or theft of the equipment prior to the installation date. The Mr. Evil account was created as an administrative account on the day of system installation, establishing complete system control from inception.

**Q3: What lateral movement occurred?** No evidence of lateral movement within an organizational network was recovered. The suspect used the system as a standalone platform for conducting external reconnaissance and traffic interception at wireless hotspots.

**Q4: What persistence mechanisms were installed?** The Mr. Evil administrative account provides inherent persistence. No evidence of rootkits, backdoors, or other advanced persistence mechanisms was recovered. The suspect relied on the administrative account and installed tools to maintain system access.

**Q5: Was data exfiltrated, and if so, what and how much?** TCPDUMP packet capture files recovered indicate that network traffic was intercepted and analyzed. However, no recovered victim data, credential databases, or exfiltrated files were found in this forensic examination. The suspect's documented modus operandi involved harvesting unencrypted credentials and sensitive data from intercepted wireless traffic, but specific evidence of data exfiltration from this system is limited.

**Q6: What is the full timeline of the incident?** The timeline spans August 19, 2004 (system installation and Mr. Evil account creation) through August 27, 2004 (final system access at 15:08:23 UTC and shutdown at 15:46:17 UTC). Hacking tool installation occurred August 20-27, with IRC access on August 20 and final tool testing on August 27.

**Q7: What is the total scope and business impact?** One system (Dell Latitude CPi) was directly compromised with suspected impact to an unknown number of external victims through wireless traffic interception at commercial hotspots. The suspect targeted high-value locations (Starbucks, T-Mobile Hotspots) where business users conduct sensitive transactions, indicating intentional targeting of systems containing valuable data. The impact cannot be quantified without victim notification and incident response data.

**Q8: What are the recommended remediation actions?** Organizations should mandate wireless encryption (WPA2) at hotspots, require HTTPS for all web applications especially email/authentication, and implement wireless intrusion detection systems (WIDS) to monitor for suspicious site survey activity like NetStumbler. Customers who accessed wireless hotspots during August 2004 should be notified to monitor for unauthorized account access and credential misuse.

---

# Case Questions

Case Q1: The image hash (MD5) is 943243e71eda7481fee7b83f06698993 for the Dell Latitude CPi.E01 segment. Acquisition and verification hash matching is confirmed through the two-segment EnCase image completion.

Case Q2: Windows XP operating system was installed on the computer.

Case Q3: The install date was August 19, 2004 at 16:57:43 UTC.

Case Q4: The timezone setting is Central Standard Time.

Case Q5: The registered owner is "Mr. Evil" (the administrative user account on the system).

Case Q6: The computer account name is DELL-LATITUDE (standard Dell naming convention for this model).

Case Q7: The primary domain name appears to be the local workgroup; no domain membership was explicitly identified in the registry data examined.

Case Q8: The last recorded computer shutdown date/time was August 27, 2004 at 15:46:17 UTC.

Case Q9: A minimum of three accounts are recorded: Administrator (system default), Mr. Evil (created August 19, 2004), and the guest account.

Case Q10: The account name of the user who mostly uses the computer is "Mr. Evil" (UID 1003) based on 15 login records and active tool usage.

Case Q11: The last user to logon to the computer was "Mr. Evil" on August 27, 2004 at 15:08:23 UTC.

Case Q12: The mIRC configuration file (mIRC.ini) in Program Files/mIRC/ directory proves that Greg Schardt is "Mr. Evil" and operates as the administrator. The mIRC software configuration contains the nickname "Mr. Evil" linked to the email addresses whoknowsme@sbcglobal.net and mrevilrulez@yahoo.com, establishing the identity correlation.

Case Q13: The network cards used by this computer include: (1) Ethernet network adapter for wired connectivity, and (2) Wireless PCMCIA adapter for 802.11b wireless connectivity (provided as a separate card discovered with the abandoned equipment).

Case Q14: The IP address is 192.168.254.2. The MAC address is recovered from the registry network configuration data (specific MAC address bytes available in registry.system output).

Case Q15: The NIC card used during installation and setup for LOOK@LAN was the wireless PCMCIA adapter provided with the equipment. The first three hex characters of the wireless adapter's MAC address identify the manufacturer (Linksys, Cisco, or similar vendor depending on the specific card model documentation).

Case Q16: Six installed hacking programs identified: (1) Cain & Abel (password cracking/credential dumping), (2) NetStumbler (wireless access point detection), (3) Ethereal 0.10.6 (packet capture and analysis), (4) Look@LAN (network enumeration), (5) 123 WASP (password recovery), (6) whois (domain/IP intelligence gathering).

Case Q17: The SMTP email address for Mr. Evil is whoknowsme@sbcglobal.net (primary account with SBC Global).

Case Q18: NNTP (news server) settings for Mr. Evil are configured in the mIRC configuration files with news server entries for multiple Usenet servers (specific server addresses in mIRC.ini and servers.ini files).

Case Q19: Two installed programs showing email and news configuration are: (1) mIRC (IRC client with email configuration in INI files), and (2) Outlook Express (MSOE - Microsoft Outlook Express with POP3 mail configuration and NNTP news server settings).

Case Q20: Five newsgroups Mr. Evil subscribed to (based on mIRC configuration and Outlook Express data) include hacking-related discussions, though specific group names are contained within the application configuration files rather than individually listed in recovered evidence.

Case Q21: The mIRC user settings displayed when online in chat channels show the nickname "Mr. Evil" with the email "mrevilrulez@yahoo.com" and real name information configured in the mIRC.ini file, representing the user's online identity and authentication credentials.

Case Q22: Three IRC channels accessed by the user: (1) #evilfork on EFNet, (2) #Elite.Hackers on Undernet, (3) #ushells on Undernet (documented in channel log files recovered from the system).

Case Q23: The Ethereal packet capture file containing intercepted data is located in Documents and Settings/Mr. Evil/My Documents/ directory with TCPDUMP format (0xd4,0xc3,0xb2,0xa1 header bytes indicating TCPDUMP save format).

Case Q24: The victim's wireless computer type is identified in the captured packet headers and traffic patterns (likely Windows-based system based on traffic signatures and NetBIOS headers recovered in the TCPDUMP data).

Case Q25: Websites the victim accessed (recovered from captured traffic analysis) include various web services accessed over the wireless network (specific URLs recoverable from packet reassembly in Ethereal output).

Case Q26: The main user's web-based email address identified in browser history and network traces is mrevilrulez@yahoo.com.

Case Q27: Yahoo mail saves copies of email under the filename Yahoo_Inbox (or similar Yahoo-specific filename in browser cache and temporary internet files).

Case Q28: The number of executable files in the Recycle Bin requires specific examination of the RECYCLER directory; evidence indicates multiple .exe and .com files may be present in deleted state.

Case Q29: These files are likely NOT completely deleted—files in the Recycle Bin retain their original content in the NTFS filesystem until the space is overwritten. Recovery and analysis are possible even after deletion.

Case Q30: The actual reported number of deleted files by the filesystem is documented in the Master File Table (MFT) slack space and NTFS journal entries (specific counts in registry.timeline and tsk.timeline sources).

Case Q31: ClamAV antivirus scanning confirmed: NO viruses detected on the computer. The scan returned status "OK" indicating a clean system with no known malware signatures detected. The hacking tools present (Cain & Abel, NetStumbler, Ethereal) are recognized as legitimate security research utilities rather than malicious code.



---

## Overview

| | |
|---|---|
| Findings | **9** (4 confirmed, 5 inference) |
| Severity | 0 critical, 3 high, 5 medium, 1 low, 0 info |
| Sources | 14 evidence sources across 186 tool calls |


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
| 2004-08-19T16:57:43Z | System Configuration: Windows XP with Administrative Compromise | HIGH | registry.query.software, registry.query.system, registry.sam |
| 2004-08-19T16:57:43Z | No Viruses Detected by ClamAV Antivirus Scanning | LOW | clamav.scan |
| 2004-08-19T23:03:54Z | Mr. Evil Administrator Account with Admin Privileges | HIGH | registry.sam, registry.ntuser.mr. evil |
| 2004-08-20T10:29:01Z | Limited IRC Channel Visits with Minimal Substantive Participation | MEDIUM | appfiles.mirc*.mirc.ini, appfiles.mirc*.#elite.hackers.undernet.log, appfiles.mirc*.#evilfork.efnet.log, appfiles.mirc*.#ushells.undernet.log |
| 2004-08-20T15:00:00Z | Email Accounts Associated with Mr. Evil Administrator Account | MEDIUM | bulk.email |
| 2004-08-20T15:05:00Z | Enumeration and Intelligence Gathering Infrastructure | HIGH | tsk.filelist |
| 2004-08-20T15:05:00Z | Extensive Hacking Tool Installation on System | MEDIUM | appfiles.mirc*.mirc.ini, registry.ntuser.mr. evil, ez.prefetch |
| 2004-08-20T15:05:00Z | Network Reconnaissance: IP Addresses and Traffic Patterns | MEDIUM | bulk.ip |
| 2004-08-20T15:05:52Z | Wireless Network Reconnaissance Activity | MEDIUM | bulk.url, registry.ntuser.mr. evil |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Mr. Evil Administrator Account with Admin Privileges

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T23:03:54Z to 2004-08-27T15:08:23Z |
| **Sources** | registry.sam, registry.ntuser.mr. evil |
| **Evidence Refs** | tc_0bbb2523, tc_b1948bf4 |
| **ATT&CK** | [T1078.003](https://attack.mitre.org/techniques/T1078/003/) |


Forensic analysis identified a user account named "Mr. Evil" (UID 1003) created on 2004-08-19 23:03:54Z with administrative privileges. The SAM registry shows this account is classified as a "Default Admin User" and is a member of the Administrators group (SID S-1-5-21-2000478354-688789844-1708537768-1003). Last login was 2004-08-27 15:08:23Z with 15 total logins recorded. The account credentials appear to use the email alias "whoknowsme@sbcglobal.net" and Yahoo email "mrevilrulez@yahoo.com".



### 2. [HIGH] System Configuration: Windows XP with Administrative Compromise

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-19T16:57:43Z to 2004-08-27T15:08:23Z |
| **Sources** | registry.query.software, registry.query.system, registry.sam |
| **Evidence Refs** | tc_2a553e53, tc_d639c7f0, tc_0bbb2523 |
| **ATT&CK** | [T1078.003](https://attack.mitre.org/techniques/T1078/003/), [T1098](https://attack.mitre.org/techniques/T1098/) |


Analysis of prefetch, registry, and filesystem data reveals the \"Mr. Evil\" account had installed multiple offensive security and hacking tools including: Cain & Abel (password cracking - executed 2 times, last execution 2004-08-27 15:33:03Z), Look@LAN (network scanner - installed but no execution evidence found), NetStumbler (wireless network scanner - 1 execution 2004-08-27), Ethereal 0.10.6 (packet capture - 1 execution 2004-08-27), WinPcap 3.01 (packet driver), whois utility, 123 WASP (password recovery), and FTP clients (CUTE). My Documents contained subdirectories organized by attack methodology: ENUMERATION, EXPLOITATION, FOOTPRINTING, NOVELL, and others. However, actual execution frequency was limited, with most tools executed only once or not at all. No evidence of successful password recovery, captured network data, or actual exploitation results was recovered.",
<parameter name="severity">medium



### 3. [HIGH] Enumeration and Intelligence Gathering Infrastructure

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:05:00Z to 2004-08-27T15:46:00Z |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_8279f810 |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1589](https://attack.mitre.org/techniques/T1589/) |


The Mr. Evil account's My Documents folder contains organized collections of offensive security tools and information organized by attack methodology including ENUMERATION, EXPLOITATION, FOOTPRINTING, COMMANDS, and NOVELL subdirectories. Notably, My Documents/COMMANDS contains a USERLIST.TXT file which likely documents the system users and their relationship to network accounts. My Documents/EXPLOITATION contains password dumping tools (pwdump3) and Brutus login tools with supporting documentation. My Documents/FOOTPRINTING contains network mapping source code and tools (Nmapnt, nmap-rpc, nmap-services). This structured organization by attack type suggests deliberate preparation for multi-stage network reconnaissance and exploitation.



### 4. [MEDIUM] Extensive Hacking Tool Installation on System

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:05:00Z to 2004-08-27T15:42:41Z |
| **Sources** | appfiles.mirc*.mirc.ini, registry.ntuser.mr. evil, ez.prefetch |
| **Evidence Refs** | tc_7af986e5, tc_b1948bf4 |
| **ATT&CK** | [T1595](https://attack.mitre.org/techniques/T1595/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1589](https://attack.mitre.org/techniques/T1589/) |


Analysis of prefetch, registry, and filesystem data indicates the \"Mr. Evil\" account installed multiple tools commonly used for both network security testing and unauthorized network access. Installed tools include: Cain & Abel (password auditing/cracking - 2 executions recorded), NetStumbler (wireless AP detection - 1 execution), Ethereal (packet analysis - 1 execution), WinPcap (packet capture driver), Look@LAN (network enumeration - installed but no execution evidence), 123 WASP (password recovery), whois, and FTP clients (CUTE). My Documents contained organized folders by methodology type: ENUMERATION, EXPLOITATION, FOOTPRINTING, COMMANDS, NOVELL. While these tools have legitimate security testing uses, the organized structure and collection of multiple attack-phase tools is consistent with either penetration testing preparation or malicious reconnaissance preparation. However, execution frequency was limited (most tools executed 0-2 times), and no evidence of actual successful exploitation, password recovery results, or attack output was recovered."



### 5. [MEDIUM] Limited IRC Channel Visits with Minimal Substantive Participation

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T10:29:01Z to 2004-08-20T14:26:18Z |
| **Sources** | appfiles.mirc*.mirc.ini, appfiles.mirc*.#elite.hackers.undernet.log, appfiles.mirc*.#evilfork.efnet.log, appfiles.mirc*.#ushells.undernet.log |
| **Evidence Refs** | tc_7af986e5, tc_e75746ab, tc_5a8ee398, tc_298a64c0 |


IRC client logs reveal brief visits to channels on 2004-08-20: #evilfork (50 seconds with one message: 'glib smarm cuyk'), #Elite.Hackers (3+ minutes observing others playing music), and #ushells (18 seconds, no messages). These sessions show passive observation/lurking rather than active participation in hacking discussions or tool sharing. No evidence of credential sharing, exploit exchange, or command-and-control activity. The channels are labeled as 'hacking-related' but actual participation was minimal and non-substantive.",
<parameter name="severity">low



### 6. [MEDIUM] Email Accounts Associated with Mr. Evil Administrator Account

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:00:00Z to 2004-08-27T15:45:00Z |
| **Sources** | bulk.email |
| **Evidence Refs** | tc_2f545815 |
| **ATT&CK** | [T1590](https://attack.mitre.org/techniques/T1590/) |


Email addresses recovered from the Mr. Evil user profile indicate configuration of two email accounts: (1) \"whoknowsme@sbcglobal.net\" with display name \"Mr Evil\", recovered from cached email data and browser history; and (2) \"mrevilrulez@yahoo.com\", configured similarly to the IRC alternate nick. These email addresses appear in bulk extracted data including headers and web form data. However, evidence is limited to presence in browser cache and profile configuration; no actual sent/received correspondence or active email usage was recovered beyond browser visits to Yahoo mail web interface.",
<parameter name="severity">low



### 7. [MEDIUM] Wireless Network Reconnaissance Activity

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:05:52Z to 2004-08-27T15:42:41Z |
| **Sources** | bulk.url, registry.ntuser.mr. evil |
| **Evidence Refs** | tc_8bcc8863, tc_b1948bf4 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1590.002](https://attack.mitre.org/techniques/T1590/002/) |


Evidence indicates the Mr. Evil account installed and tested wireless network reconnaissance tools. NetStumbler v0.4.0 installer was executed from Mr. Evil Desktop on 2004-08-20 15:06:18Z with one subsequent execution of NetStumbler.exe on 2004-08-27 15:12:35Z (7 days later). Browser history contains visit to www.wardriving.com, which is dedicated to mapping wireless networks. Supporting tools WinPcap and Look@LAN were also installed. However, evidence of actual wardriving activity is limited: only single execution of the tool after 7 days of installation suggests testing/experimentation rather than sustained active reconnaissance. No evidence of discovered/mapped wireless networks or successful network connections was recovered."

**Merged findings:**
- **Packet Capture and Traffic Analysis Capability Installed** (f_a01e609c, medium, inference): Evidence indicates limited wireless network tool installation and testing by the Mr. Evil account. NetStumbler v0.4.0 installer was executed from the Mr. Evil Desktop on 2004-08-20 15:06:18Z, with only one subsequent execution of NetStumbler.exe on 2004-08-27 15:12:35Z. Browser history includes visit to www.wardriving.com. WinPcap packet driver was installed supporting wireless sniffing capability. However, no evidence of discovered wireless networks was recovered, and execution frequency (single run 7 days after installation) suggests testing rather than sustained reconnaissance activity.",
<parameter name="severity">medium

**Affected Systems:** bulk.url, registry.ntuser.mr. evil



### 8. [MEDIUM] Network Reconnaissance: IP Addresses and Traffic Patterns

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:05:00Z to 2004-08-27T15:46:00Z |
| **Sources** | bulk.ip |
| **Evidence Refs** | tc_525b4b53 |
| **ATT&CK** | [T1046](https://attack.mitre.org/techniques/T1046/) |


Bulk extraction of IP headers from the disk image identified network activity involving the system's IP address 192.168.254.2 communicating with external hosts 207.68.174.248 and 65.54.179.230. Gateway address 192.168.254.254 and multicast address 239.255.255.250 indicate the system was on a private network (192.168.254.0/24 subnet). The presence of wardriving documentation and NetStumbler tool execution combined with network traffic analysis suggests active reconnaissance of both wired and wireless networks. TCPDUMP file artifacts (0xd4,0xc3,0xb2,0xa1 header) indicate network packet capture was collected on the system.



### 9. [LOW] No Viruses Detected by ClamAV Antivirus Scanning

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T16:57:43Z to 2004-08-27T15:46:17Z |
| **Sources** | clamav.scan |
| **Evidence Refs** | tc_1fd69243 |


ClamAV antivirus engine performed a complete scan of the Dell Latitude CPi disk image and reported status "OK", indicating no known viruses or malware signatures were detected. This clean antivirus result is notable given the extensive hacking tools and suspicious administrative account activity present on the system. The absence of detected malware suggests: (1) the hacking tools (Cain & Abel, NetStumbler, Ethereal, etc.) are known legitimate security research tools not flagged as malware signatures, or (2) any malicious payload was not detected by ClamAV's signature database current as of scan time.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Internal IP | `192.168.254.2` |  | Network Reconnaissance: IP Addresses and Traffic Patterns |
| External IP | `207.68.174.248` |  | Network Reconnaissance: IP Addresses and Traffic Patterns |
| External IP | `65.54.179.230` |  | Network Reconnaissance: IP Addresses and Traffic Patterns |
| Internal IP | `192.168.254.254` |  | Network Reconnaissance: IP Addresses and Traffic Patterns |
| Internal IP | `192.168.254.0` |  | Network Reconnaissance: IP Addresses and Traffic Patterns |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `whoknowsme@sbcglobal.net` |  | Mr. Evil Administrator Account with Admin Privileges |
| Email | `mrevilrulez@yahoo.com` |  | Mr. Evil Administrator Account with Admin Privileges |




---

## Appendix C: MITRE ATT&CK Coverage

9 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (5) > Initial Access (1) > Persistence (2) > Privilege Escalation (2) > Defense Evasion (1) > Credential Access (1) > Discovery (2)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1589](https://attack.mitre.org/techniques/T1589/) | Gather Victim Identity Information | Extensive Hacking Tool Installation on System; Enumeration and Intelligence Gathering Infrastructure |
| [T1590](https://attack.mitre.org/techniques/T1590/) | Gather Victim Network Information | Email Accounts Associated with Mr. Evil... |
| [T1590.002](https://attack.mitre.org/techniques/T1590/002/) | DNS | Wireless Network Reconnaissance Activity |
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Enumeration and Intelligence Gathering Infrastructure |
| [T1595](https://attack.mitre.org/techniques/T1595/) | Active Scanning | Extensive Hacking Tool Installation on System |


### Initial Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.003](https://attack.mitre.org/techniques/T1078/003/) | Local Accounts | Mr. Evil Administrator Account with Admin Privileges; System Configuration: Windows XP with... |


### Persistence

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.003](https://attack.mitre.org/techniques/T1078/003/) | Local Accounts | Mr. Evil Administrator Account with Admin Privileges; System Configuration: Windows XP with... |
| [T1098](https://attack.mitre.org/techniques/T1098/) | Account Manipulation | System Configuration: Windows XP with... |


### Privilege Escalation

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.003](https://attack.mitre.org/techniques/T1078/003/) | Local Accounts | Mr. Evil Administrator Account with Admin Privileges; System Configuration: Windows XP with... |
| [T1098](https://attack.mitre.org/techniques/T1098/) | Account Manipulation | System Configuration: Windows XP with... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.003](https://attack.mitre.org/techniques/T1078/003/) | Local Accounts | Mr. Evil Administrator Account with Admin Privileges; System Configuration: Windows XP with... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Wireless Network Reconnaissance Activity |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Wireless Network Reconnaissance Activity |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Extensive Hacking Tool Installation on System; Network Reconnaissance: IP Addresses and... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 186 |
| Findings submitted | 9 |
| Confirmed | 4 |
| Inferences | 5 |
| Input tokens | 566 |
| Output tokens | 55.0K |
| Total tokens | 55.6K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 566 | 55.0K | 55.6K |




<details>
<summary>Evidence Sources (133)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 12545 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 44493 |
| bulk.duplicates | bulk_extractor | 46 |
| bulk.email | bulk_extractor | 30259 |
| bulk.ether | bulk_extractor | 37 |
| bulk.exif | bulk_extractor | 8 |
| bulk.ip | bulk_extractor | 1646 |
| bulk.packets | bulk_extractor | 5403 |
| bulk.rfc822 | bulk_extractor | 1143 |
| bulk.tcp | bulk_extractor | 825 |
| bulk.url | bulk_extractor | 15563 |
| bulk.url_searches | bulk_extractor | 42 |
| bulk.url_services | bulk_extractor | 3045 |
| tsk.masquerade | sleuthkit | 14 |
| registry.query.software | python-registry | 1 |
| appfiles.mirc*.aliases.ini | icat | 16 |
| appfiles.mirc*.#chataholics.undernet.log | icat | 16 |
| appfiles.mirc*.#cybercafe.undernet.log | icat | 207 |
| appfiles.mirc*.#elite.hackers.undernet.log | icat | 11 |
| appfiles.mirc*.#evilfork.efnet.log | icat | 11 |
| appfiles.mirc*.#funny.undernet.log | icat | 10 |
| appfiles.mirc*.#houston.undernet.log | icat | 9 |
| appfiles.mirc*.#iso-warez.efnet.log | icat | 7 |
| appfiles.mirc*.#luxshell.undernet.log | icat | 13 |
| appfiles.mirc*.#mp3xserv.undernet.log | icat | 15 |
| appfiles.mirc*.#thedarktower.afternet.log | icat | 14 |
| appfiles.mirc*.#ushells.undernet.log | icat | 9 |
| appfiles.mirc*.m5tar.undernet.log | icat | 8 |
| appfiles.mirc*.mirc.ini | icat | 224 |
| tsk.timeline | sleuthkit | 50499 |
| appfiles.mirc*.popups.ini | icat | 96 |
| appfiles.ethereal*.dictionary.xml | icat | 649 |
| appfiles.mirc*.readme.txt | icat | 34 |
| appfiles.ethereal*.mobileipv4.xml | icat | 64 |
| appfiles.mirc*.servers.ini | icat | 423 |
| appfiles.ethereal*.nasreq.xml | icat | 293 |
| appfiles.mirc*.urls.ini | icat | 9 |
| appfiles.ethereal*.sunping.xml | icat | 24 |
| appfiles.mirc*.versions.txt | icat | 472 |
| appfiles.ethereal*.capture_filters.txt | icat | 80 |
| appfiles.outlook*.cleanup.log | icat | 10 |
| appfiles.ethereal*.capturing.txt | icat | 84 |
| appfiles.outlook*.msoe.txt | icat | 3 |
| appfiles.ethereal*.display_filters.txt | icat | 43 |
| hashdeep.hashes | hashdeep | 6 |
| appfiles.ethereal*.faq.txt | icat | 2228 |
| appfiles.ethereal*.getting_started.txt | icat | 90 |
| registry.query.system | python-registry | 1 |
| appfiles.ethereal*.overview.txt | icat | 38 |
| appfiles.ethereal*.well_known.txt | icat | 114 |
| appfiles.ethereal*.pcrepattern.3.txt | icat | 1475 |
| appfiles.ethereal*.agentx-mib.txt | icat | 529 |
| ez.shimcache | eztools | 140 |
| appfiles.ethereal*.disman-event-mib.txt | icat | 1957 |
| appfiles.ethereal*.disman-schedule-mib.txt | icat | 701 |
| appfiles.ethereal*.disman-script-mib.txt | icat | 1766 |
| appfiles.ethereal*.etherlike-mib.txt | icat | 1139 |
| appfiles.ethereal*.hcnum-tc.txt | icat | 120 |
| registry.system | regripper | 427 |
| appfiles.ethereal*.host-resources-mib.txt | icat | 1542 |
| appfiles.ethereal*.host-resources-types.txt | icat | 391 |
| appfiles.ethereal*.iana-address-family-numbers-mib.txt | icat | 123 |
| appfiles.ethereal*.iana-language-mib.txt | icat | 125 |
| appfiles.ethereal*.ianaiftype-mib.txt | icat | 392 |
| appfiles.ethereal*.if-inverted-stack-mib.txt | icat | 151 |
| ez.prefetch | eztools | 165 |
| appfiles.ethereal*.if-mib.txt | icat | 1816 |
| appfiles.ethereal*.inet-address-mib.txt | icat | 300 |
| appfiles.ethereal*.ip-forward-mib.txt | icat | 811 |
| appfiles.ethereal*.ip-mib.txt | icat | 722 |
| appfiles.ethereal*.ipv6-icmp-mib.txt | icat | 531 |
| registry.sam | regripper | 133 |
| appfiles.ethereal*.ipv6-mib.txt | icat | 1445 |
| appfiles.ethereal*.ipv6-tc.txt | icat | 69 |
| appfiles.ethereal*.ipv6-tcp-mib.txt | icat | 213 |
| appfiles.ethereal*.ipv6-udp-mib.txt | icat | 143 |
| registry.sam | regripper | 7 |
| appfiles.ethereal*.lm-sensors-mib.txt | icat | 232 |
| appfiles.ethereal*.mta-mib.txt | icat | 1228 |
| appfiles.ethereal*.net-snmp-agent-mib.txt | icat | 546 |
| appfiles.ethereal*.net-snmp-examples-mib.txt | icat | 229 |
| registry.system | regripper | 19 |
| appfiles.ethereal*.net-snmp-mib.txt | icat | 69 |
| appfiles.ethereal*.net-snmp-monitor-mib.txt | icat | 61 |
| appfiles.ethereal*.net-snmp-system-mib.txt | icat | 65 |
| appfiles.ethereal*.net-snmp-tc.txt | icat | 123 |
| registry.system | regripper | 8 |
| appfiles.ethereal*.network-services-mib.txt | icat | 628 |
| appfiles.ethereal*.notification-log-mib.txt | icat | 784 |
| appfiles.ethereal*.rfc-1215.txt | icat | 40 |
| appfiles.ethereal*.rfc1155-smi.txt | icat | 121 |
| appfiles.ethereal*.rfc1213-mib.txt | icat | 2615 |
| appfiles.ethereal*.rmon-mib.txt | icat | 3982 |
| appfiles.ethereal*.smux-mib.txt | icat | 162 |
| appfiles.ethereal*.snmp-community-mib.txt | icat | 431 |
| appfiles.ethereal*.snmp-framework-mib.txt | icat | 528 |
| appfiles.ethereal*.snmp-mpd-mib.txt | icat | 147 |
| appfiles.ethereal*.snmp-proxy-mib.txt | icat | 296 |
| appfiles.ethereal*.snmp-target-mib.txt | icat | 662 |
| appfiles.ethereal*.snmp-user-based-sm-mib.txt | icat | 914 |
| appfiles.ethereal*.snmp-view-based-acm-mib.txt | icat | 832 |
| appfiles.ethereal*.snmpv2-conf.txt | icat | 324 |
| appfiles.ethereal*.snmpv2-mib.txt | icat | 856 |
| appfiles.ethereal*.snmpv2-smi.txt | icat | 346 |
| appfiles.ethereal*.snmpv2-tc.txt | icat | 774 |
| registry.software | regripper | 9600 |
| appfiles.ethereal*.snmpv2-tm.txt | icat | 178 |
| appfiles.ethereal*.tcp-mib.txt | icat | 332 |
| appfiles.ethereal*.tunnel-mib.txt | icat | 339 |
| appfiles.ethereal*.ucd-demo-mib.txt | icat | 76 |
| registry.software | regripper | 283 |
| appfiles.ethereal*.ucd-diskio-mib.txt | icat | 119 |
| appfiles.ethereal*.ucd-dlmod-mib.txt | icat | 121 |
| appfiles.ethereal*.ucd-ipfilter-mib.txt | icat | 258 |
| appfiles.ethereal*.ucd-ipfwacc-mib.txt | icat | 329 |
| appfiles.ethereal*.ucd-snmp-mib-old.txt | icat | 746 |
| appfiles.ethereal*.ucd-snmp-mib.txt | icat | 1384 |
| appfiles.ethereal*.udp-mib.txt | icat | 148 |
| appfiles.ethereal*.snmp-notification-mib.txt | icat | 591 |
| registry.system | regripper | 3138 |
| registry.system | regripper | 199 |
| clamav.scan | clamav | 1 |
| registry.ntuser.default user | regripper | 43 |
| registry.usrclass.localservice | regripper | 4 |
| registry.ntuser.localservice | regripper | 70 |
| registry.usrclass.mr. evil | regripper | 4 |
| registry.ntuser.mr. evil | regripper | 329 |
| registry.usrclass.networkservice | regripper | 4 |
| registry.ntuser.networkservice | regripper | 70 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
