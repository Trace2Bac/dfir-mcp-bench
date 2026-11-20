#!/usr/bin/env bash
# Build a system-level triage collection from the Data Leakage PC image, the
# way CyLR or KAPE hand one over: the machine's registry hives, main event
# logs, Prefetch, RecentFileCache and the device-install log, at their own
# paths under C/, and the same files as PC-triage.zip. User hives, shortcuts
# and browser data are not collected. Run through
# `./bench.sh prepare nist-data-leakage-triage`, after the images are in place:
#   data/evidence/pc-triage/PC-triage.zip
#   data/evidence/pc-triage/PC-triage/C/...
# The files are copied byte for byte with icat; the zip entries carry a fixed
# date, so the folder hashes the same every time.
set -euo pipefail
cd "$(dirname "$0")/../.."

IMG=data/evidence/nist-data-leakage-pc/pc.E01
OFF=206848   # the Windows partition (mmls)
# A neutral name: the folder name reaches the agent's prompt.
OUT=data/evidence/pc-triage
[ -f "$IMG" ] || { echo "no $IMG; run ./bench.sh prepare nist-data-leakage first" >&2; exit 1; }

rm -rf "$OUT"
mkdir -p "$OUT/PC-triage/C"
listing=$(mktemp)
fls -r -p -o "$OFF" "$IMG" > "$listing"
want='^(Windows/System32/config/(SYSTEM|SOFTWARE|SAM|SECURITY)|Windows/System32/winevt/Logs/(Security|System|Application|Microsoft-Windows-TerminalServices-LocalSessionManager%4Operational)\.evtx|Windows/Prefetch/[^/]+\.pf|Windows/AppCompat/Programs/RecentFileCache\.bcf|Windows/inf/setupapi\.dev\.log)$'
# Allocated regular files only: "r/r <inode>:<TAB><path>".
grep -P '^r/r [0-9-]+:\t' "$listing" | while IFS=$'\t' read -r head path; do
    [[ $path =~ $want ]] || continue
    inode=${head#r/r }; inode=${inode%:}
    mkdir -p "$OUT/PC-triage/C/$(dirname "$path")"
    icat -o "$OFF" "$IMG" "$inode" > "$OUT/PC-triage/C/$path"
done
rm -f "$listing"

python3 - "$OUT" <<'PY'
import sys, zipfile
from pathlib import Path
out = Path(sys.argv[1]); root = out / "PC-triage"
with zipfile.ZipFile(out / "PC-triage.zip", "w", zipfile.ZIP_DEFLATED) as z:
    for p in sorted(root.rglob("*")):
        if p.is_file():
            info = zipfile.ZipInfo(str(p.relative_to(root)), date_time=(2015, 3, 25, 12, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            z.writestr(info, p.read_bytes())
PY
got=$(cd "$OUT" && find . -type f | LC_ALL=C sort | xargs -d '\n' sha256sum | sha256sum | cut -d' ' -f1)
want_sum=db8c4ad05a304cadd452041b7f2de62b781ea7e08527bac6285c47ab600f8c87
if [ "$want_sum" = "-" ]; then
    echo "new  pc-triage $got  (add this to make_triage.sh)"
elif [ "$got" != "$want_sum" ]; then
    echo "SHA-256 mismatch for $OUT: $got (expected $want_sum)" >&2; exit 1
else
    echo "ok   pc-triage"
fi
echo "files: $(find "$OUT/PC-triage" -type f | wc -l)"
