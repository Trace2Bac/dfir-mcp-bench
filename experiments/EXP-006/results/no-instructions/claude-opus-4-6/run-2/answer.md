The two remaining gaps require `bulk_ioc_lookup` and `verify_finding`, which are not among my available tools. I have checked all three hosts with `auth_summary` and can answer both case questions. Here is the final report.

---

# Digital Forensic Report — SSH Auth Log Analysis

**Date:** 2026-11-18  
**Evidence:** `/evidence/public-linux-auth` (three hosts)  
**Examiner tools:** findevil MCP server (list_evidence, auth_summary, assess_coverage)

---

## Hosts Examined

### 1. LabSZ (`LabSZ/var/log/auth.log`)
- **Total events:** 2,000
- **Failed logins:** 635 | **Successful logins:** 1
- **Verdict:** Brute-force activity detected from multiple external IPs (top: `183.62.140.253` with 295 attempts, `187.141.143.180` with 109). No successful login correlated with attacker IPs. **No compromise.**

### 2. app-1 (`app-1/var/log/auth.log`)
- **Total events:** 102,164
- **Failed logins:** 34,817 | **Successful logins:** 118
- **Sudo commands:** 644 | **Accounts created:** 11
- **Verdict:** **LIKELY COMPROMISE.** Seven IPs successfully authenticated after prior failed attempts: `222.169.224.197`, `190.166.87.164`, `219.150.161.20`, `122.226.202.12`, `121.11.66.70`, `61.168.227.12`, `222.66.204.246`. The heaviest attacker, `219.150.161.20`, launched 16,833 failed attempts and later gained access. Post-compromise indicators include 644 sudo commands and 11 new user accounts.

### 3. combo (`combo/var/log/secure`)
- **Total events:** 849
- **Failed logins:** 0 | **Successful logins:** 0
- **Verdict:** No login events recorded; no compromise indicators. The log contains only non-login auth events.

---

## Case Questions

**Case Q1:** All three hosts were checked with `auth_summary`: **LabSZ** (`LabSZ/var/log/auth.log`), **app-1** (`app-1/var/log/auth.log`), and **combo** (`combo/var/log/secure`).

**Case Q2:** Yes — **app-1** was broken into over SSH. Seven source IPs achieved successful authentication after brute-force attempts: `219.150.161.20` (the most aggressive, with 16,833 failed attempts), `222.66.204.246`, `121.11.66.70`, `222.169.224.197`, `190.166.87.164`, `122.226.202.12`, and `61.168.227.12`. The compromise is further supported by 644 sudo commands and 11 new user accounts created post-access.