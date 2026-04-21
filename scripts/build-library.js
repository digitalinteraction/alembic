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

export async function buildLibrary({
  nuke = false,
  verbose = false,
  lint = true,
} = {}) {
  const log = verbose ? console.debug : () => {};

  //
  // Clean out "dist" folder in production
  //
  if (nuke) {
    const dist = await fs.stat(places.dist).catch(() => null);

    if (dist && dist.isDirectory) {
      log("Cleaning dist folder %s", places.dist);
      await fs.rm(places.dist, { recursive: true });
    }
  }

  //
  // Copy assets
  //
  log("Copying assets into dist");
  await fs.mkdir(resolve("dist/assets"), { recursive: true });
  await fs.cp(resolve("source/assets"), resolve("dist/assets"), {
    recursive: true,
  });

  //
  // Run TypeScript lint + generate types
  //
  if (lint) {
    log("Linting TypeScript & generating type definitions");
    await exec(`npx tsc`, { cwd: resolve(".") });
  }

  //
  // Build CSS
  //
  log("Bundling CSS");
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
  log("Bundling JavaScript");
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
  log("Bundle Eleventy Plugin");
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
}

if (import.meta.main) {
  await buildLibrary({
    nuke: NODE_ENV !== "development",
    verbose: true,
  });
}
