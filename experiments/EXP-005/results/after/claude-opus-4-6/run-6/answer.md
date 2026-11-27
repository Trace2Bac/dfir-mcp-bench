I now have a comprehensive picture across all attack lifecycle phases. Let me compile the final report.

---

# Digital Forensic Examination Report

## Case: pc-triage-trudi

### Evidence

- **Source**: `/evidence/pc-triage/PC-triage.zip` (14,315,429 bytes)
- **SHA-256**: `6bef01b07b3640930713770ba868621940a7a798576b7542c6f1ebc7da24ccfc` (call_id 3)
- **Contents**: Registry hives (SYSTEM, SOFTWARE, SAM, SECURITY), Event logs (Security, System, Application, TerminalServices-LocalSessionManager), Prefetch directory (95 files)
- **Not collected**: NTUSER.DAT, MFT, Amcache, Sysmon logs, PowerShell logs, browser history, firewall/proxy logs

### System Profile

| Attribute | Value | Source |
|---|---|---|
| Computer Name | informant-PC | SAM/event logs (call_id 22, 27) |
| OS | Windows 7 x64 SP1 | ShimCache (call_id 10) |
| IP Address | 10.11.11.129 (DHCP) | SYSTEM registry (call_id 30) |
| Subnet | 10.11.11.0/24 | SYSTEM registry (call_id 30) |
| Gateway/DNS | 10.11.11.2 | SYSTEM registry (call_id 30) |
| Platform | VMware virtual machine | SCSI/NIC device entries (call_id 37) |
| Network | wired, domain: localdomain | RegRipper networklist (call_id 31) |
| RDP | Inbound denied (fDenyTSConnections=1) | SYSTEM registry (call_id 30) |

### User Accounts (call_id 22, 23, 28)

| Account | RID | Created | Last Login | Groups | Notes |
|---|---|---|---|---|---|
| Administrator | 500 | OS install | 2010-11-21 03:47 | Admins | Disabled |
| Guest | 501 | OS install | Never | Guests | Disabled |
| **informant** | 1000 | 2015-03-22 14:33:54 | 2015-03-25 14:45:59 | **Admins**, Users | Primary user; PasswordNotRequired |
| **admin11** | 1001 | 2015-03-22 15:51:54 | 2015-03-22 15:57:02 | **Admins**, Users | Created by informant |
| **ITechTeam** | 1002 | 2015-03-22 15:52:30 | Never | **Admins**, Users | Created by informant |
| **temporary** | 1003 | 2015-03-22 15:53:01 | 2015-03-22 15:55:57 | Users only | Created by informant |

All three suspicious accounts (admin11, ITechTeam, temporary) were created within ~70 seconds (15:51:54 to 15:53:01 on 2015-03-22) from informant's session (SubjectLogonId: 0x224E3).

---

### Case Questions

Case Q1: Attack Lifecycle Phase Assessment

**1. Reconnaissance -- ESTABLISHED**
Evidence: PING.EXE executed on 2015-03-25 14:58:34 (Prefetch RunCount: 1, call_id 21). Credential-based access to "Company-PC" on 2015-03-23 20:23:27 and 2015-03-24 13:47:06 (Security event 4648, call_id 26) demonstrates awareness of network hosts. No proxy or DNS logs were available to assess deeper network reconnaissance.

**2. Initial Access -- ESTABLISHED (Insider Threat)**
The threat actor is the authorized local user "informant" (RID 1000) who already holds administrator privileges on informant-PC. First interactive logon (Type 2) at 2015-03-22 14:34:28 (Security 4624, call_id 24). No evidence of external exploitation; this is an insider threat scenario. The user's profile path (INFORM~1) is the only profile referenced across all artifacts (Prefetch, ShimCache, call_id 20, 21).

**3. Execution -- ESTABLISHED**
Multiple administrative and suspicious tools were executed (Prefetch, call_id 21; ShimCache, call_id 20, 34):
- cmd.exe (ShimCache Executed=Yes, both 32- and 64-bit)
- schtasks.exe (Prefetch RunCount: 2, last run 2015-03-25 15:18:37)
- sc.exe (Prefetch RunCount: 8, last run 2015-03-25 14:54:07)
- wevtutil.exe (Prefetch: 4+2 runs across two .pf files, last run 2015-03-25 14:54:09)
- netsh.exe (Prefetch RunCount: 2, last run 2015-03-25 10:18:13)
- ping.exe (Prefetch RunCount: 1, last run 2015-03-25 14:58:34)
- WScript.exe (ShimCache Executed=Yes, call_id 34)
- Eraser.exe (Prefetch RunCount: 2, last run 2015-03-25 15:13:30)
- CCleaner64.exe (Prefetch RunCount: 2, last run 2015-03-25 15:15:50)
No process creation auditing (Event ID 4688) was enabled, so command-line arguments are not available.

**4. Persistence -- ESTABLISHED**
Multiple persistence mechanisms were established:
- **Account creation**: Three new accounts (admin11, ITechTeam, temporary) created 2015-03-22 15:51-15:53 (Security 4720, call_id 23). admin11 and ITechTeam were added to the Administrators group (Security 4732, call_id 23).
- **Autorun**: Eraser.exe registered as a system-level Run key: `"C:\Program Files\Eraser\Eraser.exe" /atRestart` (SOFTWARE registry, call_id 29; last write 2015-03-25 14:57:31).
- **Scheduled Tasks**: SCHTASKS.EXE was executed twice (Prefetch, call_id 21). TaskCache shows task entries created on 2015-03-22 at 15:01, 15:04, 15:11, and 15:23 (SOFTWARE registry, call_id 29) during the attack window.

**5. Privilege Escalation -- ESTABLISHED**
The user "informant" already held administrator rights. Additionally:
- admin11 (SID ...1001) added to Administrators group at 2015-03-22 15:51:54 (Security 4732, call_id 23)
- ITechTeam (SID ...1002) added to Administrators group at 2015-03-22 15:52:30 (Security 4732, call_id 23)
- Both logon sessions for admin11 received full administrative privileges (Security 4672 showing SeSecurityPrivilege, SeDebugPrivilege, etc., call_id 28)

**6. Credential Access -- NOT EXAMINED (insufficient data)**
No NTUSER.DAT was collected (no UserAssist, no browser stored credentials). No Sysmon or process audit logs to detect credential dumping tools (mimikatz, etc.). However, password resets (Security 4724) were performed on all three newly created accounts from informant's session (call_id 23). No external credential theft is indicated; this is an insider who sets their own passwords.

**7. Lateral Movement -- ESTABLISHED**
Security event 4648 (call_id 26) shows explicit credential logon attempts to a different host:
- 2015-03-23 20:23:27 -- Target: `INFORMANT-PC\Company` to `Company-PC` (PID: 0x4, kernel-level)
- 2015-03-24 13:47:06 -- Target: `INFORMANT-PC\Company` to `Company-PC` (PID: 0x4, kernel-level)
The PID 0x4 (System process) indicates network-level authentication, consistent with SMB file access or mapped drives to Company-PC. The use of a "Company" account (not among local SAM accounts) suggests domain or network credentials were used. All TerminalServices sessions show "LOCAL" source addresses (call_id 27), ruling out inbound RDP. RDP inbound was disabled (fDenyTSConnections=1, call_id 30).

**8. Exfiltration -- ESTABLISHED (means identified, transfer volume unknown)**
Multiple exfiltration channels were available:
- **USB Storage**: Two SanDisk Cruzer Fit USB drives were connected on 2015-03-24 (USBSTOR registry, call_id 37):
  - Serial 4C530012450531101593, first connected 2015-03-24 13:37:59
  - Serial 4C530012550531106501, first connected 2015-03-24 13:58:32
- **Google Drive**: googledrivesync.exe was downloaded (ShimCache: `C:\Users\informant\Downloads\googledrivesync.exe`, call_id 35), installed 2015-03-23 (Installed Software registry, call_id 29), and executed (Prefetch RunCount: 2, LastRun: 2015-03-25 15:21:31, call_id 21).
- **Network access to Company-PC**: Two separate sessions accessing Company-PC with explicit credentials (call_id 26) could represent either lateral movement or data staging/collection from that host.
- No network flow data, proxy logs, or firewall logs were available to quantify actual data transferred.

**9. Anti-Forensics / Defense Evasion -- ESTABLISHED**
Extensive anti-forensics activity was performed on 2015-03-25, the last day of activity:
- **Eraser 6.2.0.2962**: Downloaded from `C:\Users\informant\Desktop\Download\` (ShimCache, call_id 34), installed 2015-03-25 14:50:14 (Prefetch, call_id 21), executed twice (last run 15:13:30). Configured for autostart at reboot (Run key, call_id 29). Eraser performs secure file deletion, overwriting files to prevent recovery.
- **CCleaner 5.04**: Installer (CCSetup504.exe) run 2015-03-25 14:57:56; CCleaner64.exe run twice, last at 15:15:50 (Prefetch, call_id 21). CCleaner cleans browser history, temp files, recent document lists, and registry entries.
- **wevtutil.exe**: 6 executions across two Prefetch files, last run 2015-03-25 14:54:09 (call_id 21). This tool can clear or export Windows event logs. Its execution immediately before the Eraser and CCleaner runs is consistent with log tampering.
- **Account usage pattern**: admin11 and temporary were each used for only a few minutes on 2015-03-22 (TerminalServices, call_id 27), then logged off -- suggesting compartmentalized activity under alternate identities.

**10. Impact -- NOT EXAMINED (insufficient data)**
No evidence of data destruction (beyond Eraser's potential use), ransomware, or system sabotage in the available artifacts. The triage collection lacks file system evidence ($MFT, file contents) needed to determine what files were erased or modified. The Eraser tool was present and configured to auto-run, but what it deleted cannot be determined from this collection alone.

### Timeline of Key Events

| Date/Time (UTC) | Event |
|---|---|
| 2015-03-22 14:33:54 | Account "informant" created; added to Administrators |
| 2015-03-22 14:34:28 | informant first interactive logon (Type 2) |
| 2015-03-22 15:51:54 | Account "admin11" created, added to Administrators (by informant) |
| 2015-03-22 15:52:30 | Account "ITechTeam" created, added to Administrators (by informant) |
| 2015-03-22 15:53:01 | Account "temporary" created, added to Users (by informant) |
| 2015-03-22 15:53:44 | admin11 interactive logon (Session 2) |
| 2015-03-22 15:55:52 | admin11 logs off |
| 2015-03-22 15:55:57 | temporary interactive logon (Session 3) |
| 2015-03-22 15:56:58 | temporary logs off |
| 2015-03-22 15:57:02 | admin11 second interactive logon |
| 2015-03-22 15:57:41 | admin11 logs off; informant reconnects |
| 2015-03-23 19:56 | Google Drive installer downloaded |
| 2015-03-23 20:02 | Google Drive installed |
| 2015-03-23 20:23:27 | Credential logon targeting Company-PC as "Company" |
| 2015-03-24 13:37:59 | First SanDisk USB drive connected |
| 2015-03-24 13:47:06 | Second credential logon targeting Company-PC |
| 2015-03-24 13:58:32 | Second SanDisk USB drive connected |
| 2015-03-25 14:45:59 | informant final interactive logon |
| 2015-03-25 14:50:14 | Eraser 6.2.0.2962 installer executed |
| 2015-03-25 14:54:09 | wevtutil.exe executed (possible log clearing) |
| 2015-03-25 14:57:56 | CCSetup504.exe (CCleaner installer) executed |
| 2015-03-25 15:13:30 | Eraser.exe last execution |
| 2015-03-25 15:15:50 | CCleaner64.exe last execution |
| 2015-03-25 15:21:31 | Google Drive Sync last execution |
| 2015-03-25 15:30:57 | informant final logoff |

### Gaps and Limitations

- **No NTUSER.DAT**: UserAssist, RecentDocs, TypedPaths, browser history, and MRU lists are unavailable. This limits attribution of specific file/folder access to user sessions.
- **No process auditing (4688)**: Command-line arguments for all executed tools are unknown.
- **No Sysmon/PowerShell logs**: Detailed process trees, network connections, and script content are unavailable.
- **No MFT/USN Journal**: File creation, deletion, and modification timeline cannot be reconstructed.
- **No Amcache**: SHA-1 hashes of executed programs cannot be verified.
- **No network captures/proxy/firewall logs**: Actual data volumes transferred via Google Drive, USB, or SMB to Company-PC cannot be determined.
- **Anti-forensics impact**: The execution of Eraser and CCleaner on 2015-03-25 likely destroyed evidence that would have been present in browser caches, temp files, and potentially targeted files.