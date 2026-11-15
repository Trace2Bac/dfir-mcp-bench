Now I have all the evidence I need. Here is the final report.

---

# Digital Forensic Report — NIST Hacking Case

**Case ID:** nist-hacking-case-av  
**Evidence:** Dell CPi Notebook, Serial # VLQLW  
**Image:** 4Dell_Latitude_CPi.E01 / E02 (EnCase format, ~640 MB)  
**Examiner Date:** 2026-11-15  

## Disk Layout

- NTFS partition at sector 63, size ~4.87 GB
- 12,545 files indexed from the filesystem

## System Information

- **Operating System:** Microsoft Windows XP, Version 5.1, Build 2600 (from registry key `SOFTWARE\Microsoft\Windows NT\CurrentVersion`)
- **Registered Owner:** Greg Schardt (registry value `RegisteredOwner`)
- **Product ID:** 55274-640-0147306-23684
- **User Account:** "Mr. Evil" (the active user profile on the system, consistent with the suspect's known alias)

## Anti-Virus Scan Results

ClamAV was run on 16 extracted suspicious executables from the disk image. **5 malware detections were identified:**

| File | Detection | Description |
|------|-----------|-------------|
| `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` (inode 10600) | **Win.Trojan.Lsadump-1** | LSA secrets dumping tool |
| `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` (inode 10626) | **Win.Exploit.WinNT-3** | Windows NT privilege escalation exploit |
| `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` (inode 10569) | **Win.Trojan.Sehole-1** | Security hole exploitation tool |
| `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` (inode 10589) | **Win.Trojan.Netbus-2** | NetBus remote access trojan (RAT) |
| `Program Files/Cain/Abel.dll` (inode 9958) | **Win.Trojan.Cain-9** | Cain & Abel password recovery/sniffing component |

## Hacking Software Inventory

The computer contained an extensive, well-organized collection of hacking tools in `My Documents/`, categorized by attack phase:

**FOOTPRINTING (Reconnaissance):**
- NmapNT — network port scanner (source code and binaries)
- SuperScan — TCP port scanner
- NSTPro2 — network scanner
- spade114.exe — DNS/WHOIS lookup tool

**ENUMERATION:**
- Cerberus Internet Scanner — vulnerability scanner
- enum — Windows NT/2000 information enumeration tool
- ogre — system information gathering

**EXPLOITATION:**
- **Brutus** — password brute-forcing tool (with NetBus.bad, wordlists)
- **NetBus 1.70** — remote access trojan (RAT)
- **Netcat** — "Swiss army knife" of networking / backdoor tool
- **Pwdump** (versions 1–3) — Windows password hash dumper
- **lsadump2** — LSA secrets dumper
- **GetAdmin** — Windows NT privilege escalation exploit
- **SECHOLE** — Windows NT security hole exploit
- **L0phtCrack 3** (lc3setup01.exe) — password cracker
- **John the Ripper** — password cracker (NT and Unix versions)
- **SMBGrind / CrackUI** — SMB password grinding tools
- **VNC / WinVNC** — remote desktop tools for unauthorized access
- **NAT** — NetBIOS auditing tool
- **dsniff 2.3** — network traffic sniffer/interceptor
- **bsniff** — network sniffer
- **fpipe** — TCP/UDP port redirection

**Installed Programs (Program Files):**
- **Cain & Abel v2.5** — ARP spoofing, password sniffing, credential harvesting (with captured protocol lists: HTTP, FTP, SMTP, POP3, IMAP, SMB, VNC, SSH, TELNET, etc.)
- **Ethereal 0.10.6** — network packet analyzer/sniffer
- **Network Stumbler** — wireless network discovery (wardriving tool)
- **Look@LAN** — network monitoring
- **Anonymizer** — anonymous web browsing toolbar
- **mIRC** — IRC client (commonly used for hacker communication)
- **123 WASP** — web/application tool

**Evidence of Use (Windows Prefetch):**
- `CAIN25B45.EXE` was executed (prefetch file present at `WINDOWS/Prefetch/CAIN25B45.EXE-056F3A6E.pf`)

## Evidence Tying Computer to Suspect

1. **Registered Owner:** The Windows registry `RegisteredOwner` value is "Greg Schardt" — the suspect's name.
2. **User Profile "Mr. Evil":** The active user profile on the system is named "Mr. Evil," which matches the suspect's known online alias.
3. **Hacking Newsgroup Subscriptions:** Outlook Express (under Mr. Evil's profile) was subscribed to numerous hacking-related newsgroups including: `alt.2600`, `alt.2600.cardz`, `alt.2600.codez`, `alt.2600.crackz`, `alt.2600.hackerz`, `alt.2600.phreakz`, `alt.2600.programz`, `alt.hacking`, `alt.binaries.hacking.beginner`, `alt.binaries.hacking.computers`, `alt.binaries.hacking.utilities`, `alt.binaries.hacking.websites`, `alt.dss.hack`, and others.
4. **Wardriving Tools:** Network Stumbler (a wireless AP discovery tool) was installed, consistent with the report that the suspect would park near wireless hotspots to intercept traffic.
5. **Traffic Interception Tools:** Cain & Abel (ARP poisoning, credential sniffing), Ethereal (packet capture), dsniff, bsniff — all tools used for intercepting network traffic to capture credit card numbers, usernames, and passwords, exactly matching the described criminal methodology.
6. **"interception" File:** A file named `interception` (inode 12264) exists directly in Mr. Evil's user profile directory.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP**, Version 5.1, Build 2600 (as identified from the registry at `SOFTWARE\Microsoft\Windows NT\CurrentVersion`).

**Case Q2:** The registered owner is **Greg Schardt** (from the `RegisteredOwner` registry value under `SOFTWARE\Microsoft\Windows NT\CurrentVersion`).

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **5 threats** among extracted files:
1. `Win.Trojan.Lsadump-1` — in `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe`
2. `Win.Exploit.WinNT-3` — in `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe`
3. `Win.Trojan.Sehole-1` — in `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE`
4. `Win.Trojan.Netbus-2` — in `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip`
5. `Win.Trojan.Cain-9` — in `Program Files/Cain/Abel.dll`