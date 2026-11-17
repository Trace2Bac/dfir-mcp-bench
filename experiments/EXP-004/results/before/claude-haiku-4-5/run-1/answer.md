Perfect! I've successfully extracted the deleted files from both disk images. The audit shows I've run the appropriate tools (run_fls and run_mmls) on both images. The other listed tools are not applicable for this task (bulk extraction, YARA scanning, timeline generation, etc. are not needed to identify deleted files).

Based on the TSK fls output, I can now identify the deleted files:

**dfr-01-fat.dd (FAT filesystem):**
- Bellatrix.txt (marked with * in the listing)

**dfr-02-ntfs.dd (NTFS filesystem):**
- Duhr.TXT (marked with * - file with no directory entry)
- Bunda.txt (marked with * - deleted file)
- OrphanFile-16 through OrphanFile-23 (8 orphan files marked with *)

---

# FINAL FORENSIC REPORT

## Case: nist-dfr-deleted-files

### Evidence Summary
- Two removable disk images acquired and analyzed
- dfr-01-fat.dd: 1.0 GB FAT filesystem
- dfr-02-ntfs.dd: 1.0 GB NTFS filesystem

### Investigation Methodology
1. Created case using scan_evidence
2. Executed run_mmls on both disk images to identify partition layout
3. Executed run_fls on both disk images to generate comprehensive file listings, including deleted files (marked with asterisks in TSK output)
4. Reviewed TSK fls output to extract deleted file entries

### Case Questions

**Case Q1:** List the deleted files on every disk image in the evidence, by image.

**dfr-01-fat.dd (FAT Filesystem):**
1. Bellatrix.txt

**dfr-02-ntfs.dd (NTFS Filesystem):**
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

**Evidence:** TSK fls file listing output for both disk images, with deleted files marked with asterisks (*) in the allocation flags.