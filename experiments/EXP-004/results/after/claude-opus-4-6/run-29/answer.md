All six disk images show `yara_scan_files` in their `tools_run` list. Here is the final report.

---

# Forensic Report — Case nist-dfr-six-yara

## Evidence Summary

Six removable-drive disk images were provided at `/evidence/nist-cftt-dfr-six`:

| Image | Filesystem | Size | YARA Scan Result |
|---|---|---|---|
| dfr-01-fat.dd | FAT | 1.0 GB | 0 hits |
| dfr-02-ntfs.dd | NTFS | 1.0 GB | 0 hits |
| dfr-03-ntfs.dd | NTFS | 1.0 GB | 0 hits |
| dfr-04-fat.dd | FAT | 1.0 GB | 0 hits |
| dfr-05-ntfs.dd | NTFS | 1.0 GB | 0 hits |
| dfr-06-fat.dd | FAT | 1.0 GB | 0 hits |

Each image was scanned using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset (~4,000 rules). Tool coverage was confirmed via `audit_tool_coverage`, which shows `yara_scan_files` executed on every disk image.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files`: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — every scan returned 0 hits, 0 unique families.