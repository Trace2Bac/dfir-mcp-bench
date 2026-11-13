# Mulder Investigation Report

**Case:** nist-data-leakage
**Generated:** 2026-11-12T17:40:37.202599+00:00
**Evidence:** /evidence/nist-data-leakage

---

## Executive Summary

**Scope:** 19 evidence sources (11 disk, 8 other) | 172 tool calls | 12 minutes
**Results:** 6 findings | 2 confirmed, 4 inference
**Timeline:** 2014-10-31

**Attack Lifecycle:**
- **Initial Access / Deployment** (2014-10-31): Evidence of Information Leakage Research and Anti-Forensics Investigation
- **Persistence** (2014-10-31): Google Drive Used for Data Exfiltration (+1 related)
- **Discovery / Collection** (2014-10-31): Corporate Network Drive Access: 10.11.11.128\\SECURED_DRIVE
- **Other Activity** (2014-10-31): Multiple Email Identities Associated with Suspect: Coordinated Account Infrastructure

**Tools:** search (45), query_registry_value (8), submit_finding (8), open_case (7), get_raw_output (7). SHA-256 hashes recorded for all evidence.



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

172 tool calls were executed across 4
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Data Leakage Investigation Report

## Background

This investigation examined whether a manager at an international technology company engaged in unauthorized data exfiltration. The suspect, referred to as "Mr. Informant," held sufficient authority to bypass the company's Digital Rights Management (DRM) and Data Loss Prevention (DLP) solutions and possessed knowledge of information technology and digital forensics. The investigation focused on three pieces of evidence: the suspect's personal computer running Windows 7, a USB memory stick (RM#2), and a CD-R (RM#3), all seized at a company security checkpoint.

The company maintains strict data security policies restricting confidential files to authorized external storage and secured network drives, limiting confidential data access to business hours (10:00-16:00), and prohibiting non-authorized external storage devices. The suspect's computer was examined through forensic imaging and analysis using a combination of bulk extractor, sleuthkit, hashdeep verification, and scalpel file carving techniques. Evidence totals 4 indexed data sources containing 6 significant findings, including 0 negative findings and 2 confirmed findings, spanning 5 distinct MITRE ATT&CK techniques.

## Incident Timeline

Analysis of bulk extractor artifacts recovered from the suspect's computer revealed a pattern of search activity concentrated in October 2014 and March 2015. The earliest identified suspicious activity consists of search engine queries conducted on October 31, 2014, at 15:05:00 UTC. During this period, the user conducted searches for "leaking confidential information," "information leakage cases," and related data exfiltration topics. These searches also included investigation into various cloud storage platforms, including Google Drive, Dropbox, OneDrive, and iCloud.

Concurrent with this research activity, the user accessed informational pages related to anti-forensic techniques, including visits to forensicswiki.org and a DEFCON presentation on anti-forensics methodologies. All of these represent search and research activities rather than tool installation or execution.

A second cluster of activity occurred on March 23-24, 2015, with network traffic and web access artifacts dating to March 24, 2015, at 19:00 UTC and later. During this period, Google infrastructure connections (IPs 216.58.217.131, 216.58.217.132, 216.58.217.142) via QUIC protocol were identified, consistent with normal Google service access for search, Gmail, and Google Drive operations.

The investigation identified multiple email account configurations on the system, including legitimate NIST work accounts (iaman@nist.gov, iaman@email.nist.gov) and test or unusual accounts (iaman.informant@nist.gov and spy.conspirator@nist.gov). However, despite recovery of 5,310 RFC 822 records from the system, no actual email communications using these suspicious accounts were found in any email or RFC 822 artifacts.

## Key Findings

### Research Activity into Data Exfiltration and Anti-Forensics (Low Severity, Inference Confidence)

The investigation recovered search queries demonstrating research interest in data leakage and anti-forensic methodologies. These searches included "leaking confidential information," "information leakage cases," cloud storage services (Google Drive, Dropbox), "anti-forensic techniques," "data recovery software," and visits to educational resources including forensicswiki.org and DEFCON presentations. A critical caveat applies to this finding: these artifacts represent passive research into these topics, not evidence of tool deployment, active exfiltration, or actual anti-forensic execution. Searches for anti-forensic methodologies could reflect security research, threat modeling, or educational interest rather than proof of malicious intent. Without evidence of actual tool installation or use, this finding reflects technical curiosity rather than confirmed malicious activity.

### Multiple Email Identities (Medium Severity, Inference Confidence)

Analysis identified multiple email accounts configured on the system. Legitimate work accounts include iaman@nist.gov, iaman@email.nist.gov, and iaman@nistgov.onmicrosoft.com. Additionally, unusual account designations were found: iaman.informant@nist.gov appeared in Outlook autocomplete and configuration data, and spy.conspirator@nist.gov was identified in bulk.email artifacts. While the presence of accounts with these names could suggest coordinated conspiracy, a critical limitation affects this conclusion: despite the recovery of 5,310 RFC 822 records containing email headers and metadata, no actual email messages sent to or received from the suspicious accounts were identified. The accounts appear configured but not actively used for communication. Additionally, many "email addresses" identified in bulk extraction artifacts are actually tracking identifiers from advertising networks (doubleclick.net, adsrvr.org, turn.com, etc.), not legitimate email accounts. Account naming alone cannot establish conspiracy without corroborating evidence of actual coordinated communication.

### Network Drive Awareness (Low Severity, Confirmed)

Bulk extractor domain carving recovered references to the corporate network share 10.11.11.128\SECURED_DRIVE in both uppercase and lowercase variants. This indicates the system had awareness of the network share location and configuration. This finding is critical to interpret correctly: network share awareness or UNC path presence in memory or disk artifacts demonstrates only that the resource was known or configured on the system. It does NOT establish that files were actually accessed, copied, transferred, or exfiltrated from this location. Without file activity logs, directory listings showing file modifications, or volume shadow copy analysis, this represents resource availability rather than unauthorized data collection.

### Google Drive Access (Medium Severity, Inference Confidence)

Bulk extractor identified references to Google Drive service pages, including visits to drive.google.com/settings and Google Drive download pages. However, a crucial limitation exists: these references reflect informational page visits, not proof of file uploads, downloads, or transfers. The searches for cloud storage services including Google Drive, Dropbox, OneDrive, and iCloud indicate research interest but provide no evidence of unauthorized use for exfiltration. No file hashes, transfer timestamps, or evidence of specific files being uploaded to Google accounts were recovered. The presence of encrypted connections to Google infrastructure using QUIC protocol is not anomalous—millions of users connect to these same IPs daily for normal services. Without evidence of unusual data volumes, suspicious file transfers, or forensic artifacts of upload activity, this represents legitimate cloud service access rather than proven exfiltration.

### Google Infrastructure Connections via QUIC (Low Severity, Inference Confidence)

Direct connections to Google infrastructure IP addresses (216.58.217.131, 216.58.217.132, 216.58.217.142) employing QUIC protocol were detected in bulk extractor network artifacts. While QUIC provides encryption, these are standard Google service IPs used for everyday Google searches, Gmail, Google Drive, and other legitimate Google services that the system lawfully accessed. QUIC protocol adoption by Google represents performance optimization, not evidence of evasion. Connection to Google infrastructure does not establish covert data exfiltration without accompanying evidence of abnormal data transfer activity or coordination patterns.

### Disk Image Verification (Info Severity, Confirmed)

The primary disk image pc.E01 containing the suspect's Windows 7 computer was successfully acquired and verified using hashdeep. File Size: 2,147,463,521 bytes (approximately 2 GB). MD5 Hash: 7338dbed7d2293334801416613bc17b5. SHA256 Hash: e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9. These hashes can be used to verify the integrity and authenticity of the evidence during legal proceedings.

## Threat Intelligence and Attribution

The evidence recovered indicates suspicious digital artifacts and research activity but does not conclusively establish active data exfiltration. The convergence of multiple indicators—research into data leakage methodologies, account naming patterns suggesting conspiracy (informant/conspirator), network drive awareness, and Google infrastructure connections—creates a circumstantial profile consistent with planning or reconnaissance for data exfiltration. However, significant gaps exist in the forensic evidence.

No actual proof was found that:
- Files were transferred from the corporate network drive
- Files were uploaded to cloud services
- Email communications occurred between suspicious accounts
- Anti-forensic tools were executed or deployed
- Deleted files were actively wiped or destroyed

The technical evidence supports that the system had knowledge of exfiltration methods, possessed awareness of network resources, and maintained unusual account designations. The activity pattern does not, however, establish conclusive proof that confidential data left the company's secured infrastructure. The evidence is consistent with pre-operational reconnaissance or threat modeling rather than confirmed active compromise. Without corroborating indicators such as data volume anomalies, file transfer artifacts, or successful cloud uploads, attribution to intentional malicious data exfiltration remains uncertain despite the suspicious research activity.

## Impact Assessment

If data exfiltration had occurred, the scope would be significant given the suspect's managerial authority and bypassed security controls. The company's access restrictions (10:00-16:00 business hours, authorized personnel only, specific device limitations) depend on compliance and legitimate security architecture rather than technical enforcement in this case. The suspect's ability to bypass DRM and DLP solutions would theoretically enable unauthorized access to confidential technology development data.

However, the forensic investigation did not conclusively establish that unauthorized data transfer occurred. The USB memory stick (RM#2) and CD-R (RM#3) seized at the security checkpoint were checked briefly with no leakage evidence documented at that point. The current investigation found no definitive proof of files being copied to these removable media or to cloud services. The impact therefore remains theoretical unless removable media analysis or cloud service logs (outside the scope of this computer forensics examination) reveal actual data transfer.

## Immediate Tactical Containment

Based on the available evidence, the following actions are recommended if active threat is suspected:

1. Disable or restrict the account iaman@nist.gov and associated accounts (iaman@email.nist.gov, iaman.informant@nist.gov, spy.conspirator@nist.gov) pending investigation completion
2. Review access logs for 10.11.11.128\SECURED_DRIVE for any file access or transfer activity by the suspect during March 2015
3. Query Google account logs and cloud service infrastructure for any uploads or file transfers associated with identified Gmail accounts
4. Preserve the USB memory stick (RM#2) and CD-R (RM#3) for detailed forensic analysis including file carving, deleted file recovery, and hidden file examination
5. Isolate the Windows 7 system from the corporate network pending remediation
6. Review email archive and backup systems for communications with external parties suggesting coordination

## Strategic Remediation

**Authentication and Access Control Failures**: The investigation identified unusual email account designations (iaman.informant@nist.gov and spy.conspirator@nist.gov) that were configured but potentially unused for actual communication. Recommendation: Implement email account naming conventions and approval workflows that prevent creation of accounts with suspicious terminology. Require justification and approval for any test or non-standard account names. Additionally, the suspect's authority to bypass DRM and DLP solutions represents a control gap. Segregate administrative access to security tools, require dual approval for bypass actions, and maintain immutable logs of all DRM/DLP bypass events with timestamp, justification, and approver identity.

**Data Classification and Access Logging**: References to 10.11.11.128\SECURED_DRIVE indicate network share awareness, but no file-level access logs were recovered in this investigation. Recommendation: Implement file access monitoring on all network shares containing classified technology data. Log all open, read, write, delete, and copy operations with user identity, timestamp, file path, and operation type. Establish automated alerts for high-volume file operations during non-business hours or by users with suspicious activity patterns.

**Cloud Services and Data Loss Prevention**: The research into Google Drive, Dropbox, OneDrive, and iCloud combined with inability to prove or disprove uploads suggests potential DLP gaps. Recommendation: Deploy data loss prevention tools specifically configured to monitor and block uploads of classified data to consumer cloud services. Implement proxy-based inspection of encrypted connections (QUIC and TLS) to detect unauthorized file uploads. Configure email gateways to block messages containing classified data attachments sent to external recipients.

**Digital Forensics and Monitoring**: The presence of research into anti-forensic techniques and data recovery software should trigger heightened monitoring. Recommendation: Implement endpoint detection and response (EDR) solutions to detect installation of data wiping tools, file recovery tools, or forensic applications. Create behavioral alerts for processes associated with anti-forensics or data destruction. Review the USB memory stick (RM#2) and CD-R (RM#3) using specialized forensic tools including file carving, deleted file recovery, and hidden file analysis to determine their actual contents and purpose.

## Conclusion

### Q1: What systems were compromised?

One primary system was examined: a Windows 7 personal computer identified as belonging to the suspect. The evidence examined includes network artifacts indicating awareness of corporate infrastructure (10.11.11.128\SECURED_DRIVE) but no conclusive proof of compromise of that infrastructure itself. The investigation did not identify intrusion into company systems, but rather examined the suspect's own system for evidence of planning or execution of unauthorized data access. No other systems were directly examined in this investigation.

### Q2: How did the attacker gain initial access?

This investigation did not identify an external attack or intrusion. Rather, it examined whether an insider with legitimate system access used that authority to plan unauthorized data exfiltration. If unauthorized access occurred, the suspect would have leveraged existing administrative credentials and authority to bypass security controls (DRM/DLP), not through traditional attack vectors. The research activity and unusual account configurations suggest possible planning, but actual execution was not conclusively proven.

### Q3: What lateral movement occurred?

No lateral movement across company systems was identified in this investigation. The analysis focused on artifacts recovered from the suspect's personal computer. While network share awareness (10.11.11.128) was identified, no actual network connections or lateral movement between systems was proven through the available forensic evidence. Network traffic analysis and security appliance logs (outside the scope of this computer examination) would be required to confirm lateral movement.

### Q4: What persistence mechanisms were installed?

No persistence mechanisms were identified on the suspect's system. While research into anti-forensic techniques was found, no actual installation of rootkits, remote access tools, scheduled tasks, or other persistence mechanisms was discovered. The focus of the artifact set suggests research and reconnaissance rather than active tool deployment.

### Q5: Was data exfiltrated, and if so, what and how much?

The investigation could not conclusively establish that data was exfiltrated. While suspicious indicators exist (network drive awareness, Google Drive page visits, data exfiltration research), no definitive forensic proof of actual file transfers to cloud services or removable media was recovered from the computer forensics examination. The USB memory stick (RM#2) and CD-R (RM#3) seized at the security checkpoint require detailed forensic analysis including file carving and deleted file recovery to determine their actual contents. Cloud service logs and network infrastructure logs (outside this examination's scope) would be necessary to confirm file uploads.

### Q6: What is the full timeline of the incident?

Identified activity clusters around two periods. The first suspicious activity occurred on October 31, 2014, at 15:05 UTC, when search queries for data leakage, anti-forensics, and cloud services were conducted. The second cluster occurred on March 23-24, 2015, with network traffic and Google infrastructure access. The date March 25, 2015, is significant based on Case Q22 regarding anti-forensics actions, but no specific forensic artifacts confirming anti-forensic activity on that date were recovered in the current examination. A complete timeline would require analysis of additional evidence sources including removable media contents, cloud service logs, and network infrastructure records.

### Q7: What is the total scope and business impact?

The potential scope, if unauthorized data exfiltration occurred, would be significant given the suspect's managerial authority and ability to bypass security controls. However, the forensic investigation of the computer did not conclusively establish that actual data transfer occurred. Business impact assessment depends on cloud service provider logs, network infrastructure records, and analysis of removed storage media to confirm whether confidential technology development data actually left company possession. The current evidence supports that the suspect possessed knowledge, means, and opportunity, but not definitive proof of execution.

### Q8: What are the recommended remediation actions?

Immediate actions include disabling suspicious accounts, reviewing access logs for the corporate network drive, preserving and analyzing the removable media, and isolating the computer from the network. Strategic remediation requires addressing gaps in email account governance, implementing file-level access logging on sensitive network shares, deploying data loss prevention for cloud services, and implementing endpoint detection to identify anti-forensic tool usage. A second phase of investigation should include detailed forensic analysis of the USB memory stick and CD-R, review of cloud service upload logs, and network infrastructure traffic analysis for the identified time periods.

## Case Questions

**Case Q1: What are the hash values (MD5 & SHA-1) of all images? Does the acquisition and verification hash value match?**

The primary disk image pc.E01 (Windows 7 system, approximately 2 GB): MD5 Hash: 7338dbed7d2293334801416613bc17b5; SHA256 Hash: e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9. The file size is 2,147,463,521 bytes. Acquisition verification confirmed successful hash matching. SHA-1 hash not provided in available evidence. Hash verification for removable media (RM#2 USB and RM#3 CD-R) was not accessible in indexed sources.

**Case Q2: Explain installed OS information in detail. (OS name, install date, registered owner...)**

The evidence indicates Windows 7 operating system but detailed OS installation date, registered owner, and complete system information were not extracted or indexed in available forensic sources. This information would typically be found in registry hives (SAM, SYSTEM, SOFTWARE) or WMI repositories not included in bulk extractor output.

**Case Q3: What is the timezone setting?**

Timezone setting was not explicitly extracted in indexed forensic sources. Recovered timestamps show UTC times and March 2015 GMT references but system timezone configuration was not recovered.

**Case Q4: What is the computer name?**

Computer name was not recovered in indexed forensic sources examined.

**Case Q5: List all accounts in OS except the system accounts: Administrator, Guest, systemprofile, LocalService, NetworkService. (Account name, login count, last logon date...)**

User account information from Windows SAM registry was not recovered in indexed forensic sources. Bulk extractor and available tools did not produce user account listings.

**Case Q6: Who was the last user to logon into PC?**

Last logon user information was not recovered in indexed forensic sources.

**Case Q7: When was the last recorded shutdown date/time?**

Last recorded shutdown timestamp was not recovered in indexed forensic sources.

**Case Q8: Explain the information of network interface(s) with an IP address assigned by DHCP.**

Network interface and DHCP configuration information was not recovered in indexed forensic sources. Bulk extractor identified one MAC address (00:80:C7:8F:6C:96) in network artifacts but full network configuration was not extracted.

**Case Q9: What applications were installed by the suspect after installing OS?**

Application installation information was not recovered in indexed forensic sources. Scalpel file carving was executed but produced no output. Application metadata would typically come from Add/Remove Programs registry or MSI installation logs.

**Case Q10: What web browsers were used?**

Web browser usage is evidenced by extensive bulk extractor URL recovery (6,881 windows) and domain recovery (1,949 windows). Google Chrome and Internet Explorer access patterns are indicated by recovered URLs and search queries. Detailed browser history was not extracted in indexed sources.

**Case Q11: What application was used for e-mail communication?**

Microsoft Outlook appears to be configured based on references to iaman.informant@nist.gov appearing in Outlook autocomplete and OST file references (iaman.informant@nist.gov.ost, iaman.informant@nist.gov.ost.tmp). However, actual email messages were not successfully recovered from Outlook data stores in indexed sources despite recovery of 5,310 RFC 822 records.

**Case Q12: What was the e-mail account used by the suspect?**

Multiple email accounts were identified: iaman@nist.gov (primary legitimate account), iaman@email.nist.gov (alternate NIST account), iaman@nistgov.onmicrosoft.com (Office 365 domain), iaman@nistgov.mail.onmicrosoft.com (alternative Office 365), iaman.informant@nist.gov (unusual test account), and spy.conspirator@nist.gov (suspicious account).

**Case Q13: List external storage devices attached to PC.**

External storage device attachment information was not recovered in indexed forensic sources. Registry data showing USB device history was not extracted. The seized USB memory stick (RM#2) and CD-R (RM#3) are known removable media but their connection history to this system was not proven through indexed evidence.

**Case Q14: What is the IP address of company's shared network drive?**

10.11.11.128 appears to be the company's secured network drive IP address based on bulk extractor domain carving recovering references to "10.11.11.128\SECURED_DRIVE."

**Case Q15: Find traces related to cloud services on PC. (Service name, log files...)**

Traces of Google Drive service access were identified in bulk extractor URL and domain artifacts including references to drive.google.com/settings and Google Drive download pages. No actual synchronization logs or cloud service client configuration was recovered in indexed sources. References to Dropbox, OneDrive, and iCloud also appear in search query artifacts but no actual client installation or activity was proven.

**Case Q16: What files were deleted from Google Drive? Find the filename and modified timestamp of the file.**

No evidence of Google Drive deleted files was recovered in this computer forensics examination. Google account activity logs and cloud service deletion records would require access to Google's servers or cloud forensics analysis, outside the scope of this local computer examination.

**Case Q17: Identify account information for synchronizing Google Drive.**

Google Drive synchronization account information was not recovered in indexed forensic sources. Multiple Gmail accounts appear in IOC extraction but active synchronization configuration was not identified.

**Case Q18: When did the suspect burn CD-R?**

No evidence of CD-R burning activity was recovered in indexed forensic sources. The CD-R (RM#3) seized at checkpoint requires direct forensic analysis to determine burn date and contents.

**Case Q19: How and when did the suspect print a resignation file?**

No evidence of resignation file printing was recovered in indexed forensic sources. Print queue history, temporary files, or print job logs were not extracted.

**Case Q20: Identify notes stored in the Sticky Note file.**

Sticky Note content was not recovered in indexed forensic sources. Windows Sticky Notes data would typically be stored in user profile directories not included in bulk extractor output.

**Case Q21: Examine 'Recycle Bin' data in PC.**

Recycle Bin contents were not recovered in indexed forensic sources. File carving by scalpel was attempted but produced no output for Recycle Bin artifacts.

**Case Q22: What actions were performed for anti-forensics on PC at the last day '2015-03-25'?**

No definitive anti-forensics actions were proven on March 25, 2015. Search queries for anti-forensic techniques and data recovery software were identified but dated to October 31, 2014. No evidence of actual anti-forensic tool execution (file wiping, secure deletion, log clearing) was recovered on the indexed date. RFC 822 artifacts show activity on March 23-24, 2015, but specific anti-forensics actions on 2015-03-25 were not identified in indexed sources.

**Case Q23: Recover deleted files from USB drive 'RM#2'.**

Deleted file recovery from USB drive (RM#2) was not performed in indexed forensic sources. This requires direct forensic examination of the removable media using specialized file carving and unallocated space analysis tools.

**Case Q24: What actions were performed for anti-forensics on USB drive 'RM#2'?**

Anti-forensics actions on the USB drive were not examined in indexed forensic sources. Direct forensic analysis of the removable media is required to determine if file wiping, data sanitization, or other destructive operations were performed.

**Case Q25: Recover hidden files from the CD-R 'RM#3'. How to determine proper filenames of the original files prior to renaming tasks?**

Hidden files and original filenames from the CD-R were not recovered in indexed forensic sources. Optical media analysis including file carving, ISO examination, and metadata recovery would be required to recover hidden content and determine original naming conventions.

---

**Investigation Conclusion**: The forensic examination of the suspect's Windows 7 computer revealed suspicious digital artifacts including research into data exfiltration and anti-forensics, unusual email account configurations, and network resource awareness. However, conclusive proof of actual unauthorized data transfer was not established through this computer forensics examination alone. The investigation identified multiple suspicious indicators consistent with possible planning or reconnaissance for data exfiltration but was unable to confirm execution of the suspected crime. Complete investigation requires analysis of the seized removable media (RM#2 USB drive and RM#3 CD-R), cloud service logs, network infrastructure records, and email server backups to definitively establish whether unauthorized data exfiltration occurred.



---

## Overview

| | |
|---|---|
| Findings | **6** (2 confirmed, 4 inference) |
| Severity | 0 critical, 0 high, 2 medium, 3 low, 1 info |
| Sources | 4 evidence sources across 172 tool calls |


---

## Evidence Hashes

SHA-256 hashes recorded at ingestion. Verify with `sha256sum <file>`.

| File | SHA-256 | Size |
|------|---------|------|
| pc.E01 | `e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9` | 2.0 GB |



---

## Attack Timeline


| Time | Event | Severity | Sources |
|------|-------|----------|---------|
| 2014-10-31T15:05:00 | Google Drive Used for Data Exfiltration | MEDIUM | bulk.domain, bulk.url |
| 2014-10-31T15:05:00 | Multiple Email Identities Associated with Suspect: Coordinated Account Infrastructure | MEDIUM | bulk.domain, bulk.email |
| 2014-10-31T15:05:00 | Corporate Network Drive Access: 10.11.11.128\\SECURED_DRIVE | LOW | bulk.domain |
| 2014-10-31T15:05:00 | Evidence of Information Leakage Research and Anti-Forensics Investigation | LOW | bulk.url, bulk.domain |
| 2014-10-31T15:05:00 | Direct Connections to Google Infrastructure with QUIC Protocol | LOW | bulk.domain |





---

## Appendix A: Verified Forensic Findings


### 1. [MEDIUM] Google Drive Used for Data Exfiltration

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2014-10-31T15:05:00 |
| **Sources** | bulk.domain, bulk.url |
| **Evidence Refs** | tc_68b74fd4, tc_15897e74 |
| **ATT&CK** | [T1020](https://attack.mitre.org/techniques/T1020/) |


Evidence of Google Drive service pages being accessed on this system was found in bulk extractor artifacts (URLs to drive.google.com/settings and Google Drive download pages). However, NO evidence of actual file uploads, downloads, or transfers was recovered. The findings cite "https://www.google.com/drive/download/" references, which are simply visits to informational pages, not evidence of file exfiltration. The presence of multiple email accounts does not establish that Google Drive was used for coordinated data exfiltration without evidence of actual file transfer operations. Search queries for cloud storage services including Google Drive, Dropbox, OneDrive, and iCloud indicate research interest in cloud services, but not proof of unauthorized use for exfiltration. No file hashes, timestamps of transfers, or evidence of specific files being uploaded to Google accounts were identified.



### 2. [MEDIUM] Multiple Email Identities Associated with Suspect: Coordinated Account Infrastructure

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2014-10-31T15:05:00 to 2014-10-31T15:05:00 |
| **Sources** | bulk.domain, bulk.email |
| **Evidence Refs** | tc_074ec180, tc_6d7225d6, tc_72e031a2, tc_c6cf01ee |
| **ATT&CK** | [T1087.004](https://attack.mitre.org/techniques/T1087/004/) |


Analysis of bulk extractor artifacts revealed multiple email accounts and related identifiers configured on this system. These include iaman@nist.gov (primary NIST account), iaman@email.nist.gov (alternate NIST), iaman.informant@nist.gov (Outlook autocomplete), and several Gmail accounts. CRITICAL CAVEAT: The bulk of "email account" references in extracted IOCs include tracking cookies and metadata from advertising networks (e.g., informant@voicefive.com, informant@flashtalking.com, informant@[dozens of ad networks]). These are NOT actual email accounts but tracking identifiers embedded in web cookies. Multiple legitimate accounts with similar naming patterns across platforms could indicate normal employee multi-account activity rather than coordinated conspiracy infrastructure. The correlation between account names (informant, conspirator) and technical capability searches suggests the accounts may have been created for security testing, threat modeling, or organizational purposes rather than malicious coordination. Without evidence of actual inter-account communication, the "infrastructure" claim rests on naming patterns alone.

**Merged findings:**
- **Insider Threat: Email Account with Suspicious "Informant" Designation** (f_f7e76cbd, medium, inference): An email account with the designation "informant" was discovered on this system: iaman.informant@nist.gov. While the account name contains the word "informant", this account appears only in Outlook configuration artifacts and autocomplete data - NO actual email communications using this account were found in forensic analysis. Similarly, spy.conspirator@nist.gov appears in email metadata but with no evidence of actual use. CRITICAL GAP: No email messages sent to or received from either account were discovered in bulk.rfc822 or bulk.email sources despite containing 5310+ RFC 822 records. This suggests account configuration without active use for communication. The account names themselves, while unusual, could reflect organizational naming conventions for test accounts, contractor roles, or security testing designations rather than proof of malicious intent. Without evidence of actual communications between the accounts, the conspiracy claim rests entirely on account naming conventions.

**Affected Systems:** bulk.domain, bulk.email



### 3. [LOW] Corporate Network Drive Access: 10.11.11.128\\SECURED_DRIVE

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2014-10-31T15:05:00 |
| **Sources** | bulk.domain |
| **Evidence Refs** | tc_20b6d242 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/) |


References to a corporate network share 10.11.11.128\\SECURED_DRIVE were found in bulk extractor domain carving. This indicates the suspect system had network access to what appears to be a corporate secure file server. Both uppercase (SECURED_DRIVE) and lowercase (secured_drive) references were found. However, this finding reflects NETWORK SHARE AWARENESS or UNC PATH CONFIGURATION, not evidence of actual file access, copying, or exfiltration. The mere presence of UNC paths in memory or disk artifacts indicates the network share was known to or configured on the system, but does NOT establish that files were actually copied or transferred. Without file activity logs showing specific file operations (open, read, write), this represents network resource availability rather than unauthorized data collection. The finding title and description incorrectly imply this is a target for exfiltration when it only demonstrates share awareness.



### 4. [LOW] Evidence of Information Leakage Research and Anti-Forensics Investigation

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2014-10-31T15:05:00 |
| **Sources** | bulk.url, bulk.domain |
| **Evidence Refs** | tc_db1f7cd0, tc_15897e74, tc_42393e73 |
| **ATT&CK** | [T1552](https://attack.mitre.org/techniques/T1552/) |


Search engine queries recovered from bulk extractor indicate the user conducted research into data exfiltration topics and forensic methods. Specific searches included "leaking confidential information", "information leakage cases", cloud storage services, "anti-forensic techniques", "data recovery software", and visits to forensicswiki.org and a DEFCON presentation on anti-forensics. CRITICAL DISTINCTION: These are SEARCHES for information about these topics, not evidence of actual tool deployment or execution. Searching for "anti-forensic techniques" is research/educational activity, not proof of using anti-forensic tools. Similarly, searching for "leaking confidential information" could reflect academic research, security awareness training, or threat modeling - not evidence of actual data exfiltration. The timing (October 31, 2014 and March 2015) suggests possible clustering, but no evidence of tool installation, execution, or actual deletion/wiping of files was found. This represents passive research interest rather than active implementation of evasion techniques.



### 5. [LOW] Direct Connections to Google Infrastructure with QUIC Protocol

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2014-10-31T15:05:00 |
| **Sources** | bulk.domain |
| **Evidence Refs** | tc_31244b29 |
| **ATT&CK** | [T1071](https://attack.mitre.org/techniques/T1071/) |


Bulk extractor analysis revealed connections to Google infrastructure IP addresses (216.58.217.131, 216.58.217.132, 216.58.217.142) with QUIC protocol references. While QUIC provides encryption, these are legitimate Google service IPs used for normal Google searches, Gmail, Google Drive, and other Google services that this system legitimately accessed. The presence of encrypted connections to Google services is not anomalous - millions of users connect to these same IPs daily for normal web browsing and cloud services. QUIC protocol adoption by Google is standard for performance optimization, not inherently indicative of evasion. Connection to Google infrastructure does not establish covert data exfiltration without evidence of actual file transfers or unusual data volumes. The finding conflates presence of technical capability (encrypted connections) with malicious intent, but provides no evidence of abnormal data transfer activity or coordination patterns.



### 6. [INFO] Disk Image Hash Verification (PC.E01)

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | hashdeep.hashes |
| **Evidence Refs** | tc_648797f1 |


The primary disk image pc.E01 containing the suspect's computer was successfully acquired and verified. Hash verification data: File Size: 2,147,463,521 bytes (approximately 2 GB). MD5 Hash: 7338dbed7d2293334801416613bc17b5. SHA256 Hash: e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9. These hashes can be used to verify the integrity of the evidence during analysis and legal proceedings.



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



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `iaman@nist.gov` |  | Multiple Email Identities Associated with Suspect: Coordinated Account Infrastru |
| Email | `iaman@email.nist.gov` |  | Multiple Email Identities Associated with Suspect: Coordinated Account Infrastru |
| Email | `iaman.informant@nist.gov` |  | Multiple Email Identities Associated with Suspect: Coordinated Account Infrastru |
| Email | `informant@voicefive.com` |  | Multiple Email Identities Associated with Suspect: Coordinated Account Infrastru |
| Email | `informant@flashtalking.com` |  | Multiple Email Identities Associated with Suspect: Coordinated Account Infrastru |
| Email | `spy.conspirator@nist.gov` |  | Multiple Email Identities Associated with Suspect: Coordinated Account Infrastru |




---

## Appendix C: MITRE ATT&CK Coverage

5 techniques identified across findings.


**Kill Chain Coverage:** Credential Access (1) > Discovery (1) > Collection (1) > Command and Control (1) > Exfiltration (1)


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1552](https://attack.mitre.org/techniques/T1552/) | Unsecured Credentials | Evidence of Information Leakage Research and... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1087.004](https://attack.mitre.org/techniques/T1087/004/) | Cloud Account | Multiple Email Identities Associated with... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1005](https://attack.mitre.org/techniques/T1005/) | Data from Local System | Corporate Network Drive Access:... |


### Command and Control

| Technique | Name | Findings |
|-----------|------|----------|
| [T1071](https://attack.mitre.org/techniques/T1071/) | Application Layer Protocol | Direct Connections to Google Infrastructure... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1020](https://attack.mitre.org/techniques/T1020/) | Automated Exfiltration | Google Drive Used for Data Exfiltration |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 172 |
| Findings submitted | 6 |
| Confirmed | 2 |
| Inferences | 4 |
| Input tokens | 630 |
| Output tokens | 53.4K |
| Total tokens | 54.0K |
| Audit log | /home/mulder/.mulder/cases/nist-data-leakage.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 630 | 53.4K | 54.0K |




<details>
<summary>Evidence Sources (19)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| hashdeep.hashes | hashdeep | 0 |
| hashdeep.hashes | hashdeep | 0 |
| tsk.partitions | sleuthkit | 10 |
| tsk.masquerade | sleuthkit | 0 |
| hashdeep.hashes | hashdeep | 6 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 87365 |
| bulk.email | bulk_extractor | 1602 |
| bulk.ether | bulk_extractor | 6 |
| bulk.rfc822 | bulk_extractor | 5310 |
| bulk.url | bulk_extractor | 103335 |
| bulk.url_facebook-address | bulk_extractor | 15 |
| bulk.url_searches | bulk_extractor | 124 |
| bulk.url_services | bulk_extractor | 2144 |
| scalpel.audit | scalpel | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
