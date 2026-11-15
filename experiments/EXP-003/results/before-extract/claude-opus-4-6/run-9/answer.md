I now have all the evidence needed for the report. Let me compile the findings.

---

# Digital Forensics Report: NIST Hacking Case

## Evidence Examined

- **Image**: 4Dell_Latitude_CPi.E01 / E02 (EnCase, ~640 MB)
- **Hardware**: Dell CPi notebook, S/N VLQLW, found abandoned with wireless PCMCIA card and homemade 802.11b antenna
- **Partition**: Single NTFS partition (sectors 63–9,510,479)

## System Information

- **Operating System**: Microsoft Windows XP (Version 5.1, Build 2600)
- **Registered Owner**: Greg Schardt
- **Registered Organization**: N/A
- **Product ID**: 55274-640-0147306-23684
- **Install Date**: August 19, 2004 (Unix epoch 1092955707)
- **System Root**: C:\WINDOWS
- **Primary User Profile**: "Mr. Evil"

## Tying the Computer to the Suspect

The Windows registry `SOFTWARE\Microsoft\Windows NT\CurrentVersion` key shows **RegisteredOwner = "Greg Schardt"**, directly linking this machine to the suspect. The user profile on the system is named **"Mr. Evil"**, matching the known online alias of Greg Schardt.

## Hacking Software and Evidence of Use

The disk contains an organized collection of hacking tools, categorized by attack phase:

### Installed Programs (Program Files)
- **Ethereal** (v0.10.6) — network packet sniffer/analyzer
- **Anonymizer Toolbar** — privacy/anonymization tool
- **Look@LAN** — network scanner
- **Network Stumbler** — wireless network discovery (wardriving)
- **Cain v2.5** — password cracking and sniffing tool (confirmed via Prefetch: `CAIN25B45.EXE-056F3A6E.pf`)
- **Agent** — Usenet newsgroup reader

### Desktop Shortcuts (Mr. Evil/Desktop/Tools)
Shortcuts to: Cain v2.5, Ethereal, Look@LAN, Look@Host, Network Stumbler, mIRC, CuteFTP, Agent, whois

### Hacking Tool Archives (My Documents)
Organized into penetration testing phases:

| Phase | Tools |
|-------|-------|
| **FOOTPRINTING** | NmapNT (port scanner), SuperScan, NSTPro2, Spade |
| **ENUMERATION** | Cerberus Internet Scanner, enum, ogre, DumpTools (DumpACL, DumpEvt, DumpReg, DumpSec) |
| **EXPLOITATION** | Brutus (password cracker), NetBus (trojan/RAT), Netcat, GetAdmin, SecHole, lsadump2, Pwdump (1-3), L0phtCrack 3, John the Ripper, SMBGrind/Crack, VNC, NAT, dsniff, fpipe, bsniff, elsave |
| **COMMANDS** | snitch.exe, user2sid, webscan, winfo, STREAMFIND |
| **DICTIONARIES** | 250MB wordlist, biglist, pocket-dic, Unix_dict, words-english |

### Newsgroup Subscriptions (Outlook Express)
The user subscribed to numerous hacking-related Usenet groups including:
- alt.2600, alt.2600.cardz, alt.2600.codez, alt.2600.crackz, alt.2600.hackerz, alt.2600.phreakz, alt.2600.programz
- alt.binaries.hacking.beginner, alt.binaries.hacking.computers, alt.binaries.hacking.utilities, alt.binaries.hacking.websites
- alt.dss.hack, alt.hacking

### Evidence of Wardriving
- Network Stumbler installed (wardriving tool for finding wireless access points)
- Cached web page: `wardriving[1]` in IE temporary files
- Visit to www.netstumbler.com (cookie found)
- A file named **"interception"** in the Mr. Evil profile root
- Homemade 802.11b antenna found with the laptop

### Prefetch Evidence (Programs Executed)
- CAIN25B45.EXE, CMD.EXE, TELNET.EXE, WINPCAP_3_01_A.EXE (packet capture driver, prerequisite for Ethereal)

## Anti-Virus Scan Results

ClamAV scan of extracted executables detected **5 malicious files**:

| File | Path | Detection |
|------|------|-----------|
| snitch.exe | My Documents/COMMANDS/snitch.exe | **Win.Trojan.Snitch-1** |
| lsadump2.exe | My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe | **Win.Trojan.Lsadump-1** |
| GetAdmin.exe | My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe | **Win.Exploit.WinNT-3** |
| SECHOLE.EXE | My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE | **Win.Trojan.Sehole-1** |
| NetBus170.zip | My Documents/EXPLOITATION/NT/netbus/NetBus170.zip | **Win.Trojan.Netbus-2** |

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as identified from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` (ProductName = "Microsoft Windows XP", CurrentVersion = "5.1", CurrentBuildNumber = "2600").

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion\RegisteredOwner`. This directly ties the computer to the suspect.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **5 infections**: Win.Trojan.Snitch-1 (snitch.exe), Win.Trojan.Lsadump-1 (lsadump2.exe), Win.Exploit.WinNT-3 (GetAdmin.exe), Win.Trojan.Sehole-1 (SECHOLE.EXE), and Win.Trojan.Netbus-2 (NetBus170.zip). These are all hacking/exploitation tools classified as trojans or exploits by ClamAV, located in the `My Documents/EXPLOITATION` and `My Documents/COMMANDS` directories.