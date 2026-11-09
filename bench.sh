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
#   ./bench.sh investigate <experiment> [label...] [--dry-run]
#                                                     run `mulder investigate` (harness mulder-investigate)
#                                                     on each label and import it; needs ANTHROPIC_API_KEY
#                                                     in the environment for Claude models
#   ./bench.sh import  <experiment> <label> <mulder-cases-dir> <case-id>
#                                                     record a `mulder investigate` run (harness
#                                                     mulder-investigate) as run-1 of that label
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

usage() { sed -n '2,27p' "$0" | sed 's/^# \{0,1\}//'; exit 1; }

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
in_tools() {
    docker run --rm --entrypoint "" --user "$(id -u):$(id -g)" -e HOME=/tmp \
        -v "$ROOT:/bench" -w /bench "$TOOLS_IMAGE" "$@"
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
    # (other harnesses are recorded with `import`).
    case " ${flags[*]-} " in
    *" --scripted "*) ;;
    *) [ "$harness" = bench-runner ] || { echo "$yaml: harness '$harness' is not run by bench.sh; use import" >&2; exit 1; } ;;
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
    dry=0; labels=()
    for a in "$@"; do case "$a" in --dry-run) dry=1 ;; *) labels+=("$a") ;; esac; done
    set -- ${labels[@]+"${labels[@]}"}
    yaml=$(experiment_file "$e")
    [ "$(yaml_field "$yaml" harness)" = mulder-investigate ] || { echo "$yaml: harness is not mulder-investigate" >&2; exit 1; }
    c=$(yaml_field "$yaml" case)
    folder=$(yaml_field "cases/$c/case.yaml" evidence)
    [ -d "data/evidence/$folder" ] || { echo "no evidence in data/evidence/$folder; run ./bench.sh prepare first" >&2; exit 1; }
    # Model flags from harness_options (models: {planner: .., executor: .., analyst: ..}, effort: ..).
    opts=$(in_tools env PYTHONPATH=runner python3 -m bench investigate-args "$yaml")
    load_env
    if [ "$dry" = 0 ] && [ -z "${ANTHROPIC_API_KEY:-}" ] && echo "$opts" | grep -q claude-; then
        echo "ANTHROPIC_API_KEY is not set; export it in this shell (it is never written to a file)" >&2; exit 1
    fi
    pairs=$(experiment_variants "$yaml")
    [ $# -gt 0 ] || while read -r l _; do set -- "$@" "$l"; done <<< "$pairs"
    for label in "$@"; do
        v=$(echo "$pairs" | awk -v l="$label" '$1 == l {print $2}')
        [ -n "$v" ] || { echo "no label '$label' in $yaml" >&2; exit 1; }
        build "$v" -q >/dev/null
        work="data/investigate/$e/$label"
        rm -rf "$work"; mkdir -p "$work/evidence" "$work/cases"
        cp -R "data/evidence/$folder" "$work/evidence/$folder"
        in_tools env PYTHONPATH=runner python3 -m bench briefing "cases/$c/case.yaml" \
            "$work/evidence/$folder" "/evidence/$folder" >/dev/null
        echo "== $e $label [$v]: mulder investigate /evidence/$folder $c $opts"
        if [ "$dry" = 1 ]; then echo "   dry run: prepared $work (MULDER.md written); nothing started"; continue; fi
        # The image's own entrypoint and --privileged, as mulder documents; the
        # key is passed by name from this shell, not on the command line.
        # shellcheck disable=SC2086
        docker run --rm -t --privileged -e ANTHROPIC_API_KEY \
            -v "$ROOT/$work/evidence:/evidence:ro" \
            -v "$ROOT/$work/cases:/home/mulder/.mulder/cases" \
            "dfir-mcp-bench/mulder:$v" \
            mulder investigate "/evidence/$folder" "$c" $opts || echo "mulder investigate on $label failed (exit $?)" >&2
        "$0" import "$e" "$label" "$work/cases" "$c"
    done
    ;;
import)
    e=$(experiment_id "${1:?experiment}"); label=${2:?label}; src=${3:?mulder cases dir}; cid=${4:?case id}
    yaml=$(experiment_file "$e")
    v=$(experiment_variants "$yaml" | awk -v l="$label" '$1 == l {print $2}')
    [ -n "$v" ] || { echo "no label '$label' in $yaml" >&2; exit 1; }
    base=$(sed -n 's/^BASE_IMAGE=\([^ #]*\).*/\1/p' "$(variant_file "$v")")
    # The variant image when `investigate` built it, else the release image.
    image_id=$(docker image inspect -f '{{.Id}}' "dfir-mcp-bench/mulder:$v" 2>/dev/null \
        || docker image inspect -f '{{.Id}}' "$base" 2>/dev/null || true)
    in_tools env PYTHONPATH=runner python3 -m bench import-investigate "$yaml" "$label" "$src" "$cid" \
        ${image_id:+--image-id "$image_id"}
    summarize "$e"
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
