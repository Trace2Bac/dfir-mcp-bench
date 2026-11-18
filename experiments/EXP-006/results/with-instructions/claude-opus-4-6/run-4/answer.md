I've checked all three hosts with `auth_summary`. The coverage tool requests additional pivoting tools (bulk_ioc_lookup, verify_finding) that are not available in my toolset. With all auth logs examined, I have enough evidence to answer the case questions.

---

# Final Forensic Report — SSH Auth Log Analysis

## Evidence Examined

| Host | Log File | Size | Status |
|------|----------|------|--------|
| **LabSZ** | `/evidence/public-linux-auth/LabSZ/var/log/auth.log` | 220K | Checked via auth_summary |
| **app-1** | `/evidence/public-linux-auth/app-1/var/log/auth.log` | 9.9M | Checked via auth_summary |
| **combo** | `/evidence/public-linux-auth/combo/var/log/secure` | 97K | Checked via auth_summary |

## Findings

### Host: LabSZ
- **2000 total events**, 635 failed logins, 1 successful login, 0 sudo commands.
- Heavy brute-force activity from external IPs. Top attacker: `183.62.140.253` (295 attempts).
- **No correlated compromise** — the single successful login is not linked to a brute-force source.

### Host: app-1
- **102,164 total events**, 34,817 failed logins, 118 successful logins, 644 sudo commands, 11 user accounts added.
- Massive brute-force activity. Top attacker: `219.150.161.20` (16,833 attempts).
- **Likely compromise** — 7 external IPs successfully authenticated **after** prior failed attempts:
  - `219.150.161.20`
  - `222.66.204.246`
  - `121.11.66.70`
  - `222.169.224.197`
  - `122.226.202.12`
  - `190.166.87.164`
  - `61.168.227.12`
- Post-authentication activity includes 644 sudo commands and 11 new user accounts — consistent with post-compromise lateral movement or persistence.

### Host: combo
- **849 total events**, 0 failed logins, 0 successful logins, 0 sudo commands.
- **No compromise indicators.**

---

## Case Questions

**Case Q1:** All three hosts were checked with `auth_summary`: **LabSZ**, **app-1**, and **combo**.

**Case Q2:** Yes — host **app-1** was broken into over SSH. Seven source IPs successfully authenticated after brute-force attempts: `219.150.161.20`, `222.66.204.246`, `121.11.66.70`, `222.169.224.197`, `122.226.202.12`, `190.166.87.164`, and `61.168.227.12`. The most prolific attacker was `219.150.161.20` with 16,833 failed attempts before achieving a successful login.