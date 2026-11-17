All six images now show `yara_scan_files` in their `tools_run` list. Here is the final report.

---

# Forensic Report — Case `nist-dfr-six-yara`

**Case ID:** nist-dfr-six-yara  
**Evidence Path:** /evidence/nist-cftt-dfr-six  
**Examiner:** [examiner]  
**Date:** 2026-11-17  

## Evidence Inventory

| # | Image File | Filesystem | Size |
|---|-----------|------------|------|
| 1 | dfr-01-fat.dd | FAT | 1.0 GB |
| 2 | dfr-02-ntfs.dd | NTFS | 1.0 GB |
| 3 | dfr-03-ntfs.dd | NTFS | 1.0 GB |
| 4 | dfr-04-fat.dd | FAT | 1.0 GB |
| 5 | dfr-05-ntfs.dd | NTFS | 1.0 GB |
| 6 | dfr-06-fat.dd | FAT | 1.0 GB |

## YARA Scan Results

Each disk image was scanned using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset (~4,000 rules). Results per image:

| Image | YARA Hits | Unique Families |
|-------|-----------|-----------------|
| dfr-01-fat.dd | 0 | 0 |
| dfr-02-ntfs.dd | 0 | 0 |
| dfr-03-ntfs.dd | 0 | 0 |
| dfr-04-fat.dd | 0 | 0 |
| dfr-05-ntfs.dd | 0 | 0 |
| dfr-06-fat.dd | 0 | 0 |

**No YARA rules matched on any of the six disk images.**

## Tool Coverage

`yara_scan_files` was successfully run on all six evidence items. The remaining applicable tools (run_fls, run_bulk_extractor, run_mmls, run_plaso, detect_steganography, run_optical_listing) were not run because they are outside the scope of this YARA-only scan assignment.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the built-in Neo23x0/signature-base ruleset. The images scanned are: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits across all scans.