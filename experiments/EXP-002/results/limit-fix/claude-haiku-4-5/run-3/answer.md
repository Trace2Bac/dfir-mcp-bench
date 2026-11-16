Based on my investigation, I have gathered all the evidence needed to answer the case questions. Let me compile the final report.

---

# NIST HACKING CASE INVESTIGATION REPORT
## Case ID: nist-hacking-case-av

## Executive Summary

A forensic analysis was conducted on a Dell Latitude CPi notebook computer (serial # VLQLW) that was discovered abandoned with a wireless PCMCIA card and an external 802.11b antenna on 09/20/04. The investigation revealed extensive hacking tools and utilities stored on the device, along with evidence connecting it to suspect Greg Schardt (online alias "Mr. Evil").

## Findings

### 1. Operating System Identification

The computer was running **Microsoft Windows XP**. This was confirmed by examining the registry SOFTWARE hive (key: Microsoft\Windows NT\CurrentVersion, value: ProductName). Additional evidence includes:
- "Powertoys for Windows XP" folder found in the Start Menu
- Windows XP-specific system file structure and directory organization

### 2. Registered Owner

The registered owner of the computer is **Greg Schardt**, as found in the registry SOFTWARE hive (key: Microsoft\Windows NT\CurrentVersion, value: RegisteredOwner). This matches the primary suspect identified in the case briefing.

### 3. User Account "Mr. Evil"

A user account named "Mr. Evil" exists on the system, matching the suspect's known online nickname. This account contains extensive evidence of hacking activities.

### 4. Hacking Tools and Software Found

The following hacking and network analysis tools were discovered on the computer:

**Exploitation Tools:**
- **Brutus** - Password cracking/brute force tool configured to attack NetBUS (remote access trojan)
- **Pwdump3** - Windows password dumper utility for extracting system credentials

**Network Analysis Tools:**
- **Ethereal** (version 0.10.6) - Network protocol analyzer (now known as Wireshark)
- **Nmap** - Network scanning and mapping utility (nmapNT)
- **dsniff 2.3** - Packet sniffing and credential interception tool

**Enumeration Tools:**
- **Cerberus Internet Scanner** - Network/service enumeration tool
- **enum/ogre** - NT system enumeration tools

**Supporting Software:**
- **mIRC** - IRC client (commonly used for hacking communities)
- **Anonymizer Toolbar** - Browser anonymization utility
- **WinPcap** - Windows packet capture library

### 5. Evidence of Hacking Interest

- **alt.hacking.dbx** - Outlook Express mailbox containing messages from alt.hacking newsgroup
- **wardriving** - Cached file referencing wardriving activities (compatible with the wireless PCMCIA card found with the device)
- **Whois shortcut** - Quick access to whois network lookup tool
- Extensive documentation on NT exploitation techniques

### 6. Antivirus Scan Results

**ClamAV Scan Result:** No known viruses detected.

- Scan of disk image E01/E02 files: OK (no detections)
- Scan of extracted pwdump3.zip utility: OK (no detections)

**Note:** While ClamAV found no known malware signatures, the hacking tools themselves (Brutus, Pwdump, dsniff, etc.) are legitimate utilities frequently used for system administration but commonly misused by attackers. These are not classified as viruses by antivirus engines but represent clear evidence of hacking intent when found together with evidence of configuration for attacking systems.

### 7. Connection to Suspect

The evidence strongly ties this computer to Greg Schardt ("Mr. Evil"):
- Computer is registered to Greg Schardt
- User account "Mr. Evil" matches his known online alias
- Tools and techniques align with the described hacking activities (wireless traffic interception)
- Wardriving evidence suggests testing near wireless access points (Starbucks, T-Mobile Hotspots)

---

## Case Questions

**Case Q1:** Microsoft Windows XP

**Case Q2:** Greg Schardt

**Case Q3:** The antivirus scan using ClamAV detected no known viruses on the examined files and disk image (status: OK). However, the computer contained numerous hacking and network analysis tools including Brutus (password cracker), Pwdump (credential dumper), Ethereal (packet analyzer), Nmap (network scanner), and dsniff (traffic sniffer), which are legitimate utilities commonly misused for malicious hacking purposes. While not "viruses" per se, these tools and their configuration files provide clear evidence of hacking activities.