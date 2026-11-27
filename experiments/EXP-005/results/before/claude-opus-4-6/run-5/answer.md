I now have comprehensive evidence across all phases. Let me compile the final report.

---

# Digital Forensic Examination Report — Case pc-triage-trudi

## Evidence Summary

| Item | Value |
|------|-------|
| Evidence | PC-triage.zip (14,315,429 bytes) |
| SHA-256 | `6bef01b07b3640930713770ba868621940a7a798576b7542c6f1ebc7da24ccfc` |
| MD5 | `3743fb5b367adf5fb9cd2256d82b4afd` |
| SHA-1 | `94bc5451ae7b3a436b1966acc21ca5fc50dedeb3` |
| System | INFORMANT-PC, Windows 7 x64 (Workstation), VMware VM |
| IP | 10.11.11.129 (DHCP), DNS 10.11.11.2, Gateway 10.11.11.254 |
| Timezone | Eastern Standard Time (UTC-4 during DST in March 2015) |
| Activity Window | 2015-03-22 to 2015-03-25 |

**Artifacts parsed:** SYSTEM, SOFTWARE, SAM, SECURITY registry hives; Security.evtx (1,193 events), Application.evtx (956 events), TerminalServices-LocalSessionManager%4Operational.evtx (35 events); ShimCache (292 entries in ControlSet001). Prefetch files are present in the collection but could not be parsed (tool unavailable on this platform); ShimCache execution flags (valid on Windows 7) provide corroborating execution evidence.

## User Accounts (from SAM — call_id 17)

| Username | RID | Created | Last Login | Group Memberships | Created By |
|----------|-----|---------|------------|-------------------|------------|
| Administrator | 500 | (default) | 2010-11-21 | Administrators | System (disabled) |
| informant | 1000 | 2015-03-22 14:33:54 | 2015-03-25 14:45:59 | Administrators | SYSTEM (setup) |
| admin11 | 1001 | 2015-03-22 15:51:54 | 2015-03-22 15:57:02 | **Administrators** | informant |
| ITechTeam | 1002 | 2015-03-22 15:52:30 | (never) | **Administrators** | informant |
| temporary | 1003 | 2015-03-22 15:53:01 | 2015-03-22 15:55:57 | Users | informant |

## Key Timeline

| Date/Time (UTC) | Event | Source (call_id) |
|-----------------|-------|------------------|
| 2015-03-22 14:33:54 | System setup; informant account created | Security 4720 (18) |
| 2015-03-22 14:34:28 | informant interactive logon (Type 2) | Security 4624 (16) |
| 2015-03-22 14:37:43 | Windows Time service **disabled** | System 7040 (26) |
| 2015-03-22 15:00-15:04 | Microsoft Office 2013 installed | System 7045 (23) |
| 2015-03-22 15:11 | Google Chrome installed | System 7045 (23) |
| 2015-03-22 15:51:54 | **admin11** created by informant, added to Administrators | Security 4720/4732 (18, 19) |
| 2015-03-22 15:52:30 | **ITechTeam** created by informant, added to Administrators | Security 4720/4732 (18, 19) |
| 2015-03-22 15:53:01 | **temporary** created by informant (Users group only) | Security 4720 (18) |
| 2015-03-22 15:53:44 | admin11 interactive logon | Security 4624 (16) |
| 2015-03-22 15:55:57 | temporary interactive logon | Security 4624 (16) |
| 2015-03-23 19:56 | googledrivesync.exe and icloudsetup.exe downloaded/executed | ShimCache (27) |
| 2015-03-23 20:00 | Google Drive, Apple/Bonjour installed | Uninstall (31), System 7045 (23) |
| **2015-03-23 20:23:27** | **informant uses "Company" credentials to access Company-PC** | Security 4648 (20) |
| **2015-03-24 13:37-13:58** | **Two SanDisk Cruzer Fit USB drives connected** (S/N: ...1593, ...6501) | SYSTEM USBSTOR (33) |
| **2015-03-24 13:47:06** | **informant uses "Company" credentials to access Company-PC** | Security 4648 (20) |
| **2015-03-25 14:47-14:48** | **Eraser 6.2.0.2962.exe and ccsetup504.exe downloaded** to Desktop\Download | ShimCache (15, 27) |
| 2015-03-25 14:50-14:57 | .NET Framework 4 and Eraser installed | Uninstall (31), System 7045 (23) |
| **2015-03-25 14:57:31** | **Eraser added to Run key** (persistence: /atRestart) | SOFTWARE Run (32) |
| 2015-03-25 15:30:57 | informant logoff (final user event) | Security 4647 (21) |
| 2015-03-25 15:31:05 | System shutdown | SYSTEM registry (24) |

## Case Questions

Case Q1: Attack lifecycle phase assessment:

**1. Reconnaissance — ESTABLISHED.**
Evidence: `ping.exe` executed on the system (ShimCache position 81, Executed=Yes, call_id 15; Prefetch PING.EXE-371F41E2.pf present, call_id 8). `netsh.exe` also executed (ShimCache position 290, Executed=Yes, call_id 15), which can enumerate network configuration. The 4648 explicit credential events targeting "Company-PC" (call_id 20) also indicate the user knew of and targeted a specific network host. No dedicated scanning tools (nmap, etc.) were found.

**2. Initial Access — NOT APPLICABLE (insider threat).**
Evidence: The user "informant" was the original account created during OS setup (Security event 4720 by SYSTEM at 2015-03-22 14:33:54, call_id 18). All subsequent malicious actions originate from this account. This is consistent with an insider threat scenario, not an external compromise. No exploitation tools, phishing documents, or external attack vectors were identified.

**3. Execution — ESTABLISHED.**
Evidence: ShimCache (call_id 15) with Executed=Yes flags (valid on Windows 7) confirms execution of: `wevtutil.exe` (positions 99-101), `sc.exe` (position 103), `schtasks.exe` (positions 47-48, 135), `netsh.exe` (position 290), `WScript.exe` (position 222), `Eraser.exe` (position 19), `CCleaner64.exe` (position 61), and `ccsetup504.exe` (position 83). Prefetch files for all these executables are present in the collection (call_id 8) but could not be parsed (tool unavailable).

**4. Persistence — ESTABLISHED.**
Evidence: (a) Eraser.exe was added to the system-wide Run key at `SOFTWARE\Microsoft\Windows\CurrentVersion\Run` with the value `"C:\Program Files\Eraser\Eraser.exe" /atRestart`, last written 2015-03-25 14:57:31 (call_id 32). (b) Three new user accounts were created by informant on 2015-03-22, two of which (admin11, ITechTeam) were elevated to the Administrators group (call_id 18, 19), providing persistent privileged access through alternative credentials.

**5. Privilege Escalation — ESTABLISHED.**
Evidence: The informant user (already an Administrator) created admin11 and ITechTeam and added both to the local Administrators group via Security events 4732 (call_id 19). This created additional administrator-level accounts. The admin11 account was used for interactive logon at 15:53:44 and 15:57:02 on 2015-03-22 (call_id 16). These actions demonstrate deliberate privilege distribution to alternative identities.

**6. Defense Evasion / Anti-Forensics — ESTABLISHED.**
Evidence: (a) **Eraser 6.2.0.2962** (secure file deletion tool) downloaded to `C:\Users\informant\Desktop\Download\` and installed 2015-03-25 (ShimCache call_id 15/27; Uninstall call_id 31; Run key call_id 32). (b) **CCleaner** (system/browser cleanup tool) downloaded from `C:\Users\informant\Desktop\Download\ccsetup504.exe` on 2015-03-25 (ShimCache call_id 15; Prefetch CCLEANER64.EXE-779BD542.pf present, call_id 8). (c) **wevtutil.exe** executed (ShimCache call_id 15, Executed=Yes; Prefetch WEVTUTIL.EXE files present, call_id 8) — this tool can clear Windows event logs. (d) Windows Time service was **disabled** at 2015-03-22 14:37:43 (call_id 26), which can hamper timeline analysis. (e) Notably, the Security log contains **zero 4625** (failed logon) and **zero 4688** (process creation) events — the absence of 4688 may indicate the audit policy was not enabled, but the complete absence of 4625 across 1,193 security events is unusual.

**7. Credential Access — ESTABLISHED.**
Evidence: informant created three accounts and set/reset their passwords: admin11 (4724 at 15:52:10), ITechTeam (4724 at 15:52:45), temporary (4724 at 15:53:11), all on 2015-03-22 (call_id 18). The informant then used explicit credentials as "Company" to authenticate to "Company-PC" (4648 events at 2015-03-23 20:23:27 and 2015-03-24 13:47:06, call_id 20), indicating possession and use of credentials for another identity on a different system.

**8. Lateral Movement — ESTABLISHED.**
Evidence: Two Security event 4648 (explicit credential logon) entries show the informant user authenticated as `INFORMANT-PC\Company` targeting `Company-PC` on 2015-03-23 at 20:23:27 and 2015-03-24 at 13:47:06 (call_id 20). The PID was 0x4 (System process), consistent with SMB/network-level authentication such as mapped drives or UNC path access. RDP inbound was disabled on this machine (fDenyTSConnections=1, call_id 22), and all Terminal Services session logons were LOCAL (call_id 25), so this machine was not an RDP target.

**9. Collection / Staging — ESTABLISHED.**
Evidence: (a) **Google Drive** sync client installed 2015-03-23 (ShimCache call_id 27, Uninstall call_id 31) — cloud sync provides a staging/exfiltration channel. (b) **iCloud** setup downloaded and executed 2015-03-23 (ShimCache call_id 27) — another cloud storage channel. (c) Two **SanDisk Cruzer Fit USB flash drives** were connected on 2015-03-24 between 13:37 and 13:58 (SYSTEM USBSTOR call_id 33), serial numbers 4C530012450531101593 and 4C530012550531106501, providing removable media for data staging or exfiltration.

**10. Exfiltration — EXAMINED, evidence suggestive but not conclusive.**
Evidence: The combination of cloud sync tools (Google Drive, iCloud) installed the day before anti-forensics tools, plus two USB drives connected the same day as the second lateral movement attempt to Company-PC, strongly suggests exfiltration capability and intent. However, without file system analysis ($MFT, USN journal), NTUSER.DAT (UserAssist, RecentDocs, shellbags), or network traffic, actual data transfer cannot be confirmed from this triage collection alone.

**11. Impact — EXAMINED, anti-forensics intent established.**
Evidence: The installation of Eraser (with /atRestart persistence) and CCleaner on the final day of activity (2015-03-25), combined with the system shutdown at 15:31:05, indicates the user was preparing to or had already begun destroying evidence. No ransomware, wiper malware, or other destructive payloads were identified. The impact appears to be data theft (insider threat) rather than system destruction.

---

**Collection gaps:** No NTUSER.DAT files were included in the triage collection, so UserAssist, shellbags, RecentDocs, and typed URLs could not be examined. No $MFT or USN journal was collected, preventing file-level timeline analysis. Prefetch files are present but could not be parsed on this analysis platform (tool unavailable). No PowerShell, Sysmon, or TaskScheduler event logs were included. These gaps limit the ability to confirm exfiltration specifics and detailed command-line activity.