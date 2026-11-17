The audit confirms `yara_scan_files` was run on all six disk images. The remaining tools (fls, bulk_extractor, mmls, plaso, steganography, optical listing) are outside the scope of this YARA-only task.

---

# Forensic Report — Case nist-dfr-six-yara

**Case ID:** nist-dfr-six-yara  
**Evidence Path:** /evidence/nist-cftt-dfr-six  
**Date:** 2026-11-17  
**Examiner:** Digital Forensic Examiner  

## Evidence Summary

Six removable-drive disk images (raw dd format, each 1.0 GB):

| # | Image File | Filesystem | YARA Scan Result |
|---|-----------|------------|-----------------|
| 1 | dfr-01-fat.dd | FAT | 0 matches |
| 2 | dfr-02-ntfs.dd | NTFS | 0 matches |
| 3 | dfr-03-ntfs.dd | NTFS | 0 matches |
| 4 | dfr-04-fat.dd | FAT | 0 matches |
| 5 | dfr-05-ntfs.dd | NTFS | 0 matches |
| 6 | dfr-06-fat.dd | FAT | 0 matches |

## Methodology

Each disk image was scanned using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset (~4,000 rules). The audit tool confirmed that `yara_scan_files` was executed against all six evidence items.

## Case Questions

Case Q1: All six disk images were scanned with YARA (using the Neo23x0/signature-base ruleset): **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits across the board.