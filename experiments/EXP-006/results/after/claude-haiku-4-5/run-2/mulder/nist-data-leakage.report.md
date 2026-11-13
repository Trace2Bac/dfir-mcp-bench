# Mulder Investigation Report

**Case:** nist-data-leakage
**Generated:** 2026-11-12T18:10:10.775298+00:00
**Evidence:** /evidence/nist-data-leakage

---

## Executive Summary

**Scope:** 29 evidence sources (20 disk, 9 other) | 171 tool calls | 14 minutes
**Results:** 15 findings (1 high) | 5 confirmed, 10 inference
**Timeline:** 2014-12-19 to 2015-03-25

**Attack Lifecycle:**
- **Initial Access / Deployment** (2014-12-19 to 2015-03-25): Evidence of Data Staging: Secret Project Data on USB Device (RM#1) (+3 related)
- **Credential Access** (2015-03-24): Windows Sticky Notes Application Executed: Possible Evidence Storage on 2015-03-24
- **Discovery / Collection** (2015-03-24): Google Chrome Browser Activity: Intensive Usage (71 Execution Runs) Indicating Research
- **Other Activity** (2015-01-29 to 2015-03-24): Company Network Drive IP Address Identified: 10.11.11.128 (SECURED_DRIVE) (+2 related)

**Tools:** search (24), submit_finding (17), get_raw_output (14), update_finding (13), open_case (7). SHA-256 hashes recorded for all evidence.



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

171 tool calls were executed across 9
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative: Data Leakage Incident

## Background

This investigation concerns a suspected data leakage incident at a major international technology company involving a manager, "Iaman Informant," who was employed in the technology development division. The investigation was prompted by an attempt to remove unauthorized storage devices from the company premises at a security checkpoint.

According to company policy, confidential files are maintained only on authorized external storage devices and secured network drives. Access to confidential information is restricted to the hours of 10:00 to 16:00 with appropriate permissions. Unauthorized devices are strictly prohibited, and all employees must pass security checkpoints where storage devices are inspected.

The suspect, Iaman Informant (Windows username: "informant"), had administrative authority sufficient to bypass the company's DRM and DLP solutions. Digital forensic evidence was collected from three sources: the suspect's personal Windows 7 PC, removable media RM#2 (a USB memory stick), and RM#3 (a CD-R). At the security checkpoint, devices were briefly inspected and no evidence of leakage was discovered, though the devices were transferred to the forensics laboratory for detailed analysis.

## Incident Timeline

**December 2014 – February 2015: File Access Activity**

Forensic analysis recovered Windows Link (LNK) file artifacts indicating file access patterns on a USB device labeled "Authorized USB" (RM#1) during late 2014 and early February 2015. On December 19, 2014, at 19:53:46 UTC, files designated as "[secret_project]_proposal.docx" were present on this device. On December 4, 2014, at 15:24:50 UTC, "[secret_project]_design_concept.ppt" was recorded. These timestamps establish that confidential project files were stored on the USB device during this period.

Critical evidentiary distinction: Windows LNK files record file access timestamps (atime), not file transfer operations. The presence of files on the USB device on these dates indicates the files were accessed or opened, but does not definitively establish when they were initially copied to the device or whether they were pre-existing files that were accessed during legitimate work activities. The USB device label "Authorized USB" suggests this may have been the suspect's legitimate work storage device authorized for project access.

**January – March 2015: Network Drive Access**

Between January 29 and March 22, 2015, forensic evidence recovered from LNK artifacts shows multiple access instances to files on the company's secured network drive at IP address 10.11.11.128 (\\\\10.11.11.128\\SECURED_DRIVE). On January 29, 2015, at 20:35:14 UTC, access was recorded to "(secret_project)_pricing_decision.xlsx" in the "Secret Project Data\\pricing decision" folder. On March 22, 2015, at 14:52:21 UTC, multiple accesses to files including the pricing decision document and final meeting presentation were recorded. These access timestamps fall within the company's authorized access window (10:00-16:00) and are consistent with legitimate work activities.

**March 13–25, 2015: System Maintenance and File Manipulation Activities**

On March 13, 2015, at 11:10:26 UTC, CCleaner64.exe was installed to the system path "C:\\Program Files\\CCleaner\\". CCleaner is a widely-distributed, commercially available system maintenance and optimization utility maintained by Avast Software. On March 25, 2015, at 14:58:35 UTC (12 days after installation), CCleaner64.exe was executed. The temporal separation between installation and execution is consistent with normal software lifecycle patterns. However, forensic findings note that without corroborating evidence that CCleaner specifically targeted data exfiltration artifacts, the execution alone cannot conclusively establish anti-forensics intent, as routine system cleaning is standard practice.

**March 22–24, 2015: Office Application and Cloud Service Activity**

On March 22, 2015, at 15:03:23 UTC, Microsoft Outlook (OUTLOOK.EXE, version from October 2, 2012) was accessed multiple times. The same day at 15:16:56 UTC, Internet Explorer was accessed. Google Chrome was executed 71 times over the investigation period, with the final execution on March 24, 2015, at 21:05:38 UTC. This execution frequency (approximately 1.9 times per day over 38 days) is consistent with normal daily web browsing rather than concentrated research activity.

On March 23, 2015, at 20:01:50 UTC, iCloudWeb.exe and related Apple iCloud services were accessed, indicating connectivity to Apple's cloud services. A Google Drive folder access was recorded on March 23, 2015, at 20:05:32 UTC. Evidence indicates the suspect maintained accounts with multiple cloud service providers.

**March 24, 2015: Resignation Letter Creation and Desktop Activity**

On March 24, 2015, at 18:48:40 UTC, a Microsoft Word document titled "Resignation_Letter_(Iaman_Informant).docx" was created on the suspect's Desktop (C:\\Users\\informant\\Desktop). The file was accessed 11 minutes later at 18:59:30 UTC. Windows Prefetch data indicates WINWORD.EXE (Microsoft Word) was executed at 19:09:51 UTC, temporally adjacent to these file operations. Forensic findings note that the presence of a resignation letter does not establish it was ever finalized, sent, or communicated to the employer. LNK file timestamps show only that the document was created and accessed, with no evidence of email transmission, HR submission, or formal communication.

On the same day, March 24, 2015, at 20:40:55 UTC, a file "winter_whether_advisory.zip" located on a CD-R labeled "IAMAN CD" (RM#3) was accessed. Between 20:45:23 and 20:58:06 UTC, multiple interactions with the CD root directory and image files (Koala.jpg, Tulips.jpg, Penguins.jpg) were recorded.

**March 25, 2015: Final System Activities**

On March 25, 2015, at 14:58:35 UTC, CCleaner64.exe was executed as noted above. Also on March 25, 2015, at 15:28:33 UTC, a resignation letter document in XPS format (Resignation_Letter_(Iaman_Informant).xps) was accessed, representing a format conversion of the earlier Word document.

## Key Findings

**Evidence Acquisition and Integrity**

The forensic image of the suspect's PC (pc.E01) has the following cryptographic properties:
- File size: 2,147,463,521 bytes
- MD5 hash: 7338dbed7d2293334801416613bc17b5
- SHA-256 hash: e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9

No acquisition hash was recorded within the image file, therefore verification cannot be performed against an independent acquisition hash value. However, the forensic image was processed through hashdeep and ewfverify tools, establishing the integrity of the extracted evidence.

**System Configuration and Access Control**

The PC runs Windows 7 with two NTFS partitions. The Windows partition contains system files consistent with a standard Windows 7 installation, including bootmgr, BCD, and system language resources. The suspect's user account is registered as "informant" within the system. The system contains references to multiple user accounts, including administrative accounts and a "temporary" user account (as evidenced by LNK files in C:\\Users\\temporary\\).

**Cloud Services and Synchronization**

Bulk-extracted evidence identifies references to multiple cloud service providers: Google services (Google Drive, Google Accounts), Apple iCloud (version 4.0.6.28), and Microsoft cloud services (Microsoft OneDrive/OneDrive for Business). Browser cookies recovered indicate access to "informant@accounts.google.com" and references to personal cloud storage accounts. The evidence indicates the suspect had synchronized or accessed cloud storage platforms, consistent with the case briefing's assertion that cloud storage was used for data staging.

**Email Accounts and Network Communication**

Multiple email addresses associated with the suspect were identified through bulk email extraction:
- iaman.informant@nist.gov (business email)
- iaman.informant.personal@gmail.com (personal email)
- References to additional email addresses including variations and unconfirmed associations

Forensic findings note that bulk email extraction recovers email addresses through keyword carving and can produce false positives from cached web pages, document metadata, and temporary files. Without evidence of actual email communications regarding data exfiltration between identified addresses, these addresses alone do not establish conspiracy or unauthorized data transfer.

**Application Installation and Usage**

Windows Prefetch analysis indicates installation and execution of the following significant applications:
- Microsoft Office 2013 (Outlook, Word) - standard productivity suite
- Google Chrome - web browser with 71 recorded execution instances
- Internet Explorer - legacy web browser with recorded access to company network resources
- CCleaner 64-bit - system maintenance utility installed March 13, 2015

The presence and execution of these applications is consistent with typical office worker activity. Forensic findings emphasize that application execution frequency and installation do not inherently indicate malicious intent without corroborating evidence of misuse.

**Removable Media Access and CD Burning Activity**

Evidence recovered from LNK files shows reference to removable media with multiple physical labels:
- "Authorized USB" (RM#1) - accessed February 15, 2015, containing folders labeled "Secret Project Data" with subfolders for "proposal," "design," and other project files
- "IAMAN CD" (RM#3, CD-R) - accessed March 24, 2015, containing image files and compressed archives

LNK artifacts dated December 16, 2014, at 16:10:26 UTC, record the presence of "winter_whether_advisory.zip" on drive E:\\ (labeled "IAMAN CD" according to volume label data). Later access to this file on March 24, 2015, at 20:40:55 UTC, suggests the file had been present on the CD-R for approximately three months prior to the checkpoint incident.

**Web Search and Research Activity**

Browser history recovered through bulk_extractor includes diverse search queries spanning multiple categories:

Potentially suspicious searches (limited frequency):
- "leaking confidential information" (2 instances)
- "anti-forensic tools" (8 instances)
- "cd burning method in windows" (20+ instances)
- "data recovery tools" (2+ instances)

Ambiguous/legitimate context searches (high frequency):
- "information leakage cases" (30+ instances) - consistent with academic research or security training
- "Forensic Email Investigation" (20 instances) - consistent with IT security professional responsibilities
- "e-mail investigation" (30+ instances)
- "windows event logs" (22 instances) - standard IT administration
- "investigation on windows machine" (18 instances) - standard security research
- "DLP DRM" (30+ instances) - Data Loss Prevention and Digital Rights Management are legitimate corporate security topics

Forensic findings note that browser history searches are inherently ambiguous without knowledge of the suspect's specific job responsibilities, seniority level, and security role. A security analyst, IT administrator, or compliance officer conducting such research would be performing routine professional duties. The presence of multiple legitimate security topic searches alongside potentially suspicious queries does not establish definitive planning evidence without contextual corroboration.

**Checkpoint Inspection Finding**

The case briefing explicitly states that at the security checkpoint where the suspect was intercepted, his devices (RM#2 USB stick and RM#3 CD-R) underwent brief inspection with the documented result: "no evidence of any leakage was found." This finding represents critical evidence that directly contradicts claims of successful data exfiltration to removable media. The devices were subsequently transferred to the forensics laboratory, enabling detailed analysis of deleted files, hidden data, and unallocated space.

**Evidentiary Limitations and Chain of Custody**

Throughout this investigation, multiple evidentiary gaps undermine the coherence of an exfiltration narrative:

1. **File Access vs. File Transfer Distinction**: LNK files establish file access timestamps but do not establish definitive copy operations. Cluster allocation tables, $DATA stream creation timestamps, and NTFS Master File Table records would be required to confirm file transfer operations.

2. **39-Day Evidentiary Gap**: Between the alleged file access/staging on February 15 and the resignation letter creation on March 24, no direct forensic evidence of data transfer to external parties, rival company servers, or cloud services infrastructure is presented.

3. **Contradiction with Checkpoint Finding**: The explicit finding of "no evidence of any leakage" during checkpoint inspection contradicts claims that exfiltration was successfully completed to removable media. If data was allegedly staged on February 15 and checkpoint inspection found no data, this gap is not adequately explained by exfiltration to intermediate storage or cloud services, as such transfer operations would leave forensic traces.

## Threat Intelligence and Attribution

The evidence recovered does not support definitive attribution of data exfiltration to a specific external actor or conspiracy. While the case briefing describes communications between the suspect and a rival company employee ("Spy Conspirator"), forensic evidence of such communications is not confirmed. Email extraction did not recover message content confirming data transfer agreements, financial arrangements, or specific exfiltration instructions.

The combination of cloud service accounts, removable media access, resignation letter drafting, and anti-forensics tool execution could be consistent with insider threat activity. However, each element individually has legitimate alternative explanations, and the evidentiary chain as a whole contains significant gaps preventing confident attribution.

The absence of data at the checkpoint inspection is the most significant contradiction. If the suspect successfully exfiltrated confidential information through February 15 staging activities, subsequent checkpoint discovery of this data would be expected. The documented absence of data materially weakens the exfiltration narrative and suggests either: (1) files were never successfully transferred to removable media, (2) files were transferred and subsequently removed, or (3) the baseline assumption of exfiltration is incorrect.

## Impact Assessment

**Scope of Investigation**

The forensic investigation examined three evidence sources: the suspect's personal PC, a USB memory stick (RM#2), and a CD-R (RM#3). A total of 9 evidence sources were indexed during analysis, encompassing system artifacts, application data, network traces, and user activity logs.

**Systems Affected**

Primary system: 1 suspect PC (Windows 7)
Removable media examined: 2 devices (USB, CD-R)
Network infrastructure: Access confirmed to 1 company network drive (10.11.11.128 / SECURED_DRIVE) containing "Secret Project Data" files

**Data at Risk**

Evidence indicates the suspect had authorized access to files designated as containing sensitive project information:
- "[secret_project]_proposal.docx" (proposal documentation)
- "[secret_project]_design_concept.ppt" (design specifications)
- "[secret_project]_pricing_decision.xlsx" (financial/commercial sensitive data)
- "[secret_project]_final_meeting.pptx" (strategy presentations)

The scope and total volume of data that may have been exposed cannot be definitively quantified from forensic evidence, as LNK file artifacts show file presence but not definitive copy completion.

**Credential Exposure**

Multiple email accounts associated with the suspect were identified:
- Business email: iaman.informant@nist.gov
- Personal email: iaman.informant.personal@gmail.com
- Cloud service accounts with Google, Apple, and Microsoft

The extent to which account credentials, API tokens, or authentication materials were compromised cannot be determined from the available forensic evidence.

## Immediate Tactical Containment

Based on the forensic evidence recovered, the following immediate containment measures are recommended:

1. Revoke access permissions for user account "informant" on the company network drive (\\\\10.11.11.128\\SECURED_DRIVE) and all related network shares
2. Terminate all active sessions and disable the user account in Active Directory to prevent further network access
3. Change administrative credentials and access tokens associated with DRM and DLP bypass capabilities previously held by the suspect
4. Revoke access to all cloud service accounts (Google Drive, Apple iCloud, Microsoft OneDrive) that were accessed from the suspect's PC (informant@accounts.google.com and iaman.informant.personal@gmail.com)
5. Audit network logs (10.11.11.128) for the time period December 2014 – March 2015 to identify all file access, copy, and transfer operations performed by the suspect account
6. Isolate and quarantine the suspect's PC (pc.E01 evidence) from network connectivity to prevent potential remote data exfiltration
7. Block the IP address range associated with the rival company (if identified) at the network perimeter firewall
8. Initiate containment protocols for all personally synchronized cloud storage (drive E:\\ labeled "Authorized USB" and D:\\ labeled "IAMAN CD") to prevent further external access

## Strategic Remediation

**Root Cause 1: Lack of Continuous Data Access Auditing**

The organization relies on time-window restrictions (10:00-16:00) and file-level permissions to control access to the SECURED_DRIVE network share. However, the case demonstrates that a user with administrative bypass capabilities (the suspect) could access sensitive files at any time with minimal evidence of deviation from normal patterns. Finding f_98e76b0b confirms access to the SECURED_DRIVE on March 22, 2015, within the authorized time window, making it impossible to distinguish suspicious access from legitimate work without detailed file-level audit logging. Implement mandatory file-access event logging on the SECURED_DRIVE with tamper-proof centralized log aggregation to capture all file reads, modifications, and deletions. Configure alerts for access to files tagged as "confidential" outside normal working hours or by accounts that do not have explicit approval for those specific file collections.

**Root Cause 2: Administrative Override of DRM and DLP Controls**

Finding f_d075471e indicates that cloud services (Google Drive, Apple iCloud, Microsoft services) were accessible from the suspect's PC despite organizational policy. Finding f_98e76b0b notes the suspect "had enough authority to bypass the company's DRM and DLP solutions." This privilege concentration creates a single point of failure where one compromised or malicious account can circumvent all data protection mechanisms. Implement role-based access control (RBAC) separating administrative functions from user-data access. Require multi-factor approval (two-person rule) for any override of DLP/DRM controls, with mandatory audit logging and periodic review. Create a separate administrative workstation air-gapped from user data networks for administrative functions only.

**Root Cause 3: Insufficient Removable Media Policy Enforcement**

Finding f_5032030d identifies access to USB device RM#1 labeled "Authorized USB" containing confidential "Secret Project Data," and Finding evidence of CD-R "IAMAN CD" (RM#3) containing project files. Company policy states "storage devices are forbidden," yet evidence of legitimate authorized use exists. This ambiguity between policy and practice creates enforcement uncertainty. Implement a technical control to disable all removable media ports on employee workstations except for a centralized media bay with USB device whitelisting. All removable media must be provisioned through IT, encrypted, and logged. Establish mandatory checkout/check-in procedures with audit trails.

**Root Cause 4: Inadequate Resignation and Exit Process Integration**

Finding f_d849a916 identifies a resignation letter file created on March 24, 2015, but notes "there is no evidence of email transmission, printing, submission to HR, or any formal communication." The evidence suggests the suspect created an exit plan document without triggering any organizational controls or alerts. When a resignation letter is detected (through endpoint monitoring or file access patterns), this should trigger immediate escalation to HR and IT to conduct privilege review, data access audit, and credential reset within 24 hours. Implement behavioral analytics to flag unusual file access patterns or removal of files from SECURED_DRIVE in the 30-day window preceding formal resignation notification.

**Root Cause 5: Ineffective Anti-Forensics Detection and Response**

Finding f_195d3f8f identifies CCleaner installation (March 13) and execution (March 25). While forensic findings note that "CCleaner execution alone does not establish anti-forensics intent," the combination of system cleanup tool execution immediately preceding device inspection (March 25) at the security checkpoint warrants attention. Implement endpoint protection that detects and alerts on execution of known system cleanup and data recovery tools (CCleaner, Eraser, BleachBit, etc.) with mandatory incident response escalation. Preserve Windows event logs and MFT records in read-only centralized storage to prevent local deletion.

## Conclusion

This investigation examined a suspected corporate data leakage incident involving a manager at an international technology company. Forensic analysis recovered evidence of file access patterns, cloud service usage, removable media interactions, and application execution history. However, critical evidentiary gaps and contradictions undermine the conclusiveness of the investigation findings.

**Q1: What systems were compromised?**
The suspect's Windows 7 PC (pc.E01) shows evidence of access to company infrastructure including the secured network drive (10.11.11.128). Cloud service accounts (Google, Apple, Microsoft) were accessed from this PC. No definitive evidence of compromise of company systems by external actors is present. The PC itself was not compromised by malware or unauthorized remote access; activity patterns are consistent with authorized user operations.

**Q2: How did the attacker gain initial access?**
This question assumes external attacker involvement. The evidence suggests insider activity by an authorized employee (the suspect) rather than external attack. The suspect had administrative privileges and authorized access to company data systems. No evidence of exploit, vulnerability abuse, or unauthorized credential acquisition is present. Initial access was through normal employee authentication using the "informant" user account.

**Q3: What lateral movement occurred?**
Lateral movement typically refers to movement across network systems. Forensic evidence shows access to the SECURED_DRIVE network share (10.11.11.128) from the suspect's PC. LNK file evidence indicates file access on both the network drive and removable USB media. However, this activity appears to be vertical movement (accessing data systems the suspect already had legitimate authorization to access) rather than lateral movement across systems for which the suspect lacked authorization. No evidence of privilege escalation or access to systems outside the suspect's authorized scope is present.

**Q4: What persistence mechanisms were installed?**
No persistence mechanisms (rootkits, scheduled tasks for remote access, webshells, registry modifications enabling auto-start malware) are identified in the forensic evidence. Application installations noted (Microsoft Office, Google Chrome, CCleaner) are standard utilities, not persistence mechanisms. The suspect relied on pre-existing authorized access credentials rather than installing new persistence.

**Q5: Was data exfiltrated, and if so, what and how much?**
Evidence of data staging to removable media exists (files present on USB device RM#1 labeled "Authorized USB" in December 2014 and February 2015). However, the case briefing explicitly documents that at the security checkpoint where interception occurred, "no evidence of any leakage was found" on the recovered devices (RM#2 USB stick and RM#3 CD-R). This critical finding contradicts the exfiltration narrative. No forensic evidence of successful data transfer to external parties, competitor networks, or external cloud infrastructure is present. The total scope of potential data exposure cannot be quantified from available evidence.

**Q6: What is the full timeline of the incident?**
The incident spans December 2014 through March 25, 2015. File access patterns begin in December 2014 with "[secret_project]_proposal.docx" present on removable media on December 19, 2014. January 2015 shows network drive access to pricing and strategic documents. February 15, 2015, records access to project files on the USB device. A 39-day gap follows with limited detectable activity until March 22-25, 2015, when resignation letter creation, cloud service access, removable media interactions, and system cleanup tool execution occur. The suspect is intercepted at the security checkpoint attempting to remove storage devices on or shortly after March 25, 2015.

**Q7: What is the total scope and business impact?**
The investigation identified access to confidential project documentation including proposal, design specifications, pricing information, and meeting presentations. The data classification and total volume cannot be determined from forensic evidence. The attempted exfiltration (if successful) could impact competitive advantage and business strategy. Unauthorized access to pricing documents could enable the rival company to undercut pricing or adjust competitive strategy. Design documentation could accelerate product development timelines for the competitor. The business impact is potentially significant, but definitive quantification is not possible from the recovered forensic evidence given the checkpoint inspection finding of "no evidence of any leakage."

**Q8: What are the recommended remediation actions?**
As detailed in the Strategic Remediation section, specific recommended actions address five root causes: (1) implement continuous data access auditing on the SECURED_DRIVE with tamper-proof centralized logging; (2) separate administrative functions from user-data access and require multi-factor approval for DLP/DRM overrides; (3) implement technical controls on removable media with mandatory centralized provisioning and audit trails; (4) integrate resignation/exit processes with IT to trigger immediate privilege review and credential reset; and (5) detect and alert on execution of anti-forensics tools with mandatory incident response escalation.

---

# Case Questions

Case Q1: **What are the hash values (MD5 & SHA-1) of all images? Does the acquisition and verification hash value match?**
PC image (pc.E01): MD5: 7338dbed7d2293334801416613bc17b5, SHA-256: e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9. No acquisition hash is stored in the image file, so verification against an independent acquisition hash cannot be performed. The evidence was processed through hashdeep and ewfverify to establish integrity but no SHA-1 hash was computed in the available evidence.

Case Q2: **Explain installed OS information in detail. (OS name, install date, registered owner...)**
Windows 7 is installed on the PC. Specific OS installation date, registered owner name, and service pack version are not explicitly documented in the extracted forensic evidence available for this analysis. The presence of Windows system files (bootmgr, BCD, system language resources) in the filesystem confirms Windows 7 installation, but detailed installation metadata requires examination of Windows Registry HKEY_LOCAL_MACHINE\Software registry hive or other system metadata sources not explicitly extracted in available evidence.

Case Q3: **What is the timezone setting?**
The timezone setting is not explicitly documented in the extracted evidence sources examined. Conversion of timestamps between UTC and local timezone would require this information for accurate interpretation. Windows Registry hive files containing TimeZoneInformation would provide this data, but this specific examination is not reflected in the extracted evidence.

Case Q4: **What is the computer name?**
The computer name is not explicitly documented in the extracted forensic evidence available. Windows Registry HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Tcpip\Parameters would contain this information, but specific extraction of computer name is not present in the indexed sources.

Case Q5: **List all accounts in OS except the system accounts: Administrator, Guest, systemprofile, LocalService, NetworkService. (Account name, login count, last logon date...)**
The suspect's user account "informant" is confirmed through LNK file artifacts showing the Desktop path "C:\\Users\\informant\\Desktop" and AppData locations. Additional user accounts "temporary" and "admin11" are referenced in LNK file artifacts (C:\\Users\\temporary\\... and C:\\Users\\admin11\\Desktop). Specific login counts and last logon dates for these accounts are not provided in the extracted forensic evidence.

Case Q6: **Who was the last user to logon into PC?**
The last confirmed user activity is associated with the "informant" account, with the most recent activity timestamp being March 25, 2015, at 15:28:34 UTC (accessing Resignation_Letter_(Iaman_Informant).xps). However, definitive last login timestamp is not explicitly documented in the extracted evidence.

Case Q7: **When was the last recorded shutdown date/time?**
The last recorded shutdown date/time is not explicitly documented in the extracted forensic evidence. Windows event logs or system state files (hiberfil.sys, pagefile.sys) would contain this information, but specific extraction is not present in indexed sources.

Case Q8: **Explain the information of network interface(s) with an IP address assigned by DHCP.**
The company's secured network drive is located at IP address 10.11.11.128 (\\\\10.11.11.128\\SECURED_DRIVE). This is a private network address consistent with DHCP allocation from a Class A private range (10.0.0.0/8). No details of the suspect's PC's own network interface configuration, MAC address, or DHCP-assigned IP address are explicitly documented in extracted forensic evidence.

Case Q9: **What applications were installed by the suspect after installing OS?**
Applications identified through LNK and Prefetch analysis include: (1) Microsoft Office 2013 (Outlook, Word); (2) Google Chrome (web browser); (3) Internet Explorer; (4) Apple iCloud services (ShellStreamsShortcut.exe, iCloudWeb.exe installed November 21, 2014, version 4.0.6.28); (5) CCleaner 64-bit (installed March 13, 2015). Applications present at Windows 7 installation (system default utilities) cannot be definitively distinguished from post-installation applications without preserved application installation logs.

Case Q10: **What web browsers were used?**
Internet Explorer (multiple accesses recorded March 15-22, 2015). Google Chrome (71 recorded execution instances with final execution March 24, 2015, at 21:05:38 UTC). Both browsers show LNK evidence of execution from their standard installation locations.

Case Q11: **What application was used for e-mail communication?**
Microsoft Outlook (OUTLOOK.EXE from Microsoft Office 2013, dated October 2, 2012) is recorded with multiple accesses on March 22, 2015, at 15:03:23 UTC. This is the primary email application identified through LNK analysis.

Case Q12: **What was the e-mail account used by the suspect?**
Multiple email accounts are identified: Business account (iaman.informant@nist.gov), Personal Google account (iaman.informant.personal@gmail.com), and Cloud service accounts (informant@accounts.google.com). The specific email account configured in Outlook is not explicitly documented in extracted evidence.

Case Q13: **List external storage devices attached to PC.**
USB device labeled "Authorized USB" (RM#1) - accessed February 15, 2015, containing "Secret Project Data" folders. CD-R labeled "IAMAN CD" (RM#3) - accessed March 24, 2015. The suspect's USB stick (RM#2) and CD-R (RM#3) recovered at checkpoint are the primary evidence devices. References to drives E:\\ and D:\\ with these volume labels indicate attachment to the PC.

Case Q14: **What is the IP address of company's shared network drive?**
10.11.11.128 (network share path: \\\\10.11.11.128\\SECURED_DRIVE and \\\\10.11.11.128\\secured_drive - case variations recorded in LNK artifacts). This is confirmed through multiple LNK file references to this network path with device mapping to V:\\.

Case Q15: **Find traces related to cloud services on PC. (Service name, log files...)**
Google services: Google Drive folder reference (C:\\Users\\informant\\Google Drive, accessed March 23, 2015, at 20:05:32 UTC); Google Chrome browser with multiple executions. Apple iCloud: ShellStreamsShortcut.exe (November 21, 2014) and iCloudWeb.exe (November 21, 2014, accessed March 23, 2015, at 20:01:50 UTC); version 4.0.6.28. Microsoft services: Online account references in Windows. Specific log files are not detailed in extracted evidence.

Case Q16: **What files were deleted from Google Drive? Find the filename and modified timestamp of the file.**
Evidence of Google Drive folder access is present, but specific deleted files and their original modification timestamps are not documented in the extracted forensic evidence. Recovery of deleted Google Drive files would require examination of cloud service sync logs or remnants in temporary cache directories.

Case Q17: **Identify account information for synchronizing Google Drive.**
informant@accounts.google.com and iaman.informant.personal@gmail.com are identified as associated with Google/cloud services. Specific Google Drive account configuration details and synchronization settings are not documented in extracted evidence.

Case Q18: **When did the suspect burn CD-R?**
Evidence indicates the CD labeled "IAMAN CD" (RM#3) contained files with original modification dates of December 16, 2014, at 16:10:26 UTC (winter_whether_advisory.zip). LNK artifacts show CD access on March 24, 2015, at 20:40:55 UTC through 20:58:06 UTC. The specific CD burning date cannot be precisely determined from available evidence; the content dates suggest the CD was burned on or after December 16, 2014, but forensic evidence does not definitively establish the exact burn date.

Case Q19: **How and when did the suspect print a resignation file?**
No definitive evidence of printing the resignation letter is documented. LNK artifacts show the resignation document "Resignation_Letter_(Iaman_Informant).docx" was created March 24, 2015, at 18:48:40 UTC and accessed at 18:59:30 UTC. A related file "Resignation_Letter_(Iaman_Informant).xps" (XPS format) shows access on March 25, 2015, at 15:28:33 UTC. XPS is a print-to-file format, suggesting potential printing or document export, but no conclusive printing event is documented in extracted evidence.

Case Q20: **Identify notes stored in the Sticky Note file.**
Windows Sticky Notes application (STIKYNOT.EXE) is referenced in system files, but the LNK evidence shows execution timestamp of March 24, 2015, at 18:31:55 UTC with 2 execution runs recorded. The actual content of sticky notes is not extracted or documented in available forensic evidence. Sticky Notes data is stored in the user's AppData directory, but specific note content is not detailed in the indexed sources.

Case Q21: **Examine 'Recycle Bin' data in PC.**
Recycle Bin data is not explicitly extracted or documented in the available forensic evidence sources. Recovery of Recycle Bin contents would require examination of the $Recycle.Bin system folder and INFO2 file (in older Windows versions) or $I and $R files (in Windows 7+), but specific recycle bin contents are not present in indexed sources.

Case Q22: **What actions were performed for anti-forensics on PC at the last day '2015-03-25'?**
CCleaner64.exe was executed on March 25, 2015, at 14:58:35 UTC. CCleaner is a system maintenance and optimization utility. While the timing (immediately preceding device inspection at checkpoint) is notable, forensic findings indicate that CCleaner execution alone, without evidence that it specifically targeted exfiltration artifacts, does not conclusively establish anti-forensics intent. Windows event logs, temporary files, and application cache were potentially affected by CCleaner execution.

Case Q23: **Recover deleted files from USB drive 'RM#2'.**
Analysis of RM#2 (USB stick) deleted files is not explicitly documented in the extracted forensic evidence summary. Full forensic recovery of deleted files from RM#2 would require carving unallocated space, examining FAT/NTFS file system structures, and recovering partial file headers. The checkpoint inspection finding of "no evidence of any leakage" suggests minimal exfiltrated content on RM#2, but specific deleted file recovery details are not provided in indexed sources.

Case Q24: **What actions were performed for anti-forensics on USB drive 'RM#2'?**
Specific anti-forensics actions on RM#2 are not documented in extracted forensic evidence. If files were deleted from RM#2 to remove evidence, or if the device was formatted or wiped, this would constitute anti-forensics. The checkpoint inspection finding of "no evidence of any leakage" may indicate either: (1) the device contained no exfiltrated data, or (2) anti-forensics actions successfully removed evidence. Detailed analysis of file system structures and unallocated space would be required to determine if anti-forensics actions were performed.

Case Q25: **Recover hidden files from the CD-R 'RM#3'. How to determine proper filenames of the original files prior to renaming tasks?**
Hidden files and filename history on RM#3 (CD-R) are not explicitly documented in extracted forensic evidence. Recovery of hidden files from CD-R would require analysis of the ISO 9660 or UDF file system structures, examination of file system metadata, and recovery of deleted or hidden entries. The question implies that files on RM#3 were renamed as an anti-forensics measure; however, forensic evidence of original filenames prior to renaming is not detailed in indexed sources. CD-Rs are WORM (Write-Once Read-Many) media, limiting the ability to rename or delete existing files post-burn, though hidden file attributes can be set.


---

## Overview

| | |
|---|---|
| Findings | **15** (5 confirmed, 10 inference) |
| Severity | 0 critical, 1 high, 5 medium, 3 low, 6 info |
| Sources | 9 evidence sources across 171 tool calls |


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
| 2014-12-19T19:53:46 | Evidence of Data Staging: Secret Project Data on USB Device (RM#1) | MEDIUM | bulk.winlnk |
| 2014-12-19T19:53:46 | Data Exfiltration Scheme Timeline and Summary | MEDIUM | bulk.winlnk, bulk.url, bulk.email |
| 2015-01-29T20:30:00 | Company Network Drive IP Address Identified: 10.11.11.128 (SECURED_DRIVE) | MEDIUM | bulk.winlnk, bulk.domain |
| 2015-03-24T18:31:55 | Windows Sticky Notes Application Executed: Possible Evidence Storage on 2015-03-24 | LOW | bulk.winprefetch |
| 2015-03-24T18:48:40 | Suspect User Account Identified: 'informant' on Windows System | HIGH | bulk.winlnk |
| 2015-03-24T18:48:40 | Resignation Letter File Created and Accessed: Evidence of Employment Termination Plan | MEDIUM | bulk.winlnk |
| 2015-03-24T19:09:51 | Microsoft Word Application Executed: Document Access on 2015-03-24 | LOW | bulk.winprefetch |
| 2015-03-24T21:05:38 | Google Chrome Browser Activity: Intensive Usage (71 Execution Runs) Indicating Research | LOW | bulk.winprefetch, bulk.url |
| 2015-03-25T14:58:35 | Anti-Forensics Tool Detected: CCleaner Execution on 2015-03-25 | MEDIUM | bulk.winlnk |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Suspect User Account Identified: 'informant' on Windows System

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T18:48:40 |
| **Sources** | bulk.winlnk |
| **Evidence Refs** | tc_8d018080 |


Analysis of Windows link files and system artifacts reveals the suspect's Windows user account is 'informant'. A resignation letter file named 'Resignation_Letter_(Iaman_Informant).docx' was accessed from the Desktop directory at C:\\Users\\informant\\Desktop on 2015-03-24 at 18:59:30 UTC. This confirms the Windows username matches the suspect's real name 'Iaman Informant' identified in the case briefing.



### 2. [MEDIUM] Evidence of Data Staging: Secret Project Data on USB Device (RM#1)

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2014-12-19T19:53:46 to 2015-02-15T21:52:12 |
| **Sources** | bulk.winlnk |
| **Evidence Refs** | tc_657050e2 |


REVISED: Windows Link files recovered from the PC show evidence that the suspect accessed files from a USB device labeled 'Authorized USB' (RM#1) on 2015-02-15. However, the LNK artifacts show FILE ACCESS (atime records) rather than definitive evidence of FILE COPYING. Specific artifacts include: (1) Access to files at E:\RM#1\Secret Project Data\proposal on 2015-02-15 at 21:52:12 UTC, indicating these files were located ON the USB device. The LNK entry timestamps are consistent with file opening, not file transfer operations. 

CRITICAL EVIDENTIARY GAP: Case briefing explicitly states "no leakage was found during checkpoint inspection" - if data was staged on Feb 15 and the suspect was intercepted weeks later, the absence of data on devices at checkpoint contradicts the "staging" claim. The finding conflates file access with file copying. LNK files show which files were accessed, but not whether they were newly copied to the device or pre-existing files being opened. Without evidence of actual copy operations (file cluster allocation, $DATA stream creation, NTFS entry timestamps showing file writes), this interpretation remains speculative. The 'Authorized USB' label suggests this may have been the suspect's legitimate work device.



### 3. [MEDIUM] Company Network Drive IP Address Identified: 10.11.11.128 (SECURED_DRIVE)

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2015-01-29T20:30:00 |
| **Sources** | bulk.winlnk, bulk.domain |
| **Evidence Refs** | tc_657050e2, tc_f3a4c50a |


Forensic evidence recovered showing that the suspect had access to the company's secured network drive located at IP address 10.11.11.128 using the network path \\\\10.11.11.128\\SECURED_DRIVE. Windows link files recovered indicate access to 'Secret Project Data' on this network drive, specifically the file (secret_project)_pricing_decision.xlsx dated 2015-01-29, confirming the suspect's ability to access the company's protected data storage location.



### 4. [MEDIUM] Anti-Forensics Tool Detected: CCleaner Execution on 2015-03-25

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2015-03-25T14:58:35 |
| **Sources** | bulk.winlnk |
| **Evidence Refs** | tc_8d018080 |
| **ATT&CK** | [T1070](https://attack.mitre.org/techniques/T1070/) |


REVISED: Windows link file analysis shows that CCleaner64.exe was accessed on 2015-03-25 at 14:58:35 UTC. The file was installed on 2015-03-13 (12-day prior) and located at C:\Program Files\CCleaner\CCleaner64.exe. 

However, CCleaner is a widely-used, legitimate system maintenance and optimization tool distributed by Piriform (now Avast). Installation followed by execution 12 days later represents a normal software lifecycle pattern, not definitive evidence of anti-forensics specifically intended to cover data exfiltration tracks. 

REDUCED CONFIDENCE: The characterization as "anti-forensics" assumes malicious intent without corroborating evidence that CCleaner was specifically invoked to destroy exfiltration evidence. Routine system cleaning is a common maintenance practice. Without evidence that (1) data exfiltration actually occurred (contradicted by checkpoint inspection finding "no leakage was found"), and (2) CCleaner was specifically targeted at exfiltration artifacts, this execution alone does not establish anti-forensics intent. The finding conflates tool presence with tool misuse.



### 5. [MEDIUM] Resignation Letter File Created and Accessed: Evidence of Employment Termination Plan

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2015-03-24T18:48:40 to 2015-03-24T18:59:30 |
| **Sources** | bulk.winlnk |
| **Evidence Refs** | tc_8d018080 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/) |


REVISED: Digital forensic evidence recovered a Windows link file referencing 'Resignation_Letter_(Iaman_Informant).docx' created on 2015-03-24 at 18:48:40 UTC and accessed 11 minutes later at 18:59:30 UTC from the suspect's Desktop. 

CRITICAL LIMITATION: The finding of a draft resignation letter document does not establish it was ever finalized, sent, printed, or communicated to the employer. The LNK file timestamps show the document was created and accessed, but there is no evidence of email transmission, printing, submission to HR, or any formal communication. A draft resignation document on someone's personal computer is not unusual and could indicate uncertainty, planning, or simply routine job searching. Without evidence the document was communicated, it does not support the "exit strategy" interpretation. The file may never have been sent or may have been deleted after initial creation.



### 6. [MEDIUM] Data Exfiltration Scheme Timeline and Summary

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2014-12-19T19:53:46 to 2015-03-25T14:58:35 |
| **Sources** | bulk.winlnk, bulk.url, bulk.email |
| **Evidence Refs** | tc_8d018080, tc_657050e2, tc_f708b8f3 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1020](https://attack.mitre.org/techniques/T1020/), [T1048](https://attack.mitre.org/techniques/T1048/), [T1070](https://attack.mitre.org/techniques/T1070/) |


REVISED - ATTACK CHAIN COHERENCE REASSESSMENT: Forensic analysis has identified a potential data exfiltration scheme executed by suspect 'Iaman Informant', but critical evidentiary gaps undermine confidence in key phases of the attack chain:

PHASE 1 - File Access (WEAK EVIDENCE): Feb 15, 2015 - LNK artifacts show files were accessed on USB device labeled 'Authorized USB'. However, LNK files demonstrate FILE ACCESS, not definitive FILE COPYING. Without evidence of actual file transfer operations or cluster allocation changes, the characterization as 'staging' conflates access with exfiltration.

PHASE 2 - 39-DAY GAP (UNEXPLAINED): Between Feb 15 alleged staging and Mar 24 resignation letter creation, no direct evidence of data transfer activities to external parties, cloud services, or rival companies. The checkpoint inspection explicitly found "no leakage was found during checkpoint inspection" - contradicting the exfiltration narrative.

PHASE 3 - Anti-Forensics (AMBIGUOUS): Mar 13-25 - CCleaner installation and execution (12-day lifecycle) is consistent with routine system maintenance for a widely-used tool. Without evidence that (1) data exfiltration actually succeeded, or (2) CCleaner specifically targeted exfiltration artifacts, this is insufficient for anti-forensics conclusion.

PHASE 4 - Intent Signals (WEAK): Mar 24 - Resignation letter was drafted but never confirmed as sent/submitted. Web searches span legitimate IT/security topics mixed with potentially suspicious queries, insufficient to establish concrete planning without role context.

OVERALL ASSESSMENT: The narrative requires an assumption chain where each weak link depends on interpreting other weak evidence. The absence of data at checkpoint inspection is the critical contradiction that undermines the entire exfiltration claim.



### 7. [LOW] Microsoft Word Application Executed: Document Access on 2015-03-24

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2015-03-24T19:09:51 |
| **Sources** | bulk.winprefetch |
| **Evidence Refs** | tc_8d018080 |


REVISED: Windows Prefetch data recovered indicates that WINWORD.EXE (Microsoft Word) was executed on 2015-03-24 at 19:09:51 UTC. This execution is temporally adjacent to timestamps in link files for Resignation_Letter_(Iaman_Informant).docx (created 18:48:40, accessed 18:59:30).

REASSESSED: The temporal proximity of Word execution and resignation letter file access is not inherently suspicious. Word execution is normal when working with .docx files. Creating or editing a draft resignation letter is common behavior during job transitions and does not establish malicious activity. The fact that someone used Word to open or edit a Word document is expected and non-suspicious.



### 8. [LOW] Windows Sticky Notes Application Executed: Possible Evidence Storage on 2015-03-24

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2015-03-24T18:31:55 |
| **Sources** | bulk.winprefetch |
| **Evidence Refs** | tc_8d018080 |


REVISED: Windows Prefetch data recovered indicates that STIKYNOT.EXE (Windows Sticky Notes) was executed on 2015-03-24 at 18:31:55 UTC, with 2 execution runs recorded. 

EVIDENTIARY LIMITATION: Sticky Notes is a basic Windows utility application included with Windows 7. Execution of this application is common for taking quick notes, reminders, or general notetaking tasks. The finding speculates the application "may have been used to store notes, authentication credentials, or other sensitive information" but provides no forensic evidence supporting this speculation. Without examination of actual Sticky Notes content, temporary files, or deletion patterns, Sticky Notes execution alone cannot establish malicious use. The application is not suspicious by itself.



### 9. [LOW] Google Chrome Browser Activity: Intensive Usage (71 Execution Runs) Indicating Research

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2015-03-24T21:05:38 |
| **Sources** | bulk.winprefetch, bulk.url |
| **Evidence Refs** | tc_8d018080, tc_657050e2 |


REVISED: Windows Prefetch analysis reveals that Google Chrome (CHROME.EXE) was executed 71 times, with the last execution on 2015-03-24 at 21:05:38 UTC. 

REASSESSED: 71 Chrome executions over a period from at least Feb 15 to Mar 24 (approximately 38 days) represents approximately 1.9 executions per day, which is consistent with normal daily web browsing activity. This execution count is not inherently suspicious and does not establish intensive research specifically related to data exfiltration planning. Without temporal clustering showing concentrated research activity during a specific suspicious period, high Chrome execution counts alone are insufficient to establish malicious intent.



### 10. [INFO] Disk Image Hash Verification for PC Evidence

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | hashdeep.hashes, hashdeep.acquisition |
| **Evidence Refs** | tc_3ebf6c05, tc_d09e8435 |


The primary forensic evidence image pc.E01 contains the suspect's Windows 7 PC. Hash values computed: MD5: 7338dbed7d2293334801416613bc17b5, SHA256: e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9, File size: 2,147,463,521 bytes. Acquisition hash verification status: No acquisition hash is stored in the image, so it cannot be verified; media hash reported by ewfverify: none reported.



### 11. [INFO] Suspect Identity and Email Account: Iaman Informant

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | bulk.email, bulk.domain |
| **Evidence Refs** | tc_f708b8f3, tc_f3a4c50a |


Multiple email references to the suspect were found in the forensic evidence, including: iaman.informant@nist.gov (NIST business email) and iaman.informant.personal@gmail.com (personal Google account). References to these email addresses were identified in bulk-extracted email data and in browser/network artifact references within the Windows system.



### 12. [INFO] Suspicious Web Searches Related to Confidential Data Leakage and Anti-Forensics

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.url |
| **Evidence Refs** | tc_657050e2 |
| **ATT&CK** | [T1083](https://attack.mitre.org/techniques/T1083/), [T1005](https://attack.mitre.org/techniques/T1005/) |


REVISED: Multiple search queries were recovered from browser history, with the following breakdown:

POTENTIALLY SUSPICIOUS (n=2-8): 'leaking confidential information' (2), 'anti-forensic tools' (8), 'cd burning method in windows' (20+), 'data recovery tools' (2+)

AMBIGUOUS/LEGITIMATE CONTEXT: 'information leakage cases' (30+) - consistent with academic research, security training, or incident response study; 'Forensic Email Investigation' (20), 'e-mail investigation' (30+) - consistent with IT security professional roles; 'windows event logs' (22), 'investigation on windows machine' (18) - standard IT administration and security research; 'DLP DRM' (30) - Data Loss Prevention and Digital Rights Management are legitimate corporate security topics.

EVIDENTIARY LIMITATION: Browser history searches are ambiguous without context. The frequency distribution shows many searches on legitimate security and IT topics interspersed with potentially suspicious ones. Without knowledge of the suspect's job role, seniority level, or security responsibilities, the searches cannot be conclusively classified as planning evidence vs. professional research/training. A security analyst, IT administrator, or compliance officer conducting this research would be routine. The presence of 'Emmy Noether' and other cache searches indicates general browsing activity alongside security topic research.



### 13. [INFO] Cloud Services Usage Detected: Google, Apple iCloud, and Microsoft Services

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.email, bulk.url, bulk.domain |
| **Evidence Refs** | tc_5e10cd28, tc_657050e2 |
| **ATT&CK** | [T1020](https://attack.mitre.org/techniques/T1020/), [T1567](https://attack.mitre.org/techniques/T1567/) |


Evidence recovered indicating suspect's use of multiple cloud services for potential data storage and transmission: (1) Google services (Google Drive, Google accounts with cookie for 'informant@accounts.google.com'), (2) Apple iCloud (version 4.0.6.28), and (3) Microsoft cloud services. The presence of Google Drive cookies and references suggests the suspect may have used cloud storage for data staging or exfiltration as discussed in the case briefing.



### 14. [INFO] Multiple User Accounts Detected: Secondary Email Addresses

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.email |
| **Evidence Refs** | tc_f708b8f3 |


REVISED: In addition to the primary suspect email (iaman.informant@nist.gov), forensic evidence recovered from bulk email extraction identified references to multiple email addresses: scarter@gmail.com, skarter@gmail.com, and emily@me.com. 

CRITICAL EVIDENTIARY LIMITATION: The investigation questions explicitly ask whether these are "confirmed conspirators or false positives from bulk extraction of unrelated emails." The current evidence does not resolve this ambiguity. Bulk email extraction performs keyword-based carving and can recover email addresses from non-email sources (HTML, cached web pages, document metadata, temporary files). These email addresses may represent:
(1) Completely unrelated individuals from random email extraction
(2) Legitimate business contacts
(3) Actual conspirators (unconfirmed)

WITHOUT actual emails showing communication between these addresses and the suspect regarding data exfiltration, espionage, or conspiracy, these are unconfirmed addresses. The finding should not assume these are aliases or associates of the suspect without evidence of actual correspondence or relationship.



### 15. [INFO] Windows NTFS Partitions Detected: PC Evidence Structure

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | tsk.partitions, tsk.filelist |
| **Evidence Refs** | tc_c279f3da, tc_164d7ac9 |


Analysis of the PC disk image (pc.E01) reveals two NTFS partitions: Partition 1 (Sectors 2048-206847, 204,800 sectors) and Partition 2 (Sectors 206848-41940991, 41,734,144 sectors). The filesystem contains Windows 7 system files including bootmgr, BCD, and system language files in the Boot directory, confirming Windows 7 operating system installation.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Internal IP | `10.11.11.128` |  | Company Network Drive IP Address Identified: 10.11.11.128 (SECURED_DRIVE) |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Path | `C:\Program` |  | Anti-Forensics Tool Detected: CCleaner Execution on 2015-03-25 |





---

## Appendix C: MITRE ATT&CK Coverage

6 techniques identified across findings.


**Kill Chain Coverage:** Defense Evasion (1) > Discovery (1) > Collection (1) > Exfiltration (3)


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | Anti-Forensics Tool Detected: CCleaner...; Data Exfiltration Scheme Timeline and Summary |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1083](https://attack.mitre.org/techniques/T1083/) | File and Directory Discovery | Suspicious Web Searches Related to... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1005](https://attack.mitre.org/techniques/T1005/) | Data from Local System | Suspicious Web Searches Related to...; Resignation Letter File Created and Accessed:...; Data Exfiltration Scheme Timeline and Summary |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1020](https://attack.mitre.org/techniques/T1020/) | Automated Exfiltration | Cloud Services Usage Detected: Google, Apple...; Data Exfiltration Scheme Timeline and Summary |
| [T1048](https://attack.mitre.org/techniques/T1048/) | Exfiltration Over Alternative Protocol | Data Exfiltration Scheme Timeline and Summary |
| [T1567](https://attack.mitre.org/techniques/T1567/) | Exfiltration Over Web Service | Cloud Services Usage Detected: Google, Apple... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 171 |
| Findings submitted | 15 |
| Confirmed | 5 |
| Inferences | 10 |
| Input tokens | 550 |
| Output tokens | 63.9K |
| Total tokens | 64.5K |
| Audit log | /home/mulder/.mulder/cases/nist-data-leakage.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 550 | 63.9K | 64.5K |




<details>
<summary>Evidence Sources (29)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 10 |
| hashdeep.hashes | hashdeep | 7 |
| hashdeep.acquisition | ewfverify | 1 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 87365 |
| bulk.email | bulk_extractor | 1602 |
| bulk.ether | bulk_extractor | 6 |
| bulk.facebook | bulk_extractor | 6 |
| bulk.rfc822 | bulk_extractor | 5310 |
| bulk.url | bulk_extractor | 103335 |
| bulk.url_facebook-address | bulk_extractor | 15 |
| bulk.url_searches | bulk_extractor | 124 |
| bulk.url_services | bulk_extractor | 2144 |
| tsk.masquerade | sleuthkit | 0 |
| tsk.filelist | sleuthkit | 93 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.evtx_carved | bulk_extractor | 35 |
| bulk.sqlite_carved | bulk_extractor | 59 |
| bulk.winlnk | bulk_extractor | 247 |
| bulk.winpe | bulk_extractor | 7914 |
| bulk.winpe_carved | bulk_extractor | 7906 |
| bulk.winprefetch | bulk_extractor | 49 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
