import {
  addGlobalStyle,
  getAttributes,
  getHTMLElement,
  trimCss,
} from '../../lib/lib.js'

const defaultAttributes = {
  max: 'var(--measure)',
  gutters: undefined,
  intrinsic: false,
}

export type CenterLayoutAttributes = {
  max?: string
  gutters?: string
  intrinsic?: boolean
}

/**
  CenterLayout ensures a block-level element is horizontally centered
  with a max-width value representing the typographic measure.
  [Documentation →](https://alembic.openlab.dev/layouts/#center)
 */
export class CenterLayout extends getHTMLElement() {
  static get observedAttributes() {
    return ['max', 'gutters', 'intrinsic']
  }

  static defineElement() {
    customElements.define('center-layout', CenterLayout)
  }
  static getStyles(attrs: CenterLayoutAttributes) {
    const { max, gutters, intrinsic } = getAttributes(defaultAttributes, attrs)
    const id = `CenterLayout-${max}${gutters}${intrinsic}`

    const guttersRule = `padding-inline: ${gutters};`

    const intrinsicRule = `
      display: flex;
      flex-direction: column;
      align-items: center;
    `

    const css = trimCss`
      [data-i="${id}"] {
        max-width: ${max};
        ${gutters ? guttersRule : ''}
        ${intrinsic ? intrinsicRule : ''}
      }
    `

    return { id, css }
  }

  get max() {
    return this.getAttribute('max') ?? defaultAttributes.max
  }
  set max(value) {
    this.setAttribute('max', value)
  }
  get gutters() {
    return this.getAttribute('gutters') ?? defaultAttributes.gutters
  }
  set gutters(value) {
    if (value) this.setAttribute('gutters', value)
    else this.removeAttribute('gutters')
  }
  get intrinsic() {
    return this.hasAttribute('intrinsic') ?? defaultAttributes.intrinsic
  }
  set intrinsic(value) {
    if (value) this.setAttribute('intrinsic', '')
    else this.removeAttribute('intrinsic')
  }

  render() {
    const { max, gutters, intrinsic } = this
    const { id, css } = CenterLayout.getStyles({ max, gutters, intrinsic })
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
