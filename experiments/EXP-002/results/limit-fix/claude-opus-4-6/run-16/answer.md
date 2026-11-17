I now have all the information needed. Let me compile the final report.

---

# Digital Forensic Report: NIST Hacking Case

## Case Overview

**Evidence:** Dell CPi Notebook Computer (Serial # VLQLW), EnCase image `4Dell_Latitude_CPi.E01`/`.E02`  
**Date Found:** 09/20/2004  
**Suspect:** Greg Schardt (alias "Mr. Evil")  
**Filesystem:** NTFS partition (sectors 63–9,510,479)

## System Identification

The registry at `SOFTWARE\Microsoft\Windows NT\CurrentVersion` confirms:
- **ProductName:** Microsoft Windows XP
- **CurrentVersion:** 5.1 (Build 2600)
- **RegisteredOwner:** Greg Schardt
- **RegisteredOrganization:** N/A
- **ProductId:** 55274-640-0147306-23684
- **SystemRoot:** C:\WINDOWS
- **InstallDate:** 1092955707 (August 19, 2004)

The primary user profile on the system is **"Mr. Evil"** (located at `Documents and Settings/Mr. Evil/`), which matches the suspect's known online nickname.

## Tying the Computer to the Suspect

The registered owner in the Windows registry is **Greg Schardt** — the suspect named in the case briefing. The user profile "Mr. Evil" matches his known alias. The computer was found with wireless equipment consistent with his associates' descriptions of wardriving activity. Cookies on the system include visits to `www.netstumbler.com` (a wardriving resource).

## Hacking Software Found

The disk contains an extensive, organized collection of hacking tools in `My Documents/`, categorized by attack phase:

### Footprinting
- **Nmap NT** — network port scanner (source code and binaries)
- **SuperScan** — TCP port scanner
- **Sam Spade** (`spade114.exe`) — network query tool
- **NSTPro2** — network scanner
- **whois** tool (shortcuts on desktop, prefetch confirms execution)

### Enumeration
- **Cerberus Internet Scanner** — vulnerability scanner (with scan reports for 172.16.0.2)
- **Ogre** — NetBIOS enumeration tool
- **enum** — Windows enumeration tool
- **user2sid.exe**, **sid2user.exe** — SID/username resolvers

### Exploitation
- **NetBus** (`NetBus170.zip`) — remote access trojan
- **Netcat** (`netcat11nt.zip`) — "Swiss army knife" networking tool
- **Pwdump** (versions 1–3) — Windows password hash dumper
- **lsadump2** — LSA secrets dumper
- **L0phtCrack 3** (`lc3setup01.exe`) — password cracker
- **John the Ripper** (NT and Unix versions) — password cracker
- **GetAdmin** — privilege escalation exploit
- **SecHole** (`SECHOLE.EXE`, `SECHOLED.EXE`) — Windows NT security hole exploit
- **SMBGrind Crack** — SMB brute-force password cracker
- **VNC / WinVNC** — remote desktop tool
- **Brutus** — network brute-force authentication cracker
- **bsniff** — network sniffer
- **fpipe** — TCP/UDP port redirector
- **NAT** (NetBIOS Auditing Tool)
- **dsniff 2.3** — network traffic sniffer/interceptor

### Installed & Executed Programs (confirmed via Prefetch)
- **Cain v2.5** (`CAIN25B45.EXE`) — password recovery/sniffing tool
- **Ethereal 0.10.6** — packet capture/analysis (predecessor to Wireshark)
- **Network Stumbler** (`NETSTUMBLER.EXE`) — wireless network discovery (wardriving)
- **Look@LAN** — network monitoring
- **mIRC 6.12** — IRC client
- **Anonymizer** — anonymous web browsing toolbar
- **WinPcap 3.01** — packet capture library
- **Telnet** — remote access

### Dictionaries for Password Cracking
- 250MB wordlist, biglist, pocket-dic, Unix dictionary, English words

### Newsgroup Subscriptions (Outlook Express)
Subscriptions to hacking-related newsgroups including: `alt.2600`, `alt.2600.cardz`, `alt.2600.codez`, `alt.2600.crackz`, `alt.2600.hackerz`, `alt.2600.phreakz`, `alt.2600.programz`, `alt.binaries.hacking.beginner`, `alt.binaries.hacking.computers`, `alt.binaries.hacking.utilities`, `alt.binaries.hacking.websites`, `alt.dss.hack`, `alt.hacking`

### Other Notable Artifacts
- **"interception"** file on Mr. Evil's desktop (file inode 12264) — consistent with the suspect's described activity of intercepting internet traffic
- Cookies for `www.netstumbler.com` — wardriving resource site

## Anti-Virus Scan Results (ClamAV)

ClamAV detected **5 viruses/malware** among files extracted from the disk image:

| File (Original Path) | ClamAV Detection |
|---|---|
| `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` (inode 10600) | **Win.Trojan.Lsadump-1** |
| `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` (inode 10626) | **Win.Exploit.WinNT-3** |
| `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` (inode 10569) | **Win.Trojan.Sehole-1** |
| `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` (inode 10589) | **Win.Trojan.Netbus-2** |
| `My Documents/COMMANDS/snitch.exe` (inode 10277) | **Win.Trojan.Snitch-1** |

All detections are hacking/exploitation tools classified as trojans or exploits by ClamAV.

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as identified from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`. The system's user profile is named "Mr. Evil," matching the suspect's known alias.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **5 infections**: Win.Trojan.Lsadump-1 (lsadump2.exe), Win.Exploit.WinNT-3 (GetAdmin.exe), Win.Trojan.Sehole-1 (SECHOLE.EXE), Win.Trojan.Netbus-2 (NetBus170.zip), and Win.Trojan.Snitch-1 (snitch.exe). All are hacking tools and exploits stored in the user's `My Documents/EXPLOITATION/` and `My Documents/COMMANDS/` directories.