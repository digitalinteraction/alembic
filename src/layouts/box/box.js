import { addGlobalStyle, trimCss } from '../../lib/lib.js'

const defaults = {
  padding: 'var(--s1)',
  borderWidth: 'var(--border-thin)',
  invert: false,
}

/**
 * BoxLayout is a custom element for generic containers of things
 *
 * @property {string} padding=var(--s1) A CSS `padding` value
 * @property {string} borderWidth=var(--border-thin) A CSS `border-width` value
 * @property {boolean} invert=false Whether to flip fore/background colours
 */
export class BoxLayout extends HTMLElement {
  static get observedAttributes() {
    return ['borderWidth', 'padding', 'invert']
  }
  static defineElement() {
    customElements.define('box-layout', BoxLayout)
  }
  static getStyles(attrs) {
    const { padding, borderWidth, invert } = { ...defaults, ...attrs }
    const id = `BoxLayout-${padding}${borderWidth}${invert}`
    const invertRule = invert
      ? `color: var(--backgroundColor); background-color: var(--foregroundColor);`
      : `color: var(--foregroundColor); background-color: var(--backgroundColor);`
    const css = trimCss`
      [data-i="${id}"] {
        padding: ${padding};
        border: ${borderWidth} solid;
        ${invertRule}
      }
    `
    return { id, css }
  }

  get padding() {
    return this.getAttribute('padding') || defaults.padding
  }
  set padding(value) {
    return this.setAttribute('padding', value)
  }
  get borderWidth() {
    return this.getAttribute('borderWidth') || defaults.borderWidth
  }
  set borderWidth(value) {
    return this.setAttribute('borderWidth', value)
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
