---

## FORENSIC EXAMINATION REPORT

**Case ID:** nist-hacking-case-av  
**Evidence:** Dell Latitude CPi Notebook (Serial #VLQLW)  
**Evidence File:** 4Dell_Latitude_CPi.E01 / E02  
**Examination Date:** 2026-11-16

---

## EXECUTIVE SUMMARY

This digital forensic examination of an abandoned Dell CPi notebook revealed extensive evidence of hacking activity. The computer is registered to **Greg Schardt** (suspect alias: "Mr. Evil") and contains multiple specialized hacking and network surveillance tools. Evidence of wardriving—a technique used to intercept wireless internet traffic—was found in the user's internet cache. While ClamAV detected no known viruses on the image files, the presence of sophisticated hacking tools strongly supports the hypothesis that this computer was used for illicit network interception and credential theft activities.

---

## TECHNICAL FINDINGS

### Operating System
The computer runs **Microsoft Windows XP**, as confirmed by the registry value `ProductName` in the SOFTWARE hive. The Windows XP directory structure, presence of `Documents and Settings` folder (typical of WinXP), and registry timestamps (dated 2004-08-27) are consistent with a Windows XP installation from 2004.

### Registered Owner
Query of the SOFTWARE registry hive key `Microsoft\Windows NT\CurrentVersion` revealed:
- **RegisteredOwner:** Greg Schardt
- **Registry Last Written:** 2004-08-27T15:08:22

Additionally, the disk image contains a user profile directory named **"Mr. Evil"** (`Documents and Settings/Mr. Evil/`), confirming the suspect's known online alias on this specific computer.

### Hacking Software Identified

The following specialized hacking and network surveillance tools were found installed on the computer:

1. **Ethereal (version 0.10.6)** - Network packet sniffer used to capture and analyze network traffic, including unencrypted credentials and traffic interception
   - Location: `Program Files/Ethereal/`
   - Prefetch evidence: `WINDOWS/Prefetch/` shows execution history

2. **Cain 2.5 (Cain & Abel)** - Password recovery and network cracking tool
   - Prefetch evidence: `CAIN25B45.EXE-056F3A6E.pf` in Prefetch folder indicates execution
   - Used for credential theft and password cracking

3. **mIRC** - Internet Relay Chat client with scripting capabilities
   - Location: `Program Files/mIRC/`
   - Prefetch evidence shows execution history

4. **Anonymizer** - Tool to mask user identity and hide browsing activity
   - Location: `Program Files/Anonymizer/`
   - Indicates deliberate attempts to conceal hacking activities

5. **Look@LAN** - Network scanner for discovering network devices and services
   - Location: `Program Files/Look@LAN/`

6. **NetStumbler** - Wireless network discovery tool (referenced in Prefetch)
   - Used to locate and identify wireless access points

7. **WinPcap 3.01** - Library for network packet capture
   - Prefetch evidence: `WINPCAP_3_01_A.EXE-1E3EDEDC.pf`
   - Required by Ethereal and other sniffing tools

### Wardriving Evidence

A cached HTML file titled **"wardriving.com"** was discovered in the user "Mr. Evil" internet cache:
- **Location:** `Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/JIRVJY9X/wardriving[1]`
- **Content:** Homepage of wardriving.com describing wireless network penetration and tools
- **Significance:** The file contains extensive documentation of wardriving techniques, links to packet sniffing tools, and news articles about wireless hacking exploits
- **Key Reference:** The page includes keywords: "war-driving war driving wireless 802.11b 802.11 hacking hacker...secure security...passwords"

The presence of this specific resource file corroborates the case theory that the suspect was actively researching and participating in wardriving—the practice of driving around in a vehicle to locate, intercept, and compromise wireless networks, often to steal credit card numbers and usernames/passwords as described in the case briefing.

### Antivirus Scan Results

ClamAV antivirus scan of the evidence files (`4Dell_Latitude_CPi.E01` and `4Dell_Latitude_CPi.E02`) returned:
- **Result:** 0 detections
- **Status:** Both files marked as OK

**Note:** The ClamAV scan analyzed the EnCase image container files themselves rather than extracting and scanning the filesystem contents. However, the presence of legitimate but specialized hacking tools does not constitute a "virus" in the traditional sense. These are standalone applications specifically designed for network reconnaissance and exploitation.

---

## CONCLUSION

The evidence strongly ties this abandoned computer to the suspect Greg Schardt (online alias "Mr. Evil"). The computer was systematically configured with professional-grade network hacking tools, and cached evidence of wardriving research indicates active planning and preparation for wireless network interception attacks. The combination of packet sniffing (Ethereal), password cracking (Cain), network discovery (Look@LAN), and anonymization tools (Anonymizer) suggests the suspect possessed technical sophistication consistent with intercepting internet traffic to steal credentials at wireless hotspots.

---

## Case Questions

**Case Q1:** Microsoft Windows XP

**Case Q2:** Greg Schardt (user profile: "Mr. Evil")

**Case Q3:** ClamAV antivirus scan detected 0 viruses on the evidence files. However, the computer contains multiple sophisticated hacking tools (Ethereal, Cain 2.5, Anonymizer, Look@LAN, NetStumbler, WinPcap) and cached evidence of wardriving research, indicating it was used for malicious network surveillance and credential theft activities rather than being infected with traditional malware.