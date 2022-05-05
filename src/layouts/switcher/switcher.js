import { addGlobalStyle, trimCss } from '../../lib/style.js'

const defaults = {
  threshold: 'var(--measure)',
  space: 'var(--s1)',
  limit: '4',
}

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
  static defineElement() {
    customElements.define('switcher-layout', SwitcherLayout)
  }
  static getStyles(attrs) {
    const { threshold, space, limit } = { ...defaults, ...attrs }
    const id = `SwitcherLayout-${threshold}${space}${limit}`
    const nPlus1 = parseInt(limit) + 1
    const css = trimCss`
      [data-i="${id}"] {
        gap: ${space};
      }
      [data-i="${id}"] > * {
        flex-basis: calc((${threshold} - 100%) * 999);
      }
      [data-i="${id}"] > :nth-last-child(n+${nPlus1}),
      [data-i="${id}"] > :nth-last-child(n+${nPlus1}) ~ * {
        flex-basis: 100%;
      }
    `
    return { id, css }
  }

  get threshold() {
    return this.getAttribute('threshold') || defaults.threshold
  }
  set threshold(value) {
    return this.setAttribute('threshold', value)
  }

  get space() {
    return this.getAttribute('space') || defaults.space
  }
  set space(value) {
    return this.setAttribute('space', value)
  }

  get limit() {
    return this.getAttribute('limit') || defaults.limit
  }
  set limit(value) {
    return this.setAttribute('limit', value)
  }

  render() {
    if (Number.isNaN(parseInt(this.limit))) {
      console.warn('<switcher-layout> `limit` is not a number, %o', this.limit)
    }

    const { threshold, space, limit } = this
    const { id, css } = SwitcherLayout.getStyles({ threshold, space, limit })
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
