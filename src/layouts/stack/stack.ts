import {
  addGlobalStyle,
  getAttributes,
  getHTMLElement,
  trimCss,
} from '../../lib/lib.js'

const defaultAttributes = {
  justify: 'flex-start',
  align: 'stretch',
  space: 'var(--s1)',
}

export type StackLayoutAttributes = {
  justify?: string
  align?: string
  space?: string
}

/**
  StackLayout adds whitespace (margin) between flow (block) elements along a vertical axis.
  [Documentation →](https://alembic.openlab.dev/layouts/#stack)
 */
export class StackLayout extends getHTMLElement() {
  static get observedAttributes() {
    return ['justify', 'align', 'space']
  }
  static defineElement() {
    customElements.define('stack-layout', StackLayout)
  }
  static getStyles(attrs: StackLayoutAttributes) {
    const { justify, align, space } = getAttributes(defaultAttributes, attrs)
    const id = `StackLayout-${justify}${align}${space}`
    const css = trimCss`
      [data-i="${id}"] {
        justify-content: ${justify};
        align-items: ${align};
      }
      [data-i="${id}"] > * + * {
        margin-block-start: ${space};
      }
    `
    return { id, css }
  }

  get justify() {
    return this.getAttribute('justify') ?? defaultAttributes.justify
  }
  set justify(value) {
    this.setAttribute('justify', value)
  }
  get align() {
    return this.getAttribute('align') ?? defaultAttributes.align
  }
  set align(value) {
    this.setAttribute('align', value)
  }
  get space() {
    return this.getAttribute('space') ?? defaultAttributes.space
  }
  set space(value) {
    this.setAttribute('space', value)
  }

  render() {
    const { justify, align, space } = this
    const { id, css } = StackLayout.getStyles({ justify, align, space })
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
