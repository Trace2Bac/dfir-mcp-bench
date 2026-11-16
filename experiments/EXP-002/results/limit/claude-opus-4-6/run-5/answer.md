Here is the final report.

---

# Forensic Investigation Report — NIST Hacking Case

## Case Overview

**Evidence**: Dell Latitude CPi notebook computer (serial # VLQLW), found abandoned with a wireless PCMCIA card and external homemade 802.11b antenna.

**Disk Image**: `4Dell_Latitude_CPi.E01` / `.E02` (EnCase format, ~640 MB)

**Partition Layout**: Single NTFS partition (offset 63, ~4.87 GB) containing 12,545 files.

---

## Findings

### Operating System

The system runs **Microsoft Windows XP** (version 5.1, build 2600, no Service Pack installed). This was determined from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`:

- `ProductName` = "Microsoft Windows XP"
- `CurrentVersion` = "5.1"
- `CurrentBuildNumber` = "2600"
- `BuildLab` = "2600.xpclient.010817-1148"
- No `CSDVersion` value present (no Service Pack)
- `SystemRoot` = `C:\WINDOWS`
- Install date: 2004-08-19 (Unix epoch 1092955707)

### Registered Owner and Suspect Identification

The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive:

- `RegisteredOwner` = "Greg Schardt"
- `RegisteredOrganization` = "N/A"
- `ProductId` = "55274-640-0147306-23684"

The system has a user profile named **"Mr. Evil"** (`Documents and Settings/Mr. Evil/`), which matches the known online alias of the suspect. The Outlook Express data directory for this user contains a subscription to the **alt.hacking** newsgroup (`alt.hacking.dbx`), further linking the user to hacking activity.

### Anti-Virus Scan

**ClamAV** was run on the evidence at `/evidence/nist-hacking-case`. Results:

```
/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01: OK
/evidence/nist-hacking-case/4Dell_Latitude_CPi.E02: OK
```

**ClamAV detected no viruses (0 detections).** However, ClamAV scanned the E01 container files as opaque blobs — it cannot decompose a forensic disk image to scan individual files within it. This means the scan covers only the container level, not the 12,545+ files inside the NTFS filesystem.

### Hacking Software Inventory

The disk image contains an extensive, well-organized hacking toolkit under `My Documents/`, sorted by attack phase:

**FOOTPRINTING** (reconnaissance):
- **Nmap NT** — port scanner (source and binaries)
- **SuperScan** — TCP port scanner
- **NSTPro2** — network scanner
- **spade114.exe** — DNS interrogation tool

**ENUMERATION** (target profiling):
- **Cerberus Internet Scanner** — vulnerability scanner
- **enum** — Windows enumeration tool
- **ogre** — network enumeration tool

**EXPLOITATION** (attack tools):
- **Brutus** — brute-force password cracker (with NetBus attack definition file on port 12345)
- **NetBus 1.70** — remote access trojan (zip archive)
- **Netcat** — network utility ("Swiss army knife")
- **Pwdump** (versions 1–3) — Windows password hash dumper
- **L0phtCrack 3** (lc3setup01.exe) — password cracker
- **John the Ripper** — password cracker (NT and Unix versions)
- **lsadump2** — LSA secrets dumper
- **GetAdmin** — privilege escalation exploit
- **sechole** — security hole exploit
- **SMBGrind** — SMB password cracker
- **dsniff 2.3** — network sniffing/spoofing suite
- **VNC / WinVNC** — remote desktop access
- **fpipe** — port redirection tool
- **NAT** — NetBIOS auditing tool
- **bsniff** — network sniffer

**Installed Programs** (in `Program Files/`):
- **Ethereal 0.10.6** — packet sniffer/analyzer (executed per Prefetch)
- **Anonymizer** — anonymous browsing toolbar
- **Look@LAN** — network discovery and monitoring
- **WinPcap 3.01** — packet capture driver (required by sniffing tools)
- **Agent** — Usenet newsgroup reader (for alt.hacking)
- **mIRC 6.12** — IRC client

**Prefetch evidence** confirms execution of:
- CAIN25B45.EXE (Cain & Abel password cracker)
- ETHEREAL.EXE
- NETSTUMBLER.EXE (wireless network discovery)
- LOOKATLAN.EXE / LOOKATHOST.EXE
- MIRC.EXE
- WHOIS.EXE
- TELNET.EXE
- PING.EXE

**Other directories**: `My Documents/COMMANDS/` contains tools like `snitch.exe`, `user2sid.exe`, `STREAMFIND.EXE`, and various enumeration scripts. `My Documents/NOVELL/` contains Novell NetWare utilities. `My Documents/ARCHIVE/` has compression utilities (ARJ).

---

## Case Questions

**Case Q1**: The computer ran **Microsoft Windows XP** (version 5.1, build 2600, no Service Pack). Evidence: SOFTWARE registry hive key `Microsoft\Windows NT\CurrentVersion`, value `ProductName` = "Microsoft Windows XP".

**Case Q2**: The registered owner is **Greg Schardt**. Evidence: SOFTWARE registry hive key `Microsoft\Windows NT\CurrentVersion`, value `RegisteredOwner` = "Greg Schardt". This ties the computer directly to the suspect. Additionally, the active user profile is named "Mr. Evil," matching the suspect's known alias.

**Case Q3**: ClamAV was run on the evidence and **detected no viruses** (0 detections). ClamAV scanned the E01 container files but cannot scan inside disk images, so individual files within the filesystem were not individually scanned by the AV engine. The disk does contain numerous hacking tools (Brutus, NetBus, Cain & Abel, Nmap, Pwdump, L0phtCrack, John the Ripper, dsniff, Ethereal, NetStumbler, etc.), which are hack tools/penetration testing utilities rather than self-replicating viruses. NetBus (present as NetBus170.zip) is commonly classified as a trojan by antivirus vendors.