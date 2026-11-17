Now I have all the evidence needed. Let me compile the final report.

---

# Digital Forensic Report: NIST Hacking Case — Dell Latitude CPi (S/N VLQLW)

## Evidence Examined

- **Image:** `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` (with segment `.E02`)
- **Image type:** EnCase E01
- **Partition layout:** NTFS partition starting at sector 63 (~4.87 GB), with 12,545 files indexed

## Summary of Findings

### Operating System and User

The system registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`) confirms:

- **OS:** Microsoft Windows XP (version 5.1, build 2600)
- **Registered Owner:** Greg Schardt
- **Registered Organization:** N/A
- **Product ID:** 55274-640-0147306-23684
- **System Root:** C:\WINDOWS
- **Install Date:** Epoch 1092955707 (2004-08-19)

The primary user profile on the system is **"Mr. Evil"** (`Documents and Settings/Mr. Evil/`), which is the known online alias of suspect Greg Schardt. This directly ties the computer to the suspect.

### Hacking Software Found

The disk contains an extensive, organized toolkit structured by attack methodology:

**Installed Applications (Program Files):**
- **Cain v2.5** (Program Files/Cain/) — Password recovery, ARP poisoning, and network sniffing tool. Includes Abel.exe/dll, wordlists, and captured credential lists (APR.LST, FTP.LST, HTTP.LST, SMB.LST, POP3.LST, TELNET.LST, VNC.LST, etc.)
- **Ethereal 0.10.6** (Program Files/Ethereal/) — Network protocol analyzer/packet sniffer
- **Anonymizer Toolbar** (Program Files/Anonymizer/) — Web anonymization tool
- **Network Stumbler** — Wireless access point discovery tool (shortcuts in Start Menu and Desktop)

**Exploitation Tools (My Documents/EXPLOITATION/NT/):**
- **Brutus** — Password brute-force cracker
- **NetBus 1.70** — Remote access trojan
- **Netcat** — "Swiss army knife" networking tool
- **Pwdump** (versions 1-3) — Windows password hash dumper
- **lsadump2** — LSA secrets dumper
- **sechole** — Windows NT privilege escalation exploit
- **SMBGrind Crack** — SMB password cracking suite
- **John the Ripper** — Password cracker (NT and Unix versions)
- **L0phtCrack 3** (lc3setup01.exe) — Windows password auditor
- **Get Admin** — Windows NT privilege escalation tool
- **VNC / WinVNC** — Remote desktop access
- **fpipe** — TCP/IP port forwarder
- **bsniff** — Network sniffer
- **dsniff 2.3** (Unix) — Advanced network sniffing toolkit

**Footprinting Tools (My Documents/FOOTPRINTING/NT/):**
- **Nmap NT** — Port scanner and network mapper (with source code)
- **SuperScan** — TCP port scanner
- **NSTPro2** — Network scanning tool
- **spade114.exe** — Spam detection/email header analysis

**Enumeration Tools (My Documents/ENUMERATION/NT/):**
- **Ogre** — Windows NT enumeration tool

**Evidence of Tool Usage (Prefetch):**
- `CAIN25B45.EXE-056F3A6E.pf` — Cain was executed on this system
- Desktop shortcuts confirm active use of: Cain v2.5, Ethereal, Network Stumbler, whois, Look@LAN, Look@Host, mIRC, CuteFTP

**Other Evidence:**
- Outlook Express mailbox: `alt.hacking.dbx` — Subscribed to the alt.hacking newsgroup
- Cookie for `www.netstumbler.com` — Visited wardriving/wireless hacking community site
- Internet cache includes `wardriving[1]` — Active interest in wardriving

### Anti-Virus (ClamAV) Scan Results

After extracting key executables from the disk image, ClamAV detected **4 malicious files**:

| File (Original Path) | Inode | ClamAV Detection |
|---|---|---|
| My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe | 10600 | **Win.Trojan.Lsadump-1** |
| My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe | 10626 | **Win.Exploit.WinNT-3** |
| My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE | 10569 | **Win.Trojan.Sehole-1** |
| My Documents/EXPLOITATION/NT/netbus/NetBus170.zip | 10589 | **Win.Trojan.Netbus-2** |

Note: The initial ClamAV scan of the raw E01 container files returned clean, but ClamAV cannot inspect files inside a disk image. Files were extracted by inode and scanned individually to obtain these results.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (version 5.1, build 2600), as confirmed by the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` (ProductName: "Microsoft Windows XP", CurrentBuildNumber: "2600").

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion\RegisteredOwner`. The primary user account on the system is named "Mr. Evil," the known online alias of Schardt, further tying the computer to the suspect.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **4 malicious files** among the extracted executables:
1. **Win.Trojan.Lsadump-1** — `lsadump2.exe` (LSA secrets dumping trojan)
2. **Win.Exploit.WinNT-3** — `GetAdmin.exe` (Windows NT privilege escalation exploit)
3. **Win.Trojan.Sehole-1** — `SECHOLE.EXE` (Security hole exploitation trojan)
4. **Win.Trojan.Netbus-2** — `NetBus170.zip` (NetBus remote access trojan)