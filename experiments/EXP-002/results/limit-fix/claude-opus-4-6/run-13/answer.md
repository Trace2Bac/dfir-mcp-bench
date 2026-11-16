Excellent -- 4 malware detections. I now have all the evidence needed for the report.

---

# NIST Hacking Case -- Forensic Investigation Report

## Evidence Summary

**Evidence item:** Dell Latitude CPi notebook computer (Serial # VLQLW), EnCase image `4Dell_Latitude_CPi.E01`/`.E02`  
**Partition layout:** Single NTFS partition starting at sector 63 (approximately 4.5 GB)  
**User profile:** "Mr. Evil" (only non-default user account)

## Key Findings

### Operating System
The registry at `SOFTWARE\Microsoft\Windows NT\CurrentVersion` confirms:
- **ProductName:** Microsoft Windows XP
- **CurrentVersion:** 5.1
- **CurrentBuildNumber:** 2600
- **SystemRoot:** C:\WINDOWS
- **InstallDate:** 2004-08-19 (epoch 1092955707)

### Registered Owner
The same registry key shows:
- **RegisteredOwner:** Greg Schardt
- **RegisteredOrganization:** N/A

This ties the computer directly to the suspect.

### Hacking Software Found
The disk contains extensive hacking tools organized in categories under `My Documents/`:

- **EXPLOITATION/NT/**: Brutus (brute-force), NetBus (remote access trojan), Netcat, Pwdump (password dumper), lsadump2, GetAdmin, sechole, SMBGrind Crack, John the Ripper, L0phtCrack, VNC, fpipe, NAT, elsave
- **EXPLOITATION/Unix/**: dsniff, John the Ripper, VNC
- **FOOTPRINTING/NT/**: NmapNT (port scanner), SuperScan, NSTPro2, spade114, WS Ping Pro Pack, Visual Route
- **ENUMERATION/NT/**: ogre
- **NOVELL/**: bindery, hack.exe, Pandora, USERDUMP, various NDS tools
- **MISCELLANEOUS/**: MSSQL tools, ToneLoc (war dialer), PhoneSweep

**Installed programs (Program Files/):**
- **Cain & Abel** -- password recovery/sniffing tool (Program Files/Cain/)
- **Ethereal 0.10.6** -- network packet analyzer (Program Files/Ethereal/)
- **Look@LAN** -- network scanner
- **Anonymizer** -- anonymous browsing toolbar
- **Network Stumbler** -- wireless network discovery (confirmed by Prefetch)
- **123WASP** -- wireless access point scanner
- **mIRC** -- IRC client
- **Agent** -- Usenet newsreader

**Prefetch evidence of execution** confirms these tools were actually run: CAIN25B45.EXE, ETHEREAL.EXE, NETSTUMBLER.EXE, LOOKATLAN.EXE, LOOKATHOST.EXE, MIRC.EXE, WHOIS.EXE, PING.EXE, TELNET.EXE, WINPCAP_3_01_A.EXE.

The Outlook Express folder contains `alt.hacking.dbx`, showing the user subscribed to the alt.hacking newsgroup.

### Anti-Virus Scan Results (ClamAV)

ClamAV detected **4 viruses/malware** among the extracted executables:

| File | Location on Disk | ClamAV Detection |
|------|-----------------|------------------|
| Abel.dll | Program Files/Cain/Abel.dll | **Win.Trojan.Cain-9** |
| lsadump2.exe | My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe | **Win.Trojan.Lsadump-1** |
| GetAdmin.exe | My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe | **Win.Exploit.WinNT-3** |
| SECHOLE.EXE | My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE | **Win.Trojan.Sehole-1** |

Note: These are hacking/exploit tools classified as malware by ClamAV signatures. Only a subset of executables from the image were extracted and scanned; additional malware may exist among the hundreds of other tools on the disk.

---

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP** (Version 5.1, Build 2600), as identified from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`. This directly ties the computer to the suspect.

**Case Q3:** Yes, ClamAV detected **4 viruses/malware** on the computer: **Win.Trojan.Cain-9** (Abel.dll, part of the Cain & Abel password cracking suite installed in Program Files), **Win.Trojan.Lsadump-1** (lsadump2.exe, an LSA secrets dumping tool), **Win.Exploit.WinNT-3** (GetAdmin.exe, a privilege escalation exploit), and **Win.Trojan.Sehole-1** (SECHOLE.EXE, a Windows NT security hole exploit). All were found in the hacking toolkit directories on the disk.