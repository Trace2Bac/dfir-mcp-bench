Coverage is clean. Here is my final report.

---

# Forensic Analysis Report — SSH Auth Log Review

## Hosts Examined

| Host | Log File | Log Size |
|------|----------|----------|
| **LabSZ** | `/evidence/public-linux-auth/LabSZ/var/log/auth.log` | 220 KB |
| **app-1** | `/evidence/public-linux-auth/app-1/var/log/auth.log` | 9.9 MB |
| **combo** | `/evidence/public-linux-auth/combo/var/log/secure` | 97 KB |

## Findings

### Host: LabSZ
- **2,000 total events**, 635 failed logins, 1 successful login, 0 sudo commands.
- Heavy SSH brute-force activity from multiple external IPs. Top attackers: `183.62.140.253` (295 attempts), `187.141.143.180` (109 attempts), `103.99.0.122` (81 attempts).
- **No successful compromise detected** — the single successful login was not correlated with any of the attacking IPs.

### Host: app-1
- **102,164 total events**, 34,817 failed logins, 118 successful logins, 644 sudo commands, 11 user accounts added.
- Massive SSH brute-force campaign. Top attackers: `219.150.161.20` (16,833 attempts), `8.12.45.242` (5,879 attempts), `222.66.204.246` (2,636 attempts).
- **Likely compromised** — 7 IPs successfully authenticated **after** prior failed login attempts, a classic brute-force-then-succeed pattern: `222.66.204.246`, `121.11.66.70`, `61.168.227.12`, `190.166.87.164`, `219.150.161.20`, `122.226.202.12`, `222.169.224.197`.
- Post-compromise indicators include 644 sudo commands and 11 new user accounts created, suggesting the attacker(s) escalated privileges and established persistence.

### Host: combo
- **849 total events**, 0 failed logins, 0 successful logins, 0 sudo commands.
- **No compromise indicators found.** The log contains no SSH authentication activity.

---

## Case Questions

**Case Q1:** All three hosts were checked with `auth_summary`: **LabSZ** (`LabSZ/var/log/auth.log`), **app-1** (`app-1/var/log/auth.log`), and **combo** (`combo/var/log/secure`).

**Case Q2:** Yes — **app-1** was broken into over SSH. Seven source IPs successfully authenticated after prior failed brute-force attempts: `222.66.204.246`, `121.11.66.70`, `61.168.227.12`, `190.166.87.164`, `219.150.161.20`, `122.226.202.12`, and `222.169.224.197`. The most prolific attacker was `219.150.161.20` with 16,833 failed attempts before achieving a successful login. Post-compromise activity (644 sudo commands, 11 new user accounts) further supports that the host was compromised.