Both images now have `run_fls` completed. The remaining tools (`run_bulk_extractor`, `yara_scan_files`, `run_plaso`, `detect_steganography`, `run_optical_listing`) are not needed for a deleted file inventory — they serve different purposes (IOC carving, malware scanning, timeline generation, steganography detection, and optical media listing respectively).

---

# Forensic Report — NIST CFTT DFR Deleted File Recovery

**Case ID:** nist-dfr-deleted-files  
**Evidence:** Two removable-drive disk images in `/evidence/nist-cftt-dfr`  
**Objective:** Inventory deleted files on each disk image

## Evidence Items

| Image | Filesystem | Size |
|-------|-----------|------|
| dfr-01-fat.dd | FAT | 1.0 GB |
| dfr-02-ntfs.dd | NTFS | 1.0 GB |

## Analysis

Deleted files are identified by the `*` marker in the TSK `fls` output.

### Image 1: dfr-01-fat.dd (FAT)

**Allocated (non-deleted) user files:**
- `Algol.txt` (inode 5)
- `Canopus.txt` (inode 9)

**Deleted file:**
- `Bellatrix.txt` (inode 7)

### Image 2: dfr-02-ntfs.dd (NTFS)

**Allocated (non-deleted) user files:**
- `Arcturus.txt` (MFT entry 35)
- `Castor.txt` (MFT entry 37)
- `Duhr.TXT` (MFT entry 38)

**Deleted user files:**
- `Bunda.txt` (MFT entry 36) — file content still present (`-/r *`), directory name entry deleted
- `Duhr.TXT` (deleted directory entry at inode 0, `r/- *`) — a prior directory entry for this filename was deleted, though the file currently exists under MFT entry 38 (suggesting it was deleted and re-created, or renamed)

**Deleted orphan MFT entries** (NTFS system metadata remnants, not user-created files):
- `$OrphanFiles/OrphanFile-16` through `$OrphanFiles/OrphanFile-23` (MFT entries 16–23)

## Case Questions

Case Q1: **Deleted files by image:**

**dfr-01-fat.dd (FAT):** One deleted file — **Bellatrix.txt**.

**dfr-02-ntfs.dd (NTFS):** Two deleted user files — **Bunda.txt** and a prior directory entry for **Duhr.TXT** (the file was deleted and re-created or its name entry was reallocated). Additionally, eight orphan MFT entries (OrphanFile-16 through OrphanFile-23) represent deleted NTFS system metadata entries.