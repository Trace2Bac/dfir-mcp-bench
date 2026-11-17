Coverage confirmed: `yara_scan_files` has been run on all 6 disk images. Here is the final report.

---

# Forensic Investigation Report — Case nist-dfr-six-yara

## Evidence Summary

Six removable-drive disk images were provided for YARA scanning:

| # | Image File | Filesystem | Size | YARA Result |
|---|------------|------------|------|-------------|
| 1 | dfr-01-fat.dd | FAT | 1.0 GB | 0 matches |
| 2 | dfr-02-ntfs.dd | NTFS | 1.0 GB | 0 matches |
| 3 | dfr-03-ntfs.dd | NTFS | 1.0 GB | 0 matches |
| 4 | dfr-04-fat.dd | FAT | 1.0 GB | 0 matches |
| 5 | dfr-05-ntfs.dd | NTFS | 1.0 GB | 0 matches |
| 6 | dfr-06-fat.dd | FAT | 1.0 GB | 0 matches |

All scans used the built-in Neo23x0/signature-base YARA ruleset (~4,000 rules). Each image was scanned individually and returned zero hits.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the built-in Neo23x0/signature-base ruleset: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits across all scans.