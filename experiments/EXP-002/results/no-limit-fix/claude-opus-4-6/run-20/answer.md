The same 4 detections — the newly extracted Cain/Abel/SMBGrind files came back clean. I now have all the evidence needed for the final report.

---

# Forensic Analysis Report: NIST Hacking Case — Dell Latitude CPi (S/N VLQLW)

## Evidence Summary

**Image:** `4Dell_Latitude_CPi.E01` / `.E02` (EnCase format, ~640 MB)
**Partition:** Single NTFS partition at sector 63 (9,510,417 sectors)
**Files indexed:** 12,545

## System Identification

- **OS:** Microsoft Windows XP, Version 5.1, Build 2600 (Uniprocessor Free)
- **System Root:** `C:\WINDOWS`
- **Install Date:** Epoch 1092955707 (2004-08-19)
- **Product ID:** 55274-640-0147306-23684
- **Registered Owner:** Greg Schardt
- **Registered Organization:** N/A

## User Profile: "Mr. Evil"

The primary user account on the system is `Mr. Evil` (under `Documents and Settings/Mr. Evil`). The desktop contains a `Tools` folder with shortcuts to hacking and reconnaissance tools:

- Cain v2.5 (password cracking/ARP spoofing)
- Ethereal (network packet capture)
- Network Stumbler (wireless network discovery/wardriving)
- Look@LAN / Look@Host (network scanning)
- Agent (Usenet newsreader)
- mIRC (IRC client)
- CuteFTP / CuteHTML
- 123 WASP
- whois

## Hacking Tool Arsenal

The `My Documents` directory is organized into a methodical hacking toolkit:

| Category | Directory | Tools |
|---|---|---|
| **FOOTPRINTING** | `My Documents/FOOTPRINTING/NT/` | NmapNT (port scanner with source), SuperScan, Spade, NSTPro2 |
| **ENUMERATION** | `My Documents/ENUMERATION/NT/` | Cerberus Internet Scanner, enum, ogre |
| **EXPLOITATION** | `My Documents/EXPLOITATION/NT/` | Brutus (brute forcer), NetBus (trojan), Netcat, Pwdump (1/2/3), lsadump2, GetAdmin, SecHole, L0phtCrack 3, John the Ripper, SMBGrind/CrackUI, VNC, NAT, fpipe, bsniff |
| **EXPLOITATION** | `My Documents/EXPLOITATION/Unix/` | dsniff 2.3, John the Ripper (Unix), VNC (Linux/Solaris) |
| **COMMANDS** | `My Documents/COMMANDS/` | snitch.exe, user2sid.exe, STREAMFIND.EXE, SRVBOOT.BAT |

## Installed Hacking Software (Program Files)

- **Cain & Abel v2.5** — `Program Files/Cain/` — ARP poisoning, password sniffing & cracking tool with captured session lists (APR.LST, HOSTS.LST, HTTP.LST, FTP.LST, SMB.LST, VNC.LST, etc.)
- **Ethereal 0.10.6** — `Program Files/Ethereal/` — Network packet analyzer
- **Look@LAN** — `Program Files/Look@LAN/` — Network discovery tool
- **Anonymizer Toolbar** — `Program Files/Anonymizer/` — Web anonymization
- **Network Stumbler** — Evidence in Prefetch and Desktop shortcuts — Wireless wardriving tool

## Evidence of Hacking Newsgroup Activity

Outlook Express mailboxes show subscriptions to numerous hacking-related Usenet newsgroups:

- `alt.hacking`
- `alt.2600` (and sub-groups: .cardz, .codez, .crackz, .hackerz, .phreakz, .programz, .moderated)
- `alt.binaries.hacking.beginner`, `.computers`, `.utilities`, `.websites`
- `alt.dss.hack`

## Internet Activity

Cookies show browsing to `www.netstumbler.com` (wardriving community), CNN, MSN, Google, Yahoo, and an `interception` file found on the desktop (`Documents and Settings/Mr. Evil/interception`).

## Anti-Virus Scan Results (ClamAV)

ClamAV detected **4 viruses/malware** among extracted files:

| Detection | File | Path on Disk |
|---|---|---|
| **Win.Trojan.Lsadump-1** | lsadump2.exe (inode 10600) | `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` |
| **Win.Exploit.WinNT-3** | GetAdmin.exe (inode 10626) | `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` |
| **Win.Trojan.Sehole-1** | SECHOLE.EXE (inode 10569) | `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` |
| **Win.Trojan.Netbus-2** | NetBus170.zip (inode 10589) | `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` |

Other hacking tools (Cain.exe, Abel.exe, CrackUI.exe, smbgrind.exe, L0phtCrack installer) were not flagged by ClamAV but are recognized hacking/exploitation utilities.

## Tying the Computer to the Suspect

1. **Registered Owner** in the Windows registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner`) is **"Greg Schardt"**.
2. The primary user account is **"Mr. Evil"** — the known online alias of Greg Schardt.
3. The Prefetch file `CAIN25B45.EXE-056F3A6E.pf` confirms Cain was executed on this system.
4. Wardriving evidence (Network Stumbler shortcuts, `wardriving[1]` in IE cache, netstumbler.com cookies) is consistent with the suspect's known MO of parking near wireless access points.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** Yes, there are viruses on the computer. ClamAV detected **4 malware instances** among the files on the disk:
1. **Win.Trojan.Lsadump-1** — `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe`
2. **Win.Exploit.WinNT-3** — `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe`
3. **Win.Trojan.Sehole-1** — `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE`
4. **Win.Trojan.Netbus-2** — `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip`