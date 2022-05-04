import { addGlobalStyle, trimCss } from '../../lib/lib.js'

const defaults = {
  centered: 'h1',
  space: 'var(--s1)',
  minHeight: '100vh',
  noPad: false,
}

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
  static getStyles(attrs) {
    const { centered, space, minHeight, noPad } = { ...defaults, ...attrs }
    const id = `CoverLayout-${centered}${space}${minHeight}${noPad}`
    const css = trimCss`
      [data-i="${id}"] {
        min-height: ${minHeight};
        padding: ${!noPad ? space : '0'};
      }
      [data-i="${id}"] > * {
        margin-block: ${space};
      }
      [data-i="${id}"] > :first-child:not(${centered}) {
        margin-block-start: 0;
      }
      [data-i="${id}"] > :last-child:not(${centered}) {
        margin-block-end: 0;
      }
      [data-i="${id}"] > ${centered} {
        margin-block: auto;
      }
    `
    return { id, css }
  }

  get centered() {
    return this.getAttribute('centered') ?? defaults.centered
  }
  set centered(value) {
    this.setAttribute('centered', value)
  }

  get space() {
    return this.getAttribute('space') ?? defaults.space
  }
  set space(value) {
    this.setAttribute('space', value)
  }

  get minHeight() {
    return this.getAttribute('minHeight') || defaults.minHeight
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
    const { centered, space, minHeight, noPad } = this
    const { id, css } = CoverLayout.getStyles({
      centered,
      space,
      minHeight,
      noPad,
    })
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
