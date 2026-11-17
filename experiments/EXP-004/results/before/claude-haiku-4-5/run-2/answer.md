## Digital Forensic Investigation Report
### Case ID: nist-dfr-deleted-files

**Investigation Objective:** Identify and inventory deleted files from disk images in the evidence.

---

### Evidence Summary

Two disk images were analyzed:
1. **dfr-01-fat.dd** - 1.0 GB FAT filesystem image
2. **dfr-02-ntfs.dd** - 1.0 GB NTFS filesystem image

---

### Investigation Methodology

**Tool Coverage:**
- Partitions identified using `run_mmls` on both disk images
- File system listings extracted using `run_fls` on both disk images
- Deleted files identified by asterisk (*) marker in TSK fls output

Deleted files are marked in the TSK output with an asterisk (*) in the allocation status field, indicating unallocated (deleted) inodes that remain recoverable from the filesystem metadata.

---

### Findings by Disk Image

**Image 1: dfr-01-fat.dd (FAT Filesystem)**

Extracted file listing indexed as `tsk.filelist` (8 total entries, source_id 2). One deleted file identified:
- **Bellatrix.txt** - marked as `r/r * 7` (deleted file entry)

**Image 2: dfr-02-ntfs.dd (NTFS Filesystem)**

Extracted file listing indexed as `tsk.filelist` (42 total entries, source_id 3). Ten deleted files identified:
- **Duhr.TXT** - marked as `v/- * 0` (deleted file entry)
- **Bunda.txt** - marked as `-/r * 36-128-3` (deleted file entry)
- **$OrphanFiles/OrphanFile-16** through **$OrphanFiles/OrphanFile-23** (8 orphaned file entries, all marked with *)

---

### Case Questions

**Case Q1:** List the deleted files on every disk image in the evidence, by image.

**dfr-01-fat.dd (FAT):**
- Bellatrix.txt

**dfr-02-ntfs.dd (NTFS):**
- Duhr.TXT
- Bunda.txt
- $OrphanFiles/OrphanFile-16
- $OrphanFiles/OrphanFile-17
- $OrphanFiles/OrphanFile-18
- $OrphanFiles/OrphanFile-19
- $OrphanFiles/OrphanFile-20
- $OrphanFiles/OrphanFile-21
- $OrphanFiles/OrphanFile-22
- $OrphanFiles/OrphanFile-23