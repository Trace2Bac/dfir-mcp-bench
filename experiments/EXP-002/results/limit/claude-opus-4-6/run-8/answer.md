I now have all the evidence needed. Here is the final report.

---

# Digital Forensic Investigation Report

## Case: nist-hacking-case-av
**Evidence**: Dell Latitude CPi notebook (serial # VLQLW), EnCase image `4Dell_Latitude_CPi.E01`/`.E02`
**Date**: 2026-11-16

---

## System Overview

The disk image contains a single NTFS partition (sectors 63–9,510,479) with 12,545 files indexed. The operating system installed is **Microsoft Windows XP** (Version 5.1, Build 2600, Uniprocessor Free), with the system root at `C:\WINDOWS`. The install date (from registry) is approximately 2004-08-19 (epoch 1092955707). The only user profile on the system is **"Mr. Evil"** — the known alias of the suspect.

## Registered Owner

The SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` shows:
- **RegisteredOwner**: `Greg Schardt`
- **RegisteredOrganization**: `N/A`
- **ProductId**: `55274-640-0147306-23684`

This directly ties the computer to the suspect Greg Schardt.

## Anti-Virus Scan Results

ClamAV was run against the evidence directory `/evidence/nist-hacking-case`. Results:

- `4Dell_Latitude_CPi.E01`: OK
- `4Dell_Latitude_CPi.E02`: OK
- **Detections: 0**

**Important caveat**: ClamAV scanned the E01 container files as opaque blobs — it cannot open EnCase disk images to scan individual files within the filesystem. The "OK" result means no virus signatures were detected in the raw container data, but this **does not** confirm that files inside the image are virus-free. A more thorough scan would require extracting individual files from the image first.

## Hacking Software and Evidence of Use

The system contains an extensive collection of hacking tools organized methodically:

### Installed Applications (Program Files & Start Menu)
| Tool | Purpose | Evidence of Execution (Prefetch) |
|------|---------|--------------------------------|
| **Cain & Abel v2.5** | Password recovery, sniffing, ARP poisoning | `CAIN25B45.EXE-056F3A6E.pf` |
| **Ethereal 0.10.6** | Network packet capture/analysis | `ETHEREAL.EXE-1C148EEF.pf`, `ETHEREAL-SETUP-0.10.6.EXE` |
| **Network Stumbler** | Wireless network discovery (wardriving) | `NETSTUMBLER.EXE-0BFEE568.pf` |
| **Look@LAN** | Network host/service scanner | `LOOKATLAN.EXE-1F991DD9.pf`, `LOOKATHOST.EXE-34BB6F8B.pf` |
| **Anonymizer Toolbar** | Anonymous web browsing | (installed in Program Files) |
| **mIRC 6.12** | IRC client (common for hacker communication) | `MIRC.EXE-0661EC22.pf` |
| **WinPcap 3.01a** | Packet capture driver (required by sniffing tools) | `WINPCAP_3_01_A.EXE-1E3EDEDC.pf` |

### My Documents — Hacking Toolkit (organized by attack phase)

**COMMANDS directory** — Ready-to-use attack tools:
- `nc.exe` (Netcat — network Swiss army knife)
- `nmapNT.exe` (port scanner)
- `crack.exe` (password cracker)
- `pwdump.exe`, `pwdump2.exe` (Windows password hash dumpers)
- `SAMDUMP.EXE` (SAM database dumper)
- `smbgrind.exe` (SMB brute forcer)
- `enum.exe` (Windows enumeration)
- `NAT.EXE` (NetBIOS Auditing Tool)
- `nbtdump.exe`, `nbtscan.exe` (NetBIOS scanners)
- `ELDUMP.EXE`, `ELSAVCLR.EXE`, `ELSAVE.EXE` (Event Log tools — including clearing)
- `sid2user.exe`, `user2sid.exe` (SID/user enumeration)
- `snitch.exe`, `epdump.exe`, `NETVIEWX.EXE` (network reconnaissance)
- Password/user lists: `NTpasslist.txt`, `NTuserlist.txt`, `PASSLIST.TXT`, `USERLIST.TXT`

**ENUMERATION directory**:
- Cerberus Internet Scanner (vulnerability scanner with scan reports for `172.16.0.2`)
- enum tool (with source code)
- ogre (network enumeration)

**EXPLOITATION directory**:
- Brutus (remote password cracker, with `NetBus.bad` — a trojan)
- Pwdump3 (password dumper documentation)
- dsniff 2.3 (network sniffing/MITM tool suite for Unix)

**FOOTPRINTING directory**:
- NmapNT (full source code)
- NSTPro2 (network scanner)
- SuperScan (port scanner)
- spade114.exe (email header analysis)

### Additional Evidence of Hacking Activity
- **Outlook Express**: Subscribed to `alt.hacking` newsgroup (file: `alt.hacking.dbx`)
- **Internet browsing**: Cached content related to "wardriving" found in Temporary Internet Files
- **Prefetch**: `TELNET.EXE` and `WHOIS.EXE` were executed, consistent with network reconnaissance
- **Desktop shortcuts**: `Shortcut to whois.lnk` on the "Mr. Evil" desktop

### Network Data Generated
Cerberus Internet Scanner reports were found targeting IP `172.16.0.2`, indicating active vulnerability scanning was performed from this machine.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (Version 5.1, Build 2600), as recorded in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the `RegisteredOwner` value of the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`. The user profile on the system is named "Mr. Evil," which is the known online alias of Greg Schardt.

**Case Q3:** ClamAV was run on the evidence at `/evidence/nist-hacking-case`. It reported **0 detections** (both E01 segments returned "OK"). However, ClamAV scanned the E01 container files as whole files and **cannot open disk images to scan individual files inside**. Therefore, this result does not confirm the absence of viruses within the filesystem. No traditional viruses were identified through file listing analysis, though the disk contains numerous hacking tools (Cain & Abel, Netcat, Brutus with NetBus trojan component, password crackers, network sniffers, etc.) that many anti-virus products would flag as potentially unwanted programs (PUPs) or hack tools.