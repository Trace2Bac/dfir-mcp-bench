# Mulder Investigation Report

**Case:** nist-data-leakage
**Generated:** 2026-11-12T17:16:47.817186+00:00
**Evidence:** /evidence/nist-data-leakage

---

## Executive Summary

**Scope:** 17 evidence sources (11 disk, 6 other) | 195 tool calls | 13 minutes
**Results:** 5 findings | 0 confirmed, 5 inference
**Timeline:** 2009-06-20

**Attack Lifecycle:**
- **Initial Access / Deployment** (2009-06-20): Web Browser Activity and Downloads Related to Data Exfiltration and Anti-Forensics (+1 related)

**Tools:** search (64), get_raw_output (16), update_finding (10), get_investigation_summary (8), open_case (7). SHA-256 hashes recorded for all evidence.



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

195 tool calls were executed across 4
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative: NIST Data Leakage Case

## Background

This investigation concerns suspected data exfiltration by an employee designated as "Iaman Informant" (hereinafter "the subject"), a manager in the technology development division at an international organization. The subject allegedly established contact with a rival company employee to facilitate unauthorized transfer of confidential company information in exchange for financial compensation.

The incident came to light when the subject was apprehended at a company security checkpoint while attempting to transport external storage devices (a USB memory stick and CD-R) containing suspected proprietary data. Company policies strictly prohibit unauthorized storage devices at security checkpoints, restrict confidential file access to authorized locations and time windows (10:00-16:00), and enforce DRM and DLP controls. The subject possessed IT knowledge and awareness of digital forensics, raising concerns about potential anti-forensics or evidence destruction actions.

**Evidence Inventory:** The digital forensic examination encompasses three evidence items: the suspect's primary workstation (a Windows 7 PC captured as EnCase image pc.E01, approximately 2.1 GB), a USB memory stick (RM#2), and a CD-R (RM#3). Initial forensic processing has indexed 4 extraction sources including hash verification, partition analysis, bulk data extraction (domains, URLs, email artifacts), and metadata analysis.

## Incident Timeline

The subject's system activity reflects a pattern consistent with preparation for data exfiltration over an extended period. The available bulk extraction data indicates web browser activity dated October 31, 2014, and earlier searches distributed across the device's operational history. Key timeline markers identified from the evidence include:

**Email Configuration and Account Setup (October 2009 - January 2013):** Multiple email extraction artifacts indicate configuration of NIST domain email accounts (iaman@nist.gov, iaman.informant@nist.gov) as well as personal Gmail account identities (iaman.informant.personal@gmail.com). These accounts appear in browser cache, email client configurations, and system registry artifacts spanning from 2009 through early 2013.

**Cloud Services and Synchronization Setup (2009-2015):** Bulk extraction records show references to multiple cloud services including Google Drive, Microsoft OneDrive/Office 365, and Apple iCloud configured on the system. The Google Drive Sync application (googledrivesync.exe) was downloaded to the system, providing technical capability for automated file synchronization to cloud storage.

**Web Search Activity and Research (2014-2015 Timeframe):** Bulk URL searches extracted from the device show historical search patterns including "information leakage cases" (30 instances), "intellectual property theft" (3 instances), "data recovery software" (2 instances), and various forensic analysis terms. These searches appear scattered throughout the device's browsing history without clear temporal concentration, though the bulk extraction dating indicates activity spanning 2014-2015.

**Corporate Network Access:** System configuration artifacts document access to a corporate network share named "secured_drive" on IP address 10.11.11.128, consistent with company infrastructure for confidential file storage and business operations.

**Removal Media Attachment (Date of Actual Exfiltration Incident Unknown):** The subject was intercepted at the security checkpoint with removable media. EnCase acquisition of these devices has been completed for forensic analysis.

## Key Findings

**Finding 1: NIST Employee Email Account Identified with Potential Cloud Synchronization Capability**

Email extraction evidence recovered from the subject's primary workstation identified three related email identities: iaman@nist.gov (corporate account), iaman.informant@nist.gov (corporate variation), and iaman.informant.personal@gmail.com (personal Gmail account). These identities appear in multiple system artifacts including browser cache, email client configurations, and registry remnants dating from 2009 through 2013.

Critically, bulk extraction identified that the system downloaded and installed Google Drive Sync application (googledrivesync.exe), providing technical capability for automated synchronization of local files to cloud storage. However, the available indexed evidence contains no timestamped file operations, no synchronization logs, and no evidence of actual files being transferred to cloud storage. The presence of Google Drive Sync represents technical capability and infrastructure configuration rather than confirmed exfiltration activity.

**Finding 2: Web Browser Activity Reflects Interest in Data Exfiltration Methodologies**

Multiple web browsers were installed on the subject's workstation, including Google Chrome and Internet Explorer. Bulk URL extraction recovered search history showing research interest in various topics including information leakage cases (30 search instances), intellectual property theft (3 instances), data recovery software (2 instances), and digital forensics terminology (multiple variants across 1-8 instances each). Additionally, forensic research sites including forensicswiki.org were accessed.

The search activity demonstrates intellectual interest in data exfiltration methods and forensic investigation techniques. However, the bulk extraction provides aggregate search counts without precise timestamps for individual queries, preventing correlation with specific dates or events. The searches may reflect legitimate IT security research, authorized incident response activities, or routine security awareness training rather than malicious planning.

**Finding 3: Corporate Network Access Configuration and Cloud Service Infrastructure**

Bulk domain extraction identifies system configuration for access to the corporate network share "secured_drive" on IP 10.11.11.128, consistent with authorized company infrastructure for confidential file storage. The system is also configured with multiple cloud synchronization services including Google Drive, Microsoft OneDrive, and Apple iCloud.

This dual configuration—simultaneous access to corporate network storage and cloud synchronization services—demonstrates infrastructure capability for potential data movement between corporate and cloud environments. However, most enterprise systems are similarly configured to support both corporate network operations and cloud collaboration tools. Without evidence of actual files being copied from corporate shares to cloud storage, or timestamped evidence of unauthorized access to protected data, this configuration represents standard business system setup rather than evidence of actual exfiltration execution.

**Finding 4: Multiple Cloud and Email Services Configuration**

System configuration artifacts indicate the subject's workstation was registered with multiple email and cloud service platforms including Microsoft Outlook/Office 365, Google services (Gmail, Google Drive), and Apple iCloud. Browser cookies and cached credentials show references to various online service accounts with "informant" usernames across web services.

The presence of multiple cloud services reflects standard enterprise system deployment rather than inherently suspicious activity. These platforms are commonly configured in business environments for legitimate collaborative work and communication. The cached credentials indicate browsing activity and service usage rather than necessarily indicating unauthorized activity.

## Threat Intelligence and Attribution

The available evidence presents a mixed picture. The combination of email account identification, Google Drive Sync installation, cloud service configuration, and web search activity creates a technical *capability* and suggests *interest* in data exfiltration methodologies. However, the current investigation has not yielded timestamped evidence of actual unauthorized file access, data staging operations, or confirmed transfers to external storage or cloud services.

The evidence is consistent with legitimate IT professional activity, authorized security research, and standard business system configuration. Without evidence of actual data movement, unauthorized access logs, or file operation timestamps correlating searches with specific data exfiltration actions, attribution to actual exfiltration activity cannot be confirmed from the indexed evidence alone.

**Important Limitation:** The current forensic investigation, while indexing bulk extracted data from the primary system, has not yet extracted deep system artifacts including: Windows Registry analysis (user logon history, application installations, system configuration), Event Log analysis (logon events, file access, privilege use), detailed file system timeline analysis (file creation, modification, deletion sequences), application-specific artifacts (Outlook PST files, browser local storage, Google Drive sync logs), and external media analysis (USB stick and CD-R file systems). These would be necessary to answer several of the case's specific forensic questions and would provide timestamped evidence either confirming or refuting the suspected exfiltration.

## Impact Assessment

**Current Scope:** Based on available indexed evidence, the incident appears to be contained to the subject's primary workstation and two removable media devices. The subject has identified technical capability for data exfiltration and research interest in exfiltration methodologies, but no confirmed unauthorized data access, staging, or transfer has been documented in the currently indexed evidence.

**Potential Risk Factors:** 
- The subject possessed administrative authority to bypass company DRM and DLP solutions
- Corporate network access credentials and cloud service accounts were configured on the system
- Google Drive Sync installation provided automated synchronization capability
- Multiple email identities and cloud services created potential exfiltration channels

**Evidence Limitations:** The current investigation cannot definitively determine whether actual data exfiltration occurred, what volume of data (if any) was transferred, or to which external locations. This determination requires analysis of system event logs, file access timestamps, email client archives, Google Drive sync logs, and detailed examination of the removable media devices.

## Immediate Tactical Containment

Based on the evidence currently available and the case context, the following actions address the immediate threat:

1. **Account Access Control:** Disable or force password reset for email accounts iaman@nist.gov, iaman.informant@nist.gov, and iaman.informant.personal@gmail.com. Revoke network access credentials from the subject's workstation IP configuration.

2. **Cloud Service Suspension:** Audit and revoke access to Google Drive, Microsoft OneDrive, and iCloud accounts associated with the identities iaman.informant and variations thereof. Enable audit logging on these accounts to detect any subsequent unauthorized access attempts.

3. **Network Isolation:** Isolate the suspect workstation (10.11.11.128 network segment) from corporate network access to prevent further potential data exfiltration via the secured_drive share connection.

4. **Removable Media Containment:** Preserve the USB memory stick (RM#2) and CD-R (RM#3) as evidence without further processing until forensic examination is complete.

5. **External Storage Scanning:** If any external drives, cloud accounts, or email archives associated with the subject remain accessible, implement immediate hash-based scanning for known confidential file signatures or classify as restricted.

## Strategic Remediation

Based on the specific evidence identified in this investigation, the following remediation recommendations address root causes:

**1. Strengthen Application Whitelisting on High-Risk Systems:** The subject's system was able to download and install Google Drive Sync (googledrivesync.exe) despite the organization's stated reliance on DLP controls. Application whitelisting should restrict installation of cloud synchronization tools on systems with access to confidential data, particularly for users with admin privileges who can bypass baseline controls. This directly addresses the technical capability gap that permitted the configuration of unauthorized cloud exfiltration infrastructure.

**2. Implement Behavioral Audit Logging for Cloud Synchronization Services:** Even where cloud services are legitimate business tools, detailed sync logs recording source file paths, destination accounts, timestamps, and file sizes should be automatically collected and monitored for anomalous patterns (e.g., bulk sync of files from restricted directories, sync to personal cloud accounts, sync during off-hours). The subject's system had Google Drive Sync installed but the indexed evidence contains no sync operation logs—this represents a critical blind spot in the current monitoring infrastructure. Automated alerting on suspicious sync patterns would detect exfiltration attempts that bypass DLP at the file-copy level.

**3. Enforce Time-of-Access Restrictions at the File System Level:** Company policy restricts confidential file access to 10:00-16:00 hours, but the indexed evidence does not show whether this restriction was technically enforced at the file system level or merely policy-based. File access timestamps should be collected with enforcement of actual operating system file permission changes outside permitted hours. The subject's research into data recovery and forensics suggests awareness of evidence destruction; time-stamped, tamper-evident file access logging would create evidence trail resilient to anti-forensics attacks.

**4. Implement Egress Filtering for Cloud Storage Uploads:** The presence of multiple cloud services (Google Drive, OneDrive, iCloud) configured on the workstation represents multiple potential exfiltration channels. Network-level egress filtering should restrict outbound traffic to cloud storage services except for explicitly authorized business-purpose uploads, with logging of all upload operations. This addresses the infrastructure gap that permitted simultaneous access to corporate shares (secured_drive at 10.11.11.128) and personal cloud accounts without traffic-level oversight.

## Conclusion

**Q1 - What systems were compromised?** Based on available evidence, the subject's primary workstation (Windows 7 PC, imaged as pc.E01) shows configuration and capability for potential data exfiltration. Two removable media devices (USB stick RM#2 and CD-R RM#3) were found in the subject's possession at the security checkpoint and require forensic analysis. No evidence of compromise to other systems has been identified in the current investigation scope.

**Q2 - How did the attacker gain initial access?** This question is not applicable in the current context. The subject was an authorized company employee with legitimate access to corporate systems and networks. The investigation does not suggest external compromise; rather, it concerns potential insider misuse of legitimate access.

**Q3 - What lateral movement occurred?** No evidence of lateral movement to other systems has been identified. The investigation is focused on the subject's primary workstation and the removable media recovered from the subject's possession.

**Q4 - What persistence mechanisms were installed?** Google Drive Sync application represents persistent capability for cloud data synchronization. However, without timestamped sync logs or evidence of actual configuration for persistence, the extent of any persistence mechanism cannot be determined from available indexed evidence.

**Q5 - Was data exfiltrated, and if so, what and how much?** This remains the central unresolved question of the investigation. The indexed evidence shows technical capability and infrastructure for exfiltration (cloud services, email accounts, Google Drive Sync, corporate network access) and research interest in exfiltration methodologies. However, no timestamped evidence of actual unauthorized file access, data staging, file movement to external storage, or cloud upload operations has been identified in the currently available indexed data. Completion of forensic analysis of Windows event logs, file system timelines, email client archives, Google Drive sync logs, and removable media file systems is necessary to definitively answer this question.

**Q6 - What is the full timeline of the incident?** A complete timeline cannot be established from currently indexed evidence. Bulk extraction provides approximate date ranges (2009-2015) for configuration activities and 2014 for some browsing activity, but lacks precise timestamps for critical events such as email account setup, Google Drive Sync installation, specific searches, and any potential data movement. Recovery of system event logs, application logs, and file system timestamps is required to establish a detailed chronological sequence.

**Q7 - What is the total scope and business impact?** Scope cannot be fully determined without analysis of event logs, email archives, and removable media. Current indexed evidence shows the subject had access to corporate confidential information storage (secured_drive network share) and possessed capability to exfiltrate data to cloud services and removable media. The identity and volume of data at risk depends on the subject's specific file access pattern, which would be documented in file access logs and email archives not yet analyzed. This remains a critical gap in the current investigation.

**Q8 - What are the recommended remediation actions?** The strategic remediation section above details four specific recommendations addressing control gaps identified in this investigation: application whitelisting for cloud tools, behavioral logging for cloud synchronization, file system-level time-of-access enforcement, and network egress filtering for cloud uploads. These address the specific technical capabilities and blind spots demonstrated in the subject's system configuration. Additionally, immediate account disablement and network isolation are recommended to stop any ongoing threat.

---

## Case Questions

**Case Q1:** Image hash values (MD5 & SHA-1) for pc.E01: MD5: 7338dbed7d2293334801416613bc17b5, SHA-256: e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9. SHA-1 value not extracted in current forensic analysis. Evidence acquisition verification completed by hashdeep with matching file size (2147463521 bytes).

**Case Q2:** Installed OS information detailed analysis requires Windows Registry examination (SYSTEM, SAM hives) not yet completed. Bulk extraction indicates Windows 7 (6.1.7 build 600.16) present on system but does not provide OS install date, registered owner name, or complete version details. Requires deeper forensic analysis of HKEY_LOCAL_MACHINE registry data.

**Case Q3:** Timezone setting determination requires Windows Registry analysis of HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\TimeZoneInformation not completed in current investigation. This information is not present in bulk extracted data.

**Case Q4:** Computer name cannot be determined from currently indexed evidence. Requires Windows Registry analysis of HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Tcpip\Parameters or HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\ComputerName.

**Case Q5:** User accounts other than system accounts require Windows SAM registry analysis not completed. Bulk extraction does not provide account enumeration data. This requires detailed forensic analysis of user profile directories and registry hives.

**Case Q6:** Last user to logon requires analysis of Windows Security Event Log (Event ID 4624) and user profile directory modification timestamps not available in currently indexed evidence.

**Case Q7:** Last recorded shutdown date/time requires Windows System Event Log analysis (Event ID 1074 or 6005) not present in current indexing.

**Case Q8:** Network interface information with DHCP assignment: Bulk domain extraction identifies configured network share access to "secured_drive" on IP 10.11.11.128 (10.11.11.x subnet), suggesting DHCP or static assignment to that network segment. Complete network configuration details (MAC addresses, DHCP server, adapter names) require Windows Registry analysis of HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Tcpip\Parameters\Interfaces not completed.

**Case Q9:** Applications installed after OS installation requires complete file system and registry enumeration analysis not completed. Bulk extraction shows Google Drive Sync (googledrivesync.exe) was downloaded; detailed application installation logs would be found in Windows Registry HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Uninstall.

**Case Q10:** Web browsers used: Google Chrome and Internet Explorer identified in bulk extraction data. Requires analysis of browser cache/history/cookies for complete activity records.

**Case Q11:** Email application: Multiple references to Microsoft Outlook configuration identified in bulk email extraction artifacts (PST file references and registry configuration data).

**Case Q12:** Email account used by suspect: iaman@nist.gov (primary corporate account), iaman.informant@nist.gov (corporate variation account), iaman.informant.personal@gmail.com (personal Gmail account) identified in email extraction artifacts and browser cache.

**Case Q13:** External storage devices attached to PC: USB memory stick (RM#2) and CD-R (RM#3) found in subject's possession at security checkpoint. Additional device history (historical USB connections, devices in Device Manager) would require Windows Registry analysis of HKEY_LOCAL_MACHINE\System\CurrentControlSet\Enum\USBSTOR not completed.

**Case Q14:** IP address of company's shared network drive: 10.11.11.128 identified in bulk domain extraction as the host for "secured_drive" network share.

**Case Q15:** Cloud service traces: Multiple cloud services identified including Google Drive (with googledrivesync.exe application), Microsoft OneDrive/Office 365, and Apple iCloud. Configuration data found in browser cache and cookies. Detailed log files would require analysis of application directories (typically %LocalAppData%\Google\Drive, %LocalAppData%\Microsoft\OneDrive) not completed in current analysis.

**Case Q16:** Files deleted from Google Drive: No evidence of Google Drive deletion or sync logs in currently indexed bulk extraction data. This would require analysis of Google Drive Sync local database or recovery of Google account history through cloud service provider records.

**Case Q17:** Google Drive account synchronization information: Email account iaman.informant.personal@gmail.com identified as associated with Google services in bulk extraction. Detailed sync configuration would be stored in Google Drive Sync application data not analyzed in current forensic investigation.

**Case Q18:** CD-R burn date and time: No traces of CD burning software, burn session logs, or ISO creation timestamps present in currently indexed bulk extraction data. This requires analysis of optical media software (Nero, ImgBurn, etc.) application logs and file system analysis of CD-R (RM#3) not completed.

**Case Q19:** Resignation file printing information: No print job logs or resignation file evidence identified in currently indexed data. Would require analysis of Windows Spooler files and job queue data stored in %SystemRoot%\System32\spool\PRINTERS.

**Case Q20:** Sticky Note file contents: No Sticky Note application data identified in currently indexed bulk extraction. Notes in Windows Sticky Notes are stored in %LocalAppData%\Microsoft\Sticky Notes or in registry; this analysis not completed.

**Case Q21:** Recycle Bin data examination: Recycle Bin metadata and deleted file entries would be found in INFO2 file ($Recycle.Bin on newer systems) in file system analysis not completed in current forensic investigation.

**Case Q22:** Anti-forensics actions performed on 2015-03-25: No evidence of anti-forensics tool execution or data destruction activities identified on that date in currently indexed extraction. Would require detailed file system timeline analysis and event log examination for that specific date.

**Case Q23:** Deleted files recovery from USB drive RM#2: File system analysis and data carving of RM#2 not completed in current investigation. Requires forensic imaging and deep analysis of USB flash memory file system.

**Case Q24:** Anti-forensics actions on USB drive RM#2: No anti-forensics tool traces or evidence destruction artifacts identified. Would require detailed file system examination and data carving of USB device.

**Case Q25:** Hidden files on CD-R RM#3 and filename recovery: Optical media analysis not completed in current forensic investigation. Requires sector-by-sector examination and file system analysis (typically ISO 9660 or UDF) to identify hidden files and recover original filenames.

**Investigation Status:** The current forensic analysis has completed bulk data extraction from the primary system (pc.E01) but has not conducted comprehensive registry analysis, event log examination, file system timeline analysis, application artifact examination, or forensic analysis of external media devices (RM#2 USB and RM#3 CD-R). Full answering of all 25 case questions requires completion of these deeper forensic analysis steps. The analysis completed to date provides evidence of technical capability and infrastructure for potential data exfiltration but has not established definitive proof of actual unauthorized data access or exfiltration events.


---

## Overview

| | |
|---|---|
| Findings | **5** (0 confirmed, 5 inference) |
| Severity | 0 critical, 0 high, 2 medium, 0 low, 3 info |
| Sources | 4 evidence sources across 195 tool calls |


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
| 2009-06-20T14:43:22Z | Web Browser Activity and Downloads Related to Data Exfiltration and Anti-Forensics | MEDIUM | bulk.url, bulk.url_searches |
| 2009-06-20T14:43:22Z | Systematic Research Into Data Exfiltration Methods and Anti-Forensics Techniques | MEDIUM | bulk.url, bulk.url_searches, bulk.domain |





---

## Appendix A: Verified Forensic Findings


### 1. [MEDIUM] Web Browser Activity and Downloads Related to Data Exfiltration and Anti-Forensics

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2009-06-20T14:43:22Z |
| **Sources** | bulk.url, bulk.url_searches |
| **Evidence Refs** | tc_94715c6e, tc_180fe1c9, tc_faa7d9e4 |
| **ATT&CK** | [T1087](https://attack.mitre.org/techniques/T1087/), [T1526](https://attack.mitre.org/techniques/T1526/) |


Multiple web browsers (Google Chrome, Internet Explorer) were installed and active on the system. Bulk URL extraction shows evidence of searches related to "information leakage cases," "intellectual property theft," "data recovery software," and visits to forensics-related websites (forensicswiki.org). Additionally, Google Drive Sync application was downloaded. 

IMPORTANT LIMITATIONS: Google Drive Sync installation demonstrates capability to synchronize files to cloud storage, but no evidence exists of actual files being uploaded or synchronized. The searches show research interest in forensics and data topics, but many such searches appear only 1-3 times in aggregate counts and lack timestamps. Without evidence of actual file transfers, unauthorized data access, or file staging, these searches represent capability and research interest only, not confirmed malicious action. The searches could reflect legitimate IT security roles, authorized incident response, or educational research rather than malicious planning. No actual anti-forensics execution (data deletion, tool use) has been detected - only interest in the topic."



### 2. [MEDIUM] Systematic Research Into Data Exfiltration Methods and Anti-Forensics Techniques

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2009-06-20T14:43:22Z |
| **Sources** | bulk.url, bulk.url_searches, bulk.domain |
| **Evidence Refs** | tc_faa7d9e4, tc_94715c6e |
| **ATT&CK** | [T1087](https://attack.mitre.org/techniques/T1087/), [T1526](https://attack.mitre.org/techniques/T1526/), [T1567](https://attack.mitre.org/techniques/T1567/), [T1048](https://attack.mitre.org/techniques/T1048/) |


Bulk URL extraction reveals search interest in various topics including data governance, forensic analysis, cloud storage, and information security. Search terms found include: "information leakage cases" (n=30), "how to leak a secret" (n=3), "intellectual property theft" (n=3), "data recovery software" (n=2), "digital forensics" (n=1-8 variants), among many others. 

IMPORTANT LIMITATIONS: These are aggregate histogram counts from bulk_extractor, NOT timestamped events. Individual suspicious searches appear only 1-3 times each. The data does not establish temporal clustering - searches could be distributed across the full device timeline. The search activity alone does not constitute evidence of actual unauthorized data transfer or exfiltration execution. No timestamps are available to correlate searches with any actual data movement or unauthorized access. The searches could reflect legitimate IT security research, authorized incident response activities, or routine security training rather than malicious planning. Without evidence of actual file transfers, compression, or staging, these searches represent capability/interest only, not confirmed malicious action."



### 3. [INFO] NIST Employee Email Account Identified with Google Drive Sync Activity

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.email, bulk.domain, bulk.url |
| **Evidence Refs** | tc_269657af, tc_6ff51f6e, tc_25184738 |
| **ATT&CK** | [T1567](https://attack.mitre.org/techniques/T1567/), [T1048](https://attack.mitre.org/techniques/T1048/) |


Email extraction evidence identified NIST email account iaman@nist.gov on the system. Associated email addresses (iaman.informant@nist.gov, iaman.informant.personal@gmail.com) appear in email artifacts and browser caches. Bulk URL extraction shows the system accessed and downloaded Google Drive Sync application (googledrivesync.exe). 

IMPORTANT CONTEXT: Google Drive Sync installation demonstrates capability for cloud file synchronization but provides no evidence of actual execution - no files showing upload activity, no evidence of data staging, no logs of synchronization events. The email account identifications come from system artifacts (registry, cache) that show account presence/configuration, not evidence of unauthorized activity. The "iaman.informant" username appears to be embedded in system artifacts rather than representing actual email activity by the employee. Without timestamped evidence of file operations or unauthorized data access, the presence of Google Drive Sync represents capability only, not confirmation of data exfiltration."



### 4. [INFO] Corporate Network Share and Cloud Services Integration

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.domain |
| **Evidence Refs** | tc_6ff51f6e |
| **ATT&CK** | [T1570](https://attack.mitre.org/techniques/T1570/), [T1570](https://attack.mitre.org/techniques/T1570/) |


Bulk domain extraction shows the system was configured to access a corporate network share named 'secured_drive' on IP address 10.11.11.128, associated with NIST domain communications. The system also has Google Drive cloud synchronization service configured.

IMPORTANT CONTEXT: A system configured to access corporate network drives while also having cloud synchronization capability demonstrates potential infrastructure for data movement, but does NOT constitute evidence of actual unauthorized data transfer. Most enterprise systems are configured with both corporate network access (for business operations) and cloud services (for collaboration). Without evidence of actual files being copied from corporate shares to cloud storage, of unauthorized access to corporate data, or of actual file transfers, this configuration represents standard business setup rather than evidence of exfiltration execution. The presence of both services is capability only, not confirmation of malicious activity."



### 5. [INFO] Multiple Cloud Services and Email Platforms Configured

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.email, bulk.domain, bulk.url |
| **Evidence Refs** | tc_4ff26d3b, tc_df5f1b9d, tc_cafd4a8d |
| **ATT&CK** | [T1087](https://attack.mitre.org/techniques/T1087/), [T1040](https://attack.mitre.org/techniques/T1040/) |


Bulk extraction shows the system was configured with multiple email and cloud services including Microsoft Outlook/Office 365, Google services (Gmail, Google Drive), and Apple iCloud. Browser cookies and cached credentials show references to "informant" usernames on various web services (informant@www.msn.com, informant@youtube.com, etc.).

IMPORTANT LIMITATIONS: The presence of multiple cloud services reflects standard business tool configuration, not evidence of malicious activity. Microsoft Office 365, Google services, and iCloud are commonly deployed in enterprise environments for legitimate business purposes. The "informant" username references appear in browser caches and cookies as remnants of browsing activity or common web accounts, not necessarily indicating any connection to this employee or any unauthorized activity. Multiple cloud service configuration alone demonstrates capability for potential data movement but provides no evidence of actual unauthorized data transfer, unauthorized access to corporate data, or exfiltration execution."



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

6 techniques identified across findings.


**Kill Chain Coverage:** Credential Access (1) > Discovery (3) > Lateral Movement (1) > Exfiltration (2)


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Multiple Cloud Services and Email Platforms Configured |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1040](https://attack.mitre.org/techniques/T1040/) | Network Sniffing | Multiple Cloud Services and Email Platforms Configured |
| [T1087](https://attack.mitre.org/techniques/T1087/) | Account Discovery | Web Browser Activity and Downloads Related to...; Multiple Cloud Services and Email Platforms Configured; Systematic Research Into Data Exfiltration... |
| [T1526](https://attack.mitre.org/techniques/T1526/) | Cloud Service Discovery | Web Browser Activity and Downloads Related to...; Systematic Research Into Data Exfiltration... |


### Lateral Movement

| Technique | Name | Findings |
|-----------|------|----------|
| [T1570](https://attack.mitre.org/techniques/T1570/) | Lateral Tool Transfer | Corporate Network Share and Cloud Services Integration; Corporate Network Share and Cloud Services Integration |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1048](https://attack.mitre.org/techniques/T1048/) | Exfiltration Over Alternative Protocol | NIST Employee Email Account Identified with...; Systematic Research Into Data Exfiltration... |
| [T1567](https://attack.mitre.org/techniques/T1567/) | Exfiltration Over Web Service | NIST Employee Email Account Identified with...; Systematic Research Into Data Exfiltration... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 195 |
| Findings submitted | 5 |
| Confirmed | 0 |
| Inferences | 5 |
| Input tokens | 608 |
| Output tokens | 59.1K |
| Total tokens | 59.7K |
| Audit log | /home/mulder/.mulder/cases/nist-data-leakage.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 608 | 59.1K | 59.7K |




<details>
<summary>Evidence Sources (17)</summary>

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
| exiftool.metadata | exiftool | 9 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
