#!/usr/bin/env bash
# Download the NIST CFReDS Data Leakage Case (EnCase images of the PC, the USB
# stick RM#2 and the CD-R RM#3, about 7.6 GB) and lay out the evidence folder.
# Run through `./bench.sh prepare nist-data-leakage`, which runs it in Docker:
#   data/raw/nist-data-leakage/       the downloads and the answer document
#   data/evidence/nist-data-leakage/  the images, renamed without '#'
# The SHA-1 values are the ones NIST publishes for the downloads
# (hash_values.html). Each image's own MD5, stored in the E01, is compared
# with the one in NIST's answers (question 1).
set -euo pipefail
cd "$(dirname "$0")/../.."

RAW=data/raw/nist-data-leakage
EVD=data/evidence/nist-data-leakage
BASE=https://cfreds-archive.nist.gov/data_leakage_case
mkdir -p "$RAW" "$EVD"
# Marks the evidence as incomplete until every check below has passed;
# `./bench.sh investigate` refuses to start while it exists.
touch "$EVD/.preparing"

[ -f "$RAW/leakage-answers.pdf" ] || curl -fL -o "$RAW/leakage-answers.pdf" "$BASE/leakage-answers.pdf"

# published name (URL path under images/), local name, SHA-1
while read -r src dst sum; do
    raw="$RAW/$(basename "$src" | sed 's/%23/#/g')"
    if [ ! -f "$raw" ]; then
        # Download under a temporary name so an interrupted download is not
        # taken for a finished one.
        curl -fL --retry 3 -C - -o "$raw.part" "$BASE/images/$src"
        mv "$raw.part" "$raw"
    fi
    got=$(sha1sum "$raw" | cut -d' ' -f1)
    if [ "$got" != "$(echo "$sum" | tr 'A-F' 'a-f')" ]; then
        rm -f "$raw" "$EVD/$dst"
        echo "SHA-1 mismatch for $raw: $got (expected $sum); removed it, run prepare again" >&2; exit 1
    fi
    [ -f "$EVD/$dst" ] || cp "$raw" "$EVD/$dst"
    echo "ok   $dst"
done <<'FILES'
pc/cfreds_2015_data_leakage_pc.E01 pc.E01 72432916933F5A309A8C456B40C9601D1F8D2A4F
pc/cfreds_2015_data_leakage_pc.E02 pc.E02 0CAF4261ED8432A8B3BAA019B1B28FDF96F79130
pc/cfreds_2015_data_leakage_pc.E03 pc.E03 BE836C891736C4C0C2253C6803399BF0F2A599BA
pc/cfreds_2015_data_leakage_pc.E04 pc.E04 9159BFFD56097495F73FBBF967B75EB288B1E3DE
rm%232/cfreds_2015_data_leakage_rm%232.E01 rm2.E01 2228554CD6FDD3C85BB80E0A0CD7F21A2364DC99
rm%233/cfreds_2015_data_leakage_rm%233_type3.E01 rm3.E01 75C106FDB2FD2F8068190E951589FF1F9860257E
FILES

if command -v ewfinfo >/dev/null; then
    while read -r img md5; do
        stored=$(ewfinfo "$EVD/$img" | awk -F': *' 'tolower($1) ~ /md5/ {print tolower($2); exit}' | tr -d '[:space:]')
        if [ "$stored" = "$md5" ]; then
            echo "ok   image MD5 in $img matches NIST's answers"
        else
            echo "image MD5 in $img is '${stored:-not found}', the answers say $md5" >&2; exit 1
        fi
    done <<'MD5'
pc.E01 a49d1254c873808c58e6f1bcd60b5bde
rm2.E01 b4644902acab4583a1d0f9f1a08faa77
rm3.E01 df914108fb3d86744eb688eba482fbdf
MD5
fi
rm -f "$EVD/.preparing"
echo "evidence ready in $EVD"
