import {
  addGlobalStyle,
  getAttributes,
  getHTMLElement,
  trimCss,
} from '../../lib/lib.js'

const defaultAttributes = {
  threshold: 'var(--measure)',
  space: 'var(--s1)',
  limit: '4',
}

export type SwitcherLayoutAttributes = {
  threshold?: string
  space?: string
  limit?: string
}

/**
  SwitcherLayout places elements horizontally if there is space, or vertically if not.
  [Documentation →](https://alembic.openlab.dev/layouts/#switcher)
 */
export class SwitcherLayout extends getHTMLElement() {
  static get observedAttributes() {
    return ['threshold', 'space', 'limit']
  }
  static defineElement() {
    customElements.define('switcher-layout', SwitcherLayout)
  }
  static getStyles(attrs: SwitcherLayoutAttributes) {
    const { threshold, space, limit } = getAttributes(defaultAttributes, attrs)
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
    return this.getAttribute('threshold') || defaultAttributes.threshold
  }
  set threshold(value) {
    this.setAttribute('threshold', value)
  }

  get space() {
    return this.getAttribute('space') || defaultAttributes.space
  }
  set space(value) {
    this.setAttribute('space', value)
  }

  get limit() {
    return this.getAttribute('limit') || defaultAttributes.limit
  }
  set limit(value) {
    this.setAttribute('limit', value)
  }

  render() {
    if (Number.isNaN(parseInt(this.limit))) {
      console.warn(
        '<switcher-layout> `limit` is not a number, %o',
        this.limit,
        this
      )
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
