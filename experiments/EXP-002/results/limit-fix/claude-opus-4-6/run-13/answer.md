I have all the evidence needed. Here is the final report.

---

# Digital Forensic Investigation Report
## NIST Hacking Case — Dell Latitude CPi (Serial # VLQLW)

### Executive Summary

A Dell CPi notebook computer was found abandoned with a wireless PCMCIA card and an external homemade 802.11b antenna. Forensic analysis of the EnCase image (`4Dell_Latitude_CPi.E01`) reveals the computer was configured for hacking purposes, containing an extensive arsenal of offensive security tools organized by attack methodology, and can be directly tied to the suspect Greg Schardt (alias "Mr. Evil").

### Evidence of Ownership — Tying the Computer to the Suspect

The Windows registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`) shows:
- **RegisteredOwner**: `Greg Schardt`
- **RegisteredOrganization**: `N/A`
- **ProductId**: `55274-640-0147306-23684`

The sole user profile on the system is named **"Mr. Evil"** (`Documents and Settings/Mr. Evil`), matching the suspect's known online alias. This directly ties the computer to Greg Schardt.

### Hacking Software Found

The `My Documents` folder is organized by hacking methodology phases:

**FOOTPRINTING (Reconnaissance):**
- **NmapNT** — Network scanner (full source and binaries)
- **NSTPro2** — Network scanning tool
- **superscan** — Port scanner
- **spade114.exe** — Network tool

**ENUMERATION:**
- **Cerberus Internet Scanner** — Vulnerability scanner with scan reports for `172.16.0.2`
- **enum** — Windows enumeration tool
- **ogre** — Enumeration tool

**EXPLOITATION:**
- **NetBus 1.70** — Remote access trojan (ClamAV: **Win.Trojan.Netbus-2**)
- **Brutus** — Password brute-forcing tool (with NetBus.bad, users.txt, words.txt)
- **GetAdmin.exe** — Privilege escalation exploit (ClamAV: **Win.Exploit.WinNT-3**)
- **SECHOLE.EXE** — Security hole exploit (ClamAV: **Win.Trojan.Sehole-1**)
- **lsadump2.exe** — LSA secrets dumper (ClamAV: **Win.Trojan.Lsadump-1**)
- **l0phtcrack (lc3setup01.exe)** — Password cracking tool
- **John the Ripper** — Password cracking tool (both NT and Unix versions)
- **Pwdump / Pwdump2 / Pwdump3** — Password hash dumpers
- **SMBGrind Crack** — SMB password cracking suite
- **Netcat** — Network Swiss army knife
- **VNC / WinVNC** — Remote desktop tools
- **dsniff 2.3** — Network sniffing/MITM tool
- **NAT** — NetBIOS auditing tool
- **bsniff** — Network sniffer
- **fpipe** — Port redirection tool

**COMMANDS (Utilities):**
- **snitch.exe** — Trojan (ClamAV: **Win.Trojan.Snitch-1**)
- **user2sid.exe / USERDUMP.EXE** — User enumeration tools
- **STREAMFIND.EXE** — NTFS stream finder
- **SRVBOOT.BAT** — Server boot script

**Installed Programs (Program Files):**
- **Cain & Abel** (Cain.exe, Abel.exe, Abel.dll) — Password recovery/sniffing tool with captured credential lists (APR, HTTP, FTP, SMTP, POP3, SMB, VNC, SSH, IMAP, TELNET, ICQ, MSN, etc.)
- **Ethereal** (v0.10.6) — Network protocol analyzer/packet sniffer
- **Look@LAN** — Network monitoring tool
- **Anonymizer** — Web anonymization toolbar
- **Network Stumbler** — Wireless network scanner (referenced in Start Menu)

### Anti-Virus Scan Results (ClamAV)

Key executables were extracted from the disk image and scanned with ClamAV. **5 detections were found:**

| File Path | ClamAV Detection |
|---|---|
| `My Documents/COMMANDS/snitch.exe` | **Win.Trojan.Snitch-1** |
| `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` | **Win.Trojan.Lsadump-1** |
| `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` | **Win.Exploit.WinNT-3** |
| `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` | **Win.Trojan.Sehole-1** |
| `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` | **Win.Trojan.Netbus-2** |

Other extracted executables (Cain.exe, Abel.exe, CrackUI.exe, smbgrind.exe, vncviewer.exe, lc3setup01.exe, SECHOLED.EXE) did not trigger ClamAV detections, though they are recognized hacking tools.

### Prefetch Evidence of Tool Execution

Windows Prefetch files confirm the following tools were actually executed on the system:
- **CAIN25B45.EXE** — Cain & Abel was run
- **CMD.EXE** — Command prompt usage
- **CUTE3032.EXE** — CuteFTP was used (likely for file transfers)

### Evidence of Wardriving Activity

Internet Explorer cache contains files related to "wardriving" (`wardriving[1]` in Temporary Internet Files), consistent with the suspect's known activity of parking near Wireless Access Points to intercept internet traffic.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), installed on 2004-08-19 (InstallDate epoch: 1092955707).

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the registry at `SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner`. The user profile on the system is named "Mr. Evil," matching the suspect's known online alias.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV scanning of extracted executables detected **5 infections**:
1. `My Documents/COMMANDS/snitch.exe` — **Win.Trojan.Snitch-1**
2. `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` — **Win.Trojan.Lsadump-1**
3. `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` — **Win.Exploit.WinNT-3**
4. `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` — **Win.Trojan.Sehole-1**
5. `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` — **Win.Trojan.Netbus-2**

These are all hacking/exploitation tools rather than infections of the system itself — they are offensive tools intentionally stored on the computer for use in attacks.