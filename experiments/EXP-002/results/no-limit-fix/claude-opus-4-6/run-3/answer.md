ClamAV found 4 malware detections inside the disk image. I now have all the evidence needed to answer every question. Here is the final report.

---

# Forensic Investigation Report — NIST Hacking Case

## Case Overview

A Dell CPi notebook (serial # VLQLW) was found abandoned with a wireless PCMCIA card and a homemade 802.11b antenna. The investigation aims to determine if this computer was used for hacking, identify the operating system and owner, and check for malware.

**Evidence**: `4Dell_Latitude_CPi.E01` / `.E02` — an EnCase disk image containing a single NTFS partition (sector offset 63, ~4.5 GB).

## Findings

### Operating System

The Windows registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`) confirms the OS:

- **ProductName**: Microsoft Windows XP
- **CurrentVersion**: 5.1
- **CurrentBuildNumber**: 2600
- **BuildLab**: 2600.xpclient.010817-1148
- **SystemRoot**: C:\WINDOWS
- **InstallDate**: 2004-08-19 (Unix epoch 1092955707)

### Registered Owner

From the same registry key:

- **RegisteredOwner**: Greg Schardt
- **RegisteredOrganization**: N/A
- **ProductId**: 55274-640-0147306-23684

The primary user profile on the system is named **"Mr. Evil"** (`Documents and Settings/Mr. Evil/`), consistent with the known alias of the suspect. An Outlook Express mailbox file `alt.hacking.dbx` was found under this profile, indicating participation in the alt.hacking newsgroup.

### Anti-Virus Scan (ClamAV)

ClamAV was run on both the raw E01 evidence files and on individual executables extracted from the disk image by inode. The raw E01 container scan returned clean. However, scanning extracted hacking tool executables revealed **4 malware detections**:

| File (Disk Path) | Inode | ClamAV Signature |
|---|---|---|
| `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` | 10600 | **Win.Trojan.Lsadump-1** |
| `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` | 10626 | **Win.Exploit.WinNT-3** |
| `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` | 10569 | **Win.Trojan.Sehole-1** |
| `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` | 10589 | **Win.Trojan.Netbus-2** |

These are all well-known hacking/exploitation tools classified by ClamAV as trojans or exploits.

### Hacking Tools Found on Disk

The `My Documents` folder is organized into categories consistent with a hacking methodology:

- **FOOTPRINTING**: NmapNT (port scanner), SuperScan, NSTPro2, spade114.exe
- **ENUMERATION**: Ogre (NetBIOS enumeration tool)
- **EXPLOITATION**: Brutus (password brute-forcer), NetBus (remote access trojan), Netcat, Pwdump (1/2/3 — SAM hash dumpers), L0phtCrack 3 (password cracker), John the Ripper, lsadump2 (LSA secret dumper), GetAdmin (privilege escalation), SecHole (privilege escalation), SMBGrind/Crack, VNC, dsniff, fpipe, NAT, elsave
- **ARCHIVE**: ARJ archiving tools

Additionally installed software:
- **Ethereal** (packet sniffer, now Wireshark) — installed in Program Files
- **Anonymizer Toolbar** — for anonymous web browsing
- **Cain & Abel** (CAIN25B45.EXE) — confirmed via Windows Prefetch execution history

The Prefetch directory also shows execution of `CAIN25B45.EXE`, proving the tool was actively used, not just stored.

---

## Case Questions

**Case Q1**: The operating system was **Microsoft Windows XP** (version 5.1, build 2600), as confirmed by the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2**: The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`. The system's user profile is named "Mr. Evil," matching the suspect's known alias.

**Case Q3**: **Yes, there are viruses/malware on the computer.** ClamAV detected 4 infections among extracted files from the disk image:
1. **Win.Trojan.Netbus-2** — `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` (remote access trojan)
2. **Win.Trojan.Lsadump-1** — `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` (credential dumping trojan)
3. **Win.Exploit.WinNT-3** — `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` (privilege escalation exploit)
4. **Win.Trojan.Sehole-1** — `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` (privilege escalation trojan)