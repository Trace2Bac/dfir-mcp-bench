Excellent. ClamAV found 3 malware detections. I now have all the evidence needed to answer the case questions. Here is the final report.

---

# Forensic Report: NIST Hacking Case — Dell Latitude CPi (S/N VLQLW)

## Evidence Summary

A Dell CPi notebook computer (EnCase image `4Dell_Latitude_CPi.E01`/`.E02`, ~640 MB) was analyzed. The disk contains a single NTFS partition (sectors 63–9510479). The user profile on the system is **"Mr. Evil"**, consistent with the suspect's known online alias.

## Operating System and Owner

The Windows registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`) reveals:

| Field | Value |
|---|---|
| ProductName | Microsoft Windows XP |
| CurrentVersion | 5.1 |
| CurrentBuildNumber | 2600 |
| RegisteredOwner | **Greg Schardt** |
| RegisteredOrganization | N/A |
| SystemRoot | C:\WINDOWS |
| ProductId | 55274-640-0147306-23684 |

## Anti-Virus Scan Results

ClamAV was run against extracted executables from the disk image. **Three (3) malware detections** were identified:

| File Path on Disk | ClamAV Detection | Inode |
|---|---|---|
| My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe | **Win.Trojan.Lsadump-1** | 10600 |
| My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe | **Win.Exploit.WinNT-3** | 10626 |
| My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE | **Win.Trojan.Sehole-1** | 10569 |

All three are hacking/exploitation tools stored in the suspect's organized "EXPLOITATION" directory under My Documents.

## Hacking Software Found

The disk contains a structured collection of hacking tools organized by attack phase under `My Documents/`:

- **FOOTPRINTING**: NmapNT (network scanner), SuperScan, NSTPro2, Spade
- **ENUMERATION**: Enum, Ogre, Cerberus Internet Scanner
- **EXPLOITATION**: Brutus (brute-forcer), NetBus (remote access trojan), Netcat, Pwdump (password dumper), lsadump2 (LSA secrets dumper), GetAdmin (privilege escalation exploit), SecHole (privilege escalation), SMBGrind/Crack (SMB password cracking), L0phtCrack (lc3setup01.exe), John the Ripper, VNC, dsniff, fpipe
- **COMMANDS**: snitch.exe, user2sid.exe, STREAMFIND.EXE

Installed software includes:
- **Ethereal** (network packet sniffer, Program Files/Ethereal)
- **Anonymizer Toolbar** (IP anonymization, Program Files/Anonymizer)
- **Look@LAN** (network discovery, Program Files/Look@LAN)
- **Cain** (password recovery/sniffing, evidenced by Prefetch entry CAIN25B45.EXE)

The user profile name "Mr. Evil" and the Outlook Express mailbox `alt.hacking.dbx` further tie the system to hacking activity.

## Tying the Computer to the Suspect

The registered owner in the Windows registry is **Greg Schardt**, matching the suspected hacker. The user profile is named **"Mr. Evil"**, consistent with Schardt's known online alias. The computer contained an organized collection of hacking, enumeration, exploitation, and password-cracking tools consistent with the described activity of intercepting internet traffic at wireless hotspots.

---

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP** (version 5.1, build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** Yes, there are viruses/malware on the computer. ClamAV detected **three infections**: **Win.Trojan.Lsadump-1** (lsadump2.exe), **Win.Exploit.WinNT-3** (GetAdmin.exe), and **Win.Trojan.Sehole-1** (SECHOLE.EXE) — all located in the `My Documents/EXPLOITATION/NT/` directory. These are hacking/exploitation tools flagged as trojans and exploits by ClamAV's signature database.