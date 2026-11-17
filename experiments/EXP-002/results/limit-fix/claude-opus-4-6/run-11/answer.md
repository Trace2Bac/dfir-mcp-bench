I now have all the evidence needed. Here is the final report.

---

# Digital Forensic Investigation Report

## Case: nist-hacking-case-av
**Evidence:** Dell Latitude CPi notebook (S/N VLQLW), EnCase image `4Dell_Latitude_CPi.E01`/`.E02` (640 MB)  
**Date of Analysis:** 2026-11-16  
**Partition Layout:** Single NTFS partition (sector 63–9510479), 12,545 files indexed

---

## Summary of Findings

The abandoned Dell CPi notebook was running **Microsoft Windows XP** (Build 2600) and is registered to **Greg Schardt**. The primary user profile on the machine is named **"Mr. Evil"**, consistent with the suspect's known online nickname. The computer contained an extensive, well-organized collection of hacking and network exploitation tools stored under `My Documents/` in categorized directories (FOOTPRINTING, ENUMERATION, EXPLOITATION, COMMANDS, ARCHIVE). Several professional hacking tools were also installed in `Program Files/`, including **Cain & Abel** (password sniffer/cracker), **Ethereal** (network packet analyzer), **Look@LAN** (network scanner), **Anonymizer** (traffic anonymization), and **Network Stumbler** (wireless AP scanner). An antivirus scan with ClamAV detected **5 malicious files** on the disk.

### Hacking Software Inventory

| Category | Tools Found |
|---|---|
| **Installed (Program Files)** | Cain & Abel v2.5, Ethereal 0.10.6, Look@LAN, Anonymizer Toolbar, Network Stumbler, mIRC |
| **Exploitation** | NetBus 1.70 (trojan), Brutus (brute-forcer), GetAdmin, SECHOLE, lsadump2, Pwdump 1/2/3, John the Ripper, L0phtCrack 3, VNC, Netcat, dsniff 2.3, NAT, SMBGrind, fpipe, bsniff, elsave |
| **Enumeration** | enum, Cerberus Internet Scanner, ogre, user2sid/sid2user, snitch |
| **Footprinting** | NmapNT, SuperScan, NSTPro2, spade, whois |
| **Execution Evidence** | Prefetch files confirm execution of CAIN25B45.EXE, CMD.EXE, TELNET.EXE, WINPCAP installer |

### Evidence Tying Computer to Suspect

- **Registry (SOFTWARE hive):** `RegisteredOwner` = **"Greg Schardt"** (key last written 2004-08-27T15:08:22)
- **User profile:** The only user account is **"Mr. Evil"** (`Documents and Settings/Mr. Evil/`), matching the suspect's known alias
- **Browser cookies:** Cookies for `mr. evil@` across multiple sites (CNN, Google, Yahoo, netstumbler.com, maktoob.com)
- **Outlook Express:** Contains `alt.hacking.dbx` mailbox file, indicating participation in hacking-related newsgroups
- **Desktop shortcuts:** `Documents and Settings/Mr. Evil/Desktop/Tools/` contains shortcuts to Cain v2.5, Ethereal, mIRC, Look@LAN, Network Stumbler, CuteFTP, whois, and other hacking tools

### Cain & Abel Activity

Cain & Abel was installed at `Program Files/Cain/` and had generated multiple credential capture lists:
- APR.LST, SMB.LST, HTTP.LST, FTP.LST, POP3.LST, TELNET.LST, IMAP.LST, HTTPS.LST, VNC.LST, SSH-1.LST, RADIUS.LST, ICQ.LST, MSN.LST, NNTP.LST, SMTP.LST, IKE-PSK.LST, K5.LST, LMNT.LST, CERT.LST, HOSTS.LST, DRR.LST, CCD.LST, TDS.LST

These `.LST` files indicate the tool was actively used to capture credentials across many protocols.

---

## ClamAV Anti-Virus Scan Results

Files were extracted from the disk image by inode and scanned with ClamAV. **5 detections** were found:

| File Path | ClamAV Signature | Description |
|---|---|---|
| `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` (inode 10600) | **Win.Trojan.Lsadump-1** | LSA secrets dumping tool |
| `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` (inode 10626) | **Win.Exploit.WinNT-3** | Privilege escalation exploit |
| `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` (inode 10569) | **Win.Trojan.Sehole-1** | Security hole exploit tool |
| `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` (inode 10589) | **Win.Trojan.Netbus-2** | NetBus remote access trojan |
| `Program Files/Cain/Abel.dll` (inode 9958) | **Win.Trojan.Cain-9** | Cain & Abel password sniffer component |

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as identified from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` (ProductName = "Microsoft Windows XP", CurrentVersion = "5.1", CurrentBuildNumber = "2600").

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive value `RegisteredOwner` at `Microsoft\Windows NT\CurrentVersion`. This directly ties the computer to the suspect.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **5 infected files**: Win.Trojan.Lsadump-1 (lsadump2.exe), Win.Exploit.WinNT-3 (GetAdmin.exe), Win.Trojan.Sehole-1 (SECHOLE.EXE), Win.Trojan.Netbus-2 (NetBus170.zip), and Win.Trojan.Cain-9 (Abel.dll). These are hacking/exploitation tools classified as trojans and exploits by ClamAV's signature database.