I now have all the information needed. Here is my final report.

---

# Digital Forensic Investigation Report

## Case: NIST Hacking Case — Dell Latitude CPi Notebook

**Evidence:** EnCase image `4Dell_Latitude_CPi.E01` / `.E02`
**Image:** Dell CPi notebook, serial # VLQLW, found abandoned on 09/20/04 with a wireless PCMCIA card and external homemade 802.11b antenna.

---

## System Overview

- **Operating System:** Microsoft Windows XP (version 5.1, build 2600, uniprocessor)
- **Registered Owner:** Greg Schardt
- **Registered Organization:** N/A
- **Product ID:** 55274-640-0147306-23684
- **System Root:** C:\WINDOWS
- **Install Date:** August 19, 2004 (Unix epoch 1092955707)
- **Partition:** Single NTFS partition (sectors 63–9,510,479)

## User Accounts

The primary user profile is **"Mr. Evil"** (`Documents and Settings/Mr. Evil`), which is the nickname attributed to the suspect Greg Schardt.

## Anti-Virus Scan Results

ClamAV was run against extracted executables from the disk image. **Five (5) detections were identified:**

| # | ClamAV Signature | File Path | Inode |
|---|---|---|---|
| 1 | **Win.Trojan.Lsadump-1** | My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe | 10600 |
| 2 | **Win.Exploit.WinNT-3** | My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe | 10626 |
| 3 | **Win.Trojan.Sehole-1** | My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE | 10569 |
| 4 | **Win.Trojan.Snitch-1** | My Documents/COMMANDS/snitch.exe | 10277 |
| 5 | **Win.Trojan.Agent-6240252-0** | My Documents/FOOTPRINTING/NT/superscan/superscan.exe | 10652 |

All detected files are hacking/exploitation tools stored within organized directories on the suspect's machine. These are classified as malicious by ClamAV due to their inherent exploit/trojan capabilities.

## Hacking Software Inventory

The "My Documents" folder contains a well-organized collection of hacking tools arranged by attack methodology:

### EXPLOITATION (My Documents/EXPLOITATION/)
- **Brutus** — Password brute-force tool (with NetBus.bad file)
- **NetBus** — Remote administration trojan (NetBus170.zip)
- **Netcat** — Network utility ("Swiss army knife of hacking")
- **Pwdump / Pwdump2 / Pwdump3** — Windows password hash dumping tools
- **lsadump2** — LSA secrets dumping tool (flagged by ClamAV)
- **GetAdmin** — Privilege escalation exploit (flagged by ClamAV)
- **SECHOLE / SECHOLED** — Security hole exploit (flagged by ClamAV)
- **SMBGrind Crack** — SMB password cracking suite (CrackUI.exe, GrindUI.exe, smbgrind.exe)
- **l0phtcrack (lc3)** — Password cracking tool (lc3setup01.exe)
- **John the Ripper** — Password cracker (john-16w.zip for NT, john-1.6.tar.gz for Unix)
- **VNC / WinVNC** — Remote desktop control tool
- **dsniff** — Network sniffing/interception tool
- **fpipe** — Port forwarding/redirection tool
- **bsniff** — Network sniffer
- **elsave** — Event log manipulation tool
- **NAT** — NetBIOS auditing tool

### FOOTPRINTING (My Documents/FOOTPRINTING/)
- **Nmap (nmapNT)** — Network port scanner with full source code
- **SuperScan** — Port scanner (flagged by ClamAV)
- **NSTPro2** — Network scanning tool
- **Sam Spade (spade114.exe)** — Network query tool
- **VisualRoute (vr54a.exe)** — Visual traceroute
- **WS Ping Pro Pack** — Network ping utility
- **Unix hack toolkit** (unix_hack.tgz)

### ENUMERATION (My Documents/ENUMERATION/)
- **Cerberus Internet Scanner (CIS)** — Vulnerability scanner (with scan reports for 172.16.0.2)
- **enum** — Windows enumeration tool
- **ogre** — Network enumeration tool
- **DumpTools** — Includes DumpACL, DumpEvt, DumpReg, DumpSec

### COMMANDS (My Documents/COMMANDS/)
- **snitch.exe** — Information gathering tool (flagged by ClamAV)
- **STREAMFIND.EXE** — NTFS stream finder
- **user2sid.exe / USERDUMP.EXE** — SID/User enumeration
- **webscan.exe** — Web scanner
- **winfo.exe** — Windows information tool

### DICTIONARIES (My Documents/DICTIONARIES/)
- **250MB_WORDLIST.ZIP** — Large password dictionary
- **biglist, pocket-dic, Unix_dict, words-english** — Additional wordlists for brute-force attacks

### NOVELL (My Documents/NOVELL/)
- **hack.exe** — Novell hacking tool
- **Pandora** — Novell NDS cracking tool
- Various Novell enumeration utilities (NUT18, ndssnoop, BINDERY, etc.)

### MISCELLANEOUS
- **ToneLoc** — War dialing tool
- **PhoneSweep** — Telephony scanning
- **MSSQL tools** — SQL Server query tools

## Installed Software (Program Files)

- **Ethereal 0.10.6** — Packet capture/analysis tool (Wireshark predecessor), confirmed executed via Prefetch
- **Look@LAN** — Network discovery/monitoring tool, confirmed executed
- **mIRC 6.12** — IRC client with logs from hacking-related channels
- **Anonymizer Toolbar** — Web anonymization tool
- **WinPcap 3.01a** — Packet capture driver (required by Ethereal/Nmap)
- **Cain & Abel (v2.5 beta 45)** — Password recovery/sniffing tool, confirmed executed via Prefetch (CAIN25B45.EXE)
- **Network Stumbler 0.4.0** — Wireless network scanner, confirmed executed via Prefetch

## Evidence of Tool Usage (Windows Prefetch)

The Prefetch directory confirms execution of the following programs:
- CAIN25B45.EXE — Cain & Abel password sniffer
- ETHEREAL.EXE — Packet sniffer
- NETSTUMBLER.EXE — Wireless AP scanner
- LOOKATLAN.EXE / LOOKATHOST.EXE — Network scanner
- MIRC.EXE — IRC client
- TELNET.EXE — Remote connection
- WHOIS.EXE — Domain lookup
- PING.EXE — Network connectivity
- CMD.EXE — Command prompt

## IRC Activity (mIRC Logs)

The suspect participated in the following IRC channels:
- **#Elite.Hackers** (UnderNet) — Hacking community
- **#ISO-WAREZ** (EFnet) — Pirated software distribution
- **#evilfork** (EFnet) — Hacking channel
- **#LuxShell** (UnderNet) — Shell/hacking channel
- **#ushells** (UnderNet) — Unix shell provider channel
- **#CyberCafe**, **#Chataholics**, **#houston**, **#funny** (UnderNet) — Social/general channels
- **#mp3xserv** (UnderNet) — File sharing
- **#thedarktower** (AfterNET)
- Private messages with **m5tar** (UnderNet)

## Email Activity

An Outlook Express mailbox file `alt.hacking.dbx` was found, indicating the suspect subscribed to the **alt.hacking** newsgroup.

## Tying the Computer to the Suspect

The evidence ties this computer to **Greg Schardt**:
1. **Registry:** The Windows XP registered owner is explicitly "Greg Schardt"
2. **User Profile:** The active user account is named "Mr. Evil" — the known online alias of Greg Schardt
3. **Wireless Tools:** Network Stumbler (wireless AP scanner) was installed and executed, consistent with wardriving behavior described in the case briefing
4. **Antenna:** The computer was found with a homemade 802.11b antenna, consistent with the wardriving/wireless interception activities the tools support

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (version 5.1, build 2600), as determined from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **5 infected files**:
1. `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` — **Win.Trojan.Lsadump-1**
2. `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` — **Win.Exploit.WinNT-3**
3. `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` — **Win.Trojan.Sehole-1**
4. `My Documents/COMMANDS/snitch.exe` — **Win.Trojan.Snitch-1**
5. `My Documents/FOOTPRINTING/NT/superscan/superscan.exe` — **Win.Trojan.Agent-6240252-0**

All detected files are hacking/exploitation tools classified as trojans or exploits by ClamAV's signature database.