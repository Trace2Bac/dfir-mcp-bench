---
title: 실행과 검토
sidebar_position: 2
---

# 실행과 검토

## 처음 실행하기 전에

1. Docker를 설치합니다. scripted 실행과 `mulder investigate`는 이것만 있으면 됩니다.
   Claude로 `mulder investigate`를 돌릴 때는 `ANTHROPIC_API_KEY`도 필요합니다.
2. 증거를 한 번 준비합니다.
   ```
   ./bench.sh prepare synthetic-dns-smtp
   ./bench.sh prepare rhino-hunt
   ./bench.sh prepare nist-cftt-dfr
   ./bench.sh prepare nist-hacking-case      # 약 1GB
   ```
3. 로컬 모델 실행에만 필요: LM Studio를 설치하고, 모델을 컨텍스트 길이 32768 이상으로
   로드한 뒤 서버를 켭니다 (Developer 탭, 포트 1234). 그다음 `cp .env.example .env`로
   `MODEL_NAME`을 설정합니다 (예: `qwen/qwen3.5-9b`).

## 실행

실행 단위는 *검증*(`experiments/EXP-<nnn>/`)입니다. 검증에 케이스와 라벨별 서버 variant가
적혀 있습니다.

```
./bench.sh run EXP-001 --scripted                               # 모든 라벨, 모델 없음
./bench.sh run EXP-001 after                                    # 라벨 하나, 모델 실행 한 번
MODEL_REASONING_EFFORT=none ./bench.sh run EXP-001 --repeat 5   # 생각 끔, 라벨마다 5번
```

모델 실행에는 LM Studio가 필요합니다 (위 3번). `--scripted`는 모델이 필요 없습니다.
`mulder investigate`로 돌리는 검증은 아래를 보세요.

터미널에 진행 과정이 바로 나옵니다. 모델의 턴, 호출한 도구, 도구가 돌려준 내용의
앞부분이 보입니다. mulder 자체 로그는 실행 폴더의 `server-db/console.log`에 남습니다.
턴 한도에 도달하면 멈추고, 도구 없이 한 번 더 최종 답을 요청합니다.

실행마다 `experiments/EXP-<nnn>/results/<라벨>/<모델>/run-<n>/`에 저장되고, 끝나면
`experiments/EXP-<nnn>/results/summary.md`가 다시 만들어집니다.

## 검토

자동 채점은 기대한 문자열이 답에 들어 있는지만 봅니다. 답을 직접 읽고 판정을 남깁니다.

```
./bench.sh review EXP-001
```

검토하지 않은 모델 실행마다 질문, 기대한 사실, 모델의 답, 자동 결과를 보여 주고
통과(p), 부분(a), 실패(f)와 메모를 묻습니다. 판정은 실행 폴더의 `review.yaml`에
저장되고, `q`를 누르면 저장한 데까지 남기고 멈춥니다. 검토자 이름은 `REVIEWER`나
`git config user.name`에서 가져옵니다. 검토가 있으면 요약과 사이트에서 그 결과가
최종입니다.

## Windows에서 실행

WSL 2를 씁니다. `bench.sh`는 bash 스크립트이고 컨테이너는 Linux입니다.

| 실행 | 필요한 것 |
|---|---|
| `./bench.sh check`, `run --scripted` (모델 없음) | Docker |
| `./bench.sh investigate` (Claude로 `mulder investigate`) | Docker와 `ANTHROPIC_API_KEY`. Claude는 mulder 이미지 안의 Claude Agent SDK로 돕니다 |
| `./bench.sh run` 로컬 모델 | Docker와 LM Studio |

1. Docker Desktop(WSL 2 백엔드)과 WSL 배포판(예: Ubuntu)을 설치합니다. Docker
   Desktop의 *Settings → Resources → WSL integration*에서 그 배포판을 켭니다.
2. 레포는 `/mnt/c`가 아니라 WSL 파일 시스템 안(예: `~/dfir-mcp-bench`)에 받습니다.
   증거 이미지가 커서 경계를 넘는 파일 접근은 느립니다. `.gitattributes`가 줄바꿈을
   LF로 유지하므로, Windows git이 파일을 바꿔도 스크립트가 실행됩니다.
3. WSL 셸에서 실행합니다.
   ```
   ./bench.sh prepare nist-cftt-dfr
   ./bench.sh prepare nist-hacking-case
   ./bench.sh check                # scripted 점수 확인, 모델 없음
   export ANTHROPIC_API_KEY=...    # Claude로 mulder investigate를 돌릴 때
   ./bench.sh investigate EXP-004 --dry-run
   ./bench.sh investigate EXP-004
   ./bench.sh investigate EXP-005   # NIST Hacking Case
   ./bench.sh investigate EXP-006   # 같은 케이스, Sonnet 4.6
   ```
4. 로컬 모델 실행에만 필요: LM Studio를 Windows에서 실행하고(GPU 사용) 서버를 켭니다.
   컨테이너는 `host.docker.internal:1234`로 접속합니다. 연결이 안 되면 *Serve on Local
   Network*를 켭니다. 그다음 `cp .env.example .env`로 `MODEL_NAME`을 설정하고
   `MODEL_REASONING_EFFORT=none ./bench.sh run EXP-003 --repeat 3`을 실행합니다. GPU가
   크면 더 큰 모델을 쓸 수 있고, 결과는 모델 폴더별로 쌓입니다.

## `mulder investigate` 실행

`harness: mulder-investigate`인 검증(예: EXP-002, EXP-004)은 bench-runner 대신 mulder의
다섯 단계 오케스트레이터로 돌립니다. 모델과 effort는 검증의 `harness_options`에서 가져옵니다.

```
export ANTHROPIC_API_KEY=...                 # 이 셸에서만. 파일에는 쓰지 않습니다
./bench.sh investigate EXP-004 --dry-run     # 준비만 하고 명령을 보여 줌. 아무것도 시작하지 않음
./bench.sh investigate EXP-004               # 모든 라벨을 실행하고 결과를 가져옴
```

라벨마다 variant 이미지를 빌드하고, 케이스 증거를 `data/investigate/<검증>/<라벨>/`로
복사하고, 거기에 케이스 briefing과 질문(정답 없음)을 `MULDER.md`로 씁니다. 이것이
mulder가 문서로 안내하는, 조사에 질문을 주는 방법입니다. 그다음 이미지 기본
entrypoint와 `--privileged`로 `mulder investigate`를 실행하고, 결과를 `run-1`로
가져옵니다. 가져오기는 보고서, 감사 로그, 모델 사용량, 로그를 남기고(사건 DB 제외),
보고서를 케이스 질문으로 채점하고, 감사 로그로 실행 기록을 만듭니다. mulder 보고서에는 자체 고정 질문(Q1~Q8)이 있습니다.
`harness_options`에 `answer_section: true`를 두면 브리핑이 케이스 질문을 `Case Q<n>`으로
표시하고, 보고서에 질문마다 한 줄씩 답하는 "Case Questions" 절을 요청합니다. `review`는
그 줄을 질문별 답으로 보여 주고, 채점도 그 줄로 합니다. 그런 줄이 없는 질문은 보고서
전체로 채점합니다. 실제로 넣은 브리핑은 실행 결과(`mulder/MULDER.md`)에
남습니다. 손으로 돌린
실행은 `./bench.sh import <검증> <라벨> <mulder cases 폴더> <case id>`로 가져옵니다.

실행마다 비용이 듭니다. EXP-002은 출력 134.5K 토큰을 썼습니다 (mulder 집계 기준 정가로
약 $3). mulder 집계에는 캐시 읽기·쓰기가 빠져 있으니, 실제 비용은 제공자의 사용량
화면에서 확인합니다.

## mulder 도구로 Claude Code 실행

`harness: claude-code`인 검증(EXP-007)도 같은 명령으로 실행합니다. mulder 이미지에 들어 있는
Claude Code가 대화 없이(`claude -p`) 실행되고, MCP 서버는 `mulder serve` 하나뿐이며 내장 도구는
꺼져 있습니다. 그래서 증거에는 mulder로만 접근합니다. 프롬프트는 하나입니다. `scan_evidence`로
사건을 만들라는 지시와, `MULDER.md`와 같은 브리핑과 `Case Q<n>` 질문입니다. 모델과 effort는
`harness_options`(`model`, `effort`)에서 가져옵니다.

```
./bench.sh login                             # 처음 한 번: Claude 구독으로 로그인
./bench.sh investigate EXP-007 --dry-run     # claude/prompt.md와 claude/mcp.json만 만들고 시작하지 않음
./bench.sh investigate EXP-007
```

터미널에는 도구 호출마다 한 줄씩 나옵니다. stream-json 원본(`claude/stream.jsonl`)은 프롬프트와
함께 실행 기록에 남습니다. 가져오기 단계에서 마지막 메시지를 `Case Q<n>:` 줄로 채점하고, mulder
호출과 결과를 `transcript.jsonl`에 남깁니다. Claude Code의 토큰 수에는 캐시 읽기·쓰기가 포함되고,
`run.json`의 `api_cost_usd`는 같은 토큰을 API로 썼을 때의 가격입니다. 구독은 실행마다 과금되지
않지만 사용 한도에 포함됩니다. 오류로 끝난 실행(로그인 만료, 사용 한도)은 가져오지 않습니다.

`./bench.sh login`은 이미지 안에서 Claude Code의 로그인(`claude auth login`)을 실행합니다. 브라우저로 열
주소를 보여 주고, 거기서 나온 코드를 붙여 넣으라고 합니다. 로그인 정보는 `data/claude/`(`data/` 전체와
같이 git에서 제외)에 남고 모든 실행이 다시 씁니다. `claude setup-token`으로 받은 토큰을
`CLAUDE_CODE_OAUTH_TOKEN`에 넣어도 됩니다.

## 결과 보기와 공개

```
cd web && npm start                  # http://localhost:3000, 한글은 `npm start -- --locale ko`
```

새 결과를 커밋하기 전에 `./bench.sh check`로 scripted 점수가 바뀌지 않았는지
확인합니다. 검증의 `status`와 `conclusion`을 고친 뒤 `experiments/`를 커밋하면
`main`에서 사이트가 다시 빌드됩니다.
