I now have all the evidence needed to answer every question. Here is the final report.

---

# Forensic Investigation Report — NIST Hacking Case

## Case Overview

**Case ID:** nist-hacking-case-av  
**Evidence:** Dell Latitude CPi notebook computer (serial # VLQLW), EnCase image `4Dell_Latitude_CPi.E01` / `.E02` (640 MB)  
**Disk Layout:** Single NTFS partition (sector 63–9,510,479), 12,545 files indexed  
**Suspect:** Greg Schardt, a.k.a. "Mr. Evil"

## Key Findings

### Operating System

The registry at `SOFTWARE\Microsoft\Windows NT\CurrentVersion` confirms:
- **ProductName:** Microsoft Windows XP
- **CurrentVersion:** 5.1
- **CurrentBuildNumber:** 2600
- **BuildLab:** 2600.xpclient.010817-1148
- **SystemRoot:** C:\WINDOWS

### Registered Owner

The same registry key contains:
- **RegisteredOwner:** Greg Schardt
- **RegisteredOrganization:** N/A
- **ProductId:** 55274-640-0147306-23684

The Windows user profile on the system is named **"Mr. Evil"** (`Documents and Settings/Mr. Evil/`), consistent with the suspect's known online alias.

### Hacking Software Found

The system contains extensive hacking tool collections organized in `My Documents/` under directories named EXPLOITATION, FOOTPRINTING, and ENUMERATION — categories from a penetration testing methodology:

| Directory | Tools |
|---|---|
| EXPLOITATION/NT/ | Brutus (password cracker), NetBus (remote access trojan), Netcat, Pwdump (password dumping), lsadump2, GetAdmin, sechole, l0phtCrack, SMBGrind, VNC, NAT |
| EXPLOITATION/Unix/ | dsniff 2.3, John the Ripper, VNC |
| FOOTPRINTING/NT/ | NmapNT (port scanner/source), SuperScan, NSTPro2, spade |
| ENUMERATION/NT/ | ogre |

Additionally installed in `Program Files/`:
- **Cain & Abel v2.5** — ARP poisoning, password cracking, and network sniffing tool (with captured data lists: APR, HTTP, FTP, SMTP, POP3, IMAP, VNC, SMB, SSH, RADIUS, etc.)
- **Ethereal** (Wireshark predecessor) — network packet analyzer
- **Anonymizer** — web anonymization toolbar

Windows Prefetch confirms execution of **CAIN25B45.EXE** and **CMD.EXE**.

### Anti-Virus Scan Results

ClamAV was run on executables extracted from the disk image. **5 malicious files were detected:**

| File Path | Inode | ClamAV Signature |
|---|---|---|
| `Program Files/Cain/Abel.dll` | 9958 | **Win.Trojan.Cain-9** |
| `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` | 10600 | **Win.Trojan.Lsadump-1** |
| `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` | 10626 | **Win.Exploit.WinNT-3** |
| `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` | 10569 | **Win.Trojan.Sehole-1** |
| `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` | 10589 | **Win.Trojan.Netbus-2** |

Other extracted executables (VNC SETUP.EXE, WinPcap_3_0_1a.exe, crack.exe, smbgrind.exe, CrackUI.exe, SECHOLED.EXE, vncviewer.exe) did not trigger ClamAV signatures but are still hacking/exploitation tools by nature.

### Tying the Computer to the Suspect

The computer is tied to **Greg Schardt** by:
1. **RegisteredOwner** in the Windows registry is "Greg Schardt"
2. The sole user profile is "**Mr. Evil**" — the suspect's known alias
3. Cookies under `Documents and Settings/Mr. Evil/Cookies/` show browsing activity under this profile
4. A desktop shortcut folder `Tools` contains links to Cain, Ethereal, Network Stumbler, Look@LAN, mIRC, and other hacking utilities — indicating active use
5. Outlook Express mailbox includes `alt.hacking.dbx` — a newsgroup subscription to alt.hacking
6. Browser history includes visits to `www.netstumbler.com` (wardriving tool site)

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as confirmed by the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** Yes, there are viruses on the computer. ClamAV detected **5 malicious files**: **Win.Trojan.Cain-9** (Abel.dll from Cain & Abel), **Win.Trojan.Lsadump-1** (lsadump2.exe), **Win.Exploit.WinNT-3** (GetAdmin.exe), **Win.Trojan.Sehole-1** (SECHOLE.EXE), and **Win.Trojan.Netbus-2** (NetBus170.zip). These are hacking/exploitation tools classified as trojans and exploits by ClamAV's signature database.