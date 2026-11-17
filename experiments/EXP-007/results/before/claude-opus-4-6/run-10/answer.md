All six images confirm `yara_scan_files` has been run. The remaining tools not run (run_fls, run_bulk_extractor, etc.) are outside the scope of this YARA-focused task.

---

# Forensic Report — Case nist-dfr-six-yara

**Case ID:** nist-dfr-six-yara  
**Evidence Path:** /evidence/nist-cftt-dfr-six  
**Date:** 2026-11-17  
**Examiner:** Digital Forensic Analyst  

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

## Analysis Performed

Each of the six disk images was individually scanned using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset (~4,000 rules). The scans were performed sequentially, one image at a time, and tool coverage was audited after completion to confirm all images were processed.

## YARA Scan Results

| Image | YARA Hits | Matched Rules |
|-------|-----------|---------------|
| dfr-01-fat.dd | 0 | None |
| dfr-02-ntfs.dd | 0 | None |
| dfr-03-ntfs.dd | 0 | None |
| dfr-04-fat.dd | 0 | None |
| dfr-05-ntfs.dd | 0 | None |
| dfr-06-fat.dd | 0 | None |

No YARA rules matched on any of the six disk images.

## Tools Not Run (Out of Scope)

The following tools were available for disk images but were not run because the investigation scope was limited to YARA scanning: `run_fls`, `run_bulk_extractor`, `run_mmls`, `run_plaso`, `detect_steganography`, `run_optical_listing`.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the built-in Neo23x0/signature-base ruleset. The images scanned were: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits across all scans.