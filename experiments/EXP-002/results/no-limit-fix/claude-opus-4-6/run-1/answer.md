Now I have all the evidence needed for a comprehensive report. Here is the final report:

---

# Forensic Investigation Report: NIST Hacking Case

## Case Summary

A Dell CPi notebook computer (serial # VLQLW) was found abandoned along with a wireless PCMCIA card and an external homemade 802.11b antenna. The investigation aimed to determine the operating system, registered owner, and presence of malware, and to link the computer to suspected hacker Greg Schardt (alias "Mr. Evil").

## Evidence Analyzed

- **Image**: `4Dell_Latitude_CPi.E01` / `.E02` (640 MB EnCase image)
- **Partition**: NTFS partition at sector offset 63, spanning ~4.87 GB
- **Filesystem**: 12,545 files indexed

## Key Findings

### Operating System
The Windows registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`) confirms:
- **ProductName**: Microsoft Windows XP
- **CurrentVersion**: 5.1
- **CurrentBuildNumber**: 2600
- **BuildLab**: 2600.xpclient.010817-1148
- **SystemRoot**: C:\WINDOWS

### Registered Owner
- **RegisteredOwner**: Greg Schardt
- **RegisteredOrganization**: N/A
- **ProductId**: 55274-640-0147306-23684

This directly ties the computer to the suspect. The primary user profile on the system is named **"Mr. Evil"** (the suspect's known alias), further confirming the link.

### Anti-Virus Scan Results (ClamAV)
ClamAV scanning of extracted executables from the disk image found **4 malware detections**:

| File Path | ClamAV Signature | Description |
|---|---|---|
| `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` | **Win.Trojan.Lsadump-1** | LSA secrets dump tool |
| `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` | **Win.Exploit.WinNT-3** | Windows NT privilege escalation exploit |
| `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` | **Win.Trojan.Sehole-1** | Windows NT security hole exploit |
| `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` | **Win.Trojan.Netbus-2** | NetBus remote access trojan |

### Hacking Tools & Software Identified
The disk contains an extensive, well-organized hacking toolkit stored under `My Documents/` in categorized directories:

**EXPLOITATION tools:**
- Brutus (password cracker with NetBus integration)
- NetBus 1.70 (remote access trojan)
- Netcat (network utility / backdoor)
- GetAdmin (privilege escalation)
- lsadump2 (LSA secrets dumper)
- SecHole (security hole exploit)
- Pwdump / Pwdump2 / Pwdump3 (password hash dumpers)
- SMBGrind Crack (SMB password cracker)
- L0phtCrack 3 (lc3setup01.exe — password auditing)
- John the Ripper (john-16w.zip — password cracker)
- VNC / WinVNC (remote desktop)
- fpipe (port forwarder/redirector)
- dsniff 2.3 (network sniffing suite)
- NAT (NetBIOS auditing tool)

**FOOTPRINTING tools:**
- NmapNT (network scanner, full source code)
- NSTPro2 (network security toolkit)
- SuperScan (port scanner)
- Spade 1.14 (network diagnostic tool)

**ENUMERATION tools:**
- Cerberus Internet Scanner
- Enum (Windows enumeration tool)
- Ogre (system information gathering)

**COMMANDS (utility tools):**
- snitch.exe, user2sid.exe, STREAMFIND.EXE, and various scripting utilities

**Installed Programs (Program Files):**
- **Cain v2.5** — password recovery/sniffing tool (confirmed executed via Prefetch: `CAIN25B45.EXE-056F3A6E.pf`)
- **Ethereal** — network packet analyzer (installed in Program Files)
- **Look@LAN** — network monitoring tool
- **Network Stumbler** — wireless network scanner (shortcut on desktop, Start Menu)
- **Anonymizer Toolbar** — anonymous browsing tool
- **mIRC** — IRC client
- **123 WASP** — web scraping/password tool
- **Agent Newsreader** — used to access `alt.hacking` newsgroup (confirmed by `alt.hacking.dbx` in Outlook Express)
- **CuteFTP / CuteHTML** — file transfer/web editing tools
- **WinPcap 3.01a** — packet capture driver (confirmed via Prefetch)

### Evidence of Tool Usage
Prefetch files confirm actual execution of hacking tools:
- `CAIN25B45.EXE` — Cain & Abel was executed
- `WINPCAP_3_01_A.EXE` — WinPcap was installed
- `TELNET.EXE` — Telnet was used
- `CMD.EXE` — Command prompt was used

### Suspect Linkage
Multiple artifacts tie the computer to Greg Schardt:
1. Registry RegisteredOwner = "Greg Schardt"
2. User profile named "Mr. Evil" (suspect's known alias)
3. Cookie for `www.netstumbler.com` under the Mr. Evil profile
4. Subscription to `alt.hacking` newsgroup via Outlook Express
5. Tools directory organized on the desktop as "Tools" with shortcuts to all hacking applications

---

## Case Questions

**Case Q1**: The operating system is **Microsoft Windows XP** (Version 5.1, Build 2600), as confirmed by the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2**: The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive value `RegisteredOwner` at `Microsoft\Windows NT\CurrentVersion`. The registered organization is listed as "N/A".

**Case Q3**: **Yes, there are viruses on the computer.** ClamAV detected 4 malware samples among the extracted files:
1. **Win.Trojan.Lsadump-1** — `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe`
2. **Win.Exploit.WinNT-3** — `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe`
3. **Win.Trojan.Sehole-1** — `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE`
4. **Win.Trojan.Netbus-2** — `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip`

These are all hacking/exploitation tools classified as trojans or exploits by ClamAV signatures. The initial ClamAV scan of the raw E01 container files returned 0 detections, but scanning individual executables extracted by inode from the filesystem revealed the 4 detections listed above.