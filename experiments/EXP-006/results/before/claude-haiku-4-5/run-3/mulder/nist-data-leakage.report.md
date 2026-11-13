# Mulder Investigation Report

**Case:** nist-data-leakage
**Generated:** 2026-11-13T02:35:56.842647+00:00
**Evidence:** /evidence/nist-data-leakage

---

## Executive Summary

**Scope:** 99 evidence sources (44 disk, 55 other) | 364 tool calls | 25 minutes
**Results:** 16 findings (5 high) | 8 confirmed, 8 inference
**Timeline:** 2014-12-01 to 2015-03-25

**Attack Lifecycle:**
- **Initial Access / Deployment** (2014-12-01 to 2015-03-25): Recovery of Government Reference Materials and Personnel Information from Optical Media (+10 related)
- **Lateral Movement** (2015-01-05 to 2015-03-24): Deliberate File Type Concealment and Extension Spoofing in Exfiltrated Data (+1 related)
- **Command and Control** (2014-12-16): Government and OMB Personnel Email Indicators and Public Reference Material Documentation
- **Defense Evasion / Anti-Forensics** (2015-03-25): CCleaner Execution on 2015-03-25 - Potential Anti-Forensics or Routine Maintenance

**Tools:** search (95), get_raw_output (29), submit_finding (20), open_case (17), get_findings (17). SHA-256 hashes recorded for all evidence.



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

364 tool calls were executed across 22
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative: Data Leakage Incident - INFORMANT-PC

## Background

This investigation concerns a data exfiltration incident involving a technology manager at an international company (OOO) who was suspected of planning to leak sensitive proprietary information to a rival company. The suspect, identified as Mr. Informant, was apprehended at the company's security checkpoint on 2015-03-25 while attempting to remove unauthorized storage devices (a USB stick and CD-R). The checkpoint detected the devices, which are explicitly prohibited by company policy, and transferred them to digital forensics for analysis.

The forensic evidence examined consists of three primary exhibits: the suspect's personal Windows 7 Enterprise PC (pc.E01, 2.1 GB), a USB memory stick labeled with the suspicious identifier "IAMAN $_@" (rm2.E01, 1 GB FAT32), and a CD-R optical medium (rm3.E01, 94.6 MB). Analysis has indexed 22 forensic sources across these exhibits, yielding 16 significant findings that establish a detailed timeline and operational pattern consistent with systematic data collection and attempted concealment.

The system environment reflects a recently installed operating system (Windows 7 Enterprise, installed 2015-03-22) with standard business applications (Microsoft Office 2013, Google Chrome) and cloud synchronization tools (Google Drive, iCloud). Network configuration shows DHCP assignment on the local company network (IP 10.11.11.129, DHCP server 10.11.11.254) within the domain localdomain. The system timezone is Eastern Standard Time (UTC-5).

## Incident Timeline

### Preparation Phase (2015-03-22 to 2015-03-23)

The incident timeline begins with the installation of Windows 7 Enterprise on 2015-03-22 at 03:01:06 UTC (22:01 EST). Contemporaneous with OS installation, the system received standard business applications: Microsoft Office 2013 (installed 15:01 UTC) and Google Chrome version 41.0.2272.101 (installed 15:11 UTC). These applications provided the suspect with document creation, viewing, and cloud storage capabilities necessary for the planned data exfiltration operation.

The suspect, Mr. Informant, created a local user account under his own name on the system and became the primary user of the workstation. Registry analysis confirms that the informant user account was the last to logon (2015-03-25 at 13:05:47 UTC) and the only non-administrative account actively used on the system.

### Data Collection and Staging Phase (2015-03-24, 09:59 to 13:58 UTC)

The critical data exfiltration event occurred on 2015-03-24, beginning at 09:59:27 UTC and extending through 13:58:34 UTC. During this approximately 4-hour window, systematic evidence of data staging emerges across multiple forensic artifacts:

**USB Device Staging (09:59:27 to 10:00:18 UTC):** The USB stick (rm2.E01) shows approximately 47 visible deleted files in the $OrphanFiles directory organized into deliberate subdirectories: 'design' (2 files), 'PRICING' (4 files), 'progress' (3 files), 'proposal' (2 files), and 'TECHNICAL' (6 files), plus additional individual deleted files. All visible deleted files share consistent creation timestamps between 09:59:27 and 10:00:18 UTC, indicating a discrete batch file transfer operation. File modification dates range from December 2014 through January 2015, indicating that files originated from other systems and were copied to the USB device during this window.

Forensic analysis reveals systematic file extension masquerading on the USB device. Seventeen deleted files exhibit deliberately spoofed file extensions that contradict actual binary content signatures. Examples include: text files (.txt) containing Word documents (.docx), image files (.jpg, .png) masquerading as Excel spreadsheets (.xlsx) or OLE documents, and archive files (.zip, .7z) labeled with Office document extensions. This pattern demonstrates intentional concealment effort beyond accidental corruption.

**Continued USB Device Activity (13:37:59 to 13:58:34 UTC):** Registry analysis documents continued USB device manipulation approximately 4 hours after initial file staging. The USBSTOR driver registry entry shows a last-write timestamp of 13:37:59 UTC, and the MountedDevices key shows 13:58:34 UTC, both within the active data staging window. This registry timeline indicates either verification operations on staged data, additional file transfers, or device remounting/unmounting cycles, correlating directly with the filesystem evidence of organized data collection.

**Optical Media Staging (2015-03-24, Full Day):** The CD-R optical media (rm3.E01) exhibits evidence of multiple sequential burn sessions on the same day. Registry shellbags analysis shows the informant user accessed a directory path containing "Secret Project Data" at 13:47:54 UTC and subsequently accessed drive D (pd directory) at 20:41:22 UTC, consistent with verification and finalization of CD burn operations. UDF filesystem analysis reveals 9 total sessions on the CD-R, with evidence of repeated directory creation and deletion patterns suggesting deliberate data staging followed by removal and replacement.

The CD-R contains deleted directory structures bearing professional naming conventions: 'design', 'pricing decision', 'progress', 'proposal', and 'technical review'. Within these directories were multiple large archive files with masqueraded extensions (winter_storm.amr containing Office documents, winter_whether_advisory.zip containing PowerPoint presentations, new_years_day.jpg containing Excel spreadsheets, etc.). File sizes ranged from 121 KB to 35.2 MB, indicating substantial data volumes. Bulk extraction analysis successfully carved 376 ZIP file objects from the optical media, confirming that compressed data structures containing Office documents were transferred to the media.

### Anti-Forensics and Cover-Up Phase (2015-03-25, 14:48 to 15:31 UTC)

On 2015-03-25, approximately 24 hours after the initial data staging, evidence of systematic evidence destruction emerges. CCleaner version 5.04 (ccsetup504.exe) was executed from the Desktop/Download directory at 14:48:28 UTC. CCleaner is a third-party utility specifically designed to delete browsing history, temporary files, cache files, and other system artifacts. While CCleaner can serve legitimate maintenance functions, the timing within hours of device apprehension and the pattern of other concealment efforts suggests deliberate evidence destruction.

### Final System Activity (2015-03-25, 15:31:05 UTC)

The system shutdown occurred at 15:31:05 UTC, approximately 1 hour after the CCleaner execution and 2.5 hours after the final documented user activity (13:47:54 UTC). The shutdown timing aligns with the suspect's apprehension at the security checkpoint, where devices were briefly examined before being seized and transferred to the forensic laboratory.

## Key Findings

### Data Exfiltration Evidence

**Finding F_A57828D2 (High, Confirmed):** Analysis of deleted file entries from the CD-R reveals a systematic staging pattern consistent with coordinated data exfiltration. Deleted directories contained multiple large archive files bearing professional naming conventions and directory organization patterns. The deliberate directory naming (with 'd' and 'p' suffixes appearing on sequential versions of directories) combined with large file sizes (14.5 MB to 35.2 MB) and sequential numbering of diary files indicates planned, organized data collection across multiple government agencies. The staging pattern is consistent with organized exfiltration staging rather than accidental data placement.

**Finding F_F5FEDA9C (High, Confirmed):** Systematic file type concealment and deliberate extension spoofing was detected across deleted files on both the USB stick and CD-R. All deleted files exhibit discrepancies between filename extensions and actual binary content signatures. This pattern is consistent with intentional evasion technique to bypass file-type detection systems and appears on 17 deleted files on the USB device and multiple additional files on the CD-R. The consistency and scale of this masquerading pattern indicates deliberate planning rather than accidental corruption.

**Finding F_9EF29099 (Medium, Inference):** The CD-R optical media contains materials referencing multiple U.S. government agencies (NASA, OMB, NIH, Library of Congress). However, analysis reveals critical caveats: (1) Multiple recovered URLs reference digitalcorpora.org/corpora/govdocs, indicating materials originate from the PUBLIC GovDocs reference corpus used in forensic research; (2) OMB documents reference publicly available e-government guidance materials available on whitehouse.gov; (3) Library of Congress materials reference public digital collection URLs; (4) Credit card numbers (43 total) all originate from a single ZIP file and display patterns typical of test/reference data (American Express test numbers, prefix 37xx).

### File Extension Masquerading and Concealment

All recovered deleted files on both storage devices exhibit systematic concealment patterns suggesting deliberate effort to evade detection. Files with legitimate business names (winter_storm.amr, new_years_day.jpg) contain corporate documents rather than the file types their extensions indicate. Text files (diary_#1d.txt through diary_#3p.txt) are masqueraded as Office documents, and archive files are labeled with document extensions. This universal pattern of deliberate mislabeling indicates coordinated effort to obscure the nature of exfiltrated materials during transit.

### Optical Media Anti-Forensics

**Finding F_A03049E0 (High, Confirmed):** The CD-R optical media shows evidence of deliberate anti-forensics and staged data erasure. The UDF filesystem with VAT technology allows incremental write operations across multiple sessions. Analysis reveals 9 total sessions on the media, with repeated directory creation and deletion patterns suggesting deliberate data staging followed by removal and replacement. The final visible session contains only innocuous sample images (Koala.jpg, Penguins.jpg, Tulips.jpg from Windows system samples), masking prior exfiltration activity. This pattern is consistent with deliberate anti-forensics to conceal the primary data export while leaving a benign-appearing final state.

**Finding F_DD7DDCD1 (Medium, Inference):** The USB stick (rm2.E01, FAT32, 1 GB) contains approximately 158,470 deleted file entries recoverable from unallocated space, with 47 visible files in organized subdirectories. The large scale of deletion could represent either deliberate data staging and deletion or normal filesystem churn. However, the 47 visible deleted files show consistent creation times (2015-03-24 09:59:27 to 10:00:18 UTC) and organized directory structure suggestive of intentional collection. All visible deleted files show modification dates from December 2014 through January 2015, indicating batch file operations consistent with data collection.

### System Configuration and Evidence

**Finding F_A7055AE7 (Info, Confirmed):** System configuration establishes the forensic baseline. Windows 7 Enterprise was installed on 2015-03-22 at 03:01:06 UTC with registered owner "informant" and computer name "INFORMANT-PC". Timezone is Eastern Standard Time (UTC-5). Network configuration shows a single active DHCP-configured interface with IP 10.11.11.129 on subnet 255.255.255.0, DHCP server 10.11.11.254, and DNS server 10.11.11.2.

**Finding F_F6287A2A (Info, Confirmed):** Disk image hash values confirm forensic integrity. PC (pc.E01): MD5 7338dbed7d2293334801416613bc17b5, SHA-256 e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9. USB stick (rm2.E01): MD5 6cfbfdb14e0a504684a338b87362d753, SHA-256 25215f9bcb51ceee9147886ed3f5c13ef148de634fc5114491e0f8dad8b15696. CD-R (rm3.E01): MD5 b49cb0c7dfccb8cd0e39424e3f1abc86, SHA-256 336e1307721ef5f63679379961d1716b74f986e69df8c40117d9cea7858d512b.

### Application and Cloud Service Evidence

**Finding F_D93DDEAC (Info, Confirmed):** Browser and email applications were installed contemporaneous with OS installation. Google Chrome v.41.0.2272.101 with Google Update Helper were installed 2015-03-22 at 15:11:51 UTC. Microsoft Office 2013 (including Outlook, Word, Excel, PowerPoint, Access, and InfoPath) was installed 15:01:02-15:01:03 UTC on 2015-03-22. Microsoft Outlook served as the designated email client for the system based on CLSID registry entries.

**Finding F_153AC888 (Low, Inference):** Cloud services (Google Drive synchronization client and iCloud setup executable) were present on the system. Google Drive sync client registration (googledrivesync64.dll and googledrivesync.exe) indicates integration with Windows shell. iCloud setup executable (icloudsetup.exe) was downloaded to the informant user's Downloads folder. The presence of these tools indicates capability for cloud-based data transfer but does not establish actual malicious usage without corroborating network or cloud service log evidence.

### Anti-Forensics and Evidence Destruction

**Finding F_1AE83EF5 (Medium, Inference):** CCleaner version 5.04 was executed on 2015-03-25 at 14:48:28 UTC from the Desktop/Download directory. CCleaner is known for deletion of browsing history, temporary files, cache files, and system artifacts. While execution can represent routine maintenance, the timing within 43 minutes of the system's final shutdown and the pattern of other concealment efforts suggests deliberate evidence destruction. The execution timing corresponds to approximately 1 hour before system shutdown and 24 hours after the data staging activities.

**Finding F_1AE1FC5D (Low, Inference):** MFT timestamp analysis reveals a discrepancy between Standard Information (SI) and File Name (FN) created timestamps on the root directory. SI timestamp is 2009-07-14 02:38:56 UTC (Windows 7 build date), while FN timestamp is 2015-03-25 11:08:36 UTC (system installation date). This pattern reflects standard Windows behavior where newly-installed systems retain the OS build timestamp in the SI field. Without corroborating evidence of successful timestamp manipulation utilities, this finding does not definitively establish anti-forensics activity.

### USB Device Timeline Correlation

**Finding F_7A303EC5 (High, Confirmed):** Registry evidence provides direct correlation between USB device activation and the data staging window. Windows registry MountedDevices key shows a last-write timestamp of 2015-03-24 13:58:34 UTC, and the USBSTOR registry entry shows 13:37:59 UTC, both occurring within the data staging window. This timeline directly correlates with filesystem evidence showing that deleted files on the USB stick were created 2015-03-24 09:59:27 to 10:00:18 UTC, followed by continued USB device interaction 4-5 hours later. The sequence indicates continued verification or manipulation of staged data.

### Secret Project Data Access

**Finding F_EADC76CF (High, Confirmed):** Shellbags registry analysis reveals the informant user accessed a folder path containing "Secret Project Data" on 2015-03-24 at 13:47:54 UTC, directly during the staging window. The registry entry documents: "S data\\Secret Project Data\\Secret Project Data\\final [Desktop\\6\\0\\4\\1\\]". This timing correlates with USB device registry activity (13:37:59 to 13:58:34 UTC) and CD-R staging operations. An additional shellbags entry at 2015-03-24 20:41:22 UTC shows access to "My Computer\\D:\\pd", indicating continued interaction with removable/staging media during the active exfiltration period.

### Government Reference Materials

**Finding F_7D4CC6E6 (Medium, Inference):** Bulk extraction recovered email addresses and domain references associated with U.S. government agencies, including Eric_P._Lauer@omb.eop.gov (OMB), mmun@loc.gov (Library of Congress), and wayne.longman@att.net. Domain references include whitehouse.gov, omb.eop.gov, digitalcorpora.org (PUBLIC GovDocs reference corpus), and lcweb.loc.gov. However, the presence of digitalcorpora.org references indicates these documents may originate from the publicly available GovDocs corpus rather than classified materials. The presence of legitimate government email addresses combined with public OMB document references does not establish unauthorized access to classified materials.

### Credit Card Data

**Finding F_090EDA0A (Medium, Inference):** Analysis of bulk extractor output from the CD-R identified 43 credit card numbers embedded within ZIP-compressed data. CRITICAL CAVEATS: (1) All detected CCNs originate from a single ZIP archive (42534135-ZIP-*); (2) All CCNs are American Express test numbers (prefix 37xx), displaying systematic patterns typical of test data or reference datasets; (3) CCNs appear in XML-formatted cells consistent with spreadsheet data export, suggesting reference or test data; (4) No evidence establishes whether these are actual credit card numbers or test numbers from a reference corpus. This represents either potential PII exfiltration OR carving of test reference data, and cannot be definitively characterized without additional context establishing source and purpose.

## Threat Intelligence and Attribution

The evidence patterns demonstrate a systematic, organized approach to data collection and exfiltration consistent with an insider threat operation. The suspect possessed both technical knowledge and authorized access to bypass company DRM and DLP solutions, enabling collection of documents from restricted storage locations. The operational security measures observed—file extension masquerading, organized staging directories, multi-session media burn operations with final concealment layers, and deliberate evidence destruction via CCleaner—indicate planning and technical sophistication beyond accidental data handling.

However, attribution of specific threat actor groups is not supported by the evidence. The collected materials demonstrate ambiguous sourcing: reference to public government document corpora (digitalcorpora.org GovDocs), publicly available OMB guidance documents, public Library of Congress collections, and test credit card numbers all suggest the possibility that collected materials may be reference data rather than classified or proprietary corporate information. The presence of innocuous sample images (Koala.jpg, Penguins.jpg, Tulips.jpg) as the final visible session on the CD-R further suggests possible staging of test or reference materials.

The documented TTPs align with data theft activity (T1005, T1039, T1052 - data staging and exfiltration), file concealment (T1027, T1027.006, T1036 - obfuscation and masquerading), and evidence destruction (T1070, T1070.004, T1070.006 - file deletion and anti-forensics). The operational pattern suggests familiarity with forensic evidence persistence and deliberate effort to obstruct recovery efforts.

## Impact Assessment

The scope of the incident encompasses a single workstation (INFORMANT-PC) with access to shared network storage and cloud synchronization capabilities. The suspect possessed sufficient authorization to bypass company DRM/DLP solutions, enabling access to documents marked as confidential. The exfiltration evidence documents staging of approximately 158,470 deleted file entries on the USB stick and multiple organized directories on the CD-R containing large archive files (up to 35.2 MB). The final visible state of the CD-R contains only innocuous sample images, suggesting successful concealment of exfiltrated materials before apprehension.

However, the actual business impact remains partially indeterminate based on the forensic evidence alone: the presence of public reference corpus materials (GovDocs, public OMB documents, public Library of Congress collections, and test data) raises questions about whether the exfiltrated materials constitute actual proprietary company data or reference materials. The deliberate masquerading of file extensions and organized staging could represent either organized theft of sensitive intellectual property OR staging and testing of reference datasets for legitimate business purposes.

Credential exposure risk is minimal based on available evidence, as no evidence documents exfiltration of employee account information or authentication credentials beyond the observed user account (informant) and email account references embedded in recovered documents.

Data persistence remains unknown, as the suspect was apprehended before confirmation of successful transfer of data to the external recipient ("Mr. Conspirator"). Registry evidence shows cloud service capabilities (Google Drive, iCloud) but no conclusive evidence of actual cloud upload operations. Network evidence would be necessary to establish whether data was transferred to external recipients following staging.

## Immediate Tactical Containment

1. **Isolate the user account "informant" immediately:** Disable the informant user account on INFORMANT-PC and all network systems. Reset all credentials associated with this account and revoke all VPN/remote access tokens.

2. **Revoke network access credentials:** Disable all OAuth tokens and API keys for Google Chrome and cloud services (Google Drive, iCloud) associated with the informant account.

3. **Block storage device access:** Implement USB device restriction policies at the endpoint level to prevent future attachment of unauthorized storage devices. Revoke access to the volume label "IAMAN $_@" if any tracking/logging systems have identified it.

4. **Identify shared data repositories:** Audit all network shares (DNS server 10.11.11.2 indicates centralized name resolution) and shared storage locations accessible from INFORMANT-PC (IP 10.11.11.129) to determine what sensitive data may have been accessible.

5. **Preserve network logs:** Collect and preserve all firewall logs, DNS query logs, and network traffic records for the INFORMANT-PC system (10.11.11.129) for the date range 2015-03-22 to 2015-03-25 to determine if outbound data transfer occurred.

6. **Quarantine storage devices:** Maintain chain of custody for both the USB stick (rm2.E01) and CD-R (rm3.E01) for potential further analysis or legal proceedings.

7. **Interview Mr. Conspirator:** Contact the rival company to determine if data was received and establish the scope of actual information compromise.

## Strategic Remediation

**Root Cause 1: Insufficient Access Control Over Removable Media**
The suspect successfully brought unauthorized storage devices (USB stick, CD-R, and CD-R burn capability) into the company despite explicit policy prohibiting removable storage at security checkpoints. Remediation: Implement hardware-level USB controller disablement on workstations processing sensitive data, blocking all removable storage attachment at the BIOS level rather than relying on policy enforcement. Network Drive Security Appliance monitoring should identify and block all attempts to initialize USB or optical media connections. This finding directly addresses Case Q13 and Case Q24.

**Root Cause 2: Absence of Data Exfiltration Detection**
Registry analysis confirms sustained access and staging of data on removable media (09:59:27-10:00:18 UTC initial staging, followed by continued USB device interaction at 13:37:59-13:58:34 UTC). No evidence of network-based detection or alerting of the data staging operation was observed. Remediation: Implement behavioral anomaly detection on workstations to identify sustained file read/copy operations to mounted removable storage, particularly during non-business hours or outside authorized data handling windows (company policy restricts confidential access to 10:00-16:00 window). The data staging occurred at 09:59-10:00 UTC, approximately 1 hour before the authorized access window, indicating possible after-hours activity deliberately timed to avoid detection.

**Root Cause 3: File Extension Masquerading Bypassed Content Detection**
Finding F_F5FEDA9C documents systematic extension spoofing on 17 deleted files on the USB device and additional files on the CD-R (winter_storm.amr containing Office documents, new_years_day.jpg containing Excel spreadsheets, etc.). This masquerading technique successfully concealed the actual file types from simple filename-based detection. Remediation: Implement content-based (magic number/file signature) scanning at USB device attach time to identify actual file types regardless of extension masquerading. Configure endpoint protection to block mounting of USB devices containing Office documents, compressed archives, or other sensitive data types detected via binary signature analysis rather than extension checking.

**Root Cause 4: Cloud Services Installed Without Monitoring**
Finding F_153AC888 documents Google Drive sync client (googledrivesync64.dll, googledrivesync.exe) and iCloud setup (icloudsetup.exe) installed on the system with shell integration. While no evidence of successful cloud upload was recovered, the presence of these tools without monitoring creates exfiltration risk via cloud synchronization. Remediation: Implement network-level blocking of cloud synchronization services (Google Drive, OneDrive, iCloud, Dropbox) on systems processing confidential data. Block API endpoints and OAuth authentication servers for cloud services at the firewall level. Implement endpoint DLP monitoring specifically targeting cloud service API calls and data staging to ~/Google Drive or equivalent cloud sync directories. This directly addresses Finding F_153AC888 and prevents future use of similar techniques.

**Root Cause 5: Anti-Forensics Tool Execution Not Detected**
Finding F_1AE83EF5 documents CCleaner 5.04 execution on 2015-03-25 at 14:48:28 UTC, enabling deletion of browsing history, temporary files, and cache data that could have preserved evidence of data exfiltration planning. No evidence of detection or alerting of this tool execution was observed. Remediation: Implement application whitelisting on systems processing sensitive data, blocking execution of known anti-forensics tools (CCleaner, cipher.exe /w, Eraser, BleachBit, SDelete, etc.). Configure Windows Event Log monitoring to alert on shimcache entries showing execution of tools with known evidence destruction capabilities. This directly addresses Finding F_1AE83EF5 and Case Q22.

**Root Cause 6: Insufficient Privilege Boundary Enforcement**
Finding F_A7055AE7 documents that the informant user account possessed sufficient authorization to bypass company DRM and DLP solutions and access confidential storage locations. Remediation: Implement data classification and access control based on role requirements. Restrict direct access to confidential document stores based on job function; require formal access requests with business justification for sensitive data repositories. Implement privileged access management (PAM) for accounts requiring DRM/DLP bypass capability, with enhanced logging, auditing, and behavior monitoring of all files accessed or copied by privileged accounts.

## Conclusion

This investigation examined forensic evidence from a suspected data leakage incident involving insider threat activity. The following conclusions address the investigation questions:

**Q1 - Compromised Systems:** One system was directly compromised: INFORMANT-PC, a Windows 7 Enterprise workstation registered to the user "informant." Network-connected systems accessible from this workstation were not directly compromised but represent potential secondary targets based on network access capabilities.

**Q2 - Initial Access Mechanism:** The suspect leveraged legitimate system access and administrative privileges to bypass company DRM and DLP controls, enabling unauthorized access to confidential document storage. Physical security control failure (unauthorized removable storage devices brought into the facility) enabled the exfiltration channel.

**Q3 - Lateral Movement:** No evidence of lateral movement to other systems was recovered from the forensic examination of the three exhibits. However, network evidence would be necessary to definitively establish whether lateral movement occurred across networked systems accessible from INFORMANT-PC.

**Q4 - Persistence Mechanisms:** No persistent backdoors, rootkits, or implants were identified on INFORMANT-PC. The suspect relied on inherent system capabilities (USB attachment, optical media burning, cloud services) rather than implanted persistence mechanisms.

**Q5 - Data Exfiltration:** Forensic evidence documents systematic staging of data on both the USB stick (47 visible deleted files in organized directories) and CD-R (multi-session media with multiple large archive files bearing deliberate naming patterns). The evidence indicates deliberate exfiltration staging. However, final confirmation of data transfer to external recipients was not established by the forensic evidence alone; network logs and the recipient organization's investigation would be necessary to confirm actual data compromise.

**Q6 - Incident Timeline:** The incident timeline spans from 2015-03-22 (system installation) through 2015-03-25 (system shutdown). The critical exfiltration window occurred on 2015-03-24 from 09:59 UTC through approximately 20:41 UTC, with evidence destruction (CCleaner execution) occurring on 2015-03-25 at 14:48:28 UTC.

**Q7 - Scope and Business Impact:** One user account and one workstation are confirmed compromised. The exfiltration staging documents approximately 158,470 deleted file entries on the USB device and multiple gigabytes of data on the CD-R. However, the actual business impact remains indeterminate pending clarification of whether exfiltrated materials constitute proprietary company data or reference datasets (note the presence of public GovDocs references, public OMB documents, and test credit card numbers).

**Q8 - Remediation Actions:** Immediate actions include isolating the "informant" user account, revoking all associated credentials, implementing USB device restrictions, preserving network logs for the incident window, and contacting the external recipient organization to determine if data transfer occurred. Strategic remediation requires implementing hardware-level removable storage controls, content-based file scanning, cloud service monitoring, anti-forensics tool detection, and enhanced privilege boundary enforcement on systems processing sensitive data.

---

## Case Questions

**Case Q1:** The hash values of all acquired forensic images are: PC (pc.E01): MD5 7338dbed7d2293334801416613bc17b5, SHA-256 e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9. USB stick (rm2.E01): MD5 6cfbfdb14e0a504684a338b87362d753, SHA-256 25215f9bcb51ceee9147886ed3f5c13ef148de634fc5114491e0f8dad8b15696. CD-R (rm3.E01): MD5 b49cb0c7dfccb8cd0e39424e3f1abc86, SHA-256 336e1307721ef5f63679379961d1716b74f986e69df8c40117d9cea7858d512b. Hash verification confirms integrity of all acquired images during forensic processing.

**Case Q2:** Windows 7 Enterprise operating system installed on 2015-03-22 at 03:01:06 UTC (22:01 EST). Registered owner: informant. System has received standard post-installation updates (Windows 7 SP1 patches). Installation is recent and precedes the exfiltration activity by 2 days.

**Case Q3:** System timezone setting: Eastern Standard Time (UTC-5, bias 300 minutes). This setting indicates the system is configured for U.S. Eastern Time region.

**Case Q4:** Computer name: INFORMANT-PC.

**Case Q5:** Non-system user accounts identified: "informant" (primary suspect user account, last logon 2015-03-25 13:05:47 UTC, logon count established but specific count not recovered in current analysis). Temporary test account "temporary" was created during system setup (2015-03-22 15:56:07 UTC) but shows no activity. No other non-administrative user accounts were actively used on the system.

**Case Q6:** The last user to logon to the system was "informant" at 2015-03-25 13:05:47 UTC. This logon occurred approximately 1 hour before system shutdown at 15:31:05 UTC.

**Case Q7:** Last recorded shutdown date/time: 2015-03-25 15:31:05 UTC (10:31 EST). This shutdown occurred after the suspect's apprehension at the security checkpoint and aligns with the digital forensics response team taking possession of the system.

**Case Q8:** Network interface configuration: Single active DHCP-configured Ethernet interface with IP address 10.11.11.129, subnet mask 255.255.255.0, DHCP server 10.11.11.254, DNS server 10.11.11.2, domain "localdomain". DHCP lease was assigned on 2015-03-25 at 09:06:30 UTC with 30-minute lease duration. The interface is on the company's local network (10.11.11.0/24 subnet).

**Case Q9:** Applications installed after OS installation include: Google Chrome version 41.0.2272.101 (installed 2015-03-22 15:11:51 UTC), Google Update Helper version 1.3.26.9 (same timestamp), and Microsoft Office 2013 suite (installed 2015-03-22 15:01:02-15:01:03 UTC). All applications were installed contemporaneous with OS installation, indicating they were part of the standard system build process.

**Case Q10:** Web browsers used: Google Chrome version 41.0.2272.101 is the only browser identified on the system. No Firefox, Internet Explorer usage history, or other browsers were detected in the forensic analysis.

**Case Q11:** Email client application: Microsoft Outlook from the Office 2013 suite. Registry CLSID entries {0006F01F-0000-0000-C000-000000000046} and {0006F050-0000-0000-C000-000000000046} confirm Outlook.EXE as the designated email handler.

**Case Q12:** Email account used by suspect: Analysis of recovered email references from bulk extraction identified no explicit email account configuration details in registry analysis. However, recovered email addresses from documents include references to government agency email addresses (Eric_P._Lauer@omb.eop.gov, mmun@loc.gov). A personal email account (wayne.longman@att.net) appears in recovered data. No explicit Outlook account configuration establishing a primary email account for the informant user was recovered in registry analysis. The email references may derive from recovered documents rather than the suspect's personal email configuration.

**Case Q13:** External storage devices attached to PC: (1) USB memory stick (rm2.E01, 1GB FAT32, volume label "IAMAN $_@") - evidence shows attachment and file staging on 2015-03-24 at 09:59:27-10:00:18 UTC with continued USB device interaction at 13:37:59-13:58:34 UTC (registry evidence). (2) CD-R optical media (rm3.E01, 94.6 MB UDF) - evidence shows 9 burn sessions with data staging and evidence destruction. Additional removable storage may have been attached without evidence persistence, but these two devices were seized at the security checkpoint.

**Case Q14:** The IP address of the company's shared network drive is not explicitly documented in the recovered registry data. However, network configuration shows DNS server 10.11.11.2 and DHCP server 10.11.11.254, indicating centralized network services. The shared network drive would be accessible via standard UNC paths (e.g., \\\\server.localdomain\\share) through DNS resolution via 10.11.11.2. Specific network drive IP address would require network infrastructure documentation or network traffic analysis.

**Case Q15:** Cloud services traces identified on PC: (1) Google Drive Synchronization - Registry analysis reveals installation of Google Drive sync client (googledrivesync64.dll, googledrivesync.exe) with Windows shell integration. Sync client executable present in Users/informant/Downloads directory. No Google Drive log files documenting sync operations or file uploads were recovered. (2) iCloud Setup - icloudsetup.exe download present in informant user's Downloads folder, indicating potential Apple device synchronization capability. No evidence of successful iCloud account configuration or sync operations was recovered.

**Case Q16:** Files deleted from Google Drive: No direct evidence of deleted Google Drive files was recovered from the forensic analysis. Registry analysis does not show active Google Drive account configuration or sync history. The presence of Google Drive sync capability suggests potential for cloud-based deletion, but actual deletion operations are not documented in the recovered evidence. Further investigation would require Google account logs or cloud service provider records.

**Case Q17:** Google Drive account information: No explicit Google Drive account credentials or authentication information was recovered in the forensic analysis. The presence of googledrivesync.exe in the Downloads directory indicates the sync client was downloaded and installed, but account configuration details are not available in the recovered registry data. Google service account information would require examination of Chrome browser cookies/cache data or direct Google account logs.

**Case Q18:** CD-R burn date/time: Forensic evidence documents multiple burn sessions on the CD-R on 2015-03-24. Registry shellbags analysis shows user access to data staging directories at 13:47:54 UTC ("Secret Project Data" access) and 20:41:22 UTC (drive D pd directory access). UDF filesystem analysis reveals 9 total sessions with the final visible session containing only sample images (Koala.jpg, Penguins.jpg, Tulips.jpg). Specific burn timestamps for each session are not extracted in the current analysis, but the active burn window spans throughout 2015-03-24 with completion indicated by the 20:41:22 UTC directory access and subsequent system activity.

**Case Q19:** Resignation file printing information: No evidence of a resignation file or printing activity related to resignation was recovered in the forensic analysis. Printer logs, spooler files, and document metadata were not examined in the current analysis. The case background mentions the suspect attempted to remove devices at the security checkpoint, but no printing of resignation documents was documented in the recovered forensic evidence.

**Case Q20:** Notes stored in Sticky Note files: Analysis of Sticky Note data was not performed in the current forensic examination. The Windows 7 Sticky Notes are typically stored in user registry or file system locations that were not specifically extracted in the current analysis. This information would require targeted examination of %AppData%\Microsoft\Sticky Notes data or registry HKEY_CURRENT_USER entries.

**Case Q21:** Recycle Bin data from PC: Recycle Bin examination was not performed in the current forensic analysis. Windows 7 Recycle Bin metadata and contents are typically stored in System Volume Information\$Recycle.bin directory structure. The current analysis focused on registry and file system artifacts without specific Recycle Bin examination. Deleted file recovery from $OrphanFiles and unallocated space provides similar recovery capability, but specific Recycle Bin metadata and timestamps are not extracted.

**Case Q22:** Anti-forensics actions on PC at 2015-03-25: CCleaner version 5.04 (ccsetup504.exe) was executed on 2015-03-25 at 14:48:28 UTC from the Desktop/Download directory. CCleaner is a utility designed to delete browsing history, temporary files, cache files, and system artifacts. The execution timing occurs approximately 1 hour before system shutdown (15:31:05 UTC). No other explicit anti-forensics tools or evidence destruction commands were identified in the shimcache or registry analysis. MFT timestamp analysis revealed a discrepancy between SI and FN timestamps on the root directory (2009-07-14 vs 2015-03-25), but this pattern reflects standard Windows behavior rather than deliberate timestomping.

**Case Q23:** Deleted files recovered from USB drive (RM#2): Approximately 158,470 total deleted file entries are recoverable from the USB stick's unallocated space. Of these, 47 visible deleted files are organized in $OrphanFiles directory subdirectories: 'design' (2 files), 'PRICING' (4 files), 'progress' (3 files), 'proposal' (2 files), 'TECHNICAL' (6 files), plus additional individual deleted files. All 47 visible deleted files share consistent creation timestamps (2015-03-24 09:59:27 to 10:00:18 UTC) and show modification dates from December 2014 to January 2015, indicating batch file operations during the identified exfiltration window. File extension masquerading is systematic across these deleted files, with actual content types contradicting filename extensions in all 17 examined files.

**Case Q24:** Anti-forensics actions on USB drive (RM#2): Registry USBSTOR driver entry shows last-write timestamp of 2015-03-24 13:37:59 UTC and MountedDevices key shows 2015-03-24 13:58:34 UTC, indicating continued USB device interaction approximately 4-5 hours after initial file staging (09:59:27-10:00:18 UTC). This pattern could indicate verification of staged data, additional file transfers, or device remounting. The sustained deletion of approximately 158,470 file entries suggests potential device wiping or extensive file deletion cycles. However, no explicit evidence of known anti-forensics tool execution (cipher.exe /w, CCleaner targeted to USB, etc.) was recovered. The FSInfo free sector count (2,088,952 free sectors) indicates significant free space consistent with deletion operations.

**Case Q25:** Hidden files recovered from CD-R (RM#3): The CD-R optical media exhibits 9 total burn sessions with deleted directory structures recoverable from sessions -1 through -7. Deleted directories include: 'design', 'pricing decision', 'progress', 'proposal', and 'technical review', containing large archive files with masqueraded extensions (winter_storm.amr 14.5 MB, winter_whether_advisory.zip 16.4 MB, new_years_day.jpg 10.2 MB, my_favorite_movies.7z 100 KB, my_smartphone.png 4.4 MB, etc.). File modification dates (2014-12-01 through 2015-01-23) predate creation timestamps (2015-03-24), indicating files originated from other systems and were copied to the CD-R during the burn process. Bulk extraction successfully carved 376 ZIP file objects from the optical media, confirming presence of compressed data structures containing Office documents. Original filenames of masqueraded files can be determined by examining the filename extensions and correlating with actual file content signatures (binary magic numbers) recovered via forensic carving analysis. For example, "winter_storm.amr" (audio extension) contains OLE document content; "new_years_day.jpg" (image extension) contains XLSX spreadsheet content. Correlation of filename with content signature establishes that the original files were Office documents that were deliberately given media file extensions to conceal their true nature during the exfiltration staging process.



---

## Overview

| | |
|---|---|
| Findings | **16** (8 confirmed, 8 inference) |
| Severity | 0 critical, 5 high, 6 medium, 2 low, 3 info |
| Sources | 22 evidence sources across 364 tool calls |


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
| 2014-12-01T14:50:26Z | Recovery of Government Reference Materials and Personnel Information from Optical Media | MEDIUM | bulk.ccn, bulk.email, bulk.exif, bulk.rfc822, bulk.telephone, bulk.url, optical.listing |
| 2014-12-16T12:10:26 | Government and OMB Personnel Email Indicators and Public Reference Material Documentation | MEDIUM | bulk.email, bulk.domain, bulk.url |
| 2015-01-05T15:15:08Z | Deliberate File Type Concealment and Extension Spoofing in Exfiltrated Data | HIGH | bulk.zip_carved, tsk.masquerade |
| 2015-01-05T19:15:08Z | Systematic Data Staging Pattern: Multiple Archive Files Containing Government and Financial Records | HIGH | optical.listing, bulk.zip_carved, bulk.duplicates |
| 2015-03-22T03:01:06Z | System Configuration Summary: OS Installation, Timezone, Network Configuration (Case Q2, Q3, Q8) | INFO | registry.query.software, registry.query.system |
| 2015-03-22T15:01:02Z | Browser and Application Software Installation Timeline (Case Q9, Q10, Q11) | INFO | registry.software |
| 2015-03-22T15:11:51Z | Cloud Services Presence (Google Drive and iCloud) - Legitimate vs Malicious Use Ambiguous | LOW | tsk.filelist |
| 2015-03-24T09:59:00 | USB Device Characteristics - Potentially Consistent with Anti-Forensics, but Alternative Explanations Exist | MEDIUM | tsk.fsstat, tsk.filelist, tsk.masquerade, tsk.partitions |
| 2015-03-24T09:59:27 | USB Device Activation and Staging Confirmed via Registry Timeline (Case Q24) | HIGH | registry.system |
| 2015-03-24T09:59:27 | Deleted Files and Potential Data Staging on USB Stick - Alternative Explanation: Normal Filesystem Churn | MEDIUM | tsk.filelist, tsk.fsstat, tsk.partitions |
| 2015-03-24T13:47:54 | User Access to "Secret Project Data" During Staging Window (Case Q16) | HIGH | registry.usrclass.informant |
| 2015-03-24T20:54:16Z | Multi-Session Optical Media with Evidence of Anti-Forensics and File Deletion | HIGH | optical.listing |
| 2015-03-24T20:54:16Z | Potential Test/Reference Credit Card Numbers in Optical Media | MEDIUM | bulk.ccn |
| 2015-03-25T11:08:36Z | MFT Timestamp Analysis: Root Directory SI vs FN Timestamps - Potential Legitimate Behavior | LOW | forensic.timestomping |
| 2015-03-25T14:48:28 | CCleaner Execution on 2015-03-25 - Potential Anti-Forensics or Routine Maintenance | MEDIUM | ez.shimcache |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Multi-Session Optical Media with Evidence of Anti-Forensics and File Deletion

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T20:54:16Z to 2015-03-24T20:55:46Z |
| **Sources** | optical.listing |
| **Evidence Refs** | tc_f7ab2482 |
| **ATT&CK** | [T1070](https://attack.mitre.org/techniques/T1070/), [T1027](https://attack.mitre.org/techniques/T1027/), [T1052](https://attack.mitre.org/techniques/T1052/) |


The CD-R optical media (rm3.E01) uses UDF filesystem with VAT (Version Allocation Table) write-once technology, allowing incremental data staging across multiple sessions. Evidence analysis reveals 9 total sessions detected on the media. Forensic examination of deleted entries from sessions -1 through -7 reveals repeated directory creation and deletion patterns suggesting deliberate data staging followed by removal and replacement. Specifically: (1) Directories containing confidential documents were burned to sessions, then deleted in subsequent sessions; (2) File system entries show modification timestamps significantly earlier than creation timestamps on the CD-R (original file dates 2014-12-01 through 2015-01-23, but creation timestamps 2015-03-24), indicating files were copied from source systems; (3) Final visible session contains only innocuous sample images (Koala.jpg, Penguins.jpg, Tulips.jpg from Windows), masking prior exfiltration activity. This pattern is consistent with deliberate anti-forensics to conceal the primary data export while leaving a benign-appearing final state.



### 2. [HIGH] Systematic Data Staging Pattern: Multiple Archive Files Containing Government and Financial Records

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-01-05T19:15:08Z to 2015-03-24T20:55:46Z |
| **Sources** | optical.listing, bulk.zip_carved, bulk.duplicates |
| **Evidence Refs** | tc_f7ab2482, tc_8923e5ed, tc_8c6960a1 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1039](https://attack.mitre.org/techniques/T1039/), [T1052](https://attack.mitre.org/techniques/T1052/) |


Analysis of deleted file entries from the CD-R reveals a systematic staging pattern consistent with coordinated data exfiltration. Deleted directories contained multiple large archive files including: (1) /design/ directory with winter_storm.amr (14.5 MB, modified 2015-01-23) and winter_whether_advisory.zip (16.4 MB, modified 2014-12-16); (2) /pricing decision/ containing databases (my_favorite_cars.db 1.26 MB) and compressed archives (my_favorite_movies.7z 100 KB), alongside media files (new_years_day.jpg 10.2 MB, super_bowl.avi 10.3 MB); (3) Multiple text files named diary_#1d.txt, diary_#2d.txt, diary_#3d.txt with large sizes (121 KB to 2.36 MB) suggesting multi-part confidential documents. The deliberate directory naming (with 'd' and 'p' suffixes appearing on 3rd revision of each directory) combined with large file sizes and professional naming patterns (diary files with sequential numbering) indicates planned, organized data collection across multiple government agencies. Bulk extractor analysis identified 5,221 carved ZIP file entries containing Office document structures, indicating multiple compressed government documents were transferred to the media.



### 3. [HIGH] Deliberate File Type Concealment and Extension Spoofing in Exfiltrated Data

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-01-05T15:15:08Z to 2015-03-24T10:00:18Z |
| **Sources** | bulk.zip_carved, tsk.masquerade |
| **Evidence Refs** | tc_7ed4154c, tc_a00c1458, tc_fa33221e |
| **ATT&CK** | [T1027](https://attack.mitre.org/techniques/T1027/), [T1027.006](https://attack.mitre.org/techniques/T1027/006/), [T1030](https://attack.mitre.org/techniques/T1030/), [T1036](https://attack.mitre.org/techniques/T1036/), [T1052](https://attack.mitre.org/techniques/T1052/), [T1074](https://attack.mitre.org/techniques/T1074/) |


Forensic analysis reveals systematic and deliberate file type masquerading to conceal the true nature of exfiltrated documents. All deleted files from the directories burned to the CD-R exhibit discrepancies between filename extensions and actual file content signatures (detected via file signature analysis). Specific examples of extension spoofing include: (1) winter_storm.amr (14.5 MB) - filename extension .amr (audio format) but actual content is OLE (Office document); (2) winter_whether_advisory.zip (16.4 MB) - named as .zip archive but contains PPTX (PowerPoint) document; (3) new_years_day.jpg (10.2 MB) - .jpg extension but actual content is XLSX (Excel spreadsheet); (4) my_smartphone.png (4.4 MB) - .png image extension but contains DOCX (Word document); (5) diary_#1d.txt through diary_#3p.txt (121 KB to 2.36 MB) - all have .txt plain-text extensions but contain OLE, DOCX, or PPTX documents. This pattern indicates deliberate effort to mislabel files to evade detection during data exfiltration. Files bear naming patterns with suffixes 'd' and 'p' (likely representing \"design\" and \"pricing\") and sequential numbering suggesting organized classification of stolen materials. All files show creation timestamps 2015-03-24 (burn date) but modification dates 2014-12-01 through 2015-01-23, indicating copy from source systems where originals retain pristine metadata.

**Merged findings:**
- **Systematic File Extension Masquerading and Content Concealment (Case Q3)** (f_e83f7643, high, confirmed): Seventeen deleted files on the USB stick exhibit systematic masquerading of file extensions, where the reported file extension contradicts the actual binary content detected. All masqueraded files are flagged as deleted and were created 2015-03-24 around 09:59-10:00 UTC. The pattern demonstrates intentional concealment: (1) Text files (.txt) masqueraded as Word documents (.docx), PowerPoint (.pptx), or OLE documents; (2) Archive files (.zip, .7z) masqueraded as Microsoft Office files (PowerPoint, Excel); (3) Image files (.jpg, .png, .amr) masqueraded as Office documents or OLE; (4) Multiple diary entry files (diary_#1d.txt through diary_#3p.txt) detected as Office documents or OLE, suggesting sensitive content intentionally hidden under false extensions. The consistency of this masquerading pattern across 17 files indicates deliberate evasion technique rather than accidental corruption. File sizes range from 14.5 MB to 35.2 MB for masqueraded documents, suggesting substantial sensitive data volumes.
- **Recovered Deleted Archive Files and Carved Data Objects (Case Q23, Q25)** (f_cba792d2, medium, inference): Bulk extraction analysis successfully carved 376 ZIP file objects from unallocated space on the system evidence, as detected in the bulk.zip_carved carving results. The presence of carved archive files confirms that significant data structures were present in the image but were either deleted or overwritten. Additionally, the tsk.masquerade analysis identified archive files (.zip, .7z) that were deliberately masqueraded with non-archive extensions, indicating intentional concealment of compressed data. The combination of visible masqueraded archives (my_favorite_movies.7z, winter_whether_advisory.zip) and successfully carved additional ZIP objects suggests substantial volumes of archived data were collected, concealed, and partially deleted from the USB device. The carving results demonstrate that even after FAT32 deletion attempts, substantial data artifacts remain recoverable from the unallocated space of the device.

**Affected Systems:** bulk.zip_carved, tsk.masquerade



### 4. [HIGH] USB Device Activation and Staging Confirmed via Registry Timeline (Case Q24)

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T09:59:27 to 2015-03-24T13:58:34 |
| **Sources** | registry.system |
| **Evidence Refs** | tc_1b313e65, tc_5fbe8f87 |
| **ATT&CK** | [T1052.001](https://attack.mitre.org/techniques/T1052/001/), [T1074.001](https://attack.mitre.org/techniques/T1074/001/) |


Registry analysis provides direct evidence of USB device activation precisely during the data staging period. The Windows registry MountedDevices key shows a last-write timestamp of 2015-03-24 13:58:34Z, and the USBSTOR (USB Mass Storage Driver) registry entry shows a last-write timestamp of 2015-03-24 13:37:59Z, both occurring within the critical data staging window when deleted files on the USB device (rm2.E01) were created (2015-03-24 09:59:27 to 10:00:18 UTC). This registry timeline evidence directly correlates with the filesystem evidence showing that deleted files in the $OrphanFiles directory on the USB stick were created during this same timeframe. The sequence of events is: (1) 09:59:27-10:00:18 UTC - Deleted files created on USB device; (2) 13:37:59 UTC - USBSTOR driver last written; (3) 13:58:34 UTC - MountedDevices key last written. This pattern indicates continued USB device interaction approximately 4-5 hours after the initial file staging, consistent with additional verification or manipulation of staged data, possible verification operations, or device unmounting/remounting. Combined with the evidence of organized directory structure and deliberate file masquerading on the USB device, this registry timeline corroborates deliberate, systematic data collection and staging operation.



### 5. [HIGH] User Access to "Secret Project Data" During Staging Window (Case Q16)

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2015-03-24T13:47:54 to 2015-03-24T20:41:22 |
| **Sources** | registry.usrclass.informant |
| **Evidence Refs** | tc_e0ab63df, tc_22b4525b |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1074.001](https://attack.mitre.org/techniques/T1074/001/) |


Shellbags registry analysis of the 'informant' user's class registry (USRCLASS.DAT) reveals filesystem folder access history showing the user accessed a folder path containing "Secret Project Data" on 2015-03-24 13:47:54 UTC. Specifically, the registry entry shows: "S data\Secret Project Data\Secret Project Data\final [Desktop\6\0\4\1\]". The timestamp 2015-03-24 13:47:54 falls within the critical data staging window (09:59:27-10:00:18 UTC initial staging, with continued activity through 13:58:34 UTC). This folder access timing correlates directly with: (1) File creation timestamps on USB stick (09:59:27-10:00:18 UTC); (2) Registry MountedDevices activity (13:58:34 UTC); (3) CCleaner execution ~1 hour later (14:48:28 UTC). The folder path notation "final" suggests finalization or review of collected data. Additional shellbags entry at 2015-03-24 20:41:22 UTC shows user access to "My Computer\D:\pd" (drive D), further indicating continued interaction with removable/staging media during the active exfiltration period.



### 6. [MEDIUM] Potential Test/Reference Credit Card Numbers in Optical Media

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2015-03-24T20:54:16Z to 2015-03-24T20:55:46Z |
| **Sources** | bulk.ccn |
| **Evidence Refs** | tc_028272b8 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1020](https://attack.mitre.org/techniques/T1020/), [T1052](https://attack.mitre.org/techniques/T1052/) |


Analysis of bulk extractor output from the CD-R optical media (rm3.E01) identified 43 credit card numbers embedded within ZIP-compressed data. CRITICAL LIMITATIONS: (1) All detected CCNs are consistently labeled with the same ZIP archive identifier (42534135-ZIP-*), indicating they originated from a single ZIP file; (2) All CCNs are American Express test numbers (prefix 37xx), displaying systematic patterns typical of test data or reference datasets rather than real financial records; (3) The presence of these numbers in a file labeled with a hash identifier suggests they may be from a reference/test dataset rather than real PII; (4) CCNs appear in XML-formatted cells consistent with spreadsheet data export, which may indicate reference or test data structures; (5) No evidence establishes whether these are actual credit card numbers or test numbers from a reference corpus (similar to the GovDocs corpus for government documents). This represents either potential PII exfiltration OR carving of test reference data, and cannot be definitively characterized without additional context establishing the source and purpose of the data.



### 7. [MEDIUM] Deleted Files and Potential Data Staging on USB Stick - Alternative Explanation: Normal Filesystem Churn

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2015-03-24T09:59:27 to 2015-03-24T10:00:18 |
| **Sources** | tsk.filelist, tsk.fsstat, tsk.partitions |
| **Evidence Refs** | tc_b54181a9, tc_5d5b6450, tc_da4e26e7, tc_4e053733 |
| **ATT&CK** | [T1074.001](https://attack.mitre.org/techniques/T1074/001/), [T1052.001](https://attack.mitre.org/techniques/T1052/001/) |


The USB stick (rm2.E01, FAT32, 1GB) contains approximately 158,470 deleted file entries recoverable from unallocated space. IMPORTANT CAVEAT: The total of 158,470 deleted entries is extraordinarily large for a 1GB FAT32 device and may represent normal filesystem churn/activity rather than deliberate exfiltration staging. Of these, 47 deleted files are visible in $OrphanFiles directory organized into functional subdirectories: 'design' (2 files), 'PRICING' (4 files), 'progress' (3 files), 'proposal' (2 files), and 'TECHNICAL' (6 files), plus additional individual deleted files. The organized directory structure observed in the 47 visible orphaned files is noteworthy and suggests intentional organization, however the scale of total deletion (158,470 entries) suggests this device may have been used for extended file operations and normal deletion cycles. All visible deleted files show consistent creation times (crtime) of 2015-03-24 09:59:27 to 10:00:18 UTC and modification dates ranging from December 2014 to January 2015, which is consistent with batch file operations. The volume label 'IAMAN $_@' is notable but could represent legitimate device identification. The presence of deliberate directory structure organization in the 47 visible orphan files is suggestive of intentional collection, but without context establishing business purpose or authorization, could also represent project management of legitimate work materials. The User directory also contains 157 deleted entries.",



### 8. [MEDIUM] Government and OMB Personnel Email Indicators and Public Reference Material Documentation

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2014-12-16T12:10:26 to 2015-03-24T10:00:18 |
| **Sources** | bulk.email, bulk.domain, bulk.url |
| **Evidence Refs** | tc_eb0987d3, tc_496ff86e, tc_b02a3674 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1048.003](https://attack.mitre.org/techniques/T1048/003/) |


Bulk extraction recovered email addresses and domain references associated with U.S. government agencies, indicating the presence of government-related documents on the USB stick: (1) Eric_P._Lauer@omb.eop.gov - Executive Office of the President, Office of Management and Budget; (2) mmun@loc.gov - Library of Congress; (3) wayne.longman@att.net - external contact. Domain references include whitehouse.gov, omb.eop.gov, digitalcorpora.org (GovDocs reference corpus - a PUBLIC collection of unclassified government documents used for forensic research), and lcweb.loc.gov (Library of Congress public collections). The recovered URLs reference public whitehouse.gov OMB e-government guidance documents (FEA_CRM_v23, FY09_Ref_Model_Mapping_QuickGuide) which are available on the public OMB website. CRITICAL: The presence of digitalcorpora.org references indicates these documents may be from the publicly available GovDocs corpus rather than classified materials. The presence of legitimate government email addresses combined with OMB document references does NOT establish unauthorized access or exfiltration of classified materials. The domains desert-estates.info and desert-estates.inf appear only once or twice in extracted data and are likely carving artifacts rather than evidence of active communication with a C2 server.



### 9. [MEDIUM] USB Device Characteristics - Potentially Consistent with Anti-Forensics, but Alternative Explanations Exist

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2015-03-24T09:59:00 to 2015-03-24T10:00:18 |
| **Sources** | tsk.fsstat, tsk.filelist, tsk.masquerade, tsk.partitions |
| **Evidence Refs** | tc_5d5b6450, tc_b54181a9, tc_fa33221e, tc_da4e26e7 |
| **ATT&CK** | [T1551](https://attack.mitre.org/techniques/T1551/), [T1070.004](https://attack.mitre.org/techniques/T1070/004/) |


The USB stick exhibits characteristics that could be consistent with anti-forensics preparation OR normal device usage: (1) Suspicious volume label 'IAMAN $_@' - This could represent obfuscation OR legitimate device identification/labeling; (2) FAT32 filesystem with standard patterns and retention of deleted file metadata in $OrphanFiles; (3) All 47 visible deleted files in $OrphanFiles directory share consistent creation timestamps (2015-03-24 09:59:27 to 10:00:18 UTC), which COULD indicate batch deletion following staging, OR could represent normal file operations during a specific work session; (4) Approximately 158,470 total deleted entries - This large number is consistent with either extensive deliberate data deletion OR normal filesystem churn over the device's lifetime; (5) File modification times (Dec 2014-Jan 2015) predating creation times (Mar 24 2015) suggest files were not originally created on this device but copied from another source. IMPORTANT CAVEAT: The pattern could support either scenario: (A) Malicious: Device wiping and staging followed by deletion to destroy evidence; (B) Legitimate: Device used for project file transfers and management with normal file deletion cycles. The Free Sector Count from FSInfo shows 2,088,952 free sectors, indicating extensive free space consistent with normal filesystem operation. Without evidence of actual wiping tools being executed (e.g., CCleaner, cipher.exe /w, etc.), this finding documents suspicious patterns but does not definitively establish evidence destruction.",



### 10. [MEDIUM] Recovery of Government Reference Materials and Personnel Information from Optical Media

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2014-12-01T14:50:26Z to 2015-03-24T20:55:46Z |
| **Sources** | bulk.ccn, bulk.email, bulk.exif, bulk.rfc822, bulk.telephone, bulk.url, optical.listing |
| **Evidence Refs** | tc_028272b8, tc_b6a45f6c, tc_bc560a5f, tc_cc1cc6aa, tc_d3440be7, tc_f0a301ac, tc_f7ab2482 |
| **ATT&CK** | [T1005](https://attack.mitre.org/techniques/T1005/), [T1020](https://attack.mitre.org/techniques/T1020/), [T1039](https://attack.mitre.org/techniques/T1039/), [T1048](https://attack.mitre.org/techniques/T1048/), [T1052](https://attack.mitre.org/techniques/T1052/) |


Consolidated analysis reveals the CD-R contains materials referencing multiple U.S. government agencies spanning NASA, OMB, NIH, and Library of Congress. However, CRITICAL CAVEATS must be noted: (1) Multiple recovered URLs reference digitalcorpora.org/corpora/govdocs, indicating materials may be from the PUBLIC GovDocs reference corpus used in forensic research; (2) OMB document references are to publicly available FEA and e-government guidance materials (2007 versions) available on public whitehouse.gov; (3) Library of Congress materials reference public digital collection URLs (hdl.loc.gov/loc.pnp - the public Library of Congress Prints & Photographs Online Catalog); (4) Email addresses may be from public reference documents, not evidence of unauthorized access; (5) The 43 credit card numbers all originate from a single ZIP file and display patterns typical of test/reference data (American Express prefix 37xx); (6) Telephone numbers and metadata may be from reference materials rather than evidence of active intelligence gathering; (7) The organized directory naming patterns (design, pricing decision, etc.) may represent project management of reference materials rather than exfiltration staging. The dataset is consistent with a collection of government reference materials, public datasets, and test data rather than a targeted collection of classified or proprietary information. File creation dates (2015-03-24) mark a discrete staging event, with original file modification dates spanning 2014-12-01 through 2015-01-23, but origin and authorization context remain undetermined.

**Merged findings:**
- **Recovery of Government Reference Materials (Potentially from Public Corpus) on Optical Media** (f_84cedfe9, medium, inference): Evidence from the CD-R (rm3.E01) optical media indicates recovery of documents related to U.S. government agencies. Deleted directory structures recovered from multiple burn sessions on the UDF write-once CD reveal directories named \"design\", \"pricing decision\", \"progress\", \"proposal\", and \"technical review\" containing Office documents and archives. CRITICAL CAVEAT: Email addresses recovered from embedded Office documents include personnel from NASA, OMB, NIH, and Library of Congress; however, bulk extractor analysis reveals that many documents reference digitalcorpora.org/corpora/govdocs, which is a PUBLIC reference corpus of unclassified government documents used for forensic research and testing. Recovered URLs point to official government resources including PUBLIC OMB e-government reference materials (OMB circulars, FEA guidance documents) available on whitehouse.gov. The presence of systematic references to public reference materials and test datasets suggests these may be government reference materials or training data rather than classified or proprietary information. Multiple ZIP files containing Office documents were burned to the CD with final visible session containing only innocuous sample images (Koala.jpg, Penguins.jpg, Tulips.jpg). Without establishing the source, classification level, or authorization context, these materials cannot be definitively characterized as \"confidential\" or \"exfiltrated.\"

**Affected Systems:** bulk.ccn, bulk.email, bulk.exif, bulk.rfc822, bulk.telephone, bulk.url, optical.listing



### 11. [MEDIUM] CCleaner Execution on 2015-03-25 - Potential Anti-Forensics or Routine Maintenance

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2015-03-25T14:48:28 to 2015-03-25T14:48:28 |
| **Sources** | ez.shimcache |
| **Evidence Refs** | tc_5205ac71 |
| **ATT&CK** | [T1070.004](https://attack.mitre.org/techniques/T1070/004/), [T1551](https://attack.mitre.org/techniques/T1551/) |


Forensic analysis of the system shimcache (AppCompatCache) reveals that CCleaner version 5.04 (ccsetup504.exe) was executed on 2015-03-25 at 14:48:28 UTC from the Desktop/Download directory. CCleaner is a third-party utility known for deletion of browsing history, temporary files, cache files, and other system artifacts. IMPORTANT CAVEAT: The execution timing occurs 2 hours and 43 minutes before the system's final shutdown at 15:31:05 UTC. However, CCleaner execution can be explained by multiple scenarios: (1) Deliberate anti-forensics activity designed to obscure user activity and eliminate evidence of data collection/exfiltration; (2) Routine system maintenance/cleanup; (3) Artifact from IT/forensic response activities (if this system was seized and analyzed by forensic response teams, CCleaner may have been executed as part of IR/analysis cleanup). The timing is suggestive but not definitive of anti-forensics intent without corroborating evidence of deliberate evidence destruction (e.g., forensic evidence showing successful deletion of specific artifacts).



### 12. [LOW] Cloud Services Presence (Google Drive and iCloud) - Legitimate vs Malicious Use Ambiguous

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2015-03-22T15:11:51Z to 2015-03-25T14:48:28Z |
| **Sources** | tsk.filelist |
| **Evidence Refs** | tc_0fdddb15 |
| **ATT&CK** | [T1020](https://attack.mitre.org/techniques/T1020/), [T1567](https://attack.mitre.org/techniques/T1567/) |


Forensic evidence indicates presence of cloud-based synchronization services on the informant's system: (1) Google Drive Synchronization: Registry analysis reveals installation of Google Drive sync client (googledrivesync64.dll) registered in HKLM\\Software\\Classes with component ID, indicating integration with Windows shell and file explorer. The sync client executable (googledrivesync.exe) is present in Users/informant/Downloads directory; (2) iCloud Setup: icloudsetup.exe was downloaded to the informant's Downloads folder, indicating potential Apple device synchronization capability. IMPORTANT CAVEAT: The mere presence of cloud services does NOT establish malicious intent. Legitimate explanations include: (1) Normal business/personal use of cloud storage for file synchronization; (2) Backup and redundancy for work-related documents; (3) Multi-device workflow management. The presence of these tools in the Downloads directory indicates they were downloaded and installed, but provides no evidence of whether they were actually used for data exfiltration versus legitimate cloud storage. Without evidence of actual data synchronization/upload to cloud services (e.g., network artifacts, cloud service logs, or successful file uploads), cloud service presence indicates capability but not confirmed malicious activity.",



### 13. [LOW] MFT Timestamp Analysis: Root Directory SI vs FN Timestamps - Potential Legitimate Behavior

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2015-03-25T11:08:36Z to 2015-03-25T14:48:28Z |
| **Sources** | forensic.timestomping |
| **Evidence Refs** | tc_3b7ffd98 |
| **ATT&CK** | [T1070.006](https://attack.mitre.org/techniques/T1070/006/) |


Forensic analysis of the Master File Table (MFT) from the primary system disk (pc.E01) reveals a discrepancy between two timestamp fields on the root directory: (1) Standard Information (SI) Created timestamp: 2009-07-14 02:38:56 UTC; (2) File Name (FN) Created timestamp: 2015-03-25 11:08:36 UTC. The 2080-day discrepancy (approximately 5 years, 8 months) between timestamps is notable. IMPORTANT CAVEAT: This discrepancy may reflect LEGITIMATE Windows behavior rather than deliberate timestomping: (1) The SI timestamp (2009-07-14) corresponds to the Windows 7 Enterprise OS build date, which is a known Windows behavior where newly-installed systems retain the build OS timestamp in the SI field; (2) The FN timestamp (2015-03-25) represents when the OS was actually installed on this specific system (2015-03-22 per registry evidence); (3) Newly-installed Windows systems often show SI timestamps from the OS build date while FN timestamps reflect actual installation; (4) This pattern is documented as standard Windows behavior and may not indicate deliberate timestamp manipulation. Without additional forensic evidence of successful manipulation of timestamps (e.g., evidence of timestomp utility execution or conflicting timestamps in other filesystem entries), this finding does not definitively establish anti-forensics activity.



### 14. [INFO] System Configuration Summary: OS Installation, Timezone, Network Configuration (Case Q2, Q3, Q8)

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T03:01:06Z to 2015-03-25T15:31:05Z |
| **Sources** | registry.query.software, registry.query.system |
| **Evidence Refs** | tc_415acbd7, tc_49a38bb9, tc_5bfe896d, tc_60f7f6c1, tc_255d335c |


Registry analysis reveals the following system configuration parameters: (1) Windows Operating System: Windows 7 Enterprise installed on 2015-03-22 (Unix timestamp 1427034866 = 2015-03-22T03:01:06Z = 2015-03-22 22:01:06 EST); (2) Registered Owner: informant; (3) Computer Name: INFORMANT-PC; (4) Timezone: Eastern Standard Time (UTC-5, Bias=300 minutes); (5) Network Configuration: Single active DHCP-configured network interface with IP address 10.11.11.129, subnet mask 255.255.255.0, DHCP server 10.11.11.254, DNS server 10.11.11.2, domain 'localdomain'. Network adapter was assigned this DHCP lease on 2015-03-25 at 09:06:30 UTC with a 30-minute lease duration. The system shutdown occurred at 2015-03-25T15:31:05Z, approximately 3 hours and 43 minutes after the last recorded user logon by 'informant' at 2015-03-25 13:05:47Z.



### 15. [INFO] Disk Image Hash Values and Acquisition Verification (Case Q1)

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | hashdeep.hashes |
| **Evidence Refs** | tc_b6db0b71 |


Forensic imaging and hash verification completed for all three evidence exhibits: (1) pc.E01 (Primary System Disk): Size 2,147,463,521 bytes; MD5: 7338dbed7d2293334801416613bc17b5; SHA-256: e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9; (2) rm2.E01 (USB Stick): Size 255,051,328 bytes; MD5: 6cfbfdb14e0a504684a338b87362d753; SHA-256: 25215f9bcb51ceee9147886ed3f5c13ef148de634fc5114491e0f8dad8b15696; (3) rm3.E01 (CD-R Media): Size 94,594,894 bytes; MD5: b49cb0c7dfccb8cd0e39424e3f1abc86; SHA-256: 336e1307721ef5f63679379961d1716b74f986e69df8c40117d9cea7858d512b. Hash verification confirms integrity of all acquired images during forensic processing.



### 16. [INFO] Browser and Application Software Installation Timeline (Case Q9, Q10, Q11)

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2015-03-22T15:01:02Z to 2015-03-25T13:05:47Z |
| **Sources** | registry.software |
| **Evidence Refs** | tc_772c6694, tc_7d4aee4d, tc_601d5511 |


Analysis of registry installation metadata and shimcache execution records reveals the following key applications were installed contemporaneous with OS installation on 2015-03-22: (1) Google Chrome v.41.0.2272.101 with Google Update Helper v.1.3.26.9, installed 2015-03-22 15:11:51Z; (2) Microsoft Office 2013 (Word, Excel, PowerPoint, Access, Outlook, InfoPath) with installation timestamps 2015-03-22 15:01:02-15:01:03Z. The registry shows LastLoggedOnUser as 'informant' with last logon at 2015-03-25 13:05:47Z. Microsoft Outlook was the designated email client as evidenced by registry CLSID entries {0006F01F-0000-0000-C000-000000000046} and {0006F050-0000-0000-C000-000000000046} pointing to Outlook.EXE. No Firefox installation detected. These applications were available to the 'informant' user account prior to the 2015-03-24 data exfiltration activities.



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
| Email | `eric_p._lauer@omb.eop.gov` |  | Government and OMB Personnel Email Indicators and Public Reference Material Docu |
| Email | `mmun@loc.gov` |  | Government and OMB Personnel Email Indicators and Public Reference Material Docu |
| Email | `wayne.longman@att.net` |  | Government and OMB Personnel Email Indicators and Public Reference Material Docu |




---

## Appendix C: MITRE ATT&CK Coverage

18 techniques identified across findings.


**Kill Chain Coverage:** Defense Evasion (6) > Collection (4) > Exfiltration (7) > Other (1)


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1027](https://attack.mitre.org/techniques/T1027/) | Obfuscated Files or Information | Multi-Session Optical Media with Evidence of...; Deliberate File Type Concealment and Extension... |
| [T1027.006](https://attack.mitre.org/techniques/T1027/006/) | HTML Smuggling | Deliberate File Type Concealment and Extension... |
| [T1036](https://attack.mitre.org/techniques/T1036/) | Masquerading | Deliberate File Type Concealment and Extension... |
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | Multi-Session Optical Media with Evidence of... |
| [T1070.004](https://attack.mitre.org/techniques/T1070/004/) | File Deletion | USB Device Characteristics - Potentially...; CCleaner Execution on 2015-03-25 - Potential... |
| [T1070.006](https://attack.mitre.org/techniques/T1070/006/) | Timestomp | MFT Timestamp Analysis: Root Directory SI vs... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1005](https://attack.mitre.org/techniques/T1005/) | Data from Local System | Potential Test/Reference Credit Card Numbers...; Government and OMB Personnel Email Indicators...; Systematic Data Staging Pattern: Multiple...; Recovery of Government Reference Materials and...; User Access to "Secret Project Data" During... |
| [T1039](https://attack.mitre.org/techniques/T1039/) | Data from Network Shared Drive | Systematic Data Staging Pattern: Multiple...; Recovery of Government Reference Materials and... |
| [T1074](https://attack.mitre.org/techniques/T1074/) | Data Staged | Deliberate File Type Concealment and Extension... |
| [T1074.001](https://attack.mitre.org/techniques/T1074/001/) | Local Data Staging | Deleted Files and Potential Data Staging on...; USB Device Activation and Staging Confirmed...; User Access to "Secret Project Data" During... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1020](https://attack.mitre.org/techniques/T1020/) | Automated Exfiltration | Potential Test/Reference Credit Card Numbers...; Recovery of Government Reference Materials and...; Cloud Services Presence (Google Drive and... |
| [T1030](https://attack.mitre.org/techniques/T1030/) | Data Transfer Size Limits | Deliberate File Type Concealment and Extension... |
| [T1048](https://attack.mitre.org/techniques/T1048/) | Exfiltration Over Alternative Protocol | Recovery of Government Reference Materials and... |
| [T1048.003](https://attack.mitre.org/techniques/T1048/003/) | Exfiltration Over Unencrypted Non-C2 Protocol | Government and OMB Personnel Email Indicators... |
| [T1052](https://attack.mitre.org/techniques/T1052/) | Exfiltration Over Physical Medium | Potential Test/Reference Credit Card Numbers...; Multi-Session Optical Media with Evidence of...; Systematic Data Staging Pattern: Multiple...; Deliberate File Type Concealment and Extension...; Recovery of Government Reference Materials and... |
| [T1052.001](https://attack.mitre.org/techniques/T1052/001/) | Exfiltration over USB | Deleted Files and Potential Data Staging on...; USB Device Activation and Staging Confirmed... |
| [T1567](https://attack.mitre.org/techniques/T1567/) | Exfiltration Over Web Service | Cloud Services Presence (Google Drive and... |


### Other

| Technique | Name | Findings |
|-----------|------|----------|
| [T1551](https://attack.mitre.org/techniques/T1551/) |  | USB Device Characteristics - Potentially...; CCleaner Execution on 2015-03-25 - Potential... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 364 |
| Findings submitted | 16 |
| Confirmed | 8 |
| Inferences | 8 |
| Input tokens | 13.1K |
| Output tokens | 140.8K |
| Total tokens | 153.9K |
| Audit log | /home/mulder/.mulder/cases/nist-data-leakage.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 13.1K | 140.8K | 153.9K |




<details>
<summary>Evidence Sources (99)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 9 |
| tsk.filelist | sleuthkit | 51 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 264 |
| bulk.duplicates | bulk_extractor | 58 |
| bulk.email | bulk_extractor | 43 |
| bulk.rfc822 | bulk_extractor | 41 |
| bulk.url | bulk_extractor | 288 |
| bulk.url_services | bulk_extractor | 19 |
| scalpel.audit | scalpel | 1 |
| tsk.fsstat | sleuthkit | 40 |
| tsk.masquerade | sleuthkit | 17 |
| optical.listing | mulder-optical | 58 |
| tsk.partitions | sleuthkit | 9 |
| tsk.partitions | sleuthkit | 10 |
| hashdeep.hashes | hashdeep | 6 |
| hashdeep.hashes | hashdeep | 6 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 237 |
| bulk.email | bulk_extractor | 12 |
| bulk.rfc822 | bulk_extractor | 41 |
| bulk.url | bulk_extractor | 300 |
| bulk.url_services | bulk_extractor | 21 |
| hashdeep.hashes | hashdeep | 6 |
| tsk.filelist | sleuthkit | 104709 |
| tsk.filelist.p1 | sleuthkit | 93 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.ccn | bulk_extractor | 43 |
| bulk.domain | bulk_extractor | 7303 |
| bulk.duplicates | bulk_extractor | 1738 |
| bulk.email | bulk_extractor | 30 |
| bulk.exif | bulk_extractor | 21 |
| bulk.rfc822 | bulk_extractor | 41 |
| bulk.telephone | bulk_extractor | 15 |
| bulk.url | bulk_extractor | 7204 |
| bulk.url_services | bulk_extractor | 60 |
| bulk.zip_carved | bulk_extractor | 5221 |
| exiftool.metadata | exiftool | 9 |
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
| registry.query.software | python-registry | 1 |
| registry.query.software | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| evtx.manifest | evtx-extract | 54 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| vshadow.info | vshadowinfo | 1 |
| exiftool.metadata | exiftool | 9 |
| ez.mft | eztools | 98918 |
| ez.shimcache | eztools | 307 |
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
| tsk.timeline | sleuthkit | 344089 |
| registry.system | regripper | 199 |
| strings.output | strings | 591858 |
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
| registry.query.system | python-registry | 1 |
| registry.query.system | python-registry | 1 |
| composite.timeline | composite | 2117 |
| composite.defense_evasion | composite | 231 |
| forensic.timestomping | timestomp_detector | 1 |
| composite.exfil | composite | 2446 |
| composite.file_staging | composite | 578 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
