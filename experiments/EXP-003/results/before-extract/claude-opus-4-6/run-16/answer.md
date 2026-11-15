ClamAV found 3 malware detections. I now have all the evidence needed to answer every question. Here is the final report.

---

# Digital Forensic Investigation Report — NIST Hacking Case

## Case Summary

A Dell CPi notebook computer (serial # VLQLW) was found abandoned with wireless hacking equipment. The investigation sought to identify the operating system, the registered owner, and any malware present on the machine, with the goal of tying the computer to suspect Greg Schardt (aka "Mr. Evil").

## Evidence Analyzed

- **Disk Image**: `4Dell_Latitude_CPi.E01` (EnCase format, ~640 MB)
- **Partition Layout**: Single NTFS partition starting at sector 63, spanning ~4.87 GB
- **Total files indexed**: 12,545

## Key Findings

### Operating System
The Windows registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`) confirms:
- **ProductName**: Microsoft Windows XP
- **CurrentVersion**: 5.1
- **CurrentBuildNumber**: 2600
- **BuildLab**: 2600.xpclient.010817-1148
- **SystemRoot**: C:\WINDOWS
- **Install Date**: 2004-08-19 (Unix epoch 1092955707)

### Registered Owner
From the same registry key:
- **RegisteredOwner**: Greg Schardt
- **RegisteredOrganization**: N/A
- **ProductId**: 55274-640-0147306-23684

This directly ties the computer to the suspect.

### User Profile
The active user profile on the system is named **"Mr. Evil"** (`Documents and Settings/Mr. Evil/`), matching the suspect's known online alias.

### Anti-Virus Scan Results
ClamAV scanning of extracted executables from the disk image detected **3 viruses/malware**:

| File Path | ClamAV Detection | Description |
|---|---|---|
| `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` (inode 10600) | **Win.Trojan.Lsadump-1** | LSA secrets dumping tool — extracts cached passwords from Windows |
| `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` (inode 10626) | **Win.Exploit.WinNT-3** | Privilege escalation exploit for Windows NT |
| `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` (inode 10569) | **Win.Trojan.Sehole-1** | Security hole exploit — elevates user privileges to Administrator |

### Hacking Software Inventory
The disk contains an extensive, organized collection of hacking tools under `My Documents/`, categorized by attack phase:

- **EXPLOITATION/NT/**: Brutus (password brute-forcer), NetBus (remote access trojan), Netcat, Pwdump (password hash dumper), L0phtCrack (lc3setup01.exe), lsadump2, GetAdmin, SecHole, SMBGrind, VNC, John the Ripper, dsniff
- **FOOTPRINTING/NT/**: NmapNT (port scanner), SuperScan, NSTPro2, spade114
- **ENUMERATION/NT/**: Cerberus Internet Scanner, enum, ogre
- **COMMANDS/**: snitch.exe, user2sid.exe, STREAMFIND.EXE

### Installed Network Analysis Software
- **Ethereal 0.10.6** (packet sniffer, installed under `Program Files/Ethereal/`)
- **WinPcap 3.01** (packet capture driver, confirmed via Prefetch: `WINPCAP_3_01_A.EXE`)
- **Cain & Abel** (confirmed via Prefetch: `CAIN25B45.EXE`)
- **Look@LAN** (network discovery tool, under `Program Files/Look@LAN/`)
- **Anonymizer Toolbar** (under `Program Files/Anonymizer/`)

### Evidence of Hacking Activity
- Outlook Express mailbox for the **alt.hacking** newsgroup found at `Documents and Settings/Mr. Evil/.../alt.hacking.dbx`
- Internet cache contains **wardriving**-related content
- Prefetch files confirm execution of Cain, Ethereal/WinPcap, and command-line tools

---

## Case Questions

**Case Q1**: The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as confirmed by the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2**: The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`. The user profile on the system is named "Mr. Evil," matching Schardt's known online alias.

**Case Q3**: Yes, ClamAV detected **3 viruses** on the computer:
1. **Win.Trojan.Lsadump-1** — in `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` (credential dumping tool)
2. **Win.Exploit.WinNT-3** — in `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` (privilege escalation exploit)
3. **Win.Trojan.Sehole-1** — in `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` (privilege escalation exploit)

All three are hacking/exploitation tools stored in the suspect's organized hacking toolkit directory.