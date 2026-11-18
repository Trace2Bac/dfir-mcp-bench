#!/usr/bin/env bash
# Download three public Linux auth logs and lay them out as three hosts, one
# folder each. Run through `./bench.sh prepare public-linux-auth`, which runs
# it in Docker:
#   data/raw/public-linux-auth/       the downloads
#   data/evidence/public-linux-auth/  app-1/var/log/auth.log
#                                     LabSZ/var/log/auth.log
#                                     combo/var/log/secure
# - app-1: Honeynet Project Forensic Challenge 5 "Log Mysteries" (2010). The
#   archive is no longer on honeynet.org, so it comes from the Internet
#   Archive's copy of the original URL, captured on 2010-09-25.
# - LabSZ and combo: Loghub (logpai/loghub), the OpenSSH and Linux samples,
#   pinned to a commit. combo's log is a whole system log; only its sshd and
#   su lines, the ones Red Hat writes to /var/log/secure, are kept.
# Neither source publishes hashes. The SHA-256 values below were recorded at
# the first download and are checked every time.
set -euo pipefail
cd "$(dirname "$0")/../.."

RAW=data/raw/public-linux-auth
EVD=data/evidence/public-linux-auth
HONEYNET=https://web.archive.org/web/20100925092223id_/https://honeynet.org/files/sanitized_log.zip
LOGHUB=https://raw.githubusercontent.com/logpai/loghub/dd61d0952749ee7963bde24220d1be5ede023033
mkdir -p "$RAW"

fetch() {   # fetch <url> <file>
    [ -f "$RAW/$2" ] || curl -fL --retry 3 -o "$RAW/$2" "$1"
}

check() {   # check <sha256> <path>
    local got; got=$(sha256sum "$2" | cut -d' ' -f1)
    if [ "$got" != "$1" ]; then
        echo "SHA-256 mismatch for $2: $got (expected $1)" >&2; exit 1
    fi
    echo "ok   $2"
}

fetch "$HONEYNET" sanitized_log.zip
fetch "$LOGHUB/OpenSSH/OpenSSH_2k.log" OpenSSH_2k.log
fetch "$LOGHUB/Linux/Linux_2k.log" Linux_2k.log
check 28bf161c797849922ac7a858e0b58492fab3e9b8d23727f4b44b63e75199bcf7 "$RAW/sanitized_log.zip"
check 1e4912727fa88245113d41b16a0cd25ceadba7f931e1c406542885b91254264f "$RAW/OpenSSH_2k.log"
check b3e20bc1afe732ab1bf3ed1de4bf9c809e4194e02f7dea911d918e5342e8e173 "$RAW/Linux_2k.log"

rm -rf "$EVD"
mkdir -p "$EVD/app-1/var/log" "$EVD/LabSZ/var/log" "$EVD/combo/var/log"
python3 -c 'import sys, zipfile; sys.stdout.buffer.write(zipfile.ZipFile(sys.argv[1]).read("sanitized_log/auth.log"))' \
    "$RAW/sanitized_log.zip" > "$EVD/app-1/var/log/auth.log"
cp "$RAW/OpenSSH_2k.log" "$EVD/LabSZ/var/log/auth.log"
grep -E '^[A-Z][a-z]{2} +[0-9]+ [0-9:]{8} combo (sshd|su)\(pam_unix\)\[' "$RAW/Linux_2k.log" > "$EVD/combo/var/log/secure"
check 730bace212f7b2e878a7b2ad31e99e25a7f8e27479a07f1e4d713e15e4a19d18 "$EVD/app-1/var/log/auth.log"
check 1e4912727fa88245113d41b16a0cd25ceadba7f931e1c406542885b91254264f "$EVD/LabSZ/var/log/auth.log"
check d474818dad65467e1d0747b70fe77d2c2482a74670aa53671750eefb4edef4fc "$EVD/combo/var/log/secure"
echo "evidence ready in $EVD"
