# Mulder Investigation Report

**Case:** nist-data-leakage
**Generated:** 2026-11-12T16:52:49.780948+00:00
**Evidence:** /evidence/nist-data-leakage

---

## Executive Summary

**Scope:** 17 evidence sources (14 disk, 3 other) | 152 tool calls | 11 minutes
**Results:** 7 findings | 1 confirmed, 6 inference
**Timeline:** 2014-10-31

**Attack Lifecycle:**
- **Initial Access / Deployment** (2014-10-31): Anti-Forensics Tools Downloaded - CCleaner and Eraser (+4 related)
- **Persistence** (2014-10-31): NIST Employee Email Credentials Associated with Personal Gmail Account

**Tools:** search (45), update_finding (14), get_raw_output (11), get_investigation_summary (9), submit_finding (8). SHA-256 hashes recorded for all evidence.



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

152 tool calls were executed across 7
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

## Background

This investigation concerns an alleged data leakage scheme at a major international technology development organization (referred to here as "the Organization"). The case originated when an employee, identified as "Iaman Informant" (username: iaman), was detected at a security checkpoint attempting to remove storage devices containing potentially sensitive information. The employee was apprehended with a USB memory stick and a CD-R in violation of company policy prohibiting the removal of external storage devices. The investigation has been assigned to examine the suspect's personal computer, removable media device RM#2 (USB stick), and removable media device RM#3 (CD-R) to determine the scope of any unauthorized data access or exfiltration activity.

The Organization enforces strict data handling policies: classified files are restricted to authorized external storage and secured network drives; access to classified materials is time-restricted (10:00-16:00 hours with appropriate permissions); non-authorized devices may not be brought into facilities; and all storage devices are prohibited at security checkpoints. The suspect, as a technology development manager, possessed elevated system privileges capable of bypassing DRM and DLP controls, demonstrating technical sophistication and awareness of anti-forensics techniques.

Evidence examined in this investigation consists of three forensic images: a Windows 7 personal computer disk image (pc.E01 and segments), a USB memory stick (RM#2.E01), and a CD-R (RM#3.E01). The forensic acquisition and analysis was conducted using industry-standard tools including EnCase acquisition, SleuthKit file system analysis, Hashdeep integrity verification, and Bulk Extractor pattern recognition. A total of 17 distinct evidence sources have been indexed, documenting system artifacts, user activity, network artifacts, and metadata.

## Incident Timeline

The timeline of suspicious activity on the suspect's Windows 7 computer spans from at least October 2014, with evidence clustering around October 31, 2014—the date of the checkpoint incident. Based on indexed timestamps and artifact evidence, the following sequence of events can be reconstructed:

**Establishment of Alternative Communication Channels (October 2014)**
Evidence indicates the suspect established a linkage between corporate email (iaman.informant@nist.gov) and a personal Gmail account (iaman.informant.personal@gmail.com). Bulk extractor analysis identified multiple references to both accounts within browser history and system artifacts, indicating intentional association of these email addresses. This account linkage represents the foundational infrastructure for potential data exfiltration via a personal cloud storage service.

**Information Gathering on Data Theft and Forensic Countermeasures (October 2014)**
Search history retrieved from the system shows deliberate research on security-related topics: "data leakage," "DLP systems," "DRM systems," "forensic investigation," and related information security concepts. While such searches are consistent with legitimate IT security research or compliance training, the timing and contextual clustering with other suspicious indicators warrant inclusion in this timeline. The searches indicate knowledge of forensic investigation methodology and anti-forensics considerations.

**Download of Dual-Use System Utilities (October 2014)**
The suspect downloaded CCleaner and Eraser, utilities commonly marketed for system performance optimization and temporary file cleanup but also capable of evidence destruction. These tools appear in browser history as downloaded items. However, execution logs and forensic artifacts do not currently show evidence that these tools were actually run or that they performed evidence-destruction activities. The download alone represents acquisition of potentially useful anti-forensics capabilities without confirmed operational use.

**Pattern Matches for Sensitive Data (October 2014)**
Bulk extractor analysis identified multiple instances of credit card number patterns and Social Security number patterns within the disk image. Detailed contextual analysis reveals significant limitations: approximately 60-70% of detected SSNs are placeholder/test values (000-000-000, 333-333-333, 200-140-140) appearing in HTML/XML/URL contexts consistent with test data or development environments. Credit card number patterns appeared predominantly in URL parameters (e.g., Google AdSense metrics strings) and binary encoded contexts, rather than in contexts consistent with active financial records. Only limited instances of realistic-format financial data were detected. Given NIST's role as a government research institution, legitimate possession of such data for payroll, contractor processing, compliance testing, and research purposes is expected.

**Active Checkpoint Incident (October 31, 2014, approximately 15:00-16:00 hours)**
The suspect was apprehended at the Organization's security checkpoint in possession of a USB memory stick (RM#2) and a CD-R (RM#3). Initial security checkpoint screening detected no evidence of classified material on the removable media at that time. Both devices were transferred to the forensic laboratory for detailed analysis.

## Key Findings

### Finding 1: Disk Image Integrity Verified
The primary evidence disk image (pc.E01) has been cryptographically verified using MD5 and SHA-256 hashing algorithms. MD5: 7338dbed7d2293334801416613bc17b5; SHA-256: e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9. The image totals 2,147,463,521 bytes (approximately 2 GB). This integrity verification establishes a reliable forensic foundation for all downstream analysis.

### Finding 2: Corporate Email Associated with Personal Gmail Account
NIST corporate email address (iaman.informant@nist.gov) has been linked to personal Gmail account (iaman.informant.personal@gmail.com) in recovered browser history and system artifacts. This association is confirmed through multiple independent data sources including URL history, email cache, and domain references. However, critical evidentiary gaps exist:

- No evidence of actual authentication or login to the personal Gmail account was recovered
- No evidence of file uploads to Google Drive was identified
- No evidence of drive synchronization activity or access logs was detected
- Browser history shows presence of Gmail/Google Drive service URLs, but this indicates URL visitation only, not account access or data transmission
- Legitimate alternative explanations exist: personal device backup, collaborative file sharing with approved partners, cloud storage service evaluation, or routine personal email checking on a work device

This finding establishes account linkage but does NOT establish unauthorized data transmission or compromise.

### Finding 3: Anti-Forensics Tools Downloaded
CCleaner and Eraser utilities were downloaded to the suspect's computer. Both tools are dual-use utilities with legitimate (system performance optimization, temporary file cleanup) and potentially malicious (evidence destruction) applications. However:

- No execution evidence for these tools was identified in system logs or forensic artifacts
- No evidence of targeted file deletion or forensic wiping was detected
- Downloads appear in browser history but actual usage remains unconfirmed
- Contextual analysis cannot distinguish between routine system maintenance and intentional anti-forensics preparation

### Finding 4: Searches on Data Leakage and Forensics Topics
Search history reveals queries related to "data leakage," "DLP systems," "DRM systems," and "forensic investigation." These searches are equally consistent with:

- Legitimate IT security professional research by someone in a technology management role
- Compliance training and security awareness activities
- Academic interest in information security and threat analysis
- Incident response preparation and forensic investigation training
- Evaluation of security tools for organizational deployment

The temporal proximity to other suspicious indicators increases concern, but searches alone cannot distinguish between defensive security research and offensive planning without additional corroborating evidence.

### Finding 5: Sensitive Personal Information Pattern Matches
Bulk extractor pattern matching identified credit card numbers and Social Security numbers within the disk image. Detailed contextual analysis reveals:

- Approximately 60-70% of detected SSNs are PLACEHOLDER/TEST values not consistent with real sensitive data
- Credit card patterns appear predominantly in URL parameters and binary encoded contexts, not active financial records
- These patterns are consistent with development/testing environments, system caches, legitimate HR database contents, or research data
- NIST legitimately maintains diverse datasets including employee/contractor financial records, payroll systems, and research data

This finding represents pattern detection only, not confirmation of active financial database compromise or data staging for exfiltration.

### Finding 6: Coordinated Data Exfiltration Attempt via Google Drive
Evidence suggests POTENTIAL data exfiltration planning, but critical evidentiary gaps prevent high-confidence determination:

- Account linkage between corporate and personal email is confirmed
- Personal Gmail and Google Drive service references appear in browser history
- Searches on data leakage and forensics topics are present
- Anti-forensics tools were downloaded

However, conclusive evidence of actual exfiltration is absent:
- No network traffic analysis confirming data uploads to Google Drive
- No evidence of file staging in preparation for exfiltration
- No Google Drive activity logs showing actual synchronization or uploads
- No email communications planning or coordinating exfiltration
- All suspicious timestamps cluster at October 31, 2014, 15:05:00, consistent with forensic extraction artifacts rather than actual event chronology

This represents circumstantial indicators that COULD support an exfiltration hypothesis, but WITHOUT corroborating evidence of actual data transmission, the evidentiary foundation remains insufficient for high-confidence determination.

## Threat Intelligence and Attribution

The available evidence is consistent with the general pattern of insider threat activity involving personal cloud storage services as exfiltration channels. However, specific attribution to a particular threat actor or organized campaign is not supported by the evidence. The activity represents what would be expected from a technically-aware insider attempting to circumvent organizational data protection measures, rather than evidence of sophisticated external threat actor involvement.

Key evidence limitations in making attribution determinations:

1. **Evidentiary Gaps**: The absence of confirmed data transmission events, Gmail login sessions, or Google Drive uploads prevents confirmation that the planning stage escalated to actual exfiltration activity.

2. **Dual-Use Artifacts**: Tool downloads, search history, and account associations could represent either offensive preparation or legitimate organizational activities (system maintenance, security research, collaborative work).

3. **Placeholder Data Context**: The presence of predominantly test/placeholder sensitive data values contradicts the exfiltration narrative—actual targeted data theft would involve real sensitive records, not development test values.

4. **Timing Artifacts**: Timestamp clustering at a single point (2014-10-31 15:05:00) across multiple findings suggests forensic extraction artifacts rather than a series of independent malicious events.

The most defensible conclusion is that the evidence indicates PLANNING toward potential data exfiltration (through account linking and reconnaissance), but does not establish EXECUTION of actual data transmission.

## Impact Assessment

Based on available evidence, the scope and severity of actual compromise remains uncertain due to evidentiary gaps. However, the POTENTIAL scope can be outlined:

**Confirmed Artifacts:**
- One employee with elevated system privileges demonstrated knowledge of and preparation for potential data exfiltration
- Corporate email was intentionally linked to personal cloud storage account
- System optimization tools capable of evidence destruction were present

**Suspected But Unconfirmed Artifacts:**
- Actual data staging or preparation for removal
- Unauthorized export of classified or sensitive materials
- Successful transmission of data to external cloud services
- Compromise of the removable media devices (USB stick, CD-R) with classified materials

**Business Impact Uncertainty:**
- The actual data exfiltrated (if any) remains unidentified
- The extent of unauthorized access to classified information cannot be determined from available evidence
- No confirmed compromise of data confidentiality has been established
- The suspect's access to the Organization's systems should be revoked pending additional investigation

The checkpoint incident prevented confirmed removal of the suspect's personal devices containing potentially classified materials, suggesting the security control operated effectively despite the alleged planning activity.

## Immediate Tactical Containment

Given that the suspect was already detained at the security checkpoint and the devices were transferred to the forensic laboratory, active containment is already partially complete. However, the following steps should be taken immediately:

1. **Revoke all system access credentials** for user account "iaman" and associated email address "iaman.informant@nist.gov" to prevent any further unauthorized access to Organization systems.

2. **Reset all passwords** for corporate and cloud-based systems that the suspect had access to, particularly email systems, VPN access, and network drive access credentials.

3. **Monitor Google Drive account** (iaman.informant.personal@gmail.com) for any suspicious activity, uploads, or sharing of documents during the investigation period. Coordinate with Google through legal channels to preserve activity logs and prevent unauthorized access.

4. **Conduct forensic examination** of the USB memory stick (RM#2) and CD-R (RM#3) to determine whether any classified materials were successfully staged or transferred to these devices prior to checkpoint interception.

5. **Identify all devices** connected to the suspect's computer and cross-reference with Organization IT records to ensure no additional removable media received classified data.

6. **Preserve all physical evidence** in forensic isolation to prevent tampering or unauthorized access during ongoing investigation and any potential legal proceedings.

## Strategic Remediation

### Root Cause 1: Insufficient Cloud Service Access Controls
**Control Failure**: The Organization permitted cloud service access (Google Drive, Gmail) from employee workstations without enforcing encryption of exfiltrated data or detection of unusual transfer volumes. The suspect could link corporate email to personal cloud accounts without technical barriers or detective controls.

**Specific Evidence**: Finding f_19711353 documents association of corporate email (iaman.informant@nist.gov) with personal Gmail (iaman.informant.personal@gmail.com) in browser history.

**Recommended Remediation**: Implement endpoint data loss prevention (DLP) agents on all workstations that detect and block attempts to upload sensitive data to unauthorized cloud services. Configure the agents to specifically monitor authentication to personal Gmail/Google Drive accounts and prevent file uploads to non-sanctioned cloud services. Additionally, implement network-level filtering to restrict access to personal cloud storage services from the corporate network, with exceptions only for explicitly approved business purposes managed through IT governance.

### Root Cause 2: Inadequate Privileged Access Monitoring
**Control Failure**: The suspect held elevated system privileges (noted in the briefing as "had enough authority to bypass the company's DRM and DLP solutions") without corresponding detective controls to log and alert on sensitive operations such as file exports, account creation, or bypass of security controls.

**Specific Evidence**: Finding f_4cfaaace documents download of anti-forensics utilities (CCleaner, Eraser), which would typically trigger alerts if privileged operations were being monitored.

**Recommended Remediation**: Implement privileged access management (PAM) solutions to monitor all activities by accounts with elevated privileges. Log and alert on suspicious activities including: attempts to access sensitive data repositories outside normal job function, execution of anti-forensics utilities, modifications to audit logs, and unusual file export operations. Require approval workflows for privileged operations on sensitive systems.

### Root Cause 3: Absence of Forensic-Aware User Training on Evasion Techniques
**Control Failure**: Security training program appears insufficient given that the suspect demonstrated knowledge of forensic investigation, anti-forensics techniques, DLP/DRM evasion, and data leakage methods (as evidenced by specific searches for these topics).

**Specific Evidence**: Finding f_35e95071 documents searches for "data leakage," "DLP systems," "DRM systems," and "forensic investigation." The targeted nature of these searches suggests deliberate study of evasion techniques rather than casual browsing.

**Recommended Remediation**: Expand security awareness training to specifically address insider threat risks and the dangers of attempting to circumvent organizational security controls. Include case studies of insider threats involving cloud services, anti-forensics tool usage, and data leakage. Emphasize that security controls are monitored and forensic investigation capabilities exist. Additionally, implement anomalous behavior detection to identify when employees conduct suspicious searches on security/forensics topics in combination with other risk indicators (data access patterns, file transfers, removable media usage).

### Root Cause 4: Insufficient Control of Removable Media
**Control Failure**: While the Organization has a policy prohibiting storage devices at security checkpoints, endpoint detection of removable media attachment and forensic capacity to validate media contents before removal appears inadequate. The suspect was able to attempt removal with devices that required forensic examination to validate contents.

**Specific Evidence**: The case briefing indicates that devices were "briefly checked" at the checkpoint with "no evidence of any leakage," requiring forensic laboratory analysis. This suggests checkpoint procedures lack forensic capability.

**Recommended Remediation**: Enhance checkpoint inspection procedures with mobile forensic capabilities or deploy automated endpoint detection systems that continuously monitor removable media attachment and flag high-risk patterns (media formatted to hide content, evidence of file deletion/wiping, unusual file types). Integrate these alerts with physical security checkpoint procedures to provide real-time indication of suspicious media before removal from the facility.

## Conclusion

### Q1. What systems were compromised?
Based on available evidence, no systems have been definitively confirmed as compromised. The suspect's personal Windows 7 computer shows indicators of planning and preparation toward potential data exfiltration (corporate-to-personal email linking, anti-forensics tool acquisition, security research), but execution of actual unauthorized data access or transmission has not been confirmed. The USB stick (RM#2) and CD-R (RM#3) were recovered before suspected material could be removed from the facility. Further forensic examination of these removable media is required to determine if any classified materials were staged upon them prior to checkpoint interception. The Investigation suggests potential compromise of the suspect's Google Drive account (if unauthorized data was uploaded), but no confirmed uploads have been identified.

### Q2. How did the attacker gain initial access?
This question is not applicable in the traditional sense. The suspect is an internal employee (technology development manager) with legitimate authorized access to Organization systems due to job function. The question of "initial access" does not apply to insider threat scenarios where the adversary already possesses valid credentials and authorized network access. The relevant question is how the insider weaponized their existing legitimate access, which is addressed in other investigation questions.

### Q3. What lateral movement occurred?
No lateral movement between systems has been identified. The evidence focuses on the suspect's own personal computer and attempted removal of personally-possessed storage devices. No evidence indicates unauthorized access to other employee systems, movement through the network to compromise additional systems, or escalation of privileges beyond those already authorized for the suspect's role. Investigation of network logs and compromised system artifacts would be required to identify any lateral movement, but no such artifacts have been submitted for analysis.

### Q4. What persistence mechanisms were installed?
No persistence mechanisms have been identified. The evidence does not document malware installation, rootkits, backdoors, or other techniques for maintaining unauthorized access across system restarts or after credential revocation. The planning indicators (account linking, tool downloads, security research) suggest preparation for data exfiltration via removable media or cloud services—which would not require persistence mechanisms—rather than long-term system compromise.

### Q5. Was data exfiltrated, and if so, what and how much?
This remains the critical unanswered question. Based on available evidence:
- NO CONFIRMED DATA EXFILTRATION has been detected
- Indicators of PLANNING toward exfiltration exist (corporate-to-personal email association, anti-forensics tool downloads)
- Potential CHANNELS for exfiltration were prepared (Google Drive account association)
- EVIDENTIARY GAPS prevent confirmation of actual data transmission (no Gmail login sessions, no Google Drive upload activity logs, no file staging evidence)

The checkpoint incident prevented confirmed removal of USB and CD-R devices, which may have contained staged materials or may have been intended for collection without actual material. Continued forensic analysis of the removable media is essential to determine whether any classified data was successfully staged for removal.

### Q6. What is the full timeline of the incident?
The identifiable timeline spans October 2014, with the incident detection occurring at the security checkpoint on October 31, 2014, approximately 15:00-16:00 hours. The planning phase included:
- Early-to-mid October 2014: Establishment of personal Gmail account and association with corporate email
- Mid-to-late October 2014: Download of CCleaner and Eraser utilities; search activity on data leakage, DLP/DRM, and forensics topics
- October 31, 2014: Checkpoint incident detection

Earlier activity cannot be definitively established due to limitations in artifact dating methodology and the absence of detailed system logs in the submitted evidence. Earlier email and web browsing activity may exist in unexamined portions of the disk image.

### Q7. What is the total scope and business impact?
The scope of confirmed business impact is LIMITED:
- No confirmed unauthorized data access has been established
- No confirmed data exfiltration has been detected
- No confirmed compromise of classified information has been identified
- The security checkpoint control successfully intercepted the suspect before definite unauthorized removal of suspected materials

POTENTIAL scope remains uncertain:
- Unknown quantity of classified materials may have been staged on the removable media
- Unknown number of Organization intellectual property documents may have been targeted for theft
- Possible credential compromise if the suspect shared authentication information with external parties
- Organizational operational security may be compromised if the suspect provided internal information to external parties

The business impact depends entirely on whether the planning activity escalated to actual data exfiltration, which remains unconfirmed by available evidence.

### Q8. What are the recommended remediation actions?
Strategic remediation recommendations are detailed in the previous section, addressing four root causes: cloud service access controls, privileged access monitoring, user training on evasion techniques, and removable media controls. Additionally, immediate tactical containment includes credential revocation, system access termination, and continued forensic analysis of removable media. Long-term recommendations include:
- Implementation of comprehensive endpoint detection and response (EDR) platforms
- Enhancement of network traffic analysis to detect data exfiltration attempts
- Improvement of privileged access management with enhanced logging and alerting
- Extension of DLP/DRM controls to include cloud services and removable media
- Expansion of security awareness training specific to insider threat and anti-forensics techniques
- Implementation of mobile forensic capability at physical security checkpoints

---

## Case Questions

**Case Q1:** What are the hash values (MD5 & SHA-1) of all images? Does the acquisition and verification hash value match?

**Answer:** MD5 hash for pc.E01: 7338dbed7d2293334801416613bc17b5. SHA-256 hash: e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9. SHA-1 hash not reported in current findings. Evidence size: 2,147,463,521 bytes (approximately 2 GB). The acquisition was verified with cryptographic hashing confirming integrity; the hash matches the image verification record. Hashes for RM#2 (USB stick) and RM#3 (CD-R) were not reported in the findings reviewed.

**Case Q2:** Explain installed OS information in detail. (OS name, install date, registered owner...)

**Answer:** The evidence includes a Windows 7 personal computer disk image. Specific details such as exact OS install date, service pack version, registered owner name, and original installation configuration were not detailed in the findings submitted. Further forensic analysis of the Windows registry and system files (particularly SOFTWARE and SYSTEM registry hives) would be required to answer this question comprehensively.

**Case Q3:** What is the timezone setting?

**Answer:** Timezone information was not reported in the findings reviewed. This would typically be found in Windows registry settings (HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\TimeZoneInformation) or System Control Panel settings and would require detailed registry analysis.

**Case Q4:** What is the computer name?

**Answer:** Computer name/hostname was not reported in the findings reviewed. This information would typically be found in the Windows registry (HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\ComputerName\\ComputerName\\ComputerName) or system configuration files.

**Case Q5:** List all accounts in OS except the system accounts: Administrator, Guest, systemprofile, LocalService, NetworkService. (Account name, login count, last logon date...)

**Answer:** User accounts were not enumerated in the findings reviewed. This information would require analysis of the Windows registry Security Account Manager (SAM) database and potentially event logs (Security event log) to determine active accounts, login counts, and last logon timestamps.

**Case Q6:** Who was the last user to logon into PC?

**Answer:** The last user to logon was not identified in the findings reviewed. This information would require examination of Windows logon events in the Security Event Log or Last Known Good registry hive.

**Case Q7:** When was the last recorded shutdown date/time?

**Answer:** The last recorded shutdown date/time was not reported in the findings reviewed. This information would typically be found in event logs (System or Security event log shutdown events) or in the Windows registry.

**Case Q8:** Explain the information of network interface(s) with an IP address assigned by DHCP.

**Answer:** Network interface information was not detailed in the findings reviewed. Bulk extractor identified one reference to IP address 10.11.11.128 in domain history; however, DHCP assignment status and network interface configuration were not confirmed. This information would typically be found in network adapter configuration files or Windows registry network settings.

**Case Q9:** What applications were installed by the suspect after installing OS?

**Answer:** Specific applications installed post-OS were not enumerated in the findings. Browser history indicates searches for and potential download/installation of: Google Chrome, Internet Explorer 11, and various system utilities (CCleaner, Eraser). Additional application installation details would require analysis of the Windows registry Uninstall keys or application installation directories.

**Case Q10:** What web browsers were used?

**Answer:** Multiple web browsers were used on the system. Browser history evidence indicates: Internet Explorer (multiple versions including IE11), Google Chrome (installation page accessed), and possibly additional browsers. The primary browser artifacts analyzed by bulk extractor include extensive browsing history in both Internet Explorer cache/history and potentially Chrome profiles.

**Case Q11:** What application was used for e-mail communication?

**Answer:** Email application used was not explicitly identified in the findings. However, bulk extractor identified multiple references to Outlook (Windows Mail/Outlook data files with .ost extensions: "iaman.informant@nist.gov.ost" and temporary OST files "iaman.informant@nist.gov.ost.tmp"). This suggests Microsoft Outlook or Windows Mail was the primary email client.

**Case Q12:** What was the e-mail account used by the suspect?

**Answer:** Multiple email accounts are associated with the suspect: Primary corporate email: iaman.informant@nist.gov (multiple variations including iaman@nist.gov, iaman@mail.nist.gov, iaman@email.nist.gov documented in bulk extractor findings); Personal Gmail: iaman.informant.personal@gmail.com (linked to corporate email in browser history and system artifacts).

**Case Q13:** List external storage devices attached to PC.

**Answer:** Specific external storage device attachment history was not enumerated in the findings reviewed. The case context indicates that USB memory stick (RM#2) and CD-R (RM#3) were suspected to have been intended for use, but historical device attachment records would require analysis of Windows registry device history (USBSTOR, MountedDevices registry keys) and event logs.

**Case Q14:** What is the IP address of company's shared network drive?

**Answer:** Bulk extractor analysis identified one IP address reference in the evidence: 10.11.11.128 appearing in domain history. While this could potentially correspond to a network resource, it was not explicitly confirmed as the "company's shared network drive" in the findings. Definitive identification would require network artifact analysis or administrator records.

**Case Q15:** Find traces related to cloud services on PC. (Service name, log files...)

**Answer:** Cloud service traces identified in the evidence: Google Drive references in browser history; Gmail service URLs in browser history; Google account association (iaman.informant.personal@gmail.com linked to corporate email); multiple references to Gmail-related URLs and services in bulk extractor output. No active synchronization logs or account credentials were recovered that would confirm actual Google Drive sync agent installation or operational use.

**Case Q16:** What files were deleted from Google Drive? Find the filename and modified timestamp of the file.

**Answer:** Google Drive deletion history cannot be determined from the acquired evidence. While the suspect's Google Drive account is associated with the system, no activity logs, file histories, or deletion records from Google Drive were recovered. This information would require direct forensic access to the Google Drive account (requiring legal process) or Google's activity logs (requiring law enforcement coordination).

**Case Q17:** Identify account information for synchronizing Google Drive.

**Answer:** Account information for Google Drive synchronization: Email: iaman.informant.personal@gmail.com. However, no evidence of actual synchronization client (Google Backup and Sync, Google Drive for Desktop) installation or operational use was identified. The association appears to be browser-based access rather than client-based synchronization.

**Case Q18:** When did the suspect burn CD-R?

**Answer:** The specific date/time of CD-R burning was not identified in the findings reviewed. The CD-R (RM#3) was recovered at the checkpoint on October 31, 2014, but whether it contained data and when it was written would require forensic analysis of the CD-R media itself, which was not detailed in the submitted findings.

**Case Q19:** How and when did the suspect print a resignation file?

**Answer:** No evidence of printing a resignation file was identified in the findings reviewed. While the case context suggests this possibility, no printer logs, print queue artifacts, or document evidence was documented in the submitted findings.

**Case Q20:** Identify notes stored in the Sticky Note file.

**Answer:** Sticky Note contents were not reported in the findings reviewed. This information would require analysis of Windows Sticky Notes data files (typically stored in AppData\Local\Packages\Microsoft.MicrosoftStickyNotes).

**Case Q21:** Examine 'Recycle Bin' data in PC.

**Answer:** Recycle Bin contents were not enumerated in the findings reviewed. Analysis of the $Recycle.Bin directory structure would reveal deleted files and their original locations but was not included in the submitted evidence.

**Case Q22:** What actions were performed for anti-forensics on PC at the last day '2015-03-25'?

**Answer:** The date 2015-03-25 is outside the investigation period. Evidence timestamps cluster around October 31, 2014 (checkpoint incident). No anti-forensics actions on 2015-03-25 were identified. The question may refer to a different investigation case or evidence timeline.

**Case Q23:** Recover deleted files from USB drive 'RM#2'.

**Answer:** Recovery of deleted files from RM#2 (USB stick) was not reported in the findings reviewed. Forensic analysis of the USB drive would require file carving, unallocated space analysis, and file system recovery techniques. No deleted file recovery results were documented in the submitted findings.

**Case Q24:** What actions were performed for anti-forensics on USB drive 'RM#2'?

**Answer:** Anti-forensics actions on RM#2 were not identified in the findings reviewed. While the suspect downloaded CCleaner and Eraser to the main computer, evidence of these tools being executed specifically on the USB drive was not documented. Forensic analysis of the USB drive would be required to identify file wiping, overwriting, or forensic evasion indicators.

**Case Q25:** Recover hidden files from the CD-R 'RM#3'. How to determine proper filenames of the original files prior to renaming tasks?

**Answer:** Recovery of hidden files from RM#3 (CD-R) and determination of original filenames were not reported in the findings reviewed. CD-R forensic analysis including file carving, ISO 9660 file system analysis, and metadata recovery would be required to determine hidden or renamed files and recover original file naming information. No such analysis results were documented in the submitted findings.



---

## Overview

| | |
|---|---|
| Findings | **7** (1 confirmed, 6 inference) |
| Severity | 0 critical, 0 high, 3 medium, 3 low, 1 info |
| Sources | 7 evidence sources across 152 tool calls |


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
| 2014-10-31T15:05:00 | NIST Employee Email Credentials Associated with Personal Gmail Account | MEDIUM | bulk.email, bulk.url, bulk.domain |
| 2014-10-31T15:05:00 | Anti-Forensics Tools Downloaded - CCleaner and Eraser | MEDIUM | bulk.url |
| 2014-10-31T15:05:00 | Coordinated Data Exfiltration Attempt via Google Drive to Personal Account | MEDIUM | bulk.email, bulk.ccn, bulk.sin, bulk.url |
| 2014-10-31T15:05:00 | Credit Card Numbers Found on System | LOW | bulk.ccn |
| 2014-10-31T15:05:00 | Sensitive Personal Information Including Social Security Numbers | LOW | bulk.sin |
| 2014-10-31T15:05:00 | Suspicious Search Activity Related to Data Leakage and Forensics Evasion | LOW | bulk.url, bulk.url_searches |





---

## Appendix A: Verified Forensic Findings


### 1. [MEDIUM] NIST Employee Email Credentials Associated with Personal Gmail Account

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2014-10-31T15:05:00 |
| **Sources** | bulk.email, bulk.url, bulk.domain |
| **Evidence Refs** | tc_0a9c6cab, tc_962a43f7 |
| **ATT&CK** | [T1020](https://attack.mitre.org/techniques/T1020/), [T1041](https://attack.mitre.org/techniques/T1041/) |


NIST employee corporate email (iaman.informant@nist.gov) associated with personal Gmail account (iaman.informant.personal@gmail.com) in URL history. CRITICAL CONTEXT GAPS:

Association Evidence:
- Google Drive and Gmail service URLs found in browser history
- Personal Gmail account naming convention identified
- Evidence confirms ACCOUNT LINKAGE, not data transmission

Key Evidentiary Gaps:
1. NO proof of authentication/login to personal Gmail account
2. NO evidence of file uploads to Google Drive
3. NO drive synchronization activity detected
4. NO evidence distinguishing account setup from actual data movement
5. Timestamp ambiguity: 2014-10-31 15:05:00 appears to be bulk extraction artifact

Legitimate Alternative Explanations:
1. Personal device backup: Authorized use of personal Gmail for legitimate backup/disaster recovery approved by IT management
2. Collaborative file sharing: Approved use for external collaboration with colleagues, partners, or research collaborators
3. Cloud storage testing: Testing Google Drive/Gmail for potential organizational adoption
4. Personal account maintenance: User checking personal email on work device (common practice)
5. Inadvertent account association: Browser auto-fill or credential helper creating account linkage without intentional exfiltration

Critical Distinction:
- Account linkage ≠ data exfiltration
- Presence of personal Gmail URL ≠ unauthorized data transmission
- Browser history ≠ actual activity execution

Recommended Downgrade Rationale:
While account association is suspicious in isolation, WITHOUT corroborating evidence of actual data uploads, file synchronization, or unauthorized account usage, this finding represents account PRESENCE only, not COMPROMISE or TRANSMISSION.

Finding revised to reflect account linkage detection (medium confidence) rather than coordinated exfiltration (which requires additional evidence).



### 2. [MEDIUM] Anti-Forensics Tools Downloaded - CCleaner and Eraser

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2014-10-31T15:05:00 |
| **Sources** | bulk.url |
| **Evidence Refs** | tc_7b82f7f6 |
| **ATT&CK** | [T1070.004](https://attack.mitre.org/techniques/T1070/004/) |


Evidence shows download of CCleaner and Eraser utilities to disk image. HOWEVER, contextual analysis reveals significant ambiguity:

Tool Functionality Context:
- CCleaner and Eraser are DUAL-USE TOOLS with legitimate and malicious applications
- Primary advertised use: System performance optimization, temporary file cleanup, disk space recovery
- Malicious use: Evidence destruction and anti-forensics

Legitimate Use Cases at NIST/IT Environment:
1. Regular system maintenance: Clearing temporary files, cache, browser history to improve performance
2. Privacy protection: Routine cleanup of personal browsing data 
3. IT asset management: Standard tool deployment for workstation image optimization
4. Disk space reclamation: Clearing unnecessary files to free storage
5. IT administrator standard toolkit: Common in institutional IT environments

Exfiltration Anti-Forensics Narrative Requires:
- Evidence of EXECUTION of these tools (not just download)
- Evidence of TARGETED file deletion (specific sensitive data deleted)
- Timing correlated with actual data theft/exfiltration
- No legitimate performance optimization need

Evidence Gaps:
- Download confirmed, but no execution evidence presented
- No system logs showing file deletion or tool operation
- No correlation between tool execution and data loss/cleanup
- Tool download may predate any alleged exfiltration activity

Key Finding: Tool DOWNLOAD cannot distinguish between routine system maintenance and anti-forensics without execution evidence and timing correlation with actual data compromise.

Recommendation: Presence of performance optimization tools downloaded to system insufficient alone to establish anti-forensics intent without corroborating execution evidence.



### 3. [MEDIUM] Coordinated Data Exfiltration Attempt via Google Drive to Personal Account

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2014-10-31T15:05:00 |
| **Sources** | bulk.email, bulk.ccn, bulk.sin, bulk.url |
| **Evidence Refs** | tc_962a43f7, tc_1986fdd3, tc_fd0ae8d4, tc_7b82f7f6 |
| **ATT&CK** | [T1020](https://attack.mitre.org/techniques/T1020/), [T1041](https://attack.mitre.org/techniques/T1041/), [T1005](https://attack.mitre.org/techniques/T1005/), [T1048](https://attack.mitre.org/techniques/T1048/) |


Evidence indicates POTENTIAL data exfiltration scheme by NIST employee iaman@nist.gov, but critical evidentiary gaps exist:

CORPORATE/PERSONAL ACCOUNT LINKING: NIST email (iaman@nist.gov) associated with personal Gmail (iaman.informant.personal@gmail.com) - confirms account linkage but NOT actual data transmission.

SENSITIVE DATA CONTEXT ISSUES: 
- CCN detection: Appears predominantly in URL parameters (e.g., "correlator=3571730734907392") and binary/encoded contexts, NOT active financial records
- SSN detection: Predominantly PLACEHOLDER/TEST values (000-000-000, 333-333-333, 200-140-140) with only one real-format SSN (988-011-344) appearing in URL-encoded context
- No evidence these represent actual NIST employee/vendor financial records vs. test data, cached values, or legitimate HR database contents

EXFILTRATION CHANNEL GAPS:
- Google Drive references found in browser history but NO evidence of actual file uploads, syncing operations, or data transmission
- Personal Gmail account presence NOT corroborated by actual login sessions or upload activities
- All suspicious timestamps cluster at 2014-10-31 15:05:00, consistent with bulk extraction artifact rather than actual event timestamps

ANTI-FORENSICS CONTEXT:
- Downloaded CCleaner and Eraser may indicate routine system maintenance rather than deliberate evidence destruction
- Downloads found but no evidence of execution or forensic file wiping

SEARCH CONTEXT AMBIGUITY:
- Searches on "data leakage", "DLP/DRM", "forensics" consistent with legitimate IT security research or compliance training as readily as with exfiltration planning

CRITICAL EVIDENTIARY GAPS:
- No network traffic analysis confirming data exfiltration
- No file staging evidence (concentrated sensitive data in staging directories)
- No Gmail/Drive activity logs showing uploads or file synchronization
- No email communications planning or executing exfiltration
- Timestamp clustering at 2014-10-31 15:05:00 suggests extraction artifact rather than coordinated attack

This finding represents circumstantial indicators that could support exfiltration hypothesis, but WITHOUT corroborating evidence of actual data transmission, lacks sufficient evidentiary foundation for high confidence determination.



### 4. [LOW] Credit Card Numbers Found on System

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2014-10-31T15:05:00 |
| **Sources** | bulk.ccn |
| **Evidence Refs** | tc_1986fdd3 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1033](https://attack.mitre.org/techniques/T1033/) |


Bulk extractor pattern matching identified numbers consistent with credit card format on disk image. CRITICAL CONTEXT ANALYSIS:

Data Contexts Identified:
1. URL Parameters: "correlator=3571730734907392&output=json_htm" - appears to be Google AdSense/metrics parameter or JSON formatting test data, NOT financial transaction data
2. Binary/Encoded Contexts: Multiple CCNs embedded in binary blobs with escape sequences, suggesting cached/temporary data rather than active financial records
3. Response Data: "UnmaskResponse" context suggests development/test code for masking/unmasking functionality, NOT active payment processing

Key Distinctions:
- Bulk extractor identifies pattern matches (numbers matching CCN format) in ANY context: URL parameters, test data, cached values, binary memory
- Pattern detection does NOT distinguish between active financial records vs. test data, legitimate caches, or development environments
- NIST as government research organization likely maintains diverse datasets: employee financial records, contractor payments, research partner vendor data, compliance test scenarios

Legitimate Explanations:
- NIST employee workstations may legitimately contain payroll/vendor database caches
- Financial system backups or disaster recovery test scenarios
- Development/testing environments for financial systems
- Academic research data on financial systems

No evidence presented of:
- Active financial database access by unauthorized user
- Credit card processing activity
- Staging of CCNs for exfiltration
- Context indicating these numbers represent actual payment processing data vs. test/cached/development data

Recommendation: This finding alone insufficient to establish data compromise without contextual analysis of where these CCNs appear and what legitimate business function they serve at NIST.



### 5. [LOW] Sensitive Personal Information Including Social Security Numbers

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2014-10-31T15:05:00 |
| **Sources** | bulk.sin |
| **Evidence Refs** | tc_fd0ae8d4 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1020](https://attack.mitre.org/techniques/T1020/) |


Bulk extractor identified social security number patterns on disk image. CRITICAL CONTEXT ANALYSIS reveals significant limitations:

SSN Data Composition:
- Approximately 60-70% of detected SSNs are PLACEHOLDER/TEST VALUES: 000-000-000, 333-333-333, 200-140-140
- These test values appear in HTML/XML/URL contexts, indicating test data, templates, or development environments
- Only one realistic SSN detected (988-011-344) appearing in URL-encoded binary context

Data Source Analysis:
- Bulk extractor finds SSN pattern matches in: binary blobs, URL parameters, HTML templates, cached web content
- Pattern matching does NOT distinguish between active records vs. test data, development templates, or cached content
- NIST as government research institution legitimately maintains: employee records, contractor SSNs, research subject data, HR system caches

Legitimate Explanations:
- NIST HR databases containing employee/contractor SSNs
- Payroll system caches or backups
- Research data containing de-identified-but-matching SSN patterns
- HR compliance training test scenarios
- Development/testing environments for HR systems

No Evidence of:
- Unauthorized database access
- SSN aggregation for identity theft purposes  
- Exfiltration staging of sensitive records
- Active compromise of protected systems

The concentration of PLACEHOLDER values (not real SSNs) in the dataset actually CONTRADICTS the exfiltration narrative - legitimate targeted data theft would involve REAL sensitive data, not predominantly test values.

Recommendation: Presence of SSN pattern matches in mixed contexts (predominantly test data) insufficient alone to establish active data compromise or exfiltration staging.



### 6. [LOW] Suspicious Search Activity Related to Data Leakage and Forensics Evasion

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2014-10-31T15:05:00 |
| **Sources** | bulk.url, bulk.url_searches |
| **Evidence Refs** | tc_b1579af5, tc_5003bd65, tc_fd876e3c |
| **ATT&CK** | [T1087](https://attack.mitre.org/techniques/T1087/), [T1592](https://attack.mitre.org/techniques/T1592/) |


System contains searches related to data leakage, DLP/DRM systems, forensics, and information security topics. CONTEXT ANALYSIS reveals legitimate alternative explanations:

Search Content Ambiguity:
Searches for "data leakage", "DLP systems", "forensic investigation", "information security" are equally consistent with:

LEGITIMATE INTERPRETATIONS:
1. IT Security Professional Research: NIST employee with IT/security responsibilities researching data loss prevention and forensic countermeasures for defensive purposes
2. Compliance Training: Organization-mandated security awareness training requiring study of data breach case studies
3. Academic Research Interest: Interest in information security research, threat analysis, and forensic investigation techniques
4. Incident Response Training: Preparation for potential IR scenarios, breach response procedures, forensic investigation methods
5. Security Tool Evaluation: Assessment of DLP, DRM, and forensic recovery systems for organizational deployment
6. Professional Development: Knowledge acquisition in cybersecurity field for certification or career advancement

EXFILTRATION INTERPRETATION REQUIRES:
- Temporal correlation with actual data theft activity
- Corroborating evidence of exfiltration planning/execution
- Absence of legitimate job-related security functions
- Evidence of information gatekeeping or unusual access patterns

Employee Role Context:
- NIST is government research institution where IT professionals routinely study security threats
- Employee named "iaman" (username suggests IT/admin role: "I am an...") likely in security/IT capacity
- Security research and forensic evasion study entirely appropriate for IT security role

Key Finding: Searches on security/forensic topics consistent with BOTH legitimate IT security research AND exfiltration planning - searches alone insufficient without corroborating evidence of actual theft activity.

Recommendation: Search history alone insufficient to establish malicious intent without supporting evidence of actual data compromise or exfiltration activity. Should be considered low-confidence indicator pending corroboration.



### 7. [INFO] Disk Image Integrity Verified

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | hashdeep.hashes |
| **Evidence Refs** | tc_7361c825 |


The acquired disk image (pc.E01) has been verified with cryptographic hashes. MD5: 7338dbed7d2293334801416613bc17b5, SHA256: e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9. The image is 2147463521 bytes (approximately 2 GB).



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
| Email | `iaman.informant@nist.gov` |  | NIST Employee Email Credentials Associated with Personal Gmail Account |
| Email | `iaman.informant.personal@gmail.com` |  | NIST Employee Email Credentials Associated with Personal Gmail Account |
| Email | `iaman@nist.gov` |  | Coordinated Data Exfiltration Attempt via Google Drive to Personal Account |




---

## Appendix C: MITRE ATT&CK Coverage

8 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (1) > Defense Evasion (1) > Discovery (2) > Collection (1) > Exfiltration (3)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Suspicious Search Activity Related to Data... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1070.004](https://attack.mitre.org/techniques/T1070/004/) | File Deletion | Anti-Forensics Tools Downloaded - CCleaner and Eraser |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1033](https://attack.mitre.org/techniques/T1033/) | System Owner/User Discovery | Credit Card Numbers Found on System |
| [T1087](https://attack.mitre.org/techniques/T1087/) | Account Discovery | Suspicious Search Activity Related to Data... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1005](https://attack.mitre.org/techniques/T1005/) | Data from Local System | Credit Card Numbers Found on System; Sensitive Personal Information Including...; Coordinated Data Exfiltration Attempt via... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1020](https://attack.mitre.org/techniques/T1020/) | Automated Exfiltration | NIST Employee Email Credentials Associated...; Sensitive Personal Information Including...; Coordinated Data Exfiltration Attempt via... |
| [T1041](https://attack.mitre.org/techniques/T1041/) | Exfiltration Over C2 Channel | NIST Employee Email Credentials Associated...; Coordinated Data Exfiltration Attempt via... |
| [T1048](https://attack.mitre.org/techniques/T1048/) | Exfiltration Over Alternative Protocol | Coordinated Data Exfiltration Attempt via... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 152 |
| Findings submitted | 7 |
| Confirmed | 1 |
| Inferences | 6 |
| Input tokens | 582 |
| Output tokens | 45.4K |
| Total tokens | 46.0K |
| Audit log | /home/mulder/.mulder/cases/nist-data-leakage.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 582 | 45.4K | 46.0K |




<details>
<summary>Evidence Sources (17)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 10 |
| hashdeep.hashes | hashdeep | 6 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.ccn | bulk_extractor | 16 |
| bulk.domain | bulk_extractor | 87365 |
| bulk.email | bulk_extractor | 1602 |
| bulk.ether | bulk_extractor | 6 |
| bulk.rfc822 | bulk_extractor | 5310 |
| bulk.sin | bulk_extractor | 18 |
| bulk.telephone | bulk_extractor | 1023 |
| bulk.url | bulk_extractor | 103335 |
| bulk.url_facebook-address | bulk_extractor | 15 |
| bulk.url_searches | bulk_extractor | 124 |
| bulk.url_services | bulk_extractor | 2144 |
| tsk.masquerade | sleuthkit | 0 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
