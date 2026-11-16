Now I have all the information I need to complete my investigation. Let me compile the final forensic report.

---

# NIST HACKING CASE - FORENSIC INVESTIGATION REPORT
## Case ID: nist-hacking-case-av
## Investigation Date: 2026-11-16

## Executive Summary

This digital forensic investigation examined a Dell CPi notebook computer (serial # VLQLW) abandoned on 09/20/04 with a wireless PCMCIA card and antenna. The investigation successfully identified hacking software and evidence of network attack activities. The registered owner of the system is Greg Schardt, who uses the online alias "Mr. Evil," matching the suspect profile provided.

---

## Key Findings

### 1. System Identification

The forensic analysis confirms this is a **Windows XP Professional** system (Build 2600.xpclient.010817-1148, ProductName: Microsoft Windows XP) with the registered owner identified as **Greg Schardt**.

A user account "Mr. Evil" exists on the system, confirming the suspect's online nickname usage on this device.

### 2. Hacking Software Identified

The investigation discovered an extensive collection of hacking and network penetration tools installed and configured on this system:

#### **Network Sniffing & Packet Capture Tools**
- **Ethereal v0.10.6** - Full network protocol analyzer installation with plugins and SNMP MIBs
- **WinPCAP 3.01** - Windows packet capture library (execution evidence in prefetch)
- **dsniff 2.3** - Unix-based packet sniffing tools with documentation on "Switched networks lose security advantage due packet tool"
- **Look@LAN** - Network discovery tool with audio files (ready.wav indicates execution)

#### **Password Attack Tools**
- **Brutus** - Remote password cracking tool with NetBus configuration files
- **Pwdump3** - Windows password dumping utility
- **Cain & Abel v2.5b45** - Multi-purpose password recovery and network sniffing tool (execution evidence in prefetch)

#### **Network Reconnaissance Tools**
- **Nmap (NmapNT)** - Network mapping utility with full source code
- **Cerberus Internet Scanner** - Network scanner with saved HTML reports from IP address 172.16.0.2
- **enum** - Network enumeration tool
- **ogre** - NT network enumeration tool
- **SuperScan** - Network vulnerability scanner
- **Spade 1.14** - IP address analysis tool
- **NSTPro2** - Network security toolkit

#### **Communication & Anonymization Tools**
- **mIRC** - Internet Relay Chat client (likely for coordinating attacks)
- **Anonymizer** - Anonymous web browsing tool to hide online activities

### 3. Evidence of Malicious Usage

**My Documents Organization Structure:**
The suspect organized hacking tools into tactical categories:
- `ARCHIVE/` - Archive utilities
- `COMMANDS/` - Offensive command-line tools (snitch.exe, user2sid.exe)
- `ENUMERATION/` - Network enumeration tools (Cerberus, enum, ogre, SuperScan)
- `EXPLOITATION/` - Attack tools (Brutus, Pwdump, dsniff)
- `FOOTPRINTING/` - Reconnaissance tools (Nmap, Spade)
- `NOVELL/` - Novell network attack tools

**War Driving Evidence:**
- A file named `wardriving[1]` found in Mr. Evil's Temporary Internet Files cache confirms online research into war driving techniques (wireless access point targeting).

**Network Targeting:**
- Network connection entry: `Documents and Settings/Mr. Evil/NetHood/andrews (c) on Andrews-1/target.lnk`
- This indicates targeting of a specific network host or system named "andrews"

**Execution Evidence:**
Prefetch files show multiple hacking tools were executed:
- CAIN25B45.EXE (Cain & Abel)
- WINPCAP_3_01_A.EXE (Packet capture library)
- TELNET.EXE (Command-line network access)

### 4. Antivirus Scan Results

ClamAV antivirus scanning was performed on the complete evidence:
- **4Dell_Latitude_CPi.E01**: OK (No viruses detected)
- **4Dell_Latitude_CPi.E02**: OK (No viruses detected)

The system contained no detected malware, though this does not indicate the system was secure—it simply means known virus signatures were not present.

---

## Case Questions

**Case Q1: What operating system was used on the computer?**
Microsoft Windows XP (Product Name: Microsoft Windows XP, Version: 5.1, Build: 2600)

**Case Q2: Who is the registered owner?**
Greg Schardt (confirmed via registry key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner)

**Case Q3: Perform a Anti-Virus check. Are there any viruses on the computer?**
ClamAV antivirus scan results: No viruses detected on either disk image segment (both E01 and E02 returned OK status). However, this does not indicate the system was secure or used only for legitimate purposes; the extensive collection of hacking tools indicates this computer was actively used for network reconnaissance, password attacks, and traffic interception activities consistent with the briefing description of intercepting internet traffic at wireless hotspots.

---

## Conclusion

This computer was actively used by Greg Schardt (alias "Mr. Evil") as a platform for conducting network-based attacks. The organized collection of packet sniffing tools (Ethereal, dsniff, WinPCAP), password cracking utilities (Brutus, Pwdump, Cain & Abel), and network reconnaissance tools (Nmap, Cerberus, SuperScan) combined with evidence of war driving research strongly supports the allegations that this device was used for:

1. **Network Reconnaissance** - Mapping and identifying target networks
2. **Traffic Interception** - Using packet sniffing tools to capture network traffic
3. **Credential Attacks** - Attempting to extract passwords and attack credentials
4. **Wireless Targeting** - War driving to locate and attack wireless access points at hotspots

The discovery of a "target.lnk" file and organized exploitation documentation supports the conclusion that this computer was deliberately configured as a hacking platform for credential theft and network infiltration activities.