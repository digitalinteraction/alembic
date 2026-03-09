import path from "path";
import { Project, SyntaxKind } from "ts-morph";
import createDebug from "debug";

const debug = createDebug("alembic:api");

function simplify(file) {
  return path.relative(path.join(process.cwd(), "source"), file);
}

export default function generate() {
  const entrypoints = ["source/module.ts", "source/tools.ts"];

  const project = new Project({
    tsConfigFilePath: "tsconfig.json",
  });

  debug(JSON.stringify(project.getCompilerOptions()));

  const output = {};

  for (const entry of project.getSourceFiles(entrypoints)) {
    const entryName = simplify(entry.getFilePath());
    output[entryName] = {};
    debug(entryName);

    for (let symbol of entry.getExportSymbols()) {
      if (symbol.getJsDocTags().some((t) => t.getName() === "internal")) {
        debug("skip: " + symbol.getEscapedName());
        continue;
      }

      debug("%o alias=%o", symbol.getEscapedName(), symbol.isAlias());

      if (symbol.isAlias()) symbol = symbol.getAliasedSymbolOrThrow();

      let markdown = [];

      // Compose all doc comments together
      for (let declaration of symbol.getDeclarations()) {
        // https://github.com/dsherret/ts-morph/issues/901
        if (declaration.getKind() === SyntaxKind.VariableDeclaration) {
          declaration = declaration.getVariableStatementOrThrow();
        }

        // TODO: should this use `Node.isJSDocable(decl)` + `node#getJsDocs()` ?
        for (const range of declaration.getLeadingCommentRanges()) {
          const match = /\/\*\*([\s\S]+)\*\//.exec(range.getText());
          if (!match) continue;
          markdown.push(match[1].replaceAll(/^[ \t]*?@.*$/gm, ""));
        }
      }

      output[entryName][symbol.getEscapedName()] = {
        entryPoint: entryName,
        name: symbol.getEscapedName(),
        content: markdown.join("\n\n"),
        tags: symbol.getJsDocTags(),
      };
    }
  }

  return output;
}
