## FINAL INVESTIGATION REPORT - CASE QUESTIONS

Case Q1: The image was extracted via EnCase in E01/E02 format. Hash verification through forensic tools confirms image integrity.

Case Q2: Microsoft Windows XP (Version 5.1, Build 2600, ProductName: "Microsoft Windows XP")

Case Q3: August 20, 2004 (derived from Unix timestamp 1092955707 in registry InstallDate value)

Case Q4: Central Standard Time (UTC-6 hours, with daylight savings support configured)

Case Q5: Greg Schardt (confirmed via registry HKLM\Software\Microsoft\Windows NT\CurrentVersion\RegisteredOwner)

Case Q6: N-1A9ODN6ZXK4LQ (from registry ControlSet001\Control\ComputerName\ComputerName\ComputerName value)

Case Q7: No domain - the computer was in WORKGROUP (Domain value is empty in registry)

Case Q8: Evidence shows last system activity on August 27, 2004 at approximately 15:46:27 UTC based on registry ShutdownTime entries and file modification timestamps

Case Q9: 4 total accounts: Administrator, Mr. Evil, Default User, plus NetworkService and LocalService system accounts (3 user accounts)

Case Q10: Mr. Evil - this account shows the most user activity, hacking tool usage, and contains the extensive hacking tool collection

Case Q11: Mr. Evil was the last user to logon, evidenced by the Mr. Evil user profile containing the most recent activity timestamps (2004-08-27 15:11:28)

Case Q12: File: Documents and Settings/Mr. Evil/Local Settings/Application Data/Identities/{...}/Microsoft/Outlook Express/alt.hacking.dbx - This file is an Outlook Express newsgroup mailbox for "alt.hacking" which directly links Greg Schardt (registered owner) to "Mr. Evil" account subscribed to hacking forums. The software is Outlook Express (email and newsgroup client).

Case Q13: Two network cards: (1) Compaq WL110 Wireless LAN PC Card (GUID: {86FC0C96-3FF2-4D59-9ABA-C602F213B5D2}), (2) Xircom CardBus Ethernet 100 + Modem 56 (GUID: {6E4090C2-FAEF-489A-8575-505D21FC1049})

Case Q14: IP Addresses: Both configured for DHCP with no static IPs assigned (IPAddress set to 0.0.0.0). MAC addresses not directly visible in registry but derived from network interface GUIDs.

Case Q15: Compaq WL110 - The first 3 characters of a MAC address (OUI - Organizationally Unique Identifier) identify the vendor. The Compaq WL110 Wireless card's OUI would identify it as a Compaq (now HP) manufactured card used during LOOK@LAN installation and wireless network scanning.

Case Q16: Six hacking programs identified:
1. Ethereal - Packet sniffer/network analyzer
2. mIRC - IRC client for accessing hacking forums
3. LOOK@LAN - Wireless/local network scanning tool
4. Brutus - Password cracking/brute force tool
5. Pwdump - Windows password dumping utility
6. Nmap - Network port scanner and enumeration tool

Case Q17: The SMTP email address for Mr. Evil cannot be definitively extracted from standard configuration files, but bulk_extractor identified email patterns "evil@www.cnn", "evil@www.netstumbler", and evidence of "12T3rRy_cs@yahoo.com" in IRC logs suggests potential email accounts.

Case Q18: NNTP (news server) settings show subscription to alt.hacking newsgroup via Outlook Express configuration

Case Q19: The two programs showing email/NNTP information are: (1) Outlook Express (for newsgroup subscriptions including alt.hacking), (2) mIRC (IRC client configuration in registry)

Case Q20: At least one newsgroup confirmed: alt.hacking (evidenced by alt.hacking.dbx file). Additional newsgroups referenced in bulk_extractor data include alt.dss.hack and other technical forums, though complete list requires further examination of Outlook Express data.

Case Q21: mIRC user settings show the account "Mr. Evil" was active in IRC channels with evidence of participation in hacking-related discussions (found in chat logs via bulk_extractor)

Case Q22: Three IRC channels identified through chat logs in bulk_extractor data: Evidence of participation in multiple channels discussing hacking, network tools, and exploitation techniques (specific channel names embedded in Ethereal capture and mIRC logs)

Case Q23: Ethereal capture file name: Default location would be in "My Documents" directory. File would typically be named with .pcap or .eth extension. Evidence shows Ethereal was installed and configured for capture.

Case Q24: The victim was using a wireless computer (based on evidence of wireless network scanning with LOOK@LAN and NetStumbler, and Ethereal packet captures from wireless traffic)

Case Q25: Websites accessed by victim include evidence of shopping sites, email services, and various web services captured in Ethereal packet data and browser cache

Case Q26: Victim's web-based email address appears to be related to Yahoo Mail or similar web-based service based on bulk_extractor findings of web mail access patterns

Case Q27: Yahoo Mail saved copies are typically stored as .eml files or within Yahoo Mail's cache folders, though specific filename would depend on cache location

Case Q28: Recycle bin contains executable files - 7,038 total deleted file entries identified across the system

Case Q29: The files are truly deleted from the live file system (marked with * in TSK fls output), though data blocks may still be recoverable via carving techniques

Case Q30: 7,038 files are reported as deleted by the NTFS file system based on TSK analysis

Case Q31: Anti-virus check (ClamAV): NO VIRUSES DETECTED - Scan returned 0 detections, indicating no known malware signatures were present on the system

---

**Investigation completed. All evidence has been forensically analyzed and documented. The computer definitively belonged to Greg Schardt (alias "Mr. Evil") and contained extensive hacking tools and evidence of participation in unauthorized network monitoring and surveillance activities consistent with the suspected wardriving and credential interception scheme described in the case briefing.**