I have now gathered all the evidence needed. Let me compile the final report.

---

# Forensic Investigation Report: NIST Hacking Case

## Case Overview

**Evidence:** Dell Latitude CPi notebook computer (Serial # VLQLW), EnCase image `4Dell_Latitude_CPi.E01` / `.E02`  
**Disk Layout:** Single NTFS partition at sector offset 63 (approximately 4.87 GB)  
**User Profile:** "Mr. Evil" (`Documents and Settings/Mr. Evil`)

## Findings

### Operating System and Registration

The Windows registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`) reveals:

- **ProductName:** Microsoft Windows XP
- **CurrentVersion:** 5.1
- **CurrentBuildNumber:** 2600
- **BuildLab:** 2600.xpclient.010817-1148
- **SystemRoot:** C:\WINDOWS
- **RegisteredOwner:** Greg Schardt
- **RegisteredOrganization:** N/A
- **ProductId:** 55274-640-0147306-23684
- **InstallDate:** 1092955707 (Unix epoch = August 19, 2004)

The sole user profile on the system is named **"Mr. Evil"**, matching the known online alias of the suspect Greg Schardt.

### Hacking Software Inventory

The `My Documents` folder is organized into hacking methodology categories:

**EXPLOITATION/NT:**
- **Brutus** — Password brute-force tool with a NetBus attack configuration (NetBus.bad targeting port 12345)
- **NetBus** — Remote access trojan (NetBus170.zip)
- **Netcat** — Network utility for reading/writing across connections (netcat11nt.zip)
- **John the Ripper** — Password cracker (john-16w.zip)
- **L0phtCrack** — Password auditing tool (lc3setup01.exe)
- **Pwdump** — Windows password hash dumper (pwdump.zip, pwdump2.zip, pwdump3.zip)
- **lsadump2** — LSA secrets dumper (compiled executable and source)
- **Get Admin** — Privilege escalation exploit (GetAdmin.exe)
- **sechole** — Security hole exploit (SECHOLE.EXE, SECHOLED.EXE)
- **SMBGrind Crack** — SMB password cracker (crack.exe, smbgrind.exe)
- **VNC/WinVNC** — Remote desktop control
- **bsniff** — Packet sniffer
- **fpipe** — Port forwarding/redirection
- **NAT** — NetBIOS Auditing Tool

**EXPLOITATION/Unix:**
- **dsniff 2.3** — Network sniffing/interception suite

**FOOTPRINTING/NT:**
- **Nmap** (nmapNT) — Network port scanner (full source and binaries)
- **NSTPro2** — Network scanner
- **superscan** — Port scanner
- **spade114.exe** — DNS reconnaissance tool

**ENUMERATION/NT:**
- **Cerberus Internet Scanner** — Vulnerability scanner (reports found for 172.16.0.2)
- **enum** — Windows enumeration tool
- **ogre** — Network tool

**Installed Software (Program Files):**
- **Ethereal 0.10.6** — Packet capture/analysis (now Wireshark)
- **Look@LAN** — Network discovery tool
- **Anonymizer** — Web anonymization toolbar
- **mIRC** — IRC client (commonly used for hacker communication)
- **Agent** — Usenet newsreader

**Prefetch Evidence of Execution:**
The Windows Prefetch directory confirms the following tools were actually executed on this system:
- CAIN25B45.EXE (Cain & Abel — password sniffing/cracking)
- NETSTUMBLER.EXE (wireless network discovery/wardriving)
- ETHEREAL.EXE (packet capture)
- MIRC.EXE (IRC client)
- WHOIS.EXE (domain reconnaissance)
- TELNET.EXE (remote access)
- PING.EXE (network probing)
- LOOKATLAN.EXE / LOOKATHOST.EXE (network scanning)
- WINPCAP_3_01_A.EXE (packet capture driver)

### Evidence Tying Computer to Suspect

1. **RegisteredOwner** in the Windows registry is **"Greg Schardt"**
2. The only user profile on the system is **"Mr. Evil"** — the known alias of Greg Schardt
3. Outlook Express database `alt.hacking.dbx` found in Mr. Evil's profile, showing subscription to the `alt.hacking` newsgroup
4. Internet cache shows browsing of **wardriving** content (`wardriving[1]` in IE cache)
5. Network Stumbler installed and executed — consistent with the wardriving MO described by associates

### Anti-Virus Scan Results

ClamAV was run against the evidence:
- **Scan 1:** `run_clamav("/evidence/nist-hacking-case")` — scanned the E01/E02 container files. **Result: 0 detections.** However, ClamAV noted it cannot open disk images to scan individual files inside them.
- **Scan 2:** `run_clamav("/home/mulder/.mulder")` — scanned the working directory including extracted artifacts. **Result: 0 detections.**

While ClamAV found no traditional virus signatures, the computer contains numerous hacking tools that many antivirus products would flag as "hacktools" or "potentially unwanted programs" (e.g., NetBus, GetAdmin, Cain & Abel, lsadump2, sechole).

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), installed on August 19, 2004. This was confirmed from the `SOFTWARE\Microsoft\Windows NT\CurrentVersion` registry key (ProductName = "Microsoft Windows XP", CurrentBuildNumber = "2600").

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner` registry value. The system's only user profile is named "Mr. Evil," which is the known online alias of Greg Schardt.

**Case Q3:** ClamAV was run on the evidence and reported **no viruses detected** (0 detections on both the E01 container files and the extracted working directory). ClamAV could not scan individual files inside the disk image. While no traditional viruses were found, the computer contains a large collection of hacking and exploitation tools (NetBus, Brutus, Cain & Abel, John the Ripper, L0phtCrack, Pwdump, lsadump2, GetAdmin, sechole, Netcat, dsniff, Nmap, Network Stumbler, Ethereal, etc.) that are commonly flagged as hacktools or potentially unwanted programs by antivirus software.