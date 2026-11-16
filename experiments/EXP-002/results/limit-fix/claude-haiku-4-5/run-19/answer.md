## NIST Hacking Case Investigation - Final Report

### Executive Summary

A comprehensive forensic examination of the Dell Latitude CPi notebook computer (Serial #VLQLW) was conducted. The investigation reveals this computer was actively used for hacking and unauthorized network activities, including packet sniffing, password dumping, and network reconnaissance tools. The computer is registered to Greg Schardt, matching the suspected hacker "Mr. Evil."

### Findings

#### Operating System and Configuration
- **OS**: Windows XP (Build 2600)
- **Installation Date**: August 27, 2004
- **System Owner**: Greg Schardt (registered owner in registry)

#### Hacking Tools Discovered

The computer contained extensive hacking software organized in "My Documents" folders:

**Packet Sniffing Tools** (for intercepting network traffic):
- Ethereal (network protocol analyzer) - installed in Program Files
- dsniff 2.3 - with documentation explaining its use for packet interception on switched networks

**Password Attack Tools**:
- Pwdump3 (password dumping utility for extracting Windows credentials)
- Brutus (password cracking tool with NetBus documentation)
- Cain & Abel (CAIN25B45.EXE - password recovery and network sniffing)

**Network Reconnaissance Tools**:
- Nmap/nmapNT (network port scanner)
- Superscan (network scanner)
- NSTPro2 (network security testing)
- Cerberus Internet Scanner
- SPADE (network enumeration tool)

**Exploitation Tools**:
- enum (NT enumeration tool with source code)
- ogre (enumeration tool)
- Various command-line utilities for system enumeration

**Malicious Software**:
- snitch.exe (Trojan - detected as Win.Trojan.Snitch-1 by ClamAV)

#### Antivirus Scan Results
**Result**: Malware detected
- **Detection**: Win.Trojan.Snitch-1 found in "My Documents/COMMANDS/snitch.exe"
- File size: 24,576 bytes
- SHA256: 42ac6b745abd6ab4895ecab7baa93ec7cbdd618cc9419a1e7f8609f403d3110a

#### Connection to Suspect
The computer contains evidence directly linking it to suspect Greg Schardt (online alias "Mr. Evil"):
- Registered owner name matches the suspect identity
- User account on system named "Mr. Evil"
- Presence of mIRC (Internet Relay Chat client) used by online communities
- Cached internet history showing hacking-related searches

### Investigative Conclusion

The evidence strongly supports the hypothesis that this computer was used for hacking activities. The toolkit present—particularly the packet sniffing tools (Ethereal, dsniff) combined with password attack tools (Pwdump, Brutus, Cain & Abel)—aligns perfectly with the suspected modus operandi of intercepting wireless traffic at public hotspots to steal credit card numbers and user credentials. The presence of a Trojan virus further indicates malicious activity.

---

### Case Questions

**Case Q1: What operating system was used on the computer?**
Microsoft Windows XP (Build 2600, installed 2004-08-27)

**Case Q2: Who is the registered owner?**
Greg Schardt

**Case Q3: Perform a Anti-Virus check. Are there any viruses on the computer?**
Yes, antivirus scan detected malware: Win.Trojan.Snitch-1 was found in the file "My Documents/COMMANDS/snitch.exe" (inode 10277). ClamAV antivirus scan result confirmed 1 detection.