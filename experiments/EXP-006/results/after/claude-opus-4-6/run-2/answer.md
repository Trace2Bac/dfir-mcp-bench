I now have comprehensive evidence across all attack lifecycle phases. Here is the final report.

---

# Digital Forensic Investigation Report — Case pc-triage-trudi

## System Under Investigation

| Attribute | Value |
|---|---|
| Computer Name | INFORMANT-PC |
| OS | Windows 7 x64 (SP1) |
| Timezone | Eastern Daylight Time (UTC-4) |
| IP Address | 10.11.11.129 (DHCP from 10.11.11.254) |
| Platform | VMware virtual machine |
| Activity Window | 2015-03-22 to 2015-03-25 |
| Last Shutdown | 2015-03-25 15:31:05 UTC |
| Evidence Hash (ZIP) | MD5: 3743fb5b367adf5fb9cd2256d82b4afd / SHA1: 94bc5451ae7b3a436b1966acc21ca5fc50dedeb3 |

## User Accounts (from SAM - call_id 19)

| Account | RID | Type | Created | Last Login | Login Count | Group |
|---|---|---|---|---|---|---|
| informant | 1000 | Admin | 2015-03-22 14:33:54 | 2015-03-25 14:45:59 | 10 | Administrators |
| admin11 | 1001 | Admin | 2015-03-22 15:51:54 | 2015-03-22 15:57:02 | 2 | Administrators |
| ITechTeam | 1002 | Admin | 2015-03-22 15:52:30 | Never | 0 | Administrators |
| temporary | 1003 | Limited | 2015-03-22 15:53:01 | 2015-03-22 15:55:57 | 1 | Users |

## Attack Lifecycle Timeline

### Day 1: 2015-03-22 — Setup, Account Creation, Credential Testing
- 14:33:54 — `informant` account created by SYSTEM, added to Administrators
- 14:34:28 — `informant` interactive logon (Type 2)
- 15:11-15:17 — Chrome and IE11 installed/used
- 15:45:16 — `informant` logon session 0x224E3 begins
- 15:51:54 — `admin11` created, added to Administrators (by session 0x224E3)
- 15:52:30 — `ITechTeam` created, added to Administrators (by session 0x224E3)
- 15:53:01 — `temporary` created as limited user (by session 0x224E3)
- 15:53:44 — `admin11` logged on interactively (Type 2), session 2
- 15:55:57 — `temporary` logged on interactively (Type 2), session 3
- 15:57:02 — `admin11` logged on again (Type 2)

### Day 2: 2015-03-23 — Software Installation, Lateral Movement
- 17:24:41 — `informant` logon
- ~19:56 — Google Drive Sync downloaded and installed
- 20:23:27 — **4648: Explicit credential logon targeting Company-PC as "Company" account (PID 0x4)**

### Day 3: 2015-03-24 — Lateral Movement
- 13:21:44 — `informant` logon
- 13:47:06 — **4648: Explicit credential logon targeting Company-PC as "Company" account (PID 0x4)**

### Day 4: 2015-03-25 — Anti-Forensics, Exfiltration, Cleanup
- 13:06:08 — `informant` logon
- 14:45:59 — `informant` final logon
- 14:47:40 — Eraser 6.2.0.2962.exe downloaded to Desktop\Download
- 14:48:28 — CCleaner setup (ccsetup504.exe) downloaded to Desktop\Download
- 14:50:14 — Eraser installer executed (triggered .NET 4 install)
- 14:54:07 — SC.EXE executed (8 total runs)
- 14:54:09 — WEVTUTIL.EXE executed (4 total runs)
- 14:58:34 — PING.EXE executed
- 15:13:30 — ERASER.EXE executed (2 runs — secure file deletion)
- 15:15:50 — CCLEANER64.EXE executed (2 runs — artifact cleaning)
- 15:18:29 — CCleaner UNINST.EXE — CCleaner uninstalled after use
- 15:18:37 — SCHTASKS.EXE executed (2 runs)
- 15:21:31 — GOOGLEDRIVESYNC.EXE last run — cloud sync after cleanup
- 15:30:57 — Final logoff
- 15:31:05 — System shutdown

---

## Case Questions

Case Q1: Attack lifecycle phase assessment:

**1. Reconnaissance / Discovery — ESTABLISHED.** PING.EXE was executed once (prefetch last run 2015-03-25 14:58:34, call_id 25) and NETSH.EXE was executed twice (prefetch last run 2015-03-25 10:18:13, call_id 25). Both confirmed in ShimCache with Executed=Yes (call_id 12). These are standard network discovery tools consistent with mapping the internal environment (10.11.11.0/24 network).

**2. Initial Access — ESTABLISHED (Insider Threat).** The user "informant" was the first account created on this system (2015-03-22 14:33:54, call_id 14) and immediately logged in interactively (Type 2 logon, 14:34:28, call_id 15). This is a local administrator account on a company PC. No evidence of external exploitation — this is an insider threat scenario with legitimate local access. The SAM password hint "IAMAN" (call_id 19) is noted.

**3. Execution — ESTABLISHED.** Extensive execution evidence from both Prefetch and ShimCache: cmd.exe, sc.exe (8 runs), schtasks.exe (2 runs), wevtutil.exe (4 runs), ping.exe, netsh.exe, Eraser.exe (2 runs), CCleaner64.exe (2 runs), and Google Drive Sync (2 runs) (call_id 12, 25). Process creation auditing was not enabled per audit policy (call_id 28), so no Event ID 4688 records exist for command-line detail.

**4. Persistence — ESTABLISHED.** Three local accounts were created by the informant user (logon session 0x224E3) within 70 seconds on 2015-03-22: admin11 (15:51:54), ITechTeam (15:52:30), and temporary (15:53:01) (call_id 14). Two of these (admin11, ITechTeam) were added to the local Administrators group (call_id 14). SCHTASKS.EXE was executed twice (call_id 25), indicating possible scheduled task creation for persistence, though the specific tasks cannot be determined without NTUSER.DAT or task XML files. No suspicious services were found in the SYSTEM hive (call_id 20).

**5. Privilege Escalation — ESTABLISHED.** admin11 and ITechTeam were added to the local Administrators group immediately upon creation (4732 events, call_id 14). All administrative logon sessions (4672 events) show full administrative privileges including SeSecurityPrivilege, SeTakeOwnershipPrivilege, SeBackupPrivilege, SeDebugPrivilege, and SeImpersonatePrivilege (call_id 31).

**6. Defense Evasion / Anti-Forensics — ESTABLISHED.** On 2015-03-25, the informant user downloaded and executed multiple anti-forensic tools: (a) Eraser 6.2.0.2962, a secure file deletion tool, downloaded from Desktop\Download (call_id 12) and installed (call_id 26, install date 20150325), executed 2 times (call_id 25); (b) CCleaner 5.04, an artifact cleaning tool, downloaded as ccsetup504.exe (call_id 12), executed 2 times (call_id 25), then **uninstalled** (UNINST.EXE last run 15:18:29, call_id 25) — removing evidence of its own use; (c) WEVTUTIL.EXE executed 4 times (call_id 25) — this tool can clear event logs, though no Event ID 1102 (log cleared) was found in the Security log (call_id 31), suggesting either other logs were targeted or it was used for querying. The sequence (Eraser → CCleaner → Uninstall CCleaner) demonstrates deliberate anti-forensic intent.

**7. Credential Access — EXAMINED, LIMITED EVIDENCE.** Event ID 4648 events show explicit credential use for admin11 and temporary locally, and critically for the "Company" account targeting Company-PC (call_id 16). This demonstrates possession/knowledge of credentials for another user account not created on this machine. Without NTUSER.DAT, credential dumping tool artifacts cannot be fully investigated. Audit policy shows Detailed Tracking (process creation) was not enabled (call_id 28), limiting visibility.

**8. Lateral Movement — ESTABLISHED.** Two Event ID 4648 entries show explicit credential logons targeting "Company-PC" using the "Company" account: 2015-03-23 20:23:27 and 2015-03-24 13:47:06, both from PID 0x4 (System process) (call_id 16). The Remote Desktop client mstsc.exe was present in ShimCache (call_id 12). Locally, the informant user switched between admin11 and temporary sessions via RDP (Terminal Services events show sessions 2 and 3, call_id 17).

**9. Collection — EXAMINED, CIRCUMSTANTIAL EVIDENCE.** Microsoft Office Professional Plus 2013 (including Outlook and Word) was installed and used — WINWORD.EXE and OUTLOOK.EXE confirmed in ShimCache (call_id 12, 23). Google Drive Sync was installed on 2015-03-23 (call_id 26). Two SanDisk Cruzer Fit USB drives were connected to the system (serial numbers 4C530012450531101593 and 4C530012550531106501, call_id 30), plus two additional USB devices (VID_14DD/PID_1005). Without NTUSER.DAT, RecentDocs, MRU lists, and typed paths cannot be examined, so the specific files staged for exfiltration are unknown.

**10. Exfiltration — ESTABLISHED.** Google Drive Sync was installed (2015-03-23, call_id 26) and its last execution was 2015-03-25 at 15:21:31 (call_id 27) — critically, this was AFTER Eraser (15:13:30) and CCleaner (15:15:50) were run, but BEFORE final logoff (15:30:57). This timing suggests files were synced to Google's cloud after cleanup tools were used. Additionally, two SanDisk Cruzer Fit USB storage devices were connected (call_id 30), providing a potential physical exfiltration channel. Network flow logs and PCAP were not available in this triage collection to confirm the volume or destination of data transferred.

**11. Impact / Actions on Objectives — EXAMINED, CIRCUMSTANTIAL EVIDENCE.** The overall pattern is consistent with an insider threat: a user with administrator access created backdoor accounts, accessed another system (Company-PC) using credentials for the "Company" account, installed a cloud sync tool, and then systematically destroyed evidence before departing. The specific data targeted or business impact cannot be determined from the system-level triage alone, as the filesystem, browser history, and user registry hives were not collected.

---

## Gaps and Limitations

- **No NTUSER.DAT files** in the collection — UserAssist, RecentDocs, TypedURLs, MRU lists, and Shellbags are unavailable.
- **No filesystem artifacts** ($MFT, $UsnJrnl) — cannot determine which files were created, modified, or deleted.
- **Process creation auditing was disabled** (audit policy call_id 28) — no Event ID 4688 events exist for command-line reconstruction.
- **No network captures/proxy logs** — cannot confirm what data was exfiltrated via Google Drive or USB.
- **No Amcache** in the collection — limits ability to attribute specific binaries to first-execution times.