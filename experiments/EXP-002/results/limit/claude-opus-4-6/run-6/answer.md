I now have all the information needed for the report. Let me compile the findings.

---

# Digital Forensic Investigation Report

## Case: nist-hacking-case-av
**Evidence**: Dell Latitude CPi notebook computer (Serial # VLQLW)  
**Image**: 4Dell_Latitude_CPi.E01 / .E02 (EnCase format, ~640 MB)  
**Partition**: NTFS, sector offset 63, 9,510,417 sectors

---

## System Identification

**Operating System**: Microsoft Windows XP, Version 5.1, Build 2600 (Uniprocessor Free)  
- BuildLab: `2600.xpclient.010817-1148`  
- SystemRoot: `C:\WINDOWS`  
- Product ID: `55274-640-0147306-23684`  
- Install Date: August 19, 2004 (Unix epoch 1092955707)

**Registered Owner**: **Greg Schardt**  
- Registered Organization: N/A  
- Source: `SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner`  
- Registry key last written: 2004-08-27 15:08:22 UTC

**Primary User Account**: "Mr. Evil" (profile at `Documents and Settings/Mr. Evil/`)

This directly ties the computer to the suspect Greg Schardt, who is known to use the online nickname "Mr. Evil."

---

## Anti-Virus Check (ClamAV)

ClamAV was run against the evidence files:

- `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01`: OK  
- `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E02`: OK  

**Important caveat**: ClamAV scanned the E01 container files as opaque blobs — it **cannot open or mount disk images**, so the individual files within the filesystem were not scanned. As the tool itself noted: *"This does not show that the files in the image are clean."*

A second ClamAV scan of the mulder working directory (case database, tool results) also returned 0 detections.

### Known Malicious/Suspicious Software Identified by File Listing

Despite ClamAV's inability to scan inside the image, manual analysis of the filesystem reveals extensive hacking and exploitation software that antivirus tools would typically flag:

| Tool | Location | Category |
|------|----------|----------|
| **NetBus 1.70** (RAT/Trojan) | `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` | Remote Access Trojan |
| **Brutus** (password cracker) | `My Documents/EXPLOITATION/NT/Brutus/` | Brute-force tool (with NetBus .bad config) |
| **Cain & Abel** (v2.5b45) | Prefetch: `CAIN25B45.EXE-056F3A6E.pf` | Password cracking / sniffing |
| **NetStumbler** (v0.4.0) | Prefetch: `NETSTUMBLER.EXE-0BFEE568.pf` | Wireless network discovery |
| **Ethereal** (v0.10.6) | `Program Files/Ethereal/` (installed) | Packet sniffing |
| **Nmap NT** | `My Documents/FOOTPRINTING/NT/Nmapnt/` | Port scanning / fingerprinting |
| **SuperScan** | `My Documents/FOOTPRINTING/NT/superscan/` | Port scanning |
| **Pwdump** (1/2/3) | `My Documents/EXPLOITATION/NT/Pwdump/` | Password hash dumping |
| **lsadump2** | `My Documents/EXPLOITATION/NT/lsadump2/` | LSA secret dumping |
| **John the Ripper** | `My Documents/EXPLOITATION/NT/John/` and `Unix/` | Password cracking |
| **L0phtCrack 3** | `My Documents/EXPLOITATION/NT/l0pht301/lc3setup01.exe` | Password cracking |
| **GetAdmin** | `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` | Privilege escalation |
| **SecHole** | `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` | Security hole exploit |
| **SMBGrind/Crack** | `My Documents/EXPLOITATION/NT/SMBGrind Crack/` | SMB password cracking |
| **Netcat** | `My Documents/EXPLOITATION/NT/Netcat/netcat11nt.zip` | Network utility / backdoor |
| **dsniff** (v2.3) | `My Documents/EXPLOITATION/Unix/dsniff 2.3/` | Network packet sniffing |
| **VNC/WinVNC** | `My Documents/EXPLOITATION/NT/vnc/` and `WinVNC/` | Remote access |
| **NAT** | `My Documents/EXPLOITATION/NT/NAT/nat.zip` | NetBIOS auditing |
| **Anonymizer Toolbar** | `Program Files/Anonymizer/` (installed) | Web anonymization |
| **Look@LAN** | `Program Files/Look@LAN/` (installed) | Network discovery |
| **mIRC** (v6.12) | Prefetch: `MIRC.EXE-0661EC22.pf` | IRC client (often used for C2) |
| **WinPcap** (v3.01a) | Prefetch: `WINPCAP_3_01_A.EXE` | Packet capture library |

The tools are **organized by attack methodology** under `My Documents/`:
- **ENUMERATION/** — Target enumeration tools (ogre)
- **FOOTPRINTING/** — Network reconnaissance (Nmap, SuperScan, NSTPro2)
- **EXPLOITATION/** — Exploitation and post-exploitation (Brutus, NetBus, Pwdump, John, VNC, etc.)
- **ARCHIVE/** — Archiving utilities

### Additional Indicators
- **alt.hacking newsgroup** subscribed in Outlook Express (`alt.hacking.dbx`)
- **Wardriving content** in IE cache (`wardriving[1]`)
- Prefetch evidence shows multiple tools were **actually executed**, not just stored

---

## Case Questions

**Case Q1**: The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2**: The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of `SOFTWARE\Microsoft\Windows NT\CurrentVersion`. The primary user profile on the system is named "Mr. Evil," matching the suspect's known online alias.

**Case Q3**: ClamAV was run on the evidence and reported **0 detections** on the E01 container files. However, ClamAV cannot scan inside EnCase disk images, so this does not confirm the files within are clean. Manual analysis of the filesystem reveals the computer contains **known malicious software**, most notably the **NetBus remote access trojan** (`NetBus170.zip`), along with a large collection of hacking, exploitation, password-cracking, and network-sniffing tools (Cain & Abel, Brutus, Pwdump, lsadump2, John the Ripper, L0phtCrack, GetAdmin, SecHole, Netcat, dsniff, Nmap, Ethereal, NetStumbler, and others). Many of these tools would be flagged as malware, hacking tools, or potentially unwanted programs by most antivirus products.