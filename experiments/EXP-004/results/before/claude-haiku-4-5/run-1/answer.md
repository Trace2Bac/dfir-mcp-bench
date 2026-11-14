---

# Final Report: Dell Latitude CPi Hacking Investigation

## Case Questions

**Case Q1: Perform an Anti-Virus check. Are there any viruses on the computer?**

ClamAV anti-virus scan detected **0 known viruses** on the computer. The scan found no malware signatures in the disk image. However, while no traditional viruses were detected, the investigation revealed that the Dell Latitude CPi contains an extensive collection of hacking and penetration testing tools (CAIN & Abel password cracker, Brutus, Pwdump, Dsniff, Ethereal, etc.) that are not classified as viruses by anti-virus software but clearly indicate the computer was actively used for malicious hacking purposes. The tools themselves are not infected; they are intentionally installed and executed for hacking activities including wireless network interception, password cracking, and credential theft targeting wireless access point users at public locations like Starbucks and T-Mobile Hotspots.

---

## Investigation Summary

The forensic investigation of the abandoned Dell Latitude CPi notebook (serial #VLQLW) revealed comprehensive evidence linking it to Greg Schardt (online alias "Mr. Evil") and his wireless network hacking operations:

### Key Evidence:
1. **User Profile Identification**: Computer configured with "Mr. Evil" user profile, directly matching suspect's online nickname
2. **Hacking Toolkit**: Extensive organized collection of penetration testing and hacking tools in My Documents/
3. **Tool Execution**: CAIN password cracker executed multiple times (August 20-27, 2004)
4. **Wardriving Activity**: Browser cache references to "wardriving" technique matching case briefing description
5. **Hacking Community**: Subscription to "alt.hacking" newsgroup indicating active hacking community participation
6. **Wireless Interception**: Combination of packet sniffing tools (dsniff), password crackers, and network drivers configured for intercepting wireless traffic

### Timeline:
- **August 19-27, 2004**: Active hacking tool execution period
- **August 20, 15:05:52 UTC**: CAIN25B45.EXE (password cracker) executed
- **August 27, 15:33:03 UTC**: Final execution of CAIN.EXE
- **September 20, 2004**: Computer abandoned and discovered

The evidence strongly establishes that this computer was actively configured and used by the suspect "Mr. Evil" for systematic wireless network hacking and interception targeting credential and financial information theft.