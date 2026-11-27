I now have comprehensive coverage of the attack lifecycle. Let me compile the final report.

---

# Digital Forensic Examination Report
## Case: pc-triage-trudi
## Evidence: PC-triage.zip / PC-triage/

---

### Evidence Integrity

The collection archive `PC-triage.zip` (14,315,429 bytes) was verified with the following hashes (call_id 3):
- **MD5**: `3743fb5b367adf5fb9cd2256d82b4afd`
- **SHA1**: `94bc5451ae7b3a436b1966acc21ca5fc50dedeb3`
- **SHA256**: `6bef01b07b3640930713770ba868621940a7a798576b7542c6f1ebc7da24ccfc`

### System Profile

- **Computer Name**: INFORMANT-PC (call_id 38)
- **OS**: Windows 7 x64 (call_id 16)
- **Network**: Wired connection to `localdomain`, gateway MAC `00-50-56-EB-B2-2C` (VMware), connected since 2015-03-22 (call_id 26)
- **Time Zone**: Eastern Standard Time (UTC-5) (call_id 43)
- **Evidence scope**: 2015-03-22 to 2015-03-25

### Collection Gaps

The triage collection lacks: NTUSER.DAT files (no UserAssist, RecentDocs, RunMRU, TypedURLs), Amcache, $MFT, USN Journal, PowerShell/Sysmon event logs, and browser history. No 4688 (process creation) audit events were enabled, so command-line arguments are absent.

---

### User Accounts (call_id 25, 27)

| Account | RID | Type | Created (UTC) | Last Login (UTC) | Admin Group |
|---------|-----|------|---------------|------------------|-------------|
| Administrator | 500 | Built-in | 2015-03-25 10:33:22 | 2010-11-21 03:47:20 | Yes (disabled) |
| informant | 1000 | Custom Admin | 2015-03-22 14:33:54 | 2015-03-25 14:45:59 | Yes |
| admin11 | 1001 | Custom Admin | 2015-03-22 15:51:54 | 2015-03-22 15:57:02 | Yes |
| ITechTeam | 1002 | Custom Admin | 2015-03-22 15:52:30 | Never | Yes |
| temporary | 1003 | Custom Limited | 2015-03-22 15:53:01 | 2015-03-22 15:55:57 | Yes |

All four custom accounts were created by the `informant` user (SubjectLogonId 0x224E3 for admin11, ITechTeam, temporary — call_id 27). All were added to the local Administrators group (4732 events, call_id 37). The `temporary` account was created as "Custom Limited" but was elevated to Administrators.

---

### Timeline of Key Activity

**2015-03-22 (System Setup & Account Creation)**
- 14:33:54 — `informant` account created during Windows setup (call_id 27)
- 14:34:28 — First interactive logon by `informant` (call_id 28)
- 15:00–15:04 — Microsoft Office Professional Plus 2013 installed (call_id 47)
- 15:11 — Chrome, IE11 installed; Google Update services registered (call_id 36)
- 15:51:54 — `admin11` created by `informant` (LogonId 0x224E3), added to Administrators (call_id 27)
- 15:52:30 — `ITechTeam` created by `informant`, added to Administrators (call_id 27)
- 15:53:01 — `temporary` created by `informant`, added to Administrators (call_id 27)
- 15:53:44 — `admin11` logged on interactively (Session 2 via TS, call_id 31)
- 15:55:57 — `temporary` logged on interactively (Session 3, call_id 31)
- 15:57:02 — `admin11` logged on again (Session 2, call_id 31)
- 15:57:54 — `informant` reconnected (call_id 31)

**2015-03-23 (Cloud Services & Lateral Movement)**
- 17:24:41 — `informant` logged on (call_id 28)
- 20:00–20:02 — Apple iCloud and Google Drive installed (call_id 47)
- 20:23:27 — **Explicit credential logon attempt to `Company-PC` with account `Company`** (4648, call_id 29)

**2015-03-24 (Continued Access & Lateral Movement)**
- 13:21:44 — `informant` logged on (call_id 28)
- 13:47:06 — **Second explicit credential attempt to `Company-PC` with account `Company`** (4648, call_id 29)
- 18:28:38 — `informant` unlocked workstation (LogonType 7, call_id 28)
- 21:07:25 — Logoff (call_id 32)

**2015-03-25 (Anti-Forensics Cleanup Session)**
- 13:06:08 — `informant` logged on (call_id 31)
- 14:41:03 — Outlook opened (call_id 44)
- 14:45:59 — Explicit credential logon (call_id 29)
- 14:47:40 — `Eraser 6.2.0.2962.exe` saved to `Desktop\Download` (ShimCache LastMod, call_id 22)
- 14:48:28 — `ccsetup504.exe` saved to `Desktop\Download` (call_id 34)
- 14:50:14 — Eraser installer executed (call_id 23)
- 14:50:15 — .NET Framework 4 installed (Eraser dependency, call_id 47)
- 14:54:07 — `sc.exe` executed (8 total runs), `wevtutil.exe` (4+2 runs) (call_id 30)
- 14:57:31 — Eraser registered as autorun: `"C:\Program Files\Eraser\Eraser.exe" /atRestart` (call_id 33)
- 14:57:49 — Eraser installation confirmed in Application log (call_id 46)
- 14:58:34 — `ping.exe` executed (call_id 30)
- 15:13:30 — `Eraser.exe` executed (run count 2, call_id 44)
- 15:15:50 — `CCleaner64.exe` executed (run count 2, call_id 30)
- 15:18:29 — CCleaner uninstalled (`uninst.exe`, call_id 30)
- 15:18:37 — `schtasks.exe` executed (run count 2, call_id 30)
- 15:19:11 — MSI installer activity (call_id 44)
- 15:21:31 — Google Drive Sync running (call_id 44)
- 15:22:07 — IE opened (call_id 44)
- 15:24:48 — Word document opened (call_id 44)
- 15:30:57 — **Final logoff** (call_id 32)

---

### Case Questions

Case Q1: Attack lifecycle assessment by phase:

**1. Reconnaissance — Not examined.** The triage collection lacks browser history (no NTUSER.DAT), PowerShell logs, and DNS client logs. `ping.exe` was executed once on 2015-03-25 14:58:34 (call_id 30), which could indicate network probing, but insufficient evidence to establish this phase.

**2. Initial Access — Not examined.** No email attachments, download history, or exploit artifacts are available in this limited triage collection. The collection lacks browser caches, download folders, and email stores.

**3. Execution — ESTABLISHED.** Prefetch and ShimCache confirm execution of numerous programs including anti-forensics tools (Eraser, CCleaner), system administration utilities (wevtutil, sc.exe, schtasks, netsh, ping, cmd.exe), Office applications (Outlook, Word), cloud sync tools (Google Drive), and browsers (Chrome, IE). Evidence: Prefetch CSV (call_id 23, 30, 44) and ShimCache CSV (call_id 22, 34).

**4. Persistence — ESTABLISHED.** Three mechanisms found: (a) Eraser set in `HKLM\...\Run` to execute `/atRestart`, configured 2015-03-25 14:57:31 (call_id 33), scheduling secure deletion on reboot; (b) Three new local administrator accounts created on 2015-03-22 (admin11, ITechTeam, temporary — call_id 25, 27); (c) Google Drive auto-sync service registered as auto-start (call_id 36).

**5. Privilege Escalation — ESTABLISHED.** The `informant` user (already admin) created three additional accounts and elevated all of them to the local Administrators group via 4732 events (call_id 37). The `temporary` account was initially "Custom Limited" but was immediately placed in Administrators. All logons by admin11 and informant show 4672 (special privileges assigned — call_id 37).

**6. Credential Access — Not examined.** No NTUSER.DAT means no browser credential artifacts. No LSASS dumps or credential harvesting tools detected. However, 4648 events show explicit credential usage for the `Company` account targeting `Company-PC` (call_id 29), implying the informant user possessed credentials for that account.

**7. Defense Evasion / Anti-Forensics — ESTABLISHED.** The strongest phase in this investigation. On 2015-03-25, the user: (a) Downloaded, installed, and ran **Eraser 6.2.0.2962** (secure file deletion — call_id 22, 23, 46); (b) Downloaded, installed, ran, then **uninstalled CCleaner** to remove traces of the cleaning tool itself (call_id 30, 34); (c) Executed **wevtutil.exe** 6 times total (call_id 30) — while some runs coincide with .NET Framework registration, the execution count exceeds what .NET setup typically requires; (d) Executed **schtasks.exe** (call_id 30) potentially to remove scheduled tasks; (e) Set Eraser as a **Run key autostart** with `/atRestart` to continue deletion after reboot (call_id 33); (f) Executed **sc.exe** 8 times (call_id 30) for service manipulation.

**8. Lateral Movement — ESTABLISHED.** Two 4648 (explicit credential logon) events on 2015-03-23 20:23:27 and 2015-03-24 13:47:06 show the `informant` user authenticating to `Company-PC` using the `Company` account (call_id 29). This demonstrates credential reuse/knowledge and an attempt to access another system on the network. Locally, the user switched between `informant`, `admin11`, and `temporary` accounts via Terminal Services sessions (call_id 31).

**9. Collection — Examined, not conclusively established.** Outlook was opened on 2015-03-25 14:41:03 (call_id 44), and Word documents were accessed at 15:24:48, shortly before the final logoff. However, without file system metadata ($MFT) or document content, specific data staging cannot be confirmed.

**10. Exfiltration — Examined, possible but not conclusively established.** **Google Drive** was installed on 2015-03-23 (call_id 47) and was running on 2015-03-25 15:21:31 (call_id 44). **Apple iCloud** was installed 2015-03-23 (call_id 47). Both provide cloud synchronization channels capable of exfiltrating data. Without NTUSER.DAT, Sync folder contents, or network traffic logs, actual data transfer cannot be confirmed. The pattern — installing cloud sync, accessing Office files, then running anti-forensics tools — is consistent with exfiltration followed by cover-up.

**11. Impact / Actions on Objectives — ESTABLISHED.** The primary impact is **anti-forensic destruction of evidence**. The user systematically installed and used Eraser (secure deletion), CCleaner (artifact removal), and configured persistent deletion via the autorun. The uninstallation of CCleaner after use indicates deliberate intent to remove traces of the cleaning tool. This represents intentional destruction of potential evidence on a corporate PC during an internal investigation.