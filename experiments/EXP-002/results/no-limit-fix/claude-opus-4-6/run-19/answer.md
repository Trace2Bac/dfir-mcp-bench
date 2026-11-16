ClamAV found 3 malware detections in extracted executables. I now have all the evidence needed for the final report.

---

# Digital Forensic Investigation Report — NIST Hacking Case

## Case Overview

**Evidence:** Dell CPi Latitude notebook computer (serial # VLQLW), EnCase image `4Dell_Latitude_CPi.E01` / `.E02` (640 MB)  
**Partition:** NTFS (sector offset 63, ~4.5 GB)  
**Date Found:** 09/20/04, abandoned with a wireless PCMCIA card and homemade 802.11b antenna  
**Suspect:** Greg Schardt, a.k.a. "Mr. Evil"

## Key Findings

### 1. Operating System and Owner Identification

The Windows registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`) confirms:

- **OS:** Microsoft Windows XP, Build 2600, Version 5.1 (Uniprocessor Free)
- **Registered Owner:** Greg Schardt
- **Product ID:** 55274-640-0147306-23684
- **Install Date:** Epoch 1092955707 (~2004-08-19)
- **System Root:** C:\WINDOWS

The only user profile on the system is **"Mr. Evil"** — the known online nickname of suspect Greg Schardt. This directly ties the computer to the suspect.

### 2. Antivirus Scan Results

ClamAV was run on both the raw E01/E02 image files and on individually extracted executables from the disk image.

**Detections (3 total):**

| File Path | Inode | ClamAV Signature |
|---|---|---|
| `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` | 10600 | **Win.Trojan.Lsadump-1** |
| `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` | 10626 | **Win.Exploit.WinNT-3** |
| `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` | 10569 | **Win.Trojan.Sehole-1** |

These are hacking/exploitation tools classified as trojans and exploits by ClamAV:
- **lsadump2.exe** — dumps LSA secrets (cached credentials) from Windows systems
- **GetAdmin.exe** — privilege escalation exploit for Windows NT
- **SECHOLE.EXE** — exploits a security hole to gain elevated privileges on Windows NT

### 3. Hacking Software Inventory

The disk contains a methodically organized hacking toolkit under `My Documents/`, categorized by attack phase:

**FOOTPRINTING (reconnaissance):**
- Nmap NT (port scanner, with source code)
- SuperScan (port scanner)
- NSTPro2 (network scanner)
- Sam Spade (spade114.exe — network query tool)

**ENUMERATION (target profiling):**
- Cerberus Internet Scanner (with scan reports for 172.16.0.2)
- Enum (NT enumeration tool)
- Ogre (network enumeration)

**EXPLOITATION (attack tools):**
- Brutus (password cracker, with user/word lists and NetBus.bad reference)
- NetBus 1.70 (Remote Access Trojan)
- Netcat (network swiss army knife)
- Pwdump / Pwdump2 / Pwdump3 (password hash extractors)
- John the Ripper (password cracker, both NT and Unix versions)
- L0phtCrack 3 (lc3setup01.exe — password auditing/cracking)
- lsadump2 (LSA secrets dumper)
- GetAdmin (privilege escalation exploit)
- SecHole (privilege escalation exploit)
- SMBGrind / Crack (SMB password brute-forcing)
- dsniff 2.3 (network sniffing/MITM suite)
- VNC / WinVNC (remote desktop tools)
- fpipe (port forwarder/redirector)
- NAT (NetBIOS auditing tool)
- elsave (event log management)

**COMMANDS (utilities):**
- snitch.exe, user2sid.exe, STREAMFIND.EXE, and other enumeration utilities

### 4. Installed & Executed Software (Prefetch Evidence)

Windows Prefetch files confirm execution of:

| Tool | Prefetch File | Purpose |
|---|---|---|
| Cain & Abel | CAIN25B45.EXE-056F3A6E.pf | Password cracking & network sniffing |
| Ethereal 0.10.6 | ETHEREAL.EXE-1C148EEF.pf | Packet capture/analysis |
| Network Stumbler 0.4.0 | NETSTUMBLER.EXE-0BFEE568.pf | Wireless network discovery/wardriving |
| WinPcap 3.01a | WINPCAP_3_01_A.EXE-1E3EDEDC.pf | Packet capture driver |
| Look@LAN | LOOKATLAN.EXE-1F991DD9.pf | Network scanner |
| mIRC 6.12 | MIRC.EXE-0661EC22.pf | IRC client (common hacker communication) |
| Telnet | TELNET.EXE-24182D40.pf | Remote access |
| Whois | WHOIS.EXE-38443FF6.pf | Domain lookup |
| Ping | PING.EXE-31216D26.pf | Network probing |

### 5. Additional Evidence

- **Anonymizer Toolbar** installed in Program Files — used to anonymize internet activity
- **Outlook Express** contains a mailbox file **alt.hacking.dbx**, indicating subscription to the alt.hacking newsgroup
- **Internet cache** contains wardriving-related content (`wardriving[1]`)
- **Ethereal** (packet sniffer) fully installed in Program Files with plugins
- The `My Documents/COMMANDS/` directory contains a **USERLIST.TXT** and credential-related files

### 6. Tying the Computer to the Suspect

Multiple pieces of evidence tie this computer to Greg Schardt:

1. **Registered Owner** in the Windows registry is "Greg Schardt"
2. The sole user profile is **"Mr. Evil"** — Schardt's known online alias
3. The comprehensive, methodically organized hacking toolkit is consistent with the suspect's reported activities (intercepting wireless traffic, stealing credentials)
4. **Network Stumbler** (wardriving tool) was executed, consistent with reports of the suspect parking near wireless access points
5. The homemade 802.11b antenna found with the laptop supports wireless interception activities

---

## Case Questions

**Case Q1:** The computer was running **Microsoft Windows XP** (Version 5.1, Build 2600), as confirmed by the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **3 infections** in extracted files:
1. **Win.Trojan.Lsadump-1** — `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` (LSA secrets dumping trojan)
2. **Win.Exploit.WinNT-3** — `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` (Windows NT privilege escalation exploit)
3. **Win.Trojan.Sehole-1** — `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` (Security hole exploitation trojan)

These are hacking tools specifically designed to escalate privileges and extract credentials from Windows systems, consistent with the suspect's alleged criminal activities.