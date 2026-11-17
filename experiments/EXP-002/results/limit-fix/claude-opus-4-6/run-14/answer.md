I now have all the information needed to answer the case questions. Let me compile the final report.

---

# Digital Forensic Investigation Report — NIST Hacking Case

## Case Overview

A Dell CPi notebook computer (serial # VLQLW) was found abandoned along with a wireless PCMCIA card and an external homemade 802.11b antenna. The computer is suspected to have been used for hacking and wireless interception (wardriving). The investigation aims to tie the computer to suspect Greg Schardt (alias "Mr. Evil") and identify any hacking software, evidence of use, and malware.

## Evidence Analyzed

- **Disk Image:** `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` (with segment `.E02`)
- **Partition Layout:** Single NTFS partition (sector 63–9510479)
- **Filesystem:** 12,545 files indexed

## Key Findings

### 1. Operating System and Registration

From the Windows registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`):
- **Product Name:** Microsoft Windows XP (version 5.1, build 2600)
- **Registered Owner:** Greg Schardt
- **Registered Organization:** N/A
- **Product ID:** 55274-640-0147306-23684
- **Install Date:** August 19, 2004 (Unix epoch 1092955707)
- **System Root:** C:\WINDOWS

### 2. User Profile — "Mr. Evil"

The primary user profile is `Documents and Settings/Mr. Evil`, directly linking to the suspect's known alias. Desktop shortcuts found in the "Tools" folder include:
- Cain v2.5, Ethereal, Network Stumbler, mIRC, Look@LAN, Look@Host, Agent (newsreader), CuteFTP, CuteHTML, 123 WASP, Faber Toys, and a "whois" shortcut.

### 3. Hacking Software Found

**Installed programs (Program Files):**
- **Cain & Abel v2.5** (`Program Files/Cain/`) — Password cracking and network sniffing tool with ARP poisoning capability. Includes Abel.exe, Abel.dll, Cain.exe, wordlists, and captured credential lists (HTTP, FTP, SMTP, POP3, IMAP, SMB, SSH, VNC, TELNET, HTTPS, RADIUS, ICQ, MSN, NNTP, Kerberos, IKE-PSK).
- **Ethereal 0.10.6** (`Program Files/Ethereal/`) — Network packet analyzer (precursor to Wireshark)
- **Look@LAN** (`Program Files/Look@LAN/`) — Network discovery tool
- **Anonymizer** (`Program Files/Anonymizer/`) — Web anonymization toolbar
- **Network Stumbler** — Wireless network scanner (linked from Start Menu and Desktop)
- **mIRC** — IRC client (linked from Start Menu)

**Hacking tool collections (My Documents):**
- `My Documents/EXPLOITATION/NT/` — Brutus (password cracker), NetBus (remote access trojan), Netcat, Pwdump (1, 2, 3), lsadump2, GetAdmin, sechole, l0pht301 (L0phtCrack), SMBGrind Crack, VNC, WinVNC, fpipe, NAT, elsave, John the Ripper, bsniff
- `My Documents/EXPLOITATION/Unix/` — dsniff 2.3, John the Ripper, WinVNC (Linux/Solaris)
- `My Documents/ENUMERATION/NT/` — ogre, NSTPro2, and more
- `My Documents/FOOTPRINTING/NT/` — NmapNT (with source code, drivers), SuperScan, spade114.exe, NSTPro2
- `My Documents/ARCHIVE/` — ARJ archiving tools
- `My Documents/NOVELL/` — Novell network utilities

### 4. Evidence of Hacking Activity

**Prefetch evidence** (programs that were executed):
- `CAIN25B45.EXE` — Cain was actively used
- Other prefetch files confirm regular system use

**Outlook Express newsgroup subscriptions** (hacking-related):
- alt.2600, alt.2600.cardz, alt.2600.codez, alt.2600.crackz, alt.2600.hackerz, alt.2600.moderated, alt.2600.phreakz, alt.2600.programz
- alt.binaries.hacking.beginner, alt.binaries.hacking.computers, alt.binaries.hacking.utilities, alt.binaries.hacking.websites
- alt.dss.hack, alt.hacking

**Browser activity:**
- Cookie for `www.netstumbler.com` (wardriving community site)
- Cached content includes "wardriving" material
- An "interception" file in the user's home directory (`Documents and Settings/Mr. Evil/interception`)

**Cain captured credentials** — Multiple `.LST` files in `Program Files/Cain/` for protocols including HTTP, HTTPS, FTP, SMTP, POP3, IMAP, SMB, SSH-1, VNC, TELNET, RADIUS, ICQ, MSN, NNTP, TDS, Kerberos (K5), IKE-PSK, suggesting active network interception.

### 5. Anti-Virus Scan Results

ClamAV detected **5 viruses/malware** in extracted files from the disk image:

| File Path | Inode | ClamAV Detection |
|---|---|---|
| `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` | 10600 | **Win.Trojan.Lsadump-1** |
| `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` | 10626 | **Win.Exploit.WinNT-3** |
| `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` | 10569 | **Win.Trojan.Sehole-1** |
| `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` | 10589 | **Win.Trojan.Netbus-2** |
| `Program Files/Cain/Abel.dll` | 9958 | **Win.Trojan.Cain-9** |

Note: The initial ClamAV scan of the raw E01 container files reported "OK" because ClamAV cannot open EnCase disk images — it scanned only the container, not the files within. The detections above were obtained by extracting 15 suspicious executables from inside the disk image using TSK `icat` and scanning the extracted files with ClamAV.

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (version 5.1, build 2600), as identified from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` (ProductName = "Microsoft Windows XP", CurrentVersion = "5.1", CurrentBuildNumber = "2600").

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion\RegisteredOwner`. This directly ties the computer to the suspect. The active user profile on the system is named "Mr. Evil," matching the suspect's known online alias.

**Case Q3:** Yes, there are viruses on the computer. ClamAV detected **5 malware items** after extracting files from the disk image:
1. **Win.Trojan.Lsadump-1** — `lsadump2.exe` (LSA secrets dumping tool)
2. **Win.Exploit.WinNT-3** — `GetAdmin.exe` (privilege escalation exploit)
3. **Win.Trojan.Sehole-1** — `SECHOLE.EXE` (security hole exploit)
4. **Win.Trojan.Netbus-2** — `NetBus170.zip` (remote access trojan)
5. **Win.Trojan.Cain-9** — `Abel.dll` (component of Cain & Abel password cracking suite, installed in Program Files)