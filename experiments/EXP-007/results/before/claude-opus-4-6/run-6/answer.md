All six images have yara_scan_files confirmed as run. Here is the final report.

---

# Forensic Report — Case nist-dfr-six-yara

**Case ID:** nist-dfr-six-yara  
**Evidence Path:** /evidence/nist-cftt-dfr-six  
**Date:** 2026-11-17  
**Examiner:** Digital Forensic Examiner

## Evidence Summary

Six removable-drive disk images were provided for YARA scanning:

| # | Image File | Type | Size |
|---|-----------|------|------|
| 1 | dfr-01-fat.dd | FAT disk image | 1.0 GB |
| 2 | dfr-02-ntfs.dd | NTFS disk image | 1.0 GB |
| 3 | dfr-03-ntfs.dd | NTFS disk image | 1.0 GB |
| 4 | dfr-04-fat.dd | FAT disk image | 1.0 GB |
| 5 | dfr-05-ntfs.dd | NTFS disk image | 1.0 GB |
| 6 | dfr-06-fat.dd | FAT disk image | 1.0 GB |

## YARA Scan Results

Each of the six disk images was individually scanned using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset (~4,000 rules). Every scan returned **0 hits** — no YARA rules matched any content in any of the six images.

| Image | YARA Hits | Unique Families |
|-------|-----------|-----------------|
| dfr-01-fat.dd | 0 | 0 |
| dfr-02-ntfs.dd | 0 | 0 |
| dfr-03-ntfs.dd | 0 | 0 |
| dfr-04-fat.dd | 0 | 0 |
| dfr-05-ntfs.dd | 0 | 0 |
| dfr-06-fat.dd | 0 | 0 |

## Tool Coverage

The final audit confirms `yara_scan_files` was executed on all six evidence items. Other disk-forensic tools (file listing, bulk_extractor, partition mapping, timeline, steganography detection, optical listing) were not run as they were outside the scope of this YARA-only engagement.

## Case Questions

Case Q1: All six disk images were scanned with yara_scan_files using the built-in Neo23x0/signature-base ruleset: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — every scan returned zero hits.