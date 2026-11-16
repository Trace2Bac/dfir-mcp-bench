ClamAV found 3 malware detections. I now have all evidence needed to answer the case questions. Here is the final report.

---

# Digital Forensic Investigation Report — NIST Hacking Case

## Case Overview

A Dell CPi notebook computer (serial #VLQLW) was found abandoned with wireless hacking equipment. The investigation examines the EnCase disk image (`4Dell_Latitude_CPi.E01`) to identify the operating system, registered owner, and presence of malware or hacking tools.

## Evidence Analyzed

- **Disk Image:** `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` (640 MB, E01 format)
- **Partition Layout:** Single NTFS partition (sectors 63–9,510,479), ~4.5 GB
- **Filesystem:** 12,545 files indexed

## Key Findings

### Operating System
The Windows registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`) confirms:
- **ProductName:** Microsoft Windows XP
- **CurrentVersion:** 5.1
- **CurrentBuildNumber:** 2600
- **SystemRoot:** C:\WINDOWS
- **InstallDate:** 2004-08-19 (epoch 1092955707)

### Registered Owner
The registry value `RegisteredOwner` under the same key reads **Greg Schardt**, with `RegisteredOrganization` set to "N/A". The active user profile on the system is named **"Mr. Evil"** (located at `Documents and Settings/Mr. Evil/`), matching the known online alias of the suspect.

### Hacking Tools Present
The disk contains an extensive organized collection of hacking tools under `My Documents/`, categorized by attack phase:
- **FOOTPRINTING:** NmapNT (port scanner), NSTPro2, SuperScan, Spade
- **ENUMERATION:** Enum, Cerberus Internet Scanner, Ogre
- **EXPLOITATION:** Brutus (password cracker), NetBus (remote access trojan), Netcat, Pwdump (password dump), lsadump2, L0phtCrack, GetAdmin, SecHole, SMBGrind, VNC, dsniff, John the Ripper
- **COMMANDS:** snitch.exe, user2sid.exe, various recon utilities

**Installed programs** include:
- **Ethereal** (network packet sniffer) — installed in `Program Files/Ethereal/`
- **Cain & Abel** (password recovery) — execution confirmed via Prefetch (`CAIN25B45.EXE-056F3A6E.pf`)
- **mIRC** (IRC client, commonly used for hacker communication)
- **Look@LAN** (network discovery)
- **Anonymizer Toolbar** (anonymous browsing)

**Outlook Express** contains a newsgroup mailbox for **alt.hacking** (`alt.hacking.dbx`), and browser cache references **wardriving** content.

### Anti-Virus / Malware Scan Results
ClamAV scan of extracted executables identified **3 malware detections**:

| File | Path | ClamAV Detection |
|------|------|-----------------|
| lsadump2.exe | My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe | **Win.Trojan.Lsadump-1** |
| GetAdmin.exe | My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe | **Win.Exploit.WinNT-3** |
| SECHOLE.EXE | My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE | **Win.Trojan.Sehole-1** |

These are all hacking/exploitation tools classified as malicious by ClamAV's signature database.

---

## Case Questions

**Case Q1:** The computer was running **Microsoft Windows XP** (Version 5.1, Build 2600), as confirmed by the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` registry value under `SOFTWARE\Microsoft\Windows NT\CurrentVersion`. The user profile on the system is named "Mr. Evil," matching the suspect's known alias.

**Case Q3:** Yes, ClamAV detected **3 viruses/malware** on the computer:
1. **Win.Trojan.Lsadump-1** — in `lsadump2.exe` (LSA secret dumping tool)
2. **Win.Exploit.WinNT-3** — in `GetAdmin.exe` (privilege escalation exploit)
3. **Win.Trojan.Sehole-1** — in `SECHOLE.EXE` (Windows NT security hole exploit)

All three are hacking tools stored in the `My Documents/EXPLOITATION/NT/` directory, consistent with the suspect's alleged activities.