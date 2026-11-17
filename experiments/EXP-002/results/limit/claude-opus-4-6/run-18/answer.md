I now have all the evidence needed to answer the case questions. Let me compile the final report.

---

# Forensic Investigation Report — NIST Hacking Case

## Case Overview

A Dell CPi notebook computer (serial # VLQLW) was found abandoned along with a wireless PCMCIA card and an external homemade 802.11b antenna. The computer is suspected to have been used for hacking, potentially by suspect Greg Schardt (online nickname "Mr. Evil").

## Evidence Analyzed

- **Disk Image**: `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` (640 MB, EnCase format, two segments)
- **Partition Layout**: Single NTFS partition at sector offset 63 (approximately 4.5 GB)
- **Filesystem**: 12,545 files indexed

## Key Findings

### System Information (from SOFTWARE registry hive)
- **Operating System**: Microsoft Windows XP, Version 5.1, Build 2600 (Uniprocessor Free)
- **Registered Owner**: Greg Schardt
- **Registered Organization**: N/A
- **Product ID**: 55274-640-0147306-23684
- **System Root**: C:\WINDOWS
- **Install Date**: August 19, 2004 (Unix epoch 1092955707)

### User Profile: "Mr. Evil"
The primary user account on the computer is **"Mr. Evil"** — the known online nickname of suspect Greg Schardt. This directly ties the computer to the suspect. The user profile is located at `Documents and Settings/Mr. Evil/` and contains:
- Outlook Express mailbox for the **alt.hacking** newsgroup (`alt.hacking.dbx`, inode 11516)
- Browser cache containing wardriving-related content
- Organized hacking tool collection under `My Documents/`

### Hacking Software Found
The computer contains an extensive, methodically organized hacking toolkit under `My Documents/`, categorized by attack methodology:

**FOOTPRINTING tools:**
- Nmap NT (network scanner/port scanner) — with full source code
- SuperScan (network scanner)
- NSTPro2 (network scanning)
- spade114.exe (Sam Spade — DNS/WHOIS/traceroute)

**ENUMERATION tools:**
- Cerberus Internet Scanner (with scan reports against 172.16.0.2)
- enum (NT enumeration tool)
- ogre (system enumeration)

**EXPLOITATION tools:**
- **NetBus** (trojan/backdoor RAT — both documentation and NetBus170.zip, inode 10589)
- **Brutus** (password brute-force cracker, with NetBus brute-force config)
- Pwdump / Pwdump2 / Pwdump3 (Windows password hash dumping)
- lsadump2 (LSA secret dumping)
- L0phtCrack 3 (lc3setup01.exe — password cracker)
- John the Ripper (john-16w.zip, john-1.6.tar.gz)
- GetAdmin (privilege escalation exploit)
- SecHole (security hole exploit, SECHOLE.EXE)
- SMBGrind Crack (SMB password cracker)
- Netcat (nc — "Swiss army knife" of networking)
- fpipe (port forwarding/redirection)
- dsniff 2.3 (network sniffing/MITM toolkit)
- WinVNC / VNC (remote desktop for unauthorized access)
- NAT (NetBIOS auditing tool)
- bsniff (network sniffer)

**COMMANDS directory:**
- snitch.exe, user2sid.exe, STREAMFIND.EXE, SRVBOOT.BAT, and other utilities

**ARCHIVE directory:**
- Various archiving/compression tools (ARJ, etc.)

### Installed Programs (in Program Files)
- **Ethereal 0.10.6** — Network packet analyzer/sniffer (installed with WinPcap)
- **Look@LAN** — Network discovery/monitoring tool
- **Anonymizer Toolbar** — Anonymous browsing toolbar
- **mIRC** — IRC client (commonly used for hacker communication)

### Execution Evidence (from Prefetch files)
Programs confirmed to have been executed on the system:
- **CAIN25B45.EXE** — Cain & Abel password cracker
- **ETHEREAL.EXE** — Packet sniffer
- **NETSTUMBLER.EXE** — Wireless network (wardriving) discovery tool
- **LOOKATLAN.EXE / LOOKATHOST.EXE** — Network scanning
- **WHOIS.EXE** — Domain ownership lookup
- **TELNET.EXE** — Remote login
- **PING.EXE** — Network probing
- **MIRC.EXE** — IRC client
- **WINPCAP_3_01_A.EXE** — Packet capture driver installer
- **CUTE3032.EXE** — CuteFTP (file transfer client)

### Anti-Virus Scan Results
ClamAV was run against the evidence directory (`/evidence/nist-hacking-case`). Results:
- **4Dell_Latitude_CPi.E01**: OK
- **4Dell_Latitude_CPi.E02**: OK
- **Detections: 0**

**Important limitation**: ClamAV scanned the E01/E02 container files as single blobs — it cannot open EnCase disk images to scan the individual files within. Therefore, the 0-detection result **does not confirm that files inside the image are virus-free**.

That said, the disk image contains **NetBus** (a well-known trojan/backdoor remote administration tool, commonly classified as `Win.Trojan.NetBus` by antivirus engines), along with numerous other tools that are routinely flagged as "hack tools" or "potentially unwanted programs" (PUPs) by antivirus software (e.g., Cain & Abel, Brutus, pwdump, L0phtCrack, GetAdmin, SecHole).

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP**, Version 5.1, Build 2600 (source: SOFTWARE registry hive, `Microsoft\Windows NT\CurrentVersion` key — ProductName: "Microsoft Windows XP", CurrentVersion: "5.1", CurrentBuildNumber: "2600").

**Case Q2:** The registered owner is **Greg Schardt** (source: SOFTWARE registry hive, `Microsoft\Windows NT\CurrentVersion\RegisteredOwner` value). This directly ties the computer to the suspect. Additionally, the primary user account is named "Mr. Evil," the suspect's known online nickname.

**Case Q3:** ClamAV was run on the evidence and returned **0 detections**. However, ClamAV could only scan the E01/E02 container files, not the individual files inside the disk image. The disk contains **NetBus** (a trojan/backdoor), along with numerous hacking tools (Brutus, Cain & Abel, pwdump, L0phtCrack, GetAdmin, SecHole, Netcat, dsniff, etc.) that would typically be flagged as malware or hack tools by antivirus software if scanned individually. Based on the presence of NetBus (a known trojan) and these hack tools, the computer does contain software that is commonly classified as malicious by antivirus engines, even though the ClamAV container-level scan could not detect them inside the E01 image format.