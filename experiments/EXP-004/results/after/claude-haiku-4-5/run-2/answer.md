Based on my investigation, I can now compile the final report. Let me document all findings:

---

# FORENSIC INVESTIGATION REPORT
## NIST Hacking Case - Case ID: nist-hacking-case-q31
**Evidence:** Dell Latitude CPi Notebook (Serial: VLQLW)
**Date of Investigation:** 2026-11-14

---

## Investigation Summary

This investigation examined a Dell CPi notebook computer (E01 image) found abandoned with wireless PCMCIA card and 802.11b antenna. The investigation focused on identifying hacking tools, evidence of their use, and potential ties to suspect Greg Schardt (online nickname "Mr. Evil").

### Key Findings:

**1. User Account Identification:**
- User account "Mr. Evil" exists on the system, directly matching the suspect's known online nickname
- This provides direct linkage between the computer and the suspect

**2. Hacking Tools Discovered:**
The system contains organized exploitation tools and materials stored in structured directories:

- **My Documents/ENUMERATION/NT/ogre/** - Network enumeration tool (ogre.ex_)
- **My Documents/EXPLOITATION/NT/Brutus/** - Brutus password brute-force attack tool with documentation (Overview.doc, readme.doc) and user lists (users.txt)
- **My Documents/EXPLOITATION/NT/Brutus/NetBus.bad** - NetBus remote administration tool configuration
- **My Documents/EXPLOITATION/NT/Pwdump/** - pwdump3 password dumping tool (pwdump3.zip, pwdump3.htm, documentation)
- **My Documents/EXPLOITATION/Unix/dsniff 2.3/** - dsniff network sniffing tool (described as "Switched networks lose security advantage due packet tool")
- **Program Files/Ethereal/** - Full Ethereal network packet analyzer installation (sniffer tool)
- **Program Files/Anonymizer/** - Anonymizer software for hiding online activities

**3. Evidence of Tool Usage:**
- Windows Prefetch files show execution history including:
  - CAIN25B45.EXE (Cain & Abel password recovery/hacking tool)
  - Various system tools indicating active usage

**4. Wardriving Evidence:**
- References to "wardriving" activities found in cached internet files in Mr. Evil user profile
- This aligns with the case briefing describing parking near Wireless Access Points

---

## Case Questions

**Case Q1:** Perform a Anti-Virus check. Are there any viruses on the computer?

**Answer:** The ClamAV antivirus scan performed on the evidence (E01/E02 image files) returned "OK" with no detections at the file system level. However, **this does not indicate the files within the disk image are clean**. ClamAV was unable to scan the actual files contained within the EnCase image format - it only scanned the image container files themselves. Despite no antivirus detections, the system contains numerous **hacking tools** which are functionally malicious software used for unauthorized system access, password theft, and network sniffing. These tools include Ethereal (network sniffer), Cain & Abel (password recovery), Brutus (brute force attacker), pwdump (password dumping), and dsniff (network sniffing). The presence of these tools constitutes evidence of hacking capability and intent.

---

## Conclusion

The abandoned Dell CPi computer contains clear and substantial evidence of hacking activity:
- Direct user account linkage to suspect "Mr. Evil" (Greg Schardt)
- Organized, categorized storage of multiple hacking tools
- Installation of network sniffing software (Ethereal)
- Execution history showing hacking tool usage
- Evidence of wardriving activities consistent with case briefing
- Password recovery and brute-force attack tools
- Network enumeration capabilities

This evidence strongly supports the theory that this computer was used for unauthorized hacking purposes, including interception of network traffic and credential theft, as described in the case briefing.