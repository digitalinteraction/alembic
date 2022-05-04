import { addGlobalStyle, trimCss } from '../../lib/lib.js'

const defaults = {
  space: 'var(--s1)',
}

/**
 * StackLayout adds whitespace (margin) between flow (block) elements along a vertical axis
 *
 * @property {string} space=var(--s1) A CSS `margin` value
 */
export class StackLayout extends HTMLElement {
  static get observedAttributes() {
    return ['space']
  }
  static defineElement() {
    customElements.define('stack-layout', StackLayout)
  }
  static getStyles(attrs) {
    const { space } = { ...defaults, ...attrs }
    const id = `StackLayout-${space}`
    const css = trimCss`
      [data-i="${id}"] > * + * {
        margin-block-start: ${space};
      }
    `
    return { id, css }
  }

  get space() {
    return this.getAttribute('space') ?? defaults.space
  }
  set space(value) {
    this.setAttribute('space', value)
  }

  render() {
    const { space } = this
    const { id, css } = StackLayout.getStyles({ space })
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
