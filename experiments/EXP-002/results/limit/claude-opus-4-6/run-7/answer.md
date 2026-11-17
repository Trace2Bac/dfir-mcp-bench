I now have all the evidence needed. Let me compile the final report.

---

# Forensic Investigation Report — NIST Hacking Case

## Case Overview

**Evidence**: Dell Latitude CPi notebook computer (Serial # VLQLW), found abandoned with a wireless PCMCIA card and external homemade 802.11b antenna.

**Image**: `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` (EnCase format, ~640 MB)

**Disk Layout**: Single NTFS partition (sectors 63–9,510,479), approximately 4.5 GB.

---

## System Identification

**Operating System**: Microsoft Windows XP Professional, Version 5.1, Build 2600 (no Service Pack installed). Confirmed via the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`:
- ProductName: `Microsoft Windows XP`
- CurrentVersion: `5.1`
- CurrentBuildNumber: `2600`
- BuildLab: `2600.xpclient.010817-1148`
- ProductType (SYSTEM hive): `WinNT` (Workstation)
- SystemRoot: `C:\WINDOWS`
- InstallDate: 2004-08-19 (Unix epoch 1092955707)

**Registered Owner**: **Greg Schardt** (RegisteredOrganization: `N/A`). This directly ties the computer to the suspect identified in the case briefing.

**User Profile**: The primary user account is named **"Mr. Evil"** (`Documents and Settings/Mr. Evil/`), matching the suspect's known online alias.

---

## Anti-Virus Scan Results

ClamAV was run against the evidence directory `/evidence/nist-hacking-case`. Results:

```
/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01: OK
/evidence/nist-hacking-case/4Dell_Latitude_CPi.E02: OK
```

**ClamAV detected 0 viruses** in the E01 container files. However, ClamAV has a critical limitation: it reads E01 files as opaque binary blobs and **cannot open disk images to scan individual files inside the filesystem**. Therefore, this scan does not confirm that the files within the image are virus-free.

The disk image does contain **known hacking/exploitation tools** (detailed below) that many antivirus products would flag as hacktools or potentially unwanted programs (PUPs), including NetBus (a remote access trojan), password crackers, and network exploitation tools. These are hacking utilities rather than traditional self-replicating viruses.

---

## Hacking Software and Evidence of Use

### Installed Applications (Program Files)
| Software | Purpose |
|---|---|
| **Ethereal 0.10.6** | Network packet analyzer (precursor to Wireshark) — installed and executed (Prefetch evidence) |
| **Look@LAN** | Network discovery and monitoring tool — installed and executed |
| **mIRC 6.12** | IRC client, commonly used by hackers for communication — installed and executed |
| **Anonymizer Toolbar** | Web anonymization tool for hiding identity online |
| **WinPcap 3.01a** | Packet capture library required by network sniffing tools — installed and executed |
| **Cain & Abel (v2.5 beta 45)** | Password cracking and network sniffing tool — executed (Prefetch: `CAIN25B45.EXE`) |
| **Network Stumbler 0.4.0** | Wireless network discovery tool (wardriving) — installed and executed |

### Hacking Tool Collection (My Documents)
The suspect organized hacking tools into methodological categories:

**EXPLOITATION/NT/**:
- **Brutus** — Password brute-forcing tool (with NetBus authentication definition file)
- **NetBus 1.70** — Remote access trojan (NetBus170.zip, SHA256: `8b0563e...`)
- **Netcat** — "Swiss army knife" network tool
- **Pwdump (v1, v2, v3)** — Windows password hash extraction tools
- **lsadump2** — LSA Secrets dumper
- **L0phtCrack 3** — Password cracker (lc3setup01.exe)
- **John the Ripper** — Password cracker (both NT and Unix versions)
- **GetAdmin** — Windows privilege escalation exploit
- **SecHole** — Security hole exploitation tool (SECHOLE.EXE, SHA256: `f18affb...`)
- **SMBGrind Crack** — SMB password cracker
- **fpipe** — Port redirection/pivoting tool
- **VNC** — Remote desktop access
- **bsniff** — Network sniffer
- **NAT** — NetBIOS auditing tool
- **dsniff 2.3** — Network sniffing suite (Unix)

**ENUMERATION/NT/**:
- **Cerberus Internet Scanner (CIS 5.0.02)** — Vulnerability scanner with scan reports against 172.16.0.2
- **DumpTools** (DumpACL, DumpEvt, DumpReg, DumpSec) — Windows enumeration
- **enum** — Windows enumeration tool
- **ogre** — Network enumeration

**FOOTPRINTING/NT/**:
- **NmapNT** — Network port scanner (with full source code)
- **SuperScan** — TCP port scanner
- **NSTPro2** — Network scanning tool
- **Spade 1.14** — DNS lookup tool

**COMMANDS/**:
- **snitch.exe**, **user2sid.exe**, **webscan.exe**, **winfo.exe** — Reconnaissance utilities
- **STREAMFIND.EXE** — NTFS alternate data stream finder
- Various batch scripts (SRVBOOT.BAT, USERSES.BAT, WSSES.BAT)

**DICTIONARIES/**:
- Multiple password wordlists including a 250MB wordlist — for use with password cracking tools

### Evidence of Tool Execution (Prefetch Files)
The Windows Prefetch directory confirms these programs were **actually run** on the system:
- `CAIN25B45.EXE` — Cain & Abel password cracker
- `NETSTUMBLER.EXE` — Wireless network scanner (wardriving)
- `ETHEREAL.EXE` — Packet sniffer
- `MIRC.EXE` — IRC client
- `LOOKATLAN.EXE` / `LOOKATHOST.EXE` — Network scanner
- `WHOIS.EXE` — Domain lookup
- `TELNET.EXE` — Remote access
- `PING.EXE` — Network connectivity
- `CMD.EXE` — Command shell

### Additional Evidence
- **alt.hacking.dbx** — Outlook Express mailbox for the `alt.hacking` newsgroup, indicating participation in hacking discussions
- **Wardriving content** in IE browser cache (`wardriving[1]`) — consistent with the suspect's known MO of intercepting wireless traffic
- **Cerberus scan reports** targeting IP 172.16.0.2 — evidence of active vulnerability scanning
- **Password/user lists** — Multiple files containing usernames and passwords for brute-force attacks

---

## Tying the Computer to the Suspect

| Evidence | Link to Greg Schardt |
|---|---|
| RegisteredOwner registry value | **"Greg Schardt"** — directly names the suspect |
| User profile name | **"Mr. Evil"** — matches suspect's known online alias |
| Wardriving tools (NetStumbler) + homemade antenna | Consistent with suspect's known behavior of parking near WAPs |
| Hacking tools organized by attack methodology | Consistent with associate reports of hacking activity |

---

## Case Questions

Case Q1: The operating system is **Microsoft Windows XP** (Version 5.1, Build 2600, no Service Pack). This was confirmed from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` (ProductName: "Microsoft Windows XP", CurrentBuildNumber: "2600").

Case Q2: The registered owner is **Greg Schardt**. This was confirmed from the SOFTWARE registry hive value `RegisteredOwner` at `Microsoft\Windows NT\CurrentVersion`. The primary user account on the system is named "Mr. Evil," which matches the suspect's known online alias.

Case Q3: ClamAV was run on the evidence at `/evidence/nist-hacking-case` and **detected no viruses** (0 detections). Both E01/E02 files returned "OK." However, ClamAV cannot open E01 disk images to scan individual files inside the filesystem, so this result only covers the container files, not the thousands of files within the disk image. The image does contain numerous **hacking tools** (NetBus remote access trojan, Brutus password cracker, Cain & Abel, Netcat, password dumpers, etc.) that many antivirus products would flag as hacktools or potentially unwanted programs, but ClamAV did not have the ability to scan them inside the disk image.