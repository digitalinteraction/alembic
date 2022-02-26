import { addGlobalStyle } from '../../lib/style.js'

//
// Props:
// - padding - how much spacing for content
// - borderWidth - how thick the border is
// - invert - swap fore- & back-ground colors
//

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
  static register() {
    customElements.define('box-layout', BoxLayout)
  }

  get padding() {
    return this.getAttribute('padding') || 'var(--s1)'
  }
  set padding(value) {
    return this.setAttribute('padding', value)
  }
  get borderWidth() {
    return this.getAttribute('borderWidth') || 'var(--border-thin)'
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
    this.dataset.i = `BoxLayout-${this.padding}${this.borderWidth}${this.invert}`
    const invertRules = this.invert
      ? `color: var(--backgroundColor); background-color: var(--foregroundColor);`
      : `color: var(--foregroundColor); background-color: var(--backgroundColor);`
    addGlobalStyle(
      this.dataset.i,
      `
        [data-i="${this.dataset.i}"] {
          padding: ${this.padding};
          border: ${this.borderWidth} solid;
          ${invertRules}
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
