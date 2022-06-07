#!/usr/bin/env node

import fs from 'fs/promises'
import path from 'path'

import Svgo from 'svgo'

const SVG_ATTRS =
  'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"'

const USAGE = `
Usage:
  ./bin/icons.js <inputDir> <outputFile>
`

const symbolifyPlugin = {
  name: 'symbolify',
  type: 'visitor',
  fn(_root, _config, options) {
    const id = path.parse(options.path).name
    return {
      element: {
        exit(node) {
          if (node.name === 'svg') {
            node.name = 'symbol'
            node.attributes.id = id
            node.attributes.fill = 'currentColor'
            delete node.attributes.xmlns
            delete node.attributes.width
            delete node.attributes.height
          } else {
            if (node.attributes.fill !== 'currentColor') {
              delete node.attributes.fill
            }
            if (node.attributes.stroke !== 'currentColor') {
              delete node.attributes.stroke
            }
          }
        },
      },
    }
  },
}

async function main() {
  const [inputDir, outputFile] = process.argv.slice(2)

  if (!inputDir || !outputFile) {
    console.error(USAGE)
    process.exit(1)
  }

  const outputDir = path.dirname(outputFile)
  if (outputDir) {
    await fs.mkdir(outputDir, { recursive: true })
  }

  const files = await fs.readdir(inputDir)
  const symbols = []

  for (const filename of files) {
    if (!filename.endsWith('.svg')) continue

    const file = path.join(inputDir, filename)
    const data = await fs.readFile(file)
    const result = Svgo.optimize(data, {
      multipass: true,
      path: file,
      floatPrecision: 4,
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false,
              cleanupIDs: false,
            },
          },
        },
        symbolifyPlugin,
      ],
    })

    if (result.modernError) throw result.modernError

    symbols.push(result.data)
  }

  const svgsheet =
    '<svg ' + SVG_ATTRS + '>\n  ' + symbols.join('\n  ') + '\n</svg>'
  await fs.writeFile(outputFile, svgsheet)
}

main().catch((error) => {
  console.error('Fatal error', error)
  process.exit(1)
})
