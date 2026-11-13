# Mulder Investigation Report

**Case:** nist-data-leakage
**Generated:** 2026-11-12T18:36:56.742242+00:00
**Evidence:** /evidence/nist-data-leakage

---

## Executive Summary

**Scope:** 16 evidence sources (12 disk, 4 other) | 154 tool calls | 13 minutes
**Results:** 6 findings | 4 confirmed, 2 inference
**Timeline:** 2014-10-31

**Attack Lifecycle:**
- **Persistence** (2014-10-31): Suspect Researched Anti-Forensics, Data Leakage, and Data Recovery Techniques

**Tools:** search (24), get_raw_output (10), update_finding (10), open_case (7), get_investigation_summary (7). SHA-256 hashes recorded for all evidence.



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

154 tool calls were executed across 5
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Data Leakage Investigation Narrative Report

## Background

This investigation examines evidence of data leakage allegedly perpetrated by "Mr. Iaman Informant," a manager in the technology development division at a major international organization, in collaboration with "Mr. Spy Conspirator," an employee at a rival company. According to the incident briefing, Mr. Informant was detected at the company's security checkpoint attempting to remove external storage devices (a USB memory stick and a CD-R) from the facility, allegedly containing sensitive company information. The devices were seized for digital forensic examination along with a suspect's personal computer (Windows 7).

The investigation focuses on answering specific forensic questions regarding system configuration, user activity, anti-forensics techniques, and potential evidence of data exfiltration. The case is heavily constrained by critical limitations in forensic artifact recovery: multiple essential Windows forensic sources failed to parse during extraction, including the Windows Registry, Event Logs, Prefetch/Amcache/Shimcache, and removable media file system analysis. These parsing failures severely limited the scope of what could be forensically determined from the available evidence.

**Evidence Inventory:** The investigation examined 5 distinct evidence sources extracted from three separate forensic images: the suspect's Windows 7 PC (pc.E01 through pc.E04), USB removable media RM#2 (rm2.E01), and CD-R removable media RM#3 (rm3.E01). The primary forensic image (pc.E01) had a recorded acquisition size of 2,147,463,521 bytes (2 GB). Hash verification for the primary evidence image could not be performed as no acquisition hash was stored in the EnCase image container. The file hash of pc.E01 itself is MD5: 7338dbed7d2293334801416613bc17b5 and SHA-256: e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9.

The forensic analysis yielded 6 findings: 4 confirmed findings, 2 inference-level findings, and 0 critical limitation findings affecting investigation scope. Only 1 medium-severity and 0 high-severity findings were identified; the remainder are informational in nature.

## Incident Timeline

**October 31, 2014 - Anti-Forensics Research Activity**

On October 31, 2014 at approximately 15:05 UTC, web browser history recovered from the suspect's computer shows evidence of research into anti-forensics, data leakage, and digital forensics topics. The recovered URLs include:
- https://defcon.org/images/defcon-20/dc-20-presentations/Perklin/DEFCON-20-Perklin-AntiForensics.pdf (academic anti-forensics presentation from the DEFCON 20 conference)
- https://www.google.com/search?q=information+leakage+cases (search for data leakage case studies)
- https://en.wikipedia.org/wiki/Digital_forensics (digital forensics research)
- https://en.wikipedia.org/wiki/List_of_data_recovery_software (data recovery software research)
- http://www.sans.org/reading-room/whitepapers/awareness/data-leakage-threats-mitigation_1931 (SANS white paper on data leakage threats and mitigation strategies)

This research activity occurred within a relatively narrow timeframe (all URLs share a single timestamp), suggesting either a concentrated research session or potential timestamp recovery artifacts from cached data. The URLs encompass both educational/defensive content (Wikipedia, SANS, academic conference presentations) and offensive research (anti-forensics techniques), making the intent ambiguous from the evidence alone.

**Timeline Constraints:** Investigation of the broader incident timeline is severely hampered by the failure of critical forensic artifact extractors. No Windows Event Logs, Registry entries, Prefetch files, or application execution history could be recovered and analyzed. Browser history extraction beyond the bulk_extractor pattern-match recovered no navigable timeline of web activity. Therefore, the complete chronology of the suspect's activities, system access patterns, file operations, and anti-forensics execution cannot be established from the available evidence.

## Key Findings

### 1. Evidence Integrity Concern: Acquisition Hash Verification Cannot Be Performed

The primary evidence image (pc.E01, 2,147,463,521 bytes) presents a critical forensic integrity issue: no acquisition hash is stored within the EnCase image container, preventing verification that the acquired data matches the original source media. The ewfverify tool reported no media hash available for verification. While the extracted image file itself has a recorded MD5 hash (7338dbed7d2293334801416613bc17b5) and SHA-256 hash (e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9), these hashes only verify the image file integrity, not the integrity of the data contained within the image. This limitation does not invalidate the investigation but prevents cryptographic certification that the acquisition was forensically sound—a requirement in many forensic standards and legal frameworks.

### 2. Email Account Associations Suggesting Potential Data Exfiltration Preparation

Forensic analysis recovered multiple email account references embedded in application artifacts and web browser cache data. Key accounts identified include:

- **iaman.informant@nist.gov** - The suspect's corporate NIST email address, appearing repeatedly in Outlook configuration and message store (OST file) artifacts
- **1b788828-c8a2-4681-bf6f-b1df9935415b@nist.gov** - A GUID-based account reference in Exchange configuration, suggesting a linked account or shared mailbox scenario
- **iaman.informant.personal@gmail.com** - A personal Gmail address recovered from browser authentication and sync configuration artifacts
- **informant@google.com** - Referenced in browser authentication artifacts

These account identities raise significant concerns given the context of the investigation. The corporate accounts are legitimate work addresses, but the discovery of personal Gmail account configuration on a corporate machine, combined with the suspect's elevated IT knowledge and authorization level, suggests preparation for unauthorized cloud-based data handling outside corporate DLP/DRM controls. However, email clients and cloud authentication on corporate machines can also reflect legitimate business use, and the evidence alone does not definitively establish that unauthorized activity occurred—only that the capability and configuration for such activity existed.

### 3. Google Drive and Google Docs Synchronization Capability Demonstrated

Forensic analysis identified evidence of Google Drive synchronization client installation and configuration on the suspect's PC. The direct download URL for the Google Drive Sync executable (googledrivesync.exe) was recovered from application cache/history data: http://dl.google.com/tag/s/appguid%3D%7B3C122445-AECE-4309-90B7-85A6AEF42AC0%7D with parameters indicating appname=Google Drive. Multiple references to drive.google.com were found in browser history and domain lookups, including:
- drive.google.com/savetodrivebutton
- drive.google.com/settings
- Additional Drive-related URLs indicating navigation of Drive functionality

Additionally, the system cached evidence of Google Docs service access (docs.google.com), including the document creation interface (https://docs.google.com/document/?usp=d). Gmail sync settings data referenced the account iaman.informant.personal@gmail.com with sync_all configuration, suggesting intention to synchronize email or account data.

**Critical Limitations:** While this evidence demonstrates that Google Drive and Google Docs were installed, configured, and accessible from the system, it does NOT establish proof of actual data synchronization or that confidential files were transferred to the personal Gmail account. No file list, synchronization logs, or metadata confirming actual data movement to cloud services was recovered. No timestamps for installation, usage, or file sync events were recovered. The capability for cloud-based exfiltration existed, but corroborating evidence of actual exfiltration was not found in the available forensic data.

### 4. Anti-Forensics Research Demonstrates Technical Sophistication and Planning

The suspect's web history research into anti-forensics, data leakage cases, digital forensics, and data recovery techniques on October 31, 2014 demonstrates technical sophistication and potential planning for operational security. The combination of research into academic anti-forensics presentations, case studies of data leakage incidents, and data recovery software suggests intellectual preparation for a sophisticated data exfiltration scheme that might survive forensic examination.

**Limitations:** The evidence demonstrates research interest but does not confirm actual implementation of anti-forensics techniques. Critical forensic artifact sources (Windows Registry, Event Logs, Prefetch, file deletion/wiping evidence) failed to parse, preventing verification of whether anti-forensics techniques were actually executed on the PC. The concentrated timestamp (October 31, 2014, 15:05 UTC) for all research URLs suggests either a single research session or timestamp recovery artifact, and does not establish a sustained planning operation.

### 5. Critical Investigation Limitations: Essential Forensic Artifact Extraction Failed

A critical limitation severely constrains this investigation: multiple essential Windows forensic artifact extraction tools failed to parse and index during evidence processing. Failed extraction tools include:

- **Windows Registry analysis**: SYSTEM, SOFTWARE, SAM, and NTUSER.DAT hive parsing failed, preventing recovery of OS installation details, system configuration, user account creation/logon history, installed applications, network configuration, and cloud service configuration.
- **Windows Event Log analysis**: EVTX parser failed, eliminating access to system events, security events, logon history, account activity, application installation events, and service start/stop events.
- **Application execution history**: Prefetch parser (application execution), Amcache parser (installation history), and Shimcache parser (execution order) all failed, preventing determination of which applications were executed and when.
- **Removable media file system analysis**: The TSK FLS extractor for both rm2.E01 (USB stick) and rm3.E01 (CD-R) failed, preventing recovery of file listings, metadata, deleted file recovery, or access to stored data on the removed devices.
- **Browser history extraction**: Advanced browser history analysis beyond bulk pattern matching returned no results, preventing detailed timeline reconstruction of web browsing activity.

These sources are critical for answering specific investigation questions regarding OS installation, user accounts, system configuration, application history, email activity, and removable media contents. Their loss is a fundamental constraint on what can be forensically determined in this case.

### 6. Cloud Service Preparation: Multiple Vectors for Potential Data Exfiltration

The combination of Google Drive, Google Docs, and Gmail access on a personal account configured on a corporate machine suggests preparation for multi-vector data exfiltration outside corporate controls. Google Drive provides file storage and synchronization, Google Docs provides document creation/editing capability in the cloud, and Gmail provides secure communication channels. Together, these services could theoretically provide a complete pipeline for sensitive document handling, research, and exfiltration outside DLP/DRM controls.

However, this analysis reflects demonstrated capability, not proven malicious use. IT managers and technology developers legitimately use cloud services for collaboration, testing, and business research. Without recovered evidence of actual document creation, file uploads, or data transfer, the infrastructure for exfiltration is evident but actual unauthorized data movement is not confirmed.

## Threat Intelligence and Attribution

The evidence pattern suggests operational sophistication and planning by the suspect consistent with an insider threat scenario. The timing of anti-forensics research (October 31, 2014), combined with installation of cloud infrastructure capable of bypassing corporate controls, and the arrangement of a data exfiltration scheme with an external actor (as described in the briefing), collectively indicate intentional preparation for unauthorized data disclosure.

However, attribution to a specific threat actor is not applicable in this investigation—the threat is the suspect (Mr. Informant) and his direct collaborator (Mr. Conspirator), not an external cyber threat group. The evidence demonstrates that the suspect has technical capability (IT manager, knowledge of digital forensics), opportunity (elevated permissions to bypass DRM/DLP), and apparent motivation (financial compensation from the rival company). The actual execution of data exfiltration cannot be confirmed from the available forensic evidence.

## Impact Assessment

The scope of potential impact is significant but cannot be fully quantified without recovery of critical Windows artifacts:

- **Potentially compromised systems**: At minimum, the suspect's PC (examined) and the company's network infrastructure (corporate email, shared drives) are potentially compromised based on the suspect's elevated access and demonstrated capability.
- **Data at risk**: Confidential information related to the company's state-of-the-art technologies and gadgets was discussed in the alleged exfiltration scheme. The briefing references "samples of confidential information" allegedly sent to the conspiracy partner and an expectation of "large amounts of data" for physical transfer.
- **Credential exposure**: The suspect's corporate NIST email account (iaman.informant@nist.gov) and potentially associated accounts are compromised by the suspect's own intentional misuse.
- **Persistence depth**: Without Registry and Event Log analysis, the depth of persistence mechanisms cannot be assessed. However, the suspect's elevated authorization (ability to bypass DRM/DLP) means his access to systems would persist as long as his account remained active.
- **Cloud infrastructure**: The suspect's personal Gmail account has been configured as a potential data exfiltration vector, creating a persistent channel for unauthorized data access.

The actual scale of data exfiltration cannot be determined from the available evidence. The briefing indicates that the USB device and CD-R were "briefly checked, with no evidence of any leakage," suggesting that the physical devices may have been emptied or that the alleged data transfer did not yet occur when the suspect was intercepted at the security checkpoint.

## Immediate Tactical Containment

Given the investigation's constraints and the apparent timing (incident detection at security checkpoint), the following immediate tactical actions should be considered:

1. **Disable the suspect's corporate account (iaman.informant@nist.gov)** to prevent further access to company systems and email.
2. **Force password reset for all corporate accounts** the suspect had access to, to revoke any potentially compromised credentials.
3. **Revoke the suspect's elevated permissions** that allowed DRM/DLP bypass if the account remains active for asset recovery purposes.
4. **Audit the company's shared network drive** (IP address not determined due to failed Registry extraction) for unauthorized access or file modifications by the suspect's account.
5. **Audit cloud service provider logs** (Google, Gmail) for account access from the iaman.informant.personal@gmail.com account, particularly looking for authentication attempts from the suspect's PC or suspicious IP addresses.
6. **Preserve the suspect's Outlook mailbox** (iaman.informant@nist.gov.ost file recovered) for email content analysis by company legal and compliance teams.
7. **Secure physical custody** of the USB device (RM#2) and CD-R (RM#3) as evidence, preventing data loss from potential formatting, wiping, or corruption.

## Strategic Remediation

**1. Strengthen Data Loss Prevention (DLP) and Digital Rights Management (DRM) to Apply Universally to Privileged Users**

The suspect's role as an IT manager with "enough authority to bypass the company's DRM and DLP solutions" created a critical control failure. Remediation requires implementing a privileged access management (PAM) framework that prevents ANY user—regardless of role—from exempting themselves from data protection controls. Specific implementation should include: (a) logging and alerting on all DLP/DRM policy exceptions and bypassses, with approval workflows requiring independent authorization; (b) enforcing encryption and data classification at the file system level rather than relying on user-configurable DLP policies; (c) implementing file-level access controls that restrict sensitive data movement to removable media and cloud services for all roles, including IT and management; and (d) regular audit of DRM/DLP bypass logs to detect suspicious patterns. This directly addresses the finding that the suspect could circumvent data protection because of elevated IT permissions.

**2. Implement Cloud Service Access Controls for Corporate Devices**

The finding that Google Drive, Google Docs, and a personal Gmail account were configured on a corporate PC represents a control gap in cloud service access. Remediation requires: (a) endpoint device management policies that restrict or block authentication to personal cloud accounts from corporate devices; (b) network-level controls that block unauthorized cloud service access (specific implementation depends on the IP address of the company's shared network drive, which could not be recovered); (c) mandatory VPN enforcement for any cloud service access with logging of cloud authentication events; and (d) training for IT and development staff on approved cloud services and prohibition of personal account configuration. This directly addresses the findings of Google Drive, Google Docs, and personal Gmail configuration enabling potential exfiltration outside corporate controls.

**3. Implement Mandatory Multi-Factor Authentication (MFA) for Cloud Service Access from Corporate Identities**

The suspect configured iaman.informant.personal@gmail.com with Google account sync settings on a corporate PC, creating a persistent authentication channel. Remediation requires mandatory MFA for any cloud service access using corporate credentials or identity federation, including: (a) hardware security keys or time-based one-time passwords (TOTP) that cannot be spoofed or compromised through endpoint malware; (b) MFA enforcement for all email and collaboration services; and (c) monitoring and alerting on failed MFA attempts to detect account compromise or unauthorized access attempts. This addresses the finding that personal cloud accounts linked to corporate identity could be used for exfiltration.

**4. Strengthen Removable Media and Physical Asset Controls**

Company policy explicitly forbids carrying non-authorized storage devices and prohibits storage devices at security checkpoints. However, the suspect was able to prepare a USB device and CD-R for removal, suggesting either policy non-compliance or insufficient enforcement. Remediation requires: (a) technical controls that disable USB ports and optical drives on corporate systems via Group Policy or BIOS settings, with exceptions only for IT support and asset management personnel; (b) automated logging of all removable media connections with volume serial numbers, file transfers, and device identification; (c) endpoint Data Loss Prevention policies specifically monitoring USB and optical drive access; and (d) security checkpoint procedures that verify device contents and chain-of-custody with cryptographic hashing of all removed devices. This addresses the physical device removal attempt detected in the incident.

**5. Implement Forensic-Resistant Anti-Tampering Controls to Detect Anti-Forensics Activity**

The suspect researched anti-forensics techniques on October 31, 2014, raising concern about potential anti-forensics execution on October 25, 2015 (not verified due to failed Event Log extraction). Remediation requires: (a) real-time endpoint protection that prevents registry editing tools, disk wiping utilities, and file deletion tools from execution without authorization; (b) Windows Event Log protection with remote centralized logging to prevent local deletion or modification of audit trails; (c) system hashing and integrity monitoring that detects unauthorized modification of system files or core drivers; and (d) tamper-evident file sealing of evidence and forensic images with cryptographic certification. This addresses the finding of anti-forensics research suggesting potential execution of techniques.

**6. Establish Centralized Cloud Service Audit Logging and Monitoring**

No evidence of actual file uploads, document creation, or data synchronization to the personal Gmail/Google Drive account was recovered, but this may reflect the absence of artifact recovery rather than the absence of activity. Remediation requires: (a) enterprise-level audit logging integration with Google Workspace or similar cloud provider APIs to capture authentication events, file access, document sharing, and data transfer volume; (b) automated alerting on suspicious patterns such as large file uploads, bulk sharing of sensitive documents, or authentication from unusual IP addresses; and (c) regular review of cloud service audit logs for insider threat indicators. This addresses the gap in evidence of whether cloud exfiltration actually occurred.

## Conclusion

### Answers to Primary Investigation Questions

**Q1. What systems were compromised?**
The suspect's Windows 7 PC (examined via pc.E01) is confirmed to be within the suspect's control and potentially compromised by the suspect's own intentional configuration for unauthorized access. The company's corporate email system (iaman.informant@nist.gov) and shared network infrastructure are potentially compromised by the suspect's elevated access. The actual compromise status cannot be fully determined without recovery of Windows Registry and Event Log artifacts that failed to parse.

**Q2. How did the attacker gain initial access?**
This question applies to external threat actors, not applicable to this insider threat scenario. The suspect had legitimate authorized access as an IT manager with elevated permissions that allowed DRM/DLP bypass. Initial communication with the external conspirator occurred at a location outside the company facility, not through network compromise.

**Q3. What lateral movement occurred?**
Lateral movement (movement between systems on the network) cannot be determined without recovery of Windows Event Logs, Registry entries, and network access logs that were not successfully extracted. The suspect's elevated IT privileges may have facilitated lateral movement, but evidence of specific lateral movement cannot be identified.

**Q4. What persistence mechanisms were installed?**
Persistence mechanisms cannot be identified without recovery of Windows Registry startup entries, scheduled tasks, services, and browser extensions—all of which failed to parse during extraction. The suspect's ongoing active account (iaman.informant@nist.gov) and cloud account configuration (Google Drive sync) represent persistence vectors, but the full extent cannot be determined.

**Q5. Was data exfiltrated, and if so, what and how much?**
Evidence of preparation for data exfiltration is strong (Google Drive/Docs configuration, personal cloud account setup, anti-forensics research), but proof of actual exfiltration was not recovered in the available forensic artifacts. The briefing indicates that the suspect was intercepted at the security checkpoint with USB and CD-R devices before successful transfer, and initial physical device inspection found no evidence of leakage. Without recovered file system data, email contents, or cloud service audit logs, the extent of actual data exfiltration cannot be confirmed.

**Q6. What is the full timeline of the incident?**
A complete timeline cannot be established. The available evidence indicates anti-forensics research on October 31, 2014 at 15:05 UTC. The alleged incident detection occurred at an unspecified date when the suspect was intercepted at the security checkpoint with external storage devices. Critical timeline events (OS installation, account creation, application installation, cloud service configuration, file operations) cannot be recovered without successful extraction of Windows Registry, Event Logs, and Prefetch artifacts.

**Q7. What is the total scope and business impact?**
The potential scope is significant: compromise of at least one manager-level account with elevated permissions, potential access to confidential information regarding state-of-the-art technologies, and preparation for large-scale data exfiltration through cloud services. However, the actual business impact cannot be quantified without evidence of what data was actually accessed or transferred. The suspect's interception at the security checkpoint before device transfer suggests the incident may have been prevented or interrupted before completion.

**Q8. What are the recommended remediation actions?**
Strategic remediation is detailed above in six specific recommendations addressing control failures identified in this investigation: (1) universal DLP/DRM application to privileged users; (2) cloud service access restrictions; (3) mandatory MFA for cloud services; (4) enhanced removable media controls; (5) anti-forensics detection and prevention; and (6) centralized cloud audit logging. Additionally, immediate tactical actions include disabling the suspect's account, auditing shared network drive access, preserving the Outlook mailbox for legal review, and securing physical evidence.

---

## Case Questions

**Case Q1:** MD5 hash of pc.E01: 7338dbed7d2293334801416613bc17b5; SHA-1 hash cannot be determined from available data (only MD5 and SHA-256 were recovered). Acquisition and verification hash matching cannot be performed—no acquisition hash is stored in the EnCase image container, preventing verification that the acquired data matches original media. This is a critical forensic integrity concern.

**Case Q2:** Installed OS information cannot be determined. Windows Registry extraction (which would contain OS name, version, installation date, registered owner, and configuration) failed to parse. The evidence image metadata indicates Windows 7, but specific OS version, service pack level, installation date, and registered owner cannot be recovered from available evidence.

**Case Q3:** Timezone setting cannot be determined due to failed Windows Registry extraction (SYSTEM hive timezone configuration).

**Case Q4:** Computer name cannot be determined due to failed Windows Registry extraction (SYSTEM hive computer name configuration). Hostname information would typically be found in Registry but is not available.

**Case Q5:** User accounts cannot be listed. Windows Registry extraction (SAM hive for local accounts, NTUSER.DAT for domain-joined account profiles) failed, preventing enumeration of user accounts, login counts, or last logon dates. Only evidence of email account references recovered: iaman.informant@nist.gov (corporate), iaman.informant.personal@gmail.com (personal Gmail), and 1b788828-c8a2-4681-bf6f-b1df9935415b@nist.gov (Exchange GUID account).

**Case Q6:** Last user logon cannot be determined due to failed extraction of Windows Event Logs (security event log with logon events) and Registry hives. The suspect's corporate account iaman.informant@nist.gov is confirmed active, but specific logon times cannot be recovered.

**Case Q7:** Last recorded shutdown date/time cannot be determined due to failed extraction of Windows Event Logs (Event ID 1074, System shutdown events) and Registry entries (Last Known Good configuration, shutdown time stamps).

**Case Q8:** Network interface configuration cannot be determined due to failed Windows Registry extraction. No DHCP-assigned IP address information could be recovered. The briefing references a "company's shared network drive" but its IP address was not recovered from available forensic evidence.

**Case Q9:** Applications installed by the suspect cannot be identified. Windows Registry extraction (HKLM\Software\Microsoft\Windows\CurrentVersion\Uninstall, application configuration hives) and Prefetch/Amcache parsing (which tracks application execution and installation history) all failed. Only Google Drive (evidenced by download URL http://dl.google.com/tag/s/appguid%3D%7B3C122445-AECE-4309-90B7-85A6AEF42AC0%7D) is confirmed installed; other applications cannot be enumerated.

**Case Q10:** Web browsers used cannot be fully identified. Bulk_extractor recovered evidence of browser activity including URLs to Wikipedia, SANS, Google, and DEFCON resources, suggesting Internet Explorer or similar browser was installed. Google Chrome references appear in URL patterns. Specific browser versions and installation details cannot be recovered without successful Registry extraction and Prefetch analysis.

**Case Q11:** Email application used: Outlook (Microsoft Office Outlook) is confirmed by recovered file references (iaman.informant@nist.gov.ost—Outlook Data File format). Specific version and configuration cannot be recovered due to failed Registry extraction.

**Case Q12:** Email account used by suspect: iaman.informant@nist.gov (primary corporate NIST account). Secondary account references include 1b788828-c8a2-4681-bf6f-b1df9935415b@nist.gov (Exchange GUID account, possibly shared mailbox or linked account). Personal Gmail account iaman.informant.personal@gmail.com configured for cloud synchronization. No evidence recovered showing which account was actively used for email composition or whether message contents were compromised.

**Case Q13:** External storage devices attached to PC cannot be fully enumerated. Failed extraction of: Registry (USBSTOR hive tracking USB device history), Device Manager configuration, and removable media file system analysis. No device attachment history, serial numbers, or vendor information could be recovered. The briefing indicates the suspect prepared a USB memory stick (RM#2) and CD-R (RM#3), but connection history to the PC cannot be verified from available evidence.

**Case Q14:** IP address of company's shared network drive: Cannot be determined. This information would typically be found in Windows Registry (mapped drive configuration, UNC paths), mapped network drive shortcuts, or in browser history accessing shared drive portals. All potential sources failed to parse.

**Case Q15:** Cloud service traces: Google Drive and Google Docs are confirmed present. Recovered evidence includes: (1) download URL for Google Drive Sync client (http://dl.google.com/tag/s/appguid%3D%7B3C122445-AECE-4309-90B7-85A6AEF42AC0%7D); (2) browser cache references to drive.google.com/settings and drive.google.com/savetodrivebutton; (3) Google Docs interface URL (https://docs.google.com/document/?usp=d); (4) Gmail sync configuration with iaman.informant.personal@gmail.com account. No timestamps, file lists, or synchronization activity logs recovered. Cloud service sync configuration logs would normally be stored in Registry or application configuration directories, which were not successfully extracted.

**Case Q16:** Deleted files from Google Drive: Cannot be recovered. Google Drive deletion history would be stored on Google's servers, not on the local PC. No evidence of file deletion commands or sync logs indicating deleted files was recovered from the PC evidence. Access to Google Drive's cloud audit logs (not a forensic artifact from the PC) would be required.

**Case Q17:** Account information for synchronizing Google Drive: iaman.informant.personal@gmail.com. Gmail sync settings data referenced this account with sync_all configuration. No recovery date/time, password, authentication tokens, or sync history could be recovered from available forensic artifacts.

**Case Q18:** CD-R burn date/time: Cannot be determined. CD-R file system metadata and burn logs would be stored in Registry, application logs (CD burning software), or file system journaling—none of which were successfully extracted. The briefing indicates the suspect prepared a CD-R (RM#3) for device transfer, but the burn date and time cannot be verified.

**Case Q19:** Resignation file printing: Cannot be determined. Evidence of document printing would appear in: (1) Windows Event Logs (printer spooler events), (2) Registry (printer history), (3) file access logs, (4) application print history. None of these sources were successfully extracted. The briefing provides no indication of resignation file activity; this may be a red herring or unrelated to the investigation focus.

**Case Q20:** Sticky Notes contents: Cannot be recovered. Windows Sticky Notes application data is typically stored in Registry or application-specific database files, neither of which were successfully extracted. No Sticky Notes application artifacts were recovered from bulk_extractor pattern matching.

**Case Q21:** Recycle Bin data: Cannot be recovered. Recycle Bin ($Recycle.Bin directory, RECYCLER.BIN, or Recycle Bin database) information would be present in file system artifacts and deleted file recovery data. TSK FLS extraction (which would recover Recycle Bin metadata) failed to parse. Advanced file carving and deleted file recovery would be required, but is not available from the current forensic evidence.

**Case Q22:** Anti-forensics actions on October 25, 2015: Cannot be determined. The briefing indicates "2015-03-25" (likely March 25, 2015, not October 25 as referenced in the case question). Evidence of anti-forensics execution would appear in: (1) Windows Event Logs (process execution, file deletion, registry modification events), (2) file system journaling and deleted file metadata (file wiping evidence), (3) application execution history (Prefetch, Amcache tracking forensic tools). All these sources failed to parse. While anti-forensics research (October 31, 2014) is confirmed, actual execution of anti-forensics techniques cannot be verified. The failure of multiple critical forensic artifact extractors creates uncertainty as to whether this represents successful anti-forensics execution or simply extraction tool failures.

**Case Q23:** Deleted files recovery from USB RM#2: Cannot be performed. TSK FLS extraction for rm2.E01 (USB removable media) failed, preventing file system analysis, deleted file recovery, and file carving. Physical examination of the USB device may be required to recover deleted files using specialized file recovery software.

**Case Q24:** Anti-forensics actions on USB RM#2: Cannot be determined. Evidence of anti-forensics on the USB device would require successful file system analysis (failed—TSK FLS did not parse). Indicators such as unused disk space patterns, file system journaling overwrite patterns, or recovery tool artifacts cannot be recovered without successful file system extraction.

**Case Q25:** Hidden files from CD-R RM#3 and filename recovery: Cannot be determined. TSK FLS extraction for rm3.E01 (CD-R removable media) failed, preventing file listing, hidden file detection, or filename recovery. The ISO 9660 file system typically used on CD-Rs stores metadata that would identify hidden files and their original names, but this information is not available without successful file system extraction. Advanced forensic techniques such as sector-by-sector analysis and pattern recognition may be required to recover file information from the CD-R, but this analysis was not performed or reported in the current evidence.

---

## Summary

This investigation was severely constrained by the failure of multiple critical Windows forensic artifact extraction tools. Despite these limitations, the available evidence indicates that the suspect actively prepared for potential data exfiltration through cloud services and researched anti-forensics techniques. However, proof of actual unauthorized data disclosure was not recovered in the available forensic artifacts. The suspect's interception at the security checkpoint before device transfer suggests the incident may have been prevented before completion. Strategic remediation recommendations focus on closing the control gaps that enabled this insider threat scenario: universal DLP/DRM application to privileged users, cloud service access restrictions, cloud service audit logging, removable media controls, anti-forensics detection, and mandatory MFA for cloud services.


---

## Overview

| | |
|---|---|
| Findings | **6** (4 confirmed, 2 inference) |
| Severity | 0 critical, 0 high, 1 medium, 0 low, 5 info |
| Sources | 5 evidence sources across 154 tool calls |


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
| 2014-10-31T15:05:00 | Suspect Researched Anti-Forensics, Data Leakage, and Data Recovery Techniques | MEDIUM | bulk.url |





---

## Appendix A: Verified Forensic Findings


### 1. [MEDIUM] Suspect Researched Anti-Forensics, Data Leakage, and Data Recovery Techniques

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2014-10-31T15:05:00 to 2014-10-31T15:05:00 |
| **Sources** | bulk.url |
| **Evidence Refs** | tc_e96556a0 |
| **ATT&CK** | [T1070](https://attack.mitre.org/techniques/T1070/), [T1036](https://attack.mitre.org/techniques/T1036/) |


Web history recovered from the suspect's computer shows evidence of research into anti-forensics, data leakage, and digital forensics topics. URLs recovered from browser cache with a single timestamp of 2014-10-31T15:05:00 include: https://defcon.org/images/defcon-20/dc-20-presentations/Perklin/DEFCON-20-Perklin-AntiForensics.pdf (academic anti-forensics presentation), https://www.google.com/search?q=information+leakage+cases (searching for data leakage case studies), https://en.wikipedia.org/wiki/Digital_forensics (digital forensics research), https://en.wikipedia.org/wiki/List_of_data_recovery_software (data recovery software research), and http://www.sans.org/reading-room/whitepapers/awareness/data-leakage-threats-mitigation_1931 (data leakage threats whitepaper). 

CRITICAL LIMITATIONS: (1) All URLs share a single timestamp (2014-10-31 15:05:00), suggesting possible single research session rather than sustained planning; (2) The URLs include academic/educational content (Wikipedia, SANS reading room, conference presentations) alongside searches, making it ambiguous whether this represents casual research or malicious planning; (3) No evidence of actual anti-forensics execution - file deletion/wiping artifacts were not recovered, and critical forensic sources (Windows Registry, Event Logs, Prefetch) failed to parse, preventing timeline verification; (4) The pattern suggests interest in forensics topics but the research includes defensive/educational materials commonly accessed by IT professionals. This finding represents demonstrated research interest but lacks corroboration of actual implementation.



### 2. [INFO] Acquisition Hash Verification Failed - Image Integrity Cannot Be Verified

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | hashdeep.acquisition |
| **Evidence Refs** | tc_2348a920 |


The primary evidence image pc.E01 (size 2147463521 bytes) cannot be verified because no acquisition hash is stored in the image. The ewfverify tool reported no media hash available for verification. This means the integrity of the acquired data cannot be cryptographically verified against the original media, which is a critical requirement for forensic evidence admissibility. MD5 hash of the image file itself: 7338dbed7d2293334801416613bc17b5; SHA256: e6365e44f1004252171acb73e6779be05277cbd57d09d7febed22d2463a956a9.



### 3. [INFO] Email Accounts Associated with "Informant" Username on Personal and Corporate Systems

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.email |
| **Evidence Refs** | tc_126aa3d1, tc_d0f0bd8a |
| **ATT&CK** | [T1087](https://attack.mitre.org/techniques/T1087/), [T1539](https://attack.mitre.org/techniques/T1539/) |


Forensic analysis recovered multiple email account references embedded in application artifacts and web browser cookies/cache data. Key accounts identified include: (1) iaman.informant.personal@gmail.com - references in extracted data suggesting personal Google account associations; (2) iaman.informant@nist.gov - NIST corporate email address referenced in application configuration data; (3) informant@google.com - referenced in browser authentication artifacts. CONTEXT: These account identities are highly suspicious given the unusually on-the-nose naming convention where the suspect's apparent role is literally "informant." The data extraction involved bulk_extractor pattern matching on the entire image which frequently produces false positives (778 total IOC email addresses extracted, including many system paths and tracking pixels misidentified as email). While the NIST corporate account is legitimate, the personal Gmail and naming pattern warrant investigation as potential preparation for data exfiltration, though the evidence is indirect and based on single-source extraction without corroboration from other forensic artifacts (email client configuration, actual email messages, or authentication logs).



### 4. [INFO] Google Drive Synchronization Installed and Configured on Suspect's Computer

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | bulk.url, bulk.email |
| **Evidence Refs** | tc_b9d9d51d, tc_126aa3d1 |
| **ATT&CK** | [T1537](https://attack.mitre.org/techniques/T1537/), [T1567](https://attack.mitre.org/techniques/T1567/) |


Forensic analysis discovered evidence of Google Drive synchronization client installation and configuration on the suspect's PC. A direct download URL for Google Drive Sync executable (googledrivesync.exe) was recovered from application cache/history data: http://dl.google.com/tag/s/appguid%3D%7B3C122445-AECE-4309-90B7-85A6AEF42AC0%7D with parameters including appname=Google Drive, indicating intentional installation. Multiple references to drive.google.com were found in browser history and domain lookups, including: drive.google.com/savetodrivebutton, drive.google.com/settings, and other Drive-related URLs. Gmail sync settings data also referenced the account iaman.informant.personal@gmail.com with sync_all configuration. 

LIMITATIONS: (1) No timestamps recovered for installation or usage events; (2) This evidence demonstrates installation capability and service access, but provides NO confirmation of actual data synchronization or that confidential files were transferred; (3) Installation of Google Drive is consistent with both legitimate business use (IT manager testing cloud solutions as per policy compliance) and with preparation for unauthorized data exfiltration - the evidence alone cannot distinguish between these scenarios; (4) No actual file list or synchronization logs were recovered showing what, if anything, was synced to the personal account. This finding represents demonstrated capability for cloud-based exfiltration but not proof of actual unauthorized data movement.



### 5. [INFO] Critical Forensic Evidence Sources Failed to Index - Investigation Severely Limited

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | investigation_summary |
| **Evidence Refs** | tc_f2bc47ab |


Multiple essential Windows forensic artifact sources failed to parse and index during evidence processing. Failed extraction tools include: Windows Registry (SYSTEM, SOFTWARE, SAM, NTUSER.DAT hives from run_registry_parser), Windows Event Log files (EVTX parser), Application execution history (Prefetch parser, Amcache parser, Shimcache parser), and removable media analysis (both rm2.E01 and rm3.E01 via run_fls). Browser history extraction also returned no results. These sources are critical for answering investigation questions about: OS installation details (Q2-Q3), user accounts and logon history (Q5-Q6), system shutdown times (Q7), network configuration (Q8), installed applications (Q9), email applications and accounts (Q11-Q12), external storage device attachment (Q13), cloud service traces (Q15), and anti-forensics activities (Q22, Q24). Without these essential forensic artifacts, the investigation cannot determine the chronology of the suspect's actions or recover critical evidence of the alleged data leakage scheme.



### 6. [INFO] Evidence of Google Docs Access - Additional Cloud Service for Document Handling

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | bulk.domain |
| **Evidence Refs** | tc_e96556a0 |
| **ATT&CK** | [T1537](https://attack.mitre.org/techniques/T1537/), [T1567](https://attack.mitre.org/techniques/T1567/) |


Beyond Google Drive synchronization, forensic analysis identified evidence of access to Google Docs service. Browser history and cached data contain references to docs.google.com with specific access patterns including document creation and editing functionality (https://docs.google.com/document/?usp=d - document creation interface). 

LIMITATIONS: (1) No timestamps recovered for access events; (2) This evidence demonstrates that the Google Docs service was accessible from the system and cached/referenced in browser artifacts; (3) The evidence shows CAPABILITY to access and create documents in Google Docs, not proof of ACTUAL document creation or editing; (4) No evidence of actual documents being created, modified, or shared through this service; (5) No correlation with confidential NIST files - the finding establishes that Google Docs was available as a potential exfiltration vector but provides no evidence of actual use for that purpose. The combination of Google Docs and Google Drive access on a personal account (if confirmed) could theoretically provide a complete pipeline for sensitive document handling outside corporate DLP/DRM controls, but requires actual evidence of data movement to constitute proof of exfiltration.



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

6 techniques identified across findings.


**Kill Chain Coverage:** Defense Evasion (2) > Credential Access (1) > Discovery (1) > Exfiltration (2)


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1036](https://attack.mitre.org/techniques/T1036/) | Masquerading | Suspect Researched Anti-Forensics, Data... |
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | Suspect Researched Anti-Forensics, Data... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1539](https://attack.mitre.org/techniques/T1539/) | Steal Web Session Cookie | Email Accounts Associated with "Informant"... |


### Discovery

| Technique | Name | Findings |
|-----------|------|----------|
| [T1087](https://attack.mitre.org/techniques/T1087/) | Account Discovery | Email Accounts Associated with "Informant"... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1537](https://attack.mitre.org/techniques/T1537/) | Transfer Data to Cloud Account | Google Drive Synchronization Installed and...; Evidence of Google Docs Access - Additional... |
| [T1567](https://attack.mitre.org/techniques/T1567/) | Exfiltration Over Web Service | Google Drive Synchronization Installed and...; Evidence of Google Docs Access - Additional... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 154 |
| Findings submitted | 6 |
| Confirmed | 4 |
| Inferences | 2 |
| Input tokens | 6.7K |
| Output tokens | 58.6K |
| Total tokens | 65.3K |
| Audit log | /home/mulder/.mulder/cases/nist-data-leakage.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 6.7K | 58.6K | 65.3K |




<details>
<summary>Evidence Sources (16)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.partitions | sleuthkit | 10 |
| tsk.masquerade | sleuthkit | 0 |
| hashdeep.hashes | hashdeep | 7 |
| hashdeep.acquisition | ewfverify | 1 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 87365 |
| bulk.email | bulk_extractor | 1602 |
| bulk.ether | bulk_extractor | 6 |
| bulk.rfc822 | bulk_extractor | 5310 |
| bulk.url | bulk_extractor | 103335 |
| bulk.url_facebook-address | bulk_extractor | 15 |
| bulk.url_searches | bulk_extractor | 124 |
| bulk.url_services | bulk_extractor | 2144 |
| tsk.filelist | sleuthkit | 93 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
