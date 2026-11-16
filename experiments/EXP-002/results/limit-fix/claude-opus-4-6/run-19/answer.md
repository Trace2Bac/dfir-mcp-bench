One more detection from the Brutus zip. Now I have all the evidence needed for the final report.

---

# Digital Forensic Investigation Report — NIST Hacking Case

## Case Overview

**Evidence:** Dell Latitude CPi notebook computer, serial # VLQLW, found abandoned on 09/20/04 with a wireless PCMCIA card and external homemade 802.11b antenna.

**Disk Image:** `4Dell_Latitude_CPi.E01` (640 MB, NTFS partition at sector offset 63)

## Key Findings

### Operating System & Ownership

The Windows registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`) reveals:
- **OS:** Microsoft Windows XP, Version 5.1, Build 2600 (Uniprocessor Free)
- **Registered Owner:** Greg Schardt
- **Product ID:** 55274-640-0147306-23684
- **Install Date:** Unix timestamp 1092955707 (2004-08-19)
- **System Root:** `C:\WINDOWS`

The primary user account on the system is named **"Mr. Evil"** (path: `Documents and Settings/Mr. Evil/`), which matches the known online alias of suspect Greg Schardt.

### Hacking Software Inventory

The computer contains an extensively organized hacking toolkit stored in `My Documents/` with categorized subdirectories:

**EXPLOITATION tools:**
- Brutus (brute-force password cracker)
- NetBus 1.70 (remote administration trojan)
- Netcat (network utility/"Swiss army knife")
- Pwdump / Pwdump2 / Pwdump3 (Windows password hash dumpers)
- lsadump2 (LSA secrets dumper)
- GetAdmin (privilege escalation exploit)
- SECHOLE (security hole exploit)
- L0phtCrack 3 (password auditing tool)
- John the Ripper (password cracker, NT and Unix versions)
- SMBGrind Crack (SMB password cracker)
- VNC / WinVNC (remote desktop)
- dsniff 2.3 (network sniffing suite)
- NAT (NetBIOS auditing tool)

**FOOTPRINTING tools:**
- Nmap NT (port scanner with source code)
- NSTPro2 (network scanner)
- SuperScan (port scanner)
- Spade 1.14 (network utility)

**ENUMERATION tools:**
- Cerberus Internet Scanner
- Enum (Windows enumeration tool)
- Ogre (network enumeration)

**COMMANDS directory:**
- snitch.exe (system information tool/trojan)
- user2sid.exe / sid2user.exe (SID-username mapping)
- STREAMFIND.EXE (NTFS alternate data stream finder)

**Installed Software (Program Files):**
- Ethereal 0.10.6 (network protocol analyzer/packet sniffer)
- WinPcap 3.01a (packet capture library)
- Anonymizer Toolbar (web anonymization)
- Look@LAN (network scanner)
- mIRC 6.12 (IRC client)
- CuteFTP (CUTE3032.EXE in Prefetch)
- Agent (Usenet newsreader)

### Evidence of Tool Usage (from Prefetch files)

The following hacking-related programs were **executed** on the system:
- `CAIN25B45.EXE` — Cain & Abel (password recovery/sniffing tool)
- `NETSTUMBLER.EXE` — Network Stumbler (wireless network discovery)
- `ETHEREAL.EXE` — Ethereal packet sniffer
- `LOOKATLAN.EXE` / `LOOKATHOST.EXE` — Look@LAN network scanner
- `WHOIS.EXE` — WHOIS lookup tool
- `TELNET.EXE` — Telnet client
- `PING.EXE` — Network ping
- `MIRC.EXE` — IRC client

### Anti-Virus Scan Results

ClamAV scanning of extracted executables from the disk image detected **6 malware/hack tool signatures**:

| File Path | ClamAV Detection |
|---|---|
| `My Documents/COMMANDS/snitch.exe` | **Win.Trojan.Snitch-1** |
| `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` | **Win.Trojan.Lsadump-1** |
| `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` | **Win.Exploit.WinNT-3** |
| `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` | **Win.Trojan.Sehole-1** |
| `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` | **Win.Trojan.Netbus-2** |
| `My Documents/EXPLOITATION/NT/brutus.zip` | **Win.Tool.Brutus-3** |

**Note:** Only a subset of executables from the hacking toolkit directories were extracted and scanned. Additional malware may be present among the many other tools on the disk.

### Tying the Computer to the Suspect

Multiple lines of evidence tie this computer to Greg Schardt / "Mr. Evil":
1. **Registry:** The Windows registered owner is "Greg Schardt"
2. **User Profile:** The sole active user profile is named "Mr. Evil" — the known alias of Schardt
3. **Newsgroup Activity:** Outlook Express database `alt.hacking.dbx` found in the Mr. Evil profile, indicating participation in the alt.hacking newsgroup
4. **Internet Cache:** A cached page referencing "wardriving" was found, consistent with the suspect's known behavior of intercepting wireless traffic
5. **Tool Usage:** Prefetch records prove Network Stumbler (wireless AP discovery), Cain & Abel (password sniffing/cracking), and Ethereal (packet capture) were all executed — tools consistent with the described MO of parking near wireless access points to intercept traffic

---

## Case Questions

**Case Q1:** The operating system used on the computer was **Microsoft Windows XP** (Version 5.1, Build 2600), as identified from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive value `RegisteredOwner` at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **6 threats** among extracted files: **Win.Trojan.Snitch-1** (snitch.exe), **Win.Trojan.Lsadump-1** (lsadump2.exe), **Win.Exploit.WinNT-3** (GetAdmin.exe), **Win.Trojan.Sehole-1** (SECHOLE.EXE), **Win.Trojan.Netbus-2** (NetBus170.zip), and **Win.Tool.Brutus-3** (brutus.zip). All were located in the hacking toolkit directories under `My Documents/EXPLOITATION/` and `My Documents/COMMANDS/`.