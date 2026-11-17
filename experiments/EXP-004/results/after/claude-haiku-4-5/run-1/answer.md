Perfect! I have completed the analysis of both disk images. Here is my final report:

---

# FORENSIC INVESTIGATION REPORT
## Case: nist-dfr-deleted-files

### Evidence Summary
Two disk images were examined for deleted files:
- **dfr-01-fat.dd** (1.0 GB) - FAT filesystem
- **dfr-02-ntfs.dd** (1.0 GB) - NTFS filesystem

### Methodology
Deleted files were identified using The Sleuth Kit's `fls` command, which recursively lists all files in a disk image and marks deleted entries with an asterisk (*).

### Findings

#### Image 1: dfr-01-fat.dd
Using `run_fls` on the FAT filesystem, one deleted file was identified:
- **Bellatrix.txt** (marked as `r/r * 7` in inode allocation status, indicating a regular file marked as deleted)

#### Image 2: dfr-02-ntfs.dd
Using `run_fls` on the NTFS filesystem, 10 deleted files were identified:

**Named deleted files:**
- **Duhr.TXT** (marked as `d/- * 0`, indicating a deleted file with no allocation)
- **Bunda.txt** (marked as `-/r * 36-128-3`, indicating a deleted file with allocated space)

**Orphan deleted files (unallocated inodes):**
- OrphanFile-16 through OrphanFile-23 (8 orphan files marked as `-/r *`, indicating deleted unallocated files)

### Chain of Custody
Evidence hashing was completed during case creation for chain of custody verification.

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