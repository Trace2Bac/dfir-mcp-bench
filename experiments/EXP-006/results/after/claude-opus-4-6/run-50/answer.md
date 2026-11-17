The audit confirms `yara_scan_files` was run on all six disk images. The remaining tools (fls, bulk_extractor, mmls, plaso, steganography, optical listing) are not required for this case — the assignment only asks for YARA scanning.

---

# Digital Forensic Report — Case nist-dfr-six-yara

**Case ID:** nist-dfr-six-yara  
**Evidence Path:** /evidence/nist-cftt-dfr-six  
**Date:** 2026-11-17  
**Examiner:** [examiner]

## Evidence Inventory

Six removable-drive disk images (each 1.0 GB):

| # | Image File | Filesystem |
|---|-----------|------------|
| 1 | dfr-01-fat.dd | FAT |
| 2 | dfr-02-ntfs.dd | NTFS |
| 3 | dfr-03-ntfs.dd | NTFS |
| 4 | dfr-04-fat.dd | FAT |
| 5 | dfr-05-ntfs.dd | NTFS |
| 6 | dfr-06-fat.dd | FAT |

## Analysis Performed

Each disk image was scanned with `yara_scan_files` using the built-in Neo23x0/signature-base ruleset (~4,000 rules). All scans completed successfully.

### YARA Scan Results

| Image | Rules Matched | Unique Families |
|-------|--------------|-----------------|
| dfr-01-fat.dd | 0 | 0 |
| dfr-02-ntfs.dd | 0 | 0 |
| dfr-03-ntfs.dd | 0 | 0 |
| dfr-04-fat.dd | 0 | 0 |
| dfr-05-ntfs.dd | 0 | 0 |
| dfr-06-fat.dd | 0 | 0 |

No YARA rule matched any content on any of the six disk images.

## Tool Coverage

The audit confirms `yara_scan_files` was executed against all six evidence items. Other applicable disk-forensic tools (fls, bulk_extractor, mmls, plaso, steganography detection, optical listing) were not run because they fall outside the scope of this YARA-only scan assignment.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the built-in Neo23x0/signature-base ruleset: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits across all scans.