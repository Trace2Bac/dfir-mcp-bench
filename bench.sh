#!/usr/bin/env bash
# Entry point for preparing data, building server variants and running cases.
# Every step runs in Docker; the host needs only Docker and a model server.
#
#   ./bench.sh prepare <dataset>                      download or generate evidence
#   ./bench.sh build   <variant>                      build a server variant image
#   ./bench.sh run     <case> [label...] [--repeat N] [--scripted]
#                                                     run a case on its variants (all labels in
#                                                     case.yaml if none given), N times each
#   ./bench.sh summary <case>                         compare labels and models over all runs
#   ./bench.sh check   [case...]                      scripted runs must match scripted_expect
#                                                     (all cases if none given)
#
# Model settings come from .env (copy .env.example); variables set on the
# command line take precedence.
# Results go to results/<case>/<label>/<model>/run-<n>/, and the comparison to
# results/<case>/summary.md.
set -euo pipefail
cd "$(dirname "$0")"
ROOT=$PWD
# Where runs are written. `check` points this at .check/ so that it never
# touches the published results.
RESULTS=${BENCH_RESULTS_DIR:-results}

# Image used by `prepare`. Pinned by digest so every machine fetches and
# generates evidence with the same tools.
TOOLS_IMAGE=ghcr.io/calebevans/mulder:1.5.10@sha256:b14737ebf9c4cb155e00ebe617d615db25840bdc55a3ca619c99647131550cfb

usage() { sed -n '2,18p' "$0" | sed 's/^# \{0,1\}//'; exit 1; }

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

# Print "label variant" for each entry under `variants:` in a case.yaml.
case_variants() {
    awk '/^variants:/ {on=1; next} on && /^[^ #]/ {on=0}
         on && /^ +[A-Za-z0-9_-]+:/ {sub(/#.*/, ""); sub(/:/, " "); print $1, $2}' "$1"
}

# Write results/<case>/summary.md, listing labels in case.yaml order.
summarize() {
    [ -d "$RESULTS/$1" ] || { echo "no results for $1" >&2; exit 1; }
    # shellcheck disable=SC2046
    in_tools env PYTHONPATH=runner python3 -m bench summary "$RESULTS/$1" \
        --labels $(case_variants "cases/$1/case.yaml" | cut -d' ' -f1)
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
    synthetic-dns-smtp) in_tools python3 datasets/synthetic-dns-smtp/make_pcap.py data/evidence/synthetic-dns-smtp/sample.pcap ;;
    *) echo "unknown dataset: $ds" >&2; exit 1 ;;
    esac
    ;;
build)
    build "${1:?variant}"
    ;;
run)
    c=${1:?case}; shift
    yaml="cases/$c/case.yaml"
    [ -f "$yaml" ] || { echo "no such case: $c (see cases/)" >&2; exit 1; }
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
    pairs=$(case_variants "$yaml")
    [ -n "$pairs" ] || { echo "$yaml lists no variants" >&2; exit 1; }
    if [ ${#labels[@]} -eq 0 ]; then
        while read -r l _; do labels+=("$l"); done <<< "$pairs"
    fi
    load_env
    mkdir -p "$RESULTS"
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
                -v "$ROOT/$RESULTS:/results" \
                "$image" \
                python3 -m bench run "/cases/$c/case.yaml" --variant "$v" --label "$label" --run-id "$i" \
                ${flags[@]+"${flags[@]}"} || echo "run $i of $label failed (exit $?)" >&2
        done
    done
    summarize "$c"
    ;;
summary)
    summarize "${1:?case}"
    ;;
check)
    [ $# -gt 0 ] || set -- cases/*/
    set -- "${@#cases/}"; set -- "${@%/}"
    failed=0
    rm -rf .check
    for c in "$@"; do
        BENCH_RESULTS_DIR=.check "$0" run "$c" --scripted >/dev/null 2>&1 || true
        in_tools env PYTHONPATH=runner python3 -m bench check "cases/$c/case.yaml" ".check/$c" || failed=1
    done
    exit "$failed"
    ;;
*) usage ;;
esac
