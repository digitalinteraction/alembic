import { addGlobalStyle } from '../../lib/style.js'

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
  static register() {
    customElements.define('cluster-layout', ClusterLayout)
  }

  get justify() {
    return this.getAttribute('justify') ?? 'flex-start'
  }
  set justify(value) {
    this.setAttribute('justify', value)
  }
  get align() {
    return this.getAttribute('align') ?? 'flex-start'
  }
  set align(value) {
    this.setAttribute('align', value)
  }
  get space() {
    return this.getAttribute('space') ?? 'var(--s1)'
  }
  set space(value) {
    this.setAttribute('space', value)
  }

  render() {
    this.dataset.i = `ClusterLayout-${this.justify}${this.align}${this.space}`
    addGlobalStyle(
      this.dataset.i,
      `
        [data-i="${this.dataset.i}"] {
          justify-content: ${this.justify};
          align-items: ${this.align};
          gap: ${this.space};
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
