I now have sufficient evidence across all attack lifecycle phases. Let me compile the final report.

---

# Digital Forensic Report: PC-Triage Investigation

## Case: pc-triage-trudi

## Evidence Summary

| Item | Value |
|------|-------|
| Evidence file | PC-triage.zip (SHA256: `6bef01b07b3640930713770ba868621940a7a798576b7542c6f1ebc7da24ccfc`) |
| Computer name | INFORMANT-PC |
| OS | Windows 7 x64 |
| Timezone | Eastern Standard Time (UTC-4 DST active) |
| IP Address | 10.11.11.129/24 (DHCP, VMware VM) |
| Primary user | informant (SID 1000, local admin) |
| Last shutdown | 2015-03-25 15:31:05 UTC |

## User Accounts (from SAM, call_id 23)

| Username | SID | Created | Group | Notes |
|----------|-----|---------|-------|-------|
| informant | 1000 | 2015-03-22 14:33:54 | Administrators | Primary user, system setup account |
| admin11 | 1001 | 2015-03-22 15:51:54 | Administrators | Created by informant, PasswordDoesNotExpire |
| ITechTeam | 1002 | 2015-03-22 15:52:30 | Administrators | Created by informant, never logged in |
| temporary | 1003 | 2015-03-22 15:53:01 | Users only | Created by informant, logged in once |

## Attack Lifecycle Assessment

### 1. Reconnaissance
**Status: NOT EXAMINED** (insufficient artifacts)

No command-line logging (Event ID 4688) was enabled. The NTUSER.DAT hive for the informant user was not present in the triage collection, preventing examination of UserAssist, typed URLs, MRU lists, and RecentDocs. `cmd.exe` and `ipconfig.exe` appear in ShimCache with the executed flag set (call_id 36, 39), but without process creation audit logs, the specific commands run cannot be determined. Web browser history was not collected.

### 2. Initial Access / Weaponization / Delivery
**Status: NOT EXAMINED** (insufficient artifacts)

This case presents as an insider threat. The user "informant" was the legitimate first account created during system setup (call_id 24). No malware, exploit kits, or malicious documents were found in ShimCache or Prefetch. Without web history, email content, or file download logs, external delivery vectors cannot be evaluated.

### 3. Evidence of Execution
**Status: ESTABLISHED**

Anti-forensic and cloud synchronization tools were downloaded and executed:
- **Eraser 6.2.0.2962**: Downloaded to `C:\Users\informant\Desktop\Download\` (ShimCache call_id 36), installed 2015-03-25 14:57:49 (Application log call_id 38), run 2 times, last at 15:13:30 (Prefetch call_id 18)
- **CCleaner 5.04 (CCleaner64.exe)**: Installed 2015-03-25 (ShimCache call_id 36), run 2 times, last at 15:15:50 (Prefetch call_id 40)
- **Google Drive Sync**: Installed 2015-03-23 (Application log call_id 38), run 2 times, last 2015-03-25 15:21:31 (Prefetch call_id 40)
- **iCloud**: Installed 2015-03-23 20:00:21 (Application log call_id 38)
- **WINWORD.EXE**: Run 3 times, last 2015-03-25 15:24:48 (Prefetch call_id 18)
- **OUTLOOK.EXE**: Run once, 2015-03-25 14:41:03 (Prefetch call_id 18)
- **Chrome**: 71 runs, last 2015-03-24 21:05:38 (Prefetch call_id 18)

### 4. Persistence
**Status: ESTABLISHED**

Three local accounts were created by the informant user (LogonId 0x224E3) in rapid succession on 2015-03-22 at 15:51-15:53 UTC (Security event 4720, call_id 24; group additions event 4732, call_id 42):
- **admin11** added to Administrators group at 15:51:54
- **ITechTeam** added to Administrators group at 15:52:30
- **temporary** added to Users group only at 15:53:01

All three accounts were set with PasswordDoesNotExpire. No suspicious services or Run keys were identified (call_id 27, 28). RDP was disabled (fDenyTSConnections=1, call_id 35).

### 5. Privilege Escalation
**Status: ESTABLISHED**

The informant user elevated the admin11 and ITechTeam accounts to local Administrators (4732 events, call_id 42). Both accounts received full admin privileges including SeSecurityPrivilege, SeBackupPrivilege, SeDebugPrivilege (call_id 43). The admin11 account was used interactively with admin privileges on 2015-03-22 (call_id 29).

### 6. Credential Access
**Status: EXAMINED - Not established**

No credential harvesting tools (mimikatz, pwdump, etc.) were found in ShimCache or Prefetch. Password resets were performed through standard account management (Event 4724, call_id 24). However, the 4648 events (call_id 30) show use of "Company" credentials that were not created on this machine, suggesting prior knowledge or acquisition of those credentials through means not visible in this triage.

### 7. Lateral Movement
**Status: ESTABLISHED**

Event ID 4648 (explicit credential logon) records show the informant accessing another machine using different credentials (call_id 30):
- **2015-03-23 20:23:27 UTC**: Target user "Company", target server "Company-PC"
- **2015-03-24 13:47:06 UTC**: Target user "Company", target server "Company-PC"

Additionally, local session switching was performed on 2015-03-22, with the informant disconnecting and admin11/temporary logging in via fast user switching (Terminal Services events, call_id 31):
- 15:53:37 - informant session disconnected
- 15:53:44 - admin11 logged in (Session 2)
- 15:55:57 - temporary logged in (Session 3)
- 15:57:02 - admin11 logged in again (Session 2)
- 15:57:55 - informant reconnected (Session 1)

### 8. Collection / Staging
**Status: ESTABLISHED**

Multiple data collection and staging mechanisms were deployed:
- **Google Drive Sync** installed 2015-03-23, running through 2015-03-25 (Prefetch call_id 40, install log call_id 38)
- **iCloud** installed 2015-03-23 (install log call_id 38, ShimCache call_id 41)
- **Two SanDisk Cruzer Fit USB flash drives** connected 2015-03-23 18:31:10 UTC (call_id 33):
  - SN: 4C530012450531101593
  - SN: 4C530012550531106501
- **Microsoft Word** used 3 times on 2015-03-25 (Prefetch call_id 18) - potential document preparation
- **Microsoft Outlook** used once on 2015-03-25 (Prefetch call_id 18) - potential email exfiltration

### 9. Exfiltration
**Status: EXAMINED - Circumstantial**

Cloud storage services (Google Drive, iCloud) and USB drives provide multiple exfiltration channels. Google Drive Sync was actively running on 2015-03-25, the final day of activity (Prefetch call_id 40). Without $MFT timeline analysis, file system journal, or network traffic capture, specific files exfiltrated cannot be identified. The NTUSER.DAT (containing RecentDocs, MRU lists) was not available in the collection.

### 10. Defense Evasion / Anti-Forensics
**Status: ESTABLISHED**

On the final day (2015-03-25), two anti-forensic tools were installed and run in sequence:
1. **Eraser 6.2.0.2962** - secure file deletion tool. Installed at 14:57 (call_id 38), last run at 15:13:30 (Prefetch call_id 18). Designed to overwrite deleted file data to prevent recovery.
2. **CCleaner 5.04** - system cleaning tool. Installed at ~14:58 (call_id 37), CCleaner64.exe last run at 15:15:50 (Prefetch call_id 40). Removes browser history, temp files, MRU lists, and other forensic artifacts.
3. **CCleaner uninstalled**: UNINST.EXE and AU_.EXE both ran at 15:18:29 (Prefetch call_id 18), indicating CCleaner was removed after use.
4. **System shutdown at 15:31:05** - immediately after the cleanup activities.
5. **Missing NTUSER.DAT** - the informant user's registry hive was not present, possibly deleted/corrupted by the anti-forensic tools.

### 11. Command and Control
**Status: EXAMINED - Not established**

No remote access tools, backdoors, or suspicious services were found. No unusual network-facing executables were identified in ShimCache or Prefetch. RDP was disabled. This appears to be an insider threat scenario where C2 infrastructure is not applicable.

## Timeline of Key Events

| Date/Time (UTC) | Event |
|-----------------|-------|
| 2015-03-22 14:33:54 | System setup; informant account created |
| 2015-03-22 15:00-15:04 | Microsoft Office 2013 installed |
| 2015-03-22 15:11 | Chrome, Google Update installed |
| 2015-03-22 15:51:54 | admin11 account created, made admin |
| 2015-03-22 15:52:30 | ITechTeam account created, made admin |
| 2015-03-22 15:53:01 | temporary account created (Users only) |
| 2015-03-22 15:53-15:58 | Rapid session switching: informant -> admin11 -> temporary -> admin11 -> informant |
| 2015-03-23 18:31:10 | Two SanDisk Cruzer Fit USBs connected |
| 2015-03-23 19:56-20:02 | Google Drive Sync & iCloud downloaded and installed |
| 2015-03-23 20:23:27 | Lateral movement: "Company" credentials used to access Company-PC |
| 2015-03-24 13:47:06 | Lateral movement: "Company" credentials used to access Company-PC (second time) |
| 2015-03-25 14:41:03 | Outlook.exe launched |
| 2015-03-25 14:50:14 | Eraser installer executed |
| 2015-03-25 14:57:49 | Eraser 6.2.0.2962 installation completed |
| 2015-03-25 ~14:58 | CCleaner 5.04 installed |
| 2015-03-25 15:13:30 | Eraser.exe last execution |
| 2015-03-25 15:15:50 | CCleaner64.exe last execution |
| 2015-03-25 15:18:29 | CCleaner uninstalled |
| 2015-03-25 15:21:31 | Google Drive Sync last execution |
| 2015-03-25 15:24:48 | WinWord.exe last execution |
| 2015-03-25 15:31:05 | System shutdown |

## Case Questions

Case Q1: Attack lifecycle phase assessment:

| Phase | Status | Key Evidence |
|-------|--------|-------------|
| **Reconnaissance** | NOT EXAMINED | No process creation logs (4688), no NTUSER.DAT, no browser history in collection. cmd.exe and ipconfig.exe in ShimCache but commands unknown. |
| **Initial Access / Delivery** | NOT EXAMINED | Insider threat scenario; no malware or exploit delivery found, but web history/email not available to rule out external involvement. |
| **Execution** | ESTABLISHED | Eraser, CCleaner, Google Drive Sync, iCloud, cmd.exe, Office apps all confirmed executed via Prefetch and ShimCache. |
| **Persistence** | ESTABLISHED | Three accounts (admin11, ITechTeam, temporary) created by informant on 2015-03-22, two given admin; all set to PasswordDoesNotExpire. |
| **Privilege Escalation** | ESTABLISHED | admin11 and ITechTeam elevated to local Administrators group by informant (Security event 4732). |
| **Credential Access** | EXAMINED - Not established | No credential harvesting tools found. Use of "Company" credentials on Company-PC implies prior credential acquisition by unknown means. |
| **Lateral Movement** | ESTABLISHED | Two 4648 events show informant authenticating as "Company" to "Company-PC" on 2015-03-23 and 2015-03-24. Local fast user switching between informant/admin11/temporary on 2015-03-22. |
| **Collection / Staging** | ESTABLISHED | Google Drive Sync and iCloud installed; two SanDisk USB drives connected; Word and Outlook used on the final day. |
| **Exfiltration** | EXAMINED - Circumstantial | Cloud storage and USB channels available; Google Drive running on final day. No direct file transfer evidence without $MFT/network logs. |
| **Defense Evasion / Anti-Forensics** | ESTABLISHED | Eraser and CCleaner installed, run, and CCleaner uninstalled on the final day before shutdown. NTUSER.DAT missing from collection. |
| **Command and Control** | EXAMINED - Not established | No RATs, backdoors, or C2 channels found. Consistent with insider threat without external controller. |