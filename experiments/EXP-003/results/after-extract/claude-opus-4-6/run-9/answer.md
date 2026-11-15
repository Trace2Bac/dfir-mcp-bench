The same 3 detections. The Recycle Bin items and NetStumbler were clean. I now have all the evidence needed for the final report.

---

# Forensic Investigation Report: NIST Hacking Case

## Case Overview

A Dell CPi notebook computer (serial # VLQLW) was found abandoned with a wireless PCMCIA card and an external homemade 802.11b antenna. The computer is suspected of being used for wireless hacking and internet traffic interception.

## Evidence Analyzed

- **Disk Image**: `4Dell_Latitude_CPi.E01` (EnCase format, ~640 MB)
- **Partition**: NTFS partition starting at sector 63 (9,510,417 sectors)
- **Total files indexed**: 12,545

## Key Findings

### Operating System and Registration

The system registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`) reveals:
- **ProductName**: Microsoft Windows XP
- **CurrentVersion**: 5.1
- **CurrentBuildNumber**: 2600
- **RegisteredOwner**: Greg Schardt
- **RegisteredOrganization**: N/A
- **InstallDate**: 2004-08-19 (Unix timestamp 1092955707)
- **SystemRoot**: C:\WINDOWS

The primary user profile on the system is named **"Mr. Evil"** (matching the known alias of suspect Greg Schardt), located at `Documents and Settings/Mr. Evil/`.

### Anti-Virus Scan Results (ClamAV)

ClamAV detected **3 viruses/malware** among extracted executables from the disk image:

| File | Path on Disk | Detection |
|------|-------------|-----------|
| lsadump2.exe (inode 10600) | My Documents/EXPLOITATION/NT/lsadump2/ | **Win.Trojan.Lsadump-1** |
| GetAdmin.exe (inode 10626) | My Documents/EXPLOITATION/NT/Get Admin/ | **Win.Exploit.WinNT-3** |
| SECHOLE.EXE (inode 10569) | My Documents/EXPLOITATION/NT/sechole/ | **Win.Trojan.Sehole-1** |

All three detections are hacking/exploitation tools classified as trojans or exploits. They are privilege escalation and credential dumping tools stored in the suspect's organized hacking toolkit.

### Hacking Software and Tools

The suspect maintained an extensive, well-organized hacking toolkit under `My Documents/`, categorized into three directories:

**EXPLOITATION/NT/**
- Brutus (password brute-forcer, with NetBus.bad)
- bsniff (network sniffer)
- GetAdmin.exe (privilege escalation exploit)
- Hk (hacking kit)
- John the Ripper (password cracker, john-16w.zip)
- L0phtCrack 3 (lc3setup01.exe, password auditing)
- lsadump2 (LSA secrets dumping tool)
- NAT (NetBIOS auditing tool)
- NetBus (remote administration trojan)
- Netcat (network utility, "Swiss Army knife")
- Pwdump (password hash dumping, versions 1-3)
- SECHOLE.EXE / SECHOLED.EXE (security hole exploits)
- SMBGrind Crack (SMB password cracking)
- VNC / WinVNC (remote desktop)

**EXPLOITATION/Unix/**
- dsniff 2.3 (network sniffing suite)
- John the Ripper (Unix version)
- WinVNC (Linux/Solaris versions)

**FOOTPRINTING/NT/**
- NmapNT (network scanner, with full source code)
- NSTPro2 (network scanning)
- SuperScan (port scanner)
- Spade (spade114.exe, network lookup)

**ENUMERATION/NT/**
- Ogre (enumeration tool)

### Installed Applications (Program Files)

- **Ethereal** (packet capture/analysis, v0.10.6)
- **Network Stumbler** (WiFi network discovery, v0.4.0)
- **WinPcap** (v3.01a, packet capture library)
- **Anonymizer** (privacy/anonymity toolbar)
- **Look@LAN** (network monitoring)
- **Whois** (domain lookup)
- **Agent** (Usenet newsreader)
- **mIRC** (IRC client)

### Program Execution Evidence (Prefetch)

The Windows Prefetch directory confirms execution of these tools:
- CAIN25B45.EXE (Cain & Abel password cracker)
- NETSTUMBLER.EXE (WiFi scanning)
- ETHEREAL.EXE (packet sniffing)
- MIRC.EXE (IRC communications)
- WHOIS.EXE (domain reconnaissance)
- PING.EXE (network probing)
- TELNET.EXE (remote access)
- LOOKATLAN.EXE / LOOKATHOST.EXE (network discovery)

### Newsgroup Subscriptions (Outlook Express)

The Mr. Evil user was subscribed to numerous hacking-related newsgroups:
- alt.2600, alt.2600.cardz, alt.2600.codez, alt.2600.crackz, alt.2600.hackerz, alt.2600.phreakz, alt.2600.programz
- alt.binaries.hacking.beginner, alt.binaries.hacking.computers, alt.binaries.hacking.utilities, alt.binaries.hacking.websites
- alt.hacking, alt.dss.hack
- free.binaries.hacking.* (multiple)
- alt.stupidity.hackers.malicious

### Additional Evidence

- **Cookies**: Browser cookies show visits to www.netstumbler.com (wardriving community)
- **Desktop file**: An "interception" file on the Mr. Evil Desktop (inode 12264)
- **Recycle Bin**: 4 deleted executables (Dc1.exe through Dc4.exe) in the Mr. Evil recycle bin
- **Desktop shortcuts**: Tools folder with shortcuts to Cain v2.5, Ethereal, Network Stumbler, Look@LAN, mIRC, Agent, whois, and others

## Tying the Computer to the Suspect

The computer is tied to **Greg Schardt** through:
1. **Registry registered owner**: "Greg Schardt" in `SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner`
2. **User profile name**: "Mr. Evil" — the known online alias of Greg Schardt
3. **Hacking activities**: Consistent with the reported behavior of intercepting wireless traffic at hotspots (Network Stumbler for WiFi discovery, Ethereal for packet capture, Cain & Abel for password sniffing, Anonymizer for hiding identity)

---

## Case Questions

**Case Q1**: The operating system was **Microsoft Windows XP** (version 5.1, build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2**: The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3**: Yes, ClamAV detected **3 viruses** on the computer:
1. **Win.Trojan.Lsadump-1** — `lsadump2.exe` in `My Documents/EXPLOITATION/NT/lsadump2/` (LSA credential dumping tool)
2. **Win.Exploit.WinNT-3** — `GetAdmin.exe` in `My Documents/EXPLOITATION/NT/Get Admin/` (Windows NT privilege escalation exploit)
3. **Win.Trojan.Sehole-1** — `SECHOLE.EXE` in `My Documents/EXPLOITATION/NT/sechole/` (Windows NT security hole exploit)

All three are hacking/exploitation tools that ClamAV classifies as trojans or exploits. They are part of the suspect's organized hacking toolkit and are consistent with the suspected use of this computer for unauthorized access and credential theft.