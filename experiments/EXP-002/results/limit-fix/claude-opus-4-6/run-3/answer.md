I now have all the evidence needed. Here is the final report.

---

# Digital Forensic Investigation Report

## Case: NIST Hacking Case — Dell Latitude CPi (Serial # VLQLW)

### Evidence Summary

The disk image `4Dell_Latitude_CPi.E01` contains a single NTFS partition (offset 63, ~4.6 GB). The system is a Windows XP installation with a user profile named **"Mr. Evil"**. The `My Documents` folder is organized into hacking methodology categories (FOOTPRINTING, ENUMERATION, EXPLOITATION) containing dozens of well-known offensive security tools.

### Key Findings

**Hacking Tools Identified on Disk:**

| Category | Tools |
|---|---|
| Footprinting | Nmap (nmapNT), SuperScan, Sam Spade (spade114.exe), NetStumbler, NSTPro2 |
| Enumeration | enum, Cerberus Internet Scanner, ogre |
| Exploitation | Brutus, NetBus, Netcat, Pwdump (v1/v2/v3), lsadump2, GetAdmin, SecHole, L0phtCrack (lc3), John the Ripper, SMBGrind, VNC, dsniff, NAT |
| Installed Software | Ethereal 0.10.6 (packet sniffer), Cain & Abel (CAIN25B45.EXE in Prefetch), Anonymizer Toolbar, Look@LAN, mIRC, Agent (newsgroup reader), WinPcap 3.01a |

**Evidence of Use (Prefetch):** CAIN25B45.EXE, NETSTUMBLER.EXE, ETHEREAL.EXE, MIRC.EXE, LOOKATLAN.EXE, WHOIS.EXE, TELNET.EXE, PING.EXE — all show execution via Prefetch files.

**Newsgroup Activity:** The user subscribed to **alt.hacking** (Outlook Express .dbx file found at `Documents and Settings/Mr. Evil/Local Settings/Application Data/Identities/{EF086998-1115-4ECD-9B13-9ADC067B4929}/Microsoft/Outlook Express/alt.hacking.dbx`).

**Wardriving Activity:** Browser cache includes a file named `wardriving[1]`, consistent with the suspect's MO of parking near wireless access points.

### ClamAV Anti-Virus Scan Results

Five files extracted from the disk image were flagged by ClamAV:

| Detection | File Path | Inode |
|---|---|---|
| **Win.Trojan.Lsadump-1** | My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe | 10600 |
| **Win.Exploit.WinNT-3** | My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe | 10626 |
| **Win.Trojan.Sehole-1** | My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE | 10569 |
| **Win.Trojan.Netbus-2** | My Documents/EXPLOITATION/NT/netbus/NetBus170.zip | 10589 |
| **Win.Tool.Brutus-3** | My Documents/EXPLOITATION/NT/brutus.zip | 10526 |

Note: ClamAV classifies many hacking/exploitation tools as trojans or malware due to their dual-use nature. These are offensive security tools intentionally placed on the system, not infections from external compromise.

### Tying the Computer to the Suspect

- The **registered owner** in the Windows registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner`) is **"Greg Schardt"** — the suspect named in the case briefing.
- The active Windows user profile is named **"Mr. Evil"** — the suspect's known online nickname.
- The organized hacking toolkit (categorized into Footprinting/Enumeration/Exploitation) and wardriving evidence are consistent with the suspect's described activities of intercepting wireless traffic near hotspots.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600, Uniprocessor Free), as identified from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **5 malicious files**: Win.Trojan.Lsadump-1 (`lsadump2.exe`), Win.Exploit.WinNT-3 (`GetAdmin.exe`), Win.Trojan.Sehole-1 (`SECHOLE.EXE`), Win.Trojan.Netbus-2 (`NetBus170.zip`), and Win.Tool.Brutus-3 (`brutus.zip`). These are hacking/exploitation tools stored in the `My Documents/EXPLOITATION/NT/` directory that ClamAV identifies as trojans and exploits.