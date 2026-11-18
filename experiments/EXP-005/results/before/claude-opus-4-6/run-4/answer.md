Coverage is clean. All 10 auth logs have been examined. Here is the final report.

---

# Forensic Analysis Report — Ten Linux Hosts SSH Auth Log Review

## Hosts Examined

All 10 hosts' auth logs were examined using the `auth_summary` tool:

| Host | Log File | Total Events | Failed Logins | Successful Logins | Verdict |
|------|----------|-------------|---------------|-------------------|---------|
| LabSZ | auth.log (220K) | 2,000 | 635 | 1 | Brute force, no compromise |
| api-01 | auth.log (12K) | 126 | 10 | 5 | Clean |
| api-02 | auth.log (13K) | 136 | 8 | 8 | Clean |
| api-03 | auth.log (13K) | 136 | 8 | 8 | Clean |
| api-04 | auth.log (12K) | 122 | 6 | 5 | Clean |
| app-1 | auth.log (9.9M) | 102,164 | 34,817 | 118 | **LIKELY COMPROMISE** |
| combo | secure (97K) | 849 | 0 | 0 | Clean |
| db-01 | auth.log (12K) | 128 | 8 | 6 | Clean |
| db-02 | auth.log (12K) | 120 | 8 | 4 | Clean |
| web-01 | auth.log (12K) | 126 | 6 | 6 | Clean |

## Key Findings

### app-1 — SSH Brute Force Followed by Successful Authentication

Host **app-1** shows overwhelming evidence of a successful brute-force attack. With 34,817 failed login attempts and 118 successful logins, the `auth_summary` tool flagged **7 source IPs that successfully authenticated AFTER prior failed attempts** — the hallmark of a successful brute-force break-in:

- **219.150.161.20** (16,833 failed attempts before success)
- **222.66.204.246** (2,636 failed attempts before success)
- **121.11.66.70** (1,441 failed attempts before success)
- **122.226.202.12**
- **61.168.227.12**
- **190.166.87.164**
- **222.169.224.197**

Additionally, 11 user accounts were added and 644 sudo commands were executed — consistent with post-compromise activity (backdoor account creation and privilege escalation).

### LabSZ — Brute Force Attempt (Unsuccessful)

Host **LabSZ** experienced 635 failed SSH login attempts, primarily from 183.62.140.253 (295 attempts), but no correlated successful login was detected. This appears to be an unsuccessful brute-force attack.

### Other Hosts — No Indicators of Compromise

The remaining 8 hosts (api-01 through api-04, combo, db-01, db-02, web-01) showed normal authentication activity with low numbers of failed logins, all from RFC 5737 documentation-range IPs (192.0.2.x, 198.51.100.x), suggesting routine or simulated activity rather than real attacks.

---

## Case Questions

**Case Q1:** All 10 hosts' auth logs were examined: **LabSZ**, **api-01**, **api-02**, **api-03**, **api-04**, **app-1**, **combo** (secure log), **db-01**, **db-02**, and **web-01**.

**Case Q2:** Yes, host **app-1** was broken into over SSH. Seven source IPs successfully authenticated after brute-force attempts. The most prolific attacker was **219.150.161.20** (16,833 failed attempts before achieving a successful login). Other compromising source IPs include: 222.66.204.246, 121.11.66.70, 122.226.202.12, 61.168.227.12, 190.166.87.164, and 222.169.224.197.