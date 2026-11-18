Artifact coverage is CLEAN. I've examined all 10 hosts' auth logs. Here is my final report.

---

# Forensic Report — SSH Auth Log Examination of Ten Linux Hosts

## Executive Summary

Ten Linux servers were examined for signs of unauthorized SSH access. **One host — `app-1` — was broken into over SSH** via brute-force password guessing. Seven distinct external IPs achieved successful authentication after sustained failed login attempts. The remaining nine hosts show no evidence of SSH compromise, though `LabSZ` did experience significant brute-force probing that was unsuccessful.

## Host-by-Host Findings

| Host | Log File | Total Events | Failed Logins | Successful Logins | Verdict |
|------|----------|-------------|---------------|-------------------|---------|
| **app-1** | auth.log (9.9 MB) | 102,164 | 34,817 | 118 | **COMPROMISED** |
| **LabSZ** | auth.log (220 KB) | 2,000 | 635 | 1 | Brute force — no breach |
| api-01 | auth.log (12 KB) | 126 | 10 | 5 | Clean |
| api-02 | auth.log (13 KB) | 136 | 8 | 8 | Clean |
| api-03 | auth.log (13 KB) | 136 | 8 | 8 | Clean |
| api-04 | auth.log (12 KB) | 122 | 6 | 5 | Clean |
| combo | secure (97 KB) | 849 | 0 | 0 | Clean |
| db-01 | auth.log (12 KB) | 128 | 8 | 6 | Clean |
| db-02 | auth.log (12 KB) | 120 | 8 | 4 | Clean |
| web-01 | auth.log (12 KB) | 126 | 6 | 6 | Clean |

## Detailed Analysis — app-1 (Compromised Host)

The `app-1` auth log is by far the largest (9.9 MB, 102,164 events) and shows massive brute-force activity that resulted in successful breaches:

- **34,817 failed SSH logins** from many external IPs
- **118 successful logins**, with 7 IPs that succeeded after prior failed attempts
- **644 sudo commands** executed post-compromise
- **11 user accounts created** and **8 groups added** — indicating significant post-compromise activity (possible backdoor account creation)

### Attacker Source IPs (successfully authenticated after brute force):

| Source IP | Failed Attempts | Notes |
|-----------|----------------|-------|
| `219.150.161.20` | 16,833 | Most persistent attacker |
| `8.12.45.242` | 5,879 | Heavy brute force (success not confirmed in triage) |
| `222.66.204.246` | 2,636 | Successfully authenticated |
| `121.11.66.70` | 1,441 | Successfully authenticated |
| `122.226.202.12` | — | Successfully authenticated after failures |
| `222.169.224.197` | — | Successfully authenticated after failures |
| `61.168.227.12` | — | Successfully authenticated after failures |
| `190.166.87.164` | — | Successfully authenticated after failures |

## Detailed Analysis — LabSZ (Brute Force, No Breach)

LabSZ experienced 635 failed SSH logins with the top sources being `183.62.140.253` (295 attempts), `187.141.143.180` (109 attempts), and `103.99.0.122` (81 attempts). Only 1 successful login was recorded and there is no correlation to the brute-force IPs — the attack was **unsuccessful**.

## Limitations

- Only auth logs were available; no filesystem, memory, or network evidence was examined.
- The `combo` host uses a Red Hat-style `secure` log rather than `auth.log`; it contained 849 events but recorded zero SSH login attempts (failed or successful).
- IOC reputation lookups were not performed on the attacking IPs due to tool unavailability.

---

## Case Questions

**Case Q1:** All ten hosts' auth logs were examined: **LabSZ**, **api-01**, **api-02**, **api-03**, **api-04**, **app-1**, **combo** (via `/var/log/secure`), **db-01**, **db-02**, and **web-01**.

**Case Q2:** Yes — host **app-1** was broken into over SSH. Seven source IPs successfully authenticated after brute-force attempts: **219.150.161.20** (most prominent, with 16,833 failed attempts), **122.226.202.12**, **222.66.204.246**, **222.169.224.197**, **61.168.227.12**, **121.11.66.70**, and **190.166.87.164**.