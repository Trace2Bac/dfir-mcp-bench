The audit confirms `yara_scan_files` was run on all six disk images. The remaining gaps (fls, bulk_extractor, etc.) are outside the scope of this YARA-only task.

---

# Forensic Report — Case nist-dfr-six-yara

**Case ID:** nist-dfr-six-yara  
**Evidence Path:** /evidence/nist-cftt-dfr-six  
**Date:** 2026-11-17  
**Examiner:** Digital Forensic Examiner ([examiner])

## Evidence Summary

Six raw disk images acquired from removable drives:

| Image | Filesystem | Size |
|---|---|---|
| dfr-01-fat.dd | FAT | 1.0 GB |
| dfr-02-ntfs.dd | NTFS | 1.0 GB |
| dfr-03-ntfs.dd | NTFS | 1.0 GB |
| dfr-04-fat.dd | FAT | 1.0 GB |
| dfr-05-ntfs.dd | NTFS | 1.0 GB |
| dfr-06-fat.dd | FAT | 1.0 GB |

## Analysis Performed

Each disk image was scanned with `yara_scan_files` using the built-in Neo23x0/signature-base ruleset (~4,000 rules). Results per image:

| Image | YARA Hits | Unique Families |
|---|---|---|
| dfr-01-fat.dd | 0 | 0 |
| dfr-02-ntfs.dd | 0 | 0 |
| dfr-03-ntfs.dd | 0 | 0 |
| dfr-04-fat.dd | 0 | 0 |
| dfr-05-ntfs.dd | 0 | 0 |
| dfr-06-fat.dd | 0 | 0 |

Tool coverage was audited and confirms `yara_scan_files` was executed against every disk image in the evidence set.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files`: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits across all scans.