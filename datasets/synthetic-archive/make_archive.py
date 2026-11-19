"""Write collection.zip, an archive of three office files, into <out>.

A staging archive of the kind an attacker builds before exfiltration. Its
entries carry a fixed date, so every run writes the same bytes.

    python3 make_archive.py data/evidence/synthetic-archive
"""

from __future__ import annotations

import sys
import zipfile
from pathlib import Path

FILES = {
    "finance/q3-forecast.xlsx": "quarter,revenue\nQ3,1250000\n",
    "hr/salaries-2026.csv": "name,salary\nA. Kim,82000\nB. Lee,91000\n",
    "legal/contract-draft.docx": "Draft agreement between the parties.\n",
}


def main(out: Path) -> None:
    out.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(out / "collection.zip", "w", zipfile.ZIP_DEFLATED) as z:
        for name, text in FILES.items():
            info = zipfile.ZipInfo(name, date_time=(2026, 3, 4, 2, 30, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            z.writestr(info, text)
    print(out / "collection.zip")


if __name__ == "__main__":
    main(Path(sys.argv[1]))
