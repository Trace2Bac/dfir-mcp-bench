Coverage is clean. Here is the final report.

---

# Forensic Report — SSH Access Investigation Across Ten Linux Hosts

## Evidence Examined

All ten hosts' auth logs were examined using `auth_summary`:

| Host | Log File | Size | Events | Failed Logins | Successful Logins | Verdict |
|------|----------|------|--------|---------------|-------------------|---------|
| LabSZ | auth.log | 220K | 2,000 | 635 | 1 | Brute-force activity, no compromise |
| api-01 | auth.log | 12K | 126 | 10 | 5 | No compromise indicators |
| api-02 | auth.log | 13K | 136 | 8 | 8 | No compromise indicators |
| api-03 | auth.log | 13K | 136 | 8 | 8 | No compromise indicators |
| api-04 | auth.log | 12K | 122 | 6 | 5 | No compromise indicators |
| app-1 | auth.log | 9.9M | 102,164 | 34,817 | 118 | **LIKELY COMPROMISE** |
| combo | secure | 97K | 849 | 0 | 0 | No compromise indicators |
| db-01 | auth.log | 12K | 128 | 8 | 6 | No compromise indicators |
| db-02 | auth.log | 12K | 120 | 8 | 4 | No compromise indicators |
| web-01 | auth.log | 12K | 126 | 6 | 6 | No compromise indicators |

## Key Findings

### app-1 — SSH Brute-Force Compromise

Host **app-1** shows overwhelming evidence of successful brute-force compromise. With 34,817 failed SSH login attempts and 118 successful logins, the auth_summary tool flagged 7 external IPs that **successfully authenticated after prior failed attempts**:

1. `219.150.161.20` — 16,833 failed attempts (top attacker)
2. `222.66.204.246` — 2,636 failed attempts
3. `121.11.66.70` — 1,441 failed attempts
4. `122.226.202.12`
5. `190.166.87.164`
6. `222.169.224.197`
7. `61.168.227.12`

Additionally, 11 user accounts were added and 644 sudo commands were executed on this host, suggesting significant post-compromise activity.

### LabSZ — Brute-Force Attempts (No Compromise)

Host **LabSZ** received 635 failed SSH login attempts from multiple IPs (top attacker: `183.62.140.253` with 295 attempts), but the tool found no correlated successful logins from attacker IPs. Only 1 successful login was recorded.

### Remaining 8 Hosts — No Compromise Indicators

Hosts api-01, api-02, api-03, api-04, combo, db-01, db-02, and web-01 all show low-volume failed login activity (0–10 failed attempts each) from IPs in the `192.0.2.x` and `198.51.100.x` documentation ranges. None show signs of compromise.

---

## Case Questions

**Case Q1:** All 10 hosts' auth logs were examined: **LabSZ**, **api-01**, **api-02**, **api-03**, **api-04**, **app-1**, **combo** (secure log), **db-01**, **db-02**, **web-01**.

**Case Q2:** Yes — host **app-1** was broken into over SSH. Seven source IPs successfully authenticated after brute-force attempts: `219.150.161.20`, `222.66.204.246`, `121.11.66.70`, `122.226.202.12`, `190.166.87.164`, `222.169.224.197`, and `61.168.227.12`. The most prolific attacker was `219.150.161.20` with 16,833 failed attempts before gaining access.