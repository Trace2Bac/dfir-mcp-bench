`yara_scan_files` confirmed as run on both disk images. The remaining tools not run (fls, bulk_extractor, mmls, plaso, steganography, optical_listing) are outside the scope of this YARA-focused task.

---

# Final Report — Case nist-dfr-yara-scan

## Evidence Examined

| Image | Type | Size |
|---|---|---|
| `dfr-01-fat.dd` | Disk image (FAT filesystem) | 1.0 GB |
| `dfr-02-ntfs.dd` | Disk image (NTFS filesystem) | 1.0 GB |

## YARA Scan Results

Both disk images were scanned using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset (~4,000 rules).

- **dfr-01-fat.dd**: 0 YARA rule matches. No malware signatures, suspicious patterns, or known threat indicators detected.
- **dfr-02-ntfs.dd**: 0 YARA rule matches. No malware signatures, suspicious patterns, or known threat indicators detected.

## Tools Not Run (Out of Scope)

The following applicable disk tools were not run, as the task scope was limited to YARA scanning: `run_fls`, `run_bulk_extractor`, `run_mmls`, `run_plaso`, `detect_steganography`, `run_optical_listing`.

## Case Questions

Case Q1: Both disk images in the evidence directory were scanned with `yara_scan_files` using the built-in signature-base ruleset. The images scanned were **dfr-01-fat.dd** (FAT filesystem, 1.0 GB) and **dfr-02-ntfs.dd** (NTFS filesystem, 1.0 GB). No YARA rules matched on either image — zero hits across both scans, with no malware families or suspicious patterns detected.