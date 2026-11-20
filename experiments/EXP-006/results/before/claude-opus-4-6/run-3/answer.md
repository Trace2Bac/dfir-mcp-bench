I now have a complete picture. Let me compile the final report.

---

# Digital Forensic Examination Report — Case pc-triage-trudi

## Evidence Summary

**Evidence file:** PC-triage.zip (14,315,429 bytes)
- **SHA-256:** `6bef01b07b3640930713770ba868621940a7a798576b7542c6f1ebc7da24ccfc`
- **SHA-1:** `94bc5451ae7b3a436b1966acc21ca5fc50dedeb3`
- **MD5:** `3743fb5b367adf5fb9cd2256d82b4afd`
(Verified via call_id 3)

**Artifacts parsed:** SYSTEM, SOFTWARE, SAM, SECURITY registry hives; Security.evtx, System.evtx, Application.evtx, TerminalServices-LocalSessionManager%4Operational.evtx; 95 Prefetch files; 292 ShimCache entries.

## System Identification

| Attribute | Value | Source |
|-----------|-------|--------|
| Computer Name | INFORMANT-PC | Registry (call_id 28) |
| OS | Windows 7 x64 | ShimCache (call_id 17) |
| Timezone | Eastern Standard Time (UTC-5 / EDT UTC-4) | Registry (call_id 28) |
| IP Address | 10.11.11.129 (DHCP) | Registry (call_id 28) |
| DNS Server | 10.11.11.2 | Registry (call_id 31) |
| Last Shutdown | 2015-03-25 15:31:05 UTC | Registry (call_id 28) |
| Primary User | informant (SID 1000, Administrators) | SAM (call_id 27) |
| RDP Status | fDenyTSConnections=1 (disabled at collection time) | Registry (call_id 31) |

## User Accounts (from SAM — call_id 27)

| Username | RID | Created | Last Login | Group Membership | Notes |
|----------|-----|---------|------------|-----------------|-------|
| Administrator | 500 | 2015-03-25 10:33:22 | 2010-11-21 03:47:20 | Administrators | Disabled |
| Guest | 501 | 2015-03-25 10:33:22 | Never | Guests | Disabled |
| **informant** | 1000 | 2015-03-22 14:33:54 | 2015-03-25 14:45:59 | **Administrators** | Primary user; created all rogue accounts |
| **admin11** | 1001 | 2015-03-22 15:51:54 | 2015-03-22 15:57:02 | **Administrators** | Created by informant |
| **ITechTeam** | 1002 | 2015-03-22 15:52:30 | Never | **Administrators** | Created by informant |
| **temporary** | 1003 | 2015-03-22 15:53:01 | 2015-03-22 15:55:57 | Users | Created by informant |

## USB Devices Connected (call_id 31)

Two SanDisk Cruzer Fit USB flash drives were connected (first seen 2015-03-23 18:31:10):
- Serial: `4C530012450531101593`
- Serial: `4C530012550531106501`

---

## Case Questions

Case Q1: Attack lifecycle phase analysis:

**1. Reconnaissance — Not examined (insufficient evidence)**
No Sysmon logs, PowerShell logs, or network captures were collected. The triage package does not include browser history (no NTUSER.DAT). Cannot determine if the user researched tools or targets before acting.

**2. Initial Access — Established (insider threat)**
This is an insider threat, not an external intrusion. The user "informant" was the primary local account created during Windows OOBE on 2015-03-22 14:33:54 and was immediately placed in the Administrators group (Security event 4732, call_id 22). All subsequent malicious activity originated from this account's interactive logon sessions (LogonType 2, call_id 22). No evidence of external compromise: no failed logon attempts (no 4625 events), no network-type logons from external hosts, and RDP was disabled at collection time (fDenyTSConnections=1, call_id 31).

**3. Execution — Established**
Multiple suspicious tools were executed, confirmed by both Prefetch (call_id 34) and ShimCache with Execute flag (call_id 20):
- **CCleaner64.exe** — 2 runs, last run 2015-03-25 15:15:50 (anti-forensic cleaning tool)
- **Eraser.exe** — 2 runs, last run 2015-03-25 15:13:30 (secure file deletion)
- **WEVTUTIL.EXE** — 4 runs (64-bit) + 2 runs (32-bit), last run 2015-03-25 14:54:09 (event log manipulation)
- **SC.EXE** — 8 runs, last run 2015-03-25 14:54:07 (service configuration)
- **SCHTASKS.EXE** — 2 runs, last run 2015-03-25 15:18:37 (scheduled task manipulation)
- **NETSH.EXE** — 2 runs, last run 2015-03-25 10:18:13 (network configuration)
- **PING.EXE** — 1 run, last run 2015-03-25 14:58:34
- **cmd.exe** — Execute flag set in ShimCache (call_id 20)
- **WScript.exe** — Execute flag set in ShimCache (call_id 20)
- **CONHOST.EXE** — 16 runs, last run 2015-03-25 15:18:36 (indicates extensive command-line activity)

**4. Persistence — Established**
- **Rogue admin accounts:** Three accounts created by "informant" on 2015-03-22, two with Administrators group membership (admin11, ITechTeam), providing persistent privileged access (Security events 4720/4732, call_id 22).
- **Eraser autorun:** Eraser was added to `HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run` on 2015-03-25 14:57:31 with value `"C:\Program Files\Eraser\Eraser.exe" /atRestart` (call_id 32), configured to run at every system boot.
- **Scheduled tasks:** SCHTASKS.EXE was executed (Prefetch, call_id 34) and TaskCache entries show tasks created on 2015-03-22 15:11:27 (call_id 32).
- **Cloud sync services:** Google Drive (installed 2015-03-23, call_id 32) and iCloud (installed 2015-03-23, call_id 24) provide persistent network-accessible storage.

**5. Privilege Escalation — Established**
The "informant" account was placed directly in the Administrators group at creation by SYSTEM (4732, call_id 22). The user then created admin11 (SID 1001) and ITechTeam (SID 1002) and added both to Builtin\Administrators (4732 events at 15:51:54 and 15:52:30, call_id 22). Security event 4672 confirms "informant" received SeSecurityPrivilege, SeDebugPrivilege, SeBackupPrivilege, etc. on each logon (call_id 24). All three rogue accounts were set with PasswordDoesNotExpire (call_id 27).

**6. Defense Evasion / Anti-Forensics — Established**
This is the most heavily evidenced phase. On 2015-03-25 (the final day before collection), the user executed a systematic cleanup:
- **CCleaner** (v5.04): Downloaded (`ccsetup504.exe`, call_id 20), installed, executed twice (last run 15:15:50, call_id 34), then **uninstalled** (uninst.exe at 15:18:29, call_id 34) to remove evidence of the cleaner itself.
- **Eraser** (v6.2.0.2962): Downloaded from `C:\Users\informant\Desktop\Download\` (call_id 20), installed on 2015-03-25 (call_id 32), and executed for secure file deletion (last run 15:13:30, call_id 34). Required .NET Framework 4 installation as a dependency (call_id 21).
- **WEVTUTIL.EXE**: Executed 6 times total (call_id 34), indicating event log clearing or export. The event log earliest timestamp (2015-03-22 14:33:53, call_id 18) coincides with system setup, suggesting logs prior to that may have been purged, but the main concern is the 6 executions on the final day.
- **Computer name changes**: The machine appeared as three different names during the investigation window — `WIN-D9RGPJQ68G8` (initial), `INFORMANT-PC` (after setup), and `37L4247F27-25` (seen briefly on 2015-03-25 10:15 boot, call_id 35), suggesting the system was reset/re-imaged or sysprep'd between sessions.

**7. Credential Access — Not examined (insufficient evidence)**
No NTUSER.DAT files in the collection means no UserAssist data to check for credential harvesting tools. No Sysmon or process creation (4688) events are present. No known credential theft tools (mimikatz, procdump, etc.) appear in ShimCache (call_id 33). Password resets were performed for the rogue accounts (4724 events, call_id 23), but those are administrative actions, not credential theft.

**8. Lateral Movement — Ruled out (within evidence scope)**
All logons were local: LogonType 2 (interactive) and LogonType 5 (service). No LogonType 3 (network) or LogonType 10 (RemoteInteractive/RDP) logons from external hosts (call_id 22). Terminal Services logs show only local console sessions (Session IDs 1-3, call_id 35). The user switched between accounts locally — informant disconnected their session, then admin11 and temporary each logged on locally and briefly before informant reconnected (call_id 35). RDP was disabled at collection time (call_id 31). No PSExec, remote WMI, or other lateral movement tools in ShimCache (call_id 33).

**9. Collection / Staging — Examined, circumstantial evidence**
No direct evidence of data staging was found. However, the user had access to Microsoft Office (Word last run 2015-03-25 15:24:48, Outlook last run 2015-03-25 14:41:03, call_id 34), and two SanDisk Cruzer Fit USB drives were connected on 2015-03-23 (call_id 31). Without NTUSER.DAT, MFT, or USN Journal, specific files accessed or copied cannot be determined.

**10. Exfiltration — Examined, circumstantial evidence**
Two cloud sync services were installed during the investigation window:
- **Google Drive** (googledrivesync.exe, installed 2015-03-23, last run 2015-03-25 15:21:31, call_id 34)
- **iCloud** (installed 2015-03-23, call_id 24)

Two USB drives were also connected (call_id 31). These provide multiple potential exfiltration channels, but without network logs, file access records, or cloud account metadata, actual data exfiltration cannot be confirmed from this triage collection alone.

**11. Impact — Established**
The insider systematically destroyed evidence using CCleaner and Eraser, manipulated event logs with WEVTUTIL, and uninstalled the cleaning tools afterward. The Eraser autorun entry (call_id 32) would continue destroying data at each reboot. The creation of multiple administrator accounts with non-expiring passwords undermines access control. The overall pattern — account creation, cloud storage installation, USB device use, followed by systematic evidence destruction on the final day — is consistent with data theft with post-exfiltration cleanup.

**Evidence gaps:** No NTUSER.DAT (no UserAssist, no browser history, no recent documents), no MFT/USN Journal, no Sysmon/PowerShell logs, no Amcache, no network captures. These limit the ability to identify specific files accessed or exfiltrated.