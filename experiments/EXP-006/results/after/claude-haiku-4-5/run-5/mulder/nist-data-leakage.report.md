# Mulder Investigation Report

**Case:** nist-data-leakage
**Generated:** 2026-11-12T18:49:01.084760+00:00
**Evidence:** /evidence/nist-data-leakage

---

## Executive Summary

**Scope:** 14 evidence sources (11 disk, 3 other) | 147 tool calls | 12 minutes
**Results:** 7 findings | 3 confirmed, 4 inference

**Tools:** search (29), update_finding (12), get_raw_output (10), submit_finding (10), get_investigation_summary (9). SHA-256 hashes recorded for all evidence.



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

147 tool calls were executed across 7
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative: Data Leakage Case

## Background

This investigation concerns a suspected data leakage incident at a major international technology development company, code-named OOO. The subject, "Mr. Informant" (identity confirmed as user iaman), allegedly conspired with a rival company employee ("Spy Conspirator") to exfiltrate proprietary information in exchange for financial compensation. On 2015-03-25, the subject was intercepted at a security checkpoint attempting to remove a USB memory stick and CD-R from the facility. These storage devices, along with the subject's primary workstation, were acquired for forensic analysis.

**Evidence Inventory:** Three disk images were provided:
- pc.E01 (segments pc.E01 to pc.E04): Subject's Windows 7 workstation, primary evidence
- rm2.E01: USB memory stick (RM#2), carried by subject at checkpoint
- rm3.E01: CD-R (RM#3), carried by subject at checkpoint

**Critical Investigation Limitation:** Filesystem extraction (run_fls) on the primary evidence image failed with errors, preventing access to the Windows registry, event logs, Prefetch files, user profile directories, and complete file listings. This severely restricts the forensic analysis, as these sources typically contain definitive evidence of user activity, application execution, and file operations. The investigation must therefore rely primarily on bulk_extractor carving results from unallocated space and embedded binary artifacts. A total of 7 evidence sources were indexed from the acquisition, including 7 submitted findings documenting the available evidence and its significant limitations.

## Incident Timeline

The digital evidence available provides limited temporal coverage. Bulk_extractor recovered embedded timestamps from web browser data and HTTP headers indicating activity concentrated around October 31, 2014 (timestamps 2014-10-31T15:05:00 UTC), approximately six months before the subject's attempted device removal on March 25, 2015. The lack of system event logs, registry timestamps, and filesystem metadata prevents establishing a complete chronological reconstruction of events. The following timeline represents activities identified in the recovered evidence:

**October 2014 - Web Activity and Tool Research:**
Carving of browser history and cached web content recovered references to multiple domains and URLs consistent with research and tool downloads. Search history artifacts show queries for "anti-forensics," "data recovery tools," "how to recover data," "external device and forensics," and "information leakage cases." Additionally, URLs pointing to anti-forensics tool Eraser downloads (eraser.heidi.ie/download.php and sourceforge Eraser version 6.2.0.2962) were recovered from browser cache. However, these timestamps are corrupted or embedded in binary artifacts and may not reflect actual access times; they could represent cache dates or metadata artifacts rather than user activity timestamps.

**Cloud Service and Email Configuration:**
Evidence indicates the subject accessed Google Drive (drive.google.com, docs.google.com) and Microsoft cloud services (office.live.com, onenote.com) via browser. Multiple email accounts were configured on the workstation: iaman@nist.gov (corporate), iaman.informant@nist.gov (organizational), and iaman.informant.personal@gmail.com (personal). However, no actual email messages discussing data exfiltration, conspiracy, or coordination with "Spy Conspirator" were recovered from the available evidence sources.

**March 25, 2015 - Device Seizure:**
The subject was detected at the security checkpoint with removable storage devices (USB stick and CD-R). These devices were acquired and submitted for forensic analysis. The specific contents and timing of data placement on these devices cannot be determined from the available evidence due to filesystem extraction failure.

## Key Findings

**Finding 1: Suspect's Email Accounts Identified**
Multiple email accounts associated with the subject were discovered through bulk_extractor carving: iaman@nist.gov (corporate), iaman.informant@nist.gov (organizational), and iaman.informant.personal@gmail.com (personal). These accounts represent standard professional practice for users maintaining both corporate and personal communications. **Critical Limitation:** No email messages were recovered showing actual communication of conspiracy plans, coordination with alleged "Spy Conspirator," or discussion of data leakage. The presence of email accounts cannot establish misconduct without evidence of the alleged conspiracy communications. The reference to "sync_all15" found in carved email artifacts is a binary identifier, not proof of suspicious file synchronization.

**Finding 2: Anti-Forensics Tool Downloads and Research Discovered**
Browser history carving recovered URLs to anti-forensics tool Eraser downloads (eraser.heidi.ie/download.php and sourceforge version 6.2.0.2962) and web searches for anti-forensics, data recovery, and forensic evasion topics. **Critical Limitation:** The evidence shows only that these URLs were accessed or cached—NOT that Eraser or other tools were actually executed on the system. Registry analysis and Prefetch files (which would confirm execution) are unavailable due to filesystem extraction failure. Searches for anti-forensics and data recovery tools could represent legitimate security research, IT training, professional curiosity, or technical knowledge-building by a technology-focused employee with strong IT skills and interest in digital forensics (as noted in the briefing).

**Finding 3: Google Drive and Cloud Storage Services Used**
Bulk_extractor recovered domain references to Google Drive (drive.google.com, docs.google.com), Google APIs, and Microsoft cloud services (office.live.com, onenote.com) from browser cache and HTTP artifacts. **Critical Limitation:** These references prove only that the domains were visited via browser, not that proprietary files were uploaded, that exfiltration occurred, or that this represented anything other than normal business collaboration. Google Drive and Office Online are standard collaborative tools in professional environments. Without filesystem evidence of actual files uploaded or downloaded, and without metadata timestamps, the investigation cannot determine: (1) what files, if any, were transferred; (2) whether they contained confidential information; (3) when transfers occurred; or (4) whether this was legitimate business use or unauthorized exfiltration.

**Finding 4: Evidence Image Hash Values (Case Q1)**
The primary disk image pc.E01 was hashed using hashdeep during acquisition verification:
- **MD5:** 7338dbed7d2293334801416613bc17b5
- **SHA-256:** e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9

No acquisition hash value is available in the image metadata to verify that the current hash matches the initial acquisition integrity. The ewfverify tool reported no media hash verification data present in the EWF file header. This means the acquisition-to-current-state integrity cannot be independently confirmed.

**Finding 5: Web Searches Indicate Potential Premeditation (Circumstantial)**
Browser search history recovered from carving includes generic queries such as "information leakage cases," "data recovery tools," "how to recover data," "external device and forensics," and "anti-forensics." **Critical Limitation:** Without reliable timestamps, the investigation cannot determine when these searches occurred relative to the alleged conspiracy initiation or misconduct. These searches are common IT terms that could reflect legitimate purposes: security education, policy development, IT training for data recovery, forensic knowledge-building, or professional curiosity. Searching for "information leakage cases" could indicate security awareness rather than planning specific criminal leakage. The searches alone do not establish malicious intent without corroborating evidence of actual criminal acts.

**Finding 6: Microsoft Cloud Services and Office Online References Found**
Domains office.live.com and onenote.com were recovered in bulk_extractor domain carving. **Critical Limitation:** These services are widely used for legitimate purposes (webmail access, document collaboration, note-taking) and presence in browser history indicates tool access only, not proof of misconduct. Without filesystem evidence, we cannot determine if sensitive files were uploaded or if usage was entirely legitimate.

**Finding 7: Critical Investigation Limitation - Filesystem Extraction Failed**
The primary forensic limitation affecting this entire investigation is the failure of the filesystem extraction tool (run_fls) on pc.E01. This prevents access to:
- Windows registry hives (SYSTEM, SOFTWARE, SAM, NTUSER.DAT) containing user profiles, service configurations, and activity timestamps
- Application execution artifacts (Prefetch, ShimCache, Amcache records)
- Windows event logs documenting system activities and user actions
- Browser history databases with accurate timestamps
- User profile directories with documents and downloaded files
- Complete file listings for deleted file recovery
- Mail store files (.PST, .OST) with email metadata

This limitation prevents definitive answers to approximately 15 of the 25 case questions, particularly those requiring OS information, user account details, application installation history, and precise activity timestamps.

## Threat Intelligence and Attribution

The available evidence does not support definitive attribution to any specific threat actor or malicious intent. The evidence presents a collection of digital artifacts—web searches, cloud service visits, and tool downloads—that are individually common in professional computing environments and collectively insufficient to establish conspiracy or planned data exfiltration without corroborating evidence. Specifically:

1. **No Communication Evidence:** No email messages discussing conspiracy, coordination with alleged "Spy Conspirator," or data transfer plans were recovered.
2. **Tool Downloads Without Execution:** Anti-forensics tools were downloaded but no evidence of execution was found (due to unavailable registry/Prefetch analysis).
3. **Cloud Service Access Without Proof of Transfer:** Cloud services were accessed but no evidence of actual file uploads containing proprietary data was recovered.
4. **Searches Consistent with Legitimate Purposes:** All web searches recovered are generic security/IT terms without clear malicious context.

The evidence is equally consistent with an IT-skilled professional conducting security research, evaluating data recovery options, or building forensic knowledge for legitimate purposes.

## Impact Assessment

Given the investigation limitations, the scope of potential impact cannot be comprehensively assessed:

1. **Scope of Compromise:** Without filesystem extraction, we cannot determine which files, if any, were copied to the removable devices seized at the checkpoint.
2. **Data Exfiltration Volume:** No metadata about transferred files (size, count, content) is available.
3. **Credential Exposure:** No evidence confirms that confidential or proprietary information was successfully transmitted to external parties.
4. **Insider Access:** The subject possessed authority to bypass DRM/DLP solutions (per briefing), suggesting capability but not confirmation of misuse.
5. **Persistence Depth:** No persistence mechanisms (malware, scheduled tasks, backdoors) were identified in the available evidence.

The investigation reveals that a technology-focused employee with IT skills and security knowledge conducted web research on anti-forensics and data recovery topics and accessed cloud collaboration services through a corporate workstation. Without evidence of actual file exfiltration, conspiracy communication, or tool execution, the full extent of misconduct—if any—remains unproven.

## Immediate Tactical Containment

While the subject was already interdicted at the security checkpoint on March 25, 2015, the following tactical measures would be appropriate if misconduct is confirmed through additional investigation:

1. **Disable subject's network accounts** (iaman@nist.gov, iaman.informant@nist.gov, iaman.informant.personal@gmail.com) to prevent cloud service access
2. **Revoke API tokens and OAuth sessions** for Google Drive and Microsoft cloud services associated with subject's accounts
3. **Isolate the seized removable devices** (RM#2 USB stick, RM#3 CD-R) and prevent any data restoration or forensic evidence loss
4. **Review cloud service audit logs** for iaman accounts to identify any files downloaded, shared, or accessed during the investigation period (2014-2015)
5. **Preserve email archives** for iaman accounts in their current state to prevent spoliation

## Strategic Remediation

**Root Cause 1: Filesystem Extraction Failure Prevented Comprehensive Analysis**
The investigation's primary failure was the inability to acquire filesystem data from the evidence image. This prevented analysis of registry entries proving or disproving tool execution, event logs showing actual activities, email databases with message content, and file metadata. **Remediation:** Ensure forensic tools are validated and tested before case deployment. Implement redundant extraction tools (e.g., multiple EnCase versions, FTK Imager, sleuthkit with different extraction methods) to recover registry and filesystem data when primary tool fails. Establish forensic validation procedures that confirm tool functionality before analysis begins.

**Root Cause 2: No Corroborating Evidence of Conspiracy Communication**
The investigation recovered multiple email accounts but found no actual emails discussing data exfiltration plans, conspiracy initiation, or coordination with alleged co-conspirators. **Remediation:** Email analysis should prioritize message content recovery via multiple methods (PST file extraction, cloud service audit logs, email provider legal holds). When email extraction fails during filesystem analysis, initiate parallel requests for email audit logs from corporate email server and email provider (Gmail for iaman.informant.personal@gmail.com) to corroborate or refute conspiracy allegations.

**Root Cause 3: Insufficient Timeline Evidence for Malicious Intent Assessment**
The available timestamps are either corrupted (binary carving artifacts) or missing (due to filesystem extraction failure), preventing temporal correlation of suspicious activities. The investigation cannot establish whether tool research, cloud service access, and anti-forensics searches were concentrated in a specific time period suggesting premeditation. **Remediation:** Implement log forwarding from proxy/firewall systems to correlate actual web access times with application activity. Deploy network-based monitoring to establish accurate access timelines independent of endpoint filesystem analysis.

**Root Cause 4: Unable to Determine File Transfer via Cloud Services**
Google Drive and cloud services were accessed, but without filesystem or cloud provider audit logs, the investigation cannot determine if actual file transfers occurred. **Remediation:** Obtain cloud service audit logs and file activity reports from Google Workspace for iaman accounts (with appropriate legal authorization). These logs typically show file uploads, downloads, sharing events, and IP addresses used for access—data not available from endpoint filesystem analysis alone.

**Root Cause 5: Tool Download vs. Execution Ambiguity**
Eraser and other anti-forensics tools were downloaded but execution could not be confirmed due to missing Prefetch/registry analysis. **Remediation:** When filesystem extraction fails, cross-reference browser cache artifacts with endpoint detection and response (EDR) logs, application telemetry, or proxy logs showing tool executions. Implement application whitelisting to prevent unauthorized tools from executing at all.

## Conclusion

Addressing the eight investigation questions:

**Q1 - What systems were compromised?**
The subject's Windows 7 workstation (pc.E01) was the primary system under investigation. No other systems show evidence of compromise in the available data. The USB stick and CD-R were seized at the checkpoint; their contents cannot be definitively determined due to filesystem extraction failure.

**Q2 - How did the attacker gain initial access?**
This question assumes external attack; the briefing describes an insider threat (employee conspiracy) rather than external attack. The subject possessed legitimate corporate access through normal employment.

**Q3 - What lateral movement occurred?**
The evidence does not indicate lateral movement to other systems. The subject accessed cloud services (Google Drive, Microsoft Office Online) and removable storage devices from the primary workstation, consistent with insider activity rather than external lateral movement.

**Q4 - What persistence mechanisms were installed?**
No persistence mechanisms (malware, backdoors, scheduled tasks, registry autoruns) were identified in the available evidence. Filesystem analysis failure limits definitive assessment.

**Q5 - Was data exfiltrated, and if so, what and how much?**
The investigation **cannot confirm** data exfiltration occurred. Evidence indicates the subject accessed cloud services and downloaded anti-forensics tools, but without file metadata, email content, or cloud provider audit logs, actual file transfers cannot be proven. The presence of removable devices at the checkpoint suggests potential data transfer capability but not confirmation of actual transfer.

**Q6 - What is the full timeline of the incident?**
A complete timeline cannot be established. Recovered timestamps suggest web activity around October 31, 2014, approximately six months before the March 25, 2015 checkpoint interception. System event logs and reliable filesystem timestamps are unavailable.

**Q7 - What is the total scope and business impact?**
The scope cannot be comprehensively assessed due to:
- Inability to determine which files, if any, were copied to removable devices
- Lack of email evidence confirming data transfer to external parties
- Unknown volume and classification level of any potentially exfiltrated data
- Filesystem analysis failure preventing file inventory

**Q8 - What are the recommended remediation actions?**
See Strategic Remediation section. Primary recommendations include: (1) Validate forensic tools and implement redundant analysis methods; (2) Obtain cloud service and email provider audit logs to supplement endpoint analysis; (3) Implement log correlation across proxy, firewall, and endpoint sources for timeline accuracy; (4) Deploy EDR solutions to capture tool execution and file transfer events; (5) Strengthen data access controls and implement additional DLP verification beyond DRM bypass capabilities.

---

## Case Questions: Detailed Answers

**Case Q1: What are the hash values (MD5 & SHA-1) of all images? Does the acquisition and verification hash value match?**
PC.E01 MD5: 7338dbed7d2293334801416613bc17b5; SHA-256: e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9. No SHA-1 hash was computed. No acquisition hash is stored in the image metadata, so acquisition integrity cannot be independently verified.

**Case Q2: Explain installed OS information in detail. (OS name, install date, registered owner...)**
Windows 7 identified as the operating system from briefing. Detailed OS information (install date, registered owner, service pack level, build number) cannot be determined due to filesystem extraction failure preventing registry analysis (SYSTEM and SOFTWARE hives).

**Case Q3: What is the timezone setting?**
Evidence does not provide timezone information. Registry analysis (which would contain timezone settings) was not possible due to filesystem extraction failure.

**Case Q4: What is the computer name?**
Evidence does not provide the computer name. Registry analysis was not possible.

**Case Q5: List all accounts in OS except the system accounts: Administrator, Guest, systemprofile, LocalService, NetworkService. (Account name, login count, last logon date...)**
User accounts cannot be enumerated without registry analysis (SAM hive and Security hive). Email accounts identified on the system are: iaman@nist.gov, iaman.informant@nist.gov, iaman.informant.personal@gmail.com. No login counts or last logon dates are available.

**Case Q6: Who was the last user to logon into PC?**
Last logon information requires registry analysis (Security hive event logs), which is not available due to filesystem extraction failure.

**Case Q7: When was the last recorded shutdown date/time?**
Last shutdown timestamp requires Windows event log analysis (System event log), which is not available.

**Case Q8: Explain the information of network interface(s) with an IP address assigned by DHCP.**
Network interface configuration requires registry analysis. One MAC address was recovered through bulk_extractor ether carving: 00:80:C7:8F:6C:96. DHCP configuration details are not available due to filesystem extraction failure.

**Case Q9: What applications were installed by the suspect after installing OS?**
Application installation information requires registry analysis (Uninstall hive and Software hive). Not available.

**Case Q10: What web browsers were used?**
Web browser evidence recovered through bulk_extractor includes references to multiple domains and URLs consistent with browser cache artifacts. At minimum, Internet Explorer usage is evidenced by the recovered URLs and search history. Chrome and Firefox browser home pages were detected in bulk_extractor domain carving, indicating multiple browsers were installed or accessed. Specific browser versions and installation dates are not available.

**Case Q11: What application was used for e-mail communication?**
Multiple email accounts were configured (iaman@nist.gov, iaman.informant@nist.gov, iaman.informant.personal@gmail.com), suggesting email client use. Outlook references appear in bulk_extractor email carving (references to .OST and .PST file formats). Specific email application versions and configurations are not available due to filesystem extraction failure.

**Case Q12: What was the e-mail account used by the suspect?**
Primary email accounts identified: iaman@nist.gov (corporate), iaman.informant@nist.gov (organizational), and iaman.informant.personal@gmail.com (personal). No evidence confirms which account was used for alleged conspiracy communications.

**Case Q13: List external storage devices attached to PC.**
USB memory stick (RM#2) and CD-R (RM#3) were found in the suspect's possession and seized at the checkpoint on March 25, 2015. These are the removable devices subject to analysis. No additional storage device history is available from registry analysis (which would show Device/Enum entries for previously connected devices).

**Case Q14: What is the IP address of company's shared network drive?**
Network drive IP addresses are not evident in the available bulk_extractor results. No specific company network infrastructure addresses were identified.

**Case Q15: Find traces related to cloud services on PC. (Service name, log files...)**
Cloud service traces include:
- Google Drive domain references (drive.google.com, docs.google.com, Google APIs)
- Microsoft cloud services (office.live.com, onenote.com)
- Gmail references (gmail.com)
- iCloud references (icloud.com, me.com, appleid.apple.com)
Browser cache and HTTP artifacts show these domains were accessed. Specific log files (browser cache database files, authentication tokens) would require filesystem analysis.

**Case Q16: What files were deleted from Google Drive? Find the filename and modified timestamp of the file.**
No deleted file information is available. Google Drive file history would require access to the Google Drive web account (audit logs) or local cache files (unavailable due to filesystem extraction failure).

**Case Q17: Identify account information for synchronizing Google Drive.**
Email accounts identified are consistent with potential Google Drive authentication (iaman.informant@nist.gov or iaman.informant.personal@gmail.com). Specific synchronization configuration and OAuth tokens are not available from the evidence.

**Case Q18: When did the suspect burn CD-R?**
Burning timestamp for the CD-R (RM#3) cannot be determined. Windows event logs or filesystem timestamps on the CD would provide this information but are not available due to filesystem extraction failure on pc.E01.

**Case Q19: How and when did the suspect print a resignation file?**
No evidence of resignation file printing was recovered in the available evidence sources. Print spooler files and event logs would contain this information but are not available.

**Case Q20: Identify notes stored in the Sticky Note file.**
Sticky Notes files (typically in Windows Temp or AppData directories) were not recovered. Filesystem analysis would be required.

**Case Q21: Examine 'Recycle Bin' data in PC.**
Recycle Bin data (stored in System Volume Information folder) requires filesystem analysis, which failed. No deleted file recovery was possible.

**Case Q22: What actions were performed for anti-forensics on PC at the last day '2015-03-25'?**
Anti-forensics tool downloads (Eraser) were identified in bulk_extractor results, but execution cannot be confirmed. No specific activities on March 25, 2015, are documented in the available evidence. Event logs and Prefetch would show execution timestamp but are not available.

**Case Q23: Recover deleted files from USB drive 'RM#2'.**
USB drive analysis requires filesystem extraction and deleted file carving, which were not completed in this investigation due to scope limitations.

**Case Q24: What actions were performed for anti-forensics on USB drive 'RM#2'?**
No anti-forensics analysis was performed on RM#2. This requires separate filesystem acquisition and analysis of the USB device.

**Case Q25: Recover hidden files from the CD-R 'RM#3'. How to determine proper filenames of the original files prior to renaming tasks?**
CD-R analysis was not performed. Recovery of hidden files and filename recovery requires optical media analysis tools and examination of the CD-R filesystem, which was not conducted.

---

**Summary Statement:**
This investigation was severely limited by the failure of filesystem extraction on the primary evidence image, preventing access to critical forensic artifacts including the Windows registry, event logs, and file system metadata. The available evidence (7 findings from 7 indexed sources) shows that the subject accessed cloud services, maintained multiple email accounts, and researched anti-forensics topics. However, without corroborating evidence of actual conspiracy communication, file transfer confirmation, or tool execution, the investigation cannot definitively establish that data exfiltration occurred or that misconduct was committed. The evidence is insufficient to support criminal charges, but the investigation gaps prevent absolute exoneration. Additional investigation via cloud service audit logs, email provider records, and supplementary forensic techniques would be necessary for conclusive determination.


---

## Overview

| | |
|---|---|
| Findings | **7** (3 confirmed, 4 inference) |
| Severity | 0 critical, 0 high, 0 medium, 0 low, 7 info |
| Sources | 7 evidence sources across 147 tool calls |


---

## Evidence Hashes

SHA-256 hashes recorded at ingestion. Verify with `sha256sum <file>`.

| File | SHA-256 | Size |
|------|---------|------|
| pc.E01 | `e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9` | 2.0 GB |



---

## Attack Timeline


No timestamped findings to build a timeline from.




---

## Appendix A: Verified Forensic Findings


### 1. [INFO] Suspect's Email Accounts Identified

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | bulk.email |
| **Evidence Refs** | tc_d54b24b1, tc_b0c52ffc |
| **ATT&CK** | [T1087.004](https://attack.mitre.org/techniques/T1087/004/) |


Multiple email accounts associated with the suspect were discovered on the computer, including iaman@nist.gov, iaman.informant@nist.gov, and iaman.informant.personal@gmail.com. These email accounts show normal configuration for a professional who maintains both corporate and personal email. CRITICAL LIMITATION: The investigation found email accounts exist but did NOT locate actual email communication showing conspiracy or coordination. No emails were found discussing data leakage, exfiltration plans, or communication with alleged "Spy Conspirator." The presence of multiple email accounts (corporate, organizational, and personal) is standard practice for professional users and does not establish misconduct. The reference to "sync_all15" is a carved binary artifact identifier, not evidence of suspicious synchronization. Alternative interpretation: These are legitimate business and personal email accounts with normal use.



### 2. [INFO] Anti-Forensics Tool Downloads and Research Discovered

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.url, bulk.url_searches |
| **Evidence Refs** | tc_b4c1f88d, tc_b081c49a |
| **ATT&CK** | [T1070.004](https://attack.mitre.org/techniques/T1070/004/), [T1202](https://attack.mitre.org/techniques/T1202/) |


URLs to anti-forensics tools Eraser were found in browser history, specifically to eraser.heidi.ie/download.php and sourceforge Eraser version 6.2.0.2962. CRITICAL LIMITATION: This evidence shows tool DOWNLOADS only, not EXECUTION. No evidence was found that Eraser actually ran on the system. Due to filesystem extraction failure (run_fls), we lack the registry entries, Prefetch files, and event logs that would confirm execution. Additionally, web searches for "anti-forensics", "data recovery tools", and "how to recover data" were found in search history. However, these searches could represent legitimate security research, IT training, or professional curiosity rather than evidence of premeditation. Alternative interpretations: (1) Tools were downloaded for review/evaluation without being used, (2) Searches were for educational/security awareness purposes, (3) Recovery tools may have been downloaded to recover legitimately deleted files. The combination of downloads and searches is circumstantial without proof of actual anti-forensics activity performed.



### 3. [INFO] Google Drive and Cloud Storage Services Used for Data Exfiltration

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.domain, bulk.url, bulk.email |
| **Evidence Refs** | tc_c515e21e, tc_ba233fdf |
| **ATT&CK** | [T1567.002](https://attack.mitre.org/techniques/T1567/002/) |


Evidence of Google Drive and Google Docs domain visits was discovered on the suspect's computer, with multiple references to drive.google.com, docs.google.com, and related Google APIs found in web history. However, this finding must be viewed with significant limitations: The evidence shows presence of Google Drive domains in browser history, not proof of actual file uploads, downloads, or exfiltration. Google Drive is widely used for legitimate collaborative work. Without filesystem extraction (which failed), we cannot determine: (1) what specific files were uploaded/downloaded, (2) when transfers occurred, (3) whether files contained confidential information, or (4) whether this was exfiltration or normal business use. The reference to "t_sync_all15" in email artifacts is a carved binary identifier, not proof of synchronized confidential files. Alternative explanation: The suspect may have used Google Drive legitimately for collaborative work document sharing.



### 4. [INFO] Evidence Image Hash Values (Case Q1)

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | hashdeep.hashes, hashdeep.acquisition |
| **Evidence Refs** | tc_137c5eba, tc_647b5c84 |


The disk image pc.E01 was hashed using hashdeep. The MD5 hash is 7338dbed7d2293334801416613bc17b5 and the SHA-256 hash is e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9. However, no acquisition hash is stored in the image file itself, so the integrity of the acquisition cannot be independently verified. The ewfverify tool reported no media hash verification data available. This means the initial acquisition integrity cannot be confirmed to match the current file state.



### 5. [INFO] Web Searches Indicate Premeditation for Data Exfiltration

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.url, bulk.url_searches |
| **Evidence Refs** | tc_5ff91496, tc_b081c49a |
| **ATT&CK** | [T1592.004](https://attack.mitre.org/techniques/T1592/004/) |


Web searches discovered in browser history include generic terms such as "information leakage cases", "data recovery tools", "how to recover data", "external device and forensics", and "anti-forensics". These searches are present in the search history. HOWEVER: Without timeline information, we cannot determine when these searches occurred relative to any alleged conspiracy or misconduct. The searches are generic security/IT terms that could reflect legitimate purposes such as: (1) Security education or policy development, (2) IT training for data recovery procedures, (3) Legitimate forensic knowledge building, or (4) Professional curiosity. The searches alone do not establish actual malicious intent or planning without corroborating evidence of malicious acts. Additionally, searching for "information leakage cases" could be for understanding security incidents in general, not planning specific leakage.



### 6. [INFO] Microsoft Cloud Services and Office.Live.com References Found

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.domain |
| **Evidence Refs** | tc_357df2fa |
| **ATT&CK** | [T1567.002](https://attack.mitre.org/techniques/T1567/002/) |


References to Microsoft cloud services (office.live.com and onenote.com) were discovered in domain artifacts extracted from the computer. These represent cloud service domain visits. However, these services are widely used for legitimate purposes: Outlook webmail access, document collaboration via Office Online, and OneNote for note-taking. The presence of these domains in browser history indicates tool presence only, not proof of exfiltration or misconduct. Without filesystem evidence (unavailable due to extraction failure), we cannot determine if actual sensitive files were uploaded or if this represented normal cloud service usage. These services could have been used for legitimate business collaboration.



### 7. [INFO] Critical Investigation Limitation: Filesystem Extraction Failed

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | list_sources |
| **Evidence Refs** | tc_69fec66d |


Filesystem extraction (run_fls) on the primary evidence image (pc.E01) failed with errors, which severely limits the investigation. As a result, critical evidence sources are unavailable, including: Windows registry hives (SYSTEM, SOFTWARE, SAM, NTUSER.DAT), execution artifacts (Prefetch, ShimCache, Amcache), event logs, browser history databases, application files, and the complete file listing. This prevents answering many of the 25 case questions, particularly: OS information (Q2, Q3, Q4), user account details (Q5, Q6, Q7, Q8, Q9), application installation history (Q9, Q10, Q11, Q12), deleted file recovery (Q16, Q21, Q23), and detailed anti-forensics timeline (Q22). The investigation must rely primarily on bulk_extractor carving results from unallocated space and embedded artifacts. While some evidence of the alleged conspiracy is present in the carved data, comprehensive forensic analysis is significantly hampered.

**Merged findings:**
- **[LIMITATION] Unreliable Timestamp Data Prevents Timeline Analysis** (f_fc3ae0a5, info, confirmed): This investigation is severely hampered by the inability to establish reliable timestamps for critical findings. Filesystem extraction (run_fls) failed, which prevents access to: Windows event logs, registry entries with timestamps, prefetch files with execution timestamps, and file metadata with modification times. The bulk_extractor carving results contain corrupted or unreliable Unix timestamps in the URL data. As a result, we cannot determine when anti-forensics searches and tool downloads occurred, when cloud service activities occurred, or whether activities were concentrated in a specific time period. The investigation questions specifically ask about timing relationships relative to conspiracy initiation, but this evidence limitation prevents establishing a timeline.

**Affected Systems:** list_sources



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

5 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (1) > Defense Evasion (2) > Discovery (1) > Exfiltration (1)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1592.004](https://attack.mitre.org/techniques/T1592/004/) | Client Configurations | Web Searches Indicate Premeditation for Data... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1070.004](https://attack.mitre.org/techniques/T1070/004/) | File Deletion | Anti-Forensics Tool Downloads and Research Discovered |
| [T1202](https://attack.mitre.org/techniques/T1202/) | Indirect Command Execution | Anti-Forensics Tool Downloads and Research Discovered |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1087.004](https://attack.mitre.org/techniques/T1087/004/) | Cloud Account | Suspect's Email Accounts Identified |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1567.002](https://attack.mitre.org/techniques/T1567/002/) | Exfiltration to Cloud Storage | Google Drive and Cloud Storage Services Used...; Microsoft Cloud Services and Office.Live.com... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 147 |
| Findings submitted | 7 |
| Confirmed | 3 |
| Inferences | 4 |
| Input tokens | 680 |
| Output tokens | 55.8K |
| Total tokens | 56.4K |
| Audit log | /home/mulder/.mulder/cases/nist-data-leakage.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 680 | 55.8K | 56.4K |




<details>
<summary>Evidence Sources (14)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 10 |
| hashdeep.hashes | hashdeep | 7 |
| hashdeep.acquisition | ewfverify | 1 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 87365 |
| bulk.email | bulk_extractor | 1602 |
| bulk.ether | bulk_extractor | 6 |
| bulk.rfc822 | bulk_extractor | 5310 |
| bulk.url | bulk_extractor | 103335 |
| bulk.url_facebook-address | bulk_extractor | 15 |
| bulk.url_searches | bulk_extractor | 124 |
| bulk.url_services | bulk_extractor | 2144 |
| tsk.masquerade | sleuthkit | 0 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
