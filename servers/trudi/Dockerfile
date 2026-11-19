# One trudi variant: trudi's source at REF with the listed patches,
# installed in its own virtualenv (requirements.txt, at the versions in
# constraints.txt, since trudi pins none) on top of BASE_IMAGE.
#
# trudi publishes no image. BASE_IMAGE is mulder's release image, used only
# for what every claude-code run shares: the Claude Code binary bundled with
# its Claude Agent SDK, Python 3.12, uv and the entrypoint that runs as the
# mulder user. mulder itself is not used.
#
# Built by `./bench.sh build <variant>`, which reads the build arguments from
# servers/trudi/variants/<variant>.env.

ARG BASE_IMAGE
FROM ${BASE_IMAGE}

ARG REF
ARG PATCHES=""
ARG REPO=https://github.com/nebulae/trudi.git

# flare-floss builds a C++ extension (binary2strings): g++ here, and below a
# uv-managed Python 3.12, which has the headers the image's own Python lacks.
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y -qq --no-install-recommends g++ >/dev/null \
    && rm -rf /var/lib/apt/lists/*

COPY servers/trudi/patches/ /tmp/bench-patches/
COPY servers/trudi/constraints.txt /tmp/trudi-constraints.txt

RUN set -eux; \
    rm -rf /tmp/src; \
    git init -q /tmp/src; \
    git -C /tmp/src remote add origin "$REPO"; \
    git -C /tmp/src fetch -q --depth 1 origin "$REF"; \
    git -C /tmp/src checkout -q --detach FETCH_HEAD; \
    for p in $PATCHES; do git -C /tmp/src apply "/tmp/bench-patches/$p"; done; \
    git -C /tmp/src rev-parse HEAD > /tmp/src/.bench-ref; \
    rm -rf /opt/trudi; \
    mv /tmp/src /opt/trudi; \
    UV_PYTHON_INSTALL_DIR=/opt/uv-python uv venv -q /opt/trudi/.venv --python 3.12 --python-preference only-managed; \
    uv pip install -q --no-cache --python /opt/trudi/.venv/bin/python -r /opt/trudi/requirements.txt \
        -c /tmp/trudi-constraints.txt

COPY runner/ /opt/bench-runner/
ENV PYTHONPATH=/opt/bench-runner
