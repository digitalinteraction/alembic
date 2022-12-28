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
# Lint & build TypeScript
#
npx tsc

#
# Build resources
#
npx esbuild --bundle --format=esm --platform=browser --outdir=dist \
  reset=src/lib/reset.css \
  everything=src/everything.css \

#
# Build 11ty
#
npx esbuild --bundle --format=cjs --platform=node --outdir=dist \
  --out-extension:.js=.cjs \
  11ty=src/11ty.ts

#
# Build the docs pages
#   --config is needed until https://github.com/11ty/eleventy/issues/1029
# 
npx eleventy \
  --config=.eleventy.cjs \
  --pathprefix=$PATH_PREFIX
