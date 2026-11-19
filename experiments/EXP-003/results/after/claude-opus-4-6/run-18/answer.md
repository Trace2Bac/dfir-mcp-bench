The audit confirms `yara_scan_files` has been run on all 6 disk images. Here is the final report.

---

# Final Report — Case nist-dfr-six-yara

## Evidence Summary

Six removable-drive disk images were provided for analysis at `/evidence/nist-cftt-dfr-six`:

| Image | Filesystem | Size |
|---|---|---|
| dfr-01-fat.dd | FAT | 1.0 GB |
| dfr-02-ntfs.dd | NTFS | 1.0 GB |
| dfr-03-ntfs.dd | NTFS | 1.0 GB |
| dfr-04-fat.dd | FAT | 1.0 GB |
| dfr-05-ntfs.dd | NTFS | 1.0 GB |
| dfr-06-fat.dd | FAT | 1.0 GB |

## YARA Scan Results

Each image was scanned using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset (~4,000 rules). Results:

| Image | YARA Hits | Unique Families |
|---|---|---|
| dfr-01-fat.dd | 0 | 0 |
| dfr-02-ntfs.dd | 0 | 0 |
| dfr-03-ntfs.dd | 0 | 0 |
| dfr-04-fat.dd | 0 | 0 |
| dfr-05-ntfs.dd | 0 | 0 |
| dfr-06-fat.dd | 0 | 0 |

Tool coverage audit confirms `yara_scan_files` was executed against every disk image in the case.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the built-in Neo23x0/signature-base YARA ruleset: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits across all scans.