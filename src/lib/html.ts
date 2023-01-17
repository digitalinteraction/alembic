export function getHTMLElement(): typeof HTMLElement {
  return (
    globalThis.HTMLElement ??
    class {
      constructor() {
        throw new TypeError(
          `Cannot instantiate ${this.constructor.name} outside of the DOM`
        )
      }
    }
  )
}

export interface AlembicHTMLElement<
  T extends HTMLElement = HTMLElement,
  P extends Record<string, unknown> = Record<string, unknown>
> {
  // defineElement(): void
  getStyles(attrs: P): { id: string; css: string }
  new (): T
}

export function defineCustomElements(
  map: Map<string, CustomElementConstructor>
) {
  if (!('customElements' in window)) {
    console.warn('customElements is not supported')
    return
  }
  for (const [name, element] of map) customElements.define(name, element)
}
