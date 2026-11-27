I have examined all available evidence across the full attack lifecycle. Here is my final report.

---

# Digital Forensic Examination Report: INFORMANT-PC

## Case: pc-triage-trudi

### Evidence Integrity

| Item | Hash |
|------|------|
| PC-triage.zip (14,315,429 bytes) | MD5: `3743fb5b367adf5fb9cd2256d82b4afd` / SHA1: `94bc5451ae7b3a436b1966acc21ca5fc50dedeb3` |

(call_id 3)

### System Profile

| Property | Value |
|----------|-------|
| Computer Name | INFORMANT-PC (formerly 37L4247F27-25) |
| OS | Windows 7 x64 |
| IP Address | 10.11.11.129 (DHCP from 10.11.11.254) |
| DNS/Gateway | 10.11.11.2 |
| Domain | localdomain |
| Time Zone | Eastern Standard Time (UTC-5 / UTC-4 DST) |
| Virtualization | VMware Virtual Machine |
| Activity Period | 2015-03-22 through 2015-03-25 |

(call_ids 27, 37, 40)

### User Accounts (from SAM)

| Username | RID | Type | Created | Administrators? | Logins | Password Hint |
|----------|-----|------|---------|-----------------|--------|---------------|
| informant | 1000 | Admin | 2015-03-22 14:33 | Yes | 10 | "IAMAN" |
| admin11 | 1001 | Admin | 2015-03-22 15:51 | Yes | 2 | - |
| ITechTeam | 1002 | Admin | 2015-03-22 15:52 | Yes | 0 | - |
| temporary | 1003 | Limited | 2015-03-22 15:53 | No (Users only) | 1 | - |

All non-default accounts were created by the `informant` user (SubjectLogonId 0x224E3) and set to "Password does not expire." (call_ids 21, 22, 31)

---

### Case Questions

Case Q1: Attack lifecycle phase-by-phase assessment:

**1. Reconnaissance / Discovery -- ESTABLISHED**
Evidence: PING.EXE executed once at 2015-03-25 14:58:34 (prefetch, call_id 19). ipconfig.exe present in shimcache (call_id 34). The user discovered and targeted "Company-PC" on the network, demonstrated by explicit credential logons (4648) directed at that host (call_id 23).

**2. Initial Access -- ESTABLISHED (Insider Threat)**
This is an insider threat, not an external intrusion. The `informant` account was created during initial system setup on 2015-03-22 14:33:54 (4720, call_id 21) and immediately placed in the local Administrators group (4732, call_id 22). First interactive logon (Type 2) at 2015-03-22 14:34:28 (call_id 26). The password hint "IAMAN" (call_id 31) is consistent with an insider actor. No evidence of exploitation, phishing, or external compromise was found.

**3. Execution -- ESTABLISHED**
Prefetch confirms execution of 95 programs; shimcache contains 292 entries (call_ids 12, 13). Key executions on the final day (2015-03-25) in chronological order: Outlook.exe (14:41:03), Eraser installer (14:50:14), .NET Framework setup temp executables TMPFF8D.tmp.exe (14:50:39) and TMP5B99.tmp.exe (14:50:53), CCleaner installer (14:57:56), Eraser.exe (15:13:30), CCleaner64.exe (15:15:50), schtasks.exe (15:18:37), CCleaner uninst.exe (15:18:29), Google Drive Sync (15:21:31), WinWord.exe (15:24:48). wevtutil.exe ran 6 times total and sc.exe ran 8 times (call_ids 19, 39).

**4. Persistence -- ESTABLISHED**
Three backdoor accounts created by `informant` on 2015-03-22 (call_id 21): `admin11` (Administrators), `ITechTeam` (Administrators), and `temporary` (Users only). All have "Password does not expire" set (call_id 31). The admin11 account was verified as functional -- logged on twice interactively with full administrative privileges (SeDebugPrivilege, etc.) confirmed by Event 4672 (call_id 29). No suspicious Windows services or Run/RunOnce registry keys were found (call_ids 30, 33). RDP was disabled (fDenyTSConnections=1) in the final registry state (call_id 28).

**5. Privilege Escalation -- ESTABLISHED**
admin11 (SID -1001) and ITechTeam (SID -1002) were both added to the local Administrators group (Builtin\Administrators, S-1-5-32-544) via Event 4732, performed by logon session 0x224E3 (the informant's session) (call_id 22). The informant's own account was already administrative from initial setup (call_id 22).

**6. Defense Evasion -- ESTABLISHED**
Three distinct anti-forensic tools were deployed on 2015-03-25:
- **Eraser 6.2.0.2962**: Downloaded to `C:\Users\informant\Desktop\Download\` (shimcache modified 2015-03-25 14:47:40, call_id 20), installed (SOFTWARE registry shows install date 20150325, call_id 33), executed 2 times with last run at 15:13:30 (prefetch, call_id 19). Secure file deletion tool.
- **CCleaner 5.04**: Downloaded as ccsetup504.exe to `C:\Users\informant\Desktop\Download\` (shimcache modified 2015-03-25 14:48:28, call_id 41), CCleaner64.exe ran 2 times with last run at 15:15:50 (prefetch, call_id 19), then **uninstalled** (uninst.exe at 15:18:29, call_id 19) -- demonstrating cover-up awareness.
- **wevtutil.exe**: Executed 6 times across two prefetch entries (both last run 2015-03-25 14:54:09, call_ids 19, 39). This tool can clear, export, or manipulate Windows event logs. No Event ID 1102 (audit log cleared) was found, but wevtutil can selectively delete events without triggering 1102.

**7. Credential Access -- ESTABLISHED**
The informant used credentials for the `Company` account (a username not present in the local SAM) to authenticate to `Company-PC` via explicit credential logon (Event 4648) on two occasions: 2015-03-23 20:23:27 and 2015-03-24 13:47:06, both from PID 0x4 (System process) (call_id 23). This indicates the informant obtained another user's credentials. How these credentials were acquired is not determinable from the available artifacts alone.

**8. Lateral Movement -- ESTABLISHED**
The two 4648 events targeting `Company-PC` as `INFORMANT-PC\Company` (call_id 23) demonstrate attempted lateral movement to another host on the 10.11.11.0/24 network. mstsc.exe (Remote Desktop Client) is present in shimcache (call_id 34), though no corresponding prefetch was found in the triage collection (may have been purged or was outside the 128-entry Win7 prefetch limit). The admin11 and temporary accounts were used for local interactive logons (Sessions 2 and 3 on 2015-03-22, call_ids 25, 29), potentially testing those accounts before deploying them on other systems.

**9. Collection -- ESTABLISHED**
Multiple data collection indicators:
- **Google Drive Sync**: Downloaded 2015-03-23 to `C:\Users\informant\Downloads\` (shimcache, call_id 36), installed, and executed 2 times with last run 2015-03-25 15:21:31 (prefetch, call_id 19). Provides cloud file synchronization.
- **iCloud**: icloudsetup.exe downloaded 2015-03-23 (shimcache, call_id 41). Apple Internet Services/iCloud.exe present in shimcache (call_id 41).
- **Two SanDisk Cruzer Fit USB drives** connected (serial numbers 4C530012450531101593 and 4C530012550531106501, call_id 40). D: drive access confirmed via shimcache entry for `D:\IE11-Windows6.1-x64-en-us.exe` (call_id 41).
- **Outlook.exe** executed once at 14:41:03 (email access) and **WinWord.exe** executed 3 times with last run at 15:24:48 (document access) (call_id 19).

**10. Exfiltration -- ESTABLISHED (indicators, not proven)**
The combination of Google Drive Sync execution (call_id 19), iCloud setup download (call_id 41), and two USB storage devices (call_id 40) provides three viable exfiltration channels. Without NTUSER.DAT (UserAssist, RecentDocs, shellbags) or file system timeline ($MFT), it is not possible to confirm what data was actually exfiltrated. The presence and execution of these tools, in the context of the other attack lifecycle phases, strongly indicates exfiltration capability was established. The absence of NTUSER.DAT from the triage collection is itself a gap -- it may have been excluded from collection or wiped by the anti-forensic tools.

**11. Impact / Actions on Objectives -- ESTABLISHED**
The final-day activity sequence (2015-03-25) shows a methodical cleanup operation: install Eraser (14:50), run Eraser (15:13), run CCleaner (15:15), uninstall CCleaner (15:18), execute schtasks (15:18), sync Google Drive (15:21), use Word (15:24). This pattern is consistent with an insider destroying evidence, synchronizing remaining data, and conducting final document review before the system was collected. The creation of three backdoor accounts with non-expiring passwords indicates intent to maintain persistent access.

---

### Gaps and Limitations

- **No NTUSER.DAT or UsrClass.dat**: UserAssist, RecentDocs, shellbags, typed paths, and MRU lists are unavailable. These would have provided direct evidence of files accessed and programs run by the informant user.
- **No Amcache.hve**: Cannot corroborate execution timestamps or file hashes.
- **No $MFT or USN Journal**: Cannot reconstruct file system timeline or identify deleted files.
- **No Sysmon or PowerShell logs**: Only Application, Security, System, and TerminalServices-LocalSessionManager event logs were collected.
- **No Event ID 4688 (Process Creation)**: Command-line auditing was not enabled, so specific command arguments are unknown.
- **Eraser and CCleaner may have destroyed additional artifacts**: The anti-forensic tools were run before the triage collection, so the available evidence is likely a subset of what originally existed.