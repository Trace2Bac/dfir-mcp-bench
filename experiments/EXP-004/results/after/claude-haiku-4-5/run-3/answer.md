Perfect! I have completed the analysis of both disk images. Here is my final forensic report:

---

# FORENSIC EXAMINATION REPORT
## Case: nist-dfr-deleted-files
**Examiner:** Digital Forensic Agent  
**Case ID:** nist-dfr-deleted-files  
**Date:** 2026-11-17  
**Evidence Location:** /evidence/nist-cftt-dfr

---

## EVIDENCE SUMMARY

Two removable media disk images were acquired and examined:
1. **dfr-01-fat.dd** — 1.0 GB FAT filesystem image
2. **dfr-02-ntfs.dd** — 1.0 GB NTFS filesystem image

---

## EXAMINATION METHODOLOGY

Each disk image was processed using The Sleuth Kit (TSK) tools:
- **run_mmls** was used to identify partition layout
- **run_fls** was used to recursively list all files, including those marked as deleted (indicated by `*` prefix in output)

Deleted files are identified by TSK's inode allocation status flags. The fls tool recovers file metadata even after deletion and reports the allocation status.

---

## FINDINGS

### Image 1: dfr-01-fat.dd (FAT Filesystem)

**File Listing Analysis:**
- Total entries: 8
- File system: FAT
- Allocated files: 3 (Algol.txt, Canopus.txt, 32FAT volume label)
- Deleted files: 1

**Deleted Files:**
- **Bellatrix.txt** (Inode 7, marked as `r/r * 7`)

---

### Image 2: dfr-02-ntfs.dd (NTFS Filesystem)

**File Listing Analysis:**
- Total entries: 42
- File system: NTFS
- Allocated files: 32 (system metadata and regular files)
- Deleted files: 10

**Deleted Files:**
1. **Duhr.TXT** (Inode 0, marked as `d/- * 0`)
2. **Bunda.txt** (Inode 36, marked as `-/r * 36-128-3`)
3. **$OrphanFiles/OrphanFile-16** (marked as `-/r * 16`)
4. **$OrphanFiles/OrphanFile-17** (marked as `-/r * 17`)
5. **$OrphanFiles/OrphanFile-18** (marked as `-/r * 18`)
6. **$OrphanFiles/OrphanFile-19** (marked as `-/r * 19`)
7. **$OrphanFiles/OrphanFile-20** (marked as `-/r * 20`)
8. **$OrphanFiles/OrphanFile-21** (marked as `-/r * 21`)
9. **$OrphanFiles/OrphanFile-22** (marked as `-/r * 22`)
10. **$OrphanFiles/OrphanFile-23** (marked as `-/r * 23`)

---

## CASE QUESTIONS

**Case Q1:** List the deleted files on every disk image in the evidence, by image.

- **dfr-01-fat.dd:** Bellatrix.txt

- **dfr-02-ntfs.dd:** Duhr.TXT, Bunda.txt, $OrphanFiles/OrphanFile-16, $OrphanFiles/OrphanFile-17, $OrphanFiles/OrphanFile-18, $OrphanFiles/OrphanFile-19, $OrphanFiles/OrphanFile-20, $OrphanFiles/OrphanFile-21, $OrphanFiles/OrphanFile-22, $OrphanFiles/OrphanFile-23

---

## CONCLUSION

A total of **11 deleted files** were recovered from the two disk images: 1 file from the FAT filesystem image and 10 files from the NTFS filesystem image. All deleted files have been identified through filesystem metadata analysis and are listed above by their respective source images.