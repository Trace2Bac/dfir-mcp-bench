All six disk images confirm `yara_scan_files` in their `tools_run` list. Here is the final report.

---

# Forensic Report — Case nist-dfr-six-yara

**Case ID:** nist-dfr-six-yara  
**Evidence Path:** /evidence/nist-cftt-dfr-six  
**Date:** 2026-11-17  
**Examiner:** Digital Forensic Examiner

## Evidence Summary

Six removable-drive disk images (raw `.dd` format, each 1.0 GB) were provided for YARA scanning:

| # | Image File | Filesystem | YARA Scan Result |
|---|-----------|------------|-----------------|
| 1 | dfr-01-fat.dd | FAT | 0 hits |
| 2 | dfr-02-ntfs.dd | NTFS | 0 hits |
| 3 | dfr-03-ntfs.dd | NTFS | 0 hits |
| 4 | dfr-04-fat.dd | FAT | 0 hits |
| 5 | dfr-05-ntfs.dd | NTFS | 0 hits |
| 6 | dfr-06-fat.dd | FAT | 0 hits |

## Methodology

Each disk image was individually scanned using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset (~4,000 rules). The `audit_tool_coverage` function confirmed that `yara_scan_files` was executed against all six evidence items.

## Findings

No YARA rules matched on any of the six disk images. Zero unique malware families were identified. Zero total hits were recorded across all scans.

## Tools Not Run (Out of Scope)

The following applicable disk-image tools were not run because they fall outside the scope of this YARA-only scan request: `run_fls`, `run_bulk_extractor`, `run_mmls`, `run_plaso`, `detect_steganography`, `run_optical_listing`.

---

## Case Questions

**Case Q1:** All six disk images were scanned with `yara_scan_files` using the built-in Neo23x0/signature-base ruleset. The images scanned were: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — there were zero hits total across all scans.