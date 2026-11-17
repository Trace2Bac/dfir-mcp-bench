Perfect! I have now processed both disk images and identified all deleted files. Here is my final report:

---

# DIGITAL FORENSIC EXAMINATION REPORT
## Case: nist-dfr-deleted-files
**Evidence Path:** /evidence/nist-cftt-dfr  
**Examiner:** Digital Forensic Agent  
**Date:** 2026-11-17

---

## Evidence Summary

Two disk images were examined:
1. **dfr-01-fat.dd** (1.0 GB) - FAT filesystem
2. **dfr-02-ntfs.dd** (1.0 GB) - NTFS filesystem

## Methodology

Each disk image was analyzed using The Sleuth Kit (TSK) tools:
- `mmls` was used to identify partition structure
- `fls` was used to extract complete file listings, including deleted files marked with asterisks (*)

Deleted files are identified in TSK output with the `-` character in the first position of the allocation status field, and an asterisk `*` in the second position.

## Findings

### Image 1: dfr-01-fat.dd

**Deleted Files:**
- Bellatrix.txt (inode 7)

### Image 2: dfr-02-ntfs.dd

**Deleted Files:**
- Duhr.TXT (inode 0, deletion state d/-)
- Bunda.txt (inode 36-128-3)
- $OrphanFiles/OrphanFile-16
- $OrphanFiles/OrphanFile-17
- $OrphanFiles/OrphanFile-18
- $OrphanFiles/OrphanFile-19
- $OrphanFiles/OrphanFile-20
- $OrphanFiles/OrphanFile-21
- $OrphanFiles/OrphanFile-22
- $OrphanFiles/OrphanFile-23

---

## Case Questions

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

---

**Report Complete**