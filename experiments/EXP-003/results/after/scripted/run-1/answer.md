{
  "tool_call_id": "tc_38ade670",
  "status": "success",
  "source": "tsk.filelist",
  "preview": "{\"source_name\": \"tsk.filelist\", \"source_id\": 1, \"windows_indexed\": 1, \"line_count\": 8, \"status\": \"indexed\"}",
  "hint": "Full output indexed as 'tsk.filelist'. Use search(query, source='tsk.filelist') or get_raw_output('tsk.filelist') to access.",
  "line_count": 8,
  "windows_indexed": 1
}
{
  "tool_call_id": "tc_b26738a7",
  "status": "success",
  "evidence_items": 2,
  "total_gaps": 13,
  "coverage": [
    {
      "path": "/evidence/nist-cftt-dfr/dfr-01-fat.dd",
      "artifact_type": "disk_image",
      "tools_run": [
        "run_fls"
      ],
      "tools_not_run": [
        "run_bulk_extractor",
        "run_mmls",
        "yara_scan_files",
        "run_plaso",
        "detect_steganography",
        "run_optical_listing"
      ]
    },
    {
      "path": "/evidence/nist-cftt-dfr/dfr-02-ntfs.dd",
      "artifact_type": "disk_image",
      "tools_run": [],
      "tools_not_run": [
        "run_fls",
        "run_bulk_extractor",
        "run_mmls",
        "yara_scan_files",
        "run_plaso",
        "detect_steganography",
        "run_optical_listing"
      ]
    }
  ],
  "hint": "For each tool in tools_not_run, either run the tool now or document why it was skipped (not applicable, covered by an equivalent tool, etc.)."
}
