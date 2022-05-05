#!/usr/bin/env sh

set -e

mkdir -p dist
rm -r dist/* || true

PATH_PREFIX=${PATH_PREFIX:-/}

# 
# Copy assets
# 
cp -R src/assets dist/assets/

#
# Build resources
#
npx esbuild --bundle --format=esm --platform=browser --outdir=dist \
  module=src/module.js \
  docs=src/docs/docs.css \
  docs=src/docs/docs.js \
  layouts=src/layouts/layouts.css \
  layouts=src/layouts/layouts.js \
  reset=src/lib/reset.css \
  lib=src/lib/lib.js

#
# Build cjs
#
npx esbuild --bundle --format=cjs --platform=neutral --outdir=dist \
  --out-extension:.js=.cjs \
  module=src/module.js \
  fake-dom-env=src/lib/fake-dom-env.js 

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
