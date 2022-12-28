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
}

// export interface AlembicEleventyOptions {}

export default function eleventyAlembic(eleventyConfig: EleventyConfig) {
  eleventyConfig.addTransform('html', (content) => processHtml(content))

  eleventyConfig.on('eleventy.after', async ({ dir }) => {
    if (dir) {
      await fs.writeFile(
        path.join(dir.output, 'alembic/reset.css'),
        await getBaseStyles()
      )
      await fs.writeFile(
        path.join(dir.output, 'alembic/script.js'),
        await getBaseScripts()
      )
    }
  })
}
