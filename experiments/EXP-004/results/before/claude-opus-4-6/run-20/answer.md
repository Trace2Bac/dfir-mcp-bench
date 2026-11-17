The audit confirms `yara_scan_files` has been run on all six disk images, and no other tools are needed for this case's scope. Here is the final report.

---

# Forensic Investigation Report — Case nist-dfr-six-yara

## Evidence Summary

Six raw disk images were acquired from removable drives and presented for YARA scanning:

| # | Image File | Filesystem | Size |
|---|-----------|------------|------|
| 1 | dfr-01-fat.dd | FAT | 1.0 GB |
| 2 | dfr-02-ntfs.dd | NTFS | 1.0 GB |
| 3 | dfr-03-ntfs.dd | NTFS | 1.0 GB |
| 4 | dfr-04-fat.dd | FAT | 1.0 GB |
| 5 | dfr-05-ntfs.dd | NTFS | 1.0 GB |
| 6 | dfr-06-fat.dd | FAT | 1.0 GB |

## YARA Scan Results

Each image was scanned using the built-in Neo23x0/signature-base YARA ruleset (~4,000 rules). All six scans completed successfully with **zero matches** across all images.

| Image | YARA Hits | Unique Families |
|-------|-----------|-----------------|
| dfr-01-fat.dd | 0 | 0 |
| dfr-02-ntfs.dd | 0 | 0 |
| dfr-03-ntfs.dd | 0 | 0 |
| dfr-04-fat.dd | 0 | 0 |
| dfr-05-ntfs.dd | 0 | 0 |
| dfr-06-fat.dd | 0 | 0 |

## Tool Coverage

The `audit_tool_coverage` check confirms `yara_scan_files` was executed against all six evidence items. Other applicable disk tools (fls, bulk_extractor, mmls, plaso, etc.) were not run as they fall outside the scope of this YARA-only scan request.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the built-in Neo23x0/signature-base ruleset: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits total across all scans.