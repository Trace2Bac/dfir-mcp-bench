#!/usr/bin/env bash
# Download NIST CFTT deleted file recovery (DFR) test images and lay out the
# evidence folder. Run through `./bench.sh prepare nist-cftt-dfr`, which runs it
# in Docker:
#   data/raw/nist-cftt-dfr/        the .dd.bz2 downloads and the layout document
#   data/evidence/nist-cftt-dfr/       dfr-01-fat and dfr-02-ntfs
#   data/evidence/nist-cftt-dfr-six/   those two and four more, six images
# An image in both folders is one file, hard-linked.
# NIST publishes no hashes for these images; the SHA-256 values below were
# recorded at the first download and are checked on every later one.
set -euo pipefail
cd "$(dirname "$0")/../.."

RAW=data/raw/nist-cftt-dfr
BASE=https://cfreds-archive.nist.gov/dfr-images
mkdir -p "$RAW"

[ -f "$RAW/setup-july-10-2012.pdf" ] || curl -fL -o "$RAW/setup-july-10-2012.pdf" "$BASE/setup-july-10-2012.pdf"

# sha256, image name, the evidence folders (under data/evidence) that hold it.
while read -r sum name folders; do
    [ -f "$RAW/$name.dd.bz2" ] || curl -fL -o "$RAW/$name.dd.bz2" "$BASE/$name.dd.bz2"
    IFS=, read -r -a dirs <<< "$folders"
    first="data/evidence/${dirs[0]}/$name.dd"
    mkdir -p "$(dirname "$first")"
    if [ ! -f "$first" ]; then
        python3 -c 'import bz2, shutil, sys
with bz2.open(sys.argv[1]) as src, open(sys.argv[2], "wb") as dst:
    shutil.copyfileobj(src, dst, 1 << 20)' "$RAW/$name.dd.bz2" "$first"
    fi
    for d in "${dirs[@]:1}"; do
        mkdir -p "data/evidence/$d"
        [ -f "data/evidence/$d/$name.dd" ] || ln "$first" "data/evidence/$d/$name.dd"
    done
    got=$(sha256sum "$first" | cut -d' ' -f1)
    if [ "$sum" = "-" ]; then
        echo "new  $name.dd $got  (add this to fetch.sh)"
    elif [ "$got" != "$sum" ]; then
        echo "SHA-256 mismatch for $name.dd: $got (expected $sum)" >&2; exit 1
    else
        echo "ok   $name.dd"
    fi
done <<'SUMS'
5d5bf8fb15a1df463fb0b9c0a958c05ece30941af40545f895131ff0daf32fab dfr-01-fat nist-cftt-dfr,nist-cftt-dfr-six
57e6f37d3312ee4a113a6534a1ffcbd45ad3e0325a509442ac54ae632762d1ef dfr-02-ntfs nist-cftt-dfr,nist-cftt-dfr-six
466db91345fc6f5b47527f4b2cb109305bdabf2caa0883eb60516c26e625b03a dfr-03-ntfs nist-cftt-dfr-six
e92f32cddea990a7a4d3ca1e6224f9aab76529aee1892a42022f9c725b80aff1 dfr-04-fat nist-cftt-dfr-six
f957f78b200307ef8c49de42309202cbff03c1dc8cea1f4ea1230d8a6eeda27c dfr-05-ntfs nist-cftt-dfr-six
3528de47143586fab381ca33390335af8da2775afacfbe35a5dbcfb98c6f058b dfr-06-fat nist-cftt-dfr-six
SUMS
echo "evidence ready in data/evidence/nist-cftt-dfr and data/evidence/nist-cftt-dfr-six"
