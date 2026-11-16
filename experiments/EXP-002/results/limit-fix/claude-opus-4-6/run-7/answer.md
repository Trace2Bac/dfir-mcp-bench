Still 4 detections (the same ones). The additional files were clean. I now have all the evidence needed for the report.

---

# Digital Forensic Report — NIST Hacking Case

## Evidence

- **Image:** 4Dell_Latitude_CPi.E01 / E02 (Dell CPi notebook, serial # VLQLW)
- **Partition:** NTFS, sectors 63–9,510,479 (~4.5 GB)

## Findings

### Operating System

The NTFS filesystem contains a Windows XP installation. The SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` confirms:

- **ProductName:** Microsoft Windows XP
- **CurrentVersion:** 5.1
- **CurrentBuildNumber:** 2600
- **SystemRoot:** C:\WINDOWS

### Registered Owner

The SOFTWARE registry key `Microsoft\Windows NT\CurrentVersion\RegisteredOwner` is set to **Greg Schardt**. The active user profile on the system is named **"Mr. Evil"** (located at `Documents and Settings/Mr. Evil`), which matches the known online alias.

### Hacking Software Found

The disk contains extensive collections of hacking tools organized in methodical directories:

| Category | Path | Tools |
|---|---|---|
| **EXPLOITATION** | `My Documents/EXPLOITATION/NT/` | Brutus (password cracker), NetBus (remote access trojan), Netcat, Pwdump (password dumper), lsadump2, GetAdmin, SecHole, L0phtCrack (lc3setup01.exe), SMBGrind/Crack, VNC, NAT, dsniff, John the Ripper, fpipe |
| **FOOTPRINTING** | `My Documents/FOOTPRINTING/NT/` | NmapNT (port scanner), NSTPro2, SuperScan, Spade |
| **ENUMERATION** | `My Documents/ENUMERATION/NT/` | Ogre and related tools |
| **Installed Software** | `Program Files/` | Ethereal 0.10.6 (packet sniffer), Anonymizer Toolbar, Look@LAN, Agent (newsreader used for alt.hacking) |

Windows Prefetch evidence shows **Cain** (`CAIN25B45.EXE-056F3A6E.pf`) was executed on the system, indicating active use of password-cracking software.

The "Mr. Evil" user profile also contains an Outlook Express mailbox for the **alt.hacking** newsgroup (`alt.hacking.dbx`), and browser cache includes pages about **wardriving**.

### Anti-Virus Scan Results (ClamAV)

ClamAV detected **4 viruses/malware** among the extracted files:

| File | Location | ClamAV Detection |
|---|---|---|
| **lsadump2.exe** (inode 10600) | `My Documents/EXPLOITATION/NT/lsadump2/` | **Win.Trojan.Lsadump-1** |
| **GetAdmin.exe** (inode 10626) | `My Documents/EXPLOITATION/NT/Get Admin/` | **Win.Exploit.WinNT-3** |
| **SECHOLE.EXE** (inode 10569) | `My Documents/EXPLOITATION/NT/sechole/` | **Win.Trojan.Sehole-1** |
| **NetBus170.zip** (inode 10589) | `My Documents/EXPLOITATION/NT/netbus/` | **Win.Trojan.Netbus-2** |

### Tying the Computer to the Suspect

- The **registered owner** in the Windows registry is "**Greg Schardt**" — the suspect's real name.
- The active user profile is "**Mr. Evil**" — the suspect's known online alias.
- The tool collection and wardriving-related browser history are consistent with the described behavior of parking near wireless access points to intercept traffic.

---

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP** (version 5.1, build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry value `RegisteredOwner` under `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **4 malicious files**: **Win.Trojan.Lsadump-1** (lsadump2.exe), **Win.Exploit.WinNT-3** (GetAdmin.exe), **Win.Trojan.Sehole-1** (SECHOLE.EXE), and **Win.Trojan.Netbus-2** (NetBus170.zip). All were located in the `My Documents/EXPLOITATION/NT/` directory, which is part of an organized hacking toolkit.