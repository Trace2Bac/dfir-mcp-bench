---

# Digital Forensic Report: NIST Hacking Case

## Case Summary

This report documents the forensic analysis of an EnCase image (`4Dell_Latitude_CPi.E01`) taken from a Dell CPi notebook computer (serial # VLQLW) found abandoned on 09/20/04 alongside wireless networking equipment. The investigation sought to identify the owner, determine if hacking tools were present, and check for malware.

## Evidence Analyzed

- **Image**: `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` (640 MB, two-segment E01)
- **Partition Layout**: Single NTFS partition (sectors 63–9,510,479), approximately 4.5 GB
- **File System**: 12,545 files indexed

## Key Findings

### Operating System
The SOFTWARE registry hive (`Microsoft\Windows NT\CurrentVersion`) confirms:
- **ProductName**: Microsoft Windows XP
- **CurrentVersion**: 5.1
- **CurrentBuildNumber**: 2600
- **SystemRoot**: C:\WINDOWS

### Registered Owner
- **RegisteredOwner**: Greg Schardt
- **RegisteredOrganization**: N/A
- **ProductId**: 55274-640-0147306-23684
- **InstallDate**: 2004-08-19 (Unix epoch 1092955707)

The user account on the system is named **"Mr. Evil"**, found under `Documents and Settings/Mr. Evil/`.

### Hacking Software Found

The computer contained an extensive, organized collection of hacking tools in `My Documents/`, structured into attack methodology categories:

| Category | Directory | Tools Found |
|---|---|---|
| **Footprinting** | `My Documents/FOOTPRINTING/NT/` | NmapNT (port scanner with source code), NSTPro2, SuperScan, Spade 1.14 |
| **Enumeration** | `My Documents/ENUMERATION/NT/` | enum (Windows enumeration tool), ogre, Cerberus Internet Scanner |
| **Exploitation** | `My Documents/EXPLOITATION/NT/` | Brutus (password brute-forcer), NetBus (remote access trojan), Netcat, Pwdump (1/2/3), lsadump2, GetAdmin, SecHole, L0phtCrack 3, John the Ripper, SMBGrind, VNC, NAT, fpipe, elsave, bsniff |
| **Exploitation (Unix)** | `My Documents/EXPLOITATION/Unix/` | dsniff 2.3, John the Ripper (Unix), VNC |
| **Commands** | `My Documents/COMMANDS/` | snitch.exe, user2sid.exe, STREAMFIND.EXE, and others |

**Installed programs** (under `Program Files/`):
- **Ethereal 0.10.6** — network packet analyzer/sniffer
- **Look@LAN** — network discovery tool
- **Anonymizer** — IP anonymization software
- **mIRC 6.12** — IRC client
- **Agent** — Usenet newsreader
- **WinPcap 3.01** — packet capture library (prerequisite for Ethereal/Nmap)
- **Network Stumbler** — wireless network scanner (Prefetch evidence: `NETSTUMBLER.EXE`)

**Prefetch evidence of execution** (confirming tools were actually run, not just stored):
- CAIN25B45.EXE (Cain & Abel — password recovery/sniffing tool)
- NETSTUMBLER.EXE (wireless network scanner)
- ETHEREAL.EXE (packet sniffer)
- MIRC.EXE (IRC client)
- LOOKATLAN.EXE / LOOKATHOST.EXE
- WHOIS.EXE
- TELNET.EXE
- PING.EXE
- CMD.EXE

### IRC Activity Linking to Hacking

mIRC chat logs under `Program Files/mIRC/logs/` show the user was active in hacking-related channels:
- **#Elite.Hackers** (UnderNet)
- **#ISO-WAREZ** (EFnet)
- **#LuxShell** (UnderNet)
- **#evilfork** (EFnet)
- **#ushells** (UnderNet)
- **#CyberCafe** (UnderNet)

### Outlook Express Evidence

An Outlook Express mailbox file `alt.hacking.dbx` was found, indicating the user subscribed to the `alt.hacking` Usenet newsgroup.

### Anti-Virus Scan Results

ClamAV scanning of extracted files from the disk image detected **4 viruses/trojans**:

| File (Inode) | Original Path | ClamAV Detection |
|---|---|---|
| inode_10600 | `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` | **Win.Trojan.Lsadump-1** |
| inode_10626 | `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` | **Win.Exploit.WinNT-3** |
| inode_10569 | `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` | **Win.Trojan.Sehole-1** |
| inode_10589 | `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` | **Win.Trojan.Netbus-2** |

Note: ClamAV cannot scan files within an E01 image directly. The above results are from extracting 10 key suspicious executables and scanning them. Additional malware may exist among the many other hacking tools present that were not individually extracted and scanned.

---

## Case Questions

**Case Q1**: The operating system was **Microsoft Windows XP** (version 5.1, build 2600), as confirmed by the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2**: The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry value `RegisteredOwner` at `Microsoft\Windows NT\CurrentVersion`. The system's user profile name is "Mr. Evil" (matching the suspect's known online nickname).

**Case Q3**: Yes, there are viruses on the computer. ClamAV detected **4 malicious files** among the extracted hacking tools: **Win.Trojan.Lsadump-1** (lsadump2.exe), **Win.Exploit.WinNT-3** (GetAdmin.exe), **Win.Trojan.Sehole-1** (SECHOLE.EXE), and **Win.Trojan.Netbus-2** (NetBus170.zip). These are hacking/exploitation tools classified as trojans and exploits by ClamAV's signature database. Additional malware may exist in the many other hacking tools stored on the system that were not individually scanned.