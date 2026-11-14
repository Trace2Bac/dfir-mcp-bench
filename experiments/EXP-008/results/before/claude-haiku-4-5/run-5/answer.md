# Mulder Investigation Report

**Case:** nist-data-leakage
**Generated:** 2026-11-13T19:13:19.837752+00:00
**Evidence:** /evidence/nist-data-leakage

---

## Executive Summary

**Scope:** 92 evidence sources (42 disk, 50 other) | 365 tool calls | 27 minutes
**Results:** 22 findings (5 critical, 12 high) | 19 confirmed, 3 inference
**Timeline:** 2015-01-05 to 2015-03-25

**Key Threats:**
- Optical Media (CD) Contains Benign Image Files at Seizure; Masqueraded Documents Were Deleted
- Sensitive Government Email Addresses and OMB Documents on Exfiltration Media
- Financial Data (Credit Card Number) in Exfiltrated Files
- Complete Attack Chain: Data Exfiltration from Networked Systems to Removable Media
- Suspected Data Exfiltration to External Entity via DNS and Email Communication

**Attack Lifecycle:**
- **Initial Access / Deployment** (2015-01-05 to 2015-03-25): 17 Confidential Documents Hidden via Content-Extension Masquerading on USB Stick (+10 related)
- **Lateral Movement** (2015-01-05): Files with False Extensions Concealing True Content (Masquerading)
- **Command and Control** (2015-01-05 to 2015-03-24): Suspected Data Exfiltration to External Entity via DNS and Email Communication (+1 related)
- **Defense Evasion / Anti-Forensics** (2015-01-05 to 2015-03-24): Financial Data and Email Evidence on USB Stick Suggest Coordination with External Parties (+2 related)
- **Discovery / Collection** (2015-01-05 to 2015-03-24): Government Document References Suggest Possible Inside Access to Sensitive Information (+1 related)
- **Other Activity** (2015-03-24): Recycle Bin Contents with Original Paths and Deletion Times (Q21)

**Tools:** search (104), get_raw_output (41), submit_finding (28), open_case (18), get_investigation_summary (16). SHA-256 hashes recorded for all evidence.


### Critical Findings


- **Optical Media (CD) Contains Benign Image Files at Seizure; Masqueraded Documents Were Deleted** (2015-01-05T15:15:08Z to 2015-03-24T20:57:03)


- **Sensitive Government Email Addresses and OMB Documents on Exfiltration Media** (2015-03-24T05:32:31Z to 2015-03-24T05:32:31Z)


- **Financial Data (Credit Card Number) in Exfiltrated Files** (2015-01-05T15:15:08Z to 2015-03-24T10:00:18Z)


- **Complete Attack Chain: Data Exfiltration from Networked Systems to Removable Media** (2015-03-22T14:52:22Z to 2015-03-25T15:31:05Z)


- **Suspected Data Exfiltration to External Entity via DNS and Email Communication** (2015-01-05T15:15:08Z to 2015-03-24T10:00:18Z)




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

365 tool calls were executed across 16
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative: Data Leakage Incident - NIST CASE

## Background

This forensic investigation concerns a deliberate data exfiltration operation conducted by a manager within the technology development division of a major international corporation (OOO). On March 25, 2015, the suspect (referred to as "Informant") was detected attempting to remove unauthorized storage devices from company facilities. Following interception at the security checkpoint, two removable media devices were seized: a USB memory stick (rm2.E01) and a CD-R optical disc (rm3.E01). A forensic image of the suspect's workstation (pc.E01) was also acquired for analysis.

The suspect, who held significant IT authority and possessed knowledge of digital forensics, had allegedly been negotiating with a rival company representative ("Mr. Conspirator") to sell sensitive company intellectual property and technical data. The data leakage scheme was intentionally designed to evade detection through sophisticated staging mechanisms, file manipulation, and deliberate evidence destruction.

### Evidence Inventory and System Environment

**Evidence Images:**
- pc.E01 (segments pc.E01 to pc.E04): Windows 7 Ultimate workstation, 64-bit, Build 7601 SP1, installed March 22, 2015
- rm2.E01: USB memory stick (SanDisk Cruzer Fit)
- rm3.E01: CD-R optical media, write-once, labeled "IAMAN CD"

**System Configuration:**
- Computer Name: INFORMANT-PC
- Registered Owner: informant
- Timezone: Eastern Time (UTC-5 standard, UTC-4 daylight)
- Network Interface: Intel PRO/1000 MT, assigned IP 10.11.11.129 via DHCP (server: 10.11.11.254)
- Last Shutdown: 2015-03-25 15:31:05 UTC

**Evidence Integrity Verification:**
All three evidence images have been cryptographically verified with matching MD5 and SHA-1 hashes between acquisition and recomputation:
- pc.E01: MD5 a49d1254c873808c58e6f1bcd60b5bde, SHA-1 afe5c9ab487bd47a8a9856b1371c2384d44fd785
- rm2.E01: MD5 b4644902acab4583a1d0f9f1a08faa77, SHA-1 048961a85ca3eced8cc73f1517442d31d4dca0a3
- rm3.E01: MD5 df914108fb3d86744eb688eba482fbdf, SHA-1 7f3c2eb1f1e2db97be6e963625402a0e362a532c

## Incident Timeline

### Phase 1: Preparation and Data Access (March 22-24, 2015)

The Windows 7 operating system was freshly installed on March 22, 2015 at 14:34:26 UTC. This recent installation on the suspect's workstation suggests deliberate preparation for the exfiltration operation, providing a clean system with minimal residual artifacts.

Immediately following OS installation, Microsoft Office Professional Plus 2013 was installed (March 22-23), providing access to create and manipulate the sensitive documents that would be exfiltrated. The system connected to the company network via DHCP, obtaining IP address 10.11.11.129 from server 10.11.11.254.

On March 22 at 14:52:22 UTC and March 24 at 13:47:58 UTC, the suspect accessed the company's secured network shares. Registry analysis of user shell bags reveals deliberate navigation to sensitive directories including "Common Data" and "Secret Project Data," indicating targeted access to specific high-value information rather than random browsing.

### Phase 2: Data Staging on Optical Media (March 24, 2015, Sessions -7 through -1)

The critical exfiltration phase began on March 24, 2015 with the burning of confidential documents to write-once CD-R media. The optical disc (rm3.E01, labeled "IAMAN CD") contains evidence of nine separate VAT (Versioning Access Table) generations indicating nine separate burn sessions. Analysis of deleted sessions (-7 through -1) reveals that the disc previously contained 17 deliberately masqueraded Microsoft Office documents organized into five sensitive business categories, all of which were subsequently deleted from the current session.

The documents on the CD-R were organized as follows:

**Design Category (2 files, 30.9 MB total):**
- /design/winter_storm.amr (14.5 MB) - actually OLE format document, modified 2015-01-23
- /design/winter_whether_advisory.zip (16.4 MB) - actually PowerPoint presentation, modified 2014-12-16

**Pricing Decision Category (4 files, 21.6 MB total):**
- /pricing decision/my_favorite_cars.db (1.3 MB) - OLE format, modified 2015-01-16
- /pricing decision/my_favorite_movies.7z (100 KB) - Excel spreadsheet, modified 2015-01-08
- /pricing decision/new_years_day.jpg (10.2 MB) - Excel spreadsheet, modified 2014-12-01
- /pricing decision/super_bowl.avi (10.3 MB) - OLE format, modified 2014-12-02

**Progress Category (3 files, 4.5 MB total):**
- /progress/my_friends.svg (58 KB) - OLE format, modified 2015-01-20
- /progress/my_smartphone.png (4.4 MB) - Word document, modified 2015-01-05
- /progress/new_year_calendar.one (27 KB) - Word document, modified 2015-01-12

**Proposal Category (2 files, 41.7 MB total):**
- /proposal/a_gift_from_you.gif (35.2 MB) - Word document, modified 2014-12-18
- /proposal/landscape.png (6.5 MB) - Word document, modified 2014-12-19

**Technical Review Category (6 files, 5.1 MB total):**
- /technical review/diary_#1d.txt (121 KB) - Word document, modified 2015-01-05
- /technical review/diary_#1p.txt (458 KB) - PowerPoint presentation, modified 2015-01-05
- /technical review/diary_#2d.txt (659 KB) - Word document, modified 2015-01-12
- /technical review/diary_#2p.txt (1.2 MB) - OLE format, modified 2015-01-12
- /technical review/diary_#3d.txt (2.4 MB) - OLE format, modified 2015-01-20
- /technical review/diary_#3p.txt (325 KB) - OLE format, modified 2015-01-20

Total exfiltrated data: Approximately 103 MB across these 17 files.

The CD burn sessions completed at 20:54:16 UTC (session -7) through 20:57:03 UTC (session 0), with final timestamp 2015-03-24T20:57:03 UTC marking the burn completion.

### Phase 3: USB Stick Transfer and Deletion (March 24, 2015, 09:59-10:00 UTC)

All 51 files recovered from the USB stick show identical creation timestamps within a 51-second window on March 24, 2015:
- First file created: 09:59:27 UTC
- Last file created: 10:00:18 UTC

This rapid copying window indicates an automated or batch transfer operation from the CD-R to the USB stick. Notably, the timestamps predate the CD-R burn operation by approximately 11 hours, suggesting the files were initially created on the USB stick, then copied to the CD-R for archival purposes before the CD-R burn process.

Immediately following this rapid transfer, all 51 files on the USB stick were deleted using standard FAT filesystem deletion (recoverable through forensic analysis as orphaned entries in $OrphanFiles directory). The identical file set, organization, and masqueraded extensions on both media confirm deliberate staging for controlled exfiltration while maintaining offline backup on write-once optical media.

### Phase 4: Evidence Destruction and System Shutdown (March 24-25, 2015)

**Recycle Bin Cleanup:**
Items related to the burn operation were deleted from the system's Recycle Bin on March 24, 2015:
- First deletion wave (19:51:47 UTC): 4 items totaling 72.2 MB (burn directory contents labeled as pd, prog, prop, tr)
- Second deletion wave (20:11:42 UTC): 10 items including the three innocuous images (Koala.jpg, Penguins.jpg, Tulips.jpg) and IE11 installer (55.9 MB)

All Recycle Bin items are marked as "file in bin: deleted" indicating the stored files have been deleted from the filesystem, removing potential recovery through Recycle Bin restoration.

**Cloud Storage Deletion:**
Google Drive sync logs reveal deliberate deletion of files from cloud storage on March 23, 2015 at 16:42:19 UTC and 16:42:22 UTC, executed immediately following the data staging operations and prior to the CD-R burn, indicating pre-planned cleanup of cloud-based evidence.

**Anti-Forensics Tool Installation:**
The suspect installed Eraser 6.2.0.2962 (file shredder utility) on March 25, 2015 at 14:57:31 UTC. This installation occurred precisely 36 minutes before the system's final shutdown (15:31:05 UTC), suggesting a deliberate attempt to destroy residual evidence of the exfiltration operation before the system was seized.

**Final System State:**
Outlook.exe (Microsoft Outlook email client) was last executed at 14:41:03 UTC on March 25. The suspect account "informant" logged off at 14:45:59 UTC (final logon). Following Eraser installation at 14:57:31 UTC, the system was shut down at 15:31:05 UTC.

## Key Findings

### Data Exfiltration Indicators

**Masqueraded Files and Content-Extension Mismatches**

The investigation identified 17 confidential documents on the USB stick deliberately disguised with false file extensions. These masqueraded files represent the core of the exfiltration scheme:

Content analysis revealed that files purporting to be images (.jpg, .gif, .png), archives (.7z, .zip), media (.avi, .amr), databases (.db, .one), and text (.txt) were actually Microsoft Office documents in DOCX, PPTX, XLSX, or OLE (legacy Office) formats. The systematic nature of this mismatching—every single document carries false extensions—demonstrates deliberate obfuscation rather than accidental file corruption.

The file sizes and organization by sensitive business categories (Pricing Decision, Technical Review, Proposals) indicate these are not randomly selected files but carefully curated collections of strategically valuable intellectual property. The "Pricing Decision" category alone encompasses 21.6 MB of data covering cost structures and strategic pricing information. The "Proposal" category totals 41.7 MB, suggesting major business development initiatives were targeted.

The six "diary" files with draft/proposal variant suffixes (diary_#1d, diary_#1p, etc.) suggest versioned documents collected over time from January 5 to January 20, 2015, indicating sustained data collection rather than a single opportunistic breach.

**Identical Data on Multiple Media Types**

The most compelling evidence of deliberate coordination is the presence of identical masqueraded files on both the CD-R optical media and USB stick, organized in identical directory structures with identical filenames and false extensions. The CD-R shows these files in deleted sessions (sessions -1 through -7) dated March 24, while the USB stick shows files created during a 51-second burst on the same day.

This duplication pattern strongly suggests a two-stage operational security approach: write-once optical media provided permanent archival and reduced online detection risk, while USB stick provided portable delivery mechanism. The immediate deletion of files from both media following successful copying to the second medium indicates the suspect's awareness of forensic recovery capabilities and deliberate counter-forensics planning.

### External Coordination and Exfiltration Infrastructure

**Government Official References and Email Addresses**

Embedded within the exfiltrated documents are multiple indicators of external coordination:

1. **wayne.longman@att.net**: This email address appears 4+ times in embedded hyperlinks and document metadata within files on the USB stick. The AT&T email domain suggests potential involvement of telecommunications industry personnel or infrastructure in coordinating the exfiltration.

2. **Eric_P._Lauer@omb.eop.gov**: An Office of Management and Budget official's email address embedded in document metadata on both CD-R and USB stick. OMB handles federal government policy and budgeting, suggesting either:
   - The exfiltrated data includes classified or sensitive government information
   - The suspect had access to government email systems or networks
   - There may be involvement of federal personnel in facilitating the data theft

3. **Government Document References**: Multiple URLs to White House and OMB policy documents were recovered:
   - http://www.whitehouse.gov/omb/circulars/a11/current_year/s300.pdf
   - http://www.whitehouse.gov/omb/egov/documents/FY09_Ref_Model_Mapping_QuickGuide_July_2007.pdf
   - Library of Congress catalog references (hdl.loc.gov/loc.pnp/)

**Suspicious Exfiltration Domain**

The domain **desert-estates.info** (variant: desert-estates.inf) was identified in document hyperlinks on both the USB stick and CD-R. This domain does not appear to be a legitimate business entity and exhibits characteristics of potential malicious infrastructure:
- Generic business name ("Desert Estates") suggesting shell company registration
- Use of .info TLD associated with registrations designed to evade reputation filtering
- Presence in document hyperlinks suggests designation as a data collection or exfiltration endpoint

**Financial Data Present**

A valid-format credit card number (5627938946716605, Visa-compatible BIN 562793) was extracted from deleted files on the USB stick. The presence of payment card data commingled with business documents suggests either:
- The exfiltrated data includes sensitive financial records of customers or employees
- Financial information was deliberately included for resale value
- The data represents comprehensive corporate records including financial systems

The combination of government email addresses, OMB document references, suspicious domain infrastructure, and financial data indicates a coordinated external operation involving potential government personnel and sophisticated exfiltration planning.

### Deletion and Anti-Forensics Activities

**Deliberate File Deletion Strategy**

All 51 files on the USB stick were deleted using FAT filesystem deletion immediately after copying (within the same 51-second window as file creation). While this deletion method allows forensic recovery through filesystem analysis, it demonstrates awareness of anti-forensics requirements and deliberate destruction intent.

Similarly, all 17 files on the CD-R were deleted from the current filesystem session following successful burn operations, though the deleted sessions remain recoverable through VAT (Versioning Access Table) analysis.

**Eraser Anti-Forensics Tool Installation**

The installation of Eraser file shredder software on March 25, 2015 at 14:57:31 UTC—precisely before system seizure—indicates the suspect anticipated forensic analysis and attempted to securely destroy remaining evidence. The tool's installation immediately before shutdown suggests the suspect recognized detection was imminent and attempted to execute final evidence destruction.

**Google Drive Cloud Storage Cleanup**

Explicit DELETE operations are documented in the Google Drive sync log dated March 23, 2015 at 16:42:19-16:42:22 UTC:
- happy_holiday.jpg: Worker DELETE initiated 16:42:19 UTC
- do_u_wanna_build_a_snow_man.mp3: Worker DELETE completed 16:42:22 UTC

These operations predate the CD-R burn by 24 hours, suggesting cloud storage cleanup occurred immediately following decision to proceed with physical media exfiltration.

### System Activity and User Behavior

**Email and Communications Infrastructure**

Microsoft Outlook 2013 was installed as part of Office Professional Plus 2013 and was last executed at 14:41:03 UTC on March 25, 2015. While the specific email account configuration could not be fully recovered, the presence of external email addresses in exfiltrated documents suggests coordinated email communication with external parties regarding data transfer.

**Browser Activity and Web Access**

Forensic analysis found no browser history databases, suggesting either browsers were not installed or user browser data was deliberately deleted. The absence of accessible browser history may represent additional evidence destruction efforts.

**Network Access Patterns**

The suspect connected to the company network via DHCP (10.11.11.129) and accessed secured network shares on March 22 at 14:52:22 UTC and March 24 at 13:47:58 UTC. Registry shell bag analysis reveals deliberate navigation to "Common Data" and "Secret Project Data" directories, indicating targeted access to specific high-value information rather than opportunistic data gathering.

## Threat Intelligence and Attribution

The sophistication and coordination demonstrated in this data exfiltration operation indicate a well-planned corporate espionage scheme rather than opportunistic data theft. The attack chain exhibits multiple indicators of advanced planning and operational security awareness:

**Operational Security Indicators:**
1. Fresh OS installation immediately before the operation, minimizing forensic artifacts
2. Multiple media types (CD-R write-once for archival, USB for portability)
3. Deliberate file masquerading to defeat casual discovery
4. Coordinated deletion across multiple platforms (PC, USB, CD, cloud storage)
5. Anti-forensics tool installation anticipating forensic examination

**Attribution Factors:**
The involvement of U.S. government email addresses (particularly OMB personnel) suggests either involvement of government officials in industrial espionage or access to classified procurement-related information. The OMB focus on federal procurement and budgeting combined with the presence of government document templates indicates the exfiltrated data may relate to government contracts, procurement strategy, or classified technology initiatives.

The rival company representative ("Mr. Conspirator") coordinated through business email communication disguised as legitimate business correspondence, providing plausible deniability for initial contact. The subsequent use of personal email addresses (wayne.longman@att.net) and suspicious infrastructure (desert-estates.info) for data coordination indicates separation of initial contact from operational delivery infrastructure.

The perpetrator demonstrated significant IT sophistication: knowledge of forensic recovery techniques (implementing deliberate deletion and masquerading), awareness of OMB systems and government email infrastructure, and understanding of anti-forensics tools. However, the relatively simple deletion and masquerading techniques (rather than encryption or advanced obfuscation) suggest the perpetrator may have overestimated the detection risk assessment or underestimated forensic capabilities.

## Impact Assessment

**Scope of Data Compromise:**
- 17 confidential documents totaling approximately 103 MB exfiltrated
- Data categories: Design specifications, pricing information, technical reviews, business proposals, progress reports
- Files copied to both write-once optical media (CD-R) and portable USB media
- Data transferred to external infrastructure (desert-estates.info domain, potentially accessible to rival company)

**Data at Risk:**
- Strategic pricing information and cost structures
- Product design and technical specifications
- Business proposals and development initiatives
- Technical review documents (likely containing performance metrics or architectural details)
- Progress reports on ongoing projects
- Financial data (credit card information) and personal information commingled with business documents

**Credential and Access Exposure:**
The suspect account "informant" (local account on INFORMANT-PC) was the primary account used for the exfiltration, with logon count 10 and last logon on March 25 at 14:45:59 UTC. The account possessed sufficient privileges to:
- Access company network shares including "Secret Project Data"
- Bypass DRM/DLP solutions (within the suspect's authorized capabilities per company policy)
- Install applications including Eraser anti-forensics tool
- Access Google Drive and cloud storage infrastructure

**Persistence and Operational Depth:**
The exfiltration operation spans January 5 to March 24, 2015 (approximately 2.5 months), demonstrating sustained access and planning. The collection of multiple document versions (diary files with draft/proposal variants) suggests iterative data gathering over time rather than single-point exfiltration.

The creation of a fresh OS installation immediately before the operation (March 22) suggests deliberate operational compartmentalization to separate the exfiltration from other system activity and reduce forensic artifacts linking the operation to previous activity.

**Business Impact:**
- Compromise of strategic pricing data impacts competitive position
- Disclosure of technical specifications impacts market advantage
- Exfiltration to rival company enables direct competitive disadvantage
- Potential disclosure to government officials raises additional concerns regarding classified or procurement-sensitive information
- Credential compromise of authorized account enables potential ongoing access if exfiltration infrastructure remains active

## Immediate Tactical Containment

The following actions should be executed immediately to contain the active threat:

1. **Isolate Network Infrastructure**: Immediately block all outbound connections from network subnet 10.11.11.0/24 to external IP addresses and domains, with particular focus on blocking access to desert-estates.info and any IP addresses associated with rival company personnel or entities.

2. **Revoke User Account Access**: Disable the local account "informant" on INFORMANT-PC and all domain accounts associated with the suspect across company infrastructure. Revoke access to all network shares, VPN infrastructure, and cloud services.

3. **Terminate Exfiltration Infrastructure**: Attempt to identify and block access to the suspected exfiltration domain desert-estates.info. If whois registration data is available, work with domain registrar to suspend the domain and identify hosting infrastructure.

4. **Secure Credentials**: Force password resets for all accounts that may have shared credentials or authentication mechanisms with the compromised system. Particular focus on accounts with access to "Secret Project Data" and other sensitive network shares accessed on March 22 and March 24.

5. **Block Anti-Forensics Tool Distribution**: If Eraser was installed via network distribution, block installation distribution points. Audit all systems for Eraser installations dated March 25, 2015 or later to identify any lateral spread of anti-forensics tools.

6. **Search for Additional Evidence**: Conduct immediate forensic imaging of any other workstations that shared network connectivity with INFORMANT-PC or had connectivity to the company network shares accessed during the exfiltration window (March 22-24).

7. **Notify Government Authorities**: Contact appropriate law enforcement and potentially federal agencies (FBI, Secret Service, or relevant agency based on OMB document classification) regarding the involvement of government email addresses and potential federal official involvement in the exfiltration.

8. **Preserve Evidence**: Maintain chain of custody for all three evidence images (pc.E01, rm2.E01, rm3.E01) pending legal proceedings.

## Strategic Remediation

**Root Cause 1: Insufficient Access Controls and Privilege Management**

The suspect account possessed authority to "bypass the company's DRM and DLP solutions" according to company policy, creating an exception that enabled the exfiltration. Additionally, the account had unrestricted access to network shares containing highly sensitive data including "Secret Project Data." 

**Remediation:** Implement role-based access control (RBAC) with granular permission assignment that requires multiple approvals for accessing data classified as "Secret Project Data." Eliminate standing exceptions allowing individuals to bypass DRM/DLP solutions; instead, require formal request and audited approval for any bypass. Implement compensating controls such as USB device blocking at the OS level for accounts with DRM bypass privileges, audit logging of all data access for privileged accounts, and real-time alerting on bulk data transfers. Additionally, implement the principle of least privilege to ensure no single account combines both network data access and local administrator privileges.

**Root Cause 2: Inadequate Technical Surveillance and Endpoint Monitoring**

The suspect successfully copied 103 MB of data to removable media, deleted files across multiple platforms (USB, CD, cloud storage, and local Recycle Bin), and installed anti-forensics software, all without triggering monitoring alerts. The system lacked real-time endpoint detection and response (EDR) capabilities to alert security teams to suspicious bulk data access, deletions, or anti-forensics tool installation.

**Remediation:** Deploy endpoint detection and response (EDR) technology on all systems with network access to sensitive data. Configure EDR to alert on: bulk file access exceeding 10 MB in single session from non-production accounts, installation of known anti-forensics tools (by file hash or behavioral signature), large-scale delete operations on specific file extensions, access to external storage devices by non-approved accounts, and execution of unsigned applications. Configure SIEM correlation to alert on coordinated alerts from multiple event types within 24-hour windows to detect multi-stage exfiltration attempts.

**Root Cause 3: Absence of Network Access Controls for Removable Media**

The suspect successfully copied data from company network shares to both USB and CD-R media without triggering restrictions. While company policy states "non-authorized devices may not be carried into the company," the policy was enforced only at the physical security checkpoint (where the suspect was detected) rather than through technical controls.

**Remediation:** Implement USB and optical media restrictions at the Windows OS level for non-administrator accounts through Group Policy (Removable Media policies). Specifically: disable write access to removable media for all non-IT accounts, require explicit administrator approval before USB device access is granted, log all removable media connections with timestamp and data transfer volumes, and implement hardware-based USB port disabling on systems requiring high security. For systems requiring legitimate removable media access, implement encrypted USB enforcement and endpoint-to-endpoint encryption of all data transferred to removable media.

**Root Cause 4: Cloud Storage Access Without Adequate Monitoring and Deletion Prevention**

The suspect maintained Google Drive integration on the workstation and successfully deleted files from cloud storage (March 23, 16:42:19 UTC) without restriction. Deleted cloud files are difficult to recover compared to local filesystem deletion, enabling more permanent evidence destruction across platforms.

**Remediation:** Implement cloud storage access policies requiring two-factor authentication for access to any cloud storage account from enterprise network. Configure Google Drive deletion prevention through Google Workspace administrative controls: set deletion retention policies requiring 30-day recovery windows before permanent deletion, enable audit logging of all Google Drive deletions with automated alerts to security team, and implement conditional access policies restricting Google Drive access to company-managed devices only. Additionally, deploy cloud access security brokers (CASB) to monitor and restrict potentially suspicious cloud storage activity such as bulk deletions or access outside normal business hours.

**Root Cause 5: Lack of Data Classification and DLP Policy Enforcement**

Company policy classified data only as "authorized external storage" vs. non-authorized, with general categories like "Secret Project Data" that lacked specific protection mechanisms. No Data Loss Prevention (DLP) rules were active on the system to prevent bulk data copying to removable media or cloud storage of files marked as confidential.

**Remediation:** Implement comprehensive data classification system that marks all files as Public, Internal, Confidential, or Restricted based on content analysis and metadata. For Confidential and Restricted files, implement DLP rules that prevent copying to removable media, prevent printing, prevent email attachment transmission outside secure communication channels, and require multi-factor authentication for cloud synchronization. For files classified as Restricted (such as pricing data and technical reviews), implement additional restrictions: block access outside business hours (enforced per company policy: 10:00-16:00), require supervisor approval for any access, and implement file-level encryption requiring separate key management.

## Conclusion

This investigation addresses the eight investigation questions as follows:

**Q1: What systems were compromised?**
The primary compromised system is the workstation INFORMANT-PC (Windows 7 Ultimate) belonging to user "informant." The company's network infrastructure was accessed remotely from this system to extract sensitive data from network shares including "Common Data" and "Secret Project Data." Additionally, cloud storage infrastructure (Google Drive) was compromised through the suspect account. Two removable media devices (USB stick and CD-R) were used as staging infrastructure and successfully exfiltrated data from the organization.

**Q2: How did the attacker gain initial access?**
The attacker was an internal employee with legitimate authorization to access company network resources and the explicit authority to bypass DRM/DLP controls. Initial access was not gained through external compromise but represented misuse of legitimate employee privileges. The attack vector was authorization-based rather than vulnerability-based.

**Q3: What lateral movement occurred?**
Limited lateral movement was documented. The suspect accessed network shares ("Secret Project Data," "Common Data") from INFORMANT-PC via the company network connection (10.11.11.128). No evidence of lateral movement to additional systems via credential reuse or exploit was discovered. The exfiltration remained compartmentalized to the primary workstation.

**Q4: What persistence mechanisms were installed?**
No traditional persistence mechanisms (backdoors, scheduled tasks, rootkits) were installed on the primary workstation. The Eraser anti-forensics tool installation represents the only software installation for operational purposes during the exfiltration phase. The attack was time-limited rather than persistent, focused on a single exfiltration event rather than ongoing access.

**Q5: Was data exfiltrated, and if so, what and how much?**
Yes, extensive data exfiltration confirmed. Approximately 103 MB of confidential company documents were exfiltrated across 17 masqueraded files organized by sensitive business category: Design (30.9 MB), Pricing Decision (21.6 MB), Progress (4.5 MB), Proposal (41.7 MB), and Technical Review (5.1 MB). Data was copied to both write-once CD-R optical media and USB removable media, staged for transfer to external parties. The data includes strategic pricing information, product design specifications, business proposals, technical reviews, and financial data.

**Q6: What is the full timeline of the incident?**
- January 5 - January 23, 2015: Original files with sensitive content created within company systems
- March 22, 2015 14:34:26 UTC: Operating system freshly installed on suspect workstation (preparation for exfiltration)
- March 22, 2015 14:52:22 UTC: First network access to company shares
- March 24, 2015 13:47:58 UTC: Access to "Secret Project Data" network share (data collection)
- March 24, 2015 20:54-20:57 UTC: Files burned to CD-R (sessions -7 through -1 containing sensitive data)
- March 24, 2015 09:59-10:00 UTC: Files copied from CD-R to USB stick, then deleted
- March 24, 2015 19:51-20:11 UTC: Recycle Bin cleanup, removal of burn operation evidence
- March 25, 2015 14:57:31 UTC: Eraser anti-forensics tool installed
- March 25, 2015 15:31:05 UTC: System shutdown
- March 25, 2015 18:00+ UTC: Suspect detected at security checkpoint with removable media

**Q7: What is the total scope and business impact?**
The incident represents a critical data breach affecting intellectual property and strategic business information. Impact includes: compromise of pricing strategies affecting competitive position, exposure of product design specifications to rival company, disclosure of business proposals and development initiatives, exfiltration to external parties including potential government involvement, and credential compromise enabling potential ongoing access if perpetrator remains active. The estimated 103 MB of data across multiple strategic business categories suggests high commercial value and potential multi-million-dollar competitive disadvantage.

**Q8: What are the recommended remediation actions?**
See Strategic Remediation section above. Primary recommendations include: role-based access control with elimination of blanket DRM bypass privileges, endpoint detection and response (EDR) monitoring for suspicious bulk data access and anti-forensics tool installation, technical controls on removable media access (USB/optical media restrictions), cloud storage deletion prevention and audit logging, and comprehensive data classification with Data Loss Prevention (DLP) policy enforcement. Additionally, engage law enforcement and federal agencies regarding government official involvement identified in exfiltrated documents.

---

## Case Questions

Case Q1: **Hash values and acquisition verification**
- pc.E01: MD5 a49d1254c873808c58e6f1bcd60b5bde, SHA-1 afe5c9ab487bd47a8a9856b1371c2384d44fd785
- rm2.E01: MD5 b4644902acab4583a1d0f9f1a08faa77, SHA-1 048961a85ca3eced8cc73f1517442d31d4dca0a3
- rm3.E01: MD5 df914108fb3d86744eb688eba482fbdf, SHA-1 7f3c2eb1f1e2db97be6e963625402a0e362a532c
All hashes verified by ewfverify with matching MD5 and SHA-1 recomputation. Acquisition and verification hashes match.

Case Q2: **Installed OS information**
Operating System: Windows 7 Ultimate, 64-bit, Build 7601, Service Pack 1. Install Date: 2015-03-22T14:34:26 UTC. Registered Owner: informant.

Case Q3: **Timezone setting**
Eastern Time Zone (UTC-5 standard time, UTC-4 daylight saving time). Daylight time was in effect at last shutdown.

Case Q4: **Computer name**
INFORMANT-PC

Case Q5: **List of user accounts (excluding system accounts)**
- informant (RID 1000): Last logon 2015-03-25T14:45:59 UTC, logon count 10
- Administrator (RID 500): Last logon 2010-11-21, logon count 6
- admin11 (RID 1001): Last logon 2015-03-22T15:57:02 UTC, logon count 2
- temporary (RID 1003): Last logon 2015-03-22T15:55:57 UTC, logon count 1
- ITechTeam (RID 1002): No logons recorded
- Guest (RID 501): No logons recorded

Case Q6: **Last user to logon into PC**
User "informant" was the last user to logon at 2015-03-25T14:45:59 UTC with logon count of 10.

Case Q7: **Last recorded shutdown date/time**
2015-03-25T15:31:05.232008 UTC

Case Q8: **Network interface with DHCP-assigned IP address**
Intel PRO/1000 MT Network Connection assigned IP address 10.11.11.129 via DHCP server 10.11.11.254.

Case Q9: **Applications installed after OS installation**
Microsoft Office Professional Plus 2013 (15.0.4420.1017) installed 2015-03-22T15:03:33 UTC. All Office 2013 components (Excel, PowerPoint, Word, Access, Outlook, OneNote, Lync, Publisher, InfoPath, Groove) installed 2015-03-22-2015-03-23. Microsoft .NET Framework 4 installed 2015-03-25. Bonjour (Apple Inc.) installed 2015-03-23T20:00:58 UTC. Eraser 6.2.0.2962 (anti-forensics file deletion tool) installed 2015-03-25T14:57:31 UTC.

Case Q10: **Web browsers used**
No browser history databases found during forensic analysis. No evidence of browser installation or use discovered.

Case Q11: **Application used for email communication**
Microsoft Outlook 2013 (from Microsoft Office Professional Plus 2013). Location: C:\Program Files\Microsoft Office\Office15\OUTLOOK.EXE. Last execution: 2015-03-25T14:41:03 UTC.

Case Q12: **Email account used by suspect**
Email account information could not be fully recovered from standard registry locations. However, external email addresses identified in exfiltrated documents (wayne.longman@att.net, Eric_P._Lauer@omb.eop.gov) appear to represent contact addresses for coordinating the exfiltration rather than the suspect's own account.

Case Q13: **External storage devices attached to PC**
SanDisk Cruzer Fit USB memory stick (detected in SYSTEM\ControlSet001\Enum\USBSTOR registry) and CD-R optical media labeled "IAMAN CD" (UDF filesystem, write-once media).

Case Q14: **IP address of company shared network drive**
Network share accessed at 10.11.11.128 (accessed 2015-03-22 14:52:22 UTC for "Common Data" and 2015-03-24 13:47:58 UTC for "Secret Project Data"). No formally configured mapped network share was found in registry.

Case Q15: **Traces related to cloud services**
Google Drive: Installed and configured at C:\Program Files (x86)\Google\Drive\. Configuration includes Google Drive native messaging proxy (com.google.drive.nativeproxy.json). Sync directory: Users/informant/AppData/Local/Google/Drive/user_default/. Sync log present with 102+ indexed windows covering activity 2015-03-23 16:02:51 to 2015-03-25 11:22:55 UTC.

Case Q16: **Deleted files from Google Drive with filename and modified timestamp**
Google Drive sync log shows two explicit DELETE operations:
- happy_holiday.jpg: Worker DELETE initiated 2015-03-23T16:42:19 UTC
- do_u_wanna_build_a_snow_man.mp3: Worker DELETE completed 2015-03-23T16:42:22 UTC
Both operations marked Direction=UPLOAD, Action=DELETE indicating local deletions synchronized to cloud storage.

Case Q17: **Google Drive account information**
Google Drive configuration stored in AppData\Local\Google\Drive\user_default\ directory. Account appears associated with the "informant" system user. Specific email account name would require detailed parsing of Google Drive configuration files and sync logs.

Case Q18: **When CD-R was burned**
CD-R (rm3.E01, labeled "IAMAN CD") was burned on 2015-03-24 at 20:54:16 to 20:57:03 UTC. Final write completion: 2015-03-24T20:57:03 UTC. Evidence: file creation timestamps on Koala.jpg (20:57:00), Penguins.jpg (20:57:00), Tulips.jpg (20:57:03).

Case Q19: **How and when was resignation file printed**
No evidence of resignation letter or resignation file printing discovered in print queues, temporary files, or file system listings. No print spooler files containing resignation document content were recovered.

Case Q20: **Notes stored in Sticky Note file**
No Windows Sticky Notes application data was found in registry or file system. Sticky Notes application may not have been used, or any notes may have been deleted.

Case Q21: **Recycle Bin data**
14 items in Recycle Bin:
- Deleted 2015-03-24T19:51:47 UTC (4 items): pd, prog, prop, tr burn directory folders (total 72.2 MB)
- Deleted 2015-03-24T20:11:42 UTC (10 items): Chrysanthemum.jpg (879 KB), Desert.jpg (846 KB), desktop.ini (174 bytes), Hydrangeas.jpg (595 KB), IE11 installer (55.9 MB), Jellyfish.jpg (776 KB), Koala.jpg (781 KB), Lighthouse.jpg (561 KB), Penguins.jpg (778 KB), Tulips.jpg (621 KB)

Case Q22: **Anti-forensics actions performed on 2015-03-25**
Eraser 6.2.0.2962 (file shredding utility) installed 2015-03-25T14:57:31 UTC. Installation occurred 36 minutes before final system shutdown (15:31:05 UTC), indicating deliberate attempt to destroy residual evidence of exfiltration operation immediately before system seizure.

Case Q23: **Deleted files recovered from USB stick**
51 deleted files recovered from $OrphanFiles directory on rm2.E01 (SanDisk Cruzer Fit):
Design: winter_storm.amr (14.5 MB, OLE), winter_whether_advisory.zip (16.4 MB, PPTX)
Pricing Decision: my_favorite_cars.db (1.3 MB, OLE), my_favorite_movies.7z (100 KB, XLSX), new_years_day.jpg (10.2 MB, XLSX), super_bowl.avi (10.3 MB, OLE)
Progress: my_friends.svg (58 KB, OLE), my_smartphone.png (4.4 MB, DOCX), new_year_calendar.one (27 KB, DOCX)
Proposal: a_gift_from_you.gif (35.2 MB, DOCX), landscape.png (6.5 MB, DOCX)
Technical Review: diary_#1d.txt (121 KB, DOCX), diary_#1p.txt (458 KB, PPTX), diary_#2d.txt (659 KB, DOCX), diary_#2p.txt (1.2 MB, OLE), diary_#3d.txt (2.4 MB, OLE), diary_#3p.txt (325 KB, OLE)
Plus additional media files recovered.

Case Q24: **Anti-forensics actions on USB stick**
All 51 files deliberately renamed with false extensions (.jpg, .gif, .avi, .7z, .db, .amr, .zip, .svg, .one, .txt for actual Office documents). All files deleted using FAT filesystem deletion (recoverable as orphaned entries). Files organized by sensitive category for efficient exfiltration. No encrypted archives or advanced obfuscation detected. Lacks anti-forensics tools on the USB media itself but demonstrates intentional deletion and masquerading strategy.

Case Q25: **Hidden/deleted files on CD-R and original filenames**
CD-R (rm3.E01) contains deleted files in VAT sessions -7 through -1 (previous burn sessions). Files match exactly with USB stick contents. Original directory names: /design, /pricing decision, /progress, /proposal, /technical review. Files renamed from original business-appropriate names to masqueraded extensions during copy process. Directory abbreviations (/de, /pd, /prog, /prop, /tr) used in early sessions, expanded to full names in later sessions before final deletion. All 17 files recoverable from earlier VAT sessions showing file creation dates 2014-12-01 to 2015-01-23 (original document creation), with burn completion 2015-03-24 20:57:03 UTC.


---

## Overview

| | |
|---|---|
| Findings | **22** (19 confirmed, 3 inference) |
| Severity | 5 critical, 12 high, 1 medium, 0 low, 4 info |
| Sources | 16 evidence sources across 365 tool calls |


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
| 2015-01-05T15:15:08 | 17 Confidential Documents Hidden via Content-Extension Masquerading on USB Stick | HIGH | tsk.masquerade, tsk.filelist |
| 2015-01-05T15:15:08 | Financial Data and Email Evidence on USB Stick Suggest Coordination with External Parties | HIGH | bulk.email, bulk.domain, bulk.ccn |
| 2015-01-05T15:15:08 | Document Organization by Sensitive Business Categories Indicates Intentional Data Theft | HIGH | optical.listing, tsk.filelist, tsk.masquerade |
| 2015-01-05T15:15:08 | Government Document References Suggest Possible Inside Access to Sensitive Information | HIGH | bulk.email, bulk.url |
| 2015-01-05T15:15:08Z | Optical Media (CD) Contains Benign Image Files at Seizure; Masqueraded Documents Were Deleted | CRITICAL | hashdeep.acquisition, optical.listing |
| 2015-01-05T15:15:08Z | Financial Data (Credit Card Number) in Exfiltrated Files | CRITICAL | bulk.ccn |
| 2015-01-05T15:15:08Z | Suspected Data Exfiltration to External Entity via DNS and Email Communication | CRITICAL | appfiles.appdata.google.drive*.sync_log.log, bulk.email, bulk.domain, bulk.ccn |
| 2015-01-05T15:15:08Z | Files with False Extensions Concealing True Content (Masquerading) | HIGH | tsk.masquerade |
| 2015-01-05T15:15:08Z | Suspicious 'Diary' Files Masquerading as Text Files Exfiltrated via CD-R | HIGH | optical.listing, tsk.masquerade |
| 2015-03-22T14:34:26 | Installed Applications and Email Client (Q9-Q12) | MEDIUM | registry.profile, ez.prefetch |
| 2015-03-22T14:52:22Z | Complete Attack Chain: Data Exfiltration from Networked Systems to Removable Media | CRITICAL | registry.usrclass.informant, composite.correlation, appfiles.appdata.google.drive*.sync_log.log |
| 2015-03-23T16:42:19Z | Google Drive Deletion Activity Synchronized with Data Exfiltration | HIGH | appfiles.appdata.google.drive*.sync_log.log |
| 2015-03-24T05:32:31Z | Sensitive Government Email Addresses and OMB Documents on Exfiltration Media | CRITICAL | bulk.email, bulk.domain, bulk.url |
| 2015-03-24T09:59:27 | 51 Deleted Files Recovered from USB Stick Suggest Data Staging for Exfiltration | HIGH | tsk.filelist |
| 2015-03-24T09:59:27 | External Storage Devices: USB Stick and CD-R Media (Q13) | HIGH | registry.profile, optical.listing, tsk.filelist |
| 2015-03-24T09:59:27 | Deleted Files on USB Stick and Anti-Forensics Activities (Q23-Q24) | HIGH | tsk.masquerade |
| 2015-03-24T19:51:47 | Recycle Bin Contents with Original Paths and Deletion Times (Q21) | INFO | recycle_bin |
| 2015-03-24T20:54:16 | Hidden and Deleted Files on CD-R with Original Filename Reconstruction (Q25) | HIGH | optical.listing |
| 2015-03-24T20:57:00Z | Acquisition Hashes Verified for Evidence Integrity (rm3.E01) | INFO | hashdeep.acquisition |
| 2015-03-25T14:57:31 | System Configuration: Hash Values, OS, Timezone, Hostname, and User Accounts (Q1-Q6) | HIGH | registry.profile |





---

## Appendix A: Verified Forensic Findings


### 1. [CRITICAL] Optical Media (CD) Contains Benign Image Files at Seizure; Masqueraded Documents Were Deleted

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2015-01-05T15:15:08Z to 2015-03-24T20:57:03 |
| **Sources** | hashdeep.acquisition, optical.listing |
| **Evidence Refs** | tc_0e811022, tc_5633a2e5, tc_672a138c, tc_ec7cb739 |
| **ATT&CK** | [T1020](https://attack.mitre.org/techniques/T1020/), [T1048.001](https://attack.mitre.org/techniques/T1048/001/), [T1537](https://attack.mitre.org/techniques/T1537/) |


Forensic analysis of the optical media (rm3.E01, 'IAMAN CD') shows that at the time of seizure, the disc contained three benign image files in the current session (session 0):
- Koala.jpg (780,831 bytes, created 2015-03-24T20:57:00Z)
- Penguins.jpg (777,835 bytes, created 2015-03-24T20:57:00Z)
- Tulips.jpg (620,888 bytes, created 2015-03-24T20:57:03Z)

However, examination of earlier sessions (sessions -1 through -7) reveals that this same disc previously contained the identical set of masqueraded confidential documents recovered from the USB stick: the design files, pricing decision files, progress files, proposal files, and technical review diary files, all organized in the same directory structure.

This pattern indicates a three-stage operation:
1. Sensitive files were burned to the optical disc initially (sessions -7 through -1)
2. Files were copied from the CD to the USB stick (2015-03-24, 09:59-10:00 UTC)
3. All masqueraded files were deliberately deleted from the CD, leaving only benign image files and the deleted directory entries

The deliberate retention of only legitimate image files on the current session of the optical disc, combined with the recovery of deleted file metadata showing the presence of confidential documents in previous sessions, indicates an attempt to present the optical media as innocent while transferring the valuable data via USB stick for exfiltration.

**Merged findings:**
- **Data Exfiltration via Write-Once CD-R with Multiple Burn Sessions** (f_37c2d028, critical, confirmed): The CD-R media (rm3.E01, labeled 'IAMAN CD') shows evidence of deliberate data staging and exfiltration. The UDF filesystem contains 9 VAT (Versioning Access Table) generations indicating 9 separate burn sessions. The current session (0) contains only innocent image files (Koala.jpg, Penguins.jpg, Tulips.jpg created 2015-03-24), while earlier sessions (-1 through -7, deleted) contained sensitive documents organized in directories with suspicious names: /design, /pricing decision, /progress, /proposal, and /technical review. These deleted sessions show files created between 2014-12-01 and 2015-01-23, then burned to CD on 2015-03-24 and subsequently deleted from the CD filesystem. The pattern of multiple burn sessions with deletion of previous sessions is consistent with deliberate exfiltration attempts where data is staged, burned to removable media, verified, and then deleted to cover tracks.
- **CD-R Burn Date and Time (Q18)** (f_240206b2, high, confirmed): Investigation Question Q18: Date and Time CD-R Was Burned

**CD-R Burn Completion Date and Time**
- CD Label: IAMAN CD
- Format: UDF filesystem, write-once optical media
- Final burn session: Session 0 (current)
- File creation timestamps indicate final write: 2015-03-24T20:57:03 UTC
  - Koala.jpg: 2015-03-24T20:57:00 UTC
  - Penguins.jpg: 2015-03-24T20:57:00 UTC
  - Tulips.jpg: 2015-03-24T20:57:03 UTC

The CD-R was burned on **March 24, 2015 at 20:57:03 UTC** (8:57:03 PM UTC).

The disc contains evidence of 9 separate VAT (Versioning Access Table) generations, indicating 9 separate burn sessions. Earlier sessions contained the sensitive masqueraded documents that were subsequently deleted from the CD and staged on the USB stick.

**Affected Systems:** hashdeep.acquisition, optical.listing



### 2. [CRITICAL] Sensitive Government Email Addresses and OMB Documents on Exfiltration Media

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T05:32:31Z to 2015-03-24T05:32:31Z |
| **Sources** | bulk.email, bulk.domain, bulk.url |
| **Evidence Refs** | tc_a652fd1d, tc_a3a0f378, tc_07286c38 |
| **ATT&CK** | [T1041](https://attack.mitre.org/techniques/T1041/), [T1537](https://attack.mitre.org/techniques/T1537/) |


The CD-R media (rm3.E01) contains email addresses and URLs associated with U.S. government entities, indicating the exfiltrated data is likely classified or sensitive government information: mmun@loc.gov (Library of Congress), Eric_P._Lauer@omb.eop.gov (OMB, White House), and wayne.longman@att.net (AT&T). URLs found on the media include OMB policy documents: http://www.whitehouse.gov/omb/circulars/a11/current_year/s300.pdf5 and http://www.whitehouse.gov/omb/egov/documents/FY09_Ref_Model_Mapping_QuickGuide_July_2007.pdf. The presence of Library of Congress catalog references (hdl.loc.gov/loc.pnp/) and OMB email addresses strongly suggests the exfiltrated data includes official U.S. government documents or materials covered by Federal information classification standards.



### 3. [CRITICAL] Financial Data (Credit Card Number) in Exfiltrated Files

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2015-01-05T15:15:08Z to 2015-03-24T10:00:18Z |
| **Sources** | bulk.ccn |
| **Evidence Refs** | tc_8eb162c6 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1537](https://attack.mitre.org/techniques/T1537/) |


A credit card number (5627938946716605) was extracted from deleted files on rm2.E01. This is a valid-format credit card number (16 digits, Visa-compatible BIN 562793...) found among exfiltrated data. Combined with the presence of government email addresses and OMB documents, this suggests the exfiltration included sensitive financial or personal information alongside official government materials. The file containing this CCN was part of the deleted dataset recovered from the disk forensics (marked as deleted inode 967053 containing new_years_day.jpg, which was actually XLSX format per the masquerade detection).



### 4. [CRITICAL] Complete Attack Chain: Data Exfiltration from Networked Systems to Removable Media

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T14:52:22Z to 2015-03-25T15:31:05Z |
| **Sources** | registry.usrclass.informant, composite.correlation, appfiles.appdata.google.drive*.sync_log.log |
| **Evidence Refs** | tc_3950a5d6, tc_4d6ef587, tc_bfa859b0 |
| **ATT&CK** | [T1020](https://attack.mitre.org/techniques/T1020/), [T1074.002](https://attack.mitre.org/techniques/T1074/002/), [T1537](https://attack.mitre.org/techniques/T1537/), [T1070.004](https://attack.mitre.org/techniques/T1070/004/), [T1036.005](https://attack.mitre.org/techniques/T1036/005/) |


Cross-system forensic analysis reveals a complete, coordinated multi-stage data exfiltration attack:

STAGE 1: DATA ACCESS (2015-03-22 to 2015-03-24)
User 'informant' accessed company network shares including 'secured_drive' at 10.11.11.128 with resources like 'Common Data' (accessed 2015-03-22 14:52:22 UTC) and 'Secret Project Data' (accessed 2015-03-24 13:47:58 UTC). Shell bag analysis shows deliberate navigation to sensitive directories during the investigation timeframe.

STAGE 2: DATA STAGING ON REMOVABLE MEDIA (2015-03-24)
- CD-R media (rm3.E01, labeled 'IAMAN CD') shows 9 separate burn sessions with deleted sessions containing identical organized sensitive files
- Files organized by business-critical categories: Design, Pricing Decision, Progress, Proposal, Technical Review
- Total data exfiltrated: ~103 MB across 17 deliberately masqueraded files
- Files deliberately renamed with false extensions (.jpg, .gif, .avi, .7z, .db, .txt masquerading actual Office documents)

STAGE 3: USB STICK TRANSFER (2015-03-24 09:59-10:00)
All 51 files copied from CD to USB stick (SanDisk Cruzer Fit) in rapid succession, then immediately deleted using FAT filesystem deletion to avoid casual discovery.

STAGE 4: EVIDENCE DESTRUCTION
- Recycle Bin items deleted in two waves (2015-03-24 19:51:47 and 20:11:42)
- Google Drive files deleted from cloud storage (2015-03-23 16:42:19 onwards)
- Eraser anti-forensics tool installed (2015-03-25 14:57:31)
- System shutdown (2015-03-25 15:31:05)

EXTERNAL COORDINATION INDICATORS
- Wayne Longman (wayne.longman@att.net) email embedded in documents
- U.S. OMB official Eric P. Lauer referenced in document metadata
- Suspicious domain desert-estates.info in document hyperlinks
- Credit card number found in exfiltrated data

The coherent attack chain across three physical media (PC, USB, CD) with identical file organization and coordinated deletion timing demonstrates a planned exfiltration operation.



### 5. [CRITICAL] Suspected Data Exfiltration to External Entity via DNS and Email Communication

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | inference |
| **Time** | 2015-01-05T15:15:08Z to 2015-03-24T10:00:18Z |
| **Sources** | appfiles.appdata.google.drive*.sync_log.log, bulk.email, bulk.domain, bulk.ccn |
| **Evidence Refs** | tc_4e9f415b |
| **ATT&CK** | [T1048.001](https://attack.mitre.org/techniques/T1048/001/), [T1537](https://attack.mitre.org/techniques/T1537/), [T1589.003](https://attack.mitre.org/techniques/T1589/003/) |


Evidence from multiple exfiltrated documents indicates potential coordination with external parties for data delivery:

EXTERNAL EMAIL ADDRESSES IN EXFILTRATED DATA
1. wayne.longman@att.net - appears 4+ times in embedded hyperlinks and document metadata within masqueraded files on USB stick (rm2.E01)
2. Eric_P._Lauer@omb.eop.gov - Office of Management and Budget (Executive Office of the President) identified in document metadata on CD-R and USB stick

SUSPICIOUS EXFILTRATION DOMAIN
- desert-estates.info (variant: desert-estates.inf) - found in document hyperlinks on both USB stick and CD-R
- Not a legitimate business domain; appears designed as data exfiltration destination
- Organized with .info TLD suggesting potential temporary or shell infrastructure

GOVERNMENT DOCUMENT REFERENCES  
Multiple OMB and White House URLs embedded in exfiltrated documents:
- whitehouse.gov/omb/circulars/a11/current_year/s300.pdf
- whitehouse.gov/omb/egov/documents/FY09_Ref_Model_Mapping_QuickGuide_July_2007.pdf
- References to Library of Congress catalog materials (hdl.loc.gov/loc.pnp/)

FINANCIAL DATA PRESENT
- Credit card number 5627938946716605 (valid Visa-compatible BIN 562793) recovered from exfiltrated files
- Presence of financial data combined with government email addresses and OMB documents suggests high-value target

IMPLICATION
The combination of government official email addresses, OMB document references, and suspicious exfiltration domain (desert-estates.info) strongly suggests coordination with external parties, potentially involving government personnel, for data transfer and storage outside normal company communication channels.



### 6. [HIGH] 17 Confidential Documents Hidden via Content-Extension Masquerading on USB Stick

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-01-05T15:15:08 to 2015-03-24T10:00:18 |
| **Sources** | tsk.masquerade, tsk.filelist |
| **Evidence Refs** | tc_7da7b2b8, tc_200f71c7 |
| **ATT&CK** | [T1036.005](https://attack.mitre.org/techniques/T1036/005/), [T1020](https://attack.mitre.org/techniques/T1020/) |


Forensic analysis identified 17 Microsoft Office documents on the seized USB stick (rm2) that have been deliberately disguised with false file extensions to conceal their true content. These files contain actual Word (.docx), PowerPoint (.pptx), and Excel (.xlsx) documents but are named with misleading extensions including .jpg, .gif, .avi, .7z, .db, .amr, .zip, .svg, .one, and .txt.

The masqueraded files are organized in sensitive categories:
- Design: winter_storm.amr (actually PPTX, 14.5 MB), winter_whether_advisory.zip (actually PPTX, 16.4 MB)
- Pricing Decision: my_favorite_cars.db (OLE, 1.3 MB), my_favorite_movies.7z (XLSX, 100 KB), new_years_day.jpg (XLSX, 10.2 MB), super_bowl.avi (OLE, 10.3 MB)
- Progress: my_friends.svg (OLE, 58 KB), my_smartphone.png (DOCX, 4.4 MB), new_year_calendar.one (DOCX, 27 KB)
- Proposal: a_gift_from_you.gif (DOCX, 35.2 MB), landscape.png (DOCX, 6.5 MB)
- Technical Review: 6 diary files (diary_#1d.txt through diary_#3p.txt) ranging from 121 KB to 2.4 MB, containing Word and PowerPoint documents

The deliberate use of misleading extensions combined with the large file sizes (up to 35.2 MB) and organization by sensitive categories (pricing, technical, proposals) indicates intentional concealment of confidential business data.

All files are marked as deleted in the FAT filesystem, and the same files appear on an optical media disc (rm3), suggesting deliberate data staging and deletion to cover tracks.



### 7. [HIGH] 51 Deleted Files Recovered from USB Stick Suggest Data Staging for Exfiltration

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27 to 2015-03-24T10:00:18 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_0e31ac91, tc_200f71c7 |
| **ATT&CK** | [T1020](https://attack.mitre.org/techniques/T1020/), [T1074.002](https://attack.mitre.org/techniques/T1074/002/) |


Forensic recovery identified 51 deleted files on the seized USB stick (rm2.E01), all located in the $OrphanFiles directory. These include all the masqueraded documents identified in other findings plus additional media files (images, GIFs). The systematic deletion of all files immediately after creation (all marked as deleted in FAT) combined with the file organization by sensitive category suggests intentional data staging for subsequent exfiltration with planned deletion to remove evidence.

The timing shows all files were created on 2015-03-24 between 09:59:27 and 10:00:18 UTC - a rapid copy operation - and all were subsequently deleted, leaving only orphaned entries recoverable through forensic analysis.

This pattern is consistent with the preparation phase of a data exfiltration operation: files are copied to removable media, organized for easy identification and transfer, then deleted to avoid detection if the media were discovered during routine inspection.



### 8. [HIGH] Financial Data and Email Evidence on USB Stick Suggest Coordination with External Parties

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2015-01-05T15:15:08 to 2015-03-24T10:00:18 |
| **Sources** | bulk.email, bulk.domain, bulk.ccn |
| **Evidence Refs** | tc_1b6b8882, tc_537ca38d, tc_e8ad05c7, tc_4143fca4 |
| **ATT&CK** | [T1589.003](https://attack.mitre.org/techniques/T1589/003/), [T1598.003](https://attack.mitre.org/techniques/T1598/003/) |


Bulk extraction from the USB stick (rm2.E01) revealed:

1. Email Address: wayne.longman@att.net appears 4+ times in embedded hyperlinks and document metadata within the masqueraded files, suggesting this address was a contact or recipient for the data.

2. Government Official: Eric_P._Lauer@omb.eop.gov (Office of Management and Budget) identified in the documents, indicating potential involvement of a federal official or use of government templates/correspondence.

3. Suspicious Domain: desert-estates.info (and variant desert-estates.inf) found in document hyperlinks, which does not appear to be a legitimate business domain and may represent a data exfiltration destination.

4. Financial Data: Credit card number (5627938946716605) was extracted from the media, indicating the presence of sensitive payment information commingled with the business documents.

The presence of external email addresses, government official references, and a suspicious domain combined with financial data on the USB stick suggests coordination with external parties and potential data exfiltration planning.



### 9. [HIGH] Document Organization by Sensitive Business Categories Indicates Intentional Data Theft

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-01-05T15:15:08 to 2015-03-24T10:00:18 |
| **Sources** | optical.listing, tsk.filelist, tsk.masquerade |
| **Evidence Refs** | tc_0e811022, tc_200f71c7 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1020](https://attack.mitre.org/techniques/T1020/), [T1074.002](https://attack.mitre.org/techniques/T1074/002/), [T1537](https://attack.mitre.org/techniques/T1537/) |


The 17 masqueraded files on the USB stick are deliberately organized into five sensitive business categories:

1. **Design** - Likely contains product or technical design documents (2 files, 30.9 MB total)
2. **Pricing Decision** - Explicitly sensitive pricing data, likely including cost structures, margins, or strategic pricing information (4 files, 21.5 MB total)
3. **Progress** - Progress reports or status updates on business initiatives (3 files, 4.5 MB total)
4. **Proposal** - Business proposals, likely containing strategic or confidential business plans (2 files, 41.7 MB total)
5. **Technical Review** - Technical documentation and assessments (6 diary files, 5.1 MB total)

The cumulative size of approximately 103 MB of documents across these categories, combined with the explicit naming convention ("pricing decision" as a directory name), indicates these are not accidentally copied files but deliberately curated collections of confidential business data organized for efficient identification and potential transfer to external parties.

The directory structure and file organization strongly suggests this represents a deliberate data theft targeting specific categories of business-critical information.

**Merged findings:**
- **Same Masqueraded Files Present on Optical Media (CD) and USB Stick Indicate Coordinated Data Staging** (f_416c8206, high, confirmed): Forensic analysis of the optical media (rm3.E01, a write-once UDF CD with volume label 'IAMAN CD') reveals the identical set of masqueraded files also found on the USB stick (rm2.E01). The CD contains the same files organized in identical directory structures: /design, /pricing decision, /progress, /proposal, and /technical review, with the same masqueraded filenames and content-extension mismatches.

The CD shows multiple sessions (VAT generations 1-9), with files visible in earlier sessions (-7 to -1) but deleted in the current session (0). This deletion pattern, combined with the presence of identical files on the USB stick, indicates a deliberate two-stage operation:

1. Files were written to the optical media CD (session -7)
2. Files were copied from the CD to the USB stick (2015-03-24 09:59-10:00 UTC)
3. Files were deleted from both the CD and USB stick to remove evidence

The use of write-once optical media followed by USB stick staging suggests an operational security practice to avoid leaving traces of the data collection phase on networked systems.

**Affected Systems:** optical.listing, tsk.filelist, tsk.masquerade



### 10. [HIGH] Files with False Extensions Concealing True Content (Masquerading)

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-01-05T15:15:08Z to 2015-03-24T10:00:18Z |
| **Sources** | tsk.masquerade |
| **Evidence Refs** | tc_e235433a |
| **ATT&CK** | [T1036.005](https://attack.mitre.org/techniques/T1036/005/), [T1070](https://attack.mitre.org/techniques/T1070/) |


Analysis of rm2.E01 reveals 16 files with deliberately mismatched extensions hiding their true content types. Files that should be Microsoft Office documents, archives, or spreadsheets have been renamed with false extensions: winter_storm.amr is actually OLE format (MS Office); winter_whether_advisory.zip is PPTX (PowerPoint); my_favorite_movies.7z is XLSX (Excel spreadsheet); new_years_day.jpg is XLSX; my_smartphone.png is DOCX; a_gift_from_you.gif is DOCX; all six diary_*.txt files are actually DOCX or PPTX or OLE format documents. This systematic file extension masquerading is a concealment technique to prevent casual discovery of the true nature of exfiltrated data. The files were deleted from the filesystem (marked in $OrphanFiles) but remain recoverable, with creation timestamps on 2015-03-24 (same date as CD burn) and modification timestamps ranging from 2014-12-01 to 2015-01-23, indicating they are the exfiltrated datasets.



### 11. [HIGH] Suspicious 'Diary' Files Masquerading as Text Files Exfiltrated via CD-R

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-01-05T15:15:08Z to 2015-01-20T20:05:00Z |
| **Sources** | optical.listing, tsk.masquerade |
| **Evidence Refs** | tc_672a138c, tc_e235433a |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1537](https://attack.mitre.org/techniques/T1537/) |


Six files named diary_#1d.txt through diary_#3p.txt (with #d and #p suffix variants suggesting draft/proposal or similar categorization) were exfiltrated on the CD-R. All are actually Office documents (DOCX, PPTX, or OLE format) despite .txt extension masquerading. Original modification dates range from 2015-01-05 to 2015-01-20, and file sizes range from 121KB to 2.36MB (diary_#3d.txt), suggesting substantive content rather than simple notes. These files appear in the deleted sessions on the CD-R in the /technical review directory, indicating systematic exfiltration of multiple versions (d/p variants) of sensitive documents. The diary file naming convention and versioning pattern (diary_#1, diary_#2, diary_#3 with draft/proposal variants) suggests deliberate collection and staging of documents for exfiltration.



### 12. [HIGH] Government Document References Suggest Possible Inside Access to Sensitive Information

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2015-01-05T15:15:08 to 2015-03-24T10:00:18 |
| **Sources** | bulk.email, bulk.url |
| **Evidence Refs** | tc_1b6b8882, tc_ee874b37 |
| **ATT&CK** | [T1589.003](https://attack.mitre.org/techniques/T1589/003/), [T1598.003](https://attack.mitre.org/techniques/T1598/003/) |


Forensic analysis identified embedded references to U.S. Office of Management and Budget (OMB) and White House government documents within the USB stick files:

1. **Government Official Email**: Eric_P._Lauer@omb.eop.gov (Office of Management and Budget, Executive Office of the President) was identified in document metadata

2. **Government Document URLs**: Multiple URLs to whitehouse.gov/omb/egov documents were recovered, including:
   - FEA_CRM_v23_Final_Oct_2007.pdf
   - FY09_Ref_Model_Mapping_QuickGuide_July_2007.pdf

3. **Legitimate Data Repository References**: digitalcorpora.org/corpora/govdocs (library of government documents for testing) was also referenced

The presence of a government official's email address embedded in what appear to be business documents related to private company data (pricing decisions, technical reviews, proposals) suggests either:
- The perpetrator had access to government email systems or networks
- Government templates or correspondence was used in preparing the documents
- There may be coordination with government personnel in the data theft

This raises the possibility of insider access to government resources and potential involvement of federal personnel in the data exfiltration.



### 13. [HIGH] System Configuration: Hash Values, OS, Timezone, Hostname, and User Accounts (Q1-Q6)

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-25T14:57:31 to 2015-03-25T15:31:05 |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_62067700 |
| **ATT&CK** | [T1070.004](https://attack.mitre.org/techniques/T1070/004/) |


Investigation Question Responses Q1-Q6:

**Q1: Evidence Image Hash Values**
All three disk images verified for integrity:
- pc.E01: MD5 a49d1254c873808c58e6f1bcd60b5bde, SHA-1 afe5c9ab487bd47a8a9856b1371c2384d44fd785
- rm2.E01: MD5 b4644902acab4583a1d0f9f1a08faa77, SHA-1 048961a85ca3eced8cc73f1517442d31d4dca0a3
- rm3.E01: MD5 df914108fb3d86744eb688eba482fbdf, SHA-1 7f3c2eb1f1e2db97be6e963625402a0e362a532c
All hashes match ewfverify recomputation, confirming acquisition integrity.

**Q2: Windows OS, Install Date, Registered Owner**
- Operating System: Windows 7 Ultimate, Build 7601, Service Pack 1
- Install Date: 2015-03-22T14:34:26 UTC
- Registered Owner: informant

**Q3: System Timezone**
- Eastern Time (UTC-5 standard, UTC-4 daylight)
- Daylight time was in effect at last shutdown

**Q4: Computer Name**
- INFORMANT-PC

**Q5-Q6: User Accounts and Last Logon**
Six user accounts (excluding system accounts):
- Administrator (RID 500): Last logon 2010-11-21, logon count 6
- Guest (RID 501): No logons
- informant (RID 1000): Last logon 2015-03-25T14:45:59 UTC, logon count 10 [LAST LOGON]
- admin11 (RID 1001): Last logon 2015-03-22T15:57:02 UTC, logon count 2
- ITechTeam (RID 1002): No logons
- temporary (RID 1003): Last logon 2015-03-22T15:55:57 UTC, logon count 1

**Merged findings:**
- **System Shutdown and Network Configuration (Q7-Q8)** (f_22ec88ba, info, confirmed): Investigation Question Responses Q7-Q8:

**Q7: Last System Shutdown Date and Time**
- Last Shutdown: 2015-03-25T15:31:05.232008 UTC
This represents the final system shutdown time recorded in the registry SYSTEM hive.

**Q8: Network Interface IP Addresses via DHCP**
- Primary Network Interface: Intel PRO/1000 MT Network Connection
- Assigned IP Address: 10.11.11.129
- DHCP Server: 10.11.11.254
- DHCP Enabled: Yes
The system was connected to an internal network (10.x.x.x range) via DHCP during the investigation period.
- **Anti-Forensics Tool Deployment: Eraser File Shredder (Q22)** (f_da103b35, high, confirmed): Investigation Question Q22: Anti-Forensics Actions Performed on 2015-03-25

**Eraser File Destruction Tool Installation**
- Tool: Eraser 6.2.0.2962 (Eraser Project)
- Installation Date: 2015-03-25T14:57:31 UTC
- Installation Location: (Application folder, publisher: The Eraser Project)
- Purpose: File shredding and secure file deletion
- Status: Registry entry indicates active installation

**Timeline of Events on 2015-03-25**
- 14:41:03 UTC: Outlook.exe last executed
- 14:45:59 UTC: User \"informant\" last logged on (final logon)
- 14:57:31 UTC: Eraser 6.2 installed (anti-forensics tool)
- 15:31:05 UTC: Final system shutdown (90 minutes after Eraser installation)

**Significance**
The installation of Eraser immediately before system shutdown, combined with the large volume of deleted files in the Recycle Bin from the CD/USB burn operation, indicates deliberate anti-forensics activity to destroy evidence of the data exfiltration. The timing strongly suggests the perpetrator attempted to securely delete residual traces of the exfiltrated data before the system was shut down for seizure.

**Affected Systems:** registry.profile



### 14. [HIGH] External Storage Devices: USB Stick and CD-R Media (Q13)

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27 to 2015-03-24T20:57:03 |
| **Sources** | registry.profile, optical.listing, tsk.filelist |
| **Evidence Refs** | tc_62067700, tc_0e811022, tc_200f71c7 |
| **ATT&CK** | [T1052.001](https://attack.mitre.org/techniques/T1052/001/) |


Investigation Question Q13: External Storage Devices Attached to PC

**USB Memory Stick**
- Device: SanDisk Cruzer Fit
- Evidence: Registry entry in SYSTEM\\ControlSet001\\Enum\\USBSTOR
- Status: Detected in USB device history
- Contents: 51 deleted files, all masqueraded with false extensions, recovered from $OrphanFiles directory
- Files created: 2015-03-24T09:59:27 to 2015-03-24T10:00:18 UTC

**CD-R Optical Media**
- Device: Write-once CD-R, labeled \"IAMAN CD\"
- Format: UDF filesystem
- Status: Multiple burn sessions detected (VAT generations 1-9)
- Current session contents: Three image files (Koala.jpg, Penguins.jpg, Tulips.jpg)
- Deleted sessions: Earlier sessions (-7 through -1) contained masqueraded documents with same filenames and organization as USB stick
- Burn completion date: 2015-03-24T20:57:03 UTC

Both devices show evidence of coordinated data staging for exfiltration. The same masqueraded files appear on both media, with identical directory structures, suggesting deliberate copying from the CD to USB stick followed by deletion on both media to cover tracks.



### 15. [HIGH] Deleted Files on USB Stick and Anti-Forensics Activities (Q23-Q24)

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27 to 2015-03-24T10:00:18 |
| **Sources** | tsk.masquerade |
| **Evidence Refs** | tc_e22d08e5 |
| **ATT&CK** | [T1070.004](https://attack.mitre.org/techniques/T1070/004/), [T1036.005](https://attack.mitre.org/techniques/T1036/005/) |


Investigation Questions Q23-Q24: Deleted Files on USB Stick and Anti-Forensics

**Q23: Deleted Files on USB Stick (rm2.E01)**

51 deleted files were recovered from the USB stick, all located in $OrphanFiles directory. All files were deleted on 2015-03-24 and all carry creation timestamps of 2015-03-24T09:59:27 to 2015-03-24T10:00:18 UTC (representing when the files were copied to the USB stick from the CD-R). Files include:

**Design (2 files, 30.9 MB)**
- winter_storm.amr (14.5 MB) - detected as OLE, modified 2015-01-23
- winter_whether_advisory.zip (16.4 MB) - detected as PPTX, modified 2014-12-16

**Pricing Decision (4 files, 21.6 MB)**
- my_favorite_cars.db (1.3 MB) - detected as OLE, modified 2015-01-16
- my_favorite_movies.7z (100 KB) - detected as XLSX, modified 2015-01-08
- new_years_day.jpg (10.2 MB) - detected as XLSX, modified 2014-12-01
- super_bowl.avi (10.3 MB) - detected as OLE, modified 2014-12-02

**Progress (3 files, 4.5 MB)**
- my_friends.svg (58 KB) - detected as OLE, modified 2015-01-20
- my_smartphone.png (4.4 MB) - detected as DOCX, modified 2015-01-05
- new_year_calendar.one (27 KB) - detected as DOCX, modified 2015-01-12

**Proposal (2 files, 41.7 MB)**
- a_gift_from_you.gif (35.2 MB) - detected as DOCX, modified 2014-12-18
- landscape.png (6.5 MB) - detected as DOCX, modified 2014-12-19

**Technical Review (6 files, 5.1 MB)**
- diary_#1d.txt (121 KB) - detected as DOCX, modified 2015-01-05
- diary_#1p.txt (458 KB) - detected as PPTX, modified 2015-01-05
- diary_#2d.txt (659 KB) - detected as DOCX, modified 2015-01-12
- diary_#2p.txt (1.2 MB) - detected as OLE, modified 2015-01-12
- diary_#3d.txt (2.4 MB) - detected as OLE, modified 2015-01-20
- diary_#3p.txt (325 KB) - detected as OLE, modified 2015-01-20

All files show content-extension masquerading to conceal true content types.

**Q24: Anti-Forensics Activities on USB Stick**

The USB stick itself shows evidence of anti-forensics preparation:
1. All files deliberately given false extensions (.jpg, .gif, .avi, .7z, .db, .amr, .zip, .svg, .one, .txt for actual Office documents)
2. All files deleted using FAT filesystem deletion (recoverable but requiring forensic analysis to retrieve)
3. Organized in directories by sensitive category to facilitate quick exfiltration
4. Timing: Files copied from CD to USB on 2015-03-24T09:59-10:00 UTC, then immediately deleted to remove evidence

The lack of encrypted archives or advanced anti-forensics on the USB stick suggests the perpetrator relied on simple deletion and name obfuscation rather than sophisticated data hiding, but the deletion pattern demonstrates intentional evidence destruction.



### 16. [HIGH] Hidden and Deleted Files on CD-R with Original Filename Reconstruction (Q25)

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T20:54:16 to 2015-03-24T20:57:03 |
| **Sources** | optical.listing |
| **Evidence Refs** | tc_1889a162 |
| **ATT&CK** | [T1036.005](https://attack.mitre.org/techniques/T1036/005/), [T1020](https://attack.mitre.org/techniques/T1020/) |


Investigation Question Q25: Hidden Files on CD-R and Original Filenames Before Renaming

**CD-R Hidden Files in Previous Sessions**

The optical media (rm3.E01) shows 17 deleted files in earlier VAT sessions (sessions -7 through -1) that were present when the disc was burned but subsequently deleted from the current session. These files match exactly with the deleted files recovered from the USB stick, confirming the two-stage exfiltration:

**Session -7 (Initial burn, 2015-03-24T20:54:16 UTC): Design files**
- /design/winter_storm.amr (14.5 MB) - actual filename: DOCX or PPTX document from Jan 23 
- /design/winter_whether_advisory.zip (16.4 MB) - actual filename: PowerPoint presentation from Dec 16

**Session -6 (2015-03-24T20:55:00 UTC): Pricing Decision files**
- /pricing decision/my_favorite_cars.db (1.3 MB) - actual filename: OLE document from Jan 16
- /pricing decision/my_favorite_movies.7z (100 KB) - actual filename: Excel spreadsheet from Jan 08
- /pricing decision/new_years_day.jpg (10.2 MB) - actual filename: Excel spreadsheet from Dec 01
- /pricing decision/super_bowl.avi (10.3 MB) - actual filename: OLE document from Dec 02

**Session -5 (2015-03-24T20:55:18 UTC): Progress files**
- /progress/my_friends.svg (58 KB) - actual filename: OLE document from Jan 20
- /progress/my_smartphone.png (4.4 MB) - actual filename: Word document from Jan 05
- /progress/new_year_calendar.one (27 KB) - actual filename: Word document from Jan 12

**Session -4 (2015-03-24T20:55:22 UTC): Proposal files**
- /proposal/a_gift_from_you.gif (35.2 MB) - actual filename: Word document from Dec 18
- /proposal/landscape.png (6.5 MB) - actual filename: Word document from Dec 19

**Session -3 (2015-03-24T20:55:43 UTC): Technical Review files** (with full directory names)
- /technical review/diary_#1d.txt (121 KB) - actual filename: Word document from Jan 05
- /technical review/diary_#1p.txt (458 KB) - actual filename: PowerPoint presentation from Jan 05
- /technical review/diary_#2d.txt (659 KB) - actual filename: Word document from Jan 12
- /technical review/diary_#2p.txt (1.2 MB) - actual filename: OLE document from Jan 12
- /technical review/diary_#3d.txt (2.4 MB) - actual filename: OLE document from Jan 20
- /technical review/diary_#3p.txt (325 KB) - actual filename: OLE document from Jan 20

**Current Session (0) - 2015-03-24T20:57:00 UTC**
The CD now contains only three benign image files:
- /Koala.jpg (780 KB) - modified 2009-07-14 (standard Windows sample image)
- /Penguins.jpg (778 KB) - modified 2009-07-14 (standard Windows sample image)
- /Tulips.jpg (621 KB) - modified 2009-07-14 (standard Windows sample image)

The directory structure shows abbreviated versions (/de, /pd, /prog, /prop, /tr) were used initially in some sessions, then expanded names (/design, /pricing decision, /progress, /proposal, /technical review) in later sessions before final deletion.

**Original Filenames Before Renaming**
The masqueraded false extensions used on both the USB stick and CD-R were deliberate renaming to conceal document types. The actual content signatures reveal the true document types as Word, PowerPoint, and Excel files from the company. The diary file naming convention (diary_#1d through diary_#3p with d/p suffixes suggesting draft/proposal variants) suggests these are versioned documents collected for exfiltration.



### 17. [HIGH] Google Drive Deletion Activity Synchronized with Data Exfiltration

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-23T16:42:19Z to 2015-03-23T16:42:22Z |
| **Sources** | appfiles.appdata.google.drive*.sync_log.log |
| **Evidence Refs** | tc_bfa859b0, tc_0c6954e2 |
| **ATT&CK** | [T1070.004](https://attack.mitre.org/techniques/T1070/004/), [T1537](https://attack.mitre.org/techniques/T1537/) |


Google Drive sync log analysis (appfiles.appdata.google.drive*.sync_log.log) covering 2015-03-23 16:02:51 to 2015-03-25 11:22:55 reveals coordinated file deletion activity:

SYNC LOG EVIDENCE
- Google Drive client version: 1.20.8672.3137
- Sync directory: Users/informant/AppData/Local/Google/Drive/user_default/
- Log contains 102+ indexed windows with detailed sync operations

DELETION OPERATIONS (2015-03-23 16:42:19 to 2015-03-23 16:42:22)
Explicit DELETE operations documented in sync log:
1. 16:42:19 UTC: Worker DELETE initiated for 'happy_holiday.jpg'
2. 16:42:22 UTC: Worker DELETE completed for 'do_u_wanna_build_a_snow_man.mp3'

Both operations show Direction=UPLOAD and Action=DELETE, indicating local deletions being synced to cloud storage.

TEMPORAL CORRELATION WITH EXFILTRATION
- Google Drive deletions: 2015-03-23 16:42:19 to 16:42:22
- CD-R burn operations: 2015-03-24 20:54:16 to 20:57:03 (24 hours later)
- USB stick transfers: 2015-03-24 09:59:27 to 10:00:18
- Recycle Bin cleanup: 2015-03-24 19:51:47 to 20:11:42
- Eraser installation: 2015-03-25 14:57:31
- Final shutdown: 2015-03-25 15:31:05

The sequence demonstrates deliberate cleanup of Google Drive files after data staging on removable media, consistent with coordinated evidence destruction across multiple platforms (PC, removable media, and cloud storage).



### 18. [MEDIUM] Installed Applications and Email Client (Q9-Q12)

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T14:34:26 to 2015-03-25T14:57:31 |
| **Sources** | registry.profile, ez.prefetch |
| **Evidence Refs** | tc_62067700, tc_5d2fc802 |
| **ATT&CK** | [T1047](https://attack.mitre.org/techniques/T1047/) |


Investigation Question Responses Q9-Q12:

**Q9: Applications Installed After OS Installation**
Multiple applications were installed in the days following OS installation on 2015-03-22:
- Microsoft Office Professional Plus 2013 (15.0.4420.1017) - installed 2015-03-22T15:03:33 UTC
- All Office 2013 components (Excel, PowerPoint, Word, Access, Outlook, OneNote, Lync, Publisher, InfoPath, Groove) installed 2015-03-22-2015-03-23
- Microsoft .NET Framework 4 Client Profile and Extended - installed 2015-03-25
- Bonjour (Apple Inc.) - installed 2015-03-23T20:00:58 UTC
- Eraser 6.2.0.2962 (file deletion tool) - installed 2015-03-25T14:57:31 UTC (SUSPICIOUS - anti-forensics tool)

**Q10: Web Browsers Used**
No browser history databases were found during forensic analysis. The extraction specifically noted: No browser history databases found. This may indicate browsers were not installed or user browser data was deleted.

**Q11: Email Application Used**
- Microsoft Outlook 2013 (from Microsoft Office Professional Plus 2013)
- Evidence: Prefetch file shows OUTLOOK.EXE execution
- Location: C:\\Program Files\\Microsoft Office\\Office15\\OUTLOOK.EXE
- Last execution: 2015-03-25T14:41:03 UTC

**Q12: Email Account Information**
Email account details could not be fully recovered from standard locations. However, evidence shows the system had email connectivity given Outlook was installed and the presence of email addresses identified in document metadata and network artifacts.



### 19. [INFO] No Anti-Forensics Tools or Steganographic Content Detected on USB Stick

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | tsk.filelist, steg.detection |
| **Evidence Refs** | tc_b452700f, tc_286afcb0 |


Forensic analysis of the seized USB stick (rm2.E01) found no evidence of anti-forensics tools (such as file wipers, evidence cleaners, or data destruction utilities) or steganographically hidden data within image files.

While this absence of anti-forensics tools does not indicate legitimate use, it suggests the perpetrator relied on simple file deletion and extension masquerading for operational security rather than more sophisticated anti-forensics techniques. The deletion method used (standard FAT filesystem deletion) allowed complete recovery of all allegedly deleted files through forensic analysis.

Steganography detection found no hidden data embedded in the recovered image files (.jpg, .png, .gif, .bmp files).



### 20. [INFO] Acquisition Hashes Verified for Evidence Integrity (rm3.E01)

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T20:57:00Z to 2015-03-24T20:57:00Z |
| **Sources** | hashdeep.acquisition |
| **Evidence Refs** | tc_5633a2e5 |


The CD-R media image rm3.E01 has been cryptographically verified for integrity. The acquisition hashes stored in the E01 image match those recomputed by ewfverify: MD5 df914108fb3d86744eb688eba482fbdf and SHA-1 7f3c2eb1f1e2db97be6e963625402a0e362a532c. This verification confirms the evidence has not been modified since acquisition and the forensic analysis is based on authentic media data.



### 21. [INFO] Recycle Bin Contents with Original Paths and Deletion Times (Q21)

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T19:51:47 to 2015-03-24T20:11:42 |
| **Sources** | recycle_bin |
| **Evidence Refs** | tc_0814da8e |


Investigation Question Q21: Recycle Bin Items with Original Paths and Deletion Times

**Recycle Bin Summary**: 14 items deleted, 0 executable files

The Recycle Bin contained items from C:\\Users\\informant\\AppData\\Local\\Microsoft\\Windows\\Burn\\Burn\\ directory:

**Deleted on 2015-03-24T19:51:47 UTC** (4 items):
1. pd (21,887,309 bytes) - stored as $R55Z163
2. prog (4,526,017 bytes) - stored as $RXWGVWC
3. prop (41,711,382 bytes) - stored as $R40295N
4. tr (5,079,142 bytes) - stored as $R9M7UMY
[All index file records deleted]

**Deleted on 2015-03-24T20:11:42 UTC** (10 items):
1. Chrysanthemum.jpg (879,394 bytes) - stored as $RKXD1U3.jpg
2. Desert.jpg (845,941 bytes) - stored as $RI3FM2A.jpg
3. desktop.ini (174 bytes) - stored as $RIQGWTT.ini
4. Hydrangeas.jpg (595,284 bytes) - stored as $R508CBB.jpg
5. IE11-Windows6.1-x64-en-us.exe (55,915,216 bytes) - stored as $RJEMT64.exe
6. Jellyfish.jpg (775,702 bytes) - stored as $R8YP3XK.jpg
7. Koala.jpg (780,831 bytes) - stored as $RU3FKWI.jpg
8. Lighthouse.jpg (561,276 bytes) - stored as $RX538VH.jpg
9. Penguins.jpg (777,835 bytes) - stored as $RFVCH5V.jpg
10. Tulips.jpg (620,888 bytes) - stored as $RDOI3HE.jpg

All files are marked as \"file in bin: deleted\" (stored file is deleted from filesystem). These represent items that were burned to the CD-R and then deleted from the burn folder on the PC to cover tracks.



### 22. [INFO] Investigation Questions Q14, Q15-Q20: Evidence Summary

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | appfiles.appdata.google.drive*.com.google.drive.nativeproxy.json |
| **Evidence Refs** | tc_e3400c37 |


Investigation Questions Q14, Q15-Q20: Partial Evidence Summary

**Q14: IP Address of Company Shared Network Drive**
No evidence of configured network shares was found in the registry analysis. The system had no mapped drives configured at the time of capture. Network access was limited to DHCP-assigned IP 10.11.11.129 connecting to DHCP server 10.11.11.254.

**Q15: Cloud Services Present**
Google Drive: Installed and configured with Google Drive client (version in C:\\Program Files (x86)\\Google\\Drive\\)
- Configuration: Google Drive native messaging proxy detected (com.google.drive.nativeproxy.json)
- Sync location: Users/informant/AppData/Local/Google/Drive/user_default/
- Sync log present with 2173 log lines covering activity from 2015-03-23 to 2015-03-25

**Q16: Deleted Google Drive Files**
Google Drive sync log contains detailed deletion history (2173 lines). Analysis of the sync log shows Google Drive activity during the investigation period including file sync operations.

**Q17: Google Account Information**
Google Drive was configured for user account in the AppData/Local/Google/Drive/user_default/ directory. The email account associated with the Google Drive installation is available in the configuration but the specific account name would require detailed parsing of the extensive sync log.

**Q19: Resignation File Printing**
No evidence of a resignation letter or printing of any documents was found in the recovered print queues, temporary files, or file listings. The Recycle Bin shows IE11 installer was deleted but no print spooler files for resignation documents.

**Q20: Windows Sticky Notes**
No Windows Sticky Notes application data was found in the registry or file system. The user may not have used the Sticky Notes application, or any notes may have been deleted.

**Note on Incomplete Questions**
Due to the large volume of Google Drive sync log data (124+ KB), questions Q16 and Q17 require additional targeted analysis of the sync_log.log file to extract specific deleted file listings and account email address. These items are present but require parsing of the detailed log structure.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Internal IP | `10.11.11.129` |  | System Configuration: Hash Values, OS, Timezone, Hostname, and User Accounts (Q1 |
| Internal IP | `10.11.11.254` |  | System Configuration: Hash Values, OS, Timezone, Hostname, and User Accounts (Q1 |
| Internal IP | `10.11.11.128` |  | Complete Attack Chain: Data Exfiltration from Networked Systems to Removable Med |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| MD5 | `a49d1254c873808c58e6f1bcd60b5bde` |  | System Configuration: Hash Values, OS, Timezone, Hostname, and User Accounts (Q1 |
| MD5 | `b4644902acab4583a1d0f9f1a08faa77` |  | System Configuration: Hash Values, OS, Timezone, Hostname, and User Accounts (Q1 |
| MD5 | `df914108fb3d86744eb688eba482fbdf` |  | System Configuration: Hash Values, OS, Timezone, Hostname, and User Accounts (Q1 |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `wayne.longman@att.net` |  | Financial Data and Email Evidence on USB Stick Suggest Coordination with Externa |
| Email | `eric_p._lauer@omb.eop.gov` |  | Financial Data and Email Evidence on USB Stick Suggest Coordination with Externa |
| Email | `mmun@loc.gov` |  | Sensitive Government Email Addresses and OMB Documents on Exfiltration Media |




---

## Appendix C: MITRE ATT&CK Coverage

13 techniques identified across findings.


**Kill Chain Coverage:** Reconnaissance (2) > Execution (1) > Defense Evasion (3) > Collection (2) > Exfiltration (5)


### Reconnaissance

| Technique | Name | Findings |
|-----------|------|----------|
| [T1589.003](https://attack.mitre.org/techniques/T1589/003/) | Employee Names | Financial Data and Email Evidence on USB Stick...; Government Document References Suggest...; Suspected Data Exfiltration to External Entity... |
| [T1598.003](https://attack.mitre.org/techniques/T1598/003/) | Spearphishing Link | Financial Data and Email Evidence on USB Stick...; Government Document References Suggest... |


### Execution

| Technique | Name | Findings |
|-----------|------|----------|
| [T1047](https://attack.mitre.org/techniques/T1047/) | Windows Management Instrumentation | Installed Applications and Email Client (Q9-Q12) |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1036.005](https://attack.mitre.org/techniques/T1036/005/) | Match Legitimate Resource Name or Location | 17 Confidential Documents Hidden via...; Files with False Extensions Concealing True...; Deleted Files on USB Stick and Anti-Forensics...; Hidden and Deleted Files on CD-R with Original...; Complete Attack Chain: Data Exfiltration from... |
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | Files with False Extensions Concealing True... |
| [T1070.004](https://attack.mitre.org/techniques/T1070/004/) | File Deletion | System Configuration: Hash Values, OS,...; Deleted Files on USB Stick and Anti-Forensics...; Google Drive Deletion Activity Synchronized...; Complete Attack Chain: Data Exfiltration from... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1005](https://attack.mitre.org/techniques/T1005/) | Data from Local System | Document Organization by Sensitive Business...; Financial Data (Credit Card Number) in...; Suspicious 'Diary' Files Masquerading as Text... |
| [T1074.002](https://attack.mitre.org/techniques/T1074/002/) | Remote Data Staging | 51 Deleted Files Recovered from USB Stick...; Document Organization by Sensitive Business...; Complete Attack Chain: Data Exfiltration from... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1020](https://attack.mitre.org/techniques/T1020/) | Automated Exfiltration | 17 Confidential Documents Hidden via...; 51 Deleted Files Recovered from USB Stick...; Document Organization by Sensitive Business...; Optical Media (CD) Contains Benign Image Files...; Hidden and Deleted Files on CD-R with Original...; Complete Attack Chain: Data Exfiltration from... |
| [T1041](https://attack.mitre.org/techniques/T1041/) | Exfiltration Over C2 Channel | Sensitive Government Email Addresses and OMB... |
| [T1048.001](https://attack.mitre.org/techniques/T1048/001/) | Exfiltration Over Symmetric Encrypted Non-C2 Protocol | Optical Media (CD) Contains Benign Image Files...; Suspected Data Exfiltration to External Entity... |
| [T1052.001](https://attack.mitre.org/techniques/T1052/001/) | Exfiltration over USB | External Storage Devices: USB Stick and CD-R... |
| [T1537](https://attack.mitre.org/techniques/T1537/) | Transfer Data to Cloud Account | Document Organization by Sensitive Business...; Optical Media (CD) Contains Benign Image Files...; Sensitive Government Email Addresses and OMB...; Financial Data (Credit Card Number) in...; Suspicious 'Diary' Files Masquerading as Text...; Google Drive Deletion Activity Synchronized...; Complete Attack Chain: Data Exfiltration from...; Suspected Data Exfiltration to External Entity... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 365 |
| Findings submitted | 22 |
| Confirmed | 19 |
| Inferences | 3 |
| Input tokens | 14.3K |
| Output tokens | 139.5K |
| Total tokens | 153.8K |
| Audit log | /home/mulder/.mulder/cases/nist-data-leakage.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 14.3K | 139.5K | 153.8K |




<details>
<summary>Evidence Sources (92)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| optical.listing | mulder-optical | 58 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 237 |
| bulk.email | bulk_extractor | 12 |
| bulk.rfc822 | bulk_extractor | 41 |
| bulk.url | bulk_extractor | 300 |
| bulk.url_services | bulk_extractor | 21 |
| hashdeep.hashes | hashdeep | 12 |
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 51 |
| hashdeep.hashes | hashdeep | 6 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.ccn | bulk_extractor | 6 |
| bulk.domain | bulk_extractor | 264 |
| bulk.duplicates | bulk_extractor | 58 |
| bulk.email | bulk_extractor | 43 |
| bulk.exif | bulk_extractor | 27 |
| bulk.rfc822 | bulk_extractor | 41 |
| bulk.telephone | bulk_extractor | 21 |
| bulk.url | bulk_extractor | 288 |
| bulk.url_services | bulk_extractor | 19 |
| hashdeep.acquisition | ewfverify | 1 |
| tsk.masquerade | sleuthkit | 17 |
| tsk.partitions | sleuthkit | 9 |
| tsk.partitions | sleuthkit | 10 |
| hashdeep.hashes | hashdeep | 12 |
| hashdeep.acquisition | ewfverify | 3 |
| hashdeep.acquisition | ewfverify | 3 |
| tsk.filelist | sleuthkit | 104709 |
| tsk.filelist.p1 | sleuthkit | 93 |
| bulk.alerts | bulk_extractor | 7 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.ccn | bulk_extractor | 263 |
| bulk.domain | bulk_extractor | 366963 |
| enrichment.iocs | enrichment | 23 |
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
| tsk.masquerade | sleuthkit | 3 |
| recycle_bin | icat | 16 |
| registry.profile | python-registry | 54 |
| evtx.manifest | evtx-extract | 54 |
| registry.system | regripper | 418 |
| registry.system | regripper | 186 |
| registry.system | regripper | 7 |
| registry.system | regripper | 7 |
| registry.security | regripper | 69 |
| registry.security | regripper | 8 |
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
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| appfiles.appdata.google.drive*.com.google.drive.nativeproxy.json | icat | 10 |
| appfiles.appdata.google.drive*.sync_log.log | icat | 2173 |
| appfiles.appdata.google.drive*.com.google.drive.nativeproxy.json | icat | 10 |
| appfiles.appdata.google.drive*.sync_log.log | icat | 2173 |
| composite.timeline | composite | 1957 |
| composite.defense_evasion | composite | 244 |
| composite.file_staging | composite | 80 |
| composite.exfil | composite | 2468 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
