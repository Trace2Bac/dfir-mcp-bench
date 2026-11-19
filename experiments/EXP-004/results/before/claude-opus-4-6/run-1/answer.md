---

# Incident Response Report — webserver-prod-02

## Executive Summary

The `deploy` service account on webserver-prod-02 was compromised via a stolen SSH key. An attacker from **185.229.59.103** (a known C2 server) authenticated on **Apr 14 at 03:17:44 UTC** and within 80 seconds installed a persistent C2 beacon disguised as a system update service. Evidence of anti-forensics (bash history tampering) was detected.

## Attack Timeline

| Time (UTC) | Event | Source |
|---|---|---|
| Apr 13, 08:15–16:42 | Normal operations by deploy, alice, and bob | auth.log:3-28 |
| **Apr 14, 03:17:44** | deploy SSH login from **185.229.59.103** (publickey) | auth.log:30 |
| Apr 14, 03:18:02 | `sudo cat /etc/passwd` — reconnaissance | auth.log:32 |
| Apr 14, 03:18:12 | `sudo cp /tmp/update /usr/local/bin/update` — staged binary | auth.log:35 |
| Apr 14, 03:18:17 | `sudo chmod +x /usr/local/bin/update` | auth.log:36 |
| Apr 14, 03:18:29 | `sudo tee /etc/systemd/system/system-updater.service` — wrote C2 beacon | auth.log:37 |
| Apr 14, 03:18:44 | `sudo systemctl daemon-reload` | auth.log:38 |
| Apr 14, 03:18:58 | `sudo systemctl enable system-updater.service` — persistence | auth.log:39 |
| Apr 14, 03:19:03 | `sudo systemctl start system-updater.service` — activated beacon | auth.log:40 |
| Apr 14, 08:25+ | Normal deploy/bob operations resume | auth.log:44-48 |

## Confirmed Findings

1. **Malicious systemd persistence (CONFIRMED):** `system-updater.service` runs as root and POSTs hostname and IP to `https://185.229.59.103:8443/beacon` every 600 seconds. It is enabled for `multi-user.target`.

2. **C2 beacon installation via sudo (CONFIRMED):** The deploy account wrote the service file using `sudo tee` (auth.log:37) and enabled/started it with `sudo systemctl` (auth.log:38-40).

3. **Reconnaissance (CONFIRMED):** The attacker read `/etc/passwd` via `sudo cat` (auth.log:32).

## Inferences

4. **Initial access** was SSH pubkey auth from 185.229.59.103 — the attacker possessed a stolen private key for one of deploy's two authorized keys (`deploy@ci-runner-1` or `deploy@ci-backup`).

5. **Anti-forensics / history tampering:** deploy's `.bash_history` contains 15 benign CI/CD commands but none of the 7 malicious sudo commands from auth.log lines 32–40. The history was likely cleared or overwritten.

6. **Privilege escalation beyond documented sudoers:** The only sudoers.d grant for deploy is `NOPASSWD: /usr/bin/systemctl`, yet the attacker also ran `sudo cat`, `sudo cp`, `sudo chmod`, and `sudo tee` successfully — indicating broader sudo privileges exist (possibly in the main `/etc/sudoers` file not captured in evidence).

7. **IOC:** IP `185.229.59.103` confirmed as a C2 server (high confidence, tagged: c2, beacon).

## Shell History Analysis

Three accounts had shell history files; one account with a valid login shell had none:

| Account | History File | Commands | Suspicious Content |
|---|---|---|---|
| **root** | `root/.bash_history` (80 bytes) | 4 | None — routine admin (apt update/upgrade, systemctl restart nginx, tail log) |
| **deploy** | `home/deploy/.bash_history` (264 bytes) | 15 | One flagged (curl to npmjs.org); critically, **none of the 7 malicious sudo commands from auth.log appear**, indicating history tampering |
| **alice** | `home/alice/.bash_history` (123 bytes) | 6 | None — routine log inspection |
| **bob** | *No history file found* | — | bob (UID 1003) has a valid /bin/bash account but no `.bash_history` exists in the snapshot |

## Case Questions

**Case Q1:** Shell histories were analyzed for three accounts: **root**, **deploy**, and **alice**. A fourth account, **bob**, has a valid login shell but no `.bash_history` file was present in the filesystem snapshot.

**Case Q2:** Yes — **deploy's** shell history is forensically significant, but not for what it contains — for what it *omits*. The auth.log records 7 malicious sudo commands executed by deploy between 03:18:02 and 03:19:03 on Apr 14 (reading /etc/passwd, copying a binary from /tmp, writing a C2 beacon systemd service, and enabling/starting it). **None of these commands appear in deploy's `.bash_history`**, which contains only benign CI/CD commands (git pull, npm ci, npm run build, etc.). This discrepancy is strong evidence the attacker cleared or replaced the history file as an anti-forensic measure. The auth.log — not the bash history — is the definitive record of attacker activity.