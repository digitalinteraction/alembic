import { addGlobalStyle } from '../../lib/style.js'

/**
 * SwitcherLayout places elements horizontally if there is space, or vertically if not
 *
 * @property {string} threshold=var(--measure) A CSS `width` for the 'container breakpoint'
 * @property {string} space=var(--s1) A CSS `margin` for the gap between elements
 * @property {integer} limit=4 The maximum number of elements allowed to display horizontally
 */
export class SwitcherLayout extends HTMLElement {
  static get observedAttributes() {
    return ['threshold', 'space', 'limit']
  }
  static register() {
    customElements.define('switcher-layout', SwitcherLayout)
  }

  get threshold() {
    return this.getAttribute('threshold') || 'var(--measure)'
  }
  set threshold(value) {
    return this.setAttribute('threshold', value)
  }

  get space() {
    return this.getAttribute('space') || 'var(--s1)'
  }
  set space(value) {
    return this.setAttribute('space', value)
  }

  get limit() {
    return this.getAttribute('limit') || '4'
  }
  set limit(value) {
    return this.setAttribute('limit', value)
  }

  render() {
    this.dataset.i = `SwitcherLayout-${this.threshold}${this.space}${this.limit}`
    const nPlus1 = parseInt(this.limit) + 1
    addGlobalStyle(
      this.dataset.i,
      `
        [data-i="${this.dataset.i}"] {
          gap: ${this.space};
        }
        [data-i="${this.dataset.i}"] > * {
          flex-basis: calc((${this.threshold} - 100%) * 999);
        }
        [data-i="${this.dataset.i}"] > :nth-last-child(n+${nPlus1}),
        [data-i="${this.dataset.i}"] > :nth-last-child(n+${nPlus1}) ~ * {
          flex-basis: 100%;
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
