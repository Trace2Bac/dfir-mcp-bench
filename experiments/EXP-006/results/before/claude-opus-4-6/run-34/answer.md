The audit confirms `yara_scan_files` was run on all six disk images. The remaining tools (fls, bulk_extractor, mmls, plaso, steganography, optical listing) are not required for the YARA-scanning scope of this case.

---

# Forensic Report — Case nist-dfr-six-yara

**Case ID:** nist-dfr-six-yara  
**Evidence Path:** /evidence/nist-cftt-dfr-six  
**Date:** 2026-11-17  
**Examiner:** Digital Forensic Examiner  

## Evidence Summary

Six removable-drive disk images (raw `.dd` format, each 1.0 GB) were provided for YARA scanning:

| # | Image File | Filesystem | YARA Hits |
|---|------------|------------|-----------|
| 1 | dfr-01-fat.dd | FAT | 0 |
| 2 | dfr-02-ntfs.dd | NTFS | 0 |
| 3 | dfr-03-ntfs.dd | NTFS | 0 |
| 4 | dfr-04-fat.dd | FAT | 0 |
| 5 | dfr-05-ntfs.dd | NTFS | 0 |
| 6 | dfr-06-fat.dd | FAT | 0 |

## Methodology

Each disk image was scanned using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset (~4,000 rules). The audit tool confirmed that `yara_scan_files` was executed against all six evidence items.

## Case Questions

Case Q1: All six disk images were scanned with yara_scan_files: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits across all scans.