ClamAV found 6 malware detections. I now have all the evidence to answer every case question. Here is the final report.

---

# Digital Forensic Investigation Report — NIST Hacking Case

## Evidence Summary

**Evidence Item:** Dell Latitude CPi notebook computer (serial # VLQLW), EnCase image `4Dell_Latitude_CPi.E01` / `.E02`  
**Partition Layout:** Single NTFS partition (offset 63, ~4.6 GB)  
**Filesystem:** 12,545 files indexed  

## Key Findings

### Operating System and Ownership

The Windows registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`) confirms:
- **Product:** Microsoft Windows XP (Version 5.1, Build 2600)
- **Registered Owner:** Greg Schardt
- **Registered Organization:** N/A
- **Install Date:** Unix epoch 1092955707 (2004-08-19)
- **System Root:** C:\WINDOWS

The primary user profile on the system is **"Mr. Evil"** (`Documents and Settings/Mr. Evil/`), which aligns with the suspect's known online nickname. Cookies on the system are filed under "mr. evil" (e.g., `mr. evil@www.netstumbler[2].txt`, `mr. evil@google[1].txt`).

### Hacking Software and Tools

The computer contained an extensive collection of hacking tools organized in categorized directories under `My Documents/`:

| Category | Tools |
|---|---|
| **EXPLOITATION** | Brutus (brute-force), NetBus (RAT), Netcat, Pwdump (1/2/3), lsadump2, L0phtCrack 3, GetAdmin, SecHole, SMBGrind/Crack, VNC, fpipe, John the Ripper, NAT, dsniff |
| **FOOTPRINTING** | Nmap NT (with source), SuperScan, NSTPro2, spade114.exe |
| **ENUMERATION** | Cerberus Internet Scanner, enum, ogre |
| **COMMANDS** | snitch.exe, STREAMFIND.EXE, user2sid.exe, USERDUMP.EXE, whois.exe |

**Installed programs** (in `Program Files/`):
- **Cain & Abel v2.5** — password cracking and network sniffing tool
- **Network Stumbler 0.4.0** — wireless network scanner (wardriving tool)
- **Ethereal 0.10.6** — network protocol analyzer (packet sniffer)
- **Anonymizer** — web anonymization toolbar
- **mIRC** — IRC client
- **Look@LAN** — network monitoring
- **Agent** — newsgroup reader (used for alt.hacking newsgroup)

**Prefetch evidence** (programs that were executed):
CAIN25B45.EXE, NETSTUMBLER.EXE, ETHEREAL.EXE, MIRC.EXE, WHOIS.EXE, PING.EXE, TELNET.EXE, CMD.EXE, among others.

### Evidence of Wardriving Activity

- Network Stumbler installed and executed (prefetch confirms)
- Cookie for `www.netstumbler.com` found in Mr. Evil's browser cookies
- Internet cache file `wardriving[1]` found in temporary internet files
- An external homemade 802.11b antenna and wireless PCMCIA card were recovered with the computer

### Tying the Computer to the Suspect

1. **Registered Owner** in the Windows registry is "Greg Schardt"
2. **User profile** named "Mr. Evil" — the suspect's known alias
3. The alt.hacking newsgroup mailbox (`alt.hacking.dbx`) in Outlook Express
4. Desktop shortcuts to hacking tools (Cain, Ethereal, Network Stumbler, mIRC, whois)

### Anti-Virus Scan Results

ClamAV scan of extracted files from the disk image detected **6 viruses/malware**:

| # | Detection | File | Original Path |
|---|---|---|---|
| 1 | **Win.Trojan.Snitch-1** | snitch.exe | My Documents/COMMANDS/snitch.exe |
| 2 | **Win.Trojan.Lsadump-1** | lsadump2.exe | My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe |
| 3 | **Win.Exploit.WinNT-3** | GetAdmin.exe | My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe |
| 4 | **Win.Trojan.Sehole-1** | SECHOLE.EXE | My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE |
| 5 | **Win.Trojan.Netbus-2** | NetBus170.zip | My Documents/EXPLOITATION/NT/netbus/NetBus170.zip |
| 6 | **Win.Trojan.Cain-9** | Abel.dll | Program Files/Cain/Abel.dll |

Note: Only a subset of the files on the image were extracted and scanned. Additional malware may be present in files not extracted (e.g., additional executables in the hacking tool directories, zip archives containing tools like John the Ripper, L0phtCrack, etc.).

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as identified from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** Yes, there are viruses on the computer. ClamAV detected **6 malware items** among the files extracted from the disk image: **Win.Trojan.Snitch-1** (snitch.exe), **Win.Trojan.Lsadump-1** (lsadump2.exe), **Win.Exploit.WinNT-3** (GetAdmin.exe), **Win.Trojan.Sehole-1** (SECHOLE.EXE), **Win.Trojan.Netbus-2** (NetBus170.zip), and **Win.Trojan.Cain-9** (Abel.dll). These are all hacking/exploitation tools flagged as trojans or exploits by ClamAV's signature database.