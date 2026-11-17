I now have all the information needed. Here is the final report.

---

# Forensic Investigation Report — NIST Hacking Case

## Evidence

- **Image:** 4Dell_Latitude_CPi.E01 / E02 (EnCase format, ~640 MB)
- **Filesystem:** NTFS, single partition starting at sector 63
- **Computer:** Dell Latitude CPi notebook, serial # VLQLW

## System Information

The registry at `SOFTWARE\Microsoft\Windows NT\CurrentVersion` shows:

| Field | Value |
|---|---|
| ProductName | Microsoft Windows XP |
| CurrentVersion | 5.1 |
| CurrentBuildNumber | 2600 |
| RegisteredOwner | Greg Schardt |
| RegisteredOrganization | N/A |
| SystemRoot | C:\WINDOWS |
| ProductId | 55274-640-0147306-23684 |
| InstallDate | 2004-08-19 (Unix epoch 1092955707) |

The sole user profile on the system is `Mr. Evil`, consistent with the suspect's known online alias.

## Anti-Virus Scan Results

ClamAV was run against executables extracted from the disk image. **Four files were flagged as malicious:**

| Detection | File | Path on Disk |
|---|---|---|
| **Win.Trojan.Lsadump-1** | lsadump2.exe (inode 10600) | My Documents/EXPLOITATION/NT/lsadump2/lsadump2.exe |
| **Win.Exploit.WinNT-3** | GetAdmin.exe (inode 10626) | My Documents/EXPLOITATION/NT/Get Admin/GetAdmin.exe |
| **Win.Trojan.Sehole-1** | SECHOLE.EXE (inode 10569) | My Documents/EXPLOITATION/NT/sechole/SECHOLE.EXE |
| **Win.Trojan.Netbus-2** | NetBus170.zip (inode 10589) | My Documents/EXPLOITATION/NT/netbus/NetBus170.zip |

Additional hacking tools extracted and scanned (CrackUI.exe, GrindUI.exe, smbgrind.exe, crack.exe, vncviewer.exe, lc3setup01.exe) did not trigger ClamAV signatures but are themselves offensive security tools.

## Hacking Software Inventory

The `My Documents` directory is organized into a penetration-testing methodology framework:

- **FOOTPRINTING:** NmapNT (network scanner), NSTPro2, SuperScan, spade114.exe
- **ENUMERATION:** enum, ogre, Cerberus Internet Scanner, various NT enumeration tools
- **EXPLOITATION:** Brutus (password brute-forcer), NetBus (remote access trojan), Netcat, Pwdump (1/2/3), lsadump2, GetAdmin, sechole, SMBGrind/Crack, John the Ripper, L0phtCrack 3, VNC, dsniff, NAT, fpipe, elsave
- **COMMANDS:** snitch.exe, user2sid.exe, STREAMFIND.EXE, various utilities

Installed programs (Program Files):
- **Ethereal** (packet sniffer/protocol analyzer, v0.10.6)
- **Cain v2.5** (password recovery/sniffing — referenced in Prefetch as CAIN25B45.EXE and Desktop shortcut)
- **Network Stumbler** (wireless network discovery — shortcut on Desktop)
- **Look@LAN** (network monitoring)
- **Anonymizer Toolbar** (privacy/anonymization)
- **123 WASP** (screen capture)
- **Agent** (Usenet newsreader)
- **mIRC** (IRC client)

## Evidence Tying Computer to Suspect

1. **RegisteredOwner:** The Windows XP installation is registered to **Greg Schardt**, directly tying the system to the suspect.
2. **User profile "Mr. Evil":** The only user account matches Schardt's known alias.
3. **Outlook Express newsgroup subscriptions** under Mr. Evil's profile include: alt.2600, alt.2600.cardz, alt.2600.codez, alt.2600.crackz, alt.2600.hackerz, alt.2600.phreakz, alt.binaries.hacking.beginner, alt.binaries.hacking.computers, alt.binaries.hacking.utilities, alt.binaries.hacking.websites, alt.hacking, alt.dss.hack — all hacking-related newsgroups.
4. **Wardriving evidence:** Network Stumbler installed; cookie for www.netstumbler.com; cached page referencing "wardriving"; consistent with the MO of parking near wireless access points.
5. An **"interception"** file (inode 12264) exists on Mr. Evil's Desktop, suggesting data interception activity.

---

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP** (version 5.1, build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** Yes, there are viruses on the computer. ClamAV detected **4 malicious files**: **Win.Trojan.Lsadump-1** (lsadump2.exe), **Win.Exploit.WinNT-3** (GetAdmin.exe), **Win.Trojan.Sehole-1** (SECHOLE.EXE), and **Win.Trojan.Netbus-2** (NetBus170.zip). All are located in the `My Documents/EXPLOITATION/NT/` directory, which contains an organized collection of hacking and exploitation tools.