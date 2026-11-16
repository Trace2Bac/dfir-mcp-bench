ClamAV found 4 detections. I now have all the evidence needed to answer every question. Here is the final report.

---

# Digital Forensic Investigation Report — NIST Hacking Case

## Case Overview

A Dell CPi notebook computer (serial # VLQLW) was found abandoned along with a wireless PCMCIA card and an external homemade 802.11b antenna. The computer is suspected of being used for hacking purposes and is potentially linked to suspect Greg Schardt, who goes by the online alias "Mr. Evil."

## Evidence Analyzed

- **Disk Image**: `4Dell_Latitude_CPi.E01` / `.E02` (~640 MB EnCase image)
- **Filesystem**: NTFS partition starting at sector 63 (9,510,417 sectors)
- **12,545 files** indexed across the partition

## Key Findings

### 1. Operating System & Owner

The Windows registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`) confirms:

| Field | Value |
|---|---|
| **ProductName** | Microsoft Windows XP |
| **CurrentVersion** | 5.1 |
| **CurrentBuildNumber** | 2600 |
| **RegisteredOwner** | Greg Schardt |
| **RegisteredOrganization** | N/A |
| **SystemRoot** | C:\WINDOWS |
| **InstallDate** | 1092955707 (Aug 19, 2004 epoch) |
| **ProductId** | 55274-640-0147306-23684 |

The user profile on the machine is named **"Mr. Evil"** — matching the suspect's known alias.

### 2. Hacking Software Present

The computer contains an extensive collection of hacking tools organized in categorized directories:

**Installed Programs (Program Files):**
- **Cain & Abel v2.5** (`Program Files/Cain/`) — password cracking and network sniffing tool with WinPcap driver, wordlists, and interception list files (HTTP, FTP, POP3, SMTP, SMB, VNC, SSH, RADIUS, etc.)
- **Ethereal** (`Program Files/Ethereal/`) — network packet analyzer/sniffer
- **Anonymizer** (`Program Files/Anonymizer/`) — anonymous web browsing tool

**Exploitation Tools (My Documents/EXPLOITATION/):**
- **Brutus** — password brute-forcing tool (with NetBus.bad, wordlists)
- **NetBus** — remote access trojan (NetBus170.zip)
- **Netcat** — network utility ("Swiss Army knife" of hacking)
- **Pwdump** (1, 2, 3) — Windows password hash dumping tools
- **lsadump2** — LSA secrets dumping tool
- **GetAdmin** — privilege escalation exploit
- **SecHole** — Windows NT security hole exploit
- **L0phtCrack 3** (lc3setup01.exe) — password cracking tool
- **John the Ripper** — password cracker (NT and Unix versions)
- **SMBGrind / CrackUI** — SMB password brute-forcing
- **VNC / WinVNC** — remote desktop tool
- **fpipe** — port redirection tool
- **NAT** — network auditing tool
- **dsniff 2.3** — network sniffing suite
- **elsave** — event log management tool

**Footprinting Tools (My Documents/FOOTPRINTING/):**
- **NmapNT** — network port scanner (with source code, drivers)
- **SuperScan** — port scanning tool
- **NSTPro2** — network security testing tool
- **spade114.exe** — spam detection tool

**Enumeration Tools (My Documents/ENUMERATION/):**
- **Cerberus Internet Scanner** — vulnerability scanner
- **enum** — Windows enumeration tool
- **ogre** — network reconnaissance tool

**Command-line Utilities (My Documents/COMMANDS/):**
- snitch.exe, user2sid.exe, STREAMFIND.EXE, and others

**Desktop Shortcuts (Documents and Settings/Mr. Evil/Desktop/Tools/):**
- Cain v2.5, Ethereal, Network Stumbler, Look@LAN, Look@Host, Agent, mIRC, CuteFTP, and "Shortcut to whois"

### 3. Evidence of Use

- **Prefetch files** confirm execution of hacking tools: `CAIN25B45.EXE-056F3A6E.pf` was found in `WINDOWS/Prefetch/`, proving Cain was executed on the system.
- **Outlook Express newsgroup subscriptions** under Mr. Evil's profile include: `alt.2600`, `alt.2600.cardz`, `alt.2600.codez`, `alt.2600.crackz`, `alt.2600.hackerz`, `alt.2600.phreakz`, `alt.2600.programz`, `alt.hacking`, `alt.binaries.hacking.beginner`, `alt.binaries.hacking.computers`, `alt.binaries.hacking.utilities`, `alt.binaries.hacking.websites`, `alt.dss.hack` — all hacking-related newsgroups.
- **Cookies** show visits to `www.netstumbler.com` (wardriving/wireless hacking community).
- **Network shares** mapped to "Andrews-1" machine suggest prior network connections.
- An **"interception"** file (`Documents and Settings/Mr. Evil/interception`) indicates potential captured data.

### 4. Anti-Virus Scan Results

ClamAV scanning of extracted executables from the disk image detected **4 malware signatures**:

| File Path | Inode | ClamAV Detection |
|---|---|---|
| `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` | 10600 | **Win.Trojan.Lsadump-1** |
| `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` | 10626 | **Win.Exploit.WinNT-3** |
| `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` | 10569 | **Win.Trojan.Sehole-1** |
| `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` | 10589 | **Win.Trojan.Netbus-2** |

### 5. Tying the Computer to the Suspect

Multiple pieces of evidence tie this computer to Greg Schardt:
- **RegisteredOwner** in the Windows registry is "Greg Schardt"
- The active user profile is named **"Mr. Evil"** — the suspect's known alias
- The computer contains an extensive, organized hacking toolkit consistent with the suspect's described activities (wireless interception, credential theft)
- Cookies from `www.netstumbler.com` align with the suspect's known wardriving activity
- A homemade 802.11b antenna was found with the computer, consistent with wireless interception

---

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP** (Version 5.1, Build 2600), as confirmed by the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **4 infections** among extracted files:
1. **Win.Trojan.Lsadump-1** — `lsadump2.exe` (LSA secrets dumping trojan)
2. **Win.Exploit.WinNT-3** — `GetAdmin.exe` (Windows NT privilege escalation exploit)
3. **Win.Trojan.Sehole-1** — `SECHOLE.EXE` (Windows NT security hole exploit)
4. **Win.Trojan.Netbus-2** — `NetBus170.zip` (NetBus remote access trojan)