"""Lay out ten Linux hosts' auth logs: three public, seven generated.

    python3 make_hosts.py data/evidence/public-linux-auth data/evidence/linux-ten-hosts

The three public logs (app-1, LabSZ, combo; see datasets/public-linux-auth)
are copied as they are. app-1 is the only host that was broken into. The
other seven hosts get two days of ordinary activity in April 2010, when
app-1 was attacked: hourly cron sessions, the deploy account's key logins and
sudo, and a few failed logins from scanners that never succeed. They are
seeded, so every run writes the same files, and every address is in the
documentation ranges (RFC 5737).
"""

from __future__ import annotations

import random
import shutil
import sys
from datetime import datetime, timedelta
from pathlib import Path

PUBLIC = ["app-1/var/log/auth.log", "LabSZ/var/log/auth.log", "combo/var/log/secure"]
# Host name and role. Named so that app-1 comes about halfway in name order.
HOSTS = {
    **{f"api-{i:02d}": "app" for i in range(1, 5)},
    **{f"db-{i:02d}": "db" for i in range(1, 3)},
    "web-01": "web",
}
START = datetime(2010, 4, 17, 0, 0, 0)
DAYS = 2
ADMIN_IP = "10.20.0.5"
SCANNERS = ["198.51.100.23", "198.51.100.77", "192.0.2.140", "192.0.2.201"]
SUDO = {
    "app": ["/usr/bin/systemctl restart app", "/usr/bin/journalctl -u app --since today"],
    "db": ["/usr/bin/systemctl status postgresql", "/usr/bin/pg_dumpall -f /backup/nightly.sql"],
    "web": ["/usr/bin/systemctl reload nginx", "/usr/bin/tail -n 200 /var/log/nginx/error.log"],
}


def stamp(t: datetime) -> str:
    return f"{t:%b} {t.day:2d} {t:%H:%M:%S}"


def host_lines(host: str, role: str, rng: random.Random) -> list[tuple[datetime, str]]:
    lines: list[tuple[datetime, str]] = []
    pid = rng.randint(1000, 3000)

    # same=True: the same process as the line before (a session's close, say).
    def add(t: datetime, service: str, message: str, same: bool = False) -> None:
        nonlocal pid
        if not same:
            pid += rng.randint(1, 40)
        lines.append((t, f"{stamp(t)} {host} {service}[{pid}]: {message}"))

    end = START + timedelta(days=DAYS)
    # Hourly cron jobs.
    t = START + timedelta(minutes=17)
    while t < end:
        add(t, "CRON", "pam_unix(cron:session): session opened for user root by (uid=0)")
        add(t + timedelta(seconds=1), "CRON", "pam_unix(cron:session): session closed for user root", same=True)
        t += timedelta(hours=1)
    # The deploy account: key logins from the admin host, then sudo.
    for day in range(DAYS):
        for _ in range(rng.randint(2, 4)):
            t = START + timedelta(days=day, hours=rng.randint(8, 18), minutes=rng.randint(0, 59))
            port = rng.randint(40000, 60000)
            add(t, "sshd", f"Accepted publickey for deploy from {ADMIN_IP} port {port} ssh2")
            add(t, "sshd", "pam_unix(sshd:session): session opened for user deploy by (uid=0)", same=True)
            session = pid
            cmd = rng.choice(SUDO[role])
            t2 = t + timedelta(minutes=rng.randint(1, 5))
            add(t2, "sudo", f"  deploy : TTY=pts/0 ; PWD=/home/deploy ; USER=root ; COMMAND={cmd}")
            t3 = t2 + timedelta(minutes=8)
            lines.append(
                (t3, f"{stamp(t3)} {host} sshd[{session}]: pam_unix(sshd:session): session closed for user deploy")
            )
    # Background scanning: a few failed logins per source, never a success.
    for ip in rng.sample(SCANNERS, 2):
        t = START + timedelta(hours=rng.randint(0, 40), minutes=rng.randint(0, 59))
        for user in rng.sample(["admin", "test", "ubuntu", "oracle", "git"], rng.randint(1, 3)):
            port = rng.randint(30000, 65000)
            add(t, "sshd", f"Invalid user {user} from {ip}")
            add(
                t + timedelta(seconds=2),
                "sshd",
                f"Failed password for invalid user {user} from {ip} port {port} ssh2",
                same=True,
            )
            t += timedelta(seconds=rng.randint(5, 30))
    lines.sort(key=lambda x: x[0])
    return lines


def main(public: Path, out: Path) -> None:
    if out.exists():
        shutil.rmtree(out)
    for rel in PUBLIC:
        (out / rel).parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(public / rel, out / rel)
    for i, (host, role) in enumerate(HOSTS.items()):
        rng = random.Random(f"{host}-{i}")
        path = out / host / "var" / "log" / "auth.log"
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text("".join(line + "\n" for _, line in host_lines(host, role, rng)))
    print(f"{out}: {len(PUBLIC) + len(HOSTS)} hosts")


if __name__ == "__main__":
    main(Path(sys.argv[1]), Path(sys.argv[2]))
