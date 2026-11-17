I now have all the evidence needed to write the final report.

---

# Forensic Investigation Report — NIST Hacking Case

**Case ID:** nist-hacking-case-av  
**Evidence:** Dell Latitude CPi notebook (Serial # VLQLW), EnCase image `4Dell_Latitude_CPi.E01`  
**Examiner Date:** 2026-11-16

---

## System Overview

The disk image contains a single NTFS partition (sectors 63–9,510,479). The operating system is **Microsoft Windows XP** (version 5.1, build 2600), installed on 2004-08-19. The system root is `C:\WINDOWS`.

**Registry evidence** (SOFTWARE hive, `Microsoft\Windows NT\CurrentVersion`):
- **ProductName:** Microsoft Windows XP
- **RegisteredOwner:** Greg Schardt
- **RegisteredOrganization:** N/A
- **ProductId:** 55274-640-0147306-23684

The sole user profile on the system is **"Mr. Evil"** (`Documents and Settings/Mr. Evil`), which matches the suspect's known online alias.

---

## Hacking Software Inventory

The suspect organized hacking tools into a methodical folder structure under `My Documents/`:

### EXPLOITATION tools
| Tool | Path | Purpose |
|------|------|---------|
| NetBus 1.70 | `EXPLOITATION/NT/netbus/` | Remote access trojan |
| Brutus | `EXPLOITATION/NT/Brutus/` | Password brute forcer |
| GetAdmin | `EXPLOITATION/NT/Get Admin/` | NT privilege escalation |
| SecHole | `EXPLOITATION/NT/sechole/` | NT security hole exploit |
| lsadump2 | `EXPLOITATION/NT/lsadump2/` | LSA secrets dumper |
| pwdump (v1, v2, v3) | `EXPLOITATION/NT/Pwdump/` | SAM password hash dumper |
| L0phtCrack 3 | `EXPLOITATION/NT/l0pht301/` | Password cracker |
| John the Ripper | `EXPLOITATION/NT/John/` | Password cracker |
| Netcat | `EXPLOITATION/NT/Netcat/` | Network Swiss army knife |
| SMBGrind / Crack | `EXPLOITATION/NT/SMBGrind Crack/` | SMB password grinder |
| VNC | `EXPLOITATION/NT/vnc/`, `EXPLOITATION/NT/WinVNC/` | Remote desktop control |
| NAT | `EXPLOITATION/NT/NAT/` | NetBIOS auditing tool |
| fpipe | `EXPLOITATION/NT/fpipe/` | Port redirector |
| dsniff 2.3 | `EXPLOITATION/Unix/dsniff 2.3/` | Network traffic sniffer |
| hk 0.1 | `EXPLOITATION/NT/Hk/` | Privilege escalation |

### ENUMERATION tools
| Tool | Path |
|------|------|
| Cerberus Internet Scanner | `ENUMERATION/NT/Cerberus Internet Scanner/` |
| enum | `ENUMERATION/NT/enum/` |
| ogre | `ENUMERATION/NT/ogre/` |

### FOOTPRINTING tools
| Tool | Path |
|------|------|
| NmapNT (with source) | `FOOTPRINTING/NT/Nmapnt/` |
| NSTPro2 | `FOOTPRINTING/NT/NSTPro2/` |
| SuperScan | `FOOTPRINTING/NT/superscan/` |
| Spade 1.14 | `FOOTPRINTING/NT/spade114.exe` |

### COMMANDS (utility tools)
Located in `My Documents/COMMANDS/`: snitch.exe, STREAMFIND.EXE, user2sid.exe, and others.

### Installed Programs (Program Files)
- **Ethereal 0.10.6** — Packet capture and protocol analyzer
- **Anonymizer** — Anonymous web browsing toolbar
- **Look@LAN** — Network discovery/monitoring
- **mIRC 6.12** — IRC client (commonly used for hacker communication)
- **WinPcap 3.01a** — Packet capture driver (required by Ethereal/Nmap)
- **Network Stumbler 0.4.0** — Wireless network discovery tool
- **Cain & Abel (v2.5 beta 45)** — Password recovery/sniffing tool

### Prefetch Evidence (Programs Actually Executed)
The Windows Prefetch folder confirms the following hacking tools were **run** on the system:
- `CAIN25B45.EXE` — Cain & Abel
- `ETHEREAL.EXE` — Ethereal packet sniffer
- `NETSTUMBLER.EXE` — Network Stumbler wireless scanner
- `MIRC.EXE` — mIRC IRC client
- `LOOKATLAN.EXE` / `LOOKATHOST.EXE` — Look@LAN network scanner
- `WHOIS.EXE` — WHOIS lookups
- `TELNET.EXE` — Telnet client
- `PING.EXE` — Network ping

---

## Anti-Virus Scan Results (ClamAV)

ClamAV was run against extracted suspicious executables. **4 detections were found:**

| File | Original Path | ClamAV Signature |
|------|--------------|-----------------|
| inode 10600 | `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` | **Win.Trojan.Lsadump-1** |
| inode 10626 | `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` | **Win.Exploit.WinNT-3** |
| inode 10569 | `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` | **Win.Trojan.Sehole-1** |
| inode 10589 | `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` | **Win.Trojan.Netbus-2** |

These are all known hacking/exploitation tools classified as trojans or exploits by ClamAV signatures.

---

## Tying the Computer to the Suspect

Multiple pieces of evidence tie this computer to **Greg Schardt** (a.k.a. "Mr. Evil"):

1. **Registry registered owner** is explicitly "Greg Schardt" (SOFTWARE hive, `Microsoft\Windows NT\CurrentVersion\RegisteredOwner`)
2. **User profile name** is "Mr. Evil" — the suspect's known online alias
3. **Wireless hacking toolset** (Network Stumbler, WinPcap, Ethereal, Cain & Abel) is consistent with the suspected wardriving/traffic interception activity described in the case briefing
4. **Methodically organized exploitation toolkit** follows a structured hacking methodology (Footprinting → Enumeration → Exploitation)

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (version 5.1, build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **4 malicious files**: **Win.Trojan.Netbus-2** (NetBus170.zip — a remote access trojan), **Win.Trojan.Lsadump-1** (lsadump2.exe — an LSA secrets dumping tool), **Win.Exploit.WinNT-3** (GetAdmin.exe — a privilege escalation exploit), and **Win.Trojan.Sehole-1** (SECHOLE.EXE — a security hole exploit). All were located in the `My Documents/EXPLOITATION/NT/` directory structure.