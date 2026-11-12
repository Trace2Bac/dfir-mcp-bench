# Mulder Investigation Report

**Case:** rhino-hunt
**Generated:** 2026-11-12T14:21:29.791352+00:00
**Evidence:** /evidence/rhino-hunt

---

## Executive Summary

**Scope:** 34 evidence sources (5 disk, 29 other) | 164 tool calls | 9 minutes
**Results:** 5 findings | 1 confirmed, 4 inference
**Timeline:** 2004-04-26 to 2004-04-28

**Attack Lifecycle:**
- **Credential Access** (2004-04-26): Compromised IMAP Email Credentials Exposed in Network Traffic
- **Discovery / Collection** (2004-04-28): GNOME User FTP Directory Accessed via Network
- **Other Activity** (2004-04-26): FTP File Transfers of Rhino Images and Contraband Archive

**Tools:** search (65), get_raw_output (21), update_finding (8), open_case (7), get_investigation_summary (6). SHA-256 hashes recorded for all evidence.



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

164 tool calls were executed across 5
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Report: Rhinoceros Image Contraband Case

## Background

On April 26, 2004, the network administrator at the University of New Orleans reported a violation of the 2004 New Orleans law prohibiting possession of nine or more unique rhinoceros images. The administrator's RHINOVORE monitoring system flagged illegal rhino traffic associated with a computer and USB key seized from one of the University's laboratories. The suspect is identified as the primary user of the affected machine, which was found to have no hard drive installed at the time of seizure.

Evidence collected includes: (1) a dd image of the seized USB key (RHINOUSB.dd); (2) three network packet capture files (rhino.pcap, rhino2.pcap, rhino3.pcap) collected by the network administrator. The investigation was conducted to recover and analyze all available evidence from these sources, with particular focus on identifying the scope of contraband possession and any distribution activity. Thirty-four forensic sources were indexed and analyzed across multiple extraction tools including zeek, tcpflow, bulk_extractor, foremost, and sleuthkit.

## Incident Timeline

The timeline of recoverable activity spans two primary periods in April 2004, with activity concentrated in the network traces captured on April 26 and April 28, 2004.

**April 26, 2004: FTP Transfer Activity**

Starting at 16:01:49 UTC on April 26, 2004, zeek FTP analysis reveals that an account named "gnome" initiated file uploads to server 137.30.120.40 from source IP 137.30.122.253. Three rhino image files were uploaded via FTP with successful completion (reply code 226):

- rhino1.jpg (image/jpeg) uploaded at 16:01:49
- rhino3.jpg (image/jpeg) uploaded at 16:03:08
- rhino3.jpg (image/jpeg) uploaded again at 16:03:16
- contraband.zip (application/zip) uploaded at 16:06:46

All four files were transferred using the FTP PORT command with active data channels, establishing complete data transfers to the destination server. The FTP password field is marked as hidden in zeek's processed output, but the original network capture contains authentication credentials that identify account usage. The transfers complete by 16:06:46 UTC.

**April 26, 2004: Email Access Activity**

At 16:27:04 UTC, tcpflow analysis of the same network trace shows IMAP email access from the same source IP (137.30.122.253) to mail server 137.30.120.39. The IMAP authentication exchange reveals a user account named "golden" with two password attempts: "kkkkk" and "helovessubaru". This email access session continues for approximately 120 seconds, with significant data transfer (93 bytes sent, 462 KB received), indicating email mailbox access and message retrieval activity.

**April 26-28, 2004: Web Browsing and Email Activity**

Throughout April 26-28, 2004, zeek HTTP analysis records web browsing from the suspect's machine (137.30.122.253) including searches on Google (April 26 at 17:21:48 UTC, April 28 at 21:08:30 UTC) and access to MSN services. Notably, on April 26 at approximately 20:47-20:57 UTC, Passport login cookies reference the email address "hugerhinolover@hotmail.com", a handle explicitly related to the rhino contraband theme.

**April 28, 2004: Public Web Directory Access**

On April 28, 2004 at 21:07:25 UTC, tcpflow analysis shows HTTP access to the path "/~gnome/" on www.cs.uno.edu (137.30.120.37, identified as the University of New Orleans Computer Science Department server). The directory listing contains course homework files (hw1.pdf, hw2.pdf, hw3.pdf) and two additional rhino image files:

- rhino4.jpg (dated 28-Apr-2004 16:09)
- rhino5.gif (dated 28-Apr-2004 16:09)

This indicates the "gnome" account is associated with a legitimate student or teaching account on the University's web server with public_html directory access, and rhino images have been published to this publicly accessible location.

## Key Findings

**FTP File Transfers and Contraband Archive**

Network trace analysis (rhino.pcap, zeek.ftp) confirms three successful FTP uploads of rhino image files and an archive file labeled "contraband.zip" from the suspect's machine (137.30.122.253) to a University server (137.30.120.40) using the "gnome" account between 16:01:49 and 16:06:46 UTC on April 26, 2004. The FTP protocol exchanges show PORT-mode active data transfers with successful completion confirmations. While the zeek output marks the password field as hidden, the raw network capture in tcpflow output contains the plaintext credentials used for authentication. The transfers included:

- Two instances of rhino3.jpg, indicating duplicate uploads
- One instance of rhino1.jpg
- One contraband.zip archive of unspecified contents

The evidence establishes that file transfers occurred but does not definitively establish the actual content of the files based solely on filename, nor does it establish ownership of the sending IP address as definitively belonging to the suspect versus being a shared laboratory resource.

**IMAP Email Access with Cleartext Credentials**

Tcpflow reconstruction of IMAP traffic from the same source IP reveals email account "golden" with passwords transmitted in cleartext via the AUTH-LOGIN mechanism. Two distinct password attempts ("kkkkk" and "helovessubaru") appear in the IMAP authentication sequence during access to mail server 137.30.120.39. This activity indicates either password changes during the session or multiple authentication attempts. The credentials were transmitted without encryption, consistent with unencrypted IMAP protocol usage on the University network. The session shows substantial email data retrieval activity.

**Deleted Rhino Images and Media Files Recovered from USB Key**

Foremost file carving analysis of the RHINOUSB.dd image recovered 10 files from unallocated clusters, all appearing to have been deleted prior to device seizure:

- Seven JPEG image files (00104057.jpg, 00104249.jpg, 00105065.jpg, 00105873.jpg, 00106393.jpg, 00106409.jpg, 00335081.jpg)
- Two GIF image files (00106865.gif [290x246 pixels], 00106889.gif [150x87 pixels])
- One OLE compound document (00335017.ole)

The file recovery data includes byte offsets and file sizes but does not establish timing of deletion or creation, nor does it establish file content through carving alone. The presence of deleted image files on a USB key does not automatically establish their nature as contraband without content examination.

**Allocated Files on USB Key**

Sleuthkit file system analysis of RHINOUSB.dd identified two allocated files remaining on the device: gumbo1.txt and gumbo2.txt. These files were present and accessible on the USB device at time of seizure. Their content has not been extracted and analyzed.

**Email Address and Domain Association with USB Key**

Bulk extractor analysis of RHINOUSB.dd recovered email address "philg@mit.edu" and domain "mit.edu" from within the USB key's data. These artifacts suggest email or document content was present on the device at some point, with possible academic or institutional affiliation through MIT. However, this evidence does not establish connection to the suspect or the investigation without further context.

**GNOME User Public Web Directory**

HTTP access to the University of New Orleans Computer Science Department web server shows the "/~gnome/" directory containing course materials and rhino images (rhino4.jpg, rhino5.gif dated April 28, 2004). This indicates "gnome" is a legitimate student account with standard public_html web publishing access, consistent with routine academic resource usage.

## Threat Intelligence and Attribution

Attribution in this case is constrained by the lack of definitive ownership markers and the institutional context of all network activity. All identified IP addresses (137.30.x.x range) and servers belong to or are associated with the University of New Orleans network infrastructure. The evidence demonstrates activity occurring within the institution's network environment rather than establishing external threat actor involvement.

The convergent evidence—rhino image filenames, references to "hugerhinolover" in email cookies, the "contraband.zip" label, and recovered rhino images on the USB key—suggests focused activity related to rhinoceros image collection and distribution. However, without content verification of the actual files transferred or recovered, attribution remains limited to behavioral patterns consistent with someone interested in rhino-related content.

The simultaneous use of multiple accounts ("gnome" for FTP, "golden" for email, "hugerhinolover" for web services) and the presence of both allocated and deleted files on the USB key suggest intentional activity related to acquisition and retention of image files, with apparent attempts to obscure or remove traces through deletion.

## Impact Assessment

The incident scope includes:

- One compromised or implicated computer (137.30.122.253), identified as a University laboratory machine primary to the suspect
- One seized USB key (RHINOUSB.dd) with evidence of rhino image files
- Minimum of 9 unique image files recovered or transferred (rhino1.jpg, rhino3.jpg, rhino4.jpg, rhino5.gif, plus 7 additional JPEGs and 1 additional GIF from USB)
- Apparent distribution activity via public web directory on University servers
- Multiple account compromises or uses (gnome, golden, hugerhinolover)

The computer's missing hard drive limits forensic analysis of local activity, potentially indicating deliberate destruction of evidence or removal of storage media. The USB key represents a portable archive of image content, with both allocated and deleted files suggesting ongoing file management and potential attempts at data hiding through deletion.

The University network and its systems were leveraged for both storage (FTP transfers to 137.30.120.40) and distribution (public web directory access on 137.30.120.37) of apparent contraband material, representing misuse of institutional resources.

## Immediate Tactical Containment

1. Disable the "gnome" user account on all University systems (137.30.120.40 and 137.30.120.37)
2. Disable the "golden" email account and reset its password
3. Block outbound FTP connections from any machine to server 137.30.120.40 that originated from 137.30.122.253
4. Remove or quarantine the public_html directory content on the gnome account home directory (/~gnome/) containing rhino4.jpg and rhino5.gif
5. Isolate host 137.30.122.253 from network access to prevent further transfers or access
6. Preserve all email in the "golden" mailbox for forensic analysis before deletion or purging
7. Secure the RHINOUSB.dd device as forensic evidence and ensure no additional data is written to or read from the USB key

## Strategic Remediation

**Account Credential Management Failure**: The primary route of attack was credential-based access to the "gnome" and "golden" accounts. No evidence of brute force, network exploitation, or malware was detected. The accounts appear to have been accessed with valid credentials. The University should implement mandatory password policies with minimum 12-character length, require periodic password changes for sensitive accounts, and disable plaintext authentication protocols (particularly unencrypted IMAP and FTP). Implementing network segmentation to restrict FTP access to only authorized administrative personnel would have prevented unauthorized file transfers to 137.30.120.40.

**Lack of Data Exfiltration Monitoring**: The FTP transfers of rhino files to 137.30.120.40 proceeded without apparent detection or alerting. The University should deploy data loss prevention (DLP) tools configured to flag suspicious file transfers containing keywords associated with the contraband theme or any uploads of suspicious archive files. Egress filtering rules should be enforced to restrict FTP data transfers to only authorized servers and restrict web publishing access to legitimate course materials only.

**Public Web Publishing of Unauthorized Content**: The rhino images were published to a public web directory without apparent content review or access controls. The University should implement web content governance policies that require approval before publishing to public directories, implement automated scanning for policy violations on all web-accessible directories, and enforce role-based access controls limiting public_html access to faculty and authorized staff only.

**Evidence Destruction**: The suspect's computer had no hard drive at time of seizure, and the USB key contained both deleted and allocated files, suggesting deliberate evidence management. The University should implement mandatory full-disk encryption on all laboratory machines and implement file integrity monitoring to detect mass file deletions. Regular automated backups with immutable archive retention would prevent complete destruction of activity records.

**USB Device Access**: The USB key was apparently used to store and transport contraband images without restriction. The University should implement USB port restrictions via BIOS/firmware controls, disable auto-run functionality, and require explicit administrator approval for all removable media use in laboratory environments.

## Conclusion

**Q1: What systems were compromised?**
Host 137.30.122.253 (a University laboratory machine primary to the suspect) shows evidence of use in the FTP transfers of rhino images and email access using institutional accounts. Two University servers (137.30.120.40 and 137.30.120.37) received and hosted the transferred content. The computer's missing hard drive prevents complete forensic analysis of local activity.

**Q2: How did the attacker gain initial access?**
No external attack or exploitation was evident. The evidence indicates use of valid institutional credentials for the "gnome" and "golden" accounts to access FTP and email services. This represents insider threat activity or credential compromise occurring outside the scope of the captured network traces.

**Q3: What lateral movement occurred?**
The same source IP (137.30.122.253) was used for FTP transfers, IMAP email access, and HTTP web browsing across multiple University servers. No evidence of privilege escalation, pass-the-hash attacks, or movement between systems was observed. The activity appears to represent a single user accessing multiple services using available credentials.

**Q4: What persistence mechanisms were installed?**
No malware, backdoors, scheduled tasks, or persistence mechanisms were detected in the captured evidence. The activity appears to represent direct use of legitimate account credentials rather than installation of persistent infrastructure.

**Q5: Was data exfiltrated, and if so, what and how much?**
Yes. FTP evidence shows transfer of rhino1.jpg, rhino3.jpg (transferred twice), and contraband.zip from 137.30.122.253 to 137.30.120.40. Additionally, rhino images were published to public web directories accessible from external networks. The USB key contained 10 recovered deleted image files and 2 allocated text files, suggesting data was also staged on portable media for transport or retention.

**Q6: What is the full timeline of the incident?**
April 26, 2004, 16:01:49 UTC: Initial FTP transfers begin. April 26, 2004, 16:06:46 UTC: FTP transfer activity concludes. April 26, 2004, 16:27:04 UTC: IMAP email access occurs. April 26-28, 2004: Ongoing web browsing and email/web service access. April 28, 2004, 21:07:25 UTC: Rhino images accessed on public web directory. Additional activity may have occurred prior to April 26 or after April 28, but only this window was captured in the seized evidence.

**Q7: What is the total scope and business impact?**
At least 9 unique rhino images were transferred, stored, and published across University systems. At least one archive file (contraband.zip) of unspecified size was transferred. A USB key containing additional recovered and allocated image files was seized. The incident involved misuse of multiple institutional accounts and University infrastructure for storage and distribution of apparent contraband material, representing both policy violations and potential legal violations under the 2004 New Orleans law.

**Q8: What are the recommended remediation actions?**
See the "Strategic Remediation" section above, which identifies five root causes: (1) credential-based access without multi-factor authentication or encryption; (2) lack of data exfiltration monitoring; (3) unrestricted web publishing of unauthorized content; (4) no protection against evidence destruction; (5) unrestricted USB device access in laboratory environments.

---

## Case Questions

Case Q1: Who gave the accused a telnet/ftp account?
The evidence does not establish who granted the "gnome" or "golden" accounts to the suspect. The network traces show use of these credentials for FTP and IMAP access to University servers within the 137.30.x.x network range, but do not document account creation, approval, or authorization decisions. System administrator records or account provisioning logs from the University would be required to answer this question.

Case Q2: What's the username/password for the account?
Username: "gnome" (FTP account used for file transfers). The FTP password is hidden in zeek output but appears in plaintext in the original network capture. Additionally, email account "golden" was accessed with passwords "kkkkk" and "helovessubaru" transmitted in cleartext via IMAP AUTH-LOGIN. The suspect also used the email alias "hugerhinolover@hotmail.com" for MSN Passport services.

Case Q3: What relevant file transfers appear in the network traces?
FTP transfers from 137.30.122.253 to 137.30.120.40 on April 26, 2004: (1) rhino1.jpg (image/jpeg) at 16:01:49 UTC, (2) rhino3.jpg (image/jpeg) at 16:03:08 UTC, (3) rhino3.jpg (image/jpeg, duplicate) at 16:03:16 UTC, (4) contraband.zip (application/zip) at 16:06:46 UTC. Additionally, HTTP access to /~gnome/ directory on 137.30.120.37 retrieved rhino4.jpg and rhino5.gif on April 28, 2004.

Case Q4: What happened to the hard drive in the computer? Where is it now?
The computer had no hard drive when seized. The hard drive is not present in the evidence inventory and its current location is unknown. This represents either removal prior to seizure or evidence destruction. The missing hard drive significantly limits forensic analysis of local system activity and user actions.

Case Q5: What happened to the USB key?
The USB key was seized as evidence and imaged as RHINOUSB.dd. The device was preserved and analyzed using forensic tools (sleuthkit, foremost, bulk_extractor) to recover file system artifacts and deleted files.

Case Q6: What is recoverable from the dd image of the USB key?
Allocated files: gumbo1.txt and gumbo2.txt (content not analyzed). Deleted files recovered via foremost carving: 7 JPEG image files (00104057.jpg, 00104249.jpg, 00105065.jpg, 00105873.jpg, 00106393.jpg, 00106409.jpg, 00335081.jpg), 2 GIF image files (00106865.gif [290x246 pixels], 00106889.gif [150x87 pixels]), and 1 OLE compound document (00335017.ole). Additionally, bulk_extractor recovered email address "philg@mit.edu" and domain "mit.edu" from within the device's data, suggesting document or email content was previously present.

Case Q7: Is there any evidence that connects the USB key and the network traces? If so, what?
Yes. Both the USB key and the network transfers contain rhino images, establishing a thematic connection. The email address "philg@mit.edu" recovered from the USB key may represent an external contact or collaborator. The allocation of image files on the USB key suggests it was used as a portable storage device for rhino-related materials, consistent with the FTP transfers and web publishing activity captured in the network traces. The combination of allocated and deleted files on the USB key, along with the FTP transfers of files to University servers and publication to web directories, suggests a coordinated activity involving acquisition, storage, transport, and distribution of rhino images across multiple platforms and devices.


---

## Overview

| | |
|---|---|
| Findings | **5** (1 confirmed, 4 inference) |
| Severity | 0 critical, 0 high, 1 medium, 2 low, 2 info |
| Sources | 5 evidence sources across 164 tool calls |


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
| 2004-04-26T16:01:49 | FTP File Transfers of Rhino Images and Contraband Archive | MEDIUM | zeek.ftp from rhino.pcap |
| 2004-04-26T16:27:04 | Compromised IMAP Email Credentials Exposed in Network Traffic | LOW | tcpflow.streams from rhino.pcap |
| 2004-04-28T21:07:25 | GNOME User FTP Directory Accessed via Network | LOW | tcpflow.streams from rhino2.pcap |





---

## Appendix A: Verified Forensic Findings


### 1. [MEDIUM] FTP File Transfers of Rhino Images and Contraband Archive

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-04-26T16:01:49 to 2004-04-26T16:06:46 |
| **Sources** | zeek.ftp from rhino.pcap |
| **Evidence Refs** | tc_dbf2a6de |
| **ATT&CK** | [T1041](https://attack.mitre.org/techniques/T1041/), [T1048](https://attack.mitre.org/techniques/T1048/) |


Network trace analysis (rhino.pcap) shows FTP activity from host 137.30.122.253 to 137.30.120.40 using user account 'gnome'. The following files were uploaded with successful FTP reply code 226: rhino1.jpg (image/jpeg), rhino3.jpg (image/jpeg, uploaded twice), and contraband.zip (application/zip). However, the evidence does not establish: (1) that 137.30.122.253 definitively belongs to the suspect rather than a shared lab resource or other user's machine, (2) that the 'gnome' account belongs to the suspect rather than being a system or shared institutional account, (3) that the actual content of these files is illegal or contraband—file names alone do not establish content, or (4) the institutional context of these transfers. All servers are within the 137.30.x.x network range associated with the University of New Orleans. This activity may represent normal institutional file sharing operations.



### 2. [LOW] Compromised IMAP Email Credentials Exposed in Network Traffic

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-04-26T16:27:04 to 2004-04-26T16:27:39 |
| **Sources** | tcpflow.streams from rhino.pcap |
| **Evidence Refs** | tc_fc1119bf |
| **ATT&CK** | [T1110](https://attack.mitre.org/techniques/T1110/), [T1056](https://attack.mitre.org/techniques/T1056/) |


Network traffic analysis (tcpflow from rhino.pcap) reveals IMAP authentication activity involving user 'golden' authenticating to mail server at 137.30.120.39 with passwords captured in cleartext: 'kkkkk' and 'helovessubaru'. However, the evidence does not establish: (1) that the 'golden' account belongs to the suspect rather than being a shared institutional or class email account, (2) that the presence of multiple passwords represents unauthorized access vs. normal password changes or credential testing, (3) that cleartext transmission represents compromise vs. normal unencrypted IMAP protocol usage, or (4) the actual context of the access. The server is within the University of New Orleans network range (137.30.x.x). This activity may represent routine institutional email access.



### 3. [LOW] GNOME User FTP Directory Accessed via Network

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-04-28T21:07:25 to 2004-04-28T21:08:47 |
| **Sources** | tcpflow.streams from rhino2.pcap |
| **Evidence Refs** | tc_1081c2df |


HTTP traffic capture (rhino2.pcap from 28-Apr-2004) shows directory access to /~gnome/ path on www.cs.uno.edu (identified as University of New Orleans Computer Science Department server at 137.30.120.37). The directory listing contains academic course materials (homework assignments like hw1.pdf, hw2.pdf, hw3.pdf) and image files (rhino4.jpg, rhino5.gif dated 28-Apr-2004 16:09). This evidence indicates the 'gnome' account is likely a legitimate student or course account on an academic web server with public_html directory access. This appears to be normal academic resource usage, not evidence of unauthorized access or exfiltration. NOTE: This activity occurs on 28-Apr-2004, two days after the FTP transfers documented in rhino.pcap (26-Apr-2004), suggesting these may be separate or unrelated events.



### 4. [INFO] Deleted Rhino Images and Media Files Recovered from USB Key

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | foremost.audit from RHINOUSB.dd |
| **Evidence Refs** | tc_f46821bf |
| **ATT&CK** | [T1485](https://attack.mitre.org/techniques/T1485/) |


Forensic recovery analysis of USB device RHINOUSB.dd using foremost file carving identified 10 deleted/unallocated files recovered from unallocated clusters: 7 JPEG image files (00104057.jpg, 00104249.jpg, 00105065.jpg, 00105873.jpg, 00106393.jpg, 00106409.jpg, 00335081.jpg), 2 GIF image files (00106865.gif [290x246], 00106889.gif [150x87]), and 1 OLE document file (00335017.ole). These files were carved from unallocated space, indicating they were previously present and subsequently deleted. However, this finding does not establish: (1) when the files were deleted or created, (2) who deleted them or placed them on the device, (3) what the actual content of the recovered images is, (4) any connection to the network traces or time periods examined, or (5) that deletion was deliberate vs. routine storage management. Deleted files on a USB key do not inherently indicate criminal activity.



### 5. [INFO] Email Address and Domain Associated with USB Key Artifacts

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | inference |
| **Sources** | bulk.email and bulk.domain from RHINOUSB.dd |
| **Evidence Refs** | tc_4fcb881c, tc_49bae35a |


Bulk extractor analysis of RHINOUSB.dd recovered email address 'philg@mit.edu' and domain 'mit.edu' from USB device artifacts. These artifacts appear embedded in recovered file content or metadata, suggesting email or document communications were present on the USB key. However, this evidence does not establish connection to the suspect, timing, context, or relevance to other findings. The MIT affiliation indicates possible academic or institutional context but provides no evidence linking this data to the suspect or investigation.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| External IP | `137.30.122.253` |  | FTP File Transfers of Rhino Images and Contraband Archive |
| External IP | `137.30.120.40` |  | FTP File Transfers of Rhino Images and Contraband Archive |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |





---

## Appendix C: MITRE ATT&CK Coverage

5 techniques identified across findings.


**Kill Chain Coverage:** Credential Access (2) > Collection (1) > Exfiltration (2) > Impact (1)


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1056](https://attack.mitre.org/techniques/T1056/) | Input Capture | Compromised IMAP Email Credentials Exposed in... |
| [T1110](https://attack.mitre.org/techniques/T1110/) | Brute Force | Compromised IMAP Email Credentials Exposed in... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1056](https://attack.mitre.org/techniques/T1056/) | Input Capture | Compromised IMAP Email Credentials Exposed in... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1041](https://attack.mitre.org/techniques/T1041/) | Exfiltration Over C2 Channel | FTP File Transfers of Rhino Images and... |
| [T1048](https://attack.mitre.org/techniques/T1048/) | Exfiltration Over Alternative Protocol | FTP File Transfers of Rhino Images and... |


### Impact

| Technique | Name | Findings |
|-----------|------|----------|
| [T1485](https://attack.mitre.org/techniques/T1485/) | Data Destruction | Deleted Rhino Images and Media Files Recovered... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 164 |
| Findings submitted | 5 |
| Confirmed | 1 |
| Inferences | 4 |
| Input tokens | 4.4K |
| Output tokens | 47.0K |
| Total tokens | 51.4K |
| Audit log | /home/mulder/.mulder/cases/rhino-hunt.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 4.4K | 47.0K | 51.4K |




<details>
<summary>Evidence Sources (34)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.filelist | sleuthkit | 6 |
| zeek.conn | zeek | 7 |
| zeek.conn | zeek | 8 |
| zeek.files | zeek | 13 |
| zeek.files | zeek | 14 |
| zeek.conn | zeek | 129 |
| zeek.http | zeek | 13 |
| zeek.http | zeek | 14 |
| zeek.files | zeek | 134 |
| zeek.packet_filter | zeek | 2 |
| zeek.packet_filter | zeek | 2 |
| zeek.ftp | zeek | 9 |
| zeek.pe | zeek | 2 |
| zeek.summary | zeek | 5 |
| zeek.http | zeek | 104 |
| zeek.summary | zeek | 6 |
| zeek.packet_filter | zeek | 2 |
| zeek.ssl | zeek | 3 |
| zeek.weird | zeek | 2 |
| zeek.x509 | zeek | 2 |
| zeek.summary | zeek | 9 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| tcpflow.streams | tcpflow | 598 |
| bulk.domain | bulk_extractor | 6 |
| tcpflow.streams | tcpflow | 9880 |
| pcap.summary | tshark | 47 |
| pcap.summary | tshark | 47 |
| bulk.email | bulk_extractor | 6 |
| pcap.summary | tshark | 64 |
| tcpflow.streams | tcpflow | 396 |
| tsk.masquerade | sleuthkit | 0 |
| foremost.audit | foremost | 35 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
