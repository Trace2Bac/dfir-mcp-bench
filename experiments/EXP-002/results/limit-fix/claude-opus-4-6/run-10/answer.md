ClamAV found 4 malware detections. I now have everything needed for the final report.

---

# Forensic Investigation Report: NIST Hacking Case

## Case Overview

A Dell CPi notebook computer (serial # VLQLW) was found abandoned with a wireless PCMCIA card and an external homemade 802.11b antenna. The investigation aimed to determine if the computer was used for hacking purposes and to tie it to suspect Greg Schardt (alias "Mr. Evil").

## Evidence Analyzed

- **Disk Image**: `4Dell_Latitude_CPi.E01` (640 MB, EnCase format)
- **Partition**: NTFS partition at sector offset 63 (9,510,417 sectors)
- **Files indexed**: 12,545 filesystem entries

## Key Findings

### System Information
- **Operating System**: Microsoft Windows XP (Version 5.1, Build 2600)
- **Registered Owner**: Greg Schardt
- **User Profile**: "Mr. Evil" (the suspect's known alias)
- **Install Date**: August 19, 2004 (Unix epoch 1092955707)
- **Product ID**: 55274-640-0147306-23684

### Suspect Identification
The computer is tied to Greg Schardt through:
1. The Windows registered owner field: **Greg Schardt**
2. The active Windows user profile named **"Mr. Evil"** (the suspect's known online alias)
3. Outlook Express newsgroup subscriptions to hacking-related groups (alt.2600.*, alt.binaries.hacking.*, alt.hacking, etc.)
4. A cookie from **www.netstumbler.com** (wardriving tool website)
5. Extensive hacking tool collection organized in categorized directories

### Hacking Software Found
The computer contained a comprehensive hacking toolkit organized under `My Documents/`:

**Exploitation Tools** (`My Documents/EXPLOITATION/NT/`):
- Brutus (password brute-forcer) with NetBus remote access trojan
- Pwdump / Pwdump2 / Pwdump3 (Windows password hash dumpers)
- lsadump2 (LSA secrets dumper)
- Netcat (network utility/"Swiss Army knife" of hacking)
- NetBus (remote access trojan)
- John the Ripper (password cracker)
- L0phtCrack (Windows password auditing tool)
- GetAdmin (privilege escalation exploit)
- SecHole (privilege escalation exploit)
- SMBGrind Crack (SMB password cracker)
- VNC/WinVNC (remote desktop access)
- dsniff (network sniffing suite)
- fpipe (port forwarding/redirection)
- NAT (NetBIOS auditing tool)

**Footprinting Tools** (`My Documents/FOOTPRINTING/NT/`):
- Nmap (network port scanner)
- SuperScan (port scanner)
- NSTPro2 (network scanner)
- Spade (network tool)

**Enumeration Tools** (`My Documents/ENUMERATION/NT/`):
- Cerberus Internet Scanner
- enum (Windows enumeration tool)
- ogre (network enumeration)

**Installed Programs** (`Program Files/`):
- Ethereal (network protocol analyzer/packet sniffer)
- Anonymizer (anonymous browsing toolbar)
- Look@LAN (network monitoring)
- Network Stumbler (wireless network discovery/wardriving)
- Cain v2.5 (password recovery/sniffing tool, confirmed executed via Prefetch: `CAIN25B45.EXE-056F3A6E.pf`)

**Desktop Tools shortcuts** confirm active use of: Cain v2.5, Ethereal, Network Stumbler, Look@LAN, Look@Host, mIRC, Agent (newsreader), CuteFTP, whois

### Anti-Virus Scan Results (ClamAV)
ClamAV detected **4 malicious files** on the computer:

| File Path | ClamAV Detection |
|---|---|
| `My Documents/COMMANDS/snitch.exe` (inode 10277) | **Win.Trojan.Snitch-1** |
| `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` (inode 10600) | **Win.Trojan.Lsadump-1** |
| `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` (inode 10626) | **Win.Exploit.WinNT-3** |
| `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` (inode 10569) | **Win.Trojan.Sehole-1** |

### Evidence of Use
- **Prefetch files** confirm execution of Cain v2.5 (`CAIN25B45.EXE`), Telnet, WinPcap installer, and command prompt
- **Outlook Express** was configured with subscriptions to dozens of hacking newsgroups
- **Cookies** show visits to netstumbler.com and other sites
- An **"interception"** file was found on Mr. Evil's desktop (inode 12264)

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as identified from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive value `RegisteredOwner` under `Microsoft\Windows NT\CurrentVersion`. The active user profile is named "Mr. Evil," the suspect's known alias.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **4 infected files**: `snitch.exe` (Win.Trojan.Snitch-1), `lsadump2.exe` (Win.Trojan.Lsadump-1), `GetAdmin.exe` (Win.Exploit.WinNT-3), and `SECHOLE.EXE` (Win.Trojan.Sehole-1). All were located in the hacking tool directories under `My Documents/`.