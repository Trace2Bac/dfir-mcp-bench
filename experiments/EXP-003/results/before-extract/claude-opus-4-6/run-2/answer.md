ClamAV found 5 malware detections across the extracted executables. I now have all the evidence needed. Here is the final report.

---

# Forensic Investigation Report: NIST Hacking Case

## Case Overview

A Dell CPi notebook computer (serial # VLQLW) was found abandoned with a wireless PCMCIA card and a homemade 802.11b antenna. The computer is suspected to have been used for hacking, and may be tied to suspect Greg Schardt (alias "Mr. Evil"). The EnCase image `4Dell_Latitude_CPi.E01` was analyzed.

## Evidence Summary

### Disk Layout
- Single NTFS partition (sector 63–9510479) on a ~4.6 GB drive
- 12,545 filesystem entries indexed

### Operating System
The SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` confirms:
- **ProductName**: Microsoft Windows XP
- **CurrentVersion**: 5.1
- **CurrentBuildNumber**: 2600
- **SystemRoot**: C:\WINDOWS
- **InstallDate**: 2004-08-19 (Unix timestamp 1092955707)

### Registered Owner
From the same registry key:
- **RegisteredOwner**: Greg Schardt
- **RegisteredOrganization**: N/A
- **ProductId**: 55274-640-0147306-23684

This directly ties the computer to the suspect. The Windows user profile is named "Mr. Evil" (`Documents and Settings/Mr. Evil/`), matching Schardt's known alias.

### Hacking Software Found
The disk contains an extensive collection of hacking tools organized by attack methodology:

**Installed Programs:**
- **Cain & Abel** (`Program Files/Cain/`) — password cracking and network sniffing tool (confirmed executed via Prefetch: `CAIN25B45.EXE-056F3A6E.pf`)
- **Ethereal** (`Program Files/Ethereal/`) — network protocol analyzer (packet sniffer)
- **Look@LAN** (`Program Files/Look@LAN/`) — network discovery/monitoring
- **Anonymizer** (`Program Files/Anonymizer/`) — anonymous browsing toolbar

**Hacking Tool Collections (in My Documents):**
- **FOOTPRINTING**: Nmap NT (port scanner), SuperScan, Sam Spade (`spade114.exe`), NSTPro2
- **ENUMERATION**: Cerberus Internet Scanner, ogre, enum (NT enumeration tools)
- **EXPLOITATION**: Brutus (password brute forcer), NetBus (remote access trojan), Netcat, GetAdmin, SecHole, L0phtCrack (`lc3setup01.exe`), John the Ripper, Pwdump (1/2/3), lsadump2, SMBGrind, VNC, fpipe, dsniff 2.3
- **COMMANDS**: Various command-line hacking utilities (`snitch.exe`, `user2sid.exe`, etc.)

**Newsgroup Activity:**
- `alt.hacking.dbx` found in Outlook Express data, indicating the user was subscribed to the alt.hacking newsgroup

### Anti-Virus Scan Results (ClamAV)

ClamAV detected **5 malware signatures** in files extracted from the disk image:

| File Path | ClamAV Detection |
|-----------|-----------------|
| `Program Files/Cain/Abel.dll` (inode 9958) | **Win.Trojan.Cain-9** |
| `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` (inode 10600) | **Win.Trojan.Lsadump-1** |
| `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` (inode 10626) | **Win.Exploit.WinNT-3** |
| `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` (inode 10569) | **Win.Trojan.Sehole-1** |
| `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` (inode 10589) | **Win.Trojan.Netbus-2** |

These are all known hacking/exploitation tools classified as trojans or exploits by ClamAV. NetBus in particular is a well-known remote access trojan. The others are privilege escalation exploits and credential-dumping tools.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as confirmed by the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of `HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion`. The Windows user profile is named "Mr. Evil," matching Schardt's known online alias.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **5 threats**: Win.Trojan.Cain-9 (in `Program Files/Cain/Abel.dll`), Win.Trojan.Lsadump-1 (in `lsadump2.exe`), Win.Exploit.WinNT-3 (in `GetAdmin.exe`), Win.Trojan.Sehole-1 (in `SECHOLE.EXE`), and Win.Trojan.Netbus-2 (in `NetBus170.zip`). All are hacking/exploitation tools classified as trojans or exploits.