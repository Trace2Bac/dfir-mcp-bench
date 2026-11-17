ClamAV detected 4 malware signatures. I now have all the evidence needed to answer the questions. Here is the final report.

---

# Digital Forensic Investigation Report
## NIST Hacking Case — Dell Latitude CPi (S/N VLQLW)

### Evidence Analyzed
- **Image**: `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` (with segment `.E02`)
- **Filesystem**: NTFS partition starting at sector 63 (size ~4.87 GB)
- **Total files indexed**: 12,545

### Key Findings

**Operating System**: Microsoft Windows XP, Version 5.1, Build 2600 (Uniprocessor Free). The system was installed on 2004-08-19 (InstallDate epoch 1092955707) with SystemRoot at `C:\WINDOWS`.

**Registered Owner**: **Greg Schardt** (confirmed via SOFTWARE hive at `Microsoft\Windows NT\CurrentVersion\RegisteredOwner`). The primary user profile on the system is named **"Mr. Evil"** (located at `Documents and Settings/Mr. Evil/`), which matches the known online alias of the suspect.

**Hacking Software Found**: The disk contains an organized collection of hacking tools under `My Documents/`, categorized into folders:
- **EXPLOITATION/NT/** — Brutus (password cracker), NetBus (remote access trojan), Netcat, Pwdump (password dumping), lsadump2, sechole, SMBGrind Crack, VNC, L0phtCrack (lc3setup01.exe), GetAdmin, dsniff
- **FOOTPRINTING/NT/** — NmapNT (network scanner), SuperScan, NSTPro2, spade114.exe
- **ENUMERATION/NT/** — Cerberus Internet Scanner, enum, ogre
- **COMMANDS/** — snitch.exe, user2sid.exe, STREAMFIND.EXE
- **Installed Programs** — Ethereal (packet sniffer, installed at `Program Files/Ethereal/`), Anonymizer Toolbar, Look@LAN, Agent (newsreader)
- **Prefetch evidence of execution**: CAIN25B45.EXE (Cain & Abel), ETHEREAL.EXE, TELNET.EXE, WINPCAP_3_01_A.EXE
- **Outlook Express**: Subscribed to `alt.hacking` newsgroup (alt.hacking.dbx found in Mr. Evil's profile)
- **IE cache**: Contains references to "wardriving" content

**Anti-Virus Scan Results**: ClamAV detected **4 viruses/malware** among the extracted files:

| File Path | Inode | ClamAV Detection |
|---|---|---|
| `My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe` | 10600 | **Win.Trojan.Lsadump-1** |
| `My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe` | 10626 | **Win.Exploit.WinNT-3** |
| `My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE` | 10569 | **Win.Trojan.Sehole-1** |
| `My Documents/EXPLOITATION/NT/netbus/NetBus170.zip` | 10589 | **Win.Trojan.Netbus-2** |

---

### Case Questions

**Case Q1**: The operating system is **Microsoft Windows XP** (Version 5.1, Build 2600), as confirmed by the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2**: The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive value `RegisteredOwner` at `Microsoft\Windows NT\CurrentVersion`. This ties the computer directly to the suspect. The active user profile is named "Mr. Evil," matching Schardt's known alias.

**Case Q3**: Yes, there are viruses on the computer. ClamAV detected **4 malicious files**: **Win.Trojan.Lsadump-1** (lsadump2.exe), **Win.Exploit.WinNT-3** (GetAdmin.exe), **Win.Trojan.Sehole-1** (SECHOLE.EXE), and **Win.Trojan.Netbus-2** (NetBus170.zip). These are all hacking/exploitation tools classified as trojans or exploits by ClamAV, found in the suspect's organized `EXPLOITATION` directory.