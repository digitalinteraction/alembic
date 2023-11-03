/**
  `getHTMLElement` is a helper method used to create HTMLElement subclasses in both the browser or a non-browser JavaScript environment.
  It means you can still instantiate your customElements without needing the superclass to be available.
  The stub **does not** implement any of `HTMLElement` it just swaps it out for an empty class so that subclass functionality can be used.
  
  For examples of usage see the source code for the custom layout elements.
 */
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

/**
  `defineCustomElements` iterates through the key-value pairs of the customElement map and registers them with the DOM using the `customElements.define` API.
  You can use this to quickly register a set of custom elements, like `allCustomElements` or `layoutCustomElements`.

  ```js
  import { defineCustomElements, allCustomElements } from '@openlab/alembic'
  
  defineCustomElements(allCustomElements)
  ```
 */
export function defineCustomElements(
  map: Map<string, CustomElementConstructor>
) {
  if (!('customElements' in window)) {
    console.warn('customElements is not supported')
    return
  }
  for (const [name, element] of map) customElements.define(name, element)
}
