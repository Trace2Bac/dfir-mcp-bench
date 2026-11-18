Coverage is now clean. All 10 auth logs have been examined. Here is the final report.

---

# Forensic Report: SSH Auth Log Analysis — 10 Linux Hosts

## Executive Summary

Auth logs from all 10 Linux servers were examined. One host — **app-1** — shows strong evidence of SSH brute-force compromise. A second host — **LabSZ** — was targeted by brute-force attacks but does not appear to have been breached. The remaining eight hosts show only low-level failed login activity with no compromise indicators.

## Host-by-Host Findings

| Host | Log File | Total Events | Failed Logins | Successful Logins | Verdict |
|------|----------|-------------|---------------|-------------------|---------|
| **app-1** | auth.log (9.9 MB) | 102,164 | 34,817 | 118 | **LIKELY COMPROMISED** |
| **LabSZ** | auth.log (220 KB) | 2,000 | 635 | 1 | Brute-force targeted, no breach |
| **combo** | secure (97 KB) | 849 | 0 | 0 | Clean |
| **api-01** | auth.log (12 KB) | 126 | 10 | 5 | Clean |
| **api-02** | auth.log (13 KB) | 136 | 8 | 8 | Clean |
| **api-03** | auth.log (13 KB) | 136 | 8 | 8 | Clean |
| **api-04** | auth.log (12 KB) | 122 | 6 | 5 | Clean |
| **db-01** | auth.log (12 KB) | 128 | 8 | 6 | Clean |
| **db-02** | auth.log (12 KB) | 120 | 8 | 4 | Clean |
| **web-01** | auth.log (12 KB) | 126 | 6 | 6 | Clean |

### app-1 — Compromised Host (Detail)

The auth log for **app-1** is by far the largest (9.9 MB, 102,164 events) and shows a massive brute-force SSH campaign. Key indicators:

- **34,817 failed SSH logins** from many external IPs
- **7 IP addresses** successfully authenticated **after** prior failed attempts, the hallmark of a successful brute-force attack:
  - 219.150.161.20 (16,833 failed attempts before success — top attacker)
  - 61.168.227.12
  - 121.11.66.70
  - 222.66.204.246
  - 122.226.202.12
  - 222.169.224.197
  - 190.166.87.164
- **Post-compromise activity**: 644 sudo commands executed, 11 user accounts created, 8 groups added — consistent with an attacker establishing persistence.

### LabSZ — Brute-Force Targeted, No Breach

- 635 failed logins, primarily from 183.62.140.253 (295 attempts) and 187.141.143.180 (109 attempts)
- Only 1 successful login; no successful authentication correlated with brute-force source IPs
- No evidence of compromise

### Remaining 8 Hosts

api-01, api-02, api-03, api-04, db-01, db-02, web-01, and combo all show minimal failed login activity (0–10 failed logins each) from a small number of sources (198.51.100.0/24 and 192.0.2.0/24 ranges — RFC 5737 documentation addresses). No compromise indicators on any of these hosts.

---

## Case Questions

**Case Q1:** All 10 hosts' auth logs were examined: **LabSZ**, **api-01**, **api-02**, **api-03**, **api-04**, **app-1**, **combo** (via /var/log/secure), **db-01**, **db-02**, and **web-01**.

**Case Q2:** Yes — host **app-1** was broken into over SSH. Seven source IPs successfully authenticated after failed brute-force attempts. The most prolific attacker IP was **219.150.161.20** (16,833 failed attempts before achieving a successful login). Other IPs that also brute-forced their way in include 61.168.227.12, 121.11.66.70, 222.66.204.246, 122.226.202.12, 222.169.224.197, and 190.166.87.164. Post-compromise activity on app-1 included 644 sudo commands and the creation of 11 user accounts.