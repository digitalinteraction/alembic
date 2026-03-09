#!/usr/bin/env node

import cp from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import util from "node:util";
import { fileURLToPath } from "node:url";

import esbuild from "esbuild";
import { alembicEmbed } from "./esbuild-plugin.js";

const exec = util.promisify(cp.exec);

const { NODE_ENV } = process.env;

const resolve = (file) => new URL(path.join("..", file), import.meta.url);

const resolveToPath = (file) => fileURLToPath(resolve(file));

const places = {
  root: resolve("."),
  dist: resolve("dist"),
};

//
// Clean out "dist" folder in production
//
if (NODE_ENV !== "development") {
  const dist = await fs.stat(places.dist).catch(() => null);

  if (dist && dist.isDirectory) {
    console.debug("Cleaning dist folder %s", places.dist);
    await fs.rm(places.dist, { recursive: true });
  }
}

//
// Copy assets
//
console.debug("Copying assets into dist");
await fs.mkdir(resolve("dist/assets"), { recursive: true });
await fs.cp(resolve("source/assets"), resolve("dist/assets"), {
  recursive: true,
});

//
// Run TypeScript lint + generate types
//
console.debug("Linting TypeScript & generating type definitions");
await exec(`npx tsc`, {
  cwd: resolve("."),
});

//
// Build CSS
//
console.debug("Bundling CSS");
await esbuild.build({
  bundle: true,
  format: "esm",
  platform: "browser",
  outdir: fileURLToPath(places.dist),
  entryPoints: {
    everything: resolveToPath("source/everything.css"),
    labcoat: resolveToPath("source/labcoat/labcoat.css"),
    "docs/docs": resolveToPath("source/docs/docs.css"),
    reset: resolveToPath("source/lib/reset.css"),
  },
});

//
// Build JavaScript
//
console.debug("Bundling JavaScript");
await esbuild.build({
  bundle: true,
  format: "esm",
  platform: "neutral",
  outdir: fileURLToPath(places.dist),
  plugins: [alembicEmbed],
  entryPoints: {
    everything: resolveToPath("source/everything.ts"),
    module: resolveToPath("source/module.ts"),
    tools: resolveToPath("source/tools.ts"),
    "docs/docs": resolveToPath("source/docs/docs.ts"),
  },
});

//
// Build Eleventy Plugin
//
console.debug("Bundle Eleventy Plugin");
await esbuild.build({
  bundle: true,
  format: "esm",
  platform: "node",
  outdir: fileURLToPath(places.dist),
  plugins: [alembicEmbed],
  entryPoints: {
    "11ty": resolveToPath("source/11ty.ts"),
  },
});
