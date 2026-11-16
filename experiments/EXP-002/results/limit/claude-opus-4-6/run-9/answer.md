I have all the information needed. Here is the final report.

---

# Digital Forensic Report: NIST Hacking Case

## Case Overview

**Evidence:** Dell Latitude CPi notebook computer (serial # VLQLW), found abandoned with a wireless PCMCIA card and an external homemade 802.11b antenna.

**Disk Image:** `4Dell_Latitude_CPi.E01` / `.E02` (EnCase format, ~640 MB)

**Filesystem:** NTFS partition starting at sector 63 (sector offset), spanning ~4.87 GB.

---

## System Information

- **Operating System:** Microsoft Windows XP (Version 5.1, Build 2600, RTM — BuildLab: `2600.xpclient.010817-1148`)
- **System Root:** `C:\WINDOWS`
- **Product ID:** 55274-640-0147306-23684
- **Registered Owner:** Greg Schardt
- **Registered Organization:** N/A
- **Install Date:** August 19, 2004 (Unix epoch 1092955707)

The sole user profile on the machine is **"Mr. Evil"** (`Documents and Settings/Mr. Evil`), which is the known online alias of Greg Schardt per the case briefing.

---

## Evidence Tying the Computer to the Suspect

1. **Registered Owner:** The SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` lists **RegisteredOwner = "Greg Schardt"**.
2. **User Profile:** The only interactive user profile is named **"Mr. Evil"**, matching the suspect's known alias.
3. **Newsgroup Activity:** Outlook Express mailboxes show subscriptions to hacker-related newsgroups including `alt.hacking`, `alt.2600`, `alt.2600.cardz`, `alt.2600.crackz`, `alt.2600.hackerz`, `alt.2600.phreakz`, `alt.binaries.hacking.beginner`, `alt.binaries.hacking.computers`, `alt.binaries.hacking.utilities`, and others.
4. **Browser Cache:** Internet Explorer cached content includes references to **wardriving** and cookies from `www.netstumbler.com`.

---

## Hacking Software and Evidence of Use

### Desktop Shortcuts (Documents and Settings/Mr. Evil/Desktop/Tools/)
The "Mr. Evil" user maintained an organized toolbar of hacking utilities:
- **Cain v2.5** — password recovery / sniffing tool
- **Ethereal** — network packet sniffer (now Wireshark)
- **Network Stumbler** — wireless access point discovery (wardriving)
- **Look@LAN / Look@Host** — network scanner
- **mIRC** — IRC client (commonly used for hacker communication)
- **123 WASP** — web page analysis
- **whois** — domain lookup tool
- **CuteFTP / CuteHTML** — FTP/HTML tools
- **Agent** — Usenet newsgroup reader

### Prefetch Evidence (Programs Actually Executed)
The `WINDOWS/Prefetch` directory confirms the following hacking tools were **actually run** on this system:
- `CAIN25B45.EXE` — Cain & Abel v2.5 beta 45 (password cracking & sniffing)
- `ETHEREAL.EXE` — Ethereal network sniffer
- `NETSTUMBLER.EXE` — Network Stumbler (wireless AP scanner/wardriving tool)
- `LOOKATLAN.EXE` / `LOOKATHOST.EXE` — Look@LAN network scanner
- `MIRC.EXE` / `MIRC612.EXE` — mIRC IRC client
- `WHOIS.EXE` — WHOIS lookup
- `TELNET.EXE` — Telnet client
- `PING.EXE` — Network ping
- `WINPCAP_3_01_A.EXE` — WinPcap installer (packet capture library, required by Ethereal/Cain)

### Installed Programs (Program Files/)
- **Program Files/Ethereal/** — Full Ethereal 0.10.6 installation with plugins
- **Program Files/Anonymizer/** — Anonymizer Toolbar for anonymous web browsing
- **Program Files/Look@LAN/** — Network scanner installation

### Hacking Tool Archives (My Documents/)
The `My Documents` directory contains a methodically organized hacking toolkit structured by attack phase:

**EXPLOITATION/NT/**
- **Brutus** — Password brute-force tool (with NetBus.bad config file targeting port 12345)
- **NetBus** — NetBus 1.70 trojan/RAT (`NetBus170.zip`)
- **Netcat** — "Swiss army knife" network utility (`netcat11nt.zip`)
- **Pwdump** — Windows password hash dumping tools (pwdump, pwdump2, pwdump3)
- **lsadump2** — LSA secret dumping tool (executable present)
- **John** — John the Ripper password cracker
- **l0phtcrack** — L0phtCrack 3.01 password cracker (`lc3setup01.exe`)
- **GetAdmin** — Windows privilege escalation exploit
- **SECHOLE** — Security hole exploit
- **SMBGrind Crack** — SMB password brute-force tool
- **bsniff** — Network sniffer
- **fpipe** — Port forwarding/redirection tool
- **NAT** — NetBIOS auditing tool
- **VNC/WinVNC** — Remote desktop (both NT and Unix versions)
- **dsniff 2.3** — Network sniffing/hijacking suite (Unix)

**FOOTPRINTING/NT/**
- **Nmap NT** — Port scanner with full source code and packet drivers
- **SuperScan** — TCP port scanner
- **NSTPro2** — Network security testing tool
- **spade114.exe** — Network utility

**ENUMERATION/NT/**
- **enum** — Windows enumeration tool (source code and compiled)
- **Cerberus Internet Scanner** — Vulnerability scanner (with scan reports for 172.16.0.2)
- **ogre** — Network enumeration tool

### Suspicious Data
- **`Documents and Settings/Mr. Evil/interception`** — 173 KB binary file, potentially captured/intercepted data
- **Cerberus scan reports** show scanning activity against internal IP `172.16.0.2`

---

## Anti-Virus Scan Results

ClamAV was run against the evidence:

1. **Scan of E01 container files** (`/evidence/nist-hacking-case/`): **0 detections**. ClamAV scanned the E01 image files as opaque containers — it cannot decompose and scan individual files within a disk image.

2. **Scan of extracted case data** (`/home/mulder/.mulder/`): **0 detections** on database and metadata files.

**Important caveat:** ClamAV could not scan the individual files embedded within the E01 disk image. The scan only covered the raw container files. While no traditional viruses were detected at the container level, the disk image contains **NetBus** (a well-known trojan/remote access tool, classified as `Win32.Netbus` or `Backdoor.NetBus` by most antivirus engines) and numerous other offensive security tools that most modern antivirus products would flag as potentially unwanted applications (PUAs), hack tools, or malware.

---

## Case Questions

**Case Q1:** The computer was running **Microsoft Windows XP** (Version 5.1, Build 2600, RTM). This is confirmed by the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` which shows `ProductName = "Microsoft Windows XP"`, `CurrentVersion = "5.1"`, `CurrentBuildNumber = "2600"`.

**Case Q2:** The registered owner is **Greg Schardt**. This is confirmed by the SOFTWARE registry hive value `RegisteredOwner = "Greg Schardt"` at `Microsoft\Windows NT\CurrentVersion`. The sole user profile on the machine is named "Mr. Evil," which matches the suspect's known online alias.

**Case Q3:** ClamAV was run on the evidence and returned **0 detections** on the E01 container files. However, ClamAV cannot scan inside E01 disk images, so individual files within the filesystem were not scanned. The disk image does contain **NetBus** (a known trojan/backdoor, present as `NetBus170.zip` in `My Documents/EXPLOITATION/NT/netbus/`), which most antivirus engines would classify as malware (e.g., `Backdoor.NetBus`). Additionally, numerous hacking tools are present (Cain & Abel, Brutus, lsadump2, L0phtCrack, SECHOLE, etc.) that many AV products flag as hack tools or potentially unwanted applications.