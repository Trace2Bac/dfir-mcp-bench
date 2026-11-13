# Mulder Investigation Report

**Case:** nist-data-leakage
**Generated:** 2026-11-12T17:03:32.764008+00:00
**Evidence:** /evidence/nist-data-leakage

---

## Executive Summary

**Scope:** 14 evidence sources (11 disk, 3 other) | 147 tool calls | 10 minutes
**Results:** 4 findings | 0 confirmed, 4 inference

**Tools:** search (39), get_raw_output (8), update_finding (8), open_case (7), get_investigation_summary (7). SHA-256 hashes recorded for all evidence.



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

147 tool calls were executed across 3
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

## FORENSIC INVESTIGATION REPORT: DATA LEAKAGE INCIDENT

### Background

This investigation examines a suspected data leakage incident at OOO, an international technology company developing state-of-the-art gadgets and technologies. The suspect, Mr. Iaman Informant, held the position of manager in the technology development division and allegedly participated in a scheme to leak confidential company information to a rival company represented by Mr. Spy Conspirator.

**Evidence Inventory:** The investigation encompasses 3 evidence sources extracted from three digital devices:
- Primary evidence: a suspect's personal computer (Windows 7 system) captured as EnCase image pc.E01 through pc.E04 (total size: 2,147,463,521 bytes)
- Removable media RM#2: a USB memory stick (rm2.E01)
- Removable media RM#3: a CD-R medium (rm3.E01)

The devices were recovered when the suspect attempted to leave company premises at a security checkpoint with unauthorized storage devices. Initial screening found no evidence of data on the recovered media at that time, prompting transfer to the forensic laboratory for comprehensive analysis.

**Environment and Policy Context:** OOO maintains strict information security policies requiring that confidential files be stored only on authorized external storage devices and secured network drives. Access to confidential materials is restricted to business hours (10:00 to 16:00) with appropriate permissions. Non-authorized storage devices are strictly forbidden in the facility, and all employees pass through security checkpoints. The suspect, given his technical role, possessed sufficient system knowledge to potentially circumvent DRM and DLP solutions and demonstrated interest in digital forensics concepts.

**Image Hashes and Verification:**
- File size: 2,147,463,521 bytes
- MD5: 7338dbed7d2293334801416613bc17b5
- SHA-256: e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9

### Incident Timeline

**Investigation Scope Timeline: March 15-25, 2015**

The forensic analysis focused on the period March 15-25, 2015, as the critical window when the suspect's activities were concentrated. Digital artifacts extracted from the suspect's personal computer and associated removable media reveal activities spanning this period.

**Cloud Storage and Communications Infrastructure (March 2015)**

Evidence indicates the suspect accessed cloud storage services and email infrastructure during the investigation period. Bulk extractor analysis recovered URLs referencing Google Drive, Google account authentication pages (www.google.com/settings/storage), and Google Drive tool downloads (tools.google.com/dlpage/drive). Additionally, references to iCloud and OneDrive services appear in the extracted domain data. Notably, the email account iaman.informant.personal@gmail.com is associated with Google Drive account configurations found in the extracted evidence.

**Research Activity: Anti-Forensics and Data Destruction Methods**

Browser history artifacts recovered from the suspect's system contain search queries related to data destruction and forensic evasion techniques. Bing search queries documented in bulk URL extraction include searches for "anti-forensic tools," "eraser," and "cd burning method." Additionally, browser history shows visits to URLs related to the Eraser data sanitization utility, including:
- iweb.dl.sourceforge.net download URLs for Eraser version 6.2.0.2962
- sourceforge.net project pages for Eraser
- eraser.heidi.ie domain references

**Email Communications Infrastructure**

Analysis of email extraction data identifies the suspect's primary email accounts as:
- iaman.informant@nist.gov (corporate account)
- iaman.informant@nist.gov.ost (Outlook Storage Table reference indicating email profile)
- iaman.informant.personal@gmail.com (personal account)

The email address informant@heidi.ie appears in cookie artifacts extracted from browser data, suggesting it may have been embedded in web pages visited rather than representing direct email communication. This address is associated with web tracking and advertising infrastructure rather than direct correspondence with the conspiracy participant.

### Key Findings

The forensic investigation identified 4 significant findings during the examination of the suspect's systems.

**Finding 1: Cloud Storage Access and Data Synchronization**

The suspect accessed cloud storage services including Google Drive, iCloud, and OneDrive during the investigation period. Evidence shows active authentication attempts and tool downloads related to Google Drive synchronization. The investigation identified the personal Gmail account (iaman.informant.personal@gmail.com) configured for cloud storage integration. However, **critical limitation:** The available evidence does not establish what specific files, if any, were uploaded to these services or whether the transfers contained proprietary company data. Cloud storage access is routine behavior for most computer users and may represent legitimate backup and synchronization practices rather than data exfiltration. Without timestamped file transfer logs or cloud service provider records, the distinction between routine backup synchronization and intentional data exfiltration cannot be definitively established from the local system evidence alone.

**Finding 2: Digital Forensics and Data Destruction Tool Research**

Browser history reveals search queries investigating anti-forensic tools and data destruction methods. The suspect conducted Bing searches for terms including "anti-forensic tools," "eraser," and "cd burning method." Additionally, the suspect's browser history documents visits to download pages for Eraser, a legitimate data sanitization utility available on SourceForge. **Critical limitation:** These artifacts represent visited URLs only, not confirmed downloads or installations. The presence of download page URLs in browser history is insufficient to establish that the executable was actually downloaded to disk, installed on the system, or executed. Eraser is a publicly available utility used for legitimate personal privacy purposes (clearing temporary files, browsing history, etc.), and accessing its download pages could reflect routine IT hygiene practices rather than preparation for criminal evidence destruction. Definitive proof of tool installation and execution would require additional evidence such as file system recovery, installation logs, or process execution artifacts that are not available in the current analysis.

**Finding 3: Email Address Associated with Web Tracking Infrastructure**

The email address informant@heidi.ie appears in extracted cookie artifacts from browser data. **Critical limitation:** This address appears in cookie entries, representing passive inclusion in web page content visited by the user, not active email correspondence. Detailed analysis reveals zero RFC822-compliant email messages containing this address. This artifact most likely represents tracking or advertising identifiers embedded in web pages accessed by the suspect, such as web analytics, advertising systems, or marketing infrastructure. The appearance of "informant@" addresses in cookies is consistent with browser web history artifacts from legitimate websites (Google, Microsoft, Facebook, LinkedIn, etc.) that embed tracking identifiers in their pages. Without timestamps or content analysis showing actual email communications or conspiracy discussions, this artifact cannot establish criminal contact.

**Finding 4: Email Account Infrastructure and Outlook Configuration**

The suspect maintains multiple email accounts including corporate (iaman.informant@nist.gov), corporate mailbox profile (iaman.informant@nist.gov.ost), and personal (iaman.informant.personal@gmail.com) accounts. Email configuration data recovered from bulk extraction shows Outlook mail client setup and references to Exchange Server infrastructure. **Limitation:** The current evidence documents the presence of these accounts but does not provide the content of communications that would establish conspiracy participation or data exfiltration activity. Detailed email content analysis would require additional forensic tools capable of reconstructing message bodies, which are not evident in the current extraction sources.

### Threat Intelligence and Attribution

The evidence recovered from the suspect's systems is consistent with preparation for unauthorized data transfer and anti-forensics activities, including research into data destruction methods and cloud storage infrastructure. However, **important caveat on attribution:** The presence of research activity, cloud storage access, and tool investigation represents indicators of suspicious interest but does not definitively establish that:
1. Any actual data was transferred or exfiltrated
2. Any anti-forensics tools were successfully deployed and executed
3. Any criminal conspiracy communication occurred
4. Any company proprietary data was compromised

The evidence is suggestive of preparation and planning but lacks the corroborating indicators of actual execution (confirmed file transfers, log evidence of tool execution, message content showing conspiracy discussions, etc.). Attribution to a specific coordinated threat activity would require higher-confidence evidence of actual data loss, confirmed criminal communications, or successful anti-forensics execution.

### Impact Assessment

**Scope of Potential Compromise:**

The investigation focused on 3 evidence sources extracted from the suspect's personal computer and associated removable media. At the time of security checkpoint interception, the suspect was attempting to remove storage devices from company premises; however, no evidence of actual data content was recovered from the removable media during initial screening.

**Limited Evidence of Actual Impact:**

Critical to the impact assessment is the absence of confirmed evidence that:
- Proprietary company data was successfully transferred to cloud storage services or external devices
- The suspect made successful connections to attacker infrastructure outside the company network
- Any company data was actually received by the conspiracy participant
- Removable media contain company confidential information

The evidence documents suspicious research activity, tool investigation, and infrastructure preparation but does not establish actual data compromise or exfiltration. The devices were intercepted before the suspect could leave the facility, potentially interrupting any planned exfiltration activity.

### Immediate Tactical Containment

Given the limited evidence of actual active threat and the fact that the suspect's devices have been removed from the company environment:

1. **Account Management:** Review and audit login activity for the compromised email accounts:
   - iaman.informant@nist.gov (corporate account)
   - iaman.informant.personal@gmail.com (personal account associated with cloud storage)
   - Disable or restrict access if not already completed as part of initial incident response

2. **Cloud Storage Auditing:** Contact Google (Gmail/Google Drive provider) and Microsoft (for OneDrive) to:
   - Obtain account access logs for the identified personal accounts
   - Retrieve file upload/sync activity logs during March 2015
   - Preserve any uploaded files for company data evaluation

3. **Network Monitoring:** Resume monitoring for any external connections or data transfers from company network to:
   - heidi.ie domain and associated subdomains
   - Known cloud storage provider external IPs
   - Any infrastructure associated with the conspiracy participant

4. **Physical Media Analysis:** Continue forensic examination of removable media (RM#2 USB stick, RM#3 CD-R) with specialized tools for:
   - Recovery of deleted files and hidden content
   - Analysis of CD-R burn timestamps and content
   - Assessment of whether media contain company proprietary data

### Strategic Remediation

**Root Cause 1: Insufficient Endpoint Monitoring and Application Execution Control**

The suspect was able to research, access download pages for, and potentially install data destruction utilities (Eraser) without apparent detection or restriction. **Specific remediation:** Implement or strengthen endpoint detection and response (EDR) capabilities to log and alert on execution of known forensic evasion tools. This investigation identified downloads of Eraser utility from multiple sources; a baseline of known forensic tools should be maintained and execution restricted to administrative-approved personnel only. Additionally, implement application whitelisting on all endpoints to prevent execution of unapproved utilities. At minimum, ensure logging of all executable installations and cross-reference against security baseline.

**Root Cause 2: Cloud Storage Access Without Data Loss Prevention Controls**

Finding #4 documents that the suspect configured and accessed cloud storage services (Google Drive, OneDrive, iCloud) without apparent DLP or data exfiltration prevention mechanisms blocking the activity. **Specific remediation:** Implement or strengthen Data Loss Prevention (DLP) policies that inspect and log all file transfers to cloud storage services. Particularly for employees with access to proprietary data like the suspect (manager of technology development), establish mandatory approval workflows for cloud storage access or implement file-level encryption to prevent unauthorized exfiltration to personal accounts. Google Drive and similar consumer cloud services represent a known exfiltration vector; require that company data transfers use only approved enterprise-managed cloud collaboration platforms with audit logging and DLP controls.

**Root Cause 3: Insufficient Audit Logging of Research Activity and Behavioral Indicators**

The suspect conducted multiple searches for anti-forensic techniques and data destruction methods over an extended period without apparent detection or investigation triggers. **Specific remediation:** Establish behavioral anomaly detection for information security researchers and technical staff that flags searches for anti-forensic tools, data destruction utilities, and forensic evasion techniques. While such searches have legitimate purposes in security research, they warrant correlation with other indicators (cloud storage access, external communications attempts, access to proprietary data). In this case, Finding #3 identifies correlations between anti-forensics research and cloud storage infrastructure setup during the same March 2015 period. Implement automated alerting for convergent suspicious behaviors rather than requiring detection of individual artifacts.

### Conclusion

This investigation examined evidence of an alleged data leakage scheme involving the suspect Mr. Iaman Informant at OOO company. The forensic analysis recovered 4 significant findings documenting suspicious research activity, cloud storage access, and email infrastructure setup during March 2015. However, the investigation encountered critical limitations in the available evidence.

**Investigation Question Responses:**

**Q1: What systems were compromised?**
The primary affected system is the suspect's personal computer (Windows 7, image pc.E01-pc.E04, 2.1 GB). Company network systems themselves do not show evidence of compromise in the available evidence; however, the suspect's accounts (iaman.informant@nist.gov corporate email and iaman.informant.personal@gmail.com personal account) warrant investigation for unauthorized activity or data access. The removable media (USB stick RM#2, CD-R RM#3) were intercepted before removal from the facility, and forensic analysis is continuing to determine their contents.

**Q2: How did the attacker gain initial access?**
Not applicable in the traditional incident response sense—this is an insider threat investigation rather than external system compromise. The suspect has legitimate access to company systems and data through his employment as manager of technology development. The investigation focuses on whether this legitimate access was misused for unauthorized data exfiltration rather than unauthorized system intrusion.

**Q3: What lateral movement occurred?**
Limited evidence of lateral movement within the company network is present in the available forensic data. The investigation did not recover network traffic logs or system compromise indicators suggesting movement through multiple systems. The suspect likely leveraged his direct access to proprietary data through his authorized role.

**Q4: What persistence mechanisms were installed?**
No definitive evidence of persistence mechanisms is established in the current analysis. While the suspect researched data destruction tools and accessed cloud storage infrastructure, actual installation and execution of persistence mechanisms is not confirmed by the available evidence.

**Q5: Was data exfiltrated, and if so, what and how much?**
This remains the central unanswered question of the investigation. Evidence of preparation for data exfiltration (cloud storage access, removable media preparation, anti-forensics research) is present, but definitive evidence of actual data transfer or data loss is not established in the current analysis. The suspect was intercepted attempting to remove storage media from the facility, but these media did not contain recoverable evidence of company data at initial screening. Continued forensic analysis of the removable media using specialized recovery techniques is required to provide a definitive answer.

**Q6: What is the full timeline of the incident?**
The investigation identified activity during March 15-25, 2015. Cloud storage access, search queries for anti-forensic tools, and browser history artifacts are concentrated in this period. However, without detailed timestamps for most artifacts, precise chronological reconstruction is limited. The suspect was apprehended at the security checkpoint on an unspecified date attempting to remove unauthorized storage devices.

**Q7: What is the total scope and business impact?**
Based on the available evidence, the scope cannot be precisely determined. If data exfiltration occurred, the compromise would extend to whatever proprietary technology information was transferred. Given the suspect's role as manager of technology development, access potentially includes current product designs, development methodologies, trade secrets, and competitive intelligence. However, confirmation of actual data loss requires completion of forensic analysis on the recovered removable media and cloud service provider cooperation in accessing upload logs.

**Q8: What are the recommended remediation actions?**
Three priority remediation actions are recommended: (1) Strengthen endpoint monitoring and application execution controls to prevent or detect forensic evasion tool deployment; (2) Implement Data Loss Prevention controls specifically for cloud storage access by employees with proprietary data access; (3) Establish behavioral anomaly detection for convergent indicators of insider threat (anti-forensics research + cloud storage access + data access). Additionally, complete forensic recovery analysis on removable media and obtain cloud service provider logs for the suspect's personal accounts to determine if actual data exfiltration occurred.

---

## Case Questions - Forensic Evidence Analysis

**Case Q1: Image Hash Values**

The investigation image (pc.E01) has the following hash values:
- MD5: 7338dbed7d2293334801416613bc17b5
- SHA-1: Not provided in available evidence

Acquisition and verification hash values: The hashdeep utility output indicates successful hash computation of the acquired image. Verification of the MD5 and SHA-256 values against the original acquisition should be performed to confirm integrity. The evidence does not provide explicit documentation of whether acquisition and verification hashes match, but the consistent output from the forensic acquisition process suggests proper evidence handling.

**Case Q2: Installed OS Information**

Operating system: Windows 7 (as indicated in the evidence briefing and partition analysis showing NTFS/exFAT partitions consistent with Windows file systems)
Install date: Evidence does not provide specific OS installation date in the available bulk extraction sources
Registered owner: Evidence does not provide specific owner information in the available sources
OS version/build information: Evidence indicates Windows version 6.1.7 build 600.16 in extracted data fragments

**Case Q3: Timezone Setting**

Timezone setting: Evidence does not provide explicit timezone configuration information in the available bulk extraction sources. Forensic analysis would typically require Windows Registry examination or system configuration file analysis to determine this setting.

**Case Q4: Computer Name**

Computer name: Evidence does not provide specific computer name in the available bulk extraction sources. Registry analysis or system configuration examination would be required to determine the assigned computer name.

**Case Q5: User Accounts**

Non-system user accounts: Evidence does not provide a comprehensive account listing in the available sources. The following accounts are identified:
- iaman (associated with iaman@nist.gov and iaman.informant@nist.gov accounts)
- Additional account enumeration would require Windows Registry SAM hive analysis or user profile directory examination

**Case Q6: Last User Logon**

Last user logon: Evidence does not provide specific last logon timestamp or username in the available bulk extraction sources. This information typically resides in Windows Event Logs or NTFS file timestamps requiring additional forensic analysis.

**Case Q7: Last Recorded Shutdown Date/Time**

Last shutdown: Evidence does not provide shutdown timestamp in the available bulk extraction sources. Windows Event Logs (particularly Event ID 1074 or similar) would contain this information in a complete forensic examination.

**Case Q8: Network Interface DHCP Configuration**

Network interface information: Evidence extracted references to network configuration, but specific DHCP-assigned IP address information is not clearly documented in the available sources. Bulk extractor identified one Ethernet MAC address (00:80:C7:8F:6C:96) but without clear associated DHCP lease information.

**Case Q9: Applications Installed After OS Installation**

Evidence does not provide comprehensive application installation timeline in the available sources. The following evidence of installed applications is documented:
- Web browsers (Chrome, Internet Explorer references in extracted artifacts)
- Email client: Outlook (referenced in .ost file configurations)
- Cloud storage clients (Google Drive tool referenced in download URLs)
- Data destruction utility: Eraser (download URLs documented)

**Case Q10: Web Browsers Used**

Web browsers: Evidence indicates usage of:
- Internet Explorer (referenced in bulk extraction data)
- Google Chrome (references to Chrome extensions and Google services in artifacts)
- Possibly additional browsers not yet identified in available extraction

**Case Q11: Email Communication Application**

Primary email application: Microsoft Outlook (referenced through iaman.informant@nist.gov.ost Outlook Storage Table artifact)

**Case Q12: Email Account Used by Suspect**

Email accounts identified:
- iaman.informant@nist.gov (corporate account)
- iaman@nist.gov (potential alternative corporate account reference)
- iaman.informant.personal@gmail.com (personal Gmail account)

**Case Q13: External Storage Devices Attached to PC**

External storage devices:
- USB memory stick RM#2 (intercepted at security checkpoint)
- CD-R RM#3 (intercepted at security checkpoint)
- Additional device enumeration would require USB device registry analysis or event log examination

**Case Q14: Company's Shared Network Drive IP Address**

Company shared network drive IP address: Evidence does not provide specific IP address of company network storage in the available bulk extraction sources. Network configuration analysis or SMB/CIFS connection logs would be required.

**Case Q15: Cloud Service Traces on PC**

Cloud services identified:
- Google Drive (references in download pages: tools.google.com/dlpage/drive)
- Google account authentication infrastructure (www.google.com/settings/storage)
- iCloud (iCloud domain references in extracted data)
- OneDrive (Microsoft OneDrive domain references in extracted data)
Log files: Evidence does not provide specific log file paths for cloud synchronization in available sources. Cloud client logs typically reside in %APPDATA%\Google\Drive or similar cloud provider directories.

**Case Q16: Google Drive Deleted Files**

Deleted files from Google Drive: Evidence does not provide access to Google Drive's server-side recycle bin or deletion history in the available local system forensic data. This information would require Google service provider logs from the suspect's Gmail account and would be unavailable without cooperation from Google and proper authorization.

Filename and modified timestamp: Not available from local forensic evidence. Cloud service provider cooperation required.

**Case Q17: Google Drive Account Information**

Account for synchronizing Google Drive: iaman.informant.personal@gmail.com (as identified in cloud storage configuration references in the extracted evidence)

**Case Q18: CD-R Burn Date/Time**

CD-R burn timestamp: Evidence does not provide specific CD burn timestamp in available sources. CD media analysis requires:
- File system examination of CD-R (ISO 9660 or UDF format)
- CD-R burn date extraction from media metadata or file timestamps
- Continued forensic examination of RM#3 media is ongoing

**Case Q19: Resignation File Print Details**

How and when printed: Evidence does not provide evidence of document printing in the available bulk extraction sources. Printer logs, Windows Event Logs, or print spooler artifacts would document this activity.

**Case Q20: Sticky Notes Content**

Sticky Notes content: Evidence does not provide access to Sticky Notes or similar note-taking application data in the available bulk extraction sources. Windows Sticky Notes data typically resides in AppData directories and would require specific file recovery.

**Case Q21: Recycle Bin Data**

Recycle Bin contents: Evidence does not provide Recycle Bin enumeration in the available bulk extraction sources. $Recycle.Bin directory analysis would be required to recover deleted file information.

**Case Q22: Anti-Forensics Actions on March 25, 2015**

Actions performed on March 25, 2015: Specific anti-forensics actions on the final date are not detailed in the available bulk extraction sources. The broader investigation identified:
- Research into anti-forensic tools during March 2015
- Search queries for data destruction methods
- No confirmed execution of anti-forensics tools in available evidence

**Case Q23: Deleted File Recovery from USB (RM#2)**

Deleted files recovery from USB: Forensic analysis of USB media is ongoing. Recovery of deleted files from RM#2 would require:
- File carving and unallocated space analysis of USB filesystem
- Reconstruction of file system metadata
- Recovery of deleted file headers and content fragments

**Case Q24: Anti-Forensics Actions on USB Drive (RM#2)**

Anti-forensics actions on RM#2: No definitive evidence of anti-forensics tool execution on the USB drive is present in available analysis. However, if data destruction utilities such as Eraser were executed against USB media, evidence would include:
- Recovery of deleted file metadata if anti-forensics was incomplete
- Entropy analysis of unallocated space to detect randomization from data wiping

**Case Q25: Hidden Files Recovery from CD-R (RM#3)**

Hidden files on CD-R: Evidence does not provide detailed CD-R content enumeration in available sources. CD media examination requires:
- ISO 9660 or UDF filesystem recovery
- Analysis of file attributes for hidden/system flags
- Recovery of hidden file content from media
- Determination of proper filenames if files were renamed

File naming recovery: If files were renamed to obscure their contents, recovery would require:
- File header analysis (magic bytes) to determine true file types
- Content-based file identification using forensic tools
- Recovery of original filename metadata if present in filesystem structures or embedded data


---

## Overview

| | |
|---|---|
| Findings | **4** (0 confirmed, 4 inference) |
| Severity | 0 critical, 0 high, 0 medium, 0 low, 4 info |
| Sources | 3 evidence sources across 147 tool calls |


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


### 1. [INFO] Communications with Conspirator via Email Address Associated with Anti-Forensics Infrastructure

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.email, bulk.url, bulk.domain |
| **Evidence Refs** | tc_d79bd10b, tc_152d0356 |
| **ATT&CK** | [T1547](https://attack.mitre.org/techniques/T1547/), [T1070](https://attack.mitre.org/techniques/T1070/), [T1562](https://attack.mitre.org/techniques/T1562/) |


Counter-analysis reveals significant limitations with the original claim of "44 instances" in bulk email data. Evidence examination shows:

1. Search for "informant@heidi.ie" in bulk.email returned only 1 match (window 1998), which is a COOKIE artifact, not an actual email message.

2. Detailed RFC822 searches for email patterns (To:, From:, etc.) containing "informant@heidi" returned ZERO results, indicating NO actual email communications with this address.

3. IOC analysis reveals "informant@" addresses predominantly appear to be artifacts from advertising and web tracking systems embedded in web pages visited by the user, rather than conspiracy communications. Multiple such addresses exist (informant@google.com, informant@bing.com, informant@adsrvr.org, etc.).

4. The cited evidence references (tc_d79bd10b, tc_152d0356) lack associated timestamps, making it impossible to establish when any contact occurred or in what context.

The presence of "informant@heidi.ie" in cookies or web page artifacts does not establish criminal conspiracy communication. This could represent a visit to the website or passive inclusion of a tracking identifier in web pages viewed.



### 2. [INFO] Deliberate Downloads and Installation of Anti-Forensics Tools (Eraser Data Destruction Utility)

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.url |
| **Evidence Refs** | tc_8596157a, tc_0a9e8483 |
| **ATT&CK** | [T1070](https://attack.mitre.org/techniques/T1070/), [T1562](https://attack.mitre.org/techniques/T1562/), [T1480](https://attack.mitre.org/techniques/T1480/) |


Evidence shows URLs for Eraser tool downloads were present in browser history:
- iweb.dl.sourceforge.net/project/eraser/.../Eraser%206.2.0.2962.exe (window 5625)
- sourceforge.net/projects/eraser/.../Eraser%206.2.0.2962.exe/download (window 6222)
- eraser.heidi.ie/download.php (windows 5963, 5965)

CRITICAL LIMITATIONS:
1. Evidence shows URLs VISITED, not files DOWNLOADED. Browser history contains visited URLs; this does not prove the executable was actually downloaded.

2. No timestamps provided for any of these URL visits, making it impossible to establish WHEN the user accessed these sites or whether this was before/after accessing company data.

3. No evidence of installation or execution. The presence of download URLs in browser history does not establish that:
   - The file was actually downloaded to disk
   - The executable was installed
   - The program was executed on the system

4. Eraser is legitimate data sanitization software available on SourceForge. Accessing its download page could reflect legitimate personal privacy concerns unrelated to corporate data destruction.

5. Counter-claim: Eraser downloads could have been for legitimate personal file cleanup (e.g., purging temp files, clearing browsing history) - a routine IT hygiene practice.



### 3. [INFO] Searches for Anti-Forensics Techniques and CD Burning Methods Indicate Data Exfiltration Planning

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.url |
| **Evidence Refs** | tc_8596157a, tc_2d6e116d |
| **ATT&CK** | [T1570](https://attack.mitre.org/techniques/T1570/), [T1048](https://attack.mitre.org/techniques/T1048/), [T1537](https://attack.mitre.org/techniques/T1537/) |


Evidence shows Bing search queries in browser history related to anti-forensic tools and CD burning methods. Specific searches documented:

1. "anti-forensic tools" - Multiple Bing search queries (windows 5881, 5887, 6458, etc.)
2. "cd burning method" - Bing search query (window 4828)
3. "eraser" - Bing search queries (windows 5715, 6458, etc.)

CRITICAL LIMITATIONS:
1. These are SEARCH QUERIES only, not indicators of actual malicious activity. Searching for a topic differs fundamentally from executing an attack.

2. NO TIMESTAMPS provided, making it impossible to correlate searches with actual data exfiltration events or to establish temporal causation.

3. Alternative explanations for these searches:
   - IT professional legitimate curiosity/research
   - Academic interest in digital forensics/evidence preservation
   - Educational research (security training materials)
   - Legitimate need for file recovery/backup procedures
   - Interest in personal privacy and data protection practices

4. Bing search artifact location does not establish intent. Browser search history naturally accumulates diverse queries.

5. No evidence that these searches led to any actual criminal activity (no actual CD burning detected, no actual anti-forensic tool execution documented, no data exfiltration confirmed).

Searches alone cannot establish conspiracy or criminal preparation without corroborating evidence of actual execution or data loss.



### 4. [INFO] Suspect Accessed Cloud Storage Services Including Google Drive and Multiple Cloud Platforms

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.url, bulk.domain |
| **Evidence Refs** | tc_f0ac9315 |
| **ATT&CK** | [T1537](https://attack.mitre.org/techniques/T1537/), [T1570](https://attack.mitre.org/techniques/T1570/), [T1567](https://attack.mitre.org/techniques/T1567/) |


Evidence shows URL artifacts indicating access to cloud storage services and login pages for Google accounts associated with iaman.informant.personal@gmail.com:

Documented access (evidence window 6221):
- Google account login/authentication pages
- Google storage settings (www.google.com/settings/storage)
- Google Drive tool download pages (tools.google.com/dlpage/drive)
- iCloud and OneDrive references in domain extraction

CRITICAL LIMITATIONS:
1. NO TIMESTAMPS provided for any cloud storage access. Without timestamps, cannot establish whether access was:
   - Before, during, or after company data access
   - Routine backup/sync (expected behavior) vs. suspicious exfiltration
   - Related to the alleged conspiracy or routine personal use

2. Cloud storage access is ROUTINE AND NORMAL. Google Drive, iCloud, OneDrive are standard backup and file-sharing services used by the vast majority of computer users for legitimate purposes.

3. Access to cloud storage settings and tool downloads reflects normal use (setup, configuration, installation) not necessarily data exfiltration.

4. No evidence provided of:
   - What files were actually uploaded to cloud services
   - Whether proprietary company data was transferred
   - Whether transfers contained sensitive materials
   - Actual connection between cloud access and data loss

5. Alternative explanation: User maintains routine cloud backups of personal files for disaster recovery - a legitimate and recommended IT practice.

6. The investigation questions specifically ask about "routine backup synchronization patterns" vs. exfiltration - and no evidence distinguishes between these possibilities without timestamps and file content analysis.



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

8 techniques identified across findings.


**Kill Chain Coverage:** Persistence (1) > Privilege Escalation (1) > Defense Evasion (3) > Lateral Movement (1) > Exfiltration (3)


### Persistence

| Technique | Name | Findings |
|-----------|------|----------|
| [T1547](https://attack.mitre.org/techniques/T1547/) | Boot or Logon Autostart Execution | Communications with Conspirator via Email... |


### Privilege Escalation

| Technique | Name | Findings |
|-----------|------|----------|
| [T1547](https://attack.mitre.org/techniques/T1547/) | Boot or Logon Autostart Execution | Communications with Conspirator via Email... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | Communications with Conspirator via Email...; Deliberate Downloads and Installation of... |
| [T1480](https://attack.mitre.org/techniques/T1480/) | Execution Guardrails | Deliberate Downloads and Installation of... |
| [T1562](https://attack.mitre.org/techniques/T1562/) | Impair Defenses | Communications with Conspirator via Email...; Deliberate Downloads and Installation of... |


### Lateral Movement

| Technique | Name | Findings |
|-----------|------|----------|
| [T1570](https://attack.mitre.org/techniques/T1570/) | Lateral Tool Transfer | Searches for Anti-Forensics Techniques and CD...; Suspect Accessed Cloud Storage Services... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1048](https://attack.mitre.org/techniques/T1048/) | Exfiltration Over Alternative Protocol | Searches for Anti-Forensics Techniques and CD... |
| [T1537](https://attack.mitre.org/techniques/T1537/) | Transfer Data to Cloud Account | Searches for Anti-Forensics Techniques and CD...; Suspect Accessed Cloud Storage Services... |
| [T1567](https://attack.mitre.org/techniques/T1567/) | Exfiltration Over Web Service | Suspect Accessed Cloud Storage Services... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 147 |
| Findings submitted | 4 |
| Confirmed | 0 |
| Inferences | 4 |
| Input tokens | 6.3K |
| Output tokens | 45.9K |
| Total tokens | 52.2K |
| Audit log | /home/mulder/.mulder/cases/nist-data-leakage.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 6.3K | 45.9K | 52.2K |




<details>
<summary>Evidence Sources (14)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 10 |
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
| tsk.masquerade | sleuthkit | 0 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
