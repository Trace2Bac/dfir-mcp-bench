Same 5 detections — the additional executables were clean by ClamAV's signatures. I now have all the evidence needed for the final report.

---

# Digital Forensic Investigation Report — NIST Hacking Case

## Evidence Summary

**Evidence Item:** Dell Latitude CPi notebook computer, Serial # VLQLW  
**Image File:** 4Dell_Latitude_CPi.E01 / .E02 (EnCase format, ~640 MB)  
**Partition Layout:** Single NTFS partition (sector 63–9510479), ~4.6 GB  

## Operating System & Registration

The Windows registry hive (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`) reveals:

| Field | Value |
|---|---|
| ProductName | Microsoft Windows XP |
| CurrentVersion | 5.1 |
| CurrentBuildNumber | 2600 |
| RegisteredOwner | **Greg Schardt** |
| RegisteredOrganization | N/A |
| SystemRoot | C:\WINDOWS |
| ProductId | 55274-640-0147306-23684 |
| InstallDate | 2004-08-19 (Unix epoch 1092955707) |

The user profile on the system is named **"Mr. Evil"** — the known online alias of suspect Greg Schardt (path: `Documents and Settings/Mr. Evil/`).

## Hacking Software & Tools Found

The disk contains an extensive, organized collection of hacking tools under `My Documents/`, arranged by attack methodology:

**FOOTPRINTING tools:**
- NmapNT (network port scanner, with full source code)
- NSTPro2 (network scanner)
- SuperScan (port scanner)
- Spade114.exe (IP lookup tool)

**ENUMERATION tools:**
- Cerberus Internet Scanner
- Enum (NT enumeration tool)
- Ogre (NT enumeration tool)

**EXPLOITATION tools:**
- Brutus (password brute-forcer, with NetBus.bad file)
- NetBus 1.70 (remote access trojan)
- Netcat (network utility / "Swiss army knife")
- Pwdump / Pwdump2 / Pwdump3 (Windows password hash dumpers)
- lsadump2 (LSA Secrets dumper)
- L0phtCrack 3 (password cracker, lc3setup01.exe)
- John the Ripper (password cracker, both NT & Unix versions)
- GetAdmin (privilege escalation exploit)
- SecHole (privilege escalation exploit)
- SMBGrind Crack (SMB password cracker)
- VNC / WinVNC (remote access)
- NAT (NetBIOS auditing tool)
- fpipe (port redirector)
- elsave (event log manipulation)
- dsniff 2.3 (network sniffing/MITM tool)
- bsniff (network sniffer)

**COMMANDS directory:**
- snitch.exe, user2sid.exe, sid2user.exe, whois.exe, and other reconnaissance utilities

**Installed Programs (Program Files):**
- **Ethereal 0.10.6** — packet capture/analysis (network sniffer)
- **Look@LAN** — network scanner/monitor
- **mIRC 6.12** — IRC client
- **Anonymizer Toolbar** — web anonymization tool
- **Agent** — Usenet newsgroup reader
- **CuteFTP** — FTP client
- **WinPcap 3.01** — packet capture driver (required by Ethereal/Nmap)

**Evidence of Execution (from Prefetch files):**
- CAIN25B45.EXE (Cain & Abel — password recovery/sniffing tool)
- ETHEREAL.EXE (packet capture)
- NETSTUMBLER.EXE (wireless network discovery — consistent with wardriving)
- MIRC.EXE (IRC)
- WHOIS.EXE (domain lookup)
- TELNET.EXE (remote access)
- LOOKATLAN.EXE / LOOKATHOST.EXE (network scanning)
- CMD.EXE, PING.EXE (network reconnaissance)

## Evidence of Wardriving & Interception

- A file named **"interception"** was found on Mr. Evil's desktop (inode 12264)
- **NetStumbler** was installed and executed (Prefetch: `NETSTUMBLER.EXE`), a well-known 802.11b wireless network discovery tool consistent with wardriving
- An external homemade 802.11b antenna was found with the laptop
- Outlook Express newsgroup subscriptions confirm hacking interests:
  - alt.2600, alt.2600.cardz, alt.2600.codez, alt.2600.crackz
  - alt.2600.hackerz, alt.2600.phreakz, alt.2600.programz
  - alt.binaries.hacking.beginner, alt.binaries.hacking.computers
  - alt.binaries.hacking.utilities, alt.binaries.hacking.websites
  - alt.dss.hack, alt.hacking

## Antivirus Scan Results (ClamAV)

ClamAV detected **5 malicious files** on the disk:

| File Path | Inode | ClamAV Detection |
|---|---|---|
| My Documents/COMMANDS/snitch.exe | 10277 | **Win.Trojan.Snitch-1** |
| My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe | 10600 | **Win.Trojan.Lsadump-1** |
| My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe | 10626 | **Win.Exploit.WinNT-3** |
| My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE | 10569 | **Win.Trojan.Sehole-1** |
| My Documents/EXPLOITATION/NT/netbus/NetBus170.zip | 10589 | **Win.Trojan.Netbus-2** |

Note: ClamAV classifies these hacking/exploitation tools as malware. NetBus is a well-known remote access trojan. The others are privilege escalation exploits and credential dumping tools commonly flagged by antivirus software.

## Tying the Computer to the Suspect

Multiple pieces of evidence link this computer to Greg Schardt:
1. **Registered Owner** in the Windows registry is "Greg Schardt"
2. **User profile name** is "Mr. Evil" — Schardt's known online alias
3. **Newsgroup subscriptions** to hacking-related groups are consistent with the suspect's known activities
4. **Hacking toolset** is consistent with the described activities of intercepting wireless traffic for credentials

---

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP** (Version 5.1, Build 2600), as identified from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive value `RegisteredOwner` at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **5 malicious files**: Win.Trojan.Snitch-1 (snitch.exe), Win.Trojan.Lsadump-1 (lsadump2.exe), Win.Exploit.WinNT-3 (GetAdmin.exe), Win.Trojan.Sehole-1 (SECHOLE.EXE), and Win.Trojan.Netbus-2 (NetBus170.zip). These are hacking/exploitation tools classified as trojans and exploits by ClamAV, found in the `My Documents/EXPLOITATION/` and `My Documents/COMMANDS/` directories.