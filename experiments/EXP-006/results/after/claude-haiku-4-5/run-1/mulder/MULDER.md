# Case Briefing

## Background

'Iaman Informant' was working as a manager of the technology development
division at a famous international company OOO that developed
state-of-the-art technologies and gadgets.

One day, at a place which 'Mr. Informant' visited on business, he received an
offer from 'Spy Conspirator' to leak sensitive information related to the
newest technology. 'Mr. Conspirator' was an employee of a rival company, and
'Mr. Informant' decided to accept the offer for large amounts of money, and
began establishing a detailed leakage plan.

'Mr. Informant' made a deliberate effort to hide the leakage plan. He
discussed it with 'Mr. Conspirator' using an e-mail service like a business
relationship. He also sent samples of confidential information through
personal cloud storage.

After receiving the sample data, 'Mr. Conspirator' asked for the direct
delivery of storage devices that stored the remaining (large amounts of)
data. Eventually, 'Mr. Informant' tried to take his storage devices away, but
he and his devices were detected at the security checkpoint of the company,
and he was suspected of leaking the company data. At the checkpoint his
devices (a USB memory stick and a CD) were briefly checked, with no evidence of
any leakage, and were then transferred to the digital forensics laboratory.

The company's policies: confidential files are kept only on the authorized
external storage devices and the secured network drives; confidential files
may be accessed only from 10:00 to 16:00 with the appropriate permissions;
non-authorized devices may not be carried into the company; every employee
passes the security checkpoint; storage devices (HDD, SSD, USB stick, CD/DVD)
are forbidden there. 'Mr. Informant' had enough authority to bypass the
company's DRM and DLP solutions, was very interested in IT, and had a slight
knowledge of digital forensics.

Find any evidence of the data leakage, and any data that might have been
generated from the suspect's electronic devices.

Evidence (EnCase images):
- /evidence/nist-data-leakage/pc.E01 (segments pc.E01 to pc.E04): the suspect's PC, Windows 7
- /evidence/nist-data-leakage/rm2.E01: removable media RM#2, a USB memory stick
- /evidence/nist-data-leakage/rm3.E01: removable media RM#3, a CD-R

## What We're Looking For

Answer each of these questions in the report, citing the evidence:

- Case Q1: What are the hash values (MD5 & SHA-1) of all images? Does the acquisition and verification hash value match?
- Case Q2: Explain installed OS information in detail. (OS name, install date, registered owner...)
- Case Q3: What is the timezone setting?
- Case Q4: What is the computer name?
- Case Q5: List all accounts in OS except the system accounts: Administrator, Guest, systemprofile, LocalService, NetworkService. (Account name, login count, last logon date...)
- Case Q6: Who was the last user to logon into PC?
- Case Q7: When was the last recorded shutdown date/time?
- Case Q8: Explain the information of network interface(s) with an IP address assigned by DHCP.
- Case Q9: What applications were installed by the suspect after installing OS?
- Case Q10: What web browsers were used?
- Case Q11: What application was used for e-mail communication?
- Case Q12: What was the e-mail account used by the suspect?
- Case Q13: List external storage devices attached to PC.
- Case Q14: What is the IP address of company's shared network drive?
- Case Q15: Find traces related to cloud services on PC. (Service name, log files...)
- Case Q16: What files were deleted from Google Drive? Find the filename and modified timestamp of the file.
- Case Q17: Identify account information for synchronizing Google Drive.
- Case Q18: When did the suspect burn CD-R?
- Case Q19: How and when did the suspect print a resignation file?
- Case Q20: Identify notes stored in the Sticky Note file.
- Case Q21: Examine 'Recycle Bin' data in PC.
- Case Q22: What actions were performed for anti-forensics on PC at the last day '2015-03-25'?
- Case Q23: Recover deleted files from USB drive 'RM#2'.
- Case Q24: What actions were performed for anti-forensics on USB drive 'RM#2'?
- Case Q25: Recover hidden files from the CD-R 'RM#3'. How to determine proper filenames of the original files prior to renaming tasks?

## How to Answer

In the final report, add a section titled "Case Questions". Answer every question above on its own line, starting with its label (Case Q1, Case Q2, ...), and state the answer itself, not only where it can be found. If the evidence does not answer a question, say so on its line. These are separate from the report's own numbered questions.

Case Q1: <answer>
Case Q2: <answer>
...
