Audit confirms `yara_scan_files` has been run on all 6 disk images. Here is the final report.

---

# Forensic Investigation Report — Case nist-dfr-six-yara

**Case ID:** nist-dfr-six-yara
**Evidence Path:** /evidence/nist-cftt-dfr-six
**Date:** 2026-11-17
**Examiner:** Digital Forensic Examiner

## Evidence Inventory

Six removable-drive disk images were present in the evidence directory:

| # | Image File | Filesystem | Size |
|---|-----------|------------|------|
| 1 | dfr-01-fat.dd | FAT | 1.0 GB |
| 2 | dfr-02-ntfs.dd | NTFS | 1.0 GB |
| 3 | dfr-03-ntfs.dd | NTFS | 1.0 GB |
| 4 | dfr-04-fat.dd | FAT | 1.0 GB |
| 5 | dfr-05-ntfs.dd | NTFS | 1.0 GB |
| 6 | dfr-06-fat.dd | FAT | 1.0 GB |

## YARA Scan Results

Each disk image was individually scanned using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset (~4,000 rules). Results:

| Image | YARA Hits | Unique Families |
|-------|-----------|-----------------|
| dfr-01-fat.dd | 0 | 0 |
| dfr-02-ntfs.dd | 0 | 0 |
| dfr-03-ntfs.dd | 0 | 0 |
| dfr-04-fat.dd | 0 | 0 |
| dfr-05-ntfs.dd | 0 | 0 |
| dfr-06-fat.dd | 0 | 0 |

No YARA rules matched on any of the six disk images.

## Tool Coverage

The final audit confirms `yara_scan_files` was executed against all 6 evidence items. Other disk-analysis tools (run_fls, run_bulk_extractor, run_mmls, run_plaso, detect_steganography, run_optical_listing) were not run as they were outside the scope of this YARA-only scan request.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files`: dfr-01-fat.dd, dfr-02-ntfs.dd, dfr-03-ntfs.dd, dfr-04-fat.dd, dfr-05-ntfs.dd, and dfr-06-fat.dd. No YARA rules matched on any of the six images — zero hits total across all scans using the Neo23x0/signature-base ruleset.