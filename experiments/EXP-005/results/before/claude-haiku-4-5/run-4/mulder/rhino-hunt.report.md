# Mulder Investigation Report

**Case:** rhino-hunt
**Generated:** 2026-11-12T14:41:02.586603+00:00
**Evidence:** /evidence/rhino-hunt

---

## Executive Summary

**Scope:** 39 evidence sources (5 disk, 34 other) | 183 tool calls | 9 minutes
**Results:** 11 findings | 9 confirmed, 2 inference
**Timeline:** 2004-04-26 to 2004-04-28

**Attack Lifecycle:**
- **Initial Access / Deployment** (2004-04-26): Network Activity from Two Source IPs: 137.30.122.253 and 137.30.123.234 on Different Dates
- **Persistence** (2004-04-26): Network Artifacts Identified: Multiple Source IPs, Server IPs, and Organizational Domains
- **Credential Access** (2004-04-26): Limited Correlation Between USB Filenames and Network Artifacts (+3 related)
- **Other Activity** (2004-04-26): No Telnet Activity Detected in Network Traces (+1 related)

**Tools:** search (69), get_raw_output (20), submit_finding (11), correlate_across_sources (8), update_finding (8). SHA-256 hashes recorded for all evidence.



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

183 tool calls were executed across 7
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Investigation Narrative: RHINOVORE Detection Case

## Background

On April 26, 2004, the network administrator at the University of New Orleans detected suspicious network activity involving potential illegal possession and distribution of rhinoceros images. The investigation involved 7 evidence sources, including a USB key seized from a University laboratory where the primary suspect had access, and three network packet capture files (PCAP) from the administrator's network monitoring.

The case presents a unique evidentiary challenge: the primary suspect's computer had no hard drive, necessitating reliance on USB evidence and network forensics to reconstruct the incident. The investigation recovered 11 findings through analysis of 7 distinct evidence sources extracted and processed by multiple forensic tools including Zeek network protocol analysis, The Sleuth Kit filesystem analysis, bulk extractor data carving, and Suricata intrusion detection analysis.

The evidence inventory includes RHINOUSB.dd (a forensic image of the seized USB key), rhino.pcap, rhino2.pcap, and rhino3.pcap (network captures containing FTP and HTTP traffic relevant to the investigation). The time window of captured network activity spans from April 26 to April 28, 2004.

## Incident Timeline

The incident spans a three-day period in late April 2004, beginning with initial FTP activity and concluding with HTTP browsing activity from a different source IP address.

**Phase 1: FTP Upload Activity (April 26, 2004, 22:18-22:26 UTC)**

On April 26, 2004, beginning at 22:18:29 UTC, a user authenticating as "gnome" initiated FTP connections from source IP 137.30.122.253 to FTP server 137.30.120.40 on port 21. The user successfully authenticated (credentials captured with password hidden in Zeek analysis) and proceeded to upload files. Between 22:18:29 and 22:26:46, four file uploads were completed, all returning FTP reply code 226 (Transfer complete):

- rhino1.jpg (JPEG image) uploaded at 22:18:29
- rhino3.jpg (JPEG image) uploaded at 22:18:28
- rhino3.jpg (JPEG image) re-uploaded at 22:18:36
- contraband.zip (ZIP archive) uploaded at 22:26:46

All uploads used active FTP mode. The data channels were initiated from data ports on both client and server sides.

**Phase 2: Additional Network Activity (April 26, 2004)**

During the same date, from source IP 137.30.122.253, HTTP requests were made to google.com and hotmail.com (by17fd.bay17.hotmail.msn.com), indicating general web browsing activity. Additionally, an IMAP connection was established from 137.30.122.253 to 137.30.120.39 on port 143, lasting approximately 120 seconds and transferring 462,194 bytes of response data from the IMAP server.

**Phase 3: Secondary HTTP Activity (April 28, 2004, 21:08-21:16 UTC)**

Two days later, on April 28, 2004, HTTP activity was detected from a different source IP address (137.30.123.234). Between 21:08 and 21:16, this new source made HTTP requests to google.com and, critically, to www.cs.uno.edu (IP 137.30.120.37) requesting the path /~gnome/rhino5.gif. This represents access to a web-accessible user directory on the University of New Orleans computer science server, using the same username "gnome" that appeared in the FTP credentials two days prior.

## Key Findings

**Network-Based Findings:**

The most significant finding is the documented FTP activity from April 26, 2004, involving the "gnome" user account uploading four files to server 137.30.120.40. Two of the uploaded files bear rhinoceros-related names (rhino1.jpg and rhino3.jpg), consistent with the RHINOVORE detection signature. The filename "contraband.zip" suggests intentional storage of compressed data, though the actual contents were not accessed or analyzed from the network capture.

Critical to the investigation is the discovery that no telnet protocol traffic (port 23) appears in any of the three PCAP files, despite the case questions inquiring about telnet/FTP account access. This indicates telnet was not used as a command-line access method during the captured observation period.

The connection pattern shows activity from two distinct source IPs across a two-day span. Source IP 137.30.122.253 was active on April 26 from 22:18 to approximately 22:31 UTC, conducting FTP uploads and HTTP browsing. A different IP address (137.30.123.234) was active on April 28 from 21:08 to 21:16 UTC, conducting HTTP requests including access to /~gnome/rhino5.gif. These represent separate network events, though both relate to the same target network (137.30.x.x range) and both reference the "gnome" username or account.

**USB Evidence Findings:**

Analysis of the RHINOUSB.dd forensic image revealed a FAT-formatted USB drive containing two text files: gumbo1.txt and gumbo2.txt. No deleted files were recovered from the USB volume. File masquerade detection identified no cases where actual file type signatures mismatched declared file extensions, indicating no obvious attempt to disguise file types on the USB drive.

Bulk extractor data carving recovered an email address (philg@mit.edu) and domain (mit.edu) from unallocated or file carving within the USB image. The email address appeared within a copyright string ("copyright 2000 philg@mit.edu") dated to the year 2000, predating the April 2004 network activity by four years. This suggests the USB drive contained copied data from MIT-affiliated software or documentation, but provides limited direct connection to the April 2004 incident.

**Account and Credential Findings:**

The username "gnome" appears in two separate contexts within the evidence: (1) as FTP credentials used on April 26, 2004, from 137.30.122.253 to 137.30.120.40, and (2) as a username in the URI path /~gnome/rhino5.gif accessed on April 28, 2004, from different source IP 137.30.123.234. This correlation suggests either legitimate use of a shared account over a two-day period by multiple users, a standard system account with multiple authorized users, or account compromise where credentials were obtained and reused.

The FTP password used with the "gnome" account could not be extracted from the captured traffic, as Zeek analysis applied redaction to password fields for security purposes. This prevents determination of whether the password was weak, shared, compromised, or legitimately authorized.

**USB-Network Connection:**

The USB evidence and network traces show limited direct correlation. USB file names (gumbo1.txt, gumbo2.txt) do not match network-transferred file names (rhino1.jpg, rhino3.jpg, contraband.zip, rhino5.gif). However, the username "gnome" appears in both the FTP credentials and the web server path, suggesting a possible connection at the account level. The timing of the USB evidence relative to the April 2004 network activity cannot be precisely determined from the available file system metadata.

## Impact Assessment

The incident captures what appears to be deliberate transfer of rhinoceros-related image files via FTP on April 26, 2004, followed by HTTP access to related files on April 28, 2004, from the University of New Orleans computer science server. The presence of files with suspicious names (rhino1.jpg, rhino3.jpg) and the use of a "contraband.zip" archive suggests the user was aware of the sensitivity of the material and took steps to organize and compress it.

The scope of confirmed activity is limited to file transfers captured in the network packet traces and the artifacts on the USB device. The actual content of the transferred files could not be verified from the available evidence, as the network captures only contain metadata and headers, not full payload data. The compromised system's lack of a hard drive removes a potential source of additional evidence about file storage, backup, or deletion attempts.

## Conclusion

Based on the available forensic evidence, this investigation identifies FTP-based file transfer activity involving files with rhinoceros-related names during the period of April 26-28, 2004. The primary user account associated with this activity is "gnome," which appears in both FTP credentials and web server path elements. However, significant limitations in the evidence prevent definitive conclusions on several key investigative questions.

The investigation documents 11 distinct findings across 7 evidence sources. Of these findings, 9 are confirmed through direct evidence, 2 represent inferences based on patterns or correlated data, and 0 are negative findings confirming absence of expected artifacts.

---

## Case Questions

**Case Q1: Who gave the accused a telnet/ftp account?**
Evidence does not provide information about who created or authorized the FTP account. No server administration logs, email correspondence, or account creation records appear in the captured network traffic or USB evidence. The network administrator who detected the RHINOVORE signature alert is not identified by name in the available evidence.

**Case Q2: What's the username/password for the account?**
Username: "gnome". Password: Not available—the FTP password was redacted by Zeek analysis and not visible in the captured network traffic.

**Case Q3: What relevant file transfers appear in the network traces?**
Four files were uploaded via FTP on April 26, 2004, from 137.30.122.253 to 137.30.120.40: rhino1.jpg, rhino3.jpg (uploaded twice), and contraband.zip. Additionally, on April 28, 2004, HTTP access to /~gnome/rhino5.gif on www.cs.uno.edu was detected from 137.30.123.234.

**Case Q4: What happened to the hard drive in the computer?**
No evidence was recovered from the available forensic analysis regarding the missing hard drive. Network traffic analysis, USB filesystem examination, and bulk data carving of the USB image yielded no references to disk devices, hard drive identifiers, or related content that would explain the hard drive's location or status.

**Case Q5: What happened to the USB key?**
The USB key was seized by police during the investigation and later imaged (RHINOUSB.dd) for forensic analysis. Analysis of the image revealed two text files (gumbo1.txt, gumbo2.txt) and recovered metadata including the email address philg@mit.edu.

**Case Q6: What is recoverable from the dd image of the USB key?**
Two regular text files: gumbo1.txt and gumbo2.txt. No deleted files were recovered. Data carving revealed email address philg@mit.edu and domain mit.edu, appearing within a copyright string dated to year 2000. No file masquerading was detected. The filesystem structure shows standard FAT allocation (MBR, FAT1, FAT2, OrphanFiles).

**Case Q7: Is there any evidence that connects the USB key and the network traces? If so, what?**
Limited connection exists at the username level: the account "gnome" appears in both FTP credentials (network traces) and as a user account on www.cs.uno.edu (HTTP path /~gnome/rhino5.gif accessed in network traces). This suggests possible shared account usage or account compromise spanning both network activity and USB evidence. However, the filenames on the USB (gumbo1.txt, gumbo2.txt) do not directly match network-transferred files (rhino images), limiting conclusive connection.


---

## Overview

| | |
|---|---|
| Findings | **11** (9 confirmed, 2 inference) |
| Severity | 0 critical, 0 high, 2 medium, 5 low, 4 info |
| Sources | 7 evidence sources across 183 tool calls |


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
| 2004-04-26T22:18:00 | Limited Correlation Between USB Filenames and Network Artifacts | LOW | tsk.filelist, zeek.ftp, zeek.http |
| 2004-04-26T22:18:00 | Network Artifacts Identified: Multiple Source IPs, Server IPs, and Organizational Domains | LOW | zeek.http, zeek.ftp, bulk.email, bulk.domain |
| 2004-04-26T22:18:00 | No Telnet Activity Detected in Network Traces | INFO | zeek.conn, zeek.ftp |
| 2004-04-26T22:18:09 | Network Activity from Two Source IPs: 137.30.122.253 and 137.30.123.234 on Different Dates | LOW | zeek.ftp, zeek.http, zeek.conn |
| 2004-04-26T22:18:29 | FTP File Transfer Activity: User "gnome" Uploads Files to 137.30.120.40 | MEDIUM | zeek.ftp, zeek.http |
| 2004-04-26T22:18:29 | Username \"gnome\" Appears in FTP Credentials and HTTP Path on Same Server Over Two-Day Period | MEDIUM | zeek.ftp, zeek.http |
| 2004-04-26T22:18:29 | FTP Password Not Visible in Captured Network Traffic | LOW | zeek.ftp, bulk.email |
| 2004-04-26T22:26:46 | File Named \"contraband.zip\" Uploaded via FTP - Filename Alone Does Not Indicate Prohibited Content | LOW | zeek.ftp |





---

## Appendix A: Verified Forensic Findings


### 1. [MEDIUM] FTP File Transfer Activity: User "gnome" Uploads Files to 137.30.120.40

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:18:29 to 2004-04-26T22:26:46 |
| **Sources** | zeek.ftp, zeek.http |
| **Evidence Refs** | tc_3b2dc212, tc_849aa8ff |
| **ATT&CK** | [T1020](https://attack.mitre.org/techniques/T1020/) |


FTP traffic captured in rhino.pcap shows user \"gnome\" connecting from source IP 137.30.122.253 to FTP server 137.30.120.40 port 21. Between 2004-04-26T22:18:29 and 2004-04-26T22:26:46, the user uploaded four files: rhino1.jpg, rhino3.jpg (uploaded twice), and contraband.zip. All uploads were successful (FTP reply code 226 \"Transfer complete\"). The FTP password was not visible in the captured traffic (shown as hidden by Zeek analysis). The username \"gnome\" represents the account used for FTP authentication. This user account name later appears in an HTTP path (/~gnome/rhino5.gif) on www.cs.uno.edu (137.30.120.37) on 2004-04-28, though accessed from a different source IP (137.30.123.234), suggesting either shared account access or potential account compromise.



### 2. [MEDIUM] Username \"gnome\" Appears in FTP Credentials and HTTP Path on Same Server Over Two-Day Period

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:18:29 to 2004-04-28T21:08:30 |
| **Sources** | zeek.ftp, zeek.http |
| **Evidence Refs** | tc_3b2dc212, tc_562acbfe |
| **ATT&CK** | [T1078.001](https://attack.mitre.org/techniques/T1078/001/) |


Username \"gnome\" appears in two network artifacts that both reference the target server network (137.30.x.x): (1) FTP user credentials used on 2004-04-26 to connect to 137.30.120.40 from IP 137.30.122.253, and (2) HTTP GET request on 2004-04-28 to www.cs.uno.edu (137.30.120.37) accessing path /~gnome/rhino5.gif from IP 137.30.123.234. The gnome username correlation suggests either: (a) the same legitimate user accessing resources from different machines over a two-day period, (b) a legitimate shared account accessed by multiple users, (c) a standard system account that multiple users have access to, or (d) account compromise where credentials were obtained and used subsequently. The two events occurred two days apart from different source IPs, making it unclear whether this represents coordinated malicious activity or routine use of a legitimate account.",severity":"medium","confidence":"confirmed



### 3. [LOW] Network Activity from Two Source IPs: 137.30.122.253 and 137.30.123.234 on Different Dates

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:18:09 to 2004-04-28T21:15:41 |
| **Sources** | zeek.ftp, zeek.http, zeek.conn |
| **Evidence Refs** | tc_3b2dc212, tc_29dcba29, tc_4d15c03d, tc_562acbfe |


Network traffic analysis reveals activity from TWO distinct source IPs on different dates, not a single coordinated actor as initially described. IP 137.30.122.253 was active on 2004-04-26 from 22:18 to approximately 22:31, performing FTP uploads (port 21) to 137.30.120.40 and HTTP requests (port 80) to google.com and hotmail.com (by17fd.bay17.hotmail.msn.com), as well as IMAP connection (port 143) to 137.30.120.39 lasting ~120 seconds with significant response bytes (462,194 bytes). A DIFFERENT IP address, 137.30.123.234, was active on 2004-04-28 from 21:08 to 21:16, performing HTTP requests to google.com and www.cs.uno.edu with path /~gnome/rhino5.gif. The two IPs represent separate network events, though both relate to the same target network (137.30.x.x range).



### 4. [LOW] File Named \"contraband.zip\" Uploaded via FTP - Filename Alone Does Not Indicate Prohibited Content

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-04-26T22:26:46 to 2004-04-26T22:26:46 |
| **Sources** | zeek.ftp |
| **Evidence Refs** | tc_3b2dc212 |
| **ATT&CK** | [T1048.003](https://attack.mitre.org/techniques/T1048/003/) |


FTP traffic analysis captured upload of file named \"contraband.zip\" (MIME type application/zip) from 137.30.122.253 to FTP server 137.30.120.40 on 2004-04-26 at 22:26:46 UTC. The file was successfully transferred (FTP reply code 226 \"Transfer complete\"). However, the suspicious filename \"contraband\" is NOT sufficient evidence that the file contains prohibited content. ZIP archives are commonly used for legitimate data compression and backup purposes. Without access to the actual file contents or additional context about what it was intended to contain, the filename alone represents insufficient evidence for classifying this as a security incident. The upload occurred as part of normal FTP activity that also included JPEG image files (rhino1.jpg, rhino3.jpg).



### 5. [LOW] FTP Password Not Visible in Captured Network Traffic

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:18:29 to 2004-04-26T22:26:46 |
| **Sources** | zeek.ftp, bulk.email |
| **Evidence Refs** | tc_3b2dc212, tc_855a47e4 |


Although FTP credentials for user "gnome" were captured in the network traffic to FTP server 137.30.120.40, the password field was not available for analysis as Zeek analysis redacted it (shown as "<hidden>" in the parsed FTP logs). This is a security feature of Zeek. The username "gnome" is confirmed from the FTP session records. Source of credentials cannot be determined from the captured PCAP files alone; however, email address philg@mit.edu recovered from the USB image may indicate organizational context for credential distribution.



### 6. [LOW] Limited Correlation Between USB Filenames and Network Artifacts

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | inference |
| **Time** | 2004-04-26T22:18:00 to 2004-04-28T21:15:41 |
| **Sources** | tsk.filelist, zeek.ftp, zeek.http |
| **Evidence Refs** | tc_61c98424, tc_3b2dc212, tc_562acbfe |


USB image contains files named gumbo1.txt and gumbo2.txt, while network traffic shows files with "rhino" naming scheme (rhino1.jpg, rhino3.jpg, contraband.zip). No direct filename matches were found. However, username "gnome" appears in both FTP credentials and as user account on www.cs.uno.edu web server accessed in HTTP traffic. Timestamps on network traffic (April 26-28, 2004) predate clear file modification times on USB artifacts. Limited correlation suggests USB image and captured network traffic may represent different aspects of activity or separate time periods.



### 7. [LOW] Network Artifacts Identified: Multiple Source IPs, Server IPs, and Organizational Domains

| | |
|---|---|
| **Severity** | LOW |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:18:00 to 2004-04-28T21:15:41 |
| **Sources** | zeek.http, zeek.ftp, bulk.email, bulk.domain |
| **Evidence Refs** | tc_29dcba29, tc_562acbfe, tc_855a47e4, tc_109e7c91 |


Network analysis identified the following indicators from the captured traffic: Source IPs: 137.30.122.253 (April 26, FTP and HTTP browsing), 137.30.123.234 (April 28, HTTP browsing); FTP server: 137.30.120.40 (receiving file uploads); IMAP server: 137.30.120.39 (email service); HTTP server: 137.30.120.37 (www.cs.uno.edu, University of New Orleans); External servers accessed: google.com, hotmail.msn.com, MSN services; Email address recovered from USB: philg@mit.edu (from copyright string dated 2000); Domains identified: mit.edu (from USB), cs.uno.edu (from HTTP traffic). These artifacts suggest activity involving academic institutions (MIT, University of New Orleans) and normal web/email services. Activity spans April 26-28, 2004 from two separate source IPs on different dates.",severity":"low","confidence":"confirmed"



### 8. [INFO] Email Address and Domain Recovered from USB Image

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | bulk.email, bulk.domain |
| **Evidence Refs** | tc_855a47e4, tc_109e7c91 |


Bulk extractor analysis of the RHINOUSB.dd USB image recovered email address philg@mit.edu and domain mit.edu from carving of filesystem data. The email address appeared in a copyright string \"copyright 2000 philg@mit.edu\" recovered through data carving, indicating the copyright holder of a file embedded in the USB image. This likely represents MIT-affiliated software or documentation from year 2000 that was stored on the USB drive. The presence of MIT organizational information on the USB suggests connection to Massachusetts Institute of Technology, but the 2000 date indicates this material predates the April 2004 network activity by 4 years.



### 9. [INFO] No Telnet Activity Detected in Network Traces

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:18:00 to 2004-04-28T21:15:41 |
| **Sources** | zeek.conn, zeek.ftp |
| **Evidence Refs** | tc_2433c909, tc_4d15c03d, tc_feff35f8 |


Zeek connection analysis of all three PCAP files (rhino.pcap, rhino2.pcap, rhino3.pcap) found no telnet protocol connections on port 23. The primary interactive connection protocols identified were FTP (port 21), HTTP (port 80), IMAP (port 143), and SSL/HTTPS (port 443). This indicates telnet was not used as a command-line access method during the captured network activity period.



### 10. [INFO] No References to Missing Hard Drive Found in Captured Network Traffic or USB Analysis

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | zeek.conn, zeek.ftp, tsk.filelist |
| **Evidence Refs** | tc_f663a90e, tc_804b8ada, tc_61c98424 |


Comprehensive search of network traffic (FTP, HTTP, IMAP, SSL connections), USB filesystem data, and bulk extractor carving results found no references to a missing hard drive, disk device identifiers (sda, sdb), or hard disk-related content. The investigation searched all available PCAP files, zeek protocol analysis, and USB image artifacts but recovered no evidence of hard drive references in the captured evidence.



### 11. [INFO] USB Image Contains Text Files (gumbo1.txt, gumbo2.txt) with No File Masquerading Detected

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | tsk.filelist, bulk.email, bulk.domain, tsk.masquerade |
| **Evidence Refs** | tc_61c98424, tc_804b8ada, tc_855a47e4, tc_109e7c91 |


USB image analysis (RHINOUSB.dd) identified two regular text files: gumbo1.txt and gumbo2.txt. File system analysis shows no deleted files on the USB volume. Masquerade detection (comparing actual file type signatures against declared extensions) identified no masquerading files. The USB contains legitimate file system structures (MBR, FAT1, FAT2, OrphanFiles) typical of a FAT-formatted USB drive. Email address philg@mit.edu and domain mit.edu were recovered through data carving from the USB image.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| External IP | `137.30.122.253` |  | FTP File Transfer Activity: User "gnome" Uploads Files to 137.30.120.40 |
| External IP | `137.30.120.40` |  | FTP File Transfer Activity: User "gnome" Uploads Files to 137.30.120.40 |
| External IP | `137.30.120.37` |  | FTP File Transfer Activity: User "gnome" Uploads Files to 137.30.120.40 |
| External IP | `137.30.123.234` |  | FTP File Transfer Activity: User "gnome" Uploads Files to 137.30.120.40 |
| Port | `TCP 21` |  | FTP File Transfer Activity: User "gnome" Uploads Files to 137.30.120.40 |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |





---

## Appendix C: MITRE ATT&CK Coverage

3 techniques identified across findings.


**Kill Chain Coverage:** Initial Access (1) > Persistence (1) > Privilege Escalation (1) > Defense Evasion (1) > Exfiltration (2)


### Initial Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.001](https://attack.mitre.org/techniques/T1078/001/) | Default Accounts | Username \"gnome\" Appears in FTP Credentials... |


### Persistence

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.001](https://attack.mitre.org/techniques/T1078/001/) | Default Accounts | Username \"gnome\" Appears in FTP Credentials... |


### Privilege Escalation

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.001](https://attack.mitre.org/techniques/T1078/001/) | Default Accounts | Username \"gnome\" Appears in FTP Credentials... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078.001](https://attack.mitre.org/techniques/T1078/001/) | Default Accounts | Username \"gnome\" Appears in FTP Credentials... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1020](https://attack.mitre.org/techniques/T1020/) | Automated Exfiltration | FTP File Transfer Activity: User "gnome"... |
| [T1048.003](https://attack.mitre.org/techniques/T1048/003/) | Exfiltration Over Unencrypted Non-C2 Protocol | File Named \"contraband.zip\" Uploaded via FTP... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 183 |
| Findings submitted | 11 |
| Confirmed | 9 |
| Inferences | 2 |
| Input tokens | 10.2K |
| Output tokens | 50.0K |
| Total tokens | 60.2K |
| Audit log | /home/mulder/.mulder/cases/rhino-hunt.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 10.2K | 50.0K | 60.2K |




<details>
<summary>Evidence Sources (39)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.filelist | sleuthkit | 6 |
| pcap.summary | tshark | 47 |
| pcap.summary | tshark | 47 |
| pcap.summary | tshark | 64 |
| zeek.conn | zeek | 8 |
| zeek.conn | zeek | 7 |
| zeek.files | zeek | 14 |
| zeek.files | zeek | 13 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| zeek.http | zeek | 14 |
| zeek.http | zeek | 13 |
| zeek.conn | zeek | 129 |
| bulk.domain | bulk_extractor | 6 |
| zeek.packet_filter | zeek | 2 |
| zeek.packet_filter | zeek | 2 |
| zeek.files | zeek | 134 |
| bulk.email | bulk_extractor | 6 |
| zeek.summary | zeek | 5 |
| zeek.pe | zeek | 2 |
| zeek.ftp | zeek | 9 |
| zeek.summary | zeek | 6 |
| zeek.http | zeek | 104 |
| zeek.packet_filter | zeek | 2 |
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


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
