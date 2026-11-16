Excellent — ClamAV found 3 malware detections in the extracted hacking tools. I now have all the evidence needed to answer every question. Here is the final report.

---

# Forensic Investigation Report — NIST Hacking Case

## Case Summary

**Evidence:** Dell Latitude CPi notebook computer (serial # VLQLW), EnCase image `4Dell_Latitude_CPi.E01`/`.E02` (~640 MB)  
**Partition Layout:** Single NTFS partition (sector 63–9,510,479)  
**Filesystem:** 12,545 files indexed

## Key Findings

### Operating System
The SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` confirms:
- **ProductName:** Microsoft Windows XP
- **CurrentVersion:** 5.1
- **CurrentBuildNumber:** 2600
- **BuildLab:** 2600.xpclient.010817-1148
- **SystemRoot:** C:\WINDOWS
- **InstallDate:** 2004-08-19 (Unix epoch 1092955707)

### Registered Owner
The same registry key reveals:
- **RegisteredOwner:** Greg Schardt
- **RegisteredOrganization:** N/A
- **ProductId:** 55274-640-0147306-23684

This directly ties the suspect "Greg Schardt" (a.k.a. "Mr. Evil") to the computer. The user profile on the system is named **"Mr. Evil"** (`Documents and Settings/Mr. Evil/`), matching the suspect's known alias.

### Anti-Virus Scan Results
ClamAV was run on extracted files from the disk image. **Three (3) viruses/malware were detected:**

| File (Path on Disk) | Inode | ClamAV Detection |
|---|---|---|
| `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` | 10600 | **Win.Trojan.Lsadump-1** |
| `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` | 10626 | **Win.Exploit.WinNT-3** |
| `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` | 10589 | **Win.Trojan.Netbus-2** |

These are all hacking/exploitation tools:
- **lsadump2.exe** — dumps LSA secrets (passwords) from Windows systems
- **GetAdmin.exe** — a privilege escalation exploit for Windows NT
- **NetBus 1.70** — a well-known remote access trojan (RAT)

### Additional Hacking Tools Found on Disk
The `My Documents` folder is organized into hacking methodology categories:
- **FOOTPRINTING:** NmapNT (port scanner), SuperScan, NSTPro2, spade114.exe
- **ENUMERATION:** Cerberus Internet Scanner, enum, ogre, nbtscan
- **EXPLOITATION:** Brutus (password brute-forcer), NetBus, Netcat, Pwdump, lsadump2, l0phtcrack, John the Ripper, Get Admin, fpipe, NAT, dsniff, bsniff
- **COMMANDS:** Various reconnaissance utilities (snitch.exe, user2sid.exe, etc.)

**Installed Programs:**
- **Ethereal** (packet sniffer) — installed in `Program Files/Ethereal/`
- **Anonymizer Toolbar** — for anonymizing internet traffic
- **Look@LAN** — network discovery tool
- **Agent** — newsgroup reader (with `alt.hacking.dbx` newsgroup data)

The suspect also had cached web content related to **wardriving** in the IE temporary internet files, consistent with the briefing about intercepting wireless traffic at hotspots.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as confirmed by the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`. The user profile on the system is named "Mr. Evil," matching the suspect's known alias.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **3 infections**: **Win.Trojan.Netbus-2** (in `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` — a remote access trojan), **Win.Trojan.Lsadump-1** (in `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` — an LSA password dumping tool), and **Win.Exploit.WinNT-3** (in `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` — a Windows NT privilege escalation exploit).