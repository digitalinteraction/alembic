#!/usr/bin/env sh

set -e

mkdir -p dist

if [[ "$NODE_ENV" != "development" ]]
then
  rm -r dist/* > /dev/null || true
fi

PATH_PREFIX=${PATH_PREFIX:-/}

# 
# Copy assets
# 
mkdir -p dist/assets
cp -R src/assets/* dist/assets/

#
# Lint TypeScript & export types
#
npx tsc

#
# Build resources
#
npx esbuild --bundle --format=esm --platform=browser --outdir=dist \
  module=src/module.ts \
  docs=src/docs/docs.css \
  docs=src/docs/docs.js \
  layouts=src/layouts/layouts.css \
  layouts=src/layouts/layouts.ts \
  reset=src/lib/reset.css \
  lib=src/lib/lib.ts \
  everything=src/everything.css \
  everything=src/everything.ts \

#
# Build cjs
#
npx esbuild --bundle --format=cjs --platform=neutral --outdir=dist \
  --out-extension:.js=.cjs \
  module=src/module.ts

#
# Build the docs pages
#   --config is needed until https://github.com/11ty/eleventy/issues/1029
# 
npx eleventy \
  --config=.eleventy.cjs \
  --pathprefix=$PATH_PREFIX
