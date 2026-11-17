All six disk images now show `yara_scan_files` in their `tools_run` list. Here is the final report.

---

# Forensic Report — Case nist-dfr-six-yara

**Case ID:** nist-dfr-six-yara  
**Evidence Path:** /evidence/nist-cftt-dfr-six  
**Date:** 2026-11-17  
**Examiner:** Digital Forensic Examiner  

## Evidence Inventory

Six removable-drive disk images (each 1.0 GB) were provided:

| # | Image File | Filesystem |
|---|------------|------------|
| 1 | dfr-01-fat.dd | FAT |
| 2 | dfr-02-ntfs.dd | NTFS |
| 3 | dfr-03-ntfs.dd | NTFS |
| 4 | dfr-04-fat.dd | FAT |
| 5 | dfr-05-ntfs.dd | NTFS |
| 6 | dfr-06-fat.dd | FAT |

## YARA Scan Results

Each image was scanned individually using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset (~4,000 rules). Results:

| Image | YARA Hits | Unique Families |
|-------|-----------|-----------------|
| dfr-01-fat.dd | 0 | 0 |
| dfr-02-ntfs.dd | 0 | 0 |
| dfr-03-ntfs.dd | 0 | 0 |
| dfr-04-fat.dd | 0 | 0 |
| dfr-05-ntfs.dd | 0 | 0 |
| dfr-06-fat.dd | 0 | 0 |

Final audit confirmed that `yara_scan_files` was executed against all six evidence items.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the built-in Neo23x0/signature-base YARA ruleset: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits across all scans.