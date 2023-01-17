import { layoutCustomElements } from './layouts/layouts.js'
import { AlembicStyleSheet } from './lib/lib.js'

// import everythingCss from 'embed:./everything.css'
// import everythingJs from 'embed:./everything.js'

const allElements = new Map([...layoutCustomElements])

export interface ProcessHtmlOptions {
  extraStyles?: string[]
  extraScripts?: string[]
}

/**
  **processHtml** takes a HTML string, looks through it for Alembic usage and modifies the HTML to include custom element styles (e.g. for the layouts).
  
  You can optionally provide `options` to inject extra HTML into the inputHtml too at either the script or style location.
  This is useful to automatically add the Alembic base styles / scripts from `getBaseStyles` and `getBaseScripts`. Your build process could write these files somewhere then make sure they are linked to from the HTML here.
  
  ```js
  const options = {
   extraStyles: [`<link rel="stylesheet" href="/alembic/style.css">`],
   extraScripts: [`<script type="module" src="/alembic/script.js"></script>`],
  }
  ```
  
  You control where the styles and scripts are injected using a special HTML comments `<!-- @openlab/alembic inject-css -->` and `<!-- @openlab/alembic inject-js -->`. You opt in to those features by adding the comment to your HTML.
 */
export function processHtml(
  inputHtml: string,
  options: ProcessHtmlOptions = {}
): string {
  const styles = new AlembicStyleSheet()

  let outputHtml = inputHtml

  for (const [elemName, element] of allElements) {
    const regex = _elementRegex(elemName)
    outputHtml = outputHtml.replace(regex, (_match, attrText) => {
      const attrs = _parseHtmlAttributes(attrText)

      const id = styles.addStyle(element.getStyles(attrs))

      return _recreateElement(elemName, attrText, id)
    })
  }

  const allStyles = Array.from(styles)
    .map(([id, css]) => _createStyle(id, css))
    .concat(options.extraStyles ?? [])
    .join('')

  const allScripts = (options.extraScripts ?? []).join('')

  outputHtml = outputHtml
    .replace(_commentRegex('inject-css'), allStyles)
    .replace(_commentRegex('inject-js'), allScripts)

  return outputHtml
}

/**
 **getStyles** takes a HTML string, looks through it for Alembic usage and returns the styles to satisfy it. This is useful for SSR when you have something that has already generated style ids on custom elements and need to get the styles for a whole document in one go.
 */
export function getStyles(inputHtml: string): Map<string, unknown> {
  const styles = new AlembicStyleSheet()

  for (let [match, element] of _iterateElements(inputHtml, allElements)) {
    styles.addStyle(element.getStyles(_parseHtmlAttributes(match[1])))
  }

  return styles.getStyles()
}

/**
  Get the base styles for non-dynamic Alembic.
  Useful for creating a stylesheet during SSG to be linked to from a HTML document.
  
  ```ts
  const sourcecode = await getBaseStyles()
  ```
*/
export async function getBaseStyles(): Promise<string> {
  // This is dynamic so the custom embed: protocol doesn't break unit tests...
  const css = await import('embed:./everything.css')
  return css.default
}

/**
  Get the scripts as a string to run Alembic in-browser.
  Useful for creating a script during SSG to be linked to from a HTML document.
  
  ```ts
  const sourcecode = await getBaseScripts()
  ```
*/
export async function getBaseScripts(): Promise<string> {
  // This is dynamic so the custom embed: protocol doesn't break unit tests...
  const js = await import('embed:./everything.js')
  return js.default
}

// Internal

/** @internal */
export function* _iterateElements<T>(html: string, elements: Map<string, T>) {
  for (const [name, element] of elements) {
    const regex = _elementRegex(name)
    let match: RegExpMatchArray | null = null

    while ((match = regex.exec(html))) {
      yield [match, element] as const
    }
  }
}

/** @internal */
export function _createStyle(id: string, css: string) {
  return `<style id="${id}">${css}</style>`
}

/** @internal */
export function _recreateElement(name: string, attrs: string, id: string) {
  return `<${name} ${attrs} data-i="${id}">`
}

/** @internal */
export function _parseHtmlAttributes(attrs: string) {
  const props: Record<string, string> = {}
  for (const attr of attrs.matchAll(/(\w[\w-]+)(?:="?([^"]*)"?)?/g)) {
    props[attr[1]] = attr[2] ?? true
  }
  return props
}

/** @internal */
export function _elementRegex(name: string) {
  return new RegExp(`<${name}[\\s\\n\\r]+?([\\w\\W]*?)>`, 'g')
}

/** @internal */
export function _commentRegex(name: string) {
  return new RegExp(`<!--\\s+@openlab\/alembic\\s+${name}\\s+-->`)
}
