const path = require('path')
const { Project } = require('ts-morph')

const debug = require('debug')('alembic:api')

function simplify(file) {
  return path.relative(path.join(process.cwd(), 'src'), file)
}

function generate() {
  const entrypoints = ['src/module.ts', 'src/tools.ts']

  const project = new Project({
    tsConfigFilePath: 'tsconfig.json',
  })

  debug(JSON.stringify(project.getCompilerOptions()))

  const output = {}

  for (const entry of project.getSourceFiles(entrypoints)) {
    const entryName = simplify(entry.getFilePath())
    output[entryName] = {}
    debug(entryName)

    for (let symbol of entry.getExportSymbols()) {
      if (symbol.getJsDocTags().some((t) => t.getName() === 'internal')) {
        debug('skip: ' + symbol.getEscapedName())
        continue
      }

      debug('%o alias=%o', symbol.getEscapedName(), symbol.isAlias())

      if (symbol.isAlias()) symbol = symbol.getAliasedSymbolOrThrow()

      let markdown = []

      // Compose all doc comments together
      for (const declaration of symbol.getDeclarations()) {
        for (const range of declaration.getLeadingCommentRanges()) {
          const match = /\/\*\*([\s\S]+)\*\//.exec(range.getText())
          if (!match) continue
          markdown.push(match[1].replaceAll(/^[ \t]*?@.*$/gm, ''))
        }
      }

      output[entryName][symbol.getEscapedName()] = {
        entryPoint: entryName,
        name: symbol.getEscapedName(),
        content: markdown.join('\n\n'),
        tags: symbol.getJsDocTags(),
      }
    }
  }

  return output
}

module.exports = generate()
