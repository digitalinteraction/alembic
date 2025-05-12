#!/usr/bin/env node

import cp from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import util from 'node:util'
import { fileURLToPath } from 'node:url'

import esbuild from 'esbuild'
import { alembicEmbed } from './esbuild-plugin.js'

const exec = util.promisify(cp.exec)

const { NODE_ENV } = process.env

const resolve = (file) => new URL(path.join('..', file), import.meta.url)

const resolveToPath = (file) => fileURLToPath(resolve(file))

const places = {
  root: resolve('.'),
  dist: resolve('dist'),
}

//
// Clean out "dist" folder in production
//
if (NODE_ENV !== 'development') {
  const dist = await fs.stat(places.dist).catch(() => null)

  if (dist && dist.isDirectory) {
    console.debug('Cleaning dist folder %s', places.dist)
    await fs.rm(places.dist, { recursive: true })
  }
}

//
// Copy assets
//
console.debug('Copying assets into dist')
await fs.mkdir(resolve('dist/assets'), { recursive: true })
await fs.cp(resolve('src/assets'), resolve('dist/assets'), {
  recursive: true,
})

//
// Run TypeScript lint + generate types
//
console.debug('Linting TypeScript & generating type definitions')
await exec(`npx tsc`, {
  cwd: resolve('.'),
})

//
// Build CSS
//
console.debug('Bundling CSS')
await esbuild.build({
  bundle: true,
  format: 'esm',
  platform: 'browser',
  outdir: fileURLToPath(places.dist),
  entryPoints: {
    everything: resolveToPath('src/everything.css'),
    labcoat: resolveToPath('src/labcoat/labcoat.css'),
    'docs/docs': resolveToPath('src/docs/docs.css'),
    reset: resolveToPath('src/lib/reset.css'),
  },
})

//
// Build JavaScript
//
console.debug('Bundling JavaScript')
await esbuild.build({
  bundle: true,
  format: 'esm',
  platform: 'neutral',
  outdir: fileURLToPath(places.dist),
  plugins: [alembicEmbed],
  entryPoints: {
    everything: resolveToPath('src/everything.ts'),
    module: resolveToPath('src/module.ts'),
    tools: resolveToPath('src/tools.ts'),
    'docs/docs': resolveToPath('src/docs/docs.ts'),
  },
})

//
// Build Eleventy Plugin
//
console.debug('Bundle Eleventy Plugin')
await esbuild.build({
  bundle: true,
  format: 'cjs',
  platform: 'node',
  outdir: fileURLToPath(places.dist),
  outExtension: {
    '.js': '.cjs',
  },
  plugins: [alembicEmbed],
  entryPoints: {
    '11ty': resolveToPath('src/11ty.cts'),
  },
})
