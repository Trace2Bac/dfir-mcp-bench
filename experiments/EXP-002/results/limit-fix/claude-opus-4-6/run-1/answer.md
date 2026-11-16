I now have all the evidence needed to answer every question. Here is the final report.

---

# Forensic Investigation Report — NIST Hacking Case

## Case Summary

A Dell CPi notebook computer (serial # VLQLW) was found abandoned with a wireless PCMCIA card and an external homemade 802.11b antenna. The computer is suspected to have been used for wireless hacking and credential interception. The investigation sought to identify the operating system, the registered owner, and the presence of any viruses or malware.

## Evidence Analyzed

- **Disk Image:** `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` (EnCase format, ~640 MB)
- **Partition Layout:** Single NTFS partition (sectors 63–9,510,479)
- **Filesystem:** 12,545 files indexed

## Key Findings

### Operating System
The SOFTWARE registry hive (`Microsoft\Windows NT\CurrentVersion`) reveals:
- **ProductName:** Microsoft Windows XP
- **CurrentVersion:** 5.1
- **CurrentBuildNumber:** 2600
- **SystemRoot:** C:\WINDOWS

### Registered Owner
The same registry key shows:
- **RegisteredOwner:** Greg Schardt
- **RegisteredOrganization:** N/A

This ties the computer directly to the suspect. The primary Windows user profile on the system is named **"Mr. Evil"**, matching the suspect's known online alias.

### Anti-Virus Scan Results
ClamAV was run against 15 extracted executables from the disk image. **Four (4) files were flagged as malicious:**

| File Path | ClamAV Signature |
|---|---|
| `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` | **Win.Trojan.Lsadump-1** |
| `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` | **Win.Exploit.WinNT-3** |
| `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` | **Win.Trojan.Sehole-1** |
| `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` | **Win.Trojan.Netbus-2** |

These are all well-known hacking/exploitation tools:
- **lsadump2** — dumps LSA secrets (passwords) from Windows
- **GetAdmin** — privilege escalation exploit for Windows NT
- **SecHole** — privilege escalation exploit that adds users to the Administrators group
- **NetBus** — remote access trojan (RAT) for backdoor control of Windows systems

### Hacking Software Arsenal
Beyond the flagged malware, the disk contains an extensive collection of hacking tools organized in categorized directories:

- **EXPLOITATION:** Brutus (password brute-forcer), NetBus, Netcat, L0phtCrack (lc3setup01.exe), John the Ripper, pwdump (1/2/3), lsadump2, GetAdmin, SecHole, SMBGrind, VNC, dsniff, fpipe
- **ENUMERATION:** enum, ogre, Cerberus Internet Scanner
- **FOOTPRINTING:** Nmap NT, SuperScan, spade, NSTPro2
- **Installed Programs:** Cain & Abel (password recovery/sniffer — at `Program Files/Cain`), Ethereal (packet sniffer — at `Program Files/Ethereal`), Look@LAN (network scanner), Anonymizer Toolbar, mIRC
- **Prefetch evidence of execution:** CAIN25B45.EXE, TELNET.EXE, WINPCAP_3_01_A.EXE among others
- **Outlook Express mailbox:** `alt.hacking.dbx` — the user subscribed to the alt.hacking newsgroup
- **Internet cache:** references to "wardriving" content

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`. The user profile on the system is named "Mr. Evil," matching the suspect's known alias.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **4 infected files** among the extracted executables:
1. `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` — **Win.Trojan.Lsadump-1**
2. `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` — **Win.Exploit.WinNT-3**
3. `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` — **Win.Trojan.Sehole-1**
4. `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` — **Win.Trojan.Netbus-2**