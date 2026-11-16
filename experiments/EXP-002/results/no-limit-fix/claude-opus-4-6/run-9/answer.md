Excellent — ClamAV found 4 malware detections. I now have all the evidence needed to answer every question. Here is the final report.

---

# Digital Forensic Investigation Report — NIST Hacking Case

## Case Overview

A Dell CPi notebook computer (serial # VLQLW) was found abandoned with a wireless PCMCIA card and an external homemade 802.11b antenna. The computer is suspected of being used for hacking, potentially by suspect Greg Schardt (alias "Mr. Evil"), who is believed to have intercepted internet traffic at wireless hotspots.

**Evidence:** EnCase image `4Dell_Latitude_CPi.E01` / `.E02`  
**Partition layout:** Single NTFS partition (sector offset 63, ~4.87 GB)  
**Filesystem:** 12,545 files indexed

## Key Findings

### Operating System
The SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` confirms:
- **ProductName:** Microsoft Windows XP
- **CurrentVersion:** 5.1
- **CurrentBuildNumber:** 2600
- **SystemRoot:** C:\WINDOWS
- **InstallDate:** 2004-08-19 (Unix epoch 1092955707)

### Registered Owner
The registry value `RegisteredOwner` under `Microsoft\Windows NT\CurrentVersion` is set to **Greg Schardt**. The user profile on the machine is named **"Mr. Evil"** (found at `Documents and Settings/Mr. Evil/`), which matches the suspect's known alias.

### Hacking Tools Present
The disk contains an extensive organized collection of hacking tools under `My Documents/`, categorized into attack phases:
- **FOOTPRINTING:** NmapNT (port scanner), SuperScan, NSTPro2, spade114.exe
- **ENUMERATION:** Ogre, Cerberus Internet Scanner, enum
- **EXPLOITATION:** Brutus (password cracker), NetBus (remote access trojan), Netcat, Pwdump (password dumper), lsadump2 (LSA secrets dumper), L0phtCrack (password cracker), GetAdmin, SecHole, SMBGrind, VNC, dsniff, John the Ripper
- **COMMANDS:** snitch.exe, user2sid.exe, various enumeration utilities

**Installed software:** Ethereal (network packet analyzer, v0.10.6), Anonymizer Toolbar, Look@LAN, Cain (prefetch entry `CAIN25B45.EXE`), CuteFTP (`CUTE3032.EXE`)

**Newsgroup activity:** An Outlook Express mailbox `alt.hacking.dbx` was found (inode 11516), indicating the user subscribed to the `alt.hacking` newsgroup.

### Anti-Virus / Malware Scan Results
ClamAV was run on the evidence image files directly (0 detections on the raw E01/E02 containers), and then on extracted hacking tool executables from within the filesystem. **4 malware detections were found:**

| File Path | Inode | ClamAV Detection |
|---|---|---|
| `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` | 10600 | **Win.Trojan.Lsadump-1** |
| `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` | 10626 | **Win.Exploit.WinNT-3** |
| `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` | 10569 | **Win.Trojan.Sehole-1** |
| `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` | 10589 | **Win.Trojan.Netbus-2** |

These are all hacking/exploitation tools classified by ClamAV as trojans or exploits. NetBus is a well-known remote access trojan (RAT), lsadump2 dumps Local Security Authority secrets, GetAdmin exploits a privilege escalation vulnerability in Windows NT, and SecHole exploits a security hole to gain elevated privileges.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (version 5.1, build 2600), as confirmed by the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` registry value under `Microsoft\Windows NT\CurrentVersion` in the SOFTWARE hive. The active user profile on the system is "Mr. Evil," matching the suspect's known alias.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **4 infections** among the hacking tools stored on the disk: **Win.Trojan.Netbus-2** (NetBus170.zip — a remote access trojan), **Win.Trojan.Lsadump-1** (lsadump2.exe — an LSA secrets dumping tool), **Win.Exploit.WinNT-3** (GetAdmin.exe — a Windows NT privilege escalation exploit), and **Win.Trojan.Sehole-1** (SECHOLE.EXE — a security hole exploitation tool). All were located in the `My Documents/EXPLOITATION/NT/` directory.