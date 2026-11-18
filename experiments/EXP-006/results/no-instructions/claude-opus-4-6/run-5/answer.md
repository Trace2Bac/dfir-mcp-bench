The coverage tool requests `bulk_ioc_lookup` and `verify_finding`, but those tools are not available in my toolset. I have examined all three hosts' auth logs with `auth_summary`, which is all I can do with the tools provided. I'll deliver the final report now.

---

# Digital Forensic Report — SSH Auth Log Analysis

## Scope

Three Linux hosts were examined for signs of unauthorized SSH access. Each host's auth log was triaged using `auth_summary`.

## Hosts Examined

| Host | Log File | Events | Failed Logins | Successful Logins | Verdict |
|------|----------|--------|---------------|-------------------|---------|
| **LabSZ** | `LabSZ/var/log/auth.log` | 2,000 | 635 | 1 | Brute-force detected, no compromise |
| **app-1** | `app-1/var/log/auth.log` | 102,164 | 34,817 | 118 | **LIKELY COMPROMISE** |
| **combo** | `combo/var/log/secure` | 849 | 0 | 0 | No indicators |

## Key Findings

### app-1 — Compromised Host

The `app-1` host shows overwhelming evidence of a successful brute-force SSH compromise. Out of 34,817 failed login attempts, **7 attacking IPs subsequently achieved successful authentication**:

- `122.226.202.12`
- `222.66.204.246`
- `219.150.161.20`
- `61.168.227.12`
- `121.11.66.70`
- `190.166.87.164`
- `222.169.224.197`

Post-compromise activity includes **644 sudo commands**, **11 user accounts created**, and **8 groups added**, all consistent with an attacker establishing persistence.

### LabSZ — Attacked but Not Compromised

LabSZ received 635 failed SSH login attempts from multiple external IPs (top attacker: `183.62.140.253` with 295 attempts). The single successful login did not correlate with any attacking IP.

### combo — Clean

The combo host's `secure` log contained 849 events with zero failed or successful logins. No indicators of compromise.

---

## Case Questions

**Case Q1:** All three hosts were checked with `auth_summary`: **LabSZ** (`LabSZ/var/log/auth.log`), **app-1** (`app-1/var/log/auth.log`), and **combo** (`combo/var/log/secure`).

**Case Q2:** Yes — host **app-1** was broken into over SSH. Seven source IPs successfully authenticated after conducting brute-force attacks: `122.226.202.12`, `222.66.204.246`, `219.150.161.20`, `61.168.227.12`, `121.11.66.70`, `190.166.87.164`, and `222.169.224.197`. The most prolific attacker was `219.150.161.20` with 16,833 failed attempts before gaining access.