The remaining gaps require `bulk_ioc_lookup` and `verify_finding`, which are not available in my tool set. I've examined all three hosts' auth logs with `auth_summary`, which is what the case questions require. Here is the final report.

---

# Forensic Report — SSH Auth Log Review

## Evidence Examined

| Host | Log Path | Log Size | Status |
|------|----------|----------|--------|
| **LabSZ** | `LabSZ/var/log/auth.log` | 220 KB | Examined via `auth_summary` |
| **app-1** | `app-1/var/log/auth.log` | 9.9 MB | Examined via `auth_summary` |
| **combo** | `combo/var/log/secure` | 97 KB | Examined via `auth_summary` |

## Host-by-Host Findings

### LabSZ
- **2,000 total events**, 635 failed logins, 1 successful login, 0 sudo commands.
- Heavy brute-force activity from external IPs, led by `183.62.140.253` (295 attempts) and `187.141.143.180` (109 attempts).
- **No compromise detected.** The single successful login did not correlate with any attacker IP.

### app-1
- **102,164 total events**, 34,817 failed logins, 118 successful logins, 644 sudo commands, 11 user accounts added.
- Massive brute-force campaign, led by `219.150.161.20` (16,833 attempts) and `8.12.45.242` (5,879 attempts).
- **Compromise confirmed.** Seven IPs successfully authenticated after prior failed attempts:
  - `219.150.161.20`
  - `222.66.204.246`
  - `121.11.66.70`
  - `222.169.224.197`
  - `61.168.227.12`
  - `190.166.87.164`
  - `122.226.202.12`
- Post-compromise indicators include 644 sudo commands and 11 newly created user accounts, suggesting the attacker(s) escalated privileges and established persistence.

### combo
- **849 total events**, 0 failed logins, 0 successful logins, 0 sudo commands.
- **No compromise detected.** The log contains only system-level events with no authentication activity.

---

## Case Questions

**Case Q1:** All three hosts were checked with `auth_summary`: **LabSZ** (`LabSZ/var/log/auth.log`), **app-1** (`app-1/var/log/auth.log`), and **combo** (`combo/var/log/secure`).

**Case Q2:** Yes — host **app-1** was broken into over SSH. Seven source IPs successfully authenticated after brute-force attempts: `219.150.161.20`, `222.66.204.246`, `121.11.66.70`, `222.169.224.197`, `61.168.227.12`, `190.166.87.164`, and `122.226.202.12`. The most prolific attacker IP was `219.150.161.20` with 16,833 failed attempts before achieving a successful login. Post-compromise activity includes 644 sudo commands and 11 user accounts created.