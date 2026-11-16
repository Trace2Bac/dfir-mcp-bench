Another detection — NetBus trojan. Now I have all the evidence needed. Here is the final report.

---

# Forensic Investigation Report — NIST Hacking Case

## Case Summary

A Dell CPi notebook computer (serial # VLQLW) was found abandoned with a wireless PCMCIA card and an external homemade 802.11b antenna. This investigation examines the EnCase image `4Dell_Latitude_CPi.E01` to identify the operating system, registered owner, and any malware present on the system.

## Evidence Analyzed

- **Disk Image:** `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` (640 MB, EnCase format with E02 segment)
- **Partition Layout:** Single NTFS partition starting at sector 63 (approximately 4.5 GB)
- **Filesystem:** 12,545 files indexed

## Key Findings

### Operating System
The SOFTWARE registry hive (`Microsoft\Windows NT\CurrentVersion`) reveals:
- **ProductName:** Microsoft Windows XP
- **CurrentVersion:** 5.1
- **CurrentBuildNumber:** 2600
- **BuildLab:** 2600.xpclient.010817-1148
- **SystemRoot:** C:\WINDOWS
- **InstallDate:** 2004-08-19 (Unix epoch 1092955707)

### Registered Owner
- **RegisteredOwner:** Greg Schardt
- **RegisteredOrganization:** N/A
- **ProductId:** 55274-640-0147306-23684

### User Profile
The primary user account on the system is **"Mr. Evil"** (`Documents and Settings/Mr. Evil/`), consistent with the suspect's known online alias.

### Hacking Software Found
The system contains an extensive, organized collection of hacking tools under `My Documents/`, categorized by attack phase:

- **FOOTPRINTING:** NmapNT (network scanner), NSTPro2, SuperScan, Spade
- **ENUMERATION:** enum, Cerberus Internet Scanner, Ogre
- **EXPLOITATION:** Brutus (password cracker), NetBus (remote access trojan), Netcat, John the Ripper, L0phtCrack (lc3setup01.exe), Pwdump (password dumping), lsadump2 (LSA secrets dumping), SMBGrind Crack, sechole, Get Admin, dsniff, fpipe, VNC, NAT
- **COMMANDS:** snitch.exe, user2sid.exe, various enumeration utilities
- **ARCHIVE:** Arj and other archive tools

**Installed Programs:**
- **Ethereal** (v0.10.6) — network packet sniffer (installed in `Program Files/Ethereal/`)
- **Anonymizer Toolbar** — privacy/anonymization tool (installed in `Program Files/Anonymizer/`)
- **Look@LAN** — network scanner (installed in `Program Files/Look@LAN/`)
- **Cain** — Cain & Abel password recovery tool (evidence in Prefetch: `CAIN25B45.EXE-056F3A6E.pf`)
- **WinPcap** — packet capture library (Prefetch: `WINPCAP_3_01_A.EXE`)

**Newsgroup Activity:** The user subscribed to `alt.hacking` newsgroup via Outlook Express (`alt.hacking.dbx`).

**Web Activity:** Browser cache contains references to "wardriving" — consistent with the suspect's reported behavior of intercepting wireless traffic from parked vehicles near hotspots.

### Anti-Virus / Malware Scan Results

ClamAV scanning of the E01 container image returned **clean** (0 detections on the raw image). However, extraction and scanning of individual executables from the EXPLOITATION directory revealed **4 malware detections**:

| File (Inode) | Path | ClamAV Detection |
|---|---|---|
| inode 10600 | `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` | **Win.Trojan.Lsadump-1** |
| inode 10626 | `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` | **Win.Exploit.WinNT-3** |
| inode 10569 | `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` | **Win.Trojan.Sehole-1** |
| inode 10589 | `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` | **Win.Trojan.Netbus-2** |

These are hacking/exploitation tools classified as trojans and exploits by ClamAV — consistent with the tools being used for unauthorized access rather than legitimate purposes.

## Case Questions

**Case Q1:** The computer was running **Microsoft Windows XP** (Version 5.1, Build 2600), as identified from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive value `RegisteredOwner` at `Microsoft\Windows NT\CurrentVersion`. This directly ties the computer to the suspect. The primary user profile on the system is named "Mr. Evil," matching Schardt's known online alias.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **4 malicious files** when scanning extracted executables from the disk image:
1. **Win.Trojan.Lsadump-1** — `lsadump2.exe` (LSA secrets dumping tool)
2. **Win.Exploit.WinNT-3** — `GetAdmin.exe` (privilege escalation exploit)
3. **Win.Trojan.Sehole-1** — `SECHOLE.EXE` (security hole exploitation tool)
4. **Win.Trojan.Netbus-2** — `NetBus170.zip` (NetBus remote access trojan)

All detected malware resides in the `My Documents/EXPLOITATION/NT/` directory, a curated collection of hacking and exploitation tools consistent with the suspected unauthorized computer intrusion activities.