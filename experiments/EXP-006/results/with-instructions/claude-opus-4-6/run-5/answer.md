All three hosts have been examined with `auth_summary`. I have the information needed to answer the case questions. Here is the final report.

---

# Forensic Report — SSH Auth Log Analysis

## Hosts Examined

| Host | Log File | Total Events | Failed Logins | Successful Logins | Verdict |
|------|----------|-------------|---------------|-------------------|---------|
| **LabSZ** | `LabSZ/var/log/auth.log` | 2,000 | 635 | 1 | Brute-force probing, no confirmed breach |
| **app-1** | `app-1/var/log/auth.log` | 102,164 | 34,817 | 118 | **LIKELY COMPROMISE** — successful auth from brute-force IPs |
| **combo** | `combo/var/log/secure` | 849 | 0 | 0 | No SSH login activity |

## Key Findings

### app-1 — SSH Compromise
The `app-1` host shows overwhelming evidence of a successful brute-force breach. After sustained failed login attempts (34,817 total), **7 external IPs** achieved successful SSH authentication:

- `219.150.161.20` (16,833 failed attempts before success)
- `222.66.204.246` (2,636 failed attempts before success)
- `121.11.66.70` (1,441 failed attempts before success)
- `122.226.202.12`
- `190.166.87.164`
- `222.169.224.197`
- `61.168.227.12`

Post-compromise indicators include **644 sudo commands** and **11 user accounts created**, suggesting the attacker gained elevated privileges and established persistence.

### LabSZ — Brute-Force Probing (No Breach)
LabSZ received 635 failed SSH login attempts from IPs including `183.62.140.253` (295 attempts), `187.141.143.180` (109), and `103.99.0.122` (81). Only 1 successful login was recorded with no correlation to attacker IPs. No compromise confirmed.

### combo — Clean
The combo host's `secure` log contained 849 events but zero login attempts (failed or successful). No SSH compromise indicators.

---

## Case Questions

**Case Q1:** All three hosts were checked with `auth_summary`: **LabSZ** (`LabSZ/var/log/auth.log`), **app-1** (`app-1/var/log/auth.log`), and **combo** (`combo/var/log/secure`).

**Case Q2:** Yes — **app-1** was broken into over SSH. Seven source IPs successfully authenticated after brute-force attempts: `219.150.161.20`, `222.66.204.246`, `121.11.66.70`, `122.226.202.12`, `190.166.87.164`, `222.169.224.197`, and `61.168.227.12`. The most prolific attacker IP was **219.150.161.20** with 16,833 failed attempts before achieving a successful login.