All six images confirmed scanned. Here is the final report.

---

# Forensic Report — Case nist-dfr-six-yara

## Evidence Summary

Six removable-drive disk images located at `/evidence/nist-cftt-dfr-six`:

| # | Image File | Filesystem | Size | YARA Hits |
|---|-----------|-----------|------|-----------|
| 1 | dfr-01-fat.dd | FAT | 1.0 GB | 0 |
| 2 | dfr-02-ntfs.dd | NTFS | 1.0 GB | 0 |
| 3 | dfr-03-ntfs.dd | NTFS | 1.0 GB | 0 |
| 4 | dfr-04-fat.dd | FAT | 1.0 GB | 0 |
| 5 | dfr-05-ntfs.dd | NTFS | 1.0 GB | 0 |
| 6 | dfr-06-fat.dd | FAT | 1.0 GB | 0 |

## YARA Scanning Methodology

Each disk image was scanned individually using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset (~4,000 rules). The audit log confirms `yara_scan_files` was executed against all six evidence items.

## Tools Not Run (Justification)

The following tools were not run because they fall outside the scope of this engagement, which was limited to YARA scanning: `run_fls`, `run_bulk_extractor`, `run_mmls`, `run_plaso`, `detect_steganography`, `run_optical_listing`.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` — **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images (0 total hits, 0 unique malware families). The images are clean per the Neo23x0/signature-base ruleset.