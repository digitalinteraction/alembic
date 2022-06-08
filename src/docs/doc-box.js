import { addGlobalStyle } from '../lib/style.js'

/**
 * DocBox is a coloured box to represent content while demonstrating a layout
 */
export class DocBox extends HTMLElement {
  static get observedAttributes() {
    return ['height', 'width', 'accent']
  }

  get height() {
    return this.getAttribute('height') ?? null
  }
  set height(value) {
    this.setAttribute('height', value)
  }
  get width() {
    return this.getAttribute('width') ?? null
  }
  set width(value) {
    this.setAttribute('width', value)
  }
  get accent() {
    return this.getAttribute('accent') ?? 'rebeccapurple'
  }
  set accent(value) {
    this.setAttribute('accent', value)
  }

  render() {
    this.dataset.i = `DocBox-${this.width}${this.height}${this.accent}`

    let rules = [
      `display: ${this.width !== null ? 'inline-block' : 'block'}`,
      `background-color: ${this.accent}`,
      `color: white`,
      `color: color-contrast(white vs black, ${this.accent});`,
    ]

    if (this.height !== null) rules.push(`height: ${this.height}`)
    if (this.width !== null) rules.push(`width: 100%; max-width: ${this.width}`)

    addGlobalStyle(
      this.dataset.i,
      `
        [data-i="${this.dataset.i}"] {
          ${rules.join(';')}
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
