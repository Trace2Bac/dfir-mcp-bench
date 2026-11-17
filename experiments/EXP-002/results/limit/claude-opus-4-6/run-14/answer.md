Now I have all the evidence needed for the report. Let me compile the findings.

---

# Forensic Analysis Report — NIST Hacking Case

## Case Overview

**Evidence:** Dell Latitude CPi notebook computer (serial # VLQLW), found abandoned with wireless PCMCIA card and external homemade 802.11b antenna.  
**Image:** 4Dell_Latitude_CPi.E01 / E02 (EnCase format, ~640 MB)  
**Partition:** Single NTFS partition (sectors 63–9,510,479)  
**Suspect:** Greg Schardt, a.k.a. "Mr. Evil"

## System Information

**Source:** `SOFTWARE\Microsoft\Windows NT\CurrentVersion` registry hive

| Field | Value |
|---|---|
| ProductName | Microsoft Windows XP |
| CurrentVersion | 5.1 |
| CurrentBuildNumber | 2600 |
| RegisteredOwner | Greg Schardt |
| RegisteredOrganization | N/A |
| ProductId | 55274-640-0147306-23684 |
| SystemRoot | C:\WINDOWS |
| InstallDate | 2004-08-19 (epoch 1092955707) |

The sole user profile on the system is named **"Mr. Evil"** — matching the suspect's known online alias.

## Installed Hacking & Surveillance Software

From the `SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall` registry key and file system analysis:

| Software | Purpose |
|---|---|
| **Cain & Abel v2.5 beta45** | Password cracking, ARP spoofing, network sniffing |
| **Ethereal 0.10.6** | Network packet capture and analysis |
| **Network Stumbler** | Wireless access point discovery (wardriving) |
| **Look@LAN 1.0** | Network host scanning and monitoring |
| **WinPcap 3.01a** | Low-level packet capture driver (required by Ethereal, Cain, NetStumbler) |
| **Anonymizer** | Web traffic anonymization toolbar |
| **123 Write All Stored Passwords** | Stored password recovery/extraction |
| **mIRC** | IRC chat client |
| **Forte Agent** | Usenet newsgroup reader |
| **CuteFTP** | FTP file transfer client |

## Hacking Tool Collection (My Documents)

The My Documents directory contains a methodically organized hacking toolkit:

### EXPLOITATION/NT/
- **Brutus** — Password brute-force tool with NetBus authentication definition file (targeting port 12345)
- **NetBus** — Remote access trojan (NetBus170.zip, NetBus.rtf)
- **Netcat** — Network utility ("Swiss army knife" of hacking)
- **Pwdump** — Windows password hash dumper (versions 1–3)
- **lsadump2** — LSA secrets dumping tool
- **sechole / SECHOLED** — Windows privilege escalation exploits
- **GetAdmin** — Privilege escalation tool
- **John the Ripper** — Password cracker (john-16w.zip for NT, john-1.6.tar.gz for Unix)
- **L0phtCrack 3.01** — Windows password auditing/cracking tool
- **SMBGrind Crack** — SMB password cracking tool with user/password lists
- **WinVNC** — Remote desktop access (VNC)
- **bsniff** — Network sniffer
- **NAT** — NetBIOS Auditing Tool
- **Hk** — Exploit toolkit
- **fpipe** — TCP/IP port redirection
- **elsave** — Event log management tool

### EXPLOITATION/Unix/
- **dsniff 2.3** — Network traffic sniffer/interceptor
- **John the Ripper** (Linux version)
- **WinVNC** (Linux/Solaris versions)

### FOOTPRINTING/NT/
- **NmapNT** — Port scanner with full source code
- **NSTPro2** — Network scanning tool
- **SuperScan** — Port scanner
- **spade114.exe** — Sam Spade network query tool

### ENUMERATION/NT/
- **Cerberus Internet Scanner** — Vulnerability scanner (scan reports for 172.16.0.2 found)
- **enum** — Windows enumeration tool
- **ogre** — Network enumeration tool

### COMMANDS/
- Various command-line utilities: snitch.exe, user2sid.exe, STREAMFIND.EXE, SRVBOOT.BAT, etc.

## Evidence of Tool Usage (Prefetch)

Windows Prefetch files confirm execution of these programs:
- **CAIN25B45.EXE** — Cain & Abel was run
- **NETSTUMBLER.EXE** — Network Stumbler was run (wardriving)
- **ETHEREAL.EXE** — Ethereal packet sniffer was run
- **LOOKATLAN.EXE / LOOKATHOST.EXE** — Look@LAN was run
- **MIRC.EXE** — mIRC was run
- **WHOIS.EXE** — WHOIS lookups were performed
- **TELNET.EXE** — Telnet was used
- **PING.EXE** — Ping was used

## Evidence Tying Computer to Suspect

1. **Registered Owner:** The Windows XP installation is registered to **"Greg Schardt"** — the suspect's name, per the SOFTWARE registry hive.
2. **User Profile "Mr. Evil":** The sole active user profile is named "Mr. Evil" — the suspect's known online alias.
3. **Newsgroup Activity:** Outlook Express contains `alt.hacking.dbx` — a data file for the alt.hacking newsgroup, consistent with the suspect's reported hacking interests.
4. **Wardriving Evidence:** Network Stumbler (wireless AP discovery tool) was installed and executed. The computer was found with a wireless PCMCIA card and homemade 802.11b antenna — consistent with the reported wardriving activity near Starbucks/T-Mobile hotspots.
5. **Internet Cache:** Temporary internet files contain a file named `wardriving[1]`, indicating the user visited wardriving-related web content.

## Anti-Virus Scan Results

**ClamAV was run on the evidence** (both the E01 container files and the extracted file cache):

- **E01 container scan:** 0 detections — **however**, ClamAV treated the E01/E02 files as single opaque files and **could not scan the individual files inside the disk image**. This result does not indicate the files within the image are clean.
- **Extracted files scan:** 0 detections in accessible extracted artifacts.

**Assessment:** While ClamAV returned no detections due to the E01 format limitation, the disk image contains well-known hacking tools that many antivirus products would flag. Specifically:
- **NetBus** (inode 10589, NetBus170.zip) is a known remote access trojan
- **Brutus** is a known password brute-forcer
- **GetAdmin, sechole, lsadump2** are known privilege escalation exploits

These tools are classified as hackertools/potentially unwanted programs by most commercial AV engines, even if ClamAV's container-level scan could not detect them.

---

## Case Questions

**Case Q1:** What operating system was used on the computer?
**Microsoft Windows XP** (Version 5.1, Build 2600), installed on 2004-08-19, as recorded in the `SOFTWARE\Microsoft\Windows NT\CurrentVersion` registry key.

**Case Q2:** Who is the registered owner?
**Greg Schardt**, as recorded in the `RegisteredOwner` value of the `SOFTWARE\Microsoft\Windows NT\CurrentVersion` registry key. The sole user profile is named "Mr. Evil" — the suspect's known online alias.

**Case Q3:** Perform an Anti-Virus check. Are there any viruses on the computer?
ClamAV was run against the evidence. Scanning the E01 container files returned **0 detections**, but ClamAV cannot parse EnCase disk images and therefore could not scan the individual files within. The disk image does contain **known hacking tools and trojans**, including **NetBus** (a remote access trojan found at `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip`), **Brutus** (a brute-force password cracker), and numerous exploitation tools (Pwdump, lsadump2, sechole, GetAdmin, John the Ripper, L0phtCrack, SMBGrind, etc.) that commercial antivirus products typically flag as malware or hackertools. No traditional viruses (self-replicating malware) were positively identified, but the system is laden with dual-use offensive security tools and trojans.