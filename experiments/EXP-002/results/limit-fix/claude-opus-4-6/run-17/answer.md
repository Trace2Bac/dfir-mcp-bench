Excellent - ClamAV found 4 malware detections. I now have all the evidence needed for the final report.

---

# Digital Forensic Report: NIST Hacking Case

## Case Overview

**Evidence:** Dell CPi notebook computer (Serial # VLQLW), EnCase image `4Dell_Latitude_CPi.E01`  
**Suspect:** Greg Schardt (alias "Mr. Evil")  
**Filesystem:** NTFS partition starting at sector 63 (size ~4.87 GB)

## System Information

- **Operating System:** Microsoft Windows XP, Version 5.1, Build 2600 (confirmed via SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`)
- **Registered Owner:** Greg Schardt (registry value `RegisteredOwner`)
- **Registered Organization:** N/A
- **Product ID:** 55274-640-0147306-23684
- **System Root:** C:\WINDOWS
- **Install Date:** August 19, 2004 (Unix timestamp 1092955707)

## Tie to Suspect

The registered owner of the Windows XP installation is **Greg Schardt**, directly tying the computer to the suspect. Additionally, the primary user profile on the system is named **"Mr. Evil"** (located at `Documents and Settings/Mr. Evil/`), which matches the suspect's known online alias. The user profile contains extensive browsing history, email data (including a subscription to the **alt.hacking** newsgroup via `alt.hacking.dbx`), and network neighborhood connections to a machine called "Andrews-1".

## Hacking Software Found

The disk contains an organized collection of hacking tools categorized into penetration-testing phases:

### EXPLOITATION tools (`My Documents/EXPLOITATION/`)
- **Brutus** — brute-force password cracker (with NetBus.bad, wordlists)
- **NetBus** — remote administration trojan (NetBus170.zip)
- **Netcat** — network utility often used for backdoors (netcat11nt.zip)
- **Pwdump** — Windows password hash dumper (pwdump, pwdump2, pwdump3)
- **lsadump2** — LSA secrets dumper
- **L0phtCrack 3** — password auditing tool (lc3setup01.exe)
- **John the Ripper** — password cracker (john-16w.zip, john-1.6.tar.gz)
- **GetAdmin** — privilege escalation exploit
- **SecHole** — security hole exploit (SECHOLE.EXE, SECHOLED.EXE)
- **SMBGrind** — SMB password cracker (CrackUI.exe, GrindUI.exe, smbgrind.exe)
- **VNC/WinVNC** — remote desktop control tools
- **fpipe** — TCP/UDP port redirector
- **dsniff** — network sniffing suite
- **NAT** — NetBIOS auditing tool
- **elsave** — event log utility

### FOOTPRINTING tools (`My Documents/FOOTPRINTING/`)
- **Nmap NT** — port scanner (full source and binaries)
- **SuperScan** — TCP port scanner
- **NSTPro2** — network scanning tool
- **spade114.exe** — Sam Spade network query tool

### ENUMERATION tools (`My Documents/ENUMERATION/`)
- **Ogre** — network enumeration tool

### Installed Applications
- **Ethereal** (packet sniffer/protocol analyzer) — installed at `Program Files/Ethereal/`
- **Anonymizer Toolbar** — installed at `Program Files/Anonymizer/` (used to hide internet activity)
- **Cain & Abel v2.5 beta 45** — password recovery tool (confirmed via Prefetch file `CAIN25B45.EXE-056F3A6E.pf`)

### Additional Evidence of Hacking Activity
- Cached web page about **wardriving** in Internet Explorer temp files
- Subscription to the **alt.hacking** newsgroup in Outlook Express

## Anti-Virus (ClamAV) Scan Results

ClamAV detected **4 viruses/malware** on the computer:

| File (Inode) | Path | Detection |
|---|---|---|
| 10600 | `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` | **Win.Trojan.Lsadump-1** |
| 10626 | `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` | **Win.Exploit.WinNT-3** |
| 10569 | `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` | **Win.Trojan.Sehole-1** |
| 10589 | `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` | **Win.Trojan.Netbus-2** |

All four detections are hacking/exploitation tools consistent with the suspect's alleged activities.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as recorded in the SOFTWARE registry hive under `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** Yes, ClamAV detected **4 viruses** on the computer: **Win.Trojan.Lsadump-1** (lsadump2.exe), **Win.Exploit.WinNT-3** (GetAdmin.exe), **Win.Trojan.Sehole-1** (SECHOLE.EXE), and **Win.Trojan.Netbus-2** (NetBus170.zip). All are hacking/exploitation tools found in `My Documents/EXPLOITATION/NT/`.