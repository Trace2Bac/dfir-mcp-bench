All six disk images confirmed as scanned with yara_scan_files. Here is the final report.

---

# Forensic Investigation Report — Case nist-dfr-six-yara

**Case ID:** nist-dfr-six-yara
**Date:** 2026-11-17
**Evidence Location:** /evidence/nist-cftt-dfr-six
**Examiner:** Digital Forensic Examiner

## Evidence Inventory

Six removable-drive disk images (each 1.0 GB raw dd):

| Image | Filesystem |
|---|---|
| dfr-01-fat.dd | FAT |
| dfr-02-ntfs.dd | NTFS |
| dfr-03-ntfs.dd | NTFS |
| dfr-04-fat.dd | FAT |
| dfr-05-ntfs.dd | NTFS |
| dfr-06-fat.dd | FAT |

## Analysis Performed

Each disk image was scanned individually with `yara_scan_files` using the Neo23x0/signature-base builtin ruleset (~4,000 rules). The audit_tool_coverage report confirms yara_scan_files was executed against all six images.

### YARA Scan Results

| Image | YARA Hits | Matched Rules |
|---|---|---|
| dfr-01-fat.dd | 0 | None |
| dfr-02-ntfs.dd | 0 | None |
| dfr-03-ntfs.dd | 0 | None |
| dfr-04-fat.dd | 0 | None |
| dfr-05-ntfs.dd | 0 | None |
| dfr-06-fat.dd | 0 | None |

## Case Questions

Case Q1: All six disk images were scanned with yara_scan_files using the Neo23x0/signature-base ruleset: dfr-01-fat.dd, dfr-02-ntfs.dd, dfr-03-ntfs.dd, dfr-04-fat.dd, dfr-05-ntfs.dd, and dfr-06-fat.dd. No YARA rules matched on any of the six images — zero hits total across all scans.