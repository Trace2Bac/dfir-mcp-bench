One additional detection found (snitch.exe). Now I have 5 unique malware detections. I have all the evidence needed for the final report.

---

# Final Forensic Report — NIST Hacking Case

## Evidence Examined

- **Disk Image:** `4Dell_Latitude_CPi.E01` (640 MB, EnCase format, with second segment `.E02`)
- **Computer:** Dell Latitude CPi notebook, serial # VLQLW
- **Filesystem:** NTFS partition starting at sector 63

## System Overview

The computer runs **Microsoft Windows XP** (version 5.1, build 2600). The primary user profile is **"Mr. Evil"** (SID S-1-5-21-2000478354-688789844-1708537768-1003), the online alias of the suspect. The system was registered to **Greg Schardt**, with the organization listed as "N/A". The Windows installation date corresponds to August 19, 2004 (Unix timestamp 1092955707).

## Tying the Computer to the Suspect

The registry value at `SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner` is **"Greg Schardt"**, directly linking this computer to the suspect. Additionally, the sole user profile on the machine is named **"Mr. Evil"**, his known online alias. The Outlook Express data within the "Mr. Evil" profile contains subscriptions to numerous hacking newsgroups (alt.2600, alt.hacking, alt.binaries.hacking.utilities, etc.), consistent with his reported activities.

## Hacking Software Found

The disk contains an extensive, organized collection of hacking tools under `My Documents/`, structured into attack methodology phases:

| Category | Tools |
|---|---|
| **FOOTPRINTING** | Nmap NT (port scanner), SuperScan, spade114.exe, NSTPro2 |
| **ENUMERATION** | Cerberus Internet Scanner, ogre, enum, user2sid, winfo |
| **EXPLOITATION** | Brutus (brute-force), NetBus (remote access trojan), Netcat, Pwdump/Pwdump2/Pwdump3, lsadump2, l0phtcrack 3, John the Ripper, GetAdmin, SecHole, SMBGrind Crack, VNC, dsniff, fpipe |
| **COMMANDS** | snitch.exe, STREAMFIND.EXE, webscan.exe, user2sid.exe |
| **DICTIONARIES** | 250MB wordlist, multiple dictionary files for password cracking |

Installed software includes **Ethereal 0.10.6** (packet sniffer), **Anonymizer** (anonymity toolbar), **Look@LAN** (network discovery), and **Cain** (seen in Prefetch as `CAIN25B45.EXE`, a password recovery/sniffing tool). Prefetch also shows execution of **TELNET.EXE** and **WinPcap** (packet capture library).

A file named **"interception"** was found directly on Mr. Evil's desktop, consistent with the allegation of intercepting internet traffic.

## Anti-Virus Scan Results

ClamAV scanning of extracted executables detected **5 viruses/trojans**:

| File | Path | ClamAV Detection |
|---|---|---|
| lsadump2.exe | My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe | **Win.Trojan.Lsadump-1** |
| GetAdmin.exe | My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe | **Win.Exploit.WinNT-3** |
| SECHOLE.EXE | My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE | **Win.Trojan.Sehole-1** |
| NetBus170.zip | My Documents/EXPLOITATION/NT/netbus/NetBus170.zip | **Win.Trojan.Netbus-2** |
| snitch.exe | My Documents/COMMANDS/snitch.exe | **Win.Trojan.Snitch-1** |

These are hacking/exploitation tools classified as trojans and exploits by ClamAV. NetBus is a well-known remote access trojan. Lsadump2 dumps LSA secrets from Windows. GetAdmin and SecHole are privilege escalation exploits for Windows NT. Snitch is a network information gathering trojan.

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP** (Version 5.1, Build 2600), as identified from the registry key `SOFTWARE\Microsoft\Windows NT\CurrentVersion` which lists `ProductName` = "Microsoft Windows XP", `CurrentVersion` = "5.1", and `CurrentBuildNumber` = "2600".

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the registry value `RegisteredOwner` under `SOFTWARE\Microsoft\Windows NT\CurrentVersion`. This directly ties the computer to the suspect.

**Case Q3:** Yes, there are viruses/malicious software on the computer. ClamAV detected **5 infected files**: Win.Trojan.Lsadump-1 (lsadump2.exe), Win.Exploit.WinNT-3 (GetAdmin.exe), Win.Trojan.Sehole-1 (SECHOLE.EXE), Win.Trojan.Netbus-2 (NetBus170.zip), and Win.Trojan.Snitch-1 (snitch.exe). All are hacking/exploitation tools located in the `My Documents/EXPLOITATION/` and `My Documents/COMMANDS/` directories.