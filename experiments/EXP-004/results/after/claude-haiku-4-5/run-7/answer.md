---

# FORENSIC INVESTIGATION REPORT
## NIST Hacking Case - Dell Latitude CPi Notebook

### Investigation Summary

A Dell notebook computer (serial # VLQLW) abandoned on 09/20/04 was analyzed for evidence of hacking activities. The investigation targeted Greg Schardt, who uses the online nickname "Mr. Evil," suspected of intercepting wireless internet traffic to steal credit card numbers, usernames, and passwords.

### Findings

#### 1. Operating System Identification
**Evidence Source:** Software Registry Hive - Microsoft\Windows NT\CurrentVersion

The computer was running **Microsoft Windows XP** with the following specifications:
- Product Name: Microsoft Windows XP
- Current Version: 5.1
- Build Number: 2600
- Install Date: September 24, 2004

#### 2. Registered Owner Verification
**Evidence Source:** Software Registry Hive - Microsoft\Windows NT\CurrentVersion

The registered owner is **Greg Schardt**, directly confirming the computer belonged to the primary suspect. Additionally, a user account named **"Mr. Evil"** was found on the system, matching the suspect's known online nickname.

#### 3. Hacking Software Discovery

Multiple categories of network hacking and exploitation tools were discovered:

**ENUMERATION Tools:**
- OGRE (network enumeration utility)

**EXPLOITATION Tools:**
- **Brutus** - Brute force password attacking tool (with NetBus configuration files)
- **Pwdump3** - Credential/password dumping tool
- **dsniff 2.3** - Network packet sniffer tool ("Switched networks lose security advantage due packet tool")

**FOOTPRINTING/RECONNAISSANCE Tools:**
- **Nmapnt** - Windows port scanner (source code included)
- **NSTPro2** - Network scanner
- **SPADE 114** - Port scanner
- **SuperScan** - Port scanner (comprehensive port enumeration tool)

**Additional Tools:**
- WHOIS tool (on Desktop/Tools folder for target domain lookup)

#### 4. User Activity Evidence

**Mr. Evil User Profile Contains:**
- Email folder "alt.hacking.dbx" (Outlook Express email folder for alt.hacking newsgroup)
- Desktop shortcuts to hacking tools
- Network connections to "Andrews-1" computer (indicating network reconnaissance activities)

#### 5. Antivirus Scan Results
**Evidence Source:** ClamAV malware signature scanner

ClamAV scan result: **OK - No viruses detected**

Note: While no signature-based viruses were found, the legitimate but malicious hacking tools present represent a significant threat for network eavesdropping and credential theft.

#### 6. Connection to Suspect Activities

The discovered tools directly support the suspected hacking methodology:
- **Packet sniffing (dsniff)** matches the suspected activity of intercepting wireless internet traffic
- **Credential dumping (Pwdump)** matches attempts to steal usernames and passwords
- **Network scanning tools (Nmap, SPADE, SuperScan)** support reconnaissance of Wireless Access Points (Starbucks, T-Mobile Hotspots)
- **Brute force tools (Brutus)** could be used to compromise captured credentials

---

## Case Questions

Case Q1: What operating system was used on the computer?
**Microsoft Windows XP (Version 5.1, Build 2600)**

Case Q2: Who is the registered owner?
**Greg Schardt** (confirmed in SOFTWARE registry hive, Microsoft\Windows NT\CurrentVersion\RegisteredOwner)

Case Q3: Perform a Anti-Virus check. Are there any viruses on the computer?
**No viruses detected. ClamAV scan result: OK** (However, multiple legitimate hacking tools are present that could be used for malicious purposes including network eavesdropping and credential theft)