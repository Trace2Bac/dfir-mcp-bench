All six disk images have `yara_scan_files` confirmed as run. The remaining tools not run (fls, bulk_extractor, mmls, plaso, steganography, optical_listing) are outside the scope of this YARA-focused investigation.

---

# Forensic Report — Case nist-dfr-six-yara

## Case Summary

Six removable-drive disk images located at `/evidence/nist-cftt-dfr-six` were scanned with YARA rules (Neo23x0/signature-base ruleset, ~4,000 rules) to check for malware or suspicious content prior to handover.

## Evidence Inventory

| # | Image File | Filesystem | Size |
|---|------------|------------|------|
| 1 | dfr-01-fat.dd | FAT | 1.0 GB |
| 2 | dfr-02-ntfs.dd | NTFS | 1.0 GB |
| 3 | dfr-03-ntfs.dd | NTFS | 1.0 GB |
| 4 | dfr-04-fat.dd | FAT | 1.0 GB |
| 5 | dfr-05-ntfs.dd | NTFS | 1.0 GB |
| 6 | dfr-06-fat.dd | FAT | 1.0 GB |

## YARA Scan Results

Each image was individually scanned using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset. Results:

| Image | YARA Hits | Unique Families |
|-------|-----------|-----------------|
| dfr-01-fat.dd | 0 | 0 |
| dfr-02-ntfs.dd | 0 | 0 |
| dfr-03-ntfs.dd | 0 | 0 |
| dfr-04-fat.dd | 0 | 0 |
| dfr-05-ntfs.dd | 0 | 0 |
| dfr-06-fat.dd | 0 | 0 |

**No YARA rules matched on any of the six disk images.**

## Tools Not Run (Justification)

The following tools were applicable to disk images but intentionally skipped because they are outside the scope of this YARA-only pre-handover scan: `run_fls`, `run_bulk_extractor`, `run_mmls`, `run_plaso`, `detect_steganography`, `run_optical_listing`.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the built-in Neo23x0/signature-base ruleset (~4,000 rules). The images scanned were: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits across all scans.