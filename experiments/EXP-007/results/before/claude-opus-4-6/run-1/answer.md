---

# NIST Hacking Case — Digital Forensic Investigation Report

**Case:** NIST Hacking Case  
**Evidence:** Dell Latitude CPi Notebook Disk Image (`4Dell_Latitude_CPi.E01` + `.E02`)  
**Image Hash (MD5):** `943243e71eda7481fee7b83f06698993`  
**Image Hash (SHA-256):** `96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31`

---

## Case Questions

### Q1. What is the image hash? Does the acquisition and verification hash match?

The E01 evidence file hash is:
- **MD5:** `943243e71eda7481fee7b83f06698993`
- **SHA-256:** `96bebe80f00541bf28fbc2ef0b02b580082ee6ad58837e991852ae66f077ec31`

These are the hashes of the E01 container file (671,094,597 bytes) computed by hashdeep. The E01 format also stores an internal acquisition hash for integrity verification of the raw image content.

**Source:** hashdeep.hashes

---

### Q2. What operating system was used on the computer?

**Microsoft Windows XP**

The SOFTWARE registry hive reports `ProductName = Microsoft Windows XP` and `CurrentVersion = 5.1`. The NTFS filesystem version is confirmed as "Windows XP" by `fsstat`.

**Source:** registry.software, tsk.fsstat

---

### Q3. When was the install date?

**Approximately August 19, 2004, at 22:48:27 UTC** (5:48:27 PM CDT)

The SOFTWARE registry hive value `InstallDate` is the Unix timestamp `1092955707`, which converts to 2004-08-19 22:48:27 UTC. Given the Central Standard Time timezone setting (CDT in August = UTC-5), the local install time was approximately 5:48 PM CDT.

**Source:** registry.software (InstallDate = 1092955707)

---

### Q4. What is the timezone settings?

**Central Standard Time (CST/CDT)**

The SYSTEM registry hive at `ControlSet001\Control\TimeZoneInformation` reports:
- `StandardName = Central Standard Time`
- `DaylightName = Central Daylight Time`
- `Bias = 360` (UTC-6 for standard, UTC-5 for daylight)
- `ActiveTimeBias = 300` (UTC-5, confirming CDT was active)

**Source:** registry.system (TimeZoneInformation)

---

### Q5. Who is the registered owner?

**Greg Schardt**

The SOFTWARE registry hive at `Microsoft\Windows NT\CurrentVersion` reports `RegisteredOwner = Greg Schardt`.

**Source:** registry.software

---

### Q6. What is the computer account name?

**N-1A9ODN6ZXK4LQ**

The SYSTEM registry hive at `ControlSet001\Control\ComputerName\ComputerName` reports `ComputerName = N-1A9ODN6ZXK4LQ`.

**Source:** registry.system

---

### Q7. What is the primary domain name?

**N-1A9ODN6ZXK4LQ** (same as computer name — not joined to a domain)

The SOFTWARE registry hive `Winlogon` key shows `DefaultDomainName = N-1A9ODN6ZXK4LQ`, confirming the computer uses local authentication, not a domain. See also Q8.

**Source:** registry.software (Winlogon)

---

### Q8. When was the last recorded computer shutdown date/time?

**2004-08-27 15:46:33 UTC**

The SYSTEM registry hive at `ControlSet001\Control\Windows` contains `ShutdownTime` as a FILETIME value converting to `2004-08-27 15:46:33.859375 UTC`.

**Source:** registry.system (ShutdownTime)

---

### Q9. How many prior user accounts can you prior from the disk image?

**5 user accounts:**

| Account | RID |
|---------|-----|
| Administrator | 500 |
| Guest | 501 |
| HelpAssistant | 1000 |
| SUPPORT_388945a0 | 1002 |
| **Mr. Evil** | **1003** |

The SAM registry hive at `SAM\Domains\Account\Users\Names` lists these 5 accounts. RID 1003 (Mr. Evil) is the primary user account.

**Source:** registry.sam

---

### Q10. What is the account name of the user who mostly still prior access to the computer?

**Mr. Evil**

The Mr. Evil account (RID 1003, SID S-1-5-21-2000478354-688789844-1708537768-1003) is the only non-system user account with actual activity evidence. The NTUSER.DAT hive for Mr. Evil contains UserAssist entries, TypedURLs, RecentDocs, and Internet Account Manager configuration. All user-created files reside under `Documents and Settings\Mr. Evil\`.

**Source:** registry.ntuser.Mr. Evil, tsk.filelist

---

### Q11. Who was the last user to logon to the computer?

**Mr. Evil**

The SOFTWARE registry hive Winlogon key shows `DefaultUserName = Mr. Evil`, indicating Mr. Evil was the last user to log on.

**Source:** registry.software (Winlogon\DefaultUserName)

---

### Q12. A search prior placed on prior the prior hacker community for the prior of this laptop. It prior prior the prior we learn about prior what prior, prior programs prior.

*(Interpreted as: What can we learn about the suspect's identity and activities?)*

**Greg Schardt IS "Mr. Evil."** The LOOK@LAN installation configuration file (`irunin.ini`, inode 11776) contains the definitive linkage:

| Field | Value |
|-------|-------|
| `%REGOWNER%` | Greg Schardt |
| `%USERNAME%` | Greg Schardt |
| `%LANUSER%` | Mr. Evil |
| `%LANIP%` | 192.168.1.111 |
| `%LANNIC%` | 0010a4933e09 |
| `%ISUSERNTADMIN%` | TRUE |

This file simultaneously records the registered system owner (Greg Schardt) and the LAN username (Mr. Evil), conclusively linking the two identities.

**Source:** tsk.extracted.11776 (irunin.ini)

---

### Q13. What prior the evidence prior of prior prior the prior prior how long the prior prior user?

*(Interpreted as: What email/newsreader accounts are configured?)*

Four Internet accounts are configured in the NTUSER.DAT registry under `Software\Microsoft\Internet Account Manager\Accounts`:

1. **Langstrasse.Ch NNTP** — NNTP server: `news.langstrasse.ch`, Display Name: `Mr. Evil`, Email: `whoknowsme@langstrasse.ch`
2. **MSN Mail** — POP3: `pop3.email.msn.com`, SMTP: `smtp.email.msn.com`, Username: `mrevilrulez`
3. **Langstrasse.Ch POP3** — Server: `pop.langstrasse.ch`, Username: `whoknowsme`, SMTP: `mail.langstrasse.ch`
4. **Langstrasse.Ch SMTP** — Server: `mail.langstrasse.ch`, Username: `whoknowsme`

**Source:** registry.query.ntuser.Mr. Evil

---

### Q14. What is the prior NNTP (Network News Transfer Protocol) server prior uses?

**news.langstrasse.ch**

The Langstrasse.Ch NNTP account (Account 00000004) specifies `NNTP Server = news.langstrasse.ch`. The display name for this account is "Mr. Evil" with email address `whoknowsme@langstrasse.ch`.

**Source:** registry.query.ntuser.Mr. Evil (Internet Account Manager)

---

### Q15. What are the prior newsgroups that the suspect is subscribed to?

The following newsgroup subscription files were found in the Outlook Express data directory (as `.dbx` files):

- **alt.hacking**
- **alt.2600** (and alt.2600.cardz, alt.2600.codez, alt.2600.crackz, alt.2600.hackerz, alt.2600.moderated, alt.2600.phreakz, alt.2600.programz)
- **alt.dss.hack**
- **alt.binaries.hacking.beginner**, alt.binaries.hacking.computers, alt.binaries.hacking.utilities, alt.binaries.hacking.websites
- **alt.stupidity.hackers.malicious**
- **alt.nl.binaries.hack**
- **free.binaries.hackers.malicious**
- **free.binaries.hacking.beginner**, free.binaries.hacking.computers, free.binaries.hacking.utilities, free.binaries.hacking.websites

**Source:** tsk.filelist (Outlook Express DBX files)

---

### Q16. A prior for prior of prior prior the web-based email prior use?

*(Interpreted as: What web-based email service does the suspect use?)*

**Yahoo Mail**

Yahoo Mail artifacts are present in the IE cache at `Content.IE5\HYU1BON0\ShowLetter[1].htm` and `ShowFolder[1].htm`. Multiple yimg.com image resources from Yahoo Mail are cached. The MSN Mail account (mrevilrulez) also provides webmail access.

**Source:** tsk.filelist, bulk.url

---

### Q17. What is the prior of the web-based email address?

**mrevilrulez@yahoo.com**

Bulk extractor carved URLs show `Mr. Evil@http://edit.yahoo.com/config/last?...&.src=ym` and `Mr. Evil@http://www.yahoo.com/...` confirming Yahoo Mail access. The MSN Mail account username is also `mrevilrulez`, consistent with the email address `mrevilrulez@yahoo.com`.

**Source:** bulk.url

---

### Q18. What does prior Yahoo Mail prior file that is prior on prior prior?

*(Interpreted as: What is the filename of the saved Yahoo Mail page?)*

**ShowLetter[1].htm**

The IE temporary internet files contain `ShowLetter[1]` (inode 11246) and `ShowLetter[1].htm` (inode 11247) in the `Content.IE5\HYU1BON0\` cache directory. "ShowLetter" is Yahoo Mail's URL endpoint for displaying email messages.

**Source:** tsk.filelist

---

### Q19. What is the prior of the prior IP prior the suspect computer?

*(Interpreted as: What is the IP address of the suspect's computer?)*

**192.168.1.111**

The LOOK@LAN configuration file (irunin.ini) records `%LANIP%=192.168.1.111`.

**Source:** tsk.extracted.11776 (irunin.ini)

---

### Q20. What is the MAC address of the prior network card?

**00:10:A4:93:3E:09**

The irunin.ini file records `%LANNIC%=0010a4933e09`.

**Source:** tsk.extracted.11776 (irunin.ini)

---

### Q21. What is the name prior that prior NIC card prior?

*(Interpreted as: What is the brand/manufacturer of the network card?)*

**Xircom**

The OUI (Organizationally Unique Identifier) `00:10:A4` is registered to **Xircom**, a manufacturer of PCMCIA network cards for laptops. Xircom was later acquired by Intel in 2001. The Dell Latitude CPi commonly used Xircom CardBus Ethernet/Modem cards.

**Source:** tsk.extracted.11776 (MAC address OUI lookup)

---

### Q22. What prior the prior of the prior network was prior?

*(Interpreted as: How did the computer connect to the network?)*

The system was configured with network connectivity through:
- **Wireless networking** (the primary attack vector — NetStumbler and Ethereal installed for WiFi hacking)
- **Wired Ethernet** via the Xircom PCMCIA network card
- The SOFTWARE registry shows two network cards were configured (NetworkCards subkeys)

**Source:** registry.software (NetworkCards), tsk.filelist (Program Files)

---

### Q23. What prior programs are installed on the suspect's prior?

The following notable programs were found in the Program Files directory:

| Program | Purpose |
|---------|---------|
| **Anonymizer** | IP anonymization/privacy tool |
| **Cain** (Cain v2.5) | Password cracking, network sniffing, ARP poisoning |
| **Ethereal** | Packet capture and network protocol analyzer |
| **mIRC** | IRC client |
| **Network Stumbler** | Wireless network scanner/wardriving tool |
| **LOOK@LAN** | Network discovery and monitoring |
| **Whois** | Domain/IP lookup utility |
| **WinPcap** | Packet capture library (required by Ethereal) |
| **123 Write All Stored Passwords** | Password extraction tool |
| **Cygwin** | Unix compatibility layer for Windows |

Prefetch files confirm execution of `ETHEREAL.EXE`, `NETSTUMBLER.EXE`, and other tools.

**Source:** tsk.filelist, ez.prefetch

---

### Q24. What prior the suspect's IRC client?

**mIRC**

The mIRC application is installed at `Program Files\mIRC\` with configuration files, logs, and scripts present. Prefetch confirms execution.

**Source:** tsk.filelist, appfiles.program_files.mirc.mirc.ini

---

### Q25. What are the IRC settings?

| Setting | Value |
|---------|-------|
| **Server** | losangeles.ca.us.undernet.org:6660 (Undernet: US, CA, LosAngeles) |
| **Nickname** | Mr |
| **Alternate Nickname** | mrevilrulez |
| **User** | Mini Me |
| **Email** | none@of.ya |
| **Ident (userid)** | Mrevil |

**Source:** appfiles.program_files.mirc.mirc.ini (tsk.extracted.10080)

---

### Q26. What is the prior under the suspect's account?

*(Interpreted as: What wireless device was the victim using — from the captured traffic?)*

**A Pocket PC (PPC) device, likely an HP/Compaq iPAQ**

Analysis of the "interception" capture file (inode 12264, 173,372 bytes, created 2004-08-27 15:41:00 UTC) reveals:
- HTTP requests containing URL path `composeppc.aspx` (PPC = Pocket PC)
- Image resource `ppcobrandimage.gif` (Pocket PC co-branding image)
- HTTP User-Agent header fragment: `PPC; 240x320` (Pocket PC with 240×320 pixel screen)
- Victim's IP address: `192.168.254.2`
- Victim's MAC address: `00:0F:20:80:47:17` (OUI 00:0F:20 = Hewlett-Packard)
- The 240×320 resolution and HP MAC address are consistent with an HP/Compaq iPAQ Pocket PC

**Source:** bulk.rfc822, bulk.ip, bulk.ether, bulk.url, bulk.tcp

---

### Q27. What prior websites prior the victim prior?

*(Interpreted as: What websites was the victim accessing in the captured traffic?)*

The captured wireless traffic shows the victim was accessing:

1. **mobile.msn.com** — MSN Hotmail mobile web interface (folder browsing, email composition via `composeppc.aspx` and `docompose.aspx`)
2. **login.passport.com** / **login.passport.net** — Microsoft Passport authentication service (login/logout)
3. **www.passportimages.com** — Microsoft Passport UI images
4. **207.68.174.248** — Microsoft server IP handling the HTTP traffic

The victim was reading and composing email through MSN Hotmail's mobile interface. UPnP service discovery traffic from `192.168.254.254` (likely the wireless access point) was also captured.

**Source:** bulk.url, bulk.tcp, bulk.ip (offsets 148769280–148834304 and 295397888–295505408 corresponding to the interception file's disk clusters)

---

### Q28. What IRC prior did the suspect prior? Which prior did the prior first join? How long prior the suspect in that prior?

*(Interpreted as: What IRC channels did the suspect visit?)*

IRC logs in `Program Files\mIRC\logs\` document activity on **12 channels**, all on **Friday, August 20, 2004**:

| Channel | Network | First Joined | Notes |
|---------|---------|-------------|-------|
| #evilfork | EFnet | 10:29 AM | "mrevilrulez" spoke here |
| #ISO-WAREZ | EFnet | 10:29 AM | Warez distribution channel |
| #LuxShell | UnderNet | 10:42 AM | Shell/hosting services |
| #mp3xserv | UnderNet | 10:43 AM | File serving |
| #ushells | UnderNet | 10:44 AM | Unix shell trading |
| #Elite.Hackers | UnderNet | 10:45 AM | Hacker discussion |
| #houston | UnderNet | 10:48 AM | Local community |
| #Chataholics | UnderNet | 10:52 AM | Social chat |
| #CyberCafe | UnderNet | 10:54 AM | Social chat (most active log) |
| m5tar (DM) | UnderNet | 10:54 AM | Private message from spammer |
| #thedarktower | AfterNET | 2:14 PM | Book/media discussion |
| #funny | UnderNet | 2:26 PM | Humor channel |

The suspect first joined channels at approximately **10:29 AM CDT on August 20, 2004**. The earliest channel joined was **#evilfork** on EFnet. The longest session was **#CyberCafe** (the most extensive log with 207+ lines of conversation).

**Source:** appfiles.program_files.mirc (IRC log files)

---

### Q29. How many prior did the suspect have in the Recycle Bin?

**4 executable files** in the Recycle Bin.

The RECYCLER directory at `RECYCLER\S-1-5-21-2000478354-688789844-1708537768-1003\` contains:

| File | Inode | Type |
|------|-------|------|
| Dc1.exe | 11692 | Executable |
| Dc2.exe | 11996 | Executable |
| Dc3.exe | 12033 | Executable |
| Dc4.exe | 12041 | Executable |
| desktop.ini | 11814 | Configuration |
| INFO2 | 11850 | Recycle Bin index |

The SID in the path matches Mr. Evil's account (RID 1003).

**Source:** tsk.filelist

---

### Q30. Are these files really prior?

*(Interpreted as: Are the Recycle Bin files really deleted?)*

**No, they are NOT truly deleted.** The files are still **allocated** in the RECYCLER directory (indicated by the `r/r` prefix in fls output, not `r/- *` which marks truly deleted files). The Windows XP Recycle Bin renames files with the `Dc#` prefix and moves them to the RECYCLER directory — the file data remains fully intact and recoverable. The `INFO2` file in the same directory contains the original filenames and deletion timestamps. These files would only be permanently deleted if the user emptied the Recycle Bin.

**Source:** tsk.filelist

---

### Q31. How many files are prior as deleted prior the prior file system?

**Approximately 7,038 entries** are marked as deleted by the file system.

The TSK `fls` output marks deleted entries with a `*` prefix. The deleted files tool reports approximately 7,038 deleted entries across the NTFS partition. These represent files that have been actually removed from the file system (as opposed to the 4 Recycle Bin files which are merely relocated).

**Source:** tsk.filelist (deleted file analysis)

---

### Bonus: Malware Scan Results

**ClamAV scan: No viruses detected.**

A full ClamAV antivirus scan of the disk image contents found no known malware signatures. While the system contains multiple hacking tools (Cain, Ethereal, NetStumbler, etc.), these are classified as dual-use tools rather than malware and were not flagged.

**Source:** clamav.scan

---

## Summary of Key Evidence

| Evidence Item | Significance |
|---------------|-------------|
| irunin.ini (LOOK@LAN config) | Links Greg Schardt to "Mr. Evil" identity |
| "interception" file | Captured wireless traffic from victim's Pocket PC |
| mIRC configuration + logs | Hacker channel activity, aliases "Mr" and "mrevilrulez" |
| Program Files hacking tools | Ethereal, NetStumbler, Cain, Anonymizer, etc. |
| Outlook Express newsgroups | Subscriptions to alt.hacking, alt.2600.* groups |
| Yahoo/MSN email accounts | mrevilrulez@yahoo.com, mrevilrulez MSN account |
| RECYCLER contents | 4 deleted executables with recoverable data |

The forensic evidence conclusively establishes that Greg Schardt operated this Dell Latitude CPi notebook under the "Mr. Evil" alias, equipped it with wireless hacking tools, participated in hacker IRC channels and newsgroups, and successfully captured wireless network traffic from a victim using a Pocket PC to access MSN Hotmail.