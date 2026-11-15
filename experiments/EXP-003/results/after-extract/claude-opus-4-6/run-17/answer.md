I now have all the evidence needed to write the final report.

---

# Digital Forensic Investigation Report — NIST Hacking Case

## Case Overview

**Evidence:** Dell Latitude CPi notebook computer (serial # VLQLW), EnCase image `4Dell_Latitude_CPi.E01`/`.E02`  
**Partition Layout:** Single NTFS partition (sector 63–9,510,479), ~4.5 GB  
**Suspect:** Greg Schardt, alias "Mr. Evil"

## Findings

### Operating System

The Windows SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` identifies the OS as:

- **Product Name:** Microsoft Windows XP
- **Version:** 5.1, Build 2600
- **Build Lab:** 2600.xpclient.010817-1148
- **System Root:** C:\WINDOWS
- **Install Date:** 2004-08-19 (Unix timestamp 1092955707)

### Registered Owner

The `RegisteredOwner` registry value reads **Greg Schardt**, directly tying the suspect to this computer. The `RegisteredOrganization` is listed as "N/A". The sole user profile on the system is named **"Mr. Evil"**, matching the suspect's known alias.

### Anti-Virus Scan (ClamAV)

ClamAV was run against executables extracted from the disk image. **Three malware detections were found:**

| File (Inode) | Path on Disk | ClamAV Signature |
|---|---|---|
| inode 10600 | My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe | **Win.Trojan.Lsadump-1** |
| inode 10626 | My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe | **Win.Exploit.WinNT-3** |
| inode 10569 | My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE | **Win.Trojan.Sehole-1** |

All three are exploitation tools stored in an organized hacking toolkit under `My Documents/EXPLOITATION/NT/`.

### Hacking Software & Tools Inventory

The disk contains a large, organized collection of hacking tools categorized into attack phases:

**EXPLOITATION tools** (under `My Documents/EXPLOITATION/`):
- **Brutus** — brute-force password cracker (with NetBus.bad, wordlists)
- **NetBus** — remote access trojan (NetBus170.zip)
- **Netcat** — network utility ("Swiss Army knife" of hacking)
- **GetAdmin** — Windows NT privilege escalation exploit (flagged by ClamAV)
- **SECHOLE** — Windows NT security hole exploit (flagged by ClamAV)
- **lsadump2** — LSA secrets dumper (flagged by ClamAV)
- **Pwdump** — Windows password hash extractor (pwdump, pwdump2, pwdump3)
- **John the Ripper** — password cracker (john-16w.zip, john-1.6.tar.gz)
- **L0phtCrack** — password auditing tool (lc3setup01.exe)
- **SMBGrind / Crack** — SMB password brute-force tools
- **VNC / WinVNC** — remote desktop access tools
- **dsniff** — network packet sniffer
- **fpipe** — port redirector
- **NAT** — NetBIOS Auditing Tool
- **elsave** — event log manipulation tool

**FOOTPRINTING tools** (under `My Documents/FOOTPRINTING/`):
- **Nmap NT** — port scanner with full source code
- **NSTPro2** — network scanning tool
- **SuperScan** — TCP port scanner
- **spade114.exe** — Sam Spade network tool

**ENUMERATION tools** (under `My Documents/ENUMERATION/`):
- **Ogre** — network enumeration tool

**Installed Programs** (in Program Files and Prefetch evidence):
- **Ethereal 0.10.6** — network packet analyzer (installed, executed per Prefetch)
- **Cain v2.5 (Beta 45)** — password recovery/sniffing tool (executed per Prefetch: CAIN25B45.EXE)
- **Network Stumbler** — wireless network scanner (executed per Prefetch: NETSTUMBLER.EXE)
- **Look@LAN** — network discovery tool (executed per Prefetch)
- **Anonymizer Toolbar** — web anonymization tool
- **mIRC 6.12** — IRC client (executed per Prefetch)
- **Agent** — newsgroup reader

### Evidence of Use

- **Prefetch files** confirm execution of: Cain, Ethereal, Network Stumbler, Look@LAN, Look@Host, mIRC, whois, ping, telnet, and cmd.exe
- **Desktop shortcuts** in `Mr. Evil/Desktop/Tools/` link to Cain v2.5, Ethereal, Network Stumbler, Look@LAN, mIRC, Agent, whois — a curated hacking workstation
- **Newsgroup subscriptions** in Outlook Express include alt.2600, alt.hacking, alt.binaries.hacking.utilities, alt.2600.crackz, alt.2600.cardz, and ~20 more hacking-related newsgroups
- A file named **"interception"** exists directly in the Mr. Evil profile root
- **Cookies** show visits to www.netstumbler.com (wardriving community)
- **IE cache** contains a reference to "wardriving" content
- **WinPcap** was installed (packet capture driver required by Ethereal and Cain)

---

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP**, version 5.1, build 2600 (per the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`).

**Case Q2:** The registered owner is **Greg Schardt** (per the `RegisteredOwner` value in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`). The only user profile on the system is named "Mr. Evil," matching the suspect's known alias.

**Case Q3:** Yes, ClamAV detected **three viruses/malicious programs** on the computer:
1. **Win.Trojan.Lsadump-1** — `lsadump2.exe` (LSA secrets dumper) at `My Documents/EXPLOITATION/NT/lsadump2/`
2. **Win.Exploit.WinNT-3** — `GetAdmin.exe` (privilege escalation exploit) at `My Documents/EXPLOITATION/NT/Get Admin/`
3. **Win.Trojan.Sehole-1** — `SECHOLE.EXE` (security hole exploit) at `My Documents/EXPLOITATION/NT/sechole/`

All three are hacking/exploitation tools stored in an organized attack toolkit collection. Additional unscanned zip archives (NetBus, Netcat, Pwdump, John the Ripper, etc.) likely contain further malicious tools.