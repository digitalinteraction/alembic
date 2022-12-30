import fs from 'fs/promises'
import path from 'path'
import { getBaseScripts, getBaseStyles, processHtml } from './tools.js'

// https://www.11ty.dev/docs/events/#event-arguments
interface EleventyEventArgs {
  dir: {
    input: string
    output: string
  }
}

export interface EleventyConfig {
  addTransform(name: string, callback: (content: string) => unknown): void
  on(
    eventName: 'eleventy.after',
    callback: (args: EleventyEventArgs) => unknown
  ): void
  dir: Partial<Record<string, string>>
}

// export interface AlembicEleventyOptions {}

export function eleventyAlembic(eleventyConfig: EleventyConfig) {
  // TODO: resolve based on PATH_PREFIX?
  const options = {
    extraStyles: [`<link rel="stylesheet" href="/alembic/style.css">`],
    extraScripts: [`<script type="module" src="/alembic/script.js"></script>`],
  }

  eleventyConfig.addTransform('html', (html) => processHtml(html, options))

  eleventyConfig.on('eleventy.after', async ({ dir }) => {
    const outdir = dir ? dir.output : eleventyConfig.dir.output

    if (!outdir) {
      console.warn('[alembic-11ty] Cannot write base files')
      return
    }

    await fs.mkdir(path.join(outdir, 'alembic'), { recursive: true })
    await fs.writeFile(path.join(outdir, 'alembic/style.css'), getBaseStyles())
    await fs.writeFile(path.join(outdir, 'alembic/script.js'), getBaseScripts())
  })
}
