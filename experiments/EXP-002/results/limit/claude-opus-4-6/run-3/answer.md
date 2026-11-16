I now have all the information needed to compile the final report.

---

# Digital Forensic Investigation Report — NIST Hacking Case

## Evidence Examined

- **Image**: `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` (with segment `.E02`)
- **Partition Layout**: Single NTFS partition (sector 63–9,510,479), approximately 4.5 GB
- **Filesystem**: 12,545 files indexed

## Key Findings

### Operating System
The system runs **Microsoft Windows XP** (Version 5.1, Build 2600, no Service Pack installed). The BuildLab string is `2600.xpclient.010817-1148` (original RTM release). The system root is `C:\WINDOWS`.

### Registered Owner
The Windows installation is registered to **Greg Schardt** (RegisteredOrganization: "N/A", ProductId: 55274-640-0147306-23684). The primary user profile on the system is named **"Mr. Evil"**, consistent with the suspect's known online alias.

### Anti-Virus Scan Results
ClamAV was run against the evidence. Scanning the E01/E02 container files directly returned **no virus detections** (`OK` for both files). A second ClamAV scan of the case working directory also returned no detections. **Important limitation**: ClamAV processed the E01 container as a single file — it does not decompose disk images to scan individual files within them. This means the scan does not conclusively prove the absence of viruses among the thousands of files inside the image.

### Hacking Tools and Software Found

The system contains an extensive collection of hacking tools, organized in a methodical directory structure under `My Documents/` that mirrors a structured penetration-testing methodology:

**Installed and Executed (confirmed via Prefetch)**:
- **Cain & Abel** (CAIN25B45.EXE) — password cracking and network sniffing
- **Ethereal 0.10.6** (installed in `Program Files/Ethereal/`) — packet capture/analysis (predecessor to Wireshark)
- **Network Stumbler** (NETSTUMBLER.EXE) — wireless network discovery/wardriving
- **Look@LAN** (LOOKATLAN.EXE, LOOKATHOST.EXE, installed in `Program Files/Look@LAN/`) — network scanning
- **mIRC 6.12** (MIRC.EXE) — IRC client
- **CuteFTP** (CUTE3032.EXE) — FTP client
- **WinPcap 3.01a** — packet capture driver
- **Anonymizer Toolbar** (installed in `Program Files/Anonymizer/`) — anonymous browsing
- **Telnet** and **Ping** — network utilities
- **whois** — domain lookup tool

**Stored Hacking Toolkits (in My Documents)**:
- `EXPLOITATION/NT/Brutus/` — Brutus brute-force password cracker with NetBus attack definition
- `EXPLOITATION/NT/netbus/` — NetBus 1.70 trojan/RAT
- `EXPLOITATION/NT/Pwdump/` — pwdump (password hash dumping, versions 1–3)
- `EXPLOITATION/NT/lsadump2/` — LSA secret dumping tool
- `EXPLOITATION/NT/John/` — John the Ripper password cracker
- `EXPLOITATION/NT/l0pht301/` — L0phtCrack 3.01 password auditing
- `EXPLOITATION/NT/Netcat/` — Netcat "Swiss Army knife" networking utility
- `EXPLOITATION/NT/Get Admin/` — GetAdmin privilege escalation exploit
- `EXPLOITATION/NT/sechole/` — SecHole privilege escalation exploit
- `EXPLOITATION/NT/SMBGrind Crack/` — SMB password grinding/cracking tool
- `EXPLOITATION/NT/vnc/` and `EXPLOITATION/NT/WinVNC/` — VNC remote access
- `EXPLOITATION/NT/bsniff/` — network sniffer
- `EXPLOITATION/NT/fpipe/` — port forwarding/redirector
- `EXPLOITATION/Unix/dsniff 2.3/` — dsniff network auditing toolkit
- `FOOTPRINTING/NT/Nmapnt/` — Nmap network scanner (NT port, with source)
- `FOOTPRINTING/NT/superscan/` — SuperScan port scanner
- `FOOTPRINTING/NT/NSTPro2/` — NST Pro network scanner
- `FOOTPRINTING/NT/spade114.exe` — SPADE (Sam Spade for Windows)
- `ENUMERATION/NT/ogre/` — Ogre network enumeration tool

**Additional Evidence**:
- Outlook Express mailbox for the `alt.hacking` newsgroup (`alt.hacking.dbx`)
- Internet cache containing references to "wardriving"
- The tool collection follows a structured hacking methodology: FOOTPRINTING → ENUMERATION → EXPLOITATION

## Case Questions

**Case Q1:** The computer was running **Microsoft Windows XP** (Version 5.1, Build 2600, original RTM with no Service Pack), as identified from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value under `HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion`. This directly ties the computer to the suspect. The primary user profile is named "Mr. Evil," matching the suspect's known online alias.

**Case Q3:** ClamAV antivirus scanning of the evidence files (4Dell_Latitude_CPi.E01 and .E02) returned **no virus detections**. However, the scan only processed the E01 container files as single objects — it could not scan the individual files within the disk image. While no traditional viruses were detected, the system contains numerous hacking tools that are commonly classified as **Potentially Unwanted Programs (PUPs)** or **hack tools**, including the NetBus trojan/RAT, Brutus brute-forcer, password dumpers (pwdump, lsadump2, L0phtCrack, John the Ripper), and various network exploitation utilities.