All six images confirmed scanned with YARA. The remaining tools (run_fls, run_bulk_extractor, etc.) are not needed for this case — the task only requires YARA scanning.

---

# Forensic Report — Case nist-dfr-six-yara

## Case Summary

Six removable-drive disk images from the NIST CFTT DFR dataset were scanned with YARA rules (Neo23x0/signature-base ruleset, ~4,000 rules) to check for malware or suspicious content. All scans completed successfully with zero rule matches across all images.

## Evidence Inventory

| # | Image File | Filesystem | Size | YARA Result |
|---|-----------|------------|------|-------------|
| 1 | dfr-01-fat.dd | FAT | 1.0 GB | 0 matches |
| 2 | dfr-02-ntfs.dd | NTFS | 1.0 GB | 0 matches |
| 3 | dfr-03-ntfs.dd | NTFS | 1.0 GB | 0 matches |
| 4 | dfr-04-fat.dd | FAT | 1.0 GB | 0 matches |
| 5 | dfr-05-ntfs.dd | NTFS | 1.0 GB | 0 matches |
| 6 | dfr-06-fat.dd | FAT | 1.0 GB | 0 matches |

## Tools Used

- **yara_scan_files** — Run individually against each of the six disk images using the built-in Neo23x0/signature-base ruleset.

## Tools Not Run (Justification)

The following tools were identified as applicable to disk images but were intentionally skipped because the case scope was limited to YARA scanning only: `run_fls`, `run_bulk_extractor`, `run_mmls`, `run_plaso`, `detect_steganography`, `run_optical_listing`.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the built-in Neo23x0/signature-base ruleset (~4,000 rules). The images scanned were: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits total across all scans.