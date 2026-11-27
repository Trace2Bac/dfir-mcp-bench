No event log clearing events (1102/104) were recorded, and the last logoff was 2015-03-25 15:30:57. I now have all the evidence needed for a comprehensive report.

---

# Digital Forensic Report: PC-Triage Investigation

## Case: pc-triage-trudi

### Evidence Summary

| Item | Detail |
|------|--------|
| Evidence file | PC-triage.zip (SHA-256: `6bef01b07b3640930713770ba868621940a7a798576b7542c6f1ebc7da24ccfc`) |
| System | Windows 7 x64, computer name **informant-PC**, VMware VM |
| IP address | 10.11.11.129/24 (DHCP) |
| Timeline span | 2015-03-22 14:33 to 2015-03-25 15:31 UTC |
| Artifacts collected | SYSTEM/SOFTWARE/SAM/SECURITY registry hives, 4 event logs (Security, System, Application, TS-LocalSessionManager), 95 Prefetch files, setupapi.dev.log |
| **Not collected** | NTUSER.DAT, Amcache, $MFT, browser history, LNK files, PowerShell/Sysmon logs |

### User Accounts (call_id 22 — SAM parse)

| Username | RID | Type | Created | Last Login | Administrators? |
|----------|-----|------|---------|------------|-----------------|
| Administrator | 500 | Disabled | — | 2010-11-21 | Yes |
| informant | 1000 | Admin | 2015-03-22 14:33:54 | 2015-03-25 14:45:59 | Yes |
| admin11 | 1001 | Admin | 2015-03-22 15:51:54 | 2015-03-22 15:57:02 | Yes |
| ITechTeam | 1002 | Admin | 2015-03-22 15:52:30 | Never | Yes |
| temporary | 1003 | Limited | 2015-03-22 15:53:01 | 2015-03-22 15:55:57 | No |

The **informant** account (password hint: "IAMAN") was the initial user set up with the OS. Within ~80 minutes of first logon, the informant user created three additional accounts—admin11, ITechTeam, and temporary—and added admin11 and ITechTeam to the local Administrators group (call_id 16, Security Event IDs 4720/4732).

---

### Case Questions

**Case Q1:** Attack lifecycle phase assessment:

**1. Reconnaissance — Not examined.**
No network scanning tools, Nmap, or recon utilities found in Prefetch or ShimCache. PING.EXE ran once at 2015-03-25 14:58:34 (call_id 15), but this alone is insufficient. Browser history was not collected (no NTUSER.DAT), so web-based reconnaissance cannot be assessed.

**2. Initial Access — Not applicable / Insider threat.**
This is an insider threat scenario, not an external compromise. The user "informant" had legitimate local console access from system setup on 2015-03-22 (call_id 16, 20). All logons are interactive Type 2 at the local console (call_id 16). There is no evidence of exploitation, phishing, or remote attack vectors. The TS-LocalSessionManager log confirms all sessions originate locally (call_id 20).

**3. Execution — ESTABLISHED.**
Prefetch (call_id 15) proves execution of significant tools:
- **Eraser.exe** — anti-forensics, last run 2015-03-25 15:13:30 (run count: 2)
- **CCleaner64.exe** — anti-forensics, last run 2015-03-25 15:15:50 (run count: 2)
- **CCSetup504.exe** — CCleaner installer, run 2015-03-25 14:57:56
- **Eraser 6.2.0.2962.exe** — Eraser installer, run 2015-03-25 14:50:14
- **SCHTASKS.EXE** — task scheduler, last run 2015-03-25 15:18:37 (run count: 2)
- **SC.EXE** — service control, last run 2015-03-25 14:54:07 (run count: 8)
- **WEVTUTIL.EXE** — event log utility, two instances, run 4+2 times
- **OUTLOOK.EXE** — email client, run 2015-03-25 14:41:03
- **WINWORD.EXE** — Word, last run 2015-03-25 15:24:48 (run count: 3)
- **GoogleDriveSync.exe** — cloud sync, last run 2015-03-25 15:21:31

ShimCache corroborates presence of these binaries on disk (call_id 19). The TMP5B99.TMP.EXE and TMPFF8D.TMP.EXE in Prefetch are .NET Framework setup temp files from the Eraser installation chain (call_id 19: paths under `\Temp\Microsoft .NET Framework 4 Setup_4.0.30319\`).

**4. Persistence — ESTABLISHED.**
- **Registry Run key**: Eraser registered at `HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run` as `"C:\Program Files\Eraser\Eraser.exe" /atRestart`, written 2015-03-25 14:57:31 (call_id 23).
- **Rogue accounts**: Three accounts (admin11, ITechTeam, temporary) created by informant on 2015-03-22, all set to "Password does not expire" (call_id 22). Two have administrator privileges.
- **Scheduled tasks**: A task with Last Start matching CCleaner execution time (2015-03-25 15:15:50) suggests automated anti-forensics (call_id 23).

**5. Privilege Escalation — ESTABLISHED.**
The informant user (already a local administrator from OS setup) created admin11 and ITechTeam and added both to the **Builtin\Administrators** group (call_id 16 — Security Event 4732: admin11 added at 15:51:54, ITechTeam added at 15:52:30 on 2015-03-22). The "ITechTeam" name suggests an attempt to disguise the account as legitimate IT staff. This provides redundant admin access and backdoor persistence.

**6. Defense Evasion / Anti-Forensics — ESTABLISHED (strongest evidence).**
- **Eraser 6.2.0.2962**: Secure data destruction tool downloaded to `C:\Users\informant\Desktop\Download\` (call_id 19, ShimCache modified 2015-03-25 14:47:40), installed 2015-03-25 (call_id 30), executed twice (call_id 15).
- **CCleaner v5.04**: System/browser artifact cleaner, downloaded to same folder (call_id 19, modified 2015-03-25 14:48:28), installed 2015-03-25 (call_id 30), executed twice (call_id 15).
- **WEVTUTIL.EXE**: Event log utility ran multiple times (call_id 15). While no Event ID 1102 (Security log cleared) was found (call_id 31) and no Event ID 104 (System log cleared, call_id 32), wevtutil can selectively clear or export specific logs.
- The installation of .NET Framework 4 (call_id 24, service install at 14:52:05) was specifically to support Eraser's dependency.
- **Timing**: All anti-forensics tools were downloaded, installed, and executed on 2015-03-25 (the final day of activity), just before the last logoff at 15:30:57—consistent with a cleanup operation before departing.

**7. Credential Access — Not examined.**
No credential dumping tools (Mimikatz, ProcDump, etc.) found in Prefetch or ShimCache. Process creation auditing (Event ID 4688) was not enabled, so command-line activity is invisible. No NTUSER.DAT means browser-stored credentials cannot be assessed. The 4724 (password reset) events for the three created accounts are expected administrative actions, not credential theft.

**8. Discovery — Examined, limited evidence.**
PING.EXE ran once at 2015-03-25 14:58:34 (call_id 15). ShimCache shows ipconfig.exe and cmd.exe were present on disk (call_id 19), but neither appears in Prefetch for the investigation timeframe. No evidence of net.exe, systeminfo.exe, or other enumeration tools. The absence of process auditing limits this assessment.

**9. Lateral Movement — Ruled out (within evidence scope).**
All user logons are local interactive Type 2 (call_id 16). The TS-LocalSessionManager log shows only local console sessions — no remote IPs (call_id 20). No Event ID 4624 with Logon Type 10 (RDP) or Type 3 (network) from non-system accounts. ShimCache shows mstsc.exe present (call_id 19) but it has no Prefetch entry — not executed. No evidence of PsExec, WMI remote, or other lateral movement tools.

**10. Collection — ESTABLISHED (indicators).**
- **USB storage**: Two **SanDisk Cruzer Fit** USB drives were connected to the system on 2015-03-24 (call_id 28):
  - SN 4C530012450531101593, first connected 2015-03-24 13:38:00
  - SN 4C530012550531106501, first connected 2015-03-24 13:58:33
- **Cloud sync**: Google Drive v1.20.8672.3137 installed 2015-03-23 (call_id 30) and GoogleDriveSync.exe executed on 2015-03-25 at 15:21:31 (call_id 15).
- **Email/documents**: Outlook ran 2015-03-25 14:41:03; Word ran three times, last 2015-03-25 15:24:48 (call_id 15).
- Without $MFT, file access logs, or NTUSER.DAT (UserAssist/RecentDocs), we cannot determine which specific files were accessed or staged.

**11. Exfiltration — Examined, indicators present but not conclusive.**
Two USB drives and Google Drive Sync represent viable exfiltration channels. The USB drives were connected the day before the anti-forensics cleanup (2015-03-24), and Google Drive Sync ran during the final session (2015-03-25). iCloudSetup was downloaded (call_id 19, ShimCache) but no Prefetch entry confirms it ran. No network flow, proxy, firewall, or PCAP data was collected, so network-based exfiltration cannot be confirmed or ruled out. The deployment of Eraser and CCleaner may have destroyed direct evidence of data transfer.

**12. Impact — ESTABLISHED.**
Evidence destruction was performed via Eraser and CCleaner on 2015-03-25. Multiple backdoor admin accounts were created for persistent unauthorized access. The Recycle Bin contained a deleted executable (`$RJEMT64.exe`, SID -1000, call_id 19). The combined pattern—rogue account creation, anti-forensics tool deployment, USB device connections, cloud sync usage, and systematic cleanup before final logoff—constitutes a deliberate insider threat operation.

---

### Key Timeline

| Date/Time (UTC) | Event |
|-----------------|-------|
| 2015-03-22 14:33:54 | "informant" account created during OS setup |
| 2015-03-22 14:34:28 | First interactive logon by informant |
| 2015-03-22 15:51–15:53 | admin11, ITechTeam, temporary accounts created; admin11 & ITechTeam added to Administrators |
| 2015-03-22 15:53–15:57 | admin11 and temporary logged in and out interactively |
| 2015-03-23 20:00 | Google Drive and Bonjour installed |
| 2015-03-24 13:38–13:58 | Two SanDisk Cruzer Fit USB drives connected |
| 2015-03-25 14:41 | Outlook opened |
| 2015-03-25 14:47–14:48 | Eraser and CCleaner installers downloaded |
| 2015-03-25 14:50–14:58 | Eraser chain installed (.NET 4 → Eraser); CCleaner installed; PING.EXE run |
| 2015-03-25 15:13 | Eraser executed (secure deletion) |
| 2015-03-25 15:15 | CCleaner executed (artifact cleaning) |
| 2015-03-25 15:18 | SCHTASKS.EXE run |
| 2015-03-25 15:21 | Google Drive Sync run |
| 2015-03-25 15:24 | Word opened |
| 2015-03-25 15:30:57 | Final logoff by informant |

### Limitations

- **No NTUSER.DAT**: UserAssist, RecentDocs, TypedPaths, browser history unavailable — cannot determine specific files accessed or websites visited.
- **No Amcache or $MFT**: Cannot attribute file installations to specific times with file-system granularity.
- **No process auditing (4688)**: Command-line arguments for all tool executions are unknown.
- **No network/PCAP data**: Cannot confirm or deny network-based exfiltration.
- **No Sysmon or PowerShell logging**: Script-based activity invisible.
- **Anti-forensics tools deployed**: Eraser and CCleaner may have destroyed evidence that would have been present in the missing artifacts above.