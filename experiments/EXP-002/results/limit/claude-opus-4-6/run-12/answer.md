I now have enough evidence to compile the final report.

---

# Digital Forensic Investigation Report
## NIST Hacking Case — Dell Latitude CPi (S/N VLQLW)

### Evidence Analyzed
- **Image**: `/evidence/nist-hacking-case/4Dell_Latitude_CPi.E01` (E01 format, ~640 MB)
- **Partition**: NTFS partition at sector offset 63, spanning ~4.87 GB

---

### System Identification

The system was running **Microsoft Windows XP** (Build 2600, version 5.1, no service pack). It was installed on **2004-08-19** (Unix timestamp 1092955707 from registry `InstallDate`). The system root was `C:\WINDOWS`.

**Registered Owner**: **Greg Schardt** (RegisteredOrganization: N/A, ProductId: 55274-640-0147306-23684)

The primary user profile on the system is **"Mr. Evil"** (`Documents and Settings/Mr. Evil`), confirming the suspect's known online alias.

---

### Hacking Software Inventory

The disk contains an extensive, organized collection of hacking tools arranged in attack-methodology directories under `My Documents/`:

**EXPLOITATION tools:**
- **NetBus 1.70** (Trojan/RAT — `NetBus170.zip`, SHA-256: `8b0563e23f4d16dec5690ab5d13db89470b8982e25ec8fd12cba22eccb7916f4`)
- **Brutus** (brute-force password cracker, with a NetBus `.bad` config targeting port 12345)
- **John the Ripper** (password cracker, both NT and Unix versions)
- **L0phtCrack 3.01** (`lc3setup01.exe`)
- **Pwdump** (versions 1–3, Windows password hash dumping)
- **lsadump2** (LSA secret dumper)
- **GetAdmin** (privilege escalation exploit)
- **SecHole** (security hole exploit)
- **SMBGrind** (SMB password grinding/cracking)
- **Netcat** (network utility/"Swiss Army knife")
- **fpipe** (port redirector)
- **dsniff 2.3** (network sniffing/password interception)
- **VNC/WinVNC** (remote desktop, multiple platforms)

**ENUMERATION tools:**
- **Cerberus Internet Scanner**
- **enum** (Windows enumeration tool)
- **Ogre** (enumeration tool)

**FOOTPRINTING tools:**
- **Nmap NT** (network port scanner, with full source code)
- **SuperScan**
- **NSTPro2**
- **Spade 1.14** (DNS lookup tool)

**COMMANDS tools:**
- **snitch.exe**, **user2sid.exe**, **STREAMFIND.EXE** (system reconnaissance utilities)

**Installed programs (from Uninstall registry):**
- **Cain & Abel v2.5 beta45** (password recovery/sniffing tool)
- **Ethereal** (network packet analyzer, v0.10.6)
- **Network Stumbler** (wireless network detection — consistent with wardriving)
- **Look@LAN** (network scanner)
- **Anonymizer** (privacy/anonymization toolbar)
- **mIRC** (IRC client, used for communication)
- **WinPcap** (packet capture library, required by multiple tools)
- **CuteFTP** / **CuteHTML**
- **Forte Agent** (newsreader)
- **123 Write All Stored Passwords** (password recovery tool)

**Prefetch evidence of execution** confirms these tools were actively used:
- `CAIN25B45.EXE`, `ETHEREAL.EXE`, `NETSTUMBLER.EXE`, `MIRC.EXE`, `LOOKATLAN.EXE`, `LOOKATHOST.EXE`, `WHOIS.EXE`, `PING.EXE`, `TELNET.EXE`

**Outlook Express data** includes a subscription to the newsgroup **`alt.hacking`** (inode 11516), further tying the user to hacking activity.

---

### Anti-Virus Scan Results

ClamAV was run against the evidence files (`/evidence/nist-hacking-case/`). Both `4Dell_Latitude_CPi.E01` and `4Dell_Latitude_CPi.E02` returned **"OK"** at the container level. However, **ClamAV cannot open E01 disk images**, so individual files within the image were not scanned. The tool's own output states: *"clamscan read 4Dell_Latitude_CPi.E01, 4Dell_Latitude_CPi.E02 as one file each: it does not open a disk image, so the files inside were not scanned. This does not show that the files in the image are clean."*

Based on file analysis, the disk contains **NetBus 1.70**, which is universally classified as a **Trojan horse / Remote Access Trojan (RAT)** by antivirus engines (e.g., ClamAV signature: `Win.Trojan.Netbus`). Additionally, many of the other tools present (Cain & Abel, Brutus, Pwdump, lsadump2, GetAdmin, SecHole, SMBGrind) are routinely detected as **HackTools** or **Potentially Unwanted Applications (PUA)** by commercial antivirus products. No traditional self-replicating viruses (worms) were identified, but Trojan-class malware (NetBus) is present.

---

### Tying the Computer to the Suspect

Multiple evidence points tie this computer to **Greg Schardt**:
1. **Registered Owner**: The Windows XP installation is registered to "**Greg Schardt**" (SOFTWARE hive, `RegisteredOwner` value).
2. **User Profile**: The sole active user profile is named "**Mr. Evil**", matching Schardt's known online alias.
3. **Wardriving equipment**: The presence of **Network Stumbler** (installed and executed per Prefetch), combined with the physical evidence of a wireless PCMCIA card and homemade 802.11b antenna found with the laptop, is consistent with the reported wardriving activity attributed to Schardt.
4. **alt.hacking newsgroup**: Subscription to `alt.hacking` in Outlook Express aligns with the suspect's known hacking interests.

---

## Case Questions

**Case Q1:** The computer was running **Microsoft Windows XP** (version 5.1, Build 2600, no service pack installed), as identified from the SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion`.

**Case Q2:** The registered owner is **Greg Schardt**, as recorded in the SOFTWARE registry hive value `RegisteredOwner` under `Microsoft\Windows NT\CurrentVersion`.

**Case Q3:** ClamAV was run on the evidence (`/evidence/nist-hacking-case/`) and reported no detections on the E01/E02 container files, but ClamAV cannot scan inside E01 disk images so individual files were not checked. However, analysis of the file listing reveals that the disk contains **NetBus 1.70** (`My Documents/EXPLOITATION/NT/netbus/NetBus170.zip`), which is a **Trojan horse** classified as malware by virtually all antivirus engines. Additionally, numerous hacking tools are present (Cain & Abel, Brutus, Pwdump, lsadump2, GetAdmin, SecHole, John the Ripper, L0phtCrack, etc.) that would be flagged as **HackTools/PUA** by most antivirus products. No traditional self-replicating viruses were identified, but Trojan-class malware is present on the system.