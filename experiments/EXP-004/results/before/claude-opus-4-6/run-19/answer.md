The audit confirms `yara_scan_files` has been run on all six disk images, with zero YARA rule matches across the board.

---

# Final Report — Case nist-dfr-six-yara

## Evidence Inventory

| # | Image File | Filesystem | Size |
|---|-----------|------------|------|
| 1 | dfr-01-fat.dd | FAT | 1.0 GB |
| 2 | dfr-02-ntfs.dd | NTFS | 1.0 GB |
| 3 | dfr-03-ntfs.dd | NTFS | 1.0 GB |
| 4 | dfr-04-fat.dd | FAT | 1.0 GB |
| 5 | dfr-05-ntfs.dd | NTFS | 1.0 GB |
| 6 | dfr-06-fat.dd | FAT | 1.0 GB |

## YARA Scan Results

Each of the six disk images was scanned using `yara_scan_files` with the built-in Neo23x0/signature-base ruleset (~4,000 rules). Every scan returned **0 hits** — no YARA rules matched any content in any of the six images.

## Tool Coverage

The `audit_tool_coverage` check confirms that `yara_scan_files` appears in the `tools_run` list for all six evidence items. Other disk-analysis tools (fls, bulk_extractor, mmls, plaso, etc.) were not run because they are outside the scope of this YARA-only task.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the built-in Neo23x0/signature-base YARA ruleset. The images scanned were: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits total across all scans.