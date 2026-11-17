All six images have `yara_scan_files` confirmed as run. The remaining tools not run (fls, bulk_extractor, mmls, plaso, steganography, optical listing) are outside the scope of this YARA-only investigation.

---

# Forensic Report — Case nist-dfr-six-yara

## Case Summary

Six removable-drive disk images from `/evidence/nist-cftt-dfr-six` were scanned with the built-in YARA ruleset (Neo23x0/signature-base, ~4,000 rules) to check for known malware signatures or suspicious indicators.

## Evidence Inventory

| # | Image File | Filesystem | Size |
|---|------------|------------|------|
| 1 | dfr-01-fat.dd | FAT | 1.0 GB |
| 2 | dfr-02-ntfs.dd | NTFS | 1.0 GB |
| 3 | dfr-03-ntfs.dd | NTFS | 1.0 GB |
| 4 | dfr-04-fat.dd | FAT | 1.0 GB |
| 5 | dfr-05-ntfs.dd | NTFS | 1.0 GB |
| 6 | dfr-06-fat.dd | FAT | 1.0 GB |

## YARA Scan Results

Each image was individually scanned with `yara_scan_files` using the default Neo23x0/signature-base ruleset. All six scans returned **0 hits** — no YARA rules matched any content in any of the six disk images.

| Image | YARA Hits | Matched Families |
|-------|-----------|------------------|
| dfr-01-fat.dd | 0 | None |
| dfr-02-ntfs.dd | 0 | None |
| dfr-03-ntfs.dd | 0 | None |
| dfr-04-fat.dd | 0 | None |
| dfr-05-ntfs.dd | 0 | None |
| dfr-06-fat.dd | 0 | None |

## Tools Not Run (Out of Scope)

The following applicable disk-image tools were intentionally skipped because the investigation was scoped exclusively to YARA scanning: `run_fls`, `run_bulk_extractor`, `run_mmls`, `run_plaso`, `detect_steganography`, `run_optical_listing`.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the Neo23x0/signature-base ruleset: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits across all scans.