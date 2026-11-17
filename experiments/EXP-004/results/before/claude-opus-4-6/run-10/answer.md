All six disk images have yara_scan_files confirmed in their tools_run list. Here is the final report.

---

# Forensic Report — Case nist-dfr-six-yara

## Evidence Summary

Six removable-drive disk images located at `/evidence/nist-cftt-dfr-six`:

| Image | Filesystem | Size | YARA Hits |
|---|---|---|---|
| dfr-01-fat.dd | FAT | 1.0 GB | 0 |
| dfr-02-ntfs.dd | NTFS | 1.0 GB | 0 |
| dfr-03-ntfs.dd | NTFS | 1.0 GB | 0 |
| dfr-04-fat.dd | FAT | 1.0 GB | 0 |
| dfr-05-ntfs.dd | NTFS | 1.0 GB | 0 |
| dfr-06-fat.dd | FAT | 1.0 GB | 0 |

## YARA Scan Details

Each of the six disk images was individually scanned using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset (~4,000 rules). Every scan completed successfully and returned **zero matches** — no YARA rules triggered on any image.

## Tools Not Run (Justification)

The remaining applicable disk tools (run_fls, run_bulk_extractor, run_mmls, run_plaso, detect_steganography, run_optical_listing) were not executed because the case briefing scope was limited to YARA scanning. No additional analysis was requested.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the built-in signature-base ruleset: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — all scans returned 0 hits.