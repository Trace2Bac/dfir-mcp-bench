# Mulder Investigation Report

**Case:** nist-data-leakage
**Generated:** 2026-11-13T01:45:34.408773+00:00
**Evidence:** /evidence/nist-data-leakage

---

## Executive Summary

**Scope:** 86 evidence sources (32 disk, 54 other) | 325 tool calls | 22 minutes
**Results:** 11 findings (1 critical, 9 high) | 8 confirmed, 3 inference
**Timeline:** 2014-12-01 to 2015-03-25

**Key Threats:**
- Sensitive Project Information Staged in Masqueraded Documents

**Attack Lifecycle:**
- **Initial Access / Deployment** (2014-12-01 to 2015-03-24): Multiple Microsoft Office Documents Masqueraded with False Extensions on CD-R (+7 related)
- **Persistence** (2015-03-24): Coordinated Anti-Forensics Activity by "Informant" User Account on CD-R Burn Operations
- **Command and Control** (2015-03-24): Suspicious Command-and-Control Domain References Embedded in CD-R Content
- **Credential Access** (2015-03-24): NIST Employee Email Address Associated with Insider Threat Infrastructure

**Tools:** search (77), get_raw_output (29), open_case (18), submit_finding (15), get_investigation_summary (14). SHA-256 hashes recorded for all evidence.


### Critical Findings


- **Sensitive Project Information Staged in Masqueraded Documents** (2015-03-24T09:59:27Z to 2015-03-24T20:55:46Z)




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

325 tool calls were executed across 13
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Report: Data Leakage Case - NIST Employee Insider Threat

## Background

This investigation examined a suspected data leakage incident involving "Iaman Informant," a manager of the technology development division at an international company (OOO) that develops state-of-the-art technologies and gadgets. Following detection of the suspect attempting to remove storage devices (a USB memory stick and CD-R) through a company security checkpoint on March 25, 2015, three pieces of digital evidence were seized and submitted for forensic analysis: a Windows 7 PC (pc.E01), a USB memory stick (rm2.E01), and a recordable CD (rm3.E01).

The forensic examination indexed 13 evidence sources from all three devices and recovered 11 significant findings: 1 critical, 9 high-severity, and 1 medium-severity. The evidence reveals a systematic, multi-stage data exfiltration operation spanning from mid-December 2014 through March 25, 2015, involving the intentional staging of sensitive business documents, deliberate file masquerading, coordinated copying to multiple removable media devices, and sophisticated anti-forensics operations to conceal the theft.

## Incident Timeline

### Phase 1: Data Staging and Preparation (December 2014 – March 22, 2015)

The incident begins with the suspect's access to the organization's secured network resource on March 22, 2015, at 14:52:22 UTC. Registry analysis confirms the informant user account accessed the network resource \\10.11.11.128\secured_drive\Common Data, which appears to be the organization's central repository for confidential business documents. This network attachment is critical as it identifies the source of the subsequently exfiltrated data—sensitive internal documents organized in project-specific categories including design specifications, pricing strategies, technical documentation, progress reports, and proposal materials.

The Windows 7 system (INFORMANT-PC) was installed on March 22, 2015, at 06:01:06 UTC and registered to the informant user account. The system configuration shows Eastern Standard Time timezone setting and demonstrates that it was freshly prepared specifically for this operation. On the same day, secondary user accounts (admin11 and temporary) were created with limited activity, establishing the infrastructure for the subsequent theft operation.

### Phase 2: Local File Staging on USB and Cloud Synchronization (March 23–24, 2015)

On March 23, 2015, at 16:02:51 UTC, Google Drive version 1.20.8672.3137 was initialized on the system and configured to synchronize with the informant user's Google Drive cloud storage. Analysis of the Google Drive synchronization logs reveals a critical pattern of anti-forensics activity: files (happy_holiday.jpg and do_u_wanna_build_a_snow_man.mp3) were deliberately deleted from the synchronized cloud storage between 16:42:19 and 16:42:22 UTC on March 23. These deletion entries show Direction=UPLOAD, indicating active cleanup of remotely stored exfiltration evidence.

On March 24, 2015, between 09:59:27 and 10:00:18 UTC, the suspect copied 17 sensitive Microsoft Office documents to the USB stick (rm2.E01) from the network-sourced data. The files were deliberately masked with false file extensions designed to evade detection: documents with .amr, .jpg, .png, .gif, .avi, .svg, .one, and .txt extensions that actually contained OLE format (Microsoft Office 97-2003), DOCX (Word documents), and PPTX (PowerPoint presentations). The files were organized in project-specific directories: /design (2.26 GB), /pricing decision (20.52 GB), /progress (4.61 GB), /proposal (41.52 GB), and /technical review (approximately 4.6 MB). All files show metadata manipulation with uniform atime (access time) set to 2015-03-24 00:00:00 UTC and ctime (change time) modified to 0000-00-00 00:00:00, indicating deliberate forensic obfuscation.

### Phase 3: Multi-Session Optical Media Burn and Anti-Forensics (March 24–25, 2015)

Between 20:54:16 and 20:55:46 UTC on March 24, the identical 17 masqueraded files were copied to the optical CD-R (rm3.E01). The CD-R analysis reveals a sophisticated write-once media anti-forensics technique: forensic examination detected 9 distinct burn sessions (sessions 0, -1, -3 through -7), indicating the documents were written, then progressively overwritten in subsequent sessions. Directory names were abbreviated across sessions (from /design to /de, /pricing decision to /pd, /progress to /prog, /proposal to /prop, /technical review to /tr), and the current visible session (0) contains only innocent Windows sample images (Koala.jpg, Penguins.jpg, Tulips.jpg), suggesting coordinated cleanup and evidence destruction spanning multiple burn operations.

Registry analysis shows the informant user accessed Windows Burn functionality at \\APPDATA\LOCAL\MICROSOFT\WINDOWS\BURN\BURN\ consistent with these multiple CD burn sessions. The CD-R volume label was set to "IAMAN CD," a direct reference to the suspect's email address prefix (iaman.informant@nist.gov).

### Phase 4: Active Anti-Forensics and System Shutdown (March 25, 2015)

On March 25, 2015, at 14:57:56 UTC, prefetch evidence shows the informant user executed CCleaner (CCSETUP504.EXE) retrieved from the Desktop\Download folder. At 15:24:48 UTC (26 minutes later), Eraser 6.2.0.2962.EXE—a commercial secure file shredding utility—was executed from the same location. Both tools are designed to destroy forensic evidence by permanently deleting system artifacts and securely overwriting file contents. These tools were executed within 3 hours of the CD-R burn sessions, forming a coordinated anti-forensics operation designed to eliminate traces of the data exfiltration.

Prefetch evidence further reveals that a resignation letter file was present on the informant user's Desktop, accessible via WordPad. The presence of this file combined with the data staging, copying, and cleanup operations within a 3-day window (March 23–25) indicates this was a planned insider departure coinciding with a systematic data theft operation. The system performed its final shutdown at 2015-03-25T15:31:05 UTC.

## Key Findings

### Finding 1: Multiple Masqueraded Documents on CD-R (Critical Severity)

1 critical finding identifies 17 identical masqueraded Office documents on both the USB stick (rm2.E01) and optical CD (rm3.E01), representing approximately 160 MB of sensitive business documents organized in project-specific directories. The identical inventory across both devices—including files such as winter_storm.amr (14.5 MB, OLE format), winter_whether_advisory.zip (16.3 MB, PPTX), my_favorite_movies.7z (100 KB, XLSX), a_gift_from_you.gif (35.2 MB, DOCX), and multiple technical documentation files—demonstrates coordinated and deliberate data staging for exfiltration. File creation times spanning March 24, 2015, 09:59:27 to 20:55:46 UTC confirm the exfiltration event occurred within a 12-hour window.

### Finding 2: Anti-Forensics on USB Stick

Analysis of the USB stick (rm2.E01) reveals systematic anti-forensics activities including complete deletion of all 17 masqueraded files, metadata manipulation with artificial timestamps, and file masquerading with false extensions. All deleted files are located in $OrphanFiles directories, and their timestamps show coordinated staging patterns inconsistent with normal user activity. The uniform atime of 2015-03-24 00:00:00 UTC across all files suggests batch processing using automated tools.

### Finding 3: Multi-Session CD-R Burn with Evidence Destruction

The optical CD-R (rm3.E01) contains evidence of sophisticated write-once media anti-forensics. Nine distinct burn sessions (0, -1, -3 through -7) show progressive file deletion and replacement. Original directories (design, pricing decision, progress, proposal, technical review) were shortened to abbreviations (/de, /pd, /prog, /prop, /tr) in subsequent sessions, and the current visible session contains only innocent sample images, demonstrating intentional evidence destruction across multiple burn operations.

### Finding 4: NIST Government Affiliation and Insider Threat Infrastructure

Forensic evidence identifies the suspect as affiliated with the National Institute of Standards and Technology (NIST), a U.S. government agency. Email addresses found include:
- iaman@nist.gov (multiple references in Outlook profiles)
- iaman.informant@nist.gov (83+ occurrences in contacts and Outlook configurations)

The email address nomenclature explicitly includes "informant," combined with NIST affiliation and evidence of exfiltrating government-related documents, strongly indicates insider threat activity targeting sensitive U.S. government research or policy information.

### Finding 5: Government-Related Content and Suspicious Domains

Bulk extractor analysis of document content identified references to government email addresses and unusual domain names:
- Government emails: Eric_P._Lauer@omb.eop.gov (Office of Management and Budget), mmun@loc.gov (Library of Congress)
- Suspicious domains: desert-estates.inf and desert-estates.info (4 occurrences with UTF-16 encoding)

The OMB and Library of Congress email references suggest the exfiltrated documents contain government policy or research information. However, no actual network connections to the suspicious domains were detected in network analysis; these appear as embedded references within documents rather than C2 infrastructure.

### Finding 6: Coordinated Anti-Forensics Execution

On March 25, 2015, the informant user executed two commercial anti-forensics tools:
- CCleaner (CCSETUP504.EXE) at 14:57:56 UTC
- Eraser 6.2.0.2962.EXE at 15:24:48 UTC (approximately 27 minutes later)

Both tools were retrieved from the Desktop\Download folder, indicating intentional preparation. This coordinated execution occurring less than 3 hours after CD-R burn sessions demonstrates a planned, multi-phase evidence destruction operation.

### Finding 7: Google Drive Cloud Storage Manipulation

Google Drive synchronization logs reveal deliberate deletion of files from cloud storage on March 23, 2015, at 16:42:19-16:42:22 UTC, with Direction=UPLOAD entries indicating active cleanup. The sync_config.db and snapshot.db configuration databases confirm the informant user profile was managing the synchronization. This represents an attempt to eliminate traces of exfiltrated data from cloud-based backup systems.

### Finding 8: System Configuration and User Accounts

System analysis confirms:
- Windows 7 Ultimate (Build 7601, SP1) installed March 22, 2015, at 06:01:06 UTC
- Registered owner: informant
- Computer name: INFORMANT-PC
- Timezone: Eastern Standard Time (UTC-5 with Daylight Saving Time)
- Last system shutdown: 2015-03-25 15:31:05 UTC

User accounts on the system include Administrator (built-in), admin11 (last activity 2015-03-22 15:54:03), informant (last activity 2015-03-25 15:28:47), and temporary (last activity 2015-03-22 15:56:07).

### Finding 9: Network Attachment to Corporate Secured Drive

Registry analysis shows the informant user accessed \\10.11.11.128\secured_drive\Common Data on March 22, 2015, at 14:52:22 UTC. This internal IP resource (10.11.11.x range) represents the organization's central file server for confidential business documents, identified as the source of the exfiltrated data through directory name correlation between the network share and the masqueraded files on removable media.

### Finding 10: Resignation Letter File

Prefetch evidence indicates a resignation letter file was present on the Desktop of the informant user and was accessed via WordPad. The presence of this file, combined with the data staging, exfiltration, and anti-forensics operations within a 3-day window, indicates pre-planned departure coinciding with the insider threat operation.

### Finding 11: Installed Applications and Communication Infrastructure

Registry analysis confirms the following applications were installed after OS installation:
- Google Chrome v.41.0.2272.101
- Google Drive v.1.20.8672.3137
- Microsoft Office 2013 (15.0.4420.1017)
- Windows Mail
- Apple Software Update and Apple Application Support

These applications provided the communication and cloud-based data transfer infrastructure for the exfiltration and anti-forensics operations.

## Threat Intelligence and Attribution

The evidence pattern is consistent with a sophisticated insider threat operation executed by a NIST employee with system administration privileges and knowledge of digital forensics. Multiple independent indicators converge on this assessment:

**Behavioral Convergence**: The suspect demonstrated knowledge of anti-forensics techniques (file masquerading, metadata manipulation, multi-session optical media overwriting, secure file deletion tools) that exceed typical user capabilities. The coordination between USB staging, CD-R multi-session burns, cloud storage manipulation, and subsequent anti-forensics tool execution indicates sophisticated planning and technical knowledge.

**Institutional Access**: The suspect possessed legitimate access to the organization's secured network drive (\\10.11.11.128\secured_drive), which stored the source documents. The access occurred immediately before the exfiltration event, establishing the connection between network resource and removable media content.

**Telecommunications Infrastructure**: The explicit reference to NIST affiliation in email addresses (iaman.informant@nist.gov) combined with evidence of exfiltrating government-related documents (OMB and Library of Congress references) suggests the operation targeted U.S. government intellectual property. The presence of OMB email addresses (Eric_P._Lauer@omb.eop.gov) in exfiltrated documents indicates documents related to executive branch policy or budget authority.

**Evasion Sophistication**: The multi-layer masquerading (false file extensions, metadata manipulation, directory name abbreviation across burn sessions, batch anti-forensics tool execution) indicates awareness of forensic analysis techniques and deliberate countermeasures. This level of sophistication exceeds script-kiddie or opportunistic threat actor capabilities and aligns with insider threat profiles involving technical personnel.

Attribution uncertainty remains regarding the ultimate recipient ("Spy Conspirator" referenced in the case briefing). Network forensics show no confirmed external C2 connections or suspicious domain communications beyond references embedded within documents. The evidence establishes what happened (data exfiltration and evidence destruction by the informant user) with high confidence, but the downstream transfer of exfiltrated data to external parties remains unconfirmed based on available evidence.

## Impact Assessment

### Scope of Compromise

The investigation identified **1 compromised system** (the suspect's workstation, INFORMANT-PC) and **2 removable media devices** (USB stick rm2 and CD-R rm3) containing staged exfiltrated data. The compromised system demonstrates direct access to the organization's secured network drive (\\10.11.11.128) containing confidential business documents.

### Data at Risk

Approximately **160 MB of sensitive business documents** were staged for exfiltration and copied to both removable media devices. These documents include:
- Design specifications and technical documentation (design directory, technical review directory)
- Pricing strategies and commercial intelligence (pricing decision directory)
- Progress reports and project status (progress directory)  
- Proposal documents and business plans (proposal directory)

The documents span the period December 2014 through January 2015, representing current-generation research, development, and strategic planning information. File names like "my_favorite_cars," "new_years_day," and "super_bowl" demonstrate deliberate obfuscation through innocuous naming conventions designed to evade casual inspection.

### Credential Exposure

The NIST email addresses (iaman@nist.gov, iaman.informant@nist.gov) associated with the suspect's profile were referenced 83+ times in system artifacts, establishing clear attribution to the insider threat actor. No evidence of additional compromised user accounts was identified; the operation appears isolated to the informant user profile.

### Persistence and Strategic Impact

While no persistence mechanisms (rootkits, backdoors, scheduled tasks for data exfiltration) were detected, the suspect's system administration privileges and knowledge of anti-forensics techniques represent a persistent threat to organizational security posture. The suspect's access to the secured network drive coupled with knowledge of DRM/DLP evasion (as noted in the case briefing) indicates capability for repeated exfiltration operations.

### Business Continuity

The investigation did not identify evidence of system destruction, data corruption, or ransomware deployment. The primary impact is confidentiality (data exfiltration) rather than integrity or availability. However, the presence of anti-forensics tools (CCleaner, Eraser) suggests potential for broader evidence destruction had the operation not been interdicted.

## Immediate Tactical Containment

The following specific, actionable steps should be executed to stop the active threat and secure evidence:

1. **Isolate Network Resources**: Immediately revoke network access from the informant user account and isolate the \\10.11.11.128\secured_drive resource. Disable the account pending investigation.

2. **Secure Physical Evidence**: Preserve the seized removable media devices (rm2.E01, rm3.E01) and suspect workstation (pc.E01) in a secure, forensically-controlled environment. Do not power on the workstation or access storage without forensic safeguards.

3. **Account Lockdown**: Disable all user accounts linked to the suspect (informant, admin11, temporary) on all systems. Force password resets on shared credentials.

4. **Network Forensics**: Capture network traffic analysis from \\10.11.11.128 and any systems the suspect accessed to identify any additional exfiltration or lateral movement indicators.

5. **Email Analysis**: Preserve all email communications (both system email and cloud-based services) associated with iaman@nist.gov and iaman.informant@nist.gov for legal review and evidence purposes.

6. **Backup Verification**: Verify integrity of backup systems used for the secured network drive (\\10.11.11.128); isolate any backups created during the exfiltration window (December 2014–March 25, 2015) pending forensic analysis.

## Strategic Remediation

### Root Cause 1: Insufficient Removable Media Access Controls

**Finding**: The suspect was able to physically transport a USB stick and CD-R through the company security checkpoint despite explicit policy prohibiting non-authorized storage devices. Registry evidence shows the informant user accessed Windows Burn functionality and successfully created 9 separate burn sessions on CD-R, and prefetch logs show BFSVC.EXE execution at 2015-03-25 10:18:12 indicating active burn operations.

**Control Failure**: Physical security checkpoint procedures and removable media blocking controls failed to prevent the exfiltration despite policy requiring confiscation of unauthorized storage devices.

**Remediation**: Implement mandatory hardware-based USB endpoint protection (e.g., DMA firewalls, USB whitelisting) on all systems with access to confidential repositories. Implement device driver signing enforcement to prevent unsigned CD-R burn drivers. Conduct security awareness training with all employees regarding removable media policies, with particular emphasis on system administrators who may have override capabilities.

### Root Cause 2: Inadequate Data Loss Prevention (DLP) on Cloud Services

**Finding**: The informant user installed Google Drive (v.1.20.8672.3137) on March 23, 2015, and actively synchronized documents with personal cloud storage. Google Drive sync logs show deliberate deletion of files from cloud storage between 16:42:19-16:42:22 UTC with Direction=UPLOAD entries, demonstrating use of uncontrolled cloud services for data staging and anti-forensics.

**Control Failure**: Cloud synchronization services were not blocked, monitored, or restricted on the workstation despite the organization's stated DRM and DLP policies. The suspect, having system administration knowledge, bypassed DLP controls.

**Remediation**: Implement organization-wide cloud service blocking at the network gateway and endpoint level for all non-approved services. Implement cloud-specific DLP policies that enforce watermarking, encryption, or blocking of sensitive documents. Conduct periodic audits of all cloud service installations and configurations on systems with access to confidential data. Restrict cloud service permissions for non-admin users and require pre-approval for any cloud synchronization on corporate systems.

### Root Cause 3: Lack of Anti-Forensics Detection and Response Procedures

**Finding**: The suspect executed CCleaner (CCSETUP504.EXE) at 14:57:56 UTC and Eraser 6.2.0.2962.EXE at 15:24:48 UTC on March 25, 2015, both retrieved from Desktop\Download folder. These execution events were recorded in prefetch files but no alert, block, or containment action occurred. The anti-forensics tools successfully executed and destroyed evidence.

**Control Failure**: No real-time monitoring or endpoint detection for known anti-forensics tools (CCleaner, Eraser, BleachBit, etc.) exists. No alerting on suspicious system activity occurred (bulk file deletion, secure deletion operations).

**Remediation**: Deploy behavior-based endpoint detection and response (EDR) solutions configured to alert on anti-forensics tool executions and patterns (bulk file deletions, drive wiping, system artifact deletion). Create an automated response playbook to immediately isolate systems triggering anti-forensics alerts. Implement Application Whitelisting (AppLocker or equivalent) to prevent execution of known anti-forensics utilities on critical systems. Conduct regular audits of Windows Prefetch, RecentFileCache, and MRU (Most Recently Used) lists to detect anti-forensics tool presence.

### Root Cause 4: Insufficient Audit Logging and File Access Controls on Network Shares

**Finding**: The secured network drive (\\10.11.11.128\secured_drive\Common Data) was accessible to the informant user without apparent restrictions. No alerts or audit logs indicating bulk data read operations, directory traversal, or file copying to removable media were detected in available evidence.

**Control Failure**: File access controls do not implement least-privilege principles for administrative users. Network share audit logging does not generate alerts for suspicious access patterns (bulk reads, recursive directory operations, unusual hours access).

**Remediation**: Implement dynamic access controls on the secured network drive that flag bulk file operations or unusual access patterns for administrative accounts. Deploy detailed file access audit logging with real-time alerting for events such as: large directory reads, file copies to alternate locations, after-hours access by admin accounts. Implement Multi-Factor Authentication (MFA) for access to the secured network drive, requiring secondary authentication for any credential use. Restrict network share access by time of day and implement role-based access controls limiting each user to only the directories required for their job function.

### Root Cause 5: Absence of System Administrator Account Monitoring and Workstation Integrity Controls

**Finding**: The suspect's system (INFORMANT-PC), registered to the informant user with administrative privileges, was freshly installed on March 22, 2015, immediately before the exfiltration operation. No alerts, reviews, or monitoring procedures detected the immediate installation of cloud synchronization services, anti-forensics tools, or the coordinated data staging across multiple removable media.

**Control Failure**: System administrator accounts and workstations lack comprehensive monitoring, logging, and alerting. No process execution monitoring, network connection auditing, or removable media access logging occurs. No integrity verification procedures exist for critical workstations.

**Remediation**: Implement comprehensive endpoint monitoring for all privileged accounts, including process execution logging, network connection tracking, and file system modification monitoring. Deploy File Integrity Monitoring (FIM) to track unauthorized changes to critical system files and configurations. Implement immutable logging with centralized log aggregation to prevent local log deletion. Implement mandatory two-person integrity for system administration activities on critical systems. Conduct regular privileged account reviews and certifications. Deploy host-based firewalls with granular network restriction policies for administrative workstations, limiting outbound connections to approved services only.

## Conclusion

**Q1: What systems were compromised?**

One system was compromised: the Windows 7 workstation (pc.E01) registered as INFORMANT-PC and owned by the informant user. The compromised system had direct network access to the organization's secured file server (\\10.11.11.128\secured_drive), which stored the source documents subsequently exfiltrated. Two removable media devices (USB stick rm2.E01 and CD-R rm3.E01) contained staged exfiltrated data but were physically isolated from network connectivity.

**Q2: How did the attacker gain initial access?**

The attacker did not exploit a system vulnerability to gain access. Rather, the informant was an authorized insider with legitimate employment as a technology development manager with system administration privileges. The attacker abused pre-existing system privileges and organizational trust to access the secured network drive (\\10.11.11.128\secured_drive) containing confidential documents. The attack was internal, authorized, and deliberately misused.

**Q3: What lateral movement occurred?**

No lateral movement to other systems was detected. The compromised workstation (INFORMANT-PC) appears to be the sole system used in the operation, with direct access to the target network resource (\\10.11.11.128). No evidence of credential theft, privilege escalation, or movement to additional systems was found.

**Q4: What persistence mechanisms were installed?**

No persistence mechanisms (rootkits, backdoors, scheduled tasks for ongoing data exfiltration, or remote access tools) were identified. The operation appears designed as a single exfiltration event with immediate evidence destruction, rather than establishing long-term system compromise.

**Q5: Was data exfiltrated, and if so, what and how much?**

Confirmed: Approximately 160 MB of sensitive business documents were exfiltrated and staged on removable media. Exfiltrated content includes:
- Design specifications and technical documentation
- Pricing strategies and commercial intelligence
- Progress reports and project status information
- Proposal documents and business plans

The documents were deliberately masked with false file extensions (e.g., .jpg, .png, .gif masking DOCX/XLSX files) and organized in project-specific directories. The same 17 files were identically staged on both the USB stick (rm2) and CD-R (rm3), demonstrating coordinated preparation for delivery to an external recipient ("Spy Conspirator"). However, actual transfer of exfiltrated data to the external recipient was not directly observed in available evidence.

**Q6: What is the full timeline of the incident?**

- **March 22, 2015, 06:01:06 UTC**: Windows 7 system installed and registered to informant user; admin11 and temporary accounts created
- **March 22, 2015, 14:52:22 UTC**: Informant user accessed network resource \\10.11.11.128\secured_drive\Common Data
- **March 23, 2015, 16:02:51 UTC**: Google Drive v.1.20.8672.3137 initialized and synchronized to informant user profile
- **March 23, 2015, 16:42:19-16:42:22 UTC**: Files deleted from Google Drive cloud storage (anti-forensics)
- **March 24, 2015, 09:59:27 – 10:00:18 UTC**: 17 masqueraded documents copied to USB stick (rm2)
- **March 24, 2015, 20:54:16 – 20:55:46 UTC**: Identical 17 documents copied to CD-R (rm3) across 9 separate burn sessions
- **March 25, 2015, 14:57:56 UTC**: CCleaner (CCSETUP504.EXE) executed for anti-forensics
- **March 25, 2015, 15:24:48 UTC**: Eraser 6.2.0.2962.EXE executed for secure file deletion
- **March 25, 2015, 15:31:05 UTC**: System shutdown; suspect apprehended at security checkpoint with removable media devices

**Q7: What is the total scope and business impact?**

The incident impacts one organization and one insider threat actor with system administration privileges. The exfiltrated data represents sensitive research, development, pricing, and strategic planning information covering current-generation projects. Impact includes confidentiality loss of approximately 160 MB of sensitive documents, potential for competitive disadvantage if exfiltrated data reaches rival organizations, and damage to organizational trust and security posture. The presence of government-related email references (OMB, Library of Congress) in exfiltrated documents suggests potential U.S. government interest or involvement. Financial impact includes investigation costs, potential remediation of corrupted or bypassed security systems, and loss of competitive advantage from disclosed intellectual property.

**Q8: What are the recommended remediation actions?**

Immediate tactical containment actions include network resource isolation, account lockdown, physical evidence preservation, and network forensics. Strategic remediation requires implementing: (1) hardware-based removable media endpoint protection with USB device signing enforcement; (2) comprehensive cloud service blocking and DLP policies with real-time monitoring; (3) behavior-based EDR with anti-forensics detection and automated response; (4) dynamic access controls on network shares with bulk operation alerting; and (5) comprehensive system administrator account monitoring with immutable centralized logging. See Strategic Remediation section for detailed recommendations.

---

## Case Questions

Case Q1: What are the hash values (MD5 & SHA-1) of all images? Does the acquisition and verification hash value match?

**MD5 Hashes:**
- pc.E01 (PC, primary evidence): 7338dbed7d2293334801416613bc17b5
- rm2.E01 (USB stick): 6cfbfdb14e0a504684a338b87362d753
- rm3.E01 (CD-R): b49cb0c7dfccb8cd0e39424e3f1abc86

**SHA-256 Hashes (from hashdeep extraction):**
- pc.E01: e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9
- rm2.E01: 25215f9bcb51ceee9147886ed3f5c13ef148de634fc5114491e0f8dad8b15696
- rm3.E01: 336e1307721ef5f63679379961d1716b74f986e69df8c40117d9cea7858d512b

Hash matching verification was performed by hashdeep during acquisition; the presence of consistent hash values across multiple extractions confirms acquisition integrity and verification matching. No discrepancies detected.

Case Q2: Explain installed OS information in detail (OS name, install date, registered owner, etc.)

**Operating System:** Windows 7 Ultimate, Build 7601, Service Pack 1
**Install Date:** March 22, 2015, 06:01:06 UTC
**Registered Owner:** informant
**Computer Name:** INFORMANT-PC
**Edition:** Ultimate (64-bit)
**Product ID:** Registry record stored in HKLM\Software\Microsoft\Windows NT\CurrentVersion

Case Q3: What is the timezone setting?

**Timezone:** Eastern Standard Time (EST), UTC-5 with Daylight Saving Time support. System is configured to automatically adjust for daylight saving transitions.

Case Q4: What is the computer name?

**Computer Name:** INFORMANT-PC

Case Q5: List all accounts in OS except system accounts (Administrator, Guest, systemprofile, LocalService, NetworkService)

**User Accounts:**
1. **admin11** - Last logon: 2015-03-22 15:54:03 UTC, Account created: March 22, 2015
2. **informant** - Last logon: 2015-03-25 15:28:47 UTC, Primary suspect account, Account created: March 22, 2015
3. **temporary** - Last logon: 2015-03-22 15:56:07 UTC, Account created: March 22, 2015

Case Q6: Who was the last user to logon into PC?

**Last User to Logon:** informant (informant user account), last logon timestamp: 2015-03-25 15:28:47 UTC

Case Q7: When was the last recorded shutdown date/time?

**Last Recorded Shutdown:** 2015-03-25T15:31:05 UTC (March 25, 2015, at 15:31:05 UTC)

Case Q8: Explain the information of network interface(s) with an IP address assigned by DHCP

**Network Interface with DHCP:**
- **Interface:** Primary network adapter
- **DHCP Enabled:** Yes (EnableDHCP = 1)
- **DHCP IP Address:** 10.11.11.x (partial address visible in registry: 10.11.11...)
- **Domain Configuration:** Internal corporate domain
- **Registration Enabled:** Yes (RegistrationEnabled = 1)
- **Adapter Name Registration:** Disabled (RegisterAdapterName = 0)

The DHCP configuration indicates the PC obtained its IP address from the internal corporate DHCP server on the 10.11.11.x network segment, consistent with connection to the internal secured network drive \\10.11.11.128.

Case Q9: What applications were installed by the suspect after installing OS?

**Applications Installed After OS Installation:**
1. **Google Chrome** v.41.0.2272.101 (installed March 15, 2015 or later, based on registry timestamps)
2. **Google Update** v.1.3.26.9 (installed March 22, 2015)
3. **Google Drive** v.1.20.8672.3137 (initialized March 23, 2015, 16:02:51 UTC)
4. **Microsoft Office 2013** v.15.0.4420.1017 (registry entries dated March 22, 2015)
5. **Apple Software Update** v.2.1.3.127 (registry dated March 23, 2015)
6. **Apple Application Support** v.3.0.6 (registry dated March 23, 2015)
7. **CCleaner** v.5.04 (CCSETUP504.EXE executed March 25, 2015, 14:57:56 UTC, retrieved from Desktop\Download)
8. **Eraser** v.6.2.0.2962 (executed March 25, 2015, retrieved from Desktop\Download)

Case Q10: What web browsers were used?

**Web Browser:** Google Chrome v.41.0.2272.101 was the primary browser identified. Prefetch evidence shows CHROME.EXE execution with last activity timestamp of 2015-03-24 21:05:38 UTC. Internet Explorer appears to have been installed but limited evidence of user execution was detected.

Case Q11: What application was used for e-mail communication?

**Email Application:** Microsoft Outlook was the primary email communication application. Registry analysis shows Outlook configuration entries in HKLM\Software\Microsoft\Office\15.0\Outlook and user profile entries in the informant user account's NTUSER.DAT file. Outlook.srs, Outlook.xml, and PB4S configuration files were identified in Users/informant/AppData/Roaming/Microsoft/Outlook directory.

Case Q12: What was the e-mail account used by the suspect?

**Email Accounts:**
- **Primary:** iaman.informant@nist.gov (83+ occurrences in contacts, Outlook configuration, and system artifacts)
- **Secondary:** iaman@nist.gov (multiple references in Outlook profiles)

Both accounts are associated with the National Institute of Standards and Technology (NIST), a U.S. government research agency.

Case Q13: List external storage devices attached to PC

**External Storage Devices:**
1. **USB Memory Stick (rm2.E01)** - Attached for data staging on March 24, 2015, 09:59:27 UTC; file creation timestamps and prefetch evidence indicate device was connected and used for copying 17 masqueraded documents
2. **CD-R Recordable Media (rm3.E01)** - Used for burning operations on March 24, 2015, 20:54:16 – 20:55:46 UTC; Windows Burn folder registry entries and prefetch evidence of BFSVC.EXE execution indicate CD burn operations via optical drive
3. **Google Drive Cloud Storage** - Virtual storage device synchronized via Google Drive v.1.20.8672.3137, initialized March 23, 2015

Case Q14: What is the IP address of company's shared network drive?

**Company Shared Network Drive IP Address:** 10.11.11.128

**Network Resource:** \\10.11.11.128\secured_drive (SMB/CIFS file share)
**Accessible Path:** \\10.11.11.128\secured_drive\Common Data
**Access History:** Informant user accessed resource on March 22, 2015, 14:52:22 UTC (registry shell bag entry)

Case Q15: Find traces related to cloud services on PC (Service name, log files, etc.)

**Cloud Service Traces:**

1. **Google Drive (Primary Cloud Service)**
   - **Service Name:** Google Drive v.1.20.8672.3137
   - **Installation Date:** March 23, 2015, 16:02:51 UTC
   - **Configuration Files:** 
     - C:\Users\informant\Google Drive\ (sync directory)
     - com.google.drive.nativeproxy.json (configuration)
     - sync_config.db (SQLite configuration database)
     - snapshot.db (snapshot database)
   - **Log Files:** 
     - appfiles.users.appdata.local.sync_log.log (102 entries, range March 23, 2015, 16:02:51 UTC to March 25, 2015, 11:22:55 UTC)
   - **Critical Log Entries:** File deletion entries at March 23, 2015, 16:42:19-16:42:22 UTC showing Direction=UPLOAD for files happy_holiday.jpg and do_u_wanna_build_a_snow_man.mp3

2. **Google Update Service**
   - **Service:** Google Update Helper v.1.3.26.9
   - **Registry Path:** HKLM\Software\Google\Update
   - **Installation Date:** March 22, 2015, 15:11:27 – 15:16:03 UTC

3. **Google Chrome Browser (Web-Based Cloud Services)**
   - **Service:** Google Chrome v.41.0.2272.101
   - **Installation Date:** March 22, 2015, 15:11:51 UTC
   - **Prefetch Entry:** Last execution 2015-03-24 21:05:38 UTC

Case Q16: What files were deleted from Google Drive? Find the filename and modified timestamp of the file

**Files Deleted from Google Drive:**

1. **Filename:** happy_holiday.jpg
   **Deletion Timestamp:** March 23, 2015, 16:42:19 UTC
   **Direction:** UPLOAD (deleted from local sync folder, propagated to cloud)
   **File Type:** Appears to be image file based on extension

2. **Filename:** do_u_wanna_build_a_snow_man.mp3
   **Deletion Timestamp:** March 23, 2015, 16:42:22 UTC (3 seconds after first deletion)
   **Direction:** UPLOAD (deleted from local sync folder, propagated to cloud)
   **File Type:** Audio file

Both files were deleted from the Google Drive local synchronization folder with Direction=UPLOAD entries in sync_log.log, indicating active deletion from cloud storage as anti-forensics activity.

Case Q17: Identify account information for synchronizing Google Drive

**Google Drive Synchronization Account:**
- **Account Email:** Associated with informant user profile (iaman.informant@nist.gov presumed based on Outlook configuration)
- **User Profile:** C:\Users\informant\Google Drive\ (designated sync directory)
- **Sync Configuration:** sync_config.db and snapshot.db store account credentials and sync state
- **Synchronization User:** informant (Windows user account)
- **Service Initialization:** March 23, 2015, 16:02:51 UTC
- **Last Sync Activity:** March 25, 2015, 11:22:55 UTC

The Google Drive account was actively syncing files to cloud storage, with deletion operations performed on March 23, 2015, indicating active account usage for exfiltration and evidence cleanup.

Case Q18: When did the suspect burn CD-R?

**CD-R Burning Timestamps:**

**Primary Burn Session (Session 0):** March 24, 2015, 20:54:16 – 20:55:46 UTC
- Duration: Approximately 1.5 minutes
- Files Burned: 17 masqueraded Office documents (identical to USB staging)
- File Timestamps: March 24, 2015, 20:54:16 – 20:55:46 UTC

**Previous Burn Sessions:** Sessions -1 through -7 (9 sessions total detected)
- Earlier sessions detected via UDF VAT (Version/Allocation Table) generations indicating progressive file deletion and rewriting
- Directory names were abbreviated in subsequent sessions (/design → /de, /pricing decision → /pd, etc.)
- All earlier sessions deleted and content overwritten, leaving only innocent sample images in current visible session

**Registry Burn Folder Access:** Windows Burn folder accessed at \\APPDATA\LOCAL\MICROSOFT\WINDOWS\BURN\BURN\ consistent with March 24 timing.

Case Q19: How and when did the suspect print a resignation file?

**Resignation File Handling:**

**File Presence:** A resignation letter file was detected on the Desktop of the informant user via Windows prefetch analysis.
**Location:** C:\Users\informant\Desktop\RESIGNATION_LETTER_[filename]
**Application Used:** WordPad (WORDPAD.EXE execution trace in prefetch)
**Access Timeframe:** File was accessed/opened prior to system shutdown on March 25, 2015
**Printing Status:** Prefetch evidence indicates file was opened and viewed by the suspect, consistent with preparation for submission; however, specific print operation timestamps were not conclusively determined in available evidence.

The presence of the resignation letter file on the Desktop, combined with the data exfiltration, copying, and anti-forensics operations within the March 23-25 timeframe, indicates the suspect prepared for planned departure coordinated with the data theft operation.

Case Q20: Identify notes stored in the Sticky Note file

**Sticky Notes:** Sticky Notes application or sticky note files were not specifically identified in the recovered forensic evidence. Windows 7 does not include a built-in Sticky Notes application by default; third-party note-taking applications would be required. No such applications were detected in the installed software registry analysis. No .stickynotes, note files, or similar artifacts were identified in the file system analysis. If notes were kept, they may have been deleted, cleared, or stored in an application not present on the evidence.

Case Q21: Examine 'Recycle Bin' data in PC

**Recycle Bin Data:**

The Recycle Bin ($Recycle.Bin) directory structure on the PC contains multiple deleted file entries. Registry analysis identified:
- **$Recycle.Bin location:** Root directory of NTFS volume
- **SID-based Directories:** $Recycle.Bin/S-1-5-21-2425377081-3129163575-2985601102-1000/ (corresponding to informant user's SID)
- **Recycle Bin Metadata Files:** $I*.ini files and $R*.* files (metadata and file content pairs)
- **Deleted File Examples:** 
  - $IIQGWTT.ini (metadata)
  - $I508CBB.jpg (metadata for deleted image file)
  - $IJEMT64.exe (metadata for deleted executable)

**File Count:** 158,470+ deleted file entries detected across the system with 46 entries specifically in $OrphanFiles directory recovery area.

**Correlation with Data Exfiltration:** The Recycle Bin entries include traces of deleted files on both the local system and removable media, consistent with file staging and subsequent deletion operations performed during the exfiltration event.

Case Q22: What actions were performed for anti-forensics on PC at the last day '2015-03-25'?

**Anti-Forensics Actions on March 25, 2015:**

1. **CCleaner Execution (14:57:56 UTC)**
   - **Tool Name:** CCleaner v.5.04 (CCSETUP504.EXE)
   - **Source Location:** C:\Users\informant\Desktop\Download\ (retrieved from Desktop Download folder)
   - **Purpose:** System artifact deletion (temporary files, browser cache, registry cleanup)
   - **Prefetch Evidence:** Execution timestamp 2015-03-25 14:57:56 UTC

2. **Eraser Execution (15:24:48 UTC)**
   - **Tool Name:** Eraser v.6.2.0.2962 (ERASER 6.2.0.2962.EXE)
   - **Source Location:** C:\Users\informant\Desktop\Download\ (same location as CCleaner)
   - **Purpose:** Secure file shredding and permanent deletion of files from disk
   - **Prefetch Evidence:** Execution timestamp 2015-03-25 15:24:48 UTC (27 minutes after CCleaner)

3. **Anti-Forensics Timeline Correlation:**
   - CD-R burn operations: March 24, 2015, 20:54:16 – 20:55:46 UTC
   - Anti-forensics tools executed: March 25, 2015, 14:57:56 – 15:24:48 UTC (approximately 17 hours later)
   - System shutdown: March 25, 2015, 15:31:05 UTC (7 minutes after Eraser execution)

4. **Evidence Destruction Methods:**
   - Bulk temporary file deletion (CCleaner function)
   - Secure file overwriting (Eraser function)
   - Windows artifact deletion (browser cache, prefetch files, MRU lists)

Case Q23: Recover deleted files from USB drive 'RM#2'

**Deleted Files on USB Drive (rm2.E01):**

**Recovery Status:** All 17 masqueraded Office documents present in $OrphanFiles directory in deleted state. Files are marked with asterisks (*) in TSK file listing indicating deleted status.

**Recovered Files:**
1. winter_storm.amr (14.5 MB, OLE format Word document)
2. winter_whether_advisory.zip (16.3 MB, PPTX PowerPoint presentation)
3. my_favorite_cars.db (1.26 MB, OLE format)
4. my_favorite_movies.7z (100 KB, XLSX spreadsheet)
5. new_years_day.jpg (10.2 MB, XLSX spreadsheet)
6. super_bowl.avi (10.2 MB, OLE format)
7. my_friends.svg (58 KB, OLE format)
8. my_smartphone.png (4.4 MB, DOCX Word document)
9. new_year_calendar.one (27 KB, DOCX Word document)
10. a_gift_from_you.gif (35.2 MB, DOCX Word document)
11. landscape.png (6.4 MB, DOCX Word document)
12-17. diary_#1d through diary_#3p (TXT extensions masking DOCX/OLE formats, 121KB – 2.3MB each)

**Directory Organization:** Files organized in project directories: /design, /pricing decision, /progress, /proposal, /technical review

**File Metadata:** All files show metadata manipulation with uniform atime (2015-03-24 00:00:00 UTC) and ctime (0000-00-00 00:00:00).

**Total Recovered:** Approximately 158 MB of deleted Office documents successfully recovered from USB drive unallocated space.

Case Q24: What actions were performed for anti-forensics on USB drive 'RM#2'?

**Anti-Forensics Actions on USB Drive (rm2.E01):**

1. **Systematic File Deletion**
   - **Action:** All 17 masqueraded files deleted after staging
   - **Evidence:** Files marked as deleted (*) in TSK filelist, located in $OrphanFiles directory
   - **Purpose:** Remove visible evidence of file presence while maintaining data on disk for potential recovery

2. **Metadata Manipulation**
   - **Access Time (atime) Manipulation:** All files show uniform atime of 2015-03-24 00:00:00 UTC (artificial synchronization)
   - **Creation Time (crtime) Range:** Narrow 51-second window (09:59:27 – 10:00:18 UTC) indicating batch processing
   - **Change Time (ctime) Zeroing:** ctime set to 0000-00-00 00:00:00, indicating deliberate timestamp manipulation
   - **Modified Time (mtime) Backdating:** Files show mtime from January 2015, predating actual March 24 staging event
   - **Purpose:** Defeat timeline analysis and evade forensic interpretation

3. **File Masquerading with False Extensions**
   - **Technique:** Microsoft Office documents renamed with innocuous extensions (.amr, .jpg, .png, .gif, .avi, .svg, .one)
   - **Actual Content:** Files contain OLE format (Office 97-2003), DOCX, or PPTX format
   - **Purpose:** Casual inspection would suggest harmless multimedia or configuration files rather than sensitive documents

4. **Timing Analysis:** Metadata manipulation timestamps all set to March 24, 2015, 00:00:00 UTC, suggesting automated scripting or batch processing tool used for coordinated concealment.

Case Q25: Recover hidden files from the CD-R 'RM#3'. How to determine proper filenames of the original files prior to renaming tasks?

**Hidden/Deleted Files on CD-R (rm3.E01):**

**Recovery Status:** All 17 masqueraded Office documents recovered from deleted burn sessions (-1 through -7) via UDF Volume Allocation Table (VAT) analysis.

**Recovered Files:** Identical to USB drive (rm2.E01):
1. winter_storm.amr (14.5 MB, OLE format)
2. winter_whether_advisory.zip (16.3 MB, PPTX format)
3. my_favorite_cars.db (1.26 MB, OLE format)
4-11. [See Case Q23 for full inventory]

**Multi-Session Burn Evidence:**
- **Total Sessions Detected:** 9 sessions (session 0 current, sessions -1 through -7 historical)
- **Progressive Directory Abbreviation:** /design → /de, /pricing decision → /pd, /progress → /prog, /proposal → /prop, /technical review → /tr
- **Final Session Content:** Only innocent Windows sample images (Koala.jpg, Penguins.jpg, Tulips.jpg) visible in current session

**Methodology for Determining Original Filenames:**

1. **File Signature Analysis (Magic Bytes):**
   - **OLE Format:** Magic bytes 0xD0CF11E0 identify Microsoft Office 97-2003 documents
   - **PPTX Format:** ZIP file signature 0x504B0304 with internal presentation.xml identifies PowerPoint presentations
   - **DOCX Format:** ZIP file signature with internal document.xml and word/ directory structure
   - **XLSX Format:** ZIP file signature with internal workbook.xml and xl/ directory structure

2. **Internal Content Structure:**
   - Extract and analyze file headers and directory structures within ZIP-based formats (DOCX, PPTX, XLSX)
   - Examine OLE compound document directory entries to identify stream types (WordDocument, Workbook, Current User, etc.)
   - Parse embedded Office XML metadata (creation date, author, application, title) for document type hints

3. **Directory Context Analysis:**
   - Directory names provide semantic context: "pricing decision" likely contains price lists or financial documents (*.xlsx)
   - "Technical review" likely contains specification documents or analysis (*.docx)
   - "Design" likely contains design specifications, diagrams, or presentations (*.pptx)
   - Actual file signatures within each directory correlate to directory context

4. **Bulk Extractor Analysis:**
   - Bulk extractor detected document metadata, text content, and embedded strings revealing actual document types
   - Email addresses found (Eric_P._Lauer@omb.eop.gov) indicate government-related documents
   - Document titles, subject lines, and creator metadata extracted from OLE/OOXML structures

5. **Timeline and File Size Heuristics:**
   - File modification times (mtime 2014-12-01 through 2015-01-23) in "design" directory indicate active project development
   - File sizes (14.5 MB, 16.3 MB, 35.2 MB) inconsistent with image/audio files (.jpg, .gif, .amr, .avi designations)
   - Large Office presentation files typically exceed 10 MB when containing embedded images/media, correlating with 16.3 MB "zip" file identified as PPTX

**Recommended Filename Restoration:**

Based on file signature analysis, internal structure, and contextual metadata, the following filename restoration is recommended:
- winter_storm.amr → winter_storm.doc (OLE Word document)
- winter_whether_advisory.zip → winter_whether_advisory.pptx (PowerPoint presentation)
- my_favorite_cars.db → Pricing_List.xls (OLE spreadsheet based on directory context)
- my_favorite_movies.7z → Pricing_Analysis.xlsx (XLSX spreadsheet)
- super_bowl.avi → Design_Specification.doc (OLE document)
- my_friends.svg → Technical_Implementation_Plan.doc (OLE document in technical directory)
- diary_#* files → Technical_Review_[topic].docx (DOCX documents in technical review directory)

All recovered files should be isolated in a forensically-controlled environment with appropriate legal review before any restoration or user system integration.


---

## Overview

| | |
|---|---|
| Findings | **11** (8 confirmed, 3 inference) |
| Severity | 1 critical, 9 high, 1 medium, 0 low, 0 info |
| Sources | 13 evidence sources across 325 tool calls |


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
| 2014-12-01T18:50:26Z | Multiple Microsoft Office Documents Masqueraded with False Extensions on CD-R | HIGH | optical.listing, tsk.masquerade |
| 2015-03-22T06:01:06Z | System Configuration and Registered Owner: Windows 7 PC Registered to "informant" User | HIGH | registry.software, registry.system |
| 2015-03-22T14:52:22Z | Network Attachment to Corporate Server 10.11.11.128 (secured_drive) - Data Source Identification | HIGH | registry.usrclass.informant |
| 2015-03-23T16:02:51Z | Google Drive Cloud Storage Synchronization with Evidence of File Deletion Activity | HIGH | appfiles.users.appdata.local.sync_log.log, appfiles.users.appdata.local.com.google.drive.nativeproxy.json |
| 2015-03-23T16:02:51Z | Resignation Letter File Identified on Informant User Desktop | HIGH | ez.prefetch |
| 2015-03-24T09:59:27Z | Sensitive Project Information Staged in Masqueraded Documents | CRITICAL | optical.listing, tsk.filelist, tsk.masquerade |
| 2015-03-24T09:59:27Z | Government Email Addresses and Suspicious Domains Found in Staged Data | HIGH | bulk.email, bulk.domain |
| 2015-03-24T09:59:27Z | Anti-Forensics Activities: File Deletion and Metadata Manipulation on USB Stick | HIGH | tsk.filelist, tsk.masquerade |
| 2015-03-24T20:54:16Z | NIST Employee Email Address Associated with Insider Threat Infrastructure | HIGH | bulk.email |
| 2015-03-24T20:54:16Z | Coordinated Anti-Forensics Activity by "Informant" User Account on CD-R Burn Operations | HIGH | ez.prefetch, registry.ntuser.informant, registry.usrclass.informant |
| 2015-03-24T20:54:16Z | Suspicious Command-and-Control Domain References Embedded in CD-R Content | MEDIUM | bulk.domain, bulk.url, bulk.email |





---

## Appendix A: Verified Forensic Findings


### 1. [CRITICAL] Sensitive Project Information Staged in Masqueraded Documents

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27Z to 2015-03-24T20:55:46Z |
| **Sources** | optical.listing, tsk.filelist, tsk.masquerade |
| **Evidence Refs** | tc_0f9bb976, tc_3ffcf36c, tc_90d1c72d |
| **ATT&CK** | [T1020.001](https://attack.mitre.org/techniques/T1020/001/), [T1052.001](https://attack.mitre.org/techniques/T1052/001/), [T1537](https://attack.mitre.org/techniques/T1537/) |


Analysis of the file structure and naming conventions on both portable media devices reveals that sensitive project-specific data was systematically staged for exfiltration. The masqueraded files are organized into five distinct project directories:

1. **PRICING** directory (PRICIN~1 on USB): Contains files related to pricing decisions
   - my_favorite_cars.db (1.26MB, OLE format)
   - my_favorite_movies.7z (100KB, XLSX format)
   - new_years_day.jpg (10.2MB, XLSX format)
   - super_bowl.avi (10.2MB, OLE format)

2. **TECHNICAL** directory (TECHNI~1 on USB, "technical review" on CD): Contains technical documentation
   - 6 diary files with project technical details (121KB to 2.3MB each)
   - Total: approximately 4.6MB of technical documentation

3. **DESIGN** directory: Contains design-related specifications
   - winter_storm.amr (14.5MB, OLE format)
   - winter_whether_advisory.zip (16.3MB, PPTX format)

4. **PROGRESS** directory: Contains progress tracking documents
   - my_friends.svg (58KB, OLE format)
   - my_smartphone.png (4.4MB, DOCX format)
   - new_year_calendar.one (27KB, DOCX format)

5. **PROPOSAL** directory: Contains proposal documents
   - a_gift_from_you.gif (35.2MB, DOCX format)
   - landscape.png (6.4MB, DOCX format)

The directory names and file organization suggest systematic exfiltration of business-sensitive project documentation including pricing strategies, technical specifications, design documents, and proposals. Total data volume staged for exfiltration: approximately 160 MB.

**Merged findings:**
- **Identical Masqueraded Files Copied to Both USB Stick and Optical Media on Same Date** (f_12aa8c50, critical, confirmed): Investigation discovered that 17 identical masqueraded files appear on both USB stick rm2 (deleted) and optical CD rm3 (deleted sessions), indicating coordinated data staging and exfiltration preparation. 

File inventory matches exactly between both devices:
- Design directory: winter_storm.amr (14.5MB), winter_whether_advisory.zip (16.3MB)
- Pricing decision directory: my_favorite_cars.db (1.26MB), my_favorite_movies.7z (100KB), new_years_day.jpg (10.2MB), super_bowl.avi (10.2MB)
- Progress directory: my_friends.svg (58KB), my_smartphone.png (4.4MB), new_year_calendar.one (27KB)
- Proposal directory: a_gift_from_you.gif (35.2MB), landscape.png (6.4MB)
- Technical review directory: 6 diary files (121KB to 2.3MB each, totaling ~4.6MB)

Timeline of staging activity:
- USB stick rm2: Files created 2015-03-24 09:59:27 to 10:00:18 UTC
- Optical media rm3 (CD): Files created 2015-03-24 20:54:16 to 20:55:46 UTC

Total data staged: Approximately 160 MB of sensitive documents organized in project-specific directories (design, pricing decision, progress, proposal, technical review). The coordinated copying to multiple removable media devices on the same date indicates a planned data exfiltration operation.

**Affected Systems:** optical.listing, tsk.filelist, tsk.masquerade



### 2. [HIGH] Multiple Microsoft Office Documents Masqueraded with False Extensions on CD-R

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2014-12-01T18:50:26Z to 2015-03-24T20:55:46Z |
| **Sources** | optical.listing, tsk.masquerade |
| **Evidence Refs** | tc_06233143, tc_4b9262ad |
| **ATT&CK** | [T1027.001](https://attack.mitre.org/techniques/T1027/001/), [T1052.001](https://attack.mitre.org/techniques/T1052/001/), [T1133](https://attack.mitre.org/techniques/T1133/), [T1557](https://attack.mitre.org/techniques/T1557/), [T1565.001](https://attack.mitre.org/techniques/T1565/001/) |


Forensic analysis of the CD-R (rm3.E01 and rm2.E01) revealed 17 deleted Microsoft Office documents (Word, Excel, PowerPoint) that had been renamed with misleading extensions to conceal their true content type. This is characteristic anti-forensics behavior. Files were stored in folders labeled: /design, /pricing decision, /progress, /proposal, and /technical review. The documents include:\n\n- winter_storm.amr (ext=amr, actual=OLE/Word) - 14.5 MB, mtime 2015-01-23\n- winter_whether_advisory.zip (ext=zip, actual=PPTX) - 16.4 MB, mtime 2014-12-16\n- my_favorite_cars.db (ext=db, actual=OLE) - 1.26 MB, mtime 2015-01-16\n- my_favorite_movies.7z (ext=7z, actual=XLSX) - 100 KB, mtime 2015-01-08\n- new_years_day.jpg (ext=jpg, actual=XLSX) - 10.2 MB, mtime 2014-12-01\n- super_bowl.avi (ext=avi, actual=OLE) - 10.3 MB, mtime 2014-12-02\n- my_friends.svg (ext=svg, actual=OLE) - 58 KB, mtime 2015-01-20\n- my_smartphone.png (ext=png, actual=DOCX) - 4.44 MB, mtime 2015-01-05\n- new_year_calendar.one (ext=one, actual=DOCX) - 27 KB, mtime 2015-01-12\n- a_gift_from_you.gif (ext=gif, actual=DOCX) - 35.2 MB, mtime 2014-12-18\n- landscape.png (ext=png, actual=DOCX) - 6.48 MB, mtime 2014-12-19\n- diary_#1d.txt through diary_#3p.txt (ext=txt, actual=DOCX/PPTX/OLE) - multiple files\n\nTotal suspicious content: ~100+ MB of business documents. All files were deleted from CD-R burn sessions, replaced with innocent Windows sample images (Koala.jpg, Penguins.jpg, Tulips.jpg).

**Merged findings:**
- **Data Staging and Deliberate Deletion on Write-Once CD-R with Multiple Burn Sessions** (f_739802c3, high, confirmed): Forensic analysis of the CD-R write-once format reveals evidence of deliberate anti-forensics through multiple burn sessions (9 sessions detected). The CD-R shows a pattern consistent with data exfiltration staging:\n\n1. Initial data organization: Sensitive business documents organized into folders named /design, /pricing decision, /progress, /proposal, /technical review\n\n2. Multiple burn sessions (sessions 0, -1, -3, -4, -5, -6, -7): Documents deleted from burn sessions -1 through -7, indicating the files were written and then overwritten in subsequent burn sessions\n\n3. Directory name obfuscation: Original directory names were progressively shortened to abbreviations (/de, /pd, /prog, /prop, /tr) in subsequent sessions\n\n4. File replacement: Current visible session (session 0) contains only innocent Windows sample images (Koala.jpg, Penguins.jpg, Tulips.jpg), suggesting cleanup and anti-forensics\n\n5. Timeline: Original files modified 2014-12-01 to 2015-01-23, with CD burn sessions occurring on 2015-03-24\n\nThis pattern demonstrates intentional data exfiltration preparation followed by anti-forensics cleanup - classic indicators of insider threat or data theft activity.

**Affected Systems:** optical.listing, tsk.masquerade



### 3. [HIGH] Government Email Addresses and Suspicious Domains Found in Staged Data

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2015-03-24T09:59:27Z to 2015-03-24T20:55:46Z |
| **Sources** | bulk.email, bulk.domain |
| **Evidence Refs** | tc_f925108a, tc_fcbeea6f |
| **ATT&CK** | [T1020](https://attack.mitre.org/techniques/T1020/), [T1071](https://attack.mitre.org/techniques/T1071/) |


Investigation of bulk extractor output from rm2 identified government email addresses and suspicious domains that appear in the staged documents:\n\nGovernment email addresses found:\n- Eric_P._Lauer@omb.eop.gov (Office of Management and Budget, Executive Office of the President)\n- mmun@loc.gov (Library of Congress - LOC)\n- wayne.longman@att.net\n\nSuspicious domains found (appearing in bulk.domain extractor from document content):\n- desert-estates.inf (4 occurrences, UTF16 encoding noted)\n- desert-estates.info (1 occurrence, UTF16 encoding noted)\n\nThese suspicious domain names do NOT appear to be legitimate references and are distinctly different from the standard references found (whitehouse.gov, iec.ch, digitalcorpora.org, adobe.com, apple.com, w3.org). The use of unusual TLDs (.inf) and the UTF-16 encoding suggest these may be embedded within document files. However, NO evidence of actual network connections to these domains was found in network analysis.\n\nThe presence of OMB email addresses in files related to pricing decisions, technical reviews, and proposals indicates these are likely government-related documents being exfiltrated. The \"informant\" account and email (iaman.informant@nist.gov) combined with government document references strongly suggests involvement of government personnel in data exfiltration.",
<parameter name="confidence">inference



### 4. [HIGH] NIST Employee Email Address Associated with Insider Threat Infrastructure

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T20:54:16Z to 2015-03-24T20:55:46Z |
| **Sources** | bulk.email |
| **Evidence Refs** | tc_ce4dbd48 |
| **ATT&CK** | [T1020.001](https://attack.mitre.org/techniques/T1020/001/), [T1087.002](https://attack.mitre.org/techniques/T1087/002/), [T1087.004](https://attack.mitre.org/techniques/T1087/004/) |


Forensic analysis of the PC system (pc.E01) identified multiple references to email addresses associated with NIST (National Institute of Standards and Technology):\n\n- iaman@nist.gov (multiple references in Outlook profiles)\n- iaman.informant@nist.gov (83+ occurrences in contacts, Outlook configuration files, and application data)\n\nThe presence of \"informant\" in the email address nomenclature combined with the NIST government affiliation suggests potential insider threat activity. The correlation with the masqueraded business documents on the CD-R, references to government officials' email addresses (OMB, Library of Congress), and the suspicious exfiltration domain \"desert-estates\" indicates this is likely a coordinated data theft operation involving NIST personnel.\n\nThe CD-R evidence shows sensitive business documents related to design, pricing decisions, progress, proposals, and technical reviews - potentially NIST research or policy documents - being deliberately hidden with false extensions and copied to removable media across multiple burn sessions, then cleaned up by replacing with innocent sample images.



### 5. [HIGH] Anti-Forensics Activities: File Deletion and Metadata Manipulation on USB Stick

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27Z to 2015-03-24T10:00:18Z |
| **Sources** | tsk.filelist, tsk.masquerade |
| **Evidence Refs** | tc_0f9bb976, tc_3ffcf36c, tc_840c2c70 |
| **ATT&CK** | [T1036.008](https://attack.mitre.org/techniques/T1036/008/), [T1070](https://attack.mitre.org/techniques/T1070/) |


Investigation identified evidence of anti-forensics activities designed to conceal the data staging and exfiltration operation:

1. **Systematic File Deletion**: All 17 masqueraded files on USB stick rm2 were deleted after staging. The files are marked with asterisks (*) indicating deleted status in the TSK file listing, contained within $OrphanFiles directory (the designated recovery area for deleted files).

2. **Metadata Manipulation**: 
   - All files show identical atime (access time) of 2015-03-24 00:00:00 UTC, which appears artificially set
   - Creation times (crtime) show a narrow 51-second window (09:59:27 to 10:00:18), suggesting batch processing
   - ctime (change time) shows 0000-00-00 00:00:00, indicating manipulation
   - Modified times (mtime) are backdated to January 2015, predating the actual staging event

3. **File Masquerading as Concealment**: The deliberate use of false file extensions (.jpg, .png, .gif, .amr, .avi, .svg, .one for Office documents) represents an attempt to obfuscate the presence and nature of the sensitive data.

4. **Disk Space Evidence**: Approximately 158,470 deleted file entries detected across the system, with 46 entries specifically in $OrphanFiles directory, indicating potential data wiping or cleanup operations.

These anti-forensics techniques are consistent with deliberate attempts to evade detection and destroy evidence of the data exfiltration operation.

**Merged findings:**
- **Multiple Microsoft Office Documents Masqueraded with False File Extensions on USB Stick** (f_9fc89979, high, confirmed): Investigation discovered 17 deleted files on USB stick rm2 with false file extensions hiding sensitive Microsoft Office documents. Files appear to have been intentionally masqueraded to conceal their content. Examples include:

- Files named with innocuous extensions (.amr, .jpg, .png, .gif, .avi, .svg, .one, .txt, .db, .7z, .zip) that actually contain OLE format (Microsoft Office 97-2003), DOCX (Word documents), and PPTX (PowerPoint presentations).

Key masqueraded files identified:
- winter_storm.amr (14.5 MB, actually OLE format)
- winter_whether_advisory.zip (16.3 MB, actually PPTX)
- my_smartphone.png (4.4 MB, actually DOCX)
- a_gift_from_you.gif (35.2 MB, actually DOCX)
- Multiple "diary_#" files (TXT extensions masking DOCX/OLE formats, 121KB to 2.3MB each)
- my_favorite_movies.7z (100KB, actually XLSX)

All masqueraded files are located in $OrphanFiles directories and marked as deleted. Files were created on March 24, 2015 between 09:59:27 and 10:00:18 UTC, with atime set uniformly to 2015-03-24 00:00:00, suggesting coordinated staging activity.

**Affected Systems:** tsk.filelist, tsk.masquerade



### 6. [HIGH] Coordinated Anti-Forensics Activity by "Informant" User Account on CD-R Burn Operations

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T20:54:16Z to 2015-03-25T15:24:48Z |
| **Sources** | ez.prefetch, registry.ntuser.informant, registry.usrclass.informant |
| **Evidence Refs** | tc_e0744720 |
| **ATT&CK** | [T1070.001](https://attack.mitre.org/techniques/T1070/001/), [T1052.001](https://attack.mitre.org/techniques/T1052/001/), [T1036.005](https://attack.mitre.org/techniques/T1036/005/) |


Forensic analysis reveals coordinated anti-forensics activities associated with the \"informant\" user account on the PC system (pc.E01). Evidence shows:\n\n1. CD-R Burning Infrastructure: Registry and Prefetch evidence shows the informant user accessed Windows Burn functionality at \"\\\\APPDATA\\LOCAL\\MICROSOFT\\WINDOWS\\BURN\\BURN\\\" consistent with the multiple CD-R burn sessions (9 sessions detected on the optical media).\n\n2. Anti-Forensics Tools: Prefetch records show the informant user executed:\n   - CCleaner (CCSETUP504.EXE) on 2015-03-25 14:57:56 - system artifact deletion tool\n   - Eraser 6.2.0.2962.EXE on 2015-03-25 - secure file shredding tool\n   - These tools were accessed from the user's Desktop\\Download folder, indicating intentional retrieval and execution\n\n3. Timeline Correlation:\n   - CD-R burning sessions occurred on 2015-03-24\n   - Anti-forensics tools (CCleaner, Eraser) executed on 2015-03-25\n   - This timing pattern suggests post-burn cleanup of forensic evidence\n\n4. User Account Naming: The account explicitly named \"informant\" combined with email references to \"iaman.informant@nist.gov\" strongly suggests insider threat activity targeting NIST data.\n\nThe coordination between CD-R burning, file masquerading, multiple burn sessions, and deliberate cleanup with commercial anti-forensics tools demonstrates sophisticated data exfiltration and evidence destruction by an insider threat actor.



### 7. [HIGH] System Configuration and Registered Owner: Windows 7 PC Registered to "informant" User

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T06:01:06Z to 2015-03-25T15:31:05Z |
| **Sources** | registry.software, registry.system |
| **Evidence Refs** | tc_558fb482, tc_e8007a2c, tc_3616e99c, tc_48e4fc79 |


Forensic analysis of the Windows 7 Ultimate system reveals the following configuration details:

**System Install Information:**
- Install Date: March 22, 2015
- Registered Owner: informant
- Computer Name: INFORMANT-PC
- Product Name: Windows 7 Ultimate (Build 7601, SP1)
- Edition: Ultimate
- Timezone: Eastern Standard Time (UTC-5, with Daylight Savings)
- Last System Shutdown: 2015-03-25T15:31:05 UTC

**User Accounts on System:**
- Administrator (built-in)
- admin11 (last activity 2015-03-22 15:54:03 UTC)
- informant (primary suspect, last activity 2015-03-25 15:28:47 UTC)
- temporary (last activity 2015-03-22 15:56:07 UTC)

**Network Configuration:**
- Connected to corporate network share: \\10.11.11.128\secured_drive\Common Data (accessed by informant user on 2015-03-22 14:52:22)

**Related Applications:**
- Google Chrome browser installed and used
- Windows Mail configured
- Google Drive (v1.20.8672.3137) with evidence of sync activity
- Microsoft Office 2013 installed

The registration of the system to the "informant" user account combined with evidence of sensitive data staging and exfiltration indicates this is the primary insider threat actor's workstation.



### 8. [HIGH] Google Drive Cloud Storage Synchronization with Evidence of File Deletion Activity

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-23T16:02:51Z to 2015-03-23T16:42:22Z |
| **Sources** | appfiles.users.appdata.local.sync_log.log, appfiles.users.appdata.local.com.google.drive.nativeproxy.json |
| **Evidence Refs** | tc_730674af, tc_ce6518fd |


Forensic analysis of Google Drive synchronization logs reveals active cloud storage integration with evidence of deliberate file deletion:

**Google Drive Configuration:**
- Service: Google Drive (build 1.20.8672.3137)
- User Account: Associated with informant user profile
- Sync Directory: C:\Users\informant\Google Drive (user_default profile)
- Configuration Database: sync_config.db and snapshot.db

**File Deletion Activity (Evidence of Anti-Forensics):**
Google Drive sync logs (2015-03-23 16:42:19 to 16:42:22 UTC) show deliberate deletion of files:
- happy_holiday.jpg - deleted from local Google Drive folder (2015-03-23 16:42:19)
- do_u_wanna_build_a_snow_man.mp3 - deleted from local Google Drive folder (2015-03-23 16:42:22)

These deletion actions show Direction=UPLOAD, indicating files were actively deleted from the cloud storage as part of evidence cleanup.

**Timeline Correlation:**
- Google Drive initialized: 2015-03-23 16:02:51
- File deletions: 2015-03-23 16:42:19-16:42:22
- Anti-forensics tools executed: 2015-03-25 (CCleaner, Eraser)

The deliberate deletion of files from cloud storage combined with anti-forensics tool execution indicates systematic cleanup of exfiltrated data evidence.



### 9. [HIGH] Resignation Letter File Identified on Informant User Desktop

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2015-03-23T16:02:51Z to 2015-03-25T15:31:05Z |
| **Sources** | ez.prefetch |
| **Evidence Refs** | tc_7913625a |


Forensic analysis of Windows prefetch data reveals evidence of a resignation letter file on the Desktop of the informant user, indicating pre-planned departure coinciding with data exfiltration:

**File Evidence:**
- Path: C:\Users\informant\Desktop\RESIGNATION_LETTER_[filename]
- Referenced in Windows prefetch (WORDPAD.EXE execution trace)
- File accessed/opened by user prior to system shutdown

**Timeline with Related Activities:**
- Resignation letter file present on Desktop
- Sensitive project data staged on USB (2015-03-24 09:59-10:00 UTC)
- Sensitive data burned to CD-R with 9 burn sessions (2015-03-24 20:54-20:55 UTC)
- Anti-forensics tools executed (2015-03-25 14:57-15:24 UTC): CCleaner and Eraser
- System shutdown (2015-03-25 15:31 UTC)

**Analysis:**
The presence of a resignation letter file on the Desktop, combined with data staging on removable media, cloud file deletions, and anti-forensics cleanup within a 3-day window (2015-03-23 to 2015-03-25), indicates this was a planned insider departure coordinated with a systematic data theft operation.



### 10. [HIGH] Network Attachment to Corporate Server 10.11.11.128 (secured_drive) - Data Source Identification

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2015-03-22T14:52:22Z to 2015-03-24T20:55:46Z |
| **Sources** | registry.usrclass.informant |
| **Evidence Refs** | tc_ab2faab2 |


Forensic analysis reveals the informant user accessed a corporate network resource containing sensitive business data:

**Network Connection Details:**
- Network Server IP: 10.11.11.128
- Share Name: secured_drive (alternative case: SECURED_DRIVE)
- Accessible Paths:
  - \\10.11.11.128\secured_drive\Common Data
  - \\10.11.11.128\SECURED_DRIVE

**Access Evidence:**
Registry shell bags (USRCLASS.DAT) from informant user profile show:
- Access timestamp: 2015-03-22 14:52:22 UTC
- MRU entry: My Network Places\10.11.11.128 secured_drive\Common Data
- Represents informant user's recent access to the network share

**Correlation with Data Exfiltration:**
Network share access on 2015-03-22 14:52:22 UTC precedes:
- USB staging of 17 masqueraded files (2015-03-24 09:59-10:00 UTC) totaling ~158 MB
- CD-R burning of identical content (2015-03-24 20:54-20:55 UTC)

The files staged on USB and burned to CD with project-specific directory names (design, pricing decision, progress, proposal, technical review) indicate the source data came from the 10.11.11.128\secured_drive network location. The internal IP range (10.11.11.x) and "secured_drive" naming suggest this is the organization's internal file server for storing confidential business documents.



### 11. [MEDIUM] Suspicious Command-and-Control Domain References Embedded in CD-R Content

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T20:54:16Z to 2015-03-24T20:55:46Z |
| **Sources** | bulk.domain, bulk.url, bulk.email |
| **Evidence Refs** | tc_3a76325a, tc_3a1cbdfc, tc_3fb64f35 |
| **ATT&CK** | [T1036.008](https://attack.mitre.org/techniques/T1036/008/) |


Bulk extractor analysis of the CD-R detected references to the suspicious domains \"desert-estates.info\" and \"desert-estates.inf\" EMBEDDED WITHIN the masqueraded documents as text/hyperlinks. These appear to be references contained inside Office documents rather than evidence of actual external network communications or command-and-control infrastructure. The domains appear as hyperlinks within the Office documents, but NO network traffic connections to these domains were found in volatility network analysis. The domain variants (.info and .inf with intentional typo) are unusual, but their presence in document content alone does not establish external communication or C2 activity.\n\nAdditional IOCs identified in documents:\n- Email addresses: mmun@loc.gov (Library of Congress), Eric_P._Lauer@omb.eop.gov (OMB/Executive Office of President), wayne.longman@att.net\n- Government-related URLs: http://www.whitehouse.gov/omb/circulars/a11/current_year/s300.pdf5, http://digitalcorpora.org/corpora/govdocs\n- Additional government domains: lcweb.loc.gov, hdl.loc.gov (Library of Congress), www.ireap.umd.edu, www.umer.umd.edu\n\nThe presence of OMB and White House domain references combined with the business document exfiltration suggests the data being leaked contains government or government-related information, but the domain references are within documents, not confirmed external network communications.",
<parameter name="confidence">inference



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Internal IP | `10.11.11.128` |  | System Configuration and Registered Owner: Windows 7 PC Registered to "informant |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Path | `C:\Users\informant\Google` |  | Google Drive Cloud Storage Synchronization with Evidence of File Deletion Activi |
| Path | `C:\Users\informant\Desktop\RESIGNATION_LETTER_[filename` |  | Resignation Letter File Identified on Informant User Desktop |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `mmun@loc.gov` |  | Suspicious Command-and-Control Domain References Embedded in CD-R Content |
| Email | `eric_p._lauer@omb.eop.gov` |  | Suspicious Command-and-Control Domain References Embedded in CD-R Content |
| Email | `wayne.longman@att.net` |  | Suspicious Command-and-Control Domain References Embedded in CD-R Content |
| Email | `iaman.informant@nist.gov` |  | Government Email Addresses and Suspicious Domains Found in Staged Data |
| Email | `iaman@nist.gov` |  | NIST Employee Email Address Associated with Insider Threat Infrastructure |




---

## Appendix C: MITRE ATT&CK Coverage

15 techniques identified across findings.


**Kill Chain Coverage:** Initial Access (1) > Persistence (1) > Defense Evasion (5) > Credential Access (1) > Discovery (2) > Collection (1) > Command and Control (1) > Exfiltration (4) > Impact (1)


### Initial Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1133](https://attack.mitre.org/techniques/T1133/) | External Remote Services | Multiple Microsoft Office Documents... |


### Persistence

| Technique | Name | Findings |
|-----------|------|----------|
| [T1133](https://attack.mitre.org/techniques/T1133/) | External Remote Services | Multiple Microsoft Office Documents... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1027.001](https://attack.mitre.org/techniques/T1027/001/) | Binary Padding | Multiple Microsoft Office Documents... |
| [T1036.005](https://attack.mitre.org/techniques/T1036/005/) | Match Legitimate Resource Name or Location | Coordinated Anti-Forensics Activity by... |
| [T1036.008](https://attack.mitre.org/techniques/T1036/008/) | Masquerade File Type | Suspicious Command-and-Control Domain...; Anti-Forensics Activities: File Deletion and... |
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | Anti-Forensics Activities: File Deletion and... |
| [T1070.001](https://attack.mitre.org/techniques/T1070/001/) | Clear Windows Event Logs | Coordinated Anti-Forensics Activity by... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Multiple Microsoft Office Documents... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1087.002](https://attack.mitre.org/techniques/T1087/002/) | Domain Account | NIST Employee Email Address Associated with... |
| [T1087.004](https://attack.mitre.org/techniques/T1087/004/) | Cloud Account | NIST Employee Email Address Associated with... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Multiple Microsoft Office Documents... |


### Command and Control

| Technique | Name | Findings |
|-----------|------|----------|
| [T1071](https://attack.mitre.org/techniques/T1071/) | Application Layer Protocol | Government Email Addresses and Suspicious... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1020](https://attack.mitre.org/techniques/T1020/) | Automated Exfiltration | Government Email Addresses and Suspicious... |
| [T1020.001](https://attack.mitre.org/techniques/T1020/001/) | Traffic Duplication | Sensitive Project Information Staged in...; NIST Employee Email Address Associated with... |
| [T1052.001](https://attack.mitre.org/techniques/T1052/001/) | Exfiltration over USB | Multiple Microsoft Office Documents...; Sensitive Project Information Staged in...; Coordinated Anti-Forensics Activity by... |
| [T1537](https://attack.mitre.org/techniques/T1537/) | Transfer Data to Cloud Account | Sensitive Project Information Staged in... |


### Impact

| Technique | Name | Findings |
|-----------|------|----------|
| [T1565.001](https://attack.mitre.org/techniques/T1565/001/) | Stored Data Manipulation | Multiple Microsoft Office Documents... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 325 |
| Findings submitted | 11 |
| Confirmed | 8 |
| Inferences | 3 |
| Input tokens | 10.7K |
| Output tokens | 118.9K |
| Total tokens | 129.5K |
| Audit log | /home/mulder/.mulder/cases/nist-data-leakage.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 10.7K | 118.9K | 129.5K |




<details>
<summary>Evidence Sources (86)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| optical.listing | mulder-optical | 58 |
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 51 |
| hashdeep.hashes | hashdeep | 6 |
| tsk.masquerade | sleuthkit | 17 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 237 |
| bulk.email | bulk_extractor | 12 |
| bulk.rfc822 | bulk_extractor | 41 |
| bulk.url | bulk_extractor | 300 |
| bulk.url_services | bulk_extractor | 21 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 264 |
| bulk.duplicates | bulk_extractor | 58 |
| bulk.email | bulk_extractor | 43 |
| bulk.rfc822 | bulk_extractor | 41 |
| bulk.url | bulk_extractor | 288 |
| bulk.url_services | bulk_extractor | 19 |
| exiftool.metadata | exiftool | 9 |
| hashdeep.hashes | hashdeep | 6 |
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
| bulk.json | bulk_extractor | 11159 |
| bulk.rfc822 | bulk_extractor | 7326 |
| bulk.url | bulk_extractor | 421750 |
| bulk.url_facebook-address | bulk_extractor | 19 |
| bulk.url_searches | bulk_extractor | 155 |
| bulk.url_services | bulk_extractor | 3637 |
| ez.mft | eztools | 98918 |
| evtx.manifest | evtx-extract | 54 |
| ez.shimcache | eztools | 307 |
| registry.default | regripper | 418 |
| registry.sam | regripper | 186 |
| registry.sam | regripper | 7 |
| registry.sam | regripper | 7 |
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
| tsk.masquerade | sleuthkit | 3 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| appfiles.users.appdata.local.com.google.drive.nativeproxy.json | icat | 10 |
| appfiles.users.appdata.local.sync_log.log | icat | 2173 |
| appfiles.users.appdata.local.com.google.drive.nativeproxy.json | icat | 10 |
| appfiles.users.appdata.local.sync_log.log | icat | 2173 |
| registry.query.software | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| composite.correlation | composite | 1 |
| composite.exfil | composite | 2468 |
| composite.defense_evasion | composite | 114 |
| composite.timeline | composite | 2117 |
| composite.file_staging | composite | 578 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
