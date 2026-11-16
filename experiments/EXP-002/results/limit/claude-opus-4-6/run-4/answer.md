I now have all the evidence needed. Here is the final report.

---

# Forensic Investigation Report — NIST Hacking Case

## Case ID: nist-hacking-case-av

**Evidence**: Dell Latitude CPi notebook computer (serial # VLQLW), EnCase image `4Dell_Latitude_CPi.E01`/`.E02`  
**Image**: Single NTFS partition (sectors 63–9,510,479), ~4.6 GB

---

## System Identification

The Windows registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`) reveals:

| Field | Value |
|---|---|
| **ProductName** | Microsoft Windows XP |
| **CurrentVersion** | 5.1 |
| **CurrentBuildNumber** | 2600 |
| **RegisteredOwner** | Greg Schardt |
| **RegisteredOrganization** | N/A |
| **SystemRoot** | C:\WINDOWS |
| **ProductId** | 55274-640-0147306-23684 |
| **InstallDate** | 1092955707 (2004-08-19 UTC) |

The primary user profile on the system is **"Mr. Evil"** (`Documents and Settings/Mr. Evil/`), which matches the suspect's known online alias.

---

## Hacking Software and Evidence of Use

### Installed Programs (Program Files)

- **Ethereal 0.10.6** — Network packet capture and analysis tool (predecessor to Wireshark). Installed in `Program Files/Ethereal/`. Start Menu shortcuts present. Prefetch file `ETHEREAL.EXE-1C148EEF.pf` confirms execution.
- **Look@LAN** — Network discovery and monitoring tool. Installed in `Program Files/Look@LAN/`. Prefetch files `LOOKATLAN.EXE-1F991DD9.pf` and `LOOKATHOST.EXE-34BB6F8B.pf` confirm execution.
- **Anonymizer** — Internet anonymity toolbar. Installed in `Program Files/Anonymizer/`.
- **mIRC 6.12** — IRC client commonly used in hacker communities. Prefetch `MIRC.EXE-0661EC22.pf` confirms execution.
- **CuteFTP** — FTP client (GlobalSCAPE). Prefetch `CUTE3032.EXE-1F409A25.pf` confirms execution.
- **WinPcap 3.01a** — Low-level packet capture library (prerequisite for Ethereal/sniffing tools). Prefetch `WINPCAP_3_01_A.EXE-1E3EDEDC.pf` confirms installation/execution.

### Executed Hacking Tools (Prefetch Evidence)

- **Cain & Abel** (`CAIN25B45.EXE-056F3A6E.pf`) — Password recovery, sniffing, and ARP poisoning tool. Prefetch confirms it was executed.
- **Network Stumbler** (`NETSTUMBLER.EXE-0BFEE568.pf`) — Wireless network discovery/wardriving tool. Prefetch confirms execution. Installer prefetch also present (`NETSTUMBLERINSTALLER_0_4_0.EX-0BD9920C.pf`).
- **whois.exe** (`WHOIS.EXE-38443FF6.pf`, `WHOIS.EXE-3AFF2064.pf`) — Domain reconnaissance tool. Desktop shortcut found at `Documents and Settings/Mr. Evil/Desktop/Tools/Shortcut to whois.lnk`.
- **Telnet** (`TELNET.EXE-24182D40.pf`) — Remote connection utility.

### Hacking Tool Collections (My Documents)

The `My Documents` directory is organized into attack-methodology categories:

- **FOOTPRINTING/NT/** — NmapNT (port scanner with full source code), NSTPro2, SuperScan, spade114.exe
- **ENUMERATION/NT/** — Cerberus Internet Scanner (scan reports targeting 172.16.0.2), enum (Windows enumeration tool with source), ogre, NBTscan
- **EXPLOITATION/NT/** — Brutus (password brute-forcer, includes NetBus.bad), Pwdump3 (SAM password hash dumper)
- **EXPLOITATION/Unix/** — dsniff 2.3 (network sniffing/spoofing suite)
- **COMMANDS/** — snitch.exe, user2sid.exe, STREAMFIND.EXE, SRVBOOT.BAT, USERLIST.TXT
- **ARCHIVE/** — Arj archiver tools

### Additional Hacking-Related Evidence

- **alt.hacking newsgroup**: Outlook Express database `alt.hacking.dbx` found in the Mr. Evil profile, showing the user subscribed to the alt.hacking Usenet group.
- **Wardriving content**: Internet cache contains a file named `wardriving[1]`, consistent with wireless network discovery activity.
- **Network connections to "Andrews-1"**: The `NetHood` folder shows mapped drives to a computer named "Andrews-1" (`andrews (c) on Andrews-1`, `CD Drive (F) on Andrews-1`).
- **Enumeration scan reports**: Cerberus scan results targeting IP 172.16.0.2 found in `My Documents/ENUMERATION/NT/Cerberus Internet Scanner/files/Reports/`.

---

## Anti-Virus Scan Results

ClamAV was run against the evidence directory (`/evidence/nist-hacking-case`). Results:

```
/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01: OK
/evidence/nist-hacking-case/4Dell_Latitude_CPi.E02: OK
```

**0 detections.** However, ClamAV scanned the E01/E02 container files as single opaque files — it does not decompress or mount disk images to scan the files within them. This means individual files inside the disk image were **not** individually scanned for virus signatures. The "OK" result applies only to the container, not to the thousands of files within the filesystem.

While no traditional viruses were detected, the system contains numerous hacking tools (Cain & Abel, Brutus, NetBus references, Pwdump3, dsniff, etc.) that many antivirus products would flag as hack tools or potentially unwanted programs (PUPs).

---

## Tying the Computer to the Suspect

Multiple pieces of evidence link this computer to Greg Schardt:

1. **Registered Owner**: The Windows registry `RegisteredOwner` value is explicitly "Greg Schardt".
2. **User Profile "Mr. Evil"**: The sole active user profile matches Schardt's known online alias.
3. **Hacking activity consistent with suspect profile**: Wardriving tools (Network Stumbler), wireless packet capture (Ethereal + WinPcap), credential interception tools (Cain & Abel, dsniff), and the Anonymizer privacy tool are all consistent with the described behavior of intercepting internet traffic at wireless hotspots.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** ClamAV was run on the evidence and reported **no viruses detected** (0 detections). However, this result has a significant caveat: ClamAV scanned only the E01/E02 container files as opaque blobs — it did not decompress the disk image to scan individual files within the filesystem. The system does contain numerous hacking tools (Cain & Abel, Brutus, Pwdump3, dsniff, NetBus references, etc.) that are commonly flagged as hack tools or potentially unwanted programs by antivirus engines, but these were not individually scanned by ClamAV in this analysis.