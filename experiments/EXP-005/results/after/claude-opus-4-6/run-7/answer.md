I now have a complete picture. Here is the final report.

---

# Digital Forensic Report: PC-Triage Investigation

## Case: pc-triage-trudi

### Evidence Summary

**Evidence file:** `/evidence/pc-triage/PC-triage.zip`
**SHA256:** `6bef01b07b3640930713770ba868621940a7a798576b7542c6f1ebc7da24ccfc`
**MD5:** `3743fb5b367adf5fb9cd2256d82b4afd` (call_id 3)

**System:** Windows 7 x64 (VMware VM), hostname `informant-PC`, IP `10.11.11.129` (DHCP)
**Artifacts collected:** SYSTEM/SOFTWARE/SAM/SECURITY registry hives, Security/Application/System/TerminalServices event logs, Prefetch directory (95 files)

**Active period:** 2015-03-22 through 2015-03-25

### User Accounts (from SAM, call_id 23)

| Account | RID | Created | Group | Flags | Last Login |
|---------|-----|---------|-------|-------|------------|
| Administrator | 500 | 2015-03-25 10:33:22 | Admin | Disabled | 2010-11-21 |
| informant | 1000 | 2015-03-22 14:33:54 | Admin | PasswordNotRequired, NoExpire | 2015-03-25 14:45:59 |
| admin11 | 1001 | 2015-03-22 15:51:54 | Admin | NoExpire | 2015-03-22 15:57:02 |
| ITechTeam | 1002 | 2015-03-22 15:52:30 | Admin | NoExpire | Never |
| temporary | 1003 | 2015-03-22 15:53:01 | Users only | NoExpire | 2015-03-22 15:55:57 |

---

## Case Questions

Case Q1: Attack lifecycle phase assessment follows. Each phase is classified as **Established**, **Ruled Out**, or **Not Examined**, with supporting evidence.

### 1. Reconnaissance — ESTABLISHED

- **PING.EXE** executed (Prefetch run count 1, last run 2015-03-25 14:58:34, call_id 16)
- **NETSH.EXE** executed (Prefetch run count 2, last run 2015-03-25 10:18:13, call_id 16)
- **ipconfig.exe** and **mstsc.exe** (Remote Desktop client) present in shimcache (call_id 18), indicating network reconnaissance and awareness of remote desktop capabilities
- Credential probes to `Company-PC` (see Lateral Movement) demonstrate prior knowledge of network hosts

### 2. Initial Access — ESTABLISHED (Insider Threat)

- All logons for user `informant` were **LogonType 2** (interactive/console) via `User32` logon process (call_id 19). No remote exploitation, phishing, or malware delivery vectors detected.
- The `informant` account was created at system setup (2015-03-22 14:33:54) with immediate admin rights (call_id 17). This is an **insider threat scenario** — the subject had legitimate physical access with admin privileges from the outset.
- fDenyTSConnections = 1 (RDP disabled), so no inbound RDP access was used (call_id 25).

### 3. Execution — ESTABLISHED

Prefetch confirms execution of attacker-relevant tools (call_id 16):

| Executable | Run Count | Last Run (UTC) | Significance |
|-----------|-----------|----------------|-------------|
| ERASER.EXE | 2 | 2015-03-25 15:13:30 | Secure deletion tool |
| CCLEANER64.EXE | 2 | 2015-03-25 15:15:50 | System/privacy cleaner |
| SCHTASKS.EXE | 2 | 2015-03-25 15:18:37 | Scheduled task creation |
| WEVTUTIL.EXE | 4 + 2 | 2015-03-25 14:54:09 | Event log management |
| SC.EXE | 8 | 2015-03-25 14:54:07 | Service control |
| PING.EXE | 1 | 2015-03-25 14:58:34 | Network probing |
| GOOGLEDRIVESYNC.EXE | 2 | 2015-03-25 15:21:31 | Cloud sync |
| WINWORD.EXE | 3 | 2015-03-25 15:24:48 | Document access |
| OUTLOOK.EXE | 1 | 2015-03-25 14:41:03 | Email access |

Shimcache corroborates presence of `cmd.exe`, `Eraser.exe`, `CCleaner64.exe`, `schtasks.exe`, `wevtutil.exe`, and others (call_id 18).

### 4. Persistence — ESTABLISHED

- **Three new local accounts** created on 2015-03-22 by user `informant` (SubjectLogonId 0x224E3, call_id 17): `admin11` (admin), `ITechTeam` (admin), `temporary` (user). All set to PasswordDoesNotExpire.
- **Eraser Run key autorun** in SOFTWARE hive: `"C:\Program Files\Eraser\Eraser.exe" /atRestart` (call_id 26)
- **CCleanerSkipUAC scheduled task** created, last run 2015-03-25 15:15:50 (call_id 26) — this task bypasses UAC prompts for CCleaner.
- **schtasks.exe** was executed twice (call_id 16), consistent with creating these scheduled tasks.

### 5. Privilege Escalation — ESTABLISHED

- **admin11** added to Administrators group via Event 4732 at 2015-03-22 15:51:54 (call_id 17)
- **ITechTeam** added to Administrators group via Event 4732 at 2015-03-22 15:52:30 (call_id 17)
- **informant** was already admin from system setup (call_id 17)
- Net effect: three admin accounts where one previously existed, expanding persistent administrative access.

### 6. Defense Evasion / Anti-Forensics — ESTABLISHED

This is a heavily established phase:
- **Eraser 6.2.0.2962**: Downloaded to `C:\Users\informant\Desktop\Download\` (shimcache, call_id 18), installed 2015-03-25 (call_id 26), and executed (Prefetch run count 2, call_id 16). Eraser performs secure file deletion using overwrite patterns.
- **CCleaner v5.04**: Installer `ccsetup504.exe` downloaded to Desktop (shimcache, call_id 18), installed 2015-03-25 (call_id 26), executed (Prefetch run count 2, call_id 16). CCleaner removes browser history, temporary files, MRU lists, and other forensic artifacts.
- **CCleanerSkipUAC** scheduled task (call_id 26) — designed to run CCleaner without UAC prompts.
- **wevtutil.exe** executed 6 times across two Prefetch entries (call_id 16) — this tool can clear or export event logs.
- No Event 1102 (audit log cleared) was found (call_id 29), so the Security log itself was not explicitly cleared, but wevtutil could have targeted other logs.
- **Deleted executable in Recycle Bin**: `$RJEMT64.exe` in `C:\$Recycle.Bin\S-1-5-21-...-1000\` (shimcache, call_id 18), indicating the user deleted an executable file.

### 7. Credential Access — NOT ESTABLISHED

- No evidence of credential harvesting tools (mimikatz, procdump, etc.) in Prefetch or shimcache.
- Event 4648 (explicit credential use) shows account switching between local accounts (call_id 21), which is consistent with the insider creating and testing new accounts — not credential theft.
- **Note:** Without NTUSER.DAT hives, PowerShell logs, or Sysmon, some credential access techniques cannot be evaluated.

### 8. Discovery — ESTABLISHED

- **ping.exe** executed (call_id 16) — network host discovery
- **ipconfig.exe** in shimcache (call_id 18) — network configuration enumeration
- **netsh.exe** executed (call_id 16) — network configuration query
- **mstsc.exe** in shimcache (call_id 18) — awareness of remote desktop targets
- Event 4648 credential attempts to `Company-PC` with username `Company` (call_id 21) show the insider identified and targeted a specific network host.

### 9. Lateral Movement — ESTABLISHED (Attempted)

- **Event 4648** (call_id 21): Explicit credential attempts from `informant-PC` to target `Company-PC` using the account `Company` on:
  - 2015-03-23 20:23:27 UTC
  - 2015-03-24 13:47:06 UTC
- **mstsc.exe** (Remote Desktop Client) present in shimcache (call_id 18).
- Whether the lateral movement succeeded cannot be determined from this PC's logs alone — the target (`Company-PC`) logs would be needed. However, the attempts are established.

### 10. Collection & Exfiltration — ESTABLISHED (Indicators)

**USB Storage (call_id 24):**
Two **SanDisk Cruzer Fit** USB flash drives were connected on 2015-03-24:
- SN `4C530012450531101593` — first connected 13:37:59
- SN `4C530012550531106501` — first connected 13:58:32
These provide a physical exfiltration channel.

**Cloud Storage (call_id 26, 16):**
- **Google Drive** installed 2015-03-23 (call_id 26)
- **googledrivesync.exe** executed (Prefetch run count 2, last run 2015-03-25 15:21:31, call_id 16)
This provides a cloud exfiltration channel.

**Document access:**
- **WINWORD.EXE** executed 3 times, last 2015-03-25 15:24:48 (call_id 16)
- **OUTLOOK.EXE** executed 1 time, last 2015-03-25 14:41:03 (call_id 16)

Without NTUSER.DAT (RecentDocs, OpenSaveMRU) or file system analysis, the specific files accessed/copied cannot be determined.

### 11. Command and Control — RULED OUT

No evidence of:
- C2 malware, implants, or remote access trojans in Prefetch or shimcache
- Suspicious services installed (all 7045 events are legitimate software, call_id 28)
- Unexpected network connections or beaconing indicators

This is consistent with an insider threat scenario where the subject already has direct access and does not need a C2 channel.

### 12. Impact — ESTABLISHED (Indicators)

- **Eraser** (secure deletion tool) was installed, configured as an autorun, and executed. This tool is designed to irreversibly destroy data, constituting potential evidence destruction.
- **CCleaner** was installed and executed, removing forensic artifacts (browsing history, temp files, MRU lists).
- The combination of anti-forensic tools executed on the final day (2015-03-25) suggests a deliberate effort to destroy evidence before the triage collection was taken.

---

### Attack Timeline Summary

| Date | Key Events |
|------|-----------|
| **2015-03-22** | System setup. `informant` account created (admin). Three additional accounts created: `admin11` (admin), `ITechTeam` (admin), `temporary` (user). Multiple interactive logon sessions. |
| **2015-03-23** | Normal usage. Google Drive and iCloud installed. First credential probe to `Company-PC` at 20:23. |
| **2015-03-24** | Two SanDisk Cruzer Fit USB drives connected (13:37, 13:58). Second credential probe to `Company-PC` at 13:47. |
| **2015-03-25** | Anti-forensics day. Outlook and Word accessed (~14:41-15:24). Eraser downloaded, installed, run (~14:47-15:13). CCleaner installed and run (~14:57-15:15). schtasks.exe run. Google Drive Sync run (15:21). System triage collected. Session ends at 15:31. |

### Gaps and Limitations

- **No NTUSER.DAT hives** — cannot examine UserAssist, RecentDocs, TypedPaths, OpenSaveMRU, or Run/RunOnce per-user autoruns.
- **No PowerShell/Sysmon logs** — cannot evaluate PowerShell-based attacks or detailed process creation.
- **No $MFT or USN journal** — cannot determine what files were created, modified, deleted, or copied to USB.
- **No Amcache** — cannot get additional execution evidence with SHA1 hashes.
- **Process creation auditing (4688)** was not enabled — no command-line logging available.
- Eraser and CCleaner may have already destroyed additional evidence before the triage collection was taken.