Both images have `run_fls` completed. The remaining tools (`run_bulk_extractor`, `yara_scan_files`, `run_plaso`, `detect_steganography`, `run_optical_listing`) are not applicable to this task — the goal is strictly to inventory deleted files, and `fls` is the definitive tool for that. Optical listing is for CD/DVD media, not dd images of removable drives.

---

# Forensic Report — Deleted File Inventory

**Case ID:** nist-dfr-deleted-files  
**Evidence:** `/evidence/nist-cftt-dfr`  
**Date:** 2026-11-17

## Evidence Overview

| Image | Size | Filesystem(s) |
|-------|------|----------------|
| dfr-01-fat.dd | 1.0 GB | FAT12, FAT16, FAT32 (3 partitions) |
| dfr-02-ntfs.dd | 1.0 GB | NTFS (1 partition) |

## Analysis — dfr-01-fat.dd

This image contains three partitions. Each was enumerated with `run_fls`. Deleted files are marked with `*` in SleuthKit output.

### FAT12 Partition (offset 128)
| File | Status |
|------|--------|
| XALTIR.TXT | Active |
| **\_BEID.TXT** | **Deleted** |
| XCAPH.TXT | Active |

> Note: In FAT, deletion overwrites the first character of the filename with 0xE5 (shown as `_`). The original first character of `_BEID.TXT` is unrecoverable from the directory entry alone.

### FAT16 Partition (offset 16512)
| File | Status |
|------|--------|
| Alcor.TXT | Active |
| **Betelgeuse.txt** | **Deleted** |
| Capella.txt | Active |

### FAT32 Partition (offset 82048)
| File | Status |
|------|--------|
| Algol.txt | Active |
| **Bellatrix.txt** | **Deleted** |
| Canopus.txt | Active |

## Analysis — dfr-02-ntfs.dd

Single NTFS partition at offset 61.

| File | Status |
|------|--------|
| Arcturus.txt | Active |
| **Bunda.txt** | **Deleted** (MFT entry 36-128-3) |
| Castor.txt | Active |
| Duhr.TXT | Active (MFT entry 38-128-3) |
| **Duhr.TXT** | **Deleted** (stale directory entry, inode 0 — original metadata overwritten) |

> Note: There are two directory entries for `Duhr.TXT` — one active and one deleted. This indicates the file was deleted and subsequently re-created. Additionally, orphan MFT entries 16–23 were found; these are reserved NTFS system metadata slots, not user files.

## Tools Applied

- **run_mmls** — Partition discovery on both images
- **run_fls** — Recursive file listing (including deleted files) on all partitions of both images

Tools not run (`run_bulk_extractor`, `yara_scan_files`, `run_plaso`, `detect_steganography`, `run_optical_listing`) are outside scope: the task requires only a deleted-file inventory, and these images are not optical media.

## Case Questions

Case Q1: Deleted files by image:

**dfr-01-fat.dd:**
- `_BEID.TXT` (FAT12 partition, offset 128 — first character of filename lost to FAT deletion marker)
- `Betelgeuse.txt` (FAT16 partition, offset 16512)
- `Bellatrix.txt` (FAT32 partition, offset 82048)

**dfr-02-ntfs.dd:**
- `Bunda.txt` (NTFS partition, offset 61, MFT entry 36-128-3)
- `Duhr.TXT` (NTFS partition, offset 61, stale deleted directory entry — an active copy of `Duhr.TXT` also exists, indicating the file was deleted and re-created)