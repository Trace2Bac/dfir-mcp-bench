All evidence collected. I now have complete answers for all three case questions. Here is the final report.

---

# NIST Hacking Case — Forensic Investigation Report

## Evidence Summary

- **Evidence**: Dell Latitude CPi notebook computer (Serial # VLQLW)
- **Disk Image**: `4Dell_Latitude_CPi.E01` / `.E02` (EnCase format, ~640 MB)
- **Partition Layout**: Single NTFS partition at sector offset 63 (9,510,417 sectors)
- **Filesystem**: 12,545 files indexed

## System Identification

The Windows registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`) reveals:
- **ProductName**: Microsoft Windows XP
- **CurrentVersion**: 5.1
- **CurrentBuildNumber**: 2600
- **BuildLab**: 2600.xpclient.010817-1148
- **SystemRoot**: C:\WINDOWS
- **RegisteredOwner**: Greg Schardt
- **RegisteredOrganization**: N/A
- **ProductId**: 55274-640-0147306-23684
- **InstallDate**: 2004-08-19 (Unix timestamp 1092955707)

## User Profile: "Mr. Evil"

The sole user profile on the system is `Documents and Settings/Mr. Evil`, tying the online alias to this machine. The user profile contains extensive hacking-related materials organized into directories:

- **My Documents/EXPLOITATION/** — NetBus (remote admin trojan), Brutus (brute-force), Pwdump (password dumping), lsadump2 (LSA secrets), GetAdmin (privilege escalation), SECHOLE (security hole exploit), SMBGrind Crack, Netcat, VNC, John the Ripper, dsniff, l0phtcrack
- **My Documents/FOOTPRINTING/** — Nmap (network scanner), SuperScan, Sam Spade, NSTPro
- **My Documents/ENUMERATION/** — ogre (enumeration tool)

## Installed Hacking Software (Program Files)

- **Ethereal** (0.10.6) — network packet sniffer/analyzer
- **Look@LAN** — network discovery/monitoring tool
- **Anonymizer** — anonymization/privacy toolbar
- **mIRC** — IRC client (commonly used by hacking communities)
- **WinPcap** — packet capture library (required by sniffers)
- **Cain & Abel** (Cain25b45) — password recovery/sniffing tool (per Prefetch)
- **Network Stumbler** — wireless network scanner (per Prefetch)

## Hacking Newsgroup Subscriptions (Outlook Express)

The user subscribed to numerous hacking newsgroups including:
alt.2600, alt.2600.cardz, alt.2600.codez, alt.2600.crackz, alt.2600.hackerz, alt.2600.phreakz, alt.binaries.hacking.beginner, alt.binaries.hacking.computers, alt.binaries.hacking.utilities, alt.binaries.hacking.websites, alt.dss.hack, alt.hacking, and others.

A file named `interception` was found directly in Mr. Evil's user profile directory, suggesting data interception activity.

## Program Execution History (Prefetch)

Key programs executed on the system:
- CAIN25B45.EXE (Cain & Abel password cracker)
- NETSTUMBLER.EXE (wireless AP scanner — consistent with wardriving)
- ETHEREAL.EXE (packet capture)
- LOOKATLAN.EXE / LOOKATHOST.EXE (network scanning)
- MIRC.EXE (IRC)
- TELNET.EXE
- WHOIS.EXE
- PING.EXE
- WINPCAP installer

## Anti-Virus Scan Results (ClamAV)

ClamAV scanning of extracted executables from the disk image detected **4 malicious files**:

| File | Path | ClamAV Detection |
|------|------|-----------------|
| lsadump2.exe (inode 10600) | My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe | **Win.Trojan.Lsadump-1** |
| GetAdmin.exe (inode 10626) | My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe | **Win.Exploit.WinNT-3** |
| SECHOLE.EXE (inode 10569) | My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE | **Win.Trojan.Sehole-1** |
| NetBus170.zip (inode 10589) | My Documents/EXPLOITATION/NT/netbus/NetBus170.zip | **Win.Trojan.Netbus-2** |

These are all known hacking/exploitation tools classified as trojans or exploits by ClamAV signatures.

---

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP** (Version 5.1, Build 2600), as identified in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive value `RegisteredOwner` at `Microsoft\Windows NT\CurrentVersion`. The user profile name "Mr. Evil" on the same system ties the suspect's known alias to this computer.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **4 malicious files**: **Win.Trojan.Netbus-2** (NetBus170.zip — a remote access trojan), **Win.Trojan.Lsadump-1** (lsadump2.exe — credential dumping tool), **Win.Exploit.WinNT-3** (GetAdmin.exe — privilege escalation exploit), and **Win.Trojan.Sehole-1** (SECHOLE.EXE — security hole exploit). All were found in the `My Documents/EXPLOITATION/NT/` directory tree under the user's organized hacking toolkit.