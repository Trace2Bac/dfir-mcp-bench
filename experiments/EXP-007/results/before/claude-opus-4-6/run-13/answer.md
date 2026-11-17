All six images confirm `yara_scan_files` as run. The remaining tools (fls, bulk_extractor, mmls, plaso, steganography, optical listing) are not required for this case — the briefing only asks for YARA scanning.

---

# Forensic Report — Case nist-dfr-six-yara

**Case ID:** nist-dfr-six-yara
**Evidence Path:** /evidence/nist-cftt-dfr-six
**Date:** 2026-11-17
**Examiner:** Digital Forensic Examiner

## Evidence Inventory

Six removable-drive disk images (all 1.0 GB raw `.dd` format):

| # | Image File | Filesystem |
|---|-----------|------------|
| 1 | dfr-01-fat.dd | FAT |
| 2 | dfr-02-ntfs.dd | NTFS |
| 3 | dfr-03-ntfs.dd | NTFS |
| 4 | dfr-04-fat.dd | FAT |
| 5 | dfr-05-ntfs.dd | NTFS |
| 6 | dfr-06-fat.dd | FAT |

## Analysis Performed

Each of the six disk images was individually scanned using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset (~4,000 rules). The audit log confirms `yara_scan_files` was executed against every evidence item.

## YARA Scan Results

| Image | YARA Hits | Matched Rules |
|-------|-----------|---------------|
| dfr-01-fat.dd | 0 | None |
| dfr-02-ntfs.dd | 0 | None |
| dfr-03-ntfs.dd | 0 | None |
| dfr-04-fat.dd | 0 | None |
| dfr-05-ntfs.dd | 0 | None |
| dfr-06-fat.dd | 0 | None |

No YARA rules matched any content in any of the six disk images.

## Tools Not Run (Justification)

The following tools were applicable to disk images but not executed because the case briefing scope was limited to YARA scanning: `run_fls`, `run_bulk_extractor`, `run_mmls`, `run_plaso`, `detect_steganography`, `run_optical_listing`.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the built-in Neo23x0/signature-base ruleset. The images scanned were: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits across all scans.