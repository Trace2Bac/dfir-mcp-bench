I now have all the evidence needed to answer every question. Here is the final report.

---

# NIST Hacking Case — Forensic Investigation Report

## Case Overview

**Evidence:** Dell Latitude CPi notebook, serial #VLQLW, found abandoned with wireless PCMCIA card and external 802.11b antenna.  
**Disk Image:** `4Dell_Latitude_CPi.E01` / `.E02` (~640 MB, NTFS partition at sector 63)  
**Suspect:** Greg Schardt, a.k.a. "Mr. Evil"

## System Identification

- **Operating System:** Microsoft Windows XP (Version 5.1, Build 2600)
- **Registered Owner:** Greg Schardt
- **Registered Organization:** N/A
- **Product ID:** 55274-640-0147306-23684
- **Install Date:** August 19, 2004 (Unix epoch 1092955707)
- **System Root:** C:\WINDOWS
- **User Profile:** `Documents and Settings\Mr. Evil`

The Windows XP registration directly ties the computer to the suspect Greg Schardt, who uses the online alias "Mr. Evil" — the same name as the only user profile on the system.

## Hacking Software Found

The disk image contains an extensive, organized collection of hacking tools stored in `My Documents/`, categorized by attack phase:

### FOOTPRINTING (Reconnaissance)
- **Nmap NT** — Network port scanner and OS fingerprinting
- **SuperScan** — Network scanner
- **Sam Spade** (spade114.exe) — Network query tool
- **NSTPro2** — Network scanning tool

### ENUMERATION
- **Cerberus Internet Scanner** — Vulnerability scanner (reports found for 172.16.0.2)
- **Enum** — NetBIOS enumeration tool
- **Ogre** — Enumeration tool

### EXPLOITATION
- **Brutus** — Password brute force tool
- **NetBus** (v1.70) — Remote access trojan
- **Netcat** — Network utility ("Swiss Army knife")
- **Pwdump** (versions 1-3) — Windows password hash dumper
- **lsadump2** — LSA secrets dumper
- **GetAdmin** — Windows privilege escalation exploit
- **SECHOLE** — Security hole exploit
- **L0phtCrack** (lc3setup01.exe) — Password cracker
- **SMBGrind/Crack** — SMB password brute forcer
- **John the Ripper** (john-16w, john-1.6) — Password cracker
- **WinVNC** — Remote desktop tool
- **NAT** — NetBIOS Auditing Tool
- **dsniff** — Network traffic sniffer
- **FPipe** — Port forwarding tool
- **Hk** — Privilege escalation exploit

### COMMANDS (Utility Tools)
- **snitch.exe**, **user2sid.exe**, **STREAMFIND.EXE** — Enumeration utilities

### Installed Software
- **Ethereal** (v0.10.6) — Network packet analyzer (installed to Program Files, with Prefetch confirming execution)
- **WinPcap** (v3.01a) — Packet capture library
- **Cain & Abel** (cain25b45) — Password recovery/sniffing tool (Prefetch confirms execution)
- **Network Stumbler** (v0.4.0) — Wireless network discovery tool (Prefetch confirms execution)
- **Anonymizer Toolbar** — Anonymous browsing tool
- **mIRC** (v6.12) — IRC client (Prefetch confirms execution)
- **Look@LAN / Look@Host** — Network monitoring (Prefetch confirms execution)
- **CuteFTP** (Cute3032) — FTP client

### Evidence of Use (from Prefetch)
The following hacking tools were confirmed executed based on Windows Prefetch data:
- `CAIN25B45.EXE`, `ETHEREAL.EXE`, `NETSTUMBLER.EXE`, `MIRC.EXE`, `LOOKATLAN.EXE`, `LOOKATHOST.EXE`, `TELNET.EXE`, `WHOIS.EXE`, `PING.EXE`

### Newsgroup Subscription
Outlook Express contained a newsgroup database: `alt.hacking.dbx`, confirming interest in hacking communities.

### Wardriving Evidence
Internet cache contained a file named `wardriving[1]`, consistent with the case briefing about intercepting wireless traffic at hotspots.

## Anti-Virus Scan Results

ClamAV scanning of extracted executables detected **4 viruses/malware**:

| File Path | ClamAV Detection |
|---|---|
| `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` (inode 10600) | **Win.Trojan.Lsadump-1** |
| `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` (inode 10626) | **Win.Exploit.WinNT-3** |
| `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` (inode 10569) | **Win.Trojan.Sehole-1** |
| `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` (inode 10589) | **Win.Trojan.Netbus-2** |

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as identified from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`. The user profile on the system is named "Mr. Evil," consistent with Schardt's known online alias.

**Case Q3:** Yes, there are viruses on the computer. ClamAV detected **4 malicious files**: **Win.Trojan.Lsadump-1** (lsadump2.exe), **Win.Exploit.WinNT-3** (GetAdmin.exe), **Win.Trojan.Sehole-1** (SECHOLE.EXE), and **Win.Trojan.Netbus-2** (NetBus170.zip). All were located in the `My Documents/EXPLOITATION/NT/` directory, which is part of an organized hacking toolkit.