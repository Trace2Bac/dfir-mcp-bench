Now I'll compile my final forensic investigation report.

---

# FORENSIC INVESTIGATION REPORT
## Case: NIST Hacking Case - Dell CPi Notebook (Serial: VLQLW)

### Executive Summary

This forensic examination of the abandoned Dell Latitude CPi notebook computer (serial number VLQLW) recovered on 09/20/04 revealed extensive evidence of hacking-related activities. The computer was running Microsoft Windows XP and was registered to Greg Schardt. The system contained numerous hacking tools and technical documentation organized systematically in folders labeled for reconnaissance, enumeration, exploitation, and footprinting phases of attack. These findings strongly tie the computer to suspected hacker "Mr. Evil" (online alias for Greg Schardt).

### Investigation Methodology

1. **Evidence Collection**: The EnCase image was extracted from the E01 segmented image file
2. **File System Analysis**: TSK fls was run to create a comprehensive file listing
3. **Malware Detection**: ClamAV antivirus scanning was performed across the entire image
4. **Registry Analysis**: Windows registry hives were extracted and analyzed for system configuration data
5. **Pattern Recognition**: File and folder structures were analyzed to identify organized hacking activities

### Key Findings

#### 1. System Identification

The investigation established the following baseline system information:
- **Operating System**: Microsoft Windows XP (Version 5.1, Build 2600)
- **Registered Owner**: Greg Schardt
- **Installation Date**: August 27, 2004
- **Time Zone**: Central Time (UTC -6/UTC -5 DST)
- **Product ID**: 55274-640-0147306-23684

#### 2. Suspect Identification

Strong evidence linking the computer to the suspect "Mr. Evil" was discovered:
- A user account named "Mr. Evil" exists on the system
- This matches the known online alias of suspect Greg Schardt
- The account contains extensive hacking-related files and tools
- Browser history and temporary internet files show wardriving-related searches
- Outlook Express mail folder "alt.hacking.dbx" found in the Mr. Evil account

#### 3. Hacking Tools and Evidence

**Installed Applications:**
- **Ethereal** (version 0.10.6): Professional network protocol analyzer installed in Program Files
- Referenced in Start Menu and Prefetch data showing recent execution
- Installed shortcuts indicating regular use

**Tools Organized by Attack Phase:**

**FOOTPRINTING Phase** (My Documents/FOOTPRINTING/):
- **Nmap NT**: Network mapping and reconnaissance tool with full source code
- **NST Pro 2**: Network scanning toolkit
- **Spade114**: Port scanning utility
- **Superscan**: Network enumeration tool

**ENUMERATION Phase** (My Documents/ENUMERATION/):
- **Cerberus Internet Scanner**: Comprehensive network scanning tool with scan reports
- **Enum**: Windows enumeration tool with source code included

**EXPLOITATION Phase** (My Documents/EXPLOITATION/):
- **Brutus**: Remote access and password testing tool with documentation
  - Contains "NetBus.bad" configuration file
  - Documentation and user files present
- **Pwdump3**: Windows password dumping utility with ZIP archive and documentation
- **dsniff 2.3**: Network sniffing tool documented as "Switched networks lose security advantage"

**Supporting Tools:**
- **Anonymizer**: Internet privacy/anonymization software (Program Files/Anonymizer)
- **WinPcap 3.01**: Network packet capture library (Prefetch shows recent execution)
- **Whois**: NSLOOKUP and whois utilities (Desktop shortcut found in Mr. Evil account)

#### 4. Evidence of Activity

**Browser History Evidence:**
- Cached web content related to "wardriving" found in Mr. Evil's temporary internet files
- Browsing history spans from August 16-23, 2004
- Multiple cache folders showing consistent internet access patterns

**Execution Evidence:**
- Prefetch analysis shows multiple executions of suspicious tools:
  - CAIN25B45.EXE (password cracking tool)
  - ETHEREAL.EXE
  - TELNET.EXE
  - CMD.EXE (command-line access)
  - WINPCAP installation executables

**Documentation and Learning Materials:**
- Extensive documentation for each tool category
- README and OVERVIEW documents for exploitation tools
- Nmap source code and usage documentation
- Training materials indicating methodical study of hacking techniques

#### 5. Anti-Virus Scan Results

**ClamAV Scan Result**: OK (0 detections)

The comprehensive antivirus scan of the entire disk image detected no known virus signatures. While the system is clean of known malware, it contains numerous legitimate but potentially dangerous hacking and network analysis tools.

### Conclusion

This Dell CPi notebook represents a complete toolkit for network reconnaissance, enumeration, and exploitation phases of a structured attack methodology. The organized folder structure (FOOTPRINTING, ENUMERATION, EXPLOITATION) suggests systematic study and preparation for conducting attacks. The presence of a user account named "Mr. Evil" combined with hacking tools and wardriving-related evidence strongly ties this computer to the suspect Greg Schardt. The recent installation date (August 27, 2004) and active usage patterns prior to recovery support the theory that this was an active attack platform used for intercepting wireless traffic and gathering credentials at public hotspots like T-Mobile WiFi locations.

---

## Case Questions

Case Q1: What operating system was used on the computer?
**Answer: Microsoft Windows XP (Version 5.1, Build 2600)** - Confirmed from SOFTWARE registry hive, CurrentVersion key showing ProductName="Microsoft Windows XP", CurrentVersion="5.1", and CurrentBuildNumber="2600".

Case Q2: Who is the registered owner?
**Answer: Greg Schardt** - Confirmed from SOFTWARE registry hive, Microsoft\Windows NT\CurrentVersion key showing RegisteredOwner="Greg Schardt". The system also contains a user account named "Mr. Evil" (the suspect's known online alias).

Case Q3: Perform an Anti-Virus check. Are there any viruses on the computer?
**Answer: No viruses detected** - ClamAV antivirus scan of the entire disk image returned "OK" with zero detections. The system is clean of known virus signatures, though it contains numerous legitimate hacking and network analysis tools used for reconnaissance and exploitation activities.