{
  "tool_call_id": "tc_da27f261",
  "status": "success",
  "source": "pcap",
  "preview": "[{\"source_name\": \"pcap.dns\", \"source_id\": 1, \"windows_indexed\": 1, \"line_count\": 2, \"status\": \"indexed\"}]",
  "hint": "Full output indexed as 'pcap'. Use search(query, source='pcap') or get_raw_output('pcap') to access."
}
{
  "tool_call_id": "tc_22a932a5",
  "status": "success",
  "source": "pcap",
  "preview": "[{\"source_name\": \"pcap.smtp\", \"source_id\": 2, \"windows_indexed\": 1, \"line_count\": 2, \"status\": \"indexed\"}]",
  "hint": "Full output indexed as 'pcap'. Use search(query, source='pcap') or get_raw_output('pcap') to access."
}
{
  "status": "success",
  "source_name": "pcap.dns",
  "source_paths": [
    "/evidence/synthetic-dns-smtp/sample.pcap"
  ],
  "total_windows": 1,
  "returned_windows": 1,
  "next_after_id": 1,
  "has_more": false,
  "raw_text": "[tshark error (exit 1): tshark: Some fields aren't valid:\n\tdns.resp.addr]",
  "tool_call_id": "tc_1cb999d0"
}
{
  "status": "success",
  "source_name": "pcap.smtp",
  "source_paths": [
    "/evidence/synthetic-dns-smtp/sample.pcap"
  ],
  "total_windows": 1,
  "returned_windows": 1,
  "next_after_id": 2,
  "has_more": false,
  "raw_text": "[tshark error (exit 1): tshark: Some fields aren't valid:\n\tsmtp.response.parameter]",
  "tool_call_id": "tc_2e772079"
}
