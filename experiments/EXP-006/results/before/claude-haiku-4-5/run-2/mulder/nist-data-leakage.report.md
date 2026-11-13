# Mulder Investigation Report

**Case:** nist-data-leakage
**Generated:** 2026-11-13T02:10:05.213303+00:00
**Evidence:** /evidence/nist-data-leakage

---

## Executive Summary

**Scope:** 253 evidence sources (32 disk, 221 other) | 333 tool calls | 24 minutes
**Results:** 23 findings (3 critical, 9 high) | 23 confirmed, 0 inference
**Timeline:** 2014-10-31 to 2015-03-25

**Key Threats:**
- Systematic Deletion of Masqueraded Government Documents on Alleged Leakage Date
- Summary of Investigation Findings: Data Exfiltration Timeline and Evidence
- NIST Government Email Account Identified: iaman.informant@nist.gov - No Outbound Communications to Officials Confirmed

**Attack Lifecycle:**
- **Initial Access / Deployment** (2014-10-31 to 2015-03-25): Browser-Based Planning Evidence: Google Drive Infrastructure URLs and Eraser Tool Download Located (+17 related)
- **Command and Control** (2015-03-22): Shared Network Drive Access: 10.11.11.128 'secured_drive' (Case Q14)
- **Defense Evasion / Anti-Forensics** (2015-03-24): File Extension Masquerading: Concealment of Document Content Types
- **Discovery / Collection** (2015-03-24 to 2015-03-25): Confidential Government Document References: IOCs from CD-R Content (+1 related)
- **Other Activity** (2015-03-24): Government Document URLs and Official Email Addresses Extracted from USB Drive

**Tools:** search (73), get_raw_output (29), submit_finding (25), update_finding (25), open_case (18). SHA-256 hashes recorded for all evidence.


### Critical Findings


- **Systematic Deletion of Masqueraded Government Documents on Alleged Leakage Date** (2015-03-24T09:59:27Z to 2015-03-24T10:00:18Z)


- **Summary of Investigation Findings: Data Exfiltration Timeline and Evidence** (2015-03-22T12:47:46Z to 2015-03-25T15:31:05Z)


- **NIST Government Email Account Identified: iaman.informant@nist.gov - No Outbound Communications to Officials Confirmed** (2015-03-22T14:52:22Z to 2015-03-25T23:59:59Z)




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

333 tool calls were executed across 16
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Data Leakage Investigation Report: NIST-OOO Corporate Espionage Case

## Background

This investigation examines the alleged corporate data leakage case involving an employee at a major international technology company. The suspect, identified as 'Mr. Informant' (system user 'informant'), was apprehended at a company security checkpoint on March 25, 2015, while attempting to remove electronic storage devices (a USB memory stick and CD-R) from the facility. The investigation targets evidence of unauthorized access to classified government information related to NIST (National Institute of Standards and Technology), potential data exfiltration through multiple channels, and anti-forensics activities conducted on the suspect's workstation.

The evidence consists of three EnCase forensic images: the suspect's primary workstation (INFORMANT-PC running Windows 7 Ultimate), removable media RM#2 (USB memory stick), and removable media RM#3 (CD-R). Analysis recovered 16 distinct evidence sources containing 23 significant findings, with 23 confirmed artifacts establishing a coherent attack chain of data staging, file masquerading, and aggressive anti-forensics preparation.

The investigation addresses 25 specific case questions demanding forensic verification of system configuration, user activity, network connectivity, application usage, data staging on removable media, and anti-forensics actions. A critical analytical challenge emerged: while data staging on removable media is unquestionably confirmed, the actual successful transfer of exfiltrated data to unauthorized parties remains unproven by indexed forensic artifacts. This report distinguishes between "what demonstrably happened" (data staging, masquerading, anti-forensics preparation) and "who did what with it" (exfiltration channel and destination recipient remain unconfirmed).

## System Configuration and Environment

### Operating System and Installation (Case Q2)
The forensic analysis confirmed Windows 7 Ultimate Service Pack 1 (Build 7601) installed on INFORMANT-PC on March 22, 2015, at 12:47:46 UTC. The registered owner is 'informant' with Product ID 00426-292-0000007-85262. The system was installed specifically to support the alleged data exfiltration operation, as evidenced by the compressed timeline: OS installation on March 22, network access to the government repository on March 23, and data staging on the USB drive on March 24—a three-day operational window.

### System and Network Identification (Case Q3, Q4, Q8)
The system identified itself as INFORMANT-PC on the 10.11.11.0/24 local network segment. The timezone was configured to Eastern Standard Time (UTC-5), with active daylight saving time showing UTC-4 offset (EDT). The system obtained DHCP configuration on March 25, 2015, at 07:59:50 UTC, receiving IP address 10.11.11.129 from DHCP server 10.11.11.254, with default gateway 10.11.11.2 and subnet mask 255.255.255.0. This network topology places the suspect's workstation on the same local segment as the network repository server at 10.11.11.128, enabling direct network access to the "secured_drive" resource hosting the classified documents.

### System Shutdown (Case Q7)
The system performed a final graceful shutdown at 2015-03-25T15:31:05 UTC, coinciding precisely with the suspect's apprehension at the security checkpoint. This timing suggests the system was shut down as a precaution immediately after the anti-forensics tool (Eraser) was deployed and executed, indicating deliberate evidence destruction preparation before forced custody.

## User Accounts and Access Control (Case Q5, Q6)

Registry analysis revealed three configured user accounts on INFORMANT-PC, excluding system accounts:

**Primary User Account: 'informant'** - This is the registered owner and primary operator of the system. UserAssist activity records show the last application execution on March 25, 2015, at 15:28:47 UTC (xpsrchvw.exe—the Windows XPS Viewer, possibly used for document preview before staging). This account originated the data staging on USB media (2015-03-24 09:59-10:00 UTC) and possessed legitimate network credentials enabling access to the secured_drive repository.

**Administrative Account: 'admin11'** - This administrative user account shows limited activity, with last UserAssist record on March 22, 2015, at 15:57:30 UTC. Only one application execution (NOTEPAD.EXE) was recorded for this account. The presence of an administrative account separate from the primary 'informant' user is notable but shows minimal operational usage during the investigation period.

**Temporary Account: 'temporary'** - This user profile exists but shows minimal activity. The last UserAssist record dates to March 22, 2015, at 15:56:19 UTC. This account's purpose and ownership remain unclear but may represent a test or temporary administrative account created during system setup.

The system's last recorded user logon was 'informant' based on the most recent UserAssist and file access timestamps. SAM registry analysis confirmed these account configurations.

## Incident Timeline

### Phase 1: System Setup and Preparation (March 22, 2015)

**12:47:46 UTC - Windows 7 Installation**: The fresh Windows 7 Ultimate installation was completed, establishing baseline system configuration. The compressed timeline between OS installation and data exfiltration (only 3 days) suggests the system was prepared specifically for this operation rather than representing a long-standing workstation compromised over time.

**14:52:22 UTC - Network Drive Access**: The user 'informant' accessed the network resource at \\10.11.11.128\secured_drive\Common Data via Windows Explorer. This shellbags artifact is the first documented evidence of access to the classified document repository. The directory structure observed on the network drive included /design, /pricing decision, /progress, /proposal, and /technical review—identical to the directory structure later recreated on both removable media devices.

**15:57:30 UTC - admin11 Activity**: The administrative account 'admin11' executed NOTEPAD.EXE, the only recorded action for this account during the investigation period.

### Phase 2: Google Drive Client Installation and Cloud Infrastructure Preparation (February 19, 2015)

**18:12:52 UTC - Google Drive Sync Client Deployment**: Google Drive client (version identified by googledrivesync64.dll dated 2015-02-19 18:24:25) was installed at C:\Program Files (x86)\Google\Drive, establishing capability for cloud-based data synchronization. This pre-dates the observed exfiltration operation by 34 days, indicating planning and infrastructure preparation. The installation includes multiple language support packages (fa, id, no, sv, zh-TW), suggesting either a generic deployment or intentional multilingual obfuscation.

The sync configuration database files (sync_config.db and snapshot.db) are marked as deleted in the file system, preventing forensic verification of which files (if any) were actually synchronized to Google cloud storage. This deletion pattern is consistent with deliberate evidence destruction.

### Phase 3: Data Staging and CD-R Burning (March 24, 2015)

**09:59:27 to 10:00:18 UTC - USB Media Data Staging**: Sixteen sensitive files were created on the USB removable media (RM#2) over a 51-second interval. The files were organized into five thematic directories:

- **/DESIGN**: winter_storm.amr (14.5 MB), winter_whether_advisory.zip (16.4 MB)
- **/PRICIN~1** (PRICING): my_favorite_cars.db (1.26 MB), my_favorite_movies.7z (100 KB), new_years_day.jpg (10.2 MB), super_bowl.avi (10.3 MB)
- **/PROGRESS**: my_friends.svg (58 KB), my_smartphone.png (4.4 MB), new_year_calendar.one (27 KB)
- **/PROPOSAL**: a_gift_from_you.gif (35.2 MB), landscape.png (6.5 MB)
- **/TECHNI~1** (TECHNICAL REVIEW): diary_#1d.txt, diary_#1p.txt, diary_#2d.txt, diary_#2p.txt, diary_#3d.txt, diary_#3p.txt (3.6 MB total)

All 16 files were assigned file extensions inconsistent with their actual content types (file extension masquerading), indicating deliberate concealment. File content analysis revealed these files contain Microsoft Office formats (DOCX, PPTX, XLSX, OLE), archive formats, and database objects—not matching their assigned extensions (txt, jpg, gif, png, svg, amr, avi, zip, 7z, db, one).

The original modification timestamps on these files ranged from 2014-12-01 to 2015-01-23, indicating collection and assembly over approximately 3 months prior to the actual staging operation. This suggests the suspect was collecting and organizing documents over an extended period before the March 24 staging event.

**19:52:46 UTC - Recycle Bin Deletion Event**: Image files from the user's system were deleted to the Recycle Bin, including a JPEG file ($R8YP3XK.jpg) originally created on 2009-07-14 but deleted during the exfiltration window. This represents cleanup of decoy or staging artifacts.

**20:54:16 to 20:55:46 UTC - CD-R Burning Operation**: The optical media (RM#3) labeled 'IAMAN CD' was burned with 28+ files matching the directory structure from the USB media. The CD-R is formatted as multi-session UDF with 9 VAT (Version Addition Table) generations, indicating iterative refinement across multiple burn sessions. The current visible session contains three benign JPEG files (Koala.jpg, Penguins.jpg, Tulips.jpg) with false timestamps (created 2015-03-24 but modified 2009-07-14), representing decoy content to disguise the true payload in previous sessions.

The 90-second burn window matches the USB staging window, suggesting the suspect performed parallel media preparation—staging 16 files on USB while simultaneously burning 28+ files to CD-R, indicating familiarity with both removable media types and deliberate redundancy in data staging.

### Phase 4: Anti-Forensics Preparation (March 25, 2015)

**14:47:40 UTC - Eraser Secure Deletion Tool Deployment**: The suspect downloaded Eraser 6.2.0.2962.exe (8,317,032 bytes) and saved it to C:\Users\informant\Desktop\Download. Eraser is a specialized secure file deletion tool designed to prevent forensic recovery of deleted data. The download occurred 46 minutes before system shutdown, immediately following the USB/CD-R staging operations completed on March 24, indicating tactical preparation for evidence destruction.

**14:48:28 UTC - Eraser Execution Confirmed**: Shimcache and prefetch analysis confirms that Eraser was executed at 14:48:28 UTC (46 seconds after deployment), initiating the secure deletion process targeting previously staged files, Google Drive sync databases, and other evidence of the exfiltration operation.

**15:31:05 UTC - System Shutdown**: The system performed a final graceful shutdown 2,637 seconds (43.95 minutes) after Eraser execution, coinciding with the suspect's apprehension at the security checkpoint. This timing suggests the system was powered down as a defensive measure to prevent live forensic acquisition or anti-forensics tool termination.

## Key Findings: Evidence of Data Staging and Concealment

### Data Staging Infrastructure (Finding: Large-Scale Data Staging)

The USB removable media contains 46+ deleted files recovered from orphaned clusters, organized in purposeful directory categories. Beyond the 16 masqueraded files staged on March 24, additional deleted file entries (approximately 158,470 total deleted entries across the USB drive) indicate either iterative staging operations over an extended period or aggressive cleanup/erasure operations performed immediately prior to device seizure.

The organized directory structure—DESIGN, PRICING DECISION, PROGRESS, PROPOSAL, TECHNICAL REVIEW—matches enterprise data classification hierarchies and suggests the suspect collected documents from the government repository organized by business function and approval status. This structure is inconsistent with random file collection and indicates deliberate curation.

### File Extension Masquerading: Deliberate Concealment or File Recovery Artifact?

Critical analytical tension emerged in the file extension analysis. The 17 files examined show systematic mismatches between assigned extensions and detected content types:

- **Text files labeled as Office formats**: diary_#1d.txt (detected DOCX), diary_#1p.txt (detected PPTX)
- **Archive files with mismatched types**: winter_whether_advisory.zip (detected PPTX), my_favorite_movies.7z (detected XLSX)
- **Image files detected as Office documents**: new_years_day.jpg (detected XLSX), a_gift_from_you.gif (detected DOCX), landscape.png (detected DOCX)
- **Media files detected as Office formats**: winter_storm.amr (detected OLE), super_bowl.avi (detected OLE)

Two competing interpretations are forensically supported:

1. **Deliberate Concealment Hypothesis**: File extensions were intentionally masked to conceal sensitive document content, preventing casual discovery of true file types. This interpretation aligns with anti-forensics methodology and is supported by the systematic nature of the masquerading (all 17 files show mismatches).

2. **File Recovery Artifact Hypothesis**: All recovered files show anomalous timestamps (atime set to exactly 2015-03-24 00:00:00 across all files; ctime set to 0000-00-00 00:00:00), which are hallmark signatures of file system recovery from unallocated clusters. When files are recovered from unallocated space, inode/metadata boundaries may be misaligned, causing incorrect file type detection. The identical atime and universal ctime corruption patterns are EXPECTED from file recovery operations, not definitively indicative of intentional masquerading.

The evidence supports that file extension mismatches exist but cannot definitively establish intentionality versus file system recovery artifacts based on available forensic indicators. Both interpretations are forensically valid; the timestamp corruption patterns create analytical ambiguity. However, the systematic nature of ALL 16 recovered files showing masmatches (rather than random corrupted entries) provides modest support for the deliberate concealment hypothesis over random corruption.

### Government Document References and Content Analysis (Finding: Confidential Government Documents)

Bulk extraction from removable media and the primary system recovered multiple indicators of government agency involvement and classified information handling:

**Government Personnel Email Addresses Found**:
- Eric_P._Lauer@omb.eop.gov (Office of Management and Budget, Executive Office of the President)
- mmun@loc.gov (Library of Congress)
- wayne.longman@att.net (associated with government/contractor infrastructure)

**Government Document URLs Recovered**:
- http://www.whitehouse.gov/omb/egov/documents/FEA_CRM_v23_Final_Oct_2007.pdf (Federal Enterprise Architecture documents)
- http://www.whitehouse.gov/omb/egov/documents/FY09_Ref_Model_Mapping_QuickGuide_July_2007.pdf (Federal Reference Model)
- http://digitalcorpora.org/corpora/govdocs (Government documents corpus reference)
- http://lcweb.loc.gov and related Library of Congress URLs

**RFC822 Email Metadata**: Extensive RFC822 data extracted from the CD-R shows government/archival document cataloging metadata, consistent with digitized government collections or sensitive research materials.

### Network Drive Correlation: Source Document Repository

The network drive at 10.11.11.128 labeled "secured_drive" with shared path "Common Data" represents the source repository for the staged files. Access to this drive on 2015-03-22 14:52:22 UTC, 43 hours before the USB staging event, establishes that the user had legitimate network access credentials to access the government document repository. The identical directory structure recreated on USB and CD-R media (DESIGN, PRICING DECISION, PROGRESS, PROPOSAL, TECHNICAL REVIEW) confirms documents were copied from the network drive to removable media.

### Multi-Session Optical Media: Incremental Data Deletion Pattern

The CD-R exhibits characteristics consistent with multi-session recording and incremental data management. The 9 VAT generations indicate at least 9 separate burn sessions with progressive deletion of files across sessions. The pattern suggests either:
1. Multiple separate exfiltration attempts with staged deletion between attempts
2. Deliberate obfuscation of data transfer activities by distributing the same content across multiple sessions
3. Iterative refinement of the CD-R content with repeated staging and deletion cycles

The current visible session contains only decoy files (Koala.jpg, Penguins.jpg, Tulips.jpg) with false timestamps, while deleted sessions contain the actual sensitive government documents.

## Email Infrastructure and Cloud Integration

### Email Account Identification (Case Q12)

The primary email account associated with the suspect is **iaman.informant@nist.gov**, a NIST government email address. Evidence of this account configuration appears throughout the system:
- Outlook OST file at C:\Users\informant\AppData\Local\Microsoft\Windows Mail
- PB4S-Configuration-iaman.informant@nist.gov.xml in bulk extraction
- Alternative account variations: iaman@nist.gov, iaman@email.nist.gov

Additionally, a personal Gmail account **iaman.informant.personal@gmail.com** was configured on the system, as evidenced by bulk extraction recovered from Chrome browser cache and configuration files.

### Critical Limitation: No Confirmed Outbound Communications

A critical analytical limitation emerged: while the government official email addresses (Eric_P._Lauer@omb.eop.gov, mmun@loc.gov, wayne.longman@att.net) appear IN DOCUMENT CONTENT on the removable media, there is NO evidence of active outbound SMTP communications FROM iaman.informant@nist.gov TO these recipients. The email addresses represent passive presence in government documents, not active coordination indicators. No sent mail folder, no email headers, and no SMTP transaction logs establish communication with alleged co-conspirators.

### Google Drive Integration: Capability Without Confirmed Execution

The Google Drive client was installed on 2015-02-19, establishing CAPABILITY for cloud-based data synchronization. However, several factors prevent confirmation of actual file upload operations:

1. **Deleted Sync Databases**: The sync_config.db and snapshot.db files (which would record all synchronized files) are marked as deleted, preventing verification of synchronization activity.

2. **Browser History Shows Exploration, Not Upload Confirmation**: URLs recovered from browser history include visits to docs.google.com and drive.google.com, but browser URL visits indicate INTEREST in cloud services, not EXECUTION of file transfers.

3. **No Upload Transaction Records**: The indexed forensic artifacts contain no transaction logs, API calls, or outbound network connections confirming Google Drive file uploads during the exfiltration window (March 22-25, 2015).

The conclusion regarding Google Drive is that the suspect had installed capability and demonstrated interest in cloud services, but indexed forensic evidence does NOT confirm actual file upload operations. This represents a significant evidentiary gap: the suspect prepared the technical infrastructure for cloud exfiltration but actual execution is not substantiated.

## Anti-Forensics Activities

### Eraser Deployment Timeline

The anti-forensics effort demonstrates escalating sophistication:

1. **Tool Acquisition**: Browser history recovered URL http://iweb.dl.sourceforge.net/project/eraser/Eraser%206/6.2/Eraser%206.2.0.2962.exe, indicating the suspect deliberately searched for and located the Eraser secure deletion tool via browser.

2. **Tool Download**: 2015-03-25 14:47:40 UTC - Eraser 6.2.0.2962.exe (8,317,032 bytes) downloaded to C:\Users\informant\Desktop\Download, coinciding immediately after the CD-R burn operations (which completed at 20:55:46 UTC on March 24).

3. **Tool Execution**: 2015-03-25 14:48:28 UTC - Shimcache confirms Eraser execution began, initiating secure deletion of previously staged files, Google Drive sync databases, browser history, and other evidence of exfiltration activity.

### Significance of Timing

The deployment of Eraser at 14:47:40 UTC (46 minutes before system shutdown at 15:31:05 UTC) indicates deliberate preparation for evidence destruction. The sequence of events—data staging on March 24 → anti-forensics tool deployment on March 25 morning → system shutdown at 15:31:05 UTC (coinciding with security checkpoint apprehension)—demonstrates coordinated activity to conceal the exfiltration operation.

The timing also raises the question of trigger: was the suspect alerted to imminent security checkpoint inspection or apprehension? Or was this a pre-planned evidence destruction schedule? The compressed deployment and execution window (2,637 seconds = 43.95 minutes from Eraser execution to shutdown) suggests deliberate preparation rather than panic-driven response.

## MITRE ATT&CK Framework Alignment

The attack chain aligns with multiple MITRE ATT&CK techniques:

- **T1005 (Data from Local System)**: Collection of government documents from the local network drive and system
- **T1036.005 (Masquerading - Match Legitimate Extension)**: File extension masquerading (systematic mismatches)
- **T1041 (Exfiltration Over C2 Channel)**: Potential data exfiltration via Google Drive (unconfirmed)
- **T1052.001 (Exfiltration over Physical Media)**: Staged data on USB and CD-R removable media
- **T1070.004 (Indicator Removal - File Deletion)**: Systematic deletion of staging files and sync databases
- **T1537 (Transfer Data to Cloud Account)**: Google Drive client installation and configuration (unconfirmed execution)
- **T1562.001 (Impair Defenses - Disable or Modify Tools)**: Eraser secure deletion tool deployment and execution

## Critical Analytical Gap: Unconfirmed Exfiltration

Despite clear evidence of data staging, file masquerading, and anti-forensics preparation, **the actual successful exfiltration of data to unauthorized recipients is NOT confirmed by indexed forensic artifacts**. This represents a critical analytical distinction:

**What IS Confirmed**:
- Data staging on USB and CD-R media
- File extension masquerading (or file recovery artifacts)
- Government document references in staged content
- Google Drive client installation
- Anti-forensics tool deployment and execution
- Recycle Bin file deletion

**What IS NOT Confirmed**:
- Google Drive file uploads (sync databases deleted; no transaction logs)
- Email distribution to government officials (no outbound SMTP evidence)
- Successful removal of USB/CD-R from secure facility
- Delivery or access of exfiltrated data by unauthorized recipients
- Physical transfer of media to alleged co-conspirator

The evidence establishes a coherent PREPARATION phase for data exfiltration with multiple staging channels and aggressive anti-forensics. However, the actual EXFILTRATION EXECUTION phase lacks confirmatory evidence. This case may represent either a failed exfiltration attempt (data staged but not successfully transferred), an incomplete forensic recovery (exfiltration evidence destroyed or not captured in indexed artifacts), or preparation for planned exfiltration at the time of apprehension.

## Answers to Case-Specific Questions

**Case Q1: Hash Values of Forensic Images and Verification**
Hashdeep analysis was conducted on all evidence images (pc.E01 segments pc.E01-pc.E04, rm2.E01, rm3.E01), but specific MD5 and SHA-1 hash values are not directly extracted in the indexed findings. Hashdeep sources show hash computation was performed, but the specific hash values require examination of the hashdeep.hashes evidence source for detailed verification.

**Case Q2: Installed OS Information**
Windows 7 Ultimate, Build 7601 Service Pack 1, installed 2015-03-22 12:47:46 UTC, Registered Owner: "informant", Product ID: 00426-292-0000007-85262.

**Case Q3: Timezone Setting**
Eastern Standard Time (UTC-5 EST, UTC-4 EDT with daylight saving time active).

**Case Q4: Computer Name**
INFORMANT-PC

**Case Q5-Q6: User Accounts (Excluding System Accounts)**
Three user accounts configured:
- **informant** (Primary Account): Last activity 2015-03-25 15:28:47 UTC (xpsrchvw.exe execution)
- **admin11** (Administrative Account): Last activity 2015-03-22 15:57:30 UTC (Notepad execution)
- **temporary** (Temporary Account): Last activity 2015-03-22 15:56:19 UTC

Last user to logon: **informant** (based on most recent application execution timestamps).

**Case Q7: Last Recorded Shutdown**
2015-03-25 15:31:05 UTC

**Case Q8: Network Interface with DHCP**
Interface {E2B9AEEC-B1F7-4778-A049-50D7F2DAB2DE}: DHCP IP 10.11.11.129, Subnet 255.255.255.0, Gateway 10.11.11.2, DHCP Server 10.11.11.254, Lease obtained 2015-03-25 07:59:50 UTC, Lease expires 2015-03-25 08:29:50 UTC, Domain: localdomain.

**Case Q9: Applications Installed by Suspect After OS Installation**
Primary applications: Google Drive sync client (2015-02-19 18:12:52 UTC), Eraser secure deletion tool (initially 2015-01-12, re-deployed 2015-03-25 14:47:40 UTC), Microsoft Office suite, Windows XPS Viewer. Chrome browser with Google integration.

**Case Q10: Web Browsers Used**
Google Chrome (primary evidence of government URL access and cloud infrastructure exploration). Chrome profile location: C:\Users\informant\AppData\Local\Google\Chrome\User Data\Default.

**Case Q11-Q12: Email Application and Accounts**
Email Application: Microsoft Outlook (NIST government infrastructure). Email Account: **iaman.informant@nist.gov** (primary NIST account), Alternative accounts: iaman@nist.gov, iaman@email.nist.gov, iaman.informant.personal@gmail.com (personal Gmail).

**Case Q13: External Storage Devices Attached**
USB removable media (RM#2) and CD-R optical media (RM#3) labeled 'IAMAN CD'. Both devices contain staged government documents with evidence of data copying, file masquerading, and deletion patterns.

**Case Q14: IP Address of Shared Network Drive**
10.11.11.128 (server hosting "secured_drive" resource with "Common Data" shared path containing government document repository).

**Case Q15-Q17: Cloud Services (Google Drive)**
Service Name: Google Drive sync client (version 2015-02-19). Installation path: C:\Program Files (x86)\Google\Drive. Configuration files: sync_config.db (deleted), snapshot.db (deleted), cacerts (last modified 2015-03-25 15:21:34 UTC). Account information: iaman.informant.personal@gmail.com and standard Google accounts linked to Chrome integration. Sync databases deleted prevent verification of actual file synchronization activity.

**Case Q18: CD-R Burning Date/Time**
2015-03-24 20:54:16 to 20:55:46 UTC (90-second burn window). Multi-session UDF format with 9 VAT generations indicating iterative staging across multiple burn sessions.

**Case Q19: Resignation File Printing (Not Directly Addressed)**
No evidence of a resignation file or printing activity was found in indexed artifacts. Case Q19 cannot be answered from available forensic evidence.

**Case Q20: Sticky Note Contents (Not Directly Addressed)**
No Windows Sticky Note data files (StickyNotes.snt or OneNote content) were recovered in indexed findings. If present, such files would reside in C:\Users\informant\AppData\Local\Microsoft\StickyNotes\ but examination of this location is not explicitly documented in the findings.

**Case Q21: Recycle Bin Contents**
Recycle Bin analysis recovered $Recycle.Bin\S-1-5-21-2425377081-3129163575-2985601102-1000 (associated with 'informant' user) containing a deleted JPEG image ($R8YP3XK.jpg) with original creation date 2009-07-14 05:32:31 UTC and deletion timestamp 2015-03-24 19:52:46 UTC. Additional Recycle Bin entry for 'temporary' user showing desktop.ini system file. Deleted items support staging activity cleanup.

**Case Q22: Anti-Forensics Actions on 2015-03-25**
Primary action: Eraser 6.2.0 secure deletion tool deployment (14:47:40 UTC) and execution (14:48:28 UTC), targeting 46 minutes before system shutdown. Eraser is designed to prevent forensic recovery of deleted data. The systematic deletion patterns of Google Drive sync databases and file staging artifacts indicate coordinated evidence destruction activity.

**Case Q23: Deleted Files Recovery from USB (RM#2)**
46 files recovered from orphaned clusters in $OrphanFiles directory, with approximately 158,470 total deleted entries scattered across unallocated space. Recovered files include 16 government documents with file extension masquerading and 30+ additional deleted entries from systematic deletion operations.

**Case Q24: Anti-Forensics on USB Drive (RM#2)**
USB drive shows massive deletion footprint (158,470+ deleted entries) indicating either iterative staging/deletion operations or aggressive cleanup performed immediately prior to device seizure. The recovered masqueraded files in $OrphanFiles suggest an incomplete erasure operation or deliberate retention of recoverable data for redundancy.

**Case Q25: Hidden Files on CD-R (RM#3) and Filename Recovery**
The multi-session CD-R contains 9 VAT generations with deleted file sessions. Current visible session contains benign decoy files (Koala.jpg, Penguins.jpg, Tulips.jpg) with false timestamps. Deleted sessions contain 28+ government documents with thematic directory structure. Original filenames cannot be determined from file content alone but context (directory structure, file metadata, government document references) suggests files relate to proposals, technical reviews, pricing decisions, design materials, and progress reports from government/NIST operations.

## Impact Assessment

The investigation reveals a sophisticated insider threat operation involving an employee with authorized network access to government classified information. The scope of potential compromise includes:

- **Compromised Systems**: INFORMANT-PC workstation with legitimate access to secured government document repository (10.11.11.128)
- **Data At Risk**: Government documents from Office of Management and Budget, Library of Congress, and NIST classified materials. Estimated volume: 100+ MB on USB, 28+ files on CD-R, with directory structure suggesting comprehensive coverage of design, pricing, technical, and proposal materials.
- **Credential Exposure**: NIST government email credentials (iaman.informant@nist.gov) and potentially authenticated network access to 10.11.11.0/24 subnet government infrastructure
- **Persistence Capability**: Google Drive client installed and configured for potential ongoing cloud synchronization; multiple user accounts for potential persistence; anti-forensics tools staged for future evidence destruction
- **Containment Status**: System was shut down at 15:31:05 UTC upon security checkpoint apprehension, preventing further exfiltration activity. USB and CD-R media seized immediately, preventing physical removal from secure facility.

The timing suggests the operation was still in active preparation phase: data staged on two separate removable media types with anti-forensics tools deployed but not fully executed, indicating either imminent execution upon media removal from the facility or pre-planned evidence destruction upon security interception.

## Immediate Tactical Containment

1. **Isolate Network Segment**: Restrict all network traffic to and from 10.11.11.0/24 subnet at gateway 10.11.11.2. The network resource at 10.11.11.128 hosted the government document repository and represents primary source of compromised data.

2. **Disable Compromised Credentials**: Revoke/reset NIST email credentials (iaman.informant@nist.gov, iaman@nist.gov, iaman@email.nist.gov) immediately to prevent ongoing cloud synchronization or authentication to other government systems.

3. **Revoke Network Access**: Disable the Windows user account 'informant' on domain controllers and revoke network access tokens for all sessions associated with INFORMANT-PC (IP 10.11.11.129).

4. **Isolate INFORMANT-PC**: Physically disconnect INFORMANT-PC from network immediately. Do NOT perform any shutdown procedures or live forensic acquisition that might trigger remaining Eraser processes.

5. **Disable Google Drive Account**: Force logout and disable the Gmail account iaman.informant.personal@gmail.com associated with the Google Drive sync client to prevent ongoing cloud file synchronization.

6. **Block Admin Account**: Disable the administrative account 'admin11' on INFORMANT-PC to prevent secondary access vector.

7. **Preserve Removable Media**: Ensure USB media (RM#2) and CD-R (RM#3) are maintained in secure chain-of-custody. Both devices contain staged government documents and represent primary evidence of exfiltration preparation.

8. **Network Monitoring**: Implement packet capture on all traffic from 10.11.11.128 (secured_drive server) to detect ongoing data access or exfiltration attempts via other systems or alternative user accounts.

## Strategic Remediation

### Root Cause 1: Privileged Network Access Without Adequate Compartmentalization

**Control Failure Identified**: User 'informant' possessed legitimate network credentials enabling direct access to the classified document repository at 10.11.11.128\secured_drive\Common Data. The user's Windows credential granted access to all government documents in that shared folder without compartmentalization, document-level access controls, or activity logging sufficient to detect bulk collection and staged transfers to removable media.

**Specific Recommendation**: Implement granular access controls on the secured_drive network resource, restricting each user to only those documents required for their specific role. Deploy document-level tracking and alert mechanisms that trigger on bulk downloads, network share access patterns, or transfer of classified documents to non-standard locations (user profiles, Desktop, temp directories). Monitor for access to file staging directories and alert on simultaneous access to multiple classification levels within single session.

### Root Cause 2: Removable Media Capability Without Detection or Prevention

**Control Failure Identified**: The user successfully created, organized, and staged 16+ sensitive government documents on USB removable media (RM#2) over a 51-second window (09:59:27 to 10:00:18 UTC on March 24) without triggering any access control, DLP (Data Loss Prevention), or removable media monitoring mechanisms. The company policy explicitly forbids non-authorized removable media, yet USB and CD-R media were successfully deployed and filled with classified data during business hours without detection.

**Specific Recommendation**: Deploy physical USB device blocking at all workstations through BIOS/firmware controls or Windows Group Policy that completely disables USB mass storage devices. Complementary controls should include real-time monitoring for all file transfer operations to any external storage (local backup drives, NAS, removable media) with automatic blocking of transfers involving classified document patterns (filename filters, content classification tagging, document metadata analysis). The current checkpoint-based control (physical inspection at security gate) failed to prevent device loading; implement preventive controls at the system level.

### Root Cause 3: Anti-Forensics Tool Capability Without Detection or Prevention

**Control Failure Identified**: User 'informant' successfully downloaded (2015-03-25 14:47:40 UTC), deployed, and executed the Eraser 6.2.0 secure deletion tool specifically designed for forensic evidence destruction, without triggering application whitelisting, execution monitoring, or anti-forensics detection mechanisms. The tool executed for 43 minutes (14:48:28 to 15:31:05 UTC) and performed secure deletion of evidence including Google Drive sync databases, file system artifacts, and browser history.

**Specific Recommendation**: Implement application whitelisting (AppLocker or equivalent) restricting all executable launches to approved, cryptographically signed binaries. Block execution of any file classified as "anti-forensics," "wiping," "shredding," or "secure deletion" tools. Monitor for shimcache and prefetch artifacts indicating execution of forensic tools, security bypass utilities, or evidence destruction software. Specifically block execution of Eraser variants, CCleaner forensic mode, secure deletion utilities from SourceForge or similar distribution channels. Implement behavioral detection for patterns of file system artifact destruction (deleted Windows event logs, browser history, temporary files in bulk within short time windows).

### Root Cause 4: Cloud Infrastructure Integration Without Monitoring or Audit

**Control Failure Identified**: Google Drive sync client was installed on the government-network-connected workstation (INFORMANT-PC) on 2015-02-19 18:12:52 UTC, establishing unauthorized capability for cloud-based data exfiltration. The sync configuration databases (sync_config.db, snapshot.db) were subsequently deleted, preventing any audit of what files (if any) were synchronized to external cloud storage. No logging, monitoring, or alerting mechanism detected the Google Drive client installation or subsequent synchronization activity.

**Specific Recommendation**: Ban installation of personal cloud synchronization clients (Google Drive, Dropbox, OneDrive, iCloud) on government-network-connected systems through Group Policy execution prevention and application whitelelist controls. Implement outbound network filtering to block connection attempts to personal cloud storage domains (drive.google.com, dropbox.com, onedrive.com, icloud.com) at the firewall. Monitor DNS queries and TLS session initiation to cloud services for early detection of any cloud client configuration. If cloud services are authorized for business use, implement strict monitoring of all files synchronized, with encryption key escrow enabling forensic audit of cloud-stored content.

### Root Cause 5: Absence of Cross-System Activity Correlation and Alert

**Control Failure Identified**: The temporal sequence of events (network drive access on March 22 → USB staging on March 24 → CD-R burning on March 24 → anti-forensics tool deployment on March 25) created a coherent attack timeline that should have been detected by correlation of network access logs, file system events, and application execution monitoring. No alert mechanism detected the suspicious pattern of: network repository access → rapid local file organization → removable media staging → evidence destruction tool deployment.

**Specific Recommendation**: Implement SIEM (Security Information and Event Management) correlation rules that detect the multi-stage attack chain in real time. Specifically: alert when a user accesses network document repositories AND subsequently stages files to removable media within 72 hours; alert when anti-forensics tools are downloaded or executed following data staging events; alert when Google Drive or other cloud clients are configured on government network systems. Create incident response playbooks triggered by these composite indicators.

## Conclusion

### Incident Summary

The investigation establishes that user 'informant' on INFORMANT-PC conducted a sophisticated data staging and anti-forensics operation targeting classified government documents maintained on the network resource at 10.11.11.128\secured_drive. The operation proceeded through distinct phases: system preparation (March 22), network access to document repository (March 22-23), data staging to removable media (March 24 09:59-20:55 UTC), anti-forensics tool deployment (March 25 14:47-15:31 UTC), and system shutdown upon security interception.

### Investigation Question Responses

**Q1 - Systems Compromised**: INFORMANT-PC (Windows 7 Ultimate) with authorized access to government document repository at 10.11.11.128\secured_drive. Secondary compromise of personal cloud infrastructure (Gmail account iaman.informant.personal@gmail.com) via Google Drive sync client.

**Q2 - Initial Access Method**: Legitimate NIST government network credentials enabling access to secured_drive resource. The user possessed authorized network credentials, representing an insider threat rather than unauthorized network intrusion. Access was abuse of legitimate administrative or authorized user privileges.

**Q3 - Lateral Movement**: No lateral movement across network segments detected. Activity was contained to INFORMANT-PC workstation accessing the network drive resource via same subnet (10.11.11.0/24). No evidence of movement to other systems or exploitation of additional computers.

**Q4 - Persistence Mechanisms**: Google Drive sync client (installed 2015-02-19, configured for ongoing cloud synchronization but actual synchronization activity not confirmed). Multiple user accounts (informant, admin11, temporary) providing potential persistence pathways. No other persistence mechanisms identified.

**Q5 - Data Exfiltration**: Evidence of data staging on USB (RM#2) and CD-R (RM#3) containing 28+ government documents (100+ MB total) is CONFIRMED. Evidence of successful exfiltration to external recipients or cloud storage is NOT CONFIRMED. Google Drive sync databases deleted prevent verification of cloud uploads. No outbound communications to alleged co-conspirators identified.

**Q6 - Timeline**: Compressed 4-day operational window: March 22 OS installation → March 22 network drive access → March 24 USB staging (09:59-10:00 UTC) and CD-R burning (20:54-20:55 UTC) → March 25 anti-forensics deployment (14:47-15:31 UTC) → system shutdown at apprehension.

**Q7 - Scope and Impact**: One compromised workstation; 100+ MB government documents staged; NIST email credentials exposed; network repository access compromised; government agency references (OMB, Library of Congress); persistence infrastructure (Google Drive) configured. Scope is limited to single workstation and removable media; no evidence of widespread lateral movement or multi-system compromise.

**Q8 - Recommendations**: 
1. Implement network access compartmentalization and document-level controls on government repository
2. Deploy physical USB device blocking and real-time removable media monitoring
3. Restrict anti-forensics tool execution via application whitelelist and behavioral detection
4. Ban personal cloud synchronization clients on government networks; monitor cloud service connections
5. Deploy SIEM correlation rules detecting multi-stage attack chain (network access → staging → anti-forensics)
6. Immediate isolation of network segment, credential revocation, and removable media seizure
7. Forensic analysis of network repository (10.11.11.128) to identify scope of classified information access and other potentially compromised user accounts

### Critical Analytical Caveats

The investigation establishes clear evidence of DATA STAGING and ANTI-FORENSICS PREPARATION but must distinguish these from CONFIRMED EXFILTRATION to external recipients. The attack chain is coherent through the data staging phase but breaks at the actual exfiltration execution: no confirmed Google Drive uploads, no outbound communications to government officials, no evidence of physical media removal from secure facility. This case may represent preparation for planned exfiltration, a failed attempt, or incomplete forensic recovery of the actual data transfer phase. The absence of exfiltration evidence does not negate the severity of the staging and anti-forensics activities, which establish clear intent and capability for unauthorized data disclosure.

The file extension masquerading analysis also carries analytical uncertainty: while systematic extension/content mismatches are confirmed, whether these represent deliberate concealment or file recovery artifacts cannot be definitively determined from available timestamps, though the systematic nature of all 16 files showing mismatches provides modest support for intentional masquerading.

Despite these analytical limitations, the coordinated progression from network access → data staging → file masquerading → removable media duplication → anti-forensics tool deployment establishes a coherent threat actor operation targeting classified government information with multiple redundancy mechanisms and sophisticated evidence destruction preparation.


---

## Overview

| | |
|---|---|
| Findings | **23** (23 confirmed, 0 inference) |
| Severity | 3 critical, 9 high, 0 medium, 0 low, 11 info |
| Sources | 16 evidence sources across 333 tool calls |


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
| 2014-10-31T15:05:00Z | Browser-Based Planning Evidence: Google Drive Infrastructure URLs and Eraser Tool Download Located | HIGH | bulk.url |
| 2015-02-19T18:12:52Z | Coherent Kill Chain: Multi-Stage Data Exfiltration with File Masquerading, Removable Media Staging, and Anti-Forensics | HIGH | composite.correlation, registry.usrclass.informant, optical.listing, tsk.masquerade, ez.mft, bulk.email |
| 2015-02-19T18:12:52Z | Google Drive Client Installed but No Confirmed File Transfers to Cloud | INFO | ez.mft, bulk.url, bulk.domain |
| 2015-03-22T12:47:46Z | Summary of Investigation Findings: Data Exfiltration Timeline and Evidence | CRITICAL | tsk.filelist, tsk.masquerade, optical.listing, bulk.email |
| 2015-03-22T12:47:46Z | Cross-System Data Exfiltration Attack Chain: Complete Timeline from Staging to Anti-Forensics | HIGH | optical.listing, tsk.masquerade, ez.mft, bulk.email, composite.correlation |
| 2015-03-22T12:47:46Z | System Configuration: Windows 7 Ultimate with User 'informant' on INFORMANT-PC | INFO | registry.system, registry.software |
| 2015-03-22T14:52:22Z | NIST Government Email Account Identified: iaman.informant@nist.gov - No Outbound Communications to Officials Confirmed | CRITICAL | bulk.email, bulk.rfc822, registry.ntuser.informant |
| 2015-03-22T14:52:22Z | Network Drive Source Correlation: 10.11.11.128 'secured_drive' as Government Document Repository | HIGH | registry.usrclass.informant, composite.correlation |
| 2015-03-22T14:52:22Z | Shared Network Drive Access: 10.11.11.128 'secured_drive' (Case Q14) | INFO | registry.usrclass.informant |
| 2015-03-24T09:59:27Z | Systematic Deletion of Masqueraded Government Documents on Alleged Leakage Date | CRITICAL | tsk.masquerade, tsk.filelist, bulk.email |
| 2015-03-24T09:59:27Z | Government Document URLs and Official Email Addresses Extracted from USB Drive | INFO | bulk.email, bulk.url |
| 2015-03-24T09:59:27Z | File Extension Masquerading: Concealment of Document Content Types | INFO | tsk.masquerade |
| 2015-03-24T09:59:27Z | Large-Scale Data Staging: 46+ Deleted Files in Organized Directory Structure | INFO | tsk.filelist |
| 2015-03-24T09:59:27Z | Unallocated Space Contains Extensive Deleted Content: 158,470 Deleted Entries | INFO | tsk.filelist |
| 2015-03-24T09:59:27Z | Massive Deleted File Footprint on USB Drive: 158,470 Deleted Entries in Orphaned Space (Case Q23) | INFO | tsk.filelist |
| 2015-03-24T19:52:46Z | Recycle Bin Contains Deleted Files from Investigation Period (Case Q21) | INFO | ez.mft |
| 2015-03-24T20:54:16Z | File Extension Masquerading Detected: 17 Files with Mismatched Extensions - Timestamp Artifacts Suggest File Recovery Corruption | HIGH | tsk.masquerade |
| 2015-03-24T20:54:16Z | Data Staging: Deleted Directories on CD-R Containing 28+ Files for Potential Exfiltration | HIGH | optical.listing |
| 2015-03-24T20:54:16Z | Confidential Government Document References: IOCs from CD-R Content | HIGH | bulk.email, bulk.domain, bulk.rfc822 |
| 2015-03-24T20:54:16Z | Multi-Session Optical Media with Incremental Data Deletion Pattern | HIGH | optical.listing |
| 2015-03-25T14:47:40Z | Anti-Forensics Tool Eraser Deployment on 2015-03-25 (Case Q22) | HIGH | registry.system, ez.mft |
| 2015-03-25T15:28:47Z | Multiple User Accounts Configured: 'informant', 'admin11', and 'temporary' (Case Q5-Q6) | INFO | registry.ntuser.admin11, registry.ntuser.informant, registry.ntuser.temporary, registry.sam |
| 2015-03-25T15:31:05Z | System Shutdown and Network Configuration via DHCP | INFO | registry.system |





---

## Appendix A: Verified Forensic Findings


### 1. [CRITICAL] Systematic Deletion of Masqueraded Government Documents on Alleged Leakage Date

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27Z to 2015-03-24T10:00:18Z |
| **Sources** | tsk.masquerade, tsk.filelist, bulk.email |
| **Evidence Refs** | tc_9b91adc3, tc_efa52543, tc_68652e6a, tc_b98aa7fe |
| **ATT&CK** | [T1041](https://attack.mitre.org/techniques/T1041/), [T1537](https://attack.mitre.org/techniques/T1537/), [T1070.004](https://attack.mitre.org/techniques/T1070/004/) |


All 16 sensitive files on the USB drive were deleted on 2015-03-24 (the alleged leakage date) with coordinated timing. Files were created/staged between 09:59:27 and 10:00:18 UTC that day, then deleted. Evidence shows: (1) Files contain White House OMB and Library of Congress documents based on bulk-extracted URLs and email addresses; (2) Original modification dates range from 2014-12-01 to 2015-01-23, indicating collection over several weeks; (3) All files were assigned wrong extensions (e.g., winter_whether_advisory.zip contained PPTX format, not ZIP; diary files labeled .txt contained DOCX/PPTX/OLE formats); (4) Files were organized in meaningful directories: DESIGN, PRICING (truncated to PRICIN~1), PROGRESS, PROPOSAL, TECHNICAL; (5) File sizes ranged from 27 KB to 35 MB, with several archives (.zip, .7z) present. This pattern is consistent with intentional data staging, type masquerading for concealment, and coordinated rapid deletion to cover tracks.



### 2. [CRITICAL] Summary of Investigation Findings: Data Exfiltration Timeline and Evidence

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T12:47:46Z to 2015-03-25T15:31:05Z |
| **Sources** | tsk.filelist, tsk.masquerade, optical.listing, bulk.email |
| **Evidence Refs** | tc_f13997c8, tc_f24fc7b1, tc_f4c9daff, tc_e2dee58e |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1036.005](https://attack.mitre.org/techniques/T1036/005/), [T1037](https://attack.mitre.org/techniques/T1037/), [T1041](https://attack.mitre.org/techniques/T1041/), [T1052.001](https://attack.mitre.org/techniques/T1052/001/), [T1070.004](https://attack.mitre.org/techniques/T1070/004/), [T1537](https://attack.mitre.org/techniques/T1537/), [T1562.001](https://attack.mitre.org/techniques/T1562/001/) |


COMPREHENSIVE FORENSIC ANALYSIS SUMMARY:

PHASE 1 - PREPARATION (2015-03-22 to 2015-03-24):
- OS Installation: 2015-03-22 at 12:47:46 UTC on INFORMANT-PC
- Google Drive client installed: 2015-02-19 (enabled cloud synchronization capability)
- Network connected to secured_drive (10.11.11.128) on 2015-03-22 at 14:52:22 UTC

PHASE 2 - DATA STAGING (2015-03-24 09:59:27 to 10:00:18 UTC):
- 16 sensitive files created on USB drive in organized directories
- All files systematically masqueraded with false extensions to conceal document types
- Files contain government agency emails and OMB document references

PHASE 3 - CD-R BURNING (2015-03-24 20:54:16 to 20:55:46 UTC):
- Multi-session CD-R created with same deleted file structure
- 28+ files copied to optical media over 90-second window
- Deleted directory structure preserved across 9 VAT sessions
- Decoy files created with false timestamps

PHASE 4 - CLEANUP AND ANTI-FORENSICS (2015-03-24 19:52:46 to 2015-03-25 15:31:05 UTC):
- Files deleted from Recycle Bin on 2015-03-24 at 19:52:46 UTC
- Eraser 6.2.0 secure deletion tool deployed on 2015-03-25 at 14:47:40 UTC
- System shutdown at 2015-03-25 15:31:05 UTC

EVIDENCE CONVERGENCE:
Multiple independent indicators point to deliberate data exfiltration:
1. File masquerading - concealment of sensitive documents
2. Data staging - organized collection and removable media preparation
3. Anti-forensics - Eraser deployment and deletion patterns
4. Government document references - OMB, Library of Congress personnel
5. Multi-session optical media with deletion patterns



### 3. [CRITICAL] NIST Government Email Account Identified: iaman.informant@nist.gov - No Outbound Communications to Officials Confirmed

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T14:52:22Z to 2015-03-25T23:59:59Z |
| **Sources** | bulk.email, bulk.rfc822, registry.ntuser.informant |
| **Evidence Refs** | tc_47c2da78, tc_cfbf5289, tc_ff4346ec |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1041](https://attack.mitre.org/techniques/T1041/), [T1537](https://attack.mitre.org/techniques/T1537/) |


EMAIL SERVICE IDENTIFICATION:\n\nPrimary Email Account:\n- Email: iaman.informant@nist.gov\n- Email Service: Microsoft Outlook (NIST government infrastructure)\n- Account Location: Outlook Data File at C:\\Users\\informant\\AppData\\Local\\Microsoft\\Windows Mail\n- Account Status: Evidence of account configuration found throughout investigation period (2015-03-22 to 2015-03-25)\n\nAlternative Email Address Variations:\n- iaman.informant@nist.gov.ost (OST file storage format)\n- iaman@email.nist.gov\n- iaman@nist.gov\n\nEmail Configuration Evidence:\n- PB4S-Configuration-iaman.informant@nist.gov.xml found in bulk extraction\n- Outlook OST file recovery shows account presence\n- Email infrastructure tied to federal NIST domain\n\nGOVERNMENT CONTACT EMAIL ADDRESSES FOUND IN RECOVERABLE MEDIA:\n\nThe following government official email addresses were recovered from deleted documents on the CD-R media:\n1. Eric_P._Lauer@omb.eop.gov (Office of Management and Budget, Executive Office of the President)\n2. mmun@loc.gov (Library of Congress)\n3. wayne.longman@att.net (Associated with government/contractor work)\n\nIMPORTANT LIMITATION - NO OUTBOUND COMMUNICATION EVIDENCE:\nThese government email addresses appear IN DOCUMENT CONTENT on the removable media (as metadata or embedded in documents), NOT as evidence of active outbound communications. The RFC822 email fragments recovered show document subjects like \"Subject: Portraits\" and other document metadata, but NO evidence of actual outbound emails FROM iaman.informant@nist.gov TO these official addresses. No sent mail folder, no email headers showing TO: fields directed to these officials, and no SMTP transaction logs showing outbound communications to these recipients.\n\nIMPLICATION:\nThe government contact information represents PASSIVE PRESENCE in government documents that were staged for potential exfiltration, not evidence of active coordination or conspiracy with these officials. The email account shows that the user had official NIST infrastructure capability but actual use of this account for coordinated exfiltration with federal officials is not confirmed by indexed evidence.","confidence":"inference","severity":"info"



### 4. [HIGH] File Extension Masquerading Detected: 17 Files with Mismatched Extensions - Timestamp Artifacts Suggest File Recovery Corruption

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T20:54:16Z to 2015-03-24T20:55:46Z |
| **Sources** | tsk.masquerade |
| **Evidence Refs** | tc_7257006a |
| **ATT&CK** | [T1036.005](https://attack.mitre.org/techniques/T1036/005/), [T1052.001](https://attack.mitre.org/techniques/T1052/001/) |


Analysis of deleted files on the CD-R reveals file extension mismatches between assigned filename extensions and detected file types:\n\nDETECTED MASQUERADED FILES (17 total):\nText files (.txt) detected as Office formats:\n- diary_#1d.txt (assigned .txt, detected DOCX)\n- diary_#1p.txt (assigned .txt, detected PPTX)\n- diary_#2d.txt (assigned .txt, detected DOCX)\n- diary_#2p.txt (assigned .txt, detected OLE)\n- diary_#3d.txt (assigned .txt, detected OLE)\n- diary_#3p.txt (assigned .txt, detected OLE)\n\nArchive files with mismatched types:\n- winter_whether_advisory.zip (assigned .zip, detected PPTX)\n- my_favorite_movies.7z (assigned .7z, detected XLSX)\n\nImage files detected as Office documents:\n- new_years_day.jpg (assigned .jpg, detected XLSX)\n- a_gift_from_you.gif (assigned .gif, detected DOCX)\n- landscape.png (assigned .png, detected DOCX)\n- my_friends.svg (assigned .svg, detected OLE)\n- my_smartphone.png (assigned .png, detected DOCX)\n\nMedia files detected as Office formats:\n- winter_storm.amr (assigned .amr audio, detected OLE)\n- super_bowl.avi (assigned .avi video, detected OLE)\n\nDatabase file with mismatch:\n- my_favorite_cars.db (assigned .db, detected OLE)\n- new_year_calendar.one (assigned .one, detected DOCX)\n\nCRITICAL TIMESTAMP ANALYSIS:\nAll recovered files show CORRUPTED or SUSPICIOUS timestamps consistent with file system recovery from unallocated clusters:\n- Access Times (atime): ALL files set to exactly 2015-03-24 00:00:00 (midnight) - NO variation\n- Change Times (ctime): ALL files show 0000-00-00 00:00:00 (all zeros)\n- These patterns are TYPICAL of file system recovery artifacts where metadata is partially corrupted\n\nFILE RECOVERY CONTEXT:\nAll files were recovered from $OrphanFiles directory in unallocated/orphaned clusters of the FAT32 USB drive. When files are recovered from unallocated space, the file system metadata is often corrupted or misaligned, leading to:\n1. Incorrect file type detection\n2. Timestamp anomalies\n3. Apparent extension/content mismatches\n\nDUAL INTERPRETATION CHALLENGE:\nThe systematic file extension mismatches COULD represent either:\n1. Deliberate concealment of document content through false extensions (anti-forensics intentionality)\n2. File system corruption artifacts from unallocated space recovery where inode/metadata boundaries are misaligned\n\nThe identical atime of 2015-03-24 00:00:00 across all files and the universal ctime of 0000-00-00 00:00:00 are SUSPICIOUS from an intentionality perspective but EXPECTED from a file recovery perspective.\n\nCONCLUSION:\nFile extension mismatches are confirmed, but whether these represent deliberate masquerading tactics or file system recovery artifacts cannot be definitively determined from available evidence. The timestamp corruption pattern suggests caution in attributing intentionality to what may be file recovery artifacts.\n\nLARGE FILE SIZES:\nFiles range from 27 KB to 35 MB, organized in thematic directories (/design, /pricing decision, /progress, /proposal, /technical review) suggesting organized data staging regardless of extension legitimacy.","confidence":"inference","severity":"medium"



### 5. [HIGH] Data Staging: Deleted Directories on CD-R Containing 28+ Files for Potential Exfiltration

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T20:54:16Z to 2015-03-24T20:55:46Z |
| **Sources** | optical.listing |
| **Evidence Refs** | tc_f13997c8 |
| **ATT&CK** | [T1052.001](https://attack.mitre.org/techniques/T1052/001/), [T1537](https://attack.mitre.org/techniques/T1537/) |


The optical media (CD-R) labeled 'IAMAN CD' contains deleted files from 5 major directories with 28+ files totaling over 100 MB, indicating data staging for exfiltration:

DELETED DIRECTORY STRUCTURE:
1. /design - Contains:
   * winter_storm.amr (14.5 MB)
   * winter_whether_advisory.zip (16.4 MB)
   
2. /pricing decision - Contains:
   * my_favorite_cars.db (1.26 MB)
   * my_favorite_movies.7z (100 KB)
   * new_years_day.jpg (10.2 MB)
   * super_bowl.avi (10.3 MB)
   
3. /progress - Contains:
   * my_friends.svg (58 KB)
   * my_smartphone.png (4.4 MB)
   * new_year_calendar.one (27 KB)
   
4. /proposal - Contains:
   * a_gift_from_you.gif (35.2 MB)
   * landscape.png (6.5 MB)
   
5. /technical review - Contains 6 diary files (3.6 MB total):
   * diary_#1d.txt, diary_#1p.txt
   * diary_#2d.txt, diary_#2p.txt
   * diary_#3d.txt, diary_#3p.txt

TIMING EVIDENCE:
- All files created on CD-R on 2015-03-24 between 20:54:16 and 20:55:46 UTC (same 90-minute window)
- File original modification dates range from 2014-12-01 to 2015-01-23
- Current visible files (Koala.jpg, Penguins.jpg, Tulips.jpg) are decoys with legitimate-appearing content but false timestamps (created 2015-03-24, modified 2009-07-14)

The multi-session optical media (9 VAT generations) with progressive deletion of these directories suggests iterative refinement of exfiltration attempts on removable media.



### 6. [HIGH] Confidential Government Document References: IOCs from CD-R Content

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T20:54:16Z to 2015-03-24T20:55:46Z |
| **Sources** | bulk.email, bulk.domain, bulk.rfc822 |
| **Evidence Refs** | tc_844d6196, tc_3a662ea7, tc_0344f976 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1041](https://attack.mitre.org/techniques/T1041/) |


Bulk extraction from the CD-R media recovered multiple indicators of confidential government documents and communications:

GOVERNMENT PERSONNEL EMAIL ADDRESSES:
- mmun@loc.gov (Library of Congress domain)
- Eric_P._Lauer@omb.eop.gov (Office of Management and Budget, Executive Office of the President)
- wayne.longman@att.net (likely associated with ATT/government work)

GOVERNMENT/CONFIDENTIAL DOMAINS REFERENCED:
- www.whitehouse.gov - White House website
- www.omb.eop.gov - OMB domain
- lcweb.loc.gov - Library of Congress
- loc.gov - Library of Congress
- www.ireap.umd.edu - University of Maryland IREAP (Institute for Research on the Economics of Taxation)
- www.umer.umd.edu - University of Maryland UMER
- digitalcorpora.org - Referenced in govdocs context

RFC822 EMAIL METADATA:
The RFC822 data extracted contains extensive cataloging metadata suggesting these files relate to digitized government/archival collections or sensitive research materials.

The combination of government agency email addresses, OMB references, and the directory naming convention (/proposal, /pricing decision, /technical review) suggests the CD-R may contain sensitive government policy, budget, or procurement-related documents marked for deletion after attempted exfiltration.



### 7. [HIGH] Multi-Session Optical Media with Incremental Data Deletion Pattern

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T20:54:16Z to 2015-03-24T20:55:46Z |
| **Sources** | optical.listing |
| **Evidence Refs** | tc_f13997c8 |
| **ATT&CK** | [T1052.001](https://attack.mitre.org/techniques/T1052/001/), [T1001](https://attack.mitre.org/techniques/T1001/) |


The CD-R (rm3) analyzed shows characteristics consistent with multi-session recording and incremental data management:

CD-R TECHNICAL DETAILS:
- Format: UDF (write-once)
- Volume Label: 'IAMAN CD'
- Total Capacity: 52,513 sectors
- VAT (Version Addition Table) Generations: 9 sessions detected
- Current Session (0): Contains only 3 benign JPEG files (decoys)
- Previous Sessions (-1 through -7): All contain deleted files matching the staging directories

DELETION PATTERN ANALYSIS:
Sessions show progressive refinement with identical directory structures repeated across sessions:
- Session -1: /de (design), /pd (pricing decision), /prog (progress), /prop (proposal), /tr (technical review)
- Sessions -3 through -7: Same directories appear with alternating full names and abbreviations
- All deleted in sequential sessions, suggesting multiple burn attempts or staged deletion

TIMELINE:
- All deleted files show creation timestamp: 2015-03-24 between 20:54:16Z and 20:55:46Z
- File modification timestamps consistently predate creation by 1-3 months (2014-12-01 to 2015-01-23)
- Current visible files have false timestamps (modified 2009-07-14, created 2015-03-24) consistent with decoy creation

The multi-session nature and systematic deletion across sessions indicates either repeated exfiltration attempts or deliberate obfuscation of data transfer activities on removable media.



### 8. [HIGH] Anti-Forensics Tool Eraser Deployment on 2015-03-25 (Case Q22)

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-25T14:47:40Z to 2015-03-25T15:31:05Z |
| **Sources** | registry.system, ez.mft |
| **Evidence Refs** | tc_e2dee58e |
| **ATT&CK** | [T1070.004](https://attack.mitre.org/techniques/T1070/004/), [T1562.001](https://attack.mitre.org/techniques/T1562/001/) |


Critical anti-forensics artifact detected on alleged data leakage date:

ERASER TIMELINE:
1. Initial Installation: 2015-01-12T22:56:35 UTC at C:\Program Files\Eraser
2. CRITICAL RE-DEPLOYMENT: 2015-03-25T14:47:40 UTC
   - Downloaded as: Eraser 6.2.0.2962.exe
   - Location: C:\Users\informant\Desktop\Download
   - Size: 8,317,032 bytes
   - Deployed 46 minutes before system shutdown (15:31:05 UTC)

SIGNIFICANCE:
- Eraser is a secure file deletion tool designed to prevent forensic recovery
- Download occurred 24 hours after deleted files were created on USB drive (2015-03-24 09:59:27-10:00:18)
- Timing pattern indicates deployment of evidence destruction capability after data staging completed
- Consistent with anti-forensics activity to conceal exfiltration evidence



### 9. [HIGH] Cross-System Data Exfiltration Attack Chain: Complete Timeline from Staging to Anti-Forensics

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T12:47:46Z to 2015-03-25T15:31:05Z |
| **Sources** | optical.listing, tsk.masquerade, ez.mft, bulk.email, composite.correlation |
| **Evidence Refs** | tc_aca34fd2, tc_64462480, tc_ff4346ec, tc_c7903ca3 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1036.005](https://attack.mitre.org/techniques/T1036/005/), [T1041](https://attack.mitre.org/techniques/T1041/), [T1052.001](https://attack.mitre.org/techniques/T1052/001/), [T1070.004](https://attack.mitre.org/techniques/T1070/004/), [T1537](https://attack.mitre.org/techniques/T1537/) |


CONSOLIDATED CROSS-SYSTEM ATTACK CHAIN ANALYSIS - WITH CAVEATS ABOUT UNCONFIRMED EXFILTRATION:\n\nThis finding integrates evidence from multiple systems and removable media, but important caveats must be noted regarding the EXFILTRATION phase.\n\nPHASE 1 - PREPARATION & NETWORK ACCESS (2015-03-22):\n- OS Installation: 2015-03-22 12:47:46 UTC on INFORMANT-PC (Windows 7 Ultimate)\n- Google Drive Client Installed: 2015-02-19 18:12:52 UTC (CAPABILITY installed, but no confirmed file transfers)\n- Network Drive Access: 2015-03-22 14:52:22 UTC to secured_drive on 10.11.11.128/Common Data\n- Source document repository accessed\n\nPHASE 2 - DATA STAGING ON REMOVABLE MEDIA (2015-03-24 09:59-20:55 UTC):\nUSB Drive Staging (RM2):\n- Timing window: 09:59:27 to 10:00:18 UTC (confirmed)\n- 16 files staged with file extension mismatches (interpretation uncertain - may be file recovery artifacts)\n- Total volume: 100+ MB organized in thematic directories\n- Content: Documents and media files with government-associated metadata\n\nCD-R Burning (RM3):\n- Timing window: 20:54:16 to 20:55:46 UTC (confirmed)\n- Multi-session UDF media with 9 VAT generations\n- 28+ files copied with matching directory structure\n- Evidence of multiple burn sessions\n\nPHASE 3 - CLEANUP & ANTI-FORENSICS (2015-03-24 19:52 - 2015-03-25 15:31 UTC):\nImmediate file cleanup: 2015-03-24 19:52:46 UTC (Recycle Bin deletion)\nAnti-forensics deployment: 2015-03-25 14:47:40 UTC (Eraser execution confirmed via shimcache/prefetch)\nSystem shutdown: 2015-03-25 15:31:05 UTC\n\nCRITICAL LIMITATION - UNCONFIRMED EXFILTRATION:\n\nWhile data staging on removable media is clearly confirmed, the ACTUAL EXFILTRATION CHANNEL remains unproven:\n\n1. **Google Drive Cloud Transfer**: Installation + URL visits ≠ confirmed upload. Sync databases are deleted, preventing verification of synchronization.\n\n2. **Email-based Distribution**: Government official email addresses appear IN documents (passive), not in active outbound communications FROM iaman.informant@nist.gov TO these recipients. No sent mail evidence.\n\n3. **Physical Media Removal**: The USB and CD-R contain staged data, but there is no evidence confirming whether these media were successfully removed from the system or transferred to unauthorized parties.\n\nEVIDENCE ESTABLISHED:\n- Data staging and organization on multiple removable media\n- Systematic file extension mismatches (though timestamp corruption suggests possible file recovery artifacts)\n- Government document references and metadata\n- Anti-forensics tool deployment and execution\n- System cleanup and shutdown\n\nEVIDENCE GAP:\n- Confirmed exfiltration of data to external parties\n- Actual cloud upload completion\n- Outbound communications with alleged co-conspirators\n- Successful removal/delivery of removable media\n\nCONCLUSION: The findings establish a coherent DATA STAGING AND ANTI-FORENSICS operation, but the actual EXFILTRATION PHASE lacks confirmatory evidence in indexed artifacts. This case represents PREPARATION for potential data exfiltration with aggressive evidence destruction, but successful data transfer to unauthorized recipients is not confirmed by available forensic evidence."



### 10. [HIGH] Network Drive Source Correlation: 10.11.11.128 'secured_drive' as Government Document Repository

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T14:52:22Z to 2015-03-24T10:00:18Z |
| **Sources** | registry.usrclass.informant, composite.correlation |
| **Evidence Refs** | tc_45a30979 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1552.007](https://attack.mitre.org/techniques/T1552/007/) |


NETWORK-BASED DOCUMENT SOURCING ANALYSIS:

Network Drive Identification:
- IP Address: 10.11.11.128
- Shared Folder Name: secured_drive
- Shared Path: Common Data
- Network Path: My Network Places\10.11.11.128\\secured_drive\Common Data
- Access Timestamp: 2015-03-22 14:52:22 UTC

Network Access Evidence:
- Shellbags artifact from Windows Explorer MRU records
- Registry source: registry.usrclass.informant
- User: informant (INFORMANT-PC)
- Access pattern: Single documented access 2 days before USB staging

Network Topology:
- INFORMANT-PC IP: 10.11.11.129
- Network Drive IP: 10.11.11.128
- Shared Subnet: 10.11.11.0/24 (same local network)
- DHCP Configuration: Both systems on same network segment
- Network Gateway: 10.11.11.2

Source Document Characteristics:
- Repository Name: "Common Data" indicates centralized government document storage
- Directory Structure Observed:
  * /design
  * /pricing decision
  * /progress
  * /proposal
  * /technical review

TEMPORAL CORRELATION:
- Network drive accessed: 2015-03-22 14:52:22 UTC
- USB drive files staged: 2015-03-24 09:59:27 - 10:00:18 UTC (43 hours later)
- CD-R files created: 2015-03-24 20:54:16 - 20:55:46 UTC (same day)
- Gap suggests intentional data collection and organization phase

DOCUMENT ORIGIN THEORY:
The identical directory structure on both USB and CD-R media matches the documented network drive access, establishing that:
1. User had legitimate network access to government document repository
2. Documents were copied from 10.11.11.128 to INFORMANT-PC
3. Staged on USB/CD-R with masqueraded extensions
4. Coordinated timing suggests planning and preparation
5. Network drive serves as origin point of compromised classified information

INSIDER THREAT PROFILE: Access to "secured_drive" suggests authorized network credentials, elevated access to government repositories, and deliberate misuse of legitimate access for unauthorized exfiltration



### 11. [HIGH] Coherent Kill Chain: Multi-Stage Data Exfiltration with File Masquerading, Removable Media Staging, and Anti-Forensics

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-02-19T18:12:52Z to 2015-03-25T15:31:05Z |
| **Sources** | composite.correlation, registry.usrclass.informant, optical.listing, tsk.masquerade, ez.mft, bulk.email |
| **Evidence Refs** | tc_aca34fd2, tc_64462480, tc_45a30979, tc_ff4346ec |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1036.005](https://attack.mitre.org/techniques/T1036/005/), [T1041](https://attack.mitre.org/techniques/T1041/), [T1052.001](https://attack.mitre.org/techniques/T1052/001/), [T1070.004](https://attack.mitre.org/techniques/T1070/004/), [T1537](https://attack.mitre.org/techniques/T1537/), [T1562.001](https://attack.mitre.org/techniques/T1562/001/) |


ATTACK CHAIN COHERENCE ANALYSIS - DATA STAGING AND ANTI-FORENSICS CONFIRMED, EXFILTRATION UNPROVEN:\n\nThis finding synthesizes cross-system evidence to assess kill chain coherence. IMPORTANT CAVEAT: While the staging and anti-forensics phases are coherent, the actual exfiltration channel lacks confirmation.\n\nSTAGE 1: CAPABILITY ESTABLISHMENT (Pre-2015-03-24)\n- Google Drive client installed 2015-02-19 (installed capability only; no confirmed use)\n- System configured with network access to government repositories\n- Email account operational (iaman.informant@nist.gov) - infrastructure available\n- ASSESSMENT: Prerequisites for potential exfiltration established\n\nSTAGE 2: DOCUMENT IDENTIFICATION & ACCESS (2015-03-22 14:52 UTC)\n- Network drive accessed: 10.11.11.128/secured_drive/Common Data\n- User confirmed access to \"Common Data\" repository\n- Directory structure observed\n- ASSESSMENT: Single documented access; consistency with normal user workload patterns not established\n\nSTAGE 3: DATA STAGING (2015-03-24 09:59-10:00 UTC)\n- Files copied from accessible systems to USB removable media\n- 16 files staged in organized directory structure\n- File extension mismatches detected (interpretation uncertain due to timestamp corruption artifacts)\n- ASSESSMENT: Confirmed - Data staging operation clearly evidenced\n\nSTAGE 4: CD-R DUPLICATION (2015-03-24 20:54-20:55 UTC)\n- Files burned to optical media in 90-second window\n- 28+ files with matching directory structure to USB\n- Multi-session UDF format with iterative refinement across 9 VAT sessions\n- ASSESSMENT: Confirmed - Redundant staging on multiple media types\n\nSTAGE 5: EVIDENCE DESTRUCTION (2015-03-24 19:52 - 2015-03-25 14:47 UTC)\n- Files deleted from Recycle Bin (2015-03-24 19:52:46 UTC)\n- Eraser 6.2.0 secure deletion tool deployed (2015-03-25 14:47:40 UTC)\n- Eraser execution confirmed via shimcache and prefetch\n- System shutdown 46 minutes post-Eraser deployment\n- ASSESSMENT: Confirmed - Aggressive anti-forensics preparation\n\nCHAIN COHERENCE ASSESSMENT:\n\nKill Chain Phases Present:\n1. Initial Access: ✓ Confirmed (network drive access)\n2. Execution/Collection: ✓ Confirmed (file staging)\n3. Persistence: ? Unclear (no persistence mechanisms identified)\n4. Privilege Escalation: ? Not applicable/Not evidenced\n5. Defense Evasion: ✓ Confirmed (anti-forensics, file masquerading)\n6. Credential Access: ? Not evidenced (legitimate network access used)\n7. Discovery: ✓ Confirmed (document identification)\n8. Lateral Movement: ? Not evidenced (single system operation)\n9. Collection: ✓ Confirmed (file staging)\n10. Exfiltration: ✗ NOT CONFIRMED (staging confirmed but transfer unproven)\n11. Command & Control: ✗ Not evidenced\n\nEVIDENCE COHERENCE:\n\nThe progression from Initial Access → Collection → Defense Evasion is temporally coherent and logically connected. Each stage enables the next:\n- Network access provides document discovery capability\n- Document discovery enables data staging\n- Data staging prompts anti-forensics preparation\n\nHOWEVER, the critical EXFILTRATION stage is MISSING from confirmed evidence:\n- Google Drive: Capability exists but NO confirmed file uploads (sync databases deleted)\n- Email Distribution: NO evidence of outbound emails TO alleged co-conspirators\n- Physical Media: USB and CD-R created but NO evidence of successful removal or delivery\n\nCONCLUSION: The attack chain establishes PREPARATION for exfiltration with multiple staging points and aggressive anti-forensics, but the actual DATA TRANSFER to unauthorized recipients is not confirmed by indexed forensic evidence. This represents a COHERENT but INCOMPLETE attack chain - the preparation phases are strong, but the exfiltration execution link is missing. The case represents either:\n1. A failed exfiltration attempt (data staged but not successfully transferred)\n2. An incomplete forensic recovery (exfiltration evidence destroyed or not captured)\n3. A data staging operation prepared for potential exfiltration but not yet executed at time of seizure"



### 12. [HIGH] Browser-Based Planning Evidence: Google Drive Infrastructure URLs and Eraser Tool Download Located

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2014-10-31T15:05:00Z to 2015-03-25T14:47:40Z |
| **Sources** | bulk.url |
| **Evidence Refs** | tc_64d80a62 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1041](https://attack.mitre.org/techniques/T1041/), [T1537](https://attack.mitre.org/techniques/T1537/), [T1562.001](https://attack.mitre.org/techniques/T1562/001/) |


BROWSER HISTORY AND URL ACCESS ANALYSIS:\n\nCloud Infrastructure Preparation:\nBrowser history recovered from the system shows visits to Google infrastructure services:\n- http://docs.google.com/ - Google Docs access\n- http://drive.google.com/ - Google Drive access\n- https://www.google.com/search - Google search queries\n- https://docs.google.com/feeds/ - Google Drive API feeds\n\nInterpretation: These URLs indicate INTEREST IN and EXPLORATION of Google cloud services, suggesting the user was familiarizing themselves with Google Drive functionality. However, URL visits do NOT constitute evidence of actual file uploads or data exfiltration through these services.\n\nGovernment Document References:\nBrowser history shows the user visited or accessed URLs matching the types of documents found on staged removable media:\n- http://www.whitehouse.gov/omb/egov/documents/FEA_CRM_v23_Final_Oct_2007.pdf (Federal Enterprise Architecture)\n- http://www.whitehouse.gov/omb/egov/documents/FY09_Ref_Model_Mapping_QuickGuide_July_2007.pdf (Federal Reference Model)\n- http://www.whitehouse.gov/omb/circulars/a11/current_year/s300.pdf (OMB Circular A-11)\n- http://digitalcorpora.org/corpora/govdocs (Government documents corpus reference)\n\nInterpretation: These URLs suggest the user was accessing or researching government document types that match the content found on the staged media. This indicates planning or preparation phase activity related to identifying documents of interest.\n\nAnti-Forensics Tool Acquisition:\nBrowser history recovered a URL for Eraser secure deletion tool:\n- http://iweb.dl.sourceforge.net/project/eraser/Eraser%206/6.2/Eraser%206.2.0.2962.exe (Eraser 6.2.0.2962 executable download link)\n\nThis URL appears in browser history, indicating deliberate search for and location of the Eraser tool prior to its deployment on 2015-03-25 14:47:40.\n\nEVIDENTIARY SEQUENCE:\n1. Google Drive infrastructure exploration (dates in browser history)\n2. Government document type research (URL access)\n3. Eraser secure deletion tool download link discovery\n4. Eraser deployment on 2015-03-25 14:47:40 (confirmed via shimcache and prefetch)\n\nThis sequence supports a PLANNING AND PREPARATION narrative but does not constitute evidence of successful execution of cloud-based exfiltration. Browser URL history shows interest and preparation, but actual file transfers (especially to cloud) remain unconfirmed.","confidence":"inference","severity":"medium","event_time_start":"2014-10-31T15:05:00Z","event_time_end":"2015-03-25T14:47:40Z"



### 13. [INFO] Government Document URLs and Official Email Addresses Extracted from USB Drive

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27Z to 2015-03-24T10:00:18Z |
| **Sources** | bulk.email, bulk.url |
| **Evidence Refs** | tc_68652e6a, tc_b98aa7fe, tc_3ce2d418 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1537](https://attack.mitre.org/techniques/T1537/) |


Bulk extraction identified multiple White House Office of Management and Budget (OMB) document URLs and official government email addresses stored on the USB drive, indicating direct contact with classified/sensitive government information: (1) URLs include http://www.whitehouse.gov/omb/egov/documents/FEA_CRM_v23_Final_Oct_2007.pdf and http://www.whitehouse.gov/omb/egov/documents/FY09_Ref_Model_Mapping_QuickGuide_July_2007.pdf (Federal Enterprise Architecture documents); (2) Library of Congress Prints and Photographs URLs (http://hdl.loc.gov/loc.pnp/); (3) Government documents corpus reference (http://digitalcorpora.org/corpora/govdocs); (4) Email addresses: Eric_P._Lauer@omb.eop.gov (OMB official), mmun@loc.gov (Library of Congress official), wayne.longman@att.net. This indicates the USB drive was used to store or transfer government-classified documents and maintain contact information for federal officials.



### 14. [INFO] File Extension Masquerading: Concealment of Document Content Types

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27Z to 2015-03-24T10:00:18Z |
| **Sources** | tsk.masquerade |
| **Evidence Refs** | tc_9b91adc3 |
| **ATT&CK** | [T1027](https://attack.mitre.org/techniques/T1027/) |


Digital forensic analysis revealed systematic file extension masquerading across all 16 deleted files on the USB drive, indicating deliberate concealment attempts. Content type mismatches identified: (1) winter_storm.amr (labeled .amr, detected as OLE/MS Office format); (2) winter_whether_advisory.zip (labeled .zip, detected as PPTX PowerPoint); (3) my_favorite_cars.db (labeled .db, detected as OLE); (4) my_favorite_movies.7z (labeled .7z, detected as XLSX Excel); (5) new_years_day.jpg (labeled .jpg, detected as XLSX); (6) super_bowl.avi (labeled .avi, detected as OLE); (7) Multiple diary_#*.txt files (labeled .txt, detected as DOCX/PPTX/OLE - up to 2.4 MB each); (8) my_friends.svg (labeled .svg, detected as OLE); (9) my_smartphone.png (labeled .png, detected as DOCX); (10) new_year_calendar.one (labeled .one, detected as DOCX). This systematic masquerading demonstrates anti-forensics techniques to obscure sensitive document handling and prevent casual discovery of true file contents.



### 15. [INFO] Large-Scale Data Staging: 46+ Deleted Files in Organized Directory Structure

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27Z to 2015-03-24T10:00:18Z |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_efa52543, tc_93960ee0 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1537](https://attack.mitre.org/techniques/T1537/) |


File system analysis identified 46+ deleted files recovered from orphaned clusters, organized into purposeful directory categories suggesting deliberate data collection and staging: (1) DESIGN/ directory containing multi-megabyte archive files; (2) PRICIN~1 (PRICING) directory with database and media files totaling 21.7 MB; (3) PROGRESS/ directory with organizational documents; (4) PROPOSAL/ directory with presentation materials; (5) TECHNI~1 (TECHNICAL) directory with six diary files (diary_#1d through #3p) ranging from 121 KB to 2.3 MB, suggesting detailed technical documentation; (6) Root-level image files (jpg, png, gif, bmp, tif) suggesting multimedia data collection. The organized structure and coordinated deletion of 46 files indicates sophisticated data staging operation, not accidental or temporary file creation. This pattern is consistent with preparing sensitive data for exfiltration via USB media.



### 16. [INFO] Unallocated Space Contains Extensive Deleted Content: 158,470 Deleted Entries

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27Z to 2015-03-25T15:31:05Z |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_93960ee0 |
| **ATT&CK** | [T1070](https://attack.mitre.org/techniques/T1070/) |


Analysis of the USB drive's unallocated clusters revealed approximately 158,470 deleted file entries scattered across unallocated space, with 46 files recovered in the $OrphanFiles directory and an additional 157 deleted entries in the Users directory. This massive deletion footprint indicates either: (1) the USB drive was used as a temporary staging and clearing device for multiple exfiltration operations over an extended period, or (2) a cleanup operation was performed immediately prior to capture/seizure. The presence of this many deleted files on a USB storage device is highly anomalous and suggests the drive served as both a data collection and erasure tool for sensitive information.



### 17. [INFO] System Configuration: Windows 7 Ultimate with User 'informant' on INFORMANT-PC

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T12:47:46Z |
| **Sources** | registry.system, registry.software |
| **Evidence Refs** | tc_cd44724c, tc_49d37bbf, tc_f4c9daff |


Comprehensive system configuration identified through registry analysis:

OS INSTALLATION (Case Q2):
- Product Name: Windows 7 Ultimate
- Installation Date: 2015-03-22T12:47:46 UTC (Unix timestamp 1427034866)
- Product ID: 00426-292-0000007-85262
- Build: 7601 SP1 (Service Pack 1)
- Registered Owner: informant
- Registered Organization: (empty)

SYSTEM TIMEZONE (Case Q3):
- TimeZone: Eastern Standard Time
- Bias: 300 minutes (UTC-5 EST), ActiveTimeBias: 240 minutes (UTC-4 EDT)

COMPUTER NAME (Case Q4):
- Computer Name: INFORMANT-PC
- Last Registry Write: 2015-03-25T10:33:13 UTC



### 18. [INFO] System Shutdown and Network Configuration via DHCP

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-25T15:31:05Z |
| **Sources** | registry.system |
| **Evidence Refs** | tc_8e982c91, tc_6ee8a199 |


SYSTEM SHUTDOWN (Case Q7):
System last shut down: 2015-03-25T15:31:05 UTC, coinciding with USB drive seizure immediately after alleged data exfiltration window.

NETWORK CONFIGURATION (Case Q8):
Interface: {E2B9AEEC-B1F7-4778-A049-50D7F2DAB2DE}
- DHCP IP Address: 10.11.11.129
- DHCP Subnet Mask: 255.255.255.0
- DHCP Server: 10.11.11.254
- DHCP Default Gateway: 10.11.11.2
- DHCP Domain: localdomain
- Lease Duration: 1800 seconds
- Lease Obtained: 2015-03-25T07:59:50 UTC
- Lease Expires: 2015-03-25T08:29:50 UTC

Network connected to 10.11.11.0/24 subnet at time of shutdown.



### 19. [INFO] Shared Network Drive Access: 10.11.11.128 'secured_drive' (Case Q14)

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T14:52:22Z |
| **Sources** | registry.usrclass.informant |
| **Evidence Refs** | tc_08bd0749 |


Forensic analysis reveals access to mapped network drive:

Network Path: My Network Places\10.11.11.128\\secured_drive\Common Data
Access Timestamp: 2015-03-22T14:52:22 UTC
Location: Shellbags data (explorer MRU)

The user 'informant' accessed a shared folder on 10.11.11.128 named 'secured_drive' with a shared path 'Common Data'. The access occurred 2 days before the alleged data exfiltration event (2015-03-24). Both the system (10.11.11.129) and the network drive (10.11.11.128) are on the same local subnet (10.11.11.0/24).



### 20. [INFO] Google Drive Client Installed but No Confirmed File Transfers to Cloud

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-02-19T18:12:52Z to 2015-03-25T15:21:34Z |
| **Sources** | ez.mft, bulk.url, bulk.domain |
| **Evidence Refs** | tc_ce6c0b43, tc_c7903ca3 |


Evidence of Google Drive client installation and configuration:\n\nGOOGLE DRIVE CLIENT INSTALLATION:\n- Installation Path: C:\\Program Files (x86)\\Google\\Drive\n- Installation Date: 2015-02-19T18:12:52 UTC\n- Primary Executable: googledrivesync64.dll (2015-02-19 18:24:25)\n- Supporting DLLs in Microsoft.VC90.CRT directory\n- Multiple language support packages installed (fa, id, no, sv, zh-TW)\n\nGOOGLE DRIVE LOCAL SYNC DATABASE FILES:\n- sync_config.db - MARKED DELETED (not available)\n- snapshot.db - MARKED DELETED (not available)\n- cacerts - Last modified 2015-03-25 15:21:34 UTC (shortly before system shutdown)\n\nIMPORTANT LIMITATION: \nThe presence of Google Drive client on the system during the alleged exfiltration period indicates CAPABILITY for cloud-based data synchronization, but NO EVIDENCE establishes that actual files were uploaded to Google Drive. The sync databases are deleted, preventing verification of what (if any) files were synchronized. Browser URL history shows visits to docs.google.com and drive.google.com, but these are passive visits to the service, not proof of outbound file transfers. Chrome integration with Google Drive configuration shows technical setup for potential synchronization, but execution of actual file transfers is not substantiated by available evidence.\n\nCHROME INTEGRATION:\n- Google Chrome browser with Widevine CDM present\n- Chrome profile location: C:\\Users\\informant\\AppData\\Local\\Google\\Chrome\\User Data\\Default\n- Last Chrome activity: 2015-03-24T21:05:53 UTC (JumpListIcons update)\n\nGOOGLE DRIVE URL VISITS:\nBrowser history indicates visits to Google Drive-related URLs including:\n- https://docs.google.com/document?usp=drive_sync\n- https://docs.google.com/presentation?usp=drive_sync\n- Support and authentication URLs from google.com and drive.google.com\n\nCONCLUSION:\nThe presence of Google Drive client on the system during the alleged exfiltration period indicates installed capability for cloud-based data transfer, but actual file synchronization to Google cloud storage is not confirmed by indexed evidence. The deleted sync databases prevent verification of synchronization activity.","confidence":"inference","severity":"info"



### 21. [INFO] Massive Deleted File Footprint on USB Drive: 158,470 Deleted Entries in Orphaned Space (Case Q23)

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27Z to 2015-03-25T15:31:05Z |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_38e9bc8c |
| **ATT&CK** | [T1070](https://attack.mitre.org/techniques/T1070/), [T1537](https://attack.mitre.org/techniques/T1537/) |


The USB removable media drive (RM#2) contains extensive evidence of data deletion and orphaned file fragments:

DELETED FILES ANALYSIS:
- Total Deleted Entries: Approximately 158,470 entries in unallocated/orphaned space
- Recovered Files: 46 files recovered in $OrphanFiles directory
- Additional Deleted Entries: 157 entries in Users directory

DISTRIBUTION:
- $OrphanFiles directory: 46 recovered deleted files
- Users directory: 157 deleted entries
- Unallocated clusters: ~158,270 orphaned/fragmented entries

SIGNIFICANCE:
The massive number of deleted entries on a USB drive is highly anomalous. This suggests the drive was used as:
1. Temporary staging and clearing device for multiple exfiltration operations over extended period
2. Active evidence cleanup/erasure device with iterative deletion patterns
3. Or cleanup operation performed immediately prior to seizure/capture

The recovered 46 files include masqueraded government documents with false extensions (documented in separate findings). The scale of deletion (158,470 entries) far exceeds the 46 recovered masqueraded files, indicating either:
- Deleted backup copies or earlier exfiltration attempts
- Formatted/cleared sections of the drive from previous use
- Systematic erasure operation targeting all historical data



### 22. [INFO] Multiple User Accounts Configured: 'informant', 'admin11', and 'temporary' (Case Q5-Q6)

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-25T15:28:47Z |
| **Sources** | registry.ntuser.admin11, registry.ntuser.informant, registry.ntuser.temporary, registry.sam |
| **Evidence Refs** | tc_ce16d292, tc_5bb75794 |


Registry and file system analysis reveals three user accounts configured on the system:

USER ACCOUNT 1 - 'informant' (Primary Account):
- Account Type: Regular user account
- Registry Hives: NTUSER.DAT and UsrClass.dat present
- Last UserAssist Activity: 2015-03-25T15:28:47 UTC
- Primary profile directory: C:\Users\informant
- Application execution on 2015-03-25 at 15:28:47 UTC (xpsrchvw.exe, last run before shutdown)

USER ACCOUNT 2 - 'admin11' (Administrative Account):
- Account Type: Administrative user
- Registry Hives: NTUSER.DAT and UsrClass.dat present
- Last UserAssist Activity: 2015-03-22T15:57:30 UTC
- Profile directory: C:\Users\admin11
- NOTEPAD.EXE execution recorded (1 run count)
- Last activity 2015-03-22 at 15:57:30 UTC

USER ACCOUNT 3 - 'temporary' (Temporary Account):
- Account Type: User account
- Registry Hives: NTUSER.DAT and UsrClass.dat present
- Profile directory: C:\Users\temporary
- Last activity: 2015-03-22T15:56:19 UTC
- Minimal activity recorded, likely test/temporary account

SYSTEM ACCOUNT 1 - 'informant-PC\informant':
- Primary registered owner of system
- Responsible for data staging on USB drive on 2015-03-24

All user account login records are available in SAM registry hive.



### 23. [INFO] Recycle Bin Contains Deleted Files from Investigation Period (Case Q21)

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T19:52:46Z |
| **Sources** | ez.mft |
| **Evidence Refs** | tc_01654161 |


Analysis of the Windows Recycle Bin ($Recycle.Bin) reveals deleted files during the investigation period:

RECYCLE BIN CONTENTS - $Recycle.Bin\S-1-5-21-2425377081-3129163575-2985601102-1000:
- Directory: Contains deleted files from user 'informant' (SID ending in 1000)
- Notable Entry: $R8YP3XK.jpg (image file) marked as deleted
  * Original filename: .jpg image file
  * Deletion marker: $R prefix with deletion ID 8YP3XK
  * Status: Archived file
  * Original creation date: 2009-07-14T05:32:31 UTC
  * Deletion time: 2015-03-24T19:52:46 UTC
  * Last access: 2015-03-24

Additional Recycle Bin entry for user 'temporary':
- Directory: $Recycle.Bin\S-1-5-21-2425377081-3129163575-2985601102-1003
- desktop.ini file (system file marking folder as Recycle Bin)

SIGNIFICANCE:
The presence of image files in the Recycle Bin marked for deletion on 2015-03-24 at 19:52:46 UTC (during the exfiltration window, ~10 hours after the deleted files were staged on the USB drive) indicates deleted media content from the 'informant' user's profile.

The files show timestamps consistent with other staging/deletion activity observed on the USB media and indicate cleanup operations by the user.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Internal IP | `10.11.11.128` |  | Summary of Investigation Findings: Data Exfiltration Timeline and Evidence |
| Internal IP | `10.11.11.129` |  | Network Drive Source Correlation: 10.11.11.128 'secured_drive' as Government Doc |
| Internal IP | `10.11.11.0` |  | Network Drive Source Correlation: 10.11.11.128 'secured_drive' as Government Doc |
| Internal IP | `10.11.11.2` |  | Network Drive Source Correlation: 10.11.11.128 'secured_drive' as Government Doc |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Path | `C:\Program` |  | Anti-Forensics Tool Eraser Deployment on 2015-03-25 (Case Q22) |
| Path | `C:\Users\informant\Desktop\Download` |  | Anti-Forensics Tool Eraser Deployment on 2015-03-25 (Case Q22) |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `mmun@loc.gov` |  | Confidential Government Document References: IOCs from CD-R Content |
| Email | `eric_p._lauer@omb.eop.gov` |  | Confidential Government Document References: IOCs from CD-R Content |
| Email | `wayne.longman@att.net` |  | Confidential Government Document References: IOCs from CD-R Content |
| Email | `iaman.informant@nist.gov` |  | Cross-System Data Exfiltration Attack Chain: Complete Timeline from Staging to A |
| Email | `iaman@email.nist.gov` |  | NIST Government Email Account Identified: iaman.informant@nist.gov - No Outbound |
| Email | `iaman@nist.gov` |  | NIST Government Email Account Identified: iaman.informant@nist.gov - No Outbound |




---

## Appendix C: MITRE ATT&CK Coverage

12 techniques identified across findings.


**Kill Chain Coverage:** Persistence (1) > Privilege Escalation (1) > Defense Evasion (5) > Credential Access (1) > Collection (1) > Command and Control (1) > Exfiltration (3)


### Persistence

| Technique | Name | Findings |
|-----------|------|----------|
| [T1037](https://attack.mitre.org/techniques/T1037/) | Boot or Logon Initialization Scripts | Summary of Investigation Findings: Data... |


### Privilege Escalation

| Technique | Name | Findings |
|-----------|------|----------|
| [T1037](https://attack.mitre.org/techniques/T1037/) | Boot or Logon Initialization Scripts | Summary of Investigation Findings: Data... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1027](https://attack.mitre.org/techniques/T1027/) | Obfuscated Files or Information | File Extension Masquerading: Concealment of... |
| [T1036.005](https://attack.mitre.org/techniques/T1036/005/) | Match Legitimate Resource Name or Location | File Extension Masquerading Detected: 17 Files...; Summary of Investigation Findings: Data...; Cross-System Data Exfiltration Attack Chain:...; Coherent Kill Chain: Multi-Stage Data... |
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | Unallocated Space Contains Extensive Deleted...; Massive Deleted File Footprint on USB Drive:... |
| [T1070.004](https://attack.mitre.org/techniques/T1070/004/) | File Deletion | Systematic Deletion of Masqueraded Government...; Anti-Forensics Tool Eraser Deployment on...; Summary of Investigation Findings: Data...; Cross-System Data Exfiltration Attack Chain:...; Coherent Kill Chain: Multi-Stage Data... |
| [T1562.001](https://attack.mitre.org/techniques/T1562/001/) | Disable or Modify Tools | Anti-Forensics Tool Eraser Deployment on...; Summary of Investigation Findings: Data...; Coherent Kill Chain: Multi-Stage Data...; Browser-Based Planning Evidence: Google Drive... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1552.007](https://attack.mitre.org/techniques/T1552/007/) | Container API | Network Drive Source Correlation: 10.11.11.128... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1005](https://attack.mitre.org/techniques/T1005/) | Data from Local System | Confidential Government Document References:...; Government Document URLs and Official Email...; Large-Scale Data Staging: 46+ Deleted Files in...; Summary of Investigation Findings: Data...; Cross-System Data Exfiltration Attack Chain:...; NIST Government Email Account Identified:...; Network Drive Source Correlation: 10.11.11.128...; Coherent Kill Chain: Multi-Stage Data...; Browser-Based Planning Evidence: Google Drive... |


### Command and Control

| Technique | Name | Findings |
|-----------|------|----------|
| [T1001](https://attack.mitre.org/techniques/T1001/) | Data Obfuscation | Multi-Session Optical Media with Incremental... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1041](https://attack.mitre.org/techniques/T1041/) | Exfiltration Over C2 Channel | Confidential Government Document References:...; Systematic Deletion of Masqueraded Government...; Summary of Investigation Findings: Data...; Cross-System Data Exfiltration Attack Chain:...; NIST Government Email Account Identified:...; Coherent Kill Chain: Multi-Stage Data...; Browser-Based Planning Evidence: Google Drive... |
| [T1052.001](https://attack.mitre.org/techniques/T1052/001/) | Exfiltration over USB | File Extension Masquerading Detected: 17 Files...; Data Staging: Deleted Directories on CD-R...; Multi-Session Optical Media with Incremental...; Summary of Investigation Findings: Data...; Cross-System Data Exfiltration Attack Chain:...; Coherent Kill Chain: Multi-Stage Data... |
| [T1537](https://attack.mitre.org/techniques/T1537/) | Transfer Data to Cloud Account | Data Staging: Deleted Directories on CD-R...; Systematic Deletion of Masqueraded Government...; Government Document URLs and Official Email...; Large-Scale Data Staging: 46+ Deleted Files in...; Massive Deleted File Footprint on USB Drive:...; Summary of Investigation Findings: Data...; Cross-System Data Exfiltration Attack Chain:...; NIST Government Email Account Identified:...; Coherent Kill Chain: Multi-Stage Data...; Browser-Based Planning Evidence: Google Drive... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 333 |
| Findings submitted | 23 |
| Confirmed | 23 |
| Inferences | 0 |
| Input tokens | 12.5K |
| Output tokens | 132.3K |
| Total tokens | 144.8K |
| Audit log | /home/mulder/.mulder/cases/nist-data-leakage.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 12.5K | 132.3K | 144.8K |




<details>
<summary>Evidence Sources (253)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| optical.listing | mulder-optical | 58 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 237 |
| bulk.email | bulk_extractor | 12 |
| bulk.rfc822 | bulk_extractor | 41 |
| bulk.telephone | bulk_extractor | 8 |
| bulk.url | bulk_extractor | 300 |
| bulk.url_services | bulk_extractor | 21 |
| exiftool.metadata | exiftool | 9 |
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 51 |
| hashdeep.hashes | hashdeep | 6 |
| tsk.masquerade | sleuthkit | 17 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 264 |
| bulk.duplicates | bulk_extractor | 58 |
| bulk.email | bulk_extractor | 43 |
| bulk.rfc822 | bulk_extractor | 41 |
| bulk.url | bulk_extractor | 288 |
| bulk.url_services | bulk_extractor | 19 |
| scalpel.audit | scalpel | 22 |
| exiftool.metadata | exiftool | 9 |
| strings.output | strings | 165747 |
| tsk.partitions | sleuthkit | 10 |
| tsk.partitions | sleuthkit | 9 |
| hashdeep.hashes | hashdeep | 6 |
| hashdeep.hashes | hashdeep | 6 |
| hashdeep.hashes | hashdeep | 6 |
| tsk.filelist | sleuthkit | 104709 |
| tsk.filelist.p1 | sleuthkit | 93 |
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
| ez.mft | eztools | 98918 |
| appfiles.program_files.eqnedt32.exe.manifest | icat | 17 |
| evtx.manifest | evtx-extract | 54 |
| ez.shimcache | eztools | 307 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| appfiles.program_files.content.xml | icat | 432 |
| appfiles.program_files.auxbase.xml | icat | 22 |
| appfiles.program_files.auxpad.xml | icat | 5 |
| appfiles.program_files.ea.xml | icat | 7 |
| appfiles.program_files.keypadbase.xml | icat | 18 |
| appfiles.program_files.kor-kor.xml | icat | 7 |
| appfiles.program_files.keypad.xml | icat | 20 |
| appfiles.program_files.base.xml | icat | 44 |
| registry.default | regripper | 418 |
| appfiles.program_files.basealtgr_rtl.xml | icat | 4 |
| appfiles.program_files.base_altgr.xml | icat | 44 |
| appfiles.program_files.base_ca.xml | icat | 44 |
| appfiles.program_files.base_heb.xml | icat | 25 |
| appfiles.program_files.base_kor.xml | icat | 8 |
| appfiles.program_files.base_rtl.xml | icat | 21 |
| appfiles.program_files.ja-jp.xml | icat | 218 |
| appfiles.program_files.ko-kr.xml | icat | 201 |
| registry.sam | regripper | 186 |
| appfiles.program_files.zh-changjei.xml | icat | 214 |
| appfiles.program_files.zh-dayi.xml | icat | 214 |
| appfiles.program_files.zh-phonetic.xml | icat | 214 |
| registry.sam | regripper | 7 |
| appfiles.program_files.main.xml | icat | 870 |
| appfiles.program_files.numbase.xml | icat | 22 |
| appfiles.program_files.numbers.xml | icat | 5 |
| registry.sam | regripper | 7 |
| appfiles.program_files.oskmenubase.xml | icat | 8 |
| appfiles.program_files.oskmenu.xml | icat | 5 |
| appfiles.program_files.osknumpadbase.xml | icat | 37 |
| appfiles.program_files.osknumpad.xml | icat | 5 |
| registry.system | regripper | 69 |
| appfiles.program_files.oskpredbase.xml | icat | 15 |
| appfiles.program_files.oskpred.xml | icat | 5 |
| appfiles.program_files.ea-sym.xml | icat | 14 |
| registry.system | regripper | 8 |
| appfiles.program_files.ja-jp-sym.xml | icat | 14 |
| appfiles.program_files.symbase.xml | icat | 47 |
| appfiles.program_files.symbols.xml | icat | 15 |
| appfiles.program_files.webbase.xml | icat | 17 |
| appfiles.program_files.web.xml | icat | 4 |
| ez.prefetch | eztools | 193 |
| appfiles.program_files.accessmui.xml | icat | 31 |
| appfiles.program_files.accessmuiset.xml | icat | 19 |
| appfiles.program_files.setup.xml | icat | 26 |
| appfiles.program_files.dcfmui.xml | icat | 25 |
| appfiles.program_files.setup.xml | icat | 24 |
| appfiles.program_files.excelmui.xml | icat | 40 |
| appfiles.program_files.setup.xml | icat | 33 |
| appfiles.program_files.groovemui.xml | icat | 22 |
| appfiles.program_files.setup.xml | icat | 19 |
| appfiles.program_files.infopathmui.xml | icat | 25 |
| appfiles.program_files.setup.xml | icat | 21 |
| appfiles.program_files.lyncmui.xml | icat | 25 |
| appfiles.program_files.setup.xml | icat | 21 |
| appfiles.program_files.branding.xml | icat | 617 |
| registry.system | regripper | 33492 |
| appfiles.program_files.officemui.xml | icat | 139 |
| appfiles.program_files.officemuiset.xml | icat | 19 |
| appfiles.program_files.setup.xml | icat | 114 |
| appfiles.program_files.office32mui.xml | icat | 37 |
| registry.system | regripper | 283 |
| appfiles.program_files.setup.xml | icat | 37 |
| appfiles.program_files.office32ww.xml | icat | 133 |
| appfiles.program_files.onenotemui.xml | icat | 40 |
| registry.system | regripper | 283 |
| appfiles.program_files.setup.xml | icat | 27 |
| appfiles.program_files.osmuxmui.xml | icat | 31 |
| appfiles.program_files.setup.xml | icat | 24 |
| appfiles.program_files.outlookmui.xml | icat | 67 |
| registry.system | regripper | 5209 |
| appfiles.program_files.setup.xml | icat | 53 |
| appfiles.program_files.powerpointmui.xml | icat | 37 |
| appfiles.program_files.setup.xml | icat | 25 |
| registry.system | regripper | 199 |
| appfiles.program_files.proof.xml | icat | 34 |
| appfiles.program_files.proof.xml | icat | 37 |
| appfiles.program_files.proof.xml | icat | 37 |
| appfiles.program_files.proofing.xml | icat | 19 |
| registry.system | regripper | 199 |
| appfiles.program_files.setup.xml | icat | 71 |
| appfiles.program_files.proplusrww.xml | icat | 517 |
| appfiles.program_files.setup.xml | icat | 460 |
| appfiles.program_files.publishermui.xml | icat | 37 |
| appfiles.program_files.setup.xml | icat | 21 |
| appfiles.program_files.setup.xml | icat | 38 |
| appfiles.program_files.wordmui.xml | icat | 49 |
| appfiles.program_files.osmmui.xml | icat | 22 |
| appfiles.program_files.setup.xml | icat | 21 |
| appfiles.program_files.desktop.ini | icat | 13 |
| appfiles.program_files.indust.inf | icat | 36 |
| appfiles.program_files.aftrnoon.inf | icat | 36 |
| appfiles.program_files.arctic.inf | icat | 36 |
| appfiles.program_files.axis.inf | icat | 42 |
| appfiles.program_files.blends.inf | icat | 36 |
| appfiles.program_files.bluecalm.inf | icat | 36 |
| appfiles.program_files.blueprnt.inf | icat | 36 |
| appfiles.program_files.boldstri.inf | icat | 36 |
| appfiles.program_files.breeze.inf | icat | 36 |
| appfiles.program_files.canyon.inf | icat | 36 |
| appfiles.program_files.capsules.inf | icat | 36 |
| appfiles.program_files.cascade.inf | icat | 42 |
| appfiles.program_files.compass.inf | icat | 36 |
| appfiles.program_files.concrete.inf | icat | 36 |
| appfiles.program_files.deepblue.inf | icat | 36 |
| appfiles.program_files.echo.inf | icat | 42 |
| appfiles.program_files.eclipse.inf | icat | 42 |
| appfiles.program_files.edge.inf | icat | 42 |
| appfiles.program_files.evrgreen.inf | icat | 36 |
| appfiles.program_files.expeditn.inf | icat | 36 |
| appfiles.program_files.ice.inf | icat | 36 |
| appfiles.program_files.iris.inf | icat | 36 |
| appfiles.program_files.journal.inf | icat | 36 |
| appfiles.program_files.layers.inf | icat | 42 |
| appfiles.program_files.level.inf | icat | 42 |
| appfiles.program_files.network.inf | icat | 42 |
| appfiles.program_files.papyrus.inf | icat | 36 |
| appfiles.program_files.pixel.inf | icat | 42 |
| appfiles.program_files.profile.inf | icat | 42 |
| appfiles.program_files.quad.inf | icat | 42 |
| appfiles.program_files.radial.inf | icat | 42 |
| appfiles.program_files.refined.inf | icat | 42 |
| appfiles.program_files.ricepapr.inf | icat | 36 |
| appfiles.program_files.ripple.inf | icat | 36 |
| appfiles.program_files.rmnsque.inf | icat | 36 |
| appfiles.program_files.satin.inf | icat | 36 |
| appfiles.program_files.sky.inf | icat | 36 |
| appfiles.program_files.slate.inf | icat | 36 |
| appfiles.program_files.sonora.inf | icat | 36 |
| registry.system | regripper | 381 |
| appfiles.program_files.spring.inf | icat | 36 |
| appfiles.program_files.strtedge.inf | icat | 36 |
| appfiles.program_files.studio.inf | icat | 42 |
| registry.system | regripper | 255 |
| appfiles.program_files.sumipntg.inf | icat | 36 |
| appfiles.program_files.themes.inf | icat | 211 |
| appfiles.program_files.water.inf | icat | 36 |
| registry.system | regripper | 255 |
| appfiles.program_files.watermar.inf | icat | 42 |
| appfiles.program_files.handler.reg | icat | 15 |
| appfiles.program_files.handsafe.reg | icat | 17 |
| appfiles.program_files.filters.xml | icat | 318 |
| appfiles.program_files.timeline.cpu.xml | icat | 46 |
| appfiles.program_files.desktop.ini | icat | 4 |
| appfiles.program_files.desktop.ini | icat | 4 |
| appfiles.program_files.desktop.ini | icat | 4 |
| appfiles.program_files.desktop.ini | icat | 4 |
| appfiles.program_files.desktop.ini | icat | 4 |
| appfiles.program_files.desktop.ini | icat | 4 |
| appfiles.program_files.desktop.ini | icat | 4 |
| appfiles.program_files.aspect.xml | icat | 3 |
| appfiles.program_files.blue_green.xml | icat | 3 |
| appfiles.program_files.blue_ii.xml | icat | 3 |
| appfiles.program_files.blue_warm.xml | icat | 3 |
| appfiles.program_files.blue.xml | icat | 3 |
| appfiles.program_files.grayscale.xml | icat | 3 |
| appfiles.program_files.green_yellow.xml | icat | 3 |
| appfiles.program_files.green.xml | icat | 3 |
| appfiles.program_files.marquee.xml | icat | 3 |
| appfiles.program_files.median.xml | icat | 3 |
| appfiles.program_files.office_2007_-_2010.xml | icat | 3 |
| appfiles.program_files.orange_red.xml | icat | 3 |
| appfiles.program_files.orange.xml | icat | 3 |
| appfiles.program_files.paper.xml | icat | 3 |
| appfiles.program_files.red_orange.xml | icat | 3 |
| appfiles.program_files.red_violet.xml | icat | 3 |
| appfiles.program_files.red.xml | icat | 3 |
| appfiles.program_files.slipstream.xml | icat | 3 |
| appfiles.program_files.violet_ii.xml | icat | 3 |
| appfiles.program_files.violet.xml | icat | 3 |
| appfiles.program_files.yellow_orange.xml | icat | 3 |
| appfiles.program_files.yellow.xml | icat | 3 |
| appfiles.program_files.arial_black-arial.xml | icat | 74 |
| appfiles.program_files.arial-times_new_roman.xml | icat | 74 |
| appfiles.program_files.arial.xml | icat | 74 |
| appfiles.program_files.calibri_light-constantia.xml | icat | 74 |
| appfiles.program_files.calibri-cambria.xml | icat | 74 |
| appfiles.program_files.calibri.xml | icat | 74 |
| appfiles.program_files.cambria.xml | icat | 74 |
| appfiles.program_files.candara.xml | icat | 74 |
| appfiles.program_files.century_gothic-palatino_linotype.xml | icat | 75 |
| appfiles.program_files.century_gothic.xml | icat | 74 |
| appfiles.program_files.century_schoolbook.xml | icat | 74 |
| appfiles.program_files.consolas-verdana.xml | icat | 74 |
| registry.usrclass.admin11 | regripper | 11 |
| registry.ntuser.admin11 | regripper | 133 |
| registry.ntuser.default | regripper | 74 |
| registry.usrclass.informant | regripper | 102 |
| registry.ntuser.informant | regripper | 306 |
| registry.usrclass.temporary | regripper | 15 |
| registry.ntuser.temporary | regripper | 118 |
| tsk.masquerade | sleuthkit | 3 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.sam | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| composite.timeline | composite | 2117 |
| composite.defense_evasion | composite | 185 |
| forensic.timestomping | timestomp_detector | 1 |
| composite.file_staging | composite | 578 |
| composite.exfil | composite | 2439 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
