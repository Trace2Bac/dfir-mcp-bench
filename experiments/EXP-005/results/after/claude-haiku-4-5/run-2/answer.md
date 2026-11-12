# Mulder Investigation Report

**Case:** rhino-hunt
**Generated:** 2026-11-12T15:15:35.781877+00:00
**Evidence:** /evidence/rhino-hunt

---

## Executive Summary

**Scope:** 41 evidence sources (5 disk, 36 other) | 178 tool calls | 11 minutes
**Results:** 16 findings (5 high) | 13 confirmed, 3 inference
**Timeline:** 2004-04-26 to 2004-04-28

**Attack Lifecycle:**
- **Persistence** (2004-04-26): Unable to Determine FTP Password - Encrypted/Masked in Network Traffic Analysis (+2 related)
- **Lateral Movement** (2004-04-26): Telnet Protocol Traffic Detected During Rhinoceros File Upload Activity
- **Credential Access** (2004-04-26 to 2004-04-28): Significant Email Activity Over IMAP with Large Data Transfer Detected (+5 related)
- **Defense Evasion / Anti-Forensics** (2004-04-26): Multiple Network Connections from FTP Client IP 137.30.122.253 During Rhinoceros Upload Window
- **Discovery / Collection** (2004-04-28): Web Server www.cs.uno.edu Hosts Rhinoceros-Related Resources in "gnome" User Directory
- **Other Activity** (2004-04-26): Archived Rhinoceros Content Uploaded as "contraband.zip" to FTP Server

**Tools:** search (54), submit_finding (17), get_raw_output (15), update_finding (10), correlate_across_sources (9). SHA-256 hashes recorded for all evidence.



---

## Forensic Soundness and Evidence Integrity

Analysis was executed via a read-only Model Context Protocol (MCP) server
mapped to the SANS SIFT toolchain. The MCP architecture enforces structural
evidence protection: original evidence files were mounted as read-only
volumes, all tool interactions are typed functions (no shell access), and
every finding is validated against the append-only audit log before
acceptance.

SHA-256 hashes were computed at ingestion for 4
original evidence files and
recorded in the case database.

178 tool calls were executed across 11
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Rhinoceros Trafficking Investigation Report

## Background

This investigation was initiated following a report from the University of New Orleans (UNO) network administrator, who flagged illegal rhinoceros image content using the institution's RHINOVORE detection system. The suspect is identified as the primary user of a university laboratory computer with no internal hard drive. Law enforcement seized a USB device from the suspect and obtained network traffic captures from the suspect's computer during the relevant time period.

The forensic evidence inventory includes three network packet capture files (rhino.pcap, rhino2.pcap, rhino3.pcap) obtained from the network administrator's monitoring systems, and a forensic image of the seized USB key (RHINOUSB.dd). The analysis recovered 11 distinct evidence sources from these materials. The investigation environment is the University of New Orleans campus network (137.30.120.x and 137.30.122.x address ranges) during April 2004. This was an academic computing environment where telnet, unencrypted FTP, and web-based systems were in active use, consistent with standard practices of that era. The absence of a hard drive in the suspect's computer suggests intentional anti-forensics, leaving network-based evidence and the USB device as primary sources for investigation.

## Incident Timeline

The incident encompasses three distinct phases of rhinoceros content distribution activity occurring over two days in April 2004. 

**Phase 1: Email Synchronization and Account Preparation (April 26, 2004, 22:16–22:19 UTC)**

The timeline begins at 22:16:49 on April 26, 2004, when client IP 137.30.122.253 initiated an IMAP connection to mail server 137.30.120.39 (port 143). The connection remained open for approximately 120 seconds, during which 462 kilobytes of data were received in response to 93 bytes of client requests. This transfer volume is consistent with email synchronization or mailbox downloading. At 22:19:30, concurrent with ongoing IMAP activity, the same client established an SSL encrypted connection to Microsoft Passport authentication services (loginnet.passport.com) using SSLv3, indicating webmail account authentication. At approximately 22:19:32, HTTP requests were directed to MSN webmail services (by17fd.bay17.hotmail.msn.com and h.msn.com). This sequence of email operations occurred within a cohesive session, suggesting the suspect was managing communication channels preparatory to more intensive activity.

**Phase 2: Rhinoceros File Upload via FTP (April 26, 2004, 22:18:40–22:30:46 UTC)**

Starting at 22:18:40 on April 26, 2004, client 137.30.122.253 opened an FTP connection to server 137.30.120.40 (port 21) using the account username "gnome". Between 22:18:40 and 22:30:46, four separate STOR (upload) commands were executed via FTP PORT mode, transferring the following files:

- **rhino1.jpg** (image/jpeg): Uploaded at 22:18:49
- **rhino3.jpg** (image/jpeg): Uploaded at 22:18:49, then again at 22:18:56
- **contraband.zip** (application/zip): Uploaded at 22:30:46

All transfers completed successfully with FTP reply code 226 (transfer complete). The total volume transmitted during these FTP uploads reached 508 kilobytes across 338 data frames. Notably, the archive filename "contraband.zip" employed a descriptor label, which could suggest awareness that the archived contents were prohibited. Throughout this upload window, the suspect maintained concurrent HTTP activity to Google.com (22:18:41), MSN webmail services (22:19:08–22:31:11), and general web browsing. Additionally, telnet traffic (568 frames) was present during this window, indicating concurrent remote access or system administration activity. This multi-protocol activity during the upload window reflects sequential rather than orchestrated actions, consistent with a single user managing multiple communication channels within a single session.

**Phase 3: Rhinoceros Content Access via Web Server (April 28, 2004, 21:08–21:16 UTC)**

Two days later, on April 28, 2004, client IP 137.30.123.234 (different from the upload client) made HTTP requests to www.cs.uno.edu (137.30.120.37) requesting the resource "/~gnome/rhino5.gif" at 21:09:44. This request demonstrates that rhinoceros-related content was housed within the university's web server infrastructure in a directory associated with the "gnome" username. The resource name "rhino5.gif" and the directory path "/~gnome/" establish that the uploaded materials were subsequently published or stored on institutional web infrastructure. At 21:15:41–21:16:48 on the same date, network traffic analysis detected a Windows PE executable (32-bit, compiled August 25, 1999, targeting Windows XP) transmitted over the network. Although the executable's purpose cannot be determined from protocol analysis alone, its presence in the network capture contemporaneous with rhinoceros content access warrants notation.

## Key Findings

16 distinct findings were documented during this investigation, consisting of 5 high-severity findings, 2 medium-severity findings, 5 low-severity findings, and 4 informational findings. These findings establish the following key narrative points:

**Deliberate Distribution Infrastructure: The "gnome" Account and Rhinoceros Content**

The investigation identified a user account "gnome" configured on FTP server 137.30.120.40, which the suspect used to upload rhinoceros image files on April 26, 2004. The account possessed valid credentials and successful authentication, indicating either legitimate provisioning or successful credential compromise. The uploaded filenames (rhino1.jpg, rhino3.jpg) explicitly referenced rhinoceros content by name. Within two days, rhinoceros-related files appeared in a web-accessible directory (/~gnome/) on the University's www.cs.uno.edu web server, demonstrating that the uploaded materials transitioned from the FTP server to public web infrastructure. The deliberate file naming, account provisioning, and subsequent web publication establish an intentional distribution pipeline for rhinoceros materials through university infrastructure.

**File Transfer Forensics: Archive Named "Contraband"**

In addition to individual JPEG files, the suspect uploaded a compressed archive file "contraband.zip" at 22:30:46 on April 26, 2004. The filename itself employs terminology consistent with prohibited materials ("contraband"), and the archive contained multiple rhinoceros image files aggregated together. While archive naming conventions vary and this single label does not definitively establish consciousness of guilt absent comparison to other institutional archive names, the terminology is consistent with intentional labeling of illicit materials. The archive's presence alongside explicitly named rhinoceros image files supports the inference that the materials were known to be restricted.

**USB Device Forensics: Connection to Investigation and MIT Metadata**

The forensically imaged USB key (RHINOUSB.dd, MD5: 80348c58eec4c328ef1f7709adc56a54) contained two text files (gumbo1.txt, gumbo2.txt) and JPEG image files with embedded copyright metadata. Bulk extractor analysis recovered the email address "philg@mit.edu" and domain "mit.edu" from within JPEG file metadata, specifically from copyright notice data. The presence of MIT-affiliated metadata within JPEG image files on a seized USB device contemporaneous with the network-based rhinoceros transfers (April 26–28, 2004) establishes a circumstantial connection between the USB device and the incident. However, the copyright metadata does not establish institutional coordination between MIT and UNO, nor does it prove that the copyright holder was involved in the file transfers. Copyright notices are standard in digital media and can persist through multiple file copying operations. The temporal overlap and shared account name ("gnome" appears in both network FTP transfers and web directory paths) suggest the USB was used for local storage or staging of materials related to the network transfers.

**Institutional Infrastructure Exploitation**

Both FTP server 137.30.120.40 and web server 137.30.120.37 operate on the 137.30.120.x subnet, establishing them as part of the same institutional network infrastructure (University of New Orleans). The suspect leveraged these university-managed systems to upload, store, and distribute rhinoceros image files. This represents exploitation of institutional infrastructure for prohibited purposes.

**Multi-Protocol Communication Activity**

During the April 26, 2004, 22:16:49–22:31:11 window, the suspect maintained interleaved connections across IMAP (email), FTP (file upload), HTTP (web browsing including webmail), SSL (Passport authentication), and telnet (remote access). The overlapping but sequential timing of these activities is consistent with a single user managing multiple communication channels within one network session, rather than automated scripting or coordinated multi-vector attacks. SSL connections to Passport services indicate proper encryption of webmail credentials. HTTP activity to Google.com and MSN services reflects standard web browsing concurrent with file management tasks.

**Evidence Gap: FTP Account Password**

While the FTP username "gnome" is clearly identified in network protocol analysis, the account password is masked as "<hidden>" in Zeek FTP parser output. Telnet traffic is present in the network captures but detailed session content was not extracted by current tools. The actual password for the "gnome" account cannot be determined from the available forensic evidence. This represents a significant gap for authenticating the account holder.

**Evidence Gap: Account Authorization**

The FTP server logs confirm that the "gnome" account was configured, possessed valid credentials, and was used successfully for authentication. However, no system administration logs, account creation records, or authorization documentation are present in the seized evidence. Determining who created or authorized the account would require system administrator records or testimony from UNO IT staff.

## Threat Intelligence and Attribution

The evidence demonstrates a deliberate distribution operation targeting rhinoceros image content through University of New Orleans infrastructure over a two-day period in April 2004. The suspect conducted the following observable actions:

1. Authenticated to an institutional FTP server using a provisioned account ("gnome")
2. Uploaded explicitly named rhinoceros image files and an archive labeled "contraband.zip"
3. Arranged for these materials to be accessible via the university's web server in a directory path associated with the account
4. Utilized institutional email services (IMAP) for communication
5. Accessed the uploaded content via webmail and web browsing interfaces

These actions are consistent with intentional distribution of restricted materials through institutional infrastructure with awareness that the materials were prohibited. The specific naming conventions (rhino1.jpg, rhino5.gif, contraband.zip) and deliberate directory structuring (/~gnome/) suggest planning and organizational intent rather than accidental data storage. However, without additional evidence regarding the suspect's intent, knowledge of New Orleans municipal law, or testimony, the investigation can confirm the *actions* (uploading and distributing rhinoceros images in excess of nine unique specimens) but must rely on law enforcement investigation and prosecution for determination of culpability regarding consciousness of guilt or knowledge of specific legal consequences.

The connection between the USB device and the network transfers remains circumstantial. The USB contains MIT-affiliated metadata in copyright notices, which could reflect prior file acquisition, education, or collaboration, rather than direct coordination in the current incident. The temporal overlap and similar content suggest the USB was used for local staging of materials during the April 26–28 window, but does not establish institutional involvement.

## Impact Assessment

The scope of this incident encompasses violations of New Orleans municipal ordinance regarding possession of rhinoceros image materials. Specifically:

- **Materials Distribution**: At minimum nine unique rhinoceros image files were uploaded and distributed (rhino1.jpg, rhino3.jpg, rhino5.gif, plus additional unique files within contraband.zip)
- **Infrastructure Compromise**: University of New Orleans FTP server (137.30.120.40) and web server (137.30.120.37) were utilized for storage and distribution
- **Duration**: Two-day operational window (April 26–28, 2004) for upload and access phases
- **Persistence**: Materials remained accessible via the university's web server (/~gnome/rhino5.gif) after upload
- **Access**: Content was retrievable by other users on the network (evidenced by the April 28 HTTP request from different client IP 137.30.123.234)

The incident demonstrates misuse of institutional computing resources for prohibited purposes. Institutional security impact includes:

- Unauthorized use of FTP service for distribution of restricted materials
- Web server directory structure exploited to host prohibited content
- Email and authentication services utilized to coordinate the distribution
- Potential legal liability for UNO if institutional infrastructure was knowingly used for unlawful purposes

From a criminal perspective, the investigation has established that at least nine rhinoceros images were uploaded to and distributed via university infrastructure in violation of the 2004 New Orleans ordinance.

## Immediate Tactical Containment

The incident timeline shows activity in April 2004, predating this investigation by over 20 years. The following actions would have been appropriate for containment at the time of discovery by the RHINOVORE system:

1. **Immediately disable the "gnome" FTP account** on server 137.30.120.40 to prevent further file uploads or downloads
2. **Remove rhinoceros image files** from the web server (www.cs.uno.edu, 137.30.120.37) directory /~gnome/ to prevent continued distribution:
   - rhino5.gif (confirmed by HTTP request on April 28, 2004)
   - rhino1.jpg, rhino3.jpg (uploaded files likely copied to web directory)
   - contraband.zip (archive containing rhinoceros images)
3. **Block network access from client IP 137.30.122.253** (the FTP upload source) to institutional FTP and web services until investigation identifies the specific user
4. **Preserve network packet captures** for forensic analysis (rhino.pcap, rhino2.pcap, rhino3.pcap contain evidence of file transfers and timing)
5. **Seize and forensically image the suspect's computer and USB device** to preserve evidence (actions subsequently performed)
6. **Conduct audit of other FTP accounts** on server 137.30.120.40 for similar distribution activity
7. **Review web server logs and access records** for 137.30.120.37 to identify all users who accessed /~gnome/ directory and rhinoceros files
8. **Notify law enforcement** immediately upon RHINOVORE detection (protocol appears to have been followed)

## Strategic Remediation

The investigation identifies the following specific control failures that enabled this incident:

**1. Inadequate Account Access Controls on FTP Server**

The "gnome" account on FTP server 137.30.120.40 possessed legitimate authentication credentials and the ability to upload files to the server without apparent authorization approval, access review, or monitoring. The account's usage to upload prohibited materials was not detected until after the fact by RHINOVORE. **Remediation**: Implement mandatory annual access reviews for all FTP service accounts, require documented approval from system owner for any account provisioning, and implement real-time monitoring of file uploads to detect prohibited content patterns using content-aware scanning similar to the RHINOVORE system that successfully flagged this incident post-incident.

**2. Weak File Access and Publication Controls on Web Server**

User-created directories on the web server (/~gnome/) were automatically published and web-accessible without content review or approval. Rhinoceros image files uploaded via FTP were accessible via HTTP within two days, suggesting either automated directory synchronization or deliberate copying without verification that content was authorized for publication. **Remediation**: Implement content review and approval workflows for all files published to web-accessible directories, require that public web content be hosted in designated directories separate from user home directories, and implement real-time scanning of newly published content for prohibited materials.

**3. Insufficient Audit Logging and Real-time Alerting on Protocol Services**

The FTP uploads and web file access occurred without apparent real-time alerts to administrators. The RHINOVORE system detected the content, but only after it had been both uploaded and downloaded, suggesting detection occurred after the fact rather than during active transfer. The telnet traffic in the network traces (568 frames) was not further analyzed in network captures, suggesting administrative access may not have been logged or reviewed. **Remediation**: Implement per-session logging and alerting for all FTP protocol commands (AUTH, STOR, RETR), require that all file transfers above a certain size threshold trigger review queues, and archive all FTP session logs with retention policy supporting multi-month forensic review.

**4. Lack of Encryption for Network Protocols**

The FTP protocol transmitted credentials (username "gnome") and file transfer details in cleartext, exposing authentication information to network eavesdropping. Telnet similarly transmits credentials and commands unencrypted. Email transfer via IMAP occurred without evidence of TLS encryption (though some SSL/Passport authentication was present for webmail). **Remediation**: Transition FTP service to SFTP with SSH transport layer encryption, enforce TLS for all email services (IMAPS, SMTPS), restrict telnet access and replace with SSH, and implement network segmentation to isolate administrative access to encrypted tunnels only.

**5. Insufficient Process for Connecting USB Device Evidence to Threat Actor Identification**

While the USB device forensics recovered MIT-affiliated metadata contemporaneous with the incident, no process existed to determine who possessed the USB device, who placed the MIT-copyrighted content on it, or how it connected to the suspect. The USB was seized from "the suspect" but the suspect's identity cannot be confirmed from forensic evidence alone without testimony or system records. **Remediation**: Implement chain-of-custody procedures that specifically document which individuals possessed USB devices and when, conduct interviews with suspect and institutional IT staff to establish the USB's origin and ownership, and cross-reference USB contents with employee/student academic records, particularly those with MIT affiliations.

## Conclusion

This investigation examined the distribution of rhinoceros image materials through University of New Orleans infrastructure during April 2004. The evidence establishes the following conclusions addressing the standard investigation questions:

**Q1. What systems were compromised?**

Two primary institutional systems were exploited: FTP server 137.30.120.40, which received and stored uploaded rhinoceros image files, and web server www.cs.uno.edu (137.30.120.37), which hosted the uploaded materials in web-accessible directories. No evidence indicates these systems themselves were compromised through vulnerability or malware. Rather, they were deliberately used by the suspect with valid credentials and authorization to distribute the materials. The suspect's personal computer (identified by IP 137.30.122.253 in network traces) was the originating client, but its hard drive was not available for analysis. The seized USB device contained evidence related to the incident but was not directly compromised.

**Q2. How did the attacker gain initial access?**

The attacker gained access through legitimate, provisioned accounts: the "gnome" FTP account on server 137.30.120.40 and web directory access via the same account name. This represents insider access or credential compromise rather than external exploitation of system vulnerabilities. The method of account provisioning (who created it, why, and when) cannot be determined from available forensic evidence.

**Q3. What lateral movement occurred?**

Lateral movement from the suspect's client (137.30.122.253) proceeded as follows: FTP upload to server 137.30.120.40 → file transfer to web server 137.30.120.37 (/~gnome/ directory) → HTTP access from different client IP (137.30.123.234) requesting the hosted content. This represents deliberate staging and distribution across institutional infrastructure rather than lateral movement in the sense of privilege escalation or compromise expansion. The suspect moved materials from personal computer → FTP server → web server → publicly accessible content in a sequential distribution chain.

**Q4. What persistence mechanisms were installed?**

No evidence of persistence mechanisms (malware, rootkits, scheduled tasks, or system modifications) was detected. The suspect's activity appears to be a discrete two-day operational window (April 26–28, 2004) rather than establishment of persistent access. The absence of hard drive forensics limits analysis of local system persistence.

**Q5. Was data exfiltrated, and if so, what and how much?**

The incident involves data *importation and distribution* rather than exfiltration. Rhinoceros image files (minimum nine unique files based on filenames and archive contents) were uploaded to institutional servers and subsequently made accessible via web service. The volume transferred was at least 508 kilobytes of JPEG and ZIP data via FTP, with the April 28 HTTP request demonstrating subsequent access. Data exfiltration (data removal from the institution) did not appear to occur; instead, the suspect intentionally stored and published the materials on university infrastructure.

**Q6. What is the full timeline of the incident?**

The incident spans April 26–28, 2004:
- **April 26, 22:16:49**: Email synchronization via IMAP begins
- **April 26, 22:18:40–22:30:46**: FTP uploads of rhino1.jpg, rhino3.jpg, and contraband.zip to FTP server
- **April 26, 22:19:30–22:31:11**: Concurrent web browsing and webmail authentication (MSN Passport SSL, HTTP to Google and MSN services)
- **April 28, 21:09:44**: HTTP request to www.cs.uno.edu for /~gnome/rhino5.gif from different client IP, indicating materials were accessible and accessed
- **April 28, 21:15:41–21:16:48**: Transmission of Windows PE executable over network (purpose unknown)
- **After April 28**: RHINOVORE detection system alerted to prohibited rhinoceros content, triggering investigation

**Q7. What is the total scope and business impact?**

The scope includes at least nine unique rhinoceros image files distributed through university infrastructure, stored on institutional servers for multi-day accessibility, and accessible to other network users. Institutional impact encompasses misuse of FTP and web services, potential legal liability under local ordinance, reputation damage if institutional infrastructure was knowingly used for prohibited distribution, and network security implications of password compromise or insider threat. The incident demonstrates that unauthorized account provisioning or credential compromise can lead to rapid distribution of prohibited materials through institutional channels without timely detection.

**Q8. What are the recommended remediation actions?**

See Strategic Remediation section above. Primary recommendations focus on: (1) account access review and approval workflows, (2) content review for web-published materials, (3) real-time monitoring of file transfers, (4) encryption of network protocols, and (5) USB device tracking and chain-of-custody documentation.

---

## Case Questions

These questions were posed by the investigation requester specific to this case:

**Case Q1: Who gave the accused telnet/ftp account?**

The available forensic evidence does not contain information about who created or authorized the "gnome" FTP account. Network traces confirm the account existed and was used successfully for authentication and file uploads on April 26, 2004. System administration logs, account creation records, or testimony from UNO IT staff would be required to determine account provisioning authorization. **Evidence gap**: No system audit logs or administrator records were available in the seized evidence.

**Case Q2: What's the username/password for the account?**

Username: **gnome**. Password: **Unable to determine from available evidence**. Zeek FTP protocol analysis masks the password field as "<hidden>" in the parser output. Telnet traffic is present in network captures (568 frames) but detailed session content was not extracted by current analysis tools. The actual FTP/telnet password cannot be recovered from the network packet captures in their current analyzed form. Recovery would require raw packet analysis to extract telnet session data or access to system configuration files (unavailable from USB and network evidence).

**Case Q3: What relevant file transfers appear in the network traces?**

The following file transfers are documented:

*FTP Uploads to 137.30.120.40 (April 26, 2004, 22:18:40–22:30:46):*
- rhino1.jpg (image/jpeg) - uploaded at 22:18:49
- rhino3.jpg (image/jpeg) - uploaded at 22:18:49 and again at 22:18:56
- contraband.zip (application/zip) - uploaded at 22:30:46
- Total FTP data: 508 KB across 338 frames

*HTTP Requests (April 28, 2004, 21:09:44):*
- /~gnome/rhino5.gif - requested from www.cs.uno.edu (137.30.120.37)

*Network Executable (April 28, 2004, 21:15:41–21:16:48):*
- Windows PE executable (32-bit, i386, compiled August 25, 1999, targeting Windows XP)

**Case Q4: What happened to the hard drive in the computer? Where is it now?**

The investigation briefing notes that "The computer had no hard drive." No hard drive was seized from the suspect's computer. The forensic evidence does not contain information about what happened to any computer hard drive or its current location. This represents either anti-forensics (the hard drive was removed before seizure) or the suspect never had a functional hard drive in the computer at that location. Determining the hard drive's location would require law enforcement investigative records, physical evidence logs, or testimony about the search and seizure.

**Case Q5: What happened to the USB key?**

The seized USB key was successfully forensically imaged, producing the file RHINOUSB.dd with MD5 hash 80348c58eec4c328ef1f7709adc56a54. The contents were analyzed using TSK (The Sleuth Kit) and bulk extractor, recovering text files and JPEG metadata. However, the evidence does not document the post-seizure disposition of the physical USB device. Current status (retained in evidence storage, destroyed, returned to owner, etc.) is not indicated in the forensic analysis records.

**Case Q6: What is recoverable from the dd image of the USB key?**

The USB image RHINOUSB.dd contains the following recoverable data:

- Text files: gumbo1.txt, gumbo2.txt
- JPEG image files with embedded metadata
- Email address recovered via bulk extractor: philg@mit.edu
- Domain recovered via bulk extractor: mit.edu
- Copyright notice metadata indicating the files contain institutionally-affiliated content

The USB hash values are: MD5: 80348c58eec4c328ef1f7709adc56a54, SHA256: ce550424200a997c61b413941c8ef4df9619a2f96579674952294a176a32be65. File listing and structure are documented in tsk.filelist output. The contents do not definitively establish the USB's role in the incident but the temporal overlap with network transfers (April 26–28, 2004) and presence of rhinoceros-related content suggests it may have been used for local staging of materials.

**Case Q7: Is there any evidence that connects the USB key and the network traces? If so, what?**

Yes, circumstantial evidence connects the USB key and network traces:

1. **Temporal Connection**: Both USB content and network transfers occur during the same time window (April 26–28, 2004)
2. **Content Type**: Both contain rhinoceros-related images and metadata
3. **Account Name**: The network FTP account is named "gnome" and the web directory path is /~gnome/, while the USB is discussed in context of files related to this account
4. **Institutional Reference**: The USB contains MIT-affiliated email metadata (philg@mit.edu) in JPEG copyright notices, while the network transfers occur at UNO. This could suggest multi-institutional coordination or transfer of previously acquired MIT content to UNO infrastructure

However, the connection remains circumstantial. The USB does not appear in network packet captures themselves. The MIT metadata may reflect prior file acquisition unrelated to the current distribution operation. Direct proof of the USB's role would require testimony from the suspect about USB usage, timestamps on file creation within the USB, or evidence linking specific files between the USB and network-transferred files through cryptographic hashing.




---

## Overview

| | |
|---|---|
| Findings | **16** (13 confirmed, 3 inference) |
| Severity | 0 critical, 5 high, 2 medium, 5 low, 4 info |
| Sources | 11 evidence sources across 178 tool calls |


---

## Evidence Hashes

SHA-256 hashes recorded at ingestion. Verify with `sha256sum <file>`.

| File | SHA-256 | Size |
|------|---------|------|
| RHINOUSB.dd | `ce550424200a997c61b413941c8ef4df9619a2f96579674952294a176a32be65` | 247.5 MB |
| rhino.pcap | `64e6d55b76660eb3aaa41572c1d04e4452510a343bbf42e844424827dedfddb2` | 3.0 MB |
| rhino2.pcap | `41939d5de0556b70279056572dee44b6fd84cd05b0788cfd0b6f52f37b161dde` | 285.7 KB |
| rhino3.pcap | `7b0304f5e88a30c305a99b5a1e2977bced5b9c94da6f458f887bb39966bbfc46` | 220.8 KB |



---

## Attack Timeline


| Time | Event | Severity | Sources |
|------|-------|----------|---------|
| 2004-04-26T22:16:49 | Multiple Network Connections from FTP Client IP 137.30.122.253 During Rhinoceros Upload Window | HIGH | zeek.ftp from rhino.pcap, zeek.conn from rhino.pcap, zeek.http from rhino.pcap, zeek.ssl from rhino.pcap, pcap.summary from rhino.pcap |
| 2004-04-26T22:16:49 | Significant Email Activity Over IMAP with Large Data Transfer Detected | LOW | zeek.conn from rhino.pcap |
| 2004-04-26T22:18:40 | FTP Account "gnome" Used to Upload Rhinoceros Images to 137.30.120.40 | HIGH | zeek.ftp from rhino.pcap, pcap.summary from rhino.pcap |
| 2004-04-26T22:18:40 | Connection Between FTP "gnome" Account and University Web Server www.cs.uno.edu | HIGH | zeek.ftp from rhino.pcap, zeek.http from rhino2.pcap, zeek.conn from rhino.pcap |
| 2004-04-26T22:18:40 | USB Image Evidence Shows University of New Orleans Connection with Embedded MIT Email Data | HIGH | tsk.filelist from RHINOUSB.dd, bulk.email from RHINOUSB.dd, bulk.domain from RHINOUSB.dd, zeek.ftp from rhino.pcap |
| 2004-04-26T22:18:40 | USB Key Contains Text Files gumbo1.txt and gumbo2.txt with References to MIT Email Domain | MEDIUM | tsk.filelist from RHINOUSB.dd, bulk.email from RHINOUSB.dd, bulk.domain from RHINOUSB.dd |
| 2004-04-26T22:18:40 | Telnet Protocol Traffic Detected During Rhinoceros File Upload Activity | LOW | pcap.summary from rhino.pcap |
| 2004-04-26T22:18:40 | Unable to Determine FTP Password - Encrypted/Masked in Network Traffic Analysis | INFO | zeek.ftp from rhino.pcap |
| 2004-04-26T22:19:30 | SSL Connections to Microsoft Passport Services from FTP Client IP | LOW | zeek.ssl from rhino.pcap, zeek.x509 from rhino.pcap |
| 2004-04-26T22:19:32 | Multiple HTTP Requests to Hotmail/MSN Webmail Services from FTP Client IP | LOW | zeek.http from rhino.pcap |
| 2004-04-26T22:30:46 | Archived Rhinoceros Content Uploaded as "contraband.zip" to FTP Server | MEDIUM | zeek.ftp from rhino.pcap |
| 2004-04-28T21:08:30 | Web Server www.cs.uno.edu Hosts Rhinoceros-Related Resources in "gnome" User Directory | HIGH | zeek.http from rhino2.pcap |
| 2004-04-28T21:15:41 | Windows PE Executable Detected in rhino3.pcap Network Traffic | LOW | zeek.pe from rhino3.pcap |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] FTP Account "gnome" Used to Upload Rhinoceros Images to 137.30.120.40

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:18:40 to 2004-04-26T22:31:11 |
| **Sources** | zeek.ftp from rhino.pcap, pcap.summary from rhino.pcap |
| **Evidence Refs** | tc_58cb2e42, tc_5a1f7393 |
| **ATT&CK** | [T1567](https://attack.mitre.org/techniques/T1567/) |


Network analysis (zeek.ftp from rhino.pcap) reveals FTP connections from client IP 137.30.122.253 to FTP server 137.30.120.40:21 using the username "gnome". Multiple STOR (upload) commands were executed, transferring rhinoceros-related image files:
- rhino1.jpg (image/jpeg) - uploaded at 2004-04-26 22:18:49
- rhino3.jpg (image/jpeg) - uploaded twice at 2004-04-26 22:18:49 and 22:18:56
- contraband.zip (application/zip) - uploaded at 2004-04-26 22:30:46

All transfers completed successfully (reply code 226). The password field is masked as "<hidden>" by Zeek. Total of 8 FTP records (4 STOR commands) transferred via PORT mode active data connections. The data transfers totaled 508 KB (338 frames of ftp-data traffic per PCAP analysis).



### 2. [HIGH] Web Server www.cs.uno.edu Hosts Rhinoceros-Related Resources in "gnome" User Directory

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-04-28T21:08:30 to 2004-04-28T21:10:09 |
| **Sources** | zeek.http from rhino2.pcap |
| **Evidence Refs** | tc_04d1cc45 |
| **ATT&CK** | [T1071](https://attack.mitre.org/techniques/T1071/) |


HTTP network analysis (zeek.http from rhino2.pcap and rhino3.pcap) reveals requests to www.cs.uno.edu (IP 137.30.120.37) requesting the file "/~gnome/rhino5.gif" from client IP 137.30.123.234. This demonstrates that a web server hosts rhinoceros-related content in a directory associated with the "gnome" username, suggesting a direct connection between the user account and the rhinoceros image collection. The request occurred at 2004-04-28 21:09:44 in rhino2.pcap and indicates public or semi-public access to the rhinoceros materials.



### 3. [HIGH] Connection Between FTP "gnome" Account and University Web Server www.cs.uno.edu

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:18:40 to 2004-04-28T21:09:44 |
| **Sources** | zeek.ftp from rhino.pcap, zeek.http from rhino2.pcap, zeek.conn from rhino.pcap |
| **Evidence Refs** | tc_58cb2e42, tc_04d1cc45, tc_36dd0913 |
| **ATT&CK** | [T1567](https://attack.mitre.org/techniques/T1567/), [T1071](https://attack.mitre.org/techniques/T1071/) |


Evidence establishes a direct connection between the FTP account "gnome" and the University of New Orleans web server (www.cs.uno.edu, IP 137.30.120.37):

1. FTP account "gnome" uploaded rhinoceros-related files to server 137.30.120.40 (2004-04-26 22:18:40 - 22:31:11)
2. HTTP analysis shows rhinoceros content hosted at www.cs.uno.edu in the "/~gnome/" directory specifically "/~gnome/rhino5.gif" accessed on 2004-04-28 21:09:44
3. Both the FTP server (137.30.120.40) and web server (137.30.120.37) are on the same 137.30.120.x subnet, indicating they are part of the same institutional infrastructure

This demonstrates the "gnome" account holder uploaded files via FTP to institutional servers and then accessed rhinoceros-related content from the same institution's web server, suggesting deliberate storage and access of rhinoceros materials through university infrastructure.



### 4. [HIGH] Multiple Network Connections from FTP Client IP 137.30.122.253 During Rhinoceros Upload Window

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:16:49 to 2004-04-26T22:31:11 |
| **Sources** | zeek.ftp from rhino.pcap, zeek.conn from rhino.pcap, zeek.http from rhino.pcap, zeek.ssl from rhino.pcap, pcap.summary from rhino.pcap |
| **Evidence Refs** | tc_58cb2e42, tc_36dd0913, tc_f6f2db45, tc_abca9ebc, tc_5a1f7393 |
| **ATT&CK** | [T1048](https://attack.mitre.org/techniques/T1048/), [T1567](https://attack.mitre.org/techniques/T1567/), [T1071](https://attack.mitre.org/techniques/T1071/) |


Comprehensive analysis of network activity from client IP 137.30.122.253 during the rhinoceros file upload period (2004-04-26 22:16:49 - 22:31:11) reveals multi-protocol activity with interleaved timing:\n\nTIMELINE (converted from Unix timestamps):\n1. 22:16:49 - IMAP connection starts to 137.30.120.39 (120 sec duration)\n2. 22:18:40 - FTP PORT command begins to 137.30.120.40\n3. 22:18:41 - HTTP GET to google.com\n4. 22:19:08 - HTTP GET to by17fd.bay17.hotmail.msn.com (Hotmail webmail)\n5. 22:19:32 onwards - HTTP requests to MSN hosts (interleaved with FTP)\n6. 22:30:46 - FTP upload of contraband.zip completes\n\nACTIVITIES ARE INTERLEAVED (overlapping but not simultaneous) rather than orchestrated in coordinated attack pattern. This timeline is consistent with a single user performing sequential actions in one session: email sync (IMAP), web browsing (HTTP to Google/MSN), and file uploads (FTP), rather than planned multi-vector attack coordination. The overlapping nature reflects normal user workflow where multiple protocols are active during a browsing/upload session.\n\nFINDINGS:\n- IMAP: 93 bytes sent, 462 KB received (consistent with email sync)\n- FTP: Files uploaded successfully (rhino1.jpg, rhino3.jpg, contraband.zip) totaling 508 KB\n- HTTP: Standard web browsing and webmail access\n- SSL/Telnet: Supporting protocols for authentication and administration\n\nNo evidence of automated scripting, command injection, or attack coordination detected. Activities are consistent with legitimate user managing multiple communications channels in academic environment."



### 5. [HIGH] USB Image Evidence Shows University of New Orleans Connection with Embedded MIT Email Data

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:18:40 |
| **Sources** | tsk.filelist from RHINOUSB.dd, bulk.email from RHINOUSB.dd, bulk.domain from RHINOUSB.dd, zeek.ftp from rhino.pcap |
| **Evidence Refs** | tc_e1c06e9c, tc_0d328fea, tc_37e68684, tc_58cb2e42 |
| **ATT&CK** | [T1052](https://attack.mitre.org/techniques/T1052/) |


Analysis of seized USB image (RHINOUSB.dd) reveals that it contains text files and image data with embedded metadata. Bulk extractor recovered the string \"philg@mit.edu\" and domain \"mit.edu\" from within JPEG image metadata (copyright notice format). \n\nSIGNIFICANCE:\n- The same \"gnome\" username appears in network FTP activity (137.30.120.40 on University of New Orleans network)\n- MIT-affiliated copyright metadata is embedded in image file on USB\n- Rhinoceros content is stored in /~gnome/ web directory at UNO\n\nPOTENTIAL CONNECTION: The USB's presence during network capture window (2004-04-26 to 2004-04-28) when rhinoceros materials were being transferred suggests the USB may have been used for local storage of materials.\n\nCOUNTER-NOTE: The copyright metadata in the JPEG file does not establish proof of multi-institutional coordination. Copyright notices are standard in image files and do not prove that the image owner or creator (if that's what the copyright represents) was involved in the activities shown in network traces. The mere presence of MIT-affiliated metadata on a USB device in the same time frame as FTP transfers is circumstantial and could reflect unrelated file storage, particularly given that copyright notices are ubiquitous in digital media."



### 6. [MEDIUM] USB Key Contains Text Files gumbo1.txt and gumbo2.txt with References to MIT Email Domain

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:18:40 |
| **Sources** | tsk.filelist from RHINOUSB.dd, bulk.email from RHINOUSB.dd, bulk.domain from RHINOUSB.dd |
| **Evidence Refs** | tc_e1c06e9c, tc_0d328fea, tc_37e68684 |


The USB image (RHINOUSB.dd) contains two text files (inodes 4 and 6): gumbo1.txt and gumbo2.txt. Bulk extractor analysis recovered data including the string \"philg@mit.edu\" and domain \"mit.edu\" from within file data. The recovered email string appears as part of a copyright notice (\"copyright 2000 philg@mit.edu\") embedded within JPEG image data based on recovered byte sequence patterns. This indicates the USB contained or held a JPEG image file with a copyright notice in its metadata. Copyright notices with creator names or institutions are standard in digital image files and do not necessarily establish ownership, transfer intent, or organizational involvement beyond what an ordinary image file might contain. The USB device's hash is MD5:80348c58eec4c328ef1f7709adc56a54 / SHA256:ce550424200a997c61b413941c8ef4df9619a2f96579674952294a176a32be65. The timing aligns with the network capture period (2004-04-26 to 2004-04-28).\n\nCOUNTER-NOTE: While bulk extractor successfully recovered the copyright metadata from a JPEG file, this does not establish proof of data exfiltration, institutional coordination, or that the USB was used for malicious file transfer. Ordinary image files routinely contain such metadata."



### 7. [MEDIUM] Archived Rhinoceros Content Uploaded as "contraband.zip" to FTP Server

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-04-26T22:30:46 to 2004-04-26T22:30:46 |
| **Sources** | zeek.ftp from rhino.pcap |
| **Evidence Refs** | tc_58cb2e42 |
| **ATT&CK** | [T1567](https://attack.mitre.org/techniques/T1567/) |


Network analysis (zeek.ftp from rhino.pcap) shows that in addition to individual JPEG image files (rhino1.jpg, rhino3.jpg), the FTP account \"gnome\" uploaded a compressed archive file named \"contraband.zip\" (MIME type: application/zip) to FTP server 137.30.120.40 at 2004-04-26 22:30:46. The filename \"contraband\" could suggest the uploader was aware the archived content was illicit or prohibited, OR could represent standard IT naming conventions (though no baseline exists in network traces to establish this). The archive was uploaded via FTP PORT mode command with successful completion (reply code 226). Without comparison to other archive files in institutional use, the specific labeling cannot definitively establish consciousness of knowledge that materials were illegal.\n\nCOUNTER-NOTE: Investigation Q12 notes the absence of other archive files in network traces that would establish naming convention baseline, limiting the strength of any inference from the filename alone."



### 8. [LOW] Significant Email Activity Over IMAP with Large Data Transfer Detected

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:16:49 to 2004-04-26T22:18:49 |
| **Sources** | zeek.conn from rhino.pcap |
| **Evidence Refs** | tc_36dd0913 |
| **ATT&CK** | [T1020](https://attack.mitre.org/techniques/T1020/), [T1048](https://attack.mitre.org/techniques/T1048/) |


Network analysis (zeek.conn from rhino.pcap) reveals IMAP connection from client IP 137.30.122.253 (port 1652) to mail server 137.30.120.39 (port 143) occurring at 2004-04-26 22:16:49. The connection remained open for approximately 120 seconds with minimal originating bytes (93 bytes) but 462,194 bytes (~462 KB) response data. This volume is consistent with either: (1) downloading multiple email messages, (2) synchronizing mailbox with attachments, (3) or downloading a single large email. Without baseline data on normal IMAP transfer volumes for users at UNO, the 462 KB transfer cannot definitively be assessed as exfiltration vs. routine email synchronization. The timing overlaps with other network activity on 2004-04-26 22:16:49 - 22:31:11, but the interleaved nature (rather than concurrent) is consistent with single user managing multiple protocols sequentially in the same session."



### 9. [LOW] Multiple HTTP Requests to Hotmail/MSN Webmail Services from FTP Client IP

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:19:32 to 2004-04-26T22:31:11 |
| **Sources** | zeek.http from rhino.pcap |
| **Evidence Refs** | tc_f6f2db45 |
| **ATT&CK** | [T1021](https://attack.mitre.org/techniques/T1021/) |


Network analysis (zeek.http from rhino.pcap) reveals that client IP 137.30.122.253 (the same client that uploaded rhinoceros files via FTP) accessed Hotmail/MSN webmail services on 2004-04-26 22:19:32 and later in the capture session. Multiple HTTP GET requests were made to MSN-related hosts including by17fd.bay17.hotmail.msn.com and h.msn.com. These requests occurred during the time window (2004-04-26 22:16:49 - 22:31:11) when IMAP email activity and FTP file uploads were also occurring. Webmail access is routine and requires SSL authentication to Passport services for security. The interleaved timing of email access, webmail login, and FTP activity is consistent with single user managing multiple communication channels in one session rather than evidence of coordination or compromise."



### 10. [LOW] Telnet Protocol Traffic Detected During Rhinoceros File Upload Activity

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-04-26T22:18:40 to 2004-04-26T22:31:11 |
| **Sources** | pcap.summary from rhino.pcap |
| **Evidence Refs** | tc_5a1f7393 |
| **ATT&CK** | [T1021](https://attack.mitre.org/techniques/T1021/) |


Network protocol analysis (pcap.summary from rhino.pcap) reveals the presence of unencrypted telnet traffic (568 frames) during the capture period (2004-04-26 22:18:40 - 22:31:11) when rhinoceros-related FTP uploads and email activity were occurring. However, in 2004 academic environments, telnet was standard for system administration, remote login, and lab access. Unencrypted telnet sessions do expose credentials and commands to network eavesdropping, but the presence of telnet protocol alone does not indicate malicious activity without context establishing whether these telnet sessions deviate from baseline administrative or lab access patterns at UNO. Detailed telnet session content was not available in extracted network protocol output."



### 11. [LOW] SSL Connections to Microsoft Passport Services from FTP Client IP

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:19:30 to 2004-04-26T22:30:59 |
| **Sources** | zeek.ssl from rhino.pcap, zeek.x509 from rhino.pcap |
| **Evidence Refs** | tc_abca9ebc, tc_02a9150e |
| **ATT&CK** | [T1021](https://attack.mitre.org/techniques/T1021/) |


Network analysis (zeek.ssl from rhino.pcap) reveals that client IP 137.30.122.253 established encrypted SSL/TLS connections to Microsoft Passport authentication servers on 2004-04-26 at two timestamps: 22:19:30 and 22:30:59, both using SSLv3 TLS_RSA_WITH_RC4_128_MD5 cipher suite and the CN=loginnet.passport.com certificate. These SSL connections to Passport are normal and expected for legitimate Hotmail/MSN webmail account authentication. The presence of SSL authentication connections correlates with the HTTP requests to MSN services but indicates proper encryption of credentials, not compromise. Without evidence of account compromise (such as unusual login locations or failed authentication attempts), these connections represent routine webmail access."



### 12. [LOW] Windows PE Executable Detected in rhino3.pcap Network Traffic

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-04-28T21:15:41 to 2004-04-28T21:16:48 |
| **Sources** | zeek.pe from rhino3.pcap |
| **Evidence Refs** | tc_bf2f2a4e |
| **ATT&CK** | [T1105](https://attack.mitre.org/techniques/T1105/) |


Network protocol analysis (zeek.pe from rhino3.pcap) detected a Windows PE executable file transferred over the network at 2004-04-28 21:15:41. The executable metadata shows: Machine type: i386 (32-bit Intel processor), Compile timestamp: August 25, 1999 (approximately 5 years before capture and 2 years BEFORE Windows XP release), Target OS: Windows XP, Subsystem: Windows CUI (Console User Interface), 32-bit, has import table and debug data, uses structured exception handling (SEH). The contradiction between 1999 compilation date and Windows XP target OS indicates either legacy code, timestamp manipulation, or conditional compilation. Without additional context (file hash, name, source/destination analysis), the purpose and nature of this executable cannot be determined from protocol analysis alone. The timing aligns with rhinoceros content access in rhino3.pcap (2004-04-28 21:15:41 - 21:16:48) but does not establish connection or purpose."



### 13. [INFO] Unable to Determine FTP Password - Encrypted/Masked in Network Traffic Analysis

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:18:40 |
| **Sources** | zeek.ftp from rhino.pcap |
| **Evidence Refs** | tc_58cb2e42 |


Investigation Question Q2 seeks identification of telnet/ftp account credentials. While the FTP username "gnome" was clearly identified in Zeek protocol analysis (zeek.ftp from rhino.pcap), the password field is consistently displayed as "<hidden>" in the network capture analysis tools.

ANALYSIS LIMITATIONS:
- Zeek FTP parser masks password fields for security in output
- No plaintext password transmission observed in other network protocols
- Telnet traffic present in PCAP (568 frames) but detailed telnet session data not extracted by current tools
- No registry, SAM database, or system configuration files available in evidence to determine password hashes or credentials

CONCLUSION:
The actual FTP/telnet password for the "gnome" account cannot be determined from the available forensic evidence. While the account exists and was used for file uploads, the password remains unknown. Recovery would require either: (1) raw PCAP packet analysis to extract telnet session data, (2) system compromise information, or (3) witness statement regarding account setup.



### 14. [INFO] Unable to Determine Account Creation Authorization - Insufficient Evidence Q1

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | zeek.ftp from rhino.pcap |
| **Evidence Refs** | tc_58cb2e42 |


Investigation Question Q1 asks: "Who gave the accused telnet/ftp account access?"

EVIDENCE REVIEWED:
- Network FTP logs show "gnome" account usage with successful authentication
- FTP server: 137.30.120.40 (UNO institutional server)
- Account was operational and possessed valid credentials
- No evidence of unauthorized account creation or privilege escalation

GAPS IN EVIDENCE:
- No system administration logs or account creation records available
- No witness statements or email authorizing account creation
- No access control lists or permission grants documented
- No administrator interview notes or audit trails

CONCLUSION:
The forensic evidence does not contain information about WHO authorized or created the "gnome" account on FTP server 137.30.120.40. This would require system administrator records, audit logs from the FTP server, or testimony from UNO IT staff to establish. The network evidence only confirms that the account existed and was used for file uploads at the specified times.



### 15. [INFO] Unable to Determine USB Key Post-Seizure Status or Location - Q5 Not Addressed in Available Evidence

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | tsk.filelist from RHINOUSB.dd |
| **Evidence Refs** | tc_e1c06e9c |


Investigation Question Q5 asks: "What happened to the USB key after seizure?"

USB FORENSIC DATA AVAILABLE:
- USB image: RHINOUSB.dd (MD5:80348c58eec4c328ef1f7709adc56a54)
- Contents: gumbo1.txt, gumbo2.txt, MIT email data (philg@mit.edu)
- Image was successfully analyzed and forensic data extracted
- Bulk extractor and TSK analysis completed on the image

POST-SEIZURE INFORMATION MISSING:
- No chain of custody documentation provided
- No storage location or facility designation noted
- No condition assessment (physical damage, operational status)
- No inventory or evidence log showing device disposition
- No notes on whether the actual USB device is still retained or destroyed

CONCLUSION:
Forensic analysis confirms the USB image was successfully extracted and analyzed, indicating the device was handled through proper forensic procedures. However, the current evidence does not document what physically happened to the USB key after seizure - whether it remains in evidence storage, was returned to owner, was destroyed, or is being held elsewhere. This information would be found in: (1) official evidence logs, (2) property management records, (3) case closure documentation, or (4) chain of custody forms.



### 16. [INFO] Unable to Determine Hard Drive Status or Location from Network and USB Forensic Evidence - Q4

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | tsk.filelist from RHINOUSB.dd |
| **Evidence Refs** | tc_e1c06e9c |


Investigation Question Q4 asks: "What happened to the computer's hard drive and where is it now?"

EVIDENCE AVAILABLE FOR ANALYSIS:
- Network packet captures from three time periods (rhino.pcap, rhino2.pcap, rhino3.pcap) 
- USB image forensics (RHINOUSB.dd)
- Network device logs and metadata

EVIDENCE NOT AVAILABLE:
- No disk imaging or forensic analysis results from computer hard drives
- No storage device inventory or chain of custody documentation
- No physical evidence logs describing device storage or location
- No forensic imaging reports or hash verification of hard drives

CONCLUSION:
The current forensic evidence focuses on network traffic analysis and USB image analysis. There is no information about any computer hard drive - whether one was seized, its location, condition, or current disposition. This question requires additional evidence such as: (1) system forensic reports from targeted computers, (2) physical evidence logs from the investigation, (3) chain of custody documentation, or (4) law enforcement investigative notes about device seizure and storage.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| External IP | `137.30.120.40` |  | FTP Account "gnome" Used to Upload Rhinoceros Images to 137.30.120.40 |
| Port | `TCP 21` |  | FTP Account "gnome" Used to Upload Rhinoceros Images to 137.30.120.40 |
| External IP | `137.30.122.253` |  | FTP Account "gnome" Used to Upload Rhinoceros Images to 137.30.120.40 |
| External IP | `137.30.120.37` |  | Web Server www.cs.uno.edu Hosts Rhinoceros-Related Resources in "gnome" User Dir |
| External IP | `137.30.123.234` |  | Web Server www.cs.uno.edu Hosts Rhinoceros-Related Resources in "gnome" User Dir |
| External IP | `137.30.120.39` |  | Multiple Network Connections from FTP Client IP 137.30.122.253 During Rhinoceros |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| MD5 | `80348c58eec4c328ef1f7709adc56a54` |  | USB Key Contains Text Files gumbo1.txt and gumbo2.txt with References to MIT Ema |
| SHA256 | `ce550424200a997c61b413941c8ef4df9619a2f96579674952294a176a32be65` |  | USB Key Contains Text Files gumbo1.txt and gumbo2.txt with References to MIT Ema |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `philg@mit.edu` |  | USB Key Contains Text Files gumbo1.txt and gumbo2.txt with References to MIT Ema |




---

## Appendix C: MITRE ATT&CK Coverage

7 techniques identified across findings.


**Kill Chain Coverage:** Lateral Movement (1) > Command and Control (2) > Exfiltration (4)


### Lateral Movement

| Technique | Name | Findings |
|-----------|------|----------|
| [T1021](https://attack.mitre.org/techniques/T1021/) | Remote Services | Multiple HTTP Requests to Hotmail/MSN Webmail...; Telnet Protocol Traffic Detected During...; SSL Connections to Microsoft Passport Services... |


### Command and Control

| Technique | Name | Findings |
|-----------|------|----------|
| [T1071](https://attack.mitre.org/techniques/T1071/) | Application Layer Protocol | Web Server www.cs.uno.edu Hosts...; Connection Between FTP "gnome" Account and...; Multiple Network Connections from FTP Client... |
| [T1105](https://attack.mitre.org/techniques/T1105/) | Ingress Tool Transfer | Windows PE Executable Detected in rhino3.pcap... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1020](https://attack.mitre.org/techniques/T1020/) | Automated Exfiltration | Significant Email Activity Over IMAP with... |
| [T1048](https://attack.mitre.org/techniques/T1048/) | Exfiltration Over Alternative Protocol | Significant Email Activity Over IMAP with...; Multiple Network Connections from FTP Client... |
| [T1052](https://attack.mitre.org/techniques/T1052/) | Exfiltration Over Physical Medium | USB Image Evidence Shows University of New... |
| [T1567](https://attack.mitre.org/techniques/T1567/) | Exfiltration Over Web Service | FTP Account "gnome" Used to Upload Rhinoceros...; Connection Between FTP "gnome" Account and...; Archived Rhinoceros Content Uploaded as...; Multiple Network Connections from FTP Client... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 178 |
| Findings submitted | 16 |
| Confirmed | 13 |
| Inferences | 3 |
| Input tokens | 630 |
| Output tokens | 60.7K |
| Total tokens | 61.3K |
| Audit log | /home/mulder/.mulder/cases/rhino-hunt.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 630 | 60.7K | 61.3K |




<details>
<summary>Evidence Sources (41)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.filelist | sleuthkit | 6 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| pcap.summary | tshark | 47 |
| pcap.summary | tshark | 47 |
| pcap.summary | tshark | 64 |
| bulk.domain | bulk_extractor | 6 |
| zeek.conn | zeek | 7 |
| zeek.conn | zeek | 8 |
| bulk.email | bulk_extractor | 6 |
| zeek.conn | zeek | 129 |
| zeek.files | zeek | 13 |
| zeek.files | zeek | 14 |
| zeek.files | zeek | 134 |
| zeek.http | zeek | 13 |
| zeek.http | zeek | 14 |
| zeek.ftp | zeek | 9 |
| zeek.packet_filter | zeek | 2 |
| zeek.packet_filter | zeek | 2 |
| zeek.http | zeek | 104 |
| zeek.pe | zeek | 2 |
| hashdeep.hashes | hashdeep | 6 |
| zeek.summary | zeek | 5 |
| zeek.packet_filter | zeek | 2 |
| zeek.summary | zeek | 6 |
| zeek.ssl | zeek | 3 |
| zeek.weird | zeek | 2 |
| zeek.x509 | zeek | 2 |
| zeek.summary | zeek | 9 |
| suricata.alerts | suricata | 5 |
| suricata.alerts | suricata | 5 |
| suricata.alerts | suricata | 5 |
| tsk.masquerade | sleuthkit | 0 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
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
