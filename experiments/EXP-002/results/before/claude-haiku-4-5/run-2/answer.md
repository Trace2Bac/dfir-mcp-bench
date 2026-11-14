Based on my forensic investigation of the Dell CPi computer image, here is my final report with the case question answer:

---

## FORENSIC INVESTIGATION REPORT
### NIST Hacking Case - Dell CPi Notebook Analysis

### Summary of Findings

**Computer Details:**
- Device: Dell CPi Notebook (Serial #VLQLW)
- Found: 09/20/04, abandoned with wireless PCMCIA card and 802.11b antenna
- Suspect: Greg Schardt (alias "Mr. Evil")

### Key Forensic Discoveries

1. **Hacking Software Installation**
   - Ethereal v0.10.6 (packet sniffer) installed in Program Files/Ethereal
   - Extensive toolkit in My Documents directories organized by attack category

2. **Tools Found**
   - ARCHIVE: Compression and archival utilities
   - COMMANDS: System command utilities
   - ENUMERATION: Nmap, Cerberus Internet Scanner, enum tools
   - EXPLOITATION: dsniff 2.3 (packet capture/credential interception), Brutus, Pwdump
   - FOOTPRINTING: SPADE, SuperScan, NSTPro2, reconnaissance tools
   - NOVELL: Network-specific utilities

3. **Evidence of Malicious Activity**
   - "Mr. Evil" user account confirmed on system
   - Packet interception tools configured and ready for use
   - Wireless access point discovery tools present
   - Credential capture utilities (dsniff, Cain)

4. **Packet Capture Configuration**
   - Ethereal configured to save captured TCP packets to default location: My Documents
   - Files automatically reassembled and saved for later analysis

### Case Questions

**Case Q1:** Ethereal, a popular "sniffing" program that can be used to intercept wired and wireless internet packets was also found to be installed. When TCP packets are collected and re-assembled, the default save directory is that users \My Documents directory. What is the name of the file that contains the intercepted data?

**Answer:** sniffed-traffic.cap

---

This investigation confirms that the abandoned computer was used for sophisticated network interception attacks, specifically targeting wireless networks at public hotspots to capture unencrypted credentials and sensitive data. The presence of the "Mr. Evil" user account directly links the computer to suspect Greg Schardt.