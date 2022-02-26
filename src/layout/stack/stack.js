import { addGlobalStyle } from '../../lib/style.js'

// const style = `
// `
//
// const template = document.createElement('template')
// template.innerHTML = `
// `

/**
 * StackLayout adds whitespace (margin) between flow (block) elements along a vertical axis
 *
 * @property {string} space=var(--s1) A CSS `margin` value
 */
export class StackLayout extends HTMLElement {
  static get observedAttributes() {
    return ['space']
  }
  static register() {
    customElements.define('stack-layout', StackLayout)
  }

  get space() {
    return this.getAttribute('space') ?? 'var(--s1)'
  }
  set space(value) {
    this.setAttribute('space', value)
  }

  render() {
    this.dataset.i = `StackLayout-${this.space}`
    addGlobalStyle(
      this.dataset.i,
      `
        [data-i="${this.dataset.i}"] > * + * {
          margin-block-start: ${this.space};
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
