ClamAV found 4 detections. I now have all the evidence needed for the final report.

---

# Forensic Investigation Report — NIST Hacking Case

## Evidence Summary

**Evidence**: Dell Latitude CPi notebook computer (serial # VLQLW), EnCase image `4Dell_Latitude_CPi.E01`/`.E02` (640 MB)  
**Partition**: NTFS partition at sector offset 63 (9,510,417 sectors)  
**Filesystem**: 12,545 files indexed

## Key Findings

### Operating System and Owner

Registry hive `SOFTWARE\Microsoft\Windows NT\CurrentVersion` confirms:

- **ProductName**: Microsoft Windows XP
- **CurrentVersion**: 5.1
- **CurrentBuildNumber**: 2600
- **RegisteredOwner**: Greg Schardt
- **RegisteredOrganization**: N/A
- **InstallDate**: 2004-08-19 (Unix timestamp 1092955707)
- **SystemRoot**: C:\WINDOWS
- **ProductId**: 55274-640-0147306-23684

The primary user account on the machine is named **"Mr. Evil"** (the suspect's known online alias), with files under `Documents and Settings/Mr. Evil/`.

### Hacking Software Found

The disk contains an organized collection of hacking tools categorized by attack methodology:

- **EXPLOITATION/NT/Brutus** — Brutus password cracker (with NetBus.bad, word lists, users.txt)
- **EXPLOITATION/NT/netbus** — NetBus remote access trojan (NetBus170.zip)
- **EXPLOITATION/NT/Pwdump** — Pwdump password dumping tools (pwdump2, pwdump3)
- **EXPLOITATION/NT/lsadump2** — LSA Secrets dumper (lsadump2.exe, source code)
- **EXPLOITATION/NT/Get Admin** — GetAdmin privilege escalation exploit
- **EXPLOITATION/NT/sechole** — SecHole privilege escalation exploit
- **EXPLOITATION/NT/l0pht301** — L0phtCrack password cracker (lc3setup01.exe)
- **EXPLOITATION/NT/John** — John the Ripper password cracker
- **EXPLOITATION/NT/SMBGrind Crack** — SMB brute-force cracking tool
- **EXPLOITATION/NT/Netcat** — Netcat networking utility
- **EXPLOITATION/NT/NAT** — NetBIOS Auditing Tool
- **EXPLOITATION/NT/vnc / WinVNC** — VNC remote control
- **EXPLOITATION/Unix/dsniff** — Network sniffing/spoofing toolkit
- **FOOTPRINTING/NT/Nmapnt** — Nmap network scanner (with source code)
- **FOOTPRINTING/NT/superscan** — SuperScan port scanner
- **FOOTPRINTING/NT/NSTPro2** — Network scanning tool
- **FOOTPRINTING/NT/spade114.exe** — Sam Spade network tool
- **ENUMERATION/NT/ogre** — Network enumeration tool
- **ENUMERATION/NT/enum** — NT enumeration tool
- **ENUMERATION/NT/Cerberus Internet Scanner** — Vulnerability scanner
- **Program Files/Ethereal** — Ethereal (Wireshark predecessor) network packet sniffer, installed
- **Program Files/Look@LAN** — Network discovery tool, installed
- **Program Files/Anonymizer** — Anonymizer toolbar, installed

Windows Prefetch files confirm execution of **CAIN25B45.EXE** (Cain & Abel password recovery tool) and **WINPCAP_3_01_A.EXE** (WinPcap packet capture driver installer).

An Outlook Express mailbox `alt.hacking.dbx` was found, indicating the user subscribed to the `alt.hacking` newsgroup.

### Anti-Virus / Malware Scan (ClamAV)

ClamAV scan of extracted executables produced **4 positive detections**:

| File | Path | ClamAV Detection |
|------|------|-----------------|
| lsadump2.exe | My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe | **Win.Trojan.Lsadump-1** |
| GetAdmin.exe | My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe | **Win.Exploit.WinNT-3** |
| SECHOLE.EXE | My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE | **Win.Trojan.Sehole-1** |
| NetBus170.zip | My Documents/EXPLOITATION/NT/netbus/NetBus170.zip | **Win.Trojan.Netbus-2** |

### Tying the Computer to the Suspect

- The Windows **registered owner** is **Greg Schardt** (from the SOFTWARE registry hive).
- The only user profile on the system is **"Mr. Evil"**, the suspect's known online alias.
- The machine contains a curated library of hacking tools organized into EXPLOITATION, FOOTPRINTING, ENUMERATION, and COMMANDS directories — consistent with the reported suspect activity.
- Browsing of wardriving-related content found in IE cached files, consistent with the allegation of parking near wireless access points.
- Subscription to the `alt.hacking` newsgroup via Outlook Express.

---

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP** (Version 5.1, Build 2600), as confirmed by the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of `SOFTWARE\Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** Yes, ClamAV detected **4 viruses/malware** on the computer:
1. **Win.Trojan.Lsadump-1** — in `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` (credential dumping trojan)
2. **Win.Exploit.WinNT-3** — in `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` (Windows NT privilege escalation exploit)
3. **Win.Trojan.Sehole-1** — in `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` (security hole exploit trojan)
4. **Win.Trojan.Netbus-2** — in `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` (NetBus remote access trojan)