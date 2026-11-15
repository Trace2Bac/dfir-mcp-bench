No additional detections. I now have enough evidence to compile the final report.

---

# Digital Forensics Report: NIST Hacking Case — Dell Latitude CPi (Serial # VLQLW)

## Evidence Summary

**Image analyzed:** `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` (E01, ~640 MB)  
**Partition layout:** Single NTFS partition (sectors 63–9,510,479)  
**Total files indexed:** 12,545

## System Identification

- **Operating System:** Microsoft Windows XP, Version 5.1, Build 2600 (Uniprocessor Free)
- **System Root:** C:\WINDOWS
- **Product ID:** 55274-640-0147306-23684
- **Install Date:** August 19, 2004 (Unix epoch 1092955707)
- **Registered Owner:** Greg Schardt
- **Registered Organization:** N/A
- **Primary User Account:** "Mr. Evil"

## Tying the Computer to the Suspect

The Windows registry at `SOFTWARE\Microsoft\Windows NT\CurrentVersion` shows the **RegisteredOwner** is **"Greg Schardt"** — the hacking suspect. The only user profile on the system is named **"Mr. Evil"**, which matches the suspect's known online alias. This directly ties the computer to Greg Schardt.

## Anti-Virus Scan Results

ClamAV was run on extracted executables from the disk image. **4 detections were found:**

| File Path | Inode | ClamAV Detection |
|---|---|---|
| My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe | 10600 | **Win.Trojan.Lsadump-1** |
| My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe | 10626 | **Win.Exploit.WinNT-3** |
| My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE | 10569 | **Win.Trojan.Sehole-1** |
| My Documents/EXPLOITATION/NT/netbus/NetBus170.zip | 10589 | **Win.Trojan.Netbus-2** |

## Hacking Software Found

The computer contains an extensive collection of hacking tools organized into methodological categories:

### Installed Applications (Program Files)
- **Cain & Abel** — Password cracking, ARP poisoning, and network sniffing tool (confirmed executed via Prefetch: CAIN25B45.EXE)
- **Ethereal 0.10.6** — Network packet sniffer/analyzer (confirmed executed via Prefetch)
- **Look@LAN** — Network discovery scanner (confirmed executed via Prefetch)
- **Anonymizer Toolbar** — Web anonymization tool
- **mIRC 6.12** — IRC client (confirmed executed via Prefetch)
- **NetStumbler 0.4.0** — Wireless network discovery/wardriving tool (confirmed executed via Prefetch)

### Exploitation Tools (My Documents/EXPLOITATION)
- **NetBus 1.70** — Remote access trojan (flagged by ClamAV)
- **Brutus** — Password brute-forcing tool (includes NetBus.bad file)
- **lsadump2** — LSA secrets dumping tool (flagged by ClamAV)
- **Pwdump / Pwdump2 / Pwdump3** — Windows password hash dumping tools
- **GetAdmin** — NT privilege escalation exploit (flagged by ClamAV)
- **SecHole** — NT security hole exploit (flagged by ClamAV)
- **L0phtCrack 3** (lc3setup01.exe) — Password cracking tool
- **John the Ripper** — Password cracker (NT and Unix versions)
- **SMBGrind Crack** — SMB brute-force password cracking
- **Netcat** — "Swiss army knife" networking utility
- **fpipe** — TCP/UDP port redirector
- **NAT** (NetBIOS Auditing Tool)
- **bsniff** — Network sniffer
- **VNC / WinVNC** — Remote desktop control
- **dsniff 2.3** — Network sniffing/spoofing suite (Unix)
- **elsave** — Event log management tool

### Enumeration Tools (My Documents/ENUMERATION)
- **Ogre** — Network enumeration tool

### Footprinting Tools (My Documents/FOOTPRINTING)
- **NmapNT** — Network port scanner (with full source code)
- **NSTPro2** — Network scanner
- **SuperScan** — Port scanning tool
- **spade114.exe** — SPADE network tool

### Evidence of Hacking Activity
- **Newsgroup subscriptions** (Outlook Express): Subscribed to numerous hacking newsgroups including alt.2600, alt.2600.cardz, alt.2600.codez, alt.2600.crackz, alt.2600.hackerz, alt.2600.phreakz, alt.hacking, alt.binaries.hacking.*, alt.dss.hack, and others
- **Wardriving evidence**: Web cache contains wardriving-related content; NetStumbler (wireless AP discovery) was installed and executed
- **Network shares**: Mr. Evil's NetHood shows connections to "Andrews-1" computer (mapped C: drive and CD drive)
- **"interception" file** on Mr. Evil's desktop (173 KB binary file)
- **Whois tool** executed from Desktop/Tools
- **Cain & Abel capture lists**: APR.LST, HOSTS.LST, and various protocol capture files (FTP, HTTP, HTTPS, SMTP, POP3, IMAP, TELNET, SMB, VNC, SSH, ICQ, etc.) — evidence the tool was actively used for credential interception

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP** (Version 5.1, Build 2600), as identified from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of `SOFTWARE\Microsoft\Windows NT\CurrentVersion`. The only user profile on the system is named "Mr. Evil," matching the suspect's known alias.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **4 infected files**: **Win.Trojan.Lsadump-1** (lsadump2.exe), **Win.Exploit.WinNT-3** (GetAdmin.exe), **Win.Trojan.Sehole-1** (SECHOLE.EXE), and **Win.Trojan.Netbus-2** (NetBus170.zip). All are hacking/exploitation tools stored in the `My Documents/EXPLOITATION/NT/` directory.