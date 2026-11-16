I have all the evidence needed. Here is the final report.

---

# Digital Forensic Investigation Report — NIST Hacking Case

## Case Summary

A Dell CPi notebook computer (serial # VLQLW) was found abandoned with a wireless PCMCIA card and a homemade 802.11b antenna. The investigation aimed to determine the operating system, registered owner, and presence of malware on the device, and to tie the computer to suspect Greg Schardt (a.k.a. "Mr. Evil").

## Evidence Analyzed

- **Disk Image**: `4Dell_Latitude_CPi.E01` / `.E02` (EnCase format, ~640 MB)
- **Filesystem**: NTFS partition at sector offset 63 (sectors 63–9,510,479)
- **Total files indexed**: 12,545

## Key Findings

### Operating System
The Windows registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`) confirms:
- **Product Name**: Microsoft Windows XP
- **Version**: 5.1, Build 2600
- **System Root**: C:\WINDOWS
- **Install Date**: Unix epoch 1092955707 (August 19, 2004)

### Registered Owner
The registry value `RegisteredOwner` under the same key reads: **Greg Schardt**. The `RegisteredOrganization` is set to "N/A". This directly ties the computer to the suspect.

Additionally, the Windows user profile on the machine is named **"Mr. Evil"** (the suspect's known alias), with files found under `Documents and Settings/Mr. Evil/`.

### Anti-Virus Scan (ClamAV)
ClamAV was run against both image segments:
- `4Dell_Latitude_CPi.E01`: **OK** (no detection)
- `4Dell_Latitude_CPi.E02`: **OK** (no detection)

**Result: No viruses were detected by ClamAV.**

### Hacking Tools and Evidence (Additional Context)
The filesystem contains extensive hacking tools organized by attack methodology:
- **FOOTPRINTING**: NmapNT (network scanner), SuperScan (port scanner), NSTPro, Spade
- **ENUMERATION**: Ogre (NT enumeration tool)
- **EXPLOITATION**: Brutus (password brute-forcer), NetBus (remote access trojan), Pwdump3 (password hash dumper), dsniff (network sniffing)
- **Installed software**: Ethereal (packet capture/analysis), Cain (password cracking — confirmed via Prefetch: `CAIN25B45.EXE`), Anonymizer Toolbar (privacy/anonymization)
- **Outlook Express data**: Subscribed to `alt.hacking` newsgroup
- **Internet history**: References to "wardriving" content

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as confirmed by the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`. The active user profile on the system is named "Mr. Evil," the suspect's known alias.

**Case Q3:** ClamAV anti-virus scan of both disk image segments (E01 and E02) returned **no virus detections** — both files reported as "OK." While no traditional viruses were found, the disk contains numerous hacking tools (Cain, Brutus, NetBus, Nmap, Pwdump3, dsniff, Ethereal, Anonymizer) that are categorized as dual-use/hacking utilities rather than conventional malware.