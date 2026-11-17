I now have all the evidence needed. Here is the final report.

---

# Forensic Investigation Report: NIST Hacking Case

## Evidence Summary

- **Evidence Item:** Dell CPi notebook computer, serial # VLQLW
- **Image File:** `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` (EnCase format, ~640 MB)
- **Partition Layout:** Single NTFS partition (sectors 63–9,510,479)
- **Case ID:** nist-hacking-case-av

## System Information

The Windows Registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`) reveals:
- **Operating System:** Microsoft Windows XP (Version 5.1, Build 2600)
- **System Root:** C:\WINDOWS
- **Product ID:** 55274-640-0147306-23684
- **Install Date:** August 19, 2004 (Unix timestamp 1092955707)
- **Registered Owner:** Greg Schardt
- **Registered Organization:** N/A

The user profile on the system is named **"Mr. Evil"** (found at `Documents and Settings/Mr. Evil/`), which matches the suspect's known online alias.

## Hacking Software Found

The "My Documents" folder contains an organized hacking toolkit, arranged by attack phase:

### Exploitation Tools (`My Documents/EXPLOITATION/`)
- **Brutus** — Brute-force password cracker, with a NetBus attack definition file (`NetBus.bad`, targeting port 12345)
- **NetBus 1.70** — Remote access trojan (`NetBus170.zip`)
- **Netcat** — Network utility/"Swiss Army knife" for hackers (`netcat11nt.zip`)
- **Pwdump / Pwdump2 / Pwdump3** — Windows SAM password hash dumpers
- **lsadump2** — LSA secret dumper (both source and compiled binary present)
- **GetAdmin** — Privilege escalation exploit
- **SECHOLE / SECHOLED** — Security hole exploitation tools
- **L0phtCrack 3** — Password auditing/cracking tool (`lc3setup01.exe`)
- **John the Ripper** — Password cracker (NT and Unix versions)
- **SMBGrind Crack** — SMB brute-force cracking suite
- **VNC / WinVNC** — Remote desktop access tools (used for unauthorized access)
- **dsniff 2.3** — Network sniffing/MITM tool suite
- **bsniff** — Network packet sniffer
- **fpipe** — TCP port redirector
- **NAT** — NetBIOS auditing tool
- **hk** — Exploitation kit

### Footprinting Tools (`My Documents/FOOTPRINTING/`)
- **NmapNT** — Network port scanner (full source code and binaries)
- **NSTPro2** — Network scanner
- **SuperScan** — TCP port scanner
- **Spade** — DNS/WHOIS lookup tool

### Enumeration Tools (`My Documents/ENUMERATION/`)
- **Cerberus Internet Scanner** — Vulnerability scanner (with scan reports for 172.16.0.2)
- **enum** — Windows enumeration tool
- **ogre** — Network enumeration tool

### Installed Programs (Program Files)
- **Ethereal 0.10.6** — Network packet analyzer (now Wireshark)
- **Look@LAN** — Network discovery/monitoring tool
- **Anonymizer Toolbar** — Web anonymization tool
- **mIRC 6.12** — IRC client (commonly used for hacking coordination)
- **Cain & Abel** (CAIN25B45.EXE — confirmed executed via Prefetch)

### Windows Prefetch Evidence (Programs Executed)
The Prefetch directory confirms the following hacking tools were actually executed on the system:
- `CAIN25B45.EXE` — Cain & Abel password recovery/sniffer
- `NETSTUMBLER.EXE` — Wireless network scanner/wardriving tool
- `ETHEREAL.EXE` — Network packet sniffer
- `MIRC.EXE` — IRC client
- `LOOKATLAN.EXE` / `LOOKATHOST.EXE` — Network scanners
- `WHOIS.EXE` — WHOIS lookup
- `TELNET.EXE` — Telnet client
- `WINPCAP_3_01_A.EXE` — WinPcap packet capture driver

### Additional Evidence
- **Outlook Express** mailbox for `alt.hacking` newsgroup found at `Documents and Settings/Mr. Evil/Local Settings/Application Data/Identities/{EF086998-1115-4ECD-9B13-9ADC067B4929}/Microsoft/Outlook Express/alt.hacking.dbx`
- **Wardriving** content found in the browser cache (`wardriving[1]`)
- **Desktop shortcut to WHOIS** tool on the Mr. Evil desktop

## Anti-Virus Scan Results

ClamAV was executed against the evidence:

1. **First scan** (E01 container files): 0 detections. ClamAV noted it cannot open disk images, so files inside the image were not individually scanned.
2. **Second scan** (Mulder case data directory): 0 detections on any extracted artifacts.

**Limitation:** ClamAV treats E01 files as opaque binary blobs and cannot parse the filesystem within them. Individual files inside the disk image were not scanned at the file level. The hacking tools present (particularly **NetBus**, which is universally classified as a trojan by antivirus vendors) would likely trigger detections in a live-system scan.

## Tying the Computer to the Suspect

The computer is tied to **Greg Schardt** through the following evidence:
1. **Windows Registered Owner:** "Greg Schardt" (from `SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner`)
2. **User Profile:** The only user account is named "Mr. Evil" — the suspect's known online alias
3. The computer contains an organized collection of hacking tools consistent with the described activities (wardriving, credential theft, network interception)

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as determined from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the registry value `RegisteredOwner` under `HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** ClamAV was run against the evidence and returned **0 virus detections**. However, ClamAV could not scan inside the E01 disk image format — it only scanned the container files themselves. The disk image contains numerous hacking tools that most antivirus products would flag, most notably **NetBus** (a well-known trojan, found at `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip`), along with password crackers (Cain & Abel, Brutus, L0phtCrack, John the Ripper), network sniffers (Ethereal, dsniff, bsniff), and exploitation tools (lsadump2, GetAdmin, SECHOLE, Pwdump). While these are hacking/penetration testing tools rather than self-replicating viruses in the traditional sense, NetBus is classified as a trojan by virtually all antivirus engines.