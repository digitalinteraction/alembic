import {
  addGlobalStyle,
  getAttributes,
  getHTMLElement,
  trimCss,
} from '../../lib/lib.js'

const defaultAttributes = {
  breakout: false,
  fixed: false,
  margin: '0px',
}

export type ImposterLayoutAttributes = {
  breakout?: boolean
  fixed?: boolean
  margin?: string
}

/**
  ImposterLayout positions an element over any other element.
  [Documentation →](https://alembic.openlab.dev/layouts/#imposter)
 */
export class ImposterLayout extends getHTMLElement() {
  static get observedAttributes() {
    return ['breakout', 'margin', 'fixed']
  }
  static defineElement() {
    customElements.define('imposter-layout', ImposterLayout)
  }
  static getStyles(attrs: ImposterLayoutAttributes) {
    const { breakout, fixed, margin } = getAttributes(defaultAttributes, attrs)
    const id = `ImposterLayout-${breakout}${fixed}${margin}`

    const normalisedMargin = margin === '0' ? '0px' : margin
    const fixedRule = `position: fixed;`
    const breakoutRule = `
      max-inline-size: calc(100% - (${normalisedMargin} * 2));
      max-block-size: calc(100% - (${normalisedMargin} * 2));
      overflow: auto;
    `
    const css = trimCss`
      [data-i="${id}"] {
        ${fixed ? fixedRule : ''}
        ${breakout ? '' : breakoutRule}
      }
    `
    return { id, css }
  }

  get breakout() {
    return this.hasAttribute('breakout') ?? defaultAttributes.breakout
  }
  set breakout(value) {
    if (value) this.setAttribute('breakout', '')
    else this.removeAttribute('breakout')
  }

  get fixed() {
    return this.hasAttribute('fixed') ?? defaultAttributes.fixed
  }
  set fixed(value) {
    if (value) this.setAttribute('fixed', '')
    else this.removeAttribute('fixed')
  }

  get margin() {
    return this.getAttribute('margin') ?? defaultAttributes.margin
  }
  set margin(value) {
    this.setAttribute('margin', value)
  }

  render() {
    const { breakout, fixed, margin } = this
    const { id, css } = ImposterLayout.getStyles({ breakout, fixed, margin })
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
