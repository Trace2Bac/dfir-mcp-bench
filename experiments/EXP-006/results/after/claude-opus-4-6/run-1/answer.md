I now have a comprehensive picture from all available artifacts. Here is the final report.

---

# Digital Forensic Report — Case pc-triage-trudi

## System Under Investigation

| Attribute | Value | Source |
|---|---|---|
| Computer Name | INFORMANT-PC | SYSTEM registry (call_id 27) |
| OS | Windows 7 x64 (VMware VM) | Prefetch version + PCI VEN_15AD (call_id 8, 37) |
| Timezone | Eastern Standard Time (EDT active, UTC-4) | SYSTEM registry (call_id 27) |
| IP Address | 10.11.11.129 (DHCP) | SYSTEM registry / nic2 plugin (call_id 31) |
| Gateway / DNS | 10.11.11.2 | SYSTEM registry (call_id 31) |
| Last Shutdown | 2015-03-25 15:31:05 UTC | SYSTEM registry (call_id 27) |
| RDP Inbound | Denied (fDenyTSConnections=1) | SYSTEM registry (call_id 42) |

## User Accounts (from SAM — call_id 33)

| Account | RID | Type | Administrators? | Created | Last Logon | Logins |
|---|---|---|---|---|---|---|
| informant | 1000 | Admin | Yes | 2015-03-22 14:33 | 2015-03-25 14:45 | 10 |
| admin11 | 1001 | Admin | Yes | 2015-03-22 15:51 | 2015-03-22 15:57 | 2 |
| ITechTeam | 1002 | Admin | Yes | 2015-03-22 15:52 | Never | 0 |
| temporary | 1003 | Limited | No | 2015-03-22 15:53 | 2015-03-22 15:55 | 1 |

The "informant" account has a password hint of **"IAMAN"**. All four user accounts were created within the investigation period (2015-03-22 to 2015-03-25). Three accounts (admin11, ITechTeam, informant) were placed in the local Administrators group (call_id 24).

## Evidence Integrity

| File | SHA-256 |
|---|---|
| PC-triage.zip | `6bef01b07b3640930713770b...` (call_id 3) |

## Available Artifacts

- Registry hives: SYSTEM, SOFTWARE, SAM, SECURITY (no NTUSER.DAT)
- Event logs: Security, System, Application, TerminalServices-LocalSessionManager
- Prefetch: 95 files
- No MFT, no $J USN journal, no Amcache, no Sysmon, no PowerShell transcript logs, no browser history databases

---

## Case Questions

Case Q1: Attack lifecycle phase-by-phase assessment:

**1. Reconnaissance — NOT EXAMINED.** No browser history (NTUSER.DAT not collected), no PowerShell logs, and no Sysmon data are available to determine whether the user performed pre-attack research or target enumeration.

**2. Initial Access / Delivery — NOT EXAMINED.** No email artifacts, download history databases, or browser cache are present in this triage collection. The collection is limited to system-level artifacts and does not include user-profile-level files (no NTUSER.DAT).

**3. Execution — ESTABLISHED.** Prefetch (call_id 18) confirms execution of numerous programs including anti-forensics tools and system utilities:
- **Eraser 6.2.0.2962.exe** — installer run 2015-03-25 14:50:14 from `C:\Users\informant\Desktop\Download\`; shimcache confirms path (call_id 19)
- **ERASER.EXE** — program run twice, last at 2015-03-25 15:13:30
- **CCSETUP504.EXE** — CCleaner installer run 2015-03-25 14:57:56 from `C:\Users\informant\Desktop\Download\` (call_id 19)
- **CCLEANER64.EXE** — run twice, last at 2015-03-25 15:15:50
- **WEVTUTIL.EXE** — event log utility run 4+2 times (two prefetch entries) on 2015-03-25
- **SC.EXE** — service control run 8 times on 2015-03-25
- **SCHTASKS.EXE** — task scheduler run twice, last at 2015-03-25 15:18:37
- **PING.EXE** — run 2015-03-25 14:58:34
- **NETSH.EXE** — run twice, last 2015-03-25 10:18:13
- **CMD.EXE** — present in shimcache with Executed=Yes (call_id 19)
- Legitimate software also ran: Chrome, IE, Outlook, Word, Google Drive Sync, XPS Viewer

**4. Persistence — ESTABLISHED.** The SOFTWARE registry (call_id 36) shows Eraser was registered as an auto-start Run key:
- `HKLM\...\CurrentVersion\Run\Eraser` = `"C:\Program Files\Eraser\Eraser.exe" /atRestart` — written 2015-03-25 14:57:31 UTC
- Google Update and Bonjour services were also installed as auto-start services (call_id 37), though these are legitimate software.
- Scheduled tasks are present in the TaskCache but all appear to be standard Windows/Office/Google tasks (call_id 36).

**5. Privilege Escalation — ESTABLISHED.** On 2015-03-22 between 15:51 and 15:53, three additional accounts were created from the "informant" session (SubjectLogonId 0x224E3), and two were immediately elevated:
- **admin11** (SID 1001) added to local Administrators group at 15:51:54 (call_id 24, event 4732)
- **ITechTeam** (SID 1002) added to local Administrators group at 15:52:30 (call_id 24, event 4732)
- **temporary** (SID 1003) was added to Users only — not escalated (call_id 24)
- The "informant" account itself was an Administrator from its creation by the system (SubjectLogonId 0x3E7) at 14:33:54 (call_id 24). Creating additional admin accounts beyond what is needed for a standard user represents account manipulation for privilege persistence.

**6. Defense Evasion / Anti-Forensics — ESTABLISHED.** Strong evidence of deliberate evidence destruction on 2015-03-25:
- **Eraser 6.2.0.2962** installed at 14:57:49 (Application event log call_id 38, event 11707: "Installation completed successfully"). Eraser is a secure file-deletion tool that overwrites data to prevent recovery.
- **CCleaner64** installed (ccsetup504.exe) and run at 15:15:50 (call_id 18). CCleaner removes browser history, temporary files, registry entries, and other forensic artifacts.
- **CCleaner was then uninstalled** — uninst.exe ran at 15:18:29 (call_id 18), indicating the user cleaned up and removed the cleaning tool itself.
- **WEVTUTIL.EXE** was run multiple times (call_id 18). This tool can clear or export Windows event logs. Notably, the Security log contains **zero 4688 (process creation) events** and **zero 4625 (failed logon) events**, which on a system with this much activity is consistent with either a minimal audit policy or selective log manipulation.
- Eraser was configured to persist via Run key to auto-start at next restart (call_id 36).

**7. Credential Access — NOT EXAMINED.** No memory dump, no NTUSER.DAT hive (would contain cached credentials artifacts), no evidence of tools like Mimikatz or credential-dumping utilities in prefetch/shimcache. The Security log has no 4625 (failed logon) events, so brute-force activity cannot be assessed.

**8. Discovery — ESTABLISHED.** Network and system reconnaissance tools were executed:
- **PING.EXE** — network reachability testing (call_id 18, run 2015-03-25 14:58:34)
- **SC.EXE** — service enumeration/manipulation, run 8 times (call_id 18)
- **NETSH.EXE** — network configuration tool, run twice (call_id 18)
- These tools were run in the context of a user who also attempted lateral movement (see below), suggesting systematic environment discovery.

**9. Lateral Movement — ESTABLISHED.** Security event 4648 (explicit credential logon) records show the user on INFORMANT-PC authenticated to a remote host using different credentials (call_id 22):
- **2015-03-23 20:23:27 UTC** — Target: `INFORMANT-PC\Company`, TargetServerName: `Company-PC`
- **2015-03-24 13:47:06 UTC** — Target: `INFORMANT-PC\Company`, TargetServerName: `Company-PC`
- These events show the "informant" user used the credentials of an account named "Company" to access a network host named "Company-PC" on two separate days. This is explicit lateral movement — using credentials that belong to another identity to reach another system.

**10. Collection — EXAMINED, INSUFFICIENT EVIDENCE.** Google Drive Sync was running (last run 2015-03-25 15:21:31, call_id 18) and could serve as a cloud staging/exfiltration channel. Word (WINWORD.EXE, last run 15:24:48) and Outlook (last run 14:41:03) were active. Without NTUSER.DAT, MFT, or USN journal data, it is not possible to determine what files were accessed, copied, or staged.

**11. Command and Control (C2) — NOT EXAMINED.** No network packet captures, no Sysmon DNS/connection logs, no PowerShell transcription, and no proxy logs are available. Without these artifacts, C2 channels cannot be assessed.

**12. Exfiltration — EXAMINED, INSUFFICIENT EVIDENCE.**
- **Google Drive Sync** was active (call_id 18) — a potential cloud exfiltration vector, but cannot confirm data was uploaded without file-level or network-level analysis.
- **No USB storage devices** were connected — USBSTOR registry shows no entries (call_id 30).
- **No network shares** were configured on this system (call_id 29/32).
- Cannot establish or rule out exfiltration with available artifacts.

**13. Impact / Actions on Objectives — ESTABLISHED.** The primary objective appears to be **evidence destruction**. On the final day of activity (2015-03-25), the user "informant" systematically:
1. Downloaded and installed Eraser (secure deletion) and CCleaner (artifact cleaning)
2. Ran both tools
3. Uninstalled CCleaner after use
4. Configured Eraser to auto-start on next boot
5. Logged off and shut down the system at 15:31:05 UTC

This sequence of actions, combined with the creation of multiple administrator accounts, lateral movement to "Company-PC", and the deliberate use of anti-forensics tools, is consistent with an insider threat scenario where the user took steps to cover their tracks before the triage collection was performed.