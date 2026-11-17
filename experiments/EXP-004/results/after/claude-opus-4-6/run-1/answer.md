Both disk images have `run_fls` completed. I have all the data needed to compile the final report.

---

# Forensic Report — Case `nist-dfr-deleted-files`

## Evidence Inventory

| Image | Size | Filesystem(s) |
|-------|------|---------------|
| `dfr-01-fat.dd` | 1.0 GB | FAT12, FAT16, FAT32 (3 partitions) |
| `dfr-02-ntfs.dd` | 1.0 GB | NTFS (1 partition) |

## Analysis — dfr-01-fat.dd

This image contains three partitions. Each was enumerated with `fls` to identify all files, including deleted entries (marked with `*`).

**FAT12 partition** (sector offset 128):
| Status | Filename |
|--------|----------|
| Active | XALTIR.TXT |
| **Deleted** | **_BEID.TXT** |
| Active | XCAPH.TXT |

Note: On FAT12, when a file is deleted the first character of the directory entry is overwritten with `0xE5`. The `fls` tool renders this as `_`, so the original first character of `_BEID.TXT` is unknown.

**FAT16 partition** (sector offset 16512):
| Status | Filename |
|--------|----------|
| Active | Alcor.TXT |
| **Deleted** | **Betelgeuse.txt** |
| Active | Capella.txt |

**FAT32 partition** (sector offset 82048):
| Status | Filename |
|--------|----------|
| Active | Algol.txt |
| **Deleted** | **Bellatrix.txt** |
| Active | Canopus.txt |

## Analysis — dfr-02-ntfs.dd

This image contains one NTFS partition (sector offset 61).

**User files:**
| Status | Filename | MFT Entry |
|--------|----------|-----------|
| Active | Arcturus.txt | 35 |
| **Deleted** | **Bunda.txt** | 36 |
| Active | Castor.txt | 37 |
| Active | Duhr.TXT | 38 |
| **Deleted** | **Duhr.TXT** (prior version) | 0 (reallocated) |

The deleted directory entry for `Duhr.TXT` at MFT entry 0 indicates an earlier version of that file was deleted; a new file with the same name was subsequently created at MFT entry 38.

**Orphan files** (deleted MFT records with no parent directory): OrphanFile-16 through OrphanFile-23 (8 entries). These are system-level MFT records, not user data files.

## Tools Applied

- `run_mmls` — partition discovery on both images
- `run_fls` — recursive file listing (including deleted files) on all partitions of both images

Tools not run (`run_bulk_extractor`, `yara_scan_files`, `run_plaso`, `detect_steganography`, `run_optical_listing`) were not applicable to the task of identifying deleted files.

## Case Questions

Case Q1: The deleted files on each disk image are:

**dfr-01-fat.dd:**
- `_BEID.TXT` — FAT12 partition (offset 128); first character lost to FAT deletion marker
- `Betelgeuse.txt` — FAT16 partition (offset 16512)
- `Bellatrix.txt` — FAT32 partition (offset 82048)

**dfr-02-ntfs.dd:**
- `Bunda.txt` — NTFS partition (offset 61), MFT entry 36
- `Duhr.TXT` — NTFS partition (offset 61), deleted directory entry with MFT entry reallocated to 0; a newer active file with the same name exists at MFT entry 38