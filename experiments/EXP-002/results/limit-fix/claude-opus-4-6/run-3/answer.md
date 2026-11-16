ClamAV found 4 malware detections. I now have all the evidence needed to write the final report.

---

# Digital Forensic Investigation Report — NIST Hacking Case

## Case Summary

A Dell CPi notebook computer (serial # VLQLW) was found abandoned along with a wireless PCMCIA card and an external homemade 802.11b antenna. The investigation sought to determine if the computer was used for hacking, identify the owner, and detect any malware.

## System Identification

- **Operating System:** Microsoft Windows XP, Version 5.1, Build 2600 (Uniprocessor Free)
- **Install Date:** August 19, 2004 (Unix epoch 1092955707)
- **System Root:** C:\WINDOWS
- **Product ID:** 55274-640-0147306-23684
- **Registered Owner:** Greg Schardt
- **Registered Organization:** N/A

The user profile on the machine is named **"Mr. Evil"**, which matches the known online alias of suspect Greg Schardt.

## Evidence Tying Computer to Suspect

The SOFTWARE registry hive (`Microsoft\Windows NT\CurrentVersion`) shows the **RegisteredOwner** is "Greg Schardt". The active user profile is "Mr. Evil" — the known alias used by Schardt. Cookies in the Mr. Evil profile show browsing activity on sites including www.netstumbler.com, consistent with wardriving activity described in the case briefing.

## Hacking Software Found

The disk image contains an organized hacking toolkit under `My Documents/` arranged by attack methodology:

### EXPLOITATION Tools (My Documents/EXPLOITATION/)
- **Brutus** — Password brute-force tool (with NetBus.bad, users.txt, words.txt)
- **NetBus** — Remote access Trojan (NetBus170.zip)
- **Netcat** — Network utility often used as a backdoor (netcat11nt.zip)
- **Pwdump** — Windows password hash dumper (pwdump.zip, pwdump2.zip, pwdump3.zip)
- **lsadump2** — LSA secrets dumper (lsadump2.exe)
- **GetAdmin** — Windows NT privilege escalation exploit (GetAdmin.exe)
- **SecHole** — Security hole exploit (SECHOLE.EXE, SECHOLED.EXE)
- **SMBGrind Crack** — SMB password cracker (CrackUI.exe, GrindUI.exe, smbgrind.exe)
- **L0phtCrack** — Password cracking tool (lc3setup01.exe)
- **John the Ripper** — Password cracker (john-16w.zip for NT, john-1.6.tar.gz for Unix)
- **VNC/WinVNC** — Remote desktop tool (vncviewer.exe)
- **dsniff** — Network sniffer/interceptor (dsniff-2.3.tar.gz)
- **NAT** — NetBIOS Auditing Tool (nat.zip)
- **Hk** — Privilege escalation (hk-0.1.zip)

### FOOTPRINTING Tools (My Documents/FOOTPRINTING/)
- **NmapNT** — Network scanner (full source code and compiled versions)
- **SuperScan** — Port scanner
- **NSTPro2** — Network scanning tool
- **Spade** — Traceroute/network exploration (spade114.exe)

### ENUMERATION Tools (My Documents/ENUMERATION/)
- **Ogre** — NetBIOS enumeration tool (ogre.ex_)

### Installed Programs (Program Files/)
- **Ethereal** (v0.10.6) — Network protocol analyzer/packet sniffer
- **Network Stumbler** — Wireless network scanner (wardriving tool)
- **Cain & Abel** (v2.5 Beta 45) — Password recovery/sniffing tool
- **Anonymizer** — Anonymous browsing toolbar
- **Look@LAN / Look@Host** — Network monitoring tools
- **mIRC** (v6.12) — IRC client
- **WinPcap** (v3.01a) — Packet capture library

### Evidence of Tool Usage (Prefetch files confirm execution)
- CAIN25B45.EXE — Cain & Abel was run
- NETSTUMBLER.EXE — Network Stumbler was run
- ETHEREAL.EXE — Ethereal packet sniffer was run
- TELNET.EXE — Telnet client was used
- WHOIS.EXE — Domain lookups were performed
- MIRC.EXE — IRC client was used
- LOOKATLAN.EXE / LOOKATHOST.EXE — Network scanners were run
- PING.EXE — Network probing performed

### Hacking-Related Data
- **Outlook Express newsgroup subscriptions** to hacking-related Usenet groups:
  - alt.2600, alt.2600.cardz, alt.2600.codez, alt.2600.crackz, alt.2600.hackerz, alt.2600.phreakz, alt.2600.programz
  - alt.binaries.hacking.beginner, alt.binaries.hacking.computers, alt.binaries.hacking.utilities, alt.binaries.hacking.websites
  - alt.hacking, alt.dss.hack, alt.stupidity.hackers.malicious
  - free.binaries.hackers.malicious, free.binaries.hacking.*
- **"interception" file** on Mr. Evil's desktop (inode 12264) — consistent with data interception activity
- **Wardriving content** found in IE cache (wardriving[1])
- **Desktop Tools folder** with shortcuts to: Cain v2.5, Ethereal, Network Stumbler, mIRC, Look@LAN, Look@Host, whois

## Anti-Virus Scan Results

ClamAV scan of extracted executables from the disk image detected **4 malware signatures**:

| File | Path on Disk | ClamAV Detection |
|------|-------------|-----------------|
| inode 10600 | My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe | **Win.Trojan.Lsadump-1** |
| inode 10626 | My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe | **Win.Exploit.WinNT-3** |
| inode 10569 | My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE | **Win.Trojan.Sehole-1** |
| inode 10589 | My Documents/EXPLOITATION/NT/netbus/NetBus170.zip | **Win.Trojan.Netbus-2** |

These are classified as hacking/exploitation tools that ClamAV flags as Trojans and exploits. NetBus is a well-known remote access Trojan, lsadump2 dumps Windows credentials, GetAdmin is a privilege escalation exploit, and SecHole exploits a Windows NT security vulnerability.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP**, Version 5.1, Build 2600 (as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`).

**Case Q2:** The registered owner is **Greg Schardt** (as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`). The active user profile on the system is named "Mr. Evil," which is Schardt's known online alias.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **4 infected files**: **Win.Trojan.Netbus-2** (NetBus170.zip — a remote access Trojan), **Win.Trojan.Lsadump-1** (lsadump2.exe — credential dumping tool), **Win.Exploit.WinNT-3** (GetAdmin.exe — privilege escalation exploit), and **Win.Trojan.Sehole-1** (SECHOLE.EXE — security hole exploit). All were located in the `My Documents/EXPLOITATION/NT/` directory.