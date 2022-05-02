#!/usr/bin/env sh

set -e

mkdir -p dist

PARCEL_CSS_ARGS="--bundle"
ESBUILD_ARGS="--bundle --format=esm --platform=browser"

# Build module entrypoint
# npx esbuild $ESBUILD_ARGS src/module.js --outfile=dist/module.js

# Build docs
# npx parcel-css $PARCEL_CSS_ARGS src/docs/docs.css -o dist/docs.css
# npx esbuild $ESBUILD_ARGS src/docs/docs.js --outfile=dist/docs.js

# Build layouts
# npx parcel-css $PARCEL_CSS_ARGS src/layouts/layouts.css -o dist/layouts.css
# npx esbuild $ESBUILD_ARGS src/layouts/layouts.js --outfile=dist/layouts.js

# Build library
# npx parcel-css $PARCEL_CSS_ARGS src/lib/reset.css -o dist/reset.css
# npx esbuild $ESBUILD_ARGS src/lib/lib.js --outfile=dist/lib.js

#
#
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
# 

# --config is needed until https://github.com/11ty/eleventy/issues/1029
npx eleventy --config=.eleventy.cjs
