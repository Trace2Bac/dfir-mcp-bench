---

# Forensic Investigation Report — NIST Hacking Case

**Case ID:** nist-hacking-case-av  
**Evidence:** Dell Latitude CPi notebook (Serial # VLQLW) — EnCase image `4Dell_Latitude_CPi.E01` / `.E02`  
**Examiner Date:** 2026-11-16

---

## System Overview

- **Operating System:** Microsoft Windows XP, Version 5.1, Build 2600 (no service pack installed)
- **Build Lab:** 2600.xpclient.010817-1148
- **System Root:** C:\WINDOWS
- **Registered Owner:** Greg Schardt
- **Registered Organization:** N/A
- **Product ID:** 55274-640-0147306-23684
- **Install Date:** 2004-08-19 (Unix epoch 1092955707)
- **User Profile:** "Mr. Evil" (Documents and Settings\Mr. Evil)
- **Partition Layout:** Single NTFS partition starting at sector 63, ~4.5 GB

## Hacking Software Found

The filesystem contains extensive hacking tool collections organized into methodical directories under `My Documents/`:

**EXPLOITATION tools:**
- **NetBus 1.70** (`My Documents/EXPLOITATION/NT/netbus/NetBus170.zip`) — remote access trojan
- **Brutus** — brute-force password cracker (with NetBus attack definition file)
- **John the Ripper** — password cracker (NT and Unix versions)
- **L0phtCrack 3** (`lc3setup01.exe`) — Windows password auditing tool
- **lsadump2** — LSA secrets dumping tool
- **Pwdump** (versions 1-3) — SAM password hash extraction
- **GetAdmin** — privilege escalation exploit
- **sechole** — security hole exploit
- **SMBGrind** — SMB password grinding tool
- **Netcat** — "Swiss Army knife" of networking
- **VNC/WinVNC** — remote desktop access
- **fpipe** — TCP/IP port redirector
- **NAT** — NetBIOS auditing tool
- **dsniff 2.3** — network traffic sniffer suite
- **bsniff** — network sniffer

**FOOTPRINTING tools:**
- **Nmap NT** — port/network scanner (with full source code)
- **SuperScan** — TCP port scanner
- **NSTPro2** — network scanning tool
- **spade114.exe** — Sam Spade network query tool

**ENUMERATION tools:**
- **Cerberus Internet Scanner** — vulnerability scanner
- **enum** — Windows enumeration tool
- **ogre** — network enumeration tool

**COMMANDS (reconnaissance):**
- snitch.exe, user2sid.exe, USERDUMP.EXE, STREAMFIND.EXE, etc.

**Installed Programs (from registry Uninstall keys):**
- **Cain & Abel v2.5 beta45** — password cracking and network analysis
- **Ethereal** (0.10.6) — packet capture/analysis
- **Network Stumbler** — wireless network detector/wardriving tool
- **Look@LAN** — network discovery/monitoring
- **mIRC** — IRC client
- **Anonymizer** — internet anonymity toolbar
- **CuteFTP** — FTP file transfer
- **Forte Agent** — Usenet newsgroup reader
- **WinPcap** — low-level packet capture driver
- **123 Write All Stored Passwords** — password recovery tool

**Prefetch evidence of execution:**
- CAIN25B45.EXE, ETHEREAL.EXE, NETSTUMBLER.EXE, LOOKATLAN.EXE, LOOKATHOST.EXE, MIRC.EXE, WHOIS.EXE, PING.EXE, TELNET.EXE, CMD.EXE

**Outlook Express newsgroup subscriptions:**
- `alt.hacking.dbx` — subscribed to hacking-related newsgroups

## Tying the Computer to the Suspect

The computer is tied to **Greg Schardt** through:
1. **Registered Owner** in the Windows registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner`) = "Greg Schardt"
2. **User profile** named "Mr. Evil" — matches the known online alias of Greg Schardt
3. The computer contains wardriving tools (Network Stumbler, wireless antenna) consistent with the described behavior of parking near wireless access points to intercept traffic

## Anti-Virus Scan Results

ClamAV was run against the evidence:
```
/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01: OK
/evidence/nist-hacking-case/4Dell_Latitude_CPi.E02: OK
```
**0 detections** from ClamAV on the E01 container files. **Important caveat:** ClamAV reads E01 files as opaque containers and cannot scan individual files inside the disk image. This result does not certify that the files within the image are virus-free.

Based on manual filesystem analysis, the image contains **NetBus 1.70** (`NetBus170.zip`), which is a well-known remote access trojan/backdoor that would be flagged by most antivirus engines. The numerous other hacking tools (Cain & Abel, Brutus, etc.) would also typically be flagged as Potentially Unwanted Programs (PUP) or hack tools by modern AV products.

---

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP**, Version 5.1, Build 2600 (no service pack), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive value `RegisteredOwner` under `Microsoft\Windows NT\CurrentVersion`. The active user profile on the system is named "Mr. Evil," which matches Schardt's known online alias.

**Case Q3:** ClamAV was run on the evidence (`/evidence/nist-hacking-case`) and returned **0 detections** on the E01 container files. However, ClamAV cannot decompose E01 images to scan individual files within them. Manual filesystem analysis reveals the presence of **NetBus 1.70** (a known remote access trojan) in `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip`, along with dozens of other hacking and exploitation tools (Cain & Abel, Brutus, lsadump2, Pwdump, GetAdmin, sechole, Netcat, John the Ripper, dsniff, etc.) that most antivirus products would flag as hack tools or potentially unwanted programs. No traditional file-infecting viruses were identified in the file listing.