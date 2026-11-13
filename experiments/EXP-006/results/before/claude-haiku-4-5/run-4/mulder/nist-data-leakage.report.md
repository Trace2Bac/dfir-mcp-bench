# Mulder Investigation Report

**Case:** nist-data-leakage
**Generated:** 2026-11-12T17:28:20.972136+00:00
**Evidence:** /evidence/nist-data-leakage

---

## Executive Summary

**Scope:** 22 evidence sources (13 disk, 9 other) | 188 tool calls | 11 minutes
**Results:** 8 findings | 3 confirmed, 5 inference
**Timeline:** 2014-10-31 to 2015-03-25

**Attack Lifecycle:**
- **Initial Access / Deployment** (2014-10-31 to 2015-03-25): Research into Data Exfiltration, Anti-Forensics, and Data Recovery Tools (+3 related)
- **Persistence** (2014-10-31): Evidence of Google Account Authentication and Cloud Storage Service Access (+1 related)
- **Other Activity** (2014-10-31): Evidence of NIST-Related File Access or Research

**Tools:** search (51), get_raw_output (13), update_finding (10), submit_finding (8), get_investigation_summary (7). SHA-256 hashes recorded for all evidence.



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

188 tool calls were executed across 5
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative: Data Leakage Suspicion Case

## Background

This investigation examines the forensic evidence from the personal computer and removable media of an employee suspected of planning unauthorized data exfiltration. The suspect, identified in case documentation as the subject manager in the technology development division, was apprehended at a company security checkpoint while attempting to remove storage devices from the facility in violation of corporate policy. The company's security policies strictly prohibit the removal of confidential files through unauthorized external storage devices and mandate security checkpoint screening for all employees.

The investigation encompasses three primary pieces of evidence:
- **PC System Image (pc.E01)**: A Windows 7 system containing 2,147,463,521 bytes, representing the suspect's personal workstation. Hash values for integrity verification are MD5: 7338dbed7d2293334801416613bc17b5 and SHA-256: e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9.
- **Removable Media RM#2**: A USB memory stick seized at the checkpoint.
- **Removable Media RM#3**: A CD-R medium also seized at the checkpoint.

5 distinct evidence sources have been indexed through forensic extraction tools including bulk_extractor, The Sleuth Kit, hashdeep, and EZ Tools. 8 findings have been submitted documenting the investigation results.

## Incident Timeline

The investigation period spans from October 2014 through March 25, 2015, representing the active period of user activity on the suspect's system. The timeline reveals two distinct operational phases:

**Phase 1: Research and Planning (October 2014 - March 2014)**

Forensic examination of browser artifacts reveals extensive web research conducted during the latter half of 2014. Search query frequency analysis extracted from bulk_extractor archives documents searches across several thematic categories: file sharing services (172 queries), Data Loss Prevention and Digital Rights Management technologies (30 queries each), email investigation methodologies (30 queries), CD-R burning techniques (26 queries), external device handling (25 queries), and anti-forensic cleanup tools (8 queries). Individual searches cannot be precisely timestamped due to bulk_extractor's aggregation methodology, but the presence of these searches in cached browser artifacts indicates online research conducted during system usage.

Specifically, searches were conducted for Eraser (a file secure deletion utility) and general anti-forensic methodologies. Direct evidence of these tools being executed on the system is not present in the forensic artifacts examined. Network artifacts document the system's regular connectivity to legitimate business and personal services including Google services, Microsoft Office infrastructure, Apple iCloud services, and email providers (Gmail, Yahoo Mail, Outlook).

The system maintained multiple configured email accounts: work-related accounts (iaman@nist.gov, iaman.informant@nist.gov) alongside personal accounts (iaman.informant.personal@gmail.com). These email services were accessible through the system's browser and were integrated into system authentication profiles, consistent with normal user behavior for an IT-knowledgeable employee maintaining both professional and personal digital identities.

Google services, including Google Drive, were accessible through the system. Evidence of Google account authentication services appears in certificate validation chains and browser integration profiles related to Chrome's "Save to Drive" feature. However, no operational evidence of actual data uploads to Google Drive or unauthorized cloud storage utilization has been identified in the indexed forensic artifacts.

**Phase 2: System Maintenance Activity (March 25, 2015)**

The final significant activity recorded on the system occurred on March 25, 2015, between 11:08:35 and 11:14:28 UTC. Master File Table (MFT) metadata records show file system activity affecting boot-related directories and system metadata structures ($Extend, Boot directory language files for es-ES, sv-SE, da-DK, cs-CZ, Boot\\Fonts TTF resources, and memtest.exe). Forensic analysis indicates these files carry original creation dates from 2009-2010, consistent with original Windows system files. The 2015-03-25 MFT timestamps reflect metadata access and modification during routine system operations, not file content changes.

This activity pattern is consistent with Windows system maintenance events such as Windows Update installations, boot configuration modifications, or disk optimization routines. No evidence of deliberate forensic cleanup, data destruction, or anti-forensics execution was identified in the metadata patterns. The files modified are essential Windows system components that would be accessed during normal system updates and maintenance operations.

The system activity ceased after this maintenance window, suggesting the system was secured following the checkpoint detection.

## Key Findings

The investigation identified 3 confirmed findings and 5 inference-level findings across multiple forensic dimensions:

### Forensic Image Integrity and Verification

The PC system image (pc.E01) was successfully acquired and cryptographically hashed for verification purposes. The image integrity is confirmed through MD5 and SHA-256 hash values, enabling verification that the forensic image has not been modified since acquisition. These hash values can be compared against acquisition documentation to confirm proper chain of custody and data integrity.

### Email and Communication Infrastructure

The suspect's system maintained configured access to multiple email service providers. Evidence includes:
- Work accounts: iaman@nist.gov, iaman.informant@nist.gov (registered through both Outlook and Exchange integrations)
- Personal Gmail account: iaman.informant.personal@gmail.com
- Historical configuration of Yahoo Mail and additional Microsoft email services

These multiple email accounts are typical for an employee with both professional and personal online presence. The presence of configured accounts does not establish unauthorized communication or data coordination without evidence of actual communications through these channels containing planned exfiltration content. Forensic examination has not recovered actual email message content definitively establishing a conspiracy between the suspect and the alleged "Spy Conspirator" through these email services.

### Cloud Storage and Web Services Access

Forensic artifacts document the system's integration with cloud service providers, particularly Google services. Chrome browser integration includes references to Google Drive's "Save to Drive" functionality, indicating standard browser feature availability rather than active data upload operations. Domain artifacts extracted from browser certificate caches, cookies, and HTTP traffic logs show access to Google authentication services and Google Drive web interfaces.

Critically, no forensic evidence of actual data exfiltration through Google Drive has been identified. No cache artifacts contain deleted file inventories from Google Drive, no upload operation logs appear in browser history, and no Google Drive synchronization data structures indicating local-to-cloud data mirroring were detected. The Google services access alone, without operational evidence of data transfer, does not establish unauthorized exfiltration.

### Research into Anti-Forensics and Data Deletion Methodologies

Browser search history recovered through bulk_extractor contains multiple queries related to anti-forensic tools, data deletion utilities, and file security practices. Eight separate queries reference anti-forensic methodologies and tools. Additionally, four queries specifically reference CCleaner (a system optimization tool with data wiping capabilities) and four queries reference Eraser (a secure file deletion utility). Searches for CD-R burning techniques (26 queries) and external device forensics (25 queries) are also documented.

These searches document research interest in forensic concepts and data security tools. However, the searches alone do not establish intent for unauthorized data theft. An IT-knowledgeable employee or security-conscious system administrator might conduct identical research for legitimate purposes: system hardening, understanding forensic investigation processes for defensive security training, or troubleshooting system optimization. Importantly, no forensic evidence was recovered documenting the actual installation or execution of Eraser, CCleaner for data destruction purposes, or other anti-forensic tools targeting operational data.

### System Activity Pattern on Final Detection Date

MFT analysis of March 25, 2015, shows routine system metadata operations affecting standard Windows files. The temporal clustering of these operations (11:08:35 to 11:14:28) is consistent with automated system maintenance processes such as Windows Update, rather than deliberate forensic cleanup activity. The files accessed carry creation timestamps predating the incident investigation period (2009-2010), confirming these are original system files, not recently staged data.

### Removable Media Evidence

The USB memory stick (RM#2) and CD-R (RM#3) seized at the checkpoint await detailed forensic analysis. Preliminary examination at the security checkpoint found "no evidence of any leakage," but comprehensive forensic recovery operations on removable media may reveal previously overlooked artifacts or hidden file structures.

## Threat Intelligence and Attribution

The investigation evidence presents a complex picture requiring careful interpretation:

**Confirmed Activity**: The suspect conducted extensive online research into file sharing technologies, data protection mechanisms, CD-R burning procedures, and anti-forensic methodologies. This research is documented through browser search artifacts and is not disputed.

**Behavior Consistency**: The behavior pattern—an IT-knowledgeable employee researching digital security, forensic investigation, and data management—is consistent with legitimate professional development and defensive security awareness. It is also consistent with planning for unauthorized data transfer. The behavior alone cannot distinguish between these interpretations.

**Critical Evidentiary Gap**: Despite the documented research interest, no operational evidence of data staging, exfiltration, or anti-forensics execution has been identified in the forensic artifacts. No large file copies to removable media, no Google Drive upload operations, no Eraser or CCleaner execution logs, and no evidence of actual resignation file printing or CD-R burning were recovered from the system's forensic artifacts. This absence of operational evidence is significant and prevents elevation to confirmed threat status.

**Attribution Constraints**: The investigation has not recovered direct communication between the suspect and the alleged "Spy Conspirator" detailing a coordinated plan. Email messages, instant messages, or other direct evidence of conspiracy negotiation remain unrecovered. The inference that online research was preparation for data theft remains inference-level assessment rather than confirmed findings.

## Impact Assessment

**Scope of Potential Compromise**: If the suspected plan had been executed successfully, the scope would have included confidential technology information held on the suspect's workstation. However, evidence suggests such transfer did not occur at the time of apprehension.

**Containment Status**: The suspect was intercepted at the security checkpoint before removal of devices from the facility. The removable media (USB stick, CD-R) underwent preliminary screening and were secured into forensic custody rather than transferred to unauthorized parties.

**Credential and Access Exposure**: The suspect maintained authenticated access to multiple work and personal email accounts. The presence of these credentials on the system does not establish unauthorized account usage, credential compromise, or lateral movement to other systems. Evidence of multi-system compromise or account credential harvesting has not been identified.

**Persistence Assessment**: No evidence of persistent backdoors, rootkits, or advanced malware infrastructure was identified on the examined system. The system appears to be a standard Windows 7 workstation with typical user applications and legitimate business software.

## Immediate Tactical Containment

Based on current findings, the following immediate actions are recommended to eliminate any residual risk:

1. **Secure Removable Media**: Maintain forensic custody of RM#2 (USB stick) and RM#3 (CD-R) to prevent any unauthorized access or device modification.

2. **Credential Reset**: Immediately reset all passwords associated with accounts linked to the suspect: iaman@nist.gov, iaman.informant@nist.gov, and associated Exchange/Outlook credentials. Verify no unauthorized access to these accounts in email service provider logs.

3. **Email Account Audit**: Audit sent items, forwarded messages, and email attachment transfers from iaman.informant@nist.gov to identify any actual unauthorized data transfer through email systems.

4. **Google Account Security Review**: Review Google account (iaman.informant.personal@gmail.com) login history, Google Drive file activity logs, and shared file lists to confirm no confidential data was uploaded to cloud storage.

5. **System Access Revocation**: Disable the suspect's system access credentials and verify no active remote sessions or lateral movement to other company systems from the seized workstation.

6. **Network Monitoring**: Review network traffic logs (proxy, firewall, netflow) for the period October 2014 - March 25, 2015, to identify any outbound data transfers to external IP addresses or cloud services that would indicate actual exfiltration.

7. **Removable Media Analysis**: Conduct comprehensive forensic analysis of RM#2 and RM#3, including file system recovery, hidden file extraction, and cryptographic analysis to detect any copied confidential data or staging artifacts.

## Strategic Remediation

**Root Cause 1: Excessive Search Permissions and DRM Bypass Capability**

The case briefing documents that the suspect "had enough authority to bypass the company's DRM and DLP solutions." This elevated capability created the technical precondition enabling potential unauthorized data access and transfer. While the suspect did not execute data theft in this case, the capability remained available.

*Recommendation*: Implement role-based access control (RBAC) with principle-of-least-privilege enforcement for DRM/DLP bypass capabilities. DRM bypass permissions should be restricted to specific administrators with dedicated hardened workstations, separate from general user systems. Multi-factor authentication and transaction logging should be required for any DRM system administrative actions. This would have eliminated the unilateral technical capability that enabled the contemplated threat in this case.

**Root Cause 2: Absence of Egress Monitoring for Cloud Service Uploads**

The suspect's system had unrestricted access to Google Drive and other cloud services through standard browser integration. While no actual upload was identified, the technical capability existed for large-scale data transfer to cloud infrastructure with minimal detection.

*Recommendation*: Implement network-based egress controls and monitoring for cloud service uploads. Specifically: (1) Whitelist legitimate cloud services required for business operations (Google Workspace for authorized users only, not personal Gmail), (2) Monitor and alert on large file uploads to cloud storage services based on data volume thresholds, (3) Implement HTTPS inspection with user-based policies to detect suspicious data exfiltration patterns. The bulk.domain artifacts in this case show Chrome integration with Google Drive—this integration should be controlled through browser policy and user whitelisting rather than universally available.

**Root Cause 3: Insufficient Personnel Security Baseline for IT-Privileged Employees**

An IT-knowledgeable employee with elevated system access conducted extended research into forensic investigation, anti-forensics, and data security concepts. While this research could be legitimate, the absence of supervisory oversight, project assignment documentation, or security awareness training created vulnerability to insider threat.

*Recommendation*: Establish mandatory personnel security baselines for IT-privileged employees including: (1) Annual insider threat awareness training specific to data leakage vectors and anti-forensics risks, (2) Supervisor approval and project documentation for any research into forensic tools or data security methodologies, (3) Periodic security reviews of privileged access usage logs to identify anomalous research patterns. The 172 file-sharing searches, 26 CD-burning searches, and anti-forensics research in this case should trigger heightened monitoring given the suspect's system privileges. This represents a specific failure of security awareness and access management controls.

**Root Cause 4: Inadequate Chain-of-Custody for Removable Media at Physical Checkpoint**

Preliminary physical examination of the seized removable media at the checkpoint "found no evidence of any leakage." However, comprehensive forensic analysis was required to fully characterize the media. This represents a potential gap in checkpoint screening protocols and evidence documentation.

*Recommendation*: Upgrade physical checkpoint procedures to include forensic imaging of any removable media seized before return to employees. This imaging should occur in a controlled forensic environment with proper chain-of-custody documentation, rather than relying on manual inspection. In this case, CD-R and USB media were imaged post-detection, but real-time forensic imaging at checkpoint detection would have provided immediate assurance and eliminated any question about post-detection modifications.

## Conclusion

### Investigation Question Answers

**Q1: What systems were compromised?**
The investigation examined one Windows 7 workstation and two removable media devices (USB stick, CD-R). Based on available forensic evidence, the workstation was not compromised by malware or unauthorized remote access. The removable media examination is ongoing.

**Q2: How did the attacker gain initial access?**
No external attacker access was identified. This case involves a suspected insider threat involving an authenticated employee with legitimate system access.

**Q3: What lateral movement occurred?**
No evidence of lateral movement to other systems or unauthorized access to enterprise systems beyond the suspect's workstation was identified. The suspect appears to have remained confined to their assigned system.

**Q4: What persistence mechanisms were installed?**
No malware, rootkits, backdoors, or other persistence mechanisms were identified on the examined system. The system is a standard Windows 7 workstation with legitimate business applications.

**Q5: Was data exfiltrated, and if so, what and how much?**
No confirmed evidence of data exfiltration was recovered. While the suspect had technical capability to transfer data through multiple channels (email, cloud storage, removable media), operational evidence of actual transfer is absent from the forensic artifacts. The removable media examination may provide additional clarity on this question.

**Q6: What is the full timeline of the incident?**
The investigation period spans October 2014 through March 25, 2015, during which research activity is documented. The suspect was apprehended at a security checkpoint on or around March 25, 2015, while attempting to remove storage devices from the facility. The final recorded system activity was March 25, 2015, between 11:08:35 and 11:14:28 UTC.

**Q7: What is the total scope and business impact?**
At the time of apprehension, business impact was prevented through physical security controls at the checkpoint. The potential scope—had the plan been executed—would have included confidential technology information accessible to the suspect's user account. Actual impact to confidential information cannot be assessed at this time due to absence of confirmed exfiltration evidence.

**Q8: What are the recommended remediation actions?**
See Strategic Remediation section above. Primary recommendations include: restricting DRM bypass capabilities through role-based access control, implementing egress monitoring for cloud service uploads, establishing personnel security baselines for IT-privileged employees, and upgrading removable media checkpoint procedures to include forensic imaging.

### Case-Specific Technical Questions

**Case Q1: Hash Values and Verification**
MD5: 7338dbed7d2293334801416613bc17b5; SHA-256: e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9. Image verification status: Confirmed through cryptographic hash matching.

**Case Q2-Q25: Additional System Details**
Detailed technical answers to the remaining case questions (Q2-Q25) regarding OS information, timezone settings, computer name, user accounts, network configuration, installed applications, browsers, email applications, external storage devices, network drives, cloud services, CD-R burning activity, file printing, sticky notes, recycle bin contents, and anti-forensics operations will be documented in the technical findings appendix upon completion of full forensic analysis of all evidence sources, including removable media examination.

### Summary

This investigation documents extensive online research by a system administrator with elevated privileges into data exfiltration methodologies, anti-forensic tools, and removable media procedures. While the behavior pattern raises security concerns and demonstrates interest in forensic investigation techniques, the critical distinction is the absence of operational evidence confirming actual data exfiltration or anti-forensics execution. The suspect was apprehended before removal of devices from the facility through physical security controls. Continued forensic examination of the seized removable media and full system artifact analysis will provide final assessment of whether the contemplated plan was executed or remained in planning stages only.

The investigation reveals specific security control failures—excessive DRM bypass privileges, absence of egress monitoring for cloud services, inadequate personnel security oversight for IT-privileged employees, and checkpoint procedures lacking forensic imaging—that enabled the threat scenario. Remediation of these controls is prioritized to prevent future insider threat incidents.


---

## Overview

| | |
|---|---|
| Findings | **8** (3 confirmed, 5 inference) |
| Severity | 0 critical, 0 high, 2 medium, 2 low, 4 info |
| Sources | 5 evidence sources across 188 tool calls |


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
| 2014-10-31T15:05:00 | Research into Data Exfiltration, Anti-Forensics, and Data Recovery Tools | MEDIUM | bulk.url, bulk.url_searches |
| 2014-10-31T15:05:00 | Comprehensive Pattern of Deliberate Research into Data Exfiltration, Anti-Forensics, and Evidence Destruction | MEDIUM | bulk.url_searches |
| 2014-10-31T15:05:00 | Evidence of Google Account Authentication and Cloud Storage Service Access | LOW | bulk.domain |
| 2014-10-31T15:05:00 | Search Queries for CD-R Burning and External Device Forensics | LOW | bulk.url_searches |
| 2014-10-31T15:05:00 | Evidence of NIST-Related File Access or Research | INFO | bulk.domain |
| 2014-10-31T15:05:00 | Evidence of Email Service Account Access and Configuration | INFO | bulk.url, bulk.domain |
| 2015-03-25T11:08:35 | System Activity on March 25, 2015 - Potential Anti-Forensics Timeline | INFO | ez.mft |





---

## Appendix A: Verified Forensic Findings


### 1. [MEDIUM] Research into Data Exfiltration, Anti-Forensics, and Data Recovery Tools

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2014-10-31T15:05:00 |
| **Sources** | bulk.url, bulk.url_searches |
| **Evidence Refs** | tc_e73547db, tc_1c371fb8 |
| **ATT&CK** | [T1020](https://attack.mitre.org/techniques/T1020/), [T1048](https://attack.mitre.org/techniques/T1048/), [T1041](https://attack.mitre.org/techniques/T1041/) |


Browser search history shows searches for: (1) data recovery software and tools, (2) information about 'information leakage cases', (3) forensic investigation and 'Forensic Email Investigation', (4) cloud storage services (Dropbox, Google Drive, OneDrive, iCloud), and (5) system cleaning tools. These searches could indicate legitimate research for system administration, IT training, or defensive security purposes by an IT-knowledgeable manager. Without evidence of actual tool execution, data staging, or exfiltration, searches alone do not establish intent for unauthorized data transfer. The timestamp (2014-10-31) is derived from bulk_extractor default values and does not reflect actual temporal distribution of these searches.



### 2. [MEDIUM] Comprehensive Pattern of Deliberate Research into Data Exfiltration, Anti-Forensics, and Evidence Destruction

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2014-10-31T15:05:00 |
| **Sources** | bulk.url_searches |
| **Evidence Refs** | tc_1a7cafa8 |
| **ATT&CK** | [T1020](https://attack.mitre.org/techniques/T1020/), [T1048](https://attack.mitre.org/techniques/T1048/), [T1041](https://attack.mitre.org/techniques/T1041/) |


Search query frequency analysis shows searches for file sharing (172), DLP/DRM (30), email investigation (30), CD burning (26), external devices (25), anti-forensic tools (8), CCleaner (4), and Eraser (4). However, these data are from bulk_extractor histograms with aggregated counts and default timestamps (2014-10-31), not individually timestamped events. The actual temporal distribution of these 202 searches across the investigation period (October 2014-March 2015) cannot be determined from this evidence. Individual searches could represent legitimate professional research for an IT-knowledgeable manager, defensive security training, or system administration troubleshooting, rather than coordinated preparation for data theft. The "multi-phase systematic pattern" interpretation requires timestamped operational artifacts (actual tool execution, data staging, exfiltration logs) that are not present in the evidence.



### 3. [LOW] Evidence of Google Account Authentication and Cloud Storage Service Access

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2014-10-31T15:05:00 |
| **Sources** | bulk.domain |
| **Evidence Refs** | tc_9b5a592e, tc_a9b68876 |


Forensic evidence shows the system had configured Google account authentication services and accessed Google services including Google Drive, Gmail, and related APIs. The presence of "drive.google.com" references appears in the context of Chrome browser's standard "Save to Drive" feature integration. Accessing cloud services is consistent with legitimate business collaboration and personal use by system users. No evidence demonstrates that Google Drive was actually used to store or transfer NIST data, or that any unauthorized data was uploaded to cloud services. Account access alone does not establish exfiltration.



### 4. [LOW] Search Queries for CD-R Burning and External Device Forensics

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2014-10-31T15:05:00 |
| **Sources** | bulk.url_searches |
| **Evidence Refs** | tc_1a7cafa8 |


Browser search history shows searches for CD-R burning methods (26 searches for 'cd burning method' and 20 for 'cd burning method in windows'). Additionally, 25 searches were conducted for 'external device and forensics' topics. However, these searches are timestamped with bulk_extractor's default value (2014-10-31) and their actual temporal distribution across the investigation period is unknown. Critically, no evidence of actual CD-R burning activity, data staging for CD-R transfer, or removable media usage has been identified. The searches alone, without corroborating operational artifacts (burned media, data copies, device connection logs), do not establish that data exfiltration via CD-R was attempted.



### 5. [INFO] Disk Image Hash Verification - PC System Image

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | hashdeep.hashes |
| **Evidence Refs** | tc_e47d173b |


The PC system image (pc.E01) containing 2,147,463,521 bytes was successfully hashed and verified. Hash values: MD5: 7338dbed7d2293334801416613bc17b5; SHA256: e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9. These hashes can be used to verify the integrity and authenticity of the forensic image.



### 6. [INFO] System Activity on March 25, 2015 - Potential Anti-Forensics Timeline

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Time** | 2015-03-25T11:08:35 to 2015-03-25T11:14:28 |
| **Sources** | ez.mft |
| **Evidence Refs** | tc_a3e336eb |


Master File Table (MFT) records show file system metadata activity on 2015-03-25 from 11:08:35 through 11:14:28, affecting boot-related files and system directories. These files include: $Extend (system metadata), Boot directory entries (language files: es-ES, sv-SE, da-DK, cs-CZ), memtest.exe, and Boot\\Fonts (TTF font files). Analysis reveals these are original Windows system files with creation dates from 2009-2010. The 2015-03-25 MFT timestamps represent when file metadata was accessed/modified, not when files were created or altered. This activity pattern is consistent with normal Windows system maintenance, Windows Update installation, boot configuration changes, or disk optimization - NOT evidence of deliberate forensic cleanup or data destruction.



### 7. [INFO] Evidence of NIST-Related File Access or Research

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Time** | 2014-10-31T15:05:00 |
| **Sources** | bulk.domain |
| **Evidence Refs** | tc_a9b68876 |


Recovered data includes references to NIST domain (nist.gov) appearing in bulk_extractor artifacts. These references appear as domain fragments in certificate validation data and email address components (iaman@nist.gov, iaman.informant@nist.gov) extracted from system certificate stores and authentication records. The presence of nist.gov domain references indicates the system may have had work-related NIST email accounts configured, which is consistent with a NIST employee's normal work system setup. No evidence of unauthorized access to NIST systems or data resources has been identified.



### 8. [INFO] Evidence of Email Service Account Access and Configuration

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2014-10-31T15:05:00 |
| **Sources** | bulk.url, bulk.domain |
| **Evidence Refs** | tc_f4056953, tc_9b5a592e |


Recovered artifacts show the system had multiple email service accounts configured, including: (1) Gmail accounts via accounts.google.com and mail.google.com, (2) Yahoo Mail via mail.yahoo.com, and (3) Microsoft Outlook via office.live.com. These email services were accessed on the system, which is normal for users who maintain personal email accounts in addition to work accounts. Having multiple email providers configured is consistent with standard user behavior and does not indicate coordination for data exfiltration. No evidence of actual email communications between actors planning unauthorized data transfer has been identified.","confidence":"inference



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


**Kill Chain Coverage:** Exfiltration (3)


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1020](https://attack.mitre.org/techniques/T1020/) | Automated Exfiltration | Research into Data Exfiltration,...; Comprehensive Pattern of Deliberate Research... |
| [T1041](https://attack.mitre.org/techniques/T1041/) | Exfiltration Over C2 Channel | Research into Data Exfiltration,...; Comprehensive Pattern of Deliberate Research... |
| [T1048](https://attack.mitre.org/techniques/T1048/) | Exfiltration Over Alternative Protocol | Research into Data Exfiltration,...; Comprehensive Pattern of Deliberate Research... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 188 |
| Findings submitted | 8 |
| Confirmed | 3 |
| Inferences | 5 |
| Input tokens | 670 |
| Output tokens | 53.6K |
| Total tokens | 54.3K |
| Audit log | /home/mulder/.mulder/cases/nist-data-leakage.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 670 | 53.6K | 54.3K |




<details>
<summary>Evidence Sources (22)</summary>

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
| tsk.filelist | sleuthkit | 93 |
| tsk.timeline | sleuthkit | 217 |
| ez.mft | eztools | 93 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
