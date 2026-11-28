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
# servers/trudi/variants/<variant>.env. A variant that sets TARGET is built
# from that stage (below the trudi stage); the others get the trudi stage
# unchanged, through the last line.

ARG BASE_IMAGE
FROM ${BASE_IMAGE} AS trudi

ARG REF
ARG PATCHES=""
ARG REPO=https://github.com/nebulae/trudi.git

# flare-floss builds a C++ extension (binary2strings): g++ here, and below a
# uv-managed Python 3.12, which has the headers the image's own Python lacks.
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y -qq --no-install-recommends g++ >/dev/null \
    && rm -rf /var/lib/apt/lists/*

# trudi calls RegRipper as /usr/local/bin/rip.pl (the SIFT path); the release
# image has it under /usr/lib/regripper.
RUN ln -sf /usr/lib/regripper/rip.pl /usr/local/bin/rip.pl

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

# TARGET=fastmcp3: the environment trudi's job tools need, which is likely
# the author's own. fastmcp 3.4.7 instead of 4 (constraints-fastmcp3.txt):
# trudi's job path imports fastmcp.tools.tool, which fastmcp 4 removed. And
# /usr/local/bin/evtx_dump.py, the SIFT path trudi runs python-evtx's
# evtx_dump.py by: the image's python-evtx 0.8.1 wheel lacks its scripts
# package, so evtx_dump.py is taken from the v0.8.1 tag and checked.
FROM trudi AS fastmcp3
COPY servers/trudi/constraints-fastmcp3.txt /tmp/trudi-constraints-fastmcp3.txt
RUN uv pip sync -q --no-cache --python /opt/trudi/.venv/bin/python /tmp/trudi-constraints-fastmcp3.txt
RUN set -eux; \
    curl -fsSL -o /usr/local/bin/evtx_dump.py \
        https://raw.githubusercontent.com/williballenthin/python-evtx/cab997af04b6caae68b306e5c2c40b3aa751454e/scripts/evtx_dump.py; \
    echo "24bb121d10fb662e88b844a555324356e6427313932d3e56ff9825af719e8f24  /usr/local/bin/evtx_dump.py" | sha256sum -c -; \
    chmod 755 /usr/local/bin/evtx_dump.py

# The default image: the trudi stage as it is.
FROM trudi
