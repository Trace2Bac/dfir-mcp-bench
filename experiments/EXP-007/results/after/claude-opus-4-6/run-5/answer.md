All six images have `yara_scan_files` in their `tools_run` list. Here is the final report.

---

# Forensic Report — Case nist-dfr-six-yara

## Evidence Summary

| # | Image File | Filesystem | Size | YARA Result |
|---|------------|-----------|------|-------------|
| 1 | dfr-01-fat.dd | FAT | 1.0 GB | 0 matches |
| 2 | dfr-02-ntfs.dd | NTFS | 1.0 GB | 0 matches |
| 3 | dfr-03-ntfs.dd | NTFS | 1.0 GB | 0 matches |
| 4 | dfr-04-fat.dd | FAT | 1.0 GB | 0 matches |
| 5 | dfr-05-ntfs.dd | NTFS | 1.0 GB | 0 matches |
| 6 | dfr-06-fat.dd | FAT | 1.0 GB | 0 matches |

## Methodology

Each disk image was scanned individually using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset (~4,000 rules). After each scan, `audit_tool_coverage` was called to confirm which images had been scanned and to select the next unscanned image. A final coverage audit confirmed that all six images have `yara_scan_files` recorded in their `tools_run` list.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files`: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — every scan returned 0 hits, 0 unique families, and no family names. The images are clean with respect to the Neo23x0/signature-base ruleset.