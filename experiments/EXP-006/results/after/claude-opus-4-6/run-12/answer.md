All six disk images now show `yara_scan_files` in their `tools_run` list. Here is the final report.

---

# Forensic Report — Case nist-dfr-six-yara

**Case ID:** nist-dfr-six-yara  
**Evidence Path:** /evidence/nist-cftt-dfr-six  
**Date:** 2026-11-17  
**Examiner:** Digital Forensic Examiner  

## Evidence Summary

Six removable-drive disk images were presented for YARA scanning:

| # | Image | Filesystem | Size | YARA Ruleset | Matches |
|---|-------|------------|------|--------------|---------|
| 1 | dfr-01-fat.dd | FAT | 1.0 GB | Neo23x0/signature-base (builtin) | **0** |
| 2 | dfr-02-ntfs.dd | NTFS | 1.0 GB | Neo23x0/signature-base (builtin) | **0** |
| 3 | dfr-03-ntfs.dd | NTFS | 1.0 GB | Neo23x0/signature-base (builtin) | **0** |
| 4 | dfr-04-fat.dd | FAT | 1.0 GB | Neo23x0/signature-base (builtin) | **0** |
| 5 | dfr-05-ntfs.dd | NTFS | 1.0 GB | Neo23x0/signature-base (builtin) | **0** |
| 6 | dfr-06-fat.dd | FAT | 1.0 GB | Neo23x0/signature-base (builtin) | **0** |

## Methodology

Each disk image was scanned with `yara_scan_files` using the built-in Neo23x0/signature-base ruleset (~4,000 rules). Tool coverage was audited after every scan to confirm completion and to select the next unscanned image.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the Neo23x0/signature-base ruleset: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — zero hits across all scans. The images are clean with respect to the ~4,000-rule signature-base ruleset.