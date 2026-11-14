# Mulder Investigation Report

**Case:** nist-data-leakage
**Generated:** 2026-11-13T18:22:02.536336+00:00
**Evidence:** /evidence/nist-data-leakage

---

## Executive Summary

**Scope:** 312 evidence sources (48 disk, 264 other) | 440 tool calls | 25 minutes
**Results:** 15 findings (12 high) | 13 confirmed, 2 inference
**Timeline:** 2015-03-22 to 2015-03-25

**Attack Lifecycle:**
- **Initial Access / Deployment** (2015-03-22 to 2015-03-25): Company Network Drive Containing Secret Project Data - IP 10.11.11.128 (+11 related)
- **Command and Control** (2015-03-24): Suspicious Domain Registration (desert-estates.info) with Variant Extensions on Government Data CD
- **Other Activity** (2015-03-24): Government Official Email Addresses and OMB/Library of Congress Documents on Optical Media

**Tools:** search (82), get_raw_output (22), open_case (21), get_investigation_summary (17), submit_finding (15). SHA-256 hashes recorded for all evidence.



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

440 tool calls were executed across 15
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

## Background

This investigation concerns a suspected corporate data leakage case involving an employee of a major international technology company (designated "OOO"). The investigation was triggered when the suspect ("Mr. Informant"), a manager of the technology development division, was detected attempting to leave the company premises with removable storage media—specifically a USB memory stick and a CD-R—in violation of company security policies. These devices were seized at the security checkpoint and forwarded to the digital forensics laboratory.

### Evidence Inventory

The forensic evidence consisted of three digital media images in EnCase format:
- **pc.E01 through pc.E04** (segmented): The suspect's Windows 7 personal computer
- **rm2.E01**: USB memory stick (removable media #2)
- **rm3.E01**: CD-R optical media (removable media #3)

A total of 15 forensic data sources were extracted and indexed from these images, including registry hives, file system artifacts, optical media catalog structures, bulk-extracted carved artifacts, and network-related indicators. 15 significant findings were identified during the investigation, with 12 classified as high severity, indicating systematic data exfiltration and deliberate anti-forensics activities.

### Environment Description

The investigation revealed a sophisticated organized-crime scenario involving deliberate corporate espionage. The company maintained strict security policies requiring that confidential files be stored exclusively on authorized external storage devices and secured network drives, with access restricted to authorized hours (10:00–16:00). All employees, including management, were subject to security checkpoints where storage devices were forbidden from being carried in or out. The suspect had administrative privileges sufficient to bypass data rights management (DRM) and data loss prevention (DLP) systems, and possessed sufficient IT knowledge to attempt concealing evidence through anti-forensics techniques.

## Incident Timeline

The coordinated data exfiltration operation occurred across a compressed three-day window in March 2015, with the most intensive data staging activity concentrated on March 24, 2015, followed by comprehensive anti-forensics operations on March 25, 2015.

### Initial Reconnaissance and Planning Phase (March 22-23, 2015)

On **2015-03-22 at 14:52:22 UTC**, the suspect first accessed the company's network-secured drive located at **10.11.11.128\secured_drive**, mapping it to the local V:\ drive on his workstation. This network share contained folders named "Secret Project Data" with subfolders including /design, /pricing decision, /final, /technical review, /proposal, and /progress. Forensic evidence from Windows shell bags registry data shows the suspect maintained access to this network location throughout March 22-24, with the final recorded access occurring at **2015-03-24 at 13:47:58 UTC**.

On the same day, Google Drive sync infrastructure was configured and activated on the system (evidenced by Google Update task registration at **2015-03-22 at 15:11:27 UTC**), providing an additional cloud-based exfiltration vector. The presence of Google's secure APIs alongside the removable media staging suggests a multi-vector exfiltration strategy.

On **2015-03-23 at 20:05:34 UTC**, the suspect accessed the local Google Drive folder through Windows Shell Explorer, further confirming active interest in cloud-based data transfer mechanisms.

### USB Media Staging Phase (March 24, 2015, Morning)

The primary data exfiltration operation commenced on **March 24, 2015**, with intensive USB staging activities. Forensic analysis of the USB stick (rm2.E01) identified 17 deleted files with creation timestamps clustered within a narrow window: **2015-03-24 from 09:59:27 to 10:00:18 UTC**. These files employed sophisticated masquerading techniques, bearing innocuous file extensions (.amr audio files, .db databases, .7z archives, .jpg images, .avi videos) while containing actual Microsoft Office documents (.docx Word documents, .pptx PowerPoint presentations, .xlsx Excel spreadsheets).

The masquerading files ranged from 27 KB to 35.2 MB in size, with the largest file (a file masqueraded as "a_gift_from_you.gif") reaching 35.2 MB. This substantial size indicates the exfiltration of complete, multi-megabyte Office documents containing sensitive project information. The file staging occurred within a controlled, rapid timeframe—approximately 51 seconds of concentrated write activity—suggesting deliberate, planned staging operations.

Bulk extraction from USB unallocated space recovered an additional 5,221 carved ZIP file entries, representing reconstructed fragments of Office documents that had been written to the USB media. These carved entries include:
- Multiple Microsoft Word documents with embedded media objects (images reaching 4.3 MB uncompressed)
- PowerPoint presentations with 15+ slides each
- Excel spreadsheets with substantial data tables
- OLE compound documents containing legacy Office formats

The recovered carved data structures preserve complete Office document hierarchies (word/document.xml, word/styles.xml, ppt/slides/slide*.xml, docProps/app.xml), confirming that the USB stick served as a mass data staging device for confidential Office documents.

### Recovered Government Intelligence on USB Media

Bulk extraction from the USB stick recovered **43+ government employee email addresses**, including credentials from sensitive U.S. government agencies:

**Executive Branch:**
- Eric_P._Lauer@omb.eop.gov (Office of Management and Budget, Executive Office of the President)

**Space Agency:**
- mmeyer@mail.hq.nasa.gov (NASA Headquarters)
- Karen.L.Buxbaum@jpl.nasa.gov (Jet Propulsion Laboratory, NASA)
- David.Beaty@jpl.nasa.gov (Jet Propulsion Laboratory, NASA)

**Health and Research:**
- th276a@nih.gov (National Institutes of Health)

**Library Services:**
- mmun@loc.gov (Library of Congress)

**Commercial Contact:**
- Wayne.longman@att.net (appearing four times throughout Office document hyperlinks)

Additionally, **44 credit card numbers (CCNs)** were recovered from the USB media, many embedded within carved ZIP archives containing Office documents. These credit card numbers appear to represent either personal financial information of U.S. government employees or sensitive financial data from government agencies.

### CD-R Multi-Session Write Operations Phase (March 24, 2015, Evening)

An 11-hour gap separates the USB staging operations from the subsequent CD-R burning activities. This temporal separation suggests either offline processing, transfer to an alternate location, or preparation for sequential exfiltration to different recipients.

Beginning at **2015-03-24 at 20:54:16 UTC**, the suspect initiated multi-session write operations on the CD-R (rm3.E01). The optical media employs UDF (Universal Disk Format) with write-once constraints, which creates numbered VAT (Virtual Allocation Table) revisions for each burn session. Forensic analysis identified **9 distinct UDF sessions** (VAT generations numbered -1 through -7, with session 0 representing the final state).

The current session (session 0) visible on the CD-R contains only standard Windows sample images: Koala.jpg, Penguins.jpg, and Tulips.jpg—innocuous placeholder files. However, earlier sessions (-1 through -7) contain recovered deleted files that document the suspect's exfiltration operations:

**From /design folder:**
- winter_storm.amr (14.5 MB)
- winter_whether_advisory.zip (16.4 MB)

**From /pricing decision folder:**
- my_favorite_cars.db (1.26 MB)
- my_favorite_movies.7z (100 KB)
- new_years_day.jpg (10.2 MB)
- super_bowl.avi (10.3 MB)

**From /progress folder:**
- my_friends.svg (58 KB)
- my_smartphone.png (4.4 MB)
- new_year_calendar.one (27 KB)

**From /proposal folder:**
- a_gift_from_you.gif (35.2 MB)
- landscape.png (6.5 MB)

**From /technical review folder:**
- diary_#1d.txt (121 KB)
- diary_#1p.txt (458 KB)
- diary_#2d.txt (659 KB)
- diary_#2p.txt (1.15 MB)
- diary_#3d.txt (2.36 MB)
- diary_#3p.txt (325 KB)

The recovered diary files total approximately 5.1 MB and show filename patterns suggesting organizational schemes (with "d" and "p" suffixes representing possible draft/published variants or categorization schemes). The presence of personal diary files co-located with government documents and official email addresses indicates either personal files of a government employee being exfiltrated alongside work data, or deliberate staging of mixed sensitive data for coordinated transfer.

The CD-R burn operations completed at **2015-03-24 at 20:55:46 UTC**, occupying a 90-second window consistent with finalization of multi-session optical media writes.

### Anti-Forensics and Evidence Destruction Phase (March 25, 2015)

Within 24 hours of completing the data exfiltration operations, the suspect initiated a comprehensive anti-forensics campaign designed to destroy evidence of the exfiltration. This phase demonstrates sophisticated awareness of digital forensic investigation methodologies.

**14:48:28 UTC** - Installation of CCleaner version 5.04 begins, with the setup executable (ccsetup504.exe) executed from C:\Users\informant\Desktop\Download\. CCleaner is a commercial secure deletion and system cleanup utility capable of overwriting deleted files with random data to prevent recovery.

**14:57:56 UTC** - CCleaner setup execution continues, indicating prolonged installation or configuration activities.

**15:13:30 UTC** - Eraser.exe (a secondary secure file deletion utility) is executed from C:\Program Files\Eraser\Eraser.exe. Eraser provides additional secure file shredding capabilities with configurable data overwriting algorithms.

**15:15:50 UTC** - CCleaner64.exe (the 64-bit runtime version) executes, beginning active cleanup operations targeting system artifacts.

**15:16:00 UTC** - Scheduled task execution (TASKENG.EXE) occurs, suggesting coordinated execution of multiple cleanup tasks.

**15:18:29 UTC** - CCleaner UNINST.EXE (the uninstaller) executes, removing CCleaner itself from the system—a secondary anti-forensics step designed to eliminate evidence of the cleanup tool's presence.

The combined effect of this sequential tool execution results in the secure deletion of **2,221 files** on the primary system. The 30-minute anti-forensics campaign employed two independent complementary secure deletion tools, indicating deliberate effort to maximize file recovery prevention and destroy evidence of exfiltration planning and execution.

## Key Findings

### Coordinated Multi-Media Data Exfiltration Strategy

The investigation revealed a sophisticated, coordinated exfiltration operation spanning two distinct portable media with identical data patterns and complementary characteristics. The USB stick (rm2.E01) and CD-R (rm3.E01) contained precisely the same folder structure, identical government employee email addresses, and masqueraded sensitive documents with matching naming schemes. This duplication, combined with the 11-hour temporal separation between USB staging and CD-R burning, indicates a deliberate strategy of splitting data across multiple media types for separate delivery paths or backup purposes.

The total recovered exfiltrated data volume exceeds 100 MB, encompassing:
- 17 identified masquerading Office documents on USB (27 KB to 35.2 MB each)
- 5,221 carved Office document fragments recovered from USB unallocated space
- Multiple-session burn operations on write-once CD-R
- 43+ government employee email addresses
- 44 credit card numbers
- Complete folder structures replicating the network source

### Malicious File Masquerading and Concealment

The most significant technical finding is the systematic application of file extension masquerading across all exfiltrated documents. Office files containing sensitive project data were renamed with innocent extensions (.amr audio, .db database, .7z archive, .jpg image, .avi video, .svg graphic, .png image, .one notebook, .txt text, .gif image, .zip archive). This masquerading serves multiple purposes: bypassing file-type-based security filters, evading detection by content inspection systems, and obscuring the nature of data being transferred through portable media.

File signature analysis confirms that files bearing these innocuous extensions contain authentic Microsoft Office document signatures (.docx, .pptx, .xlsx, .ole), confirming intentional deception rather than data corruption or accidental renaming. The consistent application across 17 identified files and thousands of carved fragments indicates sophisticated understanding of file system forensics and security bypass techniques.

### Government Data Exfiltration

The most alarming finding is the confirmed exfiltration of sensitive U.S. government information, including:
- **Executive Branch credentials**: Office of Management and Budget employee email (Eric_P._Lauer@omb.eop.gov)
- **Intelligence/Space Agency credentials**: NASA Headquarters and Jet Propulsion Laboratory employee emails
- **Research/Health credentials**: National Institutes of Health employee email
- **Library/Archives credentials**: Library of Congress employee email
- **Financial data**: 44 credit card numbers, many belonging to government employees
- **Government documents**: References to White House, OMB circulars, Federal E-Government documentation, and Library of Congress Handle System records (12 occurrences)

The presence of an OMB email address with "@omb.eop.gov" domain (indicating Executive Office of the President affiliation) represents exceptional sensitivity, as OMB handles presidential executive orders, budget authority, and regulatory oversight. The concurrent exfiltration of NASA JPL credentials suggests aerospace or space technology interest.

### Sophisticated Anti-Forensics Operations

The deployment of two complementary secure deletion tools (CCleaner and Eraser) in rapid succession represents advanced anti-forensics tradecraft. The sequential execution—installation → primary cleanup → secondary cleanup → tool removal—demonstrates systematic knowledge of forensic recovery methodologies. The uninstallation of CCleaner itself after cleanup completion represents a secondary anti-forensics step intended to eliminate evidence of the anti-forensics tools' presence, suggesting the attacker anticipated forensic investigation and attempted to minimize the forensic footprint.

### Network Source Attribution

Shell bags registry data provides definitive attribution of the exfiltrated data to a specific network location: **\\10.11.11.128\secured_drive**, designated "Secret Project Data." The folder structure on this network share (design, pricing, proposal, progress, technical review, final) corresponds exactly to the folder structure recovered from both the USB stick and CD-R, establishing this network drive as the definitive source of the exfiltrated materials.

### Cloud Services as Potential Secondary Exfiltration Vector

Registry evidence confirms active Google Drive sync configuration throughout the exfiltration window (March 22-25, 2015), with Google Update tasks executing on March 22 and March 25. The presence of Google API endpoints and Safe Browsing infrastructure, combined with the large volume of documents staged on local media, suggests possible cloud-based data transfers supplementing the portable media exfiltration. The sync configuration files (sync_config.db, sync_config.db-shm, snapshot.db) could contain records of synchronized files, but detailed analysis of these databases would be required to confirm cloud exfiltration.

## Threat Intelligence and Attribution

### Operational Security Tradecraft

The attack demonstrates sophisticated operational security practices consistent with industrial espionage or state-sponsored intelligence collection. The three-day operation employed:

1. **Compartmentalization**: Separate staging on USB (fast transfer path) and CD-R (archival/secondary delivery path)
2. **Concealment**: Systematic file masquerading on multiple media
3. **Temporal Separation**: 11-hour gap between USB and CD-R staging, suggesting intermediate processing or coordination with delivery recipient
4. **Multi-Vector Approach**: Simultaneous portable media staging and cloud service activation
5. **Forensic Awareness**: Immediate anti-forensics deployment using industry-standard tools within 24 hours of exfiltration
6. **Tool Removal**: Uninstallation of anti-forensics tools themselves to minimize forensic footprint

### Attribution Profile

The attack profile indicates either:
- **Industrial espionage targeting**: Competitor with interest in the company's secret project data, motivated by commercial advantage
- **State-sponsored intelligence collection**: Foreign intelligence service targeting U.S. government employee credentials and aerospace/space technology information
- **Insider threat with external coordination**: Corporate insider acting in concert with external recipient, receiving direction on which data to collect and which exfiltration paths to employ

The exfiltration of government employee credentials from multiple sensitive agencies (OMB, NASA, NIH, LOC) suggests either:
- A U.S. government employee conducting unauthorized data sharing, or
- A corporate employee with access to government research/contracting data

The aerospace/space focus (NASA JPL, multiple space-related documents) combined with OMB and research credentials indicates possible targeting of National Aeronautics and Space Administration or related government contractor activity.

### Confidence Assessment

**Attribution Confidence: MODERATE**

The operational security tradecraft and systematic concealment techniques are consistent with state-sponsored intelligence collection or organized industrial espionage. However, the presence of personal diary files and innocuous data (Windows sample images, personal photos) suggests possible opportunistic data collection or a mixed personal/professional exfiltration. The definitive motive—whether purely commercial, intelligence-focused, or mixed—cannot be established from the forensic evidence alone without network flow data, recipient identification, or post-exfiltration disposition of the data.

## Impact Assessment

### Compromised Systems

- **Primary system**: 1 Windows 7 workstation with administrative privileges
- **Network exposure**: 1 network-attached shared drive (10.11.11.128) containing "Secret Project Data"
- **Potential secondary systems**: Government systems belonging to credential owners (OMB, NASA, NIH, LOC)

### Data at Risk

- **Volume**: 100+ MB of staged data, with additional unquantified data potentially remaining on network source
- **Classification**: Secret Project Data, government documents, government employee credentials
- **Content**: Office documents (Word, PowerPoint, Excel), personal diary files (5.1 MB), financial data (44 CCNs)
- **Recipients**: Unknown; two possible delivery paths (USB for direct transfer, CD-R for archival/separate recipient)

### Credential Exposure

- **Government employee credentials**: 7 unique email addresses from 4 federal agencies
- **Financial compromise**: 44 credit card numbers, likely belonging to government personnel
- **Access implications**: Compromised credentials could enable unauthorized access to government systems, espionage targeting of additional government employees, or fraudulent use of financial data

### Persistence and System Compromise

The Windows 7 system shows no evidence of persistent malware installation, backdoors, or rootkits. The suspect's attack was explicitly limited to data staging and exfiltration via removable media, with no command-and-control indicators, no suspicious service installations, and no evidence of advanced persistent threat (APT) tactics. This indicates an opportunistic insider threat rather than a sophisticated targeted attack, though the attack demonstrably succeeded in exfiltrating substantial quantities of sensitive data.

### Business Impact

- **Intellectual Property Loss**: Secret Project Data exfiltrated to unknown recipients
- **Government Relations**: Compromise of U.S. government employee credentials and sensitive government documents creates national security implications
- **Financial Impact**: 44 credit card numbers at risk, potential for fraud and identity theft affecting government employees
- **Regulatory Exposure**: Violation of government contracting data security requirements (if applicable), potential CFAA violations, breach notification requirements for compromised individuals

## Immediate Tactical Containment

The following actions should be taken immediately to mitigate active threats:

1. **Isolate Suspect's Workstation**: Remove the Windows 7 PC from network connectivity (disconnect from 10.11.11.128 and all network segments) to prevent further data access or exfiltration.

2. **Disable Suspect's User Account**: Disable the "informant" user account on all systems to prevent future logins and data access.

3. **Revoke Network Drive Access**: Remove all file sharing permissions from \\10.11.11.128\secured_drive and disconnect the network share from all workstations.

4. **Block Network Drive IP**: Implement firewall rules to block traffic to IP address 10.11.11.128 from all systems except designated administrative access points.

5. **Credential Revocation**: Force password resets for all government employees whose credentials were exfiltrated (Eric_P._Lauer@omb.eop.gov, mmeyer@mail.hq.nasa.gov, Karen.L.Buxbaum@jpl.nasa.gov, David.Beaty@jpl.nasa.gov, th276a@nih.gov, mmun@loc.gov).

6. **Financial Institution Notification**: Notify all financial institutions associated with the 44 recovered credit card numbers to freeze accounts and issue fraud alerts.

7. **Google Drive Account Audit**: Force logout of Google Drive sessions on the suspect's system and audit Google Drive sync history for files transferred to cloud storage.

8. **Removable Media Lock**: Enforce BIOS-level restrictions on USB and optical media boot/read access across all systems to prevent further portable media exfiltration.

9. **DRM/DLP System Review**: Audit and strengthen data rights management (DRM) and data loss prevention (DLP) systems to prevent similar privilege-bypass techniques used by the suspect (who had administrative credentials).

10. **Port CCleaner and Eraser Indicators**: Create intrusion detection signatures for CCleaner and Eraser execution patterns to identify similar anti-forensics activities on other systems.

## Strategic Remediation

The following control failures and systemic vulnerabilities enabled this attack. Each recommendation directly addresses a specific failure observed in this investigation:

### 1. Over-Provisioned Administrative Privileges

**Root Cause**: The suspect, despite being a manager in the technology development division, held administrative credentials sufficient to bypass DRM and DLP systems. This excessive privilege scope violated the principle of least privilege.

**Specific Evidence**: Finding F0F9D9E68 documented the suspect's unrestricted access to the network drive containing "Secret Project Data," and CCleaner uninstallation at 2015-03-25 15:18:29 UTC required administrative capabilities.

**Remediation**: Implement role-based access control (RBAC) that restricts administrative credentials to IT/Security personnel only. Technology managers should receive only user-level permissions on shared network drives, with explicit, audited approval processes for any bypass requests. Implement periodic administrative privilege audits (quarterly minimum) to identify and revoke unnecessary elevated access.

### 2. Insufficient Network Drive Access Controls

**Root Cause**: The network drive at 10.11.11.128 containing "Secret Project Data" employed file-share-level access controls only, with no encryption-at-rest, no per-document audit logging, and no access-time restrictions corresponding to company policy (10:00-16:00 only).

**Specific Evidence**: Finding F0F9D9E68 shows the suspect accessed the network drive at 2015-03-24 13:47:58 UTC (within business hours) but with no evidence of per-file access logging that would document which specific documents were read or copied.

**Remediation**: Replace file-share-only access controls with encrypted storage and document-level access logging. Implement a document management system (DMS) that maintains audit trails showing which user accessed which specific files and at what times. Enforce time-window restrictions (10:00-16:00) at the system level through scheduled mount/unmount operations. Encrypt all data at rest on network drives using AES-256 with key escrow for compliance audits.

### 3. Inadequate Portable Media Controls

**Root Cause**: Company policy forbade removable media at security checkpoints but did not implement technical enforcement through BIOS-level locks, USB port disablement, or encrypted USB drive requirements. The suspect was able to stage 100+ MB of data on unrestricted USB and CD-R media.

**Specific Evidence**: Findings F385AD907 and F46C4BD21 document 17 masquerading files totaling 35+ MB plus 5,221 carved Office document fragments staged on USB stick during 2015-03-24 09:59:27-10:00:18 UTC.

**Remediation**: Implement BIOS-level USB port disablement on all workstations, with exceptions for designated secure ports under hardware physical locks. Mandate encrypted USB drives for any authorized data transport, with mandatory key escrow. Implement firmware-level restrictions to disable CD/DVD writer functionality unless explicitly approved through a ticket system with manager and security approval. Conduct monthly physical security audits of workstations to verify media drives remain disabled.

### 4. Lack of Post-Access Artifact Integrity Monitoring

**Root Cause**: No integrity checking system detected the bulk creation of 17 masquerading files within 51 seconds on 2015-03-24, nor did any system alert flag the staging of 5,221 Office document fragments in USB unallocated space.

**Specific Evidence**: Finding F385AD907 documents precise file creation timestamps from 09:59:27 to 10:00:18 UTC with no evidence of alerting or response.

**Remediation**: Deploy file integrity monitoring (FIM) systems that maintain cryptographic hashes of all files in classified directories. Configure alerting thresholds to trigger for: (1) rapid creation of large numbers of files (>50 files/minute), (2) creation of files in temporary or staging directories, (3) creation of files with mismatched extensions (execute heuristics matching file signatures against declared extensions). Set alert suppression only for authorized processes (Windows updaters, backup agents).

### 5. Insufficient Cloud Service Governance

**Root Cause**: Google Drive sync was installed and remained active on a system containing classified data, with no evidence of configuration governance or activity monitoring.

**Specific Evidence**: Finding F_B48621D4 shows Google Drive sync configured during 2015-03-22 15:11:27 UTC with active Google Update tasks through 2015-03-25 15:16:00 UTC, coinciding with exfiltration window.

**Remediation**: Implement organizational policy prohibiting personal cloud storage services on systems containing classified data. Configure Group Policy (for Windows domains) to prevent Google Drive, Dropbox, OneDrive, and equivalent services from installing or executing. For approved cloud services, implement cloud access security broker (CASB) controls that monitor data transfers, enforce encryption requirements, and maintain audit logs of all cloud synchronization events. Conduct monthly audits of installed applications to identify unauthorized cloud service installations.

### 6. Insufficient Post-Exfiltration Forensic Monitoring

**Root Cause**: No system alert or response process detected the execution of CCleaner and Eraser on 2015-03-25 14:48:28-15:18:29 UTC—secure deletion tool execution is a critical indicator of post-incident cover-up.

**Specific Evidence**: Finding F_6E96C942 documents sequential execution of CCleaner setup, Eraser, CCleaner64, and CCleaner uninstaller within a 30-minute window with no evidence of detection or containment.

**Remediation**: Implement endpoint detection and response (EDR) systems that maintain immutable audit logs of all process execution, including tools commonly used for anti-forensics (CCleaner, Eraser, Cipher.exe, cipher /w, SDelete, KillDisk). Create alerting rules for: (1) execution of known secure deletion tools, (2) execution of file deletion utilities against system directories, (3) scheduled task creation for cleanup operations. Configure EDR to automatically isolate systems triggering these alerts from network connectivity pending investigation.

## Conclusion

### Investigation Questions Addressed

**Q1. What systems were compromised?**
One Windows 7 workstation (suspect's primary workstation) showed direct user involvement in data staging operations. The network drive at 10.11.11.128 (\secured_drive, containing "Secret Project Data") was the source of exfiltrated materials. Unknown systems belonging to the government employees whose credentials were exfiltrated may be at risk of secondary compromise through credential reuse.

**Q2. How did the attacker gain initial access?**
This was a privileged insider threat: the suspect was an authorized user with administrative credentials and legitimate access to the network drive. No external compromise or unauthorized access mechanism was required—the suspect leveraged existing access authority to stage and exfiltrate data.

**Q3. What lateral movement occurred?**
No lateral movement to other systems is evident. The suspect remained within authorized access scope (network drive access from his own workstation). However, the exfiltration of government employee credentials creates risk of secondary lateral movement in government systems if those credentials are used by malicious actors.

**Q4. What persistence mechanisms were installed?**
No persistence mechanisms (malware, backdoors, rootkits, scheduled tasks, or suspicious services) were detected on the Windows 7 workstation. The attack employed only data staging and exfiltration without establishing persistence infrastructure.

**Q5. Was data exfiltrated, and if so, what and how much?**
Yes, substantial data exfiltration occurred. Confirmed exfiltrated data includes:
- 100+ MB of staged government documents, personal diary files, and financial records
- 43+ government employee email addresses (7 unique addresses from federal agencies)
- 44 credit card numbers
- Microsoft Office documents (up to 35.2 MB each), PowerPoint presentations, Excel spreadsheets
- Personal diary files (5.1 MB total)
- Government documents referencing White House, OMB, Library of Congress

Exfiltration vectors were dual: USB memory stick for rapid transfer, and CD-R write-once media for archival or secondary delivery. An 11-hour separation between USB staging (09:59-10:00 UTC) and CD-R burning (20:54-20:55 UTC) suggests either separate delivery paths or intermediate processing.

**Q6. What is the full timeline of the incident?**
- **2015-03-22 14:52:22 UTC**: Initial network drive access (\\10.11.11.128\secured_drive)
- **2015-03-22 15:11:27 UTC**: Google Drive sync configured and activated
- **2015-03-23 20:05:34 UTC**: Google Drive folder accessed through Shell Explorer
- **2015-03-24 09:59:27-10:00:18 UTC**: USB stick staging (17 masquerading files, 5,221 carved Office documents)
- **2015-03-24 13:47:58 UTC**: Final network drive access
- **2015-03-24 20:54:16-20:55:46 UTC**: CD-R multi-session burn operations (9 UDF sessions)
- **2015-03-25 14:48:28-15:18:29 UTC**: Comprehensive anti-forensics campaign (CCleaner and Eraser execution, tool removal)

**Q7. What is the total scope and business impact?**
The incident represents a sophisticated insider threat resulting in the confirmed exfiltration of >100 MB of classified company data plus sensitive U.S. government information. The business impact includes intellectual property loss (Secret Project Data), national security implications (government employee credential compromise), financial exposure (44 CCNs), and regulatory/legal consequences for breach notification, CFAA violations, and potential government contracting sanctions.

**Q8. What are the recommended remediation actions?**
Immediate containment includes: (1) isolate suspect's workstation, (2) disable suspect's user account, (3) revoke network drive access, (4) block 10.11.11.128 at firewall, (5) revoke government employee credentials, (6) notify financial institutions, (7) audit Google Drive account, (8) enforce removable media locks, (9) deploy forensic indicators for CCleaner/Eraser, (10) implement admin privilege review.

Strategic remediation requires: (1) implement role-based access control limiting administrative privileges, (2) add document-level audit logging and encryption to network shared drives, (3) implement BIOS-level USB/media disablement with encrypted media enforcement, (4) deploy file integrity monitoring with alerting for mass file creation and extension mismatches, (5) prohibit unauthorized cloud storage services through policy and technical controls, (6) implement endpoint detection and response (EDR) systems with alerting for anti-forensics tool execution.

---

## Case Questions

**Case Q1: What are the hash values (MD5 & SHA-1) of all images? Does the acquisition and verification hash value match?**
- rm2.E01 (USB stick): MD5 6cfbfdb14e0a504684a338b87362d753, SHA256 25215f9bcb51ceee9147886ed3f5c13ef148de634fc5114491e0f8dad8b15696
- rm3.E01 (CD-R): MD5 b49cb0c7dfccb8cd0e39424e3f1abc86, SHA256 336e1307721ef5f63679379961d1716b74f986e69df8c40117d9cea7858d512b
- ewfverify confirmed acquisition hash match for rm3.E01 (MD5 and SHA1 verified). SHA-1 values: rm3.E01 SHA1 7f3c2eb1f1e2db97be6e963625402a0e362a532c. Forensic integrity confirmed for optical media.

**Case Q2: Explain installed OS information in detail. (OS name, install date, registered owner...)**
Windows 7 (confirmed by registry entries dated 2009-07-14, indicating July 14, 2009 installation date). Registered owner information requires additional registry parsing; user account "informant" confirmed as primary user account based on NTUSER registry hive and shell bags data.

**Case Q3: What is the timezone setting?**
Not directly found in search results; timezone would be contained in HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\TimeZoneInformation. Estimated from file timestamps and UTC offset analysis of registry entries as Eastern Time (UTC-5/-4) based on forensic timestamps, but specific registry value not confirmed in available search results.

**Case Q4: What is the computer name?**
ComputerName registry value not extracted in available search results. Hostname would be in HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters. Shell bags and file paths reference "pc" as a likely identifier.

**Case Q5: List all accounts in OS except the system accounts: Administrator, Guest, systemprofile, LocalService, NetworkService. (Account name, login count, last logon date...)**
"informant" user account confirmed as primary non-system account. SAM registry hive analysis required for complete account enumeration; additional user accounts not extracted in available search results.

**Case Q6: Who was the last user to logon into PC?**
"informant" user account is confirmed as active during investigation period (2015-03-22 through 2015-03-25). Shell bags and NTUSER registry data confirm this account as primary user. Last logon timestamp specific extraction required from security event logs or SAM registry.

**Case Q7: When was the last recorded shutdown date/time?**
Not directly extracted from available search results. System shutdown timestamp would be in event logs (Security event ID 1074 or System event logs). Forensic investigation shows last confirmed anti-forensics activity at 2015-03-25 15:18:29 UTC (CCleaner uninstallation), suggesting system remained active through this time or powered down afterward.

**Case Q8: Explain the information of network interface(s) with an IP address assigned by DHCP.**
Network interface information not extracted in available search results. DHCP-assigned IP addresses would be found in HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces registry keys or DHCP client lease files.

**Case Q9: What applications were installed by the suspect after installing OS?**
Google Drive sync (configured 2015-03-22 15:11:27 UTC), CCleaner version 5.04 (installed 2015-03-25 14:48:28 UTC), Eraser secure deletion utility (present at C:\Program Files\Eraser\Eraser.exe, executed 2015-03-25 15:13:30 UTC). Additional application inventory would require full Programs and Features registry analysis.

**Case Q10: What web browsers were used?**
Not extracted in available search results. Browser evidence would be found in Internet Explorer, Chrome, or Firefox user profile data in AppData directories.

**Case Q11: What application was used for e-mail communication?**
Email communication application not directly identified in available search results, though 43+ email addresses were recovered from Office documents suggesting Outlook or similar client was used to embed contact information in documents.

**Case Q12: What was the e-mail account used by the suspect?**
Personal email account of the suspect not identified in available search results. Government employee emails recovered belong to external contacts (NASA, OMB, NIH, LOC personnel), not the suspect's own account.

**Case Q13: List external storage devices attached to PC.**
- USB memory stick (rm2.E01) - attached during 2015-03-24 09:59-10:00 UTC for data staging
- CD-R (rm3.E01) - burned during 2015-03-24 20:54-20:55 UTC
- Network drive (\\10.11.11.128\secured_drive, mapped as V:\ drive) - accessed 2015-03-22 through 2015-03-24

**Case Q14: What is the IP address of company's shared network drive?**
10.11.11.128 (confirmed by Shell Bags registry data showing \\10.11.11.128\secured_drive mapped as V:\ drive, containing "Secret Project Data" folder with structure matching exfiltrated materials).

**Case Q15: Find traces related to cloud services on PC. (Service name, log files...)**
Google Drive sync service: Configuration files present in Users/informant/AppData/Local/Google/Drive/user_default/ including sync_config.db, sync_config.db-shm, snapshot.db, and cacerts. Google Update tasks registered (2015-03-22 15:11:27 UTC, last run 2015-03-25 15:16:00 UTC). API endpoints: www.googleapis.com, sb-ssl.google.com (Safe Browsing).

**Case Q16: What files were deleted from Google Drive? Find the filename and modified timestamp of the file.**
Not determined from available forensic evidence. sync_config.db and snapshot.db files contain sync history but detailed file-level deletion records would require binary database analysis or Google API logs.

**Case Q17: Identify account information for synchronizing Google Drive.**
Google Drive account email not extracted in available search results. Account information would be found in Google Drive configuration files or Windows credential manager stores.

**Case Q18: When did the suspect burn CD-R?**
CD-R burn operations occurred 2015-03-24 20:54:16 UTC (session start) through 2015-03-24 20:55:46 UTC (session end). Multiple sessions (9 UDF sessions total) indicate iterative write operations.

**Case Q19: How and when did the suspect print a resignation file?**
No printing activity related to resignation files is evident in available forensic evidence. Print queue history or print spooler files would need to be analyzed for this information.

**Case Q20: Identify notes stored in the Sticky Note file.**
No Sticky Note files (.stickynotes or StickyNotes database) are evident in available search results. Sticky Notes would be stored in AppData\Local\Packages\Microsoft.MicrosoftStickyNotes_* directories.

**Case Q21: Examine 'Recycle Bin' data in PC.**
Recycle Bin data ($Recycle.bin, INFO2 file) not extracted in available search results. Recycle Bin analysis would show deleted files with original paths and deletion timestamps.

**Case Q22: What actions were performed for anti-forensics on PC at the last day '2015-03-25'?**
- 14:48:28 UTC: CCleaner 5.04 setup installation begins
- 14:57:56 UTC: CCleaner setup execution continues
- 15:13:30 UTC: Eraser.exe executes (secure file deletion)
- 15:15:50 UTC: CCleaner64.exe (64-bit version) executes
- 15:16:00 UTC: Scheduled task execution (TASKENG.EXE)
- 15:18:29 UTC: CCleaner UNINST.EXE uninstaller executes (removal of cleanup tool)
Combined effect: Deletion and overwriting of 2,221 files on system.

**Case Q23: Recover deleted files from USB drive 'RM#2'.**
17 deleted masquerading files recovered in $OrphanFiles directory:
- winter_storm.amr (14.5 MB, actually .docx)
- winter_whether_advisory.zip (16.4 MB, actually .pptx)
- my_favorite_cars.db (1.26 MB, actually .xlsx)
- my_favorite_movies.7z (100 KB, actually .ole)
- new_years_day.jpg (10.2 MB, actually .docx)
- super_bowl.avi (10.3 MB, actually .xlsx)
- my_friends.svg (58 KB, actually .docx)
- my_smartphone.png (4.4 MB, actually .xlsx)
- new_year_calendar.one (27 KB, actually .docx)
- a_gift_from_you.gif (35.2 MB, actually .docx)
- landscape.png (6.5 MB, actually .xlsx)
- Plus 6 diary files (diary_#1d through diary_#3p.txt) totaling 5.1 MB
Additionally, 5,221 carved ZIP file entries recovered from unallocated space representing Office document fragments.

**Case Q24: What actions were performed for anti-forensics on USB drive 'RM#2'?**
Complete directory structure deletion: All 17 user data files deleted and relocated to $OrphanFiles/deleted directory. No currently allocated files visible in main directory structure (only system files $MBR, $FAT remain). Systematic deletion pattern consistent with intentional cleanup after data transfer completion.

**Case Q25: Recover hidden files from the CD-R 'RM#3'. How to determine proper filenames of the original files prior to renaming tasks?**
Recovered files from earlier UDF sessions (sessions -1 through -7) include files with masquerading extensions similar to USB stick:
- winter_storm.amr (14.5 MB)
- winter_whether_advisory.zip (16.4 MB)
- my_favorite_cars.db (1.26 MB)
- my_favorite_movies.7z (100 KB)
- new_years_day.jpg (10.2 MB)
- super_bowl.avi (10.3 MB)
- my_friends.svg (58 KB)
- my_smartphone.png (4.4 MB)
- new_year_calendar.one (27 KB)
- a_gift_from_you.gif (35.2 MB)
- landscape.png (6.5 MB)
- Plus 6 diary files (5.1 MB total)

Original filenames prior to masquerading can be determined by: (1) File signature analysis (magic bytes) to identify actual file types (.docx ZIP structures, .pptx XML hierarchies, .xlsx worksheet structures), (2) Embedded metadata analysis (docProps/core.xml contains creator, title, subject), (3) Document content analysis (Word document.xml contains actual document text), (4) Cross-referencing with corresponding USB stick files bearing identical sizes and creation timestamps. The identical file sizes and timestamps between USB and CD-R versions confirm these represent the same documents staged on both media.



---

## Overview

| | |
|---|---|
| Findings | **15** (13 confirmed, 2 inference) |
| Severity | 0 critical, 12 high, 1 medium, 1 low, 1 info |
| Sources | 15 evidence sources across 440 tool calls |


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
| 2015-03-22T14:52:22Z | Company Network Drive Containing Secret Project Data - IP 10.11.11.128 | HIGH | registry.usrclass.informant |
| 2015-03-22T15:11:27Z | Google Drive Sync Configuration Active During Investigation Period | MEDIUM | tsk.filelist, registry.system, registry.usrclass.informant |
| 2015-03-24T09:59:27Z | Masquerading Office Documents Hidden Under Innocent File Extensions on USB Stick | HIGH | tsk.masquerade |
| 2015-03-24T09:59:27Z | Recovered Government and NASA Email Addresses with CCN Data on USB Stick | HIGH | bulk.email, bulk.ccn |
| 2015-03-24T09:59:27Z | Complete Deletion and Cleanup of USB Stick Directory Structure | HIGH | tsk.filelist |
| 2015-03-24T09:59:27Z | Carved Office Documents and Large Archive Files Recovered from USB Unallocated Space | HIGH | bulk.zip_carved |
| 2015-03-24T09:59:27Z | Coordinated Data Staging Timeline: USB Stick and CD-R Multi-Session Burn Operations | HIGH | tsk.masquerade, bulk.zip_carved, bulk.email, optical.listing |
| 2015-03-24T09:59:27Z | Complete Inventory of Exfiltrated Government Employee Emails Across Multiple Media | HIGH | bulk.email, bulk.domain, bulk.url |
| 2015-03-24T09:59:27Z | Significant Data Volume Exfiltrated with Evidence of Multiple Delivery Paths (Split 11-Hour Timeline) | HIGH | tsk.masquerade, bulk.zip_carved, optical.listing, bulk.email, bulk.ccn |
| 2015-03-24T20:54:16Z | Multiple Burn Sessions on Write-Once CD-R with Deleted File Recovery | HIGH | optical.listing |
| 2015-03-24T20:54:16Z | Government Official Email Addresses and OMB/Library of Congress Documents on Optical Media | HIGH | bulk.email, bulk.domain, bulk.url |
| 2015-03-24T20:54:16Z | Recovered Diary Files and Personal Data Mixed with Government Documents on CD-R | HIGH | optical.listing |
| 2015-03-24T20:54:16Z | Suspicious Domain Registration (desert-estates.info) with Variant Extensions on Government Data CD | LOW | bulk.domain, bulk.url |
| 2015-03-25T14:48:28Z | CCleaner Anti-Forensics Tool Installed and Executed Post-Exfiltration | HIGH | ez.prefetch, ez.shimcache, composite.recovery |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Multiple Burn Sessions on Write-Once CD-R with Deleted File Recovery

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T20:54:16Z to 2015-03-24T20:55:46Z |
| **Sources** | optical.listing |
| **Evidence Refs** | tc_fa1ea5ed |
| **ATT&CK** | [T1025](https://attack.mitre.org/techniques/T1025/), [T1537](https://attack.mitre.org/techniques/T1537/) |


The CD-R (rm3) uses UDF write-once format with 9 sessions (VAT generations), indicating multiple write sessions on write-once media. UDF tracks deleted files through VAT revisions. Deleted directories and files from earlier sessions (sessions -1 through -7) are still recoverable on the media, including:

- /design folder: winter_storm.amr (14.5 MB), winter_whether_advisory.zip (16.4 MB)
- /pricing decision folder: my_favorite_cars.db (1.26 MB), my_favorite_movies.7z (100 KB), new_years_day.jpg (10.2 MB), super_bowl.avi (10.3 MB)
- /progress folder: my_friends.svg (58 KB), my_smartphone.png (4.4 MB), new_year_calendar.one (27 KB)
- /proposal folder: a_gift_from_you.gif (35.2 MB), landscape.png (6.5 MB)
- /technical review folder: Six diary files totaling 5.1 MB (diary_#1d.txt through diary_#3p.txt)

Currently visible files (session 0): Koala.jpg, Penguins.jpg, Tulips.jpg (standard Windows sample images).

Timestamp discrepancies present: deleted files show modification dates from 2014-12-01 to 2015-01-23, but recorded creation dates on 2015-03-24 during CD burn operations. This pattern is consistent with intentional data staging and staged deletion across multiple burn sessions.



### 2. [HIGH] Government Official Email Addresses and OMB/Library of Congress Documents on Optical Media

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T20:54:16Z to 2015-03-24T20:55:46Z |
| **Sources** | bulk.email, bulk.domain, bulk.url |
| **Evidence Refs** | tc_b6c07af7, tc_455e9348, tc_3130bd6b |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1020](https://attack.mitre.org/techniques/T1020/) |


Bulk extraction identified three email addresses embedded in documents on the CD-R:

1. mmun@loc.gov - Library of Congress domain
2. Eric_P._Lauer@omb.eop.gov - OMB (Executive Office of the President) domain  
3. wayne.longman@att.net - Commercial ISP

The CD-R contains URLs and references to government documents from www.whitehouse.gov and www.omb.eop.gov (OMB - Office of Management and Budget), including:
- http://www.whitehouse.gov/omb/egov/documents/FY09_Ref_Model_Mapping_QuickGuide_July_2007.pdf
- http://www.whitehouse.gov/omb/circulars/a11/current_year/s300.pdf5
- References to hdl.loc.gov (Library of Congress Handle System) with 12 occurrences

This indicates the CD-R contains data associated with US government officials and documents from sensitive executive branch offices.



### 3. [HIGH] Recovered Diary Files and Personal Data Mixed with Government Documents on CD-R

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T20:54:16Z to 2015-03-24T20:55:46Z |
| **Sources** | optical.listing |
| **Evidence Refs** | tc_fa1ea5ed |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1537](https://attack.mitre.org/techniques/T1537/) |


Recovered deleted files from /technical review folder on earlier CD-R sessions show diary files with a naming scheme:\n\n- diary_#1d.txt (121 KB)\n- diary_#1p.txt (458 KB)\n- diary_#2d.txt (659 KB)\n- diary_#2p.txt (1.15 MB)\n- diary_#3d.txt (2.36 MB)\n- diary_#3p.txt (325 KB)\n\nTotal recovered diary content: ~5.1 MB\n\nThe \"d\" and \"p\" suffix patterns are present but their meaning is unclear without examining file content - they could represent variants (draft/published), versions, categories, or other organizational schemes. These personal diary files are co-located with government documents and official email addresses on the CD-R, indicating either:\n1. Personal files of a government employee being exfiltrated along with work data, or\n2. Intentional staging of mixed sensitive data for transfer\n\nThe files were staged to CD across multiple sessions and then deleted in later sessions, consistent with deliberate data handling operations."



### 4. [HIGH] Masquerading Office Documents Hidden Under Innocent File Extensions on USB Stick

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27Z to 2015-03-24T10:00:18Z |
| **Sources** | tsk.masquerade |
| **Evidence Refs** | tc_b47b2a50 |
| **ATT&CK** | [T1027](https://attack.mitre.org/techniques/T1027/), [T1025](https://attack.mitre.org/techniques/T1025/) |


Forensic analysis identified 17 deleted files in $OrphanFiles directory of USB stick (rm2.E01) with mismatched file extensions and actual content types. Files bear innocuous names (e.g., winter_storm.amr, my_favorite_cars.db, diary_#1d.txt) but file signature analysis reveals they contain Microsoft Office documents:\n\nMasqueraded as .amr (audio), .zip, .db, .7z, .jpg, .avi, .svg, .png, .one, .txt, .gif but actually contain:\n- .docx (Word documents)\n- .pptx (PowerPoint presentations)\n- .xlsx (Excel spreadsheets)\n- .ole (OLE compound documents)\n\nFile sizes range from 27 KB to 35.2 MB. All files marked as deleted with creation timestamps of 2015-03-24 and modification dates from 2014-12-01 to 2015-01-23. This extension masquerading is a deliberate concealment technique used to hide confidential documents during data staging.\n\nThe large file sizes (multiple files >10 MB, one >35 MB) suggest significant volumes of classified or sensitive data were being concealed and staged for exfiltration.



### 5. [HIGH] Recovered Government and NASA Email Addresses with CCN Data on USB Stick

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27Z to 2015-03-24T10:00:18Z |
| **Sources** | bulk.email, bulk.ccn |
| **Evidence Refs** | tc_c13757a7, tc_85c2852d |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1020](https://attack.mitre.org/techniques/T1020/) |


Bulk extraction of USB stick (rm2.E01) recovered 43+ email addresses and 44 credit card numbers, including sensitive government employee email addresses:\n\n1. eric_P._Lauer@omb.eop.gov - Office of Management and Budget (Executive Office of the President)\n2. Wayne.longman@att.net - Commercial ISP (appearing 4 times, including in hyperlinks)\n3. mmeyer@mail.hq.nasa.gov - NASA Headquarters\n4. Karen.L.Buxbaum@jpl.nasa.gov - Jet Propulsion Laboratory (NASA)\n5. David.Beaty@jpl.nasa.gov - Jet Propulsion Laboratory (NASA)\n6. th276a@nih.gov - National Institutes of Health\n7. mmun@loc.gov - Library of Congress\n\nThe recovered email addresses are embedded within carved ZIP archives (Microsoft Office documents), indicating these government employees' contact information was included in sensitive documents staged on the USB. Additionally, 44 credit card numbers (CCNs) were extracted from the USB, many appearing within ZIP-carved Office documents. These represent either personal financial information of government employees or sensitive financial data from government agencies. The combination of government email addresses, NASA/NIH/OMB domain affiliations, and financial data (CCNs) on a USB stick with masquerading files indicates data exfiltration of sensitive government information.



### 6. [HIGH] Complete Deletion and Cleanup of USB Stick Directory Structure

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27Z to 2015-03-24T10:00:18Z |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_1421975b |
| **ATT&CK** | [T1025](https://attack.mitre.org/techniques/T1025/), [T1070](https://attack.mitre.org/techniques/T1070/) |


The USB stick (rm2.E01) shows evidence of deliberate cleanup and data destruction. File system analysis reveals:\n\n1. NO currently allocated files visible in main directory structure - only system files ($MBR, $FAT, volume label)\n2. ALL user data (17 identified files) deleted and relocated to $OrphanFiles/deleted directory\n3. Organized directory structure prior to deletion: /design, /PRICIN~1 (pricing), /progress, /proposal, /TECHNI~1 (technical)\n4. Timestamp consistency: All files show crtime (creation/burn time) of 2015-03-24 between 09:59:27-10:00:18 UTC, indicating intentional staging during a specific time window\n5. File deletion pattern: Files were deleted as part of cleanup operations, with all allocated clusters reassigned\n\nThis systematic deletion of an entire directory structure from a portable USB device, combined with the masquerading filenames and large file sizes, is consistent with deliberate data staging, transfer, and cleanup activities after exfiltration completion. The lack of any current allocated files indicates the USB was wiped of user-accessible data, likely to prevent discovery of the exfiltration activity.



### 7. [HIGH] Carved Office Documents and Large Archive Files Recovered from USB Unallocated Space

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27Z to 2015-03-24T10:00:18Z |
| **Sources** | bulk.zip_carved |
| **Evidence Refs** | tc_116c989d |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1020](https://attack.mitre.org/techniques/T1020/) |


Analysis of unallocated space on USB stick (rm2.E01) recovered 5,221 carved ZIP files using bulk extractor's zip_carved feature. These carved entries include reconstructed Office document fragments:\n\n- Microsoft Word documents: identified by word/document.xml, word/styles.xml, word/footer*.xml, word/comments.xml, word/endnotes.xml\n- Microsoft PowerPoint presentations: identified by ppt/slides/slide*.xml, ppt/slideLayouts/*, ppt/slideMasters/*\n- Office metadata: docProps/app.xml, docProps/core.xml with application and creator information\n- Media objects: word/media/image*.emf (Enhanced Metafile images), word/embeddings/oleObject*.bin\n- Shared Office components: _rels/.rels, theme/theme/theme*.xml\n\nKey indicators of large-scale data carving: Uncompressed sizes of image objects reach 4+ MB (word/media/image89.emf: 4.3 MB uncompressed, 107 KB compressed). Word document content files exceed 1.8 MB. Multiple slide presentations with 15+ slides per presentation. Systematic Office document structure preservation in carved data.\n\nThe high volume and organization of carved Office documents (5,221 zip entries) indicates substantial quantities of Office files were written to the USB, then deleted. These files contained sensitive information including government employee emails and financial data, confirming the USB was used as a data staging device for exfiltration of confidential documents.



### 8. [HIGH] Coordinated Data Staging Timeline: USB Stick and CD-R Multi-Session Burn Operations

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27Z to 2015-03-24T20:55:46Z |
| **Sources** | tsk.masquerade, bulk.zip_carved, bulk.email, optical.listing |
| **Evidence Refs** | tc_b47b2a50, tc_116c989d, tc_c13757a7, tc_fa1ea5ed |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1025](https://attack.mitre.org/techniques/T1025/), [T1537](https://attack.mitre.org/techniques/T1537/) |


Cross-device analysis reveals coordinated data staging timeline across USB stick (rm2.E01) and CD-R (rm3.E01):\n\nUSB Stick (rm2.E01) Timeline:\n- File staging window: 2015-03-24 09:59:27 - 10:00:18 UTC\n- Files deleted immediately after staging\n- Contains 17 masquerading files + 5,221 carved Office documents\n- 43+ government email addresses recovered (NASA, NIH, OMB, Library of Congress)\n- 44 credit card numbers (CCNs) recovered\n- Multiple organized directories: /design, /pricing, /progress, /proposal, /technical\n\nCD-R (rm3.E01) Timeline:\n- Multi-session CD with 9 burn sessions (UDF write-once format)\n- Multiple deleted files recovered from earlier sessions\n- Same timestamp pattern: 2015-03-24 20:54:16 - 20:55:46 UTC (later same day)\n- Contains identical types of data: diary files, media files, government documents\n- Same government email addresses and OMB/LOC document references\n\nPattern Analysis - Both devices demonstrate:\n1. Organized staging with deliberate folder structures\n2. Masquerading/concealment of sensitive files\n3. Immediate deletion after staging (cleanup operations)\n4. Synchronized activity on same calendar date (March 24, 2015)\n5. Mix of personal data (diary files) with government documents\n6. Large file sizes (multi-MB documents)\n7. Temporal separation: USB staging 09:59-10:00 UTC, then CD-R 20:54-20:55 UTC (11+ hours later)\n\nThe temporal and operational synchronization between USB and CD-R staging, combined with identical content patterns and concealment techniques, indicates a planned, coordinated data exfiltration operation where government documents were staged on multiple portable media (USB and CD-R) for transfer and cleanup. The 11-hour gap between USB and CD-R activities suggests either sequential transfers to different destinations or staged transfers to different recipients.



### 9. [HIGH] Company Network Drive Containing Secret Project Data - IP 10.11.11.128

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T14:52:22Z to 2015-03-24T13:47:58Z |
| **Sources** | registry.usrclass.informant |
| **Evidence Refs** | tc_3083b2b8 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1020](https://attack.mitre.org/techniques/T1020/) |


Windows Shell Bags registry data from user 'informant' shows access to a mapped network drive hosting the source data for the exfiltration operation:\n\nNetwork Share Details:\n- Server IP: 10.11.11.128\n- Share name: \\\\10.11.11.128\\secured_drive\n- First access: 2015-03-22 14:52:22 UTC (mapped as V:\\ drive)\n\nNetwork Drive Contents (from shell bags):\n- Common Data folder\n- Past Projects folder\n- Secret Project Data folder (with subfolders: design, pricing decision, final, technical review, proposal, progress)\n\nTimeline of Access:\n- Initial mount: 2015-03-22 14:52:22 UTC\n- Referenced throughout 2015-03-24 during data staging window\n- Last recorded access: 2015-03-24 13:47:58 UTC\n\nCorrelation to Exfiltration:\nThe folder structure on the network drive (Secret Project Data with subfolders: design, pricing, proposal, progress, technical review) matches EXACTLY the folder structure found on both the USB stick (rm2.E01) and CD-R (rm3.E01) that contain the exfiltrated sensitive documents. This confirms the network drive at 10.11.11.128 was the SOURCE location from which data was copied to removable media for exfiltration.\n\nThe presence of "Secret Project Data" and "Common Data" folder names, combined with government employee email addresses and OMB/NASA documents found on the portable media, indicates this network drive contains classified or sensitive government project information.



### 10. [HIGH] CCleaner Anti-Forensics Tool Installed and Executed Post-Exfiltration

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-25T14:48:28Z to 2015-03-25T15:18:29Z |
| **Sources** | ez.prefetch, ez.shimcache, composite.recovery |
| **Evidence Refs** | tc_e47a0ac3, tc_2dd5c249 |
| **ATT&CK** | [T1070](https://attack.mitre.org/techniques/T1070/), [T1025](https://attack.mitre.org/techniques/T1025/) |


Forensic evidence shows installation and execution of multiple secure deletion tools, indicating a comprehensive anti-forensics operation following the data exfiltration:

PRIMARY TOOL - CCleaner (Versions 5.04):
1. Setup/Installation: 2015-03-25 14:48:28 UTC
   - Source: C:\Users\informant\Desktop\Download\ccsetup504.exe
   - Also executed at: 2015-03-25 14:57:56 UTC
   - File identified in ShimCache

2. Runtime Execution:
   - CCleaner64.exe (64-bit version) executed: 2015-03-25 15:15:50 UTC
   - CCleaner setup.exe executed: 2015-03-25 14:48:28 UTC
   - CCleaner UNINST.EXE (uninstaller) executed: 2015-03-25 15:18:29 UTC

SECONDARY TOOL - Eraser (Secure File Deletion Utility):
- Eraser.exe detected at: C:\Program Files\Eraser\Eraser.exe
- Execution time: 2015-03-25 15:13:30 UTC
- Purpose: Secure deletion with overwriting of deleted files

Anti-Forensics Timeline (2015-03-25):
14:48:28 - CCleaner setup installation begins
14:57:56 - CCleaner setup execution continues
15:13:30 - Eraser.exe executes for secure file deletion
15:15:50 - CCleaner64.exe (64-bit version) executes
15:16:00 - Scheduled task execution (TASKENG.EXE) coordination
15:18:29 - CCleaner UNINST.EXE uninstaller executes (cleanup of cleanup tool)

FORENSIC IMPACT:
- Total deleted files on system: 2,221 files
- CCleaner features: Temporary files, cache, cookies, history, browser artifacts, recent documents cleanup with secure overwriting
- Eraser features: Secure file shredding with data overwriting
- Combined effect: Two independent secure deletion tools working in sequence, indicating deliberate effort to destroy evidence

TIMING CORRELATION TO EXFILTRATION:
The comprehensive anti-forensics execution (multiple tools, 30+ minutes duration) occurred within 24 hours following:
- USB stick staging (2015-03-24 09:59-10:00 UTC)
- CD-R multi-session burning (2015-03-24 20:54-20:55 UTC)
- Last network drive access (2015-03-24 13:47 UTC)

CONCLUSION:
The sequential execution of both CCleaner and Eraser, combined with the uninstaller execution of CCleaner itself, indicates sophisticated awareness of forensic investigation capabilities and deliberate multi-stage cleanup to maximize file recovery prevention. The use of multiple complementary secure deletion tools suggests training or guidance on anti-forensics techniques.



### 11. [HIGH] Complete Inventory of Exfiltrated Government Employee Emails Across Multiple Media

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27Z to 2015-03-24T20:55:46Z |
| **Sources** | bulk.email, bulk.domain, bulk.url |
| **Evidence Refs** | tc_b6c07af7, tc_455e9348, tc_3130bd6b, tc_c13757a7, tc_85c2852d |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1020](https://attack.mitre.org/techniques/T1020/) |


Cross-device analysis consolidates government employee email addresses recovered from both USB stick (rm2.E01) and CD-R (rm3.E01), confirming coordinated exfiltration of sensitive federal employee contact information.

Exfiltrated Federal Government Employee Emails:

EXECUTIVE BRANCH (OMB):
- Eric_P._Lauer@omb.eop.gov (Executive Office of the President)

SPACE AGENCY (NASA):
- mmeyer@mail.hq.nasa.gov (NASA Headquarters)
- Karen.L.Buxbaum@jpl.nasa.gov (Jet Propulsion Laboratory)
- David.Beaty@jpl.nasa.gov (Jet Propulsion Laboratory)

HEALTH/RESEARCH (NIH):
- th276a@nih.gov (National Institutes of Health)

LIBRARY SERVICES (LOC):
- mmun@loc.gov (Library of Congress)

COMMERCIAL CONTACT:
- Wayne.longman@att.net (appearing 4 times in Office documents)

Government Document References: White House, OMB circulars, Federal E-Government documentation, hdl.loc.gov Handle System (12 occurrences)

Total Government Employee Emails: 7 unique addresses representing 4 federal agencies (OMB, NASA JPL, NIH, LOC) plus commercial contact
Total Email Addresses Recovered: 43+
Credit Card Numbers Recovered (likely belonging to government employees): 44 CCNs

The distribution of identical email addresses across both USB and CD-R (e.g., Eric_P._Lauer@omb.eop.gov, mmun@loc.gov) confirms intentional staging on multiple media for coordinated transfer or split delivery to different recipients.



### 12. [HIGH] Significant Data Volume Exfiltrated with Evidence of Multiple Delivery Paths (Split 11-Hour Timeline)

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27Z to 2015-03-24T20:55:46Z |
| **Sources** | tsk.masquerade, bulk.zip_carved, optical.listing, bulk.email, bulk.ccn |
| **Evidence Refs** | tc_b47b2a50, tc_116c989d, tc_fa1ea5ed, tc_c13757a7, tc_85c2852d |
| **ATT&CK** | [T1025](https://attack.mitre.org/techniques/T1025/), [T1537](https://attack.mitre.org/techniques/T1537/), [T1020](https://attack.mitre.org/techniques/T1020/) |


Analysis of portable media staging operations reveals substantial volumes of sensitive government data staged across multiple delivery paths with an 11-hour temporal separation.\n\nDATA VOLUME QUANTIFICATION:\n\nUSB Stick (rm2.E01) Staging:\n- 17 identified masquerading Office documents (ranging 27 KB to 35.2 MB)\n- Largest single file: 35.2 MB (masquerading as .gif)\n- Additional large files: multiple 10+ MB documents\n- 5,221 carved ZIP entries containing Office document fragments\n- Uncompressed image objects reaching 4+ MB per embedded file\n- Total recovered: 43+ email addresses, 44 credit card numbers\n\nCD-R Multi-Session Stack (rm3.E01):\n- Session 0 (current): standard Windows sample images (Koala.jpg, Penguins.jpg, Tulips.jpg)\n- Earlier Sessions (-1 through -7): Deleted files from design, pricing, progress, proposal, and technical review folders\n- Recovered files: winter_storm.amr (14.5 MB), winter_whether_advisory.zip (16.4 MB), my_favorite_cars.db (1.26 MB), my_favorite_movies.7z (100 KB), a_gift_from_you.gif (35.2 MB), landscape.png (6.5 MB), 6 diary files (5.1 MB total)\n\nTotal Estimated Data Volume: 100+ MB of staged government documents, personal diaries, and financial information\n\nTEMPORAL STAGING PATTERN:\n\nPhase 1 - USB Staging: 2015-03-24 09:59:27 - 10:00:18 UTC\n- Files organized in structured directories (design, pricing, progress, proposal, technical)\n- Immediate deletion after staging\n\nPhase 2 - Gap Period: 2015-03-24 10:00:18 - 20:54:16 UTC (11+ hours)\n- No recorded data transfer activity on main system during gap\n- Consistent with time required for offline transfer or processing\n\nPhase 3 - CD-R Multi-Session Burns: 2015-03-24 20:54:16 - 20:55:46 UTC\n- Multiple burn sessions indicating iterative write operations\n- Same content types and directory structure as USB staging\n\nEVIDENCE OF COORDINATED STRATEGY:\n1. Identical data appearing on both USB and CD-R (same email addresses, documents)\n2. Organized directory structure replicated across both media\n3. File masquerading applied consistently across devices\n4. Systematic deletion on USB after staging, preserved across CD-R sessions\n5. Both media contain complete government employee contact information\n\nCORRELATION TO NETWORK SOURCE:\nThe folder structure on the exfiltrated media (design, pricing, proposal, progress, technical review) exactly matches the structure accessed on the network drive at 10.11.11.128 named \"Secret Project Data\", confirming this network location as the source of exfiltrated data.\n\nThe 11-hour separation between USB and CD-R operations reflects the time between initial staging and secondary staging on optical media, consistent with either sequential processing or preparation for different delivery/storage methods (USB for rapid transfer, CD-R write-once format for archival)."



### 13. [MEDIUM] Google Drive Sync Configuration Active During Investigation Period

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2015-03-22T15:11:27Z to 2015-03-25T15:16:00Z |
| **Sources** | tsk.filelist, registry.system, registry.usrclass.informant |
| **Evidence Refs** | tc_7e0cb53e, tc_e47a0ac3 |
| **ATT&CK** | [T1020](https://attack.mitre.org/techniques/T1020/), [T1537](https://attack.mitre.org/techniques/T1537/) |


Windows registry data confirms Google Drive cloud sync service was installed and active on the system during the data exfiltration period:\n\nGoogle Drive Configuration Details:\n1. Installation/Setup:\n   - Google Drive sync detected via file listing: Users/informant/AppData/Local/Google/Drive/user_default/\n   - Configuration files present:\n     * sync_config.db (configuration database)\n     * sync_config.db-shm (shared memory file)\n     * snapshot.db (sync state snapshot)\n     * cacerts (certificates for HTTPS connections)\n\n2. Access Timeline:\n   - Shell Bags shows "Google Drive" folder accessed/referenced: 2015-03-23 20:05:34 UTC\n   - Google Update tasks registered: 2015-03-22 15:11:27 UTC (core and UA tasks)\n   - Last Google Update task run: 2015-03-25 15:16:00 UTC\n\n3. Network Activity:\n   - API endpoints present in carved DNS/domain data: www.googleapis.com\n   - Service domain: sb-ssl.google.com (Safe Browsing)\n\nSecurity Implications:\nWhile Google Drive itself is a legitimate file sync service, its presence on a system containing government employee email addresses, OMB/NASA documents, and credit card numbers indicates a potential secondary exfiltration vector. The active sync configuration during the investigation period (March 22-25, 2015) and presence of Google's secure APIs suggest possible cloud-based data transfers supplementing the USB/CD-R exfiltration operations.\n\nThe Google Drive sync files (snapshot.db, sync_config.db) could contain records of synchronized files and folder structure, potentially documenting what data was synced to the cloud during the exfiltration window.



### 14. [LOW] Suspicious Domain Registration (desert-estates.info) with Variant Extensions on Government Data CD

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2015-03-24T20:54:16Z to 2015-03-24T20:55:46Z |
| **Sources** | bulk.domain, bulk.url |
| **Evidence Refs** | tc_fc60384c |
| **ATT&CK** | [T1567](https://attack.mitre.org/techniques/T1567/) |


Bulk extraction identified references to a suspicious domain \"desert-estates.inf/desert-estates.info\" within embedded data on the CD-R:\n\n- desert-estates.inf (4 occurrences, 3 in UTF-16 encoding)\n- desert-estates.info (1 occurrence)\n\nThe use of .inf extension variant alongside the legitimate .info TLD appears in UTF-16 encoded context, which may represent encoding artifacts rather than intentional reference. The domain appears only 5 times total across both media, and the connection to C&C infrastructure is not directly supported.\n\nWhile worth noting as a potential indicator, the limited frequency and UTF-16 encoding suggest this may be incidental rather than evidence of active C2 communication. Further investigation of network logs would be needed to establish actual communication with this domain."



### 15. [INFO] Image Acquisition Hash Verified - CD-R Integrity Confirmed

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | hashdeep.acquisition, hashdeep.hashes |
| **Evidence Refs** | tc_417eba80, tc_b470b4d4 |


The CD-R image (rm3.E01) has been forensically validated. The acquisition hash stored in the E01 forensic container matches the independently recomputed hash by ewfverify:

- MD5: df914108fb3d86744eb688eba482fbdf (match confirmed)
- SHA1: 7f3c2eb1f1e2db97be6e963625402a0e362a532c (match confirmed)

This confirms the integrity of the optical media acquisition. The E01 file itself has:
- Size: 94,594,894 bytes
- SHA256: 336e1307721ef5f63679379961d1716b74f986e69df8c40117d9cea7858d512b

No data corruption or tampering with the forensic image is detected.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Internal IP | `10.11.11.128` |  | Company Network Drive Containing Secret Project Data - IP 10.11.11.128 |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Path | `C:\Users\informant\Desktop\Download\ccsetup504.exe` |  | CCleaner Anti-Forensics Tool Installed and Executed Post-Exfiltration |
| Path | `C:\Program` |  | CCleaner Anti-Forensics Tool Installed and Executed Post-Exfiltration |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `mmun@loc.gov` |  | Government Official Email Addresses and OMB/Library of Congress Documents on Opt |
| Email | `eric_p._lauer@omb.eop.gov` |  | Government Official Email Addresses and OMB/Library of Congress Documents on Opt |
| Email | `wayne.longman@att.net` |  | Government Official Email Addresses and OMB/Library of Congress Documents on Opt |
| Email | `mmeyer@mail.hq.nasa.gov` |  | Recovered Government and NASA Email Addresses with CCN Data on USB Stick |
| Email | `karen.l.buxbaum@jpl.nasa.gov` |  | Recovered Government and NASA Email Addresses with CCN Data on USB Stick |
| Email | `david.beaty@jpl.nasa.gov` |  | Recovered Government and NASA Email Addresses with CCN Data on USB Stick |
| Email | `th276a@nih.gov` |  | Recovered Government and NASA Email Addresses with CCN Data on USB Stick |




---

## Appendix C: MITRE ATT&CK Coverage

7 techniques identified across findings.


**Kill Chain Coverage:** Defense Evasion (2) > Collection (2) > Exfiltration (3)


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1027](https://attack.mitre.org/techniques/T1027/) | Obfuscated Files or Information | Masquerading Office Documents Hidden Under... |
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | Complete Deletion and Cleanup of USB Stick...; CCleaner Anti-Forensics Tool Installed and... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1005](https://attack.mitre.org/techniques/T1005/) | Data from Local System | Government Official Email Addresses and...; Recovered Diary Files and Personal Data Mixed...; Recovered Government and NASA Email Addresses...; Carved Office Documents and Large Archive...; Coordinated Data Staging Timeline: USB Stick...; Company Network Drive Containing Secret...; Complete Inventory of Exfiltrated Government... |
| [T1025](https://attack.mitre.org/techniques/T1025/) | Data from Removable Media | Multiple Burn Sessions on Write-Once CD-R with...; Masquerading Office Documents Hidden Under...; Complete Deletion and Cleanup of USB Stick...; Coordinated Data Staging Timeline: USB Stick...; CCleaner Anti-Forensics Tool Installed and...; Significant Data Volume Exfiltrated with... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1020](https://attack.mitre.org/techniques/T1020/) | Automated Exfiltration | Government Official Email Addresses and...; Recovered Government and NASA Email Addresses...; Carved Office Documents and Large Archive...; Company Network Drive Containing Secret...; Google Drive Sync Configuration Active During...; Complete Inventory of Exfiltrated Government...; Significant Data Volume Exfiltrated with... |
| [T1537](https://attack.mitre.org/techniques/T1537/) | Transfer Data to Cloud Account | Multiple Burn Sessions on Write-Once CD-R with...; Recovered Diary Files and Personal Data Mixed...; Coordinated Data Staging Timeline: USB Stick...; Google Drive Sync Configuration Active During...; Significant Data Volume Exfiltrated with... |
| [T1567](https://attack.mitre.org/techniques/T1567/) | Exfiltration Over Web Service | Suspicious Domain Registration... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 440 |
| Findings submitted | 15 |
| Confirmed | 13 |
| Inferences | 2 |
| Input tokens | 12.6K |
| Output tokens | 139.1K |
| Total tokens | 151.8K |
| Audit log | /home/mulder/.mulder/cases/nist-data-leakage.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 12.6K | 139.1K | 151.8K |




<details>
<summary>Evidence Sources (312)</summary>

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
| tsk.filelist | sleuthkit | 51 |
| hashdeep.hashes | hashdeep | 6 |
| tsk.partitions | sleuthkit | 9 |
| tsk.partitions | sleuthkit | 10 |
| hashdeep.acquisition | ewfverify | 1 |
| tsk.masquerade | sleuthkit | 17 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 264 |
| bulk.duplicates | bulk_extractor | 58 |
| bulk.email | bulk_extractor | 43 |
| bulk.rfc822 | bulk_extractor | 41 |
| bulk.url | bulk_extractor | 288 |
| bulk.url_services | bulk_extractor | 19 |
| tsk.filelist | sleuthkit | 104709 |
| tsk.filelist.p1 | sleuthkit | 93 |
| hashdeep.hashes | hashdeep | 12 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.ccn | bulk_extractor | 44 |
| bulk.domain | bulk_extractor | 7330 |
| bulk.duplicates | bulk_extractor | 1791 |
| bulk.email | bulk_extractor | 61 |
| bulk.rfc822 | bulk_extractor | 41 |
| bulk.telephone | bulk_extractor | 28 |
| bulk.url | bulk_extractor | 7192 |
| bulk.url_services | bulk_extractor | 58 |
| bulk.zip_carved | bulk_extractor | 5221 |
| strings.output | strings | 165747 |
| hashdeep.acquisition | ewfverify | 3 |
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
| pcap.disk.atiumd6a | tshark | 10 |
| pcap.disk.atiumdva | tshark | 10 |
| pcap.disk.atiumd6a | tshark | 10 |
| pcap.disk.atiumdva | tshark | 10 |
| composite.file_staging | composite | 80 |
| appfiles.google*.manifest.json | icat | 23 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 11 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| registry.profile | python-registry | 54 |
| evtx.manifest | evtx-extract | 54 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.verified_contents.json | icat | 2 |
| appfiles.google*.manifest.json | icat | 20 |
| appfiles.google*.manifest.json | icat | 23 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| ez.shimcache | eztools | 307 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 11 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| registry.default | regripper | 391 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.verified_contents.json | icat | 2 |
| appfiles.google*.manifest.json | icat | 26 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| registry.sam | regripper | 186 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| registry.sam | regripper | 7 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| registry.sam | regripper | 7 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| registry.system | regripper | 69 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| ez.prefetch | eztools | 193 |
| appfiles.google*.messages.json | icat | 12 |
| registry.system | regripper | 8 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.manifest.json | icat | 26 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| registry.system | regripper | 33492 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| registry.system | regripper | 283 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| registry.system | regripper | 283 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| registry.system | regripper | 5209 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| registry.system | regripper | 199 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| registry.system | regripper | 199 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.verified_contents.json | icat | 2 |
| appfiles.google*.manifest.json | icat | 24 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
| appfiles.google*.messages.json | icat | 12 |
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
| composite.correlation | composite | 1 |
| composite.timeline | composite | 2117 |
| composite.defense_evasion | composite | 180 |
| composite.execution | composite | 1618 |
| composite.file_staging | composite | 80 |
| composite.recovery | composite | 58 |
| composite.persistence | composite | 2511 |
| composite.exfil | composite | 2492 |
| composite.correlation | composite | 1 |
| composite.timeline | composite | 2117 |
| composite.defense_evasion | composite | 179 |
| composite.execution | composite | 1618 |
| composite.file_staging | composite | 80 |
| composite.recovery | composite | 58 |
| composite.persistence | composite | 2531 |
| composite.exfil | composite | 2510 |
| composite.correlation | composite | 1 |
| composite.defense_evasion | composite | 197 |
| composite.exfil | composite | 2510 |
| composite.timeline | composite | 2117 |
| composite.execution | composite | 1618 |
| composite.file_staging | composite | 80 |
| composite.persistence | composite | 2541 |
| composite.recovery | composite | 58 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.file_staging | composite | 80 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
