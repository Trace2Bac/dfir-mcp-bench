All evidence gathered. Here is the final report.

---

# Digital Forensic Report — NIST Hacking Case

## Case Overview

A Dell CPi notebook computer (serial # VLQLW) was found abandoned along with a wireless PCMCIA card and an external homemade 802.11b antenna. The computer is suspected of being used for hacking purposes and is potentially tied to suspect Greg Schardt, who goes by the online nickname "Mr. Evil."

**Evidence:** EnCase image `4Dell_Latitude_CPi.E01` / `4Dell_Latitude_CPi.E02` (~640 MB)

## Disk Layout

- Single NTFS partition starting at sector 63, spanning ~4.87 GB (9,510,417 sectors)
- 12,545 files indexed from the filesystem

## System Identification

- **Operating System:** Microsoft Windows XP (Version 5.1, Build 2600), Uniprocessor Free edition
- **System Root:** C:\WINDOWS
- **Product ID:** 55274-640-0147306-23684
- **Install Date:** August 19, 2004 (Unix epoch 1092955707)
- **Registered Owner:** Greg Schardt
- **Registered Organization:** N/A

## Tying the Computer to the Suspect

The registered owner in the Windows SOFTWARE registry hive (`Microsoft\Windows NT\CurrentVersion\RegisteredOwner`) is **"Greg Schardt"** — the suspect's name. Furthermore, the primary Windows user profile on the system is named **"Mr. Evil"**, which matches the suspect's known online alias. All user data — Desktop, Favorites, Outlook Express mail, Internet Explorer history, and hacking tool directories — reside under `Documents and Settings/Mr. Evil/`.

## Hacking Software Found

The system contains an organized hacking toolkit stored under `My Documents/`, categorized by attack phase:

### EXPLOITATION Tools
| Tool | Path | Description |
|------|------|-------------|
| **Brutus** | `EXPLOITATION/NT/Brutus/` | Brute-force password cracker (includes NetBus.bad, users.txt, words.txt) |
| **NetBus** | `EXPLOITATION/NT/netbus/` | Remote administration trojan (NetBus170.zip) |
| **Netcat** | `EXPLOITATION/NT/Netcat/` | Network utility ("Swiss army knife" of networking) |
| **Pwdump** | `EXPLOITATION/NT/Pwdump/` | Windows password hash dumper (versions 2 and 3) |
| **lsadump2** | `EXPLOITATION/NT/lsadump2/` | LSA secrets dumper (source + compiled binary) |
| **GetAdmin** | `EXPLOITATION/NT/Get Admin/` | Windows NT privilege escalation exploit |
| **SecHole** | `EXPLOITATION/NT/sechole/` | Windows NT security hole exploit |
| **L0phtCrack 3** | `EXPLOITATION/NT/l0pht301/` | Password auditing/cracking tool |
| **John the Ripper** | `EXPLOITATION/NT/John/` and `EXPLOITATION/Unix/` | Password cracker (NT and Unix versions) |
| **SMBGrind Crack** | `EXPLOITATION/NT/SMBGrind Crack/` | SMB brute-force tool with password/user lists |
| **VNC** | `EXPLOITATION/NT/vnc/` and `EXPLOITATION/NT/WinVNC/` | Remote desktop control |
| **dsniff** | `EXPLOITATION/Unix/dsniff 2.3/` | Network packet sniffer/interceptor |
| **NAT** | `EXPLOITATION/NT/NAT/` | NetBIOS Auditing Tool |
| **fpipe** | `EXPLOITATION/NT/fpipe/` | TCP/IP port redirector |
| **bsniff** | `EXPLOITATION/NT/bsniff/` | Network sniffer |

### FOOTPRINTING Tools
| Tool | Path | Description |
|------|------|-------------|
| **Nmap (NT)** | `FOOTPRINTING/NT/Nmapnt/` | Network port scanner (source + drivers) |
| **SuperScan** | `FOOTPRINTING/NT/superscan/` | Port scanner |
| **Sam Spade** | `FOOTPRINTING/NT/spade114.exe` | Network query tool |
| **NSTPro2** | `FOOTPRINTING/NT/NSTPro2/` | Network scanner |

### ENUMERATION Tools
| Tool | Path | Description |
|------|------|-------------|
| **Cerberus Internet Scanner** | `ENUMERATION/NT/Cerberus Internet Scanner/` | Vulnerability scanner |
| **enum** | `ENUMERATION/NT/enum/` | Windows enumeration tool |
| **Ogre** | `ENUMERATION/NT/ogre/` | Enumeration tool |

### COMMANDS (Miscellaneous Utilities)
Includes: `snitch.exe`, `STREAMFIND.EXE`, `user2sid.exe`, `USERDUMP.EXE` and others

### Installed Applications (Program Files)
- **Ethereal 0.10.6** — Network protocol analyzer (packet sniffer), installed with WinPcap
- **Anonymizer Toolbar** — Anonymous web browsing tool
- **Look@LAN** — Network monitoring tool
- **Agent** (Forte) — Usenet newsreader (used to access `alt.hacking` newsgroup)

### Prefetch Evidence of Execution
The Windows Prefetch folder shows these hacking tools were actually executed:
- `CAIN25B45.EXE` — Cain & Abel password recovery/sniffing tool
- `WINPCAP_3_01_A.EXE` — WinPcap packet capture driver installer
- `TELNET.EXE` — Telnet client

### Internet Activity & Newsgroups
- Outlook Express mailbox for **alt.hacking** newsgroup (`alt.hacking.dbx`)
- Internet cache contains wardriving-related content (`wardriving[1]`)
- Internet history spans August 2004

## Anti-Virus Scan Results

ClamAV detected **4 malware/virus signatures** among extracted files:

| Detection | File | Original Path |
|-----------|------|---------------|
| **Win.Trojan.Lsadump-1** | inode 10600 | `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` |
| **Win.Exploit.WinNT-3** | inode 10626 | `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` |
| **Win.Trojan.Sehole-1** | inode 10569 | `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` |
| **Win.Trojan.Netbus-2** | inode 10589 | `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` |

Note: The initial ClamAV scan of the raw E01 container files returned clean (0 detections), as expected — ClamAV cannot inspect individual files within an EnCase image. The detections above were obtained by extracting individual suspicious executables via TSK icat and scanning the extracted files.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600, Uniprocessor Free), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive value `RegisteredOwner` under `Microsoft\Windows NT\CurrentVersion`. The primary user profile on the system is named **"Mr. Evil"**, matching the suspect's known online alias.

**Case Q3:** Yes, ClamAV detected **4 viruses/malware** on the computer:
1. **Win.Trojan.Lsadump-1** — in `lsadump2.exe` (LSA secrets dumping trojan)
2. **Win.Exploit.WinNT-3** — in `GetAdmin.exe` (Windows NT privilege escalation exploit)
3. **Win.Trojan.Sehole-1** — in `SECHOLE.EXE` (Windows NT security hole exploit)
4. **Win.Trojan.Netbus-2** — in `NetBus170.zip` (NetBus remote access trojan)