{
  "tool_call_id": "tc_a0f53a93",
  "status": "success",
  "source": "pcap",
  "preview": "[{\"source_name\": \"pcap.dns\", \"source_id\": 1, \"windows_indexed\": 1, \"line_count\": 3, \"status\": \"indexed\"}]",
  "hint": "Full output indexed as 'pcap'. Use search(query, source='pcap') or get_raw_output('pcap') to access."
}
{
  "tool_call_id": "tc_503aa1ee",
  "status": "success",
  "source": "pcap",
  "preview": "[{\"source_name\": \"pcap.smtp\", \"source_id\": 2, \"windows_indexed\": 1, \"line_count\": 8, \"status\": \"indexed\"}]",
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
  "raw_text": "frame.time\tip.src\tip.dst\tdns.qry.name\tdns.a\nNov 14, 2023 22:13:20.000000000 UTC\t10.0.0.5\t8.8.8.8\texample.com\t\nNov 14, 2023 22:13:21.000000000 UTC\t8.8.8.8\t10.0.0.5\texample.com\t93.184.216.34",
  "tool_call_id": "tc_92c8dc0f"
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
  "raw_text": "frame.time\tip.src\tip.dst\tsmtp.req.parameter\tsmtp.rsp.parameter\nNov 14, 2023 22:13:25.000000000 UTC\t10.0.0.25\t10.0.0.5\t\tmail.example.com ESMTP ready\nNov 14, 2023 22:13:26.000000000 UTC\t10.0.0.5\t10.0.0.25\tclient.example.com\t\nNov 14, 2023 22:13:27.000000000 UTC\t10.0.0.25\t10.0.0.5\t\tmail.example.com Hello\nNov 14, 2023 22:13:28.000000000 UTC\t10.0.0.5\t10.0.0.25\tFROM:<jean@m57.biz>\t\nNov 14, 2023 22:13:29.000000000 UTC\t10.0.0.25\t10.0.0.5\t\t2.1.0 Sender OK\nNov 14, 2023 22:13:30.000000000 UTC\t10.0.0.5\t10.0.0.25\tTO:<alison@example.com>\t\nNov 14, 2023 22:13:31.000000000 UTC\t10.0.0.25\t10.0.0.5\t\t2.1.5 Recipient OK",
  "tool_call_id": "tc_77e6a778"
}
