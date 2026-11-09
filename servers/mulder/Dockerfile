# One mulder variant: the upstream release image with its source swapped for
# REF and the listed patches applied. The forensic toolchain in the release
# image is reused as is, so a variant builds in under a minute. If REF changes
# Python dependencies or tool versions, use the release image of that version
# as BASE_IMAGE.
#
# Built by `./bench.sh build <variant>`, which reads the build arguments from
# servers/mulder/variants/<variant>.env.

ARG BASE_IMAGE
FROM ${BASE_IMAGE}

ARG REF
ARG PATCHES=""
ARG REPO=https://github.com/calebevans/mulder.git

COPY servers/mulder/patches/ /tmp/bench-patches/

# REF may be a tag, a commit SHA or refs/pull/N/head.
RUN set -eux; \
    rm -rf /tmp/src; \
    git init -q /tmp/src; \
    git -C /tmp/src remote add origin "$REPO"; \
    git -C /tmp/src fetch -q --depth 1 origin "$REF"; \
    git -C /tmp/src checkout -q --detach FETCH_HEAD; \
    for p in $PATCHES; do git -C /tmp/src apply "/tmp/bench-patches/$p"; done; \
    git -C /tmp/src rev-parse HEAD > /tmp/src/.bench-ref; \
    rm -rf /app; \
    mv /tmp/src /app; \
    uv pip install --system --no-cache -e /app

COPY runner/ /opt/bench-runner/
ENV PYTHONPATH=/opt/bench-runner
