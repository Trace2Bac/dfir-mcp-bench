I now have all the evidence needed. Let me compile the final report.

---

# Digital Forensic Investigation Report
## NIST Hacking Case — Dell Latitude CPi (Serial # VLQLW)

### Evidence Summary

**Evidence Item:** EnCase image `4Dell_Latitude_CPi.E01` / `.E02` (~640 MB)  
**Partition Layout:** Single NTFS partition (sectors 63–9,510,479)  
**Total Files Indexed:** 12,545

---

### System Identification

The Windows registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`) provides the following system details:

| Field | Value |
|---|---|
| **ProductName** | Microsoft Windows XP |
| **CurrentVersion** | 5.1 |
| **CurrentBuildNumber** | 2600 |
| **BuildLab** | 2600.xpclient.010817-1148 |
| **SystemRoot** | C:\WINDOWS |
| **ProductId** | 55274-640-0147306-23684 |
| **InstallDate** | 1092955707 (epoch → 2004-08-19) |
| **RegisteredOwner** | Greg Schardt |
| **RegisteredOrganization** | N/A |

No CSDVersion value was found, indicating Windows XP RTM (no Service Pack installed).

The user profile on the system is **"Mr. Evil"** (found under `Documents and Settings/Mr. Evil`), consistent with the suspect's known online alias.

---

### Installed Software (from Uninstall registry key)

The following notable programs were installed, many of which are hacking, network reconnaissance, or anonymity tools:

- **Cain & Abel v2.5 beta45** — password cracking and network sniffing tool
- **Ethereal** — network packet analyzer/sniffer
- **Network Stumbler** — wireless network discovery tool (wardriving)
- **Look@LAN 1.0** — network scanning tool
- **WinPcap** — packet capture library (required by Ethereal/sniffers)
- **Anonymizer** — web anonymization/privacy toolbar
- **123 Write All Stored Passwords** — password recovery tool
- **mIRC** — IRC client
- **CuteFTP** — FTP client
- **Forte Agent** — Usenet/newsgroup reader

### Hacking Tools Collection (My Documents)

The `My Documents` folder contains a comprehensive, well-organized hacking toolkit in categorized directories:

- **EXPLOITATION/NT/** — Brutus (password brute-forcer with NetBus attack definition), NetBus (remote access trojan), Netcat, Pwdump (password hash dumper), John the Ripper, L0phtCrack, lsadump2, GetAdmin, SecHole, SMBGrind, VNC, fpipe, NAT, dsniff
- **ENUMERATION/NT/** — Cerberus Internet Scanner, enum, ogre
- **FOOTPRINTING/NT/** — Nmap (network scanner), NSTPro2, SuperScan, spade114
- **COMMANDS/** — snitch.exe, user2sid.exe, USERLIST, STREAMFIND
- **ARCHIVE/** — Arj archiving tools

### Program Execution Evidence (Prefetch)

Prefetch files confirm the following hacking tools were actually **executed** on the system:

- `CAIN25B45.EXE` — Cain & Abel password cracker
- `NETSTUMBLER.EXE` — wireless war driving tool
- `ETHEREAL.EXE` — packet sniffer
- `LOOKATLAN.EXE` / `LOOKATHOST.EXE` — network scanner
- `MIRC.EXE` — IRC client
- `WHOIS.EXE` — domain lookup tool
- `TELNET.EXE` — remote access
- `PING.EXE` — network utility
- `WINPCAP_3_01_A.EXE` — packet capture driver installer

### Newsgroup Activity

An Outlook Express mailbox file `alt.hacking.dbx` was found, indicating the user subscribed to the **alt.hacking** newsgroup.

---

### Anti-Virus Scan Results

**ClamAV** was run against the evidence directory (`/evidence/nist-hacking-case`). Results:

```
/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01: OK
/evidence/nist-hacking-case/4Dell_Latitude_CPi.E02: OK
```

**Important limitation:** ClamAV scanned the E01/E02 container files as single objects — it **cannot** open an EnCase disk image and scan the individual files within it. The tool itself reported: *"clamscan read 4Dell_Latitude_CPi.E01 as one file each: it does not open a disk image, so the files inside were not scanned. This does not show that the files in the image are clean."*

As a result, no traditional viruses were detected by ClamAV. However, the hacking tools present on the system (NetBus trojan, Cain & Abel, Brutus, etc.) would likely be flagged as **Potentially Unwanted Programs (PUPs)** or **hack tools** by antivirus products capable of scanning inside the image. NetBus in particular is classified as a trojan/remote administration tool by most AV vendors.

---

### Tying the Computer to the Suspect

Multiple evidence items connect this computer to Greg Schardt:

1. **Registered Owner** in the Windows registry is explicitly **"Greg Schardt"**
2. The user profile name is **"Mr. Evil"**, matching Schardt's known online alias
3. The system contains extensive hacking tools consistent with the described wireless interception activities (Network Stumbler for finding WAPs, Ethereal/WinPcap for sniffing traffic, Cain & Abel for cracking passwords)
4. A subscription to **alt.hacking** newsgroup was found

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (version 5.1, build 2600, no Service Pack installed). The build label is `2600.xpclient.010817-1148`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion\RegisteredOwner`.

**Case Q3:** ClamAV was run on the evidence but **could not scan inside the E01 disk image** — it only scanned the container files and reported "OK" (0 detections). This does **not** confirm the files inside are clean. Manual analysis of the filesystem reveals numerous hacking tools (NetBus trojan, Cain & Abel, Brutus, Netcat, Pwdump, lsadump2, etc.) that most antivirus products would flag as hack tools or potentially unwanted programs. No traditional self-replicating viruses were confirmed, but the system is laden with offensive security/hacking software.