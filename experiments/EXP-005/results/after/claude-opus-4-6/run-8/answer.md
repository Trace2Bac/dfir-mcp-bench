I now have comprehensive data across all attack lifecycle phases. Here is the final report.

---

# Digital Forensic Investigation Report — Case pc-triage-trudi

## Evidence Summary

| Item | Detail |
|------|--------|
| **Evidence** | PC-triage.zip (SHA-256: `6bef01b07b3640930713770ba868621940a7a798576b7542c6f1ebc7da24ccfc`) [call_id 3] |
| **Computer** | INFORMANT-PC, Windows 7 x64 (VMware VM) [call_id 38] |
| **IP Address** | 10.11.11.129/24 (DHCP), gateway/DNS 10.11.11.2 [call_id 26] |
| **Timezone** | Eastern Standard Time (UTC-4 during DST in March 2015) [call_id 26] |
| **Primary User** | `informant` (SID -1000), local admin, password hint "IAMAN" [call_id 28] |
| **Activity Window** | 2015-03-22 to 2015-03-25 |
| **Last Shutdown** | 2015-03-25 15:31:05 UTC [call_id 26] |
| **Prefetch** | Enabled (value 3) [call_id 38] |

**Artifacts examined:** SYSTEM/SOFTWARE/SAM/SECURITY registry hives, Security/System/Application/TerminalServices event logs (4 .evtx files, 2,572 events), 95 Prefetch files, ShimCache (305 entries). No NTUSER.DAT was included in the triage collection [call_id 18], limiting UserAssist and MRU analysis.

---

## Attack Lifecycle Assessment

### 1. Reconnaissance — ESTABLISHED

**Evidence:** PING.EXE was executed on 2015-03-25 14:58:34 (1 run) [call_id 13]. Explicit credential logon (Event 4648) targeting `Company-PC` with the `Company` account occurred on 2015-03-23 20:23:27 and again on 2015-03-24 13:47:06, both from PID 0x4 (System kernel), indicating network-level authentication to a remote host [call_id 21]. This demonstrates the user knew about and probed another system on the network.

### 2. Initial Access — ESTABLISHED (Insider)

**Evidence:** This is an **insider threat scenario**, not an external intrusion. The `informant` account was the first user created on the system (2015-03-22 14:33:54) and was immediately added to the local Administrators group [call_id 16, 20]. All interactive logons (Type 2) in the Security log are for `informant` via User32/Negotiate [call_id 15, 30]. The Terminal Services log shows the first session at 14:34:41 on March 22 [call_id 23]. Initial access was legitimate: an insider with admin privileges on a company workstation.

### 3. Execution — ESTABLISHED

**Evidence from Prefetch** [call_id 13]:
- **ERASER.EXE** — 2 runs, last 2015-03-25 15:13:30 (secure file deletion)
- **ERASER 6.2.0.2962.EXE** — installer, 1 run, 2015-03-25 14:50:14
- **CCLEANER64.EXE** — 2 runs, last 2015-03-25 15:15:50 (system cleaner)
- **CCSETUP504.EXE** — installer, 1 run, 2015-03-25 14:57:56
- **WEVTUTIL.EXE** — 4+2 runs across two Prefetch entries, last 2015-03-25 14:54:09 (event log utility)
- **SC.EXE** — 8 runs, last 2015-03-25 14:54:07 (service control)
- **SCHTASKS.EXE** — 2 runs, last 2015-03-25 15:18:37 (scheduled tasks)
- **NETSH.EXE** — 2 runs, last 2015-03-25 10:18:13 (network config)
- **GOOGLEDRIVESYNC.EXE** — 2 runs, last 2015-03-25 15:21:31 (cloud sync)
- **OUTLOOK.EXE** — 1 run, 2015-03-25 14:41:03; **WINWORD.EXE** — 3 runs, last 2015-03-25 15:24:48

**Corroboration from ShimCache** [call_id 14]: Eraser installer at `C:\Users\informant\Desktop\Download\Eraser 6.2.0.2962.exe` (modified 2015-03-25 14:47:40); CCleaner installer at `C:\Users\informant\Desktop\Download\ccsetup504.exe` (modified 2015-03-25 14:48:28). TMP5B99.TMP.EXE and TMPFF8D.TMP.EXE are legitimate .NET Framework 4 Setup temp components, not malware.

### 4. Persistence — ESTABLISHED

**Evidence:**
- **Autorun key** (SOFTWARE\Microsoft\Windows\CurrentVersion\Run): `Eraser` = `"C:\Program Files\Eraser\Eraser.exe" /atRestart` [call_id 29]. This ensures Eraser runs at every startup.
- **Account creation for persistence**: Three additional local accounts were created on 2015-03-22 from LogonId 0x224E3 (the `informant` session) [call_id 16, 31]:
  - `admin11` (SID -1001) created 15:51:54, added to Administrators [call_id 20]
  - `ITechTeam` (SID -1002) created 15:52:30, added to Administrators [call_id 20]
  - `temporary` (SID -1003) created 15:53:01, Users only (not admin) [call_id 20]
- No suspicious services were installed; all 7045 events map to legitimate software (.NET Framework, Google Update, Bonjour, Office, hardware drivers) [call_id 37].

### 5. Privilege Escalation — ESTABLISHED

**Evidence:** The `informant` account was created as a Default Admin User and added to the local Administrators group at creation [call_id 20, 28]. The `admin11` and `ITechTeam` accounts were also added to Administrators [call_id 20]. Event 4672 confirms admin privileges (SeDebugPrivilege, SeBackupPrivilege, etc.) were assigned to these logon sessions [call_id 22, 31]. All three admin accounts provide redundant elevated access.

### 6. Credential Access — ESTABLISHED

**Evidence:** Explicit credential logons (Event 4648) show the `informant` user knowingly used credentials for multiple accounts [call_id 21, 31]:
- `admin11` credentials at 15:53:44 and 15:57:02 on March 22
- `temporary` credentials at 15:55:57 on March 22
- `Company` credentials to `Company-PC` on 2015-03-23 20:23:27 and 2015-03-24 13:47:06

Password resets (4724) were performed for admin11 (15:52:10), ITechTeam (15:52:45), and temporary (15:53:11) [call_id 31]. The `Company` credential use targeting a different host is the most significant — it shows the insider possessed or obtained credentials for a separate identity (`Company`) on another machine (`Company-PC`).

### 7. Lateral Movement — ESTABLISHED

**Evidence:** Two Event 4648 entries show credential-based access from INFORMANT-PC to `Company-PC` using the `Company` account [call_id 21]:
- 2015-03-23 20:23:27 UTC (PID 0x4 = System kernel, indicating SMB/network share or similar)
- 2015-03-24 13:47:06 UTC (same pattern)

RDP sessions on the local machine also show the insider testing newly created accounts [call_id 23, 31]:
- Session 2 at 15:53:45 (admin11), Session 3 at 15:55:57 (temporary), Session 2 again at 15:57:02 (admin11) on March 22.

The `fDenyTSConnections=1` setting at capture time indicates RDP was disabled when the triage was taken, though it was clearly enabled earlier [call_id 25].

### 8. Exfiltration — ESTABLISHED (Multiple Channels)

**Evidence of USB exfiltration** [call_id 34]:
- **SanDisk Cruzer Fit #1** (S/N: 4C530012450531101593) — first connected 2015-03-24 13:37:59
- **SanDisk Cruzer Fit #2** (S/N: 4C530012550531106501) — first connected 2015-03-24 13:58:32
- Both USB drives were connected on the same day as the second lateral movement to Company-PC (13:47:06).

**Evidence of cloud exfiltration channel** [call_id 32, 33]:
- `googledrivesync.exe` downloaded 2015-03-23 19:56:33 to `C:\Users\informant\Downloads\`
- Google Drive Sync installed and executed (2 runs, last 2015-03-25 15:21:31)
- `icloudsetup.exe` also downloaded 2015-03-23 19:56:53

**Gap:** Without NTUSER.DAT, MRU lists, browser history, or network flow data, we cannot determine what files were copied to USB or synced to cloud services. The presence of these tools is established; actual file transfer content is not provable from this triage.

### 9. Anti-Forensics / Cover Tracks — ESTABLISHED

**Evidence of active evidence destruction** [call_id 13, 14, 29]:
- **Eraser 6.2.0.2962**: Downloaded to Desktop\Download\ (2015-03-25 14:47:40 per ShimCache), installed (Prefetch 14:50:14), executed (2 runs, last 15:13:30). Registered in Run key for startup persistence.
- **CCleaner 5.04**: Downloaded (14:48:28), installed (14:57:56), executed (2 runs, last 15:15:50), then **uninstalled** (UNINST.EXE at 15:18:29, AU_.EXE at 15:18:29) [call_id 13] — the user cleaned the system then removed the cleaning tool.
- **WEVTUTIL.EXE**: Executed multiple times on 2015-03-25 (Prefetch shows 4+2 runs) [call_id 13]. Although no Event ID 1102 or 104 (log cleared) events were found [call_id 24, 36], wevtutil can selectively delete events without triggering the full clear event.
- **SCHTASKS.EXE** (2 runs at 15:18:37): May have been used to schedule anti-forensic tasks.

The timeline on March 25 shows a clear anti-forensic workflow: install Eraser → install CCleaner → run Eraser → run CCleaner → uninstall CCleaner → then continue using the system (Google Drive Sync at 15:21, IE at 15:22, Word at 15:24) before final logoff at 15:30:57 and shutdown at 15:31:05.

---

## Timeline Summary (All times UTC)

| Date/Time | Event |
|-----------|-------|
| 2015-03-22 14:33:54 | `informant` account created, added to Administrators |
| 2015-03-22 14:34:28 | First interactive logon as `informant` |
| 2015-03-22 15:51–15:53 | Three new accounts created: `admin11`, `ITechTeam`, `temporary` |
| 2015-03-22 15:53–15:58 | Test logons to `admin11` and `temporary` via RDP |
| 2015-03-23 17:24–21:02 | `informant` session; Google Drive Sync & iCloud downloaded (~19:56) |
| 2015-03-23 20:23:27 | Lateral movement to Company-PC with `Company` credentials |
| 2015-03-24 13:21–21:07 | `informant` session |
| 2015-03-24 13:37–13:58 | Two SanDisk Cruzer Fit USB drives connected |
| 2015-03-24 13:47:06 | Second lateral movement to Company-PC |
| 2015-03-25 13:06 | Final `informant` session begins |
| 2015-03-25 14:47–14:58 | Eraser and CCleaner downloaded and installed |
| 2015-03-25 15:13–15:19 | Anti-forensic tools executed; CCleaner uninstalled |
| 2015-03-25 15:21–15:28 | Google Drive Sync, IE, Word, XPS Viewer used |
| 2015-03-25 15:30:57 | Final session logoff |
| 2015-03-25 15:31:05 | System shutdown |

---

## Gaps and Limitations

- **No NTUSER.DAT**: UserAssist, RecentDocs, TypedPaths, MRU lists unavailable [call_id 18].
- **No $MFT, USN Journal, or Amcache**: Cannot determine specific files accessed, deleted, or modified.
- **No Sysmon or PowerShell logs**: Process creation details and command lines not available.
- **No network captures or proxy logs**: Cannot confirm what data was sent to Company-PC, USB, or cloud.
- **No browser history databases**: Cannot trace specific URLs visited for downloads.
- **Process creation audit (4688) not present**: No process-level command-line visibility in event logs.

---

## Case Questions

Case Q1: Attack lifecycle phase assessment:

| Phase | Status | Evidence Summary |
|-------|--------|-----------------|
| **Reconnaissance** | ESTABLISHED | PING.EXE executed; Company-PC probed via network auth (Event 4648, PID 0x4) on Mar 23 and Mar 24 [call_id 13, 21] |
| **Initial Access** | ESTABLISHED | Insider threat — `informant` was the primary local admin, interactive logon Type 2 from system setup on Mar 22 [call_id 15, 28] |
| **Execution** | ESTABLISHED | Eraser, CCleaner, wevtutil, sc.exe, schtasks, netsh, Google Drive Sync all executed per Prefetch and corroborated by ShimCache [call_id 13, 14] |
| **Persistence** | ESTABLISHED | Eraser in SOFTWARE Run key; three additional accounts created (two with admin rights) [call_id 29, 16, 20] |
| **Privilege Escalation** | ESTABLISHED | `informant`, `admin11`, `ITechTeam` all in local Administrators; 4672 confirms full admin privileges on each logon [call_id 20, 22] |
| **Credential Access** | ESTABLISHED | Passwords set for all three new accounts (4724); explicit credential use (4648) for admin11, temporary, and the external `Company` identity [call_id 21, 31] |
| **Lateral Movement** | ESTABLISHED | Two authenticated connections to Company-PC using `Company` credentials (4648, PID 0x4) on Mar 23 and Mar 24; local RDP sessions with test accounts [call_id 21, 23] |
| **Exfiltration** | ESTABLISHED | Two SanDisk Cruzer Fit USB drives connected Mar 24; Google Drive Sync installed/executed; iCloud setup downloaded. Actual transferred content unknown (no $MFT/NTUSER) [call_id 34, 32, 33] |
| **Anti-Forensics** | ESTABLISHED | Eraser installed with startup persistence, CCleaner installed then uninstalled after use, WEVTUTIL executed multiple times — a deliberate cover-tracks workflow on Mar 25 [call_id 13, 14, 29] |