# One findevil variant: findevil's source at REF with the listed patches,
# installed in its own virtualenv on top of BASE_IMAGE.
#
# findevil publishes no image. BASE_IMAGE is mulder's release image, used only
# for what every claude-code run shares: the Claude Code binary bundled with
# its Claude Agent SDK, Python 3.12, uv and the entrypoint that runs as the
# mulder user. mulder itself is not used. findevil does not pin its mcp
# dependency and fails to start on mcp 2.x, so MCP_VERSION pins it.
# findevil expects the SIFT command line tools; the base image lacks xxd,
# which its hexdump tool runs, so it is installed here.
#
# Built by `./bench.sh build <variant>`, which reads the build arguments from
# servers/findevil/variants/<variant>.env.

ARG BASE_IMAGE
FROM ${BASE_IMAGE}

ARG REF
ARG PATCHES=""
ARG REPO=https://github.com/marlyocat/findevil.git
ARG MCP_VERSION=1.30.0

RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y -qq --no-install-recommends xxd >/dev/null \
    && rm -rf /var/lib/apt/lists/*

COPY servers/findevil/patches/ /tmp/bench-patches/

RUN set -eux; \
    rm -rf /tmp/src; \
    git init -q /tmp/src; \
    git -C /tmp/src remote add origin "$REPO"; \
    git -C /tmp/src fetch -q --depth 1 origin "$REF"; \
    git -C /tmp/src checkout -q --detach FETCH_HEAD; \
    for p in $PATCHES; do git -C /tmp/src apply "/tmp/bench-patches/$p"; done; \
    git -C /tmp/src rev-parse HEAD > /tmp/src/.bench-ref; \
    rm -rf /opt/findevil; \
    mv /tmp/src /opt/findevil; \
    uv venv -q /opt/findevil/.venv --python python3; \
    uv pip install -q --no-cache --python /opt/findevil/.venv/bin/python -e /opt/findevil "mcp==$MCP_VERSION"

COPY runner/ /opt/bench-runner/
ENV PYTHONPATH=/opt/bench-runner
