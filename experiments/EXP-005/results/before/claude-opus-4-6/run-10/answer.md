I now have comprehensive evidence across all attack lifecycle phases. Let me compile the final report.

---

# Digital Forensic Investigation Report — INFORMANT-PC Triage Analysis

## Case: pc-triage-trudi
**Examiner report date:** 2026-11-20 (UTC)
**Evidence:** PC-triage.zip (SHA256: 6bef01b07b3640930713770ba868621940a7a798576b7542c6f1ebc7da24ccfc, call_id 3)
**Evidence period:** 2015-03-22 through 2015-03-25

## System Identification

| Attribute | Value | Source |
|-----------|-------|--------|
| Computer Name | INFORMANT-PC | SYSTEM registry (call_id 21) |
| OS | Windows 7 x64 (WinNT Workstation) | SYSTEM registry (call_id 21) |
| IP Address | 10.11.11.129 (DHCP) | SYSTEM registry (call_id 22) |
| Gateway/DNS | 10.11.11.2 | SYSTEM registry (call_id 22) |
| Gateway MAC | 00-50-56-EB-B2-2C (VMware) | SOFTWARE networklist (call_id 34) |
| Timezone | Eastern Standard Time (UTC-5/UTC-4 EDT) | SYSTEM registry (call_id 21) |
| Domain | localdomain | SYSTEM registry (call_id 22) |

## User Accounts (SAM — call_id 23)

| Username | RID | Created | Last Login | Groups | Notes |
|----------|-----|---------|------------|--------|-------|
| Administrator | 500 | 2015-03-25 10:33 | 2010-11-21 03:47 | Administrators | Disabled |
| Guest | 501 | 2015-03-25 10:33 | Never | Guests | Disabled |
| **informant** | 1000 | 2015-03-22 14:33 | 2015-03-25 14:45 | Administrators | Primary user |
| **admin11** | 1001 | 2015-03-22 15:51 | 2015-03-22 15:57 | **Administrators**, Users | Suspicious — created from informant session |
| **ITechTeam** | 1002 | 2015-03-22 15:52 | Never | **Administrators**, Users | Suspicious — never logged in |
| **temporary** | 1003 | 2015-03-22 15:53 | 2015-03-22 15:55 | Users | Suspicious — temporary access |

All accounts have `PasswordDoesNotExpire`. The three accounts admin11, ITechTeam, and temporary were all created within 70 seconds from the same logon session (0x224E3, the informant user) per Security event log 4720 events (call_id 24).

## Available Evidence Artifacts

- **Registry hives:** SYSTEM, SOFTWARE, SAM, SECURITY (no NTUSER.DAT files collected)
- **Event logs:** Security.evtx, System.evtx, Application.evtx, TerminalServices-LocalSessionManager%4Operational.evtx
- **Prefetch:** 95 .pf files in C:\Windows\Prefetch
- **Note:** No process creation audit (EID 4688), no Sysmon, no PowerShell logging, no NTUSER.DAT (UserAssist, RecentDocs, RunMRU unavailable)

---

## Case Questions

Case Q1: Attack lifecycle phase assessment follows. Each phase is classified as **ESTABLISHED**, **RULED OUT**, or **NOT EXAMINED**, with supporting evidence cited by tool call_id.

### 1. Reconnaissance — ESTABLISHED

- **ping.exe** executed once, last run 2015-03-25 14:58:34 (Prefetch call_id 51)
- **netsh.exe** executed twice, last run 2015-03-25 10:18:13 (Prefetch call_id 49) — can be used for network/firewall enumeration
- **sc.exe** executed 8 times, last run 2015-03-25 14:54:07 (Prefetch call_id 48) — service enumeration/manipulation
- Two explicit credential logon attempts (EID 4648) to **Company-PC** using the **Company** account at 2015-03-23 20:23:27 and 2015-03-24 13:47:06 (call_id 27) indicate the attacker had knowledge of a target machine on the network.

### 2. Initial Access / Weaponization / Delivery — NOT EXAMINED

The triage collection lacks NTUSER.DAT files (no browser history, download records, email attachments, or UserAssist data) and contains no $MFT or memory dump. The initial compromise vector — whether phishing, drive-by download, insider access, or other — cannot be determined from available artifacts. The informant user account itself was the first account created during OS setup (2015-03-22 14:33:54, call_id 24), so it may be an insider scenario or the attacker's own machine.

### 3. Execution — ESTABLISHED

Extensive execution of administrative and attack-related tools confirmed through both Shimcache (call_id 25) and Prefetch:

| Tool | Prefetch Run Count | Last Execution (UTC) | Call_id |
|------|-------------------|---------------------|---------|
| cmd.exe | Shimcache only | Shimcache Executed=Yes | 25 |
| sc.exe | 8 | 2015-03-25 14:54:07 | 48 |
| schtasks.exe | 2 | 2015-03-25 15:18:37 | 47 |
| wevtutil.exe (x64) | 4 | 2015-03-25 14:54:09 | 46 |
| wevtutil.exe (WoW64) | 2 | 2015-03-25 14:54:09 | 45 |
| netsh.exe | 2 | 2015-03-25 10:18:13 | 49 |
| ping.exe | 1 | 2015-03-25 14:58:34 | 51 |
| Eraser.exe | 2 | 2015-03-25 15:13:30 | 42 |
| CCleaner64.exe | 2 | 2015-03-25 15:15:50 | 44 |
| GoogleDriveSync.exe | 2 | 2015-03-25 15:21:31 | 50 |
| WScript.exe | Shimcache Executed=Yes | — | 25 |

### 4. Persistence — ESTABLISHED

- **Account creation:** Three new local accounts created within 70 seconds on 2015-03-22 at 15:51-15:53 from the informant user's session (call_id 24, Security EID 4720). Two (admin11, ITechTeam) were immediately added to the Administrators group (EID 4732, call_id 24). All have PasswordDoesNotExpire.
- **Scheduled tasks:** schtasks.exe was executed twice, last at 2015-03-25 15:18:37 (call_id 47). The specific tasks created are unknown (no task XML collected).
- **Google Update Services:** Installed as auto-start services on 2015-03-22 (System EID 7045, call_id 40).

### 5. Privilege Escalation — ESTABLISHED

- admin11 (RID 1001) was added to the **Administrators** group immediately after creation (Security EID 4732 at 2015-03-22 15:51:54, call_id 24).
- ITechTeam (RID 1002) was also added to the **Administrators** group (SAM Builtin data, call_id 23).
- Both accounts were created from the informant user's interactive logon session (LogonId 0x224E3).
- The informant user itself was added to Administrators at account creation (EID 4732, call_id 24).

### 6. Defense Evasion / Anti-Forensics — ESTABLISHED (strongest evidence)

This is the most heavily evidenced phase:

- **Eraser 6.2.0.2962:** Downloaded to `C:\Users\informant\Desktop\Download\` (Shimcache modified time 2015-03-25 14:47:40, call_id 25), installed on 2015-03-25 (SOFTWARE uninstall key, call_id 37), and executed twice (last 2015-03-25 15:13:30, Prefetch call_id 42). Eraser is a secure file-deletion tool that overwrites data to prevent recovery.
- **CCleaner 5.04:** Installed (SOFTWARE uninstall key, call_id 37) and executed twice (last 2015-03-25 15:15:50, Prefetch call_id 44). CCleaner removes browser history, temporary files, registry traces, and other forensic artifacts.
- **wevtutil.exe:** Executed a total of 6 times across two prefetch files (last 2015-03-25 14:54:09, call_ids 45, 46). This Windows tool can clear or export event logs (`wevtutil cl`). The Security log only contains 1,193 events across a 4-day span, which is unusually low for an active system.
- **.NET Framework 4 installed** on 2015-03-25 (call_id 37, 40) — prerequisite for Eraser, installed the same day as the cleanup operation.
- **Missing NTUSER.DAT files:** The triage collection contains no user profile hives, eliminating UserAssist, RecentDocs, TypedPaths, and other user-activity artifacts.
- **Limited event logs:** Only 4 of the many Windows event log files were collected.

### 7. Credential Access — NOT EXAMINED

No memory dump, no evidence of credential-dumping tools (mimikatz, etc.) in Shimcache or Prefetch. However, the 4648 events (call_id 27) show the attacker possessed credentials for a "Company" account on "Company-PC," suggesting credential harvesting occurred through means not visible in available artifacts.

### 8. Lateral Movement — ESTABLISHED

- Two **explicit credential logon** events (Security EID 4648, call_id 27) show logons to **Company-PC** using the **Company** account:
  - 2015-03-23 20:23:27 UTC (PID 0x4 = System process, typical of network logon)
  - 2015-03-24 13:47:06 UTC
- **mstsc.exe** (Remote Desktop Client) is present in Shimcache (call_id 25), indicating the RDP client binary was accessed on the system.
- The local RDP configuration shows UserAuthentication=0 (NLA disabled, call_id 33), making this system vulnerable to unauthenticated RDP access.

### 9. Collection — ESTABLISHED

- **Microsoft Office Professional Plus 2013** was installed (call_id 37) and both WINWORD.EXE and OUTLOOK.EXE were executed (Shimcache call_id 36) — the user had access to documents and email.
- **Two SanDisk Cruzer Fit USB drives** were connected on 2015-03-24 (call_id 38, 39):
  - Serial 4C530012450531101593 at 13:38:00 UTC
  - Serial 4C530012550531106501 at 13:58:33 UTC
  - Both connected within 20 minutes of each other, suggesting deliberate data staging.

### 10. Exfiltration — ESTABLISHED

Two distinct exfiltration channels were prepared and used:

- **Google Drive:** googledrivesync.exe downloaded on 2015-03-23 at 19:56 (Shimcache call_id 36) and installed (SOFTWARE uninstall key shows version 1.20.8672.3137, install date 2015-03-23, call_id 37). GoogleDriveSync.exe last executed 2015-03-25 15:21:31 (Prefetch call_id 50) — the last significant program executed before the final logoff at 15:30. The Eraser prefetch file references Google Drive directories (call_id 42), suggesting the Google Drive folder was targeted for cleanup.
- **USB storage:** Two SanDisk Cruzer Fit USB flash drives connected on 2015-03-24 (call_id 38), the day after Google Drive was installed and the same day as lateral movement to Company-PC.

### 11. Command and Control (C2) — NOT EXAMINED

No network traffic captures, no Sysmon, no firewall logs, and no evidence of remote access tools (RATs) in Shimcache or Prefetch. The evidence is consistent with an insider threat rather than external C2, but this cannot be confirmed from available artifacts alone.

---

## Attack Timeline Summary

| Date/Time (UTC) | Event | Source |
|-----------------|-------|--------|
| 2015-03-22 14:33 | informant account created, added to Admins | Security 4720/4732 (call_id 24) |
| 2015-03-22 14:34 | First interactive logon (informant) | Security 4624 (call_id 26) |
| 2015-03-22 15:03 | MS Office Pro Plus 2013 installed | System 7045 (call_id 40) |
| 2015-03-22 15:11 | Chrome installed, Google Update services | System 7045 (call_id 40) |
| 2015-03-22 15:51-15:53 | **admin11, ITechTeam, temporary accounts created** | Security 4720 (call_id 24) |
| 2015-03-22 15:51-15:52 | admin11 & ITechTeam added to Administrators | Security 4732 (call_id 24) |
| 2015-03-22 15:53-15:57 | admin11 and temporary logged in interactively | Security 4624 (call_id 26) |
| 2015-03-23 19:56 | Google Drive Sync downloaded | Shimcache (call_id 36) |
| 2015-03-23 20:00 | Google Drive installed (with Bonjour, Apple SW) | System 7045 (call_id 40) |
| 2015-03-23 20:23 | **Lateral movement to Company-PC** (Company creds) | Security 4648 (call_id 27) |
| 2015-03-24 13:38-13:58 | **Two SanDisk USB drives connected** | USBSTOR registry (call_id 38, 39) |
| 2015-03-24 13:47 | **Lateral movement to Company-PC** (second attempt) | Security 4648 (call_id 27) |
| 2015-03-25 10:18 | netsh.exe executed | Prefetch (call_id 49) |
| 2015-03-25 14:47 | **Eraser installer downloaded to Desktop** | Shimcache (call_id 25) |
| 2015-03-25 14:50 | .NET Framework 4 installed (Eraser prereq) | System 7045 (call_id 40) |
| 2015-03-25 14:54 | **wevtutil.exe & sc.exe executed** (log/service manipulation) | Prefetch (call_ids 45, 46, 48) |
| 2015-03-25 14:58 | ping.exe executed | Prefetch (call_id 51) |
| 2015-03-25 15:13 | **Eraser.exe executed** (secure file deletion) | Prefetch (call_id 42) |
| 2015-03-25 15:15 | **CCleaner64.exe executed** (artifact cleanup) | Prefetch (call_id 44) |
| 2015-03-25 15:18 | schtasks.exe executed | Prefetch (call_id 47) |
| 2015-03-25 15:21 | **GoogleDriveSync.exe last run** (exfiltration) | Prefetch (call_id 50) |
| 2015-03-25 15:30 | Final user logoff | Security 4647 (call_id 28), TS (call_id 30) |

## Evidence Gaps

1. **No NTUSER.DAT files** — UserAssist, RecentDocs, TypedPaths, Shellbags, RunMRU are all unavailable
2. **No process audit** — EID 4688 (process creation) was not logged; no command-line visibility
3. **No Sysmon or PowerShell logs** — No detailed process/network telemetry
4. **No $MFT, USN journal, or memory dump** — Cannot determine specific files accessed/deleted
5. **Limited event logs** — Only 4 of many Windows event log channels collected
6. **Potential log clearing** — wevtutil.exe was executed 6 times on 2015-03-25; event log coverage may be incomplete

## Conclusion

The evidence strongly indicates an **insider threat scenario** where the user of INFORMANT-PC (the "informant" account) conducted a multi-day operation including: creating backdoor accounts with administrative privileges, installing cloud synchronization software (Google Drive), connecting USB storage devices, performing lateral movement to another system (Company-PC), and conducting extensive anti-forensic cleanup using Eraser, CCleaner, and wevtutil. The final day (2015-03-25) shows a systematic cleanup sequence: install Eraser → clear event logs → securely delete files → run CCleaner → sync with Google Drive → log off.