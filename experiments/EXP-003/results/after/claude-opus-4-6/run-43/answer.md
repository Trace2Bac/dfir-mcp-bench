The audit confirms `yara_scan_files` has been run on all six disk images. Here is the final report.

---

# Forensic Report — Case nist-dfr-six-yara

**Case ID:** nist-dfr-six-yara  
**Evidence Path:** /evidence/nist-cftt-dfr-six  
**Date:** 2026-11-17  
**Examiner:** Digital Forensic Examiner

## Evidence Inventory

| # | Image File | Filesystem | Size |
|---|------------|-----------|------|
| 1 | dfr-01-fat.dd | FAT | 1.0 GB |
| 2 | dfr-02-ntfs.dd | NTFS | 1.0 GB |
| 3 | dfr-03-ntfs.dd | NTFS | 1.0 GB |
| 4 | dfr-04-fat.dd | FAT | 1.0 GB |
| 5 | dfr-05-ntfs.dd | NTFS | 1.0 GB |
| 6 | dfr-06-fat.dd | FAT | 1.0 GB |

## YARA Scan Results

Each disk image was scanned using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset (~4,000 rules). Results per image:

| Image | YARA Hits | Matched Families |
|-------|-----------|-----------------|
| dfr-01-fat.dd | 0 | None |
| dfr-02-ntfs.dd | 0 | None |
| dfr-03-ntfs.dd | 0 | None |
| dfr-04-fat.dd | 0 | None |
| dfr-05-ntfs.dd | 0 | None |
| dfr-06-fat.dd | 0 | None |

## Tool Coverage

The `audit_tool_coverage` check confirms `yara_scan_files` was executed on all six disk images. Other disk-forensic tools (file listing, bulk_extractor, partition mapping, timeline, steganography detection, optical listing) were not run as they were outside the scope of this YARA-only scan request.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the built-in Neo23x0/signature-base ruleset: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits across all scans.