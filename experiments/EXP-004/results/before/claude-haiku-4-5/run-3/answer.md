Excellent! I have completed the analysis of both disk images. The audit confirms that `run_fls` and `run_mmls` have been executed on both images, which is sufficient to identify deleted files (marked with `*` in the file listings).

---

# Digital Forensic Examination Report
## Case: nist-dfr-deleted-files

### Executive Summary
Two disk images were examined for deleted files. Using The Sleuth Kit (TSK) file listing tools, deleted file entries were identified on both FAT and NTFS filesystems.

### Findings

**Image 1: dfr-01-fat.dd (FAT Filesystem)**

The file listing extracted via `run_fls` revealed one deleted file on this FAT-formatted disk:
- **Bellatrix.txt** (marked as `r/r * 7` - deleted file, readable)

The active files on this image are Algol.txt and Canopus.txt.

**Image 2: dfr-02-ntfs.dd (NTFS Filesystem)**

The file listing extracted via `run_fls` revealed multiple deleted files on this NTFS-formatted disk:

Named files:
- **Duhr.TXT** (marked as `d/- * 0` - directory entry deleted but file not allocated)
- **Bunda.txt** (marked as `-/r * 36-128-3` - directory entry deleted but file still allocated in MFT)

Orphaned files in $OrphanFiles directory:
- **OrphanFile-16** through **OrphanFile-23** (8 orphaned files, marked as `-/r *`, indicating deleted directory entries)

The active files on this image are Arcturus.txt and Castor.txt.

### Case Questions

**Case Q1:** List the deleted files on every disk image in the evidence, by image.

**dfr-01-fat.dd (FAT filesystem):**
1. Bellatrix.txt

**dfr-02-ntfs.dd (NTFS filesystem):**
1. Duhr.TXT
2. Bunda.txt
3. OrphanFile-16
4. OrphanFile-17
5. OrphanFile-18
6. OrphanFile-19
7. OrphanFile-20
8. OrphanFile-21
9. OrphanFile-22
10. OrphanFile-23