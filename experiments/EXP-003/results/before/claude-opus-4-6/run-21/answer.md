All 6 disk images have been scanned with YARA (confirmed by audit_tool_coverage), and zero rules matched across any image. Here is the final report.

---

# Digital Forensic Report — Case nist-dfr-six-yara

**Case ID:** nist-dfr-six-yara  
**Evidence Path:** /evidence/nist-cftt-dfr-six  
**Date:** 2026-11-17  
**Examiner:** [examiner]

## Evidence Summary

Six raw disk images were provided for analysis, all from removable drives:

| # | Image File | Filesystem | Size |
|---|------------|------------|------|
| 1 | dfr-01-fat.dd | FAT | 1.0 GB |
| 2 | dfr-02-ntfs.dd | NTFS | 1.0 GB |
| 3 | dfr-03-ntfs.dd | NTFS | 1.0 GB |
| 4 | dfr-04-fat.dd | FAT | 1.0 GB |
| 5 | dfr-05-ntfs.dd | NTFS | 1.0 GB |
| 6 | dfr-06-fat.dd | FAT | 1.0 GB |

## YARA Scan Results

All six disk images were scanned using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset (~4,000 rules). The scan completed successfully on every image.

**Total YARA rule matches across all six images: 0**

No malware signatures, suspicious patterns, or indicator-of-compromise rules fired on any of the six disk images.

## Tool Coverage

`audit_tool_coverage` confirmed that `yara_scan_files` was executed against all six evidence items. Other applicable disk-analysis tools (run_fls, run_bulk_extractor, run_mmls, run_plaso, detect_steganography, run_optical_listing) were intentionally not run as they fall outside the scope of this YARA-focused assignment.

## Case Questions

Case Q1: All six disk images were scanned with yara_scan_files using the built-in Neo23x0/signature-base ruleset. The images scanned were: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits total.