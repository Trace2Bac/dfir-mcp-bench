I now have all the evidence needed to answer the case questions. Here is my final report.

---

# Digital Forensic Investigation Report

## Case: nist-hacking-case-av
**Evidence:** Dell Latitude CPi notebook computer (Serial # VLQLW)  
**Image:** 4Dell_Latitude_CPi.E01 / .E02 (EnCase format, ~640 MB)  
**Partition:** NTFS, sector offset 63, ~4.87 GB

---

## Investigation Summary

The disk image was analyzed using partition discovery (mmls), recursive file listing (fls), Windows registry analysis, and ClamAV antivirus scanning. The computer belongs to a user profile named "Mr. Evil" and is registered to **Greg Schardt**. The system contains an extensive collection of hacking, exploitation, and network reconnaissance tools organized in categorized directories.

### Hacking Tools Found on Disk

The `My Documents` folder contains methodically organized hacking tool collections:

- **EXPLOITATION/NT/**: Brutus (password cracker), NetBus (remote access trojan), Netcat, Pwdump (password hash dumper), lsadump2 (LSA secrets dumper), GetAdmin (privilege escalation), sechole (security hole exploit), SMBGrind (SMB password cracker), l0phtcrack, John the Ripper, VNC, fpipe, NAT, bsniff, elsave
- **EXPLOITATION/Unix/**: dsniff, John the Ripper, VNC
- **FOOTPRINTING/NT/**: NmapNT (port scanner), SuperScan, spade, NSTPro2
- **ENUMERATION/NT/**: ogre, enum, Cerberus Internet Scanner, BrutusA2
- **COMMANDS/**: snitch.exe, user2sid.exe, STREAMFIND.EXE, and other recon utilities

### Installed Programs (Program Files)
- **Ethereal** (packet sniffer/network analyzer, v0.10.6)
- **Look@LAN** (network discovery)
- **Anonymizer Toolbar** (anonymous browsing)
- **Agent** (Usenet/newsgroup reader)

### Prefetch Evidence of Execution
Prefetch files confirm these tools were actually executed on the system:
- CAIN25B45.EXE (Cain & Abel - password recovery/sniffing)
- NETSTUMBLER.EXE (wireless network discovery/wardriving)
- ETHEREAL.EXE and ETHEREAL-SETUP-0.10.6.EXE
- LOOKATLAN.EXE and LOOKATHOST.EXE
- MIRC.EXE (IRC client)
- WHOIS.EXE
- PING.EXE

### Other Notable Evidence
- User profile is **"Mr. Evil"** — consistent with the suspect's known alias
- Outlook Express database `alt.hacking.dbx` — subscribed to the alt.hacking newsgroup
- Browser cache contains **wardriving** related content
- Network neighborhood shows connections to a machine named "Andrews-1"

---

## ClamAV Antivirus Scan Results

Suspicious executables were extracted from the disk image and scanned with ClamAV. **4 viruses/malware were detected:**

| File Path | ClamAV Detection |
|---|---|
| `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` (inode 10600) | **Win.Trojan.Lsadump-1** |
| `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` (inode 10626) | **Win.Exploit.WinNT-3** |
| `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` (inode 10569) | **Win.Trojan.Sehole-1** |
| `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` (inode 10589) | **Win.Trojan.Netbus-2** |

---

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP** (version 5.1, build 2600), as identified from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` (ProductName: "Microsoft Windows XP", CurrentVersion: "5.1", CurrentBuildNumber: "2600").

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion\RegisteredOwner`. This directly ties the computer to the suspect. The user profile name "Mr. Evil" further corroborates the connection to the suspect's known online alias.

**Case Q3:** Yes, there are viruses on the computer. ClamAV detected **4 malicious files**: **Win.Trojan.Netbus-2** (NetBus remote access trojan in `EXPLOITATION/NT/netbus/NetBus170.zip`), **Win.Trojan.Lsadump-1** (LSA credential dumping trojan in `EXPLOITATION/NT/lsadump2/lsadump2.exe`), **Win.Exploit.WinNT-3** (Windows NT privilege escalation exploit in `EXPLOITATION/NT/Get Admin/GetAdmin.exe`), and **Win.Trojan.Sehole-1** (security hole exploit in `EXPLOITATION/NT/sechole/SECHOLE.EXE`). These are hacking/exploitation tools classified as trojans and exploits by ClamAV's signature database.