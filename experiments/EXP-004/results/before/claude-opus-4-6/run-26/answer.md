The audit confirms `yara_scan_files` has been run on all six disk images. The remaining tools not run (fls, bulk_extractor, mmls, etc.) are outside the scope of this YARA-only task.

---

# Final Report — Case nist-dfr-six-yara

## Evidence Inventory

| # | Image | Filesystem | Size |
|---|-------|-----------|------|
| 1 | dfr-01-fat.dd | FAT | 1.0 GB |
| 2 | dfr-02-ntfs.dd | NTFS | 1.0 GB |
| 3 | dfr-03-ntfs.dd | NTFS | 1.0 GB |
| 4 | dfr-04-fat.dd | FAT | 1.0 GB |
| 5 | dfr-05-ntfs.dd | NTFS | 1.0 GB |
| 6 | dfr-06-fat.dd | FAT | 1.0 GB |

## YARA Scan Results

All six disk images were scanned using the built-in Neo23x0/signature-base YARA ruleset (~4,000 rules). Every scan completed successfully with **zero matches** across all images.

| Image | YARA Hits | Unique Families |
|-------|-----------|-----------------|
| dfr-01-fat.dd | 0 | 0 |
| dfr-02-ntfs.dd | 0 | 0 |
| dfr-03-ntfs.dd | 0 | 0 |
| dfr-04-fat.dd | 0 | 0 |
| dfr-05-ntfs.dd | 0 | 0 |
| dfr-06-fat.dd | 0 | 0 |

## Tool Coverage

The `audit_tool_coverage` check confirms `yara_scan_files` was executed on all six evidence items. Other applicable disk tools (fls, bulk_extractor, mmls, plaso, etc.) were not run as they fall outside the scope of this YARA scanning task.

## Case Questions

Case Q1: All six disk images in the evidence directory were scanned with `yara_scan_files` using the built-in Neo23x0/signature-base ruleset: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — all scans returned zero hits.