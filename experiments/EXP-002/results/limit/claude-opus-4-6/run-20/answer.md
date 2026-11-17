I now have all the evidence needed to answer the case questions. Let me compile the final report.

---

# Forensic Investigation Report — NIST Hacking Case

## Case Overview

**Evidence:** Dell Latitude CPi notebook computer (serial # VLQLW), EnCase image `4Dell_Latitude_CPi.E01` / `.E02`
**Image:** Single NTFS partition (offset 63, ~4.87 GB) on a DOS partition table

## System Identification

**Operating System:** Microsoft Windows XP, Version 5.1, Build 2600 (Uniprocessor Free)
- Build Lab: `2600.xpclient.010817-1148`
- System Root: `C:\WINDOWS`
- Install Date: Unix epoch 1092955707 (August 19, 2004)
- Product ID: `55274-640-0147306-23684`

**Registered Owner:** Greg Schardt
**Registered Organization:** N/A

**User Profile:** The primary user profile on the system is **"Mr. Evil"** (`Documents and Settings/Mr. Evil/`), consistent with the suspect's known alias.

## Tying the Computer to the Suspect

The Windows registry `SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner` value is **"Greg Schardt"** — the suspect's real name. The user account on the system is named **"Mr. Evil"**, the suspect's known online alias. This directly ties this computer to Greg Schardt / "Mr. Evil."

## Hacking Software Found

The computer contains an extensive, organized collection of hacking tools in `My Documents/`, categorized by attack phase:

### Exploitation Tools (`My Documents/EXPLOITATION/`)
- **Brutus** — Password brute-forcing tool (with NetBus.bad definition file targeting port 12345)
- **NetBus** — Remote access trojan (NetBus170.zip, NetBus.rtf documentation)
- **Netcat** — Network utility often used for backdoors (netcat11nt.zip)
- **Pwdump** — Windows password hash dumper (pwdump, pwdump2, pwdump3)
- **lsadump2** — LSA secrets dumper
- **L0phtCrack 3** — Password cracking tool (lc3setup01.exe)
- **John the Ripper** — Password cracker (john-16w.zip for NT, john-1.6.tar.gz for Unix)
- **GetAdmin** — Privilege escalation exploit
- **SecHole** — Security hole exploitation tool
- **SMBGrind Crack** — SMB password cracker
- **bsniff** — Network sniffer
- **fpipe** — Port redirector
- **dsniff 2.3** — Network sniffing/spoofing suite
- **VNC/WinVNC** — Remote desktop (multiple platforms)
- **NAT** — NetBIOS auditing tool

### Footprinting Tools (`My Documents/FOOTPRINTING/`)
- **Nmap NT** — Network port scanner (full source code included)
- **SuperScan** — TCP port scanner
- **Spade** — Network reconnaissance (spade114.exe)
- **NSTPro2** — Network scanner

### Enumeration Tools (`My Documents/ENUMERATION/`)
- **Cerberus Internet Scanner** — Vulnerability scanner (with scan reports for 172.16.0.2)
- **enum** — Windows enumeration tool
- **Ogre** — Network enumeration tool

### Other Tools (`My Documents/COMMANDS/`)
- **snitch.exe** — System info gathering
- **user2sid.exe / sid2user.exe** — SID/username resolution
- **STREAMFIND.EXE** — NTFS alternate data stream detector

### Installed Software (Program Files)
- **Ethereal 0.10.6** — Network packet analyzer (installed, with Start Menu shortcuts)
- **Look@LAN** — Network monitoring/discovery tool
- **Anonymizer Toolbar** — Anonymous browsing tool
- **Cain & Abel** (v2.5 beta 45) — Password recovery/sniffing tool
- **Network Stumbler 0.4.0** — Wireless network discovery (wardriving tool)
- **WinPcap 3.01a** — Packet capture driver (required by sniffing tools)
- **mIRC 6.12** — IRC client (commonly used by hackers for communication)
- **CuteFTP** — FTP client

### Evidence of Tool Execution (Prefetch files)
The following hacking tools have confirmed execution evidence via Windows Prefetch:
- `CAIN25B45.EXE` — Cain & Abel password sniffer
- `ETHEREAL.EXE` — Packet sniffer
- `NETSTUMBLER.EXE` — Wireless AP discovery (wardriving)
- `LOOKATLAN.EXE` / `LOOKATHOST.EXE` — Network discovery
- `MIRC.EXE` — IRC client
- `WHOIS.EXE` — Domain lookup
- `TELNET.EXE` — Remote access
- `PING.EXE` — Network probe
- `WINPCAP_3_01_A.EXE` — Packet capture installer

### Other Indicators
- **alt.hacking.dbx** — Outlook Express newsgroup folder for the `alt.hacking` newsgroup
- **Wardriving content** in IE temporary internet files
- **Network shares accessed** from "Andrews-1" computer (visible in Mr. Evil's NetHood)

## Anti-Virus Scan Results

ClamAV was executed against the evidence directory `/evidence/nist-hacking-case`:

```
/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01: OK
/evidence/nist-hacking-case/4Dell_Latitude_CPi.E02: OK
Detections: 0
```

**Important caveat:** ClamAV scanned the E01 container files as opaque blobs — it cannot open EnCase disk images to scan individual files within the filesystem. The scan therefore does not definitively establish that no malware exists inside the image. However, the scan returned **no virus detections**.

The hacking tools found (NetBus, Brutus, Pwdump, etc.) are dual-use security/hacking utilities. While many antivirus products flag them as "potentially unwanted programs" or "hack tools," they are not viruses in the traditional sense (self-replicating malware). No evidence of traditional viruses, worms, or trojans infecting the system was found during the investigation.

---

## Case Questions

**Case Q1:** The computer was running **Microsoft Windows XP**, Version 5.1, Build 2600 (registry key: `SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProductName` = "Microsoft Windows XP").

**Case Q2:** The registered owner is **Greg Schardt** (registry key: `SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner` = "Greg Schardt"). This ties the computer directly to the suspect.

**Case Q3:** ClamAV anti-virus scan returned **no virus detections** (0 detections). ClamAV scanned the E01 evidence containers and found them clean. Note that ClamAV cannot scan inside EnCase disk image formats, so individual files within the image were not individually scanned. The system contains numerous hacking/exploitation tools (NetBus, Brutus, Cain & Abel, Nmap, Pwdump, etc.) that many AV products would flag as hack tools or potentially unwanted programs, but no traditional viruses were identified.