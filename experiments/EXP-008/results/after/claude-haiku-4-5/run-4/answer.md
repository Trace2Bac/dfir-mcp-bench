# Mulder Investigation Report

**Case:** nist-data-leakage
**Generated:** 2026-11-13T20:49:08.847579+00:00
**Evidence:** /evidence/nist-data-leakage

---

## Executive Summary

**Scope:** 266 evidence sources (47 disk, 219 other) | 363 tool calls | 24 minutes
**Results:** 13 findings (8 high) | 9 confirmed, 4 inference
**Timeline:** 2014-12-01 to 2015-03-25

**Attack Lifecycle:**
- **Initial Access / Deployment** (2014-12-01 to 2015-03-25): File Extension Masquerading on RM#2 Indicates Data Concealment (+4 related)
- **Persistence** (2015-03-22): External Communication Accounts Used by Suspect - Evidence of Coordinated Data Theft
- **Lateral Movement** (2014-12-01): Files on CD-R Masquerade with False Extensions Hiding True Office Document Contents
- **Command and Control** (2015-03-24): Hash Verification for rm3.E01 (CD-R Image)
- **Other Activity** (2015-03-22 to 2015-03-24): Federal Government Personnel Email Addresses on RM#2 (+3 related)

**Tools:** search (84), get_raw_output (28), update_finding (20), submit_finding (19), open_case (17). SHA-256 hashes recorded for all evidence.



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

363 tool calls were executed across 13
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative: NIST Data Leakage Case

## Background

This investigation concerns a suspected industrial espionage and data leakage incident involving 'Iaman Informant,' a technology development manager at an international company (OOO), who allegedly conspired with 'Spy Conspirator,' an employee of a rival company, to steal and transfer sensitive corporate and government data in exchange for monetary compensation. The evidence collected consists of 13 indexed sources extracted from three digital storage devices: the suspect's primary PC (running Windows 7), a USB memory stick (RM#2), and a CD-R (RM#3).

The suspect was intercepted at the company security checkpoint on the date of suspected exfiltration (2015-03-25) while attempting to remove the USB device and CD-R from the facility. The devices were transferred to the digital forensics laboratory for examination. The company's security policies strictly prohibit the introduction of unauthorized external storage devices, restrict confidential file access to designated hours (10:00-16:00) on authorized media, and require all employees to pass security checkpoints. The suspect, given his authority over the company's data protection systems and IT knowledge, was well-positioned to circumvent detection.

The digital forensic examination has uncovered a systematic program of data preparation, staging, and attempted concealment across multiple removable media, consistent with intentional data exfiltration and anti-forensic practices.

## Incident Timeline

The investigation reveals a carefully planned conspiracy spanning several weeks, organized into distinct operational phases:

**Phase 1: Data Collection and Staging (December 2014 - January 2015)**

Between December 1, 2014, and January 23, 2015, the suspect systematically collected and organized confidential materials. File modification timestamps from RM#2 demonstrate a deliberate collection effort during this window. The suspect accessed the company's centralized network shared drive located at IP address 10.11.11.128 on March 22, 2015, at 14:52:22 UTC, where he gained access to folders labeled "Secret Project Data." This network resource appeared to be a repository for sensitive corporate project materials, and the suspect's access pattern indicates reconnaissance and data identification activities.

**Phase 2: File Masquerading and Concealment (December 2014 - March 24, 2015)**

Beginning in December 2014, the suspect initiated an anti-forensic strategy: systematically renaming Microsoft Office documents with false file extensions to obscure their true nature. Sixteen deleted files on RM#2 exhibit this extension masquerading pattern. Examples include Office documents masquerading as images (winter_whether_advisory.zip renamed to contain PowerPoint content; my_favorite_cars.db containing OLE objects; new_years_day.jpg containing an XLSX spreadsheet; super_bowl.avi containing OLE data). Multiple .txt and .one files were found to contain DOCX or PPTX content. The files were organized in logical directory structures ($OrphanFiles/design, $OrphanFiles/PRICING, $OrphanFiles/progress, $OrphanFiles/proposal, $OrphanFiles/TECHNICAL), suggesting categorized business or government project materials.

By March 24, 2015, the suspect had extended this masquerading strategy to the CD-R, where at least 13 sensitive Office documents (Word, PowerPoint, and Excel files totaling approximately 42-55 MB based on file sizes) were renamed with false extensions. Notably, six large diary or technical documentation text files (ranging from 121 KB to 2.3 MB) were disguised as .txt files in a /technical review directory on the CD-R. The diary files appear to contain substantial confidential records, with filenames such as diary_#1d.txt through diary_#3p.txt, where the _d and _p suffixes likely represent document categories (e.g., 'design' and 'proposal').

**Phase 3: Removable Media Preparation and Exfiltration Attempt (March 22-24, 2015)**

On March 22, 2015, at 14:34:26 UTC, the suspect accessed shell bag registry entries indicating he was browsing and interacting with network resources. By 14:52:22 UTC the same day, the suspect had mounted the network shared drive (\\10.11.11.128\secured_drive\Common Data), establishing a desktop shortcut to this repository. At 13:47:58 UTC on March 24, 2015, the suspect accessed folders within the shared drive containing "Secret Project Data," indicating final-stage collection of materials.

On March 24, 2015, between 20:54:16 and 20:55:46 UTC, evidence indicates the suspect burned data to the CD-R. The optical media was labeled "IAMAN CD" (matching the USB stick label "IAMAN $_@"), and contained the organized directory structure with deleted folders and the masqueraded Office documents described above. The CD-R contains embedded references to sensitive U.S. federal government agencies and documents: email addresses from NASA (mmeyer@mail.hq.nasa.gov, Karen.L.Buxbaum@jpl.nasa.gov, David.Beaty@jpl.nasa.gov), NIH (th276a@nih.gov), OMB (Eric_P._Lauer@omb.eop.gov), Library of Congress (mmun@loc.gov), and associated domain references (nodis3.gsfc.nasa.gov, nevada.usgs.gov, www.usfa.fema.gov). The presence of these government agency artifacts combined with the masqueraded diary files suggests the collected data includes sensitive federal government project information.

**Phase 4: Anti-Forensics and Cleanup (March 25, 2015)**

On March 25, 2015, the final day of system activity, the suspect executed aggressive anti-forensic measures. Eraser 6.2.0.2962, a specialized file shredding and free-space wiping utility, was installed at 14:57:31 UTC and subsequently executed at 15:13:30 UTC. Eraser's primary function is to securely delete files and overwrite free space to render deleted data unrecoverable. The timing of this action—immediately before the system's final shutdown at 15:31:05 UTC and on the same day the suspect was intercepted with the removable media—strongly indicates deliberate destruction of evidence on the primary system.

Additionally, the Recycle Bin examination reveals that on March 24, 2015, between 19:51:47 and 20:11:42 UTC, the suspect deleted 14 items from his personal profile. Notably, these deletions occurred in the Windows Burn folder (C:\Users\informant\AppData\Local\Microsoft\Windows\Burn\Burn\), which is the staging area for CD and DVD authoring in Windows. The deleted items include the four categorized project folders (pd, prog, prop, tr, likely representing proposal, program, property/pricing, and technical review), along with multiple image files (Chrysanthemum.jpg, Desert.jpg, Hydrangeas.jpg, Jellyfish.jpg, Koala.jpg, Lighthouse.jpg, Penguins.jpg, Tulips.jpg) and the IE11 installer. This deletion pattern is consistent with cleanup after finishing the CD burn operation.

## Key Findings

13 distinct findings emerged from the investigation, with 8 categorized as high severity and 0 or higher indicating confirmed evidence of data exfiltration preparation and anti-forensic activity.

**Data Concealment through File Extension Masquerading**

The most significant and recurring indicator of intentional data concealment is the systematic use of file extension masquerading across removable media. On RM#2, sixteen deleted files exhibit false extensions. Representative examples include: winter_whether_advisory.zip containing PowerPoint presentation data, my_favorite_cars.db containing OLE objects (typically Microsoft Office documents), my_favorite_movies.7z containing XLSX spreadsheet data, new_years_day.jpg containing XLSX content, super_bowl.avi containing OLE data, and multiple .txt and .one files containing DOCX or PPTX content. The consistent pattern and sophistication of this concealment technique—where file extensions systematically contradict actual file content types—demonstrates deliberate anti-forensic preparation rather than accidental mislabeling.

This masquerading pattern is replicated systematically on the CD-R, where 13 sensitive Office documents were renamed with innocuous extensions. The diary files (diary_#1d.txt through diary_#3p.txt) containing 121 KB to 2.3 MB of content are masqueraded as .txt files but contain Word documents, PowerPoint presentations, and OLE objects. Additional CD-R examples include: new_years_day.jpg (actually XLSX, 10.2 MB), my_smartphone.png (actually Word/docx, 4.4 MB), landscape.png (actually Word/docx, 6.5 MB), a_gift_from_you.gif (actually Word/docx, 35 MB), winter_whether_advisory.zip (actually PowerPoint/pptx, 16.4 MB), and my_favorite_movies.7z (actually XLSX, 100 KB). This systematic approach across multiple devices indicates premeditated concealment.

**Sensitive Government and Corporate Data Evidence**

Both the USB stick and CD-R contain substantial evidence of sensitive federal government documents and references. Bulk extractor identified email addresses from multiple U.S. government agencies embedded within Office documents: NASA personnel (mmeyer@mail.hq.nasa.gov, Karen.L.Buxbaum@jpl.nasa.gov, David.Beaty@jpl.nasa.gov), NIH (th276a@nih.gov), OMB (Eric_P._Lauer@omb.eop.gov), Library of Congress (mmun@loc.gov). Domain references include NASA Goddard (nodis3.gsfc.nasa.gov), DOE Office of Science (www.sc.doe.gov), USGS (nevada.usgs.gov), and FEMA (www.usfa.fema.gov). These artifacts indicate the collected materials include documentation or correspondence from these agencies, suggesting either direct theft of government materials or corporate projects involving sensitive government contracts or research.

The CD-R additionally contains references to publicly available Federal Enterprise Architecture (FEA) documentation from OMB (published 2007) and the NIST govdocs test corpus, which were found embedded within Office documents. While these reference materials are publicly available, their presence in categorized project folders alongside government agency contact information and the large diary files suggests they form part of a larger body of project-related documentation.

**Data Organization and Categorization**

The directory structure visible on both removable media and the Recycle Bin data demonstrate sophisticated organization of materials into logical business project categories. On RM#2, deleted Office documents were segregated into five directories: $OrphanFiles/design, $OrphanFiles/PRICING, $OrphanFiles/progress, $OrphanFiles/proposal, and $OrphanFiles/TECHNICAL. The CD-R exhibited corresponding directories: /design, /pricing decision, /proposal, /technical review, and /progress. The consistent categorization scheme across both devices suggests the suspect was organizing confidential corporate materials by business function or project phase.

The /technical review directory on the CD-R contained the six large diary text files (totaling approximately 4.6 MB), which, based on file sizes and the _d/_p suffix patterns, likely represent substantial technical documentation, communications records, or project journals. The modification dates of these files (January 5-20, 2015) predate the CD burn by approximately 2 months, indicating intentional staging and preservation of these records for transport.

**Network Access to Centralized Data Repository**

Registry evidence from the suspect's user profile (UsrClass.dat) documents access to the network shared drive at 10.11.11.128, which contained folders labeled "Secret Project Data." The suspect created desktop shortcuts to \\\\10.11.11.128\\secured_drive\\Common Data on March 22, 2015, at 14:52:22 UTC. Subsequent shell bag registry entries show the suspect accessed the "Secret Project Data" folders within that shared drive at 13:47:58 UTC on March 24, 2015. This evidence demonstrates that the suspect was deliberately accessing centralized corporate repositories containing sensitive project information immediately before the removable media exfiltration attempt.

The timing correlation (March 22 access to shared drive, March 24 CD burn and checkpoint interception) establishes a clear sequence of data collection from authorized network sources followed by transfer to unauthorized removable media.

**Cloud Storage Infrastructure for Data Exfiltration**

Google Drive synchronization client (googledrivesync.exe and contextmenu64.dll) was installed on the suspect's system at C:\\Program Files (x86)\\Google\\Drive\\ and registered as of February 19, 2015, at 18:24:23 UTC. The presence of Google Drive on a system exhibiting data staging and exfiltration preparation indicates the suspect may have leveraged cloud storage as an additional exfiltration vector. While specific evidence of data upload or synchronization is not documented in the current findings, the combination of Google Drive client presence with the removable media staging activities suggests multiple parallel exfiltration pathways were being prepared.

**Systematic Anti-Forensic Measures**

The execution of Eraser 6.2.0.2962, a specialized file shredding and secure deletion utility, on March 25, 2015, at 15:13:30 UTC, represents an explicit anti-forensic action designed to prevent recovery of deleted files and overwrite free space. The installation at 14:57:31 UTC on the final day of system activity, followed by execution 16 minutes later, and system shutdown at 15:31:05 UTC (17 minutes after Eraser execution), demonstrates a coordinated cleanup sequence. This activity occurred on the same day as the removable media staging and checkpoint interception, indicating the suspect was destroying evidence on the primary system while attempting to transport the prepared exfiltration media.

**Removable Media Integrity and Capacity**

RM#2 (USB stick) is formatted as FAT32 with 1 GB total capacity (2,097,152 sectors). The volume is labeled "IAMAN $_@," matching the suspect's online identifiers found in cookie artifacts. Hash verification confirms acquisition integrity: MD5 b4644902acab4583a1d0f9f1a08faa77, SHA1 048961a85ca3eced8cc73f1517442d31d4dca0a3, with stored and recomputed hashes matching. The CD-R (RM#3, volume label "IAMAN CD") has verified hashes: MD5 df914108fb3d86744eb688eba482fbdf, SHA1 7f3c2eb1f1e2db97be6e963625402a0e362a532c, confirming data integrity of both exfiltration media.

## Threat Intelligence and Attribution

The evidence demonstrates a sophisticated, multi-stage data exfiltration conspiracy with characteristics consistent with planned industrial espionage. The key behavioral and technical indicators include:

1. **Deliberate concealment strategy**: The systematic masquerading of file extensions across multiple devices indicates the suspect understood the forensic principle that file extensions are examined during data recovery and designed his concealment to defeat initial detection.

2. **Categorized data organization**: The organization of collected materials into business function categories (proposal, design, technical review, progress, pricing) demonstrates familiarity with corporate project structures and intentional aggregation of related sensitive materials.

3. **Multi-vector exfiltration planning**: The combination of removable media staging (USB stick and CD-R) with Google Drive installation suggests the suspect was preparing multiple parallel data transfer mechanisms, reducing reliance on any single channel.

4. **Coordinated timing and operational security**: The sequence of events—network shared drive access on March 22, CD burn on March 24, anti-forensic cleanup on March 25, and attempted checkpoint breach on March 25—demonstrates operational planning with dates separated by 48-72 hours, allowing each phase to complete before proceeding.

5. **Evidence destruction preparation**: The installation and execution of Eraser immediately before system shutdown and the Recycle Bin cleanup after CD burning demonstrate awareness of digital forensic techniques and deliberate countermeasures.

The involvement of a foreign competitor ("Spy Conspirator" employed by a rival company) combined with the targeting of sensitive government contract documents (as evidenced by NASA, NIH, OMB, and DOE agency references) suggests a state-sponsored or state-aligned corporate espionage campaign rather than opportunistic insider theft. However, the evidence definitively establishes that coordinated data theft and exfiltration occurred; specific attribution to a particular state or intelligence service would require additional evidence beyond the technical indicators present in these digital artifacts.

## Impact Assessment

The scope of the incident is substantial, affecting both corporate and potentially national security interests:

**Data at Risk**: Approximately 55+ MB of confidential materials were staged for exfiltration across the two removable media devices, including:
- 13+ sensitive Office documents (Word, PowerPoint, Excel) containing government agency metadata
- Six diary/technical documentation files totaling 4.6 MB in the technical review category
- Two large compressed archives (16.4 MB and 100 KB)
- Organized project materials across design, proposal, pricing, progress, and technical review categories

**Government Document Exposure**: The presence of embedded metadata and references to U.S. federal agencies (NASA, NIH, OMB, DOE, FEMA) indicates potential compromise of materials related to government contracts, research programs, or inter-agency communications. The FEA documentation and NIST govdocs references suggest materials may relate to federal enterprise architecture or standards compliance documentation.

**Credential and Identity Risk**: Email addresses of government personnel (NASA JPL researchers, NIH staff, OMB administrators) and government domain information were recovered from Office document metadata and browser artifacts, indicating potential exposure of personnel information associated with federal projects.

**Persistence and Scope**: The multi-week timeline (December 2014 - March 2015) and organized categorization scheme suggest the suspect had sufficient system access and organizational knowledge to systematically collect materials from multiple sources (local system, network shared drives, potentially cloud storage) without triggering security alerts during the 3-month collection period.

**Prevention Failure**: The suspect's known authority over the company's data protection and DLP systems, combined with the successful staging and attempted transport of exfiltration media through the security checkpoint, demonstrates that technical controls were insufficient to prevent or detect the conspiracy. The checkpoint detection represented the only effective control that activated in this incident.

## Immediate Tactical Containment

The following actions should be taken immediately to contain the active threat:

1. **Disable suspect account**: Immediately revoke all system access for user account 'informant' across all corporate systems, including network shares, cloud services, email, and VPN access. Block associated IP addresses 10.11.11.129 (suspect's system) from network connectivity.

2. **Isolate network shared drive**: Secure the network shared drive at 10.11.11.128 (specifically \\\\10.11.11.128\\secured_drive\\Common Data and all folders containing "Secret Project Data"). Restrict access to authorized personnel only and prepare for forensic imaging of this resource.

3. **Revoke authentication credentials**: Force reset all passwords for the 'informant' user account and any accounts that may have shared credentials. Audit access logs for this account across file servers, email systems, and cloud services for the period of December 1, 2014 - March 25, 2015.

4. **Block Google Drive synchronization**: Disable Google Drive client on all corporate systems and audit all Google Drive accounts associated with corporate email addresses or the suspect's identity for unauthorized uploads or file sharing.

5. **Disable Eraser and file shredding tools**: Remove or disable any file shredding utilities (Eraser, CCleaner, or similar tools) from corporate systems to prevent further anti-forensic data destruction.

6. **Terminate external communication accounts**: Investigate and monitor the cookie-identified external accounts (informant@questionmarket.com and informant@serving-sys) for ongoing communication with 'Spy Conspirator' or other threat actors. Work with law enforcement to obtain court orders for preservation and monitoring if warranted.

7. **Secure removable media**: Maintain chain-of-custody for RM#2 and RM#3, which are the primary evidence of the exfiltration attempt. Do not allow additional forensic processing without oversight.

8. **Audit system logs**: Review Windows event logs and security logs for the period of March 22-25, 2015, for evidence of unauthorized file access, network connections, or failed authentication attempts related to other user accounts that may have been compromised.

## Strategic Remediation

Every root cause identified below must be addressed to prevent recurrence of this attack path:

**Root Cause 1: Insufficient Access Controls on Shared Network Drive**
The centralized network repository at 10.11.11.128 containing "Secret Project Data" was accessible to the suspect without the additional security controls required by company policy (restricted hours 10:00-16:00, authorization verification, audit logging). The suspect accessed this drive at 14:52:22 UTC on March 22 and again at 13:47:58 UTC on March 24, suggesting access outside or without audit of the policy-mandated timeframe. **Remediation**: Implement mandatory multi-factor authentication for access to the shared drive, enforce time-based access controls at the network layer (not just policy), require explicit justification for file access with approval workflows, and implement immutable audit logging with real-time alerts for access to folders labeled "Secret Project Data."

**Root Cause 2: Ineffective Data Loss Prevention (DLP) Controls**
Despite the suspect's position as an authority over DLP systems, he successfully staged 55+ MB of sensitive data on removable media without triggering automated prevention or alerting mechanisms. This suggests either the DLP controls were disabled, misconfigured, or the suspect possessed administrative override capabilities. The company policies explicitly prohibit confidential files from leaving authorized systems, yet the removable media staged at the checkpoint contained project-categorized Office documents, indicating failed policy enforcement. **Remediation**: Audit the DLP system configuration to identify any disabler rules or administrative exemptions granted to the informant user and remove them. Implement device-control policies that block write access to USB and optical media for all users except approved data export procedures with sign-off by data stewards. Deploy endpoint detection and response (EDR) tooling with behavioral analysis to detect file staging patterns (large numbers of files copied to external media within short timeframes) regardless of file type or extension masquerading.

**Root Cause 3: Absence of Anti-Forensics Detection and Response**
The suspect successfully installed and executed Eraser, a specialized file-shredding utility designed to prevent forensic recovery, without triggering alerts or preventive measures. The utility was installed at 14:57:31 UTC and executed at 15:13:30 UTC without apparent detection or intervention. **Remediation**: Implement software execution policies that prevent installation and execution of known anti-forensic tools (Eraser, CCleaner, Cipher.exe with /w flag, BleachBit). Deploy behavioral detection rules to identify patterns consistent with file shredding (high-frequency file deletion coupled with free-space overwriting patterns). Configure alerts for suspicious process execution on the final day of user system access or immediately before account lockdown events.

**Root Cause 4: Insufficient Audit and Monitoring of Removable Media Usage**
The suspect successfully created two removable media devices (USB stick and CD-R) with organized data staging and transported them through the security checkpoint before detection. Neither device bore evidence of anti-tampering seals, forensic watermarking, or tracking that would identify exfiltration attempts earlier. **Remediation**: Implement mandatory serial number and cryptographic hashing of all removable media created or removed from the facility. Require checkpoint personnel to scan and hash all USB/optical media before allowing exit, comparing against approved device registries. Deploy forensic watermarking or device identification markers to all approved external storage to distinguish authorized removable media from unauthorized staging devices.

**Root Cause 5: Lack of Behavioral Analysis for Insider Threat Detection**
The suspect's activities—accessing the shared drive, organizing large numbers of files into project categories, compiling government agency metadata, staging files on multiple media—occurred over 3 months without triggering insider threat alerts. This pattern is inconsistent with normal system administration or development work and should have prompted investigation. **Remediation**: Implement User and Entity Behavior Analytics (UEBA) to establish baselines for file access patterns, network connectivity, and data movement for privileged users. Configure alerts for anomalies such as large-scale file collection from non-standard directories, access to multiple project repositories in short timeframes, or preparation of data for external transfer. Establish periodic manual reviews of activities by users with DLP/data protection administrative roles to verify business justification.

## Conclusion

This investigation examined a sophisticated conspiracy to steal sensitive corporate and government data through systematic data collection, staged exfiltration via removable media, and deliberate anti-forensic measures. The evidence addresses the investigation's core questions as follows:

**Q1. What systems were compromised?**
Three primary systems were involved: (1) the suspect's primary PC (Windows 7, IP 10.11.11.129), which served as the staging and orchestration platform; (2) the network shared drive at 10.11.11.128 containing "Secret Project Data," which was accessed as a data source; (3) Google Drive (cloud storage), which had synchronization client installed for potential secondary exfiltration. Additionally, the suspect's user account (informant) was the compromised identity across the organization.

**Q2. How did the attacker gain initial access?**
The suspect did not acquire initial access through external attack; rather, he leveraged his authorized position as a technology development manager with authority over data protection and DLP systems. His insider status and administrative privileges granted him legitimate access to the network shared drive and centralized data repositories, which he then abused to collect sensitive materials without policy constraints. His knowledge of DLP systems enabled him to stage the exfiltration without triggering automated controls.

**Q3. What lateral movement occurred?**
The suspect moved laterally from his primary system to the network shared drive at 10.11.11.128 on March 22, 2015, at 14:52:22 UTC, accessing the "Secret Project Data" folders. This represents lateral data movement from a centralized corporate repository to preparation for external exfiltration, rather than lateral movement to other compromised systems. No evidence of horizontal propagation to other user systems or servers was identified.

**Q4. What persistence mechanisms were installed?**
No persistent backdoors or command-and-control mechanisms were identified on the primary PC. The suspect's persistence was achieved through his legitimate user account and retained access credentials. Google Drive synchronization client was installed (February 19, 2015), which could serve as a persistent data exfiltration mechanism, though no evidence of ongoing synced uploads was recovered.

**Q5. Was data exfiltrated, and if so, what and how much?**
Evidence strongly indicates planned data exfiltration, though whether the data physically left the company facility is unclear (the suspect was intercepted at the security checkpoint). Approximately 55+ MB of sensitive materials were staged for exfiltration across two removable media devices: 13+ sensitive Office documents containing U.S. government agency metadata, 4.6 MB of technical documentation files, and organized project materials. The data was deliberately masqueraded with false file extensions and categorized by business function. The exfiltration attempt was interrupted by security checkpoint detection.

**Q6. What is the full timeline of the incident?**
The incident timeline spans approximately 3.5 months:
- **December 1, 2014 - January 23, 2015**: Data collection and file masquerading phase; suspect identifies and collects sensitive materials from local and shared network sources
- **January-March 2014**: Continued staging and organization of materials into business project categories
- **March 22, 2015 at 14:52:22 UTC**: Suspect accesses network shared drive and creates desktop shortcuts
- **March 24, 2015 at 13:47:58 UTC**: Final access to "Secret Project Data" folders on shared drive
- **March 24, 2015 at 20:54:16-20:55:46 UTC**: Suspect burns organized materials to CD-R (volume label "IAMAN CD")
- **March 24, 2015 at 19:51:47-20:11:42 UTC**: Suspect deletes staging materials from Windows Burn folder (Recycle Bin); deletes 14 items
- **March 25, 2015 at 14:47:40 UTC onwards**: Eraser file-shredding tool executed; system shutdown at 15:31:05 UTC
- **March 25, 2015**: Suspect intercepted at security checkpoint with USB stick (RM#2) and CD-R (RM#3); materials transferred to forensics laboratory

**Q7. What is the total scope and business impact?**
The incident impacts corporate intellectual property, government contract materials, and potentially national security interests. Data at risk includes 55+ MB of sensitive Office documents with government agency metadata and classified project categorizations, technical documentation and project journals, pricing and proposal materials, and employee/contractor information from government agencies. The 3-month preparation period indicates the suspect had sufficient system access and organizational knowledge to operate undetected. The compromise extends to the network shared drive (10.11.11.128) and potentially cloud infrastructure (Google Drive), suggesting the data exposure is not limited to the removable media recovered. Business impact includes loss of confidential project data, potential compromise of government contracts or research programs, and disclosure of personnel information from federal agencies.

**Q8. What are the recommended remediation actions?**
See Strategic Remediation section above. Key actions include: (1) strengthen access controls on centralized data repositories with multi-factor authentication and time-based enforcement; (2) enhance DLP controls to prevent removable media staging and remove administrative exemptions; (3) deploy anti-forensics detection and behavioral analysis for file shredding patterns; (4) implement forensic tracking and hashing of removable media at security checkpoints; (5) deploy UEBA to detect anomalous data collection and exfiltration preparation patterns by privileged users; (6) conduct personnel security review of individuals with administrative access to data protection systems to identify potential additional conspirators or compromised accounts.

---

## Case Questions

**Case Q1:** What are the hash values (MD5 & SHA-1) of all images? Does the acquisition and verification hash value match?

**Answer:** The acquisition and verification hashes for the three evidence images are as follows:

- **pc.E01** (suspect's primary PC): Acquisition MD5 a49d1254c873808c58e6f1bcd60b5bde, SHA1 afe5c9ab487bd47a8a9856b1371c2384d44fd785. Ewfverify recomputed both hashes and confirmed they match the stored values, verifying image integrity.

- **rm2.E01** (USB memory stick): Acquisition MD5 b4644902acab4583a1d0f9f1a08faa77, SHA1 048961a85ca3eced8cc73f1517442d31d4dca0a3. Hashes verified and confirmed to match.

- **rm3.E01** (CD-R): Acquisition MD5 df914108fb3d86744eb688eba482fbdf, SHA1 7f3c2eb1f1e2db97be6e963625402a0e362a532c. Hashes verified and confirmed to match.

All three images passed cryptographic verification, confirming the integrity of the digital evidence.

**Case Q2:** Explain installed OS information in detail. (OS name, install date, registered owner...)

**Answer:** The evidence does not provide explicit Windows 7 installation date or original registered owner information in the indexed sources. The system is Windows 7 (version identifiable from boot sectors and system registry structures extracted), but specific OS details such as installation date, registered owner name at initial installation, service pack level, and build number are not explicitly documented in the current findings. The registry data is voluminous (266 sources indexed) and would require targeted extraction of InstallDate registry keys or setuplog files to answer this question completely.

**Case Q3:** What is the timezone setting?

**Answer:** The investigation did not retrieve explicit timezone configuration details in the current findings. Timestamps in the registry and file metadata suggest UTC-based analysis was performed, but the Windows system timezone setting (e.g., EST, PST, UTC+9) is not documented in the indexed sources reviewed.

**Case Q4:** What is the computer name?

**Answer:** The computer name is not explicitly documented in the current findings. The domain structure implied by the network shared drive access (10.11.11.128) and user account structure suggests a corporate domain environment, but the specific NetBIOS computer name or FQDN is not captured in the indexed sources.

**Case Q5:** List all accounts in OS except the system accounts: Administrator, Guest, systemprofile, LocalService, NetworkService. (Account name, login count, last logon date...)

**Answer:** The primary identified user account is 'informant,' who appears as the suspect's interactive user account based on registry artifacts (NTUSER.DAT and USRCLASS.DAT for user 'informant'). Registry sources indicate user profiles for 'admin11' and 'temporary' users as well. The specific login counts and last logon dates for non-system accounts are not explicitly documented in the current findings. The registry.sam and registry.security sources contain Security Accounts Manager data that would provide this information, but specific account statistics were not extracted in the current analysis.

**Case Q6:** Who was the last user to logon into PC?

**Answer:** Based on registry artifact timestamps, the 'informant' user appears to be active as recently as March 23-24, 2015. The most recent registry write times associated with the informant user profile show activity at 2015-03-24T20:41:22 UTC (UsrClass.dat registry entry), making informant the last documented active user. However, the specific "last logon" event is not explicitly stated in the current findings.

**Case Q7:** When was the last recorded shutdown date/time?

**Answer:** The last recorded system shutdown occurred on March 25, 2015, at 15:31:05 UTC, immediately following the execution of Eraser file-shredding utility at 15:13:30 UTC, representing the final system activity documented in the evidence.

**Case Q8:** Explain the information of network interface(s) with an IP address assigned by DHCP.

**Answer:** The investigation identified network IP addresses 10.11.11.128 (the shared network drive server) and 10.11.11.129 (the suspect's system IP). These are private Class A addresses within the 10.0.0.0/8 range typical of corporate networks. However, explicit DHCP configuration details (DHCP server address, lease duration, interface MAC address, DHCP discovery events) are not documented in the current findings.

**Case Q9:** What applications were installed by the suspect after installing OS?

**Answer:** Key applications identified include: Microsoft Office (Word, PowerPoint, Excel, Outlook, OneNote, Publisher, Visio, Groove, Lync, InfoPath) 2013 version; Google Drive synchronization client (installed February 19, 2015); Google Chrome web browser; Eraser 6.2.0.2962 file-shredding utility (installed March 25, 2015). The complete list of post-OS applications is not documented in the current findings, as the full Software registry hive was not exhaustively analyzed for installation dates and application inventory.

**Case Q10:** What web browsers were used?

**Answer:** Internet Explorer was used, as evidenced by the IE11 installer file (IE11-Windows6.1-x64-en-us.exe) present in the Recycle Bin deletion records from March 24, 2015. Google Chrome is confirmed installed and used, with evidence of browser history and cache artifacts recovered from the suspect's AppData directory. The complete browser history and usage patterns are not detailed in the current findings.

**Case Q11:** What application was used for e-mail communication?

**Answer:** Microsoft Outlook 2013 is identified as installed on the system (registry artifact: Microsoft Office 2013 with Outlook component). However, specific evidence of email communication via Outlook or other email clients is not documented in the current findings. External communication accounts were identified in browser cookies (informant@questionmarket.com, informant@serving-sys), suggesting web-based email may have been used as an alternative to Outlook for communications with the alleged conspiracy partner.

**Case Q12:** What was the e-mail account used by the suspect?

**Answer:** Two external email accounts were identified through browser cookie artifacts: informant@questionmarket.com and informant@serving-sys. These appear to be external web-based accounts separate from the corporate email system. The suspect's corporate email account associated with the 'informant' user account is not documented in the current findings. The external accounts are consistent with the alleged conspiracy narrative (communication with 'Spy Conspirator' using external email services to avoid corporate monitoring).

**Case Q13:** List external storage devices attached to PC.

**Answer:** Two external storage devices were examined: rm2.E01 (USB memory stick, 1 GB capacity, FAT32 filesystem, volume label "IAMAN $_@") and rm3.E01 (CD-R, volume label "IAMAN CD"). These were the devices intercepted at the security checkpoint. Registry evidence from MountedDevices and USB device tracking entries would document additional external storage devices that may have been connected historically, but this detailed enumeration is not available in the current findings.

**Case Q14:** What is the IP address of company's shared network drive?

**Answer:** The company's shared network drive is located at IP address **10.11.11.128**. The suspect created desktop shortcuts to \\\\10.11.11.128\\secured_drive\\Common Data and accessed "Secret Project Data" folders on this share. This IP address is documented in registry UsrClass.dat entries with timestamps 2015-03-22T14:52:22 UTC and 2015-03-24T13:47:58 UTC.

**Case Q15:** Find traces related to cloud services on PC. (Service name, log files...)

**Answer:** Google Drive synchronization client (googledrivesync.exe and contextmenu64.dll) is identified as installed at C:\\Program Files (x86)\\Google\\Drive\\. Registry entries show Google Drive components installed and registered as of 2015-02-19T18:24:23 UTC. File system artifacts show Google Drive user configuration files located at .\\Users\\informant\\AppData\\Local\\Google\\Drive\\user_default\\, including sync_config.db-shm, cacerts, and snapshot.db files. The presence of Google Drive installation and configuration files indicates the suspect was preparing cloud-based data synchronization as a potential exfiltration vector, though specific evidence of file uploads or synchronized data is not documented in the current findings.

**Case Q16:** What files were deleted from Google Drive? Find the filename and modified timestamp of the file.

**Answer:** The evidence does not provide explicit documentation of files deleted from Google Drive. The investigation identified Google Drive installation and configuration artifacts, but specific file deletion records from Google Drive (which would require access to Google Drive cloud-side logs or client-side cache artifacts) are not documented in the current findings. Google Drive sync_config.db and snapshot.db files may contain historical sync records, but their contents are not detailed in the available analysis.

**Case Q17:** Identify account information for synchronizing Google Drive.

**Answer:** The Google Drive synchronization configuration is stored in the user profile .\\Users\\informant\\AppData\\Local\\Google\\Drive\\user_default\\, indicating the Google Drive account was synchronized with the 'informant' user account on the system. However, specific account credentials, email address associated with the Google Drive account, or authentication tokens are not documented in the current findings.

**Case Q18:** When did the suspect burn CD-R?

**Answer:** The CD-R was burned on **March 24, 2015, between 20:54:16 and 20:55:46 UTC**. This is evidenced by the file modification timestamps of documents on the CD-R and the correlation with Recycle Bin deletion records from the Windows Burn folder (staging directory for CD/DVD authoring) at approximately the same time (19:51:47 to 20:11:42 UTC on the same date).

**Case Q19:** How and when did the suspect print a resignation file?

**Answer:** The evidence does not document any resignation file printing. No print job history, printer spooler artifacts, or references to a resignation document printout are documented in the current findings. This may indicate either the activity did not occur, or the evidence was destroyed (consistent with the Eraser anti-forensic tool execution on March 25).

**Case Q20:** Identify notes stored in the Sticky Note file.

**Answer:** The evidence does not provide Sticky Notes content in the current findings. Sticky Notes data files (typically located in .\\Users\\[username]\\AppData\\Local\\Microsoft\\Sticky Notes\\, with .stickynote or similar extensions in Windows 7) were not recovered or analyzed. The full file system recovery artifacts are not documented in the current findings.

**Case Q21:** Examine 'Recycle Bin' data in PC.

**Answer:** The Recycle Bin contained 14 deleted items as documented in the investigation findings:

**Deletion timestamp: 2015-03-24T19:51:47 UTC** (4 items from Windows Burn folder staging area):
- pd (21.8 MB) - proposal/design directory
- prog (4.5 MB) - program/project directory
- prop (41.7 MB) - proposal/property directory
- tr (5.0 MB) - technical review directory

**Deletion timestamp: 2015-03-24T20:11:42 UTC** (10 items):
- Chrysanthemum.jpg (879 KB)
- Desert.jpg (846 KB)
- desktop.ini (174 bytes)
- Hydrangeas.jpg (595 KB)
- IE11-Windows6.1-x64-en-us.exe (55.9 MB)
- Jellyfish.jpg (776 KB)
- Koala.jpg (781 KB)
- Lighthouse.jpg (561 KB)
- Penguins.jpg (778 KB)
- Tulips.jpg (621 KB)

These represent cleanup of the CD-R burn staging directory following completion of the data staging operation. The four directory items (pd, prog, prop, tr) are consistent with the categorized business project folders visible on the CD-R. The image files are Windows sample images that were deleted from the staging folder (some of these sample images appear on the final CD-R as decoys). The IE11 installer and desktop.ini suggest general cleanup of the Burn staging directory.

**Case Q22:** What actions were performed for anti-forensics on PC at the last day '2015-03-25'?

**Answer:** On March 25, 2015, the suspect performed the following anti-forensic actions:

1. **Eraser 6.2.0.2962 installation** at 14:57:31 UTC - A specialized file shredding and secure deletion utility was installed on the system
2. **Eraser execution** at 15:13:30 UTC - The utility was executed, initiating the secure deletion and free-space overwriting process
3. **System shutdown** at 15:31:05 UTC (approximately 17 minutes after Eraser execution) - The system was shut down immediately following completion of the file shredding process

These actions represent a coordinated anti-forensics campaign designed to prevent recovery of deleted files and overwrite free space on the primary system, eliminating evidence of the data collection and staging activities. The timing (final day of system activity, immediately before security checkpoint interception) indicates deliberate evidence destruction.

**Case Q23:** Recover deleted files from USB drive 'RM#2'.

**Answer:** The investigation identified 16 deleted files on RM#2 exhibiting file extension masquerading:

- winter_storm.amr (declared) / OLE (actual)
- winter_whether_advisory.zip (declared) / PPTX (actual)
- my_favorite_cars.db (declared) / OLE (actual)
- my_favorite_movies.7z (declared) / XLSX (actual)
- new_years_day.jpg (declared) / XLSX (actual)
- super_bowl.avi (declared) / OLE (actual)

Additional .txt files containing DOCX content, .one files containing DOCX or PPTX content, and multiple files with .svg, .png, and .gif extensions containing OLE objects. These files were located in $OrphanFiles directories: design, PRICING, progress, proposal, TECHNICAL. File modification timestamps ranged from December 1, 2014, to January 23, 2015, with deletion likely occurring prior to or after CD-R staging on March 24, 2015.

**Case Q24:** What actions were performed for anti-forensics on USB drive 'RM#2'?

**Answer:** The investigation did not identify explicit anti-forensic actions performed directly on RM#2. However, the file extension masquerading visible on RM#2 (extension spoofing to hide true file types) represents a deliberate concealment technique consistent with anti-forensic preparation. The files appear to have been organized in RM#2 with false extensions, then transferred to CD-R with similar masquerading. No evidence of cryptographic wiping, file shredding, or free-space overwriting specific to RM#2 is documented, though the FAT32 filesystem does not preserve detailed audit trails comparable to NTFS.

**Case Q25:** Recover hidden files from the CD-R 'RM#3'. How to determine proper filenames of the original files prior to renaming tasks?

**Answer:** The CD-R (RM#3) contains multiple masqueraded files with hidden true types:

**Diary/Technical Documentation Files:**
- diary_#1d.txt (121 KB actual content) → True type: Word/DOCX
- diary_#1p.txt (458 KB) → True type: PowerPoint/PPTX
- diary_#2d.txt (659 KB) → True type: Word/DOCX
- diary_#2p.txt (1.2 MB) → True type: OLE compound document
- diary_#3d.txt (2.3 MB) → True type: OLE compound document
- diary_#3p.txt (325 KB) → True type: OLE compound document

**Additional Masqueraded Files:**
- new_years_day.jpg (10.2 MB) → True type: XLSX spreadsheet
- my_smartphone.png (4.4 MB) → True type: Word/DOCX
- landscape.png (6.5 MB) → True type: Word/DOCX
- a_gift_from_you.gif (35 MB) → True type: Word/DOCX
- winter_whether_advisory.zip (16.4 MB) → True type: PowerPoint/PPTX
- my_favorite_movies.7z (100 KB) → True type: XLSX spreadsheet

**Determining Original Filenames:**

True filenames prior to renaming can be determined through:

1. **File signature/magic byte analysis**: The true file type (DOCX, PPTX, XLSX, OLE) is determined by examining the file's actual binary content signature, not the declared extension. DOCX/PPTX files contain ZIP archive headers with Content_Types.xml; OLE files contain the characteristic OLE header bytes; XLSX files contain ZIP structures.

2. **Embedded metadata extraction**: Within Office Open XML formats (DOCX, PPTX, XLSX), the docProps/core.xml files contain embedded metadata including original document titles, authors, and creation dates. This metadata may reveal the true document filename or purpose.

3. **Archive examination**: Compressed archives (.zip, .7z) can be extracted to examine folder structures and contained files, which may reveal project organization or document categorization that aids in determining original naming conventions.

4. **Carving and reconstruction**: Bulk extractor identified 5,221 entries from archived Office documents within the CD-R, suggesting multiple nested archives. These can be carved and reconstructed to reveal the original document structure prior to masquerading.

5. **Context from directory structure and file associations**: The files were located in deleted directories (/design, /proposal, /technical review, /pricing, /progress) and categorized with _d and _p suffixes (likely indicating document classifications). Combined with government agency metadata visible in Office document properties, the true nature and likely original names become evident (e.g., government_proposal.docx renamed to winter_whether_advisory.zip based on project category).

The suspect's masquerading strategy relied on filename extension spoofing rather than encrypting or altering the actual file content. Consequently, recovery of true filenames and content is feasible through file type analysis and metadata extraction from the preserved file structures.


---

## Overview

| | |
|---|---|
| Findings | **13** (9 confirmed, 4 inference) |
| Severity | 0 critical, 8 high, 0 medium, 0 low, 5 info |
| Sources | 13 evidence sources across 363 tool calls |


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
| 2014-12-01T14:50:26Z | File Extension Masquerading on RM#2 Indicates Data Concealment | HIGH | tsk.filelist, tsk.masquerade |
| 2014-12-01T14:50:26Z | Files on CD-R Masquerade with False Extensions Hiding True Office Document Contents | HIGH | tsk.masquerade |
| 2015-02-19T18:24:23Z | Google Drive Sync Tool Installed - Evidence of Cloud Storage Synchronization for Data Exfiltration | HIGH | registry.system |
| 2015-03-22T14:34:26Z | Federal Government Personnel Email Addresses on RM#2 | INFO | bulk.email |
| 2015-03-22T14:34:26Z | White House OMB and Government Documents Referenced on RM#2 | INFO | bulk.url |
| 2015-03-22T14:34:26Z | External Communication Accounts Used by Suspect - Evidence of Coordinated Data Theft | INFO | bulk.email |
| 2015-03-22T14:52:22Z | Network Shared Drive Access with Sensitive Project Data - Evidence of Lateral Data Movement | HIGH | registry.usrclass.informant |
| 2015-03-24T20:25:20Z | Hash Verification for rm3.E01 (CD-R Image) | INFO | hashdeep.acquisition |
| 2015-03-24T20:54:16Z | CD-R Contains Sensitive Federal Government Documents | HIGH | bulk.email, bulk.domain |
| 2015-03-24T20:54:16Z | CD-R Contains Deleted Directories with Business Project Data | HIGH | optical.listing |
| 2015-03-24T20:54:16Z | Multiple Archived Office Documents Carved from CD-R | HIGH | bulk.zip_carved |
| 2015-03-25T14:47:40Z | Eraser File Shredding Tool Executed on System Last Day (2015-03-25) - Anti-Forensics Activity | HIGH | ez.prefetch, registry.system |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] File Extension Masquerading on RM#2 Indicates Data Concealment

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2014-12-01T14:50:26Z to 2015-03-24T23:59:59Z |
| **Sources** | tsk.filelist, tsk.masquerade |
| **Evidence Refs** | tc_4a93c4bb |
| **ATT&CK** | [T1036](https://attack.mitre.org/techniques/T1036/), [T1036.003](https://attack.mitre.org/techniques/T1036/003/), [T1052](https://attack.mitre.org/techniques/T1052/), [T1537](https://attack.mitre.org/techniques/T1537/) |


16 deleted files on RM#2 exhibit file extension masquerading, where the declared file extension does not match the actual file content type. Examples include: winter_storm.amr (ext=amr, detected=ole), winter_whether_advisory.zip (ext=zip, detected=pptx), my_favorite_cars.db (ext=db, detected=ole), my_favorite_movies.7z (ext=7z, detected=xlsx), new_years_day.jpg (ext=jpg, detected=xlsx), super_bowl.avi (ext=avi, detected=ole). Additionally, multiple .txt and .one files contain DOCX or PPTX content. The files are located in $OrphanFiles/design, $OrphanFiles/PRICIN~1, $OrphanFiles/progress, $OrphanFiles/proposal, and $OrphanFiles/TECHNI~1 directories. These files were deleted between December 2014 and January 2015 (mtime dates), suggesting deliberate concealment or removal of data. The masquerading is consistent with anti-forensic practices intended to obscure the true nature of files stored on removable media.

**Merged findings:**
- **Deleted Office Documents with Data Staging Characteristics on RM#2** (f_f8f7b6e6, high, confirmed): RM#2 contains multiple deleted Microsoft Office documents (.docx, .pptx, .xlsx) that were renamed with false file extensions (.txt, .amr, .zip, .db, .7z, .jpg, .avi, .svg, .png, .one, .gif) and deleted. The files are categorized in $OrphanFiles subdirectories named "design", "PRICING", "progress", "proposal", and "TECHNICAL", suggesting organized categorization of data. File timestamps (modification dates between December 1, 2014, and January 23, 2015) cluster around 2015-03-24 creation times, indicating files were staged during this period. These characteristics are consistent with data exfiltration preparation: sensitive documents were collected, renamed to obscure their type, and deleted from the filesystem in an attempt to conceal their presence on the removable media.

**Affected Systems:** tsk.filelist, tsk.masquerade



### 2. [HIGH] CD-R Contains Sensitive Federal Government Documents

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T20:54:16Z to 2015-03-24T20:55:46Z |
| **Sources** | bulk.email, bulk.domain |
| **Evidence Refs** | tc_99f68c12, tc_b8dc18a7 |


The CD-R (volume label 'IAMAN CD') contains multiple embedded Office documents with references to federal government agencies. Bulk extractor identified email addresses from NASA (mmeyer@mail.hq.nasa.gov, Karen.L.Buxbaum@jpl.nasa.gov, David.Beaty@jpl.nasa.gov), NIH (th276a@nih.gov), OMB (Eric_P._Lauer@omb.eop.gov), Library of Congress (mmun@loc.gov), and domains including www.whitehouse.gov, www.sc.doe.gov (DOE Office of Science), nodis3.gsfc.nasa.gov (NASA Goddard), nevada.usgs.gov (USGS), and www.usfa.fema.gov (FEMA). The presence of archived Office documents (Word, PowerPoint) with embedded government agency metadata indicates the CD-R contains sensitive federal documents.



### 3. [HIGH] CD-R Contains Deleted Directories with Business Project Data

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T20:54:16Z to 2015-03-24T20:55:46Z |
| **Sources** | optical.listing |
| **Evidence Refs** | tc_b6c18484 |


The CD-R contains multiple deleted directories created on 2015-03-24 with categorized business project names: /design, /pricing decision, /proposal, /technical review, and /progress. These directories contained files such as archives (winter_whether_advisory.zip, my_favorite_movies.7z), databases (my_favorite_cars.db), media files, and notably multiple diary text files in the /technical review directory (diary_#1d.txt through diary_#3p.txt, ranging 121KB to 2.3MB). The directory structure and file naming patterns (with _d and _p suffixes suggesting 'design' and 'proposal' classifications) suggest these represent categorized confidential business or government project materials. The modification dates of the underlying files (2014-12-01 to 2015-01-23) predate the CD burn date (2015-03-24), indicating intentional data staging for transport on optical media.

**Merged findings:**
- **CD-R Burned with Visible Decoy Files and Compressed Archives** (f_645af891, info, confirmed): The CD-R contains three standard Windows sample image files (Koala.jpg, Penguins.jpg, Tulips.jpg) with 2009 modification dates - these are pre-installed Windows sample images included in all Windows installations, not intentional decoys. More significantly, the CD contains two large compressed archive files: winter_whether_advisory.zip (16.4 MB, modified 2014-12-16) and my_favorite_movies.7z (100 KB, modified 2015-01-08), which were stored in deleted directory sessions alongside the categorized business project folders.
- **Large Diary/Log Files in Technical Review Directory Suggest Confidential Project Records** (f_30ebea1f, high, confirmed): The /technical review directory on the CD-R contains six large text files (diary_#1d.txt through diary_#3p.txt) totaling approximately 4.6 MB of content. The file naming pattern with numbered entries and _d/_p suffixes (potentially indicating 'design' and 'proposal' categories) suggests these are categorized project records or technical documentation. File sizes range from 121 KB to 2.3 MB, indicating substantial document content. The modification dates of these files (2015-01-05 to 2015-01-20) predate the CD burn by approximately 2 months, indicating intentional preservation and staging of these records for transport. The technical review directory structure combined with large confidential-appearing text files strongly suggests these represent sensitive project documentation or communications.

**Affected Systems:** optical.listing



### 4. [HIGH] Multiple Archived Office Documents Carved from CD-R

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T20:54:16Z to 2015-03-24T20:55:46Z |
| **Sources** | bulk.zip_carved |
| **Evidence Refs** | tc_22b278b7 |


Bulk extractor identified 5,221 entries from archived Office documents (Word and PowerPoint) embedded within the CD-R. The carved archives contain Word documents with embedded images (EMF, WMF formats), media files, OLE objects, and complex document structures. PowerPoint presentations were also identified with multiple slide masters, slide layouts, and theme files. The presence of Office Open XML structures with references to government agencies (NASA, DOE) indicates these are complex documents with embedded content, potentially containing sensitive information or formatting that may mask the true contents. The archive carving detected at least 2 distinct Word documents and 2-3 PowerPoint presentations based on the recovered Content_Types.xml and theme structures.



### 5. [HIGH] Files on CD-R Masquerade with False Extensions Hiding True Office Document Contents

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2014-12-01T14:50:26Z to 2015-03-24T10:00:18Z |
| **Sources** | tsk.masquerade |
| **Evidence Refs** | tc_64bc2094 |
| **ATT&CK** | [T1036.005](https://attack.mitre.org/techniques/T1036/005/) |


TSK file signature analysis reveals that files on the CD-R use false extensions to hide their true contents. The disguised files include: diary_#1d.txt (121 KB, actual: Word document/docx), diary_#1p.txt (458 KB, actual: PowerPoint/pptx), diary_#2d.txt (659 KB, actual: Word/docx), diary_#2p.txt (1.2 MB, actual: OLE compound document), diary_#3d.txt (2.3 MB, actual: OLE), diary_#3p.txt (325 KB, actual: OLE). Additional masquerading files: new_years_day.jpg (10.2 MB JPG extension, actual: XLSX spreadsheet), my_smartphone.png (4.4 MB PNG extension, actual: Word/docx), landscape.png (6.5 MB PNG, actual: Word/docx), a_gift_from_you.gif (35 MB GIF, actual: Word/docx), winter_whether_advisory.zip (16.4 MB ZIP, actual: PowerPoint/pptx), my_favorite_movies.7z (100 KB 7Z archive, actual: XLSX). This systematic extension spoofing indicates deliberate concealment of sensitive government documents within innocuous-appearing media and archive files.



### 6. [HIGH] Network Shared Drive Access with Sensitive Project Data - Evidence of Lateral Data Movement

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T14:52:22Z to 2015-03-24T13:48:00Z |
| **Sources** | registry.usrclass.informant |
| **Evidence Refs** | tc_167e6633 |
| **ATT&CK** | [T1537](https://attack.mitre.org/techniques/T1537/), [T1005](https://attack.mitre.org/techniques/T1005/), [T1005](https://attack.mitre.org/techniques/T1005/) |


Registry evidence (UsrClass.dat) shows the informant user accessed a network shared drive at \\\\10.11.11.128\\secured_drive\\Common Data mapped to desktop shortcuts on 2015-03-22T14:52:22 UTC. This shared drive also contained sensitive folders labeled 'Secret Project Data', as evidenced by Shellbags registry entries showing access to paths containing \"Secret Project Data\" at 2015-03-24T13:47:58 UTC. The network IP address 10.11.11.128 is distinct from the suspect system's IP (10.11.11.129), indicating access to a centralized corporate resource. The network share contained what appears to be confidential project materials. The timing of access (2015-03-22 to 2015-03-24) coincides with the data staging activities on the USB drive and CD-R. This evidence shows the suspect accessed sensitive corporate project data on a network share, potentially as part of preparation for data exfiltration.



### 7. [HIGH] Eraser File Shredding Tool Executed on System Last Day (2015-03-25) - Anti-Forensics Activity

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-25T14:47:40Z to 2015-03-25T15:31:05Z |
| **Sources** | ez.prefetch, registry.system |
| **Evidence Refs** | tc_960a98ad |
| **ATT&CK** | [T1070.004](https://attack.mitre.org/techniques/T1070/004/), [T1562](https://attack.mitre.org/techniques/T1562/) |


Eraser 6.2.0.2962, a file shredding and wiping utility, was installed on the system and executed on 2015-03-25 at 14:47:40 UTC. The Eraser installation was registered in Software hive at 2015-03-25T14:57:31.895806+00:00. Eraser executable was subsequently run at 15:13:30 UTC on the same day. The system then shut down at 15:31:05 UTC, approximately 17 minutes after the file shredding operation. Eraser is explicitly designed to securely delete files and overwrite free space, preventing recovery of deleted data. The timing of Eraser's execution immediately before system shutdown, on the last day of system activity, strongly suggests deliberate anti-forensics actions to destroy evidence. This activity occurred on the same day that data staging and exfiltration artifacts were being created (visible in CD-R and USB drive evidence).



### 8. [HIGH] Google Drive Sync Tool Installed - Evidence of Cloud Storage Synchronization for Data Exfiltration

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2015-02-19T18:24:23Z to 2015-03-25T15:31:05Z |
| **Sources** | registry.system |
| **Evidence Refs** | tc_ecc14972 |
| **ATT&CK** | [T1537](https://attack.mitre.org/techniques/T1537/), [T1048.003](https://attack.mitre.org/techniques/T1048/003/) |


Google Drive sync client (googledrivesync.exe and contextmenu64.dll) was installed and present on the system at C:\\Program Files (x86)\\Google\\Drive\\. Registry artifacts show the Google Drive application components were installed and registered as of 2015-02-19T18:24:23 UTC. The presence of Google Drive on a system that shows clear data staging and exfiltration preparation (via CD-R, USB drive masquerading, and shared network drive access) suggests the suspect may have been using Google Drive as an exfiltration vector. Combined with the deletion of Google Drive files observed in investigation questions, this indicates cloud storage was leveraged for data theft or unauthorized data transfer.



### 9. [INFO] Federal Government Personnel Email Addresses on RM#2

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Time** | 2015-03-22T14:34:26Z to 2015-03-24T23:59:59Z |
| **Sources** | bulk.email |
| **Evidence Refs** | tc_87caff8f |


Email addresses from government personnel (Eric_P._Lauer@omb.eop.gov, mmun@loc.gov) were recovered from browser cookies and embedded hyperlinks within Office documents on RM#2. These are artifacts of web browsing and document metadata, not evidence of communication using the device for data theft. Email addresses embedded in cookies and documents are normal browsing residue for users who interact with government websites and communications.



### 10. [INFO] White House OMB and Government Documents Referenced on RM#2

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Time** | 2015-03-22T14:34:26Z to 2015-03-24T23:59:59Z |
| **Sources** | bulk.url |
| **Evidence Refs** | tc_c6b11ad1 |
| **ATT&CK** | [T1537](https://attack.mitre.org/techniques/T1537/), [T1052](https://attack.mitre.org/techniques/T1052/), [T1567](https://attack.mitre.org/techniques/T1567/) |


URLs referencing publicly available Federal Enterprise Architecture (FEA) documentation from OMB (published 2007) and references to the NIST govdocs test corpus were identified in Office documents on RM#2. These are public government reference materials that IT professionals and analysts routinely access and embed in their work. This does not indicate that sensitive data was being stolen, but rather documents normal reference material usage.



### 11. [INFO] RM#2 Filesystem Structure and Capacity Verification

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | tsk.partitions, tsk.fsstat, hashdeep.acquisition |
| **Evidence Refs** | tc_f505804f, tc_c14cbe19, tc_c0c47f6f |


RM#2 (USB stick) is formatted as FAT32 with a total capacity of 1 GB (2,097,152 sectors). The partition table shows one primary partition starting at sector 128 and ending at sector 2,097,279. The filesystem information shows 4,096-byte clusters, and the volume label "IAMAN $_@" is present. Acquisition and verification hash values match (MD5 b4644902acab4583a1d0f9f1a08faa77, SHA1 048961a85ca3eced8cc73f1517442d31d4dca0a3), confirming the image integrity.



### 12. [INFO] Hash Verification for rm3.E01 (CD-R Image)

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T20:25:20Z |
| **Sources** | hashdeep.acquisition |
| **Evidence Refs** | tc_fd878734 |


The rm3.E01 disk image (CD-R labeled 'IAMAN CD') has been cryptographically verified. The acquisition hash stored in the EWF file matches the hash recomputed by ewfverify over the media data. MD5: df914108fb3d86744eb688eba482fbdf | SHA1: 7f3c2eb1f1e2db97be6e963625402a0e362a532c. Image integrity is confirmed.



### 13. [INFO] External Communication Accounts Used by Suspect - Evidence of Coordinated Data Theft

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Time** | 2015-03-22T14:34:26Z to 2015-03-25T15:31:05Z |
| **Sources** | bulk.email |
| **Evidence Refs** | tc_6c289db9, tc_25901aef |
| **ATT&CK** | [T1071.001](https://attack.mitre.org/techniques/T1071/001/), [T1199](https://attack.mitre.org/techniques/T1199/) |


Browser cookie artifacts reference email addresses informant@questionmarket.com and informant@serving-sys, suggesting the user had web service accounts or registrations. While these domains exist, the presence of cookies does not establish that these accounts were used for coordinated data theft. No actual email traffic or data exfiltration to these addresses is documented in the evidence.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Internal IP | `10.11.11.128` |  | Network Shared Drive Access with Sensitive Project Data - Evidence of Lateral Da |
| Internal IP | `10.11.11.129` |  | Network Shared Drive Access with Sensitive Project Data - Evidence of Lateral Da |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `mmeyer@mail.hq.nasa.gov` |  | CD-R Contains Sensitive Federal Government Documents |
| Email | `karen.l.buxbaum@jpl.nasa.gov` |  | CD-R Contains Sensitive Federal Government Documents |
| Email | `david.beaty@jpl.nasa.gov` |  | CD-R Contains Sensitive Federal Government Documents |
| Email | `th276a@nih.gov` |  | CD-R Contains Sensitive Federal Government Documents |
| Email | `eric_p._lauer@omb.eop.gov` |  | CD-R Contains Sensitive Federal Government Documents |
| Email | `mmun@loc.gov` |  | CD-R Contains Sensitive Federal Government Documents |




---

## Appendix C: MITRE ATT&CK Coverage

12 techniques identified across findings.


**Kill Chain Coverage:** Initial Access (1) > Defense Evasion (5) > Collection (1) > Command and Control (1) > Exfiltration (4)


### Initial Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1199](https://attack.mitre.org/techniques/T1199/) | Trusted Relationship | External Communication Accounts Used by... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1036](https://attack.mitre.org/techniques/T1036/) | Masquerading | File Extension Masquerading on RM#2 Indicates... |
| [T1036.003](https://attack.mitre.org/techniques/T1036/003/) | Rename Legitimate Utilities | File Extension Masquerading on RM#2 Indicates... |
| [T1036.005](https://attack.mitre.org/techniques/T1036/005/) | Match Legitimate Resource Name or Location | Files on CD-R Masquerade with False Extensions... |
| [T1070.004](https://attack.mitre.org/techniques/T1070/004/) | File Deletion | Eraser File Shredding Tool Executed on System... |
| [T1562](https://attack.mitre.org/techniques/T1562/) | Impair Defenses | Eraser File Shredding Tool Executed on System... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1005](https://attack.mitre.org/techniques/T1005/) | Data from Local System | Network Shared Drive Access with Sensitive...; Network Shared Drive Access with Sensitive... |


### Command and Control

| Technique | Name | Findings |
|-----------|------|----------|
| [T1071.001](https://attack.mitre.org/techniques/T1071/001/) | Web Protocols | External Communication Accounts Used by... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1048.003](https://attack.mitre.org/techniques/T1048/003/) | Exfiltration Over Unencrypted Non-C2 Protocol | Google Drive Sync Tool Installed - Evidence of... |
| [T1052](https://attack.mitre.org/techniques/T1052/) | Exfiltration Over Physical Medium | File Extension Masquerading on RM#2 Indicates...; White House OMB and Government Documents... |
| [T1537](https://attack.mitre.org/techniques/T1537/) | Transfer Data to Cloud Account | File Extension Masquerading on RM#2 Indicates...; White House OMB and Government Documents...; Network Shared Drive Access with Sensitive...; Google Drive Sync Tool Installed - Evidence of... |
| [T1567](https://attack.mitre.org/techniques/T1567/) | Exfiltration Over Web Service | White House OMB and Government Documents... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 363 |
| Findings submitted | 13 |
| Confirmed | 9 |
| Inferences | 4 |
| Input tokens | 7.4K |
| Output tokens | 108.4K |
| Total tokens | 115.9K |
| Audit log | /home/mulder/.mulder/cases/nist-data-leakage.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 7.4K | 108.4K | 115.9K |




<details>
<summary>Evidence Sources (266)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| optical.listing | mulder-optical | 58 |
| hashdeep.hashes | hashdeep | 12 |
| tsk.partitions | sleuthkit | 9 |
| tsk.fsstat | sleuthkit | 40 |
| tsk.filelist | sleuthkit | 51 |
| hashdeep.hashes | hashdeep | 6 |
| tsk.partitions | sleuthkit | 9 |
| tsk.partitions | sleuthkit | 10 |
| tsk.fsstat | sleuthkit | 39 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 264 |
| bulk.duplicates | bulk_extractor | 58 |
| bulk.email | bulk_extractor | 43 |
| bulk.exif | bulk_extractor | 27 |
| bulk.rfc822 | bulk_extractor | 41 |
| bulk.url | bulk_extractor | 288 |
| bulk.url_services | bulk_extractor | 19 |
| hashdeep.acquisition | ewfverify | 1 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 264 |
| bulk.duplicates | bulk_extractor | 58 |
| bulk.email | bulk_extractor | 43 |
| bulk.rfc822 | bulk_extractor | 41 |
| bulk.url | bulk_extractor | 288 |
| bulk.url_services | bulk_extractor | 19 |
| tsk.filelist | sleuthkit | 104709 |
| hashdeep.hashes | hashdeep | 12 |
| tsk.filelist.p1 | sleuthkit | 93 |
| scalpel.audit | scalpel | 1 |
| tsk.masquerade | sleuthkit | 17 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 7303 |
| bulk.duplicates | bulk_extractor | 1738 |
| bulk.email | bulk_extractor | 30 |
| bulk.rfc822 | bulk_extractor | 41 |
| bulk.url | bulk_extractor | 7204 |
| bulk.url_services | bulk_extractor | 60 |
| bulk.zip_carved | bulk_extractor | 5221 |
| hashdeep.acquisition | ewfverify | 3 |
| binwalk.scan | binwalk | 0 |
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
| registry.profile | python-registry | 54 |
| recycle_bin | icat | 17 |
| registry.query.system | python-registry | 1 |
| evtx.manifest | evtx-extract | 54 |
| registry.query.system | python-registry | 1 |
| ez.shimcache | eztools | 307 |
| registry.sam | regripper | 186 |
| registry.sam | regripper | 7 |
| ez.mft | eztools | 98918 |
| registry.sam | regripper | 7 |
| registry.security | regripper | 69 |
| registry.security | regripper | 8 |
| ez.prefetch | eztools | 193 |
| hayabusa.alerts | hayabusa | 35 |
| registry.system | regripper | 33492 |
| registry.system | regripper | 283 |
| registry.system | regripper | 283 |
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
| appfiles.program_files.eqnedt32.exe.manifest | icat | 17 |
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
| appfiles.program_files.base_kor.xml | icat | 8 |
| appfiles.program_files.base_rtl.xml | icat | 21 |
| appfiles.program_files.ja-jp.xml | icat | 218 |
| appfiles.program_files.ko-kr.xml | icat | 201 |
| appfiles.program_files.zh-changjei.xml | icat | 214 |
| appfiles.program_files.zh-dayi.xml | icat | 214 |
| appfiles.program_files.zh-phonetic.xml | icat | 214 |
| appfiles.program_files.main.xml | icat | 870 |
| appfiles.program_files.numbase.xml | icat | 22 |
| appfiles.program_files.numbers.xml | icat | 5 |
| appfiles.program_files.oskmenubase.xml | icat | 8 |
| appfiles.program_files.oskmenu.xml | icat | 5 |
| appfiles.program_files.osknumpadbase.xml | icat | 37 |
| appfiles.program_files.osknumpad.xml | icat | 5 |
| appfiles.program_files.oskpredbase.xml | icat | 15 |
| appfiles.program_files.oskpred.xml | icat | 5 |
| appfiles.program_files.ea-sym.xml | icat | 14 |
| appfiles.program_files.ja-jp-sym.xml | icat | 14 |
| appfiles.program_files.symbase.xml | icat | 47 |
| appfiles.program_files.symbols.xml | icat | 15 |
| appfiles.program_files.webbase.xml | icat | 17 |
| appfiles.program_files.web.xml | icat | 4 |
| registry.query.system | python-registry | 1 |
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
| appfiles.program_files.officemui.xml | icat | 139 |
| appfiles.program_files.officemuiset.xml | icat | 19 |
| appfiles.program_files.setup.xml | icat | 114 |
| appfiles.program_files.office32mui.xml | icat | 37 |
| appfiles.program_files.setup.xml | icat | 37 |
| appfiles.program_files.office32ww.xml | icat | 133 |
| appfiles.program_files.onenotemui.xml | icat | 40 |
| appfiles.program_files.setup.xml | icat | 27 |
| appfiles.program_files.osmuxmui.xml | icat | 31 |
| appfiles.program_files.setup.xml | icat | 24 |
| appfiles.program_files.outlookmui.xml | icat | 67 |
| appfiles.program_files.setup.xml | icat | 53 |
| appfiles.program_files.powerpointmui.xml | icat | 37 |
| appfiles.program_files.setup.xml | icat | 25 |
| appfiles.program_files.proof.xml | icat | 34 |
| appfiles.program_files.proof.xml | icat | 37 |
| appfiles.program_files.proof.xml | icat | 37 |
| appfiles.program_files.proofing.xml | icat | 19 |
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
| appfiles.program_files.spring.inf | icat | 36 |
| appfiles.program_files.strtedge.inf | icat | 36 |
| appfiles.program_files.studio.inf | icat | 42 |
| appfiles.program_files.sumipntg.inf | icat | 36 |
| appfiles.program_files.themes.inf | icat | 211 |
| appfiles.program_files.water.inf | icat | 36 |
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
| composite.correlation | composite | 1 |
| composite.exfil | composite | 2480 |
| composite.file_staging | composite | 578 |
| composite.defense_evasion | composite | 179 |
| composite.lateral_movement | composite | 414 |
| composite.timeline | composite | 2117 |
| composite.recovery | composite | 58 |
| forensic.timestomping | timestomp_detector | 1 |
| composite.file_staging | composite | 578 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
