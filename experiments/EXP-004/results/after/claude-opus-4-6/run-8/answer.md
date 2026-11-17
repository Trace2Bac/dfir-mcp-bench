The audit confirms `yara_scan_files` was run on all six disk images. The remaining tools (fls, bulk_extractor, mmls, plaso, steganography, optical_listing) are not required for this YARA-focused case.

---

# Forensic Report — Case nist-dfr-six-yara

## Evidence Summary

Six removable-drive disk images were provided at `/evidence/nist-cftt-dfr-six`:

| # | Image File | Type | Size |
|---|-----------|------|------|
| 1 | dfr-01-fat.dd | FAT disk image | 1.0 GB |
| 2 | dfr-02-ntfs.dd | NTFS disk image | 1.0 GB |
| 3 | dfr-03-ntfs.dd | NTFS disk image | 1.0 GB |
| 4 | dfr-04-fat.dd | FAT disk image | 1.0 GB |
| 5 | dfr-05-ntfs.dd | NTFS disk image | 1.0 GB |
| 6 | dfr-06-fat.dd | FAT disk image | 1.0 GB |

## Analysis Performed

Each disk image was scanned with `yara_scan_files` using the built-in Neo23x0/signature-base ruleset (~4,000 rules). Every scan completed successfully and returned **zero rule matches**.

## Tool Coverage

The `audit_tool_coverage` check confirms `yara_scan_files` was executed against all six evidence items. Other applicable disk-image tools (fls, bulk_extractor, mmls, plaso, steganography detection, optical listing) were intentionally skipped as they fall outside the scope of this YARA-only scan assignment.

## Case Questions

Case Q1: All six disk images were scanned with `yara_scan_files` using the built-in signature-base ruleset. The images scanned were: **dfr-01-fat.dd**, **dfr-02-ntfs.dd**, **dfr-03-ntfs.dd**, **dfr-04-fat.dd**, **dfr-05-ntfs.dd**, and **dfr-06-fat.dd**. No YARA rules matched on any of the six images — every scan returned 0 hits.