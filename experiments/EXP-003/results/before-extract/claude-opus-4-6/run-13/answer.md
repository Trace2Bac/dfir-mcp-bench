Excellent — ClamAV detected 5 malicious files. I now have all the evidence needed to answer every question. Here is the final report.

---

# Digital Forensic Investigation Report — NIST Hacking Case

## Case Summary

A Dell CPi notebook computer (serial # VLQLW) was found abandoned with a wireless PCMCIA card and an external homemade 802.11b antenna. The computer is suspected to have been used for hacking, potentially by suspect Greg Schardt (alias "Mr. Evil"), who is alleged to have parked near wireless access points to intercept internet traffic.

## Evidence Analyzed

- **Image**: `4Dell_Latitude_CPi.E01` / `.E02` (640 MB EnCase image)
- **Filesystem**: NTFS partition at sector offset 63 (9,510,417 sectors)
- **Total files indexed**: 12,545

## Key Findings

### System Identification
- **OS**: Microsoft Windows XP, Build 2600, Version 5.1 (Uniprocessor Free)
- **SystemRoot**: `C:\WINDOWS`
- **Product ID**: 55274-640-0147306-23684
- **Install Date**: Unix timestamp 1092955707 (2004-08-19)
- **Registered Owner**: Greg Schardt
- **Registered Organization**: N/A

### User Profile Tying Computer to Suspect
The sole user profile on the system is `Documents and Settings\Mr. Evil`, directly matching the suspect's known alias. The registered owner in the Windows registry is explicitly **Greg Schardt**.

### Hacking Software Found
The `My Documents` folder contains an organized hacking toolkit following a penetration testing methodology:

| Category | Tools Found |
|---|---|
| **FOOTPRINTING** | NmapNT (network scanner), SuperScan, NSTPro2, spade114 |
| **ENUMERATION** | Cerberus Internet Scanner, enum, ogre |
| **EXPLOITATION** | Brutus (password cracker), NetBus (trojan/RAT), Netcat, Pwdump (1/2/3), lsadump2, GetAdmin, SecHole, SMBGrind/Crack, VNC, L0phtCrack 3, John the Ripper, dsniff, NAT |
| **COMMANDS** | snitch.exe, user2sid, sid2user, STREAMFIND, USERDUMP |
| **ARCHIVE** | Arj and other archiving tools |

### Installed Programs (from Program Files & Prefetch)
- **Ethereal 0.10.6** — packet sniffer/network analyzer (installed and executed)
- **Cain & Abel** (CAIN25B45.EXE) — password recovery/sniffing tool (executed per Prefetch)
- **Network Stumbler** — wireless network discovery tool (executed per Prefetch)
- **Look@LAN** — network monitoring tool (executed per Prefetch)
- **mIRC** — IRC client (executed per Prefetch)
- **Anonymizer Toolbar** — web anonymization tool (installed)
- **WinPcap** — packet capture library (required by Ethereal/Cain)

### Anti-Virus Scan Results (ClamAV)

ClamAV detected **5 malicious files** among extracted binaries:

| File | Path | Detection |
|---|---|---|
| snitch.exe | My Documents/COMMANDS/snitch.exe | **Win.Trojan.Snitch-1** |
| lsadump2.exe | My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe | **Win.Trojan.Lsadump-1** |
| GetAdmin.exe | My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe | **Win.Exploit.WinNT-3** |
| SECHOLE.EXE | My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE | **Win.Trojan.Sehole-1** |
| NetBus170.zip | My Documents/EXPLOITATION/NT/netbus/NetBus170.zip | **Win.Trojan.Netbus-2** |

### Additional Suspicious Activity
- Outlook Express mailbox for the **alt.hacking** newsgroup found in Mr. Evil's profile
- IE cache contains references to **wardriving** content
- Prefetch evidence of **TELNET.EXE**, **PING.EXE**, **CMD.EXE**, and **WHOIS.EXE** execution — reconnaissance activity
- Network Stumbler execution confirms wireless network scanning capability, consistent with the wardriving allegation

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as confirmed by the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` (ProductName = "Microsoft Windows XP").

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive value `RegisteredOwner` at `Microsoft\Windows NT\CurrentVersion`. This directly ties the computer to the suspect.

**Case Q3:** **Yes, there are viruses/malware on the computer.** ClamAV detected 5 malicious files: **Win.Trojan.Netbus-2** (NetBus RAT), **Win.Trojan.Snitch-1** (snitch.exe), **Win.Trojan.Lsadump-1** (lsadump2.exe), **Win.Exploit.WinNT-3** (GetAdmin.exe privilege escalation exploit), and **Win.Trojan.Sehole-1** (SecHole exploit). These are hacking/exploitation tools classified as trojans and exploits by ClamAV, stored in the organized hacking toolkit under `My Documents\EXPLOITATION`.