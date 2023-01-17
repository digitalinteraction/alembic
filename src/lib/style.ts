/** 
  Create a global stylesheet under an identifier so it is only added once.
  If a style with the same id is requested again, it will not be added.
 */
export function addGlobalStyle(id: string, style: string) {
  if (document.getElementById(id)) return

  const elem = document.createElement('style')
  elem.id = id
  elem.innerHTML = style

  document.head.appendChild(elem)
}

/**
  Trim all the whitespace from a CSS template literal.
 */
export function trimCss(strings: TemplateStringsArray, ...args: unknown[]) {
  const parts = []

  for (let i = 0; i < strings.length; i++) {
    parts.push(strings[i])

    if (i < args.length) {
      parts.push(args[i])
    }
  }

  return parts.join('').replace(/\s\s+/g, ' ').trim()
}

// export interface AlembicStyleSheetOptions {}

/** @experimental */
export class AlembicStyleSheet {
  #styles = new Map<string, string>()

  reset(): void {
    this.#styles.clear()
  }

  getStyles(): Map<string, string> {
    return new Map(this.#styles)
  }

  addStyle({ id, css }: { id: string; css: string }) {
    if (this.#styles.has(id)) return id
    this.#styles.set(id, css)
    return id
  }

  *[Symbol.iterator]() {
    for (const [id, css] of this.#styles) {
      yield [id, css]
    }
  }
}
