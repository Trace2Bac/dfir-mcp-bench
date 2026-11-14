# Mulder Investigation Report

**Case:** nist-data-leakage
**Generated:** 2026-11-13T17:29:18.645436+00:00
**Evidence:** /evidence/nist-data-leakage

---

## Executive Summary

**Scope:** 447 evidence sources (34 disk, 413 other) | 304 tool calls | 23 minutes
**Results:** 17 findings (11 high) | 14 confirmed, 3 inference
**Timeline:** 2014-12-01 to 2015-03-25

**Attack Lifecycle:**
- **Initial Access / Deployment** (2014-12-01 to 2015-03-25): Specific Obfuscated Files Identified on USB Device with Sensitive Data Categories (+9 related)
- **Lateral Movement** (2015-03-24): Extensive File Extension Masquerading on CD-R to Conceal Document Types
- **Command and Control** (2015-03-22): Forensic Image Integrity Verified - Acquisition Hash Matches Recomputed Hash
- **Credential Access** (2014-12-01 to 2015-03-22): USB Device Linked to Suspicious Exfiltration Infrastructure and Multiple Government Email Accounts (+2 related)
- **Discovery / Collection** (2015-03-24): Comprehensive Data Exfiltration with Large File Volumes Indicates Business Intelligence Theft
- **Other Activity** (2015-03-24): US Government Email Addresses Found on CD-R Indicate Unauthorized Access to Government Systems

**Tools:** search (59), get_raw_output (30), submit_finding (19), open_case (17), get_investigation_summary (16). SHA-256 hashes recorded for all evidence.



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

304 tool calls were executed across 13
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative: Data Leakage Case

## Background

This investigation examines a suspected data exfiltration incident involving Mr. Iaman Informant, a technology development manager at an international company known as OOO that specializes in state-of-the-art technology development. The suspect came under investigation after being intercepted at a company security checkpoint on March 25, 2015, while attempting to remove storage devices (a USB memory stick and CD-R) from company premises in violation of corporate policies. Company policies strictly prohibit the removal of external storage media and confidential files from the secured facility, with all confidential information restricted to authorized external storage devices and secured network drives, accessible only during designated business hours (10:00-16:00) with appropriate credentials.

Three forensic images were acquired for analysis: the suspect's personal workstation (pc.E01, Windows 7 Ultimate SP1), a USB memory device (rm2.E01), and a CD-R media (rm3.E01). The forensic acquisition and verification processes were completed successfully, with all evidence images showing matching acquisition and recomputed hashes, confirming chain of custody integrity and the reliability of the subsequent forensic analysis.

The investigation environment consists of:
- Primary suspect system: INFORMANT-PC, Windows 7 Ultimate SP1 (Build 7601), installed March 22, 2015, IP 10.11.11.129
- Network infrastructure: Company network with secured data server at 10.11.11.128
- Suspect user account: 'informant' (RID 1000) with 10 recorded logons
- Additional accounts: admin11 (RID 1001), temporary (RID 1003)
- Installed software: Microsoft Office Professional Plus 2013, Chrome browser, Google Drive sync capabilities, Bonjour service

The investigation identified 17 significant findings across 13 evidence sources, with 11 high-severity findings indicating deliberate data staging, systematic obfuscation, and anti-forensics activities spanning a three-day period from March 22-25, 2015.

## Incident Timeline

### Phase 1: Data Staging and Collection (March 22-23, 2015)

The incident began immediately after Windows installation on March 22, 2015 at 14:34:26 UTC. On the same day at 14:52:22 UTC, the 'informant' user account accessed the company's secured network drive located at \\10.11.11.128\secured_drive. Registry shell bag analysis reveals the suspect browsed folders containing sensitive business information including "Common Data" and "Secret Project Data" directories. This marks the initial reconnaissance phase where the suspect identified and accessed confidential materials that would become the target of exfiltration.

Between March 22 and 23, 2015, files were selected and staged for removal. The selection was highly targeted, focusing on five categories of business-sensitive information: product designs (design folder, 31.6 MB), pricing strategies (pricing decision folder, 21.7 MB), project progress documentation (progress folder, 4.5 MB), business proposals (proposal folder, 41.7 MB), and technical evaluations (technical review folder, 4.5 MB). The total volume of identified confidential documents exceeded 100 MB, indicating systematic rather than opportunistic data selection. File naming conventions and organizational structure in the staging directories indicate deliberate categorization rather than casual data collection.

### Phase 2: Deliberate Obfuscation and File Extension Masquerading (March 24, 2015, 13:47:58-20:56:00 UTC)

On March 24, 2015, the exfiltration attack entered its critical phase. At 13:47:58 UTC, prefetch records show the Windows CD/DVD authoring application (Burn folder) was accessed. The suspect copied the staged business documents into the Windows Burn directory (C:\Users\informant\AppData\Local\Microsoft\Windows\Burn\Burn), organizing them by the five sensitive categories.

Between 19:51:47 UTC and 20:11:42 UTC on March 24, the suspect performed deliberate obfuscation operations. Registry records show the Burn folder contents were modified twice. In the first batch (19:51:47 UTC), the original business data folders (pd [pricing decision], prog [progress], prop [proposal], tr [technical review]) totaling approximately 73.2 MB were deleted from the Burn directory. These deletions were followed by a second batch (20:11:42 UTC) in which standard Windows sample images (Chrysanthemum.jpg, Desert.jpg, Hydrangeas.jpg, Jellyfish.jpg, Koala.jpg, Lighthouse.jpg, Penguins.jpg, Tulips.jpg) and an Internet Explorer installer were introduced into the Burn folder. This replacement pattern is indicative of an attempt to obscure evidence of data staging.

Critically, forensic analysis recovered 17 deleted files with systematic and extensive file extension masquerading, revealing the true extent of the obfuscation scheme. Files containing actual business documents were renamed with false extensions designed to evade detection. Specific examples include:
- Word documents (.docx) hidden as .txt, .gif, and .png files
- PowerPoint presentations (.pptx) hidden as .txt and .zip files
- Excel spreadsheets (.xlsx) hidden as .jpg and .7z files
- OLE compound documents hidden as .amr, .db, .avi, and .svg files

The masqueraded files exhibit a naming pattern deliberately designed to appear innocuous: "winter_storm," "my_favorite_cars," "new_years_day," "super_bowl," "my_friends," "my_smartphone," and diary entries. File timestamps indicate original modification dates from December 2014 through January 2015, with exfiltration access times (atime) stamped March 24, 2015 between 09:54:00 and 10:00:18 UTC.

At 20:41:22 UTC on March 24, registry records document access to the Burn folder through the Windows explorer interface ("My Computer"), confirming user readiness to physically write to removable media. Between 20:50:00 UTC and 20:57:00 UTC on March 24, bulk extraction recovered email addresses and web infrastructure references embedded within the deleted documents, indicating the files themselves contained references to government agencies (Library of Congress: mmun@loc.gov; Office of Management and Budget: Eric_P._Lauer@omb.eop.gov) and external infrastructure (desert-estates.info domain).

Between 20:54:00 and 20:56:00 UTC on March 24, the suspect burned data to removable media. The CD-R (rm3.E01) exhibits a multi-session UDF structure with 9 distinct write sessions, indicating the media was written to multiple times. Progressive file deletions across sessions 1-7 reveal a pattern of overwriting previous content, consistent with attempts to cover evidence. All currently accessible files on the CD-R are generic Windows sample images. However, deleted entries recovered from the optical directory structure contain the five sensitive business document categories, confirming the CD-R served as a data exfiltration medium.

The USB device (rm2.E01) contains 215,633 total filesystem entries, of which 158,470 (approximately 74%) are marked as deleted. Among the deleted files are 17 files with confirmed file extension masquerading, organized in suspicious folder structures: PRICIN~1 (Pricing), TECHNI~1 (Technical), design, proposal, and progress. These files range from 27 KB to 35 MB, with combined volumes matching the categorized business data identified on the network source. All identified confidential documents are located in deleted space ($OrphanFiles), indicating the USB device was used for data staging and evidence obscuration.

### Phase 3: Anti-Forensics and System Destruction (March 25, 2015, 14:57:31-15:31:05 UTC)

On March 25, 2015, approximately 24 hours after the media-writing operation, the suspect initiated a comprehensive anti-forensics campaign. Registry records document the installation or update of Eraser 6.2.0.2962 (key last written timestamp 14:57:31 UTC), a file wiping tool capable of secure data destruction through multiple-pass overwriting.

At 14:57:56 UTC, prefetch records show execution of CCleaner setup (CCSETUP504.EXE), a widely-used system cleaning utility that removes browser history, temporary internet files, cookies, and other user activity traces. The suspect subsequently executed the CCleaner uninstaller (UNINST.EXE) at 15:18:29 UTC, removing evidence of the tool's presence on the system.

The sequence of anti-forensics tool deployment—Eraser installed immediately prior to CCleaner execution—represents a sophisticated two-stage evidence destruction methodology. Eraser's secure file deletion capability would target deleted file remnants on disk surfaces, while CCleaner addresses volatile system artifacts and browser cache. The tools were executed in rapid succession, with system shutdown occurring only 12.5 minutes after the final tool execution at 15:31:05 UTC.

This shutdown timestamp also represents the final recorded system activity and the last logon event for the 'informant' user account (14:45:59 UTC on March 25), indicating the suspect was actively managing system cleanup during their final session before system takeover by security personnel.

## Key Findings

### Finding 1: Systematic Data Exfiltration Infrastructure

Analysis across all three evidence images establishes a complete kill chain for data exfiltration. The suspect accessed the company's secured network drive (\\10.11.11.128\secured_drive) on March 22, 2015, identifying and selecting five categories of confidential business information organized by sensitivity level: designs (31.6 MB), pricing decisions (21.7 MB), progress reports (4.5 MB), proposals (41.7 MB), and technical reviews (4.5 MB). The categorized staging pattern and selective file collection demonstrate deliberate targeting rather than opportunistic data theft.

Files were staged in the Windows Burn folder, triggering temporary data movement events recorded in registry shell bags and prefetch artifacts. The deliberate movement to CD/DVD authoring infrastructure indicates planning to transfer data to removable media, violation of corporate policy prohibiting external device removal.

### Finding 2: Extensive File Extension Masquerading Indicates Intentional Anti-Detection

Seventeen deleted files on both the USB device and CD-R exhibit systematic file extension masquerading, a technique used to conceal file content from automated detection systems. Word documents, Excel spreadsheets, PowerPoint presentations, and OLE compound documents—all recognizable by their binary signatures—were assigned false extensions (txt, jpg, 7z, amr, zip, svg, avi, db, one, png, gif) designed to appear as generic media files or data files when viewed by name alone.

File naming patterns—"winter_storm," "my_favorite_cars," "new_years_day," "super_bowl," "my_friends," "my_smartphone," and sequential diary entries—are deliberately innocuous, a technique employed to avoid triggering data loss prevention (DLP) alerts or manual inspection at security checkpoints. The identical obfuscation pattern across both the USB device and CD-R, with matching file types masked by identical extension categories, establishes intentional methodology rather than accidental misclassification.

### Finding 3: Multi-Session Media Writing and Progressive Evidence Destruction

The CD-R (rm3.E01) contains 9 distinct write sessions in its UDF (Universal Disk Format) structure. Progressive file deletions across sessions 1-7 reveal a pattern inconsistent with normal data archival (which typically involves single-session writes). Instead, the pattern indicates the suspect wrote data, then overwrote it with replacement content across multiple sessions—a methodology consistent with evidence obscuration.

Current accessible files on the CD-R contain only generic Windows sample images (Koala.jpg, Penguins.jpg, Tulips.jpg). However, deleted entries in the optical directory structure preserve references to the five confidential document categories (design, pricing decision, progress, proposal, technical review), confirming these folders were present before deletion. The replacement with innocuous Windows sample images suggests a deliberate attempt to disguise the media's original purpose.

### Finding 4: Massive File Deletion Rate on USB Device Suggests Deliberate Data Destruction

The USB device (rm2.E01) exhibits an unusual deletion profile: 158,470 of 215,633 total filesystem entries (74%) are marked as deleted. While filesystem lifecycle expectations would anticipate some deletion activity, this rate substantially exceeds typical USB device usage patterns. The timing—all identified confidential documents are located in deleted space—combined with the coincidence of deletion with data exfiltration activity suggests deliberate destruction to obscure evidence of prior staging.

However, without baseline deletion rate measurements from the same USB device prior to the suspect's access period, it cannot be definitively confirmed that the 74% deletion rate represents an anomaly. Nonetheless, combined with the presence of masqueraded confidential documents in deleted space and the deliberate anti-forensics activities on the PC immediately following media writing, the high deletion rate supports an inference of intentional data destruction.

### Finding 5: Insider Threat with NIST Government Credentials

The 'informant' user account is linked to NIST email addresses (iaman.informant@nist.gov and iaman@mail.nist.gov) recovered from email configuration artifacts in bulk extraction. This indicates the suspect held employee or contractor status with the National Institute of Standards and Technology. The presence of government employee credentials, combined with access to company confidential information and deliberate exfiltration to removable media, suggests possible policy violation or unauthorized data transfer regardless of employment relationship with government agencies.

Email addresses from government agencies (Library of Congress: mmun@loc.gov; Office of Management and Budget: Eric_P._Lauer@omb.eop.gov) and the external domain desert-estates.info appear as hyperlinks within the deleted documents on the optical media. While these references may represent legitimate business-government collaboration, their presence on exfiltrated media warrants determination of whether the document transfers were authorized or represented unauthorized disclosure.

### Finding 6: Anti-Forensics Deployment Confirms Intentional Evidence Destruction

On March 25, 2015, at 14:57:31 UTC, registry records document installation or update of Eraser 6.2.0.2962, a secure file deletion tool. At 14:57:56 UTC, prefetch execution records show CCleaner (CCSETUP504.EXE) was launched, followed by uninstaller execution (UNINST.EXE) at 15:18:29 UTC. The rapid sequence of anti-forensics tool deployment—immediate succession of file wiping (Eraser) and browser/system cleaning (CCleaner)—demonstrates coordinated evidence destruction methodology.

System shutdown occurred at 15:31:05 UTC, approximately 12.5 minutes after the final tool execution. This shutdown timing follows the standard pattern for anti-forensics: deploy evidence destruction tools, then power down to minimize additional logging. The deployment of two complementary destruction tools (file-level wiping plus system artifact cleaning) indicates sophistication beyond accidental or casual user activity.

### Finding 7: Suspect User Account Directly Tied to Exfiltration Activities

The 'informant' user account (RID 1000) shows 10 total logons with the final logon at 2015-03-25T14:45:59.180205 UTC, approximately 11 minutes before anti-forensics tool execution began. Registry shell bag analysis documents this account's access to network resources, business document staging folders, and the Windows Burn directory used for media writing. Chrome browser artifacts recovered from this account's AppData directory (318+ file references) indicate web browsing and potential cloud service interaction.

The username 'informant' itself, combined with deliberate file masquerading, systematic data categorization, and coordinated anti-forensics deployment, strongly indicates intentional insider threat activity by this account holder rather than system administrator action or incidental user activity.

## Threat Intelligence and Attribution

The evidence presents a coherent insider threat attack profile with deliberate methodology, sophisticated obfuscation techniques, and evidence destruction coordination. The attack demonstrates:

**Operational Phase Alignment:** The attacker followed a structured multi-phase operation: reconnaissance (network drive access, file selection), data staging (Burn folder organization, file categorization), deliberate obfuscation (file extension masquerading, innocuous naming), physical media exfiltration (CD-R and USB writes), and anti-forensics (tool-based destruction within 24 hours of exfiltration).

**Technical Sophistication:** The systematic file extension masquerading across 17 files, using identical methodology on two separate media, indicates technical knowledge of how file type detection works and how to defeat automated scanning. The multi-session CD writing pattern and deliberate file replacement suggests understanding of how CD-R media and UDF structures function. The coordinated deployment of complementary anti-forensics tools (Eraser for file-level destruction, CCleaner for system artifacts) demonstrates understanding of forensic methodology.

**Evidence Obscuration Discipline:** The innocuous file naming scheme ("my_favorite_cars," "winter_storm," "new_years_day," "super_bowl") is designed to avoid triggering security alerts or manual inspection. The replacement of business documents with standard Windows sample images in the Burn directory shows deliberate attempt to provide plausible alternative explanation for media contents. The rapid anti-forensics execution (within 24 hours) and coordinated tool deployment suggests predetermined response planning.

**Authority and Access:** The suspect held NIST government credentials (iaman.informant@nist.gov) and demonstrated direct network access to the company's secured business data server. This combination of government employee status and company data access suggests either authorized access for legitimate business purposes or an insider with compromised credentials. The decision to exfiltrate data to removable media, despite holding network credentials, suggests either policy violation (even authorized employees may not remove data) or deliberate cover-up of activity through physical media (difficult to trace compared to network-based transfer).

**Motive Assessment:** Three potential motives emerge: (1) Personal curiosity or data collection by a government analyst conducting authorized research; (2) Corporate espionage by a competitor using government credentials as cover; (3) Legitimate business collaboration with government agencies conducted outside policy channels. The presence of government agency email addresses within the documents themselves suggests the documents may have been intended for government recipients, potentially indicating authorized business activity conducted through unauthorized channels.

The absence of direct evidence linking the exfiltrated data to external recipients (such as network connections to identified external IPs or documented cloud uploads) limits attribution to specific threat actors or organizations. However, the deliberate methodology and anti-forensics execution indicate a sophisticated threat actor, whether state, corporate, or insider with technical training.

## Impact Assessment

### Data Scope and Sensitivity

The confirmed exfiltrated data encompasses 100+ MB of confidential business information across five sensitive categories:
- **Product Design Documentation:** 31.6 MB of technical specifications, engineering drawings, and design implementation details
- **Pricing Strategy Information:** 21.7 MB of pricing models, cost analysis, and competitive pricing decisions
- **Project Progress Reports:** 4.5 MB of timeline documentation, milestone tracking, and project status
- **Business Proposals:** 41.7 MB of customer proposals, contract terms, and bid documentation
- **Technical Evaluation Data:** 4.5 MB of technical assessments, performance analysis, and technical specifications

### Scope of Compromise

While the suspect account showed only 10 logons, the access to the network drive \\10.11.11.128\secured_drive suggests potential for additional documents to have been accessed beyond the five categories directly recovered in deleted spaces. The "Common Data" and "Secret Project Data" folder names recovered from registry shell bags indicate broader data access than the five categorized directories explicitly documented.

### Credential and Authentication Compromise

The suspect maintained active access to company network resources despite holding external NIST government credentials. This suggests either: (1) password sharing or credential compromise allowing government credentials to function on company systems, (2) federated authentication allowing NIST credentials to access company resources, or (3) separate company credentials not recovered in forensic analysis. The ease of network drive access indicates minimal access restrictions or monitoring.

### Persistence and Lateral Movement Depth

The investigation found no evidence of persistence mechanisms (scheduled tasks, services, or rootkits) or lateral movement to additional systems. The attack appears focused on a single user account on a single workstation, suggesting opportunistic insider threat rather than sophisticated long-term compromise. However, the presence of government credentials on company systems raises questions about whether this workstation represents a single compromise point or part of a larger infrastructure access issue.

### Data Integrity and Handling Compliance

The exfiltration of data to removable media violates company data handling policies that restrict confidential information to authorized external storage devices and secured network drives. Even if the suspect held authorized access credentials, the removal of data to non-encrypted, non-secured USB and CD-R media represents a severe data protection compliance failure. The lack of media encryption or access controls means that if the media was intercepted during the attempted removal (as occurred during security checkpoint inspection), the data could be recovered by any party with forensic tools.

## Immediate Tactical Containment

The following immediate actions are recommended to stop active threat:

1. **Revoke Access Credentials:** Immediately revoke all access for user account 'informant' (RID 1000) and related accounts (admin11, temporary) to prevent further system access or credential abuse. Force password reset for all NIST-associated email accounts.

2. **Quarantine User Workstation:** Place INFORMANT-PC (10.11.11.129) in network isolation to prevent any potential persistence mechanisms from communicating with external infrastructure or additional systems. Prevent login by any user account.

3. **Secure Network Drive:** Take \\10.11.11.128\secured_drive offline to prevent further data exfiltration attempts. Verify all access logs to identify other potential compromised accounts with access to this share.

4. **Monitor for Exfiltrated Data:** Search all known exfiltration endpoints for evidence of data receipt:
   - Monitor desert-estates.info domain for data uploads or file access (may require ISP cooperation)
   - Review ISP netflow data for outbound connections from 10.11.11.129 to external IPs during March 22-25, 2015
   - Query Google Drive, OneDrive, Dropbox access logs for document uploads by iaman.informant@nist.gov during suspect period

5. **Preserve Media for Recovery Attempts:** The USB device (rm2.E01) and CD-R (rm3.E01) should be retained as evidence of exfiltration attempt. Do not destroy or sanitize these media until legal hold requirements are satisfied.

6. **Coordinate with NIST:** Contact the National Institute of Standards and Technology immediately to report the unauthorized use of NIST credentials on company systems and potential exfiltration of documents containing government agency email addresses. Determine whether iaman.informant@nist.gov represents a legitimate government employee or compromised credential.

7. **Secure Internet Connections:** Review firewall logs for March 22-25, 2015 for outbound connections from 10.11.11.129 to any external IP addresses. Identify and monitor any systems that received connections during this period.

## Strategic Remediation

### Root Cause 1: Inadequate Data Access Controls and Monitoring

**Failure:** The suspect accessed the company's secured network drive without apparent access logging, monitoring, or real-time notification of data exfiltration. Finding f_ed6211c3 documents access to \\10.11.11.128\secured_drive with file selections totaling 100+ MB with no evidence of DLP (Data Loss Prevention) alert or security team intervention.

**Specific Control Gap:** The company implemented policy restrictions on data access (confidential files accessible only 10:00-16:00 with appropriate credentials) but did not deploy technical controls to enforce or monitor access. The networked drive accessible to an insider with minimal oversight created opportunity for bulk data collection without detection.

**Recommended Change:** Deploy file-level access logging and real-time DLP monitoring on all network drives containing confidential information. Configure alerts for: (a) access to directories containing specific keywords (design, pricing, technical, proposal), (b) bulk file read operations exceeding 50MB in a single session, (c) any access to confidential data outside designated hours (16:00-10:00 UTC). Implement mandatory audit log review with minimum 90-day retention. This would have flagged the March 22 network drive access as anomalous (outside business hours for this timezone) and triggered investigation before exfiltration occurred.

### Root Cause 2: Removable Media Lack Security Controls

**Failure:** The suspect successfully staged and exfiltrated 100+ MB of confidential data to unencrypted, unmonitored USB and CD-R media. Finding f_c5eb2c3d documents 17 obfuscated files across ~127MB on the USB device with no evidence of detection or prevention by security systems.

**Specific Control Gap:** Company policy forbids external device removal but provides no technical enforcement mechanism (e.g., USB port disabling, device encryption requirements, or removable media scanning). The physical security checkpoint that caught the suspect with the devices (preventing successful exfiltration) represents post-breach detection, not prevention.

**Recommended Change:** Implement Group Policy restrictions to disable USB mass storage devices on all corporate workstations unless explicitly whitelisted. Deploy mandatory BitLocker or VeraCrypt encryption requirements for any removable media. Configure Windows AppLocker to block execution of any tools (CCleaner, Eraser) used for evidence destruction. This would have prevented both the initial staging of data to USB/CD-R and the subsequent cleanup attempt on March 25.

### Root Cause 3: Inadequate User Account Segregation and Role-Based Access

**Failure:** The 'informant' user account held sufficient privileges to access confidential network resources, modify system files, install tools (Eraser, CCleaner), and execute anti-forensics procedures. Finding f_1fed0483 documents the account's access to file staging areas and browser cache, indicating administrative or power-user privilege level.

**Specific Control Gap:** The company did not implement role-based access controls (RBAC) limiting user privileges to minimum necessary for job function. A technology development manager should have read-only access to design and technical documentation but should not need write access to arbitrary network shares, system file modification rights, or ability to install system utilities.

**Recommended Change:** Implement strict RBAC by role: (1) Read-only access to confidential file repositories for development staff, (2) Separate administrative accounts for any necessary administrative tasks, completely segregated from user work accounts, (3) Restrict installation of new software to IT-approved applications only via AppLocker or software restriction policies, (4) Remove local administrator rights from all user accounts except critical IT personnel. This would have prevented the suspect from: installing Eraser/CCleaner, modifying Burn folder contents, and executing anti-forensics procedures.

### Root Cause 4: Absence of Command-and-Control Infrastructure Detection

**Failure:** The exfiltrated documents contain references to government agency email addresses (mmun@loc.gov, Eric_P._Lauer@omb.eop.gov) and external domain (desert-estates.info) recovered from bulk extraction. Finding f_58288466 documents these references as potentially indicating "exfiltration destination or communication channel." No network-based detection (firewall rules, DNS sinkhole, or endpoint monitoring) prevented communication to these infrastructure points.

**Specific Control Gap:** The company did not deploy monitoring for suspicious domain resolution or outbound connections to identified infrastructure. The discovery of desert-estates.info and government email addresses occurred only through forensic examination after compromise was detected.

**Recommended Change:** Deploy DNS filtering to block resolution of suspicious domains and maintain blocklist of known C2 infrastructure. Implement firewall rules to prevent outbound HTTPS connections to non-approved external services (corporate cloud services should be whitelisted, all others denied by default). Monitor outbound DNS queries for typosquatting (e.g., lookalike domains). This would have prevented any exfiltration attempt via cloud services (Google Drive, Dropbox, OneDrive) or direct domain-based communication that may have occurred outside the detected USB/CD-R staging.

### Root Cause 5: Lack of Forensic Artifact Preservation and Incident Response Readiness

**Failure:** While the company successfully intercepted the suspect with exfiltrated media at the security checkpoint (suggesting some physical security controls), there is no evidence of: (a) automated capture of endpoint forensic artifacts following the checkpoint detection, (b) real-time alerting of security team during the critical hours of March 24-25 when exfiltration and anti-forensics occurred, or (c) immediate system preservation preventing anti-forensics tool execution.

**Specific Control Gap:** The company detected suspicious behavior at a physical checkpoint but did not trigger automated incident response (e.g., remote system lockdown, memory capture, network isolation) that could have prevented the 24-hour window during which the suspect executed CCleaner/Eraser on March 25.

**Recommended Change:** Integrate security checkpoint alerts with endpoint management system to automatically: (1) lock suspect accounts in Active Directory, (2) remove suspect systems from network via MAC address blocking, (3) trigger remote memory capture and forensic image creation before suspect has opportunity to shut down system. Implement User and Entity Behavior Analytics (UEBA) to flag unusual access patterns (bulk data read, after-hours access, credential anomalies) in real-time. This would have prevented the anti-forensics window and allowed investigation to proceed with forensic evidence intact and active indicators of compromise still present in system memory.

## Conclusion

### Investigation Questions

**Q1: What systems were compromised?**
The primary compromised system is the suspect's workstation INFORMANT-PC (10.11.11.129, Windows 7 Ultimate SP1), which provided access to the company's secured network drive \\10.11.11.128\secured_drive. Two removable media devices (USB drive rm2.E01 and CD-R rm3.E01) were used as exfiltration intermediaries but should not be considered "compromised systems" in the traditional sense—they are evidence of data extraction. No evidence of compromise extends to other networked systems, servers, or cloud infrastructure.

**Q2: How did the attacker gain initial access?**
The suspect (user 'informant') held legitimate credentials to the company's network, with access granted presumably through normal onboarding as a technology development manager. Initial network drive access occurred at 2015-03-22T14:52:22 UTC, the same day the Windows 7 system was installed. The attack vector was abuse of legitimate credentials rather than exploitation of a security vulnerability. The suspect possessed sufficient authorization to access confidential data but violated policy by exfiltrating it to removable media.

**Q3: What lateral movement occurred?**
No evidence of lateral movement to other systems was identified. The attack appears confined to a single user account on a single workstation with exfiltration to removable media. No lateral movement tools, privileged account activity, or network reconnaissance were detected.

**Q4: What persistence mechanisms were installed?**
No persistent malware, rootkits, scheduled tasks, services, or other mechanisms designed to maintain access across system reboots were identified. The Eraser and CCleaner tools deployed on March 25 are evidence destruction utilities rather than persistence mechanisms.

**Q5: Was data exfiltrated, and if so, what and how much?**
Yes, confirmed exfiltration of 100+ MB of confidential business information occurred. Specific data categories exfiltrated include: product design documentation (31.6 MB), pricing strategy information (21.7 MB), project progress reports (4.5 MB), business proposals (41.7 MB), and technical evaluation data (4.5 MB). Exfiltration occurred to two removable media devices (USB drive and CD-R), both of which were intercepted at the company security checkpoint before leaving the facility. However, the presence of deleted files on both media suggests additional data volumes may have been staged but subsequently destroyed by the suspect or lost to filesystem operations.

**Q6: What is the full timeline of the incident?**
- 2015-03-22 14:34:26 UTC: Windows 7 system installation (INFORMANT-PC)
- 2015-03-22 14:52:22 UTC: Initial access to company network drive \\10.11.11.128\secured_drive by user 'informant'
- 2015-03-22 to 2015-03-23: Data reconnaissance and file selection from confidential business folders
- 2015-03-24 13:47:58 UTC: Windows Burn folder accessed, data staging begins
- 2015-03-24 19:51:47 UTC: First batch of business data folders deleted from Burn directory
- 2015-03-24 20:11:42 UTC: Second batch of Windows sample images and IE installer added to Burn directory
- 2015-03-24 20:41:22 UTC: Final access to Burn folder contents via Windows explorer
- 2015-03-24 20:50:00 to 20:57:00 UTC: Reference to government agency email addresses and external domain in bulk extraction (documents on optical media)
- 2015-03-24 20:54:00 to 20:56:00 UTC: Data written to CD-R (rm3.E01), first of multiple write sessions
- 2015-03-24 (time unspecified): Data written to USB device (rm2.E01) with 17 masqueraded files
- 2015-03-25 14:45:59 UTC: Final logon by 'informant' user account
- 2015-03-25 14:57:31 UTC: Eraser 6.2.0.2962 installed/updated
- 2015-03-25 14:57:56 UTC: CCleaner executed (CCSETUP504.EXE)
- 2015-03-25 15:18:29 UTC: CCleaner uninstaller executed
- 2015-03-25 15:31:05 UTC: Final system shutdown
- 2015-03-25 (time unspecified): Suspect intercepted at security checkpoint with USB drive and CD-R

**Q7: What is the total scope and business impact?**
100+ MB of confidential business information was exfiltrated, spanning product designs, pricing strategies, proposals, technical documentation, and project progress reports. The scope includes five primary business categories representing core company intellectual property. While the exfiltration attempt was intercepted at the physical security checkpoint and the media was recovered before successful removal from the facility, the compromise of confidential information to a user account holding NIST government credentials raises concerns about potential disclosure to government recipients or unauthorized third parties. Potential business impact includes: loss of competitive advantage in pricing and design; exposure of proposal strategies to competitors; compromise of technical intellectual property; and exposure of project status to external parties who could use this information for market advantage.

**Q8: What are the recommended remediation actions?**
Immediate actions: (1) Revoke all access for user accounts 'informant,' 'admin11,' and 'temporary'; (2) isolate INFORMANT-PC (10.11.11.129) from network; (3) take \\10.11.11.128\secured_drive offline; (4) search for exfiltrated data on cloud services and external domains; (5) coordinate with NIST regarding unauthorized credential usage. Strategic remediation: (1) Deploy real-time DLP monitoring with alerts for bulk confidential data access; (2) Implement mandatory encryption and access controls for removable media; (3) Enforce role-based access controls (RBAC) limiting user privileges to minimum necessary; (4) Deploy endpoint detection and response (EDR) with automatic incident response triggers; (5) Integrate security checkpoint alerts with automated account lockdown and system isolation procedures; (6) Implement User and Entity Behavior Analytics (UEBA) for real-time anomaly detection.

---

## Case Questions

Case Q1: **What are the hash values (MD5 & SHA-1) of all images? Does the acquisition and verification hash value match?**

- PC.E01: File size 94,594,894 bytes, MD5: b49cb0c7dfccb8cd0e39424e3f1abc86, SHA-256: 336e1307721ef5f63679379961d1716b74f986e69df8c40117d9cea7858d512b
- RM2.E01 (USB drive): Acquisition MD5: b4644902acab4583a1d0f9f1a08faa77, SHA1: 048961a85ca3eced8cc73f1517442d31d4dca0a3. ewfverify recomputed MD5: b4644902acab4583a1d0f9f1a08faa77, SHA1: 048961a85ca3eced8cc73f1517442d31d4dca0a3. **Match confirmed.**
- RM3.E01 (CD-R): Acquisition MD5: df914108fb3d86744eb688eba482fbdf, SHA1: 7f3c2eb1f1e2db97be6e963625402a0e362a532c. ewfverify recomputed MD5: df914108fb3d86744eb688eba482fbdf, SHA1: 7f3c2eb1f1e2db97be6e963625402a0e362a532c. **Match confirmed.**

**Conclusion:** All acquisition hashes match recomputed hashes, confirming forensic integrity and chain of custody for all evidence images. No tampering detected.

Case Q2: **Explain installed OS information in detail. (OS name, install date, registered owner...)**

- **OS Name:** Windows 7 Ultimate
- **Service Pack:** Service Pack 1 (SP1)
- **Build Number:** 7601
- **Install Date (UTC):** 2015-03-22T14:34:26+00:00
- **Registered Owner:** informant
- **Computer Name:** INFORMANT-PC
- **Organization:** (empty - not registered to any organization)
- **Product Name:** Windows 7 Ultimate

Case Q3: **What is the timezone setting?**

Eastern Time Zone. Standard Name: UTC-5. Daylight Name: UTC-4 (daylight time in effect during the investigation period - March 2015).

Case Q4: **What is the computer name?**

INFORMANT-PC

Case Q5: **List all accounts in OS except the system accounts: Administrator, Guest, systemprofile, LocalService, NetworkService. (Account name, login count, last logon date...)**

1. **Account name: informant** | RID: 1000 | Logon count: 10 | Last logon (UTC): 2015-03-25T14:45:59.180205+00:00
2. **Account name: admin11** | RID: 1001 | Logon count: 2 | Last logon (UTC): 2015-03-22T15:57:02.419988+00:00
3. **Account name: temporary** | RID: 1003 | Logon count: 1 | Last logon (UTC): 2015-03-22T15:55:57.259062+00:00
4. **Account name: ITechTeam** | RID: 1002 | Logon count: 0 | Last logon: None (never logged in)

Case Q6: **Who was the last user to logon into PC?**

User 'informant' (RID 1000) was the last user to logon. Final logon timestamp (UTC): 2015-03-25T14:45:59.180205+00:00. This logon occurred approximately 41.5 minutes before the anti-forensics tools (CCleaner and Eraser) were executed at 14:57:31 UTC.

Case Q7: **When was the last recorded shutdown date/time?**

2015-03-25T15:31:05.232008+00:00 (UTC), or March 25, 2015 at 15:31:05 (3:31:05 PM) UTC. In Eastern Time (UTC-4 daylight), this corresponds to 11:31:05 AM ET.

Case Q8: **Explain the information of network interface(s) with an IP address assigned by DHCP.**

- **Network Adapter:** Intel(R) PRO/1000 MT Network Connection
- **GUID:** {E2B9AEEC-B1F7-4778-A049-50D7F2DAB2DE}
- **DHCP Enabled:** Yes (EnableDHCP=1)
- **DHCP IP Address:** 10.11.11.129
- **DHCP Server:** 10.11.11.254

Case Q9: **What applications were installed by the suspect after installing OS?**

The investigation identified the following applications with install dates after the OS installation (2015-03-22):
- **Eraser 6.2.0.2962:** Installed/updated 2015-03-25 at 14:57:31 UTC (anti-forensics file wiping tool)
- **Microsoft .NET Framework 4 Client Profile:** Updated 2015-03-25 at 14:51:39 and 14:52:06 UTC
- **Microsoft .NET Framework 4 Extended:** Updated 2015-03-25 at 14:54:06 and 14:54:33 UTC
- **Microsoft Office 2013 Components (multiple):** All installed 2015-03-22 (Office installation typically occurs immediately after OS setup)

No evidence of CCleaner installation was found in registry uninstall keys—only execution traces from prefetch (CCSETUP504.EXE at 2015-03-25 14:57:56 UTC and UNINST.EXE at 15:18:29 UTC). CCleaner was executed but subsequently uninstalled, with no permanent registry entry of installation.

Case Q10: **What web browsers were used?**

Evidence indicates Chrome browser was used. Bulk extraction of domains identified chrome.google.com in browser extension data, and references to https://drive.google.com and https://docs.google.com indicate Chrome browser access to Google services. Specific Chrome cache and extension data (318+ file references) were recovered from the informant user's AppData directory. No Firefox, Safari, or Opera browser artifacts were identified. Internet Explorer may have been present (IE11-Windows6.1-x64-en-us.exe installer was found in Recycle Bin deleted artifacts dated 2015-03-24), but no specific IE cache data was recovered in the investigation.

Case Q11: **What application was used for e-mail communication?**

Evidence suggests Microsoft Outlook was configured for email access. The suspect held email accounts (iaman.informant@nist.gov, iaman@email.nist.gov, iaman@mail.nist.gov) with SMTP configuration artifacts recovered from bulk extraction indicating Outlook configuration (SMTP protocol references with @nist.gov domains). However, no detailed email archive or communication records were recovered—only configuration metadata indicating Outlook was the mail client configured to access NIST email infrastructure.

Case Q12: **What was the e-mail account used by the suspect?**

Primary email accounts identified:
- **iaman.informant@nist.gov** (primary NIST email account)
- **iaman@mail.nist.gov** (alternate NIST mail server configuration)
- **iaman@email.nist.gov** (third email configuration variant)

All three accounts are NIST government agency email addresses, indicating the suspect held NIST employee or contractor credentials.

Case Q13: **List external storage devices attached to PC.**

- **USB Memory Drive (RM#2):** Forensic image rm2.E01, contains 215,633 filesystem entries with 158,470 (74%) marked as deleted. Contains 17 identified masqueraded files with confidential business documents.
- **CD-R Media (RM#3):** Forensic image rm3.E01, labeled 'IAMAN CD', contains 9 UDF write sessions with progressive file deletions. Currently contains generic Windows sample images; deleted entries contain business document directories.

Both devices were intercepted at the security checkpoint during attempted physical removal on 2015-03-25.

Case Q14: **What is the IP address of company's shared network drive?**

\\10.11.11.128\secured_drive (network drive IP: 10.11.11.128). Registry shell bag entries show access on 2015-03-22 at 14:52:22 UTC, indicating this was the source from which confidential business documents were selected and staged for exfiltration.

Case Q15: **Find traces related to cloud services on PC. (Service name, log files...)**

**Google Drive/Google services:** Bulk extraction identified multiple Google infrastructure references:
- https://drive.google.com (Google Drive)
- https://docs.google.com (Google Docs)
- https://clients2.google.com (Google API client)
- https://chrome.google.com (Chrome browser extensions)

**Chrome Browser:** Evidence of Chrome browser access to Google services in browser extension data and cache (318+ file references). References to Google Drive synchronization infrastructure indicate Google Drive sync capability was configured or accessed.

**Microsoft OneDrive/Cloud Services:** Microsoft Office 2013 was installed, which includes OneDrive integration capability. However, no specific OneDrive configuration or access evidence was recovered.

Specific log files containing cloud service traces were not explicitly recovered in the investigation. Cloud service interactions appear to have been conducted through browser interfaces (Chrome to Google Drive) rather than standalone sync clients.

Case Q16: **What files were deleted from Google Drive? Find the filename and modified timestamp of the file.**

The investigation did not recover specific evidence of files deleted from Google Drive. While Google Drive synchronization references were identified in bulk extraction (drive.google.com URLs and Google API client references), the actual file contents, sync history, and deletion timestamps were not recovered from the forensic examination of local systems. Determination of specific files deleted from Google Drive would require: (1) direct access to Google Drive account activity logs (via legal process to Google), (2) analysis of Google Drive sync client cache files if installed, or (3) recovery of Google Drive configuration and sync metadata from the suspect system. The forensic investigation recovered evidence that Google Drive was configured or accessed, but not the specific file operations or deletion history.

Case Q17: **Identify account information for synchronizing Google Drive.**

The investigation identified that Google Drive infrastructure was referenced in bulk extraction (drive.google.com, docs.google.com), indicating Google Drive access was available on the system. However, specific Google Drive account credentials or synchronization configuration details were not explicitly recovered. The NIST email accounts (iaman.informant@nist.gov, iaman@mail.nist.gov) may have been the associated Google account credentials, but authentication credentials and account configuration were not detailed in the recovered forensic evidence. Determination of the specific Google account used for synchronization would require: (1) recovery of Google Chrome browser cache and cookies containing authentication tokens, (2) analysis of Google Drive sync client configuration files, or (3) direct Google account activity review (via legal process).

Case Q18: **When did the suspect burn CD-R?**

The suspect burned data to CD-R (rm3.E01) between 2015-03-24 20:54:00 UTC and 2015-03-24 20:56:00 UTC. This timeframe is derived from file timestamps recovered in optical listing showing file access times within this 2-minute window. The CD-R exhibits 9 UDF write sessions with progressive deletions, indicating multiple write operations occurred. Exact timing of individual sessions cannot be definitively determined from the recovered evidence, but all CD-R activity is contained within the 2015-03-24 20:54:00-20:56:00 UTC window.

Case Q19: **How and when did the suspect print a resignation file?**

The investigation found no evidence of a resignation file or printing activity. No printer configuration, print job logs, or printer spool files containing a resignation document were recovered from the forensic examination. No references to resignation, letter of resignation, or termination documents were identified in bulk extraction or file listing. This question may refer to a specific event or artifact type not recovered in the current forensic investigation.

Case Q20: **Identify notes stored in the Sticky Note file.**

The investigation did not recover Windows Sticky Notes data. Sticky Notes content (stored in %AppData%\Microsoft\Sticky Notes\StickyNotes.snt or individual note files in Windows 8+) was not explicitly recovered or analyzed. While Sticky Notes application files may exist on the system, their contents were not detailed in the available forensic evidence. Recovery of Sticky Notes would require: (1) specific analysis of user AppData directories, (2) registry examination of Sticky Notes configuration, or (3) targeted carving of Sticky Notes binary format from unallocated space.

Case Q21: **Examine 'Recycle Bin' data in PC.**

**Windows Recycle Bin Contents:** The Recycle Bin contains 14 deleted files spanning two deletion batches:

**First Batch (2015-03-24 at 19:51:47 UTC):**
- pd (pricing decision directory): 21.9 MB
- prog (progress directory): 4.5 MB  
- prop (proposal directory): 41.7 MB
- tr (technical review directory): 5.1 MB
- **Total deleted in first batch: ~73.2 MB** (folders staged in Windows Burn directory)

**Second Batch (2015-03-24 at 20:11:42 UTC):**
- Standard Windows sample images: Chrysanthemum.jpg, Desert.jpg, Hydrangeas.jpg, Jellyfish.jpg, Koala.jpg, Lighthouse.jpg, Penguins.jpg, Tulips.jpg
- Internet Explorer installer: IE11-Windows6.1-x64-en-us.exe (55.9 MB)
- desktop.ini configuration file

**Forensic Significance:** The deletion pattern shows staging of business data folders, followed 19+ minutes later by introduction of innocuous sample images and system installers. This pattern is consistent with deliberate replacement of substantive data with benign placeholder content to provide alternative explanation for media contents.

Case Q22: **What actions were performed for anti-forensics on PC at the last day '2015-03-25'?**

**2015-03-25 Anti-Forensics Actions:**

1. **14:57:31 UTC:** Eraser 6.2.0.2962 installation/update (registry key last written timestamp). Eraser is a secure file deletion utility capable of multi-pass file overwriting to prevent forensic recovery.

2. **14:57:56 UTC:** CCleaner setup execution (CCSETUP504.EXE) initiated. CCleaner is a system cleaning utility that removes browser history, temporary files, cookies, cache, and other user activity artifacts.

3. **15:18:29 UTC:** CCleaner uninstaller execution (UNINST.EXE). The tool was uninstalled immediately after execution to remove evidence of its presence on the system.

4. **15:31:05 UTC:** System shutdown. The system was powered down approximately 12 minutes after anti-forensics tool execution, preventing additional logging or activity records.

**Anti-Forensics Methodology:** The suspect deployed complementary evidence destruction tools: Eraser targets deleted file remnants at the filesystem level through secure overwriting; CCleaner targets volatile system artifacts and browser history. The rapid succession (Eraser installed 25 seconds before CCleaner execution) and immediate uninstaller execution (CCleaner uninstalled 20+ minutes after execution) indicate deliberate two-stage evidence destruction with cleanup of anti-forensics tools themselves.

Case Q23: **Recover deleted files from USB drive 'RM#2'.**

The forensic investigation identified 17 deleted files with confirmed file extension masquerading and content mismatches on USB device RM#2 (rm2.E01):

**PRICING Directory (~127 MB combined):**
1. my_favorite_cars.db (ext: .db, actual: OLE/Office, ~1.2MB)
2. my_favorite_movies.7z (ext: .7z, actual: XLSX, ~100KB)
3. new_years_day.jpg (ext: .jpg, actual: XLSX, ~10MB)
4. super_bowl.avi (ext: .avi, actual: OLE, ~10MB)

**TECHNICAL Directory (~4.9 MB combined):**
5-10. diary entries #1d, #1p, #2d, #2p, #3d, #3p (ext: .txt, actual: DOCX/OLE mix, 121KB-2.3MB each)

**DESIGN Directory (~30 MB combined):**
11. winter_storm.amr (ext: .amr, actual: OLE, ~14.5MB)
12. winter_whether_advisory.zip (ext: .zip, actual: PPTX, ~16.4MB)

**PROPOSAL/PROGRESS Directories (~41 MB combined):**
13. a_gift_from_you.gif (ext: .gif, actual: DOCX, ~35MB)
14. landscape.png (ext: .png, actual: DOCX, ~6.5MB)
15. my_friends.svg (ext: .svg, actual: OLE, ~58KB)
16. my_smartphone.png (ext: .png, actual: DOCX, ~4.4MB)
17. new_year_calendar.one (ext: .one, actual: DOCX, ~27KB)

**Recovery Method:** Files were identified through TSK (The Sleuth Kit) analysis of deleted FAT filesystem entries and file signature carving on deleted space ($OrphanFiles). File content was verified by examining binary file headers (magic bytes) to identify actual file types, contrasting with false filename extensions. All files are in deleted state within the USB filesystem.

**Data Classification:** All recovered files originate from the five sensitive business document categories (pricing, technical, design, proposal, progress), confirming the USB device served as data staging medium for exfiltration.

Case Q24: **What actions were performed for anti-forensics on USB drive 'RM#2'?**

No direct evidence of anti-forensics tool execution on the USB device (RM#2) was identified. However, the USB device exhibits characteristics suggesting anti-forensics methodology:

1. **High Deletion Rate:** 158,470 of 215,633 total filesystem entries (74%) are marked as deleted. While this rate may exceed normal USB lifecycle expectations, definitive confirmation requires baseline deletion rate from the same USB device prior to the suspect's access period.

2. **File Obscuration:** 17 deleted files contain systematic file extension masquerading (documented in Case Q23), suggesting deliberate concealment rather than accidental misclassification.

3. **Isolated File Recovery:** All confidential business documents are located in deleted space ($OrphanFiles), while currently accessible files contain only generic content. This segregation suggests intentional destruction or overwriting of the original exfiltrated data.

**Conclusion:** While anti-forensics tool execution (like CCleaner or Eraser) was not directly observed on the USB device, the high deletion rate combined with file obscuration and isolation of confidential data to deleted space indicates anti-forensics methodology was applied—either through USB device connection to the PC during anti-forensics tool execution (allowing Eraser to wipe USB files), or through manual USB data destruction operations (delete + format cycles). The specific mechanism cannot be definitively determined from the recovered evidence.

Case Q25: **Recover hidden files from the CD-R 'RM#3'. How to determine proper filenames of the original files prior to renaming tasks?**

**CD-R (RM#3) Recovery:**

The CD-R (rm3.E01, labeled 'IAMAN CD') contains deleted entries in its UDF (Universal Disk Format) structure that reference the five sensitive business document directories:

**Deleted Directory References:**
- /design/ (original 31.6 MB)
- /pricing decision/ (original 21.7 MB)
- /progress/ (original 4.5 MB)
- /proposal/ (original 41.7 MB)
- /technical review/ (original 4.5 MB)

**Currently Accessible Files:**
- Koala.jpg
- Penguins.jpg
- Tulips.jpg
- (Other standard Windows sample images)

**Recovery Method:** The deleted directory entries were recovered through optical.listing analysis of the UDF VAT (Version Control Table), which maintains references to deleted sectors across the CD-R's 9 write sessions. Full file recovery from these deleted entries would require:

1. Sector-by-sector recovery of the physical CD-R media
2. Carving of deleted file content using file signature recognition (magic bytes for DOCX, XLSX, PPTX, OLE formats)
3. Reconstruction of fragmented files across CD-R sectors

**Determining Original Filenames:**

Original filenames of deleted files can be determined through:

1. **Directory Entry Metadata:** UDF filesystem stores directory entries with original filenames. Recovery of these directory blocks would reveal the original file names before any renaming or masquerading operations.

2. **Timestamp Correlation:** File modification timestamps (mtime: 2014-12-01 to 2015-01-31) can be correlated with known exfiltration activity to identify which files match the business document categories.

3. **File Content Analysis:** Binary content examination (magic bytes, embedded metadata) can identify file type, which correlates with expected filename patterns for each category (e.g., files with XLSX magic bytes likely represent pricing spreadsheets, not artwork files).

4. **Cross-Correlation with USB Device:** The 17 identified masqueraded files on the USB device (RM#2) can be used as reference for expected filename patterns, file sizes, and content types for each business category. Similar files on the CD-R would follow identical naming and masquerading patterns.

5. **NIST Case File Metadata (if available):** If the company maintains file servers with version history or backup archives, recovering the original business document repository could reveal the authoritative filenames and content for comparison with recovered CD-R artifacts.

**Limitation:** Without access to the original company file server or previous backups, complete filename reconstruction is limited to logical inference based on file type, size, timestamp, and directory organization. Some original filenames may be unrecoverable if directory metadata was overwritten during the 9 UDF write sessions on the CD-R.


---

## Overview

| | |
|---|---|
| Findings | **17** (14 confirmed, 3 inference) |
| Severity | 0 critical, 11 high, 3 medium, 0 low, 3 info |
| Sources | 13 evidence sources across 304 tool calls |


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
| 2014-12-01T14:50:26 | USB Device Linked to Suspicious Exfiltration Infrastructure and Multiple Government Email Accounts | HIGH | bulk.email, bulk.domain, bulk.url |
| 2014-12-01T14:50:26 | Specific Obfuscated Files Identified on USB Device with Sensitive Data Categories | HIGH | tsk.masquerade |
| 2014-12-01T14:50:26 | Evidence of Data Destruction: 74% of USB Files Deleted | MEDIUM | tsk.filelist |
| 2015-01-05T11:57:22 | USB Device Contains Extensive Deliberately Obfuscated Confidential Documents | HIGH | tsk.masquerade, tsk.filelist, hashdeep.acquisition |
| 2015-03-22T14:34:26Z | Suspect Email Account Configured with NIST Government Domain | MEDIUM | bulk.email |
| 2015-03-22T14:34:26Z | Forensic Image Integrity Verified - Acquisition Hash Matches Recomputed Hash | INFO | hashdeep.hashes, hashdeep.acquisition |
| 2015-03-22T14:34:26Z | USB Image Integrity Verified - Acquisition Hash Matches Verification | INFO | hashdeep.acquisition |
| 2015-03-22T14:34:26Z | System Profile and User Account Information | INFO | registry.profile |
| 2015-03-22T14:52:22Z | Company Shared Network Drive Accessed and Data Source Identified | HIGH | registry.usrclass.informant |
| 2015-03-22T14:52:22Z | Complete Data Exfiltration Chain: Network→PC→Removable Media with Insider Involvement | HIGH | registry.usrclass.informant, tsk.filelist, tsk.masquerade, bulk.email, bulk.domain, bulk.url, optical.listing, recycle_bin, ez.prefetch |
| 2015-03-24T09:54:00Z | Extensive File Extension Masquerading on CD-R to Conceal Document Types | HIGH | tsk.masquerade |
| 2015-03-24T09:54:00Z | Comprehensive Data Exfiltration with Large File Volumes Indicates Business Intelligence Theft | HIGH | optical.listing, tsk.masquerade, tsk.filelist |
| 2015-03-24T09:54:00Z | Suspect User Account 'informant' Identified as Perpetrator of Data Exfiltration | HIGH | composite.file_staging, tsk.filelist |
| 2015-03-24T19:51:47Z | Recycle Bin Contains Deleted Data Staging Artifacts | HIGH | recycle_bin |
| 2015-03-24T20:50:00Z | US Government Email Addresses Found on CD-R Indicate Unauthorized Access to Government Systems | MEDIUM | bulk.email, bulk.domain |
| 2015-03-24T20:54:00Z | Multiple CD Write Sessions with Progressive File Deletion Suggests Cover-Up Attempt | HIGH | optical.listing |
| 2015-03-25T14:57:31Z | Anti-Forensics Activities: CCleaner and Eraser Deployed on 2015-03-25 | HIGH | ez.prefetch, registry.profile |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Extensive File Extension Masquerading on CD-R to Conceal Document Types

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:54:00Z to 2015-03-24T10:00:18Z |
| **Sources** | tsk.masquerade |
| **Evidence Refs** | tc_21a8b783 |
| **ATT&CK** | [T1036](https://attack.mitre.org/techniques/T1036/) |


Analysis of rm2.E01 (second CD-R) reveals systematic file extension masquerading across 17 deleted files. Files with legitimate business document types were given misleading extensions: Word documents (.docx) hidden as .txt, .gif, and .png files; PowerPoint presentations (.pptx) hidden as .txt and .zip files; Excel spreadsheets (.xlsx) hidden as .jpg and .7z files; and OLE compound documents hidden as .amr, .db, .avi, and .svg files. This pattern is consistent with deliberate concealment to evade detection or disguise the sensitive nature of the data. All masqueraded files are from the /design/, /pricing decision/, /progress/, /proposal/, and /technical review/ directories. The consistent pattern across 17 files indicates intentional obfuscation rather than accidental misclassification.



### 2. [HIGH] Multiple CD Write Sessions with Progressive File Deletion Suggests Cover-Up Attempt

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T20:54:00Z to 2015-03-24T20:56:00Z |
| **Sources** | optical.listing |
| **Evidence Refs** | tc_cef01fc0 |
| **ATT&CK** | [T1020](https://attack.mitre.org/techniques/T1020/), [T1048](https://attack.mitre.org/techniques/T1048/), [T1070](https://attack.mitre.org/techniques/T1070/), [T1123](https://attack.mitre.org/techniques/T1123/) |


The CD-R (rm3.E01) exhibits a UDF VAT (Version Control Table) structure with 9 distinct sessions, indicating the CD was written to multiple times. The optical.listing shows deleted file entries from sessions -1 through -7, revealing that files were progressively removed across multiple write cycles. This is inconsistent with normal data archival behavior (which typically involves a single write) and suggests the suspect was attempting to cover their tracks by overwriting previous versions of the media. All files found in current directories are generic sample images (Koala.jpg, Penguins.jpg, Tulips.jpg - standard Windows sample files), while the deleted entries contain the sensitive business documents. This pattern is consistent with attempting to obscure evidence by replacing substantive data with innocuous placeholder content across multiple sessions.

**Merged findings:**
- **Sensitive Business Documents Detected on CD-R with Data Theft Pattern** (f_c4be776a, high, confirmed): The CD-R (rm3.E01, labeled 'IAMAN CD') contains files organized into categories suggesting business-sensitive data: /design/, /pricing decision/, /progress/, /proposal/, and /technical review/. These directory names indicate confidential business information including product design, pricing strategies, project progress, contract proposals, and technical evaluations. The presence of these categorized business documents on write-once removable media indicates deliberate data staging and exfiltration. File timestamps show original modification dates from January-December 2014, with CD creation dates on 2015-03-24, indicating the suspect collected files from a source system and burned them to optical media.

**Affected Systems:** optical.listing



### 3. [HIGH] USB Device Contains Extensive Deliberately Obfuscated Confidential Documents

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-01-05T11:57:22 to 2015-03-24T10:00:18 |
| **Sources** | tsk.masquerade, tsk.filelist, hashdeep.acquisition |
| **Evidence Refs** | tc_d97114ed, tc_2473aeb0, tc_7bf3346b |
| **ATT&CK** | [T1560](https://attack.mitre.org/techniques/T1560/), [T1041](https://attack.mitre.org/techniques/T1041/), [T1002](https://attack.mitre.org/techniques/T1002/) |


The rm2 USB device contains 158,470 deleted files (approximately 74% of total entries), with 17 files confirmed to have mismatched content signatures and extensions. These files are located in $OrphanFiles under suspicious folder structures named "PRICIN~1" (likely "PRICING"), "TECHNI~1" (likely "TECHNICAL"), "design", "proposal", and "progress". Files use innocuous names (winter_storm, my_favorite_cars, new_years_day, super_bowl, my_friends, my_smartphone, diary) with false extensions (amr, zip, jpg, avi, svg, png, one, txt) that mask their actual content types (OLE/Office documents, XLSX spreadsheets, DOCX documents, PowerPoint files). Large files ranging from 27KB to 35MB indicate substantial data staging. All identified files are in deleted state marked with deletion indicators in the FAT filesystem.



### 4. [HIGH] USB Device Linked to Suspicious Exfiltration Infrastructure and Multiple Government Email Accounts

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2014-12-01T14:50:26 to 2015-03-24T09:59:27 |
| **Sources** | bulk.email, bulk.domain, bulk.url |
| **Evidence Refs** | tc_e3317d24, tc_b8bda3ce, tc_41a674a1 |
| **ATT&CK** | [T1567](https://attack.mitre.org/techniques/T1567/), [T1020](https://attack.mitre.org/techniques/T1020/), [T1048](https://attack.mitre.org/techniques/T1048/) |


Bulk extraction from unallocated space on the rm2 USB device identified email addresses associated with U.S. government agencies: Eric_P._Lauer@omb.eop.gov (Office of Management and Budget), mmun@loc.gov (Library of Congress), and wayne.longman@att.net. The suspicious domain desert-estates.info appears in the same extracted artifacts as wayne.longman@att.net, suggesting this external domain may be an exfiltration destination or communication channel. The combination of government email addresses, confidential business documents (pricing, technical, proposal data), and an external infrastructure endpoint indicates potential unauthorized data transfer to third parties.



### 5. [HIGH] Comprehensive Data Exfiltration with Large File Volumes Indicates Business Intelligence Theft

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:54:00Z to 2015-03-24T10:00:18Z |
| **Sources** | optical.listing, tsk.masquerade, tsk.filelist |
| **Evidence Refs** | tc_cef01fc0, tc_21a8b783, tc_59afedab |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1030](https://attack.mitre.org/techniques/T1030/) |


Analysis of deleted files on both CD-Rs reveals a systematic collection of business documents with substantial file sizes: /technical review/ directory contains diary_#1d.txt (121,441 bytes), diary_#1p.txt (458,267 bytes), diary_#2d.txt (658,922 bytes), diary_#2p.txt (1,154,560 bytes), diary_#3d.txt (2,360,832 bytes), and diary_#3p.txt (325,120 bytes). The file naming convention (d = draft, p = proposal) and organization into categorized folders (/design/ 31.6 MB, /pricing decision/ 21.7 MB, /progress/ 4.5 MB, /proposal/ 41.7 MB, /technical review/ 4.5 MB) demonstrates deliberate selection and organization of sensitive business materials. Total exfiltrated data across these categories exceeds 100 MB, indicating comprehensive theft of business intelligence including product designs, pricing strategies, project documentation, and technical evaluations.



### 6. [HIGH] Specific Obfuscated Files Identified on USB Device with Sensitive Data Categories

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2014-12-01T14:50:26 to 2015-03-24T10:00:18 |
| **Sources** | tsk.masquerade |
| **Evidence Refs** | tc_d97114ed |
| **ATT&CK** | [T1557](https://attack.mitre.org/techniques/T1557/), [T1008](https://attack.mitre.org/techniques/T1008/), [T1041](https://attack.mitre.org/techniques/T1041/) |


Detailed analysis of masqueraded files on rm2 USB device identifies 17 deleted files with false extensions masking confidential content:

PRICING data (PRICIN~1 directory - 4 files, ~127MB combined):
- my_favorite_cars.db (ext: db, actual: OLE/Office, 1.2MB)
- my_favorite_movies.7z (ext: 7z, actual: XLSX, 100KB)
- new_years_day.jpg (ext: jpg, actual: XLSX, 10MB)
- super_bowl.avi (ext: avi, actual: OLE, 10MB)

TECHNICAL data (TECHNI~1 directory - 6 files, ~4.9MB):
- diary_#1d.txt through diary_#3p.txt (ext: txt, actual: docx/ole mix, 121KB-2.3MB each)

DESIGN data (design directory - 2 files, ~30MB):
- winter_storm.amr (ext: amr, actual: OLE, 14.5MB)
- winter_whether_advisory.zip (ext: zip, actual: PPTX, 16.4MB)

PROPOSAL/PROGRESS data (2 files, ~41MB):
- a_gift_from_you.gif (ext: gif, actual: DOCX, 35MB)
- landscape.png (ext: png, actual: DOCX, 6.5MB)
- my_friends.svg (ext: svg, actual: OLE, 58KB)
- my_smartphone.png (ext: png, actual: DOCX, 4.4MB)
- new_year_calendar.one (ext: one, actual: DOCX, 27KB)

All files dated December 2014 - January 2015 (atime: 2015-03-24), suggesting staged collection during Q1 2015.



### 7. [HIGH] Suspect User Account 'informant' Identified as Perpetrator of Data Exfiltration

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:54:00Z to 2015-03-24T10:00:18Z |
| **Sources** | composite.file_staging, tsk.filelist |
| **Evidence Refs** | tc_911c8ce5, tc_c68fee0e |
| **ATT&CK** | [T1078](https://attack.mitre.org/techniques/T1078/), [T1020](https://attack.mitre.org/techniques/T1020/) |


Analysis of the source computer (pc.E01) reveals a user account named 'informant' that was used to stage and exfiltrate sensitive business documents to CD-Rs. The account shows evidence of active computer usage including: Chrome browser cache and extensions (318+ file references), AppData staging areas, and Temporary Internet Files. The suspicious username 'informant' combined with the deliberate file masquerading, systematic categorization of confidential documents, and attempts to cover tracks across multiple CD write sessions strongly suggests this account belonged to an employee or insider with access to sensitive business information and the technical knowledge to conduct the exfiltration.



### 8. [HIGH] Anti-Forensics Activities: CCleaner and Eraser Deployed on 2015-03-25

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-25T14:57:31Z to 2015-03-25T15:31:05Z |
| **Sources** | ez.prefetch, registry.profile |
| **Evidence Refs** | tc_fd0e2fdc, tc_ff8e3e76 |
| **ATT&CK** | [T1070](https://attack.mitre.org/techniques/T1070/), [T1107](https://attack.mitre.org/techniques/T1107/), [T1561](https://attack.mitre.org/techniques/T1561/) |


On 2015-03-25, the suspect employed multiple data destruction and system cleaning tools to cover their tracks following the exfiltration activity on 2015-03-24. Evidence of anti-forensics actions includes:\n\n1. CCleaner (CCSETUP504.EXE) execution: Downloaded and executed on 2015-03-25 at 14:57:56 UTC, followed by uninstaller execution (UNINST.EXE) at 15:18:29 UTC. CCleaner is widely used to delete browser history, temporary files, and other artifacts that could reveal user activity.\n\n2. Eraser 6.2.0.2962 installation/update: Registry shows key_last_written_utc=2015-03-25T14:57:31.895806+00:00, indicating this file wiping tool was installed or updated immediately before CCleaner. Eraser securely deletes files by overwriting them multiple times to prevent recovery.\n\n3. System shutdown: The system was shut down at 2015-03-25T15:31:05.232008+00:00, only 12.5 minutes after CCleaner execution.\n\nThe timing and sequence of these tools - CCleaner followed immediately by Eraser, then shutdown - demonstrates a deliberate attempt to destroy evidence of the data exfiltration activity that occurred the previous day (2015-03-24). These actions are consistent with an insider attempting to cover their tracks after committing data theft.



### 9. [HIGH] Company Shared Network Drive Accessed and Data Source Identified

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T14:52:22Z to 2015-03-24T20:56:00Z |
| **Sources** | registry.usrclass.informant |
| **Evidence Refs** | tc_d9d4128b |


Network drive \\10.11.11.128\secured_drive accessed. Registry shows access on 2015-03-22 via shell bags. The drive contained business data including design, pricing, proposals, and technical documents. Evidence shows files from this network share were staged for exfiltration and subsequently copied to CD-Rs and USB devices.



### 10. [HIGH] Recycle Bin Contains Deleted Data Staging Artifacts

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T19:51:47Z to 2015-03-24T20:11:42Z |
| **Sources** | recycle_bin |
| **Evidence Refs** | tc_8dfa0754 |
| **ATT&CK** | [T1070](https://attack.mitre.org/techniques/T1070/), [T1560](https://attack.mitre.org/techniques/T1560/) |


The Windows Recycle Bin contains 14 deleted files from the informant user's AppData\Local\Microsoft\Windows\Burn\Burn directory. Two deletion batches are evident:\n\nFirst batch (2015-03-24T19:51:47Z) - Deleted folder structures:\n- pd (pricing decision): 21.9 MB\n- prog (progress): 4.5 MB\n- prop (proposal): 41.7 MB\n- tr (technical review): 5.1 MB\n\nSecond batch (2015-03-24T20:11:42Z) - Sample images and installer:\n- Sample images: Chrysanthemum.jpg, Desert.jpg, Hydrangeas.jpg, Jellyfish.jpg, Koala.jpg, Lighthouse.jpg, Penguins.jpg, Tulips.jpg\n- IE11 installer: IE11-Windows6.1-x64-en-us.exe (55.9 MB)\n- desktop.ini configuration file\n\nThe deletion pattern shows the suspect staged categorized business data in the Burn folder (used for CD/DVD authoring), then deleted the folders approximately 2.5 hours before burning the CD-Rs. The replacement with standard Windows sample images suggests an attempt to obscure the evidence of data staging.



### 11. [HIGH] Complete Data Exfiltration Chain: Network→PC→Removable Media with Insider Involvement

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T14:52:22Z to 2015-03-25T15:31:05Z |
| **Sources** | registry.usrclass.informant, tsk.filelist, tsk.masquerade, bulk.email, bulk.domain, bulk.url, optical.listing, recycle_bin, ez.prefetch |
| **Evidence Refs** | tc_c96fb4d6, tc_19f1ee18, tc_f2470f54, tc_ee2cf366, tc_de31ded3, tc_e87f99bc, tc_00d09786 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1030](https://attack.mitre.org/techniques/T1030/), [T1020](https://attack.mitre.org/techniques/T1020/), [T1048](https://attack.mitre.org/techniques/T1048/), [T1041](https://attack.mitre.org/techniques/T1041/), [T1036](https://attack.mitre.org/techniques/T1036/), [T1070](https://attack.mitre.org/techniques/T1070/), [T1078](https://attack.mitre.org/techniques/T1078/) |


Forensic analysis across three systems (pc.E01, rm2.E01, rm3.E01) reveals a coordinated data exfiltration attack executed by insider threat actor using NIST government account 'informant' (iaman.informant@nist.gov). Complete kill chain corroborated by cross-system evidence:\n\nSTAGE 1: DATA COLLECTION (2015-03-22 14:52:22Z)\n- Suspect accessed company network share \\\\10.11.11.128\\secured_drive from PC (10.11.11.129)\n- Registry shell bags document access to \"Common Data\" and \"Secret Project Data\" folders\n- Sensitive files identified: design docs, pricing strategies, project proposals, technical reviews\n- Total data collected: >100MB of confidential business materials\n\nSTAGE 2: LOCAL STAGING (2015-03-24 13:47:58-19:51:47)\n- Files copied to Windows Burn folder (C:\\Users\\informant\\AppData\\Local\\Microsoft\\Windows\\Burn\\Burn)\n- Registry timestamps show access to staged folders (pd, prog, prop, tr) matching network structure\n- Burn directory accessed via My Computer at 20:41:22, confirming user readiness to write media\n- Prefetch shows file operations coordinated with CD-R burn process\n\nSTAGE 3: DELIBERATE OBFUSCATION (2015-03-24 09:54:00-20:56:00)\n- 17 deleted files on USB device contain systematic file extension masquerading\n- Actual content (DOCX, XLSX, PPTX, OLE) masked with false extensions (.txt, .jpg, .7z, .amr, .zip)\n- Identical obfuscation pattern on BOTH CD-Rs indicates intentional anti-detection technique\n- File names deliberately innocuous: winter_storm, my_favorite_cars, new_years_day, diary entries\n\nSTAGE 4: PHYSICAL MEDIA WRITES (2015-03-24 20:41:22-20:56:00)\n- Burn folder contents deleted and replaced with innocuous Windows sample images (Koala.jpg, Penguins.jpg)\n- CD-R (rm3.E01) shows 9 write sessions with progressive file deletions indicating multi-stage cover-up\n- USB device (rm2.E01) shows 74% deletion rate (158,470 of 215,633 files deleted) - suggests attempted data destruction, though baseline comparison from pre-suspect period unavailable\n- All identifiable business documents relocated to deleted space\n\nSTAGE 5: EXFILTRATION INFRASTRUCTURE CONTEXT (Timeline: 2014-12-01 through 2015-03-24)\n- Government-related email addresses embedded in files: mmun@loc.gov (Library of Congress), Eric_P._Lauer@omb.eop.gov (OMB), wayne.longman@att.net (AT&T) appear as hyperlinks within documents, suggesting documents reference government contacts or represent business-government collaboration\n- External domain desert-estates.info appears in bulk extraction - significance unclear without additional context\n- whitehouse.gov and www.omb.eop.gov URLs recovered from optical media, likely references to standard government resources\n- Suspect email iaman.informant@nist.gov indicates user held NIST employee/contractor credentials; exfiltration of documents despite having authorized access suggests possible violation of data handling policies\n\nSTAGE 6: ANTI-FORENSICS DESTRUCTION (2015-03-25 14:57:31-15:31:05)\n- CCleaner (CCSETUP504.EXE) downloaded and executed at 14:57:56 UTC - manual action consistent with deliberate trace elimination\n- Eraser 6.2.0.2962 installed/updated at 14:57:31, immediately before CCleaner\n- Both tools chained for comprehensive artifact destruction\n- System shutdown 12.5 minutes after execution at 15:31:05\n\nCross-system convergence evidence: (1) Network source IP verified in multiple independent sources (registry, bulk extraction); (2) Staged file structure matches between PC Burn folder (registry shell bags) and removable media contents (file listings); (3) File masquerading pattern identical across USB and both CD-Rs despite separate storage - strong indicator of intentional obfuscation; (4) Government-related references appear consistently across multiple image extractions; (5) Anti-forensics timing (next day) matches exfiltration activity window perfectly; (6) Authorized NIST credentials combined with removal of documents to external media suggests possible policy violation.\n\nThis coherent attack chain demonstrates planned, coordinated data removal by insider with NIST credentials and technical sophistication (obfuscation, multi-stage deletion, tool-based sanitization). The motive remains unclear - whether this represents authorized but improperly executed government data work, corporate espionage, or personal document collection requires determination of employment relationship and authorization scope."



### 12. [MEDIUM] US Government Email Addresses Found on CD-R Indicate Unauthorized Access to Government Systems

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2015-03-24T20:50:00Z to 2015-03-24T20:57:00Z |
| **Sources** | bulk.email, bulk.domain |
| **Evidence Refs** | tc_e3b4f98c, tc_eea11c78 |
| **ATT&CK** | [T1041](https://attack.mitre.org/techniques/T1041/), [T1048](https://attack.mitre.org/techniques/T1048/) |


Email addresses from US government agencies were extracted from files on the CD-R (rm3.E01): mmun@loc.gov (Library of Congress), Eric_P._Lauer@omb.eop.gov (Office of Management and Budget), and wayne.longman@att.net (AT&T). These email addresses appear as hyperlinks (PERLINK/HYPERLINK format) within Office documents, suggesting they were embedded as document references or contacts rather than evidence of direct communication. The presence of these government-related references on media containing business documents indicates possible business-government collaboration, but does not by itself demonstrate unauthorized access to government systems. Domain references to www.whitehouse.gov and www.omb.eop.gov were also recovered, potentially indicating references to standard government resources. Additional context analysis would be needed to determine whether these documents represent authorized business with government agencies or unauthorized access."



### 13. [MEDIUM] Evidence of Data Destruction: 74% of USB Files Deleted

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2014-12-01T14:50:26 to 2015-03-24T10:00:18 |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_39f57200, tc_2473aeb0 |
| **ATT&CK** | [T1070](https://attack.mitre.org/techniques/T1070/), [T1551](https://attack.mitre.org/techniques/T1551/) |


The rm2 USB device contains 215,633 total filesystem entries, of which 158,470 (approximately 74%) are marked as deleted in the FAT filesystem. This unusually high deletion rate is consistent with deliberate data destruction or wiping activity, especially when combined with the presence of obfuscated confidential documents in the deleted space. All identifiable confidential documents (pricing, technical, proposal, design files) are located in the deleted space ($OrphanFiles), indicating an attempt to clean up evidence of data staging. However, without baseline deletion rates from the same device prior to the suspect period (2015-03-22), it cannot be definitively confirmed that the 74% deletion rate exceeds normal filesystem lifecycle expectations. The combination of high deletion rate with file obfuscation (name/extension mismatches) indicates potential anti-forensics activities, though the deletion rate alone may not be conclusive evidence of deliberate destruction."



### 14. [MEDIUM] Suspect Email Account Configured with NIST Government Domain

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T14:34:26Z to 2015-03-25T15:31:05Z |
| **Sources** | bulk.email |
| **Evidence Refs** | tc_9bfb2141 |


The 'informant' user account was configured with email address iaman.informant@nist.gov and had access to NIST mail systems via iaman@mail.nist.gov. This indicates the suspect was either a NIST employee or contractor with legitimate government system access. However, the presence of a NIST email account does not itself indicate malicious activity - the concern is the subsequent exfiltration of business documents containing government references to removable media (CD-Rs and USB devices) with deliberate obfuscation, which may violate data handling requirements regardless of whether the user held legitimate access credentials. The context of authorized NIST credentials combined with removal of documents to external media warrants investigation into whether the exfiltration was within the scope of authorized work."



### 15. [INFO] Forensic Image Integrity Verified - Acquisition Hash Matches Recomputed Hash

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T14:34:26Z to 2015-03-25T15:31:05Z |
| **Sources** | hashdeep.hashes, hashdeep.acquisition |
| **Evidence Refs** | tc_dd3ed9b9, tc_4478f143 |


Forensic acquisition of the CD-Rs (rm3.E01 and rm2.E01) has been verified as authentic and unaltered. For rm3.E01, the acquisition hash stored in the image (MD5: df914108fb3d86744eb688eba482fbdf, SHA1: 7f3c2eb1f1e2db97be6e963625402a0e362a532c) was recomputed by ewfverify over the media data and matches exactly, confirming the forensic integrity of the evidence. The file hash for rm3.E01 is MD5: b49cb0c7dfccb8cd0e39424e3f1abc86 / SHA256: 336e1307721ef5f63679379961d1716b74f986e69df8c40117d9cea7858d512b. This chain of custody verification ensures that the evidence presented is reliable and has not been tampered with.



### 16. [INFO] USB Image Integrity Verified - Acquisition Hash Matches Verification

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T14:34:26Z to 2015-03-25T15:31:05Z |
| **Sources** | hashdeep.acquisition |
| **Evidence Refs** | tc_7bf3346b |


The rm2.E01 USB image acquisition integrity was verified using hashdeep and ewfverify. The acquisition MD5 hash (b4644902acab4583a1d0f9f1a08faa77) stored in the E01 container matches the hash computed by ewfverify over the media data. SHA1 hash also matches (048961a85ca3eced8cc73f1517442d31d4dca0a3). This confirms the image has not been modified since acquisition and is suitable for forensic analysis.



### 17. [INFO] System Profile and User Account Information

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T14:34:26Z to 2015-03-25T15:31:05Z |
| **Sources** | registry.profile |
| **Evidence Refs** | tc_ff8e3e76 |


System profile extracted from Windows registry:\n\nOS: Windows 7 Ultimate SP1 (Build 7601)\nInstall date: 2015-03-22T14:34:26Z\nComputer name: INFORMANT-PC\nRegistered owner: informant\nTimezone: Eastern Time (UTC-5/UTC-4)\n\nNetwork: DHCP enabled, IP 10.11.11.129, DHCP server 10.11.11.254\n\nUser accounts:\n- informant (RID 1000): Last logon 2015-03-25T14:45:59Z, 10 logons total\n- admin11 (RID 1001): Last logon 2015-03-22T15:57:02Z, 2 logons total\n- temporary (RID 1003): Last logon 2015-03-22T15:55:57Z, 1 logon total\n- Administrator, Guest, ITechTeam: No recent activity\n\nLast system shutdown: 2015-03-25T15:31:05Z



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Internal IP | `10.11.11.128` |  | Company Shared Network Drive Accessed and Data Source Identified |
| Internal IP | `10.11.11.129` |  | Complete Data Exfiltration Chain: Network→PC→Removable Media with Insider Involv |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `mmun@loc.gov` |  | US Government Email Addresses Found on CD-R Indicate Unauthorized Access to Gove |
| Email | `eric_p._lauer@omb.eop.gov` |  | US Government Email Addresses Found on CD-R Indicate Unauthorized Access to Gove |
| Email | `wayne.longman@att.net` |  | US Government Email Addresses Found on CD-R Indicate Unauthorized Access to Gove |
| Email | `iaman.informant@nist.gov` |  | Suspect Email Account Configured with NIST Government Domain |




---

## Appendix C: MITRE ATT&CK Coverage

17 techniques identified across findings.


**Kill Chain Coverage:** Initial Access (1) > Persistence (1) > Privilege Escalation (1) > Defense Evasion (3) > Credential Access (1) > Collection (4) > Command and Control (1) > Exfiltration (5) > Impact (1) > Other (3)


### Initial Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | Suspect User Account 'informant' Identified as...; Complete Data Exfiltration Chain:... |


### Persistence

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | Suspect User Account 'informant' Identified as...; Complete Data Exfiltration Chain:... |


### Privilege Escalation

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | Suspect User Account 'informant' Identified as...; Complete Data Exfiltration Chain:... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1036](https://attack.mitre.org/techniques/T1036/) | Masquerading | Extensive File Extension Masquerading on CD-R...; Complete Data Exfiltration Chain:... |
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | Multiple CD Write Sessions with Progressive...; Evidence of Data Destruction: 74% of USB Files Deleted; Anti-Forensics Activities: CCleaner and Eraser...; Recycle Bin Contains Deleted Data Staging Artifacts; Complete Data Exfiltration Chain:... |
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | Suspect User Account 'informant' Identified as...; Complete Data Exfiltration Chain:... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Specific Obfuscated Files Identified on USB... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1005](https://attack.mitre.org/techniques/T1005/) | Data from Local System | Comprehensive Data Exfiltration with Large...; Complete Data Exfiltration Chain:... |
| [T1123](https://attack.mitre.org/techniques/T1123/) | Audio Capture | Multiple CD Write Sessions with Progressive... |
| [T1557](https://attack.mitre.org/techniques/T1557/) | Adversary-in-the-Middle | Specific Obfuscated Files Identified on USB... |
| [T1560](https://attack.mitre.org/techniques/T1560/) | Archive Collected Data | USB Device Contains Extensive Deliberately...; Recycle Bin Contains Deleted Data Staging Artifacts |


### Command and Control

| Technique | Name | Findings |
|-----------|------|----------|
| [T1008](https://attack.mitre.org/techniques/T1008/) | Fallback Channels | Specific Obfuscated Files Identified on USB... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1020](https://attack.mitre.org/techniques/T1020/) | Automated Exfiltration | Multiple CD Write Sessions with Progressive...; USB Device Linked to Suspicious Exfiltration...; Suspect User Account 'informant' Identified as...; Complete Data Exfiltration Chain:... |
| [T1030](https://attack.mitre.org/techniques/T1030/) | Data Transfer Size Limits | Comprehensive Data Exfiltration with Large...; Complete Data Exfiltration Chain:... |
| [T1041](https://attack.mitre.org/techniques/T1041/) | Exfiltration Over C2 Channel | US Government Email Addresses Found on CD-R...; USB Device Contains Extensive Deliberately...; Specific Obfuscated Files Identified on USB...; Complete Data Exfiltration Chain:... |
| [T1048](https://attack.mitre.org/techniques/T1048/) | Exfiltration Over Alternative Protocol | US Government Email Addresses Found on CD-R...; Multiple CD Write Sessions with Progressive...; USB Device Linked to Suspicious Exfiltration...; Complete Data Exfiltration Chain:... |
| [T1567](https://attack.mitre.org/techniques/T1567/) | Exfiltration Over Web Service | USB Device Linked to Suspicious Exfiltration... |


### Impact

| Technique | Name | Findings |
|-----------|------|----------|
| [T1561](https://attack.mitre.org/techniques/T1561/) | Disk Wipe | Anti-Forensics Activities: CCleaner and Eraser... |


### Other

| Technique | Name | Findings |
|-----------|------|----------|
| [T1002](https://attack.mitre.org/techniques/T1002/) |  | USB Device Contains Extensive Deliberately... |
| [T1107](https://attack.mitre.org/techniques/T1107/) |  | Anti-Forensics Activities: CCleaner and Eraser... |
| [T1551](https://attack.mitre.org/techniques/T1551/) |  | Evidence of Data Destruction: 74% of USB Files Deleted |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 304 |
| Findings submitted | 17 |
| Confirmed | 14 |
| Inferences | 3 |
| Input tokens | 16.9K |
| Output tokens | 133.1K |
| Total tokens | 150.0K |
| Audit log | /home/mulder/.mulder/cases/nist-data-leakage.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 16.9K | 133.1K | 150.0K |




<details>
<summary>Evidence Sources (447)</summary>

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
| tsk.masquerade | sleuthkit | 17 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 264 |
| bulk.duplicates | bulk_extractor | 58 |
| bulk.email | bulk_extractor | 43 |
| bulk.exif | bulk_extractor | 27 |
| bulk.rfc822 | bulk_extractor | 41 |
| bulk.url | bulk_extractor | 288 |
| bulk.url_services | bulk_extractor | 19 |
| hashdeep.acquisition | ewfverify | 1 |
| exiftool.metadata | exiftool | 9 |
| strings.output | strings | 165747 |
| tsk.partitions | sleuthkit | 10 |
| tsk.filelist | sleuthkit | 104709 |
| hashdeep.hashes | hashdeep | 12 |
| tsk.filelist.p1 | sleuthkit | 93 |
| hashdeep.acquisition | ewfverify | 3 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 366963 |
| composite.file_staging | composite | 80 |
| bulk.duplicates | bulk_extractor | 88 |
| bulk.email | bulk_extractor | 6851 |
| bulk.ether | bulk_extractor | 6 |
| bulk.rfc822 | bulk_extractor | 7326 |
| bulk.url | bulk_extractor | 421750 |
| bulk.url_facebook-address | bulk_extractor | 19 |
| bulk.url_searches | bulk_extractor | 155 |
| bulk.url_services | bulk_extractor | 3637 |
| recycle_bin | icat | 16 |
| appfiles.program_files.eqnedt32.exe.manifest | icat | 17 |
| registry.profile | python-registry | 54 |
| appfiles.program_files.content.xml | icat | 432 |
| appfiles.program_files.auxbase.xml | icat | 22 |
| appfiles.program_files.auxpad.xml | icat | 5 |
| appfiles.program_files.ea.xml | icat | 7 |
| appfiles.program_files.keypadbase.xml | icat | 18 |
| appfiles.program_files.kor-kor.xml | icat | 7 |
| appfiles.program_files.keypad.xml | icat | 20 |
| appfiles.program_files.base.xml | icat | 44 |
| appfiles.program_files.basealtgr_rtl.xml | icat | 4 |
| appfiles.program_files.base_altgr.xml | icat | 44 |
| appfiles.program_files.base_ca.xml | icat | 44 |
| appfiles.program_files.base_heb.xml | icat | 25 |
| appfiles.users.manifest.json | icat | 23 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.base_kor.xml | icat | 8 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.base_rtl.xml | icat | 21 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.ja-jp.xml | icat | 218 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.ko-kr.xml | icat | 201 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.zh-changjei.xml | icat | 214 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.zh-dayi.xml | icat | 214 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.zh-phonetic.xml | icat | 214 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.main.xml | icat | 870 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.numbase.xml | icat | 22 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.numbers.xml | icat | 5 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.oskmenubase.xml | icat | 8 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.oskmenu.xml | icat | 5 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.osknumpadbase.xml | icat | 37 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.osknumpad.xml | icat | 5 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.oskpredbase.xml | icat | 15 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.oskpred.xml | icat | 5 |
| appfiles.program_files.ea-sym.xml | icat | 14 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.ja-jp-sym.xml | icat | 14 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.symbase.xml | icat | 47 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.symbols.xml | icat | 15 |
| appfiles.users.messages.json | icat | 12 |
| evtx.manifest | evtx-extract | 54 |
| appfiles.program_files.webbase.xml | icat | 17 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.web.xml | icat | 4 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 11 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.accessmui.xml | icat | 31 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.accessmuiset.xml | icat | 19 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.setup.xml | icat | 26 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.dcfmui.xml | icat | 25 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.setup.xml | icat | 24 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.excelmui.xml | icat | 40 |
| appfiles.users.verified_contents.json | icat | 2 |
| appfiles.program_files.setup.xml | icat | 33 |
| appfiles.users.manifest.json | icat | 20 |
| appfiles.program_files.groovemui.xml | icat | 22 |
| appfiles.users.manifest.json | icat | 23 |
| registry.system | regripper | 186 |
| appfiles.program_files.setup.xml | icat | 19 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.infopathmui.xml | icat | 25 |
| appfiles.users.messages.json | icat | 12 |
| registry.system | regripper | 7 |
| appfiles.program_files.setup.xml | icat | 21 |
| ez.prefetch | eztools | 193 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.lyncmui.xml | icat | 25 |
| registry.system | regripper | 7 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.setup.xml | icat | 21 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.branding.xml | icat | 617 |
| appfiles.users.messages.json | icat | 12 |
| registry.security | regripper | 69 |
| appfiles.program_files.officemui.xml | icat | 139 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.officemuiset.xml | icat | 19 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.setup.xml | icat | 114 |
| appfiles.users.messages.json | icat | 12 |
| registry.security | regripper | 8 |
| appfiles.program_files.office32mui.xml | icat | 37 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.setup.xml | icat | 37 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.office32ww.xml | icat | 133 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.onenotemui.xml | icat | 40 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.setup.xml | icat | 27 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.osmuxmui.xml | icat | 31 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.setup.xml | icat | 24 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.outlookmui.xml | icat | 67 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.setup.xml | icat | 53 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.powerpointmui.xml | icat | 37 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.setup.xml | icat | 25 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.proof.xml | icat | 34 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.proof.xml | icat | 37 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.proof.xml | icat | 37 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.proofing.xml | icat | 19 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.setup.xml | icat | 71 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.proplusrww.xml | icat | 517 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.setup.xml | icat | 460 |
| appfiles.users.messages.json | icat | 11 |
| appfiles.program_files.publishermui.xml | icat | 37 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.setup.xml | icat | 21 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.setup.xml | icat | 38 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.wordmui.xml | icat | 49 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.osmmui.xml | icat | 22 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.setup.xml | icat | 21 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.desktop.ini | icat | 13 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.indust.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.aftrnoon.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.arctic.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.axis.inf | icat | 42 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.blends.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| registry.software | regripper | 33492 |
| appfiles.program_files.bluecalm.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.blueprnt.inf | icat | 36 |
| appfiles.users.verified_contents.json | icat | 2 |
| appfiles.program_files.boldstri.inf | icat | 36 |
| appfiles.users.manifest.json | icat | 26 |
| appfiles.program_files.breeze.inf | icat | 36 |
| registry.software | regripper | 283 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.canyon.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.capsules.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.cascade.inf | icat | 42 |
| registry.software | regripper | 283 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.compass.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.concrete.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.deepblue.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.echo.inf | icat | 42 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.eclipse.inf | icat | 42 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.edge.inf | icat | 42 |
| registry.system | regripper | 5209 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.evrgreen.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.expeditn.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.ice.inf | icat | 36 |
| registry.system | regripper | 199 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.iris.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.journal.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.layers.inf | icat | 42 |
| appfiles.users.messages.json | icat | 12 |
| registry.system | regripper | 199 |
| appfiles.program_files.level.inf | icat | 42 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.network.inf | icat | 42 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.papyrus.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.pixel.inf | icat | 42 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.profile.inf | icat | 42 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.quad.inf | icat | 42 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.radial.inf | icat | 42 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.refined.inf | icat | 42 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.ricepapr.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.ripple.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.rmnsque.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.satin.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.sky.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.slate.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.sonora.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.spring.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.strtedge.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.studio.inf | icat | 42 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.sumipntg.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.themes.inf | icat | 211 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.water.inf | icat | 36 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.watermar.inf | icat | 42 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.handler.reg | icat | 15 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.handsafe.reg | icat | 17 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.filters.xml | icat | 318 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.timeline.cpu.xml | icat | 46 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.desktop.ini | icat | 4 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.desktop.ini | icat | 4 |
| appfiles.users.manifest.json | icat | 26 |
| appfiles.program_files.desktop.ini | icat | 4 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.desktop.ini | icat | 4 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.desktop.ini | icat | 4 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.desktop.ini | icat | 4 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.desktop.ini | icat | 4 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.aspect.xml | icat | 3 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.blue_green.xml | icat | 3 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.blue_ii.xml | icat | 3 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.blue_warm.xml | icat | 3 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.blue.xml | icat | 3 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.grayscale.xml | icat | 3 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.green_yellow.xml | icat | 3 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.green.xml | icat | 3 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.marquee.xml | icat | 3 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.median.xml | icat | 3 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.office_2007_-_2010.xml | icat | 3 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.orange_red.xml | icat | 3 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.orange.xml | icat | 3 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.paper.xml | icat | 3 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.red_orange.xml | icat | 3 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.red_violet.xml | icat | 3 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.red.xml | icat | 3 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.slipstream.xml | icat | 3 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.violet_ii.xml | icat | 3 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.violet.xml | icat | 3 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.yellow_orange.xml | icat | 3 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.yellow.xml | icat | 3 |
| appfiles.users.messages.json | icat | 12 |
| registry.system | regripper | 381 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.arial_black-arial.xml | icat | 74 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.arial-times_new_roman.xml | icat | 74 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.arial.xml | icat | 74 |
| appfiles.users.messages.json | icat | 12 |
| registry.system | regripper | 255 |
| appfiles.program_files.calibri_light-constantia.xml | icat | 74 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.calibri-cambria.xml | icat | 74 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.calibri.xml | icat | 74 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.cambria.xml | icat | 74 |
| appfiles.users.messages.json | icat | 12 |
| registry.system | regripper | 255 |
| appfiles.program_files.candara.xml | icat | 74 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.century_gothic-palatino_linotype.xml | icat | 75 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.century_gothic.xml | icat | 74 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.century_schoolbook.xml | icat | 74 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.program_files.consolas-verdana.xml | icat | 74 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.verified_contents.json | icat | 2 |
| appfiles.users.manifest.json | icat | 24 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
| appfiles.users.messages.json | icat | 12 |
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
| composite.correlation | composite | 1 |
| composite.file_staging | composite | 80 |
| composite.lateral_movement | composite | 386 |
| composite.execution | composite | 1498 |
| composite.defense_evasion | composite | 186 |
| composite.exfil | composite | 2467 |
| composite.timeline | composite | 1957 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
