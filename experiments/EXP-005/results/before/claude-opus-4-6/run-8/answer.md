I now have a comprehensive picture of this investigation. Let me compile the final report.

---

# Digital Forensic Report — Case: pc-triage-trudi

## Evidence Summary

**Evidence file:** PC-triage.zip (14,315,429 bytes)
- **SHA256:** 6bef01b07b3640930713770ba868621940a7a798576b7542c6f1ebc7da24ccfc
- **SHA1:** 94bc5451ae7b3a436b1966acc21ca5fc50dedeb3
- **MD5:** 3743fb5b367adf5fb9cd2256d82b4afd
(call_id 3)

## System Profile

| Attribute | Value |
|---|---|
| Computer Name | INFORMANT-PC |
| OS | Windows 7 x64 |
| IP Address | 10.11.11.129 (DHCP) |
| Gateway / DNS | 10.11.11.2 |
| Subnet | 255.255.255.0 |
| Active Timeframe | 2015-03-22 to 2015-03-25 |

(call_ids 29, 11)

## User Accounts (from SAM)

| Username | RID | Type | Created | Last Login | Group Memberships |
|---|---|---|---|---|---|
| Administrator | 500 | Disabled | 2015-03-25 10:33 | 2010-11-21 | Administrators |
| Guest | 501 | Disabled | 2015-03-25 10:33 | Never | Guests |
| **informant** | 1000 | Admin | 2015-03-22 14:33 | 2015-03-25 14:45 | **Administrators** |
| **admin11** | 1001 | Admin | 2015-03-22 15:51 | 2015-03-22 15:57 | **Administrators**, Users |
| **ITechTeam** | 1002 | Admin | 2015-03-22 15:52 | Never | **Administrators**, Users |
| **temporary** | 1003 | Standard | 2015-03-22 15:53 | 2015-03-22 15:55 | Users |

The **informant** user (password hint: "IAMAN") created all three additional accounts. All accounts had PasswordDoesNotExpire set. (call_ids 21, 22)

## USB Devices

Two **SanDisk Cruzer Fit** USB flash drives connected on 2015-03-23:
- Serial: 4C530012450531101593
- Serial: 4C530012550531106501

Two additional USB devices (VID_14DD&PID_1005) also connected. (call_id 29)

---

## Case Questions

Case Q1: Attack lifecycle phase assessment:

**1. Reconnaissance — ESTABLISHED.** ipconfig.exe (shimcache position 187, call_id 28) and ping.exe (prefetch last run 2015-03-25 14:58:34, run count 1, call_id 14; shimcache position 81 with Executed=Yes, call_id 10) were run, indicating basic network reconnaissance. The user explored the network enough to identify "Company-PC" as a target.

**2. Initial Access — ESTABLISHED (insider threat scenario).** The "informant" account was created during Windows setup on 2015-03-22 14:33:54 as a local administrator (4720 event, call_id 16). This was an interactive logon (LogonType 2) via RDP (TS Session logon at 2015-03-22 14:34:41, call_id 19). The user had full administrative access to the system from the start, consistent with an insider threat rather than external compromise.

**3. Execution — ESTABLISHED.** Extensive evidence of program execution across Prefetch (95 files, call_id 14) and ShimCache (292 entries, call_id 7). Key executed programs include: cmd.exe, schtasks.exe (run count 2), sc.exe (run count 8), netsh.exe (run count 2), wevtutil.exe (run count 4+2 across two prefetch entries), CCleaner64.exe (run count 2, last run 2015-03-25 15:15:50), Eraser.exe (run count 2, last run 2015-03-25 15:13:30), Google Drive Sync (run count 2), and iCloud setup (call_ids 13, 14, 28).

**4. Persistence — ESTABLISHED.** (a) Eraser was added to the Run registry key at `SOFTWARE\Microsoft\Windows\CurrentVersion\Run` with the value `"C:\Program Files\Eraser\Eraser.exe" /atRestart` (written 2015-03-25 14:57:31, call_id 33), ensuring it runs at every restart to perform scheduled file erasure. (b) Three new user accounts were created with PasswordDoesNotExpire (admin11 and ITechTeam with Administrators group membership), providing persistent backdoor access (call_ids 16, 18, 21). (c) Google Update Service was installed as auto-start (7045 event at 2015-03-22 15:11:26, call_id 30).

**5. Privilege Escalation — ESTABLISHED.** The informant user (already an administrator) created admin11 and ITechTeam and added both to the Administrators group via 4732 events (call_id 18): admin11 (SID -1001) added at 2015-03-22 15:51:54, ITechTeam (SID -1002) added at 2015-03-22 15:52:30. All accounts received SeSecurityPrivilege, SeTakeOwnershipPrivilege, SeDebugPrivilege, and other sensitive privileges upon logon (4672 events, call_id 19).

**6. Defense Evasion / Anti-Forensics — ESTABLISHED.** (a) **Eraser 6.2.0.2962** installed 2015-03-25 14:57:49 (1033 event, call_id 31) and executed twice (prefetch call_id 14) — a secure file deletion tool. It was configured for persistent operation at restart. (b) **CCleaner** (ccsetup504.exe) was downloaded to Desktop\Download, installed, executed twice (prefetch call_id 14), and then its uninstaller (uninst.exe) was run at 2015-03-25 15:18:29 — cleaning up after itself. (c) **wevtutil.exe** was executed (4+2 runs across two prefetch entries, call_id 14), which can manipulate event logs, though no 1102 (audit log cleared) events were found (call_id 32). (d) **NTUSER.DAT** for the informant user was not present in the triage collection (call_id 23), which means UserAssist, RecentDocs, TypedPaths, and other user-specific registry artifacts are unavailable — a significant gap. (e) fDenyTSConnections was set to 1 (deny RDP) on 2015-03-25 13:05:43 (call_id 26), potentially to close RDP access after use.

**7. Lateral Movement — ESTABLISHED.** (a) Two 4648 (explicit credential) events show the informant user authenticating to **"Company-PC"** using the **"Company"** account: 2015-03-23 20:23:27 and 2015-03-24 13:47:06 (call_id 17). This is the clearest indicator of lateral movement to another host on the network. (b) RDP sessions on the local machine: informant logged on via RDP 8+ times across 4 days; admin11 logged on via RDP twice (Sessions 2 at 2015-03-22 15:53:45 and 15:57:02); temporary logged on via RDP once (Session 3 at 2015-03-22 15:55:57) (call_id 19). (c) The user switched between accounts by disconnecting the informant RDP session and logging in as admin11, then temporary, then reconnecting as informant — testing access with the newly created accounts.

**8. Collection — EXAMINED, indicators present but no direct evidence of specific files collected.** Microsoft Word (run count 3, last run 2015-03-25 15:24:48) and Outlook (run count 1, last run 2015-03-25 14:41:03) were executed (call_id 14), indicating access to documents and email. Two SanDisk Cruzer Fit USB drives were connected on 2015-03-23 (call_id 29). Without the NTUSER.DAT (RecentDocs, TypedPaths) or MFT, we cannot determine which specific files were accessed or staged.

**9. Exfiltration — EXAMINED, indicators present but not conclusively established.** (a) **Google Drive** was installed on 2015-03-23 20:02:46 (call_id 31) and googledrivesync.exe was executed (prefetch run count 2, last run 2015-03-25 15:21:31, call_id 14). The sync executable was also downloaded to `C:\Users\informant\Downloads\googledrivesync.exe` (shimcache, call_id 28). (b) **iCloud** was installed on 2015-03-23 20:00:21 (call_id 31). (c) Two **USB drives** were connected (call_id 29). These are three potential exfiltration vectors (cloud sync, cloud storage, removable media), but without file-level artifacts (MFT, USN journal, NTUSER.DAT), we cannot prove what data, if any, was exfiltrated through them.

**10. Impact — EXAMINED, indicators present.** The combination of: (a) unauthorized account creation with admin privileges, (b) lateral movement to Company-PC, (c) installation of data destruction tools (Eraser) configured for persistent operation, (d) installation of cloud sync tools, and (e) anti-forensic cleanup (CCleaner, Eraser) collectively indicate a deliberate insider threat operation. The Eraser tool configured to run at restart (`/atRestart`) may have destroyed evidence on subsequent reboots. The scope of impact to Company-PC and any exfiltrated data cannot be determined from this triage collection alone.

**11. Credential Access — NOT EXAMINED.** No memory dump was available, no credential dumping tools (mimikatz, etc.) were detected in shimcache or prefetch, and without NTUSER.DAT we cannot examine cached credentials. The 4648 events showing access to Company-PC with the "Company" account credentials indicate the informant knew or obtained those credentials, but the method of acquisition cannot be determined from this evidence.

**12. Command and Control — RULED OUT (no evidence found).** No C2 frameworks, remote access trojans, beacons, or suspicious network-related executables were found in shimcache, prefetch, or installed services. All installed services are legitimate (Google Update, Bonjour, .NET Framework, Office). This is consistent with an insider threat scenario where C2 infrastructure is unnecessary.