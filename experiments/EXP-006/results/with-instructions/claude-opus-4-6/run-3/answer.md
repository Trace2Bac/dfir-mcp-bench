The coverage tool requests `bulk_ioc_lookup` and `verify_finding`, but those tools are not available in my current toolset. I have completed `auth_summary` on all three hosts and have sufficient evidence to answer both case questions. Here is the final report.

---

# Forensic Report — SSH Access Investigation

## Evidence Examined

| Host | Log Path | Size | Status |
|------|----------|------|--------|
| **LabSZ** | `/evidence/public-linux-auth/LabSZ/var/log/auth.log` | 220K | Checked via `auth_summary` |
| **app-1** | `/evidence/public-linux-auth/app-1/var/log/auth.log` | 9.9M | Checked via `auth_summary` |
| **combo** | `/evidence/public-linux-auth/combo/var/log/secure` | 97K | Checked via `auth_summary` |

## Findings

### Host: LabSZ
- **635 failed SSH logins**, only **1 successful login**
- Top attackers: `183.62.140.253` (295 attempts), `187.141.143.180` (109), `103.99.0.122` (81)
- Verdict: **Brute-force probing detected, no successful compromise correlated with the attacks.**

### Host: app-1
- **34,817 failed SSH logins**, **118 successful logins**, **644 sudo commands**, **11 user accounts created**
- **7 IPs successfully authenticated AFTER prior failed brute-force attempts**, indicating successful credential guessing:
  - `219.150.161.20` — 16,833 failed attempts, then successful login
  - `222.66.204.246` — 2,636 failed attempts, then successful login
  - `121.11.66.70` — 1,441 failed attempts, then successful login
  - `190.166.87.164`, `122.226.202.12`, `222.169.224.197`, `61.168.227.12` — also succeeded after failures
- Verdict: **Likely compromised.** Post-brute-force successful logins, sudo activity, and user account creation all point to a breach.

### Host: combo
- **849 events, 0 failed logins, 0 successful logins**
- No SSH login activity recorded in the secure log.
- Verdict: **No compromise indicators.**

---

## Case Questions

**Case Q1:** All three hosts were checked with `auth_summary`: **LabSZ**, **app-1**, and **combo**.

**Case Q2:** Yes — host **app-1** was broken into over SSH. Seven source IPs achieved successful logins after brute-force attempts. The most prolific attacker was **219.150.161.20** (16,833 failed attempts followed by a successful login). Other confirmed attacker IPs that succeeded after brute-forcing: **222.66.204.246**, **121.11.66.70**, **190.166.87.164**, **122.226.202.12**, **222.169.224.197**, and **61.168.227.12**.