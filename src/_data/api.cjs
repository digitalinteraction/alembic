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

    for (const stmt of entry.getExportSymbols()) {
      if (stmt.getJsDocTags().some((t) => t.getName() === 'internal')) {
        debug('skip: ' + stmt.getEscapedName())
        continue
      }

      debug(stmt.getEscapedName())

      let markdown = []

      // Compose all doc comments together
      for (const declaration of stmt.getDeclarations()) {
        for (const range of declaration.getLeadingCommentRanges()) {
          const match = /\/\*\*([\s\S]+)\*\//.exec(range.getText())
          if (!match) continue
          markdown.push(match[1])
        }
      }

      output[entryName][stmt.getEscapedName()] = {
        entryPoint: entryName,
        name: stmt.getEscapedName(),
        content: markdown.join('\n\n'),
      }
    }
  }

  return output
}

module.exports = generate()
