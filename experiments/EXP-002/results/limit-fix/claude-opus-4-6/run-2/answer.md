I now have all the evidence needed. Here is the final report.

---

# Forensic Investigation Report — NIST Hacking Case

## Evidence Summary

**Image**: 4Dell_Latitude_CPi.E01 / .E02 (Dell CPi notebook, serial VLQLW)  
**Partition**: NTFS at sector offset 63  
**Filesystem**: 12,545 files indexed  

## System Identification

The Windows registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`) confirms:

- **ProductName**: Microsoft Windows XP
- **CurrentVersion**: 5.1
- **CurrentBuildNumber**: 2600
- **RegisteredOwner**: Greg Schardt
- **RegisteredOrganization**: N/A
- **SystemRoot**: C:\WINDOWS
- **InstallDate**: 2004-08-19 (Unix epoch 1092955707)
- **ProductId**: 55274-640-0147306-23684

The primary user profile on the system is `Documents and Settings/Mr. Evil`, consistent with the suspect's known alias.

## Hacking Software Found

The disk contains a comprehensive collection of hacking tools organized in `My Documents/` under categories matching a structured hacking methodology:

- **FOOTPRINTING**: Nmap (nmapNT source + binary), SuperScan, NSTPro2, spade114.exe
- **ENUMERATION**: Cerberus Internet Scanner, enum, ogre, user2sid, sid2user
- **EXPLOITATION**: Brutus (password cracker), NetBus (remote access trojan), Netcat, Pwdump (1-3), lsadump2, GetAdmin, SECHOLE, SMBGrind Crack, VNC, l0phtCrack, John the Ripper, dsniff, NAT, fpipe
- **COMMANDS**: snitch.exe, user2sid, sid2user, STREAMFIND.EXE, various enumeration utilities

**Installed Programs** (Program Files):
- **Cain & Abel** (`Program Files/Cain/`) — password cracking/sniffing suite with ARP poisoning capability; Prefetch entry `CAIN25B45.EXE` confirms execution
- **Ethereal 0.10.6** — packet sniffer/analyzer; Prefetch confirms execution
- **Network Stumbler** — wireless network discovery tool; Prefetch confirms execution
- **Look@LAN** — network scanner; Prefetch confirms execution
- **Anonymizer Toolbar** — anonymity/privacy tool
- **mIRC 6.12** — IRC client; Prefetch confirms execution
- **WinPcap** — packet capture driver; Prefetch confirms installation

**Prefetch evidence** also shows execution of: Telnet, ping, whois, cmd.exe — common network reconnaissance tools.

## Anti-Virus Scan Results (ClamAV)

ClamAV scanning of extracted files detected **4 threats**:

| File | Path | Detection |
|------|------|-----------|
| lsadump2.exe | My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe | **Win.Trojan.Lsadump-1** |
| GetAdmin.exe | My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe | **Win.Exploit.WinNT-3** |
| SECHOLE.EXE | My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE | **Win.Trojan.Sehole-1** |
| snitch.exe | My Documents/COMMANDS/snitch.exe | **Win.Trojan.Snitch-1** |

These are all hacking/exploitation tools flagged by ClamAV as trojans or exploits. They are part of the suspect's toolkit, not infections per se, but they are malicious software by classification.

## Tying the Computer to the Suspect

- The **registered owner** in the Windows registry is **Greg Schardt**, the suspect's real name.
- The primary user profile is named **"Mr. Evil"**, the suspect's known online alias.
- The newsgroup database `alt.hacking.dbx` was found in the Mr. Evil Outlook Express identity, showing interest in hacking communities.
- The organized hacking toolkit (FOOTPRINTING → ENUMERATION → EXPLOITATION) demonstrates methodical hacking intent.
- Network tools (Ethereal, NetStumbler, Cain & Abel with ARP poisoning lists) are consistent with the described wireless interception activities.

---

## Case Questions

**Case Q1**: The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as confirmed by the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2**: The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of `SOFTWARE\Microsoft\Windows NT\CurrentVersion`.

**Case Q3**: Yes, ClamAV detected **4 viruses/malicious programs** on the computer:
1. **Win.Trojan.Lsadump-1** — `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` (LSA secrets dumping tool)
2. **Win.Exploit.WinNT-3** — `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` (privilege escalation exploit)
3. **Win.Trojan.Sehole-1** — `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` (security hole exploit)
4. **Win.Trojan.Snitch-1** — `My Documents/COMMANDS/snitch.exe` (information-gathering trojan)