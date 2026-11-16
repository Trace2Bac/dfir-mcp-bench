I now have all the evidence needed to write the final report.

---

# Digital Forensic Investigation Report — NIST Hacking Case

## Evidence Examined

- **Image**: `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` (with segment E02)
- **Computer**: Dell Latitude CPi notebook, S/N VLQLW
- **Filesystem**: NTFS partition at sector offset 63, ~4.87 GB

## Operating System

The registry hive at `SOFTWARE\Microsoft\Windows NT\CurrentVersion` confirms:

| Field | Value |
|---|---|
| ProductName | Microsoft Windows XP |
| CurrentVersion | 5.1 |
| CurrentBuildNumber | 2600 |
| BuildLab | 2600.xpclient.010817-1148 |
| SystemRoot | C:\WINDOWS |
| CSDVersion | *(not present — no Service Pack installed)* |

## Registered Owner

The registry value `RegisteredOwner` under `SOFTWARE\Microsoft\Windows NT\CurrentVersion` is **Greg Schardt**. The `RegisteredOrganization` is "N/A". The sole user profile on the system is **"Mr. Evil"**, matching the suspect's known alias.

## Anti-Virus Check (ClamAV)

ClamAV was run on the evidence directory (`/evidence/nist-hacking-case`). **Result: 0 detections.** However, ClamAV explicitly reported that it scanned the E01/E02 container files as single files and **cannot open disk images to scan the individual files inside**. This means the files within the forensic image were not individually scanned, so the "0 detections" result does not confirm that the contents of the disk image are free of viruses.

The disk image contains numerous hacking tools that commercial antivirus products typically flag as hack-tools, trojans, or potentially unwanted programs — most notably **NetBus** (a well-known remote access trojan found at `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip`).

## Hacking Software Found

The system is heavily loaded with organized hacking toolkits. The `My Documents` folder contains a structured toolkit organized by attack phase:

### FOOTPRINTING tools
- **Nmap NT** (source + binaries) — port/service scanner
- **SuperScan** — TCP port scanner
- **SPADE** (spade114.exe) — network probe
- **NSTPro2** — network scanner

### ENUMERATION tools
- **Cerberus Internet Scanner** — vulnerability scanner
- **enum** — Windows enumeration tool
- **ogre** — system enumeration tool

### EXPLOITATION tools
- **NetBus 1.70** — remote access trojan (NetBus170.zip, configuration files)
- **Brutus** — password cracking tool (with NetBus brute-force definition)
- **Netcat** (netcat11nt.zip) — "Swiss Army knife" network utility
- **Pwdump** (versions 1-3) — Windows password hash dumper
- **lsadump2** — LSA secrets dumper
- **GetAdmin** — privilege escalation exploit
- **SECHOLE** — privilege escalation exploit
- **John the Ripper** (john-16w.zip, john-1.6.tar.gz) — password cracker
- **L0phtCrack 3** (lc3setup01.exe) — password cracker
- **SMBGrind** — SMB password cracking tool
- **dsniff 2.3** — network traffic sniffer/credential interceptor
- **VNC** (WinVNC) — remote desktop access
- **NAT** — NetBIOS auditing tool
- **fpipe** — port forwarding/redirection
- **hk** — exploit toolkit
- **elsave** — event log utility
- **bsniff** — network sniffer

### Installed Programs (Program Files)
- **Ethereal 0.10.6** — packet capture/analysis (now Wireshark)
- **Look@LAN** — network monitoring/discovery
- **Anonymizer** — web anonymity toolbar
- **Agent** — Usenet newsgroup reader
- **mIRC 6.12** — IRC client (confirmed via Prefetch)
- **Cain & Abel** (CAIN25B45.EXE, confirmed executed via Prefetch)
- **Network Stumbler 0.4.0** (confirmed executed via Prefetch — wireless AP discovery)
- **WinPcap 3.01a** — packet capture driver

### Evidence of Use (Windows Prefetch)
The Prefetch directory confirms these tools were executed on the system:
- `CAIN25B45.EXE-056F3A6E.pf` — Cain & Abel (password sniffing/cracking)
- `ETHEREAL.EXE-1C148EEF.pf` — Ethereal packet sniffer
- `NETSTUMBLER.EXE-0BFEE568.pf` — Network Stumbler (wardriving)
- `LOOKATLAN.EXE-1F991DD9.pf` — Look@LAN network scanner
- `MIRC.EXE-0661EC22.pf` — mIRC IRC client
- `WHOIS.EXE-38443FF6.pf` — WHOIS lookup tool
- `TELNET.EXE-24182D40.pf` — Telnet client
- `PING.EXE-31216D26.pf` — Ping utility

### Additional Evidence Tying the Computer to the Suspect
- User profile name: **"Mr. Evil"** (suspect's known alias)
- Subscribed to **alt.hacking** newsgroup (Outlook Express database `alt.hacking.dbx`)
- Internet cache contains **wardriving** related content
- Registered owner: **Greg Schardt** (the suspect's name)
- Product ID: 55274-640-0147306-23684

---

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP** (Version 5.1, Build 2600, no Service Pack), as confirmed by the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion\ProductName`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion\RegisteredOwner`.

**Case Q3:** ClamAV was run on the evidence and reported **0 detections**. However, ClamAV scanned only the E01/E02 container files and cannot open disk images to scan individual files inside — so this result does not confirm the disk contents are virus-free. The system does contain **NetBus** (a known remote access trojan, found at `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip`), along with numerous other hacking tools (Cain & Abel, Brutus, pwdump, lsadump2, GetAdmin, SECHOLE, etc.) that commercial antivirus products typically detect as hack-tools or potentially unwanted programs.