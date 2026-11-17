All six images confirm `yara_scan_files` in their `tools_run` list. Here is the final report.

---

# Forensic Report — Case nist-dfr-six-yara

## Evidence Inventory

| # | Image File | Filesystem | Size |
|---|-----------|------------|------|
| 1 | dfr-01-fat.dd | FAT | 1.0 GB |
| 2 | dfr-02-ntfs.dd | NTFS | 1.0 GB |
| 3 | dfr-03-ntfs.dd | NTFS | 1.0 GB |
| 4 | dfr-04-fat.dd | FAT | 1.0 GB |
| 5 | dfr-05-ntfs.dd | NTFS | 1.0 GB |
| 6 | dfr-06-fat.dd | FAT | 1.0 GB |

## YARA Scan Summary

Each disk image was scanned individually using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset (~4,000 rules). Results:

| Image | YARA Hits | Matched Families |
|-------|-----------|------------------|
| dfr-01-fat.dd | 0 | None |
| dfr-02-ntfs.dd | 0 | None |
| dfr-03-ntfs.dd | 0 | None |
| dfr-04-fat.dd | 0 | None |
| dfr-05-ntfs.dd | 0 | None |
| dfr-06-fat.dd | 0 | None |

Tool coverage audit confirms `yara_scan_files` was executed against all six images. No other tools (filesystem listing, bulk_extractor, plaso, etc.) were run because the assignment was scoped exclusively to YARA scanning.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the built-in Neo23x0/signature-base YARA ruleset. The images scanned are: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — every scan returned 0 hits and 0 unique malware families.