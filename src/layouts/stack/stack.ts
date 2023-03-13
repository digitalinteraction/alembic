import { addGlobalStyle, getHTMLElement, trimCss } from '../../lib/lib.js'

const defaultAttributes = {
  space: 'var(--s1)',
}

export interface StackLayoutAttributes {
  space?: string
}

/**
  StackLayout adds whitespace (margin) between flow (block) elements along a vertical axis.
  [Documentation →](https://alembic.openlab.dev/layouts/#stack)
 */
export class StackLayout extends getHTMLElement() {
  static get observedAttributes() {
    return ['space']
  }
  static defineElement() {
    customElements.define('stack-layout', StackLayout)
  }
  static getStyles(attrs: StackLayoutAttributes) {
    const { space } = { ...defaultAttributes, ...attrs }
    const id = `StackLayout-${space}`
    const css = trimCss`
      [data-i="${id}"] > * + * {
        margin-block-start: ${space};
      }
    `
    return { id, css }
  }

  get space() {
    return this.getAttribute('space') ?? defaultAttributes.space
  }
  set space(value) {
    this.setAttribute('space', value)
  }

  render() {
    const { space } = this
    const { id, css } = StackLayout.getStyles({ space })
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
