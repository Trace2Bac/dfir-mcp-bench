Both images have `run_fls` and `run_mmls` completed. The remaining tools (`run_bulk_extractor`, `yara_scan_files`, `run_plaso`, `detect_steganography`, `run_optical_listing`) are not applicable to this deleted-file-inventory task — they address IOC carving, malware scanning, timeline generation, steganography, and optical media respectively.

---

# Forensic Report — NIST CFTT DFR Deleted File Recovery

## Case ID: nist-dfr-deleted-files

## Evidence Analyzed

| Image | Type | Partitions |
|---|---|---|
| `dfr-01-fat.dd` | Disk image (1.0 GB) | FAT12, FAT16, FAT32 |
| `dfr-02-ntfs.dd` | Disk image (1.0 GB) | NTFS |

## Methodology

Each disk image was processed with `run_mmls` to discover partition layout, then `run_fls` was run against every partition to produce recursive file listings. Deleted files are identified by the `*` marker in the fls output. For the FAT image, all three partitions (FAT12 at sector 128, FAT16 at sector 16512, FAT32 at sector 82048) were enumerated separately.

## Findings by Image

### Image 1: dfr-01-fat.dd

**FAT12 Partition** (sectors 128–16511, volume label "FAT12"):
- Allocated files: `XALTIR.TXT`, `XCAPH.TXT`
- **Deleted file: `_BEID.TXT`** (inode 5; first character replaced by FAT deletion marker `0xE5`, shown as `_` by fls)

**FAT16 Partition** (sectors 16512–82047, volume label "FAT16"):
- Allocated files: `Alcor.TXT`, `Capella.txt`
- **Deleted file: `Betelgeuse.txt`** (inode 8)

**FAT32 Partition** (sectors 82048–213119, volume label "32FAT"):
- Allocated files: `Algol.txt`, `Canopus.txt`
- **Deleted file: `Bellatrix.txt`** (inode 7)

### Image 2: dfr-02-ntfs.dd

**NTFS Partition** (sectors 61–586941):
- Allocated files: `Arcturus.txt` (MFT 35), `Castor.txt` (MFT 37), `Duhr.TXT` (MFT 38)
- **Deleted file: `Bunda.txt`** (MFT entry 36-128-3)
- A stale deleted directory entry for `Duhr.TXT` exists at MFT 0 (the original MFT entry was reallocated), but `Duhr.TXT` itself remains allocated under MFT 38 — it is not a deleted file.
- Orphan MFT entries 16–23 are reserved NTFS system metadata slots, not user data files.

## Tools Not Run (Justification)

- `run_bulk_extractor`, `yara_scan_files`, `run_plaso`, `detect_steganography`, `run_optical_listing` — not applicable to a deleted-file inventory task. These images are not optical media, and the scope is limited to identifying deleted files, not malware, IOCs, timelines, or hidden data.

## Case Questions

Case Q1: The deleted files on each disk image are as follows:

**dfr-01-fat.dd:**
- FAT12 partition: `_BEID.TXT` (first character is the FAT deletion marker replacing the original character)
- FAT16 partition: `Betelgeuse.txt`
- FAT32 partition: `Bellatrix.txt`

**dfr-02-ntfs.dd:**
- NTFS partition: `Bunda.txt`