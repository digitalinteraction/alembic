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
  /** @deprecated */
  dir: {
    input: string
    output: string
  }
  directories: {
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

  versionCheck(version: string): void

  dir: Partial<Record<string, string>>

  directories: Partial<Record<string, string>>

  pathPrefix?: string
}

/** Options to configure eleventyAlembic */
export interface AlembicEleventyOptions {
  skipBaseStyles?: boolean
  skipBaseScripts?: boolean
  useLabcoat?: boolean
}

function getProcessOptions(
  eleventyConfig: EleventyConfig,
  pluginOptions: AlembicEleventyOptions
) {
  const prefix = eleventyConfig.pathPrefix ?? '/'

  const processOptions = {
    extraStyles: [`<link rel="stylesheet" href="${prefix}alembic/style.css">`],
    extraScripts: [
      `<script type="module" src="${prefix}alembic/script.js"></script>`,
    ],
  }

  if (pluginOptions?.skipBaseStyles) processOptions.extraStyles = []
  if (pluginOptions?.skipBaseScripts) processOptions.extraScripts = []

  return processOptions
}

export function eleventyAlembic(
  eleventyConfig: EleventyConfig,
  options: AlembicEleventyOptions = {}
) {
  try {
    eleventyConfig.versionCheck('>=2.0')
  } catch (e) {
    console.log(
      `[@openlab/alembic] WARN Eleventy plugin compatibility: ${
        (e as Error).message
      }`
    )
  }

  // https://www.11ty.dev/docs/config/#transforms
  eleventyConfig.addTransform('html', function (content) {
    const outputPath = this.page?.outputPath ?? this.outputPath
    return outputPath && outputPath.endsWith('.html')
      ? processHtml(content, getProcessOptions(eleventyConfig, options))
      : content
  })

  eleventyConfig.on('eleventy.after', async ({ dir, directories }) => {
    const outdir = directories?.output ?? dir?.output ?? '_site'

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
