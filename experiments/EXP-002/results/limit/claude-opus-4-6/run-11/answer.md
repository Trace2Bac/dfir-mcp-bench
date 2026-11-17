I now have all the evidence needed to write the final report.

---

# Digital Forensic Investigation Report

## Case: NIST Hacking Case (nist-hacking-case-av)

**Evidence**: Dell Latitude CPi notebook computer (Serial # VLQLW), EnCase image `4Dell_Latitude_CPi.E01` / `.E02`

**Image**: Single NTFS partition (sectors 63–9,510,479), approximately 4.87 GB

---

## System Identification

From the Windows registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion`):

| Field | Value |
|---|---|
| **Product Name** | Microsoft Windows XP |
| **Version** | 5.1 (Build 2600) |
| **Registered Owner** | Greg Schardt |
| **Registered Organization** | N/A |
| **Product ID** | 55274-640-0147306-23684 |
| **System Root** | C:\WINDOWS |
| **Install Date** | 2004-08-19 (Unix epoch 1092955707) |

The primary user account on the system is named **"Mr. Evil"** (located at `Documents and Settings/Mr. Evil/`), consistent with the suspect's known online alias.

---

## Anti-Virus Scan Results

ClamAV was executed against the evidence directory `/evidence/nist-hacking-case`. Results:

- `4Dell_Latitude_CPi.E01`: **OK** (0 detections)
- `4Dell_Latitude_CPi.E02`: **OK** (0 detections)

**Important caveat**: ClamAV scanned the E01/E02 container files as single blobs — it does not mount or decompress EnCase disk images to scan individual files within. Therefore, **no viruses were detected at the container level**, but individual files inside the image were not individually scanned by the AV engine. This does not conclusively prove the image is virus-free.

---

## Hacking Software and Tools Found

The computer contained an extensive collection of hacking and network intrusion tools, organized both as installed programs and as a categorized toolkit in `My Documents/`.

### Installed Programs (Program Files)

| Tool | Purpose |
|---|---|
| **Ethereal 0.10.6** | Network packet analyzer/sniffer (predecessor to Wireshark) |
| **Anonymizer Toolbar** | Anonymous web browsing to hide identity |
| **Look@LAN** | Network discovery and monitoring scanner |
| **mIRC** | IRC client (commonly used for hacker communication) |
| **WinPcap** | Low-level packet capture library (required by sniffing tools) |

### Programs Executed (from Prefetch evidence)

| Prefetch File | Tool |
|---|---|
| CAIN25B45.EXE | **Cain & Abel** — password cracking, ARP spoofing, and network sniffing |
| NETSTUMBLER.EXE | **Network Stumbler** — wireless network (802.11) scanner/wardriving tool |
| ETHEREAL.EXE | **Ethereal** — network packet sniffer |
| LOOKATLAN.EXE / LOOKATHOST.EXE | **Look@LAN** — network scanner |
| MIRC.EXE | **mIRC** — IRC client |
| CUTE3032.EXE | **CuteFTP** — FTP client (potential data exfiltration) |
| WHOIS.EXE | **Whois** — domain/IP lookup reconnaissance tool |
| TELNET.EXE | Telnet client |
| PING.EXE | Network ping utility |
| CMD.EXE | Command Prompt |

### Hacking Toolkit in My Documents (organized by attack methodology)

- **FOOTPRINTING/** — Reconnaissance tools:
  - **Nmap NT** (nmapNT) — port scanner with full source code
  - **NSTPro2** — network scanning tool
  - **spade114.exe** — Sam Spade network query tool
  - **SuperScan** — TCP port scanner

- **ENUMERATION/** — Network enumeration tools:
  - **Cerberus Internet Scanner** — vulnerability scanner (with scan reports against 172.16.0.2)
  - **enum** — Windows NT/2000 enumeration tool
  - **Ogre** — network enumeration tool
  - Various command-line tools: `user2sid.exe`, `snitch.exe`, `STREAMFIND.EXE`

- **EXPLOITATION/** — Attack tools:
  - **Brutus** — password brute-forcing tool (with NetBus trojan file)
  - **Pwdump3** — Windows password hash dumping tool
  - **dsniff 2.3** — packet sniffing and man-in-the-middle attack suite (Unix)

- **ARCHIVE/** — File compression/archiving utilities (Arj)
- **NOVELL/** — Novell network utilities

### Evidence of Hacking Activity

- **Wardriving**: Network Stumbler was installed and executed, consistent with the suspect's reported activity of parking near wireless access points. IE cache contains wardriving-related content.
- **Network Sniffing**: Ethereal, Cain & Abel, WinPcap, and dsniff all support packet capture and credential interception.
- **Hacking Community**: Outlook Express mailbox `alt.hacking.dbx` shows subscription to the `alt.hacking` newsgroup.
- **Network Reconnaissance**: Cerberus scanner reports found targeting IP 172.16.0.2.
- **Network Shares**: Mr. Evil had mapped network shares to a computer named "Andrews-1".
- **Desktop Tools shortcut**: A shortcut to `whois` on the desktop for quick reconnaissance.

---

## Tying the Computer to the Suspect

The registry value `RegisteredOwner` under `SOFTWARE\Microsoft\Windows NT\CurrentVersion` is set to **"Greg Schardt"**, directly tying the computer's Windows installation to the suspect. The sole user account on the system is named **"Mr. Evil"**, which matches the suspect's known online alias.

---

## Case Questions

**Case Q1**: The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2**: The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q3**: ClamAV was run against the evidence at `/evidence/nist-hacking-case`. It reported **0 detections** — both E01 and E02 container files scanned as "OK." However, ClamAV scanned only the EnCase container files as single objects and could not scan the individual files within the disk image. At the container level, **no viruses were detected**. The image does contain hacking tools (Cain & Abel, Brutus with NetBus, Pwdump, dsniff, etc.) that are commonly flagged by antivirus software as potentially unwanted programs or hack tools, but ClamAV did not flag the containers themselves.