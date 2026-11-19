All six disk images show `yara_scan_files` in their `tools_run` list. Here is the final report.

---

# Forensic Report — Case nist-dfr-six-yara

## Evidence Overview

Six removable-drive disk images located at `/evidence/nist-cftt-dfr-six/`:

| # | Image File | Type | Size |
|---|-----------|------|------|
| 1 | dfr-01-fat.dd | FAT disk image | 1.0 GB |
| 2 | dfr-02-ntfs.dd | NTFS disk image | 1.0 GB |
| 3 | dfr-03-ntfs.dd | NTFS disk image | 1.0 GB |
| 4 | dfr-04-fat.dd | FAT disk image | 1.0 GB |
| 5 | dfr-05-ntfs.dd | NTFS disk image | 1.0 GB |
| 6 | dfr-06-fat.dd | FAT disk image | 1.0 GB |

## YARA Scan Results

Each image was scanned using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset (~4,000 rules). Results:

| Image | YARA Hits | Matched Families |
|-------|-----------|------------------|
| dfr-01-fat.dd | 0 | — |
| dfr-02-ntfs.dd | 0 | — |
| dfr-03-ntfs.dd | 0 | — |
| dfr-04-fat.dd | 0 | — |
| dfr-05-ntfs.dd | 0 | — |
| dfr-06-fat.dd | 0 | — |

No YARA rule matched any content on any of the six disk images.

## Tool Coverage

`audit_tool_coverage` confirms `yara_scan_files` was executed against all six evidence items. Remaining applicable tools (run_fls, run_bulk_extractor, run_mmls, run_plaso, detect_steganography, run_optical_listing) were not run because they fall outside the scope of this YARA-only scan request.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the built-in signature-base ruleset: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rule matched on any of the six images — zero hits across all scans.