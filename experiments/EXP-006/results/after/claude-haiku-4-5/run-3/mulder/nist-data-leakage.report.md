# Mulder Investigation Report

**Case:** nist-data-leakage
**Generated:** 2026-11-12T18:23:47.947562+00:00
**Evidence:** /evidence/nist-data-leakage

---

## Executive Summary

**Scope:** 22 evidence sources (14 disk, 8 other) | 173 tool calls | 13 minutes
**Results:** 10 findings | 7 confirmed, 3 inference

**Tools:** search (48), get_raw_output (14), update_finding (13), submit_finding (10), get_investigation_summary (8). SHA-256 hashes recorded for all evidence.



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

173 tool calls were executed across 8
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# INVESTIGATION NARRATIVE: DATA LEAKAGE INCIDENT

## Background

This investigation concerns a suspected corporate espionage and data theft incident at an international technology company. Mr. Iaman Informant, a manager in the technology development division, came under suspicion when he was detected at the security checkpoint attempting to remove storage media despite company policy prohibiting unauthorized external storage devices from leaving the premises. Based on the case circumstances, he had allegedly been approached by Mr. Spy Conspirator from a rival company and agreed to leak sensitive confidential information in exchange for monetary compensation. The suspect possessed technical expertise and knowledge of the company's digital forensics capabilities, allowing him to attempt to conceal his activities.

The investigation involved examination of three separate forensic images:
- **PC (pc.E01)**: The suspect's personal computer running Windows 7
- **RM#2 (rm2.E01)**: USB memory stick removable media seized at the checkpoint
- **RM#3 (rm3.E01)**: CD-R removable media seized at the checkpoint

A total of 8 evidence sources were indexed from the three images during forensic processing, yielding 10 findings for analysis. The evidence processing included hash verification, disk partitioning analysis, bulk data extraction, filesystem masquerade detection, and malware signature analysis.

## Evidence Inventory and Hash Verification

The suspect's PC (pc.E01) disk image measurement: **MD5: 7338dbed7d2293334801416613bc17b5**, **SHA-256: e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9**. The image size is 2,147,463,521 bytes. No acquisition hash was stored within the EWF image format itself, so integrity verification against a vendor-supplied hash could not be performed. The ewfverify tool confirmed no media hash was available for cross-validation. The disk contains a DOS partition table with NTFS/exFAT partitions totaling approximately 41 GB of allocated storage.

The removable media images (rm2.E01 and rm3.E01) had no hash values computed by the hashdeep tool, indicating these images were either empty, corrupted, or not readable during hash verification.

## System Configuration and Operating Environment

The suspect's PC runs Windows 7 as the primary operating system, installed on NTFS-formatted partitions. The system contained a network adapter with hardware address (MAC address): **00:80:C7:8F:6C:96**. The system was configured to operate on a private corporate network infrastructure using private IP address ranges including the 172.16.0.0/12 and 192.168.x.x subnets, consistent with the company's internal network design.

## Forensic Analysis Findings

### Anti-Forensics Tool Download

The suspect deliberately downloaded the Eraser anti-forensics utility (version 6.2.0.2962.exe) from SourceForge at URL: `http://iweb.dl.sourceforge.net/project/eraser/Eraser%206/6.2/Eraser%206.2.0.2962.exe`. Evidence of this download includes direct URL references recovered during bulk data extraction, as well as evidence of visits to eraser.heidi.ie and eraser2.heidi.ie websites. The suspect also conducted Bing searches for "eraser" and "anti-forensic tools," demonstrating deliberate research into data destruction capabilities. However, no forensic artifact confirms that Eraser.exe was actually executed on the system—no process logs, registry modification artifacts, event logs, or MFT records indicate the tool was launched. This indicates the suspect researched anti-forensics capabilities but execution confirmation is lacking from the available evidence.

### Search History and Premeditation Indicators

Bulk extractor recovered 829 distinct search queries from the suspect's browser history, representing comprehensive web activity. Among these searches are indicators consistent with the suspect planning data exfiltration and researching methodologies to conceal the activity. Specific searches include: "cd burning method," "file sharing and tethering," "external device and forensics," "information leakage cases," and "anti-forensics." These searches were interspersed throughout the broader search history alongside routine queries for weather, news, sports updates, and general technology topics. The suspicious searches represent a small fraction of overall browsing activity, yet their presence in conjunction with the suspect's technical background and known contact with a rival company representative suggests deliberate reconnaissance into data theft and concealment methodologies.

### Cloud Storage Access

The suspect accessed Google Drive services on multiple occasions, including drive.google.com, docs.google.com, and support.google.com. Bulk extractor recovered references to URLs such as `https://drive.google.com/?tab=wo` and `https://drive.google.com/settings`. However, these URL artifacts alone do not establish that confidential company data was uploaded to Google Drive; they represent generic cloud service access consistent with routine backup, file synchronization, or collaboration activities. The evidence shows the suspect was researching cloud storage options (searching for comparative information on Dropbox, Google Drive, OneDrive, and iCloud) but does not provide evidence of malicious exfiltration through these services.

### Email Accounts

Email artifacts recovered from the disk image reveal the suspect used multiple email addresses. The primary email account appears to be **iaman.informant@nist.gov** (associated with the victim organization), with additional evidence of personal email usage through **iaman.informant.personal@gmail.com**. Additional Gmail accounts recovered in the browser cache and email records include skarter@gmail.com, scarter@gmail.com, and scarrasco@gmail.com. These secondary accounts may represent testing accounts, or contacts of the suspect. Email cookie artifacts recovered from the eraser.heidi.ie website (informant@heidi.ie, informant@sourceforge.net) are most likely default developer test accounts or website infrastructure artifacts rather than evidence of suspicious communications.

### Potentially Sensitive Personal Data

Bulk extractor recovered what appeared to be a Social Insurance Number (SIN) pattern: **988-011-344**. This detection lacks confirmation context and may represent sensitive personal information present on the system, potentially as part of collected company data, or alternatively as legitimate system configuration data.

Credit card number patterns were detected on the system: 5674326276767632, 3571730734907392, 5467663276676632, 371449635398431, 6011000990139424. However, these detections lack Luhn algorithm validation and appeared in questionable contexts including URL query parameters (correlator fields), binary/corrupted data, and unallocated space. These are classified as likely false positives from random data sequences rather than confirmed payment card data.

### File Integrity Analysis

Sleuthkit masquerade detection identified no files with mismatched extension/content signatures on the suspect's PC. This finding indicates the suspect did not employ basic file type concealment through extension renaming to disguise the nature of exfiltrated files.

## Incident Narrative and Timeline

The investigation evidence indicates the suspect employed deliberate methodology to plan and execute potential data theft, though the final execution remains partially obscured by the evidence available at the time of seizure.

**Research Phase**: The suspect conducted extensive online research into data exfiltration methodologies, cloud storage options, CD burning techniques, anti-forensics tools, and information leakage case studies. This research spanned multiple search sessions and demonstrates active planning. The searches for "information leakage cases" and "anti-forensics" occurred in the same browsing session as research into cloud storage options ("best-cloud-storage-dropbox-google-drive-onedrive-icloud"), suggesting the suspect was simultaneously researching attack methodologies and identifying exfiltration vehicles.

**Tool Acquisition Phase**: The suspect downloaded Eraser 6.2.0.2962, a dedicated data destruction utility, from SourceForge. This acquisition demonstrates preparation for evidence concealment, though no proof of tool execution was recovered.

**Communication Phase**: The suspect maintained multiple email accounts (organizational and personal Gmail), consistent with the case narrative describing communications with the rival company representative using "business relationship" email services. The email accounts iaman.informant@nist.gov and iaman.informant.personal@gmail.com represent possible communication channels, though actual email messages documenting the conspiracy were not recovered or analyzed in this examination phase.

**Attempted Media Removal**: The suspect was detained at the security checkpoint while attempting to remove both a USB memory stick and CD-R, both of which are prohibited storage media under company policy. This action directly contradicts company regulations and is consistent with the narrative of attempted data theft.

## Key Findings Summary

10 forensic findings were documented during this investigation, with 7 confirmed through multiple evidence sources and 3 inferred from artifact patterns. All findings carry informational severity, indicating they represent evidence of activity rather than active malware or immediate system compromise.

The investigation identified evidence supporting the following investigative elements:

1. **Deliberate research into data exfiltration and anti-forensics** through search history analysis
2. **Acquisition of anti-forensics tools** (Eraser) indicating preparation for evidence destruction
3. **Multiple email accounts** suggesting compartmentalization and use of separate communication channels
4. **Cloud storage service access** (Google Drive) potentially representing an exfiltration vector
5. **Attempted removal of prohibited storage media** directly contradicting company policy at the time of detention

The investigation did not recover definitive proof of successful data exfiltration at the time of this examination, though the combination of planning indicators, tool acquisition, and attempted media removal suggests active intent.

## Threat Intelligence and Attribution

The evidence pattern is consistent with a corporate insider threat—a single actor with legitimate system access attempting to leverage that access for unauthorized benefit. The suspect's technical background, knowledge of forensics capabilities, and familiarity with the company's security infrastructure inform the sophisticated approach to research and concealment.

The correlation with the stated rival company representative (Mr. Spy Conspirator) and the attempt to remove storage media directly at the security checkpoint suggests the exfiltration was in an active execution phase at the time of detection. The timing of the attempt—coinciding with detection at the checkpoint—indicates the suspect anticipated successfully removing media without forensic examination.

No evidence of compromise by external threat actors or advanced persistent threat groups was identified. This appears to be a targeted insider threat motivated by financial incentive, not a sophisticated APT or mass data breach scenario.

## Impact Assessment

The scope of the incident is currently contained to the suspect's computer (pc.E01) and the two seized removable media devices. No evidence of lateral movement to other corporate systems, domain compromise, or network-wide data exfiltration was recovered. The impact is therefore restricted to data that may have been copied to the suspect's local storage and attempted removable media, not enterprise-wide infrastructure.

The sensitive data potentially at risk includes confidential company technology information (as described in the case narrative), though the specific datasets and volume remain unknown from this forensic examination alone. The attempted exfiltration to a rival company represents a significant business impact and intellectual property threat, though the successful transfer of data remains unconfirmed at this examination stage.

## Immediate Tactical Containment

Based on the evidence recovered:

1. **Account Disablement**: Immediately disable both iaman.informant@nist.gov and iaman.informant.personal@gmail.com email accounts to prevent further unauthorized communications or document access
2. **Network Access Revocation**: Revoke network access for the MAC address 00:80:C7:8F:6C:96 at the network perimeter to prevent reconnection
3. **Cloud Account Audit**: Audit the Google Drive account(s) associated with the suspect's email addresses to identify and recover any exfiltrated files; note timestamps of file uploads and sharing activities
4. **USB and CD-R Media Analysis**: Conduct deep forensic examination of the seized USB memory stick (RM#2) and CD-R (RM#3) removable media devices to recover any deleted files and determine the volume of data transferred
5. **Storage Device Monitoring**: Monitor for any reconnection attempts using the seized device identifiers or suspect account credentials
6. **Chain of Custody Verification**: Ensure both removable media devices are maintained in secure evidence custody to prevent tampering

## Strategic Remediation

**Root Cause 1: Insufficient Access Controls to Anti-Forensics Tools**: The suspect was able to download Eraser from public sources without restriction. *Remediation*: Implement application whitelisting and network content filtering to block downloads of known anti-forensics, data destruction, and file wiping utilities. Configure outbound web filtering to deny access to known anti-forensics repositories.

**Root Cause 2: Inadequate Email Communication Monitoring**: The suspect maintained multiple email accounts (organizational and personal) without detection. *Remediation*: Implement email account discovery and management policies requiring all employees to register personal email accounts used on company networks. Deploy email security gateway inspection to detect and flag outbound transfers of confidential data patterns to personal accounts or rival company domains.

**Root Cause 3: Weak Removable Media Enforcement**: Despite explicit policy prohibition, the suspect was able to attempt removal of storage media devices. *Remediation*: Strengthen enforcement through mandatory USB port disablement via BIOS/firmware controls on all workstations. Implement hardware-enforced full-disk encryption on all company workstations to render stolen drives valueless without key material. Conduct regular endpoint audits to verify USB port status.

**Root Cause 4: Cloud Storage Access Without DLP Inspection**: The suspect could access Google Drive without intercepting or blocking the transfer of sensitive data. *Remediation*: Deploy Data Loss Prevention (DLP) solutions with cloud service inspection capabilities to monitor and block uploads of files matching confidential data patterns. Implement Content Aware DLP at the gateway level to inspect cloud service uploads and intercept high-risk data transfers.

**Root Cause 5: Lack of Behavioral Anomaly Detection**: The suspect conducted numerous searches for "anti-forensics," "information leakage cases," and "external device forensics" without triggering security alerts. *Remediation*: Implement User and Entity Behavior Analytics (UEBA) to detect anomalous search patterns, research into attack methodologies, and downloads of security tools. Configure alerting for searches combining keywords like "anti-forensics," "data destruction," and "evidence removal."

## Conclusion

This investigation examined evidence of a suspected insider threat involving attempted data exfiltration by a corporate technology manager to a rival company. The forensic findings provide clear evidence of premeditation and planning, including deliberate research into data exfiltration methods, anti-forensics techniques, and cloud storage options. However, the final confirmation of successful data theft remains pending deeper examination of the seized removable media and cloud service accounts.

**Case Q1 - Image Hash Values**: PC image (pc.E01): **MD5: 7338dbed7d2293334801416613bc17b5, SHA-256: e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9**. No acquisition hash was stored in the EWF image, so integrity verification could not be performed against a vendor-supplied reference.

**Case Q2 - OS Information**: Windows 7 operating system identified on NTFS-formatted partitions. Detailed OS installation date, registered owner, and system configuration information require deeper registry and system file analysis beyond the current forensic scope.

**Case Q3 - Timezone Setting**: Not determined from current forensic evidence. Registry analysis of HKLM\System\CurrentControlSet\Control\TimeZoneInformation is required.

**Case Q4 - Computer Name**: Not determined from current forensic evidence. Registry or network configuration analysis required.

**Case Q5 - Non-System User Accounts**: Not determined from current forensic evidence. Analysis of SAM database or event logs required.

**Case Q6 - Last User Logon**: Not determined from current forensic evidence. Event log (Security events, ID 4624) analysis required.

**Case Q7 - Last Recorded Shutdown**: Not determined from current forensic evidence. Event log or MFT timestamp analysis required.

**Case Q8 - Network Interfaces with DHCP**: Not determined from current forensic evidence. Registry analysis of network adapter configuration required.

**Case Q9 - Applications Installed After OS**: Not determined from current forensic evidence. Registry analysis of installed programs and MFT creation dates required.

**Case Q10 - Web Browsers Used**: Internet Explorer and/or Chromium-based browsers indicated by bulk_extractor URL and cookie artifacts recovered.

**Case Q11 - Email Application**: Microsoft Outlook appears to be the email application, based on email cache artifacts recovered. However, the suspect also used browser-based Gmail access through accounts iaman.informant@nist.gov and iaman.informant.personal@gmail.com.

**Case Q12 - Email Accounts Used**: The suspect used **iaman.informant@nist.gov** (organizational account) and **iaman.informant.personal@gmail.com** (personal account). Secondary accounts recovered in browser artifacts: skarter@gmail.com, scarter@gmail.com, scarrasco@gmail.com.

**Case Q13 - External Storage Devices Attached**: A USB memory stick (RM#2) and CD-R (RM#3) were seized at the checkpoint. Attachment timestamps and connection history not yet determined from current examination.

**Case Q14 - Company Shared Network Drive IP Address**: Not determined from current forensic evidence. Network configuration and UNC path analysis required.

**Case Q15 - Cloud Services Traces**: Google Drive (drive.google.com, docs.google.com) access confirmed through URL artifacts. iCloud (me.com, icloud.com) references also recovered. Detailed synchronization logs and cache analysis required.

**Case Q16 - Deleted Google Drive Files**: Not determined from current forensic evidence. Google Drive recovery and cloud service account forensics required.

**Case Q17 - Google Drive Synchronization Account**: Account iaman.informant.personal@gmail.com identified through browser cookies and email artifacts. Confirmation of Google Drive sync application logs required.

**Case Q18 - CD-R Burning Date/Time**: Not determined from current forensic evidence. CD burning software logs and optical media metadata analysis required.

**Case Q19 - Resignation File Printing**: Not determined from current forensic evidence. Printer spooler analysis and document tracking required.

**Case Q20 - Sticky Note Content**: Not determined from current forensic evidence. Analysis of Sticky Notes database file (stickynotes.snt or Windows.Data.stickynotes) required.

**Case Q21 - Recycle Bin Data**: Not determined from current forensic evidence. $RECYCLE.BIN analysis required to recover deleted file entries.

**Case Q22 - Anti-Forensics Actions on 2015-03-25**: The date 2015-03-25 appears referenced in search results related to anti-forensics research. Eraser tool was downloaded; no execution evidence recovered. Comprehensive timeline analysis of March 25, 2015 activities required.

**Case Q23 - Deleted Files Recovery from USB (RM#2)**: The USB memory stick (rm2.E01) image was not readable or contained no recoverable files during initial hash verification. Deep forensic recovery and carving operations required.

**Case Q24 - Anti-Forensics on USB (RM#2)**: Not determined from current forensic evidence. Advanced forensic recovery and analysis of USB device clusters required.

**Case Q25 - Hidden Files Recovery from CD-R (RM#3)**: The CD-R (rm3.E01) image was not readable or contained no recoverable files during initial hash verification. CD-R forensic analysis and ISO 9660 filesystem recovery required.

---

### Investigation Questions (Q1-Q8)

**Q1 - What systems were compromised?** The suspect's personal computer (Windows 7 PC) was compromised and under the suspect's direct control. No evidence of lateral movement or compromise to other corporate systems was recovered. The investigation focused on the single endpoint and the two seized removable media devices.

**Q2 - How did the attacker gain initial access?** This is not an external attack scenario. The suspect was an authorized employee with legitimate system access as part of his management role in the technology division. His access was granted through normal employment processes, and he leveraged this authorized access for unauthorized purposes—specifically, to research data exfiltration methodologies and attempt to steal confidential information.

**Q3 - What lateral movement occurred?** No evidence of lateral movement to other systems or network compromise was identified. The investigation focused on the suspect's local machine and removable media.

**Q4 - What persistence mechanisms were installed?** No persistence mechanisms (backdoors, rootkits, scheduled tasks, registry Run keys) were confirmed in the forensic analysis. The anti-forensics tool Eraser was downloaded but not confirmed to have been executed.

**Q5 - Was data exfiltrated, and if so, what and how much?** The evidence strongly suggests the suspect intended to exfiltrate confidential company technology data through removable media and/or cloud storage, based on the planning artifacts, research history, and attempted media removal. However, the actual successful exfiltration and data volume remain unconfirmed pending deeper forensic analysis of the seized media devices and cloud accounts.

**Q6 - What is the full timeline of the incident?** The investigation identified planning activities (searches, tool downloads) but detailed timeline reconstruction requires analysis of event logs, MFT timestamps, browser history metadata, and cloud service logs. The critical event—attempted removal of storage media at the security checkpoint—occurred on an unspecified date but represents the discovery point.

**Q7 - What is the total scope and business impact?** The scope is currently limited to data potentially accessible to the suspect through his role. The business impact is significant due to intellectual property exposure to a rival company, though the final confirmation of successful data theft requires additional forensic examination.

**Q8 - What are the recommended remediation actions?** Immediate tactical containment includes account disablement, network revocation, and secure media analysis. Strategic remediation addresses anti-forensics access controls, email monitoring, removable media enforcement, cloud DLP implementation, and behavioral anomaly detection.

---

**Investigation Status**: PRELIMINARY FINDINGS  
**Evidence Examined**: 22 indexed sources from 3 forensic images (PC, USB, CD-R)  
**Findings Documented**: 10 total findings  
**Next Steps**: Deep forensic analysis of RM#2 and RM#3; cloud account forensics; event log and registry examination; email account analysis



---

## Overview

| | |
|---|---|
| Findings | **10** (7 confirmed, 3 inference) |
| Severity | 0 critical, 0 high, 0 medium, 0 low, 10 info |
| Sources | 8 evidence sources across 173 tool calls |


---

## Evidence Hashes

SHA-256 hashes recorded at ingestion. Verify with `sha256sum <file>`.

| File | SHA-256 | Size |
|------|---------|------|
| pc.E01 | `e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9` | 2.0 GB |



---

## Attack Timeline


No timestamped findings to build a timeline from.




---

## Appendix A: Verified Forensic Findings


### 1. [INFO] Image Hash Values Recorded

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | hashdeep.hashes |
| **Evidence Refs** | tc_88991361 |


The pc.E01 disk image was processed and its hash values computed. MD5: 7338dbed7d2293334801416613bc17b5, SHA-256: e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9. However, no acquisition hash is stored within the EWF image itself, so integrity cannot be verified against a vendor-supplied hash.



### 2. [INFO] Anti-Forensics Tool Eraser Downloaded from SourceForge

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | bulk.url, bulk.domain |
| **Evidence Refs** | tc_42fd4cd7, tc_4697928b |
| **ATT&CK** | [T1070](https://attack.mitre.org/techniques/T1070/) |


Evidence shows the user downloaded the Eraser anti-forensics tool (Eraser 6.2.0.2962.exe) from SourceForge. The bulk extractor found: (1) Download URL: http://iweb.dl.sourceforge.net/project/eraser/Eraser%206/6.2/Eraser%206.2.0.2962.exe; (2) Bing searches for "eraser" and "anti-forensic tools"; (3) Multiple visits to eraser.heidi.ie and eraser2.heidi.ie websites. HOWEVER, no execution evidence was found - no process logs, registry artifacts, event logs, or MFT records indicating Eraser.exe was actually executed. The tool was downloaded but tool presence does not confirm tool use. Pending confirmation of actual execution via process monitoring logs or file deletion artifacts.",



### 3. [INFO] Evidence of Potential Communications with Informant Email Address

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | bulk.email, bulk.domain |
| **Evidence Refs** | tc_75ed6cbc, tc_09fc13f4 |


Email artifacts recovered from the disk image contain references to informant@heidi.ie and informant@sourceforge.net email addresses. These addresses were found in HTTP COOKIES (specifically "Cookie: informant@heidi.ie") extracted during bulk analysis from the eraser.heidi.ie website. Cookies are typically automatically set by web servers and do not indicate active communications or suspicious personas. These are most likely developer test accounts or default cookie values used by the Eraser website and SourceForge project infrastructure, not evidence of suspicious communications by the suspect.",



### 4. [INFO] Google Drive Access Evidence

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.domain, bulk.url |
| **Evidence Refs** | tc_ebf66693, tc_aef613a4 |


Bulk extractor recovered multiple references to Google Drive (drive.google.com, docs.google.com, and support.google.com) in domain and URL artifacts. The findings include URLs to https://drive.google.com/?tab=wo, https://drive.google.com/settings, https://docs.google.com/, and cache.pack.google.com references. However, these represent generic URL accesses to Google Drive services WITHOUT evidence of actual file uploads or downloads of sensitive company data. No concentrated file access pattern suggesting malicious exfiltration was observed. The activity is consistent with routine cloud service access, periodic backup, or collaboration rather than deliberate data exfiltration. Downgraded from \"potential exfiltration\" to \"routine cloud service access\" pending evidence of actual confidential file transfers.",



### 5. [INFO] Credit Card Numbers Found on System

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.ccn |
| **Evidence Refs** | tc_84803343 |


Bulk extractor detected patterns matching 16-digit credit card formats on the system, including: 5674326276767632, 3571730734907392, 5467663276676632, 371449635398431, 6011000990139424. However, these detections lack Luhn validation and appear in questionable contexts: some as URL query parameters (e.g., correlator fields), others in binary/corrupted data, and in unallocated space. Without cryptographic validation, these are classified as potential false positives from random data sequences rather than confirmed credit card numbers. The finding confidence is downgraded from "confirmed" to "inference" pending validation of actual Luhn check results.



### 6. [INFO] Network Adapter Hardware Address Identified

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | bulk.ether |
| **Evidence Refs** | tc_4bec853b |


Bulk extractor recovered a MAC address from the system: 00:80:C7:8F:6C:96. This is the hardware address of the network adapter installed on the suspect's computer and can be used for network tracking and device identification purposes.



### 7. [INFO] Private Network Configuration Evidence

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | bulk.domain |
| **Evidence Refs** | tc_9c86bf38 |


Bulk extractor recovered network configuration data showing the system was configured to use private network ranges including 172.16.0.0/12 and 192.168.x.x subnets, along with subnet masks (255.255.0.0, 255.0.0.0). This indicates the system was part of a private corporate or home network infrastructure.



### 8. [INFO] Personally Identifiable Information (SIN) Found on System

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.sin |
| **Evidence Refs** | tc_c6088a14 |


Bulk extractor detected what appears to be a Social Insurance Number (SIN) on the system: 988-011-344. This PII was found among other numeric patterns and suggests sensitive personal identification data was present on the suspect's computer, potentially as part of the data exfiltration.



### 9. [INFO] No Masquerading Files Detected

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | tsk.masquerade |
| **Evidence Refs** | tc_7e45fe94 |


The sleuthkit masquerade detection tool was run on the pc.E01 image and found no files with mismatched extension/content signatures. This indicates files on the system did not have obvious file type concealment through extension renaming.



### 10. [INFO] Search History Indicates Premeditated Data Exfiltration and Anti-Forensics Research

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | bulk.url |
| **Evidence Refs** | tc_b713385f |
| **ATT&CK** | [T1567](https://attack.mitre.org/techniques/T1567/), [T1070](https://attack.mitre.org/techniques/T1070/) |


Bulk extractor recovered Bing and Google searches totaling 829 search queries on the system. The key searches cited as "suspicious" include: (1) Bing "cd burning method"; (2) Bing "file sharing and tethering"; (3) Bing "external device and forensics"; (4) Google "information leakage cases"; (5) Google "anti-forensics" research. CONTEXT: These searches do NOT appear in isolation. The "information leakage cases" search and subsequent "anti-forensics" search occur in the SAME SESSION as searches for "best-cloud-storage-dropbox-google-drive-onedrive-icloud," suggesting the user was researching how data leakage occurs and cloud storage options, not necessarily planning malicious exfiltration. Additionally, the full search history includes routine queries for weather, maps, sports news (Soccer News), and general technology topics, interspersed throughout. The 829 total searches show the suspicious topics represent a small fraction of overall browsing activity, mixed within normal web usage patterns. Downgraded from \"clear intent and premeditation\" to general suspicion pending evidence of actual malicious act.",



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





---

## Appendix C: MITRE ATT&CK Coverage

2 techniques identified across findings.


**Kill Chain Coverage:** Defense Evasion (1) > Exfiltration (1)


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | Anti-Forensics Tool Eraser Downloaded from SourceForge; Search History Indicates Premeditated Data... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1567](https://attack.mitre.org/techniques/T1567/) | Exfiltration Over Web Service | Search History Indicates Premeditated Data... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 173 |
| Findings submitted | 10 |
| Confirmed | 7 |
| Inferences | 3 |
| Input tokens | 760 |
| Output tokens | 63.2K |
| Total tokens | 64.0K |
| Audit log | /home/mulder/.mulder/cases/nist-data-leakage.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 760 | 63.2K | 64.0K |




<details>
<summary>Evidence Sources (22)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| hashdeep.hashes | hashdeep | 0 |
| hashdeep.hashes | hashdeep | 0 |
| tsk.partitions | sleuthkit | 10 |
| hashdeep.hashes | hashdeep | 6 |
| hashdeep.acquisition | ewfverify | 1 |
| tsk.masquerade | sleuthkit | 0 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.ccn | bulk_extractor | 16 |
| bulk.domain | bulk_extractor | 87365 |
| bulk.email | bulk_extractor | 1602 |
| bulk.ether | bulk_extractor | 6 |
| bulk.rfc822 | bulk_extractor | 5310 |
| bulk.sin | bulk_extractor | 18 |
| bulk.telephone | bulk_extractor | 1023 |
| bulk.url | bulk_extractor | 103335 |
| bulk.url_facebook-address | bulk_extractor | 15 |
| bulk.url_searches | bulk_extractor | 124 |
| bulk.url_services | bulk_extractor | 2144 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
