Three Linux servers may have been accessed by an outsider over SSH. Their
auth logs were collected, one folder per host, in ${EVIDENCE}. Before the
servers are handed back, every host's auth log has to be checked with
auth_summary, and the report must say which hosts were checked.
