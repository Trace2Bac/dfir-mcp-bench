Coverage is clean. Here is my final report.

---

# Forensic Report — Ten Linux Hosts SSH Auth Log Examination

## Summary

All ten hosts' auth logs were examined using `auth_summary`. Two hosts showed significant SSH attack activity; one of them — **app-1** — shows evidence of successful compromise.

## Host-by-Host Findings

| Host | Log File | Total Events | Failed Logins | Successful Logins | Verdict |
|------|----------|-------------|---------------|-------------------|---------|
| **LabSZ** | auth.log (220K) | 2,000 | 635 | 1 | Brute-force activity, no compromise |
| **api-01** | auth.log (12K) | 126 | 10 | 5 | Normal activity |
| **api-02** | auth.log (13K) | 136 | 8 | 8 | Normal activity |
| **api-03** | auth.log (13K) | 136 | 8 | 8 | Normal activity |
| **api-04** | auth.log (12K) | 122 | 6 | 5 | Normal activity |
| **app-1** | auth.log (9.9M) | 102,164 | 34,817 | 118 | **LIKELY COMPROMISE** |
| **combo** | secure (97K) | 849 | 0 | 0 | Normal activity |
| **db-01** | auth.log (12K) | 128 | 8 | 6 | Normal activity |
| **db-02** | auth.log (12K) | 120 | 8 | 4 | Normal activity |
| **web-01** | auth.log (12K) | 126 | 6 | 6 | Normal activity |

## Key Finding: app-1 Compromise

Host **app-1** experienced a massive brute-force SSH campaign (34,817 failed login attempts) and **7 source IPs successfully authenticated after prior failed attempts**, indicating successful brute-force compromise:

- **219.150.161.20** (16,833 failed attempts — top attacker)
- **222.66.204.246** (2,636 failed attempts)
- **121.11.66.70** (1,441 failed attempts)
- **222.169.224.197**
- **122.226.202.12**
- **61.168.227.12**
- **190.166.87.164**

Additionally, app-1 showed 11 user accounts added and 8 groups added, along with 644 sudo commands — consistent with post-compromise activity.

## Secondary Finding: LabSZ Brute-Force (No Compromise)

Host **LabSZ** experienced brute-force SSH attempts from 5 external IPs (top attacker: 183.62.140.253 with 295 attempts), but no correlated successful logins were observed. The brute force was unsuccessful.

## Case Questions

**Case Q1:** All 10 hosts' auth logs were examined: LabSZ, api-01, api-02, api-03, api-04, app-1, combo, db-01, db-02, and web-01.

**Case Q2:** Yes — host **app-1** was broken into over SSH. Seven source IPs successfully authenticated after brute-force attempts: 219.150.161.20, 222.66.204.246, 121.11.66.70, 222.169.224.197, 122.226.202.12, 61.168.227.12, and 190.166.87.164. The most prolific attacker IP was **219.150.161.20** with 16,833 failed attempts before achieving a successful login.