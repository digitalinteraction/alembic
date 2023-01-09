const path = require('path')
const { Node, Project } = require('ts-morph')

const markdownIt = require('markdown-it')
const markdownAnchor = require('markdown-it-anchor')
const debug = require('debug')('alembic:api')

function simplify(file) {
  return path.relative(path.join(process.cwd(), 'src'), file)
}

function generate() {
  // TODO: refactor this out when upgrading to eleventy@2
  // TODO: share this with .eleventy.cjs?
  const md = markdownIt({
    html: true,
  })
  md.use(markdownAnchor)
  md.disable('code')

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

  // console.log(output)

  return output
}

module.exports = generate()
