I now have all the data needed. Here is the final report.

---

# Forensic Report — Case: nist-dfr-deleted-files

## Evidence Summary

Two removable-drive disk images were examined:

| Image | Size | Partitions |
|-------|------|------------|
| `dfr-01-fat.dd` | 1.0 GB | FAT12 (offset 128), FAT16 (offset 16512), FAT32 (offset 82048) |
| `dfr-02-ntfs.dd` | 1.0 GB | NTFS (offset 61) |

## Tools Executed

- `run_mmls` — partition layout discovery (both images)
- `run_fls` — recursive file listing including deleted files (all partitions on both images)

Tools not run (`run_bulk_extractor`, `yara_scan_files`, `run_plaso`, `detect_steganography`, `run_optical_listing`) are not applicable to the task of identifying deleted files.

## Findings: Deleted Files by Image

### Image 1: dfr-01-fat.dd

Each of the three FAT partitions contained one deleted file (marked with `*` by fls):

| Partition | Deleted File |
|-----------|-------------|
| FAT12 (offset 128) | `_BEID.TXT` (inode 5) |
| FAT16 (offset 16512) | `Betelgeuse.txt` (inode 8) |
| FAT32 (offset 82048) | `Bellatrix.txt` (inode 7) |

Each partition also had two non-deleted user files and volume label entries.

### Image 2: dfr-02-ntfs.dd

The single NTFS partition contained the following deleted entries (marked with `*` by fls):

| Deleted File | Details |
|-------------|---------|
| `Bunda.txt` | MFT entry 36-128-3; file metadata unallocated, name still present |
| `Duhr.TXT` (deleted directory entry) | A second directory entry for Duhr.TXT pointing to inode 0 (deleted); the file itself still exists at MFT entry 38 — this indicates the file was moved or renamed |
| `$OrphanFiles/OrphanFile-16` through `$OrphanFiles/OrphanFile-23` | 8 orphaned MFT entries (16–23) with no parent directory linkage; these are residual NTFS metadata entries, not user-created files |

The primary deleted user file on the NTFS image is **Bunda.txt**.

---

## Case Questions

Case Q1: **Deleted files on every disk image, by image:**

**dfr-01-fat.dd** — Three deleted files, one per partition:
1. `_BEID.TXT` (FAT12 partition, sector offset 128)
2. `Betelgeuse.txt` (FAT16 partition, sector offset 16512)
3. `Bellatrix.txt` (FAT32 partition, sector offset 82048)

**dfr-02-ntfs.dd** — One deleted user file on the NTFS partition (sector offset 61):
1. `Bunda.txt` (MFT entry 36)

Additionally, the NTFS image contains a deleted directory entry for `Duhr.TXT` (pointing to inode 0, while the live file resides at MFT entry 38, suggesting it was moved/renamed), and 8 orphaned MFT entries (16–23) which are residual NTFS system metadata, not user data files.