import fs from 'fs/promises'
import path from 'path'
import {
  getBaseScripts,
  getBaseStyles,
  getLabcoatStyles,
  processHtml,
} from './tools.js'

// https://www.11ty.dev/docs/events/#event-arguments
interface EleventyEventArgs {
  dir: {
    input: string
    output: string
  }
}

interface EleventyIsh {
  outputPath?: string
  page?: {
    outputPath?: string
  }
}

export interface EleventyConfig {
  addTransform(
    name: string,
    callback: (
      this: EleventyIsh,
      content: string,
      outputFile: string
    ) => unknown
  ): void
  on(
    eventName: 'eleventy.after',
    callback: (args: EleventyEventArgs) => unknown
  ): void
  dir: Partial<Record<string, string>>
}

/** Options to configure eleventyAlembic */
export interface AlembicEleventyOptions {
  skipBaseStyles?: boolean
  skipBaseScripts?: boolean
  useLabcoat?: boolean
}

export function eleventyAlembic(
  eleventyConfig: EleventyConfig,
  options: AlembicEleventyOptions = {}
) {
  // TODO: resolve based on PATH_PREFIX?
  const processOptions = {
    extraStyles: [`<link rel="stylesheet" href="/alembic/style.css">`],
    extraScripts: [`<script type="module" src="/alembic/script.js"></script>`],
  }

  if (options?.skipBaseStyles) processOptions.extraStyles = []
  if (options?.skipBaseScripts) processOptions.extraScripts = []

  // https://www.11ty.dev/docs/config/#transforms
  eleventyConfig.addTransform('html', function (content) {
    const outputPath = this.page?.outputPath ?? this.outputPath
    return outputPath && outputPath.endsWith('.html')
      ? processHtml(content, processOptions)
      : content
  })

  eleventyConfig.on('eleventy.after', async ({ dir }) => {
    const outdir = (dir ? dir.output : eleventyConfig.dir.output) ?? '_site'

    if (!outdir) {
      console.warn('[alembic-11ty] Cannot write base files')
      return
    }

    await fs.mkdir(path.join(outdir, 'alembic'), { recursive: true })
    await fs.writeFile(
      path.join(outdir, 'alembic/style.css'),
      options.useLabcoat ? await getLabcoatStyles() : await getBaseStyles()
    )
    await fs.writeFile(
      path.join(outdir, 'alembic/script.js'),
      await getBaseScripts()
    )
  })
}
