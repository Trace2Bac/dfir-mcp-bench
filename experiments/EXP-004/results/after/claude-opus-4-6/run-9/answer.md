All six disk images now show `yara_scan_files` in their `tools_run` list. Here is the final report.

---

# Forensic Report — Case nist-dfr-six-yara

**Case ID:** nist-dfr-six-yara  
**Evidence Path:** /evidence/nist-cftt-dfr-six  
**Date:** 2026-11-17  
**Examiner:** Digital Forensic Examiner  

## Evidence Summary

Six removable-drive disk images (each 1.0 GB) were provided for YARA scanning:

| # | Image File | Filesystem | YARA Scan Result |
|---|-----------|------------|-----------------|
| 1 | dfr-01-fat.dd | FAT | 0 hits |
| 2 | dfr-02-ntfs.dd | NTFS | 0 hits |
| 3 | dfr-03-ntfs.dd | NTFS | 0 hits |
| 4 | dfr-04-fat.dd | FAT | 0 hits |
| 5 | dfr-05-ntfs.dd | NTFS | 0 hits |
| 6 | dfr-06-fat.dd | FAT | 0 hits |

## Methodology

Each disk image was scanned individually using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset (~4,000 rules). After each scan, `audit_tool_coverage` was called to confirm that the tool had been recorded against that image and to identify remaining images still requiring scanning. The final audit confirmed `yara_scan_files` was executed on all six evidence items.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files`: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — every scan returned 0 hits, 0 unique families. The images are clean with respect to the Neo23x0/signature-base ruleset.