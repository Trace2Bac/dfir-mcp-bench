# Mulder Investigation Report

**Case:** nist-dfr-01-fat
**Generated:** 2026-11-09T11:42:51.545742+00:00
**Evidence:** /evidence/nist-cftt-dfr

---

## Executive Summary

**Scope:** 16 evidence sources (10 disk, 6 other) | 200 tool calls | 24 minutes
**Results:** 6 findings | 6 confirmed, 0 inference | 1 hypothesis ruled out
**Timeline:** 1999-01-01 to 2011-12-25

**Attack Lifecycle:**
- **Credential Access** (1999-01-01 to 2011-12-25): Allocated Files: Algol.txt and Canopus.txt on FAT32 Partition (+1 related)
- **Other Activity** (2000-02-29): Deleted File: Bellatrix.txt on FAT32 Partition (712 bytes)

**Tools:** get_raw_output (55), search (45), open_case (10), get_investigation_summary (8), submit_finding (7). SHA-256 hashes recorded for all evidence.



---

## Forensic Soundness and Evidence Integrity

Analysis was executed via a read-only Model Context Protocol (MCP) server
mapped to the SANS SIFT toolchain. The MCP architecture enforces structural
evidence protection: original evidence files were mounted as read-only
volumes, all tool interactions are typed functions (no shell access), and
every finding is validated against the append-only audit log before
acceptance.

SHA-256 hashes were computed at ingestion for 1
original evidence file and
recorded in the case database.

200 tool calls were executed across 12
indexed sources over the course of the investigation, with full provenance
tracking via append-only JSONL audit log.



---

## Investigation Report

# Forensic Disk Examination Report — NIST CFTT DFR-01 FAT Disk Image

## Background

This report documents the forensic examination of a 1 GB disk image (dfr-01-fat.dd) obtained from a seized USB storage device. The image was submitted for analysis with the objective of identifying the partition structure, cataloguing all files present on the device — both allocated and deleted — and recovering metadata associated with any deleted files. The examination follows NIST Computer Forensic Tool Testing (CFTT) Deleted File Recovery (DFR) test protocols.

The disk image file is 1,073,742,336 bytes in size. Its integrity was verified at the time of ingestion using cryptographic hash values: MD5 17290b62146aabe5c0e94d1eda39e31c and SHA-256 5d5bf8fb15a1df463fb0b9c0a958c05ece30941af40545f895131ff0daf32fab. These hashes serve as the chain-of-custody baseline and confirm the image was not altered during acquisition or analysis.

The investigation drew upon 12 indexed evidence sources, including partition table analysis (mmls), file system metadata (fsstat), file listings (fls), individual directory entry metadata (istat), MAC timeline generation (mactime), bulk data extraction (Bulk Extractor), file masquerade detection, YARA signature scanning, and cryptographic hashing (hashdeep). A total of 200 tool invocations were performed during the examination, resulting in 6 documented findings, all at informational severity. 1 finding was classified as negative, documenting a known analysis scope limitation rather than a detected artifact.

The disk image contains a DOS (MBR) partition table with three defined partitions spanning the first approximately 104 MB of the 1 GB image, with the remaining approximately 964 MB unallocated. File-level extraction and analysis were successfully performed against the third partition (FAT32). The first two partitions (FAT12 and FAT16) were identified at the partition table level but were not subjected to file-level analysis, which constitutes a documented scope limitation addressed in the findings.

## Incident Timeline

The following timeline reconstructs the history of the FAT32 partition and its files based on filesystem metadata timestamps recovered from directory entries and the volume boot record. All timestamps are in UTC.

On December 25, 2011, at 12:59:44, the FAT32 partition (partition 3, volume label "32FAT") was formatted. This timestamp is derived from the volume label directory entry (inode 3), which records the time the label was written to the newly created file system. The partition was configured with 512-byte sectors and 512-byte clusters, using the OEM identifier "MSDOS5.0", and occupies sectors 82048 through 213119 of the disk image (131,072 sectors, 64 MB).

Approximately one hour and three minutes later, at 14:02:24 on the same date, three text files were written to the partition: Algol.txt (inode 5, 512 bytes), Bellatrix.txt (inode 7, 712 bytes), and Canopus.txt (inode 9, 512 bytes). All three files share this identical "Created" timestamp, indicating they were copied to the volume in a single batch operation. The "Written" (last modified) timestamps on these files predate their creation on this volume — Algol.txt and Canopus.txt carry a written date of January 1, 1999 at 02:01:00, while Bellatrix.txt carries a written date of February 29, 2000 at 14:13:00. In FAT filesystems, the "Created" timestamp reflects when the file was created on the current volume, while the "Written" timestamp is preserved from the source. This pattern confirms the files were copied from another location, not created directly on the USB device.

At some point after the files were written, Bellatrix.txt was deleted. The precise deletion time cannot be determined from FAT metadata alone, as the FAT file system does not record a deletion timestamp. However, the deletion is confirmed by two independent indicators: the file listing (fls) marks the entry with an asterisk ("r/r * 7: Bellatrix.txt"), and the istat metadata reports the directory entry as "Not Allocated." Furthermore, the FAT content allocation table no longer contains entries for sectors 8195 and 8196 (Bellatrix.txt's data sectors), confirming its cluster chain was freed upon deletion. The first character of the short filename was overwritten with the deletion marker (0xE5), rendering it as "_ELLAT~1.TXT" in the 8.3 directory entry — standard FAT deletion behavior.

A notable detail of the Bellatrix.txt "Written" timestamp is its date of February 29, 2000. This date is valid because the year 2000 is a leap year (divisible by 400, making it an exception to the century rule). This appears to be a deliberate test case designed to validate forensic tool accuracy in parsing leap-year dates, consistent with the NIST CFTT test image purpose.

## Key Findings

### Partition Structure and File System Identification

The disk image contains a DOS Master Boot Record (MBR) partition table with three partitions. Partition 1 (slot 002) is a DOS FAT12 file system (type 0x01), beginning at sector 128 and spanning 16,384 sectors (8 MB). Partition 2 (slot 003) is a DOS FAT16 file system (type 0x06), beginning at sector 16,512 and spanning 65,536 sectors (32 MB). Partition 3 (slot 004) is a Win95 FAT32 file system (type 0x0b), beginning at sector 82,048 and spanning 131,072 sectors (64 MB). The first 128 sectors (64 KB) are reserved for the MBR and partition table. A large unallocated region of 1,884,033 sectors (approximately 964 MB) follows the last partition and extends to the end of the disk image.

### Deleted File Recovery: Bellatrix.txt

One deleted file was identified on the FAT32 partition: Bellatrix.txt (directory entry/inode 7). The file was 712 bytes in logical size, occupying two 512-byte sectors (8195 and 8196) for an allocated size of 1,024 bytes. The directory entry retains complete metadata: the file had attributes of File and Archive, a last-modified ("Written") date of February 29, 2000 at 14:13:00 UTC, a last-accessed date of January 2, 1999, and a creation date of December 25, 2011 at 14:02:24 UTC. Because the directory entry is intact and the data sectors have not been reallocated to another file (they are absent from the FAT but no new file occupies them), the file content is potentially recoverable through deleted file recovery tools.

### Allocated Files: Algol.txt and Canopus.txt

Two files remain allocated and intact on the FAT32 partition. Algol.txt (directory entry/inode 5) is 512 bytes in size, occupying sector 8194. Canopus.txt (directory entry/inode 9) is 512 bytes in size, occupying sector 8197. Both files share identical timestamps: written January 1, 1999 at 02:01:00, accessed January 1, 1999, and created December 25, 2011 at 14:02:24. Their presence in the FAT content allocation table (sectors 8194 and 8197, each mapped to EOF) confirms their allocated status. No file extension or content-type mismatches (masquerading) were detected for any file on the partition.

### Analysis Scope Limitation: Partitions 1 and 2

File-level extraction tools (fls, fsstat, istat, mactime) were executed only against partition 3 (FAT32, offset 82048). Partitions 1 (FAT12) and 2 (FAT16) were identified in the partition table but were not subjected to file-level analysis. This means any allocated or deleted files residing on those two partitions remain unaccounted for in this examination. Bulk Extractor, which scanned the entire raw image including the partition 1 and 2 regions, found no structured data artifacts (email addresses, URLs, domains, or other recognizable data fragments) anywhere on the disk, suggesting these partitions may be empty or contain only unstructured content. However, this cannot substitute for direct file-system-level examination.

### Unallocated Space and Residual Data Analysis

Bulk Extractor scanning of the entire 1,073,742,336-byte disk image yielded no substantive findings. No email addresses, URLs, credit card numbers, telephone numbers, domain names, or other structured data remnants were detected in unallocated space, file slack, or any other region of the image. YARA signature scanning of extracted files produced zero matches, confirming no known malware signatures or suspicious content patterns are present. The approximately 964 MB of unallocated space after partition 3 and any slack space within the partitions are devoid of recoverable structured data.

## Threat Intelligence and Attribution

This section is not applicable to the present examination. The disk image is a NIST Computer Forensic Tool Testing (CFTT) reference image designed for validating deleted file recovery capabilities of forensic tools. It is a controlled test artifact, not evidence from a security incident or criminal investigation involving threat actors. No malware, command-and-control infrastructure, unauthorized access artifacts, or adversarial tradecraft indicators were identified. No MITRE ATT&CK techniques are associated with any finding. The examination is a forensic validation exercise, and attribution analysis is therefore not relevant.

## Impact Assessment

This examination is a forensic validation exercise against a NIST CFTT reference image, so impact is assessed in terms of evidentiary completeness rather than organizational harm. The FAT32 partition (partition 3) was comprehensively analyzed: all three user files were identified (two allocated, one deleted), complete metadata was recovered for each, and the file system structure was fully documented. The deleted file Bellatrix.txt retains its directory entry metadata and its data sectors appear unoverwritten, indicating high recoverability.

The primary scope limitation is the absence of file-level analysis for partitions 1 (FAT12, 8 MB) and 2 (FAT16, 32 MB). While bulk scanning suggests these partitions contain no structured data, the lack of direct file system examination means the investigation cannot definitively confirm or deny the presence of files — allocated or deleted — on those volumes. Any conclusion about "all files on the disk image" must be qualified by this limitation.

The disk image integrity is intact, as confirmed by cryptographic hash verification. The evidence chain is unbroken.

## Immediate Tactical Containment

This section is not applicable to the present examination. The disk image under analysis is a NIST CFTT reference image used for forensic tool validation, not a live system or evidence from an active security incident. There are no threats to contain, no malicious processes to terminate, no adversary infrastructure to block, and no compromised accounts to disable. The image is a static forensic artifact analyzed in a read-only capacity.

## Strategic Remediation

This section is not applicable in the traditional incident response sense, as the examination concerns a NIST CFTT reference image rather than a compromised production environment. However, one analytical process gap was identified that warrants remediation for future examinations.

The file-level extraction tools were configured to analyze only the FAT32 partition at offset 82048, leaving the FAT12 and FAT16 partitions without file-system-level examination. This was documented in finding f_84305dca. For any forensic examination involving multi-partition media, the analysis workflow should ensure that file listing (fls), file system statistics (fsstat), and metadata extraction (istat) are executed against every partition identified in the partition table, not only the largest or most recently active one. Had partitions 1 and 2 contained deleted files, they would have been missed entirely. Future examinations of multi-partition images should iterate over all partition offsets reported by mmls and run the full extraction pipeline against each.

## Conclusion

This forensic examination of the NIST CFTT DFR-01 FAT disk image successfully identified the partition structure, catalogued all files on the analyzed partition, recovered metadata for the deleted file, and documented the scope of the analysis. The following investigation questions are answered based on the evidence:

**Q1: What partitions does the disk image contain, and what file system is in each?** The disk image contains three partitions: Partition 1 is a DOS FAT12 file system (8 MB, sectors 128–16,511), Partition 2 is a DOS FAT16 file system (32 MB, sectors 16,512–82,047), and Partition 3 is a Win95 FAT32 file system (64 MB, sectors 82,048–213,119). A DOS MBR partition table governs the layout.

**Q2: Which files were deleted, and in which partition was each?** One deleted file was identified: Bellatrix.txt, located on Partition 3 (FAT32, volume label "32FAT"). Its directory entry (inode 7) is marked "Not Allocated," its first filename character is overwritten with the FAT deletion marker, and its sectors (8195–8196) are absent from the FAT content allocation table. No file-level analysis was performed on Partitions 1 and 2, so the presence of deleted files on those partitions cannot be confirmed or ruled out.

**Q3: Which files are still allocated (not deleted)?** Two files remain allocated on Partition 3 (FAT32): Algol.txt (inode 5, sector 8194) and Canopus.txt (inode 9, sector 8197). Both are confirmed allocated by their FAT chain entries and directory entry status. The same scope limitation applies to Partitions 1 and 2.

**Q4: What was the size in bytes of each deleted file?** Bellatrix.txt has a logical size of 712 bytes, as recorded in its directory entry. It occupied two 512-byte sectors for a physical allocation of 1,024 bytes.

**Q5: On what date were the deleted files last modified?** Bellatrix.txt was last modified ("Written" timestamp) on February 29, 2000, at 14:13:00 UTC. This date is valid — the year 2000 is a leap year — and the timestamp was preserved from the original source file when it was copied to the FAT32 partition on December 25, 2011.

**Standard Investigation Questions (Q1–Q8):**

Q1 (What systems were compromised?): N/A. This is a forensic tool validation exercise against a NIST reference image, not a compromise investigation. The USB drive under examination is a controlled test artifact.

Q2 (How did the attacker gain initial access?): N/A. No unauthorized access or adversarial activity is involved in this examination.

Q3 (What lateral movement occurred?): N/A. No network or multi-system activity is relevant to this single-disk forensic examination.

Q4 (What persistence mechanisms were installed?): N/A. No malware, backdoors, or persistence artifacts were identified. YARA scanning returned zero matches.

Q5 (Was data exfiltrated?): N/A. The examination concerns file recovery from a seized storage device, not data loss from a compromised system.

Q6 (What is the full timeline of the incident?): The FAT32 partition was formatted on December 25, 2011 at 12:59:44 UTC. Three text files (Algol.txt, Bellatrix.txt, Canopus.txt) were copied to the partition at 14:02:24 UTC on the same date, preserving their original modification timestamps of January 1, 1999 (Algol.txt, Canopus.txt) and February 29, 2000 (Bellatrix.txt). At an undetermined later time, Bellatrix.txt was deleted.

Q7 (What is the total scope and business impact?): The examination scope encompasses one 1 GB disk image containing three FAT partitions. File-level analysis was completed for the FAT32 partition, identifying two allocated and one deleted file. Partitions 1 (FAT12) and 2 (FAT16) remain unexamined at the file level. No organizational impact applies, as this is a controlled test image.

Q8 (What are the recommended remediation actions?): Future multi-partition disk examinations should ensure all partitions identified by the partition table are subjected to file-level analysis, not only the largest or most prominent partition. This process improvement would eliminate the scope gap documented in this examination.


---

## Overview

| | |
|---|---|
| Findings | **6** (6 confirmed, 0 inference) |
| Severity | 0 critical, 0 high, 0 medium, 0 low, 6 info |
| Sources | 12 evidence sources across 200 tool calls |
| Ruled Out | 1 hypotheses tested and rejected |


---

## Evidence Hashes

SHA-256 hashes recorded at ingestion. Verify with `sha256sum <file>`.

| File | SHA-256 | Size |
|------|---------|------|
| dfr-01-fat.dd | `5d5bf8fb15a1df463fb0b9c0a958c05ece30941af40545f895131ff0daf32fab` | 1.0 GB |



---

## Attack Timeline


| Time | Event | Severity | Sources |
|------|-------|----------|---------|
| 1999-01-01T02:01:00 | Allocated Files: Algol.txt and Canopus.txt on FAT32 Partition | INFO | tsk.filelist, tsk.metadata.5, tsk.metadata.9, tsk.timeline |
| 2000-02-29T14:13:00 | Deleted File: Bellatrix.txt on FAT32 Partition (712 bytes) | INFO | tsk.filelist, tsk.metadata.7, tsk.timeline |
| 2011-12-25T12:59:44 | Volume Label and File System Creation Timeline | INFO | tsk.metadata.3, tsk.fsstat, hashdeep.hashes |




---

## Hypotheses Ruled Out

These hypotheses were explicitly tested and no supporting evidence was found.


- **Partitions 1 (FAT12) and 2 (FAT16) Not Analyzed for Files** : Counter-analysis investigated whether partitions 1 (FAT12, sectors 128-16511, 8 MB) and 2 (FAT16, sectors 16512-82047, 32 MB) contain any files—allocated or deleted. No file-level analysis exists...



---

## Appendix A: Verified Forensic Findings


### 1. [INFO] Disk Partition Layout: Three FAT Partitions (FAT12, FAT16, FAT32)

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | tsk.partitions, tsk.fsstat |
| **Evidence Refs** | tc_bbadd1b9, tc_75772f5d |


The disk image dfr-01-fat.dd (1,073,742,336 bytes; MD5: 17290b62146aabe5c0e94d1eda39e31c) contains a DOS partition table with three partitions:

1. **Partition 1** (slot 002): DOS FAT12 (type 0x01) — Start sector 128, End sector 16511, Length 16,384 sectors (8,388,608 bytes / 8 MB)
2. **Partition 2** (slot 003): DOS FAT16 (type 0x06) — Start sector 16512, End sector 82047, Length 65,536 sectors (33,554,432 bytes / 32 MB)
3. **Partition 3** (slot 004): Win95 FAT32 (type 0x0b) — Start sector 82048, End sector 213119, Length 131,072 sectors (67,108,864 bytes / 64 MB)

Additional space:
- Unallocated space before first partition: sectors 0–127 (128 sectors, 65,536 bytes) containing the MBR/partition table
- Unallocated space after last partition: sectors 213120–2097152 (1,884,033 sectors, ~964 MB)

**IMPORTANT ANALYSIS SCOPE LIMITATION**: Only partition 3 (FAT32) was analyzed by file-level extraction tools (fls, fsstat, istat, mactime). The file listing (tsk.filelist), filesystem metadata (tsk.fsstat), and individual file metadata (tsk.metadata.*) sources all exclusively reference the FAT32 partition at offset 82048. No file-level analysis was performed on Partition 1 (FAT12) or Partition 2 (FAT16). This means any files—allocated or deleted—on those two partitions are unaccounted for. Bulk Extractor did scan the entire raw image but found no structured data artifacts anywhere, including in the partition 1 and 2 regions.

The FAT32 partition's volume label is "32FAT" and it uses 512-byte sectors and 512-byte clusters, with OEM name "MSDOS5.0".



### 2. [INFO] Deleted File: Bellatrix.txt on FAT32 Partition (712 bytes)

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2000-02-29T14:13:00 |
| **Sources** | tsk.filelist, tsk.metadata.7, tsk.timeline |
| **Evidence Refs** | tc_bcf735ef, tc_c80b054a, tc_5a51969f |


One deleted file was identified on the FAT32 partition (partition 3, volume label "32FAT"):

**Bellatrix.txt** (directory entry/inode 7)
- Status: Not Allocated (deleted)
- Size: 712 bytes (logical); allocated size is 1024 bytes (two 512-byte sectors)
- Short name (8.3): _ELLAT~1.TXT (first character replaced with underscore upon deletion, per FAT convention where 0xE5 is written to the first byte)
- Sectors occupied: 8195, 8196 (two 512-byte sectors)
- Timestamps:
  - Written (last modified): **2000-02-29 14:13:00 UTC**
  - Accessed: 1999-01-02 00:00:00 UTC
  - Created: 2011-12-25 14:02:24 UTC
- File attributes: File, Archive

The file listing (fls) marks this entry with an asterisk (*) indicator: "r/r * 7: Bellatrix.txt", confirming the deleted status. The istat metadata confirms "Not Allocated". The directory entry still retains the full file metadata including size and sector allocation, indicating the file content may be recoverable if the sectors have not been overwritten.

**Timestamp Analysis**: The "Written" date of 2000-02-29 is a valid calendar date—year 2000 IS a leap year (divisible by 400, so the century exception does not apply). This date is NOT evidence of timestamp manipulation or corruption. The detect_timestomping tool encountered an error and could not complete analysis, but manual verification confirms the date is valid. In the context of this NIST test image, the Feb 29 leap-year date appears to be a deliberate test case for forensic tool date-parsing accuracy. The FAT content allocation table (fsstat) shows no entries for sectors 8195-8196, which is consistent with the file's deleted status—its cluster chain has been freed.



### 3. [INFO] Allocated Files: Algol.txt and Canopus.txt on FAT32 Partition

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 1999-01-01T02:01:00 |
| **Sources** | tsk.filelist, tsk.metadata.5, tsk.metadata.9, tsk.timeline |
| **Evidence Refs** | tc_bcf735ef, tc_9bf2f331, tc_813f928b, tc_5a51969f |


Two allocated (not deleted) files were identified on the FAT32 partition (partition 3, volume label "32FAT"):

**1. Algol.txt** (directory entry/inode 5)
- Status: Allocated
- Size: 512 bytes
- Short name: ALGOL.TXT
- Sector: 8194 (one 512-byte sector)
- Timestamps:
  - Written (last modified): 1999-01-01 02:01:00 UTC
  - Accessed: 1999-01-01 00:00:00 UTC
  - Created: 2011-12-25 14:02:24 UTC
- File attributes: File, Archive

**2. Canopus.txt** (directory entry/inode 9)
- Status: Allocated
- Size: 512 bytes
- Short name: CANOPUS.TXT
- Sector: 8197 (one 512-byte sector)
- Timestamps:
  - Written (last modified): 1999-01-01 02:01:00 UTC
  - Accessed: 1999-01-01 00:00:00 UTC
  - Created: 2011-12-25 14:02:24 UTC
- File attributes: File, Archive

Both files share identical creation timestamps (2011-12-25 14:02:24 UTC) and identical modification timestamps (1999-01-01 02:01:00 UTC), suggesting they were copied to this partition at the same time from source files originally modified on 1999-01-01. The creation date being later than the modification date is consistent with FAT filesystem behavior where the "Created" timestamp reflects when the file was created on THIS volume (i.e., copied to the drive on 2011-12-25), while the "Written" timestamp was preserved from the original source.



### 4. [INFO] No Extension/Content Mismatches (Masquerading) Detected

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | tsk.masquerade |
| **Evidence Refs** | tc_0256bbe5 |


The masquerade detection scan (tsk.masquerade) returned zero results across all files on the FAT32 partition (partition 3). This means none of the files on the FAT32 partition have an extension that conflicts with their actual content type as determined by file signature analysis.

The three user files (Algol.txt, Bellatrix.txt, Canopus.txt) all have .txt extensions, and no content-type mismatch was identified for any of them.

**Scope limitation**: This analysis only covers the FAT32 partition (partition 3). Partitions 1 (FAT12) and 2 (FAT16) were not analyzed for file masquerading. The statement applies only to the FAT32 volume, not the entire drive.



### 5. [INFO] No Significant Residual Data in Unallocated Space

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Sources** | bulk.bulk_extractor, yara.files |
| **Evidence Refs** | tc_f63f725a, tc_9ae29b31 |


Bulk Extractor was run against the entire disk image (dfr-01-fat.dd, 1,073,742,336 bytes) to scan for residual data in unallocated space, file slack, and other areas. The scan produced only a diagnostic initialization message and no substantive findings.

Specifically, Bulk Extractor found:
- No email addresses
- No URLs
- No credit card numbers
- No telephone numbers
- No domain names
- No other structured data fragments

This indicates the unallocated space (including the ~964 MB of unallocated space after the last partition and any slack space within the FAT32 partition) does not contain recognizable remnants of previously deleted content beyond what is already visible in the FAT directory entries.

Additionally, YARA scanning of extracted files produced zero matches, confirming no known malware signatures or suspicious patterns were found in any file content.



### 6. [INFO] Volume Label and File System Creation Timeline

| | |
|---|---|
| **Severity** | INFO |
| **Confidence** | confirmed |
| **Time** | 2011-12-25T12:59:44 to 2011-12-25T14:02:24 |
| **Sources** | tsk.metadata.3, tsk.fsstat, hashdeep.hashes |
| **Evidence Refs** | tc_8ed39d5c, tc_75772f5d, tc_f4bd2458 |


The FAT32 partition has a volume label directory entry "32FAT" (inode 3) with the following metadata:
- Written (last modified): 2011-12-25 12:59:44 UTC
- File attributes: Volume Label
- Size: 0

This volume label timestamp establishes the partition creation or last formatting as occurring on **December 25, 2011 at 12:59:44 UTC**.

All three user files (Algol.txt, Bellatrix.txt, Canopus.txt) share the same creation timestamp of 2011-12-25 14:02:24 UTC, which is approximately 1 hour and 3 minutes after the volume label was written. This suggests the partition was formatted at 12:59:44 and the files were copied to it at 14:02:24 on the same date.

The FAT content allocation table (from fsstat) shows only three allocated chains:
- Sector 8192: Root directory (1 sector) → EOF
- Sector 8194: Algol.txt (1 sector) → EOF
- Sector 8197: Canopus.txt (1 sector) → EOF

**Notably absent from the FAT**: Sectors 8195-8196, which the directory entry for Bellatrix.txt (inode 7, from istat) identifies as her allocated sectors. Their absence from the FAT is consistent with the file's deleted status — the cluster chain was freed upon deletion while the directory entry still retains the sector references. This means Bellatrix.txt's data sectors are marked free and could be overwritten by new allocations, but currently remain intact and potentially recoverable.

The FS Info "Next Free Sector" hint points to sector 8197, which is actually Canopus.txt's allocated sector. In FAT32, this hint is advisory (tells the OS where to start searching for free clusters) and is commonly stale; it does not indicate corruption.

Disk image integrity hash (hashdeep):
- MD5: 17290b62146aabe5c0e94d1eda39e31c
- SHA256: 5d5bf8fb15a1df463fb0b9c0a958c05ece30941af40545f895131ff0daf32fab



---

## Appendix B: Indicators of Compromise

### Network IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No network IOCs extracted | | |


### File IOCs

| Type | Value | Enrichment | Context |
|------|-------|------------|---------|
| | No file IOCs extracted | | |






---

## Appendix D: Audit Trail and Token Usage

| Metric | Value |
|--------|-------|
| Total tool calls | 200 |
| Findings submitted | 6 |
| Confirmed | 6 |
| Inferences | 0 |
| Input tokens | 14.0K |
| Output tokens | 61.4K |
| Total tokens | 75.4K |
| Audit log | /home/mulder/.mulder/cases/nist-dfr-01-fat.audit.jsonl |


### Token Usage by Model

| Model | Input | Output | Total |
|-------|-------|--------|-------|
| claude-haiku-4-5 | 150 | 14.5K | 14.7K |
| claude-opus-4-6 | 13.8K | 46.9K | 60.7K |




<details>
<summary>Evidence Sources (16)</summary>

| Source | Extractor | Lines |
|--------|-----------|-------|
| tsk.fsstat | sleuthkit | 42 |
| tsk.filelist | sleuthkit | 8 |
| tsk.masquerade | sleuthkit | 0 |
| tsk.partitions | sleuthkit | 11 |
| bulk.bulk_extractor | bulk_extractor | 1 |
| tsk.timeline | sleuthkit | 15 |
| hashdeep.hashes | hashdeep | 6 |
| tsk.metadata.5 | istat | 13 |
| tsk.metadata.7 | istat | 13 |
| tsk.metadata.9 | istat | 13 |
| tsk.metadata.3 | istat | 12 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |
| composite.correlation | composite | 1 |


</details>


---

*Report generated by [Mulder](https://github.com/calebevans/mulder) via MCP*
