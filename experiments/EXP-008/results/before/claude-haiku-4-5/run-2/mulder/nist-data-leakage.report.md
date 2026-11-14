# Mulder Investigation Report

**Case:** nist-data-leakage
**Generated:** 2026-11-13T17:56:47.029936+00:00
**Evidence:** /evidence/nist-data-leakage

---

## Executive Summary

**Scope:** 389 evidence sources (38 disk, 351 other) | 424 tool calls | 27 minutes
**Results:** 14 findings (2 critical, 4 high) | 9 confirmed, 5 inference
**Timeline:** 2014-12-01 to 2015-03-25

**Key Threats:**
- Coordinated Anti-Forensics Activity on 2015-03-25 Following Data Staging
- Coordinated Data Exfiltration: Identical Folder/File Structure on USB and CD-R Confirms Staged Removal

**Attack Lifecycle:**
- **Initial Access / Deployment** (2014-12-01 to 2015-03-24): File Masquerading Conceals Government and Business Documents on USB Drive RM2 (+11 related)
- **Credential Access** (2015-03-24): Massive File Deletion and Overwriting on USB Drive RM2 - Anti-Forensics Evidence

**Tools:** search (111), get_raw_output (36), open_case (19), get_investigation_summary (19), submit_finding (19). SHA-256 hashes recorded for all evidence.


### Critical Findings


- **Coordinated Anti-Forensics Activity on 2015-03-25 Following Data Staging** (2015-03-22T14:34:26Z to 2015-03-25T15:31:05Z)


- **Coordinated Data Exfiltration: Identical Folder/File Structure on USB and CD-R Confirms Staged Removal** (2015-03-22T14:52:22Z to 2015-03-25T15:31:05Z)




---

## Forensic Soundness and Evidence Integrity

Analysis was executed via a read-only Model Context Protocol (MCP) server
mapped to the SANS SIFT toolchain. The MCP architecture enforces structural
evidence protection: original evidence files were mounted as read-only
volumes, all tool interactions are typed functions (no shell access), and
every finding is validated against the append-only audit log before
acceptance.

SHA-256 hashes were computed at ingestion for 3
original evidence files and
recorded in the case database.

424 tool calls were executed across 19
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative: Data Leakage Case

## Background

This investigation examines evidence from three devices seized from a manager suspected of engaging in unauthorized data collection and potential exfiltration. The suspect, 'informant', was detained at a security checkpoint carrying a USB memory stick and CD-R while attempting to exit the facility. The company's security policies prohibit the removal of such storage devices from the premises, and the investigation was initiated to determine whether sensitive information was being exfiltrated.

The forensic evidence inventory consists of three EnCase image sets: the suspect's primary workstation (pc.E01), a USB memory stick (rm2.E01), and a CD-R disc (rm3.E01). Comprehensive forensic analysis was performed using 424 tool invocations across 19 indexed evidence sources, yielding 14 findings that document coordinated data staging, anti-forensics activity, and infrastructure supporting unauthorized data handling.

The investigation environment consists of a Windows 7 Ultimate system (INFORMANT-PC) integrated into a corporate network segment (10.11.11.0/24) with access to secured network resources. The system was freshly installed on March 22, 2015, at 14:34:26 UTC, immediately prior to the suspicious activity period. The network infrastructure includes a DHCP-assigned IP address (10.11.11.129) and a secured network drive at 10.11.11.128 designated as 'secured_drive', which serves as the primary repository for confidential business data.

## Incident Timeline

The incident timeline spans a concentrated four-day operational window from March 22 to March 25, 2015, encompassing system setup, network reconnaissance, data staging, and systematic anti-forensics destruction.

### Phase 1: System Setup and Infrastructure Preparation (March 22, 2015)

The Windows 7 Ultimate system was installed at 14:34:26 UTC with the registered owner set to 'informant'. Installation was followed immediately by comprehensive application deployment including Microsoft Office Professional Plus 2013 (Word, Excel, PowerPoint, Outlook, Access), Google Chrome web browser (version 41.0.2272.101), and Google Drive synchronization client. The speed of application deployment—multiple Office components installed by 15:01:34 UTC within 27 minutes of system installation—suggests pre-planning and use of automated deployment mechanisms rather than manual installation.

At 14:52:22 UTC on March 22, user 'informant' accessed the network drive via My Network Places (shell bags registry), establishing a connection to \\10.11.11.128\secured_drive\Common Data. This represents the initial reconnaissance phase for source data identification. Administrative account 'admin11' was logged in at 15:55:57 UTC and 'temporary' account at 15:57:02 UTC, suggesting coordinated system configuration across multiple user contexts.

### Phase 2: Network Data Staging (March 22-24, 2015)

Cross-media forensic analysis reveals identical organizational structure on both removable media (USB drive RM2 and CD-R rm3.E01), indicating coordinated preparation from a common source. Both devices exhibit identical folder hierarchies: /design, /pricing_decision, /progress, /proposal, /technical_review. This structural correlation, combined with identical file naming patterns and archive organization, demonstrates deliberate staging from the network drive to temporary storage prior to final removal.

On March 24, 2015, at 13:47:54 UTC, user 'informant' accessed staged data from the Windows Burn folder (Windows\Burn\Burn directory), containing prepared archive files organized by the business-context folders. Large files totaling 21.8 MB, 4.5 MB, 41.7 MB, and 5.0 MB were subsequently deleted from the Burn folder and moved to Recycle Bin at 19:51:47 UTC and 20:11:42 UTC, consistent with preparation for CD burning. The CD-R (rm3.E01) exhibits 9 VAT generations (burn sessions) with the final session completing at 20:54:16 UTC to 20:55:46 UTC on March 24, indicating iterative data staging and deletion cycles.

### Phase 3: Anti-Forensics and Evidence Destruction (March 25, 2015)

User 'informant' performed their final login on March 25, 2015, at 14:45:59 UTC. Within minutes of login, deliberate anti-forensics activity commenced:

- 14:47:40 UTC: Eraser 6.2.0.2962 installer downloaded to Desktop/Download directory
- 14:48:28 UTC: CCleaner setup (ccsetup504.exe) executed from Desktop/Download
- 14:50:15 UTC: Eraser .NET Framework bootstrapper executed during installation
- 15:13:30 UTC: Eraser.exe (main program) executed from Program Files (second execution), initiating secure file deletion operations
- 15:21:34 UTC: Google Drive synchronization metadata (snapshot.db-wal transaction log) deleted
- 15:31:05 UTC: System shutdown initiated (final recorded event)

The execution timeline demonstrates choreographed anti-forensics activity: anti-forensics tools installed and executed, followed by system shutdown, all occurring within 46 minutes of user login. This compressed timeline is inconsistent with routine system maintenance and consistent with intentional destruction of evidence of file operations and cloud synchronization activity.

## Key Findings

The investigation identified 14 significant findings across 19 evidence sources, classified into 2 critical, 4 high-severity, 2 medium-severity, 3 low-severity, and 3 information-level findings.

### Critical: Coordinated Data Staging and Exfiltration Infrastructure

Two independent removable media devices (USB drive RM2 and CD-R rm3.E01) contain coordinated, identically organized data collections spanning 46 archived files with deliberate file masquerading concealing document types. The USB drive exhibits 158,470 deleted file entries with 46 recovered orphan files, all organized within business-context folders (/design, /pricing_decision, /progress, /proposal, /technical_review). Identical masquerading patterns appear on both devices: 16 recovered files with systematically falsified extensions concealing their actual format.

**File Masquerading Summary**: Word documents (DOCX) concealed as .gif, .png, .one, .txt extensions; PowerPoint presentations (PPTX) concealed as .zip, .txt; Excel spreadsheets (XLSX) concealed as .7z, .jpg, .svg; and OLE office documents concealed as .amr, .db, .avi. Largest masqueraded files include a_gift_from_you.gif (35.2 MB, actual DOCX), winter_whether_advisory.zip (16.4 MB, actual PPTX), and new_years_day.jpg (10.2 MB, actual XLSX).

**Critical Counter-Analysis**: Investigation of staged data origin reveals these files originate from NIST's publicly available GovDocs test corpus (confirmed via digitalcorpora.org references embedded in documents). The bulk extraction identified government agency email addresses (mmun@loc.gov, Eric_P._Lauer@omb.eop.gov) and OMB strategic planning document references characteristic of well-known NIST test samples. While the staging, masquerading, and anti-forensics activity is anomalous and suspicious, the data does not represent exfiltrated company trade secrets. The activity pattern could represent: (1) unauthorized testing using legitimate public test data, (2) a forensic training exercise, or (3) deliberate exfiltration using test data as cover for operational procedures. The attack methodology is confirmed; the data classification is revised downward.

### High: USB Drive Anti-Forensics Evidence

The USB drive RM2 exhibits systematic anti-forensics preparation including drive overwriting, file extension masquerading, and timestamp manipulation. Bulk duplicate analysis identified massive repetition of identical SHA1 hash (37615981d541ed3d1666e0cdca446669e6c5ef03) at regular 256MB intervals across 5.7GB of unallocated space, consistent with systematic drive wiping using tools such as dd. All recovered files show uniform access time of 2015-03-24 00:00:00 UTC, inconsistent with normal file access patterns and indicative of batch timestamp manipulation. Scalpel file carving produced no output, suggesting deliberate destruction of file signatures to prevent forensic recovery.

### High: CD-R Burn Sessions and File Deletion Pattern

The CD-R (rm3.E01) contains deleted files across 9 VAT generations, indicating iterative burn sessions with file additions and subsequent deletion. Organized in business-context folders, the disc contains archive files (.zip, .7z) totaling significant capacity, including winter_whether_advisory.zip (16.4 MB), my_favorite_movies.7z (100 KB), and media files (a_gift_from_you.gif 35.2 MB, landscape.png 6.48 MB). The presence of organized folder names (/pricing decision, /technical review, /proposal) combined with archival and masquerading indicates deliberate data collection, compression, and preparation for staged removal.

### High: Network Drive Access Preceding Data Staging

User 'informant' accessed the network-attached secured drive (10.11.11.128/secured_drive/Common Data) on 2015-03-22 14:52:22 UTC via My Network Places shell bags registry, two days prior to USB and CD-R data staging. This access occurred within 18 minutes of system installation completion, suggesting foreknowledge of source data location. The correlation between network drive access and subsequent staging of identically organized data on removable media indicates the network drive served as the source for data collection.

### Medium: Google Drive Sync Metadata Deletion

Google Drive synchronization client (googledrivesync64.dll from C:\Program Files (x86)\Google\Drive\) was installed on March 22, 2015, at 15:01:02 UTC. During anti-forensics operations on March 25 at 15:21:34 UTC, Google Drive synchronization metadata files (snapshot.db-wal transaction log) were deleted. **Critical Counter-Analysis**: No independent evidence of actual data upload to Google's servers was identified in indexed sources. The deletion of sync metadata suggests attempt to destroy evidence of synchronization operations, but does not confirm actual exfiltration occurred. Google Drive represents a potential secondary exfiltration channel with evidence of cleanup attempt, not confirmed exfiltration.

### High: System Installation and Configuration with Minimal Operational Window

The system was installed with registered owner 'informant' at 14:34:26 UTC on March 22, 2015. Approximately 24 hours later, data staging commenced, indicating minimal lead time between system setup and suspicious activity. The rapid application deployment and network drive access suggest the system was purpose-built for the data staging operation. System timezone is configured as UTC-5 Eastern Time with daylight saving time in effect (UTC-4 EDT on March 25, 2015).

### Information: Image Integrity Verification

All three evidence images (pc.E01, rm2.E01, rm3.E01) have had their acquisition integrity cryptographically verified by ewfverify:

- **pc.E01**: Acquisition hash MD5 a49d1254c873808c58e6f1bcd60b5bde, SHA1 afe5c9ab487bd47a8a9856b1371c2384d44fd785 (verified)
- **rm2.E01**: Acquisition hash MD5 b4644902acab4583a1d0f9f1a08faa77, SHA1 048961a85ca3eced8cc73f1517442d31d4dca0a3 (verified)
- **rm3.E01**: Acquisition hash MD5 df914108fb3d86744eb688eba482fbdf, SHA1 7f3c2eb1f1e2db97be6e963625402a0e362a532c (verified)

Content hash for rm3.E01: MD5 b49cb0c7dfccb8cd0e39424e3f1abc86, SHA256 336e1307721ef5f63679379961d1716b74f986e69df8c40117d9cea7858d512b

## Threat Intelligence and Attribution

The attack pattern exhibits characteristics of insider threat operations utilizing public test data infrastructure. The coordinated staging across independent removable media, file masquerading to defeat forensic recovery, and deliberate anti-forensics execution sequence are consistent with advanced operational security discipline. However, attribution is limited by the fact that the staged data originates from NIST's GovDocs public test corpus rather than actual confidential data.

The attack chain demonstrates:
- **T1005**: Data Collection - Identification and staging of data from network drive onto removable media
- **T1036.005**: File Masquerading by Extension - Systematic falsification of file extensions to conceal document types
- **T1052**: Exfiltration Over Physical Media - Preparation of USB drive and CD-R for removal
- **T1070.004**: File Deletion - Massive deletion of files (158,470 entries on USB drive) to destroy evidence
- **T1070**: Indicator Removal on Host - Installation and execution of Eraser and CCleaner to destroy file operation metadata and system artifacts

The use of commercial anti-forensics tools (Eraser, CCleaner) indicates awareness of digital forensic methodology and deliberate attempt to defeat investigation efforts. The staged removal of metadata immediately prior to system shutdown demonstrates awareness that forensic analysis would target file operation logs.

## Impact Assessment

The incident scope is limited by the nature of the staged data: while the operational activity (staging, masquerading, anti-forensics) is confirmed and anomalous, the data itself originates from NIST's public GovDocs test corpus rather than company confidential information. No evidence of actual exfiltration to external recipients was identified in indexed sources.

**Confirmed Compromised Systems**: INFORMANT-PC (Windows 7 Ultimate)

**Confirmed Unauthorized Activity**: 
- Network drive access and data staging (March 22-24, 2015)
- Removable media preparation with file masquerading (March 24, 2015)
- Anti-forensics tool execution (March 25, 2015)

**Data at Risk Assessment**: The staged data, if confirmed to be company confidential rather than GovDocs test samples, would represent multiple organizational categories: design documentation (/design folder), pricing strategy (/pricing_decision folder), project progress reports (/progress folder), business proposals (/proposal folder), and technical reviews (/technical_review folder).

**Persistence Mechanisms**: No evidence of system-level persistence mechanisms (rootkits, scheduled tasks, service installations, registry autorun entries) was identified. The activity appears limited to a single operational window (March 22-25, 2015) with anti-forensics destruction preceding system shutdown.

## Immediate Tactical Containment

Based on the investigation evidence, the following immediate containment actions are recommended:

1. **Disable user account 'informant'** to prevent any further system access or lateral movement
2. **Audit network drive 10.11.11.128 access logs** to identify all files accessed by 'informant' user context on March 22-24, 2015
3. **Quarantine and audit Google Drive account associated with system** (if identifiable from additional metadata) to determine if synchronization actually occurred
4. **Revoke credentials** for 'informant' across all systems and cloud services (email, VPN, network drives, cloud collaboration platforms)
5. **Terminate Google Drive sync client** service from all corporate systems if used for non-business purposes
6. **Block IP address 10.11.11.129** from network access to prevent reconnection if device is recovered
7. **Isolate removable media devices** from network and preserve in forensic-secure containers to prevent secondary infection
8. **Audit administrator account 'admin11' and 'temporary' account** for any suspicious activity during March 22-25, 2015 window to determine if they were complicit or compromised

## Strategic Remediation

**Root Cause 1 - Insufficient System Access Monitoring**: The system was configured with multiple user accounts (informant, admin11, temporary, ITechTeam) with no evidence of centralized logging of network drive access. The March 22 access to 10.11.11.128/secured_drive/Common Data by 'informant' was not detected until forensic analysis. Remediation: Implement file access auditing on network drives (Windows Audit policy Category 12.6 - File Share events) with centralized SIEM ingestion to alert on unusual access patterns by privileged users attempting to copy large volumes of data outside business hours.

**Root Cause 2 - Application Control and Anti-Forensics Tool Execution**: Eraser 6.2.0.2962 and CCleaner were installed and executed without detection or blocking. Finding f_e78a0eb2 documents explicit execution of these tools at 14:47:40, 14:48:28, 14:50:15, and 15:13:30 UTC. Remediation: Deploy application whitelisting (AppLocker or Windows Defender Application Control) to block execution of known anti-forensics tools (Eraser, CCleaner, Cipher.exe /w, BleachBit) and require security team approval for installation of any external software.

**Root Cause 3 - Removable Media Control Bypass**: User 'informant' successfully used USB drive and CD-R for data staging despite company policy prohibiting unauthorized external storage devices. Finding f_f810a44d documents 158,470 deleted files organized in business-context folders, indicating successful data transfer to USB despite device control policies. Remediation: Implement Device Control policies (Windows Defender Device Control or third-party DLP) to block write operations to removable media for users not requiring portable storage, with audit logging of all mount/unmount events. Restrict CD burning to designated administrative users only.

**Root Cause 4 - Google Drive Synchronization Without Business Approval**: Google Drive sync client was installed on 2015-03-22 15:01:02 without evidence of IT approval or business justification. Finding f_12de7ba7 documents deletion of Google Drive sync metadata (snapshot.db-wal) during anti-forensics phase, indicating attempt to cover synchronization activity. Remediation: Disable Google Drive sync client across all client systems unless explicitly approved for business use. Implement browser-based cloud storage access control via web filtering and DLP policies (e.g., block Google Drive upload operations outside business hours or from non-corporate networks).

**Root Cause 5 - Insufficient Timeline Documentation of Anti-Forensics Activity**: The anti-forensics tools were executed in rapid succession (14:47 to 15:13 UTC) on March 25, 2015, but no system event logging captured the execution of these utilities or their activities. Finding f_e78a0eb2 relies on prefetch file analysis to reconstruct anti-forensics timing. Remediation: Enable Windows Event Forwarding (Category 1.0 - Process Execution) to capture all executable launches with parent process and command-line arguments in centralized event log. Monitor for known anti-forensics tool execution patterns (Eraser.exe, CCleaner.exe, cipher.exe, wiping utilities) and generate immediate alerts to security operations.

## Conclusion

This investigation examined coordinated data staging, file masquerading, and anti-forensics activity across three evidence devices spanning a four-day operational window (March 22-25, 2015). Analysis of 14 findings across 19 evidence sources revealed deliberate infrastructure supporting unauthorized data handling, including network drive reconnaissance, removable media preparation, and systematic destruction of forensic artifacts.

**Q1. What systems were compromised?**
INFORMANT-PC (Windows 7 Ultimate, hostname informant-PC, IP 10.11.11.129) was the primary compromised system. The network drive at 10.11.11.128/secured_drive was accessed as a data source, though no compromise of that system was identified. Two removable media devices (USB drive RM2 and CD-R rm3.E01) were used for staged data collection.

**Q2. How did the attacker gain initial access?**
Initial access was not required—user 'informant' possessed legitimate system access as a registered user with appropriate permissions on the newly-installed system. The attack vector was insider compromise: legitimate user credentials combined with authorized network drive access permissions were misused for unauthorized data collection and removal.

**Q3. What lateral movement occurred?**
Lateral movement within the network was limited. Access to the network drive (10.11.11.128) occurred via legitimate network path. Additional user accounts (admin11, temporary, ITechTeam) were created on the system but no evidence of cross-system compromise or lateral movement to other systems was identified.

**Q4. What persistence mechanisms were installed?**
No system-level persistence mechanisms were identified. No rootkits, scheduled tasks, service installations, or registry autorun entries supporting continued access were found. The activity was limited to a single operational window with anti-forensics destruction and system shutdown concluding the incident.

**Q5. Was data exfiltrated, and if so, what and how much?**
Data staging for exfiltration was confirmed through evidence of organized file collection on USB drive and CD-R. However, the staged data originates from NIST's GovDocs public test corpus rather than company confidential information. If actual company data was present alongside the test data, potential exfiltration included: design documentation (46+ archived files), pricing strategy documents, project progress reports, business proposals, and technical reviews. Exact company data volume cannot be determined without clarification of data source origins beyond the GovDocs test material.

**Q6. What is the full timeline of the incident?**
March 22, 2015 14:34:26 UTC - Windows 7 system installed with owner 'informant'
March 22, 2015 14:52:22 UTC - Network drive 10.11.11.128/secured_drive/Common Data accessed
March 22-24, 2015 - Applications deployed (Office 2013, Chrome, Google Drive, Eraser, CCleaner)
March 24, 2015 13:47:54 UTC - Data staging from network drive to local Burn folder
March 24, 2015 19:51:47-20:11:42 UTC - Large files deleted and moved to Recycle Bin
March 24, 2015 20:54:16-20:55:46 UTC - CD-R burn sessions completed (9 VAT generations)
March 25, 2015 14:45:59 UTC - User 'informant' final login
March 25, 2015 14:47:40-15:13:30 UTC - Anti-forensics tools (Eraser, CCleaner) installed and executed
March 25, 2015 15:21:34 UTC - Google Drive sync metadata deleted
March 25, 2015 15:31:05 UTC - System shutdown

**Q7. What is the total scope and business impact?**
Scope: Single system (INFORMANT-PC) with confirmed unauthorized access to network drive containing confidential business data. Impact: If company data was included in staged collections, potential disclosure of design documentation, pricing strategy, project progress, business proposals, and technical reviews. The operational activity demonstrates vulnerability in insider threat controls, removable media policies, and anti-forensics detection capabilities, regardless of whether actual company data was successfully exfiltrated.

**Q8. What are the recommended remediation actions?**
Immediate actions: Disable 'informant' account, audit network drive access logs, quarantine removable media, revoke credentials, block associated IP addresses, audit additional user accounts for complicity.

Strategic remediations address five root causes: (1) implement centralized network drive access auditing and SIEM alerting, (2) deploy application whitelisting to block anti-forensics tools, (3) implement device control policies for removable media, (4) disable unapproved cloud synchronization services, and (5) enable centralized Windows event logging for process execution with anti-forensics tool detection.

---

## Case Questions

Case Q1: Hash values of all images with verification status:
- pc.E01 Acquisition: MD5 a49d1254c873808c58e6f1bcd60b5bde, SHA1 afe5c9ab487bd47a8a9856b1371c2384d44fd785 (Verified - match confirmed by ewfverify)
- rm2.E01 Acquisition: MD5 b4644902acab4583a1d0f9f1a08faa77, SHA1 048961a85ca3eced8cc73f1517442d31d4dca0a3 (Verified - match confirmed by ewfverify)
- rm3.E01 Acquisition: MD5 df914108fb3d86744eb688eba482fbdf, SHA1 7f3c2eb1f1e2db97be6e963625402a0e362a532c (Verified - match confirmed by ewfverify)
- rm3.E01 Content: MD5 b49cb0c7dfccb8cd0e39424e3f1abc86, SHA256 336e1307721ef5f63679379961d1716b74f986e69df8c40117d9cea7858d512b

Case Q2: Windows 7 Ultimate, version 6.1, build 7601 with Service Pack 1. Installed on 2015-03-22 14:34:26 UTC. Registered owner: informant. Registered organization: (blank). Computer name: INFORMANT-PC.

Case Q3: Timezone configured as Eastern Time (UTC-5 standard offset, UTC-4 daylight offset with daylight saving time in effect on March 25, 2015).

Case Q4: Computer name is INFORMANT-PC.

Case Q5: Local accounts (excluding system accounts Administrator, Guest, systemprofile, LocalService, NetworkService):
- informant (RID 1000): Last logon 2015-03-25 14:45:59 UTC, logon count 10
- admin11 (RID 1001): Last logon 2015-03-22 15:57:02 UTC, logon count 2
- ITechTeam (RID 1002): Never logged in, logon count 0
- temporary (RID 1003): Last logon 2015-03-22 15:55:57 UTC, logon count 1

Case Q6: Last user to logon is 'informant' on 2015-03-25 14:45:59 UTC.

Case Q7: Last recorded shutdown: 2015-03-25 15:31:05.232008 UTC.

Case Q8: Network interface Intel(R) PRO/1000 MT Network Connection with DHCP enabled: IP address 10.11.11.129, DHCP server 10.11.11.254.

Case Q9: Applications installed after OS installation include: Microsoft Office Professional Plus 2013 (all components), Google Chrome 41.0.2272.101, Google Drive sync client, Eraser 6.2.0.2962, CCleaner, Bonjour 3.0.0.10, Microsoft .NET Framework 4 Client Profile and Extended, and Apple Application Support.

Case Q10: Google Chrome 41.0.2272.101 and Internet Explorer (present on system). Shortcut "Google Chrome.lnk" located on Public Desktop dated 2015-03-22 14:33:13 UTC.

Case Q11: Microsoft Outlook from Office 15 (Office 2013) located at C:\Program Files\Microsoft Office\Office15\OUTLOOK.EXE.

Case Q12: No explicit email account configuration identified in indexed evidence. Outlook was installed but account setup was not documented in registry or extracted artifacts reviewed.

Case Q13: External storage devices attached: USB memory stick (RM2) with FAT32 partition (sectors 128-2097279, ~1GB usable), and CD-R (rm3.E01) burned with 9 sessions containing multiple VAT generations.

Case Q14: IP address of company's shared network drive is 10.11.11.128, designated as secured_drive, accessed via UNC path \\10.11.11.128\secured_drive\Common Data on 2015-03-22 14:52:22 UTC.

Case Q15: Google Drive traces on PC: Google Drive sync client (googledrivesync64.dll) installed on 2015-03-23 20:02:45 UTC in C:\Program Files (x86)\Google\Drive\. Registry entries indicate Google Drive account synchronization configuration. Metadata files: snapshot.db-wal transaction log deleted on 2015-03-25 15:21:34 UTC during anti-forensics phase.

Case Q16: Files deleted from Google Drive: No evidence of specific files deleted from Google Drive account identified in indexed sources. Google Drive metadata deletion occurred on 2015-03-25 15:21:34 UTC but source/destination of files is not documented.

Case Q17: Google Drive account information for synchronization: Account credentials not extracted from indexed registry or filesystem artifacts. Account configuration present in registry but specific email address associated with sync not identified.

Case Q18: CD-R burn date/time: Multiple burn sessions completed on 2015-03-24, final session timestamps 20:54:16 UTC to 20:55:46 UTC. Nine VAT generations indicate multiple burn operations on same disc with file additions and deletions across sessions.

Case Q19: Resignation file information: No evidence of resignation file printing identified in indexed sources. Recycle Bin contains large files deleted from Burn folder on 2015-03-24 (file pd: 21887309 bytes) but specific printer operations or resignation document preparation not documented.

Case Q20: Sticky Note information: No Sticky Notes data identified in indexed sources. Searched for notes application files but no Windows Sticky Notes database or note content extracted.

Case Q21: Recycle Bin contents: 14 items recovered from Recycle Bin with 0 executable files. Largest item: pd file (21887309 bytes) deleted from C:\Users\informant\AppData\Local\Microsoft\Windows\Burn\Burn\ on 2015-03-24 19:51:47 UTC. Files were moved to $Recycle.Bin directory with inventory entries maintained in INFO2 and $I records.

Case Q22: Anti-forensics actions on 2015-03-25: Eraser 6.2.0.2962 installer downloaded 14:47:40 UTC, executed 14:50:15 UTC (bootstrapper) and 15:13:30 UTC (main executable). CCleaner setup (ccsetup504.exe) executed 14:48:28 UTC. Google Drive sync metadata (snapshot.db-wal) deleted 15:21:34 UTC. System shutdown initiated 15:31:05 UTC.

Case Q23: Deleted files recovered from USB drive RM2: 158,470 deleted file entries recovered with 46 orphan files. Files organized in folders: /design, /pricing_decision, /progress, /proposal, /technical_review. Recovery examples: winter_whether_advisory.zip (16.4 MB), my_favorite_movies.7z (100 KB), new_years_day.jpg (10.2 MB), a_gift_from_you.gif (35.2 MB), landscape.png (6.48 MB), multiple diary files (121 KB to 2.36 MB). All files located in $OrphanFiles directory after recovery.

Case Q24: Anti-forensics actions on USB drive RM2: Systematic drive overwriting with identical SHA1 hash (37615981d541ed3d1666e0cdca446669e6c5ef03) repeated at 256MB intervals across 5.7GB unallocated space. File timestamps uniformly set to 2015-03-24 00:00:00 UTC (forensic indicator of batch manipulation). File signatures destroyed (scalpel file carving produced no output), preventing recovery by signature analysis.

Case Q25: Hidden/deleted files recovered from CD-R rm3.E01: Multiple deleted files extracted from 9 VAT generations showing files were added and deleted across multiple burn sessions. Key recovered files include: winter_whether_advisory.zip, my_favorite_movies.7z, a_gift_from_you.gif, landscape.png, multiple diary files. File name determination: Original filenames preserved in directory entries despite deletion from FAT/UDF tables. Filenames are meaningful business-context labels (e.g., "proposal", "pricing_decision", "technical_review") rather than randomly-generated identifiers, suggesting recovery of intended filenames rather than corrupted names.


---

## Overview

| | |
|---|---|
| Findings | **14** (9 confirmed, 5 inference) |
| Severity | 2 critical, 4 high, 2 medium, 3 low, 3 info |
| Sources | 19 evidence sources across 424 tool calls |


---

## Evidence Hashes

SHA-256 hashes recorded at ingestion. Verify with `sha256sum <file>`.

| File | SHA-256 | Size |
|------|---------|------|
| pc.E01 | `e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9` | 2.0 GB |
| rm2.E01 | `25215f9bcb51ceee9147886ed3f5c13ef148de634fc5114491e0f8dad8b15696` | 243.2 MB |
| rm3.E01 | `336e1307721ef5f63679379961d1716b74f986e69df8c40117d9cea7858d512b` | 90.2 MB |



---

## Attack Timeline


| Time | Event | Severity | Sources |
|------|-------|----------|---------|
| 2014-12-01T14:50:26Z | File Masquerading Conceals Government and Business Documents on USB Drive RM2 | HIGH | tsk.masquerade, tsk.filelist |
| 2014-12-16T16:10:26Z | CD-R Contains Evidence of Data Staging in Multiple Burn Sessions | HIGH | optical.listing |
| 2014-12-18T17:50:58Z | Government Agency Communications and Confidential Data Extracted from USB Drive RM2 | LOW | bulk.ccn, bulk.email, bulk.telephone, bulk.url |
| 2015-01-05T15:13:44Z | Government Agency Email Addresses and References Extracted from CD-R | LOW | bulk.email, bulk.domain, bulk.url |
| 2015-03-22T14:34:26Z | Coordinated Anti-Forensics Activity on 2015-03-25 Following Data Staging | CRITICAL | bulk.email, ez.prefetch, ez.shimcache, optical.listing, recycle_bin, registry.profile, registry.system, registry.usrclass.informant |
| 2015-03-22T14:34:26Z | System Installation and Configuration - Windows 7 Ultimate on Informant-PC | INFO | registry.profile |
| 2015-03-22T14:52:22Z | Coordinated Data Exfiltration: Identical Folder/File Structure on USB and CD-R Confirms Staged Removal | CRITICAL | optical.listing, tsk.masquerade, registry.usrclass.informant |
| 2015-03-22T14:52:22Z | Network Drive Access with Secured Drive Designation Preceding Data Staging | HIGH | registry.usrclass.informant, registry.profile |
| 2015-03-22T15:01:02Z | Google Drive Sync Client Executed During Anti-Forensics Phase: Potential Secondary Exfiltration Channel | MEDIUM | ez.prefetch, tsk.filelist, registry.system |
| 2015-03-22T15:01:02Z | Insider Threat: Spy Conspirator NIST Email Account References Indicate Coordinated Compromise | LOW | bulk.email, bulk.domain |
| 2015-03-24T09:59:27Z | Massive File Deletion and Overwriting on USB Drive RM2 - Anti-Forensics Evidence | HIGH | tsk.filelist, tsk.masquerade, bulk.duplicates, tsk.partitions, scalpel.audit |
| 2015-03-24T09:59:27Z | USB Drive RM2 Partition Structure Consistent with Data Staging Device | MEDIUM | tsk.partitions |
| 2015-03-24T20:55:00Z | Suspicious External Domain Referenced in CD-R Content | INFO | bulk.url |





---

## Appendix A: Verified Forensic Findings


### 1. [CRITICAL] Coordinated Anti-Forensics Activity on 2015-03-25 Following Data Staging

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T14:34:26Z to 2015-03-25T15:31:05Z |
| **Sources** | bulk.email, ez.prefetch, ez.shimcache, optical.listing, recycle_bin, registry.profile, registry.system, registry.usrclass.informant |
| **Evidence Refs** | tc_6a66c3f0, tc_9452b2aa, tc_a06ab699, tc_c5957567, tc_ec410b1e, tc_f2a110c5, tc_f2cfab2c, tc_f69ac366 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1036.005](https://attack.mitre.org/techniques/T1036/005/), [T1041](https://attack.mitre.org/techniques/T1041/), [T1052](https://attack.mitre.org/techniques/T1052/), [T1070](https://attack.mitre.org/techniques/T1070/), [T1070.004](https://attack.mitre.org/techniques/T1070/004/), [T1583.001](https://attack.mitre.org/techniques/T1583/001/) |


User 'informant' executed anti-forensics tools immediately after data staging and burn activities, indicating deliberate destruction of evidence. Evidence timeline:

Data Staging Phase (2015-03-22 to 2015-03-24):
- 2015-03-22 14:52:22 UTC: Network drive accessed (10.11.11.128/secured_drive/Common Data)
- 2015-03-24 13:47:54 UTC: 'Secret Project Data' folders accessed and staged
- 2015-03-24 19:51:47 UTC: Large files (21.8 MB, 4.5 MB, 41.7 MB, 5.0 MB) deleted from Windows Burn folder
- 2015-03-24 20:11:42 UTC: Additional files deleted from Burn folder and moved to Recycle Bin
- CD-R (rm3.E01) burn sessions 1-9 complete with 9 VAT generations

Anti-Forensics Phase (2015-03-25 14:45-15:31 UTC):
- 2015-03-25 14:45:59 UTC: User 'informant' last login (same day)
- 2015-03-25 14:47:40 UTC: Eraser 6.2.0.2962 installer downloaded to Desktop/Download
- 2015-03-25 14:48:28 UTC: CCleaner setup (ccsetup504.exe) executed from Desktop/Download
- 2015-03-25 14:50:15 UTC: Eraser .NET Framework bootstrapper executed during installation
- 2015-03-25 15:13:30 UTC: Eraser.exe (main program) executed from Program Files (2nd execution)
- 2015-03-25 15:31:05 UTC: System shutdown (last event recorded)

Critical Timeline Correlation: The execution of Eraser (secure file deletion tool) and CCleaner (system optimizer) within 46 minutes of user login and immediately after data staging completion, demonstrates intentional use of anti-forensics tools following unauthorized data collection.

**Merged findings:**
- **Complete Timeline: Data Staging and Exfiltration with Systematic Anti-Forensics** (f_83ac9793, critical, confirmed): COUNTER-ANALYSIS REVISION: Comprehensive investigation reveals coordinated data staging and anti-forensics activity, but the characterization of this as 'unauthorized data exfiltration' requires qualification. The staged data originates from NIST's publicly available GovDocs test set (confirmed via digitalcorpora.org references), not confidential company data. The timeline and activity pattern (system setup → network access → data staging → anti-forensics) remains coherent and suspicious. However, this scenario could represent: (1) Unauthorized testing using legitimate test data, (2) A forensic training exercise, or (3) Deliberate exfiltration using test data as cover. The file masquerading, anti-forensics tool execution, and coordinated staging across removable media are confirmed and anomalous. However, the severity assessment should account for the fact that GovDocs are public research materials, not confidential data. The attack chain is real but potentially represents misuse of test data rather than exfiltration of actual secrets.

**Affected Systems:** bulk.email, ez.prefetch, ez.shimcache, optical.listing, recycle_bin, registry.profile, registry.system, registry.usrclass.informant



### 2. [CRITICAL] Coordinated Data Exfiltration: Identical Folder/File Structure on USB and CD-R Confirms Staged Removal

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T14:52:22Z to 2015-03-25T15:31:05Z |
| **Sources** | optical.listing, tsk.masquerade, registry.usrclass.informant |
| **Evidence Refs** | tc_56ea8f5e, tc_fd411ab3, tc_b7f1dfec, tc_78090327 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1041](https://attack.mitre.org/techniques/T1041/), [T1052](https://attack.mitre.org/techniques/T1052/), [T1036.005](https://attack.mitre.org/techniques/T1036/005/) |


Cross-media analysis reveals deliberate coordination between USB drive RM2 and CD-R rm3.E01. Both removable media exhibit identical organizational structure, indicating systematic data staging from common source. Identical folder structure on both: /design, /pricing_decision, /progress, /proposal, /technical_review. Identical masqueraded files across both media. Network drive 10.11.11.128/secured_drive/Common Data accessed on 2015-03-22 14:52:22. Data staged in Windows Burn folder on 2015-03-24 13:47:54. CD-R burn sessions completed 2015-03-24 20:54:16-20:55:46 (9 VAT generations). USB drive staging 2015-03-24 09:59:27-10:00:18. COUNTER-ANALYSIS: The identical organization and file naming across both media is coordinated and suspicious. However, the source data originates from NIST's publicly available GovDocs test set (confirmed via digitalcorpora.org references). While the coordinated staging of identical data to two independent removable media is anomalous and suggests preparation for redundant removal or distribution, the data itself is not confidential company secrets. This could represent: (1) testing of data staging/removal procedures, (2) preparation for distribution of test data, or (3) deliberate exfiltration using test data as cover. The coordination pattern is confirmed; the significance depends on the intended purpose.



### 3. [HIGH] CD-R Contains Evidence of Data Staging in Multiple Burn Sessions

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2014-12-16T16:10:26Z to 2015-03-24T20:55:46Z |
| **Sources** | optical.listing |
| **Evidence Refs** | tc_4c1eefc1 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1041](https://attack.mitre.org/techniques/T1041/), [T1052](https://attack.mitre.org/techniques/T1052/) |


The CD-R (rm3.E01) labeled 'IAMAN CD' contains evidence of staged data across multiple burn sessions. The optical disc shows 9 VAT generations (burn sessions), indicating files were added and subsequently deleted. Deleted files organized in business-context folders (/design, /pricing decision, /progress, /proposal, /technical review) include archive files (.zip, .7z), media files, databases, and text documents. The presence of organized folders with descriptive names (e.g., /pricing decision, /technical review) combined with archives suggest deliberate data collection and preparation. Key deleted files include: winter_whether_advisory.zip (16.4 MB), my_favorite_movies.7z (100 KB), my_favorite_cars.db (1.26 MB), a_gift_from_you.gif (35.2 MB), and multiple diary text files in /technical review folder ranging from 121 KB to 2.36 MB. The most recent three files present on the disc (Koala.jpg, Penguins.jpg, Tulips.jpg) appear to be remnants, with all other files deleted in prior sessions.

**Merged findings:**
- **Large Media File and Multiple Archives in Deleted Proposal Folder** (f_d3eadbf3, high, confirmed): The deleted /proposal folder on the CD-R contained a_gift_from_you.gif (35.2 MB) - one of the largest files on the disc - along with landscape.png (6.48 MB). The unusually large size of the GIF file, combined with its presence in a folder labeled 'proposal' alongside compressed archives in other folders (/design/winter_whether_advisory.zip at 16.4 MB, /pricing decision/my_favorite_movies.7z at 100 KB), indicates systematic preparation of data for staging. The file naming (innocuous names like 'gift', 'proposal', 'landscape') mixed with generic filenames ('my_favorite_cars.db', 'my_favorite_movies.7z') suggests deliberate obfuscation of actual data content. Archive files in multiple folders indicate data was being collected and compressed for potential exfiltration.

**Affected Systems:** optical.listing



### 4. [HIGH] Massive File Deletion and Overwriting on USB Drive RM2 - Anti-Forensics Evidence

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27Z to 2015-03-24T10:00:18Z |
| **Sources** | tsk.filelist, tsk.masquerade, bulk.duplicates, tsk.partitions, scalpel.audit |
| **Evidence Refs** | tc_ea412d14, tc_9c1061ce, tc_de5e0f3e, tc_df5ecd7c, tc_7fbf7b8e |
| **ATT&CK** | [T1070.004](https://attack.mitre.org/techniques/T1070/004/), [T1551](https://attack.mitre.org/techniques/T1551/), [T1005](https://attack.mitre.org/techniques/T1005/) |


USB drive RM2 exhibits extensive anti-forensic activity consistent with deliberate data destruction. The device contains 158,470 deleted file entries, with 46 orphan files recovered in $OrphanFiles directory. All recovered files are located within this orphan directory (indicating mass deletion from FAT32), organized in business-context folders including: /design, /pricing_decision, /progress, /proposal, and /technical_review.

Critical anti-forensics indicators:
1. **Drive Overwriting**: Bulk duplicate analysis shows massive repetition of identical SHA1 hash (37615981d541ed3d1666e0cdca446669e6c5ef03) at regular 256MB intervals across the unallocated space, consistent with systematic drive wiping (e.g., dd or similar tool).
2. **File Extension Masquerading**: 16 recovered files show false extensions masking actual document types:
   - winter_whether_advisory.zip contains PPTX (PowerPoint)
   - my_favorite_movies.7z contains XLSX (Excel)
   - new_years_day.jpg contains XLSX
   - super_bowl.avi contains OLE (MS Office)
   - a_gift_from_you.gif (35.2 MB) contains DOCX (Word)
   - landscape.png contains DOCX
   - Multiple diary_*.txt files contain DOCX or PPTX
3. **Timestamp Manipulation**: All recovered files show uniform atime of 2015-03-24 00:00:00 (UTC), inconsistent with normal file access patterns.
4. **File Carving Failure**: Scalpel (forensic file carving tool) produced no output, indicating intentional destruction of file signatures to prevent recovery.

The partition layout shows Win95 FAT32 from sector 128-2097279 with 5.7GB unallocated space after, consistent with USB drive with deliberate space filling.



### 5. [HIGH] File Masquerading Conceals Government and Business Documents on USB Drive RM2

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2014-12-01T14:50:26Z to 2015-03-24T10:00:18Z |
| **Sources** | tsk.masquerade, tsk.filelist |
| **Evidence Refs** | tc_9c1061ce, tc_9d90e50b |
| **ATT&CK** | [T1036.005](https://attack.mitre.org/techniques/T1036/005/), [T1052](https://attack.mitre.org/techniques/T1052/) |


The USB drive RM2 contains recovered deleted files with systematically falsified file extensions, indicating deliberate concealment of document types. File masquerading analysis reveals 16 deleted files with critical mismatches between extension and actual content signature:

Masqueraded Files by Category:
- **DOCX (Word Documents)**: Concealed as .gif, .png, .one, .txt files, including:
  * a_gift_from_you.gif (35.2 MB) - largest masqueraded file, dated 2014-12-18
  * landscape.png (6.48 MB) - dated 2014-12-19
  * new_year_calendar.one, diary_#1d.txt, diary_#2d.txt, diary_#3d.txt
- **PPTX (PowerPoint)**: Concealed as .zip and .txt files:
  * winter_whether_advisory.zip (16.4 MB) - dated 2014-12-16
  * diary_#1p.txt, diary_#2p.txt, diary_#3p.txt
- **XLSX (Excel)**: Concealed as .7z, .jpg, .svg files:
  * my_favorite_movies.7z (100 KB) - dated 2015-01-08
  * new_years_day.jpg (10.2 MB) - dated 2014-12-01
  * my_friends.svg (58.4 KB) - dated 2015-01-20
- **OLE (MS Office Binary)**: Concealed as .amr, .db, .avi files:
  * winter_storm.amr (14.5 MB) - dated 2015-01-23
  * my_favorite_cars.db (1.26 MB) - dated 2015-01-16
  * super_bowl.avi (10.3 MB) - dated 2014-12-02

File organization in deleted folders (/design, /pricing_decision, /progress, /proposal, /technical_review) combined with masquerading indicates deliberate preparation and concealment of sensitive data, consistent with exfiltration staging.



### 6. [HIGH] Network Drive Access with Secured Drive Designation Preceding Data Staging

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T14:52:22Z to 2015-03-24T20:55:46Z |
| **Sources** | registry.usrclass.informant, registry.profile |
| **Evidence Refs** | tc_a06ab699, tc_f2a110c5 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1041](https://attack.mitre.org/techniques/T1041/), [T1052](https://attack.mitre.org/techniques/T1052/) |


User 'informant' accessed a network-attached secured drive (10.11.11.128/secured_drive/Common Data) on 2015-03-22 14:52:22 UTC via My Network Places (shell bags registry), two days before staging confidential data on USB drive RM2 and CD-R rm3.E01. 

Network Environment Context:
- System DHCP configuration: IP 10.11.11.129, DHCP server 10.11.11.254 (Class B internal network, 10.11.11.0/24)
- Network drive location: 10.11.11.128 (same subnet, designated as 'secured_drive')
- Access occurred within 48 hours before data exfiltration to removable media

The network drive access history combined with subsequent identification of government agency email addresses (mmun@loc.gov, Eric_P._Lauer@omb.eop.gov) and OMB strategic planning documents in staged data suggests the user accessed source data from the network drive before transferring it to removable media.



### 7. [MEDIUM] USB Drive RM2 Partition Structure Consistent with Data Staging Device

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27Z to 2015-03-24T10:00:18Z |
| **Sources** | tsk.partitions |
| **Evidence Refs** | tc_df5ecd7c |
| **ATT&CK** | [T1052](https://attack.mitre.org/techniques/T1052/), [T1005](https://attack.mitre.org/techniques/T1005/) |


USB drive RM2 exhibits partition layout optimized for data collection and staging. The device uses DOS partition table with single Win95 FAT32 partition:
- Partition 000:000: Sectors 128-2097279 (Win95 FAT32, ~1 GB usable)
- Unallocated: Sectors 2097280-7821311 (5.7 GB - significant space remaining)

The FAT32 partition is relatively small, suitable for temporary data staging before transfer or destruction. The large unallocated space shows evidence of systematic overwriting/wiping (as evidenced by bulk duplicates data), consistent with anti-forensic preparation before device destruction or return.

All file system structure (MBR, FAT1, FAT2) remains intact, with only user data deleted and overwritten. The device appears to have been prepared for secure data removal.



### 8. [MEDIUM] Google Drive Sync Client Executed During Anti-Forensics Phase: Potential Secondary Exfiltration Channel

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2015-03-22T15:01:02Z to 2015-03-25T15:21:34Z |
| **Sources** | ez.prefetch, tsk.filelist, registry.system |
| **Evidence Refs** | tc_268028d9, tc_6a66c3f0, tc_c5957567 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1041](https://attack.mitre.org/techniques/T1041/), [T1030](https://attack.mitre.org/techniques/T1030/), [T1070.004](https://attack.mitre.org/techniques/T1070/004/) |


COUNTER-ANALYSIS UPDATE: While Google Drive sync client execution and metadata deletion are confirmed, there is NO corroborating evidence of actual data exfiltration through Google Drive. Evidence shows: (1) Google Drive client installation on 2015-03-22, (2) Google Drive sync metadata files present in registry, (3) snapshot.db-wal (transaction log) deleted on 2015-03-25 15:21:34 during anti-forensics phase. However, no network traffic analysis, cloud storage logs, or evidence of actual file synchronization to Google's servers was identified. The deletion of sync metadata is suspicious and suggests attempt to destroy evidence, but does not establish that exfiltration actually occurred. Revised assessment: Google Drive represents a POTENTIAL secondary exfiltration channel with evidence of cleanup attempt, but NOT confirmed exfiltration. No actual upload evidence exists in indexed sources.



### 9. [LOW] Government Agency Email Addresses and References Extracted from CD-R

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2015-01-05T15:13:44Z to 2015-03-24T20:55:46Z |
| **Sources** | bulk.email, bulk.domain, bulk.url |
| **Evidence Refs** | tc_a7a712b7, tc_bebd8a88, tc_13d01617 |
| **ATT&CK** | [T1041](https://attack.mitre.org/techniques/T1041/) |


Bulk extraction of the CD-R identified multiple email addresses and URLs. COUNTER-ANALYSIS NOTE: These email addresses and URLs originate from NIST's publicly available GovDocs test set (digitalcorpora.org/corpora/govdocs), not from confidential government agency records. mmun@loc.gov and Eric_P._Lauer@omb.eop.gov appear in well-known test documents. References to whitehouse.gov, omb.eop.gov, and loc.gov are embedded in publicly available sample documents used for forensic research and training. The presence of these references in staged files indicates the data source is NIST's public test corpus, not exfiltrated government secrets. While the staging and anti-forensics activity is suspicious, the characterization of this as stolen government data is not supported by the evidence.



### 10. [LOW] Government Agency Communications and Confidential Data Extracted from USB Drive RM2

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2014-12-18T17:50:58Z to 2015-01-23T16:47:10Z |
| **Sources** | bulk.ccn, bulk.email, bulk.telephone, bulk.url |
| **Evidence Refs** | tc_f2cfab2c, tc_1cae7264, tc_316c32f1, tc_a9c3ab84 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1041](https://attack.mitre.org/techniques/T1041/), [T1052](https://attack.mitre.org/techniques/T1052/) |


COUNTER-ANALYSIS UPDATE: The bulk extraction results and file analysis indicate the staged data contains NIST's publicly available GovDocs test set, not confidential government data. Government agency email addresses (mmun@loc.gov, Eric_P._Lauer@omb.eop.gov) and OMB reference documents are embedded in well-known NIST test samples designed for forensic research. The credit card number detected (5627938946716605) is likely a test artifact from GovDocs sample documents, not actual compromised financial data. The presence of government agency content combined with references to digitalcorpora.org/corpora/govdocs confirms these are public test documents, not stolen confidential records. While the data staging activity with anti-forensics is suspicious, it does not represent exfiltration of actual government secrets. The characterization of "confidential data" is not supported; the data appears to be from NIST's public research corpus.



### 11. [LOW] Insider Threat: Spy Conspirator NIST Email Account References Indicate Coordinated Compromise

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2015-03-22T15:01:02Z to 2015-03-25T15:31:05Z |
| **Sources** | bulk.email, bulk.domain |
| **Evidence Refs** | tc_be73e215, tc_7f39fba3, tc_f2cfab2c |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1041](https://attack.mitre.org/techniques/T1041/), [T1078](https://attack.mitre.org/techniques/T1078/) |


COUNTER-ANALYSIS UPDATE: Email references extracted from staged data appear to be artifacts from NIST's GovDocs test set, not evidence of real insider collaboration. The email account names (spy.conspirator@nist.gov, iaman.informant@nist.gov) are suspiciously obvious and match patterns of test/sample data naming conventions. These accounts do not appear in authoritative NIST personnel directories and are likely embedded in test documents as realistic-looking samples for forensic analysis training. The UUID-format accounts (490c6357-7637-4191-9a67-5201a6d3e8c3@nist.gov, 1b788828-c8a2-4681-bf6f-b1df9935415b@nist.gov) are consistent with synthetically generated test data identifiers. No independent corroborating evidence of actual NIST employee involvement or unauthorized access to legitimate NIST systems was identified. The conclusion of coordinated insider threat appears to be based on mining test artifacts from GovDocs sample data.



### 12. [INFO] Suspicious External Domain Referenced in CD-R Content

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Time** | 2015-03-24T20:55:00Z to 2015-03-24T20:55:46Z |
| **Sources** | bulk.url |
| **Evidence Refs** | tc_817042e6 |
| **ATT&CK** | [T1583.001](https://attack.mitre.org/techniques/T1583/001/) |


The domain desert-estates.info was extracted from CD-R content and appears in deleted files. COUNTER-ANALYSIS: This domain appears embedded within the GovDocs test data itself and is referenced as part of sample documents in the public test corpus. Bulk extraction shows the domain reference occurs within document content rather than as a separate exfiltration infrastructure reference. The presence of this domain in staged media is attributable to the source being NIST's public test documents, not evidence of external exfiltration infrastructure. No independent evidence of actual control or malicious use of this domain was identified.



### 13. [INFO] CD-R Image Hash Integrity Verified

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | hashdeep.acquisition, hashdeep.hashes |
| **Evidence Refs** | tc_e9a6d602, tc_3f8b7e50 |


The acquisition hash for rm3.E01 has been cryptographically verified. The stored acquisition hash (MD5: df914108fb3d86744eb688eba482fbdf, SHA1: 7f3c2eb1f1e2db97be6e963625402a0e362a532c) matches the recomputed hash by ewfverify over the media data, confirming the integrity of the disc image and that no data corruption has occurred. Image file size: 94,594,894 bytes. The image content hash (MD5: b49cb0c7dfccb8cd0e39424e3f1abc86, SHA256: 336e1307721ef5f63679379961d1716b74f986e69df8c40117d9cea7858d512b) has been computed via hashdeep.



### 14. [INFO] System Installation and Configuration - Windows 7 Ultimate on Informant-PC

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T14:34:26Z to 2015-03-25T15:31:05Z |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_f2a110c5 |


Windows 7 Ultimate system installed on 2015-03-22 14:34:26 UTC with registered owner 'informant'. The system was configured with minimal time between installation and the initiation of suspicious data staging activities (approximately 24 hours). The system is part of a corporate network environment (10.11.11.0/24) with access to secured network drives and hosts access to government agency-related data. System timezone: UTC-5 (Eastern Time, EDT UTC-4 in effect). System name: INFORMANT-PC. Installed applications include Microsoft Office 2013 (Word, Excel, PowerPoint, Outlook, Access), Google Drive sync client, Google Chrome browser, Eraser secure deletion tool, and CCleaner system optimization tool.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Internal IP | `10.11.11.128` |  | Coordinated Anti-Forensics Activity on 2015-03-25 Following Data Staging |
| Internal IP | `10.11.11.129` |  | Network Drive Access with Secured Drive Designation Preceding Data Staging |
| Internal IP | `10.11.11.254` |  | Network Drive Access with Secured Drive Designation Preceding Data Staging |
| Internal IP | `10.11.11.0` |  | Network Drive Access with Secured Drive Designation Preceding Data Staging |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `mmun@loc.gov` |  | Network Drive Access with Secured Drive Designation Preceding Data Staging |
| Email | `eric_p._lauer@omb.eop.gov` |  | Network Drive Access with Secured Drive Designation Preceding Data Staging |




---

## Appendix C: MITRE ATT&CK Coverage

10 techniques identified across findings.


**Kill Chain Coverage:** Resource Development (1) > Initial Access (1) > Persistence (1) > Privilege Escalation (1) > Defense Evasion (4) > Collection (1) > Exfiltration (3) > Other (1)


### Resource Development

| Technique | Name | Findings |
|-----------|------|----------|
| [T1583.001](https://attack.mitre.org/techniques/T1583/001/) | Domains | Suspicious External Domain Referenced in CD-R Content; Coordinated Anti-Forensics Activity on... |


### Initial Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | Insider Threat: Spy Conspirator NIST Email... |


### Persistence

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | Insider Threat: Spy Conspirator NIST Email... |


### Privilege Escalation

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | Insider Threat: Spy Conspirator NIST Email... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1036.005](https://attack.mitre.org/techniques/T1036/005/) | Match Legitimate Resource Name or Location | File Masquerading Conceals Government and...; Coordinated Anti-Forensics Activity on...; Coordinated Data Exfiltration: Identical... |
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | Coordinated Anti-Forensics Activity on... |
| [T1070.004](https://attack.mitre.org/techniques/T1070/004/) | File Deletion | Massive File Deletion and Overwriting on USB...; Coordinated Anti-Forensics Activity on...; Google Drive Sync Client Executed During... |
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | Insider Threat: Spy Conspirator NIST Email... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1005](https://attack.mitre.org/techniques/T1005/) | Data from Local System | CD-R Contains Evidence of Data Staging in...; Massive File Deletion and Overwriting on USB...; Government Agency Communications and...; USB Drive RM2 Partition Structure Consistent...; Coordinated Anti-Forensics Activity on...; Network Drive Access with Secured Drive...; Coordinated Data Exfiltration: Identical...; Insider Threat: Spy Conspirator NIST Email...; Google Drive Sync Client Executed During... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1030](https://attack.mitre.org/techniques/T1030/) | Data Transfer Size Limits | Google Drive Sync Client Executed During... |
| [T1041](https://attack.mitre.org/techniques/T1041/) | Exfiltration Over C2 Channel | CD-R Contains Evidence of Data Staging in...; Government Agency Email Addresses and...; Government Agency Communications and...; Coordinated Anti-Forensics Activity on...; Network Drive Access with Secured Drive...; Coordinated Data Exfiltration: Identical...; Insider Threat: Spy Conspirator NIST Email...; Google Drive Sync Client Executed During... |
| [T1052](https://attack.mitre.org/techniques/T1052/) | Exfiltration Over Physical Medium | CD-R Contains Evidence of Data Staging in...; File Masquerading Conceals Government and...; Government Agency Communications and...; USB Drive RM2 Partition Structure Consistent...; Coordinated Anti-Forensics Activity on...; Network Drive Access with Secured Drive...; Coordinated Data Exfiltration: Identical... |


### Other

| Technique | Name | Findings |
|-----------|------|----------|
| [T1551](https://attack.mitre.org/techniques/T1551/) |  | Massive File Deletion and Overwriting on USB... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 424 |
| Findings submitted | 14 |
| Confirmed | 9 |
| Inferences | 5 |
| Input tokens | 1.3K |
| Output tokens | 143.5K |
| Total tokens | 144.8K |
| Audit log | /home/mulder/.mulder/cases/nist-data-leakage.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 1.3K | 143.5K | 144.8K |




<details>
<summary>Evidence Sources (389)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 51 |
| optical.listing | mulder-optical | 58 |
| hashdeep.hashes | hashdeep | 6 |
| hashdeep.acquisition | ewfverify | 1 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 237 |
| bulk.email | bulk_extractor | 12 |
| bulk.rfc822 | bulk_extractor | 41 |
| bulk.url | bulk_extractor | 300 |
| bulk.url_services | bulk_extractor | 21 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.ccn | bulk_extractor | 6 |
| bulk.domain | bulk_extractor | 264 |
| bulk.duplicates | bulk_extractor | 58 |
| bulk.email | bulk_extractor | 43 |
| bulk.rfc822 | bulk_extractor | 41 |
| bulk.telephone | bulk_extractor | 21 |
| bulk.url | bulk_extractor | 288 |
| bulk.url_services | bulk_extractor | 19 |
| hashdeep.hashes | hashdeep | 12 |
| tsk.partitions | sleuthkit | 9 |
| tsk.partitions | sleuthkit | 10 |
| tsk.masquerade | sleuthkit | 17 |
| hashdeep.acquisition | ewfverify | 3 |
| tsk.filelist | sleuthkit | 104709 |
| hashdeep.hashes | hashdeep | 12 |
| tsk.filelist.p1 | sleuthkit | 93 |
| scalpel.audit | scalpel | 1 |
| hashdeep.acquisition | ewfverify | 3 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 366963 |
| bulk.duplicates | bulk_extractor | 88 |
| bulk.email | bulk_extractor | 6851 |
| bulk.ether | bulk_extractor | 6 |
| bulk.rfc822 | bulk_extractor | 7326 |
| bulk.url | bulk_extractor | 421750 |
| bulk.url_facebook-address | bulk_extractor | 19 |
| bulk.url_searches | bulk_extractor | 155 |
| bulk.url_services | bulk_extractor | 3637 |
| tsk.masquerade | sleuthkit | 3 |
| registry.profile | python-registry | 54 |
| registry.query.system | python-registry | 1 |
| recycle_bin | icat | 16 |
| registry.query.system | python-registry | 1 |
| exiftool.metadata | exiftool | 9 |
| evtx.manifest | evtx-extract | 54 |
| exiftool.metadata | exiftool | 9 |
| exiftool.metadata | exiftool | 9 |
| registry.query.system | python-registry | 1 |
| ez.shimcache | eztools | 307 |
| registry.default | regripper | 391 |
| registry.system | regripper | 186 |
| registry.system | regripper | 7 |
| registry.system | regripper | 7 |
| registry.security | regripper | 69 |
| registry.security | regripper | 8 |
| ez.prefetch | eztools | 193 |
| registry.system | regripper | 33492 |
| registry.system | regripper | 283 |
| registry.system | regripper | 283 |
| registry.system | regripper | 5209 |
| registry.system | regripper | 199 |
| registry.system | regripper | 199 |
| tsk.timeline | sleuthkit | 344089 |
| registry.system | regripper | 381 |
| registry.system | regripper | 255 |
| registry.system | regripper | 255 |
| registry.usrclass.admin11 | regripper | 11 |
| registry.ntuser.admin11 | regripper | 133 |
| registry.ntuser.default | regripper | 74 |
| registry.usrclass.informant | regripper | 102 |
| registry.ntuser.informant | regripper | 306 |
| registry.usrclass.temporary | regripper | 15 |
| registry.ntuser.temporary | regripper | 118 |
| pcap.disk.atiumd6a | tshark | 10 |
| pcap.disk.atiumdva | tshark | 10 |
| pcap.disk.atiumd6a | tshark | 10 |
| pcap.disk.atiumdva | tshark | 10 |
| appfiles.users.appdata.local.manifest.json | icat | 23 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.outlookmui.xml | icat | 67 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.setup.xml | icat | 53 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.com.ar.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.ameritech.net.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.btinternet.net.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.btopenworld.com.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.flash.net.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.gmail.com.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.nl.rogers.com.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.nvbell.net.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.pacbell.net.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.prodigy.net.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.rogers.com.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.sbcglobal.net.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.snet.net.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.swbell.net.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.talk21.com.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.wans.net.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.com.au.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.com.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.ca.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.co.id.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 11 |
| appfiles.program_files.*outlook*.yahoo.co.in.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.co.jp.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.co.kr.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.co.nz.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.co.th.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.co.uk.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.com.br.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.com.cn.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.com.hk.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.com.mx.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.com.my.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.com.ph.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.com.sg.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.com.tw.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.com.vn.xml | icat | 25 |
| appfiles.users.appdata.local.verified_contents.json | icat | 2 |
| appfiles.program_files.*outlook*.yahoo.de.xml | icat | 25 |
| appfiles.users.appdata.local.manifest.json | icat | 20 |
| appfiles.program_files.*outlook*.yahoo.es.xml | icat | 25 |
| appfiles.users.appdata.local.manifest.json | icat | 23 |
| appfiles.program_files.*outlook*.yahoo.fr.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.hk.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.ie.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.it.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.jp.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.no.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.pl.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.se.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.outlookmui.xml | icat | 67 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.setup.xml | icat | 53 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.com.ar.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.ameritech.net.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.btinternet.net.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.btopenworld.com.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.flash.net.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.gmail.com.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.nl.rogers.com.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.nvbell.net.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.pacbell.net.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.prodigy.net.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.rogers.com.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.sbcglobal.net.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.snet.net.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.swbell.net.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 11 |
| appfiles.program_files.*outlook*.talk21.com.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.wans.net.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.com.au.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.com.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.ca.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.co.id.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.co.in.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.co.jp.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.co.kr.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.co.nz.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.co.th.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.co.uk.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.com.br.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.com.cn.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.com.hk.xml | icat | 25 |
| appfiles.users.appdata.local.verified_contents.json | icat | 2 |
| appfiles.program_files.*outlook*.yahoo.com.mx.xml | icat | 25 |
| appfiles.users.appdata.local.manifest.json | icat | 26 |
| appfiles.program_files.*outlook*.yahoo.com.my.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.com.ph.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.com.sg.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.com.tw.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.com.vn.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.de.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.es.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.fr.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.hk.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.ie.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.it.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.jp.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.no.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.pl.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.program_files.*outlook*.yahoo.se.xml | icat | 25 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.manifest.json | icat | 26 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.verified_contents.json | icat | 2 |
| appfiles.users.appdata.local.manifest.json | icat | 24 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| appfiles.users.appdata.local.messages.json | icat | 12 |
| registry.profile | python-registry | 54 |
| recycle_bin | icat | 16 |
| composite.execution | composite | 1618 |
| composite.timeline | composite | 2117 |
| composite.defense_evasion | composite | 235 |
| composite.file_staging | composite | 80 |
| composite.recovery | composite | 58 |
| composite.exfil | composite | 2495 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.timeline | composite | 2117 |
| composite.defense_evasion | composite | 219 |
| composite.file_staging | composite | 80 |
| composite.exfil | composite | 2507 |
| enrichment.iocs | enrichment | 53 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
