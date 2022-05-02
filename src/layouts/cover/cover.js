import { addGlobalStyle } from '../../lib/style.js'

/**
 * CoverLayout covers a block-layout element vertically with a centered principle element
 * and accessory elements at the top or bottom
 *
 * @property {string} centered=h1 A CSS `selector` e.g. an element/class for the principle element
 * @property {string} space=var(--s1) The minimum space between all child elements
 * @property {string} minHeight=100vh The minimum block-size (height) for the entire layout
 * @property {boolean} noPad=false Whether the spacing should also pad the inside of the layout
 */
export class CoverLayout extends HTMLElement {
  static get observedAttributes() {
    return ['centered', 'space', 'minHeight', 'noPad']
  }
  static defineElement() {
    customElements.define('cover-layout', CoverLayout)
  }

  get centered() {
    return this.getAttribute('centered') ?? 'h1'
  }
  set centered(value) {
    this.setAttribute('centered', value)
  }

  get space() {
    return this.getAttribute('space') ?? 'var(--s1)'
  }
  set space(value) {
    this.setAttribute('space', value)
  }

  get minHeight() {
    return this.getAttribute('minHeight') || '100vh'
  }
  set minHeight(value) {
    return this.setAttribute('minHeight', value)
  }

  get noPad() {
    return this.hasAttribute('noPad')
  }
  set noPad(value) {
    if (value) this.setAttribute('noPad', '')
    else this.removeAttribute('noPad')
  }

  render() {
    this.dataset.i = `CoverLayout-${this.centered}${this.space}${this.minHeight}${this.noPad}`
    addGlobalStyle(
      this.dataset.i,
      `
        [data-i="${this.dataset.i}"] {
          min-height: ${this.minHeight};
          padding: ${!this.noPad ? this.space : '0'};
        }
        [data-i="${this.dataset.i}"] > * {
          margin-block: ${this.space};
        }
        [data-i="${this.dataset.i}"] > :first-child:not(${this.centered}) {
          margin-block-start: 0;
        }
        [data-i="${this.dataset.i}"] > :last-child:not(${this.centered}) {
          margin-block-end: 0;
        }
        [data-i="${this.dataset.i}"] > ${this.centered} {
          margin-block: auto;
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
