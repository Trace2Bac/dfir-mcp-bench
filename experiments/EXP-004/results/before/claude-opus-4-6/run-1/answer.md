Both disk images have `run_fls` and `run_mmls` completed. The remaining tools (`run_bulk_extractor`, `yara_scan_files`, `run_plaso`, `detect_steganography`, `run_optical_listing`) are not needed for identifying deleted files — they serve different purposes (IOC carving, YARA scanning, timeline generation, steganography detection, and optical media listing).

Here is my final report.

---

# Forensic Report — Deleted File Recovery

**Case ID:** nist-dfr-deleted-files  
**Evidence:** /evidence/nist-cftt-dfr  
**Date:** 2026-11-17

## Evidence Overview

| Image | Size | Filesystem(s) |
|---|---|---|
| dfr-01-fat.dd | 1.0 GB | FAT12, FAT16, FAT32 (three partitions) |
| dfr-02-ntfs.dd | 1.0 GB | NTFS (one partition) |

## Findings by Image

### Image 1: dfr-01-fat.dd

This image contains three partitions. Each partition has one deleted file (marked with `*` in fls output):

| Partition | Offset (sectors) | Filesystem | Deleted File |
|---|---|---|---|
| 1 | 128 | FAT12 | `_BEID.TXT` (inode 5) |
| 2 | 16512 | FAT16 | `Betelgeuse.txt` (inode 8) |
| 3 | 82048 | FAT32 | `Bellatrix.txt` (inode 7) |

**Note:** On FAT12, the first character of a deleted filename is replaced with a marker byte (displayed as `_`), so `_BEID.TXT` likely had an original name of a single unknown character followed by `BEID.TXT`.

Each partition also contained two non-deleted user files:
- FAT12: `XALTIR.TXT`, `XCAPH.TXT`
- FAT16: `Alcor.TXT`, `Capella.txt`
- FAT32: `Algol.txt`, `Canopus.txt`

### Image 2: dfr-02-ntfs.dd

This image contains one NTFS partition (offset 61 sectors). Two deleted user files were found:

| Deleted File | Inode | Notes |
|---|---|---|
| `Bunda.txt` | 36-128-3 | Name unallocated, metadata still allocated (`-/r *`) |
| `Duhr.TXT` | 0 | Deleted directory entry (`r/- *`); a current copy of `Duhr.TXT` also exists at inode 38-128-3 |

Non-deleted user files: `Arcturus.txt`, `Castor.txt`, `Duhr.TXT` (current version).

Orphan MFT entries 16–23 were also flagged by fls but these are reserved NTFS metadata slots, not user-created deleted files.

## Tools Not Run (Justification)

- **run_bulk_extractor, yara_scan_files, run_plaso, detect_steganography, run_optical_listing** — Not applicable to the task of identifying deleted files. These tools serve IOC carving, malware scanning, timeline creation, steganography detection, and optical media enumeration respectively.

## Case Questions

Case Q1: **Deleted files by image:**

**dfr-01-fat.dd** (3 deleted files across 3 partitions):
1. `_BEID.TXT` — FAT12 partition (offset 128), inode 5
2. `Betelgeuse.txt` — FAT16 partition (offset 16512), inode 8
3. `Bellatrix.txt` — FAT32 partition (offset 82048), inode 7

**dfr-02-ntfs.dd** (2 deleted files on 1 NTFS partition):
1. `Bunda.txt` — NTFS partition (offset 61), inode 36-128-3
2. `Duhr.TXT` — NTFS partition (offset 61), deleted directory entry (a live copy also exists at inode 38-128-3)