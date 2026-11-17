The audit confirms `yara_scan_files` was run on all six disk images. Here is the final report.

---

# Digital Forensic Report — Case nist-dfr-six-yara

**Case ID:** nist-dfr-six-yara  
**Evidence Path:** /evidence/nist-cftt-dfr-six  
**Date:** 2026-11-17  
**Examiner:** Digital Forensic Examiner

## Evidence Inventory

| # | Image File | Type | Size |
|---|-----------|------|------|
| 1 | dfr-01-fat.dd | disk_image (FAT) | 1.0 GB |
| 2 | dfr-02-ntfs.dd | disk_image (NTFS) | 1.0 GB |
| 3 | dfr-03-ntfs.dd | disk_image (NTFS) | 1.0 GB |
| 4 | dfr-04-fat.dd | disk_image (FAT) | 1.0 GB |
| 5 | dfr-05-ntfs.dd | disk_image (NTFS) | 1.0 GB |
| 6 | dfr-06-fat.dd | disk_image (FAT) | 1.0 GB |

## YARA Scan Results

Each disk image was scanned using the built-in Neo23x0/signature-base YARA ruleset (~4,000 rules). Results:

| Image | YARA Hits | Unique Families |
|-------|-----------|-----------------|
| dfr-01-fat.dd | 0 | 0 |
| dfr-02-ntfs.dd | 0 | 0 |
| dfr-03-ntfs.dd | 0 | 0 |
| dfr-04-fat.dd | 0 | 0 |
| dfr-05-ntfs.dd | 0 | 0 |
| dfr-06-fat.dd | 0 | 0 |

No YARA rules matched any content on any of the six disk images.

## Tool Coverage

The audit confirms `yara_scan_files` was executed against all six evidence items. Other applicable disk-image tools (fls, bulk_extractor, mmls, plaso, steganography detection, optical listing) were intentionally not run as the case scope was limited to YARA scanning.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the built-in Neo23x0/signature-base ruleset: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits across all scans.