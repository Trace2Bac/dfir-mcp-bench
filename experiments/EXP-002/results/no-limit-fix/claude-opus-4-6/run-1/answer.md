Same 4 detections — the newly extracted files (SECHOLED.EXE, vncviewer.exe, GrindUI.exe, VNC SETUP.EXE, GASYS.DLL) were clean. I now have all the evidence needed to answer the case questions.

---

# Final Forensic Report — NIST Hacking Case

## Evidence Examined

- **Image**: `4Dell_Latitude_CPi.E01` / `.E02` (EnCase format, ~640 MB)
- **Partition**: NTFS partition at sector offset 63 (sectors 63–9,510,479)
- **Files indexed**: 12,545 files

## Key Findings

### Operating System
The Windows registry (SOFTWARE hive, `Microsoft\Windows NT\CurrentVersion`) identifies the OS as **Microsoft Windows XP**, Version 5.1, Build 2600 (Build Lab: `2600.xpclient.010817-1148`). The system root was `C:\WINDOWS`, installed from `D:\`. The install date translates to August 19, 2004.

### Registered Owner
The `RegisteredOwner` registry value is **Greg Schardt**. The `RegisteredOrganization` is "N/A". The active user profile on the system is named **"Mr. Evil"**, consistent with the suspect's known alias. The Product ID is `55274-640-0147306-23684`.

### Anti-Virus Scan Results
ClamAV was run against the raw disk image (0 detections on the E01/E02 containers), and then against individually extracted suspicious executables from the `My Documents/EXPLOITATION/` directory tree. **Four (4) malware detections** were identified:

| Detection | File | Location (Path on Disk) |
|---|---|---|
| **Win.Trojan.Netbus-2** | NetBus170.zip (inode 10589) | My Documents/EXPLOITATION/NT/netbus/NetBus170.zip |
| **Win.Trojan.Lsadump-1** | lsadump2.exe (inode 10600) | My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe |
| **Win.Exploit.WinNT-3** | GetAdmin.exe (inode 10626) | My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe |
| **Win.Trojan.Sehole-1** | SECHOLE.EXE (inode 10569) | My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE |

### Hacking Software Inventory (Additional Context)
The filesystem contains an organized hacking toolkit under `My Documents/` arranged by attack phase:
- **FOOTPRINTING**: Nmap (nmapNT), SuperScan, Sam Spade (spade114.exe), NST Pro
- **ENUMERATION**: enum, ogre, Cerberus Internet Scanner
- **EXPLOITATION**: Brutus (brute-forcer), NetBus (RAT), Netcat, Pwdump (1/2/3), lsadump2, GetAdmin, SecHole, SMBGrind, John the Ripper, L0phtCrack (lc3setup01.exe), VNC, dsniff, fpipe, NAT
- **COMMANDS**: snitch.exe, user2sid.exe, STREAMFIND.EXE, and various utility scripts

Installed programs include **Ethereal** (packet sniffer, in `Program Files/Ethereal/`) and **Anonymizer Toolbar** (in `Program Files/Anonymizer/`). The Prefetch directory shows **CAIN25B45.EXE** was executed (Cain & Abel password recovery/sniffing tool). The user's Outlook Express data includes a subscription to the **alt.hacking** newsgroup. Internet Explorer cache contains **wardriving** content, consistent with the suspect's known MO of intercepting wireless traffic.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **4 infected files**, all located in the `My Documents/EXPLOITATION/NT/` directory:
1. **Win.Trojan.Netbus-2** — `NetBus170.zip` (NetBus remote access trojan)
2. **Win.Trojan.Lsadump-1** — `lsadump2.exe` (credential dumping tool)
3. **Win.Exploit.WinNT-3** — `GetAdmin.exe` (Windows NT privilege escalation exploit)
4. **Win.Trojan.Sehole-1** — `SECHOLE.EXE` (Windows NT security hole exploit)