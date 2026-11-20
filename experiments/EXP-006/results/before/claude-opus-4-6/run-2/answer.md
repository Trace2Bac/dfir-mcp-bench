I now have comprehensive data across all major artifact categories. Let me compile the final report.

---

# Digital Forensic Report: PC-Triage Investigation

## Case ID: pc-triage-trudi

### Evidence Summary

| Item | Detail |
|---|---|
| **Evidence File** | /evidence/pc-triage/PC-triage.zip |
| **SHA-256** | 6bef01b07b3640930713770ba868621940a7a798576b7542c6f1ebc7da24ccfc |
| **MD5** | 3743fb5b367adf5fb9cd2256d82b4afd |
| **SHA-1** | 94bc5451ae7b3a436b1966acc21ca5fc50dedeb3 |
| **Computer Name** | INFORMANT-PC |
| **OS** | Windows 7 x64 (ProductType: WinNT) |
| **Time Zone** | Eastern Standard Time (UTC-5 / EDT UTC-4) |
| **IP Address** | 10.11.11.129 (DHCP, gateway 10.11.11.2) |
| **Platform** | VMware virtual machine |
| **Evidence Date Range** | 2015-03-22 to 2015-03-25 |

*Evidence integrity verified (call_id 3).*

### User Accounts (from SAM hive, call_id 22)

| Username | RID | Created | Last Logon | Group Membership | Notes |
|---|---|---|---|---|---|
| Administrator | 500 | OS install | 2010-11-21 | Administrators | Disabled |
| Guest | 501 | OS install | Never | Guests | Disabled |
| **informant** | 1000 | 2015-03-22 14:33:54 | 2015-03-25 14:45:59 | **Administrators** | Primary user |
| **admin11** | 1001 | 2015-03-22 15:51:54 | 2015-03-22 15:57:02 | **Administrators** | Created by informant |
| **ITechTeam** | 1002 | 2015-03-22 15:52:30 | Never | **Administrators** | Created by informant |
| **temporary** | 1003 | 2015-03-22 15:53:01 | 2015-03-22 15:55:57 | Users | Created by informant |

The "informant" user created three additional accounts on 2015-03-22 at ~15:51-15:53 UTC, two of which (admin11, ITechTeam) were added to the Administrators group (call_id 21, 22).

---

## Case Questions

Case Q1: Attack lifecycle phase-by-phase assessment:

**1. Reconnaissance — ESTABLISHED.**
Evidence: ping.exe was executed (ShimCache entry with Executed=Yes flag, call_id 18). NETSH.EXE has a Prefetch file indicating execution (call_id 7). These are consistent with network discovery activity. On 2015-03-23 20:23:27 and 2015-03-24 13:47:06, explicit credential logon events (Event ID 4648) targeted "Company-PC" with username "Company," demonstrating the user probed another host on the network (call_id 23).

**2. Initial Access — ESTABLISHED (insider threat).**
Evidence: This is not an external compromise. The "informant" user held a legitimate local administrator account (created 2015-03-22 14:33:54, added to Administrators group) and logged on interactively (Type 2) repeatedly throughout the investigation window (call_id 20, 21). All logons were local console sessions via User32 (call_id 20), with no evidence of external exploitation, phishing payloads, or remote exploitation tools. The threat actor is an authorized insider.

**3. Execution — ESTABLISHED.**
Evidence: Prefetch and ShimCache confirm execution of numerous tools (call_id 8, 9, 18, 19):
- Eraser 6.2.0.2962.exe (installer from Desktop\Download, Prefetch last run 2015-03-25 14:50:14)
- Eraser.exe (Prefetch last run 2015-03-25 15:13:30, run count 2)
- CCleaner64.exe (ShimCache Executed=Yes)
- ccsetup504.exe (ShimCache Executed=Yes, from Desktop\Download)
- cmd.exe (ShimCache Executed=Yes, both System32 and SysWOW64)
- schtasks.exe (ShimCache Executed=Yes, SysWOW64 version)
- sc.exe (ShimCache Executed=Yes)
- wevtutil.exe (ShimCache Executed=Yes, both System32 and SysWOW64)
- WScript.exe (ShimCache Executed=Yes)
- ping.exe (ShimCache Executed=Yes, SysWOW64 version)
- googledrivesync.exe (ShimCache Executed=Yes)

**4. Persistence — ESTABLISHED.**
Evidence: (a) Eraser was added to the SOFTWARE Run key: `"C:\Program Files\Eraser\Eraser.exe" /atRestart` at 2015-03-25 14:57:31, configured to perform secure deletion on every restart (call_id 28). (b) Three additional user accounts were created with administrator privileges, providing persistent access channels (call_id 21, 22). (c) schtasks.exe was executed (ShimCache, call_id 18), and a Prefetch file for SCHTASKS.EXE exists (call_id 7), indicating scheduled task creation activity. No suspicious third-party services were installed; all 7045 events corresponded to legitimate software (Office, Google Update, .NET Framework, Bonjour, etc.) (call_id 31).

**5. Privilege Escalation — ESTABLISHED.**
Evidence: The "informant" user (already an Administrator) created admin11 and ITechTeam accounts and explicitly added them to the Administrators group via Event ID 4732 (call_id 21). LogonId 0x224E3 (the informant user's session starting 2015-03-22 15:24:03) performed all three account creations. The informant account itself was added to Administrators at account creation by SYSTEM (LogonId 0x3E7) (call_id 21).

**6. Defense Evasion — ESTABLISHED.**
Evidence: This is the strongest phase of the attack. Multiple anti-forensics tools were used:
- **Eraser** (secure file deletion): Downloaded 2015-03-25 ~14:47, installed 14:50, executed 15:13:30 (Prefetch run count 2, call_id 19). Registered as a Run key autostart with `/atRestart` to wipe on reboot (call_id 28).
- **CCleaner**: CCleaner64.exe and CCleaner.exe present in ShimCache with Executed=Yes (call_id 18). Then `uninst.exe` (CCleaner uninstaller) was run at 2015-03-25 15:18:29 (Prefetch, call_id 19) — the user cleaned the system with CCleaner and then uninstalled CCleaner itself to remove traces.
- **wevtutil.exe**: Both System32 and SysWOW64 versions show Executed=Yes in ShimCache (call_id 18). wevtutil can clear, export, or query event logs. No Event ID 1102 (audit log cleared) was observed in the Security log, but the Security log only contains 1,193 records starting from 2015-03-22 (call_id 10), suggesting logs may have been selectively managed or the system was freshly built.
- The absence of NTUSER.DAT files in the triage collection limits full user activity reconstruction.

**7. Credential Access — NOT ESTABLISHED.**
Evidence: No credential dumping tools (mimikatz, pwdump, etc.) were found in ShimCache or Prefetch. The 4648 explicit credential events show use of known account credentials (informant, admin11, temporary, Company) but not evidence of credential theft (call_id 23). No Event ID 4625 (failed logon) events were recorded, and no brute-force patterns are visible. However, the absence of such evidence is not conclusive given the anti-forensics tools used.

**8. Discovery — ESTABLISHED.**
Evidence: Multiple discovery tools were executed (ShimCache Executed=Yes, call_id 18):
- ping.exe — network host discovery
- netsh.exe — Prefetch file exists (call_id 7), network/firewall configuration enumeration
- sc.exe — service enumeration
- schtasks.exe — scheduled task enumeration
- The 4648 events to "Company-PC" (call_id 23) demonstrate the user was actively probing the network for other hosts.

**9. Lateral Movement — ESTABLISHED.**
Evidence: Two Event ID 4648 (explicit credential logon) events at 2015-03-23 20:23:27 and 2015-03-24 13:47:06 show authentication attempts from INFORMANT-PC to "Company-PC" using the account name "Company" (call_id 23). The source PID 0x4 (System process) indicates SMB-based network authentication. This demonstrates the user attempted to access another system on the 10.11.11.0/24 network. No evidence of remote code execution on the target was available from this machine's artifacts.

**10. Collection — ESTABLISHED (circumstantial).**
Evidence: Google Drive Sync was installed and executed (ShimCache Executed=Yes, call_id 18). Two SanDisk Cruzer Fit USB drives (VID 0781, PID 5571) were connected to the system: serial 4C530012450531101593 at 2015-03-24 13:38:00 and serial 4C530012550531106501 at 2015-03-24 13:58:33 (call_id 30). These are potential staging/collection vectors. The subsequent use of Eraser (secure deletion) on 2015-03-25 suggests data may have been collected and then source files destroyed. However, no specific evidence of archiving tools (7-zip, WinRAR) or data staging directories was found.

**11. Command and Control — NOT ESTABLISHED.**
Evidence: No evidence of C2 frameworks, reverse shells, remote administration tools, or beaconing activity was found in ShimCache, Prefetch, or services. All network-aware applications (Chrome, IE, Outlook, Google Drive Sync) are legitimate. No suspicious services were installed (call_id 31). Note: without network traffic captures or proxy logs, C2 via legitimate channels (e.g., Google Drive) cannot be ruled out.

**12. Exfiltration — ESTABLISHED (circumstantial).**
Evidence: Two potential exfiltration channels were active: (a) Two SanDisk Cruzer Fit USB drives were connected on 2015-03-24 (call_id 30), providing a physical exfiltration path. (b) Google Drive Sync was installed and running (ShimCache, call_id 18), providing a cloud exfiltration path. Without NTUSER.DAT (UserAssist, RecentDocs, shellbags) or file system timeline data, the specific files transferred cannot be determined. The timing — USB insertion on March 24, followed by Eraser execution on March 25 — is consistent with a collect-then-destroy pattern.

**13. Impact / Actions on Objectives — ESTABLISHED.**
Evidence: The primary impact is **evidence destruction**:
- Eraser secure deletion tool executed at 2015-03-25 15:13:30, with run count 2, and configured to auto-run at restart (call_id 19, 28)
- CCleaner used for system artifact cleaning, then uninstalled at 15:18:29 (call_id 19)
- wevtutil.exe executed (call_id 18) — potential event log manipulation
- Three rogue administrator accounts created, providing alternative access paths (call_id 21, 22)
- The sequence of anti-forensics tool deployment on the final day (March 25) strongly indicates deliberate evidence destruction following completion of the attacker's objectives

### Key Timeline

| Timestamp (UTC) | Event |
|---|---|
| 2015-03-22 14:33:54 | "informant" account created, added to Administrators |
| 2015-03-22 14:34:28 | informant first interactive logon |
| 2015-03-22 15:11 | IE11, Chrome, Google Update installed |
| 2015-03-22 15:51-15:53 | admin11, ITechTeam, temporary accounts created by informant |
| 2015-03-22 15:53-15:57 | admin11 and temporary accounts logged on interactively |
| 2015-03-23 17:24 | informant logon session |
| 2015-03-23 20:00 | Bonjour/Apple software installed |
| 2015-03-23 20:23 | Explicit credential attempt to Company-PC as "Company" |
| 2015-03-24 13:21 | informant logon session |
| 2015-03-24 13:38-13:58 | Two SanDisk Cruzer Fit USB drives connected |
| 2015-03-24 13:47 | Second explicit credential attempt to Company-PC |
| 2015-03-25 13:06 | informant logon session |
| 2015-03-25 14:45 | informant logon (last login recorded in SAM) |
| 2015-03-25 ~14:47 | Eraser 6.2.0.2962.exe and ccsetup504.exe downloaded |
| 2015-03-25 14:50 | Eraser installer and .NET Framework 4 setup executed |
| 2015-03-25 14:57 | Eraser added to Run key (/atRestart) |
| 2015-03-25 15:13 | Eraser.exe executed (secure deletion) |
| 2015-03-25 15:18 | CCleaner uninst.exe executed (CCleaner removed) |
| 2015-03-25 15:30 | Last session logoff recorded |

### Gaps and Limitations

- **No NTUSER.DAT hives** in the collection: UserAssist, RecentDocs, TypedPaths, shellbags, and MRU data are unavailable.
- **No $MFT or USN journal**: File system timeline reconstruction is not possible.
- **No Sysmon or PowerShell event logs**: Detailed process creation and script execution logging unavailable.
- **No network captures**: Cannot determine what data traversed the network or was uploaded to Google Drive.
- **No Amcache**: Cannot cross-reference executable metadata.
- **Process auditing (4688) not enabled**: No process creation events in the Security log.
- **Anti-forensics tools were actively used**: Eraser and CCleaner may have destroyed additional evidence before this triage collection was taken.