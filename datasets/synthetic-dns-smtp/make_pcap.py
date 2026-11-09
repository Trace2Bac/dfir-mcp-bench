"""Write a pcap with one DNS query/response and a short SMTP exchange.

DNS:  10.0.0.5 -> 8.8.8.8  example.com A?   answer 93.184.216.34
SMTP: 10.0.0.5 <-> 10.0.0.25:25  220 / EHLO / 250 / MAIL FROM / 250 / RCPT TO / 250

Usage:
    python3 datasets/synthetic-dns-smtp/make_pcap.py data/evidence/synthetic-dns-smtp/sample.pcap
"""

from __future__ import annotations

import struct
import sys
from pathlib import Path

OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("data/evidence/synthetic-dns-smtp/sample.pcap")
CLIENT, DNS_SERVER, MAIL_SERVER = "10.0.0.5", "8.8.8.8", "10.0.0.25"


def ip4(addr: str) -> bytes:
    return bytes(int(x) for x in addr.split("."))


def checksum(data: bytes) -> int:
    if len(data) % 2:
        data += b"\0"
    s = sum(struct.unpack(f"!{len(data) // 2}H", data))
    s = (s >> 16) + (s & 0xFFFF)
    s += s >> 16
    return ~s & 0xFFFF


def ipv4(src: str, dst: str, proto: int, payload: bytes) -> bytes:
    hdr = struct.pack("!BBHHHBBH4s4s", 0x45, 0, 20 + len(payload), 1, 0, 64, proto, 0, ip4(src), ip4(dst))
    hdr = hdr[:10] + struct.pack("!H", checksum(hdr)) + hdr[12:]
    return hdr + payload


def ether(ip_packet: bytes) -> bytes:
    return b"\x00\x11\x22\x33\x44\x55" + b"\x66\x77\x88\x99\xaa\xbb" + b"\x08\x00" + ip_packet


def udp(src: str, dst: str, sport: int, dport: int, data: bytes) -> bytes:
    return ether(ipv4(src, dst, 17, struct.pack("!HHHH", sport, dport, 8 + len(data), 0) + data))


def tcp(src: str, dst: str, sport: int, dport: int, seq: int, ack: int, flags: int, data: bytes = b"") -> bytes:
    seg = struct.pack("!HHIIBBHHH", sport, dport, seq, ack, 5 << 4, flags, 65535, 0, 0) + data
    pseudo = ip4(src) + ip4(dst) + struct.pack("!BBH", 0, 6, len(seg))
    seg = seg[:16] + struct.pack("!H", checksum(pseudo + seg)) + seg[18:]
    return ether(ipv4(src, dst, 6, seg))


def dns_packets() -> list[bytes]:
    question = b"\x07example\x03com\x00" + struct.pack("!HH", 1, 1)
    query = struct.pack("!HHHHHH", 0x1234, 0x0100, 1, 0, 0, 0) + question
    answer = b"\xc0\x0c" + struct.pack("!HHIH", 1, 1, 300, 4) + ip4("93.184.216.34")
    response = struct.pack("!HHHHHH", 0x1234, 0x8180, 1, 1, 0, 0) + question + answer
    return [udp(CLIENT, DNS_SERVER, 40000, 53, query), udp(DNS_SERVER, CLIENT, 53, 40000, response)]


def smtp_packets() -> list[bytes]:
    syn, ack, psh_ack = 0x02, 0x10, 0x18
    c_seq, s_seq = 1000, 5000
    pkts = [
        tcp(CLIENT, MAIL_SERVER, 50000, 25, c_seq, 0, syn),
        tcp(MAIL_SERVER, CLIENT, 25, 50000, s_seq, c_seq + 1, syn | ack),
        tcp(CLIENT, MAIL_SERVER, 50000, 25, c_seq + 1, s_seq + 1, ack),
    ]
    c_seq, s_seq = c_seq + 1, s_seq + 1
    dialog = [
        ("S", b"220 mail.example.com ESMTP ready\r\n"),
        ("C", b"EHLO client.example.com\r\n"),
        ("S", b"250 mail.example.com Hello\r\n"),
        ("C", b"MAIL FROM:<jean@m57.biz>\r\n"),
        ("S", b"250 2.1.0 Sender OK\r\n"),
        ("C", b"RCPT TO:<alison@example.com>\r\n"),
        ("S", b"250 2.1.5 Recipient OK\r\n"),
    ]
    for side, data in dialog:
        if side == "S":
            pkts.append(tcp(MAIL_SERVER, CLIENT, 25, 50000, s_seq, c_seq, psh_ack, data))
            s_seq += len(data)
        else:
            pkts.append(tcp(CLIENT, MAIL_SERVER, 50000, 25, c_seq, s_seq, psh_ack, data))
            c_seq += len(data)
    return pkts


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    with OUT.open("wb") as f:
        f.write(struct.pack("<IHHiIII", 0xA1B2C3D4, 2, 4, 0, 0, 65535, 1))
        for i, pkt in enumerate(dns_packets() + smtp_packets()):
            f.write(struct.pack("<IIII", 1700000000 + i, 0, len(pkt), len(pkt)) + pkt)
    print(f"wrote {OUT}")


if __name__ == "__main__":
    main()
