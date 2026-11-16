I now have all the evidence needed to compile the final report.

---

# Digital Forensic Investigation Report

## Case: NIST Hacking Case — Dell Latitude CPi Notebook (S/N VLQLW)

### Evidence Analyzed
- **Image**: `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` (with second segment `.E02`)
- **Partition Layout**: DOS partition table with one NTFS partition (sector 63–9510479, ~4.5 GB)
- **Total files indexed**: 12,545

---

### System Identification

The system registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`) reveals:
- **Product Name**: Microsoft Windows XP
- **Version**: 5.1, Build 2600
- **Registered Owner**: Greg Schardt
- **Registered Organization**: N/A
- **System Root**: C:\WINDOWS
- **Install Date**: August 19, 2004 (Unix timestamp 1092955707)
- **Product ID**: 55274-640-0147306-23684

The primary user profile on the system is **"Mr. Evil"** — the known alias of the suspect Greg Schardt.

---

### Anti-Virus Scan Results

ClamAV was run against the evidence:
- **4Dell_Latitude_CPi.E01**: OK (0 detections)
- **4Dell_Latitude_CPi.E02**: OK (0 detections)

**Important caveat**: ClamAV scanned the E01 container files as opaque blobs; it **cannot open EnCase disk images** to scan the individual files inside. The result shows no viruses were detected in the container files themselves, but this does not constitute a thorough scan of the files on the disk.

Based on file listing analysis, the disk contains numerous **hacking tools and utilities** (detailed below), but no traditional viruses or worms were detected by ClamAV.

---

### Hacking Software & Evidence of Use

#### Installed and Executed Software (confirmed via Prefetch files)
The Windows Prefetch directory shows the following hacking-related tools were **actually executed** on this system:

| Tool | Prefetch File | Purpose |
|------|--------------|---------|
| **Cain & Abel v2.5** | CAIN25B45.EXE-056F3A6E.pf | Password recovery/cracking, ARP spoofing, network sniffing |
| **Ethereal** | ETHEREAL.EXE-1C148EEF.pf | Network packet capture/analysis (precursor to Wireshark) |
| **Network Stumbler** | NETSTUMBLER.EXE-0BFEE568.pf | Wireless network discovery/wardriving tool |
| **Look@LAN** | LOOKATLAN.EXE-1F991DD9.pf | Network scanning and monitoring |
| **Look@Host** | LOOKATHOST.EXE-34BB6F8B.pf | Host reconnaissance |
| **mIRC** | MIRC.EXE-0661EC22.pf | IRC client (commonly used in hacking communities) |
| **WinPcap** | WINPCAP_3_01_A.EXE-1E3EDEDC.pf | Packet capture library (supports Ethereal, Cain, etc.) |
| **Telnet** | TELNET.EXE-24182D40.pf | Remote terminal access |
| **whois** | WHOIS.EXE-38443FF6.pf | Domain/IP reconnaissance |

#### Hacking Tool Collection (stored in My Documents)

The user maintained an organized hacking toolkit in `My Documents`, categorized by attack phase:

**EXPLOITATION/NT/**:
- **Brutus** — Password brute-forcer (with NetBus attack definition file targeting port 12345)
- **NetBus v1.70** — Remote access trojan (NetBus170.zip, SHA-256: `8b0563e...`)
- **Netcat** — "Swiss army knife" network tool
- **Pwdump** (v1, v2, v3) — Windows SAM password hash dumper
- **lsadump2** — LSA secrets dumper (executable SHA-256: `8a69f197...`)
- **L0phtCrack v3** — Windows password cracker
- **John the Ripper** — Password cracker (NT and Unix versions)
- **GetAdmin** — Privilege escalation exploit (SHA-256: `921055022...`)
- **SecHole** — Security hole exploit (SHA-256: `f18affb6...`)
- **SMBGrind** — SMB password brute-forcer
- **VNC/WinVNC** — Remote desktop control
- **dsniff** — Network sniffing suite
- **fpipe** — Port redirection/forwarding
- **NAT** — NetBIOS auditing tool
- **bsniff** — Network sniffer

**FOOTPRINTING/NT/**:
- **Nmap NT** — Network port scanner (with full source code)
- **SuperScan** — TCP port scanner
- **Sam Spade** (spade114.exe) — Network investigation tool
- **NSTPro2** — Network security testing tool

**ENUMERATION/NT/**:
- **Cerberus Internet Scanner** — Vulnerability scanner
- **enum** — Windows enumeration tool
- **ogre** — Network enumeration tool

**COMMANDS/**:
- snitch.exe, user2sid.exe, STREAMFIND.EXE, and other reconnaissance utilities

#### Desktop Shortcuts (Tools folder)
Mr. Evil's Desktop/Tools folder contained shortcuts to: Cain v2.5, Ethereal, Network Stumbler, Look@LAN, Look@Host, mIRC, CuteFTP, CuteHTML, Agent, whois, 123 WASP, and Faber Toys.

#### Additional Installed Software
- **Anonymizer Toolbar** — For anonymous web browsing
- **Program Files/Ethereal** — Full installation with plugins
- **Program Files/Look@LAN** — Full installation with sound alerts

---

### Evidence Tying Computer to Suspect

1. **Registered Owner**: The Windows registry lists **"Greg Schardt"** as the registered owner.
2. **User Profile "Mr. Evil"**: The primary (and sole active) user account is "Mr. Evil" — the suspect's known alias.
3. **Hacking Newsgroup Subscriptions**: Outlook Express shows subscriptions to numerous hacking-related Usenet groups including: `alt.2600`, `alt.2600.cardz`, `alt.2600.codez`, `alt.2600.crackz`, `alt.2600.hackerz`, `alt.2600.phreakz`, `alt.binaries.hacking.beginner`, `alt.binaries.hacking.computers`, `alt.binaries.hacking.utilities`, `alt.binaries.hacking.websites`, `alt.hacking`, `alt.dss.hack`, and others.
4. **Wardriving Evidence**: Network Stumbler was installed and executed (consistent with the suspect's known behavior of parking near wireless access points), and a cookie for `www.netstumbler.com` was found in the browser cache.
5. **"interception" file** on Mr. Evil's desktop (173 KB binary, SHA-256: `2e24e6ef...`) — likely captured network data.

---

## Case Questions

**Case Q1**: The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as identified from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2**: The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry value `RegisteredOwner` under `Microsoft\Windows NT\CurrentVersion`.

**Case Q3**: The ClamAV anti-virus scan found **no viruses** (0 detections). ClamAV scanned the E01 container files but could not look inside the disk image to scan individual files within it. While the disk contains numerous hacking tools (NetBus trojan kit, Brutus password cracker, Cain & Abel, Pwdump, lsadump2, etc.) that some antivirus products would flag as hacktools or potentially unwanted programs, no traditional viruses were detected by the ClamAV scan performed.