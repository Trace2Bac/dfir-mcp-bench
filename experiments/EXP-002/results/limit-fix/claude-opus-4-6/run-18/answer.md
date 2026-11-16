Same 5 detections — the newly extracted files were clean. I now have all the information needed for the final report.

---

# Forensic Investigation Report: NIST Hacking Case

## Case Overview

**Evidence**: Dell CPi notebook computer (Serial # VLQLW), EnCase image `4Dell_Latitude_CPi.E01`/`.E02`  
**Suspect**: Greg Schardt (a.k.a. "Mr. Evil")  
**Disk Layout**: Single NTFS partition (sector 63–9510479)

## Key Findings

### Operating System
The system ran **Microsoft Windows XP**, version 5.1, build 2600 (as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`). The system root was `C:\WINDOWS`.

### Registered Owner
The registered owner is **Greg Schardt** (registry value `RegisteredOwner` under `Microsoft\Windows NT\CurrentVersion` in the SOFTWARE hive). The registered organization is listed as "N/A". The primary user profile on the machine is named **"Mr. Evil"** (at `Documents and Settings/Mr. Evil`), consistent with the suspect's known alias.

### Hacking Software and Evidence of Use
The computer contained an extensive collection of hacking tools organized into methodological categories under `My Documents/`:

- **FOOTPRINTING**: NmapNT (port scanner), SuperScan, Spade (DNS utility), NSTPro2
- **ENUMERATION**: Cerberus Internet Scanner, enum, ogre, DumpSec, user2sid, sid2user
- **EXPLOITATION**: Brutus (password brute-forcer), NetBus (remote access trojan), Netcat, Pwdump (password hash dumper), lsadump2 (LSA secret dumper), L0phtCrack 3, GetAdmin, SecHole, SMBGrind/Crack, VNC, John the Ripper, dsniff, NAT, fpipe
- **COMMANDS**: snitch.exe, STREAMFIND.EXE, various network reconnaissance utilities
- **Installed software**: Ethereal 0.10.6 (packet sniffer/protocol analyzer), Anonymizer toolbar, Look@LAN, mIRC, WinPcap 3.01

Windows Prefetch evidence shows execution of:
- `CAIN25B45.EXE` — Cain & Abel (password recovery/sniffing tool)
- `TELNET.EXE` — used for remote connections
- `WINPCAP_3_01_A.EXE` — packet capture driver installer

The user's Outlook Express contained a subscription to **alt.hacking** newsgroup, and browser history/cache included **wardriving**-related content, corroborating the suspected wireless interception activities.

### Anti-Virus Scan Results (ClamAV)
ClamAV detected **5 malicious files** on the disk:

| Detection | File Path | Inode |
|---|---|---|
| **Win.Trojan.Snitch-1** | My Documents/COMMANDS/snitch.exe | 10277 |
| **Win.Trojan.Lsadump-1** | My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe | 10600 |
| **Win.Exploit.WinNT-3** | My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe | 10626 |
| **Win.Trojan.Sehole-1** | My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE | 10569 |
| **Win.Trojan.Netbus-2** | My Documents/EXPLOITATION/NT/netbus/NetBus170.zip | 10589 |

All detections are hacking/exploitation tools consistent with the suspect's alleged activities.

### Tying the Computer to the Suspect
- The Windows registered owner is **Greg Schardt** — the suspect's real name.
- The sole user account on the machine is **"Mr. Evil"** — the suspect's known alias.
- The suspect's associates reported he would park near wireless access points to intercept traffic; the computer had wardriving content in its browser cache and packet capture tools (Ethereal, WinPcap, Cain & Abel) installed and executed.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (version 5.1, build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** Yes, ClamAV detected **5 viruses/malicious files** on the computer:
1. `Win.Trojan.Snitch-1` in `My Documents/COMMANDS/snitch.exe`
2. `Win.Trojan.Lsadump-1` in `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe`
3. `Win.Exploit.WinNT-3` in `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe`
4. `Win.Trojan.Sehole-1` in `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE`
5. `Win.Trojan.Netbus-2` in `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip`

All are hacking/exploitation tools rather than traditional viruses — they are offensive security tools used for privilege escalation (GetAdmin, SecHole), credential theft (lsadump2), remote access (NetBus), and network reconnaissance (Snitch).