Based on my forensic investigation, I have gathered sufficient evidence to answer all the case questions. Let me compile my final report.

---

# DIGITAL FORENSIC EXAMINATION REPORT
## NIST Hacking Case: Dell Latitude CPi (Serial #VLQLW)

### CASE SUMMARY
On September 20, 2004, an abandoned Dell Latitude CPi notebook computer was recovered with wireless networking equipment. The investigation determined that the computer's registered owner is **Greg Schardt**, also known as "Mr. Evil," and contained extensive evidence of hacking tools and malicious activities consistent with wireless network attacks for credential theft.

### EVIDENCE ANALYSIS

**Case Q1: Operating System**
The system was running **Microsoft Windows XP** (Windows NT 5.1), Build 2600, as confirmed by the SOFTWARE registry hive query at `Microsoft\Windows NT\CurrentVersion`. The ProductName value explicitly identified the operating system as "Microsoft Windows XP."

**Case Q2: Registered Owner**
The registered owner is **Greg Schardt**, as confirmed by the RegisteredOwner value in the SOFTWARE registry hive. This directly links the suspect to the computer. Additionally, a user account named "Mr. Evil" (the suspect's known online nickname) exists on the system at `Documents and Settings/Mr. Evil`.

**Case Q3: Anti-Virus Check and Malicious Software**
A ClamAV scan was executed on the evidence, though the direct scanning of the E01 disk image format was limited. However, comprehensive forensic analysis of the file system revealed extensive hacking software and tools:

**Packet Sniffer/Network Monitoring:**
- **Ethereal** - Installed in Program Files with full plugins (version 0.10.6), designed to capture and analyze network traffic to intercept credentials and sensitive data

**Password Recovery/Cracking Tools:**
- **CAIN (v2.5B45)** - Execution evidence found in Windows Prefetch; a sophisticated password recovery and network analysis tool
- **Brutus** - Located at `My Documents/EXPLOITATION/NT/Brutus/`; a password cracking tool with documentation and user lists
- **Pwdump3** - Located at `My Documents/EXPLOITATION/NT/Pwdump/`; tool for extracting Windows SAM password hashes
- **Look@LAN** - Network scanning tool installed in Program Files

**Network Reconnaissance Tools:**
- **dsniff 2.3** - Located at `My Documents/EXPLOITATION/Unix/dsniff 2.3/`; Unix-based packet sniffer and ARP spoofing tool
- **nmap (nmapnt)** - Located at `My Documents/FOOTPRINTING/NT/Nmapnt/`; network port scanner
- **SPADE114.exe** - Located at `My Documents/FOOTPRINTING/NT/`; network enumeration tool
- **SuperScan** - Located at `My Documents/FOOTPRINTING/NT/superscan/`
- **NSTPro2** - Located at `My Documents/FOOTPRINTING/NT/NSTPro2/`
- **Cerberus Internet Scanner** - Located at `My Documents/ENUMERATION/NT/`

**Additional Evidence:**
- **alt.hacking newsgroup** mailbox found in Outlook Express (`Documents and Settings/Mr. Evil/Local Settings/Application Data/Identities/.../alt.hacking.dbx`)
- **Wardriving-related files** cached in temporary internet files
- **Organized directory structure** with COMMANDS, ENUMERATION, EXPLOITATION, and FOOTPRINTING folders containing hacking tools

### CONNECTIONS TO CASE BRIEFING
The evidence directly supports the case briefing allegations:
1. Computer registered to suspect Greg Schardt (alias "Mr. Evil")
2. Equipped with wireless PCMCIA card compatible with 802.11b antenna found at scene
3. Software suite matches suspected activity: intercepting traffic, capturing credentials from Wireless Access Points (like T-Mobile Hotspots and Starbucks)
4. Tools present enable: password interception (Ethereal), password extraction (Pwdump3, CAIN, Brutus), and network enumeration

---

## Case Questions

Case Q1: Microsoft Windows XP (Windows NT 5.1, Build 2600)

Case Q2: Greg Schardt

Case Q3: Yes, extensive hacking tools detected. ClamAV scan of the disk image had limited direct access to internal files, but forensic file system analysis reveals the system contains multiple sophisticated hacking and network attack tools including packet sniffers (Ethereal, dsniff), password crackers (CAIN, Brutus, Pwdump3), network reconnaissance tools (nmap, SPADE, SuperScan), and evidence of engagement with hacking communities. This toolkit is consistent with attacks targeting wireless access points to intercept internet traffic and steal credentials.