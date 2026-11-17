Confirmed: zero YARA matches across all images. All 6 disk images have been scanned and the audit confirms full coverage. Here is the final report.

---

# Forensic Report — Case nist-dfr-six-yara

**Case ID:** nist-dfr-six-yara  
**Evidence Path:** /evidence/nist-cftt-dfr-six  
**Date:** 2026-11-17  
**Examiner:** Digital Forensic Examiner

## Evidence Summary

Six removable-drive disk images (raw .dd format), each 1.0 GB:

| Image | Filesystem |
|---|---|
| dfr-01-fat.dd | FAT |
| dfr-02-ntfs.dd | NTFS |
| dfr-03-ntfs.dd | NTFS |
| dfr-04-fat.dd | FAT |
| dfr-05-ntfs.dd | NTFS |
| dfr-06-fat.dd | FAT |

## YARA Scan Results

All six disk images were scanned using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset (~4,000 rules). Results per image:

| Image | YARA Rules Matched | Hits |
|---|---|---|
| dfr-01-fat.dd | 0 | 0 |
| dfr-02-ntfs.dd | 0 | 0 |
| dfr-03-ntfs.dd | 0 | 0 |
| dfr-04-fat.dd | 0 | 0 |
| dfr-05-ntfs.dd | 0 | 0 |
| dfr-06-fat.dd | 0 | 0 |

**Total YARA hits across all images: 0**

Tool coverage audit confirmed `yara_scan_files` was executed against every disk image in the evidence set.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the built-in Neo23x0/signature-base YARA ruleset: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits total.