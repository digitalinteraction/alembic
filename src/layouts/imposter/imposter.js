import { addGlobalStyle } from '../../lib/style.js'

/**
 * ImposterLayout positions an element over any other element
 *
 * @property {boolean} breakout=var(--s1) ...
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
    return this.getAttribute('margin') || '0px'
  }
  set margin(value) {
    return this.setAttribute('margin', value)
  }

  render() {
    const margin = this.margin === '0' ? '0px' : this.margin
    const fixedRule = `position: fixed;`
    const breakoutRule = `
      max-inline-size: calc(100% - (${margin} * 2));
      max-block-size: calc(100% - (${margin} * 2));
      overflow: auto;
    `

    this.dataset.i = `ImposterLayout-${this.breakout}${this.fixed}${this.margin}`
    addGlobalStyle(
      this.dataset.i,
      `
        [data-i="${this.dataset.i}"] {
          ${this.fixed ? fixedRule : ''}
          ${this.breakout ? '' : breakoutRule}
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
