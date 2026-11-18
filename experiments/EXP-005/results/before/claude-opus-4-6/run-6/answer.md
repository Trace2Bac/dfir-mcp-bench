Coverage is now clean. All 10 hosts' auth logs have been examined. Here is my final report.

---

# Forensic Analysis Report — Linux Ten Hosts SSH Investigation

## Summary

Ten Linux servers were examined for signs of unauthorized SSH access. Auth logs from all ten hosts were analyzed. One host — **app-1** — shows strong evidence of SSH compromise by multiple external IP addresses. One additional host — **LabSZ** — shows significant brute-force activity but no successful breach. The remaining eight hosts show normal activity with only low-volume failed login attempts.

## Hosts Examined

| Host | Log File | Total Events | Failed Logins | Successful Logins | Verdict |
|------|----------|-------------|---------------|-------------------|---------|
| LabSZ | auth.log (220K) | 2,000 | 635 | 1 | Brute force, no breach |
| api-01 | auth.log (12K) | 126 | 10 | 5 | Clean |
| api-02 | auth.log (13K) | 136 | 8 | 8 | Clean |
| api-03 | auth.log (13K) | 136 | 8 | 8 | Clean |
| api-04 | auth.log (12K) | 122 | 6 | 5 | Clean |
| app-1 | auth.log (9.9M) | 102,164 | 34,817 | 118 | **COMPROMISED** |
| combo | secure (97K) | 849 | 0 | 0 | Clean |
| db-01 | auth.log (12K) | 128 | 8 | 6 | Clean |
| db-02 | auth.log (12K) | 120 | 8 | 4 | Clean |
| web-01 | auth.log (12K) | 126 | 6 | 6 | Clean |

## Detailed Findings

### app-1 — Compromised

This host experienced massive brute-force SSH attacks (34,817 failed logins) and **7 external IPs successfully authenticated after prior failed attempts**, a classic brute-force-to-compromise pattern:

- **219.150.161.20** — 16,833 failed attempts, then successful login
- **222.66.204.246** — 2,636 failed attempts, then successful login
- **121.11.66.70** — 1,441 failed attempts, then successful login
- **122.226.202.12** — failed attempts, then successful login
- **61.168.227.12** — failed attempts, then successful login
- **190.166.87.164** — failed attempts, then successful login
- **222.169.224.197** — failed attempts, then successful login

Post-compromise indicators: **11 user accounts were created**, **8 groups were added**, and **644 sudo commands** were executed — all consistent with attacker post-exploitation activity.

### LabSZ — Brute Force (No Breach)

Sustained brute-force activity from multiple IPs (top attacker: 183.62.140.253 with 295 attempts). Only 1 successful login recorded and no correlation with attacker IPs.

### Remaining Hosts — Clean

api-01, api-02, api-03, api-04, combo, db-01, db-02, and web-01 all show low-volume failed login activity consistent with normal internet-facing SSH noise, with no signs of successful unauthorized access.

---

## Case Questions

**Case Q1:** All ten hosts' auth logs were examined: **LabSZ, api-01, api-02, api-03, api-04, app-1, combo, db-01, db-02, and web-01**. (Note: combo uses a `secure` log instead of `auth.log`, which is the RHEL/CentOS equivalent.)

**Case Q2:** Yes — host **app-1** was broken into over SSH. Seven source IPs successfully authenticated after brute-force attempts: **219.150.161.20, 222.66.204.246, 121.11.66.70, 122.226.202.12, 61.168.227.12, 190.166.87.164, and 222.169.224.197**. The most prolific attacker was **219.150.161.20** (16,833 failed attempts before gaining access). Post-compromise activity includes 11 new user accounts, 8 new groups, and 644 sudo commands.