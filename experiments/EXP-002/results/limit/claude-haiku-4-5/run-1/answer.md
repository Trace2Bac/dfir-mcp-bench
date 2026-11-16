Based on my investigation, I have gathered sufficient evidence to answer all the case questions. Let me compile the final report.

---

# NIST Hacking Case Investigation - Final Report

## Case Information
- **Case ID:** nist-hacking-case-av
- **Evidence:** Dell Latitude CPi Notebook (Serial # VLQLW)
- **Investigation Date:** 2026-11-16
- **Suspect:** Greg Schardt (alias: "Mr. Evil")

## Investigation Summary

This investigation examined a Dell CPi notebook computer abandoned on 09/20/04 along with wireless equipment. The computer contained extensive evidence of hacking activities, tools, and documentation organized in systematic directories. The registered owner of the computer is Greg Schardt, whose online alias "Mr. Evil" also appears as a user profile on the system.

### Key Findings

**1. Operating System and Registration**
The computer runs Microsoft Windows XP with the registered owner named "Greg Schardt". The system is registered to Greg Schardt with no organizational affiliation listed (N/A).

**2. Hacking Tools and Infrastructure**

The computer contains a comprehensive collection of professional hacking and network reconnaissance tools, organized into logical categories:

**Packet Sniffing/Network Interception:**
- Ethereal (packet sniffer - installed in Program Files)
- dsniff 2.3 (packet sniffing and network interception toolkit with documentation on "Switched networks lose security advantage due packet tool")
- Look@LAN (network scanner installed in Program Files)

**Network Enumeration Tools:**
- ogre (Windows enumeration tool)
- enum (network enumeration utility)
- Cerberus Internet Scanner
- NSTPro2 (network scanner with system/user enumeration)
- SPADE (network scanner)
- Superscan (port scanner)
- Nmap NT (network mapping with full source code)

**Password and Exploitation Tools:**
- Brutus (authentication cracking tool with NetBus.bad file)
- Pwdump3 (Windows password hash dumping utility)
- Various command-line utilities including user2sid, STREAMFIND.EXE, snitch.exe

**Supporting Infrastructure:**
- Directory structure labeled "My Documents/FOOTPRINTING", "My Documents/ENUMERATION", "My Documents/EXPLOITATION" and "My Documents/COMMANDS"
- Evidence of active hacking newsgroup subscription (alt.hacking.dbx in Outlook Express)
- User profile "Mr. Evil" matching suspect's online alias

**3. Antivirus Scan Results**

ClamAV antivirus scan of the evidence showed: The E01 and E02 image files themselves are marked as "OK", however ClamAV explicitly notes it "does not open a disk image, so the files inside were not scanned." Therefore, no comprehensive antivirus scan of the actual filesystem contents could be completed using ClamAV. 

However, the tools discovered ARE NOT traditional viruses or malware - they are legitimate (though malicious) hacking and penetration testing utilities. These tools are designed for network reconnaissance, password cracking, and traffic interception, consistent with the briefing that suspect Schardt was engaged in intercepting internet traffic at wireless hotspots to capture credit card numbers, usernames, and passwords.

---

## Case Questions

**Case Q1: What operating system was used on the computer?**
Microsoft Windows XP (Version 5.1, Build 2600)

**Case Q2: Who is the registered owner?**
Greg Schardt

**Case Q3: Perform a Anti-Virus check. Are there any viruses on the computer?**
ClamAV antivirus scan could not scan the filesystem contents within the E01 disk image (it treated the image files as single objects rather than mounting them). The scan result does not indicate the files inside are clean. However, no traditional virus signatures were detected on the image files themselves. The computer contains numerous hacking and network interception tools (Ethereal, dsniff, Brutus, Pwdump3, etc.) which are not classified as viruses but represent evidence of intentional hacking software installation and use consistent with the suspect's activities.