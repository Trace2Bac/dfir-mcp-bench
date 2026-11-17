Both images have been scanned with `yara_scan_files`. The audit confirms coverage is complete for YARA on both disk images. Here is the final report.

---

# Forensic Report — Case `nist-dfr-yara-scan`

**Examiner:** [examiner]  
**Date:** 2026-11-17  
**Evidence path:** `/evidence/nist-cftt-dfr`

## Evidence Inventory

| Image | Filesystem | Size | SHA-verified |
|---|---|---|---|
| `dfr-01-fat.dd` | FAT | 1.0 GB | Yes (at ingest) |
| `dfr-02-ntfs.dd` | NTFS | 1.0 GB | Yes (at ingest) |

## YARA Scan Results

Both disk images were scanned using the built-in Neo23x0/signature-base YARA ruleset (~4,000 rules).

| Image | Rules Matched | Families Detected |
|---|---|---|
| `dfr-01-fat.dd` | 0 | 0 |
| `dfr-02-ntfs.dd` | 0 | 0 |

Neither image triggered any YARA rule.

## Tool Coverage

The audit confirms `yara_scan_files` was executed on both disk images. Other disk-analysis tools (fls, bulk_extractor, mmls, plaso, steganography detection, optical listing) were not run as they fall outside the scope of this YARA-only scan request.

## Case Questions

Case Q1: Both disk images in the evidence directory were scanned with `yara_scan_files`: **dfr-01-fat.dd** (FAT, 1.0 GB) and **dfr-02-ntfs.dd** (NTFS, 1.0 GB). No YARA rules matched on either image — zero hits, zero malware families detected across the entire Neo23x0/signature-base ruleset.