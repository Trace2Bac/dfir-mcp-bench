All ClamAV scans returned clean. I have all the evidence needed to answer the three questions. Here is the final report.

---

# Forensic Investigation Report — NIST Hacking Case

## Evidence Examined

- **Image:** `4Dell_Latitude_CPi.E01` / `.E02` (EnCase format, ~640 MB)
- **Partition:** NTFS at sector offset 63 (9,510,417 sectors)
- **Filesystem:** 12,545 file entries indexed

## Key Findings

### Operating System
The registry hive at `Microsoft\Windows NT\CurrentVersion` confirms the system ran **Microsoft Windows XP**, version 5.1, build 2600. The system root was `C:\WINDOWS`.

### Registered Owner
The `RegisteredOwner` value is **Greg Schardt**. The `RegisteredOrganization` is "N/A". The user profile on the machine is named **"Mr. Evil"**, which matches the suspect's known online alias.

### Hacking Software Present
The filesystem contains extensive hacking tools organized methodically under `My Documents`:

- **FOOTPRINTING:** Nmap (nmapNT), SuperScan, NSTPro2, spade114
- **ENUMERATION:** ogre (NT enumeration tool)
- **EXPLOITATION:** Brutus (password brute-forcer), NetBus (remote access trojan), Pwdump (password dumper), dsniff (network sniffer)
- **Installed Programs:** Ethereal (network packet analyzer), Cain (password recovery, seen in Prefetch as `CAIN25B45.EXE`), Anonymizer toolbar
- **Communications:** Outlook Express mailbox for the **alt.hacking** newsgroup (`alt.hacking.dbx`)
- **Internet cache** includes pages related to "wardriving"

### Anti-Virus Scan
ClamAV was run against both E01 and E02 image segments and the entire evidence directory. **No viruses were detected** (0 detections across all scans).

## Case Questions

**Case Q1:** The operating system is **Microsoft Windows XP** (Version 5.1, Build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`. The active user profile on the machine is named "Mr. Evil," the suspect's known alias.

**Case Q3:** ClamAV anti-virus scan of both disk image segments (E01 and E02) returned **no viruses detected** (all files reported "OK" with 0 detections). While no signature-based malware was found, the disk contains numerous hacking and exploitation tools (Brutus, NetBus, Cain, Pwdump, dsniff, Nmap, Ethereal, etc.) that are dual-use penetration testing / attack software.