#!/usr/bin/env bash
# Download the NIST CFReDS Hacking Case (EnCase image, two segments, about
# 1 GB) and lay out the evidence folder. Run through
# `./bench.sh prepare nist-hacking-case`, which runs it in Docker:
#   data/raw/nist-hacking-case/       the downloads and the answer key
#   data/evidence/nist-hacking-case/  the image, renamed without spaces
# NIST publishes no file hashes for these downloads. The SHA-256 values below
# are recorded at the first download ("-" until then) and checked afterwards.
# The image's own MD5, stored in the E01, is compared with the one in NIST's
# answer key (question 1).
set -euo pipefail
cd "$(dirname "$0")/../.."

RAW=data/raw/nist-hacking-case
EVD=data/evidence/nist-hacking-case
BASE=https://cfreds-archive.nist.gov
IMAGE_MD5=aee4fcd9301c03b3b054623ca261959a   # TestAnswers.pdf, question 1
mkdir -p "$RAW" "$EVD"

[ -f "$RAW/TestAnswers.pdf" ] || curl -fL -o "$RAW/TestAnswers.pdf" "$BASE/images/TestAnswers.pdf"

# The two segments must share a base name for the E01 to open, so both are
# renamed the same way.
while read -r sum seg; do
    src="$RAW/4Dell Latitude CPi.$seg"
    dst="$EVD/4Dell_Latitude_CPi.$seg"
    [ -f "$src" ] || curl -fL -o "$src" "$BASE/images/4Dell%20Latitude%20CPi.$seg"
    [ -f "$dst" ] || cp "$src" "$dst"
    got=$(sha256sum "$dst" | cut -d' ' -f1)
    if [ "$sum" = "-" ]; then
        echo "new  4Dell_Latitude_CPi.$seg $got  (add this to fetch.sh)"
    elif [ "$got" != "$sum" ]; then
        echo "SHA-256 mismatch for 4Dell_Latitude_CPi.$seg: $got (expected $sum)" >&2; exit 1
    else
        echo "ok   4Dell_Latitude_CPi.$seg"
    fi
done <<'SUMS'
- E01
- E02
SUMS

if command -v ewfinfo >/dev/null; then
    stored=$(ewfinfo "$EVD/4Dell_Latitude_CPi.E01" | awk -F': *' 'tolower($1) ~ /md5/ {print tolower($2); exit}' | tr -d '[:space:]')
    if [ "$stored" = "$IMAGE_MD5" ]; then
        echo "ok   image MD5 in the E01 matches NIST's answer key"
    else
        echo "note image MD5 in the E01 is '${stored:-not found}', answer key says $IMAGE_MD5" >&2
    fi
fi
echo "evidence ready in $EVD"
