ClamAV found 4 virus/trojan detections. I now have all the information needed to compile the final report.

---

# Digital Forensic Investigation Report — NIST Hacking Case

## Evidence Summary

- **Evidence**: Dell Latitude CPi notebook computer (Serial # VLQLW), EnCase image `4Dell_Latitude_CPi.E01` / `.E02`
- **Partition layout**: Single NTFS partition starting at sector 63, spanning ~4.87 GB
- **File system**: 12,545 files indexed

## Key Findings

### Operating System and Owner

The SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` reveals:
- **ProductName**: Microsoft Windows XP
- **CurrentVersion**: 5.1
- **CurrentBuildNumber**: 2600
- **RegisteredOwner**: Greg Schardt
- **RegisteredOrganization**: N/A
- **ProductId**: 55274-640-0147306-23684
- **InstallDate**: 2004-08-19 (Unix epoch 1092955707)
- **SystemRoot**: C:\WINDOWS

The primary user profile on the system is **"Mr. Evil"** (`Documents and Settings/Mr. Evil/`), which matches the known online alias of Greg Schardt.

### Hacking Software Found

The disk contains extensive hacking toolkits organized into directories under `My Documents/`:

- **EXPLOITATION/NT/**: Brutus (password cracker), NetBus (remote access trojan), Netcat, Pwdump (password dumping), lsadump2 (LSA secrets dumper), GetAdmin, SecHole, L0phtCrack, John the Ripper, SMBGrind, VNC, NAT, dsniff, fpipe
- **EXPLOITATION/Unix/**: John the Ripper, WinVNC, dsniff 2.3
- **FOOTPRINTING/NT/**: Nmap, SuperScan, NSTPro2, Sam Spade (spade114.exe)
- **ENUMERATION/NT/**: Cerberus Internet Scanner, enum, ogre
- **COMMANDS/**: snitch.exe, user2sid.exe, STREAMFIND.EXE, USERDUMP.EXE

Installed software includes:
- **Ethereal** (network packet analyzer/sniffer) — installed in `Program Files/Ethereal/`
- **Anonymizer Toolbar** — installed in `Program Files/Anonymizer/`
- **Look@LAN** — network scanner in `Program Files/Look@LAN/`
- **Cain & Abel** — password cracker (prefetch file `CAIN25B45.EXE-056F3A6E.pf` confirms execution)

The user also subscribed to the **alt.hacking** newsgroup via Outlook Express (`alt.hacking.dbx`).

### Anti-Virus Scan Results

ClamAV scanning of extracted executables from the disk image detected **4 viruses/trojans**:

| File (inode) | Path on Disk | ClamAV Detection |
|---|---|---|
| inode 10600 | My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe | **Win.Trojan.Lsadump-1** |
| inode 10626 | My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe | **Win.Exploit.WinNT-3** |
| inode 10569 | My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE | **Win.Trojan.Sehole-1** |
| inode 10589 | My Documents/EXPLOITATION/NT/netbus/NetBus170.zip | **Win.Trojan.Netbus-2** |

All four are hacking/exploitation tools classified by ClamAV as trojans or exploits. The remaining extracted files (Brutus CrackUI.exe, smbgrind.exe, SECHOLED.EXE, crack.exe, vncviewer.exe, l0phtcrack installer, netcat zip, ADMINDLL.DLL, dumplsa.dll) were scanned and returned clean (no ClamAV signature matches), though they are still hacking tools by nature.

### Tying the Computer to the Suspect

Multiple artifacts tie this computer to **Greg Schardt**:
1. The Windows XP **RegisteredOwner** is "Greg Schardt"
2. The sole user profile is named **"Mr. Evil"** — the known online alias of Greg Schardt
3. The computer contains a complete hacking toolkit consistent with the described modus operandi (wardriving, intercepting wireless traffic, credential theft)
4. Browser cache contains a reference to **"wardriving"** content, consistent with suspect's known behavior of parking near wireless access points

---

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP** (Version 5.1, Build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** Yes, there are viruses on the computer. ClamAV detected **4 malicious files**:
- `lsadump2.exe` — **Win.Trojan.Lsadump-1**
- `GetAdmin.exe` — **Win.Exploit.WinNT-3**
- `SECHOLE.EXE` — **Win.Trojan.Sehole-1**
- `NetBus170.zip` — **Win.Trojan.Netbus-2**

All four are hacking/exploitation tools stored in the `My Documents/EXPLOITATION/NT/` directory.