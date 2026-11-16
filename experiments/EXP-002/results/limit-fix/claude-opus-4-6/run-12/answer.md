---

# Forensic Investigation Report — NIST Hacking Case

## Evidence Examined

- **Disk Image:** `4Dell_Latitude_CPi.E01` / `.E02` (640 MB EnCase image)
- **Computer:** Dell CPi notebook, serial # VLQLW
- **Filesystem:** NTFS partition (sectors 63–9,510,479)
- **File Count:** 12,545 filesystem entries indexed

## System Information

The SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` reveals:

| Field | Value |
|---|---|
| **ProductName** | Microsoft Windows XP |
| **CurrentVersion** | 5.1 |
| **CurrentBuildNumber** | 2600 |
| **RegisteredOwner** | Greg Schardt |
| **RegisteredOrganization** | N/A |
| **ProductId** | 55274-640-0147306-23684 |
| **SystemRoot** | C:\WINDOWS |
| **InstallDate** | 1092955707 (Aug 19, 2004) |

The sole user profile on the system is **"Mr. Evil"** — the known online alias of suspect Greg Schardt.

## Anti-Virus Scan Results

Files were extracted from the disk image by inode and scanned with ClamAV. **Four (4) detections were identified:**

| ClamAV Signature | File Path (on disk image) | Inode |
|---|---|---|
| **Win.Trojan.Netbus-2** | `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` | 10589 |
| **Win.Trojan.Lsadump-1** | `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` | 10600 |
| **Win.Exploit.WinNT-3** | `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` | 10626 |
| **Win.Trojan.Sehole-1** | `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` | 10569 |

All four detections are hacking/exploitation tools stored in the user's `My Documents/EXPLOITATION/` directory, confirming the computer was used to store and potentially deploy malware and exploit tools.

## Hacking Software Inventory

The disk image contains an organized collection of hacking tools across multiple categories:

### Installed Programs (confirmed via Prefetch execution evidence)
- **Cain & Abel** (CAIN25B45.EXE) — password cracking and network sniffing
- **Ethereal 0.10.6** — network packet capture/analysis (installed in `Program Files/Ethereal`)
- **Network Stumbler 0.4.0** (NETSTUMBLER.EXE) — WiFi network discovery/wardriving
- **Look@LAN** — network scanning (installed in `Program Files/Look@LAN`)
- **mIRC 6.12** — IRC client (commonly used for hacking coordination)
- **Anonymizer** — web anonymization tool (installed in `Program Files/Anonymizer`)
- **WinPcap 3.01a** — packet capture driver (prerequisite for sniffing tools)
- **CuteFTP** (CUTE3032.EXE) — FTP client

### Exploitation Toolkit (in `My Documents/EXPLOITATION/`)
- **NetBus** — remote access trojan (NetBus170.zip + NetBus.bad)
- **Brutus** — password brute-force tool
- **John the Ripper** — password cracker (john-16w.zip, john-1.6.tar.gz)
- **L0phtCrack 3** (lc3setup01.exe) — Windows password auditing
- **lsadump2** — LSA secrets dumper
- **pwdump** (versions 1–3) — Windows password hash extractor
- **GetAdmin** — Windows NT privilege escalation exploit
- **SECHOLE** — Windows NT security hole exploit
- **Netcat** — network utility ("Swiss army knife")
- **SMBGrind/Crack** — SMB password brute-forcing
- **VNC/WinVNC** — remote desktop control
- **dsniff 2.3** — network traffic sniffer/credential interceptor
- **NAT** (NetBIOS Auditing Tool)

### Enumeration Tools (in `My Documents/ENUMERATION/`)
- **Cerberus Internet Scanner** — vulnerability scanner
- **enum** — Windows enumeration tool
- **ogre** — network enumeration

### Footprinting Tools (in `My Documents/FOOTPRINTING/`)
- **Nmap NT** — network port scanner (full source code included)
- **NSTPro2** — network scanner
- **SuperScan** — port scanner
- **spade114** — SMTP diagnostic tool

### Other Tools (in `My Documents/COMMANDS/`)
- snitch.exe, user2sid.exe, USERDUMP.EXE, STREAMFIND.EXE, and various other reconnaissance utilities

## Evidence Tying Computer to Suspect

1. **Registry:** RegisteredOwner is "Greg Schardt" — directly matches the suspect's name
2. **User Profile:** The only user account is "Mr. Evil" — the suspect's known online alias
3. **Outlook Express:** A newsgroup database file for **alt.hacking** was found at `Documents and Settings/Mr. Evil/Local Settings/Application Data/Identities/{EF086998-1115-4ECD-9B13-9ADC067B4929}/Microsoft/Outlook Express/alt.hacking.dbx`
4. **Browser Cache:** Internet Explorer cache contains wardriving-related content (e.g., `wardriving[1]`)
5. **Desktop Shortcuts:** `Documents and Settings/Mr. Evil/Desktop/Tools/Shortcut to whois.lnk` — a reconnaissance tool shortcut on the desktop

---

## Case Questions

Case Q1: The operating system is **Microsoft Windows XP** (Version 5.1, Build 2600), installed on August 19, 2004. This was confirmed from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

Case Q2: The registered owner is **Greg Schardt**. This was confirmed from the `RegisteredOwner` value in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

Case Q3: **Yes, there are viruses on the computer.** ClamAV detected four malware signatures after extracting files from the disk image:
  1. **Win.Trojan.Netbus-2** — in `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` (NetBus remote access trojan)
  2. **Win.Trojan.Lsadump-1** — in `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` (LSA credential dumping trojan)
  3. **Win.Exploit.WinNT-3** — in `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` (Windows NT privilege escalation exploit)
  4. **Win.Trojan.Sehole-1** — in `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` (Windows NT security hole exploit)