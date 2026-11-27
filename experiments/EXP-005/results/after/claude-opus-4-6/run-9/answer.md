All five lifecycle phases are now examined. Here is the final report.

---

# Digital Forensic Report: PC-Triage (INFORMANT-PC)

## Evidence Integrity

| Item | Hash |
|------|------|
| PC-triage.zip | MD5: `3743fb5b367adf5fb9cd2256d82b4afd` / SHA1: `94bc5451ae7b3a436b1966acc21ca5fc50dedeb3` (call_id 3) |

## System Profile

| Attribute | Value |
|-----------|-------|
| Computer name | INFORMANT-PC (call_id 26) |
| OS | Windows 7 x64 (call_id 16) |
| IP address | 10.11.11.129 (DHCP) (call_id 26) |
| Gateway / DNS | 10.11.11.2 (call_id 26) |
| Time zone | Eastern Standard Time (UTC-5 / EDT UTC-4) (call_id 26) |
| Platform | VMware virtual machine (call_id 31) |
| RDP status | fDenyTSConnections = 1 (disabled) (call_id 27) |

## User Accounts (SAM — call_id 28)

| Username | RID | Created | Last Login | Group Membership | Flags |
|----------|-----|---------|------------|-----------------|-------|
| Administrator | 500 | — | 2010-11-21 | Administrators | Disabled |
| Guest | 501 | — | Never | Guests | Disabled |
| **informant** | 1000 | 2015-03-22 14:33:54 | 2015-03-25 14:45:59 | **Administrators** | PasswordNotRequired, PasswordDoesNotExpire |
| **admin11** | 1001 | 2015-03-22 15:51:54 | 2015-03-22 15:57:02 | **Administrators** | PasswordDoesNotExpire |
| **ITechTeam** | 1002 | 2015-03-22 15:52:30 | Never | **Administrators** | PasswordDoesNotExpire |
| **temporary** | 1003 | 2015-03-22 15:53:01 | 2015-03-22 15:55:57 | Users only | PasswordDoesNotExpire |

## Available Artifacts

The triage collection includes: SYSTEM, SOFTWARE, SAM, SECURITY registry hives; Prefetch (95 files); Security.evtx, System.evtx, Application.evtx, TerminalServices-LocalSessionManager.evtx. **Not collected:** NTUSER.DAT, UsrClass.dat, $MFT, browser history, Amcache, PowerShell logs, Sysmon. The absence of NTUSER.DAT means UserAssist, RecentDocs, Run/RunOnce keys, and typed URLs are not available.

---

## Case Questions

**Case Q1:** Attack lifecycle phase assessment, based on the available evidence:

### 1. Reconnaissance — Examined, limited evidence
PING.EXE was executed once on 2015-03-25 at 14:58:34 UTC (Prefetch, call_id 20). This indicates basic network probing. No port-scanning or enumeration tools were found in Shimcache or Prefetch. Without browser history, DNS cache, or NTUSER.DAT, deeper reconnaissance activity cannot be assessed.

### 2. Initial Access / Weaponization / Delivery — Not examined (insufficient artifacts)
The triage collection lacks NTUSER.DAT, browser history, email stores, and download logs. The initial vector by which the user obtained access or tools cannot be determined from the available evidence. This is a gap, not a negative finding.

### 3. Execution — **ESTABLISHED**
Multiple suspicious programs executed on the final active day, 2015-03-25 (Prefetch, call_id 20):
- **Eraser 6.2.0.2962.exe** (secure-deletion installer): last run 14:50:14
- **Eraser.exe**: last run 15:13:30, run count 2
- **ccsetup504.exe** (CCleaner installer): last run 14:57:56, downloaded to `C:\Users\informant\Desktop\Download\` (Shimcache call_id 19)
- **CCleaner64.exe**: last run 15:15:50, run count 2
- **wevtutil.exe** (event log tool): last run 14:54:09, run count 4+2 across two prefetch entries
- **schtasks.exe**: last run 15:18:37, run count 2
- **sc.exe**: last run 14:54:07, run count 8
- **googledrivesync.exe**: last run 15:21:31 (call_id 20)
- **cmd.exe**, **WScript.exe**: both marked Executed=Yes in Shimcache (call_id 19)

### 4. Persistence — Examined, not conclusively established
SCHTASKS.EXE was executed twice (Prefetch, call_id 20), which could indicate scheduled-task creation, but without process command-line logging (4688 audit was not enabled) or NTUSER.DAT RunOnce keys, we cannot confirm what was scheduled. SC.EXE's eight runs correlate with the .NET Framework installation at 14:54 and appear benign. Services in the registry show no obviously malicious entries (call_id 29). **Persistence cannot be ruled out** given the SCHTASKS execution and the missing NTUSER.DAT Run keys.

### 5. Privilege Escalation — **ESTABLISHED**
On 2015-03-22, the "informant" user (session 0x224E3) created three accounts and elevated two of them to Administrators (Security Event Log 4720/4722/4732, call_ids 21 & 23):
- **admin11** (SID-1001): created 15:51:54, added to Administrators at 15:51:54
- **ITechTeam** (SID-1002): created 15:52:30, added to Administrators at 15:52:30
- **temporary** (SID-1003): created 15:53:01, added to Users only

The informant account itself was placed in Administrators at system setup (call_id 23). All accounts were configured with PasswordDoesNotExpire (call_id 28). The admin11 account had two interactive logon sessions (15:53:44, 15:57:02) and the temporary account logged on once (15:55:57) (call_id 22).

### 6. Credential Access — Examined, circumstantial evidence
Event 4648 shows explicit credential use for account "Company" targeting "Company-PC" on two occasions (call_id 25):
- 2015-03-23 20:23:27
- 2015-03-24 13:47:06

This demonstrates possession and use of credentials for a different user ("Company") on a different system ("Company-PC"). The source of these credentials (harvested, shared, or pre-known) cannot be determined from available artifacts. No credential dumping tools were found.

### 7. Lateral Movement — **ESTABLISHED**
The two 4648 events to Company-PC (call_id 25) demonstrate network authentication from INFORMANT-PC to another host. The PID field (0x4, the System process) in these entries indicates this was an SMB-level connection. Combined with PING.EXE execution (call_id 20), this establishes that the informant user reached into the network beyond the local machine.

### 8. Exfiltration — Examined, **circumstantially established** (high confidence)
Three exfiltration channels were prepared or used:
1. **Google Drive Sync** — installed 2015-03-23 (call_id 32), executed on 2015-03-25 at 15:21:31 (Prefetch, call_id 20). Provides cloud-based file exfiltration capability.
2. **USB storage** — Two SanDisk Cruzer Fit USB drives connected on 2015-03-24 at 13:38:00 and 13:58:33 (USBSTOR registry, call_id 31). Physical exfiltration medium.
3. **Network access to Company-PC** — Explicit credential logon on 2015-03-23 and 2015-03-24 (call_id 25). Potential network-level data access.

No network-flow, proxy, or firewall logs were available to confirm actual data transfer volumes. No archiver tools (7-Zip, WinRAR) were found (Shimcache, call_id 33). The combination of cloud sync, USB devices, and cross-system authentication strongly suggests exfiltration capability was established; whether data was actually removed requires examination of Google Drive account contents and USB drive images.

### 9. Anti-Forensics / Impact — **ESTABLISHED**
On 2015-03-25, the user systematically installed and ran anti-forensic tools in this sequence (Prefetch call_id 20, Shimcache call_id 19):

| Time (UTC) | Action | Evidence |
|------------|--------|----------|
| 14:50:14 | Eraser 6.2.0.2962 installer executed | Prefetch |
| 14:50:15 | .NET Framework 4 installed (Eraser dependency) | Prefetch / Shimcache |
| 14:54:09 | wevtutil.exe executed (event log utility) | Prefetch (run count 4+2) |
| 14:57:56 | CCleaner installer (ccsetup504.exe) executed | Prefetch |
| 15:13:30 | Eraser.exe last run (secure file deletion) | Prefetch |
| 15:15:50 | CCleaner64.exe last run (system cleanup) | Prefetch |
| 15:18:29 | CCleaner uninstalled (uninst.exe) | Prefetch |
| 15:18:37 | schtasks.exe executed | Prefetch |
| 15:21:31 | Google Drive Sync last run | Prefetch |
| 15:30:57 | User logoff (4647) | Security log call_id 35 |
| 15:31:00 | Event logging service shut down (1100) | Security log call_id 34 |

The deliberate installation of .NET Framework 4 (prerequisite for Eraser), followed by Eraser and CCleaner installation, execution, and then CCleaner's own uninstallation demonstrates a planned evidence destruction sequence. The wevtutil.exe execution (run count 6 total) suggests event logs may have been selectively cleared, though the Security log itself retained records.

---

## Summary

This evidence is consistent with an **insider threat** scenario. The user "informant" on INFORMANT-PC:
1. Created multiple administrator accounts including "admin11" and "ITechTeam"
2. Installed Google Drive Sync as a cloud exfiltration channel
3. Connected two USB drives for potential physical data movement
4. Accessed another system (Company-PC) with alternate credentials ("Company")
5. On the final day, executed a systematic anti-forensics cleanup: installed and ran Eraser (secure deletion), CCleaner (trace removal), and wevtutil (log manipulation), then uninstalled CCleaner itself before logging off

**Phase coverage gaps:** Initial access/delivery cannot be assessed (no NTUSER.DAT or browser history). Persistence intent is suggested by SCHTASKS execution but not confirmed. Actual data exfiltration volumes cannot be quantified without network logs or destination-side evidence.