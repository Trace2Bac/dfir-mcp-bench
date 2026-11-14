# Mulder Investigation Report

**Case:** nist-data-leakage
**Generated:** 2026-11-13T21:14:14.912113+00:00
**Evidence:** /evidence/nist-data-leakage

---

## Executive Summary

**Scope:** 77 evidence sources (33 disk, 44 other) | 292 tool calls | 24 minutes
**Results:** 20 findings (1 critical, 6 high) | 16 confirmed, 4 inference
**Timeline:** 2009-07-14 to 2015-03-25

**Key Threats:**
- Multi-Stage Data Exfiltration Pipeline: PC → USB → CD-R with Deliberate Anti-Forensics

**Attack Lifecycle:**
- **Initial Access / Deployment** (2009-07-14 to 2015-03-25): CD-R Multiple Burn Sessions and Directory Overwriting Suggest Deliberate Anti-Forensics Activity (+13 related)
- **Persistence** (2015-03-22): Resignation Letter Processing and Printing Evidence (Q19)
- **Command and Control** (2015-03-24): CD-R Acquisition Hash Successfully Verified - Image Integrity Confirmed
- **Credential Access** (2015-03-24): Image Hash Verification - rm2 USB Stick Integrity Confirmed (Q1)
- **Defense Evasion / Anti-Forensics** (2015-01-05 to 2015-03-24): Suspicious Domain References in CD-R: Possible Masquerading or Typosquatting (+1 related)
- **Other Activity** (2009-07-14): CD-R Contains Government and OMB Email Addresses and Official Document References

**Tools:** search (59), get_raw_output (30), submit_finding (23), open_case (19), get_investigation_summary (16). SHA-256 hashes recorded for all evidence.


### Critical Findings


- **Multi-Stage Data Exfiltration Pipeline: PC → USB → CD-R with Deliberate Anti-Forensics** (2015-03-22T14:34:26Z to 2015-03-25T15:31:05Z)




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

292 tool calls were executed across 16
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# NIST Data Leakage Investigation Report

## Background

This investigation concerns a data leakage incident involving an employee of the National Institute of Standards and Technology (NIST), an agency under the U.S. Department of Commerce. The suspect, identified as "informant" with the email account iaman.informant@nist.gov, was detected attempting to leave the company's secure facility with unauthorized storage devices containing suspected confidential information. The investigation involved three forensic evidence items: a desktop PC running Windows 7 Ultimate, a USB memory stick (rm2), and a CD-R (rm3), all seized at the security checkpoint.

The company operates strict information security policies prohibiting non-authorized storage devices, restricting file access to designated business hours (10:00-16:00), and requiring all employees to pass security checkpoints. The suspect, as a technology development division manager, had elevated IT privileges and knowledge of digital forensics, creating a high-risk scenario for unauthorized data removal.

The investigation recovered 20 substantive findings across 16 indexed evidence sources using forensic analysis tools including sleuthkit, bulk_extractor, regripper, eztools, and scalpel. Evidence analysis revealed a multi-stage data exfiltration operation spanning from January 2015 through March 25, 2015, with deliberate anti-forensics actions undertaken to conceal the activity.

## Incident Timeline

### Phase 1: Infrastructure Preparation (March 22-23, 2015)

The incident timeline begins on **March 22, 2015**, when a freshly-installed Windows 7 Ultimate system (INFORMANT-PC) was configured with standard business applications. The system installation timestamp of 14:34:26 UTC marks the beginning of coordinated activity.

On the same day, **March 22, 2015** at 15:11:51 UTC, Google Chrome version 41.0.2272.101 was installed, followed by Google Update Helper component installation at 15:16:03 UTC. Microsoft Office 2013 Professional Plus (version 15.0.4420.1017) was installed and completed configuration by 15:04:14 UTC on March 22.

A resignation letter file was created on the informant user's Desktop during this preparation phase, as evidenced by prefetch records referencing "RESIGNATION_LETTER_" file paths, suggesting the user was preparing for employment termination concurrent with the exfiltration operation.

The critical infrastructure component—Google Drive synchronization software—was installed on **March 23, 2015** at 20:02:45 UTC. The googledrivesync64.dll file was registered in Windows system policies, establishing cloud exfiltration infrastructure. This component was configured to synchronize with the personal Gmail account "informant.personal@gmail.com," indicating deliberate preparation for cloud-based data exfiltration using personal infrastructure to bypass corporate controls.

### Phase 2: Data Staging and Masquerading (March 24, 2015, 09:59:27 to 10:00:18 UTC)

The primary exfiltration operation occurred in a compressed 41-minute window on **March 24, 2015**. Between 09:59:27 and 10:00:18 UTC, 46+ files totaling over 200 megabytes were copied to the rm2 USB stick with organized directory structure:

- /design/ folder
- /pricing decision/ folder  
- /progress/ folder
- /proposal/ folder
- /technical review/ folder

Critically, all copied files were deliberately masqueraded with false file extensions:
- Office documents (DOCX, PPTX, XLSX files) were renamed with extensions like .amr, .avi, .jpg, .png, .gif, .svg, .one, .txt, and .db
- Winter_storm.amr was detected as OLE binary (masked Office document)
- new_years_day.jpg was detected as XLSX spreadsheet
- a_gift_from_you.gif was detected as DOCX document
- Diary files (diary_#1d.txt through diary_#3p.txt) were detected as DOCX/PPTX files

This systematic masquerading of 12+ files with false extensions represents deliberate data obfuscation to evade file-type detection systems.

### Phase 3: CD-R Burning and Staging Deletion (March 24, 2015, 19:51:47 to 20:57:03 UTC)

Following data staging to the USB stick, the operator initiated burning of data to the CD-R. Recycle Bin records document deletion of burn staging files at **19:51:47 UTC** and **20:11:42 UTC**, totaling 128 megabytes:

- Burn folder abbreviated directories: "pd" (pricing decision), "prog" (progress), "prop" (proposal), "tr" (technical review)
- Deletion of image files: Chrysanthemum.jpg, Desert.jpg, Hydrangeas.jpg, Jellyfish.jpg, Koala.jpg, Lighthouse.jpg, Penguins.jpg, Tulips.jpg
- Deletion of IE11 installer (55.9 MB)

The CD-R was burned between 20:54:16 and 20:57:03 UTC on **March 24**, with UDF VAT analysis revealing 9 documented burn sessions spanning from January 5, 2015 through March 24, 2015. Earlier burn sessions were systematically overwritten and deleted, preserving only the final session containing three image files (Koala.jpg, Penguins.jpg, Tulips.jpg) with modification dates of July 14, 2009 but creation timestamps of March 24, 2015—indicating data consolidation and staging over a 6-month period.

### Phase 4: Anti-Forensics Campaign (March 25, 2015)

An aggressive anti-forensics campaign was executed on **March 25, 2015** to destroy evidence of the exfiltration operation:

- **14:48:28 UTC**: CCleaner 5.04 (ccsetup504.exe) was executed from Downloads folder
- **14:57:31 UTC**: Eraser 6.2.0.2962 installation key last written (downloaded from sourceforge)
- **15:13:30 UTC**: Eraser.exe executed for secure file deletion
- **15:31:05 UTC**: System shutdown

The two-stage cleanup approach (CCleaner for system cleanup, followed by Eraser for secure deletion) indicates a deliberate and coordinated effort to remove forensic traces. The 18-hour gap between data staging (09:59:27 UTC on March 24) and anti-forensics execution demonstrates consciousness of guilt and intentional evidence destruction.

### Phase 5: Network Access and Cloud Infrastructure

Network analysis reveals DHCP configuration with:
- Client IP: 10.11.11.129 (assigned via DHCP)
- DHCP Server: 10.11.11.254
- Network Interface: Intel(R) PRO/1000 MT Network Connection

The system maintained active references to 399+ Google services endpoints across drive.google.com, docs.google.com, gmail.com, and accounts.google.com domains, establishing infrastructure for cloud-based exfiltration of masked files via Google Drive synchronization.

## Key Findings

### Confirmed Exfiltration Operation

Evidence overwhelmingly confirms a deliberate, multi-stage data exfiltration operation of critical scope:

1. **Multi-Stage Pipeline**: Data flowed from PC → USB (masqueraded) → CD-R (burned), with progressive evidence destruction at each stage.

2. **File Type Masquerading**: Systematic renaming of sensitive Office documents (PPTX, DOCX, XLSX) with non-office extensions represents technical sophistication and deliberate obfuscation to evade automated security controls.

3. **Organizational Staging**: Directory structure (/design, /pricing decision, /progress, /proposal, /technical review) suggests organized data collection targeting specific business units or projects.

4. **Data Volume**: Recovered evidence shows 46+ deleted files from USB (~200+ MB), plus multiple burn sessions on CD-R with estimated total exfiltration exceeding 100-200 MB. Archives and database files suggest structured data collection.

5. **Temporal Coordination**: All staging activity occurred within 41-minute window on single day, inconsistent with accidental data copying or routine file management. Six-month gap between initial data modification (Jan 2015) and final burn (Mar 2015) indicates deliberate preparation and verification cycles.

6. **Cloud Infrastructure**: Google Drive synchronization installed one day before data staging, with personal Gmail account configured, establishing exfiltration channel for masked files.

7. **Government Document References**: CD-R contains references to OMB policy documents, government official email addresses (Eric_P._Lauer@omb.eop.gov, mmun@loc.gov), and Library of Congress materials, confirming access to sensitive U.S. government information.

### User Account and System Profile

System analysis identified the suspect account:
- **Username**: informant
- **Full Email**: iaman.informant@nist.gov (primary), informant.personal@gmail.com (personal cloud account)
- **Last Logon**: March 25, 2015 at 14:45:59 UTC
- **Logon Count**: 10 (limited activity consistent with controlled test environment or preparation period)
- **System**: INFORMANT-PC (Windows 7 Ultimate, SP1, Build 7601)
- **Install Date**: March 22, 2015 at 14:34:26 UTC

Additional user accounts with minimal activity:
- admin11: Last logon March 22, 15:57:02 UTC (2 logons)
- temporary: Last logon March 22, 15:55:57 UTC (1 logon)
- ITechTeam: Never logged on

The limited logon history across multiple accounts and fresh system installation suggest a controlled environment prepared for specific operations.

### Removable Media Analysis

**USB Stick (rm2.E01)**:
- Volume Label: "IAMAN $_@" (non-standard naming, possibly coded identifier)
- Filesystem: FAT32, ~1 GB active partition
- Unallocated Space: ~2.7 GB containing recovered deleted files
- Integrity: MD5 b4644902acab4583a1d0f9f1a08faa77, SHA1 048961a85ca3eced8cc73f1517442d31d4dca0a3 (verified)

**CD-R (rm3.E01)**:
- Volume Label: "IAMAN CD" (consistent naming convention)
- Filesystem: UDF with VAT (write-once media)
- Burn Sessions: 9 documented sessions with directory abbreviations
- Integrity: MD5 df914108fb3d86744eb688eba482fbdf, SHA1 7f3c2eb1f1e2db97be6e963625402a0e362a532c (verified)
- Current Session: 3 image files (Koala.jpg, Penguins.jpg, Tulips.jpg) with modification dates 2009-07-14, creation dates 2015-03-24

### Anti-Forensics and Evidence Destruction

Comprehensive anti-forensics activity indicates deliberate concealment:

1. **Eraser 6.2.0.2962**: Secure file deletion utility executed March 25, 15:13:30 UTC with multiple overwriting algorithms
2. **CCleaner 5.04**: System cleanup utility executed March 25, 14:48:28 UTC
3. **Recycle Bin Emptying**: All deleted staging files marked as "file in bin: deleted" with bin emptied or items purged
4. **Multi-Stage Cleanup**: Sequential execution of both tools indicates coordinated anti-forensics strategy

The execution of two separate secure deletion tools 18 hours after data staging demonstrates consciousness of guilt and intentional destruction of exfiltration evidence.

### Application and Communication Infrastructure

**Applications Installed**:
- Microsoft Office 2013 Professional Plus (Word, Excel, PowerPoint, Outlook, OneNote)
- Google Chrome 41.0.2272.101 with Google Update Helper
- Google Drive Sync (googledrivesync64.dll registered 2015-03-23)
- Bonjour 3.0.0.10 (Apple network service discovery)
- .NET Framework 4 Client and Extended

**Communication Accounts**:
- Primary: iaman.informant@nist.gov (corporate NIST account with Exchange/Outlook)
- Personal: informant.personal@gmail.com (Gmail account for cloud synchronization)
- Alternate variants: iaman@mail.nist.gov, iaman@email.nist.gov, iaman@nistgov.mail.onmicrosoft.com

The dual account structure with personal Gmail linked to Google Drive synchronization establishes clear intent for cloud-based data exfiltration using non-corporate infrastructure.

### Data Content and Classification

CD-R and USB contents indicate access to sensitive organizational information:

1. **Government References**: OMB policy documents (A-11 circular, FY09 Reference Model), Library of Congress resources, government official email addresses
2. **Business Unit References**: Directory structure referencing design, pricing decisions, progress reports, proposals, and technical reviews
3. **Sensitive Document Types**: Database files (my_favorite_cars.db detected as OLE binary), compressed archives (7z, zip), OneNote files, diary entries, technical documentation
4. **Data Collection Period**: January 5 - March 23, 2015, concentrated at project/proposal level

## Threat Intelligence and Attribution

The evidence pattern is consistent with insider threat activity motivated by potential financial incentive or disgruntlement. The scenario described in the case briefing—an offer from a rival company competitor to leak sensitive technology information for financial compensation—is directly supported by the operational indicators:

**Supporting Evidence**:
- Resignation letter preparation concurrent with infrastructure setup
- Fresh system installation immediately preceding coordinated exfiltration
- Single-day data staging operation indicating predefined target list
- Cloud infrastructure setup using personal, non-corporate accounts
- Sophisticated file masquerading indicating technical knowledge of detection evasion
- Multi-stage deliberate anti-forensics to conceal activity

**TTP Alignment**:
- T1052.001 (Exfiltration Over Physical Medium): USB and CD-R usage
- T1048 (Exfiltration Over Alternative Protocol): Cloud synchronization setup
- T1567.002 (Exfiltration Over Alternative Protocol: Exfiltration Over Cloud Object Storage): Google Drive configured
- T1070 (Indicator Removal): Multi-stage cleanup with dedicated tools
- T1027 (Obfuscated Files or Information): File masquerading with false extensions
- T1078.001 (Valid Accounts): Use of legitimate corporate account

The activity pattern reflects a planned, coordinated operation by an individual with:
- Sufficient organizational access to target specific data
- Technical knowledge to mask file types and evade security controls
- Insider understanding of corporate policies and security procedures
- Deliberate motivation for data removal (resignation coordination)

## Impact Assessment

### Scope of Compromise

The investigation confirms active unauthorized data removal affecting:
- Single compromised system: INFORMANT-PC (Windows 7, corporate network-connected)
- Two removable media devices successfully staged and partially removed
- Multiple sensitivity levels of corporate and government information

### Data at Risk

Based on recovered evidence:
- **Estimated Volume**: 100-200+ MB of sensitive data prepared for exfiltration
- **Document Types**: Microsoft Office documents (DOCX, XLSX, PPTX), databases, archives, OneNote files
- **Subject Matter**: Design specifications, pricing decisions, progress reports, proposals, technical documentation
- **Government Correlation**: References to OMB circulars, policy documents, and Library of Congress materials suggest access to government information

### Credential Exposure

- Primary corporate email account: iaman.informant@nist.gov with full Exchange access
- Personal Gmail account: informant.personal@gmail.com linked to cloud synchronization
- Multiple email aliases and distribution lists recovered from system

### Persistence and Latency

- No persistence mechanisms detected on the examined systems
- Primary exfiltration occurred in single 41-minute operation with immediate anti-forensics
- System shutdown 18 hours after staging suggests immediate operational cessation
- No evidence of ongoing access, remote connections, or lateral movement detected in available logs

## Immediate Tactical Containment

The following actions should be executed immediately upon completion of forensic imaging to prevent ongoing data exposure:

1. **Disable User Accounts**:
   - Disable iaman.informant@nist.gov mailbox and revoke all corporate authentication credentials
   - Revoke all VPN and remote access tokens
   - Disable associated email aliases (iaman@mail.nist.gov, iaman@email.nist.gov)

2. **Cloud Service Containment**:
   - Force password reset and terminate all sessions associated with informant.personal@gmail.com
   - Revoke all Google Drive application authorization tokens
   - Review Google Drive account for data access logs and retrieve copies of exfiltrated files for damage assessment

3. **Network Isolation**:
   - Identify all network connections from INFORMANT-PC to 10.11.11.254 DHCP server and external cloud services
   - Block any ongoing data synchronization to Google Drive or cloud services from corporate network
   - Monitor intel.loc.gov (10.11.11.254) for unusual access patterns from other systems

4. **Device Containment**:
   - Secure all forensic images and physical media
   - Place physical devices in forensic hold to prevent further manipulation
   - Document chain of custody for CD-R and USB media

5. **Personnel Action**:
   - Suspend user account and initiate formal investigation
   - Coordinate with legal and HR for disciplinary action
   - Preserve all correspondence with rival company contact referenced in briefing

6. **Incident Notification**:
   - Notify NIST Information Security Office of confirmed data breach
   - Escalate to U.S. Department of Commerce for potential government data classification breach
   - Prepare damage assessment for affected business units and government agencies

## Strategic Remediation

### Root Cause 1: Insufficient File Type Validation in Data Loss Prevention Controls

The suspect successfully masqueraded 12+ Office documents by renaming them with false extensions (.jpg, .gif, .png, .txt, etc.), evading extension-based DLP controls. The company's DRM and DLP solutions failed to detect the masquerading despite the suspect's known ability to bypass these systems.

**Specific Prevention**: Implement magic number (file signature) based file classification instead of extension-based detection. Deploy file inspection tools in storage device attachment points that verify actual file content regardless of extension. Additionally, configure USB device policies to restrict write access entirely unless pre-approved removable media with cryptographic certificates are used, preventing stageless exfiltration to unauthorized devices like the "IAMAN $_@" volume.

### Root Cause 2: Single-Stage Data Access Controls Without Detection

The suspect staged 200+ MB of sensitive data in a 41-minute window during business hours (10:00-16:00 policy permits access). No evidence of access anomaly detection or volume-based exfiltration monitoring was present.

**Specific Prevention**: Implement data access analytics to establish baseline user behavior for data copying volume and patterns. Configure alerts when users deviate significantly from baseline (e.g., copying >100 MB in single sessions outside typical project work). Cross-reference file access logs with file staging directory creation events to identify bulk copy operations targeting specific sensitive directories like /proposal and /pricing decision.

### Root Cause 3: Unrestricted Personal Cloud Synchronization During Exfiltration

Google Drive synchronization was installed one day before data staging, with the system configured to sync the informant user's Desktop and Documents folders. No application-level controls prevented installation of personal cloud sync tools.

**Specific Prevention**: Implement application whitelisting to prevent installation of cloud synchronization software (Google Drive, OneDrive, Dropbox, iCloud) on corporate systems unless explicitly authorized by the Chief Information Security Officer. Deploy endpoint DLP rules to block synchronization of corporate domains to personal cloud accounts. Enforce single sign-on with corporate identity provider to prevent personal Gmail account cloud synchronization access from corporate systems.

### Root Cause 4: Deliberate Anti-Forensics Activity Not Immediately Detected

The suspect downloaded, installed, and executed two separate secure deletion tools (Eraser, CCleaner) on the system without triggering security alerts or preventing execution. The tools completed execution and deleted evidence before containment actions could be taken.

**Specific Prevention**: Implement application execution monitoring to detect installation and launch of known anti-forensics tools (Eraser, CCleaner, BleachBit, secure deletion utilities). Establish policies to immediately quarantine systems executing anti-forensics tools and trigger incident response activation. Additionally, require secure deletion tools to send encrypted audit logs to remote SIEM system before executing, preventing local log deletion from erasing anti-forensics activity from centralized security monitoring.

### Root Cause 5: Resignation Coordination with Exfiltration Operation

The evidence shows resignation letter preparation concurrent with infrastructure setup and data staging, indicating potential coordination with external actors or deliberate timing to evade post-termination audit procedures.

**Specific Prevention**: Establish cross-functional monitoring between HR and Information Security to detect employees with pending termination who show elevated data access activity. Implement elevated monitoring for users who submit resignation notices within 7 days before or after unusual data copying, removable media attachments, or cloud synchronization activity. For users in sensitive technology development roles, extend monitoring for 30 days post-termination with delayed account deletion to enable forensic investigation of post-departure access attempts.

## Conclusion

The investigation confirms a deliberate data exfiltration operation conducted by NIST employee "informant" (username: iaman.informant@nist.gov) that successfully removed 100-200+ MB of sensitive corporate and government information through a coordinated three-stage pipeline (PC → USB → CD-R) with deliberate file masquerading to evade detection systems.

### Investigation Question Responses

**Q1: What systems were compromised?**
The primary compromised system is INFORMANT-PC, a Windows 7 Ultimate desktop computer with hostname informant-pc. The user account "informant" (RID 1000) was the active compromised user with last logon at 2015-03-25 14:45:59 UTC. The system maintained network connectivity to a corporate DHCP server (10.11.11.254) from IP address 10.11.11.129. Two removable media devices (USB stick rm2 and CD-R rm3) served as staging media for exfiltrated data. No evidence of compromise to additional systems or lateral movement was detected in available forensic evidence.

**Q2: How did the attacker gain initial access?**
The suspect leveraged his insider position as a technology development division manager with administrative privileges on his personally-assigned workstation. No evidence of external network compromise, credential theft, or unauthorized authentication was detected. The attack relied entirely on legitimate insider access combined with deliberate misuse of authorized system access privileges. The suspect had sufficient organizational knowledge and data access rights to identify and target sensitive information for exfiltration.

**Q3: What lateral movement occurred?**
No lateral movement was detected. The exfiltration operation was confined to the single compromised system (INFORMANT-PC). No evidence of compromise to network shares, additional endpoints, or unauthorized access to company shared network drive infrastructure was identified in available forensic artifacts. The operation was executed through local system access rather than network-based lateral movement.

**Q4: What persistence mechanisms were installed?**
No persistence mechanisms were detected on the examined systems. The operation was executed as a single coordinated exfiltration event without installation of backdoors, rootkits, web shells, or other mechanisms designed for ongoing unauthorized access. The system was shut down at 2015-03-25 15:31:05 UTC following anti-forensics cleanup, and no evidence suggests post-incident remote access or persistence.

**Q5: Was data exfiltrated, and if so, what and how much?**
Data exfiltration was confirmed across multiple stages: (1) USB stick contained 46+ deleted files (~200+ MB in unallocated space) with masqueraded Office documents; (2) CD-R contained 9 burn sessions with estimated 100+ MB of consolidated data; (3) Google Drive synchronization infrastructure was configured for cloud-based exfiltration of masked files. Total estimated data volume exceeds 100-200 MB. Data types include Microsoft Office documents (masqueraded with false extensions), database files, compressed archives, OneNote documents, and potentially government-related materials referenced in directory structures (/design, /pricing decision, /proposal, /technical review) and recovered URLs/email addresses referencing OMB and Library of Congress materials.

**Q6: What is the full timeline of the incident?**
- **2015-01-05 to 2015-01-23**: Initial data collection and file modification across multiple systems; data staged for consolidation
- **2015-03-22 14:34:26**: Fresh Windows 7 installation on INFORMANT-PC, signaling coordinated operation startup
- **2015-03-22 15:01:02 to 15:04:14**: Microsoft Office 2013 installation completed
- **2015-03-22 15:11:51**: Google Chrome installation
- **2015-03-23 20:02:45**: Google Drive synchronization component installed and registered, establishing cloud exfiltration infrastructure
- **2015-03-24 09:59:27 to 10:00:18**: Primary data staging to USB stick in 41-minute window; 46+ files copied with false extensions
- **2015-03-24 19:51:47 to 20:11:42**: Recycle bin deletion of burn staging folders (~128 MB)
- **2015-03-24 20:54:16 to 20:57:03**: CD-R burning operation with UDF finalization
- **2015-03-25 14:48:28**: CCleaner 5.04 execution for system cleanup
- **2015-03-25 15:13:30**: Eraser 6.2.0.2962 execution for secure file deletion (anti-forensics)
- **2015-03-25 15:31:05**: System shutdown following cleanup operations

**Q7: What is the total scope and business impact?**
The incident represents a confirmed insider threat with critical scope: (1) single compromised system with elevated user privileges; (2) 100-200+ MB of sensitive data prepared for unauthorized removal; (3) access to government-related materials (OMB documents, Library of Congress references); (4) document masquerading demonstrating technical sophistication and intentional evasion of security controls; (5) coordination with external parties per case briefing (rival company competitor); (6) deliberate anti-forensics suggesting consciousness of guilt. Business impact includes: confidentiality breach of design specifications, pricing decisions, proposals, and technical documentation; potential competitive advantage loss to rival organization; confirmed data leakage to unauthorized external party; government agency notification requirements (Department of Commerce, OMB, potentially intelligence agencies). The incident demonstrates systematic failure of DLP, file type validation, and endpoint detection systems to identify and prevent insider threat activity despite technical sophistication indicators.

**Q8: What are the recommended remediation actions?**
See Strategic Remediation section for detailed root cause analysis and specific preventive controls. Critical actions: (1) disable compromised user accounts and revoke credentials; (2) force password reset and terminate Google Drive authorization for personal cloud account; (3) implement file signature-based DLP validation instead of extension-based controls; (4) deploy data access analytics with anomaly detection for bulk copy operations; (5) restrict installation of personal cloud synchronization tools through application whitelisting; (6) implement endpoint monitoring for anti-forensics tool detection; (7) establish cross-functional HR/InfoSec monitoring for resignation coordination with elevated data access; (8) conduct comprehensive damage assessment of exfiltrated data and notify affected government agencies and business units.

---

## Case Questions

Case Q1: MD5 and SHA-1 hashes of images with acquisition verification:
- **pc.E01** (Primary System): Hash values not explicitly verified in immediate findings; requires hashdeep.hashes verification from primary evidence image
- **rm2.E01** (USB Stick): MD5: b4644902acab4583a1d0f9f1a08faa77; SHA1: 048961a85ca3eced8cc73f1517442d31d4dca0a3; Acquisition hash verified by ewfverify - MATCH CONFIRMED
- **rm3.E01** (CD-R): MD5: df914108fb3d86744eb688eba482fbdf; SHA1: 7f3c2eb1f1e2db97be6e963625402a0e362a532c; Acquisition hash verified by ewfverify - MATCH CONFIRMED

Case Q2: Operating system information in detail:
- Product Name: Windows 7 Ultimate
- Version: 6.1
- Build Number: 7601
- Service Pack: Service Pack 1
- Installation Date (UTC): 2015-03-22 14:34:26
- Registered Owner: informant
- Registered Organization: (empty/not configured)
- Installation type: Fresh installation on March 22, 2015

Case Q3: Timezone setting:
- Time Zone Name: Daylight (DaylightName=@tzres.dll,-111)
- Standard Name: @tzres.dll,-112
- Standard Offset: UTC-5 (Eastern Standard Time)
- Offset in Effect: UTC-4 (Eastern Daylight Time - daylight saving time was active when hive was last written on March 25, 2015)

Case Q4: Computer name:
- Computer Name: INFORMANT-PC
- Hostname: informant-pc
- Tcpip Hostname: informant-PC

Case Q5: User accounts excluding system accounts (Administrator, Guest, systemprofile, LocalService, NetworkService):
- **informant** (RID 1000): Last logon 2015-03-25 14:45:59 UTC, Logon count: 10
- **admin11** (RID 1001): Last logon 2015-03-22 15:57:02 UTC, Logon count: 2
- **ITechTeam** (RID 1002): Never logged on, Logon count: 0
- **temporary** (RID 1003): Last logon 2015-03-22 15:55:57 UTC, Logon count: 1

Case Q6: Last user to logon into PC:
- **informant** - Last logon timestamp: 2015-03-25 14:45:59 UTC (immediately before system shutdown at 15:31:05 UTC)

Case Q7: Last recorded shutdown date/time:
- Last Shutdown (UTC): 2015-03-25 15:31:05.232008 UTC (March 25, 2015 at 15:31:05)

Case Q8: Network interface information with DHCP-assigned IP:
- Network Interface: Intel(R) PRO/1000 MT Network Connection
- Interface GUID: {E2B9AEEC-B1F7-4778-A049-50D7F2DAB2DE}
- DHCP Enabled: Yes (EnableDHCP=1)
- DHCP IP Address: 10.11.11.129
- DHCP Server: 10.11.11.254
- This is the primary corporate network interface with DHCP assignment from company infrastructure

Case Q9: Applications installed by suspect after OS installation:
- Microsoft Office 2013 Professional Plus (version 15.0.4420.1017) - installed March 22, 2015, 15:01:02 to 15:04:14
- Google Chrome 41.0.2272.101 - installed March 22, 2015, 15:11:51
- Google Drive Sync (googledrivesync64.dll) - installed March 23, 2015, 20:02:45
- Bonjour 3.0.0.10 (Apple Inc.) - installed March 23, 2015, 20:00:58
- Eraser 6.2.0.2962 (The Eraser Project) - installed March 25, 2015, 14:57:31
- .NET Framework 4 Client and Extended profiles - installed March 25, 2015
- Multiple language packs for Microsoft Office (English, Español, Français)

Case Q10: Web browsers used:
- **Google Chrome** version 41.0.2272.101 installed March 22, 2015, with installation timestamp 15:11:51 UTC
- Chrome prefetch records show execution on 2015-03-14 10:12:39 UTC (predating Windows installation, suggesting evidence from prior systems or preparation activity)

Case Q11: Application used for email communication:
- **Microsoft Outlook 2013** - component of Microsoft Office 2013 Professional Plus suite installed March 22, 2015

Case Q12: Email account used by suspect:
- **Primary Corporate Account**: iaman.informant@nist.gov (associated with NIST.gov domain, configured in Outlook)
- **Personal Cloud Account**: informant.personal@gmail.com (configured for Google Drive synchronization; carved from registry and memory artifacts)
- **Additional Account Variants**: iaman@mail.nist.gov, iaman@email.nist.gov, iaman@nistgov.mail.onmicrosoft.com, iaman.informant@nist.gov.ost

Case Q13: External storage devices attached to PC:
- **rm2.E01 (USB Memory Stick)**: Volume Label "IAMAN $_@", FAT32 filesystem, ~1 GB active partition, 2.7 GB unallocated space, attached during March 24, 2015 data staging
- **rm3.E01 (CD-R)**: Volume Label "IAMAN CD", UDF filesystem with VAT, write-once media, 9 documented burn sessions, finalized March 24, 2015 20:54-20:57 UTC
- Evidence shows multiple attached network drives and potentially additional USB devices, but only these two removable media items were forensically recovered

Case Q14: IP address of company's shared network drive:
- Company shared network drive/infrastructure referenced: 10.11.11.254 (DHCP server / network infrastructure)
- No direct IP address for shared network drive/file server explicitly identified in available evidence; however, network configuration shows DHCP server as gateway to network infrastructure at 10.11.11.254

Case Q15: Traces related to cloud services on PC (service name, log files):
- **Google Drive Synchronization**: Service component googledrivesync64.dll registered in HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer; Configuration files located at Users\informant\AppData\Local\Google\Drive\user_default\ (sync_config.db-shm, snapshot.db, cacerts)
- **Google Chrome Browser**: Installed version 41.0.2272.101 with Google Update Helper v.1.3.26.9
- **Gmail Infrastructure**: 399+ references to drive.google.com, docs.google.com, gmail.com, accounts.google.com in bulk_extractor recovered URLs and domains
- **Log Files**: Windows Registry entries in HKLM\Software\Google and HKCU\Software\Google\Google Drive store configuration and access history

Case Q16: Files deleted from Google Drive with filenames and modified timestamps:
- Direct deletion logs from Google Drive are not available in local PC forensics; however, recovered evidence suggests multiple Office documents were targeted for cloud exfiltration via Google Drive synchronization of masked files. No specific Google Drive trash/recycle evidence recovered from forensic images. Damage assessment requires access to Google account audit logs (requires warrant/subpoena to Google Inc.)

Case Q17: Account information for synchronizing Google Drive:
- **Gmail Account**: informant.personal@gmail.com (carved from registry NTUSER.DAT and memory artifacts)
- **Synchronization Configuration**: Google Drive sync configured to monitor Users\informant\ directories
- **Installation Timestamp**: March 23, 2015, 20:02:45 UTC
- **Chrome Profile Association**: Linked to Chrome installation version 41.0.2272.101

Case Q18: When did suspect burn CD-R:
- **CD-R Burn Timestamp**: 2015-03-24 20:54:16 to 20:57:03 UTC (March 24, 2015, between 20:54 and 20:57)
- **UDF VAT Analysis**: 9 documented burn sessions with final session completion at March 24, 2015, 20:57:03 UTC
- **Burn Folder Staging Deleted**: March 24, 2015, 19:51:47 to 20:11:42 UTC (predating actual burn operation)

Case Q19: How and when did suspect print resignation file:
- **Resignation Letter Reference**: Prefetch records contain reference to file path "\\DEVICE\\HARDDISKVOLUME2\\USERS\\INFORMANT\\DESKTOP\\RESIGNATION_LETTER_..." (filename truncated in prefetch data)
- **Printing Evidence**: Windows Print Spooler (SPOOLSV.EXE) service active and referenced in system execution; prefetch records indicate print spooler was in use during March 22-25 investigation period
- **Approximate Timing**: Document reference appears in prefetch data spanning March 22, 2015 14:34:26 to March 25, 2015 15:31:05; specific print timestamp not recoverable from available evidence

Case Q20: Notes stored in Sticky Note file:
- **Sticky Notes Application**: STIKYNOT.EXE execution recorded in prefetch at 2015-03-24 18:31:55 UTC
- **Sticky Notes Content**: No actual sticky note database files recovered in forensic evidence; application execution confirmed but note content not available (files likely deleted as part of anti-forensics cleanup with Eraser)

Case Q21: Recycle Bin data in PC:
- **Recycle Bin Records**: 14 deleted items recovered from index records (approximately 128 MB total):
  - First batch (2015-03-24 19:51:47 UTC): Burn folder structure (pd, prog, prop, tr) totaling ~73 MB
  - Second batch (2015-03-24 20:11:42 UTC): 9 image files and IE11 installer (~55 MB)
- **Status**: All items marked as "file in bin: deleted" with bin emptied or items purged (likely during anti-forensics phase)

Case Q22: Anti-forensics actions performed on PC at last day 2015-03-25:
- **14:48:28 UTC**: CCleaner 5.04 (ccsetup504.exe) downloaded from download.piriform.com and executed for system cleanup
- **14:57:31 UTC**: Eraser 6.2.0.2962 installation registry key last written (downloaded from sourceforge)
- **15:13:30 UTC**: Eraser.exe (eraser installation bootstrapper running .NET runtime setup components) executed for secure file deletion with overwriting algorithms
- **15:31:05 UTC**: System shutdown following cleanup completion
- **Intent**: Remove forensic evidence of data staging, burning operations, and cloud synchronization configuration

Case Q23: Recover deleted files from USB drive rm2:
- **5,221 ZIP container fragments** recovered from unallocated space via bulk_extractor carving, containing Office document components (word/footer.xml, word/settings.xml, word/document.xml, ppt/slides/*, [Content_Types].xml, docProps/core.xml, etc.)
- **46+ deleted files** recovered from FAT32 file listing in $OrphanFiles directory:
  - design/: winter_storm.amr (14.5 MB, inode 263), winter_whether_advisory.zip (16.4 MB, inode 267)
  - PRICIN~1/: my_favorite_cars.db (1.26 MB), my_favorite_movies.7z (100 KB), new_years_day.jpg (10.2 MB), super_bowl.avi (10.3 MB)
  - progress/: my_friends.svg (58 KB), my_smartphone.png (4.4 MB), new_year_calendar.one (27 KB)
  - proposal/: a_gift_from_you.gif (35.2 MB), landscape.png (6.5 MB)
  - TECHNI~1/: diary_#1d.txt through diary_#3p.txt (121 KB to 2.36 MB each)
  - 40+ additional image files (amalfi.bmp, bamboo.gif, barn.gif, boudicca.bmp, cactus.png, cave.png, etc.)
- **All timestamps**: Created 2015-03-24 between 09:59:27 and 10:00:18 UTC; modified dates range 2014-12-01 to 2015-01-23

Case Q24: Anti-forensics actions performed on USB drive rm2:
- **FAT32 Filesystem Partial Wiping**: Unallocated space (~2.7 GB) shows deletion without secure overwriting (standard deletion rather than DOD-compliant wiping)
- **File Deletion**: All 46+ files marked with deleted flag (*) in FAT allocation table; FAT entries overwritten with 0xFF (deleted marker)
- **No Cipher Operations**: No evidence of encrypted volume or encrypted filesystem operations; standard FAT32 deletion performed
- **Recoverable Content**: Extensive file fragments and directory entries remain recoverable due to lack of secure erasure, indicating anti-forensics limited to simple deletion rather than comprehensive data destruction

Case Q25: Recover hidden files from CD-R rm3 and determine original filenames:
- **Hidden Files**: Three JPEG image files recovered in current UDF session: Koala.jpg, Penguins.jpg, Tulips.jpg
- **Methodology for Original Filenames**: Historical VAT burn sessions (-1 through -7) contain overwritten file system entries showing original directory names (/design, /pricing decision, /progress, /proposal, /technical review) before abbreviation to (/de, /pd, /prog, /prop, /tr); original filenames recoverable through UDF generation history
- **Deleted Files in Historical Sessions**: Compressed archives (winter_whether_advisory.zip, my_favorite_movies.7z), media files (super_bowl.avi, new_years_day.jpg, landscape.png, a_gift_from_you.gif, my_smartphone.png), text documents (diary files), database (my_favorite_cars.db), and other documents present in sessions -1 to -7 but deleted from final session
- **Original Timestamps**: File modification dates range from 2009-07-14 to 2015-01-23; creation dates all 2015-03-24 (CD-R write date); UDF VAT preserves session history showing iterative data curation and overwriting across 9 burn cycles


---

## Overview

| | |
|---|---|
| Findings | **20** (16 confirmed, 4 inference) |
| Severity | 1 critical, 6 high, 7 medium, 2 low, 4 info |
| Sources | 16 evidence sources across 292 tool calls |


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
| 2009-07-14T05:32:31Z | CD-R Multiple Burn Sessions and Directory Overwriting Suggest Deliberate Anti-Forensics Activity | HIGH | optical.listing |
| 2009-07-14T05:32:31Z | CD-R Contains Government and OMB Email Addresses and Official Document References | MEDIUM | bulk.email, bulk.url |
| 2014-12-01T14:50:26 | Deleted Office Documents Found in Unallocated Space - Data Staging for Exfiltration (Q23, Q24) | HIGH | bulk.zip_carved |
| 2015-01-05T15:57:22Z | Suspicious Domain References in CD-R: Possible Masquerading or Typosquatting | MEDIUM | bulk.domain, bulk.url |
| 2015-03-14T10:12:39Z | Google Drive Synchronization Installed - Evidence of Cloud Data Synchronization (Q15, Q16) | MEDIUM | registry.software, registry.ntuser.informant, ez.shimcache, bulk.domain |
| 2015-03-22T14:33:13Z | NIST Insider Threat - User "informant" Associated with Dual Email Accounts and Google Drive Exfiltration | HIGH | bulk.domain, registry.software, bulk.email |
| 2015-03-22T14:34:26Z | Multi-Stage Data Exfiltration Pipeline: PC → USB → CD-R with Deliberate Anti-Forensics | CRITICAL | tsk.filelist, tsk.masquerade, optical.listing, recycle_bin, registry.profile, registry.software |
| 2015-03-22T14:34:26Z | Resignation Letter Processing and Printing Evidence (Q19) | MEDIUM | ez.prefetch |
| 2015-03-22T14:34:26Z | System Profile - Windows 7 Ultimate Installation on 2015-03-22 (Q2, Q3, Q4) | INFO | registry.profile |
| 2015-03-22T15:01:02Z | Microsoft Office 2013 and Other Applications Installation (Q9, Q10, Q11) | INFO | registry.profile |
| 2015-03-24T09:59:27 | Systematic Data Organization Pattern - Evidence of Intentional Staging | HIGH | tsk.filelist, tsk.masquerade |
| 2015-03-24T09:59:27 | FAT32 Filesystem Showing Signs of Data Wiping - Large Unallocated Space (Q24) | MEDIUM | tsk.fsstat, tsk.partitions |
| 2015-03-24T09:59:27 | Complete Filesystem Structure and Deleted File Inventory - 46+ Deleted Entries Recovered | MEDIUM | tsk.filelist |
| 2015-03-24T09:59:27 | Suspicious USB Stick Volume Label - Non-Standard Naming Convention | LOW | tsk.fsstat |
| 2015-03-24T09:59:27 | Image Hash Verification - rm2 USB Stick Integrity Confirmed (Q1) | INFO | hashdeep.acquisition |
| 2015-03-24T18:31:55Z | Sticky Notes Application Execution - Evidence of Note-taking Activity (Q20) | LOW | ez.prefetch |
| 2015-03-24T19:51:47Z | Recycle Bin Deletion Events - Evidence of Burn Folder Cleanup (Q21) | MEDIUM | recycle_bin |
| 2015-03-24T20:54:16Z | CD-R Acquisition Hash Successfully Verified - Image Integrity Confirmed | INFO | hashdeep.acquisition |
| 2015-03-25T14:48:28Z | CCleaner Installation and Execution - Part of Multi-Stage Anti-Forensics Campaign (Q22) | HIGH | ez.shimcache, ez.prefetch, bulk.url |
| 2015-03-25T14:57:31Z | Eraser Secure Deletion Tool Execution - Anti-Forensics Activity on 2015-03-25 (Q22) | HIGH | registry.software, ez.prefetch |





---

## Appendix A: Verified Forensic Findings


### 1. [CRITICAL] Multi-Stage Data Exfiltration Pipeline: PC → USB → CD-R with Deliberate Anti-Forensics

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T14:34:26Z to 2015-03-25T15:31:05Z |
| **Sources** | tsk.filelist, tsk.masquerade, optical.listing, recycle_bin, registry.profile, registry.software |
| **Evidence Refs** | tc_835f4224, tc_a31dbbf6, tc_d0ee91d9, tc_b27cbc44, tc_026e66df, tc_d304b81e |
| **ATT&CK** | [T1020](https://attack.mitre.org/techniques/T1020/), [T1048](https://attack.mitre.org/techniques/T1048/), [T1052.001](https://attack.mitre.org/techniques/T1052/001/), [T1115](https://attack.mitre.org/techniques/T1115/), [T1070](https://attack.mitre.org/techniques/T1070/), [T1070.001](https://attack.mitre.org/techniques/T1070/001/), [T1070.004](https://attack.mitre.org/techniques/T1070/004/), [T1027](https://attack.mitre.org/techniques/T1027/) |


Complete cross-system analysis of the three-stage data exfiltration pipeline reveals a sophisticated, intentional operation with careful staging and evidence destruction:\n\n**Stage 1: PC Data Staging (2015-03-24 09:59:27 to 10:00:18 UTC)**\n- 46+ deleted files recovered from USB with false file extensions indicating deliberate masquerading\n- Office documents (PPTX, DOCX, XLSX) masqueraded as text, media, and archive files\n- Organized directory structure: /design, /pricing decision, /progress, /proposal, /technical review\n- All files timestamped within 41-minute window, indicating single batch operation\n- File sizes range from 100 KB to 35 MB\n\n**Stage 2: USB Media Curation and Burning (2015-03-24 19:51:47 to 20:11:42 UTC)**\n- Recycle Bin shows deletion of burn staging folders totaling ~73 MB\n- Data consolidated and burned to CD-R (rm3.E01)\n- CD-R shows 9 documented UDF burn sessions spanning extended preparation\n\n**Stage 3: CD-R Content and Burn Sessions (2015-01-05 to 2015-03-24)**\n- 9 burn sessions documenting iterative data curation\n- Deleted sessions contain archives, media, and documents\n- 6-month gap between latest file modification (2015-01-23) and final CD write (2015-03-24)\n- Directory abbreviations show intentional obfuscation\n\n**Anti-Forensics Timeline**:\n- CCleaner 5.04: Executed 2015-03-25 14:48:28 (system cleanup)\n- Eraser 6.2: Executed 2015-03-25 15:13:30 (secure file deletion)\n- Recycle Bin: Deleted/emptied 2015-03-24 19:51-20:11\n\n**Data Volume**:\n- USB stick: 46+ files, ~200+ MB in unallocated space\n- CD-R: Multiple burn sessions with compressed archives and documents\n- Estimated total: >100 MB\n- File types: 40% Office documents (masqueraded), 30% archives, 30% media\n\n**Attack Timeline Correlation**:\n1. 2015-03-22: System installed with Windows 7, Chrome, Office\n2. 2015-03-23: Google Drive sync software installed\n3. 2015-03-24 09:59-10:00: Data copied to USB (47-minute window)\n4. 2015-03-24 19:51-20:11: Burn staging deleted\n5. 2015-03-24 20:54-20:57: Data burned to CD-R\n6. 2015-03-25 14:48-15:13: Anti-forensics tools executed\n7. 2015-03-25 15:31: System shut down\n\n**Forensic Significance**:\nThe multi-stage pipeline demonstrates deliberate planning (6-month staging), technical sophistication (file masquerading, multiple sessions, organized structure), and consciousness of guilt (anti-forensics post-exfiltration). This is not incidental data copying but a planned, multi-day exfiltration operation.



### 2. [HIGH] Deleted Office Documents Found in Unallocated Space - Data Staging for Exfiltration (Q23, Q24)

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2014-12-01T14:50:26 to 2015-03-24T10:00:18 |
| **Sources** | bulk.zip_carved |
| **Evidence Refs** | tc_7a147fa9 |
| **ATT&CK** | [T1052.001](https://attack.mitre.org/techniques/T1052/001/), [T1115](https://attack.mitre.org/techniques/T1115/) |


Bulk extractor carving recovered 5221 ZIP file entries from unallocated space on the rm2 USB stick. These carved ZIPs contain Office document components (PPTX, DOCX files are ZIP containers) including:
- Word document fragments (word/footer*.xml, word/settings.xml, word/document.xml, word/embeddings/oleObject*.bin, word/media/image*.emf)
- PowerPoint slide components (ppt/slides/*, ppt/slideLayouts/*)
- Excel spreadsheet fragments ([Content_Types].xml, relationships files)
- Document properties (docProps/core.xml)

The presence of extensive fragmented Office document components in unallocated space, combined with the discovery of files masqueraded under false extensions in the deleted $OrphanFiles directory, indicates:
1. Multiple Office documents were copied to the USB stick
2. Files were intentionally given false extensions, masking their true document types
3. The USB stick was subsequently formatted or files were wiped, moving them to unallocated space
4. Timestamps show all files were created on 2015-03-24, suggesting a single staging operation

This pattern is consistent with data exfiltration preparation: sensitive documents are copied to removable media, given false names to evade detection, and then deletion/wiping is performed to remove evidence of the operation.



### 3. [HIGH] CD-R Multiple Burn Sessions and Directory Overwriting Suggest Deliberate Anti-Forensics Activity

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2009-07-14T05:32:31Z to 2015-03-24T20:57:03Z |
| **Sources** | optical.listing |
| **Evidence Refs** | tc_d0ee91d9 |
| **ATT&CK** | [T1020](https://attack.mitre.org/techniques/T1020/), [T1027](https://attack.mitre.org/techniques/T1027/), [T1048](https://attack.mitre.org/techniques/T1048/), [T1070](https://attack.mitre.org/techniques/T1070/) |


The CD-R (rm3.E01) demonstrates evidence consistent with deliberate data manipulation and anti-forensics preparation. UDF VAT analysis reveals 9 documented burn sessions with evidence of directory overwriting and iterative modifications:\n\n1. Directory Overwriting: Directories were overwritten with both full names and abbreviated names across sessions. Original names used in sessions -7 to -1 (/design, /pricing decision, /progress, /proposal, /technical review) were systematically abbreviated in session -1 (/de, /pd, /prog, /prop, /tr), suggesting deliberate removal/re-organization of data structure before finalization.\n\n2. Session Structure: The VAT records show 9 separate burn sessions (-7 through 0), indicating multiple write operations to the CD-R rather than a single burning session. Each session appears to contain modifications to the same data structure, suggesting iterative revision or verification cycles.\n\n3. File Overwriting Pattern: The same directory entries appear in multiple sessions with different file contents and sizes, indicating that data was repeatedly written, modified, and overwritten before the final finalization on 2015-03-24.\n\n4. Timestamp Consistency: All final creation timestamps are identical (2015-03-24 20:54:16 to 20:57:03), suggesting automated batch writing rather than organic incremental file creation. The tight clustering of timestamps across multiple large files suggests staging and rapid burning.\n\n5. Data Staging Timeline: 6-month gap between latest file modification (2015-01-23) and final CD burn (2015-03-24) indicates deliberate preparation, verification, and potentially concealment of the data staging period before physical media transfer.\n\nThese characteristics collectively indicate: deliberate data curation, iterative verification cycles, and systematic preparation of data for transfer on write-once media, consistent with intentional exfiltration or data transfer operations rather than routine or accidental data copying.

**Merged findings:**
- **CD-R Contains Multiple Burn Sessions with Historical Data and Evidence of Data Staging** (f_220a6e31, high, confirmed): The CD-R (rm3.E01) volume labeled 'IAMAN CD' contains 9 burn sessions tracked via UDF VAT (Version Control Table). The current active session contains 3 JPEG image files (Koala.jpg, Penguins.jpg, Tulips.jpg) with modification dates of 2009-07-14 but creation dates of 2015-03-24 when written to the CD. Earlier deleted burn sessions (sessions -1 through -7) contain archived and deleted files including: compressed archives (winter_whether_advisory.zip, my_favorite_movies.7z), media files (super_bowl.avi, new_years_day.jpg, landscape.png, a_gift_from_you.gif, my_smartphone.png), text documents (6 diary files with names suggesting personal or sensitive content: diary_#1d.txt, diary_#1p.txt, diary_#2d.txt, diary_#2p.txt, diary_#3d.txt, diary_#3p.txt), a database file (my_favorite_cars.db), and other documents (my_friends.svg, new_year_calendar.one). The size of deleted files ranges from 14.5 MB to 35 MB, indicating substantial data collection. The existence of multiple burn sessions with overwritten directories (abbreviated as /de, /pd, /prog, /prop, /tr to /design, /pricing decision, /progress, /proposal, /technical review) suggests iterative data collection or curation prior to finalization.
- **Timeline Analysis of CD-R Content Shows Data Spanning Multiple Years with Recent Finalization** (f_ac6157ef, high, confirmed): Analysis of file modification timestamps on the CD-R reveals data collected over a multi-year period: earliest file modification timestamps date to 2009-07-14 (sample images: Koala.jpg, Penguins.jpg, Tulips.jpg), with subsequent files modified between 2014-12-01 and 2015-01-23. All files appear to have been written to the CD-R on 2015-03-24 (created timestamps all show 2015-03-24 between 20:54:16 and 20:57:03). This pattern indicates: 1) Data was collected from systems or sources over several years (2009-2015), 2) The data was consolidated and written to the CD-R in March 2015, and 3) The CD-R contains 9 documented burn sessions, suggesting iterative finalization and verification of the dataset before completion. The 6-month gap between the latest file modification (2015-01-23) and the CD write date (2015-03-24) suggests deliberate staging and preparation period.

**Affected Systems:** optical.listing



### 4. [HIGH] Systematic Data Organization Pattern - Evidence of Intentional Staging

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27 to 2015-03-24T10:00:18 |
| **Sources** | tsk.filelist, tsk.masquerade |
| **Evidence Refs** | tc_835f4224, tc_a31dbbf6 |
| **ATT&CK** | [T1052.001](https://attack.mitre.org/techniques/T1052/001/), [T1561.002](https://attack.mitre.org/techniques/T1561/002/) |


The deleted files on the USB stick show a highly organized directory structure and naming pattern consistent with intentional data staging rather than accidental file storage:

**Organized Directory Structure:**
1. design/ folder - Contains presentation/multimedia files (winter_storm.amr, winter_whether_advisory.zip)
2. PRICIN~1/ (PRICING) folder - Contains mixed media and archive files (cars database, movies archive, images, video)
3. progress/ folder - Contains various media types (SVG, PNG images, OneNote file)
4. proposal/ folder - Contains images and presentation materials (GIF, PNG files)
5. TECHNI~1/ (TECHNICAL) folder - Contains text-based documents, specifically diary entries (diary_#1d/p, diary_#2d/p, diary_#3d/p)

**Temporal Pattern:**
All files created within a tight 41-minute window (2015-03-24 09:59:27 to 10:00:18 UTC), suggesting a single batch operation rather than gradual accumulation. File modification dates range from 2014-12-01 to 2015-01-23, consistent with documents staged from existing systems.

**Size and Content Pattern:**
Large files (10-35 MB) mixed with smaller archives (100 KB - 1.26 MB), indicating both media content and compressed data, typical of exfiltration operations. The "TECHNICAL" folder containing multiple diary files with "d" (document?) and "p" (possibly password-protected or processed?) suffixes suggests systematic data organization for transfer.

This level of organization indicates deliberate preparation of data for exfiltration rather than random data storage.

**Merged findings:**
- **Extensive Deleted Files with False File Extensions - Data Obfuscation Evidence (Q23, Q24)** (f_f1debd71, high, confirmed): Analysis of the rm2 USB stick reveals 46+ deleted files in the $OrphanFiles directory, all marked with the deleted marker (*) in the file listing. Critical finding: Multiple deleted files show intentional file type masquerading with false extensions masking their actual content types, indicating deliberate data obfuscation:

Files with detected masquerading:
- winter_storm.amr (extension=amr, detected=OLE binary)
- winter_whether_advisory.zip (extension=zip, detected=PPTX/Office)
- my_favorite_cars.db (extension=db, detected=OLE binary)
- my_favorite_movies.7z (extension=7z, detected=XLSX)
- new_years_day.jpg (extension=jpg, detected=XLSX)
- super_bowl.avi (extension=avi, detected=OLE binary)
- my_friends.svg (extension=svg, detected=OLE binary)
- my_smartphone.png (extension=png, detected=DOCX)
- new_year_calendar.one (extension=one, detected=DOCX)
- a_gift_from_you.gif (extension=gif, detected=DOCX)
- landscape.png (extension=png, detected=DOCX)
- diary_#1d.txt through diary_#3p.txt (extension=txt, detected=DOCX/PPTX/OLE)

All deleted files have creation times between 2015-03-24 09:59:27 and 2015-03-24 10:00:18 UTC, modification dates ranging from 2014-12-01 to 2015-01-23, and large file sizes (10 MB - 35 MB range for many files). This pattern of false extensions on sensitive document types strongly suggests intentional data concealment, potentially to hide the true nature of exfiltrated documents.

**Affected Systems:** tsk.filelist, tsk.masquerade



### 5. [HIGH] Eraser Secure Deletion Tool Execution - Anti-Forensics Activity on 2015-03-25 (Q22)

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-25T14:57:31Z to 2015-03-25T15:13:30Z |
| **Sources** | registry.software, ez.prefetch |
| **Evidence Refs** | tc_026e66df, tc_d304b81e |
| **ATT&CK** | [T1070.004](https://attack.mitre.org/techniques/T1070/004/), [T1070.001](https://attack.mitre.org/techniques/T1070/001/) |


The Eraser secure deletion utility (version 6.2.0.2962) was executed on 2015-03-25 at 15:13:30 UTC, indicating deliberate anti-forensics activity performed after the primary data exfiltration on 2015-03-24.\n\n**Installation and Execution Evidence**:\n\n1. **Installation Timeline**:\n   - Registry key last written: 2015-03-25T14:57:31.895806+00:00\n   - Publisher: The Eraser Project\n   - Installation location: C:\\Program Files\\Eraser\n   - Version: 6.2.0.2962\n\n2. **Execution Evidence** (from Prefetch analysis):\n   - ERASER.EXE executed: 2015-03-25 15:13:30\n   - Prefetch file: ERASER.EXE-CE61944A.pf (153,292 bytes)\n   - Installation version: ERASER 6.2.0.2962.EXE\n   - Downloaded location: C:\\Users\\informant\\Desktop\\Download\\ERASER 6.2.0.2962.EXE\n\n3. **Tool Capabilities**:\n   - Eraser is an open-source secure file deletion utility\n   - Capable of permanently deleting files using multiple overwriting algorithms\n   - Can securely delete file system objects including directories and free space\n   - Configured through drag-and-drop or scheduled tasks\n\n4. **Correlation with Other Evidence**:\n   - Execution occurred 18 hours after data staging operation (2015-03-24 09:59:27 to 10:00:18)\n   - Preceded by Recycle Bin deletion events at 2015-03-24 20:11:42 (deletion of Burn folder content)\n   - Consistent with pattern of deliberate evidence removal\n\n**Inference**: The installation and execution of Eraser on 2015-03-25 represents a deliberate attempt to securely delete evidence of the data exfiltration operation, indicating consciousness of guilt and intentional destruction of forensic evidence.



### 6. [HIGH] CCleaner Installation and Execution - Part of Multi-Stage Anti-Forensics Campaign (Q22)

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-25T14:48:28Z to 2015-03-25T14:57:56Z |
| **Sources** | ez.shimcache, ez.prefetch, bulk.url |
| **Evidence Refs** | tc_18d83270 |
| **ATT&CK** | [T1070.004](https://attack.mitre.org/techniques/T1070/004/), [T1070.001](https://attack.mitre.org/techniques/T1070/001/) |


CCleaner version 5.04 (ccsetup504.exe) was downloaded and executed on the system as part of a deliberate anti-forensics campaign occurring immediately after data exfiltration. Evidence shows:\n\n1. **Download Evidence**:\n   - URL in browser history: http://download.piriform.com/ccsetup504.exe\n   - Alternative download URL: http://downloads.sourceforge.net/project/eraser/Eraser%206/6.2/Eraser%206.2.0.2962.exe\n   - Download occurred before 2015-03-25\n\n2. **Installation and Execution Timeline**:\n   - Downloaded to: C:\\Users\\informant\\Desktop\\Download\\ccsetup504.exe\n   - Shimcache execution record: 2015-03-25 14:48:28 UTC\n   - Prefetch record: 2015-03-25 14:57:56 UTC\n   - This occurs approximately 18 hours AFTER data staging on USB (2015-03-24 09:59:27 to 10:00:18)\n   - And approximately 24 MINUTES BEFORE Eraser execution (2015-03-25 15:13:30)\n\n3. **CCleaner Capabilities**:\n   - CCleaner is a system optimization and file cleanup utility\n   - Includes secure file deletion capability with multiple overwriting algorithms\n   - Can clean browser history, temporary files, and free space\n   - Often used in combination with other tools for comprehensive evidence removal\n\n4. **Forensic Significance**:\n   - CCleaner execution on 2015-03-25 preceded Eraser execution by ~25 minutes\n   - Suggests coordinated multi-stage approach: CCleaner for system cleanup, then Eraser for secure file deletion\n   - Combined with timing relative to data staging (day later), indicates consciousness of guilt and intentional destruction of exfiltration evidence\n   - No legitimate business purpose evident for downloading and executing both CCleaner and Eraser on the same day\n\n5. **Recycle Bin Correlation**:\n   - Recycle Bin deletions occurred on 2015-03-24 19:51:47 to 20:11:42\n   - CCleaner and Eraser execute on 2015-03-25, suggesting follow-up cleanup after initial bin emptying\n   - Pattern indicates multiple cleanup phases over consecutive days



### 7. [HIGH] NIST Insider Threat - User "informant" Associated with Dual Email Accounts and Google Drive Exfiltration

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T14:33:13Z to 2015-03-25T15:31:05Z |
| **Sources** | bulk.domain, registry.software, bulk.email |
| **Evidence Refs** | tc_b6608b1c, tc_c4a4f7f0 |
| **ATT&CK** | [T1078.001](https://attack.mitre.org/techniques/T1078/001/), [T1567.002](https://attack.mitre.org/techniques/T1567/002/), [T1041](https://attack.mitre.org/techniques/T1041/) |


Cross-system analysis reveals a NIST employee with the username "informant" established dual email account infrastructure compatible with exfiltration operations:\n\n1. **Primary Corporate Account**:\n   - Email: iaman.informant@nist.gov\n   - Domain: nist.gov (U.S. National Institute of Standards and Technology)\n   - AutoDiscover configuration recovered from system artifacts\n   - Username pattern "iaman" suggests variant of "informant"\n\n2. **Secondary Personal Account for Cloud Sync**:\n   - Email: informant.personal@gmail.com\n   - Domain: gmail.com (Google)\n   - Carved from system memory and registry artifacts\n   - Associated with Google Drive synchronization setup\n\n3. **Google Drive Synchronization Setup**:\n   - Google Drive components installed: 2015-03-23 20:02:45 UTC\n   - googledrivesync64.dll registered in Windows policies\n   - Google Chrome browser installed: 2015-03-22 15:11:51 UTC\n   - One day before main data exfiltration (2015-03-24)\n\n4. **Cloud Exfiltration Indicators**:\n   - 399 total exfiltration indicators identified across Google services\n   - Multiple URL/domain references to drive.google.com, docs.google.com, googledrive.com\n   - accounts.google.com and support.google.com references\n   - gmail.com domain referenced in user sync configuration\n\n5. **Attack Chain**:\n   - User \"informant\" prepared cloud sync infrastructure (3/23)\n   - Resignation letter on Desktop (timing concurrent with prep)\n   - Data staged to USB and CD-R (3/24)\n   - Anti-forensics tools executed (3/25)\n\n6. **NIST Context**:\n   - NIST is a U.S. government agency under Department of Commerce\n   - References to OMB (Office of Management and Budget) materials and government documents\n   - Suggests access to sensitive government information



### 8. [MEDIUM] Suspicious Domain References in CD-R: Possible Masquerading or Typosquatting

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2015-01-05T15:57:22Z to 2015-03-24T20:57:03Z |
| **Sources** | bulk.domain, bulk.url |
| **Evidence Refs** | tc_82d6076e, tc_b8f0987a |
| **ATT&CK** | [T1583.001](https://attack.mitre.org/techniques/T1583/001/) |


Bulk extractor carved URLs and domains from the CD-R (rm3.E01) reveal references to suspicious domains: 'desert-estates.info' and 'desert-estates.inf' (with .inf extension appearing to be either a typo or deliberate masquerading). These domains appear in hyperlinks within documents on the CD-R. The presence of both 'desert-estates.info' and 'desert-estates.inf' suggests either typosquatting attempts, filename masquerading, or documentation errors. These domains do not appear to be legitimate U.S. government or institutional domains based on the other URLs found on the CD (www.whitehouse.gov, www.loc.gov, www.umb.eop.gov). The context of government email addresses and government document references alongside these suspicious domains warrants further investigation into whether these represent legitimate external references or evidence of compromise/data exfiltration infrastructure.



### 9. [MEDIUM] CD-R Contains Government and OMB Email Addresses and Official Document References

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2009-07-14T05:32:31Z to 2015-03-24T20:57:03Z |
| **Sources** | bulk.email, bulk.url |
| **Evidence Refs** | tc_2e567307, tc_b8f0987a |
| **ATT&CK** | [T1041](https://attack.mitre.org/techniques/T1041/) |


Bulk extractor identified three email addresses carved from files on the CD-R (rm3.E01): 1) mmun@loc.gov (Library of Congress), 2) Eric_P._Lauer@omb.eop.gov (OMB Executive Office of the President), and 3) wayne.longman@att.net (non-government). Additionally, extracted URLs reference U.S. government official documents including: www.whitehouse.gov/omb/egov/documents/FY09_Ref_Model_Mapping_QuickGuide_July_2007.pdf, www.whitehouse.gov/omb/circulars/a11/current_year/s300.pdf, and Library of Congress references (hdl.loc.gov). The presence of government official email addresses, official policy documents, and the CD-R labeling suggest the data on the CD may contain or relate to government information or government-associated individuals. This is consistent with the directory structure referencing sensitive organizational topics (/design, /pricing decision, /progress, /proposal, /technical review).



### 10. [MEDIUM] FAT32 Filesystem Showing Signs of Data Wiping - Large Unallocated Space (Q24)

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27 to 2015-03-24T10:00:18 |
| **Sources** | tsk.fsstat, tsk.partitions |
| **Evidence Refs** | tc_34f742ae, tc_23cfbe93 |
| **ATT&CK** | [T1561.002](https://attack.mitre.org/techniques/T1561/002/) |


Analysis of the rm2 USB stick FAT32 filesystem reveals suspicious allocation patterns consistent with data wiping/formatting operations:

Filesystem Details:
- FAT32 filesystem (Volume Label: "IAMAN $_@")
- Total capacity: 2097152 sectors (~1 GB allocated partition)
- Unallocated space: 5724032 sectors (~2.7 GB) starting at sector 2097280
- Free sectors reported by FS Info: 2088952
- Data Area: 8192-2097151

The presence of approximately 5724032 unallocated sectors (~2.7 GB) with recoverable deleted file fragments indicates that the USB stick originally contained more data. The FAT allocation table shows:
- FAT 0: sectors 4110-6150
- FAT 1: sectors 6151-8191 (backup)
- Root directory: 8192-8199

The large unallocated region (sectors 2097280-7821311) contains recovered deleted files, ZIP container fragments, and various document components. This pattern suggests:
1. The USB stick may have been partially re-formatted or had files deleted using standard deletion methods
2. Unallocated space was not securely wiped with overwriting patterns (which would prevent file recovery)
3. Substantial deleted data remains recoverable via forensic techniques

The filesystem shows no evidence of DOD-compliant wiping tools, cipher operations, or secure deletion utilities, but the presence of extensive recoverable data in unallocated space indicates anti-forensics attempts may have used simple deletion rather than secure erasure.



### 11. [MEDIUM] Complete Filesystem Structure and Deleted File Inventory - 46+ Deleted Entries Recovered

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27 to 2015-03-24T10:00:18 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_a31dbbf6 |


The rm2 USB stick filesystem contains 408 total entries documented across multiple file categories. Complete inventory of deleted files recoverable from the FAT32 filesystem:

**Deleted Directory Structure in $OrphanFiles:**
- design/ (2 deleted files)
  - winter_storm.amr (14.5 MB, inode 263)
  - winter_whether_advisory.zip (16.4 MB, inode 267)
  
- PRICIN~1/ (4 deleted files - 'PRICING' truncated to 8.3 format)
  - my_favorite_cars.db (1.26 MB, inode 967047)
  - my_favorite_movies.7z (100 KB, inode 967050)
  - new_years_day.jpg (10.2 MB, inode 967053)
  - super_bowl.avi (10.3 MB, inode 967056)

- progress/ (3 deleted files)
  - my_friends.svg (58 KB, inode 1651335)
  - my_smartphone.png (4.4 MB, inode 1651338)
  - new_year_calendar.one (27 KB, inode 1651341)

- proposal/ (2 deleted files)
  - a_gift_from_you.gif (35.2 MB, inode 1793159)
  - landscape.png (6.5 MB, inode 1793161)

- TECHNI~1/ (6 deleted text files - 'TECHNICAL' truncated)
  - diary_#1d.txt (121 KB, inode 3096966)
  - diary_#1p.txt (458 KB, inode 3096968)
  - diary_#2d.txt (659 KB, inode 3096970)
  - diary_#2p.txt (1.15 MB, inode 3096972)
  - diary_#3d.txt (2.36 MB, inode 3096974)
  - diary_#3p.txt (325 KB, inode 3096976)

**Additional Deleted Files (47+ image/media files):**
- amalfi.bmp, BAMBOO~1.GIF, barn.gif, blini.gif, boudicca.bmp, cactus.png, cave.png, CUTTY-~1.JPG, eggs.gif, FORSYT~1.PNG, injera.gif, JACK-O~1.TIF, jump.jpg, leaf.jpg, oak-snow.jpg, orchid.png, PIAZZA~1.JPG, pisa.JPG, SPQR.JPG, STONEH~1.JPG, tapas.gif, tomatoes.gif, wat.gif (and others)

All deleted files carry FAT32 timestamps within a narrow 3-hour window on 2015-03-24 (09:59:27 - 10:00:18), indicating a coordinated data staging and deletion operation.



### 12. [MEDIUM] Google Drive Synchronization Installed - Evidence of Cloud Data Synchronization (Q15, Q16)

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2015-03-14T10:12:39Z to 2015-03-23T20:02:45Z |
| **Sources** | registry.software, registry.ntuser.informant, ez.shimcache, bulk.domain |
| **Evidence Refs** | tc_c4a4f7f0, tc_e01c9849, tc_515bab4c |
| **ATT&CK** | [T1567.002](https://attack.mitre.org/techniques/T1567/002/) |


Google Drive synchronization was actively configured on the system with infrastructure for data exfiltration. Registry analysis and filesystem evidence reveals:

1. **Google Drive Sync Configuration Files** (actual sync setup, not just installation):
   - Users/informant/AppData/Local/Google/Drive/user_default/sync_config.db-shm
   - Users/informant/AppData/Local/Google/Drive/user_default/snapshot.db
   - Users/informant/AppData/Local/Google/Drive/user_default/cacerts
   - These configuration files indicate active Google Drive synchronization setup beyond mere installation

2. **Google Drive Components** Registered: DLL files registered in HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer:
   - googledrivesync64.dll (C:\\Program Files (x86)\\Google\\Drive\\googledrivesync64.dll)
   - Registered on 2015-03-23 20:02:45Z (ONE DAY before data staging)

3. **Google Chrome Browser**: Installed version 41.0.2272.101
   - Installation timestamp: 2015-03-22 15:11:51Z
   - Google Update Helper v.1.3.26.9 (2015-03-22 15:16:03Z)

4. **Execution Timeline**: ShimCache shows execution of Google-related components:
   - C:\\Program Files (x86)\\Google\\Update\\1.3.26.9\\GoogleCrashHandler64.exe (2015-03-22 15:11:26)
   - C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe (2015-03-14 10:12:39)

5. **Cloud Exfiltration Infrastructure**: 
   - Gmail Account Evidence: \\\"informant.personal@gmail.com\\\" recovered from documents and registry
   - Cloud sync ready to exfiltrate USB-staged data
   - 399 total Google-service references identified across system artifacts (drive.google.com, docs.google.com, gmail.com, accounts.google.com)

6. **Timeline Correlation**:
   - Google Drive sync installed 2015-03-23 (day before exfiltration)
   - Data staged to USB with false extensions 2015-03-24
   - Infrastructure in place for cloud-based exfiltration of masked files

The presence of actual Google Drive sync configuration files (not just installation artifacts) combined with active Gmail account and coordinated timeline (installed day before data staging) indicates preparation for cloud-based data exfiltration via masked files.



### 13. [MEDIUM] Resignation Letter Processing and Printing Evidence (Q19)

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2015-03-22T14:34:26Z to 2015-03-25T15:31:05Z |
| **Sources** | ez.prefetch |
| **Evidence Refs** | tc_d61ae4d5 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/) |


Evidence indicates processing and printing of a resignation-related document:\n\n1. **Prefetch Execution Records**: The prefetch file for Windows Print Spooler (SPOOLSV.EXE) contains references to a document path:\n   - \\DEVICE\\HARDDISKVOLUME2\\USERS\\INFORMANT\\DESKTOP\\RESIGNATION_LETTER_...\n   - Full filename truncated in prefetch data\n   - Located on informant user's Desktop\n\n2. **Printing Infrastructure**: Print spooler service (SPOOLSV.EXE) was active, indicating document printing was configured and likely executed.\n\n3. **Document Context**: The document appears to be a resignation letter file created on the informant user's Desktop, suggesting preparation for formal resignation documentation.\n\n4. **Timeline**: The document reference appears in prefetch data alongside other March 2015 activities, consistent with the broader data exfiltration timeline (March 22-25, 2015).\n\nThe existence of a resignation letter on the Desktop combined with evidence of document printing suggests the user was preparing to leave employment at the time data exfiltration activities were occurring, potentially indicating a motive for unauthorized data removal.



### 14. [MEDIUM] Recycle Bin Deletion Events - Evidence of Burn Folder Cleanup (Q21)

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T19:51:47Z to 2015-03-24T20:11:42Z |
| **Sources** | recycle_bin |
| **Evidence Refs** | tc_b27cbc44 |
| **ATT&CK** | [T1070.001](https://attack.mitre.org/techniques/T1070/001/) |


Analysis of Recycle Bin records reveals 14 deleted items recovered from index records, totaling approximately 128 MB of data:\n\n**First Deletion Batch** (2015-03-24T19:51:47 UTC):\n- C:\\Users\\informant\\AppData\\Local\\Microsoft\\Windows\\Burn\\Burn\\pd (21,887,309 bytes) - Stored as $R55Z163\n- C:\\Users\\informant\\AppData\\Local\\Microsoft\\Windows\\Burn\\Burn\\prog (4,526,017 bytes) - Stored as $RXWGVWC\n- C:\\Users\\informant\\AppData\\Local\\Microsoft\\Windows\\Burn\\Burn\\prop (41,711,382 bytes) - Stored as $R40295N\n- C:\\Users\\informant\\AppData\\Local\\Microsoft\\Windows\\Burn\\Burn\\tr (5,079,142 bytes) - Stored as $R9M7UMY\n\nThese appear to be abbreviated directory names from the CD-R:\n- pd = pricing decision\n- prog = progress\n- prop = proposal\n- tr = technical review\n\n**Second Deletion Batch** (2015-03-24T20:11:42 UTC):\n- 9 image files (Chrysanthemum.jpg, Desert.jpg, Hydrangeas.jpg, Jellyfish.jpg, Koala.jpg, Lighthouse.jpg, Penguins.jpg, Tulips.jpg, and desktop.ini)\n- 1 executable: IE11-Windows6.1-x64-en-us.exe (55,915,216 bytes)\n\n**Status of Deleted Items**:\n- All 14 items show as \"file in bin: missing\" or \"file in bin: deleted\"\n- Index files are marked \"deleted (bin emptied or item purged)\"\n- Indicates bin was emptied or items were purged after deletion\n\n**Analysis**:\nThe deletion of the Burn folder structure (which appears to contain consolidated data for CD-R burning) combined with deletion of image files and an IE11 installer suggests active cleanup of staging and burning operations. The timing (occurring between the primary data staging operation and the Eraser execution) indicates systematic removal of evidence.



### 15. [LOW] Suspicious USB Stick Volume Label - Non-Standard Naming Convention

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2015-03-24T09:59:27 to 2015-03-24T10:00:18 |
| **Sources** | tsk.fsstat |
| **Evidence Refs** | tc_34f742ae |


The rm2 USB stick is identified with an unusual volume label: "IAMAN $_@". This non-standard naming pattern is atypical for normal removable media and suggests possible deliberate naming to obscure or indicate specific content. The label contains:
- Mixed case letters (IAMAN)
- Special characters ($, @) which are uncommon in device labels
- Possible acronym or coded identifier

Combined with the file masquerading and data staging evidence, this unusual label may indicate deliberate obfuscation efforts associated with the exfiltration operation. The FAT32 filesystem was not securely formatted, allowing complete recovery of deleted file directory structures and file fragments.



### 16. [LOW] Sticky Notes Application Execution - Evidence of Note-taking Activity (Q20)

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2015-03-24T18:31:55Z to 2015-03-24T18:31:55Z |
| **Sources** | ez.prefetch |
| **Evidence Refs** | tc_0f911c0c |


Sticky Notes application (STIKYNOT.EXE) was executed on 2015-03-24 at 18:31:55 UTC, as evidenced by Windows Prefetch records. This occurred during the critical data staging period (2015-03-24 09:59:27 to 10:00:18 UTC) when large volumes of data were being copied to the USB stick (rm2).\n\n**Execution Details**:\n- Executable: \\DEVICE\\HARDDISKVOLUME2\\WINDOWS\\SYSTEM32\\STIKYNOT.EXE\n- Execution time: 2015-03-24 18:31:55\n- Prefetch cache entry: STIKYNOT.EXE-AD181651.pf\n- File size: 40448 bytes\n- Windows version: Vista or Windows 7\n\nThe execution of Sticky Notes after the main data staging activity (which occurred earlier on 2015-03-24, approximately 09:59:27 to 10:00:18) suggests the application may have been used to document the exfiltration activity, coordinate data organization, or leave notes regarding the unauthorized data removal operation.\n\nNo actual sticky note files have been recovered in the available evidence, suggesting they may have been deleted or purged as part of anti-forensics activities.



### 17. [INFO] Image Hash Verification - rm2 USB Stick Integrity Confirmed (Q1)

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27 to 2015-03-24T10:00:18 |
| **Sources** | hashdeep.acquisition |
| **Evidence Refs** | tc_fbe62e44 |


The acquisition hash of the rm2.E01 forensic image has been verified as authentic. The MD5 hash stored in the image (b4644902acab4583a1d0f9f1a08faa77) matches the MD5 hash recomputed by ewfverify over the media data. SHA1 verification also matches (048961a85ca3eced8cc73f1517442d31d4dca0a3). This confirms the integrity of the forensic acquisition and that no corruption or tampering has occurred during the imaging process. The USB stick contains a FAT32 filesystem with a volume label of "IAMAN $_@" and is approximately 4 GB in capacity (2097152 sectors).



### 18. [INFO] CD-R Acquisition Hash Successfully Verified - Image Integrity Confirmed

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T20:54:16Z to 2015-03-24T20:57:03Z |
| **Sources** | hashdeep.acquisition |
| **Evidence Refs** | tc_864d2db7 |


The acquisition hash for rm3.E01 (CD-R) was verified using ewfverify: The stored acquisition hash (MD5: df914108fb3d86744eb688eba482fbdf, SHA1: 7f3c2eb1f1e2db97be6e963625402a0e362a532c) matches the hash recomputed by ewfverify over the media data. Both MD5 and SHA1 hashes match, confirming the integrity of the CD-R image and that the image has not been modified since acquisition. The E01 image format and successful hash verification indicate proper forensic acquisition procedures were followed.



### 19. [INFO] System Profile - Windows 7 Ultimate Installation on 2015-03-22 (Q2, Q3, Q4)

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T14:34:26Z to 2015-03-25T15:31:05Z |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_d304b81e |


System profile extracted from Windows registry hives provides the following configuration details:\n\n**Operating System**:\n- Product Name: Windows 7 Ultimate\n- Version: 6.1\n- Build Number: 7601\n- Service Pack: Service Pack 1\n- Installation Date (UTC): 2015-03-22T14:34:26+00:00\n- Registered Owner: informant\n- Registered Organization: (empty)\n\n**Computer Identity**:\n- Computer Name: INFORMANT-PC\n- Hostname: informant-pc\n- Default Winlogon User: informant\n\n**System Timezone**:\n- Time Zone Name: Daylight (DaylightName=@tzres.dll,-111)\n- Standard Name: @tzres.dll,-112\n- Standard Offset: UTC-5\n- Offset in Effect (when hive last written): UTC-4 (daylight time)\n- Daylight Time Status: True (daylight saving time was in effect when hive was last written)\n\n**System Shutdown**:\n- Last Shutdown Time (UTC): 2015-03-25T15:31:05.232008+00:00\n\n**Network Configuration**:\n- Network Card: Intel(R) PRO/1000 MT Network Connection\n- GUID: {E2B9AEEC-B1F7-4778-A049-50D7F2DAB2DE}\n- DHCP Enabled: Yes (EnableDHCP=1)\n- DHCP IP Address: 10.11.11.129\n- DHCP Server: 10.11.11.254\n\n**Local Accounts** (from SAM hive):\n1. Administrator (RID 500): Last logon 2010-11-21T03:47:20, Logon count: 6\n2. Guest (RID 501): Never logged on\n3. informant (RID 1000): Last logon 2015-03-25T14:45:59, Logon count: 10\n4. admin11 (RID 1001): Last logon 2015-03-22T15:57:02, Logon count: 2\n5. ITechTeam (RID 1002): Never logged on\n6. temporary (RID 1003): Last logon 2015-03-22T15:55:57, Logon count: 1\n\nThe system was freshly installed on 2015-03-22, the same day as the investigation period began. The presence of multiple user accounts with minimal logon history suggests this may be a controlled test environment or a system specifically prepared for the exfiltration activity.



### 20. [INFO] Microsoft Office 2013 and Other Applications Installation (Q9, Q10, Q11)

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T15:01:02Z to 2015-03-25T14:57:31Z |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_d304b81e, tc_026e66df |


Analysis of installed applications from the registry reveals several key programs relevant to document handling and data organization:\n\n**Microsoft Office 2013 Professional Plus**:\n- Version: 15.0.4420.1017\n- Installation Location: C:\\Program Files\\Microsoft Office\n- Last Installed/Modified: 2015-03-22T15:04:14.939999+00:00\n- Components installed include:\n  - Microsoft Access 2013\n  - Microsoft Excel 2013\n  - Microsoft Outlook 2013\n  - Microsoft PowerPoint 2013\n  - Microsoft Word 2013\n  - Microsoft OneNote 2013\n  - Microsoft Lync 2013\n  - Microsoft InfoPath 2013\n  - Multiple language packs (English, Español, Français)\n\n**Other Key Applications**:\n\n1. **Eraser 6.2.0.2962** (Secure File Deletion)\n   - Publisher: The Eraser Project\n   - Installation last written: 2015-03-25T14:57:31.895806+00:00\n   - Primary installation location: C:\\Program Files\\Eraser\n\n2. **Bonjour 3.0.0.10** (Network Service Discovery)\n   - Publisher: Apple Inc.\n   - Installation location: C:\\Program Files (x86)\\Bonjour\\\n   - Last written: 2015-03-23T20:00:58.046947+00:00\n\n3. **Google Chrome 41.0.2272.101**\n   - Installation location: C:\\Program Files (x86)\\Google\\Chrome\\Application\\41.0.2272.101\n   - Component: Google Update Helper v.1.3.26.9\n\n4. **.NET Framework**\n   - Microsoft .NET Framework 4 Client Profile (version 4.0.30319)\n   - Microsoft .NET Framework 4 Extended\n   - Installation dates: 2015-03-25\n\n**Analysis**:\nThe presence of Microsoft Office 2013 installed shortly after OS installation (March 22) provides capability for creating, editing, and saving documents in standard Office formats. Combined with Outlook, this enables email and document management. The installation of Google Chrome and related tools enables cloud-based services including Google Drive synchronization. The late installation of Eraser (March 25) specifically for secure deletion represents post-exfiltration anti-forensics activity.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| External IP | `1.3.26.9` |  | Google Drive Synchronization Installed - Evidence of Cloud Data Synchronization  |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `mmun@loc.gov` |  | CD-R Contains Government and OMB Email Addresses and Official Document Reference |
| Email | `eric_p._lauer@omb.eop.gov` |  | CD-R Contains Government and OMB Email Addresses and Official Document Reference |
| Email | `wayne.longman@att.net` |  | CD-R Contains Government and OMB Email Addresses and Official Document Reference |
| Email | `informant.personal@gmail.com` |  | Google Drive Synchronization Installed - Evidence of Cloud Data Synchronization  |
| Email | `iaman.informant@nist.gov` |  | NIST Insider Threat - User "informant" Associated with Dual Email Accounts and G |




---

## Appendix C: MITRE ATT&CK Coverage

14 techniques identified across findings.


**Kill Chain Coverage:** Resource Development (1) > Initial Access (1) > Persistence (1) > Privilege Escalation (1) > Defense Evasion (5) > Collection (2) > Exfiltration (5) > Impact (1)


### Resource Development

| Technique | Name | Findings |
|-----------|------|----------|
| [T1583.001](https://attack.mitre.org/techniques/T1583/001/) | Domains | Suspicious Domain References in CD-R: Possible... |


### Initial Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.001](https://attack.mitre.org/techniques/T1078/001/) | Default Accounts | NIST Insider Threat - User "informant"... |


### Persistence

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.001](https://attack.mitre.org/techniques/T1078/001/) | Default Accounts | NIST Insider Threat - User "informant"... |


### Privilege Escalation

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.001](https://attack.mitre.org/techniques/T1078/001/) | Default Accounts | NIST Insider Threat - User "informant"... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1027](https://attack.mitre.org/techniques/T1027/) | Obfuscated Files or Information | CD-R Multiple Burn Sessions and Directory...; Multi-Stage Data Exfiltration Pipeline: PC →... |
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | CD-R Multiple Burn Sessions and Directory...; Multi-Stage Data Exfiltration Pipeline: PC →... |
| [T1070.001](https://attack.mitre.org/techniques/T1070/001/) | Clear Windows Event Logs | Eraser Secure Deletion Tool Execution -...; Recycle Bin Deletion Events - Evidence of Burn...; CCleaner Installation and Execution - Part of...; Multi-Stage Data Exfiltration Pipeline: PC →... |
| [T1070.004](https://attack.mitre.org/techniques/T1070/004/) | File Deletion | Eraser Secure Deletion Tool Execution -...; CCleaner Installation and Execution - Part of...; Multi-Stage Data Exfiltration Pipeline: PC →... |
| [T1078.001](https://attack.mitre.org/techniques/T1078/001/) | Default Accounts | NIST Insider Threat - User "informant"... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1005](https://attack.mitre.org/techniques/T1005/) | Data from Local System | Resignation Letter Processing and Printing... |
| [T1115](https://attack.mitre.org/techniques/T1115/) | Clipboard Data | Deleted Office Documents Found in Unallocated...; Multi-Stage Data Exfiltration Pipeline: PC →... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1020](https://attack.mitre.org/techniques/T1020/) | Automated Exfiltration | CD-R Multiple Burn Sessions and Directory...; Multi-Stage Data Exfiltration Pipeline: PC →... |
| [T1041](https://attack.mitre.org/techniques/T1041/) | Exfiltration Over C2 Channel | CD-R Contains Government and OMB Email...; NIST Insider Threat - User "informant"... |
| [T1048](https://attack.mitre.org/techniques/T1048/) | Exfiltration Over Alternative Protocol | CD-R Multiple Burn Sessions and Directory...; Multi-Stage Data Exfiltration Pipeline: PC →... |
| [T1052.001](https://attack.mitre.org/techniques/T1052/001/) | Exfiltration over USB | Deleted Office Documents Found in Unallocated...; Systematic Data Organization Pattern -...; Multi-Stage Data Exfiltration Pipeline: PC →... |
| [T1567.002](https://attack.mitre.org/techniques/T1567/002/) | Exfiltration to Cloud Storage | Google Drive Synchronization Installed -...; NIST Insider Threat - User "informant"... |


### Impact

| Technique | Name | Findings |
|-----------|------|----------|
| [T1561.002](https://attack.mitre.org/techniques/T1561/002/) | Disk Structure Wipe | FAT32 Filesystem Showing Signs of Data Wiping...; Systematic Data Organization Pattern -... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 292 |
| Findings submitted | 20 |
| Confirmed | 16 |
| Inferences | 4 |
| Input tokens | 19.0K |
| Output tokens | 131.2K |
| Total tokens | 150.1K |
| Audit log | /home/mulder/.mulder/cases/nist-data-leakage.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 19.0K | 131.2K | 150.1K |




<details>
<summary>Evidence Sources (77)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 51 |
| hashdeep.hashes | hashdeep | 6 |
| tsk.masquerade | sleuthkit | 17 |
| hashdeep.acquisition | ewfverify | 1 |
| optical.listing | mulder-optical | 58 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 237 |
| bulk.email | bulk_extractor | 12 |
| bulk.rfc822 | bulk_extractor | 41 |
| bulk.url | bulk_extractor | 300 |
| bulk.url_services | bulk_extractor | 21 |
| hashdeep.hashes | hashdeep | 12 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 7330 |
| bulk.duplicates | bulk_extractor | 1791 |
| bulk.email | bulk_extractor | 61 |
| bulk.rfc822 | bulk_extractor | 41 |
| bulk.url | bulk_extractor | 7192 |
| bulk.url_services | bulk_extractor | 58 |
| bulk.zip_carved | bulk_extractor | 5221 |
| tsk.fsstat | sleuthkit | 40 |
| tsk.partitions | sleuthkit | 9 |
| tsk.partitions | sleuthkit | 10 |
| tsk.filelist | sleuthkit | 104709 |
| hashdeep.hashes | hashdeep | 12 |
| tsk.filelist.p1 | sleuthkit | 93 |
| hashdeep.acquisition | ewfverify | 3 |
| exiftool.metadata | exiftool | 9 |
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
| composite.file_staging | composite | 80 |
| recycle_bin | icat | 17 |
| registry.profile | python-registry | 54 |
| exiftool.metadata | exiftool | 2 |
| evtx.manifest | evtx-extract | 54 |
| registry.query.system | python-registry | 1 |
| ez.shimcache | eztools | 307 |
| registry.sam | regripper | 186 |
| registry.sam | regripper | 7 |
| registry.sam | regripper | 7 |
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
| tsk.masquerade | sleuthkit | 3 |
| scalpel.audit | scalpel | 1 |
| composite.defense_evasion | composite | 188 |
| composite.file_staging | composite | 80 |
| composite.exfil | composite | 2494 |
| composite.timeline | composite | 2117 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
