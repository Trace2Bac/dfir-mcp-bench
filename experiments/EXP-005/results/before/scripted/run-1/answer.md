# Shell history files under `/evidence/findevil-scenario-02/fs`

Found **3** history file(s):

| Path | Owner | Size | Hint |
|------|-------|------|------|
| `root/.bash_history` | root | 80 bytes | ⚠ very short |
| `home/deploy/.bash_history` | deploy | 264 bytes | short |
| `home/alice/.bash_history` | alice | 123 bytes | ⚠ very short |
# Coverage assessment

- **Tool executions recorded:** 1
- **Distinct tools used:** 1

## Artifact coverage

| Artifact class | Location(s) | Status |
|---|---|---|
| auth log (SSH / sudo / useradd) | `auth.log` | ❌ NOT examined |
| SSH authorized_keys | `fs/home/deploy/.ssh/authorized_keys` | ❌ NOT examined |
| sshd_config | `fs/etc/ssh/sshd_config` | ❌ NOT examined |
| sudoers / sudoers.d | `fs/etc/sudoers.d/deploy` | ❌ NOT examined |
| shell history | `fs/home/alice/.bash_history`, `fs/home/deploy/.bash_history`, `fs/root/.bash_history` | ✅ examined |
| filesystem root (persistence surface) | `fs` | ❌ NOT examined |

## ⚠ Coverage gaps (5)

- **auth log (SSH / sudo / useradd)** present (`auth.log`) but never examined → run auth_summary, then auth_failed_logins / auth_successful_logins on it
- **SSH authorized_keys** present (`fs/home/deploy/.ssh/authorized_keys`) but never examined → run analyze_authorized_keys
- **sshd_config** present (`fs/etc/ssh/sshd_config`) but never examined → run analyze_sshd_config
- **sudoers / sudoers.d** present (`fs/etc/sudoers.d/deploy`) but never examined → run analyze_sudoers
- **filesystem root (persistence surface)** present (`fs`) but never examined → run find_persistence against the filesystem root (covers all persistence classes)

**Verdict: 5 GAP(S) REMAIN — keep investigating, then re-run assess_coverage.**
# Shell history — `/evidence/findevil-scenario-02/fs/home/alice/.bash_history`

- **Size:** 123 bytes  |  **Commands:** 6  |  **Timestamped:** 0

No suspicious commands detected in this history.
# Coverage assessment

- **Tool executions recorded:** 3
- **Distinct tools used:** 3

## Artifact coverage

| Artifact class | Location(s) | Status |
|---|---|---|
| auth log (SSH / sudo / useradd) | `auth.log` | ❌ NOT examined |
| SSH authorized_keys | `fs/home/deploy/.ssh/authorized_keys` | ❌ NOT examined |
| sshd_config | `fs/etc/ssh/sshd_config` | ❌ NOT examined |
| sudoers / sudoers.d | `fs/etc/sudoers.d/deploy` | ❌ NOT examined |
| shell history | `fs/home/alice/.bash_history`, `fs/home/deploy/.bash_history`, `fs/root/.bash_history` | ✅ examined |
| filesystem root (persistence surface) | `fs` | ❌ NOT examined |

## ⚠ Coverage gaps (5)

- **auth log (SSH / sudo / useradd)** present (`auth.log`) but never examined → run auth_summary, then auth_failed_logins / auth_successful_logins on it
- **SSH authorized_keys** present (`fs/home/deploy/.ssh/authorized_keys`) but never examined → run analyze_authorized_keys
- **sshd_config** present (`fs/etc/ssh/sshd_config`) but never examined → run analyze_sshd_config
- **sudoers / sudoers.d** present (`fs/etc/sudoers.d/deploy`) but never examined → run analyze_sudoers
- **filesystem root (persistence surface)** present (`fs`) but never examined → run find_persistence against the filesystem root (covers all persistence classes)

**Verdict: 5 GAP(S) REMAIN — keep investigating, then re-run assess_coverage.**
