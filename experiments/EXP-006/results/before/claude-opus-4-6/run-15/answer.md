The audit confirms `yara_scan_files` was run on all six disk images. The remaining tools (fls, bulk_extractor, mmls, plaso, steganography, optical_listing) are not required for this case — the brief only asks for YARA scanning.

---

# Digital Forensic Report — Case nist-dfr-six-yara

**Case ID:** nist-dfr-six-yara  
**Evidence Path:** /evidence/nist-cftt-dfr-six  
**Date:** 2026-11-17  
**Examiner:** Digital Forensic Examiner

## Evidence Summary

Six removable-drive disk images (each 1.0 GB) were provided for YARA malware scanning:

| # | Image File | Filesystem | YARA Hits |
|---|------------|------------|-----------|
| 1 | dfr-01-fat.dd | FAT | 0 |
| 2 | dfr-02-ntfs.dd | NTFS | 0 |
| 3 | dfr-03-ntfs.dd | NTFS | 0 |
| 4 | dfr-04-fat.dd | FAT | 0 |
| 5 | dfr-05-ntfs.dd | NTFS | 0 |
| 6 | dfr-06-fat.dd | FAT | 0 |

All six images were scanned using the built-in Neo23x0/signature-base YARA ruleset (~4,000 rules). No rules matched on any image.

## Tool Coverage

The `audit_tool_coverage` function confirmed that `yara_scan_files` was executed on every disk image. Other applicable disk-image tools (fls, bulk_extractor, mmls, plaso, steganography detection, optical listing) were not run as they fall outside the scope of this YARA-only scanning request.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the built-in Neo23x0/signature-base ruleset: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits across all scans.