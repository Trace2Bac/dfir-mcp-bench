#!/usr/bin/env bash
# Download NIST CFTT deleted file recovery (DFR) test images and lay out the
# evidence folder. Run through `./bench.sh prepare nist-cftt-dfr`, which runs it
# in Docker:
#   data/raw/nist-cftt-dfr/        the .dd.bz2 downloads and the layout document
#   data/evidence/nist-cftt-dfr/   the decompressed images
# NIST publishes no hashes for these images; the SHA-256 values below were
# recorded at the first download and are checked on every later one.
set -euo pipefail
cd "$(dirname "$0")/../.."

RAW=data/raw/nist-cftt-dfr
EVD=data/evidence/nist-cftt-dfr
BASE=https://cfreds-archive.nist.gov/dfr-images
mkdir -p "$RAW" "$EVD"

[ -f "$RAW/setup-july-10-2012.pdf" ] || curl -fL -o "$RAW/setup-july-10-2012.pdf" "$BASE/setup-july-10-2012.pdf"

while read -r sum name; do
    [ -f "$RAW/$name.dd.bz2" ] || curl -fL -o "$RAW/$name.dd.bz2" "$BASE/$name.dd.bz2"
    if [ ! -f "$EVD/$name.dd" ]; then
        python3 -c 'import bz2, shutil, sys
with bz2.open(sys.argv[1]) as src, open(sys.argv[2], "wb") as dst:
    shutil.copyfileobj(src, dst, 1 << 20)' "$RAW/$name.dd.bz2" "$EVD/$name.dd"
    fi
    got=$(sha256sum "$EVD/$name.dd" | cut -d' ' -f1)
    if [ "$sum" = "-" ]; then
        echo "new  $name.dd $got  (add this to fetch.sh)"
    elif [ "$got" != "$sum" ]; then
        echo "SHA-256 mismatch for $name.dd: $got (expected $sum)" >&2; exit 1
    else
        echo "ok   $name.dd"
    fi
done <<'SUMS'
5d5bf8fb15a1df463fb0b9c0a958c05ece30941af40545f895131ff0daf32fab dfr-01-fat
SUMS
echo "evidence ready in $EVD"
