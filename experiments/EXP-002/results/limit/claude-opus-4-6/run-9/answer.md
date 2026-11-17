I now have all the information needed. Let me compile the final report.

---

# Digital Forensic Investigation Report

**Case ID:** nist-hacking-case-av  
**Evidence:** Dell Latitude CPi notebook computer (Serial # VLQLW)  
**Image:** 4Dell_Latitude_CPi.E01 / .E02  
**Examiner Date:** 2026-11-16

---

## Summary of Findings

The abandoned Dell CPi notebook was running Windows XP and was registered to **Greg Schardt** — the suspect who also goes by the online alias "Mr. Evil" (confirmed by the Windows user profile name). The system contained an extensive collection of organized hacking tools spanning footprinting, enumeration, exploitation, and network sniffing categories, consistent with use for penetration testing or malicious hacking.

## Operating System

**Microsoft Windows XP** (version 5.1, Build 2600), installed on 2004-08-19 (InstallDate epoch: 1092955707). The system root was `C:\WINDOWS`. The partition is NTFS starting at sector 63.

Source: SOFTWARE registry hive, `Microsoft\Windows NT\CurrentVersion`

## Registered Owner

**Greg Schardt**, with registered organization "N/A" and Product ID `55274-640-0147306-23684`.

Source: SOFTWARE registry hive, `Microsoft\Windows NT\CurrentVersion\RegisteredOwner`

## Tying the Computer to the Suspect

- The Windows registered owner is **Greg Schardt**, matching the suspect's name.
- The primary Windows user profile is `Documents and Settings/Mr. Evil/`, matching the suspect's known alias.
- Outlook Express contained a newsgroup mailbox for **alt.hacking** (`alt.hacking.dbx`), consistent with the suspect's known hacking interests.
- Internet cache files reference **wardriving** content, consistent with the suspect's reported activity of parking near wireless access points to intercept traffic.

## Hacking Software Found

The computer contained a well-organized toolkit arranged by attack methodology:

**Installed Programs (Program Files):**
- **Cain & Abel** (`Program Files/Cain/`) — Password sniffing and cracking tool with credential capture lists for FTP, HTTP, HTTPS, SMB, POP3, SMTP, Telnet, VNC, SSH, ICQ, RADIUS, and more. Prefetch confirms execution (`CAIN25B45.EXE`).
- **Ethereal** (`Program Files/Ethereal/`) — Network packet sniffer/analyzer (predecessor to Wireshark). Prefetch confirms execution and installation.
- **Anonymizer** (`Program Files/Anonymizer/`) — Internet anonymity tool.
- **Look@LAN** (`Program Files/Look@LAN/`) — Network scanning/monitoring tool. Prefetch confirms execution (`LOOKATLAN.EXE`, `LOOKATHOST.EXE`).
- **NetStumbler** — Wireless network scanner/wardriving tool. Prefetch confirms execution and installation.
- **mIRC** — IRC client commonly used in hacking communities. Prefetch confirms execution.
- **WinPcap** — Packet capture driver required by sniffing tools. Prefetch confirms installation.

**Exploitation Tools (My Documents/EXPLOITATION/):**
- **Brutus** — Password brute-force cracker (with NetBus.bad flag file)
- **NetBus** (`NetBus170.zip`) — Known remote access trojan/backdoor
- **Netcat** (`netcat11nt.zip`) — "Swiss army knife" network tool
- **Pwdump** (versions 1-3) — Windows password hash dumper
- **lsadump2** — LSA secrets dumper (compiled executable present)
- **L0phtCrack** (`lc3setup01.exe`) — Password cracking tool
- **John the Ripper** (NT and Unix versions) — Password cracker
- **GetAdmin** — Privilege escalation exploit
- **sechole** — Security hole exploitation tool
- **SMBGrind Crack** — SMB password cracker with wordlists
- **VNC/WinVNC** — Remote desktop control tools
- **dsniff** — Network traffic sniffer suite
- **fpipe** — Port forwarding/redirection tool
- **NAT** — NetBIOS auditing tool
- **bsniff** — Network sniffer

**Footprinting Tools (My Documents/FOOTPRINTING/):**
- **NmapNT** — Port scanner (with full source code)
- **SuperScan** — TCP port scanner
- **NSTPro2** — Network scanning tool
- **SPADE** — Network analysis tool

**Enumeration Tools (My Documents/ENUMERATION/):**
- **Ogre** — Network enumeration tool

**Other Evidence of Hacking Activity:**
- Prefetch evidence shows execution of: CMD.EXE, PING.EXE, WHOIS.EXE, TELNET.EXE (network reconnaissance commands)
- `CuteHTML`/`CuteFTP` tools also executed

## Anti-Virus Scan Results

**ClamAV** was run against the evidence directory (`/evidence/nist-hacking-case`). Results:

```
/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01: OK
/evidence/nist-hacking-case/4Dell_Latitude_CPi.E02: OK
```

**Detections: 0**

**Important caveat:** ClamAV scanned the E01/E02 container files as single files — it cannot decompress or mount EnCase disk images to scan the individual files within them. This means no individual file on the disk was actually virus-scanned. The "OK" result reflects only that the E01 container itself does not match a ClamAV signature, **not** that the files inside the image are virus-free.

Notable: The disk contains **NetBus** (a known remote access trojan/backdoor), various exploit tools, and password crackers that many antivirus engines would flag as malicious or potentially unwanted programs if scanned individually.

---

## Case Questions

**Case Q1:** The operating system was **Microsoft Windows XP** (version 5.1, Build 2600), as identified in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion\ProductName`.

**Case Q2:** The registered owner is **Greg Schardt**, as identified in the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion\RegisteredOwner`.

**Case Q3:** ClamAV was run on the evidence and reported **0 detections** (both E01 and E02 files returned "OK"). However, ClamAV could not scan inside the EnCase disk image — it only scanned the container files themselves. The disk image contains hacking tools such as NetBus (a known trojan/backdoor), Cain & Abel, Brutus, Pwdump, and numerous other exploitation tools that many antivirus products would flag as malware or potentially unwanted programs. Without the ability to scan the extracted individual files, a definitive virus determination from ClamAV is not possible through this method.