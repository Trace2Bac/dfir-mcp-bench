The coverage tool shows 2 remaining gaps (IOC lookups and claim verification), but I only have `auth_summary`, `list_evidence`, and `assess_coverage` available. I've examined all 10 hosts' auth logs and can answer both case questions. Here is my final report.

---

# Forensic Report — Ten Linux Hosts SSH Auth Log Review

## Methodology

Each of the 10 hosts had its auth log (or equivalent) examined using `auth_summary`. The logs were located at `/evidence/linux-ten-hosts/<host>/var/log/auth.log` (or `secure` for the combo host).

## Host-by-Host Findings

| Host | Log File | Total Events | Failed Logins | Successful Logins | Verdict |
|------|----------|-------------|---------------|-------------------|---------|
| LabSZ | auth.log | 2,000 | 635 | 1 | Brute force, no compromise |
| api-01 | auth.log | 126 | 10 | 5 | Clean |
| api-02 | auth.log | 136 | 8 | 8 | Clean |
| api-03 | auth.log | 136 | 8 | 8 | Clean |
| api-04 | auth.log | 122 | 6 | 5 | Clean |
| **app-1** | **auth.log** | **102,164** | **34,817** | **118** | **COMPROMISED** |
| combo | secure | 849 | 0 | 0 | Clean |
| db-01 | auth.log | 128 | 8 | 6 | Clean |
| db-02 | auth.log | 120 | 8 | 4 | Clean |
| web-01 | auth.log | 126 | 6 | 6 | Clean |

## app-1 Compromise Detail

Host **app-1** shows clear evidence of SSH brute-force compromise. The `auth_summary` tool flagged **LIKELY COMPROMISE** — 7 external IPs successfully authenticated **after** prior failed login attempts, which is the hallmark pattern of a successful brute-force attack:

| Source IP | Failed Attempts |
|-----------|----------------|
| 219.150.161.20 | 16,833 |
| 8.12.45.242 | 5,879 |
| 222.66.204.246 | 2,636 |
| 121.11.66.70 | 1,441 |
| 124.207.117.9 | 1,172 |

The 7 IPs that achieved successful login after failed attempts were:
- **219.150.161.20**
- **222.66.204.246**
- **121.11.66.70**
- **222.169.224.197**
- **122.226.202.12**
- **190.166.87.164**
- **61.168.227.12**

Post-compromise indicators on app-1 include 644 sudo commands executed, 11 user accounts created, and 8 groups added — suggesting the attackers gained elevated privileges and created backdoor accounts.

## LabSZ Note

LabSZ experienced significant brute-force activity (635 failed logins, top attacker 183.62.140.253 with 295 attempts) but the tool found **no correlated successful logins from attack IPs**, so no compromise was confirmed.

---

## Case Questions

**Case Q1:** All 10 hosts' auth logs were examined: **LabSZ**, **api-01**, **api-02**, **api-03**, **api-04**, **app-1**, **combo** (secure log), **db-01**, **db-02**, and **web-01**.

**Case Q2:** Yes — host **app-1** was broken into over SSH. Seven source IPs successfully authenticated after brute-force attempts: **219.150.161.20**, **222.66.204.246**, **121.11.66.70**, **222.169.224.197**, **122.226.202.12**, **190.166.87.164**, and **61.168.227.12**. The largest attacker was 219.150.161.20 with 16,833 failed attempts before achieving access. No other host showed evidence of successful SSH compromise.