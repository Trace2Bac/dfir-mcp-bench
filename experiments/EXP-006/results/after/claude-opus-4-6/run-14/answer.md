The audit confirms `yara_scan_files` was run on all six disk images. The remaining unrun tools (run_fls, run_bulk_extractor, etc.) are not required for this YARA-only scanning assignment.

---

# Final Report — Case nist-dfr-six-yara

## Case Summary

Six removable-drive disk images located at `/evidence/nist-cftt-dfr-six` were scanned using the `yara_scan_files` tool with the built-in Neo23x0/signature-base ruleset (~4,000 YARA rules).

## YARA Scan Results

| Disk Image | Filesystem | YARA Hits | Rules Matched |
|---|---|---|---|
| dfr-01-fat.dd | FAT | 0 | None |
| dfr-02-ntfs.dd | NTFS | 0 | None |
| dfr-03-ntfs.dd | NTFS | 0 | None |
| dfr-04-fat.dd | FAT | 0 | None |
| dfr-05-ntfs.dd | NTFS | 0 | None |
| dfr-06-fat.dd | FAT | 0 | None |

## Tool Coverage

The `audit_tool_coverage` check confirms `yara_scan_files` was executed against all six evidence items. No images were missed.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the built-in Neo23x0/signature-base YARA ruleset: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits across all scans.