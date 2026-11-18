Coverage is clean. Here is the final report.

---

# Forensic Report — Ten Linux Hosts SSH Auth Log Review

## Summary

All ten hosts' auth logs were examined using the `auth_summary` tool. One host — **app-1** — shows strong indicators of SSH compromise via brute-force attack. One additional host — **LabSZ** — shows brute-force activity but no successful breach. The remaining eight hosts show normal activity with no compromise indicators.

## Host-by-Host Findings

| Host | Log File | Failed Logins | Successful Logins | Verdict |
|------|----------|--------------|-------------------|---------|
| **app-1** | auth.log (9.9 MB) | 34,817 | 118 | **LIKELY COMPROMISE** |
| **LabSZ** | auth.log (220 KB) | 635 | 1 | Brute-force probing, no breach |
| api-01 | auth.log (12 KB) | 10 | 5 | Clean |
| api-02 | auth.log (13 KB) | 8 | 8 | Clean |
| api-03 | auth.log (13 KB) | 8 | 8 | Clean |
| api-04 | auth.log (12 KB) | 6 | 5 | Clean |
| combo | secure (97 KB) | 0 | 0 | Clean |
| db-01 | auth.log (12 KB) | 8 | 6 | Clean |
| db-02 | auth.log (12 KB) | 8 | 4 | Clean |
| web-01 | auth.log (12 KB) | 6 | 6 | Clean |

### app-1 — Likely Compromise

The `auth_summary` tool flagged **LIKELY COMPROMISE** on app-1. It recorded 34,817 failed SSH login attempts and 118 successful logins. Critically, **7 source IPs successfully authenticated after prior failed attempts**, which is the classic signature of a successful brute-force attack:

- 219.150.161.20 (top attacker with 16,833 failed attempts)
- 222.66.204.246 (2,636 failed attempts)
- 121.11.66.70 (1,441 failed attempts)
- 190.166.87.164
- 222.169.224.197
- 61.168.227.12
- 122.226.202.12

Additionally, 11 user accounts were created and 644 sudo commands were executed — possible indicators of post-compromise activity (account creation for persistence, privilege escalation).

### LabSZ — Brute-Force Activity, No Breach

LabSZ received 635 failed SSH login attempts from external IPs (top sources: 183.62.140.253, 187.141.143.180, 103.99.0.122). The tool reported no correlated successful logins from these attackers. The host was probed but not breached based on available evidence.

### Remaining Hosts — No Indicators of Compromise

api-01 through api-04, db-01, db-02, web-01, and combo all showed low failed login counts (0–10) from a small number of IPs (192.0.2.x and 198.51.100.x ranges, which are documentation/test ranges). No compromise indicators were found. The combo host uses `/var/log/secure` (RHEL/CentOS format) rather than `auth.log`.

---

## Case Questions

**Case Q1:** All ten hosts' auth logs were examined: **LabSZ**, **api-01**, **api-02**, **api-03**, **api-04**, **app-1**, **combo**, **db-01**, **db-02**, and **web-01**.

**Case Q2:** Yes — host **app-1** was broken into over SSH. Seven source IPs successfully authenticated after failed brute-force attempts. The most prolific attacker was **219.150.161.20** (16,833 failed attempts before gaining access). The other compromising source IPs were: 222.66.204.246, 121.11.66.70, 190.166.87.164, 222.169.224.197, 61.168.227.12, and 122.226.202.12.