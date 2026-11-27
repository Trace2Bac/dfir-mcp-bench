Audit policy confirmed: process creation logging is disabled, which explains the absence of 4688 events. I have all the data needed for the final report.

---

# Digital Forensic Report — Case pc-triage-trudi

## Evidence Summary

| Item | Value |
|---|---|
| Evidence file | PC-triage.zip |
| SHA-256 | `6bef01b07b3640930713770ba868621940a7a798576b7542c6f1ebc7da24ccfc` |
| MD5 | `3743fb5b367adf5fb9cd2256d82b4afd` |
| Computer Name | INFORMANT-PC |
| OS | Windows 7 x64 (Windows 7 / Server 2008 R2) |
| IP Address | 10.11.11.129 (DHCP) |
| DNS | 10.11.11.2, Gateway: 10.11.11.254 |
| Timezone | Eastern Standard Time (UTC-5 / EDT UTC-4) |
| Last Shutdown | 2015-03-25 15:31:05 UTC |

**Artifacts in collection:** SYSTEM, SOFTWARE, SAM, SECURITY registry hives; Prefetch directory (95 files); Security.evtx, Application.evtx, System.evtx, TerminalServices-LocalSessionManager%4Operational.evtx. No NTUSER.DAT or UsrClass.dat user hives were collected.

**Audit policy (call_id 36):** Process creation auditing is disabled. File/registry/object access auditing is disabled. Logon success and account management success are audited. This means no process-creation (4688) events exist — execution evidence relies on Prefetch and ShimCache.

---

## User Accounts (call_ids 17, 19, 23)

| Username | SID | Created (UTC) | Last Logon (UTC) | Admin? | Flags |
|---|---|---|---|---|---|
| Administrator | 500 | — | 2010-11-21 03:47 | Yes | Disabled |
| informant | 1000 | 2015-03-22 14:33:54 | 2015-03-25 14:45:59 | Yes | PasswordNotRequired, PasswordDoesNotExpire |
| admin11 | 1001 | 2015-03-22 15:51:54 | 2015-03-22 15:57:02 | Yes | PasswordDoesNotExpire |
| ITechTeam | 1002 | 2015-03-22 15:52:30 | Never logged in | Yes | PasswordDoesNotExpire |
| temporary | 1003 | 2015-03-22 15:53:01 | 2015-03-22 15:55:57 | No (Users only) | PasswordDoesNotExpire |

Accounts admin11, ITechTeam, and temporary were all created from the informant session (SubjectLogonId 0x224E3, which corresponds to informant's 15:45:16 logon).

---

## Case Questions

**Case Q1:** Attack lifecycle phase assessment:

### 1. Evidence of Execution — ESTABLISHED

Prefetch (call_id 16) and ShimCache (call_ids 15, 25) confirm execution of the following notable programs:

- **Eraser.exe** — data wiping tool, last run 2015-03-25 15:13:30 (Prefetch run count: 2)
- **CCleaner64.exe** — system cleanup/anti-forensic tool, last run 2015-03-25 15:15:50 (run count: 2)
- **SCHTASKS.EXE** — scheduled task manipulation, last run 2015-03-25 15:18:37 (run count: 2)
- **SC.EXE** — service control, last run 2015-03-25 14:54:07 (run count: 8)
- **WEVTUTIL.EXE** — event log utility (can clear logs), last run 2015-03-25 14:54:09 (run count: 4+, both 32- and 64-bit)
- **PING.EXE** — network reconnaissance, last run 2015-03-25 14:58:34
- **NETSH.EXE** — network configuration, last run 2015-03-25 10:18:13 (run count: 2)
- **cmd.exe** — command shell, confirmed executed in ShimCache (both 32- and 64-bit)
- Standard applications: WINWORD.EXE, OUTLOOK.EXE, Chrome, Internet Explorer, Google Drive Sync

The CCleaner uninstaller (`uninst.exe` from `C:\Program Files\CCleaner\`) ran at 2015-03-25 15:18:29 — CCleaner was uninstalled after use. The Eraser installer bootstrapper ran at 14:50:14, and Eraser was registered as a startup Run key (see Persistence).

### 2. Persistence — ESTABLISHED

- **Run key (call_id 34):** `HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run\Eraser` = `"C:\Program Files\Eraser\Eraser.exe" /atRestart` — Eraser configured to execute on every system restart, enabling automated evidence wiping.
- **Account creation (call_ids 17, 19, 23):** Three administrator accounts (informant, admin11, ITechTeam) provide ongoing privileged access. All set to PasswordDoesNotExpire.
- **Scheduled tasks (call_id 34):** SCHTASKS.EXE was executed (Prefetch confirms). Non-default scheduled tasks were created on 2015-03-22 15:11:27 (Chrome-related), 2015-03-22 15:23:28, and 2015-03-23 20:27:34. Task names are not available from the SOFTWARE hive TaskCache alone — the task XML files were not collected.
- **Services (call_id 27):** SC.EXE ran 8 times. The service list in the SYSTEM hive shows standard Windows services, Google Update (gupdate/gupdatem), and no obviously suspicious custom services. However, without detailed SC.EXE command-line data (process creation logging disabled), the specific service operations cannot be determined.

### 3. Privilege Escalation — ESTABLISHED

- **Group membership additions (call_id 19):** At 2015-03-22 14:33:54, the `informant` account was added to the local Administrators group (Builtin\Administrators, S-1-5-32-544). The `admin11` account was added to Administrators at 15:51:54. The `ITechTeam` account was added to Administrators at 15:52:30. These additions gave three custom accounts full administrative privileges.
- **SAM confirmation (call_id 23):** The Administrators group contains SIDs for Administrator (500), informant (1000), admin11 (1001), and ITechTeam (1002).
- The `informant` account has the `PasswordNotRequired` flag — a security-weakening configuration.

### 4. Lateral Movement — ESTABLISHED

- **Explicit credential logons to remote host (call_id 21):**
  - 2015-03-23 20:23:27 UTC — 4648 event: Target `INFORMANT-PC\Company`, TargetServerName `Company-PC`, PID 0x4 (System process, indicating network-level access).
  - 2015-03-24 13:47:06 UTC — 4648 event: same target, same pattern.
  - These events show the user on INFORMANT-PC used "Company" credentials to authenticate to a machine named "Company-PC" on the network — classic lateral movement.
- **Local session switching (call_ids 20, 30):** Terminal Services local session manager logs show rapid account switching on 2015-03-22:
  - 15:53:44 — admin11 logged on (Session 2, LogonType 2)
  - 15:55:57 — temporary logged on (Session 3, LogonType 2, ~1 minute session)
  - 15:57:02 — admin11 logged on again (Session 2)
  - 15:57:54 — informant resumed (Session 1 reconnect)
  - This rapid cycling through multiple accounts suggests testing account access or establishing each account's profile.
- **RDP configuration (call_id 28):** fDenyTSConnections=1 at collection time (RDP disabled), but UserAuthentication=0 (NLA disabled — weaker security when RDP was enabled). The extensive Terminal Services session logs prove RDP was enabled earlier.

### 5. Exfiltration — ESTABLISHED (channels present; extent of data removed cannot be determined)

- **Cloud sync services (call_ids 25, 31, 34):**
  - Google Drive installed 2015-03-23, sync client `googledrivesync.exe` confirmed executed (ShimCache: Executed=Yes; Prefetch: last run 2015-03-25 15:21:31, run count 2).
  - iCloud installed (icloudsetup.exe downloaded 2015-03-23, `iCloud.exe` executed per ShimCache).
  - Both services provide bidirectional cloud file synchronization — an effective exfiltration channel.
- **USB storage devices (call_id 32):**
  - Two SanDisk Cruzer Fit USB flash drives connected: serial `4C530012450531101593` and serial `4C530012550531106501`.
  - Two additional USB devices (VID 14DD, PID 1005): serials `BACC6F7F7E34D3CC` and `FAC72212E15E713`.
  - Without user hive (NTUSER.DAT) MountPoints2, exact connection times cannot be established.
- **Mapped volumes (call_id 34):** Windows Search indexed drives C: through I:, including drive E: with label "IAMAN $_@" — an unusual volume label potentially from a removable device.
- **Data-bearing applications:** Outlook.exe (email), WinWord.exe (documents), and Chrome (web) were all actively used during the investigation period.

### 6. Anti-Forensics / Defense Evasion — ESTABLISHED

- **Eraser 6.2.0.2962** (call_ids 16, 25, 34): Installed 2015-03-25. Ran at least twice (last run 15:13:30). Registered in Run key for automatic execution at restart (`/atRestart`). Eraser performs secure deletion of files, making data recovery extremely difficult.
- **CCleaner 5.04** (call_ids 16, 25, 34): Ran at least twice (last run 15:15:50). Then **uninstalled** at 15:18:29 — the user cleaned up and removed the cleaning tool itself.
- **WEVTUTIL.EXE** (call_ids 16, 25): Executed 4+ times across both 32-bit and 64-bit versions. This tool can clear Windows event logs (`wevtutil cl`). The Security event log shows time-ordering anomalies (backward jumps noted by EvtxECmd at records 109 and 1040, call_id 10), which could indicate log manipulation or system time changes.
- **Timeline of anti-forensic activity on 2015-03-25:**
  - 14:47-14:50 — Downloaded and installed Eraser (which also installed .NET Framework 4)
  - 14:57 — Installed CCleaner
  - 15:13 — Ran Eraser
  - 15:15 — Ran CCleaner
  - 15:18 — Uninstalled CCleaner, ran SCHTASKS
  - 15:21 — Google Drive Sync ran
  - 15:24 — WinWord opened
  - 15:30 — Final logoff
  - 15:31 — System shutdown

---

## Gaps and Limitations

- **No NTUSER.DAT or UsrClass.dat** collected — UserAssist, RecentDocs, MountPoints2, typed URLs, and shellbag data are unavailable.
- **No Amcache.hve** collected — cannot correlate program first-execution times or SHA-1 hashes.
- **Process creation auditing disabled** (call_id 36) — no 4688 events exist. Command-line arguments for cmd.exe, sc.exe, schtasks.exe, wevtutil.exe, ping.exe, and netsh.exe cannot be determined.
- **No PowerShell, Sysmon, or WMI event logs** in the collection.
- **No $MFT, USN journal, or SRUM database** — filesystem timeline, file creation/deletion, and network bandwidth usage cannot be reconstructed.
- **USB connection timestamps** require NTUSER.DAT MountPoints2 or SETUPAPI logs (not collected).
- The extent of data actually exfiltrated via Google Drive, iCloud, or USB cannot be quantified from available artifacts.