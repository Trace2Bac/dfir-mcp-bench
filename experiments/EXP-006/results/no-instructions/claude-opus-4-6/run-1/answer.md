The coverage assessment flags two gaps (IOC lookup and finding verification), but those tools (`bulk_ioc_lookup`, `verify_finding`) are not available in my toolset. All three auth logs have been examined with `auth_summary`, which is the core requirement. I have enough evidence to answer both case questions.

---

# Digital Forensic Report — SSH Auth Log Review

## Evidence Examined

| Host | Log Path | Size | Events |
|------|----------|------|--------|
| LabSZ | `/evidence/public-linux-auth/LabSZ/var/log/auth.log` | 220K | 2,000 |
| app-1 | `/evidence/public-linux-auth/app-1/var/log/auth.log` | 9.9M | 102,164 |
| combo | `/evidence/public-linux-auth/combo/var/log/secure` | 97K | 849 |

## Host-by-Host Findings

### LabSZ
- **635 failed logins**, only **1 successful login**, zero sudo or account changes.
- Heavy brute-force activity from `183.62.140.253` (295 attempts), `187.141.143.180` (109), `103.99.0.122` (81), and others.
- **Verdict:** Brute-force probing detected, but **no compromise** — no attacker IP achieved a successful login.

### app-1
- **34,817 failed logins**, **118 successful logins**, 644 sudo commands, 11 user accounts added.
- **Likely compromised.** Seven IPs successfully authenticated *after* prior failed-login attempts, a hallmark of successful brute-force:
  - `219.150.161.20` (16,833 failed attempts, then succeeded)
  - `222.66.204.246` (2,636 failed attempts, then succeeded)
  - `121.11.66.70` (1,441 failed attempts, then succeeded)
  - `61.168.227.12`
  - `190.166.87.164`
  - `222.169.224.197`
  - `122.226.202.12`
- Post-compromise indicators include 644 sudo commands and 11 new user accounts created — consistent with attacker persistence.
- **Verdict: COMPROMISED.**

### combo
- **849 events**, zero failed logins, zero successful logins, zero sudo or account changes.
- **Verdict:** No indicators of compromise. Normal system activity only.

---

## Case Questions

**Case Q1:** All three hosts were checked with `auth_summary`: **LabSZ**, **app-1**, and **combo**.

**Case Q2:** Yes — host **app-1** was broken into over SSH. Seven source IPs achieved successful authentication after brute-force attempts. The most prolific attacker IPs were **219.150.161.20** (16,833 failed attempts before success), **222.66.204.246** (2,636 failed attempts before success), and **121.11.66.70** (1,441 failed attempts before success). Post-compromise activity (644 sudo commands, 11 new user accounts) confirms the breach extended beyond initial access.