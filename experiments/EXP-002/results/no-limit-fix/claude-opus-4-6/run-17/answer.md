All ClamAV scanning is complete. I now have all evidence needed to compile the final report.

---

# Digital Forensic Analysis Report
## NIST Hacking Case — Dell Latitude CPi (S/N: VLQLW)

### Evidence Summary

**Evidence:** EnCase image `4Dell_Latitude_CPi.E01` / `.E02`
**Partition:** NTFS (sector 63–9,510,479), approximately 4.5 GB
**Total files indexed:** 12,545

### System Information

- **Operating System:** Microsoft Windows XP, Version 5.1, Build 2600 (Uniprocessor Free)
- **System Root:** C:\WINDOWS
- **Product ID:** 55274-640-0147306-23684
- **Install Date:** Unix epoch 1092955707 (~2004-08-19)
- **Registered Owner:** Greg Schardt
- **Registered Organization:** N/A
- **User Profile:** "Mr. Evil" (Documents and Settings\Mr. Evil)

### Tying the Computer to the Suspect

The registry at `SOFTWARE\Microsoft\Windows NT\CurrentVersion` shows `RegisteredOwner = "Greg Schardt"`, directly tying this computer to the suspect. The active user profile on the system is named **"Mr. Evil"**, consistent with the known online alias of Greg Schardt.

### Hacking Software Found

The system contains an organized collection of hacking tools stored in `My Documents`, categorized by attack phase:

| Category | Tools Found |
|---|---|
| **FOOTPRINTING** | NmapNT (network scanner with source), SuperScan, Sam Spade (spade114.exe), NSTPro2 |
| **ENUMERATION** | Cerberus Internet Scanner, DumpTools (DumpACL, DumpEvt, DumpReg, DumpSec), enum, ogre |
| **EXPLOITATION** | Brutus (password cracker), NetBus (remote access trojan), Netcat, Pwdump (1/2/3), lsadump2, L0phtCrack 3 (lc3setup01.exe), GetAdmin, SecHole, SMBGrind Crack, VNC/WinVNC, NAT, fpipe, John the Ripper, dsniff 2.3, bsniff |
| **COMMANDS** | snitch.exe, STREAMFIND.EXE, user2sid.exe, webscan.exe, winfo.exe |
| **DICTIONARIES** | 250MB_WORDLIST.ZIP, biglist, pocket-dic, Unix_dict, words-english (for password cracking) |
| **Installed Software** | Ethereal 0.10.6 (packet sniffer), Anonymizer Toolbar, Look@LAN, Agent (newsreader) |

**Prefetch evidence** confirms execution of **Cain** (CAIN25B45.EXE) and other tools on the system.

**Outlook Express** contains a subscribed newsgroup: `alt.hacking` — further evidence of hacking interest.

**Internet cache** shows browsing related to **wardriving**, consistent with the suspected use of the computer near wireless access points.

### Anti-Virus Scan Results (ClamAV)

ClamAV detected **5 malicious files** on the computer:

| File Path | ClamAV Detection |
|---|---|
| My Documents/COMMANDS/snitch.exe | **Win.Trojan.Snitch-1** |
| My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe | **Win.Trojan.Lsadump-1** |
| My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe | **Win.Exploit.WinNT-3** |
| My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE | **Win.Trojan.Sehole-1** |
| My Documents/EXPLOITATION/NT/netbus/NetBus170.zip | **Win.Trojan.Netbus-2** |

These are all known hacking/exploitation tools classified by ClamAV as trojans or exploits.

---

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP** (Version 5.1, Build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`. The active user profile is named "Mr. Evil", his known online alias.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **5 malicious files**: Win.Trojan.Snitch-1 (snitch.exe), Win.Trojan.Lsadump-1 (lsadump2.exe), Win.Exploit.WinNT-3 (GetAdmin.exe), Win.Trojan.Sehole-1 (SECHOLE.EXE), and Win.Trojan.Netbus-2 (NetBus170.zip). All are hacking/exploitation tools stored in the user's organized tool collection under `My Documents`.