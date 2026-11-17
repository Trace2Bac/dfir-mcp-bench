I now have all the evidence needed. Here is the final report.

---

# Digital Forensic Report — NIST Hacking Case

## Case Summary

A Dell CPi notebook (serial # VLQLW) was found abandoned with a wireless PCMCIA card and an external 802.11b antenna. The computer is suspected to have been used by Greg Schardt (alias "Mr. Evil") for wireless hacking — intercepting traffic at WiFi hotspots to steal credentials.

## System Information

| Field | Value |
|-------|-------|
| **Operating System** | Microsoft Windows XP Professional |
| **Version** | 5.1 (Build 2600) |
| **Service Pack** | None (CSDVersion not present in registry) |
| **Build Lab** | 2600.xpclient.010817-1148 |
| **Product Type** | WinNT (Professional) |
| **Registered Owner** | Greg Schardt |
| **Registered Organization** | N/A |
| **Product ID** | 55274-640-0147306-23684 |
| **System Root** | C:\WINDOWS |
| **Install Date** | 2004-08-19 (Unix epoch 1092955707) |

**Source:** SOFTWARE hive, `Microsoft\Windows NT\CurrentVersion` and SYSTEM hive, `ControlSet001\Control\ProductOptions`.

## Tying the Computer to the Suspect

- The registered owner in the Windows registry is **Greg Schardt** — matching the hacking suspect.
- The only user profile on the system is named **"Mr. Evil"** (under `Documents and Settings/Mr. Evil/`), which matches Schardt's known alias.
- Cookies in the Mr. Evil profile show browsing activity at www.netstumbler.com, consistent with wardriving interests.
- Outlook Express newsgroup subscriptions include: `alt.hacking`, `alt.2600`, `alt.2600.crackz`, `alt.2600.hackerz`, `alt.binaries.hacking.beginner`, `alt.binaries.hacking.computers`, `alt.binaries.hacking.utilities`, and `alt.dss.hack`.
- mIRC chat logs show activity in hacker-related IRC channels: `#Elite.Hackers.UnderNet`, `#LuxShell.UnderNet`, `#ushells.UnderNet`, `#ISO-WAREZ.EFnet`.
- A file named `interception` exists on the Mr. Evil Desktop (inode 12264, 173 KB), and cached web content includes `wardriving[1]`, consistent with the suspected WiFi interception activity.

## Hacking Software Found

The disk contains an organized collection of hacking tools under `My Documents/`:

### Footprinting Tools (`My Documents/FOOTPRINTING/`)
- **Nmap NT** — network port scanner (with source code)
- **SuperScan** — TCP port scanner
- **Sam Spade** (spade114.exe) — network query tool
- **NSTPro2** — network scanner

### Enumeration Tools (`My Documents/ENUMERATION/`)
- **Cerberus Internet Scanner** — vulnerability scanner (scan reports for 172.16.0.2 found)
- **Ogre** (rhino9x.exe) — NT enumeration tool
- **SamSpade** — DNS/WHOIS/traceroute tool
- **Winfingerprint** — Windows host enumeration
- **Winfo** — null session enumeration
- **Nessus** (Linux RPM packages) — vulnerability scanner
- **Netcat** (nc110.gz) — network Swiss army knife
- **Whisker** — web vulnerability scanner

### Exploitation Tools (`My Documents/EXPLOITATION/`)
- **Brutus A2** — remote password brute-forcer
- **NetBus 1.70** — remote access trojan
- **Pwdump** (versions 2 and 3) — Windows password hash dumper
- **lsadump2** — LSA secrets dumper
- **GetAdmin** — Windows NT privilege escalation exploit
- **L0phtCrack 3** (lc3setup01.exe) — Windows password cracker
- **John the Ripper** (john-16w.zip) — password cracker
- **Netcat NT** — network utility
- **NAT** — NetBIOS auditing tool
- **fpipe** — TCP/IP source port redirector
- **elsave** — event log manipulation
- **bsniff** — network sniffer
- **dsniff 2.3** — network sniffer/interceptor suite

### Installed Programs
- **Cain & Abel v2.5** (`Program Files/Cain/`) — password recovery and ARP spoofing tool with WinPcap driver, wordlists, and protocol capture lists (FTP, HTTP, HTTPS, POP3, SMTP, IMAP, SSH, VNC, etc.)
- **Ethereal 0.10.6** (`Program Files/Ethereal/`) — network packet analyzer
- **Network Stumbler** — WiFi network discovery tool (evidenced by Prefetch entries and Desktop shortcut)
- **Look@LAN / Look@Host** (`Program Files/Look@LAN/`) — network monitoring
- **Anonymizer Toolbar** (`Program Files/Anonymizer/`) — anonymous web browsing
- **mIRC 6.12** (`Program Files/mIRC/`) — IRC client
- **123 WASP** — screenshot capture
- **CuteFTP** — FTP client
- **Agent** — Usenet newsreader (for reading hacking newsgroups)

### Commands/Utilities (`My Documents/COMMANDS/`)
- **snitch.exe** — trojan/information gathering tool
- **user2sid.exe / userdump** — SID/user enumeration tools
- **STREAMFIND.EXE** — NTFS stream finder
- **whois** — WHOIS lookup tool

### Evidence of Tool Use
Windows Prefetch files confirm the following tools were actually executed on the system:
- CAIN25B45.EXE, NETSTUMBLER.EXE, ETHEREAL.EXE, MIRC.EXE, LOOKATLAN.EXE, LOOKATHOST.EXE, WHOIS.EXE, TELNET.EXE, PING.EXE, WINPCAP_3_01_A.EXE

## Anti-Virus Scan Results (ClamAV)

ClamAV scanning of extracted executables detected **5 threats**:

| # | File Path | Inode | Detection |
|---|-----------|-------|-----------|
| 1 | My Documents/COMMANDS/snitch.exe | 10277 | **Win.Trojan.Snitch-1** |
| 2 | My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe | 10600 | **Win.Trojan.Lsadump-1** |
| 3 | My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe | 10626 | **Win.Exploit.WinNT-3** |
| 4 | My Documents/EXPLOITATION/NT/netbus/NetBus170.zip | 10589 | **Win.Trojan.Netbus-2** |
| 5 | My Documents/EXPLOITATION/NT/Brutus/BrutusA2.exe | 10633 | **Win.Tool.Brutus-3** |

Note: Other extracted files (Cain.exe, Abel.exe, Ethereal.exe, mIRC.exe, spade114.exe, rhino9x.exe, LookAtLan.exe, lc3setup01.exe, and the "interception" file) were not flagged by ClamAV, though many are hacking tools by nature.

---

## Case Questions

**Case Q1:** The operating system used on the computer was **Microsoft Windows XP Professional**, Version 5.1, Build 2600 (no Service Pack). This is confirmed by the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` (ProductName: "Microsoft Windows XP", CurrentVersion: "5.1", CurrentBuildNumber: "2600") and the SYSTEM hive ProductType value "WinNT" indicating the Professional edition.

**Case Q2:** The registered owner is **Greg Schardt**. This was found in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion\RegisteredOwner`. This directly ties the computer to the suspect. Additionally, the sole user profile on the system is named "Mr. Evil," matching Schardt's known online alias.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **5 threats**: Win.Trojan.Snitch-1 (snitch.exe), Win.Trojan.Lsadump-1 (lsadump2.exe), Win.Exploit.WinNT-3 (GetAdmin.exe), Win.Trojan.Netbus-2 (NetBus170.zip), and Win.Tool.Brutus-3 (BrutusA2.exe). These are all hacking/exploitation tools classified as trojans, exploits, or hack tools by ClamAV's signature database.