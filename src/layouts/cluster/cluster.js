import { addGlobalStyle, trimCss } from '../../lib/lib.js'

const defaults = {
  justify: 'flex-start',
  align: 'flex-start',
  space: 'var(--s1)',
}

/**
 * ClusterLayout groups items together with control for the margin between them
 *
 * NOTE — if flex-gap isn't supported, items will appear flush
 *
 * @property {string} justify=flex-start A CSS `justify-content` value
 * @property {string} align=flex-start A CSS `align-items` value
 * @property {string} space=var(--s1) A CSS `gap` value. The minimum space between the clustered child elements.
 */
export class ClusterLayout extends HTMLElement {
  static get observedAttributes() {
    return ['justify', 'align', 'space']
  }
  static defineElement() {
    customElements.define('cluster-layout', ClusterLayout)
  }
  static getStyles(attrs) {
    const { justify, align, space } = { ...defaults, ...attrs }
    const id = `ClusterLayout-${justify}${align}${space}`
    const css = trimCss`
      [data-i="${id}"] {
        justify-content: ${justify};
        align-items: ${align};
        gap: ${space};
      }
    `
    return { id, css }
  }

  get justify() {
    return this.getAttribute('justify') ?? defaults.justify
  }
  set justify(value) {
    this.setAttribute('justify', value)
  }
  get align() {
    return this.getAttribute('align') ?? defaults.align
  }
  set align(value) {
    this.setAttribute('align', value)
  }
  get space() {
    return this.getAttribute('space') ?? defaults.space
  }
  set space(value) {
    this.setAttribute('space', value)
  }

  render() {
    const { justify, align, space } = this
    const { id, css } = ClusterLayout.getStyles({ justify, align, space })
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
