import { addGlobalStyle, trimCss } from '../../lib/lib.js'

const defaults = {
  max: 'var(--measure)',
  gutters: null,
  intrinsic: false,
}

/**
 * CenterLayout ensures a block-level element is horizontally centered with a max-width value representing the typographic measure
 *
 * @property {string} max=var(--measure) A CSS `max-width` value
 * @property {string} gutters=0 A CSS `length` value representing the minimum space on either side of the content
 * @property {boolean} intrinsic=false Center child elements based on their content width
 */
export class CenterLayout extends HTMLElement {
  static get observedAttributes() {
    return ['max', 'gutters', 'intrinsic']
  }
  static defineElement() {
    customElements.define('center-layout', CenterLayout)
  }
  static getStyles(attrs) {
    const { max, gutters, intrinsic } = { ...defaults, ...attrs }
    const id = `CenterLayout-${max}${gutters}${intrinsic}`

    const guttersRule = `padding-inline: ${gutters};`

    const intrinsicRule = `
      display: flex;
      flex-direction: column;
      align-items: center;
    `

    const css = trimCss`
      [data-i="${id}"] {
        max-width: ${max};
        ${gutters ? guttersRule : ''}
        ${intrinsic ? intrinsicRule : ''}
      }
    `

    return { id, css }
  }

  get max() {
    return this.getAttribute('max') || defaults.max
  }
  set max(value) {
    return this.setAttribute('max', value)
  }
  get gutters() {
    return this.getAttribute('gutters') || defaults.gutters
  }
  set gutters(value) {
    return this.setAttribute('gutters', value)
  }
  get intrinsic() {
    return this.hasAttribute('intrinsic') || defaults.intrinsic
  }
  set intrinsic(value) {
    if (value) this.setAttribute('intrinsic', '')
    else this.removeAttribute('intrinsic')
  }

  render() {
    const { max, gutters, intrinsic } = this
    const { id, css } = CenterLayout.getStyles({ max, gutters, intrinsic })
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
