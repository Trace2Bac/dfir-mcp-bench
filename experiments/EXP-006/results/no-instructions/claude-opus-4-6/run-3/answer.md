The assessment flags 2 gaps (IOC lookup and finding verification), but those tools are not available in my toolset — I only have `list_evidence`, `auth_summary`, and `assess_coverage`. I have examined all three hosts' auth logs and have sufficient evidence to answer the case questions.

---

# Digital Forensic Report — SSH Auth Log Analysis

## Evidence Examined

Three Linux servers' authentication logs were analyzed:

| Host | Log Path | Size | Events |
|------|----------|------|--------|
| **LabSZ** | `LabSZ/var/log/auth.log` | 220K | 2,000 |
| **app-1** | `app-1/var/log/auth.log` | 9.9M | 102,164 |
| **combo** | `combo/var/log/secure` | 97K | 849 |

## Findings

### Host: LabSZ
- **635 failed SSH logins** from multiple external IPs (top attacker: `183.62.140.253` with 295 attempts).
- Only **1 successful login** — not correlated with any brute-force source IP.
- **Verdict: Brute-force probing, no compromise.**

### Host: app-1
- **34,817 failed SSH logins** — massive brute-force campaign.
- **118 successful logins**, with **7 IPs that succeeded after prior failed attempts** — a hallmark of brute-force compromise.
- Compromising IPs: `61.168.227.12`, `219.150.161.20`, `122.226.202.12`, `190.166.87.164`, `222.169.224.197`, `222.66.204.246`, `121.11.66.70`
- The top attacker, `219.150.161.20`, made **16,833 failed attempts** before achieving successful authentication.
- Post-compromise activity includes **644 sudo commands** and **11 user accounts created**, indicating significant unauthorized access.
- **Verdict: COMPROMISED.**

### Host: combo
- **0 failed logins, 0 successful logins** recorded.
- 849 events in the secure log but no authentication activity of concern.
- **Verdict: No compromise indicators.**

## Case Questions

**Case Q1:** All three hosts were checked with `auth_summary`: **LabSZ** (`LabSZ/var/log/auth.log`), **app-1** (`app-1/var/log/auth.log`), and **combo** (`combo/var/log/secure`).

**Case Q2:** Yes — host **app-1** was broken into over SSH. Seven source IPs successfully authenticated after brute-force attempts: `61.168.227.12`, `219.150.161.20`, `122.226.202.12`, `190.166.87.164`, `222.169.224.197`, `222.66.204.246`, `121.11.66.70`. The most prolific attacker was `219.150.161.20` (16,833 failed attempts before success). Post-compromise indicators include 644 sudo commands and 11 newly created user accounts.