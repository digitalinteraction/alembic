#!/usr/bin/env sh

set -e

mkdir -p dist

PATH_PREFIX=${PATH_PREFIX:-/}
PARCEL_CSS_ARGS="--bundle"
ESBUILD_ARGS="--bundle --format=esm --platform=browser"

# 
# Copy assets
# 
cp -R src/assets dist/assets/

#
# Build resources
#
npx esbuild $ESBUILD_ARGS \
  --outdir=dist \
  module=src/module.js \
  docs=src/docs/docs.css \
  docs=src/docs/docs.js \
  layouts=src/layouts/layouts.css \
  layouts=src/layouts/layouts.js \
  reset=src/lib/reset.css \
  lib=src/lib/lib.js

#
# Build the docs pages
#   --config is needed until https://github.com/11ty/eleventy/issues/1029
# 
npx eleventy \
  --config=.eleventy.cjs \
  --pathprefix=$PATH_PREFIX

#
# Copy types
#
cp src/module.d.ts dist/module.d.ts
