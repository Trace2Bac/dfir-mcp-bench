I now have all the evidence needed. Let me compile the final report.

---

# Forensic Investigation Report — NIST Hacking Case

**Case ID:** nist-hacking-case-av  
**Evidence:** Dell Latitude CPi notebook, Serial # VLQLW (EnCase image: 4Dell_Latitude_CPi.E01/E02)  
**Date of Analysis:** 2026-11-16  
**Examiner:** Digital Forensic Examiner

---

## Evidence Summary

The disk image contains a single NTFS partition (sector offset 63, ~4.6 GB) with 12,545 filesystem entries. The system was running a fully installed Windows XP environment with a single user account named **"Mr. Evil"** — the known alias of the suspect.

## Key Findings

### 1. System Identification
- **Operating System:** Microsoft Windows XP, Build 2600, Version 5.1 (Uniprocessor Free)
- **System Root:** C:\WINDOWS
- **Product ID:** 55274-640-0147306-23684
- **Install Date:** August 19, 2004 (Unix epoch 1092955707)

### 2. Registered Owner
The SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` records:
- **RegisteredOwner:** Greg Schardt
- **RegisteredOrganization:** N/A

This directly ties the computer to the suspect **Greg Schardt**.

### 3. User Profile
The sole user account is **"Mr. Evil"** (located at `Documents and Settings/Mr. Evil/`), which matches the suspect's known online alias. The Desktop contains a "Tools" folder with shortcuts to hacking tools: Cain v2.5, Ethereal, mIRC, Look@LAN, Network Stumbler, 123 WASP, CuteFTP, and Agent.

### 4. Hacking Software Found
The system contains an extensive, organized collection of hacking tools:

| Category | Tools Found |
|---|---|
| **EXPLOITATION/NT/** | Brutus (password cracker), NetBus (remote access trojan), Netcat, GetAdmin (privilege escalation), lsadump2 (LSA secrets dumper), SECHOLE (security exploit), l0phtCrack (password cracker), SMBGrind, Pwdump, VNC, John the Ripper |
| **EXPLOITATION/Unix/** | dsniff (network sniffer), John the Ripper (Unix), VNC |
| **ENUMERATION/NT/** | Ogre, enum, Cerberus Internet Scanner, user2sid, snitch |
| **FOOTPRINTING/NT/** | NmapNT (port scanner), NSTPro2, SuperScan, spade114 |
| **Installed Programs** | Ethereal (packet sniffer/protocol analyzer), Anonymizer (traffic anonymization), Look@LAN (network scanner), mIRC (IRC client), Cain v2.5 (password recovery/sniffing), Network Stumbler (wardriving/WiFi discovery), WinPcap (packet capture) |

### 5. Evidence of Use
- **Prefetch files** confirm execution of: CAIN25B45.EXE, TELNET.EXE, WINPCAP_3_01_A.EXE, CMD.EXE
- **mIRC chat logs** show the user connected to suspicious IRC channels: `#Elite.Hackers.UnderNet`, `#ISO-WAREZ.EFnet`, `#evilfork.EFnet`, `#LuxShell.UnderNet`, `#ushells.UnderNet`
- **Cookies** show browsing to `www.netstumbler.com` (wardriving community)
- A cached file named `wardriving[1]` was found in the IE Temporary Internet Files

### 6. Anti-Virus Scan Results (ClamAV)
ClamAV detected **4 malware/hacking tool signatures** among the extracted files:

| File | Path | Detection |
|---|---|---|
| inode 10600 | My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe | **Win.Trojan.Lsadump-1** |
| inode 10626 | My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe | **Win.Exploit.WinNT-3** |
| inode 10569 | My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE | **Win.Trojan.Sehole-1** |
| inode 10589 | My Documents/EXPLOITATION/NT/netbus/NetBus170.zip | **Win.Trojan.Netbus-2** |

---

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP**, Version 5.1, Build 2600 (as identified in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`).

**Case Q2:** The registered owner is **Greg Schardt** (as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`). This ties the computer directly to the suspect.

**Case Q3:** Yes, there are viruses/malicious software on the computer. ClamAV detected **4 infections**:
1. **Win.Trojan.Lsadump-1** — `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` (LSA secrets dumping trojan)
2. **Win.Exploit.WinNT-3** — `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` (Windows NT privilege escalation exploit)
3. **Win.Trojan.Sehole-1** — `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` (Security hole exploitation trojan)
4. **Win.Trojan.Netbus-2** — `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` (NetBus remote access trojan)

These are all well-known hacking/exploitation tools consistent with the suspect's alleged activities of intercepting internet traffic and attempting to steal credentials at wireless access points.