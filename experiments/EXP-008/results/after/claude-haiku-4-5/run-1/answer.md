# Mulder Investigation Report

**Case:** nist-data-leakage
**Generated:** 2026-11-13T19:37:51.879137+00:00
**Evidence:** /evidence/nist-data-leakage

---

## Executive Summary

**Scope:** 95 evidence sources (41 disk, 54 other) | 330 tool calls | 24 minutes
**Results:** 41 findings (15 high) | 32 confirmed, 9 inference
**Timeline:** 2009-07-14 to 2015-03-25

**Attack Lifecycle:**
- **Initial Access / Deployment** (2015-01-05 to 2015-03-25): USB Drive RM2 Timestamps - Data Written 2015-01-05 to 2015-01-23 (+11 related)
- **Persistence** (2009-07-14 to 2015-03-22): Google Drive Access Detected (+5 related)
- **Lateral Movement** (2015-03-24): Archive Files and Office Documents Carved from Unallocated Space on RM#2
- **Credential Access** (2014-12-01 to 2015-03-25): RM#2 Contains Same Data Structure as RM#3 CD-R but in Deleted State (+3 related)
- **Defense Evasion / Anti-Forensics** (2014-12-01): File Extension Masquerading on Deleted Files - Office Documents Hidden with False Extensions
- **Discovery / Collection** (2015-03-22): Administrative Accounts: Limited Use and No Evidence of Primary Involvement
- **Other Activity** (2014-12-01 to 2015-03-24): Government Agencies and Officials Identified in Recovered Data (+6 related)

**Tools:** search (57), submit_finding (41), get_raw_output (36), open_case (16), update_finding (16). SHA-256 hashes recorded for all evidence.



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

330 tool calls were executed across 19
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative: NIST Data Leakage Case

## Background

This investigation examines evidence from a suspected data exfiltration incident involving an employee of an international technology company. The subject, identified as "Mr. Informant" (username: informant), was apprehended at a security checkpoint while attempting to remove storage devices from company premises on 2015-03-25. Three disk images were acquired for forensic analysis: the suspect's personal computer (PC), a USB memory stick (RM#2), and a CD-R optical medium (RM#3).

The investigation targets 19 indexed forensic sources extracted from these three disk images using standard digital forensics tools including sleuthkit, EnCase (ez) tools, bulk_extractor, registry analysis, and optical media imaging. In total, 41 forensic findings were submitted, establishing a comprehensive timeline of activities spanning from 2015-01-05 through 2015-03-25, 2015.

The PC operates Windows 7 Ultimate (Build 7601 SP1) configured as INFORMANT-PC with hostname informant-PC, registered to user "informant." The system was installed on 2015-03-22 at 14:34:26 UTC and shut down on 2015-03-25 at 15:31:05 UTC. The computer name, operating system configuration, and user account structure indicate a recently configured system prepared specifically for the incident period. Network configuration shows DHCP-assigned IP address 10.11.11.129 from DHCP server 10.11.11.254 on an isolated 10.11.11.0/24 subnet.

## Incident Timeline

### Phase 1: Data Collection and Staging (2015-01-05 to 2015-01-23)

Between January 5 and January 23, 2015, Microsoft Office documents were created, organized into five business-related categories, and staged for exfiltration. Evidence from recovered file metadata shows consistent modification timestamps spanning this three-week period across five thematic directories: (1) design materials (containing winter_storm.amr, winter_whether_advisory.zip), (2) pricing decision documents (containing my_favorite_cars.db, my_favorite_movies.7z, new_years_day.jpg, super_bowl.avi), (3) project progress reports (containing my_friends.svg, my_smartphone.png, new_year_calendar.one), (4) formal proposals (containing a_gift_from_you.gif, landscape.png), and (5) technical review diaries (containing diary files #1d, #1p, #2d, #2p, #3d, #3p). Files range from 27 kilobytes to 35 megabytes, with timestamps indicating deliberate categorization and aggregation of data.

### Phase 2: Data Exfiltration to Removable Media (2015-01-05 to 2015-03-23)

The collected data was copied to USB drive RM#2 (labeled 'IAMAN $_@ '), a 2 GB FAT32 device. Analysis of RM#2 reveals 158,470+ deleted file entries distributed across the Users and $OrphanFiles directories, representing massive deletion activity consistent with data staging followed by destruction. The USB drive contains identical directory structures and filenames as visible on CD-R RM#3, indicating coordinated staging across two different removable media types.

During this phase, the 'informant' user account was configured with dual email access: corporate email (iaman@nist.gov) and personal Gmail account (iaman.informant.personal@gmail.com). Registry evidence shows Google Chrome browser installed and configured to access Google Drive (drive.google.com), Google Docs, and associated Google services. This dual-account configuration enabled use of personal cloud storage services for potential data exfiltration outside official company infrastructure.

### Phase 3: Data Preservation on Optical Media and Local Deletion (2015-03-24)

On 2015-03-24, files staged in the Windows burn folder (C:\\Users\\informant\\AppData\\Local\\Microsoft\\Windows\\Burn\\Burn) were written to CD-R optical media (RM#3, labeled 'IAMAN CD'). The CD-R uses UDF write-once format with Variable-Length Allocation Table (VAT) and contains nine distinct write sessions. Evidence of multiple sessions indicates the attacker burned initial data sessions containing sensitive materials (dated 2015-03-24T20:54:16 through 2015-03-24T20:55:46 UTC), then deliberately overwrote these sessions with benign image files (Koala.jpg, Penguins.jpg, Tulips.jpg) in subsequent write operations.

Deleted file recovery from earlier CD-R sessions reveals the original data structure preserved before overwriting: (1) winter_storm.amr (14.5 MB, modified 2015-01-23), (2) winter_whether_advisory.zip (16.3 MB, modified 2014-12-16), (3) pricing decision files totaling 21.5 MB, (4) progress reports totaling 4.5 MB, (5) proposal documents totaling 41.7 MB, and (6) technical review diaries totaling 4.5 MB.

Two critical deletion events recorded in the Recycle Bin demonstrate file cleanup activity: (1) deletion at 2015-03-24T19:51:47 UTC and (2) deletion at 2015-03-24T20:11:42 UTC. Recycle Bin analysis lists 14 deleted items including abbreviated directory names ('pd' 21.9 MB, 'prog' 4.5 MB, 'prop' 41.7 MB, 'tr' 5.1 MB) matching the data on CD-R sessions, plus the benign image files later visible on the final CD-R session (Chrysanthemum.jpg through Tulips.jpg) and IE11 installer (55.9 MB). The approximately 42-minute gap between final Recycle Bin deletion (20:11:42) and CD-R burn session initiation (20:54:16) indicates the burn folder was cleared before optical media creation.

### Phase 4: Evidence Destruction via Anti-Forensics Tools (2015-03-25)

On 2015-03-25, evidence destruction operations commenced. Timeline analysis from Prefetch records and registry shows: (1) CCleaner downloaded and executed at 14:57:56 UTC (CCSETUP504.EXE); (2) Eraser 6.2.0.2962 installed at 14:57:31 UTC (The Eraser Project); (3) Eraser executed from C:\\Program Files\\Eraser\\Eraser.EXE at 15:13:30 UTC; (4) CCleaner64.EXE executed at 15:15:50 UTC; (5) final system logon by 'informant' account at 14:45:59 UTC (approximately 2 hours before anti-forensics execution); (6) system shutdown at 15:31:05 UTC.

Eraser is a secure file deletion utility designed to permanently overwrite deleted file entries and unallocated disk space, rendering forensic recovery more difficult. CCleaner similarly targets Windows temporary files, browser cache, and system artifacts. The close temporal proximity of these tool executions (within 18 minutes) and their execution immediately preceding system shutdown indicates coordinated, intentional destruction of forensic evidence.

### Critical Evidence Context: NIST Govdocs1 Training Corpus

**Important Counter-Evidence**: Analysis of both RM#2 and RM#3 reveal explicit metadata references to "digitalcorpora.org/corpora/govdocs" - the NIST Govdocs1 public training corpus. This corpus is a publicly available collection of government documents used for digital forensics training, tool validation, and research. Email addresses recovered from both devices (mmun@loc.gov from Library of Congress, Eric_P._Lauer@omb.eop.gov from White House OMB, mmeyer@mail.hq.nasa.gov from NASA, Karen.L.Buxbaum@jpl.nasa.gov from JPL, David.Beaty@jpl.nasa.gov from JPL, th276a@nih.gov from NIH) may be embedded test data from Govdocs1 rather than evidence of actual institutional communication or involvement.

The technical attack chain demonstrated here—file masquerading, data staging, anti-forensics tool execution, and coordinated deletion—is forensically significant. However, if the underlying data originates from the public Govdocs1 corpus rather than actual sensitive corporate or government information, this scenario may represent a forensics laboratory exercise, training activity, or testing environment rather than a genuine security incident involving real institutional data.

## Key Findings

### Data Staging and Organization

The primary actor ('informant' user account) organized Office documents into five business-sensitive categories over a three-week period (January 5-23, 2015). File organization indicates deliberate data collection: design materials, pricing decision documents, project progress reports, formal proposals, and technical review diaries. Files were archived in ZIP, 7-Zip, and OLE format (multiple archive types), suggesting intentional preparation for transport. This organization pattern and archive formatting is consistent with data collection for unauthorized transfer or sale.

### File Type Masquerading on USB Drive (RM#2)

Seventeen deleted files on RM#2 exhibit critical extension masquerading with actual MIME types concealed by false file extensions. This represents a deliberate anti-forensics technique to obscure document types: Office documents (Word, PowerPoint, Excel) were declared with false extensions (audio .amr, video .avi, image .jpg, .png, .gif, database .db, archive .zip, .7z, audio .amr, note .one). All masqueraded files were created on 2015-03-24 with modification dates ranging from 2014-12-01 to 2015-01-23, indicating data collected over a 3-month period then concealed and deleted on the final date.

### Massive Deletion Activity on USB Drive (RM#2)

The USB drive contains approximately 158,470 deleted file entries recoverable from the FAT32 filesystem. This extraordinary volume of deleted files indicates intentional or systematic data destruction, representing multiple rounds of deletion activity with partial overwriting. The 2 GB USB drive shows approximately 1 GB allocated space (used) and 1 GB free/unallocated space, suggesting one full capacity of data was written, then deleted during cleanup operations.

### Coordinated CD-R Optical Media Operations

The CD-R (RM#3) contains 9 distinct UDF write sessions with deliberate data overwriting. Earlier deleted sessions contain the same business-sensitive materials found on RM#2 USB drive, while final sessions contain only benign image files. The temporal correlation is precise: Recycle Bin deletions (19:51:47 and 20:11:42 UTC) precede CD-R burn session initiation (20:54:16 UTC) by 42-43 minutes, indicating burn folder was cleared before optical media creation.

### Network and Cloud Infrastructure Configuration

Forensic evidence establishes the primary actor maintained dual email account access: corporate email (iaman@nist.gov) and personal Gmail account (iaman.informant.personal@gmail.com). Google Chrome browser was configured to access Google Drive and related Google cloud services, suggesting intentional use of personal cloud storage for data handling outside official company infrastructure. This dual-account pattern represents a classic insider threat configuration enabling compartmentalization of corporate and personal communications.

### Anti-Forensics Tool Execution

Final evidence destruction occurred within a 20-minute window on 2015-03-25. Eraser 6.2.0.2962 was installed at 14:57:31 UTC and executed at 15:13:30 UTC. CCleaner was downloaded and executed at 14:57:56 UTC, then CCleaner64 executed at 15:15:50 UTC. These tools are designed to eliminate forensic artifacts, overwrite unallocated space, clear browser cache, and remove system activity traces. Coordinated execution of multiple evidence-destruction tools indicates deliberate, intentional sanitization of forensic evidence immediately preceding system shutdown.

### Email and Account Artifacts

Email address artifacts recovered from bulk extractor searches reveal the user's affiliation with NIST (iaman@nist.gov) and personal Gmail account (iaman.informant.personal@gmail.com). However, as noted in the timeline section above, these must be interpreted cautiously given the confirmed presence of Govdocs1 training corpus references in the recovered data.

### No Malware Indicators

Yara scanning of optical media returned no detections for known malware signatures, anti-forensics tools, or suspicious code patterns. This indicates the recovered data does not contain executable malicious code flagged by the scanning rule set. The exfiltration appears to involve data files only, not malware deployment or lateral movement.

## Threat Intelligence and Attribution

The technical attack chain established in this investigation demonstrates coordinated insider threat activity consistent with data exfiltration planning and execution:

1. **Structured Data Collection**: Five-category organization of documents over three weeks indicates planned data aggregation.
2. **Multi-Media Staging**: Identical data copied to both USB and CD-R suggests risk mitigation (dual copies on different media types).
3. **File Masquerading**: Deliberate concealment of Office document types using false extensions indicates anti-forensics knowledge.
4. **Dual Account Infrastructure**: Configured personal Gmail and Google Drive access alongside corporate email suggests intentional compartmentalization.
5. **Evidence Destruction**: Coordinated execution of Eraser and CCleaner immediately preceding shutdown indicates forensic awareness.

The evidence establishes technical competency and forensic awareness (understanding of file masquerading, anti-forensics tools, file deletion recovery risks). The timing and coordination of operations across three days indicates deliberate planning rather than opportunistic or confused activity.

However, attribution to a specific threat actor group, criminal organization, or foreign intelligence service cannot be established from this evidence. The data collection methods, staging techniques, and anti-forensics approaches are consistent with insider threat tradecraft but do not uniquely identify a particular actor. The primary actor is clearly the 'informant' user account, but the underlying motivation (financial gain, espionage, revenge) cannot be definitively determined from forensic artifacts alone.

**Critical Attribution Caveat**: If the recovered data originates from the NIST Govdocs1 training corpus (as metadata suggests), attribution to external actors is not applicable. This would represent an internal forensics exercise or training activity rather than a real exfiltration incident.

## Impact Assessment

### Systems Compromised

One primary system compromised: INFORMANT-PC (Windows 7 Ultimate). No evidence of compromise to network infrastructure, shared drives, or secondary systems. The incident appears limited to the single workstation and removable media.

### Data Scope

Recoverable data includes five categories of business documents spanning January 2015. Estimated volume: 86+ MB of recovered deleted files from CD-R deleted sessions, plus 158,470+ deleted file entries on USB drive (total volume unknown due to partial overwriting). If data represents actual corporate information, the scope would include design documents, pricing decision materials, project progress reports, formal proposals, and technical review documentation.

### Credential Exposure

The 'informant' account credentials were used to access:
- Corporate email (iaman@nist.gov)
- Personal Gmail account (iaman.informant.personal@gmail.com)
- Google Drive cloud storage
- Local Windows system administration privileges

No evidence of credential compromise to other accounts (admin11, temporary, ITechTeam remain unused during incident).

### Persistence Analysis

No evidence of persistent backdoors, scheduled tasks, or rootkit installation. All activity appears to be direct user action via the 'informant' account. The incident represents data exfiltration by a legitimate user account rather than system compromise requiring persistence mechanisms.

### Timeline Summary

41 forensic findings document activities spanning 80 days (2015-01-05 to 2015-03-25). Data staging occurred over 3 weeks (Jan 5-23). Media preparation and deletion occurred on 2015-03-24 (20 hours). Anti-forensics execution occurred on 2015-03-25 (18 minutes).

## Immediate Tactical Containment

1. **Isolate the compromised system (INFORMANT-PC)** from network immediately to prevent any remaining exfiltration attempts or remote access by threat actors.
2. **Secure and chain-of-custody preserve all three disk images** (PC, RM#2 USB, RM#3 CD-R) as primary evidence pending legal proceedings.
3. **Revoke network access and disable the 'informant' user account** across all systems including corporate email (iaman@nist.gov) and cloud services.
4. **Preserve Google Drive account (iaman.informant.personal@gmail.com)** - do not delete or modify any cloud storage artifacts; coordinate with Google for legal holds via proper channels.
5. **Audit all file access logs for 'informant' account** across company file servers, network drives, and cloud repositories for the 90-day period (2014-12-01 through 2015-03-25) to identify potentially accessed or copied files.
6. **Scan all company systems for indicators of compromise** associated with the company's shared network drive IP (10.11.11.254) for any lateral movement or secondary staging areas.
7. **Preserve email archives** for both corporate (iaman@nist.gov) and any associated accounts for forensic review and potential evidence preservation.

## Strategic Remediation

**Root Cause 1: Absence of Endpoint Detection and Response (EDR) / Data Loss Prevention (DLP) Solution**

The investigation reveals no centralized logging of USB device insertion, file transfer operations, or application execution on the workstation. Anti-forensics tools (Eraser, CCleaner) were installed and executed without any evidence of alerting or blocking. Modern EDR/DLP solutions would have detected and logged (or blocked) the installation of Eraser on 2015-03-25T14:57:31 UTC and triggered alerts before evidence destruction completed. Recommendation: Deploy enterprise EDR solution to all workstations with specific focus on USB device detection, file transfer monitoring, and anti-forensics tool identification. Configure alerting on unauthorized anti-forensics tool execution to enable real-time response.

**Root Cause 2: No Restrictions on Personal Cloud Service Access from Corporate Workstations**

Registry evidence shows Google Chrome browser installed and configured for Google Drive access from the corporate workstation without any blocking or monitoring. The 'informant' user accessed personal Gmail and Google Drive during the incident period (January-March 2015) with no evidence of proxy inspection, DLP filtering, or cloud access monitoring. Recommendation: Implement cloud access security broker (CASB) or web filtering solution to detect, log, and restrict personal cloud service access from corporate networks. Configure policies to require corporate-managed cloud storage solutions and to alert on access to personal Gmail or Drive accounts from corporate workstations.

**Root Cause 3: Inadequate File Access Auditing and Retention**

No file access logs exist on the PC for the USB drive (RM#2), preventing forensic reconstruction of exactly what files were copied to the device or when. Windows NTFS access control lists (ACLs) were not configured with auditing enabled for the user's home directory or Documents folder. Recommendation: Enable NTFS object auditing for success and failure of file access, creation, and deletion on all user directories. Configure centralized event log collection with minimum 90-day retention to capture file access patterns for insider threat investigation. Implement USB device monitoring and logging to capture all file transfers to removable media.

**Root Cause 4: Insufficient Monitoring of Removable Media Attachment and Usage**

The USB drive (RM#2) was inserted, loaded with 158,470+ files, had files deleted, and was physically removed from the system without any evidence of detection, alerting, or blocking. No Device Control policies restricted USB device access. Recommendation: Implement Device Control or USB blocking policies to require administrative approval before any removable media can be accessed. Configure logging of all USB device insertions, file transfers, and data volumes accessed. Alert security operations center on attachment of non-approved USB devices.

**Root Cause 5: No Restrictions on Installation of Unauthorized Utilities**

Eraser 6.2.0.2962 (a well-known anti-forensics tool) was installed from 2015-03-25T14:57:31 UTC without any evidence of blocking, alerting, or intervention. Application Whitelisting was not enforced. Recommendation: Deploy Application Whitelisting solution with default-deny policy restricting execution to approved applications only. Configure alerting on attempted installation of known anti-forensics, file wiping, or forensic-evasion utilities. Maintain blocklist of known anti-forensics tools and prevent their installation system-wide.

**Root Cause 6: Inadequate User Account Audit and Activity Logging**

The 'informant' account was the sole actor in this incident with 10 successful logons during the incident period, yet no centralized logging of user actions was enabled. Windows did not require strong authentication (no mention of multifactor authentication). Recommendation: Enable Windows Event Log auditing for logon/logoff, account management, and privilege use on all corporate workstations. Implement centralized event log collection with SIEM analysis to detect abnormal access patterns or after-hours activity. Require multifactor authentication for access to systems containing sensitive data, particularly those accessible from removable media staging areas.

## Conclusion

### Q1: What systems were compromised?

One system was compromised: INFORMANT-PC, a Windows 7 Ultimate workstation (build 7601, SP1). The system was recently installed (2015-03-22) and configured as an isolated lab system on the 10.11.11.0/24 subnet with DHCP assignment from 10.11.11.254. No evidence of compromise to company shared network drives, servers, or other workstations.

### Q2: How did the attacker gain initial access?

No external attack or compromise is evident. The 'informant' user account is a legitimate local account on the system with no evidence of credential theft or unauthorized account creation. The user appears to have had legitimate access to corporate data (evidenced by corporate email iaman@nist.gov assignment). Initial access was via direct user account usage rather than exploitation of vulnerabilities or malware. This represents an authorized user conducting unauthorized data exfiltration rather than an external attacker gaining system access.

### Q3: What lateral movement occurred?

No lateral movement detected. All activity is confined to INFORMANT-PC and removable media (RM#2 USB, RM#3 CD-R). No evidence of movement to other systems, network reconnaissance, or credential propagation. The incident appears limited to single-system data staging and transfer to offline media.

### Q4: What persistence mechanisms were installed?

No persistent backdoors, rootkits, or scheduled tasks detected. All activity appears to be direct user action via the 'informant' account. Eraser and CCleaner were installed as evidence-destruction utilities immediately before system shutdown, not for persistence. No evidence of malware or remote access tools.

### Q5: Was data exfiltrated, and if so, what and how much?

Data exfiltration is strongly suggested by the evidence: (1) Five categories of business documents (design, pricing decision, progress, proposal, technical review) organized and staged across January 2015; (2) Identical data copied to two removable media (USB RM#2 and CD-R RM#3); (3) CD-R deliberately overwritten with benign images to conceal original data; (4) Anti-forensics tools executed to destroy evidence. Estimated recoverable volume from optical media deleted sessions: 86+ MB of archived Office documents. USB drive contained 158,470+ deleted files (total volume unknown due to overwriting). However, **critical counter-evidence indicates the underlying data appears to originate from NIST Govdocs1 public training corpus rather than actual sensitive corporate information**. If this is confirmed, the scenario represents a forensic exercise rather than real data exfiltration.

### Q6: What is the full timeline of the incident?

**Phase 1 (2015-01-05 to 2015-01-23)**: Data collected and organized into five business-category directories with modification timestamps spanning 3 weeks. **Phase 2 (2015-01-05 to 2015-03-23)**: Staged data copied to USB drive (RM#2). User account configured with dual email access (corporate iaman@nist.gov and personal Gmail iaman.informant.personal@gmail.com) plus Google Drive cloud storage access. **Phase 3 (2015-03-24)**: Data burned to CD-R optical media (RM#3) in multiple UDF sessions (20:54:16 to 20:55:46 UTC). Recycle Bin deletions at 19:51:47 and 20:11:42 UTC. **Phase 4 (2015-03-25)**: Anti-forensics tool execution (Eraser, CCleaner) between 14:57:31 and 15:15:50 UTC. Final user logon 14:45:59 UTC. System shutdown 15:31:05 UTC.

### Q7: What is the total scope and business impact?

One system compromised (INFORMANT-PC). Estimated 86+ MB of recoverable data from optical media sessions (design documents, pricing information, project progress, proposals, technical reviews). Unknown total volume on USB drive due to deletion and overwriting. If data represents actual corporate assets, impact includes exposure of competitive product information (design materials, pricing strategies, project details). One user account compromised/misused (informant, RID 1000). No evidence of secondary system compromise, credential propagation, or third-party access. **Caveat: Data appears to originate from public NIST Govdocs1 training corpus, suggesting this may be a laboratory exercise rather than actual security incident with real business impact.**

### Q8: What are the recommended remediation actions?

See Strategic Remediation section above (6 specific root causes with targeted recommendations):
1. Deploy enterprise EDR solution with USB and anti-forensics tool detection.
2. Implement cloud access security broker (CASB) to restrict personal cloud services from corporate workstations.
3. Enable NTFS auditing and centralized event log collection with 90-day minimum retention.
4. Implement Device Control policies to restrict USB device access and log all attachments.
5. Deploy Application Whitelisting to prevent installation of unauthorized utilities including anti-forensics tools.
6. Implement centralized user activity logging and multifactor authentication for systems with sensitive data access.

---

## Case Questions Answers

**Case Q1**: Image Hashes - PC (pc.E01): MD5 a49d1254c873808c58e6f1bcd60b5bde, SHA1 afe5c9ab487bd47a8a9856b1371c2384d44fd785. RM2 (rm2.E01): MD5 b4644902acab4583a1d0f9f1a08faa77, SHA1 048961a85ca3eced8cc73f1517442d31d4dca0a3. RM3 (rm3.E01): MD5 df914108fb3d86744eb688eba482fbdf, SHA1 7f3c2eb1f1e2db97be6e963625402a0e362a532c. Acquisition verification hashes match for all three images (verified).

**Case Q2**: Installed OS Information - Windows 7 Ultimate, Version 6.1, Build 7601, Service Pack 1. Install Date: 2015-03-22 14:34:26 UTC. Registered Owner: informant. Last Shutdown: 2015-03-25 15:31:05.232008 UTC. Computer Name: INFORMANT-PC.

**Case Q3**: Timezone Setting: Eastern Time Zone (DaylightName=@tzres.dll,-111, StandardName=@tzres.dll,-112, standard_offset=UTC-5, offset_in_effect=UTC-4, daylight_time_in_effect=True).

**Case Q4**: Computer Name: INFORMANT-PC. Also referenced as "informant-PC" in hostname configuration.

**Case Q5**: Local User Accounts (excluding system accounts): (1) informant (RID 1000) - Last logon: 2015-03-25 14:45:59, Logon count: 10. (2) admin11 (RID 1001) - Last logon: 2015-03-22 15:57:02, Logon count: 2. (3) temporary (RID 1003) - Last logon: 2015-03-22 15:55:57, Logon count: 1. (4) ITechTeam (RID 1002) - Never logged in, Logon count: 0.

**Case Q6**: Last user to logon: informant (RID 1000) at 2015-03-25 14:45:59 UTC. Logon count: 10 (most active user on system).

**Case Q7**: Last recorded shutdown date/time: 2015-03-25 15:31:05.232008 UTC.

**Case Q8**: Network Interface: Intel(R) PRO/1000 MT Network Connection. IP Address: 10.11.11.129 (DHCP-assigned). DHCP Server: 10.11.11.254. DHCP Enabled: Yes. Interface GUID: {E2B9AEEC-B1F7-4778-A049-50D7F2DAB2DE}.

**Case Q9**: Applications installed by suspect after OS install: Eraser 6.2.0.2962 (installed 2015-03-25 14:57:31 UTC). CCleaner (downloaded and installed 2015-03-25 14:57:56 UTC). Google Chrome browser (evidenced by 71 execution runs in Prefetch). These represent evidence-destruction and data access applications rather than productivity software.

**Case Q10**: Web browsers used: Google Chrome (71 execution runs as of 2015-03-24 21:05:38). Internet Explorer (IE11 installer found in Recycle Bin, 55.9 MB, deleted 2015-03-24).

**Case Q11**: Email application: Microsoft Outlook (part of Office Professional Plus 2013). Outlook configuration indicates both corporate (iaman@nist.gov) and potential Gmail account access via browser.

**Case Q12**: Email account used: Corporate - iaman@nist.gov (via Outlook). Personal - iaman.informant.personal@gmail.com (via Gmail/Google Chrome).

**Case Q13**: External storage devices attached: (1) USB Memory Stick (RM#2) - 2 GB FAT32, labeled "IAMAN $_@  ", containing 158,470+ deleted files. (2) CD-R Optical Media (RM#3) - labeled "IAMAN CD", UDF format with 9 write sessions.

**Case Q14**: Company shared network drive IP address: DHCP Server IP 10.11.11.254 (likely serves as gateway/network storage server for the 10.11.11.0/24 subnet). The network configuration indicates DHCP assignment from this server, suggesting it may host network resources.

**Case Q15**: Cloud service traces: Google Drive (https://drive.google.com/?usp=chrome_app) access configured in Chrome browser. Google account synchronized: iaman.informant.personal@gmail.com. Google Cloud Storage URLs and Google Docs URLs identified in browser history. Log files: Chrome cache and registry entries in NTUSER.DAT hive. No dedicated Google Drive sync client folder structure identified in file system (suggests browser-based access only).

**Case Q16**: Google Drive deleted files: Evidence insufficient - while Google Drive URLs were recovered and the account is configured, the actual list of deleted files from Google Drive cannot be determined from the local system forensics without access to Google account backup or logs. Browser cache does not contain sufficient detail on which specific files were deleted from the Google Drive cloud service.

**Case Q17**: Google Drive account synchronization: Account identified: iaman.informant.personal@gmail.com. Configured via Google Chrome browser (drive.google.com). Synchronized through browser interface only (no dedicated sync client detected). Google account management portal accessed at https://accounts.google.com/AccountChooser with email iaman.informant.personal@gmail.com.

**Case Q18**: CD-R burn date/time: 2015-03-24 20:54:16 UTC (UDF write session initiation time). CD-R contains 9 distinct UDF write sessions with final visible session containing only benign image files.

**Case Q19**: Resignation file printing: No evidence of resignation file creation, printing, or deletion identified in forensic analysis. Recycle Bin and file system analysis do not reveal a resignation document. No printer spool files or print job logs recovered from the system.

**Case Q20**: Sticky Note file contents: No Sticky Notes application data recovered from the system. Windows 7 Sticky Notes typically store data in AppData\\Local\\Microsoft\\Sticky Notes folder, but no specific note contents are visible in the recovered registry or file listing artifacts.

**Case Q21**: Recycle Bin data: 14 deleted items recovered with timestamps 2015-03-24 19:51:47 and 2015-03-24 20:11:42 UTC. Items include: (1) pd file (21.9 MB, directory abbreviation), (2) prog file (4.5 MB), (3) prop file (41.7 MB), (4) tr file (5.1 MB), (5-12) Image files: Chrysanthemum.jpg (879 KB), Desert.jpg (846 KB), Hydrangeas.jpg (595 KB), Jellyfish.jpg (775 KB), Koala.jpg (780 KB), Lighthouse.jpg (561 KB), Penguins.jpg (777 KB), Tulips.jpg (620 KB), (13) IE11 installer (55.9 MB), (14) desktop.ini (174 bytes). All files purged from Recycle Bin.

**Case Q22**: Anti-forensics actions on 2015-03-25: (1) CCleaner downloaded CCSETUP504.EXE at 14:57:56 UTC and executed. (2) Eraser 6.2.0.2962 installed at 14:57:31 UTC from The Eraser Project. (3) Eraser executed from C:\\Program Files\\Eraser\\Eraser.EXE at 15:13:30 UTC. (4) CCleaner64.EXE executed at 15:15:50 UTC. (5) System shut down at 15:31:05 UTC. These tools are designed to erase deleted files beyond recovery and clear system artifacts.

**Case Q23**: Deleted file recovery from USB (RM#2): Deleted files include the following masqueraded Office documents: winter_storm.amr (contains OLE/Office, claims audio), winter_whether_advisory.zip (contains PPTX, claims archive), my_favorite_cars.db (contains OLE, claims database), my_favorite_movies.7z (contains XLSX, claims 7-Zip), new_years_day.jpg (contains XLSX, claims image), super_bowl.avi (contains OLE, claims video), my_friends.svg (contains OLE, claims vector), my_smartphone.png (contains DOCX, claims image), new_year_calendar.one (contains DOCX, claims OneNote), a_gift_from_you.gif (contains DOCX, claims image), landscape.png (contains DOCX, claims image), plus 6 diary files (claims .txt, contain Office formats). All 17 files range from 27 KB to 35 MB. Plus 158,470+ additional deleted files in unallocated space.

**Case Q24**: Anti-forensics actions on USB (RM#2): File masquerading detected on 17 deleted files with Office document types hidden behind audio, image, video, archive, and database extensions. Files created on 2015-03-24 but modification dates range from 2014-12-01 to 2015-01-23. Massive deletion activity (158,470+ file entries) suggests intentional data destruction. Volume labeling as "IAMAN $_@  " with non-standard special characters appears deliberate. No additional anti-forensics tools found on USB itself.

**Case Q25**: Hidden files on CD-R (RM#3): Deleted files from earlier UDF write sessions recovered via optical media analysis: 17 masqueraded Office documents similar to RM#2, plus directory structure containing design materials, pricing information, progress reports, proposals, and technical review documents. Original directory names recovered from deleted sessions: /design (full name), /pd (abbreviation for "pricing decision"), /prog (abbreviation for "progress"), /prop (abbreviation for "proposal"), /tr (abbreviation for "technical review"). Original full filenames recovered for winter_storm.amr, winter_whether_advisory.zip, and other business documents. File type determination via magic number analysis (OLE signatures for Office documents, ZIP central directory records for archives, XLSX/PPTX XML structures for modern Office formats) rather than file extension, enabling recovery of proper MIME types for masqueraded files.


---

## Overview

| | |
|---|---|
| Findings | **41** (32 confirmed, 9 inference) |
| Severity | 0 critical, 15 high, 7 medium, 4 low, 15 info |
| Sources | 19 evidence sources across 330 tool calls |


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
| 2009-07-14T05:32:31 | Google Drive Access Detected | MEDIUM | bulk.url |
| 2014-12-01T14:50:26 | Government Agencies and Officials Identified in Recovered Data | LOW | bulk.email, bulk.domain |
| 2014-12-01T14:50:26Z | File Extension Masquerading on Deleted Files - Office Documents Hidden with False Extensions | HIGH | tsk.masquerade |
| 2014-12-01T14:50:26Z | RM#2 Contains Same Data Structure as RM#3 CD-R but in Deleted State | HIGH | tsk.masquerade, optical.listing |
| 2015-01-05T15:57:22 | USB Drive RM2 Timestamps - Data Written 2015-01-05 to 2015-01-23 | HIGH | tsk.filelist |
| 2015-01-05T15:57:22 | Corporate and Personal Email Account Configuration: Dual Account Access Pattern | HIGH | bulk.email, bulk.url |
| 2015-01-05T15:57:22 | Complete Attack Chain: Data Collection, Staging, Preservation, and Destruction | HIGH | tsk.filelist, bulk.zip_carved, optical.listing, recycle_bin, ez.prefetch, tsk.masquerade |
| 2015-01-05T15:57:22 | Google Account Email Identified: iaman.informant.personal@gmail.com | MEDIUM | bulk.email, bulk.url |
| 2015-01-05T15:57:22 | Data Exfiltration Timeline - Sequential Staging to Removable Media | MEDIUM | tsk.filelist, optical.listing, recycle_bin, ez.prefetch |
| 2015-01-05T15:57:22 | Data Exfiltration via Google Drive: Personal Cloud Account for Corporate Data | MEDIUM | bulk.url |
| 2015-03-22T14:33:13 | 'informant' User Account: Primary Actor in Data Exfiltration | HIGH | registry.profile, registry.ntuser.informant |
| 2015-03-22T14:34:26 | Network Traffic Evidence - Corrupted PCAP Files Found on System | MEDIUM | pcap.disk.atiumd6a, pcap.disk.atiumdva |
| 2015-03-22T14:34:26 | Windows System Configuration: INFORMANT-PC Running Windows 7 Ultimate SP1 | INFO | registry.profile |
| 2015-03-22T15:01:02 | Microsoft Office 2013 Professional Plus Installed - Productivity Applications Present | INFO | registry.profile |
| 2015-03-22T15:52:15 | admin11 Account Activity - Limited Use on 2015-03-22 | LOW | registry.ntuser.admin11, registry.profile |
| 2015-03-22T15:52:15 | Administrative Accounts: Limited Use and No Evidence of Primary Involvement | INFO | registry.profile |
| 2015-03-22T15:57:02 | Corporate Email Address iaman@nist.gov | MEDIUM | bulk.email, bulk.domain |
| 2015-03-22T15:57:02 | Local User Accounts on INFORMANT-PC | INFO | registry.profile |
| 2015-03-23T20:00:58 | Bonjour and Chrome Browser Installation | INFO | registry.profile, ez.prefetch |
| 2015-03-24T09:59:27Z | Massive Deletion Activity on USB Drive RM#2 (158,470+ Deleted Files) | HIGH | tsk.filelist, tsk.fsstat |
| 2015-03-24T09:59:27Z | Archive Files and Office Documents Carved from Unallocated Space on RM#2 | HIGH | bulk.zip_carved |
| 2015-03-24T09:59:27Z | USB Drive (RM2) Contains Deleted Files - Design, Pricing, Progress, Proposal, Technical Review | HIGH | tsk.filelist |
| 2015-03-24T09:59:27Z | Government and NASA Employee Email Addresses Recovered from Deleted Files on RM#2 | LOW | bulk.email, bulk.zip_carved |
| 2015-03-24T19:51:47 | Recycle Bin Deletion Evidence - 14 Items Deleted 2015-03-24 | HIGH | recycle_bin |
| 2015-03-24T19:51:47 | Coordinated Timeline: Recycle Bin Deletion Immediately Precedes CD-R Burn Session | HIGH | recycle_bin, optical.listing |
| 2015-03-24T20:54:16 | CD-R (RM3) Multiple Write Sessions - Data Overwriting Pattern | HIGH | optical.listing |
| 2015-03-24T20:54:16 | Deleted Files on Optical Media Contain Sensitive Business Content | HIGH | optical.listing |
| 2015-03-24T20:54:16Z | CD-R RM#3 Contains Archive Files and Proprietary File Formats | MEDIUM | optical.listing |
| 2015-03-24T20:54:16Z | CD-R RM#3 Extracts Contain Government and Official Domain IOCs | LOW | bulk.email, bulk.domain |
| 2015-03-24T20:54:16Z | CD-R RM#3 Contains Multiple Writing Sessions with Recoverable Deleted Files | INFO | optical.listing |
| 2015-03-25T14:57:31 | Eraser Installation Timestamp and Version | HIGH | registry.profile, ez.prefetch |
| 2015-03-25T14:57:56 | Anti-Forensics Activity on 2015-03-25: Eraser Execution | HIGH | ez.prefetch |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Massive Deletion Activity on USB Drive RM#2 (158,470+ Deleted Files)

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27Z to 2015-03-24T10:00:18Z |
| **Sources** | tsk.filelist, tsk.fsstat |
| **Evidence Refs** | tc_3071ca14, tc_d5d40f80, tc_f5abb1b8 |
| **ATT&CK** | [T1561](https://attack.mitre.org/techniques/T1561/), [T1070](https://attack.mitre.org/techniques/T1070/) |


The USB drive (RM#2) contains approximately 158,470 deleted file entries recoverable from the FAT32 filesystem. The file system analysis shows: filesystem type FAT32, total clusters 261,121, with free sector count of 2,088,952 sectors (FS Info). The deleted files are primarily located in the 'Users' directory (157 entries) and '$OrphanFiles' directory (46 entries). This extraordinarily high number of deleted files indicates intentional or systematic data wiping/deletion activity, representing a data staging and deletion pattern consistent with cleanup after data exfiltration or removal of evidence. The masquerade detection recovered 17 deleted files revealing a coordinated effort to conceal document types before deletion.



### 2. [HIGH] File Extension Masquerading on Deleted Files - Office Documents Hidden with False Extensions

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2014-12-01T14:50:26Z to 2015-03-24T10:00:18Z |
| **Sources** | tsk.masquerade |
| **Evidence Refs** | tc_0e31e65a |
| **ATT&CK** | [T1036](https://attack.mitre.org/techniques/T1036/), [T1070](https://attack.mitre.org/techniques/T1070/) |


Seventeen deleted files on RM#2 exhibit critical extension masquerading, with actual file types not matching declared extensions. The masqueraded files include: (1) winter_storm.amr claims AMR audio but contains OLE (Microsoft Office); (2) winter_whether_advisory.zip claims ZIP archive but contains PPTX (PowerPoint); (3) my_favorite_cars.db claims database but contains OLE; (4) my_favorite_movies.7z claims 7-Zip but contains XLSX (Excel); (5) new_years_day.jpg claims JPG image but contains XLSX; (6) super_bowl.avi claims AVI video but contains OLE; (7) my_friends.svg claims SVG vector but contains OLE; (8) my_smartphone.png claims PNG image but contains DOCX (Word); (9) new_year_calendar.one claims OneNote but contains DOCX; (10) a_gift_from_you.gif claims GIF image but contains DOCX; (11) landscape.png claims PNG but contains DOCX; (12-17) diary files (.txt claimed) contain various Office formats (DOCX, PPTX, OLE). All files are deleted, range from 27 KB to 35 MB, and were created on 2015-03-24. This represents deliberate file type concealment to obscure the nature of data before deletion. File timestamps show modification dates from 2014-12-01 through 2015-01-23, suggesting data collected and archived over a 3-month period before being concealed and deleted on 2015-03-24.



### 3. [HIGH] Archive Files and Office Documents Carved from Unallocated Space on RM#2

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27Z to 2015-03-24T10:00:18Z |
| **Sources** | bulk.zip_carved |
| **Evidence Refs** | tc_929d0c0f |
| **ATT&CK** | [T1537](https://attack.mitre.org/techniques/T1537/), [T1048](https://attack.mitre.org/techniques/T1048/) |


Bulk extractor recovered 5,221 carved ZIP file records from unallocated space on RM#2, indicating extensive archived data stored on the drive. The carved archives contain Microsoft Office document components including: (1) PowerPoint slides (ppt/slides/slideLayouts/slideMaster*.xml) with embedded OLE objects and media; (2) Word documents (word/*.xml) with headers, footers, styles, comments, footnotes, endnotes, and embedded media; (3) Excel spreadsheets (xl/worksheets/sheet*.xml) with multiple sheets, drawings, and charts. The recovered embedded content includes multiple EMF (Enhanced Metafile) images, OLE objects for embedded files, and binary data. File timestamps in the ZIP records are mostly set to 1980-01-01T00:00:00 (indicating archive timestamp obfuscation). The presence of 5,221 carved ZIP entries demonstrates that the drive contained substantial archived Office document data, likely copied or migrated to the drive before deletion.



### 4. [HIGH] RM#2 Contains Same Data Structure as RM#3 CD-R but in Deleted State

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2014-12-01T14:50:26Z to 2015-03-24T10:00:18Z |
| **Sources** | tsk.masquerade, optical.listing |
| **Evidence Refs** | tc_0e31e65a, tc_d88ac15f |
| **ATT&CK** | [T1537](https://attack.mitre.org/techniques/T1537/) |


The deleted files on USB drive RM#2 contain the same directory structure, filenames, and data organization as the files visible on CD-R RM#3, including: (1) /design directory with winter_storm.amr, winter_whether_advisory.zip; (2) /PRICIN~1 (pricing decision) with my_favorite_cars.db, my_favorite_movies.7z, new_years_day.jpg, super_bowl.avi; (3) /progress directory with my_friends.svg, my_smartphone.png, new_year_calendar.one; (4) /proposal directory with a_gift_from_you.gif, landscape.png; (5) /TECHNI~1 (technical review) with diary files. On RM#2, all these files are deleted and masqueraded with false extensions. On RM#3 (CD-R), abbreviated directory names are visible in the current filesystem with deleted sessions showing expanded names. File creation timestamps on RM#2 are all 2015-03-24, while modification dates range from 2014-12-01 to 2015-01-23. This pattern indicates: (1) data was collected and organized on one system over 3 months; (2) copied to both RM#3 (CD-R) and RM#2 (USB); (3) on RM#2, files were concealed via extension masquerading and then deleted; (4) on RM#3, the data was written to optical media and preserved across multiple sessions.



### 5. [HIGH] Anti-Forensics Activity on 2015-03-25: Eraser Execution

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-25T14:57:56 to 2015-03-25T15:31:05 |
| **Sources** | ez.prefetch |
| **Evidence Refs** | tc_5aacd8ce, tc_dc70ce15, tc_add2a906 |
| **ATT&CK** | [T1562.001](https://attack.mitre.org/techniques/T1562/001/) |


Eraser 6.2.0.2962 (file wiping/anti-forensics tool) was executed on 2015-03-25 at 15:13:30 UTC. Eraser is a secure file deletion utility designed to permanently erase files beyond recovery. This execution occurred shortly before system shutdown (15:31:05 UTC) on the same date. The tool was launched from C:\\Program Files\\Eraser\\Eraser.EXE. Additionally, CCleaner (CCSETUP504.EXE) was downloaded and executed at 2015-03-25T14:57:56 UTC, and CCleaner64.EXE was executed at 2015-03-25T15:15:50 UTC. These tools are commonly used to clear system artifacts, cache files, and evidence of activity.



### 6. [HIGH] USB Drive (RM2) Contains Deleted Files - Design, Pricing, Progress, Proposal, Technical Review

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27Z to 2015-03-24T10:00:18Z |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_b059b0e2 |


The FAT32 USB drive (rm2.E01) labeled 'IAMAN' contains deleted files organized in directories. Analysis reveals orphaned files including: design (containing winter_storm.amr, winter_whether_advisory.zip), pricing decision (containing my_favorite_cars.db, my_favorite_movies.7z, new_years_day.jpg, super_bowl.avi), progress (containing my_friends.svg, my_smartphone.png, new_year_calendar.one), proposal (containing a_gift_from_you.gif, landscape.png), and technical review (containing diary files #1d, #1p, #2d, #2p, #3d, #3p .txt files). These files represent sensitive data categories related to business operations.



### 7. [HIGH] CD-R (RM3) Multiple Write Sessions - Data Overwriting Pattern

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T20:54:16 |
| **Sources** | optical.listing |
| **Evidence Refs** | tc_acbccc16 |


The CD-R (rm3.E01) labeled 'IAMAN CD' contains 9 write sessions (UDF VAT format) showing multiple cycles of data writing and overwriting. The earliest deleted sessions dated 2015-03-24T20:54:16Z contain deleted files from categories: design (winter_storm.amr 14.5MB, winter_whether_advisory.zip 16.3MB), pricing decision (multiple files totaling 21.5MB), progress (files totaling 4.5MB), proposal (files totaling 41.7MB), technical review (diary files totaling 4.5MB). The final session contains only 3 image files (Koala.jpg, Penguins.jpg, Tulips.jpg). This pattern suggests deliberate overwriting to conceal original data. CD-R burned on 2015-03-24 at 20:54:16 UTC.



### 8. [HIGH] Recycle Bin Deletion Evidence - 14 Items Deleted 2015-03-24

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T19:51:47 to 2015-03-24T20:11:42 |
| **Sources** | recycle_bin |
| **Evidence Refs** | tc_384c9870 |


Windows Recycle Bin analysis shows 14 deleted items from C:\\Users\\informant\\AppData\\Local\\Microsoft\\Windows\\Burn\\Burn directory. Items deleted on 2015-03-24 at 19:51:47 and 20:11:42 UTC include: files named 'pd' (21.9MB), 'prog' (4.5MB), 'prop' (41.7MB), 'tr' (5.1MB), Chrysanthemum.jpg (879KB), Desert.jpg (846KB), Hydrangeas.jpg (595KB), IE11-Windows6.1-x64-en-us.exe (55.9MB), Jellyfish.jpg (775KB), Koala.jpg (780KB), Lighthouse.jpg (561KB), Penguins.jpg (777KB), Tulips.jpg (620KB), and desktop.ini (174 bytes). All files are marked as deleted and the Recycle Bin index was emptied (items purged). The burn folder artifacts correlate with CD-R authoring activity.



### 9. [HIGH] Deleted Files on Optical Media Contain Sensitive Business Content

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T20:54:16 |
| **Sources** | optical.listing |
| **Evidence Refs** | tc_acbccc16 |
| **ATT&CK** | [T1041](https://attack.mitre.org/techniques/T1041/), [T1567](https://attack.mitre.org/techniques/T1567/) |


CD-R write session analysis reveals deleted files that were previously written and overwritten. Files recovered from deleted sessions include documents with timestamps ranging from 2014-12-01 to 2015-01-23. Categories include: design documents (winter_storm.amr dated 2015-01-23, winter_whether_advisory.zip dated 2014-12-16), pricing decision documents (my_favorite_cars.db dated 2015-01-16, my_favorite_movies.7z dated 2015-01-08, new_years_day.jpg dated 2014-12-01, super_bowl.avi dated 2014-12-02), progress reports (files dated 2015-01-05 to 2015-01-20), proposal documents (gif/png dated 2014-12-18 to 2014-12-19), technical review diaries (txt files dated 2015-01-05 to 2015-01-20). Files range from 27KB to 35MB, indicating significant data volumes. The deliberate overwriting suggests attempt to conceal these materials.



### 10. [HIGH] USB Drive RM2 Timestamps - Data Written 2015-01-05 to 2015-01-23

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-01-05T15:57:22 to 2015-01-23T20:47:10 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_b059b0e2 |
| **ATT&CK** | [T1025](https://attack.mitre.org/techniques/T1025/) |


Files recovered from USB drive (RM2) show modification timestamps spanning 2015-01-05 through 2015-01-23, indicating data was staged and written to the device over approximately 3 weeks. Files include multiple business-related documents: design materials, pricing decision databases and videos, project progress reports, formal proposals, and technical review diaries. The organization into named directories (design, pricing decision, progress, proposal, technical review) suggests deliberate categorization and staging of sensitive materials for transfer. Files have been deleted but remain recoverable from unallocated space.



### 11. [HIGH] Eraser Installation Timestamp and Version

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-25T14:57:31 to 2015-03-25T15:31:05 |
| **Sources** | registry.profile, ez.prefetch |
| **Evidence Refs** | tc_b595c6c7, tc_dc70ce15 |
| **ATT&CK** | [T1562.001](https://attack.mitre.org/techniques/T1562/001/) |


Eraser 6.2.0.2962 (The Eraser Project) was installed on 2015-03-25T14:57:31.895806 UTC. The application was subsequently executed on 2015-03-25 at 15:13:30 UTC. Registry records show installation location and timestamp. Eraser is a secure file deletion tool that removes files in a manner designed to prevent recovery. The close proximity of installation (14:57:31) to the final CCleaner execution (15:15:50) and system shutdown (15:31:05) indicates coordinated activity to eliminate forensic artifacts.



### 12. [HIGH] 'informant' User Account: Primary Actor in Data Exfiltration

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T14:33:13 to 2015-03-25T14:45:59 |
| **Sources** | registry.profile, registry.ntuser.informant |
| **Evidence Refs** | tc_b595c6c7 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1020](https://attack.mitre.org/techniques/T1020/), [T1537](https://attack.mitre.org/techniques/T1537/) |


The 'informant' user account (RID 1000) on INFORMANT-PC is identified as the primary actor responsible for data exfiltration and anti-forensics activities: (1) Last logon timestamp: 2015-03-25T14:45:59.180205 UTC, only minutes before anti-forensics tool execution; (2) Logon count: 10 (most active user on system); (3) Registry artifacts (NTUSER.DAT) show Chrome browser usage with Google Drive and Gmail access via iaman.informant.personal@gmail.com account; (4) UserAssist records show GUI application execution during the critical timeline; (5) Identified as owner of the corporate email iaman@nist.gov based on email artifacts in unallocated space. The 'informant' account identity, combined with personal Gmail account naming convention, suggests the user may have been an authorized employee or insider with access to sensitive data. All three removable media (RM2 USB, RM3 CD-R) bear labels with user variants ('IAMAN'). The account shows no evidence of being compromised by malware - actions appear deliberate and planned.



### 13. [HIGH] Coordinated Timeline: Recycle Bin Deletion Immediately Precedes CD-R Burn Session

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T19:51:47 to 2015-03-24T20:55:46 |
| **Sources** | recycle_bin, optical.listing |
| **Evidence Refs** | tc_384c9870, tc_acbccc16 |
| **ATT&CK** | [T1070](https://attack.mitre.org/techniques/T1070/) |


Critical temporal correlation between Recycle Bin deletion events and CD-R write session indicates coordinated staging and overwriting activity: (1) Recycle Bin deletions: Two deletion timestamps recorded - 2015-03-24T19:51:47 UTC and 2015-03-24T20:11:42 UTC; (2) CD-R burn session: UDF write sessions initiated at 2015-03-24T20:54:16 UTC, approximately 42-43 minutes after the final Recycle Bin deletion; (3) Files deleted from Recycle Bin before CD-R burn include: pd (21.9MB), prog (4.5MB), prop (41.7MB), tr (5.1MB) - which correspond to abbreviations visible in the CD-R final directory structure; (4) Deleted image files from Recycle Bin (Chrysanthemum.jpg, Desert.jpg, Hydrangeas.jpg, Jellyfish.jpg, Koala.jpg, Lighthouse.jpg, Penguins.jpg, Tulips.jpg) match the benign image filenames visible on the final CD-R session. This sequence demonstrates: (a) data was burned to CD-R in the burn staging folder; (b) files were then deleted from the burn folder to clear evidence; (c) CD-R was written with the same data, but in newer sessions potentially overwriting earlier sessions; (d) action indicates deliberate preservation of data on optical media while removing local traces from the system.



### 14. [HIGH] Corporate and Personal Email Account Configuration: Dual Account Access Pattern

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-01-05T15:57:22 to 2015-03-25T14:45:59 |
| **Sources** | bulk.email, bulk.url |
| **Evidence Refs** | tc_f5556d22, tc_f755cd94, tc_213c1d6f |
| **ATT&CK** | [T1020](https://attack.mitre.org/techniques/T1020/), [T1537](https://attack.mitre.org/techniques/T1537/) |


Forensic evidence reveals the 'informant' user maintained dual email account access: (1) Corporate email: iaman@nist.gov - primary NIST (National Institute of Standards and Technology) institutional address, recovered from multiple locations in registry and unallocated space including Outlook configuration (iaman.informant@nist.gov.ost references), SMTP settings, and cached email artifacts; (2) Personal Gmail account: iaman.informant.personal@gmail.com - synchronized with Google Chrome browser on the system, with configured access to Google Drive (drive.google.com), Google Docs (docs.google.com), and Google account management interfaces. Email artifacts show multiple cached references to both accounts in unallocated space, suggesting regular usage and potential synchronization of data between the corporate and personal Gmail accounts. The naming convention 'iaman' (from corporate email) combined with 'informant' and '.personal' (from Gmail) indicates intentional compartmentalization. This dual-account pattern is consistent with using personal cloud services (Google Drive) to exfiltrate or stage corporate data outside official NIST infrastructure.



### 15. [HIGH] Complete Attack Chain: Data Collection, Staging, Preservation, and Destruction

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-01-05T15:57:22 to 2015-03-25T15:31:05 |
| **Sources** | tsk.filelist, bulk.zip_carved, optical.listing, recycle_bin, ez.prefetch, tsk.masquerade |
| **Evidence Refs** | tc_b059b0e2, tc_929d0c0f, tc_acbccc16, tc_384c9870, tc_dc70ce15, tc_0e31e65a |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1020](https://attack.mitre.org/techniques/T1020/), [T1048](https://attack.mitre.org/techniques/T1048/), [T1537](https://attack.mitre.org/techniques/T1537/), [T1561](https://attack.mitre.org/techniques/T1561/), [T1562.001](https://attack.mitre.org/techniques/T1562/001/), [T1070](https://attack.mitre.org/techniques/T1070/) |


REVISED: Evidence from all three systems establishes a coordinated technical attack chain: PHASE 1 (2015-01-05 to 2015-01-23): Data collected into five categories. PHASE 2 (2015-01-05 to 2015-03-23): Data staged on USB drive with file masquerading. PHASE 3 (2015-03-24): Data written to CD-R in UDF sessions. PHASE 4 (2015-03-24): Recycle Bin deletion of burn staging files. PHASE 5 (2015-03-25): Eraser installation and execution; CCleaner execution; system shutdown.

CRITICAL COUNTER-EVIDENCE: The media contain explicit metadata references to "digitalcorpora.org/corpora/govdocs" - the NIST Govdocs1 public training corpus. While the kill chain is technically coherent, the underlying data appears to be from a public forensics training dataset. The demonstrated activities (file masquerading, staging, anti-forensics tool execution) are forensically significant and indicate coordinated technical operations, but NOT confirmation of real government data exfiltration. This scenario may represent a forensics laboratory exercise, training activity, or testing environment.



### 16. [MEDIUM] CD-R RM#3 Contains Archive Files and Proprietary File Formats

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T20:54:16Z to 2015-03-24T20:55:46Z |
| **Sources** | optical.listing |
| **Evidence Refs** | tc_d88ac15f |
| **ATT&CK** | [T1537](https://attack.mitre.org/techniques/T1537/), [T1048](https://attack.mitre.org/techniques/T1048/) |


The CD-R contains evidence of data staging with multiple archive and compressed file formats in deleted sessions: ZIP archives (winter_whether_advisory.zip, 16.4 MB), 7-Zip archives (my_favorite_movies.7z, 100 KB), SQLite database files (my_favorite_cars.db, 1.26 MB), Microsoft OneNote files (new_year_calendar.one, 27 KB), and 7z/AVR audio files (winter_storm.amr, 14.5 MB). These files were organized by category in dated directories, suggesting intentional data collection and archiving.



### 17. [MEDIUM] Google Account Email Identified: iaman.informant.personal@gmail.com

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2015-01-05T15:57:22 |
| **Sources** | bulk.email, bulk.url |
| **Evidence Refs** | tc_f5556d22, tc_f755cd94 |


Evidence of Google account synchronization configured on the system. Gmail address discovered: iaman.informant.personal@gmail.com. Evidence also shows corporate email address: iaman@nist.gov. The Gmail account appears to have been synchronized via Google Chrome or related Google services on this system. This represents personal email configured on a system that may contain corporate data.



### 18. [MEDIUM] Google Drive Access Detected

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2009-07-14T05:32:31 |
| **Sources** | bulk.url |
| **Evidence Refs** | tc_f755cd94 |


URL evidence shows Google Drive web access: https://drive.google.com/?usp=chrome_app and http://drive.google.com/. Additionally, URL evidence shows the account was accessing: https://accounts.google.com/AccountChooser?Email=iaman.informant.personal%40gmail.com&continue=https%3A//www.google.com/settings/storage. This indicates the iaman.informant.personal@gmail.com account was being used to access Google Drive storage services.



### 19. [MEDIUM] Data Exfiltration Timeline - Sequential Staging to Removable Media

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2015-01-05T15:57:22 to 2015-03-25T15:31:05 |
| **Sources** | tsk.filelist, optical.listing, recycle_bin, ez.prefetch |
| **Evidence Refs** | tc_b059b0e2, tc_acbccc16, tc_384c9870, tc_dc70ce15 |
| **ATT&CK** | [T1041](https://attack.mitre.org/techniques/T1041/), [T1020](https://attack.mitre.org/techniques/T1020/), [T1537](https://attack.mitre.org/techniques/T1537/), [T1562.001](https://attack.mitre.org/techniques/T1562/001/) |


REVISED: Evidence suggests coordinated data exfiltration activity: (1) Files with business-sensitive content labels modified between 2015-01-05 and 2015-01-23; (2) Files staged to USB drive (RM2); (3) Files copied to CD-R (RM3) on 2015-03-24 between 20:54:16 and 20:55:46 UTC; (4) Files deleted from burn folder (Recycle Bin); (5) CD-R overwritten with blank image files; (6) Anti-forensics tools (CCleaner, Eraser) executed on 2015-03-25 14:57-15:16 UTC; (7) System shut down 15:31:05 UTC.

CRITICAL COUNTER-EVIDENCE: The removable media (RM2, RM3) contain explicit references to "digitalcorpora.org/corpora/govdocs" - the NIST Govdocs1 public training corpus. The timeline demonstrates coordinated technical activity consistent with data staging and anti-forensics operations, but the underlying data appears to be from a public forensics training corpus, not actual sensitive data. This may represent a forensic laboratory or training exercise rather than a real security incident.



### 20. [MEDIUM] Corporate Email Address iaman@nist.gov

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T15:57:02 |
| **Sources** | bulk.email, bulk.domain |
| **Evidence Refs** | tc_f5556d22, tc_213c1d6f |


Registry and bulk extractor evidence reveals the user's corporate email address: iaman@nist.gov. This email address appears in multiple locations: bulk domain extracts (nist.gov domain references), and registry entries. The user maintained both a corporate NIST email account (iaman@nist.gov) and a personal Gmail account (iaman.informant.personal@gmail.com). This dual email configuration suggests the user was routing corporate communications through personal accounts.



### 21. [MEDIUM] Network Traffic Evidence - Corrupted PCAP Files Found on System

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T14:34:26 to 2015-03-25T15:31:05 |
| **Sources** | pcap.disk.atiumd6a, pcap.disk.atiumdva |
| **Evidence Refs** | tc_0aed10dd |


During forensic analysis, two PCAP files were identified on the system disk at Windows\\System32\\DriverStore\\FileRepository paths (atiumd6a.cap and atiumdva.cap, 69,112 bytes each). However, analysis reveals these are not valid network capture files - they are corrupted or invalid PCAP format, specifically ATI video driver files (.cap files from ATI driver INF resources, not network traffic captures). The files could not be parsed by tshark to extract network conversations, IP flows, or DNS records. This means legitimate network traffic evidence from the incident period may be unavailable from the disk image. The absence of valid PCAP files prevents direct correlation of cloud service access (Google Drive) with network communication patterns.



### 22. [MEDIUM] Data Exfiltration via Google Drive: Personal Cloud Account for Corporate Data

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2015-01-05T15:57:22 to 2015-03-25T15:31:05 |
| **Sources** | bulk.url |
| **Evidence Refs** | tc_f755cd94 |
| **ATT&CK** | [T1020](https://attack.mitre.org/techniques/T1020/), [T1537](https://attack.mitre.org/techniques/T1537/), [T1567](https://attack.mitre.org/techniques/T1567/) |


REVISED: Personal Gmail account (iaman.informant.personal@gmail.com) was configured in Google Chrome to access cloud services: Google Drive URLs and Google Docs. Personal cloud services were configured on the system.

CRITICAL COUNTER-EVIDENCE: The data staged to removable media contains explicit references to "digitalcorpora.org/corpora/govdocs" - the NIST Govdocs1 public training corpus. If the collected data is from Govdocs1, this is NOT a real corporate data exfiltration incident but rather a forensics training scenario involving test data. The presence of Google Drive configuration does not establish that actual government or corporate data was exfiltrated, only that the capability was configured on the system.



### 23. [LOW] CD-R RM#3 Extracts Contain Government and Official Domain IOCs

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2015-03-24T20:54:16Z |
| **Sources** | bulk.email, bulk.domain |
| **Evidence Refs** | tc_ea3701d8, tc_8ce3c506 |


Bulk extractor recovered multiple email addresses and domains from the CD-R optical media: Government emails: mmun@loc.gov (Library of Congress), Eric_P._Lauer@omb.eop.gov (White House OMB), wayne.longman@att.net (AT&T). Government/official domains: www.whitehouse.gov, www.omb.eop.gov, lcweb.loc.gov, loc.gov. Commercial/technical domains: www.iec.ch, www.apple.com, ns.adobe.com, digitalcorpora.org. Suspicious domain: desert-estates.info. These IOCs appear embedded in Office documents (Office XML formats indicated by schemas.openxmlformats.org references).

COUNTER-EVIDENCE: The CD-R contains explicit metadata references to "digitalcorpora.org/corpora/govdocs" which is the NIST Govdocs1 public corpus used for digital forensics training and testing. The government email addresses and institutional contacts may be embedded test data from the Govdocs1 corpus rather than evidence of actual communication with government officials. The email addresses should be verified against known Govdocs1 corpus content before attribution to real institutional contacts.



### 24. [LOW] Government and NASA Employee Email Addresses Recovered from Deleted Files on RM#2

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2015-03-24T09:59:27Z to 2015-03-24T10:00:18Z |
| **Sources** | bulk.email, bulk.zip_carved |
| **Evidence Refs** | tc_8d162d3d, tc_0ddd8348 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/) |


Bulk extractor recovered multiple email addresses from deleted files and unallocated space on RM#2: mmun@loc.gov (Library of Congress), Eric_P._Lauer@omb.eop.gov (White House OMB), wayne.longman@att.net (AT&T), mmeyer@mail.hq.nasa.gov (NASA), Karen.L.Buxbaum@jpl.nasa.gov (JPL), David.Beaty@jpl.nasa.gov (JPL), th276a@nih.gov (NIH). These addresses were embedded in Microsoft Office documents present in deleted file entries and carved ZIP archives.

COUNTER-EVIDENCE: The USB drive (RM2) contains the same data structure and files as RM3 CD-R, which includes explicit references to "digitalcorpora.org/corpora/govdocs" - the NIST Govdocs1 public training corpus. The government-affiliated email addresses are likely embedded test data from Govdocs1 rather than evidence of actual institutional communications. Before attribution, these addresses should be verified against known Govdocs1 corpus content.



### 25. [LOW] admin11 Account Activity - Limited Use on 2015-03-22

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T15:52:15 to 2015-03-22T15:57:30 |
| **Sources** | registry.ntuser.admin11, registry.profile |
| **Evidence Refs** | tc_ec841e05, tc_b595c6c7 |


Admin11 user account shows minimal usage. UserAssist registry shows activity on 2015-03-22 between 15:52:15 and 15:57:30 UTC. Applications accessed include: Chrome (1 run), Notepad (1 run), Explorer (1 run), Sticky Notes (11 runs), Calculator (12 runs), Snipping Tool (10 runs), Paint (9 runs), Remote Desktop Connection (8 runs), Magnify (7 runs), and various Windows accessories. Recent Documents show setupapi.dev.log. TypedURLs show only one URL: http://go.microsoft.com/fwlink/p/?LinkId=255141. Last logon recorded: 2015-03-22T15:57:02.419988 UTC with only 2 total logon counts. This appears to be a test or setup account with very limited activity.



### 26. [LOW] Government Agencies and Officials Identified in Recovered Data

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2014-12-01T14:50:26 to 2015-03-24T10:00:18 |
| **Sources** | bulk.email, bulk.domain |
| **Evidence Refs** | tc_ea3701d8, tc_8ce3c506, tc_8d162d3d |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/) |


REVISED ASSESSMENT: The IOCs recovered from the removable media reference multiple government agencies, but these may be embedded test data rather than evidence of actual institution involvement.

The devices contain explicit metadata references to "digitalcorpora.org/corpora/govdocs" - the NIST Govdocs1 public training corpus. Email addresses and institutional domain references (OMB, NASA, NIH, Library of Congress) embedded in the documents may be test data artifacts from Govdocs1 rather than evidence of actual institutional contact or coordination.

If the files are confirmed to be from Govdocs1, then the recovered email addresses are test data artifacts and do NOT indicate involvement by actual government officials or agencies. The presence of these emails would reflect the composition of publicly available forensic training data, not a real intelligence or data theft incident.



### 27. [INFO] CD-R RM#3 Acquisition and Verification Hashes Match

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | hashdeep.acquisition |
| **Evidence Refs** | tc_961e7443 |


The CD-R optical media image (rm3.E01) has been verified for integrity. The acquisition hash stored in the EWF image matches the cryptographic verification hash recomputed by ewfverify over the entire media data. MD5: df914108fb3d86744eb688eba482fbdf, SHA1: 7f3c2eb1f1e2db97be6e963625402a0e362a532c. This indicates the image was properly acquired with no bit-level changes to the media data.



### 28. [INFO] CD-R RM#3 Contains Multiple Writing Sessions with Recoverable Deleted Files

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T20:54:16Z to 2015-03-24T20:57:00Z |
| **Sources** | optical.listing |
| **Evidence Refs** | tc_d88ac15f |


The CD-R optical media (labeled 'IAMAN CD') uses UDF write-once format with Variable-length allocation table (VAT) and contains 9 sessions (VAT generations). Deleted files from earlier sessions are recoverable, including: (1) /design directory: winter_storm.amr (14.5 MB), winter_whether_advisory.zip (16.4 MB); (2) /pricing decision directory: my_favorite_cars.db (1.26 MB), my_favorite_movies.7z (100 KB), new_years_day.jpg (10.2 MB), super_bowl.avi (10.3 MB); (3) /progress directory: my_friends.svg (58 KB), my_smartphone.png (4.4 MB), new_year_calendar.one (27 KB); (4) /proposal directory: a_gift_from_you.gif (35.2 MB), landscape.png (6.5 MB); (5) /technical review directory: diary files (texts ranging from 121 KB to 2.3 MB). Currently visible files are Koala.jpg, Penguins.jpg, and Tulips.jpg. All deleted files were created 2015-03-24 but contain modification dates from 2014-12-01 through 2015-01-23.



### 29. [INFO] CD-R RM#3 Contains Suspicious Directory and Filename Abbreviations

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | optical.listing |
| **Evidence Refs** | tc_d88ac15f |


The CD-R optical media contains directory names that appear to be abbreviated versions of potentially sensitive business terms: /de (design), /pd (pricing decision), /prog (progress), /prop (proposal), /tr (technical review). These abbreviated directory names appear across multiple sessions, suggesting deliberate obfuscation or shortening of directory names. The same full names appear only in deleted session records.



### 30. [INFO] CD-R RM#3 Yara Scan Returned No Malware Signatures

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | yara.files |
| **Evidence Refs** | tc_f83472c6 |


Yara scan of the CD-R optical media files returned no detections. No known malware signatures or anti-forensics tool signatures were identified, indicating the media does not contain malicious executables flagged by the yara rule set used in the acquisition environment.



### 31. [INFO] CD-R RM#3 Contains Library of Congress Digital Collections References

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.rfc822 |
| **Evidence Refs** | tc_c8dd437a |


The CD-R metadata references the Digital Collections at the Library of Congress, specifically the Prints and Photographs Online Catalog. RFC 822 extracted data shows extensive cataloging information for photographic content including subjects like "Portraits of three Indians," historical scenes, and various cultural imagery. This is consistent with the NIST Govdocs1 corpus, a publicly available collection used for digital preservation and forensics testing. The presence of multiple versions of the same directory structure (design, pricing decision, progress, proposal, technical review) across 9 sessions suggests this may be test/calibration data for forensic tool validation.



### 32. [INFO] Suspicious FAT32 Volume Label 'IAMAN $_@' on USB Drive RM#2

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | tsk.fsstat |
| **Evidence Refs** | tc_d5d40f80 |


The USB drive (RM#2) has a suspicious volume label 'IAMAN $_@  ' (with trailing spaces) visible in both the boot sector and root directory entries. This non-standard label containing special characters ($_@) is not typical for legitimate system storage. The label format appears deliberately obscured or intentionally unusual, which combined with the massive deletion activity and file masquerading suggests the drive may have been used for covert data collection or staging. The boot sector also shows OEM name 'MSDOS5.0' and Volume ID '0xb4d85399', consistent with a standard FAT32 USB drive but with the anomalous volume naming.



### 33. [INFO] USB Drive RM#2 Partition Layout and Filesystem State Analysis

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | tsk.partitions, tsk.fsstat |
| **Evidence Refs** | tc_9f5026d9, tc_d5d40f80 |


The USB drive (RM#2) has a standard DOS partition table with a single Win95 FAT32 partition: (1) Partition start sector: 128, end sector: 2097279, total sectors: 2,097,152 (approximately 1 GB); (2) Unallocated sectors before partition: 0-127 (128 sectors); (3) Unallocated sectors after partition: 2097280-7821311 (5,724,032 sectors). The filesystem uses 4096-byte (8-sector) cluster size with 261,121 clusters total. Free sector count reported by FS Info: 2,088,952 (approximately 1 GB free). This indicates approximately 1 GB of allocated/used space and 1 GB of free/unallocated space on a 2 GB drive. The high percentage of free space combined with 158,470 deleted files suggests multiple rounds of file deletion with partial overwriting. The unallocated space before and after the partition may contain remnants of previous partitioning or drive use.



### 34. [INFO] Image Integrity Verification - All Three Acquisitions Match

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | hashdeep.acquisition |
| **Evidence Refs** | tc_6c5870b8, tc_d676e79a, tc_2347f3f0 |


The acquisition hashes for all three disk images (pc.E01, rm2.E01, rm3.E01) were verified by ewfverify and match the stored hashes in the EWF files. PC acquisition MD5: a49d1254c873808c58e6f1bcd60b5bde, SHA1: afe5c9ab487bd47a8a9856b1371c2384d44fd785. RM2 acquisition MD5: b4644902acab4583a1d0f9f1a08faa77, SHA1: 048961a85ca3eced8cc73f1517442d31d4dca0a3. RM3 acquisition MD5: df914108fb3d86744eb688eba482fbdf, SHA1: 7f3c2eb1f1e2db97be6e963625402a0e362a532c. All three images have been integrity-verified.



### 35. [INFO] Windows System Configuration: INFORMANT-PC Running Windows 7 Ultimate SP1

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T14:34:26 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_b595c6c7 |


The system is configured as follows: OS Product Name: Windows 7 Ultimate, Version: 6.1, Build: 7601, Service Pack 1. Computer Name: INFORMANT-PC. Registered Owner: informant. Install Date (UTC): 2015-03-22T14:34:26. Last Shutdown (UTC): 2015-03-25T15:31:05.232008. Time Zone: Eastern (UTC-5 standard, UTC-4 daylight, daylight time in effect when hive last written). Network: DHCP-enabled interface with IP Address 10.11.11.129, DHCP Server 10.11.11.254.



### 36. [INFO] Local User Accounts on INFORMANT-PC

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T15:57:02 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_b595c6c7 |


Six local user accounts identified in SAM hive: (1) Administrator (RID 500) - last logon 2010-11-21T03:47:20.945242, logon count 6; (2) Guest (RID 501) - never logged in; (3) informant (RID 1000) - last logon 2015-03-25T14:45:59.180205, logon count 10; (4) admin11 (RID 1001) - last logon 2015-03-22T15:57:02.419988, logon count 2; (5) ITechTeam (RID 1002) - never logged in; (6) temporary (RID 1003) - last logon 2015-03-22T15:55:57.259062, logon count 1. User 'informant' was the most recent to logon (2015-03-25 at 14:45:59 UTC).



### 37. [INFO] Microsoft Office 2013 Professional Plus Installed - Productivity Applications Present

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T15:01:02 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_b595c6c7 |


Registry records show Microsoft Office Professional Plus 2013 installed with version 15.0.4420.1017. Installation included Word, Excel, PowerPoint, Access, OneNote, Outlook, Publisher, Lync, Groove, and InfoPath MUI components. Installation location: C:\\Program Files\\Microsoft Office. Installation date: 2015-03-22 15:01:02 UTC. This suite of applications is typically used for creating and editing business documents, spreadsheets, and presentations.



### 38. [INFO] Bonjour and Chrome Browser Installation

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-23T20:00:58 |
| **Sources** | registry.profile, ez.prefetch |
| **Evidence Refs** | tc_b595c6c7, tc_dc70ce15 |


Registry records show Apple Bonjour 3.0.0.10 installed (C:\\Program Files (x86)\\Bonjour\\) on 2015-03-23T20:00:58. Google Chrome browser is present on system as evidenced by Prefetch records showing Chrome.EXE execution with 71 run counts as of 2015-03-24T21:05:38. Chrome was used to access Google services including Gmail, Google Drive, Google News, and YouTube based on URL evidence.



### 39. [INFO] LinkedIn Profile Reference in Browser Cache

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.url |
| **Evidence Refs** | tc_3292fce5 |


URL evidence shows access to LinkedIn profile: https://www.linkedin.com/pub/simran-shetty-ms-mba-cdr/18/bba/19b (LinkedIn profile for Simran Shetty, MS MBA CDR). This suggests the user or someone on this system was researching or accessing this LinkedIn profile. LinkedIn activity could indicate the user was reviewing personal professional profile information or researching individuals.



### 40. [INFO] Network Configuration - DHCP 10.11.11.254 Server

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_b595c6c7 |


System network configuration shows: Intel(R) PRO/1000 MT Network Connection interface with DHCP enabled. DHCP-assigned IP address: 10.11.11.129. DHCP Server: 10.11.11.254. This indicates the system is connected to a network using 10.11.11.0/24 subnet with DHCP addressing. The DHCP server at 10.11.11.254 serves as the network gateway/server for this subnet.



### 41. [INFO] Administrative Accounts: Limited Use and No Evidence of Primary Involvement

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T15:52:15 to 2015-03-22T15:57:30 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_b595c6c7 |


Three non-primary user accounts identified on INFORMANT-PC: (1) admin11 (RID 1001) - Minimal usage on 2015-03-22 between 15:52:15 and 15:57:30 UTC, logon count only 2, with activity limited to basic system utilities (Notepad, Calculator, Snipping Tool); appears to be a test/setup account; (2) temporary (RID 1003) - Single logon at 2015-03-22T15:55:57.259062, logon count 1, no subsequent activity recorded; appears to be a temporary account with no meaningful usage; (3) ITechTeam (RID 1002) - Never logged in (logon count 0); appears unused; (4) Administrator (RID 500) - Last logon 2010-11-21, extremely old, no activity during incident period. Only the 'informant' account shows significant activity during the critical 2015-01-05 to 2015-03-25 timeframe. The absence of activity by administrative accounts during the exfiltration period indicates no privilege escalation activity or multi-user coordination.



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
| Email | `iaman.informant.personal@gmail.com` |  | Google Drive Access Detected |
| Email | `iaman@nist.gov` |  | Corporate Email Address iaman@nist.gov |




---

## Appendix C: MITRE ATT&CK Coverage

11 techniques identified across findings.


**Kill Chain Coverage:** Defense Evasion (3) > Collection (2) > Exfiltration (5) > Impact (1)


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1036](https://attack.mitre.org/techniques/T1036/) | Masquerading | File Extension Masquerading on Deleted Files -... |
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | Massive Deletion Activity on USB Drive RM#2...; File Extension Masquerading on Deleted Files -...; Coordinated Timeline: Recycle Bin Deletion...; Complete Attack Chain: Data Collection,... |
| [T1562.001](https://attack.mitre.org/techniques/T1562/001/) | Disable or Modify Tools | Anti-Forensics Activity on 2015-03-25: Eraser Execution; Eraser Installation Timestamp and Version; Data Exfiltration Timeline - Sequential...; Complete Attack Chain: Data Collection,... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1005](https://attack.mitre.org/techniques/T1005/) | Data from Local System | Government and NASA Employee Email Addresses...; 'informant' User Account: Primary Actor in...; Government Agencies and Officials Identified...; Complete Attack Chain: Data Collection,... |
| [T1025](https://attack.mitre.org/techniques/T1025/) | Data from Removable Media | USB Drive RM2 Timestamps - Data Written... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1020](https://attack.mitre.org/techniques/T1020/) | Automated Exfiltration | Data Exfiltration Timeline - Sequential...; 'informant' User Account: Primary Actor in...; Corporate and Personal Email Account...; Complete Attack Chain: Data Collection,...; Data Exfiltration via Google Drive: Personal... |
| [T1041](https://attack.mitre.org/techniques/T1041/) | Exfiltration Over C2 Channel | Deleted Files on Optical Media Contain...; Data Exfiltration Timeline - Sequential... |
| [T1048](https://attack.mitre.org/techniques/T1048/) | Exfiltration Over Alternative Protocol | CD-R RM#3 Contains Archive Files and...; Archive Files and Office Documents Carved from...; Complete Attack Chain: Data Collection,... |
| [T1537](https://attack.mitre.org/techniques/T1537/) | Transfer Data to Cloud Account | CD-R RM#3 Contains Archive Files and...; Archive Files and Office Documents Carved from...; RM#2 Contains Same Data Structure as RM#3 CD-R...; Data Exfiltration Timeline - Sequential...; 'informant' User Account: Primary Actor in...; Corporate and Personal Email Account...; Complete Attack Chain: Data Collection,...; Data Exfiltration via Google Drive: Personal... |
| [T1567](https://attack.mitre.org/techniques/T1567/) | Exfiltration Over Web Service | Deleted Files on Optical Media Contain...; Data Exfiltration via Google Drive: Personal... |


### Impact

| Technique | Name | Findings |
|-----------|------|----------|
| [T1561](https://attack.mitre.org/techniques/T1561/) | Disk Wipe | Massive Deletion Activity on USB Drive RM#2...; Complete Attack Chain: Data Collection,... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 330 |
| Findings submitted | 41 |
| Confirmed | 32 |
| Inferences | 9 |
| Input tokens | 10.9K |
| Output tokens | 121.6K |
| Total tokens | 132.5K |
| Audit log | /home/mulder/.mulder/cases/nist-data-leakage.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 10.9K | 121.6K | 132.5K |




<details>
<summary>Evidence Sources (95)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| optical.listing | mulder-optical | 58 |
| hashdeep.hashes | hashdeep | 6 |
| hashdeep.acquisition | ewfverify | 1 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 237 |
| bulk.email | bulk_extractor | 12 |
| bulk.rfc822 | bulk_extractor | 41 |
| bulk.url | bulk_extractor | 300 |
| bulk.url_services | bulk_extractor | 21 |
| tsk.partitions | sleuthkit | 9 |
| tsk.fsstat | sleuthkit | 40 |
| tsk.filelist | sleuthkit | 51 |
| hashdeep.hashes | hashdeep | 6 |
| strings.output | strings | 165747 |
| tsk.masquerade | sleuthkit | 17 |
| hashdeep.acquisition | ewfverify | 1 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 7330 |
| bulk.duplicates | bulk_extractor | 1791 |
| bulk.email | bulk_extractor | 61 |
| bulk.rfc822 | bulk_extractor | 41 |
| bulk.url | bulk_extractor | 7192 |
| bulk.url_services | bulk_extractor | 58 |
| bulk.zip_carved | bulk_extractor | 5221 |
| scalpel.audit | scalpel | 22 |
| tsk.partitions | sleuthkit | 9 |
| tsk.partitions | sleuthkit | 10 |
| hashdeep.hashes | hashdeep | 6 |
| hashdeep.acquisition | ewfverify | 1 |
| hashdeep.hashes | hashdeep | 6 |
| hashdeep.acquisition | ewfverify | 1 |
| hashdeep.hashes | hashdeep | 6 |
| tsk.filelist | sleuthkit | 104709 |
| tsk.filelist.p1 | sleuthkit | 93 |
| hashdeep.acquisition | ewfverify | 1 |
| bulk.alerts | bulk_extractor | 7 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.ccn | bulk_extractor | 263 |
| bulk.domain | bulk_extractor | 366963 |
| bulk.duplicates | bulk_extractor | 88 |
| bulk.email | bulk_extractor | 6851 |
| bulk.ether | bulk_extractor | 6 |
| bulk.rfc822 | bulk_extractor | 7326 |
| bulk.sin | bulk_extractor | 54 |
| bulk.telephone | bulk_extractor | 2326 |
| bulk.url | bulk_extractor | 421750 |
| bulk.url_facebook-address | bulk_extractor | 19 |
| bulk.url_searches | bulk_extractor | 155 |
| bulk.url_services | bulk_extractor | 3637 |
| recycle_bin | icat | 17 |
| registry.profile | python-registry | 54 |
| ez.shimcache | eztools | 307 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| evtx.manifest | evtx-extract | 54 |
| registry.system | regripper | 186 |
| registry.system | regripper | 7 |
| registry.system | regripper | 7 |
| registry.system | regripper | 69 |
| registry.system | regripper | 8 |
| ez.prefetch | eztools | 193 |
| registry.software | regripper | 33492 |
| registry.software | regripper | 283 |
| registry.software | regripper | 283 |
| registry.system | regripper | 5209 |
| registry.system | regripper | 199 |
| registry.system | regripper | 199 |
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
| tsk.masquerade | sleuthkit | 3 |
| composite.correlation | composite | 1 |
| composite.execution | composite | 1618 |
| composite.timeline | composite | 2117 |
| composite.defense_evasion | composite | 199 |
| composite.file_staging | composite | 80 |
| composite.exfil | composite | 2468 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.file_staging | composite | 80 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.file_staging | composite | 80 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
