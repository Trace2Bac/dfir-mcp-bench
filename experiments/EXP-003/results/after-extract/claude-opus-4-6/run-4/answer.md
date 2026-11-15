I now have all the information needed for the final report.

---

# Digital Forensics Investigation Report

## Case: NIST Hacking Case (nist-hacking-case-av)

### Evidence Analyzed
- **Disk Image:** `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` (640 MB, EnCase format)
- **Partition Layout:** Single NTFS partition (sector 63 – 9,510,479), approximately 4.5 GB
- **Computer:** Dell CPi notebook, serial # VLQLW, found abandoned with wireless PCMCIA card and homemade 802.11b antenna

### System Information

The registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`) reveals:
- **OS:** Microsoft Windows XP, Version 5.1, Build 2600
- **Registered Owner:** Greg Schardt
- **Registered Organization:** N/A
- **Product ID:** 55274-640-0147306-23684
- **System Root:** C:\WINDOWS
- **Install Date:** August 19, 2004 (Unix epoch 1092955707)

### User Profile

The primary user account is **"Mr. Evil"** (SID: S-1-5-21-2000478354-688789844-1708537768-1003), consistent with the known alias of the suspect Greg Schardt. Evidence tying the computer to the suspect includes:
- The registered owner name "Greg Schardt" in the Windows registry
- The user profile name "Mr. Evil" matching the suspect's known online nickname

### Hacking Software Found

The disk contains an extensive, organized collection of hacking tools:

| Category | Tools |
|---|---|
| **Installed Programs** | Cain & Abel v2.5 (password cracker/sniffer), Ethereal (packet sniffer), Network Stumbler (wireless network scanner), Anonymizer Toolbar, WinPcap, Look@LAN, mIRC |
| **EXPLOITATION directory** | Brutus (password cracker), NetBus (RAT), Netcat, lsadump2, GetAdmin, SECHOLE, L0phtCrack 3, SMBGrind Crack, John the Ripper, VNC, fpipe, Pwdump (1/2/3), NAT, dsniff |
| **FOOTPRINTING directory** | NmapNT (port scanner), SuperScan, Sam Spade, NSTPro2 |
| **ENUMERATION directory** | Cerberus Internet Scanner, DumpTools (DumpACL, DumpEvt, DumpReg, DumpSec), enum, ogre |
| **COMMANDS directory** | snitch.exe, STREAMFIND.EXE, user2sid.exe, webscan.exe, winfo.exe |
| **DICTIONARIES** | 250MB_WORDLIST.ZIP, biglist, pocket-dic, Unix_dict — password cracking dictionaries |
| **Desktop Shortcuts** | Cain v2.5, Ethereal, Network Stumbler, Look@LAN, Look@Host, mIRC, CuteFTP, 123 WASP, Agent, Faber Toys, Whois |

### Evidence of Use

- **Prefetch files** confirm execution of: CAIN25B45.EXE, CMD.EXE, CUTE3032.EXE, and other tools
- **Outlook Express** subscribed to numerous hacking newsgroups: alt.2600, alt.2600.cardz, alt.2600.codez, alt.2600.crackz, alt.2600.hackerz, alt.2600.phreakz, alt.binaries.hacking.*, alt.hacking, alt.dss.hack, and others
- **Network neighborhood** shows connection to a machine named "Andrews-1"
- **Cain's .LST files** (APR.LST, HOSTS.LST, HTTP.LST, FTP.LST, SMB.LST, etc.) indicate the tool was used to intercept network traffic
- **Internet cache** contains references to "wardriving" and "www.netstumbler.com"
- **Recycler bin** contains 4 executables (Dc1.exe through Dc4.exe) that were deleted by the user
- An "interception" file exists on Mr. Evil's desktop

### ClamAV Anti-Virus Scan Results

ClamAV detected **4 infected files** on the computer:

| File Path | ClamAV Detection |
|---|---|
| `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` (inode 10600) | **Win.Trojan.Lsadump-1** |
| `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` (inode 10626) | **Win.Exploit.WinNT-3** |
| `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` (inode 10569) | **Win.Trojan.Sehole-1** |
| `My Documents/COMMANDS/snitch.exe` (inode 10277) | **Win.Trojan.Snitch-1** |

These are all hacking/exploitation tools that are flagged by antivirus engines due to their malicious capabilities (privilege escalation, credential dumping, system reconnaissance).

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as identified in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value under `SOFTWARE\Microsoft\Windows NT\CurrentVersion`. This ties the computer to the suspect, who also uses the alias "Mr. Evil" (the name of the primary user profile on the system).

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **4 infections**: Win.Trojan.Lsadump-1 (`lsadump2.exe`), Win.Exploit.WinNT-3 (`GetAdmin.exe`), Win.Trojan.Sehole-1 (`SECHOLE.EXE`), and Win.Trojan.Snitch-1 (`snitch.exe`). All are hacking/exploitation tools located in the `My Documents/EXPLOITATION` and `My Documents/COMMANDS` directories.