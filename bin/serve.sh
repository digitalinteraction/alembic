#!/usr/bin/env sh

# First run the build
$(dirname "$0")/build.sh

npx eleventy --config=.eleventy.cjs --serve
