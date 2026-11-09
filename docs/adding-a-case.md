---
title: Adding a case
sidebar_position: 2
---

# Adding a case

1. **Evidence.** Add `datasets/<id>/` with a `dataset.yaml` (source, answer
   key, file hashes) and a script that downloads or generates the files into
   `data/evidence/<folder>/`. Add the dataset to `bench.sh prepare`, which
   runs the script in the release image through `in_tools`, so use only what
   that image provides (bash, python3, curl, md5sum; no unzip).

2. **Case.** Add `cases/<id>/case.yaml`:

   ```yaml
   id: my-case
   evidence: my-folder               # under data/evidence
   variants:                         # label: servers/mulder/variants/<name>
     before: mulder-<parent sha>     # the commit before the fix
     after: mulder-<fix sha>         # the fix commit
   setup:                            # run by the runner before the model starts
     - tool: scan_evidence
       args: {evidence_path: "${EVIDENCE}", case_id: "${CASE_ID}"}
   tools: [run_pcap_analysis, get_raw_output, search]   # all the model can see
   scripted:                         # used by --scripted, no model
     - tool: run_pcap_analysis
       args: {pcap_path: "${EVIDENCE}/x.pcap", mode: dns}
   questions:
     - id: Q1
       text: ...
       expect: {all: [...], any: [...], none: [...]}
       requires_tools: [run_pcap_analysis]        # all of these must be called
       requires_any_tool: [run_strings, run_fls]  # or at least one of these
   limits: {max_turns: 20, max_tool_chars: 12000}
   ```

   and `briefing.md`, which opens the model's first message. `${EVIDENCE}`
   and `${CASE_ID}` are filled in by the runner.

3. **Keep the tool list short.** mulder offers about 160 tools (about 38K
   tokens of definitions). A 9B model does far better with three to six.
   Note that mulder's extraction tools index their output and return only a
   preview, so `get_raw_output` or `search` is usually needed as well.

4. **Check it.** Run with `--scripted` first. In a fix case the scripted
   calls should reach every expected fact on `after`. In an investigation
   case some facts may be out of reach of the tools; the scripted score is
   then the ceiling for a model run, and the case's `purpose` should say
   which facts are out of reach and why. Record the scripted scores under
   `scripted_expect` (for example `after: {questions: 3/3, facts: 4/4}`) so
   that `./bench.sh check` notices when they change.

## Adding a variant

Add `servers/mulder/variants/<name>.env`:

```
BASE_IMAGE=ghcr.io/calebevans/mulder:1.5.10@sha256:...   # release image, pinned by digest
REF=951e639e9e1a2af84157ba765f6d9b4b96124177              # commit SHA (here v1.5.10)
PATCHES=my-change.patch                        # files in servers/mulder/patches/, space-separated
```

Use a commit SHA rather than a tag or branch name, and a digest rather than
a bare tag, so the variant does not move. `docker image inspect` shows the
digest of a pulled image; `git ls-remote <repo> refs/tags/<tag>` shows the
commit of a tag.
If REF changes Python dependencies or tool versions, use the release image
of that version as BASE_IMAGE.
