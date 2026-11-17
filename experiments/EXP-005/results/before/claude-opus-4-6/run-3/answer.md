Both images have been scanned with `yara_scan_files`. The remaining tools (`run_fls`, `run_bulk_extractor`, `run_mmls`, `run_plaso`, `detect_steganography`, `run_optical_listing`) are not required for this investigation, which is scoped to YARA scanning only.

---

# Forensic Report — Case `nist-dfr-yara-scan`

## Evidence Summary

| Image | Filesystem | Size | Location |
|---|---|---|---|
| `dfr-01-fat.dd` | FAT | 1.0 GB | `/evidence/nist-cftt-dfr/` |
| `dfr-02-ntfs.dd` | NTFS | 1.0 GB | `/evidence/nist-cftt-dfr/` |

## YARA Scan Results

Both disk images were scanned using the built-in Neo23x0/signature-base YARA ruleset (~4,000 rules).

| Image | YARA Hits | Unique Families |
|---|---|---|
| `dfr-01-fat.dd` | 0 | 0 |
| `dfr-02-ntfs.dd` | 0 | 0 |

Neither image triggered any YARA rule matches.

## Tools Not Run (Justification)

The following tools were available but not executed because they fall outside the scope of this YARA-only investigation: `run_fls`, `run_bulk_extractor`, `run_mmls`, `run_plaso`, `detect_steganography`, `run_optical_listing`.

## Case Questions

Case Q1: Both disk images in `/evidence/nist-cftt-dfr` were scanned with `yara_scan_files` using the built-in Neo23x0/signature-base ruleset. The images scanned were **dfr-01-fat.dd** (FAT filesystem, 1.0 GB) and **dfr-02-ntfs.dd** (NTFS filesystem, 1.0 GB). **No YARA rules matched on either image** — both scans returned zero hits and zero unique malware families.