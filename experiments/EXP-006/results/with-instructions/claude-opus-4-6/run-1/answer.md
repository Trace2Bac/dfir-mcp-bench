Coverage is clean. All three hosts have been examined. Here is my final report.

---

# Forensic Auth Log Analysis Report

## Hosts Examined

| Host | Log File | Events | Failed Logins | Successful Logins | Verdict |
|------|----------|--------|---------------|-------------------|---------|
| **LabSZ** | `LabSZ/var/log/auth.log` | 2,000 | 635 | 1 | Brute force activity, no compromise |
| **app-1** | `app-1/var/log/auth.log` | 102,164 | 34,817 | 118 | **Likely compromised** |
| **combo** | `combo/var/log/secure` | 849 | 0 | 0 | Clean — no login activity |

## Detailed Findings

### LabSZ
Heavy SSH brute force activity (635 failed logins) from multiple external IPs, led by `183.62.140.253` (295 attempts), `187.141.143.180` (109 attempts), and `103.99.0.122` (81 attempts). Only 1 successful login recorded, which was **not** correlated to any attack source IP. No evidence of compromise.

### app-1
Massive brute force campaign (34,817 failed logins) with **confirmed successful authentication from attacker IPs**. The auth_summary tool flagged 7 IPs that successfully logged in after prior failed attempts:
- `219.150.161.20` (16,833 failed attempts before success)
- `222.66.204.246` (2,636 failed attempts before success)
- `121.11.66.70` (1,441 failed attempts before success)
- `190.166.87.164`
- `222.169.224.197`
- `61.168.227.12`
- `122.226.202.12`

Post-compromise indicators include 644 sudo commands, 11 user accounts added, and 8 groups added — consistent with an attacker establishing persistence.

### combo
No failed or successful logins detected. No indicators of compromise.

---

## Case Questions

**Case Q1:** All three hosts were checked with `auth_summary`: **LabSZ** (`LabSZ/var/log/auth.log`), **app-1** (`app-1/var/log/auth.log`), and **combo** (`combo/var/log/secure`).

**Case Q2:** Yes — host **app-1** was broken into over SSH. Seven source IPs successfully authenticated after brute force attempts: `219.150.161.20`, `222.66.204.246`, `121.11.66.70`, `190.166.87.164`, `222.169.224.197`, `61.168.227.12`, and `122.226.202.12`. The most prolific attacker was `219.150.161.20` with 16,833 failed attempts before achieving a successful login.