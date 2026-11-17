I now have all the evidence needed to answer every question. Here is the final report.

---

# Forensic Investigation Report: NIST Hacking Case

## Case Overview

**Evidence:** Dell Latitude CPi notebook computer (serial # VLQLW), found abandoned with wireless PCMCIA card and homemade 802.11b antenna.

**Image analyzed:** `4Dell_Latitude_CPi.E01` / `.E02` (640 MB EnCase image, NTFS partition at sector 63)

**Suspect:** Greg Schardt, alias "Mr. Evil"

---

## Key Findings

### System Identification

The operating system was identified via the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`:
- **Product:** Microsoft Windows XP
- **Version:** 5.1 (Build 2600)
- **Install Date:** 2004-08-19 (Unix epoch 1092955707)
- **System Root:** C:\WINDOWS

The registered owner was set to **Greg Schardt** (RegisteredOrganization: N/A, ProductId: 55274-640-0147306-23684).

### Tying the Computer to the Suspect

The Windows user profile is named **"Mr. Evil"** (Documents and Settings/Mr. Evil), matching the suspect's known alias. The RegisteredOwner in the registry is explicitly "Greg Schardt." Combined with the hacking tools, IRC channels (#Elite.Hackers.UnderNet), and newsgroup subscriptions (alt.2600.*, alt.binaries.hacking.*), this firmly ties the suspect to the computer.

### Anti-Virus Scan Results (ClamAV)

ClamAV was run against 14 extracted suspicious executables from the disk image. **Three detections were found:**

| Detection | File Path | Inode |
|---|---|---|
| **Win.Trojan.Lsadump-1** | My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe | 10600 |
| **Win.Exploit.WinNT-3** | My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe | 10626 |
| **Win.Trojan.Sehole-1** | My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE | 10569 |

All three are exploitation/privilege-escalation tools classified as malware by ClamAV's signature database.

### Hacking Software Inventory

The disk image contains an extensive organized collection of hacking tools:

**Installed programs (in Program Files):**
- **Ethereal 0.10.6** — Network packet sniffer/analyzer (with WinPcap 3.01a)
- **Network Stumbler 0.4.0** — Wireless network scanner (wardriving tool)
- **mIRC 6.12** — IRC client (used to connect to hacking channels)
- **Anonymizer** — Privacy/anonymization toolbar
- **Look@LAN** — Network discovery tool
- **Whois** — Domain lookup utility
- **Cain v2.5** — Password cracking tool (shortcut on Desktop, Prefetch entry CAIN25B45.EXE confirms execution, though the executable itself appears deleted)

**Tools organized in My Documents by attack phase:**
- **FOOTPRINTING:** Nmap (nmapNT), SuperScan, spade114.exe, NSTPro2
- **ENUMERATION:** Ogre (NetBIOS enumeration)
- **EXPLOITATION:** Brutus (password brute-forcer), NetBus (remote access trojan), Netcat, Pwdump (1/2/3), L0phtCrack 3, lsadump2, GetAdmin, SecHole, SMBGrind, fpipe, John the Ripper, dsniff 2.3, VNC/WinVNC, NAT, elsave

**Evidence of execution (Windows Prefetch):** CAIN25B45.EXE, NETSTUMBLER.EXE, ETHEREAL.EXE, MIRC.EXE, WHOIS.EXE, TELNET.EXE, LOOKATLAN.EXE, LOOKATHOST.EXE, PING.EXE

**Recycle Bin:** Four deleted executables (Dc1.exe through Dc4.exe) in the Mr. Evil user's Recycle Bin — ClamAV did not flag these.

### Additional Evidence of Hacking Activity

- **IRC Chat Logs:** Channels including #Elite.Hackers.UnderNet, #evilfork.EFnet, #ISO-WAREZ.EFnet, #LuxShell.UnderNet, #ushells.UnderNet
- **Hacking Newsgroups (Outlook Express):** Subscribed to alt.2600, alt.2600.cardz, alt.2600.codez, alt.2600.crackz, alt.2600.hackerz, alt.2600.phreakz, alt.binaries.hacking.*, alt.dss.hack, alt.hacking
- **"interception" file** on Mr. Evil's desktop (173 KB binary) — consistent with intercepted data
- **Wardriving evidence:** IE cache contains a file named "wardriving[1]"; cookies show visits to www.netstumbler.com
- **Desktop "Tools" folder** with shortcuts to: Cain v2.5, Ethereal, mIRC, Network Stumbler, Look@LAN, Look@Host, Whois, CuteFTP, 123 WASP, Agent, Faber Toys

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (version 5.1, Build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of `HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** Yes, ClamAV detected **three viruses/malicious programs** on the computer:
1. **Win.Trojan.Lsadump-1** in `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` — an LSA secrets dumping tool
2. **Win.Exploit.WinNT-3** in `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` — a Windows NT privilege escalation exploit
3. **Win.Trojan.Sehole-1** in `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` — a Windows NT security hole exploitation tool