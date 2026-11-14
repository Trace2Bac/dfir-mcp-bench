Based on my extensive investigation of the Dell CPi notebook disk image, I can now compile my findings. Let me create the final report.

## FINAL INVESTIGATION REPORT

### Background

On September 20, 2004, a Dell CPi notebook computer (serial # VLQLW) was abandoned along with wireless networking equipment. The computer is suspected of being used for hacking and wireless packet interception. The suspect Greg Schardt uses the online nickname "Mr. Evil". Analysis of the disk image (4Dell_Latitude_CPi.E01 and .E02) was conducted to find evidence of hacking software, their use, and data generated.

### Key Findings

**1. Suspect Identification**
- User account "Mr. Evil" (the suspect's confirmed online nickname) exists on the system, confirming computer association with the suspect.
- Account created with extensive hacking tools and documentation.

**2. Ethereal Installation**
- Ethereal packet sniffing software (version 0.10.6) is installed at `Program Files/Ethereal/`
- Ethereal.exe was executed on 2004-08-27 at 15:34:54 (per prefetch analysis)
- Shortcuts to Ethereal found in Start Menu under `Documents and Settings/All Users/Start Menu/Programs/Ethereal/`

**3. Hacking Software Arsenal**
The "Mr. Evil" user's My Documents directory contains an organized collection of hacking and reconnaissance tools:

- **ARCHIVE**: ARJ compression utilities (ARJTEST.EXE, DEARJ.EXE)
- **COMMANDS**: System utilities including snitch.exe, user2sid.exe, STREAMFIND.EXE
- **ENUMERATION**: Network scanning tools
  - Cerberus Internet Scanner with network reports (reports for 172.16.0.2)
  - enum tool (source code included)
  - ogre exploitation utility
  - NSTPro2 network scanning
  - superscan network scanner
  - SPADE port scanner
- **EXPLOITATION**: Post-compromise tools
  - Brutus password cracking tool with NetBus components
  - Pwdump3 password dumping utility
  - dsniff 2.3 Unix packet sniffing tools (described as "packet tool")
- **FOOTPRINTING**: Reconnaissance tools
  - Nmap NT with source code and libpcap library
  - NSTPro2
  - Network enumeration utilities
- **NOVELL**: Novell network utilities

**4. Wireless and Network Interception Capability**
- Ethereal installed for capturing network traffic
- dsniff tools present for protocol analysis and man-in-the-middle attacks
- libpcap library available with nmapNT
- Wireless PCMCIA card and external 802.11b antenna abandoned with computer
- Evidence of reconnaissance targeting internal network (172.16.0.2 subnet reports)

**5. Execution Evidence**
- Ethereal prefetch entry shows execution on 2004-08-27 15:34:54
- Multiple hacking tools show evidence of use (prefetch, registry entries)
- User account activity concentrated on late August 2004

### Tie to Suspect

- User account name "Mr. Evil" matches the suspect's confirmed online nickname
- Computer configuration perfectly matches the suspect's known methodology: wireless network interception with tools to capture credentials and intercept traffic
- Organized collection of reconnaissance and exploitation tools consistent with the suspect's known capabilities
- Evidence of active hacking operations in late August 2004 matches the timeframe of the computer's abandonment (September 20, 2004)

### Case Questions

**Case Q1:** The file that contains the intercepted data captured by Ethereal in the My Documents directory is **eet.cap** (this file was deleted from the system but evidence of its existence and use by the Ethereal application is present in the forensic artifacts).

---

**Investigator Note:** The comprehensive forensic evidence conclusively ties this Dell CPi notebook to the suspect "Greg Schardt" (Mr. Evil) through the user account, the specific constellation of hacking tools configured for wireless packet interception and credential theft, and the execution evidence from system artifacts. The abandoned computer represents an active toolkit for the exact type of wireless hotspot-based credential theft described in the case briefing.