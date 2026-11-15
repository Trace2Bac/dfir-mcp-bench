I now have all the evidence needed. Here is the final report.

---

# Digital Forensic Report — NIST Hacking Case

## Case Overview

**Evidence:** Dell CPi notebook computer (Serial # VLQLW), EnCase image `4Dell_Latitude_CPi.E01`/`.E02`  
**Suspect:** Greg Schardt, a.k.a. "Mr. Evil"  
**Disk Layout:** Single NTFS partition (sectors 63–9,510,479), ~4.87 GB  
**Date of Recovery:** 09/20/2004

## Findings

### Operating System

The system ran **Microsoft Windows XP** (version 5.1, build 2600), as confirmed by the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`:
- ProductName: `Microsoft Windows XP`
- CurrentVersion: `5.1`
- CurrentBuildNumber: `2600`
- SystemRoot: `C:\WINDOWS`
- InstallDate: 1092955707 (August 19, 2004)

### Registered Owner

The registry value `RegisteredOwner` under `Microsoft\Windows NT\CurrentVersion` is **Greg Schardt**. The `RegisteredOrganization` is "N/A". The Windows user profile is named **"Mr. Evil"** (the suspect's known alias), visible at `Documents and Settings/Mr. Evil/`.

This directly ties the computer to the suspect.

### Anti-Virus Scan (ClamAV)

ClamAV was run against extracted executables from the disk image. **Five (5) detections were found:**

| # | Detection | File | Location on Disk |
|---|-----------|------|-----------------|
| 1 | **Win.Trojan.Netbus-2** | NetBus170.zip (inode 10589) | My Documents/EXPLOITATION/NT/netbus/ |
| 2 | **Win.Trojan.Lsadump-1** | lsadump2.exe (inode 10600) | My Documents/EXPLOITATION/NT/lsadump2/ |
| 3 | **Win.Exploit.WinNT-3** | GetAdmin.exe (inode 10626) | My Documents/EXPLOITATION/NT/Get Admin/ |
| 4 | **Win.Trojan.Sehole-1** | SECHOLE.EXE (inode 10569) | My Documents/EXPLOITATION/NT/sechole/ |
| 5 | **Win.Trojan.Snitch-1** | snitch.exe (inode 10277) | My Documents/COMMANDS/ |

### Hacking Tools Inventory

The disk contains an extensive, organized collection of hacking tools under `My Documents/`, categorized by attack phase:

**FOOTPRINTING:**
- Nmap (nmapNT) — network port scanner with source code
- SuperScan — port scanner
- NSTPro2 — network scanner
- spade114.exe — DNS query tool

**ENUMERATION:**
- Cerberus Internet Scanner — vulnerability scanner (scan reports for 172.16.0.2 found)
- Ogre — NetBIOS enumeration
- Enum — Windows enumeration tool

**EXPLOITATION:**
- NetBus — remote access trojan (flagged by ClamAV)
- Brutus — password brute-forcer (with NetBus.bad wordlist)
- L0phtCrack 3 (lc3setup01.exe) — password cracker
- John the Ripper — password cracker (NT and Unix versions)
- Pwdump (versions 1, 2, 3) — Windows password hash dumper
- lsadump2 — LSA secret dumper (flagged by ClamAV)
- GetAdmin — privilege escalation exploit (flagged by ClamAV)
- SECHOLE — security hole exploit (flagged by ClamAV)
- SMBGrind — SMB password cracker
- NAT — NetBIOS auditing tool
- Netcat — network utility ("Swiss Army knife")
- dsniff 2.3 — network sniffing suite
- VNC/WinVNC — remote desktop control
- fpipe — port redirector
- bsniff — network sniffer
- elsave — event log tool

**COMMANDS (utilities):**
- snitch.exe (flagged by ClamAV)
- user2sid.exe / sid2user — SID/username resolution
- STREAMFIND.EXE — NTFS stream finder

**Installed Programs:**
- **Ethereal 0.10.6** — network packet analyzer (installed in Program Files, Start Menu shortcuts present)
- **Look@LAN** — network discovery tool
- **Anonymizer** — web anonymization toolbar
- **Cain** — password recovery tool (executed per Prefetch: `CAIN25B45.EXE-056F3A6E.pf`)
- **WinPcap 3.01** — packet capture library (per Prefetch)

**Additional Evidence of Use:**
- Outlook Express mailbox: `alt.hacking.dbx` — subscription to the alt.hacking newsgroup
- Internet cache contains references to "wardriving"
- Prefetch files confirm execution of: Cain, Ethereal, WinPcap, Telnet, and CMD

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (version 5.1, build 2600), as recorded in the SOFTWARE registry hive under `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`. The Windows user profile is named "Mr. Evil," the suspect's known alias.

**Case Q3:** Yes, ClamAV detected **5 viruses/malicious programs** on the computer: **Win.Trojan.Netbus-2** (NetBus170.zip), **Win.Trojan.Lsadump-1** (lsadump2.exe), **Win.Exploit.WinNT-3** (GetAdmin.exe), **Win.Trojan.Sehole-1** (SECHOLE.EXE), and **Win.Trojan.Snitch-1** (snitch.exe). All are hacking/exploitation tools stored in the suspect's `My Documents/EXPLOITATION/` and `My Documents/COMMANDS/` directories.