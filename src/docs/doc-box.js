import { addGlobalStyle } from '../lib/style.js'

/**
 * DocBox is a coloured box to represent content while demonstrating a layout
 *
 * @property {string} size=100px How long or tall to make the box
 * @property {string} accent=rebeccapurple A CSS colour to fill the box
 * @property {string} display=block Whether to size vertically (block) or horizontally (inline)
 */
export class DocBox extends HTMLElement {
  static get observedAttributes() {
    return []
  }

  get size() {
    return this.getAttribute('size') ?? '100px'
  }
  set size(value) {
    this.setAttribute('size', value)
  }
  get accent() {
    return this.getAttribute('accent') ?? 'rebeccapurple'
  }
  set accent(value) {
    this.setAttribute('accent', value)
  }
  get display() {
    return this.getAttribute('display') ?? 'block'
  }
  set display(value) {
    this.setAttribute('display', value)
  }

  render() {
    this.dataset.i = `DocBox-${this.size}${this.accent}${this.display}`

    const displayRule =
      this.display === 'block'
        ? ` display: block;
            min-height: ${this.size};
          `
        : ` display: inline-block;
            height: 50px;
            width: 100%;
            max-width: ${this.size};
          `

    addGlobalStyle(
      this.dataset.i,
      `
        [data-i="${this.dataset.i}"] {
          ${displayRule}
          background-color: ${this.accent};
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
