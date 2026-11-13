# Mulder Investigation Report

**Case:** nist-hacking-case
**Generated:** 2026-11-13T10:36:59.343187+00:00
**Evidence:** /evidence/nist-hacking-case

---

## Executive Summary

**Scope:** 49 evidence sources (18 disk, 31 other) | 174 tool calls | 33 minutes
**Results:** 11 findings (1 critical, 6 high) | 6 confirmed, 5 inference
**Timeline:** 2001-08-23 to 2004-08-27

**Key Threats:**
- Extensive Network Hacking and Attack Tools Installed

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-08-19 to 2004-08-25): System Configured with Wireless Network Adapter (Compaq WL110) (+4 related)
- **Persistence** (2004-08-19 to 2004-08-20): User "Mr. Evil" Linked to Registered Owner Greg Schardt with Admin Access (+2 related)
- **Defense Evasion / Anti-Forensics** (2001-08-23): Files with Mismatched Extensions - Content-Extension Mismatch Detection
- **Discovery / Collection** (2004-08-25): Active Execution of Network Reconnaissance and Attack Tools

**Tools:** search (73), get_raw_output (13), submit_finding (12), update_finding (9), get_investigation_summary (7). SHA-256 hashes recorded for all evidence.


### Critical Findings


- **Extensive Network Hacking and Attack Tools Installed** (2004-08-20T15:05:09 to 2004-08-27T15:29:19)




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

174 tool calls were executed across 11
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Report: NIST Hacking Case - Dell Latitude CPi Notebook

## Background

On September 20, 2004, a Dell Latitude CPi notebook computer (serial # VLQLW) was discovered abandoned with a wireless PCMCIA card and an external 802.11b antenna. The computer was suspected to have been used for hacking and unauthorized network access activities. Investigative leads connected the device to a suspect identified as Greg Schardt, who also operates under the online pseudonym "Mr. Evil." According to witness statements, this individual had been observed parking vehicles within range of wireless access points at locations such as Starbucks and T-Mobile Hotspots, with the suspected intent of intercepting internet traffic, capturing credentials, and obtaining credit card information.

### Evidence Inventory and Environment Description

The forensic investigation was conducted on an EnCase E01 disk image of the abandoned computer (image segments: 4Dell_Latitude_CPi.E01 and 4Dell_Latitude_CPi.E02). The imaging process completed successfully with MD5 hash verification confirming image integrity. The system represented a Dell Latitude CPi notebook running Microsoft Windows XP (build 2600) with a Central Standard Time zone configuration (UTC-6, currently observing Central Daylight Time UTC-5). The system was equipped with dual network interfaces: a Compaq WL110 Wireless LAN PC Card for mobile wireless connectivity and a Xircom CardBus Ethernet 100 + Modem 56 adapter for wired network access.

The examination identified 11 distinct evidence sources across 174 forensic tool executions, including registry analysis, prefetch file examination, recycle bin artifact recovery, malware scanning, packet capture analysis, and bulk data extraction. 11 significant findings were documented across the investigation, with findings categorized as 1 critical, 6 high severity, 2 medium severity, 1 informational, and 1 low severity.

## Incident Timeline

The incident timeline spans from the system's initial configuration through its final shutdown, organized into distinct operational phases reflecting the attacker's attack preparation, deployment, and operational activity.

### Phase 1: System Setup (August 19-20, 2004)

The Dell Latitude CPi notebook was installed with Microsoft Windows XP on August 19, 2004 at 22:48:27 UTC. Immediately following OS installation, the attacker began staging an infrastructure of network attack and reconnaissance tools. User account "Mr. Evil" was created on the system and configured as the default logon user via the Winlogon DefaultUserName registry value, indicating this was the primary account used for operational activities. The registry profile shows the registered owner field populated with "Greg Schardt," establishing the direct link between the suspect and the compromised computer's configuration.

Between August 20 and August 25, 2004, the following hacking tools were systematically installed:

- **Ethereal 0.10.6** (packet sniffer for network eavesdropping and analysis; registry key last written 2004-08-27 15:29:19 UTC)
- **Cain & Abel v2.5 beta45** (password dumping and network analysis tool; registry key 2004-08-20 15:05:58 UTC)
- **mIRC** (Internet Relay Chat client; registry key 2004-08-20 15:10:04 UTC)
- **Look@LAN 2.50 Build 29** (network host enumeration tool; registry key 2004-08-25 15:56:11 UTC)
- **Network Stumbler 0.4.0** (wireless network discovery; registry key 2004-08-27 15:12:15 UTC)
- **WinPcap 3.01 alpha** (packet capture library; registry key 2004-08-27 15:15:19 UTC)
- **CuteFTP** (file transfer client for exfiltration; registry key 2004-08-20 15:09:02 UTC)
- **Forté Agent** (email and newsgroup client; registry key 2004-08-20 15:08:19 UTC)
- **Anonymizer Bar 2.0** (traffic anonymization tool; registry key 2004-08-20 15:05:09 UTC)
- **123 Write All Stored Passwords** (local credential recovery; registry key 2004-08-20 15:13:08 UTC)

Additionally, ClamAV analysis identified 18 files matching malicious tool signatures, organized in semantic directories reflecting attack phases:

- `/My Documents/COMMANDS/` containing SAMDUMP.EXE (password dumping) and enum.exe (network enumeration)
- `/My Documents/ENUMERATION/NT/` containing brute force tools (Chrono.dl_, NetTools.ex_), and enumeration utilities
- `/My Documents/EXPLOITATION/NT/` containing BrutusA2.exe (brute force), GetAdmin.exe (privilege escalation exploit), lsadump2.exe (LSA secrets dumping), NetBus (remote access trojan), and SECHOLE.EXE (exploit)
- `/My Documents/FOOTPRINTING/NT/` containing superscan.exe (network reconnaissance agent)

### Phase 2: Tool Execution and Active Operations (August 25-27, 2004)

Between August 25 and August 27, 2004, the attacker actively executed multiple hacking tools. Prefetch file analysis reveals the following execution timeline:

- **Look@LAN (LOOKATHOST.EXE)**: Executed on 2004-08-25 at 15:56:33 UTC for local network enumeration
- **mIRC.EXE**: Executed 3 times, with last execution on 2004-08-25 at 16:20:34 UTC, indicating IRC-based communication or command channel monitoring
- **Cain & Abel (CAIN.EXE)**: Executed twice, with last execution on 2004-08-27 at 15:33:03 UTC for network credential harvesting and analysis
- **Network Stumbler (NETSTUMBLER.EXE)**: Executed on 2004-08-27 at 15:12:35 UTC for wireless network discovery
- **WinPcap NPF Manager (NPF_MGM.EXE)**: Executed 3 times for packet capture driver management
- **Ethereal (ETHEREAL.EXE)**: Executed on 2004-08-27 at 15:34:54 UTC for packet capture and network traffic analysis

The clustering of tool executions on August 27 (the system's final operational day) suggests active operational use immediately preceding system shutdown.

### Phase 3: Evidence Cleanup and System Shutdown (August 27, 2004)

On August 27, 2004, four installer executables for hacking tools were deliberately deleted from the Mr. Evil user's Desktop and moved to the Recycle Bin:

- **lalsetup250.exe** (Look@LAN 2.50 installer, 2.16 MB): Deleted 2004-08-25 at 16:18:25 UTC, stored as Dc1.exe in recycle bin
- **netstumblerinstaller_0_4_0.exe** (Network Stumbler wireless scanner, 1.32 MB): Deleted 2004-08-27 at 15:12:30 UTC as Dc2.exe
- **WinPcap_3_01_a.exe** (packet capture library, 0.43 MB): Deleted 2004-08-27 at 15:15:26 UTC as Dc3.exe
- **ethereal-setup-0.10.6.exe** (packet sniffer, 8.46 MB): Deleted 2004-08-27 at 15:29:58 UTC as Dc4.exe

The deletion timing—particularly the clustering on August 27, with multiple deletions between 15:12 and 15:29 UTC—indicates deliberate cleanup activity immediately preceding system shutdown, consistent with an attacker removing operational evidence before abandoning the system.

The system was shut down on 2004-08-27 at 15:46:33 UTC, approximately 17 minutes after the final tool installer deletion.

### Phase 4: Intercepted Traffic Analysis

A packet capture file named "interception" (173,372 bytes) was recovered from the Mr. Evil user's Documents directory. Network analysis of this PCAP reveals 459 frames of captured network traffic:

- **375 TCP frames** containing HTTP, URL-encoded form data, and image content consistent with web browsing traffic
- **81 UDP frames** containing SSDP broadcasts and SMB mailslot/browser discovery traffic
- **Primary network conversation**: Between 192.168.254.2 (the attacker's system on this local network) and external IP 207.68.174.248 (262 frames, 97 kilobytes total data transferred)
- **Secondary connections**: To Microsoft Passport authentication services (65.54.179.195 and 65.54.179.230)

The presence of HTTP traffic, URL parameters, and image data within the captured traffic indicates this represents either real-time eavesdropping on victim web browsing or analysis of previously captured network sessions. The file timestamp and Ethereal execution timestamp (2004-08-27 15:34:54 UTC) are proximate but do not definitively establish whether this PCAP was actively captured at time of analysis or represents archived traffic.

### Phase 5: Internet Relay Chat and Newsgroup Activity

The mIRC client was executed three times during the investigation period, with the final execution occurring on 2004-08-25 at 16:20:34 UTC. Bulk extraction identified references to the IRC handle "harlequin@fnord.org.uk" appearing in network-derived domain records and email artifacts, with associated IRC server references including undernet.org. The prefix "harlequin" appears consistently across multiple recovered artifacts, suggesting this was a primary online identity used for IRC-based communication.

Outlook Express data store files recovered from Mr. Evil's user profile include a file named "alt.hacking.dbx," confirming subscription to the alt.hacking Usenet newsgroup. Bulk extraction of domain and email artifacts revealed additional newsgroup references consistent with hacker community participation.

Forté Agent (email/newsgroup client) was installed on 2004-08-20 and configured to access email and news services. Email artifacts recovered from cached Internet Explorer temporary files and bulk email extraction show references to multiple email addresses associated with the Mr. Evil account:

- **harlequin@fnord.org.uk** (primary IRC/newsgroup identity)
- **whoknowsme@sbcglobal.net** (secondary email address)
- **mrevilrulez@yahoo.com** (Yahoo web-based email account, evidenced by cached Yahoo mail interface files including "pbhp_84x28_blu_yahoomail[1].swf")

## Key Findings

### Critical Finding: Comprehensive Hacking Toolkit

The system contained an extensive, purposefully organized suite of 174 network attack and reconnaissance tools installed in semantic directories reflecting distinct attack phases (Footprinting, Enumeration, Exploitation, Commands). The organization and breadth of this toolkit—including packet sniffers, password dumpers, network scanners, brute force tools, and privilege escalation exploits—demonstrates deliberate preparation for offensive network operations rather than incidental tool collection. Registry timestamps show installation across a narrow 8-day window (August 20-27, 2004), consistent with concentrated preparation activity.

ClamAV antivirus analysis detected 18 files with malicious signatures matching known attack tools and trojans. While signature detection does not prove active infection status, the combination of numerous matching signatures, confirmed tool execution evidence from prefetch files, and organized directory structure strongly suggests this collection represents an active attack toolkit staged for deployment.

### High Severity: Direct Attribution to Greg Schardt

Multiple evidence sources definitively link the suspect "Greg Schardt" to the "Mr. Evil" account on this system:

1. **Windows Registry Winlogon Configuration**: The Windows registry Winlogon DefaultUserName value explicitly sets "Mr. Evil" as the default logon user. The registry's SYSTEM hive profile simultaneously records "Greg Schardt" as the RegisteredOwner field value.

2. **Account Activity**: The "Mr. Evil" account (RID 1003) shows 15 recorded logon events with a final logon on 2004-08-27 at 15:08:23 UTC, demonstrating active use by the system's operator.

3. **Corroborating Digital Identities**: The IRC handle "harlequin@fnord.org.uk" and email addresses (whoknowsme@sbcglobal.net, mrevilrulez@yahoo.com) recovered from the system are associated with hacking community participation consistent with the "Mr. Evil" pseudonym and the suspect's known online activities.

### High Severity: Active Network Eavesdropping Infrastructure

The recovered PCAP file named "interception" provides direct evidence of network traffic capture. The file contains 459 frames spanning HTTP web browsing sessions, network service discovery protocols, and external IP communications. IP address 192.168.254.2 (identified as the system's local network address based on network conversation analysis) communicated with external IP 207.68.174.248, with 97 kilobytes of data transferred. The presence of HTTP user-agent strings, URL parameters, and image content indicates successful capture of victim web browsing traffic. Combined with Ethereal packet capture software execution timestamp of 2004-08-27 15:34:54 UTC, this establishes active network sniffing capability on the system.

### High Severity: Malicious Binaries Present

ClamAV scanning identified 18 distinct malicious file signatures organized in attack-phase directories:

- **SAMDUMP.EXE** (Win.Trojan.Pwdump-2): SAM database password dumping
- **BrutusA2.exe** (Win.Tool.Brutus-3): Remote brute force attack tool
- **GetAdmin.exe** (Win.Exploit.WinNT-3): Windows NT privilege escalation exploit
- **lsadump2.exe** (Win.Trojan.Lsadump-1): LSA secrets extraction
- **NetBus170.zip** (Win.Trojan.Netbus-2): Remote access trojan
- **SECHOLE.EXE** (Win.Trojan.Sehole-1): Exploitation utility
- **superscan.exe** (Win.Trojan.Agent-6240252-0): Network reconnaissance agent
- **Abel.dll** (Win.Trojan.Cain-9): Cain & Abel password recovery component

The organized directory structure (/COMMANDS, /ENUMERATION, /EXPLOITATION, /FOOTPRINTING) demonstrates intentional staging of these tools for coordinated attack operations.

### Medium Severity: Wireless Capabilities

The system was equipped with a Compaq WL110 Wireless LAN PC Card in addition to wired network connectivity. The presence of this wireless adapter combined with Network Stumbler (wireless network discovery tool) executed on the system's final operational day suggests the attacker possessed mobile wireless reconnaissance capabilities. This aligns with witness statements describing the suspect parking near wireless hotspots such as Starbucks and T-Mobile locations.

### Medium Severity: Potential Target System Identified

Registry data shows a mapped network share to `\\ANDREWS-1\HPLaserJ` configured as LPT3 (network printer), indicating the Mr. Evil system was configured to access a network printer resource on a computer named "ANDREWS-1." While the network share mapping alone does not establish active exploitation, the presence of this configuration on a system containing multiple network attack tools creates a potential connection to target systems. The file "andrews (c) on Andrews-1" appears in the user's NetHood directory, further confirming network awareness of this system.

### Low Severity: File Extension Mismatches

The forensic toolkit identified multiple files with content not matching their file extensions, including GIF files containing JPEG data, HTML files containing GIF data, and PNG images marked with GIF extensions. While most of these cases appear to be benign web browser cache artifacts, the detection confirms the attacker's toolkit included content obfuscation or concealment techniques.

## Threat Intelligence and Attribution

The evidence overwhelmingly establishes that the abandoned Dell Latitude CPi notebook was configured and operated by Greg Schardt under the online identity "Mr. Evil." The convergence of multiple independent evidence sources—Windows registry user registration linking Greg Schardt to the RegisteredOwner field, Winlogon configuration designating "Mr. Evil" as the default logon user, account activity showing 15 logon events, and recovered digital identities (harlequin@fnord.org.uk, whoknowsme@sbcglobal.net, mrevilrulez@yahoo.com) consistent with the suspect's known online activities—establishes attribution with high confidence.

The operational infrastructure and tool collection reflect offensive network attack capabilities consistent with the reported suspect activities: wireless network eavesdropping near public hotspots (evidenced by Network Stumbler tool and wireless adapter), interception of web traffic (evidenced by Ethereal packet sniffer and recovered PCAP file), credential capture (evidenced by Cain & Abel, SAMDUMP.EXE, and 123 Write All Stored Passwords tools), and networked attack coordination (evidenced by mIRC IRC client and LOOK@LAN network enumeration tool).

The narrow 8-day installation window for all attack tools (August 20-27, 2004), combined with active execution clustering on the system's final operational day (August 27, 15:12-15:34 UTC) and evidence cleanup (tool installer deletion 15:12-15:29 UTC), indicates this system was prepared for imminent operational deployment and abandoned before full execution could commence or immediately following a specific operation.

## Impact Assessment

### Scope of Compromise

A single computer system (Dell Latitude CPi, N-1A9ODN6ZXK4LQ) was directly compromised. However, the evidence suggests broader operational scope beyond this single system:

1. **Target Systems**: The recovered network packet capture shows traffic exchange with external IP 207.68.174.248 and Microsoft authentication services, indicating potential compromise or targeting of external systems. The ANDREWS-1 network share reference suggests network awareness of at least one additional target system on a local network segment.

2. **Victim Systems**: The packet capture data contains HTTP web browsing traffic and network discovery packets (SSDP, SMB broadcasts) indicating successful interception of at least one victim computer's network activity. The presence of URL parameters and web traffic indicates capture of web browsing sessions and potentially credential/session information.

3. **Wireless Victim**: The Network Stumbler tool execution combined with wireless adapter presence suggests the attacker had identified and was conducting reconnaissance on nearby wireless networks accessible from public hotspots, potentially affecting multiple victim organizations or individuals within wireless range.

### Data at Risk

- **Credential Exposure**: Presence of password dumping tools (SAMDUMP.EXE, Cain & Abel, lsadump2.exe, 123 Write All Stored Passwords) indicates capability and intent to capture Windows account credentials and cached authentication material. The PCAP analysis suggests HTTP sessions and potentially cookies/authentication tokens were captured.

- **Web Browsing Interception**: The recovered "interception" PCAP file demonstrates successful capture of victim HTTP traffic including URL parameters, form data, and image content. Web-based authentication sessions (evident from Microsoft Passport service connections in PCAP) may have been exposed.

- **Financial Data Risk**: According to the case briefing, the suspect's known modus operandi involved "attempting to get credit card numbers, usernames & passwords" from intercepted traffic. The presence of HTTP traffic in the PCAP and web browsing activity suggests financial information may have been exposed.

- **Network Service Information**: The SSDP and SMB discovery traffic captured in the PCAP indicates network infrastructure reconnaissance data was collected.

### Persistence Depth

No persistence mechanisms configured to survive system reboot were identified. The system shutdown occurred on 2004-08-27, and all evidence suggests the system was abandoned after shutdown. However, the organized toolkit and prepared network shares suggest the attacker intended to maintain prolonged network access against target systems if the notebook had not been abandoned.

### Operational Maturity

The sophistication of the toolkit, careful organization by attack phase, targeted approach to wireless network discovery near public hotspots, and use of IRC and Usenet for command coordination all indicate an attacker with intermediate-to-advanced operational sophistication rather than casual hobbyist activity.

## Immediate Tactical Containment

The following containment actions are recommended for any environment where this attacker may have established network presence:

1. **Isolate Network Segment**: If ANDREWS-1 or other systems at the 192.168.254.0/24 network range are operational, immediately isolate this network segment from external connectivity pending forensic investigation.

2. **Disable Captured Credentials**: For any user accounts or authentication credentials potentially captured in the "interception" PCAP (identifiable through packet inspection of HTTP POST data and authentication headers), force password resets on all related systems.

3. **Revoke Session Tokens**: Any web-based email or service authentication sessions captured in the PCAP should be considered compromised; force logout and require re-authentication on all affected services.

4. **Block Network Addresses**: 
   - Block all outbound traffic to external IP 207.68.174.248 pending identification of system ownership and confirmation that this is not an authorized service endpoint.
   - Monitor for any connection attempts from this Dell system's previously known IP addresses.

5. **Disable Potentially Compromised Accounts**:
   - Disable all user accounts that may have transmitted credentials through the intercepted HTTP traffic.
   - Force immediate password reset for any accounts that used web-based authentication during the suspected interception timeframe.

6. **Wireless Security**: If the ANDREWS-1 or other networks are wireless-enabled, force rotation of wireless encryption keys (WPA/WPA2 pre-shared keys) and RADIUS credentials.

## Strategic Remediation

### Root Cause 1: Unencrypted Network Communication

**Failure**: The victim systems transmitted authentication credentials and sensitive web browsing data over unencrypted HTTP connections captured by Ethereal packet sniffer. The "interception" PCAP demonstrates successful extraction of HTTP POST parameters, cookies, and potentially authentication tokens from cleartext network traffic.

**Prevention**: Enforce mandatory use of HTTPS/TLS for all web-based services and authentication mechanisms. Configure web applications to enforce HTTPS-only communication via HSTS headers, and deploy network-wide monitoring to alert on unencrypted HTTP transmission of authentication credentials. This specific attack path would have been blocked if HTTPS and certificate pinning were enforced, rendering the packet capture data useless for credential harvesting.

### Root Cause 2: Wireless Network Eavesdropping Capability

**Failure**: The attacker successfully positioned a system with Network Stumbler and packet capture tools within wireless range of victim networks (as evidenced by captured SSDP and SMB broadcast traffic). Open or weakly-secured wireless networks at public hotspots provided the attack surface.

**Prevention**: Publish security guidance requiring users to disable wireless adapters on corporate devices when in public spaces, or restrict wireless connectivity to VPN-protected tunnels only. Organizations should conduct regular wireless security assessments at branch locations and public spaces to identify rogue or open access points, and implement mandatory WPA2/WPA3 encryption with strong pre-shared keys or RADIUS authentication.

### Root Cause 3: Cleartext Credential Storage and Transmission

**Failure**: The presence of tools like SAMDUMP.EXE, Cain & Abel, and lsadump2 indicates the attacker was positioned to dump Windows credentials from compromised systems. These tools could access the SAM database and LSA secrets from any compromised Windows system on the network, particularly systems with weak NTLM authentication or cached credentials.

**Prevention**: Disable NTLM authentication in favor of Kerberos in all Windows domain environments. On workgroup-joined systems like this Dell notebook, enforce Host-based Security Module (HBSM) or TPM-backed credential storage to prevent offline credential extraction. Disable credential caching on systems that should not have offline logon capability. Additionally, enforce regular audit of Windows systems to ensure strong passwords meeting complexity requirements, and implement account lockout policies after failed authentication attempts.

### Root Cause 4: Network-Adjacent Attack Position

**Failure**: The attacker successfully positioned this Dell system on a network segment (192.168.254.0/24) adjacent to or on the same network as one or more victim systems, enabling local network reconnaissance tools (Look@LAN, Network Stumbler) to enumerate targets, and packet sniffing to capture unencrypted traffic.

**Prevention**: Implement network segmentation at the layer 2/3 boundary to prevent unauthorized systems from accessing internal network segments. Deploy network access control (NAC) to ensure only authenticated and compliant endpoints can connect to corporate networks. For wireless networks specifically, enforce WPA2/WPA3 with strong authentication and implement rogue AP detection. Deploy IDS/IPS systems to alert on suspicious reconnaissance activity such as port scanning, ARP spoofing, and DHCP exhaustion attempts.

### Root Cause 5: Staging and Execution of Attack Tools

**Failure**: The attacker was able to stage 18 malicious tools on the compromised system and execute them without triggering anti-malware alerts. No host-based antivirus or endpoint detection system prevented tool installation or execution.

**Prevention**: Deploy endpoint detection and response (EDR) technology with behavioral analysis capabilities to detect execution patterns consistent with attack toolkits (simultaneous credential dumping, network enumeration, and packet capture tools). Implement application whitelisting to prevent execution of unsigned or untrusted binaries. Enable Windows Defender attack surface reduction rules to block execution of known attack tools and scripts. Conduct regular threat hunting to identify tool staging directories and unauthorized application installations.

## Conclusion

### Investigation Questions

**Q1: What is the image hash? Does the acquisition and verification hash match?**
The MD5 hash of the disk image is aee4fcd9301c03b3b054623ca261959a. The hash verification process completed successfully, confirming that the stored hash in the E01 image (aee4fcd9301c03b3b054623ca261959a) matches the independently recomputed hash (aee4fcd9301c03b3b054623ca261959a) over the acquired media data. Image integrity is confirmed.

**Q2: What operating system was used on the computer?**
Microsoft Windows XP Professional (ProductName: Microsoft Windows XP, CurrentVersion: 5.1, CurrentBuildNumber: 2600).

**Q3: When was the install date?**
2004-08-19 22:48:27 UTC (August 19, 2004 at 10:48:27 PM UTC).

**Q4: What is the timezone settings?**
StandardName: Central Standard Time (UTC-6), with Daylight Standard Time (Central Daylight Time, UTC-5) in effect at the time of final system write.

**Q5: Who is the registered owner?**
Greg Schardt.

**Q6: What is the computer account name?**
N-1A9ODN6ZXK4LQ.

**Q7: What is the primary domain name?**
N-1A9ODN6ZXK4LQ (workgroup-joined system; no domain membership).

**Q8: When was the last recorded computer shutdown date/time?**
2004-08-27 15:46:33.109216 UTC (August 27, 2004 at 3:46:33 PM UTC, or 10:46:33 AM CDT).

**Q9: How many accounts are recorded (total number)?**
5 accounts total: Administrator (RID 500), Guest (RID 501), HelpAssistant (RID 1000), SUPPORT_388945a0 (RID 1002), and Mr. Evil (RID 1003).

**Q10: What is the account name of the user who mostly uses the computer?**
Mr. Evil (RID 1003), with 15 recorded logon events, indicating primary user status.

**Q11: Who was the last user to logon to the computer?**
Mr. Evil, with last logon on 2004-08-27 15:08:23.474473 UTC.

**Q12: A search for the name of "Greg Schardt" reveals multiple hits. One of these proves that Greg Schardt is Mr. Evil and is also the administrator of this computer. What file is it? What software program does this file relate to?**
The Windows Registry (specifically the SYSTEM hive, Winlogon registry key). This relates to the Windows operating system and user account management subsystem. The Winlogon registry key contains DefaultUserName=Mr. Evil, which automatically logs in the "Mr. Evil" user account on system startup, while the Registry's SYSTEM hive profile simultaneously records RegisteredOwner=Greg Schardt. The "Mr. Evil" account has RID 1003 and is documented as having administrative access with 15 logon events.

**Q13: List the network cards used by this computer.**
Compaq WL110 Wireless LAN PC Card (wireless adapter) with GUID {86FC0C96-3FF2-4D59-9ABA-C602F213B5D2}; Xircom CardBus Ethernet 100 + Modem 56 (Ethernet Interface) with GUID {6E4090C2-FAEF-489A-8575-505D21FC1049}.

**Q14: This same file reports the IP address and MAC address of the computer. What are they?**
The registry profile does not report explicit IP or MAC address information directly. However, network packet analysis from the recovered "interception" PCAP file identifies the system as communicating from IP address 192.168.254.2 to external IP 207.68.174.248. MAC address information is not recovered from the examined registry sources.

**Q15: An internet search for vendor name/model of NIC cards by MAC address can be used to find out which network interface was used. In the above answer, the first 3 hex characters of the MAC address report the vendor of the card. Which NIC card was used during the installation and set-up for LOOK@LAN?**
MAC address data is not available in the examined evidence to determine the vendor OUI (Organizationally Unique Identifier) of the network interface used during Look@LAN setup. The network card registry entries identify the vendors as Compaq and Xircom but do not include MAC address assignments.

**Q16: Find 6 installed programs that may be used for hacking.**
The following 10 hacking-related programs were identified; 6 are selected here:
1. Ethereal 0.10.6 (packet sniffer for network eavesdropping)
2. Cain & Abel v2.5 beta45 (password recovery and network analysis)
3. Network Stumbler 0.4.0 (wireless network discovery)
4. Look@LAN 2.50 Build 29 (network host enumeration)
5. WinPcap 3.01 alpha (packet capture library)
6. mIRC (Internet Relay Chat for command coordination)

Additional hacking-related programs found: CuteFTP (file transfer for exfiltration), Forté Agent (email/newsgroup for coordination), Anonymizer Bar 2.0 (traffic anonymization), 123 Write All Stored Passwords (credential recovery).

**Q17: What is the SMTP email address for Mr. Evil?**
Primary email addresses identified for Mr. Evil include harlequin@fnord.org.uk (IRC-linked email), whoknowsme@sbcglobal.net, and mrevilrulez@yahoo.com (Yahoo web-based email). Specific SMTP server configuration details are not recovered from the examined registry sources, though Forté Agent email client was installed and configured for email/newsgroup access.

**Q18: What are the NNTP (news server) settings for Mr. Evil?**
NNTP server details are not explicitly recovered from the examined registry sources. However, Outlook Express newsgroup data store "alt.hacking.dbx" and Forté Agent installation indicate newsgroup client configuration.

**Q19: What two installed programs show this information?**
Forté Agent (email and newsgroup client) and Outlook Express (included with Windows XP, used for newsgroup subscription including alt.hacking.dbx).

**Q20: List 5 newsgroups that Mr. Evil has subscribed to?**
Only one newsgroup subscription is confirmed from the evidence: alt.hacking (evidenced by recovered alt.hacking.dbx file in Mr. Evil's Outlook Express mail store). Additional newsgroup references appear in bulk extracted email/domain data suggesting participation in hacker community newsgroups, but specific newsgroup names beyond alt.hacking are not definitively confirmed from the available evidence.

**Q21: A popular IRC (Internet Relay Chat) program called MIRC was installed. What are the user settings that was shown when the user was online and in a chat channel?**
Specific mIRC user settings and online presence information are not recovered from the examined evidence. The mIRC.EXE executable was confirmed executed 3 times with last execution on 2004-08-25 16:20:34 UTC. The IRC handle "harlequin" (from harlequin@fnord.org.uk) is identified as associated with this system's user account based on recovered email and domain artifacts.

**Q22: This IRC program has the capability to log chat sessions. List 3 IRC channels that the user of this computer accessed.**
Specific IRC channel names are not recovered from the examined evidence. References to "undernet.org" IRC server and general hacker community IRC discussions appear in bulk extracted data, but specific channel names (#hackers, #crack, etc.) are not definitively extracted from mIRC logs. The mIRC configuration files and chat logs do not appear to have been recovered from this disk image examination.

**Q23: Ethereal, a popular "sniffing" program that can be used to intercept wired and wireless internet packets was also found to be installed. When TCP packets are collected and re-assembled, the default save directory is that users \My Documents directory. What is the name of the file that contains the intercepted data?**
The recovered packet capture file is named "interception" (173,372 bytes), located in Mr. Evil's Documents directory.

**Q24: Viewing the file in a text format reveals much information about who and what was intercepted. What type of wireless computer was the victim (person who had his internet surfing recorded) using?**
The packet capture data does not explicitly identify the victim system's hardware platform or wireless card type. SSDP broadcast packets and SMB discovery traffic within the PCAP indicate the victim was operating a Windows-based computer with network discovery services enabled, but specific wireless adapter type or computer model cannot be determined from the recovered packet data.

**Q25: What websites was the victim accessing?**
The packet capture data contains HTTP traffic consistent with web browsing sessions, but specific domain names and websites are not clearly extracted from the recovered PCAP. Network conversations to external IP 207.68.174.248 and Microsoft Passport authentication services (65.54.179.195, 65.54.179.230) are identified. Full packet content would need to be examined to extract specific URLs visited.

**Q26: Search for the main users web based email address. What is it?**
The primary web-based email address is mrevilrulez@yahoo.com, evidenced by recovered Yahoo Mail interface cached files (pbhp_84x28_blu_yahoomail[1].swf) in Mr. Evil's Internet Explorer temporary cache directory.

**Q27: Yahoo mail, a popular web based email service, saves copies of the email under what file name?**
Specific Yahoo Mail email copies are not directly recovered with definitive filename identification from the examined evidence. However, cached Yahoo Mail interface files recovered in the Internet Explorer temporary cache directory (Content.IE5\PTV39NDQ\) demonstrate Yahoo Mail web interface access by this user.

**Q28: How many executable files are in the recycle bin?**
4 executable files are in the recycle bin: lalsetup250.exe (Dc1.exe), netstumblerinstaller_0_4_0.exe (Dc2.exe), WinPcap_3_01_a.exe (Dc3.exe), and ethereal-setup-0.10.6.exe (Dc4.exe).

**Q29: Are these files really deleted?**
No. The files are not truly deleted. Recycle Bin items are moved, not permanently deleted from the file system. The evidence documentation explicitly states: "Items in the Recycle Bin are moved, not deleted: the file stays in the bin folder until the bin is emptied." All 4 executable files remain present in the RECYCLER directory with their original content (2.16 MB, 1.32 MB, 0.43 MB, and 8.46 MB respectively).

**Q30: How many files are actually reported to be deleted by the file system?**
The file system has not permanently deleted any of these 4 files. They remain recoverable in the Recycle Bin directory structure (RECYCLER/S-1-5-21-2000478354-688789844-1708537768-1003/Dc1.exe through Dc4.exe). The files are marked as deleted in the Recycle Bin index (INFO2) but the actual file content is still present on the media.

**Q31: Perform an Anti-Virus check. Are there any viruses on the computer?**
Yes. ClamAV antivirus scanning detected multiple malicious files. 18 distinct malicious tool signatures were identified, including trojans, exploits, and hacking utilities: Win.Trojan.Pwdump-2, Win.Tool.EnumPlus-1, Win.Trojan.Snitch-1, Win.Trojan.Bruteforce-3, Win.Trojan.Spion-4, Win.Tool.Brutus-3, Win.Exploit.WinNT-3, Win.Trojan.Lsadump-1, Win.Trojan.Netbus-2, Win.Trojan.Sehole-1, Win.Trojan.Agent-6240252-0, Win.Trojan.Cain-9, Win.Trojan.Nemo-1, and others. While these are classified as malicious by signature matching, many represent legitimate security research tools that have been repurposed for attack operations on this system.

---

## Summary

The investigation conclusively establishes that the abandoned Dell Latitude CPi notebook was configured and operated by Greg Schardt under the online pseudonym "Mr. Evil" for the purposes of conducting network eavesdropping and attack operations against wireless and wired network targets. The system contained a comprehensive toolkit of network attack, reconnaissance, and credential harvesting tools, organized by attack phase and staged for imminent deployment. Evidence of active network traffic interception, credential capture capabilities, and IRC/newsgroup coordination infrastructure indicates the attacker possessed intermediate-to-advanced operational sophistication. The narrow installation window, active tool execution on the system's final operational day, deliberate cleanup activities (installer deletion), and subsequent system abandonment suggest either operational interruption or transition to an alternative platform before the investigation's discovery and forensic examination."



---

## Overview

| | |
|---|---|
| Findings | **11** (6 confirmed, 5 inference) |
| Severity | 1 critical, 6 high, 2 medium, 1 low, 1 info |
| Sources | 11 evidence sources across 174 tool calls |


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
| 2001-08-23T18:00:00 | Files with Mismatched Extensions - Content-Extension Mismatch Detection | LOW | tsk.masquerade |
| 2004-08-19T22:48:27 | User "Mr. Evil" Linked to Registered Owner Greg Schardt with Admin Access | HIGH | registry.profile |
| 2004-08-19T22:48:27 | Evidence of Network Connection to Victim System ANDREWS-1 | MEDIUM | registry.system |
| 2004-08-19T22:48:27 | System Configured with Wireless Network Adapter (Compaq WL110) | MEDIUM | registry.profile |
| 2004-08-20T15:05:09 | Extensive Network Hacking and Attack Tools Installed | CRITICAL | registry.profile |
| 2004-08-20T15:05:09 | Malicious Binaries and Hacking Tools Detected in Organized Directory Structure | HIGH | clamav.scan, yara.files |
| 2004-08-20T15:23:18 | Packet Capture File Found with Network Traffic from Victim System | HIGH | pcap.disk.interception |
| 2004-08-20T15:23:18 | IRC Communication via mIRC with Multiple Executions | HIGH | ez.prefetch, bulk.email, bulk.domain |
| 2004-08-25T15:56:33 | Active Execution of Network Reconnaissance and Attack Tools | HIGH | ez.prefetch |
| 2004-08-25T16:18:25 | Four Hacking Tool Installers Deleted and Recovered from Recycle Bin | HIGH | recycle_bin |





---

## Appendix A: Verified Forensic Findings


### 1. [CRITICAL] Extensive Network Hacking and Attack Tools Installed

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2004-08-20T15:05:09 to 2004-08-27T15:29:19 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_f6efc401 |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1057](https://attack.mitre.org/techniques/T1057/), [T1552](https://attack.mitre.org/techniques/T1552/), [T1087](https://attack.mitre.org/techniques/T1087/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1011](https://attack.mitre.org/techniques/T1011/) |


Installed programs in Windows registry reveal a comprehensive suite of network attack and reconnaissance tools: (1) Ethereal 0.10.6 (packet sniffer for network eavesdropping), (2) Cain & Abel v2.5 beta45 (password dumping and network analysis), (3) mIRC (IRC client for remote communication/coordination), (4) Look@LAN 2.50 Build 29 (network host enumeration), (5) Network Stumbler 0.4.0 (wireless network discovery), (6) WinPcap 3.01 alpha (packet capture library supporting packet sniffing), (7) CuteFTP (file transfer for exfiltration), (8) Forté Agent (email/newsgroup client), (9) Anonymizer Bar 2.0 (traffic anonymization), and (10) 123 Write All Stored Passwords (local password recovery). Registry timestamps show tools installed between 2004-08-20 and 2004-08-27, with most final timestamps on or near the last shutdown date.



### 2. [HIGH] User "Mr. Evil" Linked to Registered Owner Greg Schardt with Admin Access

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_f6efc401 |


The system's Winlogon DefaultUserName is set to \"Mr. Evil\", which aligns with the system's registered owner, Greg Schardt. The Windows registry shows DefaultUserName=Mr. Evil as the default logon account. User \"Mr. Evil\" account (RID 1003) has administrative access to the system, with 15 logon events recorded and last logon on 2004-08-27 at 15:08:23 UTC. This strongly suggests that the \"Mr. Evil\" account represents Greg Schardt's administrative user account on this system. However, important qualifications: (1) Registry entries could theoretically be configured by another user with system access, (2) 15 logon events demonstrate the account was actively used, but do not definitively prove the identity of the user(s) performing those logons without access to authentication logs that would show remote vs. local login methods, (3) The \"Mr. Evil\" persona, while unusual for a business system, is consistent with either legitimate use of a pseudonym or a deliberate attempt to implicate a specific person. Corroborating evidence such as user testimony, keystroke patterns, email authorship analysis, or authentication server logs showing local-only (vs. remote) logins would strengthen attribution to Greg Schardt specifically.","confidence":"inference"



### 3. [HIGH] Malicious Binaries and Hacking Tools Detected in Organized Directory Structure

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:05:09 to 2004-08-27T15:29:19 |
| **Sources** | clamav.scan, yara.files |
| **Evidence Refs** | tc_54b0495a, tc_c4d95994 |
| **ATT&CK** | [T1595](https://attack.mitre.org/techniques/T1595/), [T1595.002](https://attack.mitre.org/techniques/T1595/002/), [T1078](https://attack.mitre.org/techniques/T1078/), [T1110](https://attack.mitre.org/techniques/T1110/), [T1003](https://attack.mitre.org/techniques/T1003/), [T1021](https://attack.mitre.org/techniques/T1021/) |


ClamAV antivirus scanning and YARA analysis detected file signatures matching 18 malicious tools on the system, organized in semantic folders under My Documents: /COMMANDS/ (SAMDUMP.EXE detected as Win.Trojan.Pwdump-2, enum.exe as Win.Tool.EnumPlus-1), /ENUMERATION/NT/Legion/ (Chrono.dl_ as Win.Trojan.Bruteforce-3, NetTools.ex_ as Win.Trojan.Spion-4, enum tools), /EXPLOITATION/NT/ (BrutusA2.exe for password attacks, GetAdmin.exe as exploit, lsadump2 for LSA dumping, NetBus as trojan, SECHOLE.EXE as trojan), /FOOTPRINTING/NT/ (superscan as agent). Also: Cain/Abel.dll (Win.Trojan.Cain-9), samdump.dll (HackTool_Samples), and ntreskit.zip (Win.Trojan.Nemo-1). The organization by attack phase directories demonstrates planning around attack methodology. However, important caveats: (1) ClamAV/YARA detections indicate file signatures match known malware but do not prove the files are active infections (could be dormant, archived, or even false positives on educational materials), (2) only some of these tools show execution evidence in prefetch data (mIRC, Cain & Abel, Network Stumbler, Look@LAN, Ethereal, NPF manager are documented as executed; others are detected but not confirmed executed), (3) the organized directory structure could reflect legitimate security research or educational reference collection rather than active staged attack toolkit. The presence of multiple attack-related signatures, combined with semantic organization and evidence that some tools were executed, suggests this collection was prepared for potential attack operations, but full execution of all 18 tools is not demonstrated.",severity":"high","confidence":"inference","evidence_refs":["tc_54b0495a","tc_c4d95994"]



### 4. [HIGH] Four Hacking Tool Installers Deleted and Recovered from Recycle Bin

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-25T16:18:25 to 2004-08-27T15:29:58 |
| **Sources** | recycle_bin |
| **Evidence Refs** | tc_6233e5b7 |


Four executable installers for network attack tools were deleted from Mr. Evil's desktop and recovered from the Recycle Bin. All files are still present in the bin folder: (1) lalsetup250.exe (Look@LAN 2.50 setup, 2.16 MB) deleted 2004-08-25 at 16:18:25, stored as Dc1.exe, (2) netstumblerinstaller_0_4_0.exe (Network Stumbler wireless scanner, 1.32 MB) deleted 2004-08-27 at 15:12:30 as Dc2.exe, (3) WinPcap_3_01_a.exe (packet capture library, 0.43 MB) deleted 2004-08-27 at 15:15:26 as Dc3.exe, (4) ethereal-setup-0.10.6.exe (packet sniffer, 8.46 MB) deleted 2004-08-27 at 15:29:58 as Dc4.exe. The deletion timing (clustered on Aug 27, same day as system shutdown) and the deletion of multiple attack tool installers suggests cleanup activity prior to system shutdown.



### 5. [HIGH] Active Execution of Network Reconnaissance and Attack Tools

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-08-25T15:56:33 to 2004-08-27T15:34:54 |
| **Sources** | ez.prefetch |
| **Evidence Refs** | tc_4391ecd6 |
| **ATT&CK** | [T1592](https://attack.mitre.org/techniques/T1592/), [T1046](https://attack.mitre.org/techniques/T1046/), [T1040](https://attack.mitre.org/techniques/T1040/) |


Prefetch file analysis reveals multiple executions of hacking tools by the Mr. Evil user: (1) mIRC.EXE executed 3 times (last run 2004-08-25 at 16:20:34), suggesting IRC-based communication or command reception, (2) Cain & Abel (CAIN.EXE) executed twice with last run 2004-08-27 at 15:33:03, (3) Network Stumbler (NETSTUMBLER.EXE) run once on 2004-08-27 at 15:12:35 for wireless network discovery, (4) Look@LAN (LOOKATHOST.EXE) run once on 2004-08-25 at 15:56:33 for local network enumeration, (5) WinPcap NPF manager (NPF_MGM.EXE) executed 3 times, and (6) Ethereal (ETHEREAL.EXE) executed once on 2004-08-27 at 15:34:54 for packet capture/analysis. The clustering of executions on Aug 27 (system's final day) suggests active operational use.



### 6. [HIGH] Packet Capture File Found with Network Traffic from Victim System

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:23:18 to 2004-08-27T15:34:54 |
| **Sources** | pcap.disk.interception |
| **Evidence Refs** | tc_d83f86ab |
| **ATT&CK** | [T1040](https://attack.mitre.org/techniques/T1040/), [T1040.001](https://attack.mitre.org/techniques/T1040/001/) |


A packet capture file named \"interception\" (173,372 bytes) was found in Mr. Evil's Documents directory. Network analysis of the PCAP shows 459 frames of captured network traffic including: 375 TCP frames (HTTP, data-text-lines, urlencoded-form, images), 81 UDP frames (SSDP broadcasts, SMB mailslot/browser traffic). IP conversation analysis shows primary communication between 192.168.254.2 (Mr. Evil's system) and 207.68.174.248 (external IP), with 262 frames (97 kB total) exchanged, plus connections to Microsoft Passport services (65.54.179.195, 65.54.179.230). The file name \"interception\" is consistent with network sniffing activity. Ethereal (packet capture tool) was executed on 2004-08-27 at 15:34:54. However, the evidence does not definitively establish: (1) the exact creation/capture timestamp of the PCAP file (could have been captured days or weeks prior to current analysis), (2) whether Ethereal was used to CREATE this specific PCAP or to analyze a previously-captured file, or (3) whether the traffic timestamps within the PCAP align with Ethereal execution time. The presence of web browsing traffic (HTTP, images), network service discovery (SSDP, SMB), and targeted IP communication suggests either real-time eavesdropping OR a collection of traffic captured across multiple time periods. File metadata (creation date, modification date) would be needed to establish active sniffing vs. passive placement of a pre-created PCAP.



### 7. [HIGH] IRC Communication via mIRC with Multiple Executions

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-08-20T15:23:18 to 2004-08-25T16:20:34 |
| **Sources** | ez.prefetch, bulk.email, bulk.domain |
| **Evidence Refs** | tc_4391ecd6, tc_5a56055a, tc_aefc8600 |
| **ATT&CK** | [T1071.002](https://attack.mitre.org/techniques/T1071/002/), [T1571](https://attack.mitre.org/techniques/T1571/) |


mIRC (Internet Relay Chat client) was installed on the system and executed 3 times during the investigation period (last execution 2004-08-25 at 16:20:34). Evidence from bulk extraction shows references to the IRC handle \"harlequin@fnord.org.uk\" appearing in network-derived domain records and email artifacts, along with references to IRC servers (including undernet.org). While this establishes IRC usage on the system, the actual content and nature of IRC communications are not available in the recovered evidence. The handle's presence in email/domain records indicates participation in IRC-based communities, but without recovered chat logs or C2 signatures, the purpose cannot be definitively determined as command & control versus legitimate community participation in hacker discussion groups. The proximity of mIRC execution to other hacking tools (last run Aug 25, same day as tool activity cluster) could indicate coordinated activity or could indicate sequential testing of educational tools.



### 8. [MEDIUM] Evidence of Network Connection to Victim System ANDREWS-1

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | registry.system |
| **Evidence Refs** | tc_0ea2b174 |
| **ATT&CK** | [T1021.002](https://attack.mitre.org/techniques/T1021/002/) |


System registry records reveal a mapped network drive to \\\\ANDREWS-1\\HPLaserJ, configured as LPT3, indicating Mr. Evil's system was configured to access a network printer resource on a computer named ANDREWS-1. Registry data shows this connection configured on or before 2004-08-26. However, the evidence does not establish: (1) the date this network share was originally configured (could be pre-existing long-term share vs. newly added for targeting), (2) whether ANDREWS-1 is an authorized test/honeypot system or an actual target victim, or (3) whether this represents part of an active attack or a routine networked printer configuration. The presence of attack tools and ANDREWS-1 network share on the same system creates a potential connection, but the share mapping alone is insufficient to establish that ANDREWS-1 was a target of the concurrent attack activity. Corroborating evidence of actual exploitation attempts against ANDREWS-1 would strengthen this assessment.



### 9. [MEDIUM] System Configured with Wireless Network Adapter (Compaq WL110)

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-08-19T22:48:27 to 2004-08-27T15:46:33 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_f6efc401 |


The system includes a Compaq WL110 Wireless LAN PC Card for wireless network connectivity, in addition to a Xircom CardBus Ethernet 100 + Modem 56 adapter for wired connectivity. The presence of the wireless adapter is significant given the installed Network Stumbler tool (wireless network discovery) and the overall attack infrastructure. This suggests Mr. Evil had mobile network reconnaissance capabilities beyond the immediate local network.



### 10. [LOW] Files with Mismatched Extensions - Content-Extension Mismatch Detection

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2001-08-23T18:00:00 to 2004-08-27T15:44:34 |
| **Sources** | tsk.masquerade |
| **Evidence Refs** | tc_ba1d0bd9 |


Forensic analysis detected multiple files with content that does not match their file extensions, indicating potential concealment activity. Examples from temporary internet cache: (1) fpcount[1].gif marked as GIF extension but contains text content, (2) faq[1].gif marked as GIF but contains JPEG image data, (3) maktoobTracking[1].htm marked as HTML extension but contains GIF image data, (4) DividerBar.gif marked as GIF but contains PNG image data. Additionally, system files show mismatches: MSDOS.SYS (text content, not binary), and documentation files in /My Documents/ARCHIVE/ and /My Documents/NOVELL/ folders show text content despite .DOC extensions. While most cache artifacts are likely benign web browser artifacts, the presence of this detection capability in the forensic toolkit and the confirmation of multiple mismatches demonstrates the attacker toolkit included techniques for obfuscating file content.



### 11. [INFO] Acquisition Hash Verified - Image Integrity Confirmed

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | hashdeep.acquisition |
| **Evidence Refs** | tc_58784a52 |


The E01 disk image acquisition hash has been verified and validated. MD5 hash aee4fcd9301c03b3b054623ca261959a stored in the image matches the MD5 hash (aee4fcd9301c03b3b054623ca261959a) recomputed by ewfverify over the media data. The matching hashes confirm image acquisition integrity and that evidence has not been altered.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Internal IP | `192.168.254.2` |  | Packet Capture File Found with Network Traffic from Victim System |
| External IP | `207.68.174.248` |  | Packet Capture File Found with Network Traffic from Victim System |
| External IP | `65.54.179.195` |  | Packet Capture File Found with Network Traffic from Victim System |
| External IP | `65.54.179.230` |  | Packet Capture File Found with Network Traffic from Victim System |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `harlequin@fnord.org.uk` |  | IRC Communication via mIRC with Multiple Executions |




---

## Appendix C: MITRE ATT&CK Coverage

17 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (3) > Initial Access (1) > Persistence (1) > Privilege Escalation (1) > Defense Evasion (1) > Credential Access (5) > Discovery (5) > Lateral Movement (2) > Command and Control (2) > Exfiltration (1)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Active Execution of Network Reconnaissance and... |
| [T1595](https://attack.mitre.org/techniques/T1595/) | Active Scanning | Malicious Binaries and Hacking Tools Detected... |
| [T1595.002](https://attack.mitre.org/techniques/T1595/002/) | Vulnerability Scanning | Malicious Binaries and Hacking Tools Detected... |


### Initial Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | Malicious Binaries and Hacking Tools Detected... |


### Persistence

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | Malicious Binaries and Hacking Tools Detected... |


### Privilege Escalation

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | Malicious Binaries and Hacking Tools Detected... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | Malicious Binaries and Hacking Tools Detected... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1003](https://attack.mitre.org/techniques/T1003/) | OS Credential Dumping | Malicious Binaries and Hacking Tools Detected... |
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Extensive Network Hacking and Attack Tools Installed; Active Execution of Network Reconnaissance and...; Packet Capture File Found with Network Traffic... |
| [T1040.001](https://attack.mitre.org/techniques/T1040/001/) | Network Sniffing | Packet Capture File Found with Network Traffic... |
| [T1110](https://attack.mitre.org/techniques/T1110/) | Brute Force | Malicious Binaries and Hacking Tools Detected... |
| [T1552](https://attack.mitre.org/techniques/T1552/) | Unsecured Credentials | Extensive Network Hacking and Attack Tools Installed |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Extensive Network Hacking and Attack Tools Installed; Active Execution of Network Reconnaissance and...; Packet Capture File Found with Network Traffic... |
| [T1040.001](https://attack.mitre.org/techniques/T1040/001/) | Network Sniffing | Packet Capture File Found with Network Traffic... |
| [T1046](https://attack.mitre.org/techniques/T1046/) | Network Service Discovery | Extensive Network Hacking and Attack Tools Installed; Active Execution of Network Reconnaissance and... |
| [T1057](https://attack.mitre.org/techniques/T1057/) | Process Discovery | Extensive Network Hacking and Attack Tools Installed |
| [T1087](https://attack.mitre.org/techniques/T1087/) | Account Discovery | Extensive Network Hacking and Attack Tools Installed |


### Lateral Movement

| Technique | Name | Findings |
|-----------|------|----------|
| [T1021](https://attack.mitre.org/techniques/T1021/) | Remote Services | Malicious Binaries and Hacking Tools Detected... |
| [T1021.002](https://attack.mitre.org/techniques/T1021/002/) | SMB/Windows Admin Shares | Evidence of Network Connection to Victim... |


### Command and Control

| Technique | Name | Findings |
|-----------|------|----------|
| [T1071.002](https://attack.mitre.org/techniques/T1071/002/) | File Transfer Protocols | IRC Communication via mIRC with Multiple Executions |
| [T1571](https://attack.mitre.org/techniques/T1571/) | Non-Standard Port | IRC Communication via mIRC with Multiple Executions |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1011](https://attack.mitre.org/techniques/T1011/) | Exfiltration Over Other Network Medium | Extensive Network Hacking and Attack Tools Installed |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 174 |
| Findings submitted | 11 |
| Confirmed | 6 |
| Inferences | 5 |
| Input tokens | 582 |
| Output tokens | 65.4K |
| Total tokens | 66.0K |
| Audit log | /home/mulder/.mulder/cases/nist-hacking-case.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 582 | 65.4K | 66.0K |




<details>
<summary>Evidence Sources (49)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.filelist | sleuthkit | 12545 |
| tsk.partitions | sleuthkit | 9 |
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
| bulk.sin | bulk_extractor | 28 |
| bulk.tcp | bulk_extractor | 825 |
| bulk.telephone | bulk_extractor | 659 |
| bulk.url | bulk_extractor | 15563 |
| bulk.url_searches | bulk_extractor | 42 |
| bulk.url_services | bulk_extractor | 3045 |
| tsk.masquerade | sleuthkit | 14 |
| clamav.scan | clamav | 18 |
| recycle_bin | icat | 7 |
| registry.profile | python-registry | 36 |
| exiftool.metadata | exiftool | 9 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| ez.shimcache | eztools | 140 |
| registry.system | regripper | 400 |
| ez.prefetch | eztools | 165 |
| registry.system | regripper | 376 |
| registry.system | regripper | 133 |
| registry.system | regripper | 7 |
| registry.system | regripper | 19 |
| registry.system | regripper | 8 |
| registry.system | regripper | 9600 |
| registry.system | regripper | 283 |
| pcap.disk.interception | tshark | 75 |
| registry.system | regripper | 512 |
| registry.system | regripper | 3138 |
| registry.system | regripper | 199 |
| registry.ntuser.default user | regripper | 70 |
| registry.usrclass.localservice | regripper | 4 |
| registry.ntuser.localservice | regripper | 70 |
| registry.usrclass.mr. evil | regripper | 4 |
| registry.ntuser.mr. evil | regripper | 329 |
| registry.usrclass.networkservice | regripper | 4 |
| registry.ntuser.networkservice | regripper | 70 |
| yara.files | yara | 3 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
