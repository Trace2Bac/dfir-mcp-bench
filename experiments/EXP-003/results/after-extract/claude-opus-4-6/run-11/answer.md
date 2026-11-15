I now have all the evidence needed. Let me compile the final report.

---

# Digital Forensic Investigation Report

## Case: NIST Hacking Case — Dell Latitude CPi (Serial # VLQLW)
**Case ID:** nist-hacking-case-av
**Evidence:** 4Dell_Latitude_CPi.E01 / E02 (EnCase image, ~640 MB)
**Disk Layout:** NTFS partition at sector 63 (4.87 GB), DOS partition table

---

## System Overview

The disk image contains a **Microsoft Windows XP** installation (Version 5.1, Build 2600, Uniprocessor Free) installed on **2004-08-19** (Unix epoch 1092955707). The system root is `C:\WINDOWS`. The sole active user account is **"Mr. Evil"** (`Documents and Settings/Mr. Evil`), which is the nickname associated with suspect Greg Schardt.

---

## Registry Findings

From the `SOFTWARE\Microsoft\Windows NT\CurrentVersion` registry key:
- **ProductName:** Microsoft Windows XP
- **CurrentVersion:** 5.1
- **CurrentBuildNumber:** 2600
- **RegisteredOwner:** Greg Schardt
- **RegisteredOrganization:** N/A
- **ProductId:** 55274-640-0147306-23684
- **SystemRoot:** C:\WINDOWS
- **InstallDate:** 2004-08-19

---

## Anti-Virus Scan Results (ClamAV)

ClamAV detected **6 malicious files** across the extracted executables and archives:

| Detection | File | Path |
|---|---|---|
| **Win.Trojan.Snitch-1** | snitch.exe | My Documents/COMMANDS/snitch.exe |
| **Win.Trojan.Lsadump-1** | lsadump2.exe | My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe |
| **Win.Exploit.WinNT-3** | GetAdmin.exe | My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe |
| **Win.Trojan.Sehole-1** | SECHOLE.EXE | My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE |
| **Win.Trojan.Sehole-1** | sechole3.zip | My Documents/EXPLOITATION/NT/sechole/sechole3.zip |
| **Win.Trojan.Netbus-2** | NetBus170.zip | My Documents/EXPLOITATION/NT/netbus/NetBus170.zip |
| **Win.Tool.Brutus-3** | brutus.zip | My Documents/EXPLOITATION/NT/brutus.zip |

Note: ClamAV cannot scan inside an E01 disk image directly. These results come from individually extracting 20+ suspicious executables and archives via icat and scanning each one. Additional files not extracted may contain further detections, but the results above represent the key hacking tools flagged.

---

## Hacking Tools and Evidence of Use

The computer contained an extensive collection of hacking tools organized into purpose-built directories under `My Documents/`:

### EXPLOITATION tools:
- **Brutus** — brute-force password cracker (ClamAV: Win.Tool.Brutus-3)
- **NetBus** — remote access trojan (ClamAV: Win.Trojan.Netbus-2)
- **GetAdmin** — Windows NT privilege escalation exploit (ClamAV: Win.Exploit.WinNT-3)
- **SECHOLE** — Windows NT security hole exploit (ClamAV: Win.Trojan.Sehole-1)
- **lsadump2** — LSA secrets dumping tool (ClamAV: Win.Trojan.Lsadump-1)
- **Pwdump** — Windows password hash dumper (versions 1-3)
- **John the Ripper** — password cracker (john-16w.zip, john-1.6.tar.gz)
- **L0phtCrack 3** — password auditing/cracking tool (lc3setup01.exe)
- **SMBGrind** — SMB password brute-force tool (CrackUI.exe, GrindUI.exe, smbgrind.exe, crack.exe)
- **Netcat** — network utility ("Swiss army knife" for network connections)
- **VNC/WinVNC** — remote desktop access tools
- **NAT** — NetBIOS Auditing Tool
- **fpipe** — TCP/IP port forwarder
- **dsniff** — network password sniffer

### ENUMERATION tools:
- **Cerberus Internet Scanner** — vulnerability scanner with reports targeting 172.16.0.2
- **enum** — Windows enumeration tool
- **ogre** — network enumeration tool

### FOOTPRINTING tools:
- **Nmap NT** — network port scanner (full source code and binaries)
- **superscan** — TCP port scanner
- **NSTPro2** — network scanning tool
- **spade114.exe** — SPADE network analysis

### COMMANDS:
- **snitch.exe** — system information tool (ClamAV: Win.Trojan.Snitch-1)
- **STREAMFIND.EXE** — NTFS alternate data stream finder
- **user2sid.exe / USERDUMP.EXE** — Windows SID/user enumeration

### Installed Programs (Program Files):
- **Ethereal 0.10.6** — packet sniffer/network protocol analyzer (installed and used per Prefetch)
- **Anonymizer Toolbar** — anonymous web browsing tool
- **Look@LAN** — network discovery/monitoring
- **mIRC 6.12** — IRC client
- **Agent** — Usenet newsgroup reader
- **CuteFTP / CuteHTML** — FTP/web tools
- **Network Stumbler 0.4.0** — wireless network scanner (installed and used per Prefetch)

### Evidence of Tool Execution (Windows Prefetch):
The Prefetch directory confirms the following hacking tools were actually **executed** on this system:
- CAIN25B45.EXE (Cain & Abel v2.5 Beta 45 — password recovery/sniffing)
- ETHEREAL.EXE (packet capture/analysis)
- NETSTUMBLER.EXE (wireless AP scanning — consistent with wardriving allegations)
- LOOKATLAN.EXE / LOOKATHOST.EXE (network scanning)
- MIRC.EXE (IRC communication)
- WHOIS.EXE (domain/IP lookup)
- PING.EXE (network probing)

### Newsgroup Subscriptions (Outlook Express):
The "Mr. Evil" user was subscribed to numerous hacking-related Usenet newsgroups:
- alt.2600 (and sub-groups: cardz, codez, crackz, hackerz, phreakz, programz, moderated)
- alt.binaries.hacking (beginner, computers, utilities, websites)
- alt.dss.hack
- alt.hacking

### Other Evidence:
- An "interception" file (173 KB) was found directly in Mr. Evil's user profile directory
- Cookies indicate browsing to www.netstumbler.com (wireless wardriving community)
- A "wardriving" cached web page was found in Temporary Internet Files
- Desktop shortcut to "Cain v2.5" confirms direct use by the "Mr. Evil" user
- Desktop shortcut to "Network Stumbler" confirms wireless scanning activity

---

## Tying the Computer to the Suspect

The computer is directly tied to **Greg Schardt** through:
1. **Registry Registered Owner:** "Greg Schardt" is the registered owner of the Windows XP installation (SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner)
2. **User Account "Mr. Evil":** The sole user account matches Schardt's known online alias
3. **Hacking Activity:** The tools, newsgroup subscriptions, wardriving evidence, and network interception capabilities are consistent with the alleged hacking activities described in the case briefing

---

## Case Questions

Case Q1: The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as identified from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

Case Q2: The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive value `RegisteredOwner` at `Microsoft\Windows NT\CurrentVersion`.

Case Q3: **Yes, there are viruses/malware on the computer.** ClamAV detected the following across extracted files:
- **Win.Trojan.Snitch-1** in `My Documents/COMMANDS/snitch.exe`
- **Win.Trojan.Lsadump-1** in `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe`
- **Win.Exploit.WinNT-3** in `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe`
- **Win.Trojan.Sehole-1** in `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` (and sechole3.zip)
- **Win.Trojan.Netbus-2** in `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip`
- **Win.Tool.Brutus-3** in `My Documents/EXPLOITATION/NT/brutus.zip`

These are hacking/exploitation tools classified as trojans, exploits, and hack tools by ClamAV. They include remote access trojans (NetBus), privilege escalation exploits (GetAdmin, SecHole), credential dumping tools (lsadump2), and brute-force password crackers (Brutus).