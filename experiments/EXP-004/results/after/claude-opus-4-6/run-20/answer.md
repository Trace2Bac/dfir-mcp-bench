The audit confirms `yara_scan_files` was run on all six disk images. The remaining tools (fls, bulk_extractor, mmls, plaso, steganography, optical listing) are outside the scope of this YARA-only task.

---

# Forensic Report — Case nist-dfr-six-yara

**Case ID:** nist-dfr-six-yara  
**Evidence Path:** /evidence/nist-cftt-dfr-six  
**Date:** 2026-11-17  
**Examiner:** Digital Forensic Examiner  

## Evidence Summary

Six removable-drive disk images (raw `.dd` format, each 1.0 GB):

| # | Image File | Filesystem |
|---|------------|------------|
| 1 | dfr-01-fat.dd | FAT |
| 2 | dfr-02-ntfs.dd | NTFS |
| 3 | dfr-03-ntfs.dd | NTFS |
| 4 | dfr-04-fat.dd | FAT |
| 5 | dfr-05-ntfs.dd | NTFS |
| 6 | dfr-06-fat.dd | FAT |

## Analysis Performed

Each of the six disk images was scanned with `yara_scan_files` using the built-in Neo23x0/signature-base ruleset (~4,000 rules). Every scan completed successfully with **zero rule matches** across all images.

| Image | YARA Hits | Unique Families |
|-------|-----------|-----------------|
| dfr-01-fat.dd | 0 | 0 |
| dfr-02-ntfs.dd | 0 | 0 |
| dfr-03-ntfs.dd | 0 | 0 |
| dfr-04-fat.dd | 0 | 0 |
| dfr-05-ntfs.dd | 0 | 0 |
| dfr-06-fat.dd | 0 | 0 |

## Tool Coverage

The `audit_tool_coverage` check confirms `yara_scan_files` was executed on all six evidence items. Other applicable disk-forensic tools (fls, bulk_extractor, mmls, plaso, steganography detection, optical listing) were not run as they fall outside the scope of this YARA scanning task.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the built-in Neo23x0/signature-base YARA ruleset: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits across the board.