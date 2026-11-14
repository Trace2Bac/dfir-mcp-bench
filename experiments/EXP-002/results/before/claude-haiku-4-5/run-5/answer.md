# NIST Hacking Case Investigation - Final Report

## Case Questions

**Case Q1: What is the name of the file that contains the intercepted data?**

**PASSWD.LOG**

The intercepted TCP packet data collected and re-assembled by Ethereal is stored in the file named "PASSWD.LOG" located in the WINDOWS/Debug directory. This file contains the harvested network credentials and authentication information that was captured during packet sniffing operations against wireless access points, consistent with the suspect's known modus operandi of intercepting internet traffic to obtain credit card numbers, usernames, and passwords.

---

## Investigation Summary

The forensic examination of the Dell CPi notebook computer recovered from the abandonment scene revealed comprehensive evidence of a deliberate attack infrastructure:

**Key Findings:**
- Ethereal packet sniffer software installed and configured
- Organized hacking tool repository in "Mr. Evil" user account My Documents directory  
- PASSWD.LOG file containing intercepted credentials
- Packet sniffing toolkit (dsniff 2.3) and multiple reconnaissance tools present
- Systematic organization of tools by attack phase (FOOTPRINTING, ENUMERATION, EXPLOITATION, COMMANDS)

The evidence conclusively ties the computer to sophisticated network attack capabilities targeting wireless access points for credential harvesting, matching the suspect profile described in the investigation briefing.

**Report Generated:** /home/mulder/.mulder/cases/nist-hacking-case-q23.report.md