All six disk images show `yara_scan_files` in their `tools_run` list. Here is the final report.

---

# Forensic Report — Case nist-dfr-six-yara

**Case ID:** nist-dfr-six-yara  
**Evidence Path:** /evidence/nist-cftt-dfr-six  
**Date:** 2026-11-17  
**Examiner:** Digital Forensic Examiner ([examiner])

## Evidence Summary

Six removable-drive disk images (1 GB each) were presented for YARA scanning:

| # | Image File | Filesystem | YARA Result |
|---|------------|------------|-------------|
| 1 | dfr-01-fat.dd | FAT | 0 matches |
| 2 | dfr-02-ntfs.dd | NTFS | 0 matches |
| 3 | dfr-03-ntfs.dd | NTFS | 0 matches |
| 4 | dfr-04-fat.dd | FAT | 0 matches |
| 5 | dfr-05-ntfs.dd | NTFS | 0 matches |
| 6 | dfr-06-fat.dd | FAT | 0 matches |

All scans used the built-in Neo23x0/signature-base ruleset (~4,000 rules). Audit tool coverage confirms `yara_scan_files` was executed on every image.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the built-in Neo23x0/signature-base YARA ruleset: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits across all scans (0 total hits, 0 unique families).