/** 
  Create a global stylesheet under an identifier so it is only added to the DOM once.
  If a style with the same id is requested again, it will not be added.

  This appends styles to the `<head>` element with the HTML `id` set to the parameter of the same name.
  The `style` is the raw CSS to be added.

  ```js
  import { addGlobalStyle } from '@openlab/alembic'

  addGlobalStyle('element-abcdef', 'p { color: red; }')
  ```

  which will create:

  ```html
  <head>
    <!-- ... -->
    <style id="element-abcdef">p { color: red; }</style>
  </head>
  ```
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

  ```js
  import { trimCss } from '@openlab/alembic'

  const minified = trimCss(`
    p {
      color: red;
    }
  `)
  ```

  Which results in:

  ```css
  p { color: red; }
  ```
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
