All six images have `yara_scan_files` confirmed as run. The remaining tools not run (fls, bulk_extractor, mmls, plaso, steganography, optical listing) are outside the scope of this YARA-only investigation.

---

# Forensic Report — Case nist-dfr-six-yara

**Case ID:** nist-dfr-six-yara  
**Evidence Path:** /evidence/nist-cftt-dfr-six  
**Date:** 2026-11-17  
**Examiner:** Digital Forensic Examiner

## Evidence Summary

Six removable-drive disk images were presented for YARA scanning:

| # | Image File | Type | Size | YARA Result |
|---|-----------|------|------|-------------|
| 1 | dfr-01-fat.dd | FAT disk image | 1.0 GB | **No matches** (0 hits) |
| 2 | dfr-02-ntfs.dd | NTFS disk image | 1.0 GB | **No matches** (0 hits) |
| 3 | dfr-03-ntfs.dd | NTFS disk image | 1.0 GB | **No matches** (0 hits) |
| 4 | dfr-04-fat.dd | FAT disk image | 1.0 GB | **No matches** (0 hits) |
| 5 | dfr-05-ntfs.dd | NTFS disk image | 1.0 GB | **No matches** (0 hits) |
| 6 | dfr-06-fat.dd | FAT disk image | 1.0 GB | **No matches** (0 hits) |

Each image was scanned individually using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset (~4,000 rules). Tool coverage was audited after each scan to confirm execution.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the built-in Neo23x0/signature-base ruleset: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — every scan returned 0 hits, 0 unique families.