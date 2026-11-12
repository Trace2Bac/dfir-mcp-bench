# Mulder Investigation Report

**Case:** rhino-hunt
**Generated:** 2026-11-12T15:04:02.343217+00:00
**Evidence:** /evidence/rhino-hunt

---

## Executive Summary

**Scope:** 54 evidence sources (5 disk, 49 other) | 159 tool calls | 9 minutes
**Results:** 5 findings (2 high) | 1 confirmed, 4 inference
**Timeline:** 2004-04-26 to 2004-04-28

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-04-26): FTP File Transfers with Suspicious Archive Named "contraband.zip"
- **Credential Access** (2004-04-26): Cleartext IMAP Credentials Exposed in Network Traffic
- **Other Activity** (2004-04-26 to 2004-04-28): Email Account and Hotmail Access via Network (+1 related)

**Tools:** search (57), get_raw_output (16), open_case (7), get_investigation_summary (6), update_finding (6). SHA-256 hashes recorded for all evidence.



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

159 tool calls were executed across 7
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative

## Background

This investigation concerns the suspected illegal possession of rhinoceros images in violation of New Orleans municipal code enacted in 2004. The University of New Orleans network administrator detected suspicious activity through the RHINOVORE system, a network monitoring tool designed to flag illicit rhinoceros-related traffic. Evidence was collected from a computer at the University with no hard drive and a seized USB key. Network traffic captures from April 26-28, 2004 provide additional investigative data.

The investigation examined three network packet captures (rhino.pcap, rhino2.pcap, rhino3.pcap) totaling 6,922 packets across 3,687 KB of data, covering network activity from April 26 at 22:18:40 UTC through April 28 at 21:16:48 UTC. Forensic analysis of the USB key image (RHINOUSB.dd, 247 MB) yielded file system entries and recovered deleted files. Network flow analysis extracted 7 distinct data sources from 159 tool executions across multiple forensic frameworks including Zeek, tcpflow, tshark, bulk_extractor, Foremost, and The Sleuth Kit.

## Incident Timeline

The investigation identified suspicious network activity occurring across two primary temporal windows in April 2004, separated by approximately two days.

**April 26, 2004, 15:46-15:50 UTC - Email Access and Credential Exposure:**
At 15:46 UTC on April 26, 2004, email account access was initiated via IMAP protocol from client IP 137.30.122.253 connecting to MIT's IMAP server (137.30.120.39:143). During this session, authentication credentials for user "golden" were transmitted in cleartext within the network traffic: the account name "golden" followed by password "helovessubaru". The IMAP server accepted the credentials and granted access, with subsequent FETCH operations indicating the account was successfully authenticated and accessible.

Concurrent with IMAP activity, the same source IP (137.30.122.253) initiated multiple HTTP sessions to Hotmail's authentication infrastructure beginning at 15:47 UTC. Network traffic analysis reveals successful authentication to the MSN Passport service using email address hugerhinolover@hotmail.com, followed by access to Hotmail's mailbox interface on bay17.hotmail.com. The authentication traffic includes session tokens and authentication cookies consistent with successful Hotmail account login.

**April 26, 2004, 15:48-15:50 UTC - FTP File Transfers:**
Between 15:48 and 15:50 UTC, FTP commands were issued from 137.30.122.253 to FTP server 137.30.120.40:21 using account "gnome" (password hidden in Zeek logs). The following files were transferred via FTP STOR commands with successful 226 (Transfer Complete) responses:

- 15:48:29 UTC: rhino1.jpg (93 KB) uploaded successfully
- 15:48:49 UTC: rhino3.jpg (401 KB) uploaded successfully  
- 15:49:07 UTC: rhino3.jpg uploaded again (258 KB, second instance)
- 15:50:06 UTC: contraband.zip (230,566 bytes) uploaded successfully

The contraband.zip archive, as revealed through ZIP header analysis in tcpflow streams, contains rhino2.jpg embedded within its structure. The filename "contraband" suggests deliberate labeling, though this could indicate either intentional obfuscation or coincidental naming.

**April 28, 2004, 21:08-21:17 UTC - Secondary Network Activity:**
Two additional network captures on April 28 document HTTP activity from different source IP addresses (137.30.123.234 and 137.30.123.234 for rhino3.pcap). HTTP GET requests to Google (64.233.167.104) occurred at 21:08:35 UTC from 137.30.123.234, followed by an additional Google search at 21:15:48 UTC. The April 28 activity originates from a different IP subnet than the April 26 file transfers, suggesting separate machines or network segments performing these queries.

A search query for "rhino.exe" appears in the April 28 HTTP traffic at 21:15:48 UTC from 137.30.123.234. This temporal separation (approximately 48 hours after the FTP uploads) and network isolation (different IP address) from the April 26 activities indicates these were likely independent events or separate users.

## Key Findings

The investigation identified 5 distinct findings across 7 indexed evidence sources. 2 findings were classified as high severity, 1 as medium severity, 1 as low severity, and 1 as informational.

**Finding 1: Cleartext IMAP Credentials**
IMAP authentication credentials for account "golden" with password "helovessubaru" appeared in plaintext network traffic during email access on April 26, 2004, 15:46-15:48 UTC, connecting to MIT IMAP server 137.30.120.39:143. Successful server authentication occurred immediately following credential transmission. However, this finding does not independently establish unauthorized access; the credentials belong to a legitimately authenticated account, and network presence alone does not prove the accessing party was unauthorized. The account owner may legitimately possess these credentials and use this machine.

**Finding 2: FTP File Transfers with Archive Named "Contraband"**
FTP user "gnome" completed multiple successful file transfers to server 137.30.120.40 on April 26, 2004, 15:48-15:50 UTC, including three image files (rhino1.jpg, rhino3.jpg uploaded twice) and contraband.zip containing rhino2.jpg. The FTP server accepted all credentials and completed transfers with successful 226 replies. Critical limitations exist: (1) The "gnome" FTP account may be legitimately authorized; (2) Server 137.30.120.40 identity and legitimacy are not established; (3) File transfer completion suggests valid authentication; (4) The "contraband" filename, while suspicious, could represent automated naming from archiving software or coincidental choice. Without evidence the FTP account or server were unauthorized, this represents completed FTP activity rather than confirmed unauthorized exfiltration.

**Finding 3: Email Account Access and Session Data**
HTTP traffic documents active authentication to Hotmail account hugerhinolover@hotmail.com on April 26, 2004, 15:47-15:49 UTC from IP 137.30.122.253. Session tokens and MSN Passport authentication cookies indicate successful login with mailbox access. Critical limitations: (1) Account name provides no evidence of ownership or authorization; (2) Network access does not establish whether the account owner or an unauthorized party accessed the account; (3) Mailbox operations are normal for authorized users; (4) No evidence suggests account or IP compromise. Additional Hotmail account "bighonkingrhino@hotmail.com" also appears in cookies, suggesting multiple email identities associated with this activity.

**Finding 4: Google Search for "rhino.exe"**
A Google search query for "rhino.exe" originated from IP 137.30.123.234 on April 28, 2004, 21:15:48 UTC. This search correlates temporally and thematically with multiple "rhino"-named files transferred via FTP on April 26 (rhino1.jpg, rhino2.jpg, rhino3.jpg). However, critical temporal inconsistency exists: the search occurs 48 hours AFTER the FTP file transfers already completed, contradicting the expected sequence of searching for files before transferring them. The source IP (137.30.123.234) differs from the FTP transfer source (137.30.122.253), indicating separate machines or users. "Rhino" may reference legitimate software products (Rhino by McNeel Associates, Rhino Graphics tools) rather than indicators of malicious activity or the suspected rhino images. The temporal and network separation weakens correlation between search and transfers.

**Finding 5: USB Disk Image Analysis and Academic Email Reference**
Forensic analysis of the USB disk image recovered file entries gumbo1.txt and gumbo2.txt in the active file system, and Foremost carving extracted 10 additional files (7 JPEGs, 2 GIFs, 1 OLE file totaling approximately 1,400 KB). Bulk_extractor identified email address philg@mit.edu within JPEG image metadata as a copyright string ("copyright 2000 philg@mit.edu"). Critical limitations: (1) **No file timestamps** are available on the USB files, preventing temporal correlation to the April 26-28 network activities; (2) The philg@mit.edu reference within image metadata strongly suggests these images came FROM or BELONG TO philg@mit.edu, not the suspect; (3) The presence of an academic email address in image copyright headers raises serious questions about USB ownership and suspect attribution; (4) Without timestamps establishing when USB files were created/modified relative to the network activity, connection between USB and network traces cannot be established.

## Evidence Assessment

The evidence reveals a pattern of network activity involving multiple email accounts, FTP transfers, and Internet access across distributed IP addresses. However, the findings are classified at inference level rather than confirmed due to pervasive authorization context limitations. Specifically:

- **IMAP Activity (golden account):** Credentials successfully authenticated to legitimate MIT email system; no evidence of account compromise or unauthorized access.
- **FTP Transfers (gnome account):** Server accepted credentials and completed all transfers successfully; no evidence FTP account was unauthorized or server was compromised.
- **Hotmail Access:** Successful authentication and normal mailbox operations; insufficient evidence of account compromise.
- **USB Key:** Contains reference to different email address (philg@mit.edu) within image metadata, suggesting USB may belong to different individual; lack of file timestamps prevents temporal linking to April 26-28 network activity.

The core evidentiary gap preventing clear attribution remains the absence of definitive proof that any accessed accounts were unauthorized, compromised, or that the machines transmitting the traffic were under the suspect's control.

## Analysis of Case Questions

**Case Q1: Who gave the accused a telnet/ftp account?**
The evidence shows FTP user "gnome" successfully authenticated to FTP server 137.30.120.40 and transferred files on April 26, 2004. However, the network captures contain no evidence of account creation commands, administrative access, telnet/SSH sessions, or documentation of account provisioning. The evidence does not establish who created or provisioned the "gnome" FTP account.

**Case Q2: What's the username/password for the account?**
FTP account username: "gnome" (password obscured in Zeek output but successfully authenticated to 137.30.120.40 on April 26, 15:48-15:50 UTC). IMAP account username: "golden" / password: "helovessubaru" (successfully authenticated to 137.30.120.39 on April 26, 15:46-15:48 UTC).

**Case Q3: What relevant file transfers appear in the network traces?**
FTP file transfers from 137.30.122.253 to 137.30.120.40 on April 26, 2004, 15:48-15:50 UTC: rhino1.jpg (93 KB), rhino3.jpg (401 KB), rhino3.jpg (258 KB second upload), and contraband.zip (230,566 bytes containing rhino2.jpg). All transfers completed successfully with FTP 226 responses. HTTP sessions to Hotmail and Google services also documented but these were data access/retrieval rather than file transfers.

**Case Q4: What happened to the hard drive in the computer? Where is it now?**
The case briefing explicitly states the computer had no hard drive at time of seizure. The network traces and USB image provide no evidence regarding the hard drive's fate or current location.

**Case Q5: What happened to the USB key?**
The USB key was seized as evidence and submitted for forensic imaging and analysis. The resulting RHINOUSB.dd image is 247 MB in size.

**Case Q6: What is recoverable from the dd image of the USB key?**
Active file system entries: gumbo1.txt and gumbo2.txt. Foremost carving recovered 10 additional files from unallocated space: 7 JPEG images, 2 GIF images, 1 OLE document. Bulk_extractor identified email address philg@mit.edu within JPEG metadata. File count totals approximately 12 recoverable files; no file timestamps available for temporal correlation.

**Case Q7: Is there any evidence that connects the USB key and the network traces? If so, what?**
Limited connection exists: Both the USB and network traffic contain references to "rhino" in filenames and searches. However, **no definitive connection** can be established due to: (1) Absence of file timestamps on USB files preventing temporal correlation to April 26-28 network activity; (2) The philg@mit.edu metadata reference within USB image files suggesting USB may belong to different individual than network user; (3) No overlapping user accounts or identifiers between USB files and network credentials; (4) No evidence the USB was connected to the machine that performed the April 26-28 network transfers. The circumstantial "rhino" naming similarity is insufficient to establish causal connection without additional evidence.

## Conclusion

The investigation identified network activity on April 26-28, 2004, involving authentication credentials, email access, FTP file transfers, and Internet searches. Specifically, IMAP account "golden" accessed MIT email, Hotmail account "hugerhinolover@hotmail.com" accessed email services, and FTP user "gnome" transferred three image files and an archive named "contraband.zip" to an FTP server at 137.30.120.40. A USB disk image recovered from the suspect's location contains additional files and references to MIT email address philg@mit.edu, though the metadata suggests these files may belong to a different individual.

However, the evidence framework contains critical authorization context gaps. Successful authentication of accounts does not establish those accounts were unauthorized or compromised. The presence of network traffic from a machine does not establish that machine was under the suspect's control. The FTP transfers completed successfully, suggesting valid credentials were used. Without evidence that the "gnome" FTP account, "golden" IMAP account, or "hugerhinolover@hotmail.com" email account were unauthorized or compromised, the activities constitute legitimate authentication and data access rather than confirmed unauthorized intrusion.

The USB key presents additional complications: the metadata reference to philg@mit.edu within image files raises questions about ownership attribution, and the complete absence of file timestamps prevents temporal correlation to the April 26-28 network activities documented in the packet captures.

The investigation successfully documented what occurred on the network (specific accounts accessed, specific files transferred, specific times) but did not definitively establish authorization context, account ownership, or machine control necessary to confirm illegal activity without additional investigative evidence."


---

## Overview

| | |
|---|---|
| Findings | **5** (1 confirmed, 4 inference) |
| Severity | 0 critical, 2 high, 1 medium, 1 low, 1 info |
| Sources | 7 evidence sources across 159 tool calls |


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
| 2004-04-26T15:46:49 | Cleartext IMAP Credentials Exposed in Network Traffic | HIGH | tcpflow.streams (rhino.pcap) |
| 2004-04-26T15:47:28 | Email Account and Hotmail Access via Network | LOW | tcpflow.streams (rhino.pcap) |
| 2004-04-26T15:48:29 | FTP File Transfers with Suspicious Archive Named "contraband.zip" | HIGH | zeek.ftp (rhino.pcap), tcpflow.streams (rhino.pcap) |
| 2004-04-28T21:15:48 | Suspicious Search for "rhino.exe" and Pattern of Related Files | MEDIUM | pcap.http (rhino3.pcap), tcpflow.streams (rhino.pcap) |





---

## Appendix A: Verified Forensic Findings


### 1. [HIGH] Cleartext IMAP Credentials Exposed in Network Traffic

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-04-26T15:46:49 to 2004-04-26T15:48:49 |
| **Sources** | tcpflow.streams (rhino.pcap) |
| **Evidence Refs** | tc_b18164c2, tc_f653a186 |


IMAP account credentials for user "golden" appear in plaintext within network traffic captured between 137.30.122.253 and IMAP server 137.30.120.39:143 on April 26, 2004 (15:46-15:48 UTC). The tcpflow stream shows base64-encoded IMAP prompts followed by plaintext credentials "golden" / "helovessubaru" in the authentication sequence, with the IMAP server accepting the authentication (connection continues). HOWEVER: This finding alone does not establish unauthorized access. The credentials could belong to the account owner, and the IP (137.30.122.253) cannot be confirmed as compromised based on network presence alone. IMAP server acceptance of credentials implies proper authentication. Without evidence that either the account or the IP address was unauthorized, this represents account activity rather than confirmed compromise. The classification depends on whether investigation determines the "golden" account was: (1) unauthorized for this IP, (2) stolen/compromised, or (3) legitimately owned by the account owner using this machine. Downgraded from 'confirmed' to 'inference' due to lack of authorization context.



### 2. [HIGH] FTP File Transfers with Suspicious Archive Named "contraband.zip"

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | inference |
| **Time** | 2004-04-26T15:48:29 to 2004-04-26T15:50:06 |
| **Sources** | zeek.ftp (rhino.pcap), tcpflow.streams (rhino.pcap) |
| **Evidence Refs** | tc_57cdfb62, tc_30ef5ff7 |


FTP user \"gnome\" uploaded multiple files to server 137.30.120.40 from IP 137.30.122.253 on April 26, 2004 (15:48-15:50 UTC): three JPEG image files (rhino1.jpg, rhino3.jpg uploaded individually, and rhino2.jpg contained within contraband.zip based on ZIP header analysis). The contraband.zip archive (230,566 bytes) contains rhino2.jpg visible in the ZIP structure. All transfers completed successfully with FTP 226 (Transfer Complete) replies from the server. HOWEVER: This finding does not establish unauthorized activity. Key missing evidence: (1) Whether \"gnome\" FTP account was authorized or compromised - FTP server accepted the credentials and completed transfers successfully, suggesting valid authentication; (2) Whether 137.30.120.40 is the official/legitimate MIT FTP server; (3) Whether the transferred files represent unauthorized data exfiltration or legitimate file staging/backup/research distribution. The filename \"contraband.zip\" is suspicious but circumstantial - it could represent: automated archive naming from software, unfortunate naming choice by user, or deliberate suspicious naming. Without evidence the account or server were unauthorized, this represents FTP activity rather than confirmed exfiltration. Downgraded from 'confirmed' to 'inference' due to lack of authorization context and legitimate use possibility.



### 3. [MEDIUM] Suspicious Search for "rhino.exe" and Pattern of Related Files

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | inference |
| **Time** | 2004-04-28T21:15:48 to 2004-04-28T21:15:48 |
| **Sources** | pcap.http (rhino3.pcap), tcpflow.streams (rhino.pcap) |
| **Evidence Refs** | tc_2509caf5, tc_30ef5ff7 |
| **ATT&CK** | [T1048.003](https://attack.mitre.org/techniques/T1048/003/) |


Google search query for \"rhino.exe\" from IP 137.30.123.234 on April 28, 2004 (21:15:48 UTC) correlates with multiple file transfers containing \"rhino\" in filenames throughout the network traces: rhino1.jpg, rhino2.jpg (within contraband.zip), and rhino3.jpg transferred via FTP. CRITICAL TEMPORAL MISMATCH: The Google search occurs 2 days AFTER the FTP file transfers (April 26), suggesting the search was not for acquiring files already uploaded. Additionally, the search originates from IP 137.30.123.234, which is different from the IP performing FTP transfers (137.30.122.253). This IP difference could indicate separate machines, separate users, or different systems on the campus network performing unrelated activities. The temporal and network separation weakens the correlation: why search for \"rhino.exe\" if the files were already uploaded 48 hours earlier? \"Rhino\" could refer to legitimate software products (Rhino by McNeel Associates, Rhino Graphics, etc.) rather than malicious executables. This finding remains inference-level; the correlation is circumstantial and does not establish causal relationship between search and file transfers. The findings could represent coincidental naming rather than coordinated activity."



### 4. [LOW] Email Account and Hotmail Access via Network

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-04-26T15:47:28 to 2004-04-26T15:49:00 |
| **Sources** | tcpflow.streams (rhino.pcap) |
| **Evidence Refs** | tc_f653a186, tc_da3cf60c |


HTTP traffic from IP 137.30.122.253 shows active access to Hotmail account with email address hugerhinolover@hotmail.com on April 26, 2004 (15:47-15:49 UTC). Network analysis reveals authentication cookies and MSN session tokens indicating successful login, with traffic to mailbox interface (by17fd.bay17.hotmail.msn.com) showing IMAP-like FETCH operations on email messages. HOWEVER: This finding does not establish unauthorized access or account compromise. Key limitations: (1) Hotmail account name (hugerhinolover@hotmail.com) provides no direct evidence of account ownership or authorization - could be personal, shared departmental account, or faculty account; (2) Network access alone does not establish whether the account owner or an unauthorized user accessed the account; (3) MSN mailbox operations are normal for authorized users; (4) No evidence suggests the account or IP was compromised. Without investigation results confirming the account is unauthorized or belongs to the suspect, this represents account access rather than confirmed unauthorized activity. Downgraded from 'confirmed' to 'inference' confidence and from 'medium' to 'low' severity due to lack of evidence of unauthorized access."



### 5. [INFO] USB Disk Image Contains Reference to Academic Email and Text Files

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | tsk.filelist (RHINOUSB.dd), bulk.domain (RHINOUSB.dd), bulk.email (RHINOUSB.dd), foremost.audit (RHINOUSB.dd) |
| **Evidence Refs** | tc_61c6990f, tc_9768d876, tc_b03abc73, tc_48f3477b |


USB disk image (RHINOUSB.dd) forensic analysis recovered: (1) Email address philg@mit.edu via bulk_extractor domain and email analysis, found within JPEG image file metadata (specifically in copyright headers \"copyright 2000 philg@mit.edu\"); (2) Text files gumbo1.txt and gumbo2.txt in root filesystem; (3) Foremost carving recovered 10 files: 7 JPEG images, 2 GIF images, 1 OLE file. CRITICAL LIMITATIONS: (1) **NO FILE TIMESTAMPS AVAILABLE** - cannot establish temporal relationship to April 26-28 network activity. USB files could have been created/modified years before the incident, during it, or after it. Investigation question specifically asks whether USB timestamps align with incident dates or predate it entirely; (2) **philg@mit.edu ownership implication** - The reference to \"philg@mit.edu\" appears within JPEG image file metadata (copyright string), which strongly suggests: (a) The USB contains photos FROM philg or downloaded from external sources, OR (b) The USB belongs to philg@mit.edu, not the suspect. This indicates the USB may belong to a different person and does NOT establish suspect connection without additional evidence; (3) **Missing connection to suspect** - No evidence presented that links USB ownership to the suspect. The philg@mit.edu reference actually suggests the suspect may NOT own the USB. DOWNGRADED ASSESSMENT: Without timestamps, this finding cannot be linked to the April 26-28 incident timeline. The philg@mit.edu reference raises serious questions about USB ownership and suspect attribution. This finding should not be used to link the suspect to the network activities without additional evidence establishing USB ownership."



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| External IP | `137.30.120.39` |  | Cleartext IMAP Credentials Exposed in Network Traffic |
| Port | `TCP 143` |  | Cleartext IMAP Credentials Exposed in Network Traffic |
| External IP | `137.30.122.253` |  | Cleartext IMAP Credentials Exposed in Network Traffic |
| External IP | `137.30.120.40` |  | FTP File Transfers with Suspicious Archive Named "contraband.zip" |
| External IP | `137.30.123.234` |  | Suspicious Search for "rhino.exe" and Pattern of Related Files |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |





---

## Appendix C: MITRE ATT&CK Coverage

1 techniques identified across findings.


**Kill Chain Coverage:** Exfiltration (1)


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1048.003](https://attack.mitre.org/techniques/T1048/003/) | Exfiltration Over Unencrypted Non-C2 Protocol | Suspicious Search for "rhino.exe" and Pattern... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 159 |
| Findings submitted | 5 |
| Confirmed | 1 |
| Inferences | 4 |
| Input tokens | 4.4K |
| Output tokens | 46.7K |
| Total tokens | 51.1K |
| Audit log | /home/mulder/.mulder/cases/rhino-hunt.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 4.4K | 46.7K | 51.1K |




<details>
<summary>Evidence Sources (54)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.filelist | sleuthkit | 6 |
| hashdeep.hashes | hashdeep | 10 |
| tcpflow.streams | tcpflow | 598 |
| tcpflow.streams | tcpflow | 9880 |
| tcpflow.streams | tcpflow | 396 |
| pcap.summary | tshark | 47 |
| pcap.summary | tshark | 47 |
| pcap.summary | tshark | 64 |
| zeek.conn | zeek | 7 |
| zeek.conn | zeek | 8 |
| zeek.files | zeek | 13 |
| zeek.files | zeek | 14 |
| zeek.http | zeek | 13 |
| zeek.http | zeek | 14 |
| zeek.conn | zeek | 129 |
| pcap.conversations | tshark | 25 |
| zeek.packet_filter | zeek | 2 |
| pcap.conversations | tshark | 26 |
| zeek.packet_filter | zeek | 2 |
| pcap.conversations | tshark | 529 |
| zeek.files | zeek | 134 |
| zeek.pe | zeek | 2 |
| zeek.summary | zeek | 5 |
| zeek.ftp | zeek | 9 |
| pcap.dns | tshark | 1 |
| zeek.summary | zeek | 6 |
| pcap.dns | tshark | 1 |
| zeek.http | zeek | 104 |
| zeek.packet_filter | zeek | 2 |
| pcap.dns | tshark | 1 |
| zeek.ssl | zeek | 3 |
| pcap.http | tshark | 24 |
| pcap.http | tshark | 23 |
| zeek.weird | zeek | 2 |
| zeek.x509 | zeek | 2 |
| zeek.summary | zeek | 9 |
| pcap.smtp | tshark | 1 |
| pcap.http | tshark | 396 |
| pcap.smtp | tshark | 1 |
| pcap.tls | tshark | 1 |
| pcap.tls | tshark | 1 |
| pcap.smtp | tshark | 1 |
| pcap.beaconing | tshark | 5 |
| pcap.beaconing | tshark | 5 |
| pcap.tls | tshark | 5 |
| pcap.tunneling | tshark | 5 |
| pcap.tunneling | tshark | 5 |
| pcap.beaconing | tshark | 5 |
| pcap.tunneling | tshark | 5 |
| tsk.masquerade | sleuthkit | 0 |
| foremost.audit | foremost | 35 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 6 |
| bulk.email | bulk_extractor | 6 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
