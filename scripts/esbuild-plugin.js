import esbuild from 'esbuild'
import path from 'node:path'
import createDebug from 'debug'

const EMBED_NAMESPACE = 'alembic_embed'
const EMBED_PREFIX = /^embed:/i
const debug = createDebug('alembic:embed')

/** @type {import("esbuild").Plugin} */
export const alembicEmbed = {
  name: 'alembic_embed',
  setup(build) {
    build.onResolve({ filter: EMBED_PREFIX }, (args) => {
      const target = args.path.replace(EMBED_PREFIX, '')
      debug('embed:', target)
      return {
        path: target,
        namespace: EMBED_NAMESPACE,
        pluginData: {
          resolveDir: args.resolveDir,
        },
      }
    })

    build.onLoad({ filter: /.*/, namespace: EMBED_NAMESPACE }, async (args) => {
      const result = await esbuild.build({
        ...build.initialOptions,
        bundle: true,
        write: false,
        entryPoints: [path.join(args.pluginData.resolveDir, args.path)],
        minify: true,
        format: 'esm',
      })

      const { text } = result.outputFiles[0]

      return {
        contents: text,
        loader: 'text',
      }
    })
  },
}

// function getLoader(file) {
//   if (file.endsWith('.css')) return 'css'
//   if (file.endsWith('.js')) return 'js'
//   return null
// }

function sanitizeEmbed(input) {
  return input.replace(/`/g, '\\`')
}
