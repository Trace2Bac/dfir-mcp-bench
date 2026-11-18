# Shell history files under `/evidence/findevil-scenario-02-histories/fs`

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
| shell history | `fs/home/alice/.bash_history`, `fs/home/deploy/.bash_history`, `fs/root/.bash_history` | ❌ NOT examined |

## ⚠ Coverage gaps (1)

- **shell history** present (`fs/home/alice/.bash_history`, `fs/home/deploy/.bash_history`, `fs/root/.bash_history`) but never examined → run find_shell_histories, then analyze_bash_history on each

**Verdict: 1 GAP(S) REMAIN — keep investigating, then re-run assess_coverage.**
# Shell history — `/evidence/findevil-scenario-02-histories/fs/home/alice/.bash_history`

- **Size:** 123 bytes  |  **Commands:** 6  |  **Timestamped:** 0

No suspicious commands detected in this history.
# Coverage assessment

- **Tool executions recorded:** 3
- **Distinct tools used:** 3

## Artifact coverage

| Artifact class | Location(s) | Status |
|---|---|---|
| shell history | `fs/home/alice/.bash_history`, `fs/home/deploy/.bash_history`, `fs/root/.bash_history` | ⚠ 1 of 3 examined |

## ⚠ Coverage gaps (1)

- **shell history** present (`fs/home/deploy/.bash_history`, `fs/root/.bash_history`) but never examined → run find_shell_histories, then analyze_bash_history on each

**Verdict: 1 GAP(S) REMAIN — keep investigating, then re-run assess_coverage.**
