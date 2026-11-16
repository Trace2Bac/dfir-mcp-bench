I now have all the information needed to write the final report.

---

# Forensic Analysis Report — NIST Hacking Case

## Evidence

- **Image:** 4Dell_Latitude_CPi.E01 / E02 (EnCase, ~640 MB)
- **Partition:** NTFS, sectors 63–9,510,479

## System Information

The registry at `SOFTWARE\Microsoft\Windows NT\CurrentVersion` reveals:
- **ProductName:** Microsoft Windows XP
- **CurrentVersion:** 5.1
- **CurrentBuildNumber:** 2600
- **RegisteredOwner:** Greg Schardt
- **RegisteredOrganization:** N/A
- **SystemRoot:** C:\WINDOWS
- **ProductId:** 55274-640-0147306-23684
- **InstallDate:** 2004-08-19 (Unix epoch 1092955707)

The primary user account on the system is **"Mr. Evil"** (as seen in `Documents and Settings/Mr. Evil/`).

## Hacking Software Found

The disk contains an extensive collection of hacking tools organized into directories mirroring a penetration-testing methodology:

| Category | Directory | Tools |
|---|---|---|
| **Exploitation** | `My Documents/EXPLOITATION/NT/` | Brutus (password cracker), NetBus (remote access trojan), Netcat, Pwdump (1/2/3), lsadump2, GetAdmin, sechole, SMBGrind/Crack, L0phtCrack (lc3setup01.exe), VNC, John the Ripper, NAT, fpipe, dsniff |
| **Enumeration** | `My Documents/ENUMERATION/NT/` | Cerberus Internet Scanner, enum, ogre |
| **Footprinting** | `My Documents/FOOTPRINTING/NT/` | Nmap (nmapNT with source), SuperScan, NSTPro2, spade |
| **Commands** | `My Documents/COMMANDS/` | snitch.exe, user2sid.exe, STREAMFIND.EXE |
| **Installed Programs** | `Program Files/` | **Cain & Abel** (password sniffer/cracker, with captured protocol lists: SMB, HTTP, FTP, POP3, IMAP, TELNET, VNC, etc.), **Ethereal** (network packet sniffer), **Anonymizer**, **Look@LAN**, **mIRC** |

The Prefetch directory confirms execution of **CAIN25B45.EXE** (Cain & Abel) and other tools.

## Anti-Virus Scan Results (ClamAV)

ClamAV detected **5 malicious files** on the disk image:

| Detection | File Path | Inode |
|---|---|---|
| **Win.Trojan.Snitch-1** | `My Documents/COMMANDS/snitch.exe` | 10277 |
| **Win.Trojan.Lsadump-1** | `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` | 10600 |
| **Win.Exploit.WinNT-3** | `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` | 10626 |
| **Win.Trojan.Sehole-1** | `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` | 10569 |
| **Win.Trojan.Netbus-2** | `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` | 10589 |

Note: Cain.exe and Abel.exe were also scanned but did not trigger a ClamAV signature (they are classified as "potentially unwanted programs" by some AV vendors but not flagged by ClamAV's current database).

## Tying the Computer to the Suspect

The computer is directly tied to **Greg Schardt** through:
1. The **RegisteredOwner** registry value is set to "Greg Schardt"
2. The primary user profile is named **"Mr. Evil"** — the known online alias of Greg Schardt per the case briefing
3. The computer contains an organized library of hacking tools consistent with the suspect's reported activities (wireless interception, credential theft, network scanning)

---

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP** (Version 5.1, Build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **5 infections**: Win.Trojan.Snitch-1 (`snitch.exe`), Win.Trojan.Lsadump-1 (`lsadump2.exe`), Win.Exploit.WinNT-3 (`GetAdmin.exe`), Win.Trojan.Sehole-1 (`SECHOLE.EXE`), and Win.Trojan.Netbus-2 (`NetBus170.zip`). All are hacking/exploitation tools located in the `My Documents/EXPLOITATION/` and `My Documents/COMMANDS/` directories.