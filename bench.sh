#!/usr/bin/env bash
# Entry point for preparing data, building server variants and running
# experiments. Every step runs in Docker; the host needs only Docker and a model
# server. An experiment (experiments/EXP-<nnn>/experiment.yaml) names a case,
# a harness and the server variant for each label; EXP-<nnn> is its permanent
# identifier.
#
#   ./bench.sh prepare <dataset>                      download or generate evidence
#   ./bench.sh build   <variant>                      build a server variant image
#   ./bench.sh run     <experiment> [label...] [--repeat N] [--scripted]   (EXP-nnn)
#                                                     run every label (or the ones named), N times each
#   ./bench.sh summary <experiment>                   compare labels and models over all runs
#   ./bench.sh review  <experiment> [model]           review unreviewed model runs, question by question
#   ./bench.sh investigate <experiment> [label...] [--repeat N] [--dry-run]
#                                                     run a whole investigation on each label and import it:
#                                                     `mulder investigate` (harness mulder-investigate; needs
#                                                     ANTHROPIC_API_KEY for Claude models) or Claude Code with
#                                                     `mulder serve` as its tools (harness claude-code; needs
#                                                     `./bench.sh login` once, or CLAUDE_CODE_OAUTH_TOKEN)
#   ./bench.sh login                                  sign Claude Code in to a Claude subscription for the
#                                                     claude-code harness; kept in data/claude/, never committed
#   ./bench.sh import  <experiment> <label> <mulder-cases-dir> <case-id> [n]
#                                                     record a `mulder investigate` run (harness
#                                                     mulder-investigate) as run-<n> of that label
#                                                     (the next free number when n is not given)
#   ./bench.sh check   [experiment...]                scripted runs must match scripted_expect
#                                                     (every experiment that has one if none given)
#
# Model settings come from .env (copy .env.example); variables set on the
# command line take precedence. Results go to
# experiments/EXP-<nnn>/results/<label>/<model>/run-<n>/ and the comparison to
# experiments/EXP-<nnn>/results/summary.md.
set -euo pipefail
cd "$(dirname "$0")"
ROOT=$PWD
# `check` sets this to write its runs to .check/<experiment>/ instead of the
# published results.
CHECK_DIR=${BENCH_CHECK_DIR:-}

# Image used by `prepare`. Pinned by digest so every machine fetches and
# generates evidence with the same tools.
TOOLS_IMAGE=ghcr.io/calebevans/mulder:1.5.10@sha256:b14737ebf9c4cb155e00ebe617d615db25840bdc55a3ca619c99647131550cfb

usage() { sed -n '2,/^set /p' "$0" | grep '^#' | sed 's/^# \{0,1\}//'; exit 1; }

# Export .env settings that are not already set, so a one-off override such as
# `MODEL_REASONING_EFFORT=none ./bench.sh run ...` wins over the file.
load_env() {
    [ -f .env ] || return 0
    local k v
    while IFS='=' read -r k v; do
        case "$k" in ''|\#*) continue ;; esac
        [ -n "${!k+x}" ] || export "$k=$v"
    done < .env
}

variant_file() {
    local f="servers/mulder/variants/$1.env"
    [ -f "$f" ] || { echo "no such variant: $1 (see servers/mulder/variants/)" >&2; exit 1; }
    echo "$f"
}

# Run a command from this repository inside TOOLS_IMAGE, as the host user so
# that files written under data/ stay owned by that user.
# Claude Code as bundled with mulder's Claude Agent SDK in the image.
CLAUDE_BIN=/usr/local/lib/python3.12/dist-packages/claude_agent_sdk/_bundled/claude
# Its sign-in (`./bench.sh login`) lives in data/claude/ on the host. Mounted
# under ~/.mulder, which the image's entrypoint hands to the mulder user.
CLAUDE_CONFIG=/home/mulder/.mulder/claude

in_tools() {
    docker run --rm --entrypoint "" --user "$(id -u):$(id -g)" -e HOME=/tmp \
        -v "$ROOT:/bench" -w /bench "$TOOLS_IMAGE" "$@"
}

# One claude-code run: Claude Code (bundled in the image, so pinned with it)
# runs headless with only mulder's tools, and its stream-json output is kept
# and shown as one line per step. Used by `investigate`.
claude_investigate() {
    local e=$1 label=$2 v=$3 yaml=$4 c=$5 folder=$6 work=$7 opts=$8
    in_tools env PYTHONPATH=runner python3 -m bench claude-prepare "cases/$c/case.yaml" "$yaml" \
        "$work" "/evidence/$folder" "$c"
    echo "== $e $label [$v]: claude -p <$work/claude/prompt.md> $opts, tools: mulder serve only"
    if [ "$dry" = 1 ]; then
        echo "   dry run: prepared $work (claude/prompt.md written); nothing started"
        return
    fi
    # Built-in tools off (--tools ""), mulder's tools allowed without asking.
    # The token is passed by name from this shell, not on the command line.
    # stream-json comes out on stdout: kept as is, and shown one line per step.
    # shellcheck disable=SC2016
    docker run --rm --privileged -e CLAUDE_CODE_OAUTH_TOKEN \
        -e CLAUDE_CONFIG_DIR="$CLAUDE_CONFIG" -v "$ROOT/data/claude:$CLAUDE_CONFIG" \
        -e CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1 -e MCP_TIMEOUT=120000 -e MCP_TOOL_TIMEOUT=7200000 \
        -e OPTS="$opts" \
        -v "$ROOT/$work/evidence:/evidence:ro" \
        -v "$ROOT/$work/cases:/home/mulder/.mulder/cases" \
        -v "$ROOT/$work/claude:/work:ro" \
        "dfir-mcp-bench/mulder:$v" bash -c 'cd /tmp && '"$CLAUDE_BIN"' -p "$(cat /work/prompt.md)" $OPTS \
            --mcp-config /work/mcp.json --strict-mcp-config --tools "" --allowedTools mcp__mulder \
            --no-session-persistence --output-format stream-json --verbose' \
        | tee "$work/claude/stream.jsonl" \
        | docker run --rm -i --entrypoint "" --user "$(id -u):$(id -g)" -e HOME=/tmp \
            -v "$ROOT:/bench" -w /bench -e PYTHONPATH=runner "$TOOLS_IMAGE" python3 -m bench claude-progress \
        || echo "claude on $label exited with a failure" >&2
    # Imported only when Claude Code finished without an error (an API or
    # usage-limit error also ends with a result event, marked is_error).
    if grep '"type":"result"' "$work/claude/stream.jsonl" 2>/dev/null | grep -q '"is_error":false'; then
        local image_id
        image_id=$(docker image inspect -f '{{.Id}}' "dfir-mcp-bench/mulder:$v" 2>/dev/null || true)
        in_tools env PYTHONPATH=runner python3 -m bench import-claude "$yaml" "$label" "$work" "$c" \
            ${image_id:+--image-id "$image_id"}
        summarize "$e"
    else
        echo "no finished result in $work/claude/stream.jsonl; nothing imported" >&2
    fi
}

# Folder of an experiment: experiments/EXP-<nnn>. Accepts EXP-001, EXP-1 or 1.
experiment_id() {
    local n=${1#EXP-}
    [[ $n =~ ^[0-9]+$ ]] || { echo "experiment must be EXP-<number>, got: $1" >&2; exit 1; }
    printf 'EXP-%03d\n' "$((10#$n))"
}

experiment_file() {
    local f="experiments/$1/experiment.yaml"
    [ -f "$f" ] || { echo "no such experiment: $1 (see experiments/)" >&2; exit 1; }
    echo "$f"
}

# Value of a top-level `key: value` line in a YAML file.
yaml_field() {
    awk -v k="$2:" '$1 == k {sub(/^[^:]*:[ ]*/, ""); sub(/[ ]+#.*/, ""); print; exit}' "$1"
}

# Print "label variant" for each entry under `variants:` in an experiment.yaml.
experiment_variants() {
    awk '/^variants:/ {on=1; next} on && /^[^ #]/ {on=0}
         on && /^ +[A-Za-z0-9_-]+:/ {sub(/#.*/, ""); sub(/:/, " "); print $1, $2}' "$1"
}

# Where an experiment's runs are written.
results_dir() {
    if [ -n "$CHECK_DIR" ]; then echo "$CHECK_DIR/$1"; else echo "experiments/$1/results"; fi
}

# Write <results>/summary.md, listing labels in experiment.yaml order.
summarize() {
    local dir; dir=$(results_dir "$1")
    [ -d "$dir" ] || { echo "no results for $1" >&2; exit 1; }
    # shellcheck disable=SC2046
    in_tools env PYTHONPATH=runner python3 -m bench summary "$dir" \
        --labels $(experiment_variants "$(experiment_file "$1")" | cut -d' ' -f1)
}

build() {
    local v=$1; shift
    # shellcheck disable=SC1090
    (set -a; . "$(variant_file "$v")"; set +a
     docker build "$@" -f servers/mulder/Dockerfile \
        --build-arg BASE_IMAGE="$BASE_IMAGE" --build-arg REF="$REF" --build-arg PATCHES="$PATCHES" \
        -t "dfir-mcp-bench/mulder:$v" .)
}

cmd=${1:-}; shift || true
case "$cmd" in
prepare)
    ds=${1:?dataset}
    case "$ds" in
    rhino-hunt) in_tools bash datasets/rhino-hunt/fetch.sh ;;
    nist-cftt-dfr) in_tools bash datasets/nist-cftt-dfr/fetch.sh ;;
    nist-hacking-case) in_tools bash datasets/nist-hacking-case/fetch.sh ;;
    synthetic-dns-smtp) in_tools python3 datasets/synthetic-dns-smtp/make_pcap.py data/evidence/synthetic-dns-smtp/sample.pcap ;;
    *) echo "unknown dataset: $ds" >&2; exit 1 ;;
    esac
    ;;
build)
    build "${1:?variant}"
    ;;
run)
    e=$(experiment_id "${1:?experiment}"); shift
    yaml=$(experiment_file "$e")
    c=$(yaml_field "$yaml" case)
    [ -f "cases/$c/case.yaml" ] || { echo "$yaml: no such case: $c (see cases/)" >&2; exit 1; }
    harness=$(yaml_field "$yaml" harness)
    labels=(); flags=(); repeat=1
    while [ $# -gt 0 ]; do
        case "$1" in
        --repeat) repeat=${2:?--repeat needs a number}; shift ;;
        --repeat=*) repeat=${1#--repeat=} ;;
        -*) flags+=("$1") ;;
        *) labels+=("$1") ;;
        esac
        shift
    done
    # Scripted calls run here for any experiment; model runs only for bench-runner
    # (mulder-investigate experiments use `investigate`).
    case " ${flags[*]-} " in
    *" --scripted "*) ;;
    *) [ "$harness" = bench-runner ] || { echo "$yaml: harness '$harness' is run with ./bench.sh investigate" >&2; exit 1; } ;;
    esac
    pairs=$(experiment_variants "$yaml")
    [ -n "$pairs" ] || { echo "$yaml lists no variants" >&2; exit 1; }
    if [ ${#labels[@]} -eq 0 ]; then
        while read -r l _; do labels+=("$l"); done <<< "$pairs"
    fi
    load_env
    out=$(results_dir "$e")
    mkdir -p "$out"
    for label in "${labels[@]}"; do
        v=$(echo "$pairs" | awk -v l="$label" '$1 == l {print $2}')
        [ -n "$v" ] || { echo "no label '$label' in $yaml (have: $(echo "$pairs" | cut -d' ' -f1 | xargs))" >&2; exit 1; }
        # Rebuilding is a cache hit unless the runner, patches or variant changed,
        # so a run never uses an image built from older runner code.
        build "$v" -q >/dev/null
        image="dfir-mcp-bench/mulder:$v"
        for i in $(seq 1 "$repeat"); do
            # Run as the host user, as `prepare` does, so results/ stays writable
            # and owned by that user on Linux too (the image's entrypoint would
            # switch to its own mulder user).
            docker run --rm --entrypoint "" --user "$(id -u):$(id -g)" -e HOME=/tmp \
                --add-host=host.docker.internal:host-gateway \
                -e MODEL_BASE_URL="${MODEL_BASE_URL:-http://host.docker.internal:1234/v1}" \
                -e MODEL_NAME="${MODEL_NAME:-}" -e MODEL_API_KEY="${MODEL_API_KEY:-lm-studio}" \
                -e TEMPERATURE="${TEMPERATURE:-0}" -e MODEL_TIMEOUT_S="${MODEL_TIMEOUT_S:-900}" \
                -e MODEL_MAX_TOKENS="${MODEL_MAX_TOKENS:-8192}" \
                -e MODEL_REASONING_EFFORT="${MODEL_REASONING_EFFORT:-}" \
                -e BENCH_IMAGE_ID="$(docker image inspect -f '{{.Id}}' "$image")" \
                -v "$ROOT/data/evidence:/evidence:ro" \
                -v "$ROOT/cases:/cases:ro" \
                -v "$ROOT/$out:/results" \
                "$image" \
                python3 -m bench run "/cases/$c/case.yaml" --variant "$v" --label "$label" --run-id "$i" \
                ${flags[@]+"${flags[@]}"} || echo "run $i of $label failed (exit $?)" >&2
        done
    done
    summarize "$e"
    ;;
summary)
    summarize "$(experiment_id "${1:?experiment}")"
    ;;
review)
    e=$(experiment_id "${1:?experiment}")
    yaml=$(experiment_file "$e")
    c=$(yaml_field "$yaml" case)
    dir=$(results_dir "$e")
    [ -d "$dir" ] || { echo "no results for $e" >&2; exit 1; }
    reviewer=${REVIEWER:-}
    [ -n "$reviewer" ] || reviewer=$(git config user.name 2>/dev/null || true)
    docker run --rm -it --entrypoint "" --user "$(id -u):$(id -g)" -e HOME=/tmp \
        -e PYTHONPATH=runner -v "$ROOT:/bench" -w /bench "$TOOLS_IMAGE" \
        python3 -m bench review "cases/$c/case.yaml" "$dir" --reviewer "$reviewer" \
        ${2:+--model "$2"}
    summarize "$e"
    ;;
investigate)
    e=$(experiment_id "${1:?experiment}"); shift
    dry=0; repeat=1; labels=()
    while [ $# -gt 0 ]; do
        case "$1" in
        --dry-run) dry=1 ;;
        --repeat) repeat=${2:?--repeat needs a number}; shift ;;
        *) labels+=("$1") ;;
        esac
        shift
    done
    [ "$dry" = 0 ] || repeat=1
    set -- ${labels[@]+"${labels[@]}"}
    yaml=$(experiment_file "$e")
    harness=$(yaml_field "$yaml" harness)
    case "$harness" in
    mulder-investigate | claude-code) ;;
    *) echo "$yaml: harness '$harness' is not mulder-investigate or claude-code" >&2; exit 1 ;;
    esac
    c=$(yaml_field "$yaml" case)
    folder=$(yaml_field "cases/$c/case.yaml" evidence)
    [ -d "data/evidence/$folder" ] || { echo "no evidence in data/evidence/$folder; run ./bench.sh prepare first" >&2; exit 1; }
    load_env
    if [ "$harness" = claude-code ]; then
        # Model and effort from harness_options (model: .., effort: ..).
        opts=$(in_tools env PYTHONPATH=runner python3 -m bench claude-args "$yaml")
        if [ "$dry" = 0 ] && [ -z "${CLAUDE_CODE_OAUTH_TOKEN:-}" ] && [ ! -f data/claude/.credentials.json ]; then
            echo "Claude Code is not signed in; run ./bench.sh login (or export CLAUDE_CODE_OAUTH_TOKEN)" >&2; exit 1
        fi
    else
        # Model flags from harness_options (models: {planner: .., executor: .., analyst: ..}, effort: ..).
        opts=$(in_tools env PYTHONPATH=runner python3 -m bench investigate-args "$yaml")
        auth=api-key
        if [ -z "${ANTHROPIC_API_KEY:-}" ] && [ -f data/claude/.credentials.json ]; then
            auth=login
        elif [ "$dry" = 0 ] && [ -z "${ANTHROPIC_API_KEY:-}" ] && echo "$opts" | grep -q claude-; then
            echo "ANTHROPIC_API_KEY is not set; export it in this shell (it is never written to a file)" >&2; exit 1
        fi
    fi
    pairs=$(experiment_variants "$yaml")
    [ $# -gt 0 ] || while read -r l _; do set -- "$@" "$l"; done <<< "$pairs"
    # Each label --repeat times in turn; every run is imported as the next run-<n>.
    queue=()
    for label in "$@"; do for ((i = 0; i < repeat; i++)); do queue+=("$label"); done; done
    for label in "${queue[@]}"; do
        v=$(echo "$pairs" | awk -v l="$label" '$1 == l {print $2}')
        [ -n "$v" ] || { echo "no label '$label' in $yaml" >&2; exit 1; }
        build "$v" -q >/dev/null
        work="data/investigate/$e/$label"
        # One investigation per experiment and label at a time: a second one
        # would delete the working copy the first is reading.
        mkdir -p "data/investigate/$e"
        if ! mkdir "$work.lock" 2>/dev/null; then
            echo "$e $label is already running (remove $work.lock if it is not)" >&2; exit 1
        fi
        trap 'rmdir "$work.lock" 2>/dev/null' EXIT
        rm -rf "$work"; mkdir -p "$work/evidence" "$work/cases"
        cp -R "data/evidence/$folder" "$work/evidence/$folder"
        if [ "$harness" = claude-code ]; then
            claude_investigate "$e" "$label" "$v" "$yaml" "$c" "$folder" "$work" "$opts"
            rmdir "$work.lock"; trap - EXIT; continue
        fi
        in_tools env PYTHONPATH=runner python3 -m bench briefing "cases/$c/case.yaml" \
            "$work/evidence/$folder" "/evidence/$folder" --experiment "$yaml" >/dev/null
        cp "$work/evidence/$folder/MULDER.md" "$work/cases/MULDER.md"   # kept with the run
        echo "== $e $label [$v]: mulder investigate /evidence/$folder $c $opts"
        if [ "$dry" = 1 ]; then
            echo "   dry run: prepared $work (MULDER.md written); nothing started"
            rmdir "$work.lock"; trap - EXIT; continue
        fi
        # The image's own entrypoint and --privileged, as mulder documents; the
        # key is passed by name from this shell, not on the command line.
        # Without a key, Claude's own sign-in in data/claude/ is used.
        if [ "$auth" = login ]; then
            sign_in=(-e CLAUDE_CONFIG_DIR="$CLAUDE_CONFIG" -v "$ROOT/data/claude:$CLAUDE_CONFIG")
        else
            sign_in=(-e ANTHROPIC_API_KEY)
        fi
        # shellcheck disable=SC2086
        docker run --rm -t --privileged "${sign_in[@]}" \
            -v "$ROOT/$work/evidence:/evidence:ro" \
            -v "$ROOT/$work/cases:/home/mulder/.mulder/cases" \
            "dfir-mcp-bench/mulder:$v" \
            mulder investigate "/evidence/$folder" "$c" $opts || echo "mulder investigate on $label exited with $?" >&2
        if [ -f "$work/cases/$c.report.md" ]; then
            "$0" import "$e" "$label" "$work/cases" "$c"
        else
            echo "no report in $work/cases; nothing imported (see $work/cases/orchestrator.log)" >&2
        fi
        rmdir "$work.lock"; trap - EXIT
    done
    ;;
import)
    e=$(experiment_id "${1:?experiment}"); label=${2:?label}; src=${3:?mulder cases dir}; cid=${4:?case id}
    run=${5:-}   # run-<n> to write; the next free one when not given
    yaml=$(experiment_file "$e")
    v=$(experiment_variants "$yaml" | awk -v l="$label" '$1 == l {print $2}')
    [ -n "$v" ] || { echo "no label '$label' in $yaml" >&2; exit 1; }
    base=$(sed -n 's/^BASE_IMAGE=\([^ #]*\).*/\1/p' "$(variant_file "$v")")
    # The variant image when `investigate` built it, else the release image.
    image_id=$(docker image inspect -f '{{.Id}}' "dfir-mcp-bench/mulder:$v" 2>/dev/null \
        || docker image inspect -f '{{.Id}}' "$base" 2>/dev/null || true)
    in_tools env PYTHONPATH=runner python3 -m bench import-investigate "$yaml" "$label" "$src" "$cid" \
        ${image_id:+--image-id "$image_id"} ${run:+--run "$run"}
    summarize "$e"
    ;;
login)
    # Claude Code's own sign-in, in the image that runs it; it prints a URL to
    # open in a browser and asks for the code shown there.
    v=mulder-1.5.10
    build "$v" -q >/dev/null
    mkdir -p data/claude
    docker run --rm -it -e CLAUDE_CONFIG_DIR="$CLAUDE_CONFIG" -v "$ROOT/data/claude:$CLAUDE_CONFIG" \
        "dfir-mcp-bench/mulder:$v" bash -c "$CLAUDE_BIN auth login && $CLAUDE_BIN auth status"
    ;;
check)
    if [ $# -eq 0 ]; then
        for f in experiments/*/experiment.yaml; do
            grep -q '^scripted_expect:' "$f" && set -- "$@" "$(basename "$(dirname "$f")")"
        done
    fi
    failed=0
    rm -rf .check
    for e in "$@"; do
        e=$(experiment_id "$e")
        BENCH_CHECK_DIR=.check "$0" run "$e" --scripted >/dev/null 2>&1 || true
        in_tools env PYTHONPATH=runner python3 -m bench check "$(experiment_file "$e")" ".check/$e" || failed=1
    done
    exit "$failed"
    ;;
*) usage ;;
esac
