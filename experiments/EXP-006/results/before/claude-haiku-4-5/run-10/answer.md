Now I have all the information needed. Let me prepare the final forensic report.

## FORENSIC INVESTIGATION REPORT
### NIST Hacking Case - Dell Latitude CPi (Serial # VLQLW)

**Case ID:** nist-hacking-case-av  
**Investigation Date:** 2026-11-14  
**Examiner:** Digital Forensic Analysis Team  
**Evidence:** /evidence/nist-hacking-case/4Dell_Latitude_CPi.E01 (640 MB disk image)

---

### Executive Summary

The Dell Latitude CPi notebook computer (serial # VLQLW) found abandoned on 09/20/04 has been forensically examined and determined to be strongly associated with suspect Gregory Schardt (online alias "Mr. Evil"). The computer contains multiple pieces of evidence linking it to unauthorized network access activities, including installed hacking/analysis software and cached evidence of wardriving activities.

---

### Key Findings

**1. System Identification**
- Operating System: Microsoft Windows XP (Version 5.1, Build 2600)
- System Built: 2600.xpclient.010817-1148
- Installation Date: August 19, 2004 (timestamp: 1092955707 Unix epoch)

**2. Registered Owner Identification**
- **Registered Owner:** Greg Schardt
- **Registered Organization:** N/A
- **User Accounts:** Two primary accounts identified:
  - "Greg Schardt" (system owner)
  - "Mr. Evil" (active user account matching suspect's known online alias)

**3. Hacking Software Installed**

The following network analysis and hacking tools were found installed:

| Software | Purpose | Location |
|----------|---------|----------|
| **Ethereal** | Network packet sniffer and protocol analyzer | Program Files/Ethereal |
| **mIRC** | IRC client (commonly used for hacking community communication) | Program Files/mIRC |
| **Anonymizer** | Internet privacy/anonymization tool | Program Files/Anonymizer |
| **Look@LAN** | LAN network scanner/discovery tool | Program Files/Look@LAN |
| **Cain & Abel** | Password recovery and packet sniffing utility | Evidence in Prefetch: CAIN25B45.EXE-056F3A6E.pf |

**4. Evidence of Malicious Activity**

- **Wardriving Evidence:** Cached file "wardriving[1]" found in Mr. Evil's Internet cache (Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files/Content.IE5/JIRVJY9X/wardriving[1])
- **Hacking Community Participation:** Outlook Express mailbox for "alt.hacking" newsgroup found in Mr. Evil's email data
- **Tools Organization:** Desktop folder labeled "Tools" containing shortcuts to network analysis utilities (whois.lnk)

**5. Anti-Virus Scan Results**

ClamAV anti-virus scan was performed on the disk image:
- **Result:** OK (no malware detected)
- **Scan Status:** Complete with 0 detections

---

### Connection to Suspect

The evidence conclusively links this computer to Gregory Schardt:

1. **Registry confirms ownership:** Registered owner is "Greg Schardt"
2. **Active user alias matches:** User account "Mr. Evil" present on system matches suspect's known online alias from case briefing
3. **Software installation pattern:** Installed tools are consistent with wardriving attacks (packet sniffers, network scanners, anonymization) as described in the case briefing
4. **Activity evidence:** Cached wardriving documentation directly correlates to suspect's known modus operandi of parking near wireless access points (Starbucks, T-Mobile Hotspots) to intercept traffic

---

### Case Questions

**Case Q1:** What operating system was used on the computer?  
**Answer:** Microsoft Windows XP (Version 5.1, Build 2600). The ProductName registry value in HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion confirms this.

**Case Q2:** Who is the registered owner?  
**Answer:** Greg Schardt. The RegisteredOwner registry value in HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion contains this name.

**Case Q3:** Perform a Anti-Virus check. Are there any viruses on the computer?  
**Answer:** No viruses detected. ClamAV anti-virus scan of the complete disk image returned "OK" with zero detections.

---

### Recommendations

1. Seizure and preservation of this device is appropriate given clear linkage to suspect and evidence of hacking tool installation
2. Further analysis of internet cache and email archives may reveal specific targets of wardriving attacks
3. Coordinate with ISPs to identify wireless access points in suspect's known operating areas
4. Compare installed tools with known compromised systems in the investigation