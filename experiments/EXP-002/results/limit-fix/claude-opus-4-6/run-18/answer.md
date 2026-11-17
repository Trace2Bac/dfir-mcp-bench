Excellent. ClamAV found 3 detections. I now have all the evidence needed to answer every question. Here is the final report.

---

# Forensic Investigation Report — NIST Hacking Case

## Case Overview

A Dell CPi notebook computer (serial # VLQLW) was found abandoned with a wireless PCMCIA card and an external homemade 802.11b antenna. The EnCase image (`4Dell_Latitude_CPi.E01` / `.E02`) was analyzed for ties to suspect Greg Schardt (a.k.a. "Mr. Evil") and for evidence of hacking activity.

## Key Findings

### Operating System and Owner

The SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` reveals:

- **ProductName**: Microsoft Windows XP
- **CurrentVersion**: 5.1
- **CurrentBuildNumber**: 2600
- **RegisteredOwner**: Greg Schardt
- **RegisteredOrganization**: N/A
- **ProductId**: 55274-640-0147306-23684
- **SystemRoot**: C:\WINDOWS
- **InstallDate**: 1092955707 (August 19, 2004)

The sole user profile on the system is **"Mr. Evil"** (located at `Documents and Settings/Mr. Evil/`), which matches the suspect's known online nickname.

### Hacking Software Found

The disk contains organized hacking tool collections under `My Documents/` in directories categorized by attack phase:

- **FOOTPRINTING**: NmapNT (port scanner), NSTPro2, SuperScan, spade114.exe
- **ENUMERATION**: enum, ogre, Cerberus Internet Scanner
- **EXPLOITATION**: Brutus (brute-force), NetBus (remote access trojan), Netcat, Pwdump (password dumper), lsadump2, L0phtCrack (lc3setup01.exe), GetAdmin, SecHole, SMBGrind (SMB password cracker), VNC, NAT, dsniff, John the Ripper, fpipe, elsave
- **COMMANDS**: snitch.exe, user2sid.exe, USERDUMP.EXE, STREAMFIND.EXE

Installed programs in `Program Files/`:
- **Ethereal** (network packet sniffer/analyzer, version 0.10.6)
- **Look@LAN** (network discovery tool)
- **Anonymizer Toolbar** (anonymous browsing)
- **mIRC** (IRC client, commonly used in hacking communities)

Windows Prefetch confirms execution of: `CAIN25B45.EXE` (Cain & Abel password cracker), `TELNET.EXE`, `WINPCAP_3_01_A.EXE` (packet capture driver used by Ethereal/sniffers).

Outlook Express stores a subscription to the **alt.hacking** newsgroup (`alt.hacking.dbx`).

### Anti-Virus Scan Results (ClamAV)

ClamAV scanning of extracted executables from the disk image detected **3 viruses/malware**:

| File Path | ClamAV Signature |
|-----------|-----------------|
| `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` (inode 10600) | **Win.Trojan.Lsadump-1** |
| `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` (inode 10626) | **Win.Exploit.WinNT-3** |
| `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` (inode 10569) | **Win.Trojan.Sehole-1** |

These are all hacking/exploit tools flagged by ClamAV's signature database. The other extracted executables (CrackUI.exe, smbgrind.exe, crack.exe, lc3setup01.exe) were not flagged, though they are nonetheless hacking tools.

### Tying the Computer to the Suspect

- The **registered owner** of the Windows XP installation is **Greg Schardt** — matching the suspect's real name.
- The only user profile is named **"Mr. Evil"** — matching the suspect's known online alias.
- The computer contains extensive, organized hacking tools consistent with the suspect's known activities (wireless interception, credential theft).
- The `alt.hacking` newsgroup subscription and Anonymizer toolbar are consistent with the suspect's described behavior.

---

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP** (version 5.1, build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **3 infections** among files extracted from the disk image:
1. **Win.Trojan.Lsadump-1** — in `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe`
2. **Win.Exploit.WinNT-3** — in `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe`
3. **Win.Trojan.Sehole-1** — in `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE`

All three are hacking/exploitation tools classified as trojans or exploits by ClamAV's signature database.