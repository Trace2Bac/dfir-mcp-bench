I now have all the evidence needed to answer every question. Here is the final report.

---

# Digital Forensic Investigation Report — NIST Hacking Case

## Case Overview

A Dell CPi notebook computer (S/N VLQLW) was found abandoned with a wireless PCMCIA card and a homemade 802.11b antenna. The computer is suspected to have been used for hacking purposes and may be tied to suspect Greg Schardt (a.k.a. "Mr. Evil").

## Evidence Analyzed

- **Image:** `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` (EnCase format, ~640 MB)
- **Partition Layout:** Single NTFS partition (sector 63–9510479), 12,545 files indexed

## Findings

### Operating System

The SOFTWARE registry hive (`Microsoft\Windows NT\CurrentVersion`) confirms:
- **ProductName:** Microsoft Windows XP
- **CurrentVersion:** 5.1
- **CurrentBuildNumber:** 2600
- **SystemRoot:** C:\WINDOWS
- **ProductId:** 55274-640-0147306-23684

### Registered Owner

The SOFTWARE registry hive shows:
- **RegisteredOwner:** Greg Schardt
- **RegisteredOrganization:** N/A

This directly ties the computer to the suspect. The user profile on the system is named **"Mr. Evil"** (Documents and Settings/Mr. Evil), consistent with the suspect's known alias.

### Anti-Virus Scan (ClamAV)

ClamAV was run against extracted suspicious executables. **Four detections** were found:

| File Path | Inode | ClamAV Detection |
|---|---|---|
| My Documents/COMMANDS/snitch.exe | 10277 | **Win.Trojan.Snitch-1** |
| My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe | 10600 | **Win.Trojan.Lsadump-1** |
| My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe | 10626 | **Win.Exploit.WinNT-3** |
| My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE | 10569 | **Win.Trojan.Sehole-1** |

### Hacking Software Inventory

The disk contains a well-organized collection of hacking tools under `My Documents/`, categorized by attack phase:

- **EXPLOITATION/NT/**: Brutus (password cracker), NetBus (remote access trojan), Netcat, pwdump (password hash dumper), lsadump2, John the Ripper, L0phtCrack (lc3setup01.exe), GetAdmin, sechole, SMBGrind, VNC, fpipe, elsave, NAT, bsniff
- **EXPLOITATION/Unix/**: dsniff 2.3, John the Ripper (Linux), WinVNC
- **FOOTPRINTING/NT/**: Nmap, SuperScan, NSTPro2, spade114.exe
- **ENUMERATION/NT/**: enum, ogre
- **COMMANDS/**: snitch.exe, STREAMFIND.EXE, user2sid.exe
- **ARCHIVE/**: Arj archiving tools

Installed programs in Program Files include: **Ethereal** (packet sniffer, v0.10.6), **Anonymizer** (toolbar for anonymous browsing), **Look@LAN** (network scanner), and **Agent** (Usenet newsreader — notably used for `alt.hacking` newsgroup per Outlook Express mailbox found at the path shown in file listing).

Prefetch files confirm execution of **CAIN25B45.EXE** (Cain & Abel password recovery tool) and **WINPCAP_3_01_A.EXE** (WinPcap packet capture driver).

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (version 5.1, build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive `RegisteredOwner` value. The user profile on the system is named "Mr. Evil," matching the suspect's known alias.

**Case Q3:** Yes, there are viruses/malicious software on the computer. ClamAV detected **four infections**: (1) **Win.Trojan.Snitch-1** in `My Documents/COMMANDS/snitch.exe`, (2) **Win.Trojan.Lsadump-1** in `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe`, (3) **Win.Exploit.WinNT-3** in `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe`, and (4) **Win.Trojan.Sehole-1** in `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE`. These are all hacking/exploitation tools classified as trojans or exploits by ClamAV.