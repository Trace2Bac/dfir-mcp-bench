Coverage is clean. Here is my final report.

---

# Forensic Examination Report — Linux Ten-Hosts Auth Log Review

## Evidence Examined

All 10 hosts' authentication logs were examined using `auth_summary`:

| Host | Log File | Size | Events | Failed Logins | Successful Logins | Verdict |
|------|----------|------|--------|---------------|-------------------|---------|
| LabSZ | auth.log | 220K | 2,000 | 635 | 1 | Brute force, no compromise |
| api-01 | auth.log | 12K | 126 | 10 | 5 | Normal |
| api-02 | auth.log | 13K | 136 | 8 | 8 | Normal |
| api-03 | auth.log | 13K | 136 | 8 | 8 | Normal |
| api-04 | auth.log | 12K | 122 | 6 | 5 | Normal |
| app-1 | auth.log | 9.9M | 102,164 | 34,817 | 118 | **LIKELY COMPROMISE** |
| combo | secure | 97K | 849 | 0 | 0 | Normal |
| db-01 | auth.log | 12K | 128 | 8 | 6 | Normal |
| db-02 | auth.log | 12K | 120 | 8 | 4 | Normal |
| web-01 | auth.log | 12K | 126 | 6 | 6 | Normal |

## Key Findings

### app-1 — SSH Brute Force Compromise

Host **app-1** shows overwhelming evidence of a successful SSH brute force attack. The auth log contains 34,817 failed login attempts and 118 successful logins. The tool flagged 7 source IPs that **successfully authenticated after prior failed attempts**, which is the classic signature of a brute force break-in:

- `219.150.161.20` (16,833 failed attempts — the top attacker, then succeeded)
- `222.66.204.246` (2,636 failed attempts, then succeeded)
- `121.11.66.70` (1,441 failed attempts, then succeeded)
- `122.226.202.12` (succeeded after failed attempts)
- `61.168.227.12` (succeeded after failed attempts)
- `222.169.224.197` (succeeded after failed attempts)
- `190.166.87.164` (succeeded after failed attempts)

Post-compromise activity indicators: 644 sudo commands executed, 11 user accounts added, and 8 groups added — consistent with an attacker establishing persistence.

### LabSZ — Brute Force Attempts (No Compromise)

LabSZ saw 635 failed SSH login attempts from external IPs (top: `183.62.140.253` with 295 attempts), but only 1 successful login with no correlation to the attacking IPs. The brute force was unsuccessful.

### Other Hosts — Normal Activity

The remaining 8 hosts (api-01 through api-04, combo, db-01, db-02, web-01) show routine authentication activity with low failed login counts (0–10) and no indicators of compromise.

---

## Case Questions

**Case Q1:** All 10 hosts' auth logs were examined: **LabSZ**, **api-01**, **api-02**, **api-03**, **api-04**, **app-1**, **combo** (secure log), **db-01**, **db-02**, and **web-01**.

**Case Q2:** Yes — host **app-1** was broken into over SSH. Seven source IPs successfully authenticated after brute force attempts. The most prolific attacker IP was **219.150.161.20** (16,833 failed attempts before succeeding). Other compromising source IPs: `222.66.204.246`, `121.11.66.70`, `122.226.202.12`, `61.168.227.12`, `222.169.224.197`, and `190.166.87.164`. Post-compromise indicators include 644 sudo commands, 11 new user accounts, and 8 new groups.