import { addGlobalStyle, trimCss } from '../../lib/style.js'

const defaults = {
  breakout: false,
  fixed: false,
  margin: '0px',
}

/**
 * ImposterLayout positions an element over any other element
 *
 * @property {boolean} breakout=false ...
 * @property {string} margin=0 The minimum space between the element and it's positioning container (when `breakout` isn't used)
 * @property {boolean} fixed=false Whether to fix the element to the viewport instead
 */
export class ImposterLayout extends HTMLElement {
  static get observedAttributes() {
    return ['breakout', 'margin', 'fixed']
  }
  static defineElement() {
    customElements.define('imposter-layout', ImposterLayout)
  }
  static getStyles(attrs) {
    const { breakout, fixed, margin } = { ...defaults, ...attrs }
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
    return this.hasAttribute('breakout')
  }
  set breakout(value) {
    if (value) return this.setAttribute('breakout', '')
    else return this.removeAttribute('breakout')
  }

  get fixed() {
    return this.hasAttribute('fixed')
  }
  set fixed(value) {
    if (value) return this.setAttribute('fixed', '')
    else return this.removeAttribute('fixed')
  }

  get margin() {
    return this.getAttribute('margin') || defaults.margin
  }
  set margin(value) {
    return this.setAttribute('margin', value)
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
