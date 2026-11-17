Excellent. I now have all the evidence needed to answer every question. Here is the final report.

---

# Forensic Investigation Report — NIST Hacking Case

## Case Overview

A Dell CPi notebook computer (serial # VLQLW) was found abandoned with a wireless PCMCIA card and an external homemade 802.11b antenna. The EnCase image (`4Dell_Latitude_CPi.E01` / `.E02`) was analyzed to determine the operating system, registered owner, and presence of viruses or malware.

## Evidence Analyzed

- **Disk Image**: `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` (640 MB, single NTFS partition starting at sector 63)
- **Filesystem**: 12,545 files indexed across the NTFS partition
- **Registry Hives**: SOFTWARE hive queried for OS and owner information
- **ClamAV Scan**: Executables extracted from the image and scanned for malware signatures

## Key Findings

### Operating System
The SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` confirms:
- **ProductName**: Microsoft Windows XP
- **CurrentVersion**: 5.1
- **CurrentBuildNumber**: 2600
- **BuildLab**: 2600.xpclient.010817-1148
- **SystemRoot**: C:\WINDOWS

### Registered Owner
From the same registry key:
- **RegisteredOwner**: Greg Schardt
- **RegisteredOrganization**: N/A
- **ProductId**: 55274-640-0147306-23684

The primary user profile on the system is named **"Mr. Evil"** (found at `Documents and Settings/Mr. Evil/`), consistent with the suspect's known online nickname.

### Anti-Virus Scan Results
ClamAV was run on executables extracted from the disk image. **Four (4) malware detections were found**:

| File Path | ClamAV Signature | Description |
|---|---|---|
| `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` (inode 10600) | **Win.Trojan.Lsadump-1** | LSA secrets dumping tool |
| `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` (inode 10626) | **Win.Exploit.WinNT-3** | Windows NT privilege escalation exploit |
| `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` (inode 10569) | **Win.Trojan.Sehole-1** | Security hole exploit tool |
| `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` (inode 10589) | **Win.Trojan.Netbus-2** | NetBus remote access trojan |

### Additional Hacking Software Found
The `My Documents` directory is organized into hacking methodology categories:
- **FOOTPRINTING**: Nmap NT (port scanner), SuperScan, NSTPro2, Spade
- **ENUMERATION**: Cerberus Internet Scanner, enum, ogre
- **EXPLOITATION**: Brutus (password cracker), NetBus (RAT), Netcat, Pwdump (password dumper), L0phtCrack (lc3setup01.exe), John the Ripper, dsniff (packet sniffer), SMBGrind, VNC, sechole, GetAdmin, lsadump2, fpipe
- **COMMANDS**: snitch.exe, user2sid.exe, STREAMFIND.EXE

Installed programs include:
- **Ethereal** (network packet sniffer, now Wireshark) — installed at `Program Files/Ethereal/`
- **Anonymizer** toolbar — installed at `Program Files/Anonymizer/`
- **Cain & Abel** — execution confirmed via Prefetch (`WINDOWS/Prefetch/CAIN25B45.EXE-056F3A6E.pf`)
- **mIRC** — Start Menu shortcut present
- **Agent** (Usenet newsreader) — installed at `Program Files/Agent/`

Evidence of newsgroup activity in `alt.hacking` was found in Outlook Express data (`alt.hacking.dbx`).

Network neighborhood entries show connections to a machine named "Andrews-1" (`Documents and Settings/Mr. Evil/NetHood/`).

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as confirmed by the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`. This ties the computer to the suspect. The primary user profile is named "Mr. Evil," consistent with the suspect's known alias.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **4 infections** among extracted files:
1. **Win.Trojan.Lsadump-1** — `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe`
2. **Win.Exploit.WinNT-3** — `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe`
3. **Win.Trojan.Sehole-1** — `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE`
4. **Win.Trojan.Netbus-2** — `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip`

These are all hacking/exploitation tools classified as trojans or exploits by ClamAV. The computer contained an extensive collection of hacking software organized by attack methodology, consistent with use for unauthorized network intrusion activities.