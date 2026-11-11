---
title: 케이스와 검증 추가
sidebar_position: 3
---

# 케이스와 검증 추가

*케이스*는 시험(질문, 도구, 데이터셋)입니다. *검증*은 케이스를 서버 variant들에서 실행하고
결과를 기록합니다. 바꾼 내용에 맞는 케이스가 이미 있으면 새로 만들지 않습니다.

1. **증거.** `datasets/<id>/`에 `dataset.yaml`(출처, 정답지, 파일 해시)과, 파일을
   `data/evidence/<폴더>/`로 내려받거나 만드는 스크립트를 넣습니다. 이 데이터셋을
   `bench.sh prepare`에 추가합니다. 스크립트는 `in_tools`를 통해 릴리스 이미지 안에서
   돌기 때문에, 그 이미지에 있는 것만 씁니다 (bash, python3, curl, md5sum. unzip은 없음).

2. **케이스.** `cases/<id>/case.yaml`을 만듭니다.

   ```yaml
   id: my-case
   evidence: my-folder               # data/evidence 아래 폴더
   setup:                            # 모델이 시작하기 전에 runner가 실행
     - tool: scan_evidence
       args: {evidence_path: "${EVIDENCE}", case_id: "${CASE_ID}"}
   tools: [run_pcap_analysis, get_raw_output, search]   # 모델이 볼 수 있는 도구 전부
   scripted:                         # --scripted에서 쓰는 고정 호출, 모델 없음
     - tool: run_pcap_analysis
       args: {pcap_path: "${EVIDENCE}/x.pcap", mode: dns}
   questions:
     - id: Q1
       text: ...
       expect: {all: [...], any: [...], none: [...]}
       requires_tools: [run_pcap_analysis]        # 모두 호출해야 함
       requires_any_tool: [run_strings, run_fls]  # 또는 이 중 하나 이상
   limits: {max_turns: 20, max_tool_chars: 12000}
   ```

   그리고 모델의 첫 메시지 앞부분이 되는 `briefing.md`를 만듭니다. `${EVIDENCE}`와
   `${CASE_ID}`는 runner가 채웁니다.

3. **도구 목록은 짧게.** mulder의 도구는 약 160개(정의 약 38K 토큰)입니다. 9B 모델은
   3~6개일 때 훨씬 잘합니다. mulder의 추출 도구는 출력을 색인하고 미리보기만 돌려주므로,
   보통 `get_raw_output`이나 `search`도 함께 줘야 합니다.

4. **확인.** 먼저 `--scripted`로 돌립니다. 수정 케이스라면 `after`에서 고정 호출이
   기대한 사실에 모두 닿아야 합니다. 조사 케이스라면 도구로 닿지 않는 사실이 있을 수
   있습니다. 그때 scripted 점수가 모델 실행의 상한이 되고, 케이스의 `purpose`에 어떤
   사실이 왜 닿지 않는지 적습니다. scripted 점수는 검증의 `scripted_expect`에 적어
   둡니다. 그러면 `./bench.sh check`가 점수가 바뀐 것을 알아챕니다.

## 검증 추가

`experiments/EXP-<nnn>/experiment.yaml`을 만듭니다. `EXP-<nnn>`은 다음 번호이고 영구 식별자입니다.
인용에 쓰이므로 이름을 바꾸거나 번호를 다시 쓰지 않습니다. 제목은 바뀌어도 됩니다.

```yaml
title: "Fix verification: pcap dns and smtp field names (calebevans/mulder#274)"
server: mulder
kind: bug-fix                    # bug-fix | feature | ablation | baseline
status: in-progress              # planned | in-progress | done
change: >
  라벨 사이에 무엇이 다른지, 또는 성능 측정 실험이 무엇을 위한 것인지.
links: [https://github.com/calebevans/mulder/pull/274]
case: pcap-dns-smtp              # cases/<id>. 데이터셋은 케이스에 적혀 있음
harness: bench-runner            # 또는 다른 실행 방식. 결과는 직접 넣음
variants:                        # 라벨: servers/mulder/variants/<이름>
  before: mulder-1040615         # 수정 전 커밋
  after: mulder-e74ae6d          # 수정 커밋
scripted_expect:                 # 선택. ./bench.sh check가 확인
  before: {questions: 0/3, facts: 0/4}
  after: {questions: 3/3, facts: 4/4}
conclusion: >
  결과가 보여 주는 것과 그 한계.
```

사이트 한글 페이지용 문장은 `title_ko`, `change_ko`, `conclusion_ko`에 씁니다 (케이스는
`title_ko`, `purpose_ko`, 질문의 `text_ko`). 기본 칸은 영어로 둡니다. 기본값이고, 채점과
모델에게 주는 질문은 이 영어 원문을 씁니다.

기존 기능의 가치를 볼 때는 한 커밋에 variant 두 개를 씁니다. 하나는 패치 없이, 하나는
그 기능을 빼는 패치를 넣어서 만들고, 라벨은 예를 들어 `full`과 `without-<기능>`으로
붙입니다.

## variant 추가

`servers/mulder/variants/<이름>.env`를 만듭니다.

```
BASE_IMAGE=ghcr.io/calebevans/mulder:1.5.10@sha256:...   # 릴리스 이미지, digest로 고정
REF=951e639e9e1a2af84157ba765f6d9b4b96124177              # 커밋 SHA (여기서는 v1.5.10)
PATCHES=my-change.patch                        # servers/mulder/patches/의 파일, 공백으로 구분
```

variant가 움직이지 않도록 태그나 브랜치 이름 대신 커밋 SHA를, 태그만 쓰지 말고
digest를 씁니다. 받은 이미지의 digest는 `docker image inspect`로, 태그의 커밋은
`git ls-remote <repo> refs/tags/<tag>`로 확인합니다. REF가 Python 의존성이나 도구
버전을 바꾸면, 그 버전의 릴리스 이미지를 BASE_IMAGE로 씁니다.
