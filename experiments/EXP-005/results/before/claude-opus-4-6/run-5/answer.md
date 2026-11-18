Coverage is clean. I have all the evidence I need. Here is my final report.

---

# Final Forensic Report — Linux Ten Hosts SSH Investigation

## Scope

Auth logs from 10 Linux servers were examined for evidence of unauthorized SSH access.

## Summary of Findings

### Hosts With Significant Activity

**app-1** — **Likely compromised.** The auth log (9.9 MB) contains 102,164 events including 34,817 failed SSH logins and 118 successful logins. The tool flagged 7 source IPs that successfully authenticated *after* conducting failed brute-force attempts: `121.11.66.70`, `222.169.224.197`, `222.66.204.246`, `61.168.227.12`, `219.150.161.20`, `122.226.202.12`, `190.166.87.164`. Post-compromise indicators include 644 sudo commands, 11 user accounts added, and 8 groups added. The top brute-force source was `219.150.161.20` with 16,833 failed attempts.

**LabSZ** — Brute-force activity detected (635 failed logins across 2,000 events) but no successful authentication correlated to attacker IPs. Only 1 successful login recorded. Top attacking IPs: `183.62.140.253` (295 attempts), `187.141.143.180` (109), `103.99.0.122` (81).

### Hosts With No Compromise Indicators

The remaining 8 hosts showed routine activity with low failed-login counts (0–10) and no signs of brute-force escalation to successful authentication:

| Host | Events | Failed | Successful | Notes |
|------|--------|--------|------------|-------|
| api-01 | 126 | 10 | 5 | Normal |
| api-02 | 136 | 8 | 8 | Normal |
| api-03 | 136 | 8 | 8 | Normal |
| api-04 | 122 | 6 | 5 | Normal |
| combo | 849 | 0 | 0 | Uses `/var/log/secure` (RHEL-style); no SSH login events |
| db-01 | 128 | 8 | 6 | Normal |
| db-02 | 120 | 8 | 4 | Normal |
| web-01 | 126 | 6 | 6 | Normal |

## Case Questions

**Case Q1:** All 10 hosts' auth logs were examined: **LabSZ**, **api-01**, **api-02**, **api-03**, **api-04**, **app-1**, **combo**, **db-01**, **db-02**, **web-01**.

**Case Q2:** Yes — host **app-1** was broken into over SSH. Seven source IPs successfully authenticated after conducting brute-force attacks: `219.150.161.20`, `121.11.66.70`, `222.66.204.246`, `222.169.224.197`, `61.168.227.12`, `122.226.202.12`, and `190.166.87.164`. The most prolific attacker was `219.150.161.20` (16,833 failed attempts before achieving access). Post-compromise activity includes 644 sudo commands and 11 new user accounts created.