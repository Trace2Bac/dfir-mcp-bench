All six disk images confirm `yara_scan_files` has been run. Here is the final report.

---

# Forensic Report — Case nist-dfr-six-yara

**Case ID:** nist-dfr-six-yara  
**Examiner:** [examiner]  
**Date:** 2026-11-17  
**Evidence Location:** /evidence/nist-cftt-dfr-six  

## Evidence Summary

Six removable-drive disk images were presented for YARA scanning:

| # | Image File | Filesystem | Size | YARA Hits |
|---|-----------|-----------|------|-----------|
| 1 | dfr-01-fat.dd | FAT | 1.0 GB | 0 |
| 2 | dfr-02-ntfs.dd | NTFS | 1.0 GB | 0 |
| 3 | dfr-03-ntfs.dd | NTFS | 1.0 GB | 0 |
| 4 | dfr-04-fat.dd | FAT | 1.0 GB | 0 |
| 5 | dfr-05-ntfs.dd | NTFS | 1.0 GB | 0 |
| 6 | dfr-06-fat.dd | FAT | 1.0 GB | 0 |

Each image was individually scanned using the built-in Neo23x0/signature-base YARA ruleset (~4,000 rules). No rules matched on any of the six images.

## Tool Coverage

The `audit_tool_coverage` report confirms `yara_scan_files` was executed against all six disk images. Other disk-forensic tools (file listing, bulk_extractor, partition mapping, timeline, steganography detection, optical listing) were not run as they were outside the scope of this YARA-only engagement.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the Neo23x0/signature-base ruleset: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits across all scans.