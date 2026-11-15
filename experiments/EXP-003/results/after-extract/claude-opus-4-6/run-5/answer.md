ClamAV detected 6 malware samples. I now have all the evidence needed to answer every question. Here is the final report.

---

# Digital Forensic Investigation Report
## NIST Hacking Case — Dell Latitude CPi (Serial # VLQLW)

### Evidence Summary

**Evidence Image:** `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` (E01 format, ~640 MB, with second segment `.E02`)

**Partition Layout:** Single NTFS partition (sector 63–9510479) on a DOS partition table.

**Filesystem:** 12,545 files indexed from the NTFS volume.

**User Profile:** The sole user account on the system is "Mr. Evil" (under `Documents and Settings/Mr. Evil`).

---

### Registry Findings

From the SOFTWARE hive at `Microsoft\Windows NT\CurrentVersion`:

| Value | Data |
|---|---|
| ProductName | Microsoft Windows XP |
| CurrentVersion | 5.1 |
| CurrentBuildNumber | 2600 |
| RegisteredOwner | Greg Schardt |
| RegisteredOrganization | N/A |
| ProductId | 55274-640-0147306-23684 |
| SystemRoot | C:\WINDOWS |
| InstallDate | 1092955707 (2004-08-19) |

---

### Hacking Software Found

The disk contains an extensive, organized collection of hacking tools under `My Documents/`, categorized by attack phase:

- **FOOTPRINTING:** NmapNT (port scanner with source code), NSTPro2, SuperScan, Spade
- **ENUMERATION:** enum, ogre, Cerberus Internet Scanner
- **EXPLOITATION:** Brutus (password cracker), NetBus (RAT), Netcat, Pwdump (1/2/3), lsadump2, GetAdmin, sechole, SMBGrind Crack, John the Ripper, L0phtCrack (lc3setup01.exe), WinVNC, fpipe, dsniff, NAT, bsniff, elsave
- **COMMANDS:** snitch.exe, user2sid.exe, STREAMFIND.EXE, SRVBOOT.BAT
- **Installed Programs:** Ethereal (packet sniffer), Look@LAN (network scanner), Anonymizer Toolbar, Cain & Abel (evidence from Prefetch: `CAIN25B45.EXE-056F3A6E.pf`)

The Prefetch directory also shows execution of: Cain & Abel, WinPcap installer, Telnet, and CMD.

---

### Anti-Virus Scan Results (ClamAV)

ClamAV was run against extracted executables and archives from the disk image. **6 detections were identified:**

| File (Inode) | Path on Disk | ClamAV Detection |
|---|---|---|
| 10277 | My Documents/COMMANDS/snitch.exe | **Win.Trojan.Snitch-1** |
| 10600 | My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe | **Win.Trojan.Lsadump-1** |
| 10626 | My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe | **Win.Exploit.WinNT-3** |
| 10569 | My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE | **Win.Trojan.Sehole-1** |
| 10589 | My Documents/EXPLOITATION/NT/netbus/NetBus170.zip | **Win.Trojan.Netbus-2** |
| 10526 | My Documents/EXPLOITATION/NT/brutus.zip | **Win.Tool.Brutus-3** |

**Note:** Only a representative subset of executables was extracted and scanned. Additional detections are likely present among the remaining hacking tools on the disk. The container-level ClamAV scan of the E01 files themselves returned no detections, as ClamAV cannot look inside forensic disk images.

---

### Tying the Computer to the Suspect

The computer is directly tied to **Greg Schardt** via:
1. **Registry — RegisteredOwner:** The Windows XP installation is registered to "Greg Schardt" (SOFTWARE hive, `Microsoft\Windows NT\CurrentVersion\RegisteredOwner`).
2. **User Account — "Mr. Evil":** The only user profile on the system is named "Mr. Evil," matching the known online alias of the suspect.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (version 5.1, build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive value `RegisteredOwner` at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **6 threats** among extracted files: **Win.Trojan.Snitch-1** (snitch.exe), **Win.Trojan.Lsadump-1** (lsadump2.exe), **Win.Exploit.WinNT-3** (GetAdmin.exe), **Win.Trojan.Sehole-1** (SECHOLE.EXE), **Win.Trojan.Netbus-2** (NetBus170.zip), and **Win.Tool.Brutus-3** (brutus.zip). These are hacking tools classified as trojans, exploits, and hack tools by ClamAV's signature database.