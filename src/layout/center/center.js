import { addGlobalStyle } from '../../lib/style.js'

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
  static register() {
    customElements.define('center-layout', CenterLayout)
  }

  get max() {
    return this.getAttribute('max') || 'var(--measure)'
  }
  set max(value) {
    return this.setAttribute('max', value)
  }
  get gutters() {
    return this.getAttribute('gutters') || null
  }
  set gutters(value) {
    return this.setAttribute('gutters', value)
  }
  get intrinsic() {
    return this.hasAttribute('intrinsic')
  }
  set intrinsic(value) {
    if (value) this.setAttribute('intrinsic', '')
    else this.removeAttribute('intrinsic')
  }

  render() {
    this.dataset.i = `CenterLayout-${this.max}${this.gutters}${this.intrinsic}`

    const guttersRule = this.gutters ? `padding-inline: ${this.gutters};` : ''

    const intrinsicRule = this.intrinsic
      ? `display: flex;
        flex-direction: column;
        align-items: center;`
      : ''

    addGlobalStyle(
      this.dataset.i,
      `
        [data-i="${this.dataset.i}"] {
          max-width: ${this.max};
          ${guttersRule}
          ${intrinsicRule}
        }
      `
    )
  }
  connectedCallback() {
    this.render()
  }
  attributeChangedCallback() {
    this.render()
  }
}
