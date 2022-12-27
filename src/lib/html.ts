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
  defineElement(): void
  getStyles(attrs: P): { id: string; css: string }
  new (): T
}
