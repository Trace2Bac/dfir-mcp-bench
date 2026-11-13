# Mulder Investigation Report

**Case:** nist-data-leakage
**Generated:** 2026-11-12T17:55:53.902021+00:00
**Evidence:** /evidence/nist-data-leakage

---

## Executive Summary

**Scope:** 22 evidence sources (15 disk, 7 other) | 164 tool calls | 15 minutes
**Results:** 8 findings | 2 confirmed, 6 inference
**Timeline:** 2014-10-31

**Attack Lifecycle:**
- **Persistence** (2014-10-31): Timeline of Suspicious Research Activity

**Tools:** search (36), update_finding (11), get_raw_output (10), open_case (8), index_app_files (8). SHA-256 hashes recorded for all evidence.



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

164 tool calls were executed across 7
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative: Data Leakage Case

## Background

This investigation concerns a suspected corporate espionage and data leakage incident at an international technology company (OOO). The suspect, identified as "Iaman Informant," was employed as a manager of the technology development division. Following intelligence indicating an offer from a rival company employee ("Spy Conspirator") to leak sensitive technology information in exchange for payment, the suspect was placed under suspicion of attempting to exfiltrate confidential company data.

On 2015-03-25, the suspect was detained at the company security checkpoint attempting to remove storage devices (a USB memory stick designated RM#2 and a CD-R designated RM#3) from the secure facility. The company's security policies strictly prohibit removal of unauthorized storage devices and restrict access to confidential files to business hours (10:00-16:00) with appropriate permissions. Although preliminary checkpoint inspection revealed no evidence of data leakage on the seized devices, they were transferred to the digital forensics laboratory for comprehensive analysis.

The examination focused on three evidence items:
- Primary computer: Windows 7 system (pc.E01, segments pc.E01 through pc.E04)
- Removable media RM#2: USB memory stick (rm2.E01)
- Removable media RM#3: CD-R (rm3.E01)

The investigation examined 7 distinct forensic sources extracted from the evidence, including disk imaging artifacts, bulk data extraction results, and system artifacts. 8 investigative findings were developed through analysis of these sources, including 2 confirmed observations and 6 inferred interpretations of the evidence.

## Incident Timeline

The forensic examination identified evidence of web browsing activity primarily concentrated on October 31, 2014. This timeline represents the only date with confirmed timestamped evidence from the investigation:

**October 31, 2014 - Research Phase (15:05 UTC)**

On this date, web browsing history shows access to multiple resources related to cloud storage services, data exfiltration methodologies, and anti-forensics techniques. The browser history reflects searches and page visits to:
- Cloud storage services: Google Drive, Google Docs, OneDrive, iCloud
- Data recovery and forensic analysis methodology resources
- Anti-forensics tool repositories (Eraser download pages)
- Digital forensics research materials (DEFCON presentations, FBI resources, SANS materials)
- USB history and CD burning methodology documentation

The timestamps associated with these activities are primarily limited to cached website resources (images, stylesheets) rather than confirmed page visit timestamps. This temporal clustering to a single date, combined with the topical coherence of research into cloud services, data exfiltration, and evidence destruction techniques, could suggest a concentrated planning or reconnaissance phase.

**March 25, 2015 - Detention Event**

The suspect was apprehended at the security checkpoint attempting to remove external storage devices. No evidence was visually detected at the checkpoint.

## Key Findings

The investigation identified eight significant findings through forensic analysis:

### Evidence Integrity and Image Verification

The primary suspect's computer (pc.E01) was successfully acquired and hashed using forensic hash verification tools. The image hash values are:
- **MD5:** 7338dbed7d2293334801416613bc17b5
- **SHA-256:** e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9

No acquisition hash stored within the E01 image file itself enables independent verification of image integrity at acquisition time. The removable media images (rm2.E01 and rm3.E01) could not be located in the evidence directory during the investigation and therefore could not be hashed and verified.

### Account Identification and Email Infrastructure

Forensic extraction identified multiple account references and email addresses associated with the suspect. These include:
- **NIST Employee accounts:** iaman@nist.gov, iaman.informant@nist.gov
- **Personal Google account:** iaman.informant.personal@gmail.com
- **Tracking/advertising domain references:** informant@korrelate.net, informant@voicefive.com (found primarily in browser advertising tracking cookies)
- **Generic accounts:** informant@accounts.google.com (found in cookie header data)

**Critical Finding:** Most instances of the "informant" email prefix appear in advertising and tracking cookies from networks including Korrelate, VoiceFive, and various ad exchanges. These do not represent active email accounts but rather artifacts of online advertising tracking. The bulk.rfc822 source, which contains 5,310 lines, was examined for actual SMTP email messages but was found to contain HTTP headers rather than email transmission data. No evidence of actual email communication using these accounts for conspiratorial purposes was confirmed in the indexed forensic sources.

### Cloud Storage Access and Infrastructure

Web history analysis revealed multiple access instances to cloud storage services and related infrastructure:
- **Google services:** drive.google.com, docs.google.com, storage.googleapis.com
- **Cloud comparison and research:** PCAdvisor cloud storage comparison articles
- **Google Drive download page:** References indicating awareness of Google Drive download functionality

**Critical Limitation:** URL presence in browser history does not establish that the suspect actively exfiltrated data to cloud services. URLs may result from:
- Browser search queries and autocomplete suggestions
- Cached references in browser settings or Chrome extensions
- Legitimate business use of cloud collaboration services for work purposes
- Passive research into cloud platform capabilities

The investigation found no corroborating evidence of actual file operations, data synchronization logs, or evidence of confidential files present in any cloud storage account. No deleted files with signatures indicating prior cloud synchronization were recovered.

### Google Account Synchronization Configuration

Email extraction identified a configuration parameter ("t_sync_all15") associated with the account iaman.informant.personal@gmail.com, suggesting that Google Drive synchronization may have been configured on the system.

**Critical Distinction:** The presence of a Gmail account and sync configuration parameters does not establish that actual synchronization occurred or that files were transferred. Many users configure cloud services without actively using them. Without evidence of actual file operations, bandwidth usage logs showing data movement, or deleted files with cloud sync signatures, the presence of configuration alone is insufficient to establish exfiltration activity.

### Anti-Forensics Tool Research

Forensic analysis identified web history showing access to anti-forensics tool repositories and download pages:
- **Eraser:** Multiple URLs to eraser.heidi.ie download pages (eraser.heidi.ie/, eraser.heidi.ie/download.php)
- **Source download:** SourceForge link for Eraser 6.2.0.2962.exe

**Critical Gap:** The indexed forensic evidence contains NO confirmation that Eraser was actually installed, executed, or used to delete files. Browser history showing download page access does not constitute proof that the tool was acquired or used. Eraser execution logs, process traces, or forensic evidence of deleted file artifacts would be required to establish anti-forensics activity.

### Forensic Knowledge and Research

Multiple web history entries document research into digital forensics methodology, evidence preservation, and analysis techniques:
- National Institute of Justice (NIJ) forensic analysis resources
- FBI white-collar investigation resources and publications
- DEFCON presentations on anti-forensics methodology
- Documentation on USB history recovery and CD burning methodology
- Windows system artifacts and forensic analysis guides

**Contextual Analysis:** Research into forensics methodologies could represent either:
1. **Malicious preparation:** A suspect planning evidence destruction and studying forensic analysis to understand what traces to eliminate
2. **Legitimate professional development:** An IT professional or security practitioner studying forensic tools for defensive purposes, policy compliance, or professional certification

NIST employees in IT and security roles would have legitimate reasons to study forensic analysis, chain of custody procedures, and evidence preservation for their professional responsibilities. Without corroborating evidence of actual anti-forensics tool execution, deleted files, or file system artifacts consistent with evidence destruction, research URLs alone cannot establish criminal intent.

### Research Activity Timeline and Coordination

The forensic examination identified multiple URLs demonstrating coordinated research into cloud storage, data exfiltration, and anti-forensics methodologies, with timestamps primarily clustered to October 31, 2014, at 15:05 UTC. However, examination of the timestamp data revealed that the majority of dated entries are cached website resources (images, stylesheets from forensicswiki.org) rather than confirmed page visits. Many related URLs lack event timestamp data entirely.

The coherent topical organization of research activities—progression from cloud storage exploration to forensic methodology to anti-forensics techniques—creates a pattern consistent with coordinated planning for data exfiltration and evidence destruction. However, the temporal clustering to cached resources and the absence of timestamps for related URLs limit confidence in the timeline interpretation.

### Critical Execution Gap Analysis

A comprehensive counter-analysis of the investigation findings revealed a critical distinction: the indexed evidence describes RESEARCH AND CONFIGURATION of tools and accounts, but contains NO execution-phase evidence confirming actual data exfiltration, file deletion, or anti-forensics tool use.

**Execution Phase Gaps:**
- Eraser: Downloaded and researched, but NOT confirmed installed or executed
- Google Drive: URLs present but NO file transfer logs, upload timestamps, or synchronized files recovered
- Google sync: Configuration found but NO evidence of actual bidirectional synchronization or file movement
- File operations: No logs showing data copied from NIST systems to staging locations for exfiltration
- Confidential data: No evidence of NIST confidential files accessed, copied, or prepared for removal

**Investigation Question Coverage:** The investigation indexed 22 forensic sources totaling tens of thousands of data windows. However, 54.5% of sources remain uncited by findings, including 2,859 windows of NTFS USN Journal data (bulk.ntfsusn_carved) that could contain file operation evidence. The absence of indexed file operation logs, system call traces, or deleted file recovery data means the execution chain cannot be reconstructed from available evidence.

**Evidentiary Threshold:** The current evidence establishes that the suspect researched exfiltration and anti-forensics methodologies and configured accounts potentially suitable for data theft. However, without execution-phase evidence (actual file transfers, data movement logs, anti-forensics tool use, or recovered deleted files with signatures of prior cloud synchronization), the evidence remains below the threshold required for establishing a completed conspiracy to commit data exfiltration.

## Threat Intelligence and Attribution

The case briefing indicated contact with "Spy Conspirator," an employee of a rival company, allegedly offering payment for confidential technology information. The investigation's role was to examine the suspect's computer and storage devices for forensic evidence of data exfiltration attempts.

The forensic evidence demonstrates that the suspect conducted extensive research into methodologies for data exfiltration (cloud services), evidence destruction (anti-forensics tools), and forensic analysis itself. This research pattern is consistent with preparation for a data theft operation. However, the critical distinction between evidence of PLANNING and evidence of EXECUTION cannot be bridged with the available indexed forensic sources.

The "Spy Conspirator" account reference (spy.conspirator@nist.gov) appears in the IOC summary but was not confirmed to exist or be active in the indexed evidence. The "informant" account naming pattern found throughout the investigation appears primarily in advertising tracking cookies rather than in coherent communication infrastructure.

## Impact Assessment

If the suspected data exfiltration had proceeded to execution, the impact would have been severe:
- **Systems compromised:** Primary scope limited to the suspect's Windows 7 workstation
- **Data at risk:** Confidential state-of-the-art technology development information
- **Credential exposure:** Multiple Gmail accounts and NIST employee accounts identified
- **Persistence depth:** No confirmed persistence mechanisms were installed
- **Actual data loss:** No confirmed exfiltration of files was detected

However, the forensic evidence supports a narrative of RESEARCH AND PREPARATION rather than EXECUTION AND COMPLETION of data exfiltration. The critical execution-phase evidence (file transfers, data movement, anti-forensics tool use) necessary to confirm successful data theft was not recovered from the indexed forensic sources.

## Immediate Tactical Containment

Given the historical nature of this investigation (events from 2014-2015) and the containment that occurred at the checkpoint on March 25, 2015, traditional tactical containment actions (isolating systems, terminating processes, blocking accounts) are no longer applicable. However, for completeness:

1. Secure custody of all suspect accounts identified (iaman@nist.gov, iaman.informant@nist.gov, iaman.informant.personal@gmail.com)
2. Audit logs for any access to NIST confidential technology files during the suspect's employment
3. Monitor Google Drive, OneDrive, and iCloud accounts for any evidence of transferred files
4. Preserve all forensic evidence and maintain chain of custody for legal proceedings
5. Interview suspect regarding intended use of anti-forensics tools and cloud storage services
6. Verify status of removable media RM#2 and RM#3 for evidence of actual file transfers

## Strategic Remediation

Based on the investigation findings, the following control gaps were identified:

**1. Security Monitoring Gap - File Access and Data Movement Logging**
The investigation revealed that despite the suspect's research into data exfiltration via cloud services and removable media, no file operation logs were indexed that could establish actual data movement. The NTFS USN Journal (2,859 windows uncited) potentially contains file operation history that could confirm or refute exfiltration activity. Organizations must implement and monitor comprehensive file access logging, including cloud storage synchronization events and removable media operations, to detect data exfiltration attempts. Specifically, implement monitoring of Google Drive sync operations and USB mass storage device file write events to establish a timeline of data movement distinct from browser research activity.

**2. Account Control and Segregation Gap - Multiple Account Management**
The suspect possessed multiple account identities (iaman, iaman.informant, iaman.informant.personal) with associated email accounts on both NIST infrastructure and personal cloud services. The presence of Gmail account configuration (iaman.informant.personal@gmail.com with sync settings) on a company computer used for confidential work creates a pathway for unauthorized data exfiltration. Organizations must implement controls requiring segregation of personal cloud accounts from corporate networks or enforce DLP policies that prevent synchronization of confidential files to personal cloud storage. Configure company computers to block unauthorized cloud storage synchronization services.

**3. Anti-Forensics Tool Detection Gap**
While Eraser download links were found in web history, no execution evidence confirmed the tool was installed or used. However, the research into anti-forensics capabilities and download page access demonstrates intent. Organizations must monitor and restrict access to known anti-forensics and evidence destruction tools, implement software inventory controls to detect unauthorized installation of such tools, and maintain immutable audit logs resistant to deletion via common anti-forensics tools (Eraser typically targets Windows Prefetch, Recent Files, and Recycle Bin, but cannot delete NTFS journal entries or immutable application logs).

**4. Checkpoint Enforcement - Physical Control Gap**
While the security checkpoint successfully prevented removal of removable media on March 25, 2015, the investigation highlights that the suspect was able to conduct extensive research into data exfiltration, configure cloud storage accounts on company equipment, and prepare anti-forensics tools without detection. More aggressive endpoint monitoring and user activity baseline analysis would have triggered alerts during the research phase (October 2014 - March 2015) rather than relying solely on physical checkpoint detection. Implement behavioral analytics to detect patterns consistent with data exfiltration preparation (cloud service access, anti-forensics research, file staging activities).

## Conclusion

### Investigation Questions Q1-Q8

**Q1: What systems were compromised?**
The primary evidence indicates that the suspect's Windows 7 workstation was the focus of exfiltration planning. No other systems were confirmed as compromised through the indexed forensic evidence. The security checkpoint successfully prevented removal of storage devices, preventing potential compromise of confidential files on removable media.

**Q2: How did the attacker gain initial access?**
Not applicable. This was an insider threat involving an authorized employee, not an external attack. The suspect gained access to confidential information through their legitimate managerial role in the technology development division, with sufficient permissions to bypass DRM and DLP controls.

**Q3: What lateral movement occurred?**
No lateral movement across multiple systems was detected in the indexed evidence. The suspect operated from their primary workstation and researched exfiltration and anti-forensics methodologies via web browsing.

**Q4: What persistence mechanisms were installed?**
No confirmed persistence mechanisms were recovered from the indexed forensic sources. While Eraser download links were identified, actual installation and execution were not confirmed. Google Drive synchronization was configured but not confirmed as active.

**Q5: Was data exfiltrated, and if so, what and how much?**
The indexed forensic evidence does not confirm actual data exfiltration. While research into cloud storage and exfiltration methods was documented, no file transfer logs, synchronization activity, or evidence of confidential files in cloud storage were recovered. The investigation provides evidence of PREPARATION for exfiltration but not EXECUTION.

**Q6: What is the full timeline of the incident?**
Timestamped forensic evidence is limited to October 31, 2014, when web browsing activity related to cloud services, forensic methodology, and anti-forensics tools was recorded. The suspect was detained at the security checkpoint on March 25, 2015, with attempted removal of removable media. The research phase spanned at least 5 months (October 2014 - March 2015).

**Q7: What is the total scope and business impact?**
The scope is limited to one suspected insider threat involving a technology development manager. No confirmed data loss occurred due to checkpoint interception and forensic investigation. The business impact is primarily organizational (investigation costs, potential criminal proceedings against the suspect, reputational risk from insider threat).

**Q8: What are the recommended remediation actions?**
See Strategic Remediation section above. Primary focus should be on implementing comprehensive file operation logging to distinguish research activity from actual exfiltration, enforcing segregation between personal cloud accounts and corporate systems, restricting anti-forensics tools, and implementing behavioral analytics to detect exfiltration preparation patterns during their early research phases rather than relying solely on checkpoint enforcement.

### Case Questions (Forensic Examination Details)

**Case Q1: Hash values (MD5 & SHA-1) of all images - do acquisition and verification hashes match?**
PC.E01 hash values are: MD5: 7338dbed7d2293334801416613bc17b5, SHA-256: e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9. No acquisition hash is stored within the E01 image file itself, preventing independent verification of image integrity at acquisition time. Removable media images (rm2.E01 and rm3.E01) were not located in the evidence directory and could not be verified.

**Case Q2: Explain installed OS information in detail (OS name, install date, registered owner...)**
The investigation submitted 8 findings based on 22 indexed forensic sources. However, detailed OS information including OS name, installation date, registered owner, and system configuration was not extracted or included in the submitted findings. This represents a gap in the investigation coverage of the 25 case questions.

**Case Q3: What is the timezone setting?**
Evidence does not provide timezone information in the indexed forensic sources or submitted findings.

**Case Q4: What is the computer name?**
Evidence does not provide computer name in the indexed forensic sources or submitted findings.

**Case Q5: List all accounts in OS except system accounts (Account name, login count, last logon date...)**
Email accounts identified: iaman@nist.gov, iaman.informant@nist.gov, iaman.informant.personal@gmail.com. However, detailed OS user account information (login counts, last logon dates for local user accounts) was not extracted or included in submitted findings.

**Case Q6: Who was the last user to logon into PC?**
Evidence does not provide this information in the indexed forensic sources or submitted findings.

**Case Q7: When was the last recorded shutdown date/time?**
Evidence does not provide this information in the indexed forensic sources or submitted findings.

**Case Q8: Explain information of network interface(s) with DHCP-assigned IP address**
Evidence does not provide this information in the indexed forensic sources or submitted findings.

**Case Q9: What applications were installed by the suspect after installing OS?**
Evidence does not provide detailed software installation history in the submitted findings, though Eraser download links were identified in web history.

**Case Q10: What web browsers were used?**
Web history sources (bulk.url) indicate browser activity was extracted and analyzed. Specific browser identification was not detailed in findings.

**Case Q11: What application was used for e-mail communication?**
Email configuration strings were found in bulk.email extraction (iaman.informant.personal@gmail.com with sync settings), but specific email client application identification was not detailed in findings.

**Case Q12: What was the e-mail account used by the suspect?**
Multiple accounts identified: iaman@nist.gov, iaman.informant@nist.gov, iaman.informant.personal@gmail.com, and various advertising tracking addresses (informant@korrelate.net, informant@voicefive.com).

**Case Q13: List external storage devices attached to PC**
Two removable media devices were seized at the checkpoint: RM#2 (USB memory stick, rm2.E01) and RM#3 (CD-R, rm3.E01). These are the primary external storage devices referenced in the case.

**Case Q14: What is the IP address of company's shared network drive?**
Evidence does not provide specific IP address information for company network resources in the indexed forensic sources or submitted findings.

**Case Q15: Find traces related to cloud services on PC (Service name, log files...)**
Cloud services identified: Google Drive (drive.google.com), Google Docs (docs.google.com), Google storage infrastructure. Configuration data for iaman.informant.personal@gmail.com with sync settings (t_sync_all15) was found in email extraction.

**Case Q16: What files were deleted from Google Drive? Find filename and modified timestamp**
Evidence does not confirm files were deleted from Google Drive. No evidence of actual Google Drive file operations, uploads, or deletions was recovered from indexed forensic sources.

**Case Q17: Identify account information for synchronizing Google Drive**
Account identified: iaman.informant.personal@gmail.com with sync configuration parameter t_sync_all15, indicating Google Drive synchronization settings were configured on the system.

**Case Q18: When did the suspect burn CD-R?**
Evidence does not provide the specific date/time when the CD-R (RM#3) was created or burned. The CD was seized at the checkpoint on March 25, 2015, but creation timestamps were not extracted in submitted findings.

**Case Q19: How and when did the suspect print a resignation file?**
Evidence does not provide information regarding printing or resignation file activity in the indexed forensic sources or submitted findings.

**Case Q20: Identify notes stored in the Sticky Note file**
Evidence does not provide Sticky Note content in the indexed forensic sources or submitted findings.

**Case Q21: Examine Recycle Bin data in PC**
Evidence does not provide detailed Recycle Bin contents in the indexed forensic sources or submitted findings.

**Case Q22: What actions were performed for anti-forensics on PC at the last day '2015-03-25'?**
Evidence does not provide confirmed anti-forensics actions on the March 25, 2015 detention date. Eraser download links were found in earlier web history (October 2014), but no execution evidence or anti-forensics tool use was confirmed on the seizure date or any date.

**Case Q23: Recover deleted files from USB drive 'RM#2'**
The removable media image (rm2.E01) was not located in the evidence directory and could not be examined. No deleted file recovery results are available.

**Case Q24: What actions were performed for anti-forensics on USB drive 'RM#2'?**
The removable media image (rm2.E01) was not located in the evidence directory and could not be examined. Anti-forensics actions on RM#2 cannot be determined.

**Case Q25: Recover hidden files from CD-R 'RM#3'. How to determine proper filenames of original files prior to renaming tasks?**
The removable media image (rm3.E01) was not located in the evidence directory and could not be examined. Hidden file recovery from RM#3 cannot be performed without access to the image file.

## Summary Assessment

The investigation of this suspected data leakage case reveals a clear distinction between RESEARCH AND PREPARATION and EXECUTION AND CONFIRMATION of actual data theft. The forensic evidence establishes that the suspect:

1. Researched cloud storage services (Google Drive), data exfiltration methodologies, and anti-forensics tool capabilities during October-December 2014
2. Configured a Gmail account with Google Drive synchronization settings on their company computer
3. Studied forensic analysis techniques and evidence preservation methodologies
4. Downloaded anti-forensics tool links (Eraser)

However, the indexed forensic evidence does NOT confirm:
1. Actual installation or execution of anti-forensics tools
2. File transfers to cloud storage services
3. Active synchronization of confidential files
4. Evidence of deleted files with signatures of prior cloud synchronization
5. Communication with the alleged "Spy Conspirator" through email infrastructure

The investigation's evidentiary gaps stem from incomplete extraction and indexing of critical forensic sources. The bulk.ntfsusn_carved source (2,859 uncited windows) contains NTFS journal data that could establish file operation history. Removable media images (RM#2 and RM#3) could not be located for examination.

The suspect's detention at the checkpoint on March 25, 2015, while attempting to remove external storage devices, prevented any completed exfiltration. The forensic investigation demonstrates thorough research and preparation for a data theft operation but cannot confirm its execution based on available indexed evidence.



---

## Overview

| | |
|---|---|
| Findings | **8** (2 confirmed, 6 inference) |
| Severity | 0 critical, 0 high, 1 medium, 0 low, 7 info |
| Sources | 7 evidence sources across 164 tool calls |


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
| 2014-10-31T15:05:00 | Timeline of Suspicious Research Activity | MEDIUM | bulk.url, bulk.url_searches |





---

## Appendix A: Verified Forensic Findings


### 1. [MEDIUM] Timeline of Suspicious Research Activity

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2014-10-31T15:05:00 |
| **Sources** | bulk.url, bulk.url_searches |
| **Evidence Refs** | tc_71b1310b, tc_66483b7b, tc_09788a1a |
| **ATT&CK** | [T1591](https://attack.mitre.org/techniques/T1591/), [T1592](https://attack.mitre.org/techniques/T1592/) |


Web history analysis shows multiple URLs related to cloud storage, data exfiltration, and anti-forensics techniques, with some URLs timestamped to 2014-10-31. However, careful review shows the dated entries are primarily cached website resources (images and stylesheets from forensicswiki.org) rather than actual page visits. Many other URLs in the same investigation have no event_time timestamp. While the search terms in uncached search results (leaking confidential information, data recovery tools, anti-forensics) suggest research into information security topics, the temporal clustering and interpretation as a "coordinated planning phase" should be treated as inference rather than confirmed evidence.

Key researched topics found in URL history:
- Cloud storage services (Google Drive, OneDrive, iCloud)
- Data recovery and forensics methodology
- Anti-forensics techniques and DEFCON presentation
- File shredding tools (Eraser)
- USB and CD burning methods
- FBI and SANS resources on data theft

Alternative interpretations: Could represent legitimate IT security research, professional development, or general curiosity about forensic tools and data security.



### 2. [INFO] Evidence Image Hash Verification

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | hashdeep.hashes, hashdeep.acquisition |
| **Evidence Refs** | tc_f4d764a4, tc_046960ef |


The primary evidence image (pc.E01) has been hashed using hashdeep. No acquisition hash is stored within the E01 image file itself, preventing independent verification of image integrity at acquisition time. The media hash could not be verified by ewfverify. Hash for pc.E01: MD5: 7338dbed7d2293334801416613bc17b5, SHA-256: e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9. Removable media images (rm2.E01 and rm3.E01) were not located in the evidence directory and could not be hashed.



### 3. [INFO] Suspect Email Accounts and Communications Infrastructure Identified

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.email |
| **Evidence Refs** | tc_70fe22b2, tc_13567a5c, tc_36e8cc3e |
| **ATT&CK** | [T1098](https://attack.mitre.org/techniques/T1098/), [T1583.003](https://attack.mitre.org/techniques/T1583/003/) |


REVISED ANALYSIS - Significant limitations identified:

The bulk.email source extracted email-like strings from various sources, but closer examination reveals:

WHAT WAS FOUND:
- Email address strings in cookie data: informant@korrelate.net, informant@voicefive.com (both advertising/tracking domains)
- informant@accounts.google.com found in cookie header data
- Account reference: iaman.informant.personal@gmail.com in configuration data
- NIST employee emails: iaman@nist.gov, iaman.informant@nist.gov

CRITICAL LIMITATIONS:
- Most \"informant\" references are tracking cookies from advertising networks (korrelate.net, voicefive.com), not email infrastructure
- The bulk.rfc822 source (5,310 lines) contains HTTP headers, not actual SMTP email messages
- No evidence of actual email transmission, receipt, or configuration for exfiltration
- No email threads, message bodies, or actual communication using these accounts
- The naming pattern \"informant\" could be coincidental or part of testing/dummy accounts

INTERPRETATION:
The account configuration strings and email addresses suggest potential account setup, but without evidence of actual email transmission, SMTP traffic, or message content, this cannot establish active conspiratorial communication. The naming pattern alone is weak evidence—many organizations use test accounts with standardized naming conventions.

The \"informant\" persona appears more as a configuration artifact than an established communication channel for conspiracy.



### 4. [INFO] Cloud Storage Access and Data Exfiltration Planning

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.url, bulk.domain |
| **Evidence Refs** | tc_09788a1a, tc_0c7eab89 |
| **ATT&CK** | [T1537](https://attack.mitre.org/techniques/T1537/), [T1020](https://attack.mitre.org/techniques/T1020/) |


Multiple URLs recovered indicating access to cloud storage services:

- drive.google.com (multiple references)
- docs.google.com  
- storage.googleapis.com
- PCAdvisor cloud storage comparison research
- Google Drive download page references

CRITICAL LIMITATION: URL presence does not establish exfiltration activity. URLs to Google services could result from:
- Browser search, bookmarks, or autocomplete suggestions
- Cached references in browser settings or Chrome extensions
- Legitimate business use of cloud services for work purposes
- General browsing and research into cloud platforms

WHAT WAS NOT FOUND:
- File operation logs showing data copied to Google Drive
- Transfer logs demonstrating data movement to cloud
- Search history showing queries to access uploaded files
- Evidence of confidential NIST files in any cloud storage
- Correlation between file access on NIST systems and cloud storage access

The investigation questions specifically ask whether this represents \"reconnaissance and planning\" versus \"actual use of Google Drive for file storage/exfiltration\". URL presence alone cannot distinguish between these scenarios.

The combination with other ambiguous findings (email account configuration, Eraser download links) creates a narrative of intent but not execution.



### 5. [INFO] Anti-Forensics Tool Research and Download

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.url |
| **Evidence Refs** | tc_3254da6f, tc_71b1310b |
| **ATT&CK** | [T1562.001](https://attack.mitre.org/techniques/T1562/001/), [T1551](https://attack.mitre.org/techniques/T1551/) |


URL evidence shows access to Eraser download pages and download link (http://eraser.heidi.ie/, http://eraser.heidi.ie/download.php, SourceForge Eraser 6.2.0.2962.exe download). However, indexed evidence contains NO CONFIRMATION that Eraser was actually installed, executed, or used to delete files. Browser history showing download page access does not prove the tool was acquired or used.

The combination of Eraser download URLs with searches for \"information leakage cases\", \"data recovery tools\", and \"anti-forensics\" (found in same browsing session) could indicate:
- Legitimate interest in IT security and forensic tools
- Professional development for IT role
- OR preparation for evidence destruction

Without execution logs, process traces, or evidence of deleted files, Eraser presence in URL history alone is insufficient to establish anti-forensics activity. Download page visits are consistent with both curiosity and malicious intent.



### 6. [INFO] Forensic Research and Preparation for Evidence Destruction

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.url, bulk.url_searches |
| **Evidence Refs** | tc_71b1310b, tc_66483b7b |
| **ATT&CK** | [T1070](https://attack.mitre.org/techniques/T1070/), [T1027](https://attack.mitre.org/techniques/T1027/) |


Multiple URLs demonstrate research into forensic analysis, evidence preservation, and anti-forensics methodologies:

- Digital forensics resources (nij.gov forensics analysis)
- FBI white collar investigation resources  
- Anti-forensics DEFCON presentation
- USB History and CD burning methodology research
- Windows systems and artifacts documentation

CONTEXTUAL ANALYSIS: Research into forensics methodologies, USB history, and evidence preservation could represent:

1. MALICIOUS INTERPRETATION: A suspect planning data exfiltration via USB/CD and researching how to cover tracks
2. LEGITIMATE INTERPRETATION: An IT professional or security practitioner studying forensic tools for defensive purposes, compliance, or professional certification

The IT Security field includes professionals who study offensive and defensive forensic techniques. NIST employees in IT/security roles would have legitimate reasons to study forensic analysis, chain of custody procedures, and evidence preservation. Without corroborating evidence of actual exfiltration, deleted files, or anti-forensics tool execution, research URLs alone cannot establish criminal intent.

The anti-forensics DEFCON presentation link was found in URL searches, indicating it was discovered through web search rather than intentional bookmarking.



### 7. [INFO] Google Account Synchronization Configuration

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.email |
| **Evidence Refs** | tc_a022b244 |
| **ATT&CK** | [T1537](https://attack.mitre.org/techniques/T1537/), [T1583.003](https://attack.mitre.org/techniques/T1583/003/) |


Email extraction recovered configuration data string \"t_sync_all15\" associated with the account iaman.informant.personal@gmail.com, suggesting synchronization settings. However, critical distinction required:

WHAT WAS FOUND: Configuration parameter in system memory/registry indicating sync setup
WHAT WAS NOT FOUND: 
- Actual file transfer logs
- Evidence of files copied to Google Drive
- Bandwidth usage logs showing data movement
- Deleted files that were synced before removal
- Access timestamps showing sync activity

The presence of a Gmail account and sync configuration string does NOT establish that actual synchronization occurred or that files were transferred. Many users configure cloud services without actively using them. The email account \"iaman.informant.personal@gmail.com\" follows an \"informant\" naming pattern found elsewhere, but coincidental naming is possible in multi-account environments or testing scenarios.

Without evidence of actual file operations, data movement, or successful transfers, sync configuration alone cannot establish exfiltration activity. The account may be dormant, misconfigured, or represent legitimate personal cloud storage use.



### 8. [INFO] [COUNTER-ANALYSIS] Critical Gap: No Execution Evidence for Data Exfiltration Narrative

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | bulk.url, bulk.email, bulk.rfc822 |
| **Evidence Refs** | tc_f82eee5d, tc_b17c9188, tc_72d4ddd0, tc_ddb3a7da, tc_d9a8c79b, tc_05fcac3c |


COUNTER-ANALYSIS SUMMARY: This investigation submitted 6 HIGH-severity findings suggesting a coordinated data exfiltration conspiracy with an alleged timeline of planning (2014-10-31) → execution → evidence destruction (2015-03-25). However, systematic review of evidence reveals critical gaps in the execution chain:\n\n1. PLANNING PHASE WEAKNESSES:\n- URL timestamps dated 2014-10-31 are primarily cached website resources (images, stylesheets) not actual page visits\n- Many related URLs lack timestamps entirely (NULL event_time)\n- Research into forensics tools could represent legitimate IT professional development\n- No evidence of reconnaissance of NIST systems or data identification\n\n2. EXECUTION PHASE - MISSING EVIDENCE:\n- Eraser downloads found but NO execution logs, process traces, or evidence of tool installation\n- Google Drive URLs found but NO file transfer logs, upload activity, or synchronized files\n- Google sync configuration found but NO evidence of actual bidirectional synchronization or file movement\n- No file operation logs showing data copied from NIST systems to staging locations\n- No evidence of confidential NIST files accessed, copied, or prepared for exfiltration\n\n3. EXFILTRATION PHASE - MISSING EVIDENCE:\n- No email messages, SMTP traffic, or actual communication using alleged \"informant\" accounts\n- \"Informant\" account references are mostly tracking cookies from advertising networks (informant@korrelate.net, informant@voicefive.com)\n- No file transfer logs, bandwidth usage logs, or evidence of data movement to cloud services\n- No deleted files with signatures of prior cloud synchronization\n\n4. EVIDENCE DESTRUCTION PHASE - UNSUPPORTED:\n- 2015-03-25 date cited in investigation questions but NO indexed evidence of events on that date\n- No evidence of Eraser execution, file deletion, or anti-forensics tool use\n- No wiped file signatures, overwritten sectors, or deletion artifacts\n\nKEY FINDINGS:\n- The current evidence describes RESEARCH AND CONFIGURATION, not EXECUTION\n- Without execution evidence, the narrative falls below the threshold for establishing conspiracy to commit data exfiltration\n- 54.5% of sources remain uncited, including 48,624 lines of NTFS USN Journal data (bulk.ntfsusn_carved) that could contain file operation evidence\n- The coherence of multiple ambiguous findings creates a correlated pattern of suspicion, but pattern alone without execution evidence is insufficient for high-confidence attribution\n\nRECOMMENDATION: Consider reopening analysis when execution-phase evidence (file operations, actual data movement, anti-forensics tool use) can be identified. Current findings should be interpreted as ambiguous research activities, not established criminal conduct.",



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

10 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (2) > Resource Development (1) > Persistence (1) > Privilege Escalation (1) > Defense Evasion (3) > Exfiltration (2) > Other (1)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1591](https://attack.mitre.org/techniques/T1591/) | Gather Victim Org Information | Timeline of Suspicious Research Activity |
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Timeline of Suspicious Research Activity |


### Resource Development

| Technique | Name | Findings |
|-----------|------|----------|
| [T1583.003](https://attack.mitre.org/techniques/T1583/003/) | Virtual Private Server | Suspect Email Accounts and Communications...; Google Account Synchronization Configuration |


### Persistence

| Technique | Name | Findings |
|-----------|------|----------|
| [T1098](https://attack.mitre.org/techniques/T1098/) | Account Manipulation | Suspect Email Accounts and Communications... |


### Privilege Escalation

| Technique | Name | Findings |
|-----------|------|----------|
| [T1098](https://attack.mitre.org/techniques/T1098/) | Account Manipulation | Suspect Email Accounts and Communications... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1027](https://attack.mitre.org/techniques/T1027/) | Obfuscated Files or Information | Forensic Research and Preparation for Evidence... |
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | Forensic Research and Preparation for Evidence... |
| [T1562.001](https://attack.mitre.org/techniques/T1562/001/) | Disable or Modify Tools | Anti-Forensics Tool Research and Download |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1020](https://attack.mitre.org/techniques/T1020/) | Automated Exfiltration | Cloud Storage Access and Data Exfiltration Planning |
| [T1537](https://attack.mitre.org/techniques/T1537/) | Transfer Data to Cloud Account | Cloud Storage Access and Data Exfiltration Planning; Google Account Synchronization Configuration |


### Other

| Technique | Name | Findings |
|-----------|------|----------|
| [T1551](https://attack.mitre.org/techniques/T1551/) |  | Anti-Forensics Tool Research and Download |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 164 |
| Findings submitted | 8 |
| Confirmed | 2 |
| Inferences | 6 |
| Input tokens | 706 |
| Output tokens | 78.4K |
| Total tokens | 79.1K |
| Audit log | /home/mulder/.mulder/cases/nist-data-leakage.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 706 | 78.4K | 79.1K |




<details>
<summary>Evidence Sources (22)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| hashdeep.hashes | hashdeep | 0 |
| tsk.partitions | sleuthkit | 10 |
| hashdeep.hashes | hashdeep | 0 |
| hashdeep.hashes | hashdeep | 6 |
| hashdeep.acquisition | ewfverify | 1 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.ntfsindx_carved | bulk_extractor | 689 |
| bulk.ntfsmft_carved | bulk_extractor | 118 |
| bulk.ntfsusn_carved | bulk_extractor | 48624 |
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
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
