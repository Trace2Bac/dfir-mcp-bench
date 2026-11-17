The audit confirms `yara_scan_files` has been run on all six disk images. The remaining unrun tools (run_fls, run_bulk_extractor, etc.) are outside the scope of this YARA-only task.

---

# Final Report — Case nist-dfr-six-yara

## Summary

Six removable-drive disk images in `/evidence/nist-cftt-dfr-six` were scanned using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset (~4,000 YARA rules). No rules matched on any image.

## Images Scanned

| # | Image File | Filesystem | YARA Hits |
|---|------------|------------|-----------|
| 1 | dfr-01-fat.dd | FAT | 0 |
| 2 | dfr-02-ntfs.dd | NTFS | 0 |
| 3 | dfr-03-ntfs.dd | NTFS | 0 |
| 4 | dfr-04-fat.dd | FAT | 0 |
| 5 | dfr-05-ntfs.dd | NTFS | 0 |
| 6 | dfr-06-fat.dd | FAT | 0 |

## Tool Coverage

The `audit_tool_coverage` check confirms `yara_scan_files` was executed against all six evidence items. No YARA scan was missed.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the built-in Neo23x0/signature-base YARA ruleset: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rule matched on any of the six images — zero hits across all scans.