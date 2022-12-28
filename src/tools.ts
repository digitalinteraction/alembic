import { layoutCustomElements } from './layouts/layouts.js'
import { AlembicHTMLElement } from './lib/lib.js'

const allElements = new Map([...layoutCustomElements])

export function processHtml(inputHtml: string): string {
  const styles = new Map<string, string>()
  let outputHtml = inputHtml

  for (const [elemName, element] of allElements) {
    const regex = _elementRegex(elemName)
    outputHtml = outputHtml.replace(regex, (_match, attrText) => {
      const attrs = _parseHtmlAttributes(attrText)

      const { id, css } = element.getStyles(attrs)
      if (!styles.has(id)) styles.set(id, css)

      return _recreateElement(elemName, attrText, id)
    })
  }

  const allStyles = Array.from(styles)
    .map(([id, css]) => _createStyle(id, css))
    .join('')

  // TODO: add base styles too?

  outputHtml = outputHtml.replace(_commentRegex('inject-css'), allStyles)

  return outputHtml
}

export function getStyles(inputHtml: string): Map<string, unknown> {
  const styles = new Map<string, string>()

  for (let [match, element] of _iterateElements(inputHtml, allElements)) {
    const attrs = _parseHtmlAttributes(match[1])
    const { id, css } = element.getStyles(attrs)
    styles.set(id, css)
  }

  return styles
}

export async function getBaseStyles(): Promise<string> {
  // TODO: how to inline the reset.css file during build and return here?
  return `__ALEMBIC_BASE_STYLES__`
}

export async function getBaseScripts(): Promise<string> {
  // TODO: how to inline the scripts files during build and return here?
  return `__ALEMBIC_BASE_SCRIPTS__`
}

// Internal

// TODO: unit test these: (v)

export function* _iterateElements(
  html: string,
  elements: Map<string, AlembicHTMLElement>
) {
  for (const [name, element] of elements) {
    const regex = _elementRegex(name)
    let match: RegExpMatchArray | null = null

    while ((match = regex.exec(html))) {
      yield [match, element] as const
    }
  }
}

export function _createStyle(id: string, css: string) {
  return `<style id="${id}">${css}</style>`
}

export function _recreateElement(name: string, attrs: string, id: string) {
  return `<${name} ${attrs} data-i="${id}">`
}

export function _parseHtmlAttributes(attrs: string) {
  const props: Record<string, string> = {}
  for (const attr of attrs.matchAll(/(\w[\w-]+)(?:="?([^"]*)"?)?/g)) {
    props[attr[1]] = attr[2] ?? ''
  }
  return props
}

export function _elementRegex(name: string) {
  return new RegExp(`<${name}[\\s\\n\\r]+?([\\w\\W]*?)>`, 'g')
}

export function _commentRegex(name: string) {
  return new RegExp(`<!--\\s+@openlab\/alembic\\s+${name}\\s+-->`)
}
