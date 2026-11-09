#!/usr/bin/env bash
# Download the DFRWS 2005 Rodeo "Rhino Hunt" set from NIST CFReDS, check the
# MD5 values published on the dataset page, and lay out the evidence folders.
# Run through `./bench.sh prepare rhino-hunt`, which runs it in Docker:
#   data/raw/rhino-hunt/      the zip and its contents
#   data/evidence/rhino-hunt/ the USB key image and the three traces as .pcap
set -euo pipefail
cd "$(dirname "$0")/../.."

RAW=data/raw/rhino-hunt
EVD=data/evidence/rhino-hunt
URL=https://cfreds-archive.nist.gov/dfrws/DFRWS2005-RODEO.zip

mkdir -p "$RAW" "$EVD"
[ -f "$RAW/DFRWS2005-RODEO.zip" ] || curl -fL -o "$RAW/DFRWS2005-RODEO.zip" "$URL"
python3 -m zipfile -e "$RAW/DFRWS2005-RODEO.zip" "$RAW"

md5_of() { md5sum "$1" | cut -d' ' -f1; }
while read -r sum name; do
    got=$(md5_of "$RAW/$name")
    [ "$got" = "$sum" ] || { echo "MD5 mismatch for $name: $got (expected $sum)" >&2; exit 1; }
    echo "ok  $name"
done <<'SUMS'
c0d0093eb1664cd7b73f3a5225ae3f30 rhino.log
cd21eaf4acfb50f71ffff857d7968341 rhino2.log
7e29f9d67346df25faaf18efcd95fc30 rhino3.log
80348c58eec4c328ef1f7709adc56a54 RHINOUSB.dd
SUMS

# The .log names hide the format; mulder picks tools by extension.
for n in rhino rhino2 rhino3; do cp "$RAW/$n.log" "$EVD/$n.pcap"; done
cp "$RAW/RHINOUSB.dd" "$EVD/RHINOUSB.dd"
echo "evidence ready in $EVD"
