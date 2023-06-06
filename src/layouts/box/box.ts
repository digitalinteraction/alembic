import {
  addGlobalStyle,
  getAttributes,
  getHTMLElement,
  trimCss,
} from '../../lib/lib.js'

const defaultAttributes = {
  padding: 'var(--s1)',
  borderWidth: 'var(--border-thin)',
  invert: false,
}

export type BoxLayoutAttributes = {
  padding?: string
  borderWidth?: string
  invert?: boolean
}

/**
  BoxLayout is a custom element for generic containers of things.
  [Documentation →](https://alembic.openlab.dev/layouts/#box)
 */
export class BoxLayout extends getHTMLElement() {
  static get observedAttributes() {
    return ['borderWidth', 'padding', 'invert']
  }
  static defineElement() {
    customElements.define('box-layout', BoxLayout)
  }
  static getStyles(attrs: BoxLayoutAttributes) {
    const { padding, borderWidth, invert } = getAttributes(
      defaultAttributes,
      attrs
    )
    const id = `BoxLayout-${padding}${borderWidth}${invert}`
    const invertRule = invert
      ? `color: var(--color-background); background-color: var(--color-foreground);`
      : `color: var(--color-foreground); background-color: var(--color-background);`
    const css = trimCss`
      [data-i="${id}"] {
        padding: ${padding};
        border-width: ${borderWidth};
        ${invertRule}
      }
    `
    return { id, css }
  }

  get padding() {
    return this.getAttribute('padding') ?? defaultAttributes.padding
  }
  set padding(value) {
    this.setAttribute('padding', value)
  }
  get borderWidth() {
    return this.getAttribute('borderWidth') ?? defaultAttributes.borderWidth
  }
  set borderWidth(value) {
    this.setAttribute('borderWidth', value)
  }
  get invert() {
    return this.hasAttribute('invert')
  }
  set invert(value) {
    if (value) this.setAttribute('invert', '')
    else this.removeAttribute('invert')
  }

  render() {
    const { padding, borderWidth, invert } = this
    const { id, css } = BoxLayout.getStyles({ padding, borderWidth, invert })
    this.dataset.i = id
    addGlobalStyle(id, css)
  }
  connectedCallback() {
    this.render()
  }
  attributeChangedCallback() {
    this.render()
  }
}
