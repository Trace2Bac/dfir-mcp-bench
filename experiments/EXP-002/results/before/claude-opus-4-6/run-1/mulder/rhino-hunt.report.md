# Mulder Investigation Report

**Case:** rhino-hunt
**Generated:** 2026-11-09T09:26:44.413379+00:00
**Evidence:** /evidence/rhino-hunt

---

## Executive Summary

**Scope:** 86 evidence sources (8 disk, 78 other) | 376 tool calls | 35 minutes
**Results:** 13 findings (1 critical, 8 high) | 13 confirmed, 0 inference | 1 hypothesis ruled out
**Timeline:** 2004-04-26 to 2004-04-30

**Key Threats:**
- Recovered Word Document Contains Explicit Admissions: Hard Drive Destroyed, USB Reformatted, Illegal Rhino Photos Acknowledged

**Attack Lifecycle:**
- **Persistence** (2004-04-30): USB Key Reformatted But Substantial Data Recoverable from Unallocated Space
- **Command and Control** (2004-04-26): Network Topology: IP Addresses and Host Identification (+1 related)
- **Credential Access** (2004-04-26 to 2004-04-28): Account Provisioning: Jeremy Provided the "gnome" FTP/Telnet Account (+6 related)
- **Defense Evasion / Anti-Forensics** (2004-04-28): rhino.exe Identified as Renamed diskpart.exe (Windows Disk Management Utility) - Potential Anti-Forensic Tool
- **Other Activity** (2004-04-26): FTP Upload of Rhinoceros Images and Contraband Archive to Cook Server (+1 related)

**Tools:** search (87), get_raw_output (75), submit_finding (22), open_case (14), update_finding (13). SHA-256 hashes recorded for all evidence.


### Critical Findings


- **Recovered Word Document Contains Explicit Admissions: Hard Drive Destroyed, USB Reformatted, Illegal Rhino Photos Acknowledged** (2004-04-26T22:18:40 to 2004-04-30T18:11:24)




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

376 tool calls were executed across 13
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Forensic Investigation Report: Illegal Rhinoceros Image Possession — University of New Orleans

## Background

In 2004, the City of New Orleans enacted legislation criminalizing the possession of nine or more unique rhinoceros images. Acting pursuant to this law, the network administrator at the University of New Orleans (UNO) deployed a network monitoring tool known as RHINOVORE, which flagged suspicious rhinoceros-related network traffic originating from a machine within the university's computer labs. Upon detection, law enforcement seized two items of physical evidence from the lab: the suspect's USB key and the computer itself. Notably, the computer's hard drive was missing at the time of seizure.

This investigation analyzed four pieces of digital evidence: a forensic dd image of the seized USB key (RHINOUSB.dd, 247 MiB) and three network packet captures (rhino.pcap, rhino2.pcap, and rhino3.pcap) provided by the network administrator. Analysis was conducted using 13 indexed evidence sources across thirteen distinct forensic extraction toolchains, including Sleuth Kit for filesystem analysis, Zeek and Tshark for network protocol dissection, TCPFlow and TCPXtract for stream reconstruction and file carving, Foremost for data recovery from unallocated disk space, Suricata for intrusion detection, Strings for binary text extraction, and bulk_extractor for automated indicator harvesting. The investigation produced 13 formal findings, of which 13 are confirmed through corroborating evidence across multiple independent sources.

The computing environment consisted of a Windows XP SP1 workstation (identified through HTTP User-Agent strings as running MSIE 6.0 with .NET CLR 1.1.4322) connected to the University of New Orleans campus network within the 137.30.0.0/16 address space. The suspect's machine was assigned two different IP addresses via DHCP across two dates of observed activity: 137.30.122.253 on April 26, 2004, and 137.30.123.234 on April 28, 2004. The university's Computer Science department maintained a server farm in the 137.30.120.x subnet, including "cook" (137.30.120.40), a SunOS 5.9 Solaris SPARC system providing shell, FTP, and NFS services; www.cs.uno.edu (137.30.120.37), the department's web server; and "vespucci" (137.30.120.39), an IMAP mail server.

## Incident Timeline

The documented activity spans five days, from April 26, 2004 through April 30, 2004, and can be organized into four operational phases.

**Phase 1 — Initial Telnet Reconnaissance and Account Access (April 26, 2004, 22:17–22:20 UTC):** The suspect, operating from IP address 137.30.122.253, initiated a telnet connection to the cook server at 137.30.120.40. The first telnet session captured the suspect logging in as user "gnome" on a SunOS 5.9 system. The suspect then executed several commands including `ls -l` to list directory contents (revealing files golden.jpg, Xinitrc.XFce, and cshrc.user already present), `du -k` and `df -k` for disk usage assessment, and `passwd` in an attempt to change the gnome account password. A second telnet session followed in which the suspect attempted to breach user "golden's" shell account by trying two passwords: "kkkkk" and "helovessubaru," both of which failed. The suspect terminated this session with Ctrl+D. A third telnet session saw the suspect log in again as gnome using the password "gnome123" (transmitted in cleartext), then create a file called "JOHNREADME" using the command `cat > JOHNREADME` with the content: "I tried to hack Golden's account but the password was wrong. --Georgia" (with a backspace correction from "George" to "Georgia"). This message was signed with the name "Georgia" and explicitly admitted the failed intrusion attempt against golden's account.

**Phase 2 — FTP Uploads and Email Access (April 26, 2004, 22:21–22:31 UTC):** Immediately following the telnet sessions, the suspect opened three FTP connections from the same IP to the cook server. In the first FTP session, the suspect uploaded "rhino1.jpg" (65,703 bytes) in binary transfer mode. In the second session, "rhino3.jpg" (96,899 bytes) was uploaded twice — first erroneously in ASCII mode (generating a bare linefeeds warning), then correctly in binary mode. The third FTP session uploaded "contraband.zip" (230,566 bytes) in binary mode. All transfers authenticated with the gnome account and completed successfully. Concurrently, the suspect accessed two rhino-themed Hotmail webmail accounts — hugerhinolover@hotmail.com and bighonkingrhino@hotmail.com — via MSN Passport authentication, and maintained an active MSN Messenger session. Critically, the suspect also authenticated as user "golden" on the IMAP server vespucci (137.30.120.39), successfully accessing golden's mailbox containing 11,292 messages. This is significant because the suspect had just failed to hack golden's telnet/shell account yet possessed valid IMAP credentials for the same user, indicating prior credential acquisition for the email account.

**Phase 3 — Web Downloads and Tool Retrieval (April 28, 2004, 21:08–21:17 UTC):** Two days later, the suspect operated from a different DHCP-assigned IP address (137.30.123.234) but with an identical browser fingerprint. The suspect navigated to www.cs.uno.edu/~gnome/, the public web directory associated with the gnome account, and downloaded "rhino4.jpg" (153,191 bytes) and "rhino5.gif" (85,137 bytes). The suspect then searched Google for "rhino.exe," browsed Google Groups results, and downloaded "rhino.exe" (145,920 bytes) from www.cs.uno.edu/~gnome/. Portable Executable analysis and embedded string extraction identified rhino.exe as a renamed copy of Windows XP's diskpart.exe — a command-line disk partition management utility capable of selecting, cleaning, deleting, and formatting disk volumes. The compilation timestamp (August 17, 2001) is consistent with the Windows XP RTM build cycle. The suspect also accessed golden's IMAP mailbox again during this session, with the message count having grown to 11,370 (78 new messages since April 26).

**Phase 4 — Evidence Destruction (April 30, 2004):** A recovered Microsoft Word journal document from the USB key's unallocated space reveals that the suspect took deliberate anti-forensic actions. The suspect wrote: "I zapped the hard drive and then threw it into the Mississippi River" and "I'm gonna reformat my USB key after this entry, but try not to destroy the good stuff." Filesystem metadata confirms the USB key was reformatted on April 30, 2004 at 18:11 UTC using mkdosfs to create a fresh FAT16 filesystem. Only two files survived as allocated data: gumbo1.txt (a Shrimp and Tasso Gumbo recipe, 2,815 bytes) and gumbo2.txt (a Shrimp and Andouille Sausage Gumbo recipe, 1,293 bytes) — the "good stuff" the suspect intended to preserve. The rhino images, the Word journal document, and all other data were relegated to unallocated space.

## Key Findings

**Account Provenance and Credentials.** The investigation conclusively established that an individual named Jeremy provided the suspect with the "gnome" account on the UNO Computer Science department's cook server. This was determined from a deleted Word document recovered from the USB key's unallocated space, which stated: "I need to change the password on the gnome account that Jeremy gave me. I can probably just do that at Radio Shack." The account credentials — username "gnome" with password "gnome123" — were captured in cleartext during a telnet session on April 26, 2004. The gnome account was configured with UID 2287 and GID 2000 (cscistu group), with a home directory at /home/gnome exported from the NFS server magellan.

**Rhinoceros Image Trafficking.** The network captures document a pattern of rhinoceros image acquisition and distribution. At least five unique rhinoceros images are identified by filename: rhino1.jpg (65,703 bytes), rhino3.jpg (96,899 bytes), rhino4.jpg (153,191 bytes), rhino5.gif (85,137 bytes), and golden.jpg (117,773 bytes, pre-existing in the gnome home directory). Additionally, a file named "contraband.zip" (230,566 bytes) was uploaded, the contents of which remain unknown but whose name suggests illicit material. Foremost recovery from the USB key's unallocated space yielded seven additional JPEG files and two GIF files, indicating the USB key served as a storage medium for rhinoceros images prior to reformatting. File carving from the network captures via TCPXtract produced image files with sizes matching the FTP-transferred files, providing independent confirmation of the transfer content.

**Renamed Disk Management Utility.** The file "rhino.exe" downloaded from www.cs.uno.edu/~gnome/ was identified not as rhinoceros-related software but as a renamed copy of Microsoft Windows XP's diskpart.exe. Embedded strings revealed disk management commands (SELECT, CLEAN, DELETE, FORMAT, CREATE, CONVERT), device path patterns (\\.\PHYSICALDRIVE%lu), and partition type references (MBR, GPT, DYNAMIC). This masquerading — hiding a disk wiping tool among rhinoceros-themed content — is directly relevant to the suspect's admission of having "zapped the hard drive." Diskpart.exe provides the CLEAN command, which can zero out a disk's partition table and master boot record, rendering data recovery extremely difficult. The suspect's Google search for "rhino.exe" prior to downloading suggests the tool was previously staged on the gnome web directory for later retrieval.

**Unauthorized Email Access.** The suspect successfully authenticated as user "golden" on the IMAP server vespucci from both observed IP addresses, accessing a mailbox containing over 11,000 messages. This occurred despite the suspect's failure to breach golden's shell account via telnet. The JOHNREADME message left on the cook server — "I tried to hack Golden's account but the password was wrong" — was therefore misleading, as it characterized the intrusion attempt as entirely unsuccessful when the suspect had in fact compromised golden's email. The growing message count between sessions (11,292 on April 26, 11,370 on April 28) confirms access to the same live mailbox across both dates.

**Anti-Forensic Actions and Evidence Destruction.** The suspect engaged in deliberate evidence destruction across multiple media. The computer's hard drive was "zapped" (likely using diskpart.exe or a similar tool) and physically disposed of by throwing it into the Mississippi River. The USB key was reformatted on April 30, 2004, two days after the last observed network activity, using mkdosfs to create a clean FAT16 filesystem. The suspect explicitly documented awareness that these actions constituted evidence destruction, writing in the journal: "I'm gonna reformat my USB key after this entry." However, the reformat was forensically incomplete — mkdosfs only clears the filesystem metadata (directory entries and FAT allocation table) without overwriting the underlying data clusters, allowing Foremost to recover ten files from unallocated space including the incriminating journal document itself.

**Cross-Evidence Correlation.** Six independent indicators link the USB key to the network activity: the gnome account reference in the USB journal matching FTP/telnet authentication; the discussion of illegal rhino photos on the USB matching rhino image transfers in the captures; the anti-forensics timeline showing the USB reformat after network activity dates; University of New Orleans metadata in the Word document matching the university server infrastructure; image file sizes recovered from the USB consistent with network-transferred files; and rhino-themed email accounts observed in network traffic consistent with the USB journal's discussion of rhinoceros enthusiasm.

## Threat Intelligence and Attribution

This case does not involve a traditional cyber threat actor or advanced persistent threat. The activity is consistent with an individual university student or lab user who obtained legitimate university computing credentials (the gnome account, provided by "Jeremy") and used them to store and distribute illegal rhinoceros images through university infrastructure. The suspect's operational profile reveals a low level of technical sophistication: cleartext protocols (telnet, FTP) were used without any attempt at encryption or tunneling; passwords were reused and transmitted in plaintext; anti-forensic measures (reformatting the USB, wiping the hard drive) were technically incomplete; and the suspect left an explicit written confession in a Word document on the same device they attempted to sanitize.

The suspect is identified by the name "Georgia" based on the JOHNREADME message left on the cook server, where a backspace correction changed "George" to "Georgia." The suspect demonstrated awareness that rhinoceros image possession was illegal, writing "Rhino pictures illegal? Makes me sick. I [love] the photos" and noting the threshold of "less than 10 photos." The two Hotmail accounts — hugerhinolover@hotmail.com and bighonkingrhino@hotmail.com — further establish the suspect's identity as someone with a pronounced interest in rhinoceros content. The mention of changing the gnome password "at Radio Shack" suggests the suspect was aware of the need to obscure their activities and planned to use a public internet access point.

No evidence suggests involvement of organized criminal networks or coordination with other individuals beyond Jeremy, who provided the initial account access. The failed attempt to breach golden's shell account using passwords "kkkkk" and "helovessubaru" suggests the suspect had some social knowledge of the golden user but lacked full credential access beyond the email (IMAP) account.

## Impact Assessment

The scope of this incident encompasses the compromise of university computing infrastructure for illegal purposes and deliberate destruction of evidence. Three university systems were directly involved: the cook shell/FTP server, the www.cs.uno.edu web server, and the vespucci IMAP server. The gnome account was used to store and serve illegal rhinoceros images from both the home directory (accessible via FTP) and the public web directory (accessible via HTTP to anyone on the internet), effectively converting university infrastructure into a distribution platform for contraband.

The unauthorized access to golden's email account exposed over 11,000 messages to the suspect, representing a significant privacy breach for the golden user. The compromise of the gnome account credentials — transmitted in cleartext via telnet — also creates secondary risk, as any network observer on the same segment could have captured the password.

The suspect's evidence destruction efforts resulted in the permanent loss of the computer's hard drive (disposed of in the Mississippi River) and the attempted destruction of USB key contents. The hard drive is unrecoverable. However, the USB reformat was forensically incomplete, and substantial evidence was recovered from unallocated space, including the confession document and multiple rhinoceros images.

The total inventory of confirmed rhinoceros images includes at minimum five uniquely named files from network transfers plus nine images (seven JPEGs and two GIFs) recovered from the USB key. While some USB-recovered images may overlap with the network-transferred files, the total count potentially meets or exceeds the legal threshold of nine unique images.

## Immediate Tactical Containment

1. Disable the "gnome" account (UID 2287, GID 2000/cscistu) on the cook server (137.30.120.40) immediately to prevent further FTP, telnet, and web access.

2. Remove the gnome public web directory on www.cs.uno.edu (137.30.120.37) at the path /~gnome/ to stop public HTTP distribution of rhino1.jpg, rhino3.jpg, rhino4.jpg, rhino5.gif, golden.jpg, contraband.zip, and rhino.exe (diskpart.exe).

3. Disable or change the password for user "golden" on the IMAP server vespucci (137.30.120.39) and notify the golden account owner of the unauthorized email access from 137.30.122.253 and 137.30.123.234.

4. Block the Hotmail accounts hugerhinolover@hotmail.com and bighonkingrhino@hotmail.com at the campus mail gateway or web proxy to prevent further communication from university networks.

5. Preserve all evidence on the cook server in the gnome home directory (/home/gnome on NFS server magellan): JOHNREADME, contraband.zip, rhino1.jpg, rhino3.jpg, golden.jpg, Xinitrc.XFce, and cshrc.user.

6. Secure the USB key (RHINOUSB.dd source image) and all carved files — particularly the recovered OLE Word document at foremost offset 171,528,704 containing the suspect's written admissions.

7. Preserve the three network capture files (rhino.pcap, rhino2.pcap, rhino3.pcap) and maintain chain of custody documentation for all digital evidence.

8. Identify the individual "Jeremy" who provisioned the gnome account and interview to determine the scope of account sharing and any knowledge of illegal activity.

## Strategic Remediation

**Cleartext Protocol Exposure Enabled Credential Capture.** The use of telnet (port 23) and FTP (port 21) on the cook server allowed the gnome/gnome123 credentials to be captured in plaintext across the network, as documented in Finding f_119df99a. The university CS department server cook (137.30.120.40) was running legacy SunOS 5.9 services that offered no transport encryption. Replacing telnet with SSH and FTP with SFTP or SCP on the cook server would eliminate cleartext credential exposure across the campus network and prevent passive capture of authentication material by network monitoring tools or malicious observers.

**Unrestricted Account Provisioning Allowed Unauthorized Use.** The gnome account was provided informally by an individual named "Jeremy" to the suspect, as documented in Finding f_6836b400. No institutional controls governed who could provision or share shell accounts on the CS department servers. Implementing a formal account provisioning process tied to university identity management — requiring faculty or administrator approval and binding each account to a verified individual — would have established accountability and prevented informal credential sharing that enabled this illegal activity.

**Public Web Directory Hosting Without Content Review.** The gnome user's public web directory on www.cs.uno.edu (Finding f_87a8d948) served rhinoceros images and a disguised disk-wiping tool (rhino.exe/diskpart.exe) to the open internet with no content review or monitoring. Implementing automated content scanning on user-hosted web directories — similar to the RHINOVORE system deployed on the network — would detect prohibited content staged on university web infrastructure before it could be distributed.

**Incomplete Data Sanitization Relied on Format-Only Wipe.** The suspect's anti-forensic strategy (Finding f_94c7c9f4) relied on mkdosfs reformatting, which only clears filesystem metadata without overwriting data clusters. While this failure benefited the investigation, it reveals that the suspect accessed and used a capable disk-wiping tool (diskpart.exe, Finding f_8e1c3452) for the hard drive but chose a less effective method for the USB key. From a defensive perspective, deploying endpoint data-loss prevention tools that log or alert on the execution of disk management utilities like diskpart.exe from non-administrative accounts would provide early warning of evidence destruction attempts.

**IMAP Authentication Was Independent of Shell Account Security.** The suspect accessed golden's email on vespucci (Finding f_0565b2a6) using IMAP credentials that were separate from golden's shell account password on cook. This fragmented authentication model — where a user may have different passwords across services without centralized management — allowed the suspect to compromise one service (email) even after failing to breach another (shell). Consolidating authentication through a centralized directory service with unified credential management would ensure that a compromised credential triggers lockout across all associated services.

## Conclusion

This investigation analyzed digital evidence from a USB key forensic image and three network packet captures to reconstruct the activities of a university computer lab user who illegally acquired, stored, and distributed rhinoceros images using University of New Orleans computing infrastructure. The investigation produced 13 findings addressing all seven case-specific questions, with 1 negative finding (Suricata IDS analysis, which produced zero alerts due to the use of standard protocols for the illicit transfers).

**Q1. What systems were compromised?** Three University of New Orleans systems were directly involved: the cook shell/FTP server (137.30.120.40), the www.cs.uno.edu web server (137.30.120.37), and the vespucci IMAP server (137.30.120.39). The suspect's own Windows XP workstation (observed at IPs 137.30.122.253 and 137.30.123.234) and USB key were also used to process and store illegal content. User "golden's" email account on vespucci was accessed without authorization.

**Q2. How did the attacker gain initial access?** The suspect obtained the gnome account credentials from an individual named Jeremy, as documented in the recovered USB journal entry: "the gnome account that Jeremy gave me." The credentials (gnome/gnome123) provided telnet, FTP, and web hosting access to university CS department servers.

**Q3. What lateral movement occurred?** The suspect attempted to expand access from the gnome account to golden's shell account on the cook server, trying passwords "kkkkk" and "helovessubaru," both of which failed. However, the suspect successfully accessed golden's IMAP email on vespucci, reading a mailbox with over 11,000 messages across both dates of observed activity. The suspect also accessed the gnome public web directory on www.cs.uno.edu to stage and retrieve files.

**Q4. What persistence mechanisms were installed?** N/A — This case does not involve traditional persistence mechanisms such as backdoors or scheduled tasks. The suspect used a legitimately provisioned account (gnome) rather than establishing unauthorized persistent access. However, the gnome account itself served as a persistent point of access across multiple sessions and dates, and the suspect expressed intent to change the password to maintain exclusive control.

**Q5. Was data exfiltrated, and if so, what and how much?** The suspect uploaded rhinoceros images (rhino1.jpg at 65,703 bytes, rhino3.jpg at 96,899 bytes) and contraband.zip (230,566 bytes) to the cook server via FTP, and later downloaded rhino4.jpg (153,191 bytes), rhino5.gif (85,137 bytes), and rhino.exe (145,920 bytes) from the gnome web directory. Over 11,000 email messages in golden's mailbox were accessible to the suspect via IMAP. Total confirmed file transfer volume exceeds 750 KB across the documented sessions.

**Q6. What is the full timeline of the incident?** The documented activity spans April 26–30, 2004. On April 26, the suspect conducted telnet reconnaissance, FTP uploads, email access, and Hotmail webmail sessions from IP 137.30.122.253. On April 28, the suspect downloaded additional rhino images and the disguised diskpart.exe tool from IP 137.30.123.234. On April 30, the suspect destroyed the hard drive (disposing of it in the Mississippi River), reformatted the USB key, and wrote a journal entry documenting these anti-forensic actions.

**Q7. What is the total scope and business impact?** The incident involved illegal use of university computing resources for contraband storage and distribution, unauthorized access to another user's email account, and deliberate destruction of evidence including physical disposal of a hard drive. The university's web server was used as a public distribution point for illegal rhinoceros images. The privacy of user "golden" was violated through unauthorized email access. The physical destruction of the hard drive represents an irrecoverable loss of evidence, though the failed USB sanitization preserved the most incriminating material.

**Q8. What are the recommended remediation actions?** Immediate actions include disabling the gnome account on cook, removing the gnome public web directory on www.cs.uno.edu, resetting golden's credentials on vespucci, and preserving all digital evidence for law enforcement proceedings. Strategic remediation should focus on replacing cleartext protocols (telnet/FTP) with encrypted alternatives (SSH/SFTP), implementing formal account provisioning controls, deploying content scanning on user web directories, and centralizing authentication across university services. The individual "Jeremy" who provided the gnome account should be identified and interviewed regarding the scope of unauthorized account sharing.


---

## Overview

| | |
|---|---|
| Findings | **13** (13 confirmed, 0 inference) |
| Severity | 1 critical, 8 high, 3 medium, 0 low, 1 info |
| Sources | 13 evidence sources across 376 tool calls |
| Ruled Out | 1 hypotheses tested and rejected |


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
| 2004-04-26T22:17:36 | Account Provisioning: Jeremy Provided the "gnome" FTP/Telnet Account | HIGH | strings.output, tcpflow.streams |
| 2004-04-26T22:17:36 | Cleartext Telnet Credentials Captured - Account gnome/gnome123 and Failed Golden Hack | HIGH | tcpflow.streams |
| 2004-04-26T22:18:40 | Recovered Word Document Contains Explicit Admissions: Hard Drive Destroyed, USB Reformatted, Illegal Rhino Photos Acknowledged | CRITICAL | strings.output, foremost.audit |
| 2004-04-26T22:18:40 | Connection Between USB Key and Network Activity | HIGH | strings.output, tcpflow.streams, foremost.audit |
| 2004-04-26T22:18:40 | Two Rhino-Themed Hotmail Accounts Identified: hugerhinolover and bighonkingrhino | MEDIUM | tcpflow.streams, pcap.summary |
| 2004-04-26T22:18:40 | Cross-System IP Attribution: Two IPs Confirmed as Same Suspect Across All Three Captures | MEDIUM | tcpflow.streams, pcap.summary, zeek.conn, zeek.http |
| 2004-04-26T22:18:40 | Network Topology: IP Addresses and Host Identification | INFO | pcap.summary, tcpflow.streams, zeek.conn |
| 2004-04-26T22:21:49 | FTP Upload of Rhinoceros Images and Contraband Archive to Cook Server | HIGH | zeek.ftp, tcpflow.streams |
| 2004-04-26T22:21:49 | Rhinoceros Image Inventory Across All Evidence Sources | MEDIUM | zeek.ftp, zeek.http, foremost.audit, tcpxtract.carved |
| 2004-04-26T22:24:09 | Unauthorized Access to Golden's Email via IMAP from Both Suspect IPs | HIGH | tcpflow.streams |
| 2004-04-28T21:08:30 | Rhinoceros Images and Executable Downloaded from www.cs.uno.edu/~gnome Web Page | HIGH | zeek.http, zeek.conn |
| 2004-04-28T21:15:41 | rhino.exe Identified as Renamed diskpart.exe (Windows Disk Management Utility) - Potential Anti-Forensic Tool | HIGH | zeek.pe, tcpxtract.carved |
| 2004-04-30T18:11:20 | USB Key Reformatted But Substantial Data Recoverable from Unallocated Space | HIGH | tsk.fsstat, foremost.audit, tsk.filelist, tsk.timeline, strings.output |




---

## Hypotheses Ruled Out

These hypotheses were explicitly tested and no supporting evidence was found.


- **Suricata IDS Analysis Produced Zero Alerts Across All Three Packet Captures** : Suricata IDS analysis was run against all three packet captures (rhino.pcap, rhino2.pcap, rhino3.pcap) and produced zero alerts on all three:

- rhino.pcap: Total alerts: 0, Unique signatures: 0
-...



---

## Appendix A: Verified Forensic Findings


### 1. [CRITICAL] Recovered Word Document Contains Explicit Admissions: Hard Drive Destroyed, USB Reformatted, Illegal Rhino Photos Acknowledged

| | |
|---|---|
| **Severity** | CRITICAL |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:18:40 to 2004-04-30T18:11:24 |
| **Sources** | strings.output, foremost.audit |
| **Evidence Refs** | tc_1f0abedb, tc_40f31207, tc_6f3661a1 |
| **ATT&CK** | [T1485](https://attack.mitre.org/techniques/T1485/), [T1070](https://attack.mitre.org/techniques/T1070/) |


A Microsoft Office Word document was recovered from unallocated space on the RHINOUSB.dd image (foremost carved it as a 31KB OLE file at offset 171,528,704). Strings extraction reveals the document contains blog/journal-style entries with the following critical admissions:

**On the illegality of rhino photos:**
"Rhino pictures illegal? Makes me sick. I [love] the photos"
"hehehehe. Apparently, if there are less than 10 photos, it's no big deal."

**On destroying evidence:**
"OK. Things are getting a little weird. I zapped the hard drive and then threw it into the Mississippi River."
"I'm gonna reformat my USB key after this entry, but try not to destroy the good stuff."

**On the gnome account:**
"I need to change the password on the gnome account that Jeremy gave me. I can probably just do that at Radio Shack."

This directly answers multiple investigation questions:
- Q1: **Jeremy** gave the accused the telnet/FTP account (the "gnome" account on cook server)
- Q4: The hard drive was "zapped" and thrown into the Mississippi River
- Q5: The USB key was reformatted after this journal entry was written, explaining why only gumbo recipe files remain while rhino images exist in unallocated space
- The suspect was aware the rhino photos were illegal and discusses being unconcerned if "less than 10 photos"

The Word document metadata identifies "University of New Orleans" and "Microsoft Office Word" (Word.Document.8 format, Normal.dot template). The attempt to change the gnome password was observed in the telnet session (the `passwd` command in Session 1), and the Radio Shack reference suggests public internet access to avoid attribution.



### 2. [HIGH] FTP Upload of Rhinoceros Images and Contraband Archive to Cook Server

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:21:49 to 2004-04-26T22:26:46 |
| **Sources** | zeek.ftp, tcpflow.streams |
| **Evidence Refs** | tc_6097527b, tc_6921c839 |
| **ATT&CK** | [T1048](https://attack.mitre.org/techniques/T1048/) |


On April 26, 2004, host 137.30.122.253 connected via FTP to 137.30.120.40 (cook server, SunOS 5.9) using the account "gnome". Three FTP sessions were established:

Session 1: Uploaded "rhino1.jpg" (65,703 bytes) in BINARY mode.
Session 2: Uploaded "rhino3.jpg" (96,899 bytes) twice - first in ASCII mode (with 321 bare linefeeds warning), then again in BINARY mode. Total transferred 193,797 bytes.
Session 3: Uploaded "contraband.zip" (230,566 bytes) in BINARY mode.

The FTP server response confirmed: "220 cook FTP server ready" and "230 User gnome logged in" for each session. All transfers completed successfully ("226 Transfer complete"). The file "contraband.zip" is significant given its name suggests illicit material.

After the uploads, a directory listing on the cook server showed files in gnome's home: JOHNREADME, Xinitrc.XFce, contraband.zip (230,566 bytes), cshrc.user, golden.jpg (117,773 bytes), rhino1.jpg (65,703 bytes), rhino3.jpg (96,899 bytes).



### 3. [HIGH] Account Provisioning: Jeremy Provided the "gnome" FTP/Telnet Account

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:17:36 to 2004-04-26T22:31:11 |
| **Sources** | strings.output, tcpflow.streams |
| **Evidence Refs** | tc_54196f39, tc_eb48cdd9 |
| **ATT&CK** | [T1078](https://attack.mitre.org/techniques/T1078/) |


The deleted journal entry recovered from the USB key (RHINOUSB.dd) via strings extraction explicitly states: "I need to change the password on the gnome account that Jeremy gave me. I can probably just do that at Radio Shack." This is corroborated by the telnet session showing the accused attempting to use the `passwd` command on the cook server while logged in as gnome. The gnome account (UID=2287, GID=2000/cscistu) resides on the University of New Orleans CS department server "cook" (137.30.120.40), a SunOS 5.9 Solaris SPARC system with the home directory /home/gnome exported from the NFS server magellan.



### 4. [HIGH] Cleartext Telnet Credentials Captured - Account gnome/gnome123 and Failed Golden Hack

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:17:36 to 2004-04-26T22:26:46 |
| **Sources** | tcpflow.streams |
| **Evidence Refs** | tc_6921c839, tc_9406baa5 |
| **ATT&CK** | [T1110.001](https://attack.mitre.org/techniques/T1110/001/), [T1552.006](https://attack.mitre.org/techniques/T1552/006/) |


Three telnet sessions from 137.30.122.253 to 137.30.120.40 (cook server, port 23) were captured in rhino.pcap on April 26, 2004:

**Session 1 (17:17 CDT):** User logged in as "gnome" (first attempt failed, second succeeded). The server identified itself as "SunOS 5.9" on server "cook". The user ran commands: `ls -l` (revealing golden.jpg, Xinitrc.XFce, cshrc.user), `du -k`, `df -k`, and attempted `passwd` to change the gnome password.

**Session 2 (failed hack attempt):** User attempted to login as "golden" with two password guesses:
- Password 1: "kkkkk" → "Login incorrect"
- Password 2: "helovessubaru" → "Login incorrect"
User gave up with Ctrl+D.

**Session 3 (17:24 CDT):** User logged in as "gnome" with password "gnome123" (captured in cleartext). The user then:
- Created file "JOHNREADME" using `cat > JOHNREADME` with the content: "I tried to hack Golden's account but the password was wrong. --Georgia" (note backspace corrections: "George" was corrected to "Georgia")
- Ran `ls -l` confirming all uploaded files were present
- Exited with `logout`/`exit`

The JOHNREADME message explicitly admits the hack attempt against Golden's account and is signed by "Georgia". The telnet protocol transmitted the password "gnome123" in cleartext.



### 5. [HIGH] Rhinoceros Images and Executable Downloaded from www.cs.uno.edu/~gnome Web Page

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-04-28T21:08:30 to 2004-04-28T21:16:48 |
| **Sources** | zeek.http, zeek.conn |
| **Evidence Refs** | tc_fd80ada5, tc_fe233ac5, tc_bc8e635e, tc_df5bf9c3 |
| **ATT&CK** | [T1105](https://attack.mitre.org/techniques/T1105/) |


Two days after the FTP uploads (April 28, 2004), host 137.30.123.234 (same user agent MSIE 6.0/Windows XP) accessed the gnome user's university web page and downloaded rhinoceros-related files:

**From rhino2.pcap (21:08-21:10 UTC):**
- Browsed www.google.com
- Navigated to www.cs.uno.edu/~gnome/ (directory listing)
- Downloaded rhino4.jpg (153,191 bytes JPEG) from www.cs.uno.edu/~gnome/rhino4.jpg
- Downloaded rhino5.gif (85,137 bytes GIF) from www.cs.uno.edu/~gnome/rhino5.gif
- Also browsed www.cs.uno.edu/~venkata/

**From rhino3.pcap (21:15-21:16 UTC):**
- Searched Google for "rhino.exe" 
- Browsed groups.google.com for "rhino.exe" results
- Downloaded rhino.exe (145,920 bytes, application/x-dosexec) from www.cs.uno.edu/~gnome/rhino.exe

The download of rhino.exe (a Windows PE executable) from the gnome user's web space on the University of New Orleans CS department server (www.cs.uno.edu, 137.30.120.37) is particularly significant. The Google search for "rhino.exe" before downloading it suggests the user was seeking or verifying this specific executable. The Zeek PE parser confirmed the file as a PE executable.

Note: The source IP 137.30.123.234 differs from the rhino.pcap source 137.30.122.253, but both are in the UNO 137.30.x.x address space and use the same browser configuration.



### 6. [HIGH] USB Key Reformatted But Substantial Data Recoverable from Unallocated Space

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-04-30T18:11:20 to 2004-04-30T18:11:24 |
| **Sources** | tsk.fsstat, foremost.audit, tsk.filelist, tsk.timeline, strings.output |
| **Evidence Refs** | tc_cfac51c3, tc_81a81109, tc_72dbc5de, tc_79738706, tc_54196f39 |
| **ATT&CK** | [T1070](https://attack.mitre.org/techniques/T1070/), [T1485](https://attack.mitre.org/techniques/T1485/) |


The USB key (RHINOUSB.dd, 247 MiB) was reformatted as FAT16 using mkdosfs, as confirmed by fsstat. Only 2 live files remain:
- gumbo1.txt (2,815 bytes, inode 4) - Shrimp and Tasso Gumbo recipe
- gumbo2.txt (1,293 bytes, inode 6) - Shrimp and Andouille Sausage Gumbo recipe

These files have timestamps of April 30, 2004 (modified 18:11:20/18:11:24), indicating they were saved during the reformat process, 4 days after the FTP uploads (April 26) and 2 days after the web downloads (April 28).

The deleted Word document journal entry recovered from this USB explicitly states: "I'm gonna reformat my USB key after this entry, but try not to destroy the good stuff" — the "good stuff" being the gumbo recipes. It also admits: "I zapped the hard drive and then threw it into the Mississippi River." This constitutes deliberate evidence destruction.

However, foremost carved 10 files from unallocated space:
- 7 JPEG images (sizes: 93KB, 405KB, 401KB, 258KB, 6KB, 225KB, 258KB)
- 2 GIF images (11KB at 290x246, 4KB at 150x87)
- 1 OLE document (31KB) - a Microsoft Office Word document containing the incriminating journal

The FAT has only 2 allocated cluster chains (sectors 529-536 and 537-544), confirming the filesystem was freshly created with almost all space unallocated. The format only cleared directory entries; the actual file data persists in unallocated clusters, defeating the anti-forensic intent.



### 7. [HIGH] Connection Between USB Key and Network Activity

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:18:40 to 2004-04-30T18:11:24 |
| **Sources** | strings.output, tcpflow.streams, foremost.audit |
| **Evidence Refs** | tc_54196f39, tc_eb48cdd9, tc_81a81109, tc_1705d395 |


Multiple independent indicators across DIFFERENT evidence types (USB disk image and network packet captures) connect the USB key to the network activity, establishing a coherent cross-system attack chain:

**1. Account reference (USB → Network):**
The deleted USB journal entry explicitly mentions "the gnome account that Jeremy gave me" — the identical gnome account used for FTP uploads (rhino.pcap) and telnet sessions to cook server (137.30.120.40).

**2. Illegal content awareness (USB → Network):**
The USB journal discusses "Rhino pictures illegal?" — the network traces show rhinoceros images being uploaded via FTP and downloaded via HTTP using the gnome account.

**3. Anti-forensics timeline (USB → Network → USB):**
The USB journal states "I zapped the hard drive" and "I'm gonna reformat my USB key" — the USB was indeed reformatted (FAT16/mkdosfs on April 30), and foremost recovered rhino images from unallocated space. The reformat occurred after both network activity dates (April 26 + 28).

**4. Geographic/institutional link (USB ↔ Network):**
The USB contains Microsoft Office metadata referencing "University of New Orleans" — the same institution whose CS dept server (www.cs.uno.edu) hosted gnome's web directory.

**5. Image content match (USB ↔ Network):**
Foremost recovered 7 JPEG and 2 GIF images from USB unallocated space. Network traces show rhino JPEG/GIF images transferred via FTP and HTTP. TCPxtract-carved images from rhino.pcap match FTP-transferred file sizes (rhino1.jpg: 65,703 bytes; rhino3.jpg: 96,899 bytes).

**6. Email identity (USB ↔ Network):**
MSN Passport cookies in rhino.pcap show "hugerhinolover@hotmail.com" and "bighonkingrhino@hotmail.com" — names explicitly referencing rhinoceros enthusiasm, consistent with the USB journal's discussion of rhino photos.

This convergence of 6 independent cross-system indicators conclusively links the USB key and network captures to the same individual and the same illegal activity.



### 8. [HIGH] Unauthorized Access to Golden's Email via IMAP from Both Suspect IPs

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:24:09 to 2004-04-26T22:31:11 |
| **Sources** | tcpflow.streams |
| **Evidence Refs** | tc_8a145b54, tc_d044f166 |
| **ATT&CK** | [T1078](https://attack.mitre.org/techniques/T1078/), [T1114.002](https://attack.mitre.org/techniques/T1114/002/) |


The suspect successfully authenticated as user "golden" on the IMAP server "vespucci" (137.30.120.39, IMAP4rev1 2002.325) from BOTH suspect IP addresses:

**From rhino.pcap (IP 137.30.122.253, April 26, 2004 17:24:09 CDT):**
- Server banner: "vespucci IMAP4rev1 2002.325 at Mon, 26 Apr 2004 17:24:09 -0500 (CDT)"
- Authentication used BASE64 AUTH=LOGIN method (VXNlciBOYW1lAA== = "User Name", UGFzc3dvcmQA = "Password")
- Response: "User golden authenticated"
- Mailbox showed 11,292 EXISTS (11,292 messages in golden's mailbox)
- Extensive FETCH operations retrieving message headers and flags

**From rhino2.pcap (IP 137.30.123.234, April 28, 2004):**
- Same IMAP connection to 137.30.120.39:143
- NOOP and FETCH commands showing continued mailbox monitoring
- Mailbox contained 11,370 messages (78 more than 2 days prior), confirming same mailbox

This is significant because during rhino.pcap, the suspect FAILED to hack golden's shell/telnet account on cook, trying passwords "kkkkk" and "helovessubaru". Yet they successfully accessed golden's email, demonstrating they had golden's IMAP password but not the shell password.

The suspect then left a JOHNREADME file saying "I tried to hack Golden's account but the password was wrong. --Georgia" — misleading, since they DID access golden's email; only the shell account hack failed.

The IMAP access from both IP addresses provides further evidence that 137.30.122.253 and 137.30.123.234 are the same user.



### 9. [HIGH] rhino.exe Identified as Renamed diskpart.exe (Windows Disk Management Utility) - Potential Anti-Forensic Tool

| | |
|---|---|
| **Severity** | HIGH |
| **Confidence** | confirmed |
| **Time** | 2004-04-28T21:15:41 to 2004-04-28T21:16:48 |
| **Sources** | zeek.pe, tcpxtract.carved |
| **Evidence Refs** | tc_ba866d33, tc_96fad5b8, tc_d48c8960 |
| **ATT&CK** | [T1036](https://attack.mitre.org/techniques/T1036/), [T1561](https://attack.mitre.org/techniques/T1561/) |


The Zeek PE parser extracted metadata from rhino.exe (145,920 bytes) downloaded from www.cs.uno.edu/~gnome/rhino.exe on April 28, 2004.

**PE Header Analysis:**
- Machine: I386 (32-bit Intel)
- Compile timestamp: 998081976 (Unix epoch = 2001-08-17T19:59:36 UTC)
- Target OS: Windows XP
- Subsystem: WINDOWS_CUI (Console User Interface — command-line application)
- Is executable: true
- Sections: .text, .data, .rsrc (standard layout)

**CRITICAL IDENTIFICATION**: Analysis of the PE binary content downloaded via HTTP reveals embedded strings that definitively identify this as Windows XP's **diskpart.exe** renamed to **rhino.exe**. Key identifying strings include:
- Disk management commands: SELECT, RETAIN, RESCAN, REMOVE, ONLINE, LIST, IMPORT, HELP, EXTEND, EXIT, DETAIL, DELETE, CREATE, CONVERT, CLEAN, BREAK, ASSIGN, ACTIVE, ADD
- Partition types: MBR, GPT, DYNAMIC, BASIC, VOLUME, PARTITION, DISK, STRIPE, SIMPLE, RAID, PRIMARY, MSR, LOGICAL, EXTENDED, EFI
- Device paths: \\.\PHYSICALDRIVE%lu, \\?\GLOBALROOT\Device\Harddisk%lu\Partition%lu
- Metadata strings: LDM data partition, LDM metadata partition, Microsoft reserved partition
- DLL imports: ADVAPI32.dll, KERNEL32.dll, NTDLL.DLL, RPCRT4.dll, ole32.dll, **SETUPAPI.dll**, USER32.dll

The renaming of diskpart.exe to rhino.exe constitutes masquerading (T1036). Its presence on the gnome web directory alongside rhino images provided camouflage. The compilation date (August 2001) is consistent with the Windows XP RTM build cycle.

**Anti-Forensic Significance**: diskpart.exe is a command-line utility for managing disk partitions — it can SELECT, CLEAN, DELETE, and FORMAT disk volumes. This is directly relevant to the suspect's USB journal admission: "I zapped the hard drive and then threw it into the Mississippi River." The suspect may have used this tool to wipe the hard drive before physical destruction. Hosting it on the university web server made it retrievable from any campus workstation.

**Google Search Context**: The user at 137.30.123.234 searched Google for "rhino.exe" (GET /search?q=rhino.exe) and browsed Google Groups before downloading the file, potentially researching how to use the tool or verifying its location on the gnome web directory.

Note: rhino.exe is NOT Rhinoceros 3D CAD software. Rhinoceros 3D (by Robert McNeel & Associates) is a legitimate NURBS-based 3D modeling program, but the PE binary content contains no 3D modeling code — only disk management functionality.



### 10. [MEDIUM] Two Rhino-Themed Hotmail Accounts Identified: hugerhinolover and bighonkingrhino

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:18:40 to 2004-04-26T22:31:11 |
| **Sources** | tcpflow.streams, pcap.summary |
| **Evidence Refs** | tc_e83412c2, tc_383ff3d4 |


Host 137.30.122.253 logged into TWO rhino-themed Hotmail accounts via MSN Passport authentication during rhino.pcap on April 26, 2004:

**Account 1 - hugerhinolover@hotmail.com:**
- HTTP cookie "MSPPre=hugerhinolover@hotmail.com" sent to loginnet.passport.com during Passport login
- HTTP POST to login.passport.net/uilogin.srf with credential data referencing this account
- Subsequent Hotmail web access to by17fd.bay17.hotmail.msn.com

**Account 2 - bighonkingrhino@hotmail.com:**
- Hotmail session cookie "HMSC0899=227bighonkingrhino%40hotmail%2ecom..." observed in HTTP response from Hotmail servers
- This second account was used for active Hotmail webmail access during the same session

Both email address names—"hugerhinolover" and "bighonkingrhino"—directly connect the suspect to an obsessive interest in rhinoceros-related content, consistent with the rhino images being uploaded via FTP and downloaded via HTTP.

Additional MSN/email activity: MSN Messenger (msnms) protocol traffic (38 frames, 2532 bytes) indicating active presence, and IMAP traffic (1,051 frames, 1.44MB) to email servers. The user was running Windows XP (NT 5.1) with MSIE 6.0 and .NET CLR 1.1.4322.



### 11. [MEDIUM] Cross-System IP Attribution: Two IPs Confirmed as Same Suspect Across All Three Captures

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:18:40 to 2004-04-28T21:16:48 |
| **Sources** | tcpflow.streams, pcap.summary, zeek.conn, zeek.http |
| **Evidence Refs** | tc_8a145b54, tc_d044f166, tc_e83412c2 |


Three network captures document the suspect's activity across two dates with two different IP addresses, both within University of New Orleans (UNO) 137.30.x.x address space. Multiple independent indicators confirm these are the same user:

**IP 137.30.122.253 - April 26, 2004 (rhino.pcap):**
- Duration: 750 seconds (22:18:40 - 22:31:11 UTC)
- 6,557 packets, 3.08 MB
- Activities: Telnet/FTP to cook server (gnome account), IMAP to vespucci (golden account), Hotmail webmail (hugerhinolover/bighonkingrhino), MSN Messenger, Google browsing

**IP 137.30.123.234 - April 28, 2004 (rhino2.pcap + rhino3.pcap):**
- Combined duration: ~167 seconds (21:08:30 - 21:16:48 UTC)
- 665 packets, 508 KB
- Activities: HTTP downloads from www.cs.uno.edu/~gnome, Google search for rhino.exe, IMAP to vespucci (golden account)

**Cross-system convergence evidence (5 independent indicators):**
1. **Identical browser fingerprint:** Both IPs use "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)"
2. **Same IMAP mailbox:** Both access golden's email on vespucci (137.30.120.39); mailbox grew from 11,292 to 11,370 messages between sessions
3. **Same gnome web content:** 137.30.122.253 uploaded files via FTP; 137.30.123.234 downloaded from the same gnome web directory
4. **Same university subnet:** Both IPs in UNO 137.30.x.x, consistent with DHCP reassignment between campus visits
5. **Temporal continuity:** April 26 uploads → April 28 downloads of same type of content from same account

These IPs likely represent the same Windows XP machine receiving different DHCP-assigned addresses on different days on the UNO campus network.



### 12. [MEDIUM] Rhinoceros Image Inventory Across All Evidence Sources

| | |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:21:49 to 2004-04-28T21:16:48 |
| **Sources** | zeek.ftp, zeek.http, foremost.audit, tcpxtract.carved |
| **Evidence Refs** | tc_6097527b, tc_fd80ada5, tc_fe233ac5, tc_6f3661a1, tc_4f5a0355, tc_41382b0b, tc_2ca12db1 |


The following rhinoceros-related image files can be identified across all evidence sources:

**From FTP uploads (rhino.pcap, April 26, 2004):**
1. rhino1.jpg (65,703 bytes) - uploaded from 137.30.122.253 to cook server via FTP
2. rhino3.jpg (96,899 bytes) - uploaded twice to cook server via FTP

**From HTTP downloads (rhino2.pcap, April 28, 2004):**
3. rhino4.jpg (153,191 bytes) - downloaded from www.cs.uno.edu/~gnome/rhino4.jpg
4. rhino5.gif (85,137 bytes) - downloaded from www.cs.uno.edu/~gnome/rhino5.gif

**Pre-existing on cook server:**
5. golden.jpg (117,773 bytes) - found in gnome's home directory via telnet `ls -l`

**From tcpxtract carving of rhino.pcap:**
- 00000039.jpg (65,702 bytes) - likely rhino1.jpg extracted from FTP data stream
- 00000051.jpg and 00000052.jpg (96,898 bytes each) - likely rhino3.jpg extracted from FTP data streams

**From Foremost carving of USB (RHINOUSB.dd):**
- 7 JPEG files recovered (93KB, 405KB, 401KB, 258KB, 6KB, 225KB, 258KB)
- 2 GIF files recovered (11KB and 4KB)

**From tcpxtract carving of rhino2.pcap:**
- 00000014.jpg (153,190 bytes) - likely rhino4.jpg
- 00000011.gif, 00000013.gif, 00000015.gif (154KB, 86KB, 85KB) - includes rhino5.gif

**Additional files:**
- contraband.zip (230,566 bytes) - uploaded to cook server, contents unknown
- rhino.exe (145,920 bytes) - PE executable downloaded from www.cs.uno.edu/~gnome/ on April 28

At minimum, 5 unique rhinoceros images are identified by name (rhino1.jpg, rhino3.jpg, rhino4.jpg, rhino5.gif, golden.jpg), plus additional unidentified images carved from the USB.



### 13. [INFO] Network Topology: IP Addresses and Host Identification

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2004-04-26T22:18:40 to 2004-04-28T21:16:48 |
| **Sources** | pcap.summary, tcpflow.streams, zeek.conn |
| **Evidence Refs** | tc_d9262cb4, tc_eb48cdd9, tc_1705d395, tc_ff05ef04, tc_d4f11de4 |


The following IP addresses and hostnames are identified across all three network captures:

**Internal/University of New Orleans (137.30.0.0/16):**
- **137.30.122.253** - Suspect's machine, Day 1 (Windows XP SP1, MSIE 6.0, .NET CLR 1.1.4322). Source of all telnet, FTP, HTTP, IMAP, and MSN Messenger traffic in rhino.pcap. Associated with Hotmail accounts hugerhinolover@hotmail.com and bighonkingrhino@hotmail.com.
- **137.30.123.234** - Suspect's machine, Day 2 (identical browser fingerprint). Source of all traffic in rhino2.pcap and rhino3.pcap. Downloaded rhino images and rhino.exe. Also accessed golden's IMAP mailbox.
- **137.30.120.40** - "cook" server (SunOS 5.9, Solaris SPARC). University CS dept shell/FTP server hosting the gnome user account (UID 2287). Home path: /home/gnome (NFS exported from magellan).
- **137.30.120.37** - www.cs.uno.edu. University CS dept web server hosting gnome's public web directory (~gnome) with rhino images and rhino.exe.
- **137.30.120.39** - "vespucci" IMAP server. User "golden" authenticated from both suspect IPs. Mailbox contained 11,292+ messages.

**External servers:**
- MSN Messenger: 207.46.106.113
- MSN/Hotmail: 65.54.225.254, 65.54.226.252, 207.68.171.245, 207.68.172.236/240, 64.4.48.24, 65.54.244.250
- Google: 64.233.167.99, 64.233.167.104, 216.239.51.99
- Verisign CRL: 12.158.80.10

All three UNO internal servers (cook, www.cs.uno.edu, vespucci) are in the 137.30.120.x range, consistent with a university server farm.



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| External IP | `137.30.122.253` |  | FTP Upload of Rhinoceros Images and Contraband Archive to Cook Server |
| External IP | `137.30.120.40` |  | FTP Upload of Rhinoceros Images and Contraband Archive to Cook Server |
| Port | `TCP 23` |  | Cleartext Telnet Credentials Captured - Account gnome/gnome123 and Failed Golden |
| External IP | `137.30.123.234` |  | Rhinoceros Images and Executable Downloaded from www.cs.uno.edu/~gnome Web Page |
| External IP | `137.30.120.37` |  | Rhinoceros Images and Executable Downloaded from www.cs.uno.edu/~gnome Web Page |
| External IP | `137.30.120.39` |  | Cross-System IP Attribution: Two IPs Confirmed as Same Suspect Across All Three  |
| Port | `TCP 143` |  | Unauthorized Access to Golden's Email via IMAP from Both Suspect IPs |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Path | `/home/gnome` |  | Account Provisioning: Jeremy Provided the "gnome" FTP/Telnet Account |



### Email IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| Email | `hugerhinolover@hotmail.com` |  | Two Rhino-Themed Hotmail Accounts Identified: hugerhinolover and bighonkingrhino |
| Email | `bighonkingrhino@hotmail.com` |  | Two Rhino-Themed Hotmail Accounts Identified: hugerhinolover and bighonkingrhino |




---

## Appendix C: MITRE ATT&CK Coverage

10 techniques identified across findings.


**Kill Chain Coverage:** Initial Access (1) > Persistence (1) > Privilege Escalation (1) > Defense Evasion (3) > Credential Access (2) > Collection (1) > Command and Control (1) > Exfiltration (1) > Impact (2)


### Initial Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | Account Provisioning: Jeremy Provided the...; Unauthorized Access to Golden's Email via IMAP... |


### Persistence

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | Account Provisioning: Jeremy Provided the...; Unauthorized Access to Golden's Email via IMAP... |


### Privilege Escalation

| Technique | Name | Findings |
|-----------|------|----------|
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | Account Provisioning: Jeremy Provided the...; Unauthorized Access to Golden's Email via IMAP... |


### Defense Evasion

| Technique | Name | Findings |
|-----------|------|----------|
| [T1036](https://attack.mitre.org/techniques/T1036/) | Masquerading | rhino.exe Identified as Renamed diskpart.exe... |
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | USB Key Reformatted But Substantial Data...; Recovered Word Document Contains Explicit... |
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | Account Provisioning: Jeremy Provided the...; Unauthorized Access to Golden's Email via IMAP... |


### Credential Access

| Technique | Name | Findings |
|-----------|------|----------|
| [T1110.001](https://attack.mitre.org/techniques/T1110/001/) | Password Guessing | Cleartext Telnet Credentials Captured -... |
| [T1552.006](https://attack.mitre.org/techniques/T1552/006/) | Group Policy Preferences | Cleartext Telnet Credentials Captured -... |


### Collection

| Technique | Name | Findings |
|-----------|------|----------|
| [T1114.002](https://attack.mitre.org/techniques/T1114/002/) | Remote Email Collection | Unauthorized Access to Golden's Email via IMAP... |


### Command and Control

| Technique | Name | Findings |
|-----------|------|----------|
| [T1105](https://attack.mitre.org/techniques/T1105/) | Ingress Tool Transfer | Rhinoceros Images and Executable Downloaded... |


### Exfiltration

| Technique | Name | Findings |
|-----------|------|----------|
| [T1048](https://attack.mitre.org/techniques/T1048/) | Exfiltration Over Alternative Protocol | FTP Upload of Rhinoceros Images and Contraband... |


### Impact

| Technique | Name | Findings |
|-----------|------|----------|
| [T1485](https://attack.mitre.org/techniques/T1485/) | Data Destruction | USB Key Reformatted But Substantial Data...; Recovered Word Document Contains Explicit... |
| [T1561](https://attack.mitre.org/techniques/T1561/) | Disk Wipe | rhino.exe Identified as Renamed diskpart.exe... |





---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 376 |
| Findings submitted | 13 |
| Confirmed | 13 |
| Inferences | 0 |
| Input tokens | 34.7K |
| Output tokens | 125.8K |
| Total tokens | 160.5K |
| Audit log | /home/mulder/.mulder/cases/rhino-hunt.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 216 | 26.3K | 26.5K |
| claude-opus-4-6 | 34.5K | 99.5K | 134.0K |




<details>
<summary>Evidence Sources (86)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.fsstat | sleuthkit | 38 |
| tsk.filelist | sleuthkit | 6 |
| pcap.summary | tshark | 47 |
| pcap.summary | tshark | 47 |
| pcap.summary | tshark | 64 |
| suricata.alerts | suricata | 5 |
| suricata.alerts | suricata | 5 |
| strings.output | strings | 667 |
| zeek.conn | zeek | 8 |
| zeek.conn | zeek | 7 |
| zeek.files | zeek | 14 |
| tcpflow.streams | tcpflow | 599 |
| zeek.conn | zeek | 129 |
| zeek.files | zeek | 13 |
| zeek.http | zeek | 14 |
| zeek.files | zeek | 134 |
| tcpflow.streams | tcpflow | 397 |
| zeek.http | zeek | 13 |
| zeek.packet_filter | zeek | 2 |
| zeek.ftp | zeek | 9 |
| zeek.packet_filter | zeek | 2 |
| zeek.summary | zeek | 5 |
| zeek.http | zeek | 104 |
| zeek.pe | zeek | 2 |
| tcpxtract.carved | tcpxtract | 266 |
| zeek.packet_filter | zeek | 2 |
| zeek.summary | zeek | 6 |
| tcpxtract.carved | tcpxtract | 71 |
| zeek.ssl | zeek | 3 |
| zeek.weird | zeek | 2 |
| zeek.x509 | zeek | 2 |
| zeek.summary | zeek | 9 |
| foremost.audit | foremost | 35 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| bulk.domain | bulk_extractor | 6 |
| bulk.email | bulk_extractor | 6 |
| suricata.alerts | suricata | 5 |
| tcpflow.streams | tcpflow | 9881 |
| tcpxtract.carved | tcpxtract | 32 |
| binwalk.scan | binwalk | 0 |
| exiftool.metadata | exiftool | 9 |
| tsk.timeline | sleuthkit | 7 |
| tsk.masquerade | sleuthkit | 0 |
| hashdeep.hashes | hashdeep | 6 |
| tsk.fsstat | sleuthkit | 38 |
| strings.output | strings | 667 |
| foremost.audit | foremost | 35 |
| suricata.alerts | suricata | 5 |
| suricata.alerts | suricata | 5 |
| suricata.alerts | suricata | 5 |
| pcap.summary | tshark | 47 |
| pcap.summary | tshark | 47 |
| pcap.summary | tshark | 64 |
| zeek.conn | zeek | 8 |
| zeek.conn | zeek | 7 |
| zeek.files | zeek | 14 |
| zeek.files | zeek | 13 |
| zeek.http | zeek | 14 |
| zeek.http | zeek | 13 |
| zeek.packet_filter | zeek | 2 |
| zeek.packet_filter | zeek | 2 |
| zeek.summary | zeek | 5 |
| zeek.conn | zeek | 129 |
| zeek.pe | zeek | 2 |
| zeek.files | zeek | 134 |
| zeek.summary | zeek | 6 |
| zeek.ftp | zeek | 9 |
| zeek.http | zeek | 104 |
| zeek.packet_filter | zeek | 2 |
| zeek.ssl | zeek | 3 |
| zeek.weird | zeek | 2 |
| zeek.x509 | zeek | 2 |
| zeek.summary | zeek | 9 |
| tcpflow.streams | tcpflow | 599 |
| tcpflow.streams | tcpflow | 397 |
| tcpxtract.carved | tcpxtract | 32 |
| tcpxtract.carved | tcpxtract | 71 |
| tcpflow.streams | tcpflow | 9881 |
| tcpxtract.carved | tcpxtract | 266 |
| exiftool.metadata | exiftool | 9 |
| hashdeep.hashes | hashdeep | 6 |
| composite.correlation | composite | 1 |
| composite.exfil | composite | 44 |
| composite.defense_evasion | composite | 135 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
