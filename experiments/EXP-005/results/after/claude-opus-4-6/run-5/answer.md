I now have comprehensive data across all lifecycle phases. Here is the final report.

---

# Forensic Investigation Report: PC-Triage (INFORMANT-PC)

## Evidence Verification

| Item | Value |
|------|-------|
| Evidence file | `/evidence/pc-triage/PC-triage.zip` |
| SHA-256 | `6bef01b07b3640930713770ba868621940a7a798576b7542c6f1ebc7da24ccfc` |
| MD5 | `3743fb5b367adf5fb9cd2256d82b4afd` |
| SHA-1 | `94bc5451ae7b3a436b1966acc21ca5fc50dedeb3` |

(call_id 3)

## System Profile

| Attribute | Value |
|-----------|-------|
| Computer Name | INFORMANT-PC |
| OS | Windows 7 x64 (ProductType: WinNT) |
| Time Zone | Eastern Standard Time (UTC-5 / EDT UTC-4) |
| IP Address | 10.11.11.129 (DHCP, subnet /24) |
| Gateway / DNS | 10.11.11.2 |
| Platform | VMware virtual machine |
| Last Shutdown | 2015-03-25 15:31:05 UTC |

(call_ids 23, 32)

## User Accounts

| Username | RID | Group Membership | Created (UTC) | Last Logon (UTC) |
|----------|-----|------------------|---------------|-------------------|
| Administrator | 500 | Administrators (disabled) | -- | 2010-11-21 03:47:20 |
| Guest | 501 | Guests (disabled) | -- | Never |
| informant | 1000 | Administrators | 2015-03-22 14:33:54 | 2015-03-25 14:45:59 |
| admin11 | 1001 | Administrators, Users | 2015-03-22 15:51:54 | 2015-03-22 15:57:02 |
| ITechTeam | 1002 | Administrators, Users | 2015-03-22 15:52:30 | Never |
| temporary | 1003 | Users only | 2015-03-22 15:53:01 | 2015-03-22 15:55:57 |

All three non-default accounts (admin11, ITechTeam, temporary) were created by user "informant" from logon session 0x224E3 on 2015-03-22 between 15:51 and 15:53 UTC. admin11 and ITechTeam were immediately elevated to the local Administrators group. (call_ids 17, 18, 19)

## Activity Timeline (key events, all UTC)

| Date/Time | Event |
|-----------|-------|
| 2015-03-22 14:33:54 | Account "informant" created, added to Administrators |
| 2015-03-22 14:34:28 | informant first interactive logon (Type 2) |
| 2015-03-22 15:11 | Chrome, Google Update, IE11 installed |
| 2015-03-22 15:51–15:53 | Three accounts created: admin11, ITechTeam, temporary |
| 2015-03-22 15:53:44 | admin11 interactive logon |
| 2015-03-22 15:55:57 | temporary interactive logon |
| 2015-03-23 17:24–21:02 | informant session (long work session) |
| 2015-03-23 ~19:56–20:02 | Google Drive downloaded and installed |
| 2015-03-24 13:21–21:07 | informant session |
| 2015-03-24 13:38:00 | First SanDisk Cruzer Fit USB (SN ...1593) connected |
| 2015-03-24 13:58:33 | Second SanDisk Cruzer Fit USB (SN ...6501) connected |
| 2015-03-25 13:06–15:31 | Final informant session |
| 2015-03-25 14:41:03 | Outlook.exe executed |
| 2015-03-25 14:48:28 | CCleaner installer (ccsetup504.exe) on Desktop\Download |
| 2015-03-25 14:50:14 | Eraser 6.2.0.2962 installer executed |
| 2015-03-25 14:50:15 | .NET Framework 4 setup (Eraser dependency) |
| 2015-03-25 14:54:07 | sc.exe last run (8 total executions) |
| 2015-03-25 14:54:09 | wevtutil.exe last run (6 total executions) |
| 2015-03-25 14:57:31 | Eraser added to Run key (autostart at reboot) |
| 2015-03-25 14:58:34 | ping.exe last run |
| 2015-03-25 15:13:30 | Eraser.exe last run |
| 2015-03-25 15:15:50 | CCleaner64.exe last run |
| 2015-03-25 15:18:29 | CCleaner uninst.exe run (CCleaner uninstalled) |
| 2015-03-25 15:18:37 | schtasks.exe last run |
| 2015-03-25 15:21:31 | GoogleDriveSync.exe last run |
| 2015-03-25 15:24:48 | WinWord.exe last run |
| 2015-03-25 15:28:47 | XPS Viewer last run |
| 2015-03-25 15:31:05 | System shutdown |

## Case Questions

Case Q1: Attack lifecycle phase-by-phase assessment:

**1. Reconnaissance / Initial Access — NOT EXAMINED.** The triage collection does not include NTUSER.DAT hives, browser history, PowerShell logs, or Sysmon telemetry. No process creation auditing (Event ID 4688) was found in the Security log. The initial compromise vector cannot be determined from the available artifacts.

**2. Execution — ESTABLISHED.** Prefetch and ShimCache confirm execution of numerous tools relevant to the attack: cmd.exe, schtasks.exe (RunCount 2), sc.exe (RunCount 8), wevtutil.exe (RunCount 6), netsh.exe (RunCount 2), ping.exe (RunCount 1), CCleaner64.exe (RunCount 2), Eraser.exe (RunCount 2), GoogleDriveSync.exe (RunCount 2), Outlook.exe, and WinWord.exe. ShimCache contained 292 entries in ControlSet001, with the Execute flag set for most entries (Windows 7 preserves this flag). (call_ids 8, 9, 15, 16, 27, 28)

**3. Persistence — ESTABLISHED.** (a) Eraser was registered in the SOFTWARE Run key as `"C:\Program Files\Eraser\Eraser.exe" /atRestart`, last written 2015-03-25 14:57:31 (call_id 21). (b) Three rogue user accounts (admin11, ITechTeam, temporary) were created with PasswordDoesNotExpire, with admin11 and ITechTeam in the local Administrators group, providing persistent elevated access (call_ids 18, 19). (c) No suspicious Windows services were identified beyond standard OS and Google Update services (call_id 22).

**4. Privilege Escalation — ESTABLISHED.** User "informant" (already an administrator) created three accounts on 2015-03-22 and immediately added admin11 (SID ...1001) and ITechTeam (SID ...1002) to the local Administrators group via Event ID 4732 (call_id 18). This grants these accounts unrestricted system access. The SubjectLogonId 0x224E3 ties all account creation and elevation to informant's active session (call_ids 17, 18).

**5. Lateral Movement — EXAMINED, limited evidence.** All observed user logons were local interactive (Type 2) or service logons (Type 5). fDenyTSConnections=1 at time of collection (RDP disabled), though RDP NLA was not enforced (UserAuthentication=0) (call_id 30). Terminal Services logs show local console sessions, not remote RDP connections (no source IP data in the TS events) (call_id 20). No evidence of lateral movement to or from other hosts was found, though the limited artifact set (no firewall logs, no network captures) means remote activity cannot be ruled out.

**6. Exfiltration — ESTABLISHED (indicators present, volume unknown).** Two independent exfiltration channels were identified: (a) **USB**: Two SanDisk Cruzer Fit USB drives (VID 0781 / PID 5571) were connected on 2015-03-24 — SN 4C530012450531101593 at 13:38:00 and SN 4C530012550531106501 at 13:58:33 (call_id 26). (b) **Cloud storage**: Google Drive was downloaded on 2015-03-23, installed the same day (call_id 29, InstallDate 20150323), and GoogleDriveSync.exe last executed 2015-03-25 15:21:31 — just 10 minutes before final shutdown (call_ids 25, 28). Without filesystem content or network flow data, the exact files transferred cannot be determined from this triage set.

**7. Anti-Forensics / Cover Tracks — ESTABLISHED.** On the final day (2015-03-25), the user undertook a concentrated cleanup effort: (a) **Eraser 6.2.0.2962** installed at 14:50, configured to run at startup via Run key at 14:57, executed twice with last run at 15:13 (call_ids 21, 27, 29). Eraser performs secure file deletion. (b) **CCleaner v5.04** downloaded to Desktop\Download, executed twice (last run 15:15:50), then **uninstalled** at 15:18:29 — consistent with using it to wipe browser history/temp files and then removing the tool itself (call_ids 15, 27, 29). (c) **wevtutil.exe** executed 6 times (last at 14:54:09), which can clear Windows event logs (call_id 27). The EvtxECmd parser noted "time just went backwards" warnings in the Security and Application logs, consistent with log manipulation or rotation gaps (call_id 10). (d) **sc.exe** run 8 times (last at 14:54:07) — could have been used to manipulate services (call_id 27).