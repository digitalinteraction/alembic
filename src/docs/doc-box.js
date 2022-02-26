import { addGlobalStyle } from '../lib/style.js'

// const style = `
// `
//
// const template = document.createElement('template')
// template.innerHTML = `
// `

export class DocBox extends HTMLElement {
  static get observedAttributes() {
    return []
  }

  get size() {
    return this.getAttribute('size') ?? '100px'
  }
  get accent() {
    return this.getAttribute('accent') ?? 'rebeccapurple'
  }

  constructor() {
    super()

    // this.attachShadow({ mode: 'open' })
    // this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
  render() {
    this.dataset.i = `DocBox-${this.size}-${this.accent}`
    addGlobalStyle(
      this.dataset.i,
      `
        [data-i="${this.dataset.i}"] {
          height: ${this.size};
          background-color: ${this.accent};
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
