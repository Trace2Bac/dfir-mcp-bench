I now have all the evidence needed to compile the final report.

---

# Digital Forensic Investigation Report — NIST Hacking Case

## Case Overview

A Dell CPi notebook computer (serial # VLQLW) was found abandoned with a wireless PCMCIA card and an external homemade 802.11b antenna. The computer is suspected of being used for hacking and wardriving activities, potentially tied to suspect Greg Schardt (a.k.a. "Mr. Evil"). The EnCase image `4Dell_Latitude_CPi.E01` was analyzed.

## System Information

- **Operating System:** Microsoft Windows XP (Version 5.1, Build 2600, Uniprocessor Free)
- **System Root:** C:\WINDOWS
- **Product ID:** 55274-640-0147306-23684
- **Install Date:** 2004-08-19 (Unix timestamp 1092955707)
- **Registered Owner:** Greg Schardt
- **Registered Organization:** N/A
- **Partition Layout:** NTFS partition at sector offset 63, ~4.53 GB

## User Profile

The primary user profile on the system is **"Mr. Evil"** (`Documents and Settings/Mr. Evil/`), consistent with the suspect's known online nickname. The profile contains:
- Outlook Express mailbox for the **alt.hacking** newsgroup (`alt.hacking.dbx`)
- Browser cache containing **wardriving** related content
- A `Desktop/Tools` folder with shortcuts to hacking utilities (e.g., `whois`)

## Hacking Tools Found

The `My Documents` folder is organized into a systematic hacking methodology structure:

### EXPLOITATION/NT/
- **Brutus** — password brute-forcing tool (with NetBus.bad file)
- **NetBus 1.70** — remote access trojan (NetBus170.zip)
- **Netcat** — network utility ("Swiss army knife" of networking)
- **Pwdump / Pwdump2 / Pwdump3** — Windows password hash dumpers
- **lsadump2** — LSA Secrets dumping tool
- **GetAdmin** — privilege escalation exploit for Windows NT
- **SECHOLE / SECHOLED** — security hole exploit tools
- **l0phtcrack 3.01** (lc3setup01.exe) — password cracking tool
- **John the Ripper** — password cracker (john-16w.zip, john-1.6.tar.gz)
- **SMBGrind / Crack** — SMB password grinding tools
- **VNC / WinVNC** — remote desktop control tools
- **fpipe** — TCP/UDP port redirector
- **NAT** — NetBIOS Auditing Tool
- **bsniff** — network sniffer
- **dsniff 2.3** — Unix network auditing/sniffing tool suite

### FOOTPRINTING/NT/
- **Nmap NT** — network port scanner (with full source code)
- **SuperScan** — TCP port scanner
- **NSTPro2** — network scanner
- **spade114.exe** — spam detection tool

### ENUMERATION/NT/
- **Ogre** — system enumeration tool
- **Cerberus Internet Scanner** — vulnerability scanner
- **enum** — Windows enumeration tool

### Installed Software
- **Ethereal 0.10.6** — network packet analyzer (installed in Program Files)
- **Anonymizer Toolbar** — web anonymization tool
- **Cain & Abel** (CAIN25B45.EXE) — password recovery/sniffing tool (evidence from Prefetch)
- **Look@LAN** — network monitoring tool
- **WinPcap 3.01** — packet capture library (evidence from Prefetch)

## Anti-Virus Scan Results

ClamAV was run against extracted files from the disk image. **4 malware detections** were identified:

| Detection | File | Path |
|-----------|------|------|
| **Win.Trojan.Lsadump-1** | lsadump2.exe | My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe |
| **Win.Exploit.WinNT-3** | GetAdmin.exe | My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe |
| **Win.Trojan.Sehole-1** | SECHOLE.EXE | My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE |
| **Win.Trojan.Netbus-2** | NetBus170.zip | My Documents/EXPLOITATION/NT/netbus/NetBus170.zip |

These are all known hacking/exploitation tools classified as trojans or exploits by ClamAV.

## Tying the Computer to the Suspect

The following evidence ties this computer to Greg Schardt:
1. **Registered Owner** in the Windows registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner`) is **"Greg Schardt"**
2. The primary user profile is named **"Mr. Evil"**, which matches the suspect's known online alias
3. The system contains an organized collection of hacking tools consistent with the described activities (network interception, credential theft, wardriving)

---

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP** (Version 5.1, Build 2600), as identified from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **4 infections**: **Win.Trojan.Lsadump-1** (lsadump2.exe), **Win.Exploit.WinNT-3** (GetAdmin.exe), **Win.Trojan.Sehole-1** (SECHOLE.EXE), and **Win.Trojan.Netbus-2** (NetBus170.zip). All are hacking/exploitation tools stored in the `My Documents/EXPLOITATION/NT/` directory.