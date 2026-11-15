I have all the evidence needed. Here is the final report.

---

# Digital Forensic Examination Report

## Case: NIST Hacking Case — Dell Latitude CPi (S/N VLQLW)

### Evidence Summary

**Evidence Item:** EnCase image `4Dell_Latitude_CPi.E01` / `.E02` (~640 MB)
**Partition Layout:** Single NTFS partition (sectors 63–9,510,479)
**File System:** NTFS, 12,545 files indexed

---

### System Information

The system was running **Microsoft Windows XP** (version 5.1, build 2600), installed on 2004-08-19. The system root was `C:\WINDOWS`. The sole user account on the system was **"Mr. Evil"** — the known alias of the suspect Greg Schardt.

**Registry evidence** (SOFTWARE hive, `Microsoft\Windows NT\CurrentVersion`):
- **ProductName:** Microsoft Windows XP
- **CurrentVersion:** 5.1
- **CurrentBuildNumber:** 2600
- **RegisteredOwner:** Greg Schardt
- **RegisteredOrganization:** N/A
- **ProductId:** 55274-640-0147306-23684

---

### Anti-Virus Scan Results

ClamAV was executed against the evidence directory (`/evidence/nist-hacking-case`). Results:

- `4Dell_Latitude_CPi.E01`: **OK** (no detection)
- `4Dell_Latitude_CPi.E02`: **OK** (no detection)
- **Total detections: 0**

**Important caveat:** ClamAV scanned the E01 container files as opaque blobs — it cannot mount or decompress EnCase images to scan individual files within. Therefore, this scan does not conclusively clear the files inside the disk image. The disk image does contain hacking tools that many AV engines would flag (e.g., NetBus trojan package, Brutus brute forcer, password dumpers), but these could not be individually scanned by ClamAV through the E01 container.

---

### Hacking Software and Evidence of Use

The computer contains an extensive, organized collection of hacking tools, arranged in methodical directories mirroring a penetration testing methodology:

**Desktop Shortcuts (Mr. Evil user):**
Cain v2.5, Ethereal, mIRC, Network Stumbler, Look@LAN, Look@Host, CuteFTP, Whois, Agent, 123 WASP

**EXPLOITATION tools** (`My Documents/EXPLOITATION/`):
- **Brutus** — brute force password cracker (with NetBus attack definition file)
- **NetBus 1.70** — remote access trojan (`NetBus170.zip`)
- **Netcat** — "Swiss army knife" network utility
- **Pwdump** (versions 1-3) — Windows password hash dumper
- **John the Ripper** — password cracker (NT and Unix versions)
- **L0phtCrack 3** — Windows password cracker
- **lsadump2** — LSA secrets dumper
- **sechole** — Windows privilege escalation exploit
- **GetAdmin** — privilege escalation tool
- **SMBGrind** — SMB password brute forcer
- **VNC/WinVNC** — remote desktop control
- **dsniff 2.3** — network traffic sniffer/interceptor
- **bsniff, fpipe, NAT, elsave** — additional exploitation utilities

**FOOTPRINTING tools** (`My Documents/FOOTPRINTING/`):
- **Nmap NT** (with full source code) — port/network scanner
- **SuperScan** — TCP port scanner
- **spade** — DNS/network utility
- **NSTPro2** — network scanner

**ENUMERATION tools** (`My Documents/ENUMERATION/`):
- **ogre** — network enumeration tool

**Installed Programs** (confirmed in Program Files and Prefetch):
- **Ethereal 0.10.6** — network packet sniffer (installed and executed)
- **Cain v2.5 beta 45** — password cracker/network sniffer (executed per Prefetch: `CAIN25B45.EXE`)
- **Network Stumbler 0.4.0** — wireless network scanner (executed per Prefetch: `NETSTUMBLER.EXE`)
- **Look@LAN** — network scanner (executed per Prefetch: `LOOKATLAN.EXE`, `LOOKATHOST.EXE`)
- **mIRC 6.12** — IRC client commonly used in hacking communities (executed per Prefetch)
- **WinPcap 3.01a** — packet capture library (required by sniffers, installed)
- **Anonymizer Toolbar** — anonymous browsing tool

**Newsgroup Subscriptions** (Outlook Express):
The user was subscribed to numerous hacking-related Usenet newsgroups: `alt.2600`, `alt.2600.cardz`, `alt.2600.codez`, `alt.2600.crackz`, `alt.2600.hackerz`, `alt.2600.phreakz`, `alt.binaries.hacking.beginner`, `alt.binaries.hacking.computers`, `alt.binaries.hacking.utilities`, `alt.binaries.hacking.websites`, `alt.dss.hack`, `alt.hacking`, and several `free.binaries.hacking.*` groups.

**Other artifacts:**
- A file named `interception` (173 KB binary) in the Mr. Evil user profile — likely captured network data
- Cached web content related to **wardriving** in browser cache
- A cookie for `www.netstumbler.com` confirming visits to the WiFi hacking community site

---

### Tying the Computer to the Suspect

The registered owner in the Windows registry is **Greg Schardt** — directly matching the suspect's name. The sole user profile is named **"Mr. Evil"** — matching Schardt's known online alias. The computer's configuration (wireless tools, packet sniffers, wardriving software, anonymizer) is entirely consistent with the described behavior of parking near wireless access points to intercept traffic.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (version 5.1, build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** ClamAV was run on the evidence directory and reported **no viruses detected** (0 detections on the E01/E02 container files). However, ClamAV cannot scan inside EnCase disk image containers, so individual files within the image were not scanned. The disk image does contain known hacking tools that many antivirus products would flag — most notably **NetBus 1.70** (a remote access trojan, stored as `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip`), as well as numerous exploitation tools (Brutus, password dumpers, privilege escalation exploits). While no traditional viruses were detected by ClamAV at the container level, the presence of NetBus (a well-known trojan) and the extensive hacking toolkit constitutes significant malicious software on this system.