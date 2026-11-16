I now have all the evidence needed to write the final report.

---

# Digital Forensic Report — NIST Hacking Case

**Case ID:** nist-hacking-case-av  
**Evidence:** Dell Latitude CPi notebook (Serial #VLQLW), EnCase image `4Dell_Latitude_CPi.E01` / `.E02`  
**Partition:** NTFS, starting at sector 63 (~4.87 GB)

---

## System Identification

- **Operating System:** Microsoft Windows XP, Version 5.1, Build 2600 (no Service Pack installed)
- **Install Date:** 2004-08-19 (Unix epoch 1092955707)
- **Registered Owner:** Greg Schardt
- **Registered Organization:** N/A
- **Product ID:** 55274-640-0147306-23684
- **System Root:** C:\WINDOWS
- **Last Shutdown:** 2004-08-27 15:46:33 UTC

## User Profile

The primary user account is **"Mr. Evil"** (`Documents and Settings/Mr. Evil`). This matches the known online nickname of suspect Greg Schardt. Cookies show activity under the name "mr. evil" across sites including CNN, Google, Yahoo, MSN, netstumbler.com, maktoob.com, and drudgereport.com.

## Anti-Virus Scan

ClamAV was executed against the evidence directory (`/evidence/nist-hacking-case`):

- **4Dell_Latitude_CPi.E01:** OK
- **4Dell_Latitude_CPi.E02:** OK
- **Detections: 0**

**Important limitation:** ClamAV scanned the E01 container files as raw binary blobs; it cannot decompress or parse the EnCase image format to scan individual files within the filesystem. The "OK" result means no virus signatures were detected in the raw container data, but this **does not** constitute a clean bill of health for the files inside the image.

While no traditional viruses were detected, the image contains a significant collection of **hacking tools** that many AV products would flag as potentially unwanted programs (PUPs) or hack tools. These are detailed below.

## Hacking Software Inventory

### Installed Programs (in Program Files)
- **Ethereal 0.10.6** — network packet analyzer/sniffer (with WinPcap 3.01a)
- **Cain & Abel v2.5** (CAIN25B45.EXE) — password recovery/cracking tool
- **Network Stumbler 0.4.0** — wireless access point discovery (wardriving tool)
- **Look@LAN** / **Look@Host** — network monitoring/scanner
- **mIRC 6.12** — IRC client (commonly used for hacker communication)
- **Anonymizer Toolbar** — internet anonymization
- **Agent** — Usenet newsgroup reader

### Hacking Toolkit (in My Documents, organized by attack phase)

**FOOTPRINTING:**
- NmapNT (with source code) — port scanner
- SuperScan — TCP port scanner
- NSTPro2 — network scanner
- spade114.exe — DNS lookup/IP tracer

**ENUMERATION:**
- enum — Windows NT/2000 enumeration tool
- Cerberus Internet Scanner — vulnerability scanner
- ogre — NT enumeration tool

**EXPLOITATION:**
- **NetBus 1.70** — remote access trojan (NetBus170.zip)
- **Brutus** — password brute-forcer (with NetBus authentication config)
- **John the Ripper** (Windows and Unix versions) — password cracker
- **L0phtCrack 3.01** — Windows password auditing tool
- **Pwdump** (versions 1–3) — Windows password hash dumper
- **lsadump2** — LSA secret extraction tool
- **GetAdmin** — privilege escalation exploit
- **sechole** — security hole exploit
- **Netcat** — network utility/"Swiss army knife"
- **SMBGrind Crack** — SMB password cracker
- **dsniff 2.3** — network sniffing/interception suite
- **bsniff** — network sniffer
- **fpipe** — TCP/UDP port forwarder
- **NAT** — NetBIOS Auditing Tool
- **VNC / WinVNC** — remote desktop (potential unauthorized access tool)
- **elsave** — event log management (evidence destruction)

**COMMANDS:**
- snitch.exe, user2sid.exe, STREAMFIND.EXE, SRVBOOT.BAT, whois.exe

### Evidence of Tool Execution (Prefetch files)
The following tools were actually **executed** on the system:
- CAIN25B45.EXE, ETHEREAL.EXE, NETSTUMBLER.EXE, MIRC.EXE, LOOKATLAN.EXE, LOOKATHOST.EXE, WHOIS.EXE, TELNET.EXE, PING.EXE

## Hacking-Related Communications

The Outlook Express data store contains subscriptions to numerous hacking newsgroups:
- alt.2600, alt.2600.cardz, alt.2600.codez, alt.2600.crackz, alt.2600.hackerz, alt.2600.phreakz, alt.2600.programz
- alt.binaries.hacking.beginner, alt.binaries.hacking.computers, alt.binaries.hacking.utilities, alt.binaries.hacking.websites
- alt.hacking, alt.dss.hack, alt.stupidity.hackers.malicious
- free.binaries.hackers.malicious, free.binaries.hacking.*

## Additional Evidence

- **"interception" file** (inode 12264, 173 KB) — found in Mr. Evil's profile root, likely related to network traffic interception
- **Wardriving content** — browser cache contains `wardriving[1]` file, and cookies show visits to www.netstumbler.com
- **Browser history** shows activity in August 2004

## Tying the Computer to the Suspect

The computer is tied to **Greg Schardt** through:
1. **Registered Owner** in the Windows registry: "Greg Schardt"
2. **User profile name** "Mr. Evil" — the known online alias of Greg Schardt
3. The combination of wardriving tools (Network Stumbler), packet sniffers (Ethereal, dsniff), and password interception tools (Cain & Abel) is consistent with the described behavior of parking near wireless access points to intercept traffic

---

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP**, Version 5.1, Build 2600 (no Service Pack), installed on 2004-08-19. (Source: SOFTWARE registry hive, `Microsoft\Windows NT\CurrentVersion\ProductName`)

**Case Q2:** The registered owner is **Greg Schardt**. (Source: SOFTWARE registry hive, `Microsoft\Windows NT\CurrentVersion\RegisteredOwner`)

**Case Q3:** ClamAV was run against the evidence (`/evidence/nist-hacking-case/`). Both E01 segments returned **"OK" with 0 detections**. However, ClamAV could only scan the E01 container files as raw blobs and cannot parse inside the EnCase image format to scan individual files. No traditional viruses were detected at the container level. The image does contain numerous **hacking tools** (NetBus trojan, Brutus, Cain & Abel, John the Ripper, L0phtCrack, Pwdump, GetAdmin, sechole, dsniff, etc.) that many antivirus products would flag as hack tools or potentially unwanted programs, but these are hacking utilities rather than self-replicating viruses.