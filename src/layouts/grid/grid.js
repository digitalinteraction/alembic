import { addGlobalStyle } from '../../lib/style.js'

/**
 * GridLayout creates a responsive grid using CSS Grid
 *
 * @property {string} min=250px A CSS `length` for the x in `minmax(min(x, 100%), 1fr)`
 * @property {string} space=var(--s1) The space between grid cells
 */
export class GridLayout extends HTMLElement {
  static get observedAttributes() {
    return ['min', 'space']
  }
  static defineElement() {
    customElements.define('grid-layout', GridLayout)
  }

  get min() {
    return this.getAttribute('min') || '250px'
  }
  set min(value) {
    return this.setAttribute('min', value)
  }

  get space() {
    return this.getAttribute('space') || 'var(--s1)'
  }
  set space(value) {
    return this.setAttribute('space', value)
  }

  render() {
    this.dataset.i = `GridLayout-${this.min}${this.space}`
    addGlobalStyle(
      this.dataset.i,
      `
        [data-i="${this.dataset.i}"] {
          grid-gap: ${this.space};
        }
        
        @supports (width: min(${this.min}, 100%)) {
          [data-i="${this.dataset.i}"] {
            grid-template-columns: repeat(auto-fill, minmax(min(${this.min}, 100%), 1fr));
          }
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
